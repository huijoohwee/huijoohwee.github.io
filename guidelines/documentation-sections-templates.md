---
title: "Documentation Sections & Templates Module"
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
parent: "Documentation Guidelines"
parent_version: "1.0.0"
---

# Documentation Sections & Templates Module

## Scope & Ownership

Owns what a document must contain and the templates that supply it: required sections, the component template, and flow-pattern documentation.

This module is loaded on demand from [Documentation Guidelines](./documentation-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
