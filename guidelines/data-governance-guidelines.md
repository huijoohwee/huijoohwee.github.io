# Data Governance Guidelines

## Context
**Governance standards**: prevent data leaks to safeguard confidentiality, enforce ownership to guarantee accountability, track provenance to ensure traceability, manage lifecycles to maintain continuity, secure PII to protect privacy, audit access to strengthen oversight, validate schema compliance to uphold correctness, minimize duplication to preserve efficiency, and share tokens to enable controlled interoperability.  

## Intent
**Governance principles**: establish clear ownership to guarantee accountability, enforce immutable provenance to secure traceability, grant lease‑based access to maintain control, minimize retention to reduce risk, apply secure defaults to protect integrity, validate through schemas to ensure correctness, centralize policy to preserve consistency, automate auditing to strengthen oversight, and prevent redundant lexing to uphold efficiency.  

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
