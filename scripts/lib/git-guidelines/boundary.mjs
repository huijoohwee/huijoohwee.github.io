import path from "node:path";
import { finding, sectionByAnchor, tableRows } from "./content.mjs";

const CONSUMED = Object.freeze(["claim identity", "authority order", "write-scope comparison", "fence meaning", "handoff semantics", "additive lane admission and preservation proof", "frontmatter, Rule_ID, findings, and readiness rungs", "task model, roles, independence, blast radius, and budgets", "commit, push, and deploy command sequences"]);
const OWNED = Object.freeze(["git lane projection and branch naming", "coordination artifact layout and schemas", "commit attribution trailers", "preservation, backup, and recovery handles", "conflict placement and serialization order", "promotion chain gates", "validation gates and conformance checker"]);
const OWNER_PATHS = Object.freeze([
  "../../guidelines/adlc-cloud-collaboration.md",
  "../../guidelines/adlc-cloud-collaboration.md",
  "../../guidelines/adlc-cloud-collaboration.md",
  "../../guidelines/adlc-cloud-collaboration.md",
  "../../guidelines/adlc-cloud-collaboration.md",
  "../../guidelines/adlc-scoped-lane-admission.md",
  "../../guidelines/prd-tad-adr-guidelines.md",
  "../../guidelines/adlc-guidelines.md",
  "../../guidelines/commit-push-deploy-guidelines.md",
]);

export function checkBoundary(document, suppliedRuleIndex = null) {
  const matchingSections = document.sections.filter(candidate => candidate.anchor === "boundary--ownership");
  const section = sectionByAnchor(document, "boundary--ownership");
  const rows = tableRows(section).filter(row => /^[CO]\d+$/u.test(row.cells[0] || ""));
  const ruleIdByLine = new Map((suppliedRuleIndex?.rules || []).map(rule => [rule.line, rule.id]));
  const findings = [];
  if (matchingSections.length !== 1) findings.push(issue(document, "boundary--ownership#1", "boundary-family-missing", `Document has ${matchingSections.length} boundary sections; expected exactly one.`));
  if (rows.length !== 16) findings.push(issue(document, "boundary--ownership#1", "boundary-family-missing", `Boundary has ${rows.length} rule-family rows; expected 16.`));
  for (const [index, family] of [...CONSUMED, ...OWNED].entries()) {
    const row = rows[index];
    const expectedDisposition = index < CONSUMED.length ? "consumes" : "owns";
    if (!row || row.cells[0] !== `${expectedDisposition === "consumes" ? "C" : "O"}${expectedDisposition === "consumes" ? index + 1 : index - CONSUMED.length + 1}`
      || row.cells[1] !== family || row.cells[2] !== expectedDisposition) {
      findings.push(issue(document, ruleIdByLine.get(row?.line) || `boundary--ownership#${index + 1}`, "boundary-row-invalid", `Boundary row ${index + 1} must be ${family} / ${expectedDisposition}.`, row?.line));
    }
    if (row && expectedDisposition === "consumes") {
      const link = row.cells[3].match(/\[[^\]]+\]\(([^)]+)\)/u)?.[1];
      const target = link ? path.resolve(path.dirname(document.sourcePath), link) : null;
      const expectedTarget = path.resolve(path.dirname(document.sourcePath), OWNER_PATHS[index]);
      if (!target || target !== expectedTarget) {
        findings.push(issue(document, ruleIdByLine.get(row.line) || `boundary--ownership#${index + 1}`, "boundary-owner-unknown", `Boundary owner link for ${family} must resolve to ${OWNER_PATHS[index]}.`, row.line));
      }
    } else if (row && row.cells[3] !== "—") {
      findings.push(issue(document, ruleIdByLine.get(row.line) || `boundary--ownership#${index + 1}`, "boundary-row-invalid", `Owned family ${family} must not name a consumed owner.`, row.line));
    }
  }
  return findings;
}
function issue(document, ruleId, code, message, line = 1) {
  return finding({ ruleId, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line, message: `${code}: ${message}` });
}
