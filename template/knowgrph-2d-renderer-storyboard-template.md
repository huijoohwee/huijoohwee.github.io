---
title: "Knowgrph 2D Renderer Storyboard Template"
graphId: "md:knowgrph-2d-renderer-storyboard-template"
doc_type: "Template"
date: "2026-07-08"
lang: "en-US"
schema: "kgc-2d-renderer-storyboard-template/v1"
source_reference: "huijoohwee/docs/knowgrph-strybldr-starter-template.md"
template_policy: "Universal, neutral, provider-agnostic Storyboard seed for frontmatter-owned 2D renderer authoring; runtime outputs stay blank until operator-approved local or live runs return evidence."
validation_input_forbid_hardcode_in_repo: "true"
deployed_api_claim: "false"

kgCanvasSurfaceMode: "2d"
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "storyboard"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
kgStrybldrStoryboard: true
kgBottomPanelOpen: true
kgBottomPanelTab: "timeline"
kgFloatingPanelOpen: true
kgFloatingPanelView: "strybldr"

runtime_readiness:
  status: "template-ready"
  default_runtime: "local-dry-run-first"
  paid_call_count: 0
  publish_scope: "local-only"
  provider_job_id: ""
  stream_url: ""
  generated_asset_url: ""
  runtime_proof_path: ""
  prod_mirror: "blocked until operator instruction"
  cloudflare: "blocked until operator instruction"

agentic_os_contract:
  version: "agentic-os-invocation-grammar/v1"
  docs_root: "huijoohwee/agentic-os-docs"
  slash_routes:
    - "/memory.seed"
    - "/source.normalize"
    - "/harness.define"
    - "/canvas.project"
    - "/runtime-ready.check"
    - "/validation.run"
    - "/deploy.guard"
  semantic_routes:
    - "#frontmatter"
    - "#harness"
    - "#token-economics"
    - "#runtime-ready"
    - "#canvas"
    - "#approval-gate"
    - "#dev-only"
    - "#no-hardcode"
  binding_routes:
    - "@source.frontmatter"
    - "@source.body"
    - "@local-harness"
    - "@runtime-proof"
    - "@cost-log"
    - "@canvas"
    - "@operator"
    - "@dev-only"

shared_renderer_contract:
  version: "shared-renderer-contract/v1"
  semantic_identity: "buildScopedGraphSemanticKey"
  renderer_id: "storyboard"
  renderer_policy: "Frontmatter and authored source payloads own data; Storyboard projects view state only."
  surfaces:
    - "2D Renderer: Storyboard"
    - "Cards"
    - "Widgets"
    - "Rich Media Panels"
    - "BottomPanel Timeline"
  edge_model: "Explicit flow.edges are source-owned SSOT; visible connectors are renderer projections."
  no_legacy_aliases: true
  no_downstream_patches: true

semantic_html_projection:
  version: "semantic-html-projection/v1"
  required_landmarks:
    - "main"
    - "section"
    - "article"
    - "header"
    - "nav"
    - "aside"
    - "figure"
    - "figcaption"
    - "table"
  forbidden_generic_wrapper_policy: "Use generic div only for layout-only wrappers that have no semantic role; never use it as the primary surface boundary."

storyboard_template_inputs:
  source_url: ""
  source_title: "Untitled source"
  source_author: ""
  operator_notes: ""
  target_brief: "Create source-backed storyboard cards, reusable elements, a local runtime proof path, and a visible deploy guard."
  approval_state: "draft"
  live_generation_approval: "blocked"

runtime_pipeline:
  version: "storyboard-runtime-pipeline/v1"
  status: "spec-complete"
  stages:
    - id: "source"
      lane: "Source"
      command: "/source.normalize"
      bindings: ["@source.frontmatter", "@source.body"]
      semantics: ["#frontmatter", "#no-hardcode"]
      output: "normalized source brief"
      paid_call_count: 0
    - id: "ideation"
      lane: "Ideation"
      command: "/memory.seed"
      bindings: ["@source.frontmatter", "@source.body"]
      semantics: ["#frontmatter", "#token-economics"]
      output: "paraphrased storyboard hypotheses"
      paid_call_count: 0
    - id: "invocation"
      lane: "Invocation"
      command: "/harness.define"
      bindings: ["@local-harness", "@cost-log"]
      semantics: ["#harness", "#approval-gate"]
      output: "typed run manifest and cost bounds"
      paid_call_count: 0
    - id: "projection"
      lane: "Storyboard"
      command: "/canvas.project"
      bindings: ["@canvas", "@runtime-proof"]
      semantics: ["#canvas", "#runtime-ready"]
      output: "frontmatter-owned Storyboard cards"
      paid_call_count: 0
    - id: "validation"
      lane: "Runtime"
      command: "/runtime-ready.check"
      bindings: ["@runtime-proof", "@dev-only"]
      semantics: ["#runtime-ready", "#dev-only"]
      output: "local proof path or blocked status"
      paid_call_count: 0
    - id: "deploy_guard"
      lane: "Publish"
      command: "/deploy.guard"
      bindings: ["@operator", "@dev-only"]
      semantics: ["#approval-gate", "#dev-only"]
      output: "local-only release boundary"
      paid_call_count: 0

socket_types:
  storyboard_source_signal: {color: "#14b8a6", edgeWidthPx: 2, handleStrokeWidthPx: 2, accepts: [storyboard_source_signal]}
  storyboard_plan_signal: {color: "#38bdf8", edgeWidthPx: 2, handleStrokeWidthPx: 2, accepts: [storyboard_plan_signal]}
  storyboard_runtime_signal: {color: "#f59e0b", edgeWidthPx: 3, handleStrokeWidthPx: 3, accepts: [storyboard_runtime_signal]}
  storyboard_publish_signal: {color: "#22c55e", edgeWidthPx: 3, handleStrokeWidthPx: 3, accepts: [storyboard_publish_signal]}
flow:
  direction: {key: direction, type: string, value: "LR"}
  edgeType: {key: edgeType, type: string, value: "smoothstep"}
  balancedViewportPreset: {key: balancedViewportPreset, type: string, value: "widgetFrontmatter"}
  computed: {key: computed, type: boolean, value: true}
  snapToGrid: {key: snapToGrid, type: boolean, value: true}
  nodes:
    - id: {key: id, type: string, value: "source"}
      type: {key: type, type: string, value: "SourceBriefWidget"}
      label: {key: label, type: string, value: "Source"}
      lane: {key: lane, type: string, value: "Source"}
      position: {key: position, type: object, value: {"x":0,"y":0}}
      handles: {key: handles, type: object, value: {"source":["normalized_source"]}}
      "flow:portTypes": {key: "flow:portTypes", type: object, value: {"out":{"normalized_source":"storyboard_source_signal"}}}
      "frontmatter:primitive": {key: "frontmatter:primitive", type: string, value: "node"}
      "kgc:readingSummary": {key: "kgc:readingSummary", type: string, value: "Operator-owned source fields are normalized before ideation."}
    - id: {key: id, type: string, value: "ideation"}
      type: {key: type, type: string, value: "AgenticInvocationWidget"}
      label: {key: label, type: string, value: "Ideation"}
      lane: {key: lane, type: string, value: "Ideation"}
      position: {key: position, type: object, value: {"x":320,"y":0}}
      handles: {key: handles, type: object, value: {"target":["normalized_source"],"source":["candidate_beats"]}}
      command: {key: command, type: string, value: "/memory.seed"}
      semantics: {key: semantics, type: array, value: ["#frontmatter","#token-economics"]}
      bindings: {key: bindings, type: array, value: ["@source.frontmatter","@source.body"]}
      "flow:portTypes": {key: "flow:portTypes", type: object, value: {"in":{"normalized_source":"storyboard_source_signal"},"out":{"candidate_beats":"storyboard_plan_signal"}}}
      "frontmatter:primitive": {key: "frontmatter:primitive", type: string, value: "node"}
      "kgc:readingSummary": {key: "kgc:readingSummary", type: string, value: "Zero-spend ideation creates paraphrased storyboard hypotheses."}
    - id: {key: id, type: string, value: "invocation"}
      type: {key: type, type: string, value: "HarnessPlanWidget"}
      label: {key: label, type: string, value: "Invocation"}
      lane: {key: lane, type: string, value: "Invocation"}
      position: {key: position, type: object, value: {"x":640,"y":0}}
      handles: {key: handles, type: object, value: {"target":["candidate_beats"],"source":["bounded_manifest"]}}
      command: {key: command, type: string, value: "/harness.define"}
      semantics: {key: semantics, type: array, value: ["#harness","#approval-gate"]}
      bindings: {key: bindings, type: array, value: ["@local-harness","@cost-log"]}
      "flow:portTypes": {key: "flow:portTypes", type: object, value: {"in":{"candidate_beats":"storyboard_plan_signal"},"out":{"bounded_manifest":"storyboard_plan_signal"}}}
      "frontmatter:primitive": {key: "frontmatter:primitive", type: string, value: "node"}
      "kgc:readingSummary": {key: "kgc:readingSummary", type: string, value: "Typed harness manifest gates cost, approval, and bounds before execution."}
    - id: {key: id, type: string, value: "projection"}
      type: {key: type, type: string, value: "StoryboardProjectionWidget"}
      label: {key: label, type: string, value: "Storyboard"}
      lane: {key: lane, type: string, value: "Storyboard"}
      position: {key: position, type: object, value: {"x":960,"y":0}}
      handles: {key: handles, type: object, value: {"target":["bounded_manifest"],"source":["storyboard_cards"]}}
      command: {key: command, type: string, value: "/canvas.project"}
      semantics: {key: semantics, type: array, value: ["#canvas","#runtime-ready"]}
      bindings: {key: bindings, type: array, value: ["@canvas","@runtime-proof"]}
      "flow:portTypes": {key: "flow:portTypes", type: object, value: {"in":{"bounded_manifest":"storyboard_plan_signal"},"out":{"storyboard_cards":"storyboard_runtime_signal"}}}
      "frontmatter:primitive": {key: "frontmatter:primitive", type: string, value: "node"}
      "kgc:readingSummary": {key: "kgc:readingSummary", type: string, value: "Storyboard renderer projects frontmatter-owned cards without owning source data."}
    - id: {key: id, type: string, value: "validation"}
      type: {key: type, type: string, value: "RuntimeGateWidget"}
      label: {key: label, type: string, value: "Runtime"}
      lane: {key: lane, type: string, value: "Runtime"}
      position: {key: position, type: object, value: {"x":1280,"y":0}}
      handles: {key: handles, type: object, value: {"target":["storyboard_cards"],"source":["runtime_proof"]}}
      command: {key: command, type: string, value: "/runtime-ready.check"}
      semantics: {key: semantics, type: array, value: ["#runtime-ready","#dev-only"]}
      bindings: {key: bindings, type: array, value: ["@runtime-proof","@dev-only"]}
      "flow:portTypes": {key: "flow:portTypes", type: object, value: {"in":{"storyboard_cards":"storyboard_runtime_signal"},"out":{"runtime_proof":"storyboard_runtime_signal"}}}
      "frontmatter:primitive": {key: "frontmatter:primitive", type: string, value: "node"}
      "kgc:readingSummary": {key: "kgc:readingSummary", type: string, value: "Local runtime proof is required before any live provider evidence claim."}
    - id: {key: id, type: string, value: "deploy_guard"}
      type: {key: type, type: string, value: "DeployGuardWidget"}
      label: {key: label, type: string, value: "Publish"}
      lane: {key: lane, type: string, value: "Publish"}
      position: {key: position, type: object, value: {"x":1600,"y":0}}
      handles: {key: handles, type: object, value: {"target":["runtime_proof"],"source":["local_only_boundary"]}}
      command: {key: command, type: string, value: "/deploy.guard"}
      semantics: {key: semantics, type: array, value: ["#approval-gate","#dev-only"]}
      bindings: {key: bindings, type: array, value: ["@operator","@dev-only"]}
      "flow:portTypes": {key: "flow:portTypes", type: object, value: {"in":{"runtime_proof":"storyboard_runtime_signal"},"out":{"local_only_boundary":"storyboard_publish_signal"}}}
      "frontmatter:primitive": {key: "frontmatter:primitive", type: string, value: "node"}
      "kgc:readingSummary": {key: "kgc:readingSummary", type: string, value: "Publish remains local-only until explicit operator approval opens Prod or Cloudflare."}
  edges:
    - {"id":"edge_source_to_ideation","source":"source","sourceHandle":"normalized_source","target":"ideation","targetHandle":"normalized_source","label":"normalized source","type":"storyboard_source_signal"}
    - {"id":"edge_ideation_to_invocation","source":"ideation","sourceHandle":"candidate_beats","target":"invocation","targetHandle":"candidate_beats","label":"candidate beats","type":"storyboard_plan_signal"}
    - {"id":"edge_invocation_to_projection","source":"invocation","sourceHandle":"bounded_manifest","target":"projection","targetHandle":"bounded_manifest","label":"bounded manifest","type":"storyboard_plan_signal"}
    - {"id":"edge_projection_to_validation","source":"projection","sourceHandle":"storyboard_cards","target":"validation","targetHandle":"storyboard_cards","label":"storyboard cards","type":"storyboard_runtime_signal"}
    - {"id":"edge_validation_to_deploy_guard","source":"validation","sourceHandle":"runtime_proof","target":"deploy_guard","targetHandle":"runtime_proof","label":"runtime proof","type":"storyboard_publish_signal"}

flow_diagrams:
  key: "flow_diagrams"
  type: "object"
  value:
    storyboard_runtime_gantt:
      key: "storyboard_runtime_gantt"
      type: "mermaid_gantt"
      floatingPanelView: "gantt"
      bottomPanelTab: "gantt"
      value: |-
        gantt
          title Storyboard Runtime Pipeline
          dateFormat HH:mm
          axisFormat %H:%M
          section Local-first
          Source : source, 00:00, 0.167m
          Ideation : ideation, after source, 0.167m
          Invocation : invocation, after ideation, 0.167m
          Storyboard projection : projection, after invocation, 0.167m
          Runtime gate : validation, after projection, 0.167m
          Deploy guard : deploy_guard, after validation, 0.167m
    storyboard_flowchart:
      key: "storyboard_flowchart"
      type: "mermaid_flowchart"
      floatingPanelView: "flowchart"
      bottomPanelTab: "flowchart"
      value: |-
        flowchart LR
          source["Source frontmatter and body"]
          ideation["/memory.seed"]
          invocation["/harness.define"]
          projection["/canvas.project Storyboard"]
          validation["/runtime-ready.check"]
          deploy_guard["/deploy.guard local-only"]
          source --> ideation --> invocation --> projection --> validation --> deploy_guard

strybldr_storyboard:
  version: "1"
  runId: "knowgrph-2d-renderer-storyboard-template"
  notes: "Neutral Storyboard renderer seed. Replace source fields with operator-owned inputs before live provider calls."
  workflow:
    stages:
      - "Source"
      - "Ideation"
      - "Invocation"
      - "Storyboard"
      - "Elements"
      - "Runtime"
      - "Review"
      - "Publish"
    publish:
      id: "local-publish-packet"
      label: "Local publish packet"
      policy: "Write local packet fields only; do not claim Prod, Cloudflare, provider IDs, or stream URLs without explicit operator approval and returned evidence."
  sources:
    - sourceUnitId: "storyboard-template-source"
      workspacePath: "template/knowgrph-2d-renderer-storyboard-template.md"
      relativePath: "knowgrph-2d-renderer-storyboard-template.md"
      originalName: "Storyboard template source"
      mediaKind: "doc"
      mimeHint: "text/markdown"
      mediaUrl: ""
  elements:
    - id: "source-brief-card"
      sourceUnitId: "storyboard-template-source"
      label: "Source brief"
      lane: "Source"
      order: 1
      evidenceKind: "source-metadata"
      provider: "knowgrph"
      prompt: "Summarize the operator-owned source without copying transcript text or generated output."
      action: "Fill source fields before approving storyboard cards."
      summary: "Capture source URL, title, author, constraints, and notes."
    - id: "ideation-card"
      sourceUnitId: "storyboard-template-source"
      label: "Ideation"
      lane: "Ideation"
      order: 2
      evidenceKind: "agentic-os-invocation"
      provider: "knowgrph"
      prompt: "Run /memory.seed #frontmatter #token-economics @source.frontmatter @source.body."
      action: "Keep ideas paraphrased, source-backed, and zero-spend."
      summary: "Derive candidate beats and reuse constraints."
    - id: "invocation-card"
      sourceUnitId: "storyboard-template-source"
      label: "Invocation"
      lane: "Invocation"
      order: 3
      evidenceKind: "harness-plan"
      provider: "knowgrph"
      prompt: "Run /harness.define #harness #approval-gate @local-harness @cost-log."
      action: "Produce typed invocation bounds before model or media calls."
      summary: "Bind commands, max iterations, cost ledger, and approval gates."
    - id: "storyboard-card"
      sourceUnitId: "storyboard-template-source"
      label: "Storyboard projection"
      lane: "Storyboard"
      order: 4
      evidenceKind: "runtime-plan"
      provider: "knowgrph"
      prompt: "Run /canvas.project #canvas #runtime-ready @canvas @runtime-proof."
      action: "Project approved beats into frontmatter-owned cards."
      summary: "Renderer displays cards without owning source data."
    - id: "elements-card"
      sourceUnitId: "storyboard-template-source"
      label: "Reusable elements"
      lane: "Elements"
      order: 5
      evidenceKind: "user-edit"
      provider: "knowgrph"
      prompt: "Convert approved beats into reusable elements and constraints."
      action: "Leave generated media URLs blank until real outputs exist."
      summary: "List reusable characters, places, props, UI states, shots, or evidence cards."
    - id: "runtime-gate-card"
      sourceUnitId: "storyboard-template-source"
      label: "Runtime gate"
      lane: "Runtime"
      order: 6
      evidenceKind: "runtime-proof"
      provider: "knowgrph-local"
      prompt: "Run /runtime-ready.check #runtime-ready #dev-only @runtime-proof @dev-only."
      action: "Generate local proof first; require operator approval before paid or mutating provider calls."
      summary: "Runtime-ready means source-backed, parseable, locally provable, and cost-bounded."
    - id: "review-card"
      sourceUnitId: "storyboard-template-source"
      label: "Review"
      lane: "Review"
      order: 7
      evidenceKind: "runtime-review"
      provider: "knowgrph"
      prompt: "Separate local evidence from live provider evidence."
      action: "Reject fabricated IDs, stream URLs, transcripts, credentials, or generated asset URLs."
      summary: "Review provenance, approvals, cost, and runtime proof."
    - id: "publish-card"
      sourceUnitId: "storyboard-template-source"
      label: "Publish guard"
      lane: "Publish"
      order: 8
      evidenceKind: "runtime-publish"
      provider: "knowgrph"
      prompt: "Run /deploy.guard #approval-gate #dev-only @operator @dev-only."
      action: "Keep publish scope local-only until the operator explicitly authorizes Prod or Cloudflare."
      summary: "Final output is a local packet path and gate status, not a deployment claim."
  cards: []
---

# Knowgrph 2D Renderer Storyboard Template

This template is a runtime-ready seed for the shared `2D Renderer: Storyboard` surface. It keeps the opening YAML frontmatter as the source of truth, uses the Agentic OS `/`, `#`, and `@` invocation grammar, and defaults to local dry-run proof with `paid_call_count: 0`.

## Runtime Path

| Stage | Invocation | Output | Gate |
|---|---|---|---|
| Source | `/source.normalize #frontmatter @source.frontmatter @source.body` | Normalized source brief | Operator-owned source only |
| Ideation | `/memory.seed #token-economics @source.body` | Paraphrased storyboard hypotheses | Zero paid calls |
| Invocation | `/harness.define #harness @local-harness @cost-log` | Typed run manifest | Approval required before spend |
| Storyboard | `/canvas.project #canvas @canvas` | Frontmatter-owned Storyboard cards | Renderer projects view state only |
| Runtime | `/runtime-ready.check #runtime-ready @runtime-proof` | Local proof path or blocked status | No fabricated provider evidence |
| Publish | `/deploy.guard #dev-only @operator @dev-only` | Local-only release boundary | No Prod or Cloudflare without instruction |

## Semantic HTML Projection

Storyboard exports and embedded previews should map card groups to semantic boundaries: `main` for the document surface, `section` for lanes, `article` for cards, `header` for titles, `nav` for actions, `aside` for runtime proof, `figure` and `figcaption` for media, and `table` for structured evidence. Use generic `div` only for layout-only wrappers with no semantic responsibility.

## Use

1. Open this Markdown file in Knowgrph.
2. Confirm Canvas View reports `2D Renderer: Storyboard`.
3. Fill `storyboard_template_inputs` with operator-owned source data.
4. Run `/memory.seed`, `/harness.define`, and `/canvas.project` before any live provider call.
5. Run `/runtime-ready.check` and keep `runtime_readiness.paid_call_count: 0` unless a real approved call returns evidence.
6. Keep `/deploy.guard` active unless the operator explicitly authorizes Prod or Cloudflare.

## Acceptance Checklist

- [ ] Opening YAML frontmatter remains byte-zero and parseable.
- [ ] `kgCanvas2dRenderer` remains `storyboard`; no `strybldr` renderer alias is introduced.
- [ ] `flow.nodes`, `flow.edges`, `flow_diagrams`, and `strybldr_storyboard.elements` describe the same source-owned workflow.
- [ ] Runtime fields for provider jobs, stream URLs, generated assets, and proof paths stay blank until real evidence exists.
- [ ] Local dry-run proof is accepted before any paid or mutating provider call.
- [ ] Prod and Cloudflare stay blocked until explicit operator instruction.
- [ ] Semantic HTML projection uses landmarks for surface boundaries and avoids generic wrapper-first markup.

## Guardrails

- Do not hardcode source-specific media IDs, credentials, provider IDs, stream URLs, transcripts, or generated asset URLs in repo code, tests, or templates.
- Do not add backward-compatibility aliases for stale renderer names.
- Do not backfill generated outputs into the source template.
- Do not duplicate renderer state in downstream panels; reuse the shared Storyboard renderer contract.
- Do not promote a document from `spec-complete` to `runtime-ready` without local proof from `/runtime-ready.check`.
