---
title: "Git Guidelines"
doc_type: "Guidelines"
version: "1.0.0"
date: "2026-08-04"
lang: "en"
owner: "Orchestrator function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
companion_of: "guidelines/agentic-sdlc-guidelines.md"
invocation_token: "/git.guidelines"
semantic_filters: ["#git-collaboration"]
bindings: ["@git-guidelines"]
frontmatter_contract: "required"
---

# Git Guidelines

This git-layer companion projects the execution set into byte-preserving, provider-neutral operations; it creates no second authority.

## Boundary & Ownership

| ID | Rule family | Disposition | Owner | Class |
|---|---|---|---|---|
| C1 | claim identity | consumes | [Collaboration Module](../../guidelines/agentic-sdlc-cloud-collaboration.md) | advisory |
| C2 | authority order | consumes | [Collaboration Module](../../guidelines/agentic-sdlc-cloud-collaboration.md) | advisory |
| C3 | write-scope comparison | consumes | [Collaboration Module](../../guidelines/agentic-sdlc-cloud-collaboration.md) | advisory |
| C4 | fence meaning | consumes | [Collaboration Module](../../guidelines/agentic-sdlc-cloud-collaboration.md) | advisory |
| C5 | handoff semantics | consumes | [Collaboration Module](../../guidelines/agentic-sdlc-cloud-collaboration.md) | advisory |
| C6 | additive lane admission and preservation proof | consumes | [Lane Admission Module](../../guidelines/agentic-sdlc-scoped-lane-admission.md) | advisory |
| C7 | frontmatter, Rule_ID, findings, and readiness rungs | consumes | [Authoring Authority](../../guidelines/prd-tad-adr-guidelines.md) | advisory |
| C8 | task model, roles, independence, blast radius, and budgets | consumes | [Execution Companion](../../guidelines/agentic-sdlc-guidelines.md) | advisory |
| C9 | commit, push, and deploy command sequences | consumes | [Delivery Guidelines](../../guidelines/commit-push-deploy-guidelines.md) | advisory |
| O1 | git lane projection and branch naming | owns | — | advisory |
| O2 | coordination artifact layout and schemas | owns | — | advisory |
| O3 | commit attribution trailers | owns | — | advisory |
| O4 | preservation, backup, and recovery handles | owns | — | advisory |
| O5 | conflict placement and serialization order | owns | — | advisory |
| O6 | promotion chain gates | owns | — | advisory |
| O7 | validation gates and conformance checker | owns | — | advisory |

## Module Index

- [`boundary--ownership`](#boundary--ownership) — owner boundary; every stage loads it.
- [`glossary`](#glossary) — shared terms and blocked outcome; every stage loads it.
- [`load-budget`](#load-budget) — stage-to-section budget; session start loads it.
- [`lane-topology--admission`](#lane-topology--admission) — lanes and root operations; lane admission loads it.
- [`coordination-artifacts`](#coordination-artifacts) — typed filesystem projections; admission through cleanup loads it.
- [`authoring--write-scope`](#authoring--write-scope) — scope-safe mutation; authoring and commit load it.
- [`preservation-recovery--cleanup`](#preservation-recovery--cleanup) — recoverable bytes; authoring, recovery, cleanup load it.
- [`commit--attribution`](#commit--attribution) — commit identity; commit loads it.
- [`verification-gates`](#verification-gates) — independent exact-revision evidence; push and review load it.
- [`conflict--integration-order`](#conflict--integration-order) — source resolution and DAG order; review and integration load it.
- [`promotion-chain`](#promotion-chain) — closed release boundaries; promotion loads it.
- [`findings--rule-identity`](#findings--rule-identity) — finding vocabulary and Rule_IDs; integration onward loads it.
- [`validation-checklist`](#validation-checklist) — five deterministic gates; commit, push, promotion load it.
- [`anti-patterns`](#anti-patterns) — prohibited/corrective pairs; review loads it.
- [`mantra`](#mantra) — one clause per owned family; review loads it.

## Glossary

| Term | Meaning |
|---|---|
| Canonical_Lane | The one clean, non-authoring checkout at the exact protected canonical revision. |
| Task_Lane | One isolated branch and worktree for one declared semantic scope, claim, epoch, and fence. |
| Current_Authority | Authenticated remote authority accepted by monotonic compare-and-swap for one write set. |
| Waiting_Successor | A non-writing overlapping request ordered behind the current authority. |
| Dormant_Preserved | Expired non-writing authority whose revision, review identity, evidence, and bytes remain preserved. |
| Coordination_Task | A dependency-ordered group of immutable per-repository work units with no shared lane authority. |
| Recovery_Handle | A completed recovery-capture directory name or a verified immutable bundle filename. |
| Reference_Implementation_Block | A heading or block whose own text contains the words “reference implementation”. |
| Blocked_Outcome | Typed output naming the condition and artifact, proving head/index/tracked/untracked digests unchanged. |

## Load Budget

| Stage | Sections |
|---|---|
| session start | `module-index`, `boundary--ownership`, `glossary`, `load-budget` |
| lane admission | `lane-topology--admission`, `coordination-artifacts` |
| authoring | `authoring--write-scope`, `coordination-artifacts`, `preservation-recovery--cleanup` |
| commit | `commit--attribution`, `authoring--write-scope`, `validation-checklist` |
| push | `verification-gates`, `coordination-artifacts`, `validation-checklist` |
| review | `verification-gates`, `conflict--integration-order`, `anti-patterns`, `mantra` |
| integration | `conflict--integration-order`, `coordination-artifacts`, `findings--rule-identity` |
| promotion | `promotion-chain`, `validation-checklist`, `findings--rule-identity` |
| recovery | `preservation-recovery--cleanup`, `findings--rule-identity` |
| cleanup | `preservation-recovery--cleanup`, `coordination-artifacts` |

## Lane Topology & Admission

| Identity field | Projection |
|---|---|
| Actor ID | Authenticated claim actor |
| Device ID | Claim device plus branch device segment |
| Session ID | Claim session |
| Worktree ID | Registered worktree and common-directory identity |
| Branch ID | Remotely addressable task ref |
| Scope ID | Declared write-scope semantic scope |
| Lease Epoch | Monotonic claim epoch |
| Fence Revision | Current claim fence digest |

| Lane class | Observable derivation |
|---|---|
| `canonical` | One clean registration at the exact protected revision with no authoring. |
| `overlapping` | A declared current write set overlaps the candidate set. |
| `disjoint-attributed` | Resolvable identity and declared scope prove disjointness. |
| `ambiguous` | Missing, duplicated, stale, or unparseable identity or scope; treat as overlapping. |

- [advisory] Keep exactly one Canonical_Lane per repository and zero or more isolated Task_Lanes.
- [advisory] Name a Task_Lane `agent/<device-id>/<semantic-scope>`; each segment is 1–64 lowercase letters, digits, or hyphens.
- [artifact-bearing] `claim(scope)` requires a clean exact base, normalized scope, authenticated actor, no overlap, and monotonic CAS; failure changes no bytes.
- [artifact-bearing] `continue(claim)` revalidates immutable claim, revision, review identity, scope, epoch, and fence before one mutation batch.
- [artifact-bearing] `integrate(candidate)` consumes one reviewed immutable candidate, dependency closure, checks, and current claim through monotonic CAS.
- [artifact-bearing] `retire(claim)` alone ends current authority and preserves revision, review identity, bytes, checks, and handoff evidence in its receipt.
- [artifact-bearing] Permit unlimited current disjoint authorities, exactly one current authority per overlap, and only non-writing waiting successors for overlap.
- [artifact-bearing] Expiry yields `dormant-preserved`; recovery is independent of the expired local lease and never adopts mutable bytes from another lane.
- [artifact-bearing] Admission snapshots every existing lane before and after, permits only candidate deltas, and joins Admission and Preservation Receipts.
- [advisory] Browser, mobile, local worktree, lease, PR, process, and provider metadata are replaceable projections, never independent authority.
- [advisory] Orchestrator, Implementer, Evaluator, and Operator remain the exact execution roles; the Evaluator stays mechanically independent.

### Reference implementation inspiration — no-copy boundary

- [advisory] [yjs/yjs](https://github.com/yjs/yjs) inspires only neutral observation and convergence principles; this contract is independently authored.
- [artifact-bearing] Forbid copied code, prose, schema, tests, examples, algorithms, names, dependencies, imports, runtime reliance, or external authority.

## Coordination Artifacts

| Artifact | Required shape |
|---|---|
| Declared scope | `agentic-declared-write-scope/v1`: one 3–64 character semantic scope and 1–4096 sorted unique relative paths. |
| Claim request | `agentic-cloud-collaboration-request/v1`: repository, work item, base, lane, scope, actor, device, session, epoch, expiry. |
| Claim receipt | `agentic-collaboration-claim-receipt/v1`: `claim`, current-or-waiting status, repository/claim identity, claim/fence/ledger digests, sequence, idempotency/request digests, evaluation instant, receipt digest. |
| Continuation receipt | `agentic-collaboration-continuation-receipt/v1`: `continue`, projected status, and the same complete digest-bound operation evidence. |
| Integration receipt | `agentic-collaboration-integration-receipt/v1`: `integrate`, `integrated-preserved`, and the same complete digest-bound operation evidence. |
| Retirement receipt | `agentic-collaboration-retirement-receipt/v1`: `retire`, `retired`, and the same complete digest-bound operation evidence. |
| Change manifest | `agentic-change-manifest/v1`: branch, base SHA, and exact byte-sorted changed paths. |
| Recovery manifest | `agentic-legacy-dirty-lane-recovery/v1`: capture identity, paths, modes, digests, and completion marker. |

- [advisory] Store Coordination_Artifacts only as UTF-8 JSON files of at most 64 KiB under `.coordination/` in the target repository.
- [artifact-bearing] Require every artifact schema and field above; scope/request/receipt values, epochs, write sets, and digests must join exactly.
- [artifact-bearing] Normalize relative paths, count equality, ancestry, shared semantic artifacts, wildcards, and undecidable comparison as overlap; local lease proves no remote authority.
- [artifact-bearing] Cap each local lease at 24 hours; offline work requires an unexpired current claim, and reconnect revalidates base, lane, epoch, fence, and ledger.
- [artifact-bearing] Absent, unreadable, unparseable, expired, stale, duplicate, or fence-divergent artifacts resolve as a Blocked_Outcome before mutation.
- [advisory] Git remotes and the filesystem are the only required coordination substrate; forbid daemons, databases, paid services, and polling locks.

## Authoring & Write Scope

- [artifact-bearing] Before every mutation batch, join the exact current claim, normalized declared scope, local lease, fence, and exact Change_Manifest path set.
- [artifact-bearing] If authoring starts on the Canonical_Lane, preserve exact tracked and untracked bytes in an owned Task_Lane and restore canonical parity before commit.
- [advisory] Stage only explicit paths or interactive hunks, enumerate incidental changes, and treat scope labels as descriptions rather than path authority.
- [advisory] A private local commit records progress only; shared authority begins at a remotely addressable branch, review identity, and required-check path.

## Preservation, Recovery & Cleanup

| Location | Purpose |
|---|---|
| `.backups/` | Immutable bundles retained until an exact Operator removal decision. |
| `.agentic-manifests/` | Active lane Change_Manifest records. |
| `.recovery/` | Capture manifest, tracked patch, retained files, then completion marker. |

- [advisory] Name a bundle `<repository>-<scope>-<short-revision>-<yyyymmdd>.bundle` without overwriting an existing file.
- [artifact-bearing] Before any destructive rewrite, create and verify a unique bundle or completed capture; restore exact bytes, modes, links, and every manifest path.
- [artifact-bearing] Require one Operator decision per destructive occurrence and record `keep`, `port`, or `drop` with exact identity, evidence, and rationale.
- [artifact-bearing] Park or hand off only after the immutable revision, current Change_Manifest, Recovery_Handle, checks, and review identity are remotely addressable.
- [artifact-bearing] A missing bundle, manifest, decision, retained file, or completion marker resolves as a Blocked_Outcome and preserves both byte sets.
- [advisory] Cleanup only after protected integration, canonical parity, terminal receipts, value closure, and exact removal authority are all proven.

## Commit & Attribution

| Type | Selection condition |
|---|---|
| `feat` | Adds externally observable behavior. |
| `fix` | Corrects defective behavior. |
| `docs` | Changes documentation only. |
| `test` | Changes verification only. |
| `refactor` | Changes structure without behavior. |
| `chore` | Changes maintenance metadata or tooling. |

| Trailer | Required value |
|---|---|
| `Agentic-Task` | Exact task identifier |
| `Agentic-Scope` | Admitted semantic scope |
| `Agentic-Lease-Epoch` | Current claim epoch |
| `Agentic-Mechanism` | Acting agent mechanism |

- [artifact-bearing] Use `<type>(<scope>): <summary>` at at most 72 characters; the closed type set and admitted scope determine the first two fields.
- [artifact-bearing] Record each trailer exactly once with real line breaks in the final block and give both what changed and why; missing, duplicate, or literal escaped `\n` separators block push.
- [artifact-bearing] Commit one revertable task-and-scope unit, stage explicit paths, match the Change_Manifest, and amend only an unpushed commit from this lane.
- [advisory] Consume commit, push, and deploy sequences only from the Delivery Guidelines owner named in the boundary table.

## Verification Gates

| Result field | Required value |
|---|---|
| check | Registered check name |
| revision | Exact revision checked |
| status | Terminal exit status |
| summary | Pass/fail counts or test summary |
| completed | Completion instant |

- [artifact-bearing] Before shared push, run a named check on the exact revision to terminal status within its stated maximum and surface the full recorded result.
- [artifact-bearing] A verdict mechanism and Session ID pair must differ from every authoring pair and record its outcome, revision, and relied-upon results.
- [artifact-bearing] Run every pre-admission repository check; a bug fix also binds one pre-fix failure and one post-fix pass for its added check.
- [artifact-bearing] Hooks require terminal results or one exact Operator bypass; review binds current base, lane revision, scope, and non-stale recorded evidence.
- [advisory] A shared branch is any remotely present branch plus the protected canonical branch; failing or non-terminal evidence blocks but preserves commits.

## Conflict & Integration Order

- [advisory] A Coordination_Task is a dependency-ordered group of immutable per-repository work units, not one cross-repository lane.
- [artifact-bearing] Each work unit retains repository, branch, worktree, scope, claim, epoch, fence, PR/review identity, checks, and handoff evidence; edges order units.
- [artifact-bearing] Re-read exact protected canonical state in the operation and resolve each conflict only in the claim-owning source lane.
- [artifact-bearing] Serialize overlapping authorities and integrate control/contract sources, implementation, consumers, generated projections, then mirrors.
- [artifact-bearing] Protected-source drift retires and reseals the waiting run; after two equal failures record root cause and name a different approach.
- [artifact-bearing] Fence drift or two possible publishers blocks; content mergeability never proves ownership safety.
- [artifact-bearing] Misplaced resolution raises `misplaced-conflict-resolution`; unresolved markers raise `unresolved-conflict-publish`; preserve all bytes.

## Promotion Chain

| Stage | Lane | Boundary |
|---|---|---|
| development source | integrated protected revision | integration boundary |
| production mirror | publication lane | publication boundary |
| delivery surface | immutable candidate | deployment boundary |

- [advisory] Promotion moves development source → delivery surface verification → production mirror publication; no stage implies the next.
- [artifact-bearing] Every boundary stays closed without an authenticated Operator instruction naming boundary, candidate, target, identity, and issue time; integration never deploys.
- [artifact-bearing] Seal one immutable candidate from source, dependency closure, target, review, artifact, and rollback point; one decision authorizes one attempt.
- [artifact-bearing] Publish the mirror only after separate passing runs prove deployed revision, public reachability, and authoritative state readback.
- [artifact-bearing] Record rollback trigger, target, terminal outcome, and separate code/state dispositions; drift invalidates the decision and requires resealing.
- [artifact-bearing] Authoring never mutates mirror or delivery; absent or failing publication proof blocks and enters rollback with both dispositions.

### Reference implementation profile — concrete promotion names

- [advisory] The development source is `knowgrph`, the production mirror is `huijoohwee/content/knowgrph`, and delivery routes are `airvio.co` and `airvio.co/knowgrph`.

## Findings & Rule Identity

| Family | Rule_IDs | Finding type | Severity | Ownership |
|---|---|---|---|---|
| scope | `authoring--write-scope#1-2`, `commit--attribution#3` | `out-of-scope-write` | blocker | inherited: Execution Companion |
| evidence | `lane-topology--admission#3`, `lane-topology--admission#5`, `verification-gates#1-4` | `evidence-without-run` | blocker | inherited: Execution Companion |
| independence | `verification-gates#2` | `self-graded-verdict` | blocker | inherited: Execution Companion |
| fence | `lane-topology--admission#4`, `lane-topology--admission#8`, `conflict--integration-order#6` | `stale-collaboration-fence` | blocker | inherited: Collaboration Module |
| promotion | `promotion-chain#2-6` | `deploy-boundary-breach` | blocker | inherited: Authoring Authority |
| admission | `lane-topology--admission#6`, `lane-topology--admission#9`, `preservation-recovery--cleanup#2-5` | `admission-snapshot-stale` | blocker | inherited: Lane Admission Module |
| concurrency | `lane-topology--admission#7`, `coordination-artifacts#3`, `conflict--integration-order#3-5` | `concurrent-write-conflict` | blocker | inherited: Execution Companion |
| neutrality | `lane-topology--admission#13` | `vendor-coupling` | major | inherited: Authoring Authority |
| conformance | `coordination-artifacts#2-5`, `findings--rule-identity#2` | `unimplemented-guideline` | major | inherited: Authoring Authority |
| attribution | `commit--attribution#1-2` | `unattributed-agentic-commit` | blocker | document-local |
| conflict | `conflict--integration-order#2`, `conflict--integration-order#7` | `misplaced-conflict-resolution` | blocker | document-local |
| conflict | `conflict--integration-order#7` | `unresolved-conflict-publish` | blocker | document-local |

- [advisory] Derive each Rule_ID as section anchor plus `#` plus the 1-based directive or boundary-row ordinal in document order.
- [artifact-bearing] Classify every rule once, list every raisable finding and raising Rule_ID, cover every artifact rule by a gate, and emit explicit zero type counts.
- [advisory] Reuse inherited names and severities unchanged; only marked document-local names extend the vocabulary.

## Validation Checklist

### Pre-lane

- Check `lane-topology--admission#3` from clean-base, scope, actor, overlap, and CAS evidence.
- Check `lane-topology--admission#7` and `coordination-artifacts#3` from the current normalized claim inventory.
- Check `lane-topology--admission#8`, `lane-topology--admission#9`, and `coordination-artifacts#2` from joined preservation records.
- Check `coordination-artifacts#4`, `coordination-artifacts#5`, and `lane-topology--admission#13` from schema and dependency scans.

### Per-commit

- Check `lane-topology--admission#4`, `authoring--write-scope#1`, and `commit--attribution#1` from current authority and commit metadata.
- Check `authoring--write-scope#2`, `commit--attribution#2`, and `commit--attribution#3` from byte snapshots, trailers, and manifest diff.
- Check `preservation-recovery--cleanup#2` and `preservation-recovery--cleanup#3` from verified captures and Operator decisions.

### Pre-push

- Check `verification-gates#1`, `verification-gates#2`, `verification-gates#3`, and `verification-gates#4` from terminal exact-revision results.
- Check `preservation-recovery--cleanup#4` and `preservation-recovery--cleanup#5` from immutable handoff and recovery evidence.

### Pre-promotion

- Check `lane-topology--admission#5`, `conflict--integration-order#2`, and `conflict--integration-order#3` from candidate and dependency receipts.
- Check `conflict--integration-order#4`, `conflict--integration-order#5`, `conflict--integration-order#6`, and `conflict--integration-order#7` from frontier and conflict evidence.
- Check `promotion-chain#2`, `promotion-chain#3`, and `promotion-chain#4` from the exact candidate and single-use decision.
- Check `promotion-chain#5` and `promotion-chain#6` from separate live claims and rollback dispositions.

### Post-run

- Check `lane-topology--admission#6` from the retirement receipt and preserved handoff identity.
- Check `findings--rule-identity#2` from full finding, gate, severity, and explicit-zero coverage.

### Reference implementation checker invocation

- Run `npm run git-guidelines:check`; it reads this document, five owners, four registrations, present coordination artifacts, and git facts.
- Exit zero means conformant, one means findings, two means degraded local input, and three means remote or verdict timeout.

## Anti-Patterns

- [advisory] Prohibited — authoring on the canonical branch.
- [advisory] Correct — move exact bytes into O1 ownership; otherwise raise `out-of-scope-write`.
- [advisory] Prohibited — an undeclared write scope.
- [advisory] Correct — admit O2 scope before writing; otherwise block as ambiguous.
- [advisory] Prohibited — a local-only lease used as cross-device authority.
- [advisory] Correct — join the current claim under C1 and C2; otherwise raise `evidence-without-run`.
- [advisory] Prohibited — an authoring mechanism grading its own lane.
- [advisory] Correct — use an independent Evaluator under O7; otherwise raise `self-graded-verdict`.
- [advisory] Prohibited — rewriting history without preserved bytes.
- [advisory] Correct — create O4 recovery evidence before rewrite; otherwise raise `unimplemented-guideline`.
- [advisory] Prohibited — deploying because integration is green.
- [advisory] Correct — keep O6 closed pending exact authority; otherwise raise `deploy-boundary-breach`.
- [advisory] Prohibited — reusing stale authorization.
- [advisory] Correct — reseal and reauthorize under O6; otherwise raise `deploy-boundary-breach`.
- [advisory] Prohibited — treating an expired authority as abandoned bytes.
- [advisory] Correct — preserve `dormant-preserved` under O4 and recover without the expired lease.

## Mantra

- [advisory] O1 — one clean canonical lane, isolated task lanes, and exact branch identity.
- [advisory] O2 — files project authority; authenticated monotonic receipts own it.
- [advisory] O3 — every agentic commit states task, scope, epoch, mechanism, what, and why.
- [advisory] O4 — preserve first, recover exactly, and remove only by recorded authority.
- [advisory] O5 — resolve at the source and integrate by dependency before projection.
- [advisory] O6 — integration is not deployment; one exact decision opens one attempt.
- [advisory] O7 — deterministic independent evidence decides conformance, never confidence.
