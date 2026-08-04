import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { checkAntipatterns } from "../lib/git-guidelines/antipattern.mjs";
import { checkChecklist } from "../lib/git-guidelines/checklist.mjs";
import { checkContentContract, parseDocument } from "../lib/git-guidelines/content.mjs";
import { checkFindingsTable } from "../lib/git-guidelines/findings-table.mjs";
import { buildRuleIndex } from "../lib/git-guidelines/rule-registry.mjs";
import { checkStructure } from "../lib/git-guidelines/structure.mjs";

const sourcePath = new URL("../../docs/documents/git-guidelines.md", import.meta.url);
const source = readFileSync(sourcePath, "utf8");

test("shipped document satisfies the findings, checklist, and anti-pattern families", () => {
  const document = parsed(source);
  const rules = buildRuleIndex(document);
  assert.deepEqual(checkFindingsTable(document, rules), []);
  assert.deepEqual(checkChecklist(document, rules), []);
  assert.deepEqual(checkAntipatterns(document, rules), []);
});

test("module descriptions bind a rule family to the exact loading stages", () => {
  const mutant = parsed(source.replace(
    "— O2; admission, authoring, push, integration, cleanup.",
    "— coordination role; authoring.",
  ));
  const messages = checkStructure(mutant, buildRuleIndex(mutant)).map(item => item.message);
  assert.ok(messages.some(message => message.includes("must name one rule family")));
  assert.ok(messages.some(message => message.includes("must name loading stages")));
});

test("self-containment catches prose headings and predicate/table dependencies", () => {
  const prose = parsed(source.replace(
    "Stage only explicit repository-relative paths or selected interactive hunks.",
    "Stage only explicit repository-relative paths; then apply Conflict & Integration Order.",
  ));
  assert.ok(checkStructure(prose, buildRuleIndex(prose)).some(item => (
    item.ruleId === "authoring--write-scope#3" && item.message.includes("conflict--integration-order")
  )));

  const table = parsed(source.replace(
    "Stage only explicit repository-relative paths or selected interactive hunks.",
    "Stage only explicit repository-relative paths after applying the Lane class table predicate.",
  ));
  assert.ok(checkStructure(table, buildRuleIndex(table)).some(item => (
    item.ruleId === "authoring--write-scope#3" && item.message.includes("lane-topology--admission")
  )));
});

test("findings rows match the checker raiser set in both directions", () => {
  const mutant = parsed(source.replace(
    "`authoring--write-scope#1-3`, `authoring--write-scope#5-9`, `authoring--write-scope#13-15`",
    "`authoring--write-scope#1-3`, `authoring--write-scope#5-7`, `authoring--write-scope#13-15`",
  ));
  const messages = checkFindingsTable(mutant, buildRuleIndex(mutant)).map(item => item.message);
  assert.ok(messages.some(message => message.includes("out-of-scope-write raisers differ") && message.includes("#8") && message.includes("#9")));

  const ignored = parsed(source.replace("| `out-of-scope-write` | major |", "| out-of-scope-write | major |"));
  const ignoredMessages = checkFindingsTable(ignored, buildRuleIndex(ignored)).map(item => item.message);
  assert.ok(ignoredMessages.some(message => message.startsWith("finding-row-invalid:")));
  assert.ok(ignoredMessages.some(message => message.includes("must list out-of-scope-write exactly once")));
});

test("checklist checks require valid Rule_IDs, evidence, and a complete invocation block", () => {
  const noEvidence = parsed(source.replace(
    "from clean base, branch, identity, scope, claim, snapshots, operations, and receipts.",
    "with clean base, branch, identity, scope, claim, snapshots, operations, and receipts.",
  ));
  assert.ok(checkChecklist(noEvidence, buildRuleIndex(noEvidence)).some(item => item.message.includes("observable evidence")));

  const unknownRule = parsed(source.replace("`findings--rule-identity#2` from bidirectional", "`findings--rule-identity#999` from bidirectional"));
  assert.ok(checkChecklist(unknownRule, buildRuleIndex(unknownRule)).some(item => item.message.includes("unknown Rule_ID findings--rule-identity#999")));

  const noEntrypoint = parsed(source.replace("huijoohwee.github.io/scripts/check-git-guidelines.mjs", "scripts/other-checker.mjs"));
  assert.ok(checkChecklist(noEntrypoint, buildRuleIndex(noEntrypoint)).some(item => item.message.startsWith("checker-invocation-unstated:")));
});

test("anti-pattern pairs reject extra lines and mantra mappings are unique", () => {
  const nested = parsed(source.replace(
    "- [advisory] Prohibited — authoring on the canonical branch.",
    "- [advisory] Prohibited — authoring on the canonical branch.\n  - example that becomes a third line",
  ));
  assert.ok(checkAntipatterns(nested, buildRuleIndex(nested)).some(item => (
    item.message.startsWith("antipattern-shape-invalid:") && item.message.includes("third")
  )));

  const duplicateClause = parsed(source.replace("- [advisory] O7 — deterministic", "- [advisory] O6 — deterministic"));
  const clauseMessages = checkAntipatterns(duplicateClause, buildRuleIndex(duplicateClause)).map(item => item.message);
  assert.ok(clauseMessages.some(message => message.includes("map O7 exactly once")));
  assert.ok(clauseMessages.some(message => message.includes("O6 is duplicated")));

  const duplicateFamily = parsed(source.replace("| O7 | validation gates and conformance checker | owns |", "| O1 | validation gates and conformance checker | owns |"));
  assert.ok(checkAntipatterns(duplicateFamily, buildRuleIndex(duplicateFamily)).some(item => item.message.includes("O1 is declared 2 times")));
});

test("content contracts bind canonical lane state and gate-recording separation", () => {
  const lane = parsed(source.replace("and no source authoring.", "and permits source authoring."));
  assert.ok(checkContentContract(lane, buildRuleIndex(lane)).some(item => (
    item.ruleId === "lane-topology--admission#15" && item.message.startsWith("canonical-lane-state:")
  )));

  const recording = parsed(source.replace("after all gate evaluations complete", "before remaining gate evaluations"));
  assert.ok(checkContentContract(recording, buildRuleIndex(recording)).some(item => (
    item.ruleId === "verification-gates#15" && item.message.startsWith("gate-recording-separation:")
  )));
});

function parsed(value) { return parseDocument(value, sourcePath.pathname); }
