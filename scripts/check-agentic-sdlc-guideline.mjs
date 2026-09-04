import assert from "node:assert/strict";
import fs from "node:fs";

const guidelineUrl = new URL("../guidelines/agentic-sdlc-guidelines.md", import.meta.url);
const authoringGuidelineUrl = new URL("../guidelines/prd-tad-adr-guidelines.md", import.meta.url);
const productionReleaseLifecycleUrl = new URL(
  "../guidelines/agentic-sdlc-production-release-lifecycle.md",
  import.meta.url,
);
const conformanceRuntimeUrl = new URL("../guidelines/agentic-sdlc-conformance-runtime.md", import.meta.url);
const integrationOrderUrl = new URL("../guidelines/agentic-sdlc-integration-order.md", import.meta.url);
const specificationChainUrl = new URL("../guidelines/agentic-sdlc-specification-chain.md", import.meta.url);
const artifactContinuityUrl = new URL("../guidelines/agentic-sdlc-artifact-continuity.md", import.meta.url);
const upstreamAdmissionUrl = new URL("../guidelines/agentic-sdlc-upstream-dependency-admission.md", import.meta.url);
const cloudCollaborationUrl = new URL("../guidelines/agentic-sdlc-cloud-collaboration.md", import.meta.url);
const scopedLaneAdmissionUrl = new URL("../guidelines/agentic-sdlc-scoped-lane-admission.md", import.meta.url);
const repositoryRuntimeReadinessUrl = new URL("../guidelines/agentic-sdlc-repository-runtime-readiness.md", import.meta.url);
const antiPatternGuardsUrl = new URL("../guidelines/agentic-sdlc-anti-pattern-guards.md", import.meta.url);
const autonomousContinuationUrl = new URL("../guidelines/agentic-sdlc-autonomous-continuation.md", import.meta.url);
const rapidMvpSprintUrl = new URL("../guidelines/agentic-sdlc-rapid-mvp-sprint.md", import.meta.url);
const source = fs.readFileSync(guidelineUrl, "utf8");
const authoringGuideline = fs.readFileSync(authoringGuidelineUrl, "utf8");
const productionReleaseLifecycle = fs.readFileSync(productionReleaseLifecycleUrl, "utf8");
const conformanceRuntime = fs.readFileSync(conformanceRuntimeUrl, "utf8");
const integrationOrder = fs.readFileSync(integrationOrderUrl, "utf8");
const specificationChain = fs.readFileSync(specificationChainUrl, "utf8");
const artifactContinuity = fs.readFileSync(artifactContinuityUrl, "utf8");
const upstreamAdmission = fs.readFileSync(upstreamAdmissionUrl, "utf8");
const cloudCollaboration = fs.readFileSync(cloudCollaborationUrl, "utf8");
const scopedLaneAdmission = fs.readFileSync(scopedLaneAdmissionUrl, "utf8");
const repositoryRuntimeReadiness = fs.readFileSync(repositoryRuntimeReadinessUrl, "utf8");
const antiPatternGuards = fs.readFileSync(antiPatternGuardsUrl, "utf8");
const autonomousContinuation = fs.readFileSync(autonomousContinuationUrl, "utf8");
const rapidMvpSprint = fs.readFileSync(rapidMvpSprintUrl, "utf8");
const lines = source.split("\n");
const guidelineLogicalLineCount =
  source.length === 0 ? 0 : lines.length - Number(source.endsWith("\n"));
const authoringGuidelineLines = authoringGuideline.split("\n");
const productionReleaseLifecycleLines = productionReleaseLifecycle.split("\n");
const conformanceRuntimeLines = conformanceRuntime.split("\n");
const integrationOrderLines = integrationOrder.split("\n");
const specificationChainLines = specificationChain.split("\n");
const artifactContinuityLines = artifactContinuity.split("\n");
const upstreamAdmissionLines = upstreamAdmission.split("\n");
const cloudCollaborationLines = cloudCollaboration.split("\n");
const scopedLaneAdmissionLines = scopedLaneAdmission.split("\n");
const normalizedScopedLaneAdmission = scopedLaneAdmission.replace(/\s+/g, " ");
const repositoryRuntimeReadinessLines = repositoryRuntimeReadiness.split("\n");
const normalizedCloudCollaboration = cloudCollaboration.replace(/\s+/g, " ");
const normalizedProductionReleaseLifecycle = productionReleaseLifecycle.replace(/\s+/g, " ");

assert.ok(source.startsWith("---\n"), "guideline frontmatter must be present");
assert.match(source, /\nversion: "1\.24\.0"\n/);
assert.match(source, /minimum-time-and-resource \/ maximum-core-value chain/);
assert.match(source, /forbid over-investing in non-core periphery/i);
assert.match(source, /unused budget never authorizes it/);
assert.match(source, /\nuniversal_scope: "true"\n/);
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
assert.match(authoringGuideline, /\nversion: "2\.3\.0"\n/);
assert.match(authoringGuideline, /\.\/agentic-sdlc-artifact-continuity\.md/);
assert.equal(
  authoringGuideline.split("## Artifact Continuity Authoring Seam").length - 1,
  1,
  "authoring guideline must define the artifact continuity seam exactly once",
);
assert.ok(
  productionReleaseLifecycle.startsWith("---\n"),
  "production-release lifecycle frontmatter must be present",
);
assert.match(productionReleaseLifecycle, /\nversion: "1\.0\.0"\n/);
assert.match(productionReleaseLifecycle, /\nuniversal_scope: "true"\n/);
assert.match(productionReleaseLifecycle, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.ok(
  productionReleaseLifecycleLines.length - 1 < 600,
  "production-release lifecycle module must remain below 600 lines",
);
assert.match(source, /\.\/agentic-sdlc-production-release-lifecycle\.md/);
for (const [moduleSource, moduleLink] of [
  [antiPatternGuards, "agentic-sdlc-anti-pattern-guards.md"],
  [autonomousContinuation, "agentic-sdlc-autonomous-continuation.md"],
  [rapidMvpSprint, "agentic-sdlc-rapid-mvp-sprint.md"],
]) {
  assert.ok(moduleSource.startsWith("---\n"), `${moduleLink} frontmatter must be present`);
  assert.match(moduleSource, /\ndoc_type: "Guideline Module"\n/);
  assert.match(moduleSource, /\nuniversal_scope: "true"\n/);
  assert.match(moduleSource, /\nprovider_neutral: "true"\n/);
  assert.match(source, new RegExp(`\\.\\/${moduleLink.replace(".", "\\.")}`));
}
assert.match(autonomousContinuation, /derive, sign, store, and transport every required machine encoding internally/);
assert.match(autonomousContinuation, /one unresolved semantic decision/);
assert.match(rapidMvpSprint, /fewer named phases discharging the same obligations, never fewer obligations/);
assert.ok(conformanceRuntime.startsWith("---\n"), "conformance-runtime frontmatter must be present");
assert.match(conformanceRuntime, /\nversion: "1\.0\.0"\n/);
assert.match(conformanceRuntime, /\nlocal_rung: "spec-complete"\n/);
assert.match(conformanceRuntime, /\ndelivered_rung: "undocumented"\n/);
assert.match(conformanceRuntime, /\nuniversal_scope: "true"\n/);
assert.match(conformanceRuntime, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.match(conformanceRuntime, /\nlifecycle_status: "proposed"\n/);
assert.ok(
  conformanceRuntimeLines.length - 1 < 600,
  "conformance-runtime module must remain below 600 lines",
);
assert.match(integrationOrder, /\nversion: "1\.1\.0"\n/);
assert.match(integrationOrder, /\nuniversal_scope: "true"\n/);
assert.ok(integrationOrderLines.length - 1 < 600, "integration-order module must remain below 600 lines");
assert.ok(specificationChain.startsWith("---\n"), "specification-chain frontmatter must be present");
assert.match(specificationChain, /\nversion: "1\.0\.0"\n/);
assert.match(specificationChain, /\nuniversal_scope: "true"\n/);
assert.ok(specificationChainLines.length - 1 < 600, "specification-chain module must remain below 600 lines");
assert.ok(artifactContinuity.startsWith("---\n"), "artifact-continuity frontmatter must be present");
assert.match(artifactContinuity, /\nversion: "1\.0\.0"\n/);
assert.match(artifactContinuity, /\nschema: "agentic-artifact-continuity\/v1"\n/);
assert.match(artifactContinuity, /\nuniversal_scope: "true"\n/);
assert.match(artifactContinuity, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.ok(artifactContinuityLines.length - 1 < 600, "artifact-continuity module must remain below 600 lines");
assert.match(source, /\.\/agentic-sdlc-artifact-continuity\.md/);

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
  "CID is the policy plane",
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
  "PRD owns the product Context",
  "TAD consumes",
  "ADR records one grounded decision",
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
assert.match(source, /unjoined or stale CID-to-RAO lineage/);
assert.ok(upstreamAdmissionLines.length - 1 < 600, "upstream-admission module must remain below 600 lines");
assert.match(upstreamAdmission, /\nversion: "1\.0\.0"\n/);
assert.match(upstreamAdmission, /\nuniversal_scope: "true"\n/);
assert.match(upstreamAdmission, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.ok(cloudCollaboration.startsWith("---\n"), "cloud-collaboration frontmatter must be present");
assert.match(cloudCollaboration, /\nversion: "1\.2\.0"\n/);
assert.match(cloudCollaboration, /\nuniversal_scope: "true"\n/);
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
assert.match(scopedLaneAdmission, /\nversion: "1\.0\.0"\n/);
assert.match(scopedLaneAdmission, /\nschema: "agentic-scoped-lane-admission\/v1"\n/);
assert.match(scopedLaneAdmission, /\ncollaboration_schema: "agentic-cloud-collaboration\/v1"\n/);
assert.match(scopedLaneAdmission, /\nuniversal_scope: "true"\n/);
assert.match(scopedLaneAdmission, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.ok(scopedLaneAdmissionLines.length - 1 < 600, "scoped-lane-admission module must remain below 600 lines");
assert.match(source, /\.\/agentic-sdlc-cloud-collaboration\.md/);
assert.match(source, /\.\/agentic-sdlc-scoped-lane-admission\.md/);
assert.match(source, /\.\/agentic-sdlc-repository-runtime-readiness\.md/);
assert.ok(repositoryRuntimeReadiness.startsWith("---\n"), "repository runtime-readiness frontmatter must be present");
assert.match(repositoryRuntimeReadiness, /\nversion: "1\.0\.0"\n/);
assert.match(repositoryRuntimeReadiness, /\nuniversal_scope: "true"\n/);
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

const requiredSections = [
  "## Scope & Neutrality Contract",
  "## Boundary with the Authoring Set",
  "## Task Model",
  "### Collaboration Identity & Scoped Lane Admission",
  "### Orchestration-Reasoned Completion-Time Estimation",
  "## Human-in-the-Loop Gates",
  "## Global Release-Control Rule",
  "## Dependency-Ordered Integration",
  "## Atomic Lane Convergence",
  "## End-to-End Release Lifecycle Protocol",
  "## Runtime Readiness Enforcement",
  "## Execution Conformance Findings",
  "## Validation Checklist",
];

for (const heading of requiredSections) {
  assert.equal(
    source.split(heading).length - 1,
    1,
    `${heading} must occur exactly once`,
  );
}

assert.match(
  source,
  /^- `task-model` — task identity, minimum-resource core-value granularity, dependency graph, orchestration-reasoned completion-time estimation, and state vocabulary$/m,
  "module index must expose orchestration-reasoned completion-time estimation",
);
const taskModel = contractSlice(
  source,
  "## Task Model",
  "## Human-in-the-Loop Gates",
  "task model",
);
const completionEstimate = contractSlice(
  taskModel,
  "### Orchestration-Reasoned Completion-Time Estimation",
  "### State Vocabulary",
  "orchestration-reasoned completion-time estimation",
).trimEnd();
const completionEstimateLines = completionEstimate.split("\n");
assert.equal(
  completionEstimateLines.length,
  5,
  "completion-time estimation must remain one heading plus four directives",
);
assert.equal(
  completionEstimateLines.filter(line => line === "### Orchestration-Reasoned Completion-Time Estimation").length,
  1,
);
assert.equal(
  completionEstimateLines.filter(line => line.startsWith("- ")).length,
  4,
  "completion-time estimation must contain exactly four directive bullets",
);
for (const requirement of [
  "dependency-closed outcome work breakdown structure (WBS)",
  "every transitive predecessor",
  "duration range with its evidence or explicit assumption",
  "WBS critical path",
  "dependency and write-scope disjointness",
  "resource, evaluator, and coordination capacity",
  "overhead (orchestration, setup, and handoff), external waits, independent verification, expected rework, and explicit contingency",
  "completion range, confidence, critical path, capacity and concurrency evidence, assumptions, external dependencies, and evaluation time",
  "simplest auditable method proportionate to uncertainty and consequence",
  "no estimator, duration unit, or contingency percentage is universal",
  "evidence invalidates an assumption or changes the critical path",
  "retains the prior forecast and records the triggering evidence, range delta, confidence change, and reason",
  "`orchestration-estimate-unfounded`",
]) {
  assert.match(
    completionEstimate,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `completion-time estimation must include ${requirement}`,
  );
}
for (const term of ["GitHub", "Cloudflare", "Agentic Graph", "Agentic Canvas OS", "huijoohwee", "airvio.co", "provider", "vendor"]) {
  assert.doesNotMatch(
    completionEstimate,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `completion-time estimation must remain adapter-neutral: ${term}`,
  );
}
assert.match(
  source,
  /^\| Task model \| `orchestration-estimate-unfounded` \| `major` \|$/m,
  "finding vocabulary must classify orchestration-estimate-unfounded as a major Task model finding",
);
assert.match(
  source,
  /^- \[ \] \*\*Orchestration completion-time estimate grounded and current\*\*: the dependency-closed outcome WBS, critical path under evidenced concurrency and capacity, overhead, external waits, verification, rework, contingency, range, confidence, assumptions, and every evidence-triggered reforecast are recorded$/m,
  "pre-execution checklist must require a current grounded completion-time estimate",
);

const releaseStart = source.indexOf("## End-to-End Release Lifecycle Protocol");
const convergenceStart = source.indexOf("## Atomic Lane Convergence");
assert.ok(
  convergenceStart >= 0 && releaseStart > convergenceStart,
  "atomic lane convergence must precede the release seam",
);
const convergencePolicy = source.slice(convergenceStart, releaseStart);
for (const term of ["GitHub", "Cloudflare", "Agentic Graph", "Agentic Canvas OS", "huijoohwee", "origin/main"]) {
  assert.doesNotMatch(
    convergencePolicy,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `atomic lane convergence must not contain adapter term ${term}`,
  );
}
for (const requirement of [
  "one atomic top-level convergence controller",
  "replaceable internal phase adapters",
  "Stable Plan Identity",
  "observational noise excluded",
  "one exact Operator authorization",
  "require new authorization only when",
  "Retain or renew current authority",
  "successor creation plus task-bound authority continuation in one atomic transition",
  "coordination-only content revisions",
  "projection-only blocker",
  "minimal active set",
  "at most one mutation-capable projection",
  "`unresumable-run`",
  "`duplicate-release-controller`",
  "zero file diff alone does not prove that unique value-bearing history is disposable",
  "protected review and integration adapter",
  "Forbid unrecoverable discard",
  "without force",
  "prune only stale worktree-registration and remote-tracking metadata",
  "canonical local ref equals the canonical remote ref",
]) {
  assert.match(
    convergencePolicy,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `atomic lane convergence must include ${requirement}`,
  );
}
for (const requirement of [
  "Isolation is a safety boundary, not a retention policy",
  "Minimal active set",
  "not-applicable",
  "never from a preset count",
  "at most one mutation-capable workspace projection",
  "retire(claim)",
  "coordination state in its authoritative metadata or ledger projection",
  "archived and explicitly non-authoritative",
  "without blocking unrelated disjoint work",
]) {
  assert.match(
    convergencePolicy,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `atomic lane convergence must include ${requirement}`,
  );
}
const runtimeReadinessStart = source.indexOf("## Runtime Readiness Enforcement");
assert.ok(
  releaseStart >= 0 && runtimeReadinessStart > releaseStart,
  "the release seam must precede runtime-readiness enforcement",
);
const releaseSeam = source.slice(releaseStart, runtimeReadinessStart);
const neutralReleaseProtocol = productionReleaseLifecycle;
const findingsStart = source.indexOf("## Execution Conformance Findings");
assert.ok(
  runtimeReadinessStart >= 0 && findingsStart > runtimeReadinessStart,
  "runtime-readiness enforcement must precede its finding vocabulary",
);
const runtimeReadinessPolicy = source.slice(runtimeReadinessStart, findingsStart);
assert.match(
  runtimeReadinessPolicy,
  /\.\/agentic-sdlc-conformance-runtime\.md/,
  "runtime-readiness policy must name its behavioral conformance companion",
);

for (const term of [
  "GitHub",
  "Cloudflare",
  "Agentic Graph",
  "Agentic Canvas OS",
  "huijoohwee",
  "airvio.co",
  "origin/main",
  "turn:end",
  "localhost",
]) {
  assert.doesNotMatch(
    neutralReleaseProtocol,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `normative release protocol must not contain adapter term ${term}`,
  );
}

for (const requirement of [
  "Release Frontier",
  "Adapter port",
  "Source authority",
  "State reconciler",
  "Deployment Receipt",
  "State Reconciliation Receipt",
  "immutable deployment origin",
  "authoritative state readback",
  "returning-client cache or service-worker convergence",
  "readiness markers or equivalent identity evidence to be byte-identical",
  "cancel or retire the stale unapproved run",
  "Remove only clean, integrated, completion-proven task lanes",
  "No transport substitutes for another",
  "Byte-identical inputs and evaluation time produce byte-identical findings and receipt digests",
]) {
  assert.match(
    normalizedProductionReleaseLifecycle,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `production-release lifecycle module must include ${requirement}`,
  );
}

for (const requirement of [
  "protected integration as Integration Receipt authority only",
  "exact final Release Frontier",
  "State Reconciliation",
  "transport",
  "clean, integrated, completion-proven task lanes",
]) {
  assert.match(
    releaseSeam,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `release seam must include ${requirement}`,
  );
}

function assertOrderedPhrases(text, phrases, label) {
  let priorIndex = -1;
  for (const phrase of phrases) { const currentIndex = text.indexOf(phrase); assert.ok(currentIndex > priorIndex, `${label} must order ${phrase} after its predecessor`); priorIndex = currentIndex; }
}
function contractSlice(text, start, end, label) {
  const startIndex = text.indexOf(start); const endIndex = text.indexOf(end); assert.ok(startIndex >= 0 && endIndex > startIndex, `${label} boundaries must be present`); return text.slice(startIndex, endIndex);
}

for (const term of [
  "GitHub", "Cloudflare", "Agentic Graph", "Agentic Canvas OS", "huijoohwee", "airvio.co", "origin/main", "turn:end", "localhost",
]) {
  assert.doesNotMatch(scopedLaneAdmission, new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
}

const scopedAdmissionRequirements = [
  "candidate operation leaves every pre-existing lane untouched", "`agentic-lane-admission-report/v1`", "`canonical`", "`overlapping`",
  "`disjoint-attributed`", "`ambiguous`", "`declaredWriteSet`", "`writeSetDigest`", "`writeScopeAuthority`", "`laneStateDigest`",
  "`agentic-cloud-collaboration/v1`", "does not define a second remote-claim schema", "`declaredWriteScope`", "`claimId`", "`leaseEpoch`", "`expiresAt`", "`idempotencyKey`", "`ledgerRevision`",
  "caller-supplied or local clock cannot", "local execution locations are projections rather than cloud identity",
  "do not classify it as conflicting with itself", "Every other current claim remains in the peer-claim overlap evaluation",
  "Admission never requires global inactivity", "`independently-advanced-disjoint`", "`agentic-independent-peer-operation-receipt/v1`",
  "`schema`, `operationId`", "`actorId`, `deviceId`, `sessionId`", "`claimId`, `leaseEpoch`, `fenceRevision`, `ledgerRevision`",
  "`evaluationTime`, `expiresAt`", "`collaborationReceiptDigest`", "`beforeLaneStateDigest`, `afterLaneStateDigest`",
  "`beforeSharedCoordinationStateDigest`, `afterSharedCoordinationStateDigest`", "`mutationSetDigest`", "`adapterRevision`, `evaluatorRevision`", "`operationTime`", "`receiptDigest`",
  "malformed, stale, mismatched, expired-at-operation, transition-raced, or unjoined peer receipt emits `admission-snapshot-stale`",
  "proves historical ledger inclusion", "`evaluationTime <= operationTime < expiresAt`", "`operationTime` must be strictly earlier than the first later transition",
  "renewal accepted before or at `operationTime` invalidates the older fence", "renewal accepted after `operationTime` may preserve attribution",
  "joins a valid successor chain to the latest current disjoint claim", "without requiring the current fence to equal a valid historical operation fence",
  "claim expired at operation time remains invalid after renewal", "A report cannot require evidence from a later phase", "later-phase evidence explicitly absent", "`mode: check`", "`mode: admit`", "restricted mutation capability", "not reported as `collateral-lane-mutation`",
  "unknown or conflicting causality raises `admission-snapshot-stale`", "remoteClaimInventoryDigest", "localLaneInventoryDigest", "`existingLaneInventoryDigest`", "candidatePlanDigest", "sharedCoordinationStateDigest",
  "operation-derived typed snapshot before and after provisioning", "`sharedConfigDigest`, `hooksDigest`", "`dependencyStateDigest`", "`refInventoryDigest`",
  "`registrationInventoryDigest`", "`leaseInventoryDigest`", "`recoveryInventoryDigest`",
  "excludes only the exact candidate registration, ref, and local lease delta", "Operation-Derived Target Observation",
  "`targetObservationDigest`", "exclusive local coordination guard", "atomically creates the candidate ref and registration or creates neither",
  "`candidateCreateRegisterResult`", "Observed changed paths, current diff boundaries", "not substitutes for an active writer's authoritative declared future write scope",
  "Immutable, review-ready, parked, or delivery evidence may be content-bound read-only", "Disjoint continuation is permitted only from attributed authority", "compare-and-swap",
  "Local leases prove exclusion only within one local coordination domain", "Admission Receipt", "Preservation Receipt", "`authoringAdmission`", "`runtimeReadiness`", "`lifecycleReadiness`", "`admissionRuntimeConformance`",
  "Each non-`unevaluated` result must be copied from a current typed receipt", "A missing optional receipt produces `unevaluated`", "Lane observations cannot promote either result",
  "Treat the exact accepted transition as the expected successor, not drift", "independently authorized disjoint peer progress may continue", "`provisioningPlanDigest`", "final protected-ledger refresh after local provisioning",
  "operation-derived remote `evaluationTime`", "current, `active`, non-expired", "final protected-ledger observation and digest", "current `observedLedgerHeadRevision`",
  "candidate claim `ledgerRevision`", "latest peer-overlap classifications",
  "Immediately before the admitted receipt is consumed for first source authoring", "revalidate the candidate claim and local lease",
  "Repeat immediately before every later mutation batch and claim or local-lease renewal boundary", "authority preserves all local state and returns `blocked`",
  "changed renewal fence requires a joined successor receipt", "never standing authority for a subsequent mutation batch",
  "head, branch, registration, index, working bytes, untracked bytes, lease, fence, and recovery identity",
  "remove only the candidate lane", "same-parent race with exactly one winner", "`canonical-base-drift`", "`scope-admission-collision`", "`unattributed-lane-ambiguity`",
  "`admission-snapshot-stale`", "`unsafe-candidate-target`", "`local-only-cross-device-lease`", "`collateral-lane-mutation`", "`admission-runtime-conflation`", "`candidate-lane-orphaned`", "explicit absent-lane state",
];
for (const requirement of scopedAdmissionRequirements) {
  assert.ok(normalizedScopedLaneAdmission.includes(requirement), `scoped-lane-admission module must include ${requirement}`);
}

const scopedProtocol = contractSlice(normalizedScopedLaneAdmission, "## Deterministic Admission Protocol", "## Allowed Mutation Envelope", "scoped admission protocol");
assertOrderedPhrases(scopedProtocol, [
  "then observe the target and snapshot", "Submit one cloud claim transition",
  "chain, target observation, local lanes, and shared coordination state", "atomically create and register only the candidate lane",
  "final protected-ledger refresh after local provisioning", "Emit the Preservation Receipt only after",
  "derive `authoringAdmission: admitted` only after", "Immediately before the admitted receipt is consumed for first source authoring",
], "scoped admission protocol");

const peerReceiptContract = contractSlice(normalizedScopedLaneAdmission, "### Independent Peer Operation Receipt", "## Report and Decision Contract", "peer receipt");
assertOrderedPhrases(peerReceiptContract, [
  "`schema`, `operationId`", "`actorId`, `deviceId`, `sessionId`", "`claimId`, `leaseEpoch`, `fenceRevision`, `ledgerRevision`",
  "`evaluationTime`, `expiresAt`", "`collaborationReceiptDigest`", "`beforeLaneStateDigest`, `afterLaneStateDigest`",
  "`beforeSharedCoordinationStateDigest`, `afterSharedCoordinationStateDigest`", "`mutationSetDigest`",
  "`adapterRevision`, `evaluatorRevision`", "`operationTime`", "`receiptDigest`",
], "peer receipt fields");
for (const phrase of ["`operationTime` must be strictly earlier than the first later transition", "bind, heartbeat or renewal, review-ready, park, handoff, release, revoke, or an accepted successor claim", "renewal accepted before or at `operationTime` invalidates the older fence", "renewal accepted after `operationTime` may preserve attribution", "claim expired at operation time remains invalid after renewal"]) assert.ok(peerReceiptContract.includes(phrase), `peer receipt timing must include ${phrase}`);

const reportContract = contractSlice(normalizedScopedLaneAdmission, "## Report and Decision Contract", "## Deterministic Admission Protocol", "report contract");
assertOrderedPhrases(reportContract, ["A report cannot require evidence from a later phase", "| `plan` |", "| `check` |", "| `admit` |"], "report phases");
assert.doesNotMatch(reportContract.slice(0, reportContract.indexOf("A report cannot require evidence from a later phase")), /accepted canonical cloud claim record|final protected-ledger observation/);
const planMode = contractSlice(reportContract, "| `plan` |", "| `check` |", "plan mode"); const checkMode = contractSlice(reportContract, "| `check` |", "| `admit` |", "check mode"); const admitMode = contractSlice(reportContract, "| `admit` |", "Each absent value", "admit mode");
for (const [mode, text, phrases] of [["plan", planMode, ["accepted cloud claim, Admission Receipt, final ledger observation, candidate result, local lease, and Preservation Receipt are explicit absent"]], ["check", checkMode, ["requires the accepted canonical cloud claim record", "final post-provisioning ledger observation, candidate result, local lease, and Preservation Receipt remain explicit absent"]], ["admit", admitMode, ["accepted claim, atomic candidate result, candidate local lease, final protected-ledger observation and digest, and joined Admission and Preservation Receipts", "decision digest derived from that joined receipt chain"]]]) for (const phrase of phrases) assert.ok(text.includes(phrase), `${mode} report evidence must include ${phrase}`);

const preservationContract = contractSlice(normalizedScopedLaneAdmission, "The Preservation Receipt binds:", "## Retry, Rollback, and Recovery", "Preservation Receipt contract");
for (const proof of [
  "`candidateCreateRegisterResult`", "before and after shared coordination-state records and digests",
  "only the exact candidate registration/ref/lease delta excluded", "restricted capability",
  "final protected-ledger observation and digest", "current `observedLedgerHeadRevision`", "active non-expired candidate claim",
  "latest peer-overlap classifications", "historical Collaboration Receipt", "latest valid successor-chain join",
]) {
  assert.ok(preservationContract.includes(proof), `Preservation Receipt must bind ${proof}`);
}

for (const phrase of [
  "Collaboration identity complete when concurrent mutation applies", "current local leases are required only for local mutation-capable projections",
  "When additive concurrent authoring is requested, scoped lane admitted and preserved", "claim-plus-local-lease revalidation at first consumption",
  "joined Admission and Preservation Receipts", "`authoringAdmission: admitted`",
  "When scoped lane admission applies, admission preservation closed", "candidate leaves every existing lane untouched",
  "separately proven current disjoint authority and a joined typed peer-operation receipt",
  "repository-owned template", "current canonical base revision", "projected branch-scope segment",
]) assert.ok(source.includes(phrase), `main guideline must include ${phrase}`);

const coordinationSource = contractSlice(source, "### Collaboration Identity & Scoped Lane Admission", "### Canonical Branch-State Glossary", "root collaboration source");
for (const phrase of [
  "exactly four provider-neutral root operations", "`claim(scope)`, `continue(claim)`, `integrate(candidate)`, and `retire(claim)`", "typed digest-bound receipt",
  "cross-repository coordination task as a dependency-ordered group of immutable per-repository work units", "repository, branch, worktree, semantic scope, claim, epoch, fence, PR/review identity, named checks, and handoff evidence",
  "shared task identity or semantic label never creates a shared branch, worktree, lease, claim, fence, review identity, or handoff", "policy-unbounded but operationally bounded concurrent current authorities for disjoint normalized write sets", "each repository adapter declares and enforces its current resource, evaluator, and coordination capacity", "exactly one current write authority remains permitted per overlapping declared write set",
  "overlapping newcomer is a non-writing waiting successor", "monotonic compare-and-swap", "recovery from `dormant-preserved` is independent of the expired local lease", "local worktrees, leases, PRs, processes, and provider metadata remain replaceable projections",
  "physical audit head from the semantic claim-conflict fence", "claim admission never requires exact global-ledger parity or inactivity", "Re-evaluate a claim dynamically after every compare-and-swap loss or authoritative refresh", "Every outcome preserves existing lanes and bytes",
  "expiry, merge state, detached state, names, or canonical advancement only yield `dormant-preserved`", "authority-bearing aliases or compatibility operations", "conceptual inspiration only", "Forbid copying or adapting its code, prose, schemas, tests, examples, algorithms, or naming", "forbid dependencies, imports, network/runtime reliance, and external conformance authority",
]) assert.ok(coordinationSource.includes(phrase), `root collaboration source must include ${phrase}`);
assert.match(coordinationSource, /#### Reference implementation inspiration[^\n]*\n- \[yjs\/yjs\]\(https:\/\/github\.com\/yjs\/yjs\)/u);
assert.doesNotMatch(coordinationSource, /maximum (?:of )?8 concurrent|at most 8 concurrent/iu);

for (const term of [
  "GitHub",
  "Cloudflare",
  "Agentic Graph",
  "Agentic Canvas OS",
  "huijoohwee",
  "airvio.co",
  "origin/main",
  "turn:end",
  "localhost",
]) {
  assert.doesNotMatch(
    cloudCollaboration,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `cloud-collaboration module must not contain adapter term ${term}`,
  );
}

for (const requirement of [
  "protected remote ledger",
  "review requests and local execution locations are replaceable projections",
  "Actor ID, Device ID, Session ID, Worktree ID, Branch ID, Scope ID, Lease Epoch, and Fence Revision",
  "`repositoryId`",
  "`workItemId`",
  "`canonicalBaseRevision`",
  "`declaredWriteScope`",
  "`writeSetDigest`",
  "`claimId`",
  "`fenceRevision`",
  "`ledgerRevision`",
  "`expiresAt`",
  "`evaluationTime`",
  "`idempotencyKey`",
  "remotely addressable append-only hash chain",
  "complete active-writer inventory",
  "compare-and-swap",
  "at most one transition can be accepted",
  "Require an accepted `active` claim before any shared lane mutation",
  "Disjoint normalized write sets may proceed concurrently",
  "A review request is a projection of one ledger claim, not a lock",
  "They must not claim shared ownership",
  "Scheduling and queue concurrency create no lock authority",
  "Required protected checks independently verify the current ledger",
  "operation-derived digest-bound Collaboration Receipt joins admission evidence",
  "model-free commands for claim, renew, park, review-ready, delivery-authorize, handoff, release, inspect, and verify",
  "delivery-authorized` as a non-authoring state",
  "provider-specific branches, labels, commands, merge products, and hosting services are never universal lifecycle semantics",
  "`delivery-authority-unjoined`",
  "Byte-identical inputs and evaluation time produce identical findings",
  "Collaboration readiness is partial proof",
  "Forbid polling loops, per-device infrastructure, remote databases",
  "`parallel-scope-collision`",
  "`stale-collaboration-fence`",
  "`evidence-without-run`",
  "`runtime-readiness-unproven`",
]) {
  assert.match(
    normalizedCloudCollaboration,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `cloud-collaboration module must include ${requirement}`,
  );
}

for (const term of [
  "GitHub",
  "Cloudflare",
  "Agentic Graph",
  "Agentic Canvas OS",
  "huijoohwee",
  "origin/main",
  "localhost",
]) {
  assert.doesNotMatch(
    upstreamAdmission,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `upstream-admission module must not contain adapter term ${term}`,
  );
}

for (const requirement of [
  "Prevent upstream dependencies from stopping an entire plan",
  "never permission to adopt, rewrite, mirror, project, or integrate unprotected",
  "Compute the exact transitive consumer closure",
  "Continue ready units outside those closures",
  "finite deadline and valid fallback",
  "Generate a downstream projection only from the exact protected source revision",
  "deterministic evaluator with typed input and output",
  "`upstream-source-unadmitted`",
  "`upstream-plan-overblocked`",
]) {
  assert.match(
    upstreamAdmission,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `upstream-admission module must include ${requirement}`,
  );
}

for (const term of [
  "GitHub",
  "Cloudflare",
  "Agentic Graph",
  "Agentic Canvas OS",
  "huijoohwee",
  "airvio.co",
  "origin/main",
  "localhost",
]) {
  assert.doesNotMatch(
    runtimeReadinessPolicy,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `runtime-readiness policy must not contain adapter term ${term}`,
  );
}

for (const requirement of [
  "typed inputs and outputs",
  "bounded orchestration",
  "independent evaluation",
  "one immutable source revision",
  "complete dependency closure",
  "source validation, canonical runtime, protected integration, and deployed proof as separate claims",
  "repository-owned stage gates",
  "operation-derived evidence",
  "digest-bound receipts for admission, review, integration, runtime, candidate, authorization, deployment, and publication",
  "`npx`, `latest`, or dynamic resolution",
  "deterministic evaluator command that exits zero only when every required proof joins",
  "`runtime-readiness-unproven` at `blocker` severity",
]) {
  assert.match(
    runtimeReadinessPolicy,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `runtime-readiness policy must include ${requirement}`,
  );
}

for (const term of [
  "GitHub",
  "Cloudflare",
  "Agentic Graph",
  "Agentic Canvas OS",
  "huijoohwee",
  "airvio.co",
  "origin/main",
  "localhost",
]) {
  assert.doesNotMatch(
    conformanceRuntime,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `conformance-runtime module must not contain adapter term ${term}`,
  );
}

for (const requirement of [
  "operation-derived evidence",
  "Policy Identity",
  "`policyRevision`",
  "`policyDigest`",
  "admission -> review -> integration -> runtime -> candidate -> authorization -> deployment -> publication",
  "Digest-Bound Stage Receipt",
  "`predecessorReceiptDigest`",
  "Every join compares run, policy, evaluator, source, dependency closure, stage order, evidence digest, and predecessor receipt digest",
  "Full-Stage Fail-Closed Invariants",
  "Byte-identical inputs produce identical findings, verdicts, and receipt digests",
  "Partial-Scope Claim Boundary",
  "`enforcedStages`",
  "`unevaluatedStages`",
  "cannot claim end-to-end conformance",
  "`npx`, a mutable `latest` selector",
  "none may establish policy identity",
]) {
  assert.match(
    conformanceRuntime,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `conformance-runtime module must include ${requirement}`,
  );
}

for (const term of [
  "GitHub",
  "Cloudflare",
  "Agentic Graph",
  "Agentic Canvas OS",
  "huijoohwee",
  "airvio.co",
  "origin/main",
  "localhost",
]) {
  assert.doesNotMatch(
    integrationOrder,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `integration-order module must not contain adapter term ${term}`,
  );
}

for (const identity of [
  "Actor ID",
  "Device ID",
  "Session ID",
  "Worktree ID",
  "Branch ID",
  "Scope ID",
  "Lease Epoch",
  "Fence Revision",
]) {
  assert.match(source, new RegExp(identity), `collaboration identity must include ${identity}`);
}

for (const receipt of [
  "Overlap Preservation Receipt",
  "Overlap Disposition Receipt",
  "Integration Receipt",
  "Runtime Review Receipt",
  "Candidate Manifest",
  "Authorization Interaction Receipt",
  "Human Authorization Receipt",
  "Deployment Receipt",
  "State Reconciliation Receipt",
  "Live Verification Receipt",
  "Publication Receipt",
  "Rollback Receipt",
]) {
  assert.match(neutralReleaseProtocol, new RegExp(receipt), `receipt chain must include ${receipt}`);
}

assert.match(normalizedProductionReleaseLifecycle, /Preserve unrelated or overlapping work in its owning lane/);
assert.match(normalizedProductionReleaseLifecycle, /Review is not authorization/);
assert.match(normalizedProductionReleaseLifecycle, /Bind the interaction transport and any browser dependency as evidence/);
assert.match(normalizedProductionReleaseLifecycle, /Re-fetch all protected authorities and revalidate the current Runtime Review Receipt/);

for (const finding of [
  "`parallel-scope-collision`",
  "`stale-collaboration-fence`",
  "`canonical-base-drift`", "`scope-admission-collision`", "`unattributed-lane-ambiguity`",
  "`admission-snapshot-stale`", "`unsafe-candidate-target`", "`local-only-cross-device-lease`",
  "`collateral-lane-mutation`", "`admission-runtime-conflation`", "`candidate-lane-orphaned`",
  "`canonical-control-bypass`", "`redundant-active-projection`", "`terminal-lane-residual`", "`coordination-revision-churn`",
  "`dependency-closure-drift`",
  "`authorization-evidence-unjoined`",
  "`authorization-interaction-unjoined`",
  "`duplicate-release-controller`",
  "`production-authorization-drift`",
  "`post-authorization-rebuild`",
  "`state-reconciliation-unverified`",
  "`immutable-origin-unverified`",
  "`public-route-unverified`",
  "`client-cache-convergence-unverified`",
  "`publication-before-live-verification`",
  "`cleanup-ownership-unproven`",
  "`integration-order-cycle`",
  "`integration-before-dependency`",
  "`canonical-frontier-unverified`",
  "`duplicate-change-reintegrated`",
  "`stale-candidate-frontier`",
  "`runtime-readiness-unproven`",
  "`orchestration-estimate-unfounded`",
]) {
  assert.match(source, new RegExp(finding), `finding vocabulary must include ${finding}`);
}

const antiPatternSeam = contractSlice(
  source,
  "## Anti-Pattern Guards",
  "## Mantra Application",
  "anti-pattern guards",
);
assert.match(antiPatternSeam, /\.\/agentic-sdlc-anti-pattern-guards\.md/);
const antiPatternTable = antiPatternGuards
  .split("\n")
  .filter(line => line.startsWith("|"));
assert.deepEqual(antiPatternTable, [
  "| Prohibited pattern | Required correction |",
  "|---|---|",
  "| An Implementer marking its own task complete; a `done` state any role may set; a verdict derived from state the Evaluator cannot see | `verified` as the only success state, set only by an Evaluator that is a distinct mechanism, judging surfaced output only |",
  "| Tasks invented at task-authoring time to cover behaviour the specification never stated | Every task derived from a VCC; a behaviour gap returned to the authoring loop as a specification defect |",
  "| Picking among several equally-ready candidates by convenience, recency, or an unstated preference, with no recorded reason | Constraint satisfaction filters infeasible candidates first, outranking eliminates the dominated, and argumentation settles what remains — with the trail recorded |",
  "| Tasks dispatched with no token, iteration, wall-clock, or context bound; bounds raised mid-run to rescue a failing task | All four bounds stated before dispatch with a circuit-breaker; overruns trigger re-decomposition, not a larger bound |",
  "| Session-wide capability grants; an agent widening its own permissions mid-task; a standing approval for irreversible operations | Narrowest sufficient class granted per task; escalation via `blocked` and re-dispatch; an explicit Operator decision per irreversible occurrence |",
  "| Tasks that reach a mirror or delivery surface, or transmit project content outward, because it was convenient | Execution confined to the authoring lane; promotion is the Deploy Boundary's job and never a task |",
  "| Success asserted without a named check and a recorded result; a check named after the fact to match what happened | Named check stated before dispatch, run during the task, and its result surfaced in the Implementer's own output |",
  "| Bug fixes with no check that failed on the unfixed state; stated correctness properties with no executable property test | Failing-first witness per fix; one property test per stated property with its class named and shrinking enabled |",
  "| Long runs that cannot resume, discovering the context boundary by losing work at it | Run state persisted after every terminal transition; checkpoint before the context bound; resume from persisted state, not memory |",
  "| Operator decisions inferred, defaulted, simulated, or accepted through a non-interactive confirmation flag because the run would otherwise stall | Absent decisions produce `blocked`; the configured interaction adapter records the exact human challenge response before the authority adapter can authorize |",
  "| A green merge automatically deploying the current protected ref, one interaction transport treated as universal, or a release rebuilding after human approval | Protected integration emits no deployment authority; the configured interaction and authority adapters record one authenticated exact-candidate decision, and the controller deploys those reviewed bytes without rebuild |",
  "| Reusing approval after source, dependency, policy, target, artifact, or manifest drift because a mutable ref still has the same name | Any identity mismatch invalidates approval and restarts convergence, review, candidate binding, and authorization |",
  "| Two devices dispatching the same target concurrently, or handing off mutable local state between users | One target-and-candidate idempotency key, one fenced controller, and handoff only through immutable revisions and joined receipts |",
  "| Treating provider-specific branch names, commands, approval products, or hosting services as universal lifecycle semantics | A provider-neutral receipt protocol with concrete behavior isolated in replaceable reference implementation adapters |",
  "| The same effect split across successive recovery controllers, each demanding fresh authorization after creating the next projection-only blocker | One stable atomic convergence run reuses its bounded effect authorization, continues authority with successors, and stops as a controller defect if terminal projection cannot converge |",
  "| Asking an Operator to relay a machine token, digest, nonce, or successor command for an unchanged recorded decision | Derive and transport encodings internally; re-prompt only after material decision drift |",
  "| A task list with cycles, or a wave whose tasks write the same artifact concurrently | Acyclic dependency graph; wave membership checked for write disjointness before dispatch |",
  "| A completion date produced from activity guesses or unlimited parallelism, with overhead, waits, verification, rework, contingency, or assumptions hidden | The Orchestrator derives a dependency-closed outcome WBS and evidenced critical-path and capacity basis, records range, confidence, assumptions, and time components, and reforecasts on invalidating evidence |",
]);

function assertExactCanonicalReceiptContract(globalPolicy, integrationPolicy) {
  const directive = globalPolicy
    .split("\n")
    .find(line => line.startsWith("- Resolve protected-integration authorization"));
  assert.ok(directive, "global exact-canonical directive must exist");
  for (const clause of [
    "topology-bound exact-canonical Integration Receipt",
    "absent or still nonterminal duplicate post-integration canonical-source run",
    "reviewed or protected-refreshed candidate revision and tree",
    "declared integration method and exact parent list",
    "deferred automatic-integration requester, method, title, and body; actual merger identity and merge time",
    "collaboration claim, review transition, integration receipt, terminal retirement, ledger revision and digest, and operation identity",
    "newest terminal source run, suite, and check chain",
    "declared protected-refresh rollup and remote collaboration-check identity and projection",
    "canonical tree to equal the adapter-declared deterministic transformation of the exact protected base tree plus the admitted reviewed delta",
    "for squash, additionally require parents exactly `[protected base]`",
    "candidate tree to equal the canonical tree",
    "provider-neutral functional event class `review-record-closed` or `operation-dispatch`",
    "isolate every concrete wire-event mapping in a replaceable reference adapter outside this universal contract",
    "never infer association from inferred or non-authoritative review association metadata",
    "newest terminal failure for the same canonical source invalidates the receipt",
    "provider observation read-only and non-mutating",
    "synthesizing, updating, rolling up, cancelling, or otherwise mutating checks",
  ]) {
    assert.ok(directive.includes(clause), `global exact-canonical directive must include ${clause}`);
  }

  const evidenceSection = integrationPolicy.slice(
    integrationPolicy.indexOf("## Required Evidence"),
    integrationPolicy.indexOf("## Findings"),
  );
  const evidenceRows = new Map(
    evidenceSection
      .split("\n")
      .filter(line => /^\| [^|-].* \|$/.test(line))
      .map(line => line.slice(2, -2).split(" | ")),
  );
  const requiredRows = new Map([
    ["Exact-canonical receipt subject", "Repository adapter and policy revision; immutable closed review locator; candidate revision and tree; protected base revision and tree; canonical revision and tree"],
    ["Exact-canonical receipt topology", "Declared method and exact parent list; canonical tree equals the adapter-declared deterministic transformation of the exact protected base tree plus admitted reviewed delta; squash parents exactly `[protected base]` and candidate tree must equal the canonical tree"],
    ["Exact-canonical receipt authority", "Integration controller; deferred automatic-integration requester, method, title, and body; actual merger identity and merge time; collaboration claim, review transition, integration receipt, terminal retirement, ledger revision and digest, and operation identity"],
    ["Exact-canonical receipt checks", "Newest terminal source run, suite, and check chain for the exact reviewed or protected-refreshed candidate; declared protected-refresh rollup and remote collaboration-check identity and projection; fresh required-check context, evaluator application, and strictness policy"],
    ["Exact-canonical receipt association", "Functional event class `review-record-closed` or `operation-dispatch`; wire mapping isolated outside the universal contract; no inferred or non-authoritative association metadata; read-only non-mutating observation; no check mutation"],
  ]);
  for (const [evidence, identity] of requiredRows) {
    assert.equal(evidenceRows.get(evidence), identity, `${evidence} must retain its closed identity contract`);
  }
  for (const clause of [
    "stop and retry the same idempotent convergence step unless one topology-bound receipt already satisfies every closed subject, topology, authority, check-chain, association, and no-mutation predicate below",
    "Keep provider wire grammar outside this universal contract and inside a replaceable reference adapter",
    "never infer association through inferred or non-authoritative review association metadata",
    "never synthesize, update, roll up, cancel, or otherwise mutate a check",
  ]) {
    assert.ok(integrationPolicy.includes(clause), `integration-order module must include ${clause}`);
  }
  assertOrderedPhrases(integrationPolicy, [
    "newest terminal source run, suite, and check chain",
    "absent or still nonterminal duplicate post-integration run",
    "newest terminal failure",
  ], "exact-canonical evidence precedence");
}

assertExactCanonicalReceiptContract(source, integrationOrder);
for (const [from, to] of [
  ["absent or still nonterminal duplicate post-integration canonical-source run", "any duplicate post-integration canonical-source run"],
  ["canonical tree to equal the adapter-declared deterministic transformation of the exact protected base tree plus the admitted reviewed delta", "canonical tree may contain additional bytes"],
  ["provider-neutral functional event class `review-record-closed` or `operation-dispatch`", "any provider event"],
  ["deferred automatic-integration requester, method, title, and body; actual merger identity and merge time", "one unqualified integration actor"],
  ["declared protected-refresh rollup and remote collaboration-check identity and projection", "declared protected-refresh rollup"],
  ["never infer association from inferred or non-authoritative review association metadata", "infer association from review metadata"],
  ["newest terminal failure for the same canonical source invalidates the receipt", "newest terminal failure may be ignored"],
  ["provider observation read-only and non-mutating", "provider observation may mutate checks"],
]) {
  assert.throws(
    () => assertExactCanonicalReceiptContract(source.replaceAll(from, to), integrationOrder),
    { name: "AssertionError" },
    `global exact-canonical checker must reject weakened clause: ${from}`,
  );
}
for (const [from, to] of [
  ["parents exactly `[protected base]`", "one parent"],
  ["candidate tree must equal the canonical tree", "candidate tree may differ from the canonical tree"],
  ["canonical tree equals the adapter-declared deterministic transformation of the exact protected base tree plus admitted reviewed delta", "canonical tree may contain additional bytes"],
  ["newest terminal source run, suite, and check chain", "any successful source check"],
  ["no inferred or non-authoritative association metadata", "inferred association metadata allowed"],
  ["no check mutation", "check mutation allowed"],
  ["stop and retry the same idempotent convergence step unless one topology-bound receipt already satisfies every closed subject, topology, authority, check-chain, association, and no-mutation predicate below", "continue without a complete receipt"],
]) {
  assert.throws(
    () => assertExactCanonicalReceiptContract(source, integrationOrder.replaceAll(from, to)),
    { name: "AssertionError" },
    `exact-canonical checker must reject weakened clause: ${from}`,
  );
}

console.log(`agentic SDLC guideline contract ok (${guidelineLogicalLineCount} lines; authoring ${authoringGuidelineLines.length - 1} lines; artifact-continuity ${artifactContinuityLines.length - 1} lines; production-release ${productionReleaseLifecycleLines.length - 1} lines; conformance-runtime ${conformanceRuntimeLines.length - 1} lines; integration-order ${integrationOrderLines.length - 1} lines; cloud-collaboration ${cloudCollaborationLines.length - 1} lines; repository-runtime-readiness ${repositoryRuntimeReadinessLines.length - 1} lines; scoped-lane-admission ${scopedLaneAdmissionLines.length - 1} lines)`);
