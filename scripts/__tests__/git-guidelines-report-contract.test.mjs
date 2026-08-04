import assert from "node:assert/strict";
import test from "node:test";

import { readFileSync } from "node:fs";

import { checkContentContract, createBlockedOutcome, parseDocument } from "../lib/git-guidelines/content.mjs";
import { checkDivergence } from "../lib/git-guidelines/divergence.mjs";
import {
  buildReport,
  evaluateFindingFamily,
  FINDING_TYPES,
  recordFindingFamily,
  runFindingFamily,
} from "../lib/git-guidelines/report.mjs";
import { buildRuleIndex } from "../lib/git-guidelines/rule-registry.mjs";

test("a throwing family discards partial work and records a closed-vocabulary internal error", () => {
  const findings = runFindingFamily("synthetic", () => { throw new Error("boom"); });
  assert.equal(findings.length, 1);
  assert.equal(findings[0].type, "unimplemented-guideline");
  assert.ok(findings[0].ruleText.length > 0);
  assert.match(findings[0].message, /^checker-internal-error:/u);
});

test("gate evaluation completes even when finding recording fails", () => {
  let evaluations = 0;
  const evaluated = evaluateFindingFamily("synthetic-gate", () => {
    evaluations += 1;
    return [];
  });
  const findings = recordFindingFamily(evaluated, () => { throw new Error("recording unavailable"); });
  assert.equal(evaluations, 1);
  assert.equal(evaluated.evaluated, true);
  assert.equal(findings.length, 1);
  assert.match(findings[0].message, /synthetic-gate-recording.*recording unavailable/u);
});

test("unsatisfied IDs include only artifact-bearing rules when the registry is supplied", () => {
  const ruleIndex = Object.freeze({
    artifactRules: Object.freeze([{ id: "artifact#1" }]),
  });
  const report = buildReport({
    findings: [
      { ruleId: "artifact#1", type: "unimplemented-guideline", severity: "major", location: { path: "a", line: 1, column: 1 }, message: "artifact" },
      { ruleId: "advisory#1", type: "unimplemented-guideline", severity: "major", location: { path: "a", line: 2, column: 1 }, message: "advisory" },
    ],
    inputStatus: "ok",
    registrationReady: true,
    ruleIndex,
  });
  assert.deepEqual(report.unsatisfiedRuleIds, ["artifact#1"]);
});

test("report keys, explicit zeros, and Blocked_Outcome records are total", () => {
  const digestState = Object.freeze({ head: "1".repeat(64), index: "2".repeat(64), working: "3".repeat(64), untracked: "4".repeat(64) });
  const outcome = createBlockedOutcome({
    ruleId: "coordination-artifacts#13",
    blockingCondition: "claim-absent",
    causingArtifact: ".coordination/scope-claim.json",
    preState: digestState,
    postState: digestState,
    resolutionPath: ".coordination/scope-claim.json",
  });
  const report = buildReport({ findings: [], inputStatus: Object.freeze({ document: "ok" }), registrationReady: true, blockedOutcomes: [outcome] });
  assert.deepEqual(Object.keys(report), ["schema", "verdict", "findingTotal", "severityCounts", "typeCounts", "unsatisfiedRuleIds", "inputStatus", "blockedOutcomes", "findings", "exitStatus"]);
  assert.equal(Object.keys(report.typeCounts).length, FINDING_TYPES.length);
  assert.ok(Object.values(report.typeCounts).every(count => count === 0));
  assert.equal(report.verdict, "not-conformant");
  assert.deepEqual(report.unsatisfiedRuleIds, [outcome.ruleId]);
  assert.equal(Object.isFrozen(report.blockedOutcomes[0].preState), true);

  const degraded = buildReport({ findings: [], inputStatus: "degraded", registrationReady: false, blockedOutcomes: [{}] });
  assert.ok(degraded.findings.every(item => item.ruleText.length > 0));
});

test("named-owner severities make scope and concurrency redefinitions observable", () => {
  const repository = new URL("../..", import.meta.url);
  const source = readFileSync(new URL("../../docs/documents/git-guidelines.md", import.meta.url), "utf8");
  const owners = Object.fromEntries([
    "guidelines/agentic-sdlc-guidelines.md",
    "guidelines/prd-tad-adr-guidelines.md",
    "guidelines/agentic-sdlc-cloud-collaboration.md",
    "guidelines/agentic-sdlc-scoped-lane-admission.md",
    "guidelines/commit-push-deploy-guidelines.md",
  ].map(relative => [relative, readFileSync(new URL(relative, repository), "utf8")]));
  const repaired = setFindingSeverity(setFindingSeverity(source, "out-of-scope-write", "major"), "concurrent-write-conflict", "major");
  for (const type of ["out-of-scope-write", "concurrent-write-conflict"]) {
    const mutant = checkDivergence(parseDocument(setFindingSeverity(repaired, type, "blocker")), owners);
    assert.ok(mutant.some(item => item.message.includes(`Finding ${type} severity blocker`) && item.message.includes("severity major")));
  }
});

test("content vocabulary retains the Execution Companion major severities", () => {
  const source = readFileSync(new URL("../../docs/documents/git-guidelines.md", import.meta.url), "utf8");
  const document = parseDocument(source);
  const findings = checkContentContract(document, buildRuleIndex(document));
  for (const type of ["out-of-scope-write", "concurrent-write-conflict"]) {
    assert.equal(findings.some(item => item.message.includes(`Finding ${type} must retain severity major`)), false);
    const mutantSource = setFindingSeverity(source, type, "blocker");
    const mutant = parseDocument(mutantSource);
    const mutantFindings = checkContentContract(mutant, buildRuleIndex(mutant));
    assert.ok(mutantFindings.some(item => item.message.includes(`Finding ${type} must retain severity major`)));
  }
});

test("exact lane-class tokens ignore prose capitalization but reject code-token drift", () => {
  const repository = new URL("../..", import.meta.url);
  const source = readFileSync(new URL("../../docs/documents/git-guidelines.md", import.meta.url), "utf8");
  const owners = Object.fromEntries([
    "guidelines/agentic-sdlc-guidelines.md",
    "guidelines/prd-tad-adr-guidelines.md",
    "guidelines/agentic-sdlc-cloud-collaboration.md",
    "guidelines/agentic-sdlc-scoped-lane-admission.md",
    "guidelines/commit-push-deploy-guidelines.md",
  ].map(relative => [relative, readFileSync(new URL(relative, repository), "utf8")]));
  const current = checkDivergence(parseDocument(source), owners);
  assert.equal(current.some(item => /Alternative spelling Canonical/u.test(item.message)), false);
  const mutant = checkDivergence(parseDocument(source.replace("`canonical`", "`Canonical`")), owners);
  assert.ok(mutant.some(item => /Alternative spelling Canonical/u.test(item.message)));
});

function setFindingSeverity(source, type, severity) {
  return source.split("\n").map(line => line.includes(`\`${type}\``)
    ? line.replace(/\| (?:blocker|major|minor) \|/u, `| ${severity} |`)
    : line).join("\n");
}
