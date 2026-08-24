---
title: "System Design Domain Directives Module"
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
parent: "System Design Guidelines"
parent_version: "1.0.0"
---

# System Design Domain Directives Module

## Scope & Ownership

Owns the per-domain directive sets: core, frontend performance, architecture patterns, data, API, security, and observability.

This module is loaded on demand from [System Design Guidelines](./system-design-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Core Directives

### Core System Principles

**Architects design distributed-first architectures**
- Architects build stateless services
- Architects implement event-driven communication
- Architects establish schema-mediated contracts
- Architects make systems observable by default

**Architects establish bounded contexts**
- Architects define clear service boundaries
- Architects enable independent deployment
- Architects assign data ownership
- Architects maintain backward-compatible interfaces
- Architects standardize semantic UI structure for observability and accessibility

**Engineers enforce frontend performance & stability**
- Engineers debounce heavy computations on user input
- Engineers throttle resize and scroll listeners
- Engineers debounce simulation restarts
- Engineers cleanup async tasks on unmount
- Engineers prevent layout thrashing via read/write batching
- Engineers prevent Out-of-Memory (OOM) by streaming large datasets
- Engineers avoid infinite loops by guarding recursive calls with depth limits
- Engineers prevent UI hangs by offloading heavy tasks to web workers or using time-slicing
- Engineers implement robust layout caching to skip expensive re-computations on resize
- Engineers enforce view-stability by reusing cached positions during non-topology updates

---

---

## Frontend Performance & Visualization Directives

**Engineers optimize graph visualization rendering**
- Engineers implement node/edge position caching (store-based) to persist layouts across mode switches
- Engineers implement robust layout caching with revision-aware keys (layer:mode:fm:revision) to avoid stale layouts
- Engineers skip initial layout calculation when topology is unchanged and cache is valid (>95% coverage)
- Engineers decouple layout computation (Dagre/Force) from rendering loop (D3/Canvas)
- Engineers decouple computing-flow propagation from renderer DOM state; graph/registry helpers compute connected values, while renderer panels display and edit canonical fields
- Engineers enforce rectangular node shapes for structured layouts (Mermaid/Tree) to maximize readability
- Engineers normalize disparate node types (Stadium/Cylinder) to uniform rectangles for layout consistency
- Engineers implement incremental updates for window resizing instead of full re-layout to eliminate jank
- Engineers memoize expensive text measurement and wrapping utilities to reduce layout overhead
- Engineers refactor and remove redundant calculation logic to streamline the rendering pipeline
- Engineers consolidate duplicate field/port surfaces by schema path; one semantic Storyboard Widget key maps to one editable KTV row when the field and port describe the same value

**Engineers implement resilience patterns**
- Engineers enable graceful degradation
- Engineers deploy circuit breakers
- Engineers configure retry with exponential backoff
- Engineers apply bulkhead isolation
- Engineers implement token sharing to avoid redundant lexing

---

---

## System Architecture Patterns Directives

### Service Orchestration

**From request to response**: API Gateway → authenticates request via token validation → routes to service mesh using load balancing → orchestrates workflow through event bus → aggregates responses with timeout handling → returns unified result with correlation ID.

### Event-Driven Integration

**Pattern**: Publisher → emits events to message broker → subscribers consume via topic filters → process idempotently using deduplication keys → update state with eventual consistency.

**Engineers satisfy event-driven requirements**:
- Engineers implement schema registry for event contracts
- Engineers configure dead letter queues for failed processing
- Engineers embed correlation IDs for distributed tracing
- Engineers generate idempotency keys for retry safety

---

---

## Data Architecture Directives

### Storage Strategy

**Architects select storage by access pattern, not convenience**
- Architects denormalize for read-heavy workloads
- Architects normalize for write-heavy workloads

| Pattern | Use Case | Consistency | Scalability |
|---------|----------|-------------|-------------|
| RDBMS | Transactional data | Strong | Vertical |
| Document Store | Semi-structured entities | Eventual | Horizontal |
| Graph DB | Relationship-heavy | Tunable | Horizontal |
| Object Storage | Binary artifacts | Eventual | Unlimited |

### Caching Layers

**Engineers implement hierarchical caching**
- **Hierarchy**: CDN → API Gateway cache → Application cache → Database query cache

**Engineers configure cache invalidation strategies**
- Engineers implement event-driven purge
- Engineers configure TTL-based expiry
- Engineers apply write-through on updates

---

---

## API Design Principles Directives

### RESTful Contracts

**API designers implement RESTful patterns**:
- Designers create resource-oriented URLs (`/users/{id}/posts`)
- Designers map HTTP verbs to CRUD operations
- Designers provide hypermedia links (HATEOAS) for discoverability
- Designers version via headers (`Accept: application/vnd.api+json; version=2`)

### GraphQL Patterns

**API designers implement GraphQL best practices**:
- Designers develop schema-first
- Designers implement resolver batching/caching (DataLoader)
- Designers enforce query complexity limits
- Designers provide subscription for real-time updates

---

---

## Security Architecture Directives

**Security engineers implement defense in depth**:
- **Perimeter**: Engineers deploy WAF, DDoS protection, rate limiting
- **Network**: Engineers configure service mesh mTLS, zero-trust segmentation
- **Application**: Engineers ensure OWASP compliance, input validation, output encoding
- **Data**: Engineers enable encryption at rest/transit, field-level encryption for PII

**Security Pattern**: Authenticate at edge → authorize at service → audit everywhere

---

---

## Observability Requirements Directives

**SREs implement three observability pillars**:
- **Metrics**: SREs track RED (Rate, Errors, Duration) per service | SREs monitor SLI/SLO
- **Logs**: SREs structure as JSON | SREs embed correlation IDs | SREs configure log levels (ERROR, WARN, INFO, DEBUG)
- **Traces**: SREs implement distributed tracing spans | SREs identify critical paths

**SREs configure symptom-based alerts**
- SREs prioritize user impact alerts over cause-based alerts (disk full)

---
