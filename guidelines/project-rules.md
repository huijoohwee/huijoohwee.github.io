# Project Rules

## Context

- **Software projects**: design domain‑neutral systems to preserve adaptability, run rapid validation cycles to accelerate learning, architect coherently to maintain clarity, automate quality checks to enforce reliability, deliver accountably to guarantee ownership, and practice debt‑free development to sustain longevity;
- **Team**: act with agility and rigor to balance speed and discipline, separate concerns to uphold modularity, forbid hardcoding to avoid rigidity, eliminate duplicated logic to ensure efficiency, and apply sustainable rules to secure resilience.  

## Intent
**Project‑wide standards**: design domain‑agnostic systems to preserve adaptability, architect with configuration‑driven patterns to enable flexibility, run rapid learning cycles to accelerate discovery, apply Lean Startup with OKRs to align progress, enforce MCP and GraphRAG consistency to secure coherence, define code quality boundaries to uphold reliability, and sustain continuous validation loops to guarantee resilience.  

## Directives

### Core Principles

**Systems maintain domain neutrality through configuration-driven design**
- Code remains neutral, project-agnostic, dataset-agnostic, metadata-driven
- Systems eliminate hardcoded domain entities
- Systems adapt via configuration only

**Components enforce configuration-driven orchestration**
- Systems orchestrate through external config
- Components implement single-responsibility patterns
- Systems separate structure from semantics
- Systems track provenance bidirectionally

**Architects maintain single source of truth**
- Schema aligns semantics across system
- Centralized constants prevent duplication
- Reusable primitives enable composition
- Performance defaults guide optimization

---

### Development Methodology Directives

#### Lean Startup Cycle

**Teams execute Build-Measure-Learn iterations**
- Teams build MVPs validating hypotheses
- Teams collect metrics through instrumentation
- Teams validate hypotheses via statistical analysis
- Teams iterate based on threshold comparisons

**From hypothesis to production**: Team -> defines minimal feature set via user stories -> implements configuration-driven core -> deploys instrumented version with telemetry -> collects metrics through analytics pipeline -> validates hypotheses via statistical analysis -> pivots or perseveres based on thresholds.

#### MVP Standards

**Product managers define Minimum Viable Products**
- Managers identify smallest feature set validating core hypothesis
- Managers ensure MVP delivers user value
- Managers enable learning through instrumentation

**Teams satisfy MVP requirements**:
- [X] Teams implement single critical user journey
- [X] Teams configure behavior (no hardcoding)
- [X] Teams produce schema-compliant outputs
- [X] Teams enable provenance tracking
- [X] Teams activate metrics instrumentation

#### OKR Framework

**Leaders establish objectives with measurable key results**
- Leaders define strategic goals
- Leaders specify 3-5 measurable key results
- Leaders track quarterly progress
- Leaders conduct retrospective analysis

**Teams structure key results with quantifiable metrics**:
```yaml
metric: [quantifiable_measure]
baseline: [current_value]
target: [desired_value]
deadline: [timeframe]
measurement: [data_source]
threshold: 0.8
```

---

### Architecture Standards Directives

#### Model Context Protocol (MCP)

**From isolated tools to integrated ecosystem**: MCP -> standardizes interfaces via protocol spec -> enables context sharing through structured messaging -> orchestrates workflows using declarative pipelines -> maintains state with provenance.

**Developers implement MCP-compliant components**:
- [X] Tools expose MCP-compliant interfaces
- [X] Systems propagate context with metadata
- [X] Systems cascade errors with traceability
- [X] Components follow semantic versioning rules

#### Agentic GraphRAG Pattern

**From queries to knowledge synthesis**: AgenticGraphRAG -> decomposes query via intent parsing -> retrieves subgraphs using traversal algorithms -> reasons over connections through multi-hop inference -> synthesizes response with citation chains -> delivers grounded output with provenance links.

**Systems compose GraphRAG components**:
- Query decomposer parses intent into subqueries
- Graph traverser retrieves relevant subgraphs via embeddings
- Reasoning engine performs multi-hop inference with confidence decay
- Response synthesizer generates output with provenance

#### EDA to LLM Ops Pipeline

**Pipeline orchestrates feedback loop architecture**:
```
[Ingestion] → [EDA] → [Feature Engineering] → [Training]
     ↑                                            ↓
[Monitor] ← [Deploy] ← [Evaluate] ← [Validate]
```

**From exploration to production**: Pipeline -> ingests data via schema validators -> profiles statistics through EDA -> engineers features using transformation DAGs -> trains models with hyperparameter tuning -> validates against quality gates -> deploys versioned artifacts -> monitors real-time performance -> feeds insights back to EDA.

**Systems enforce quality gates**:
- Data drift: KL divergence < 0.15
- Model performance: F1 > baseline + 5%
- Latency: p99 < 500ms
- Schema compliance: 100%

---

### Code Organization Directives

#### Module Boundaries

**Developers respect module size constraints**
- Developers limit files to <600 lines
- Developers keep chunks <500kB post-minification

**Developers define module scope**
- Developers build feature-scoped utilities
- Developers implement single-responsibility classes
- Developers expose configuration-driven behavior

**Module Pattern Template**:

**From [input_state] to [output_state]**: Module -> [processes/transforms/aggregates] [data_type] via [method] -> delivers [artifacts] for [downstream_component].

#### Responsibility Flow (S-V-O)

**Developers document component responsibilities**
- Developers map one responsibility per table row
- Developers express responsibilities as Subject—Verb—Object statements

| Stage | Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs | Lines |
|-------|--------|--------------|-----------------|------------------------|--------------|-------------------|-------|
| [Name] | `path/module.ext` | `ClassName` | `method_name` | [subject verbs object] | `pkg1`, `pkg2` | [output] | N–M |

---

### Semantic Consistency Directives

**Developers maintain schema alignment across system boundaries**
- Developers synchronize with `/schema/AgenticRAG`
- Developers align API identifiers, catalogs, components
- Developers standardize file names, handlers, hooks
- Developers unify LocalStorage keys (`LS_KEY_*`)
- Developers coordinate settings, state fields, store selectors

**Developers centralize repeated copy**
- Developers extract repeated phrases to copy helpers (`COPY_*`)
- Developers maintain single source of truth
- Developers standardize error/empty states

---

### Performance & Quality Directives

**Developers optimize through standard techniques**
- Developers implement batching, caching, chunking
- Developers apply memoization, sharding, virtualization

**Systems measure quality through defined metrics**
- Systems track precision, recall, coverage
- Systems monitor processing_time, resource_utilization

**Systems trigger corrective actions based on thresholds**
- Pattern: [metric < threshold] -> [reprocess | review | retrain]

---

### Anti-Pattern Guards

**Developers avoid prohibited patterns**:

❌ Hardcoded domain assumptions, project-specific presets, dataset paths -> ✅ Configuration-driven parameters  
❌ Duplicate/stale/unreferenced code, memory leaks, race conditions, ingestion-affecting view toggles -> ✅ Single source of truth, proper cleanup, view-only UI switches over stable ingestion  
❌ Multiple responsibilities per component, unidirectional provenance -> ✅ SRP modules, bidirectional links  
❌ Files >600 lines, chunks >500kB, non-configurable thresholds -> ✅ Modular boundaries, externalized config  

---

### Validation Checklist Directives

**Teams execute pre-deployment validation**:
- [ ] Validators confirm zero hardcoded domain entities
- [ ] Product managers verify MVP criteria satisfied, OKRs defined
- [ ] Architects validate MCP interfaces implemented
- [ ] Engineers ensure provenance links bidirectional
- [ ] Engineers confirm feedback loops instrumented
- [ ] Developers verify lint + typecheck passed
- [ ] Validators confirm schema compliance

**Teams execute continuous post-deployment monitoring**:
- [ ] Managers monitor OKRs weekly
- [ ] Engineers review pipeline metrics daily
- [ ] Teams iterate via Lean Startup cycle

---

## Role—Action—Outcome

**Role: Product Manager**  
-> Action: defines MVP scope, establishes OKRs, validates hypotheses, prioritizes iterations  
-> Outcome: delivers learning-optimized product increments validating strategic hypotheses

**Role: System Architect**  
-> Action: designs MCP interfaces, structures GraphRAG pipelines, enforces domain neutrality, maintains schema alignment  
-> Outcome: establishes coherent architecture enabling composition and integration

**Role: Developer**  
-> Action: implements single-responsibility components, exposes configuration parameters, documents responsibilities via SVO, respects module boundaries  
-> Outcome: produces maintainable, testable code enabling rapid iteration

**Role: Data Engineer**  
-> Action: builds EDA-to-production pipelines, instruments feedback loops, enforces quality gates, monitors drift metrics  
-> Outcome: maintains reliable data flows enabling model performance

**Role: Quality Validator**  
-> Action: executes pre-deployment checklists, monitors post-deployment metrics, triggers corrective actions, audits schema compliance  
-> Outcome: ensures project quality standards and prevents technical debt

**Role: DevOps Engineer**  
-> Action: deploys versioned artifacts, monitors real-time performance, maintains telemetry infrastructure, enables rollback procedures  
-> Outcome: ensures system reliability and observability

---

## Mantra Application

**"CID frames project standards, SRP isolates component concerns, RAO aligns team responsibilities, SVO clarifies operational semantics"**

- **CID frames**: Establishes scope (project-wide standards), purpose (quality + agility), rules (domain neutrality + iterative methodology)
- **SRP isolates**: Ensures each module handles single transformation, each component owns focused responsibility
- **RAO aligns**: Maps product managers, architects, developers, data engineers, validators, DevOps to their deliverables
- **SVO clarifies**: Expresses all operations (teams build MVPs, systems track metrics, developers document responsibilities) with grammatical precision
