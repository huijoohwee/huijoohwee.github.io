import { byteCompare } from "./normalizer.mjs";

export const FINDING_TYPES = Object.freeze([
  "out-of-scope-write", "evidence-without-run", "self-graded-verdict", "stale-collaboration-fence", "deploy-boundary-breach", "admission-snapshot-stale",
  "concurrent-write-conflict", "vendor-coupling", "unimplemented-guideline", "unattributed-agentic-commit", "misplaced-conflict-resolution", "unresolved-conflict-publish",
]);
const SEVERITY = Object.freeze({ minor: 0, major: 1, blocker: 2 });

export function buildReport({ findings, inputStatus, registrationReady, blockedOutcomes = [], forcedExitStatus = null }) {
  const ordered = collapseFindings(findings);
  const severityCounts = { blocker: 0, major: 0, minor: 0 };
  const typeCounts = Object.fromEntries(FINDING_TYPES.map(type => [type, 0]));
  for (const item of ordered) {
    severityCounts[item.severity] += item.repeatCount;
    typeCounts[item.type] = (typeCounts[item.type] || 0) + item.repeatCount;
  }
  const conformant = severityCounts.blocker === 0 && severityCounts.major === 0 && registrationReady;
  const exitStatus = forcedExitStatus ?? (inputStatus === "degraded" ? 2 : conformant ? 0 : 1);
  return Object.freeze({
    schema: "agentic-git-guidelines-report/v1",
    verdict: conformant && exitStatus === 0 ? "conformant" : "not-conformant",
    findingTotal: ordered.reduce((sum, item) => sum + item.repeatCount, 0),
    severityCounts: Object.freeze(severityCounts), typeCounts: Object.freeze(typeCounts),
    unsatisfiedRuleIds: Object.freeze([...new Set(ordered.filter(item => item.severity !== "minor").map(item => item.ruleId))].sort(byteCompare)),
    inputStatus, blockedOutcomes: Object.freeze(blockedOutcomes), findings: Object.freeze(ordered), exitStatus,
  });
}

export function collapseFindings(findings) {
  const sorted = findings.map(normalizeFinding).sort(compareFindings);
  const collapsed = [];
  for (const current of sorted) {
    const prior = collapsed.at(-1);
    if (prior && prior.ruleId === current.ruleId && sameLocation(prior.location, current.location)) {
      prior.repeatCount += current.repeatCount;
      if (SEVERITY[current.severity] > SEVERITY[prior.severity]) prior.severity = current.severity;
      continue;
    }
    collapsed.push({ ...current, location: { ...current.location } });
  }
  return collapsed.map(item => Object.freeze({ ...item, location: Object.freeze(item.location) }));
}

function normalizeFinding(value) {
  return {
    ruleId: String(value.ruleId || "checker#1"), type: FINDING_TYPES.includes(value.type) ? value.type : "unimplemented-guideline",
    severity: Object.hasOwn(SEVERITY, value.severity) ? value.severity : "blocker",
    location: { path: String(value.location?.path || ""), line: Number(value.location?.line || 1), column: Number(value.location?.column || 1) },
    message: String(value.message || "Conformance finding"), repeatCount: Number(value.repeatCount || 1),
  };
}

function compareFindings(left, right) {
  const [leftAnchor, leftOrdinal] = splitRule(left.ruleId); const [rightAnchor, rightOrdinal] = splitRule(right.ruleId);
  return byteCompare(leftAnchor, rightAnchor) || leftOrdinal - rightOrdinal || byteCompare(left.location.path, right.location.path)
    || left.location.line - right.location.line || left.location.column - right.location.column
    || SEVERITY[right.severity] - SEVERITY[left.severity] || byteCompare(left.type, right.type)
    || byteCompare(left.message, right.message) || left.repeatCount - right.repeatCount;
}
function splitRule(ruleId) { const match = ruleId.match(/^(.*)#(\d+)$/u); return match ? [match[1], Number(match[2])] : [ruleId, 0]; }
function sameLocation(left, right) { return left.path === right.path && left.line === right.line && left.column === right.column; }
