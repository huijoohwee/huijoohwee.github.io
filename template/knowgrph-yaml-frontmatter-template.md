---
title: "Knowgrph YAML Frontmatter Template"
graphId: "md:knowgrph-yaml-frontmatter-template"
doc_type: "Template"
date: "2026-07-08"
lang: "en-US"

kgCanvasSurfaceMode: "2d"
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "storyboard"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: true
kgDocumentStructureBaselineLock: false

$schema: "kgc-pipeline/v1"

spec:
  format: kgc-pipeline
  version: "1.0.0"
  parser: yaml-frontmatter
  execution: computing-flow
  topology: DAG
  ssot_surfaces: [widget_bundle, pipeline, socket_types, flow.nodes, flow.edges, mermaid, runner]

widget_bundle:
  kind: kg:flow:widgetBundle
  version: 1
  registry: []
  graph:
    type: Graph
    context: frontmatter-flow
    metadata: {kind: frontmatter-flow}
    nodes_ref: []
    edges_ref: []
    display:
      direction: LR
      edgeType: smoothstep
    behavior:
      forbid_cross_renderer_proxy: true

runner:
  entry: R01
  exit: R03
  steps:
    - seq: R01
      action: ingest
      input: "raw file bytes"
      output: "parsed YAML object"
      description: "Parse YAML frontmatter and expose __doc."
    - seq: R02
      action: build-graph
      input: "__doc"
      output: "graph { nodes[], edges[] }"
      description: "Resolve SSOT surfaces into the active graph."
    - seq: R03
      action: render
      input: "graph + body"
      output: "rendered Knowledge Graph Canvas"
      description: "Apply Canvas View preset after graph hydration."

pipeline: []

mermaid: |
  flowchart LR
    source_input["Source input"] --> normalize_context["Normalize context"]
    normalize_context --> compute_graph["Compute graph"]
    compute_graph --> render_canvas["Render canvas"]
    render_canvas --> validate_runtime["Validate runtime"]

socket_types:
  template_source_signal: {color: "#14b8a6", edgeWidthPx: 2, handleStrokeWidthPx: 2, accepts: [template_source_signal]}
  template_context_signal: {color: "#38bdf8", edgeWidthPx: 2, handleStrokeWidthPx: 2, accepts: [template_context_signal]}
  template_graph_signal: {color: "#f59e0b", edgeWidthPx: 3, handleStrokeWidthPx: 3, accepts: [template_graph_signal]}
  template_proof_signal: {color: "#22c55e", edgeWidthPx: 3, handleStrokeWidthPx: 3, accepts: [template_proof_signal]}
flow:
  direction: {key: direction, type: string, value: "LR"}
  edgeType: {key: edgeType, type: string, value: "smoothstep"}
  balancedViewportPreset: {key: balancedViewportPreset, type: string, value: "widgetFrontmatter"}
  computed: {key: computed, type: boolean, value: true}
  snapToGrid: {key: snapToGrid, type: boolean, value: true}
  nodes:
    - id: {key: id, type: string, value: "source_input"}
      type: {key: type, type: string, value: "SourceInputWidget"}
      label: {key: label, type: string, value: "Source input"}
      lane: {key: lane, type: string, value: "Source"}
      position: {key: position, type: object, value: {"x":0,"y":0}}
      handles: {key: handles, type: object, value: {"source":["raw_frontmatter"]}}
      "flow:portTypes": {key: "flow:portTypes", type: object, value: {"out":{"raw_frontmatter":"template_source_signal"}}}
      "flow:widgetFormId": {key: "flow:widgetFormId", type: string, value: "fm:source_input"}
      "frontmatter:primitive": {key: "frontmatter:primitive", type: string, value: "node"}
      "kgc:readingSummary": {key: "kgc:readingSummary", type: string, value: "Author-owned YAML frontmatter is the first SSOT input."}
    - id: {key: id, type: string, value: "normalize_context"}
      type: {key: type, type: string, value: "ContextNormalizeWidget"}
      label: {key: label, type: string, value: "Normalize context"}
      lane: {key: lane, type: string, value: "Context"}
      position: {key: position, type: object, value: {"x":320,"y":0}}
      handles: {key: handles, type: object, value: {"target":["raw_frontmatter"],"source":["normalized_context"]}}
      command: {key: command, type: string, value: "/context.resolve"}
      semantics: {key: semantics, type: list, value: ["#frontmatter", "#no-hardcode"]}
      bindings: {key: bindings, type: list, value: ["@source.frontmatter", "@source.body"]}
      "flow:portTypes": {key: "flow:portTypes", type: object, value: {"in":{"raw_frontmatter":"template_source_signal"},"out":{"normalized_context":"template_context_signal"}}}
      "flow:widgetFormId": {key: "flow:widgetFormId", type: string, value: "fm:normalize_context"}
      "frontmatter:primitive": {key: "frontmatter:primitive", type: string, value: "node"}
      "kgc:readingSummary": {key: "kgc:readingSummary", type: string, value: "Frontmatter and body context are normalized without downstream aliases."}
    - id: {key: id, type: string, value: "compute_graph"}
      type: {key: type, type: string, value: "ComputingFlowWidget"}
      label: {key: label, type: string, value: "Compute graph"}
      lane: {key: lane, type: string, value: "Compute"}
      position: {key: position, type: object, value: {"x":640,"y":0}}
      handles: {key: handles, type: object, value: {"target":["normalized_context"],"source":["computed_graph"]}}
      command: {key: command, type: string, value: "/computing-flow"}
      semantics: {key: semantics, type: list, value: ["#computing-flow", "#runtime-ready"]}
      bindings: {key: bindings, type: list, value: ["@canvas", "@runtime-proof"]}
      "flow:portTypes": {key: "flow:portTypes", type: object, value: {"in":{"normalized_context":"template_context_signal"},"out":{"computed_graph":"template_graph_signal"}}}
      "flow:widgetFormId": {key: "flow:widgetFormId", type: string, value: "fm:compute_graph"}
      "frontmatter:primitive": {key: "frontmatter:primitive", type: string, value: "node"}
      "kgc:readingSummary": {key: "kgc:readingSummary", type: string, value: "The computing-flow graph stays source-owned in KTV YAML."}
    - id: {key: id, type: string, value: "render_canvas"}
      type: {key: type, type: string, value: "CanvasRenderWidget"}
      label: {key: label, type: string, value: "Render canvas"}
      lane: {key: lane, type: string, value: "Render"}
      position: {key: position, type: object, value: {"x":960,"y":0}}
      handles: {key: handles, type: object, value: {"target":["computed_graph"],"source":["rendered_surface"]}}
      command: {key: command, type: string, value: "/canvas.project"}
      semantics: {key: semantics, type: list, value: ["#canvas", "#frontmatter"]}
      bindings: {key: bindings, type: list, value: ["@canvas", "@source.frontmatter"]}
      "flow:portTypes": {key: "flow:portTypes", type: object, value: {"in":{"computed_graph":"template_graph_signal"},"out":{"rendered_surface":"template_graph_signal"}}}
      "flow:widgetFormId": {key: "flow:widgetFormId", type: string, value: "fm:render_canvas"}
      "frontmatter:primitive": {key: "frontmatter:primitive", type: string, value: "node"}
      "kgc:readingSummary": {key: "kgc:readingSummary", type: string, value: "Shared renderer owners project the source graph without proxy mutation."}
    - id: {key: id, type: string, value: "validate_runtime"}
      type: {key: type, type: string, value: "RuntimeValidationWidget"}
      label: {key: label, type: string, value: "Validate runtime"}
      lane: {key: lane, type: string, value: "Proof"}
      position: {key: position, type: object, value: {"x":1280,"y":0}}
      handles: {key: handles, type: object, value: {"target":["rendered_surface"]}}
      command: {key: command, type: string, value: "/runtime-ready.check"}
      semantics: {key: semantics, type: list, value: ["#runtime-ready", "#dev-only"]}
      bindings: {key: bindings, type: list, value: ["@runtime-proof", "@dev-only"]}
      "flow:portTypes": {key: "flow:portTypes", type: object, value: {"in":{"rendered_surface":"template_graph_signal"},"out":{"validation_proof":"template_proof_signal"}}}
      "flow:widgetFormId": {key: "flow:widgetFormId", type: string, value: "fm:validate_runtime"}
      "frontmatter:primitive": {key: "frontmatter:primitive", type: string, value: "node"}
      "kgc:readingSummary": {key: "kgc:readingSummary", type: string, value: "Runtime readiness is proven locally before any publish or deploy step."}
  edges:
    - id: {key: id, type: string, value: "source_to_normalize"}
      source: {key: source, type: string, value: "source_input"}
      sourceHandle: {key: sourceHandle, type: string, value: "raw_frontmatter"}
      target: {key: target, type: string, value: "normalize_context"}
      targetHandle: {key: targetHandle, type: string, value: "raw_frontmatter"}
      type: {key: type, type: string, value: "template_source_signal"}
    - id: {key: id, type: string, value: "normalize_to_compute"}
      source: {key: source, type: string, value: "normalize_context"}
      sourceHandle: {key: sourceHandle, type: string, value: "normalized_context"}
      target: {key: target, type: string, value: "compute_graph"}
      targetHandle: {key: targetHandle, type: string, value: "normalized_context"}
      type: {key: type, type: string, value: "template_context_signal"}
    - id: {key: id, type: string, value: "compute_to_render"}
      source: {key: source, type: string, value: "compute_graph"}
      sourceHandle: {key: sourceHandle, type: string, value: "computed_graph"}
      target: {key: target, type: string, value: "render_canvas"}
      targetHandle: {key: targetHandle, type: string, value: "computed_graph"}
      type: {key: type, type: string, value: "template_graph_signal"}
    - id: {key: id, type: string, value: "render_to_validate"}
      source: {key: source, type: string, value: "render_canvas"}
      sourceHandle: {key: sourceHandle, type: string, value: "rendered_surface"}
      target: {key: target, type: string, value: "validate_runtime"}
      targetHandle: {key: targetHandle, type: string, value: "rendered_surface"}
      type: {key: type, type: string, value: "template_graph_signal"}
---

# Knowgrph YAML Frontmatter Template

## Architecture Overview

**From markdown source to Canvas View landing**: Ingestion -> frontmatter parsing -> KTV computing-flow normalization -> preset resolution -> graph hydration -> renderer, document mode, and surface mode application -> active Canvas View.

**From `*.md` seed file to directly runnable canvas seed**: Authors place the explicit Canvas View frontmatter block at the top of the markdown file -> runtime can ingest KTV `socket_types`, `flow.nodes`, and `flow.edges` as-is -> Canvas View switching no longer depends on prior stored UI state.

## CID

| Context | Intent | Directive |
|---|---|---|
| Document Modes | Preserve explicit semantic switching | - [ ] Declare document-mode keys together; preserve semantic switching; forbid stale mode carryover |
| Ingestion | Keep frontmatter as the first SSOT entry point | - [ ] Parse the opening YAML block first; keep frontmatter authoritative; forbid downstream preset overrides |
| Rendering | Reuse shared preset helpers | - [ ] Apply shared preset resolution upstream; reuse switching helpers; forbid local renderer-only patches |
| Surface Modes | Switch 2D, 3D, and Geospatial deterministically | - [ ] Set canonical surface keys; enforce deterministic landing; forbid ambiguous surface ownership |
| Widget Bundles | Build only when widget-capable surfaces need them | - [ ] Scope widget bundles to widget-capable paths; reduce hot-path cost; forbid unconditional large-bundle work |

## Component Specifications

**From default document state to D3 landing**: Author sets `kgCanvasSurfaceMode: "2d"`, `kgCanvasRenderMode: "2d"`, `kgCanvas2dRenderer: "d3"`, `kgDocumentSemanticMode: "document"`, `kgFrontmatterModeEnabled: true`, `kgMultiDimTableModeEnabled: false` -> runtime lands on D3 plus Frontmatter Mode.

**From default document state to Storyboard landing**: Author sets `kgCanvasSurfaceMode: "2d"`, `kgCanvasRenderMode: "2d"`, `kgCanvas2dRenderer: "storyboard"`, `kgDocumentSemanticMode: "document"`, `kgFrontmatterModeEnabled: true`, and computing-flow KTV fields -> runtime lands on Storyboard plus Frontmatter Mode.

**From default document state to Animatic landing**: Author sets `kgCanvasSurfaceMode: "2d"`, `kgCanvasRenderMode: "2d"`, `kgCanvas2dRenderer: "animatic"`, `kgDocumentSemanticMode: "document"`, `kgFrontmatterModeEnabled: true`, `kgMultiDimTableModeEnabled: false` -> runtime lands on Animatic while reusing the same canonical `flow:` graph contract as Storyboard and treating `timeline.beats.*` as additive timing metadata.

**From empty graph to computing-flow KTV graph**: Author declares `socket_types`, `flow.direction`, `flow.edgeType`, `flow.balancedViewportPreset`, `flow.computed`, `flow.snapToGrid`, KTV node rows, and KTV edge rows -> runtime can render, inspect, and validate the graph without recalculating structure from prose.

**From document preset to 3D landing**: Author sets `kgCanvasSurfaceMode: "3d"` and optionally `kgCanvas3dMode: "3d"` or `kgCanvas3dMode: "voxel"` -> runtime lands on 3D surface mode and disables Geospatial Mode.

**From document preset to Geospatial landing**: Author sets `kgCanvasSurfaceMode: "geospatial"` and a compatible `kgCanvas2dRenderer` such as `storyboard` -> runtime enables Geospatial Mode while preserving the requested 2D renderer for widget-panel overlays.

**Documenters preserve widget visibility**: Authors keep `widget_bundle.graph.behavior` lean and source-owned, retain `forbid_cross_renderer_proxy: true` when overlays are present, and do not author stale renderer-owner aliases such as `flowEditor-frontmatter-only`.

## Canvas View Presets

| Use case | Required frontmatter |
|---|---|
| README-style document | `kgCanvasSurfaceMode: "2d"` + `kgCanvasRenderMode: "2d"` + `kgCanvas2dRenderer: "d3"` + `kgDocumentSemanticMode: "document"` + `kgFrontmatterModeEnabled: true` + `kgMultiDimTableModeEnabled: false` |
| Widget bundle document | `kgCanvasSurfaceMode: "2d"` + `kgCanvasRenderMode: "2d"` + `kgCanvas2dRenderer: "storyboard"` + `kgDocumentSemanticMode: "document"` + `kgFrontmatterModeEnabled: true` + `kgMultiDimTableModeEnabled: false` |
| Computing-flow KTV document | `kgCanvasSurfaceMode: "2d"` + `kgCanvasRenderMode: "2d"` + `kgCanvas2dRenderer: "storyboard"` + `kgFrontmatterModeEnabled: true` + `kgMultiDimTableModeEnabled: true` + `socket_types` + KTV `flow:` |
| Animatic timeline document | `kgCanvasSurfaceMode: "2d"` + `kgCanvasRenderMode: "2d"` + `kgCanvas2dRenderer: "animatic"` + `kgDocumentSemanticMode: "document"` + `kgFrontmatterModeEnabled: true` + shared `flow:` graph + optional `timeline.beats.*` timing |
| 3D document | `kgCanvasSurfaceMode: "3d"` + `kgCanvasRenderMode: "3d"` + optional `kgCanvas3dMode: "3d"` or `"voxel"` |
| Geospatial document | `kgCanvasSurfaceMode: "geospatial"` + `kgCanvas2dRenderer: "storyboard"` + `kgDocumentSemanticMode: "document"` + `kgFrontmatterModeEnabled: true` + `kgMultiDimTableModeEnabled: false` |

Canonical D3 preset:

```yaml
kgCanvasSurfaceMode: "2d"
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "d3"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

Canonical Storyboard preset:

```yaml
kgCanvasSurfaceMode: "2d"
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "storyboard"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

Canonical Animatic preset:

```yaml
kgCanvasSurfaceMode: "2d"
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "animatic"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

Animatic authoring contract:

- Reuse the same canonical `flow:` frontmatter graph contract as Storyboard.
- Keep timeline timing additive under `timeline.beats.*`.
- Do not introduce a parallel animatic-only markdown dialect.

Canonical 3D preset:

```yaml
kgCanvasSurfaceMode: "3d"
kgCanvasRenderMode: "3d"
kgCanvas3dMode: "3d"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: false
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

Canonical Geospatial preset:

```yaml
kgCanvasSurfaceMode: "geospatial"
kgCanvas2dRenderer: "storyboard"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

Geospatial reference template:

- `/Users/huijoohwee/Documents/GitHub/sandbox/demo/knowgrph-maps-grabmap-multim-demo.md`

Canonical seed examples aligned to this vocabulary:

- `/Users/huijoohwee/Documents/GitHub/knowgrph/README.md`
- `/Users/huijoohwee/Documents/GitHub/knowgrph/knowgrph-video-demo.md`
- `/Users/huijoohwee/Documents/GitHub/knowgrph/knowgrph-video-demo-seeded.md`
- `/Users/huijoohwee/Documents/GitHub/knowgrph/knowgrph-video-demo-sea.md`
- `/Users/huijoohwee/Documents/GitHub/knowgrph/knowgrph-video-demo-the-general.md`
- `/Users/huijoohwee/Documents/GitHub/sandbox/demo/knowgrph-maps-grabmap-multim-demo.md`
- `/Users/huijoohwee/Documents/GitHub/sandbox/test-data/test-generate-video/knowgrph-demo-video.md`
- `/Users/huijoohwee/Documents/GitHub/sandbox/test-data/test-generate-video/knowgrph-rich-media-generation-demo.md`

## Configuration Reference

| Key | Meaning | Canonical values |
|---|---|---|
| `kgCanvasSurfaceMode` | Selects the top-level surface mode | `"2d"`, `"3d"`, `"geospatial"` |
| `kgCanvasRenderMode` | Selects 2D or 3D canvas landing | `"2d"`, `"3d"` |
| `kgCanvas3dMode` | Selects the active 3D submode | `"3d"`, `"voxel"` |
| `kgCanvas2dRenderer` | Selects the 2D renderer | `"d3"`, `"flowchart"`, `"flow"`, `"animation"`, `"storyboard"`, `"design"` |
| `kgDocumentSemanticMode` | Selects the document semantic mode | `"document"`, `"keyword"` |
| `kgFrontmatterModeEnabled` | Enables Frontmatter Mode | `true`, `false` |
| `kgMultiDimTableModeEnabled` | Enables Multi-dimensional Table Mode | `true`, `false` |
| `kgDocumentStructureBaselineLock` | Locks or unlocks the document structure baseline | `true`, `false` |
| `socket_types` | Declares typed port/edge signals before graph materialization | Provider-neutral signal ids |
| `flow.direction` | KTV graph direction | `{key: direction, type: string, value: "LR"}` |
| `flow.edgeType` | KTV edge rendering mode | `{key: edgeType, type: string, value: "smoothstep"}` |
| `flow.balancedViewportPreset` | KTV viewport fit owner | `{key: balancedViewportPreset, type: string, value: "widgetFrontmatter"}` |
| `flow.nodes[*]` | KTV node rows with handles, port types, commands, semantics, and bindings | `{key, type, value}` rows |
| `flow.edges[*]` | KTV edge rows that reference source, target, handles, and socket type | `{key, type, value}` rows |

## Validation Guidelines

- [ ] Documenters set the full Canvas View key set in the opening frontmatter block.
- [ ] Documenters use KTV objects for computing-flow graph settings, node fields, and edge fields.
- [ ] Documenters declare `socket_types` before `flow:` and reference only declared socket ids from `flow:portTypes` and `flow.edges[*].type`.
- [ ] Documenters include `flow.balancedViewportPreset: {key: balancedViewportPreset, type: string, value: "widgetFrontmatter"}` for frontmatter-owned computing-flow graphs.
- [ ] Documenters treat switch-sensitive `*.md` files as directly runnable canonical seeds by adding the explicit Canvas View frontmatter block at the top of the file.
- [ ] Documenters set `kgCanvasSurfaceMode` explicitly when switching between 2D, 3D, and Geospatial surfaces.
- [ ] Documenters keep `kgFrontmatterModeEnabled: true` for switchable canvas-view documents.
- [ ] Documenters keep `kgMultiDimTableModeEnabled: false` for README-style and Storyboard widget-bundle documents unless table mode is the explicit target.
- [ ] Documenters use `storyboard` for widget-bundle documents and avoid `Flow Canvas` or `Flowchart` labels in canonical examples.
- [ ] Documenters use `animation` only when the file reuses the shared `flow:` graph contract and keeps timing under `timeline.beats.*`.
- [ ] Documenters use `kgCanvas3dMode` only when `kgCanvasSurfaceMode: "3d"` is the target.
- [ ] Documenters use `kgCanvasSurfaceMode: "geospatial"` for map-first documents instead of relying on stored Geospatial Mode state.
- [ ] Documenters keep widget-bundle behavior lean, retain `forbid_cross_renderer_proxy: true` when widgets or rich media panels are present, and do not author stale renderer-owner aliases.

## Body

Replace this body with the human-readable document content that the canvas should load beside the frontmatter-defined graph surfaces.
