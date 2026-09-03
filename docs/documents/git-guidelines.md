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

- [advisory] [`boundary--ownership`](#boundary--ownership) — ownership family; all stages.
- [advisory] [`glossary`](#glossary) — shared-term family; all stages.
- [advisory] [`load-budget`](#load-budget) — load-routing family; session start.
- [advisory] [`lane-topology--admission`](#lane-topology--admission) — lane family; lane admission.
- [advisory] [`coordination-artifacts`](#coordination-artifacts) — O2; admission, authoring, push, integration, cleanup.
- [advisory] [`authoring--write-scope`](#authoring--write-scope) — write-scope family; authoring, commit.
- [advisory] [`preservation-recovery--cleanup`](#preservation-recovery--cleanup) — O4; authoring, recovery, cleanup.
- [advisory] [`commit--attribution`](#commit--attribution) — attribution family; commit.
- [advisory] [`verification-gates`](#verification-gates) — verification family; push, review.
- [advisory] [`conflict--integration-order`](#conflict--integration-order) — conflict family; review, integration.
- [advisory] [`promotion-chain`](#promotion-chain) — promotion family; promotion.
- [advisory] [`findings--rule-identity`](#findings--rule-identity) — R12; integration, promotion, recovery.
- [advisory] [`validation-checklist`](#validation-checklist) — validation family; commit, push, promotion.
- [advisory] [`anti-patterns`](#anti-patterns) — anti-pattern family; review.
- [advisory] [`mantra`](#mantra) — owned-family summary; review.

## Glossary

| Term | Meaning | Class |
|---|---|---|
| Canonical_Lane | The one clean, non-authoring checkout at the exact protected canonical revision. | advisory |
| Task_Lane | One isolated branch and worktree for one declared semantic scope, claim, epoch, and fence. | advisory |
| Current_Authority | Authenticated remote authority accepted by monotonic compare-and-swap for one write set. | advisory |
| Waiting_Successor | A non-writing overlapping request ordered behind the current authority. | advisory |
| Dormant_Preserved | Expired non-writing authority whose revision, review identity, evidence, and bytes remain preserved. | advisory |
| Coordination_Task | A dependency-ordered group of immutable per-repository work units with no shared lane authority. | advisory |
| Recovery_Handle | A completed recovery-capture directory name or a verified immutable bundle filename. | advisory |
| Reference_Implementation_Block | A heading or block whose own text contains the words “reference implementation”. | advisory |
| Blocked_Outcome | Own output names a closed condition and path, claim, or revision; pre/post head, index, tracked, and untracked digests match. | advisory |
| `exact-refresh-proof` | ≤16 same-subject 1st-parent merges; event-bound tip/strict ancestors; divergent base/exact tree; authority=head/scope/epoch; terminal independently valid. | advisory |

## Load Budget

| Stage | Sections | Class |
|---|---|---|
| session start | `module-index`, `boundary--ownership`, `glossary`, `load-budget` | advisory |
| lane admission | `lane-topology--admission`, `coordination-artifacts` | advisory |
| authoring | `authoring--write-scope`, `coordination-artifacts`, `preservation-recovery--cleanup` | advisory |
| commit | `commit--attribution`, `authoring--write-scope`, `validation-checklist` | advisory |
| push | `verification-gates`, `coordination-artifacts`, `validation-checklist` | advisory |
| review | `verification-gates`, `conflict--integration-order`, `anti-patterns`, `mantra` | advisory |
| integration | `conflict--integration-order`, `coordination-artifacts`, `findings--rule-identity` | advisory |
| promotion | `promotion-chain`, `validation-checklist`, `findings--rule-identity` | advisory |
| recovery | `preservation-recovery--cleanup`, `findings--rule-identity` | advisory |
| cleanup | `preservation-recovery--cleanup`, `coordination-artifacts` | advisory |

## Lane Topology & Admission

| Identity field | Projection | Class |
|---|---|---|
| Actor ID | Authenticated claim actor | advisory |
| Device ID | Accepted claim device plus branch device segment | advisory |
| Session ID | Accepted claim session | advisory |
| Worktree ID | Registered worktree path and git common-directory identity | advisory |
| Branch ID | Remotely addressable task ref | advisory |
| Scope ID | Declared write-scope semantic scope | advisory |
| Lease Epoch | Accepted claim's monotonic epoch | advisory |
| Fence Revision | Accepted claim's current fence digest | advisory |

| Lane class | Observable derivation | Class |
|---|---|---|
| `canonical` | Registered canonical branch, exact protected head, no scope artifact, and no accepted authoring claim. | advisory |
| `overlapping` | Registered branch and head whose declared scope artifact overlaps a live accepted claim result. | advisory |
| `disjoint-attributed` | Registered branch and head whose parseable scope artifact is disjoint and joined to an accepted claim. | advisory |
| `ambiguous` | Branch registration, head, scope artifact, or accepted claim is absent, duplicate, stale, or unparseable. | advisory |

- [artifact-bearing] Keep exactly one Canonical_Lane and zero or more Task_Lanes; one Actor ID, Device ID, and Session ID triple is the sole live writer per lane.
- [artifact-bearing] Name a Task_Lane `agent/<device-id>/<semantic-scope>` at most 200 chars; each segment is 1–64 lowercase letters, digits, or hyphens.
- [artifact-bearing] Keep the Canonical_Lane at the exact protected revision with zero staged, unstaged tracked, or untracked bytes and no source authoring.
- [artifact-bearing] Undeclared or unparseable future scope is `ambiguous`, overlaps every peer, and blocks admission without changing bytes.
- [artifact-bearing] `claim(scope)` uses clean exact base, normalized scope, authenticated actor, no overlap, and monotonic CAS; first write requires its covering claim and ≤24-hour lease.
- [artifact-bearing] Snapshot pre/post head/branch/index/tracked/untracked bytes, registration/lease/fence/recovery/shared state; only candidate deltas and joined Admission/Preservation Receipts vary.
- [artifact-bearing] Overlap names each live claim and Device ID, retains a non-writing waiting successor, and blocks until authenticated retirement, handoff, or reclaim.
- [artifact-bearing] Authoring begun on protected canonical preserves exact tracked and untracked bytes in an owned Task_Lane and restores canonical parity before commit.
- [artifact-bearing] A dirty canonical base needs a recorded Recovery_Handle (complete capture or verified bundle), byte-equal transfer, exact base revision, and every other admission condition.
- [artifact-bearing] Browser or mobile projects only an accepted claim digest and lease epoch; absent proof blocks and creates no independent authority.
- [artifact-bearing] An unprojectable Collaboration_Identity field is named in a Blocked_Outcome while all committed and uncommitted bytes stay unchanged.
- [artifact-bearing] Expired or regressed local lease authority blocks writes until a fresh accepted claim and lease, retaining all lane bytes unchanged.
- [artifact-bearing] Any failed admission condition names the failure and preserves the pre-request state: no branch, ref, working, or untracked byte changes.
- [artifact-bearing] Protected upstream permits unlimited pairwise-disjoint current authorities; each overlap has one writer and non-writing waiting successors.
- [artifact-bearing] `continue(claim)` revalidates immutable claim/revision/review/scope/epoch/fence/authenticated authority; dormant recovery ignores expired lease and adopts no peer mutable bytes.
- [artifact-bearing] `integrate(candidate)` joins one reviewed immutable candidate, dependency closure, named checks, handoff evidence, and current claim through monotonic CAS.
- [artifact-bearing] Each root operation emits a typed digest-bound receipt; authenticated `retire(claim)` alone ends authority, preserving revision, review, bytes, checks, and handoff evidence.

## Coordination Artifacts

| Artifact or field | Required shape | Class |
|---|---|---|
| Location | Target repository root `.coordination/` only. | advisory |
| Encoding | One UTF-8 JSON file at most 64 KiB. | advisory |
| Declared scope | `agentic-declared-write-scope/v1`. | advisory |
| `semanticScope` | One lowercase-letter, digit, or hyphen value of 3–64 characters. | advisory |
| `paths` | 1–4096 unique repository-relative paths, each at most 512 chars, ascending by bytes. | advisory |
| Claim request | `agentic-cloud-collaboration-request/v1`. | advisory |
| Request identity | Non-empty repository, work item, base, lane, scope, actor, device, and session. | advisory |
| Request lease | Monotonic non-negative epoch and absolute UTC expiry no later than 24 hours after issue. | advisory |
| Accepted claim | `agentic-cloud-collaboration-result/v1`; action is claim, renew, park, review-ready, delivery-authorize, handoff, or release. | advisory |
| `claim.state` | Exactly `active`, `review-ready`, `delivery-authorized`, `parked`, `released`, `expired`, or `revoked`. | advisory |
| `admissionDecision` | Derived as `accepted`, `blocked`, `expired`, or `released`; never stored. | advisory |
| Claim identity | Non-empty claim, write-set, fence, ledger, and receipt digests plus lease epoch. | advisory |
| Claim join | Lease epoch and declared write scope equal the answered request. | advisory |
| Filename | `<semantic-scope>-<artifact-role>.json`; role is write-scope, request, claim, or receipt. | advisory |

- [artifact-bearing] Require every declared-scope, request, and accepted-result schema and field above with no duplicate or unknown field.
- [artifact-bearing] Match each filename's semantic scope and role to its content before treating the artifact as authority.
- [artifact-bearing] Join scope, request, claim, lease epoch, declared write set, and all recorded digests exactly.
- [artifact-bearing] Normalize `.` and `..` and trailing separators; equality, ancestry, shared semantics, wildcards, and undecidable scope all overlap.
- [artifact-bearing] A local-only lease proves no cross-device authority; block until the protected remote exposes the same scope and epoch.
- [advisory] Require only git remotes and local filesystem access; forbid daemons, databases, paid dependencies, services, or polling locks.
- [artifact-bearing] Define online as a configured-remote probe succeeding within 10 seconds; failure or timeout is offline.
- [artifact-bearing] Offline permits local commits only in an owned Task_Lane whose accepted claim has not expired.

- [artifact-bearing] Offline without a covering claim blocks branch authoring, claim acquisition, review dispatch, handoff, and integration.
- [artifact-bearing] Online authoring requires a covering unexpired accepted claim whose fence equals the current accepted fence.
- [artifact-bearing] Reconnect fetches protected heads and proves the recorded canonical base and lane revisions still resolve identically.
- [artifact-bearing] Before reconnect publication, require `claim.state: active`, future expiry, and a fence equal to the current accepted fence.
- [artifact-bearing] Cap every local lease at 24 hours from issuance; a local clock cannot extend authority.
- [artifact-bearing] Absent, unreadable, unparseable, expired, stale, duplicate, or fence-divergent artifacts block before mutation.
- [artifact-bearing] Every such block surfaces its condition and causing artifact or claim as a Blocked_Outcome while all four byte states match.

## Authoring & Write Scope

- [artifact-bearing] Before every mutation batch, join the exact current claim, normalized declared scope, local lease, fence, and exact Change_Manifest path set.
- [artifact-bearing] Record one logical unit per commit: exactly one task and semantic scope, independently revertable from every peer commit.
- [artifact-bearing] Stage only explicit repository-relative paths or selected interactive hunks.
- [advisory] Forbid directory-wide and repository-wide wildcard staging even when every observed path appears in scope.
- [artifact-bearing] Require every changed path to equal or descend from one path in the admitted declared write scope.
- [artifact-bearing] Update the active lane's Change_Manifest before each commit is recorded.
- [artifact-bearing] Make manifest `paths` equal the sorted set changed since `baseSha`, including every incidental path and no unmodified path.
- [artifact-bearing] Attach `out-of-scope-write` to the commit and name every path outside the declared scope.
- [artifact-bearing] Keep that commit recoverable and block shared push until scope is re-admitted or the offending paths are removed.
- [advisory] Permit amend only for an unpushed commit authored in the current Task_Lane.
- [advisory] Forbid amend after push or when another lane authored the commit.
- [advisory] Record any correction to a pushed or other-lane commit as a new independently revertable commit.

- [artifact-bearing] If canonical carries dirt, record a Recovery_Handle (complete capture or verified bundle) before Task_Lane admission.
- [artifact-bearing] Move the exact tracked and untracked bytes into the requesting owned Task_Lane with the exact base revision recorded.
- [artifact-bearing] Prove every moved byte equal to capture and restore canonical to zero staged, unstaged tracked, and untracked bytes before commit.
- [advisory] A private local commit records progress only; shared authority also needs a remote branch, review identity, and required-check path.

## Preservation, Recovery & Cleanup

| Artifact or location | Contract | Class |
|---|---|---|
| `.backups/` | Immutable Bundle_Backups retained to an exact Operator removal decision. | advisory |
| `.agentic-manifests/` | Active lane `agentic-change-manifest/v1` records. | advisory |
| `.recovery/` | Recovery_Capture directory `<semantic-scope>-<yyyymmdd>T<hhmm>Z` in UTC. | advisory |
| Capture contents | Manifest, tracked patch, retained untracked files, then `.complete`. | advisory |
| Recovery_Handle | Exact complete capture directory or verified Bundle_Backup filename. | advisory |

- [artifact-bearing] Never modify a written Bundle_Backup; retain it until an Operator decision names that exact file for removal.
- [artifact-bearing] Name it `<repository>-<semantic-scope>-<short-revision>-<yyyymmdd>.bundle`; use a distinct name and never overwrite or truncate.
- [artifact-bearing] Before hard reset, discarding switch, rebase, merge, stash apply/drop, or untracked clean, stash dirt as `WIP: <semantic-scope>`.
- [artifact-bearing] Also create a unique Bundle_Backup proven readable and containing the captured revision before that working-tree rewrite.
- [artifact-bearing] Record Change_Manifest schema `agentic-change-manifest/v1` with branch, `baseSha`, and path-text lexicographic `paths`.
- [artifact-bearing] Name each Recovery_Capture `<semantic-scope>-<yyyymmdd>T<hhmm>Z` with its timestamp at UTC minute precision.
- [artifact-bearing] Write the Recovery_Capture manifest first.
- [artifact-bearing] Write its tracked patch second.
- [artifact-bearing] Write every retained untracked file third.
- [artifact-bearing] Write `.complete` last; without it the capture is incomplete and satisfies no Recovery_Handle obligation.
- [artifact-bearing] Park for handoff only after pushing the lane revision with a current Change_Manifest and recorded Recovery_Handle.
- [artifact-bearing] Permit a still-active lane to create and record a Recovery_Handle before parking.
- [artifact-bearing] Before history rewrite, multi-artifact deletion, or untracked discard, record one Operator decision naming operation, lane, and paths.
- [artifact-bearing] One per-occurrence decision authorizes no other occurrence.
- [artifact-bearing] Before removal, record `keep`, `port`, or `drop` with exact identity, evidence, and rationale.
- [artifact-bearing] Restore only from a completed capture and prove byte equality for every manifest path, including modes and links.
- [artifact-bearing] A Recovery_Handle is exactly one complete capture directory or one readable bundle proven to contain the captured revision.
- [artifact-bearing] Missing bundle, manifest, decision, retained file, or `.complete` blocks, names the artifact, and leaves tracked and untracked bytes unchanged.
- [artifact-bearing] Any restore mismatch blocks, retains the capture and pre-restore bytes, and names every differing path.

## Commit & Attribution

| Type | Selection condition | Class |
|---|---|---|
| `feat` | Adds externally observable behavior. | advisory |
| `fix` | Corrects defective behavior. | advisory |
| `docs` | Changes documentation only. | advisory |
| `test` | Changes verification only. | advisory |
| `refactor` | Changes structure without behavior. | advisory |
| `chore` | Changes maintenance metadata or tooling. | advisory |

| Trailer | Required value | Class |
|---|---|---|
| `Agentic-Task` | Exact task identifier | advisory |
| `Agentic-Scope` | Admitted semantic scope | advisory |
| `Agentic-Lease-Epoch` | Current claim epoch | advisory |
| `Agentic-Mechanism` | Acting agent mechanism | advisory |
- [artifact-bearing] Use `<type>(<scope>): <summary>` on one line at most 72 chars; type is from the closed table, scope is admitted, and summary is 1–60 chars.
- [artifact-bearing] Use 1–200-char trailer lines once; authored scope/epoch match claim; `exact-refresh-proof` joins head/scope, inherits one valid terminal block; squash one block; never aggregate.
- [artifact-bearing] State what changed and why in the body; only bare `exact-refresh-proof` inherits its terminal body; forbid a body that only restates the subject.
- [artifact-bearing] Missing, duplicate, empty, >200-char, or escaped `\n` trailers outside `exact-refresh-proof` raise `unattributed-agentic-commit`; retain bytes and re-record before push.
- [artifact-bearing] A malformed or over-72-character subject resolves as a Blocked_Outcome naming the violated constraint until corrected.
- [advisory] Consume commit, push, and deploy sequences only from the Delivery Guidelines owner named in the boundary table.

## Verification Gates

| Result field | Required value | Class |
|---|---|---|
| check | Registered check name | advisory |
| revision | Exact revision checked | advisory |
| status | Terminal exit status | advisory |
| summary | Pass/fail counts or test summary | advisory |
| completed | Completion instant | advisory |

- [artifact-bearing] Before remote or protected-canonical push, run `git-guidelines-conformance(<exact-revision>)` to terminal status within 60 seconds.
- [artifact-bearing] Record check name, exact revision, terminal status, summary, and completion time in the pushing mechanism's own output.
- [artifact-bearing] Evaluator mechanism and Session ID must differ from every Implementer pair and record outcome, pair, lane revision, and relied results.
- [artifact-bearing] Run every verification command registered before lane admission, plus the lane's new check, to a terminal recorded result.
- [artifact-bearing] A bug fix binds one failing pre-fix and one passing post-fix terminal result for its added check before shared landing.
- [artifact-bearing] Run pre-commit and pre-push hooks on the exact revision, or record one Operator bypass naming the hook and revision.
- [artifact-bearing] Review binds current protected base, exact lane revision, and admitted scope token; any absent or differing binding blocks.
- [artifact-bearing] Assertion without a recorded run or evidence for another revision raises `evidence-without-run` and blocks push or review.
- [artifact-bearing] A verdict from an authoring mechanism and Session ID pair raises `self-graded-verdict` and blocks pending independence.
- [artifact-bearing] Failure to record a finding classification weakens no other gate and blocks after all gate evaluations complete.
- [artifact-bearing] Every other named check states its own maximum duration in seconds; exceeding any stated maximum is non-terminating.
- [artifact-bearing] Failed, absent, or non-terminal required checks block push and review while committed bytes remain recoverable.
- [artifact-bearing] Hook bypass without its per-occurrence Operator decision blocks commit or push while committed bytes remain recoverable.

## Conflict & Integration Order

| Dependency class | Integration position | Class |
|---|---|---|
| control / contract source | 1 | advisory |
| implementation source | 2 | advisory |
| consumer | 3 | advisory |
| generated projection | 4 | advisory |
| mirror | 5 | advisory |

- [artifact-bearing] Re-read exact protected canonical in the same operation, rebase or merge it, and record that revision in the integration request.
- [artifact-bearing] Resolve each conflict only in the lane whose accepted claim covers its source path, never in a consumer, projection, or mirror.
- [artifact-bearing] Serialize overlapping scopes: one accepted claim holds the paths; every peer blocks until release, handoff, or retirement.
- [artifact-bearing] Content mergeability proves no ownership safety.
- [artifact-bearing] A Coordination_Task orders immutable repository units; block later classes while an earlier owner claim has not integrated.
- [artifact-bearing] Canonical drift at rebase, review, or candidate time preserves bytes, retires the waiting run, and reseals from current protected state.
- [artifact-bearing] After the same operation on the same lane and paths fails twice, record root cause and a different approach before retry.
- [artifact-bearing] Fence mismatch against the current accepted claim raises `stale-collaboration-fence` and blocks.
- [artifact-bearing] After authenticated retirement serializes ownership, the survivor may proceed only on the current accepted claim fence.
- [artifact-bearing] If two lanes could publish one path by equality, ancestry, shared semantics, or wildcard, serialize ownership or retire one.
- [artifact-bearing] Non-owner resolution raises `misplaced-conflict-resolution`, blocks, and retains the resolving lane as recoverable bytes.
- [artifact-bearing] Publishing tracked unresolved conflict content raises `unresolved-conflict-publish`, blocks, and leaves lane bytes unchanged.
- [artifact-bearing] Order pending overlaps by dependency class, then lowest lease epoch, then byte-lexicographic Scope ID; ties are reproducible.

## Promotion Chain

| Stage | Lane | Boundary | Class |
|---|---|---|---|
| Dev_Repository | integrated protected revision | integration boundary | advisory |
| Prod_Mirror | publication lane | publication boundary | advisory |
| Delivery_Surface | immutable candidate deployment lane | deployment boundary | advisory |

| Stage | Rollback trigger → target → terminal outcome → dispositions | Class |
|---|---|---|
| Dev_Repository | identity drift → current protected revision → candidate resealed → code retain/revert; state retain | advisory |
| Prod_Mirror | publication failure → last verified mirror → readback matches → code revert; state reconcile or name irreversible mutation | advisory |
| Delivery_Surface | failed live claim → rollback point → delivery reads rollback → code revert; state restore or name irreversible migration | advisory |

- [advisory] Promotion_Chain moves Dev_Repository → Prod_Mirror → Delivery_Surface; live verification precedes mirror publication and no stage implies the next.
- [artifact-bearing] Every boundary is closed absent a parseable matching instruction naming Operator, boundary, candidate, target stage, and issue time.
- [artifact-bearing] Protected integration grants integration only; authoring mutation of Prod_Mirror or Delivery_Surface raises `deploy-boundary-breach`.
- [artifact-bearing] Seal one candidate from six identities: source, dependency closure, target, review, artifact, rollback point; reseal supersedes it.
- [artifact-bearing] A decision names Operator, one candidate, and one target for one attempt; missing, mismatched, automated-only, or consumed authority breaches and blocks.
- [artifact-bearing] Publish only after separate runs record passing deployed-revision, public-route, and authoritative-state-readback claims; never aggregate them.
- [artifact-bearing] Any non-drift receipt error may invalidate authorization and retire on drift terms; failed, absent, or unrecordable claims block publication and enter table rollback.
- [artifact-bearing] Identity drift invalidates authorization and forbids retarget/rebuild; unaffected work may continue in `authoring`, but redeploy needs fresh candidate, review, authorization.
### Reference implementation and inspiration-only profile

- [advisory] Profile: `agentic-graph` → `airvio.co`/`airvio.co/agentic-graph` → `huijoohwee/content/agentic-graph`; verify with `npm run git-guidelines:check`.
- [advisory] [yjs/yjs](https://github.com/yjs/yjs) inspires neutral observation and convergence only; this contract is independently authored.
- [artifact-bearing] Forbid copied code, prose, schema, tests, examples, algorithms, names, dependencies, imports, runtime reliance, or external authority.

## Findings & Rule Identity

- [advisory] Derive each Rule_ID from its section anchor plus `#` and the 1-based directive bullet or classified table-row ordinal in document order.
- [artifact-bearing] Classify every rule once, list every raisable finding and raising Rule_ID, cover every artifact rule by a gate, and emit explicit zero type counts.
- [advisory] Reuse every inherited name and current owner severity unchanged; only an explicit document-local marker extends the vocabulary.
- [advisory] List every raisable finding type exactly once and every raising Rule_ID in at least one row, in both coverage directions.
- [advisory] Give each row its rule family, raising Rule_IDs, type, severity, and inherited owner or document-local marker.
- [advisory] The only document-local types are `unattributed-agentic-commit`, `misplaced-conflict-resolution`, and `unresolved-conflict-publish`.
- [advisory] Draw severity only from `minor`, `major`, and `blocker`; define no alternative severity.
- [advisory] Emit a `typeCounts` key for every registry type, including explicit zero values.
- [advisory] Missing or multiple classifications name the offending rule and make conformance fail.
- [advisory] Duplicate Rule_IDs or ordinals differing from counted document position name the offending identity and fail.
- [advisory] Any consumed finding name or severity differing from its named current owner is owner divergence and fails closed.

| Family | Rule_IDs | Finding type | Severity | Ownership | Class |
|---|---|---|---|---|---|
| scope | `authoring--write-scope#1-3`, `authoring--write-scope#5-9`, `authoring--write-scope#13-15` | `out-of-scope-write` | major | inherited: Execution Companion | advisory |
| evidence | `verification-gates#6-13`, `verification-gates#15-18`, `preservation-recovery--cleanup#6-24` | `evidence-without-run` | blocker | inherited: Execution Companion | advisory |
| independence | `verification-gates#8`, `verification-gates#14` | `self-graded-verdict` | blocker | inherited: Execution Companion | advisory |
| fence | `coordination-artifacts#15-19`, `coordination-artifacts#21-29`, `conflict--integration-order#13-14` | `stale-collaboration-fence` | blocker | inherited: Collaboration Module | advisory |
| promotion | `promotion-chain#8-14` | `deploy-boundary-breach` | blocker | inherited: Authoring Authority | advisory |
| admission | `lane-topology--admission#15`, `lane-topology--admission#18-25`, `lane-topology--admission#27-29` | `admission-snapshot-stale` | blocker | inherited: Lane Admission Module | advisory |
| concurrency | `lane-topology--admission#13-29`, `conflict--integration-order#6-18` | `concurrent-write-conflict` | major | inherited: Execution Companion | advisory |
| neutrality | `promotion-chain#17` | `vendor-coupling` | major | inherited: Authoring Authority | advisory |
| conformance | `findings--rule-identity#2` | `unimplemented-guideline` | major | inherited: Authoring Authority | advisory |
| attribution | `commit--attribution#11-15` | `unattributed-agentic-commit` | blocker | document-local | advisory |
| conflict | `conflict--integration-order#7`, `conflict--integration-order#16-17` | `misplaced-conflict-resolution`, `unresolved-conflict-publish` | blocker | document-local | advisory |

## Validation Checklist

### Pre-lane
- [advisory] Check `lane-topology--admission#13-29` from clean base, branch, identity, scope, claim, snapshots, operations, and receipts.
- [advisory] Check `coordination-artifacts#15-19`, `coordination-artifacts#21-29`, `promotion-chain#17` from bounded schemas, probe, fence, and dependency scans.
### Per-commit
- [advisory] Check `authoring--write-scope#1-3`, `authoring--write-scope#5-9`, `authoring--write-scope#13-15`, `commit--attribution#11-15` from claim, diff, manifest, and message.
### Pre-push
- [advisory] Check `preservation-recovery--cleanup#6-24`, `verification-gates#6-18` from captures, decisions, hooks, and exact-revision results.
### Pre-promotion
- [advisory] Check `conflict--integration-order#6-18` from protected frontier, claims, ownership, conflicts, and comparator evidence.
- [advisory] Check `promotion-chain#8-14` from boundary instruction, candidate, single-use decision, three live claims, and rollback dispositions.
### Post-run
- [advisory] Check `findings--rule-identity#2` from bidirectional findings, gate, owner severity, Rule_ID, and explicit-zero coverage.

### Reference implementation checker invocation

- [advisory] Run `npm run git-guidelines:check`; its entry point is `huijoohwee.github.io/scripts/check-git-guidelines.mjs`.
- [advisory] It reads this document, five owners, four registrations, present coordination artifacts, and git facts.
- [advisory] Exit zero means conformant; one means findings; two means degraded local input; three means remote or verdict timeout.


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
