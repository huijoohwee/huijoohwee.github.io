---
title: "Project Rules Mantras Module"
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
parent: "Project Rules"
parent_version: "1.0.0"
---

# Project Rules Mantras Module

## Scope & Ownership

Owns the three-beat mantra form for project rules.

This module is loaded on demand from [Project Rules](./project-rules.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Three-Beat Mantra Form

Each line is a three-beat `Context; Intent; Directive` mantra:

- Accountability; guarantee ownership; forbid unassigned responsibilities
- Adaptability; preserve system flexibility; forbid hardcoded assumptions
- Agility; balance speed and discipline; forbid reckless shortcuts
- Alignment; synchronize team progress; forbid untracked goals
- Analytics; enable hypothesis validation; forbid uninstrumented deployments
- Anti-patterns; prevent quality violations; forbid known bad practices
- Architecture; maintain system coherence; forbid fragmented designs
- Artifacts; deploy versioned outputs; forbid unversioned releases
- Baseline; establish performance benchmarks; forbid unmeasured starts
- Batching; optimize request processing; forbid serial operations
- Boundaries; define code quality limits; forbid unbounded scope
- Build; create learning-optimized MVPs; forbid scope creep
- Caching; reduce redundant computation; forbid uncached repeated work
- Cascading; propagate errors with context; forbid context loss
- Chunks; constrain output sizes; forbid oversized bundles
- Citation; maintain response grounding; forbid unsupported claims
- Clarity; maintain system comprehensibility; forbid obscure designs
- Cleanup; prevent resource retention; forbid memory retention
- Coherence; enforce MCP and GraphRAG consistency; forbid protocol drift
- Composition; enable component reuse; forbid monolithic structures
- Components; enforce single responsibility; forbid multi-concern components
- Confidence; track reasoning certainty; forbid unscored inferences
- Configuration; drive behavior externally; forbid hardcoded behavior
- Consistency; secure semantic uniformity; forbid semantic drift
- Constants; centralize shared definitions; forbid magic values
- Context; enable sharing across components; forbid context loss
- Copy; centralize repeated text; forbid inline duplication
- Correctness; validate via quality gates; forbid unchecked outputs
- Coverage; measure retrieval completeness; forbid unmeasured retrieval
- Cycles; run rapid learning iterations; forbid slow feedback
- DAGs; structure transformation flows; forbid unordered pipelines
- Data; monitor distribution drift; forbid drift >0.15 KL divergence
- Deadlines; define temporal constraints; forbid open-ended commitments
- Debt; practice debt-free development; forbid technical debt accumulation
- Decay; apply confidence degradation; forbid static certainty
- Declarative; orchestrate via specifications; forbid imperative hardcoding
- Decomposition; parse intent into subqueries; forbid monolithic processing
- Dependencies; document component requirements; forbid undeclared coupling
- Deployment; execute controlled releases; forbid uncontrolled deployments
- Discovery; accelerate learning velocity; forbid slow validation
- Documentation; express via SVO structure; forbid unclear interfaces
- Domain; maintain neutrality; forbid domain assumptions
- Drift; prevent semantic divergence; forbid unchecked deviation
- Duplication; eliminate redundant logic; forbid copy-paste code
- EDA; profile statistical patterns; forbid unexamined data
- Efficiency; optimize resource usage; forbid wasteful patterns
- Embeddings; retrieve via semantic similarity; forbid keyword-only matching
- Entities; eliminate hardcoded types; forbid domain assumptions
- Errors; cascade with traceability; forbid context loss
- Evaluation; validate against benchmarks; forbid unvalidated models
- Exploration; feed insights to production; forbid isolated exploration
- Features; engineer via transformations; forbid manual feature creation
- Feedback; instrument monitoring loops; forbid unmonitored systems
- Files; constrain module size; forbid oversized modules
- Flexibility; enable configuration-driven design; forbid rigid implementations
- Gates; enforce quality thresholds; forbid unchecked releases
- GraphRAG; synthesize knowledge systematically; forbid isolated reasoning
- Grounding; deliver provenance-linked outputs; forbid unsourced claims
- Handlers; standardize component interfaces; forbid inconsistent patterns
- Hardcoding; forbid embedded assumptions; forbid domain/project/dataset assumptions
- Hooks; standardize lifecycle patterns; forbid custom lifecycles
- Hyperparameters; tune via systematic search; forbid manual parameter selection
- Hypotheses; validate via statistical analysis; forbid untested assumptions
- Identifiers; align naming conventions; forbid inconsistent naming
- Inference; perform multi-hop reasoning; forbid single-step logic
- Ingestion; validate via schema compliance; forbid unvalidated data
- Instrumentation; enable metrics collection; forbid unmeasured deployments
- Integration; standardize via MCP protocol; forbid proprietary protocols
- Interfaces; expose MCP-compliant contracts; forbid non-compliant APIs
- Iteration; execute learning cycles; forbid static implementations
- Journeys; implement critical user paths; forbid incomplete user flows
- Keys; unify storage identifiers; forbid magic strings
- KL; monitor divergence metrics; forbid excessive divergence
- Knowledge; synthesize from graph traversal; forbid isolated retrieval
- Latency; enforce performance limits; forbid slow responses
- Lean; apply Startup methodology; forbid waterfall approaches
- Learning; optimize for discovery velocity; forbid slow validation
- Lines; constrain file length; forbid oversized files
- Links; maintain bidirectional provenance; forbid unidirectional tracking
- Lint; validate code quality; forbid unchecked code
- Longevity; sustain system lifespan; forbid technical debt
- Loops; instrument continuous feedback; forbid open-loop systems
- MCP; standardize component interfaces; forbid proprietary protocols
- Measure; collect validation metrics; forbid unmeasured experiments
- Memory; prevent resource leaks; forbid memory retention
- Messaging; structure via protocol spec; forbid unstructured communication
- Metadata; drive orchestration; forbid implicit configuration
- Metrics; define quantifiable measures; forbid qualitative-only goals
- Minification; constrain post-processing size; forbid oversized bundles
- Models; enforce performance thresholds; forbid underperforming models
- Modularity; separate concerns systematically; forbid tangled responsibilities
- Monitoring; track real-time performance; forbid unobserved systems
- Multi-hop; enable connected reasoning; forbid isolated facts
- MVP; define minimal viable scope; forbid feature bloat
- Neutrality; preserve domain independence; forbid domain coupling
- Objectives; establish strategic goals; forbid vague aspirations
- Observability; maintain telemetry infrastructure; forbid blind systems
- OKRs; align via measurable results; forbid unmeasured objectives
- Optimization; apply standard techniques; forbid ad-hoc solutions
- Orchestration; configure via external specs; forbid embedded orchestration
- Ownership; deliver with accountability; forbid ambiguous responsibility
- Parsing; decompose via intent extraction; forbid unparsed requests
- Paths; eliminate hardcoded locations; forbid embedded file paths
- Performance; monitor via defined metrics; forbid unmeasured efficiency
- Perseverance; continue based on validation; forbid premature abandonment
- Pipelines; orchestrate via declarative specs; forbid imperative sequences
- Pivots; adapt based on metrics; forbid ignoring data
- Precision; measure retrieval accuracy; forbid unmeasured quality
- Presets; eliminate project-specific configs; forbid hardcoded configurations
- Primitives; provide reusable components; forbid single-use utilities
- Production; deploy from EDA pipeline; forbid isolated development
- Progress; track quarterly advancement; forbid untracked advancement
- Project; maintain agnostic design; forbid project-specific code
- Protocol; implement MCP specification; forbid custom protocols
- Provenance; track bidirectionally; forbid untracked origins
- Quality; enforce via validation gates; forbid unchecked releases
- Queries; decompose into subqueries; forbid monolithic processing
- Race; prevent concurrent conflicts; forbid unsafe concurrency
- Rapid; accelerate validation velocity; forbid slow feedback loops
- Recall; measure retrieval completeness; forbid unmeasured coverage
- Reliability; automate quality enforcement; forbid manual validation only
- Resilience; apply sustainable practices; forbid fragile patterns
- Resources; monitor utilization metrics; forbid unmeasured consumption
- Responsibilities; document via SVO format; forbid ambiguous assignments
- Retrospective; conduct periodic analysis; forbid unreflective progress
- Retrieval; use embedding-based traversal; forbid keyword-only search
- Rigor; balance with agility; forbid careless execution
- Rollback; enable version recovery; forbid irreversible deployments
- Schema; maintain system-wide alignment; forbid drift from authority
- Scope; define minimal feature sets; forbid feature creep
- Selectors; coordinate state access; forbid inconsistent patterns
- Semantics; separate from structure; forbid coupling
- Separation; uphold concern boundaries; forbid mixed responsibilities
- Sharding; enable data partitioning; forbid monolithic datasets
- Single; maintain focused responsibility; forbid multi-concern modules
- Source; establish single truth authority; forbid competing definitions
- Speed; balance with discipline; forbid quality-compromising haste
- SRP; isolate component concerns; forbid mixed responsibilities
- Stale; remove outdated code; forbid code accumulation
- State; maintain with provenance; forbid untracked mutations
- Statistical; validate via analysis; forbid gut-feel decisions
- Stories; define via user narratives; forbid developer-centric specs
- Structure; separate from semantics; forbid semantic coupling
- Subgraphs; retrieve via traversal; forbid isolated node retrieval
- SVO; clarify operational semantics; forbid ambiguous descriptions
- Synthesis; generate with provenance; forbid unsourced outputs
- Systems; design domain-neutral; forbid domain hardcoding
- Targets; define desired values; forbid unmeasured aspirations
- Teams; execute iterative cycles; forbid waterfall development
- Telemetry; maintain instrumentation; forbid uninstrumented systems
- Thresholds; define configurable limits; forbid hardcoded cutoffs
- Timeframes; specify delivery deadlines; forbid open-ended timelines
- Toggles; ensure view-only behavior; forbid ingestion-affecting toggles
- Traceability; cascade errors with context; forbid error context loss
- Tracking; monitor provenance origins; forbid untracked data flow
- Training; apply hyperparameter tuning; forbid manual parameter selection
- Transformation; structure via DAGs; forbid ad-hoc transformations
- Traversal; retrieve via graph algorithms; forbid linear scanning
- Truth; centralize authoritative definitions; forbid duplicate authorities
- TypeCheck; validate type correctness; forbid unchecked code
- UI; ensure view-only switches; forbid ingestion-affecting UI
- Unreferenced; remove unused code; forbid dead code retention
- User; deliver validated value; forbid valueless releases
- Validation; execute continuous loops; forbid one-time checks
- Value; enable learning through MVPs; forbid valueless features
- Versioning; apply semantic rules; forbid arbitrary version numbers
- Virtualization; optimize list rendering; forbid full-list loading
- Workflows; orchestrate declaratively; forbid imperative hardcoding

---
