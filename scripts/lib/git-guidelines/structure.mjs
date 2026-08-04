import { finding, headingAnchor, sectionByAnchor, tableCells, tableRows } from "./content.mjs";
import { STAGE_SECTIONS } from "./content-contracts.mjs";
import { buildRuleIndex } from "./rule-registry.mjs";

const EXPECTED_ANCHORS = Object.freeze([
  "boundary--ownership", "module-index", "glossary", "load-budget", "lane-topology--admission", "coordination-artifacts", "authoring--write-scope",
  "preservation-recovery--cleanup", "commit--attribution", "verification-gates", "conflict--integration-order", "promotion-chain", "findings--rule-identity",
  "validation-checklist", "anti-patterns", "mantra",
]);
const STAGES = Object.freeze(["session start", "lane admission", "authoring", "commit", "push", "review", "integration", "promotion", "recovery", "cleanup"]);

export function checkStructure(document, suppliedRuleIndex = null) {
  const findings = [];
  const ruleIndex = suppliedRuleIndex || buildRuleIndex(document);
  const ruleIdByLine = new Map(ruleIndex.rules.map(rule => [rule.line, rule.id]));
  const observed = document.sections.map(section => section.anchor);
  for (const anchor of EXPECTED_ANCHORS) if (!observed.includes(anchor)) findings.push(issue(document, "module-index#1", "section-unindexed", `Section is absent: ${anchor}`));
  for (const anchor of observed) if (!EXPECTED_ANCHORS.includes(anchor)) findings.push(issue(document, "module-index#1", "anchor-unresolved", `Unexpected section: ${anchor}`));
  const index = sectionByAnchor(document, "module-index");
  const indexEntries = index ? index.lines.flatMap((line, offset) => parseIndexEntry(line, index.startLine + offset)) : [];
  const indexed = indexEntries.map(entry => entry.anchor);
  for (const anchor of EXPECTED_ANCHORS.filter(value => value !== "module-index")) {
    if (indexed.filter(value => value === anchor).length !== 1) findings.push(issue(document, "module-index#1", "section-unindexed", `Module Index must name ${anchor} exactly once.`));
  }
  for (const entry of indexEntries) {
    const ruleId = ruleIdByLine.get(entry.line) || "module-index#1";
    if (!observed.includes(entry.anchor)) findings.push(issue(document, ruleId, "anchor-unresolved", `Module Index anchor resolves to no section: ${entry.anchor}.`, entry.line));
    if (!entry.description || entry.description.length > 120 || entry.anchorCount !== 1) {
      findings.push(issue(document, ruleId, "rule-line-shape", `Module Index entry must carry one anchor and a non-empty role description of at most 120 characters.`, entry.line));
    }
    for (const descriptionProblem of moduleDescriptionProblems(entry)) {
      findings.push(issue(document, ruleId, "stage-unmapped", descriptionProblem, entry.line));
    }
  }
  const budget = sectionByAnchor(document, "load-budget");
  const rows = tableRows(budget).filter(row => STAGES.includes(row.cells[0]));
  for (const stage of STAGES) if (rows.filter(row => row.cells[0] === stage).length !== 1) findings.push(issue(document, "load-budget#1", "stage-unmapped", `Load budget must name stage exactly once: ${stage}`));
  const referenced = new Set();
  for (const row of rows) {
    const anchors = [...String(row.cells[1] || "").matchAll(/`([a-z0-9-]+)`/gu)].map(match => match[1]);
    const ruleId = ruleIdByLine.get(row.line) || "load-budget#1";
    if (anchors.length < 1 || anchors.length > 4 || new Set(anchors).size !== anchors.length) {
      findings.push(issue(document, ruleId, "stage-unmapped", `Stage ${row.cells[0]} must name one to four distinct sections.`, row.line));
    }
    for (const anchor of anchors) {
      referenced.add(anchor);
      if (!observed.includes(anchor)) findings.push(issue(document, ruleId, "anchor-unresolved", `Stage ${row.cells[0]} names unresolved section ${anchor}.`, row.line));
    }
  }
  for (const anchor of EXPECTED_ANCHORS) if (!referenced.has(anchor)) findings.push(issue(document, "load-budget#1", "section-unreferenced", `No load-budget stage references ${anchor}.`));
  for (let indexLine = 0; indexLine < document.lines.length; indexLine += 1) {
    const line = document.lines[indexLine];
    const cells = tableCells(line);
    const classifiedRule = /^- \[(?:artifact-bearing|advisory)\]/u.test(line)
      || ["artifact-bearing", "advisory"].includes(cells.at(-1));
    const physicalLine = indexLine + 1;
    const ruleId = ruleIdByLine.get(physicalLine) || "module-index#1";
    if (classifiedRule && line.length > 200) findings.push(issue(document, ruleId, "rule-line-shape", `Rule line ${physicalLine} exceeds 200 characters.`, physicalLine));
    if (/^- /u.test(line) && !/^-[ \t]+\[(?:artifact-bearing|advisory)\]/u.test(line)) {
      findings.push(issue(document, ruleId, "rule-line-shape", `Directive bullet on line ${physicalLine} lacks exactly one rule classification.`, physicalLine));
    }
  }
  findings.push(...checkSelfContainment(document, ruleIdByLine));
  if (headingAnchor("Boundary & Ownership") !== "boundary--ownership") findings.push(issue(document, "module-index#1", "anchor-unresolved", "Heading anchor derivation drifted."));
  return findings;
}

export function expectedSectionAnchors() { return EXPECTED_ANCHORS; }
function parseIndexEntry(line, lineNumber) {
  if (!/^- \[(?:artifact-bearing|advisory)\]/u.test(line)) return [];
  const anchors = [...line.matchAll(/\]\(#([a-z0-9-]+)\)/gu)].map(match => match[1]);
  const description = line.split(/\s+—\s+/u).slice(1).join(" — ").trim();
  return [{ anchor: anchors[0] || "", anchorCount: anchors.length, description, line: lineNumber }];
}
function moduleDescriptionProblems(entry) {
  const problems = [];
  const [family = "", stages = "", ...extra] = entry.description.split(/\s*;\s*/u);
  if (extra.length > 0 || !/(?:\bfamily\b|\bO[1-9][0-9]*\b|\bR[1-9][0-9]*\b)/u.test(family)) {
    problems.push(`Module Index entry ${entry.anchor} must name one rule family before its stage list.`);
  }
  const expected = expectedLoadingStages(entry.anchor);
  const observed = normalizedStageList(stages);
  if (expected.length !== observed.length || expected.some((stage, index) => stage !== observed[index])) {
    problems.push(`Module Index entry ${entry.anchor} must name loading stages ${expected.join(", ")}; observed ${observed.join(", ") || "none"}.`);
  }
  return problems;
}
function expectedLoadingStages(anchor) {
  if (["boundary--ownership", "glossary"].includes(anchor)) return ["all stages"];
  return Object.entries(STAGE_SECTIONS)
    .filter(([_stage, anchors]) => anchors.includes(anchor))
    .map(([stage]) => stage);
}
function normalizedStageList(value) {
  const aliases = new Map([["admission", "lane admission"]]);
  const normalizedValue = String(value).trim().replace(/[.]$/u, "");
  if (normalizedValue === "all stages") return ["all stages"];
  return normalizedValue.split(/\s*,\s*/u)
    .map(stage => aliases.get(stage) || stage)
    .filter(Boolean)
    .sort((left, right) => STAGES.indexOf(left) - STAGES.indexOf(right));
}
function checkSelfContainment(document, ruleIdByLine) {
  const findings = [];
  const allowed = new Set(["module-index", "boundary--ownership", "glossary"]);
  const headings = new Map(document.sections.map(section => [section.title.toLowerCase(), section.anchor]));
  const dependencyDefinitions = collectDependencyDefinitions(document);
  for (const section of document.sections) {
    if (section.anchor === "module-index") continue;
    for (const [offset, line] of section.lines.entries()) {
      const lineNumber = section.startLine + offset;
      const referenced = new Set([...line.matchAll(/\]\(#([a-z0-9-]+)\)/gu)].map(match => match[1]));
      const proseReference = line.match(/\bsee (?:the )?([^.;:]+?) section\b/iu)?.[1]?.trim().toLowerCase();
      if (proseReference && headings.has(proseReference)) referenced.add(headings.get(proseReference));
      for (const candidate of document.sections) {
        if (candidate.anchor !== section.anchor && line.includes(candidate.title)) referenced.add(candidate.anchor);
      }
      if (/\b(?:predicate|table)\b/iu.test(line)) {
        for (const definition of dependencyDefinitions) {
          if (definition.anchor !== section.anchor && line.includes(definition.label)) referenced.add(definition.anchor);
        }
      }
      for (const anchor of referenced) {
        if (anchor === section.anchor || allowed.has(anchor)) continue;
        const ruleId = ruleIdByLine.get(lineNumber) || `${section.anchor}#1`;
        findings.push(issue(document, ruleId, "cross-section-reference", `Rule requires loading intra-document section ${anchor}.`, lineNumber));
      }
    }
  }
  return findings;
}
function collectDependencyDefinitions(document) {
  const definitions = [];
  for (const section of document.sections) {
    for (let offset = 0; offset < section.lines.length - 1; offset += 1) {
      const header = tableCells(section.lines[offset]);
      const separator = tableCells(section.lines[offset + 1]);
      if (header.length > 0 && separator.length === header.length && separator.every(cell => /^:?-{3,}:?$/u.test(cell))) {
        for (const label of header.filter(value => value.length >= 4 && !/^(?:class|value|meaning|rule|stage)$/iu.test(value))) {
          definitions.push(Object.freeze({ anchor: section.anchor, label }));
        }
      }
      for (const match of section.lines[offset].matchAll(/(?:`([^`]+)`\s+(?:predicate|relation)|(?:predicate|relation)\s+`([^`]+)`)/giu)) {
        definitions.push(Object.freeze({ anchor: section.anchor, label: match[1] || match[2] }));
      }
    }
  }
  return definitions;
}
function issue(document, ruleId, code, message, line = 1) {
  return finding({ ruleId, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line, message: `${code}: ${message}` });
}
