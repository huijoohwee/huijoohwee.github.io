# Codebase Neutrality Guidelines

## Context
**Production codebases**: domain‑agnostic implementations | adaptable across datasets/projects/contexts | no hardcoded assumptions | general‑purpose algorithms | config‑driven components | single‑responsibility modules | metadata‑driven orchestration | avoid embedded logic

## Intent
**Neutrality standards**: context‑aware design | domain‑agnostic | project‑agnostic | dataset‑agnostic | metadata‑driven orchestration | forbid hardcoding patterns | config‑driven adaptation | single‑responsibility modules | fixture‑based validation | assertion testing

## Directives

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

### Single-Responsibility Principle Directives

**Module designers implement focused modules**
- Designers scope modules to features
- Modules detect patterns via heuristics
- Modules respect schema awareness
- Modules maintain semantic awareness
- Modules track provenance

---

### Subject-Verb-Object Structure Directives

**Components process data via configuration**
- Pattern: Component verbs data via configuration

**Heuristics detect patterns from metadata**
- Pattern: Heuristic detects patterns from metadata

**Algorithms process inputs without dataset dependencies**
- Pattern: Algorithm processes inputs without dataset dependencies

**Rule**: Developers ensure all algorithms remain general-purpose; developers enable adaptation via configuration only.

---

### Specification Pattern Directives

#### Example: PatternDetector

**From raw input to structured semantics**: PatternDetector → extracts features via configurable heuristics → matches patterns against schema definitions → assigns confidence scores using metadata thresholds → delivers typed entities for downstream stages.

**Developers implement PatternDetector neutrally**
- Developers configure heuristics externally
- Developers match against schema definitions
- Developers compute scores via metadata thresholds
- Developers avoid hardcoded pattern rules

#### Example: RelationshipBuilder

**From isolated entities to connected graph**: RelationshipBuilder → computes similarity via embedding distance → filters candidates using provenance metadata → validates connections through schema constraints → outputs relationship triples with confidence metrics.

**Developers implement RelationshipBuilder neutrally**
- Developers compute similarity via configurable distance metrics
- Developers filter using metadata, not hardcoded rules
- Developers validate against schema constraints
- Developers avoid domain-specific relationship assumptions

---

### Implementation Notes Directives

**Developers apply neutrality principles in practice**

**Token Handling**
- Developers use neutral token modules to preserve runtime behavior with generic handling
- Developers avoid dataset-specific token logic

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

### Anti-Pattern Guards

**Developers avoid prohibited neutrality violations**:

❌ Hardcoded project names in code → ✅ Configuration-driven project identifiers  
❌ Embedded dataset paths → ✅ Externalized path configuration  
❌ Domain-specific entity types in algorithms → ✅ Schema-driven entity processing  
❌ Dataset-specific heuristics → ✅ Metadata-parameterized detection  
❌ Duplicated module logic → ✅ Single-responsibility modules with shared utilities  

---

### Neutrality Validation Checklist

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