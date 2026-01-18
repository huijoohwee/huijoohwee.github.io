# CID Guidelines – Universal Template & Implementation

## Overview

- **Context**: Focus domain of concern (the "what" or "where")
- **Intent**: Desired principle or guiding goal (the "why" or "how")
- **Directive**: Explicit prohibition or required safeguard (the "must not" or "must do")
- **Sorting**: Each line/column is organized alphabetically (A→Z) for clarity and neutrality
- **Purpose**: Provides a reusable template for creating Context—Intent—Directive guidelines across any domain

---

## Meta-Guidelines

### Context
- **Documentation systems**: establish structured rules to ensure order, define clear responsibilities to preserve accountability, align workflows to maintain cohesion, empower teams to guarantee ownership, and set unambiguous guidelines to secure clarity.

### Intent
- **Meta-guideline intent**: structure with CID to ensure coherence, enforce SRP to preserve modularity, chain RAO to maintain resilience, clarify with SVO to guarantee transparency, and trace operations to secure accountability.

### Core Directives (SVO Format)

- **CID Guidelines structures documentation into three-part compositions**
  - Context establishes environmental conditions and problem scope
  - Intent declares purpose and desired outcomes
  - Directives prescribe actionable rules in SVO format

- **SRP enforces focused responsibility boundaries**
  - Components handle single concerns
  - Modules avoid overlapping responsibilities
  - Systems compose focused units into complex behaviors

- **RAO defines accountability chains**
  - Roles identify responsible agents
  - Actions specify transformative operations
  - Outcomes declare measurable results

- **SVO clarifies operational semantics**
  - Subjects identify actors or components
  - Verbs specify concrete actions
  - Objects define targets and artifacts

---

## Usage Instructions

### When to Create CID Guidelines

- **Create CID guidelines when you need to**:
  - Establish consistent standards across a domain (codebase, project, documentation, system design)
  - Define clear principles with explicit boundaries
  - Enable team alignment through structured, searchable mantras
  - Prevent common anti-patterns through explicit prohibitions
  - Maintain neutrality and avoid project-specific assumptions

### How to Populate This Template

1. **Identify your domain**: What area needs guidelines? (e.g., neutrality, maintainability, project rules, documentation, system design)
2. **Extract contexts**: List all relevant focus areas alphabetically (e.g., Adaptability, Architecture, Caching)
3. **Define intents**: For each context, specify the desired principle or goal
4. **State directives**: Explicitly prohibit anti-patterns or require safeguards using checkboxes `- [ ]`
5. **Maintain neutrality**: Avoid project names, dataset references, or domain-specific examples
6. **Sort alphabetically**: Keep all contexts in A→Z order for easy navigation and reference

### Template Structure

This template provides two formats:
1. **Slogan-style mantras**: Concise three-beat format for quick reference and memorization
2. **Detailed table**: Comprehensive format with full context, intent, and directive specifications

---

## Slogan-style, three-beat mantra form

- Each line is a three-beat `Context; Intent; Directive` mantra:

```
- [ ] [Context A]; [intent/principle]; forbid [anti-pattern/violation]
- [ ] [Context B]; [intent/principle]; forbid [anti-pattern/violation]
- [ ] [Context C]; [intent/principle]; forbid [anti-pattern/violation]
```

- **Example from Neutrality Guidelines**:
```
- [ ] Adaptability; enable customization; forbid hardcoded behavior
- [ ] Algorithms; apply general-purpose logic; forbid dataset dependencies
- [ ] Configuration; externalize parameters; forbid embedded settings
- [ ] Domains; operate across sectors; forbid sector-specific assumptions
```

---

## Context—Intent—Directive Table

- Each row is a universal, neutral, project-agnostic one-liner mantra: `Context (focus domain) | Intent (desired principle) | Directive (explicit prohibition)`

```
| Context             | Intent                              | Directive                                                                                      |
|---------------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| [Context A]         | [Intended principle or goal]        | - [ ] [Action verb] [object]; [intended outcome]; forbid [anti-pattern or violation]         |
| [Context B]         | [Intended principle or goal]        | - [ ] [Action verb] [object]; [intended outcome]; forbid [anti-pattern or violation]         |
| [Context C]         | [Intended principle or goal]        | - [ ] [Action verb] [object]; [intended outcome]; forbid [anti-pattern or violation]         |
```

**Example from Maintainability Guidelines**:
```
| Context             | Intent                              | Directive                                                                                      |
|---------------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Caching             | Optimize data retrieval             | - [ ] Implement caching; optimize retrieval; forbid redundant fetches                         |
| Centralization      | Establish single source of truth    | - [ ] Centralize copy; establish single source; forbid duplicate strings                      |
| Chunks              | Constrain bundle sizes              | - [ ] Limit chunks to <500kB; constrain sizes; forbid oversized bundles                       |
| Classes             | Maintain single responsibility      | - [ ] Scope classes; maintain single responsibility; forbid multi-concern classes             |
```

---

## Directive Pattern Guidelines

### Standard Directive Format

```
- [ ] [Action verb] [object/target]; [intended state/outcome]; forbid [specific anti-pattern]
```

### Common Action Verbs (alphabetically)

> Apply, Assign, Avoid, Build, Cache, Centralize, Configure, Define, Design, Document, Enable, Enforce, Ensure, Establish, Externalize, Implement, Maintain, Maximize, Minimize, Monitor, Preserve, Prevent, Provide, Scope, Secure, Separate, Specify, Standardize, Track, Use, Validate

### Common Prohibition Verbs (after "forbid")

> Forbid [noun/gerund]: embedded logic, hardcoded values, duplicate code, unclear intent, unmeasured metrics, undocumented behavior, single points of failure, unbounded resources

### Directive Quality Checklist

- A well-formed directive should:
  - [ ] Start with an action verb in present tense
  - [ ] Specify a clear object or target
  - [ ] State the intended outcome or principle
  - [ ] Explicitly prohibit a specific anti-pattern
  - [ ] Be measurable or verifiable
  - [ ] Remain domain-agnostic (no project/dataset names)
  - [ ] Use neutral, universal terminology

---

## Integration with Other Frameworks

### CID + SRP (Single Responsibility Principle)

- **CID**: Defines what contexts need guidelines and what's prohibited
- **SRP**: Ensures each module/component/class handles one concern
- **Together**: CID frames the rules; SRP isolates the implementation

### CID + RAO (Role—Action—Outcome)

- **CID**: Establishes standards and prohibitions
- **RAO**: Assigns responsibilities to roles for implementing those standards
- **Together**: CID defines what; RAO defines who does what

### CID + SVO (Subject—Verb—Object)

- **CID**: Provides the governance framework
- **SVO**: Expresses operations with grammatical precision
- **Together**: CID frames rules; SVO clarifies execution semantics

---

## Role—Action—Outcome

- **Role: Guideline Designer**  
-> Action: defines CID structure, SRP boundaries, RAO chains, SVO patterns as reusable templates  
-> Outcome: produces meta-guideline enabling consistent documentation across domains

- **Role: Documentation Author**  
-> Action: applies CID structure, decomposes systems via SRP, maps workflows to RAO, expresses rules as SVO  
-> Outcome: generates clear, focused, accountable specifications

- **Role: System Architect**  
-> Action: consumes CID-structured guidelines, enforces SRP separation, traces RAO chains, validates SVO clarity  
-> Outcome: builds systems with verifiable alignment to documented intent

- **Role: Validator**  
-> Action: checks Context completeness, verifies Intent alignment, audits Directive actionability, confirms RAO traceability  
-> Outcome: ensures guideline adherence and documentation quality

---

## Mantra Application

> **"CID frames, SRP focuses, RAO aligns, SVO clarifies"**

- **CID frames**: Establishes scope, purpose, rules as structured triplet
- **SRP focuses**: Ensures each component owns single concern
- **RAO aligns**: Maps responsibilities to actions to outcomes
- **SVO clarifies**: Expresses operations with grammatical precision

### Extended Template

> **"CID frames [domain] standards, SRP isolates [component] concerns, RAO aligns [role] responsibilities, SVO clarifies [operation] semantics"**

- **CID frames**: Establishes scope ([domain area]), purpose ([key goals]), rules ([core principles + prohibitions])
- **SRP isolates**: Ensures each [module/component/class] handles [single concern], each [unit] owns [focused responsibility]
- **RAO aligns**: Maps [role 1], [role 2], [role 3], [role N] to their [domain-specific] deliverables
- **SVO clarifies**: Expresses all operations ([examples of subject-verb-object statements]) with grammatical precision enabling [accountability/clarity/traceability]

---

## Anti-Pattern Guards

❌ Vague context statements -> ✅ Specific environmental conditions  
❌ Multiple intents per guideline -> ✅ Single focused purpose  
❌ Imperative commands without subjects -> ✅ SVO-structured directives  
❌ Ambiguous responsibilities -> ✅ Explicit Role—Action—Outcome chains

---

## Example CID Guidelines by Domain

### Codebase Neutrality
- Context: Adaptability, Configuration, Domains, Flexibility
- Intent: Enable cross-domain deployment, support customization
- Directive: Forbid hardcoded assumptions, dataset dependencies

### Maintainability
- Context: Boundaries, Centralization, Duplication, Size
- Intent: Maintain clarity, ensure consistency, reduce technical debt
- Directive: Forbid oversized modules, duplicate code, stale references

### Project Rules
- Context: Agility, Alignment, Feedback, Resilience
- Intent: Accelerate learning, align progress, sustain longevity
- Directive: Forbid slow validation, unmeasured objectives, technical debt

### Documentation
- Context: Clarity, Neutrality, Traceability, Transparency
- Intent: Enable adaptation, preserve provenance, ensure reproducibility
- Directive: Forbid hardcoded examples, undocumented APIs, opaque specifications

### System Design
- Context: Resilience, Scalability, Security, Observability
- Intent: Maximize availability, ensure reliability, protect integrity
- Directive: Forbid single points of failure, unbounded resources, unmonitored systems

---

## Complete Example

```
- Mantra: "CID frames, SRP focuses, RAO aligns, SVO clarifies."
- Directive: Use the CID (Context—Intent—Directives) guideline together with SRP (Single Responsibility Principle) and RAO (Role—Action—Outcome) to organize rules into SVO (Subject—Verb—Object) statements, ensuring clarity, focus, accountability, and purpose.
- Example:  
  Context: Exploratory Data Analysis (EDA) and Model Lifecycle Planning (MLP) in Agentic GraphRAG  
  Intent: Ensure reproducible workflows and prevent ad-hoc coupling between analysis and lifecycle stages  
  Directive (SVO): Analysts define data exploration steps, models record lifecycle states, systems enforce separation  
  Role—Action—Outcome:  
    - Role: Analyst -> Action: explores representative datasets -> Outcome: produces reproducible insights  
    - Role: Model steward -> Action: tracks lifecycle transitions -> Outcome: ensures accountability and auditability  
    - Role: System -> Action: enforces modular boundaries -> Outcome: maintains clarity and prevents duplication
```

---

## Quick Start Checklist

To create new CID guidelines using this template:

```
- [ ] Identify the domain requiring guidelines
- [ ] List 20–100 relevant contexts alphabetically
- [ ] For each context, define the intended principle
- [ ] For each context, specify explicit prohibitions
- [ ] Verify all entries use domain-agnostic language
- [ ] Sort all contexts alphabetically (A→Z)
- [ ] Create both slogan-style and table formats
- [ ] Add domain-specific mantra application
- [ ] Review for neutrality and completeness
- [ ] Validate directives are measurable and actionable
```

---

## Notes

- **Neutrality**: All contexts, intents, and directives must remain project-agnostic, dataset-agnostic, and domain-agnostic
- **Universality**: Guidelines should apply across teams, codebases, and organizational contexts
- **Clarity**: Each directive should be unambiguous and actionable
- **Completeness**: Cover all relevant contexts within the domain
- **Maintainability**: Keep guidelines up-to-date as domain evolves
- **Searchability**: Alphabetical sorting enables quick reference and lookup
- **Traceability**: RAO chains ensure accountability from role through action to outcome
- **Precision**: SVO format guarantees grammatical clarity in all operational statements