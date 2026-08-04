import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { parseDocument, sectionByAnchor, tableCells, tableRows } from "../lib/git-guidelines/content.mjs";

const sourcePath = new URL("../../docs/documents/git-guidelines.md", import.meta.url);
const source = readFileSync(sourcePath, "utf8");
const document = parseDocument(source, sourcePath.pathname);
const STAGES = Object.freeze([
  "session start", "lane admission", "authoring", "commit", "push",
  "review", "integration", "promotion", "recovery", "cleanup",
]);
const EXPECTED_SECTION_LINES = Object.freeze({
  "boundary--ownership": 21, "module-index": 18, glossary: 14, "load-budget": 15,
  "lane-topology--admission": 38, "coordination-artifacts": 36, "authoring--write-scope": 20,
  "preservation-recovery--cleanup": 30, "commit--attribution": 24, "verification-gates": 24,
  "conflict--integration-order": 24, "promotion-chain": 28, "findings--rule-identity": 28,
  "validation-checklist": 22, "anti-patterns": 19, mantra: 10,
});

test("shipped document stays within total, section, and always-loaded budgets", () => {
  const physicalLines = source.endsWith("\n") ? source.slice(0, -1).split("\n") : source.split("\n");
  const spans = Object.fromEntries(document.sections.map(section => [section.anchor, sectionSpan(section)]));

  assert.equal(physicalLines.length, 392);
  assert.equal(400 - physicalLines.length, 8);
  assert.equal(document.sections.length, 16);
  assert.deepEqual(spans, EXPECTED_SECTION_LINES);
  assert.ok(Object.values(spans).every(count => count > 0 && count <= 150));

  const alwaysLoaded = spans["module-index"] + spans["boundary--ownership"];
  assert.equal(alwaysLoaded, 39);
  assert.ok(alwaysLoaded <= 40, `Module Index plus boundary ${alwaysLoaded} exceeds 40`);
  assert.ok(spans["anti-patterns"] <= 50);
  assert.ok(spans.mantra <= 25);
  assert.doesNotMatch(source, /^overrun\s*:/mu);
});

test("every stage stays within strict and Glossary-always-loaded caps", () => {
  const loadBudget = sectionByAnchor(document, "load-budget");
  const rows = tableRows(loadBudget).filter(row => STAGES.includes(row.cells[0]));
  assert.equal(rows.length, STAGES.length);

  let strictWorst = 0;
  let conservativeWorst = 0;
  for (const stage of STAGES) {
    const [row] = rows.filter(candidate => candidate.cells[0] === stage);
    assert.ok(row, `missing load-budget row for ${stage}`);
    const anchors = [...row.cells[1].matchAll(/`([a-z0-9-]+)`/gu)].map(match => match[1]);
    assert.ok(anchors.length >= 1 && anchors.length <= 4, `${stage} must load one to four sections`);

    const strictAnchors = new Set(["module-index", "boundary--ownership", ...anchors]);
    const conservativeAnchors = new Set([...strictAnchors, "glossary"]);
    const strictTotal = loadedLineCount(strictAnchors);
    const conservativeTotal = loadedLineCount(conservativeAnchors);
    strictWorst = Math.max(strictWorst, strictTotal);
    conservativeWorst = Math.max(conservativeWorst, conservativeTotal);
    assert.ok(strictTotal <= 150, `${stage} strict load ${strictTotal} exceeds 150`);
    assert.ok(conservativeTotal <= 150, `${stage} conservative load ${conservativeTotal} exceeds 150`);
  }
  assert.equal(strictWorst, 127);
  assert.equal(conservativeWorst, 141);
});

test("module index, rule lines, anti-patterns, and mantra stay locally bounded", () => {
  const moduleEntries = sectionByAnchor(document, "module-index").lines.filter(line => /^- \[advisory\] \[`/u.test(line));
  assert.equal(moduleEntries.length, 15);
  for (const line of moduleEntries) assert.ok(line.length <= 120, `Module Index line exceeds 120: ${line}`);

  const classifiedRules = [];
  for (const section of document.sections) {
    for (const line of section.lines) {
      if (/^- \[(?:artifact-bearing|advisory)\] /u.test(line)) {
        classifiedRules.push(line);
        continue;
      }
      const cells = tableCells(line);
      if (cells.length === 0 || cells.at(-1) === "Class" || cells.every(cell => /^:?-{3,}:?$/u.test(cell))) continue;
      assert.match(cells.at(-1), /^(?:artifact-bearing|advisory)$/u, `unclassified table row: ${line}`);
      classifiedRules.push(line);
    }
  }
  for (const line of classifiedRules) assert.ok(line.length <= 200, `rule line exceeds 200: ${line}`);

  const antiPatterns = sectionByAnchor(document, "anti-patterns").lines.filter(line => /^- \[advisory\] /u.test(line));
  assert.equal(antiPatterns.length, 16);
  for (let index = 0; index < antiPatterns.length; index += 2) {
    assert.match(antiPatterns[index], /Prohibited/u);
    assert.match(antiPatterns[index + 1], /Correct/u);
  }
  for (const line of antiPatterns) assert.ok(line.length <= 120, `anti-pattern line exceeds 120: ${line}`);

  const boundaryRows = tableRows(sectionByAnchor(document, "boundary--ownership"));
  const ownedFamilyCount = boundaryRows.filter(row => /^O\d+$/u.test(row.cells[0])).length;
  const mantra = sectionByAnchor(document, "mantra").lines.filter(line => /^- \[advisory\] O\d+ — /u.test(line));
  assert.equal(mantra.length, ownedFamilyCount);
  for (const line of mantra) assert.ok(line.length <= 120, `mantra line exceeds 120: ${line}`);
});

function loadedLineCount(anchors) {
  return [...anchors].reduce((total, anchor) => {
    const section = sectionByAnchor(document, anchor);
    assert.ok(section, `load budget references missing section ${anchor}`);
    return total + sectionSpan(section);
  }, 0);
}

function sectionSpan(section) {
  return section.endLine - section.startLine + 1;
}
