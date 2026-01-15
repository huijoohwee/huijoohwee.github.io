---
title: "scaffolding-pattern-guidelines"
author: "joohwee"
tags: [EDA, MLP, Test]
date: 2026-01-13
mermaidAnchorsOnly: true
mermaid: |
  graph TB
    subgraph Phase1["PHASE 1: FILE CREATION & IMPORTS"]
        Module1[Module: component.ext]
        Module1 -->|"Developer creates module via file system"| FileSystem1[File System]
        Module1 -->|"Developer imports library via dependency manager"| Lib1[required_library_1]
        Module1 -->|"Developer imports library via dependency manager"| Lib2[required_library_2]
        Module1 -->|"Developer imports configuration via manager"| ConfigMgr[configuration_manager]
    end

    subgraph Phase2["PHASE 2: STUB DEFINITIONS"]
        ComponentStub[Component]
        Module1 -.->|contains| ComponentStub
        
        ComponentStub -->|"Stub defines interface via signature"| PrimaryStub[Component.primary_function STUB]
        ComponentStub -->|"Stub defines interface via signature"| ValidationStub[Component.validation_function STUB]
        
        PrimaryStub -->|"Docstring documents contract via specification"| PrimaryDoc1[DocString: Args/Returns/Raises/Example]
        ValidationStub -->|"Docstring documents contract via specification"| ValidationDoc1[DocString: Purpose]
        
        PrimaryStub -->|"Placeholder returns control via PASS"| Pass1[PASS/TODO]
        ValidationStub -->|"Placeholder returns control via PASS"| Pass2[PASS/TODO]
    end

    subgraph Phase3["PHASE 3: MINIMAL IMPLEMENTATION"]
        ComponentMin[Component]
        ComponentStub -.->|evolves to| ComponentMin
        
        ComponentMin -->|"Function transforms data via configured operation"| PrimaryMin[Component.primary_function v1]
        
        PrimaryMin -->|"Function applies transformation via config parameter"| Transform1[apply_transformation]
        Transform1 -->|"Transformer processes input via transformation_type"| ConfigParam1[config.transformation_type]
        Transform1 -->|"Transformer outputs result via return"| Processed1[processed_data]
        
        PrimaryMin -->|"Function returns output via return statement"| Return1[RETURN processed]
    end

    subgraph Phase4["PHASE 4: INCREMENTAL TESTING"]
        TestHarness[Test Harness]
        
        TestHarness -->|"Developer creates fixture via factory"| Fixture[create_representative_fixture]
        TestHarness -->|"Developer configures test via parameter object"| TestConfig[test_config]
        
        Fixture -->|"Fixture provides data via structure"| FixtureInput[fixture_input]
        TestConfig -->|"Config specifies behavior via parameters"| ConfigValues[transformation_type, threshold]
        
        TestHarness -->|"Test invokes function via call"| PrimaryMin
        PrimaryMin -->|"Function returns result via output"| TestResult[result]
        
        TestHarness -->|"Assertion validates nullity via check"| Assert1[ASSERT result IS_NOT NULL]
        TestHarness -->|"Assertion validates size via check"| Assert2[ASSERT result.size > 0]
        TestHarness -->|"Assertion validates schema via check"| Assert3[ASSERT result MATCHES expected_schema]
        
        TestResult -.->|verified by| Assert1
        TestResult -.->|verified by| Assert2
        TestResult -.->|verified by| Assert3
    end

    subgraph Phase5["PHASE 5: VALIDATION ADDITION"]
        ComponentVal[Component]
        ComponentMin -.->|evolves to| ComponentVal
        
        ComponentVal -->|"Function validates input via validation function"| PrimaryVal[Component.primary_function v2]
        ComponentVal -->|"Validator checks input via schema definition"| ValidateInput[Component.validate_input]
        ComponentVal -->|"Validator checks output via constraint rules"| ValidateOutput[Component.validate_output]
        
        PrimaryVal -->|"Function invokes validator via call"| ValidateInput
        ValidateInput -->|"Validator receives data via parameter"| InputData1[input_data]
        ValidateInput -->|"Validator receives schema via parameter"| ExpectedSchema1[config.expected_schema]
        
        ValidateInput -->|"Validator checks nullity via condition"| NullCheck[IF data IS NULL]
        NullCheck -->|"Validator raises error via exception"| ValueError1[RAISE ValueError]
        
        ValidateInput -->|"Validator checks conformance via schema matcher"| SchemaCheck[conforms_to_schema]
        SchemaCheck -->|"Validator raises error via exception"| SchemaError1[RAISE SchemaError]
        
        PrimaryVal -->|"Function applies transformation via transformer"| Transform2[apply_transformation]
        Transform2 -->|"Transformer processes input via transformation_type"| ConfigParam2[config.transformation_type]
        
        PrimaryVal -->|"Function invokes validator via call"| ValidateOutput
        ValidateOutput -->|"Validator receives data via parameter"| ProcessedData1[processed_data]
        ValidateOutput -->|"Validator receives constraints via parameter"| OutputConstraints1[config.output_constraints]
        
        PrimaryVal -->|"Function returns output via return statement"| Return2[RETURN processed]
    end

    subgraph Phase6["PHASE 6: ERROR HANDLING"]
        ComponentErr[Component]
        ComponentVal -.->|evolves to| ComponentErr
        
        ComponentErr -->|"Function handles errors via try-catch"| PrimaryErr[Component.primary_function v3]
        
        PrimaryErr -->|"Function enters try block via control flow"| TryBlock[TRY block]
        
        TryBlock -->|"Function invokes validator via call"| ValidateInput2[validate_input]
        ValidateInput2 -->|"Validator receives data via parameter"| InputData2[input_data]
        ValidateInput2 -->|"Validator receives schema via parameter"| ExpectedSchema2[config.expected_schema]
        
        TryBlock -->|"Function applies transformation via transformer"| Transform3[apply_transformation]
        Transform3 -->|"Transformer processes input via transformation_type"| ConfigParam3[config.transformation_type]
        
        TryBlock -->|"Function invokes validator via call"| ValidateOutput2[validate_output]
        ValidateOutput2 -->|"Validator receives data via parameter"| ProcessedData2[processed_data]
        ValidateOutput2 -->|"Validator receives constraints via parameter"| OutputConstraints2[config.output_constraints]
        
        TryBlock -->|"Function returns output via return statement"| Return3[RETURN processed]
        
        PrimaryErr -->|"Function catches validation errors via catch block"| CatchVal[CATCH ValidationError]
        CatchVal -->|"Handler logs error via logger"| LogError1[log_error]
        LogError1 -->|"Logger records context via parameters"| LogContext1["Validation failed"]
        CatchVal -->|"Handler raises error via exception"| RaiseVal[RAISE ValidationError]
        
        PrimaryErr -->|"Function catches transformation errors via catch block"| CatchTrans[CATCH TransformationError]
        CatchTrans -->|"Handler logs error via logger"| LogError2[log_error]
        LogError2 -->|"Logger records context via parameters"| LogContext2["Transformation failed"]
        CatchTrans -->|"Handler raises error via exception"| RaiseTrans[RAISE RuntimeError]
    end

    subgraph Phase7["PHASE 7: DOCUMENTATION REFINEMENT"]
        ComponentFinal[Component]
        ComponentErr -.->|evolves to| ComponentFinal
        
        ComponentFinal -->|"Function transforms data via configured transformation"| PrimaryFinal[Component.primary_function FINAL]
        
        PrimaryFinal -->|"Documentation describes purpose via docstring"| DocHeader[Summary & Description]
        DocHeader -->|"Documentation specifies transformations via list"| SupportedTypes["Supported: standard, normalized, encoded"]
        
        PrimaryFinal -->|"Documentation defines inputs via Args section"| ArgsDoc[Args: input_data, config]
        ArgsDoc -->|"Documentation details config via nested spec"| ConfigDoc[Config: transformation_type, expected_schema, output_constraints, logging_enabled]
        
        PrimaryFinal -->|"Documentation defines outputs via Returns section"| ReturnsDoc[Returns: output_data]
        
        PrimaryFinal -->|"Documentation defines errors via Raises section"| RaisesDoc[Raises: ValueError, SchemaError, ValidationError, RuntimeError]
        
        PrimaryFinal -->|"Documentation provides usage via Example section"| ExampleDoc[Example: config setup & invocation]
        
        PrimaryFinal -->|"Function checks logging via condition"| LogCheck1[IF config.logging_enabled]
        LogCheck1 -->|"Logger records start via log_info"| LogStart[log_info: Starting transformation]
        
        PrimaryFinal -->|"Function enters try block via control flow"| TryBlockFinal[TRY block]
        
        TryBlockFinal -->|"Function invokes validator via call"| ValidateInput3[validate_input]
        ValidateInput3 -->|"Validator receives data via parameter"| InputData3[input_data]
        ValidateInput3 -->|"Validator receives schema via parameter"| ExpectedSchema3[config.expected_schema]
        
        TryBlockFinal -->|"Function applies transformation via transformer"| Transform4[apply_transformation]
        Transform4 -->|"Transformer processes input via transformation_type"| ConfigParam4[config.transformation_type]
        Transform4 -->|"Transformer outputs result via return"| Processed4[processed_data]
        
        TryBlockFinal -->|"Function invokes validator via call"| ValidateOutput3[validate_output]
        ValidateOutput3 -->|"Validator receives data via parameter"| ProcessedData3[processed_data]
        ValidateOutput3 -->|"Validator receives constraints via parameter"| OutputConstraints3[config.output_constraints]
        
        TryBlockFinal -->|"Function checks logging via condition"| LogCheck2[IF config.logging_enabled]
        LogCheck2 -->|"Logger records completion via log_info"| LogEnd[log_info: Transformation complete]
        LogEnd -->|"Logger includes metrics via parameters"| LogMetrics[rows: processed.row_count]
        
        TryBlockFinal -->|"Function returns output via return statement"| Return4[RETURN processed]
        
        PrimaryFinal -->|"Function catches validation errors via catch block"| CatchValFinal[CATCH ValidationError]
        CatchValFinal -->|"Handler logs error via logger"| LogError3[log_error]
        LogError3 -->|"Logger records context via parameters"| LogContext3["Validation failed", e]
        CatchValFinal -->|"Handler raises error via exception"| RaiseValFinal[RAISE ValidationError with message]
        
        PrimaryFinal -->|"Function catches transformation errors via catch block"| CatchTransFinal[CATCH TransformationError]
        CatchTransFinal -->|"Handler logs error via logger"| LogError4[log_error]
        LogError4 -->|"Logger records context via parameters"| LogContext4["Transformation failed", e]
        CatchTransFinal -->|"Handler raises error via exception"| RaiseTransFinal[RAISE RuntimeError with message]
    end

    subgraph Legend["LEGEND"]
        LegendNode1[Node: Class.Method]
        LegendNode2[Node: Operation/Artifact]
        LegendEdge1[Edge: Subject Verb Object Via Mechanism]
        LegendPhase[Subgraph: Development Phase]
        
        LegendNode1 -->|"Component verb object via mechanism"| LegendNode2
        
        style LegendNode1 fill:#e1f5ff
        style LegendNode2 fill:#fff4e1
        style LegendPhase fill:#f0f0f0
    end

    style Module1 fill:#e1f5ff,stroke:#0066cc,stroke-width:3px
    style ComponentStub fill:#e1f5ff,stroke:#0066cc,stroke-width:3px
    style ComponentMin fill:#e1f5ff,stroke:#0066cc,stroke-width:3px
    style ComponentVal fill:#e1f5ff,stroke:#0066cc,stroke-width:3px
    style ComponentErr fill:#e1f5ff,stroke:#0066cc,stroke-width:3px
    style ComponentFinal fill:#e1f5ff,stroke:#0066cc,stroke-width:3px
    
    style PrimaryStub fill:#fff4e1,stroke:#ff9900,stroke-width:2px
    style ValidationStub fill:#fff4e1,stroke:#ff9900,stroke-width:2px
    style PrimaryMin fill:#fff4e1,stroke:#ff9900,stroke-width:2px
    style PrimaryVal fill:#fff4e1,stroke:#ff9900,stroke-width:2px
    style PrimaryErr fill:#fff4e1,stroke:#ff9900,stroke-width:2px
    style PrimaryFinal fill:#fff4e1,stroke:#ff9900,stroke-width:2px
    
    style ValidateInput fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style ValidateOutput fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style ValidateInput2 fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style ValidateOutput2 fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style ValidateInput3 fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
    style ValidateOutput3 fill:#e8f5e9,stroke:#4caf50,stroke-width:2px
---

# Scaffolding Pattern Guidelines

## Context
**Incremental development workflows**: apply universal scaffolding to establish consistency, implement from scratch to ensure foundation, refine iteratively to drive improvement, validate through tests to secure reliability, stay domain‑agnostic to guarantee adaptability, remain project‑agnostic to maintain flexibility, and adhere to technology‑neutral principles to preserve universality.  

## Intent
**Scaffolding standards**: build incrementally to ensure structured growth, start with stubs to establish foundations, iterate with tests to secure reliability, refine through validation to strengthen quality, manage cognitive load to sustain clarity, optimize feedback loops to accelerate learning, apply universally to guarantee adaptability, and remain domain‑neutral to preserve flexibility.  

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

## Scaffolding Progression Table

**Developers track scaffolding maturity across phases**:

| Phase | Characteristic | Validation Method | Completion Criteria |
|-------|----------------|-------------------|---------------------|
| **1. File Creation** | Empty file or minimal imports | File exists and imports valid | Linter passes, no import errors |
| **2. Stub Definition** | Function signatures with docstrings | Signatures callable with placeholder returns | All stubs return valid types or raise NotImplementedError |
| **3. Minimal Implementation** | Core logic without error handling | Happy-path test with fixture passes | Single representative test passes |
| **4. Validation Addition** | Input validation and schema checks | Edge case tests with invalid inputs | Validation functions catch malformed inputs |
| **5. Error Handling** | Try-catch blocks and meaningful exceptions | Error condition tests trigger expected exceptions | All error paths tested and documented |
| **6. Configuration Refinement** | Externalized parameters and injection | Tests run with varied configurations | No hardcoded values remain in implementation |
| **7. Documentation Completion** | Complete docstrings with examples | Documentation generates correctly | Docstrings include Args, Returns, Raises, Examples |

---

## Role—Action—Outcome

**Role: Module Developer**  
→ Action: creates file structure, stubs function signatures, implements minimal logic, tests incrementally, adds error handling, refines documentation  
→ Outcome: produces tested module through validated scaffolding progression

**Role: Test Engineer**  
→ Action: creates representative fixtures, validates each scaffolding phase, writes assertion-based tests, ensures incremental coverage, prevents regression  
→ Outcome: ensures reliability through systematic validation at each scaffolding step

**Role: Configuration Architect**  
→ Action: identifies configuration parameters during stub phase, externalizes hardcoded values during refinement, defines configuration schemas, documents parameter purposes  
→ Outcome: provides configuration layer enabling adaptation without implementation changes

**Role: Code Reviewer**  
→ Action: audits scaffolding progression, verifies incremental testing, checks configuration usage, validates error handling completeness, enforces single-responsibility boundaries  
→ Outcome: maintains scaffolding discipline through systematic review feedback

**Role: Documentation Specialist**  
→ Action: ensures docstrings in stub phase, validates documentation completeness during refinement, adds usage examples, maintains responsibility tables, updates as understanding evolves  
→ Outcome: delivers comprehensive documentation aligned with implementation maturity

---

## Mantra Application

**"CID frames scaffolding standards, SRP isolates scaffolding phases, RAO aligns developer workflows, SVO clarifies scaffolding semantics"**

- **CID frames**: Establishes scope (incremental development), purpose (cognitive load management, iterative refinement), rules (stub-first + test-driven + configuration-injection)
- **SRP isolates**: Ensures each scaffolding phase handles single concern (stub vs implement vs validate vs refine), each function owns focused responsibility
- **RAO aligns**: Maps module developers, test engineers, configuration architects, code reviewers, documentation specialists to their scaffolding deliverables
- **SVO clarifies**: Expresses all scaffolding operations (developer stubs function, test validates behavior, configuration drives adaptation) with grammatical precision ensuring workflow clarity and preventing premature optimization

---

## Domain Applicability Matrix

**Developers apply scaffolding pattern across all software domains**:

| Domain | Scaffolding Example | Key Validation | Configuration Points |
|--------|---------------------|----------------|----------------------|
| **Exploratory Data Analysis** | Stub `plot_distribution()` → test with sample data → add customization | Visualization renders correctly | Chart type, color scheme, bin count |
| **ML Pipeline** | Stub `train_model()` → test with toy dataset → add checkpointing | Training loss decreases | Epochs, learning rate, optimizer |
| **MLOps/LLMOps** | Stub `deploy_model()` → test with local container → add health checks | Service responds to requests | Container image, port, resource limits |
| **Web Backend** | Stub `handle_request()` → test with mock request → add authentication | Endpoint returns expected status | Route, method, auth strategy |
| **Data Pipeline** | Stub `transform_data()` → test with fixture records → add validation | Transformation produces correct schema | Transformation rules, thresholds |
| **Infrastructure** | Stub `provision_resources()` → test with minimal config → add monitoring | Resources created successfully | Region, instance type, scaling policy |

---

## Universal Scaffolding Pseudocode Template

**Developers use this template for any domain/project/technology**:

```
# ============================================================
# PHASE 1: FILE CREATION & IMPORTS
# ============================================================
CREATE FILE module/component.ext

IMPORT required_library_1
IMPORT required_library_2
IMPORT configuration_manager

# ============================================================
# PHASE 2: STUB DEFINITIONS
# ============================================================
FUNCTION primary_function({ input_data, config }) -> { output_data }
  """One-line summary of function purpose.
  
  Detailed description of what function accomplishes and how it fits
  into larger system. Describes key algorithms or approaches used.
  
  Args:
    input_data: Description of input structure and semantics
    config: Configuration object with parameters (list key params)
    
  Returns:
    output_data: Description of output structure and semantics
    
  Raises:
    ErrorType1: Condition that triggers this error
    ErrorType2: Condition that triggers this error
    
  Example:
    output <- primary_function({
      input_data: example_input,
      config: { param1: value1, param2: value2 }
    })
  """
  PASS  // TODO: Implement core logic
END

FUNCTION validation_function({ data, expected_criteria }) -> { validation_result }
  """One-line summary of validation purpose."""
  PASS  // TODO: Implement validation checks
END

# ============================================================
# PHASE 3: MINIMAL IMPLEMENTATION
# ============================================================
FUNCTION primary_function({ input_data, config }) -> { output_data }
  // Implement simplest version that satisfies core requirement
  processed <- apply_transformation(input_data, config.transformation_type)
  RETURN processed
END

# ============================================================
# PHASE 4: INCREMENTAL TESTING
# ============================================================
fixture_input <- create_representative_fixture()
test_config <- { transformation_type: "standard", threshold: 0.5 }
result <- primary_function({ input_data: fixture_input, config: test_config })

ASSERT result IS_NOT NULL
ASSERT result.size > 0
ASSERT result MATCHES expected_schema

# ============================================================
# PHASE 5: VALIDATION ADDITION
# ============================================================
FUNCTION primary_function({ input_data, config }) -> { output_data }
  validate_input(input_data, config.expected_schema)
  processed <- apply_transformation(input_data, config.transformation_type)
  validate_output(processed, config.output_constraints)
  RETURN processed
END

FUNCTION validate_input({ data, schema }) -> { void }
  IF data IS NULL:
    RAISE ValueError("Input data cannot be null")
  IF NOT conforms_to_schema(data, schema):
    RAISE SchemaError("Input data does not match expected schema")
END

# ============================================================
# PHASE 6: ERROR HANDLING
# ============================================================
FUNCTION primary_function({ input_data, config }) -> { output_data }
  TRY:
    validate_input(input_data, config.expected_schema)
    processed <- apply_transformation(input_data, config.transformation_type)
    validate_output(processed, config.output_constraints)
    RETURN processed
  CATCH ValidationError AS e:
    log_error("Validation failed", e)
    RAISE ValidationError("Data validation failed: " + e.message)
  CATCH TransformationError AS e:
    log_error("Transformation failed", e)
    RAISE RuntimeError("Transformation error: " + e.message)
END

# ============================================================
# PHASE 7: DOCUMENTATION REFINEMENT
# ============================================================
FUNCTION primary_function({ input_data, config }) -> { output_data }
  """Apply configured transformation to input data with validation.
  
  Validates input data against expected schema, applies transformation
  based on config.transformation_type parameter, validates output meets
  constraints, and returns processed data. Handles errors gracefully with
  detailed error messages for debugging.
  
  Supported transformation types: "standard", "normalized", "encoded"
  
  Args:
    input_data: Structured data conforming to config.expected_schema
    config: Configuration object with:
      - transformation_type: Type of transformation ("standard", "normalized", "encoded")
      - expected_schema: Schema definition for input validation
      - output_constraints: Constraints for output validation
      - logging_enabled: Enable detailed logging (default: False)
    
  Returns:
    output_data: Transformed data meeting output_constraints
    
  Raises:
    ValueError: Input data is null or empty
    SchemaError: Input data does not conform to expected schema
    ValidationError: Output data violates output constraints
    RuntimeError: Transformation fails due to system error
    
  Example:
    config <- {
      transformation_type: "normalized",
      expected_schema: { columns: ["feature_1", "feature_2"], types: ["float", "float"] },
      output_constraints: { min_value: 0.0, max_value: 1.0 }
    }
    
    result <- primary_function({
      input_data: raw_data,
      config: config
    })
  """
  TRY:
    IF config.logging_enabled:
      log_info("Starting transformation", { type: config.transformation_type })
    
    validate_input(input_data, config.expected_schema)
    processed <- apply_transformation(input_data, config.transformation_type)
    validate_output(processed, config.output_constraints)
    
    IF config.logging_enabled:
      log_info("Transformation complete", { rows: processed.row_count })
    
    RETURN processed
  CATCH ValidationError AS e:
    log_error("Validation failed", e)
    RAISE ValidationError("Data validation failed: " + e.message)
  CATCH TransformationError AS e:
    log_error("Transformation failed", e)
    RAISE RuntimeError("Transformation error: " + e.message)
END
```

**Developers document template usage in responsibility table**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `module/component.ext` | `Component` | `primary_function` | Component transforms data via configured transformation | `config.transformation_type`, `config.expected_schema` | `TransformedData` |
| `module/component.ext` | `Component` | `validate_input` | Validator checks input via schema definition | `config.expected_schema` | `void` (raises on failure) |
| `module/component.ext` | `Component` | `validate_output` | Validator checks output via constraint rules | `config.output_constraints` | `void` (raises on failure) |

---

## Prompt_202601131200

```
is this how professional programmer/architect/tech lead would do to build software from scratch?
```

```
generate max LOD mermaid.js for "Universal Scaffolding Pseudocode Template", 
* Parent Node: Module
* Node: `Class/Object.Function/Method`
* Edge: Responsibility (S-V-O)
* Subgraph: Phase
```
## Problems and Diagnostics

**Common Scaffolding Issues**:
*   **Premature Implementation**: Implementing logic before stubs are verified.
    *   *Diagnostic*: Check if tests exist before logic code.
*   **Configuration Drift**: Hardcoded values persist after refinement.
    *   *Diagnostic*: grep for magic numbers/strings in implementation files.
*   **Scaffolding Rot**: Stubs remain unimplemented or diverge from documentation.
    *   *Diagnostic*: Run linter/type-checker on stubs.

**Diagnostic Checklist**:
1.  Are all public methods documented with docstrings?
2.  Do all stubs raise `NotImplementedError` or return placeholders?
3.  Is there a corresponding test file for every module?

## Token Sharing and Performance

**Context**:
Efficient rendering in dual-mode editors (Markdown + Canvas) requires sharing lexed tokens to avoid redundant processing.

**Directives**:
*   **Shared Lexing**: Lex markdown once, share tokens between Viewer, Editor, and Slide modes.
*   **Cache Invalidation**: Invalidate token cache only when source text changes.
*   **Semantic Rendering**: Use semantic HTML (`article`, `section`, `nav`) instead of generic `div`s for better accessibility and structure.
*   **Unified State**: Store tokens in a central store (e.g., Zustand) to be consumed by multiple components.

---

## Prompt_202601131200

### 01
```

adhere to `codebase-neutrality-guidelines.md`,
convert:

```
A programmer starting **from scratch, without AI/LLM help**, would scaffold `data_loader.py` in a very manual, incremental way — usually something like this:

---

### 🛠 Typical Steps

1. **Create the file**
   - Run `touch src/data_loader.py` or create it in their editor.

2. **Import essentials**
   - Think about what libraries are needed (e.g., `sqlite3`, `pandas`).
   - Add the imports at the top.

   ```python
   import sqlite3
   import pandas as pd
   ```

3. **Stub out functions**
   - Write empty function definitions with docstrings or comments to remind themselves of the purpose.

   ```python
   def load_from_sqlite(db_path, table_name):
       """Load data from SQLite into a DataFrame."""
       pass

   def validate_schema(df, expected_dtypes):
       """Check column count and dtypes."""
       pass

   def check_row_count(df, min_rows=1000):
       """Ensure DataFrame has at least min_rows samples."""
       pass

   def parse_target_variable(df, target_col="label"):
       """Verify target column contains only {0,1}."""
       pass
   ```

4. **Fill in logic incrementally**
   - Start with the simplest version (e.g., `load_from_sqlite` using `sqlite3.connect` and `pd.read_sql_query`).
   - Run small tests in a REPL or notebook to confirm it works.
   - Add error handling later.

5. **Validation functions**
   - For `validate_schema`, check `df.shape[1]` and loop through `df.dtypes`.
   - For `check_row_count`, use `len(df)`.
   - For `parse_target_variable`, check `df[target_col].unique()`.

6. **Iterative testing**
   - Write quick scripts or use Jupyter Notebook to call each function with sample data.
   - Adjust until the functions behave as expected.

7. **Refine with exceptions and docstrings**
   - Replace `pass` with `raise ValueError(...)` where needed.
   - Add clear docstrings for maintainability.

---

### 📄 Example of a Programmer’s First Draft
It would look rough and incomplete at first:

```python
import sqlite3
import pandas as pd

def load_from_sqlite(db_path, table_name):
    conn = sqlite3.connect(db_path)
    df = pd.read_sql_query(f"SELECT * FROM {table_name}", conn)
    conn.close()
    return df

def validate_schema(df, expected_dtypes):
    if df.shape[1] != 47:
        raise ValueError("Wrong number of columns")
    # TODO: check dtypes
    return True

def check_row_count(df, min_rows=1000):
    if len(df) < min_rows:
        raise ValueError("Not enough rows")
    return True

def parse_target_variable(df, target_col="label"):
    if not set(df[target_col].unique()).issubset({0,1}):
        raise ValueError("Invalid labels")
    return df[target_col]
```

---

### 🔑 Key Insight
Without AI help, programmers scaffold by:
- **Starting minimal** (imports + function stubs).
- **Iteratively testing** each function with sample data.
- **Gradually refining** with validation, error handling, and documentation.
```

into universal, neutral, project-agnostic `first-draft-code-to-codebase.md`
```

### 02
```
based on "Universal Scaffolding Pseudocode Template",
generate `scaffolding-implementation-guide.md` 


```markdown
# Scaffold-to-production: Step-by-step Implementation Guide

**Purpose**: Step-by-step implementation roadmap with LOD patterns for zero-experience candidates  
**Format**: Hierarchical tasks (m.n.o) with reasoning, outcomes, and excellent practices  
**Context**: Last-shot to make it production-ready

---

## How to Use This Guide

**Numbering System**:
- **m**: Phase number (1-7)
- **n**: Step number within phase
- **o**: Sub-step number within step (0 = main step)

**Priority Levels**:
- 🔴 **CRITICAL**: ...
- 🟡 **HIGH**: ...
- 🟢 **MEDIUM**: ...
- ⚪ **LOW**: Nice to have ...

**Work in Order**: Complete each phase before moving to next. Don't skip steps.

---

## Phase 1: File Creation & Imports (... minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------|-------------------------|---------|------------------------------|----------|
| **1.0.0** | **File Creation & Imports** | ...
...
| 7.n.o | ...
```
```

```
generate max LOD mermaid.js for "Scaffold-to-Production: Step-by-Step Implementation Guide", 
* Parent Node: Step
* Node: Sub-step
* Edge: Workflow
* Subgraph: Phase
```
