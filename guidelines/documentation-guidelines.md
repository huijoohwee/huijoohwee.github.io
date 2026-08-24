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

Owned by [Documentation Sections & Templates Module](./documentation-sections-templates.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Component Documentation Template

Owned by [Documentation Sections & Templates Module](./documentation-sections-templates.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Flow Patterns Documentation

Owned by [Documentation Sections & Templates Module](./documentation-sections-templates.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Provenance and Traceability

Owned by [Documentation Provenance & Quality Module](./documentation-provenance-quality.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Quality Metrics Documentation

Owned by [Documentation Provenance & Quality Module](./documentation-provenance-quality.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Schema and API Documentation

Owned by [Documentation Provenance & Quality Module](./documentation-provenance-quality.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Maintenance Documentation

Owned by [Documentation Provenance & Quality Module](./documentation-provenance-quality.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## CID Directive Matrix

Owned by [Documentation CID Matrix & Guards Module](./documentation-cid-matrix.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Anti-Pattern Guards

Owned by [Documentation CID Matrix & Guards Module](./documentation-cid-matrix.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

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
