---
title: "System Design Mantras Module"
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

# System Design Mantras Module

## Scope & Ownership

Owns the three-beat mantra form for system design.

This module is loaded on demand from [System Design Guidelines](./system-design-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Three-Beat Mantra Form

Each line is a three-beat `Context; Intent; Directive` mantra:

- Accessibility; standardize semantic UI structure; forbid div soup for observability
- Accountability; bound contexts with ownership; forbid ambiguous responsibilities
- Adaptability; enable through event integration; forbid rigid coupling
- Aggregation; handle with timeout control; forbid unbounded waiting
- Agility; avoid monolithic structures; forbid tightly coupled systems
- Alerting; configure symptom-based monitoring; forbid cause-only alerts
- APIs; design with clear contracts; forbid implicit agreements
- Architecture; design distributed-first; forbid monolithic designs
- Async; cleanup tasks on unmount; forbid unmanaged subscriptions
- Auditing; track security events everywhere; forbid unlogged security actions
- Authentication; validate at edge; forbid bypassed authentication
- Authorization; enforce at service level; forbid centralized-only authorization
- Backoff; apply exponential retry; forbid fixed retry intervals
- Backpressure; apply capacity limits; forbid unbounded resource consumption
- Backward; maintain interface compatibility; forbid breaking API changes
- Batching; prevent layout thrashing; forbid interleaved DOM access
- Blue-green; enable deployment strategies; forbid risky single-version deployments
- Boundaries; define clear service limits; forbid unclear service scope
- Broker; route events via messaging; forbid direct service-to-service messaging
- Bulkhead; isolate failure domains; forbid cascading failures
- Caching; implement hierarchical layers; forbid single-layer caching
- Capacity; limit resource usage; forbid unbounded queues
- CDN; distribute static assets; forbid origin-only serving
- Chains; avoid deep synchronous calls; forbid deep synchronous dependencies
- Chaos; test failure scenarios; forbid untested failure modes
- Circuit; break on repeated failures; forbid retry storms
- Clarity; define schema contracts; forbid implicit schemas
- Cleanup; handle async lifecycle; forbid resource leaks
- Clients; enable integration via contracts; forbid undocumented APIs
- Compliance; ensure OWASP standards; forbid unvalidated input
- Complexity; limit GraphQL queries; forbid unbounded queries
- Computation; debounce heavy operations; forbid immediate recalculation
- Consistency; enforce cross-boundary correctness; forbid inconsistent distributed state
- Contexts; bound with explicit ownership; forbid shared context ambiguity
- Continuity; design for resilience under failure; forbid single points of failure
- Contracts; mediate via schemas; forbid implicit agreements
- Correlation; track distributed requests; forbid untraceable transactions
- Coupling; prevent synchronous dependencies; forbid tight synchronous dependencies
- Coverage; ensure CDN for static assets; forbid uncached static content
- Critical; identify trace paths; forbid unmonitored critical flows
- CRUD; map HTTP verbs systematically; forbid inconsistent verb usage
- Databases; own per service context; forbid shared databases across services
- DataLoader; batch resolver operations; forbid N+1 query patterns
- DDoS; deploy protection layers; forbid unprotected endpoints
- Dead Letter; queue failed processing; forbid lost failed messages
- Debounce; throttle user input processing; forbid immediate processing on every keystroke
- Debugging; instrument for observability; forbid opaque system behavior
- Decay; implement graceful degradation; forbid complete failure on dependency loss
- Decouple; separate layout from rendering; forbid tightly coupled pipelines
- Deduplication; process events idempotently; forbid duplicate processing
- Defense; apply multi-layer security; forbid single-layer protection
- Degradation; enable graceful fallback; forbid hard failures
- Denormalization; optimize read-heavy workloads; forbid normalized schemas for read-heavy loads
- Deployment; enable independent releases; forbid coupled deployment dependencies
- Depth; limit recursive call chains; forbid infinite loops
- Discoverability; provide hypermedia links; forbid link-free responses
- Distributed; design systems-first; forbid monolithic architectures
- Document Store; use for semi-structured data; forbid inappropriate storage choice
- Duration; track RED metrics; forbid unmonitored service metrics
- Edge; authenticate requests; forbid delayed authentication
- Encoding; sanitize output; forbid raw output rendering
- Encryption; secure data at rest/transit; forbid plaintext sensitive data
- Engineers; implement resilience patterns; forbid brittle implementations
- Errors; track RED metrics; forbid unmeasured error rates
- Event-driven; communicate asynchronously; forbid synchronous-only integration
- Events; integrate through messaging; forbid direct coupling
- Eventual; accept for distributed consistency; forbid strong consistency everywhere
- Explain; review database query plans; forbid unoptimized database access
- Expiry; configure TTL-based cache; forbid permanent cache entries
- Exponential; configure retry backoff; forbid linear retry patterns
- Failover; eliminate single points; forbid single points of failure
- Failure; design for resilience; forbid brittle failure handling
- Field-level; encrypt sensitive PII; forbid unencrypted sensitive fields
- Filters; consume via topic selection; forbid broadcast-only messaging
- Force; decouple layout computation; forbid coupled computation/rendering
- Frontend; enforce performance patterns; forbid unoptimized UI updates
- Gateway; route via API layer; forbid direct service access
- GDPR; comply with data privacy; forbid non-compliant data flows
- Graceful; degrade under load; forbid hard failures
- Graph; use for relationship-heavy data; forbid relational DB for graph workloads
- GraphQL; implement schema-first; forbid ad-hoc GraphQL design
- Hangs; prevent via time-slicing; forbid blocking main thread
- HATEOAS; enable API discoverability; forbid static endpoint lists
- Headers; version APIs systematically; forbid URL-only versioning
- Hierarchical; implement caching layers; forbid flat cache architectures
- Horizontal; scale via distribution; forbid vertical-only scaling
- HTTP; map verbs to operations; forbid non-standard verb usage
- Hypermedia; provide for navigation; forbid link-free APIs
- Idempotency; generate keys for retry safety; forbid non-idempotent retries
- Impact; prioritize user-facing alerts; forbid infrastructure-only alerts
- Incremental; update on window resize; forbid complete re-layout on resize
- Independent; enable service deployment; forbid coupled releases
- Indexes; tune database performance; forbid unindexed frequent queries
- Infinite; prevent loop conditions; forbid unbounded recursion
- Input; validate and sanitize; forbid unvalidated user input
- Instrumentation; enable observability by default; forbid uninstrumented services
- Integration; define SLAs for all; forbid SLA-free integrations
- Integrity; protect through defense-in-depth; forbid single-layer security
- Interfaces; maintain backward compatibility; forbid breaking interface changes
- Invalidation; implement cache purging; forbid stale cache retention
- Isolation; apply bulkhead patterns; forbid shared resource pools
- Jank; eliminate via incremental updates; forbid blocking render updates
- Jitter; add to retry logic; forbid synchronized retries
- JSON; structure logs systematically; forbid unstructured logs
- Keys; generate for deduplication; forbid keyless retry processing
- Latency; monitor p99 thresholds; forbid unmonitored response times
- Layout; cache for performance; forbid recalculation on every update
- Layers; implement hierarchical caching; forbid single-layer caching
- Levels; configure log granularity; forbid single-level logging
- Lexing; share token processing; forbid duplicate parsers
- Limits; enforce query complexity; forbid unbounded query depth
- Links; provide hypermedia navigation; forbid static endpoint documentation only
- Listeners; throttle resize and scroll; forbid unthrottled handlers
- Load; balance via service mesh; forbid single-server routing
- Loading; test at 2x peak capacity; forbid untested peak scenarios
- Logs; structure with correlation IDs; forbid correlation-free logging
- Loops; prevent infinite recursion; forbid unbounded iteration
- Measurement; memoize text operations; forbid repeated expensive calculations
- Memoization; cache expensive utilities; forbid redundant expensive operations
- Mesh; route via service infrastructure; forbid direct service calls
- Messages; emit to broker; forbid direct service messaging
- Metrics; track RED per service; forbid unmonitored services
- Mode; cache layouts across switches; forbid recalculation on mode change
- Monitoring; implement comprehensive; forbid partial observability
- Monoliths; avoid for agility; forbid monolithic architectures
- mTLS; configure service mesh security; forbid plaintext service-to-service traffic
- Network; segment with zero-trust; forbid perimeter-only security
- Normalization; apply for write-heavy workloads; forbid denormalized write-heavy schemas
- Observability; instrument by default; forbid opaque service behavior
- Object Storage; use for binary artifacts; forbid database-stored large binaries
- Offload; move heavy tasks to workers; forbid main-thread blocking operations
- OOM; prevent via streaming; forbid loading entire datasets into memory
- Orchestration; coordinate via API Gateway; forbid uncoordinated service calls
- Output; encode to prevent XSS; forbid raw user content rendering
- Ownership; assign data per context; forbid shared data ownership
- OWASP; apply security standards; forbid non-compliant implementations
- p99; monitor latency thresholds; forbid unmeasured tail latencies
- Patterns; select storage by access; forbid convenience-based storage choice
- Peak; test at 2x expected load; forbid untested high-load scenarios
- Performance; enforce frontend patterns; forbid unoptimized critical paths
- Perimeter; deploy WAF and DDoS protection; forbid unprotected edge
- PII; encrypt at field level; forbid plaintext sensitive data
- Pipelines; implement CI/CD automation; forbid manual release processes
- Plans; review query explain results; forbid unoptimized queries
- Pools; bound thread resources; forbid unbounded thread creation
- Position; cache node/edge layouts; forbid recalculation on every render
- Privacy; comply with GDPR requirements; forbid non-compliant data handling
- Processing; handle events idempotently; forbid duplicate event handling
- Protection; deploy DDoS defenses; forbid unprotected public endpoints
- Publisher; emit to message broker; forbid direct subscriber notification
- Purge; implement event-driven cache; forbid manual cache clearing
- Queries; limit complexity in GraphQL; forbid unlimited query depth
- Queues; bound capacity; forbid unbounded queues
- Rate; track RED metrics; forbid unmeasured throughput
- RDBMS; use for transactional data; forbid RDBMS for document-heavy workloads
- Readability; use rectangular nodes; forbid complex node shapes in structured layouts
- Reads; denormalize for performance; forbid normalized read-heavy designs
- Real-time; provide via subscriptions; forbid polling-only patterns
- Rectangles; enforce for structured layouts; forbid varied shapes in hierarchical views
- Recursive; guard with depth limits; forbid unbounded recursion
- Redundancy; eliminate single failures; forbid single points of failure
- Refactor; remove redundant calculation; forbid duplicate calculation logic
- Registry; use for event schemas; forbid unversioned event schemas
- Reliability; secure through elimination; forbid unprotected critical components
- Rendering; optimize graph visualization; forbid coupled compute/render loops
- Request; embed correlation IDs; forbid untracked requests
- Resilience; design for failure; forbid brittle systems
- Resize; apply incremental updates; forbid complete re-layout on resize
- Resource; apply bulkhead isolation; forbid shared critical resources
- Response; aggregate with timeouts; forbid unbounded response waiting
- REST; implement resource-oriented; forbid RPC-style REST
- Restart; debounce simulation triggers; forbid immediate restart on every change
- Results; provide with correlation IDs; forbid ID-free responses
- Retry; configure with exponential backoff; forbid immediate retries
- Reuse; cache positions during updates; forbid unnecessary position recalculation
- Revision; key cache with awareness; forbid stale layout cache
- Robust; implement layout caching; forbid fragile cache invalidation
- Rollback; enable via blue-green deploys; forbid risky irreversible deployments
- Routing; balance via service mesh; forbid static routing tables
- Safety; generate idempotency keys; forbid unsafe retries
- Scalability; deploy independently; forbid monolithic scaling
- Schema; implement registry for events; forbid implicit event contracts
- Scroll; throttle event listeners; forbid unthrottled scroll listeners
- Security; apply defense-in-depth; forbid single-layer security
- Segmentation; apply zero-trust network; forbid flat network topology
- Semantic; standardize UI structure; forbid non-semantic markup
- Service; design stateless; forbid stateful service design
- Shapes; normalize node rendering; forbid inconsistent visualization
- Shared; prevent database coupling; forbid cross-service database sharing
- Shutdown; implement gracefully; forbid abrupt termination
- Simplicity; design stateless services; forbid unnecessary state management
- Simulation; debounce restarts; forbid restart on every parameter change
- Single; eliminate failure points; forbid unprotected critical paths
- SLA; define for all integrations; forbid undefined service levels
- SLI; monitor service level indicators; forbid unmeasured service levels
- SLO; track service level objectives; forbid SLO-free services
- Spans; implement distributed tracing; forbid untraced distributed calls
- Stability; reuse cached positions; forbid unstable non-topology updates
- Stateless; design services simply; forbid stateful service logic
- Storage; select by access pattern; forbid convenience-based storage decisions
- Streaming; prevent OOM with datasets; forbid full in-memory loading
- Strong; apply for transactional data; forbid eventual consistency for transactions
- Structure; logs as JSON; forbid unstructured log output
- Structured; use rectangular nodes; forbid organic shapes in hierarchies
- Subscribers; filter via topics; forbid broadcast consumption
- Subscriptions; provide real-time updates; forbid polling-only patterns
- Symptom; configure alerts on impact; forbid infrastructure-only monitoring
- Synchronous; limit chain depth; forbid synchronous cascades
- Systems; design distributed-first; forbid monolithic system design
- Tasks; cleanup on unmount; forbid unmanaged async operations
- Testing; validate via chaos engineering; forbid untested failure scenarios
- Throttle; apply to event listeners; forbid unthrottled high-frequency events
- Thrashing; prevent via batching; forbid interleaved read/write
- Timeout; configure at network boundaries; forbid unbounded waiting
- Time-slicing; prevent UI hangs; forbid long-running synchronous tasks
- Tokens; validate authentication; forbid unauthenticated access
- Tokens; share lexing infrastructure; forbid duplicate lexers
- Topology; skip layout on unchanged graphs; forbid unnecessary recalculation
- Topics; filter event consumption; forbid unfiltered consumption
- Tracing; implement distributed spans; forbid untraced service interactions
- Transactions; use RDBMS for ACID; forbid non-transactional storage for critical data
- Transmission; encrypt data transmission; forbid plaintext network traffic
- Transparency; guarantee via instrumentation; forbid opaque system behavior
- Tree; use rectangular nodes; forbid non-rectangular hierarchical nodes
- TTL; configure cache expiration; forbid permanent cache entries
- Tunable; apply for graph consistency; forbid fixed consistency models
- Unlimited; scale via object storage; forbid limited binary storage
- Unmount; cleanup async operations; forbid uncleaned subscriptions
- Updates; apply incrementally on resize; forbid full re-layout on window resize
- URLs; design resource-oriented; forbid verb-based URLs
- Validation; sanitize input; forbid unvalidated user input
- Verbs; map to CRUD operations; forbid inconsistent verb semantics
- Vertical; avoid scaling limitations; forbid vertical-only infrastructure
- View; reuse stable cached positions; forbid unstable rendering on non-changes
- Visualization; optimize graph rendering; forbid unoptimized visualization
- WAF; deploy web application firewall; forbid unprotected web endpoints
- Window; apply incremental resize updates; forbid full re-layout on window changes
- Workers; offload heavy computations; forbid blocking main thread with heavy work
- Workflows; orchestrate via event bus; forbid direct service orchestration
- Workloads; select storage by pattern; forbid pattern-agnostic storage choice
- Wrapping; memoize text utilities; forbid repeated text measurement
- Write-through; apply on cache updates; forbid delayed cache updates
- Writes; normalize for performance; forbid denormalized write-intensive designs
- XSS; prevent via output encoding; forbid unencoded user content
- Zero-trust; segment network security; forbid perimeter-only security model

---
