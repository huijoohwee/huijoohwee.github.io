---
title: "Documentation Guidelines"
doc_type: "Guidelines"
version: "2.0.0"
date: "2026-06-25"
lang: "en-US"
frontmatter_contract: "required"
---

# Documentation Guidelines

## Scope & Neutrality Contract

- **Universal**: these guidelines apply to any product, domain, language, or runtime; nothing here assumes a specific company, repository, file path, framework, or vendor.
- **Neutral**: name capabilities and roles by their function, never by a brand or project. Where a concrete tool is shown, it appears only as a non-binding *reference implementation* and may be swapped for any equivalent.
- **Agnostic**: documentation standards are derived from document content and parsed frontmatter only — never from file names, directory layout, or downstream mirrors. Examples use placeholders (`[...]`) rather than real identifiers.
- **Modular**: each `##` section is self-contained and addressable by its heading anchor (see Module Index). Sections may be lifted into another guideline set without rewriting their internals.

## Module Index

- `scope--neutrality-contract` — universality, neutrality, agnosticism, modularity rules
- `markdown-yaml-frontmatter-enforcement` — authoring contract for frontmatter SSOT
- `overview` — what documentation guidelines govern and the ruling standards
- `directive-grammar-cid` — Context/Intent/Directive grammar and sorting
- `required-document-sections` — mandatory sections and their authoring contracts
- `component-documentation-template` — From/To transformation pattern and SVO directives
- `flow-patterns-documentation` — documenting the five canonical flow types
- `provenance-and-traceability` — bidirectional linking, confidence propagation, extraction tracking
- `quality-metrics-documentation` — extraction, unification, query, and pipeline metrics
- `schema-and-api-documentation` — contract documentation, query interfaces, export formats
- `maintenance-documentation` — feedback loops, schema evolution, audit trails, automation contracts
- `cid-directive-matrix` — alphabetical, project-agnostic documentation directives
- `anti-pattern-guards` — prohibited patterns and their corrections
- `documentation-validation-checklist` — pre-commit, review, and post-documentation gates
- `role-action-outcome` — role-to-deliverable mapping
- `mantra-application` — the framing mantra

---

## Markdown YAML Frontmatter Enforcement

- Canonical documentation specs, process docs, runbooks, and runtime-ready Markdown artifacts must start with a valid YAML frontmatter block as the first block in the file.
- Frontmatter is the SSOT for document identity, status, versioning, renderer activation, and reusable metadata referenced by the body specification.
- Canonical authored documentation uses plain YAML for frontmatter and related schema-bearing blocks; do not replace normal authoring syntax with normalized typed wrapper records.
- Normalized `{key, type, value}` wrappers are permitted only in dedicated validation fixtures that explicitly test ingest → parse → render or ingest → parse → validate fidelity.
- Scalars that contain reserved punctuation, including inline `:` content, must be quoted so strict YAML parsers read documentation metadata deterministically.
- Parser warning, repair, or fallback behavior is recovery-only; malformed YAML frontmatter remains an upstream authoring defect that must be fixed at source.

---

## Overview

**Documentation guidelines**: capture component responsibilities to preserve clarity; forbid hardcoded domains to sustain neutrality; drive schemas through configuration to enable adaptability; separate structure from semantics to maintain coherence; build cross-domain pipelines to guarantee interoperability; trace provenance with confidence to secure accountability.

**Governing standards**: structure documents with transformation flows; align domain-agnostic schemas with CID annotations; trace provenance with confidence; apply metrics-based quality assurance; safeguard against anti-patterns; optimize feedback loops with schema versioning.

**Solo-dev AI-native orientation**: documentation for AI-powered systems must additionally capture harness contracts, orchestration topology, token budgets, and verifiable completion conditions (VCCs) — aligned with the PRD/TAD guidelines. Documentation is not complete until every AI pipeline's dispatcher, executor, observer, and consumer roles are named and every agentic loop has a stated max-iteration bound and circuit-breaker.

---

## Directive Grammar (CID)

Every directive in this guideline set is expressed with a uniform, project-agnostic grammar so it can be lifted into any context unchanged.

### Definition
- **Context**: focus domain of concern
- **Intent**: desired principle or guiding goal
- **Directive**: explicit prohibition or required safeguard

### Sorting
Each entry is organized alphabetically (A→Z) for clarity and neutrality.

---

## Required Document Sections

Every canonical documentation artifact must contain the following sections. Sections are self-contained and addressable by heading anchor.

### Architecture Overview

**Writers define layer flow specifications.**

- Specify component names and single responsibilities (SVO format)
- Document data structures flowing between layers
- Avoid coupling to specific datasets, project names, or vendor-specific identifiers
- Render multi-component architectures using Mermaid (`flowchart TB` or `sequenceDiagram`); forbid ASCII art for diagrams exceeding five nodes

**Layer flow pattern** *(adapt to the system being documented)*:

```
[Source] → [Ingest] → [Transform] → [Store] → [Serve] → [Consumer]
```

### Component Specifications

**Writers provide intent-directive patterns for each module.**

- **Pattern**: **From `[input state]` to `[output state]`**: Component → [actions] → [outcome]
- List subject-verb-object (SVO) directives for every operation
- Define input and output schemas with typed fields
- Specify configuration parameters with key-value semantics: Default, Min, Max, Interval, impact description
- Document algorithm patterns without domain assumptions

### Configuration Reference

**Writers document adaptive parameters with impact explanations.**

- Specify tuning sensitivity ranges
- Explain feedback loop triggers
- Provide default values derived from principled baselines, not project-specific tuning
- Enable reproducibility through parameter logging
- Forbid hardcoded thresholds with no stated rationale

### Validation Guidelines

**Writers provide structural validation checklists.**

- Check required fields and referential integrity
- Explicitly state which semantic aspects are not validated by schema
- Include zero-hardcoding audit questions
- Document domain-agnostic validation patterns

---

## Component Documentation Template

**Writers structure component documentation using transformation statements.**

**From `[input state]` to `[output state]`**: `[Component]` → detects / extracts / computes / merges / infers `[specific actions]` → `[transformation steps]` → delivers `[output artifacts with provenance]` for `[downstream use case]`.

### Atomic SVO Directives

List every operation as a subject-verb-object statement:

- `[Component]` **verbs** `[input type]` via `[method]`
- `[Component]` **computes** `[metric]` using `[algorithm]`
- `[Component]` **validates** `[constraint]` against `[schema]`

Forbid compound actions. Maintain single responsibility per directive.

### Configuration Schema Pattern

```
[Parameter name] → From [low state] to [high state]:
  [Component] → [action based on parameter value] → controls [aspect] → affects [downstream quality dimension]
  Default: [value] | Min: [value] | Max: [value] | Interval: [step]
  Impact: [one-sentence description]
```

### Algorithm Description Pattern

- Describe computation using universal operations: clustering, similarity computation, path finding, ranking, aggregation
- Specify input features and output structures
- Avoid referencing specific entity types or domain labels
- Document time/space complexity and scalability characteristics

---

## Flow Patterns Documentation

Documentation must cover all five canonical flow types defined in the PRD/TAD guidelines. For each flow, the documentation artifact must include the specified sub-sections.

### User Journey Flow Documentation

**Writers map persona paths from trigger to outcome.**

- Document each journey stage: Trigger → Discover → Engage → Complete → Return
- Capture emotion, friction, and opportunity at each stage
- Anchor every feature story to a journey stage
- Forbid feature documentation with no journey anchor

**Template**:
```markdown
## Journey: [Persona] — [Goal]

| Stage    | Action              | Touchpoint       | Pain Point   | Opportunity   |
|----------|---------------------|------------------|--------------|---------------|
| Trigger  | [What prompts user] | [Entry channel]  | [Friction]   | [Improvement] |
| Discover | [User action]       | [UI/API/surface] | [Friction]   | [Improvement] |
| Engage   | [Core task]         | [UI/API/surface] | [Friction]   | [Improvement] |
| Complete | [Goal achieved]     | [Confirmation]   | [Drop-off]   | [Delight]     |
| Return   | [Re-entry trigger]  | [Channel]        | [Churn risk] | [Retention]   |
```

### Workflow Flow Documentation

**Writers document task sequences through actors, decisions, and system states.**

Every workflow documentation block must include: trigger, happy path, at least one alternate path, at least one error path, and postconditions.

**Template**:
```markdown
## Workflow: [Name]

**Trigger**: [Event or condition]
**Actors**: [Human roles and system components]

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

### Data Flow Documentation

**Writers trace data movement from source through transformation to consumption.**

Every data flow documentation block must specify schema at every stage boundary, persistence layer, and error handling per stage.

**Template**:
```markdown
## Data Flow: [Name]

| Stage     | Component       | Input Format    | Output Format   | Persistence      | Error Handling    |
|-----------|-----------------|-----------------|-----------------|------------------|-------------------|
| Ingest    | [Component]     | [Schema/format] | [Schema/format] | [None/queue/db]  | [Retry/DLQ/skip]  |
| Transform | [Component]     | [Schema/format] | [Schema/format] | [None/cache]     | [Retry/fail-fast] |
| Store     | [Storage layer] | [Schema/format] | [Schema/format] | [DB/blob/index]  | [Rollback/alert]  |
| Serve     | [API/stream]    | [Query params]  | [Response schema]| [Cache/CDN]     | [Fallback/503]    |
```

### Orchestration/Harness Flow Documentation

**Writers document AI pipeline control paths: validation, routing, execution, observation, and cost.**

Every Orchestration/Harness Flow documentation block must name dispatcher, executor, observer, and consumer roles; specify cost log fields; define fallback paths; and — for loops — state max-iteration bound and circuit-breaker condition.

**Template**:
```markdown
## Orchestration/Harness Flow: [Pipeline Name]

**Trigger**: [Event or condition]
**Topology pattern**: [Sequential | Fan-out/Fan-in | Agentic loop]
**Max iterations** *(loops only)*: [N] | **Circuit-breaker**: [exit condition]
**Token budget**: [avg prompt tokens] + [avg completion tokens] @ [cache hit rate] = [est. cost/call]

| Role       | Component         | Input schema      | Output schema     | Cost log | Fallback                   |
|------------|-------------------|-------------------|-------------------|----------|----------------------------|
| Dispatcher | [Component]       | [Typed payload]   | [Routed payload]  | —        | [Reject with typed error]  |
| Executor   | [Harness + model] | [Typed prompt]    | [Typed response]  | ✓        | [Degraded / retry]         |
| Observer   | [Logger]          | [Cost log stream] | [Metric / alert]  | —        | [Silent fail; log gap]     |
| Consumer   | [Downstream]      | [Typed response]  | [Artifact/state]  | —        | [Upstream error]           |
```

### Topology Documentation

**Writers document the structural snapshot of all components at a stated point in time.**

Every topology documentation block must name every connection type, state data residency for every storage node, and be version-stamped on every update.

**Template**:
```markdown
## Topology: [System Name] v[version] — [Date or milestone]

**Boundaries**: [Runtime environments, network zones, or trust domains]

| Node        | Role                              | Type                    | Connects to | Connection type | Data residency |
|-------------|-----------------------------------|-------------------------|-------------|-----------------|----------------|
| [Component] | [Producer/Consumer/Router/Store]  | [Service/Function/DB]   | [Node(s)]   | [Sync/Async]    | [Region/Cloud] |

**Runtime diagram**: Mermaid `flowchart TB` — nodes grouped by boundary using subgraphs
**Version notes**: [What changed from prior topology version]
```

---

## Provenance and Traceability

### Bidirectional Linking

**Writers specify node-to-source tracking mechanisms.**

- Document how output nodes track source documents via metadata (e.g., `metadata.sourcePath`, `lineStart`, `lineEnd`)
- Specify structure-type annotations (e.g., Paragraph, List, CodeBlock, Section, Table) at the schema level
- Clarify that parsers extract semantics while metadata preserves formatting context; forbid conflating the two
- Forbid undocumented node-to-source tracking mechanisms

### Confidence Propagation

**Writers document confidence score computation methods.**

- Explain threshold tuning mechanisms
- Specify confidence decay rules for inferred or transitive relationships (e.g., transitive edges multiply parent confidence scores by a stated factor)
- Document multi-hop confidence tracking through reasoning chains
- Specify computation methods: syntactic path length, embedding coherence, or equivalent
- Forbid static confidence scores with no stated decay or propagation rule

### Extraction Method Tracking

**Writers label output nodes and edges with extraction provenance.**

- Tag output artifacts with extraction method (e.g., pattern-based, statistical, user-curated)
- Document how the tagging enables quality analysis by method
- Specify how selective re-extraction is triggered when algorithms improve
- Forbid unlabeled extraction outputs with no traceable origin

### VCC Traceability

**Writers derive Verifiable Completion Conditions (VCCs) from acceptance criteria.**

Every acceptance criterion in a PRD maps to a VCC used at implementation time. Documentation must surface:
- The end state (one measurable, observable outcome)
- The stated check (how the outcome is demonstrated)
- The scope constraint (what must not change while reaching the end state)
- The iteration bound (optional cap for loop-based implementations)

**Traceability pattern**:
```
PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface] ↔ VCC [condition]
```

Forbid documentation that leaves acceptance criteria without a traceable VCC expression.

---

## Quality Metrics Documentation

### Extraction Metrics

**Writers define extraction quality measures.**

- Precision: correct extractions / total extractions
- Recall: correct extractions / gold standard
- Entity coherence: 1 − intra-cluster variance (or equivalent normalized measure)
- Mention consistency: successful resolutions / total candidate references
- Document computation methods and feedback loop triggers for each metric

### Unification Metrics

**Writers define unification quality measures.**

- Merge precision, duplicate detection rate, conflict resolution rate, cross-document coverage
- Explain aggregation method across corpus
- Specify quality thresholds that trigger reprocessing or review

### Query and Pipeline Metrics

**Writers define query performance measures.**

- Answer relevance, citation coverage, traversal efficiency, follow-up relevance
- Explain evaluation method (human review, automated scoring, or equivalent)
- Document A/B testing or threshold optimization frameworks
- Forbid unmeasured pipeline stages

### Token Economics (AI Pipelines)

**Writers document token budget estimates for every AI-powered pipeline.**

- Estimate prompt tokens + completion tokens + cache hit rate at target load
- State cost-per-request budget and monthly projection
- Track actuals against estimates each sprint; update projections when model pricing or traffic changes
- Forbid AI pipeline documentation without token budget estimates

---

## Schema and API Documentation

### Schema Contract Documentation

**Writers specify field requirements for every data contract.**

- Document required fields and optional fields with distinct sections
- Explain `@context` or vocabulary mapping; forbid implicit semantic definitions
- Provide structural validation rules; forbid semantic constraints embedded in structural schemas
- Version schemas with semantic versioning rules; forbid arbitrary schema changes

### Query Interface Documentation

**Writers explain query processing logic.**

- Document intent classification mapping (e.g., lookup → single-node retrieval, causal → directed path search)
- Specify traversal strategy selection logic
- Explain adaptive depth or pagination adjustment algorithms
- Provide query result structure documentation with provenance fields
- Forbid undocumented query patterns or implicit routing logic

### Export Format Documentation

**Writers specify transformation mappings between internal and external formats.**

- Document field mappings from internal schema to each target format
- Explain metadata preservation across format conversions
- Provide format selection criteria based on downstream use cases
- Forbid undocumented format transformations or implicit field mapping

---

## Maintenance Documentation

### Feedback Loop Monitoring

**Writers document monitoring procedures.**

- Document metric collection intervals
- Specify parameter adjustment magnitudes and their effect on downstream quality
- Explain convergence detection mechanisms
- Provide rollback procedures for degraded performance states
- Log all tuning iterations for reproducibility; forbid unlogged tuning decisions

### Schema Evolution

**Writers document versioning strategies.**

- Apply semantic versioning to all schemas
- Embed schema version metadata in output artifacts
- Specify backward compatibility requirements (e.g., optional field additions permitted; required field additions are breaking changes)
- Provide migration scripts for every breaking change; forbid breaking changes without migration guidance

### Audit Trail Requirements

**Writers document logging requirements.**

- Specify what to log: extraction parameters, confidence thresholds, merge decisions, conflict resolutions
- Specify retention periods for each log type
- Address privacy considerations for source-document metadata
- Enable reproducible pipeline execution from logs alone; forbid log gaps that prevent replay

### Automation Contracts

**Writers document documentation generation workflows.**

- Describe scripts that regenerate documentation artifacts from source inputs using SVO directives
- Specify input locations, output locations, and triggering conditions
- Ensure automation remains configuration-driven (no hardcoded domains)
- Record how automation integrates with quality gates (lint, typecheck, tests)
- Forbid undocumented automation scripts or manually maintained generated artifacts

**Writers define neutral status matrices for documentation coverage.**

- Use multi-column tables to distinguish participation in: artifact generation, documentation linting/sanity checks, and QA pipelines
- Express coverage using neutral indicators (`[x]` / `[ ]`); forbid domain-specific coverage symbols
- Add a stewardship column that names roles, not individuals
- Keep matrices configuration-driven; forbid special-case logic embedded in coverage tables

---

## CID Directive Matrix

Each row is a universal, neutral, project-agnostic directive in `Context | Intent | Directive` grammar. Rows are sorted A→Z.

| Context | Intent | Directive |
|---------|--------|-----------|
| Accountability | Secure via provenance tracing | - [ ] Trace provenance with confidence scores; secure accountability; forbid untracked origins |
| Adaptability | Enable cross-domain deployment | - [ ] Drive schemas via configuration; enable adaptability; forbid hardcoded domain assumptions |
| Adjustment | Document parameter tuning | - [ ] Specify adjustment magnitudes and effects; document tuning history; forbid undocumented parameter changes |
| Aggregation | Explain corpus-wide metrics | - [ ] Document aggregation methods; explain metric computation; forbid opaque aggregation logic |
| Algorithms | Describe universal operations | - [ ] Use universal algorithm patterns; describe abstractly; forbid domain-specific method names in documentation |
| Alignment | Synchronize with CID annotations | - [ ] Align schemas with CID annotations; synchronize specifications; forbid unmarked or unannotated schemas |
| Ambiguity | Ensure specification clarity | - [ ] Prevent ambiguity; ensure clarity at every boundary; forbid vague or implicit specifications |
| Annotations | Mark with intent-directive patterns | - [ ] Annotate with CID; mark specifications; forbid unannotated schemas |
| Anti-patterns | List forbidden violations | - [ ] Document prohibited patterns with corrections; forbid undocumented anti-patterns |
| API | Specify integration contracts | - [ ] Document query interfaces; specify processing logic; forbid undocumented endpoints or implicit routing |
| Architecture | Define layer flow specifications | - [ ] Capture architecture flows with Mermaid; define layers; forbid undocumented multi-component structures |
| Artifacts | Specify output structures | - [ ] Document output artifact schemas; specify structures; forbid implicit output formats |
| Atomic | Express single operations | - [ ] List operations as atomic SVO statements; forbid compound or multi-action directives |
| Audit | Document logging requirements | - [ ] Specify audit trail content and retention; document logging; forbid unlogged decisions |
| Automation | Define documentation generation workflows | - [ ] Document automation contracts; specify triggers and outputs; forbid undocumented generation scripts |
| Backward | Maintain compatibility requirements | - [ ] Preserve backward compatibility across schema changes; forbid breaking changes without migration scripts |
| Boundaries | Avoid dataset coupling | - [ ] Maintain layer boundaries; use placeholders; forbid dataset-specific or project-specific examples |
| Capture | Document responsibilities clearly | - [ ] Capture component responsibilities in SVO format; forbid ambiguous or role-free documentation |
| Clarity | Preserve structural understanding | - [ ] Layer flows with component specs; ensure clarity; forbid obscure or undocumented architectures |
| Coherence | Maintain structure-semantic separation | - [ ] Separate structure from semantics in documentation; forbid coupled or conflated specifications |
| Configuration | Document adaptive parameters | - [ ] Specify configuration schemas with impact; document all adaptive parameters; forbid hardcoded values |
| Constraints | Provide structural validation rules | - [ ] Document constraints as structural rules; forbid semantic validation embedded in structural schemas |
| Contracts | Specify data schema requirements | - [ ] Document schema contracts with required and optional fields; forbid implicit agreements |
| Coverage | Define neutral status matrices | - [ ] Document coverage matrices with neutral indicators; forbid domain-specific coverage tracking |
| Data States | Handle all fetch and processing states | - [ ] Document loading, stale, error, and empty states for every data-consuming component; forbid single-state documentation |
| Decisions | Log for reproducibility | - [ ] Document merge and architectural decisions; log rationale; forbid unlogged choices |
| Dependencies | Map component relationships | - [ ] Identify and document dependencies; forbid undeclared coupling or implicit relationships |
| Documentation | Structure with transformation flows | - [ ] Layer flows with specs; structure clearly; forbid flat or unstructured documentation |
| Domain | Test blindness systematically | - [ ] Document domain blindness tests; validate neutrality across ≥ 3 domains; forbid single-domain validation |
| Error | Specify handling strategies | - [ ] Document error paths with recovery or escalation; forbid undefined error states |
| Evolution | Document schema versioning | - [ ] Track schema evolution with semantic versioning; forbid unversioned or arbitrarily changed schemas |
| Execution | Enable reproducible pipelines | - [ ] Log execution parameters; enable full reproducibility from logs; forbid unreproducible runs |
| Export | Document format transformations | - [ ] Specify export field mappings; document transformations; forbid undocumented format conversions |
| Extraction | Define quality measures | - [ ] Document precision, recall, and coherence metrics; forbid unmeasured extraction |
| Feedback | Document monitoring procedures | - [ ] Explain feedback loops and triggers; document monitoring; forbid unmonitored quality signals |
| Fields | Distinguish required from optional | - [ ] Document field requirements distinctly; forbid ambiguous mandatory-field specifications |
| Flow | Define layer progression | - [ ] Specify layer flows for every pipeline; define progression; forbid undocumented data pipelines |
| Forbidden | List hardcoding violations | - [ ] Document all forbidden patterns with examples; forbid undocumented restrictions |
| Formatting | Preserve context via metadata | - [ ] Document metadata preservation methods; forbid context-stripped documentation |
| Gates | Document quality thresholds | - [ ] Integrate documentation with quality gates; document thresholds; forbid unvalidated documentation |
| Hardcoding | Forbid in documentation examples | - [ ] Eliminate hardcoded project or dataset names; use placeholders; forbid project-specific samples |
| Harness | Document AI pipeline control contracts | - [ ] Document harness input/output schemas, cost log fields, and fallback paths; forbid raw prompt calls with no harness contract |
| Impact | Explain parameter effects | - [ ] Document impact descriptions for every parameter; forbid unexplained configuration settings |
| Integration | Document quality gate alignment | - [ ] Align documentation with quality gates; forbid isolated documentation not tied to validation |
| Interoperability | Build cross-domain pipelines | - [ ] Enable interoperability; document universally; forbid domain-locked documentation |
| Journeys | Map user workflows | - [ ] Chart user journeys for every user-facing feature; forbid journey-free feature documentation |
| Logging | Specify retention requirements | - [ ] Document logging requirements and retention periods; forbid unclear audit lifecycles |
| Maintenance | Document monitoring and rollback | - [ ] Specify maintenance procedures and rollback strategies; forbid undocumented operational procedures |
| Mapping | Trace requirements to implementation | - [ ] Link specs to implementation via PRD ↔ TAD ↔ VCC chain; forbid orphaned requirements |
| Metrics | Define computation methods | - [ ] Document quality metrics with computation methods; forbid unmeasured quality dimensions |
| Migration | Provide breaking change scripts | - [ ] Provide migration scripts for every breaking change; forbid manual schema migrations |
| Modularity | Design independent documentation units | - [ ] Each section is self-contained and liftable; forbid cross-section coupling |
| Neutrality | Maintain domain independence | - [ ] Design documentation domain-neutral; forbid project names, vendor names, or dataset labels in rules |
| Observability | Enable system transparency | - [ ] Document telemetry, cost log emission, and observability hooks; forbid black-box pipeline documentation |
| Orchestration | Document AI pipeline topology | - [ ] Specify orchestration topology (sequential/fan-out/agentic); set max-iteration bounds; forbid unbounded loops |
| Outcomes | Specify transformation deliverables | - [ ] Document outcomes and output artifacts; forbid unclear or implicit deliverables |
| Parameters | Document with impact descriptions | - [ ] Specify every parameter with default, range, and impact; forbid unexplained configuration settings |
| Patterns | Provide intent-directive templates | - [ ] Document patterns with templates; forbid ad-hoc documentation styles |
| Performance | Specify response requirements | - [ ] Document latency and throughput targets; forbid unspecified or unmeasured performance criteria |
| Provenance | Trace with source and method metadata | - [ ] Document provenance for every output artifact; forbid untracked data lineage |
| Quality | Apply metrics-based standards | - [ ] Document quality standards with metrics; forbid unmeasured or subjective quality gates |
| Reproducibility | Log parameters systematically | - [ ] Enable full reproducibility from logs; forbid unreproducible documentation or pipeline execution |
| Resilience | Optimize feedback loops | - [ ] Document resilience mechanisms; forbid fragile or unmonitored feedback loops |
| Responsibilities | Capture component duties | - [ ] Document component responsibilities in SVO format; forbid unclear or ambiguous component roles |
| Rollback | Provide degradation procedures | - [ ] Document rollback procedures; forbid unclear failure or degradation responses |
| Scalability | Document complexity characteristics | - [ ] Specify scalability and complexity; forbid unanalyzed performance characteristics |
| Schema | Version with semantic rules | - [ ] Apply semantic versioning to all schemas; forbid arbitrary or undocumented schema changes |
| Separation | Maintain structure-semantic divide | - [ ] Separate structural and semantic documentation; forbid conflated specifications |
| Stewardship | Name roles not individuals | - [ ] Assign documentation ownership to roles; forbid individual-based stewardship assignments |
| TCO | Make total cost explicit | - [ ] Document 12-month TCO for every dependency; forbid uncosted architectural decisions |
| Thresholds | Document tuning mechanisms | - [ ] Specify thresholds with tuning guidance; forbid hardcoded quality gates with no rationale |
| Token Economics | Treat token spend as a metric | - [ ] Estimate prompt + completion tokens per pipeline call; track actuals; forbid AI pipelines without token budgets |
| Topology | Map structural component connections | - [ ] Document runtime topology for systems with ≥ 3 components; name every connection type; forbid implicit or unlabelled connections |
| Traceability | Enable via comprehensive docs | - [ ] Document full PRD ↔ TAD ↔ VCC chain; forbid incomplete provenance documentation |
| Transformation | Document using From-To patterns | - [ ] Express every transformation as From [input state] to [output state]; forbid unclear state transitions |
| Transparency | Log parameters reproducibly | - [ ] Ensure parameter transparency; log reproducibly; forbid opaque configuration documentation |
| Validation | Provide structural checklists | - [ ] Provide validation checklists for every document type; forbid subjective or unchecked documentation |
| VCC | Derive from acceptance criteria | - [ ] Express every acceptance criterion as an evaluable VCC; forbid criteria that an agent cannot verify from its own output |
| Versioning | Apply semantic rules | - [ ] Apply semantic versioning to documents and schemas; forbid unversioned or in-place overwrites |
| Violations | List explicitly with guidance | - [ ] Document violations with corrections; forbid undocumented anti-patterns |
| Workflows | Document process flows | - [ ] Document workflows with trigger, happy path, alternate paths, error paths, and postconditions; forbid workflow-free features |

---

## Anti-Pattern Guards

**Documentation Content**:
❌ Hardcoded project names, dataset labels, or vendor-specific identifiers in rules or examples
→ ✅ Use placeholders (`[...]`); keep all examples domain-agnostic

❌ Vague or non-observable acceptance criteria ("documentation is complete", "system is working")
→ ✅ Every criterion expressible as a VCC: one measurable end state + a stated check + scope constraints

❌ Flat documentation without layer flows or component specs
→ ✅ Structure documentation with transformation flows; layer flows with component specs

❌ Component documentation with no stated responsibility
→ ✅ Every component documented with an SVO responsibility statement

❌ Configuration parameters with no impact description or default value
→ ✅ Every parameter documented with default, min, max, interval, and impact description

**Schema and API**:
❌ Schema contracts with implicit or undocumented fields
→ ✅ All required and optional fields documented; vocabulary mappings explicit

❌ Query interfaces with no traversal strategy or intent classification documentation
→ ✅ Query logic documented with intent-to-strategy mappings

❌ Export formats with undocumented field mappings
→ ✅ All export field mappings specified; metadata preservation documented

**AI Pipelines**:
❌ AI pipelines documented only as data flows with no harness contract
→ ✅ Every AI pipeline has an Orchestration/Harness Flow with dispatcher, executor, observer, and consumer roles named

❌ Agentic loops with no max-iteration bound or circuit-breaker condition
→ ✅ Every loop specifies max iterations and a circuit-breaker exit condition; token spend is bounded and observable

❌ Token cost treated as invisible; no prompt/completion budget documented
→ ✅ Token budget estimated and documented per pipeline; actuals tracked and compared to estimates

**Provenance and Versioning**:
❌ Output artifacts with no extraction method label or source tracking
→ ✅ Every artifact tagged with extraction method and source provenance

❌ Schema changes without version bump or migration script
→ ✅ Semantic versioning applied; breaking changes accompanied by migration scripts

❌ Confidence scores with no decay rule or propagation documentation
→ ✅ Confidence propagation and decay rules stated explicitly

**Maintenance and Automation**:
❌ Documentation artifacts maintained manually when they can be generated
→ ✅ Automation contracts documented; generated artifacts regenerated via scripted workflows

❌ Status coverage matrices using domain-specific symbols or individual names
→ ✅ Neutral indicators (`[x]` / `[ ]`); role-based stewardship columns

---

## Documentation Validation Checklist

### Pre-Commit (Required)

- [ ] Zero hardcoded project, dataset, or vendor names in rules and examples
- [ ] All schemas include CID annotations
- [ ] SVO structure validated in all directives
- [ ] Configuration parameters have impact descriptions and default values
- [ ] Algorithm descriptions use universal, domain-agnostic operations
- [ ] YAML frontmatter is valid and complete

### Code Review (Required)

- [ ] No domain-specific examples or coupled documentation
- [ ] Structure-semantic separation maintained throughout
- [ ] Provenance mechanisms documented (source tracking, extraction method, confidence)
- [ ] Quality metrics defined with computation methods
- [ ] Anti-patterns explicitly listed with corrections

### Post-Documentation (Required)

- [ ] Domain blindness tests documented; ≥ 3-domain validation specified
- [ ] All transformation patterns use From-To format
- [ ] All parameters logged for reproducibility
- [ ] VCCs derived from every acceptance criterion
- [ ] Topology documented for every system with ≥ 3 components
- [ ] Token budgets documented for every AI-powered pipeline
- [ ] Schema versioned and migration scripts provided for breaking changes
- [ ] Automation contracts documented; no manually maintained generated artifacts

---

## Role—Action—Outcome

**Role: Technical Writer**
→ Action: captures architecture flows; documents component specifications using SVO directives; creates configuration schemas; provides algorithm patterns without domain coupling
→ Outcome: produces domain-agnostic documentation enabling cross-domain pipeline adaptation

**Role: Component Documenter**
→ Action: writes intent-directive patterns; lists atomic SVO operations; defines typed input/output schemas; specifies configuration parameters with impact descriptions
→ Outcome: delivers focused component documentation maintaining single-responsibility clarity

**Role: Provenance Documenter**
→ Action: specifies bidirectional linking mechanisms; documents confidence propagation methods; labels extraction methods; explains metadata preservation
→ Outcome: enables traceability through comprehensive provenance documentation

**Role: Metrics Definer**
→ Action: defines extraction, unification, query, and pipeline metrics; documents computation methods; specifies quality thresholds; explains feedback triggers; documents token budgets
→ Outcome: establishes measurable quality standards enabling systematic improvement

**Role: Anti-Pattern Guardian**
→ Action: lists forbidden patterns with corrections; provides domain-blindness tests; requires corpus diversity validation; audits for hardcoding violations
→ Outcome: prevents hardcoding violations and ensures configuration-driven adaptability

**Role: Schema Documenter**
→ Action: specifies data contracts; documents required and optional fields; explains vocabulary mapping; provides structural validation rules
→ Outcome: establishes clear data contracts enabling integration and validation

**Role: API Documenter**
→ Action: explains query interfaces; documents intent classifications; specifies traversal strategies; provides result structures with provenance fields
→ Outcome: enables effective system usage through comprehensive API documentation

**Role: Format Documenter**
→ Action: documents export transformations; specifies field mappings; explains metadata preservation across formats; provides format selection criteria
→ Outcome: facilitates downstream integration through multi-format export documentation

**Role: Maintenance Documenter**
→ Action: documents feedback loops; explains monitoring procedures; specifies rollback strategies; logs tuning iterations
→ Outcome: enables reliable system operation and reproducible performance optimization

**Role: Schema Steward**
→ Action: manages semantic versioning; maintains backward compatibility rules; provides migration scripts; tracks schema evolution with version notes
→ Outcome: ensures stable schema transitions without breaking downstream integrations

**Role: Audit Engineer**
→ Action: specifies logging requirements; defines retention policies; addresses privacy considerations; enables reproducibility from logs
→ Outcome: maintains comprehensive audit trails supporting compliance and debugging

---

## Mantra Application

**"CID frames documentation standards, SRP isolates component concerns, RAO aligns documenter responsibilities, SVO clarifies specification semantics"**

- **CID frames**: establishes scope (domain-agnostic documentation), purpose (clarity, neutrality, traceability), and rules (SVO directives, configuration schemas, VCC conditions)
- **SRP isolates**: ensures each component documentation block handles a single transformation; each section addresses one focused concern
- **RAO aligns**: maps Technical Writers, Component Documenters, Metrics Definers, Schema Stewards, and Audit Engineers to their specific documentation deliverables
- **SVO clarifies**: expresses all operations (`[Component] verbs [artifact] via [mechanism]`) with grammatical precision enabling accountability and implementation clarity

**Governing traceability chain** (extends PRD/TAD standard):
```
PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface] ↔ VCC [condition] ↔ Doc-[Section]-[Component]
```
