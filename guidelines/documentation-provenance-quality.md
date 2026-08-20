---
title: "Documentation Provenance & Quality Module"
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

# Documentation Provenance & Quality Module

## Scope & Ownership

Owns where documented claims come from and how they stay true: provenance, quality metrics, schema and API documentation, and maintenance.

This module is loaded on demand from [Documentation Guidelines](./documentation-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
