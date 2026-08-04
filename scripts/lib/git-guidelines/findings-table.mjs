import { FINDING_TYPES } from "./report.mjs";
import { finding, sectionByAnchor, tableRows } from "./content.mjs";
import { FINDING_RAISER_REFERENCES, FINDING_VOCABULARY } from "./content-contracts.mjs";

const SEVERITIES = new Set(["blocker", "major", "minor"]);
const REFERENCE_PATTERN = /^[a-z0-9-]+#[1-9][0-9]*(?:-[1-9][0-9]*)?$/u;

export function checkFindingsTable(document, ruleIndex) {
  const section = sectionByAnchor(document, "findings--rule-identity");
  const rows = tableRows(section);
  const findings = [];
  const observedRows = new Map(FINDING_TYPES.map(type => [type, []]));
  const covered = new Set();
  const governingRuleId = ruleIndex.byId["findings--rule-identity#2"]?.id || "findings--rule-identity#2";

  for (const row of rows) {
    const [family = "", referenceCell = "", typeCell = "", severity = "", ownership = "", classification = ""] = row.cells;
    const types = findingTypes(typeCell);
    const references = findingReferences(referenceCell);
    const malformedReferences = codeSpans(referenceCell).filter(reference => !REFERENCE_PATTERN.test(reference));
    const malformed = row.cells.length !== 6
      || !/^[a-z][a-z0-9-]*$/u.test(family)
      || types.length === 0
      || new Set(types).size !== types.length
      || references.length === 0
      || malformedReferences.length > 0
      || !SEVERITIES.has(severity)
      || !/^(?:inherited: .+|document-local)$/u.test(ownership)
      || classification !== "advisory";
    if (malformed) {
      findings.push(issue(document, governingRuleId, "finding-row-invalid", `Finding row ${row.line} is malformed and cannot be ignored.`, row.line));
    }

    for (const type of types) {
      if (!FINDING_TYPES.includes(type)) {
        findings.push(issue(document, governingRuleId, "finding-type-orphan", `Findings table lists unknown type ${type} on row ${row.line}.`, row.line));
        continue;
      }
      observedRows.get(type).push(Object.freeze({ row, references }));
      const [expectedSeverity, expectedOwnership] = FINDING_VOCABULARY[type] || [];
      if (severity !== expectedSeverity || ownership !== expectedOwnership) {
        findings.push(issue(document, governingRuleId, "finding-row-invalid", `Finding ${type} must retain ${expectedSeverity} and ${expectedOwnership}; observed ${severity || "none"} and ${ownership || "none"}.`, row.line));
      }
      if (isDocumentLocal(type) && ownership !== "document-local") {
        findings.push(issue(document, governingRuleId, "document-local-marker-missing", `Document-local finding ${type} lacks its marker.`, row.line));
      }
    }

    for (const ruleId of references) {
      covered.add(ruleId);
      const rule = ruleIndex.byId[ruleId];
      if (!rule) findings.push(issue(document, governingRuleId, "finding-row-invalid", `Finding row names unknown Rule_ID: ${ruleId}.`, row.line));
      else if (rule.classification !== "artifact-bearing") findings.push(issue(document, ruleId, "finding-row-invalid", `Advisory Rule_ID ${ruleId} cannot raise a finding.`, row.line));
    }
  }

  for (const type of FINDING_TYPES) {
    const typeRows = observedRows.get(type);
    if (typeRows.length !== 1) {
      findings.push(issue(document, governingRuleId, "finding-type-unlisted", `Findings table must list ${type} exactly once; observed ${typeRows.length}.`));
      continue;
    }
    const expected = actualRaiserSet(type);
    const observed = new Set(typeRows[0].references);
    const missing = [...expected].filter(ruleId => !observed.has(ruleId));
    const extra = [...observed].filter(ruleId => !expected.has(ruleId));
    if (missing.length > 0 || extra.length > 0) {
      findings.push(issue(
        document,
        governingRuleId,
        "finding-row-invalid",
        `Finding ${type} raisers differ from the checker: missing [${missing.join(", ")}], extra [${extra.join(", ")}].`,
        typeRows[0].row.line,
      ));
    }
  }

  for (const [type, references] of Object.entries(FINDING_RAISER_REFERENCES)) {
    if (!FINDING_TYPES.includes(type)) findings.push(issue(document, governingRuleId, "finding-type-orphan", `Checker raiser registry names unknown type ${type}.`));
    for (const ruleId of references.flatMap(expandReference)) {
      const rule = ruleIndex.byId[ruleId];
      if (!rule || rule.classification !== "artifact-bearing") {
        findings.push(issue(document, governingRuleId, "finding-row-invalid", `Checker raiser ${type} names non-artifact Rule_ID ${ruleId}.`));
      }
    }
  }
  for (const rule of ruleIndex.artifactRules) {
    if (!covered.has(rule.id)) findings.push(issue(document, rule.id, "finding-type-unlisted", `Artifact-bearing rule is absent from the findings table: ${rule.id}.`, rule.line));
  }
  return findings;
}

function actualRaiserSet(type) {
  return new Set((FINDING_RAISER_REFERENCES[type] || []).flatMap(expandReference));
}
function codeSpans(cell) { return [...String(cell || "").matchAll(/`([^`]+)`/gu)].map(match => match[1]); }
function findingTypes(cell) { return codeSpans(cell).filter(value => /^[a-z][a-z0-9-]*$/u.test(value)); }
function findingReferences(cell) { return codeSpans(cell).filter(value => REFERENCE_PATTERN.test(value)).flatMap(expandReference); }
function isDocumentLocal(type) { return ["unattributed-agentic-commit", "misplaced-conflict-resolution", "unresolved-conflict-publish"].includes(type); }
function expandReference(reference) {
  const match = reference.match(/^([a-z0-9-]+)#([1-9][0-9]*)(?:-([1-9][0-9]*))?$/u);
  if (!match || !match[3]) return [reference];
  const start = Number(match[2]); const end = Number(match[3]);
  if (end < start || end - start > 100) return [reference];
  return Array.from({ length: end - start + 1 }, (_value, index) => `${match[1]}#${start + index}`);
}
function issue(document, ruleId, code, message, line = 1) {
  return finding({ ruleId, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line, message: `${code}: ${message}` });
}
