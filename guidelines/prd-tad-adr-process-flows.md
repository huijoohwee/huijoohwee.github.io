---
title: "PRD, TAD & ADR Process & Flow Patterns Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-08-20"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
parent: "PRD, TAD & ADR Guidelines"
parent_version: "1.9.0"
---

# PRD, TAD & ADR Process & Flow Patterns Module

## Scope & Ownership

This module owns the phase-gated authoring process and the five canonical flow patterns that bridge user intent to system behaviour. It owns no status vocabulary and no finding names.

It inherits the parent set's Scope & Neutrality Contract, Rule Identity derivation, and finding recording contract without restating them. Rule IDs derive from the owning `##` section anchor and the rule's document-order ordinal, exactly as in the parent.

---

## From 0 to 1: PRD & TAD Creation Process

A sequential, phase-gated process for producing aligned PRD and TAD from scratch.

### Phase 0 — Problem Discovery
**Before writing any document, validate the problem exists.**

1. Identify target personas and their pain points via research
2. Quantify problem impact with observable metrics
3. Map the current user journey to locate friction points
4. State a falsifiable problem hypothesis
5. Gain stakeholder alignment on problem scope
6. Run a preliminary **ROI score** and **TCO estimate**; confirm problem is worth solving at projected cost
7. Identify whether the solution requires an AI harness, FOSS tools, or proprietary APIs — flag any dependency with non-zero egress or token cost
8. Estimate **time-to-value (TTV)**: count the minimum steps a target persona must complete from zero state (prerequisites installed, no configuration done) to first successful outcome; set an acceptable TTV ceiling before Phase 1 begins; flag if TTV exceeds threshold

**Gate**: proceed only when problem is validated, scoped, ROI-positive at estimated TCO, and TTV is within acceptable ceiling.

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

**Gate**: architects review PRD for technical feasibility **and TCO/token-budget alignment** before Phase 2.

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

**Gate**: product manager validates TAD preserves user value **and** ROI/TCO envelope before Phase 3.

### Phase 3 — Alignment & Review
**Verify PRD ↔ TAD coherence and stakeholder sign-off.**

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

**Gate**: both documents version-stamped and baselined, and the alignment check reporting zero `blocker` findings, before implementation begins.

### Phase 4 — Living Documents
**Iterate documents as product and architecture evolve.**

- Apply semantic versioning to every change
- Update PRD and TAD together whenever requirements shift
- Re-run relevant gate reviews for breaking changes
- Archive superseded ADRs; do not delete
- Re-derive VCCs whenever acceptance criteria change; stale conditions produce false completions
- **Re-derive every readiness rung** whenever a VCC or an Evidence Reference changes; a rung is a computed value, so leaving it pinned after the evidence moves is a false completion
- **Re-run the alignment check** on every baselined change and compare the finding set against the prior run; a new `blocker` finding is a regression, not a note
- **Bound the iteration**: each Phase 4 revision cycle carries a max-iteration bound and a circuit-breaker, exactly as required of every other loop in this guideline set. The default circuit-breaker is *no reduction in open `blocker` findings across two consecutive cycles*; on breaking the circuit, stop revising and escalate the unresolved findings as a scope or design decision rather than continuing to iterate
- **Track token cost actuals vs estimates** each sprint; update budget projections when model pricing or traffic changes
- **Re-evaluate FOSS alternatives** whenever a dependency's TCO crosses the 12-month justification threshold

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
