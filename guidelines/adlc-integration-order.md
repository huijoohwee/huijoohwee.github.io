---
title: "ADLC Dependency-Ordered Integration Module"
doc_type: "Guidelines Module"
version: "1.1.1"
date: "2026-09-05"
lang: "en-US"
frontmatter_contract: "required"
owner: "Integration orchestrator function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
lifecycle_status: "proposed"
runtime_readiness_policy: "fail-closed"
---

# ADLC Dependency-Ordered Integration Module

## Scope and Ownership

This module is universal, neutral, implementation-agnostic, and independently loadable. It defines how separately verified changes converge into canonical source and one release frontier. It does not define a source-control product, branch name, file layout, build system, approval product, hosting provider, or deployment adapter.

The main ADLC Guidelines own task execution and the release receipt chain. This module owns integration-unit identity, dependency order, canonical-frontier advancement, duplicate and supersession handling, exact-canonical proof, and release-frontier sealing.

## Integration Unit Contract

Each unit is immutable planning input with these fields:

| Field | Contract |
|---|---|
| `unitId` | Stable identifier within one plan |
| `sourceRevision` | Immutable revision containing the proposed change |
| `changeDigest` | Content-addressed identity of the immutable actual delta from the recorded base revision and collaboration fence to the reviewed source revision; every entry must lie within the admitted write scopes |
| `writeScopes` | Non-empty source-owner scopes the unit may mutate |
| `dependencies` | Unit identifiers that must reach terminal success first |
| `kind` | `control`, `contract`, `source`, `consumer`, or `projection` |
| `namedChecks` | Checks declared before integration |
| `runtimeImpact` | Whether canonical runtime convergence is required |

Repository names, lane labels, timestamps, and change titles are metadata, never change identity.

## Frontier Contract

An Integration Frontier contains:

- exact canonical source revisions for every participating source owner;
- the exact transitive dependency-closure digest;
- policy and target digests required by the integration evaluator;
- the last accepted Integration Receipt digest for each unit;
- the exact-canonical checks digest for the current frontier;
- the runtime-convergence digest when any accepted unit has runtime impact.

Changing any component creates a new frontier. A local checkout, moving ref, process, route, or human-readable label cannot stand in for an exact frontier.

## Unit States

```
pending -> {already-integrated | superseded | integrated | blocked}
```

| State | Evidence |
|---|---|
| `pending` | Unit is unresolved |
| `already-integrated` | Canonical content proves the same change digest or an evaluator-approved semantic equivalent |
| `superseded` | Canonical content proves a newer owner implementation retains every required capability |
| `integrated` | Protected integration, exact-canonical checks, and required runtime convergence passed |
| `blocked` | Dependency, ownership, check, drift, or authority prevents safe advancement |

`already-integrated`, `superseded`, and `integrated` are terminal success dispositions. They require independent evaluator evidence. A writer assertion, matching title, similar diff size, or file existence is insufficient.

## Deterministic Ordering Algorithm

### 1. Snapshot

Resolve and record the current Integration Frontier before changing any lane. Recheck ownership, active writers, write scopes, dependency identities, and canonical revisions. Any unexplained mutation blocks planning.

### 2. Detect Existing or Newer Canonical Behavior

For each unit:

1. Compare its content-addressed change identity with canonical history or canonical content.
2. If exact or evaluator-approved equivalent behavior is reachable, record `already-integrated`.
3. If canonical behavior is newer, verify capability coverage and record `superseded`.
4. Otherwise retain `pending`.

Never replay an old unit merely because its original revision is not an ancestor. Squash, rebase, conflict resolution, and source-owner consolidation may preserve behavior without preserving commit ancestry.

### 3. Build the Dependency Graph

Build a directed graph from `dependencies`. Reject unknown identifiers, self-dependencies, and cycles. Dependency edges express required behavior, not repository order.

Where a consumer needs an exact contract or control-plane revision, encode that source owner as a dependency. Generated projections depend on their authored source. Release-frontier sealing depends on every integration unit.

### 4. Derive Waves

A unit is ready when all dependencies have a terminal success disposition. Sort ready units deterministically by stable identifier, then place units in the same wave only when their write scopes are disjoint. Overlapping scopes serialize into later waves.

Parallel discovery, validation, and read-only comparison remain allowed. Parallel mutation never weakens ownership or fencing.

### 5. Converge One Unit

For each ready unit:

1. Revalidate its collaboration fence and declared write scopes.
2. Materialize its exact locked dependency closure in its isolated lane.
3. Pin the freshly fetched Integration Frontier; derive and verify the unit's `changeDigest` against the recorded base, fence, reviewed source, and admitted write scopes; materialize only the remaining non-canonical delta in the isolated lane; preserve every other frontier entry; forbid whole-workspace, whole-tree, or all-file copying or replacement because full-tree identity is integrity proof, not integration payload.
4. Resolve conflicts only at the owning source or shared contract.
5. Run the unit's named checks and the repository integration lane.
6. Enter the canonical protected source through the configured adapter.
7. Record the resulting protected merge revision.
8. Resolve exact-canonical evidence from the newest terminal source run, suite, and check chain for the exact reviewed or protected-refreshed candidate. A topology-bound exact-canonical Integration Receipt may replace only an absent or still nonterminal duplicate post-integration run for the declared history-shaping topology; the newest terminal failure for that canonical source blocks the unit and requires source repair.
9. Reconcile canonical runtime when `runtimeImpact` is true.
10. Emit the unit Integration Receipt and advance the frontier.

A green task revision is review evidence, not exact-canonical evidence. When the protected merge exists and the duplicate canonical-source checks are pending, stop and retry the same idempotent convergence step unless one topology-bound receipt already satisfies every closed subject, topology, authority, check-chain, association, and no-mutation predicate below; only that complete receipt discharges the duplicate wait.

### 6. Seal the Release Frontier

Seal only when:

- every unit has a terminal success disposition;
- each dependency preceded its consumer;
- every accepted canonical revision passed its own exact checks;
- runtime-impacting units have runtime-convergence evidence;
- source and projection identities agree;
- the dependency-closure digest matches the final frontier.

Candidate preparation consumes this sealed frontier. Any later source, dependency, policy, target, artifact, manifest, or runtime change invalidates it.

## Retry and Recovery

- Retry only an idempotent step with the same unit, frontier, collaboration fence, and expected result.
- Select canonical evidence only through the provider-neutral functional event class `review-record-closed` or `operation-dispatch`, joined to the exact repository adapter and policy, closed review record, reviewed or protected-refreshed candidate revision and tree, protected base revision and tree, canonical revision and tree, declared method and exact parent list, integration metadata, collaboration and terminal lifecycle chain, source-check chain, evaluator application, and strictness policy.
- Keep provider wire grammar outside this universal contract and inside a replaceable reference adapter; never infer association through inferred or non-authoritative review association metadata.
- Keep provider inventory read-only and non-mutating for this decision; never synthesize, update, roll up, cancel, or otherwise mutate a check to manufacture canonical evidence.
- If an isolated lane lacks its declared locked dependencies, materialize them in that lane and replay the same fenced operation.
- If canonical source advances, discard the stale readiness decision, reconcile the new frontier, and rerun affected checks.
- If exact-canonical checks fail, repair the owning source through a new fenced revision; never waive or replace the check.
- If a unit is already integrated or superseded, close the no-delta lane without creating a merge and preserve its immutable history for audit.
- Remove only a clean, classified, recoverable lane; uncertain or concurrently owned state remains untouched.

## Required Evidence

An integration-plan evaluator records:

| Evidence | Required identity |
|---|---|
| Plan | Plan digest, initial frontier, units, graph, waves |
| Existing-change disposition | Unit digest, canonical revision, equivalence-check digest |
| Supersession disposition | Unit digest, canonical revision, capability-coverage digest |
| Unit integration | Unit digest, dependency receipts, protected revision, exact-check digest |
| Exact-canonical receipt subject | Repository adapter and policy revision; immutable closed review locator; candidate revision and tree; protected base revision and tree; canonical revision and tree |
| Exact-canonical receipt topology | Declared method and exact parent list; canonical tree equals the adapter-declared deterministic transformation of the exact protected base tree plus admitted reviewed delta; squash parents exactly `[protected base]` and candidate tree must equal the canonical tree |
| Exact-canonical receipt authority | Integration controller; deferred automatic-integration requester, method, title, and body; actual merger identity and merge time; collaboration claim, review transition, integration receipt, terminal retirement, ledger revision and digest, and operation identity |
| Exact-canonical receipt checks | Newest terminal source run, suite, and check chain for the exact reviewed or protected-refreshed candidate; declared protected-refresh rollup and remote collaboration-check identity and projection; fresh required-check context, evaluator application, and strictness policy |
| Exact-canonical receipt association | Functional event class `review-record-closed` or `operation-dispatch`; wire mapping isolated outside the universal contract; no inferred or non-authoritative association metadata; read-only non-mutating observation; no check mutation |
| Runtime convergence | Protected revision, dependency closure, probes digest |
| Release frontier | Final canonical revisions, dependency closure, terminal dispositions, seal digest |

## Findings

| Condition | Finding |
|---|---|
| Dependency graph contains a cycle | `integration-order-cycle` |
| Consumer advances before a dependency | `integration-before-dependency` |
| Frontier advances from task-head proof without exact-canonical proof | `canonical-frontier-unverified` |
| Equivalent or superseded behavior is merged again | `duplicate-change-reintegrated` |
| Candidate binds a frontier older than the final terminal plan | `stale-candidate-frontier` |

## Verification Checklist

- [ ] Every unit has immutable change identity, source revision, write scopes, dependencies, named checks, and runtime impact.
- [ ] The dependency graph is acyclic and every wave has disjoint write scopes.
- [ ] Existing-change and supersession decisions carry evaluator evidence.
- [ ] Each integrated unit names its dependency receipts and exact canonical revision.
- [ ] Exact-canonical checks, not task-head checks, advance the frontier.
- [ ] Any topology-bound exact-canonical receipt satisfies every subject, topology, authority, check-chain, association, and no-mutation row above.
- [ ] Runtime-impacting units carry runtime-convergence evidence.
- [ ] Generated projections follow their authored source owners.
- [ ] Every unit is terminal before release-frontier sealing.
- [ ] The final candidate binds the sealed frontier and complete dependency closure.
- [ ] No integration task crossed the delivery boundary.
