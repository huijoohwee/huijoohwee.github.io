import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import {
  chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import yaml from "js-yaml";

import { canonicalJson, createReleaseCarrier } from "../lib/git-guidelines/pages-release-controller.mjs";

const workflowPath = new URL("../../.github/workflows/guideline-contract.yml", import.meta.url);
const workflowSource = readFileSync(workflowPath, "utf8");
const workflow = yaml.load(workflowSource);
const steps = workflow.jobs["guideline-contract-check"].steps;
const sourceCheckout = steps[0];
const pagesWorkflowPath = new URL("../../.github/workflows/pages.yml", import.meta.url);
const pagesWorkflowSource = readFileSync(pagesWorkflowPath, "utf8");
const pagesWorkflow = yaml.load(pagesWorkflowSource);
const pagesControllerSource = readFileSync(new URL(
  "../lib/git-guidelines/pages-release-controller.mjs", import.meta.url,
));

function stepIndex(name) {
  return steps.findIndex(step => step.name === name);
}

test("pull requests check the exact authored head with protected history available", () => {
  assert.match(sourceCheckout.uses, /^actions\/checkout@[0-9a-f]{40}$/u);
  assert.equal(sourceCheckout.with["fetch-depth"], 0);
  assert.equal(
    sourceCheckout.with.ref,
    "${{ github.event_name == 'pull_request' && github.event.pull_request.head.sha || github.sha }}",
  );
});

test("pull requests bind the verified head to its source branch identity", () => {
  const bind = steps.find(step => step.name === "Bind exact pull-request branch identity");
  assert.equal(bind.if, "github.event_name == 'pull_request'");
  assert.equal(bind.env.REVIEW_BRANCH, "${{ github.head_ref }}");
  assert.equal(bind.env.REVIEW_SHA, "${{ github.event.pull_request.head.sha }}");
  assert.match(bind.run, /git check-ref-format --branch "\$REVIEW_BRANCH"/u);
  assert.match(bind.run, /git checkout -B "\$REVIEW_BRANCH" "\$REVIEW_SHA"/u);
  assert.equal((bind.run.match(/git rev-parse HEAD/gu) || []).length, 2);
});

test("the workflow materializes deterministic references without a competing controller", () => {
  assert.equal(workflow.permissions.contents, "read");
  assert.equal(workflow.permissions["pull-requests"], undefined);
  assert.deepEqual(workflow.on.pull_request.types, ["opened", "synchronize", "reopened", "ready_for_review"]);

  const references = steps.find(step => step.name === "Materialize deterministic workspace references");
  assert.match(references.run, /dev-source-resolver-cloud-request\.json/u);
  assert.match(references.run, /dev-source-resolver-write-scope\.json/u);
  assert.doesNotMatch(references.run, /agentic-canvas-os|cloud-collaboration|review-authority/u);

  const npmTestIndex = steps.findIndex(step => step.run === "npm test");
  assert.ok(stepIndex("Materialize deterministic workspace references") < npmTestIndex);

  assert.doesNotMatch(workflowSource, /\|\|\s*true|continue-on-error:\s*true/u);
  assert.doesNotMatch(workflowSource, /agentic-canvas-os|cloud-collaboration|review-authority/u);
});

test("Pages policy gates attest normalized semantics and reject security drift", () => {
  const authorizeGate = pagesWorkflow.jobs.authorize.steps.find(
    step => step.name === "Bind current protected canonical revision and trusted required check",
  );
  const deployGate = pagesWorkflow.jobs.deploy.steps.find(
    step => step.name === "Revalidate canonical, policy, and trusted check before deployment",
  );
  const fixture = createPolicyGateFixture();
  try {
    for (const sensitiveFields of ["omitted", "null"]) {
      const detail = cloneJson(fixture.detail);
      if (sensitiveFields === "null") {
        detail.bypass_actors = null;
        detail.current_user_can_bypass = null;
      }
      fixture.writeEvidence(detail, fixture.effective);
      fixture.execute(authorizeGate);
      fixture.execute(deployGate);
      assert.match(
        readFileSync(fixture.output, "utf8"),
        /policy_digest=ce9da7e7880473426467b73e5bde916e9033545c78f3fc763eb86691bf894ede/u,
      );
    }

    const metadataVariants = [
      detail => {
        detail.name = "Equivalent provider projection";
        detail.created_at = "2026-08-28T04:05:42.000Z";
        detail.updated_at = "2026-08-28T04:05:52.110Z";
        detail.node_id = "provider-local-node";
      },
      detail => { detail.id = 98765432; },
    ];
    for (const mutate of metadataVariants) {
      const detail = cloneJson(fixture.detail);
      mutate(detail);
      const effective = fixture.effective.map(rule => ({ ...rule, ruleset_id: detail.id }));
      fixture.writeEvidence(detail, effective);
      fixture.execute(authorizeGate);
      fixture.execute(deployGate);
    }

    const reorderedEffective = cloneJson(fixture.effective).reverse();
    reorderedEffective.find(rule => rule.type === "pull_request")
      .parameters.allowed_merge_methods.reverse();
    fixture.writeEvidence(fixture.detail, reorderedEffective);
    fixture.execute(authorizeGate);
    fixture.execute(deployGate);

    const mutations = [
      detail => { detail.bypass_actors = [{ actor_id: 1, actor_type: "RepositoryRole", bypass_mode: "always" }]; },
      detail => { detail.current_user_can_bypass = "always"; },
      detail => { detail.rules.find(rule => rule.type === "pull_request")
        .parameters.required_review_thread_resolution = false; },
      detail => { detail.rules.find(rule => rule.type === "required_status_checks")
        .parameters.strict_required_status_checks_policy = false; },
    ];
    for (const mutate of mutations) {
      const detail = cloneJson(fixture.detail);
      mutate(detail);
      fixture.writeEvidence(detail, fixture.effective);
      for (const gate of [authorizeGate, deployGate]) {
        assert.throws(() => fixture.execute(gate));
      }
    }

    const effectiveMutations = [
      rules => { rules.pop(); },
      rules => { rules.push({ ...rules[0], type: "update" }); },
      rules => { rules[0].ruleset_source = "foreign/repository"; },
    ];
    for (const mutate of effectiveMutations) {
      const effective = cloneJson(fixture.effective);
      mutate(effective);
      fixture.writeEvidence(fixture.detail, effective);
      for (const gate of [authorizeGate, deployGate]) {
        assert.throws(() => fixture.execute(gate));
      }
    }
  } finally {
    rmSync(fixture.root, { recursive: true, force: true });
  }
});

test("Pages assembly produces a verifiable non-hidden payload manifest and carrier", () => {
  const assemble = pagesWorkflow.jobs.build.steps.find(
    step => step.name === "Assemble and seal static site",
  );
  const fixture = createAssemblyFixture();
  try {
    execFileSync("/bin/bash", ["-e", "-u", "-o", "pipefail", "-c", assemble.run], {
      cwd: fixture.root,
      env: fixture.environment,
      stdio: "pipe",
    });
    const manifest = readFileSync(join(fixture.siteRoot, "release/files.sha256"), "utf8");
    const releaseBytes = readFileSync(join(fixture.siteRoot, "release/release.json"), "utf8");
    const release = JSON.parse(releaseBytes);
    const output = Object.fromEntries(readFileSync(fixture.output, "utf8").trim().split("\n")
      .map(line => [line.slice(0, line.indexOf("=")), line.slice(line.indexOf("=") + 1)]));
    const digest = createHash("sha256").update(manifest).digest("hex");
    const expected = createReleaseCarrier({ repository: fixture.repository,
      candidateSha: fixture.candidateSha, artifactId: output.artifact_id,
      payloadManifestDigest: digest, policyDigest: fixture.policyDigest });
    assert.equal(releaseBytes, `${canonicalJson(expected)}\n`);
    assert.equal(release.schema, "agentic-guideline-pages-release/v3");
    assert.deepEqual(release.target, { provider: "github-pages", environment: "github-pages",
      branch: "main", repository: fixture.repository });
    assert.equal(release.sourceRevision, fixture.candidateSha);
    assert.equal(release.payloadManifestDigest, digest);
    assert.equal(release.policyDigest, fixture.policyDigest);
    assert.equal(output.payload_manifest_digest, digest);
    assert.equal(release.artifactId, output.artifact_id);
    assert.equal(release.effectId, output.effect_id);
    assert.match(manifest, /\.\/index\.html/u);
    assert.match(manifest, /\.\/guidelines\/sample\.md/u);
    assert.ok(manifest.indexOf("./guidelines/a-foo.md") < manifest.indexOf("./guidelines/a/x.md"));
    assert.doesNotMatch(manifest, /\.\/release\//u);
  } finally {
    rmSync(fixture.root, { recursive: true, force: true });
  }
});

test("Pages assembly rejects symlinks instead of dereferencing them into the artifact", () => {
  const assemble = pagesWorkflow.jobs.build.steps.find(
    step => step.name === "Assemble and seal static site",
  );
  const fixture = createAssemblyFixture();
  try {
    symlinkSync("sample.md", join(fixture.root, "guidelines/alias.md"));
    assert.throws(() => execFileSync(
      "/bin/bash", ["-e", "-u", "-o", "pipefail", "-c", assemble.run],
      { cwd: fixture.root, env: fixture.environment, stdio: "pipe" },
    ));
  } finally {
    rmSync(fixture.root, { recursive: true, force: true });
  }
});

test("Pages assembly rejects a symlinked entry point and hidden source files", () => {
  const assemble = pagesWorkflow.jobs.build.steps.find(
    step => step.name === "Assemble and seal static site",
  );
  for (const kind of ["entry-symlink", "hidden-file"]) {
    const fixture = createAssemblyFixture();
    try {
      if (kind === "entry-symlink") {
        rmSync(join(fixture.root, "index.html"));
        symlinkSync("guidelines/sample.md", join(fixture.root, "index.html"));
      } else {
        writeFileSync(join(fixture.root, "guidelines/.hidden.md"), "# hidden\n");
      }
      assert.throws(() => execFileSync(
        "/bin/bash", ["-e", "-u", "-o", "pipefail", "-c", assemble.run],
        { cwd: fixture.root, env: fixture.environment, stdio: "pipe" },
      ));
    } finally {
      rmSync(fixture.root, { recursive: true, force: true });
    }
  }
});

test("Pages assembly requires a fresh output root with no unsealed release residue", () => {
  const assemble = pagesWorkflow.jobs.build.steps.find(
    step => step.name === "Assemble and seal static site",
  );
  const fixture = createAssemblyFixture();
  try {
    mkdirSync(fixture.siteRoot);
    mkdirSync(join(fixture.siteRoot, "release"));
    writeFileSync(join(fixture.siteRoot, "release/extra"), "unsealed\n");
    assert.throws(() => execFileSync(
      "/bin/bash", ["-e", "-u", "-o", "pipefail", "-c", assemble.run],
      { cwd: fixture.root, env: fixture.environment, stdio: "pipe" },
    ));
  } finally {
    rmSync(fixture.root, { recursive: true, force: true });
  }
});

function createAssemblyFixture() {
  const root = mkdtempSync(join(tmpdir(), "guideline-pages-assembly-"));
  const runnerTemp = join(root, "runner-temp");
  const output = join(root, "github-output.txt");
  const summary = join(root, "github-summary.txt");
  const siteRoot = join(runnerTemp, "pages-site");
  const candidateSha = "a".repeat(40);
  const policyDigest = "d".repeat(64);
  const repository = "huijoohwee/huijoohwee.github.io";
  mkdirSync(join(root, "guidelines/a"), { recursive: true });
  mkdirSync(join(root, "scripts/lib/git-guidelines"), { recursive: true });
  mkdirSync(runnerTemp);
  writeFileSync(join(root, "index.html"), "<!doctype html><title>fixture</title>\n");
  writeFileSync(join(root, "guidelines/a-foo.md"), "# Before directory\n");
  writeFileSync(join(root, "guidelines/a/x.md"), "# Nested\n");
  writeFileSync(join(root, "guidelines/sample.md"), "# Fixture\n");
  writeFileSync(join(root, "scripts/lib/git-guidelines/pages-release-controller.mjs"),
    pagesControllerSource);
  writeFileSync(output, "");
  writeFileSync(summary, "");
  return {
    root,
    output,
    siteRoot,
    candidateSha, policyDigest, repository,
    environment: {
      ...process.env,
      CANDIDATE_SHA: candidateSha,
      GITHUB_REPOSITORY: repository,
      GITHUB_OUTPUT: output,
      GITHUB_STEP_SUMMARY: summary,
      POLICY_DIGEST: policyDigest,
      RUNNER_TEMP: runnerTemp,
      SITE_ROOT: siteRoot,
    },
  };
}
function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function createPolicyGateFixture() {
  const root = mkdtempSync(join(tmpdir(), "guideline-pages-policy-"));
  const fakeBin = join(root, "bin");
  const output = join(root, "github-output.txt");
  const summary = join(root, "github-summary.txt");
  const detailPath = join(root, "ruleset.json");
  const effectivePath = join(root, "effective-rules.json");
  const checkPath = join(root, "check.json");
  const runPath = join(root, "run.json");
  const pagesConfigPath = join(root, "pages-config.json");
  const candidateSha = "b".repeat(40);
  const repository = "huijoohwee/huijoohwee.github.io";
  const detail = {
    id: 20008203, name: "Agentic SDLC policy contract", target: "branch",
    source_type: "Repository", source: repository, enforcement: "active",
    conditions: { ref_name: { exclude: [], include: ["~DEFAULT_BRANCH"] } },
    rules: [
      { type: "deletion" },
      { type: "non_fast_forward" },
      { type: "required_linear_history" },
      {
        type: "pull_request",
        parameters: {
          allowed_merge_methods: ["merge", "squash", "rebase"],
          dismiss_stale_reviews_on_push: false, require_code_owner_review: false,
          require_extra_approval_for_unattributed_changes: true,
          require_last_push_approval: false, required_approving_review_count: 0,
          required_review_thread_resolution: true, required_reviewers: [],
        },
      },
      {
        type: "required_status_checks",
        parameters: {
          do_not_enforce_on_create: false,
          required_status_checks: [{ context: "agentic-sdlc-policy-contract", integration_id: 15368 }],
          strict_required_status_checks_policy: true,
        },
      },
    ],
    updated_at: "2026-07-30T00:43:30.062Z",
  };
  const effective = detail.rules.map(rule => ({
    ruleset_id: detail.id, ruleset_source_type: detail.source_type,
    ruleset_source: detail.source, type: rule.type,
    ...(rule.parameters ? { parameters: rule.parameters } : {}),
  }));
  mkdirSync(fakeBin);
  writeFileSync(output, "");
  writeFileSync(summary, "");
  writeFileSync(pagesConfigPath, JSON.stringify({
    build_type: "workflow", html_url: "https://huijoohwee.github.io/", cname: null,
  }));
  writeFileSync(checkPath, JSON.stringify({
    id: 99, status: "completed", conclusion: "success", head_sha: candidateSha,
    app: { id: 15368, slug: "github-actions" },
    details_url: `https://github.com/${repository}/actions/runs/123/job/456`,
  }));
  writeFileSync(runPath, JSON.stringify({
    path: ".github/workflows/guideline-contract.yml", event: "push", head_branch: "main",
    head_sha: candidateSha, status: "completed", conclusion: "success",
  }));
  const ghPath = join(fakeBin, "gh");
  writeFileSync(ghPath, `#!/bin/sh
set -eu
case "$*" in
  (*git/ref/heads/main*) printf '%s\\n' "$CANDIDATE_SHA" ;;
  (*repos/*/pages*) cat "$PAGES_CONFIG_PATH" ;;
  (*rulesets/*) cat "$RULESET_DETAIL_PATH" ;;
  (*rules/branches/main?per_page=100*) cat "$EFFECTIVE_RULES_PATH" ;;
  (*commits/*/check-runs*) cat "$CHECK_RUN_PATH" ;;
  (*actions/runs/123*) cat "$WORKFLOW_RUN_PATH" ;;
  (*) exit 64 ;;
esac
`);
  chmodSync(ghPath, 0o755);
  const environment = {
    ...process.env,
    ARTIFACT_ID: `agentic-guideline-pages-release:${candidateSha}:${"c".repeat(64)}`,
    CANDIDATE_SHA: candidateSha, CHECK_RUN_PATH: checkPath,
    DISPATCH_REF: "refs/heads/main", DISPATCH_REF_PROTECTED: "true", DISPATCH_SHA: candidateSha,
    EFFECTIVE_RULES_PATH: effectivePath, EXPECTED_CHECK_APP_ID: "15368",
    EXPECTED_PAGE_URL: "https://huijoohwee.github.io/",
    EXPECTED_POLICY_DIGEST: "ce9da7e7880473426467b73e5bde916e9033545c78f3fc763eb86691bf894ede",
    EXPECTED_RULESET_ATTESTATION_DIGEST: "ce9da7e7880473426467b73e5bde916e9033545c78f3fc763eb86691bf894ede",
    EXPECTED_RULESET_SEMANTIC_DIGEST: "60fc488c90cac661648ff73c8afe6a0f428d7bc69b74bf0dd6185934c4ca4799",
    GH_TOKEN: "fixture-token", GITHUB_OUTPUT: output,
    GITHUB_REPOSITORY: repository, GITHUB_STEP_SUMMARY: summary,
    PAGES_CONFIG_PATH: pagesConfigPath, PATH: `${fakeBin}:${process.env.PATH}`,
    PAYLOAD_MANIFEST_DIGEST: "c".repeat(64),
    PROVIDER_ARTIFACT_ID: "321", RULESET_DETAIL_PATH: detailPath,
    RUN_ATTEMPT: "1", WORKFLOW_RUN_PATH: runPath, WORKFLOW_SHA: candidateSha,
  };
  return {
    root, output, detail, effective,
    writeEvidence(detailValue, effectiveValue) {
      writeFileSync(detailPath, JSON.stringify(detailValue));
      writeFileSync(effectivePath, JSON.stringify(effectiveValue));
    },
    execute(step) {
      const renderedRun = step.run.replaceAll("${{ github.actor_id }}", "1234");
      execFileSync("/bin/bash", ["-e", "-u", "-o", "pipefail", "-c", renderedRun], {
        cwd: root, env: environment, stdio: "pipe",
      });
    },
  };
}
