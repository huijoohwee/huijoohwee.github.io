---
title: "ADLC Proportionate Closeout"
doc_type: "Guideline Module"
version: "1.1.0"
date: "2026-09-22"
lang: "en-US"
frontmatter_contract: "required"
owner: "Convergence controller function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
provider_neutral: true
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Proportionate Closeout

This module selects the least-powerful closeout profile that fully satisfies sealed Operator intent. It scales applicable work, never the rigor of a triggered obligation. The main [ADLC Guidelines](./adlc-guidelines.md) retain protected integration, atomic convergence, preservation, and finding authority; the [Production Release Lifecycle](./adlc-production-release-lifecycle.md) retains delivery and publication authority; the [Rapid MVP Sprint Profile](./adlc-rapid-prd-tad-adr-mvp-gtm-sprint.md) may compress elapsed time but never these obligations.

```text
Closeout Plan = sealed outcome + exact subject set + write scopes + applicable adapters + cleanup effects + evidence keys
Proportionate = omit only non-triggered work; never weaken, skip, or relabel triggered work
```

## Outcome Profiles

| Sealed outcome | Required path | Authority not created |
|---|---|---|
| `review-ready` | Independently verify and preserve one immutable exact-head candidate with its ownership and named-check evidence | No canonical integration, claim retirement, deployment, publication, or cleanup authority |
| `source-integrated` | Complete `review-ready`, protected integration, exact-canonical verification, and claim retirement where a claim applies | No deployment or publication authority |
| `production-released` | Complete `source-integrated` and the full joined Production Release Lifecycle for every triggered target | No authority beyond the authorized target and cleanup effects |

Cleanup is an explicit effect attached to a profile, not a reason to select a stronger profile. A source mutation whose actual integration effect automatically deploys or publishes is production-triggering even if it is labelled source-only; separate the effects or select `production-released`.

## Applicability and Selection

- Seal the requested outcome, exact subjects, effect envelope, destructive reach, externally visible consequences, and requested cleanup before closeout starts
- Select the least-powerful profile satisfying that sealed intent; never infer delivery from a request to review or integrate, and never down-classify an actual delivery or publication effect
- Load runtime, schema, security, cross-repository, deployment, publication, and client-convergence adapters only when the changed surfaces or requested outcome trigger them
- Record every omitted adapter and checklist row as `not-applicable` with the absent trigger; `not-applicable` is neither passed evidence nor permission to omit a triggered obligation
- Treat missing, stale, conflicting, or unclassifiable intent or effect evidence as `blocked`; uncertainty always selects more proof or no mutation, never a weaker profile
- Direct source integration means bypassing irrelevant production ceremony, never bypassing branch protection, required checks, ownership, fencing, independent evaluation, or exact-canonical verification

## Parallel Scheduling and Evidence Reuse

- Let every reviewed, dependency-ready, disjoint lane proceed immediately; unrelated worktrees, claims, reviews, deployments, and cleanup cannot block it
- Serialize only overlapping scopes and updates to the same canonical frontier; continue every other ready unit within recorded evaluator and coordination capacity
- Keep value closure on the critical path and schedule non-blocking housekeeping after it; cleanup remains on the critical path only when the sealed outcome requests it or retained projections consume required capacity
- Reuse immutable evidence only when candidate head and tree, policy revision, dependency closure, named-check and evaluator revisions, and every declared base-sensitive input still match; revalidate the current canonical frontier separately before integration
- Unrelated observations outside the dependency and conflict sets do not invalidate reusable evidence; changed relevant input invalidates only its dependent evidence and downstream joins

## Source-Integration Fast Path

`reviewed exact head → required checks → protected integration → exact-canonical verification → retire claim → optional exact clean worktree removal`

- Every arrow is a receipt-bearing transition owned by the main execution set; the short path changes no gate and creates no deployment authority
- Permit exact worktree removal under the original bounded authorization only when that removal was explicitly requested, the exact subject is unchanged, canonical value closure is proven, and current cleanup eligibility passes
- If optional cleanup fails after proven integration, record `integrated-retained`, preserve the projection and recovery identity, and resume only cleanup; cleanup failure must not invalidate or repeat a proven merge
- `integrated-retained` is a closeout disposition, not a second task success state; requested cleanup remains unresolved and the whole requested closeout is not complete

## Preservation and Maintenance Boundary

- Consume the Atomic Lane Convergence inventory, value-preservation, retirement, and no-discard rules by reference; this module defines no alternate keep, port, drop, or ambiguous classification
- Preserve every dirty, divergent, active, parked, ambiguous, unrelated, or uniquely valuable item in its owner-bound lane or verified immutable recovery object
- Treat exact clean-worktree removal, worktree-registration pruning, remote-tracking metadata pruning, local-branch deletion, remote-branch deletion, recovery-object retirement, reflog expiry, and unreachable-object pruning according to their separately authorized effect classes
- Branch deletion, remote-ref deletion, and object pruning remain separate explicit maintenance effects; a request for exact worktree removal grants none of them

## Receipt and Finding Projection

This module creates no parallel authority or finding vocabulary. Existing task, Integration, atomic convergence, and Production Release receipts remain the single source of truth. Their closeout projection records the sealed outcome, profile-selection basis, applicable and `not-applicable` adapters, new and reused evidence digests, value disposition, canonical proof, claim disposition, cleanup result, retained recovery locators, untouched inventory, evaluator revision, and terminal status.

Use existing findings by violated owner: unrelated disjoint delay is `coordination-revision-churn`; protected-control bypass is `canonical-control-bypass`; reintegration is `duplicate-change-reintegrated`; unsafe cleanup is `cleanup-ownership-unproven`; and premature publication is `publication-before-live-verification`.

## Validation Checklist

- [ ] Sealed outcome and actual effect envelope select the least-powerful sufficient profile
- [ ] Applicable adapters are loaded; every omitted adapter has an evidence-backed `not-applicable` reason
- [ ] Disjoint ready lanes continue; only overlap, dependency, frontier, or evidenced capacity causes serialization
- [ ] Reused evidence matches its complete immutable key and current canonical integration is revalidated separately
- [ ] The selected outcome's protected receipts and exact verification all join
- [ ] Every value-bearing or ambiguous item remains canonically included or recoverably preserved
- [ ] Cleanup uses only its exact authorized effects; retained cleanup never replays integration or hides incomplete requested work

## Change-Class Fast Path (v1.1.0)

The source-integration fast path above treats every change class uniformly. The harness now exposes a change-class fast path that relaxes only the authority-chain requirement for low-risk change classes, never the cleanup mechanics or evidence invariants. This is a proportionate closeout selection: the least-powerful authority sufficient for a docs-only change is local consent, not the protected-authority chain.

```text
Change-Class Fast Path = sealed docs-only outcome + lane-diff confirmation + local-consent terminal state
Proportionate = relax only the authority chain for the declared change class; never weaken cleanup, quarantine, or fail-closed
```

### Declared change classes

| Declared class | Lane-diff confirmation required | Terminal authority |
|---|---|---|
| `docs-only` | Every touched path matches `docs/`, `guides/`, `*.md`, or the repository-root Markdown files | `local-consent` (`providerAuthority:false` is sufficient; no protected-authority chain required) |
| `mixed` (default) | No relaxation; the full protected-authority chain applies | `protected` (the existing `release-common complete` → `completion:scaffold` → `completion:plan/apply` path) |

A declared class that does not match the observed lane diff is refused as `change-class-mismatch`; uncertainty selects the stronger path, never the weaker one. This is the same fail-closed rule that governs outcome-profile selection: uncertainty always selects more proof, never a weaker authority.

### Operator surface

The fast path is exposed on three surfaces:

- `agentic-os cleanup-user plan --change-class=docs-only` — the plan receipt carries `changeClass: { declared, observed, fastPath }` and `authorityTerminalState: 'local-consent'`
- `agentic-os cleanup plan --mode=local-consent --change-class=docs-only` — the unified CLI thin wrapper over the three cleanup entry points; `--mode=protected` is reserved for profile-governed repos that still use the full chain
- `npm run completion:status -- --ref=<lane>` — every finding carries `applicableToChangeClass`; findings marked `applicable: false` are not blockers for low-risk change classes

### Stale-ref sweep

A bounded retirement plan for lane refs that are (a) merged into canonical, (b) past a staleness window, and (c) not mounted in any active worktree. This is operator consent (`providerAuthority:false`); it does not delete refs — it projects them to recoverable quarantine, preserving the no-discard invariant.

```sh
agentic-os cleanup-user sweep --stale-older-than=<days> [--merged] [--no-active-worktree]
```

Each candidate still requires explicit `--authorize=<plan-digest>` and `--stopped` to apply, same as individual `cleanup-user plan/apply`. The sweep is a batching convenience, never a relaxation of the per-cleanup receipt requirement.

### Auto-derive placeholders

`npm run completion:scaffold -- --ref=<lane> --derive` pre-fills the locally-derivable scaffold fields (`recoveryInventoryDigest`, `recoveryInventoryContentEntries`, `expiresAt`, `integratedResource`, `integratedImmutableRevision`) so the operator only replaces the authoritative fields that require authenticated GitHub Actions dispatch. The derived scaffold lists `derivedFields` and `remainingPlaceholders`; derivation never fills authority fields.

### What this fast path does NOT relax

These remain load-bearing for every change class, including `docs-only`:

- Separate receipts per effect (source/integration/deployment/rollback/cleanup/sync)
- Recoverable quarantine over deletion (the recoverability invariant)
- Fail-closed on incomplete evidence (prefer retained refs over wrong prunes)
- Interactive-provider confirmation for production deploy/rollback
- Branch protection, required checks, ownership, fencing, and exact-canonical verification

A `docs-only` change that triggers an actual deployment or publication effect is production-triggering even if labelled docs-only; separate the effects or select `production-released`. The fast path relaxes only the authority chain for the cleanup of a proven docs-only integration, never the production-release lifecycle.
