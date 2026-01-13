# Coding Guidelines

## Context

**Production patterns**: translate specs to code | trace responsibilities | config‑driven behavior | schema‑aligned type safety | provenance tracking | metrics instrumentation | pre/postcondition validation | S‑V‑O responsibility mapping | externalize adaptive parameters | embed lineage metadata | schema‑driven interfaces | prevent domain coupling

## Intent

**Coding standards**: S‑V‑O responsibility mapping | config‑driven thresholds | schema‑aligned type definitions | validation rules | provenance tracking | metrics instrumentation | guard against hardcoding | prevent domain coupling | per‑function checklists | per‑module validation

## Directives

### Core Principles

**Developers implement specification-driven code**
- Developers translate pseudocode specifications to production code
- Developers map functions to S-V-O responsibility rows
- Developers externalize configuration parameters
- Developers embed provenance metadata

**Developers enforce neutrality-first design**
- Developers eliminate hardcoded domains
- Developers implement schema-driven interfaces
- Developers parameterize behavior via metadata
- Developers build single-responsibility modules
- Developers choose semantic HTML elements before adding div wrappers

---

### Responsibility-Based Implementation Directives

#### Mapping Code to S-V-O Table

**Developers implement exactly one responsibility per function**

**Pattern Example**:
```
FUNCTION PatternDetector.extract_features({ entities, config }) -> { feature_vectors }
  // PatternDetector extracts feature vectors via embedding model
  
  vectors <- []
  FOR EACH entity IN entities:
    vector <- compute_embedding(entity, config.embedding_model)
    vectors.append({
      entity_id: entity.id,
      vector: vector,
      provenance: build_provenance(entity, "extract_features")
    })
  
  RETURN vectors
END
```

**Developers document function in responsibility table**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `detection/pattern.ext` | `PatternDetector` | `extract_features` | PatternDetector extracts feature vectors via embedding model | `config.embedding_model` | `FeatureVector[]` |

---

### Configuration-Driven Implementation Directives

#### External Config Pattern

**Developers externalize all adaptive parameters**

**Pattern Example**:
```
FUNCTION RelationshipBuilder.compute_similarity({ pairs, config }) -> { scored_pairs }
  // RelationshipBuilder scores entity pairs via similarity metric
  
  threshold <- config.similarity_threshold  // From config
  metric <- config.metrics[config.active_metric]  // From config
  
  scored <- []
  FOR EACH pair IN pairs:
    score <- metric.compute(pair.source, pair.target)
    
    IF score >= threshold:
      scored.append({
        pair: pair,
        score: score,
        provenance: { method: metric.name, timestamp: now() }
      })
  
  RETURN scored
END
```

**Developers document configuration-driven function**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `graph/relationships.ext` | `RelationshipBuilder` | `compute_similarity` | RelationshipBuilder scores entity pairs via similarity metric | `config.metrics`, `config.threshold` | `ScoredPair[]` |

#### Anti-Pattern (FORBIDDEN)

**Developers avoid hardcoded parameters and domain-specific branches**:
```
FUNCTION RelationshipBuilder.compute_similarity({ pairs }) -> { scored_pairs }
  threshold <- 0.85  // WRONG: Hardcoded magic number
  
  IF pairs[0].type == "Person":  // WRONG: Domain-specific branch
    RETURN process_person_pairs(pairs)
  // ...
END
```

---

### Schema-Aligned Implementation Directives

#### Type Definitions from Schema

**Developers derive type definitions from schema specifications**

**Pattern Example**:
```
FUNCTION GraphBuilder.create_relationship({ source, target, config }) -> { relationship }
  // GraphBuilder constructs typed relationships via schema definitions
  
  // Preconditions
  ASSERT source IN config.schema.entity_types
  ASSERT target IN config.schema.entity_types
  
  rel_type <- config.schema.relationship_types[source.type][target.type]
  
  relationship <- {
    id: generate_id(),
    source: source.id,
    target: target.id,
    type: rel_type,  // Schema-driven
    confidence: compute_confidence(source, target, config),
    provenance: track_lineage(source, target)
  }
  
  // Postcondition
  ASSERT relationship.type IN config.schema.valid_types
  
  RETURN relationship
END
```

**Developers document schema-aligned function**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `graph/builder.ext` | `GraphBuilder` | `create_relationship` | GraphBuilder constructs typed relationships via schema definitions | `config.schema`, `EntityType` | `Relationship{}` |

---

### Provenance & Metrics Embedding Directives

#### Required Metadata Tracking

**Developers track provenance and metrics at transformation boundaries**

**Pattern Example**:
```
FUNCTION FeatureEngineer.transform_features({ raw_data, config }) -> { transformed }
  // FeatureEngineer transforms raw data through configured pipeline
  
  start_time <- current_time()
  
  // Stage 1: Extract
  extracted <- extract_raw_features(raw_data, config.extractors)
  metrics.increment("features.extracted", count(extracted))
  
  // Stage 2: Normalize
  normalized <- normalize_features(extracted, config.normalization)
  
  // Stage 3: Encode
  encoded <- encode_categorical(normalized, config.encoding_strategy)
  
  duration <- current_time() - start_time
  metrics.histogram("features.transform.duration_ms", duration)
  
  RETURN {
    features: encoded,
    provenance: {
      source_count: count(raw_data),
      pipeline: ["extract", "normalize", "encode"],
      duration_ms: duration,
      config_version: config.version,
      timestamp: iso_timestamp()
    }
  }
END
```

**Developers document multi-stage transformations**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `features/engineer.ext` | `FeatureEngineer` | `extract_raw_features` | FeatureEngineer extracts raw features via configured extractors | `config.extractors` | `RawFeature[]` |
| `features/engineer.ext` | `FeatureEngineer` | `normalize_features` | FeatureEngineer normalizes distributions using normalization strategy | `config.normalization` | `NormalizedFeature[]` |
| `features/engineer.ext` | `FeatureEngineer` | `encode_categorical` | FeatureEngineer encodes categorical values through encoding strategy | `config.encodingStrategy` | `EncodedFeature[]` |

---

### Validation Patterns Directives

#### Precondition/Postcondition Guards

**Developers validate inputs and outputs through explicit guards**

**Pattern Example**:
```
FUNCTION SchemaValidator.check_compliance({ data, schema }) -> { validation_result }
  // SchemaValidator validates data structure against schema definitions
  
  // Preconditions
  ASSERT data IS NOT NULL
  ASSERT schema.required_fields EXISTS
  
  errors <- []
  
  // Validate required fields
  FOR EACH field IN schema.required_fields:
    IF field NOT IN data:
      errors.append({ field: field, error: "missing_required" })
  
  // Validate types
  FOR EACH field IN data.keys():
    expected_type <- schema.fields[field].type
    IF NOT validate_type(data[field], expected_type):
      errors.append({ field: field, error: "type_mismatch" })
  
  result <- { valid: is_empty(errors), errors: errors }
  
  // Postcondition
  ASSERT result.valid == is_empty(errors)
  
  RETURN result
END
```

**Developers document validation function**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `validation/schema.ext` | `SchemaValidator` | `check_compliance` | SchemaValidator validates data structure against schema definitions | `schema.required_fields`, `schema.fields` | `ValidationResult{}` |

---

### Anti-Pattern Guards (BLOCKERS)

**Developers avoid prohibited coding patterns**:

#### Hardcoded Domain Logic
```
// FORBIDDEN
IF entity.domain == "healthcare":
  special_processing()

categories <- ["A", "B", "C"]  // Domain assumption
```
✅ **Correct**: Use `config.entity_domains` and `config.categories`

#### Missing Configuration
```
// FORBIDDEN
threshold <- 0.8  // Should be config.threshold
api_url <- "https://api.example.com"  // Should be config.api_base_url
```
✅ **Correct**: All parameters from config object

#### No Provenance
```
// FORBIDDEN
RETURN { result: processed }  // Missing provenance metadata
```
✅ **Correct**: Include `{ result: processed, provenance: {...} }`

---

### Implementation Checklist Directives

**Developers validate per-function requirements**:
- [ ] Function maps to one S-V-O responsibility row
- [ ] Parameters sourced from config, not hardcoded
- [ ] Types align with schema definitions
- [ ] Provenance metadata tracked
- [ ] Metrics instrumented at boundaries
- [ ] Preconditions/postconditions validated
- [ ] Single-responsibility maintained (clear S-V-O)
- [ ] Token sharing implemented (no redundant lexing)

**Developers validate per-module requirements**:
- [ ] Module contains <600 lines total
- [ ] Module maintains single feature scope
- [ ] Module contains zero domain-specific branches
- [ ] Module exposes config-driven behavior only
- [ ] Module produces schema-compliant outputs
- [ ] All module functions map to responsibility table

---

## Role—Action—Outcome

**Role: Software Developer**  
-> Action: implements specification-driven code, maps functions to S-V-O rows, externalizes configuration, embeds provenance, validates preconditions/postconditions  
-> Outcome: produces traceable, configuration-driven implementations enabling cross-domain deployment

**Role: Configuration Engineer**  
-> Action: designs config schemas, externalizes parameters, documents config impacts, versions configurations, maintains defaults  
-> Outcome: provides configuration layer enabling runtime behavior adaptation without code changes

**Role: Schema Designer**  
-> Action: defines type hierarchies, specifies field requirements, establishes validation rules, versions schemas, documents contracts  
-> Outcome: establishes type safety contracts enabling schema-driven implementation

**Role: Instrumentation Engineer**  
-> Action: embeds metrics tracking, instruments transformation boundaries, logs provenance metadata, tracks performance, enables observability  
-> Outcome: provides operational visibility enabling debugging and performance optimization

**Role: Validation Engineer**  
-> Action: implements precondition/postcondition guards, validates schema compliance, checks type safety, audits configuration usage, enforces contracts  
-> Outcome: ensures implementation correctness through systematic validation

**Role: Code Reviewer**  
-> Action: audits S-V-O mapping, verifies configuration externalization, checks provenance tracking, validates anti-pattern absence, confirms checklist completion  
-> Outcome: maintains code quality through systematic review against coding standards

**Role: Module Architect**  
-> Action: defines module boundaries, enforces size limits, establishes feature scope, ensures single-responsibility, documents dependencies  
-> Outcome: maintains focused module boundaries preventing bloat and coupling

---

## Mantra Application

**"CID frames coding standards, SRP isolates function concerns, RAO aligns implementation responsibilities, SVO clarifies operational semantics"**

- **CID frames**: Establishes scope (coding implementation), purpose (traceability + neutrality + validation), rules (S-V-O mapping + config-driven + schema-aligned)
- **SRP isolates**: Ensures each function implements single responsibility row, each module handles focused feature, each transformation tracks single concern
- **RAO aligns**: Maps software developers, configuration engineers, schema designers, instrumentation engineers, validation engineers, code reviewers, module architects to their implementation deliverables
- **SVO clarifies**: Expresses all operations (developers implement functions, systems track provenance, validators check compliance) with grammatical precision enabling clear mapping between specification and implementation
