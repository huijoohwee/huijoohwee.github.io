---
title: "System Design CID Table Module"
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

# System Design CID Table Module

## Scope & Ownership

Owns the alphabetical Context-Intent-Directive lookup table for system design.

This module is loaded on demand from [System Design Guidelines](./system-design-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
