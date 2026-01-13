# Data Governance Guidelines

## Context
**Governance standards**: prevent data leaks | enforce ownership | track provenance | manage lifecycles | secure PII | audit access | validate schema compliance | minimize duplication | token sharing

## Intent
**Governance principles**: clear ownership | immutable provenance | lease-based access | minimized retention | secure defaults | schema-driven validation | centralized policy | automated auditing | redundant lexing prevention

## Directives

### Token Sharing Directive
**Developers implement token sharing**
- Developers share tokenized data structures to avoid redundant lexing
- Developers reuse parsed tokens across viewer/editor modes
- Developers prevent re-parsing of unchanged content
- Developers maintain single source of truth for token data

### Ownership & Provenance
**Architects assign explicit data ownership**
- Architects define bounded contexts for data
- Architects track lineage from source to sink
- Architects enforce schema contracts at boundaries

### Security & Privacy
**Security engineers enforce data protection**
- Engineers encrypt sensitive data at rest and transit
- Engineers minimize PII collection
- Engineers implement lease-based access controls

### Lifecycle Management
**Data architects manage data lifecycle**
- Architects define retention policies
- Architects implement automated archival/deletion
- Architects ensure immutable audit logs

## Anti-Patterns
❌ Redundant parsing/lexing -> ✅ Token sharing
❌ Unowned data -> ✅ Explicit ownership
❌ Implicit schemas -> ✅ Schema validation
❌ Indefinite retention -> ✅ Lifecycle policies
