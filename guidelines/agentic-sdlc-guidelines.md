---
title: "Agentic SDLC Guidelines"
doc_type: "Guidelines"
version: "1.23.0"
date: "2026-08-28"
lang: "en-US"
frontmatter_contract: "required"
owner: "Orchestrator function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
runtime_readiness_policy: "fail-closed"
upstream_blocking_policy: "prevent-not-bypass"
lifecycle_status: "proposed"
---
# Agentic SDLC Guidelines
## Scope & Neutrality Contract
- **Universal**: these guidelines apply to any product, domain, language, or runtime, and to any agent implementation; nothing here assumes a specific company, repository, file path, model, framework, or vendor.
- **Neutral**: name agents, roles, and mechanisms by their function, never by a brand. Where a concrete tool is shown, it appears only under a heading or block whose own text contains the words "reference implementation", and may be swapped for any equivalent.
- **Agnosticity**: every rule is evaluated from document content and parsed frontmatter only — never from file names, directory layout, or downstream mirrors. Examples use placeholders (`[...]`) rather than real identifiers.
- **Simple**: where two mechanisms discharge the same rule at equivalent rigor, the one with fewer moving parts, fewer new concepts, and fewer configurable knobs is conformant and the other is not required; a rule that a plain check can discharge must never be discharged by a bespoke framework instead.
- **Modular**: each `##` section is self-contained and addressable by its heading anchor (see Module Index). Sections may be lifted into another guideline set without rewriting their internals.
- **Enforceable**: every rule is written so a conformance check can record a typed finding against it (see Execution Conformance Findings). A statement that cannot be violated observably is guidance, not a rule, and is labelled as such.
- **Complementary**: this set owns **execution**. Authoring — what a PRD, TAD, or ADR must contain, the Readiness Ladder, the Rule ID scheme, and the authoring-domain finding vocabulary — is owned by the **PRD, TAD & ADR Guidelines** companion set. This set does not restate those rules; it names them and consumes them.
- **Adaptive**: rules scale their evidence to the size and kind of the change, and the artifact chain may collapse or reorder its phases, but a rule never adapts away the obligation it encodes. Scaling evidence is conformant; eliding a coverage obligation, a bound, an independent verdict, or a gate is not.
- **Autonomous**: after the Operator supplies an objective, scope, bounds, and the capabilities needed to act, the Orchestrator continues through every safe, in-scope, dependency-ready step without requesting clerical confirmation. It derives and transports machine tokens, digests, commands, retries, and idempotent continuations internally. Autonomy never invents a missing product choice, widens scope or capability, crosses a promotion boundary, or authorizes a new irreversible effect.
## Module Index
- `scope--neutrality-contract` — universality, neutrality, agnosticity, modularity, enforceability, complementarity rules
- `boundary-with-the-authoring-set` — what this set owns, what it consumes, and where the seam sits
- `agent-roles--independence` — the four execution roles and the independence rule that must not collapse
- `specification-to-task-bridge` — how baselined documents become an executable task list
- `task-model` — task identity, minimum-resource core-value granularity, dependency graph, orchestration-reasoned completion-time estimation, and state vocabulary
- [Scoped Concurrent Lane Admission](./agentic-sdlc-scoped-lane-admission.md) — additive authoring admission, authoritative write-scope comparison, remote fencing, and preservation proof
- `execution-contract` — what an agent receives, what it must surface, and what closes a task
- `tool-permission--blast-radius` — capability classes, escalation, and irreversibility rules
- `per-task-budgets` — token, iteration, wall-clock, and context bounds per task
- `verification-strategy` — test obligations, property-based testing, and evidence emission
- `checkpoint--recovery` — resumability, compaction survival, and partial-failure handling
- [Autonomous Continuation & Interaction Economy](./agentic-sdlc-autonomous-continuation.md) — bounded autonomous progress, decision-versus-transport separation, and minimum necessary Operator interruption
- `human-in-the-loop-gates` — which decisions an agent must not make alone
- `global-release-control-rule` — universal control boundary for every enrolled repository and deployment target
- `dependency-ordered-integration` — canonical-frontier planning, no-op detection, dependency waves, and exact integration closure
- `atomic-lane-convergence` — one externally simple controller for integration, preservation, recovery, retirement, and minimal active-lane closure through modular adapters
- [Proportionate Closeout](./agentic-sdlc-proportionate-closeout.md) — least-powerful outcome selection, disjoint progress, exact evidence reuse, and retained cleanup
- [End-to-End Production Release Lifecycle](./agentic-sdlc-production-release-lifecycle.md) — provider-neutral release frontiers, adapter ports, joined receipts, exact authorization, state reconciliation, transport-separated verification, rollback, publication, and cleanup
- `runtime-readiness-enforcement` — fail-closed derivation of layer-specific runtime claims from joined evidence, with the repository audit profile in the companion module
- `upstream-dependency-admission` — companion module for early admission, bounded deferral, and disjoint-work continuation
- `execution-conformance-findings` — the execution-domain finding vocabulary and severities
- `execution-load-budget` — phase-scoped loading of this set
- [Rapid MVP Sprint Profile](./agentic-sdlc-rapid-mvp-sprint.md) — reference-implementation phase-collapse mapping for a declared, time-boxed sprint clock, and what a collapse may never elide
- `validation-checklist` — pre-execution, per-task, and post-run gates
- [Execution Anti-Pattern Guards](./agentic-sdlc-anti-pattern-guards.md) — prohibited execution patterns and their corrections
- `mantra-application` — the framing mantra
- [Cloud-Authoritative Collaboration](./agentic-sdlc-cloud-collaboration.md) — provider-neutral multi-device claims, fencing, offline admission, and remote runtime-readiness
- [Specification Chain](./agentic-sdlc-specification-chain.md) — artifact roles, the requirements-design-tasks seams, re-derivation cascade, phase-advance authority, and seam-preserving adaptation; [Artifact Continuity](./agentic-sdlc-artifact-continuity.md) — CID-to-RAO coverage, companion-artifact joins, outcome evidence, revision freshness, and successor feedback
- `specification-chain-phases` — the mandatory execution seam over that chain
## Boundary with the Authoring Set
The two sets meet at a single seam: **a baselined document pair with derived VCCs on one side, an executable task list with recorded Evidence References on the other.**
| Concern | Owner | This set's relationship |
|---|---|---|
| Document contents, non-native-input Codebase Grounding Records, templates, phase gates | Authoring set | Consumes as precondition |
| Readiness Ladder and rung derivation | Authoring set | Writes Evidence References that the ladder reads |
| Rule ID scheme and artifact-bearing classification | Authoring set | Reuses unchanged for execution rules |
| Finding recording contract, severities, determinism | Authoring set | Reuses unchanged; extends the type enumeration only |
| VCC primitive and Evidence Reference shape | Authoring set | Produces Evidence References during execution |
| Pain-point-to-monetization ranking of candidate VCCs (provable demand, solution, feature, time-to-first-dollar) | Authoring set | Consumes the resulting order; breaks ties among equally-ready candidates locally per Task Model's Granularity, with the reasoning trail recorded |
| Diagram identity, class, notation, and canvas projection rules | Authoring set's diagram companion modules | Obeys; emits the projection check result as an Evidence Reference |
| Lane topology and Deploy Boundary | Authoring set | Obeys; never promotes across a boundary |
| CID-to-RAO artifact continuity | Shared continuity module | Verifies joined planning, authoring, execution, demonstration, and successor references |
| Task decomposition, state, and ordering | **This set** | Owns |
| Agent roles and evaluator independence mechanics | **This set** | Owns |
| Tool permissions and blast radius | **This set** | Owns |
| Per-task budgets and circuit-breakers | **This set** | Owns |
| Checkpointing and recovery | **This set** | Owns |
| Execution-to-release handoff | **This set** | Emits an Integration Receipt; never promotes |
| Release orchestration and delivery adapters | Lifecycle controller | Consumes the receipt only after execution closes |
**Directives**:
- Treat a baselined document pair with zero open `blocker` findings, including a current Codebase Grounding Record for every externally authored, generated, or imported specification input, as the entry precondition for execution; reject dispatch when a material current-state claim used to justify baseline, execution, or readiness is `contradicted`, `absent`, or `unverified`, and return the conflict to the authoring loop rather than repairing it downstream
- Reuse the authoring set's Rule ID derivation and finding recording contract verbatim; forbid a second, parallel conformance vocabulary
- Forbid either set redefining a Finding Type the other owns; the conformance vocabulary is the union of the two enumerations
- Name the companion set wherever a rule crosses the seam; forbid an execution rule that silently assumes an authoring rule the reader has not been pointed at
- Apply the Artifact Continuity companion to every authoring-to-execution handoff; forbid dispatch from an unjoined or stale CID-to-RAO lineage
- Close execution with a verified Integration Receipt before invoking a release controller; forbid an Implementer task from preparing, authorizing, or deploying a release
## Agent Roles & Independence
Four execution roles. Roles are **functions**, not people and not necessarily separate processes — except where the independence rule says otherwise.
| Role | Owns | Must not |
|---|---|---|
| **Orchestrator** | Reads the task list, dispatches ready tasks, records state transitions, enforces budgets and concurrency | Write product code, run product tests, or judge task completion |
| **Implementer** | Performs one task: writes code, writes tests, runs them, surfaces output | Mark its own task complete, alter the task list, or widen its own permissions |
| **Evaluator** | Judges each VCC against surfaced output only, records the Evidence Reference, emits findings | Modify the artifact it judges, or accept a verdict it derived from unsurfaced state |
| **Operator** | Supplies scope decisions, approves promotion, resolves escalations | Be inferred, defaulted, scheduled, or simulated |
### The Independence Rule
**The Evaluator must be a different mechanism from the Implementer.** This is the one role separation that survives every collapse.
- Independence is **mechanical**, not organisational: a deterministic check, a hook, or a separate evaluating process satisfies it; a different job title applying the same judgement does not
- A solo operator satisfies the rule by delegating the verdict to a check they do not adjudicate, and violates it by reading their own output and declaring it done
- The Implementer may collapse into the Orchestrator only where the Orchestrator performs no judgement; forbid an Orchestrator that both implements and marks complete
- The Operator never collapses into any other role, because an inferred approval is not an approval
- A verdict produced by the Implementer about its own task is a `self-graded-verdict` finding at `blocker` severity, regardless of how convincing the output reads
**Directives**:
- Name the mechanism that discharges the Evaluator role before execution starts; forbid execution with an unnamed evaluator
- Route every completion verdict through the Evaluator; forbid a task transitioning to a terminal success state on the Implementer's assertion alone
- Record which role produced every state transition, so a self-graded verdict is detectable after the fact rather than only in the moment
## Specification Chain Phases
The separately loadable [Specification Chain Module](./agentic-sdlc-specification-chain.md) owns the complete reusable protocol for the three artifact roles — requirements, design, task list — the two coverage seams between them, the re-derivation cascade, phase-advance authority, and seam-preserving adaptation. This section owns its mandatory execution seam.
A specification reaches this set as a chain, not as a single document. Execution consumes the task list, but a task list is only trustworthy to the degree its upstream seams are closed.
**Directives**:
- Verify both chain seams are closed before dispatching any task derived from them; an uncovered criterion is an `undesigned-criterion` and an ungrounded design element is an `ungrounded-design-element`
- Reject a task list whose upstream artifact revision no longer matches the artifact it was derived from; a stale downstream artifact is a `stale-downstream-artifact` and re-derivation precedes dispatch
- Forbid an execution task deciding structure or introducing behaviour absent upstream; either is a `requirement-introduced-downstream` at `blocker` severity and returns to the owning phase
- Require a recorded Operator decision for each seam crossing before execution starts; an unapproved crossing is a `phase-advanced-without-approval` and an absent decision is a `blocked` state
- Permit a collapsed or reordered chain only where both seams still carry joins; a missing coverage obligation is a `seam-elided` at `blocker` severity, however small the change
## Specification to Task Bridge
The authoring set ends at a baselined pair with derived VCCs. Execution begins at a task list. The bridge is a **derivation**, not a fresh authoring act.
```
Acceptance criterion → VCC → Task (or task group) → Evidence Reference → Readiness rung
```
**Directives**:
- Derive every task from at least one VCC; a task tracing to no VCC is an `ungrounded-task`
- Ensure every VCC is covered by at least one task; a VCC with no task is an `unexecuted-condition`
- Record the source criterion and VCC identifiers on each task; forbid a task list that cannot be joined back to the specification
- Report bridge coverage as covered VCCs over total VCCs; forbid claiming a task list is complete without that ratio
- Forbid introducing a requirement at task-authoring time: a task that needs behaviour absent from the specification is a specification defect, so return it to the authoring loop rather than inventing scope inside the task list
- Re-derive the task list whenever a VCC changes; a task list outrunning its specification produces work no rung will ever credit
## Task Model
### Task Identity
```
Task ID = [hierarchical ordinal within the task list, maximum two levels]
```
- Assign each task exactly one Task ID, stable while the task's own text is unchanged
- Limit hierarchy to two levels: a task and its sub-tasks; forbid a third level, which trades comprehensibility for the illusion of precision
- Record the Task ID on every state transition, every Evidence Reference, and every finding raised during that task
### Collaboration Identity & Scoped Lane Admission
Every writer is identified by the tuple; [Cloud-Authoritative Collaboration](./agentic-sdlc-cloud-collaboration.md) owns protected remote claims, while [Scoped Concurrent Lane Admission](./agentic-sdlc-scoped-lane-admission.md) owns the decision to add one isolated lane without touching existing lanes:
```
Actor ID + Device ID + Session ID + Worktree ID + Branch ID + Scope ID + Lease Epoch + Fence Revision
```
- Treat every field as distinct: a shared person, device, session, checkout, branch, or label does not imply shared ownership
- Expose exactly four provider-neutral root operations: `claim(scope)`, `continue(claim)`, `integrate(candidate)`, and `retire(claim)`; each emits a typed digest-bound receipt, and adapters must not add authority-bearing aliases or compatibility operations
- Define a cross-repository coordination task as a dependency-ordered group of immutable per-repository work units; every unit retains its own repository, branch, worktree, semantic scope, claim, epoch, fence, PR/review identity, named checks, and handoff evidence
- Treat dependency edges as the group's only ordering authority; a shared task identity or semantic label never creates a shared branch, worktree, lease, claim, fence, review identity, or handoff
- Permit policy-unbounded but operationally bounded concurrent current authorities for disjoint normalized write sets, meaning unlimited concurrent current authorities for disjoint normalized write sets at the policy layer: each repository adapter declares and enforces its current resource, evaluator, and coordination capacity, and exactly one current write authority remains permitted per overlapping declared write set; equivalently, exactly one current write authority per overlapping declared write set. Authenticate each authority, while local worktrees, leases, PRs, processes, and provider metadata remain replaceable projections. Classify each lane as `canonical`, `overlapping`, `disjoint-attributed`, or `ambiguous`, where an overlapping newcomer is a non-writing waiting successor and undeclared or unparseable future scope is `ambiguous` and cannot create authority
- Separate the append-only ledger's physical audit head from the semantic claim-conflict fence: derive a bounded conflict-set digest from the immutable claim subject, normalized write scope, current policy and canonical evidence, and only overlapping, same-work-item, predecessor, or successor lineages. Exclude provider ordering, observation time, retry count, the global head itself, and unrelated disjoint transitions; global-head movement alone is never a claim conflict and claim admission never requires exact global-ledger parity or inactivity
- Re-evaluate a claim dynamically after every compare-and-swap loss or authoritative refresh. Return an existing receipt for an exact idempotent replay; attempt or boundedly re-parent the same frozen transition when the conflict set is unchanged; apply current overlap policy to an unsealed request; and return a typed fail-closed conflict requiring replan when the relevant conflict set, immutable subject, policy, canonical evidence, ancestry, or scope becomes changed, missing, or ambiguous. Every outcome preserves existing lanes and bytes, and adapters may change transport but not this decision
- `claim(scope)` admits only an exact clean canonical base, normalized declared scope, authenticated actor, no competing overlap, and a monotonic compare-and-swap transition; failure leaves every existing lane and the requester unchanged
- `continue(claim)` revalidates the immutable claim, revision, PR/review identity, epoch, fence, scope, and authenticated authority; recovery from `dormant-preserved` is independent of the expired local lease and never adopts another lane's mutable bytes
- `integrate(candidate)` consumes one immutable reviewed candidate, dependency closure, named checks, handoff evidence, and current claim through a monotonic compare-and-swap; source owners precede consumers, projections, and mirrors
- `retire(claim)` is the only authenticated transition that ends current authority and must preserve the exact revision, review identity, bytes, and handoff evidence; expiry, merge state, detached state, names, or canonical advancement only yield `dormant-preserved`, never inferred release
- Require admission and every later mutation batch to preserve pre-existing lanes and join current cloud and local authority with joined Admission and Preservation Receipts plus operation receipts; these receipts grant no cleanup, runtime, release, deployment, or authority outside their exact work unit
- Keep authoring ownership, review readiness, and delivery authorization as separate capabilities: `review-ready` closes source mutation, while a later explicit `delivery-authorized` compare-and-swap transition may authorize protected integration of only the unchanged reviewed revision and write scope; it must bind the current claim, lease epoch, fence, ledger revision, review and check evidence, emit an idempotent receipt, never reactivate authoring or grant deployment authority, and isolate provider-specific review and integration behavior behind replaceable adapters
#### Reference implementation inspiration — independent no-copy boundary
- [yjs/yjs](https://github.com/yjs/yjs) is conceptual inspiration only for observing concurrent state and deterministic convergence; these rules are independently authored and provider-neutral
- Forbid copying or adapting its code, prose, schemas, tests, examples, algorithms, or naming; forbid dependencies, imports, network/runtime reliance, and external conformance authority
### Canonical Branch-State Glossary
- `origin/main` is the authoritative published canonical frontier and remote SSOT; that authority is independent of topology, so a linear revision, squash result, or canonical merge commit may represent it only when the repository adapter's declared integration method permits that shape; local `main` is the local mirror of that frontier and may be ahead, behind, or diverged during rescue or sync, but its target state is exact parity with `origin/main`
- a temporary task branch such as `agent/...` or `task/...` is the normal non-canonical authoring lane for private progress, verification, and review preparation
- publication or integration updates `origin/main` through the repository's protected path; a private local commit does not publish shared authority
- pulling or syncing refreshes local canonical state from `origin/main`
- Treat `origin/main` as the only shared canonical branch state; forbid treating a private branch or unpushed local `main` commit as published source of truth
- Treat local `main` as the canonical synchronization lane, not the default long-lived authoring lane; normal task authoring belongs in an admitted temporary branch derived from a clean canonical base
- If local authoring starts on `main`, preserve the exact authored bytes by moving them into one isolated lane before the next ordinary commit, review, or publication step, then restore local `main` to exact parity
- Remove merged temporary task branches only after verified integration, canonical parity, and value-closure proof are all established
### Granularity
A well-sized task follows the universal minimum-time-and-resource / maximum-core-value chain: `highest-ranked baselined core VCC (or coherent group) → smallest dependency-closed mandatory obligation set → narrowest sufficient mechanism → independent verification → stop or select the next ranked core VCC`, within one per-task budget.

**What "highest-ranked" resolves against**: a VCC's core value traces back to a pain point → solution → feature → monetization chain — a pain point evidenced by provable demand (a named prospective payer, not a hypothesized one), the solution it justifies, the feature ranked by proximity to code already shipped (zero or minimal change outranks a rewrite of comparable scope), and the fastest path to a first real dollar. The authoring set fixes this order wherever it can; execution never re-derives it from scratch. Where a wave still admits more than one ready candidate for the same budget, break the tie locally and in this fixed sequence, never as three independent votes:
1. **Constraint satisfaction** first removes any candidate that would violate a hard bound — a stated budget, a FOSS or platform gate, a Deploy Boundary — before ranking runs at all.
2. **Outranking** then eliminates a surviving candidate that is no worse than another on every remaining criterion and strictly worse on at least one.
3. **Argumentation** settles what outranking leaves tied, by weighing each surviving candidate's stated reason against its stated counter-reason and keeping the one whose reason survives attack.
| Signal | Too small | Right-sized | Too large |
|---|---|---|---|
| VCC coverage | Fraction of one VCC | One VCC, or a coherent group | Spans unrelated VCCs |
| Verification | Nothing new to verify | One verifiable outcome | Multiple independent outcomes |
| Budget | Far under bound | Fits within bound | Exceeds bound or is unestimable |
| Artifacts touched | None | A coherent set | Unbounded or unknown set |
**Directives**:
- Before dispatch, record the selected core VCCs, mandatory obligations, named completion check, projected elapsed time and resource consumption, and any known conforming alternative; classify the selection as an `oversized-task` when an alternative delivers at least the same verified core value with no more time or resources and less of at least one
- Split a task that exceeds its budget rather than raising the budget; a persistent overrun or Pareto-dominated path is a decomposition defect, and adaptation may collapse or reorder mechanisms but never elide a mandatory obligation
- Forbid a task with no verifiable outcome and forbid over-investing in non-core periphery: defer work untraced to the selected core VCCs or a specification- or policy-required correctness, safety, security, privacy, accessibility, legal, operability, recovery, evidence, or gate obligation; unused budget never authorizes it, and it resumes only after the authoring loop baselines its marginal core value above projected time and resource cost. Documentation-only tasks state the artifact and conforming check
- Record the tie-break trail wherever a wave admits more than one ready candidate for the same budget: which candidates constraint satisfaction removed, which outranking eliminated, and the argumentation exchange that settled the remainder; an unrecorded choice among competing ready candidates is a `ranking-rationale-absent` finding
#### Reference implementation — zero-infra tie-breaker profile
Any repository profile may declare its own tie-breaker criteria in place of these; they are shown only as a concrete example, per the Scope & Neutrality Contract, and carry no universal authority.
- Prefer the mechanism runnable in a browser or at the edge over one requiring dedicated infrastructure, and the offline-capable mechanism over one requiring a live connection
- Prefer the lower total-cost-of-ownership, lower per-task token-consuming path when core value and budget are otherwise tied
- Prefer a FOSS (MIT/Apache-2.0-class) dependency already in use over a new one, and a new consumer of an existing dependency over any new dependency
### Dependency Graph

- Express dependencies as a directed acyclic graph over Task IDs; a cycle is a `task-cycle` finding at `blocker` severity
- Derive readiness from the graph: a task is ready when every dependency is in a terminal success state
- Group ready tasks into waves for concurrent dispatch; forbid two tasks in one wave writing the same artifact, which is a `concurrent-write-conflict`
- Revalidate declared write scopes and fence revisions before dispatch, handoff, integration, and cleanup; post-baseline authored state remains owned by its originating lane
- State the graph explicitly; forbid inferring order from list position alone, which silently couples ordering to formatting

### Orchestration-Reasoned Completion-Time Estimation
- Before dispatch, the Orchestrator derives a dependency-closed outcome work breakdown structure (WBS) from the selected VCCs and mandatory obligations: every leaf states a measurable verified outcome, includes every transitive predecessor needed to achieve it, and records a duration range with its evidence or explicit assumption
- Compute the end-to-end completion range from the WBS critical path; admit concurrency only where dependency and write-scope disjointness plus recorded resource, evaluator, and coordination capacity support it, and otherwise serialize
- Account once for overhead (orchestration, setup, and handoff), external waits, independent verification, expected rework, and explicit contingency; record the completion range, confidence, critical path, capacity and concurrency evidence, assumptions, external dependencies, and evaluation time. Use the simplest auditable method proportionate to uncertainty and consequence; no estimator, duration unit, or contingency percentage is universal
- Trigger a reforecast when observed duration, dependency, capacity, wait, verification, or rework evidence invalidates an assumption or changes the critical path; the evidence-triggered reforecast retains the prior forecast and records the triggering evidence, range delta, confidence change, and reason. A forecast missing the dependency-closed outcome WBS, evidenced critical-path and capacity basis, required time components, range, confidence, or assumptions, or not reforecast after such evidence, is an `orchestration-estimate-unfounded` finding

### State Vocabulary
Strictly ordered, with exactly one terminal success state:
```
not-started → queued → ready → in-progress → {verified | failed | blocked | abandoned}
```
| State | Meaning | Who may set it |
|---|---|---|
| `not-started` | Derived, not yet scheduled | Orchestrator |
| `queued` | Scheduled, dependencies unmet | Orchestrator |
| `ready` | Dependencies in terminal success | Orchestrator |
| `in-progress` | Dispatched to an Implementer | Orchestrator |
| `verified` | Evaluator confirmed the VCC from surfaced output — **the only success state** | Evaluator |
| `failed` | Evaluator rejected, budget exhausted, or the check did not pass | Evaluator or Orchestrator |
| `blocked` | Awaiting a genuinely unavailable Operator decision or external precondition, never a mechanically derivable token | Orchestrator |
| `abandoned` | Withdrawn by Operator decision, with a recorded reason | Operator |
**Directives**:
- Forbid any state named `done`, `complete`, or equivalent that an Implementer may set; `verified` is the only success state and only the Evaluator sets it
- Record a reason on every transition to `failed`, `blocked`, or `abandoned`; an unexplained terminal state is a `state-without-reason` finding
- Forbid transitioning out of a terminal state except by an explicit re-derivation that resets the task to `not-started` and records why
- Never infer a state from an artifact's existence; a file appearing on disk is not a verdict
## Execution Contract
What an Implementer receives, and what it must return.
### Dispatch Payload

| Field | Content |
|---|---|
| Task ID and text | The task and its sub-tasks verbatim |
| Source VCCs | Every VCC the task must satisfy, with its stated check and constraint |
| Traced criteria | The acceptance criterion identifiers behind those VCCs |
| Permitted capabilities | The capability classes granted for this task (see Tool Permission & Blast Radius) |
| Budgets | Token, iteration, wall-clock, and context bounds for this task |
| Lane | Always `authoring`; forbid dispatching a task in any other lane |
| Collaboration identity | Actor, device, session, worktree, branch, scope, lease epoch, and fence revision |
| Prior findings | Findings already open against the artifacts this task touches |
### Return Obligations
An Implementer must surface, in its own output, everything the Evaluator needs:
- The **named check** it ran, exactly as invocable
- The **recorded result** of that check: exit code, counts, test summary, measurement
- The **artifacts changed**, enumerated
- The **budget consumed**: tokens, iterations, elapsed time
- Any **constraint violation** it observed, including ones it caused
**Directives**:
- Forbid a return that asserts success without a named check and a recorded result; the Evaluator judges surfaced output only, so an unsurfaced pass is indistinguishable from no pass
- Forbid an Implementer reading state the Evaluator cannot see and relying on it in a verdict request
- Enumerate artifacts changed even when the change is incidental; an unenumerated change is invisible to the concurrent-write and blast-radius rules
- Surface the constraint violations the task caused, not only the ones it found; self-reporting is cheaper than detection and is the only path that scales
## Tool Permission & Blast Radius
Capability is granted per task, not per session, and scales to reversibility.
| Class | Examples (function, not brand) | Grant | Reversibility |
|---|---|---|---|
| **Read** | Read a file, search content, list a directory | Default granted | Fully reversible |
| **Local write** | Create or edit an artifact inside the task's declared scope | Granted per task with scope stated | Reversible via version control |
| **Local execute** | Run a build, a test, a linter, a formatter | Granted per task | Reversible |
| **Environment mutate** | Install a dependency, change configuration, alter shared local state | Granted per task with the change stated in advance | Recoverable with effort |
| **Irreversible** | Delete beyond a single declared artifact, rewrite history, mass-modify, drop persistent state | **Requires an Operator decision per occurrence** | Not reversible |
| **Boundary-crossing** | Anything that mutates a mirror or delivery surface, or transmits project content outward | **Forbidden during execution** | Out of scope |
**Directives**:
- Grant the narrowest class that completes the task; forbid granting a class the task does not name a use for
- Forbid self-escalation: an Implementer that needs a wider class returns `blocked` with the reason, and the Orchestrator re-dispatches with a new grant. Widening a grant mid-task is a `self-escalated-capability` finding at `blocker` severity
- Require an explicit Operator decision per irreversible operation; forbid a standing or session-scoped approval for irreversibility, because a standing approval is indistinguishable from no gate
- Forbid boundary-crossing capability in any task; promotion is the Deploy Boundary's job, and a task that reaches a delivered surface is a `deploy-boundary-breach` under the authoring set's enumeration
- Forbid transmitting project content, credentials, or user data to an external endpoint during execution unless the Operator requested that specific transmission
- State the declared write scope before dispatch; a write outside it is an `out-of-scope-write` finding
## Per-Task Budgets

Every task carries four bounds and a circuit-breaker. An unbounded task is the execution-domain equivalent of an unbounded loop.

| Bound | Purpose | Exhaustion behaviour |
|---|---|---|
| **Token bound** | Caps model spend for the task | Transition to `failed`, record consumption, do not silently continue |
| **Iteration bound** | Caps retry attempts within the task | Transition to `failed` after the final attempt |
| **Wall-clock bound** | Caps elapsed time, catching hangs the other bounds miss | Transition to `failed`, record partial state |
| **Context bound** | Caps working context, forcing checkpointing before compaction | Checkpoint and resume, never restart from zero |

**Circuit-breaker**: no progress on the task's named check across two consecutive iterations. On tripping, stop retrying and transition to `failed` with the last recorded result.

**Directives**:
- State all four bounds before dispatch; a task dispatched with any bound unstated is an `unbounded-task` finding at `blocker` severity
- Forbid raising a bound to rescue a failing task within the same run; re-decompose instead, because a bound raised under pressure is a bound that no longer bounds
- Record consumption against every bound in the return, whether or not the bound was approached; unmeasured consumption cannot be budgeted next time
- Aggregate per-task consumption into a per-run total and compare it to the estimate in the specification's token budget; a run exceeding its specification's budget is an economics finding, not a surprise
- Keep retries idempotent: a retried task must not double-apply its own prior partial work
## Verification Strategy

Execution produces the Evidence References the Readiness Ladder consumes. Weak verification therefore caps the achievable rung no matter how much code is written.
### Obligations Per Task

- Every task states its **named check** before dispatch, phrased as it is invocable
- Every code-bearing task adds or extends automated tests covering the behaviour it introduces
- Every bug-fixing task first adds a check that fails on the unfixed state; a fix with no failing-first check is a `fix-without-witness` finding
- Every task runs the project's existing verification lane, not only its own new check; a task that passes its own check while breaking a neighbour's is a regression the Evaluator must see
### Property-Based Obligations

Example-based tests confirm the cases an author imagined. Properties confirm the ones they did not.

- Derive a property from every correctness property stated in the specification; a stated property with no executable test is an `unproven-property` finding
- Pair every parser or serialiser with a round-trip property; forbid asserting round-trip fidelity by example alone
- Pair every ordering, dedup, or aggregation rule with an invariant or metamorphic property
- State each property's class explicitly — round trip, invariant, metamorphic, idempotence, confluence, error condition — so coverage gaps are visible by class rather than by count
- Set a minimum iteration count per property and keep shrinking enabled; a property run once is an example test wearing a costume
### Evidence Emission

- Emit one Evidence Reference per satisfied VCC, carrying the named check, the recorded result, and the surface (always `authoring` during execution)
- Forbid emitting an Evidence Reference for a check that was not run in this task
- Forbid an Evidence Reference whose recorded result is an assertion that a result exists
- For a task that adds or changes a diagram, run the projection check named by the authoring set's canvas-render contract and surface its node, edge, and cluster counts plus zero cost fields; a visual confirmation is not a recorded result, and a non-projecting class records zero rather than omitting the counts
## Checkpoint & Recovery

Long runs outlive working context. A run that cannot resume is a run that must restart, and restarting re-spends every token already spent.

**Directives**:
- Persist run state — task states, transitions with reasons, Evidence References, findings, budget consumption — outside working context after every terminal transition
- Checkpoint before approaching the context bound; forbid discovering a compaction boundary by losing work at it
- On resume, re-establish position from persisted state rather than from memory of prior context, and re-verify the current artifact state before continuing a partially applied task
- Treat a partially applied task as `failed` with recorded partial state, not as `in-progress`, so recovery decides explicitly whether to resume or re-derive
- Forbid a recovery path that re-dispatches a `verified` task; re-verification is a re-derivation and resets the task explicitly
- Record enough in each transition that a reader who followed none of the run can reconstruct what happened and why

## Autonomous Continuation & Interaction Economy

The canonical [Autonomous Continuation & Interaction Economy](./agentic-sdlc-autonomous-continuation.md) module owns bounded autonomous progress, decision-versus-transport separation, adapter behavior, findings, and verification. Execution consumes it by reference; this seam does not duplicate its rules.

## Human-in-the-Loop Gates

Some decisions an agent must not make alone, regardless of confidence.

| Gate | Trigger | Agent obligation |
|---|---|---|
| **Scope change** | A task requires behaviour absent from the specification | Return `blocked`; return the gap to the authoring loop |
| **Irreversible operation** | Any Irreversible capability class operation | Return `blocked` with the exact operation stated |
| **Boundary promotion** | Any movement toward a mirror or delivery surface | Refuse inside execution; emit or consume the explicit lifecycle receipt at the release seam |
| **Production authorization** | One immutable candidate and its controlled review surface still prove runtime readiness | Revalidate the exact source, dependency closure, probes, candidate, release-run reference, and review-surface locator before requiring an authenticated human to answer the exact candidate-and-target challenge |
| **Specification defect** | A VCC is unsatisfiable, contradictory, or self-contradictory | Return `blocked` with the contradiction quoted |
| **Budget re-authorisation** | A bound is exhausted and the work is genuinely larger than estimated | Return `failed` with consumption; re-decomposition or re-authorisation is an Operator decision |
| **Repeated failure** | The same approach failed twice | Diagnose, state the root cause, and switch approach; escalate on the third distinct failure rather than continuing to vary details |

**Directives**:
- Forbid inferring, defaulting, scheduling, or simulating an Operator decision; an absent decision is a `blocked` state, never an assumed yes
- Present a gate with the decision, the options, and the consequence of each; forbid escalating with a question the Operator cannot answer from what was surfaced
- Treat the configured interaction adapter—not manual transcription of a machine token—as the decision boundary. After it records an exact decision, propagate that receipt through downstream controllers without asking the Operator to restate it
- Forbid bundling an unrelated change into a gated task while waiting; a blocked task stays blocked
- Record the Operator decision reference on the transition it authorises, so the authorisation is auditable later
## Global Release-Control Rule

Every repository and deployment target governed by this set is subject to one global release-control rule: **only a target-scoped, policy-selected protected integration controller may advance a canonical release frontier or initiate delivery from it.** This is a functional rule, not a Git-, branch-, CI-, cloud-, or vendor-specific mechanism.

**Directives**:

- Apply the rule to every enrolled repository, mirror, package, generated projection, and deployment target; a profile may exclude a target only through an explicit, versioned, auditable policy record that names its alternate control boundary and evaluator
- Map the functional identities `canonical remote frontier`, `canonical local mirror`, `candidate`, `protected integration controller`, and `delivery controller` through replaceable repository adapters; names such as `main`, `origin/main`, pull request, or a particular provider are examples only, never global authority
- Forbid direct canonical writes, force updates, history rewrites, raw refspec publication, and deployment triggered solely by a merge, label, branch name, or local checkout state; each is a `canonical-control-bypass` finding at `blocker` severity
- Require protected integration to consume one immutable candidate, current policy, independent required checks, admitted ownership, and a digest-bound integration receipt; deployment additionally requires the lifecycle's exact target-scoped authorization and joined release receipts; require every repository adapter to declare exactly one canonical integration method and its permitted topology before review, with method selection treated as policy and never inferred from branch shape, tree equivalence, or provider default
- Permit canonical local synchronization only when the local mirror is clean, exclusively owned, and proven to reach the fetched canonical remote frontier by fast-forward or exact tree-equivalence under a repository adapter; divergence, unexplained files, or an unverified remote projection blocks synchronization
- Treat a canonical remote advance as invalidating every unconsumed candidate and authorization bound to an earlier frontier; retire or reseal the affected run rather than retargeting it
- Bind a release candidate to the source target's exact canonical frontier plus the exact **declared dependency pins** — each an exact fetched, protected-check-verified ancestor of its dependency's canonical remote frontier, with the binding mode recorded — never to a dependency's live canonical tip; a dependency advance does not invalidate a candidate whose pins are unchanged (only a source-frontier advance or pin change does), concurrent devices coordinate through the target-and-candidate idempotency key and one fenced controller by advancing or consuming pins through protected integration, and coupling a candidate to a moving dependency tip is a `dependency-tip-candidate-coupling` finding
- Require a deterministic global evaluator to report enrolled-target coverage, control adapter identity, policy revision, and a zero/non-zero result; missing enrollment, an unresolved exception, or a nonconforming target blocks release for that target without granting authority over unrelated targets

This rule is adaptive only in its adapter and evidence scale. It does not require a shared repository host, branch convention, deployment provider, or release cadence, and it never lets a smaller change bypass the control boundary.
## Dependency-Ordered Integration

The separately loadable [Dependency-Ordered Integration Module](./agentic-sdlc-integration-order.md) owns the complete reusable protocol. This section owns its mandatory execution seam.

```
Integration Unit = immutable change identity + write scope + dependency set + named checks + runtime impact
Integration Frontier = exact canonical revisions + exact transitive dependency closure
```

**Directives**:
- Snapshot one immutable Integration Frontier before planning; a mutable branch, label, local checkout, or running process is not frontier identity
- Classify each unit as `pending`, `already-integrated`, `superseded`, `integrated`, or `blocked`; forbid reintegrating an equivalent change or replacing newer canonical behavior with an older unit
- Build a directed acyclic graph from declared unit dependencies; a cycle is an `integration-order-cycle`, and integrating a unit before a dependency is `integration-before-dependency`
- Dispatch ready units in deterministic waves; let each reviewed, dependency-ready, disjoint lane proceed immediately because unrelated worktrees, claims, reviews, deployments, and cleanup cannot block it. Serialize only overlapping scopes and updates to the same canonical frontier
- Require the publication and protected-integration boundary to preserve one current revision authority per path; if two independent units can publish different bytes for the same path, the boundary is invalid until ownership is serialized or one unit is retired
- Integrate shared control, contract, and source owners before consumers, generated projections, mirrors, or release candidates; source ownership, not repository or list position, determines order
- Pin the freshly fetched canonical frontier; derive the immutable actual delta from the recorded base revision and collaboration fence to the reviewed source revision; prove the delta is within the admitted write scope; materialize only its remaining non-canonical entries in the owned lane; preserve every other canonical entry; resolve conflicts at the source owner, run named checks, and enter protected integration without bypass. Forbid whole-workspace, whole-tree, or all-file copying or replacement: full-tree identity is integrity proof, not an integration payload.
- Let each repository profile close its declared history-shaping choice. The Agentic Canvas OS reference adapter is squash-only: it may merge the current protected `origin/main` into the owned task branch to refresh the candidate without rewriting shared history, but it rejects rebasing the canonical frontier, merge-commit integration, and every protected integration method other than squash so `origin/main` remains linear. A canonical merge commit is valid only when the repository adapter explicitly declares and supports the `merge-commit` integration method; require that adapter's Integration Receipt to bind the source head and tree, exact protected base, declared integration method, resulting canonical SHA and tree, named checks, authorization evidence, and canonical attribution block, with topology conforming to the declared method so squash produces its declared one-parent result while a canonical merge commit requires the adapter support above
- Require every review-request or equivalent protected-integration record to be rendered from the repository-owned template, to bind the current canonical base revision at creation or update time, and to declare a scope token exactly equal to the admitted semantic scope; when a branch-segment projection exists, that scope token must equal the projected branch-scope segment as well; require the protected integration adapter to emit exactly one canonical attribution trailer block for the resulting integration commit, and forbid concatenating authored trailer blocks during squash or merge-message projection
- When a commit push succeeds but the review-ready boundary fails closed because a cloud verifier momentarily resolves a different protected-review head, solve that drift only in the authority-owning source module by revalidating the unchanged claim, review-request, and intended reviewed head, then rerunning the same bounded verifier-and-transition path; downstream fence rewrites, projection patches, synthetic rebases, or alternate transition selection are forbidden
- Resolve protected-integration authorization from the target's explicit current policy: require eligible independent approval when the policy requires it, or authenticated integration authorization from a policy-permitted authority when the required approval count is zero. Bind the authorization mode, authority identity, immutable review-record locator, exact candidate revision, policy revision, named-check results, decision time, and resulting canonical revision in the Integration Receipt; never represent integration authorization as approval, and return `review-required` when no eligible policy path is available. Advance the frontier only after the resulting protected revision passes its exact-canonical checks; a green task head alone is `canonical-frontier-unverified`
- Materialize the declared locked dependency closure inside each isolated lane; retry only the same fenced operation after an environment-only bootstrap
- Require runtime convergence when a unit declares runtime impact; keep source, exact-canonical, runtime, and delivery evidence as separate receipts
- Seal one release frontier only after every unit is terminal and every dependency identity matches; a candidate from an earlier frontier is `stale-candidate-frontier`
## Atomic Lane Convergence

One atomic top-level convergence controller owns a logical work unit from observed inventory to terminal closure. Its externally stable contract remains provider-, repository-, branch-, workspace-, and deployment-agnostic, with replaceable internal phase adapters that never become separately authorized top-level controllers. The separately loadable [Proportionate Closeout Module](./agentic-sdlc-proportionate-closeout.md) owns requested-outcome selection, the source-integrated fast path, immutable evidence reuse, and `integrated-retained`; this section retains convergence, preservation, authority, and no-discard invariants.

```
Convergence = stable plan identity + bounded effect authorization + atomic authority continuation + minimal active set + terminal receipt
Stable Plan Identity = intended effect class + exact subject set + immutable value/policy identities; observational noise excluded
```

**Directives**:
- Isolation is a safety boundary, not a retention policy: observe every claim, value-bearing revision, workspace, ref, review record, recovery object, and canonical frontier once per phase, then classify each logical unit as `keep`, `port`, `drop`, or `ambiguous`; derive the minimal active set from evidence, never from a preset count, and permit at most one mutation-capable projection, including at most one mutation-capable workspace projection, per current authority
- Keep Stable Plan Identity unchanged across harmless observation-time, remaining-lease, unrelated-ledger-head, provider-ordering, and retry-counter movement; reseal only when the intended effect class, exact subject set, immutable value, policy, authority, or safety proof changes
- Consume one exact Operator authorization for its sealed bounded effect envelope and every idempotent same-effect continuation inside that run; require new authorization only when the effect class, subject set, destructive reach, or externally visible consequence expands
- Retain or renew current authority throughout an authorized run, and perform successor creation plus task-bound authority continuation in one atomic transition and receipt; a recovery that leaves a valid successor but stale task binding is incomplete
- Normalize provider-public device and session identifiers and their private local labels through one owner-identity adapter before exact-subject comparison. A digest-prefixed provider identity is not drift merely because the local projection retains the raw label; a genuinely different normalized identity remains a blocker
- Make cloud checks stage-aware: an exact current claim joined to its open draft review is `cloud-authority-pending-review`, not a generic failure; review requires the exact current claim, integration requires the exact reviewed claim, and expiry, counter, fence, claim, review, base, head, scope, or normalized-owner drift fails closed. Diagnostics must name the expected stage, observed state, claim and review identifiers, transition and heartbeat counters, expiry, and typed reason
- Classify file delta and unique history separately because squash tree equivalence or zero file diff alone does not prove that unique value-bearing history is disposable; route value-bearing change through the protected review and integration adapter, and preserve all other value in a verified immutable recovery object before retirement; make adapters adaptive to observed inventory so absent projections are `not-applicable`, an integrated zero-delta unit closes without a synthetic merge, and disjoint work continues independently without blocking unrelated disjoint work, while functional identities, typed ports, and receipts remain universal as mechanisms vary
- Derive retirement only through `retire(claim)` after protected canonical inclusion of every value-bearing unique commit or verified immutable recovery: retain immutable audit identities or recovery locators only as archived and explicitly non-authoritative; keep coordination state in its authoritative metadata or ledger projection, forbid coordination-only content revisions, synthetic rebases, or empty commits, and give recovery retirement separate irreversible authority
- Forbid unrecoverable discard. Treat worktree-registration pruning, remote-tracking-ref pruning, local or remote branch deletion, and unreachable-object pruning as four separate effects with separate evidence and authority; ordinary cleanup may remove only an eligible projection without force, prune only stale worktree-registration and remote-tracking metadata, and may not infer branch-deletion or object-pruning authority. If recovery produces another projection-only blocker for the same intended effect, stop, preserve value, and report `unresumable-run`, while another top-level recovery controller reports `duplicate-release-controller`
- Emit one terminal receipt binding plan and authorization identities, canonical remote/local revisions, zero file delta, final minimal inventory, removed and retained projections, recovery locators, untouched out-of-scope work, and every adapter effect; closure requires the canonical local ref equals the canonical remote ref and no requested effect remains pending
## End-to-End Release Lifecycle Protocol

The separately loadable [End-to-End Production Release Lifecycle Module](./agentic-sdlc-production-release-lifecycle.md) owns the complete reusable protocol only when sealed intent includes delivery or publication; source integration alone neither loads nor invokes it. This section owns its mandatory execution seam.

**Directives**:
- Treat protected integration as Integration Receipt authority only; it never creates forward-deployment authority
- Seal one immutable candidate from the exact final Release Frontier, including source, transitive dependencies, policy, schema, catalog, generated projections, state contract, target, review, artifact, manifest, and rollback identities
- Require a current Runtime Review Receipt before prompting and a separate authenticated human decision for the exact candidate and target before deployment; fence one canonical release-owner checkout per repository to the exact protected review revision until the interaction terminates or the run is retired, and treat branch, purpose, or local-ref drift as invalidating prompt readiness until reattachment, refetch, and revalidation
- Require terminal authorization automation to follow a sequential prompt handshake: capture the exact candidate-bound reply emitted by the prompt formatter, wait for the live input prompt, then send that exact reply; precomputed, reordered, promptless, or partially matched input creates no authorization evidence
- Keep interaction, authority, deployment, state reconciliation, verification, publication, rollback, and cleanup as replaceable typed adapter ports; invalidate the affected receipt chain on identity movement, and cancel or retire stale unapproved runs rather than retargeting, rebuilding, or reusing authorization
- Verify immutable deployment identity, authoritative state readback, public transports, browser behavior, and client-cache convergence as separate claims where the target profile requires them
- Publish mirrors only after the Live Verification Receipt exists; remove only clean, integrated, completion-proven task lanes, preserve unrelated work, and require the repository-owned deterministic evaluator to exit zero only for a joined terminal receipt chain
## Runtime Readiness Enforcement

Runtime readiness is a derived claim over one immutable execution input and its joined evidence; never infer it from document status, source existence, review labels, or delivery state. The separately loadable [Behavioral Conformance Runtime Module](./agentic-sdlc-conformance-runtime.md) owns the stage-gate evidence and receipt contract; the [Repository Runtime Readiness Module](./agentic-sdlc-repository-runtime-readiness.md) owns the bounded local-first repository audit profile.

- Require typed inputs and outputs, bounded orchestration, independent evaluation, named checks with recorded results, cost and fallback evidence, and closed mutation and deployment gates before deriving `runtime-ready`
- Bind one immutable source revision and its complete dependency closure; drift invalidates the claim and returns the affected unit to `blocked`
- Keep source validation, canonical runtime, protected integration, and deployed proof as separate claims; forbid one green layer from promoting another
- Keep scoped authoring admission, runtime readiness, and lifecycle readiness as independent results; never turn preserved disjoint work or an occupied runtime into a false global verdict
- Emit `runtime-readiness-unproven` at `blocker` severity when a required receipt, join, budget, check, evaluator, dependency, or boundary proof is absent or stale
- Require repository-owned stage gates to consume operation-derived evidence and emit digest-bound receipts for admission, review, integration, runtime, candidate, authorization, deployment, and publication; expose a deterministic evaluator command that exits zero only when every required proof joins, and forbid `npx`, `latest`, or dynamic resolution from creating policy identity, gate authority, or runtime-readiness proof
## Execution Conformance Findings

The **execution-domain** half of the conformance vocabulary. The recording contract, severity assignment, deduplication key, ordering, and determinism requirements are the authoring set's and are reused unchanged; only the type enumeration is extended here.

| Rule family | Finding Type | Severity |
|---|---|---|
| Role independence | `self-graded-verdict` | `blocker` |
| Role independence | `unnamed-evaluator` | `blocker` |
| Specification bridge | `ungrounded-task` | `major` |
| Specification bridge | `unexecuted-condition` | `major` |
| Task model | `task-cycle` | `blocker` |
| Task model | `concurrent-write-conflict` | `major` |
| Task model | `parallel-scope-collision` | `blocker` |
| Task model | `stale-collaboration-fence` | `blocker` |
| Task model | `delivery-authority-unjoined` | `blocker` |
| Scoped lane admission | `canonical-base-drift` | `blocker` |
| Scoped lane admission | `scope-admission-collision` | `blocker` |
| Scoped lane admission | `unattributed-lane-ambiguity` | `blocker` |
| Scoped lane admission | `admission-snapshot-stale` | `blocker` |
| Scoped lane admission | `unsafe-candidate-target` | `blocker` |
| Scoped lane admission | `local-only-cross-device-lease` | `blocker` |
| Scoped lane admission | `collateral-lane-mutation` | `blocker` |
| Scoped lane admission | `admission-runtime-conflation` | `major` |
| Scoped lane admission | `candidate-lane-orphaned` | `major` |
| Global release control | `canonical-control-bypass` | `blocker` |
| Lane convergence | `redundant-active-projection` | `major` |
| Lane convergence | `terminal-lane-residual` | `major` |
| Lane convergence | `coordination-revision-churn` | `minor` |
| Task model | `state-without-reason` | `minor` |
| Task model | `oversized-task` | `minor` |
| Task model | `ranking-rationale-absent` | `major` |
| Task model | `orchestration-estimate-unfounded` | `major` |
| Execution contract | `unsurfaced-result` | `major` |
| Execution contract | `unenumerated-change` | `minor` |
| Tool permission | `self-escalated-capability` | `blocker` |
| Tool permission | `out-of-scope-write` | `major` |
| Tool permission | `ungated-irreversible-operation` | `blocker` |
| Budgets | `unbounded-task` | `blocker` |
| Budgets | `budget-raised-under-pressure` | `major` |
| Budgets | `unrecorded-consumption` | `minor` |
| Verification | `fix-without-witness` | `major` |
| Verification | `unproven-property` | `major` |
| Verification | `evidence-without-run` | `blocker` |
| Recovery | `unresumable-run` | `major` |
| Human gates | `assumed-operator-decision` | `blocker` |
| Human gates | `avoidable-operator-interruption` | `major` |
| Release lifecycle | `unreviewed-release-candidate` | `blocker` |
| Release lifecycle | `dependency-closure-drift` | `blocker` |
| Release lifecycle | `authorization-evidence-unjoined` | `blocker` |
| Release lifecycle | `authorization-interaction-unjoined` | `blocker` |
| Release lifecycle | `duplicate-release-controller` | `blocker` |
| Release lifecycle | `production-authorization-drift` | `blocker` |
| Release lifecycle | `post-authorization-rebuild` | `blocker` |
| Release lifecycle | `state-reconciliation-unverified` | `blocker` |
| Release lifecycle | `immutable-origin-unverified` | `blocker` |
| Release lifecycle | `public-route-unverified` | `blocker` |
| Release lifecycle | `client-cache-convergence-unverified` | `blocker` |
| Release lifecycle | `publication-before-live-verification` | `blocker` |
| Release lifecycle | `cleanup-ownership-unproven` | `blocker` |
| Integration order | `integration-order-cycle` | `blocker` |
| Integration order | `integration-before-dependency` | `blocker` |
| Integration order | `canonical-frontier-unverified` | `blocker` |
| Integration order | `duplicate-change-reintegrated` | `major` |
| Integration order | `stale-candidate-frontier` | `blocker` |
| Release lifecycle | `dependency-tip-candidate-coupling` | `major` |
| Runtime readiness | `runtime-readiness-unproven` | `blocker` |
| Specification chain | `undesigned-criterion` | `major` |
| Specification chain | `ungrounded-design-element` | `minor` |
| Specification chain | `requirement-introduced-downstream` | `blocker` |
| Specification chain | `stale-downstream-artifact` | `major` |
| Specification chain | `phase-advanced-without-approval` | `blocker` |
| Specification chain | `seam-elided` | `blocker` |

**Directives**:
- Treat this enumeration as the single source of truth for execution-domain finding names; forbid redefining any authoring-domain type here
- Anchor every finding to the Rule ID of the violated rule in this set, per the authoring set's Rule Identity & Classification
- Report a zero count for every type with no finding; an omitted row is indistinguishable from an unchecked rule
- Forbid a type in this enumeration with no rule in this set that can raise it
## Execution Load Budget

| Stage | Sections to load |
|---|---|
| Run start | `boundary-with-the-authoring-set`, `agent-roles--independence`, `specification-chain-phases`, `specification-to-task-bridge` |
| Chain seam check | `specification-chain-phases`, [Specification Chain](./agentic-sdlc-specification-chain.md) |
| Task derivation | `specification-to-task-bridge`, `task-model` |
| Lane admission | `task-model`, [Scoped Concurrent Lane Admission](./agentic-sdlc-scoped-lane-admission.md), [Cloud-Authoritative Collaboration](./agentic-sdlc-cloud-collaboration.md) |
| Dispatch | `task-model`, `execution-contract`, `tool-permission--blast-radius`, `per-task-budgets`, `autonomous-continuation--interaction-economy` |
| Implementation | `execution-contract`, `verification-strategy`, `tool-permission--blast-radius`, `autonomous-continuation--interaction-economy` |
| Verification | `verification-strategy`, `execution-conformance-findings` |
| Recovery | `checkpoint--recovery`, `autonomous-continuation--interaction-economy` |
| Escalation | `autonomous-continuation--interaction-economy`, `human-in-the-loop-gates` |
| Protected source integration | [Proportionate Closeout](./agentic-sdlc-proportionate-closeout.md), `dependency-ordered-integration`, `atomic-lane-convergence`, `autonomous-continuation--interaction-economy`, `human-in-the-loop-gates` |
| Production or publication handoff | [Proportionate Closeout](./agentic-sdlc-proportionate-closeout.md), `dependency-ordered-integration`, `atomic-lane-convergence`, [End-to-End Production Release Lifecycle](./agentic-sdlc-production-release-lifecycle.md), `autonomous-continuation--interaction-economy`, `human-in-the-loop-gates` |
| Any stage | `scope--neutrality-contract`, `module-index` |

**Directives**:
- Load by section anchor for the current stage; forbid loading the whole set as a precondition for a single-stage action
- Record this set's load cost in the per-run token total alongside the authoring set's; the cost of governing the work is part of the cost of the work
- Load `rapid-mvp-sprint-profile` at Run start alongside the roles and bridge sections whenever a Sprint Clock is declared; skip it entirely otherwise
## Rapid MVP Sprint Profile
The optional [Rapid MVP Sprint Profile](./agentic-sdlc-rapid-mvp-sprint.md) module owns the provider-neutral compression map, Sprint Clock directives, and critical-path reforecast. It is a reference implementation, not universal authority; no phase collapse may elide an obligation.
## Validation Checklist
**Pre-Execution**:
- [ ] **Frontmatter present** with baseline and conformance keys; `owner` declared; `local_rung` and `delivered_rung` separate
- [ ] **Specification baselined and codebase-grounded** with zero open `blocker` findings in the authoring domain; every non-native input has a current Codebase Grounding Record and no unresolved material current-state claim supports baseline, execution, or readiness
- [ ] **Evaluator mechanism named** and demonstrably distinct from the Implementer
- [ ] **Every task traced** to at least one VCC; every VCC covered by at least one task; bridge coverage ratio reported
- [ ] **Dependency graph acyclic**; waves contain no two tasks writing the same artifact
- [ ] **Competing-candidate ranking recorded**: any wave admitting more than one ready candidate for the same budget carries a constraint-satisfaction, outranking, and argumentation trail
- [ ] **Orchestration completion-time estimate grounded and current**: the dependency-closed outcome WBS, critical path under evidenced concurrency and capacity, overhead, external waits, verification, rework, contingency, range, confidence, assumptions, and every evidence-triggered reforecast are recorded
- [ ] **Collaboration identity complete when concurrent mutation applies**; authoritative future write scopes, distinct lanes, and exact fences are present without path inference; current local leases are required only for local mutation-capable projections
- [ ] **No live overlapping remote claim exists for the declared scope**; any overlap is resolved upstream through an accepted release, handoff, or reclaim before local mutation, and review state, lease expiry, mergeability, or canonical advancement do not count as release authority
- [ ] **Claim conflict resolution is semantic and dynamic**; the physical ledger head is not treated as a global lock, unchanged conflict sets may re-parent within a declared retry bound, and changed or unknowable relevant evidence returns a typed fail-closed outcome without mutating existing lanes
- [ ] **When additive concurrent authoring is requested, scoped lane admitted and preserved**; joined receipts bind exact source/scope, cloud/local/shared-state digests, target/atomic result, final active claim evidence, zero candidate-caused collateral mutation, `authoringAdmission: admitted`, and claim-plus-local-lease revalidation at first consumption
- [ ] **Reviewed delivery authority is exact when protected integration applies**; one current `delivery-authorized` receipt binds the unchanged reviewed revision, scope, claim, lease epoch, fence, ledger revision, and review/check evidence without reopening authoring or granting deployment authority
- [ ] **All four budgets stated** per task, with a circuit-breaker condition
- [ ] **Capability grants stated** per task at the narrowest sufficient class; write scope declared
- [ ] **Named check stated** per task before dispatch
- [ ] **Property obligations identified** per stated correctness property, with class named

**Per-Task**:
- [ ] Named check run and its recorded result surfaced
- [ ] Existing verification lane run, not only the task's own check
- [ ] Artifacts changed enumerated, including incidental changes
- [ ] Budget consumption recorded against all four bounds
- [ ] Verdict issued by the Evaluator, never the Implementer
- [ ] Evidence Reference emitted per satisfied VCC, with surface recorded
- [ ] For diagram-bearing tasks, projection check run and its node, edge, cluster, and zero-cost counts surfaced
- [ ] State transition recorded with the role that made it and a reason where terminal

**Post-Run** — evaluate only obligations triggered by the sealed closeout outcome and record every other row as `not-applicable`:
- [ ] **Runtime readiness derived** by the deterministic evaluator from one immutable input and joined, layer-specific proof; every missing or stale obligation fails closed
- [ ] **Every task in a terminal state**; no task left `in-progress`
- [ ] **Every `failed`, `blocked`, and `abandoned` task carries a reason**
- [ ] **Rungs re-derived** from the emitted Evidence References; no rung authored by hand
- [ ] **Finding set emitted** across both domains, deduplicated, ordered, with zero counts reported
- [ ] **Finding set compared** to the prior run; any new `blocker` treated as a regression
- [ ] **Run state persisted** such that an independent reader can reconstruct the run
- [ ] **Per-run consumption compared** to the specification's token budget
- [ ] **Autonomous continuation economical**: every safe in-scope dependency-ready step continued without avoidable Operator interruption; machine tokens and idempotent continuations were carried internally, and each actual prompt maps to one unresolved semantic decision
- [ ] **No boundary crossed**: every task ran in the `authoring` lane; every Deploy Boundary still reads `closed` absent an Operator instruction
- [ ] **Integration order closed**: every unit is terminal, dependencies preceded consumers, no equivalent or superseded unit was re-merged, and exact-canonical checks advanced each frontier
- [ ] **Protected review metadata exact**: the repository-owned review-request template is instantiated, the current canonical base revision is recorded, and the declared scope token equals the admitted semantic scope and any projected branch-scope segment
- [ ] **Runtime and release frontiers agree**: every runtime-impacting unit converged before candidate sealing, and the candidate binds the final dependency closure
- [ ] **Authorization prompt runtime-ready**: candidate, source, release run, and controlled review-surface locator are revalidated from the current Runtime Review Receipt before the prompt is emitted; the prompt identifies its canonical portable formatter as `agentic-canvas-os/scripts/production-release-authorization-contract.mjs` and, directly after its loopback locator, prints the runtime-resolved local formatter source path
- [ ] **Canonical release owner stable**: from candidate sealing through authorization interaction, one canonical release-owner checkout stays on the exact protected revision used for review; any branch flip or local-ref drift retires or blocks the run until the owner is restored and the receipt chain is refreshed
- [ ] **Receipt chain joined**: Integration, Runtime Review, Candidate, Authorization Interaction, Human Authorization, Deployment, State Reconciliation, Live Verification, Publication, and Rollback receipts join by exact digest where each stage applies
- [ ] **Overlapping work preserved**: every pre-existing non-canonical work item is content-bound and accounted for; overlapping items remain retained with recovery handles, while any restored disjoint item matches its captured state exactly
- [ ] **Atomic convergence closed**: one stable plan and bounded effect authorization own the exact keep / port / drop inventory; authority continuation is atomic, no coordination-only content revision or projection-only recovery blocker remains, and every adapter effect joins the terminal receipt
- [ ] **When scoped lane admission applies, admission preservation closed**: the candidate leaves every existing lane untouched; each peer is unchanged or advances only through separately proven current disjoint authority and a joined typed peer-operation receipt
- [ ] **Candidate closure exact**: canonical source, all transitive dependencies, policy, target, review, artifact, manifest, and candidate digests agree
- [ ] **Human authorization exact**: the interaction receipt proves the configured transport, browser dependency, exact challenge response, and authenticated actor; the authority adapter records the same human decision for that candidate and target
- [ ] **Terminal prompt handshake exact**: terminal automation captures the printed exact reply, waits for the live prompt, and only then submits that reply; missing challenge capture, missing prompt readiness, or out-of-order input blocks authorization
- [ ] **Controller singular and idempotent**: one target-scoped controller owns deployment; duplicate dispatch resolves to the same result or fails closed
- [ ] **No drift or rebuild**: current evidence still matches the authorized candidate byte-for-byte; otherwise authorization is invalid and forward deployment remains blocked
- [ ] **State reconciled**: state changes are bounded and idempotent, direct readback matches expected counts and content, and code and state rollback dispositions remain separate
- [ ] **Transports proven separately**: immutable origin, required public routes, authoritative state readback, browser behavior, client-cache convergence, and publication each carry their own evidence where applicable
- [ ] **Cleanup ownership proven**: only clean, integrated, completion-proven lanes were removed; active, parked, dirty, divergent, and unrelated work remains preserved
- [ ] **Minimal active set converged**: every non-canonical work unit and projection is classified as `keep`, `port`, `drop`, or `ambiguous`; each retained item has current evidenced purpose, every eligible terminal item has bounded cleanup evidence, and coordination-only state creates no avoidable content revision
- [ ] **Turn ends at canonical or parked state**: completed lane payload is absorbed into the protected canonical frontier and the canonical owner is cleanly parked there, or incomplete work is explicitly parked in its owned lane with canonical remaining clean
## Anti-Pattern Guards

The canonical [Execution Anti-Pattern Guards](./agentic-sdlc-anti-pattern-guards.md) module owns the compact prohibited-pattern → required-correction map. This seam keeps the finding vocabulary in this execution owner while avoiding duplicate rule prose.

## Mantra Application

**"Specification grounds every task · Bounds make every task finite · Independence makes every verdict trustworthy · Grants make every capability deliberate · Evidence earns every rung · Persistence makes every run resumable · Autonomy carries every safe next step · Gates keep every irreversible choice human"**

- **Specification grounds**: a task with no VCC behind it is work no rung will credit, so the bridge is a derivation and never a fresh authoring act
- **Bounds make finite**: four bounds and a circuit-breaker per task, because an unbounded task is an unbounded loop wearing a checkbox
- **Independence makes trustworthy**: the Evaluator is a mechanism the Implementer does not adjudicate; every other role may collapse, this one may not
- **Grants make deliberate**: capability is scoped per task to the narrowest sufficient class, and irreversibility is gated per occurrence rather than per session
- **Evidence earns**: execution's output is not code, it is the Evidence References that let the Readiness Ladder move; unsurfaced work raises nothing
- **Persistence makes resumable**: state lives outside working context, so a long run survives compaction instead of re-spending its way back to where it was
- **Autonomy carries**: once intent and authority are present, safe mechanics and idempotent continuation stay inside the controller instead of becoming repeated Operator work
- **Gates keep human**: scope, irreversibility, promotion, and re-authorisation are Operator decisions, and an absent decision is a blocked task rather than an assumed yes
