# Document Template: Universal Technical Specification

## Design Mantras

```
- [ ] [Context A]; [core principle]; forbid [anti-pattern]
- [ ] [Context B]; [core principle]; forbid [anti-pattern]
- [ ] [Context C]; [core principle]; forbid [anti-pattern]
```

**Example**:
```
- [ ] Adaptability; enable customization; forbid hardcoded behavior
- [ ] Clarity; communicate explicitly; forbid implicit assumptions
- [ ] Efficiency; optimize critical paths; forbid wasteful operations
- [ ] Modularity; isolate responsibilities; forbid tight coupling
- [ ] Neutrality; abstract domain logic; forbid sector-specific code
- [ ] Reliability; handle failures gracefully; forbid silent errors
- [ ] Testability; enable verification; forbid untestable code
```

---

## Universal Design Principles

| Context             | Intent                              | Directive                                                                                      |
|---------------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Abstraction         | Separate concerns                   | - [ ] Define clear interfaces; hide implementation; forbid leaky abstractions                 |
| Atomicity           | Ensure operation completeness       | - [ ] Complete or rollback fully; forbid partial states                                       |
| Caching             | Optimize repeated access            | - [ ] Cache expensive computations; invalidate appropriately; forbid stale data               |
| Composition         | Build from components               | - [ ] Combine simple parts; enable reuse; forbid monolithic design                            |
| Configuration       | Externalize behavior                | - [ ] Define YAML/JSON schemas; document defaults; forbid embedded constants                  |
| Consistency         | Maintain uniform behavior           | - [ ] Apply patterns uniformly; document conventions; forbid arbitrary exceptions             |
| Decoupling          | Minimize dependencies               | - [ ] Use interfaces; inject dependencies; forbid tight coupling                              |
| Determinism         | Ensure reproducibility              | - [ ] Fix random seeds; normalize inputs; forbid non-deterministic behavior                   |
| Documentation       | Explain all decisions               | - [ ] Document rationale; provide examples; forbid undocumented magic                         |
| Encapsulation       | Hide internal details               | - [ ] Expose minimal APIs; version interfaces; forbid internal leakage                        |
| Error Handling      | Fail gracefully                     | - [ ] Validate inputs; return descriptive errors; forbid silent failures                      |
| Extensibility       | Support future growth               | - [ ] Design plugin points; version schemas; forbid closed architectures                      |
| Idempotence         | Guarantee safe re-runs              | - [ ] Produce same result; avoid side effects; forbid accumulation artifacts                  |
| Immutability        | Preserve data integrity             | - [ ] Copy before transform; avoid in-place edits; forbid source corruption                   |
| Instrumentation     | Enable observability                | - [ ] Emit structured logs; expose metrics; forbid black-box execution                        |
| Locality            | Bound scope                         | - [ ] Keep modules focused; single responsibility; forbid sprawling components                |
| Modularity          | Isolate responsibilities            | - [ ] Define clear boundaries; minimize coupling; forbid cross-concern mixing                 |
| Naming              | Use consistent conventions          | - [ ] Follow language standards; be descriptive; forbid cryptic abbreviations                 |
| Neutrality          | Abstract domain logic               | - [ ] Use general algorithms; configure specifics; forbid domain assumptions                  |
| Performance         | Optimize critical paths             | - [ ] Profile hot paths; target complexity; forbid premature optimization                     |
| Provenance          | Track data lineage                  | - [ ] Record sources; timestamp changes; forbid orphaned data                                 |
| Reusability         | Share common logic                  | - [ ] Extract utilities; parameterize functions; forbid copy-paste duplication                |
| Scalability         | Handle growth                       | - [ ] Design for volume; test limits; forbid O(n²) where avoidable                           |
| Security            | Protect against threats             | - [ ] Validate inputs; sanitize outputs; forbid injection vulnerabilities                     |
| Separation          | Divide concerns                     | - [ ] Layer by responsibility; forbid mixing presentation/business/data logic                 |
| Simplicity          | Prefer straightforward solutions    | - [ ] Choose simple over clever; forbid unnecessary complexity                                |
| Testability         | Enable automated verification       | - [ ] Inject dependencies; expose test hooks; forbid untestable code                          |
| Transparency        | Make behavior visible               | - [ ] Log decisions; expose state; forbid opaque operations                                   |
| Validation          | Verify all inputs                   | - [ ] Check preconditions; enforce invariants; forbid assumption-based processing             |
| Versioning          | Track evolution                     | - [ ] Namespace schemas; deprecate gracefully; forbid breaking changes without migration      |

---

## [System/Component] Architecture

**[Layer/Module] Stack**: [Component A] → [Component B] → [Component C] → [Component D]

**[Processing/Data] Flow**: [Stage 1] → [Stage 2] → [Stage 3] → [Stage 4]

**Design Principles**: [Principle 1] | [Principle 2] | [Principle 3] | [Principle 4]

### High-Level Components

- **[Component Category 1]**:
  - `[module/path]` implements [responsibility 1], [responsibility 2], and [responsibility 3].
- **[Component Category 2]**:
  - `[module/path]` transforms [input] into [output] via [mechanism].
- **[Component Category 3]**:
  - `[module/path]` coordinates [subsystem 1], [subsystem 2], and exposes [interface].

### Integration Bridge: [System A] → [System B]

| [System A Stage]            | [System B Equivalent]                    | Configuration Controls                                    |
|-----------------------------|------------------------------------------|-----------------------------------------------------------|
| [Stage 1]                   | [Mapped stage/component]                 | [Config param 1], [param 2], [param 3]                   |
| [Stage 2]                   | [Mapped stage/component]                 | [Config param 1], [param 2], [param 3]                   |
| [Stage 3]                   | [Mapped stage/component]                 | [Config param 1], [param 2], [param 3]                   |
| [Stage 4]                   | [Mapped stage/component]                 | [Config param 1], [param 2], [param 3]                   |

---

## [Layer/Module] Specifications

### [Layer/Module] N: [Name/Purpose]

**[From/To description]**: [Component] → [performs action] → [produces output] → [enables capability].

**[Algorithm/Pattern] Description**: [High-level description of how this layer/module works]

**Configuration Schema (core sections)**:

```yaml
[section_1]:
  scope: [module_local | system_global | deployment_configurable]
  type: [path | object | array | string | number | boolean]
  mutability: [runtime_configurable | deployment_configurable | immutable]
  validation: [validation rules]
  impact: [what this controls]

[section_2]:
  scope: [scope level]
  type: [data type]
  mutability: [mutability level]
  validation: [validation rules]
  impact: [what this controls]
```

**Interface Pattern**: `[function_name]([params])` → [action 1] → [action 2] → [returns output] → [complexity: O(n)]

**Design Compliance**:

| Context          | Intent                     | Directive                                                                                   | Module/Component | Class/Object | Function/Method | Dependency | Input                | Output              | Decision Logic                   |
|------------------|----------------------------|---------------------------------------------------------------------------------------------|------------------|--------------|-----------------|------------|----------------------|---------------------|----------------------------------|
| [Concern 1]      | [Desired outcome]          | - [ ] [Action verb] [object]; [outcome]; forbid [anti-pattern]                            | [module_name]    | [ClassName]  | [methodName]    | [lib]      | [input_desc]         | [output_desc]       | [algorithm/threshold]            |
| [Concern 2]      | [Desired outcome]          | - [ ] [Action verb] [object]; [outcome]; forbid [anti-pattern]                            | [module_name]    | [ClassName]  | [methodName]    | [lib]      | [input_desc]         | [output_desc]       | [algorithm/threshold]            |
| [Concern 3]      | [Desired outcome]          | - [ ] [Action verb] [object]; [outcome]; forbid [anti-pattern]                            | [module_name]    | [ClassName]  | [methodName]    | [lib]      | [input_desc]         | [output_desc]       | [algorithm/threshold]            |

---

## Component Responsibility Matrix

| Layer/Subsystem | Path/Module                    | Component           | Interface/Method        | Responsibility (S-V-O)                                                | Dependencies                    | Contracts                             | LOC    |
|-----------------|--------------------------------|---------------------|-------------------------|-----------------------------------------------------------------------|---------------------------------|---------------------------------------|--------|
| [Layer 1]       | `[path/to/module]`            | [ComponentName]     | `[methodName]`          | [Subject] [verb] [object] → [verb] [object] → [produces output]     | `[dep1]`, `[dep2]`              | [Contract description]                | ~[n]   |
| [Layer 2]       | `[path/to/module]`            | [ComponentName]     | `[methodName]`          | [Subject] [verb] [object] → [verb] [object] → [produces output]     | `[dep1]`, `[dep2]`              | [Contract description]                | ~[n]   |
| [Layer 3]       | `[path/to/module]`            | [ComponentName]     | `[methodName]`          | [Subject] [verb] [object] → [verb] [object] → [produces output]     | `[dep1]`, `[dep2]`              | [Contract description]                | ~[n]   |

---

## Dependency & Integration Standards

**Dependency Declaration**

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| [Dependency Type 1]  | [Management strategy]           | - [ ] [Declaration method]; [organization]; forbid [anti-pattern]                          |
| [Dependency Type 2]  | [Management strategy]           | - [ ] [Declaration method]; [organization]; forbid [anti-pattern]                          |
| [Dependency Type 3]  | [Management strategy]           | - [ ] [Declaration method]; [organization]; forbid [anti-pattern]                          |

**Integration Contracts**

- **[Contract Type 1]**:
  - Must [requirement 1].
  - [IDs/References] use [pattern/format] defined in [location].
- **[Contract Type 2]**:
  - Must include [field 1], [field 2], [field 3].
  - [Section name] defines [what it controls].

**Coupling Metrics**

- [Component A] is decoupled from [Component B]:
  - [Component B] only depends on [interface/schema], not [implementation detail].
  - [Configuration aspect] is attached via [mechanism], not [anti-pattern].

---

## Code Organization Framework

**Directory Structure (relevant subset)**:

```text
[project_name]/
├── [subsystem_1]/
│   ├── [module_a].ext
│   ├── [module_b].ext
│   └── [module_c].ext
├── [subsystem_2]/
│   ├── [subdir]/
│   │   ├── [module_d].ext
│   │   └── [module_e].ext
│   └── [module_f].ext
└── [docs]/
    └── [document_name].md
```

**Naming Conventions**

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| [Language A] Files   | Follow standards                | - [ ] Use [naming_convention]; [casing for types]; forbid [anti-pattern]                  |
| [Format A] Properties| Maintain consistency            | - [ ] Use [naming_convention]; [casing for fields]; forbid [anti-pattern]                 |
| [Config] Keys        | Align with standards            | - [ ] Use [naming_convention]; [nesting strategy]; forbid [anti-pattern]                  |
| Constants            | Signal immutability             | - [ ] Use [CONVENTION]; [placement strategy]; forbid [anti-pattern]                       |

**File Organization**

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| Module Size          | Maintain readability            | - [ ] Keep files under [N] LOC; split at boundaries; forbid monolithic files             |
| Function Length      | Enable comprehension            | - [ ] Limit functions to [N] lines; extract helpers; forbid deep nesting (>[N] levels)   |
| Import Organization  | Clarify dependencies            | - [ ] Group [category 1], [category 2], [category 3]; sort; forbid [anti-pattern]        |

---

## Testing & Quality Standards

**Test Coverage Metrics**

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| Unit Tests           | Validate individual functions   | - [ ] Test pure functions in isolation; mock I/O; forbid untested logic                   |
| Integration Tests    | Verify interactions             | - [ ] Test full pipelines; use realistic fixtures; forbid incomplete coverage             |
| [Test Type 3]        | [Test purpose]                  | - [ ] [Testing approach]; [validation method]; forbid [anti-pattern]                      |

**Test Categories**

- **[Category 1]**:
  - [Component/Module] can be exercised via [test approach].
- **[Category 2]**:
  - Full pipeline from [input] → [output] → [validation].

**Quality Gates**

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| [Output Type] Validation| Ensure compliance            | - [ ] Validate [aspect 1]/[aspect 2] structure; check [property]; forbid [anti-pattern]  |
| [Config Type] Validation| Prevent runtime errors       | - [ ] Parse early; validate required keys; forbid late-stage failures                     |
| [Quality Aspect]     | Enable [quality property]       | - [ ] [Validation approach]; [normalization]; forbid [anti-pattern]                       |

---

## Operational Configuration: Environment Wiring

**[System] Environment Variables**:

| Variable                          | Scope            | Default                            | Impact                                              |
|-----------------------------------|------------------|------------------------------------|-----------------------------------------------------|
| `[VAR_NAME_1]`                    | [scope]          | `[default_value]`                  | Controls [what aspect]                              |
| `[VAR_NAME_2]`                    | [scope]          | `[default_value]`                  | Controls [what aspect]                              |
| `[VAR_NAME_3]`                    | [scope]          | `[default_value]`                  | Controls [what aspect]                              |

**Artifact Generation**: `[artifact_1]` ([description]) | `[artifact_2]` ([description]) | `[artifact_3]` ([description])

**[Workflow] Integration**:

| Step | Action                                  | Command/Trigger                         | Artifact Consumer                  |
|------|----------------------------------------|------------------------------------------|-------------------------------------|
| 1    | [Action description]                   | [Command or manual action]               | [Consumer/System]                   |
| 2    | [Action description]                   | [Command or trigger]                     | [Consumer/System]                   |
| 3    | [Action description]                   | [Function/script call]                   | [Consumer/System]                   |
| 4    | [Action description]                   | [Validation method]                      | [Consumer/System]                   |
| 5    | [Action description]                   | [Update command]                         | [Consumer/System]                   |

| Context              | Intent                          | Directive                                                                                   | Module/Component  | Class/Object | Function/Method              | Dependency      | Input                        | Output                 | Decision Logic                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|-------------------|--------------|------------------------------|-----------------|------------------------------|------------------------|----------------------------------|
| Variable Resolution  | Map env to config paths         | - [ ] Read env variables; construct paths; forbid hardcoded locations                      | [ConfigModule]    | —            | [resolvePaths]               | [lib]           | [env_dict]                   | [path_strings]         | [resolution_algorithm]           |
| [Process] Invocation | Run [process] processor         | - [ ] Execute command; wait for completion; forbid silent failures                          | [ServerModule]    | —            | [runProcess]                 | [lib]           | [command]                    | [exit_code]            | [execution_pattern]              |
| Artifact Loading     | Fetch generated files           | - [ ] Fetch [format]; parse; validate; forbid partial loads                                | [ClientModule]    | —            | [loadArtifacts]              | [libs]          | [artifact_paths]             | [parsed_data]          | [fetch_and_parse_pattern]        |

---

## Data Flow

**Pipeline**: [Stage 1] → [Stage 2] → [Stage 3] → [Stage 4] → [Stage 5]

| Stage       | Input                          | Output                         | Responsibility                                              | Performance Consideration                    |
|-------------|--------------------------------|--------------------------------|-------------------------------------------------------------|----------------------------------------------|
| [Stage 1]   | [Input description]            | [Output description]           | [Component] [action] [result]                               | [Optimization strategy]                      |
| [Stage 2]   | [Input description]            | [Output description]           | [Component] [action] [result]                               | [Optimization strategy]                      |
| [Stage 3]   | [Input description]            | [Output description]           | [Component] [action] [result]                               | [Optimization strategy]                      |
| [Stage 4]   | [Input description]            | [Output description]           | [Component] [action] [result]                               | [Optimization strategy]                      |
| [Stage 5]   | [Input description]            | [Output description]           | [Component] [action] [result]                               | [Optimization strategy]                      |

| Context              | Intent                          | Directive                                                                                   | Module           | Function/Method              | Input                | Output                  | Decision Logic                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|------------------|------------------------------|----------------------|-------------------------|----------------------------------|
| [Flow Step 1]        | [Purpose]                       | - [ ] [Action]; [validation]; forbid [anti-pattern]                                        | [module_name]    | [functionName]               | [input_desc]         | [output_desc]           | [algorithm/pattern]              |
| [Flow Step 2]        | [Purpose]                       | - [ ] [Action]; [transformation]; forbid [anti-pattern]                                    | [module_name]    | [functionName]               | [input_desc]         | [output_desc]           | [algorithm/pattern]              |
| [Flow Step 3]        | [Purpose]                       | - [ ] [Action]; [computation]; forbid [anti-pattern]                                       | [module_name]    | [functionName]               | [input_desc]         | [output_desc]           | [algorithm/pattern]              |

---

## Design Decisions & Trade-offs

| Decision             | Rationale                          | Pros                                                  | Cons                                      | Mitigation                                    |
|----------------------|------------------------------------|-------------------------------------------------------|-------------------------------------------|-----------------------------------------------|
| [Decision 1]         | [Why this choice]                  | [Benefit 1], [Benefit 2]                             | [Limitation 1], [Limitation 2]            | [Mitigation strategy]                         |
| [Decision 2]         | [Why this choice]                  | [Benefit 1], [Benefit 2]                             | [Limitation 1], [Limitation 2]            | [Mitigation strategy]                         |
| [Decision 3]         | [Why this choice]                  | [Benefit 1], [Benefit 2]                             | [Limitation 1], [Limitation 2]            | [Mitigation strategy]                         |

---

## [System/Process] Directives

### [Category A] Directives

| Context              | Intent                          | Directive                                                                                   | Enforcement Mechanism                        |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------|
| [Concern 1]          | [Desired outcome]               | - [ ] [Action]; [constraint]; forbid [anti-pattern]                                        | [How enforced]                               |
| [Concern 2]          | [Desired outcome]               | - [ ] [Action]; [constraint]; forbid [anti-pattern]                                        | [How enforced]                               |
| [Concern 3]          | [Desired outcome]               | - [ ] [Action]; [constraint]; forbid [anti-pattern]                                        | [How enforced]                               |

### [Category B] Directives

| Context              | Intent                          | Directive                                                                                   | Enforcement Mechanism                        |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------|
| [Concern 1]          | [Desired outcome]               | - [ ] [Action]; [constraint]; forbid [anti-pattern]                                        | [How enforced]                               |
| [Concern 2]          | [Desired outcome]               | - [ ] [Action]; [constraint]; forbid [anti-pattern]                                        | [How enforced]                               |
| [Concern 3]          | [Desired outcome]               | - [ ] [Action]; [constraint]; forbid [anti-pattern]                                        | [How enforced]                               |

---

## Documentation Coverage

**[Document Category] Sources in `[automation_script]`**:

| Document                             | Purpose                                                  | Quality Gates           | Steward              |
|--------------------------------------|----------------------------------------------------------|-------------------------|----------------------|
| `[document-name].md`                 | [High-level purpose]                                     | [gate1], [gate2], [gate3]| [Role]              |
| `[document-name].md`                 | [High-level purpose]                                     | [gate1], [gate2], [gate3]| [Role]              |
| `[document-name].md`                 | [High-level purpose]                                     | [gate1], [gate2], [gate3]| [Role]              |

---

## Anti-Patterns (Forbidden)

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| [Anti-pattern 1]     | [Desired behavior]              | - [ ] [Correct approach]; [rationale]; forbid [specific anti-pattern]                     |
| [Anti-pattern 2]     | [Desired behavior]              | - [ ] [Correct approach]; [rationale]; forbid [specific anti-pattern]                     |
| [Anti-pattern 3]     | [Desired behavior]              | - [ ] [Correct approach]; [rationale]; forbid [specific anti-pattern]                     |
| [Anti-pattern 4]     | [Desired behavior]              | - [ ] [Correct approach]; [rationale]; forbid [specific anti-pattern]                     |
| [Anti-pattern 5]     | [Desired behavior]              | - [ ] [Correct approach]; [rationale]; forbid [specific anti-pattern]                     |

---

## Repository Health Checklist

**Structural Health**:

| Context              | Status | Directive                                                                                   |
|----------------------|--------|---------------------------------------------------------------------------------------------|
| [Health Aspect 1]    | [✓/✗]  | - [ ] [Requirement]; [validation]; forbid [violation]                                      |
| [Health Aspect 2]    | [✓/✗]  | - [ ] [Requirement]; [validation]; forbid [violation]                                      |

**Maintainability**:

| Context              | Status | Directive                                                                                   |
|----------------------|--------|---------------------------------------------------------------------------------------------|
| [Health Aspect 1]    | [✓/✗]  | - [ ] [Requirement]; [validation]; forbid [violation]                                      |
| [Health Aspect 2]    | [✓/✗]  | - [ ] [Requirement]; [validation]; forbid [violation]                                      |

**Operations**:

| Context              | Status | Directive                                                                                   |
|----------------------|--------|---------------------------------------------------------------------------------------------|
| [Health Aspect 1]    | [✓/✗]  | - [ ] [Requirement]; [validation]; forbid [violation]                                      |
| [Health Aspect 2]    | [✓/✗]  | - [ ] [Requirement]; [validation]; forbid [violation]                                      |

---

## Version Control Standards

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| [Version Aspect 1]   | [Purpose of versioning]         | - [ ] [Versioning strategy]; [documentation]; forbid [anti-pattern]                        |
| [Version Aspect 2]   | [Purpose of versioning]         | - [ ] [Versioning strategy]; [documentation]; forbid [anti-pattern]                        |
| [Version Aspect 3]   | [Purpose of versioning]         | - [ ] [Versioning strategy]; [documentation]; forbid [anti-pattern]                        |