# Schema Guidelines

## Core Principles

**Schema-Driven Architecture**: All data structures defined via external schemas -> runtime validation -> type safety without hardcoding | Domain-agnostic type systems | Version-controlled evolution | Zero embedded vocabularies

**Validation Primacy**: Every component input/output validated against schema -> preconditions enforced -> postconditions verified | Fail-fast on schema violations

---

## Schema Validation

### Component: SchemaValidator

**From data to compliance**: SchemaValidator -> loads schema definitions from config -> validates data structures against types -> checks required fields -> enforces constraints -> delivers validation results with detailed errors.

```
FUNCTION SchemaValidator.validate({ data, schema_ref, config }) -> { validation_result }
  // SchemaValidator checks data compliance via schema definitions
  
  schema <- load_schema(schema_ref, config.schema_registry)
  
  errors <- []
  
  // Required field validation
  FOR EACH field IN schema.required_fields:
    IF field NOT IN data:
      errors.append({ field: field, error: "missing_required", severity: "error" })
  
  // Type validation
  FOR EACH field IN data.keys():
    IF field NOT IN schema.fields:
      errors.append({ field: field, error: "unknown_field", severity: "warning" })
      CONTINUE
    
    expected_type <- schema.fields[field].type
    actual_value <- data[field]
    
    IF NOT validate_type(actual_value, expected_type, config.type_validators):
      errors.append({
        field: field,
        error: "type_mismatch",
        expected: expected_type,
        actual: infer_type(actual_value),
        severity: "error"
      })
    
    // Constraint validation
    IF schema.fields[field].constraints EXISTS:
      constraint_errors <- validate_constraints(actual_value, schema.fields[field].constraints)
      errors.extend(constraint_errors)
  
  RETURN {
    valid: is_empty(filter(errors, e -> e.severity == "error")),
    errors: errors,
    schema_version: schema.version
  }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `schema/validator.ext` | `SchemaValidator` | `validate` | SchemaValidator checks data compliance via schema definitions | `config.schema_registry` | `ValidationResult{}` |

---

## Schema Evolution

### Component: SchemaEvolver

**From version to version**: SchemaEvolver -> detects schema changes -> generates migration scripts -> validates backward compatibility -> tracks schema lineage -> delivers versioned schema transitions.

```
FUNCTION SchemaEvolver.migrate_data({ data, from_version, to_version, config }) -> { migrated }
  // SchemaEvolver transforms data between schema versions via migration chain
  
  migration_path <- find_migration_path(from_version, to_version, config.migration_registry)
  
  current_data <- data
  
  FOR EACH migration IN migration_path:
    transformer <- load_transformer(migration.transformer_id, config)
    
    transformed <- transformer.apply(current_data, migration.rules)
    
    validation <- SchemaValidator.validate({
      data: transformed,
      schema_ref: migration.target_schema,
      config: config
    })
    
    IF NOT validation.valid:
      RETURN {
        success: false,
        error: "migration_validation_failed",
        step: migration.id,
        validation_errors: validation.errors
      }
    
    current_data <- transformed
    
    metrics.increment("schema.migration.applied", { from: migration.source, to: migration.target })
  
  RETURN {
    success: true,
    data: current_data,
    applied_migrations: count(migration_path),
    final_version: to_version
  }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `schema/evolver.ext` | `SchemaEvolver` | `migrate_data` | SchemaEvolver transforms data between schema versions via migration chain | `config.migration_registry` | `MigrationResult{}` |

---

## Schema Registry

### Component: SchemaRegistry

**From definitions to runtime**: SchemaRegistry -> stores schema definitions -> manages versions -> resolves references -> caches compiled schemas -> delivers fast schema access for validation.

```
FUNCTION SchemaRegistry.resolve_schema({ schema_ref, config }) -> { schema }
  // SchemaRegistry retrieves schema definition via reference resolution
  
  IF schema_ref IN cache:
    RETURN cache[schema_ref]
  
  schema_path <- resolve_path(schema_ref, config.schema_base_path)
  raw_schema <- load_file(schema_path, config.schema_format)
  
  // Resolve $ref references
  resolved <- resolve_references(raw_schema, config.schema_registry)
  
  // Compile for faster validation
  compiled <- compile_schema(resolved, config.compilation_options)
  
  cache[schema_ref] <- {
    definition: compiled,
    version: resolved.version,
    loaded_at: now()
  }
  
  RETURN compiled
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `schema/registry.ext` | `SchemaRegistry` | `resolve_schema` | SchemaRegistry retrieves schema definition via reference resolution | `config.schema_base_path` | `Schema{}` |

---

## Configuration Schema

**schema_registry**: `{ base_path, format, cache_ttl }` - Schema storage configuration  
**type_validators**: `{ string, number, object, array, custom }` - Type checking implementations  
**migration_registry**: `{ migrations, transformers }` - Version transition definitions  
**constraint_validators**: `{ range, pattern, enum, custom }` - Field constraint checkers

---

## Quality Metrics

**Validation Pass Rate**: Valid data / Total validations  
**Schema Coverage**: Fields validated / Total fields  
**Migration Success Rate**: Successful migrations / Total attempts  
**Constraint Violation Rate**: Constraint errors / Total validations