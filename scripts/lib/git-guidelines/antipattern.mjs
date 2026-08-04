import { finding, sectionByAnchor } from "./content.mjs";

const REQUIRED = Object.freeze([
  "authoring on the canonical branch", "undeclared write scope", "local-only lease", "grading its own lane",
  "rewriting history without preserved bytes", "deploying because integration is green", "reusing stale authorization",
]);

export function checkAntipatterns(document) {
  const findings = [];
  const section = sectionByAnchor(document, "anti-patterns");
  const lines = section?.lines.filter(line => /^- \[advisory\]/u.test(line)) || [];
  if (lines.length < 14 || lines.length > 40 || lines.length % 2 !== 0) findings.push(issue(document, "anti-patterns#1", `Anti-pattern section has ${lines.length} directive lines; expected 7–20 pairs.`));
  for (let index = 0; index < lines.length; index += 2) {
    if (!/Prohibited —/u.test(lines[index] || "") || !/Correct —/u.test(lines[index + 1] || "")) findings.push(issue(document, `anti-patterns#${index + 1}`, "Each anti-pattern must be one prohibited line followed by one corrective line."));
    for (const line of lines.slice(index, index + 2)) if (line.length > 120) findings.push(issue(document, `anti-patterns#${index + 1}`, `Anti-pattern line exceeds 120 characters: ${line.length}`));
  }
  const lower = lines.join("\n").toLowerCase();
  for (const phrase of REQUIRED) if (!lower.includes(phrase)) findings.push(issue(document, "anti-patterns#1", `Required anti-pattern is absent: ${phrase}`));
  const mantra = sectionByAnchor(document, "mantra");
  const clauses = mantra?.lines.filter(line => /^- \[advisory\] O\d —/u.test(line)) || [];
  if (clauses.length !== 7) findings.push(issue(document, "mantra#1", `Mantra has ${clauses.length} clauses; expected 7.`));
  for (let owner = 1; owner <= 7; owner += 1) if (!clauses.some(line => line.startsWith(`- [advisory] O${owner} —`))) findings.push(issue(document, "mantra#1", `Mantra lacks O${owner}.`));
  return findings;
}
function issue(document, ruleId, message) { return finding({ ruleId, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, message }); }
