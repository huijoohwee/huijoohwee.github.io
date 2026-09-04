---
title: "PRD, TAD & ADR Verification & Conformance Module"
doc_type: "Guidelines Module"
version: "1.0.1"
date: "2026-09-05"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "2.4.0"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# PRD, TAD & ADR Verification & Conformance Module

## Scope & Ownership

This module owns the Verifiable Completion Condition primitive, the Evidence Reference, the closure rules, the authoring-domain finding vocabulary, and the validation checklists that discharge the phase gates.

It inherits the parent set's Scope & Neutrality Contract, Rule Identity derivation, and finding recording contract without restating them. Rule IDs derive from the owning `##` section anchor and the rule's document-order ordinal, exactly as in the parent.

---

## Autonomous Implementation Verification

A well-formed PRD acceptance criterion **is** a well-formed **Verifiable Completion Condition (VCC)**. A VCC is a tool-agnostic primitive: a single, evaluator-checkable end state plus the proof of how it is demonstrated. This section is intentionally vendor-neutral — it defines the VCC contract, then lists interchangeable reference implementations.

### The VCC Primitive

A VCC has three required parts and one optional bound:

| Part | Definition |
|---|---|
| **End state** | One measurable, observable outcome (test result, build exit code, file count, empty queue, response time) |
| **Stated check** | How the outcome is demonstrated (`<test command> exits 0`, `status is clean`) |
| **Constraint** | What must not change while reaching the end state |
| **Bound** *(optional)* | A cap such as "stop after N iterations" to prevent runaway loops |

A VCC is judged against what the executing agent has **already surfaced in its own output** — the evaluator does not independently run commands or read files. Write conditions as things the agent's output can demonstrate.

### The Criterion → Condition Pipeline

Every acceptance criterion written at Phase 1 is traceable to a VCC used at implementation time. The three properties that make a criterion testable make a VCC evaluable:

| PRD Property | VCC Property | Shared Requirement |
|---|---|---|
| Observable outcome | Evaluator-verifiable | The agent surfaces proof in its own output |
| Stated check | Stated check | How completion is demonstrated (`<test command>`, `status check`, etc.) |
| Scope constraint | Constraint clause | What must not change on the way there |

**Translation pattern**:
```
Given [context] When [action] Then [outcome]
   ↓
Verify [outcome] by [check] with [constraint] (optionally: stop after N iterations)
```

**Example** (placeholders only — substitute your own identifiers):
```
Criterion:  Given a valid token, when the refresh endpoint is called, then a 200 response is returned within 200 ms with a refreshed token.

VCC:  all tests in [auth test suite] pass, the refresh endpoint returns 200 under 200 ms per load-test output, and no other test file is modified
```

### Writing Strong VCCs

**Well-formed examples** (directly derivable from Given-When-Then criteria):
```
Verify: all tests in [auth test suite] pass and the lint step exits 0

Verify: [changelog] has an entry for every merged change this sprint and no existing entries are modified

Verify: the migration runs without errors and row counts in [table A] and [table B] match pre-migration snapshots, or stop after 15 iterations
```

**Anti-patterns** (mirror vague acceptance criteria):
```
❌ Verify: the code looks good          → no observable proof
❌ Verify: refactoring is complete       → no stated check, no end state
❌ Verify: performance is improved       → no measurable threshold
```

### Reference Implementations

A VCC is mechanism-independent. Any of the following can host it; choose by what triggers the next iteration and how completion is judged. Each is a non-binding example — swap freely.

| Mechanism class | Next iteration starts when | Completion judged by | Example tooling |
|---|---|---|---|
| Completion-condition command | Previous iteration finishes | Independent evaluator confirms the condition | An autonomous coding agent's "goal/condition" command (e.g. Claude Code [`/goal`](https://code.claude.com/docs/en/goal)) |
| Timed loop | A time interval elapses | Operator stops it, or agent judges done | Any scheduler/poller running a recurring check |
| Stop/exit hook | Previous iteration finishes | A deterministic script decides | CI gate, pre-merge hook, custom evaluator script |

**Implementation-neutral requirements** (apply regardless of mechanism):
- A **separate evaluator** decides completion, independent of the agent doing the work, so the verdict is not self-graded. **Independence is mechanical, not organisational**: the requirement is satisfied when the evaluator is a different *mechanism* from the implementer — a deterministic check, a hook, or a separate evaluating process — and it is not satisfied by a different job title running the same judgement. A solo operator therefore satisfies this rule by delegating the verdict to a check they do not adjudicate, and violates it by reading their own output and declaring it done. Role collapse in Role—Action—Outcome applies to authoring functions; it does not extend to the evaluator.
- The evaluator judges only **surfaced output**; the agent must emit the proof (logs, exit codes, counts) into its own transcript.
- Every loop carries an explicit **iteration bound** and circuit-breaker, consistent with the Orchestration Topology rules.

### The Evidence Reference

A VCC states what must be true. An **Evidence Reference** records that it *was* true, and is the only currency the Readiness Ladder accepts.

| Part | Definition |
|---|---|
| **Named check** | The reproducible check that was run, named exactly as it is invocable |
| **Recorded result** | The surfaced outcome of that run (exit code, count, test summary, response measurement) |
| **Surface** | Which lane the check ran in: authoring, mirror, or delivery |

**Directives**:
- Attach every Evidence Reference to the VCC it satisfies; an Evidence Reference with no VCC proves nothing and an unsatisfied VCC caps the rung
- Name the check as it is actually invocable; an Evidence Reference naming a check that no longer exists is `stale-evidence`
- Record a result, not an assertion that a result exists; a named check with no recorded result cannot raise a rung
- Keep the surface explicit, because it decides whether the evidence counts toward local or delivered readiness

### Traceability Extension

Extend the traceability pattern through to the evidence that closes it:

```
PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface] ↔ VCC [condition] ↔ Evidence Reference [check + result] → Readiness rung
```

Record derived VCCs in the TAD component specification alongside the acceptance criteria they implement, so conditions stay synchronized when requirements evolve (see Phase 4). Record the Evidence Reference beside the VCC so the rung is recomputable from the document alone.

### Closure Rules

The chain is bidirectional, and a break in **either** direction is a defect rather than a gap to be tolerated:

| Break | Finding | Meaning |
|---|---|---|
| A rule requiring an artifact has no artifact | `unimplemented-guideline` | The rule is decorative |
| An artifact answers to no rule | `unguided-artifact` | The artifact is unowned |
| A readiness claim has no satisfying evidence | `unproven-claim` | The status is asserted, not earned |
| A reference names a target that does not resolve | `unresolvable-reference` | The chain is broken mid-link |

**Directives**:
- Distinguish artifact-bearing rules from advisory guidance explicitly; only artifact-bearing rules can produce an `unimplemented-guideline`, and mislabelling advice as a rule inflates the defect count without improving the product
- Report coverage as a ratio of linked artifact-bearing rules to total artifact-bearing rules; forbid claiming alignment without stating that ratio
- Resolve or formally track every break; forbid silently accepting a broken link because the surrounding document reads well

---

---

## Conformance Findings

**Defines the typed vocabulary a conformance check records against this guideline set.** The Anti-Pattern Guards section states *what* is prohibited in prose; this section makes each prohibition addressable, comparable, and regression-trackable. Without it, a violation can be discussed but not counted.

### Recording Contract

Every finding carries exactly six fields:

| Field | Definition |
|---|---|
| **Finding Type** | One member of the enumeration below; forbid ad-hoc type strings |
| **Severity** | Exactly one of `blocker`, `major`, `minor` |
| **Rule anchor** | The **Rule ID** of the violated rule per Rule Identity & Classification, not the section anchor alone |
| **Artifact reference** | The artifact involved, or an explicit not-applicable marker when none is |
| **Evidence excerpt** | The offending text, quoted verbatim and bounded in length |
| **Remediation** | Exactly one of a documentation change, a specification change, or a locally reproducible check |

### Severity Assignment

| Severity | Assigned when |
|---|---|
| **`blocker`** | The violation contradicts a `runtime-ready` or higher claim, breaches a Deploy Boundary, or leaves token spend unbounded |
| **`major`** | An artifact-bearing rule has no resolvable artifact or no evidence |
| **`minor`** | Every other violation |

### Finding Enumeration

| Rule family | Finding Type | Severity |
|---|---|---|
| Frontmatter | `missing-frontmatter-key` | `minor` |
| Frontmatter | `malformed-document` | `major` |
| Directive Grammar (CID) | `cid-schema-noncompliant` | `minor` |
| Directive Grammar (CID) | `cid-context-uncited` | `major` |
| Directive Grammar (CID) | `cid-grounding-unverified` | `blocker` |
| Directive Grammar (CID) | `cid-clarification-malformed` | `minor` |
| Directive Grammar (CID) | `cid-composition-divergence` | `major` |
| Directive Grammar (CID) | `cid-density-violation` | `minor` |
| Directive Grammar (CID) | `cid-decomposition-missing` | `major` |
| Directive Grammar (CID) | `cid-budget-exceeded` | `major` |
| Directive Grammar (CID) | `cid-naming-noncompliant` | `minor` |
| Readiness Ladder | `unknown-status` | `minor` |
| Readiness Ladder | `unproven-claim` | `blocker` |
| Readiness Ladder | `blended-status` | `minor` |
| Traceability closure | `unimplemented-guideline` | `major` |
| Traceability closure | `unguided-artifact` | `minor` |
| Traceability closure | `unresolvable-reference` | `major` |
| Traceability closure | `stale-evidence` | `major` |
| Traceability closure | `missing-companion` | `major` |
| Traceability closure | `artifact-naming-noncompliant` | `minor` |
| Ownership | `duplicate-owner` | `major` |
| Ownership | `status-conflict` | `major` |
| Phase gates | `gate-order-drift` | `major` |
| Phase gates | `gate-sequence-violation` | `major` |
| Scope & neutrality | `vendor-coupling` | `major` |
| Scope & neutrality | `path-derived-claim` | `major` |
| Scope & neutrality | `non-modular-section` | `minor` |
| Scope & neutrality | `human-gate-unstated` | `major` |
| Economics | `missing-economics-metric` | `major` |
| Economics | `blended-deployment-tco` | `major` |
| Economics | `missing-foss-comparison` | `major` |
| Economics | `unbounded-loop` | `blocker` |
| Economics | `paid-read-path` | `major` |
| Delivery reach | `incomplete-delivery-reach` | `major` |
| Invocation surface | `orphan-route` | `major` |
| Invocation surface | `ambiguous-route` | `major` |
| Invocation surface | `unfederated-tool` | `major` |
| Invocation surface | `uncatalogued-tool` | `major` |
| Lane topology | `missing-lane` | `blocker` |
| Lane topology | `incomplete-lane-transition` | `major` |
| Lane topology | `deploy-boundary-breach` | `blocker` |
| Lane topology | `ungated-promotion` | `blocker` |
| Topology | `incomplete-topology-node` | `major` |
| Product-Market Fit | `pain-point-not-validated` | `major` |
| Demonstration | `missing-demo-beat` | `minor` |
| Domain-Object Rubric | `overclaimed-rubric-level` | `major` |
| Domain-Object Rubric | `unresolved-rubric-gap` | `minor` |
| Roadmap | `roadmap-reuse-unstated` | `major` |
| Roadmap | `roadmap-order-unexplained` | `minor` |
| Roadmap | `roadmap-scope-silently-dropped` | `minor` |
| Platform Selection | `vendor-preference-unscored` | `major` |
| Platform Selection | `constraint-gate-skipped` | `major` |
| Platform Selection | `outranking-relation-unstated` | `minor` |
| Platform Selection | `outranking-incomparability-collapsed` | `minor` |
| Platform Selection | `argumentation-graph-missing` | `major` |
| Platform Selection | `argumentation-self-graded` | `blocker` |
| Monetization | `monetization-demand-unvalidated` | `major` |
| Division of Work | `duplicate-capability-owner` | `major` |
| Division of Work | `component-origin-unstated` | `minor` |
| Division of Work | `unjustified-storage-duplication` | `major` |
| Concurrent Collaboration | `worktree-provenance-missing` | `minor` |
| Concurrent Collaboration | `merge-non-idempotent` | `major` |
| Concurrent Collaboration | `merge-lossy` | `major` |
| Concurrent Collaboration | `deadlock-unbounded-wait` | `blocker` |
| Concurrent Collaboration | `work-tree-sprawl` | `minor` |

### Directives

- Treat this enumeration as the single source of truth for **authoring-domain** finding names; execution-domain findings (task, agent, and tool-permission violations) are owned by the ADLC Guidelines companion set, and the conformance vocabulary is the union of the two. Forbid either set redefining a type the other owns
- A check that invents a type string cannot be compared against a prior run
- Where a rule states a severity inline, that stated severity governs over the table default
- Deduplicate on the triple `(Finding Type, Rule ID, artifact reference)`; one violation is one finding no matter how many passes observe it, and Rule ID granularity keeps two distinct violations in one section distinct
- Order findings by severity, then Finding Type, then Rule ID, so any finding set yields exactly one review order
- Report a zero count for every type with no finding; an omitted row is indistinguishable from an unchecked rule
- Keep the finding count bounded by the number of rules plus the number of artifacts; an unbounded count means the check is multiplying rather than classifying
- Extend the enumeration by adding a row here first, then the rule that raises it; forbid the reverse order
- Forbid a Finding Type with no rule that can raise it. A type whose triggering concept is undefined in this set is unraisable, which makes the enumeration overstate what is being checked; either define the concept or remove the type

### Check Determinism

The regression comparison above is meaningless unless two runs over the same inputs are comparable by construction:

- **Deterministic**: two runs over byte-identical inputs and equal configuration produce identical finding sets; forbid a check whose output depends on a wall clock, a random source, or a filesystem enumeration order
- **Order-independent**: processing the audited documents in any order produces one identical finding set
- **Additive**: adding a document preserves every finding already raised against the unchanged documents; a new document that silently clears an existing finding indicates the check is reading across document boundaries in an unstated way
- **Bounded**: the finding count stays at or below the number of rules plus the number of artifacts
- **Comparable**: finding-set equality is judged on Finding Type, severity, Rule ID, artifact reference, evidence excerpt, and remediation only; forbid comparing run timestamps, ordering, or elapsed time
- **Complete on degraded input**: a malformed or unreadable document yields a typed finding and the run completes; forbid aborting a run because one input is defective

---

---

## Validation Checklist

**Pre-Implementation**:
- [ ] **Frontmatter present** as the first block in every canonical PRD/TAD/ADR doc; scalars with reserved punctuation quoted; no typed wrappers outside validation fixtures
- [ ] User journey mapped before stories written; every story anchored to a journey stage
- [ ] Workflows defined with trigger, happy path, alternate paths, error paths, and postconditions
- [ ] Data flows typed at every stage boundary with persistence and error handling documented
- [ ] User stories follow "As a… I want… So that" format
- [ ] Acceptance criteria use Given-When-Then with observable outcomes
- [ ] Every acceptance criterion translatable to a VCC: one measurable end state + a stated check + scope constraints
- [ ] Features prioritized via MoSCoW **with ROI score and rationale per feature**
- [ ] **Min-viable scope** explicitly stated for Must-tier features before implementation begins
- [ ] **Token budget estimated** for every AI-powered pipeline: prompt tokens + completion tokens + cache hit rate at target load
- [ ] **Monthly TCO estimated** for every dependency; FOSS-first decision recorded in ADR
- [ ] **Deployment-model variants separated** in every TCO comparison where a candidate offers more than one (managed/serverless vs provisioned/self-managed vs hybrid/consolidated); ops burden stated alongside cost for each variant
- [ ] **ROI score computed** for every Must/Should feature using `(impact × reach) / (build + TCO + token cost)`
- [ ] **Time-to-value (TTV) estimated** in Phase 0 — steps and elapsed time recorded; TTV target stated as a named row in PRD success metrics for every user-facing feature
- [ ] **Orchestration/Harness Flow documented** for every AI-powered pipeline: dispatcher, executor, observer, and consumer roles named; cost log fields specified; fallback paths defined
- [ ] **Agentic loops** carry max-iteration bound and circuit-breaker condition in the Orchestration/Harness Flow template
- [ ] **Topology documented** for every system with ≥3 components: all connection types labelled (sync/async/stream); data residency stated for every storage node; `flowchart TB` with one named subgraph per boundary present
- [ ] Components have single responsibility; interfaces specified with explicit contracts
- [ ] **AI components have harness contract**: typed input schema, typed output schema, cost log fields, fallback path
- [ ] **Orchestration topology specified** for every AI pipeline: sequential / fan-out / agentic loop; max-iteration bound and circuit-breaker condition defined for loops
- [ ] Architectural decisions documented with ADRs **including TCO comparison and FOSS alternative**
- [ ] Architecture diagrams use the mandated notation (not ASCII for >5 nodes); each carries an ID, a declared class, a caption, and a version stamp
- [ ] Component inventory table accompanies every architecture diagram; Diagram Register present with one row per diagram
- [ ] **Target render surface declared** and the Canvas-Render Contract satisfied wherever a diagram must project into a graph canvas surface; projected node, edge, and cluster counts recorded, and non-projecting classes recorded as zero
- [ ] PRD-to-TAD traceability established via `PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface]`
- [ ] VCCs recorded in TAD component specs and traced to source criteria
- [ ] No implementation detail in PRD; no business logic in TAD
- [ ] **Agent-platform readiness** documented when in scope: Agentic OS (OS Status Surface), AI Agent (discovery + surface matrix), MCP Gateway (federation contract); ambiguous “agent-ready” claims forbidden
- [ ] **Readiness tiers** stated (Must vs Follow-on vs Won't) with execution order and linked follow-on PRD/TAD when Follow-on tracks exist
- [ ] **Gateway federation ADR** compares discovery-first pattern vs unified-proxy alternative when ≥2 tool transports exist

**Post-Documentation Review**:
- [ ] **Frontmatter validated** against the SSOT contract (identity, status, versioning fields) before baseline sign-off
- [ ] Stakeholders validate PRD addresses user problems
- [ ] Development team confirms TAD provides sufficient guidance
- [ ] QA confirms acceptance criteria are objectively testable
- [ ] Success metrics defined with baseline, target, and timeline
- [ ] Quality attributes specified with measurable scenarios; **token cost and TCO attributes present for AI-powered components**
- [ ] Open questions resolved or formally tracked
- [ ] **TTV validated** on a clean environment (prerequisites only, no pre-configuration); actual steps and elapsed time recorded and compared to Phase 0 estimate
- [ ] **Topology diagram reviewed**: all nodes map to TAD Component Specifications; no orphaned topology nodes; version note present
- [ ] **Token budget actuals vs estimates reviewed** each sprint; projections updated on model pricing or traffic changes
- [ ] **FOSS alternatives re-evaluated** if any dependency TCO crosses the 12-month justification threshold
- [ ] **Agent-platform execution order reviewed**: Follow-on tracks not started before Must-tier VCCs pass; spend-safety track precedes live orchestration unless ADR accepts risk
- [ ] **Readiness gap matrix** present when any dimension is below `runtime-ready`; local and delivered rungs in separate columns

**Alignment Gate** *(discharges the Phase 3 alignment check; every item maps to a Finding Type)*:
- [ ] **Readiness rungs derived**, not authored: every rung traces to an Evidence Reference with a named check and a recorded result — else `unproven-claim`
- [ ] **Status vocabulary closed**: every status value appears in the Readiness Ladder — else `unknown-status`
- [ ] **Local and delivered readiness separated** into two fields everywhere a status appears — else `blended-status`
- [ ] **Forward closure**: every artifact-bearing rule names at least one artifact — else `unimplemented-guideline`
- [ ] **Reverse closure**: every artifact answers to at least one rule — else `unguided-artifact`
- [ ] **Coverage ratio stated**: linked artifact-bearing rules over total artifact-bearing rules, reported as a number
- [ ] **References resolve**: every named document, command, and companion resolves — else `unresolvable-reference` or `missing-companion`
- [ ] **Evidence current**: every named check is still invocable — else `stale-evidence`
- [ ] **Single owner per contract**: no contract claimed by two documents — else `duplicate-owner`; no capability carrying two different rungs — else `status-conflict`
- [ ] **Phase order intact**: documented stage order matches this guideline set's phase order and no later gate passes while an earlier one fails — else `gate-order-drift` or `gate-sequence-violation`
- [ ] **Neutrality held**: no brand outside a labelled reference-implementation block, no claim derived from a path, every `##` section liftable — else `vendor-coupling`, `path-derived-claim`, or `non-modular-section`
- [ ] **Economics complete**: ROI, 12-month TCO per deployment model, token budget, and TTV present and quantified; every loop bounded; every read path zero-cost — else `missing-economics-metric`, `blended-deployment-tco`, `missing-foss-comparison`, `unbounded-loop`, or `paid-read-path`
- [ ] **Delivery reach stated**: browser reach, mobile reach, and offline behaviour named per user-facing capability — else `incomplete-delivery-reach`
- [ ] **Invocation routes resolve** to exactly one owner; every tool identity federated and catalogued — else `orphan-route`, `ambiguous-route`, `unfederated-tool`, or `uncatalogued-tool`
- [ ] **Lanes and boundaries complete**: three lanes documented, each boundary carrying its four parts and reading `closed` absent a referenced operator instruction; no authoring-lane command mutating a delivered surface — else `missing-lane`, `incomplete-lane-transition`, `ungated-promotion`, or `deploy-boundary-breach`
- [ ] **Rule IDs used** as the finding anchor and in the deduplication key; every rule classified artifact-bearing or advisory; advisory count reported separately
- [ ] **Conformance frontmatter keys present**: `owner`, `local_rung`, `delivered_rung`, `lane`, `universal_scope` — no blended `status` key
- [ ] **Invocation Register present** for every document declaring a route; every tool identity in both the federation contract and the capability catalog
- [ ] **Every loop in this guideline set's own process bounded**, including the Phase 4 revision cycle and Iterative Refinement
- [ ] **Check determinism satisfied**: deterministic, order-independent, additive, bounded, comparable, and complete on degraded input
- [ ] **Evaluator is a distinct mechanism** from the implementer; role collapse does not extend to the Evaluator
- [ ] **Guideline load budget respected**: sections loaded per phase; guideline load cost recorded in the authoring loop's token budget
- [ ] **Execution-domain conformance discharged** against the ADLC Guidelines companion set; a runtime-readiness claim sourced from this document alone is incomplete
- [ ] **Diagram-domain and canvas-domain conformance discharged** against the diagram companion modules; the finding set is reported as the union of all four domain enumerations, and a canvas-renderability claim sourced from this document alone is incomplete
- [ ] **Zero `blocker` findings** before baseline sign-off; `major` and `minor` findings resolved or formally tracked with an owner
- [ ] **Finding set compared** against the prior run; any new `blocker` treated as a regression

---

---
