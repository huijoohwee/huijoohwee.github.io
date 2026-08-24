---
title: "Skill Repository Map & CID Module"
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

# Skill Repository Map & CID Module

## Scope & Ownership

Owns the multi-repo CID framing and the repository map that assigns responsibility per repository.

This module is loaded on demand from [Skill Guidelines](./skill-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
