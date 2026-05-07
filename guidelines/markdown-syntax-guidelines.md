---
title: Knowgrph Canvas Demos · Flow Editor (2D) + D3 Editor Mode
graphId: md:markdown-slide-demo
theme: startup
background: /cover.svg
class: text-center
transition: slide-left
layout: cover
aspectRatio: 16/9
lang: en-US
authors:
  - A. HUI Joo Hwee
  - B. airvio
date: "2026-02-23"
updated: "2026-05-05"
media_grid_version: "1.0"
venue: "Singapore"
url: "airvio.co"
subject: "hackathon winners"
action: "durable distribution beyond the weekend"
goal: "a single page to browse winning demos"
solution: "publish a project gallery with winner-marked submissions and links to demos/repos"
mermaid: |
  %%{init: {"theme": "base", "themeVariables": {"primaryColor":"#E1F5EE","primaryTextColor":"#085041","primaryBorderColor":"#1D9E75","lineColor":"#5F5E5A","secondaryColor":"#E6F1FB","tertiaryColor":"#FAEEDA"}}}%%
  flowchart TB
    %% ─────────────────────────────────────────────────
    %% Mermaid shape key used in this diagram:
    %% [ ]       rect          – standard step
    %% ([ ])     stadium       – actor / persona
    %% (( ))     circle        – terminal / event
    %% { }       diamond       – decision
    %% {{ }}     hexagon       – process / transformation
    %% [/ /]     parallelogram – input / output
    %% [( )]     cylinder      – data store / DB
    %% @{shape}  new v11 API   – explicit shape override
    %% ─────────────────────────────────────────────────

    %% ── variable references (resolved from frontmatter) ──
    %% {{subject}}  = hackathon winners
    %% {{action}}   = durable distribution beyond the weekend
    %% {{goal}}     = a single page to browse winning demos
    %% {{solution}} = publish a project gallery with winner-marked submissions and links to demos/repos

    %% ── classDef ──
    classDef persona  fill:#E1F5EE,stroke:#1D9E75,color:#085041,stroke-width:1.5px
    classDef problem  fill:#FBEAF0,stroke:#D4537E,color:#72243E,stroke-width:1.5px
    classDef decision fill:#FAEEDA,stroke:#BA7517,color:#633806,stroke-width:1.5px
    classDef process  fill:#E6F1FB,stroke:#378ADD,color:#0C447C,stroke-width:1.5px
    classDef store    fill:#F1EFE8,stroke:#888780,color:#444441,stroke-width:1px
    classDef output   fill:#EAF3DE,stroke:#639922,color:#27500A,stroke-width:1.5px
    classDef terminal fill:#EEEDFE,stroke:#7F77DD,color:#3C3489,stroke-width:2px

    %% ── Phase 1 · Problem (stadium + diamond) ──
    subgraph S1["Phase 1 · {{subject}} — the problem"]
      direction TB
      S1_Who(["{{subject}}"])
      S1_Pain["need {{action}}"]
      S1_Want["want {{goal}}"]
      S1_Gap{gap exists?}
      S1_Who -->|faces| S1_Pain
      S1_Who -->|seeks| S1_Want
      S1_Pain --> S1_Gap
      S1_Want --> S1_Gap
    end

    %% ── Phase 2 · Signal collection (cylinder + hex) ──
    subgraph S2["Phase 2 · Signal collection"]
      direction TB
      S2_Scrape[/scrape event URLs/]
      S2_Extract{{extract demo metadata}}
      S2_Store[(demo_store JSONB)]
      S2_Dedup{duplicate?}
      S2_Scrape --> S2_Extract
      S2_Extract -->|parse| S2_Store
      S2_Store --> S2_Dedup
      S2_Dedup -->|yes, merge| S2_Store
      S2_Dedup -->|no| S2_Out[ ]
    end

    %% ── Phase 3 · Variable resolution (hex + parallelogram) ──
    subgraph S3["Phase 3 · Variable resolution"]
      direction TB
      S3_FM[/frontmatter keys/]
      S3_Resolve{{"resolveVars()"}}
      S3_MD[/resolved Markdown row/]
      S3_Conf{confidence?}
      S3_FM -->|seed vars| S3_Resolve
      S3_Resolve -->|{{subject}}, {{solution}}| S3_MD
      S3_MD --> S3_Conf
    end

    %% ── Phase 4 · Gallery output (mixed shapes) ──
    subgraph S4["Phase 4 · {{solution}}"]
      direction TB
      S4_Gallery[/project gallery page/]
      S4_Badge@{ shape: tag, label: "winner badge" }
      S4_DemoLink@{ shape: lean-r, label: "demo link" }
      S4_RepoLink@{ shape: lean-r, label: "repo link" }
      S4_Pub((published))
      S4_Gallery --> S4_Badge
      S4_Gallery --> S4_DemoLink
      S4_Gallery --> S4_RepoLink
      S4_Badge --> S4_Pub
      S4_DemoLink --> S4_Pub
      S4_RepoLink --> S4_Pub
    end

    %% ── cross-phase edges ──
    S1_Gap -->|"yes → trigger"| S2_Scrape
    S2_Out -->|pass| S3_FM
    S3_Conf -->|"high → publish"| S4_Gallery
    S3_Conf -->|"low → flag @todo"| S2_Scrape

    %% ── class assignments ──
    class S1_Who persona
    class S1_Pain,S1_Want problem
    class S1_Gap,S2_Dedup,S3_Conf decision
    class S2_Extract,S3_Resolve process
    class S2_Store store
    class S4_Gallery,S4_Badge,S4_DemoLink,S4_RepoLink output
    class S4_Pub terminal

    %% ── click handlers ──
    click S1_Who "#variable--reference-guidelines" "Variable: {{subject}}"
    click S2_Extract "#variable--reference-guidelines" "Variable: {{solution}}"
    click S3_Resolve "#variable--reference-guidelines" "Resolution pipeline"
    click S4_Gallery "#sample-table" "Resolved sample table"
    click S2_Store "#postgresql-json-format" "PostgreSQL JSONB schema"
---

# Markdown Syntax Guidelines

---

## Annotation Guidelines

### Rationale

Native Markdown has no syntax for text color or background highlight.
Custom sigil convention is chosen over HTML `<span>` for three reasons:
token efficiency (~3× smaller per annotation), zero XSS/sanitizer risk,
and direct parse-to-JSONB portability with no intermediate transformation.

### Sigil syntax

| Pattern | Meaning | Example |
|---|---|---|
| `` `#HEX:text` `` | text color | `` `#D85A30:urgent` `` |
| `` `bg#HEX:text` `` | background highlight | `` `bg#E1F5EE:note` `` |
| `` `#HEX\|bg#HEX:text` `` | text color + background | `` `#185FA5\|bg#E6F1FB:info` `` |
| `==text==` | default highlight (no color data) | `==review this==` |

### Rules

- Sigil is **opt-in per token** — plain prose cells are never wrapped
- HEX must be 6-digit: `#D85A30` not `#d85` or `#D85A3000`
- `text` after `:` is prose — never split on `,` or `;`
- Sigil and `==highlight==` compose: `==` `` `#D85A30:urgent` `` `==`
- In multi-select arrays, sigil wraps the cell prose, not array items — `` `#D85A30:["A","B"]` `` is invalid

### Token cost comparison

| Format | Characters | Approx tokens |
|---|---|---|
| `<span style="color:#D85A30">urgent</span>` | 44 | ~14 |
| `` `#D85A30:urgent` `` | 17 | ~5 |
| `<span style="background:#E1F5EE;color:#185FA5">note</span>` | 58 | ~18 |
| `` `#185FA5\|bg#E1F5EE:note` `` | 23 | ~7 |

### Parse function

```js
function parseSigil(cell) {
  const s = cell.replace(/^`|`$/g, '');
  const m = s.match(/^(#[0-9a-fA-F]{6})?(\|?bg#[0-9a-fA-F]{6})?:(.+)$/);
  if (!m) return { text: s, color: null, background: null };
  return {
    text:       m[3],
    color:      m[1] ?? null,
    background: m[2]?.replace('|bg#', '#').replace('bg#', '#') ?? null,
  };
}
```

### PostgreSQL JSONB mapping

| Markdown sigil | JSON type | JSONB shape |
|---|---|---|
| `` `#D85A30:urgent` `` | `object` | `{"text":"urgent","color":"#D85A30","background":null}` |
| `` `bg#E1F5EE:note` `` | `object` | `{"text":"note","color":null,"background":"#E1F5EE"}` |
| `` `#185FA5\|bg#E6F1FB:info` `` | `object` | `{"text":"info","color":"#185FA5","background":"#E6F1FB"}` |
| `==review this==` | `string` | `"review this"` — no color data; store as plain string |
| plain prose | `string` | stored as-is; no sigil object wrapping |

```sql
ALTER TABLE hackathon_demos ADD COLUMN pain_point_rich JSONB;

UPDATE hackathon_demos SET pain_point_rich =
  '{"text":"urgent","color":"#D85A30","background":null}'::jsonb
WHERE id = 'demo-015';

SELECT * FROM hackathon_demos
WHERE pain_point_rich->>'color' = '#D85A30';
```

### Sample — sigil in table cell

Pain point and solution from the shared sample, with annotation sigils applied:

| id | Pain Point | Solution | Confidence |
|---|---|---|---|
| `demo-015` | `` `#D85A30:urgent` `` hackathon winners need durable distribution beyond the weekend; builders want a single page to browse winning demos | `` `bg#E1F5EE:proposed` `` publish a project gallery with winner-marked submissions and links to demos/repos | `high` |

---

## Variable / Reference Guidelines

### Rationale

`{{variable}}` is the industry-standard template interpolation syntax (Handlebars, Mustache, Jinja2, Liquid, GitHub Actions). 
It signals "this is a placeholder" to both humans and machines, is mobile-friendly, and passes through Markdown renderers as literal text — always readable as a fallback.

**Floating variable toolbar:** type `@` anywhere in the document to invoke a floating CRUD toolbar for creating, reading, updating, and deleting `{{variable}}` declarations. 
The toolbar is the single management surface for all variables — no need to hunt for `{{key:value}}` declarations scattered across the document.

**Mermaid scope rule:** `{{}}` inside a fenced `mermaid` block retains its Mermaid meaning (hexagon node shape). `{{}}` outside Mermaid blocks is exclusively the variable/reference sigil. 
The two contexts are mutually exclusive by block boundary and never overlap.

**YAML frontmatter harmonisation:** `{{key}}` in body prose resolves from frontmatter keys first. 
A `{{subject}}` reference resolves from `subject: "hackathon winners"` in the YAML frontmatter — no separate inline declaration needed when the key already exists in frontmatter.

### Syntax

| Pattern | Meaning | Example |
|---|---|---|
| `{{key}}` | reference a frontmatter key or prior declaration | `{{subject}}` → `hackathon winners` |
| `{{key:value}}` | declare inline + use (first occurrence = definition) | `{{subject:hackathon winners}}` |
| `{{key\|fallback}}` | reference with fallback if key undeclared | `{{subject\|builders}}` |

### Scope precedence (resolution order)

1. YAML frontmatter keys (highest priority — managed via `@` toolbar)
2. Inline `{{key:value}}` declarations (first occurrence wins)
3. `{{key|fallback}}` fallback value
4. Unresolved — render as literal `{{key}}`

### Floating variable toolbar (`@`)

Type `@` to open the toolbar. Operations available:

| Operation | Toolbar action | Effect |
|---|---|---|
| Create | `@ → New variable` | adds `key: value` to frontmatter |
| Read | `@ → Browse` | lists all declared `{{key}}` and their resolved values |
| Update | `@ → Edit key` | updates frontmatter value; all `{{key}}` references resolve to new value |
| Delete | `@ → Delete key` | removes frontmatter key; orphaned `{{key}}` render as literal fallback |

All `{{variable}}` CRUD is centralised in frontmatter. 
Inline `{{key:value}}` declarations are write-once shortcuts — use the `@` toolbar to manage them after first declaration.

### YAML frontmatter → `{{}}` mapping

Frontmatter (shared sample keys already declared at top of this document):

```yaml
---
subject: "hackathon winners"
action: "durable distribution beyond the weekend"
goal: "a single page to browse winning demos"
solution: "publish a project gallery with winner-marked submissions and links to demos/repos"
---
```

Body prose using references:

```
{{subject}} need {{action}}; builders want {{goal}}.
{{solution}}.
```

Resolved:

```
hackathon winners need durable distribution beyond the weekend; builders want a single page to browse winning demos.
publish a project gallery with winner-marked submissions and links to demos/repos.
```

### Sample — variable in table cell

Table referencing frontmatter keys — one declaration, reused across all rows that share the same pain point and solution:

| id | Pain Point | Solution |
|---|---|---|
| `demo-015` | `{{subject}}` need `{{action}}`; builders want `{{goal}}` | `{{solution}}` |

Resolved row:

| id | Pain Point | Solution |
|---|---|---|
| `demo-015` | hackathon winners need durable distribution beyond the weekend; builders want a single page to browse winning demos | publish a project gallery with winner-marked submissions and links to demos/repos |

### Annotation + variable composition

Sigil and `{{}}` compose inline — color/highlight wraps the resolved value:

```
`#D85A30:{{subject}}` need `{{action}}`; builders want `{{goal}}`
```

Resolved + annotated:

```
`#D85A30:hackathon winners` need durable distribution beyond the weekend; builders want a single page to browse winning demos
```

### Mermaid compatibility

Inside a `mermaid` fenced block, `{{}}` is Mermaid hex-node syntax.
Never use as variable reference inside Mermaid.

```
```mermaid
flowchart TB
  S2_Model{{Feature Extract}}   %% Mermaid hex shape — NOT a variable
```
```

Outside Mermaid, `{{Feature Extract}}` resolves as a variable reference.

### PostgreSQL JSONB mapping

| Markdown pattern | JSONB shape | Source |
|---|---|---|
| `{{subject}}` | `{"op":"ref","key":"subject","value":"hackathon winners"}` | frontmatter |
| `{{subject:hackathon winners}}` | `{"op":"def","key":"subject","value":"hackathon winners"}` | inline |
| `{{subject}}` (subsequent) | `{"op":"ref","key":"subject","value":"hackathon winners"}` | prior def |
| `{{subject\|builders}}` | `{"op":"ref","key":"subject","fallback":"builders","value":null}` | fallback |

```sql
CREATE TABLE md_variables (
  doc_id  TEXT,
  key     TEXT,
  value   TEXT,
  source  TEXT CHECK (source IN ('frontmatter','inline','fallback')),
  PRIMARY KEY (doc_id, key)
);

-- resolve {{subject}} in a document
SELECT value FROM md_variables
WHERE doc_id = 'hackamap-demos' AND key = 'subject';
```

### Resolution pipeline

```js
function resolveVars(mdText, frontmatter = {}) {
  const vars = { ...frontmatter };          // frontmatter seeded first
  const seen = new Set(Object.keys(frontmatter));

  // pass 1 — collect inline declarations
  mdText.replace(/{{(\w[\w.]*):([^}|]+)}}/g, (_, key, value) => {
    if (!seen.has(key)) { vars[key] = value; seen.add(key); }
  });

  // pass 2 — resolve all references
  return mdText.replace(/{{(\w[\w.]*)(?::([^}|]*))?(?:\|([^}]*))?}}/g,
    (_, key, _declared, fallback) =>
      vars[key] ?? (fallback ? vars[fallback] ?? fallback : `{{${key}}}`)
  );
}
```

---

## Multi-dimensional Table Guidelines

### Shared cell conventions

| Convention | Symbol | Parse rule | Example |
|---|---|---|---|
| Multi-select array | `` `["A","B"]` `` | JSON.parse after stripping backticks | `` `["devpost","project-gallery"]` `` |
| Prose scalar | plain text | never split on `,` or `;` | hackathon winners need durable distribution beyond the weekend |
| Variable reference | `{{key}}` | resolve from frontmatter or prior `{{key:value}}` | `{{subject}}` → `hackathon winners` |
| Annotation sigil | `` `#HEX:text` `` | parse color + text; never split | `` `#D85A30:urgent` `` |
| Empty / unknown | `TBD` | omit node; do not render | TBD |
| Null / not applicable | `—` | omit node; do not render | — |
| Date scalar | `YYYY-MM-DD` | ISO 8601; two columns for range | 2026-04-04 |
| Confidence | `low` / `medium` / `high` | maps to dashed / partial / solid stroke | high |

### Sample table

Frontmatter variables (`{{subject}}`, `{{action}}`, `{{goal}}`, `{{solution}}`)
declared at document top; resolved at render time.

| id | event_id | Pain Point | Solution | Product | Team | Tech Stack | Demo URL | Repo URL | Video URL | Award | Source Type | Confidence | Extracted At |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `demo-015` | `evt-014` | `{{subject}}` need `{{action}}`; builders want `{{goal}}` | `{{solution}}` | `["winner project gallery","demo pages"]` | `["TreeHacks organizers","TreeHacks 2026 participants"]` | `["Devpost"]` | https://treehacks-2026.devpost.com/project-gallery | — | — | — | `["devpost","project-gallery","winners"]` | high | 2026-04-04 |

Resolved row (after `resolveVars()`):

| id | event_id | Pain Point | Solution | Product | Team | Tech Stack | Demo URL | Repo URL | Video URL | Award | Source Type | Confidence | Extracted At |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `demo-015` | `evt-014` | hackathon winners need durable distribution beyond the weekend; builders want a single page to browse winning demos | publish a project gallery with winner-marked submissions and links to demos/repos | `["winner project gallery","demo pages"]` | `["TreeHacks organizers","TreeHacks 2026 participants"]` | `["Devpost"]` | https://treehacks-2026.devpost.com/project-gallery | — | — | — | `["devpost","project-gallery","winners"]` | high | 2026-04-04 |

### PostgreSQL JSON format

```json
{
  "id": "demo-015",
  "event_id": "evt-014",
  "pain_point": "hackathon winners need durable distribution beyond the weekend; builders want a single page to browse winning demos",
  "solution": "publish a project gallery with winner-marked submissions and links to demos/repos",
  "product": ["winner project gallery", "demo pages"],
  "team": ["TreeHacks organizers", "TreeHacks 2026 participants"],
  "tech_stack": ["Devpost"],
  "demo_url": "https://treehacks-2026.devpost.com/project-gallery",
  "repo_url": null,
  "video_url": null,
  "award": null,
  "source_type": ["devpost", "project-gallery", "winners"],
  "confidence": "high",
  "extracted_at": "2026-04-04"
}
```

### Markdown → JSON mapping rules

| Markdown cell | JSON type | Rule |
|---|---|---|
| plain prose | `string` | prose scalar — never split |
| `{{key}}` | `string` | resolve variable before JSON serialisation |
| `` `["A","B"]` `` | `string[]` | JSON.parse after stripping backticks |
| `` `#HEX:text` `` | `object` | `{"text":"...","color":"#HEX","background":null}` |
| `—` | `null` | null / not applicable |
| `TBD` | `null` | empty / unknown |
| `YYYY-MM-DD` | `string` | ISO 8601; cast to `DATE` on Postgres insert |
| bare URL | `string` | scalar — no backtick wrapper needed |
| `low` / `medium` / `high` | `string` | enum; `CHECK` constraint on Postgres |

### PostgreSQL insert

```sql
INSERT INTO hackathon_demos (
  id, event_id, pain_point, solution,
  product, team, tech_stack,
  demo_url, repo_url, video_url, award,
  source_type, confidence, extracted_at
) VALUES (
  'demo-015', 'evt-014',
  'hackathon winners need durable distribution beyond the weekend; builders want a single page to browse winning demos',
  'publish a project gallery with winner-marked submissions and links to demos/repos',
  '["winner project gallery","demo pages"]'::jsonb,
  '["TreeHacks organizers","TreeHacks 2026 participants"]'::jsonb,
  '["Devpost"]'::jsonb,
  'https://treehacks-2026.devpost.com/project-gallery',
  null, null, null,
  '["devpost","project-gallery","winners"]'::jsonb,
  'high',
  '2026-04-04'::date
);
```

---

## Flow Graph / Workflow Editor Guidelines

### Rationale

The knowledge graph canvas supports a ReactFlow-style workflow editor mode alongside the static Mermaid diagram. 
In workflow editor mode the graph is interactive and computable: 
nodes have typed input/output handles, 
edges carry live data, and 
node state is computed from upstream values — exactly as in https://reactflow.dev/learn/advanced-use/computing-flows.

Markdown is the authoring format. 
The canvas renderer reads the frontmatter `flow:` block and body `@node` / `@edge` sigils and hydrates a ReactFlow graph.

### Concept map — Mermaid vs. Flow Editor

| Concept | Mermaid (static) | Flow editor (interactive) |
|---|---|---|
| Node | `n_id["label"]` | `@node:id` with `handles:` and `data:` |
| Edge | `n_a --> n_b` | `@edge:source:handle→target:handle` |
| Node type | `classDef` shape | `type:` field (`input`/`default`/`output`/`custom`) |
| Computed value | none | `compute:` function on node |
| Live data | none | `data:` JSONB on node; updated on upstream change |
| Subgraph | `subgraph` | `@cluster:id` → ReactFlow `<Panel>` or grouping node |
| Click | `click` handler | `onNodeClick` → AI Chat UI scoped to node |

### Frontmatter — `flow:` block

Declared in YAML frontmatter alongside `mermaid:`. 
The canvas renderer uses `flow:` for the interactive editor and `mermaid:` for the static diagram view.
Both represent the same graph — authors write one; the canvas maintains sync.

```yaml
---
flow:
  direction: LR          # LR | TB | RL | BT
  edgeType: smoothstep   # default | straight | step | smoothstep | bezier
  snapToGrid: true
  gridSize: 20
  computed: true         # enable computing flows (upstream → downstream)
  nodes:
    - id: n-scrape
      type: input
      label: scrape event URLs
      position: { x: 0, y: 0 }
      handles:
        source: [urls]
      data:
        url: "{{demo_url}}"
        confidence: high

    - id: n-extract
      type: default
      label: "{{solution}}"
      position: { x: 220, y: 0 }
      handles:
        target: [urls]
        source: [demos]
      compute: |
        (inputs) => ({
          demos: inputs.urls.map(u => ({ url: u, extracted: true }))
        })
      data: {}

    - id: n-gallery
      type: output
      label: project gallery
      position: { x: 440, y: 0 }
      handles:
        target: [demos]
      data:
        winner_badge: true
        demo_link: "{{demo_url}}"
        repo_link: TBD

  edges:
    - id: e-scrape-extract
      source: n-scrape
      sourceHandle: urls
      target: n-extract
      targetHandle: urls
      label: scrape → extract
      animated: true

    - id: e-extract-gallery
      source: n-extract
      sourceHandle: demos
      target: n-gallery
      targetHandle: demos
      label: "{{subject}} → gallery"
      animated: true
---
```

### Node type conventions

| `type` | ReactFlow equivalent | Use for | Handle rule |
|---|---|---|---|
| `input` | `<InputNode>` | data source; no upstream | source handles only |
| `default` | `<DefaultNode>` | transform / compute step | both target + source handles |
| `output` | `<OutputNode>` | terminal / sink | target handles only |
| `custom` | `<CustomNode>` | AI Chat UI; score display; alert | any handle config |
| `custom` + `mediaType:` | `<MediaNode>` | image / video / audio / iframe / code / model block; declared via `<!-- media -->` comment marker | `media` source handle only; see Rich Media Grid Guidelines |

### Handle naming convention

Handles are named by the data type they carry, using the same `snake_case`
as PostgreSQL column names. This makes the handle-to-JSONB mapping direct.

| Handle name | Data type | PostgreSQL column |
|---|---|---|
| `urls` | `string[]` | `url JSONB` |
| `demos` | `object[]` | `metadata JSONB` |
| `score` | `float` | `confidence FLOAT` |
| `winners` | `object[]` | `award TEXT` |
| `signal` | `boolean` | — (ephemeral) |
| `media` | `object` | `data JSONB` — typed media node; see Rich Media Grid Guidelines |

### `compute:` function

Each `default` node may declare a `compute:` inline function. The canvas
evaluates it whenever upstream handle data changes — exactly as ReactFlow's
computing flows pattern.

```yaml
compute: |
  (inputs) => ({
    demos: inputs.urls
      .filter(u => u.confidence === 'high')
      .map(u => ({
        url:          u.url,
        winner_badge: true,
        demo_link:    u.url,
        repo_link:    null
      }))
  })
```

Rules:
- `inputs` is a map of `handleName → value` from all connected upstream edges
- return value is a map of `handleName → value` pushed to all connected downstream edges
- `TBD` inputs are treated as `null`; node shows a `@flag:waiting` state
- `compute:` is pure — no side effects; no fetch; no mutation of other nodes

### Edge sigil (body prose)

Edges declared in the `flow:` block are the canonical source of truth.
Body prose may reference them with the `@edge` sigil for inline annotation:

```
`@edge:n-scrape:urls→n-extract:urls` carries raw scraped URLs to the extract step.
`@edge:n-extract:demos→n-gallery:demos` delivers `{{subject}}`-tagged demos to the gallery.
```

Sigil format: `` `@edge:sourceId:sourceHandle→targetId:targetHandle` ``

### Annotation on flow nodes

Color sigils and `@` annotation sigils apply to node `label` and `data` fields:

```yaml
- id: n-extract
  label: "`#D85A30:urgent` {{solution}}"
  data:
    note: "`@flag:low confidence source; verify before publish`"
```

Resolved in the canvas as a colored node label + flag badge on the node card.

### Variable references in `flow:` block

All `{{key}}` references in the `flow:` block resolve from frontmatter before the canvas renders. 
This means node labels, edge labels, handle data, and
`compute:` function strings are all variable-aware.

```yaml
- id: n-gallery
  label: "{{solution}}"           # resolves to: publish a project gallery...
  data:
    subject: "{{subject}}"        # resolves to: hackathon winners
    goal:    "{{goal}}"           # resolves to: a single page to browse winning demos
```

### PostgreSQL JSONB mapping — flow nodes and edges

Flow nodes and edges are stored as JSONB rows, mirroring the `hackamap-demos` schema. 
The `data:` field maps directly to `metadata JSONB`.

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

### Sample — full flow for the shared sample

The sample models the exact pipeline:
`{{subject}}` need `{{action}}`; builders want `{{goal}}`.
`{{solution}}`.

```yaml
flow:
  direction: LR
  edgeType: smoothstep
  computed: true
  nodes:
    - id: n-winners
      type: input
      label: "{{subject}}"
      position: { x: 0, y: 80 }
      handles:
        source: [signal]
      data:
        pain: "need {{action}}"
        goal: "{{goal}}"

    - id: n-scrape
      type: default
      label: scrape demo URLs
      position: { x: 220, y: 0 }
      handles:
        target: [signal]
        source: [urls]
      compute: |
        (inputs) => ({ urls: inputs.signal ? ["https://treehacks-2026.devpost.com/project-gallery"] : [] })

    - id: n-extract
      type: default
      label: extract + tag demos
      position: { x: 440, y: 0 }
      handles:
        target: [urls]
        source: [demos]
      compute: |
        (inputs) => ({
          demos: inputs.urls.map(u => ({
            url: u, winner_badge: true, confidence: 'high'
          }))
        })

    - id: n-gallery
      type: output
      label: "{{solution}}"
      position: { x: 660, y: 80 }
      handles:
        target: [demos]
      data:
        subject:  "{{subject}}"
        goal:     "{{goal}}"
        demo_url: "https://treehacks-2026.devpost.com/project-gallery"
        repo_url: TBD

  edges:
    - { id: e1, source: n-winners, sourceHandle: signal, target: n-scrape,  targetHandle: signal, animated: true }
    - { id: e2, source: n-scrape,  sourceHandle: urls,   target: n-extract, targetHandle: urls,   animated: true }
    - { id: e3, source: n-extract, sourceHandle: demos,  target: n-gallery, targetHandle: demos,  animated: true, label: "winner-marked demos" }
```

### Shared cell conventions — additions for flow editor

| Convention | Symbol | Parse rule | Example |
|---|---|---|---|
| Node reference | `` `@node:id` `` | resolve to flow node by `id` | `` `@node:n-gallery` `` |
| Edge reference | `` `@edge:src:h→tgt:h` `` | resolve to flow edge | `` `@edge:n-scrape:urls→n-extract:urls` `` |
| Computed value | `compute: \|` YAML block | pure fn; inputs → outputs map | see `compute:` above |
| Handle | `handleName` in `handles:` | `snake_case`; matches PG column | `urls`, `demos`, `score` |
| Node type | `input` / `default` / `output` / `custom` | ReactFlow node type | `type: output` |
| Media node reference | `` `@node:m-{id}` `` | resolve to single media node by `id`; `m-` prefix convention | `` `@node:m-gallery-output` `` |
| Media row container reference | `` `@node:mr-{id}` `` | resolve to `media-row` container node; `mr-` prefix convention | `` `@node:mr-phase1-compare` `` |
| Edge from media node | `` `@edge:m-{id}:media→n-{id}:{handle}` `` | edge from `media` source handle to downstream node | `` `@edge:m-gallery-output:media→n-extract:demos` `` |


---

## Rich Media Grid Guidelines

### Rationale

Native Markdown supports only `![]()` image syntax. 
All other media types — video, audio, iframe embeds, code playgrounds — require raw HTML, which breaks JSONB portability and introduces XSS surface. 
The KGC comment-marker convention is extended here to cover all rich media types using the same `<!-- key: value | … -->` pipe-delimited pattern already established for annotation sigils and variable references. 
No new fence syntax is introduced; blank-line separation remains the node boundary convention.

Three design goals drive every rule in this section:

1. **Token efficiency** — comment markers are ~3–5× smaller than equivalent HTML wrappers
2. **JSONB portability** — every media block maps to a single typed `data:` JSONB object with no intermediate transformation
3. **Graceful fallback** — non-canvas Markdown renderers see either a valid `![]()` image, a bare URL, or descriptive prose; never broken HTML

### Media type taxonomy

| `type` | Markdown surface | Canvas node | Fallback (non-canvas) |
|---|---|---|---|
| `image` | `![]()` | `<ImageNode>` | native `<img>` |
| `video` | bare URL or `![]()` | `<VideoNode>` | bare URL as link |
| `audio` | bare URL | `<AudioNode>` | bare URL as link |
| `iframe` | bare URL | `<IframeNode>` | bare URL as link |
| `code` | fenced code block | `<CodeNode>` | standard fenced block |
| `model` | bare URL (`.glb`/`.gltf`) | `<ModelNode>` | bare URL as link |

`type` is inferred from file extension or URL pattern when not declared explicitly in the comment marker. Explicit declaration always wins.

### Comment marker syntax

All media comment markers follow the same pipe-delimited pattern used throughout this document:

```
<!-- media | type: TYPE | key: value | key: value -->
```

The `type:` key is the only required key for non-image media. 
All other keys are optional and order-independent. 
Unknown keys are silently ignored (forward-compatible).

**Key reference — all media types**

| Key | Required | Type | Notes |
|---|---|---|---|
| `type` | yes (non-image) | `image` / `video` / `audio` / `iframe` / `code` / `model` | inferred from extension if omitted |
| `alt` | yes (informational) | prose string | canvas node `label`; overrides `![]` bracket text |
| `caption` | no | prose string or `{{key}}` | rendered below media in canvas |
| `src` | no | URL or path | overrides the URL/path on the line below; use for programmatic generation |
| `aspect` | no | `16/9` / `4/3` / `1/1` / `9/16` | default `16/9` for video/iframe; `auto` for image |
| `autoplay` | no | `true` / `false` | video/audio only; default `false` |
| `loop` | no | `true` / `false` | video/audio only; default `false` |
| `muted` | no | `true` / `false` | video only; default `true` when `autoplay: true` |
| `controls` | no | `true` / `false` | video/audio only; default `true` |
| `poster` | no | URL or path | video only; thumbnail before play |
| `sandbox` | no | space-separated token list | iframe only; default `allow-scripts allow-same-origin` |
| `allow` | no | feature-policy string | iframe only; e.g. `fullscreen; autoplay` |
| `lang` | no | language identifier | `code` type only; e.g. `python`, `ts` |
| `flag` | no | `@flag:value` | forwarded to node `data.flag`; parsed as `@flag` sigil |
| `ref` | no | `{{key}}` | resolves variable as `caption` or `alt` source |
| `confidence` | no | `low` / `medium` / `high` | maps to dashed / partial / solid node stroke; default `high` |

**Rules**

- Comment marker must appear on the line **immediately preceding** its media URL or `![]()` line. No blank line between marker and media.
- Pipe characters (`|`) are the key separator inside comment markers — never use `|` inside key values. Use an em-dash (`—`) instead.
- `alt:` in the comment marker takes precedence over `![]` bracket text. Keep `![]` text as a non-canvas prose fallback.
- `{{key}}` in any value resolves from frontmatter following the standard resolution order: frontmatter → inline declaration → fallback → literal.
- Annotation sigil (`` `#HEX:text` ``) is **not valid inside `![]` brackets** — alt text is plain prose only. Apply sigil in the comment marker `alt:` value if color annotation on the node label is needed.
- `alt:` values must not contain pipe characters; em-dash (`—`) is the preferred separator.

### Row-by-row layout (default)

One blank line between media blocks. Each block is an independent canvas node.
The canvas renderer never infers adjacency across blank lines.

**Syntax**

```markdown
<!-- media | type: image | alt: Scrape pipeline overview — Phase 1 | caption: Phase 1 signal collection -->
![Scrape pipeline overview — Phase 1](./assets/scrape-pipeline.png)

<!-- media | type: video | alt: {{subject}} demo walkthrough | aspect: 16/9 | controls: true -->
https://demo.airvio.co/assets/treehacks-2026-walkthrough.mp4

<!-- media | type: iframe | alt: Live project gallery — devpost.com | aspect: 16/9 | sandbox: allow-scripts allow-same-origin | caption: {{solution}} -->
https://treehacks-2026.devpost.com/project-gallery

<!-- media | type: audio | alt: Founder pitch audio — {{subject}} | controls: true -->
https://demo.airvio.co/assets/pitch-audio.mp3
```

Each block resolves to a single typed node in `flow_nodes`. Blank-line separation = node boundary.

### Side-by-side layout (opt-in)

`<!-- media-row -->` / `<!-- /media-row -->` is the only syntax that collapses adjacent media blocks into a single row node. 
Without this wrapper, two media lines separated only by a newline (no blank line) are still treated as independent nodes by the canvas renderer.

**No blank lines** are permitted inside a `media-row` wrapper — blank lines break node boundary detection.

**Syntax**

```markdown
<!-- media-row | cols: 2 | gap: md -->
<!-- media | type: image | alt: Before — raw demo list -->
![Before — raw demo list](./assets/before.png)
<!-- media | type: image | alt: After — winner-marked gallery -->
![After — winner-marked gallery](./assets/gallery-output.png)
<!-- /media-row -->
```

**`media-row` container keys**

| Key | Required | Values | Notes |
|---|---|---|---|
| `cols` | yes | `2` / `3` / `4` | column count; all children share equal width |
| `gap` | no | `sm` / `md` / `lg` | gutter between cells; default `md` |
| `align` | no | `start` / `center` / `end` | vertical alignment of cells; default `start` |
| `caption` | no | prose string or `{{key}}` | row-level caption rendered below the container |
| `flag` | no | `@flag:value` | forwarded to row node `data.flag` |

Mixed media types are permitted inside a row: 
an image and a video may share one `<!-- media-row -->` container. 
Each child retains its own `type:` and child-level keys.

### Side-by-side vs. row-by-row — decision table

| Criterion | Row-by-row | Side-by-side |
|---|---|---|
| Canvas node type | one typed node per media block | one `media-row` container node wrapping N children |
| `@node` sigil reference | `` `@node:m-{id}` `` per block | `` `@node:mr-{id}` `` references the row container |
| JSONB `type` | `image` / `video` / `audio` / `iframe` / `code` / `model` | `media-row` |
| Blank-line requirement | one blank line between blocks | **no** blank lines inside `<!-- media-row -->…<!-- /media-row -->` |
| Viewport behaviour | full-width; canvas reflows per breakpoint | fixed `cols` count; horizontal overflow on narrow viewports |
| Token cost | lower — no wrapper markers | slightly higher — open/close container tags |
| Handle wiring | each node wires independently | row node exposes a single `media` source handle |
| Recommended for | **all default authoring** | explicit comparison layouts only: before/after, A/B, multi-angle |

**Default: row-by-row.** Use side-by-side only when the spatial comparison between items is the primary semantic content (e.g., before/after renders, A/B design variants, multi-camera video).

### Alt-text convention

Alt text is the primary semantic label of a media node. 
It maps to the canvas node `label` field and to `metadata.alt` in JSONB. 
The same convention applies to all media types — not only images.

| Context | Convention | Example |
|---|---|---|
| Diagram / screenshot | `[noun phrase] — [context]` | `Scrape pipeline overview — Phase 1` |
| Chart / data visual | `[chart type]: [metric] [period]` | `Bar chart: gap scores Q1 2026` |
| Video walkthrough | `[subject] demo walkthrough — [event]` | `{{subject}} demo walkthrough — TreeHacks 2026` |
| Audio clip | `[speaker/type] [topic]` | `Founder pitch audio — {{subject}}` |
| Iframe embed | `[page title] — [domain]` | `Live project gallery — devpost.com` |
| 3-D model | `[object name] [format]` | `Orbital gap mesh — GLB` |
| Logo / icon | `[brand/project] logo` | `airvio logo` |
| Decorative | empty string `""` | `alt: ""` — omit from canvas node label |
| Variable-resolved | `{{key}}` in alt | `alt: {{subject}} demo screenshot` |

**Rules**

- Alt text is **never empty for informational media** — empty alt is reserved for
  decorative-only assets that carry no semantic content (`decorative: true` in JSONB).
- `{{key}}` in `alt:` resolves from frontmatter before canvas render, following the
  standard resolution order.
- Annotation sigil is **not valid in `![]` brackets** — plain prose only in `![]`.
  Apply `` `#HEX:text` `` in the comment marker `alt:` key if colored node labels
  are required.
- `alt:` may not contain `|` (pipe) — use em-dash `—` as internal separator.

### Annotation sigil on media nodes

Color sigils and `@flag` annotation sigils apply to media node `label` and `data` fields in the same way as for flow nodes:

```yaml
- id: m-scrape-pipeline
  label: "`#D85A30:urgent` Scrape pipeline overview — Phase 1"
  data:
    note: "`@flag:low confidence source; verify before publish`"
```

In body prose, the same sigil applies via the comment marker `alt:` key:

```markdown
<!-- media | type: image | alt: `#D85A30:urgent` Scrape pipeline overview — Phase 1 | flag: @flag:verify -->
![Scrape pipeline overview — Phase 1](./assets/scrape-pipeline.png)
```

### Variable references in media comment markers

All `{{key}}` references in comment marker values resolve from frontmatter before canvas render — identical to the resolution pipeline for body prose and `flow:` nodes.

```markdown
<!-- media | type: video | alt: {{subject}} demo walkthrough | caption: {{solution}} -->
https://demo.airvio.co/assets/treehacks-2026-walkthrough.mp4
```

Resolved (using shared sample frontmatter):

```
alt:     hackathon winners demo walkthrough
caption: publish a project gallery with winner-marked submissions and links to demos/repos
```

### `flow:` block — media nodes in frontmatter

Media nodes are declared in the `flow:` block using `type: custom` with a `mediaType:` sub-key in `data:`. 
This mirrors the existing `custom` node convention and keeps the `flow:` schema backward-compatible.

```yaml
flow:
  direction: LR
  edgeType: smoothstep
  computed: true
  nodes:
    - id: m-scrape-pipeline
      type: custom
      label: "Scrape pipeline overview — Phase 1"
      position: { x: 0, y: 160 }
      handles:
        source: [media]
      data:
        mediaType: image
        src: ./assets/scrape-pipeline.png
        alt: "Scrape pipeline overview — Phase 1"
        caption: "Phase 1 signal collection"
        confidence: high

    - id: m-demo-walkthrough
      type: custom
      label: "{{subject}} demo walkthrough — TreeHacks 2026"
      position: { x: 0, y: 320 }
      handles:
        source: [media]
      data:
        mediaType: video
        src: https://demo.airvio.co/assets/treehacks-2026-walkthrough.mp4
        alt: "{{subject}} demo walkthrough — TreeHacks 2026"
        aspect: "16/9"
        controls: true
        autoplay: false
        muted: true
        confidence: high

    - id: m-gallery-iframe
      type: custom
      label: "Live project gallery — devpost.com"
      position: { x: 0, y: 480 }
      handles:
        source: [media]
      data:
        mediaType: iframe
        src: https://treehacks-2026.devpost.com/project-gallery
        alt: "Live project gallery — devpost.com"
        aspect: "16/9"
        sandbox: "allow-scripts allow-same-origin"
        confidence: high

    - id: mr-phase1-compare
      type: custom
      label: "Phase 1 before / after comparison"
      position: { x: 0, y: 640 }
      handles:
        source: [media]
      data:
        mediaType: media-row
        cols: 2
        gap: md
        caption: "{{subject}} — before and after"
        items:
          - alt: "Before — raw demo list"
            src: ./assets/before.png
          - alt: "After — winner-marked gallery"
            src: ./assets/gallery-output.png
        confidence: high
```

### Parse function

Extends the existing `parseSigil()` pattern; both functions coexist without overlap.

```js
function parseMediaMarker(commentText) {
  // strip <!-- and -->
  const inner = commentText.replace(/^<!--\s*/, '').replace(/\s*-->$/, '');
  const parts  = inner.split('|').map(s => s.trim());

  // first token is the block type keyword: 'media' or 'media-row'
  const blockType = parts[0]; // 'media' | 'media-row'

  const meta = { blockType };
  for (const part of parts.slice(1)) {
    const colonIdx = part.indexOf(':');
    if (colonIdx === -1) continue;
    const key   = part.slice(0, colonIdx).trim();
    const value = part.slice(colonIdx + 1).trim();
    meta[key] = value;
  }

  // coerce boolean strings
  for (const k of ['autoplay', 'loop', 'muted', 'controls']) {
    if (meta[k] !== undefined) meta[k] = meta[k] === 'true';
  }

  // coerce numeric strings
  if (meta.cols !== undefined) meta.cols = parseInt(meta.cols, 10);

  return meta;
}
```

**Usage example**

```js
parseMediaMarker(
  '<!-- media | type: video | alt: hackathon winners demo walkthrough | aspect: 16/9 | controls: true | autoplay: false -->'
);
// →
// {
//   blockType: 'media',
//   type:      'video',
//   alt:       'hackathon winners demo walkthrough',
//   aspect:    '16/9',
//   controls:  true,
//   autoplay:  false
// }
```

### PostgreSQL JSONB mapping

| Media syntax | JSONB `type` | JSONB shape |
|---|---|---|
| Row-by-row image | `image` | `{"type":"image","alt":"...","src":"...","caption":null,"flag":null,"confidence":"high"}` |
| Row-by-row video | `video` | `{"type":"video","alt":"...","src":"...","aspect":"16/9","controls":true,"autoplay":false,"muted":true,"poster":null,"confidence":"high"}` |
| Row-by-row audio | `audio` | `{"type":"audio","alt":"...","src":"...","controls":true,"autoplay":false,"loop":false,"confidence":"high"}` |
| Row-by-row iframe | `iframe` | `{"type":"iframe","alt":"...","src":"...","aspect":"16/9","sandbox":"allow-scripts allow-same-origin","allow":null,"confidence":"high"}` |
| Row-by-row code | `code` | `{"type":"code","alt":"...","lang":"python","src":null,"confidence":"high"}` |
| Row-by-row model | `model` | `{"type":"model","alt":"...","src":"...","confidence":"high"}` |
| Side-by-side container | `media-row` | `{"type":"media-row","cols":2,"gap":"md","caption":"...","items":[{"type":"image","alt":"...","src":"..."},{"type":"image","alt":"...","src":"..."}],"confidence":"high"}` |
| Decorative image | `image` | `{"type":"image","alt":"","src":"...","decorative":true}` |

```sql
CREATE TABLE media_nodes (
  id           TEXT PRIMARY KEY,
  doc_id       TEXT,
  media_type   TEXT CHECK (media_type IN (
                 'image','video','audio','iframe','code','model','media-row'
               )),
  label        TEXT,                    -- resolved alt text
  src          TEXT,                    -- URL or path; null for code nodes
  data         JSONB,                   -- full typed JSONB object above
  position     JSONB,                   -- {"x": 0, "y": 0}
  confidence   TEXT CHECK (confidence IN ('low','medium','high')),
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON media_nodes USING GIN (data);
CREATE INDEX ON media_nodes (doc_id, media_type);
```

**Sample inserts — shared sample document**

```sql
-- row-by-row image
INSERT INTO media_nodes (id, doc_id, media_type, label, src, data, confidence) VALUES (
  'm-scrape-pipeline', 'hackamap-demos', 'image',
  'Scrape pipeline overview — Phase 1',
  './assets/scrape-pipeline.png',
  '{"type":"image","alt":"Scrape pipeline overview — Phase 1","src":"./assets/scrape-pipeline.png","caption":"Phase 1 signal collection","flag":null,"confidence":"high"}'::jsonb,
  'high'
);

-- row-by-row video
INSERT INTO media_nodes (id, doc_id, media_type, label, src, data, confidence) VALUES (
  'm-demo-walkthrough', 'hackamap-demos', 'video',
  'hackathon winners demo walkthrough — TreeHacks 2026',
  'https://demo.airvio.co/assets/treehacks-2026-walkthrough.mp4',
  '{"type":"video","alt":"hackathon winners demo walkthrough — TreeHacks 2026","src":"https://demo.airvio.co/assets/treehacks-2026-walkthrough.mp4","aspect":"16/9","controls":true,"autoplay":false,"muted":true,"poster":null,"confidence":"high"}'::jsonb,
  'high'
);

-- row-by-row iframe
INSERT INTO media_nodes (id, doc_id, media_type, label, src, data, confidence) VALUES (
  'm-gallery-iframe', 'hackamap-demos', 'iframe',
  'Live project gallery — devpost.com',
  'https://treehacks-2026.devpost.com/project-gallery',
  '{"type":"iframe","alt":"Live project gallery — devpost.com","src":"https://treehacks-2026.devpost.com/project-gallery","aspect":"16/9","sandbox":"allow-scripts allow-same-origin","allow":null,"confidence":"high"}'::jsonb,
  'high'
);

-- side-by-side media-row
INSERT INTO media_nodes (id, doc_id, media_type, label, src, data, confidence) VALUES (
  'mr-phase1-compare', 'hackamap-demos', 'media-row',
  'Phase 1 before / after comparison',
  null,
  '{"type":"media-row","cols":2,"gap":"md","caption":"hackathon winners — before and after","items":[{"type":"image","alt":"Before — raw demo list","src":"./assets/before.png"},{"type":"image","alt":"After — winner-marked gallery","src":"./assets/gallery-output.png"}],"confidence":"high"}'::jsonb,
  'high'
);
```

### Sample — full compliant media blocks

**Row-by-row (default)**

```markdown
<!-- media | type: image | alt: Scrape pipeline overview — Phase 1 | caption: Phase 1 signal collection -->
![Scrape pipeline overview — Phase 1](./assets/scrape-pipeline.png)

<!-- media | type: video | alt: {{subject}} demo walkthrough — TreeHacks 2026 | aspect: 16/9 | controls: true | poster: ./assets/walkthrough-poster.png -->
https://demo.airvio.co/assets/treehacks-2026-walkthrough.mp4

<!-- media | type: audio | alt: Founder pitch audio — {{subject}} | controls: true -->
https://demo.airvio.co/assets/pitch-audio.mp3

<!-- media | type: iframe | alt: Live project gallery — devpost.com | aspect: 16/9 | sandbox: allow-scripts allow-same-origin | caption: {{solution}} -->
https://treehacks-2026.devpost.com/project-gallery

<!-- media | type: model | alt: Orbital gap mesh — GLB | confidence: medium -->
https://demo.airvio.co/assets/gap-mesh.glb
```

**Side-by-side (opt-in — comparative layout)**

```markdown
<!-- media-row | cols: 2 | gap: md | caption: {{subject}} — before and after -->
<!-- media | type: image | alt: Before — raw demo list -->
![Before — raw demo list](./assets/before.png)
<!-- media | type: image | alt: After — winner-marked gallery -->
![After — winner-marked gallery](./assets/gallery-output.png)
<!-- /media-row -->
```

**Mixed-type side-by-side (image + video)**

```markdown
<!-- media-row | cols: 2 | gap: lg | caption: Pipeline diagram alongside live walkthrough -->
<!-- media | type: image | alt: Scrape pipeline overview — Phase 1 -->
![Scrape pipeline overview — Phase 1](./assets/scrape-pipeline.png)
<!-- media | type: video | alt: {{subject}} demo walkthrough | aspect: 16/9 | controls: true -->
https://demo.airvio.co/assets/treehacks-2026-walkthrough.mp4
<!-- /media-row -->
```

### Shared cell conventions — additions for media nodes

Extends the convention tables from the Multi-dimensional Table Guidelines and Flow Graph / Workflow Editor Guidelines sections.

| Convention | Symbol | Parse rule | Example |
|---|---|---|---|
| Media node reference | `` `@node:m-{id}` `` | resolve to single media node by `id`; `m-` prefix | `` `@node:m-gallery-output` `` |
| Row container reference | `` `@node:mr-{id}` `` | resolve to `media-row` container node; `mr-` prefix | `` `@node:mr-phase1-compare` `` |
| Edge from media node | `` `@edge:m-{id}:media→n-{id}:{handle}` `` | edge from `media` source handle to downstream node | `` `@edge:m-gallery-output:media→n-extract:demos` `` |
| Alt variable | `{{key}}` in `alt:` | resolve from frontmatter; standard resolution order | `alt: {{subject}} demo screenshot` |
| Caption variable | `{{key}}` in `caption:` | resolve from frontmatter | `caption: {{solution}}` |
| Decorative flag | `alt: ""` | `decorative: true` in JSONB; omit from canvas label | `alt: ""` |
| Media type | `type: video` etc. | typed node; inferred from extension if omitted | `type: iframe` |
| Confidence | `confidence: high` | solid stroke; `low` = dashed; `medium` = partial | `confidence: medium` |
| Flag annotation | `flag: @flag:value` | forwarded to `data.flag`; rendered as flag badge on node | `flag: @flag:verify source` |

---

## Text Guidelines

### Titles and ellipsis

Long headings and title-like labels should be written as normal markdown text; UI truncates with ellipsis at rest and reveals the full title on inline edit via horizontal scroll, so authors must not embed manual ellipsis or hard line breaks solely to simulate truncation.

### Normal prose

Normal prose (paragraphs, table cells) should flow as complete sentences without manual layout breaks; use `...` only when it carries semantic meaning in the content, not as a visual truncation hack (wrapping and clipping remain UI responsibilities).