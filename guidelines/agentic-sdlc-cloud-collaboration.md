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
   replan. Never force, overwrite, or report an unaccepted transition as
   success.
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
| `evidence-without-run` | `major` |
| `runtime-readiness-unproven` | `blocker` |

Every finding names the repository, work item, scope, lease epoch, expected and
observed fences, affected revisions, evidence digest, and deterministic
remediation state. Emit zero counts for checked finding types with no occurrence.

## VCC

| Field | Requirement |
|---|---|
| Variables | Identity, ledger chain, protected source, normalized write sets, lane revisions, projections, evaluation time, and focused evidence. |
| Constraints | One accepted remote head, compare-and-swap transitions, no overlapping active claims, immutable handoff, bounded expiry, no offline shared mutation, and capability-specific authority without implicit promotion. |
| Checks | Schema and digest validation, transition matrix, concurrent same-parent race, overlap matrix, stale fence, idempotent delivery authorization and replay, edit-after-review rejection, offline admission, handoff join, projection parity, deterministic replay, and cost bounds. |
