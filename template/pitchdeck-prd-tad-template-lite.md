---
# ── DOCUMENT IDENTITY ────────────────────────────────────────────────────────
doc:
  id: "doc:template:pitchdeck-prd-tad"
  title: "{{project}}"
  subtitle: "{{tagline-a}} · {{tagline-b}} · {{tagline-c}}"
  type: template
  version: "{{version}}"
  created: "{{date}}"
  license: "{{license}}"

# ── VARIABLES (invoke `@` toolbar to CRUD) ───────────────────────────────────
# All {{key}} references in body prose and flow: block resolve from here.
# Type `@` anywhere to open the floating variable toolbar.
project:     "[Project Name]"
tagline-a:   "[Tagline A]"
tagline-b:   "[Tagline B]"
tagline-c:   "[Tagline C]"
version:     "0.1.0"
date:        "{{date}}"
license:     "[License]"
tco:         "$0/month"
team:        "[N]-person"
timeline:    "[N] hours"

# personas
persona-primary:   "[Primary Persona]"
persona-secondary: "[Secondary Persona]"
persona-tertiary:  "[Tertiary Persona]"

# pain → solution
pain-a:    "[Pain point A]"
pain-b:    "[Pain point B]"
pain-c:    "[Pain point C]"
solution:  "[one-sentence solution]"
feature-1: "[Feature 1]"
feature-2: "[Feature 2]"
feature-3: "[Feature 3]"

# market
tam: "[TAM figure]"
sam: "[SAM figure]"

# milestones
milestone-a: "[Milestone A]"
milestone-b: "[Milestone B]"

# TAD
ai-proxy:      "[AI proxy]"
ai-model:      "[AI model]"
db:            "[Database]"
queue:         "[Queue tool]"
alert-channel: "[Alert channel]"
score-name:    "[score_name]"
score-formula: "[scoring formula]"
threshold:     "[threshold]"

# ── NODES ────────────────────────────────────────────────────────────────────
# Shape key:  [ ] rect · (( )) circle · {{ }} hex · { } diamond · [/ /] parallelogram · [( )] cylinder
# Sigil:      @node:namespace:id   →  body inline: [Label]<!-- @node:namespace:id -->
nodes:

  # identity
  - @node:project:name:      { label: "{{project}}",        status: placeholder }
  - @node:meta:tco:          { label: "{{tco}}",            status: placeholder }
  - @node:meta:team:         { label: "{{team}}",           status: placeholder }
  - @node:meta:license:      { label: "{{license}}",        status: placeholder }

  # personas
  - @node:persona:primary:   { label: "{{persona-primary}}",   status: placeholder }
  - @node:persona:secondary: { label: "{{persona-secondary}}", status: placeholder }
  - @node:persona:tertiary:  { label: "{{persona-tertiary}}",  status: placeholder }

  # problem
  - @node:pain:a:            { label: "{{pain-a}}",   status: placeholder }
  - @node:pain:b:            { label: "{{pain-b}}",   status: placeholder }
  - @node:pain:c:            { label: "{{pain-c}}",   status: placeholder }

  # solution / features
  - @node:feature:1:         { label: "{{feature-1}}", status: placeholder }
  - @node:feature:2:         { label: "{{feature-2}}", status: placeholder }
  - @node:feature:3:         { label: "{{feature-3}}", status: placeholder }

  # market
  - @node:market:tam:        { label: "{{tam}}", status: placeholder }
  - @node:market:sam:        { label: "{{sam}}", status: placeholder }

  # milestones
  - @node:milestone:a:       { label: "{{milestone-a}}", status: placeholder }
  - @node:milestone:b:       { label: "{{milestone-b}}", status: placeholder }

  # PRD
  - @node:prd:goal:          { label: "[Goal]",                    status: placeholder }
  - @node:prd:story-u1:      { label: "U1 {{persona-primary}}",   status: placeholder }
  - @node:prd:story-u2:      { label: "U2 {{persona-secondary}}", status: placeholder }
  - @node:prd:story-u3:      { label: "U3 {{persona-tertiary}}",  status: placeholder }
  - @node:prd:criteria:      { label: "Acceptance Criteria",       status: placeholder }

  # TAD — tools
  - @node:tad:ai-proxy:      { label: "{{ai-proxy}}",      status: placeholder }
  - @node:tad:ai-model:      { label: "{{ai-model}}",      status: placeholder }
  - @node:tad:db:            { label: "{{db}}",            status: placeholder }
  - @node:tad:queue:         { label: "{{queue}}",         status: placeholder }
  - @node:tad:alert-channel: { label: "{{alert-channel}}", status: placeholder }
  - @node:tad:score:         { label: "{{score-name}}",    status: placeholder }
  - @node:tad:formula:       { label: "{{score-formula}}", status: placeholder }
  - @node:tad:threshold:     { label: "{{threshold}}",     status: placeholder }

  # TAD — pipeline layers
  - @node:tad:layer-ingest:   { label: "Ingest",   status: placeholder }
  - @node:tad:layer-classify: { label: "Classify", status: placeholder }
  - @node:tad:layer-score:    { label: "Score",    status: placeholder }
  - @node:tad:layer-api:      { label: "API",      status: placeholder }
  - @node:tad:layer-present:  { label: "Present",  status: placeholder }
  - @node:tad:layer-alert:    { label: "Alert",    status: placeholder }

  # critical path
  - @node:path:p0:           { label: "P0 Risk Task",       status: placeholder }
  - @node:path:demo:         { label: "DEMO READY H[N:MM]", status: placeholder }

# ── EDGES ─────────────────────────────────────────────────────────────────────
edges:
  - id: @edge:pain→feature      · motivates
  - id: @edge:feature→prd       · specced-in
  - id: @edge:prd→tad           · implemented-by
  - id: @edge:score→alert       · triggers       condition: "score > {{threshold}}"
  - id: @edge:stack→cost        · costed-in
  - id: @edge:p0→demo           · gates
  - id: @edge:ai-proxy→classify · routes

# ── CLUSTERS ─────────────────────────────────────────────────────────────────
clusters:
  - @cluster:pitch: { label: "PART 1 · Pitch Deck",    members: [persona:*, pain:*, feature:*, market:*, milestone:*] }
  - @cluster:prd:   { label: "PART 2 · PRD",           members: [prd:*] }
  - @cluster:tad:   { label: "PART 3 · TAD",           members: [tad:*] }
  - @cluster:path:  { label: "PART 4 · Critical Path", members: [path:*] }
  - @cluster:cost:  { label: "PART 5 · Cost",          members: [meta:tco, tad:stack] }

# ── AI CHAT UI ───────────────────────────────────────────────────────────────
ai-chat:
  model:  "{{ai-model}}"
  proxy:  "{{ai-proxy}}"
  scope:  node          # clicked node + 1-hop neighbours
  prompts:
    - "What pain does {{pain-a}} solve?"
    - "How does {{feature-1}} address {{pain-a}}?"
    - "What is the acceptance criterion for {{score-name}}?"
    - "Explain the edge between {{ai-proxy}} and the classify layer."
    - "What would change if {{threshold}} were lowered?"
    - "What does this flow node output when {{pain-a}} is the input?"

# ── FLOW EDITOR (interactive + computable) ───────────────────────────────────
# Canvas renders two modes from the same graph data:
#   mermaid:  static knowledge graph (read-only)
#   flow:     interactive workflow editor (computable; handles; live data)
#
# Node types:
#   input   — data source; source handles only; no upstream
#   default — transform / compute step; target + source handles
#   output  — terminal / sink; target handles only
#   custom  — AI Chat UI; score display; alert trigger
#
# Handle names use snake_case matching PostgreSQL column names.
# compute: functions are pure (inputs) => outputs; no side effects.
# All {{key}} references resolve from frontmatter before canvas renders.
flow:
  direction: LR
  edgeType:  smoothstep
  snapToGrid: true
  gridSize:   20
  computed:   true      # upstream changes propagate to downstream nodes

  nodes:

    # ── INPUT NODES ── (source handles only; no upstream) ──────────────────

    - id: fn-persona
      type: input
      label: "{{persona-primary}}"
      position: { x: 0, y: 0 }
      handles:
        source: [pain_signal]
      data:
        pain_a:  "{{pain-a}}"
        pain_b:  "{{pain-b}}"
        pain_c:  "{{pain-c}}"
        goal:    "[primary goal]"
      annotation: "`bg#E1F5EE:input`"

    - id: fn-sources
      type: input
      label: "[N] data sources"
      position: { x: 0, y: 160 }
      handles:
        source: [raw_items]
      data:
        source_a: "[Source A]"
        source_b: "[Source B]"
        source_c: "[Source C]"
        rate_limit: "[N] req/min"
      annotation: "`bg#E1F5EE:input`"

    - id: fn-config
      type: input
      label: "frontmatter config"
      position: { x: 0, y: 320 }
      handles:
        source: [vars]
      data:
        threshold:     "{{threshold}}"
        score_formula: "{{score-formula}}"
        ai_proxy:      "{{ai-proxy}}"
        ai_model:      "{{ai-model}}"
      annotation: "`bg#E1F5EE:input`"

    # ── DEFAULT NODES ── (compute steps; target + source handles) ──────────

    - id: fn-ingest
      type: default
      label: "ingest + dedup"
      position: { x: 260, y: 160 }
      handles:
        target: [raw_items, vars]
        source: [clean_items]
      compute: |
        (inputs) => ({
          clean_items: inputs.raw_items
            .filter(item => !inputs.vars.seen_ids?.includes(item.id))
            .map(item => ({ ...item, ingested_at: new Date().toISOString() }))
        })
      data: {}

    - id: fn-classify
      type: default
      label: "classify via {{ai-proxy}}"
      position: { x: 520, y: 80 }
      handles:
        target: [clean_items, vars]
        source: [typed_nodes]
      compute: |
        (inputs) => ({
          typed_nodes: inputs.clean_items.map(item => ({
            ...item,
            type:     item.type ?? '[type_a]',
            tags:     item.tags ?? [],
            metadata: item.metadata ?? {}
          }))
        })
      data:
        proxy: "{{ai-proxy}}"
        model: "{{ai-model}}"
        batch: "[N]"

    - id: fn-score
      type: default
      label: "score: {{score-name}}"
      position: { x: 520, y: 240 }
      handles:
        target: [typed_nodes, vars]
        source: [scored_nodes, alert_signal]
      compute: |
        (inputs) => {
          const scored = inputs.typed_nodes.map(n => ({
            ...n,
            score: eval(inputs.vars.score_formula.replace('n', JSON.stringify(n)))
          }));
          return {
            scored_nodes:  scored,
            alert_signal:  scored.filter(n => n.score > Number(inputs.vars.threshold))
          };
        }
      data:
        formula:   "{{score-formula}}"
        threshold: "{{threshold}}"

    - id: fn-store
      type: default
      label: "{{db}} upsert"
      position: { x: 780, y: 160 }
      handles:
        target: [scored_nodes]
        source: [persisted_payload]
      compute: |
        (inputs) => ({
          persisted_payload: inputs.scored_nodes.map(n => ({
            id:        n.id,
            type:      n.type,
            label:     n.label,
            metadata:  n.metadata,
            score:     n.score,
            persisted: true
          }))
        })
      data:
        db: "{{db}}"

    - id: fn-api
      type: default
      label: "API → JSON payload"
      position: { x: 1040, y: 160 }
      handles:
        target: [persisted_payload]
        source: [json_payload]
      compute: |
        (inputs) => ({
          json_payload: {
            nodes: inputs.persisted_payload,
            edges: [],
            generated_at: new Date().toISOString()
          }
        })
      data:
        endpoint: "/api/[primary_endpoint]"
        poll_ms:  "[N]"

    # ── OUTPUT NODES ── (terminal sinks; target handles only) ──────────────

    - id: fn-canvas
      type: output
      label: "canvas + AI Chat UI"
      position: { x: 1300, y: 80 }
      handles:
        target: [json_payload]
      data:
        render:     "[visualization type]"
        chat_scope: node
        chat_proxy: "{{ai-proxy}}"
        chat_model: "{{ai-model}}"
      annotation: "`bg#EAF3DE:output`"

    - id: fn-alert
      type: output
      label: "{{alert-channel}} alert"
      position: { x: 1300, y: 280 }
      handles:
        target: [alert_signal]
      data:
        channel:   "{{alert-channel}}"
        message:   "{{score-name}} > {{threshold}} detected"
        debounce:  "[N]s per entity"
      annotation: "`bg#FCEBEB:output`"

    # ── CUSTOM NODES ── (score readout; feature showcase) ──────────────────

    - id: fn-score-display
      type: custom
      label: "{{score-name}} readout"
      position: { x: 780, y: 340 }
      handles:
        target: [scored_nodes]
        source: []
      data:
        display:   gauge
        min:       0
        max:       1
        threshold: "{{threshold}}"
      annotation: "`#185FA5|bg#E6F1FB:custom`"

    - id: fn-feature-gate
      type: custom
      label: "{{feature-1}} gate"
      position: { x: 260, y: 0 }
      handles:
        target: [pain_signal]
        source: [raw_items]
      compute: |
        (inputs) => ({
          raw_items: inputs.pain_signal ? [{ id: 'seed', label: inputs.pain_signal.pain_a }] : []
        })
      data:
        feature: "{{feature-1}}"
        enabled: true
      annotation: "`#185FA5|bg#E6F1FB:custom`"

  edges:
    # input → default
    - id: fe-persona-gate
      source: fn-persona
      sourceHandle: pain_signal
      target: fn-feature-gate
      targetHandle: pain_signal
      label: "{{persona-primary}} triggers"
      animated: true

    - id: fe-gate-ingest
      source: fn-feature-gate
      sourceHandle: raw_items
      target: fn-ingest
      targetHandle: raw_items
      label: "seeded items"
      animated: true

    - id: fe-sources-ingest
      source: fn-sources
      sourceHandle: raw_items
      target: fn-ingest
      targetHandle: raw_items
      label: "raw items"
      animated: true

    - id: fe-config-ingest
      source: fn-config
      sourceHandle: vars
      target: fn-ingest
      targetHandle: vars
      label: "config"
      animated: false

    - id: fe-config-classify
      source: fn-config
      sourceHandle: vars
      target: fn-classify
      targetHandle: vars
      animated: false

    - id: fe-config-score
      source: fn-config
      sourceHandle: vars
      target: fn-score
      targetHandle: vars
      animated: false

    # default → default
    - id: fe-ingest-classify
      source: fn-ingest
      sourceHandle: clean_items
      target: fn-classify
      targetHandle: clean_items
      label: "clean items"
      animated: true

    - id: fe-classify-score
      source: fn-classify
      sourceHandle: typed_nodes
      target: fn-score
      targetHandle: typed_nodes
      label: "typed + tagged"
      animated: true

    - id: fe-score-store
      source: fn-score
      sourceHandle: scored_nodes
      target: fn-store
      targetHandle: scored_nodes
      label: "{{score-name}} attached"
      animated: true

    - id: fe-score-display
      source: fn-score
      sourceHandle: scored_nodes
      target: fn-score-display
      targetHandle: scored_nodes
      animated: true

    - id: fe-store-api
      source: fn-store
      sourceHandle: persisted_payload
      target: fn-api
      targetHandle: persisted_payload
      label: "persisted"
      animated: true

    # default → output
    - id: fe-api-canvas
      source: fn-api
      sourceHandle: json_payload
      target: fn-canvas
      targetHandle: json_payload
      label: "{{solution}}"
      animated: true

    - id: fe-score-alert
      source: fn-score
      sourceHandle: alert_signal
      target: fn-alert
      targetHandle: alert_signal
      label: "> {{threshold}}"
      animated: true

# ── MERMAID KNOWLEDGE GRAPH (static; same graph as flow:) ────────────────────
# Shape → primitive:
#   @node      →  n_id["label"]       rect      [ ]
#   @node stub →  n_id{"label"}       diamond   { }
#   @edge      →  e_id{{"label"}}     hexagon   {{ }}
#   @cluster   →  subgraph id         subgraph
mermaid: |
  %%{init: {"theme":"base","themeVariables":{"primaryColor":"#E1F5EE","primaryTextColor":"#085041","primaryBorderColor":"#1D9E75","lineColor":"#5F5E5A","secondaryColor":"#E6F1FB","tertiaryColor":"#FAEEDA"}}}%%
  flowchart LR

    %% ── shape key ────────────────────────────────────────────────────────
    %% [ ]    rect          entity / step
    %% { }    diamond       decision / stub
    %% {{ }}  hexagon       named @edge relation
    %% (( ))  circle        terminal
    %% [/ /]  parallelogram input / output
    %% [( )]  cylinder      data store
    %% @{}    v11 shape API custom node type

    %% ── variable refs resolved from frontmatter via `@` toolbar ─────────
    %% {{project}} {{persona-primary}} {{pain-a}} {{solution}}
    %% {{ai-proxy}} {{ai-model}} {{db}} {{score-name}} {{threshold}}

    %% ── classDef ─────────────────────────────────────────────────────────
    classDef inp      fill:#E1F5EE,stroke:#1D9E75,color:#085041,stroke-width:2px
    classDef dflt     fill:#E6F1FB,stroke:#378ADD,color:#0C447C,stroke-width:1.5px
    classDef out      fill:#EAF3DE,stroke:#639922,color:#27500A,stroke-width:2px
    classDef custom   fill:#EEEDFE,stroke:#7F77DD,color:#3C3489,stroke-width:1.5px
    classDef store    fill:#F1EFE8,stroke:#888780,color:#444441,stroke-width:1px
    classDef alert    fill:#FCEBEB,stroke:#E24B4A,color:#501313,stroke-width:2px
    classDef problem  fill:#FBEAF0,stroke:#D4537E,color:#72243E,stroke-width:1.5px

    %% ── INPUT nodes [/ /] ────────────────────────────────────────────────
    fn_persona[/"{{persona-primary}}\n(input)"/]
    fn_sources[/"[N] data sources\n(input)"/]
    fn_config[/"frontmatter config\n(input)"/]

    %% ── DEFAULT nodes [ ] ────────────────────────────────────────────────
    fn_gate["{{feature-1}} gate\n(default)"]
    fn_ingest["ingest + dedup\n(default)"]
    fn_classify{{"classify via {{ai-proxy}}\n(default)"}}
    fn_score["score: {{score-name}}\n(default)"]
    fn_store[("{{db}} upsert\n(default)")]
    fn_api["API → JSON payload\n(default)"]

    %% ── OUTPUT nodes [/ /] ───────────────────────────────────────────────
    fn_canvas[/"canvas + AI Chat UI\n(output)"/]
    fn_alert[/"{{alert-channel}} alert\n(output)"/]

    %% ── CUSTOM nodes @{} ─────────────────────────────────────────────────
    fn_score_display@{ shape: diamond, label: "{{score-name}} readout\n(custom)" }

    %% ── edges ────────────────────────────────────────────────────────────
    fn_persona     -->|pain_signal| fn_gate
    fn_sources     -->|raw_items|   fn_ingest
    fn_gate        -->|raw_items|   fn_ingest
    fn_config      -->|vars|        fn_ingest
    fn_config      -->|vars|        fn_classify
    fn_config      -->|vars|        fn_score
    fn_ingest      -->|clean_items| fn_classify
    fn_classify    -->|typed_nodes| fn_score
    fn_score       -->|scored_nodes| fn_store
    fn_score       -->|scored_nodes| fn_score_display
    fn_score       -->|"> {{threshold}}"| fn_alert
    fn_store       -->|persisted|   fn_api
    fn_api         -->|"{{solution}}"| fn_canvas

    %% ── class assignments ────────────────────────────────────────────────
    class fn_persona,fn_sources,fn_config inp
    class fn_gate,fn_ingest,fn_score,fn_store,fn_api dflt
    class fn_classify dflt
    class fn_canvas out
    class fn_alert alert
    class fn_score_display custom

    %% ── click → AI Chat UI ───────────────────────────────────────────────
    click fn_persona    "#slide-1--problem"   "Chat: who is {{persona-primary}}?"
    click fn_classify   "#tad-pipeline"       "Chat: explain classify via {{ai-proxy}}"
    click fn_score      "#tad-pipeline"       "Chat: what is {{score-formula}}?"
    click fn_canvas     "#ai-chat-ui"         "Open AI Chat UI"
    click fn_alert      "#part-4--critical-path" "Chat: what triggers the alert?"
    click fn_config     "#variable--reference-guidelines" "Chat: edit vars with @ toolbar"
---

# {{project}}<!-- @node:project:name -->
### {{tagline-a}} · {{tagline-b}} · {{tagline-c}}
*Pitch Deck + PRD + TAD · {{license}} · {{tco}} · {{team}} build · {{timeline}}*

---

## PART 1 — PITCH DECK<!-- @cluster:pitch -->

### One-liner
**{{project}}<!-- @node:project:name -->** — {{solution}}.

---

### Slide 1 · Problem

**{{persona-primary}}<!-- @node:persona:primary -->** face:

- `#D85A30:{{pain-a}}`<!-- @node:pain:a --> → [current workaround]; [cost or time lost]
- `#D85A30:{{pain-b}}`<!-- @node:pain:b --> → [current workaround]; [cost or time lost]
- `#D85A30:{{pain-c}}`<!-- @node:pain:c --> → gut feel; guesswork

No tool cross-references [signal A] against [signal B].

The flow editor models this directly: `@node:fn-persona` is an **input node**
carrying `{{pain-a}}`, `{{pain-b}}`, `{{pain-c}}` as source data — the
`pain_signal` handle triggers the `{{feature-1}} gate` default node downstream.

---

### Slide 2 · Solution

**{{project}}** is a [product category] that:

1. **{{feature-1}}<!-- @node:feature:1 -->** — [one-sentence capability + mechanism]
2. **{{feature-2}}<!-- @node:feature:2 -->** — [one number / metric that quantifies the insight]
3. **{{feature-3}}<!-- @node:feature:3 -->** — [interactive or exploratory capability]

One [artifact]. Built in {{timeline}}. Updated [cadence].

---

### Slide 3 · Live Demo Flow

The flow editor is the live demo. Three **input nodes** feed the pipeline;
two **output nodes** surface results to the audience:

```
INPUT                  DEFAULT                              OUTPUT
─────────────────────────────────────────────────────────────────────────────
[persona-primary] ──pain_signal──▶ [feature gate] ──raw_items──┐
[N data sources]  ──raw_items───▶ [ingest+dedup]  ◀────────────┘
                                        │ clean_items
[frontmatter]─────vars──┬──────▶ [classify {{ai-proxy}}]──typed_nodes──▶
                        ├──────▶ [score {{score-name}}] ──scored_nodes──▶ [{{db}}] ──▶ [API] ──▶ [canvas + AI Chat UI] (OUTPUT)
                        └──────▶                        ──> {{threshold}} ──────────────────────▶ [{{alert-channel}} alert]  (OUTPUT)
```

**Demo moment:** author clicks the `{{persona-primary}}` input node on canvas →
edits `{{pain-a}}` via the `@` toolbar → upstream propagates live through all
compute nodes → canvas and alert output nodes update in real time.

---

### Slide 4 · Market

- **{{tam}}<!-- @node:market:tam -->** [addressable group] globally ([year], [source])
- **{{sam}}<!-- @node:market:sam -->** [secondary group] ([community or source])
- **Primary:** {{persona-primary}}, {{persona-secondary}}, {{persona-tertiary}}

---

### Slide 5 · Feature Matrix

| Feature | {{project}} | [Competitor A] | [Competitor B] | [Competitor C] |
|---|---|---|---|---|
| [Signal A] capture | ✅ | ❌ | Partial | ❌ |
| [Signal B] mapping | ✅ | ✅ partial | ❌ | ✅ partial |
| Cross-reference both | ✅ | ❌ | ❌ | ❌ |
| {{score-name}} (quantified) | ✅ | ❌ | ❌ | ❌ |
| Real-time {{alert-channel}} alerts | ✅ | ❌ | ❌ cadence | ❌ |
| Open-source / {{tco}} | ✅ | ❌ paid | ❌ paid | ✅ |
| Flow editor (interactive + computable) | ✅ | ❌ | ❌ | ❌ |
| AI Chat UI on canvas | ✅ | ❌ | ❌ | ❌ |

---

### Slide 6 · Ask

**{{milestone-a}}<!-- @node:milestone:a -->:** [What you ship and by when].
**{{milestone-b}}<!-- @node:milestone:b -->:** [What you open-source post-milestone].

---

## PART 2 — PRD<!-- @cluster:prd -->

### Overview

| Field | Value |
|---|---|
| Product | {{project}}<!-- @node:project:name --> |
| Version | {{version}} |
| Timeline | {{timeline}} |
| Team | {{team}} |
| TCO | {{tco}}<!-- @node:meta:tco --> |

### Goals<!-- @node:prd:goal -->

1. Ingest live data from ≥[N] sources with no manual intervention
2. Surface a [visualization type] in a [client type] — [auth requirement]
3. Compute **{{score-name}}<!-- @node:tad:score -->** per [primary entity]
4. Alert via {{alert-channel}}<!-- @node:tad:alert-channel --> when `{{score-name}} > {{threshold}}`
5. Expose an interactive flow editor on the canvas — input nodes editable by author; output nodes update computably

### Non-goals (MVP)

[Excluded feature A] · [Excluded feature B] · [Excluded feature C]

### User Stories

**U1 — {{persona-primary}}<!-- @node:prd:story-u1 -->:** I open {{project}} and see [key artifact] from [time window] to [primary goal].

**U2 — {{persona-secondary}}<!-- @node:prd:story-u2 -->:** I query "[keyword]" and see [ranked output] with {{score-name}} so I can [decision] in under [N] minutes.

**U3 — {{persona-tertiary}}<!-- @node:prd:story-u3 -->:** I add [inputs] to my watchlist and receive {{alert-channel}} alerts when `{{score-name}} > {{threshold}}`.

### Flow Editor Node Types<!-- @node:tad:layer-present -->

| Node type | Handles | `compute:` | Canvas role |
|---|---|---|---|
| `input` | source only | none — static data | persona; data sources; frontmatter config |
| `default` | target + source | pure `(inputs) => outputs` | ingest; classify; score; store; API |
| `output` | target only | none — terminal sink | canvas + AI Chat UI; {{alert-channel}} alert |
| `custom` | any | optional | score readout gauge; feature gate; [custom widget] |

### AI Chat UI

Clicking any node opens a chat thread scoped to that node + 1-hop neighbours.
The AI (routed via {{ai-proxy}} → {{ai-model}}) answers questions grounded in
the node's `data:` and the connected handle values at the time of click.

| Node clicked | Suggested prompt |
|---|---|
| `fn-persona` (input) | "What pain does {{persona-primary}} face?" |
| `fn-classify` (default) | "Explain the classify step via {{ai-proxy}}." |
| `fn-score` (default) | "What is {{score-formula}} in plain language?" |
| `fn-canvas` (output) | "What data is this output node currently displaying?" |
| `fn-alert` (output) | "What threshold condition triggers this alert?" |
| `fn-config` (input) | "Which variables affect the score output most?" |

### Acceptance Criteria<!-- @node:prd:criteria -->

| Feature | Criterion |
|---|---|
| Ingest | ≥[N] items per source per run; zero crashes |
| Classify | Latency < [N]s per item; schema validated |
| {{score-name}} | Updates visible in canvas within [N]s of recompute |
| Flow editor | Input node edit → output node update in ≤[N]s; no manual refresh |
| Canvas | Loads ≤[N]s; zoom/pan smooth; handles snap to grid |
| AI Chat UI | Response < [N]s; scoped to clicked node + 1-hop |
| {{alert-channel}} alert | Delivered < [N] min after trigger |

---

## PART 3 — TAD<!-- @cluster:tad -->

### Stack

> Selection: FOSS-first → lowest {{tco}} → best fit. Every tool below costs {{tco}}<!-- @node:meta:tco -->.

| Priority | Layer | Tool | Role | Cost |
|---|---|---|---|---|
| LOCAL 1 | Ingest | [Scraper] | Fetch raw items from [sources] | $0 |
| LOCAL 2 | Classify | {{ai-proxy}}<!-- @node:tad:ai-proxy --> + {{ai-model}}<!-- @node:tad:ai-model --> | Model-agnostic classify + tag | $0 |
| LOCAL 3 | Score | [Score trigger] | `{{score-formula}}`<!-- @node:tad:formula --> on upsert | $0 |
| LOCAL 4 | Queue | {{queue}}<!-- @node:tad:queue --> | Score recalc jobs | $0 |
| LOCAL 5 | Cache | [Local storage] | Dedup; flushed to {{db}} on interval | $0 |
| CLOUD 1 | DB | {{db}}<!-- @node:tad:db --> | Persist nodes, edges, {{score-name}} | $0 |
| CLOUD 2 | API | [API hosting] | Edge JSON endpoint | $0 |
| CLOUD 3 | Frontend | [Frontend hosting] | Static canvas CDN | $0 |
| CLOUD 4 | Alert | {{alert-channel}}<!-- @node:tad:alert-channel --> | Real-time alerts | $0 |
| ANY | AI Chat | {{ai-proxy}} → {{ai-model}} | Node-scoped chat UI | $0 |

**Total TCO: {{tco}}**<!-- @node:meta:tco -->

### Data Schema

```sql
CREATE TABLE [primary_entity] (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type         TEXT CHECK (type IN ('[type_a]', '[type_b]')),
  label        VARCHAR(255),
  metadata     JSONB,
  {{score-name}} FLOAT DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE flow_nodes (
  id          TEXT PRIMARY KEY,
  doc_id      TEXT,
  type        TEXT CHECK (type IN ('input','default','output','custom')),
  label       TEXT,
  position    JSONB,             -- {"x": N, "y": N}
  handles     JSONB,             -- {"source":["h1"],"target":["h2"]}
  data        JSONB,             -- node payload; mirrors metadata col
  compute_fn  TEXT,              -- raw compute: function string
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE flow_edges (
  id             TEXT PRIMARY KEY,
  doc_id         TEXT,
  source         TEXT REFERENCES flow_nodes(id),
  source_handle  TEXT,
  target         TEXT REFERENCES flow_nodes(id),
  target_handle  TEXT,
  label          TEXT,
  animated       BOOLEAN DEFAULT false,
  created_at     TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON flow_nodes USING GIN (data);
CREATE INDEX ON flow_edges (source, target);
```

`{{score-name}}`<!-- @node:tad:formula --> = `{{score-formula}}` — computed on upsert trigger; mirrored in `fn-score` default node `compute:` function.

### Pipeline

**Stack**: Ingest<!-- @node:tad:layer-ingest --> → Classify<!-- @node:tad:layer-classify --> → Score<!-- @node:tad:layer-score --> → {{db}} → API<!-- @node:tad:layer-api --> → Canvas<!-- @node:tad:layer-present --> + AI Chat UI

**Alert path**: `{{score-name}} > {{threshold}}`<!-- @node:tad:threshold --> → {{alert-channel}}<!-- @node:tad:layer-alert -->

| Layer | Flow node | Type | Input handle | Output handle | Key directive |
|---|---|---|---|---|---|
| Persona | `fn-persona` | `input` | — | `pain_signal` | static; editable via `@` toolbar |
| Sources | `fn-sources` | `input` | — | `raw_items` | rate-limit per source; retry on 429 |
| Config | `fn-config` | `input` | — | `vars` | all `{{key}}` values; single source of truth |
| Feature gate | `fn-feature-gate` | `custom` | `pain_signal` | `raw_items` | enables/disables feature at runtime |
| Ingest | `fn-ingest` | `default` | `raw_items`, `vars` | `clean_items` | dedup against cache; isolate source errors |
| Classify | `fn-classify` | `default` | `clean_items`, `vars` | `typed_nodes` | route via {{ai-proxy}}; validate JSON; batch [N] |
| Score | `fn-score` | `default` | `typed_nodes`, `vars` | `scored_nodes`, `alert_signal` | `{{score-formula}}`; deterministic; single config |
| Store | `fn-store` | `default` | `scored_nodes` | `persisted_payload` | upsert to {{db}}; flush local cache |
| API | `fn-api` | `default` | `persisted_payload` | `json_payload` | edge-hosted; ≤[N]ms p99 |
| Canvas | `fn-canvas` | `output` | `json_payload` | — | renders graph; AI Chat UI on node click |
| Alert | `fn-alert` | `output` | `alert_signal` | — | {{alert-channel}} DM; debounce per entity |

### Design Decisions

| Decision | Rationale | Pros | Cons | Mitigation |
|---|---|---|---|---|
| `input` nodes for persona + config | Author-editable without code | Live propagation on `@` toolbar edit | Must re-run compute chain | Debounce compute on rapid edits |
| `output` nodes for canvas + alert | Clear terminal contract | No accidental downstream side-effects | Cannot be chained further | Use `custom` node if intermediate output needed |
| `compute:` pure functions | Testable; reproducible | Swap formula via `@` toolbar; no state | No async fetch in compute | Pre-fetch in `input` node data; pass via handle |
| Local-first cache | Zero infra; instant dedup | $0; zero latency | Lost on reset | Flush to {{db}} on interval |
| {{ai-proxy}} router | Model-agnostic | Swap via config; testable | +[N]ms hop | Self-host locally |
| AI Chat scoped to node | Context-relevant answers | Precise; low token cost | No cross-graph queries | 1-hop neighbour expansion on demand |

---

## PART 4 — CRITICAL PATH<!-- @cluster:path -->

> **{{team}}.** Hard deadline: H[N:MM] {{milestone-a}}. Type `@` to update variables before starting.

| Task | Hour | ☐ | Category |
|---|---|---|---|
| Repo init + infra config + hosting | 0:00 | ☐ | Infra |
| {{db}}<!-- @node:tad:db --> — provision + schema (`flow_nodes`, `flow_edges`, score trigger) | 0:10 | ☐ | DB |
| Ingest — fetch raw items from [N] sources | 0:20 | ☐ | Scrape |
| {{ai-proxy}} + {{ai-model}} — classify + tag | 0:40 | ☐ | AI |
| Dedup cache → {{db}} upsert + `{{score-formula}}` trigger | 1:00 | ☐ | DB + Logic |
| API endpoint → JSON payload | 1:15 | ☐ | API |
| {{queue}} — score recalc pipeline | 1:30 | ☐ | Queue |
| {{alert-channel}} bot — `{{score-name}} > {{threshold}}` alert | 1:45 | ☐ | Alert · **P0**<!-- @node:path:p0 --> |
| Canvas scaffold — flow editor; input / default / output / custom nodes | 2:00 | ☐ | Frontend |
| Wire `fn-config` input node → `@` toolbar variable CRUD | 2:15 | ☐ | Frontend + DX |
| `compute:` chain — ingest → classify → score → store → API | 2:25 | ☐ | Logic |
| AI Chat UI — node click → scoped chat via {{ai-proxy}} | 2:35 | ☐ | AI + Frontend |
| Wire API → canvas output node; poll [N]s | 2:45 | ☐ | Integration |
| `git push` → CI/CD → auto-deploy | 2:55 | ☐ | Deploy |
| **DEMO READY**<!-- @node:path:demo --> | **[N:MM]** | **☐** | **Demo · P0** |

> **P0 risk<!-- @node:path:p0 -->:** {{alert-channel}} alert loop is the most commonly missed milestone — wire and test before polishing the flow editor UI.

---

## PART 5 — COST-BENEFIT<!-- @cluster:cost -->

| Tool | Role | Local/Cloud | Free tier | Risk |
|---|---|---|---|---|
| [Scraper] | `fn-sources` input node | Local | Unlimited | Low |
| {{ai-proxy}} | `fn-classify` default node | Local | Self-hosted | Low |
| {{ai-model}} | Classify + tag; AI Chat | Cloud API | [N] req/day | ⚠️ batch carefully |
| {{queue}} | Score recalc jobs | Local | Self-hosted | Low |
| [Local cache] | Dedup session | Local | Disk only | Low |
| {{db}} | `fn-store` + `flow_nodes` + `flow_edges` | Cloud DB | [N] GB | Low |
| [API hosting] | `fn-api` default node | Edge | [N] req/day | Low |
| [Frontend hosting] | `fn-canvas` output node | Edge | Unlimited | Low |
| {{alert-channel}} | `fn-alert` output node | Cloud | Unlimited | Low |
| **Total**<!-- @node:cost:total --> | | **Local-first** | | **{{tco}}** |

---

## Anti-Patterns (Forbidden)

| Context | Directive |
|---|---|
| Credentials | Always read from env vars via `fn-config` input node; forbid committed secrets |
| AI calls | Route via {{ai-proxy}}; forbid direct model SDK in business logic |
| `compute:` side effects | Pure functions only; forbid fetch/mutation inside `compute:` |
| Input node as sink | `input` nodes have source handles only; forbid target handles on input nodes |
| Output node as source | `output` nodes have target handles only; forbid source handles on output nodes |
| Classification drops | Log and retry malformed responses; forbid silent discard |
| Stale cache | Flush on interval; forbid serving without TTL check |
| AI Chat unbounded | Scope to node + 1-hop; forbid full-graph context per message |

---

## Design Mantras

```
- [ ] Signal; surface {{score-name}} over noise; forbid ambiguous outputs
- [ ] Modularity; isolate input/default/output/custom node types; forbid mixed-role nodes
- [ ] Neutrality; route via {{ai-proxy}}; forbid hardcoded model SDK calls
- [ ] Computability; compute: functions are pure; forbid side effects in compute chain
- [ ] Transparency; expose {{score-formula}} in fn-score data:; forbid opaque scoring
- [ ] Conversability; scope AI Chat to node + 1-hop; forbid unbounded full-graph queries
```

---

*{{project}}<!-- @node:project:name --> · {{license}}<!-- @node:meta:license --> · {{tco}}<!-- @node:meta:tco --> · {{team}}<!-- @node:meta:team --> · type `@` to manage all variables*