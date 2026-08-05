import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import yaml from "js-yaml";

const workflowPath = new URL("../../.github/workflows/guideline-contract.yml", import.meta.url);
const workflowSource = readFileSync(workflowPath, "utf8");
const workflow = yaml.load(workflowSource);
const steps = workflow.jobs["guideline-contract-check"].steps;
const sourceCheckout = steps[0];

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

test("the workflow verifies and materializes the exact current pull-request authority", () => {
  assert.equal(workflow.permissions.contents, "read");
  assert.equal(workflow.permissions["pull-requests"], "read");
  assert.deepEqual(workflow.on.pull_request.types, ["opened", "synchronize", "reopened", "ready_for_review"]);

  const authorityCheckout = steps.find(step => step.name === "Checkout Agentic Canvas OS registrations");
  assert.match(authorityCheckout.uses, /^actions\/checkout@[0-9a-f]{40}$/u);
  assert.equal(authorityCheckout.with.repository, "huijoohwee/agentic-canvas-os");
  assert.match(authorityCheckout.with.ref, /^[0-9a-f]{40}$/u);
  assert.equal(authorityCheckout.with["persist-credentials"], false);

  const references = steps.find(step => step.name === "Materialize required Task 19 workspace references");
  assert.match(references.run, /dev-source-resolver-cloud-request\.json/u);
  assert.match(references.run, /dev-source-resolver-write-scope\.json/u);
  assert.doesNotMatch(references.run, /git-guidelines-(?:protected-squash-repair-v3|companion-ci-authority)/u);

  const verify = steps.find(step => step.name === "Verify current pull-request review authority");
  assert.equal(verify.if, "github.event_name == 'pull_request'");
  assert.equal(verify.env.AGENTIC_LEDGER_REPOSITORY, "huijoohwee/agentic-canvas-os");
  assert.equal(verify.env.GH_TOKEN, "${{ github.token }}");
  assert.match(verify.run, /cloud-collaboration\.mjs verify-event/u);
  assert.match(verify.run, /--event-path="\$GITHUB_EVENT_PATH"/u);

  const materialize = steps.find(step => step.name === "Materialize current pull-request review authority");
  assert.equal(materialize.if, "github.event_name == 'pull_request'");
  assert.match(materialize.run, /materialize-git-guidelines-review-authority\.mjs/u);
  assert.match(materialize.run, /--verification-path="\$RUNNER_TEMP\/git-guidelines-review-authority\.json"/u);
  assert.match(materialize.run, /--ledger-repository="huijoohwee\/agentic-canvas-os"/u);

  const npmTestIndex = steps.findIndex(step => step.run === "npm test");
  const terminalReverifyIndex = stepIndex("Reverify terminal pull-request review authority");
  assert.ok(stepIndex("Checkout Agentic Canvas OS registrations") < stepIndex("Verify current pull-request review authority"));
  assert.ok(stepIndex("Verify current pull-request review authority") < stepIndex("Materialize current pull-request review authority"));
  assert.ok(stepIndex("Materialize current pull-request review authority") < npmTestIndex);
  assert.ok(npmTestIndex < terminalReverifyIndex);

  const terminalReverify = steps[terminalReverifyIndex];
  assert.equal(terminalReverify.if, "github.event_name == 'pull_request'");
  assert.match(terminalReverify.run, /git -C agentic-canvas-os rev-parse HEAD/u);
  assert.match(terminalReverify.run, /cloud-collaboration\.mjs verify-event/u);
  assert.match(terminalReverify.run, /--assert-existing/u);

  assert.doesNotMatch(workflowSource, /\|\|\s*true|continue-on-error:\s*true/u);
  assert.doesNotMatch(workflowSource, /git-guidelines-[^\s"']+-(?:cloud-authority|write-scope)\.json/u);
});

test("merge groups remain explicitly blocked until exact member claims can be joined", () => {
  const blocked = steps.find(step => step.name === "Block merge-group checks without exact member claims");
  assert.equal(blocked.if, "github.event_name == 'merge_group'");
  assert.match(blocked.run, /every member claim can be joined/u);
  assert.match(blocked.run, /exit 1/u);
});
