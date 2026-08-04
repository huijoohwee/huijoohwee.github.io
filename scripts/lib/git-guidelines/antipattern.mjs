import { finding, sectionByAnchor, tableRows } from "./content.mjs";
import { FINDING_TYPES } from "./report.mjs";

const REQUIRED = Object.freeze([
  Object.freeze({ phrase: "authoring on the canonical branch", findingType: "out-of-scope-write" }),
  Object.freeze({ phrase: "undeclared write scope", findingType: null }),
  Object.freeze({ phrase: "local-only lease", findingType: "evidence-without-run" }),
  Object.freeze({ phrase: "grading its own lane", findingType: "self-graded-verdict" }),
  Object.freeze({ phrase: "rewriting history without preserved bytes", findingType: "unimplemented-guideline" }),
  Object.freeze({ phrase: "deploying because integration is green", findingType: "deploy-boundary-breach" }),
  Object.freeze({ phrase: "reusing stale authorization", findingType: "deploy-boundary-breach" }),
]);
const NON_FINDING_TERMS = new Set(["dormant-preserved"]);

export function checkAntipatterns(document, ruleIndex = null) {
  const findings = [];
  const section = sectionByAnchor(document, "anti-patterns");
  const ruleIdByLine = new Map((ruleIndex?.rules || []).map(rule => [rule.line, rule.id]));
  const body = trimmedBody(section);
  const directives = body.filter(entry => /^- \[advisory\] /u.test(entry.text));
  const unexpected = body.filter(entry => !/^- \[advisory\] /u.test(entry.text));
  if (!section || span(section) > 50 || directives.length < 14 || directives.length > 40 || directives.length % 2 !== 0) {
    findings.push(issue(document, "anti-patterns#1", "antipattern-shape-invalid", `Anti-pattern section has ${directives.length} directive lines and ${span(section)} total lines; expected 7–20 pairs within 50 lines.`));
  }
  for (const entry of unexpected) {
    findings.push(issue(document, ruleIdByLine.get(entry.line) || "anti-patterns#1", "antipattern-shape-invalid", `Nested, third, blank, prose, and example lines are forbidden inside the pair list: ${entry.text || "blank line"}.`, entry.line));
  }

  const prohibitedPhrases = new Set();
  const correctiveByProhibited = new Map();
  for (let index = 0; index < directives.length; index += 2) {
    const prohibited = directives[index];
    const corrective = directives[index + 1];
    const ruleId = ruleIdByLine.get(prohibited?.line) || `anti-patterns#${index + 1}`;
    if (!prohibited || !corrective || !/^- \[advisory\] Prohibited —\s+\S/u.test(prohibited.text) || !/^- \[advisory\] Correct —\s+\S/u.test(corrective.text)) {
      findings.push(issue(document, ruleId, "antipattern-shape-invalid", "Each pair must be exactly one prohibited line followed by one corrective line.", prohibited?.line));
      continue;
    }
    const phrase = prohibited.text.replace(/^- \[advisory\] Prohibited —\s+/u, "").trim().toLowerCase();
    if (prohibitedPhrases.has(phrase)) findings.push(issue(document, ruleId, "antipattern-shape-invalid", `Duplicate prohibited mapping: ${phrase}.`, prohibited.line));
    prohibitedPhrases.add(phrase);
    correctiveByProhibited.set(phrase, corrective.text);
    if (!/(?:\b[COR][1-9][0-9]*\b|`[a-z0-9-]+#[1-9][0-9]*`)/u.test(corrective.text)) {
      findings.push(issue(document, ruleId, "antipattern-shape-invalid", "Corrective line must name a Rule_ID or owned/consumed rule family.", corrective.line));
    }
    for (const entry of [prohibited, corrective]) {
      if (entry.text.length > 120) findings.push(issue(document, ruleId, "antipattern-shape-invalid", `Anti-pattern line exceeds 120 characters: ${entry.text.length}.`, entry.line));
    }
    for (const type of codeTerms(corrective.text).filter(value => value.includes("-"))) {
      if (!FINDING_TYPES.includes(type) && !NON_FINDING_TERMS.has(type) && !/^[a-z0-9-]+#[1-9][0-9]*$/u.test(type)) {
        findings.push(issue(document, ruleId, "antipattern-shape-invalid", `Corrective line names an unknown finding type: ${type}.`, corrective.line));
      }
    }
  }
  for (const required of REQUIRED) {
    const match = [...correctiveByProhibited].find(([phrase]) => phrase.includes(required.phrase));
    if (!match) {
      findings.push(issue(document, "anti-patterns#1", "antipattern-missing", `Required anti-pattern is absent: ${required.phrase}.`));
    } else if (required.findingType && !codeTerms(match[1]).includes(required.findingType)) {
      findings.push(issue(document, "anti-patterns#1", "antipattern-shape-invalid", `Anti-pattern ${required.phrase} must name finding type ${required.findingType}.`));
    }
  }

  findings.push(...checkMantra(document, ruleIndex));
  return findings;
}

function checkMantra(document, ruleIndex) {
  const findings = [];
  const mantra = sectionByAnchor(document, "mantra");
  const body = trimmedBody(mantra);
  const clauses = body.flatMap(entry => {
    const match = entry.text.match(/^- \[advisory\] (O[1-9][0-9]*) —\s+(\S.*)$/u);
    return match ? [{ family: match[1], text: entry.text, line: entry.line }] : [];
  });
  const clauseLines = new Set(clauses.map(clause => clause.line));
  const ruleIdByLine = new Map((ruleIndex?.rules || []).map(rule => [rule.line, rule.id]));
  if (!mantra || span(mantra) > 25) findings.push(issue(document, "mantra#1", "mantra-family-uncovered", `Mantra occupies ${span(mantra)} lines; limit is 25.`));
  for (const entry of body.filter(value => !clauseLines.has(value.line))) {
    findings.push(issue(document, ruleIdByLine.get(entry.line) || "mantra#1", "mantra-clause-unmapped", `Mantra contains a nested, example, malformed, or non-clause line: ${entry.text || "blank line"}.`, entry.line));
  }
  for (const clause of clauses) {
    if (clause.text.length > 120) findings.push(issue(document, ruleIdByLine.get(clause.line) || "mantra#1", "mantra-clause-unmapped", `Mantra clause exceeds 120 characters: ${clause.text.length}.`, clause.line));
  }

  const boundary = sectionByAnchor(document, "boundary--ownership");
  const ownedFamilies = tableRows(boundary).filter(row => row.cells[2] === "owns").map(row => row.cells[0]);
  const ownedCounts = countValues(ownedFamilies);
  const clauseCounts = countValues(clauses.map(clause => clause.family));
  for (const [family, count] of ownedCounts) {
    if (count !== 1) findings.push(issue(document, "mantra#1", "mantra-family-uncovered", `Owned rule family ${family} is declared ${count} times; family identities must be unique.`));
    if ((clauseCounts.get(family) || 0) !== 1) findings.push(issue(document, "mantra#1", "mantra-family-uncovered", `Mantra must map ${family} exactly once; observed ${clauseCounts.get(family) || 0}.`));
  }
  for (const [family, count] of clauseCounts) {
    if (!ownedCounts.has(family)) findings.push(issue(document, "mantra#1", "mantra-clause-unmapped", `Mantra clause ${family} maps to no owned family.`));
    if (count !== 1) findings.push(issue(document, "mantra#1", "mantra-clause-unmapped", `Mantra clause ${family} is duplicated ${count} times.`));
  }
  return findings;
}

function trimmedBody(section) {
  if (!section) return [];
  const entries = section.lines.slice(1).map((text, offset) => ({ text, line: section.startLine + offset + 1 }));
  while (entries[0]?.text.trim() === "") entries.shift();
  while (entries.at(-1)?.text.trim() === "") entries.pop();
  return entries;
}
function countValues(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return counts;
}
function codeTerms(value) { return [...value.matchAll(/`([^`]+)`/gu)].map(match => match[1]); }
function span(section) { return section ? section.endLine - section.startLine + 1 : 0; }
function issue(document, ruleId, code, message, line = 1) {
  return finding({ ruleId, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line, message: `${code}: ${message}` });
}
