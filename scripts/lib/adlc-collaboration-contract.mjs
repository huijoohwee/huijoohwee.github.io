import assert from "node:assert/strict";
import { assertOrderedPhrases, contractSlice } from "./adlc-contract-input.mjs";

export function checkCollaborationContract({
  source, upstreamAdmission, cloudCollaboration, scopedLaneAdmission, normalizedScopedLaneAdmission, normalizedCloudCollaboration
}) {
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
    "shared task identity or semantic label never creates a shared branch, worktree, lease, claim, fence, review identity, or handoff", "policy-unbounded concurrency for disjoint normalized write sets within declared", "within declared resource, evaluator, and coordination capacity", "exactly one current write authority owns an overlapping write set",
    "overlapping newcomer waits without writing", "monotonic compare-and-swap", "recovery from `dormant-preserved` is independent of the expired local lease", "worktrees, leases, PRs, processes, and provider metadata are replaceable projections",
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

}
