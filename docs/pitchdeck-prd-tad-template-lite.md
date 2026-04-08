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
# All {{key}} references in body prose resolve from here.
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

# pain → solution (shared sample)
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
  - @node:prd:goal:          { label: "[Goal]",                status: placeholder }
  - @node:prd:story-u1:      { label: "U1 {{persona-primary}}",   status: placeholder }
  - @node:prd:story-u2:      { label: "U2 {{persona-secondary}}", status: placeholder }
  - @node:prd:story-u3:      { label: "U3 {{persona-tertiary}}",  status: placeholder }
  - @node:prd:criteria:      { label: "Acceptance Criteria",   status: placeholder }

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
  - @node:path:p0:           { label: "P0 Risk Task",        status: placeholder }
  - @node:path:demo:         { label: "DEMO READY H[N:MM]",  status: placeholder }

# ── EDGES ─────────────────────────────────────────────────────────────────────
# Sigil: @edge:source→target · rel label
# Hex node in Mermaid: e_id{{"@edge:id · rel"}}
edges:
  - id: @edge:pain→feature     · motivates
  - id: @edge:feature→prd      · specced-in
  - id: @edge:prd→tad          · implemented-by
  - id: @edge:score→alert      · triggers       condition: "score > {{threshold}}"
  - id: @edge:stack→cost       · costed-in
  - id: @edge:p0→demo          · gates
  - id: @edge:ai-proxy→classify · routes

# ── CLUSTERS ─────────────────────────────────────────────────────────────────
clusters:
  - @cluster:pitch: { label: "PART 1 · Pitch Deck", members: [persona:*, pain:*, feature:*, market:*, milestone:*] }
  - @cluster:prd:   { label: "PART 2 · PRD",        members: [prd:*] }
  - @cluster:tad:   { label: "PART 3 · TAD",        members: [tad:*] }
  - @cluster:path:  { label: "PART 4 · Critical Path", members: [path:*] }
  - @cluster:cost:  { label: "PART 5 · Cost",        members: [meta:tco, tad:stack] }

# ── AI CHAT UI ───────────────────────────────────────────────────────────────
# The graph canvas exposes an AI Chat UI. Each node is a chat context.
# Clicking a node opens a chat thread scoped to that node's cluster.
# Suggested prompts auto-generated from node label + edge relationships.
ai-chat:
  model:    "{{ai-model}}"
  proxy:    "{{ai-proxy}}"
  scope:    node          # chat context = clicked node + 1-hop neighbours
  prompts:
    - "What pain does {{pain-a}} solve?"
    - "How does {{feature-1}} address {{pain-a}}?"
    - "What is the acceptance criterion for {{score-name}}?"
    - "Explain the edge between {{ai-proxy}} and the classify layer."
    - "What would change if {{threshold}} were lowered?"

# ── MERMAID KNOWLEDGE GRAPH ──────────────────────────────────────────────────
# Shape → primitive:
#   @node      →  n_id["label"]       rect      [ ]
#   @node stub →  n_id{"label"}       diamond   { }   (placeholder/unresolved)
#   @edge      →  e_id{{"label"}}     hexagon   {{ }}
#   @cluster   →  subgraph id         subgraph
#   @cluster   →  cc_id(("@cluster")) circle    (( )) (inline ref)
mermaid: |
  %%{init: {"theme":"base","themeVariables":{"primaryColor":"#E1F5EE","primaryTextColor":"#085041","primaryBorderColor":"#1D9E75","lineColor":"#5F5E5A","secondaryColor":"#E6F1FB","tertiaryColor":"#FAEEDA"}}}%%
  flowchart TB

    %% ── shape key ────────────────────────────────────────────────
    %% [ ]    rect          @node entity
    %% { }    diamond       @node stub / placeholder
    %% {{ }}  hexagon       @edge named relation
    %% (( ))  circle        @cluster inline ref · terminal
    %% [/ /]  parallelogram input / output
    %% [( )]  cylinder      data store

    %% ── variable refs (resolved from frontmatter via `@` toolbar) ──
    %% {{project}}  {{persona-primary}}  {{pain-a}}  {{solution}}
    %% {{ai-proxy}} {{ai-model}}         {{db}}      {{score-name}}

    %% ── classDef ──────────────────────────────────────────────────
    classDef persona  fill:#E1F5EE,stroke:#1D9E75,color:#085041,stroke-width:1.5px
    classDef problem  fill:#FBEAF0,stroke:#D4537E,color:#72243E,stroke-width:1.5px
    classDef feature  fill:#E6F1FB,stroke:#378ADD,color:#0C447C,stroke-width:1.5px
    classDef process  fill:#FAEEDA,stroke:#BA7517,color:#633806,stroke-width:1.5px
    classDef store    fill:#F1EFE8,stroke:#888780,color:#444441,stroke-width:1px
    classDef output   fill:#EAF3DE,stroke:#639922,color:#27500A,stroke-width:1.5px
    classDef terminal fill:#EEEDFE,stroke:#7F77DD,color:#3C3489,stroke-width:2px
    classDef chat     fill:#FCEBEB,stroke:#E24B4A,color:#501313,stroke-width:1.5px

    %% ── PART 1 · Pitch Deck ──────────────────────────────────────
    subgraph cluster_pitch["PART 1 · Pitch Deck"]
      direction TB
      n_who(["{{persona-primary}}"])
      n_pain_a["{{pain-a}}"]
      n_pain_b["{{pain-b}}"]
      n_pain_c{"{{pain-c}}"}
      e_motivates{{"motivates"}}
      n_feat1["{{feature-1}}"]
      n_feat2["{{feature-2}}"]
      n_feat3["{{feature-3}}"]
      n_tam[/"{{tam}} TAM"/]
      n_ms_a["{{milestone-a}}"]
      n_ms_b{"{{milestone-b}}"}

      n_who -->|faces| n_pain_a
      n_who -->|faces| n_pain_b
      n_who -->|faces| n_pain_c
      n_pain_a --> e_motivates
      n_pain_b --> e_motivates
      n_pain_c --> e_motivates
      e_motivates --> n_feat1
      e_motivates --> n_feat2
      e_motivates --> n_feat3
      n_tam -->|contextualizes| n_ms_a
    end

    %% ── PART 2 · PRD ─────────────────────────────────────────────
    subgraph cluster_prd["PART 2 · PRD"]
      direction TB
      n_goal["[Goal]"]
      n_u1["U1 {{persona-primary}}"]
      n_u2["U2 {{persona-secondary}}"]
      n_u3["U3 {{persona-tertiary}}"]
      n_ac["Acceptance Criteria"]

      n_u1 -->|traced-to| n_ac
      n_u2 -->|traced-to| n_ac
      n_u3 -->|traced-to| n_ac
      n_goal -->|accepted-via| n_ac
    end

    %% ── PART 3 · TAD pipeline ────────────────────────────────────
    subgraph cluster_tad["PART 3 · TAD"]
      direction LR
      n_ingest[/"Ingest"/]
      n_classify{{"Classify via {{ai-proxy}}"}}
      n_score[["Score: {{score-name}}"]]
      n_db[("{{db}}")]
      n_api["API"]
      n_present[/"Present"/]
      n_alert(["Alert {{alert-channel}}"])
      n_chat@{ shape: lean-r, label: "AI Chat UI" }

      n_ingest --> n_classify --> n_score --> n_db
      n_db --> n_api --> n_present
      n_score -->|"> {{threshold}}"| n_alert
      n_present --> n_chat
    end

    %% ── PART 4 · Critical Path ───────────────────────────────────
    subgraph cluster_path["PART 4 · Critical Path"]
      direction LR
      n_p0["P0 Risk Task"]
      n_demo(("DEMO READY"))

      n_p0 -->|gates| n_demo
    end

    %% ── PART 5 · Cost ────────────────────────────────────────────
    subgraph cluster_cost["PART 5 · Cost"]
      n_tco["{{tco}} TCO"]
    end

    %% ── cross-cluster edges ───────────────────────────────────────
    cluster_pitch -->|"specced-in"| cluster_prd
    cluster_prd   -->|"implemented-by"| cluster_tad
    cluster_tad   -->|"sequenced-by"| cluster_path
    n_feat1       -->|"costed-in"| n_tco
    n_ms_a        -->|milestone| n_demo
    n_ms_b        -->|milestone| n_demo

    %% ── class assignments ────────────────────────────────────────
    class n_who,n_u1,n_u2,n_u3 persona
    class n_pain_a,n_pain_b,n_pain_c problem
    class n_feat1,n_feat2,n_feat3 feature
    class n_classify,e_motivates process
    class n_db store
    class n_present,n_api output
    class n_demo terminal
    class n_chat chat

    %% ── click → AI Chat UI (node-scoped chat context) ────────────
    click n_who    "#part-1--pitch-deck" "Chat: who is {{persona-primary}}?"
    click n_pain_a "#slide-1--problem"   "Chat: what drives {{pain-a}}?"
    click n_feat1  "#slide-2--solution"  "Chat: how does {{feature-1}} work?"
    click n_classify "#tad-pipeline"     "Chat: explain the classify layer"
    click n_score  "#tad-pipeline"       "Chat: what is {{score-formula}}?"
    click n_chat   "#ai-chat-ui"         "Open AI Chat UI"
    click n_demo   "#part-4--critical-path" "Chat: what gates the demo?"
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

---

### Slide 2 · Solution

**{{project}}** is a [product category] that:

1. **{{feature-1}}<!-- @node:feature:1 -->** — [one-sentence capability + mechanism]
2. **{{feature-2}}<!-- @node:feature:2 -->** — [one number / metric that quantifies the insight]
3. **{{feature-3}}<!-- @node:feature:3 -->** — [interactive capability that reveals the insight]

One [artifact]. Built in {{timeline}}. Updated [cadence].

---

### Slide 3 · Live Demo Flow

```
[Source A] → [Ingest] → [Classify via {{ai-proxy}} + {{ai-model}}] → [Score: {{score-name}}]
                                                                              ↓
                                          [{{db}}] → [API] → [Canvas · AI Chat UI]
                                                                              ↓
                                                            [Alert: {{alert-channel}}]
```

**Demo moment:** [Describe the on-stage live action and audience payoff].

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

### Non-goals (MVP)

[Excluded feature A] · [Excluded feature B] · [Excluded feature C]

### User Stories

**U1 — {{persona-primary}}<!-- @node:prd:story-u1 -->:** I open {{project}} and see [key artifact] from [time window] to [primary goal].

**U2 — {{persona-secondary}}<!-- @node:prd:story-u2 -->:** I query "[keyword]" and see [ranked output] with {{score-name}} so I can [decision] in under [N] minutes.

**U3 — {{persona-tertiary}}<!-- @node:prd:story-u3 -->:** I add [inputs] to my watchlist and receive {{alert-channel}} alerts when `{{score-name}} > {{threshold}}`.

### AI Chat UI<!-- @node:tad:ai-proxy -->

The graph canvas has an embedded AI Chat UI. Clicking any node opens a chat thread scoped to that node + its 1-hop neighbours. The AI (routed via {{ai-proxy}} → {{ai-model}}) answers questions grounded in the node's data.

Suggested prompts auto-generated per node:

| Node clicked | Suggested prompt |
|---|---|
| {{persona-primary}} | "What pain does this persona face?" |
| {{pain-a}} | "What feature addresses this pain?" |
| {{feature-1}} | "What is the acceptance criterion for this feature?" |
| {{score-name}} | "Explain {{score-formula}} in plain language." |
| [any edge] | "Why does this relationship exist?" |

### Acceptance Criteria<!-- @node:prd:criteria -->

| Feature | Criterion |
|---|---|
| Ingest | ≥[N] items per source per run; zero crashes |
| Classify | Latency < [N]s per item; schema validated |
| {{score-name}} | Updates visible in canvas within [N]s of recompute |
| Canvas | Loads ≤[N]s; zoom/pan smooth |
| AI Chat UI | Response < [N]s; scoped to clicked node |
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
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type       TEXT CHECK (type IN ('[type_a]', '[type_b]')),
  label      VARCHAR(255),
  metadata   JSONB,
  {{score-name}} FLOAT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE [relationship_entity] (
  source_id UUID REFERENCES [primary_entity](id),
  target_id UUID REFERENCES [primary_entity](id),
  weight    FLOAT,
  PRIMARY KEY (source_id, target_id)
);

CREATE INDEX ON [relationship_entity](source_id);
CREATE INDEX ON [relationship_entity](target_id);
```

`{{score-name}}`<!-- @node:tad:formula --> = `{{score-formula}}` — computed on upsert trigger.

### Pipeline

**Stack**: Ingest<!-- @node:tad:layer-ingest --> → Classify<!-- @node:tad:layer-classify --> → Score<!-- @node:tad:layer-score --> → {{db}} → API<!-- @node:tad:layer-api --> → Canvas<!-- @node:tad:layer-present --> + AI Chat UI

**Alert path**: `{{score-name}} > {{threshold}}`<!-- @node:tad:threshold --> → {{alert-channel}}<!-- @node:tad:layer-alert -->

| Layer | Input | Output | Key directive |
|---|---|---|---|
| Ingest | [source URLs] | raw items | rate-limit per source; retry on 429; isolate errors |
| Classify | raw items | typed + tagged nodes | route via {{ai-proxy}}; validate JSON response; batch [N] per call |
| Score | upserted node | `{{score-name}}` float | deterministic formula; single config location; no hardcoded literals |
| API | {{db}} nodes/edges | JSON payload | edge-hosted; ≤[N]ms p99; warm with [N]s frontend poll |
| Canvas + AI Chat | JSON payload | interactive graph | node click → scoped chat context; suggest prompts from edge relationships |
| Alert | score + watchlist | {{alert-channel}} DM | debounce per entity per [window]; read threshold from env |

### Design Decisions

| Decision | Rationale | Pros | Cons | Mitigation |
|---|---|---|---|---|
| Local-first cache | Zero infra; instant dedup | $0; zero latency | Lost on reset | Flush to {{db}} on interval |
| {{ai-proxy}} router | Model-agnostic | Swap via config; testable | +[N]ms hop | Self-host locally |
| DB trigger for {{score-name}} | Atomic with upsert | No race condition | DB-specific SQL | Abstract into tested pure function |
| AI Chat scoped to node | Context-relevant answers | Precise; low token cost | No cross-graph queries | 1-hop neighbour expansion on demand |
| {{tco}} TCO | Accessibility; community trust | No billing risk; forkable | Free tier limits | Document all limits; upgrade paths |

---

## PART 4 — CRITICAL PATH<!-- @cluster:path -->

> **{{team}}.** Hard deadline: H[N:MM] {{milestone-a}}. Type `@` to update variables before starting.

| Task | Hour | ☐ | Category |
|---|---|---|---|
| Repo init + infra config + hosting | 0:00 | ☐ | Infra |
| {{db}}<!-- @node:tad:db --> — provision + schema + score trigger | 0:10 | ☐ | DB |
| Ingest — fetch raw items from [N] sources | 0:20 | ☐ | Scrape |
| {{ai-proxy}} + {{ai-model}} — classify + tag | 0:40 | ☐ | AI |
| Dedup cache → {{db}} upsert + `{{score-formula}}` trigger | 1:00 | ☐ | DB + Logic |
| API endpoint → JSON payload | 1:15 | ☐ | API |
| {{queue}} — score recalc pipeline | 1:30 | ☐ | Queue |
| {{alert-channel}} bot — token + `{{score-name}} > {{threshold}}` alert | 1:45 | ☐ | Alert · **P0**<!-- @node:path:p0 --> |
| Canvas scaffold + node/edge render | 2:00 | ☐ | Frontend |
| AI Chat UI — node click → scoped chat | 2:20 | ☐ | AI + Frontend |
| Wire API → canvas; poll [N]s | 2:40 | ☐ | Integration |
| `git push` → CI/CD → auto-deploy | 2:55 | ☐ | Deploy |
| **DEMO READY**<!-- @node:path:demo --> | **[N:MM]** | **☐** | **Demo · P0** |

> **P0 risk<!-- @node:path:p0 -->:** {{alert-channel}} alert loop is the most commonly missed milestone — wire and test before polishing the UI.

---

## PART 5 — COST-BENEFIT<!-- @cluster:cost -->

| Tool | Role | Local/Cloud | Free tier | Risk |
|---|---|---|---|---|
| [Scraper] | Ingest raw items | Local | Unlimited | Low |
| {{ai-proxy}} | Route classify calls | Local | Self-hosted | Low |
| {{ai-model}} | Classify + tag | Cloud API | [N] req/day | ⚠️ batch carefully |
| {{queue}} | Score recalc jobs | Local | Self-hosted | Low |
| [Local cache] | Dedup session | Local | Disk only | Low |
| {{db}} | Persist nodes + score | Cloud DB | [N] GB | Low |
| [API hosting] | Edge JSON endpoint | Edge | [N] req/day | Low |
| [Frontend hosting] | Static canvas CDN | Edge | Unlimited | Low |
| {{alert-channel}} | DM alerts | Cloud | Unlimited | Low |
| {{ai-proxy}} → {{ai-model}} | AI Chat UI | Local → Cloud | Shared with classify | Low |
| **Total**<!-- @node:cost:total --> | | **Local-first** | | **{{tco}}** |

---

## Anti-Patterns (Forbidden)

| Context | Directive |
|---|---|
| Credentials | Always read from env vars; forbid committed secrets |
| AI calls | Route via {{ai-proxy}}; forbid direct model SDK in business logic |
| Classification drops | Log and retry malformed responses; forbid silent discard |
| Stale cache | Flush on interval; forbid serving without TTL check |
| Monolithic pipeline | Separate ingest/classify/score/render; forbid single-file pipeline |
| AI Chat unbounded | Scope to node + 1-hop; forbid full-graph context per message |

---

## Design Mantras

```
- [ ] Signal; surface {{score-name}} over noise; forbid ambiguous outputs
- [ ] Modularity; isolate ingest, classify, score, render; forbid monolithic pipelines
- [ ] Neutrality; route via {{ai-proxy}}; forbid hardcoded model SDK calls
- [ ] Reliability; isolate source errors; forbid full-pipeline halt on single failure
- [ ] Transparency; expose {{score-formula}}; forbid opaque rankings
- [ ] Conversability; scope AI Chat to node context; forbid unbounded full-graph queries
```

---

*{{project}}<!-- @node:project:name --> · {{license}}<!-- @node:meta:license --> · {{tco}}<!-- @node:meta:tco --> · {{team}}<!-- @node:meta:team --> · type `@` to manage all variables*
