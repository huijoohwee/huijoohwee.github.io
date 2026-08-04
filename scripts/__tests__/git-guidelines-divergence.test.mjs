import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { parseDocument } from "../lib/git-guidelines/content.mjs";
import { checkDivergence } from "../lib/git-guidelines/divergence.mjs";
import { buildRuleIndex } from "../lib/git-guidelines/rule-registry.mjs";

const repository = new URL("../..", import.meta.url);
const source = readFileSync(new URL("../../docs/documents/git-guidelines.md", import.meta.url), "utf8");
const ownerPaths = Object.freeze([
  "guidelines/agentic-sdlc-guidelines.md",
  "guidelines/prd-tad-adr-guidelines.md",
  "guidelines/agentic-sdlc-cloud-collaboration.md",
  "guidelines/agentic-sdlc-scoped-lane-admission.md",
  "guidelines/commit-push-deploy-guidelines.md",
]);
const owners = Object.freeze(Object.fromEntries(ownerPaths.map(relative => [relative, readFileSync(new URL(relative, repository), "utf8")])));

test("real current-owner domains are conformant and inputs remain unchanged", () => {
  const document = parseDocument(source, "docs/documents/git-guidelines.md");
  const ruleIndex = buildRuleIndex(document);
  const ownersBefore = JSON.stringify(owners);
  assert.deepEqual(checkDivergence(document, owners, ruleIndex), []);
  assert.equal(document.text, source);
  assert.equal(JSON.stringify(owners), ownersBefore);
});

test("every C1-C9 family fails closed when its named owner evidence changes", () => {
  const mutations = [
    ["C1", "Collaboration Module", "guidelines/agentic-sdlc-cloud-collaboration.md", "tuple remains Actor ID", "tuple remains Principal ID"],
    ["C2", "Collaboration Module", "guidelines/agentic-sdlc-cloud-collaboration.md", "commands for claim, renew, park,", "commands for renew, claim, park,"],
    ["C3", "Collaboration Module", "guidelines/agentic-sdlc-cloud-collaboration.md", "Content mergeability does not prove ownership safety.", "Content mergeability proves ownership safety."],
    ["C4", "Collaboration Module", "guidelines/agentic-sdlc-cloud-collaboration.md", "rejects stale fences", "accepts stale fences"],
    ["C5", "Collaboration Module", "guidelines/agentic-sdlc-cloud-collaboration.md", "Admit a successor only after", "Admit a successor before"],
    ["C6", "Lane Admission Module", "guidelines/agentic-sdlc-scoped-lane-admission.md", "Blocks before candidate creation or claim use.", "Allows candidate creation before claim use."],
    ["C7", "Authoring Authority", "guidelines/prd-tad-adr-guidelines.md", "owning section anchor", "source file path"],
    ["C8", "Execution Companion", "guidelines/agentic-sdlc-guidelines.md", "Evaluator must be a different mechanism from the Implementer", "Evaluator may be the same mechanism as the Implementer"],
    ["C9", "Delivery Guidelines", "guidelines/commit-push-deploy-guidelines.md", "## Phase 2: Push", "## Phase 2: Share"],
  ];
  for (const [familyId, ownerName, ownerPath, before, after] of mutations) {
    assert.ok(owners[ownerPath].includes(before), `${familyId} mutation fixture is stale`);
    const mutatedOwners = { ...owners, [ownerPath]: owners[ownerPath].replaceAll(before, after) };
    const findings = run(source, mutatedOwners);
    assert.ok(findings.some(item => item.message.startsWith(`owner-divergence: ${familyId} `)
      && item.message.includes(`owner ${ownerName}`)), `${familyId} did not fail closed`);
  }
});

test("ordered consumed domains reject claim-state, action, lane-class, and root-operation substitutions", () => {
  const mutations = [
    ["`active`, `review-ready`", "`current`, `review-ready`", "C1", "coordination-artifacts#10"],
    ["action is claim, renew, park", "action is renew, claim, park", "C2", "coordination-artifacts#9"],
    ["| `canonical` | Registered canonical branch", "| `primary` | Registered canonical branch", "C6", "lane-topology--admission#9"],
    ["`claim(scope)` uses clean exact base", "`continue(claim)` uses clean exact base", "C8", "lane-topology--admission#17"],
  ];
  for (const [before, after, familyId, ruleId] of mutations) {
    assert.ok(source.includes(before), `${familyId} document fixture is stale`);
    const findings = run(source.replace(before, after), owners);
    assert.ok(findings.some(item => item.ruleId === ruleId && item.message.startsWith(`owner-divergence: ${familyId} `)));
  }
});

test("boundary-row owner identity selects the current owner and fails closed on a mismatch", () => {
  const mutant = source.replace(
    "| C3 | write-scope comparison | consumes | [Collaboration Module](../../guidelines/agentic-sdlc-cloud-collaboration.md) |",
    "| C3 | write-scope comparison | consumes | [Execution Companion](../../guidelines/agentic-sdlc-guidelines.md) |",
  );
  const findings = run(mutant, owners);
  assert.ok(findings.some(item => item.ruleId === "boundary--ownership#3"
    && item.message.startsWith("owner-divergence: C3 write-scope comparison; owner Execution Companion;")));
});

test("inherited finding triggers, owner scopes, and document raising scopes are compared", () => {
  const changedReferences = source.replace("`authoring--write-scope#5-9`", "`authoring--write-scope#5-8`");
  assert.ok(run(changedReferences, owners).some(item => item.message.includes("Finding out-of-scope-write trigger or raising scope differs")));

  const executionPath = "guidelines/agentic-sdlc-guidelines.md";
  const changedTriggerOwners = {
    ...owners,
    [executionPath]: owners[executionPath].replace("a write outside it is an `out-of-scope-write` finding", "a write outside it is permitted"),
  };
  assert.ok(run(source, changedTriggerOwners).some(item => item.message.includes("Finding out-of-scope-write has no matching current-owner trigger evidence")));

  const changedScopeOwners = {
    ...owners,
    [executionPath]: owners[executionPath].replace("| Tool permission | `out-of-scope-write`", "| Runtime | `out-of-scope-write`"),
  };
  assert.ok(run(source, changedScopeOwners).some(item => item.message.includes("Finding out-of-scope-write owner raising scope differs")));
});

test("terminology drift and unlicensed delivery commands carry supplied RuleIndex attribution", () => {
  const roleMutant = source.replace("Evaluator mechanism and Session ID", "Reviewer mechanism and Session ID");
  const roleFindings = run(roleMutant, owners);
  assert.ok(roleFindings.some(item => item.ruleId === "verification-gates#8"
    && item.message.startsWith("terminology-drift: C8 ") && item.message.includes("owner Execution Companion")));

  const commandMutant = source.replace("- [artifact-bearing] Stage only explicit repository-relative paths or selected interactive hunks.", "- [artifact-bearing] Stage only explicit paths with `git add . && git push`.");
  const commandFindings = run(commandMutant, owners);
  assert.ok(commandFindings.some(item => item.ruleId === "authoring--write-scope#3"
    && item.message.includes("owner command sequence is restated outside a reference implementation block")));
});

function run(documentSource, ownerInput) {
  const document = parseDocument(documentSource, "docs/documents/git-guidelines.md");
  return checkDivergence(document, ownerInput, buildRuleIndex(document));
}
