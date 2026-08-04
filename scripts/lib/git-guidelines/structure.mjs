import { finding, headingAnchor, sectionByAnchor, tableRows } from "./content.mjs";

const EXPECTED_ANCHORS = Object.freeze([
  "boundary--ownership", "module-index", "glossary", "load-budget", "lane-topology--admission", "coordination-artifacts", "authoring--write-scope",
  "preservation-recovery--cleanup", "commit--attribution", "verification-gates", "conflict--integration-order", "promotion-chain", "findings--rule-identity",
  "validation-checklist", "anti-patterns", "mantra",
]);
const STAGES = Object.freeze(["session start", "lane admission", "authoring", "commit", "push", "review", "integration", "promotion", "recovery", "cleanup"]);

export function checkStructure(document) {
  const findings = [];
  const observed = document.sections.map(section => section.anchor);
  for (const anchor of EXPECTED_ANCHORS) if (!observed.includes(anchor)) findings.push(issue(document, "boundary--ownership#7", `Section is absent: ${anchor}`));
  for (const anchor of observed) if (!EXPECTED_ANCHORS.includes(anchor)) findings.push(issue(document, "boundary--ownership#7", `Unexpected section: ${anchor}`));
  const index = sectionByAnchor(document, "module-index");
  const indexed = index ? index.lines.flatMap(line => [...line.matchAll(/\]\(#([a-z0-9-]+)\)/gu)].map(match => match[1])) : [];
  for (const anchor of EXPECTED_ANCHORS.filter(value => value !== "module-index")) if (indexed.filter(value => value === anchor).length !== 1) findings.push(issue(document, "boundary--ownership#7", `Module Index must name ${anchor} exactly once.`));
  const budget = sectionByAnchor(document, "load-budget");
  const rows = tableRows(budget).filter(row => STAGES.includes(row.cells[0]));
  for (const stage of STAGES) if (rows.filter(row => row.cells[0] === stage).length !== 1) findings.push(issue(document, "boundary--ownership#7", `Load budget must name stage exactly once: ${stage}`));
  const referenced = new Set(rows.flatMap(row => [...row.cells[1].matchAll(/`([a-z0-9-]+)`/gu)].map(match => match[1])));
  for (const anchor of EXPECTED_ANCHORS) if (!referenced.has(anchor)) findings.push(issue(document, "boundary--ownership#7", `No load-budget stage references ${anchor}.`));
  for (let indexLine = 0; indexLine < document.lines.length; indexLine += 1) {
    const line = document.lines[indexLine];
    if ((/^- \[(?:artifact-bearing|advisory)\]/u.test(line) || /^\| [CO]\d+ /u.test(line)) && line.length > 200) findings.push(issue(document, "boundary--ownership#7", `Rule line ${indexLine + 1} exceeds 200 characters.`, indexLine + 1));
  }
  if (headingAnchor("Boundary & Ownership") !== "boundary--ownership") findings.push(issue(document, "boundary--ownership#7", "Heading anchor derivation drifted."));
  return findings;
}

export function expectedSectionAnchors() { return EXPECTED_ANCHORS; }
function issue(document, ruleId, message, line = 1) { return finding({ ruleId, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line, message }); }
