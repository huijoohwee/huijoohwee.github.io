# Codebase Maintainability Guidelines

## Context
**Maintenance standards**: prevent semantic drift to preserve meaning, centralize copy management to ensure consistency, focus module boundaries to maintain clarity, optimize performance to enhance efficiency, eliminate memory leaks to sustain stability, avoid race conditions to guarantee reliability, remove stale code to improve maintainability, align with authoritative schemas to secure correctness, enforce a single source of truth to uphold integrity, constrain size to retain manageability, prevent anti‑patterns to safeguard quality, and reduce technical debt to extend longevity.  

## Intent
**Maintainability standards**: design with consistency‑first architecture to ensure coherence, align schemas to guarantee correctness, build with reusable primitives to maximize efficiency, enforce size limits to retain manageability, define single‑responsibility classes to preserve clarity, centralize copy helpers to secure uniformity, share LocalStorage keys to maintain integrity, identify anti‑patterns to prevent fragility, meet optimization requirements to enhance performance, apply validation gates to uphold quality, and preserve API backward compatibility to sustain longevity.  

## Directives

### Design Principles

**Architects establish consistency-first architectures**
- Architects align semantics with schemas
- Architects maintain single-source-of-truth
- Architects provide reusable primitives
- Architects optimize performance by default
- Architects enforce domain-agnostic patterns

**Developers enforce module boundaries**
- Developers limit files to <600 lines
- Developers scope utilities to features
- Developers implement single-responsibility classes
- Developers configure behavior without hardcoding
- Developers use semantic HTML to reduce DOM complexity
- Developers implement token sharing to avoid redundant lexing

---

### Semantic Consistency Standards Directives

#### Schema Alignment

**Developers maintain consistency with authoritative schemas**
- Developers synchronize with `/schema/AgenticRAG` jsonld schema
- Developers align API identifiers, catalogs, code identifiers, components, declarations
- Developers standardize file names, handlers, hooks, import paths, keyboard shortcuts
- Developers unify LocalStorage keys, naming conventions, render patterns
- Developers coordinate settings keys/registry, state fields, store selectors

#### Copy Centralization

**Developers centralize repeated content**
- Developers identify repeated UI phrases
- Developers create copy helper constants (`COPY_*`)
- Developers anchor LocalStorage keys to shared constants (`LS_KEY_*`)
- Developers establish single source of truth for wording (e.g., `getOrchestratorSectionListLabel`)
- Developers expand centralization to error/empty states, user-facing messages

---

### Module Organization Directives (SRP + SVO)

#### Pattern: OversizedFileRefactor

**From oversized file to scoped modules**: OversizedFileRefactor → detects files exceeding size limits via maintainability tooling → scopes responsibilities and utilities → splits content into multiple <600-line, single-responsibility files → consolidates shared content into canonical locations and updates automation.

**Developers apply OversizedFileRefactor pattern**
- Developers trigger scope utilities on files >600 lines (e.g., `docs/documents`)
- Developers extract responsibilities into single-responsibility modules or classes
- Developers traverse content to eliminate duplicates before consolidation
- Developers consolidate content into existing <600-line files when semantics align
- Developers create new <600-line files when no suitable target exists
- Developers update validation/automation (e.g., sanity checks, status tables, scripts) to reference the new files

#### Pattern: ComponentFactory

**From configuration to instances**: ComponentFactory → parses schema definitions via metadata validation → instantiates components using registered builders → injects dependencies through configuration mapping → delivers initialized instances for application runtime.

**Developers implement ComponentFactory pattern**
- Developers parse schema definitions via metadata validation
- Developers instantiate components using registered builders
- Developers inject dependencies through configuration
- Developers avoid hardcoded component initialization

#### Pattern: CacheManager

**From requests to optimized responses**: CacheManager → computes cache keys via content hashing → retrieves data using LRU eviction policy → validates freshness through TTL checking → serves cached results with performance metrics.

**Developers implement CacheManager pattern**
- Developers compute cache keys via content hashing
- Developers retrieve data using LRU eviction policy
- Developers validate freshness through TTL checking
- Developers track performance metrics

---

### Anti-Pattern Guards

**Developers avoid prohibited maintainability violations**:

❌ Competing/conflicting code, corrupted logic, deadlock → ✅ Clear ownership, validated logic, async patterns  
❌ Duplicate code, hardcoded values, stray strings → ✅ Shared utilities, configuration, centralized copy  
❌ Memory leaks, race conditions, redundant computation → ✅ Proper cleanup, synchronization, memoization  
❌ Stale code, unclear intent, unreferenced code → ✅ Regular pruning, documentation, dead code elimination  
❌ Project-specific presets, dataset assumptions, file path hardcoding → ✅ Configuration-driven, domain-agnostic, abstracted paths  

---

### Quality Requirements Directives

#### Performance

**Performance engineers enforce optimization standards**
- Engineers limit chunks to <500kB post-minification
- Engineers enable batching/sharding
- Engineers optimize memoization
- Engineers implement virtualization for lists
- Engineers reduce DOM complexity using semantic HTML and fewer wrappers
- Engineers avoid style recalc on mousemove/hover
 
#### Validation

**QA engineers execute quality gates**
- Engineers run lint + typecheck pre-commit
- Engineers verify key alignment post-refactor

#### Stability

**Maintainers preserve system stability**
- Maintainers preserve APIs
- Maintainers preserve behavior
- Maintainers preserve UI affordances

---

### Maintainability Validation Checklist

**Pre-Commit** (Required):
- [ ] Developers verify files <600 lines
- [ ] Developers confirm schema alignment
- [ ] Developers check copy centralization
- [ ] Developers validate single-responsibility per module
- [ ] Engineers run lint + typecheck
- [ ] Developers confirm no hardcoded values

**Code Review** (Required):
- [ ] Reviewers audit for duplicate code
- [ ] Reviewers verify semantic consistency with schema
- [ ] Reviewers check LocalStorage key constants
- [ ] Reviewers validate performance patterns
- [ ] Reviewers identify unreferenced code
- [ ] Reviewers confirm anti-pattern absence

**Post-Refactor** (Required):
- [ ] Maintainers verify key alignment
- [ ] Maintainers confirm API compatibility
- [ ] Maintainers validate behavior preservation
- [ ] Maintainers test UI affordances unchanged

---

## Role—Action—Outcome

**Role: Frontend Developer**  
→ Action: maintains schema alignment, centralizes copy, enforces module boundaries, implements performance patterns, eliminates duplicate code  
→ Outcome: produces consistent, maintainable frontend code enabling team velocity

**Role: Module Developer**  
→ Action: implements single-responsibility modules, configures behavior externally, respects size limits, follows SRP+SVO patterns, documents intent  
→ Outcome: delivers focused modules preventing bloat and coupling

**Role: Copy Manager**  
→ Action: identifies repeated phrases, creates copy constants, anchors LocalStorage keys, establishes single source of truth, standardizes messaging  
→ Outcome: eliminates copy duplication and ensures consistent user-facing language

**Role: Performance Engineer**  
→ Action: optimizes chunk sizes, enables batching/sharding, implements memoization, reduces DOM complexity, monitors runtime metrics  
→ Outcome: maintains application performance within defined thresholds

**Role: QA Engineer**  
→ Action: runs pre-commit validation, verifies post-refactor alignment, executes lint/typecheck, validates behavior preservation, tests stability  
→ Outcome: ensures quality gates prevent maintainability regressions

**Role: Code Reviewer**  
→ Action: audits for duplication, verifies schema consistency, checks anti-patterns, validates performance patterns, identifies tech debt  
→ Outcome: maintains code quality through systematic review and feedback

**Role: System Architect**  
→ Action: establishes consistency-first architecture, defines schema contracts, provides reusable primitives, enforces domain-agnostic patterns, optimizes by default  
→ Outcome: creates architectural foundation enabling long-term maintainability

**Role: Maintainer**  
→ Action: preserves APIs, validates behavior, protects UI affordances, manages backward compatibility, conducts refactoring safely  
→ Outcome: ensures system stability through controlled evolution

---

## Mantra Application

**"CID frames maintainability standards, SRP isolates module concerns, RAO aligns maintenance responsibilities, SVO clarifies operation semantics"**

- **CID frames**: Establishes scope (codebase maintainability), purpose (consistency + performance + stability), rules (schema alignment + size limits + copy centralization)
- **SRP isolates**: Ensures each module handles single concern, each class owns focused responsibility, each file stays under size limit
- **RAO aligns**: Maps frontend developers, module developers, copy managers, performance engineers, QA engineers, code reviewers, architects, maintainers to their maintenance deliverables
- **SVO clarifies**: Expresses all operations (developers centralize copy, engineers optimize performance, reviewers audit duplication) with grammatical precision enabling clear accountability and preventing maintainability decay
