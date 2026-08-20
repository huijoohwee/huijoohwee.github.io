# System Design Guidelines

## Overview

**Distributed systems**: deploy services independently to maximize scalability, design for resilience under failure to ensure continuity, enforce cross-boundary consistency to preserve correctness, instrument observability for debugging to guarantee transparency, and apply defense-in-depth security to protect integrity.

**Team guidelines**: avoid monoliths to sustain agility, prevent synchronous coupling to reduce fragility, eliminate single points of failure to secure reliability, define schema contracts to uphold clarity, integrate through events to enable adaptability, and bound contexts with explicit ownership to guarantee accountability.

**System design principles**: architect distributed-first systems to maximize scalability, design stateless services to preserve simplicity, communicate through events to enable adaptability, bound contexts with backward-compatible interfaces to maintain stability, degrade gracefully with circuit breakers to ensure resilience, apply strategic caching and storage choices to optimize performance, enforce multi-layer defense with zero-trust to secure integrity, and instrument comprehensive observability to guarantee transparency.

## Long-Horizon Agent System Directives

- Message gateway; accept durable tasks through one bounded ingress; forbid scattered ad-hoc run starters.
- Memory; persist run state, trace, and artifacts in one native owner; forbid copied external memory layouts or stale parallel stores.
- Tools and skills; register capabilities through explicit contracts; forbid hidden provider-specific tool branches.
- Subagents; scope roles to planner, worker, verifier, and synthesizer contracts; forbid unbounded autonomous loops.
- Sandbox; write generated artifacts into a reviewable workspace; forbid direct renderer mutation from tool output.
- Review gate; require parser, graph, rich-media, and cost/trace proof before completion; forbid silent success.
- External inspiration; cite DeerFlow only for high-level long-horizon concepts or optional gateway use; forbid copied code, prompts, topology, skills, or architecture.

---

## Context—Intent—Directive (CID) Framework

### Definition
- **Context**: focus domain of concern
- **Intent**: desired principle or guiding goal
- **Directive**: explicit prohibition or required safeguard

### Sorting
Each line/column is organized alphabetically (A→Z) for clarity and neutrality.

---

## Three-Beat Mantra Form

Owned by [System Design Mantras Module](./system-design-mantras.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Context—Intent—Directive Table

Owned by [System Design CID Table Module](./system-design-cid-table.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Core Directives

Owned by [System Design Domain Directives Module](./system-design-domain-directives.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Frontend Performance & Visualization Directives

Owned by [System Design Domain Directives Module](./system-design-domain-directives.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## System Architecture Patterns Directives

Owned by [System Design Domain Directives Module](./system-design-domain-directives.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Data Architecture Directives

Owned by [System Design Domain Directives Module](./system-design-domain-directives.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## API Design Principles Directives

Owned by [System Design Domain Directives Module](./system-design-domain-directives.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Security Architecture Directives

Owned by [System Design Domain Directives Module](./system-design-domain-directives.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Observability Requirements Directives

Owned by [System Design Domain Directives Module](./system-design-domain-directives.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Anti-Pattern Guards

**Architects avoid prohibited system patterns**:

❌ Distributed monoliths (shared databases across services) → ✅ Bounded contexts with data ownership  
❌ Synchronous chains >3 hops → ✅ Event-driven async patterns  
❌ Implicit contracts (no schema definitions) → ✅ Schema-mediated contracts  
❌ Single points of failure → ✅ Redundancy and failover  
❌ Unbounded queues/thread pools → ✅ Capacity limits and backpressure  
❌ Renderer-local recomputation of graph data → ✅ Shared compute helpers with bounded propagation
❌ Duplicate UI rows for one semantic field/port → ✅ Schema-path keyed row consolidation

---

## System Validation Checklist

**Architects execute architecture validation**:
- [ ] Architects verify services independently deployable
- [ ] Architects confirm all integrations have SLAs defined
- [ ] Architects document failure modes (chaos engineering tested)
- [ ] Architects ensure data flows comply with GDPR/privacy requirements

**Performance engineers execute performance validation**:
- [ ] Engineers conduct load testing at 2x expected peak
- [ ] Engineers verify p99 latency <500ms for critical paths
- [ ] Engineers review database queries with explain plans
- [ ] Engineers confirm CDN coverage for static assets
- [ ] Engineers verify computing-flow renderers reuse shared connected-value helpers and avoid renderer-local recomputation loops

**SREs execute resilience validation**:
- [ ] SREs configure circuit breakers on external dependencies
- [ ] SREs implement retry logic with jitter
- [ ] SREs set timeouts at all network boundaries
- [ ] SREs verify graceful shutdown implemented

---

## Role—Action—Outcome

**Role: System Architect**  
→ Action: designs distributed-first architectures, establishes bounded contexts, selects storage patterns, defines service boundaries, ensures backward compatibility  
→ Outcome: produces scalable system designs enabling independent deployment and resilience

**Role: Backend Engineer**  
→ Action: implements stateless services, configures event-driven integration, builds caching layers, develops API contracts, handles timeouts and retries  
→ Outcome: delivers resilient services supporting distributed workflows

**Role: API Designer**  
→ Action: creates RESTful/GraphQL contracts, implements hypermedia links, enforces versioning, optimizes resolver batching, limits query complexity  
→ Outcome: establishes clear, versioned contracts enabling client integration

**Role: Security Engineer**  
→ Action: deploys defense-in-depth layers, configures mTLS, ensures OWASP compliance, implements encryption, establishes zero-trust segmentation  
→ Outcome: secures systems through multi-layer protection and audit trails

**Role: Site Reliability Engineer (SRE)**  
→ Action: implements observability pillars, configures alerting, tests chaos scenarios, validates resilience patterns, monitors SLI/SLO  
→ Outcome: maintains system reliability through proactive monitoring and incident response

**Role: Performance Engineer**  
→ Action: conducts load testing, analyzes latency profiles, reviews query plans, optimizes caching, tunes database indexes  
→ Outcome: ensures system meets performance requirements under peak load

**Role: Data Architect**  
→ Action: selects storage patterns by access requirements, designs denormalization strategies, plans consistency models, establishes data ownership  
→ Outcome: optimizes data layer for scalability and query performance

**Role: DevOps Engineer**  
→ Action: implements CI/CD pipelines, configures service mesh, manages schema registries, deploys monitoring infrastructure, enables blue-green deployments  
→ Outcome: enables reliable, automated deployment and rollback procedures

---

## Mantra Application

**"CID frames system design, SRP isolates service concerns, RAO aligns engineering responsibilities, SVO clarifies architectural semantics"**

- **CID frames**: Establishes scope (distributed system architecture), purpose (resilience + scalability + security), rules (bounded contexts + event-driven patterns + observability)
- **SRP isolates**: Ensures each service handles single bounded context, each layer addresses focused concern (caching vs storage vs security)
- **RAO aligns**: Maps architects, backend engineers, API designers, security engineers, SREs, performance engineers, data architects, DevOps to their system deliverables
- **SVO clarifies**: Expresses all operations (architects design boundaries, engineers implement resilience, SREs monitor metrics) with grammatical precision enabling accountability and clear architectural communication
