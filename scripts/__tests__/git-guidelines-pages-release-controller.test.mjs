import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import test from "node:test";

import yaml from "js-yaml";

import {
  PagesReleaseError,
  canonicalJson,
  createReleaseCarrier,
  gateRelease,
  parsePayloadManifest,
  reconcileRelease,
  verifyPublicRelease,
} from "../lib/git-guidelines/pages-release-controller.mjs";

const digest = value => createHash("sha256").update(value).digest("hex");

function response(url, status, body = Buffer.alloc(0), options = {}) {
  const bytes = Buffer.from(body);
  return {
    status,
    url: options.url || String(url),
    redirected: options.redirected || false,
    async arrayBuffer() {
      if (options.beforeBody) await options.beforeBody();
      return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
    },
  };
}

function fixture(overrides = {}) {
  const candidateSha = "a".repeat(40);
  const files = new Map([
    ["guidelines/sample.md", Buffer.from("# sample\n")],
    ["index.html", Buffer.from("<!doctype html><title>sample</title>\n")],
  ]);
  const manifest = Buffer.from([...files.entries()].map(([relative, bytes]) =>
    `${digest(bytes)}  ./${relative}`).join("\n") + "\n");
  const input = {
    repository: "huijoohwee/huijoohwee.github.io",
    candidateSha,
    artifactId: `agentic-guideline-pages-release:${candidateSha}:${digest(manifest)}`,
    payloadManifestDigest: digest(manifest),
    policyDigest: "b".repeat(64),
    token: "test-token",
    apiBase: "https://api.github.test",
    pageUrl: "https://pages.test/",
    runId: "123",
    runAttempt: 1,
    expectedOperatorId: "8945812",
    providerArtifactId: "321",
    pollIntervalMs: 0,
    ...overrides,
  };
  const carrier = createReleaseCarrier(input);
  input.effectId = carrier.effectId;
  return { input, carrier, files, manifest };
}

function priorRun(overrides = {}) {
  return { id: 99, event: "workflow_dispatch", path: ".github/workflows/pages.yml",
    head_sha: "a".repeat(40), status: "completed", conclusion: "success",
    created_at: "2026-01-01T00:00:00Z", ...overrides };
}

const pagesWorkflowPath = new URL("../../.github/workflows/pages.yml", import.meta.url);
const pagesWorkflowSource = readFileSync(pagesWorkflowPath, "utf8");
const pagesWorkflow = yaml.load(pagesWorkflowSource);

test("Pages delivery authenticates one exact protected candidate and attests policy", () => {
  assert.deepEqual(Object.keys(pagesWorkflow.on), ["workflow_dispatch"]);
  const inputs = pagesWorkflow.on.workflow_dispatch.inputs;
  assert.deepEqual(Object.keys(inputs), ["candidate_sha", "authorization_statement"]);
  assert.equal(inputs.candidate_sha.required, true);
  assert.equal(inputs.authorization_statement.required, true);
  assert.equal(pagesWorkflow.concurrency.group, "github-pages-production");
  assert.equal(pagesWorkflow.concurrency["cancel-in-progress"], false);
  assert.equal(pagesWorkflow.permissions.contents, "read");
  assert.equal(pagesWorkflow.permissions.pages, undefined);
  assert.equal(pagesWorkflow.permissions["id-token"], undefined);

  const authorize = pagesWorkflow.jobs.authorize;
  assert.equal(authorize.permissions.actions, "read");
  assert.equal(authorize.permissions.checks, "read");
  assert.equal(authorize.outputs.policy_digest, "${{ steps.canonical.outputs.policy_digest }}");
  const typed = authorize.steps.find(step => step.name === "Validate authenticated typed authorization");
  assert.equal(typed.env.REQUESTING_ACTOR_ID, "${{ github.actor_id }}");
  assert.equal(typed.env.EXPECTED_OPERATOR_ID, "${{ github.repository_owner_id }}");
  assert.equal(typed.env.DISPATCH_REF, "${{ github.ref }}");
  assert.equal(typed.env.DISPATCH_REF_PROTECTED, "${{ github.ref_protected }}");
  assert.equal(typed.env.DISPATCH_SHA, "${{ github.sha }}");
  assert.equal(typed.env.WORKFLOW_SHA, "${{ github.workflow_sha }}");
  assert.match(typed.run, /test "\$REQUESTING_ACTOR_ID" = "\$EXPECTED_OPERATOR_ID"/u);
  assert.match(typed.run, /authorize github-pages-production \$CANDIDATE_SHA/u);
  assert.doesNotMatch(pagesWorkflowSource, /RUN_ATTEMPT|test "\$RUN_ATTEMPT" = "1"/u);
  assert.doesNotMatch(pagesWorkflowSource, /EXPECTED_OPERATOR_ID:\s*"?\d+/u);

  const canonical = authorize.steps.find(
    step => step.name === "Bind current protected canonical revision and trusted required check",
  );
  assert.equal(canonical.env.EXPECTED_CHECK_APP_ID, "15368");
  assert.equal(canonical.env.EXPECTED_RULESET_ID, "20008203");
  assert.equal(canonical.env.EXPECTED_RULESET_VERSION_ID, "44827461");
  assert.equal(canonical.env.EXPECTED_RULESET_UPDATED_AT, "2026-07-30T00:43:30.062Z");
  assert.equal(canonical.env.EXPECTED_RULESET_STATE_DIGEST,
    "2fac3b84a376a7f06d86b4e64eae4ea9023223c2a2cff1bc74149cefd0fee84b");
  assert.equal(canonical.env.EXPECTED_RULESET_ATTESTATION_DIGEST,
    "452368c9d244ec1bd6a5329ca187634e4616fc0b1dd956dbfea3246cbc7e5e7d");
  assert.match(canonical.run, /git\/ref\/heads\/main/u);
  assert.match(canonical.run, /test "\$canonical_sha" = "\$CANDIDATE_SHA"/u);
  assert.match(canonical.run, /rulesets\/\$EXPECTED_RULESET_ID/u);
  assert.match(canonical.run, /rules\/branches\/main\?per_page=100/u);
  assert.match(canonical.run, /strict_required_status_checks_policy: true/u);
  assert.match(canonical.run, /\.app\.slug == "github-actions"/u);
  assert.match(canonical.run, /\.github\/workflows\/guideline-contract\.yml/u);
  assert.match(canonical.run, /test "\$policy_digest" = "\$EXPECTED_RULESET_ATTESTATION_DIGEST"/u);
});

test("Pages controller gates, applies, reconciles, and receipts the exact sealed effect", () => {
  const build = pagesWorkflow.jobs.build;
  assert.equal(build.name, "Seal exact Pages artifact");
  assert.equal(build.outputs.artifact_id, "${{ steps.assemble.outputs.artifact_id }}");
  assert.equal(build.outputs.effect_id, "${{ steps.assemble.outputs.effect_id }}");
  assert.equal(build.outputs.payload_manifest_digest, "${{ steps.assemble.outputs.payload_manifest_digest }}");
  assert.equal(build.outputs.provider_artifact_id, "${{ steps.upload.outputs.artifact_id }}");
  const assemble = build.steps.find(step => step.name === "Assemble and seal static site");
  assert.equal(assemble.env.POLICY_DIGEST, "${{ needs.authorize.outputs.policy_digest }}");
  assert.match(assemble.run, /pages-release-controller\.mjs seal/u);
  assert.match(assemble.run, /RELEASE_CARRIER_PATH="\$SITE_ROOT\/release\/release\.json"/u);
  assert.doesNotMatch(assemble.run, /agentic-guideline-pages-release\/v2/u);
  const upload = build.steps.find(step => step.name === "Upload exact Pages artifact");
  assert.equal(upload.with.path, "${{ runner.temp }}/pages-site");
  assert.equal(build.steps.some(step => String(step.uses || "").startsWith("actions/configure-pages@")), false);

  const deploy = pagesWorkflow.jobs.deploy;
  assert.equal(deploy.name, "Deploy and verify exact Pages artifact");
  assert.equal(deploy["timeout-minutes"], 24);
  assert.deepEqual(deploy.needs, ["authorize", "build"]);
  assert.equal(deploy.environment.name, "github-pages");
  assert.equal(deploy.environment.url,
    "${{ steps.deployment.outputs.page_url || 'https://huijoohwee.github.io/' }}");
  assert.equal(deploy.permissions.pages, "write");
  assert.equal(deploy.permissions["id-token"], "write");
  const names = deploy.steps.map(step => step.name);
  const indexes = ["Check out exact authorized candidate for release control",
    "Verify exact release-controller source",
    "Revalidate canonical, policy, and trusted check before deployment",
    "Gate exact Pages release effect", "Deploy exact Pages artifact",
    "Reconcile exact Pages release effect", "Require terminal controller receipt"].map(
    name => names.indexOf(name),
  );
  assert.ok(indexes.every((value, index) => value >= 0 && (index === 0 || indexes[index - 1] < value)));
  const [checkoutIndex, sourceIndex, preflightIndex, gateIndex, effectIndex,
    reconciliationIndex, receiptIndex] = indexes;

  const checkout = deploy.steps[checkoutIndex];
  assert.match(checkout.uses, /^actions\/checkout@[0-9a-f]{40}$/u);
  assert.equal(checkout.with.ref, "${{ needs.authorize.outputs.candidate_sha }}");
  assert.equal(checkout.with["persist-credentials"], false);
  assert.match(deploy.steps[sourceIndex].run, /test "\$\(git rev-parse HEAD\)" = "\$CANDIDATE_SHA"/u);
  assert.match(deploy.steps[sourceIndex].run, /git status --porcelain=v1 --untracked-files=all/u);
  const preflight = deploy.steps[preflightIndex];
  assert.equal(preflight.env.EXPECTED_PAGE_URL, "https://huijoohwee.github.io/");
  assert.match(preflight.run, /gh api "repos\/\$GITHUB_REPOSITORY\/pages"/u);
  assert.match(preflight.run, /\.build_type == "workflow"/u);
  assert.match(preflight.run, /\.html_url == \$page_url/u);
  assert.match(preflight.run, /\.cname == null or \.cname == ""/u);
  assert.match(preflight.run, /test "\$policy_digest" = "\$EXPECTED_POLICY_DIGEST"/u);
  assert.equal(preflight.env.PROVIDER_ARTIFACT_ID, "${{ needs.build.outputs.provider_artifact_id }}");

  const gate = deploy.steps[gateIndex];
  assert.equal(gate.id, "effect_gate");
  assert.equal(gate.run, "node scripts/lib/git-guidelines/pages-release-controller.mjs gate");
  assert.equal(gate.env.ARTIFACT_ID, "${{ needs.build.outputs.artifact_id }}");
  assert.equal(gate.env.CANDIDATE_SHA, "${{ needs.authorize.outputs.candidate_sha }}");
  assert.equal(gate.env.EFFECT_ID, "${{ needs.build.outputs.effect_id }}");
  assert.equal(gate.env.EXPECTED_OPERATOR_ID, "${{ github.repository_owner_id }}");
  assert.equal(gate.env.PAGE_URL, "https://huijoohwee.github.io/");
  assert.equal(gate.env.PAYLOAD_MANIFEST_DIGEST, "${{ needs.build.outputs.payload_manifest_digest }}");
  assert.equal(gate.env.POLICY_DIGEST, "${{ needs.authorize.outputs.policy_digest }}");
  assert.equal(gate.env.PROVIDER_ARTIFACT_ID, "${{ needs.build.outputs.provider_artifact_id }}");
  const effect = deploy.steps[effectIndex];
  assert.equal(effect.name, "Deploy exact Pages artifact");
  assert.equal(effect.if, "${{ steps.effect_gate.outputs.decision == 'apply' }}");
  assert.equal(effect["continue-on-error"], true);
  assert.equal(effect["timeout-minutes"], 8);
  assert.equal(effect.with.timeout, 360000);

  const reconciliation = deploy.steps[reconciliationIndex];
  assert.equal(reconciliation.if, "${{ always() && steps.effect_gate.outcome == 'success' }}");
  assert.equal(reconciliation["timeout-minutes"], 6);
  assert.equal(reconciliation.env.GATE_DECISION, "${{ steps.effect_gate.outputs.decision }}");
  assert.equal(reconciliation.env.EFFECT_ID, "${{ needs.build.outputs.effect_id }}");
  assert.equal(reconciliation.env.PAGE_URL, "https://huijoohwee.github.io/");
  assert.equal(reconciliation.env.RECONCILIATION_DEADLINE_MS, "300000");
  assert.equal(reconciliation.run, "node scripts/lib/git-guidelines/pages-release-controller.mjs reconcile");
  const receipt = deploy.steps[receiptIndex];
  assert.equal(receipt.if, "${{ always() }}");
  assert.equal(receipt.env.GATE_RECEIPT_B64, "${{ steps.effect_gate.outputs.result_json }}");
  assert.equal(receipt.env.RECONCILIATION_RECEIPT_B64, "${{ steps.reconciliation.outputs.result_json }}");
  assert.equal(receipt.env.CONTROLLER_STATUS, "${{ steps.reconciliation.outputs.controller_status }}");
  assert.equal(receipt.env.ACTION_PAGE_URL, "${{ steps.deployment.outputs.page_url }}");
  assert.equal(receipt.env.PAYLOAD_MANIFEST_DIGEST, "${{ needs.build.outputs.payload_manifest_digest }}");
  assert.equal(receipt.env.PROVIDER_ARTIFACT_ID, "${{ needs.build.outputs.provider_artifact_id }}");
  assert.equal(receipt.env.WORKFLOW_RUN_ID, "${{ github.run_id }}");
  assert.equal(receipt.env.RECEIPT_B64, undefined);
  assert.doesNotMatch(JSON.stringify(receipt), /DEPLOYMENT_OUTCOME|steps\.deployment\.outcome/u);
  assert.match(receipt.run, /GATE_RECEIPT_B64/u);
  assert.match(receipt.run, /RECONCILIATION_RECEIPT_B64/u);
  assert.match(receipt.run, /agentic-guideline-pages-release-gate\/v1/u);
  assert.match(receipt.run, /agentic-guideline-pages-release-result\/v1/u);
  assert.match(receipt.run, /sourceRevision/u);
  assert.match(receipt.run, /effectId/u);
  assert.match(receipt.run, /providerArtifactId/u);
  assert.match(receipt.run, /workflowRunId/u);
  for (const job of Object.values(pagesWorkflow.jobs)) for (const step of job.steps) {
    if (step.uses) assert.match(step.uses, /@[0-9a-f]{40}$/u);
  }
  assert.doesNotMatch(pagesWorkflowSource, /^\s+push:/mu);
});

function makeRouter(state = {}) {
  const data = fixture(state.inputOverrides);
  const calls = [];
  const deploymentStatuses = [...(state.deploymentStatuses || [])];
  const afterCancelStatuses = [...(state.afterCancelStatuses || [])];
  let cancelled = false;
  let activePayloadFetches = 0;
  let maximumPayloadFetches = 0;
  let releaseReads = 0;
  const json = (url, value, status = 200) => response(url, status, Buffer.from(JSON.stringify(value)));
  async function fetchImpl(value, init = {}) {
    const url = new URL(value);
    calls.push({ url: url.href, method: init.method || "GET" });
    if (url.hostname === "api.github.test") {
      const suffix = url.pathname.replace(`/repos/${data.input.repository}`, "");
      if (suffix === `/actions/runs/${data.input.runId}`) {
        return json(url, {
          id: Number(data.input.runId), event: "workflow_dispatch", path: ".github/workflows/pages.yml",
          head_branch: "main", head_sha: data.input.candidateSha, run_attempt: Number(data.input.runAttempt),
          actor: { id: Number(data.input.expectedOperatorId) },
          triggering_actor: { id: Number(data.input.expectedOperatorId) },
          created_at: "2026-01-01T00:00:01Z",
        });
      }
      if (suffix === "/actions/workflows/pages.yml/runs") {
        const current = priorRun({ id: Number(data.input.runId), status: "in_progress", conclusion: null,
          created_at: "2026-01-01T00:00:01Z" });
        const all = [current, ...(state.priorRuns || [])];
        const page = Number(url.searchParams.get("page") || 1) - 1;
        const values = state.priorRunPages?.[page] || all.slice(page * 100, (page + 1) * 100);
        return json(url, { total_count: state.priorTotalCount ?? all.length, workflow_runs: values });
      }
      const attempts = new RegExp(`^/actions/runs/${data.input.runId}/attempts/(\\d+)/jobs$`, "u").exec(suffix);
      if (attempts) return json(url, state.priorAttemptJobs?.[attempts[1]] || { total_count: 1, jobs: [] });
      const jobs = /^\/actions\/runs\/(\d+)\/jobs$/u.exec(suffix);
      if (jobs) return json(url, state.priorJobs?.[jobs[1]] || { total_count: 1, jobs: [] });
      if (suffix === `/actions/artifacts/${data.input.providerArtifactId}`) {
        return json(url, { id: Number(data.input.providerArtifactId), name: "github-pages", expired: false,
          workflow_run: { id: Number(data.input.runId) } });
      }
      if (suffix === `/pages/deployments/${data.input.candidateSha}/cancel`) {
        cancelled = true;
        if (state.cancelThrowsAfterAcceptance) throw new Error("response lost");
        if (state.cancelStatus && state.cancelStatus !== 204) {
          return json(url, { message: "cancel failed" }, state.cancelStatus);
        }
        return response(url, state.cancelStatus || 204);
      }
      if (suffix === `/pages/deployments/${data.input.candidateSha}`) {
        const statuses = cancelled ? afterCancelStatuses : deploymentStatuses;
        const status = statuses.length > 1 ? statuses.shift() : statuses[0];
        if (!status || status === "absent") return response(url, 404);
        return json(url, { status, pages_build_version: data.input.candidateSha });
      }
      if (suffix === "/git/ref/heads/main") {
        return json(url, { object: { sha: state.mainSha || data.input.candidateSha } });
      }
      return json(url, { message: "unexpected route" }, 500);
    }
    if (url.hostname !== "pages.test") return response(url, 500);
    const relative = url.pathname.slice(1);
    if (relative === "release/release.json") {
      releaseReads += 1;
      if (state.liveCarrier === "absent") return response(url, 404);
      const carrier = state.liveCarrier && state.liveCarrier !== "exact"
        ? state.liveCarrier : data.carrier;
      const bytes = Buffer.from(`${canonicalJson(carrier)}\n`);
      const result = state.changeCarrierOnReread && releaseReads > 1
        ? Buffer.from(`${canonicalJson({ ...carrier, policyDigest: "f".repeat(64) })}\n`) : bytes;
      return response(url, 200, result, state.redirectRelease
        ? { redirected: true, url: "https://other.test/release/release.json" } : {});
    }
    if (relative === "release/files.sha256") {
      return response(url, 200, state.mutatedManifest || data.manifest);
    }
    if (data.files.has(decodeURIComponent(relative))) {
      let bytes = data.files.get(decodeURIComponent(relative));
      if (state.mutatedPayload === decodeURIComponent(relative)) bytes = Buffer.from("mutated\n");
      activePayloadFetches += 1;
      maximumPayloadFetches = Math.max(maximumPayloadFetches, activePayloadFetches);
      return response(url, 200, bytes, { beforeBody: async () => {
        await new Promise(resolve => setTimeout(resolve, 2));
        activePayloadFetches -= 1;
      } });
    }
    return response(url, 404);
  }
  return { ...data, fetchImpl, calls, get maximumPayloadFetches() { return maximumPayloadFetches; } };
}

test("carrier identity and manifest parsing are deterministic and strict", () => {
  const { input, carrier, manifest } = fixture();
  assert.deepEqual(createReleaseCarrier(input), carrier);
  assert.match(carrier.effectId, /^[0-9a-f]{64}$/u);
  for (const repository of ["./repository", "owner/.."])
    assert.throws(() => createReleaseCarrier({ ...input, repository }), PagesReleaseError);
  assert.deepEqual(parsePayloadManifest(manifest).map(entry => entry.relative),
    ["guidelines/sample.md", "index.html"]);
  for (const invalid of [
    `${"a".repeat(64)}  ./../escape\n`,
    `${"a".repeat(64)}  ./encoded%2fpath\n`,
    `${"a".repeat(64)}  ./release/receipt.json\n`,
    `${"a".repeat(64)}  ./z\n${"b".repeat(64)}  ./a\n`,
    `${"a".repeat(64)}  ./same\n${"b".repeat(64)}  ./same\n`,
    `${"a".repeat(64)} ./missing-space\n`,
    `${"a".repeat(64)}  ./missing-newline`,
  ]) assert.throws(() => parsePayloadManifest(Buffer.from(invalid)), PagesReleaseError);
});

test("public verification hashes every payload with bounded concurrency and rereads carriers", async () => {
  const router = makeRouter({ deploymentStatuses: ["succeed"] });
  const proof = await verifyPublicRelease(router.input, { fetchImpl: router.fetchImpl });
  assert.equal(proof.status, "verified");
  assert.equal(proof.verifiedFileCount, 2);
  assert.ok(router.maximumPayloadFetches <= 8);
  assert.equal(router.calls.filter(call => call.url.includes("/release/release.json")).length, 2);
  assert.equal(router.calls.filter(call => call.url.includes("/release/files.sha256")).length, 2);
});

test("public verification rejects payload, manifest, carrier, redirect, and protected-main drift", async () => {
  const cases = [
    { mutatedPayload: "index.html" },
    { mutatedManifest: Buffer.from(`${"c".repeat(64)}  ./index.html\n`) },
    { changeCarrierOnReread: true },
    { redirectRelease: true },
    { mainSha: "d".repeat(40) },
  ];
  for (const state of cases) {
    const router = makeRouter(state);
    await assert.rejects(verifyPublicRelease(router.input, { fetchImpl: router.fetchImpl }), PagesReleaseError);
  }
});

test("gate requires canonical positive decimal identity strings", async () => {
  for (const inputOverrides of [
    { runId: "0" }, { runId: "01" }, { runId: 123 },
    { providerArtifactId: "0" }, { providerArtifactId: "0321" }, { providerArtifactId: 321 },
    { expectedOperatorId: "0" }, { expectedOperatorId: "08945812" }, { expectedOperatorId: 8945812 },
  ]) {
    const router = makeRouter({ inputOverrides });
    await assert.rejects(gateRelease(router.input, { fetchImpl: router.fetchImpl }),
      error => error instanceof PagesReleaseError && error.code === "invalid-input");
    assert.equal(router.calls.length, 0);
  }
});

test("native streaming overflow aborts the request and cancels the body", async () => {
  const { input } = fixture();
  let aborted = false;
  let cancelled = false;
  const fetchImpl = async (url, init) => {
    init.signal.addEventListener("abort", () => { aborted = true; }, { once: true });
    const body = new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(5 * 1024 * 1024));
        controller.enqueue(new Uint8Array(5 * 1024 * 1024));
      },
      cancel() { cancelled = true; },
    });
    return new Response(body, { status: 200 });
  };
  await assert.rejects(gateRelease(input, { fetchImpl }),
    error => error instanceof PagesReleaseError && error.code === "response-too-large");
  assert.equal(aborted, true);
  assert.equal(cancelled, true);
});

test("native streaming reads honor the request timeout", async () => {
  const { input } = fixture({ timeoutMs: 20 });
  let aborted = false;
  const fetchImpl = async (url, init) => {
    let streamController;
    const body = new ReadableStream({ start(controller) { streamController = controller; } });
    init.signal.addEventListener("abort", () => {
      aborted = true;
      streamController.error(init.signal.reason);
    }, { once: true });
    return new Response(body, { status: 200 });
  };
  await assert.rejects(gateRelease(input, { fetchImpl }), error => error.name === "AbortError");
  assert.equal(aborted, true);
});

test("first dispatch applies only with no earlier run, deployment, or exact carrier", async () => {
  const router = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"] });
  const gate = await gateRelease(router.input, { fetchImpl: router.fetchImpl });
  assert.equal(gate.decision, "apply");
  assert.equal(gate.providerStatus, "absent");
});

test("the running dispatch ignores a newer duplicate that has not executed", async () => {
  const router = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    priorRuns: [priorRun({ id: 124, status: "queued", conclusion: null,
      created_at: "2026-01-01T00:00:02Z" })] });
  assert.equal((await gateRelease(router.input, { fetchImpl: router.fetchImpl })).decision, "apply");
  const completed = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    priorRuns: [priorRun({ id: 124, conclusion: "failure", created_at: "2026-01-01T00:00:02Z" })],
    priorJobs: { 124: { total_count: 1, jobs: [{ name: "Deploy and verify exact Pages artifact",
      status: "completed", conclusion: "failure", steps: [{ name: "Deploy exact Pages artifact",
        status: "completed", conclusion: "failure" }] }] } } });
  assert.equal((await gateRelease(completed.input, { fetchImpl: completed.fetchImpl })).decision,
    "reconcile-only");
});

test("completed predecessors are excluded only when jobs prove the deploy step never entered", async () => {
  const replaced = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    priorRuns: [priorRun({ conclusion: "cancelled" })],
    priorJobs: { 99: { total_count: 0, jobs: [] } } });
  assert.equal((await gateRelease(replaced.input, { fetchImpl: replaced.fetchImpl })).decision, "apply");
  const skipped = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    priorRuns: [priorRun({ conclusion: "failure" })], priorJobs: { 99: { total_count: 1,
      jobs: [{ name: "Deploy and verify exact Pages artifact", status: "completed", conclusion: "success",
        steps: [{ name: "Deploy exact Pages artifact", status: "completed", conclusion: "skipped" }] }] } } });
  assert.equal((await gateRelease(skipped.input, { fetchImpl: skipped.fetchImpl })).decision, "apply");
  const absentJob = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    priorRuns: [priorRun({ conclusion: "failure" })], priorJobs: { 99: { total_count: 1,
      jobs: [{ name: "Build exact Pages artifact", status: "completed", conclusion: "success", steps: [] }] } } });
  assert.equal((await gateRelease(absentJob.input, { fetchImpl: absentJob.fetchImpl })).decision, "apply");
  const absentStep = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    priorRuns: [priorRun({ conclusion: "failure" })], priorJobs: { 99: { total_count: 1,
      jobs: [{ name: "Deploy and verify exact Pages artifact", status: "completed", conclusion: "failure",
        steps: [{ name: "Gate exact Pages release effect", status: "completed", conclusion: "failure" }] }] } } });
  assert.equal((await gateRelease(absentStep.input, { fetchImpl: absentStep.fetchImpl })).decision, "apply");
  const entered = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    priorRuns: [priorRun({ conclusion: "failure" })], priorJobs: { 99: { total_count: 1,
      jobs: [{ name: "Deploy and verify exact Pages artifact", status: "completed", conclusion: "failure",
        steps: [{ name: "Deploy exact Pages artifact",
        status: "completed", conclusion: "failure", started_at: "2026-01-01T00:00:01Z" }] }] } } });
  assert.equal((await gateRelease(entered.input, { fetchImpl: entered.fetchImpl })).decision, "reconcile-only");
  const incomplete = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    priorRuns: [priorRun({ conclusion: "cancelled" })],
    priorJobs: { 99: { total_count: 1, jobs: [] } } });
  assert.equal((await gateRelease(incomplete.input, { fetchImpl: incomplete.fetchImpl })).decision,
    "reconcile-only");
});

test("reruns reconcile unless prior-attempt jobs prove the deploy step never entered", async () => {
  const rerun = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    inputOverrides: { runAttempt: 2 } });
  assert.equal((await gateRelease(rerun.input, { fetchImpl: rerun.fetchImpl })).decision, "reconcile-only");
  const safeRerun = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    inputOverrides: { runAttempt: 2 }, priorAttemptJobs: { 1: { total_count: 0, jobs: [] } } });
  assert.equal((await gateRelease(safeRerun.input, { fetchImpl: safeRerun.fetchImpl })).decision, "apply");
  const duplicate = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    priorRuns: [priorRun()] });
  assert.equal((await gateRelease(duplicate.input, { fetchImpl: duplicate.fetchImpl })).decision,
    "reconcile-only");
  const queued = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    priorRuns: [priorRun({ status: "queued", conclusion: null })] });
  assert.equal((await gateRelease(queued.input, { fetchImpl: queued.fetchImpl })).decision, "apply");
});

test("predecessor inventory paginates and fails closed when incomplete", async () => {
  const firstPage = Array.from({ length: 100 }, (_, index) => priorRun({ id: 1_000 + index }));
  const paged = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    priorRuns: firstPage });
  assert.equal((await gateRelease(paged.input, { fetchImpl: paged.fetchImpl })).decision, "reconcile-only");
  assert.equal(paged.calls.filter(call => call.url.includes("/actions/workflows/pages.yml/runs")).length, 2);
  const incomplete = makeRouter({ liveCarrier: "absent", deploymentStatuses: ["absent"],
    priorTotalCount: 1, priorRunPages: [[]] });
  assert.equal((await gateRelease(incomplete.input, { fetchImpl: incomplete.fetchImpl })).decision,
    "reconcile-only");
});

test("exact terminal provider and public state coalesces without another apply", async () => {
  const router = makeRouter({ liveCarrier: "exact", deploymentStatuses: ["succeed"],
    priorRuns: [priorRun()] });
  const gate = await gateRelease(router.input, { fetchImpl: router.fetchImpl });
  assert.equal(gate.decision, "coalesced-success");
  assert.equal(gate.verification.status, "verified");
});

test("same candidate with a different effect fails as a duplicate controller", async () => {
  const router = makeRouter({ deploymentStatuses: ["succeed"] });
  const competing = createReleaseCarrier({ ...router.input, policyDigest: "e".repeat(64) });
  const conflicted = makeRouter({ liveCarrier: competing, deploymentStatuses: ["succeed"] });
  await assert.rejects(
    gateRelease(conflicted.input, { fetchImpl: conflicted.fetchImpl }),
    error => error instanceof PagesReleaseError && error.code === "duplicate-release-controller",
  );
});

test("reconciliation accepts queued to succeed only after full public verification", async () => {
  const router = makeRouter({ deploymentStatuses: ["deployment_queued", "succeed"] });
  const result = await reconcileRelease({ ...router.input, gateDecision: "apply", pollAttempts: 2 },
    { fetchImpl: router.fetchImpl, sleep: async () => {} });
  assert.equal(result.status, "terminal-success");
  assert.equal(result.verification.status, "verified");
  assert.equal(result.gateDecision, "apply");
  assert.equal(result.providerArtifactId, router.input.providerArtifactId);
  assert.equal(result.workflowRunId, router.input.runId);
});

test("reconciliation rejects deadlines outside the internal workflow bound", async () => {
  for (const deadlineMs of [29_999, 330_001, 30_000.5]) {
    const router = makeRouter({ deploymentStatuses: ["succeed"] });
    await assert.rejects(reconcileRelease({ ...router.input, gateDecision: "apply", deadlineMs },
      { fetchImpl: router.fetchImpl }), error => error instanceof PagesReleaseError
        && error.code === "invalid-input");
    assert.equal(router.calls.length, 0);
  }
});

test("deployment visibility 404 is polled before an unknown-effect verdict", async () => {
  const router = makeRouter({ deploymentStatuses: ["absent", "deployment_queued", "succeed"] });
  const result = await reconcileRelease({ ...router.input, gateDecision: "apply", pollAttempts: 3 },
    { fetchImpl: router.fetchImpl, sleep: async () => {} });
  assert.equal(result.status, "terminal-success");
});

test("bounded nonterminal deployment is cancelled and confirmed without a second apply", async () => {
  const router = makeRouter({ deploymentStatuses: ["deployment_in_progress"],
    afterCancelStatuses: ["deployment_cancelled"] });
  const result = await reconcileRelease({ ...router.input, gateDecision: "reconcile-only",
    pollAttempts: 1, confirmAttempts: 1 }, { fetchImpl: router.fetchImpl, sleep: async () => {} });
  assert.equal(result.status, "terminal-blocked");
  assert.equal(result.providerStatus, "deployment_cancelled");
  assert.equal(router.calls.filter(call => call.method === "POST").length, 1);
});

test("cancellation race to succeed is verified as terminal success", async () => {
  const router = makeRouter({ deploymentStatuses: ["deployment_queued"],
    afterCancelStatuses: ["absent", "succeed"] });
  const result = await reconcileRelease({ ...router.input, gateDecision: "reconcile-only",
    pollAttempts: 1, confirmAttempts: 2 }, { fetchImpl: router.fetchImpl, sleep: async () => {} });
  assert.equal(result.status, "terminal-success");
  assert.equal(result.providerStatus, "succeed");
});

test("an uncertain cancel response is reconciled through provider readback", async () => {
  const router = makeRouter({ deploymentStatuses: ["deployment_in_progress"],
    cancelThrowsAfterAcceptance: true, afterCancelStatuses: ["deployment_cancelled"] });
  const result = await reconcileRelease({ ...router.input, gateDecision: "reconcile-only",
    pollAttempts: 1, confirmAttempts: 1 }, { fetchImpl: router.fetchImpl, sleep: async () => {} });
  assert.equal(result.status, "terminal-blocked");
  assert.equal(result.cancellationStatus, "uncertain");
});

test("404 and cancellation failure remain unknown-effect", async () => {
  const absent = makeRouter({ deploymentStatuses: ["absent"] });
  assert.equal((await reconcileRelease({ ...absent.input, gateDecision: "reconcile-only" },
    { fetchImpl: absent.fetchImpl, sleep: async () => {} })).status, "unknown-effect");
  const failedCancel = makeRouter({ deploymentStatuses: ["deployment_queued"], cancelStatus: 500 });
  const result = await reconcileRelease({ ...failedCancel.input, gateDecision: "reconcile-only",
    pollAttempts: 1, confirmAttempts: 1 }, { fetchImpl: failedCancel.fetchImpl, sleep: async () => {} });
  assert.equal(result.status, "unknown-effect");
  assert.equal(result.providerStatus, "absent-after-cancel");
});
