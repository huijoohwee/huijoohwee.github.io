---
title: "Knowgrph YAML Frontmatter Template"
graphId: "md:knowgrph-yaml-frontmatter-template"
doc_type: "Template"
date: "2026-05-03"
lang: en-US

kgCanvasSurfaceMode: "2d"
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "flowEditor"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false

$schema: "kgc-pipeline/v1"

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
    nodes_ref: []
    edges_ref: []
    display:
      direction: LR
      edgeType: bezier
    behavior:
      drag_pan_zoom_owner: flowEditor-frontmatter-only
      rich_media_overlay_handlers: flowEditor-frontmatter-only
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
    A["Replace with your canonical graph"]

flow:
  direction: {key: direction, type: string, value: LR}
  edgeType: {key: edgeType, type: string, value: bezier}
  snapToGrid: {key: snapToGrid, type: boolean, value: true}
  computed: {key: computed, type: boolean, value: true}
  nodes: []
  edges: []
---

# Knowgrph YAML Frontmatter Template

## Architecture Overview

**From markdown source to Canvas View landing**: Ingestion -> frontmatter parsing -> preset resolution -> graph hydration -> renderer, document mode, and surface mode application -> active Canvas View.

**From `*.md` seed file to directly runnable canvas seed**: Authors place the explicit Canvas View frontmatter block at the top of the markdown file -> runtime can ingest the file as-is -> Canvas View switching no longer depends on prior stored UI state.

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

**From default document state to Flow Editor landing**: Author sets `kgCanvasSurfaceMode: "2d"`, `kgCanvasRenderMode: "2d"`, `kgCanvas2dRenderer: "flowEditor"`, `kgDocumentSemanticMode: "document"`, `kgFrontmatterModeEnabled: true`, `kgMultiDimTableModeEnabled: false` -> runtime lands on Flow Editor plus Frontmatter Mode.

**From document preset to 3D landing**: Author sets `kgCanvasSurfaceMode: "3d"` and optionally `kgCanvas3dMode: "3d"` or `kgCanvas3dMode: "voxel"` -> runtime lands on 3D surface mode and disables Geospatial Mode.

**From document preset to Geospatial landing**: Author sets `kgCanvasSurfaceMode: "geospatial"` and a compatible `kgCanvas2dRenderer` such as `flowEditor` -> runtime enables Geospatial Mode while preserving the requested 2D renderer for widget-panel overlays.

**Documenters preserve widget visibility**: Authors keep `widget_bundle.graph.behavior.drag_pan_zoom_owner`, `widget_bundle.graph.behavior.rich_media_overlay_handlers`, and `widget_bundle.graph.behavior.forbid_cross_renderer_proxy` aligned with `flowEditor-frontmatter-only` -> widgets stay visible and renderer proxy interference stays disabled.

## Canvas View Presets

| Use case | Required frontmatter |
|---|---|
| README-style document | `kgCanvasSurfaceMode: "2d"` + `kgCanvasRenderMode: "2d"` + `kgCanvas2dRenderer: "d3"` + `kgDocumentSemanticMode: "document"` + `kgFrontmatterModeEnabled: true` + `kgMultiDimTableModeEnabled: false` |
| Widget bundle document | `kgCanvasSurfaceMode: "2d"` + `kgCanvasRenderMode: "2d"` + `kgCanvas2dRenderer: "flowEditor"` + `kgDocumentSemanticMode: "document"` + `kgFrontmatterModeEnabled: true` + `kgMultiDimTableModeEnabled: false` |
| 3D document | `kgCanvasSurfaceMode: "3d"` + `kgCanvasRenderMode: "3d"` + optional `kgCanvas3dMode: "3d"` or `"voxel"` |
| Geospatial document | `kgCanvasSurfaceMode: "geospatial"` + `kgCanvas2dRenderer: "flowEditor"` + `kgDocumentSemanticMode: "document"` + `kgFrontmatterModeEnabled: true` + `kgMultiDimTableModeEnabled: false` |

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

Canonical Flow Editor preset:

```yaml
kgCanvasSurfaceMode: "2d"
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "flowEditor"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

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
kgCanvas2dRenderer: "flowEditor"
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
| `kgCanvas2dRenderer` | Selects the 2D renderer | `"d3"`, `"flowchart"`, `"flow"`, `"flowEditor"`, `"design"` |
| `kgDocumentSemanticMode` | Selects the document semantic mode | `"document"`, `"keyword"` |
| `kgFrontmatterModeEnabled` | Enables Frontmatter Mode | `true`, `false` |
| `kgMultiDimTableModeEnabled` | Enables Multi-dimensional Table Mode | `true`, `false` |
| `kgDocumentStructureBaselineLock` | Locks or unlocks the document structure baseline | `true`, `false` |

## Validation Guidelines

- [ ] Documenters set the full Canvas View key set in the opening frontmatter block.
- [ ] Documenters treat switch-sensitive `*.md` files as directly runnable canonical seeds by adding the explicit Canvas View frontmatter block at the top of the file.
- [ ] Documenters set `kgCanvasSurfaceMode` explicitly when switching between 2D, 3D, and Geospatial surfaces.
- [ ] Documenters keep `kgFrontmatterModeEnabled: true` for switchable canvas-view documents.
- [ ] Documenters keep `kgMultiDimTableModeEnabled: false` for README-style and Flow Editor widget-bundle documents unless table mode is the explicit target.
- [ ] Documenters use `flowEditor` for widget-bundle documents and avoid `Flow Canvas` or `Flowchart` labels in canonical examples.
- [ ] Documenters use `kgCanvas3dMode` only when `kgCanvasSurfaceMode: "3d"` is the target.
- [ ] Documenters use `kgCanvasSurfaceMode: "geospatial"` for map-first documents instead of relying on stored Geospatial Mode state.
- [ ] Documenters keep widget-bundle behavior flags aligned with Flow Editor ownership when widgets or rich media panels are present.

## Body

Replace this body with the human-readable document content that the canvas should load beside the frontmatter-defined graph surfaces.
