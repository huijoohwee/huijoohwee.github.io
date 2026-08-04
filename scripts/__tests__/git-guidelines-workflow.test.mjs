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

test("the workflow materializes the exact repair-lane authority pair", () => {
  const materialize = steps.find(step => step.name === "Materialize required Task 19 workspace inputs");
  assert.match(materialize.run, /git-guidelines-protected-squash-repair-cloud-authority\.json/u);
  assert.match(materialize.run, /git-guidelines-protected-squash-repair-write-scope\.json/u);
  assert.doesNotMatch(materialize.run, /git-guidelines-companion-ci-authority-(?:cloud-authority|write-scope)\.json/u);
});
