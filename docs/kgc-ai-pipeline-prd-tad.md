---
title: Knowledge Graph Canvas · AI Markdown Pipeline — PRD + TAD
graphId: md:kg-canvas-ai-pipeline
theme: startup
background: /cover.svg
class: text-center
transition: slide-left
layout: cover
aspectRatio: 16/9
lang: en-US
authors:
  - Knowgrph Canvas Team
date: "2026-04-16"
venue: "Singapore"
url: "airvio.co"
product: "Knowledge Graph Canvas"
pipeline: "canvas → chat context → user intent → AI markdown → validation → render/save"
ai_model: "claude-sonnet-4-20250514"
doc_type: "PRD + TAD"
version: "0.1.0"
owner: "platform-ai"
status: "draft"
mermaid: |
  %%{init: {"theme": "base", "themeVariables": {"primaryColor":"#E1F5EE","primaryTextColor":"#085041","primaryBorderColor":"#1D9E75","lineColor":"#5F5E5A","secondaryColor":"#E6F1FB","tertiaryColor":"#FAEEDA"}}}%%
  flowchart TB
    %% Shape key: [ ] rect | ([ ]) stadium | (( )) terminal
    %%            { } diamond | {{ }} hexagon | [/ /] parallelogram | [( )] cylinder

    classDef persona  fill:#E1F5EE,stroke:#1D9E75,color:#085041,stroke-width:1.5px
    classDef process  fill:#E6F1FB,stroke:#378ADD,color:#0C447C,stroke-width:1.5px
    classDef decision fill:#FAEEDA,stroke:#BA7517,color:#633806,stroke-width:1.5px
    classDef store    fill:#F1EFE8,stroke:#888780,color:#444441,stroke-width:1px
    classDef output   fill:#EAF3DE,stroke:#639922,color:#27500A,stroke-width:1.5px
    classDef terminal fill:#EEEDFE,stroke:#7F77DD,color:#3C3489,stroke-width:2px
    classDef problem  fill:#FBEAF0,stroke:#D4537E,color:#72243E,stroke-width:1.5px

    subgraph S1["Phase 1 · Canvas Context Packaging"]
      direction TB
      S1_User(["author / reviewer"])
      S1_Canvas["Knowledge Graph Canvas"]
      S1_Pkg{{"packContext()"}}
      S1_Intent[/user intent + selection/]
      S1_User -->|selects node · types prompt| S1_Canvas
      S1_Canvas -->|active graph + cursor state| S1_Pkg
      S1_Pkg -->|structured context bundle| S1_Intent
    end

    subgraph S2["Phase 2 · AI Markdown Generation"]
      direction TB
      S2_Chat["Chat UI"]
      S2_AI{{"generateMarkdown()"}}
      S2_Guide[/markdown-syntax-guidelines.md/]
      S2_Valid{syntax valid?}
      S2_Chat -->|prompt + context| S2_AI
      S2_Guide -->|guideline_digest injection| S2_AI
      S2_AI -->|raw MD response| S2_Valid
      S2_Valid -->|"no → @flag:correction re-prompt"| S2_AI
    end

    subgraph S3["Phase 3 · Canvas Render + Persist"]
      direction TB
      S3_Render{{"renderCanvas()"}}
      S3_Store[(flow_nodes + flow_edges JSONB)]
      S3_Display["Canvas display"]
      S3_Pub((saved + rendered))
      S3_Render -->|hydrate ReactFlow| S3_Display
      S3_Render -->|upsert rows| S3_Store
      S3_Display --> S3_Pub
    end

    S1_Intent -->|inject into prompt| S2_Chat
    S2_Valid -->|"yes → pass"| S3_Render
    S3_Store -->|"on reload → rehydrate"| S1_Canvas

    class S1_User persona
    class S1_Pkg,S2_AI,S2_Guide,S3_Render process
    class S1_Canvas,S2_Valid decision
    class S3_Store store
    class S3_Display output
    class S3_Pub terminal
    class S2_Chat process

    click S1_Canvas "#phase-1--canvas-context-packaging" "Canvas context spec"
    click S2_AI "#phase-2--ai-markdown-generation" "AI generation spec"
    click S2_Guide "#syntax-validation-rules" "Validation rules"
    click S3_Store "#data-schema" "JSONB schema"
    click S3_Pub "#phase-3--canvas-render--persist" "Render + persist spec"

flow:
  direction: LR
  edgeType: smoothstep
  snapToGrid: true
  gridSize: 20
  computed: true
  nodes:
    - id: n-canvas
      type: input
      label: "Knowledge Graph Canvas"
      position: { x: 0, y: 80 }
      handles:
        source: [signal]
      data:
        pain: "AI responses ignore graph structure"
        goal: "structured context for every prompt"

    - id: n-pack
      type: default
      label: packContext()
      position: { x: 220, y: 80 }
      handles:
        target: [signal]
        source: [context]
      compute: |
        (inputs) => ({
          context: inputs.signal ? {
            selected_node: inputs.signal.node,
            frontmatter:   inputs.signal.fm,
            graph_summary: inputs.signal.summary
          } : null
        })

    - id: n-ai
      type: default
      label: "generateMarkdown()"
      position: { x: 440, y: 80 }
      handles:
        target: [context]
        source: [md]
      compute: |
        (inputs) => ({
          md: inputs.context
            ? callAnthropicAPI(inputs.context)
            : null
        })
      data:
        model: "claude-sonnet-4-20250514"
        temperature: 0.3

    - id: n-validate
      type: default
      label: validateMarkdown()
      position: { x: 660, y: 80 }
      handles:
        target: [md]
        source: [valid_md]
      compute: |
        (inputs) => ({
          valid_md: runValidation(inputs.md)
        })
      data:
        rules: ["V-01","V-02","V-03","V-04","V-05","V-06","V-07"]
        max_retry: 3

    - id: n-render
      type: output
      label: "renderCanvas()"
      position: { x: 880, y: 80 }
      handles:
        target: [valid_md]
      data:
        stores: ["flow_nodes","flow_edges"]
        triggers: "ReactFlow re-render"

  edges:
    - { id: e1, source: n-canvas,   sourceHandle: signal,    target: n-pack,     targetHandle: signal,    animated: true }
    - { id: e2, source: n-pack,     sourceHandle: context,   target: n-ai,       targetHandle: context,   animated: true }
    - { id: e3, source: n-ai,       sourceHandle: md,        target: n-validate, targetHandle: md,        animated: true }
    - { id: e4, source: n-validate, sourceHandle: valid_md,  target: n-render,   targetHandle: valid_md,  animated: true, label: "validated MD" }
---

# {{product}} · AI Markdown Pipeline

## {{doc_type}}

`bg#E1F5EE:version {{version}}` · `bg#FAEEDA:status {{status}}` · owner `{{owner}}` · 2026-04-16

---

## PRD — Product Requirements

### Problem

Authors editing a `{{product}}` node trigger a Chat UI. The chat must understand full graph context — selected node, connected edges, active scope — and generate Markdown that ==strictly conforms== to `markdown-syntax-guidelines.md`. Without a structured context-packaging step and a syntax-validation gate, AI responses produce raw prose that the canvas renderer cannot parse or persist.

### Goals

| id | Goal | Priority | Status |
|---|---|---|---|
| `G-01` | Package canvas graph state into a structured Chat UI context bundle | `#D85A30:P0` | TBD |
| `G-02` | AI generates Markdown compliant with sigil, variable, and flow-graph syntax | `#D85A30:P0` | TBD |
| `G-03` | Syntax validation gate rejects non-conformant responses before canvas render | `#D85A30:P0` | TBD |
| `G-04` | Validated MD persisted to `flow_nodes` / `flow_edges` JSONB store | `#185FA5\|bg#E6F1FB:P1` | TBD |
| `G-05` | Canvas rehydrates graph from persisted JSONB on reload | `#185FA5\|bg#E6F1FB:P1` | TBD |

### Non-Goals

Raw AI prose output without canvas-aware formatting, direct DOM manipulation bypassing the MD layer, and multi-user real-time sync are out of scope for v`{{version}}`.

### User Stories

| id | As a… | I want… | So that… | Acceptance Criteria |
|---|---|---|---|---|
| `US-01` | `{{owner}}` author | to select a node and ask the AI to describe it | the response uses `{{variable}}` refs and sigils the canvas resolves | AI response contains `{{key}}` refs resolvable from frontmatter |
| `US-02` | `{{owner}}` author | AI-generated `flow:` YAML appended to frontmatter | new nodes appear on the canvas without manual YAML authoring | `flow_nodes` rows created; canvas renders new nodes |
| `US-03` | reviewer | highlighted `bg#HEX:text` confidence annotations in AI responses | risk can be scanned at a glance without opening each node | sigil parse succeeds; JSONB `background` field non-null |
| `US-04` | `{{owner}}` author | re-prompt triggered automatically on validation failure | broken MD never reaches the canvas | retry loop fires ≤ 3× before surfacing `@flag:validation-failed` |

---

## TAD — Technical Architecture

### Architecture Overview

`{{pipeline}}`

The pipeline has three bounded phases — each phase's output is the next phase's input. The Chat UI is the seam between human intent and AI generation; the validator is the seam between AI output and canvas state.

### Phase 1 · Canvas Context Packaging

`packContext()` reads the ReactFlow instance and produces a structured context bundle injected into every Chat UI prompt as a system-prompt prefix.

| Field | Source | Type | Notes |
|---|---|---|---|
| `selected_node` | `useReactFlow().getNode(id)` | `object` | full node JSONB |
| `connected_edges` | `getConnectedEdges(node, edges)` | `object[]` | upstream + downstream |
| `frontmatter` | document YAML store | `object` | all `{{key}}` declarations |
| `graph_summary` | `summariseGraph(nodes, edges)` | `string` | ≤ 200 tokens |
| `guideline_digest` | `markdown-syntax-guidelines.md` § headers + rule tables | `string` | ≤ 800 tokens; injected as system context |

`guideline_digest` is pre-computed at canvas boot — a condensed rule list from `markdown-syntax-guidelines.md` headings and rule tables. It is injected as a system-prompt prefix on every AI call, keeping the model compliant without exceeding context limits.

### Phase 2 · AI Markdown Generation

Model: `{{ai_model}}`. Temperature: `0.3` (low; maximises rule adherence). Max tokens: `1000`.

System prompt structure:

```
[SYSTEM]
You are a Markdown author for {{product}}.
COMPLY with all rules in <guidelines>{guideline_digest}</guidelines>.
Respond ONLY with valid Markdown. No preamble. No explanation.
```

`generateMarkdown()` wraps the Anthropic `/v1/messages` endpoint. On receipt, the raw response string is passed immediately to `validateMarkdown()`.

### Syntax Validation Rules

`validateMarkdown(md)` runs checks in order; first failure triggers a re-prompt with the failed rule injected as `@flag:correction` into the next call.

| Rule id | Check | Pattern | Pass condition |
|---|---|---|---|
| `V-01` | Color sigil HEX format | `` `#HEX:text` `` | HEX is exactly 6 uppercase digits |
| `V-02` | Long quote guard | prose | no quoted span ≥ 15 words |
| `V-03` | Variable references resolvable | `{{key}}` | all keys present in frontmatter or inline `{{key:value}}` |
| `V-04` | Multi-select arrays valid JSON | `` `["A","B"]` `` | `JSON.parse` succeeds after backtick strip |
| `V-05` | `compute:` function is pure | `compute: \|` block | no `fetch`, `document`, `window` in function body |
| `V-06` | No manual truncation ellipsis | `...` in headings | no `...` at end of H1–H4 labels |
| `V-07` | Confidence enum constrained | `confidence:` fields | values are exactly `low`, `medium`, or `high` |

Max retry: `3`. After 3 failures the UI surfaces `@flag:validation-failed` on the originating canvas node.

### Phase 3 · Canvas Render + Persist

`renderCanvas(md)` runs the following steps in sequence:

1. Parses YAML frontmatter → resolves `{{}}` variables via `resolveVars()`.
2. Extracts `flow:` block → hydrates ReactFlow `nodes[]` and `edges[]`.
3. Calls `parseSigil()` on every table cell → maps to JSONB annotation objects.
4. Upserts `flow_nodes` and `flow_edges` tables (schema below).
5. Triggers ReactFlow re-render.

### Data Schema

```sql
CREATE TABLE flow_nodes (
  id          TEXT PRIMARY KEY,
  doc_id      TEXT,
  type        TEXT CHECK (type IN ('input','default','output','custom')),
  label       TEXT,
  position    JSONB,              -- {"x": 0, "y": 0}
  handles     JSONB,              -- {"source":["urls"],"target":["demos"]}
  data        JSONB,              -- arbitrary node data; mirrors metadata col
  compute_fn  TEXT,               -- raw compute: function string
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE flow_edges (
  id              TEXT PRIMARY KEY,
  doc_id          TEXT,
  source          TEXT REFERENCES flow_nodes(id),
  source_handle   TEXT,
  target          TEXT REFERENCES flow_nodes(id),
  target_handle   TEXT,
  label           TEXT,
  animated        BOOLEAN DEFAULT false,
  created_at      TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON flow_nodes USING GIN (data);
CREATE INDEX ON flow_edges (source, target);
```

---

## Implementation Checklist

### User Flow

| # | Step | Actor | Output | Confidence | Status |
|---|---|---|---|---|---|
| `UF-01` | Select a canvas node | author | node id + position captured | high | TBD |
| `UF-02` | Type prompt in Chat UI | author | raw prompt string | high | TBD |
| `UF-03` | Chat UI streams AI response tokens | system | streamed MD | medium | TBD |
| `UF-04` | Validation badge shown on node card | system | `high` / `low` / `@flag:failed` | medium | TBD |
| `UF-05` | Author accepts → canvas updates | author | new nodes / annotations visible | high | TBD |
| `UF-06` | Author rejects → re-prompts with inline feedback | author | correction injected into next call | medium | TBD |

### Work Flow

| # | Step | Component | Trigger | Confidence | Status |
|---|---|---|---|---|---|
| `WF-01` | `packContext()` runs | Canvas | node select event | high | TBD |
| `WF-02` | `guideline_digest` prepended to system prompt | Chat UI | prompt submit | high | TBD |
| `WF-03` | `/v1/messages` called — model `{{ai_model}}` | API client | after context pack | high | TBD |
| `WF-04` | Raw MD streamed to `validateMarkdown()` | Validator | on stream complete | high | TBD |
| `WF-05` | V-01–V-07 checks run sequentially | Validator | after stream | high | TBD |
| `WF-06` | On fail: re-prompt with `@flag:correction` injected (≤ 3×) | Chat UI | validation failure | medium | TBD |
| `WF-07` | On pass: `renderCanvas(md)` called | Renderer | validation pass | high | TBD |
| `WF-08` | `flow_nodes` + `flow_edges` upserted | DB | post-render | high | TBD |
| `WF-09` | ReactFlow graph re-renders | Canvas | after DB upsert | high | TBD |

### Data Flow

| # | Data | From | To | Format | Confidence | Status |
|---|---|---|---|---|---|---|
| `DF-01` | node JSONB + edge list | ReactFlow store | `packContext()` | `object[]` | high | TBD |
| `DF-02` | frontmatter variables | YAML store | `packContext()` + `resolveVars()` | `Record<string,string>` | high | TBD |
| `DF-03` | `guideline_digest` | `markdown-syntax-guidelines.md` | system prompt prefix | `string` ≤ 800 tokens | high | TBD |
| `DF-04` | structured context bundle | `packContext()` | Chat UI prompt | `object` | high | TBD |
| `DF-05` | AI raw MD response | `{{ai_model}}` | `validateMarkdown()` | `string` | high | TBD |
| `DF-06` | validation error list | Validator | re-prompt injection | `string[]` | medium | TBD |
| `DF-07` | parsed `flow:` JSONB | `renderCanvas()` | `flow_nodes` / `flow_edges` | JSONB rows | high | TBD |
| `DF-08` | sigil annotation objects | `parseSigil()` | `flow_nodes.data` | `{"text","color","background"}` | high | TBD |
| `DF-09` | resolved MD — `{{}}` replaced | `resolveVars()` | canvas renderer | `string` | high | TBD |

---

## Open Questions

| id | Question | Owner | Due | Status |
|---|---|---|---|---|
| `OQ-01` | Should `guideline_digest` be static (boot-time) or dynamic (per-call)? | `{{owner}}` | TBD | `#D85A30:blocking` |
| `OQ-02` | Max retry count of 3 — should authors configure this per-node? | `{{owner}}` | TBD | medium |
| `OQ-03` | Which validation rule failures warrant hard-stop vs. soft-warn? | `{{owner}}` | TBD | medium |
| `OQ-04` | `compute:` fn sandbox: `vm2`, `quickjs-emscripten`, or iframe? | `{{owner}}` | TBD | `#D85A30:blocking` |