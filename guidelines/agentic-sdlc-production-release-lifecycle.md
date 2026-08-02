---
title: "Agentic SDLC End-to-End Production Release Lifecycle"
doc_type: "Guideline Module"
version: "1.0.1"
date: "2026-08-02"
lang: "en-US"
frontmatter_contract: "required"
owner: "Lifecycle controller function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "promotion"
universal_scope: "true"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Agentic SDLC End-to-End Production Release Lifecycle

## Scope and Neutrality

This module owns the reusable release protocol from protected integration through
terminal publication or rollback. It is universal across products, source
authorities, review surfaces, build systems, approval systems, deployment
targets, state stores, and publication mechanisms.

Concrete products, commands, branch names, host names, paths, account
identifiers, and credentials belong only in separately labelled reference
adapter profiles. They are never protocol identity.

The lifecycle is modular. Each adapter consumes typed immutable inputs, emits a
typed receipt, and has no authority outside its declared transition:

| Adapter port | Responsibility | Must not |
|---|---|---|
| Source authority | Resolve the exact protected source revision and tree | Treat a mutable label or local checkout as identity |
| Dependency resolver | Materialize the complete pinned dependency closure | Resolve mutable or undeclared inputs after sealing |
| Runtime reviewer | Prove the exact integrated closure on a controlled review surface | Authorize deployment |
| Candidate builder | Build once and content-address the artifact and manifest | Publish or rebuild after authorization |
| Interaction adapter | Present and record the exact human challenge | Grant deployment authority |
| Authority adapter | Join an authenticated human decision to one candidate and target | Infer, transfer, or reuse authorization |
| Deployment adapter | Deploy the authorized bytes under one target fence | Rebuild, retarget, or select current source |
| State reconciler | Apply bounded compatible state transitions with direct readback | Claim code rollback reverses state |
| Runtime verifier | Prove immutable-origin and public-route behavior | Publish a mirror |
| Publication adapter | Project only the verified release identity | Lead live verification |
| Rollback adapter | Restore and re-probe the recorded last-known-good identity | Grant forward-deployment authority |

## Release Frontier and Identity

Seal one Release Frontier only after every integration unit is terminal and all
runtime-impacting authorities have converged. The frontier contains:

```text
canonical source revision and tree
+ complete direct and transitive dependency closure
+ policy and evaluator revisions
+ schema, catalog, generated-projection, and state-contract revisions
+ controlled runtime-review identity
+ target configuration digest
+ rollback-target identity
```

Every identity is immutable and content-addressed. A name, timestamp, moving
label, local process, review status, deployment status, or "latest" selector is
not release identity.

Before candidate preparation, independently fetch each protected authority.
Detect queued or concurrent protected changes that can advance the frontier.
Candidate preparation may continue only while the bound frontier remains exact.
Any authority movement invalidates the review and candidate even when the
primary source did not change.

## Receipt Chain

| Receipt | Minimum identity | Authority created |
|---|---|---|
| **Overlap Preservation Receipt** | Convergence base and protected tip; collaboration identity, write-set digest, state digest, recovery handle, preservation mode, and overlap class for every observed non-canonical item | Disposition may be evaluated; no integration or deployment authority |
| **Overlap Disposition Receipt** | Preservation Receipt digest and exact retained-or-restored observation for every item | Protected convergence may proceed |
| **Integration Receipt** | Protected source revision and tree, full dependency closure, checks, evaluator, collaboration fence, and preservation receipts | Authoring closes; controlled review may begin |
| **Runtime Review Receipt** | Integration Receipt digest, controlled review-surface identity, complete runtime closure, probes, reviewer, issue time, and expiry | Candidate preparation may begin |
| **Candidate Manifest** | Runtime Review Receipt digest, source, dependencies, policy, target, state contract, rollback target, artifact, manifest, and candidate digests | One immutable candidate exists |
| **Authorization Interaction Receipt** | Candidate and target digests, authenticated actor, interaction adapter, transport class, declared browser dependency, challenge and response digests, and observation time | Human interaction is observed; no deployment authority |
| **Human Authorization Receipt** | Interaction Receipt, candidate, and target digests; authenticated human decision reference; authority adapter; issue time; expiry; and consumption state | One forward deployment attempt may begin |
| **Deployment Receipt** | Consumed authorization, controller fence, deployed artifact, immutable deployment identity, target, and time | Live verification may begin |
| **State Reconciliation Receipt** | Deployment Receipt, migration or reconciliation plan, applied operations, direct readback, counts, and state-contract digest | State compatibility is proven for this deployment |
| **Live Verification Receipt** | Deployment and State Reconciliation Receipts, observed runtime identity, immutable-origin probes, public-route probes, client-cache convergence, and rollback target | The candidate is live and verified |
| **Publication Receipt** | Live Verification Receipt digest and exact downstream publication identities | Downstream publication closes |
| **Rollback Receipt** | Failed stage, last-known-good identity, restored deployment and state disposition, probes, and terminal result | Recovery closes; no forward authority |

Every receipt is typed, immutable, content-addressed, and joined to its
predecessor by digest. Unknown fields, missing joins, partial evidence, and
mutable evidence fail closed. Preservation is not review, integration, or
authorization. Review is not authorization. Deployment is not verification.
Verification is not publication.

## End-to-End State Machine

| State | Required transition | Fail-closed invariant |
|---|---|---|
| **Preserved** | Account for all pre-existing non-canonical work | Missing ownership, bytes, fence, recovery identity, or disposition blocks convergence |
| **Integrated** | Protected checks converge the exact Release Frontier | Bypass, mutable input, or partial closure emits no Integration Receipt |
| **Reviewed** | A controlled surface proves the exact integrated runtime closure | Stale processes, failed probes, or dependency drift emit no Runtime Review Receipt |
| **Prepared** | Build once and bind artifact, manifest, target, state, review, policy, and rollback identities | Mutable selectors or unresolved inputs are invalid |
| **Awaiting authorization** | Revalidate the exact candidate before presenting one human challenge | Prompt drift, source movement, or stale review cancels the attempt |
| **Authorized** | An authenticated human authorizes one candidate for one target | Authorization is absent by default, expiring, non-transferable, and single-consumption |
| **Deployed** | Revalidate zero drift, capture rollback identity, and deploy the already-built bytes | Rebuild, retarget, or new dependency resolution is forbidden |
| **State reconciled** | Apply compatible state operations and verify direct readback | Ambiguous, destructive, or unreadable state blocks live verification |
| **Verified** | Prove exact identity and critical behavior across required transports | A successful provider status alone is insufficient |
| **Published** | Publish only the exact verified identity | A mirror or projection cannot lead live verification |
| **Rolled back** | Restore and re-probe the last-known-good identity after failure | Rollback never reuses or creates forward authorization |

## Operational Stage Contract

### 1. Preflight and Preservation

- Fetch every protected authority before mutation.
- Inventory active lanes, scopes, fences, generated projections, and target
  ownership.
- Preserve unrelated or overlapping work in its owning lane; never delete,
  adopt, hide, or overwrite it to manufacture cleanliness.
- Require one target-scoped controller fence and the idempotency key formed from
  target digest plus candidate digest.

### 2. Protected Integration and Convergence

- Require exact protected integration and named checks for every source owner.
- Converge shared policies, schemas, catalogs, state contracts, and generated
  projections before their consumers.
- Re-run exact-canonical checks after each protected advancement.
- Reject a candidate from an earlier Release Frontier as
  `stale-candidate-frontier`.

### 3. Controlled Runtime Review

- Start or reconcile only the repository-owned controlled review surface.
- Prove source, dependency, policy, process ownership, listener ownership, and
  critical probes from the same receipt.
- Bind review expiry and the full runtime closure; a healthy but differently
  owned process is stale evidence.

### 4. Candidate Preparation

- Build once from the exact reviewed closure.
- Generate the immutable manifest, candidate digest, rollback identity, and
  state-transition plan before authorization.
- Verify source-to-projection and source-to-publication parity without
  publishing.
- Treat regenerated bytes as a new candidate even when authored source is
  unchanged.

### 5. Authorization Readiness

- Re-fetch all protected authorities and revalidate the current Runtime Review
  Receipt immediately before prompting.
- Present the candidate digest, source identity, target identity, release-run
  reference, review-surface locator, and exact candidate-bound challenge.
- Bind the interaction transport and any browser dependency as evidence, not as
  universal protocol requirements.
- If any identity changes while waiting, cancel or retire the stale unapproved
  run and require a fresh review, candidate, interaction, and authorization.
- If the protected canonical source advances while authorization waits, mark the
  waiting run `superseded`, refresh the canonical review owner to the new exact
  protected revision, and reseal a new candidate from that revision. Never
  retarget, reopen, or authorize the stale run.

### 6. Authorized Deployment

- Consume authorization durably before target mutation.
- Revalidate source, dependency, policy, target, artifact, manifest, rollback,
  and predecessor-receipt digests without rebuilding.
- Capture the last-known-good deployment and state identities before promotion.
- Deploy only the sealed artifact under the target-scoped controller fence.

### 7. State Reconciliation

- Use idempotent, bounded, backward-compatible expand, migrate, and contract
  operations where state changes.
- Prefer direct authoritative reconciliation and direct readback when public
  transports can transform, cache, challenge, or reject automation.
- Record expected and observed entity counts, content or path-hash parity, and
  zero unexplained residue.
- Keep code rollback and state rollback as separate dispositions.

### 8. Live Verification

- Probe the immutable deployment origin first so the observed bytes are joined
  directly to the Deployment Receipt.
- Probe every required public route separately for status, route ownership,
  primary assets, runtime identity, and critical behavior.
- Prove browser fidelity when the product has browser behavior.
- Prove returning-client cache or service-worker convergence when prior bytes
  can survive deployment.
- Require readiness markers or equivalent identity evidence to be byte-identical
  across immutable and public transports when they claim the same target.
- A challenged public route does not invalidate a healthy immutable origin, but
  it blocks the public-route claim until separately proven.

### 9. Publication, Closure, and Cleanup

- Emit the Live Verification Receipt before publishing any mirror, registry, or
  downstream representation.
- Publish the exact verified identity and record its immutable revision.
- Persist the terminal receipt chain, authorization consumption, costs,
  deployment identity, state counts, route results, and rollback disposition.
- Remove only clean, integrated, completion-proven task lanes. Preserve active,
  parked, dirty, divergent, or unrelated lanes.
- Report success only after the controller, verification, publication, and
  cleanup states are terminal.

## Transport and Proof Separation

Verification transports are adapters with different claims:

| Transport class | Claim |
|---|---|
| Controlled review surface | The integrated runtime closure was reviewed |
| Immutable deployment origin | The sealed artifact was deployed and observed |
| Public target route | Routing, edge policy, caching, and public behavior work |
| Authoritative state readback | Stored state matches the state contract |
| Browser client | User-visible behavior and client persistence converge |
| Publication mirror | The verified release identity was projected downstream |

No transport substitutes for another. A green immutable origin cannot claim
public routing. A green public route cannot prove state readback. A green mirror
cannot prove deployment. The lifecycle records each independently and joins
only the claims required for the target profile.

## Drift, Replay, and Recovery

Invalidate the affected chain when any source, dependency, policy, schema,
catalog, state contract, target configuration, rollback identity, review,
artifact, manifest, candidate, interaction, actor, challenge, response,
authorization, controller, transport, or predecessor receipt changes.

- Rebuild means new candidate, review, interaction, and authorization.
- Source advancement while waiting means stale run, not implicit retargeting.
- A superseded waiting run is retired, not resumed; the next attempt begins from
  a freshly refreshed canonical source owner and emits a new candidate digest.
- Duplicate dispatch with the same idempotency key coalesces onto one durable
  result; a competing key fails closed.
- Expired, malformed, unjoined, consumed, actor-mismatched, interaction-mismatched,
  or target-mismatched authorization is rejected.
- A post-deploy failure triggers the recorded rollback adapter and keeps
  publication at the last-known-good identity.
- Recovery retries only the same fenced idempotent stage. Repeated identical
  failure triggers diagnosis, not an unbounded retry loop.

## Deterministic Conformance

A repository-owned evaluator must accept the typed receipt carrier and emit
ordered findings plus a terminal state. Byte-identical inputs and evaluation
time produce byte-identical findings and receipt digests.

The evaluator exits zero only when every receipt required by the claimed stage
exists, joins its predecessor, uses the current policy, and proves the exact
Release Frontier. Dynamic package execution, mutable dependency selection,
provider dashboards, prose, or human memory cannot create lifecycle authority.

Required blocker findings include:

- `release-frontier-drift`
- `runtime-review-drift`
- `candidate-rebuilt-after-authorization`
- `authorization-interaction-unjoined`
- `authorization-consumed-or-stale`
- `duplicate-release-controller`
- `state-reconciliation-unverified`
- `immutable-origin-unverified`
- `public-route-unverified`
- `client-cache-convergence-unverified`
- `publication-before-live-verification`
- `cleanup-ownership-unproven`

## Completion VCC

Given one exact integrated Release Frontier, when a controlled surface proves
the complete runtime closure, the builder seals one immutable candidate, an
authenticated human authorizes that candidate for one target, and the fenced
controller deploys the same bytes without rebuild, then authoritative state
readback, immutable-origin probes, required public-route probes, browser and
client-cache checks where applicable, publication, terminal receipts, and
ownership-safe cleanup all succeed or the recorded last-known-good identity is
restored. Any drift, missing join, ambiguous ownership, replay, partial state,
or failed required transport leaves the release blocked or rolled back rather
than partially complete.
