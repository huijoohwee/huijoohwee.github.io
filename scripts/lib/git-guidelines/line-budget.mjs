import { finding, sectionByAnchor, tableRows } from "./content.mjs";
import { resolveRuleId } from "./rule-registry.mjs";

export function checkLineBudget(document, frontmatter, ruleIndex) {
  const ruleId = resolveRuleId(ruleIndex, "load-budget", /session start/u, "load-budget#1");
  const findings = [];
  const measurements = measureLineBudget(document);
  const overrun = frontmatter?.data?.overrun;
  const hasMatchingOverrun = isMatchingOverrun(overrun, measurements.total);
  if (measurements.total > 440) {
    findings.push(budgetFinding(document, ruleId, "line-budget-exceeded", `Document has ${measurements.total} lines; limit is 440.`));
  } else if (measurements.total > 400 && !hasMatchingOverrun) {
    findings.push(budgetFinding(document, ruleId, "line-budget-exceeded", `Document has ${measurements.total} lines; limit is 400 without a matching overrun justification.`));
  }
  if (measurements.indexBoundary > 40) {
    findings.push(budgetFinding(document, ruleId, "index-boundary-budget-exceeded", `Module Index plus boundary has ${measurements.indexBoundary} lines; limit is 40.`));
  }
  for (const [stage, count] of Object.entries(measurements.stageCounts)) {
    if (count > 150) findings.push(budgetFinding(document, ruleId, "stage-budget-exceeded", `Stage ${stage} loads ${count} lines; limit is 150.`));
  }
  return findings;
}

export function measureLineBudget(document) {
  const total = document.lines.length;
  const sectionSpans = Object.fromEntries(document.sections.map(section => [section.anchor, span(section)]));
  const indexBoundary = (sectionSpans["boundary--ownership"] || 0) + (sectionSpans["module-index"] || 0);
  const budget = sectionByAnchor(document, "load-budget");
  const stageCounts = {};
  for (const row of tableRows(budget)) {
    const stage = row.cells[0];
    if (!stage) continue;
    const anchors = [...String(row.cells[1] || "").matchAll(/`([a-z0-9-]+)`/gu)].map(match => match[1]);
    const counted = new Set(["boundary--ownership", "module-index", ...anchors]);
    stageCounts[stage] = [...counted].reduce((sum, anchor) => sum + (sectionSpans[anchor] || 0), 0);
  }
  return Object.freeze({
    total,
    indexBoundary,
    sectionSpans: Object.freeze(sectionSpans),
    stageCounts: Object.freeze(stageCounts),
  });
}
function span(section) { return section ? section.endLine - section.startLine + 1 : 0; }
function isMatchingOverrun(value, total) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
    && value.measured_line_count === total
    && typeof value.justification === "string" && Boolean(value.justification.trim());
}
function budgetFinding(document, ruleId, code, message) {
  return finding({ ruleId, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, message: `${code}: ${message}` });
}
