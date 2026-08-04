import { existsSync } from "node:fs";
import path from "node:path";
import { finding, sectionByAnchor, tableRows } from "./content.mjs";

const CONSUMED = Object.freeze(["claim identity", "authority order", "write-scope comparison", "fence meaning", "handoff semantics", "additive lane admission and preservation proof", "frontmatter, Rule_ID, findings, and readiness rungs", "task model, roles, independence, blast radius, and budgets", "commit, push, and deploy command sequences"]);
const OWNED = Object.freeze(["git lane projection and branch naming", "coordination artifact layout and schemas", "commit attribution trailers", "preservation, backup, and recovery handles", "conflict placement and serialization order", "promotion chain gates", "validation gates and conformance checker"]);

export function checkBoundary(document) {
  const section = sectionByAnchor(document, "boundary--ownership");
  const rows = tableRows(section).filter(row => /^[CO]\d+$/u.test(row.cells[0] || ""));
  const findings = [];
  if (rows.length !== 16) findings.push(issue(document, "boundary--ownership#1", `Boundary has ${rows.length} rule-family rows; expected 16.`));
  for (const [index, family] of [...CONSUMED, ...OWNED].entries()) {
    const row = rows[index];
    const expectedDisposition = index < CONSUMED.length ? "consumes" : "owns";
    if (!row || row.cells[1] !== family || row.cells[2] !== expectedDisposition) findings.push(issue(document, `boundary--ownership#${index + 1}`, `Boundary row ${index + 1} must be ${family} / ${expectedDisposition}.`, row?.line));
    if (row && expectedDisposition === "consumes") {
      const link = row.cells[3].match(/\[[^\]]+\]\(([^)]+)\)/u)?.[1];
      const target = link ? path.resolve(path.dirname(document.sourcePath), link) : null;
      if (!target || !existsSync(target)) findings.push(issue(document, `boundary--ownership#${index + 1}`, `Boundary owner link is unresolved for ${family}.`, row.line));
    }
  }
  return findings;
}
function issue(document, ruleId, message, line = 1) { return finding({ ruleId, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line, message }); }
