import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import yaml from "js-yaml";

const workflowPath = new URL("../../.github/workflows/guideline-contract.yml", import.meta.url);
const workflow = yaml.load(readFileSync(workflowPath, "utf8"));
const steps = workflow.jobs["guideline-contract-check"].steps;
const sourceCheckout = steps[0];

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

test("the workflow materializes the exact repair-lane authority pair", () => {
  const materialize = steps.find(step => step.name === "Materialize required Task 19 workspace inputs");
  assert.match(materialize.run, /git-guidelines-protected-squash-repair-v3-cloud-authority\.json/u);
  assert.match(materialize.run, /git-guidelines-protected-squash-repair-v3-write-scope\.json/u);
  assert.doesNotMatch(materialize.run, /git-guidelines-companion-ci-authority-(?:cloud-authority|write-scope)\.json/u);
});
