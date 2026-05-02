---
title: "Knowgrph YAML Frontmatter Template"
graphId: "md:knowgrph-yaml-frontmatter-template"
doc_type: "Template"
date: "2026-05-03"
lang: en-US

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

**From markdown source to Canvas View landing**: Frontmatter parser -> preset resolver -> graph hydration -> renderer and document mode application -> active Canvas View.

## Component Specifications

**From default document state to D3 landing**: Author sets `kgCanvasRenderMode: "2d"`, `kgCanvas2dRenderer: "d3"`, `kgDocumentSemanticMode: "document"`, `kgFrontmatterModeEnabled: true`, `kgMultiDimTableModeEnabled: false` -> runtime lands on D3 plus Frontmatter Mode.

**From default document state to Flow Editor landing**: Author sets `kgCanvasRenderMode: "2d"`, `kgCanvas2dRenderer: "flowEditor"`, `kgDocumentSemanticMode: "document"`, `kgFrontmatterModeEnabled: true`, `kgMultiDimTableModeEnabled: false` -> runtime lands on Flow Editor plus Frontmatter Mode.

**Documenters preserve widget visibility**: Authors keep `widget_bundle.graph.behavior.drag_pan_zoom_owner`, `widget_bundle.graph.behavior.rich_media_overlay_handlers`, and `widget_bundle.graph.behavior.forbid_cross_renderer_proxy` aligned with `flowEditor-frontmatter-only` -> widgets stay visible and renderer proxy interference stays disabled.

## Canvas View Presets

| Use case | Required frontmatter |
|---|---|
| README-style document | `kgCanvasRenderMode: "2d"` + `kgCanvas2dRenderer: "d3"` + `kgDocumentSemanticMode: "document"` + `kgFrontmatterModeEnabled: true` + `kgMultiDimTableModeEnabled: false` |
| Widget bundle document | `kgCanvasRenderMode: "2d"` + `kgCanvas2dRenderer: "flowEditor"` + `kgDocumentSemanticMode: "document"` + `kgFrontmatterModeEnabled: true` + `kgMultiDimTableModeEnabled: false` |

Canonical D3 preset:

```yaml
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "d3"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

Canonical Flow Editor preset:

```yaml
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "flowEditor"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

## Configuration Reference

| Key | Meaning | Canonical values |
|---|---|---|
| `kgCanvasRenderMode` | Selects 2D or 3D canvas landing | `"2d"`, `"3d"` |
| `kgCanvas2dRenderer` | Selects the 2D renderer | `"d3"`, `"d3Bipartite"`, `"flow"`, `"flowEditor"`, `"design"` |
| `kgDocumentSemanticMode` | Selects the document semantic mode | `"document"`, `"keyword"` |
| `kgFrontmatterModeEnabled` | Enables Frontmatter Mode | `true`, `false` |
| `kgMultiDimTableModeEnabled` | Enables Multi-dimensional Table Mode | `true`, `false` |
| `kgDocumentStructureBaselineLock` | Locks or unlocks the document structure baseline | `true`, `false` |

## Validation Guidelines

- [ ] Documenters set the full Canvas View key set in the opening frontmatter block.
- [ ] Documenters keep `kgFrontmatterModeEnabled: true` for switchable canvas-view documents.
- [ ] Documenters keep `kgMultiDimTableModeEnabled: false` for README-style and Flow Editor widget-bundle documents unless table mode is the explicit target.
- [ ] Documenters use `flowEditor` for widget-bundle documents and avoid `Flow Canvas` or `Flowchart` labels in canonical examples.
- [ ] Documenters keep widget-bundle behavior flags aligned with Flow Editor ownership when widgets or rich media panels are present.

## Body

Replace this body with the human-readable document content that the canvas should load beside the frontmatter-defined graph surfaces.
