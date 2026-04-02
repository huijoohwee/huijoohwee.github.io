# [Project Name]
### [Tagline A] · [Tagline B] · [Tagline C]
*Pitch Deck + PRD + TAD*

---

## Design Mantras

```
- [ ] [Context A]; [core principle]; forbid [anti-pattern]
- [ ] [Context B]; [core principle]; forbid [anti-pattern]
- [ ] [Context C]; [core principle]; forbid [anti-pattern]
- [ ] [Context D]; [core principle]; forbid [anti-pattern]
- [ ] [Context E]; [core principle]; forbid [anti-pattern]
- [ ] [Context F]; [core principle]; forbid [anti-pattern]
```

**Example**:
```
- [ ] Clarity; communicate signal over noise; forbid ambiguous outputs
- [ ] Modularity; isolate ingestion, scoring, and rendering; forbid monolithic pipelines
- [ ] Neutrality; abstract domain logic; forbid hardcoded domain assumptions
- [ ] Reliability; handle source failures gracefully; forbid silent data gaps
- [ ] Transparency; expose scoring rationale; forbid opaque rankings
- [ ] Extensibility; support new data sources via config; forbid closed source lists
```

---

## Universal Design Principles

| Context             | Intent                              | Directive                                                                                      |
|---------------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Abstraction         | Separate concerns                   | - [ ] Define clear interfaces; hide implementation; forbid leaky abstractions                 |
| Atomicity           | Ensure operation completeness       | - [ ] Complete or rollback fully; forbid partial states                                       |
| Caching             | Optimize repeated access            | - [ ] Cache expensive computations; invalidate appropriately; forbid stale data               |
| Composition         | Build from components               | - [ ] Combine simple parts; enable reuse; forbid monolithic design                            |
| Configuration       | Externalize behavior                | - [ ] Define YAML/JSON schemas; document defaults; forbid embedded constants                  |
| Consistency         | Maintain uniform behavior           | - [ ] Apply patterns uniformly; document conventions; forbid arbitrary exceptions             |
| Decoupling          | Minimize dependencies               | - [ ] Use interfaces; inject dependencies; forbid tight coupling                              |
| Determinism         | Ensure reproducibility              | - [ ] Fix random seeds; normalize inputs; forbid non-deterministic behavior                   |
| Documentation       | Explain all decisions               | - [ ] Document rationale; provide examples; forbid undocumented magic                         |
| Encapsulation       | Hide internal details               | - [ ] Expose minimal APIs; version interfaces; forbid internal leakage                        |
| Error Handling      | Fail gracefully                     | - [ ] Validate inputs; return descriptive errors; forbid silent failures                      |
| Extensibility       | Support future growth               | - [ ] Design plugin points; version schemas; forbid closed architectures                      |
| Idempotence         | Guarantee safe re-runs              | - [ ] Produce same result; avoid side effects; forbid accumulation artifacts                  |
| Immutability        | Preserve data integrity             | - [ ] Copy before transform; avoid in-place edits; forbid source corruption                   |
| Instrumentation     | Enable observability                | - [ ] Emit structured logs; expose metrics; forbid black-box execution                        |
| Locality            | Bound scope                         | - [ ] Keep modules focused; single responsibility; forbid sprawling components                |
| Modularity          | Isolate responsibilities            | - [ ] Define clear boundaries; minimize coupling; forbid cross-concern mixing                 |
| Naming              | Use consistent conventions          | - [ ] Follow language standards; be descriptive; forbid cryptic abbreviations                 |
| Neutrality          | Abstract domain logic               | - [ ] Use general algorithms; configure specifics; forbid domain assumptions                  |
| Performance         | Optimize critical paths             | - [ ] Profile hot paths; target complexity; forbid premature optimization                     |
| Provenance          | Track data lineage                  | - [ ] Record sources; timestamp changes; forbid orphaned data                                 |
| Reusability         | Share common logic                  | - [ ] Extract utilities; parameterize functions; forbid copy-paste duplication                |
| Scalability         | Handle growth                       | - [ ] Design for volume; test limits; forbid O(n²) where avoidable                           |
| Security            | Protect against threats             | - [ ] Validate inputs; sanitize outputs; forbid injection vulnerabilities                     |
| Separation          | Divide concerns                     | - [ ] Layer by responsibility; forbid mixing presentation/business/data logic                 |
| Simplicity          | Prefer straightforward solutions    | - [ ] Choose simple over clever; forbid unnecessary complexity                                |
| Testability         | Enable automated verification       | - [ ] Inject dependencies; expose test hooks; forbid untestable code                          |
| Transparency        | Make behavior visible               | - [ ] Log decisions; expose state; forbid opaque operations                                   |
| Validation          | Verify all inputs                   | - [ ] Check preconditions; enforce invariants; forbid assumption-based processing             |
| Versioning          | Track evolution                     | - [ ] Namespace schemas; deprecate gracefully; forbid breaking changes without migration      |

---

## PART 1 — PITCH DECK

### One-liner
**[Project Name] [core value proposition verb phrase]** — [one sentence describing who benefits, what it does, and the unique outcome it produces].

---

### Slide 1 · Problem
**[Primary user persona]** waste [time/resource] on [current painful workaround]:
- "[Pain point A]" → [current workaround], [cost or time lost]
- "[Pain point B]" → [current workaround], [cost or time lost]
- "[Pain point C]" → gut feel, guesswork

**No tool [cross-references / combines / surfaces] [signal A] against [signal B].**

---

### Slide 2 · Solution
**[Project Name]** is a [product category description] that:
1. **[Feature 1 Name]** — [one-sentence description of the capability and its mechanism]
2. **[Feature 2 Name]** — [one number / metric that quantifies the core insight]
3. **[Feature 3 Name]** — [interactive or exploratory capability that reveals the insight]

[Memorable closing line: e.g., "One [artifact]. Built in [N] hours. Updated [cadence]."]

---

### Slide 3 · Live Demo Flow
```
[Data Source A]         →  [Processing Layer]  →  [Output Artifact A]
[Data Source B]         →  [Processing Layer]  →  [Output Artifact B]
                                                          ↓
                          [Scoring / Ranking Engine (formula)]
                                                          ↓
              [Visualization Layer] · [Alert Channel] · [Queue] · [Orchestrator]
```
**Demo moment:** [Describe the live, on-stage demo action and the audience payoff].

---

### Slide 4 · Market
- **[TAM figure]** [addressable user group] globally ([year], [source])
- **[SAM figure]** [secondary addressable group] ([community or source])
- **Primary:** [user type A], [user type B], [user type C]
- **Secondary:** [buyer type A] doing [use case], [buyer type B] doing [use case]

---

### Slide 5 · Feature Comparison Matrix

| Feature                        | [Project Name] | [Competitor A] | [Competitor B] | [Competitor C] | [Competitor D] |
|-------------------------------|----------------|----------------|----------------|----------------|----------------|
| [Signal A] capture            | ✅ [mechanism] | ❌             | Partial        | Partial        | ❌             |
| [Signal B] mapping            | ✅ [mechanism] | ✅ [partial]   | ❌             | ❌             | ✅ [partial]   |
| Cross-reference both signals  | ✅             | ❌             | ❌             | ❌             | ❌             |
| [Score / metric] (quantified) | ✅             | ❌             | ❌             | ❌             | ❌             |
| Real-time alerts              | ✅ [channel]   | ❌             | ❌ [cadence]   | ❌             | ❌             |
| Open-source / $0              | ✅             | ❌ Paid        | ❌ Paid        | ✅             | ✅             |
| [Differentiator feature]      | ✅ [detail]    | ❌             | ❌             | ❌             | ❌             |
| **Category**                  | **[Category]** | **[Category]** | **[Category]** | **[Category]** | **[Category]** |

---

### Slide 6 · Ask
**[Milestone A]:** [What you are shipping and by when].
**[Milestone B]:** [What you will open-source or release post-milestone, and the community goal].

---

## PART 2 — PRODUCT REQUIREMENTS DOCUMENT (PRD)

### Overview

| Field          | Value                                                           |
|----------------|-----------------------------------------------------------------|
| Product        | [Project Name]                                                  |
| Version        | [x.y.z] ([Build phase, e.g., Hackathon MVP])                   |
| Timeline       | **[Build window, e.g., 3-hour build / 2-week sprint]**         |
| Deployment     | [API hosting platform] (API) + [Frontend hosting platform] (frontend) |
| Source Control | [SCM platform] + [CI/CD platform] (CI/CD)                      |

---

### Goals
1. Ingest live data from ≥[N] [source types] with no manual intervention
2. Surface a [visualization type] with [grouping mechanism] in a [client type] — [auth requirement]
3. Compute and display a **[Score/Metric Name]** per [primary entity]
4. Deliver [alert channel] alerts when a [threshold condition] is detected

### Non-Goals (MVP)
- [Excluded feature A] · [Excluded feature B] · [Excluded feature C]

---

### User Stories

**U1 — [Primary Persona]:** I [open / visit / query] [Project Name] and see [key artifact] from [time window] to [primary goal].

**U2 — [Secondary Persona]:** I query "[domain keyword]" and see [clustered / ranked / filtered output] with [metric] so I can [decision] in under [N] minutes.

**U3 — [Tertiary Persona]:** I add [inputs] to my [watchlist / config] and receive [alerts] when a new [threshold condition] appears in my domain.

---

### [Canvas / Dashboard / Interface] Feature Set

- **[Grouping mechanism]:** [N] [entity A] clusters ([label 1], [label 2], [label 3], [label 4]) × [N] [entity B] clusters ([label 1], [label 2], [label 3], [label 4]) — each [visually distinguished by color / icon / position]
- **[Interaction A]:** [description of collapse / expand / toggle behavior and animation]
- **[Interaction B]:** [description of hover / focus behavior and what data surfaces]
- **[Interaction C]:** [description of node-level interaction and sidebar detail]
- **[Highlight state]:** [description of how high-[metric] items are visually surfaced]

---

### Acceptance Criteria

| Feature               | Criterion                                                              |
|-----------------------|------------------------------------------------------------------------|
| [Pipeline feature]    | ≥[N] items ingested per source per run; zero crashes                  |
| [Classification feature] | Latency < [N]s per item on [compute type]                         |
| [Score feature]       | Updates visible in [interface] within [N]s of recompute              |
| [Interface feature]   | Loads ≤ [N]s with [N] [entities]; [interaction] smooth               |
| [Alert feature]       | Delivered < [N] min after trigger condition                           |

---

## PART 3 — TECHNICAL ARCHITECTURE DOCUMENT (TAD)

### Stack — [Selection Philosophy]

> Selection order: **[Criterion A]** ([license types]) first → lowest **[Criterion B]** → best **[Criterion C]**. Locality preference: **[local / in-process]** tools before cloud services. Every tool below costs **$[N]/month**.

| Priority  | Layer                    | Tool / Service            | Role                                                                 | License          | Cost  |
|-----------|--------------------------|---------------------------|----------------------------------------------------------------------|------------------|-------|
| LOCAL 1   | **[Layer name]**         | [Tool A]                  | [Role description]                                                   | [License]        | $[N]  |
| LOCAL 2   | **[Layer name]**         | [Tool B] + [Tool C]       | [Role description]                                                   | [License]        | $[N]  |
| LOCAL 3   | **[Layer name]**         | [Tool D]                  | [Role description]                                                   | [License]        | $[N]  |
| LOCAL 4   | **[Layer name]**         | [Tool E] (self-hosted)    | [Role description]; swap [component] without code changes            | [License]        | $[N]  |
| LOCAL 5   | **[Layer name]**         | [Tool F] API              | [Role description] via [proxy/router]                                | [License]        | $[N]  |
| LOCAL 6   | **[Layer name]**         | [Local storage mechanism] | [Role description] — zero infra; flushed to [persistent store] on interval | [License] | $[N]  |
| LOCAL 7   | **[Layer name]**         | [Queue tool] + [Backing store] | [Role description]; [backing store] backs [queue tool] ([limit]) | [License]    | $[N]  |
| CLOUD 1   | **[Layer name]**         | [Database service]        | [Role description]; [scale characteristic]; [free tier limit]        | [License]        | $[N]  |
| CLOUD 2   | **[Layer name]**         | [API hosting service]     | [Role description]; [free tier limit]                                | [License]        | $[N]  |
| CLOUD 3   | **[Layer name]**         | [Frontend hosting service]| [Role description]; [free tier limit]                                | [License]        | $[N]  |
| CLOUD 4   | **[Layer name]**         | [Bot / notification service] | [Role description], real-time alerts, [commands]                 | [License]        | $[N]  |
| ANY       | **[Layer name]**         | [Rendering library]       | [Visualization type] rendering                                       | [License]        | $[N]  |

**Total TCO: $[N]/month**

---

### Data Schema ([Database service] — [DB type])

```sql
CREATE TABLE [primary_entity] (
  id         [ID_TYPE] PRIMARY KEY DEFAULT [id_function](),
  type       [DATA_TYPE] CHECK (type IN ('[type_a]', '[type_b]')),
  label      VARCHAR([N]),
  metadata   [JSONB | JSON],      -- { [field_a], [field_b], [field_c] }
  [score_col] FLOAT DEFAULT 0,
  created_at [TIMESTAMP_TYPE] DEFAULT [timestamp_function]()
);

CREATE TABLE [relationship_entity] (
  [entity_a_id]  [ID_TYPE] REFERENCES [primary_entity](id),
  [entity_b_id]  [ID_TYPE] REFERENCES [primary_entity](id),
  [weight_col]   FLOAT,
  PRIMARY KEY ([entity_a_id], [entity_b_id])
);

CREATE INDEX ON [relationship_entity]([entity_a_id]);
CREATE INDEX ON [relationship_entity]([entity_b_id]);
```

`[score_col] = [scoring formula]` — computed via [database trigger / application layer] on [event]; result also written back to `[local_cache_file]` for zero-latency local reads.

---

### [System/Component] Architecture

**[Layer/Module] Stack**: [Ingestion Layer] → [Processing Layer] → [Scoring Layer] → [Persistence Layer] → [API Layer] → [Presentation Layer]

**[Processing/Data] Flow**: [Source Fetch] → [Orchestration] → [Classification] → [Deduplication] → [Storage & Scoring] → [Queue] → [API Exposure] → [Rendering]

**Design Principles**: [Principle 1] | [Principle 2] | [Principle 3] | [Principle 4]

#### High-Level Components

- **[Ingestion Layer]**:
  - `[module/path]` fetches raw items from [source A], [source B], and [source C]; handles rate-limiting and retries.
- **[Classification Layer]**:
  - `[module/path]` routes items through [AI proxy] → [AI model] and tags each as [type A] or [type B] with extracted [metadata].
- **[Scoring Layer]**:
  - `[module/path]` computes `[score_name] = [formula]` per [primary entity]; triggers on [event].
- **[Queue Layer]**:
  - `[module/path]` enqueues [recalculation jobs] via [queue tool]; [scheduler tool] fires on [cadence].
- **[API Layer]**:
  - `[module/path]` serves [data format]-ready payload from [persistence layer] at [hosting type].
- **[Presentation Layer]**:
  - `[module/path]` polls [API endpoint] every [N]s; renders [visualization type] with [interaction features].
- **[Alert Layer]**:
  - `[module/path]` detects `[score_name] > [threshold]` ∩ [watchlist condition] → pushes alert to [channel].

#### Integration Bridge: [Processing Layer] → [Persistence Layer]

| [Processing Stage]          | [Persistence Equivalent]                   | Configuration Controls                                    |
|-----------------------------|--------------------------------------------|-----------------------------------------------------------|
| [Item fetch / fan-out]      | [Ingest job / queue entry]                 | [source_list], [rate_limit], [retry_count]               |
| [Classification / tagging]  | [Node upsert with type field]              | [model_name], [prompt_template], [batch_size]            |
| [Deduplication / cache check]| [Skip / update logic on conflict]         | [cache_path], [ttl], [dedup_key]                         |
| [Score trigger / flush]     | [DB trigger + local file write]            | [score_formula], [threshold], [flush_interval]           |

---

### Layer Specifications

#### Layer 1: Ingestion

**[From/To description]**: [Scheduler/Orchestrator] → triggers [Scraper module] → fetches [raw items] from [sources] → produces [structured item list] → enables [classification step].

**Algorithm/Pattern Description**: [Fan-out pattern: N sources fetched concurrently; results merged into unified item schema before handoff to classification layer.]

**Configuration Schema (core sections)**:

```yaml
ingestion:
  scope: deployment_configurable
  type: object
  mutability: runtime_configurable
  validation: non-empty list of source configs; each must include url, auth, rate_limit
  impact: controls which sources are polled and at what cadence

sources:
  scope: deployment_configurable
  type: array
  mutability: runtime_configurable
  validation: each entry must have type, endpoint, credentials_ref
  impact: determines raw data volume and signal coverage
```

**Interface Pattern**: `[fetchItems](sources, options)` → [validates source list] → [fans out requests] → [merges results] → returns `[RawItem[]]` → complexity: O(N sources)

**Design Compliance**:

| Context          | Intent                     | Directive                                                                                   | Module/Component       | Class/Object     | Function/Method   | Dependency       | Input                | Output              | Decision Logic                     |
|------------------|----------------------------|---------------------------------------------------------------------------------------------|------------------------|------------------|-------------------|------------------|----------------------|---------------------|------------------------------------|
| Rate Limiting    | Protect source APIs        | - [ ] Respect per-source rate limits; backoff on 429; forbid flooding                     | [scraper_module]       | [ScraperClass]   | [fetchItems]      | [http_lib]       | source_config        | raw_items[]         | token-bucket / retry-with-backoff  |
| Error Isolation  | Prevent cascade failures   | - [ ] Catch per-source errors; continue other sources; forbid full-pipeline halt           | [scraper_module]       | [ScraperClass]   | [fetchItems]      | —                | source_config        | partial_results     | try/catch per source               |
| Schema Alignment | Normalize output           | - [ ] Map source-specific fields to unified schema; forbid leaking source-specific shapes  | [scraper_module]       | [NormalizerClass]| [normalize]       | —                | raw_response         | RawItem             | field mapping config               |

---

#### Layer 2: Classification

**[From/To description]**: [Raw items] → routed through [AI Proxy] → classified by [AI Model] → tagged as [type A] or [type B] with [keywords/metadata] → enables [scoring and storage].

**Algorithm/Pattern Description**: [Batch classification via model-agnostic proxy; prompt template externalised in config; output parsed as structured JSON; malformed responses retried up to N times.]

**Configuration Schema (core sections)**:

```yaml
classification:
  scope: deployment_configurable
  type: object
  mutability: runtime_configurable
  validation: model_name must be non-empty; max_tokens > 0; prompt_template must contain {input} placeholder
  impact: controls classification accuracy, latency, and cost per item

proxy:
  scope: deployment_configurable
  type: object
  mutability: deployment_configurable
  validation: base_url must be reachable; api_key must be set via env var
  impact: determines which AI backend is used without code changes
```

**Interface Pattern**: `[classifyItem](rawItem, config)` → [builds prompt] → [calls proxy] → [parses JSON response] → returns `[ClassifiedItem]` → complexity: O(1) per item; batched O(N/batch_size)

**Design Compliance**:

| Context          | Intent                     | Directive                                                                                   | Module/Component       | Class/Object       | Function/Method    | Dependency       | Input                | Output              | Decision Logic                     |
|------------------|----------------------------|---------------------------------------------------------------------------------------------|------------------------|--------------------|--------------------|------------------|----------------------|---------------------|------------------------------------|
| Model Agnosticism| Avoid vendor lock-in       | - [ ] Route all calls through [AI proxy]; forbid direct model SDK calls in business logic  | [classifier_module]    | [ClassifierClass]  | [classifyItem]     | [proxy_lib]      | rawItem              | ClassifiedItem      | proxy config maps model name       |
| Prompt Safety    | Ensure parseable output    | - [ ] Enforce JSON output mode; validate schema; retry on malformed; forbid silent drops   | [classifier_module]    | [ClassifierClass]  | [parseResponse]    | —                | raw_llm_response     | ClassifiedItem      | JSON.parse + schema check          |
| Cost Control     | Stay within free tier      | - [ ] Batch items to [N] per call; track daily count; forbid unbounded single-item loops   | [classifier_module]    | [BatcherClass]     | [batchClassify]    | —                | RawItem[]            | ClassifiedItem[]    | batch_size from config             |

---

#### Layer 3: Scoring

**[From/To description]**: [Classified and deduplicated nodes] → [score formula] computed on [event trigger] → [score] attached to [primary entity] → enables [visualization highlight and alerting].

**Algorithm/Pattern Description**: [`[score_name] = [formula]` — computed via [DB trigger / application function] on every [upsert/update event]; result cached to [local file] for zero-latency reads by the API layer.]

**Configuration Schema (core sections)**:

```yaml
scoring:
  scope: system_global
  type: object
  mutability: deployment_configurable
  validation: formula must reference valid column names; threshold must be 0 < x ≤ 1
  impact: controls which entities surface as high-priority in visualization and alerts

alert_threshold:
  scope: deployment_configurable
  type: number
  mutability: runtime_configurable
  validation: float between 0.0 and 1.0
  impact: determines when alert channel notifications are triggered
```

**Interface Pattern**: `[computeScore](entityId, stats)` → [reads ask/solution counts] → [applies formula] → [writes score to DB] → [flushes to local cache] → complexity: O(1) per entity

**Design Compliance**:

| Context          | Intent                     | Directive                                                                                   | Module/Component       | Class/Object     | Function/Method   | Dependency       | Input                | Output              | Decision Logic                        |
|------------------|----------------------------|---------------------------------------------------------------------------------------------|------------------------|------------------|-------------------|------------------|----------------------|---------------------|---------------------------------------|
| Determinism      | Reproducible scores        | - [ ] Use fixed formula and column types; forbid floating-point non-determinism across runs| [scoring_module]       | [ScorerClass]    | [computeScore]    | [db_lib]         | entity stats         | score: float        | `[formula]`                           |
| Cache Coherence  | Keep local reads fresh     | - [ ] Flush score to [local_file] after every DB write; forbid serving stale cache         | [scoring_module]       | [CacheClass]     | [flushToLocal]    | [fs_lib]         | scored nodes[]       | [local_file].json   | write-through on every upsert          |
| Threshold Config | Externalise alert boundary | - [ ] Read threshold from config; forbid hardcoded numeric literals in alert logic         | [alert_module]         | —                | [checkThreshold]  | —                | score, config        | bool                | `score > config.alert_threshold`      |

---

## Component Responsibility Matrix

| Layer/Subsystem     | Path/Module                       | Component               | Interface/Method          | Responsibility (S-V-O)                                                              | Dependencies                          | Contracts                                      | LOC    |
|---------------------|-----------------------------------|-------------------------|---------------------------|--------------------------------------------------------------------------------------|---------------------------------------|------------------------------------------------|--------|
| [Ingestion]         | `[src/scraper/]`                 | [ScraperClass]          | `[fetchItems]`            | [Scraper] fetches raw items → normalises schema → returns unified RawItem[]          | `[http_lib]`, `[auth_lib]`            | Must return ≥[N] items per source per run      | ~[n]   |
| [Orchestration]     | `[src/orchestrator/]`            | [OrchestratorClass]     | `[runPipeline]`           | [Orchestrator] sequences stages → enforces rate limits → fans out concurrently       | `[scraper]`, `[classifier]`           | Must not drop items; must retry on failure     | ~[n]   |
| [Classification]    | `[src/classifier/]`              | [ClassifierClass]       | `[classifyItem]`          | [Classifier] routes items → prompts [AI model] → returns typed ClassifiedItem        | `[proxy_lib]`, `[schema_lib]`         | Must classify as [type_a] or [type_b]; no null | ~[n]   |
| [Deduplication]     | `[src/dedup/]`                   | [DeduplicatorClass]     | `[isDuplicate]`           | [Deduplicator] checks local cache → drops duplicates → passes novel items forward    | `[fs_lib]`, `[hash_lib]`             | Must use deterministic key; must update cache  | ~[n]   |
| [Storage & Scoring] | `[src/storage/]`                 | [StorageClass]          | `[upsertNode]`            | [Storage] upserts node → triggers score recompute → flushes to local cache file      | `[db_lib]`, `[fs_lib]`               | Must be idempotent; score must be non-null     | ~[n]   |
| [Queue]             | `[src/queue/]`                   | [QueueClass]            | `[enqueueRecalc]`         | [Queue] enqueues recalc jobs → workers process → scheduler fires on cadence          | `[queue_lib]`, `[scheduler_lib]`     | Must not lose jobs; must retry on worker fail  | ~[n]   |
| [API]               | `[src/api/]`                     | [ApiHandlerClass]       | `[handleGraphRequest]`    | [API] reads from [persistence] → shapes [data_format] payload → responds at edge     | `[db_lib]`, `[serializer]`           | Must return valid [data_format]; ≤[N]ms p99   | ~[n]   |
| [Presentation]      | `[src/frontend/]`                | [CanvasClass]           | `[render]`                | [Canvas] polls API → applies layout → renders [visualization type] with interactions | `[render_lib]`, `[layout_lib]`       | Must load ≤[N]s; must re-render on data change | ~[n]   |
| [Alert]             | `[src/alert/]`                   | [AlertClass]            | `[checkAndNotify]`        | [Alert] scans scores → matches watchlist → pushes notification to [channel]           | `[bot_lib]`, `[queue_lib]`           | Must deliver < [N]min after trigger            | ~[n]   |

---

## Dependency & Integration Standards

**Dependency Declaration**

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| [Runtime Deps]       | Declare all runtime packages    | - [ ] List in [package_manifest]; pin versions; forbid implicit transitive reliance         |
| [Dev Deps]           | Separate dev-only tooling       | - [ ] Isolate in [dev_section]; forbid shipping dev tools in production bundle              |
| [Env / Secrets]      | Externalise credentials         | - [ ] Reference via env vars; document in `.env.example`; forbid committed secrets         |

**Integration Contracts**

- **[Ingestion → Classification]**:
  - Must pass items conforming to `[RawItem]` schema.
  - `[source_id]` uses [format/pattern] defined in [schema location].
- **[Classification → Storage]**:
  - Must include `[type_field]`, `[label_field]`, `[metadata_field]`.
  - `[metadata]` section defines [keywords/tags/scores].
- **[Storage → API]**:
  - Must expose `[nodes]` and `[edges]` in [data_format]-ready shape.
  - `[score_field]` must be non-null on every [primary entity].

**Coupling Metrics**

- [Presentation Layer] is decoupled from [Persistence Layer]:
  - [Presentation] only depends on `[/api/endpoint]` shape, not DB schema.
  - [Score threshold] is attached via config, not hardcoded in alert logic.

---

## Code Organization Framework

**Directory Structure (relevant subset)**:

```text
[project_name]/
├── .github/
│   └── workflows/
│       └── deploy.yml              # [CI/CD platform] → auto-deploy on push to [branch]
├── [infra_config_file]             # [Hosting platform] config
├── package.json
├── data/                           # [Local storage] (gitignored in prod)
│   ├── cache.[ext]                 # Dedup session cache
│   └── [watchlist].[ext]          # User [watchlist / config] (local dev)
├── src/
│   ├── scraper/                    # [Source A] + [Source B] + [Source C] clients
│   ├── classifier/                 # [AI proxy] → [AI model] classify + tag
│   ├── orchestrator/               # [Orchestrator] skills manifest + rate-limit middleware
│   ├── queue/                      # [Queue tool] workers + [scheduler] schedules
│   ├── storage/                    # [DB service] upsert + [score trigger] + local flush
│   ├── api/                        # [API hosting] handler — [primary endpoint] + [data shape]
│   ├── frontend/                   # [Rendering library] canvas static ([frontend hosting])
│   └── alert/                      # [Bot/channel] handlers + alert loop
├── [schema_dir]/
│   └── schema.[ext]                # [DB service] schema + [score trigger/function]
└── README.md
```

**Naming Conventions**

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| [Language A] Files   | Follow standards                | - [ ] Use [naming_convention]; [casing for types]; forbid [anti-pattern]                  |
| [Format A] Properties| Maintain consistency            | - [ ] Use [naming_convention]; [casing for fields]; forbid [anti-pattern]                 |
| [Config] Keys        | Align with standards            | - [ ] Use [naming_convention]; [nesting strategy]; forbid [anti-pattern]                  |
| Constants            | Signal immutability             | - [ ] Use SCREAMING_SNAKE_CASE; co-locate with module; forbid magic literals              |

**File Organization**

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| Module Size          | Maintain readability            | - [ ] Keep files under [N] LOC; split at layer boundaries; forbid monolithic files        |
| Function Length      | Enable comprehension            | - [ ] Limit functions to [N] lines; extract helpers; forbid deep nesting (>[N] levels)   |
| Import Organization  | Clarify dependencies            | - [ ] Group [stdlib], [third-party], [local]; sort alphabetically; forbid mixed groups    |

---

## Testing & Quality Standards

**Test Coverage Metrics**

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| Unit Tests           | Validate individual functions   | - [ ] Test pure functions in isolation; mock I/O; forbid untested scoring logic            |
| Integration Tests    | Verify pipeline interactions    | - [ ] Test full ingestion → classification → storage pipeline; use fixture data            |
| [Alert Tests]        | Verify threshold triggering     | - [ ] Inject known scores; assert notification fired; forbid live channel in CI            |

**Test Categories**

- **[Scraper Tests]**:
  - Each [source client] can be exercised via [mock HTTP server / recorded fixtures].
- **[Classification Tests]**:
  - [Classifier] can be exercised with [mock proxy responses]; schema validated on output.
- **[Scoring Tests]**:
  - [Scoring formula] unit-tested against known inputs; [DB trigger] verified with [test DB].
- **[End-to-End Tests]**:
  - Full pipeline from [raw source item] → [classified node] → [scored record] → [API response] → [canvas render] validated.

**Quality Gates**

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| [Schema] Validation  | Ensure API contract compliance  | - [ ] Validate [data_format] shape; check required fields; forbid malformed payloads       |
| [Config] Validation  | Prevent runtime errors          | - [ ] Parse config on startup; validate required keys; forbid late-stage failures          |
| [Score] Validation   | Guarantee non-null metrics      | - [ ] Assert score is float in [0, max]; forbid null scores on any [primary entity]        |

---

## PART 4 — CRITICAL PATH: 0 → 1 IN [N] HOURS ([CONSTRAINT])

> **[Team size].** [Sequencing rationale]. Hard deadline: H[N:MM] [milestone event].

| Task                                                                   | Hour  | Status | Category                     |
|------------------------------------------------------------------------|-------|--------|------------------------------|
| [SCM] repo init + [infra config] + [hosting] config                   | 0:00  | ☐      | Infra, SCM, Deploy           |
| [DB service] — provision + schema ([primary_table], [relationship_table], [score_trigger]) | 0:10 | ☐ | DB, Infra           |
| [Source A] + [Source B] + [Source C] — fetch raw items                | 0:20  | ☐      | Scrape, Data                 |
| [Orchestrator] skills manifest — rate-limit + retry wrapper           | 0:30  | ☐      | Orchestration                |
| [AI proxy] local proxy + [AI model] API — classify + tag items        | 0:40  | ☐      | AI, Data                     |
| [Local storage] — write dedup cache to `[data/cache.ext]`            | 0:50  | ☐      | Local Storage                |
| [DB service] upsert + [score trigger] + flush → `[data/nodes.ext]`   | 1:00  | ☐      | DB, Logic                    |
| [API hosting] — `[/api/primary_endpoint]` → [data_format] shape       | 1:15  | ☐      | API, Edge                    |
| [Queue tool] + [scheduler] — live recalc pipeline wiring              | 1:30  | ☐      | Queue, Orchestration         |
| [Alert channel] bot — token + webhook + `[/cmd_a]` / `[/cmd_b]`      | 1:45  | ☐      | Bot, Infra                   |
| [Rendering library] [visualization type] — [entity/edge] scaffold ([frontend hosting]) | 2:00 | ☐ | Frontend, Graph      |
| [Grouping mechanism] + [visual encoding]                              | 2:15  | ☐      | Frontend, UX                 |
| [Interaction A] + [Interaction B] + [edge bundling]                   | 2:30  | ☐      | Frontend, UX                 |
| **Wire `[/api/endpoint]` [API hosting] → [rendering library] canvas** | **2:40** | **☐** | **Integration**           |
| [Alert channel] alert loop — [score_name] > [threshold] → DM         | 2:50  | ☐      | Bot, Alerts, P0              |
| `git push [branch]` → [CI/CD platform] → auto-deploy [hosting services] | 2:55 | ☐   | CI/CD, Deploy                |
| **DEMO READY: [live demo action] on stage**                           | **[N:MM]** | **☐** | **Demo, P0**             |

> **P0 risk:** [Highest-risk task] (H[N:MM] task) is the most commonly missed milestone — wire and test this before polishing the UI.

---

## PART 5 — COST-BENEFIT MATRIX

| Tool / Service         | Role in [Project Name]                                              | License             | Local / Cloud     | Free Tier Limit           | Est. [Build Phase] Usage  | Headroom             | Category              | Risk   |
|------------------------|---------------------------------------------------------------------|---------------------|-------------------|---------------------------|---------------------------|----------------------|-----------------------|--------|
| [SCM + CI/CD]          | Source control + auto-deploy on `git push`                         | [License] / Free    | Local + Cloud SCM | [N] CI min/month          | ~[N] push cycles          | ✅ Very high          | SCM, Deploy           | Low    |
| [Local storage]        | Dedup cache + [watchlist] — zero infra, instant reads              | [License]           | **Local**         | Disk only                 | ~[N] entries              | ✅ Zero infra         | Memory, Cache         | Low    |
| [Source A client]      | [Source A] scraping via official [auth method]                     | [License]           | Local process     | [N] req/min               | ~[N]–[N] requests         | ✅ Well within        | Scrape, Data          | Low    |
| [Source B client]      | [Source B] items via [endpoint type]                               | [License] / Free    | Local process     | Unlimited                 | ~[N] queries              | ✅ No limit           | Scrape, Data          | Low    |
| [Source C client]      | [Source C] [item type] + [sub-type]                                | [License] / Free    | Local process     | [N] req/day               | ~[N] requests             | ✅ High               | Scrape, Data          | Low    |
| [Orchestrator]         | Skills manifest, rate-limiting, retry                              | — / Free            | Local process     | Free tier                 | Light orchestration       | ✅ Comfortable        | Orchestration         | Low    |
| [AI proxy]             | Local AI proxy router — model-agnostic                             | [License]           | **Local process** | Self-hosted / free        | [N] proxied calls         | ✅ No cost            | AI, Proxy             | Low    |
| [AI model] API         | Classify + tag items via [AI proxy]                                | [License] (model)   | Cloud API         | [N] req/day free          | ~[N] classifications      | ⚠️ At limit — batch carefully | AI, Classification | Medium |
| [Queue tool]           | [Score] recalc job queue + retry workers                           | [License]           | Local process     | Self-hosted / free        | [N] queue, ~[N] runs/hr   | ✅ No cost            | Queue                 | Low    |
| [Queue backing store]  | [Queue tool] backing store                                         | [License] (client)  | Cloud             | [N] cmd/day               | ~[N] queue ops            | ✅ Comfortable        | Queue Infra           | Low    |
| [Database service]     | Persistent [primary_entities], [relationships], [score_col]        | [License] (client)  | **Cloud DB**      | [N] GB, autoscales to zero| ~[N] MB (≤[N] nodes)      | ✅ Very high          | DB, Graph             | Low    |
| [API hosting]          | Edge API — `[/api/endpoint]`, alert loop                           | — / Free tier       | **Edge**          | [N] req/day               | ~[N] API calls            | ✅ Very high          | Deploy, API           | Low    |
| [Frontend hosting]     | Static [visualization] CDN hosting                                 | — / Free tier       | **Edge**          | Unlimited requests        | Browser-side only         | ✅ No server cost     | Deploy, Frontend      | Low    |
| [Alert channel] bot    | [DM intake + alert delivery + commands]                            | [License] (client)  | Cloud             | Unlimited                 | ~[N] test messages        | ✅ No limit           | Bot, Alerts           | Low    |
| [Rendering library]    | Frontend [visualization type] rendering                            | [License]           | Browser           | Self-hosted               | Browser-side only         | ✅ No server cost     | Frontend              | Low    |
| **Total**              |                                                                     | **All [FOSS/free]** | **[Local/Edge]**  |                           |                           | **$[N]/month**        | **Full stack**        | **Low** |

---

## Operational Configuration: Environment Wiring

**[System] Environment Variables**:

| Variable                          | Scope             | Default                            | Impact                                              |
|-----------------------------------|-------------------|------------------------------------|-----------------------------------------------------|
| `[SOURCE_A_CLIENT_ID]`            | [scope]           | `[default]`                        | Controls authentication to [Source A] API           |
| `[SOURCE_A_CLIENT_SECRET]`        | [scope]           | `[default]`                        | Controls authentication to [Source A] API           |
| `[AI_PROXY_BASE_URL]`             | [scope]           | `http://localhost:[port]`          | Points [classifier] at [AI proxy] instance          |
| `[AI_MODEL_API_KEY]`              | [scope]           | `[default]`                        | Authenticates calls to [AI model] via [AI proxy]    |
| `[DB_CONNECTION_STRING]`          | [scope]           | `[default]`                        | Controls [DB service] connectivity                  |
| `[QUEUE_BACKING_URL]`             | [scope]           | `[default]`                        | Points [queue tool] at [backing store]              |
| `[ALERT_BOT_TOKEN]`               | [scope]           | `[default]`                        | Authenticates [alert channel] bot                   |
| `[ALERT_THRESHOLD]`               | [scope]           | `[0.7]`                            | Controls minimum [score_name] for alert dispatch    |
| `[API_POLL_INTERVAL_MS]`          | [scope]           | `[60000]`                          | Controls frontend polling cadence                   |

**Artifact Generation**: `[cache.ext]` (dedup session cache) | `[nodes.ext]` (scored node snapshot) | `[watchlist.ext]` (user keyword config)

**[Workflow] Integration**:

| Step | Action                                    | Command/Trigger                          | Artifact Consumer                   |
|------|-------------------------------------------|------------------------------------------|-------------------------------------|
| 1    | Provision [DB service] + apply schema     | Manual / [migration tool]                | [Storage module]                    |
| 2    | Start [AI proxy] local server             | `[start_command]`                        | [Classifier module]                 |
| 3    | Run ingestion + classification pipeline   | `[run_command]` or [scheduler trigger]   | [Storage module]                    |
| 4    | Deploy [API hosting] + [frontend hosting] | `git push [branch]` → [CI/CD platform]  | [Browser / frontend]                |
| 5    | Validate [alert channel] bot webhook      | `[test_command]` / manual DM            | [Alert module]                      |

---

## Data Flow

**Pipeline**: [Source Fetch] → [Orchestration] → [Classification] → [Deduplication] → [Storage & Scoring] → [Queue] → [API Exposure] → [Alerting] → [Rendering]

| Stage                | Input                                | Output                               | Responsibility                                                   | Performance Consideration                       |
|----------------------|--------------------------------------|--------------------------------------|------------------------------------------------------------------|-------------------------------------------------|
| [Source Fetch]       | [Source configs]                     | [RawItem[]]                          | [Scraper] fans out requests → normalises → returns unified list  | Concurrent per source; bounded by rate limits   |
| [Orchestration]      | [RawItem[]]                          | [Sequenced task DAG]                 | [Orchestrator] enforces order, retries, and concurrency limits   | Retry budget per source; fail-fast on auth      |
| [Classification]     | [RawItem[]]                          | [ClassifiedItem[]]                   | [Classifier] routes via proxy → tags type + keywords            | Batch to stay within model free tier            |
| [Deduplication]      | [ClassifiedItem[]]                   | [NovelItem[]]                        | [Deduplicator] checks local cache → drops seen items            | O(1) hash lookup per item                       |
| [Storage & Scoring]  | [NovelItem[]]                        | [ScoredNode[] + local cache flush]   | [Storage] upserts → triggers score → flushes to local file      | Trigger runs in DB; flush is async write        |
| [Queue]              | [Score change events]                | [Recalc jobs]                        | [Queue] enqueues → workers process → scheduler fires            | Worker pool sized to queue depth                |
| [API Exposure]       | [Scored nodes + edges from DB]       | [[data_format]-ready payload]        | [API handler] reads DB → shapes payload → responds at edge      | Edge caching; target ≤[N]ms p99                 |
| [Alerting]           | [Scored nodes + watchlist]           | [[channel] notifications]            | [Alert module] filters by threshold ∩ watchlist → dispatches   | Runs every [N] min; debounced per entity        |
| [Rendering]          | [[data_format] payload from API]     | [Interactive visualization]          | [Canvas] polls → applies layout → renders with interactions      | ≤[N]s initial load; re-render on poll           |

---

## End-to-End User Journey + Workflow + Data Flow

> This single table is the complete live blueprint from [any source signal] → [classified entity] → [metric score] → [interactive visualization] that [primary persona] can explore in real time.

| ID    | Stage                   | Workflow Step                                        | Data Flow (Sources → Output)                                                                          | Tools / Components                                  | User Journey Touchpoint                           | Rendering in [Visualization]                                        | Notes / Critical Path ([N]h MVP)              |
|-------|-------------------------|------------------------------------------------------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------|---------------------------------------------------|---------------------------------------------------------------------|------------------------------------------------|
| DF-01 | Ingestion               | Live [source type] scraping (no manual intervention) | [Source A], [Source B], [Source C] → raw unstructured items                                           | [Source A client] + [Source B client] + [Source C client] | U1 & U2 – fresh signals appear instantly       | N/A (backend only)                                                  | H0:20 – official API fetch                    |
| DF-02 | Orchestration           | Skills manifest — rate-limit + fan-out               | Raw fetch tasks → [Orchestrator] DAG controls concurrency, retries, API auth                          | [Orchestrator]                                      | All U's – reliable ingestion without crashes      | N/A (backend only)                                                  | H0:30 – orchestrator wiring                   |
| DF-03 | Classification          | AI tagging via [AI proxy] → [AI model]               | Raw items → [AI proxy] (local) routes to [AI model] → classified as **[type_a]** or **[type_b]** + keywords + tags | [AI proxy] + [AI model] API             | U1 & U2 – [type_a] vs [type_b] separated automatically | Nodes typed & colored ([type_a] = [position_a], [type_b] = [position_b]) | H0:40 – [AI model] classification        |
| DF-04 | Deduplication           | Local flat-file cache check                          | Classified items → checked against `[data/cache.ext]`; duplicates dropped before DB write            | [Local storage]                                     | All U's – clean, spam-free canvas                 | Prevents duplicate nodes & crossed edges                            | H0:50 – local [format] dedup                  |
| DF-05 | Storage & Scoring       | [DB service] upsert + auto [score_name] trigger      | Deduplicated nodes → [DB service] (`[primary_table]` + `[relationship_table]`); **`[score_name] = [formula]`** on insert trigger; result flushed back to `[data/nodes.ext]` | [DB service] + [DB trigger/function] + [local flush] | U3 – high-[metric] items flagged | [Score] on every [type_a] node (color intensity + label)           | H1:00 – [DB service] + trigger                |
| DF-06 | Pipeline                | [Score] recalculation job queue                      | New/updated nodes → [Queue tool] job enqueued → [scheduler] fires full recalc                        | [Queue tool] + [Scheduler]                          | U1 & U2 – canvas stays current without manual refresh | Edges & node positions re-layout on [metric] change             | H1:30 – [Queue tool] wiring                   |
| DF-07 | API Exposure            | [Data format] endpoint (edge-hosted)                 | Aggregated nodes/edges/[score_col] from [DB service] → clean [data_format]-ready JSON via [API hosting] | [API hosting] `[/api/endpoint]`                  | All U's – data delivered to browser at edge       | Single source of truth for every poll                               | H1:15 – [API hosting] endpoint                |
| DF-08 | Alerting                | High-[metric] detection & delivery                   | `[score_name] > [threshold]` ∩ user watchlist (`[data/watchlist.ext]`) → instant [channel] alert with direct canvas link | [Alert bot] + [Queue] alert worker     | U3 – "[alert message]"                            | Alert links into highlighted [metric] cluster                       | H2:50 – P0 [channel] live alert               |
| DF-09 | Canvas Loading          | Browser loads interactive [visualization] (CDN)      | User opens [Project Name] ([frontend hosting]) → `fetch('[/api/endpoint]')` every [N]s               | [Rendering library] + [Frontend hosting]            | U1 & U2 – open tab and see live [visualization]  | Initial [layout type] layout (≤[N]s load)                          | H2:00 – [rendering lib] scaffold + H2:40 convergence |
| DF-10 | User Interaction        | [Interaction A], [Interaction B], [Interaction C], [metric] exploration | Polled [data_format] + user actions → real-time canvas updates              | [Rendering library] [layout type] + custom [grouping mechanism] | U1 (see whitespace), U2 (pick validated [entity] in <[N] min), U3 (jump from alert) | • [Grouping mechanism] • [Interaction A] with animation • [Interaction B] traces + sidebar • [Interaction C] → [visual feedback] | H2:15–2:30 – [grouping] UX + [Interaction B]  |
| DF-11 | Final Visualization     | [Visualization type] knowledge graph canvas          | All upstream data synthesized → live interactive [Metric] Map                                         | [Rendering library] (client-side, [Frontend hosting]) | Complete journey: Research → Ideation → Monitoring → Action | Full [visualization type] with [metric] highlights, [edge rendering], zoom/pan, [metric] threshold slider | Demo-ready at H[N:MM] on [frontend hosting] |

**How to use this table**
- **Filter by column** → e.g. filter "User Journey" = U3 to see only [passive monitoring] flow.
- **Filter by Source** → the Ingestion row shows all [N] official [source type] sources ([Source A], [Source B], [Source C]).
- **Sort by Critical Path** → see exact [N]-hour [team size] build order.
- Everything runs on **$[N] TCO** ([hosting services] free tiers, local-first) and updates **[cadence]**.

---

## Design Decisions & Trade-offs

| Decision                              | Rationale                                      | Pros                                                        | Cons                                          | Mitigation                                           |
|---------------------------------------|------------------------------------------------|-------------------------------------------------------------|-----------------------------------------------|------------------------------------------------------|
| [Local-first storage]                 | [Zero infra; instant reads]                    | Zero cost, zero latency for dedup checks                    | Not shared across instances; lost on reset    | Flush to [persistent store] on interval              |
| [Model-agnostic AI proxy]             | [Avoid vendor lock-in; swap without code change]| Swap models via config; testable with mocks                | Extra hop adds ~[N]ms latency                  | Self-host proxy locally; benchmark per model          |
| [DB trigger for score computation]    | [Keep score logic atomic with upsert]          | Score always consistent with data; no race condition        | DB-specific SQL; harder to test outside DB    | Abstract score formula into tested pure function      |
| [Edge-hosted API layer]               | [Global low-latency; free tier generous]       | ≤[N]ms p99 globally; [N] req/day free                      | Cold start latency on first request            | Warm with [N]s polling from frontend                  |
| [Open source + $0 TCO]               | [Maximize accessibility; community adoption]   | No billing risk; forkable; trust from community             | Free tier limits constrain scale               | Document all limits; provide paid-tier upgrade paths  |

---

## [System/Process] Directives

### Ingestion Directives

| Context              | Intent                          | Directive                                                                                   | Enforcement Mechanism                        |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------|
| Source Auth          | Protect API credentials         | - [ ] Read credentials from env vars; forbid committed secrets                             | CI secret scanning; `.env.example` checked in|
| Rate Limiting        | Respect source limits           | - [ ] Enforce per-source rate limits; backoff on 429; forbid flooding                      | [Orchestrator] token-bucket middleware        |
| Error Isolation      | Prevent cascade failures        | - [ ] Catch per-source errors; continue other sources; forbid full-pipeline halt           | Try/catch per source; logged and monitored    |

### Classification Directives

| Context              | Intent                          | Directive                                                                                   | Enforcement Mechanism                        |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------|
| Model Agnosticism    | Avoid vendor lock-in            | - [ ] Route all calls through [AI proxy]; forbid direct model SDK calls                   | Code review; [AI proxy] as only import       |
| Output Validation    | Ensure parseable response       | - [ ] Validate JSON schema on response; retry on malformed; forbid silent null nodes       | Schema lib + retry wrapper in classifier     |
| Cost Control         | Stay within free tier           | - [ ] Batch to [N] per call; track daily usage; forbid unbounded single-item loops        | Counter in [local storage] or env var        |

### Scoring & Alerting Directives

| Context              | Intent                          | Directive                                                                                   | Enforcement Mechanism                        |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------|
| Score Determinism    | Reproducible metrics            | - [ ] Use fixed formula and column types; forbid formula changes without migration         | Formula defined in single config location    |
| Threshold Config     | Externalise alert boundary      | - [ ] Read threshold from env/config; forbid hardcoded literals in alert logic             | Env var `[ALERT_THRESHOLD]`; validated on start|
| Alert Deduplication  | Prevent notification spam       | - [ ] Debounce alerts per [entity] per [window]; forbid repeated alerts for same trigger  | Per-entity cooldown tracked in [local store] |

---

## Documentation Coverage

**Document Sources in `[automation_script]`**:

| Document                        | Purpose                                                         | Quality Gates                      | Steward              |
|---------------------------------|-----------------------------------------------------------------|------------------------------------|----------------------|
| `README.md`                     | Setup, deployment, and demo instructions                        | complete, accurate, runnable       | [Tech Lead]          |
| `pitchdeck-prd-tad-template.md` | Universal pitch deck + PRD + TAD template (this document)       | generic, placeholder-complete      | [Product Lead]       |
| `[schema_dir]/schema.[ext]`     | Canonical DB schema + [score trigger/function]                  | valid SQL, trigger tested          | [Data Lead]          |
| `.env.example`                  | All required env vars documented with descriptions and defaults | no secrets, all keys present       | [DevOps Lead]        |
| `[infra_config_file]`           | [Hosting platform] deployment config                            | valid config, routes defined       | [DevOps Lead]        |

---

## Anti-Patterns (Forbidden)

| Context                    | Intent                          | Directive                                                                                   |
|----------------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| Hardcoded credentials      | Protect secrets                 | - [ ] Always use env vars; document in `.env.example`; forbid committed API keys          |
| Direct model SDK calls     | Maintain model agnosticism      | - [ ] Route through [AI proxy]; forbid importing model SDK directly in business logic      |
| Silent classification drops| Ensure data integrity           | - [ ] Log and retry malformed responses; forbid discarding items without trace             |
| Stale local cache          | Prevent data drift              | - [ ] Flush on interval; validate on read; forbid serving local cache without TTL check   |
| Monolithic pipeline        | Enable independent deployment   | - [ ] Separate ingestion, classification, scoring, and rendering; forbid single-file pipelines |
| Live channel in CI tests   | Avoid test pollution            | - [ ] Mock [alert channel] in test env; forbid real bot messages during CI runs            |

---

## Repository Health Checklist

**Structural Health**:

| Context              | Status | Directive                                                                                   |
|----------------------|--------|---------------------------------------------------------------------------------------------|
| Directory structure  | [✓/✗]  | - [ ] Matches [code organization framework]; validate on PR; forbid ad-hoc file placement  |
| Schema migrations    | [✓/✗]  | - [ ] All schema changes in `[schema_dir]/`; versioned; forbid manual DB edits in prod     |
| `.env.example` sync  | [✓/✗]  | - [ ] All env vars in `.env.example`; validated on PR; forbid undocumented variables       |

**Maintainability**:

| Context              | Status | Directive                                                                                   |
|----------------------|--------|---------------------------------------------------------------------------------------------|
| Module size          | [✓/✗]  | - [ ] No file exceeds [N] LOC; split at layer boundaries; forbid monolithic modules        |
| Test coverage        | [✓/✗]  | - [ ] Unit tests for scoring formula; integration test for pipeline; forbid untested paths |
| Dependency pinning   | [✓/✗]  | - [ ] All deps pinned in [package_manifest]; audit on PR; forbid floating versions         |

**Operations**:

| Context              | Status | Directive                                                                                   |
|----------------------|--------|---------------------------------------------------------------------------------------------|
| CI/CD pipeline       | [✓/✗]  | - [ ] Auto-deploy on push to [branch]; lint + test gate; forbid manual deploys             |
| Alert loop tested    | [✓/✗]  | - [ ] [Alert channel] bot tested before demo; end-to-end alert verified; forbid untested P0|
| Free tier headroom   | [✓/✗]  | - [ ] Usage logged per service; alert at [N]% of limit; forbid silent limit exhaustion     |

---

## Version Control Standards

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| Branch strategy      | Protect main / production       | - [ ] Work in feature branches; merge via PR; forbid direct push to [main branch]         |
| Commit messages      | Enable changelog generation     | - [ ] Use [conventional commits] format; reference issue/task; forbid "fix" / "stuff" msgs|
| Schema versioning    | Track DB evolution              | - [ ] Prefix migration files with [timestamp/sequence]; document in PR; forbid destructive changes without migration |
| Tagging & releases   | Communicate stability           | - [ ] Tag releases as `v[x.y.z]`; update changelog; forbid untagged production deploys    |

---

*[Project Name] · [License] · $[N] TCO · [Team Size] Build · [Locality Philosophy]*
