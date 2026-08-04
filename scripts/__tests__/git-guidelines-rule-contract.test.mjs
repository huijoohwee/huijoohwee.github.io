import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { checkChecklist } from "../lib/git-guidelines/checklist.mjs";
import { checkContentContract, parseDocument, tableCells, tableRows } from "../lib/git-guidelines/content.mjs";
import { buildRuleIndex } from "../lib/git-guidelines/rule-registry.mjs";

const documentPath = new URL("../../docs/documents/git-guidelines.md", import.meta.url);
const source = readFileSync(documentPath, "utf8");

test("source derives every classified directive and table row deterministically", () => {
  const rules = buildRuleIndex(parseDocument(source, documentPath.pathname));
  assert.deepEqual(rules.findings, []);
  assert.equal(rules.rules.length, 272);
  assert.equal(rules.artifactRules.length, 101);
  assert.equal(rules.advisoryRules.length, 171);
  assert.equal(rules.byId["lane-topology--admission#17"].ruleText.startsWith("`claim(scope)`"), true);
  assert.equal(rules.byId["coordination-artifacts#27"].classification, "artifact-bearing");
  assert.equal(rules.byId["findings--rule-identity#2"].classification, "artifact-bearing");
});

test("registry interleaves classified table rows and directives without merging duplicate text", () => {
  const document = parseDocument(`## Mixed Rules

| Rule | Class | Rule_ID |
|---|---|---|
| repeated text | artifact-bearing | mixed-rules#1 |

- [advisory] middle text

| Rule | Classification | Rule ID |
|---|---|---|
| repeated text | advisory | mixed-rules#3 |
`);
  const rules = buildRuleIndex(document);
  assert.deepEqual(rules.findings, []);
  assert.deepEqual(rules.rules.map(rule => rule.id), ["mixed-rules#1", "mixed-rules#2", "mixed-rules#3"]);
  assert.deepEqual(rules.rules.map(rule => rule.source), ["table-row", "directive", "table-row"]);
  assert.equal(rules.rules[0].ruleText, rules.rules[2].ruleText);
  assert.notEqual(rules.rules[0].id, rules.rules[2].id);
});

test("registry reports missing, multiple, mismatched, and duplicate identities", () => {
  const document = parseDocument(`## Repeated

| Rule | Class | Rule_ID |
|---|---|---|
| no class |  | repeated#7 |
| two classes | artifact-bearing advisory | repeated#2 |

## Repeated

- [artifact-bearing] another rule
`);
  const rules = buildRuleIndex(document);
  const messages = rules.findings.map(finding => finding.message);
  assert.ok(messages.some(message => message.startsWith("rule-unclassified:")));
  assert.ok(messages.some(message => message.startsWith("rule-multiclassified:")));
  assert.ok(messages.some(message => message.startsWith("rule-ordinal-mismatch:")));
  assert.ok(messages.filter(message => message.startsWith("rule-id-duplicate:")).length >= 2);
  assert.equal(rules.byId["repeated#1"].ruleText, "no class");

  const invalidDirective = buildRuleIndex(parseDocument("## Rules\n\n- [normative] invalid classification\n"));
  assert.ok(invalidDirective.findings.some(finding => finding.message.startsWith("rule-unclassified:")));

  const ordinaryDirective = buildRuleIndex(parseDocument("## Rules\n\n- ordinary unclassified rule\n"));
  assert.equal(ordinaryDirective.rules.length, 1);
  assert.ok(ordinaryDirective.findings.some(finding => finding.message.startsWith("rule-unclassified:")));

  const ordinaryTable = buildRuleIndex(parseDocument("## Rules\n\n| Rule | Value |\n|---|---|\n| ordinary unclassified row | value |\n"));
  assert.equal(ordinaryTable.rules.length, 1);
  assert.ok(ordinaryTable.findings.some(finding => finding.message.startsWith("rule-unclassified:")));
});

test("table parser preserves escaped pipes and omits Markdown headers", () => {
  assert.deepEqual(tableCells("| left \\| right | advisory |"), ["left \\| right", "advisory"]);
  const document = parseDocument("## Rows\n\n| Value | Class |\n|---|---|\n| one | advisory |\n");
  assert.deepEqual(tableRows(document.sections[0]).map(row => row.cells), [["one", "advisory"]]);
});

test("content acceptance binds resolved decisions to their owning rules", () => {
  const conformant = parseDocument(source, documentPath.pathname);
  assert.deepEqual(checkContentContract(conformant, buildRuleIndex(conformant)), []);

  const cappedSource = source.replace(
    "Protected upstream permits unlimited pairwise-disjoint current authorities; each overlap has one writer and non-writing waiting successors.",
    "Protected upstream permits at most 8 concurrent current authorities; each overlap has one writer and non-writing waiting successors.",
  );
  const capped = parseDocument(cappedSource, documentPath.pathname);
  const cappedFindings = checkContentContract(capped, buildRuleIndex(capped));
  assert.ok(cappedFindings.some(finding => finding.ruleId === "lane-topology--admission#26" && finding.message.startsWith("unlimited-upstream-concurrency:")));
  assert.ok(cappedFindings.some(finding => finding.message.startsWith("concurrency-cap-forbidden:")));

  const relocatedLease = parseDocument(
    source.replace("24 hours from issuance", "one day from issuance").replace("never confidence.", "never confidence; 24 hours."),
    documentPath.pathname,
  );
  assert.ok(checkContentContract(relocatedLease, buildRuleIndex(relocatedLease))
    .some(finding => finding.ruleId === "coordination-artifacts#27" && finding.message.startsWith("lease-ceiling-24h:")));
});

test("content acceptance keeps stage routing and checker path local to their contracts", () => {
  const wrongStageSource = source.replace(
    "| cleanup | `preservation-recovery--cleanup`, `coordination-artifacts` | advisory |",
    "| cleanup | `promotion-chain` | advisory |",
  );
  const wrongStage = parseDocument(wrongStageSource, documentPath.pathname);
  assert.ok(checkContentContract(wrongStage, buildRuleIndex(wrongStage))
    .some(finding => finding.message.startsWith("stage-placement-divergence:")));

  const missingPath = parseDocument(source.replace("huijoohwee.github.io/scripts/check-git-guidelines.mjs", "scripts/other-checker.mjs"), documentPath.pathname);
  assert.ok(checkContentContract(missingPath, buildRuleIndex(missingPath))
    .some(finding => finding.message.startsWith("checker-reference-incomplete:")));
});

test("finding coverage is bidirectional and advisory rules cannot raise findings", () => {
  const mutatedSource = source.replace(
    "`authoring--write-scope#1-3`, `authoring--write-scope#5-9`, `authoring--write-scope#13-15`",
    "`authoring--write-scope#1-3`, `authoring--write-scope#5-7`, `authoring--write-scope#9`, `authoring--write-scope#13-15`, `module-index#1`",
  );
  const document = parseDocument(mutatedSource, documentPath.pathname);
  const findings = checkContentContract(document, buildRuleIndex(document));
  assert.ok(findings.some(finding => finding.ruleId === "module-index#1" && finding.message.startsWith("advisory-raises-finding:")));
  assert.ok(findings.some(finding => finding.ruleId === "authoring--write-scope#8" && finding.message.startsWith("finding-rule-unlisted:")));
});

test("checklist accepts classified check bullets and expands Rule_ID ranges", () => {
  const document = parseDocument(`## Rules

- [artifact-bearing] first
- [artifact-bearing] second
- [artifact-bearing] third

## Validation Checklist

### Pre-lane
- [advisory] Check \`rules#1-3\` from evidence.
### Per-commit
- [advisory] Check \`rules#1\` from evidence.
### Pre-push
- [advisory] Check \`rules#1\` from evidence.
### Pre-promotion
- [advisory] Check \`rules#1\` from evidence.
### Post-run
- [advisory] Check \`rules#1\` from evidence.

### Reference implementation checker invocation
- [advisory] Run \`npm run git-guidelines:check\`; its entry point is \`huijoohwee.github.io/scripts/check-git-guidelines.mjs\`.
- [advisory] It reads this document, five owners, four registrations, present coordination artifacts, and git facts.
- [advisory] Exit zero means conformant; one means findings; two means degraded local input; three means remote or verdict timeout.
`);
  const rules = buildRuleIndex(document);
  assert.deepEqual(checkChecklist(document, rules), []);
});
