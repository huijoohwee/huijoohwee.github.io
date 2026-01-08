# Semantic Guidelines

## Context

**Semantic processing**: modular architectures | extract meaning from unstructured content | resolve entity ambiguities | contextual analysis | infer relationships via pattern matching | domain‑agnostic operation | prevent hardcoded hierarchies | config‑driven vocabulary adaptation | interpretation neutrality | meaning preservation | provenance tracking | context sensitivity | schema adaptability

## Intent

**Semantic standards**: single‑responsibility components | entity extraction | context resolution | relationship inference | domain‑agnostic schemas | config‑loaded ontologies | metadata‑driven disambiguation | meaning preservation | context sensitivity | dynamic vocabularies | semantic rules | interpretation‑agnostic processing | arbitrary schema parameters | provenance tracking | verification | traceability

## Directives

### Semantic Components Directives

**Components enforce single-responsibility separation**
- EntityExtractor identifies candidates using schema-defined patterns
- ContextResolver disambiguates entities via context metadata
- RelationshipInferencer derives relationships through configurable rules

**Systems consume configuration and emit structured meaning**
- Components load terminologies from external configuration
- Processors accept arbitrary semantic schemas as parameters
- Operations derive meaning from provided metadata

**Semantic operations maintain neutrality guarantees**
- Extractors process semantic structures independent of natural language
- Resolvers adapt to knowledge domains via configuration injection
- Validators emit provenance metadata for downstream verification

---

### Entity Extraction Directives

**EntityExtractor identifies entity candidates from input**
- EntityExtractor tokenizes input via language-agnostic rules
- EntityExtractor identifies candidates using schema-defined patterns
- EntityExtractor validates against vocabulary metadata
- EntityExtractor produces typed entity mentions with provenance

**EntityExtractor avoids domain-specific assumptions**
- EntityExtractor queries schema engines for type definitions
- EntityExtractor loads vocabularies from configuration
- EntityExtractor derives semantic types from provided schemas

---

### Context Resolution Directives

**ContextResolver disambiguates entities through context analysis**
- ContextResolver gathers context window around mentions
- ContextResolver computes semantic similarity scores
- ContextResolver ranks candidates using metadata-driven scoring
- ContextResolver resolves ambiguous entities with confidence scores

**ContextResolver maintains context sensitivity**
- ContextResolver adapts to knowledge domains via configuration
- ContextResolver provides context traces for verification
- ContextResolver applies metadata-driven disambiguation heuristics

---

### Relationship Inference Directives

**RelationshipInferencer derives semantic relationships**
- RelationshipInferencer extracts entity pairs from text
- RelationshipInferencer computes semantic distance between entities
- RelationshipInferencer matches patterns against relationship ontology
- RelationshipInferencer infers semantic triples with evidence chains

**RelationshipInferencer uses configuration-loaded ontologies**
- RelationshipInferencer queries relationship ontologies from configuration
- RelationshipInferencer applies configurable inference rules
- RelationshipInferencer provides confidence metrics with provenance

---

### Schema Engine Directives

**Schema Engine provides injectable semantic definitions**
- Schema Engine provides type definitions as parameters
- Schema Engine supplies relationship ontologies dynamically
- Schema Engine defines validation constraints externally
- Schema Engine enables domain adaptation without code changes

---

### Configuration System Directives

**Configuration System supplies semantic parameters at runtime**
- Configuration System provides vocabularies from external sources
- Configuration System loads semantic rules dynamically
- Configuration System supplies disambiguation heuristics as configuration
- Configuration System ensures interpretation-agnostic processing

---

### Anti-Pattern Guards

**Semantic engineers avoid prohibited patterns**:

❌ Components embed domain assumptions → ✅ Components query schema engines  
❌ Hard-coded semantic hierarchies → ✅ Schema-driven type systems  
❌ Fixed relationship vocabularies → ✅ Configuration-loaded ontologies  
❌ Language-specific processing logic → ✅ Language-agnostic tokenization  
❌ Embedded disambiguation rules → ✅ Metadata-driven scoring  

---

### Semantic Validation Checklist

**Pre-Deployment** (Required):
- [ ] Engineers verify zero hardcoded vocabularies
- [ ] Engineers confirm schema-driven type systems
- [ ] Engineers validate configuration-loaded ontologies
- [ ] Engineers ensure language-agnostic processing
- [ ] Engineers verify provenance metadata emission
- [ ] Engineers test with 3+ knowledge domains

**Code Review** (Required):
- [ ] Reviewers audit for embedded domain assumptions
- [ ] Reviewers verify schema engine queries
- [ ] Reviewers check configuration injection points
- [ ] Reviewers validate metadata-driven disambiguation
- [ ] Reviewers confirm single-responsibility separation

---

## Role—Action—Outcome

**Role: EntityExtractor**  
→ Action: tokenizes input via language-agnostic rules, identifies candidates using schema-defined patterns, validates against vocabulary metadata, produces typed mentions  
→ Outcome: delivers typed entity mentions with provenance and semantic types derived from configuration

**Role: ContextResolver**  
→ Action: gathers context windows, computes semantic similarity, ranks candidates using metadata-driven scoring, resolves ambiguities  
→ Outcome: produces resolved entities with confidence scores and context traces enabling verification

**Role: RelationshipInferencer**  
→ Action: extracts entity pairs, computes semantic distance, matches patterns against relationship ontology, infers relationships  
→ Outcome: delivers semantic triples with evidence chains and confidence metrics supporting downstream reasoning

**Role: Schema Engine**  
→ Action: provides type definitions, supplies relationship ontologies, defines validation constraints as injectable parameters  
→ Outcome: enables domain adaptation without code changes or system redeployment

**Role: Configuration System**  
→ Action: supplies vocabularies, loads semantic rules, provides disambiguation heuristics at runtime, injects domain knowledge  
→ Outcome: ensures interpretation-agnostic and vocabulary-neutral processing across semantic pipeline

**Role: Semantic Engineer**  
→ Action: designs schema-driven components, implements configuration injection, ensures language-agnostic processing, tracks provenance metadata  
→ Outcome: builds domain-adaptive semantic systems operating across diverse knowledge domains

**Role: Ontology Curator**  
→ Action: defines type hierarchies, specifies relationship vocabularies, establishes disambiguation rules, versions ontologies  
→ Outcome: provides semantic knowledge enabling meaning extraction and entity resolution

**Role: Validation Engineer**  
→ Action: verifies neutrality guarantees, validates cross-domain operation, audits configuration usage, checks provenance completeness  
→ Outcome: ensures semantic systems maintain domain-agnostic operation and interpretation neutrality

---

## Mantra Application

**"CID frames semantic standards, SRP isolates semantic concerns, RAO aligns component responsibilities, SVO clarifies processing semantics"**

- **CID frames**: Establishes scope (semantic processing systems), purpose (meaning extraction + domain-agnostic operation), rules (schema-driven + configuration-loaded + provenance-tracked)
- **SRP isolates**: Ensures EntityExtractor handles identification, ContextResolver handles disambiguation, RelationshipInferencer handles inference, each maintaining focused responsibility
- **RAO aligns**: Maps extractors, resolvers, inferencers, schema engines, configuration systems, semantic engineers, ontology curators, validation engineers to their semantic deliverables
- **SVO clarifies**: Expresses all operations (extractors identify candidates, resolvers disambiguate entities, inferencers derive relationships) with grammatical precision enabling clear semantic pipeline construction and preventing domain coupling