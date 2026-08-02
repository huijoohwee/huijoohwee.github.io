---
title: "Agentic SDLC Scoped Concurrent Lane Admission"
doc_type: "Guideline Module"
version: "1.0.0"
date: "2026-07-30"
lang: "en-US"
schema: "agentic-scoped-lane-admission/v1"
collaboration_schema: "agentic-cloud-collaboration/v1"
status: "spec-complete"
authority: "provider-neutral additive mutation-lane admission"
universal_scope: "true"
runtime_readiness_policy: "fail-closed"
mutation_policy: "preserve every pre-existing lane and mutate only one admitted candidate"
---

# Agentic SDLC Scoped Concurrent Lane Admission

## Purpose

Permit focused work to begin in one new isolated, registered, leased mutation
lane while the candidate operation leaves every pre-existing lane untouched. A
peer may advance independently only through separately proven current disjoint
authority. Repository-wide lifecycle attention caused only by attributed,
disjoint work does not block additive authoring admission. Canonical drift,
scope overlap, ambiguous ownership, stale evidence, or missing cross-device
authority always blocks.

This module is universal, neutral, implementation agnostic, and independently
loadable. It defines records, classifications, decisions, receipts, and
findings rather than a source-control product, branch convention, directory
layout, agent product, runtime, or hosting provider.

## Authority and Readiness Boundaries

| Concern | Authority | Boundary |
|---|---|---|
| Canonical source | Current protected immutable source revision | A local canonical projection must be clean and exact; it cannot grant a claim. |
| Cross-device exclusion | Accepted `agentic-cloud-collaboration/v1` claim record from a compare-and-swap transition on the protected remote ledger | A local lease, branch, lane, process, or review request is not cross-device authority. |
| Local exclusion | Current local lease joined to the accepted remote fence | Local leases prove exclusion only within one local coordination domain. |
| Existing authored state | Its attributed owner, immutable head, state digest, and recovery identity | Admission cannot stash, adopt, restore, clean, switch, overwrite, or delete it. |
| Additive authoring | Joined Admission and Preservation Receipts plus claim-and-local-lease revalidation at consumption | Authority covers one bounded candidate mutation batch in the declared write set. |
| Runtime, lifecycle, cleanup, integration, and delivery | Their own evaluators and receipt chains | No admission result promotes another readiness layer or grants a destructive operation. |

## Admission Inputs

### Request Record

| Field | Requirement |
|---|---|
| `repositoryId` | Stable source-owner identity independent of an execution path. |
| `workItemId` | Stable identity derived from an accepted task and its VCCs. |
| `actorId`, `deviceId`, `sessionId` | Authenticated bounded writer identity. |
| `candidateLaneId` | Unique intended lane identity. |
| `candidateTargetIdentity` | Normalized intended repository-approved target; request data cannot prove safety or vacancy. |
| `canonicalBaseRevision` | Current immutable protected source revision. |
| `semanticScope` | Non-empty focused capability or artifact scope. |
| `declaredWriteSet` | Sorted normalized path and semantic artifact identities. |
| `writeSetDigest` | Digest of the canonical encoding of `declaredWriteSet`. |
| `policyRevision`, `policyDigest` | Immutable evaluator policy identity. |
| `claimTransitionRequest` | Canonical transition input owned by `agentic-cloud-collaboration/v1`, including `claimId`, `laneRevision`, `leaseEpoch`, `expiresAt`, `idempotencyKey`, and expected predecessor `ledgerRevision`. |
| `planningEvaluationTime` | Explicit instant for deterministic read-only planning; it cannot establish remote claim validity or expiry. |
| `runtimeReadinessReceipt`, `lifecycleReadinessReceipt` | Optional independent typed receipts; absence is explicit and cannot be replaced by lane observations. |

Mutable labels, inferred scopes, wildcard-only scopes, timestamps, local paths,
and prose assertions cannot supply source, ownership, policy, or claim identity.

### Cloud Claim Records

This module does not define a second remote-claim schema. The candidate claim and
every remotely known claim are canonical `agentic-cloud-collaboration/v1`
records. The accepted transition supplies authoritative `evaluationTime`,
`fenceRevision`, and `ledgerRevision`; a caller-supplied or local clock cannot.
`declaredWriteSet` is the lane-admission view of the claim's exact normalized
`declaredWriteScope`, and both use the identical `writeSetDigest`.

Inventory the complete current non-terminal claim set before admission. Validate
its chain, state, expiry, lease epoch, idempotency key, fence, lane revision, and
write scope through the cloud-collaboration protocol. A remotely known claim
does not need a local checkout, registration, local lease, index, or working-byte
snapshot; local execution locations are projections rather than cloud identity.
After acceptance, validate the candidate claim separately as the request's
authority; do not classify it as conflicting with itself. Every other current
claim remains in the peer-claim overlap evaluation.

```text
remoteClaimRecordDigest = digest(canonicalEncode(cloud claim record))
remoteClaimInventoryDigest = digest(canonicalEncode(records sorted by claimId))
```

### Local Lane Snapshot

Inventory every locally registered or discovered lane that shares the local
coordination domain before any admission mutation:

| Field | Requirement |
|---|---|
| `laneId`, `registrationIdentity` | Stable lane identity and current registration record. |
| `actorId`, `deviceId`, `sessionId`, `workItemId` | Attributed owner and work identity. |
| `branchId`, `scopeId` | Local mutation-lane projection from the collaboration tuple. |
| `immutableHeadRevision` | Current committed source identity. |
| `indexDigest`, `workingBytesDigest`, `untrackedBytesDigest` | Content bindings for all pending state; empty state has an explicit digest. |
| `declaredWriteSet`, `writeSetDigest` | Normalized owned source and semantic scope. |
| `writeScopeAuthority` | Immutable plan, accepted claim, or owner declaration that authoritatively states the lane's future write scope. |
| `claimId`, `leaseEpoch`, `fenceRevision`, `ledgerRevision` | Exact cloud-claim join for a mutation-capable lane; an immutable terminal lane records explicit non-active state instead. |
| `localLeaseIdentity` | Same-coordination-domain exclusion evidence or an explicit absent/terminal value. |
| `recoveryIdentity` | Opaque immutable recovery handle or explicit clean-state identity. |
| `observedLifecycleState` | Current non-authoritative observation; it cannot derive `lifecycleReadiness`. |

Compute:

```text
laneStateDigest = digest(canonicalEncode(all local-lane fields))
localLaneInventoryDigest = digest(canonicalEncode(records sorted by laneId))
existingLaneInventoryDigest = digest(canonicalEncode(
  remoteClaimInventoryDigest + localLaneInventoryDigest
))
candidatePlanDigest = digest(canonicalEncode(
  request + both inventories + shared coordination state + target observation + policy
))
```

The digests bind state without exposing authored content. Missing fields remain
missing; an evaluator must not invent a clean digest, owner, lease, scope, or
recovery identity. The shared-state and target inputs to `candidatePlanDigest`
are the operation-derived records defined below.

### Shared Coordination-State Snapshot

A repository-owned observer emits an operation-derived typed snapshot before and
after provisioning. Caller declarations cannot supply or suppress these fields:

| Field | Requirement |
|---|---|
| `sharedConfigDigest`, `hooksDigest` | Complete shared configuration and hook identity. |
| `dependencyStateDigest` | Shared dependency, installation, and generated dependency state. |
| `refInventoryDigest` | Complete branch, tag, and coordination-ref identities and targets. |
| `registrationInventoryDigest` | Complete lane registration state, including prunable entries. |
| `leaseInventoryDigest` | Complete local lease and fence-projection state. |
| `recoveryInventoryDigest` | Complete recovery-object identities without exposing authored bytes. |
| `observerRevision`, `observationTime` | Immutable observer identity and explicit operation time. |

```text
sharedCoordinationStateDigest = digest(canonicalEncode(
  config + hooks + dependencies + refs + registrations + leases + recovery
))
```

The comparison excludes only the exact candidate registration, ref, and local
lease delta returned by the candidate operation. It never masks configuration,
hook, dependency, recovery, unknown, or candidate-caused changes. Independently
authorized disjoint peer deltas remain explicit and require causal proof.

### Operation-Derived Target Observation

Planning and every pre-create revalidation consume a typed target observation
produced by the repository-owned adapter. It binds the normalized target
identity, safety policy, parent identity, occupancy, registration and ref state,
canonical base, observer revision, observation time, and
`targetObservationDigest`. A request assertion cannot prove that a target is
safe or unoccupied.

Creation holds an exclusive local coordination guard, compares the current
target observation with the expected digest, and atomically creates the
candidate ref and registration or creates neither. Its typed
`candidateCreateRegisterResult` binds the operation id, expected and observed
target digests, exact base, ref, registration, exclusive-guard evidence,
operation-derived mutation log, status, and result digest. Only `created` or an
exact idempotent replay can support a Preservation Receipt.

Observed changed paths, current diff boundaries, immutable head contents, and
runtime activity describe present state only. They are not substitutes for an
active writer's authoritative declared future write scope. An active local lane
without `writeScopeAuthority` or an exact current claim join is `ambiguous` and
blocks admission. Immutable, review-ready, parked, or delivery evidence may be
content-bound read-only without opening, switching, restoring, or otherwise
touching its lane.

## Exhaustive Lane Classification

Classify every existing record into exactly one class:

| Class | Derivation | Admission effect |
|---|---|---|
| `canonical` | The single local canonical projection is clean, its source identity equals `canonicalBaseRevision`, and its registration is valid. | Required and preserved. Any dirt, mismatch, duplication, or missing projection blocks. |
| `overlapping` | A valid cloud claim or fully attributed local lane shares a semantic artifact, equal path, ancestor or descendant path, generated-output authority, scope, or target identity with the request. | Blocks until an accepted handoff, release, or replan produces disjoint current evidence. |
| `disjoint-attributed` | A cloud claim is current and scope-disjoint, or a local lane has complete attributable state, authoritative future write scope, the required claim/lease state, and recovery identity and is scope-disjoint. | Does not block additive admission; the candidate operation must not mutate it. |
| `ambiguous` | Evidence required for that subject kind is absent, inferred, conflicting, stale, prunable, or not normalizable; remote claims never require unavailable local-projection evidence. | Blocks before candidate creation or claim use. |

Path mergeability is not scope disjointness. Unknown wildcard meaning,
source-generated relationships, shared contracts, and common configuration
remain `ambiguous` until a deterministic scope owner resolves them.
Disjoint continuation is permitted only from attributed authority and current
evidence, never from inferred ownership or an absence of observed edits.

### Concurrent Peer Progress and Causality

Admission never requires global inactivity. Refresh and reclassify the latest
peer claim, lane, and shared coordination state at each protocol boundary. A
changed peer is `independently-advanced-disjoint` only when a current accepted
claim and fence, disjoint latest write scope, and operation-derived actor,
session, and mutation receipt causally account for its exact delta.

The candidate provisioner receives a restricted mutation capability covering
only its cloud transition, candidate target, candidate ref, candidate
registration, local lease, and fence projection; all pre-existing lanes and
other shared state are read-only. An unchanged peer remains preserved. An
independently authorized disjoint peer advance is recorded and reclassified, not
reported as `collateral-lane-mutation`. A delta causally attributable to the
candidate raises `collateral-lane-mutation`; unknown or conflicting causality
raises `admission-snapshot-stale` and blocks without a false collateral finding.

### Independent Peer Operation Receipt

Every `independently-advanced-disjoint` disposition requires one operation-derived
`agentic-independent-peer-operation-receipt/v1`:

| Field | Requirement |
|---|---|
| `schema`, `operationId` | Exact schema and unique immutable operation identity. |
| `actorId`, `deviceId`, `sessionId` | Authenticated peer-operation identity. |
| `claimId`, `leaseEpoch`, `fenceRevision`, `ledgerRevision` | Exact historical accepted claim authority for the operation. |
| `evaluationTime`, `expiresAt` | Remote authorization instant and claim expiry used for the mutation batch. |
| `collaborationReceiptDigest` | Operation-derived Collaboration Receipt that authorized the exact mutation batch. |
| `beforeLaneStateDigest`, `afterLaneStateDigest` | Exact peer-lane boundary states. |
| `beforeSharedCoordinationStateDigest`, `afterSharedCoordinationStateDigest` | Exact shared-state boundary records. |
| `mutationSetDigest` | Canonical digest of every operation-derived mutation. |
| `adapterRevision`, `evaluatorRevision` | Immutable recorder and verifier identities. |
| `operationTime` | Authoritative explicit operation instant. |
| `receiptDigest` | Digest of the canonical encoding of every preceding field. |

The evaluator validates fields in schema order, proves historical ledger
inclusion, and verifies that the claim was active and non-expired at the recorded
remote `evaluationTime`, that `evaluationTime <= operationTime < expiresAt`, and
that the joined `collaborationReceiptDigest` authorized the exact identity,
claim, epoch, fence, lane, and `mutationSetDigest`. It replays every later
same-claim or same-work-item authority transition in ledger order. The recorded
`operationTime` must be strictly earlier than the first later transition that
changes the applicable fence, expiry, state, lane, epoch, or owner, including
bind, heartbeat or renewal, review-ready, park, handoff, release, revoke, or an
accepted successor claim. If such a transition is accepted before or at
`operationTime`, the operation receipt must bind that successor authority;
otherwise the older-fence receipt is stale.

The evaluator then joins a valid successor chain to the latest current disjoint
claim without requiring the current fence to equal a valid historical operation
fence. A renewal accepted before or at `operationTime` invalidates the older
fence; a renewal accepted after `operationTime` may preserve attribution when
the historical authority was valid at the operation and the chain joins. A
claim expired at operation time remains invalid after renewal. A malformed,
stale, mismatched, expired-at-operation, transition-raced, or unjoined peer
receipt emits `admission-snapshot-stale` and blocks; prose attribution or global
inactivity cannot substitute.

## Report and Decision Contract

The deterministic evaluator emits `agentic-lane-admission-report/v1`. Every
phase carries:

- policy, request, canonical base, evaluation time, and candidate plan digests;
- normalized semantic scope, declared write set, and `writeSetDigest`;
- every cloud claim with its record digest and every local lane with its
  `laneStateDigest`, class, and classification reason;
- remote-claim, local-lane, and aggregate `existingLaneInventoryDigest` values
  plus zero-count entries for checked findings;
- target-observation, shared-coordination-state, and candidate-operation digests;
- every peer's latest classification and preservation disposition, including
  joined typed peer-operation receipt digests for independently authorized
  progress;
- exact allowed mutations and forbidden shared or destructive mutations;
- `authoringAdmission`, `runtimeReadiness`, and `lifecycleReadiness` as separate
  results with independent evidence, receipt digests, and reasons;
- `admissionRuntimeConformance` as a separate implementation-level result; and
- a `mode` discriminator with phase-specific evidence presence.

A report cannot require evidence from a later phase:

| Mode | Required phase evidence |
|---|---|
| `plan` | Read-only inventories and classifications. The accepted cloud claim, Admission Receipt, final ledger observation, candidate result, local lease, and Preservation Receipt are explicit absent values with reasons. |
| `check` | A `planned` result eligible for provisioning requires the accepted canonical cloud claim record, current claim/lane/epoch/expiry/ledger/fence identities, revalidated plan, and Admission Receipt. The final post-provisioning ledger observation, candidate result, local lease, and Preservation Receipt remain explicit absent. A blocked check records only evidence reached before its block. |
| `admit` | Requires the accepted claim, atomic candidate result, candidate local lease, final protected-ledger observation and digest, and joined Admission and Preservation Receipts. Its `authoringAdmission` is `admitted`, with a decision digest derived from that joined receipt chain. |

Each absent value is encoded canonically and contributes to the report digest;
omission, a placeholder digest, or evidence borrowed from another phase is
invalid.

`authoringAdmission` is `planned`, `admitted`, or `blocked`. `planned` is
read-only eligibility and grants no mutation. `admitted` requires the accepted
remote claim, atomic candidate create/register result, candidate local lease,
unchanged or independently advanced disjoint peer dispositions, zero
candidate-caused collateral mutation, final cloud authority, and a valid
Preservation Receipt.

`runtimeReadiness` is `ready`, `blocked`, or `unevaluated`.
`lifecycleReadiness` is `ready`, `attention-required`, `blocked`, or
`unevaluated`. Each non-`unevaluated` result must be copied from a current typed
receipt emitted by its independent evaluator and bound to the evaluated source,
policy, evidence, and evaluator revision. A missing optional receipt produces
`unevaluated`; a required, stale, malformed, or mismatched receipt produces
`blocked`. Lane observations cannot promote either result.

An `attention-required` lifecycle result caused only by preserved
`disjoint-attributed` lanes may coexist with `authoringAdmission: admitted`.
Occupied runtime resources may block runtime proof without blocking source-lane
admission. Destructive operations remain not ready unless a separate global
lifecycle evaluator proves them.

`admissionRuntimeConformance` is `ready`, `blocked`, or `unevaluated` and applies
only to the lane-admission evaluator and provisioner at one immutable policy and
implementation revision. It is independent of repository runtime readiness and
cannot promote any evaluated admission or lifecycle result.

## Deterministic Admission Protocol

1. Load immutable policy and typed request records; reject unknown or duplicate
   identities and non-canonical encodings.
2. Refresh protected canonical source and cloud ledger state, validate the
   complete `agentic-cloud-collaboration/v1` claim inventory, then observe the
   target and snapshot local lanes and shared coordination state read-only.
3. Normalize semantic scope, declared write set, claim records, registrations,
   target, and identities; compute every state, inventory, target, write-set, and
   plan digest.
4. Classify every cloud claim and local lane exhaustively and emit the read-only
   `mode: plan` report with later-phase evidence explicitly absent.
5. Block on canonical mismatch, an `overlapping` or `ambiguous` peer claim or
   local lane, duplicate candidate identity, unsafe or occupied candidate target,
   stale policy or evidence, invalid remote chain, or missing compare-and-swap
   capability.
6. Submit one cloud claim transition bound to the canonical base, work item,
   semantic scope, `writeSetDigest`, both inventory digests, and candidate plan
   digest. At most one same-parent candidate may win.
7. After the claim succeeds, refresh canonical, policy, the complete cloud claim
   chain, target observation, local lanes, and shared coordination state. Treat
   the exact accepted transition as the expected successor, not drift. Validate
   later ledger entries, the candidate claim, and every latest peer scope;
   independently authorized disjoint peer progress may continue, while
   canonical, policy, candidate-claim, overlap, target, or unattributed drift
   invalidates provisioning.
8. Compute a current `provisioningPlanDigest` and emit a `mode: check` report
   with an immutable Admission Receipt naming the accepted cloud claim record,
   predecessor plan, revalidated target observation, and exact additive
   provisioning envelope.
9. Under the exclusive guard, compare the target digest and atomically create
   and register only the candidate lane at the exact canonical base. Require a
   typed `candidateCreateRegisterResult`, then acquire its local lease and bind
   its fence projection. Do not mutate source bytes yet.
10. Re-observe the target, require exact parity with the atomic result, snapshot
    shared coordination state, and re-inventory every pre-existing local lane.
    Compare head, branch, registration, index, working bytes, untracked bytes,
    lease, fence, and recovery identity. Exclude only the exact candidate
    registration, ref, and lease delta; causally classify every other difference
    as unchanged, independently authorized disjoint peer progress,
    candidate-caused, or unknown, requiring a joined typed peer receipt for every
    independent advance and its historical authority-at-operation proof.
11. Perform a final protected-ledger refresh after local provisioning. From its
    operation-derived remote `evaluationTime`, require the candidate claim to be
    current, `active`, non-expired, at the exact accepted `fenceRevision` and
    claim `ledgerRevision`, and contained in the current
    `observedLedgerHeadRevision` chain; join each valid historical peer operation
    through any successor chain to the latest claim, reclassify every peer, and
    reject overlap, ambiguity, invalid causality, or candidate-authority drift.
12. Emit the Preservation Receipt only after steps 10 and 11 close with zero
    candidate-caused or unknown mutations and valid dispositions for every
    independently advanced disjoint peer.
13. Emit `mode: admit` and derive `authoringAdmission: admitted` only after the
    current cloud claim, atomic candidate result, local lease, final ledger
    refresh, and Preservation Receipt join.
14. Immediately before the admitted receipt is consumed for first source
    authoring, revalidate the candidate claim and local lease against remote
    `evaluationTime`, active/non-expired state, actor, device, session, lane,
    lease epoch, fence, and ledger chain, then authorize one bounded mutation
    batch. Repeat immediately before every later mutation batch and claim or
    local-lease renewal boundary. Expired, stale, mismatched, or unavailable
    authority preserves all local state and returns `blocked`; a changed renewal
    fence requires a joined successor receipt before authoring resumes.

The same claim-and-lease revalidation applies before later handoff, integration,
cleanup, or runtime action under that action's own policy. An admitted receipt
is never standing authority for a subsequent mutation batch.

Identical normalized inputs, operation-derived cloud result, and evaluation time
produce identical classifications, findings, decisions, and report digest.
Provisioning consumes the same evaluator as planning and repeats evaluation
immediately before mutation; an earlier green plan cannot survive
time-of-check/time-of-use drift.

## Allowed Mutation Envelope

Before the Preservation Receipt, the only mutations causally attributable to the
candidate attempt are:

- one protected remote claim transition;
- one atomic exclusive candidate registration and ref creation at the bound
  target and canonical base;
- one candidate local lease and fence projection; and
- deterministic rollback metadata for those candidate-only changes.

Fetching or refreshing authority state is permitted only when it does not alter
authored bytes in any lane. The candidate capability cannot alter shared
configuration, hooks, runtime processes, ports, dependencies, existing refs,
registrations, leases, recovery objects, reviews, integration state, or delivery
state. Independently authorized disjoint peer progress is recorded through its
own claim and causality receipt rather than attributed to the candidate.

Admission grants no source adoption, cleanup, stashing, restoration,
integration, publication, deployment, runtime execution, or review authority.
Publishing an authored immutable lane revision follows the protected
collaboration protocol and is outside this provisioning envelope.

## Receipts and Preservation Proof

The Admission Receipt binds the request, policy, canonical base, remote-claim
inventory, local-lane inventory, accepted cloud claim record, predecessor and
revalidated plan digests, planning and revalidated target observations, initial
and revalidated shared coordination-state snapshots, allowed mutation envelope,
evaluator, operation-derived evaluation time, and receipt digest. It authorizes
only the minimal candidate provisioning attempt.

The Preservation Receipt binds:

- the Admission Receipt and accepted remote fence;
- the typed `candidateCreateRegisterResult`, target observations, exact base,
  registration, ref, local lease, fence projection, and candidate state digest;
- before and after shared coordination-state records and digests covering
  configuration, hooks, dependencies, refs, registrations, leases, and recovery,
  with only the exact candidate registration/ref/lease delta excluded;
- each pre-existing lane's before and after `laneStateDigest`, latest
  classification and disposition, plus every joined
  `agentic-independent-peer-operation-receipt/v1`, `receiptDigest`, historical
  Collaboration Receipt, and latest valid successor-chain join;
- the restricted capability, complete candidate mutation log, causality
  decisions, and zero candidate-caused changes outside the allowed envelope;
- the final protected-ledger observation and digest, remote `evaluationTime`,
  current `observedLedgerHeadRevision`, candidate claim `ledgerRevision`, active
  non-expired candidate claim, exact `fenceRevision`, and latest peer-overlap
  classifications;
- zero mismatches, evaluator identity, evaluation time, and receipt digest.

A Preservation Receipt is invalid if it omits a discovered lane or shared state,
hides a dirty component, assumes global inactivity, uses mutable recovery state,
accepts unattributed drift, or records a mismatch as a warning.
Preservation proves admission isolation only; it is not a review, integration,
runtime, cleanup, release, or deployment receipt.

## Retry, Rollback, and Recovery

- Retry only with the same request, policy, plan digest, canonical base, accepted
  candidate claim, current valid ledger chain, and expected candidate-only
  result; later disjoint peer transitions require revalidation, otherwise replan.
- If provisioning fails before source mutation, remove only the candidate lane,
  registration, branch projection, and local lease when all are clean, exactly
  attributable to the Admission Receipt, and recoverable; release or park the
  remote claim through a new compare-and-swap transition.
- Never remove, rewrite, switch, stash, restore, clean, adopt, or release a
  pre-existing lane as rollback.
- If candidate state is dirty, published, mismatched, or uncertain, preserve it
  with its recovery identity, park its claim when possible, and emit
  `candidate-lane-orphaned`; do not manufacture a clean retry.
- If causality attributes a pre-existing change to the candidate, emit
  `collateral-lane-mutation`, stop authoring, preserve all state, and require
  owner-led recovery. Reclassify a proven independent disjoint peer advance;
  unknown causality emits `admission-snapshot-stale` and blocks.
- Remote unavailability preserves local authored state and returns `blocked`;
  local authority cannot substitute for a cross-device claim.

## Runtime Readiness Enforcement

A conforming implementation exposes one read-only planning evaluator and makes
the provisioning command consume that same evaluator before mutation. Typed
inputs produce typed reports, remote calls and retries are bounded, resources
are released promptly, and no model judgement determines identity, overlap,
digests, fencing, or verdicts. It reports its own implementation-level proof as
`admissionRuntimeConformance`; that proof is not the report's receipt-backed
repository `runtimeReadiness`.

Focused proof covers: clean exact canonical admission; attributed dirty,
parked, review-ready, and delivery lanes remaining unchanged absent independent
progress; ordered typed peer receipts and malformed/stale/unjoined rejection;
expired-at-operation/renewed-after and valid-operation/subsequent-renewal
matrices; overlap and ambiguity rejection; operation-derived target rejection
and atomic creation; shared-state comparison; final active non-expired refresh;
claim-and-lease revalidation before first and later mutation batches and renewal
boundaries; expired-authority local-state preservation; a two-device same-parent
race with exactly one winner; local-lease insufficiency; unchanged-lane
preservation; rollback/orphan recovery; separated readiness results;
deterministic replay; and no delivery side effects.

`admissionRuntimeConformance: ready` applies only to the evaluator and
provisioner at one immutable policy and implementation revision. It does not
make an individual admission green, promote repository runtime readiness,
resolve lifecycle attention, or authorize cleanup, review, integration, release,
publication, or deployment.

## Findings

| Finding Type | Severity |
|---|---|
| `canonical-base-drift` | `blocker` |
| `scope-admission-collision` | `blocker` |
| `unattributed-lane-ambiguity` | `blocker` |
| `admission-snapshot-stale` | `blocker` |
| `unsafe-candidate-target` | `blocker` |
| `local-only-cross-device-lease` | `blocker` |
| `collateral-lane-mutation` | `blocker` |
| `admission-runtime-conflation` | `major` |
| `candidate-lane-orphaned` | `major` |

Every finding names the repository, work item, candidate, semantic scope,
write-set digest, applicable peer claim or local lane and its state digest,
expected and observed canonical and fence revisions, evidence digest, and
deterministic remediation state. When a candidate target is rejected before a
lane exists, record the target identity and an explicit absent-lane state rather
than inventing a lane digest. Emit zero counts for checked finding types with no
occurrence.

## VCC

| Field | Requirement |
|---|---|
| Variables | Policy/implementation revisions, request, canonical source, cloud claims, local lanes, shared state, target observations, candidate and independent-peer operation receipts, causality, planning/remote times, mutation batches, leases, fences, readiness evidence, findings, and receipts. |
| Constraints | Exact clean canonical base, cloud-schema reuse, current classification, protected compare-and-swap authority, operation-derived target/shared-state proof, atomic candidate creation, typed peer-receipt joins, final active non-expired claim refresh, restricted candidate capability, claim-and-lease revalidation at every mutation/renewal boundary, no candidate-caused collateral mutation, no readiness promotion, and recoverable fail-closed rollback. |
| Checks | Schema/digest replay, cloud parity, peer-receipt field order, historical ledger/Collaboration Receipt join, expired-at-operation/renewed-after and valid-operation/subsequent-renewal matrices, malformed/stale/unjoined rejection, classification/overlap, target race, shared-state delta, final-ledger order/expiry/fence, causality, mutation/renewal claim-lease expiry, two-device race, preservation, recovery, readiness separation, neutrality, bounded calls, and no delivery side effects. |
