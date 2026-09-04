import assert from "node:assert/strict";
import { contractSlice } from "./adlc-contract-input.mjs";

export function checkAuthoringContract({
  source, authoringGuideline, productionReleaseLifecycle, conformanceRuntime, integrationOrder, specificationChain, artifactContinuity, upstreamAdmission, cloudCollaboration, scopedLaneAdmission, repositoryRuntimeReadiness, antiPatternGuards, autonomousContinuation, rapidMvpSprint, lines, guidelineLogicalLineCount, productionReleaseLifecycleLines, conformanceRuntimeLines, integrationOrderLines, specificationChainLines, artifactContinuityLines, upstreamAdmissionLines, cloudCollaborationLines, scopedLaneAdmissionLines, repositoryRuntimeReadinessLines
}) {
  assert.ok(source.startsWith("---\n"), "guideline frontmatter must be present");
  assert.match(source, /minimum-time-and-resource \/ maximum-core-value chain/);
  assert.match(source, /forbid over-investing in non-core periphery/i);
  assert.match(source, /unused budget never authorizes it/);
  assert.match(source, /\nuniversal_scope: true\n/);
  assert.match(source, /\nruntime_readiness_policy: "fail-closed"\n/);
  assert.match(source, /\nupstream_blocking_policy: "prevent-not-bypass"\n/);
  assert.match(source, /\nlocal_rung: "spec-complete"\n/);
  assert.match(source, /\ndelivered_rung: "undocumented"\n/);
  assert.match(source, /\nlifecycle_status: "proposed"\n/);
  assert.ok(guidelineLogicalLineCount < 600, "guideline must remain below 600 logical lines");
  assert.match(
    source,
    /projection check named by the authoring set's canvas-render contract/,
    "diagram-bearing tasks must emit a projection check as an Evidence Reference",
  );
  assert.match(
    source,
    /\| Diagram identity, class, notation, and canvas projection rules \|/,
    "the boundary table must name the diagram companion modules as the owner of diagram rules",
  );
  assert.ok(authoringGuideline.startsWith("---\n"), "authoring guideline frontmatter must be present");
  assert.match(authoringGuideline, /\.\/adlc-artifact-continuity\.md/);
  assert.equal(
    authoringGuideline.split("## Artifact Continuity Authoring Seam").length - 1,
    1,
    "authoring guideline must define the artifact continuity seam exactly once",
  );
  assert.ok(
    productionReleaseLifecycle.startsWith("---\n"),
    "production-release lifecycle frontmatter must be present",
  );
  assert.match(productionReleaseLifecycle, /\nuniversal_scope: true\n/);
  assert.match(productionReleaseLifecycle, /\nruntime_readiness_policy: "fail-closed"\n/);
  assert.ok(
    productionReleaseLifecycleLines.length - 1 < 600,
    "production-release lifecycle module must remain below 600 lines",
  );
  assert.match(source, /\.\/adlc-production-release-lifecycle\.md/);
  for (const [moduleSource, moduleLink] of [
    [antiPatternGuards, "adlc-anti-pattern-guards.md"],
    [autonomousContinuation, "adlc-autonomous-continuation.md"],
    [rapidMvpSprint, "adlc-rapid-mvp-sprint.md"],
  ]) {
    assert.ok(moduleSource.startsWith("---\n"), `${moduleLink} frontmatter must be present`);
    assert.match(moduleSource, /\ndoc_type: "Guideline Module"\n/);
    assert.match(moduleSource, /\nuniversal_scope: true\n/);
    assert.match(moduleSource, /\nprovider_neutral: true\n/);
    assert.match(source, new RegExp(`\\.\\/${moduleLink.replace(".", "\\.")}`));
  }
  assert.match(autonomousContinuation, /derive, sign, store, and transport every required machine encoding internally/);
  assert.match(autonomousContinuation, /one unresolved semantic decision/);
  assert.match(rapidMvpSprint, /fewer named phases discharging the same obligations, never fewer obligations/);
  assert.ok(conformanceRuntime.startsWith("---\n"), "conformance-runtime frontmatter must be present");
  assert.match(conformanceRuntime, /\nlocal_rung: "spec-complete"\n/);
  assert.match(conformanceRuntime, /\ndelivered_rung: "undocumented"\n/);
  assert.match(conformanceRuntime, /\nuniversal_scope: true\n/);
  assert.match(conformanceRuntime, /\nruntime_readiness_policy: "fail-closed"\n/);
  assert.match(conformanceRuntime, /\nlifecycle_status: "proposed"\n/);
  assert.ok(
    conformanceRuntimeLines.length - 1 < 600,
    "conformance-runtime module must remain below 600 lines",
  );
  assert.match(integrationOrder, /\nuniversal_scope: true\n/);
  assert.ok(integrationOrderLines.length - 1 < 600, "integration-order module must remain below 600 lines");
  assert.ok(specificationChain.startsWith("---\n"), "specification-chain frontmatter must be present");
  assert.match(specificationChain, /\nuniversal_scope: true\n/);
  assert.ok(specificationChainLines.length - 1 < 600, "specification-chain module must remain below 600 lines");
  assert.ok(artifactContinuity.startsWith("---\n"), "artifact-continuity frontmatter must be present");
  assert.match(artifactContinuity, /\nschema: "agentic-artifact-continuity\/v1"\n/);
  assert.match(artifactContinuity, /\nuniversal_scope: true\n/);
  assert.match(artifactContinuity, /\nruntime_readiness_policy: "fail-closed"\n/);
  assert.ok(artifactContinuityLines.length - 1 < 600, "artifact-continuity module must remain below 600 lines");
  assert.match(source, /\.\/adlc-artifact-continuity\.md/);

  for (const heading of [
    "## Semantic Separation",
    "## Continuity Graph",
    "## Continuity Identity and Revision Contract",
    "## CID-to-RAO Coverage Seam",
    "## Role-Action-Outcome Contract",
    "## Artifact Companion Contract",
    "## Evidence and Demonstration",
    "## Re-derivation and Successor Feedback",
    "## CID Directive Matrix",
    "## Conformance Findings",
    "## Validation Checklist",
  ]) {
    assert.equal(
      artifactContinuity.split(heading).length - 1,
      1,
      `${heading} must occur exactly once in artifact continuity`,
    );
  }

  for (const requirement of [
    "shared [CID/RAO/SVO contract](./cid-guidelines.md#shared-field-contract)",
    "CID frames intent and constraints",
    "SVO expresses that same action",
    "Every executable Directive is implemented by at least one RAO Step",
    "one Role, one atomic Action, and one measurable Outcome",
    "demonstration as evidence presentation rather than evidence creation",
    "successor Context",
    "unjoined-directive",
    "ungrounded-rao-step",
    "non-atomic-action",
    "unevidenced-outcome",
    "stale-continuity-join",
    "history-rewritten",
    "requirements.md",
    "design.md",
    "tasks.md",
    "demo.md",
    "$GITHUB_ROOT/agentic-canvas-os/todo/YYYY-MM/<context>.md",
  ]) {
    assert.match(
      artifactContinuity,
      new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `artifact continuity must include ${requirement}`,
    );
  }

  for (const requirement of [
    "PRD owns product intent, scope, criteria, and VCCs",
    "TAD consumes",
    "ADR records material decisions, alternatives, consequences, and relevant recovery",
    "bounded RAO Steps",
    "PRD-to-TAD coverage",
    "Directive-to-RAO coverage",
    "artifact continuity before baseline sign-off",
  ]) {
    assert.match(
      authoringGuideline,
      new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `authoring guideline must include ${requirement}`,
    );
  }

  assert.match(source, /CID-to-RAO artifact continuity/);
  assert.match(source, /shared \[CID\/RAO\/SVO grammar\]\(\.\/cid-guidelines\.md\)/);
  assert.match(source, /forbid parallel schemas or dispatch from an unjoined or stale lineage/);
  assert.ok(upstreamAdmissionLines.length - 1 < 600, "upstream-admission module must remain below 600 lines");
  assert.match(upstreamAdmission, /\nuniversal_scope: true\n/);
  assert.match(upstreamAdmission, /\nruntime_readiness_policy: "fail-closed"\n/);
  assert.ok(cloudCollaboration.startsWith("---\n"), "cloud-collaboration frontmatter must be present");
  assert.match(cloudCollaboration, /\nuniversal_scope: true\n/);
  assert.match(cloudCollaboration, /\nruntime_readiness_policy: "fail-closed"\n/);
  assert.ok(
    cloudCollaborationLines.length - 1 < 600,
    "cloud-collaboration module must remain below 600 lines",
  );
  for (const requirement of [
    "physical audit parent",
    "`conflictSetDigest`",
    "unrelated disjoint claims",
    "re-parent the same",
    "idempotent semantic transition",
    "Global-head movement alone is not a stale fence",
    "Dynamic Claim-Conflict Decision",
    "`idempotent-replay`",
    "`disjoint-rebase`",
    "`semantic-conflict`",
    "`unknown-observation`",
    "exact inventory parity are never substitutes for semantic",
  ]) {
    assert.match(
      cloudCollaboration,
      new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `cloud collaboration must include ${requirement}`,
    );
  }
  assert.ok(scopedLaneAdmission.startsWith("---\n"), "scoped-lane-admission frontmatter must be present");
  assert.match(scopedLaneAdmission, /\nschema: "agentic-scoped-lane-admission\/v1"\n/);
  assert.match(scopedLaneAdmission, /\ncollaboration_schema: "agentic-cloud-collaboration\/v1"\n/);
  assert.match(scopedLaneAdmission, /\nuniversal_scope: true\n/);
  assert.match(scopedLaneAdmission, /\nruntime_readiness_policy: "fail-closed"\n/);
  assert.ok(scopedLaneAdmissionLines.length - 1 < 600, "scoped-lane-admission module must remain below 600 lines");
  assert.match(source, /\.\/adlc-cloud-collaboration\.md/);
  assert.match(source, /\.\/adlc-scoped-lane-admission\.md/);
  assert.match(source, /\.\/adlc-repository-runtime-readiness\.md/);
  assert.ok(repositoryRuntimeReadiness.startsWith("---\n"), "repository runtime-readiness frontmatter must be present");
  assert.match(repositoryRuntimeReadiness, /\nuniversal_scope: true\n/);
  assert.match(repositoryRuntimeReadiness, /\nruntime_readiness_policy: "fail-closed"\n/);
  assert.ok(
    repositoryRuntimeReadinessLines.length - 1 < 600,
    "repository runtime-readiness module must remain below 600 lines",
  );

  for (const term of [
    "GitHub", "Cloudflare", "Agentic Graph", "Agentic Canvas OS", "huijoohwee", "airvio.co", "Builders Hub", "Avalanche", "Vercel",
  ]) {
    assert.doesNotMatch(
      repositoryRuntimeReadiness,
      new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
      `repository runtime-readiness module must not contain adapter term ${term}`,
    );
  }

  for (const requirement of [
    "/runtime-ready.check #runtime-ready #harness #vcc #foss #ttv @repository-root @local-harness @runtime-proof",
    "Removing network access and the external repository",
    "Source admitted",
    "Local harness ready",
    "Browser ready",
    "Integration ready",
    "Deployed verified",
    "one package manager",
    "Content-address every generated or downloaded input",
    "actual offline or degraded-network transition",
    "prompt, cached, completion, and total tokens",
    "package-manager-drift",
    "deployment-proof-unjoined",
    "The command exits zero only for the requested layer",
    "performs no mutation, network, model, paid, integration, release, or deployment action",
  ]) {
    assert.match(
      repositoryRuntimeReadiness,
      new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      `repository runtime-readiness module must include ${requirement}`,
    );
  }

  const pipeline = contractSlice(authoringGuideline,
    "## Platform-Specific Selection Criteria — Multi-Agent Reasoning Pipeline", "## Pain-Point-to-Feature Mapping",
    "shared reasoning pipeline");
  for (const requirement of [
    "constraints gate comparison first", "no worse on every criterion and strictly better on at least one",
    "Preserve incomparability", "The Evaluator, independent of the argument producers",
    "Argumentation never waives a failed hard constraint", "no useful new evidence means no further reasoning round",
    "Bound the whole pipeline by the task's time, token, and iteration limits", "continue disjoint work",
  ]) assert.ok(pipeline.includes(requirement), `shared reasoning pipeline must include ${requirement}`);
  assert.match(source, /reuse its bounded \*\*Constraints ↔ Argumentation ↔ Outranking\*\* pipeline/);
  assert.match(specificationChain, /reuse that decision for reversible authoring, re-grounding, and execution transitions/);
  assert.match(specificationChain, /Require a new decision only for an uncovered product choice, scope, authority, irreversible effect, or promotion/);
  assert.match(autonomousContinuation, /After the same approach fails twice/);
  assert.match(autonomousContinuation, /spawn only for independent useful work within declared capacity/);
  assert.match(rapidMvpSprint, /count first revenue only with actual payment evidence/);
  assert.match(rapidMvpSprint, /test-mode transactions never prove revenue or production settlement/);
}
