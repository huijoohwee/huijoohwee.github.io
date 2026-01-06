# Schema Management Guidelines

## Overview

This document provides comprehensive guidelines for managing JSON-LD schemas within the JJNHM v3.0.0 framework, with enhanced support for WBSTCNVS (Web-Based Structured Text Canvas Conversion System) integration. These guidelines ensure consistency, quality, and maintainability across all schema files.

## Schema Structure Standards

### File Organization

#### Foundation Layer (Core Schemas)
- `base.jsonld` - Core vocabulary and fundamental classes
- `vocab.jsonld` - Namespace definitions and vocabulary mappings
- `jjnhm.jsonld` - JJNHM framework specifications
- `nqds.jsonld` - Data schema foundations and predicates

#### Operational Layer (Business Logic)
- `jdbl.jsonld` - Business logic patterns and directives
- `actions.jsonld` - Action definitions and operation patterns
- `wf.jsonld` - Workflow orchestration and process definitions
- `quality-validation.jsonld` - Quality assurance and validation frameworks
- `variables.jsonld` - Variable management and state definitions

#### Project-Specific Layer (Application Components)
- `project-components.jsonld` - React component semantic mappings
- `project-hooks.jsonld` - React hooks and Vue composables
- `project-modules.jsonld` - Module and service architecture
- `project-functions.jsonld` - Function definitions and operations
- `project-interfaces.jsonld` - TypeScript interface contracts
- `project-types.jsonld` - Type definitions and mappings
- `project-services.jsonld` - Service layer architecture
- `project-workflows.jsonld` - Workflow orchestration patterns
- `project-stores.jsonld` - State management definitions

### Schema Template Structure

```jsonld
{
  "@context": [
    "https://huijoohwee.github.io/schema/base.jsonld",
    {
      "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
      "dcterms": "http://purl.org/dc/terms/",
      "skos": "http://www.w3.org/2004/02/skos/core#",
      "wbstcnvs": "https://huijoohwee.github.io/schema/wbstcnvs.jsonld#"
    }
  ],
  "@id": "https://huijoohwee.github.io/schema/[schema-name].jsonld",
  "@type": "skos:ConceptScheme",
  "meta": {
    "title": "[Schema Title]",
    "description": "[Schema Description]",
    "version": "2.0.0",
    "created": "2025-01-09T00:00:00Z",
    "license": "MIT",
    "conformsTo": [
      "https://huijoohwee.github.io/schema/jjnhm.jsonld",
      "https://huijoohwee.github.io/schema/wbstcnvs.jsonld"
    ],
    "responsibilities": [
      "[responsibility-1]",
      "[responsibility-2]"
    ]
  },
  "@graph": [
    // Schema definitions
  ]
}
```

## WBSTCNVS Integration Requirements

### Namespace Integration

All schemas must include the WBSTCNVS namespace:

```jsonld
{
  "@context": [
    "https://huijoohwee.github.io/schema/base.jsonld",
    {
      "wbstcnvs": "https://huijoohwee.github.io/schema/wbstcnvs.jsonld#"
    }
  ]
}
```

### WBSTCNVS Properties

#### Synchronization Properties
- `wbstcnvs:syncDirection` - Direction of synchronization (bidirectional, canvas-to-code, code-to-canvas)
- `wbstcnvs:syncCapability` - Synchronization capabilities and features
- `wbstcnvs:conflictStrategy` - Conflict resolution strategy

#### Conversion Properties
- `wbstcnvs:conversionType` - Type of conversion operation
- `wbstcnvs:canvasType` - Canvas element type and classification

#### Example Implementation
```jsonld
{
  "@id": "project:BidirectionalSyncComponent",
  "@type": "project:Component",
  "rdfs:label": "BidirectionalSyncComponent",
  "dcterms:description": "Component for bidirectional canvas-code synchronization",
  "wbstcnvs:syncDirection": "bidirectional",
  "wbstcnvs:conflictStrategy": "intelligent-merge",
  "wbstcnvs:syncCapability": "real-time-sync",
  "ai:jjnhmLayer": "HBS",
  "ai:dmagPattern": "Module"
}
```

## JJNHM Layer Assignment

### Layer Definitions

#### HBS (Handlebars Schema)
- **Purpose**: Template and component layer
- **Usage**: React components, Vue components, UI elements
- **Pattern**: Visual and interactive elements

#### NQDS (N-Quads Data Schema)
- **Purpose**: Data and state management layer
- **Usage**: Hooks, stores, interfaces, types, variables
- **Pattern**: Data structures and state management

#### JDBL (JSON-LD JDBL)
- **Purpose**: Business logic and service layer
- **Usage**: Services, modules, workflows, business logic
- **Pattern**: Operations and orchestration

#### MMD (Mermaid Metadata)
- **Purpose**: Visualization and workflow layer
- **Usage**: Diagrams, visualizations, process flows
- **Pattern**: Visual representations and documentation

### DMAG Pattern Classification

#### Data
- **Usage**: State management, data structures, variables
- **Examples**: Stores, state objects, data models

#### Module
- **Usage**: Components, interfaces, types, reusable units
- **Examples**: React components, TypeScript interfaces

#### Action (Service)
- **Usage**: Functions, operations, services, business logic
- **Examples**: API services, utility functions, operations

#### Governance (Coordination)
- **Usage**: Workflows, orchestration, process management
- **Examples**: Workflow definitions, orchestration patterns

## Quality Standards

### Token Density Optimization

#### Target Metrics
- **Minimum**: ≥5.1 concepts per token
- **Optimal**: ≥6.0 concepts per token
- **Measurement**: Automated validation scripts

#### Optimization Techniques
1. **Active Verb Usage**: Use action-oriented language
2. **Semantic Compression**: Eliminate redundancy
3. **Structured Hierarchies**: Organize content logically
4. **Reference Patterns**: Use cross-references instead of duplication

### Performance Requirements

#### Parse Time Standards
- **Target**: ≤1ms per block
- **Maximum**: ≤5ms per schema file
- **Measurement**: Automated performance testing

#### File Size Limits
- **Foundation Layer**: ≤800 lines
- **Operational Layer**: ≤600 lines
- **Project Layer**: ≤400 lines

### Validation Requirements

#### JSON-LD Compliance
- Valid JSON-LD 1.1 syntax
- Proper context definitions
- Correct @id and @type usage

#### JJNHM Compliance
- Required layer assignment (`ai:jjnhmLayer`)
- Required DMAG pattern (`ai:dmagPattern`)
- Proper namespace usage

#### WBSTCNVS Integration
- WBSTCNVS namespace inclusion
- Appropriate property usage
- Canvas-code concept integration

## Maintenance Procedures

### Version Management

#### Semantic Versioning
- **MAJOR**: Breaking changes, incompatible API changes
- **MINOR**: New features, backward-compatible additions
- **PATCH**: Bug fixes, minor improvements

#### Change Documentation
- Update version in meta section
- Document changes in commit messages
- Maintain backward compatibility when possible

### Quality Assurance

#### Automated Validation
```bash
# JSON-LD format validation
node validate-jsonld.js

# WBSTCNVS integration check
node check-wbstcnvs-integration.js

# Token density measurement
node measure-token-density.js

# Performance benchmarking
node benchmark-parse-time.js
```

#### Manual Review Checklist
- [ ] Schema follows template structure
- [ ] WBSTCNVS properties are appropriate
- [ ] JJNHM layer assignment is correct
- [ ] DMAG pattern is properly applied
- [ ] Token density meets requirements
- [ ] File size is within limits
- [ ] Cross-references are valid

### Continuous Improvement

#### Performance Monitoring
- Regular token density assessments
- Parse time benchmarking
- Memory usage optimization
- Schema relationship analysis

#### Enhancement Opportunities
- Identify redundancy patterns
- Optimize semantic compression
- Improve cross-schema relationships
- Enhance WBSTCNVS integration

## Best Practices

### Schema Design
1. **Clarity**: Use descriptive labels and clear descriptions
2. **Consistency**: Follow established naming conventions
3. **Modularity**: Design for reusability and composition
4. **Efficiency**: Optimize for performance and maintainability

### WBSTCNVS Integration
1. **Semantic Alignment**: Ensure properties match intended functionality
2. **Conversion Mapping**: Map canvas elements to code structures appropriately
3. **Sync Strategy**: Choose appropriate synchronization patterns
4. **Conflict Resolution**: Implement robust conflict handling

### Documentation
1. **Inline Documentation**: Use clear descriptions for all elements
2. **Cross-References**: Link related concepts appropriately
3. **Examples**: Provide usage examples where helpful
4. **Maintenance Notes**: Document special considerations

## Troubleshooting

### Common Issues

#### Validation Failures
- **JSON-LD Syntax Errors**: Check bracket matching and comma placement
- **Context Issues**: Verify namespace definitions and imports
- **Reference Errors**: Ensure @id references are valid

#### Performance Issues
- **High Parse Time**: Reduce nesting depth and complexity
- **Large File Size**: Split into smaller, focused schemas
- **Low Token Density**: Eliminate redundancy and improve compression

#### Integration Problems
- **Missing WBSTCNVS Properties**: Add required namespace and properties
- **Incorrect Layer Assignment**: Review JJNHM layer guidelines
- **DMAG Pattern Mismatch**: Align pattern with actual functionality

### Resolution Strategies
1. **Automated Tools**: Use validation scripts for quick diagnosis
2. **Incremental Testing**: Test changes in isolation
3. **Peer Review**: Have colleagues review complex schemas
4. **Documentation Reference**: Consult this guide and JJNHM specifications

## Conclusion

These guidelines provide a comprehensive framework for managing JSON-LD schemas within the JJNHM v3.0.0 ecosystem with WBSTCNVS integration. Following these standards ensures consistency, quality, and maintainability across all schema files while enabling sophisticated canvas-code conversion and synchronization capabilities.