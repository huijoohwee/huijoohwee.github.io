import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { collectRecordIds, validateRecordJoins, validateRecordSchemas } from "../lib/venture-record-joins.mjs";

const header = (version = "1.0.0") => `---\ncontinuity_id: "PLAN-X"\nversion: "${version}"\n---\n`;
const model = `${header()}| HL-id | Row |\n|---|---|\n| HL1 | runway |\n| A1 | price |\n`;
const learning = `${header()}| H-id | Type |\n|---|---|\n| H1 | payer |\n\n| E-id | H-id |\n|---|---|\n| E1 | H1 |\n`;
const deck = `${header()}Runway is HL1 under A1; E1 tested H1.\n`;
const plan = `${header()}The plan cites HL1 and E1.\n`;
const set = (overrides = {}) => new Map(Object.entries({ model, learning, deck, plan, ...overrides }));

test("a consistent record set resolves every cited identifier", () => {
  const { failures, defined } = validateRecordJoins(set());
  assert.deepEqual(failures, []);
  assert.equal(defined, 4);
});

test("an unresolved headline or experiment is an unresolvable reference", () => {
  const { failures } = validateRecordJoins(set({ deck: `${header()}Runway is HL9; E4 passed.\n` }));
  assert.deepEqual(failures.map(f => [f.type, f.detail.split(" ")[1]]),
    [["unresolvable-reference", "E4"], ["unresolvable-reference", "HL9"]]);
});

test("an undefined assumption is an unsourced financial assumption", () => {
  const { failures } = validateRecordJoins(set({ plan: `${header()}Price follows A7.\n` }));
  assert.equal(failures[0].type, "financial-assumption-unsourced");
});

test("records joined at different revisions conflict", () => {
  const { failures } = validateRecordJoins(set({ deck: `${header("1.1.0")}Runway is HL1.\n` }));
  assert.ok(failures.every(f => f.type === "status-conflict"));
  assert.equal(failures.length, 4);
});

test("a record without a continuity join is named noncompliant", () => {
  const { failures } = validateRecordJoins(set({ plan: "No frontmatter; cites HL1.\n" }));
  assert.deepEqual(failures.map(f => f.type), ["artifact-naming-noncompliant"]);
});

test("template placeholders and fenced examples are neither definitions nor citations", () => {
  const ids = collectRecordIds(`${header()}| [HL-id] | [row] |\nE2E is not an ID.\n\`\`\`markdown\n| HL3 | example |\n\`\`\`\n~~~text\nE9\n~~~\n`);
  assert.equal(ids.defined.size, 0);
  assert.equal(ids.cited.size, 0);
});

test("inline-code identifiers remain definitions and citations", () => {
  const { failures } = validateRecordJoins(set({ model: model.replace("| HL1 |", "| `HL1` |"),
    deck: `${header()}Use \`HL1\` and \`A9\`.\n` }));
  assert.deepEqual(failures.map(f => [f.type, f.document]), [["financial-assumption-unsourced", "deck"]]);
});

test("empty, missing and malformed continuity metadata fail closed", () => {
  for (const metadata of [
    "continuity_id: PLAN-X", "continuity_id: PLAN-X\nversion: ''",
    "continuity_id: ''\nversion: 1.0.0", "continuity_id: PLAN-X\nversion: current",
    "continuity_id: PLAN-X\nversion: 1.0.0\nversion: 1.0.0",
  ]) {
    const { failures } = validateRecordJoins(new Map([["bad", `---\n${metadata}\n---\n`]]));
    assert.ok(failures.some(f => f.type === "artifact-naming-noncompliant"), metadata);
  }
  assert.equal(validateRecordJoins(new Map()).failures[0].type, "unresolvable-reference");
});

test("shared frontmatter syntax accepts single quotes and CRLF", () => {
  const alternate = "---\r\ncontinuity_id: 'PLAN-X'\r\nversion: '1.0.0'\r\n---\r\nUses HL1.\r\n";
  assert.deepEqual(validateRecordJoins(set({ deck: alternate })).failures, []);
});

test("duplicate ID definitions within or across records have no silent winner", () => {
  for (const overrides of [{ model: `${model}| A1 | second price |\n` },
    { plan: `${plan}| A1 | copied assumption |\n` }]) {
    const { failures } = validateRecordJoins(set(overrides));
    assert.equal(failures.length, 1);
    assert.equal(failures[0].type, "duplicate-owner");
  }
});

test("published record schemas stay aligned across the guideline modules", () => {
  const read = name => readFileSync(new URL(`../../guidelines/${name}`, import.meta.url), "utf8");
  assert.deepEqual(validateRecordSchemas(read), []);
  const drifted = name => name === "business-plan-guidelines.md" ? read(name).replace("| Retrieved / fresh until |", "| Retrieved |") : read(name);
  assert.equal(validateRecordSchemas(drifted)[0].type, "status-conflict");
});
