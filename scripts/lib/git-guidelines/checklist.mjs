import { finding, sectionByAnchor } from "./content.mjs";

const GATES = Object.freeze(["Pre-lane", "Per-commit", "Pre-push", "Pre-promotion", "Post-run"]);
const RULE_REFERENCE = /^[a-z0-9-]+#[1-9][0-9]*(?:-[1-9][0-9]*)?$/u;

export function checkChecklist(document, ruleIndex) {
  const section = sectionByAnchor(document, "validation-checklist");
  const findings = [];
  const governingRuleId = ruleIndex.byId["findings--rule-identity#2"]?.id || "findings--rule-identity#2";
  if (!section) return [issue(document, governingRuleId, "gate-partition-invalid", "Validation Checklist section is absent.")];

  const headings = section.lines.flatMap((line, offset) => {
    const match = line.match(/^### (.+)$/u);
    return match ? [{ title: match[1].trim(), offset, line: section.startLine + offset }] : [];
  });
  const gateHeadings = headings.filter(heading => !/\breference implementation\b/iu.test(heading.title));
  if (JSON.stringify(gateHeadings.map(heading => heading.title)) !== JSON.stringify(GATES)) {
    findings.push(issue(document, governingRuleId, "gate-partition-invalid", `Checklist gates must be exactly: ${GATES.join(", ")}.`));
  }

  const covered = new Set();
  for (const gate of GATES) {
    const heading = gateHeadings.find(candidate => candidate.title === gate);
    if (!heading) continue;
    const nextHeadingOffset = Math.min(...headings.filter(candidate => candidate.offset > heading.offset).map(candidate => candidate.offset), section.lines.length);
    const body = section.lines.slice(heading.offset + 1, nextHeadingOffset);
    const checks = body.flatMap((line, offset) => /^- \[advisory\] Check\s+/u.test(line)
      ? [{ text: line, line: heading.line + offset + 1 }]
      : []);
    const unexpected = body.flatMap((line, offset) => line.trim() && !/^- \[advisory\] Check\s+/u.test(line)
      ? [{ text: line, line: heading.line + offset + 1 }]
      : []);
    if (checks.length === 0) findings.push(issue(document, governingRuleId, "gate-partition-invalid", `Checklist gate has no check: ${gate}.`, heading.line));
    for (const value of unexpected) {
      findings.push(issue(document, governingRuleId, "gate-partition-invalid", `Checklist gate ${gate} contains a non-check line: ${value.text.trim()}.`, value.line));
    }
    for (const check of checks) validateCheck(document, ruleIndex, governingRuleId, check, covered, findings);
  }

  for (const rule of ruleIndex.artifactRules) {
    if (!covered.has(rule.id)) findings.push(issue(document, rule.id, "rule-uncovered-by-gate", `Artifact-bearing rule is absent from validation gates: ${rule.id}.`, rule.line));
  }
  checkInvocation(document, section, headings, governingRuleId, findings);
  return findings;
}

function validateCheck(document, ruleIndex, governingRuleId, check, covered, findings) {
  const codeValues = [...check.text.matchAll(/`([^`]+)`/gu)].map(match => match[1]);
  const references = codeValues.filter(value => RULE_REFERENCE.test(value));
  const malformedReferences = codeValues.filter(value => value.includes("#") && !RULE_REFERENCE.test(value));
  const evidence = check.text.match(/\sfrom\s+(.+?)[.]?$/u)?.[1]?.replace(/[.]$/u, "").trim() || "";
  if (references.length === 0 || malformedReferences.length > 0) {
    findings.push(issue(document, governingRuleId, "gate-partition-invalid", `Checklist check must name valid Rule_ID references: ${check.text}.`, check.line));
  }
  if (evidence.length === 0) {
    findings.push(issue(document, governingRuleId, "gate-partition-invalid", `Checklist check must name observable evidence after "from": ${check.text}.`, check.line));
  }
  for (const reference of references) {
    for (const ruleId of expandReference(reference)) {
      const rule = ruleIndex.byId[ruleId];
      if (!rule) findings.push(issue(document, governingRuleId, "gate-partition-invalid", `Checklist check names unknown Rule_ID ${ruleId}.`, check.line));
      else {
        covered.add(ruleId);
        if (rule.classification !== "artifact-bearing") {
          findings.push(issue(document, ruleId, "gate-partition-invalid", `Checklist check names advisory Rule_ID ${ruleId} as gate-enforced.`, check.line));
        }
      }
    }
  }
}

function checkInvocation(document, section, headings, governingRuleId, findings) {
  const references = headings.filter(heading => /\breference implementation\b/iu.test(heading.title));
  const reference = references[0];
  const text = reference ? section.lines.slice(reference.offset).join("\n") : "";
  const obligations = [
    [/`npm run git-guidelines:check`/u, "invocation npm run git-guidelines:check"],
    [/`huijoohwee\.github\.io\/scripts\/check-git-guidelines\.mjs`/u, "entry point huijoohwee.github.io/scripts/check-git-guidelines.mjs"],
    [/reads this document, five owners, four registrations, present coordination artifacts, and git facts/iu, "document, owner, registration, artifact, and git-fact inputs"],
    [/Exit zero means conformant; one means findings; two means degraded local input; three means remote or verdict timeout[.]/u, "exit meanings for conformant, findings, degraded input, and timeout"],
  ];
  if (references.length !== 1) findings.push(issue(document, governingRuleId, "checker-invocation-unstated", `Reference implementation checker block must occur exactly once; observed ${references.length}.`));
  for (const [pattern, label] of obligations) {
    if (!pattern.test(text)) findings.push(issue(document, governingRuleId, "checker-invocation-unstated", `Checker block does not state ${label}.`, reference?.line || section.startLine));
  }
}

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
