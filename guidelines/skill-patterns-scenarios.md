---
title: "Skill Patterns & Scenarios Module"
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
parent: "Skill Guidelines"
parent_version: "1.0.0"
---

# Skill Patterns & Scenarios Module

## Scope & Ownership

Owns applied guidance: design pattern application, common scenarios, and worked examples.

This module is loaded on demand from [Skill Guidelines](./skill-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
