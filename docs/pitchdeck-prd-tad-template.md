---
# ══════════════════════════════════════════════════════════════════════════════
# YAML MERMAID FRONTMATTER — KNOWLEDGE GRAPH NEURAL NETWORK
# ══════════════════════════════════════════════════════════════════════════════
# The Markdown file IS the semantic payload.
# This frontmatter IS the neural network — wiring the payload into the graph.
#
# Shape → Primitive mapping (Mermaid + body sigils):
#   [ ]   rect          @node      entity / placeholder
#   (( )) circle        @cluster   cluster ref (inline, not subgraph def)
#   {{ }} hexagon       @edge      named relation node
#   { }   diamond       @node      placeholder / stub (unresolved)
#   subgraph            @cluster   cluster / group definition
# ══════════════════════════════════════════════════════════════════════════════

# ── DOCUMENT IDENTITY ─────────────────────────────────────────────────────────
doc:
  id: "doc:template:pitchdeck-prd-tad"
  title: "[Project Name]"
  subtitle: "[Tagline A] · [Tagline B] · [Tagline C]"
  type: template
  version: "[x.y.z]"
  created: "[date]"
  license: "[License]"

# ── NODES ─────────────────────────────────────────────────────────────────────
# Sigil: @node:namespace:id
# Mermaid shape: n_id["@node:namespace:id · label"]   rect [ ]
# Body inline:   [Placeholder Text]<!-- @node:namespace:id -->
nodes:

  # Identity & Meta
  - @node:project:name:        { label: "[Project Name]",           status: placeholder }
  - @node:project:tagline-a:   { label: "[Tagline A]",              status: placeholder }
  - @node:project:tagline-b:   { label: "[Tagline B]",              status: placeholder }
  - @node:project:tagline-c:   { label: "[Tagline C]",              status: placeholder }
  - @node:meta:license:        { label: "[License]",                status: placeholder }
  - @node:meta:tco:            { label: "$[N]/month",               status: placeholder }
  - @node:meta:team:           { label: "[Team Size]",              status: placeholder }
  - @node:meta:timeline:       { label: "[N] hours",                status: placeholder }

  # Design
  - @node:design:mantras:      { label: "[Context A..F]",           status: placeholder }
  - @node:design:principles:   { label: "Universal Principles",     status: active }

  # Personas
  - @node:persona:primary:     { label: "[Primary Persona]",        status: placeholder }
  - @node:persona:secondary:   { label: "[Secondary Persona]",      status: placeholder }
  - @node:persona:tertiary:    { label: "[Tertiary Persona]",       status: placeholder }

  # Pain / Problem
  - @node:pain:a:              { label: "[Pain point A]",           status: placeholder }
  - @node:pain:b:              { label: "[Pain point B]",           status: placeholder }
  - @node:pain:c:              { label: "[Pain point C]",           status: placeholder }

  # Solution / Features
  - @node:feature:1:           { label: "[Feature 1 Name]",         status: placeholder }
  - @node:feature:2:           { label: "[Feature 2 Name]",         status: placeholder }
  - @node:feature:3:           { label: "[Feature 3 Name]",         status: placeholder }

  # Market
  - @node:market:tam:          { label: "[TAM figure]",             status: placeholder }
  - @node:market:sam:          { label: "[SAM figure]",             status: placeholder }
  - @node:market:primary-a:    { label: "[user type A]",            status: placeholder }
  - @node:market:primary-b:    { label: "[user type B]",            status: placeholder }
  - @node:market:buyer-a:      { label: "[buyer type A]",           status: placeholder }

  # Competitors
  - @node:competitor:a:        { label: "[Competitor A]",           status: placeholder }
  - @node:competitor:b:        { label: "[Competitor B]",           status: placeholder }
  - @node:competitor:c:        { label: "[Competitor C]",           status: placeholder }
  - @node:competitor:d:        { label: "[Competitor D]",           status: placeholder }

  # Ask / Milestones
  - @node:milestone:a:         { label: "[Milestone A]",            status: placeholder }
  - @node:milestone:b:         { label: "[Milestone B]",            status: placeholder }

  # PRD
  - @node:prd:goal-1:          { label: "[Goal 1]",                 status: placeholder }
  - @node:prd:story-u1:        { label: "U1 [Primary Persona]",     status: placeholder }
  - @node:prd:story-u2:        { label: "U2 [Secondary Persona]",   status: placeholder }
  - @node:prd:story-u3:        { label: "U3 [Tertiary Persona]",    status: placeholder }
  - @node:prd:criteria:        { label: "Acceptance Criteria",      status: placeholder }
  - @node:prd:visualization:   { label: "[Visualization type]",     status: placeholder }
  - @node:prd:grouping:        { label: "[Grouping mechanism]",     status: placeholder }

  # TAD — Stack & Schema
  - @node:tad:stack:           { label: "[Tool A..N]",              status: placeholder }
  - @node:tad:schema:          { label: "[primary_entity]",         status: placeholder }
  - @node:tad:rel-entity:      { label: "[relationship_entity]",    status: placeholder }
  - @node:tad:score:           { label: "[score_name]",             status: placeholder }
  - @node:tad:formula:         { label: "[scoring formula]",        status: placeholder }
  - @node:tad:threshold:       { label: "[threshold]",              status: placeholder }
  - @node:tad:alert-channel:   { label: "[alert channel]",          status: placeholder }
  - @node:tad:ai-proxy:        { label: "[AI proxy]",               status: placeholder }
  - @node:tad:ai-model:        { label: "[AI model]",               status: placeholder }
  - @node:tad:db:              { label: "[Database service]",       status: placeholder }
  - @node:tad:queue:           { label: "[Queue tool]",             status: placeholder }
  - @node:tad:scheduler:       { label: "[Scheduler]",              status: placeholder }

  # TAD — Pipeline Layers
  - @node:tad:layer-ingest:    { label: "[Ingestion Layer]",        status: placeholder }
  - @node:tad:layer-classify:  { label: "[Classification Layer]",   status: placeholder }
  - @node:tad:layer-score:     { label: "[Scoring Layer]",          status: placeholder }
  - @node:tad:layer-queue:     { label: "[Queue Layer]",            status: placeholder }
  - @node:tad:layer-api:       { label: "[API Layer]",              status: placeholder }
  - @node:tad:layer-present:   { label: "[Presentation Layer]",     status: placeholder }
  - @node:tad:layer-alert:     { label: "[Alert Layer]",            status: placeholder }

  # Critical Path
  - @node:path:p0:             { label: "P0 Risk Task",             status: placeholder }
  - @node:path:demo:           { label: "DEMO READY H[N:MM]",       status: placeholder }

  # Cost
  - @node:cost:total:          { label: "$[N]/month TCO",           status: placeholder }

# ── EDGES ─────────────────────────────────────────────────────────────────────
# Sigil: @edge:source-id→target-id
# Mermaid shape: e_id{{"@edge:id · rel"}}   hexagon {{ }}
# Wired inline:  n_source --> e_id --> n_target   OR   n_source -->|rel| n_target
edges:

  - id: @edge:pain→feature
    source: "@node:pain:*"
    target: "@node:feature:*"
    rel: motivates
    dir: out
    weight: 1.0

  - id: @edge:feature→demo
    source: "@node:feature:*"
    target: "@cluster:pitch"
    rel: demonstrated-by
    dir: out

  - id: @edge:solution→goals
    source: "@cluster:pitch"
    target: "@cluster:prd"
    rel: specced-in
    dir: out

  - id: @edge:goals→criteria
    source: "@node:prd:goal-1"
    target: "@node:prd:criteria"
    rel: accepted-via
    dir: out

  - id: @edge:stories→criteria
    source: "@node:prd:story-u*"
    target: "@node:prd:criteria"
    rel: traced-to
    dir: out

  - id: @edge:design→pitch
    source: "@cluster:design"
    target: "@cluster:pitch"
    rel: governs
    dir: out

  - id: @edge:design→tad
    source: "@cluster:design"
    target: "@cluster:tad"
    rel: governs
    dir: out

  - id: @edge:stack→layers
    source: "@node:tad:stack"
    target: "@node:tad:layer-ingest"
    rel: implements
    dir: out

  - id: @edge:schema→db
    source: "@node:tad:schema"
    target: "@node:tad:db"
    rel: persists-in
    dir: out

  - id: @edge:score→alert
    source: "@node:tad:score"
    target: "@node:tad:alert-channel"
    rel: triggers
    dir: out
    condition: "score > threshold"

  - id: @edge:arch→tasks
    source: "@cluster:tad"
    target: "@cluster:path"
    rel: sequenced-by
    dir: out

  - id: @edge:stack→cost
    source: "@node:tad:stack"
    target: "@cluster:cost"
    rel: costed-in
    dir: out

  - id: @edge:market→competitor
    source: "@node:market:tam"
    target: "@node:competitor:*"
    rel: contextualizes
    dir: out

  - id: @edge:p0→demo
    source: "@node:path:p0"
    target: "@node:path:demo"
    rel: gates
    dir: out

# ── CLUSTERS / GROUPS ─────────────────────────────────────────────────────────
# Sigil: @cluster:id
# Mermaid shape: subgraph cluster_id["@cluster:id · Label"]   subgraph
# Cluster ref as inline node: (("@cluster:id"))   circle (( ))
clusters:

  - @cluster:doc:
      label: "Document Identity"
      color: "#6C757D"
      members:
        - "@node:project:name"
        - "@node:project:tagline-a"
        - "@node:project:tagline-b"
        - "@node:project:tagline-c"
        - "@node:meta:license"
        - "@node:meta:tco"
        - "@node:meta:team"
        - "@node:meta:timeline"

  - @cluster:design:
      label: "Design Layer"
      color: "#495057"
      members:
        - "@node:design:mantras"
        - "@node:design:principles"

  - @cluster:pitch:
      label: "PART 1 · Pitch Deck"
      color: "#2D6A4F"
      members:
        - "@node:persona:primary"
        - "@node:pain:a"
        - "@node:pain:b"
        - "@node:pain:c"
        - "@node:feature:1"
        - "@node:feature:2"
        - "@node:feature:3"
        - "@node:market:tam"
        - "@node:market:sam"
        - "@node:competitor:a"
        - "@node:competitor:b"
        - "@node:competitor:c"
        - "@node:competitor:d"
        - "@node:milestone:a"
        - "@node:milestone:b"

  - @cluster:prd:
      label: "PART 2 · PRD"
      color: "#1B4332"
      members:
        - "@node:prd:goal-1"
        - "@node:prd:story-u1"
        - "@node:prd:story-u2"
        - "@node:prd:story-u3"
        - "@node:prd:criteria"
        - "@node:prd:visualization"
        - "@node:prd:grouping"

  - @cluster:tad:
      label: "PART 3 · TAD"
      color: "#081C15"
      members:
        - "@node:tad:stack"
        - "@node:tad:schema"
        - "@node:tad:rel-entity"
        - "@node:tad:score"
        - "@node:tad:formula"
        - "@node:tad:threshold"
        - "@node:tad:alert-channel"
        - "@node:tad:ai-proxy"
        - "@node:tad:ai-model"
        - "@node:tad:db"
        - "@node:tad:queue"
        - "@node:tad:layer-ingest"
        - "@node:tad:layer-classify"
        - "@node:tad:layer-score"
        - "@node:tad:layer-queue"
        - "@node:tad:layer-api"
        - "@node:tad:layer-present"
        - "@node:tad:layer-alert"

  - @cluster:path:
      label: "PART 4 · Critical Path"
      color: "#D62828"
      members:
        - "@node:path:p0"
        - "@node:path:demo"

  - @cluster:cost:
      label: "PART 5 · Cost-Benefit"
      color: "#F77F00"
      members:
        - "@node:cost:total"
        - "@node:tad:stack"

# ── BACKLINKS (lossless cache, derived) ───────────────────────────────────────
backlinks:
  - source: "@cluster:prd"
    rel: references-back
    via: "@edge:solution→goals"
    target: "@cluster:pitch"

  - source: "@cluster:path"
    rel: sequences-from
    via: "@edge:arch→tasks"
    target: "@cluster:tad"

  - source: "@cluster:cost"
    rel: prices-from
    via: "@edge:stack→cost"
    target: "@node:tad:stack"

# ── CROSS-FILE REFS ───────────────────────────────────────────────────────────
# Declared here, defined per project instance
refs:
  - "@node:project:name"
  - "@node:tad:stack"
  - "@node:tad:ai-model"
  - "@node:tad:db"

# ── MERMAID KNOWLEDGE GRAPH ───────────────────────────────────────────────────
# Canonical visual representation of all nodes, edges, clusters above.
# Primitive → Shape mapping:
#   @node      →  n_id["label"]          rect     [ ]
#   @node stub →  n_id{"label"}          diamond  { }   (placeholder/unresolved)
#   @edge      →  e_id{{"label"}}        hexagon  {{ }}
#   @cluster   →  subgraph cluster_id    subgraph
#   @cluster   →  cc_id(("@cluster:id")) circle   (( )) (inline cluster ref)
mermaid: |
  flowchart TB

    subgraph cluster_doc["@cluster:doc · Document Identity"]
      n_name["@node:project:name · [Project Name]"]
      n_tga{"@node:project:tagline-a · [Tagline A]"}
      n_tgb{"@node:project:tagline-b · [Tagline B]"}
      n_tgc{"@node:project:tagline-c · [Tagline C]"}
      n_lic{"@node:meta:license · [License]"}
      n_tco["@node:meta:tco · $[N]/month"]
      n_team{"@node:meta:team · [Team Size]"}
    end

    subgraph cluster_design["@cluster:design · Design Layer"]
      n_mantras["@node:design:mantras · [Context A..F]"]
      n_principles["@node:design:principles · Universal Principles"]
    end

    subgraph cluster_pitch["@cluster:pitch · PART 1 · Pitch Deck"]
      n_persona{"@node:persona:primary · [Primary Persona]"}
      n_pain_a["@node:pain:a · [Pain point A]"]
      n_pain_b["@node:pain:b · [Pain point B]"]
      n_pain_c{"@node:pain:c · [Pain point C]"}
      n_feat1["@node:feature:1 · [Feature 1 Name]"]
      n_feat2["@node:feature:2 · [Feature 2 Name]"]
      n_feat3["@node:feature:3 · [Feature 3 Name]"]
      n_tam["@node:market:tam · [TAM figure]"]
      n_sam["@node:market:sam · [SAM figure]"]
      n_comp_a{"@node:competitor:a · [Competitor A]"}
      n_comp_b{"@node:competitor:b · [Competitor B]"}
      n_comp_c{"@node:competitor:c · [Competitor C]"}
      n_comp_d{"@node:competitor:d · [Competitor D]"}
      n_ms_a["@node:milestone:a · [Milestone A]"]
      n_ms_b["@node:milestone:b · [Milestone B]"]
    end

    subgraph cluster_prd["@cluster:prd · PART 2 · PRD"]
      n_goal["@node:prd:goal-1 · [Goal 1..N]"]
      n_u1["@node:prd:story-u1 · U1"]
      n_u2["@node:prd:story-u2 · U2"]
      n_u3["@node:prd:story-u3 · U3"]
      n_ac["@node:prd:criteria · Acceptance Criteria"]
      n_vis{"@node:prd:visualization · [Visualization type]"}
    end

    subgraph cluster_tad["@cluster:tad · PART 3 · TAD"]
      n_stack["@node:tad:stack · [Tool A..N]"]
      n_schema["@node:tad:schema · [primary_entity]"]
      n_score["@node:tad:score · [score_name]"]
      n_thresh["@node:tad:threshold · [threshold]"]
      n_alert_ch["@node:tad:alert-channel · [alert channel]"]
      n_ai_proxy["@node:tad:ai-proxy · [AI proxy]"]
      n_ai_model["@node:tad:ai-model · [AI model]"]
      n_db["@node:tad:db · [Database service]"]

      subgraph cluster_layers["@cluster:tad:layers · Pipeline Layers"]
        n_l1["@node:tad:layer-ingest · [Ingestion]"]
        n_l2["@node:tad:layer-classify · [Classification]"]
        n_l3["@node:tad:layer-score · [Scoring]"]
        n_l4["@node:tad:layer-queue · [Queue]"]
        n_l5["@node:tad:layer-api · [API]"]
        n_l6["@node:tad:layer-present · [Presentation]"]
        n_l7["@node:tad:layer-alert · [Alert]"]
      end
    end

    subgraph cluster_path["@cluster:path · PART 4 · Critical Path"]
      n_p0["@node:path:p0 · P0 Risk Task"]
      n_demo["@node:path:demo · DEMO READY H[N:MM]"]
    end

    subgraph cluster_cost["@cluster:cost · PART 5 · Cost-Benefit"]
      n_tco2["@node:cost:total · $[N]/month TCO"]
    end

    %% ── EDGE NODES (hexagon {{ }}) = named @edge primitives ──────────
    e_motivates{{"@edge:pain→feature · motivates"}}
    e_specced{{"@edge:solution→goals · specced-in"}}
    e_governs_p{{"@edge:design→pitch · governs"}}
    e_governs_t{{"@edge:design→tad · governs"}}
    e_triggers{{"@edge:score→alert · triggers"}}
    e_sequences{{"@edge:arch→tasks · sequenced-by"}}
    e_costed{{"@edge:stack→cost · costed-in"}}

    %% ── EDGE WIRING ───────────────────────────────────────────────────
    n_name -->|identity-anchor| cluster_pitch
    n_mantras --> e_governs_p --> cluster_pitch
    n_principles --> e_governs_t --> cluster_tad

    n_pain_a --> e_motivates
    n_pain_b --> e_motivates
    n_pain_c --> e_motivates
    e_motivates --> n_feat1
    e_motivates --> n_feat2
    e_motivates --> n_feat3

    n_tam -->|contextualizes| n_comp_a
    n_sam -->|contextualizes| n_comp_b

    cluster_pitch --> e_specced --> n_goal
    n_goal -->|accepted-via| n_ac
    n_u1 -->|traced-to| n_ac
    n_u2 -->|traced-to| n_ac
    n_u3 -->|traced-to| n_ac

    n_stack -->|implements| n_l1
    n_ai_proxy -->|routes| n_l2
    n_ai_model -->|classifies| n_l2
    n_db -->|persists| n_schema
    n_l1 --> n_l2 --> n_l3 --> n_l4 --> n_l5 --> n_l6
    n_l3 --> n_l7

    n_score --> e_triggers
    n_thresh -->|gates| e_triggers
    e_triggers --> n_alert_ch

    n_stack --> e_costed --> n_tco2
    cluster_tad --> e_sequences --> n_p0
    n_p0 -->|gates| n_demo
    n_ms_a -->|milestone| n_demo
    n_ms_b -->|milestone| n_demo
---

# [Project Name]<!-- @node:project:name -->
### [Tagline A]<!-- @node:project:tagline-a --> · [Tagline B]<!-- @node:project:tagline-b --> · [Tagline C]<!-- @node:project:tagline-c -->
*Pitch Deck + PRD + TAD*

---

## Design Mantras<!-- @cluster:design @node:design:mantras -->

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

## Universal Design Principles<!-- @node:design:principles -->

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

## PART 1 — PITCH DECK<!-- @cluster:pitch -->

### One-liner
**[Project Name]<!-- @node:project:name --> [core value proposition verb phrase]** — [one sentence describing who benefits, what it does, and the unique outcome it produces].

---

### Slide 1 · Problem
**[Primary user persona]<!-- @node:persona:primary -->** waste [time/resource] on [current painful workaround]:
- "[Pain point A]<!-- @node:pain:a -->" → [current workaround], [cost or time lost]
- "[Pain point B]<!-- @node:pain:b -->" → [current workaround], [cost or time lost]
- "[Pain point C]<!-- @node:pain:c -->" → gut feel, guesswork

**No tool [cross-references / combines / surfaces] [signal A] against [signal B].**

---

### Slide 2 · Solution
**[Project Name]<!-- @node:project:name -->** is a [product category description] that:
1. **[Feature 1 Name]<!-- @node:feature:1 -->** — [one-sentence description of the capability and its mechanism]
2. **[Feature 2 Name]<!-- @node:feature:2 -->** — [one number / metric that quantifies the core insight]
3. **[Feature 3 Name]<!-- @node:feature:3 -->** — [interactive or exploratory capability that reveals the insight]

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
- **[TAM figure]<!-- @node:market:tam -->** [addressable user group] globally ([year], [source])
- **[SAM figure]<!-- @node:market:sam -->** [secondary addressable group] ([community or source])
- **Primary:** [user type A]<!-- @node:market:primary-a -->, [user type B]<!-- @node:market:primary-b -->, [user type C]
- **Secondary:** [buyer type A]<!-- @node:market:buyer-a --> doing [use case], [buyer type B] doing [use case]

---

### Slide 5 · Feature Comparison Matrix

| Feature                        | [Project Name] | [Competitor A]<!-- @node:competitor:a --> | [Competitor B]<!-- @node:competitor:b --> | [Competitor C]<!-- @node:competitor:c --> | [Competitor D]<!-- @node:competitor:d --> |
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
**[Milestone A]<!-- @node:milestone:a -->:** [What you are shipping and by when].
**[Milestone B]<!-- @node:milestone:b -->:** [What you will open-source or release post-milestone, and the community goal].

---

## PART 2 — PRODUCT REQUIREMENTS DOCUMENT (PRD)<!-- @cluster:prd -->

### Overview

| Field          | Value                                                           |
|----------------|-----------------------------------------------------------------|
| Product        | [Project Name]<!-- @node:project:name -->                       |
| Version        | [x.y.z] ([Build phase, e.g., Hackathon MVP])                   |
| Timeline       | **[Build window, e.g., 3-hour build / 2-week sprint]**         |
| Deployment     | [API hosting platform] (API) + [Frontend hosting platform] (frontend) |
| Source Control | [SCM platform] + [CI/CD platform] (CI/CD)                      |

---

### Goals<!-- @node:prd:goal-1 -->
1. Ingest live data from ≥[N] [source types] with no manual intervention
2. Surface a [visualization type]<!-- @node:prd:visualization --> with [grouping mechanism]<!-- @node:prd:grouping --> in a [client type] — [auth requirement]
3. Compute and display a **[Score/Metric Name]<!-- @node:tad:score -->** per [primary entity]<!-- @node:tad:schema -->
4. Deliver [alert channel]<!-- @node:tad:alert-channel --> alerts when a [threshold condition]<!-- @node:tad:threshold --> is detected

### Non-Goals (MVP)
- [Excluded feature A] · [Excluded feature B] · [Excluded feature C]

---

### User Stories<!-- @node:prd:story-u1 -->

**U1 — [Primary Persona]<!-- @node:persona:primary -->:** I [open / visit / query] [Project Name] and see [key artifact] from [time window] to [primary goal].

**U2 — [Secondary Persona]<!-- @node:persona:secondary -->:** I query "[domain keyword]" and see [clustered / ranked / filtered output] with [metric] so I can [decision] in under [N] minutes.

**U3 — [Tertiary Persona]<!-- @node:persona:tertiary -->:** I add [inputs] to my [watchlist / config] and receive [alerts] when a new [threshold condition] appears in my domain.

---

### [Canvas / Dashboard / Interface] Feature Set<!-- @node:prd:visualization -->

- **[Grouping mechanism]<!-- @node:prd:grouping -->:** [N] [entity A] clusters ([label 1], [label 2], [label 3], [label 4]) × [N] [entity B] clusters ([label 1], [label 2], [label 3], [label 4]) — each [visually distinguished by color / icon / position]
- **[Interaction A]:** [description of collapse / expand / toggle behavior and animation]
- **[Interaction B]:** [description of hover / focus behavior and what data surfaces]
- **[Interaction C]:** [description of node-level interaction and sidebar detail]
- **[Highlight state]:** [description of how high-[metric] items are visually surfaced]

---

### Acceptance Criteria<!-- @node:prd:criteria -->

| Feature               | Criterion                                                              |
|-----------------------|------------------------------------------------------------------------|
| [Pipeline feature]    | ≥[N] items ingested per source per run; zero crashes                  |
| [Classification feature] | Latency < [N]s per item on [compute type]                         |
| [Score feature]       | Updates visible in [interface] within [N]s of recompute              |
| [Interface feature]   | Loads ≤ [N]s with [N] [entities]; [interaction] smooth               |
| [Alert feature]       | Delivered < [N] min after trigger condition                           |

---

## PART 3 — TECHNICAL ARCHITECTURE DOCUMENT (TAD)<!-- @cluster:tad -->

### Stack — [Selection Philosophy]

> Selection order: **[Criterion A]** ([license types]) first → lowest **[Criterion B]** → best **[Criterion C]**. Locality preference: **[local / in-process]** tools before cloud services. Every tool below costs **$[N]/month**<!-- @node:meta:tco -->.

| Priority  | Layer                    | Tool / Service            | Role                                                                 | License          | Cost  |
|-----------|--------------------------|---------------------------|----------------------------------------------------------------------|------------------|-------|
| LOCAL 1   | **[Layer name]**         | [Tool A]                  | [Role description]                                                   | [License]        | $[N]  |
| LOCAL 2   | **[Layer name]**         | [Tool B] + [Tool C]       | [Role description]                                                   | [License]        | $[N]  |
| LOCAL 3   | **[Layer name]**         | [Tool D]                  | [Role description]                                                   | [License]        | $[N]  |
| LOCAL 4   | **[Layer name]**         | [Tool E] (self-hosted)    | [Role description]; swap [component] without code changes            | [License]        | $[N]  |
| LOCAL 5   | **[Layer name]**         | [Tool F] API              | [Role description] via [proxy/router]                                | [License]        | $[N]  |
| LOCAL 6   | **[Layer name]**         | [Local storage mechanism] | [Role description] — zero infra; flushed to [persistent store] on interval | [License] | $[N]  |
| LOCAL 7   | **[Layer name]**         | [Queue tool]<!-- @node:tad:queue --> + [Backing store] | [Role description]; [backing store] backs [queue tool] ([limit]) | [License]    | $[N]  |
| CLOUD 1   | **[Layer name]**         | [Database service]<!-- @node:tad:db -->        | [Role description]; [scale characteristic]; [free tier limit]        | [License]        | $[N]  |
| CLOUD 2   | **[Layer name]**         | [API hosting service]     | [Role description]; [free tier limit]                                | [License]        | $[N]  |
| CLOUD 3   | **[Layer name]**         | [Frontend hosting service]| [Role description]; [free tier limit]                                | [License]        | $[N]  |
| CLOUD 4   | **[Layer name]**         | [Bot / notification service] | [Role description], real-time alerts, [commands]                 | [License]        | $[N]  |
| ANY       | **[Layer name]**         | [Rendering library]       | [Visualization type] rendering                                       | [License]        | $[N]  |

**Total TCO: $[N]/month**<!-- @node:meta:tco -->

---

### Data Schema ([Database service]<!-- @node:tad:db --> — [DB type])

```sql
CREATE TABLE [primary_entity]/* @node:tad:schema */ (
  id         [ID_TYPE] PRIMARY KEY DEFAULT [id_function](),
  type       [DATA_TYPE] CHECK (type IN ('[type_a]', '[type_b]')),
  label      VARCHAR([N]),
  metadata   [JSONB | JSON],      -- { [field_a], [field_b], [field_c] }
  [score_col] FLOAT DEFAULT 0,    -- @node:tad:score
  created_at [TIMESTAMP_TYPE] DEFAULT [timestamp_function]()
);

CREATE TABLE [relationship_entity]/* @node:tad:rel-entity */ (
  [entity_a_id]  [ID_TYPE] REFERENCES [primary_entity](id),
  [entity_b_id]  [ID_TYPE] REFERENCES [primary_entity](id),
  [weight_col]   FLOAT,
  PRIMARY KEY ([entity_a_id], [entity_b_id])
);

CREATE INDEX ON [relationship_entity]([entity_a_id]);
CREATE INDEX ON [relationship_entity]([entity_b_id]);
```

`[score_col]`<!-- @node:tad:formula --> = `[scoring formula]` — computed via [database trigger / application layer] on [event]; result also written back to `[local_cache_file]` for zero-latency local reads.

---

### [System/Component] Architecture

**[Layer/Module] Stack**: [Ingestion Layer]<!-- @node:tad:layer-ingest --> → [Processing Layer] → [Scoring Layer]<!-- @node:tad:layer-score --> → [Persistence Layer] → [API Layer]<!-- @node:tad:layer-api --> → [Presentation Layer]<!-- @node:tad:layer-present -->

**[Processing/Data] Flow**: [Source Fetch] → [Orchestration] → [Classification]<!-- @node:tad:layer-classify --> → [Deduplication] → [Storage & Scoring] → [Queue]<!-- @node:tad:layer-queue --> → [API Exposure] → [Rendering]

**Design Principles**: [Principle 1] | [Principle 2] | [Principle 3] | [Principle 4]

#### High-Level Components

- **[Ingestion Layer]<!-- @node:tad:layer-ingest -->**:
  - `[module/path]` fetches raw items from [source A], [source B], and [source C]; handles rate-limiting and retries.
- **[Classification Layer]<!-- @node:tad:layer-classify -->**:
  - `[module/path]` routes items through [AI proxy]<!-- @node:tad:ai-proxy --> → [AI model]<!-- @node:tad:ai-model --> and tags each as [type A] or [type B] with extracted [metadata].
- **[Scoring Layer]<!-- @node:tad:layer-score -->**:
  - `[module/path]` computes `[score_name]`<!-- @node:tad:score --> = `[formula]`<!-- @node:tad:formula --> per [primary entity]; triggers on [event].
- **[Queue Layer]<!-- @node:tad:layer-queue -->**:
  - `[module/path]` enqueues [recalculation jobs] via [queue tool]<!-- @node:tad:queue -->; [scheduler tool]<!-- @node:tad:scheduler --> fires on [cadence].
- **[API Layer]<!-- @node:tad:layer-api -->**:
  - `[module/path]` serves [data format]-ready payload from [persistence layer] at [hosting type].
- **[Presentation Layer]<!-- @node:tad:layer-present -->**:
  - `[module/path]` polls [API endpoint] every [N]s; renders [visualization type]<!-- @node:prd:visualization --> with [interaction features].
- **[Alert Layer]<!-- @node:tad:layer-alert -->**:
  - `[module/path]` detects `[score_name]`<!-- @node:tad:score --> > `[threshold]`<!-- @node:tad:threshold --> ∩ [watchlist condition] → pushes alert to [channel]<!-- @node:tad:alert-channel -->.

#### Integration Bridge: [Processing Layer] → [Persistence Layer]

| [Processing Stage]          | [Persistence Equivalent]                   | Configuration Controls                                    |
|-----------------------------|--------------------------------------------|-----------------------------------------------------------|
| [Item fetch / fan-out]      | [Ingest job / queue entry]                 | [source_list], [rate_limit], [retry_count]               |
| [Classification / tagging]  | [Node upsert with type field]              | [model_name], [prompt_template], [batch_size]            |
| [Deduplication / cache check]| [Skip / update logic on conflict]         | [cache_path], [ttl], [dedup_key]                         |
| [Score trigger / flush]     | [DB trigger + local file write]            | [score_formula], [threshold], [flush_interval]           |

---

### Layer Specifications

#### Layer 1: Ingestion<!-- @node:tad:layer-ingest -->

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

#### Layer 2: Classification<!-- @node:tad:layer-classify -->

**[From/To description]**: [Raw items] → routed through [AI Proxy]<!-- @node:tad:ai-proxy --> → classified by [AI Model]<!-- @node:tad:ai-model --> → tagged as [type A] or [type B] with [keywords/metadata] → enables [scoring and storage].

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

#### Layer 3: Scoring<!-- @node:tad:layer-score -->

**[From/To description]**: [Classified and deduplicated nodes] → [score formula]<!-- @node:tad:formula --> computed on [event trigger] → [score]<!-- @node:tad:score --> attached to [primary entity]<!-- @node:tad:schema --> → enables [visualization highlight and alerting].

**Algorithm/Pattern Description**: [`[score_name]`<!-- @node:tad:score --> = `[formula]`<!-- @node:tad:formula --> — computed via [DB trigger / application function] on every [upsert/update event]; result cached to [local file] for zero-latency reads by the API layer.]

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
  - `[score_field]`<!-- @node:tad:score --> must be non-null on every [primary entity]<!-- @node:tad:schema -->.

**Coupling Metrics**

- [Presentation Layer]<!-- @node:tad:layer-present --> is decoupled from [Persistence Layer]:
  - [Presentation] only depends on `[/api/endpoint]` shape, not DB schema.
  - [Score threshold]<!-- @node:tad:threshold --> is attached via config, not hardcoded in alert logic.

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
  - [Scoring formula]<!-- @node:tad:formula --> unit-tested against known inputs; [DB trigger] verified with [test DB].
- **[End-to-End Tests]**:
  - Full pipeline from [raw source item] → [classified node] → [scored record] → [API response] → [canvas render] validated.

**Quality Gates**

| Context              | Intent                          | Directive                                                                                   |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| [Schema] Validation  | Ensure API contract compliance  | - [ ] Validate [data_format] shape; check required fields; forbid malformed payloads       |
| [Config] Validation  | Prevent runtime errors          | - [ ] Parse config on startup; validate required keys; forbid late-stage failures          |
| [Score] Validation   | Guarantee non-null metrics      | - [ ] Assert score is float in [0, max]; forbid null scores on any [primary entity]        |

---

## PART 4 — CRITICAL PATH: 0 → 1 IN [N] HOURS ([CONSTRAINT])<!-- @cluster:path -->

> **[Team size]<!-- @node:meta:team -->.** [Sequencing rationale]. Hard deadline: H[N:MM] [milestone event].

| Task                                                                   | Hour  | Status | Category                     |
|------------------------------------------------------------------------|-------|--------|------------------------------|
| [SCM] repo init + [infra config] + [hosting] config                   | 0:00  | ☐      | Infra, SCM, Deploy           |
| [DB service]<!-- @node:tad:db --> — provision + schema ([primary_table], [relationship_table], [score_trigger]) | 0:10 | ☐ | DB, Infra           |
| [Source A] + [Source B] + [Source C] — fetch raw items                | 0:20  | ☐      | Scrape, Data                 |
| [Orchestrator] skills manifest — rate-limit + retry wrapper           | 0:30  | ☐      | Orchestration                |
| [AI proxy]<!-- @node:tad:ai-proxy --> local proxy + [AI model]<!-- @node:tad:ai-model --> API — classify + tag items        | 0:40  | ☐      | AI, Data                     |
| [Local storage] — write dedup cache to `[data/cache.ext]`            | 0:50  | ☐      | Local Storage                |
| [DB service] upsert + [score trigger]<!-- @node:tad:formula --> + flush → `[data/nodes.ext]`   | 1:00  | ☐      | DB, Logic                    |
| [API hosting] — `[/api/primary_endpoint]` → [data_format] shape       | 1:15  | ☐      | API, Edge                    |
| [Queue tool]<!-- @node:tad:queue --> + [scheduler]<!-- @node:tad:scheduler --> — live recalc pipeline wiring              | 1:30  | ☐      | Queue, Orchestration         |
| [Alert channel]<!-- @node:tad:alert-channel --> bot — token + webhook + `[/cmd_a]` / `[/cmd_b]`      | 1:45  | ☐      | Bot, Infra                   |
| [Rendering library] [visualization type] — [entity/edge] scaffold ([frontend hosting]) | 2:00 | ☐ | Frontend, Graph      |
| [Grouping mechanism]<!-- @node:prd:grouping --> + [visual encoding]                              | 2:15  | ☐      | Frontend, UX                 |
| [Interaction A] + [Interaction B] + [edge bundling]                   | 2:30  | ☐      | Frontend, UX                 |
| **Wire `[/api/endpoint]` [API hosting] → [rendering library] canvas** | **2:40** | **☐** | **Integration**           |
| [Alert channel] alert loop — [score_name]<!-- @node:tad:score --> > [threshold]<!-- @node:tad:threshold --> → DM         | 2:50  | ☐      | Bot, Alerts, P0              |
| `git push [branch]` → [CI/CD platform] → auto-deploy [hosting services] | 2:55 | ☐   | CI/CD, Deploy                |
| **DEMO READY: [live demo action] on stage**<!-- @node:path:demo -->   | **[N:MM]** | **☐** | **Demo, P0**             |

> **P0 risk<!-- @node:path:p0 -->:** [Highest-risk task] (H[N:MM] task) is the most commonly missed milestone — wire and test this before polishing the UI.

---

## PART 5 — COST-BENEFIT MATRIX<!-- @cluster:cost -->

| Tool / Service         | Role in [Project Name]<!-- @node:project:name -->                                                | License             | Local / Cloud     | Free Tier Limit           | Est. [Build Phase] Usage  | Headroom             | Category              | Risk   |
|------------------------|---------------------------------------------------------------------|---------------------|-------------------|---------------------------|---------------------------|----------------------|-----------------------|--------|
| [SCM + CI/CD]          | Source control + auto-deploy on `git push`                         | [License] / Free    | Local + Cloud SCM | [N] CI min/month          | ~[N] push cycles          | ✅ Very high          | SCM, Deploy           | Low    |
| [Local storage]        | Dedup cache + [watchlist] — zero infra, instant reads              | [License]           | **Local**         | Disk only                 | ~[N] entries              | ✅ Zero infra         | Memory, Cache         | Low    |
| [Source A client]      | [Source A] scraping via official [auth method]                     | [License]           | Local process     | [N] req/min               | ~[N]–[N] requests         | ✅ Well within        | Scrape, Data          | Low    |
| [Source B client]      | [Source B] items via [endpoint type]                               | [License] / Free    | Local process     | Unlimited                 | ~[N] queries              | ✅ No limit           | Scrape, Data          | Low    |
| [Source C client]      | [Source C] [item type] + [sub-type]                                | [License] / Free    | Local process     | [N] req/day               | ~[N] requests             | ✅ High               | Scrape, Data          | Low    |
| [Orchestrator]         | Skills manifest, rate-limiting, retry                              | — / Free            | Local process     | Free tier                 | Light orchestration       | ✅ Comfortable        | Orchestration         | Low    |
| [AI proxy]<!-- @node:tad:ai-proxy -->             | Local AI proxy router — model-agnostic                             | [License]           | **Local process** | Self-hosted / free        | [N] proxied calls         | ✅ No cost            | AI, Proxy             | Low    |
| [AI model]<!-- @node:tad:ai-model --> API         | Classify + tag items via [AI proxy]                                | [License] (model)   | Cloud API         | [N] req/day free          | ~[N] classifications      | ⚠️ At limit — batch carefully | AI, Classification | Medium |
| [Queue tool]<!-- @node:tad:queue -->           | [Score] recalc job queue + retry workers                           | [License]           | Local process     | Self-hosted / free        | [N] queue, ~[N] runs/hr   | ✅ No cost            | Queue                 | Low    |
| [Queue backing store]  | [Queue tool] backing store                                         | [License] (client)  | Cloud             | [N] cmd/day               | ~[N] queue ops            | ✅ Comfortable        | Queue Infra           | Low    |
| [Database service]<!-- @node:tad:db -->     | Persistent [primary_entities], [relationships], [score_col]        | [License] (client)  | **Cloud DB**      | [N] GB, autoscales to zero| ~[N] MB (≤[N] nodes)      | ✅ Very high          | DB, Graph             | Low    |
| [API hosting]          | Edge API — `[/api/endpoint]`, alert loop                           | — / Free tier       | **Edge**          | [N] req/day               | ~[N] API calls            | ✅ Very high          | Deploy, API           | Low    |
| [Frontend hosting]     | Static [visualization] CDN hosting                                 | — / Free tier       | **Edge**          | Unlimited requests        | Browser-side only         | ✅ No server cost     | Deploy, Frontend      | Low    |
| [Alert channel] bot<!-- @node:tad:alert-channel -->    | [DM intake + alert delivery + commands]                            | [License] (client)  | Cloud             | Unlimited                 | ~[N] test messages        | ✅ No limit           | Bot, Alerts           | Low    |
| [Rendering library]    | Frontend [visualization type] rendering                            | [License]           | Browser           | Self-hosted               | Browser-side only         | ✅ No server cost     | Frontend              | Low    |
| **Total**<!-- @node:cost:total -->              |                                                                     | **All [FOSS/free]** | **[Local/Edge]**  |                           |                           | **$[N]/month**        | **Full stack**        | **Low** |

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
| `[ALERT_THRESHOLD]`               | [scope]           | `[0.7]`                            | Controls minimum [score_name]<!-- @node:tad:score --> for alert dispatch    |
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

> This single table is the complete live blueprint from [any source signal] → [classified entity] → [metric score] → [interactive visualization] that [primary persona]<!-- @node:persona:primary --> can explore in real time.

| ID    | Stage                   | Workflow Step                                        | Data Flow (Sources → Output)                                                                          | Tools / Components                                  | User Journey Touchpoint                           | Rendering in [Visualization]                                        | Notes / Critical Path ([N]h MVP)              |
|-------|-------------------------|------------------------------------------------------|-------------------------------------------------------------------------------------------------------|-----------------------------------------------------|---------------------------------------------------|---------------------------------------------------------------------|------------------------------------------------|
| DF-01 | Ingestion               | Live [source type] scraping (no manual intervention) | [Source A], [Source B], [Source C] → raw unstructured items                                           | [Source A client] + [Source B client] + [Source C client] | U1 & U2 – fresh signals appear instantly       | N/A (backend only)                                                  | H0:20 – official API fetch                    |
| DF-02 | Orchestration           | Skills manifest — rate-limit + fan-out               | Raw fetch tasks → [Orchestrator] DAG controls concurrency, retries, API auth                          | [Orchestrator]                                      | All U's – reliable ingestion without crashes      | N/A (backend only)                                                  | H0:30 – orchestrator wiring                   |
| DF-03 | Classification          | AI tagging via [AI proxy]<!-- @node:tad:ai-proxy --> → [AI model]<!-- @node:tad:ai-model -->               | Raw items → [AI proxy] (local) routes to [AI model] → classified as **[type_a]** or **[type_b]** + keywords + tags | [AI proxy] + [AI model] API             | U1 & U2 – [type_a] vs [type_b] separated automatically | Nodes typed & colored ([type_a] = [position_a], [type_b] = [position_b]) | H0:40 – [AI model] classification        |
| DF-04 | Deduplication           | Local flat-file cache check                          | Classified items → checked against `[data/cache.ext]`; duplicates dropped before DB write            | [Local storage]                                     | All U's – clean, spam-free canvas                 | Prevents duplicate nodes & crossed edges                            | H0:50 – local [format] dedup                  |
| DF-05 | Storage & Scoring       | [DB service] upsert + auto [score_name]<!-- @node:tad:score --> trigger      | Deduplicated nodes → [DB service] (`[primary_table]` + `[relationship_table]`); **`[score_name] = [formula]`**<!-- @node:tad:formula --> on insert trigger; result flushed back to `[data/nodes.ext]` | [DB service] + [DB trigger/function] + [local flush] | U3 – high-[metric] items flagged | [Score] on every [type_a] node (color intensity + label)           | H1:00 – [DB service] + trigger                |
| DF-06 | Pipeline                | [Score] recalculation job queue                      | New/updated nodes → [Queue tool] job enqueued → [scheduler] fires full recalc                        | [Queue tool]<!-- @node:tad:queue --> + [Scheduler]<!-- @node:tad:scheduler -->                          | U1 & U2 – canvas stays current without manual refresh | Edges & node positions re-layout on [metric] change             | H1:30 – [Queue tool] wiring                   |
| DF-07 | API Exposure            | [Data format] endpoint (edge-hosted)                 | Aggregated nodes/edges/[score_col] from [DB service] → clean [data_format]-ready JSON via [API hosting] | [API hosting] `[/api/endpoint]`                  | All U's – data delivered to browser at edge       | Single source of truth for every poll                               | H1:15 – [API hosting] endpoint                |
| DF-08 | Alerting                | High-[metric] detection & delivery                   | `[score_name]`<!-- @node:tad:score --> > `[threshold]`<!-- @node:tad:threshold --> ∩ user watchlist (`[data/watchlist.ext]`) → instant [channel] alert with direct canvas link | [Alert bot]<!-- @node:tad:alert-channel --> + [Queue] alert worker     | U3 – "[alert message]"                            | Alert links into highlighted [metric] cluster                       | H2:50 – P0 [channel] live alert               |
| DF-09 | Canvas Loading          | Browser loads interactive [visualization] (CDN)      | User opens [Project Name] ([frontend hosting]) → `fetch('[/api/endpoint]')` every [N]s               | [Rendering library] + [Frontend hosting]            | U1 & U2 – open tab and see live [visualization]  | Initial [layout type] layout (≤[N]s load)                          | H2:00 – [rendering lib] scaffold + H2:40 convergence |
| DF-10 | User Interaction        | [Interaction A], [Interaction B], [Interaction C], [metric] exploration | Polled [data_format] + user actions → real-time canvas updates              | [Rendering library] [layout type] + custom [grouping mechanism]<!-- @node:prd:grouping --> | U1 (see whitespace), U2 (pick validated [entity] in <[N] min), U3 (jump from alert) | • [Grouping mechanism] • [Interaction A] with animation • [Interaction B] traces + sidebar • [Interaction C] → [visual feedback] | H2:15–2:30 – [grouping] UX + [Interaction B]  |
| DF-11 | Final Visualization     | [Visualization type] knowledge graph canvas          | All upstream data synthesized → live interactive [Metric] Map                                         | [Rendering library] (client-side, [Frontend hosting]) | Complete journey: Research → Ideation → Monitoring → Action | Full [visualization type] with [metric] highlights, [edge rendering], zoom/pan, [metric] threshold slider | Demo-ready at H[N:MM]<!-- @node:path:demo --> on [frontend hosting] |

**How to use this table**
- **Filter by column** → e.g. filter "User Journey" = U3 to see only [passive monitoring] flow.
- **Filter by Source** → the Ingestion row shows all [N] official [source type] sources ([Source A], [Source B], [Source C]).
- **Sort by Critical Path** → see exact [N]-hour [team size] build order.
- Everything runs on **$[N] TCO**<!-- @node:meta:tco --> ([hosting services] free tiers, local-first) and updates **[cadence]**.

---

## Design Decisions & Trade-offs

| Decision                              | Rationale                                      | Pros                                                        | Cons                                          | Mitigation                                           |
|---------------------------------------|------------------------------------------------|-------------------------------------------------------------|-----------------------------------------------|------------------------------------------------------|
| [Local-first storage]                 | [Zero infra; instant reads]                    | Zero cost, zero latency for dedup checks                    | Not shared across instances; lost on reset    | Flush to [persistent store] on interval              |
| [Model-agnostic AI proxy]<!-- @node:tad:ai-proxy -->             | [Avoid vendor lock-in; swap without code change]| Swap models via config; testable with mocks                | Extra hop adds ~[N]ms latency                  | Self-host proxy locally; benchmark per model          |
| [DB trigger for score computation]<!-- @node:tad:formula -->    | [Keep score logic atomic with upsert]          | Score always consistent with data; no race condition        | DB-specific SQL; harder to test outside DB    | Abstract score formula into tested pure function      |
| [Edge-hosted API layer]               | [Global low-latency; free tier generous]       | ≤[N]ms p99 globally; [N] req/day free                      | Cold start latency on first request            | Warm with [N]s polling from frontend                  |
| [Open source + $0 TCO]<!-- @node:meta:tco -->               | [Maximize accessibility; community adoption]   | No billing risk; forkable; trust from community             | Free tier limits constrain scale               | Document all limits; provide paid-tier upgrade paths  |

---

## [System/Process] Directives

### Ingestion Directives<!-- @node:tad:layer-ingest -->

| Context              | Intent                          | Directive                                                                                   | Enforcement Mechanism                        |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------|
| Source Auth          | Protect API credentials         | - [ ] Read credentials from env vars; forbid committed secrets                             | CI secret scanning; `.env.example` checked in|
| Rate Limiting        | Respect source limits           | - [ ] Enforce per-source rate limits; backoff on 429; forbid flooding                      | [Orchestrator] token-bucket middleware        |
| Error Isolation      | Prevent cascade failures        | - [ ] Catch per-source errors; continue other sources; forbid full-pipeline halt           | Try/catch per source; logged and monitored    |

### Classification Directives<!-- @node:tad:layer-classify -->

| Context              | Intent                          | Directive                                                                                   | Enforcement Mechanism                        |
|----------------------|---------------------------------|---------------------------------------------------------------------------------------------|----------------------------------------------|
| Model Agnosticism    | Avoid vendor lock-in            | - [ ] Route all calls through [AI proxy]; forbid direct model SDK calls                   | Code review; [AI proxy] as only import       |
| Output Validation    | Ensure parseable response       | - [ ] Validate JSON schema on response; retry on malformed; forbid silent null nodes       | Schema lib + retry wrapper in classifier     |
| Cost Control         | Stay within free tier           | - [ ] Batch to [N] per call; track daily usage; forbid unbounded single-item loops        | Counter in [local storage] or env var        |

### Scoring & Alerting Directives<!-- @node:tad:layer-score @node:tad:layer-alert -->

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

*[Project Name]<!-- @node:project:name --> · [License]<!-- @node:meta:license --> · $[N] TCO<!-- @node:meta:tco --> · [Team Size]<!-- @node:meta:team --> Build · [Locality Philosophy]*