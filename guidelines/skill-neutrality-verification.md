---
title: "Skill Neutrality & Verification Module"
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

# Skill Neutrality & Verification Module

## Scope & Ownership

Owns the neutrality obligations and the proof obligations: neutrality principles, verification requirements, observability, and the neutrality checklist.

This module is loaded on demand from [Skill Guidelines](./skill-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
