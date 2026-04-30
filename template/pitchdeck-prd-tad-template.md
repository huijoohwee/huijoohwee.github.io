---
title: "{{template_inputs.project_name}}"
graphId: "md:pitchdeck-prd-tad-template"
doc_type: "PitchDeck PRD TAD Template"
date: "{{template_inputs.date}}"
lang: "{{template_inputs.language}}"

$schema: "kgc-pipeline/v1"

template_inputs:
  project_name: "[Project Name]"
  subtitle: "[One-line product promise]"
  date: "[YYYY-MM-DD]"
  language: "en-US"
  version: "0.1.0"
  owner: "[Owner]"
  audience: "[Audience]"
  primary_user: "[Primary user]"
  secondary_user: "[Secondary user]"
  problem_statement: "[Clear problem statement]"
  opportunity_statement: "[Why now?]"
  solution_statement: "[Clear solution statement]"
  core_metric: "[Primary success metric]"
  text_provider: "byteplus-modelark"
  text_auth_mode: "serverManaged"
  text_endpoint_url: "https://ark.ap-southeast.bytepluses.com/api/v3/chat/completions"
  text_model: "[Text model]"
  image_model: "[Image model]"
  video_model: "[Video model]"
  duration_seconds: 6
  aspect_ratio: "16:9"
  text_prompt: "[Generate a structured pitch outline, PRD summary, and TAD summary.]"
  image_prompt: "[Generate one canonical key visual for the concept.]"
  video_prompt: "[Generate one short motion cut that illustrates the concept.]"
  acceptance_checklist: "[Approval checklist]"
  next_action: "[Ask / CTA]"

spec:
  format: kgc-pipeline
  version: "1.0.0"
  parser: yaml-frontmatter
  execution: computing-flow
  topology: DAG
  ssot_surfaces: [widget_bundle, pipeline, flow.nodes, flow.edges, mermaid, runner]

widget_bundle:
  kind: kg:flow:widgetBundle
  version: 1
  registry: []
  graph:
    type: Graph
    context: frontmatter-flow
    metadata: {kind: frontmatter-flow}
    nodes_ref: [w-text-outline, p-text-outline, w-image-keyvisual, p-image-keyvisual, w-video-cut, p-video-cut]
    edges_ref: [e-text-output, e-image-output, e-image-to-video-ref, e-video-output]
    display:
      direction: LR
      edgeType: bezier
    behavior:
      drag_pan_zoom_owner: flowEditor-frontmatter-only
      rich_media_overlay_handlers: flowEditor-frontmatter-only
      forbid_cross_renderer_proxy: true

links:
  yaml_anchor: "#computing-flow-definition"
  body_anchor: "#flow-graph"
  self_ref: "pitchdeck-prd-tad-template.md"

canvas:
  auto_layout: true
  layout_algo: dagre-LR
  snap_to_grid: true
  grid_size: 20
  minimap: true
  controls: true
  node_defaults:
    width: 240
    height: 90
  edge_defaults:
    type: smoothstep
    animated: true

runtime:
  entry: {key: entry, type: string, value: "w-text-outline"}
  exit: {key: exit, type: string, value: "p-video-cut"}
  sandbox: {key: sandbox, type: string, value: "quickjs-emscripten"}
  trace: {key: trace, type: boolean, value: true}
  maxRetry: {key: maxRetry, type: number, value: 0}

graph_meta:
  node_count: 6
  edge_count: 4
  phase_count: 2
  entry_node: w-text-outline
  exit_node: p-video-cut
  phases:
    - id: P1
      label: "Widgets"
      seq_range: "W01-W03"
      nodes: [w-text-outline, w-image-keyvisual, w-video-cut]
    - id: P2
      label: "Render"
      seq_range: "W04-W06"
      nodes: [p-text-outline, p-image-keyvisual, p-video-cut]
  forward_edges:
    - {edge: e-text-output, from: w-text-outline, to: p-text-outline, handle: text_out->output}
    - {edge: e-image-output, from: w-image-keyvisual, to: p-image-keyvisual, handle: imageUrl->imageUrl}
    - {edge: e-image-to-video-ref, from: w-image-keyvisual, to: w-video-cut, handle: imageUrl->reference_image}
    - {edge: e-video-output, from: w-video-cut, to: p-video-cut, handle: videoUrl->videoUrl}

runner:
  entry: R01
  exit: R06
  steps:
    - seq: R01
      action: ingest
      input: "raw file bytes"
      output: "parsed YAML object"
      description: "Parse YAML frontmatter; validate $schema == kgc-pipeline/v1; expose __doc."
    - seq: R02
      action: resolve
      input: "__doc"
      output: "__doc_resolved"
      description: "Resolve {{key}} interpolation for body and tables; expose __doc_resolved."
    - seq: R03
      action: build-graph
      input: "__doc_resolved"
      output: "graph { nodes[], edges[] }"
      description: "Cross-validate SSOT: pipeline[*].node == flow.nodes[*].id.value == mermaid IDs; halt on mismatch."
    - seq: R04
      action: compile-compute
      input: "graph"
      output: "graph (compiled)"
      description: "Compile flow.nodes[*] into runnable widget state; keep typed envelope fidelity."
    - seq: R05
      action: traverse
      input: "graph (compiled)"
      output: "graph (executed)"
      description: "Materialize widget nodes, propagate connected values, and avoid feedback arcs."
    - seq: R06
      action: render
      input: "graph (executed) + mermaid + body"
      output: "rendered Knowledge Graph Canvas"
      description: "Render Flow Graph, Pipeline, PRD, and TAD with Rich Media Panel as the canonical output surface."

pipeline:
  - seq: W01
    node: w-text-outline
    label: "text generation"
    actor: ["user", "AI"]
    edge_in: "prompt_in"
    edge_out: "text_out"
    user_action: "Edit the text prompt and run"
    sys_event: "TextGeneration writes structured output"
    data_in: "properties.prompt"
    data_out: "properties.output"
    trigger: "run"
    on_fail: "output unchanged"
    kanban: TBD
    confidence: high
    status: TBD
  - seq: W02
    node: w-image-keyvisual
    label: "image generation"
    actor: ["user", "AI"]
    edge_in: "reference_image"
    edge_out: "imageUrl"
    user_action: "Edit the image prompt and run"
    sys_event: "ImageGeneration writes imageUrl"
    data_in: "properties.prompt + properties.model + properties.reference_image"
    data_out: "properties.imageUrl"
    trigger: "run"
    on_fail: "imageUrl unchanged"
    kanban: TBD
    confidence: high
    status: TBD
  - seq: W03
    node: w-video-cut
    label: "video generation"
    actor: ["user", "AI"]
    edge_in: "reference_image"
    edge_out: "videoUrl"
    user_action: "Run after an image reference exists"
    sys_event: "VideoGeneration writes videoUrl"
    data_in: "properties.prompt + properties.model + properties.duration + properties.reference_image"
    data_out: "properties.videoUrl"
    trigger: "run"
    on_fail: "videoUrl unchanged"
    kanban: TBD
    confidence: high
    status: TBD

mermaid: |
  %%{init: {"theme": "base", "themeVariables": {"primaryColor":"#E1F5EE","primaryTextColor":"#085041","primaryBorderColor":"#1D9E75","lineColor":"#5F5E5A","secondaryColor":"#E6F1FB","tertiaryColor":"#FAEEDA"}}}%%
  flowchart LR
    classDef widget fill:#E1F5EE,stroke:#1D9E75,color:#085041,stroke-width:1.5px
    classDef panel  fill:#EAF3DE,stroke:#639922,color:#27500A,stroke-width:1.5px

    User([user])

    w-text-outline["Text Widget\nTextGeneration"]
    p-text-outline["Rich Media Panel\nText"]

    w-image-keyvisual["Image Widget\nImageGeneration"]
    p-image-keyvisual["Rich Media Panel\nImage"]

    w-video-cut["Video Widget\nVideoGeneration"]
    p-video-cut["Rich Media Panel\nVideo"]

    User -->|run| w-text-outline
    User -->|run| w-image-keyvisual
    User -->|run| w-video-cut

    w-text-outline -->|text_out -> output| p-text-outline
    w-image-keyvisual -->|imageUrl| p-image-keyvisual
    w-image-keyvisual -->|imageUrl -> reference_image| w-video-cut
    w-video-cut -->|videoUrl| p-video-cut

    class w-text-outline,w-image-keyvisual,w-video-cut widget
    class p-text-outline,p-image-keyvisual,p-video-cut panel

flow:
  direction: {key: direction, type: string, value: LR}
  edgeType: {key: edgeType, type: string, value: bezier}
  snapToGrid: {key: snapToGrid, type: boolean, value: true}
  computed: {key: computed, type: boolean, value: true}

  nodes:
    - id: {key: id, type: string, value: "w-text-outline"}
      type: {key: type, type: string, value: "TextGeneration"}
      label: {key: label, type: string, value: "Text Widget - Outline"}
      phase: {key: phase, type: string, value: "generate"}
      actor: {key: actor, type: array, value: ["user", "AI"]}
      handles: {key: handles, type: object, value: {target: [prompt_in], source: [text_out]}}
      "flow:widgetFormId": {key: flow:widgetFormId, type: string, value: "textGeneration"}
      chatProvider: {key: chatProvider, type: string, value: "{{template_inputs.text_provider}}"}
      chatAuthMode: {key: chatAuthMode, type: string, value: "{{template_inputs.text_auth_mode}}"}
      chatEndpointUrl: {key: chatEndpointUrl, type: string, value: "{{template_inputs.text_endpoint_url}}"}
      chatModel: {key: chatModel, type: select, value: "{{template_inputs.text_model}}"}
      chatThinkingType: {key: chatThinkingType, type: select, value: "disabled"}
      chatReasoningEffort: {key: chatReasoningEffort, type: select, value: "minimal"}
      chatStream: {key: chatStream, type: boolean, value: true}
      prompt: {key: prompt, type: string, value: "{{template_inputs.text_prompt}}"}

    - id: {key: id, type: string, value: "p-text-outline"}
      type: {key: type, type: string, value: "RichMediaPanel"}
      label: {key: label, type: string, value: "Rich Media Panel - Text"}
      phase: {key: phase, type: string, value: "render"}
      actor: {key: actor, type: array, value: ["system", "user"]}
      handles: {key: handles, type: object, value: {target: [output], source: [output]}}
      "flow:widgetFormId": {key: flow:widgetFormId, type: string, value: "richMediaPanel"}
      output: {key: output, type: string, value: ""}
      media_interactive: {key: media_interactive, type: boolean, value: true}

    - id: {key: id, type: string, value: "w-image-keyvisual"}
      type: {key: type, type: string, value: "ImageGeneration"}
      label: {key: label, type: string, value: "Image Widget - Key Visual"}
      phase: {key: phase, type: string, value: "generate"}
      actor: {key: actor, type: array, value: ["user", "AI"]}
      handles: {key: handles, type: object, value: {target: [reference_image], source: [imageUrl]}}
      "flow:widgetFormId": {key: flow:widgetFormId, type: string, value: "imageGeneration"}
      model: {key: model, type: select, value: "{{template_inputs.image_model}}"}
      prompt: {key: prompt, type: textarea, value: "{{template_inputs.image_prompt}}"}
      size: {key: size, type: select, value: "2K"}
      output_format: {key: output_format, type: select, value: "jpeg"}
      response_format: {key: response_format, type: select, value: "b64_json"}
      optimize_prompt_options: {key: optimize_prompt_options, type: select, value: "fast"}
      aspect_ratio: {key: aspect_ratio, type: number, value: 0.0625}
      stream: {key: stream, type: boolean, value: true}
      watermark: {key: watermark, type: boolean, value: false}
      seed: {key: seed, type: number, value: 0}
      guidance_scale: {key: guidance_scale, type: number, value: 0}
      reference_image: {key: reference_image, type: string, value: ""}

    - id: {key: id, type: string, value: "p-image-keyvisual"}
      type: {key: type, type: string, value: "RichMediaPanel"}
      label: {key: label, type: string, value: "Rich Media Panel - Image"}
      phase: {key: phase, type: string, value: "render"}
      actor: {key: actor, type: array, value: ["system", "user"]}
      handles: {key: handles, type: object, value: {target: [imageUrl, outputSrcDoc], source: [imageUrl, outputSrcDoc]}}
      "flow:widgetFormId": {key: flow:widgetFormId, type: string, value: "richMediaPanel"}
      imageUrl: {key: imageUrl, type: string, value: ""}
      outputSrcDoc: {key: outputSrcDoc, type: string, value: ""}
      media_interactive: {key: media_interactive, type: boolean, value: true}

    - id: {key: id, type: string, value: "w-video-cut"}
      type: {key: type, type: string, value: "VideoGeneration"}
      label: {key: label, type: string, value: "Video Widget - Motion Cut"}
      phase: {key: phase, type: string, value: "generate"}
      actor: {key: actor, type: array, value: ["user", "AI"]}
      handles: {key: handles, type: object, value: {target: [reference_image], source: [videoUrl]}}
      "flow:widgetFormId": {key: flow:widgetFormId, type: string, value: "videoGeneration"}
      model: {key: model, type: select, value: "{{template_inputs.video_model}}"}
      prompt: {key: prompt, type: string, value: "{{template_inputs.video_prompt}}"}
      content_json: {key: content_json, type: json, value: []}
      resolution: {key: resolution, type: select, value: "480p"}
      ratio: {key: ratio, type: select, value: "{{template_inputs.aspect_ratio}}"}
      duration: {key: duration, type: number, value: "{{template_inputs.duration_seconds}}"}
      generate_audio: {key: generate_audio, type: boolean, value: false}
      draft: {key: draft, type: boolean, value: true}
      camera_fixed: {key: camera_fixed, type: boolean, value: false}
      image_url_url: {key: image_url_url, type: select, value: "base64"}
      reference_image: {key: reference_image, type: string, value: ""}

    - id: {key: id, type: string, value: "p-video-cut"}
      type: {key: type, type: string, value: "RichMediaPanel"}
      label: {key: label, type: string, value: "Rich Media Panel - Video"}
      phase: {key: phase, type: string, value: "render"}
      actor: {key: actor, type: array, value: ["system", "user"]}
      handles: {key: handles, type: object, value: {target: [videoUrl, outputSrcDoc], source: [videoUrl, outputSrcDoc]}}
      "flow:widgetFormId": {key: flow:widgetFormId, type: string, value: "richMediaPanel"}
      videoUrl: {key: videoUrl, type: string, value: ""}
      outputSrcDoc: {key: outputSrcDoc, type: string, value: ""}
      media_interactive: {key: media_interactive, type: boolean, value: true}

  edges:
    - {id: e-text-output, source: w-text-outline, sourceHandle: text_out, target: p-text-outline, targetHandle: output, label: "text_out -> output", animated: true}
    - {id: e-image-output, source: w-image-keyvisual, sourceHandle: imageUrl, target: p-image-keyvisual, targetHandle: imageUrl, label: "imageUrl -> imageUrl", animated: true}
    - {id: e-image-to-video-ref, source: w-image-keyvisual, sourceHandle: imageUrl, target: w-video-cut, targetHandle: reference_image, label: "imageUrl -> reference_image", animated: true}
    - {id: e-video-output, source: w-video-cut, sourceHandle: videoUrl, target: p-video-cut, targetHandle: videoUrl, label: "videoUrl -> videoUrl", animated: true}
---

# {{template_inputs.project_name}}

## Executive Summary

**Subtitle:** `{{template_inputs.subtitle}}`

**Audience:** `{{template_inputs.audience}}`

**Primary user:** `{{template_inputs.primary_user}}`

**Secondary user:** `{{template_inputs.secondary_user}}`

**Problem:** `{{template_inputs.problem_statement}}`

**Opportunity:** `{{template_inputs.opportunity_statement}}`

**Solution:** `{{template_inputs.solution_statement}}`

**Core metric:** `{{template_inputs.core_metric}}`

**Ask:** `{{template_inputs.next_action}}`

## Template Inputs

Edit `template_inputs.*` first.

Keep frontmatter as the only source of truth for reusable template values.

Avoid adding demo-only narrative, model IDs, or asset URLs into reusable structure.

## Computing Flow Definition

This template follows the same machine contract as the validated YAML-frontmatter flow documents.

YAML frontmatter is the machine-readable SSOT.

Markdown body is the human-readable projection.

`widget_bundle`, `pipeline`, `flow`, `mermaid`, and `runner` must describe the same graph.

## Flow Graph

```mermaid
{{mermaid}}
```

## Pipeline

| seq | `@node:id` | step | user action | system event | data in | data out | trigger |
|---|---|---|---|---|---|---|---|
| `W01` | `@node:w-text-outline` | text generation | edit prompt and run | writes structured output | `properties.prompt` | `properties.output` | `run` |
| `W02` | `@node:w-image-keyvisual` | image generation | edit prompt and run | writes `imageUrl` | `properties.prompt + properties.model + properties.reference_image` | `properties.imageUrl` | `run` |
| `W03` | `@node:w-video-cut` | video generation | run after image exists | writes `videoUrl` | `properties.prompt + properties.model + properties.duration + properties.reference_image` | `properties.videoUrl` | `run` |

## Pitch Deck

### Slide 1 - Problem

Describe the user problem in one paragraph.

Anchor the story to `template_inputs.problem_statement`.

### Slide 2 - Solution

Describe the solution in one paragraph.

Anchor the story to `template_inputs.solution_statement`.

### Slide 3 - Why Now

Explain why the timing matters.

Anchor the story to `template_inputs.opportunity_statement`.

### Slide 4 - Product Motion

Use the frontmatter graph to show how text, image, video, and Rich Media Panel surfaces connect.

### Slide 5 - Metric

State the primary success metric.

Anchor it to `template_inputs.core_metric`.

### Slide 6 - Ask

State the next action or CTA.

Anchor it to `template_inputs.next_action`.

## PRD

### Problem

`{{template_inputs.problem_statement}}`

### Users

| User | Need | Outcome |
|---|---|---|
| `{{template_inputs.primary_user}}` | `[Primary need]` | `[Desired outcome]` |
| `{{template_inputs.secondary_user}}` | `[Secondary need]` | `[Desired outcome]` |

### Goals

| id | Goal | Maps to | Status |
|---|---|---|---|
| `G-01` | One frontmatter document drives text, image, video, and panel render flow. | `@node:w-text-outline` -> `@node:p-video-cut` | TBD |
| `G-02` | Widget outputs route into Rich Media Panel as the canonical render surface. | `@node:p-text-outline`, `@node:p-image-keyvisual`, `@node:p-video-cut` | TBD |
| `G-03` | Field names stay aligned with shared widget and integration registry SSOT. | `flow.nodes[*].properties.*` | TBD |
| `G-04` | Re-runs stay idempotent and avoid duplicate stale surfaces. | `runner`, `pipeline`, `flow.edges` | TBD |

### Non-Goals

Do not add validation-script-specific subject matter.

Do not add local aliases for canonical field keys.

Do not create duplicate render surfaces outside Rich Media Panel.

Do not introduce backward-compat remaps for obsolete template shapes.

### Acceptance Criteria

| id | Scenario | Expected result |
|---|---|---|
| `AC-01` | Text Widget -> Rich Media Panel | Panel renders text through `properties.output`. |
| `AC-02` | Image Widget -> Rich Media Panel | Panel renders image through `properties.imageUrl`. |
| `AC-03` | Image Widget -> Video Widget | Video widget receives `reference_image` from upstream edge. |
| `AC-04` | Video Widget -> Rich Media Panel | Panel renders inline video through `properties.videoUrl`. |
| `AC-05` | Frontmatter edit -> rerender | Graph stays DAG-safe and avoids stale duplicate cards. |

## TAD

### Canonical Registry Alignment

| Surface | Canonical keys | Canonical handles | SSOT directive |
|---|---|---|---|
| Text Widget | `chatProvider`, `chatAuthMode`, `chatEndpointUrl`, `chatModel`, `prompt`, `chatThinkingType`, `chatReasoningEffort`, `chatStream` | `prompt_in`, `text_out` | Reuse shared text widget registry and integration rows. |
| Image Widget | `model`, `prompt`, `size`, `output_format`, `response_format`, `optimize_prompt_options`, `aspect_ratio`, `stream`, `watermark`, `seed`, `guidance_scale`, `reference_image` | `reference_image`, `imageUrl` | Reuse shared image widget registry and integration rows. |
| Video Widget | `model`, `prompt`, `content_json`, `resolution`, `ratio`, `duration`, `generate_audio`, `draft`, `camera_fixed`, `image_url_url`, `reference_image` | `reference_image`, `videoUrl` | Reuse shared video widget registry and integration rows. |
| Rich Media Panel | `output`, `imageUrl`, `videoUrl`, `outputSrcDoc`, `media_interactive` | `output`, `imageUrl`, `videoUrl`, `outputSrcDoc` | Reuse canonical panel registry and writeback helpers. |

### FloatingPanel And Integrations Reuse

| Surface | Reuse rule |
|---|---|
| FloatingPanel Props Panel | Read and write the same canonical `properties.*` keys shown in `flow.nodes`. |
| MainPanel Integrations | Reuse the same field names and semantic rows as the widget registry. |
| Frontmatter KTV rows | Keep typed envelope `{key, type, value}` as the only serialized property shape. |
| Rich Media Panel | Receive connected values through edges before any display-only filtering. |

### Writeback And State Sync

| Rule | Directive |
|---|---|
| `WT-01` | Frontmatter remains the document SSOT. |
| `WT-02` | Props edits write back only to canonical `properties.*` keys. |
| `WT-03` | Connected edge values apply before display filtering or dedupe. |
| `WT-04` | Rich Media Panel remains the canonical output surface. |
| `WT-05` | Text edits write back through `properties.output` only. |
| `WT-06` | Image and video outputs write back through `properties.imageUrl` and `properties.videoUrl` only. |
| `WT-07` | DAG traversal forbids feedback arcs and infinite loops. |

### Render Invariants

| Rule | Check | Pass condition |
|---|---|---|
| `RM-01` | panel survival | Rich Media Panel remains in graph even when values arrive only by edges. |
| `RM-02` | canonical field identity | No local aliases replace canonical widget property keys. |
| `RM-03` | canonical output surface | Final render comes from Rich Media Panel, not duplicated source-widget previews. |
| `RM-04` | idempotent rerun | Re-running the same inputs does not create duplicate stale surfaces. |

### Extension Rules

Add new nodes only through the same typed envelope pattern.

Keep `flow:widgetFormId` canonical: `textGeneration`, `imageGeneration`, `videoGeneration`, `richMediaPanel`.

Keep edges explicit and acyclic.

Add new provider or model values through shared SSOT, not per-document ad hoc keys.

### Forbidden

| Context | Directive |
|---|---|
| Hardcode | Do not embed validation-demo subjects, scripts, or asset URLs. |
| Drift | Do not rename canonical field keys locally. |
| Duplicate renderers | Do not render source-widget media and panel media as separate final surfaces. |
| Legacy shims | Do not add remapping layers for obsolete field names. |
| Local patches | Do not fix SSOT drift in downstream presentation-only code. |
| Recompute churn | Do not add loops, duplicate traversal, or repeated derived writeback. |

## Review Checklist

| Check | Pass condition |
|---|---|
| Frontmatter fidelity | `widget_bundle`, `pipeline`, `flow`, `mermaid`, and `runner` describe the same graph. |
| Registry fidelity | Text, image, video, and panel fields match canonical shared keys. |
| Neutrality | All values remain placeholders or generic defaults. |
| Reusability | No project-only story, provider lock, or demo asset sneaks into the template. |
| Render contract | Rich Media Panel is the only canonical final render surface. |
