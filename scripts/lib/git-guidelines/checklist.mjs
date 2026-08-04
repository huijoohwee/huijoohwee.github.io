import { finding, sectionByAnchor } from "./content.mjs";

const GATES = Object.freeze(["Pre-lane", "Per-commit", "Pre-push", "Pre-promotion", "Post-run"]);

export function checkChecklist(document, ruleIndex) {
  const section = sectionByAnchor(document, "validation-checklist");
  const findings = [];
  const observed = section?.lines.filter(line => /^### /u.test(line)).map(line => line.slice(4).trim()).filter(value => !/reference implementation/iu.test(value)) || [];
  if (JSON.stringify(observed) !== JSON.stringify(GATES)) findings.push(issue(document, "findings--rule-identity#2", `Checklist gates must be exactly: ${GATES.join(", ")}.`));
  const text = section?.lines.join("\n") || "";
  const references = new Set([...text.matchAll(/`([a-z0-9-]+#\d+)`/gu)].map(match => match[1]));
  for (const gate of GATES) {
    const start = text.indexOf(`### ${gate}`); const nextStarts = GATES.map(candidate => text.indexOf(`### ${candidate}`, start + 1)).filter(index => index > start);
    const end = nextStarts.length > 0 ? Math.min(...nextStarts) : text.length;
    if (start < 0 || !/- Check `/u.test(text.slice(start, end))) findings.push(issue(document, "findings--rule-identity#2", `Checklist gate has no observable check: ${gate}`));
  }
  for (const rule of ruleIndex.artifactRules) if (!references.has(rule.id)) findings.push(issue(document, rule.id, `Artifact-bearing rule is absent from validation gates: ${rule.id}`, rule.line));
  return findings;
}
function issue(document, ruleId, message, line = 1) { return finding({ ruleId, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line, message }); }
