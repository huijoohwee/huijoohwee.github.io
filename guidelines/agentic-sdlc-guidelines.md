---
title: "Agentic SDLC Guidelines"
doc_type: "Guidelines"
version: "1.10.0"
date: "2026-07-30"
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
- **Modular**: each `##` section is self-contained and addressable by its heading anchor (see Module Index). Sections may be lifted into another guideline set without rewriting their internals.
- **Enforceable**: every rule is written so a conformance check can record a typed finding against it (see Execution Conformance Findings). A statement that cannot be violated observably is guidance, not a rule, and is labelled as such.
- **Complementary**: this set owns **execution**. Authoring — what a PRD, TAD, or ADR must contain, the Readiness Ladder, the Rule ID scheme, and the authoring-domain finding vocabulary — is owned by the **PRD, TAD & ADR Guidelines** companion set. This set does not restate those rules; it names them and consumes them.

## Module Index

- `scope--neutrality-contract` — universality, neutrality, agnosticity, modularity, enforceability, complementarity rules
- `module-index` — this index
- `boundary-with-the-authoring-set` — what this set owns, what it consumes, and where the seam sits
- `agent-roles--independence` — the four execution roles and the independence rule that must not collapse
- `specification-to-task-bridge` — how baselined documents become an executable task list
- `task-model` — task identity, granularity, dependency graph, and state vocabulary
- `execution-contract` — what an agent receives, what it must surface, and what closes a task
- `tool-permission--blast-radius` — capability classes, escalation, and irreversibility rules
- `per-task-budgets` — token, iteration, wall-clock, and context bounds per task
- `verification-strategy` — test obligations, property-based testing, and evidence emission
- `checkpoint--recovery` — resumability, compaction survival, and partial-failure handling
- `human-in-the-loop-gates` — which decisions an agent must not make alone
- `dependency-ordered-integration` — canonical-frontier planning, no-op detection, dependency waves, and exact integration closure
- `end-to-end-release-lifecycle-protocol` — neutral interaction and authority adapters, human authorization, drift invalidation, and live closure
- `runtime-readiness-enforcement` — fail-closed derivation of layer-specific runtime claims from joined evidence, with the repository audit profile in the companion module
- `upstream-dependency-admission` — companion module for early admission, bounded deferral, and disjoint-work continuation
- `execution-conformance-findings` — the execution-domain finding vocabulary and severities
- `execution-load-budget` — phase-scoped loading of this set
- `validation-checklist` — pre-execution, per-task, and post-run gates
- `anti-pattern-guards` — prohibited execution patterns and their corrections
- `mantra-application` — the framing mantra
- [Cloud-Authoritative Collaboration](./agentic-sdlc-cloud-collaboration.md) — provider-neutral multi-device claims, fencing, offline admission, and remote runtime-readiness

## Boundary with the Authoring Set

The two sets meet at a single seam: **a baselined document pair with derived VCCs on one side, an executable task list with recorded Evidence References on the other.**

| Concern | Owner | This set's relationship |
|---|---|---|
| Document contents, templates, phase gates | Authoring set | Consumes as precondition |
| Readiness Ladder and rung derivation | Authoring set | Writes Evidence References that the ladder reads |
| Rule ID scheme and artifact-bearing classification | Authoring set | Reuses unchanged for execution rules |
| Finding recording contract, severities, determinism | Authoring set | Reuses unchanged; extends the type enumeration only |
| VCC primitive and Evidence Reference shape | Authoring set | Produces Evidence References during execution |
| Lane topology and Deploy Boundary | Authoring set | Obeys; never promotes across a boundary |
| Task decomposition, state, and ordering | **This set** | Owns |
| Agent roles and evaluator independence mechanics | **This set** | Owns |
| Tool permissions and blast radius | **This set** | Owns |
| Per-task budgets and circuit-breakers | **This set** | Owns |
| Checkpointing and recovery | **This set** | Owns |
| Execution-to-release handoff | **This set** | Emits an Integration Receipt; never promotes |
| Release orchestration and delivery adapters | Lifecycle controller | Consumes the receipt only after execution closes |

**Directives**:
- Treat a baselined document pair with zero open `blocker` findings as the entry precondition for execution; forbid starting execution against an unbaselined or blocker-carrying specification
- Reuse the authoring set's Rule ID derivation and finding recording contract verbatim; forbid a second, parallel conformance vocabulary
- Forbid either set redefining a Finding Type the other owns; the conformance vocabulary is the union of the two enumerations
- Name the companion set wherever a rule crosses the seam; forbid an execution rule that silently assumes an authoring rule the reader has not been pointed at
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

### Collaboration Identity

Every writer is identified by the tuple; the [Cloud-Authoritative Collaboration](./agentic-sdlc-cloud-collaboration.md) companion adds protected remote claim authority for multi-device work:
```
Actor ID + Device ID + Session ID + Worktree ID + Branch ID + Scope ID + Lease Epoch + Fence Revision
```

- Treat every field as distinct: a shared person, device, session, checkout, branch, or label does not imply shared ownership
- Permit concurrent work only when declared write scopes are disjoint and each writer owns a separately fenced mutation lane
- Serialize writers that share a scope, branch, worktree, or artifact; a later lease epoch supersedes an earlier one only after the earlier writer has stopped
- Hand off only an immutable, remotely addressable revision plus its evidence; forbid copying mutable working state between users or devices as coordination
- Treat the protected canonical source ref as cross-device authority; local checkouts and running processes are caches or review surfaces, never source authority

### Granularity

A well-sized task is one an Implementer can complete, verify, and surface within a single per-task budget.

| Signal | Too small | Right-sized | Too large |
|---|---|---|---|
| VCC coverage | Fraction of one VCC | One VCC, or a coherent group | Spans unrelated VCCs |
| Verification | Nothing new to verify | One verifiable outcome | Multiple independent outcomes |
| Budget | Far under bound | Fits within bound | Exceeds bound or is unestimable |
| Artifacts touched | None | A coherent set | Unbounded or unknown set |

**Directives**:
- Size every task so its completion is verifiable by a check named in advance; forbid a task whose completion is judged by inspection
- Split a task that exceeds its budget rather than raising the budget; a persistent overrun is a decomposition defect, and raising the bound hides it
- Forbid a task with no verifiable outcome; documentation-only tasks state the artifact and the check that confirms it exists and conforms

### Dependency Graph

- Express dependencies as a directed acyclic graph over Task IDs; a cycle is a `task-cycle` finding at `blocker` severity
- Derive readiness from the graph: a task is ready when every dependency is in a terminal success state
- Group ready tasks into waves for concurrent dispatch; forbid two tasks in one wave writing the same artifact, which is a `concurrent-write-conflict`
- Revalidate declared write scopes and fence revisions before dispatch, handoff, integration, and cleanup; post-baseline authored state remains owned by its originating lane
- State the graph explicitly; forbid inferring order from list position alone, which silently couples ordering to formatting

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
| `blocked` | Awaiting an Operator decision or an external precondition | Orchestrator |
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

## Checkpoint & Recovery

Long runs outlive working context. A run that cannot resume is a run that must restart, and restarting re-spends every token already spent.

**Directives**:
- Persist run state — task states, transitions with reasons, Evidence References, findings, budget consumption — outside working context after every terminal transition
- Checkpoint before approaching the context bound; forbid discovering a compaction boundary by losing work at it
- On resume, re-establish position from persisted state rather than from memory of prior context, and re-verify the current artifact state before continuing a partially applied task
- Treat a partially applied task as `failed` with recorded partial state, not as `in-progress`, so recovery decides explicitly whether to resume or re-derive
- Forbid a recovery path that re-dispatches a `verified` task; re-verification is a re-derivation and resets the task explicitly
- Record enough in each transition that a reader who followed none of the run can reconstruct what happened and why

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
- Forbid bundling an unrelated change into a gated task while waiting; a blocked task stays blocked
- Record the Operator decision reference on the transition it authorises, so the authorisation is auditable later

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
- Dispatch ready units in deterministic waves only when their write scopes are disjoint; serialize overlapping source owners even when their dependency sets differ
- Integrate shared control, contract, and source owners before consumers, generated projections, mirrors, or release candidates; source ownership, not repository or list position, determines order
- Rebase or merge the current canonical frontier into the owned mutation lane, resolve conflicts at the source owner, run named checks, and enter through protected integration without bypass
- Require the protected merge revision and its exact-canonical checks before advancing the frontier; a green task head alone is `canonical-frontier-unverified`
- Materialize the declared locked dependency closure inside each isolated lane; retry only the same fenced operation after an environment-only bootstrap
- Require runtime convergence when a unit declares runtime impact; keep source, exact-canonical, runtime, and delivery evidence as separate receipts
- Seal one release frontier only after every unit is terminal and every dependency identity matches; a candidate from an earlier frontier is `stale-candidate-frontier`

## End-to-End Release Lifecycle Protocol

This protocol is neutral across source-control, review, build, approval, deployment, and hosting implementations. Protected integration proves integration only. Candidate preparation may begin automatically after verified integration, but forward deployment remains closed until a human explicitly authorizes the exact immutable candidate.

### Receipt Chain

| Receipt | Minimum identity | Authority created |
|---|---|---|
| **Overlap Preservation & Disposition Receipts** | Convergence base and protected-tip digests; every pre-existing non-canonical work item's collaboration identity, declared-write-set digest, state digest, recovery handle, overlap class, preservation mode, and exact retained-or-restored disposition | Convergence safety may be evaluated; no review, integration, authorization, or deployment authority |
| **Integration Receipt** | Canonical protected source revision, dependency-closure digest, checks, evaluator, and collaboration fence | Authoring closed; review may begin |
| **Runtime Review Receipt** | Integration Receipt digest, controlled review-surface identity, runtime dependency closure, probes, reviewer, and expiry | Candidate preparation may begin |
| **Candidate Manifest** | Runtime Review Receipt digest, source and dependency identities, policy and target digests, build artifact digest, manifest digest, and candidate digest | One immutable candidate exists |
| **Authorization Interaction Receipt** | Candidate and target digests, authenticated human actor, interaction-adapter identity, transport class, declared browser dependency, challenge and response digests, and observation time | Human interaction is observed; no deployment authority |
| **Human Authorization Receipt** | Interaction Receipt, candidate, and target digests; authenticated human decision reference; authority-adapter identity; issued time; expiry; and consumption state | One forward deployment attempt may begin |
| **Live Verification Receipt** | Authorization digest, deployed artifact identity, target identity, probes, observed runtime identity, and rollback target | The authorized candidate is live and verified |
| **Publication Receipt** | Live Verification Receipt digest and exact mirror or publication identities | Downstream publication is closed |

Every receipt is immutable, typed, content-addressed, and joined to its predecessor by digest. The Integration Receipt must join the exact preservation disposition that accounted for all work observed before convergence. The interaction and authority adapters are independent modules: a transport presents and returns the challenge but grants no authority, while the authority adapter accepts a decision only for the same human, candidate, target, and interaction digest. Unknown or missing identity fields fail closed. Preservation is not review, integration, or authorization; reviewing source or runtime behavior is not authorization to deploy built bytes.

### Collaboration and Controller Concurrency

- Carry the complete collaboration identity tuple from task dispatch through the Integration Receipt; a release must be traceable to the actor, device, session, worktree, branch, scope, lease epoch, and fence revision that produced it
- Allow parallel users, devices, sessions, and worktrees only for disjoint declared write scopes; serialize overlapping scopes and reject stale fences
- Before any canonical convergence or release transition, inventory every pre-existing non-canonical work item and bind its current bytes, declared write set, owner, fence, overlap class, preservation mode, and opaque recovery handle into the preservation receipt; forbid cleanup, overwrite, adoption, or silent loss to manufacture a clean state
- Keep overlapping work retained in its owning lane or an immutable recovery object until its owner reconciles it; restore disjoint work only when its state and recovery identity still match exactly, and retain it with the surfaced recovery handle on any ambiguity or drift
- Transfer work only at an immutable revision and receipt boundary; local filesystem state, process state, and branch labels cannot be handoff identity
- Key release control by target plus candidate digest. Acquire one target-scoped concurrency fence, coalesce idempotent duplicate dispatches, and reject competing candidates
- Treat every authorization as single-candidate, target-specific, time-bounded, non-transferable, and consumed by at most one forward deployment
- Bind the interaction adapter, transport class, browser dependency, exact challenge response, and authenticated actor into the receipt chain; transport activity alone never becomes authorization

### Lifecycle Stages

| Stage | Required transition | Fail-closed invariant |
|---|---|---|
| **Overlap preservation** | Capture all pre-existing non-canonical work before convergence and account for each item as exactly retained or safely restored | Missing ownership, bytes, write-set, fence, recovery identity, or disposition blocks convergence; overlapping work cannot be auto-restored |
| **Protected integration** | Reviewed changes pass required checks and converge into the canonical protected source ref | A bypass, mutable task lane, or unverified merge cannot emit an Integration Receipt |
| **Controlled runtime review** | An operator-controlled review surface runs the exact integrated revision and full pinned dependency closure | A task lane, stale process, mismatched dependency, failed check, or failed probe cannot emit a Runtime Review Receipt |
| **Candidate preparation** | Build once and bind the complete source/dependency closure, review, policy, target, artifact, and manifest identities | A mutable ref, label, timestamp, “latest” selector, or unresolved dependency is not candidate identity |
| **Human authorization** | A runtime-readiness gate revalidates the current review receipt and candidate, then a replaceable interaction adapter presents the candidate, source, run, review-surface locator, and exact candidate-and-target challenge; the authority adapter joins the authenticated human decision to that Interaction Receipt | A stale or failed review surface cannot emit the prompt; an agent, transport event, merge, schedule, prior approval, review result, or candidate-build event cannot authorize deployment |
| **Authorized deployment** | Revalidate zero drift, then deploy the already-built authorized bytes under one target-scoped fence | Never rebuild, re-resolve, retarget, or select current source after authorization |
| **Live verification and publication** | Verify runtime identity and critical probes, then publish only the exact verified mirror or downstream representation | Failed or ambiguous live proof leaves publication closed and triggers recovery |
| **Rollback and closure** | Restore the recorded immutable last-known-good deployment when forward verification fails; emit final evidence | Rollback authority never implies forward-deploy authority |

### Drift and Replay Invalidation

- Invalidate integration, review, candidate, interaction, and authorization evidence if preserved work state or disposition, the canonical source revision, any transitive dependency, policy, target configuration, interaction adapter or transport, declared browser dependency, challenge or response, review digest, artifact, manifest, or candidate digest changes
- Require new review, candidate preparation, and human authorization after invalidation; a rebuild from unchanged source is still a new candidate
- Revalidate the complete dependency closure and canonical source immediately before deployment; compare exact identities, not names or equivalent contents
- Reject expired, malformed, unjoined, previously consumed, machine-generated, actor-mismatched, interaction-mismatched, or target-mismatched authorization
- Keep forward deployment stopped on duplicate controller ownership, source advancement while waiting, or any evidence replay whose idempotency key does not resolve to the same candidate and terminal result
- Publish mirrors and downstream representations only after the Live Verification Receipt exists; failed forward verification leaves the last-known-good publication unchanged

### Reference Implementation Boundary

Concrete branch names, terminal-turn commands, local review hosts, approval products, CI/CD services, and deployment providers are adapter mappings, not protocol vocabulary. A conforming implementation documents those mappings separately and proves that each adapter preserves the receipt fields, human boundary, concurrency fence, drift checks, and fail-closed semantics above. The recommended production profile is terminal-first and browser-independent: an interactive TTY command downloads the exact candidate, requires the human to return its exact digest, records the interaction evidence, and calls the configured authority API directly without launching or requiring a browser; non-interactive confirmation flags and inferred approval are forbidden. Its runtime-ready reference implementation template is:

```text
The release is verified and awaiting fresh human authorization.

Candidate: `{{candidate_digest}}`
Source: `{{source_revision}}`
Run: `{{release_run_reference}}`
localhost: `{{localhost_review_url}}`

Reply exactly:

`authorize {{candidate_digest}}`
```

The reference adapter must derive `localhost` from the current controlled runtime receipt and emit this template only while the exact source, dependency closure, protected checks, probes, review receipt, candidate, and release run remain runtime-ready. The locator is review evidence, never deployment authority; any drift blocks prompting and requires a fresh runtime review and authorization.

## Runtime Readiness Enforcement

Runtime readiness is a derived claim over one immutable execution input and its joined evidence; never infer it from document status, source existence, review labels, or delivery state. The separately loadable [Behavioral Conformance Runtime Module](./agentic-sdlc-conformance-runtime.md) owns the stage-gate evidence and receipt contract; the [Repository Runtime Readiness Module](./agentic-sdlc-repository-runtime-readiness.md) owns the bounded local-first repository audit profile.

- Require typed inputs and outputs, bounded orchestration, independent evaluation, named checks with recorded results, cost and fallback evidence, and closed mutation and deployment gates before deriving `runtime-ready`
- Bind one immutable source revision and its complete dependency closure; drift invalidates the claim and returns the affected unit to `blocked`
- Keep source validation, canonical runtime, protected integration, and deployed proof as separate claims; forbid one green layer from promoting another
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
| Task model | `state-without-reason` | `minor` |
| Task model | `oversized-task` | `minor` |
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
| Release lifecycle | `unreviewed-release-candidate` | `blocker` |
| Release lifecycle | `dependency-closure-drift` | `blocker` |
| Release lifecycle | `authorization-evidence-unjoined` | `blocker` |
| Release lifecycle | `authorization-interaction-unjoined` | `blocker` |
| Release lifecycle | `duplicate-release-controller` | `blocker` |
| Release lifecycle | `production-authorization-drift` | `blocker` |
| Release lifecycle | `post-authorization-rebuild` | `blocker` |
| Integration order | `integration-order-cycle` | `blocker` |
| Integration order | `integration-before-dependency` | `blocker` |
| Integration order | `canonical-frontier-unverified` | `blocker` |
| Integration order | `duplicate-change-reintegrated` | `major` |
| Integration order | `stale-candidate-frontier` | `blocker` |
| Runtime readiness | `runtime-readiness-unproven` | `blocker` |

**Directives**:
- Treat this enumeration as the single source of truth for execution-domain finding names; forbid redefining any authoring-domain type here
- Anchor every finding to the Rule ID of the violated rule in this set, per the authoring set's Rule Identity & Classification
- Report a zero count for every type with no finding; an omitted row is indistinguishable from an unchecked rule
- Forbid a type in this enumeration with no rule in this set that can raise it

## Execution Load Budget

| Stage | Sections to load |
|---|---|
| Run start | `boundary-with-the-authoring-set`, `agent-roles--independence`, `specification-to-task-bridge` |
| Task derivation | `specification-to-task-bridge`, `task-model` |
| Dispatch | `task-model`, `execution-contract`, `tool-permission--blast-radius`, `per-task-budgets` |
| Implementation | `execution-contract`, `verification-strategy`, `tool-permission--blast-radius` |
| Verification | `verification-strategy`, `execution-conformance-findings` |
| Recovery | `checkpoint--recovery` |
| Escalation | `human-in-the-loop-gates` |
| Release handoff | `dependency-ordered-integration`, `end-to-end-release-lifecycle-protocol`, `human-in-the-loop-gates` |
| Any stage | `scope--neutrality-contract`, `module-index` |

**Directives**:
- Load by section anchor for the current stage; forbid loading the whole set as a precondition for a single-stage action
- Record this set's load cost in the per-run token total alongside the authoring set's; the cost of governing the work is part of the cost of the work

## Validation Checklist

**Pre-Execution**:
- [ ] **Frontmatter present** with baseline and conformance keys; `owner` declared; `local_rung` and `delivered_rung` separate
- [ ] **Specification baselined** with zero open `blocker` findings in the authoring domain
- [ ] **Evaluator mechanism named** and demonstrably distinct from the Implementer
- [ ] **Every task traced** to at least one VCC; every VCC covered by at least one task; bridge coverage ratio reported
- [ ] **Dependency graph acyclic**; waves contain no two tasks writing the same artifact
- [ ] **Collaboration identity complete**; concurrent writers have disjoint scopes, distinct lanes, current leases, and exact fence revisions
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
- [ ] State transition recorded with the role that made it and a reason where terminal

**Post-Run**:
- [ ] **Runtime readiness derived** by the deterministic evaluator from one immutable input and joined, layer-specific proof; every missing or stale obligation fails closed
- [ ] **Every task in a terminal state**; no task left `in-progress`
- [ ] **Every `failed`, `blocked`, and `abandoned` task carries a reason**
- [ ] **Rungs re-derived** from the emitted Evidence References; no rung authored by hand
- [ ] **Finding set emitted** across both domains, deduplicated, ordered, with zero counts reported
- [ ] **Finding set compared** to the prior run; any new `blocker` treated as a regression
- [ ] **Run state persisted** such that an independent reader can reconstruct the run
- [ ] **Per-run consumption compared** to the specification's token budget
- [ ] **No boundary crossed**: every task ran in the `authoring` lane; every Deploy Boundary still reads `closed` absent an Operator instruction
- [ ] **Integration order closed**: every unit is terminal, dependencies preceded consumers, no equivalent or superseded unit was re-merged, and exact-canonical checks advanced each frontier
- [ ] **Runtime and release frontiers agree**: every runtime-impacting unit converged before candidate sealing, and the candidate binds the final dependency closure
- [ ] **Authorization prompt runtime-ready**: candidate, source, release run, and controlled review-surface locator are revalidated from the current Runtime Review Receipt before the prompt is emitted
- [ ] **Receipt chain joined**: Integration, Runtime Review, Candidate, Authorization Interaction, Human Authorization, Live Verification, and Publication receipts join by exact digest where each stage applies
- [ ] **Overlapping work preserved**: every pre-existing non-canonical work item is content-bound and accounted for; overlapping items remain retained with recovery handles, while any restored disjoint item matches its captured state exactly
- [ ] **Candidate closure exact**: canonical source, all transitive dependencies, policy, target, review, artifact, manifest, and candidate digests agree
- [ ] **Human authorization exact**: the interaction receipt proves the configured transport, browser dependency, exact challenge response, and authenticated actor; the authority adapter records the same human decision for that candidate and target
- [ ] **Controller singular and idempotent**: one target-scoped controller owns deployment; duplicate dispatch resolves to the same result or fails closed
- [ ] **No drift or rebuild**: current evidence still matches the authorized candidate byte-for-byte; otherwise authorization is invalid and forward deployment remains blocked

## Anti-Pattern Guards

❌ An Implementer marking its own task complete; a `done` state any role may set; a verdict derived from state the Evaluator cannot see
→ ✅ `verified` as the only success state, set only by an Evaluator that is a distinct mechanism, judging surfaced output only

❌ Tasks invented at task-authoring time to cover behaviour the specification never stated
→ ✅ Every task derived from a VCC; a behaviour gap returned to the authoring loop as a specification defect

❌ Tasks dispatched with no token, iteration, wall-clock, or context bound; bounds raised mid-run to rescue a failing task
→ ✅ All four bounds stated before dispatch with a circuit-breaker; overruns trigger re-decomposition, not a larger bound

❌ Session-wide capability grants; an agent widening its own permissions mid-task; a standing approval for irreversible operations
→ ✅ Narrowest sufficient class granted per task; escalation via `blocked` and re-dispatch; an explicit Operator decision per irreversible occurrence

❌ Tasks that reach a mirror or delivery surface, or transmit project content outward, because it was convenient
→ ✅ Execution confined to the authoring lane; promotion is the Deploy Boundary's job and never a task

❌ Success asserted without a named check and a recorded result; a check named after the fact to match what happened
→ ✅ Named check stated before dispatch, run during the task, and its result surfaced in the Implementer's own output

❌ Bug fixes with no check that failed on the unfixed state; stated correctness properties with no executable property test
→ ✅ Failing-first witness per fix; one property test per stated property with its class named and shrinking enabled

❌ Long runs that cannot resume, discovering the context boundary by losing work at it
→ ✅ Run state persisted after every terminal transition; checkpoint before the context bound; resume from persisted state, not memory

❌ Operator decisions inferred, defaulted, simulated, or accepted through a non-interactive confirmation flag because the run would otherwise stall
→ ✅ Absent decisions produce `blocked`; the configured interaction adapter records the exact human challenge response before the authority adapter can authorize

❌ A green merge automatically deploying the current protected ref, a browser-only production path, or a release rebuilding after human approval
→ ✅ Protected integration emits no deployment authority; the recommended profile uses an interactive terminal without browser dependence, and one reviewed immutable candidate is human-authorized and deployed without rebuild

❌ Reusing approval after source, dependency, policy, target, artifact, or manifest drift because a mutable ref still has the same name
→ ✅ Any identity mismatch invalidates approval and restarts convergence, review, candidate binding, and authorization

❌ Two devices dispatching the same target concurrently, or handing off mutable local state between users
→ ✅ One target-and-candidate idempotency key, one fenced controller, and handoff only through immutable revisions and joined receipts

❌ Treating provider-specific branch names, commands, approval products, or hosting services as universal lifecycle semantics
→ ✅ A provider-neutral receipt protocol with concrete behavior isolated in replaceable reference implementation adapters

❌ The same approach retried with cosmetic variations until the budget is gone
→ ✅ Two failures trigger root-cause diagnosis and a different approach; the third distinct failure escalates

❌ A task list with cycles, or a wave whose tasks write the same artifact concurrently
→ ✅ Acyclic dependency graph; wave membership checked for write disjointness before dispatch

## Mantra Application

**"Specification grounds every task · Bounds make every task finite · Independence makes every verdict trustworthy · Grants make every capability deliberate · Evidence earns every rung · Persistence makes every run resumable · Gates keep every irreversible choice human"**

- **Specification grounds**: a task with no VCC behind it is work no rung will credit, so the bridge is a derivation and never a fresh authoring act
- **Bounds make finite**: four bounds and a circuit-breaker per task, because an unbounded task is an unbounded loop wearing a checkbox
- **Independence makes trustworthy**: the Evaluator is a mechanism the Implementer does not adjudicate; every other role may collapse, this one may not
- **Grants make deliberate**: capability is scoped per task to the narrowest sufficient class, and irreversibility is gated per occurrence rather than per session
- **Evidence earns**: execution's output is not code, it is the Evidence References that let the Readiness Ladder move; unsurfaced work raises nothing
- **Persistence makes resumable**: state lives outside working context, so a long run survives compaction instead of re-spending its way back to where it was
- **Gates keep human**: scope, irreversibility, promotion, and re-authorisation are Operator decisions, and an absent decision is a blocked task rather than an assumed yes
