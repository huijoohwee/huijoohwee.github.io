import { FINDING_TYPES } from "./report.mjs";
import { finding, sectionByAnchor, tableRows } from "./content.mjs";

const SEVERITIES = new Set(["blocker", "major", "minor"]);

export function checkFindingsTable(document, ruleIndex) {
  const section = sectionByAnchor(document, "findings--rule-identity");
  const rows = tableRows(section).filter(row => /^`[^`]+`$/u.test(row.cells[2] || ""));
  const findings = [];
  const observedTypes = rows.map(row => row.cells[2].slice(1, -1));
  for (const type of FINDING_TYPES) if (observedTypes.filter(value => value === type).length !== 1) findings.push(issue(document, "findings--rule-identity#2", `Findings table must list ${type} exactly once.`));
  const covered = new Set();
  for (const row of rows) {
    const type = row.cells[2].slice(1, -1);
    if (!SEVERITIES.has(row.cells[3]) || !/^(?:inherited: .+|document-local)$/u.test(row.cells[4])) findings.push(issue(document, "findings--rule-identity#2", `Finding row is malformed: ${type}`, row.line));
    const refs = [...row.cells[1].matchAll(/`([a-z0-9-]+#\d+(?:-\d+)?)`/gu)].flatMap(match => expandReference(match[1]));
    if (refs.length === 0) findings.push(issue(document, "findings--rule-identity#2", `Finding row has no raising Rule_ID: ${type}`, row.line));
    for (const ruleId of refs) {
      covered.add(ruleId);
      if (!ruleIndex.byId[ruleId]) findings.push(issue(document, "findings--rule-identity#2", `Finding row names unknown Rule_ID: ${ruleId}`, row.line));
    }
  }
  for (const rule of ruleIndex.artifactRules) if (!covered.has(rule.id)) findings.push(issue(document, rule.id, `Artifact-bearing rule is absent from the findings table: ${rule.id}`, rule.line));
  return findings;
}
function expandReference(reference) {
  const match = reference.match(/^([a-z0-9-]+)#(\d+)(?:-(\d+))?$/u);
  if (!match || !match[3]) return [reference];
  const start = Number(match[2]); const end = Number(match[3]);
  if (end < start || end - start > 100) return [reference];
  return Array.from({ length: end - start + 1 }, (_value, index) => `${match[1]}#${start + index}`);
}
function issue(document, ruleId, message, line = 1) { return finding({ ruleId, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line, message }); }
