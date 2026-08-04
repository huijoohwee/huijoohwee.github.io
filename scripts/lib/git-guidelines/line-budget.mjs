import { finding, sectionByAnchor, tableRows } from "./content.mjs";

export function checkLineBudget(document, frontmatter) {
  const findings = [];
  const total = document.lines.at(-1) === "" ? document.lines.length - 1 : document.lines.length;
  const hasOverrun = Boolean(frontmatter?.data?.overrun);
  if (total > 440 || (total > 400 && !hasOverrun)) findings.push(budgetFinding(document, `Document has ${total} lines; limit is ${hasOverrun ? 440 : 400}.`));
  const boundary = sectionByAnchor(document, "boundary--ownership"); const moduleIndex = sectionByAnchor(document, "module-index");
  const floor = span(boundary) + span(moduleIndex);
  if (floor > 40) findings.push(budgetFinding(document, `Module Index plus boundary has ${floor} lines; limit is 40.`));
  const budget = sectionByAnchor(document, "load-budget");
  for (const row of tableRows(budget).slice(1)) {
    const anchors = [...row.cells[1].matchAll(/`([a-z0-9-]+)`/gu)].map(match => match[1]);
    const counted = new Set(["boundary--ownership", "module-index", ...anchors]);
    const count = [...counted].reduce((sum, anchor) => sum + span(sectionByAnchor(document, anchor)), 0);
    if (count > 150) findings.push(budgetFinding(document, `Stage ${row.cells[0]} loads ${count} lines; limit is 150.`));
  }
  return findings;
}
function span(section) { return section ? section.endLine - section.startLine + 1 : 0; }
function budgetFinding(document, message) { return finding({ ruleId: "boundary--ownership#7", type: "unimplemented-guideline", severity: "major", path: document.sourcePath, message }); }
