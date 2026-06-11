---
title: "PRD & TAD Guidelines"
doc_type: "Guidelines"
version: "1.1.0"
date: "2026-06-09"
lang: "en-US"
frontmatter_contract: "required"
---

# PRD & TAD Guidelines

## Scope & Neutrality Contract

- **Universal**: these guidelines apply to any product, domain, language, or runtime; nothing here assumes a specific company, repository, file path, framework, or vendor.
- **Neutral**: name capabilities and roles by their function, never by a brand. Where a concrete tool is shown, it appears only as a non-binding *reference implementation* and may be swapped for any equivalent.
- **Project-/file-agnostic**: requirements are derived from document content and parsed frontmatter only — never from file names, directory layout, or downstream mirrors. Examples use placeholders (`[...]`) rather than real identifiers.
- **Modular**: each `##` section is self-contained and addressable by its heading anchor (see Module Index). Sections may be lifted into another guideline set without rewriting their internals.

## Module Index

- `scope--neutrality-contract` — universality, neutrality, agnosticism, modularity rules
- `markdown-yaml-frontmatter-enforcement` — authoring contract for frontmatter SSOT
- `overview` — what PRD/TAD are and the governing standards
- `solo-dev-ai-native-orientation` — the four compounding lenses, harness, orchestration, ROI, FOSS rules
- `directive-grammar-cid` — Context/Intent/Directive grammar and sorting
- `from-0-to-1-prd--tad-creation-process` — phase-gated authoring process
- `flow-patterns` — user journey, workflow, and data flow templates
- `autonomous-implementation-verification` — the Verifiable Completion Condition (VCC) primitive
- `cid-directive-matrix` — alphabetical, project-agnostic directive mantras
- `core-templates` — PRD, TAD, and ADR templates
- `architecture-diagram-standards` — diagram format rules
- `prd--tad-integration` — separation of concerns and traceability
- `anti-pattern-guards` — prohibited patterns and their corrections
- `validation-checklist` — pre-implementation and post-documentation gates
- `roleactionoutcome` — role-to-deliverable mapping
- `mantra-application` — the framing mantra

## Markdown YAML Frontmatter Enforcement

- Canonical PRD, TAD, and combined PRD/TAD Markdown docs must start with a valid YAML frontmatter block as the first block in the file.
- Frontmatter is the SSOT for document identity, status, versioning, renderer activation, and reusable metadata referenced by the body specification.
- Canonical authored PRD/TAD docs use plain YAML for frontmatter and related schema-bearing blocks; do not replace normal authoring syntax with typed wrapper records.
- Normalized `{key, type, value}` wrappers are permitted only in dedicated validation fixtures that explicitly test ingest -> parse -> render or ingest -> parse -> validate fidelity.
- Scalars that contain reserved punctuation, including inline `:` content, must be quoted so strict YAML parsers read planning and architecture metadata deterministically.
- Parser warning, repair, or fallback behavior is recovery-only; malformed YAML frontmatter remains an upstream authoring defect that must be fixed at source.

## Overview

**Product Requirements Documentation (PRD)**: defines user value propositions, specifies acceptance criteria, prioritizes features systematically, aligns stakeholders, validates assumptions iteratively, and maintains bidirectional traceability.

**Technical Architecture Documentation (TAD)**: designs component interactions, specifies integration contracts, documents decision rationale, establishes quality attributes, defines deployment strategies, and traces requirements to implementation.

**Governing standards**: structure documents with user-centric narratives; design architectures with domain-agnostic patterns; specify measurable outcomes; maintain requirement-to-implementation traceability; apply iterative refinement; separate concerns systematically.

**Solo-dev AI-native orientation**: these guidelines are calibrated for a solo founder or small team operating an AI-native product stack. Every decision is evaluated through four compounding lenses — **min-viable-max-value** (ship the smallest artifact that delivers the largest user impact), **TCO-zero** (prefer FOSS and zero-egress infrastructure; make cost a first-class architectural constraint), **token economics** (treat LLM token consumption as a measurable engineering metric at every pipeline boundary), and **harness-first** (orchestrate AI capabilities through composable, observable harnesses rather than ad-hoc prompt calls). These lenses do not replace the core PRD/TAD standards — they sharpen prioritization, constrain architecture choices, and accelerate validation cycles.

---

## Solo-Dev AI-Native Orientation

### Four Compounding Lenses

| Lens | Definition | Applied In |
|---|---|---|
| **Min-Viable-Max-Value** | Ship the smallest scope that maximises user impact per hour invested | Phase 0 validation, MoSCoW, success metrics |
| **TCO-Zero** | Total cost of ownership defaults to zero; every paid dependency requires explicit justification against a FOSS alternative | Phase 0 gate, ADR, Quality Attributes |
| **Token Economics** | LLM token consumption (input + output + cache hit rate) is a measurable system metric, not an afterthought | Data flows, Component specs, Quality Attributes |
| **Harness-First** | AI capabilities are accessed through structured, observable harnesses (typed inputs → typed outputs → logged decisions) rather than raw prompt calls | TAD components, Integration contracts, orchestration diagrams |

### AI-Native Harness Pattern

Every AI-powered component in the TAD must conform to the harness contract:

```
Caller → [Harness: schema-validated input] → [LLM / model] → [Harness: schema-validated output + cost log] → Consumer
```

**Harness requirements**:
- Input schema validated before token spend; reject malformed inputs without calling the model
- Output schema validated after response; surface structured errors, not raw LLM failures
- Cost log emitted per call: `{ model, prompt_tokens, completion_tokens, cache_hits, estimated_cost_usd }`
- Fallback path defined for every harness: degraded-mode response or upstream error propagation

### Orchestration Topology

Document AI orchestration as one of three patterns:

| Pattern | Structure | When to Use |
|---|---|---|
| **Sequential** | A → B → C, each harness feeds the next | Single-path pipelines, linear enrichment |
| **Fan-out / Fan-in** | A → [B, C, D] → E aggregates | Parallel model calls, ensemble scoring |
| **Agentic loop** | A → decision → [branch or retry] → exit condition | Multi-step reasoning, tool-use agents, completion-condition-driven tasks |

Render orchestration topology as a `flowchart LR` or `sequenceDiagram` in the TAD. Every loop must specify a **max-iteration bound** and a **circuit-breaker condition** to cap runaway token spend.

### ROI Calculation Template

For every feature, estimate return on investment before implementation:

```
ROI Score = (User Impact × Reach) / (Build Hours + Monthly TCO + Token Cost / Month)

User Impact : 1–5 scale (pain severity × frequency)
Reach       : estimated monthly active users or sessions
Build Hours : solo-dev estimate including documentation
Monthly TCO : infrastructure + API cost at target load
Token Cost  : estimated tokens/month × model price/1M tokens
```

Features below ROI threshold (team-defined) are deferred to `Could / Won't` in MoSCoW. Document the calculation in the PRD success metrics section.

### FOSS-First Decision Rule

When selecting any dependency, library, or infrastructure component:
1. **Identify FOSS alternatives** — document at least one in every ADR
2. **Default to FOSS** unless the proprietary option provides >2× value at <0.5× TCO over 12 months
3. **Prefer zero-egress** storage and CDN (e.g. R2, Cloudflare) over metered alternatives
4. **Record the decision** in the ADR with explicit TCO comparison at projected scale

---

## Directive Grammar (CID)

Every directive in this guideline set is expressed with a uniform, project-agnostic grammar so it can be lifted into any context unchanged. The `CID Directive Matrix` section applies this grammar.

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
6. Run a preliminary **ROI score** and **TCO estimate**; confirm problem is worth solving at projected cost
7. Identify whether the solution requires an AI harness, FOSS tools, or proprietary APIs — flag any dependency with non-zero egress or token cost

**Gate**: proceed only when problem is validated, scoped, and ROI-positive at estimated TCO.

### Phase 1 — PRD Authoring
**Translate validated problems into structured requirements.**

1. Write problem statement: pain point → user impact → opportunity
2. Define personas with jobs-to-be-done
3. Map user journey: trigger → steps → decision points → outcome
4. Decompose epics into user stories (As a… I want… So that…)
5. Write Given-When-Then acceptance criteria per story
6. Apply MoSCoW prioritization to feature set **with explicit ROI score and TCO estimate per feature**; use **min-viable-max-value** framing — default to the smallest scope delivering the highest impact
7. Define success metrics: baseline → target → timeline; include **token cost / month** and **monthly TCO** as first-class metrics for any AI-powered feature
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
6. Document architectural decisions with ADR format; **every ADR must include a TCO comparison and FOSS-first evaluation**
7. Define quality attribute scenarios: performance, security, scalability, observability, **token cost, TCO**
8. Design AI-powered components as **harnesses** (typed input schema → model call → typed output schema → cost log); specify the orchestration topology (sequential / fan-out / agentic loop) and **max-iteration bound** for every loop
9. Estimate **token budget per pipeline**: average prompt tokens + completion tokens + cache hit rate at target load; flag pipelines exceeding budget threshold
10. Plan deployment strategy and migration path; default to zero-egress infrastructure
11. Render architecture diagrams (Mermaid); compile component inventory table
12. Derive Verifiable Completion Conditions (VCCs) from acceptance criteria — each criterion must be expressible as a condition an autonomous agent can evaluate from its own surfaced output

**Gate**: product manager validates TAD preserves user value **and** ROI/TCO envelope before Phase 3.

### Phase 3 — Alignment & Review
**Verify PRD ↔ TAD coherence and stakeholder sign-off.**

1. Establish bidirectional traceability: `PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface]`
2. Confirm no implementation detail in PRD; no business logic in TAD
3. QA validates all acceptance criteria are testable **and expressible as VCCs** — each criterion must have a stated check the agent can surface in its own output (exit code, file count, test result, queue state)
4. Stakeholders approve scope and success metrics; **confirm token budget and TCO are within acceptable envelope**
5. Verify every AI-powered component has a harness contract, orchestration topology, and max-iteration bound documented
6. Confirm FOSS-first decisions are recorded in ADRs with explicit TCO comparison
7. Resolve or formally track all open questions

**Gate**: both documents version-stamped and baselined before implementation begins.

### Phase 4 — Living Documents
**Iterate documents as product and architecture evolve.**

- Apply semantic versioning to every change
- Update PRD and TAD together whenever requirements shift
- Re-run relevant gate reviews for breaking changes
- Archive superseded ADRs; do not delete
- Re-derive VCCs whenever acceptance criteria change; stale conditions produce false completions
- **Track token cost actuals vs estimates** each sprint; update budget projections when model pricing or traffic changes
- **Re-evaluate FOSS alternatives** whenever a dependency's TCO crosses the 12-month justification threshold

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
- A **separate evaluator** decides completion, independent of the agent doing the work, so the verdict is not self-graded.
- The evaluator judges only **surfaced output**; the agent must emit the proof (logs, exit codes, counts) into its own transcript.
- Every loop carries an explicit **iteration bound** and circuit-breaker, consistent with the Orchestration Topology rules.

### Traceability Extension

Extend the traceability pattern to include the implementation condition:

```
PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface] ↔ VCC [condition]
```

Record derived VCCs in the TAD component specification alongside the acceptance criteria they implement, so conditions stay synchronized when requirements evolve (see Phase 4).

---

## CID Directive Matrix

Each row is a universal, neutral, project-agnostic mantra in `Context | Intent | Directive` grammar (see Directive Grammar (CID)). Rows are sorted A→Z and contain no project, vendor, or file references.

| Context         | Intent                               | Directive                                                                                      |
|-----------------|--------------------------------------|-----------------------------------------------------------------------------------------------|
| Acceptance      | Define verifiable criteria           | - [ ] Specify testable criteria expressible as VCCs; enable verification; forbid ambiguous requirements |
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
| FOSS            | Default to open-source dependencies  | - [ ] Identify FOSS alternative before any proprietary selection; document TCO comparison in ADR; forbid undocumented vendor lock-in |
| Feedback        | Incorporate user insights            | - [ ] Gather user input; incorporate feedback; forbid assumption-only design                  |
| Goals           | Define measurable, evaluable objectives | - [ ] Set quantifiable goals expressible as VCCs; define objectives; forbid vague aspirations |
| Harness         | Wrap AI calls in typed, observable contracts | - [ ] Define harness input/output schemas; emit cost log per call; specify fallback path; forbid raw unstructured prompt calls in production pipelines |
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
| Min-Viable      | Maximise value per scope unit        | - [ ] Define the smallest deliverable that satisfies the acceptance criterion; score ROI before expanding scope; forbid feature bloat without user-impact justification |
| Modularity      | Design independent components        | - [ ] Enforce module boundaries; design modularly; forbid monolithic systems                  |
| Monitoring      | Specify observability needs          | - [ ] Define telemetry requirements; specify monitoring; forbid unmonitored systems           |
| MoSCoW          | Prioritize via framework             | - [ ] Apply Must/Should/Could/Won't; prioritize systematically; forbid unprioritized backlogs |
| Narratives      | Structure user-centric stories       | - [ ] Write from user perspective; structure narratives; forbid technical-only descriptions   |
| Neutrality      | Maintain domain independence         | - [ ] Design domain-neutral; maintain independence; forbid coupled designs                    |
| Non-functional  | Specify quality attributes           | - [ ] Define performance/security/usability; specify attributes; forbid functional-only reqs  |
| Objectives      | Align with business goals            | - [ ] Connect to strategy; align objectives; forbid misaligned features                       |
| Observability   | Enable system transparency           | - [ ] Design for monitoring; enable observability; forbid black-box implementations           |
| Orchestration   | Design composable AI pipelines       | - [ ] Specify orchestration topology (sequential/fan-out/agentic loop); set max-iteration bounds; forbid unbounded agentic loops without circuit-breaker conditions |
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
| ROI             | Justify investment with return       | - [ ] Compute ROI score (impact × reach / build + TCO + token cost) before Phase 1 gate; rank features by ROI; forbid zero-ROI items in Must/Should tiers |
| Scalability     | Specify growth requirements          | - [ ] Define scale targets; specify growth; forbid fixed-capacity designs                     |
| Scenarios       | Provide usage examples               | - [ ] Write scenario walkthroughs; provide examples; forbid example-free specifications       |
| Scope           | Define boundaries explicitly         | - [ ] State what's included/excluded; define scope; forbid unbounded features                 |
| Security        | Specify protection requirements      | - [ ] Define security needs; specify requirements; forbid security-as-afterthought            |
| Separation      | Maintain concern boundaries          | - [ ] Keep PRD/TAD separate; maintain boundaries; forbid mixed responsibilities               |
| Sequencing      | Order feature delivery               | - [ ] Plan release sequence; order delivery; forbid dependency-blind scheduling               |
| Simplicity      | Prefer minimal solutions             | - [ ] Choose simple approaches; prefer minimalism; forbid over-engineering                    |
| Stories         | Write user narratives                | - [ ] Use "As a…I want…So that"; write narratives; forbid technical task lists                |
| Success         | Define completion criteria           | - [ ] Specify done conditions as observable, evaluator-verifiable states; define success; forbid ambiguous done states |
| TCO             | Make total cost of ownership explicit | - [ ] Estimate 12-month TCO for every dependency (infra + API + egress + token spend); document in ADR; forbid uncosted architectural decisions |
| Testability     | Enable verification                  | - [ ] Design for testing; enable verification; forbid untestable requirements                 |
| Timelines       | Define delivery schedules            | - [ ] Set release dates; define timelines; forbid open-ended commitments                      |
| Token Economics | Treat token spend as an engineering metric | - [ ] Estimate prompt + completion tokens per pipeline call; track cache hit rate; set cost-per-request budget; forbid pipelines without token budget estimates |
| Traceability    | Link requirements to implementation  | - [ ] Maintain requirement IDs; link specs; forbid orphaned specs                             |
| Trade-offs      | Document decision factors            | - [ ] Analyze pros/cons; document trade-offs; forbid unexplored alternatives                  |
| Uncertainty     | Acknowledge unknowns                 | - [ ] Flag assumptions; acknowledge uncertainty; forbid false certainty                       |
| Usability       | Specify user experience requirements | - [ ] Define UX requirements; specify usability; forbid UX-free designs                       |
| User            | Center on user needs                 | - [ ] Start with user problems; center on users; forbid technology-first requirements         |
| Validation      | Define acceptance tests              | - [ ] Specify test scenarios; define validation; forbid subjective validation                 |
| Value           | Justify feature investment           | - [ ] Estimate ROI; justify value; forbid value-free development                              |
| Vendor          | Evaluate dependency risk             | - [ ] Assess vendor lock-in risk; document exit strategy for every proprietary dependency; forbid undocumented single-vendor dependencies |
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

> **VCC translation**: `Verify [outcome] by [stated check] with [constraint]`
> Example: `all tests in [feature test suite] pass and no other test file is modified`

### Success Metrics
| Metric | Baseline | Target | Timeline |
|--------|----------|--------|----------|
| [User metric] | | | |
| Token cost / month | [est.] | [budget] | |
| Monthly TCO | [est.] | [budget] | |
| ROI Score | — | [threshold] | [sprint] |

### MoSCoW Priority
[Must / Should / Could / Won't — with ROI score and rationale per tier]

### Min-Viable Scope
[Smallest deliverable that satisfies the Must-tier acceptance criteria; explicitly excludes all Could/Won't items]

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
**FOSS / Vendor**: [FOSS | Proprietary — if proprietary, link to ADR with TCO justification]
**Harness Contract** *(AI components only)*:
  - Input schema: [typed fields]
  - Output schema: [typed fields]
  - Cost log fields: `{ model, prompt_tokens, completion_tokens, cache_hits, estimated_cost_usd }`
  - Fallback path: [degraded response | upstream error]
**Token Budget** *(AI components only)*: [avg prompt tokens] + [avg completion tokens] @ [cache hit rate] = [est. cost/request]
**Orchestration Topology** *(AI components only)*: [Sequential | Fan-out | Agentic loop — max N iterations, circuit-breaker: condition]
**VCC Conditions**: [Derived from acceptance criteria — one evaluable condition per criterion]

### Integration Contracts
**Interface**: [Name] | **Protocol**: [HTTP/gRPC/etc] | **Format**: [JSON/Protobuf] | **Errors**: [Strategy]

### Architectural Decisions
See ADR-[N] for each significant decision.

### Quality Attributes
| Attribute       | Scenario                                      | Pattern                   | Validation              |
|-----------------|-----------------------------------------------|---------------------------|-------------------------|
| Performance     | [Load → latency requirement]                  | [Architectural fix]       | [Test approach]         |
| Scalability     | [Growth → capacity requirement]               | [Architectural fix]       | [Test approach]         |
| Security        | [Threat → protection requirement]             | [Architectural fix]       | [Test approach]         |
| Observability   | [Signal → monitoring requirement]             | [Architectural fix]       | [Test approach]         |
| Token Cost      | [Target load → max tokens/request budget]     | Harness + caching + prompt compression | Cost log sampling; alert on p95 overrun |
| TCO             | [12-month projected spend vs zero-TCO target] | FOSS-first + zero-egress infra | Monthly cost audit; ADR review |

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
2. [FOSS alternative]: [Pros / Cons — always required]

### Rationale
[Why this decision]

### TCO Impact
| Dimension | Chosen Option | Best FOSS Alternative | Delta / 12 months |
|---|---|---|---|
| Infra cost | [$/mo] | [$/mo] | [+/- $] |
| Egress cost | [$/mo] | [$/mo] | [+/- $] |
| Token cost  | [$/mo] | [$/mo] | [+/- $] |
| Vendor risk | [Low/Med/High] | [Low] | — |

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

**Token Economics**: Mermaid reduces LLM context token consumption ~70–85% vs equivalent ASCII art, while providing auto-layout, platform-native rendering (most Markdown hosts and viewers), and structured parseability.

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

❌ Acceptance criteria that cannot be demonstrated by the executing agent's own output ("looks good", "is complete", "is improved")  
→ ✅ Every criterion expressible as a VCC: one measurable end state + a stated check + any scope constraints

❌ VCCs set at implementation without re-checking the PRD when requirements change  
→ ✅ Traceability maintained across `PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface] ↔ VCC [condition]`; conditions updated in lockstep with criteria

❌ Raw, unstructured LLM prompt calls in production pipelines; no input/output validation; no cost logging  
→ ✅ Every AI call wrapped in a harness with typed schemas, cost log emission, and a documented fallback path

❌ Unbounded agentic loops; orchestration topologies with no max-iteration bound or circuit-breaker  
→ ✅ Every loop specifies max iterations and a circuit-breaker exit condition; token spend is bounded and observable

❌ Proprietary dependencies selected without a FOSS comparison; undocumented vendor lock-in; uncosted egress  
→ ✅ Every ADR lists a FOSS alternative with 12-month TCO comparison; zero-egress infrastructure preferred by default

❌ Features sized without ROI scoring; Must-tier items with no user impact justification; scope bloat  
→ ✅ Every feature carries an explicit ROI score before entering MoSCoW; min-viable scope defined before implementation begins

❌ Token cost treated as invisible or negligible; no prompt/completion budget per pipeline  
→ ✅ Token budget (prompt + completion + cache hit rate) estimated in TAD; actuals tracked each sprint and compared to estimates

---

## Validation Checklist

**Pre-Implementation**:
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
- [ ] **ROI score computed** for every Must/Should feature using `(impact × reach) / (build + TCO + token cost)`
- [ ] Components have single responsibility; interfaces specified with explicit contracts
- [ ] **AI components have harness contract**: typed input schema, typed output schema, cost log fields, fallback path
- [ ] **Orchestration topology specified** for every AI pipeline: sequential / fan-out / agentic loop; max-iteration bound and circuit-breaker condition defined for loops
- [ ] Architectural decisions documented with ADRs **including TCO comparison and FOSS alternative**
- [ ] Architecture diagrams use Mermaid (not ASCII for >5 nodes)
- [ ] Component inventory table accompanies every architecture diagram
- [ ] PRD-to-TAD traceability established via `PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface]`
- [ ] VCCs recorded in TAD component specs and traced to source criteria
- [ ] No implementation detail in PRD; no business logic in TAD

**Post-Documentation Review**:
- [ ] Stakeholders validate PRD addresses user problems
- [ ] Development team confirms TAD provides sufficient guidance
- [ ] QA confirms acceptance criteria are objectively testable
- [ ] Success metrics defined with baseline, target, and timeline
- [ ] Quality attributes specified with measurable scenarios; **token cost and TCO attributes present for AI-powered components**
- [ ] Open questions resolved or formally tracked
- [ ] **Token budget actuals vs estimates reviewed** each sprint; projections updated on model pricing or traffic changes
- [ ] **FOSS alternatives re-evaluated** if any dependency TCO crosses the 12-month justification threshold

---

## Role—Action—Outcome

**Product Manager** → defines user problems, maps user journeys, writes stories and acceptance criteria, prioritizes via MoSCoW, defines success metrics → produces user-centric PRDs enabling valuable feature delivery

**System Architect** → designs component interactions, maps data flows, specifies interfaces, documents ADRs, defines quality attributes, plans deployment → establishes technical foundation enabling scalable implementation

**Solo Founder / AI Orchestrator** *(collapses all roles in a solo-dev context)* → validates ROI before writing any doc, applies min-viable-max-value lens to MoSCoW, designs harness contracts for every AI component, sets token budgets, maintains FOSS-first ADRs, tracks TCO actuals each sprint → ships high-ROI features at near-zero infrastructure cost while keeping the codebase auditable and the AI pipelines observable

**UX Designer** → creates personas, maps user journeys, validates usability requirements, provides design guidance → ensures user-centered design principles guide feature development

**Engineering Lead** → reviews TAD feasibility, validates architectural patterns, identifies technical risks, suggests alternatives → ensures technical approach is implementable and maintainable

**QA Engineer** → validates testability of acceptance criteria, creates test plans from PRD, defines automation strategy → ensures requirements are verifiable and quality is measurable

**Technical Writer** → structures documents, maintains templates, ensures consistency, tracks versions, manages traceability → maintains clear documentation supporting team alignment

**Stakeholder** → provides business context, validates user problems, reviews requirements, approves scope → ensures product development aligns with business objectives

---

## Mantra Application

**"CID frames PRD/TAD standards · Flow patterns anchor stories to reality · RAO aligns team responsibilities · SVO clarifies requirement semantics · VCC closes the loop from criterion to verified implementation"**

- **CID frames**: establishes scope (product + technical), purpose (user value + clarity), rules (problem-first · domain-agnostic · traceable)
- **Flow patterns anchor**: user journeys, workflows, and data flows connect abstract requirements to observable system behavior; every feature traces through all three
- **RAO aligns**: maps each role to documentation deliverables with clear accountability and measurable outcomes
- **SVO clarifies**: expresses all requirements with grammatical precision — users accomplish tasks → systems process data → components deliver artifacts — enabling unambiguous implementation
- **VCC closes**: every acceptance criterion becomes an evaluable completion condition (mechanism-agnostic); the traceability chain extends from PRD through TAD to autonomous implementation verification
