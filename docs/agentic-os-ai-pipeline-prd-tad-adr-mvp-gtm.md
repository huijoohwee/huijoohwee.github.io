---
# ── Tier A — DOCUMENT IDENTITY ────────────────────────────────────────────────
title:       "Universal AI Pipeline — PRD-TAD-ADR-MVP-GTM"
graphId:     "md:universal-ai-pipeline"
doc_type: "PRD-TAD-ADR-MVP-GTM"
date: "2026-09-12"
ai_model:    "claude-sonnet-4-20250514"
lang: "en-US"

# ── Tier A — SELF-RUNNER + GRAPH REGISTRY ────────────────────────────────────
# A conformant Knowledge Graph Canvas renderer ingests this block directly;
# no external config is required. All five SSOT surfaces — pipeline:, flow:,
# mermaid:, runner:, and graph_meta: — are consistent and co-located here.

$schema: "agentic-os-pipeline/v1"

spec:
  format:        agentic-os-pipeline
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
        Parse the frontmatter block as YAML. Validate $schema == 'agentic-os-pipeline/v1';
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

  self_ref:    "agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.md"
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
owner: "{{owner}}\"     # e.g. \"platform-ai"
version: "0.1.1"
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
    sys_event: "generateArtifact() calls /v1/messages model claude-sonnet-4-20250514 temp 0.3 max 1000 tokens; appends @flag:correction to user turn when correction non-null"
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
      applies_rules: {key: applies_rules,type: array,   value: []}
      db_writes:    {key: db_writes,    type: string,  value: "flow_nodes"}
      retry_arc:    {key: retry_arc,    type: string,  value: "—"}
      confidence:   {key: confidence,   type: string,  value: "high"}
      status:       {key: status,       type: string,  value: "TBD"}
      kanban:       {key: kanban,       type: string,  value: "TBD"}
      compute:
        key: compute
        type: function
        value: |
          (inputs) => ({
            signal: {
              scope:   inputs.__selected_scope  ?? null,
              fm:      inputs.__frontmatter     ?? {},
              summary: inputs.__context_summary ?? ""
            }
          })

    # ── n-pack · S02 ─────────────────────────────────────────────────────────
    - id:           {key: id,           type: string,  value: "n-pack"}
      type:         {key: type,         type: string,  value: "default"}
      label:        {key: label,        type: string,  value: "S02 · packContext()"}
      phase:        {key: phase,        type: string,  value: "pack"}
      actor:        {key: actor,        type: array,   value: ["system"]}
      handles:      {key: handles,      type: object,  value: {target: [signal], source: [context]}}
      data:         {key: data,         type: object,  value: {}}
      applies_rules: {key: applies_rules,type: array,   value: []}
      db_writes:    {key: db_writes,    type: string,  value: "flow_nodes"}
      retry_arc:    {key: retry_arc,    type: string,  value: "—"}
      confidence:   {key: confidence,   type: string,  value: "high"}
      status:       {key: status,       type: string,  value: "TBD"}
      kanban:       {key: kanban,       type: string,  value: "TBD"}
      compute:
        key: compute
        type: function
        value: |
          (inputs) => ({
            context: inputs.signal ? {
              selected_scope:  inputs.signal.scope,
              frontmatter:     inputs.signal.fm,
              context_summary: inputs.signal.summary
            } : null
          })

    # ── n-process · S03 ──────────────────────────────────────────────────────
    - id:           {key: id,           type: string,  value: "n-process"}
      type:         {key: type,         type: string,  value: "default"}
      label:        {key: label,        type: string,  value: "S03 · generateArtifact()"}
      phase:        {key: phase,        type: string,  value: "generate"}
      actor:        {key: actor,        type: array,   value: ["{{subject}}","AI"]}
      handles:      {key: handles,      type: object,  value: {target: [context, correction], source: [md]}}
      data:         {key: data,         type: object,  value: {model: "claude-sonnet-4-20250514", temperature: 0.3, max_tokens: 1000}}
      applies_rules: {key: applies_rules,type: array,   value: ["V-05"]}
      db_writes:    {key: db_writes,    type: string,  value: "flow_nodes"}
      retry_arc:    {key: retry_arc,    type: string,  value: "source"}
      confidence:   {key: confidence,   type: string,  value: "high"}
      status:       {key: status,       type: string,  value: "TBD"}
      kanban:       {key: kanban,       type: string,  value: "TBD"}
      compute:
        key: compute
        type: function
        value: |
          async (inputs) => ({
            md: inputs.context
              ? await callAnthropicAPI({
                  ...inputs.context,
                  correction: inputs.correction ?? null
                })
              : null
          })

    # ── n-validate · S04 ─────────────────────────────────────────────────────
    - id:           {key: id,           type: string,  value: "n-validate"}
      type:         {key: type,         type: string,  value: "default"}
      label:        {key: label,        type: string,  value: "S04 · validateArtifact()"}
      phase:        {key: phase,        type: string,  value: "validate"}
      actor:        {key: actor,        type: array,   value: ["system"]}
      handles:      {key: handles,      type: object,  value: {target: [md], source: [valid_md, correction]}}
      data:         {key: data,         type: object,  value: {rules: ["V-01","V-02","V-03","V-04","V-05","V-06","V-07"], max_retry: 3}}
      applies_rules: {key: applies_rules,type: array,   value: ["V-01","V-02","V-03","V-04","V-05","V-06","V-07"]}
      db_writes:    {key: db_writes,    type: string,  value: "flow_nodes"}
      retry_arc:    {key: retry_arc,    type: string,  value: "target"}
      confidence:   {key: confidence,   type: string,  value: "high"}
      status:       {key: status,       type: string,  value: "TBD"}
      kanban:       {key: kanban,       type: string,  value: "TBD"}
      compute:
        key: compute
        type: function
        value: |
          (inputs) => {
            const result = runValidation(inputs.md);
            return {
              valid_md:   result.ok ? inputs.md    : null,
              correction: result.ok ? null : result.errors
            };
          }

    # ── n-deliver · S05 ──────────────────────────────────────────────────────
    - id:           {key: id,           type: string,  value: "n-deliver"}
      type:         {key: type,         type: string,  value: "output"}
      label:        {key: label,        type: string,  value: "S05 · deliverArtifact()"}
      phase:        {key: phase,        type: string,  value: "deliver"}
      actor:        {key: actor,        type: array,   value: ["system"]}
      handles:      {key: handles,      type: object,  value: {target: [valid_md]}}
      data:         {key: data,         type: object,  value: {stores: ["flow_nodes","flow_edges"], triggers: "output re-render"}}
      applies_rules: {key: applies_rules,type: array,   value: []}
      db_writes:    {key: db_writes,    type: array,   value: ["flow_nodes","flow_edges"]}
      retry_arc:    {key: retry_arc,    type: string,  value: "—"}
      confidence:   {key: confidence,   type: string,  value: "high"}
      status:       {key: status,       type: string,  value: "TBD"}
      kanban:       {key: kanban,       type: string,  value: "TBD"}
      compute:
        key: compute
        type: function
        value: |
          (inputs) => ({
            rendered: inputs.valid_md
              ? deliverArtifact(inputs.valid_md)
              : null
          })

  edges:
    - {id: e1, source: n-trigger,  sourceHandle: signal,     target: n-pack,     targetHandle: signal,     label: "signal",            animated: true}
    - {id: e2, source: n-pack,     sourceHandle: context,    target: n-process,  targetHandle: context,    label: "context",           animated: true}
    - {id: e3, source: n-process,  sourceHandle: md,         target: n-validate, targetHandle: md,         label: "md",                animated: true}
    - {id: e4, source: n-validate, sourceHandle: valid_md,   target: n-deliver,  targetHandle: valid_md,   label: "validated artifact", animated: true}
    - {id: e5, source: n-validate, sourceHandle: correction, target: n-process,  targetHandle: correction, label: "@flag:correction",   animated: true}
frontmatter_contract: "required"
continuity_id: "PLAN-AGENTIC-OS-AI-PIPELINE-PRD-TAD-ADR-MVP-GTM"
local_rung: "undocumented"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
worktree_id: "device-cba000d3779d--planning-v27"
agent_id: "codex-01a0940a"
guideline_revision: "2.7.0"
guideline_source: "https://github.com/huijoohwee/huijoohwee.github.io/blob/e8d2a10a8d3e5735c43edf350a22523df05fdf91/guidelines/prd-tad-adr-mvp-gtm-guidelines.md"
reviewed_source_revision: "e8d2a10a8d3e5735c43edf350a22523df05fdf91"
previous_document_version: "{{version}}\"   # e.g. \"0.1.0"
prd_revision: "0.1.1"
tad_revision: "0.1.1"
adr_revision: "0.1.1"
mvp_revision: "0.1.1"
gtm_revision: "0.1.1"
---

# Reference implementation: Universal AI Pipeline — PRD-TAD-ADR-MVP-GTM

This combined planning artifact joins `PLAN-AGENTIC-OS-AI-PIPELINE-PRD-TAD-ADR-MVP-GTM@0.1.1`. Sections are split solely to keep each authored file below 600 lines. Existing source observations retain their recorded scope and revision. The links below preserve the original section anchors and locate the unchanged requirement/design/decision text plus the current MVP/GTM assessment.

- <a id="doc_type"></a>[{{doc_type}}](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#doc_type)
- <a id="computing-flow-definition"></a>[Computing Flow Definition](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#computing-flow-definition)
- <a id="runner-protocol"></a>[Runner Protocol](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#runner-protocol)
- <a id="graph-registry"></a>[Graph Registry](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#graph-registry)
- <a id="document-links"></a>[Document Links](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#document-links)
- <a id="flow-graph"></a>[Flow Graph](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#flow-graph)
- <a id="pipeline"></a>[Pipeline](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#pipeline)
- <a id="retry-arc--s04-feedback-to-s03"></a>[Retry arc — S04 feedback to S03](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#retry-arc--s04-feedback-to-s03)
- <a id="prd--product-requirements"></a>[PRD — Product Requirements](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#prd--product-requirements)
- <a id="problem"></a>[Problem](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#problem)
- <a id="goals"></a>[Goals](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#goals)
- <a id="non-goals"></a>[Non-Goals](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#non-goals)
- <a id="user-stories"></a>[User Stories](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#user-stories)
- <a id="tad--technical-architecture"></a>[TAD — Technical Architecture](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#tad--technical-architecture)
- <a id="compute-inline-mapping-spec"></a>[Compute Inline Mapping Spec](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#compute-inline-mapping-spec)
- <a id="s02-context-bundle-field-spec"></a>[S02 Context Bundle Field Spec](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#s02-context-bundle-field-spec)
- <a id="s04-validation-rules"></a>[S04 Validation Rules](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#s04-validation-rules)
- <a id="s05-data-schema"></a>[S05 Data Schema](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#s05-data-schema)
- <a id="node-reference"></a>[Node Reference](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#node-reference)
- <a id="open-questions"></a>[Open Questions](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#open-questions)
- <a id="customization-guide"></a>[Customization Guide](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#customization-guide)
- <a id="frontmatter-variable-map"></a>[Frontmatter variable map](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#frontmatter-variable-map)
- <a id="extension-checklist"></a>[Extension checklist](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#extension-checklist)
- <a id="syntax-quick-reference"></a>[Syntax quick-reference](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#syntax-quick-reference)
- <a id="planning-revision--reference-implementation"></a>[Planning revision — reference implementation](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#planning-revision--reference-implementation)
- <a id="mvp--reference-implementation"></a>[MVP — reference implementation](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#mvp--reference-implementation)
- <a id="gtm--reference-implementation"></a>[GTM — reference implementation](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#gtm--reference-implementation)
- <a id="planning-gaps--reference-implementation"></a>[Planning gaps — reference implementation](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#planning-gaps--reference-implementation)

<a id="product--ai-pipeline"></a> [{{product}} · AI Pipeline](agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.part-01.md#product--ai-pipeline)
