import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import yaml from "js-yaml";

const ciPath = new URL("../../.github/workflows/protected-head-refresh-ci.yml", import.meta.url);
const ciSource = readFileSync(ciPath, "utf8");
const ci = yaml.load(ciSource);

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
  assert.equal(job.name, "adlc-policy-contract");
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
