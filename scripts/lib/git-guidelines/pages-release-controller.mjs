#!/usr/bin/env node
import { createHash } from "node:crypto";
import { appendFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
export const RELEASE_SCHEMA = "agentic-guideline-pages-release/v3";
export const GATE_SCHEMA = "agentic-guideline-pages-release-gate/v1";
export const RESULT_SCHEMA = "agentic-guideline-pages-release-result/v1";
const EFFECT_SCHEMA = "agentic-guideline-pages-release-effect/v1";
const TARGET = Object.freeze({ provider: "github-pages", environment: "github-pages", branch: "main" });
const HEX_40 = /^[0-9a-f]{40}$/u, HEX_64 = /^[0-9a-f]{64}$/u, POSITIVE_DECIMAL = /^[1-9][0-9]*$/u;
const TERMINAL_FAILURES = new Set(["deployment_failed", "deployment_perms_error", "deployment_content_failed", "deployment_cancelled", "deployment_lost"]);
const NONTERMINAL_STATUSES = new Set(["queued", "pending", "in_progress", "building", "deployment_queued", "deployment_in_progress", "syncing_files", "unknown_status", "not_found", "deployment_attempt_error"]);
const INSPECTABLE_RUN_CONCLUSIONS = new Set(["action_required", "cancelled", "failure", "neutral", "skipped", "stale", "startup_failure", "timed_out"]);
const NO_EFFECT_RUN_STATUSES = new Set(["queued", "pending", "requested", "waiting"]);
const [EFFECT_JOB_NAME, EFFECT_STEP_NAME] = ["Deploy and verify exact Pages artifact", "Deploy exact Pages artifact"];
export class PagesReleaseError extends Error {
  constructor(code, message, details = {}) {
    super(message); this.name = "PagesReleaseError"; this.code = code; this.details = details;
  } }
function requireCondition(condition, code, message, details) {
  if (!condition) throw new PagesReleaseError(code, message, details); }
function sortedJsonValue(value) {
  if (Array.isArray(value)) return value.map(sortedJsonValue);
  if (value && typeof value === "object") return Object.fromEntries(
    Object.keys(value).sort().map(key => [key, sortedJsonValue(value[key])]),
  );
  return value;
}
export function canonicalJson(value) { return JSON.stringify(sortedJsonValue(value)); }
export function sha256(value) { return createHash("sha256").update(value).digest("hex"); }
function exactKeys(value, expected, label) {
  requireCondition(value && typeof value === "object" && !Array.isArray(value),
    "invalid-evidence", `${label} must be an object.`);
  requireCondition(JSON.stringify(Object.keys(value).sort()) === JSON.stringify([...expected].sort()),
    "invalid-evidence", `${label} fields are not exact.`); }
function validateRepository(repository) {
  requireCondition(/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u.test(repository)
    && repository.split("/").every(component => component !== "." && component !== ".."),
  "invalid-input", "Repository must be owner/name without dot segments.");
  return repository; }
function validateId(value, label) {
  requireCondition(typeof value === "string" && POSITIVE_DECIMAL.test(value), "invalid-input",
    `${label} must be a canonical positive decimal string.`);
  return value; }
function observedId(value) {
  if (typeof value === "string") return POSITIVE_DECIMAL.test(value) ? value : null;
  return typeof value === "number" && Number.isSafeInteger(value) && value > 0 ? String(value) : null; }
function validateExpected(input) {
  const candidateSha = String(input.candidateSha || "");
  const payloadManifestDigest = String(input.payloadManifestDigest || "");
  const policyDigest = String(input.policyDigest || "");
  const artifactId = String(input.artifactId || "");
  const repository = validateRepository(String(input.repository || ""));
  requireCondition(HEX_40.test(candidateSha), "invalid-input", "Candidate SHA is invalid.");
  requireCondition(HEX_64.test(payloadManifestDigest), "invalid-input", "Manifest digest is invalid.");
  requireCondition(HEX_64.test(policyDigest), "invalid-input", "Policy digest is invalid.");
  requireCondition(
    artifactId === `agentic-guideline-pages-release:${candidateSha}:${payloadManifestDigest}`,
    "invalid-input", "Logical artifact identity is invalid.",
  );
  return { repository, candidateSha, artifactId, payloadManifestDigest, policyDigest };
}
export function createReleaseCarrier(input) {
  const expected = validateExpected(input);
  const effect = {
    schema: EFFECT_SCHEMA,
    target: { ...TARGET, repository: expected.repository },
    sourceRevision: expected.candidateSha,
    artifactId: expected.artifactId,
    payloadManifestDigest: expected.payloadManifestDigest,
    policyDigest: expected.policyDigest,
  };
  return {
    schema: RELEASE_SCHEMA,
    target: effect.target,
    sourceRevision: expected.candidateSha,
    artifactId: expected.artifactId,
    payloadManifestDigest: expected.payloadManifestDigest,
    policyDigest: expected.policyDigest,
    effectId: sha256(canonicalJson(effect)),
  };
}
function validateCarrier(value, expectedCarrier) {
  exactKeys(value, [
    "schema", "target", "sourceRevision", "artifactId", "payloadManifestDigest", "policyDigest", "effectId",
  ], "Release carrier");
  exactKeys(value.target, ["provider", "environment", "branch", "repository"], "Release target");
  requireCondition(canonicalJson(value) === canonicalJson(expectedCarrier),
    "release-identity-drift", "Release carrier does not match the sealed effect.");
  return value;
}
function decodeUtf8(bytes, label) {
  const text = bytes.toString("utf8");
  requireCondition(Buffer.from(text, "utf8").equals(bytes),
    "invalid-public-bytes", `${label} is not canonical UTF-8.`);
  return text; }
export function parsePayloadManifest(bytes) {
  const text = decodeUtf8(bytes, "Payload manifest");
  requireCondition(text.endsWith("\n"), "invalid-manifest", "Payload manifest needs a final newline.");
  const lines = text.slice(0, -1).split("\n");
  requireCondition(lines.length > 0 && lines.length <= 10_000,
    "invalid-manifest", "Payload manifest entry count is invalid.");
  const entries = [];
  let previous = null;
  for (const line of lines) {
    const match = /^([0-9a-f]{64})  \.\/(.+)$/u.exec(line);
    requireCondition(match, "invalid-manifest", "Payload manifest line is malformed.");
    const relative = match[2];
    const segments = relative.split("/");
    requireCondition(
      !relative.includes("\\") && !relative.includes("%") && !relative.includes("?")
        && !relative.includes("#") && !/[\u0000-\u001f\u007f]/u.test(relative)
        && segments.every(segment => segment && segment !== "." && segment !== ".." && !segment.startsWith("."))
        && segments[0] !== "release",
      "invalid-manifest", "Payload manifest path is ambiguous or reserved.", { relative },
    );
    if (previous !== null) requireCondition(Buffer.compare(Buffer.from(previous), Buffer.from(relative)) < 0,
      "invalid-manifest", "Payload manifest paths must be unique and byte-sorted.");
    previous = relative;
    entries.push({ digest: match[1], relative });
  }
  return entries;
}
function normalizePageBase(pageUrl) {
  const base = new URL(pageUrl);
  requireCondition(base.protocol === "https:" && !base.username && !base.password
    && !base.search && !base.hash, "invalid-input", "Pages URL must be an HTTPS origin path.");
  if (!base.pathname.endsWith("/")) base.pathname += "/";
  return base; }
function publicUrl(pageUrl, relative, candidateSha, effectId) {
  const base = normalizePageBase(pageUrl);
  const encoded = relative.split("/").map(segment => encodeURIComponent(segment)).join("/");
  const result = new URL(encoded, base);
  requireCondition(result.origin === base.origin && result.pathname.startsWith(base.pathname),
    "invalid-public-url", "Public payload URL escaped the Pages target.");
  result.searchParams.set("candidate", candidateSha);
  result.searchParams.set("effect", effectId);
  return result;
}
async function fetchBounded(fetchImpl, url, options = {}) {
  const remainingMs = options.deadlineAt === undefined ? Infinity : options.deadlineAt - Date.now();
  requireCondition(remainingMs > 0, "reconciliation-deadline", "Release reconciliation deadline expired.");
  const timeoutMs = Math.min(options.timeoutMs ?? 15_000, remainingMs);
  const maxBytes = options.maxBytes ?? 64 * 1024 * 1024;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchImpl(url, { ...options.request, redirect: "manual", signal: controller.signal });
    const expectedUrl = new URL(url);
    const observedUrl = new URL(response.url || url);
    requireCondition(!response.redirected && observedUrl.href === expectedUrl.href,
      "redirect-rejected", "HTTP response did not preserve the exact requested URL.");
    const contentLength = response.headers?.get?.("content-length");
    if (contentLength !== null && contentLength !== undefined && contentLength !== "") {
      requireCondition(/^\d+$/u.test(contentLength) && BigInt(contentLength) <= BigInt(maxBytes),
        "response-too-large", "HTTP Content-Length is invalid or exceeds the byte limit.");
    }
    let bytes;
    if (response.body?.getReader) {
      const chunks = [];
      let length = 0;
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = Buffer.from(value);
        length += chunk.length;
        if (length > maxBytes) { controller.abort(); try { await reader.cancel(); } catch {}
          throw new PagesReleaseError("response-too-large", "HTTP response exceeded the byte limit."); }
        chunks.push(chunk);
      }
      bytes = Buffer.concat(chunks, length);
    } else {
      bytes = Buffer.from(await response.arrayBuffer());
      requireCondition(bytes.length <= maxBytes, "response-too-large", "HTTP response exceeded the byte limit.");
    }
    return { response, bytes };
  } finally {
    clearTimeout(timer);
  }
}
async function publicBytes(fetchImpl, pageUrl, relative, carrier, options = {}) {
  const url = publicUrl(pageUrl, relative, carrier.sourceRevision, carrier.effectId);
  const result = await fetchBounded(fetchImpl, url, {
    ...options,
    request: { cache: "no-store", headers: { "Cache-Control": "no-cache" }, ...(options.request || {}) },
  });
  requireCondition(result.response.status === 200, "public-read-failed",
    `Public read failed with HTTP ${result.response.status}.`, { relative });
  return result.bytes;
}
function apiUrl(apiBase, repository, suffix) {
  const base = new URL(apiBase || "https://api.github.com");
  requireCondition(base.protocol === "https:", "invalid-input", "GitHub API base must be HTTPS.");
  return new URL(`/repos/${repository}${suffix}`, base); }
async function apiRequest(fetchImpl, options, suffix, init = {}, allowed = [200]) {
  const url = apiUrl(options.apiBase, options.repository, suffix);
  const result = await fetchBounded(fetchImpl, url, {
    timeoutMs: options.timeoutMs,
    deadlineAt: options.deadlineAt,
    maxBytes: 8 * 1024 * 1024,
    request: {
      ...init,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${options.token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        ...(init.headers || {}),
      },
    },
  });
  requireCondition(allowed.includes(result.response.status), "github-api-failed",
    `GitHub API returned HTTP ${result.response.status}.`, { suffix });
  if (result.response.status === 204 || result.bytes.length === 0) return { status: result.response.status, value: null };
  let value;
  try { value = JSON.parse(decodeUtf8(result.bytes, "GitHub API response")); }
  catch (error) { throw new PagesReleaseError("invalid-github-response", error.message, { suffix }); }
  return { status: result.response.status, value };
}
async function parallelMap(values, concurrency, mapper) {
  const results = new Array(values.length);
  let cursor = 0, failed = false;
  async function worker() {
    while (!failed && cursor < values.length) {
      const index = cursor++;
      try { results[index] = await mapper(values[index], index); }
      catch (error) { failed = true; throw error; }
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, worker));
  return results;
}
export async function verifyPublicRelease(input, dependencies = {}) {
  const expected = validateExpected(input);
  const carrier = createReleaseCarrier(expected);
  requireCondition(input.effectId === carrier.effectId, "effect-id-drift", "Effect ID is not deterministic.");
  requireCondition(input.token, "invalid-input", "GitHub token is required.");
  const fetchImpl = dependencies.fetchImpl || globalThis.fetch;
  const concurrency = Number(input.concurrency ?? 8);
  requireCondition(Number.isInteger(concurrency) && concurrency >= 1 && concurrency <= 8,
    "invalid-input", "Fetch concurrency must be between one and eight.");
  const [releaseBefore, manifestBefore] = await Promise.all([
    publicBytes(fetchImpl, input.pageUrl, "release/release.json", carrier, dependencies),
    publicBytes(fetchImpl, input.pageUrl, "release/files.sha256", carrier, dependencies),
  ]);
  let releaseValue;
  try { releaseValue = JSON.parse(decodeUtf8(releaseBefore, "Release carrier")); }
  catch (error) { throw new PagesReleaseError("invalid-release-carrier", error.message); }
  validateCarrier(releaseValue, carrier);
  requireCondition(releaseBefore.equals(Buffer.from(`${canonicalJson(carrier)}\n`)),
    "release-carrier-byte-drift", "Public release carrier bytes are not canonical.");
  requireCondition(sha256(manifestBefore) === carrier.payloadManifestDigest,
    "manifest-digest-drift", "Public payload manifest digest does not match the effect.");
  const entries = parsePayloadManifest(manifestBefore);
  await parallelMap(entries, concurrency, async entry => {
    const bytes = await publicBytes(fetchImpl, input.pageUrl, entry.relative, carrier, dependencies);
    requireCondition(sha256(bytes) === entry.digest,
      "payload-digest-drift", "Public payload bytes do not match the manifest.", { relative: entry.relative });
  });
  const [releaseAfter, manifestAfter] = await Promise.all([
    publicBytes(fetchImpl, input.pageUrl, "release/release.json", carrier, dependencies),
    publicBytes(fetchImpl, input.pageUrl, "release/files.sha256", carrier, dependencies),
  ]);
  requireCondition(releaseAfter.equals(releaseBefore) && manifestAfter.equals(manifestBefore),
    "carrier-changed-during-verification", "Public release carriers changed during verification.");
  const main = await apiRequest(fetchImpl, input, "/git/ref/heads/main");
  requireCondition(main.value?.object?.sha === carrier.sourceRevision,
    "protected-main-drift", "Protected main changed during public verification.");
  return {
    schema: "agentic-guideline-pages-public-verification/v1",
    status: "verified",
    effectId: carrier.effectId,
    sourceRevision: carrier.sourceRevision,
    payloadManifestDigest: carrier.payloadManifestDigest,
    verifiedFileCount: entries.length,
    releaseCarrierDigest: sha256(releaseBefore),
  };
}
async function currentRunEvidence(fetchImpl, input) {
  const run = await apiRequest(fetchImpl, input, `/actions/runs/${input.runId}`);
  const value = run.value;
  requireCondition(observedId(value?.id) === input.runId
    && value.event === "workflow_dispatch"
    && value.path === ".github/workflows/pages.yml"
    && value.head_branch === "main"
    && value.head_sha === input.candidateSha
    && observedId(value.run_attempt) === String(input.runAttempt)
    && observedId(value.actor?.id) === input.expectedOperatorId
    && observedId(value.triggering_actor?.id) === input.expectedOperatorId
    && !Number.isNaN(Date.parse(value.created_at)),
  "run-identity-drift", "Current workflow run identity is not exact.");
  return value;
}
async function priorCandidateRuns(fetchImpl, input, currentRun) {
  const query = new URLSearchParams({
    branch: "main", event: "workflow_dispatch", head_sha: input.candidateSha, per_page: "100",
  });
  const inventory = [];
  let totalCount = null;
  for (let page = 1; page <= 10; page += 1) {
    query.set("page", String(page));
    const response = await apiRequest(fetchImpl, input, `/actions/workflows/pages.yml/runs?${query}`);
    const value = response.value;
    requireCondition(Number.isInteger(value?.total_count) && value.total_count >= 0
      && Array.isArray(value.workflow_runs) && value.workflow_runs.length <= 100
      && (totalCount === null || totalCount === value.total_count),
    "invalid-github-response", "Workflow run inventory is malformed.");
    totalCount = value.total_count;
    inventory.push(...value.workflow_runs);
    if (inventory.length >= totalCount || value.workflow_runs.length < 100) break;
  }
  requireCondition(inventory.length <= totalCount
    && new Set(inventory.map(run => observedId(run.id))).size === inventory.length
    && inventory.every(run => observedId(run.id) !== null
    && run.event === "workflow_dispatch" && run.head_sha === input.candidateSha
    && run.path === ".github/workflows/pages.yml" && typeof run.status === "string"
    && (run.status !== "completed" || typeof run.conclusion === "string")
    && !Number.isNaN(Date.parse(run.created_at))),
  "invalid-github-response", "Workflow run inventory contains a foreign run.");
  const candidates = inventory.filter(run => observedId(run.id) !== input.runId
    && !NO_EFFECT_RUN_STATUSES.has(run.status));
  const checks = candidates.map(run => () => provedNeverEnteredEffect(fetchImpl, input, run));
  for (let attempt = 1; attempt < Number(input.runAttempt); attempt += 1) checks.push(() =>
    jobsProveNoEffect(fetchImpl, input, `/actions/runs/${input.runId}/attempts/${attempt}/jobs?per_page=100`));
  const noEffect = await parallelMap(checks, 4, check => check());
  const possible = candidates.filter((_, index) => !noEffect[index]);
  if (inventory.length < totalCount || !inventory.some(run => observedId(run.id) === input.runId)
    || noEffect.slice(candidates.length).includes(false)) possible.push({ inventoryIncomplete: true });
  return possible;
}
async function provedNeverEnteredEffect(fetchImpl, input, run) {
  if (run.status !== "completed" || !INSPECTABLE_RUN_CONCLUSIONS.has(run.conclusion)) return false;
  return jobsProveNoEffect(fetchImpl, input, `/actions/runs/${run.id}/jobs?filter=all&per_page=100`);
}
async function jobsProveNoEffect(fetchImpl, input, suffix) {
  const value = (await apiRequest(fetchImpl, input, suffix)).value;
  requireCondition(Number.isInteger(value?.total_count) && value.total_count >= 0 && Array.isArray(value.jobs),
    "invalid-github-response", "Workflow job inventory is malformed.");
  if (value.total_count !== value.jobs.length || value.jobs.some(job => typeof job?.name !== "string"
    || job.status !== "completed" || typeof job.conclusion !== "string" || !Array.isArray(job.steps)
    || job.steps.some(step => !step || typeof step.name !== "string" || step.status !== "completed"
      || typeof step.conclusion !== "string"))) return false;
  if (value.jobs.length === 0) return true;
  const effectJobs = value.jobs.filter(job => job.name === EFFECT_JOB_NAME);
  return effectJobs.length === 0 || effectJobs.every(job => {
    const steps = job.steps.filter(step => step.name === EFFECT_STEP_NAME);
    return steps.length === 0 || steps.every(step => step.conclusion === "skipped");
  });
}
async function artifactEvidence(fetchImpl, input) {
  const artifact = await apiRequest(fetchImpl, input, `/actions/artifacts/${input.providerArtifactId}`);
  requireCondition(observedId(artifact.value?.id) === input.providerArtifactId
    && artifact.value.name === "github-pages"
    && artifact.value.expired === false
    && observedId(artifact.value.workflow_run?.id) === input.runId,
  "artifact-identity-drift", "Provider artifact is not the current run's github-pages artifact.");
  return artifact.value;
}
async function deploymentEvidence(fetchImpl, input) {
  const result = await apiRequest(fetchImpl, input,
    `/pages/deployments/${input.candidateSha}`, {}, [200, 404]);
  if (result.status === 404) return null;
  requireCondition(result.value && typeof result.value.status === "string",
    "invalid-github-response", "Pages deployment response is malformed.");
  if (result.value.pages_build_version !== undefined) {
    requireCondition(result.value.pages_build_version === input.candidateSha,
      "deployment-identity-drift", "Pages deployment is bound to another candidate.");
  }
  return result.value;
}
async function optionalLiveCarrier(fetchImpl, input, carrier) {
  const url = publicUrl(input.pageUrl, "release/release.json", carrier.sourceRevision, carrier.effectId);
  const result = await fetchBounded(fetchImpl, url, { deadlineAt: input.deadlineAt });
  if (result.response.status === 404) return null;
  requireCondition(result.response.status === 200, "public-read-failed",
    `Release carrier read failed with HTTP ${result.response.status}.`);
  let value;
  try { value = JSON.parse(decodeUtf8(result.bytes, "Release carrier")); }
  catch (error) { throw new PagesReleaseError("invalid-release-carrier", error.message); }
  requireCondition(value && typeof value === "object" && !Array.isArray(value)
    && HEX_40.test(String(value.sourceRevision || ""))
    && ["agentic-guideline-pages-release/v2", RELEASE_SCHEMA].includes(value.schema),
  "invalid-release-carrier", "Live release carrier is structurally invalid.");
  if (value.schema === RELEASE_SCHEMA) {
    const normalized = createReleaseCarrier({
      repository: input.repository, candidateSha: value.sourceRevision, artifactId: value.artifactId,
      payloadManifestDigest: value.payloadManifestDigest, policyDigest: value.policyDigest,
    });
    validateCarrier(value, normalized);
  } else {
    exactKeys(value, ["schema", "sourceRevision", "artifactId", "payloadManifestDigest"], "Live v2 carrier");
    requireCondition(HEX_64.test(String(value.payloadManifestDigest || ""))
      && value.artifactId === `agentic-guideline-pages-release:${value.sourceRevision}:${value.payloadManifestDigest}`,
    "invalid-release-carrier", "Live v2 carrier identity is invalid.");
  }
  return value;
}
export async function gateRelease(input, dependencies = {}) {
  const expected = validateExpected(input);
  const carrier = createReleaseCarrier(expected);
  requireCondition(input.effectId === carrier.effectId, "effect-id-drift", "Effect ID is not deterministic.");
  requireCondition(input.token, "invalid-input", "GitHub token is required.");
  validateId(input.runId, "Workflow run ID");
  validateId(input.providerArtifactId, "Provider artifact ID");
  validateId(input.expectedOperatorId, "Expected repository owner ID");
  requireCondition((typeof input.runAttempt === "string" || Number.isSafeInteger(input.runAttempt))
    && /^(?:[1-9]|[1-9][0-9]|100)$/u.test(String(input.runAttempt)),
    "invalid-input", "Run attempt must be a canonical decimal string from 1 through 100.");
  const fetchImpl = dependencies.fetchImpl || globalThis.fetch;
  const currentRun = await currentRunEvidence(fetchImpl, input);
  const [priorRuns, deployment, liveCarrier, artifact, main] = await Promise.all([
    priorCandidateRuns(fetchImpl, input, currentRun), deploymentEvidence(fetchImpl, input),
    optionalLiveCarrier(fetchImpl, input, carrier), artifactEvidence(fetchImpl, input),
    apiRequest(fetchImpl, input, "/git/ref/heads/main"),
  ]);
  requireCondition(main.value?.object?.sha === carrier.sourceRevision,
    "protected-main-drift", "Protected main changed before the effect gate.");
  if (liveCarrier?.sourceRevision === carrier.sourceRevision) {
    requireCondition(liveCarrier.effectId === carrier.effectId,
      "duplicate-release-controller", "The same candidate has a competing release effect.");
  }
  if (deployment?.status === "succeed" && liveCarrier?.effectId === carrier.effectId) {
    const verification = await verifyPublicRelease(input, dependencies);
    return { schema: GATE_SCHEMA, decision: "coalesced-success", effectId: carrier.effectId,
      sourceRevision: carrier.sourceRevision,
      priorRunCount: priorRuns.length, providerStatus: deployment.status,
      providerArtifactId: observedId(artifact.id), workflowRunId: observedId(currentRun.id), verification };
  }
  const possiblePriorEffect = priorRuns.length > 0 || deployment !== null
    || liveCarrier?.effectId === carrier.effectId;
  return { schema: GATE_SCHEMA, decision: possiblePriorEffect ? "reconcile-only" : "apply",
    effectId: carrier.effectId, sourceRevision: carrier.sourceRevision, priorRunCount: priorRuns.length,
    providerStatus: deployment?.status || "absent", providerArtifactId: observedId(artifact.id),
    workflowRunId: observedId(currentRun.id) };
}
function result(carrier, input, status, providerStatus, extra = {}) {
  return { schema: RESULT_SCHEMA, status, effectId: carrier.effectId,
    sourceRevision: carrier.sourceRevision, gateDecision: input.gateDecision,
    providerArtifactId: input.providerArtifactId, workflowRunId: input.runId, providerStatus, ...extra };
}
async function sleepWithin(sleep, milliseconds, deadlineAt) {
  requireCondition(deadlineAt - Date.now() > milliseconds,
    "reconciliation-deadline", "Release reconciliation deadline would expire while waiting.");
  await sleep(milliseconds);
}
async function verifyWithRetry(input, dependencies, attempts) {
  const sleep = dependencies.sleep || (milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds)));
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try { return await verifyPublicRelease(input, dependencies); }
    catch (error) { lastError = error; }
    if (attempt < attempts) await sleepWithin(sleep, Number(input.pollIntervalMs ?? 10_000), dependencies.deadlineAt);
  }
  throw lastError;
}
export async function reconcileRelease(input, dependencies = {}) {
  const expected = validateExpected(input);
  const carrier = createReleaseCarrier(expected);
  requireCondition(input.effectId === carrier.effectId, "effect-id-drift", "Effect ID is not deterministic.");
  requireCondition(["apply", "reconcile-only", "coalesced-success"].includes(input.gateDecision),
    "invalid-input", "Gate decision is invalid.");
  requireCondition(input.token, "invalid-input", "GitHub token is required.");
  validateId(input.providerArtifactId, "Provider artifact ID");
  validateId(input.runId, "Workflow run ID");
  const deadlineMs = Number(input.deadlineMs ?? 300_000);
  requireCondition(Number.isInteger(deadlineMs) && deadlineMs >= 30_000 && deadlineMs <= 330_000,
    "invalid-input", "Reconciliation deadline is invalid.");
  const deadlineAt = Date.now() + deadlineMs;
  const scopedInput = { ...input, deadlineAt };
  const scopedDependencies = { ...dependencies, deadlineAt };
  if (input.gateDecision === "coalesced-success") {
    const verification = await verifyPublicRelease(scopedInput, scopedDependencies);
    return result(carrier, input, "coalesced-success", "succeed", { verification });
  }
  const fetchImpl = dependencies.fetchImpl || globalThis.fetch;
  const sleep = dependencies.sleep || (milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds)));
  const pollAttempts = Number(input.pollAttempts ?? 12);
  const confirmAttempts = Number(input.confirmAttempts ?? 6);
  const interval = Number(input.pollIntervalMs ?? 10_000);
  requireCondition(Number.isInteger(pollAttempts) && pollAttempts >= 1 && pollAttempts <= 60
    && Number.isInteger(confirmAttempts) && confirmAttempts >= 1 && confirmAttempts <= 30
    && Number.isInteger(interval) && interval >= 0 && interval <= 30_000,
  "invalid-input", "Reconciliation bounds are invalid.");
  for (let attempt = 1; attempt <= pollAttempts; attempt += 1) {
    const deployment = await deploymentEvidence(fetchImpl, scopedInput);
    if (!deployment) {
      if (attempt < pollAttempts) await sleepWithin(sleep, interval, deadlineAt);
      continue;
    }
    if (deployment.status === "succeed") {
      try {
        const verification = await verifyWithRetry(scopedInput, scopedDependencies, confirmAttempts);
        return result(carrier, input, "terminal-success", deployment.status, { verification });
      } catch (error) {
        return result(carrier, input, "unknown-effect", deployment.status, { errorCode: error.code || "verification-failed" });
      }
    }
    if (TERMINAL_FAILURES.has(deployment.status)) {
      return result(carrier, input, "terminal-blocked", deployment.status);
    }
    if (!NONTERMINAL_STATUSES.has(deployment.status)) {
      return result(carrier, input, "unknown-effect", deployment.status);
    }
    if (attempt < pollAttempts) await sleepWithin(sleep, interval, deadlineAt);
  }
  let cancellationStatus = "accepted";
  let cancellationErrorCode = null;
  try {
    const cancellation = await apiRequest(fetchImpl, scopedInput,
      `/pages/deployments/${input.candidateSha}/cancel`, { method: "POST" }, [204]);
    cancellationStatus = String(cancellation.status);
  } catch (error) {
    cancellationStatus = "uncertain";
    cancellationErrorCode = error.code || "cancel-failed";
  }
  for (let attempt = 1; attempt <= confirmAttempts; attempt += 1) {
    const deployment = await deploymentEvidence(fetchImpl, scopedInput);
    if (!deployment) {
      if (attempt < confirmAttempts) { await sleepWithin(sleep, interval, deadlineAt); continue; }
      return result(carrier, input, "unknown-effect", "absent-after-cancel",
        { cancellationStatus, cancellationErrorCode });
    }
    if (deployment.status === "succeed") {
      try {
        const verification = await verifyWithRetry(scopedInput, scopedDependencies, confirmAttempts);
        return result(carrier, input, "terminal-success", deployment.status, { verification });
      } catch (error) {
        return result(carrier, input, "unknown-effect", deployment.status, { errorCode: error.code || "verification-failed" });
      }
    }
    if (TERMINAL_FAILURES.has(deployment.status)) {
      return result(carrier, input, "terminal-blocked", deployment.status,
        { cancellationStatus, cancellationErrorCode });
    }
    if (!NONTERMINAL_STATUSES.has(deployment.status)) {
      return result(carrier, input, "unknown-effect", deployment.status);
    }
    if (attempt < confirmAttempts) await sleepWithin(sleep, interval, deadlineAt);
  }
  return result(carrier, input, "unknown-effect", "cancel-unconfirmed",
    { cancellationStatus, cancellationErrorCode });
}
function environmentInput(environment = process.env) {
  return {
    repository: environment.GITHUB_REPOSITORY, candidateSha: environment.CANDIDATE_SHA,
    artifactId: environment.ARTIFACT_ID, payloadManifestDigest: environment.PAYLOAD_MANIFEST_DIGEST,
    policyDigest: environment.POLICY_DIGEST, effectId: environment.EFFECT_ID,
    providerArtifactId: environment.PROVIDER_ARTIFACT_ID, token: environment.GH_TOKEN,
    apiBase: environment.GITHUB_API_URL, pageUrl: environment.PAGE_URL,
    runId: environment.GITHUB_RUN_ID, runAttempt: environment.GITHUB_RUN_ATTEMPT,
    expectedOperatorId: environment.EXPECTED_OPERATOR_ID, gateDecision: environment.GATE_DECISION,
    deadlineMs: environment.RECONCILIATION_DEADLINE_MS,
  };
}
function emitOutput(values, environment = process.env) {
  const lines = Object.entries(values).map(([key, value]) => `${key}=${value}\n`).join("");
  if (environment.GITHUB_OUTPUT) appendFileSync(environment.GITHUB_OUTPUT, lines);
  process.stdout.write(lines);
}
export async function runCli(argv = process.argv.slice(2), environment = process.env) {
  const command = argv[0];
  const input = environmentInput(environment);
  if (command === "seal") {
    const carrier = createReleaseCarrier(input);
    requireCondition(environment.RELEASE_CARRIER_PATH, "invalid-input", "Carrier path is required.");
    writeFileSync(environment.RELEASE_CARRIER_PATH, `${canonicalJson(carrier)}\n`, { flag: "wx", mode: 0o600 });
    emitOutput({ effect_id: carrier.effectId }, environment);
    return carrier;
  }
  if (command === "gate") {
    const gate = await gateRelease(input);
    emitOutput({ decision: gate.decision, controller_status: gate.decision,
      result_json: Buffer.from(canonicalJson(gate)).toString("base64") }, environment);
    return gate;
  }
  if (command === "verify-public") {
    const verification = await verifyPublicRelease(input);
    emitOutput({ controller_status: verification.status,
      result_json: Buffer.from(canonicalJson(verification)).toString("base64") }, environment);
    return verification;
  }
  if (command === "reconcile") {
    const reconciliation = await reconcileRelease(input);
    emitOutput({ controller_status: reconciliation.status,
      result_json: Buffer.from(canonicalJson(reconciliation)).toString("base64") }, environment);
    requireCondition(["terminal-success", "coalesced-success"].includes(reconciliation.status),
      reconciliation.status, `Pages release ended as ${reconciliation.status}.`);
    return reconciliation;
  }
  throw new PagesReleaseError("usage", "Usage: pages-release-controller.mjs seal|gate|reconcile|verify-public");
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli().catch(error => {
    const failure = { schema: RESULT_SCHEMA, status: "blocked", code: error.code || "unhandled-error",
      message: error.message, details: error.details || {} };
    process.stderr.write(`${canonicalJson(failure)}\n`);
    process.exitCode = 1;
  });
}
