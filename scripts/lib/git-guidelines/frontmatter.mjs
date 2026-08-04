import { finding } from "./content.mjs";
import { FrontmatterError, readFrontmatter } from "./fm-reader.mjs";
import { resolveRuleId } from "./rule-registry.mjs";

const READINESS_RUNGS = new Set(["undocumented", "spec-complete", "dev-proven", "runtime-ready", "production-verified"]);

const BASELINE = Object.freeze({
  title: domain("a non-empty scalar at most 120 characters", value => isBoundedString(value, 120)),
  doc_type: domain('the Authoring_Authority document type "Guidelines"', value => value === "Guidelines"),
  version: domain("two or three dot-separated non-negative integers", value => typeof value === "string" && /^\d+\.\d+(?:\.\d+)?$/u.test(value)),
  date: domain("a calendar date in YYYY-MM-DD form", isCalendarDate),
  lang: domain("one language tag of 2 to 5 characters", value => typeof value === "string" && /^(?:[A-Za-z]{2,5}|[A-Za-z]{2}-[A-Za-z]{2})$/u.test(value)),
});

const CONFORMANCE = Object.freeze({
  owner: domain("exactly one scalar of 1 to 80 characters, not a delimiter-separated list", value => isBoundedString(value, 80) && !/[;,|]/u.test(value)),
  local_rung: domain(`one Authoring_Authority readiness rung (${[...READINESS_RUNGS].join(", ")})`, isReadinessRung),
  delivered_rung: domain(`one Authoring_Authority readiness rung (${[...READINESS_RUNGS].join(", ")})`, isReadinessRung),
  lane: domain('the exact scalar "authoring"', value => value === "authoring"),
  universal_scope: domain("the boolean false", value => value === false),
});

const OPTIONAL = Object.freeze({
  companion_of: domain('the scalar "guidelines/agentic-sdlc-guidelines.md"', value => value === "guidelines/agentic-sdlc-guidelines.md", true),
  invocation_token: domain('the scalar "/git.guidelines"', value => value === "/git.guidelines", true),
  semantic_filters: domain('the scalar sequence ["#git-collaboration"]', value => sameArray(value, ["#git-collaboration"]), true),
  bindings: domain('the scalar sequence ["@git-guidelines"]', value => sameArray(value, ["@git-guidelines"]), true),
  frontmatter_contract: domain('the scalar "required"', value => value === "required", true),
  overrun: domain("a mapping with measured_line_count from 401 to 440 and a non-empty justification", isOverrun),
});
const REQUIRED_KEYS = Object.freeze([...Object.keys(BASELINE), ...Object.keys(CONFORMANCE)]);
const OPTIONAL_KEYS = Object.freeze(Object.keys(OPTIONAL));

export function checkFrontmatter(document, ruleIndex) {
  const ruleId = resolveRuleId(ruleIndex, "boundary--ownership", /frontmatter, Rule_ID, findings/u, "boundary--ownership#7");
  let parsed;
  try {
    parsed = readFrontmatter(document.text);
  } catch (error) {
    const line = error instanceof FrontmatterError ? error.line : 1;
    const message = error instanceof Error ? error.message : String(error);
    return verdict(null, null, [issue(document, ruleId, {
      severity: "blocker",
      line,
      message: `frontmatter-unparseable: ${message}`,
    })]);
  }

  const partitions = partitionKeys(parsed.data);
  const findings = [];
  checkRequiredPartition(document, parsed, BASELINE, findings, ruleId);
  checkRequiredPartition(document, parsed, CONFORMANCE, findings, ruleId);
  checkOptionalPartition(document, parsed, findings, ruleId);
  checkUnknownPartition(document, parsed, partitions.unknown, findings, ruleId);
  return verdict(parsed, partitions, findings);
}

function checkRequiredPartition(document, parsed, schema, findings, ruleId) {
  for (const [key, contract] of Object.entries(schema)) {
    if (contract.validate(parsed.data[key])) continue;
    const line = parsed.keyLines[key] ?? 1;
    const column = parsed.keyLines[key] ? 1 : REQUIRED_KEYS.indexOf(key) + 1;
    findings.push(issue(document, ruleId, {
      severity: "blocker",
      line,
      column,
      message: `Frontmatter ${key} expected ${contract.expected}.`,
    }));
  }
}

function checkOptionalPartition(document, parsed, findings, ruleId) {
  for (const [key, contract] of Object.entries(OPTIONAL)) {
    const present = Object.hasOwn(parsed.data, key);
    if ((!present && !contract.requiredInDocument) || (present && contract.validate(parsed.data[key]))) continue;
    findings.push(issue(document, ruleId, {
      severity: "minor",
      line: parsed.keyLines[key] ?? 1,
      column: parsed.keyLines[key] ? 1 : REQUIRED_KEYS.length + OPTIONAL_KEYS.indexOf(key) + 1,
      message: `Optional frontmatter ${key} expected ${contract.expected}.`,
    }));
  }
}

function checkUnknownPartition(document, parsed, unknownKeys, findings, ruleId) {
  for (const key of unknownKeys) {
    findings.push(issue(document, ruleId, {
      severity: "minor",
      line: parsed.keyLines[key] ?? 1,
      message: `unknown-frontmatter-key: ${key}; expected a baseline, conformance, or declared optional key.`,
    }));
  }
}

function partitionKeys(values) {
  const partitions = { baseline: [], conformance: [], optional: [], unknown: [] };
  for (const key of Object.keys(values)) {
    if (Object.hasOwn(BASELINE, key)) partitions.baseline.push(key);
    else if (Object.hasOwn(CONFORMANCE, key)) partitions.conformance.push(key);
    else if (Object.hasOwn(OPTIONAL, key)) partitions.optional.push(key);
    else partitions.unknown.push(key);
  }
  for (const keys of Object.values(partitions)) Object.freeze(keys);
  return Object.freeze(partitions);
}

function issue(document, ruleId, { severity, line, column = 1, message }) {
  return finding({
    ruleId,
    type: "unimplemented-guideline",
    severity,
    path: document.sourcePath,
    line,
    column,
    message,
  });
}

function verdict(parsed, partitions, findings) {
  return Object.freeze({ parsed, partitions, findings: Object.freeze(findings) });
}

function domain(expected, validate, requiredInDocument = false) {
  return Object.freeze({ expected, validate, requiredInDocument });
}

function isBoundedString(value, maximum) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maximum;
}

function isCalendarDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function isReadinessRung(value) {
  return typeof value === "string" && READINESS_RUNGS.has(value);
}

function isOverrun(value) {
  if (!isPlainMapping(value)) return false;
  const keys = Object.keys(value);
  return keys.length === 2
    && keys.includes("measured_line_count")
    && keys.includes("justification")
    && Number.isInteger(value.measured_line_count)
    && value.measured_line_count >= 401
    && value.measured_line_count <= 440
    && isBoundedString(value.justification, 200);
}

function isPlainMapping(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function sameArray(value, expected) {
  return Array.isArray(value) && value.length === expected.length && value.every((item, index) => item === expected[index]);
}
