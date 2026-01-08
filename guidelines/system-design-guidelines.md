# System Design Guidelines

## Context

- **Distributed systems**: independent service deployment | resilience under failure | cross-boundary consistency | observability for debugging | defense-in-depth security  

- **Team guidelines**: avoid monoliths | prevent synchronous coupling | eliminate single points of failure | schema contracts | event-driven integration | bounded contexts + explicit ownership


## Intent

**System design principles**: distributed-first architecture | stateless services | event-driven communication | bounded contexts + backward-compatible interfaces | graceful degradation + circuit breakers | strategic caching + storage choices | multi-layer defense + zero-trust | comprehensive observability

## Directives

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

**Engineers implement resilience patterns**
- Engineers enable graceful degradation
- Engineers deploy circuit breakers
- Engineers configure retry with exponential backoff
- Engineers apply bulkhead isolation

---

### System Architecture Patterns Directives

#### Service Orchestration

**From request to response**: API Gateway -> authenticates request via token validation -> routes to service mesh using load balancing -> orchestrates workflow through event bus -> aggregates responses with timeout handling -> returns unified result with correlation ID.

#### Event-Driven Integration

**Pattern**: Publisher -> emits events to message broker -> subscribers consume via topic filters -> process idempotently using deduplication keys -> update state with eventual consistency.

**Engineers satisfy event-driven requirements**:
- Engineers implement schema registry for event contracts
- Engineers configure dead letter queues for failed processing
- Engineers embed correlation IDs for distributed tracing
- Engineers generate idempotency keys for retry safety

---

### Data Architecture Directives

#### Storage Strategy

**Architects select storage by access pattern, not convenience**
- Architects denormalize for read-heavy workloads
- Architects normalize for write-heavy workloads

| Pattern | Use Case | Consistency | Scalability |
|---------|----------|-------------|-------------|
| RDBMS | Transactional data | Strong | Vertical |
| Document Store | Semi-structured entities | Eventual | Horizontal |
| Graph DB | Relationship-heavy | Tunable | Horizontal |
| Object Storage | Binary artifacts | Eventual | Unlimited |

#### Caching Layers

**Engineers implement hierarchical caching**
- **Hierarchy**: CDN -> API Gateway cache -> Application cache -> Database query cache

**Engineers configure cache invalidation strategies**
- Engineers implement event-driven purge
- Engineers configure TTL-based expiry
- Engineers apply write-through on updates

---

### API Design Principles Directives

#### RESTful Contracts

**API designers implement RESTful patterns**:
- Designers create resource-oriented URLs (`/users/{id}/posts`)
- Designers map HTTP verbs to CRUD operations
- Designers provide hypermedia links (HATEOAS) for discoverability
- Designers version via headers (`Accept: application/vnd.api+json; version=2`)

#### GraphQL Patterns

**API designers implement GraphQL best practices**:
- Designers develop schema-first
- Designers implement resolver batching/caching (DataLoader)
- Designers enforce query complexity limits
- Designers provide subscription for real-time updates

---

### Security Architecture Directives

**Security engineers implement defense in depth**:
- **Perimeter**: Engineers deploy WAF, DDoS protection, rate limiting
- **Network**: Engineers configure service mesh mTLS, zero-trust segmentation
- **Application**: Engineers ensure OWASP compliance, input validation, output encoding
- **Data**: Engineers enable encryption at rest/transit, field-level encryption for PII

**Security Pattern**: Authenticate at edge -> authorize at service -> audit everywhere

---

### Observability Requirements Directives

**SREs implement three observability pillars**:
- **Metrics**: SREs track RED (Rate, Errors, Duration) per service | SREs monitor SLI/SLO
- **Logs**: SREs structure as JSON | SREs embed correlation IDs | SREs configure log levels (ERROR, WARN, INFO, DEBUG)
- **Traces**: SREs implement distributed tracing spans | SREs identify critical paths

**SREs configure symptom-based alerts**
- SREs prioritize user impact alerts over cause-based alerts (disk full)

---

### Anti-Pattern Guards

**Architects avoid prohibited system patterns**:

❌ Distributed monoliths (shared databases across services) -> ✅ Bounded contexts with data ownership  
❌ Synchronous chains >3 hops -> ✅ Event-driven async patterns  
❌ Implicit contracts (no schema definitions) -> ✅ Schema-mediated contracts  
❌ Single points of failure -> ✅ Redundancy and failover  
❌ Unbounded queues/thread pools -> ✅ Capacity limits and backpressure  

---

### System Validation Checklist Directives

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

**SREs execute resilience validation**:
- [ ] SREs configure circuit breakers on external dependencies
- [ ] SREs implement retry logic with jitter
- [ ] SREs set timeouts at all network boundaries
- [ ] SREs verify graceful shutdown implemented

---

## Role—Action—Outcome

**Role: System Architect**  
-> Action: designs distributed-first architectures, establishes bounded contexts, selects storage patterns, defines service boundaries, ensures backward compatibility  
-> Outcome: produces scalable system designs enabling independent deployment and resilience

**Role: Backend Engineer**  
-> Action: implements stateless services, configures event-driven integration, builds caching layers, develops API contracts, handles timeouts and retries  
-> Outcome: delivers resilient services supporting distributed workflows

**Role: API Designer**  
-> Action: creates RESTful/GraphQL contracts, implements hypermedia links, enforces versioning, optimizes resolver batching, limits query complexity  
-> Outcome: establishes clear, versioned contracts enabling client integration

**Role: Security Engineer**  
-> Action: deploys defense-in-depth layers, configures mTLS, ensures OWASP compliance, implements encryption, establishes zero-trust segmentation  
-> Outcome: secures systems through multi-layer protection and audit trails

**Role: Site Reliability Engineer (SRE)**  
-> Action: implements observability pillars, configures alerting, tests chaos scenarios, validates resilience patterns, monitors SLI/SLO  
-> Outcome: maintains system reliability through proactive monitoring and incident response

**Role: Performance Engineer**  
-> Action: conducts load testing, analyzes latency profiles, reviews query plans, optimizes caching, tunes database indexes  
-> Outcome: ensures system meets performance requirements under peak load

**Role: Data Architect**  
-> Action: selects storage patterns by access requirements, designs denormalization strategies, plans consistency models, establishes data ownership  
-> Outcome: optimizes data layer for scalability and query performance

**Role: DevOps Engineer**  
-> Action: implements CI/CD pipelines, configures service mesh, manages schema registries, deploys monitoring infrastructure, enables blue-green deployments  
-> Outcome: enables reliable, automated deployment and rollback procedures

---

## Mantra Application

**"CID frames system design, SRP isolates service concerns, RAO aligns engineering responsibilities, SVO clarifies architectural semantics"**

- **CID frames**: Establishes scope (distributed system architecture), purpose (resilience + scalability + security), rules (bounded contexts + event-driven patterns + observability)
- **SRP isolates**: Ensures each service handles single bounded context, each layer addresses focused concern (caching vs storage vs security)
- **RAO aligns**: Maps architects, backend engineers, API designers, security engineers, SREs, performance engineers, data architects, DevOps to their system deliverables
- **SVO clarifies**: Expresses all operations (architects design boundaries, engineers implement resilience, SREs monitor metrics) with grammatical precision enabling accountability and clear architectural communication