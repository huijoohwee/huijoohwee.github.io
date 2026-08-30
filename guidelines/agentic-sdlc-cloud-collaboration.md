---
title: "Agentic SDLC Cloud-Authoritative Collaboration"
doc_type: "Guideline Module"
version: "1.2.0"
date: "2026-08-28"
lang: "en-US"
schema: "agentic-cloud-collaboration/v1"
status: "spec-complete"
authority: "provider-neutral protected remote collaboration ledger"
universal_scope: "true"
runtime_readiness_policy: "fail-closed"
mutation_policy: "remote claim before shared mutation"
---

# Agentic SDLC Cloud-Authoritative Collaboration

## Purpose

Enable safe concurrent work from browsers, mobile devices, cloud agents, and
intermittently connected local tools without a shared machine, database, daemon,
or always-on coordinator. One protected remote ledger serializes append order,
while conflict-set validation lets semantically independent ownership
transitions progress without a false global lock. Immutable lane revisions
carry authored work; review requests and local execution locations are
replaceable projections.

This module is provider-neutral and model-free. It defines data, state
transitions, evidence, and findings rather than a particular source-control
product, hosting service, command shell, or agent implementation.

## Authority Layers

| Layer | Authority | Never authority |
|---|---|---|
| Collaboration | Current accepted revision of the protected remote ledger | Local files, process state, chat history, review labels, or branch names |
| Authored work | Immutable lane revision named by an active ledger entry | Uncommitted bytes or a mutable checkout |
| Integration | Protected canonical source revision plus its Integration Receipt | A claim, passing local test, or review request |
| Runtime readiness | Deterministic evaluator verdict over current joined evidence | Source existence, delivery state, or implementer assertion |

The ledger grants only collaboration ownership. It cannot grant review,
integration, release, publication, or deployment authority.

## Cloud Collaboration Identity

The existing collaboration tuple remains Actor ID, Device ID, Session ID,
Worktree ID, Branch ID, Scope ID, Lease Epoch, and Fence Revision. Local
execution state projects that tuple; one protected remote claim adds:

| Field | Requirement |
|---|---|
| `actorId` | Stable authenticated actor identity. |
| `deviceId` | Stable identity for the initiating device or cloud execution surface. |
| `sessionId` | Unique bounded execution session. |
| `repositoryId` | Stable repository identity independent of a checkout path. |
| `workItemId` | Stable work-item identity derived from an accepted task list. |
| `claimId` | Content-derived identity for this bounded ownership claim. |
| `canonicalBaseRevision` | Protected source revision from which work began. |
| `declaredWriteScope` | Sorted normalized paths or semantic artifact identities. |
| `writeSetDigest` | Digest of the normalized declared write scope. |
| `laneRevision` | Immutable authored-work revision, or the claim's immutable base before the first write. |
| `leaseEpoch` | Monotonic integer for this task and scope. |
| `fenceRevision` | Accepted claim digest that fences this lease epoch. |
| `ledgerRevision` | Accepted remote ledger head containing this transition. |
| `conflictSetDigest` | Stable digest of the mutation subject and only the claims, handoffs, canonical evidence, and policy inputs that can overlap or otherwise change that mutation's authority. Unrelated disjoint ledger entries are excluded. |
| `expiresAt` | Finite remote evaluation instant; never a local-device inference. |
| `evaluationTime` | Explicit remote evaluation instant used for deterministic status and expiry. |
| `idempotencyKey` | Stable digest of transition type, identity, epoch, and intended payload. |

A worktree, container, browser tab, process, or branch label may be recorded as
projection metadata but is not part of shared identity or authority.

## Coordination Model

One repository has one canonical synchronization lane and zero or more isolated
task lanes. The canonical lane owns exact protected-source refresh and shared
runtime synchronization. A task lane owns only its declared write scope, current
lease epoch, fence revision, and immutable lane revision.

Parallel collaboration is safe only when each active task lane has one current
accepted remote claim, one active writer, one immutable handoff identity, and a
declared write scope proven disjoint from every other current claim. Local
leases, review projections, browser tabs, background processes, and mutable
checkouts remain projections of that authority rather than the authority
itself.

## Source-Owned Policy Boundary

Multi-device concurrent cloud collaboration semantics are owned by this source
policy, not by a device workflow, repository-local wrapper, downstream mirror,
provider adapter, or review surface. Browsers, mobile devices, local shells,
cloud agents, and provider-specific APIs may project or enforce these rules,
but they do not get to rename or relax the underlying authority model.

- Evaluate ownership, overlap, fencing, and handoff only from the current
  protected remote ledger plus this canonical policy; forbid deriving those
  semantics from local process state, provider-specific defaults, or downstream
  patches
- Allow an adapter to translate the policy into local commands, hosted APIs, or
  user-interface actions; forbid an adapter from changing claim identity,
  authority order, write-scope comparison, fence meaning, or terminal-state
  semantics
- Require any semantic change to collaboration authority, claim fields, overlap
  detection, or handoff rules to land in the source policy first and flow
  downstream by explicit version adoption; forbid consumer-only hotfixes that
  create cross-device meaning drift
- Keep receipts, findings, and readiness meanings invariant across devices and
  providers; transport may differ, but verdict semantics must remain identical

## Ledger Contract

The ledger is a remotely addressable append-only hash chain represented by one
protected remote head. That head is the physical audit parent and compare-and-
swap target, not a global semantic lock or Stable Plan Identity. Each entry
contains the schema version, predecessor digest, transition, claim identity,
normalized payload digest, evaluator identity, evaluation time, and resulting
entry digest. Entries are sorted and encoded canonically before digesting.

Before mutation, derive a bounded `conflictSetDigest` from the immutable
mutation subject, current policy and canonical evidence, and the latest claims
or handoffs whose normalized scopes overlap the requested scope or whose
lineage can change the requested authority. The digest excludes observation
time, retry counters, the physical ledger head, and unrelated disjoint claims.
An adapter may cache the digest only with explicit invalidation at every ledger,
policy, canonical-source, or mutation-subject refresh.

Accepted states are `active`, `review-ready`, `delivery-authorized`, `parked`,
`released`, `expired`, and `revoked`. `delivery-authorized` grants only protected
integration of the unchanged reviewed lane revision; it does not reopen
authoring or grant release, publication, or deployment authority. `released`,
`expired`, and `revoked` are terminal for one lease epoch. A later epoch is a
new claim and must reference the current remote head. History is never edited,
compacted without a digest-preserving checkpoint, or rewritten to hide a
conflict.

## Atomic Transition Protocol

1. Read the current protected ledger head and its complete chain.
2. Validate schema, digest links, canonical encoding, state transitions, and
   monotonic lease epochs.
3. Normalize the requested write set and compute its digest.
4. Build a complete active-writer inventory and compare the requested scope with
   every current non-terminal claim in the same repository.
5. Reject any overlap, ambiguous scope, stale base, stale lane revision, expired
   prerequisite, or unjoined handoff.
6. Derive and seal the request's `conflictSetDigest`, independently from the
   observed global head, then build one deterministic semantic transition.
7. Parent the entry to the latest observed ledger head and attempt one
   compare-and-swap update of the protected remote head.
8. On mismatch, fetch and validate the new complete chain. If the immutable
   mutation subject and `conflictSetDigest` are unchanged, re-parent the same
   idempotent semantic transition to the new audit head and retry within the
   declared bound. If either changed, return a typed conflict and require
   replan. Never force, overwrite, or silently retry as success; never report
   an unaccepted transition as success.
9. Return the accepted `fenceRevision`, `ledgerRevision`, accepted audit-parent
   digest, `conflictSetDigest`, receipt digest, and typed findings.

For two overlapping candidates with the same authority fence, at most one
transition can be accepted. Two disjoint candidates may both succeed in audit
order: the loser of the physical head compare-and-swap revalidates its unchanged
conflict set and re-parents automatically. Identical retries return the existing
receipt by `idempotencyKey`; different payloads using one key are rejected.

### Dynamic Claim-Conflict Decision

Every authoritative refresh re-runs one provider-neutral decision over the
frozen claim intent and current verified ledger. The decision is derived, not
stored as a second authority plane:

| Observation | Typed disposition | Required behavior |
|---|---|---|
| The same idempotency key and semantic request are already committed | `idempotent-replay` | Return the existing receipt without another write. |
| The observed head is current and its conflict-set digest is unchanged | `current` | Attempt the frozen transition once. |
| The audit head advanced but only unrelated disjoint entries changed | `disjoint-rebase` | Re-parent the same frozen transition and retry within the declared bound. |
| An unsealed dynamic request observes a current overlapping authority | `overlapping` | Apply the current overlap policy; any newcomer remains a non-writing waiting successor. |
| Related lineage, immutable subject, policy, canonical evidence, or normalized scope changed | `semantic-conflict` | Return a typed conflict and require replan; do not reinterpret the sealed request. |
| The observation is absent from ancestry or relevant evidence is incomplete or ambiguous | `unknown-observation` | Fail closed with a typed outcome and preserve every lane and byte. |

Refresh and classification may repeat only within the declared compare-and-swap
attempt bound. Global-head equality, global inactivity, elapsed retries, provider
event order, or exact inventory parity are never substitutes for semantic
conflict-set evidence.

## Claim and Handoff Rules

- Require an accepted `active` claim before any shared lane mutation or review
  dispatch
- Renew only from the current cloud fence and before `expiresAt`; a local clock
  cannot extend authority
- Move to `review-ready` only after pushing the immutable `laneRevision` and
  joining focused check evidence
- Move from `review-ready` to `delivery-authorized` only through an explicit
  compare-and-swap transition binding the unchanged claim, write-set digest,
  lane revision, lease epoch, fence and ledger revisions, protected-review
  identity, exact-head check evidence, operator decision, and stable idempotency
  key; a replay returns the same receipt and any drift returns `blocked`
- Treat `delivery-authorized` as a non-authoring state: it permits only the
  configured protected-integration adapter to submit the reviewed bytes, while
  any source edit requires a separate handoff or fresh active lease epoch
- Move to `parked` when yielding without requesting integration; retain the
  immutable recovery revision and exact write set
- Release only after integration, explicit abandonment, or an accepted handoff;
  stopping a process does not release a claim
- Hand off with one accepted transition naming the prior fence, immutable lane
  revision, evidence digest, next actor or open-recipient policy, and unchanged
  write-set digest
- Admit a successor only after the handoff transition is current; never copy
  mutable working state between devices
- A protected-source advance caused by another integrated lane does not transfer
  authority to a waiting lane; the waiting lane must fetch the new protected
  state, compare fences and scope ownership again, and continue only through a
  fresh accepted transition

## Durable Authority Binding

A durable authorization digest is written once and read for the lifetime of the
lane, so it may cover only operands the lane lifecycle never changes. Lease
epochs advance on renewal, base revisions move when protected source moves, and
claim identities change whenever a claim is re-minted. Binding those into a
write-once digest means ordinary lane progress invalidates the authorization,
which is `volatile-operand-in-durable-binding`.

- Bind the stable lane identity durably: the branch, the semantic scope, and the
  device. Bind every volatile operand per operation instead, inside the proof
  challenge that authorizes one mutation, where re-derivation is free and the
  coverage is strictly stronger than a stale digest
- Never cover one operand in both places. A volatile operand bound durably *and*
  per operation is not defence in depth; the durable copy contributes no
  authorization the challenge does not already provide, and it is the only copy
  that can rot
- Declare, for every state a transition can produce, at least one transition that
  leaves it. A gate that refuses a state its own lifecycle creates is
  `unreachable-authority-state`, and enumerating transitions without proving
  reachability from each produced state is how one ships undetected
- Provide a same-subject re-anchor transition for lane drift, distinct from both
  first grant and subject replacement. It holds the authority subject,
  generation, and key identical, so it repairs an anchor and can never move
  authority
- Never make a repair transition depend on the invariant it repairs. A re-anchor
  authorized through the durable binding it exists to replace is unreachable
  exactly when it is needed; possession of the bound capability is the
  authorization
- Keep repair orthogonal to liveness. A re-anchor confers no expiry extension and
  is therefore permitted on an expired lease, because a lease that is both
  expired and drifted is otherwise unrecoverable when renewal itself asserts the
  drifted binding
- Verify authority is *usable*, not merely present, before work begins: perform
  one authorized no-op mutation at lane start, and re-verify immediately before
  each recording operation. Authority checked only at the boundary that consumes
  it is `authority-liveness-unverified`, and it converts a first-minute failure
  into a whole-session loss

## Restoration Operations

Renewal, reclaim, and re-anchor form one class: each restores an invariant and
must therefore never assert it. An operation that requires the state it repairs
is `liveness-gated-renewal`, and it converts a routine lapse into permanent loss.

- Authorize a restoration from capability possession and unchanged subject
  identity, never from lease liveness, binding freshness, or projection state
- Treat expiry as a liveness fact and never as a contention fact. Expiry yields
  `dormant-preserved`; it never releases a claim, and it never by itself requires
  an Operator decision to undo
- Decide a reclaim on claim-layer facts only: claim identity and state, actor and
  device, normalized write set, canonical base, and overlap against concurrent
  claims. Reading a pull-request draft flag, marker shape, lease field, or
  worktree cleanliness to decide ownership is `projection-gated-recovery`
- Narrow a recovery path on contention, never on presentation. A precondition an
  actor could satisfy by editing a projection is the wrong precondition, and
  finishing work by marking a review ready must never forfeit a recovery path
- Prove reachability across the producible state space rather than per adapter.
  Where the union of every recovery precondition leaves a producible state with no
  path, that gap is `unreachable-authority-state` however many adapters exist

### Non-Disruptive Reclaim

A reclaim is non-disruptive when every one of these holds and is checked:

- claim subject, semantic scope, and normalized write set unchanged
- no authored byte, index entry, `HEAD`, branch ref, or remote ref moves
- no pull-request state changes: not draft status, not review state, not check
  results, so an already-green candidate stays green
- no peer lane, claim, or lease is touched and no overlapping claim is pre-empted
- the lease epoch may advance and the claim may be re-minted, because a durable
  binding covers neither
- one digest-bound receipt names the prior and successor claim and grants no
  integration, publication, or deployment authority

A run performs its own non-disruptive reclaim without an Operator decision when
the claim is uncontested. Contention by another live actor, an overlapping write
set, or any step that raises authority escalates instead.

## Projection Reconciliation

The writer lease, its cloud-authority projection, the pull-request marker, the
fence, and the lifecycle report are all functions of one claim and observable
source state. None is an independent source of truth, so restoring them is one
operation and not a family of them.

- Expose exactly one reconcile transition that re-derives every projection of a
  claim in a single compare-and-swap and emits one receipt. Where restoring a
  claim needs more than one transition, so that repairing one projection
  invalidates the next gate derived from the same stale claim, that surface is
  `reconcile-surface-fragmented`
- Let adapters specialize transport and never own a slice of the projection set. A
  repair path per projection multiplies preconditions until some producible state
  satisfies none of them
- Require every projection to agree with its claim when the reconcile completes,
  and raise `projection-divergence-unreconciled` for any surviving disagreement at
  its source rather than leaving a later gate to rediscover it
- Reconcile before concluding staleness, never after refusing

### Deciding Divergence

A projection that differs from observed source state is not evidence of a foreign
writer. Concluding otherwise from inequality alone is
`staleness-inferred-from-inequality`, and it is a false positive that strands
authored work behind a gate no operation can open.

| Observation | Meaning | Action |
|---|---|---|
| Observed head descends from the recorded projection and no competing claim covers the branch or scope | The lane's own unrecorded advance | Reconcile and continue without an Operator decision |
| Observed head does not descend from the recorded projection | Genuine divergence | Escalate; never advance a projection over unexplained history |
| Any competing claim covers the branch or scope | Contention | Escalate to handoff or replan |

Commit authorship, committer identity, and pull-request ownership are never part
of this test. Each is settable by anyone who can write a commit and proves nothing
about authorization; the ledger is the only authority on who owns a lane.

### Review Supersession

A review describes the exact revision it evaluated and nothing else. When the lane
head advances past the reviewed revision, the review is superseded by that fact,
and the only question is whether the change is recorded.

- Record supersession as its own transition naming the reviewed revision, the new
  head, and the classified delta. A head that advances with the prior verdict left
  standing is `stale-review-unsuperseded`, and it is how a green verdict comes to
  describe bytes no evaluator ever saw
- Re-evaluate the new head rather than reusing any earlier result. No check result,
  approval, or readiness claim survives a head change
- Continue without an Operator decision where the classified delta stays within a
  recorded standing grant and the declared checks pass on the exact new head;
  escalate naming the class transition where it does not
- Never satisfy a review requirement with the authoring run's own verdict. The
  Evaluator is mechanical and the implementer never adjudicates it, so required
  checks discharge the role and a self-approval never does

### Bounded Publication Sequence

Recording, reconciling, renewing, and publishing are one operation with one
receipt chain, a bounded attempt budget per goal, and exactly two exits:
published, or escalated on contention. Split across separately gated commands, a
run can satisfy three and strand on the fourth with no path back, which is the
cascade this contract exists to prevent.

## Conflict and Concurrency Policy

Disjoint normalized write sets may proceed concurrently. Equal paths, ancestor
and descendant paths, shared semantic artifacts, generated-output authorities,
or ambiguous wildcards overlap and must serialize. A review request is a
projection of one ledger claim, not a lock and not proof of scope disjointness.

The evaluator rejects stale fences even when the authored bytes would merge
cleanly. Content mergeability does not prove ownership safety. A later claim may
supersede an expired claim only through a new accepted ledger transition that
preserves the prior lane revision and recovery identity.

Global-head movement alone is not a stale fence. A retry blocks only when the
refreshed chain changes the mutation subject, canonical or policy evidence, an
overlapping or ambiguous authority, or a required predecessor/handoff lineage.
Disjoint peer progress is accepted through its current typed operation receipt
and recorded in the final observation; it does not change Stable Plan Identity
or require a recovery lane.

## Offline-First Boundary

Offline tools may read cached policy, plan, author, test, and commit to a local
lane. They must not claim shared ownership, push shared mutations, dispatch a
review, assert `review-ready`, hand off, integrate, or claim runtime readiness
while disconnected.

On reconnection, the tool fetches the protected source and ledger heads, verifies
its base and local lane revision, obtains a fresh claim, rebases or replans when
required, runs focused checks, and only then publishes the immutable lane
revision. If another accepted claim overlaps, the offline work remains preserved
and blocked until its owner replans or receives a handoff.

### Recording Versus Publishing

The same boundary binds an expired or drifted authority, not only a disconnected
one. Authority state gates shared mutation and never local recording.

- Place every authority gate on the operation whose blast radius it protects:
  publishing to a shared ref, transitioning a claim, dispatching a review,
  integrating, and deploying. Committing to the run's own lane is local and
  reversible and carries no such gate
- Blocking a local commit on shared authority is `recording-gate-overreach`. It
  protects no shared state, because the commit touches none, while risking every
  authored byte the run has not yet recorded
- Record freely under lapsed authority and mark the lane as carrying unreconciled
  commits; reconcile at renewal by comparing recorded revisions against the
  refreshed claim, then publish or preserve-and-block exactly as reconnection does
- Fail closed on publication, never on memory. A gate that discards recorded work
  to protect state that work never touched is fail-destructive, and an
  architecture that leaves `--no-verify` as the only way to keep hours of verified
  work has inverted its own boundary

## Review and Integration Projection

A provider adapter may project an accepted claim into a review request and
surface ledger commands through a browser or mobile action. The projection must
carry the work item, write-set digest, canonical base revision, lane revision,
lease epoch, fence revision, ledger revision, entry digest, and focused-check
receipt. Scheduling and queue concurrency create no lock authority. Review
resolution, protected-check verification, protected-integration request, and
integration observation are replaceable adapter ports; provider-specific
branches, labels, commands, merge products, and hosting services are never
universal lifecycle semantics.

Required protected checks independently verify the current ledger, projection
parity, exact reviewed lane revision, scope ownership, and predecessor chain.
Closing, relabelling, or merging a projection cannot edit or release the ledger.
Protected integration requires the current `delivery-authorized` receipt, emits
a separate Integration Receipt, and then permits one ledger transition to
`released`. An operation-derived digest-bound Collaboration Receipt joins
admission evidence; prose, labels, or reconstructed local state cannot
substitute for that receipt.

## Runtime Readiness Enforcement

A conforming runtime exposes model-free commands for claim, renew, park,
review-ready, delivery-authorize, handoff, release, inspect, and verify. Commands
accept typed input, emit typed output, use bounded remote calls, and never need
an interactive local process to keep authority alive. Concurrent devices may
submit the same delivery intent, but compare-and-swap plus the idempotency key
accepts at most one transition and makes exact replays converge on one receipt.

The independent verifier exits zero only when:

- the full ledger chain and every content digest are valid;
- the evaluated claim is current, non-expired, and state-valid;
- the protected source, base, lane, work item, scope, epoch, fence, and ledger
  revision match;
- no active declared write sets overlap;
- the review projection, when required, matches the ledger exactly;
- named focused checks have terminal passing evidence; and
- the requested readiness layer has every predecessor receipt joined.

Byte-identical inputs and evaluation time produce identical findings, verdict,
and receipt digest. Collaboration readiness is partial proof: it cannot imply
canonical runtime, protected integration, deployment, or publication, and one
green layer never promotes another.

## Economics and Failure Boundary

Use one small ledger entry per meaningful transition, event-driven verification,
bounded conflict retries, cached immutable policy, and compact machine-readable
receipts. Forbid polling loops, per-device infrastructure, remote databases,
always-on coordinators, model calls for deterministic transitions, and duplicate
full-repository validation when a focused check is sufficient.

Remote unavailability preserves local authored work but returns `blocked`; it
never falls back to local shared authority. Unknown identity, policy, time,
scope, ledger, or projection state fails closed.

## Findings

| Finding Type | Severity |
|---|---|
| `parallel-scope-collision` | `blocker` |
| `stale-collaboration-fence` | `blocker` |
| `delivery-authority-unjoined` | `blocker` |
| `unreachable-authority-state` | `blocker` |
| `volatile-operand-in-durable-binding` | `blocker` |
| `liveness-gated-renewal` | `blocker` |
| `staleness-inferred-from-inequality` | `blocker` |
| `authority-liveness-unverified` | `major` |
| `projection-gated-recovery` | `major` |
| `recording-gate-overreach` | `major` |
| `projection-divergence-unreconciled` | `major` |
| `reconcile-surface-fragmented` | `major` |
| `stale-review-unsuperseded` | `major` |
| `evidence-without-run` | `major` |
| `runtime-readiness-unproven` | `blocker` |

Every finding names the repository, work item, scope, lease epoch, expected and
observed fences, affected revisions, evidence digest, and deterministic
remediation state. Emit zero counts for checked finding types with no occurrence.

## VCC

| Field | Requirement |
|---|---|
| Variables | Identity, ledger chain, protected source, normalized write sets, lane revisions, projections, evaluation time, and focused evidence. |
| Constraints | One accepted remote head, compare-and-swap transitions, no overlapping active claims, immutable handoff, bounded expiry, no offline shared mutation, capability-specific authority without implicit promotion, durable bindings over stable operands only, restorations that never assert what they repair, authority gates placed on shared mutation only, and one reachable exit from every producible state. |
| Checks | Schema and digest validation, transition matrix, concurrent same-parent race, overlap matrix, stale fence, idempotent delivery authorization and replay, edit-after-review rejection, offline admission, handoff join, projection parity, deterministic replay, cost bounds, lane-drift survival, same-subject re-anchor under drift and expiry, foreign-lane refusal, start-time authority usability, renewal of an expired uncontested claim, reclaim invariance across bytes and review state, contested-reclaim escalation, local recording under lapsed authority, single-transition reconcile of every projection, descendant advance reconciled without escalation, non-descendant divergence refused, competing-claim contention escalated, and authorship rejected as ownership evidence. |
