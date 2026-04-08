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
  - A. Author 1
  - B. Author 2
date: "2026-02-23"
venue: "Example City"
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

`{{variable}}` is the industry-standard template interpolation syntax (Handlebars,
Mustache, Jinja2, Liquid, GitHub Actions). It signals "this is a placeholder" to
both humans and machines, is mobile-friendly, and passes through Markdown renderers
as literal text — always readable as a fallback.

**Floating variable toolbar:** type `@` anywhere in the document to invoke a
floating CRUD toolbar for creating, reading, updating, and deleting `{{variable}}`
declarations. The toolbar is the single management surface for all variables —
no need to hunt for `{{key:value}}` declarations scattered across the document.

**Mermaid scope rule:** `{{}}` inside a fenced `mermaid` block retains its
Mermaid meaning (hexagon node shape). `{{}}` outside Mermaid blocks is exclusively
the variable/reference sigil. The two contexts are mutually exclusive by block
boundary and never overlap.

**YAML frontmatter harmonisation:** `{{key}}` in body prose resolves from
frontmatter keys first. A `{{subject}}` reference resolves from
`subject: "hackathon winners"` in the YAML frontmatter — no separate inline
declaration needed when the key already exists in frontmatter.

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

All `{{variable}}` CRUD is centralised in frontmatter. Inline `{{key:value}}`
declarations are write-once shortcuts — use the `@` toolbar to manage them
after first declaration.

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

Table referencing frontmatter keys — one declaration, reused across all rows
that share the same pain point and solution:

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

## Text Guidelines

### Titles and ellipsis

Long headings and title-like labels should be written as normal markdown text; UI
truncates with ellipsis at rest and reveals the full title on inline edit via
horizontal scroll, so authors must not embed manual ellipsis or hard line breaks
solely to simulate truncation.

### Normal prose

Normal prose (paragraphs, table cells) should flow as complete sentences without
manual layout breaks; use `...` only when it carries semantic meaning in the
content, not as a visual truncation hack (wrapping and clipping remain UI
responsibilities).