---
title: "Agentic SDLC Cloud-Authoritative Collaboration"
doc_type: "Guideline Module"
version: "1.0.1"
date: "2026-08-02"
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
or always-on coordinator. One protected remote ledger serializes ownership
transitions; immutable lane revisions carry authored work; review requests and
local execution locations are replaceable projections.

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

## Ledger Contract

The ledger is a remotely addressable append-only hash chain represented by one
protected remote head. Each entry contains the schema version, predecessor
digest, transition, claim identity, normalized payload digest, evaluator
identity, evaluation time, and resulting entry digest. Entries are sorted and
encoded canonically before digesting.

Accepted states are `active`, `review-ready`, `parked`, `released`, `expired`,
and `revoked`. `released`, `expired`, and `revoked` are terminal for one lease
epoch. A later epoch is a new claim and must reference the current remote head.
History is never edited, compacted without a digest-preserving checkpoint, or
rewritten to hide a conflict.

## Atomic Transition Protocol

1. Read the current protected ledger head and its complete chain.
2. Validate schema, digest links, canonical encoding, state transitions, and
   monotonic lease epochs.
3. Normalize the requested write set and compute its digest.
4. Build a complete active-writer inventory and compare the requested scope with
   every current non-terminal claim in the same repository.
5. Reject any overlap, ambiguous scope, stale base, stale lane revision, expired
   prerequisite, or unjoined handoff.
6. Build one deterministic entry whose predecessor equals the observed ledger
   head.
7. Attempt one compare-and-swap update of the protected remote head.
8. On mismatch, fetch the new head, re-evaluate from step 2, and surface the
   competing transition; never force, overwrite, or silently retry as success.
9. Return the accepted `fenceRevision`, `ledgerRevision`, receipt digest, and
   typed findings.

For two candidates with the same parent fence, at most one transition can be
accepted. Identical retries return the existing receipt by `idempotencyKey`;
different payloads using one key are rejected.

## Claim and Handoff Rules

- Require an accepted `active` claim before any shared lane mutation or review
  dispatch
- Renew only from the current cloud fence and before `expiresAt`; a local clock
  cannot extend authority
- Move to `review-ready` only after pushing the immutable `laneRevision` and
  joining focused check evidence
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
receipt. Scheduling and queue concurrency create no lock authority.

Required protected checks independently verify the current ledger, projection
parity, exact reviewed lane revision, scope ownership, and predecessor chain.
Closing, relabelling, or merging a projection cannot edit or release the ledger.
Protected integration emits a separate Integration Receipt and then permits one
ledger transition to `released`. An operation-derived digest-bound Collaboration
Receipt joins admission evidence; prose, labels, or reconstructed local state
cannot substitute for that receipt.

## Runtime Readiness Enforcement

A conforming runtime exposes model-free commands for claim, renew, park,
review-ready, handoff, release, inspect, and verify. Commands accept typed input,
emit typed output, use bounded remote calls, and never need an interactive local
process to keep authority alive.

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
| `evidence-without-run` | `major` |
| `runtime-readiness-unproven` | `blocker` |

Every finding names the repository, work item, scope, lease epoch, expected and
observed fences, affected revisions, evidence digest, and deterministic
remediation state. Emit zero counts for checked finding types with no occurrence.

## VCC

| Field | Requirement |
|---|---|
| Variables | Identity, ledger chain, protected source, normalized write sets, lane revisions, projections, evaluation time, and focused evidence. |
| Constraints | One accepted remote head, compare-and-swap transitions, no overlapping active claims, immutable handoff, bounded expiry, no offline shared mutation, and no authority promotion. |
| Checks | Schema and digest validation, transition matrix, concurrent same-parent race, overlap matrix, stale fence, idempotent replay, offline admission, handoff join, projection parity, deterministic replay, and cost bounds. |
