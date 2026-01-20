# System Design Guidelines

## Overview

**Distributed systems**: deploy services independently to maximize scalability, design for resilience under failure to ensure continuity, enforce cross-boundary consistency to preserve correctness, instrument observability for debugging to guarantee transparency, and apply defense-in-depth security to protect integrity.

**Team guidelines**: avoid monoliths to sustain agility, prevent synchronous coupling to reduce fragility, eliminate single points of failure to secure reliability, define schema contracts to uphold clarity, integrate through events to enable adaptability, and bound contexts with explicit ownership to guarantee accountability.

**System design principles**: architect distributed-first systems to maximize scalability, design stateless services to preserve simplicity, communicate through events to enable adaptability, bound contexts with backward-compatible interfaces to maintain stability, degrade gracefully with circuit breakers to ensure resilience, apply strategic caching and storage choices to optimize performance, enforce multi-layer defense with zero-trust to secure integrity, and instrument comprehensive observability to guarantee transparency.

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

## Context—Intent—Directive Table

Each row is a universal, neutral, project-agnostic one-liner mantra: `Context | Intent | Directive`

| Context             | Intent                              | Directive                                                                                      |
|---------------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Accessibility       | Standardize semantic UI structure   | - [ ] Use semantic HTML; standardize structure; forbid div soup for observability            |
| Accountability      | Bound contexts with ownership       | - [ ] Assign clear ownership; guarantee accountability; forbid ambiguous responsibilities     |
| Adaptability        | Enable through event integration    | - [ ] Integrate via events; enable adaptability; forbid rigid coupling                        |
| Aggregation         | Handle with timeout control         | - [ ] Aggregate with timeouts; handle responses; forbid unbounded waiting                     |
| Agility             | Avoid monolithic structures         | - [ ] Sustain agility; avoid monoliths; forbid tightly coupled systems                        |
| Alerting            | Configure symptom-based monitoring  | - [ ] Prioritize user impact alerts; configure symptomatically; forbid cause-only alerts      |
| APIs                | Design with clear contracts         | - [ ] Implement RESTful/GraphQL patterns; design contracts; forbid implicit agreements        |
| Architecture        | Design distributed-first            | - [ ] Architect distributed-first; maximize scalability; forbid monolithic designs            |
| Async               | Cleanup tasks on unmount            | - [ ] Clean up async tasks; prevent leaks; forbid unmanaged subscriptions                     |
| Auditing            | Track security events everywhere    | - [ ] Audit everywhere; track events; forbid unlogged security actions                        |
| Authentication      | Validate at edge                    | - [ ] Authenticate at edge; validate tokens; forbid bypassed authentication                   |
| Authorization       | Enforce at service level            | - [ ] Authorize at service; enforce permissions; forbid centralized-only authorization        |
| Backoff             | Apply exponential retry             | - [ ] Configure exponential backoff; apply retry; forbid fixed retry intervals                |
| Backpressure        | Apply capacity limits               | - [ ] Bound queues/pools; apply backpressure; forbid unbounded resource consumption           |
| Backward            | Maintain interface compatibility    | - [ ] Preserve backward compatibility; maintain stability; forbid breaking API changes        |
| Batching            | Prevent layout thrashing            | - [ ] Batch read/write operations; prevent thrashing; forbid interleaved DOM access           |
| Blue-green          | Enable deployment strategies        | - [ ] Implement blue-green deploys; enable rollback; forbid risky single-version deployments  |
| Boundaries          | Define clear service limits         | - [ ] Establish bounded contexts; define boundaries; forbid unclear service scope             |
| Broker              | Route events via messaging          | - [ ] Use message brokers; route events; forbid direct service-to-service messaging           |
| Bulkhead            | Isolate failure domains             | - [ ] Apply bulkhead isolation; contain failures; forbid cascading failures                   |
| Caching             | Implement hierarchical layers       | - [ ] Cache hierarchically; optimize performance; forbid single-layer caching                 |
| Capacity            | Limit resource usage                | - [ ] Set capacity limits; bound resources; forbid unbounded queues                           |
| CDN                 | Distribute static assets            | - [ ] Use CDN for statics; distribute content; forbid origin-only serving                     |
| Chains              | Avoid deep synchronous calls        | - [ ] Limit sync chains <3 hops; avoid coupling; forbid deep synchronous dependencies         |
| Chaos               | Test failure scenarios              | - [ ] Conduct chaos engineering; test failures; forbid untested failure modes                 |
| Circuit             | Break on repeated failures          | - [ ] Deploy circuit breakers; prevent cascades; forbid retry storms                          |
| Clarity             | Define schema contracts             | - [ ] Uphold clarity; define contracts; forbid implicit schemas                               |
| Cleanup             | Handle async lifecycle              | - [ ] Cleanup on unmount; handle lifecycle; forbid resource leaks                             |
| Clients             | Enable integration via contracts    | - [ ] Provide clear contracts; enable integration; forbid undocumented APIs                   |
| Compliance          | Ensure OWASP standards              | - [ ] Apply OWASP compliance; ensure security; forbid unvalidated input                       |
| Complexity          | Limit GraphQL queries               | - [ ] Enforce query complexity limits; prevent abuse; forbid unbounded queries                |
| Computation         | Debounce heavy operations           | - [ ] Debounce heavy computations; optimize input handling; forbid immediate recalculation    |
| Consistency         | Enforce cross-boundary correctness  | - [ ] Preserve correctness; enforce consistency; forbid inconsistent distributed state        |
| Contexts            | Bound with explicit ownership       | - [ ] Define bounded contexts; assign ownership; forbid shared context ambiguity              |
| Continuity          | Design for resilience under failure | - [ ] Ensure continuity; design for failure; forbid single points of failure                  |
| Contracts           | Mediate via schemas                 | - [ ] Establish schema contracts; mediate integration; forbid implicit agreements             |
| Correlation         | Track distributed requests          | - [ ] Embed correlation IDs; track requests; forbid untraceable transactions                  |
| Coupling            | Prevent synchronous dependencies    | - [ ] Reduce fragility; prevent coupling; forbid tight synchronous dependencies               |
| Coverage            | Ensure CDN for static assets        | - [ ] Confirm CDN coverage; ensure distribution; forbid uncached static content               |
| Critical            | Identify trace paths                | - [ ] Trace critical paths; identify bottlenecks; forbid unmonitored critical flows           |
| CRUD                | Map HTTP verbs systematically       | - [ ] Map verbs to CRUD; implement systematically; forbid inconsistent verb usage             |
| Databases           | Own per service context             | - [ ] Assign data ownership; prevent sharing; forbid shared databases across services         |
| DataLoader          | Batch resolver operations           | - [ ] Implement resolver batching; optimize queries; forbid N+1 query patterns                |
| DDoS                | Deploy protection layers            | - [ ] Configure DDoS protection; deploy defenses; forbid unprotected endpoints                |
| Dead Letter         | Queue failed processing             | - [ ] Configure dead letter queues; handle failures; forbid lost failed messages              |
| Debounce            | Throttle user input processing      | - [ ] Debounce input handlers; throttle events; forbid immediate processing on every keystroke|
| Debugging           | Instrument for observability        | - [ ] Enable debugging; instrument systems; forbid opaque system behavior                     |
| Decay               | Implement graceful degradation      | - [ ] Degrade gracefully; maintain partial function; forbid complete failure on dependency loss|
| Decouple            | Separate layout from rendering      | - [ ] Decouple computation from rendering; separate concerns; forbid tightly coupled pipelines|
| Deduplication       | Process events idempotently         | - [ ] Use deduplication keys; ensure idempotency; forbid duplicate processing                 |
| Defense             | Apply multi-layer security          | - [ ] Implement defense-in-depth; layer security; forbid single-layer protection              |
| Degradation         | Enable graceful fallback            | - [ ] Enable graceful degradation; provide fallback; forbid hard failures                     |
| Denormalization     | Optimize read-heavy workloads       | - [ ] Denormalize for reads; optimize queries; forbid normalized schemas for read-heavy loads |
| Deployment          | Enable independent releases         | - [ ] Deploy independently; enable scalability; forbid coupled deployment dependencies        |
| Depth               | Limit recursive call chains         | - [ ] Guard recursive calls; limit depth; forbid infinite loops                               |
| Discoverability     | Provide hypermedia links            | - [ ] Implement HATEOAS; enable discoverability; forbid link-free responses                   |
| Distributed         | Design systems-first                | - [ ] Build distributed-first; maximize scalability; forbid monolithic architectures          |
| Document Store      | Use for semi-structured data        | - [ ] Select by access pattern; use appropriately; forbid inappropriate storage choice        |
| Duration            | Track RED metrics                   | - [ ] Monitor Rate/Errors/Duration; track performance; forbid unmonitored service metrics     |
| Edge                | Authenticate requests               | - [ ] Authenticate at edge; validate early; forbid delayed authentication                     |
| Encoding            | Sanitize output                     | - [ ] Apply output encoding; prevent XSS; forbid raw output rendering                         |
| Encryption          | Secure data at rest/transit         | - [ ] Encrypt data; secure transmission; forbid plaintext sensitive data                      |
| Engineers           | Implement resilience patterns       | - [ ] Build resilient services; implement patterns; forbid brittle implementations            |
| Errors              | Track RED metrics                   | - [ ] Monitor error rates; track RED; forbid unmeasured error rates                           |
| Event-driven        | Communicate asynchronously          | - [ ] Use event-driven patterns; communicate async; forbid synchronous-only integration       |
| Events              | Integrate through messaging         | - [ ] Enable adaptability; integrate via events; forbid direct coupling                       |
| Eventual            | Accept for distributed consistency  | - [ ] Design for eventual consistency; accept tradeoffs; forbid strong consistency everywhere |
| Explain             | Review database query plans         | - [ ] Analyze explain plans; review queries; forbid unoptimized database access               |
| Expiry              | Configure TTL-based cache           | - [ ] Set TTL expiry; configure caching; forbid permanent cache entries                       |
| Exponential         | Configure retry backoff             | - [ ] Apply exponential backoff; prevent storms; forbid linear retry patterns                 |
| Failover            | Eliminate single points             | - [ ] Implement failover; ensure redundancy; forbid single points of failure                  |
| Failure             | Design for resilience               | - [ ] Expect failure; design resilience; forbid brittle failure handling                      |
| Field-level         | Encrypt sensitive PII               | - [ ] Apply field-level encryption; protect PII; forbid unencrypted sensitive fields          |
| Filters             | Consume via topic selection         | - [ ] Use topic filters; route selectively; forbid broadcast-only messaging                   |
| Force               | Decouple layout computation         | - [ ] Separate Force/Dagre from render; decouple layout; forbid coupled computation/rendering |
| Frontend            | Enforce performance patterns        | - [ ] Optimize rendering; enforce patterns; forbid unoptimized UI updates                     |
| Gateway             | Route via API layer                 | - [ ] Use API Gateway; centralize routing; forbid direct service access                       |
| GDPR                | Comply with data privacy            | - [ ] Ensure GDPR compliance; protect privacy; forbid non-compliant data flows                |
| Graceful            | Degrade under load                  | - [ ] Enable graceful degradation; maintain function; forbid hard failures                    |
| Graph               | Use for relationship-heavy data     | - [ ] Select graph DB; optimize relationships; forbid relational DB for graph workloads       |
| GraphQL             | Implement schema-first              | - [ ] Design schema-first; implement systematically; forbid ad-hoc GraphQL design             |
| Hangs               | Prevent via time-slicing            | - [ ] Offload heavy tasks; prevent hangs; forbid blocking main thread                         |
| HATEOAS             | Enable API discoverability          | - [ ] Provide hypermedia links; enable discovery; forbid static endpoint lists                |
| Headers             | Version APIs systematically         | - [ ] Version via headers; manage compatibility; forbid URL-only versioning                   |
| Hierarchical        | Implement caching layers            | - [ ] Cache hierarchically; optimize access; forbid flat cache architectures                  |
| Horizontal          | Scale via distribution              | - [ ] Enable horizontal scaling; distribute load; forbid vertical-only scaling                |
| HTTP                | Map verbs to operations             | - [ ] Use standard HTTP verbs; map to CRUD; forbid non-standard verb usage                    |
| Hypermedia          | Provide for navigation              | - [ ] Include hypermedia links; enable navigation; forbid link-free APIs                      |
| Idempotency         | Generate keys for retry safety      | - [ ] Ensure idempotent processing; use keys; forbid non-idempotent retries                   |
| Impact              | Prioritize user-facing alerts       | - [ ] Alert on user impact; prioritize symptoms; forbid infrastructure-only alerts            |
| Incremental         | Update on window resize             | - [ ] Apply incremental updates; avoid full recalc; forbid complete re-layout on resize       |
| Independent         | Enable service deployment           | - [ ] Deploy independently; enable autonomy; forbid coupled releases                          |
| Indexes             | Tune database performance           | - [ ] Optimize indexes; tune queries; forbid unindexed frequent queries                       |
| Infinite            | Prevent loop conditions             | - [ ] Guard against infinite loops; set limits; forbid unbounded recursion                    |
| Input               | Validate and sanitize               | - [ ] Validate input; ensure compliance; forbid unvalidated user input                        |
| Instrumentation     | Enable observability by default     | - [ ] Instrument systems; enable observability; forbid uninstrumented services                |
| Integration         | Define SLAs for all                 | - [ ] Establish SLAs; define agreements; forbid SLA-free integrations                         |
| Integrity           | Protect through defense-in-depth    | - [ ] Secure integrity; apply layered defense; forbid single-layer security                   |
| Interfaces          | Maintain backward compatibility     | - [ ] Preserve compatibility; maintain stability; forbid breaking interface changes           |
| Invalidation        | Implement cache purging             | - [ ] Purge via events; invalidate systematically; forbid stale cache retention               |
| Isolation           | Apply bulkhead patterns             | - [ ] Isolate failure domains; apply bulkheads; forbid shared resource pools                  |
| Jank                | Eliminate via incremental updates   | - [ ] Remove jank; update incrementally; forbid blocking render updates                       |
| Jitter              | Add to retry logic                  | - [ ] Apply retry jitter; prevent thundering herd; forbid synchronized retries                |
| JSON                | Structure logs systematically       | - [ ] Log as JSON; structure output; forbid unstructured logs                                 |
| Keys                | Generate for deduplication          | - [ ] Use deduplication keys; ensure idempotency; forbid keyless retry processing             |
| Latency             | Monitor p99 thresholds              | - [ ] Track p99 <500ms; monitor latency; forbid unmonitored response times                    |
| Layout              | Cache for performance               | - [ ] Implement layout caching; optimize rendering; forbid recalculation on every update      |
| Layers              | Implement hierarchical caching      | - [ ] Cache in layers; optimize access; forbid single-layer caching                           |
| Levels              | Configure log granularity           | - [ ] Set log levels; configure granularity; forbid single-level logging                      |
| Lexing              | Share token processing              | - [ ] Implement token sharing; avoid redundancy; forbid duplicate parsers                     |
| Limits              | Enforce query complexity            | - [ ] Set complexity limits; prevent abuse; forbid unbounded query depth                      |
| Links               | Provide hypermedia navigation       | - [ ] Include HATEOAS links; enable navigation; forbid static endpoint documentation only     |
| Listeners           | Throttle resize and scroll          | - [ ] Throttle event listeners; optimize performance; forbid unthrottled handlers             |
| Load                | Balance via service mesh            | - [ ] Balance load; distribute requests; forbid single-server routing                         |
| Loading             | Test at 2x peak capacity            | - [ ] Conduct load testing; validate capacity; forbid untested peak scenarios                 |
| Logs                | Structure with correlation IDs      | - [ ] Embed correlation IDs; structure logs; forbid correlation-free logging                  |
| Loops               | Prevent infinite recursion          | - [ ] Guard recursive calls; prevent loops; forbid unbounded iteration                        |
| Measurement         | Memoize text operations             | - [ ] Memoize text measurement; reduce overhead; forbid repeated expensive calculations       |
| Memoization         | Cache expensive utilities           | - [ ] Memoize computations; cache results; forbid redundant expensive operations              |
| Mesh                | Route via service infrastructure    | - [ ] Use service mesh; route intelligently; forbid direct service calls                      |
| Messages            | Emit to broker                      | - [ ] Publish to message broker; decouple services; forbid direct service messaging           |
| Metrics             | Track RED per service               | - [ ] Monitor Rate/Errors/Duration; track metrics; forbid unmonitored services                |
| Mode                | Cache layouts across switches       | - [ ] Persist layouts; cache across modes; forbid recalculation on mode change                |
| Monitoring          | Implement comprehensive             | - [ ] Monitor metrics/logs/traces; ensure visibility; forbid partial observability            |
| Monoliths           | Avoid for agility                   | - [ ] Decompose monoliths; sustain agility; forbid monolithic architectures                   |
| mTLS                | Configure service mesh security     | - [ ] Enable mTLS; secure communication; forbid plaintext service-to-service traffic          |
| Network             | Segment with zero-trust             | - [ ] Apply zero-trust; segment network; forbid perimeter-only security                       |
| Nodes               | Normalize to rectangles             | - [ ] Use rectangular shapes; normalize rendering; forbid inconsistent node shapes            |
| Normalization       | Apply for write-heavy workloads     | - [ ] Normalize for writes; optimize updates; forbid denormalized write-heavy schemas         |
| Observability       | Instrument by default               | - [ ] Enable observability; instrument systems; forbid opaque service behavior                |
| Object Storage      | Use for binary artifacts            | - [ ] Store binaries; use object storage; forbid database-stored large binaries              |
| Offload             | Move heavy tasks to workers         | - [ ] Use web workers; offload tasks; forbid main-thread blocking operations                  |
| OOM                 | Prevent via streaming               | - [ ] Stream large datasets; prevent OOM; forbid loading entire datasets into memory          |
| Orchestration       | Coordinate via API Gateway          | - [ ] Orchestrate workflows; coordinate services; forbid uncoordinated service calls          |
| Output              | Encode to prevent XSS               | - [ ] Encode output; prevent injection; forbid raw user content rendering                     |
| Ownership           | Assign data per context             | - [ ] Define data ownership; assign clearly; forbid shared data ownership                     |
| OWASP               | Apply security standards            | - [ ] Ensure OWASP compliance; apply standards; forbid non-compliant implementations          |
| p99                 | Monitor latency thresholds          | - [ ] Track p99 latency; monitor performance; forbid unmeasured tail latencies                |
| Patterns            | Select storage by access            | - [ ] Choose by workload; select appropriately; forbid convenience-based storage choice       |
| Peak                | Test at 2x expected load            | - [ ] Load test at 2x peak; validate capacity; forbid untested high-load scenarios            |
| Performance         | Enforce frontend patterns           | - [ ] Optimize rendering; enforce patterns; forbid unoptimized critical paths                 |
| Perimeter           | Deploy WAF and DDoS protection      | - [ ] Secure perimeter; deploy defenses; forbid unprotected edge                              |
| PII                 | Encrypt at field level              | - [ ] Protect PII; encrypt fields; forbid plaintext sensitive data                            |
| Pipelines           | Implement CI/CD automation          | - [ ] Automate deployment; implement CI/CD; forbid manual release processes                   |
| Plans               | Review query explain results        | - [ ] Analyze query plans; review performance; forbid unoptimized queries                     |
| Pools               | Bound thread resources              | - [ ] Limit thread pools; bound resources; forbid unbounded thread creation                   |
| Position            | Cache node/edge layouts             | - [ ] Cache positions; persist layouts; forbid recalculation on every render                  |
| Privacy             | Comply with GDPR requirements       | - [ ] Ensure privacy compliance; follow regulations; forbid non-compliant data handling       |
| Processing          | Handle events idempotently          | - [ ] Process idempotently; use deduplication; forbid duplicate event handling                |
| Protection          | Deploy DDoS defenses                | - [ ] Configure DDoS protection; defend systems; forbid unprotected public endpoints          |
| Publisher           | Emit to message broker              | - [ ] Publish events; use broker; forbid direct subscriber notification                       |
| Purge               | Implement event-driven cache        | - [ ] Invalidate via events; purge systematically; forbid manual cache clearing               |
| Queries             | Limit complexity in GraphQL         | - [ ] Enforce limits; prevent abuse; forbid unlimited query depth                             |
| Queues              | Bound capacity                      | - [ ] Limit queue size; apply backpressure; forbid unbounded queues                           |
| Rate                | Track RED metrics                   | - [ ] Monitor request rate; track RED; forbid unmeasured throughput                           |
| RDBMS               | Use for transactional data          | - [ ] Select appropriately; use for ACID; forbid RDBMS for document-heavy workloads          |
| Readability         | Use rectangular nodes               | - [ ] Maximize readability; use rectangles; forbid complex node shapes in structured layouts  |
| Reads               | Denormalize for performance         | - [ ] Optimize read-heavy; denormalize schemas; forbid normalized read-heavy designs          |
| Real-time           | Provide via subscriptions           | - [ ] Enable real-time updates; use subscriptions; forbid polling-only patterns               |
| Rectangles          | Enforce for structured layouts      | - [ ] Use rectangular shapes; enforce consistency; forbid varied shapes in hierarchical views |
| Recursive           | Guard with depth limits             | - [ ] Limit recursion depth; guard calls; forbid unbounded recursion                          |
| Redundancy          | Eliminate single failures           | - [ ] Implement redundancy; ensure failover; forbid single points of failure                  |
| Refactor            | Remove redundant calculation        | - [ ] Streamline pipeline; remove redundancy; forbid duplicate calculation logic              |
| Registry            | Use for event schemas               | - [ ] Implement schema registry; version contracts; forbid unversioned event schemas          |
| Reliability         | Secure through elimination          | - [ ] Eliminate single points; secure reliability; forbid unprotected critical components     |
| Rendering           | Optimize graph visualization        | - [ ] Decouple from layout; optimize rendering; forbid coupled compute/render loops           |
| Request             | Embed correlation IDs               | - [ ] Track with correlation IDs; enable tracing; forbid untracked requests                   |
| Resilience          | Design for failure                  | - [ ] Implement resilience patterns; expect failure; forbid brittle systems                   |
| Resize              | Apply incremental updates           | - [ ] Update incrementally; avoid full recalc; forbid complete re-layout on resize            |
| Resource            | Apply bulkhead isolation            | - [ ] Isolate resources; apply bulkheads; forbid shared critical resources                    |
| Response            | Aggregate with timeouts             | - [ ] Handle timeouts; aggregate responses; forbid unbounded response waiting                 |
| REST                | Implement resource-oriented         | - [ ] Design RESTful; use resources; forbid RPC-style REST                                    |
| Restart             | Debounce simulation triggers        | - [ ] Debounce restarts; prevent thrashing; forbid immediate restart on every change          |
| Results             | Provide with correlation IDs        | - [ ] Return with correlation IDs; enable tracing; forbid ID-free responses                   |
| Retry               | Configure with exponential backoff  | - [ ] Apply exponential backoff; prevent storms; forbid immediate retries                     |
| Reuse               | Cache positions during updates      | - [ ] Reuse cached layouts; enforce view-stability; forbid unnecessary position recalculation |
| Revision            | Key cache with awareness            | - [ ] Use revision-aware keys; cache robustly; forbid stale layout cache                      |
| Robust              | Implement layout caching            | - [ ] Cache layouts robustly; skip recalculation; forbid fragile cache invalidation           |
| Rollback            | Enable via blue-green deploys       | - [ ] Implement rollback; enable recovery; forbid risky irreversible deployments              |
| Routing             | Balance via service mesh            | - [ ] Route intelligently; balance load; forbid static routing tables                         |
| Safety              | Generate idempotency keys           | - [ ] Ensure retry safety; use idempotency keys; forbid unsafe retries                        |
| Scalability         | Deploy independently                | - [ ] Maximize scalability; deploy independently; forbid monolithic scaling                   |
| Schema              | Implement registry for events       | - [ ] Register schemas; version contracts; forbid implicit event contracts                    |
| Scroll              | Throttle event listeners            | - [ ] Throttle scroll handlers; optimize performance; forbid unthrottled scroll listeners     |
| Security            | Apply defense-in-depth              | - [ ] Layer security; protect integrity; forbid single-layer security                         |
| Segmentation        | Apply zero-trust network            | - [ ] Segment with zero-trust; isolate services; forbid flat network topology                 |
| Semantic            | Standardize UI structure            | - [ ] Use semantic HTML; standardize structure; forbid non-semantic markup                    |
| Service             | Design stateless                    | - [ ] Build stateless; preserve simplicity; forbid stateful service design                    |
| Shapes              | Normalize node rendering            | - [ ] Standardize shapes; normalize nodes; forbid inconsistent visualization                  |
| Shared              | Prevent database coupling           | - [ ] Avoid shared databases; maintain boundaries; forbid cross-service database sharing      |
| Shutdown            | Implement gracefully                | - [ ] Handle graceful shutdown; cleanup resources; forbid abrupt termination                  |
| Simplicity          | Design stateless services           | - [ ] Preserve simplicity; build stateless; forbid unnecessary state management               |
| Simulation          | Debounce restarts                   | - [ ] Debounce simulation; prevent thrashing; forbid restart on every parameter change        |
| Single              | Eliminate failure points            | - [ ] Remove single points; ensure redundancy; forbid unprotected critical paths              |
| SLA                 | Define for all integrations         | - [ ] Establish SLAs; define agreements; forbid undefined service levels                      |
| SLI                 | Monitor service level indicators    | - [ ] Track SLI/SLO; monitor reliability; forbid unmeasured service levels                    |
| SLO                 | Track service level objectives      | - [ ] Monitor SLO compliance; track targets; forbid SLO-free services                         |
| Spans               | Implement distributed tracing       | - [ ] Trace with spans; track requests; forbid untraced distributed calls                     |
| Stability           | Reuse cached positions              | - [ ] Enforce view-stability; reuse positions; forbid unstable non-topology updates           |
| Stateless           | Design services simply              | - [ ] Build stateless services; simplify design; forbid stateful service logic                |
| Storage             | Select by access pattern            | - [ ] Choose appropriately; optimize workload; forbid convenience-based storage decisions     |
| Streaming           | Prevent OOM with datasets           | - [ ] Stream large data; prevent OOM; forbid full in-memory loading                           |
| Strong              | Apply for transactional data        | - [ ] Use strong consistency; ensure ACID; forbid eventual consistency for transactions       |
| Structure           | Logs as JSON                        | - [ ] Structure logs; use JSON; forbid unstructured log output                                |
| Structured          | Use rectangular nodes               | - [ ] Apply to structured layouts; use rectangles; forbid organic shapes in hierarchies       |
| Subscribers         | Filter via topics                   | - [ ] Consume selectively; filter topics; forbid broadcast consumption                        |
| Subscriptions       | Provide real-time updates           | - [ ] Enable subscriptions; provide real-time; forbid polling-only patterns                   |
| Symptom             | Configure alerts on impact          | - [ ] Alert on symptoms; prioritize impact; forbid infrastructure-only monitoring             |
| Synchronous         | Limit chain depth                   | - [ ] Avoid deep chains; limit <3 hops; forbid synchronous cascades                           |
| Systems             | Design distributed-first            | - [ ] Architect for distribution; maximize scale; forbid monolithic system design             |
| Tasks               | Cleanup on unmount                  | - [ ] Clean up async tasks; prevent leaks; forbid unmanaged async operations                  |
| Testing             | Validate via chaos engineering      | - [ ] Test failure modes; validate resilience; forbid untested failure scenarios              |
| Throttle            | Apply to event listeners            | - [ ] Throttle handlers; optimize performance; forbid unthrottled high-frequency events       |
| Thrashing           | Prevent via batching                | - [ ] Batch DOM access; prevent thrashing; forbid interleaved read/write                      |
| Timeout             | Configure at network boundaries     | - [ ] Set timeouts; handle delays; forbid unbounded waiting                                   |
| Time-slicing        | Prevent UI hangs                    | - [ ] Use time-slicing; prevent hangs; forbid long-running synchronous tasks                  |
| Token               | Validate authentication             | - [ ] Validate tokens; authenticate requests; forbid unauthenticated access                   |
| Tokens              | Share lexing infrastructure         | - [ ] Implement token sharing; avoid redundancy; forbid duplicate lexers                      |
| Topology            | Skip layout on unchanged graphs     | - [ ] Detect unchanged topology; skip layout; forbid unnecessary recalculation                |
| Topics              | Filter event consumption            | - [ ] Subscribe via topics; filter events; forbid unfiltered consumption                      |
| Tracing             | Implement distributed spans         | - [ ] Trace distributed calls; implement spans; forbid untraced service interactions          |
| Transactions        | Use RDBMS for ACID                  | - [ ] Handle with RDBMS; ensure ACID; forbid non-transactional storage for critical data      |
| Transit             | Encrypt data transmission           | - [ ] Secure data in transit; encrypt transmission; forbid plaintext network traffic          |
| Transparency        | Guarantee via instrumentation       | - [ ] Instrument for transparency; enable debugging; forbid opaque system behavior            |
| Tree                | Use rectangular nodes               | - [ ] Apply to tree layouts; use rectangles; forbid non-rectangular hierarchical nodes        |
| TTL                 | Configure cache expiration          | - [ ] Set TTL; expire stale data; forbid permanent cache entries                              |
| Tunable             | Apply for graph consistency         | - [ ] Tune consistency; balance tradeoffs; forbid fixed consistency models                    |
| Unlimited           | Scale via object storage            | - [ ] Use object storage; scale infinitely; forbid limited binary storage                     |
| Unmount             | Cleanup async operations            | - [ ] Clean up on unmount; prevent leaks; forbid uncleaned subscriptions                      |
| Updates             | Apply incrementally on resize       | - [ ] Update incrementally; avoid recalc; forbid full re-layout on window resize              |
| URLs                | Design resource-oriented            | - [ ] Structure as resources; design RESTful; forbid verb-based URLs                          |
| Validation          | Sanitize input                      | - [ ] Validate all input; sanitize data; forbid unvalidated user input                        |
| Verbs               | Map to CRUD operations              | - [ ] Use HTTP verbs; map to CRUD; forbid inconsistent verb semantics                         |
| Vertical            | Avoid scaling limitations           | - [ ] Enable horizontal scaling; avoid vertical limits; forbid vertical-only infrastructure   |
| View                | Reuse stable cached positions       | - [ ] Enforce view-stability; reuse cache; forbid unstable rendering on non-changes           |
| Visualization       | Optimize graph rendering            | - [ ] Implement efficient rendering; optimize graphs; forbid unoptimized visualization         |
| WAF                 | Deploy web application firewall     | - [ ] Configure WAF; protect applications; forbid unprotected web endpoints                   |
| Window              | Apply incremental resize updates    | - [ ] Update incrementally; handle resize; forbid full re-layout on window changes            |
| Workers             | Offload heavy computations          | - [ ] Use web workers; offload tasks; forbid blocking main thread with heavy work             |
| Workflows           | Orchestrate via event bus           | - [ ] Coordinate via events; orchestrate workflows; forbid direct service orchestration       |
| Workloads           | Select storage by pattern           | - [ ] Optimize for workload; select appropriately; forbid pattern-agnostic storage choice     |
| Wrapping            | Memoize text utilities              | - [ ] Cache text wrapping; memoize utilities; forbid repeated text measurement                |
| Write-through       | Apply on cache updates              | - [ ] Use write-through; maintain consistency; forbid delayed cache updates                   |
| Writes              | Normalize for performance           | - [ ] Optimize write-heavy; normalize schemas; forbid denormalized write-intensive designs    |
| XSS                 | Prevent via output encoding         | - [ ] Encode output; prevent XSS; forbid unencoded user content                               |
| Zero-trust          | Segment network security            | - [ ] Apply zero-trust; secure network; forbid perimeter-only security model                  |

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

## Frontend Performance & Visualization Directives

**Engineers optimize graph visualization rendering**
- Engineers implement node/edge position caching (store-based) to persist layouts across mode switches
- Engineers implement robust layout caching with revision-aware keys (layer:mode:fm:revision) to avoid stale layouts
- Engineers skip initial layout calculation when topology is unchanged and cache is valid (>95% coverage)
- Engineers decouple layout computation (Dagre/Force) from rendering loop (D3/Canvas)
- Engineers enforce rectangular node shapes for structured layouts (Mermaid/Tree) to maximize readability
- Engineers normalize disparate node types (Stadium/Cylinder) to uniform rectangles for layout consistency
- Engineers implement incremental updates for window resizing instead of full re-layout to eliminate jank
- Engineers memoize expensive text measurement and wrapping utilities to reduce layout overhead
- Engineers refactor and remove redundant calculation logic to streamline the rendering pipeline

**Engineers implement resilience patterns**
- Engineers enable graceful degradation
- Engineers deploy circuit breakers
- Engineers configure retry with exponential backoff
- Engineers apply bulkhead isolation
- Engineers implement token sharing to avoid redundant lexing

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

## Security Architecture Directives

**Security engineers implement defense in depth**:
- **Perimeter**: Engineers deploy WAF, DDoS protection, rate limiting
- **Network**: Engineers configure service mesh mTLS, zero-trust segmentation
- **Application**: Engineers ensure OWASP compliance, input validation, output encoding
- **Data**: Engineers enable encryption at rest/transit, field-level encryption for PII

**Security Pattern**: Authenticate at edge → authorize at service → audit everywhere

---

## Observability Requirements Directives

**SREs implement three observability pillars**:
- **Metrics**: SREs track RED (Rate, Errors, Duration) per service | SREs monitor SLI/SLO
- **Logs**: SREs structure as JSON | SREs embed correlation IDs | SREs configure log levels (ERROR, WARN, INFO, DEBUG)
- **Traces**: SREs implement distributed tracing spans | SREs identify critical paths

**SREs configure symptom-based alerts**
- SREs prioritize user impact alerts over cause-based alerts (disk full)

---

## Anti-Pattern Guards

**Architects avoid prohibited system patterns**:

❌ Distributed monoliths (shared databases across services) → ✅ Bounded contexts with data ownership  
❌ Synchronous chains >3 hops → ✅ Event-driven async patterns  
❌ Implicit contracts (no schema definitions) → ✅ Schema-mediated contracts  
❌ Single points of failure → ✅ Redundancy and failover  
❌ Unbounded queues/thread pools → ✅ Capacity limits and backpressure  

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