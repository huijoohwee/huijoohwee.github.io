import { finding } from "./content.mjs";
import { FrontmatterError, readFrontmatter } from "./fm-reader.mjs";

const BASELINE = Object.freeze({ title: "non-empty scalar at most 120 characters", doc_type: "Guidelines", version: "two or three numeric components", date: "YYYY-MM-DD", lang: "2 to 5 character language tag" });
const CONFORMANCE = Object.freeze({ owner: "one scalar of 1 to 80 characters", local_rung: "one readiness rung", delivered_rung: "one readiness rung", lane: "authoring", universal_scope: "boolean false" });
const OPTIONAL = new Set(["companion_of", "invocation_token", "semantic_filters", "bindings", "frontmatter_contract", "overrun"]);
const RUNGS = new Set(["authored", "spec-complete", "runtime-ready", "integration-ready", "deployed-verified", "undocumented"]);

export function checkFrontmatter(document) {
  const findings = [];
  let parsed;
  try { parsed = readFrontmatter(document.text); }
  catch (error) {
    const line = error instanceof FrontmatterError ? error.line : 1;
    findings.push(finding({ ruleId: "boundary--ownership#7", type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line, message: `Frontmatter is unparseable: ${error.message}` }));
    return Object.freeze({ parsed: null, findings: Object.freeze(findings) });
  }
  const values = parsed.data;
  for (const [key, domain] of [...Object.entries(BASELINE), ...Object.entries(CONFORMANCE)]) {
    if (!validRequired(key, values[key])) findings.push(finding({ ruleId: "boundary--ownership#7", type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line: 1, message: `Frontmatter ${key} expected ${domain}.` }));
  }
  for (const key of Object.keys(values)) {
    if (Object.hasOwn(BASELINE, key) || Object.hasOwn(CONFORMANCE, key) || OPTIONAL.has(key)) continue;
    findings.push(finding({ ruleId: "boundary--ownership#7", type: "unimplemented-guideline", severity: "minor", path: document.sourcePath, line: 1, message: `Unknown optional frontmatter key: ${key}` }));
  }
  for (const [key, expected] of [["companion_of", "guidelines/agentic-sdlc-guidelines.md"], ["invocation_token", "/git.guidelines"], ["frontmatter_contract", "required"]]) {
    if (values[key] !== expected) findings.push(finding({ ruleId: "boundary--ownership#7", type: "unimplemented-guideline", severity: "minor", path: document.sourcePath, line: 1, message: `Optional frontmatter ${key} expected ${expected}.` }));
  }
  if (!sameArray(values.semantic_filters, ["#git-collaboration"]) || !sameArray(values.bindings, ["@git-guidelines"])) {
    findings.push(finding({ ruleId: "boundary--ownership#7", type: "unimplemented-guideline", severity: "minor", path: document.sourcePath, line: 1, message: "Invocation filter and binding frontmatter must match registered values." }));
  }
  return Object.freeze({ parsed, findings: Object.freeze(findings) });
}

function validRequired(key, value) {
  if (key === "title") return typeof value === "string" && value.length > 0 && value.length <= 120;
  if (key === "doc_type") return value === "Guidelines";
  if (key === "version") return typeof value === "string" && /^\d+\.\d+(?:\.\d+)?$/u.test(value);
  if (key === "date") return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/u.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
  if (key === "lang") return typeof value === "string" && /^[A-Za-z-]{2,5}$/u.test(value);
  if (key === "owner") return typeof value === "string" && value.length >= 1 && value.length <= 80 && !/[;,|]/u.test(value);
  if (key === "local_rung" || key === "delivered_rung") return typeof value === "string" && RUNGS.has(value);
  if (key === "lane") return value === "authoring";
  if (key === "universal_scope") return value === false;
  return false;
}
function sameArray(value, expected) { return Array.isArray(value) && JSON.stringify(value) === JSON.stringify(expected); }
