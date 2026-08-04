import { byteCompare } from "./normalizer.mjs";
import { validateBlockedOutcome } from "./content.mjs";

export const FINDING_TYPES = Object.freeze([
  "out-of-scope-write", "evidence-without-run", "self-graded-verdict", "stale-collaboration-fence", "deploy-boundary-breach", "admission-snapshot-stale",
  "concurrent-write-conflict", "vendor-coupling", "unimplemented-guideline", "unattributed-agentic-commit", "misplaced-conflict-resolution", "unresolved-conflict-publish",
]);
const SEVERITY = Object.freeze({ minor: 0, major: 1, blocker: 2 });
const RULE_TEXT_UNAVAILABLE = "Rule text unavailable in degraded input.";

export function buildReport({
  findings,
  inputStatus,
  registrationReady,
  ruleIndex = null,
  comparisonContext = Object.freeze([]),
  blockedOutcomes = [],
  forcedExitStatus = null,
}) {
  const outcomeValues = Array.isArray(blockedOutcomes) ? blockedOutcomes : [];
  const validOutcomes = [];
  const outcomeFindings = [];
  try {
    assertFrozenComparisonContext(comparisonContext);
  } catch (error) {
    outcomeFindings.push(checkerInternalErrorFinding("normalization-context", error));
  }
  for (const [index, outcome] of outcomeValues.entries()) {
    const problems = validateBlockedOutcome(outcome);
    if (problems.length === 0) validOutcomes.push(deepFreezeClone(outcome));
    else outcomeFindings.push(checkerInternalErrorFinding("blocked-outcome", new Error(`blockedOutcomes[${index}]: ${problems.join(" ")}`)));
  }
  if (!Array.isArray(blockedOutcomes)) outcomeFindings.push(checkerInternalErrorFinding("blocked-outcome", new Error("blockedOutcomes must be an array.")));
  const ordered = collapseFindings([...findings, ...outcomeFindings]);
  const severityCounts = { blocker: 0, major: 0, minor: 0 };
  const typeCounts = Object.fromEntries(FINDING_TYPES.map(type => [type, 0]));
  for (const item of ordered) {
    severityCounts[item.severity] += item.repeatCount;
    typeCounts[item.type] = (typeCounts[item.type] || 0) + item.repeatCount;
  }
  const conformant = severityCounts.blocker === 0 && severityCounts.major === 0 && registrationReady && validOutcomes.length === 0;
  const exitStatus = forcedExitStatus ?? (inputStatus === "degraded" ? 2 : conformant ? 0 : 1);
  const artifactRuleIds = new Set((ruleIndex?.artifactRules || []).map(rule => rule.id));
  const isUnsatisfiedArtifactRule = ruleId => ruleIndex === null || artifactRuleIds.has(ruleId);
  return Object.freeze({
    schema: "agentic-git-guidelines-report/v1",
    verdict: conformant && exitStatus === 0 ? "conformant" : "not-conformant",
    findingTotal: ordered.reduce((sum, item) => sum + item.repeatCount, 0),
    severityCounts: Object.freeze(severityCounts), typeCounts: Object.freeze(typeCounts),
    unsatisfiedRuleIds: Object.freeze([...new Set([
      ...ordered.filter(item => item.severity !== "minor" && isUnsatisfiedArtifactRule(item.ruleId)).map(item => item.ruleId),
      ...validOutcomes.filter(outcome => isUnsatisfiedArtifactRule(outcome.ruleId)).map(outcome => outcome.ruleId),
    ])].sort(byteCompare)),
    inputStatus, blockedOutcomes: Object.freeze(validOutcomes), findings: Object.freeze(ordered), exitStatus,
  });
}

export function runFindingFamily(name, run, { path = "git-guidelines.md", ruleId = "findings--rule-identity#2" } = {}) {
  return recordFindingFamily(evaluateFindingFamily(name, run, { path, ruleId }), undefined, { path, ruleId });
}

export function evaluateFindingFamily(name, run, { path = "git-guidelines.md", ruleId = "findings--rule-identity#2" } = {}) {
  try {
    return Object.freeze({ name, evaluated: true, findings: Object.freeze([...run()]) });
  } catch (error) {
    return Object.freeze({
      name,
      evaluated: false,
      findings: Object.freeze([checkerInternalErrorFinding(name, error, { path, ruleId })]),
    });
  }
}

export function recordFindingFamily(evaluation, record = value => value.findings, { path = "git-guidelines.md", ruleId = "findings--rule-identity#2" } = {}) {
  try {
    return Object.freeze([...record(evaluation)]);
  } catch (error) {
    return Object.freeze([checkerInternalErrorFinding(`${evaluation?.name || "unknown"}-recording`, error, { path, ruleId })]);
  }
}

export function checkerInternalErrorFinding(name, error, { path = "git-guidelines.md", ruleId = "findings--rule-identity#2" } = {}) {
  return Object.freeze({
    ruleId,
    ruleText: "Checker family execution must complete without internal error.",
    type: "unimplemented-guideline",
    severity: "blocker",
    location: Object.freeze({ path, line: 1, column: 1 }),
    message: `checker-internal-error: Checker family ${name} failed internally: ${error?.message || String(error)}`,
    repeatCount: 1,
  });
}

export function collapseFindings(findings) {
  const sorted = findings.map(normalizeFinding).sort(compareFindings);
  const collapsed = [];
  const byLocation = new Map();
  for (const current of sorted) {
    const key = JSON.stringify([current.ruleId, current.location.path, current.location.line, current.location.column]);
    const prior = byLocation.get(key);
    if (prior) {
      prior.repeatCount += current.repeatCount;
      if (SEVERITY[current.severity] > SEVERITY[prior.severity]) prior.severity = current.severity;
      if (prior.ruleText === RULE_TEXT_UNAVAILABLE && current.ruleText !== RULE_TEXT_UNAVAILABLE) prior.ruleText = current.ruleText;
      continue;
    }
    const next = { ...current, location: { ...current.location } };
    collapsed.push(next);
    byLocation.set(key, next);
  }
  return collapsed.map(item => Object.freeze({ ...item, location: Object.freeze(item.location) }));
}

function normalizeFinding(value) {
  const normalized = {
    ruleId: String(value.ruleId || "checker#1"), ruleText: String(value.ruleText || RULE_TEXT_UNAVAILABLE),
    type: FINDING_TYPES.includes(value.type) ? value.type : "unimplemented-guideline",
    severity: Object.hasOwn(SEVERITY, value.severity) ? value.severity : "blocker",
    location: { path: String(value.location?.path || ""), line: Number(value.location?.line || 1), column: Number(value.location?.column || 1) },
    message: String(value.message || "Conformance finding"), repeatCount: Number(value.repeatCount || 1),
  };
  return normalized;
}

function compareFindings(left, right) {
  const [leftAnchor, leftOrdinal] = splitRule(left.ruleId); const [rightAnchor, rightOrdinal] = splitRule(right.ruleId);
  return byteCompare(leftAnchor, rightAnchor) || leftOrdinal - rightOrdinal
    || left.location.line - right.location.line || left.location.column - right.location.column
    || byteCompare(left.type, right.type) || byteCompare(left.location.path, right.location.path)
    || SEVERITY[right.severity] - SEVERITY[left.severity]
    || byteCompare(left.message, right.message)
    || byteCompare(left.ruleText ?? "", right.ruleText ?? "") || left.repeatCount - right.repeatCount;
}
function splitRule(ruleId) { const match = ruleId.match(/^(.*)#(\d+)$/u); return match ? [match[1], Number(match[2])] : [ruleId, 0]; }
function deepFreezeClone(value) {
  if (value === null || typeof value !== "object") return value;
  const clone = Array.isArray(value) ? value.map(deepFreezeClone) : Object.fromEntries(Object.entries(value).map(([key, item]) => [key, deepFreezeClone(item)]));
  return Object.freeze(clone);
}

function assertFrozenComparisonContext(value) {
  if (!Array.isArray(value) || !isDeepFrozen(value)) {
    throw new TypeError("Normalized comparison context must be a deeply frozen array.");
  }
  JSON.stringify(value);
}

function isDeepFrozen(value) {
  if (value === null || typeof value !== "object") return true;
  return Object.isFrozen(value) && Object.values(value).every(isDeepFrozen);
}
