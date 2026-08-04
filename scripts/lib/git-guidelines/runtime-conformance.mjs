import { createBlockedOutcome, evaluateRuntimeComposition, finding } from "./content.mjs";
import { resolveRuleId } from "./rule-registry.mjs";

export function checkRuntimeConformance(document, context, ruleIndex) {
  if (context === undefined || context === null) return runtimeResult([], []);
  const evaluation = evaluateRuntimeComposition(context);
  const findings = [];
  const blockedOutcomes = [];
  const recordBlock = ({ decision, type, message, blockingCondition, causingArtifact, resolutionPath }) => {
    const ruleId = runtimeRuleId(ruleIndex, decision);
    findings.push(runtimeIssue(document, ruleId, type, message));
    blockedOutcomes.push(createBlockedOutcome({
      ruleId,
      blockingCondition,
      causingArtifact: canonicalArtifact(causingArtifact) || claimReference(causingArtifact),
      preState: context.repositoryState,
      postState: context.repositoryState,
      resolutionPath: canonicalResolutionPath(resolutionPath, context, document),
    }));
  };

  if (context.currentAuthority === null && context.changedPaths.length > 0) {
    recordBlock({
      decision: "admission", type: "unimplemented-guideline", blockingCondition: "claim-absent",
      causingArtifact: claimReference("current-authority"), resolutionPath: context.changedPaths[0],
      message: "claim-absent: changed paths have no resolved current authority.",
    });
  }
  if (evaluation.admission.overlappingAuthorityIds.length > 0) {
    recordBlock({
      decision: "admission", type: "concurrent-write-conflict", blockingCondition: "claim-scope-overlap",
      causingArtifact: authorityArtifact(context.peerAuthorities, evaluation.admission.overlappingAuthorityIds[0]),
      message: `claim-scope-overlap: current admission overlaps ${evaluation.admission.overlappingAuthorityIds.join(", ")}.`,
    });
  }
  if (evaluation.commit.outOfScopePaths.length > 0) {
    recordBlock({
      decision: "commit", type: "out-of-scope-write", blockingCondition: "scope-containment-violated",
      causingArtifact: currentAuthorityArtifact(context), resolutionPath: evaluation.commit.outOfScopePaths[0],
      message: `scope-containment-violated: ${evaluation.commit.outOfScopePaths.join(", ")}.`,
    });
  }
  if (evaluation.publication.authorityProblems.length > 0 && context.changedPaths.length > 0) {
    recordBlock({
      decision: "publication", type: "stale-collaboration-fence", blockingCondition: "publication-claim-failed",
      causingArtifact: currentAuthorityArtifact(context),
      message: `publication-claim-failed: ${evaluation.publication.authorityProblems.join(", ")}.`,
    });
  }
  if (evaluation.publication.overlappingAuthorityIds.length > 0) {
    recordBlock({
      decision: "publication-overlap", type: "concurrent-write-conflict", blockingCondition: "claim-scope-overlap",
      causingArtifact: authorityArtifact(context.publicationAuthorities, evaluation.publication.overlappingAuthorityIds[0]),
      message: `publication-scope-overlap: current publication overlaps ${evaluation.publication.overlappingAuthorityIds.join(", ")}.`,
    });
  }
  if (evaluation.integration.selectedIsNext === false) {
    recordBlock({
      decision: "integration", type: "concurrent-write-conflict", blockingCondition: "integration-order-violated",
      causingArtifact: claimReference(`integration:${evaluation.integration.nextRequestId}`),
      message: `integration-order-violated: next request is ${evaluation.integration.nextRequestId}.`,
    });
  }
  return runtimeResult(findings, blockedOutcomes);
}

function runtimeIssue(document, ruleId, type, message) {
  return finding({
    ruleId,
    type,
    severity: type === "concurrent-write-conflict" || type === "unimplemented-guideline" ? "major" : "blocker",
    path: document.sourcePath,
    message,
  });
}

function runtimeRuleId(ruleIndex, decision) {
  if (decision === "commit") {
    return resolveRuleId(ruleIndex, "authoring--write-scope", /Require every changed path/u, "authoring--write-scope#5");
  }
  if (decision === "publication") {
    return resolveRuleId(ruleIndex, "coordination-artifacts", /Before reconnect publication/u, "coordination-artifacts#26");
  }
  if (decision === "publication-overlap") {
    return resolveRuleId(ruleIndex, "conflict--integration-order", /If two lanes could publish one path/u, "conflict--integration-order#15");
  }
  if (decision === "integration") {
    return resolveRuleId(ruleIndex, "conflict--integration-order", /Order pending overlaps by dependency class/u, "conflict--integration-order#18");
  }
  return resolveRuleId(ruleIndex, "lane-topology--admission", /`claim\(scope\)`.*no overlap/u, "lane-topology--admission#17");
}

function runtimeResult(findings, blockedOutcomes) {
  return Object.freeze({
    findings: Object.freeze(findings),
    blockedOutcomes: Object.freeze(blockedOutcomes),
  });
}

function currentAuthorityArtifact(context) {
  return canonicalArtifact(context.currentAuthority?.artifactPath)
    || claimReference(context.currentAuthority?.authorityId || "current-authority");
}

function authorityArtifact(authorities, authorityId) {
  const authority = Array.isArray(authorities)
    ? authorities.find(candidate => String(candidate?.authorityId || candidate?.claimId || candidate?.artifactPath) === authorityId)
    : null;
  return canonicalArtifact(authority?.artifactPath) || claimReference(authorityId);
}

function canonicalResolutionPath(preferred, context, document) {
  for (const candidate of [preferred, context.resolutionPath, context.currentAuthority?.artifactPath, document.sourcePath]) {
    const canonical = canonicalArtifact(candidate);
    if (canonical) return canonical;
  }
  return "docs/documents/git-guidelines.md";
}

function canonicalArtifact(value) {
  const candidate = String(value || "");
  if (!candidate || candidate.includes("\\") || candidate.includes("\0") || candidate.startsWith("/") || candidate.endsWith("/")) return null;
  const segments = candidate.split("/");
  return segments.some(segment => segment === "" || segment === "." || segment === "..") ? null : candidate;
}

function claimReference(value) {
  const identity = String(value || "unknown").replace(/[^a-zA-Z0-9._:-]+/gu, "-");
  return `claim:runtime:${identity || "unknown"}`;
}
