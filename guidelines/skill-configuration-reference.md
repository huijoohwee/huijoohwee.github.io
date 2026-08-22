---
title: "Skill Configuration Reference Module"
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

# Skill Configuration Reference Module

## Scope & Ownership

Owns the lookup surfaces: the quick reference and the full configuration reference.

This module is loaded on demand from [Skill Guidelines](./skill-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
