# PRD & TAD Guidelines

## Overview

**Product Requirements Documentation (PRD)**: defines user value propositions, specifies acceptance criteria, prioritizes features systematically, aligns stakeholders, validates assumptions iteratively, and maintains bidirectional traceability.

**Technical Architecture Documentation (TAD)**: designs component interactions, specifies integration contracts, documents decision rationale, establishes quality attributes, defines deployment strategies, and traces requirements to implementation.

**Governing standards**: structure documents with user-centric narratives; design architectures with domain-agnostic patterns; specify measurable outcomes; maintain requirement-to-implementation traceability; apply iterative refinement; separate concerns systematically.

---

## CID Framework

### Definition
- **Context**: focus domain of concern
- **Intent**: desired principle or guiding goal
- **Directive**: explicit prohibition or required safeguard

### Sorting
Each entry is organized alphabetically (A→Z) for clarity and neutrality.

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

**Gate**: proceed only when problem is validated and scoped.

### Phase 1 — PRD Authoring
**Translate validated problems into structured requirements.**

1. Write problem statement: pain point → user impact → opportunity
2. Define personas with jobs-to-be-done
3. Map user journey: trigger → steps → decision points → outcome
4. Decompose epics into user stories (As a… I want… So that…)
5. Write Given-When-Then acceptance criteria per story
6. Apply MoSCoW prioritization to feature set
7. Define success metrics: baseline → target → timeline
8. Enumerate scope boundaries and explicit exclusions
9. Log open questions and unresolved assumptions

**Gate**: architects review PRD for technical feasibility before Phase 2.

### Phase 2 — TAD Authoring
**Translate PRD requirements into verifiable architecture.**

1. Derive component list from PRD epics and acceptance criteria
2. Assign single responsibility to each component (SRP)
3. Map data flows: source → transform → store → consume
4. Specify integration contracts: protocol, payload schema, error handling
5. Map user workflows to system sequence diagrams
6. Document architectural decisions with ADR format
7. Define quality attribute scenarios: performance, security, scalability, observability
8. Plan deployment strategy and migration path
9. Render architecture diagrams (Mermaid); compile component inventory table
10. Derive `/goal` conditions from acceptance criteria — each criterion must be expressible as a verifiable completion condition that Claude Code can evaluate from its own output

**Gate**: product manager validates TAD preserves user value before Phase 3.

### Phase 3 — Alignment & Review
**Verify PRD ↔ TAD coherence and stakeholder sign-off.**

1. Establish bidirectional traceability: `PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface]`
2. Confirm no implementation detail in PRD; no business logic in TAD
3. QA validates all acceptance criteria are testable **and expressible as `/goal` conditions** — each criterion must have a stated check Claude can surface in conversation (exit code, file count, test result, queue state)
4. Stakeholders approve scope and success metrics
5. Resolve or formally track all open questions

**Gate**: both documents version-stamped and baselined before implementation begins.

### Phase 4 — Living Documents
**Iterate documents as product and architecture evolve.**

- Apply semantic versioning to every change
- Update PRD and TAD together whenever requirements shift
- Re-run relevant gate reviews for breaking changes
- Archive superseded ADRs; do not delete
- Re-derive `/goal` conditions whenever acceptance criteria change; stale conditions produce false completions

---

## Flow Patterns

Three canonical flow types bridge user intent (PRD) to system behavior (TAD). Every feature must trace through all three.

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

---

## Agentic Implementation Verification

A well-formed PRD acceptance criterion **is** a well-formed `/goal` condition. 
This section connects PRD requirements to autonomous implementation via Claude Code's [`/goal`](https://code.claude.com/docs/en/goal) command, 
which sets a verifiable completion condition and keeps Claude working across turns until a separate evaluator model confirms it is met.

### The Criterion → Condition Pipeline

Every acceptance criterion written at Phase 1 should be traceable to a `/goal` condition used at implementation time. 
The same three properties that make a criterion testable make a condition evaluable:

| PRD Property | `/goal` Property | Shared Requirement |
|---|---|---|
| Observable outcome | Evaluator-verifiable | Claude surfaces proof in the conversation |
| Stated check | Stated check | How completion is demonstrated (`npm test`, `git status`, etc.) |
| Scope constraint | Constraint clause | What must not change on the way there |

**Translation pattern**:
```
Given [context] When [action] Then [outcome]
   ↓
/goal [outcome] verified by [check] with [constraint]
```

**Example**:
```
Criterion:  Given a valid token, when /refresh is called, then a 200 response is returned within 200 ms with a refreshed JWT.

/goal condition:  all tests in test/auth pass, /refresh returns 200 under 200 ms per load test output, and no other test file is modified
```

### Autonomous Workflow Selection

Three Claude Code approaches keep a session running between prompts. Choose based on what triggers the next turn:

| Approach | Next turn starts when | Stops when | Use for |
|---|---|---|---|
| `/goal` | Previous turn finishes | Evaluator confirms condition met | Substantial work with a verifiable end state |
| `/loop` | Time interval elapses | You stop it, or Claude judges done | Recurring checks, polling, timed sweeps |
| Stop hook | Previous turn finishes | Your script or prompt decides | Custom evaluation logic, deterministic checks |

`/goal` and auto mode are complementary: auto mode removes per-tool prompts within a turn; `/goal` removes per-turn prompts across turns. 
A fresh small fast model (Haiku by default) evaluates the condition, so completion is decided independently of the model doing the work.

### Writing Evaluable Conditions

A `/goal` condition is judged against what Claude has **already surfaced in the conversation** — the evaluator does not run commands or read files independently. 
Write conditions as things Claude's own output can demonstrate.

**Structure of a strong condition:**
1. **One measurable end state** — a test result, build exit code, file count, or empty queue
2. **A stated check** — how Claude proves it (`npm test exits 0`, `git status is clean`)
3. **Constraints that matter** — what must not change (`no other test file is modified`)
4. **Optional bound** — `or stop after N turns` to cap runaway loops

**Well-formed examples** (directly derivable from Given-When-Then criteria):
```
/goal all tests in test/auth pass and the lint step exits 0

/goal CHANGELOG.md has an entry for every merged PR this sprint and no existing entries are modified

/goal the migration script runs without errors and row counts in users and orders match pre-migration snapshots, or stop after 15 turns
```

**Anti-patterns** (mirror vague acceptance criteria):
```
❌ /goal the code looks good          → no observable proof
❌ /goal refactoring is complete      → no stated check, no end state
❌ /goal performance is improved      → no measurable threshold
```

### Traceability Extension

Extend the existing traceability pattern to include the implementation condition:

```
PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface] ↔ /goal [condition]
```

Record derived conditions in the TAD component specification alongside the acceptance criteria they implement. 
This ensures conditions stay synchronized when requirements evolve (see Phase 4 directive above).

### Running a Goal

Set a goal from the Claude Code terminal; it starts a turn immediately:
```
/goal all tests in test/auth pass and the lint step is clean
```

Check status at any time:
```
/goal
```

Clear before completion:
```
/goal clear
```

Run non-interactively to completion in a single invocation:
```
claude -p "/goal CHANGELOG.md has an entry for every PR merged this week"
```

**Requirements**: `/goal` runs only in workspaces where the trust dialog has been accepted. 
It is unavailable when `disableAllHooks` or `allowManagedHooksOnly` is set.

---



Each row is a universal, neutral, project-agnostic mantra: `Context | Intent | Directive`

| Context         | Intent                               | Directive                                                                                      |
|-----------------|--------------------------------------|-----------------------------------------------------------------------------------------------|
| Acceptance      | Define verifiable criteria           | - [ ] Specify testable criteria expressible as `/goal` conditions; enable verification; forbid ambiguous requirements |
| Accountability  | Assign clear ownership               | - [ ] Name responsible parties; assign ownership; forbid unassigned features                  |
| Adaptability    | Enable configuration-driven design   | - [ ] Design configurably; enable adaptation; forbid hardcoded solutions                      |
| Alignment       | Synchronize team understanding       | - [ ] Review with stakeholders; synchronize understanding; forbid siloed development          |
| Alternatives    | Document rejected options            | - [ ] Record considered options; document alternatives; forbid undocumented decisions         |
| Ambiguity       | Ensure specification clarity         | - [ ] Write precisely; ensure clarity; forbid vague requirements                              |
| API             | Specify integration contracts        | - [ ] Define API contracts; specify interfaces; forbid implicit interfaces                    |
| Architecture    | Design component interactions        | - [ ] Map component relationships; design interactions; forbid undocumented dependencies      |
| Assumptions     | Validate iteratively                 | - [ ] Test assumptions early; validate iteratively; forbid untested assumptions               |
| Boundaries      | Define system scope                  | - [ ] Establish clear scope; define boundaries; forbid scope creep                            |
| Capacity        | Specify performance limits           | - [ ] Define load requirements; specify capacity; forbid unspecified scalability              |
| Changes         | Track requirement evolution          | - [ ] Version requirement changes; track evolution; forbid unversioned modifications          |
| Components      | Specify modular units                | - [ ] Define component boundaries; specify modules; forbid monolithic designs                 |
| Constraints     | Document limitations explicitly      | - [ ] State constraints clearly; document limitations; forbid implicit restrictions           |
| Contracts       | Define interface agreements          | - [ ] Specify interface contracts; define agreements; forbid implicit assumptions             |
| Data            | Specify flow and storage             | - [ ] Map data flows; specify storage; forbid undocumented persistence                        |
| Decisions       | Document rationale                   | - [ ] Record decision reasoning; document rationale; forbid unexplained choices               |
| Decomposition   | Break complex features               | - [ ] Decompose into stories; break complexity; forbid monolithic requirements                |
| Dependencies    | Map component relationships          | - [ ] Identify dependencies; map relationships; forbid undeclared coupling                    |
| Deployment      | Specify release strategies           | - [ ] Plan deployment approach; specify strategies; forbid ad-hoc deployments                 |
| Design          | Justify architectural patterns       | - [ ] Document design patterns; justify architecture; forbid pattern-free implementations     |
| Edge            | Specify boundary conditions          | - [ ] Define edge cases; specify boundaries; forbid untested limits                           |
| Error           | Specify handling strategies          | - [ ] Define error responses; specify handling; forbid undefined error states                 |
| Evolution       | Version documents systematically     | - [ ] Apply semantic versioning; track evolution; forbid untracked changes                    |
| Failures        | Document failure modes               | - [ ] Analyze failure scenarios; document modes; forbid undocumented edge cases               |
| Features        | Prioritize systematically            | - [ ] Apply MoSCoW framework; prioritize features; forbid arbitrary ordering                  |
| Feedback        | Incorporate user insights            | - [ ] Gather user input; incorporate feedback; forbid assumption-only design                  |
| Goals           | Define measurable, evaluable objectives | - [ ] Set quantifiable goals expressible as `/goal` conditions; define objectives; forbid vague aspirations |
| Hypotheses      | State testable assumptions           | - [ ] Formulate testable claims; state hypotheses; forbid untestable claims                   |
| Impact          | Assess user value                    | - [ ] Estimate value delivery; assess impact; forbid value-free features                      |
| Integration     | Specify connection points            | - [ ] Define integration interfaces; specify connections; forbid undocumented interfaces      |
| Interfaces      | Define contracts explicitly          | - [ ] Document API contracts; define interfaces; forbid implicit agreements                   |
| Iteration       | Refine incrementally                 | - [ ] Update iteratively; refine continuously; forbid waterfall documentation                 |
| Journeys        | Map user workflows                   | - [ ] Chart user paths; map journeys; forbid feature-centric views                            |
| Jobs            | Define user tasks                    | - [ ] Specify jobs-to-be-done; define tasks; forbid solution-centric requirements             |
| Knowledge       | Capture domain insights              | - [ ] Document domain knowledge; capture insights; forbid undocumented context                |
| Maintainability | Design for evolution                 | - [ ] Plan for change; design maintainably; forbid rigid architectures                        |
| Mapping         | Trace requirements to implementation | - [ ] Link specs to code; trace mapping; forbid orphaned requirements                         |
| Metrics         | Define success measures              | - [ ] Specify KPIs; define metrics; forbid unmeasured outcomes                                |
| Migration       | Plan transition strategies           | - [ ] Define migration paths; plan transitions; forbid breaking changes without migration     |
| Modularity      | Design independent components        | - [ ] Enforce module boundaries; design modularly; forbid monolithic systems                  |
| Monitoring      | Specify observability needs          | - [ ] Define telemetry requirements; specify monitoring; forbid unmonitored systems           |
| MoSCoW          | Prioritize via framework             | - [ ] Apply Must/Should/Could/Won't; prioritize systematically; forbid unprioritized backlogs |
| Narratives      | Structure user-centric stories       | - [ ] Write from user perspective; structure narratives; forbid technical-only descriptions   |
| Neutrality      | Maintain domain independence         | - [ ] Design domain-neutral; maintain independence; forbid coupled designs                    |
| Non-functional  | Specify quality attributes           | - [ ] Define performance/security/usability; specify attributes; forbid functional-only reqs  |
| Objectives      | Align with business goals            | - [ ] Connect to strategy; align objectives; forbid misaligned features                       |
| Observability   | Enable system transparency           | - [ ] Design for monitoring; enable observability; forbid black-box implementations           |
| Outcomes        | Define measurable results            | - [ ] Specify outcome metrics; define results; forbid output-only metrics                     |
| Patterns        | Apply proven solutions               | - [ ] Use established patterns; apply solutions; forbid anti-patterns                         |
| Performance     | Specify response requirements        | - [ ] Define latency/throughput; specify performance; forbid unspecified latency              |
| Personas        | Define user archetypes               | - [ ] Create user personas; define archetypes; forbid generic user assumptions                |
| Prioritization  | Rank systematically                  | - [ ] Use value/effort matrix; rank systematically; forbid first-come ordering                |
| Problems        | Define user pain points              | - [ ] Identify user problems; define pain points; forbid solution-first thinking              |
| Protocols       | Specify communication standards      | - [ ] Define message formats; specify protocols; forbid proprietary interfaces                |
| Quality         | Define acceptance standards          | - [ ] Set quality thresholds; define standards; forbid subjective quality gates               |
| Rationale       | Document decision reasoning          | - [ ] Explain why decisions; document reasoning; forbid unexplained choices                   |
| Recovery        | Specify failure handling             | - [ ] Define disaster recovery; specify handling; forbid undefined disaster responses         |
| Requirements    | Structure hierarchically             | - [ ] Organize Epic→Story→Task; structure hierarchy; forbid flat requirement lists            |
| Resilience      | Design for failure tolerance         | - [ ] Plan for failures; design resiliently; forbid fragile systems                           |
| Reuse           | Leverage existing components         | - [ ] Identify reusable parts; leverage existing; forbid reinvention                          |
| Risk            | Assess potential issues              | - [ ] Identify risks; assess impact; forbid risk-blind planning                               |
| Scalability     | Specify growth requirements          | - [ ] Define scale targets; specify growth; forbid fixed-capacity designs                     |
| Scenarios       | Provide usage examples               | - [ ] Write scenario walkthroughs; provide examples; forbid example-free specifications       |
| Scope           | Define boundaries explicitly         | - [ ] State what's included/excluded; define scope; forbid unbounded features                 |
| Security        | Specify protection requirements      | - [ ] Define security needs; specify requirements; forbid security-as-afterthought            |
| Separation      | Maintain concern boundaries          | - [ ] Keep PRD/TAD separate; maintain boundaries; forbid mixed responsibilities               |
| Sequencing      | Order feature delivery               | - [ ] Plan release sequence; order delivery; forbid dependency-blind scheduling               |
| Simplicity      | Prefer minimal solutions             | - [ ] Choose simple approaches; prefer minimalism; forbid over-engineering                    |
| Stories         | Write user narratives                | - [ ] Use "As a…I want…So that"; write narratives; forbid technical task lists                |
| Success         | Define completion criteria           | - [ ] Specify done conditions as observable, evaluator-verifiable states; define success; forbid ambiguous done states |
| Testability     | Enable verification                  | - [ ] Design for testing; enable verification; forbid untestable requirements                 |
| Timelines       | Define delivery schedules            | - [ ] Set release dates; define timelines; forbid open-ended commitments                      |
| Traceability    | Link requirements to implementation  | - [ ] Maintain requirement IDs; link specs; forbid orphaned specs                             |
| Trade-offs      | Document decision factors            | - [ ] Analyze pros/cons; document trade-offs; forbid unexplored alternatives                  |
| Uncertainty     | Acknowledge unknowns                 | - [ ] Flag assumptions; acknowledge uncertainty; forbid false certainty                       |
| Usability       | Specify user experience requirements | - [ ] Define UX requirements; specify usability; forbid UX-free designs                       |
| User            | Center on user needs                 | - [ ] Start with user problems; center on users; forbid technology-first requirements         |
| Validation      | Define acceptance tests              | - [ ] Specify test scenarios; define validation; forbid subjective validation                 |
| Value           | Justify feature investment           | - [ ] Estimate ROI; justify value; forbid value-free development                              |
| Versioning      | Track document evolution             | - [ ] Use semantic versioning; track changes; forbid unversioned changes                      |
| Workflows       | Map user processes                   | - [ ] Chart process flows; map workflows; forbid workflow-free features                       |

---

## Core Templates

### PRD Template

```markdown
## Feature: [Name]

### Problem Statement
[User pain point → impact → opportunity]

### Personas
[Who experiences this problem and their jobs-to-be-done]

### User Journey Stage
[Which stage of which journey this feature addresses]

### User Stories
**As a** [persona] **I want** [capability] **So that** [benefit]

### Acceptance Criteria
**Given** [context] **When** [action] **Then** [outcome]

> **`/goal` translation**: `[outcome] verified by [stated check] with [constraint]`
> Example: `all tests in test/[feature] pass and no other test file is modified`

### Success Metrics
| Metric | Baseline | Target | Timeline |
|--------|----------|--------|----------|

### MoSCoW Priority
[Must / Should / Could / Won't — with rationale]

### Out of Scope
[Explicitly excluded items]

### Dependencies
[Required features, services, or infrastructure]

### Open Questions
[Unresolved uncertainties requiring research]
```

### TAD Template

```markdown
## Architecture: [System / Feature Name]

### Overview
**From [input] to [output]**: System → [component flow] → delivers [outcome]

### Journey → System Mapping
| Journey Stage | Workflow        | Data Flow       | Component        |
|---------------|-----------------|-----------------|------------------|

### Component Specifications
**Component**: [Name]
**Responsibility**: [Single responsibility — SVO format]
**Interfaces**: [API contracts]
**Dependencies**: [Required components/services]
**Configuration**: [Externalized parameters]
**`/goal` Conditions**: [Derived from acceptance criteria — one evaluable condition per criterion]

### Integration Contracts
**Interface**: [Name] | **Protocol**: [HTTP/gRPC/etc] | **Format**: [JSON/Protobuf] | **Errors**: [Strategy]

### Architectural Decisions
See ADR-[N] for each significant decision.

### Quality Attributes
| Attribute     | Scenario                           | Pattern             | Validation         |
|---------------|------------------------------------|---------------------|--------------------|
| Performance   | [Load → latency requirement]       | [Architectural fix] | [Test approach]    |
| Scalability   | [Growth → capacity requirement]    | [Architectural fix] | [Test approach]    |
| Security      | [Threat → protection requirement]  | [Architectural fix] | [Test approach]    |
| Observability | [Signal → monitoring requirement]  | [Architectural fix] | [Test approach]    |

### Deployment Strategy
[Blue-green / canary / rolling — with rollback plan]

### Architecture Diagrams
[Mermaid flowchart TB / LR / sequenceDiagram per diagram standards]

### Component Inventory
| Layer | Component | File / Module | Status |
|-------|-----------|---------------|--------|
```

### ADR Template

```markdown
## ADR-[N]: [Decision Title]
**Status**: [Proposed | Accepted | Deprecated | Superseded]
**Date**: [YYYY-MM-DD]

### Context
[Problem requiring decision]

### Decision
[Chosen approach]

### Alternatives Considered
1. [Option]: [Pros / Cons]

### Rationale
[Why this decision]

### Consequences
- **Positive**: [Benefits]
- **Negative**: [Costs / Risks]
- **Neutral**: [Other impacts]
```

---

## Architecture Diagram Standards

**Mermaid is the mandatory diagram format.**

| Diagram Type           | Mermaid Syntax              | When to Use                                      |
|------------------------|-----------------------------|--------------------------------------------------|
| Component topology     | `flowchart TB`              | System architecture, module relationships        |
| Data flow / pipeline   | `flowchart LR`              | Linear stages, DAG pipelines                     |
| User workflow          | `sequenceDiagram`           | Multi-actor flows, request/response, events      |
| Parallel orchestration | `flowchart TB` + subgraphs  | Multi-agent, concurrent, multi-locale flows      |
| Component inventory    | Markdown table              | Module inventory, status tracking, file mapping  |

- Forbid ASCII art for any diagram exceeding 5 nodes
- Every architecture diagram must be accompanied by a component inventory table
- Retain plain code blocks for JSON contracts, API payloads, and configuration examples

**Token Economics**: Mermaid reduces LLM context token consumption ~70–85% vs equivalent ASCII art, while providing auto-layout, GitHub-native rendering, and structured parseability.

---

## PRD ↔ TAD Integration

### Separation of Concerns
- PRD describes **WHAT** and **WHY**: user value, business logic
- TAD describes **HOW**: technical approach, architecture
- Forbid implementation details in PRDs; forbid business logic in TADs
- **Boundary**: PRD stops at acceptance criteria; TAD starts at architectural approach

### Traceability Pattern
```
PRD-[Epic-ID]-[Story-ID] ↔ TAD-[Component-ID]-[Interface-ID]
```

### Iterative Refinement
1. Product manager drafts PRD from user research
2. Architect reviews PRD for feasibility → drafts TAD
3. Product manager validates TAD preserves user value
4. Teams iterate until both documents align

---

## Anti-Pattern Guards

❌ Solution-first PRDs, implementation detail in PRDs, vague acceptance criteria  
→ ✅ Problem-first approach, business-focused PRDs, testable Given-When-Then criteria

❌ Undocumented decisions, unexplored trade-offs, domain-coupled architectures  
→ ✅ ADR documentation, explicit trade-off analysis, domain-agnostic designs

❌ Orphaned requirements, conflicting PRD/TAD, unversioned documents  
→ ✅ Traced requirements, aligned specifications, version-controlled docs

❌ Waterfall documentation, static architectures, journey-free features  
→ ✅ Iterative living documents, evolvable designs, journey-anchored stories

❌ Data flows without typed schemas, workflows without error paths, journeys without friction mapping  
→ ✅ Typed schemas at every boundary, full-path workflows, stage-complete journeys

❌ Acceptance criteria that cannot be demonstrated by Claude's own output ("looks good", "is complete", "is improved")  
→ ✅ Every criterion expressible as a `/goal` condition: one measurable end state + a stated check + any scope constraints

❌ `/goal` conditions set at implementation without re-checking the PRD when requirements change  
→ ✅ Traceability maintained across `PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface] ↔ /goal [condition]`; conditions updated in lockstep with criteria

---

## Validation Checklist

**Pre-Implementation**:
- [ ] User journey mapped before stories written; every story anchored to a journey stage
- [ ] Workflows defined with trigger, happy path, alternate paths, error paths, and postconditions
- [ ] Data flows typed at every stage boundary with persistence and error handling documented
- [ ] User stories follow "As a… I want… So that" format
- [ ] Acceptance criteria use Given-When-Then with observable outcomes
- [ ] Every acceptance criterion translatable to a `/goal` condition: one measurable end state + a stated check + scope constraints
- [ ] Features prioritized via MoSCoW with rationale
- [ ] Components have single responsibility; interfaces specified with explicit contracts
- [ ] Architectural decisions documented with ADRs
- [ ] Architecture diagrams use Mermaid (not ASCII for >5 nodes)
- [ ] Component inventory table accompanies every architecture diagram
- [ ] PRD-to-TAD traceability established via `PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface]`
- [ ] `/goal` conditions recorded in TAD component specs and traced to source criteria
- [ ] No implementation detail in PRD; no business logic in TAD

**Post-Documentation Review**:
- [ ] Stakeholders validate PRD addresses user problems
- [ ] Development team confirms TAD provides sufficient guidance
- [ ] QA confirms acceptance criteria are objectively testable
- [ ] Success metrics defined with baseline, target, and timeline
- [ ] Quality attributes specified with measurable scenarios
- [ ] Open questions resolved or formally tracked

---

## Role—Action—Outcome

**Product Manager** → defines user problems, maps user journeys, writes stories and acceptance criteria, prioritizes via MoSCoW, defines success metrics → produces user-centric PRDs enabling valuable feature delivery

**System Architect** → designs component interactions, maps data flows, specifies interfaces, documents ADRs, defines quality attributes, plans deployment → establishes technical foundation enabling scalable implementation

**UX Designer** → creates personas, maps user journeys, validates usability requirements, provides design guidance → ensures user-centered design principles guide feature development

**Engineering Lead** → reviews TAD feasibility, validates architectural patterns, identifies technical risks, suggests alternatives → ensures technical approach is implementable and maintainable

**QA Engineer** → validates testability of acceptance criteria, creates test plans from PRD, defines automation strategy → ensures requirements are verifiable and quality is measurable

**Technical Writer** → structures documents, maintains templates, ensures consistency, tracks versions, manages traceability → maintains clear documentation supporting team alignment

**Stakeholder** → provides business context, validates user problems, reviews requirements, approves scope → ensures product development aligns with business objectives

---

## Mantra Application

**"CID frames PRD/TAD standards · Flow patterns anchor stories to reality · RAO aligns team responsibilities · SVO clarifies requirement semantics · `/goal` closes the loop from criterion to verified implementation"**

- **CID frames**: establishes scope (product + technical), purpose (user value + clarity), rules (problem-first · domain-agnostic · traceable)
- **Flow patterns anchor**: user journeys, workflows, and data flows connect abstract requirements to observable system behavior; every feature traces through all three
- **RAO aligns**: maps each role to documentation deliverables with clear accountability and measurable outcomes
- **SVO clarifies**: expresses all requirements with grammatical precision — users accomplish tasks → systems process data → components deliver artifacts — enabling unambiguous implementation
- **`/goal` closes**: every acceptance criterion becomes an evaluable completion condition; the traceability chain extends from PRD through TAD to autonomous implementation verification