import assert from "node:assert/strict";
import fs from "node:fs";

const guidelineUrl = new URL("../guidelines/agentic-sdlc-guidelines.md", import.meta.url);
const conformanceRuntimeUrl = new URL("../guidelines/agentic-sdlc-conformance-runtime.md", import.meta.url);
const integrationOrderUrl = new URL("../guidelines/agentic-sdlc-integration-order.md", import.meta.url);
const upstreamAdmissionUrl = new URL("../guidelines/agentic-sdlc-upstream-dependency-admission.md", import.meta.url);
const cloudCollaborationUrl = new URL("../guidelines/agentic-sdlc-cloud-collaboration.md", import.meta.url);
const scopedLaneAdmissionUrl = new URL("../guidelines/agentic-sdlc-scoped-lane-admission.md", import.meta.url);
const source = fs.readFileSync(guidelineUrl, "utf8");
const conformanceRuntime = fs.readFileSync(conformanceRuntimeUrl, "utf8");
const integrationOrder = fs.readFileSync(integrationOrderUrl, "utf8");
const upstreamAdmission = fs.readFileSync(upstreamAdmissionUrl, "utf8");
const cloudCollaboration = fs.readFileSync(cloudCollaborationUrl, "utf8");
const scopedLaneAdmission = fs.readFileSync(scopedLaneAdmissionUrl, "utf8");
const lines = source.split("\n");
const conformanceRuntimeLines = conformanceRuntime.split("\n");
const integrationOrderLines = integrationOrder.split("\n");
const upstreamAdmissionLines = upstreamAdmission.split("\n");
const cloudCollaborationLines = cloudCollaboration.split("\n");
const scopedLaneAdmissionLines = scopedLaneAdmission.split("\n");
const normalizedCloudCollaboration = cloudCollaboration.replace(/\s+/g, " ");
const normalizedScopedLaneAdmission = scopedLaneAdmission.replace(/\s+/g, " ");

assert.ok(source.startsWith("---\n"), "guideline frontmatter must be present");
assert.match(source, /\nversion: "1\.10\.0"\n/);
assert.match(source, /\nuniversal_scope: "true"\n/);
assert.match(source, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.match(source, /\nupstream_blocking_policy: "prevent-not-bypass"\n/);
assert.match(source, /\nlocal_rung: "spec-complete"\n/);
assert.match(source, /\ndelivered_rung: "undocumented"\n/);
assert.match(source, /\nlifecycle_status: "proposed"\n/);
assert.ok(lines.length - 1 < 600, "guideline must remain below 600 lines");
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
assert.match(integrationOrder, /\nversion: "1\.0\.0"\n/);
assert.match(integrationOrder, /\nuniversal_scope: "true"\n/);
assert.ok(integrationOrderLines.length - 1 < 600, "integration-order module must remain below 600 lines");
assert.ok(upstreamAdmissionLines.length - 1 < 600, "upstream-admission module must remain below 600 lines");
assert.match(upstreamAdmission, /\nversion: "1\.0\.0"\n/);
assert.match(upstreamAdmission, /\nuniversal_scope: "true"\n/);
assert.match(upstreamAdmission, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.ok(cloudCollaboration.startsWith("---\n"), "cloud-collaboration frontmatter must be present");
assert.match(cloudCollaboration, /\nversion: "1\.0\.0"\n/);
assert.match(cloudCollaboration, /\nuniversal_scope: "true"\n/);
assert.match(cloudCollaboration, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.ok(
  cloudCollaborationLines.length - 1 < 600,
  "cloud-collaboration module must remain below 600 lines",
);
assert.ok(scopedLaneAdmission.startsWith("---\n"), "scoped-lane-admission frontmatter must be present");
assert.match(scopedLaneAdmission, /\nversion: "1\.0\.0"\n/);
assert.match(scopedLaneAdmission, /\nschema: "agentic-scoped-lane-admission\/v1"\n/);
assert.match(scopedLaneAdmission, /\ncollaboration_schema: "agentic-cloud-collaboration\/v1"\n/);
assert.match(scopedLaneAdmission, /\nuniversal_scope: "true"\n/);
assert.match(scopedLaneAdmission, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.ok(
  scopedLaneAdmissionLines.length - 1 < 600,
  "scoped-lane-admission module must remain below 600 lines",
);
assert.match(source, /\.\/agentic-sdlc-cloud-collaboration\.md/);
assert.match(source, /\.\/agentic-sdlc-scoped-lane-admission\.md/);

const requiredSections = [
  "## Scope & Neutrality Contract",
  "## Boundary with the Authoring Set",
  "## Task Model",
  "### Collaboration Identity & Scoped Lane Admission",
  "## Human-in-the-Loop Gates",
  "## Dependency-Ordered Integration",
  "## End-to-End Release Lifecycle Protocol",
  "### Receipt Chain",
  "### Collaboration and Controller Concurrency",
  "### Lifecycle Stages",
  "### Drift and Replay Invalidation",
  "### Reference Implementation Boundary",
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

const releaseStart = source.indexOf("## End-to-End Release Lifecycle Protocol");
const referenceStart = source.indexOf("### Reference Implementation Boundary");
assert.ok(releaseStart >= 0 && referenceStart > releaseStart, "reference adapters must follow the neutral protocol");
const neutralReleaseProtocol = source.slice(releaseStart, referenceStart);
const runtimeReadinessStart = source.indexOf("## Runtime Readiness Enforcement");
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
  "Knowgrph",
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

for (const term of [
  "GitHub",
  "Cloudflare",
  "Knowgrph",
  "Agentic Canvas OS",
  "huijoohwee",
  "airvio.co",
  "origin/main",
  "turn:end",
  "localhost",
]) {
  assert.doesNotMatch(
    scopedLaneAdmission,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `scoped-lane-admission module must not contain adapter term ${term}`,
  );
}

for (const requirement of [
  "candidate operation leaves every pre-existing lane untouched",
  "`agentic-lane-admission-report/v1`",
  "`canonical`",
  "`overlapping`",
  "`disjoint-attributed`",
  "`ambiguous`",
  "`declaredWriteSet`",
  "`writeSetDigest`",
  "`writeScopeAuthority`",
  "`laneStateDigest`",
  "`agentic-cloud-collaboration/v1`",
  "does not define a second remote-claim schema",
  "`declaredWriteScope`",
  "`claimId`",
  "`leaseEpoch`",
  "`expiresAt`",
  "`idempotencyKey`",
  "`ledgerRevision`",
  "caller-supplied or local clock cannot",
  "local execution locations are projections rather than cloud identity",
  "do not classify it as conflicting with itself",
  "Every other current claim remains in the peer-claim overlap evaluation",
  "Admission never requires global inactivity",
  "`independently-advanced-disjoint`",
  "`agentic-independent-peer-operation-receipt/v1`",
  "`schema`, `operationId`", "`actorId`, `deviceId`, `sessionId`",
  "`claimId`, `leaseEpoch`, `fenceRevision`, `ledgerRevision`", "`evaluationTime`, `expiresAt`",
  "`collaborationReceiptDigest`",
  "`beforeLaneStateDigest`, `afterLaneStateDigest`",
  "`beforeSharedCoordinationStateDigest`, `afterSharedCoordinationStateDigest`",
  "`mutationSetDigest`", "`adapterRevision`, `evaluatorRevision`",
  "`operationTime`", "`receiptDigest`",
  "malformed, stale, mismatched, expired-at-operation, or unjoined peer receipt emits `admission-snapshot-stale`",
  "proves historical ledger inclusion", "`evaluationTime <= operationTime < expiresAt`",
  "joins a valid successor chain to the latest current disjoint claim", "not require its current fence to equal the historical operation fence",
  "claim expired at operation time remains invalid after renewal", "valid operation remains attributable after a subsequent renewal",
  "restricted mutation capability",
  "not reported as `collateral-lane-mutation`",
  "unknown or conflicting causality raises `admission-snapshot-stale`",
  "remoteClaimInventoryDigest",
  "localLaneInventoryDigest",
  "`existingLaneInventoryDigest`",
  "candidatePlanDigest",
  "sharedCoordinationStateDigest",
  "operation-derived typed snapshot before and after provisioning",
  "`sharedConfigDigest`, `hooksDigest`",
  "`dependencyStateDigest`",
  "`refInventoryDigest`",
  "`registrationInventoryDigest`",
  "`leaseInventoryDigest`",
  "`recoveryInventoryDigest`",
  "excludes only the exact candidate registration, ref, and local lease delta",
  "Operation-Derived Target Observation",
  "`targetObservationDigest`",
  "exclusive local coordination guard",
  "atomically creates the candidate ref and registration or creates neither",
  "`candidateCreateRegisterResult`",
  "Observed changed paths, current diff boundaries",
  "not substitutes for an active writer's authoritative declared future write scope",
  "Immutable, review-ready, parked, or delivery evidence may be content-bound read-only",
  "Disjoint continuation is permitted only from attributed authority",
  "compare-and-swap",
  "Local leases prove exclusion only within one local coordination domain",
  "Admission Receipt",
  "Preservation Receipt",
  "`authoringAdmission`",
  "`runtimeReadiness`",
  "`lifecycleReadiness`",
  "`admissionRuntimeConformance`",
  "Each non-`unevaluated` result must be copied from a current typed receipt",
  "A missing optional receipt produces `unevaluated`",
  "Lane observations cannot promote either result",
  "Treat the exact accepted transition as the expected successor, not drift",
  "independently authorized disjoint peer progress may continue",
  "`provisioningPlanDigest`",
  "final protected-ledger refresh after local provisioning",
  "operation-derived remote `evaluationTime`",
  "current, `active`, non-expired",
  "final protected-ledger observation and digest",
  "current `observedLedgerHeadRevision`",
  "candidate claim `ledgerRevision`",
  "latest peer-overlap classifications",
  "Immediately before the admitted receipt is consumed for first source authoring", "revalidate the candidate claim and local lease",
  "Repeat immediately before every later mutation batch and claim or local-lease renewal boundary",
  "authority preserves all local state and returns `blocked`",
  "changed renewal fence requires a joined successor receipt",
  "never standing authority for a subsequent mutation batch",
  "head, branch, registration, index, working bytes, untracked bytes, lease, fence, and recovery identity",
  "remove only the candidate lane",
  "same-parent race with exactly one winner",
  "`canonical-base-drift`",
  "`scope-admission-collision`",
  "`unattributed-lane-ambiguity`",
  "`admission-snapshot-stale`",
  "`unsafe-candidate-target`",
  "`local-only-cross-device-lease`",
  "`collateral-lane-mutation`",
  "`admission-runtime-conflation`",
  "`candidate-lane-orphaned`",
  "explicit absent-lane state",
]) {
  assert.match(
    normalizedScopedLaneAdmission,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `scoped-lane-admission module must include ${requirement}`,
  );
}

const scopedProtocolStart = normalizedScopedLaneAdmission.indexOf("## Deterministic Admission Protocol");
const scopedProtocolEnd = normalizedScopedLaneAdmission.indexOf("## Allowed Mutation Envelope");
assert.ok(
  scopedProtocolStart >= 0 && scopedProtocolEnd > scopedProtocolStart,
  "scoped admission protocol boundaries must be present",
);
const scopedProtocol = normalizedScopedLaneAdmission.slice(scopedProtocolStart, scopedProtocolEnd);
function assertOrderedPhrases(text, phrases, label) {
  let priorIndex = -1;
  for (const phrase of phrases) {
    const currentIndex = text.indexOf(phrase);
    assert.ok(currentIndex > priorIndex, `${label} must order ${phrase} after its predecessor`);
    priorIndex = currentIndex;
  }
}
assertOrderedPhrases(scopedProtocol, [
  "then observe the target and snapshot", "Submit one cloud claim transition",
  "chain, target observation, local lanes, and shared coordination state", "atomically create and register only the candidate lane",
  "final protected-ledger refresh after local provisioning", "Emit the Preservation Receipt only after",
  "Derive `authoringAdmission: admitted` only after", "Immediately before the admitted receipt is consumed for first source authoring",
], "scoped admission protocol");

const peerReceiptStart = normalizedScopedLaneAdmission.indexOf("### Independent Peer Operation Receipt");
const peerReceiptEnd = normalizedScopedLaneAdmission.indexOf("## Report and Decision Contract");
assert.ok(peerReceiptStart >= 0 && peerReceiptEnd > peerReceiptStart, "peer receipt boundaries must be present");
const peerReceiptContract = normalizedScopedLaneAdmission.slice(peerReceiptStart, peerReceiptEnd);
assertOrderedPhrases(peerReceiptContract, [
  "`schema`, `operationId`", "`actorId`, `deviceId`, `sessionId`",
  "`claimId`, `leaseEpoch`, `fenceRevision`, `ledgerRevision`",
  "`evaluationTime`, `expiresAt`", "`collaborationReceiptDigest`",
  "`beforeLaneStateDigest`, `afterLaneStateDigest`",
  "`beforeSharedCoordinationStateDigest`, `afterSharedCoordinationStateDigest`",
  "`mutationSetDigest`", "`adapterRevision`, `evaluatorRevision`",
  "`operationTime`", "`receiptDigest`",
], "peer receipt fields");

const preservationStart = normalizedScopedLaneAdmission.indexOf("The Preservation Receipt binds:");
const preservationEnd = normalizedScopedLaneAdmission.indexOf("## Retry, Rollback, and Recovery");
assert.ok(
  preservationStart >= 0 && preservationEnd > preservationStart,
  "Preservation Receipt contract boundaries must be present",
);
const preservationContract = normalizedScopedLaneAdmission.slice(preservationStart, preservationEnd);
for (const proof of [
  "`candidateCreateRegisterResult`", "before and after shared coordination-state records and digests",
  "only the exact candidate registration/ref/lease delta excluded", "restricted capability",
  "final protected-ledger observation and digest", "current `observedLedgerHeadRevision`",
  "active non-expired candidate claim", "latest peer-overlap classifications", "historical Collaboration Receipt", "latest valid successor-chain join",
]) {
  assert.match(
    preservationContract,
    new RegExp(proof.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `Preservation Receipt must bind ${proof}`,
  );
}

for (const phrase of [
  "Collaboration identity complete when concurrent mutation applies", "current local leases are required only for local mutation-capable projections",
  "When additive concurrent authoring is requested, scoped lane admitted and preserved", "claim-plus-local-lease revalidation at first consumption",
  "joined Admission and Preservation Receipts", "`authoringAdmission: admitted`",
  "When scoped lane admission applies, admission preservation closed", "candidate leaves every existing lane untouched",
  "separately proven current disjoint authority and a joined typed peer-operation receipt",
]) {
  assert.ok(source.includes(phrase), `main guideline must include ${phrase}`);
}

for (const term of [
  "GitHub",
  "Cloudflare",
  "Knowgrph",
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
  "model-free commands for claim, renew, park, review-ready, handoff, release, inspect, and verify",
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
  "Knowgrph",
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
  "Knowgrph",
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
  "Knowgrph",
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
  "Knowgrph",
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
  "Overlap Preservation & Disposition Receipts",
  "Integration Receipt",
  "Runtime Review Receipt",
  "Candidate Manifest",
  "Authorization Interaction Receipt",
  "Human Authorization Receipt",
  "Live Verification Receipt",
  "Publication Receipt",
]) {
  assert.match(neutralReleaseProtocol, new RegExp(receipt), `receipt chain must include ${receipt}`);
}

assert.match(neutralReleaseProtocol, /overlapping work retained in its owning lane or an immutable recovery object/);
assert.match(neutralReleaseProtocol, /restore disjoint work only when its state and recovery identity still match exactly/);
assert.match(neutralReleaseProtocol, /Preservation is not review, integration, or authorization/);
assert.match(neutralReleaseProtocol, /interaction and authority adapters are independent modules/);
assert.match(source.slice(referenceStart), /terminal-first and browser-independent/);
assert.match(source.slice(referenceStart), /without launching or requiring a browser/);
assert.match(source.slice(referenceStart), /The release is verified and awaiting fresh human authorization\./);
assert.match(source.slice(referenceStart), /localhost: `\{\{localhost_review_url\}\}`/);
assert.match(source.slice(referenceStart), /`authorize \{\{candidate_digest\}\}`/);
assert.match(neutralReleaseProtocol, /runtime-readiness gate revalidates the current review receipt and candidate/);
assert.match(source.slice(referenceStart), /emit this template only while the exact source, dependency closure, protected checks, probes, review receipt, candidate, and release run remain runtime-ready/);

for (const finding of [
  "`parallel-scope-collision`",
  "`stale-collaboration-fence`",
  "`canonical-base-drift`",
  "`scope-admission-collision`",
  "`unattributed-lane-ambiguity`",
  "`admission-snapshot-stale`",
  "`unsafe-candidate-target`",
  "`local-only-cross-device-lease`",
  "`collateral-lane-mutation`",
  "`admission-runtime-conflation`",
  "`candidate-lane-orphaned`",
  "`dependency-closure-drift`",
  "`authorization-evidence-unjoined`",
  "`authorization-interaction-unjoined`",
  "`duplicate-release-controller`",
  "`production-authorization-drift`",
  "`post-authorization-rebuild`",
  "`integration-order-cycle`",
  "`integration-before-dependency`",
  "`canonical-frontier-unverified`",
  "`duplicate-change-reintegrated`",
  "`stale-candidate-frontier`",
  "`runtime-readiness-unproven`",
]) {
  assert.match(source, new RegExp(finding), `finding vocabulary must include ${finding}`);
}

for (const phrase of [
  "Integration Frontier",
  "already-integrated",
  "superseded",
  "exact-canonical checks",
  "runtime-convergence evidence",
  "Seal the Release Frontier",
]) {
  assert.match(integrationOrder, new RegExp(phrase), `integration-order module must include ${phrase}`);
}

console.log(
  `agentic SDLC guideline contract ok (${lines.length - 1} lines; conformance-runtime ${conformanceRuntimeLines.length - 1} lines; integration-order ${integrationOrderLines.length - 1} lines; cloud-collaboration ${cloudCollaborationLines.length - 1} lines; scoped-lane-admission ${scopedLaneAdmissionLines.length - 1} lines)`,
);
