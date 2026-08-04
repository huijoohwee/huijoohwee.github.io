import { finding, tableCells } from "./content.mjs";

const DIRECTIVE = /^- \[(artifact-bearing|advisory)\]\s+(.+)$/u;

export function buildRuleIndex(document) {
  const rules = [];
  const findings = [];
  const anchors = new Set();
  for (const section of document.sections) {
    if (anchors.has(section.anchor)) {
      findings.push(finding({ ruleId: `${section.anchor}#1`, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line: section.startLine, message: `Duplicate section anchor: ${section.anchor}` }));
    }
    anchors.add(section.anchor);
    let ordinal = 0;
    for (let offset = 1; offset < section.lines.length; offset += 1) {
      const line = section.lines[offset];
      const directive = line.match(DIRECTIVE);
      const cells = section.anchor === "boundary--ownership" ? tableCells(line) : [];
      const boundaryRule = /^[CO]\d+$/u.test(cells[0] || "") && ["artifact-bearing", "advisory"].includes(cells.at(-1));
      if (!directive && !boundaryRule) continue;
      ordinal += 1;
      const classification = directive?.[1] || cells.at(-1);
      const ruleText = directive?.[2] || cells.slice(1, -1).join(" | ");
      rules.push(Object.freeze({ id: `${section.anchor}#${ordinal}`, anchor: section.anchor, ordinal, classification, ruleText, line: section.startLine + offset }));
    }
  }
  const ids = new Set();
  for (const rule of rules) {
    if (ids.has(rule.id)) findings.push(finding({ ruleId: rule.id, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line: rule.line, message: `Duplicate Rule_ID: ${rule.id}` }));
    ids.add(rule.id);
  }
  return Object.freeze({
    rules: Object.freeze(rules),
    artifactRules: Object.freeze(rules.filter(rule => rule.classification === "artifact-bearing")),
    advisoryRules: Object.freeze(rules.filter(rule => rule.classification === "advisory")),
    byId: Object.freeze(Object.fromEntries(rules.map(rule => [rule.id, rule]))),
    findings: Object.freeze(findings),
  });
}
