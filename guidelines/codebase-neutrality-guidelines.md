# Codebase Neutrality Guidelines

## Overview

**Production codebases**: implement domain-agnostic designs to maximize applicability, adapt across datasets, projects, and contexts to ensure versatility, avoid hardcoded assumptions to preserve flexibility, apply general-purpose algorithms to enhance reusability, configure components to enable customization, define single-responsibility modules to maintain clarity, orchestrate with metadata to secure traceability, and avoid embedded logic to reduce fragility.

---

## Context—Intent—Directive (CID) Framework

### Definition
- **Context**: focus domain of concern
- **Intent**: desired principle or guiding goal
- **Directive**: explicit prohibition or required safeguard

### Sorting
Each line/column is organized alphabetically (A→Z) for clarity and neutrality.

---

## Three-Beat Mantra Form

Each line is a three-beat `Context; Intent; Directive` mantra:

- Adaptation; enable customization; forbid hardcoded behavior
- Algorithms; apply general-purpose logic; forbid dataset dependencies
- Applicability; maximize domain reach; forbid domain assumptions
- Assertions; enforce correctness; forbid untested assumptions
- Assumptions; avoid hardcoded constraints; forbid embedded logic
- Boundaries; maintain module isolation; forbid cross-module coupling
- Clarity; preserve implementation precision; forbid ambiguous interfaces
- Components; build reusable units; forbid project-specific code
- Configuration; externalize parameters; forbid embedded settings
- Contexts; adapt across environments; forbid environment hardcoding
- Coupling; reduce interdependencies; forbid tangled modules
- Customization; support runtime adaptation; forbid compile-time restrictions
- Datasets; process data universally; forbid dataset-specific logic
- Detection; extract patterns via heuristics; forbid hardcoded rules
- Directories; abstract file system paths; forbid absolute paths
- Domains; operate across sectors; forbid sector-specific assumptions
- Duplication; eliminate redundant code; forbid copy-paste logic
- Embedded Logic; externalize business rules; forbid embedded rules
- Entities; process schema-defined types; forbid type hardcoding
- Fixtures; validate across domains; forbid single-domain tests
- Flexibility; preserve adaptability; forbid rigid implementations
- Fragility; reduce brittleness; forbid embedded logic
- Generalization; abstract specific patterns; forbid dataset-specific logic
- Heuristics; detect via metadata; forbid hardcoded patterns
- Identifiers; drive via configuration; forbid project name hardcoding
- Interfaces; define clear contracts; forbid implicit behavior
- Metadata; orchestrate via annotations; forbid annotation-free processing
- Modules; maintain single responsibility; forbid multi-concern modules
- Neutrality; preserve domain independence; forbid domain coupling
- Orchestration; coordinate via metadata; forbid direct dependencies
- Parameters; configure externally; forbid inline values
- Patterns; match against schemas; forbid entity hardcoding
- Paths; abstract file locations; forbid embedded directories
- Portability; enable cross-environment deployment; forbid environment assumptions
- Projects; operate project-agnostically; forbid project-specific code
- Provenance; track metadata origins; forbid metadata loss
- Relationships; build via configurable metrics; forbid hardcoded similarity
- Reliability; strengthen with validation; forbid untested code
- Responsibility; isolate component concerns; forbid mixed responsibilities
- Reusability; maximize component utility; forbid single-use implementations
- Schemas; define entity structures; forbid implicit types
- Semantics; preserve meaning through processing; forbid semantic drift
- Separation; divide concerns clearly; forbid mixed logic
- Sharing; reuse types and utilities; forbid duplication
- Thresholds; configure via metadata; forbid hardcoded cutoffs
- Tokens; handle generically; forbid dataset-specific lexing
- Traceability; secure audit trails; forbid provenance loss
- Transport; normalize access patterns; forbid protocol hardcoding
- Types; share definitions; forbid type proliferation
- Universality; preserve cross-domain applicability; forbid narrow implementations
- Validation; test across domains; forbid single-context validation
- Versatility; adapt across datasets; forbid data assumptions

---

## Context—Intent—Directive Table

Each row is a universal, neutral, project-agnostic one-liner mantra: `Context | Intent | Directive`

| Context        | Intent                              | Directive                                                                                      |
|----------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Adaptation     | Enable customization                | - [ ] Configure via metadata; enable customization; forbid hardcoded behavior                 |
| Algorithms     | Apply general-purpose logic         | - [ ] Process inputs generically; apply general-purpose logic; forbid dataset dependencies    |
| Applicability  | Maximize domain reach               | - [ ] Design domain-agnostically; maximize applicability; forbid domain assumptions           |
| Assertions     | Enforce correctness                 | - [ ] Validate with assertions; enforce correctness; forbid untested assumptions              |
| Assumptions    | Avoid hardcoded constraints         | - [ ] Externalize constraints; avoid hardcoded assumptions; forbid embedded logic             |
| Boundaries     | Maintain module isolation           | - [ ] Define clear interfaces; maintain isolation; forbid cross-module coupling               |
| Clarity        | Preserve implementation precision   | - [ ] Use SVO structure; preserve clarity; forbid ambiguous interfaces                        |
| Components     | Build reusable units                | - [ ] Design for reuse; build reusable components; forbid project-specific code              |
| Configuration  | Externalize parameters              | - [ ] Drive via configuration; externalize parameters; forbid embedded settings               |
| Contexts       | Adapt across environments           | - [ ] Remain context-aware; adapt across contexts; forbid environment hardcoding              |
| Coupling       | Reduce interdependencies            | - [ ] Isolate concerns; reduce coupling; forbid tangled modules                               |
| Customization  | Support runtime adaptation          | - [ ] Enable configuration; support customization; forbid compile-time restrictions           |
| Datasets       | Process data universally            | - [ ] Stay dataset-agnostic; process universally; forbid dataset-specific logic               |
| Detection      | Extract patterns via heuristics     | - [ ] Configure heuristics; extract patterns; forbid hardcoded rules                          |
| Directories    | Abstract file system paths          | - [ ] Use path configuration; abstract directories; forbid absolute paths                     |
| Domains        | Operate across sectors              | - [ ] Design domain-agnostically; operate universally; forbid sector-specific assumptions     |
| Duplication    | Eliminate redundant code            | - [ ] Share utilities; eliminate duplication; forbid copy-paste logic                         |
| Embedded Logic | Externalize business rules          | - [ ] Move to configuration; externalize logic; forbid embedded rules                         |
| Entities       | Process schema-defined types        | - [ ] Use schema definitions; process entities; forbid type hardcoding                        |
| Fixtures       | Validate across domains             | - [ ] Test with fixtures; validate neutrality; forbid single-domain tests                     |
| Flexibility    | Preserve adaptability               | - [ ] Avoid hardcoding; preserve flexibility; forbid rigid implementations                    |
| Fragility      | Reduce brittleness                  | - [ ] Externalize dependencies; reduce fragility; forbid embedded logic                       |
| Generalization | Abstract specific patterns          | - [ ] Generalize algorithms; abstract patterns; forbid dataset-specific logic                 |
| Heuristics     | Detect via metadata                 | - [ ] Configure externally; detect via metadata; forbid hardcoded patterns                    |
| Identifiers    | Drive via configuration             | - [ ] Use config-driven IDs; drive via configuration; forbid project name hardcoding          |
| Interfaces     | Define clear contracts              | - [ ] Use SVO semantics; define contracts; forbid implicit behavior                           |
| Metadata       | Orchestrate via annotations         | - [ ] Drive with metadata; orchestrate behavior; forbid annotation-free processing            |
| Modules        | Maintain single responsibility      | - [ ] Scope to features; maintain single responsibility; forbid multi-concern modules         |
| Neutrality     | Preserve domain independence        | - [ ] Design neutrally; preserve independence; forbid domain coupling                         |
| Orchestration  | Coordinate via metadata             | - [ ] Use metadata layer; coordinate components; forbid direct dependencies                   |
| Parameters     | Configure externally                | - [ ] Externalize settings; configure parameters; forbid inline values                        |
| Patterns       | Match against schemas               | - [ ] Use schema definitions; match patterns; forbid entity hardcoding                        |
| Paths          | Abstract file locations             | - [ ] Configure paths; abstract locations; forbid embedded directories                        |
| Portability    | Enable cross-environment deployment | - [ ] Design portably; enable deployment; forbid environment assumptions                      |
| Projects       | Operate project-agnostically        | - [ ] Remain project-neutral; operate universally; forbid project-specific code               |
| Provenance     | Track metadata origins              | - [ ] Maintain provenance; track origins; forbid metadata loss                                |
| Relationships  | Build via configurable metrics      | - [ ] Compute via config; build relationships; forbid hardcoded similarity                    |
| Reliability    | Strengthen with validation          | - [ ] Validate with fixtures; strengthen reliability; forbid untested code                    |
| Responsibility | Isolate component concerns          | - [ ] Apply SRP; isolate concerns; forbid mixed responsibilities                              |
| Reusability    | Maximize component utility          | - [ ] Design general-purpose; maximize reusability; forbid single-use implementations         |
| Schemas        | Define entity structures            | - [ ] Use schema definitions; define structures; forbid implicit types                        |
| Semantics      | Preserve meaning through processing | - [ ] Maintain schema awareness; preserve semantics; forbid semantic drift                    |
| Separation     | Divide concerns clearly             | - [ ] Apply SRP; separate concerns; forbid mixed logic                                        |
| Sharing        | Reuse types and utilities           | - [ ] Share definitions; reuse types; forbid duplication                                      |
| Thresholds     | Configure via metadata              | - [ ] Use metadata thresholds; configure scoring; forbid hardcoded cutoffs                    |
| Tokens         | Handle generically                  | - [ ] Use neutral handling; process tokens; forbid dataset-specific lexing                    |
| Traceability   | Secure audit trails                 | - [ ] Orchestrate with metadata; secure traceability; forbid provenance loss                  |
| Transport      | Normalize access patterns           | - [ ] Abstract transport layer; normalize patterns; forbid protocol hardcoding                |
| Types          | Share definitions                   | - [ ] Use shared types; prevent duplication; forbid type proliferation                        |
| Universality   | Preserve cross-domain applicability | - [ ] Design universally; preserve applicability; forbid narrow implementations               |
| Validation     | Test across domains                 | - [ ] Use 3+ fixtures; test across domains; forbid single-context validation                  |
| Versatility    | Adapt across datasets               | - [ ] Design dataset-agnostically; ensure versatility; forbid data assumptions                |

---

## Neutrality Standards

Design with context awareness to ensure adaptability, remain domain-agnostic to preserve universality, stay project-agnostic to maintain flexibility, keep dataset-agnostic to guarantee portability, orchestrate with metadata to secure traceability, forbid hardcoding patterns to avoid rigidity, adapt through configuration to enable customization, define single-responsibility modules to uphold clarity, validate with fixtures to strengthen reliability, and apply assertion testing to enforce correctness.

---

## Core Directives

### Core Mandate

**Developers write neutral, context-aware code**
- Code remains neutral across contexts
- Code adapts via metadata
- Code operates domain-agnostically
- Code functions project-agnostically
- Code processes dataset-agnostically

### Forbidden Patterns

**Developers avoid hardcoding violations**
- Developers eliminate project-specific hardcoding
- Developers remove embedded dataset assumptions
- Developers externalize configuration presets
- Developers abstract file paths
- Developers generalize dataset-specific logic

---

## Single-Responsibility Principle Directives

**Module designers implement focused modules**
- Designers scope modules to features
- Modules detect patterns via heuristics
- Modules respect schema awareness
- Modules maintain semantic awareness
- Modules track provenance

---

## Subject-Verb-Object Structure Directives

**Components process data via configuration**
- Pattern: Component verbs data via configuration

**Heuristics detect patterns from metadata**
- Pattern: Heuristic detects patterns from metadata

**Algorithms process inputs without dataset dependencies**
- Pattern: Algorithm processes inputs without dataset dependencies

**Rule**: Developers ensure all algorithms remain general-purpose; developers enable adaptation via configuration only.

---

## Specification Pattern Directives

### Example: PatternDetector

**From raw input to structured semantics**: PatternDetector → extracts features via configurable heuristics → matches patterns against schema definitions → assigns confidence scores using metadata thresholds → delivers typed entities for downstream stages.

**Developers implement PatternDetector neutrally**
- Developers configure heuristics externally
- Developers match against schema definitions
- Developers compute scores via metadata thresholds
- Developers avoid hardcoded pattern rules

### Example: RelationshipBuilder

**From isolated entities to connected graph**: RelationshipBuilder → computes similarity via embedding distance → filters candidates using provenance metadata → validates connections through schema constraints → outputs relationship triples with confidence metrics.

**Developers implement RelationshipBuilder neutrally**
- Developers compute similarity via configurable distance metrics
- Developers filter using metadata, not hardcoded rules
- Developers validate against schema constraints
- Developers avoid domain-specific relationship assumptions

---

## Implementation Notes Directives

**Developers apply neutrality principles in practice**

**Token Handling**
- Developers use neutral token modules to preserve runtime behavior with generic handling
- Developers avoid dataset-specific token logic
- Developers implement token sharing to avoid redundant lexing when switching modes or sharing data

**Transport Layer**
- Developers use transport-layer normalization for generic host/blob patterns
- Developers avoid dataset-specific or project-specific transport rules

**Type Systems**
- Developers use shared token types to prevent duplication
- Developers isolate concerns within single modules

**Testing Strategy**
- Developers use assertions with representative fixtures to validate behavior
- Developers avoid duplicated test logic
- Developers test across 3+ diverse domains to verify neutrality

---

## Anti-Pattern Guards

**Developers avoid prohibited neutrality violations**:

❌ Hardcoded project names in code → ✅ Configuration-driven project identifiers  
❌ Embedded dataset paths → ✅ Externalized path configuration  
❌ Domain-specific entity types in algorithms → ✅ Schema-driven entity processing  
❌ Dataset-specific heuristics → ✅ Metadata-parameterized detection  
❌ Duplicated module logic → ✅ Single-responsibility modules with shared utilities  

---

## Neutrality Validation Checklist

**Pre-Commit** (Required):
- [ ] Developers confirm zero hardcoded project/dataset names
- [ ] Developers verify algorithms accept configuration parameters
- [ ] Developers ensure modules maintain single responsibility
- [ ] Developers validate SVO structure in component interfaces
- [ ] Developers test with representative fixtures from 3+ domains

**Code Review** (Required):
- [ ] Reviewers audit for embedded assumptions
- [ ] Reviewers verify configuration-driven behavior
- [ ] Reviewers confirm schema/metadata usage
- [ ] Reviewers validate transport-layer abstraction
- [ ] Reviewers check shared type usage

---

## Role—Action—Outcome

**Role: Component Designer**  
→ Action: designs neutral components, defines SVO interfaces, establishes configuration schemas, ensures metadata-driven behavior, prevents hardcoding  
→ Outcome: produces reusable components enabling cross-domain deployment without code changes

**Role: Algorithm Engineer**  
→ Action: implements general-purpose algorithms, parameterizes via configuration, processes schema-defined entities, computes via metadata thresholds, avoids dataset dependencies  
→ Outcome: delivers adaptable algorithms operating across diverse contexts

**Role: Module Developer**  
→ Action: implements single-responsibility modules, uses neutral token handling, applies transport-layer abstraction, shares type definitions, isolates concerns  
→ Outcome: builds focused modules preventing duplication and coupling

**Role: Configuration Architect**  
→ Action: externalizes parameters, defines metadata schemas, establishes threshold configurations, documents adaptation mechanisms, enables runtime behavior modification  
→ Outcome: provides configuration layer enabling domain adaptation without code modification

**Role: Test Engineer**  
→ Action: creates representative fixtures, validates across domains, writes assertion-based tests, verifies neutrality, prevents regression to hardcoding  
→ Outcome: ensures neutrality through systematic validation across diverse contexts

**Role: Code Reviewer**  
→ Action: audits for hardcoding violations, verifies configuration usage, checks schema compliance, validates metadata-driven logic, enforces SRP boundaries  
→ Outcome: maintains codebase neutrality through systematic review and feedback

---

## Mantra Application

**"CID frames neutrality standards, SRP isolates component concerns, RAO aligns developer responsibilities, SVO clarifies component semantics"**

- **CID frames**: Establishes scope (codebase neutrality), purpose (domain-agnostic reusability), rules (no hardcoding + configuration-driven + metadata-based)
- **SRP isolates**: Ensures each module handles single concern (detection vs building vs validation), each component owns focused responsibility
- **RAO aligns**: Maps component designers, algorithm engineers, module developers, configuration architects, test engineers, code reviewers to their neutrality deliverables
- **SVO clarifies**: Expresses all operations (components process data, heuristics detect patterns, algorithms compute scores) with grammatical precision ensuring implementation clarity and preventing coupling

---

## Prompt_202601171900

### Prompt-01

```
adhere to universal, neutral, project‑agnostic guidelines,
generate `codebase-neutrality-guidelines-cid.md` ,
from Context -> Intent -> Directive, each column sort by A->Z:

# Context–Intent–Directive Table

Each row is a universal, neutral, project‑agnostic one‑liner mantra: `Context (focus domain) | Intent (desired principle) | Directive (explicit prohibition)`

```
| Context | Intent | Directive |
| Design      | Preserve semantic correctness   | - [ ] Enforce schema alignment; preserve semantic correctness; forbid drift |
| Performance | Optimize runtime efficiency     | - [ ] Apply memoization; cache results; forbid recalculation/rerendering |
| Validation  | Enforce quality gates           | - [ ] Run lint/typecheck pre‑commit; enforce quality; forbid unchecked merges |

```


## Slogan‑style, three‑beat mantra form (Context; Intent; Directive)
- Each line is a three‑beat `Context (focus domain); Intent (desired principle); Directive (explicit prohibition)` mantra


```
Classes; single responsibility; forbid multi‑concern;
Modules; scope to features; forbid cross‑cutting;
Schema; always align; forbid drift;
```
```

### 