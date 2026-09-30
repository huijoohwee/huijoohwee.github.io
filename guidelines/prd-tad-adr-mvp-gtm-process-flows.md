---
title: "PRD, TAD & ADR Process & Flow Patterns Module"
doc_type: "Guidelines Module"
version: "1.4.0"
date: "2026-09-30"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "3.4.0"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# PRD, TAD & ADR Process & Flow Patterns Module

## Scope & Ownership

This module owns the phase-gated authoring process and the five canonical flow patterns that bridge user intent to system behaviour. It owns no status vocabulary and no finding names.

It inherits the parent set's Scope & Neutrality Contract, Rule Identity derivation, and finding recording contract without restating them. Rule IDs derive from the owning `##` section anchor and the rule's document-order ordinal, exactly as in the parent.

---

## From 0 to 1: PRD & TAD Creation Process

These are artifact roles and evidence seams, not mandatory meetings or separate files. Existing explicit
objective/scope authorization covers reversible in-scope authoring and execution after the relevant checks.
Re-enter only the affected seam when evidence changes; new product choices and production effects retain
their authority boundary under [ADLC autonomous continuation](./adlc-autonomous-continuation.md).

### Phase 0 — Problem Discovery
**Start with a falsifiable pain hypothesis; validate it before claiming demand.**

1. Identify target personas and their pain points via research
2. Quantify problem impact with observable metrics
3. Map the current user journey to locate friction points
4. State a falsifiable problem hypothesis and rank it with payer and channel hypotheses under the [Lean Startup Guidelines](./lean-startup-guidelines.md)
5. Gain stakeholder alignment on problem scope
6. Run a preliminary **ROI score** and **TCO estimate**; confirm problem is worth solving at projected cost
7. Identify whether the solution requires an AI harness, FOSS tools, or proprietary APIs — flag any dependency with non-zero egress or token cost
8. Estimate **time-to-value (TTV)**: count the minimum steps a target persona must complete from zero state (prerequisites installed, no configuration done) to first successful outcome; set an acceptable TTV ceiling before Phase 1 begins; flag if TTV exceeds threshold

**Gate**: record pain/WTP evidence or label the hypothesis unvalidated, scope the next learning or delivery
outcome, and compare expected value, TCO and TTV with explicit assumptions. A bounded discovery sprint
may gather missing evidence; it cannot claim demand, revenue or production readiness without proof.

### Phase 1 — PRD Authoring
**Translate validated problems into structured requirements.**

1. Write problem statement: pain point → user impact → opportunity
2. Define personas with jobs-to-be-done
3. Map user journey: trigger → steps → decision points → outcome
4. Decompose epics into user stories (As a… I want… So that…)
5. Write Given-When-Then acceptance criteria per story
6. Apply MoSCoW prioritization to feature set **with explicit ROI score and TCO estimate per feature**; use **min-viable-max-value** framing — default to the smallest scope delivering the highest impact
7. Define success metrics: baseline → target → timeline; include **token cost / month**, **monthly TCO**, and **time-to-value (TTV)** as first-class metrics for any AI-powered feature
8. Enumerate scope boundaries and explicit exclusions
9. Log open questions and unresolved assumptions
10. Flag every dependency: FOSS, zero-TCO, or justify proprietary selection inline

**Gate**: verify PRD feasibility and TCO/token-budget alignment before dependent design. A named check
or independent reviewer supplies the verdict; a separate architect role or meeting is not required.

### Phase 2 — TAD Authoring
**Translate PRD requirements into verifiable architecture.**

1. Derive component list from PRD epics and acceptance criteria
2. Assign single responsibility to each component (SRP)
3. Map data flows: source → transform → store → consume
4. Specify integration contracts: protocol, payload schema, error handling
5. Map user workflows to system sequence diagrams
6. Map **Orchestration/Harness Flow** for every AI-powered pipeline: define dispatcher, executor, observer, and consumer roles; specify routing logic, max-iteration bound, and circuit-breaker condition
7. Map **Topology**: enumerate all runtime components, their lane, their connection types (sync/async/stream), trust boundaries, and data residency; then map **Lane Topology & Deploy Boundary** for the movement between lanes
8. Document architectural decisions with ADR format; **every ADR must include a TCO comparison and FOSS-first evaluation**
9. Define quality attribute scenarios: performance, security, scalability, observability, **token cost, TCO**
10. Design AI-powered components as **harnesses** (typed input schema → model call → typed output schema → cost log); specify the orchestration topology (sequential / fan-out / agentic loop) and **max-iteration bound** for every loop
11. Estimate **token budget per pipeline**: average prompt tokens + completion tokens + cache hit rate at target load; flag pipelines exceeding budget threshold
12. Plan deployment strategy and migration path; default to zero-egress infrastructure
13. Render architecture diagrams in the mandated notation; compile the component inventory table and the Diagram Register
14. Derive Verifiable Completion Conditions (VCCs) from acceptance criteria — each criterion must be expressible as a condition an autonomous agent can evaluate from its own surfaced output

**Gate**: independently verify that TAD preserves user value and the accepted ROI/TCO envelope.
Reuse the current scope decision; ask only when a material choice remains unresolved.

### Phase 3 — Alignment & Review
**Verify PRD ↔ TAD coherence and applicable authorization.**

1. Establish bidirectional traceability: `PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface]`
2. Confirm no implementation detail in PRD; no business logic in TAD
3. QA validates all acceptance criteria are testable **and expressible as VCCs** — each criterion must have a stated check the agent can surface in its own output (exit code, file count, test result, queue state)
4. Stakeholders approve scope and success metrics; **confirm token budget, TCO, and TTV target are within acceptable envelope**
5. Verify every AI-powered component has a harness contract, orchestration topology, and max-iteration bound documented
6. Confirm Topology diagram is present and data residency is stated for every storage node
7. Confirm agent-platform readiness dimensions in scope are documented with tier (Must/Follow-on), execution order, and VCCs per dimension
8. Confirm FOSS-first decisions are recorded in ADRs with explicit TCO comparison
9. Run the **alignment check**: verify closure in both directions per the Closure Rules, confirm every readiness rung is derived from an Evidence Reference, and record the resulting findings with their types and severities
10. Confirm every lane and Deploy Boundary is documented and that every boundary reads `closed` absent a referenced operator instruction
11. Resolve or formally track all open questions

**Gate**: referenced artifact revisions and affected alignment checks must support dependent implementation.
Correct in-scope grounding defects in the owning artifact, then recheck; continue dependency-disjoint work.
Do not request a new approval for a reversible seam already covered by the recorded objective and scope.

### Phase 4 — Build & Evidence the MVP
**Execute the baselined `Must` slice through the ADLC and earn its rungs from evidence.**

1. Hand the ADLC a baselined `continuity_id@revision` with zero open `blocker`, current grounding records and VCCs through the parent's [ADLC Execution Seam](./prd-tad-adr-mvp-gtm-guidelines.md#adlc-execution-seam)
2. Derive the task list from VCCs through the [Specification to Task Bridge](./adlc-guidelines.md#specification-to-task-bridge); work an agent performs on experiments or projections carries execution-integrity VCCs from the GTM role
3. **START** one scoped lane per disjoint write set and implement the smallest dependency-closed vertical slice through its real interfaces
4. **RELEASE** one exact candidate through protected integration and record the Integration Receipt
5. **DEPLOY** one exact protected revision only across a named Deploy Boundary with a referenced operator instruction; record deployment, runtime and rollback receipts separately
6. Run the Demo Skeleton against the delivered revision, emit Evidence References and derive local and delivered rungs separately
7. Emit per-task cost fields for the [ADLC Cost Ledger](./prd-tad-adr-mvp-gtm-venture.md#adlc-cost-ledger) and update the joined artifact before each turn or session ends

**Gate**: every `Must` VCC is `verified` by an independent Evaluator with an Evidence Reference; rungs derive
from those references only; source integration, deployment and runtime claims stay separate. A built slice
proves the build, not the hypothesis it was built to test.

### Phase 5 — GTM and Venture Projections
**Project the accepted revision to a payer, an operator, and a funder without originating new claims.**

Discovery already drafts market, offer and financial assumptions. This phase publishes current projections; it does not postpone viability research until delivery. Consume the parent's [C01–C16 coverage contract](./prd-tad-adr-mvp-gtm-guidelines.md#from-0-to-1-coverage-contract).

1. Rank GTM streams by distance to a real first dollar using recorded WTP evidence
2. Generate the Pitch Deck Slide Register from the Demo Skeleton, GTM path, Financial Model headlines, and Roadmap phases; run the [deck lifecycle](./pitch-deck-guidelines.md#deck-lifecycle) per audience variant
3. Generate the Business Plan from all five roles plus legal, capitalization, acquisition, and business risks and the open finding set; run the [plan lifecycle](./business-plan-guidelines.md#plan-lifecycle) per audience variant
4. Generate the Financial Model from TAD/GTM assumptions and ADLC receipts: driver schedules, unit economics, linked income/cash/balance statements, scenarios, ADLC Cost Ledger; run the [model lifecycle](./financial-model-guidelines.md#model-lifecycle) and export numbers through its Headline Register
5. Join every projection by `continuity_id@revision`; regenerate when the revision changes
6. Feed learn-loop results into a successor Context, never a backward edit of the accepted revision

**Gate**: every projected claim cites its owning section or Evidence Reference; actuals, forecasts, recognized revenue and collected cash follow the Venture Record measurement basis; first-dollar claims cite payment evidence; the ADLC Cost Ledger is filled from receipts for the stated period. An audience action on a stale or unsourced projection is blocked.

### Across Phases — Living Documents
**Iterate documents as product and architecture evolve; these rules apply in every phase.**

- Apply semantic versioning to every change
- Update PRD and TAD together whenever requirements shift
- Re-run relevant gate reviews for breaking changes
- Preserve superseded ADR decisions through a stable successor link and retrievable revision history; reviewed cleanup may remove obsolete projections
- Re-derive VCCs whenever acceptance criteria change; stale conditions produce false completions
- **Re-derive every readiness rung** whenever a VCC or an Evidence Reference changes; a rung is a computed value, so leaving it pinned after the evidence moves is a false completion
- **Re-run the alignment check** on every baselined change and compare the finding set against the prior run; a new `blocker` finding is a regression, not a note
- **Bound the iteration**: each revision cycle carries the max-iteration bound owned by the parent's PRD ↔ TAD Integration section and a circuit-breaker, exactly as required of every other loop in this guideline set. The default circuit-breaker is *no reduction in open `blocker` findings across two consecutive cycles*; on breaking the circuit, stop revising and escalate the unresolved findings as a scope or design decision rather than continuing to iterate
- **Track token cost actuals vs estimates** each sprint; update budget projections when model pricing or traffic changes
- **Re-evaluate FOSS alternatives** whenever a dependency's TCO crosses the 12-month justification threshold

### End-to-End Lifecycle Map

The canonical join of phases, loops, owners and evidence. Other modules cite a row; none restates it.

| Phase | Loop / verb | Authoring owner | Learning and projection owner | Execution | Evidence out | Cost Ledger line |
|---|---|---|---|---|---|---|
| 0 Discovery | hypothesize → experiment → decide | [Pain-Point Mapping](./prd-tad-adr-mvp-gtm-guidelines.md#pain-point-to-feature-mapping), [Time-to-Value](./prd-tad-adr-mvp-gtm-guidelines.md#time-to-value) | [Lean Startup](./lean-startup-guidelines.md#learning-loop) | a lane only for a feasibility build | labelled pain, WTP, measured baselines | discovery minutes, tokens, experiment spend |
| 1–3 Specify | PRD → TAD → ADR → alignment | [Core Templates](./prd-tad-adr-mvp-gtm-templates.md), [Selection Criteria](./prd-tad-adr-mvp-gtm-selection.md), [Verification](./prd-tad-adr-mvp-gtm-verification.md) | experiment results cited as evidence | none; authoring only | baselined `continuity_id@revision`, zero `blocker` | authoring minutes, tokens |
| 4 Build & evidence | `START → RELEASE → DEPLOY` | MVP, [Demo Skeleton](./prd-tad-adr-mvp-gtm-guidelines.md#demo-skeleton), [Readiness](./prd-tad-adr-mvp-gtm-readiness.md) | the MVP slice is the experiment artifact when a build is needed | [ADLC Guidelines](./adlc-guidelines.md#specification-to-task-bridge) | Integration, deployment and runtime receipts; derived rungs | per-task receipts, CI minutes, fees |
| 5 Project | variant → claim record → reconcile → authorize → deliver | GTM, [Monetization](./prd-tad-adr-mvp-gtm-guidelines.md#monetization), [Roadmap](./prd-tad-adr-mvp-gtm-guidelines.md#roadmap) | [Pitch Deck](./pitch-deck-guidelines.md#deck-lifecycle), [Business Plan](./business-plan-guidelines.md#plan-lifecycle), [Financial Model](./financial-model-guidelines.md#model-lifecycle) | tasks from execution-integrity VCCs; sends and publication at the release seam | manifests, Headline Register, delivery logs | generation, rehearsal and review cost |
| Learn | measure → decide → successor | Roadmap thresholds, coverage C16 | [Pivot-or-Persevere Record](./lean-startup-guidelines.md#pivot-or-persevere-record), [variance](./financial-model-guidelines.md#actuals-variance-and-re-forecast) | successor revisions through new lanes | decision record, successor Context | experiment and analysis cost |

**Artifact-bearing directives**:
- Place every lifecycle activity on one row; an activity with no row, or a module restating a row, is `duplicate-owner`
- Keep evidence per row distinct: a verified task, a passed experiment threshold, a delivered deck and a collected payment never substitute for one another — `blended-status`

### Autonomous From-0-to-1 Run

An Orchestrator given an objective, scope, bounds and the capabilities to act continues through every
step below without clerical confirmation, under [ADLC autonomous continuation](./adlc-autonomous-continuation.md).
It stops only at the listed stop points, which reuse the ADLC capability classes and gates.

| Step | Autonomous actions | Stop point | Highest readiness it can support |
|---|---|---|---|
| Discover | draft and rank hypotheses, design experiments, analyse existing evidence | contacting, recruiting or charging people (Irreversible external commitment); any spend | none; evidence labels only |
| Specify | author and ground PRD, TAD and ADR; run alignment; derive VCCs | an unresolved product, scope or pricing decision | `spec-complete` |
| Build | start lanes, implement, verify, release exact candidates | scope change, irreversible operation, exhausted bounds needing new authority | `dev-proven` |
| Deploy | prepare the exact candidate and its receipt chain | production authorization and the Deploy Boundary operator instruction | `runtime-ready`, then `production-verified` from live receipts |
| Project | generate variants, claim records, headline register; reconcile deck, plan and model | every external send or publication (Boundary-crossing, at the release seam) | none; projections never earn a rung |
| Learn | analyse results, propose successor values, draft the decision record | a pivot or stop that changes scope or product choice | none; decisions are recorded, not rated |

**Artifact-bearing directives**:
- Continue through every dependency-ready step inside the recorded authority; asking for a confirmation the recorded authority already covers is `human-gate-unstated`
- Stop at each listed point with the decision, options and consequence surfaced; proceeding past one without a recorded operator decision is `ungated-promotion` for publication and deployment, and `unproven-claim` for any claim that depends on the skipped decision
- Fail closed: a missing receipt, join, check or bound blocks only the dependent step, and disjoint steps continue — `unimplemented-guideline`
- Bound every step by time, tokens, iterations and spend with a circuit-breaker — `unbounded-loop` at `blocker`
- Update the joined artifact before each turn or session ends, including blocked and failed steps — `unimplemented-guideline`

---

---

## Flow Patterns

Five canonical flow types bridge user intent (PRD) to system behavior (TAD). Every feature must trace through all five.

### User Journey Flow
**Maps how a persona moves from trigger to outcome across system touchpoints.**

```
Persona → Trigger → Step 1 → [Decision?] → Step N → Outcome → Value / Emotion
```

**User Journey Template**:
```markdown
## Journey: [Persona] — [Goal]

| Stage    | Action               | Touchpoint        | Pain Point      | Opportunity      |
|----------|----------------------|-------------------|-----------------|------------------|
| Trigger  | [What prompts user]  | [Entry channel]   | [Friction]      | [Improvement]    |
| Discover | [User action]        | [UI/API/surface]  | [Friction]      | [Improvement]    |
| Engage   | [Core task]          | [UI/API/surface]  | [Friction]      | [Improvement]    |
| Complete | [Goal achieved]      | [Confirmation]    | [Drop-off risk] | [Delight moment] |
| Return   | [Re-entry trigger]   | [Channel]         | [Churn risk]    | [Retention hook] |
```

**Directives**:
- Map journeys before writing user stories; every story must be anchored to a journey stage
- Capture emotion and friction at each stage; forbid journey-free feature specifications
- One journey per persona-goal pair; forbid omnibus journeys combining multiple goals

### Workflow Flow
**Maps how tasks sequence through actors, decisions, and system states.**

```
Trigger → [Actor: Task] → [Decision ◇] → [Branch] → Output → Next Actor
```

**Workflow Template**:
```markdown
## Workflow: [Name]

**Trigger**: [Event or condition initiating the workflow]
**Actors**: [Human roles and system components involved]

**Happy Path**:
1. [Actor] performs [action] → [system state changes]
2. [System] processes [input] → [output artifact]
3. [Actor] receives [output] → workflow complete

**Alternate Paths**:
- [Condition]: [divergent steps] → [resolution]

**Error Paths**:
- [Failure mode]: [error handling] → [recovery or escalation]

**Postconditions**: [Observable system state after workflow completes]
```

**Directives**:
- Every workflow must define: trigger, happy path, at least one alternate path, at least one error path, and postconditions
- Forbid workflows without defined postconditions
- Use `sequenceDiagram` for multi-actor workflows; use `flowchart` for single-actor task flows

### Data Flow
**Traces how data moves from source through transformation to consumption.**

```
Source → [Ingest] → [Transform] → [Store] → [Serve] → Consumer
```

**Data Flow Template**:
```markdown
## Data Flow: [Name]

| Stage     | Component        | Input Format     | Output Format    | Persistence       | Error Handling    |
|-----------|------------------|------------------|------------------|-------------------|-------------------|
| Ingest    | [Component]      | [Schema/format]  | [Schema/format]  | [None/queue/db]   | [Retry/DLQ/skip]  |
| Transform | [Component]      | [Schema/format]  | [Schema/format]  | [None/cache]      | [Retry/fail-fast] |
| Store     | [Storage layer]  | [Schema/format]  | [Schema/format]  | [DB/blob/index]   | [Rollback/alert]  |
| Serve     | [API/stream]     | [Query params]   | [Response schema]| [Cache/CDN]       | [Fallback/503]    |
```

**Directives**:
- Specify data schema at every stage boundary; forbid undocumented format transitions
- Document persistence layer and retention policy for every Store stage
- Map every TAD data flow to a PRD user journey stage; forbid orphaned data flows

### Orchestration/Harness Flow
**Maps how an agent harness routes, dispatches, executes, and observes AI calls through a pipeline.**

Distinct from Workflow (task-actor sequencing) and Data Flow (data movement): Orchestration/Harness Flow traces the *control path* — how inputs are validated, which executor handles them, how outputs are verified, and how cost is observed.

```
Trigger → [Harness: validate input] → [Dispatcher/Router] → [Executor: model call] → [Harness: validate output + emit cost log] → [Consumer] ↘ [Observer/Logger]
```

**Orchestration/Harness Flow Template**:
```markdown
## Orchestration/Harness Flow: [Pipeline Name]

**Trigger**: [Event or condition initiating the pipeline]
**Topology pattern**: [Sequential | Fan-out/Fan-in | Agentic loop]
**Max iterations** *(loops only)*: [N] | **Circuit-breaker**: [exit condition]
**Token budget**: [avg prompt tokens] + [avg completion tokens] @ [cache hit rate] = [est. cost/call]

| Role       | Component          | Input schema        | Output schema       | Cost log emitted | Fallback                    |
|------------|--------------------|---------------------|---------------------|------------------|-----------------------------|
| Dispatcher | [Component]        | [Typed payload]     | [Routed payload]    | —                | [Reject with typed error]   |
| Executor   | [Harness + model]  | [Typed prompt]      | [Typed response]    | ✓ (required)     | [Degraded mode / retry / upstream error] |
| Observer   | [Logger / monitor] | [Cost log stream]   | [Metric / alert]    | —                | [Silent fail; log gap]      |
| Consumer   | [Downstream]       | [Typed response]    | [Artifact / state]  | —                | [Upstream error propagation]|
```

**Happy path** *(inline after table)*:
1. Trigger fires → Dispatcher validates input schema → routes to Executor
2. Executor calls model → Harness validates output schema → emits cost log
3. Observer records cost log → Consumer receives typed output
4. If loop: evaluate exit condition; if not met and iterations < max → repeat from step 1

**Alternate paths**:
- Input schema invalid: Dispatcher rejects before token spend; returns typed error upstream
- Output schema invalid: Harness retries up to N; escalates to fallback after max retries
- Max iterations reached without meeting circuit-breaker: exit with partial result; surface iteration-limit error

**Error paths**:
- Model API unavailable: Executor fallback activates; degraded response or upstream error propagated
- Cost log emission fails: Observer silent-fails; pipeline continues; gap flagged in monitoring

**Postconditions**: cost log persisted; typed output delivered to Consumer or typed error returned; no unbounded token spend

**Directives**:
- Document an Orchestration/Harness Flow for every AI-powered pipeline before implementation; forbid AI pipelines with no flow spec
- Every Executor role must emit a cost log entry per call; forbid Executor nodes with no cost log field
- Every agentic loop must state max iterations and a circuit-breaker condition in the flow template; forbid unbounded loops
- Map every Orchestration/Harness Flow to its parent Workflow and its Data Flow; forbid orphaned harness flows with no journey anchor
- Render Orchestration/Harness Flows with `sequenceDiagram` (multi-actor) or `flowchart LR` (single-path); use subgraphs to bound loop sections

### Topology
**Maps the structural connection and runtime placement of all components at a stated point in time.**

Distinct from Orchestration/Harness Flow (execution sequence) and Data Flow (data movement): Topology is a *structural snapshot* — which components exist, where they run, how they connect, and where data lives.

```
[Boundary: runtime / zone / trust domain]
  └─ [Node A: role · type] ──sync──▶ [Node B: role · type]
                            ──async─▶ [Node C: role · type] ──▶ [Store D: persistence type · residency]
```

**Topology Template**:
```markdown
## Topology: [System Name] v[version] — [Date or milestone]

**Boundaries**: [Runtime environments, network zones, or trust domains in scope]

| Node        | Role                                         | Type                         | Lane                | Connects to   | Connection type     | Data residency     |
|-------------|----------------------------------------------|------------------------------|---------------------|---------------|---------------------|--------------------|
| [Component] | [Producer / Consumer / Router / Store / Gateway] | [Service / Function / DB / Queue / CDN] | [Authoring / Mirror / Delivery] | [Node(s)] | [Sync REST / Async queue / Stream / Batch] | [Local / Region / Cloud provider] |

**Runtime diagram**: [`flowchart TB` in the mandated notation — nodes grouped by boundary using named subgraphs]
**Version notes**: [What changed from prior topology version]
```

**Directives**:
- Document topology for every system with ≥3 components; forbid undocumented multi-component connection maps
- Name every connection type explicitly (sync REST, async queue, event stream, batch job); forbid implicit or unlabelled connections
- State data residency for every storage node; forbid topology diagrams with unlocated data stores
- Map every Topology node to a Component Specification in the TAD; forbid topology nodes without a corresponding TAD entry
- Version-stamp every topology update; archive prior versions; forbid in-place overwrites without a version note
- Render Topology with `flowchart TB` using subgraphs per boundary; forbid mixing topology with data flow or sequence diagrams

---

---
