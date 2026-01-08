# Documentation Guidelines: From Intent to Execution

## Context
- **Semantic orchestration docs**: capture responsibilities | no hardcoded domains | config-driven schemas | structural–semantic separation | cross-domain pipelines | provenance + confidence trace  
- **Team guidelines**: clarity over datasets | reproducibility via parameter logging | quality via metrics | maintainability through audit trails + schema evolution

## Intent
**Documentation standards**: layer flows + component specs | domain-agnostic schemas + CID annotations | provenance + confidence trace | metrics-based QA | anti-pattern safeguards | feedback loops + schema versioning

## Directives

### From Principles to Practice

**Documentation captures semantic orchestration architecture**
- Documenters explain component responsibilities without hardcoded examples
- Documenters provide configuration schemas with intent-directive annotations
- Documentation enables implementers to adapt pipeline to any domain
- Documentation maintains separation between structure and semantics

---

### Required Documentation Sections Directives

#### Architecture Overview

**Documenters define layer flow specifications**
- Documenters specify component names and single responsibilities
- Documenters document data structures flowing between layers
- Documenters avoid coupling to specific datasets or project names

**Layer Flow Pattern**: Detection -> Schema Inference -> Ingestion -> Parsing -> Orchestration -> Rendering -> Agentic RAG

#### Component Specifications

**Documenters provide intent-directive patterns for each module**
- Pattern: **From [input state] to [output state]**: Component -> actions -> outcome
- Documenters list subject-verb-object directives
- Documenters define input/output schemas
- Documenters specify configuration parameters with key-value semantics (Default, Min, Max, Interval, impact description)
- Documenters document algorithm patterns without domain assumptions

#### Configuration Reference

**Documenters document adaptive thresholds with impact explanations**
- Documenters specify tuning sensitivity ranges
- Documenters explain feedback loop triggers
- Documenters provide default values derived from statistical principles, not project-specific tuning
- Documenters enable reproducibility through parameter logging

#### Validation Guidelines

**Documenters provide structural validation checklists**
- Documenters check required fields, referential integrity
- Documenters explicitly state non-validated semantic aspects
- Documenters include zero-hardcoding audit questions
- Documenters document domain-agnostic validation patterns

---

### Component Documentation Template Directives

**Documenters structure component documentation using transformation statements**

**From [input state] to [output state]**: Component name -> detects/extracts/computes/merges/infers [specific actions using statistical or NLP methods] -> [transformation steps] -> delivers [output artifacts with provenance] for [downstream use case].

**Documenters list atomic operations as subject-verb-object directives**
- Documenters express operations (component verbs input_type, component computes metric_via_method, component validates constraint)
- Documenters avoid compound actions
- Documenters maintain single responsibility per directive

**Documenters define configuration schemas**
- Pattern: Parameter name -> From [low state] to [high state]: Component -> [action based on parameter] -> [controls aspect] -> [affects downstream quality dimension]. Default: value; Min: value; Max: value; Interval: step; [Impact description in 15 words].

**Documenters describe algorithm patterns**
- Documenters describe computation using universal operations (clustering, similarity computation, path finding)
- Documenters specify input features and output structures
- Documenters avoid referencing specific entity types or domains
- Documenters document complexity and scalability characteristics

---

### Provenance Documentation Standards Directives

#### Bidirectional Linking

**Documenters specify node-to-source tracking mechanisms**
- Documenters explain how nodes track source documents via metadata.documentPath
- Documenters specify line range preservation (lineStart, lineEnd)
- Documenters define structure_type annotation (Paragraph, List, CodeBlock, Section, Table)
- Documenters clarify parsers extract semantics while metadata preserves formatting context

#### Confidence Propagation

**Documenters document confidence score computation methods**
- Documenters explain threshold tuning mechanisms
- Documenters specify confidence decay for inferred relationships (transitive edges multiply parent confidences by 0.8)
- Documenters track confidence through multi-hop reasoning
- Methods include: syntactic path length, embedding coherence

#### Extraction Method Tracking

**Documenters label nodes and edges with extraction methods**
- Documenters tag with extraction_method (dependency_parsing, pattern_mining, user_curated)
- Documentation enables quality analysis by method
- Documentation supports selective re-extraction when algorithms improve

---

### Quality Metrics Documentation Directives

#### Extraction Metrics

**Metric definers define extraction quality measures**
- Definers specify precision (correct extractions / total extractions)
- Definers specify recall (correct extractions / gold standard)
- Definers specify entity coherence (1 - intra-cluster variance)
- Definers specify mention consistency (successful coreferences / total pronouns)
- Definers document computation methods
- Definers document feedback loop triggers

#### Unification Metrics

**Metric definers define unification quality measures**
- Definers specify merge precision, duplicate rate, conflict resolution rate, cross-document coverage
- Definers explain aggregation across corpus
- Definers specify quality thresholds for reprocessing triggers

#### Query Metrics

**Metric definers define query performance measures**
- Definers specify answer relevance, citation coverage, traversal efficiency, follow-up relevance
- Definers explain LLM-based evaluation where applicable
- Definers document A/B testing frameworks for threshold optimization

---

### Anti-Pattern Documentation Directives

#### Forbidden Patterns

**Documenters explicitly list violations**
- Violations include: hardcoded project names, domain-specific entity types in code, static thresholds without configuration, validation of property semantics in schema
- Documenters provide refactoring guidance
- Documenters include before/after examples showing abstract feature replacement

#### Testing Requirements

**Documenters document domain blindness tests**
- Test question: Can component process medical, legal, financial content without code changes?
- Documenters specify minimum corpus diversity for validation (3+ domains)
- Documenters require configuration-only adaptation demonstration

---

### Schema and API Documentation Directives

#### JSON-LD Contract

**Schema documenters specify field requirements**
- Documenters document required fields (@id, labels, source, target)
- Documenters specify optional fields (properties, chunk_text, embedding, geo, metadata)
- Documenters explain @context usage and vocabulary mapping
- Documenters provide structural validation rules without semantic constraints

#### Query Interface

**API documenters explain query processing logic**
- Documenters document intent classification mapping (FACTOID -> single-node lookup, CAUSALITY -> directed path search)
- Documenters specify traversal strategy selection logic
- Documenters explain adaptive depth adjustment algorithm
- Documenters provide query result structure with provenance

#### Export Formats

**Format documenters specify transformation mappings**
- Documenters document transformation from internal GraphData to JSON-LD, DuckDB, Neo4j Cypher, GraphML
- Documenters specify field mappings
- Documenters explain metadata preservation across formats
- Documenters provide format selection criteria based on downstream tools

---

### Maintenance Documentation Directives

#### Feedback Loop Monitoring

**Maintainers document monitoring procedures**
- Maintainers document metric collection intervals
- Maintainers specify parameter adjustment magnitudes
- Maintainers explain convergence detection
- Maintainers provide rollback procedures for degraded performance
- Maintainers log all tuning iterations for reproducibility

#### Schema Evolution

**Schema stewards document versioning strategies**
- Stewards apply semantic versioning for schemas
- Stewards embed metadata.schema_version in graphs
- Stewards specify backward compatibility requirements (optional field additions allowed, required field additions forbidden)
- Stewards provide migration scripts for breaking changes

#### Audit Trail Requirements

**Audit engineers document logging requirements**
- Engineers specify what to log (extraction parameters, confidence thresholds, entity merge decisions, conflict resolutions)
- Engineers specify retention periods
- Engineers explain privacy considerations for source document metadata
- Engineers enable reproducible pipeline execution from logs

---

## Role—Action—Outcome

**Role: Technical Writer**  
-> Action: captures architecture flows, documents component specifications using SVO directives, creates configuration schemas, provides algorithm patterns without domain coupling  
-> Outcome: produces domain-agnostic documentation enabling cross-domain pipeline adaptation

**Role: Component Documenter**  
-> Action: writes intent-directive patterns, lists atomic operations, defines input/output schemas, specifies configuration parameters with impact descriptions  
-> Outcome: delivers focused component documentation maintaining single responsibility clarity

**Role: Provenance Documenter**  
-> Action: specifies bidirectional linking mechanisms, documents confidence propagation methods, labels extraction methods, explains metadata preservation  
-> Outcome: enables traceability through comprehensive provenance documentation

**Role: Metrics Definer**  
-> Action: defines extraction/unification/query metrics, documents computation methods, specifies quality thresholds, explains feedback triggers  
-> Outcome: establishes measurable quality standards enabling systematic improvement

**Role: Anti-Pattern Guardian**  
-> Action: lists forbidden patterns, provides refactoring guidance, documents domain blindness tests, requires corpus diversity validation  
-> Outcome: prevents hardcoding violations and ensures configuration-driven adaptability

**Role: Schema Documenter**  
-> Action: specifies JSON-LD contracts, documents required/optional fields, explains validation rules, provides structural constraints  
-> Outcome: establishes clear data contracts enabling integration and validation

**Role: API Documenter**  
-> Action: explains query interfaces, documents intent classifications, specifies traversal strategies, provides result structures  
-> Outcome: enables effective system usage through comprehensive API documentation

**Role: Format Documenter**  
-> Action: documents export transformations, specifies field mappings, explains metadata preservation, provides format selection criteria  
-> Outcome: facilitates downstream integration through multi-format export documentation

**Role: Maintenance Documenter**  
-> Action: documents feedback loops, explains monitoring procedures, specifies rollback strategies, logs tuning iterations  
-> Outcome: enables reliable system operation and reproducible performance optimization

**Role: Schema Steward**  
-> Action: manages versioning, maintains backward compatibility, provides migration scripts, tracks schema evolution  
-> Outcome: ensures stable schema transitions without breaking integrations

**Role: Audit Engineer**  
-> Action: specifies logging requirements, defines retention policies, addresses privacy concerns, enables reproducibility  
-> Outcome: maintains comprehensive audit trails supporting compliance and debugging

---

## Mantra Application

**"CID frames documentation standards, SRP isolates component concerns, RAO aligns documenter responsibilities, SVO clarifies specification semantics"**

- **CID frames**: Establishes scope (semantic orchestration documentation), purpose (domain-agnostic clarity + traceability), rules (SVO directives + configuration schemas)
- **SRP isolates**: Ensures each component documentation handles single transformation, each section addresses focused concern
- **RAO aligns**: Maps technical writers, component documenters, metrics definers, schema stewards, audit engineers to their documentation deliverables
- **SVO clarifies**: Expresses all operations (documenters specify schemas, systems track provenance, metrics measure quality) with grammatical precision enabling accountability and implementation clarity