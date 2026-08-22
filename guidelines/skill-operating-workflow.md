---
title: "Skill Operating Principles & Workflow Module"
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

# Skill Operating Principles & Workflow Module

## Scope & Ownership

Owns how work proceeds across repositories: operating principles, the standard workflow, and the cross-repo compatibility checklist.

This module is loaded on demand from [Skill Guidelines](./skill-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
