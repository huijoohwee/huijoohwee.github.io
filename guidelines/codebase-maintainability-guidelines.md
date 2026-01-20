# Codebase Maintainability Guidelines

## Overview

**Maintenance standards**: prevent semantic drift to preserve meaning, centralize copy management to ensure consistency, focus module boundaries to maintain clarity, optimize performance to enhance efficiency, eliminate memory leaks to sustain stability, avoid race conditions to guarantee reliability, remove stale code to improve maintainability, align with authoritative schemas to secure correctness, enforce a single source of truth to uphold integrity, constrain size to retain manageability, prevent anti-patterns to safeguard quality, and reduce technical debt to extend longevity.

**Maintainability standards**: design with consistency-first architecture to ensure coherence, align schemas to guarantee correctness, build with reusable primitives to maximize efficiency, enforce size limits to retain manageability, define single-responsibility classes to preserve clarity, centralize copy helpers to secure uniformity, share LocalStorage keys to maintain integrity, identify anti-patterns to prevent fragility, meet optimization requirements to enhance performance, apply validation gates to uphold quality, and preserve API backward compatibility to sustain longevity.

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

- Affordances; preserve UI interactions; forbid breaking changes
- Alignment; synchronize with schemas; forbid semantic drift
- Anti-patterns; prevent quality degradation; forbid known violations
- APIs; maintain backward compatibility; forbid breaking changes
- Architecture; establish consistency-first design; forbid ad-hoc patterns
- Batching; enable request grouping; forbid serial processing
- Behavior; preserve system functionality; forbid regression
- Boundaries; enforce module isolation; forbid cross-cutting concerns
- Cache; optimize data retrieval; forbid redundant fetches
- Centralization; establish single source of truth; forbid duplicate strings
- Chunks; constrain bundle sizes; forbid oversized bundles
- Classes; maintain single responsibility; forbid multi-concern classes
- Cleanup; prevent resource leaks; forbid resource retention
- Complexity; reduce DOM overhead; forbid excessive wrappers
- Components; instantiate via factories; forbid hardcoded initialization
- Computation; eliminate redundancy; forbid recalculation
- Configuration; drive behavior externally; forbid hardcoded values
- Consistency; maintain semantic coherence; forbid drift from schema
- Constants; anchor keys to shared definitions; forbid magic strings
- Copy; centralize UI text; forbid inline strings
- Correctness; align with authoritative schemas; forbid misalignment
- Deadlock; prevent execution blocking; forbid blocking operations
- Debt; reduce maintenance burden; forbid technical debt accumulation
- Declarations; standardize definitions; forbid inconsistent naming
- Dependencies; inject via configuration; forbid hardcoded coupling
- Documentation; clarify module intent; forbid undocumented code
- DOM; minimize rendering overhead; forbid deep nesting
- Duplication; eliminate repeated code; forbid copy-paste
- Efficiency; optimize performance; forbid performance bottlenecks
- Elimination; remove unreferenced code; forbid stale code retention
- Eviction; manage cache lifecycles; forbid unbounded caches
- Factories; build components systematically; forbid manual construction
- Files; constrain module size; forbid oversized modules
- Fragility; prevent system brittleness; forbid brittle implementations
- Freshness; validate cache validity; forbid stale data
- Gates; enforce quality checkpoints; forbid unchecked commits
- Handlers; standardize event processing; forbid inconsistent patterns
- Hardcoding; externalize configuration; forbid hardcoded constants
- Hashing; compute cache keys; forbid arbitrary identifiers
- Hooks; standardize lifecycle integration; forbid custom patterns
- Identifiers; align naming conventions; forbid inconsistent naming
- Imports; standardize path resolution; forbid relative path chaos
- Initialization; build via configuration; forbid manual setup
- Injection; provide dependencies externally; forbid internal coupling
- Integrity; maintain single source of truth; forbid competing definitions
- Intent; document module purpose; forbid unclear responsibilities
- Keys; share LocalStorage constants; forbid inline strings
- Leaks; prevent memory retention; forbid resource retention
- Lexing; share token processing; forbid duplicate parsers
- Limits; constrain resource usage; forbid unbounded growth
- Lint; validate code quality; forbid unchecked code
- Lists; optimize rendering performance; forbid full-list rendering
- Logic; validate correctness; forbid corrupted implementations
- Longevity; extend system lifespan; forbid debt accumulation
- LRU; apply eviction policies; forbid unbounded caches
- Manageability; retain system comprehensibility; forbid oversized modules
- Meaning; prevent semantic drift; forbid schema drift
- Memoization; cache computation results; forbid redundant computation
- Memory; prevent resource leaks; forbid memory retention
- Messaging; standardize user-facing text; forbid ad-hoc wording
- Metrics; track performance data; forbid unmonitored systems
- Modules; maintain focused responsibilities; forbid multi-concern modules
- Mousemove; avoid expensive handlers; forbid style recalc on mousemove
- Naming; unify conventions; forbid inconsistent patterns
- Optimization; enhance system efficiency; forbid performance neglect
- Ownership; establish clear responsibility; forbid competing code
- Parsing; validate schema definitions; forbid implicit parsing
- Patterns; follow established conventions; forbid project-specific code
- Performance; meet optimization requirements; forbid bottlenecks
- Phrases; identify repeated UI text; forbid inline repetition
- Primitives; provide reusable building blocks; forbid single-use utilities
- Pruning; remove stale code regularly; forbid code accumulation
- Quality; uphold code standards; forbid unchecked merges
- Race Conditions; guarantee execution safety; forbid race conditions
- Recalc; avoid style recomputation; forbid expensive hover handlers
- Redundancy; eliminate duplicate computation; forbid recalculation
- Refactoring; split oversized modules; forbid files >600 lines
- Registration; standardize settings storage; forbid inconsistent keys
- Reliability; guarantee system stability; forbid unsafe patterns
- Rendering; optimize UI performance; forbid full-list rendering
- Responsibilities; isolate module concerns; forbid mixed responsibilities
- Reusability; build with shared primitives; forbid single-use code
- Schema; align with authoritative definitions; forbid drift from authority
- Scope; focus module boundaries; forbid scope creep
- Selectors; coordinate state access; forbid inconsistent patterns
- Semantics; preserve meaningful structure; forbid div soup
- Sharding; enable data partitioning; forbid monolithic datasets
- Shortcuts; standardize keyboard bindings; forbid conflicting keys
- Size; constrain file dimensions; forbid oversized files
- Source; establish single truth authority; forbid duplicate definitions
- Splitting; decompose oversized modules; forbid oversized consolidation
- Stability; preserve system state; forbid breaking changes
- Staleness; remove outdated code; forbid code accumulation
- Standards; maintain consistency; forbid ad-hoc patterns
- State; coordinate field definitions; forbid inconsistent naming
- Storage; share key definitions; forbid magic strings
- Strings; centralize UI copy; forbid stray inline text
- Synchronization; coordinate concurrent access; forbid race conditions
- Testing; validate behavior preservation; forbid untested changes
- Thresholds; define performance limits; forbid unbounded resource usage
- Tokens; share lexing infrastructure; forbid redundant lexing
- Truth; maintain single authority; forbid competing definitions
- TTL; validate cache freshness; forbid expired data usage
- Typecheck; validate type correctness; forbid unchecked code
- Uniformity; secure consistent patterns; forbid inconsistent wording
- Unreferenced; eliminate dead code; forbid unused retention
- Utilities; scope to features; forbid cross-cutting concerns
- Validation; execute quality gates; forbid unchecked merges
- Velocity; enable team productivity; forbid maintainability blockers
- Virtualization; optimize list rendering; forbid full rendering
- Wording; establish authoritative copy; forbid duplicate phrases
- Wrappers; minimize DOM nesting; forbid excessive nesting

---

## Context—Intent—Directive Table

Each row is a universal, neutral, project-agnostic one-liner mantra: `Context | Intent | Directive`

| Context             | Intent                              | Directive                                                                                      |
|---------------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Affordances         | Preserve UI interactions            | - [ ] Protect user affordances; preserve interactions; forbid breaking changes                |
| Alignment           | Synchronize with schemas            | - [ ] Maintain schema alignment; synchronize definitions; forbid semantic drift               |
| Anti-patterns       | Prevent quality degradation         | - [ ] Identify anti-patterns; prevent degradation; forbid known violations                    |
| APIs                | Maintain backward compatibility     | - [ ] Preserve API contracts; maintain compatibility; forbid breaking changes                 |
| Architecture        | Establish consistency-first design  | - [ ] Design consistency-first; establish foundations; forbid ad-hoc patterns                 |
| Batching            | Enable request grouping             | - [ ] Implement batching; enable grouping; forbid serial processing                           |
| Behavior            | Preserve system functionality       | - [ ] Maintain behavior; preserve functionality; forbid regression                            |
| Boundaries          | Enforce module isolation            | - [ ] Define clear boundaries; enforce isolation; forbid cross-cutting concerns              |
| Cache               | Optimize data retrieval             | - [ ] Implement caching; optimize retrieval; forbid redundant fetches                         |
| Centralization      | Establish single source of truth    | - [ ] Centralize copy; establish single source; forbid duplicate strings                      |
| Chunks              | Constrain bundle sizes              | - [ ] Limit chunks to <500kB; constrain sizes; forbid oversized bundles                       |
| Classes             | Maintain single responsibility      | - [ ] Scope classes; maintain single responsibility; forbid multi-concern classes             |
| Cleanup             | Prevent resource leaks              | - [ ] Implement cleanup; prevent leaks; forbid resource retention                             |
| Complexity          | Reduce DOM overhead                 | - [ ] Use semantic HTML; reduce complexity; forbid excessive wrappers                         |
| Components          | Instantiate via factories           | - [ ] Use factory patterns; instantiate components; forbid hardcoded initialization           |
| Computation         | Eliminate redundancy                | - [ ] Memoize results; eliminate redundancy; forbid recalculation                             |
| Configuration       | Drive behavior externally           | - [ ] Configure externally; drive behavior; forbid hardcoded values                           |
| Consistency         | Maintain semantic coherence         | - [ ] Align semantics; maintain consistency; forbid drift from schema                         |
| Constants           | Anchor keys to shared definitions   | - [ ] Use shared constants; anchor keys; forbid magic strings                                 |
| Copy                | Centralize UI text                  | - [ ] Create copy helpers; centralize text; forbid inline strings                             |
| Correctness         | Align with authoritative schemas    | - [ ] Synchronize with schemas; ensure correctness; forbid misalignment                       |
| Deadlock            | Prevent execution blocking          | - [ ] Use async patterns; prevent deadlock; forbid blocking operations                        |
| Debt                | Reduce maintenance burden           | - [ ] Refactor regularly; reduce debt; forbid technical debt accumulation                     |
| Declarations        | Standardize definitions             | - [ ] Align declarations; standardize definitions; forbid inconsistent naming                 |
| Dependencies        | Inject via configuration            | - [ ] Inject dependencies; configure externally; forbid hardcoded coupling                    |
| Documentation       | Clarify module intent               | - [ ] Document intent; clarify purpose; forbid undocumented code                              |
| DOM                 | Minimize rendering overhead         | - [ ] Use semantic HTML; minimize overhead; forbid deep nesting                               |
| Duplication         | Eliminate repeated code             | - [ ] Extract shared utilities; eliminate duplication; forbid copy-paste                      |
| Efficiency          | Optimize performance                | - [ ] Enable optimization; maximize efficiency; forbid performance bottlenecks                |
| Elimination         | Remove unreferenced code            | - [ ] Prune dead code; remove unreferenced; forbid stale code retention                       |
| Eviction            | Manage cache lifecycles             | - [ ] Use LRU eviction; manage lifecycles; forbid unbounded caches                            |
| Factories           | Build components systematically     | - [ ] Use factory patterns; build systematically; forbid manual construction                  |
| Files               | Constrain module size               | - [ ] Limit files to <600 lines; constrain size; forbid oversized modules                     |
| Fragility           | Prevent system brittleness          | - [ ] Validate robustly; prevent fragility; forbid brittle implementations                    |
| Freshness           | Validate cache validity             | - [ ] Check TTL; validate freshness; forbid stale data                                        |
| Gates               | Enforce quality checkpoints         | - [ ] Run validation gates; enforce quality; forbid unchecked commits                         |
| Handlers            | Standardize event processing        | - [ ] Align handler names; standardize processing; forbid inconsistent patterns               |
| Hardcoding          | Externalize configuration           | - [ ] Use configuration; externalize values; forbid hardcoded constants                       |
| Hashing             | Compute cache keys                  | - [ ] Hash content; compute keys; forbid arbitrary identifiers                                |
| Hooks               | Standardize lifecycle integration   | - [ ] Align hook names; standardize integration; forbid custom patterns                       |
| Identifiers         | Align naming conventions            | - [ ] Standardize identifiers; align conventions; forbid inconsistent naming                  |
| Imports             | Standardize path resolution         | - [ ] Align import paths; standardize resolution; forbid relative path chaos                  |
| Initialization      | Build via configuration             | - [ ] Initialize via config; build systematically; forbid manual setup                        |
| Injection           | Provide dependencies externally     | - [ ] Inject dependencies; provide externally; forbid internal coupling                       |
| Integrity           | Maintain single source of truth     | - [ ] Enforce single source; maintain integrity; forbid competing definitions                 |
| Intent              | Document module purpose             | - [ ] Clarify intent; document purpose; forbid unclear responsibilities                       |
| Keys                | Share LocalStorage constants        | - [ ] Use shared constants; anchor keys; forbid inline strings                                |
| Leaks               | Prevent memory retention            | - [ ] Implement cleanup; prevent leaks; forbid resource retention                             |
| Lexing              | Share token processing              | - [ ] Implement token sharing; avoid redundant lexing; forbid duplicate parsers               |
| Limits              | Constrain resource usage            | - [ ] Enforce size limits; constrain usage; forbid unbounded growth                           |
| Lint                | Validate code quality               | - [ ] Run lint pre-commit; validate quality; forbid unchecked code                            |
| Lists               | Optimize rendering performance      | - [ ] Implement virtualization; optimize rendering; forbid full-list rendering                |
| Logic               | Validate correctness                | - [ ] Validate logic; ensure correctness; forbid corrupted implementations                    |
| Longevity           | Extend system lifespan              | - [ ] Reduce technical debt; extend longevity; forbid debt accumulation                       |
| LRU                 | Apply eviction policies             | - [ ] Use LRU policies; apply eviction; forbid unbounded caches                               |
| Manageability       | Retain system comprehensibility     | - [ ] Constrain size; retain manageability; forbid oversized modules                          |
| Meaning             | Prevent semantic drift              | - [ ] Preserve semantics; maintain meaning; forbid schema drift                               |
| Memoization         | Cache computation results           | - [ ] Implement memoization; cache results; forbid redundant computation                      |
| Memory              | Prevent resource leaks              | - [ ] Clean up resources; prevent leaks; forbid memory retention                              |
| Messaging           | Standardize user-facing text        | - [ ] Centralize messages; standardize text; forbid ad-hoc wording                            |
| Metrics             | Track performance data              | - [ ] Monitor metrics; track performance; forbid unmonitored systems                          |
| Modules             | Maintain focused responsibilities   | - [ ] Scope to features; maintain focus; forbid multi-concern modules                         |
| Mousemove           | Avoid expensive handlers            | - [ ] Debounce handlers; avoid recalc; forbid style recalc on mousemove                       |
| Naming              | Unify conventions                   | - [ ] Standardize naming; unify conventions; forbid inconsistent patterns                     |
| Optimization        | Enhance system efficiency           | - [ ] Optimize by default; enhance efficiency; forbid performance neglect                     |
| Ownership           | Establish clear responsibility      | - [ ] Define ownership; establish responsibility; forbid competing code                       |
| Parsing             | Validate schema definitions         | - [ ] Parse via metadata; validate schemas; forbid implicit parsing                           |
| Patterns            | Follow established conventions      | - [ ] Apply domain-agnostic patterns; follow conventions; forbid project-specific code        |
| Performance         | Meet optimization requirements      | - [ ] Enforce performance standards; meet requirements; forbid bottlenecks                    |
| Phrases             | Identify repeated UI text           | - [ ] Extract copy constants; identify phrases; forbid inline repetition                      |
| Primitives          | Provide reusable building blocks    | - [ ] Build reusable primitives; provide blocks; forbid single-use utilities                  |
| Pruning             | Remove stale code regularly         | - [ ] Prune regularly; remove stale code; forbid code accumulation                            |
| Quality             | Uphold code standards               | - [ ] Apply validation gates; uphold quality; forbid unchecked merges                         |
| Race Conditions     | Guarantee execution safety          | - [ ] Synchronize access; guarantee safety; forbid race conditions                            |
| Recalc              | Avoid style recomputation           | - [ ] Debounce handlers; avoid recalc; forbid expensive hover handlers                        |
| Redundancy          | Eliminate duplicate computation     | - [ ] Memoize results; eliminate redundancy; forbid recalculation                             |
| Refactoring         | Split oversized modules             | - [ ] Extract responsibilities; split modules; forbid files >600 lines                        |
| Registration        | Standardize settings storage        | - [ ] Align settings registry; standardize storage; forbid inconsistent keys                  |
| Reliability         | Guarantee system stability          | - [ ] Avoid race conditions; guarantee reliability; forbid unsafe patterns                    |
| Rendering           | Optimize UI performance             | - [ ] Implement virtualization; optimize rendering; forbid full-list rendering                |
| Responsibilities    | Isolate module concerns             | - [ ] Scope responsibilities; isolate concerns; forbid mixed responsibilities                 |
| Reusability         | Build with shared primitives        | - [ ] Maximize reusability; build with primitives; forbid single-use code                     |
| Schema              | Align with authoritative definitions| - [ ] Synchronize with schema; align definitions; forbid drift from authority                 |
| Scope               | Focus module boundaries             | - [ ] Maintain clear scope; focus boundaries; forbid scope creep                              |
| Selectors           | Coordinate state access             | - [ ] Standardize selectors; coordinate access; forbid inconsistent patterns                  |
| Semantics           | Preserve meaningful structure       | - [ ] Use semantic HTML; preserve structure; forbid div soup                                  |
| Sharding            | Enable data partitioning            | - [ ] Implement sharding; enable partitioning; forbid monolithic datasets                     |
| Shortcuts           | Standardize keyboard bindings       | - [ ] Align keyboard shortcuts; standardize bindings; forbid conflicting keys                 |
| Size                | Constrain file dimensions           | - [ ] Limit to <600 lines; constrain size; forbid oversized files                             |
| Source              | Establish single truth authority    | - [ ] Enforce single source; establish authority; forbid duplicate definitions                |
| Splitting           | Decompose oversized modules         | - [ ] Split into <600-line files; decompose modules; forbid oversized consolidation          |
| Stability           | Preserve system state               | - [ ] Maintain stability; preserve state; forbid breaking changes                             |
| Staleness           | Remove outdated code                | - [ ] Eliminate stale code; remove outdated; forbid code accumulation                         |
| Standards           | Maintain consistency                | - [ ] Apply consistency standards; maintain uniformity; forbid ad-hoc patterns                |
| State               | Coordinate field definitions        | - [ ] Standardize state fields; coordinate definitions; forbid inconsistent naming            |
| Storage             | Share key definitions               | - [ ] Use shared LocalStorage keys; anchor to constants; forbid magic strings                 |
| Strings             | Centralize UI copy                  | - [ ] Extract to copy helpers; centralize strings; forbid stray inline text                   |
| Synchronization     | Coordinate concurrent access        | - [ ] Synchronize properly; coordinate access; forbid race conditions                         |
| Testing             | Validate behavior preservation      | - [ ] Test post-refactor; validate preservation; forbid untested changes                      |
| Thresholds          | Define performance limits           | - [ ] Enforce thresholds; define limits; forbid unbounded resource usage                      |
| Tokens              | Share lexing infrastructure         | - [ ] Implement token sharing; share infrastructure; forbid redundant lexing                  |
| Truth               | Maintain single authority           | - [ ] Enforce single source; maintain authority; forbid competing definitions                 |
| TTL                 | Validate cache freshness            | - [ ] Check TTL; validate freshness; forbid expired data usage                                |
| Typecheck           | Validate type correctness           | - [ ] Run typecheck pre-commit; validate types; forbid unchecked code                         |
| Uniformity          | Secure consistent patterns          | - [ ] Centralize copy helpers; secure uniformity; forbid inconsistent wording                 |
| Unreferenced        | Eliminate dead code                 | - [ ] Identify unreferenced code; eliminate dead code; forbid unused retention                |
| Utilities           | Scope to features                   | - [ ] Scope utilities; focus on features; forbid cross-cutting concerns                       |
| Validation          | Execute quality gates               | - [ ] Run validation pre-commit; execute gates; forbid unchecked merges                       |
| Velocity            | Enable team productivity            | - [ ] Maintain consistency; enable velocity; forbid maintainability blockers                  |
| Virtualization      | Optimize list rendering             | - [ ] Implement virtualization; optimize lists; forbid full rendering                         |
| Wording             | Establish authoritative copy        | - [ ] Create single source; establish wording; forbid duplicate phrases                       |
| Wrappers            | Minimize DOM nesting                | - [ ] Use semantic HTML; minimize wrappers; forbid excessive nesting                          |

---

## Core Directives

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
- Developers invalidate token cache only when source content changes

---

## Semantic Consistency Standards Directives

### Schema Alignment

**Developers maintain consistency with authoritative schemas**
- Developers synchronize with `/schema/AgenticRAG` jsonld schema
- Developers align API identifiers, catalogs, code identifiers, components, declarations
- Developers standardize file names, handlers, hooks, import paths, keyboard shortcuts
- Developers unify LocalStorage keys, naming conventions, render patterns
- Developers coordinate settings keys/registry, state fields, store selectors

### Copy Centralization

**Developers centralize repeated content**
- Developers identify repeated UI phrases
- Developers create copy helper constants (`COPY_*`)
- Developers anchor LocalStorage keys to shared constants (`LS_KEY_*`)
- Developers establish single source of truth for wording (e.g., `getOrchestratorSectionListLabel`)
- Developers expand centralization to error/empty states, user-facing messages

---

## Module Organization Directives (SRP + SVO)

### Pattern: OversizedFileRefactor

**From oversized file to scoped modules**: OversizedFileRefactor → detects files exceeding size limits via maintainability tooling → scopes responsibilities and utilities → splits content into multiple <600-line, single-responsibility files → consolidates shared content into canonical locations and updates automation.

**Developers apply OversizedFileRefactor pattern**
- Developers trigger scope utilities on files >600 lines (e.g., `docs/documents`)
- Developers extract responsibilities into single-responsibility modules or classes
- Developers traverse content to eliminate duplicates before consolidation
- Developers consolidate content into existing <600-line files when semantics align
- Developers create new <600-line files when no suitable target exists
- Developers update validation/automation (e.g., sanity checks, status tables, scripts) to reference the new files

### Pattern: ComponentFactory

**From configuration to instances**: ComponentFactory → parses schema definitions via metadata validation → instantiates components using registered builders → injects dependencies through configuration mapping → delivers initialized instances for application runtime.

**Developers implement ComponentFactory pattern**
- Developers parse schema definitions via metadata validation
- Developers instantiate components using registered builders
- Developers inject dependencies through configuration
- Developers avoid hardcoded component initialization

### Pattern: CacheManager

**From requests to optimized responses**: CacheManager → computes cache keys via content hashing → retrieves data using LRU eviction policy → validates freshness through TTL checking → serves cached results with performance metrics.

**Developers implement CacheManager pattern**
- Developers compute cache keys via content hashing
- Developers retrieve data using LRU eviction policy
- Developers validate freshness through TTL checking
- Developers track performance metrics

---

## Anti-Pattern Guards

**Developers avoid prohibited maintainability violations**:

❌ Competing/conflicting code, corrupted logic, deadlock → ✅ Clear ownership, validated logic, async patterns  
❌ Duplicate code, hardcoded values, stray strings → ✅ Shared utilities, configuration, centralized copy  
❌ Memory leaks, race conditions, redundant computation → ✅ Proper cleanup, synchronization, memoization  
❌ Stale code, unclear intent, unreferenced code → ✅ Regular pruning, documentation, dead code elimination  
❌ Project-specific presets, dataset assumptions, file path hardcoding → ✅ Configuration-driven, domain-agnostic, abstracted paths  

---

## Quality Requirements Directives

### Performance

**Performance engineers enforce optimization standards**
- Engineers limit chunks to <500kB post-minification
- Engineers enable batching/sharding
- Engineers optimize memoization
- Engineers implement virtualization for lists
- Engineers reduce DOM complexity using semantic HTML and fewer wrappers
- Engineers avoid style recalc on mousemove/hover
 
### Validation

**QA engineers execute quality gates**
- Engineers run lint + typecheck pre-commit
- Engineers verify key alignment post-refactor

### Stability

**Maintainers preserve system stability**
- Maintainers preserve APIs
- Maintainers preserve behavior
- Maintainers preserve UI affordances

---

## Maintainability Validation Checklist

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