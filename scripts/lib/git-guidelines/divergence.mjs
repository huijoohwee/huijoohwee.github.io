import { finding } from "./content.mjs";

const EXACT_TERMS = Object.freeze(["`canonical`", "`overlapping`", "`disjoint-attributed`", "`ambiguous`", "Orchestrator", "Implementer", "Evaluator", "Operator"]);
const ROOT_OPERATIONS = Object.freeze(["claim(scope)", "continue(claim)", "integrate(candidate)", "retire(claim)"]);

export function checkDivergence(document, owners) {
  const findings = [];
  const executionOwner = owners["guidelines/agentic-sdlc-guidelines.md"] || "";
  for (const term of [...EXACT_TERMS, ...ROOT_OPERATIONS]) {
    const plain = term.replaceAll("`", "");
    if (!document.text.includes(term) && !document.text.includes(plain)) findings.push(issue(document, `Terminology drift: ${term}`));
    if (!executionOwner.includes(term) && !executionOwner.includes(plain)) findings.push(issue(document, `Execution owner does not currently contain consumed term: ${term}`));
  }
  for (const phrase of ["unlimited concurrent current authorities for disjoint normalized write sets", "exactly one current write authority per overlapping declared write set", "non-writing waiting successor", "dormant-preserved"]) {
    if (!executionOwner.includes(phrase)) findings.push(issue(document, `Execution owner lacks current authority rule: ${phrase}`));
  }
  return findings;
}
function issue(document, message) { return finding({ ruleId: "boundary--ownership#8", type: "unimplemented-guideline", severity: "major", path: document.sourcePath, message }); }
