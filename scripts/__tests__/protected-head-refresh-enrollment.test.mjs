import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import yaml from "js-yaml";

const controllerPath = new URL("../../.github/workflows/auto-delivery.yml", import.meta.url);
const ciPath = new URL("../../.github/workflows/protected-head-refresh-ci.yml", import.meta.url);
const controllerSource = readFileSync(controllerPath, "utf8");
const ciSource = readFileSync(ciPath, "utf8");
const controller = yaml.load(controllerSource);
const ci = yaml.load(ciSource);

const controllerPin = "af3bff6f15ea2e6e7a01e461c077a6c99ac22a28";
const checkoutPin = "actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1";
const setupNodePin = "actions/setup-node@820762786026740c76f36085b0efc47a31fe5020";

function stepWithName(workflowJob, name) {
  const step = workflowJob.steps.find(candidate => candidate.name === name);
  assert.ok(step, `missing workflow step: ${name}`);
  return step;
}

function assertPinnedActions(workflowJob) {
  for (const step of workflowJob.steps.filter(candidate => candidate.uses)) {
    assert.ok(
      [checkoutPin, setupNodePin].includes(step.uses),
      `workflow action must use an audited immutable pin: ${step.uses}`,
    );
  }
}

function assertRequiredInputs(inputs, required) {
  for (const [name, type] of Object.entries(required)) {
    assert.ok(inputs[name], `missing required workflow input: ${name}`);
    assert.equal(inputs[name].required, true, `${name} must be required`);
    assert.equal(inputs[name].type, type, `${name} must preserve its canonical type`);
  }
}

function assertNoUnexpectedWrites(permissions, allowedWrites) {
  for (const [name, value] of Object.entries(permissions)) {
    if (value === "write") {
      assert.ok(allowedWrites.has(name), `unexpected write permission: ${name}`);
    }
  }
}

test("the external controller is dispatch-only and exposes the bounded projection", () => {
  assert.deepEqual(Object.keys(controller.on), ["workflow_dispatch"]);
  assert.deepEqual(controller.permissions, {});
  assert.doesNotMatch(controllerSource, /pull_request_target|secrets\./u);

  const inputs = controller.on.workflow_dispatch.inputs;
  assertRequiredInputs(inputs, {
    operation: "string",
    pull_request_number: "number",
    branch: "string",
    delivered_head_sha: "string",
    observed_head_sha: "string",
    target_main_sha: "string",
    canonical_base_sha: "string",
    claim_id: "string",
    claim_digest: "string",
    ledger_revision: "string",
    review_request_id: "string",
    pull_request_node_id: "string",
    pull_request_title: "string",
    auto_merge_method: "string",
    auto_merge_enabled_by_database_id: "string",
    auto_merge_enabled_by_node_id: "string",
    auto_merge_enabled_by_login: "string",
    auto_merge_enabled_by_type: "string",
    auto_merge_commit_title: "string",
    auto_merge_commit_message: "string",
    candidate_auto_merge_commit_title: "string",
    candidate_auto_merge_commit_message: "string",
    integration_receipt_digest: "string",
    transition_counter: "string",
    operation_id: "string",
  });
});

test("the external controller pins authority and the ruleset-only repository policy", () => {
  const job = controller.jobs["protected-head-refresh"];
  assert.equal(job.permissions.actions, "write");
  assert.equal(job.permissions.checks, "write");
  assert.equal(job.permissions.contents, "write");
  assert.equal(job.permissions["pull-requests"], "read");
  assertNoUnexpectedWrites(job.permissions, new Set(["actions", "checks", "contents"]));
  assert.equal(job.concurrency["cancel-in-progress"], false);
  assert.match(job.if, /github\.ref == 'refs\/heads\/main'/u);
  assert.match(job.if, /protected-head-refresh-recover-absent-merged-authorization/u);
  assertPinnedActions(job);

  const sourceCheckout = stepWithName(job, "Checkout guideline site protected main");
  assert.equal(sourceCheckout.uses, checkoutPin);
  assert.equal(sourceCheckout.with.ref, "${{ github.sha }}");
  assert.equal(sourceCheckout.with["persist-credentials"], false);
  assert.equal(sourceCheckout.with["fetch-depth"], 0);

  const controllerCheckout = stepWithName(job, "Checkout pinned Agentic Canvas OS controller");
  assert.equal(controllerCheckout.with.repository, "huijoohwee/agentic-canvas-os");
  assert.equal(controllerCheckout.with.ref, controllerPin);
  assert.equal(controllerCheckout.with.path, ".agentic-canvas-os");
  assert.equal(controllerCheckout.with["persist-credentials"], false);

  const run = stepWithName(job, "Run pinned protected head-refresh controller");
  assert.equal(run.env.GH_TOKEN, "${{ github.token }}");
  assert.equal(run.env.AGENTIC_LEDGER_REPOSITORY, "huijoohwee/agentic-canvas-os");
  assert.equal(run.env.PROTECTED_HEAD_REFRESH_CI_WORKFLOW, "protected-head-refresh-ci.yml");
  assert.deepEqual(JSON.parse(run.env.PROTECTED_HEAD_REFRESH_REQUIRED_CI_CONTEXTS_JSON), [
    "agentic-sdlc-policy-contract",
  ]);
  assert.deepEqual(JSON.parse(run.env.PROTECTED_HEAD_REFRESH_CLASSIC_REQUIRED_CHECKS_JSON), []);
  assert.deepEqual(JSON.parse(run.env.PROTECTED_HEAD_REFRESH_RULESET_REQUIRED_CHECKS_JSON), [
    "agentic-sdlc-policy-contract",
  ]);
  assert.deepEqual(JSON.parse(run.env.PROTECTED_HEAD_REFRESH_AUDITED_WORKFLOWS_JSON), [
    "auto-delivery.yml",
  ]);
  const autoMergeMappings = {
    PROTECTED_HEAD_REFRESH_AUTO_MERGE_METHOD: "auto_merge_method",
    PROTECTED_HEAD_REFRESH_AUTO_MERGE_ENABLED_BY_DATABASE_ID:
      "auto_merge_enabled_by_database_id",
    PROTECTED_HEAD_REFRESH_AUTO_MERGE_ENABLED_BY_NODE_ID:
      "auto_merge_enabled_by_node_id",
    PROTECTED_HEAD_REFRESH_AUTO_MERGE_ENABLED_BY_LOGIN: "auto_merge_enabled_by_login",
    PROTECTED_HEAD_REFRESH_AUTO_MERGE_ENABLED_BY_TYPE: "auto_merge_enabled_by_type",
    PROTECTED_HEAD_REFRESH_AUTO_MERGE_COMMIT_TITLE: "auto_merge_commit_title",
    PROTECTED_HEAD_REFRESH_AUTO_MERGE_COMMIT_MESSAGE: "auto_merge_commit_message",
    PROTECTED_HEAD_REFRESH_CANDIDATE_AUTO_MERGE_COMMIT_TITLE:
      "candidate_auto_merge_commit_title",
    PROTECTED_HEAD_REFRESH_CANDIDATE_AUTO_MERGE_COMMIT_MESSAGE:
      "candidate_auto_merge_commit_message",
  };
  for (const [environmentName, inputName] of Object.entries(autoMergeMappings)) {
    assert.equal(run.env[environmentName], `\${{ inputs.${inputName} }}`);
  }
  assert.equal(run.env.PROTECTED_HEAD_REFRESH_CONTROLLER_REVISION, "${{ github.sha }}");
  assert.match(run.run, /(?:^|\s)node \.agentic-canvas-os\/scripts\/sync-open-pr\.mjs --protected-head-refresh(?:\s|$)/u);
});

test("the dispatched CI proves the immutable candidate and open same-repository PR", () => {
  assert.deepEqual(Object.keys(ci.on), ["workflow_dispatch"]);
  assert.equal(ci.permissions.contents, "read");
  assert.equal(ci.permissions["pull-requests"], "read");
  assertNoUnexpectedWrites(ci.permissions, new Set());
  assert.equal(
    ci["run-name"],
    "${{ format('Protected head refresh {0} {1}', inputs.operation_id, inputs.expected_head_sha) }}",
  );
  assert.doesNotMatch(ciSource, /\b(?:actions|checks|contents|pull-requests): write\b|secrets\./u);

  const inputs = ci.on.workflow_dispatch.inputs;
  assertRequiredInputs(inputs, {
    operation: "string",
    pull_request_number: "string",
    branch: "string",
    expected_head_sha: "string",
    operation_id: "string",
  });

  const job = ci.jobs["protected-head-refresh"];
  assert.equal(job.name, "agentic-sdlc-policy-contract");
  assert.equal(ci.concurrency["cancel-in-progress"], false);
  assertPinnedActions(job);

  const checkout = stepWithName(job, "Checkout exact protected refresh candidate");
  assert.equal(checkout.with.ref, "${{ github.sha }}");
  assert.equal(checkout.with["persist-credentials"], false);
  assert.equal(checkout.with["fetch-depth"], 0);

  const authorize = stepWithName(job, "Authorize exact protected refresh dispatch");
  assert.equal(authorize.env.GH_TOKEN, "${{ github.token }}");
  assert.match(authorize.run, /DISPATCH_OPERATION" = "protected-head-refresh/u);
  assert.match(authorize.run, /\^\[1-9\]\[0-9\]\{0,9\}\$/u);
  assert.match(authorize.run, /\^\[0-9a-f\]\{40\}\$/u);
  assert.match(authorize.run, /\^\[0-9a-f\]\{64\}\$/u);
  assert.match(authorize.run, /git fetch --no-tags --no-recurse-submodules --depth=1 origin/u);
  assert.match(authorize.run, /protected-head-refresh-ci\.yml/u);
  assert.match(
    authorize.run,
    /candidate_blob="\$\(git rev-parse --verify "\$DISPATCH_EXPECTED_HEAD_SHA:\.github\/workflows\/protected-head-refresh-ci\.yml"\)"/u,
  );
  assert.match(
    authorize.run,
    /protected_blob="\$\(git rev-parse --verify "\$PROTECTED_MAIN_SHA:\.github\/workflows\/protected-head-refresh-ci\.yml"\)"/u,
  );
  assert.match(authorize.run, /\[ "\$candidate_blob" = "\$protected_blob" \]/u);
  assert.match(authorize.run, /pullRequest\.state !== "open"/u);
  assert.match(authorize.run, /pullRequest\.draft === true/u);
  assert.match(authorize.run, /pullRequest\.base\?\.sha !== process\.env\.PROTECTED_MAIN_SHA/u);
  assert.match(authorize.run, /pullRequest\.head\?\.repo\?\.full_name !== process\.env\.GITHUB_REPOSITORY/u);
});

test("dispatch verification stays deterministic while the PR check owns live review authority", () => {
  const job = ci.jobs["protected-head-refresh"];
  assert.match(stepWithName(job, "Install exact dependencies").run, /^npm ci(?:\s|$)/u);
  const contract = stepWithName(job, "Verify deterministic candidate contracts");
  assert.match(contract.run, /npm run adlc:policy:check/u);
  assert.match(contract.run, /npm run agenticrag:guidelines-map:check/u);
  assert.match(contract.run, /npm run git-guidelines:test/u);
  assert.doesNotMatch(contract.run, /npm test|npm run git-guidelines:check/u);
  assert.match(ciSource, /pull_request workflow owns live reviewed-claim verification/u);
  assert.doesNotMatch(ciSource, /verify-event|materialize-git-guidelines-review-authority/u);
});
