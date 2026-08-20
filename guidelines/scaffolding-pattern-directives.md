---
title: "Scaffolding Pattern Directives Module"
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
parent: "Scaffolding Pattern Guidelines"
parent_version: "1.0.0"
---

# Scaffolding Pattern Directives Module

## Scope & Ownership

Owns the directive body: the core mandate, the universal scaffolding sequence, and the single-responsibility scaffolding directives.

This module is loaded on demand from [Scaffolding Pattern Guidelines](./scaffolding-pattern-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Directives

### Core Mandate

**Developers scaffold code incrementally**
- Developers create minimal file structures first
- Developers stub function signatures before implementation
- Developers test incrementally with representative data
- Developers refine iteratively based on validation feedback
- Developers document as understanding evolves

### Universal Scaffolding Sequence

**Developers follow domain-agnostic scaffolding steps**
1. Developers create file structure
2. Developers import essential dependencies
3. Developers stub function signatures with docstrings
4. Developers implement minimal viable logic
5. Developers validate with representative fixtures
6. Developers add error handling and edge cases
7. Developers refine documentation and type hints

---

### Single-Responsibility Scaffolding Directives

**Developers scaffold modules with focused responsibilities**
- Developers scope each module to single concern
- Developers stub functions matching responsibility boundaries
- Developers test each function independently
- Developers maintain separation of concerns during refinement
- Developers avoid feature creep in scaffolding phase

---

### Subject-Verb-Object Scaffolding Structure

**Developers scaffold functions via configuration**
- Pattern: Developer scaffolds function via stub-test-refine cycle

**Stubs define interfaces before implementation**
- Pattern: Stub defines interface via signature and docstring

**Tests validate behavior incrementally**
- Pattern: Test validates behavior via representative fixture

**Rule**: Developers ensure all functions remain testable; developers enable validation via fixtures before full implementation.

---

### Specification Pattern Directives

#### Example: DataLoader Scaffolding

**From empty file to validated module**: Developer → creates file structure → stubs function signatures → implements minimal logic → validates with fixtures → adds error handling → refines documentation.

**Developers scaffold DataLoader incrementally**
- Developers stub `load_data()` with signature and docstring
- Developers implement minimal connection logic first
- Developers test with sample database/file before full implementation
- Developers add validation functions after core logic works
- Developers refine error handling based on test failures

```
# Step 1: Create file
TOUCH module/data_loader.ext

# Step 2: Import essentials
IMPORT database_library
IMPORT data_structure_library

# Step 3: Stub functions
FUNCTION load_data({ source_path, config }) -> { data_structure }
  """Load data from source into memory structure.
  
  Args:
    source_path: Path to data source
    config: Configuration parameters
    
  Returns:
    data_structure: Loaded data
  """
  PASS  // TODO: Implement connection logic
END

FUNCTION validate_schema({ data, expected_schema }) -> { validation_result }
  """Validate data conforms to expected schema.
  
  Args:
    data: Data structure to validate
    expected_schema: Schema definition from config
    
  Returns:
    validation_result: Boolean or detailed report
  """
  PASS  // TODO: Implement schema checks
END

# Step 4: Implement minimal logic
FUNCTION load_data({ source_path, config }) -> { data_structure }
  connection <- connect_to_source(source_path)
  data <- read_from_connection(connection, config.query)
  close_connection(connection)
  RETURN data
END

# Step 5: Validate with fixture
test_data <- load_data({ 
  source_path: "fixtures/sample.db", 
  config: { query: "SELECT * FROM test_table" }
})
ASSERT test_data.row_count > 0

# Step 6: Add error handling
FUNCTION load_data({ source_path, config }) -> { data_structure }
  IF NOT file_exists(source_path):
    RAISE FileNotFoundError("Source not found: " + source_path)
  
  TRY:
    connection <- connect_to_source(source_path)
    data <- read_from_connection(connection, config.query)
    close_connection(connection)
    RETURN data
  CATCH ConnectionError AS e:
    RAISE RuntimeError("Failed to load data: " + e.message)
END

# Step 7: Refine documentation
FUNCTION load_data({ source_path, config }) -> { data_structure }
  """Load data from source into memory structure.
  
  Establishes connection to data source, executes configured query,
  and returns structured data. Handles connection cleanup automatically.
  
  Args:
    source_path: Absolute or relative path to data source
    config: Configuration object with 'query' parameter
    
  Returns:
    data_structure: Structured data (e.g., DataFrame, list of records)
    
  Raises:
    FileNotFoundError: Source path does not exist
    RuntimeError: Connection or query execution failed
    
  Example:
    data <- load_data({
      source_path: "data/production.db",
      config: { query: "SELECT * FROM users WHERE active = 1" }
    })
  """
  // Implementation with error handling...
END
```

**Developers document scaffolding progression in responsibility table**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `module/data_loader.ext` | `DataLoader` | `load_data` | DataLoader loads data via configured source connection | `database_library`, `config.query` | `DataStructure` |
| `module/data_loader.ext` | `DataLoader` | `validate_schema` | Validator checks schema via expected definitions | `config.expected_schema` | `ValidationResult` |
| `module/data_loader.ext` | `DataLoader` | `check_row_count` | Counter validates rows via minimum threshold | `config.min_rows` | `Boolean` |

---

#### Example: ModelTrainer Scaffolding

**From concept to production-ready trainer**: Developer → stubs training interface → implements minimal training loop → validates with toy dataset → adds checkpointing → refines hyperparameter handling.

**Developers scaffold ModelTrainer incrementally**
- Developers stub `train()` and `evaluate()` signatures first
- Developers implement single-epoch training before full loop
- Developers test with small fixture dataset (100 samples)
- Developers add checkpointing after core training works
- Developers refine hyperparameter injection via configuration

```
# Step 1: Stub training interface
FUNCTION train({ model, data, config }) -> { trained_model }
  """Train model on provided data.
  
  Args:
    model: Untrained model instance
    data: Training dataset
    config: Training configuration (epochs, learning_rate, etc.)
    
  Returns:
    trained_model: Trained model instance
  """
  PASS  // TODO: Implement training loop
END

# Step 2: Implement minimal training loop
FUNCTION train({ model, data, config }) -> { trained_model }
  FOR epoch IN range(config.epochs):
    FOR batch IN data.batches:
      predictions <- model.forward(batch.inputs)
      loss <- compute_loss(predictions, batch.targets)
      model.backward(loss)
      model.update_weights(config.learning_rate)
  
  RETURN model
END

# Step 3: Validate with toy dataset
toy_data <- create_fixture_dataset({ samples: 100, features: 10 })
toy_model <- initialize_model({ input_dim: 10, output_dim: 2 })
trained <- train({ 
  model: toy_model, 
  data: toy_data, 
  config: { epochs: 5, learning_rate: 0.01 }
})
ASSERT trained.get_loss() < toy_model.get_initial_loss()

# Step 4: Add checkpointing
FUNCTION train({ model, data, config }) -> { trained_model }
  FOR epoch IN range(config.epochs):
    FOR batch IN data.batches:
      predictions <- model.forward(batch.inputs)
      loss <- compute_loss(predictions, batch.targets)
      model.backward(loss)
      model.update_weights(config.learning_rate)
    
    // Add checkpoint logic
    IF epoch % config.checkpoint_interval == 0:
      save_checkpoint(model, config.checkpoint_path, epoch)
  
  RETURN model
END

# Step 5: Refine hyperparameter handling
FUNCTION train({ model, data, config }) -> { trained_model }
  """Train model on provided data with configurable hyperparameters.
  
  Implements iterative training loop with batch processing, loss computation,
  and gradient-based weight updates. Supports checkpointing for recovery.
  
  Args:
    model: Model instance implementing forward/backward/update interface
    data: Dataset with batching capability
    config: Configuration with epochs, learning_rate, checkpoint_interval, checkpoint_path
    
  Returns:
    trained_model: Model instance with updated weights
    
  Raises:
    ValueError: Invalid hyperparameter values
    IOError: Checkpoint save failure
  """
  validate_hyperparameters(config)
  
  FOR epoch IN range(config.epochs):
    epoch_loss <- 0.0
    
    FOR batch IN data.batches:
      predictions <- model.forward(batch.inputs)
      loss <- compute_loss(predictions, batch.targets, config.loss_function)
      model.backward(loss)
      model.update_weights(config.learning_rate)
      epoch_loss <- epoch_loss + loss
    
    IF epoch % config.checkpoint_interval == 0:
      save_checkpoint(model, config.checkpoint_path, epoch)
      log_metrics({ epoch: epoch, loss: epoch_loss / data.batch_count })
  
  RETURN model
END
```

**Developers document ModelTrainer scaffolding in responsibility table**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `training/model_trainer.ext` | `ModelTrainer` | `train` | Trainer trains model via gradient descent loop | `config.epochs`, `config.learning_rate` | `TrainedModel` |
| `training/model_trainer.ext` | `ModelTrainer` | `evaluate` | Evaluator computes metrics via validation data | `config.metrics` | `MetricsReport` |
| `training/model_trainer.ext` | `ModelTrainer` | `save_checkpoint` | Checkpointer persists state via filesystem | `config.checkpoint_path` | `CheckpointFile` |

---

### Implementation Notes Directives

**Developers apply scaffolding principles in practice**

**Stub-First Development**
- Developers write function signatures with complete docstrings before implementation
- Developers use `PASS`, `TODO`, or placeholder returns initially
- Developers ensure stubs are syntactically valid and importable

**Incremental Testing**
- Developers test each function with minimal fixture before moving to next
- Developers use REPL, notebook, or test runner for rapid feedback
- Developers validate one responsibility at a time

**Configuration-Driven Refinement**
- Developers externalize magic numbers to configuration during refinement phase
- Developers avoid hardcoding paths, thresholds, or parameters
- Developers inject dependencies via configuration objects

**Error Handling Progression**
- Developers implement happy-path logic first
- Developers add validation checks after core logic works
- Developers handle edge cases based on test failures

---

### Anti-Pattern Guards

**Developers avoid prohibited scaffolding violations**:

❌ Implementing complete module before testing → ✅ Stub-test-refine cycle  
❌ Hardcoding configuration in initial implementation → ✅ Configuration-driven from first stub  
❌ Skipping docstrings until "code works" → ✅ Docstrings in stub phase  
❌ Testing only after full implementation → ✅ Incremental testing per function  
❌ Implementing multiple responsibilities in single function → ✅ Single-responsibility stubs  

---

### Scaffolding Validation Checklist

**Per-Function** (Required):
- [ ] Developers confirm function signature is stubbed with docstring
- [ ] Developers verify function tested with representative fixture
- [ ] Developers ensure function accepts configuration parameters
- [ ] Developers validate function maintains single responsibility
- [ ] Developers document function in responsibility table

**Per-Module** (Required):
- [ ] Developers confirm all functions stubbed before full implementation
- [ ] Developers verify incremental testing between refinement steps
- [ ] Developers ensure configuration-driven parameter handling
- [ ] Developers validate error handling covers identified edge cases
- [ ] Developers check documentation completeness (args, returns, raises, examples)

---
