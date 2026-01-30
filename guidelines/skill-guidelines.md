# Skill Guidelines: Multi-Repo Orchestration with System Design Principles

## Overview

This document integrates multi-repo orchestration patterns with system design principles to guide coordinated changes across distributed repository architectures. It establishes how distributed system design principles apply to multi-repository development workflows in domain-agnostic, reusable contexts.

---

## Core Philosophy

**Multi-repo systems**: coordinate changes independently to maximize agility, design for backward compatibility to ensure continuity, enforce contract-first interfaces to preserve correctness, instrument verification at boundaries to guarantee integration, and apply defense-in-depth validation to protect integrity.

**Development guidelines**: avoid monolithic changes to sustain agility, prevent synchronous dependencies to reduce fragility, eliminate circular references to secure reliability, define schema contracts to uphold clarity, integrate through stable exports to enable adaptability, and bound contexts with explicit ownership to guarantee accountability.

---

## CID Framework for Multi-Repo Development

### Context—Intent—Directive Mantras

Each guideline follows the three-beat `Context; Intent; Directive` pattern:

- Accountability; bound contexts with ownership; forbid ambiguous repository responsibilities
- Adaptability; enable through stable exports; forbid rigid cross-repo coupling
- Agility; maintain independent deployability; forbid tightly coupled repository changes
- APIs; design with clear package contracts; forbid implicit export agreements
- Architecture; design package-first; forbid monolithic implementations
- Backward; maintain interface compatibility; forbid breaking export changes
- Boundaries; define clear package limits; forbid unclear package scope
- Chains; avoid deep dependency trees; forbid deep cross-repo dependencies
- Clarity; define schema contracts; forbid implicit data formats
- Clients; enable integration via exports; forbid undocumented package APIs
- Configuration; externalize repository parameters; forbid hardcoded repository names
- Consistency; enforce cross-boundary correctness; forbid inconsistent shared state
- Contexts; bound with explicit ownership; forbid shared context ambiguity
- Contracts; mediate via schemas; forbid implicit agreements
- Coupling; prevent synchronous dependencies; forbid tight package dependencies
- Datasets; process data universally; forbid repository-specific data logic
- Deployment; enable independent releases; forbid coupled deployment dependencies
- Domains; operate repository-agnostically; forbid domain assumptions
- Events; integrate through messages; forbid direct coupling
- Exports; maintain stable surfaces; forbid undocumented breaking changes
- Identifiers; drive via configuration; forbid project name hardcoding
- Interfaces; maintain backward compatibility; forbid breaking interface changes
- Isolation; apply boundary patterns; forbid shared resource pools
- Metadata; orchestrate via schemas; forbid schema-free integration
- Migration; stage breaking changes; forbid simultaneous multi-repo breaks
- Modules; export minimal surfaces; forbid exposing internals
- Neutrality; preserve repository independence; forbid repository coupling
- Ownership; assign clear repository roles; forbid distributed responsibility
- Packages; version explicitly; forbid implicit version coupling
- Paths; abstract repository locations; forbid absolute paths
- Projects; operate project-agnostically; forbid project-specific code
- Schemas; define shared formats; forbid format drift
- SSOT; choose canonical sources; forbid duplicate truth
- Testing; verify at boundaries; forbid untested integrations
- Types; align across boundaries; forbid type duplication with drift
- Universality; preserve cross-domain applicability; forbid narrow implementations
- Verification; prove integration works; forbid deployment without validation
- Versioning; maintain compatibility; forbid breaking changes without migration

---

## Repository Map and Responsibilities

### Bounded Contexts

**Host Application Repository**
- **Role**: Integration point and primary deployment artifact
- **Responsibilities**: Coordinate package consumption, implement host-level integration, enforce application contracts
- **Dependencies**: Consumes feature packages via dependency management
- **Ownership**: Application behavior, integration testing, deployment orchestration
- **Configuration**: Define via `HOST_REPO_PATH` environment variable or configuration file

**UI/Component Package Repository**
- **Role**: UI component library and feature package
- **Responsibilities**: Export stable component APIs, maintain rendering logic, provide feature implementations
- **Exports**: Components, features, types, utilities
- **Ownership**: UI patterns, component logic, feature workflows
- **Configuration**: Define via `COMPONENT_PACKAGE_PATH` or package configuration

**Domain Feature Package Repository**
- **Role**: Domain-specific feature library
- **Responsibilities**: Export domain integrations, provide specialized logic, handle domain datasets
- **Exports**: Domain components, utilities, data handlers
- **Ownership**: Domain functionality, domain calculations, domain logic
- **Configuration**: Define via `FEATURE_PACKAGE_PATH` or package configuration

**Validation/Testing Repository**
- **Role**: Testing fixtures and validation artifacts
- **Responsibilities**: Provide test inputs, maintain validation artifacts, support verification
- **Ownership**: Test data, validation scenarios, fixture management
- **Configuration**: Define via `TEST_FIXTURES_PATH` or test configuration

**Documentation/Schema Repository**
- **Role**: Single source of truth for schemas and guidelines
- **Responsibilities**: Define canonical schemas, document contracts, provide reference implementations
- **Ownership**: Schema definitions, API documentation, architectural guidelines
- **Configuration**: Define via `SCHEMA_DOCS_PATH` or documentation configuration

### Repository Identification Pattern

Repositories are identified via configuration rather than hardcoded names:

```yaml
# Example: repository-config.yaml
repositories:
  host:
    path: ${HOST_REPO_PATH}
    type: application
    role: integration
  
  packages:
    - path: ${UI_PACKAGE_PATH}
      type: package
      role: components
    
    - path: ${DOMAIN_PACKAGE_PATH}
      type: package
      role: domain-features
  
  support:
    - path: ${TEST_FIXTURES_PATH}
      type: testing
      role: validation
    
    - path: ${SCHEMA_DOCS_PATH}
      type: documentation
      role: ssot
```

---

## Operating Principles

### Contract-First Design

**Principle**: Define or validate the interface boundary before changing internals.

**Application**:
- Identify the contract surface (exports, types, JSON schemas, settings models)
- Document the contract in the SSOT (docs repository)
- Validate backward compatibility before implementation
- Update consuming code only after contract is stable

**Directive**: Forbid implementation changes before contract validation.

### Single Source of Truth (SSOT)

**Principle**: Choose one canonical source for shared types/schemas and reference it consistently.

**Application**:
- Schema definitions → Documentation repository (configured via `SCHEMA_DOCS_PATH`)
- Package exports → Owning package (configured per package)
- Integration contracts → Host application (configured via `HOST_REPO_PATH`)
- Test fixtures → Testing repository (configured via `TEST_FIXTURES_PATH`)

**Configuration-Driven SSOT**:
```yaml
# Example: ssot-config.yaml
ssot:
  schemas:
    repository: ${SCHEMA_DOCS_PATH}
    location: /schemas
  
  contracts:
    repository: ${HOST_REPO_PATH}
    location: /contracts
  
  types:
    shared: ${SCHEMA_DOCS_PATH}/types
    package_specific: ${PACKAGE_PATH}/src/types
  
  fixtures:
    repository: ${TEST_FIXTURES_PATH}
    location: /fixtures
```

**Directive**: Forbid duplicate definitions across repositories; use configuration to locate canonical sources.

### Minimal Blast Radius

**Principle**: Prefer additive changes; gate breaking changes behind compatibility adapters.

**Application**:
- Add new exports alongside old ones
- Implement adapters for format migrations
- Deprecate before removing
- Version breaking changes explicitly

**Directive**: Forbid simultaneous breaking changes across multiple repositories.

### Cross-Repo Safety

**Principle**: Avoid circular dependencies; keep package exports stable and explicit.

**Application**:
- Maintain unidirectional dependency flow (host consumes packages)
- Export only public APIs
- Document all exported surfaces
- Use semantic versioning for packages

**Directive**: Forbid circular package dependencies.

### Verification as Part of Change

**Principle**: Every cross-repo change must include a verification path that proves the integration still works.

**Application**:
- Run type checking in affected packages
- Execute integration tests in host
- Manual verification of affected UI flows
- Document verification steps

**Directive**: Forbid deployment without integration verification.

---

## Standard Workflow

### 1. Discover + Bound The Change

**Engineers identify change scope**:
- Determine user-visible behavior impact
- Locate involved surfaces (UI, parsing, schema, export, geospatial)
- Identify contract boundaries (exports, shared types, JSON shapes, settings schemas)
- Map dependency direction (package → host or host → package)

**Engineers document affected repositories**:
- List all repositories requiring changes
- Identify the primary repository (where behavior is owned)
- Map dependency relationships
- Determine change propagation order

**Directive**: Forbid proceeding without complete scope identification.

### 2. Decide The Change Strategy

**Engineers select appropriate strategy**:

**Additive Extension** (Preferred):
- Add new fields/exports while preserving old behavior
- Implement alongside existing functionality
- Deprecate old approach gradually
- Remove only after migration complete

**Compatibility Layer** (For Format Changes):
- Introduce adapter supporting old + new formats
- Implement roundtrip conversion
- Version data structures explicitly
- Test both paths thoroughly

**Breaking Change** (When Required):
- Stage in two steps: (1) add new, (2) migrate, then (3) remove old
- Coordinate across all affected repositories
- Provide migration guide
- Version bump appropriately

**Directive**: Forbid unplanned breaking changes.

### 3. Implement Per-Repo with Tight Interfaces

**Package Engineers implement changes**:
- Keep repository-local concerns internal
- Export only required public APIs
- Maintain backward compatibility
- Document breaking changes

**Host Engineers consume package changes**:
- Update imports after package changes stable
- Test integration at boundaries
- Verify type alignment
- Validate runtime behavior

**Data Engineers ensure format compatibility**:
- Maintain roundtrip conversion
- Version JSON formats explicitly
- Test format migration paths
- Document schema changes in SSOT

**Directive**: Forbid exposing internal implementation details.

### 4. Verify In The Right Place

**Engineers execute layered verification**:

**Package Level** (Feature Packages):
```bash
# Navigate to package via configuration
cd ${PACKAGE_REPO_PATH}
npm run typecheck
npm run lint          # If configured
npm run test          # If available
```

**Host Level** (Application Repository):
```bash
# Navigate to host via configuration
cd ${HOST_REPO_PATH}
npm test              # CI test suite
npm run lint          # Code quality
npm run typecheck     # Type safety
npm run dev           # Manual verification
```

**Engineers verify affected flows**:
- Test integration boundaries
- Validate runtime behavior
- Check UI rendering (if applicable)
- Confirm data persistence (if applicable)

**Directive**: Forbid skipping verification steps.

### 5. Stabilize + Prevent Regression

**Engineers add appropriate tests**:
- Unit tests in owning repository
- Integration tests at boundaries
- Type tests for contract validation
- Regression tests for bug fixes

**Engineers document changes**:
- Update CHANGELOG in affected packages
- Document breaking changes
- Provide migration examples
- Update API documentation in SSOT

**Directive**: Forbid deployment without test coverage.

---

## Cross-Repo Compatibility Checklist

**Architects verify integration integrity**:
- [ ] Exports remain stable or host updated in lockstep
- [ ] Types align across repository boundaries
- [ ] No duplicated "same" types with drift
- [ ] Data formats maintain backward compatibility
- [ ] Breaking changes explicitly versioned
- [ ] Settings/schema changes reflected in generators and consumers
- [ ] Build scripts pass in host and affected packages
- [ ] Type checking succeeds in all repositories
- [ ] Integration tests pass in host
- [ ] Manual verification completed for affected UI flows

**Engineers confirm deployment readiness**:
- [ ] All verification steps completed
- [ ] Dependencies updated in correct order
- [ ] Documentation updated in SSOT
- [ ] Migration path documented (if breaking change)
- [ ] Rollback plan established

---

## Design Pattern Application

### Bounded Contexts Pattern

**Application**: Each repository owns a specific domain:
- Component package owns UI and rendering concerns
- Domain package owns domain-specific concerns
- Host application owns integration and application concerns
- Documentation repository owns schema and documentation concerns

**Configuration-Driven Boundaries**:
```yaml
bounded_contexts:
  ui_components:
    repository: ${COMPONENT_PACKAGE_PATH}
    domain: [ui, rendering, components]
  
  domain_features:
    repository: ${DOMAIN_PACKAGE_PATH}
    domain: [domain_logic, calculations, datasets]
  
  integration:
    repository: ${HOST_REPO_PATH}
    domain: [application, integration, orchestration]
  
  schemas:
    repository: ${SCHEMA_DOCS_PATH}
    domain: [schemas, contracts, documentation]
```

**Directive**: Forbid cross-cutting concerns spanning multiple repositories without explicit contract.

### Event-Driven Integration Pattern

**Application**: Packages communicate through well-defined exports:
- Package changes emit type-safe exports
- Host consumes through stable import contracts
- Changes propagate through dependency graph
- Breaking changes require explicit migration

**Directive**: Forbid implicit coupling between packages.

### Defense in Depth Pattern

**Application**: Validation occurs at multiple layers:
- Type checking in packages
- Integration tests in host
- Runtime validation at boundaries
- Manual verification of critical flows

**Directive**: Forbid single-layer validation.

---

## Common Scenarios and Patterns

### Scenario 1: Add New Feature to Component Package

**Change Flow**:
1. Update component package renderer/logic
2. Export new feature from package
3. Update host application to consume feature
4. Run type checking in package
5. Run integration tests in host
6. Verify behavior in running application

**Pattern**: Package extension → host integration → verification

**Configuration**:
```yaml
affected_repos:
  - type: package
    path: ${COMPONENT_PACKAGE_PATH}
    changes: [renderer, exports]
  - type: host
    path: ${HOST_REPO_PATH}
    changes: [integration, tests]
```

### Scenario 2: Fix Domain-Specific Bug

**Change Flow**:
1. Reproduce issue in host application
2. Trace into domain package interactions
3. Fix root cause in domain package
4. Update exports if necessary
5. Verify fix in host application
6. Add regression test in appropriate repository

**Pattern**: Host reproduction → package fix → integration verification

**Configuration**:
```yaml
affected_repos:
  - type: host
    path: ${HOST_REPO_PATH}
    actions: [reproduce, verify]
  - type: package
    path: ${DOMAIN_PACKAGE_PATH}
    actions: [fix, test]
```

### Scenario 3: Add New Schema Field

**Change Flow**:
1. Update schema SSOT in documentation repository
2. Update parsers/validators in packages
3. Update generators in packages
4. Update UI surfaces in host
5. Add roundtrip test
6. Verify data migration path

**Pattern**: Schema definition → implementation across layers → integration test

**Configuration**:
```yaml
affected_repos:
  - type: documentation
    path: ${SCHEMA_DOCS_PATH}
    changes: [schema_definition]
  - type: package
    paths: 
      - ${COMPONENT_PACKAGE_PATH}
      - ${DOMAIN_PACKAGE_PATH}
    changes: [parsers, validators, generators]
  - type: host
    path: ${HOST_REPO_PATH}
    changes: [ui_surfaces, integration_tests]
```

### Scenario 4: Breaking API Change

**Change Flow**:
1. Document migration path in SSOT
2. Add new API in package (alongside old)
3. Update host to consume new API
4. Verify integration works
5. Deprecate old API
6. Remove old API in next major version

**Pattern**: Parallel implementation → migration → deprecation → removal

**Configuration**:
```yaml
migration:
  phase_1:
    - repository: ${PACKAGE_PATH}
      action: add_new_api
    - repository: ${SCHEMA_DOCS_PATH}
      action: document_migration
  phase_2:
    - repository: ${HOST_REPO_PATH}
      action: migrate_to_new_api
  phase_3:
    - repository: ${PACKAGE_PATH}
      action: deprecate_old_api
  phase_4:
    - repository: ${PACKAGE_PATH}
      action: remove_old_api
      version: major_bump
```

---

## Role—Action—Outcome for Multi-Repo Development

**Role: Repository Architect**  
→ Action: defines package boundaries, establishes export contracts, selects dependency patterns, maps repository responsibilities, ensures backward compatibility  
→ Outcome: produces scalable repository designs enabling independent development and integration

**Role: Package Engineer**  
→ Action: implements stable exports, maintains type safety, builds feature modules, develops API contracts, handles versioning  
→ Outcome: delivers reliable packages supporting host integration

**Role: Integration Engineer**  
→ Action: coordinates cross-repo changes, validates boundary contracts, implements compatibility layers, manages migrations, verifies integration  
→ Outcome: ensures seamless integration across repository boundaries

**Role: Schema Designer**  
→ Action: defines canonical schemas, documents data formats, establishes SSOT, versions structures, plans migrations  
→ Outcome: establishes clear, versioned contracts enabling data exchange

**Role: Quality Engineer**  
→ Action: implements boundary tests, validates type alignment, tests integration flows, verifies compatibility, ensures regression coverage  
→ Outcome: maintains integration reliability through comprehensive verification

---

## Anti-Pattern Guards

**Architects avoid prohibited multi-repo patterns**:

❌ Hardcoded repository names/paths in code → ✅ Configuration-driven repository identification  
❌ Circular dependencies (packages importing from host) → ✅ Unidirectional dependency flow  
❌ Duplicate type definitions across repos → ✅ Single source of truth for shared types  
❌ Breaking changes without migration path → ✅ Staged rollout with compatibility layers  
❌ Implicit export contracts (no documentation) → ✅ Schema-mediated contracts in SSOT  
❌ Untested cross-repo changes → ✅ Verification at every boundary  
❌ Shared mutable state across packages → ✅ Immutable data flow through exports  
❌ Undocumented breaking changes → ✅ Explicit versioning and migration guides  
❌ Project-specific logic in reusable packages → ✅ Domain-agnostic, configurable implementations  
❌ Embedded repository paths → ✅ Externalized path configuration  

---

## Neutrality Principles for Multi-Repo Development

**Developers design repository-agnostic systems**:

**Identification**:
- Developers use configuration-driven repository paths
- Developers avoid hardcoded repository names
- Developers abstract repository locations via environment variables
- Developers document all repository assumptions in configuration schemas

**Adaptation**:
- Developers enable cross-project reusability
- Developers externalize project-specific parameters
- Developers maintain domain-agnostic algorithms
- Developers configure behavior via metadata

**Validation**:
- Developers test across multiple repository layouts
- Developers verify configuration-driven behavior
- Developers validate with diverse project structures
- Developers ensure zero hardcoded assumptions

**Example Configuration**:
```yaml
# .repo-config.yaml (project-agnostic template)
repositories:
  host:
    env_var: HOST_REPO_PATH
    default: ./app
    type: application
  
  packages:
    - env_var: UI_PACKAGE_PATH
      default: ./packages/ui
      type: component_library
    
    - env_var: DOMAIN_PACKAGE_PATH
      default: ./packages/domain
      type: feature_library
  
  support:
    - env_var: TEST_FIXTURES_PATH
      default: ./fixtures
      type: testing
    
    - env_var: SCHEMA_DOCS_PATH
      default: ./docs/schemas
      type: documentation
```

**Directive**: Forbid hardcoded repository identifiers; use configuration for all repository references.  

---

## Verification Requirements

**Engineers implement comprehensive verification**:

**Type Safety Verification**:
```bash
# In each affected package
npm run typecheck

# Verify type alignment across boundaries
```

**Integration Verification**:
```bash
# In host application
npm test              # Automated integration tests
npm run lint          # Code quality checks
npm run typecheck     # Type safety verification
npm run dev           # Manual UI verification
```

**Contract Verification**:
- Validate exports match documented contracts
- Verify backward compatibility maintained
- Test roundtrip data conversions
- Confirm schema alignment with SSOT

**Runtime Verification**:
- Execute affected user flows
- Verify data persistence
- Test error handling
- Validate performance characteristics

---

## Observability for Multi-Repo Changes

**Engineers instrument change visibility**:

**Metrics**:
- Track build success rates per repository
- Monitor type checking pass rates
- Measure integration test coverage
- Track deployment frequency

**Logs**:
- Document change scope in commit messages
- Log verification steps executed
- Record migration paths applied
- Track dependency updates

**Traces**:
- Map change propagation across repositories
- Identify critical integration paths
- Document verification chains
- Track deployment sequences

---

## Mantra Application

**"CID frames multi-repo design, Contract-First isolates change concerns, Verification-as-Part aligns engineering responsibilities, SSOT clarifies contract semantics, Configuration-Driven ensures neutrality"**

- **CID frames**: Establishes scope (multi-repository architecture), purpose (agility + stability + safety + neutrality), rules (bounded contexts + stable exports + verification + configuration)
- **Contract-First isolates**: Ensures each repository handles single bounded context, each export addresses focused interface, each contract is explicitly defined
- **Verification-as-Part aligns**: Maps package engineers, integration engineers, schema designers, quality engineers to their deliverables with comprehensive validation
- **SSOT clarifies**: Expresses all contracts (schema definitions, export specifications, integration requirements) with explicit documentation enabling accountability and clear integration
- **Configuration-Driven ensures**: Externalizes repository identification, abstracts project-specific details, enables universal reusability, prevents hardcoded assumptions, maintains domain-agnostic implementation

---

## Quick Reference

### Change Checklist

1. **Scope**: Identify affected repositories and contracts
2. **Strategy**: Choose additive/compatibility/breaking approach
3. **Implement**: Change packages first, then host
4. **Verify**: Type check packages, test host integration
5. **Stabilize**: Add tests, update documentation

### Verification Commands

```bash
# Package verification (configure PACKAGE_REPO_PATH)
cd ${PACKAGE_REPO_PATH} && npm run typecheck

# Host verification (configure HOST_REPO_PATH)
cd ${HOST_REPO_PATH} && npm test && npm run lint && npm run typecheck

# Manual verification
cd ${HOST_REPO_PATH} && npm run dev
```

### Configuration Template

```yaml
# multi-repo-config.yaml
repositories:
  host:
    path: ${HOST_REPO_PATH}
    commands:
      verify: ["npm test", "npm run lint", "npm run typecheck"]
      dev: "npm run dev"
  
  packages:
    - path: ${PACKAGE_1_PATH}
      commands:
        verify: ["npm run typecheck"]
    
    - path: ${PACKAGE_2_PATH}
      commands:
        verify: ["npm run typecheck", "npm run lint"]

verification:
  order: [packages, host]
  required: [typecheck, test]
  optional: [lint, manual]
```

### Documentation Updates

- Schema changes → Update schema repository (configured via `SCHEMA_DOCS_PATH`)
- Export changes → Update package README
- Breaking changes → Update CHANGELOG + migration guide
- Integration patterns → Update skill guidelines

---

## Universal Application Examples

These guidelines apply universally across technology stacks, domains, and project types:

### Example 1: JavaScript/TypeScript Ecosystem

**Repository Structure**:
```yaml
repositories:
  host: 
    path: ./app
    tech: [Vite, React]
  packages:
    - path: ./packages/ui
      tech: [React, TypeScript]
    - path: ./packages/api-client
      tech: [TypeScript, Axios]
```

**Application**: UI components package + API client package consumed by React application

### Example 2: Python Microservices

**Repository Structure**:
```yaml
repositories:
  host:
    path: ./api-gateway
    tech: [FastAPI, Python]
  packages:
    - path: ./packages/auth-service
      tech: [Python, JWT]
    - path: ./packages/data-models
      tech: [Pydantic, Python]
```

**Application**: Shared data models + auth service consumed by API gateway

### Example 3: Go Backend Services

**Repository Structure**:
```yaml
repositories:
  host:
    path: ./orchestrator
    tech: [Go]
  packages:
    - path: ./packages/db-connector
      tech: [Go, PostgreSQL]
    - path: ./packages/message-queue
      tech: [Go, RabbitMQ]
```

**Application**: Database connector + message queue packages consumed by orchestrator service

### Example 4: Java Enterprise Application

**Repository Structure**:
```yaml
repositories:
  host:
    path: ./main-application
    tech: [Spring Boot, Java]
  packages:
    - path: ./modules/business-logic
      tech: [Java]
    - path: ./modules/data-access
      tech: [JPA, Java]
```

**Application**: Business logic + data access modules consumed by Spring Boot application

### Example 5: Cross-Language Platform

**Repository Structure**:
```yaml
repositories:
  host:
    path: ./platform
    tech: [Node.js]
  packages:
    - path: ./packages/analytics-engine
      tech: [Python, NumPy]
    - path: ./packages/ui-components
      tech: [TypeScript, React]
    - path: ./packages/data-processor
      tech: [Rust]
```

**Application**: Polyglot package ecosystem with consistent integration contracts

**Key Insight**: The same principles (contract-first, SSOT, configuration-driven, verification) apply regardless of:
- Programming language
- Framework choice
- Domain (web apps, microservices, data pipelines, ML platforms)
- Team size or structure
- Deployment target (cloud, on-premise, edge)

---

## Configuration Reference

### Repository Configuration Schema

**Developers define repository configuration**:

```yaml
# multi-repo.config.yaml
version: "1.0"

# Repository identification
repositories:
  # Host application
  host:
    path: ${HOST_REPO_PATH:-./app}
    type: application
    role: integration
    commands:
      verify: ["npm test", "npm run lint", "npm run typecheck"]
      dev: "npm run dev"
      build: "npm run build"
    dependencies:
      - ${UI_PACKAGE_PATH}
      - ${DOMAIN_PACKAGE_PATH}
  
  # Feature packages
  packages:
    ui_components:
      path: ${UI_PACKAGE_PATH:-./packages/ui}
      type: component_library
      role: ui_rendering
      commands:
        verify: ["npm run typecheck"]
      exports:
        - components
        - types
        - utilities
    
    domain_features:
      path: ${DOMAIN_PACKAGE_PATH:-./packages/domain}
      type: feature_library
      role: domain_logic
      commands:
        verify: ["npm run typecheck", "npm run test"]
      exports:
        - features
        - handlers
        - types
  
  # Support repositories
  support:
    testing:
      path: ${TEST_FIXTURES_PATH:-./fixtures}
      type: testing
      role: validation
    
    documentation:
      path: ${SCHEMA_DOCS_PATH:-./docs}
      type: documentation
      role: ssot

# Single Source of Truth mapping
ssot:
  schemas:
    repository: documentation
    location: /schemas
  
  types:
    shared: documentation/types
    package_specific: ${PACKAGE_PATH}/src/types
  
  contracts:
    api: documentation/contracts
    integration: host/contracts

# Verification workflow
verification:
  order:
    - packages.ui_components
    - packages.domain_features
    - host
  
  required_checks:
    - typecheck
    - test
  
  optional_checks:
    - lint
    - build
    - manual

# Migration strategies
migration:
  breaking_changes:
    strategy: staged_rollout
    phases:
      - add_new_alongside_old
      - migrate_consumers
      - deprecate_old
      - remove_old_in_major_version
  
  compatibility:
    maintain: backward
    adapters: required
    version_bump: semantic

# Bounded contexts
contexts:
  ui:
    owner: packages.ui_components
    domain: [components, rendering, styling]
  
  domain:
    owner: packages.domain_features
    domain: [business_logic, calculations, datasets]
  
  integration:
    owner: host
    domain: [orchestration, application_logic, deployment]
  
  contracts:
    owner: support.documentation
    domain: [schemas, types, api_contracts]
```

### Environment Variable Template

**Developers configure via environment**:

```bash
# .env.example (project-agnostic template)
# Copy to .env and configure for your project

# Repository paths
HOST_REPO_PATH=./app
UI_PACKAGE_PATH=./packages/ui
DOMAIN_PACKAGE_PATH=./packages/domain
TEST_FIXTURES_PATH=./fixtures
SCHEMA_DOCS_PATH=./docs

# Verification settings
VERIFICATION_MODE=strict  # strict|relaxed
REQUIRE_ALL_CHECKS=true
SKIP_MANUAL_VERIFICATION=false

# Migration settings
ALLOW_BREAKING_CHANGES=false
MIGRATION_STRATEGY=staged  # staged|immediate
COMPATIBILITY_MODE=backward  # backward|forward|bidirectional
```

### Configuration Usage in Code

**Developers access configuration programmatically**:

```typescript
// config-loader.ts (domain-agnostic)
interface RepositoryConfig {
  path: string;
  type: 'application' | 'package' | 'testing' | 'documentation';
  role: string;
  commands?: {
    verify?: string[];
    dev?: string;
    build?: string;
  };
}

interface MultiRepoConfig {
  version: string;
  repositories: {
    host: RepositoryConfig;
    packages: Record<string, RepositoryConfig>;
    support: Record<string, RepositoryConfig>;
  };
  ssot: {
    schemas: { repository: string; location: string };
    types: { shared: string; package_specific: string };
    contracts: { api: string; integration: string };
  };
  verification: {
    order: string[];
    required_checks: string[];
    optional_checks: string[];
  };
}

// Load configuration with environment variable substitution
function loadConfig(configPath: string): MultiRepoConfig {
  const raw = readFileSync(configPath, 'utf-8');
  const config = yaml.parse(raw);
  
  // Substitute environment variables
  return substituteEnvVars(config, process.env);
}

// Get repository path by role
function getRepositoryPath(config: MultiRepoConfig, role: string): string {
  // Search in host
  if (config.repositories.host.role === role) {
    return config.repositories.host.path;
  }
  
  // Search in packages
  for (const pkg of Object.values(config.repositories.packages)) {
    if (pkg.role === role) {
      return pkg.path;
    }
  }
  
  // Search in support
  for (const support of Object.values(config.repositories.support)) {
    if (support.role === role) {
      return support.path;
    }
  }
  
  throw new Error(`Repository with role '${role}' not found in configuration`);
}

// Example usage
const config = loadConfig('./multi-repo.config.yaml');
const hostPath = config.repositories.host.path;
const uiPackagePath = getRepositoryPath(config, 'ui_rendering');
const schemaLocation = `${getRepositoryPath(config, 'ssot')}${config.ssot.schemas.location}`;
```

### Configuration Validation Schema

**Developers validate configuration correctness**:

```yaml
# config-schema.yaml (JSON Schema for validation)
$schema: "http://json-schema.org/draft-07/schema#"
type: object
required: [version, repositories, ssot, verification]
properties:
  version:
    type: string
    pattern: "^[0-9]+\\.[0-9]+$"
  
  repositories:
    type: object
    required: [host, packages]
    properties:
      host:
        $ref: "#/definitions/repository"
      packages:
        type: object
        additionalProperties:
          $ref: "#/definitions/repository"
      support:
        type: object
        additionalProperties:
          $ref: "#/definitions/repository"
  
  ssot:
    type: object
    required: [schemas, types, contracts]
  
  verification:
    type: object
    required: [order, required_checks]
    properties:
      order:
        type: array
        items:
          type: string
      required_checks:
        type: array
        items:
          type: string

definitions:
  repository:
    type: object
    required: [path, type, role]
    properties:
      path:
        type: string
      type:
        enum: [application, package, component_library, feature_library, testing, documentation]
      role:
        type: string
      commands:
        type: object
        properties:
          verify:
            type: array
            items:
              type: string
```

---

## Neutrality Validation Checklist

**Pre-Commit** (Required):
- [ ] Developers confirm zero hardcoded repository names/paths
- [ ] Developers verify configuration-driven repository identification
- [ ] Developers ensure algorithms accept configuration parameters
- [ ] Developers validate repository-agnostic implementation
- [ ] Developers test with multiple repository layouts

**Code Review** (Required):
- [ ] Reviewers audit for embedded repository assumptions
- [ ] Reviewers verify configuration-driven behavior
- [ ] Reviewers confirm schema/metadata usage for integration
- [ ] Reviewers validate path abstraction
- [ ] Reviewers check for project-specific logic in packages

**Integration Verification** (Required):
- [ ] Engineers confirm configuration files documented
- [ ] Engineers verify environment variable usage
- [ ] Engineers test across different project structures
- [ ] Engineers validate repository-agnostic deployment
- [ ] Engineers ensure migration guides reference configuration

---

## Conclusion

Successful multi-repo development requires disciplined application of system design principles to repository boundaries combined with neutrality and universality. By maintaining contract-first design, single sources of truth, minimal blast radius, cross-repo safety, configuration-driven identification, and comprehensive verification, teams can achieve both agility and stability in distributed codebases across any domain or project context.

The key is treating repository boundaries as service boundaries in a distributed system while maintaining domain-agnostic, reusable implementations: clear contracts, backward compatibility, explicit ownership, comprehensive observability, and configuration-driven behavior. This approach enables independent development while maintaining integration integrity across the entire system, regardless of the specific project domain or technology stack.

**Universal Application**: These guidelines apply equally to any multi-repository architecture—from microservices to modular monoliths, from JavaScript ecosystems to polyglot systems, from enterprise applications to open-source projects. The principles are technology-agnostic, domain-neutral, and project-independent by design.