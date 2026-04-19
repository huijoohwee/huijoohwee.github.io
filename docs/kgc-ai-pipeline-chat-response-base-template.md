---
# ── Tier A — DOCUMENT IDENTITY ────────────────────────────────────────────────
title:    "{{product}} · AI Pipeline — Chat Response"
graphId:  "md:{{domain}}-pipeline"
doc_type: "Chat Response"
date:     "{{date}}"
ai_model: "claude-sonnet-4-20250514"
lang:     en-US

# ── Tier A — SELF-RUNNER + GRAPH REGISTRY ────────────────────────────────────
# A conformant Knowledge Graph Canvas renderer ingests this block directly;
# no external config is required. All five SSOT surfaces — pipeline:, flow:,
# mermaid:, runner:, and graph_meta: — are consistent and co-located here.

$schema: "kgc-pipeline/v1"

spec:
  format:        kgc-pipeline
  version:       "1.0.0"
  parser:        yaml-frontmatter
  execution:     computing-flow
  topology:      DAG-with-feedback
  ssot_surfaces: [pipeline, flow.nodes, flow.edges, mermaid, runner]

# ── runner ────────────────────────────────────────────────────────────────────
# Ordered execution protocol — any conformant renderer MUST follow steps R01–R06
# in sequence. Steps are idempotent; a renderer MAY cache resolved output between
# R02 and R03 across document reloads.
runner:
  entry: R01
  exit:  R06

  steps:

    - seq:    R01
      action: ingest
      input:  "raw file bytes"
      output: "parsed YAML object"
      description: >
        Read file from disk (or network). Split on first pair of --- delimiters.
        Parse the frontmatter block as YAML. Validate $schema == 'kgc-pipeline/v1';
        halt with runner-error if schema mismatch. Expose parsed object as
        __doc for downstream steps.

    - seq:    R02
      action: resolve
      input:  "__doc (parsed YAML object)"
      output: "__doc_resolved (vars substituted)"
      description: >
        Walk every string value in __doc. Replace {{key}} with the scalar value
        at doc[key]. Replace {{key:value}} with value and register key→value.
        Replace {{key|fallback}} with doc[key] if present, else fallback.
        Tier B sentinel keys whose value is also a {{key}} pattern are exempt
        from V-03 — render as visible placeholders. Expose __doc_resolved.

    - seq:    R03
      action: build-graph
      input:  "__doc_resolved"
      output: "graph { nodes[], edges[] }"
      description: >
        Instantiate each entry in flow.nodes[] as a graph node object. Instantiate
        each entry in flow.edges[] as a directed edge. Cross-validate: every
        flow.nodes[*].id.value MUST appear in pipeline[*].node AND in mermaid:
        node IDs. Any mismatch halts with ssot-mismatch error naming the
        divergent ID. Attach phase, actor, handles, applies_rules, db_writes,
        retry_arc, confidence, status, kanban from each flow.nodes entry.

    - seq:    R04
      action: compile-compute
      input:  "graph { nodes[], edges[] }"
      output: "graph { nodes[] (compiled fns), edges[] }"
      description: >
        For each node, call parseMappingFn(node) — see TAD section. Before
        new Function(), scan compute.value body for 'fetch', 'document',
        'window'; any match halts compilation for that node and marks it
        @flag:impure. Compiled function is stored on node as node._fn.
        Async nodes (n-process) are flagged node._async = true.

    - seq:    R05
      action: traverse
      input:  "graph (compiled)"
      output: "graph (executed — handle values populated)"
      description: >
        Execute nodes in pipeline[*].seq order (S01 → S05). For each node,
        assemble inputs map from all upstream edges whose targetHandle matches
        a handle in node.handles.target[]. Call node._fn(inputs). Propagate
        returned handle values to downstream edges. Honor feedback arc e5
        (n-validate:correction → n-process:correction): re-execute n-process
        up to runtime.maxRetry times on correction non-null. After maxRetry,
        set both valid_md and correction to null and surface @flag:validation-failed
        on n-validate. TBD inputs are treated as null; node shows @flag:waiting.

    - seq:    R06
      action: render
      input:  "graph (executed) + mermaid: block + body Markdown"
      output: "rendered Knowledge Graph Canvas"
      description: >
        Resolve {{mermaid}} in body with the mermaid: block scalar. Apply
        canvas settings (auto_layout dagre-LR, snap_to_grid, minimap, controls).
        Render pipeline: as the Pipeline table. Apply parseSigil() to all table
        cells. Render flow graph with node cards showing phase, actor, confidence
        badge, kanban status, and @flag annotations. Clicking a node card anchors
        to its seq row in the Pipeline table (links.body_anchor → #pipeline).
        Clicking the Flow Graph heading anchors back to this frontmatter's
        documented entry point (links.yaml_anchor → #computing-flow-definition).

# ── links ─────────────────────────────────────────────────────────────────────
# Bidirectional anchors between YAML frontmatter and Markdown body.
# Renderers use body_anchor as the post-parse jump target (first rendered view).
# Body prose uses yaml_anchor as the back-link to machine definition docs.
links:
  yaml_anchor: "#computing-flow-definition"
  # ↑ H2 anchor in body — human-readable documentation of this frontmatter block.
  #   The body section at that anchor IS the human-readable Computing Flow output.

  body_anchor: "#flow-graph"
  # ↑ H2 anchor in body — first rendered diagram section; renderer jumps here
  #   after completing R06.

  self_ref:    "kgc-ai-pipeline-chat-response-base-template.md"
  # ↑ Canonical filename for cross-document @node: and @edge: references from
  #   sibling documents in the same Knowledge Graph Canvas workspace.

# ── canvas ────────────────────────────────────────────────────────────────────
# Rendering hints — conformant renderers SHOULD apply these; MAY allow UI override.
canvas:
  auto_layout:  true
  layout_algo:  dagre-LR
  snap_to_grid: true
  grid_size:    20
  minimap:      true
  controls:     true
  node_defaults:
    width:  220
    height: 80
  edge_defaults:
    type:     smoothstep
    animated: true

# ── graph_meta ────────────────────────────────────────────────────────────────
# SSOT summary — kept in sync with flow: and pipeline:. Renderers MAY use this
# block for graph registry display without fully parsing flow: or mermaid:.
graph_meta:
  node_count: 5
  edge_count: 5
  phase_count: 3
  entry_node:  n-trigger
  exit_node:   n-deliver
  phases:
    - id: P1
      label: "Context Packaging"
      seq_range: "S01–S02"
      nodes: [n-trigger, n-pack]
    - id: P2
      label: "Generate + Validate"
      seq_range: "S03–S04"
      nodes: [n-process, n-validate]
    - id: P3
      label: "Deliver + Persist"
      seq_range: "S05"
      nodes: [n-deliver]
  feedback_arcs:
    - edge:           e5
      from:           n-validate
      from_handle:    correction
      to:             n-process
      to_handle:      correction
      max_iterations: "{{runtime.maxRetry}}"
      on_exhausted:   "@flag:validation-failed"
  forward_edges:
    - {edge: e1, from: n-trigger,  to: n-pack,     handle: signal}
    - {edge: e2, from: n-pack,     to: n-process,  handle: context}
    - {edge: e3, from: n-process,  to: n-validate, handle: md}
    - {edge: e4, from: n-validate, to: n-deliver,  handle: valid_md}

# ── Tier B — DOMAIN IDENTITY VARIABLES ({{}} sentinel values) ─────────────────
# Authors replace these when customizing for a specific domain.
# Body prose resolves from these keys — unresolved {{key}} renders as a literal
# placeholder until the value is provided. NOT a V-03 violation for this key set.
product:   "{{product}}"    # e.g. "Knowledge Graph Canvas"
domain:    "{{domain}}"     # e.g. "Business Plan Development"
subject:   "{{subject}}"   # e.g. "founder" | "analyst" | "researcher"
objective: "{{objective}}" # e.g. "validate business model"
artifact:  "{{artifact}}"  # e.g. "business plan section" | "GTM playbook"
owner:     "{{owner}}"     # e.g. "platform-ai"
version:   "{{version}}"   # e.g. "0.1.0"
status:    "{{status}}"    # e.g. "draft"

# ── runtime ───────────────────────────────────────────────────────────────────
# {{runtime.*}} resolves in body prose + Pipeline table cells.
runtime:
  entry:    {key: entry,    type: string,  value: "n-trigger"}
  exit:     {key: exit,     type: string,  value: "n-deliver"}
  sandbox:  {key: sandbox,  type: string,  value: "quickjs-emscripten"}
  trace:    {key: trace,    type: boolean, value: true}
  maxRetry: {key: maxRetry, type: number,  value: 3}

# ── pipeline ──────────────────────────────────────────────────────────────────
# SSOT ordered traversal over mermaid: node IDs.
# pipeline[*].node MUST match flow.nodes[*].id and mermaid: node IDs EXACTLY.
# Body Pipeline table is the human-readable projection of this block.
# All fifteen dimensions are MANDATORY per step; use TBD / — for unknowns.
pipeline:

  - seq: S01
    node: n-trigger
    label: "trigger / input"
    actor: ["{{subject}}", "system"]
    edge_in: "—"
    edge_out: signal
    user_action: "{{subject}} selects scope; types request in Chat UI"
    sys_event: "Runtime injects __selected_scope, __frontmatter, __context_summary globals; compute: assembles signal {scope, fm, summary}"
    data_in: "—"
    data_out: "signal {scope, fm, summary}"
    trigger: scope-select event
    on_fail: "@flag:waiting — node blocked until scope selection"
    kanban: TBD
    confidence: high
    status: TBD

  - seq: S02
    node: n-pack
    label: "context pack"
    actor: ["system"]
    edge_in: signal
    edge_out: context
    user_action: "—"
    sys_event: "packContext() shapes signal into context bundle; prepends guideline_digest ≤ 800 tokens as system-prompt prefix"
    data_in: "signal {scope, fm, summary}"
    data_out: "context {selected_scope, frontmatter, context_summary}"
    trigger: signal non-null
    on_fail: "null emitted on context — all downstream nodes short-circuit"
    kanban: TBD
    confidence: high
    status: TBD

  - seq: S03
    node: n-process
    label: "generate / process"
    actor: ["{{subject}}", "AI"]
    edge_in: "context + correction|null"
    edge_out: md
    user_action: "Request injected as user turn; {{subject}} views streamed response in Chat UI"
    sys_event: "generateArtifact() calls /v1/messages model {{ai_model}} temp 0.3 max 1000 tokens; appends @flag:correction to user turn when correction non-null"
    data_in: "context {selected_scope, frontmatter, context_summary} + correction string[]|null"
    data_out: "md string (raw streamed Markdown)"
    trigger: context received
    on_fail: "null emitted on md — validate short-circuits"
    kanban: TBD
    confidence: high
    status: TBD

  - seq: S04
    node: n-validate
    label: "review / validate"
    actor: ["system"]
    edge_in: md
    edge_out: "valid_md | correction (feedback arc)"
    user_action: "Validation badge appears on node card (high / low / @flag:failed)"
    sys_event: "validateArtifact() runs V-01–V-07 sequentially; first failure emits correction back to n-process via feedback arc e5; pass emits valid_md to n-deliver"
    data_in: "md string"
    data_out: "valid_md string (pass) OR correction string[] (fail — feedback arc)"
    trigger: md received
    on_fail: "retry ≤ 3× via @edge:n-validate:correction→n-process:correction; then @flag:validation-failed on originating node"
    kanban: TBD
    confidence: high
    status: TBD

  - seq: S05
    node: n-deliver
    label: "deliver / persist"
    actor: ["system"]
    edge_in: valid_md
    edge_out: "—"
    user_action: "Artifact delivered — new content appears; {{subject}} accepts or triggers re-prompt"
    sys_event: "deliverArtifact() calls resolveVars() → parseMappingFn() per node → parseSigil() per cell → upsert flow_nodes + flow_edges → output re-render"
    data_in: "valid_md string"
    data_out: "rendered object + JSONB rows in flow_nodes, flow_edges"
    trigger: valid_md non-null
    on_fail: "short-circuits — output unchanged"
    kanban: TBD
    confidence: high
    status: TBD

# ── mermaid ───────────────────────────────────────────────────────────────────
# SSOT graph definition (literal block scalar).
# Subgraphs encode phase boundaries; outer edges encode entity relationships.
# Click handlers anchor into body Pipeline section by seq.
# {{mermaid}} in body resolves to this entire block for rendering.
# RULE: {{}} inside this block is Mermaid hex-node syntax — never a variable ref.
# "{{subject}}" below is an author-readable label string, not a resolved variable.
mermaid: |
  %%{init: {"theme": "base", "themeVariables": {"primaryColor":"#E1F5EE","primaryTextColor":"#085041","primaryBorderColor":"#1D9E75","lineColor":"#5F5E5A","secondaryColor":"#E6F1FB","tertiaryColor":"#FAEEDA"}}}%%
  flowchart LR
    %% ─────────────────────────────────────────────────────────────────────────
    %% Mermaid shape key
    %% ([ ])   stadium   – actor / persona
    %% [ ]     rect      – standard step
    %% [( )]   cylinder  – data store / DB
    %% subgraph            – phase boundary
    %% ─────────────────────────────────────────────────────────────────────────
    classDef persona  fill:#E1F5EE,stroke:#1D9E75,color:#085041,stroke-width:1.5px
    classDef input    fill:#E1F5EE,stroke:#1D9E75,color:#085041,stroke-width:1.5px
    classDef default  fill:#E6F1FB,stroke:#378ADD,color:#0C447C,stroke-width:1.5px
    classDef output   fill:#EAF3DE,stroke:#639922,color:#27500A,stroke-width:1.5px
    classDef store    fill:#F1EFE8,stroke:#888780,color:#444441,stroke-width:1px

    %% ── entities (outside pipeline nodes) ──
    Actor(["{{subject}}"])
    DB[("flow_nodes\nflow_edges\nJSONB")]

    %% ── S01–S02 · Context Packaging ──
    subgraph P1["S01–S02 · Context Packaging"]
      n-trigger["S01 · n-trigger\nTrigger / Input"]
      n-pack["S02 · n-pack\npackContext()"]
      n-trigger -->|signal| n-pack
    end

    %% ── S03–S04 · Generate + Validate ──
    subgraph P2["S03–S04 · Generate + Validate"]
      n-process["S03 · n-process\ngenerateArtifact()"]
      n-validate["S04 · n-validate\nvalidateArtifact()"]
      n-process -->|md| n-validate
      n-validate -.->|"@flag:correction\n≤ 3×"| n-process
    end

    %% ── S05 · Deliver + Persist ──
    subgraph P3["S05 · Deliver + Persist"]
      n-deliver["S05 · n-deliver\ndeliverArtifact()"]
    end

    %% ── entity relationships (cross-subgraph + actors + store) ──
    Actor      -->|selects scope · types request| n-trigger
    n-pack     -->|context|                       n-process
    n-validate -->|valid_md|                      n-deliver
    n-deliver  -->|upsert|                        DB
    DB         -.->|reload · rehydrate|           n-trigger

    %% ── class assignments ──
    class Actor persona
    class n-trigger input
    class n-pack,n-process,n-validate default
    class n-deliver output
    class DB store

    %% ── click handlers → Pipeline section ──
    click n-trigger  "#pipeline" "S01 · trigger / input"
    click n-pack     "#pipeline" "S02 · context pack"
    click n-process  "#pipeline" "S03 · generate / process"
    click n-validate "#pipeline" "S04 · review / validate"
    click n-deliver  "#pipeline" "S05 · deliver / persist"

# ── flow ──────────────────────────────────────────────────────────────────────
# Computing graph — machine-readable node schema + compute functions.
# Each node carries ALL spec dimensions from Node Reference:
#   phase, actor, applies_rules, db_writes, retry_arc, confidence, status, kanban.
# flow.nodes[*].id matches pipeline[*].node and mermaid: node IDs EXACTLY.
# FORBIDDEN: position: on any node — auto-layout owns placement.
flow:
  direction:  {key: direction,  type: string,  value: LR}
  edgeType:   {key: edgeType,   type: string,  value: smoothstep}
  snapToGrid: {key: snapToGrid, type: boolean, value: true}
  computed:   {key: computed,   type: boolean, value: true}

  nodes:

    # ── n-trigger · S01 ──────────────────────────────────────────────────────
    - id:           {key: id,           type: string,  value: "n-trigger"}
      type:         {key: type,         type: string,  value: "input"}
      label:        {key: label,        type: string,  value: "S01 · Trigger / Input"}
      phase:        {key: phase,        type: string,  value: "emit"}
      actor:        {key: actor,        type: array,   value: ["{{subject}}","system"]}
      handles:      {key: handles,      type: object,  value: {source: [signal]}}
      data:         {key: data,         type: object,  value: {objective: "{{objective}}", artifact: "{{artifact}}"}}
      applies_rules:{key: applies_rules,type: array,   value: []}
      db_writes:    {key: db_writes,    type: string,  value: "flow_nodes"}
      retry_arc:    {key: retry_arc,    type: string,  value: "—"}
      confidence:   {key: confidence,   type: string,  value: "high"}
      status:       {key: status,       type: string,  value: "TBD"}
      kanban:       {key: kanban,       type: string,  value: "TBD"}
      compute:      {key: compute,      type: function, value: |
        (inputs) => ({
          signal: {
            scope:   inputs.__selected_scope  ?? null,
            fm:      inputs.__frontmatter     ?? {},
            summary: inputs.__context_summary ?? ""
          }
        })
      }

    # ── n-pack · S02 ─────────────────────────────────────────────────────────
    - id:           {key: id,           type: string,  value: "n-pack"}
      type:         {key: type,         type: string,  value: "default"}
      label:        {key: label,        type: string,  value: "S02 · packContext()"}
      phase:        {key: phase,        type: string,  value: "pack"}
      actor:        {key: actor,        type: array,   value: ["system"]}
      handles:      {key: handles,      type: object,  value: {target: [signal], source: [context]}}
      data:         {key: data,         type: object,  value: {}}
      applies_rules:{key: applies_rules,type: array,   value: []}
      db_writes:    {key: db_writes,    type: string,  value: "flow_nodes"}
      retry_arc:    {key: retry_arc,    type: string,  value: "—"}
      confidence:   {key: confidence,   type: string,  value: "high"}
      status:       {key: status,       type: string,  value: "TBD"}
      kanban:       {key: kanban,       type: string,  value: "TBD"}
      compute:      {key: compute,      type: function, value: |
        (inputs) => ({
          context: inputs.signal ? {
            selected_scope:  inputs.signal.scope,
            frontmatter:     inputs.signal.fm,
            context_summary: inputs.signal.summary
          } : null
        })
      }

    # ── n-process · S03 ──────────────────────────────────────────────────────
    - id:           {key: id,           type: string,  value: "n-process"}
      type:         {key: type,         type: string,  value: "default"}
      label:        {key: label,        type: string,  value: "S03 · generateArtifact()"}
      phase:        {key: phase,        type: string,  value: "generate"}
      actor:        {key: actor,        type: array,   value: ["{{subject}}","AI"]}
      handles:      {key: handles,      type: object,  value: {target: [context, correction], source: [md]}}
      data:         {key: data,         type: object,  value: {model: "{{ai_model}}", temperature: 0.3, max_tokens: 1000}}
      applies_rules:{key: applies_rules,type: array,   value: ["V-05"]}
      db_writes:    {key: db_writes,    type: string,  value: "flow_nodes"}
      retry_arc:    {key: retry_arc,    type: string,  value: "source"}
      confidence:   {key: confidence,   type: string,  value: "high"}
      status:       {key: status,       type: string,  value: "TBD"}
      kanban:       {key: kanban,       type: string,  value: "TBD"}
      compute:      {key: compute,      type: function, value: |
        async (inputs) => ({
          md: inputs.context
            ? await callAnthropicAPI({
                ...inputs.context,
                correction: inputs.correction ?? null
              })
            : null
        })
      }

    # ── n-validate · S04 ─────────────────────────────────────────────────────
    - id:           {key: id,           type: string,  value: "n-validate"}
      type:         {key: type,         type: string,  value: "default"}
      label:        {key: label,        type: string,  value: "S04 · validateArtifact()"}
      phase:        {key: phase,        type: string,  value: "validate"}
      actor:        {key: actor,        type: array,   value: ["system"]}
      handles:      {key: handles,      type: object,  value: {target: [md], source: [valid_md, correction]}}
      data:         {key: data,         type: object,  value: {rules: ["V-01","V-02","V-03","V-04","V-05","V-06","V-07"], max_retry: 3}}
      applies_rules:{key: applies_rules,type: array,   value: ["V-01","V-02","V-03","V-04","V-05","V-06","V-07"]}
      db_writes:    {key: db_writes,    type: string,  value: "flow_nodes"}
      retry_arc:    {key: retry_arc,    type: string,  value: "target"}
      confidence:   {key: confidence,   type: string,  value: "high"}
      status:       {key: status,       type: string,  value: "TBD"}
      kanban:       {key: kanban,       type: string,  value: "TBD"}
      compute:      {key: compute,      type: function, value: |
        (inputs) => {
          const result = runValidation(inputs.md);
          return {
            valid_md:   result.ok ? inputs.md    : null,
            correction: result.ok ? null : result.errors
          };
        }
      }

    # ── n-deliver · S05 ──────────────────────────────────────────────────────
    - id:           {key: id,           type: string,  value: "n-deliver"}
      type:         {key: type,         type: string,  value: "output"}
      label:        {key: label,        type: string,  value: "S05 · deliverArtifact()"}
      phase:        {key: phase,        type: string,  value: "deliver"}
      actor:        {key: actor,        type: array,   value: ["system"]}
      handles:      {key: handles,      type: object,  value: {target: [valid_md]}}
      data:         {key: data,         type: object,  value: {stores: ["flow_nodes","flow_edges"], triggers: "output re-render"}}
      applies_rules:{key: applies_rules,type: array,   value: []}
      db_writes:    {key: db_writes,    type: array,   value: ["flow_nodes","flow_edges"]}
      retry_arc:    {key: retry_arc,    type: string,  value: "—"}
      confidence:   {key: confidence,   type: string,  value: "high"}
      status:       {key: status,       type: string,  value: "TBD"}
      kanban:       {key: kanban,       type: string,  value: "TBD"}
      compute:      {key: compute,      type: function, value: |
        (inputs) => ({
          rendered: inputs.valid_md
            ? deliverArtifact(inputs.valid_md)
            : null
        })
      }

  edges:
    - {id: e1, source: n-trigger,  sourceHandle: signal,     target: n-pack,     targetHandle: signal,     label: "signal",             animated: true}
    - {id: e2, source: n-pack,     sourceHandle: context,    target: n-process,  targetHandle: context,    label: "context",            animated: true}
    - {id: e3, source: n-process,  sourceHandle: md,         target: n-validate, targetHandle: md,         label: "md",                 animated: true}
    - {id: e4, source: n-validate, sourceHandle: valid_md,   target: n-deliver,  targetHandle: valid_md,   label: "validated artifact", animated: true}
    - {id: e5, source: n-validate, sourceHandle: correction, target: n-process,  targetHandle: correction, label: "@flag:correction",   animated: true}
---

# {{product}} · AI Pipeline

## {{doc_type}}

`bg#E1F5EE:version {{version}}` · `bg#FAEEDA:status {{status}}` · owner `{{owner}}` · {{date}}

> **This document is the pipeline.** YAML frontmatter is the machine-readable form — `$schema: kgc-pipeline/v1` declares the format; `spec:` declares topology; `runner:` (R01–R06) is the self-contained execution protocol; `links:` wires frontmatter to body and back; `graph_meta:` provides a registry summary without full parsing; `mermaid:` defines the graph; `flow:` defines computing nodes and edges; `pipeline:` declares the ordered traversal. The body below is the human-readable projection of that same data, linked via `{{}}` variable references and `@node:` / `@edge:` sigils. Tier B domain identity variables (`{{product}}`, `{{domain}}`, `{{subject}}`, `{{objective}}`, `{{artifact}}`, `{{owner}}`, `{{version}}`, `{{status}}`) render as visible placeholders until replaced in frontmatter — see the Customization Guide at the end of this document.

---

## Computing Flow Definition

> **Machine source:** YAML frontmatter above the `---` delimiter — self-runnable, graph-complete, no external config required. · [↓ Flow Graph](#flow-graph) · [↓ Pipeline](#pipeline) · [↓ PRD](#prd--product-requirements) · [↓ TAD](#tad--technical-architecture)

This document is dual-layered: the YAML frontmatter **is** the computing flow. A conformant Knowledge Graph Canvas renderer ingests the frontmatter directly and executes runner steps R01–R06 to produce the rendered canvas. The sections below — Flow Graph, Pipeline, PRD, TAD — are the human-readable projection of that same data.

The five SSOT surfaces that MUST stay in exact sync are: `pipeline[*].node`, `flow.nodes[*].id.value`, `mermaid:` node IDs, `runner:` step references, and `graph_meta:` node/edge lists. Any divergence surfaces as a `ssot-mismatch` runner error at R03.

### Runner Protocol

Steps executed in order by any conformant renderer (`runner:` frontmatter block). Steps are idempotent; renderers MAY cache between R02 and R03.

| seq | Action | Input | Output | Notes |
|---|---|---|---|---|
| `R01` | **Ingest** | Raw file bytes | Parsed YAML object | Halt on `$schema` mismatch |
| `R02` | **Resolve** | Parsed YAML | Vars substituted | Tier B sentinels exempt from V-03 |
| `R03` | **Build Graph** | Resolved YAML | `graph { nodes, edges }` | Cross-validate all five SSOT surfaces |
| `R04` | **Compile Compute** | Graph | Graph (compiled fns) | V-05 purity guard before `new Function()` |
| `R05` | **Traverse** | Compiled graph | Executed graph | Topological order S01→S05; feedback arc `e5` ≤ `{{runtime.maxRetry}}`× |
| `R06` | **Render** | Executed graph + body | Knowledge Graph Canvas | `dagre-LR` auto-layout; minimap + controls on |

### Graph Registry

Summary of the computing graph (`graph_meta:` frontmatter block). Renderers MAY use this block for workspace listings without fully parsing `flow:` or `mermaid:`.

| Dimension | Value |
|---|---|
| Nodes | 5 |
| Edges | 5 — 4 forward · 1 feedback arc (`e5`) |
| Phases | 3 (P1 · P2 · P3) |
| Topology | DAG with bounded feedback |
| Entry node | `@node:n-trigger` (no target handles → `signal` source) |
| Exit node | `@node:n-deliver` (`valid_md` target → no source handles) |
| Max feedback iterations | `{{runtime.maxRetry}}` |
| Feedback exhausted | `@flag:validation-failed` on `@node:n-validate` |

| Phase | Seq | Nodes |
|---|---|---|
| P1 · Context Packaging | S01–S02 | `@node:n-trigger` · `@node:n-pack` |
| P2 · Generate + Validate | S03–S04 | `@node:n-process` · `@node:n-validate` |
| P3 · Deliver + Persist | S05 | `@node:n-deliver` |

### Document Links

Bidirectional anchors between YAML frontmatter and body (`links:` frontmatter block).

| Direction | Frontmatter key | Target |
|---|---|---|
| YAML → body (entry view) | `links.body_anchor` | `#flow-graph` — rendered diagram |
| YAML → body (docs) | `links.yaml_anchor` | `#computing-flow-definition` — this section |
| Body → YAML | frontmatter `---` delimiter | Source of truth for all machine data |
| Cross-document | `links.self_ref` | `kgc-ai-pipeline-chat-response-base-template.md` — canonical filename |

---

## Flow Graph

[↑ Computing Flow Definition](#computing-flow-definition)

```mermaid
{{mermaid}}
```

The diagram renders from `mermaid:` frontmatter — the SSOT graph definition. Subgraph `P1` groups `@node:n-trigger` + `@node:n-pack` (context packaging); `P2` groups `@node:n-process` + `@node:n-validate` with the bounded feedback arc `@edge:n-validate:correction→n-process:correction`; `P3` holds `@node:n-deliver`. Outer edges show entity relationships: the `{{subject}}` actor and the `DB` store are not pipeline nodes but are wired to the graph. Clicking any node in the rendered diagram anchors to its row in the Pipeline table below.

**Frontmatter → body linkage map:**

| Frontmatter key | Resolves in body as | Example |
|---|---|---|
| `$schema` | renderer format gate | `kgc-pipeline/v1` |
| `runner[*]` | Runner Protocol table above | R01–R06 |
| `graph_meta` | Graph Registry table above | node_count, phases, feedback_arcs |
| `links` | Document Links table above | `yaml_anchor`, `body_anchor`, `self_ref` |
| `canvas` | rendering hints applied at R06 | `dagre-LR`, minimap, snap_to_grid |
| `mermaid:` block | `{{mermaid}}` → rendered diagram | Flow Graph section above |
| `flow.nodes[*]` | `@node:id` sigil | `@node:n-process` |
| `flow.edges[*]` | `@edge:src:h→tgt:h` sigil | `@edge:n-validate:correction→n-process:correction` |
| `pipeline[*]` | Pipeline table rows (seq S01–S05) | Pipeline section below |
| `runtime.*` | `{{runtime.*}}` scalar refs | `{{runtime.maxRetry}}` → `3` |
| `product` · `domain` · `subject` | `{{product}}` · `{{domain}}` · `{{subject}}` | Tier B sentinels — literal until customized |
| `objective` · `artifact` · `owner` | `{{objective}}` · `{{artifact}}` · `{{owner}}` | Tier B sentinels — literal until customized |
| `version` · `status` | `{{version}}` · `{{status}}` | Tier B sentinels — literal until customized |
| `ai_model` | `{{ai_model}}` | `claude-sonnet-4-20250514` |
| `doc_type` | `{{doc_type}}` | `Chat Response` |
| `date` | `{{date}}` | `{{date}}` |

---

## Pipeline

[↑ Computing Flow Definition](#computing-flow-definition)

Human-readable projection of `pipeline:` frontmatter. Each row maps `seq` → `pipeline[*].seq`, `@node:id` → `pipeline[*].node` = `flow.nodes[*].id` = `mermaid:` node ID. `kanban` column integrates delivery status — `bg#EAF3DE:done`, `bg#FAEEDA:in-flight`, `bg#E6F1FB:review`, `bg#FBEAF0:backlog` — replacing a standalone Kanban board. Column header sigils encode the perspective: `bg#E1F5EE:UF` = user flow, `bg#E6F1FB:WF` = work flow, `bg#EAF3DE:DF` = data flow.

| seq | `@node:id` | pipeline step | `bg#E1F5EE:UF` user action | `bg#E6F1FB:WF` system event | `bg#EAF3DE:DF` data in | `bg#EAF3DE:DF` data out | edge | actor | trigger | on fail | kanban | confidence |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `S01` | `@node:n-trigger` | `bg#E1F5EE:trigger / input` | `{{subject}}` selects scope; types request in Chat UI | Runtime injects `__selected_scope`, `__frontmatter`, `__context_summary`; `compute:` assembles `signal` | — | `signal {scope, fm, summary}` | `@edge:n-trigger:signal→n-pack:signal` | `["{{subject}}","system"]` | scope-select event | `@flag:waiting` — blocked until scope selection | TBD | high |
| `S02` | `@node:n-pack` | `bg#E1F5EE:context pack` | — | `packContext()` shapes `signal` into context bundle; prepends `guideline_digest` ≤ 800 tokens as system-prompt prefix | `signal {scope, fm, summary}` | `context {selected_scope, frontmatter, context_summary}` | `@edge:n-pack:context→n-process:context` | `["system"]` | `signal` non-null | `null` on `context` — downstream short-circuits | TBD | high |
| `S03` | `@node:n-process` | `bg#FAEEDA:generate / process` | Request injected as user turn; `{{subject}}` views streamed response in Chat UI | `generateArtifact()` calls `/v1/messages` model `{{ai_model}}` temp `0.3` max `1000` tokens; appends `@flag:correction` when `correction` non-null | `context {selected_scope, frontmatter, context_summary}` + `correction string[]\|null` | `md string` (raw streamed Markdown) | `@edge:n-process:md→n-validate:md` | `["{{subject}}","AI"]` | `context` received | `null` on `md` — validate short-circuits | TBD | high |
| `S04` | `@node:n-validate` | `bg#FAEEDA:review / validate` | Validation badge on node card — `high` / `low` / `@flag:failed` | `validateArtifact()` runs V-01–V-07 in order; first failure emits `correction` back via feedback arc `e5`; pass emits `valid_md` forward | `md string` | `valid_md string` **or** `correction string[]` (feedback arc → S03) | pass → `@edge:n-validate:valid_md→n-deliver:valid_md` · fail → `@edge:n-validate:correction→n-process:correction` | `["system"]` | `md` received | retry ≤ `{{runtime.maxRetry}}`× then `@flag:validation-failed` on originating node | TBD | high |
| `S05` | `@node:n-deliver` | `bg#EAF3DE:deliver / persist` | Artifact delivered — new content appears; `{{subject}}` accepts or triggers re-prompt | `deliverArtifact()` → `resolveVars()` → `parseMappingFn()` → `parseSigil()` → upsert `["flow_nodes","flow_edges"]` → re-render | `valid_md string` | `rendered object` + JSONB rows upserted to `["flow_nodes","flow_edges"]` | — | `["system"]` | `valid_md` non-null | short-circuits — output unchanged | TBD | high |

### Retry arc — S04 feedback to S03

When `@node:n-validate` emits on handle `correction`, `@node:n-process` re-fires with the failed rule list appended as `@flag:correction` in the user turn. Bounded by `{{runtime.maxRetry}}`; after that both `valid_md` and `correction` emit `null` and `@flag:validation-failed` surfaces on the originating node card.

| retry | trigger | injected payload | expected outcome | confidence |
|---|---|---|---|---|
| 1 | first rule failure | `@flag:correction [rule-id, failing-pattern]` | model self-corrects on identified rule | medium |
| 2 | second rule failure | `@flag:correction [rule-id, failing-pattern]` | model corrects with stricter constraint | medium |
| `{{runtime.maxRetry}}` (final) | third rule failure | `@flag:correction [rule-id, failing-pattern]` | hard stop → `@flag:validation-failed` surfaced on node card | low |

---

## PRD — Product Requirements

### Problem

`{{subject}}` working on `{{domain}}` triggers a Chat UI to produce `{{artifact}}`. Without `@node:n-pack` (S02) packaging scope context and `@node:n-validate` (S04) gating AI output against V-01–V-07 rules, responses produce raw prose the canvas renderer cannot parse or persist. The pipeline — `trigger → context pack → generate → validate → deliver` — must run end-to-end without human intervention on the happy path, producing a valid `{{artifact}}` that fulfills `{{objective}}`.

### Goals

| id | Goal | maps to | Priority | Status |
|---|---|---|---|---|
| `G-01` | S02 packages scope state into a structured context bundle | `@node:n-pack` | `#D85A30:P0` | TBD |
| `G-02` | S03 generates `{{artifact}}` Markdown compliant with sigil, variable, and flow-graph syntax | `@node:n-process` | `#D85A30:P0` | TBD |
| `G-03` | S04 rejects non-conformant responses before S05 fires | `@node:n-validate` | `#D85A30:P0` | TBD |
| `G-04` | S05 persists validated artifact to `["flow_nodes","flow_edges"]` JSONB | `@node:n-deliver` | `#185FA5\|bg#E6F1FB:P1` | TBD |
| `G-05` | S01 reload — canvas rehydrates graph from persisted JSONB | `DB → @node:n-trigger` | `#185FA5\|bg#E6F1FB:P1` | TBD |

### Non-Goals

Raw AI prose without canvas-aware formatting, direct DOM manipulation bypassing the MD layer, and multi-user real-time sync are out of scope for v`{{version}}`. Domain-specific validation rules (V-08+) are deferred to individual domain variants forked from this base template.

### User Stories

| id | As a… | I want… | So that… | Acceptance criteria |
|---|---|---|---|---|
| `US-01` | `{{owner}}` | to select a scope (S01) and ask the AI to produce `{{artifact}}` | the response uses `{{variable}}` refs and sigils the canvas resolves | AI response contains `{{key}}` refs resolvable from frontmatter |
| `US-02` | `{{owner}}` | AI-generated `flow:` YAML appended to frontmatter (S03→S05) | new nodes appear on canvas without manual YAML authoring | `flow_nodes` rows created; canvas renders new nodes |
| `US-03` | reviewer | highlighted `bg#HEX:text` confidence annotations in AI responses (S04→S05) | risk scanned at a glance without opening each node | `parseSigil()` succeeds; `flow_nodes.data` `background` field non-null |
| `US-04` | `{{owner}}` | re-prompt triggered automatically on S04 failure | broken MD never reaches S05 | retry loop fires ≤ `{{runtime.maxRetry}}`× then surfaces `@flag:validation-failed` |

---

## TAD — Technical Architecture

### Compute Inline Mapping Spec

Every `compute:` field in `flow.nodes` uses a typed inline mapping with a block scalar value — the three schema keys (`key`, `type`, `value`) appear on the opening line; the function body follows as an indented YAML literal block scalar:

```yaml
compute: {key: compute, type: function, value: |
  (inputs) => ({
    result: transform(inputs.upstream_handle)
  })
}
```

| Field | Type | Rule |
|---|---|---|
| `key` | `string` | always `compute` — mirrors the YAML field name |
| `type` | `string` | always `function` — signals runtime to call `new Function()` |
| `value` | block scalar (`\|`) | pure JS arrow function; `inputs` → outputs map |

`parseMappingFn(node)` — runtime evaluator:

```js
function parseMappingFn(node) {
  const { type, value } = node.compute;
  if (type !== 'function') return null;
  return new Function(`return (${value.trim()})`)();
}
```

Purity guard (V-05) — before `new Function()`, the body is scanned for `fetch`, `document`, `window`. Any match halts evaluation, emits `@flag:correction` on `@edge:n-validate:correction→n-process:correction`, and increments retry toward `{{runtime.maxRetry}}`. Evaluation runs inside `{{runtime.sandbox}}` with `{{runtime.trace}}` step logging enabled.

Handle contract — `inputs` is a map of `handleName → value` from all upstream edges; return value is a map of `handleName → value` pushed to downstream edges. `TBD` inputs are treated as `null`; node shows `@flag:waiting` until all target handles are satisfied. `n-process` compute is `async` — it awaits `callAnthropicAPI()`.

### S02 Context Bundle Field Spec

`@node:n-pack` assembles the `context` object injected as system-prompt prefix on every `/v1/messages` call.

| Field | Source | Type | Token budget |
|---|---|---|---|
| `selected_scope` | `graph.getNode(activeId)` | `object` | — |
| `connected_edges` | `getConnectedEdges(node, edges)` | `object[]` | — |
| `frontmatter` | YAML store | `object` | — |
| `context_summary` | `summariseGraph(nodes, edges)` | `string` | ≤ 200 |
| `guideline_digest` | `markdown-syntax-guidelines.md` headers + rule tables | `string` | ≤ 800 |

### S04 Validation Rules

Rules run in order at `@node:n-validate`; first failure triggers feedback arc `e5`. After `{{runtime.maxRetry}}` failures, node surfaces `@flag:validation-failed`. Domain-specific variants may extend with `V-08`+ rules registered in `flow.nodes[n-validate].data.rules`.

| Rule | Check | Pass condition |
|---|---|---|
| `V-01` | Color sigil HEX format `` `#HEX:text` `` or `` `bg#HEX:text` `` or `` `#HEX\|bg#HEX:text` `` | HEX exactly 6 uppercase hex digits — never `#d85` or 8-digit |
| `V-02` | Long quote guard | no quoted span ≥ 15 words in any cell or prose |
| `V-03` | Variable refs resolvable | all `{{key}}` exist in frontmatter or inline `{{key:value}}`; Tier B sentinel keys are exempt |
| `V-04` | Multi-select arrays | `JSON.parse` succeeds after backtick strip; `#HEX:["A","B"]` is INVALID |
| `V-05` | `compute:` purity | no `fetch`, `document`, `window` in block scalar body |
| `V-06` | No truncation ellipsis | no `...` at end of H1–H4 headings |
| `V-07` | Confidence enum | values exactly `low`, `medium`, or `high`; `TBD` allowed only in `status` and `kanban` fields |

### S05 Data Schema

```sql
CREATE TABLE flow_nodes (
  id          TEXT PRIMARY KEY,
  doc_id      TEXT,
  type        TEXT CHECK (type IN ('input','default','output','custom')),
  label       TEXT,
  handles     JSONB,              -- {"source":["signal"],"target":["context"]}
  data        JSONB,              -- arbitrary node data; mirrors flow.nodes[*].data
  compute_fn  TEXT,               -- function body from compute: {key,type,value:|} mapping
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

## Node Reference

Full schema for each pipeline node — all dimensions carried on each `flow.nodes[*]` entry. Domain variants rename node IDs and labels after forking; the canonical five IDs below are locked in the base template. Replace `TBD` kanban values with status sigils as work progresses.

| id | type | phase | actor | handles (target → source) | applies_rules | db_writes | retry_arc | confidence | kanban |
|---|---|---|---|---|---|---|---|---|---|
| `@node:n-trigger` | `input` | emit | `["{{subject}}","system"]` | — → `[signal]` | `[]` | `flow_nodes` | — | high | TBD |
| `@node:n-pack` | `default` | pack | `["system"]` | `[signal]` → `[context]` | `[]` | `flow_nodes` | — | high | TBD |
| `@node:n-process` | `default` | generate | `["{{subject}}","AI"]` | `[context,correction]` → `[md]` | `["V-05"]` | `flow_nodes` | source | high | TBD |
| `@node:n-validate` | `default` | validate | `["system"]` | `[md]` → `[valid_md,correction]` | `["V-01","V-02","V-03","V-04","V-05","V-06","V-07"]` | `flow_nodes` | target | high | TBD |
| `@node:n-deliver` | `output` | deliver | `["system"]` | `[valid_md]` → — | `[]` | `["flow_nodes","flow_edges"]` | — | high | TBD |

**Canonical handle names** (`snake_case`; match PostgreSQL column names):

| Handle | Direction | Carries | PostgreSQL column |
|---|---|---|---|
| `signal` | `n-trigger` → `n-pack` | scope + frontmatter + summary bundle | — (ephemeral) |
| `context` | `n-pack` → `n-process` | context object for system-prompt prefix | — (ephemeral) |
| `md` | `n-process` → `n-validate` | raw streamed Markdown string | — (ephemeral) |
| `valid_md` | `n-validate` → `n-deliver` | validated Markdown string | — (ephemeral) |
| `correction` | `n-validate` → `n-process` | failed rule IDs + patterns (feedback arc) | — (ephemeral) |

---

## Open Questions

| id | Question | Owner | Due | Status |
|---|---|---|---|---|
| `OQ-01` | Should `guideline_digest` be static (boot-time) or dynamic (per-call)? | `{{owner}}` | TBD | `#D85A30:blocking` |
| `OQ-02` | Max retry `{{runtime.maxRetry}}` — should actors configure per-node via `flow.nodes[*].data.max_retry`? | `{{owner}}` | TBD | medium |
| `OQ-03` | Which V-01–V-07 failures warrant hard-stop vs. soft-warn before retry? | `{{owner}}` | TBD | medium |
| `OQ-04` | Sandbox confirmed as `{{runtime.sandbox}}` — lock in frontmatter or allow per-node override? | `{{owner}}` | TBD | `#D85A30:blocking` |
| `OQ-05` | Domain-specific validation — should each use-case variant extend V-01–V-07 with `V-08`+ rules registered in frontmatter, or maintain a separate rule manifest? | `{{owner}}` | TBD | medium |
| `OQ-06` | Runner step R04 compile-compute — should `parseMappingFn()` be cached per `flow.nodes[*].id` across document reloads, or recompiled on each runner invocation? | `{{owner}}` | TBD | medium |
| `OQ-07` | `canvas.layout_algo: dagre-LR` — should `graph_meta.phases[*].nodes` order drive the layout seeding, or should the renderer derive seed order independently from `pipeline[*].seq`? | `{{owner}}` | TBD | medium |

---

## Customization Guide

Adapt this base template to any domain by replacing the Tier B frontmatter variables below, then extending Goals, User Stories, and validation rules as needed. Node IDs in `flow:` and `mermaid:` may be renamed to domain-appropriate names (e.g., `n-research`, `n-ideate`, `n-draft`, `n-review`, `n-publish`) as long as all five SSOT surfaces — `pipeline[*].node`, `flow.nodes[*].id`, `mermaid:` node IDs, `runner:` step references, and `graph_meta:` node lists — stay in exact sync.

### Frontmatter variable map

| Variable | Base (generic) | Business Plan | Product Management | Go-to-Market | Financial Model | Research | Planning | Workflow Automation | Image Generation | Video Generation |
|---|---|---|---|---|---|---|---|---|---|---|
| `{{product}}` | `{{product}}` | Venture Studio Canvas | PM Canvas | GTM Planner | Finance Canvas | Research Canvas | Planning Canvas | Automation Canvas | Image Canvas | Video Canvas |
| `{{domain}}` | `{{domain}}` | Business Plan Development | Product Management | Go-to-Market | Financial Model Development | Research | Planning | Workflow Automation | Image Generation | Video Generation |
| `{{subject}}` | `{{subject}}` | founder | product manager | growth lead | analyst | researcher | planner | operator | creative | director |
| `{{objective}}` | `{{objective}}` | validate business model | ship a product increment | capture first 1 000 users | model unit economics | synthesize findings | deliver a project plan | automate a recurring workflow | produce on-brand imagery | produce a short-form video |
| `{{artifact}}` | `{{artifact}}` | business plan section | PRD section | GTM playbook | financial model sheet | research brief | project plan | automation workflow | image prompt + output | video script + output |
| `{{owner}}` | `{{owner}}` | platform-ai | platform-ai | growth-ai | finance-ai | research-ai | planning-ai | ops-ai | creative-ai | studio-ai |
| `{{version}}` | `{{version}}` | 0.1.0 | 0.1.0 | 0.1.0 | 0.1.0 | 0.1.0 | 0.1.0 | 0.1.0 | 0.1.0 | 0.1.0 |
| `{{status}}` | `{{status}}` | draft | draft | draft | draft | draft | draft | draft | draft | draft |

### Extension checklist

| Step | Action | Target section |
|---|---|---|
| 1 | Replace all Tier B frontmatter variables with domain concrete values | YAML frontmatter — Tier B block |
| 2 | Rename node IDs + labels in `flow:` and `mermaid:` to domain-appropriate names; update `pipeline[*].node`, `graph_meta.phases[*].nodes`, and `graph_meta.feedback_arcs` to match | YAML frontmatter — `pipeline:`, `mermaid:`, `flow:`, `graph_meta:` |
| 3 | Update `compute:` functions to call domain-specific APIs or tools alongside `/v1/messages` | `flow.nodes[*].compute` |
| 4 | Update `links.self_ref` to the new filename; update `graphId` to a unique value | YAML frontmatter — Tier A block |
| 5 | Add domain Goals from `G-06` onward | PRD — Goals table |
| 6 | Add domain User Stories from `US-05` onward | PRD — User Stories table |
| 7 | Add domain validation rules from `V-08` onward; register in `flow.nodes[n-validate].data.rules` | TAD — S04 Validation Rules |
| 8 | Add domain Open Questions from `OQ-08` onward | Open Questions table |
| 9 | Replace `TBD` kanban values with `bg#EAF3DE:done` · `bg#FAEEDA:in-flight` · `bg#E6F1FB:review` · `bg#FBEAF0:backlog` as work progresses | Pipeline table + Node Reference |

### Syntax quick-reference

All sigil and cell conventions active in this template. Refer to `markdown-syntax-guidelines.md` for full parse rules and JSONB mappings.

| Convention | Symbol | Meaning | Example |
|---|---|---|---|
| Text color sigil | `` `#HEX:text` `` | annotate with color | `` `#D85A30:urgent` `` |
| Background sigil | `` `bg#HEX:text` `` | annotate with highlight | `` `bg#E1F5EE:done` `` |
| Color + background | `` `#HEX\|bg#HEX:text` `` | combined annotation | `` `#185FA5\|bg#E6F1FB:P1` `` |
| Default highlight | `==text==` | highlight without color data | `==review this==` |
| Variable reference | `{{key}}` | resolve from frontmatter | `{{domain}}` |
| Inline declaration | `{{key:value}}` | declare + use (first occurrence) | `{{domain:Research}}` |
| Fallback reference | `{{key\|fallback}}` | use fallback if key undeclared | `{{owner\|platform-ai}}` |
| Multi-select array | `` `["A","B"]` `` | JSON array in table cell | `` `["V-01","V-02"]` `` |
| Node reference | `` `@node:id` `` | resolve to flow node | `` `@node:n-process` `` |
| Edge reference | `` `@edge:src:h→tgt:h` `` | resolve to flow edge | `` `@edge:n-validate:correction→n-process:correction` `` |
| Flag sigil | `@flag:label` | state badge on node card | `@flag:waiting` · `@flag:correction` · `@flag:validation-failed` |
| Empty / unknown | `TBD` | omit node; do not render | TBD |
| Not applicable | `—` | omit node; do not render | — |
| Date scalar | `YYYY-MM-DD` | ISO 8601 | `2026-04-19` |
| Confidence enum | `low` / `medium` / `high` | maps to dashed / partial / solid stroke | high |
| Kanban status | `bg#EAF3DE:done` · `bg#FAEEDA:in-flight` · `bg#E6F1FB:review` · `bg#FBEAF0:backlog` | delivery state in Pipeline table | `bg#FAEEDA:in-flight` |