#!/usr/bin/env node

import path from "node:path";
import { fileURLToPath } from "node:url";

import { checkAntipatterns } from "./lib/git-guidelines/antipattern.mjs";
import { checkArtifacts } from "./lib/git-guidelines/artifact-schema.mjs";
import { checkBoundary } from "./lib/git-guidelines/boundary.mjs";
import { checkChecklist } from "./lib/git-guidelines/checklist.mjs";
import { checkCommitAttribution } from "./lib/git-guidelines/commit-attribution.mjs";
import { checkContentContract, createBlockedOutcome, finding, parseDocument } from "./lib/git-guidelines/content.mjs";
import { checkDivergence } from "./lib/git-guidelines/divergence.mjs";
import { checkFindingsTable } from "./lib/git-guidelines/findings-table.mjs";
import { checkFrontmatter } from "./lib/git-guidelines/frontmatter.mjs";
import { resolveInputs } from "./lib/git-guidelines/input-resolver.mjs";
import { checkLineBudget } from "./lib/git-guidelines/line-budget.mjs";
import { checkNeutrality } from "./lib/git-guidelines/neutrality.mjs";
import {
  normalizeArtifactsForComparison,
  normalizeFrontmatterSource,
  normalizeValue,
} from "./lib/git-guidelines/normalizer.mjs";
import { checkRegistrations } from "./lib/git-guidelines/registration.mjs";
import { buildReport, evaluateFindingFamily, recordFindingFamily } from "./lib/git-guidelines/report.mjs";
import { buildRuleIndex, resolveRuleId } from "./lib/git-guidelines/rule-registry.mjs";
import { checkStructure } from "./lib/git-guidelines/structure.mjs";

const startedAt = Date.now();
let verdict = "not-conformant";
const argumentsList = process.argv.slice(2);
const scriptRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const options = {
  repositoryRoot: readOption("repository") || scriptRoot,
  documentPath: readOption("document") || undefined,
  acosRoot: readOption("acos-root") || undefined,
  workspaceRoot: readOption("workspace-root") || undefined,
  expectedBaseRevision: readOption("expected-base-revision") || undefined,
  expectedProtectedRevision: readOption("expected-protected-revision")
    || process.env.GIT_GUIDELINES_EXPECTED_PROTECTED_REVISION
    || undefined,
  acceptedFenceRevision: readOption("accepted-fence-revision") || undefined,
  probeRemote: !argumentsList.includes("--skip-remote-probe"),
};
let report;

try {
  const inputs = resolveInputs(options);
  const absolutePrefixes = [inputs.repo, inputs.workspaceRoot, inputs.acosRoot];
  const documentText = inputs.document === null
    ? null
    : normalizeFrontmatterSource(inputs.document, { absolutePrefixes });
  const document = documentText === null ? null : parseDocument(documentText, inputs.documentPath);
  const comparisonArtifacts = normalizeArtifactsForComparison(inputs.workspaceArtifacts, { absolutePrefixes });
  let ruleIndex = document === null ? emptyRuleIndex() : buildRuleIndex(document);
  const inputRuleId = resolveRuleId(ruleIndex, "coordination-artifacts", /Absent, unreadable, unparseable, expired, stale, duplicate/u, "coordination-artifacts#28");
  const findings = inputs.problems.map(problem => finding({
    ruleId: inputRuleId,
    type: problem.condition === "stale" ? "stale-collaboration-fence" : "evidence-without-run",
    path: problem.path,
    message: `${problem.code}: required ${problem.kind} input ${problem.inputId} is ${problem.condition}: ${problem.message}`,
  }));
  const blockedOutcomes = inputs.problems.map(problem => blockedOutcomeForProblem(problem, inputs, inputRuleId));
  let registration = { findings: [], ready: false };
  if (inputs.problems.length === 0) {
    const owners = normalizeValue(inputs.owners, { absolutePrefixes });
    const registrations = normalizeValue(inputs.registrations, { absolutePrefixes });
    const normalizedGitFacts = normalizeValue(inputs.gitFacts, { absolutePrefixes });
    const gitFacts = Object.freeze({
      ...normalizedGitFacts,
      refreshChain: inputs.gitFacts.refreshChain,
      refreshAuthority: inputs.gitFacts.refreshAuthority,
    });
    collectFamily(findings, "rule-registry", () => ruleIndex.findings, inputs, ruleIndex);
    let frontmatter = { parsed: null, findings: [] };
    collectFamily(findings, "frontmatter", () => {
      const result = checkFrontmatter(document, ruleIndex);
      frontmatter = result;
      return result.findings;
    }, inputs, ruleIndex);
    const families = [
      ["structure", () => checkStructure(document, ruleIndex)],
      ["line-budget", () => checkLineBudget(document, frontmatter.parsed, ruleIndex)],
      ["boundary", () => checkBoundary(document, ruleIndex)],
      ["divergence", () => checkDivergence(document, owners, ruleIndex)],
      ["neutrality", () => checkNeutrality(document, ruleIndex)],
      ["content", () => checkContentContract(document, ruleIndex)],
      ["artifacts", () => {
        const result = checkArtifacts(document, inputs.artifacts, ruleIndex, {
          ...inputs.runtimeContext,
          comparisonArtifacts,
          repositoryState: inputs.repositoryState,
          resolutionPath: repositoryRelativeOrFallback(inputs.documentPath, inputs.repo),
        });
        blockedOutcomes.push(...result.blockedOutcomes);
        return result.findings;
      }],
      ["findings-table", () => checkFindingsTable(document, ruleIndex)],
      ["checklist", () => checkChecklist(document, ruleIndex)],
      ["commit-attribution", () => checkCommitAttribution(document, gitFacts, ruleIndex)],
      ["anti-pattern", () => checkAntipatterns(document, ruleIndex)],
    ];
    for (const [name, run] of families) collectFamily(findings, name, run, inputs, ruleIndex);
    collectFamily(findings, "registration", () => {
      const result = checkRegistrations(document, registrations, frontmatter.parsed, ruleIndex);
      registration = result;
      return result.findings;
    }, inputs, ruleIndex);
  }
  let forcedExitStatus = inputs.problems.length > 0 ? 2 : null;
  if (options.probeRemote && inputs.gitFacts.remote.state !== "online") {
    const remoteRuleId = resolveRuleId(ruleIndex, "verification-gates", /Before remote or protected-canonical push/u, "verification-gates#6");
    findings.push(finding({
      ruleId: remoteRuleId,
      type: "evidence-without-run",
      path: inputs.documentPath,
      message: `remote-unreachable: ${inputs.gitFacts.remote.remote || "origin"}; blocked checks: ${inputs.gitFacts.remote.blockedChecks.join(", ")}; the 10-second reachability probe satisfies the 30-second required-remote upper bound.`,
    }));
    blockedOutcomes.push(createBlockedOutcome({
      ruleId: remoteRuleId,
      blockingCondition: "check-not-terminal",
      causingArtifact: `claim:remote:${safeIdentifier(inputs.gitFacts.remote.remote || "origin")}`,
      preState: inputs.repositoryState,
      postState: inputs.repositoryState,
      resolutionPath: repositoryRelativeOrFallback(inputs.documentPath, inputs.repo),
    }));
    forcedExitStatus = 3;
  }
  if (inputs.limits.boundExceeded || Date.now() - startedAt > 60_000) {
    if (!inputs.limits.boundExceeded) findings.push(finding({
      ruleId: "verification-gates#6", type: "evidence-without-run", path: inputs.documentPath,
      message: "verdict-bound-exceeded: the checker did not reach a verdict within 60 seconds.",
    }));
    forcedExitStatus = 3;
  }
  const normalizedFindings = normalizeValue(withRuleText(findings, ruleIndex), { absolutePrefixes });
  report = buildReport({
    findings: normalizedFindings,
    inputStatus: inputs.inputStatus,
    registrationReady: registration.ready,
    ruleIndex,
    comparisonContext: comparisonArtifacts,
    blockedOutcomes,
    forcedExitStatus,
  });
  verdict = report.verdict;
} catch (error) {
  const timedOut = error?.code === "ETIMEDOUT";
  report = buildReport({
    findings: [finding({
      ruleId: timedOut ? "verification-gates#6" : "findings--rule-identity#2",
      ruleText: "Checker initialization and input resolution.",
      type: "unimplemented-guideline",
      path: options.documentPath || "git-guidelines.md",
      message: timedOut ? `verdict-bound-exceeded: ${error.message}` : `Checker initialization failed: ${error.message}`,
    })],
    inputStatus: "degraded", registrationReady: false, forcedExitStatus: timedOut ? 3 : 2,
  });
}

if (verdict !== report.verdict) throw new Error("Verdict state diverged from the report.");
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
process.exitCode = report.exitStatus;

function readOption(name) {
  const prefix = `--${name}=`; const value = argumentsList.find(argument => argument.startsWith(prefix));
  return value ? value.slice(prefix.length) : null;
}

function emptyRuleIndex() {
  return Object.freeze({ rules: Object.freeze([]), byId: Object.freeze(Object.create(null)), findings: Object.freeze([]) });
}

function familyOptions(inputs, ruleIndex) {
  return {
    path: inputs.documentPath,
    ruleId: resolveRuleId(ruleIndex, "findings--rule-identity", /Classify every rule once/u, "findings--rule-identity#2"),
  };
}

function collectFamily(findings, name, run, inputs, ruleIndex) {
  const options = familyOptions(inputs, ruleIndex);
  const evaluation = evaluateFindingFamily(name, run, options);
  findings.push(...recordFindingFamily(evaluation, undefined, options));
}

function withRuleText(findings, ruleIndex) {
  return findings.map(item => Object.freeze({
    ...item,
    ruleText: ruleIndex.byId[item.ruleId]?.ruleText || item.ruleText || "Rule text unavailable in degraded input.",
  }));
}

function blockedOutcomeForProblem(problem, inputs, ruleId) {
  const condition = problem.condition === "stale"
    ? "fence-divergent"
    : problem.condition === "absent"
      ? "claim-absent"
      : "identity-unprojectable";
  const relativePath = repositoryRelative(problem.path, inputs.repo)
    || repositoryRelative(problem.path, inputs.workspaceRoot);
  return createBlockedOutcome({
    ruleId,
    blockingCondition: condition,
    causingArtifact: relativePath || `claim:input:${safeIdentifier(problem.inputId)}`,
    preState: inputs.repositoryState,
    postState: inputs.repositoryState,
    resolutionPath: relativePath || repositoryRelativeOrFallback(inputs.documentPath, inputs.repo),
  });
}

function repositoryRelative(value, root) {
  const relative = path.relative(root, String(value || "")).replaceAll(path.sep, "/");
  return relative && relative !== ".." && !relative.startsWith("../") && !path.isAbsolute(relative) ? relative : null;
}

function repositoryRelativeOrFallback(value, root) {
  return repositoryRelative(value, root) || "docs/documents/git-guidelines.md";
}

function safeIdentifier(value) {
  return String(value || "unknown").replace(/[^a-zA-Z0-9._:-]+/gu, "-");
}
