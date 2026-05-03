---
title: "YAML Frontmatter Guidelines for Canvas View Switching"
graphId: "md:yaml-frontmatter-guidelines"
doc_type: "Guidelines"
date: "2026-05-03"
lang: en-US

kgCanvasSurfaceMode: "2d"
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "flowEditor"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
---

# YAML Frontmatter Guidelines for Canvas View Switching

## Overview

These guidelines define the canonical YAML frontmatter contract for documents that must switch cleanly inside `EXPLORER -> Source Files` and land on the intended Canvas View without mutating renderer ownership, document mode state, surface mode state, or widget visibility.

Switch-sensitive `*.md` files should be authored as directly runnable canonical seeds by adding the explicit Canvas View frontmatter block at the top of the file.

## Context-Intent-Directive

| Context | Intent | Directive |
|---|---|---|
| Canvas View | Preserve deterministic landing | - [ ] Declare all Canvas View keys in frontmatter; preserve deterministic landing; forbid partial renderer-only presets |
| Document Modes | Keep frontmatter as SSOT | - [ ] Set `kgDocumentSemanticMode` and `kgFrontmatterModeEnabled` together; keep frontmatter as SSOT; forbid implicit mode carryover |
| Initialization Files | Support Source Files switching | - [ ] Use canonical presets on seed documents; support switching; forbid relying on stale runtime state |
| Multi-dimensional Table | Avoid unintended mode takeover | - [ ] Set `kgMultiDimTableModeEnabled: false` when D3 or Flow Editor frontmatter landing is the target; avoid unintended mode takeover; forbid ambiguous table-mode defaults |
| Surface Modes | Keep surface state frontmatter-driven | - [ ] Set `kgCanvasSurfaceMode` explicitly; keep surface state frontmatter-driven; forbid stored geospatial or 3D carryover |
| Widget Bundles | Preserve overlay ownership | - [ ] Keep Flow Editor widget behavior flags explicit; preserve overlay ownership; forbid cross-renderer proxy interference |

## Architecture Overview

**From initialization-file selection to rendered canvas**: Source Files selection -> ingestion -> frontmatter parsing -> shared preset resolution -> source-file graph materialization -> post-graph Canvas View application -> visible document content and graph.

**From `*.md` document to directly runnable seed**: Authors declare the full Canvas View preset in the opening YAML block -> import and initialization paths consume the same explicit seed contract -> no prior renderer or surface state is required.

## Canonical Presets

README / D3 / Frontmatter Mode:

```yaml
kgCanvasSurfaceMode: "2d"
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "d3"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

Video demo / Flow Editor / Frontmatter Mode:

```yaml
kgCanvasSurfaceMode: "2d"
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "flowEditor"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

3D surface / Document Mode:

```yaml
kgCanvasSurfaceMode: "3d"
kgCanvasRenderMode: "3d"
kgCanvas3dMode: "3d"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: false
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

Geospatial surface / Flow Editor widgets:

```yaml
kgCanvasSurfaceMode: "geospatial"
kgCanvas2dRenderer: "flowEditor"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

Reference document for Geospatial Mode structure:

- `/Users/huijoohwee/Documents/GitHub/sandbox/demo/knowgrph-maps-grabmap-multim-demo.md`

Canonical seed documents aligned to the explicit vocabulary:

- `/Users/huijoohwee/Documents/GitHub/knowgrph/README.md`
- `/Users/huijoohwee/Documents/GitHub/knowgrph/knowgrph-video-demo.md`
- `/Users/huijoohwee/Documents/GitHub/knowgrph/knowgrph-video-demo-seeded.md`
- `/Users/huijoohwee/Documents/GitHub/knowgrph/knowgrph-video-demo-sea.md`
- `/Users/huijoohwee/Documents/GitHub/knowgrph/knowgrph-video-demo-the-general.md`
- `/Users/huijoohwee/Documents/GitHub/sandbox/demo/knowgrph-maps-grabmap-multim-demo.md`
- `/Users/huijoohwee/Documents/GitHub/sandbox/test-data/test-generate-video/knowgrph-demo-video.md`
- `/Users/huijoohwee/Documents/GitHub/sandbox/test-data/test-generate-video/knowgrph-rich-media-generation-demo.md`

## Configuration Reference

**From missing renderer choice to explicit view choice**: Authors set `kgCanvas2dRenderer` to the exact target renderer -> runtime applies the requested Canvas View after graph hydration -> switching stays file-driven.

**From ambiguous mode state to explicit frontmatter mode**: Authors pair `kgDocumentSemanticMode: "document"` with `kgFrontmatterModeEnabled: true` -> runtime avoids stale mode seepage -> Source Files switching stays stable.

**From ambiguous surface state to explicit surface ownership**: Authors set `kgCanvasSurfaceMode` to `2d`, `3d`, or `geospatial` -> runtime normalizes render-mode and geospatial switching through one shared preset path -> surface-state churn stays neutralized upstream.

**From widget bundle definition to visible overlays**: Authors keep Flow Editor widget bundle behavior under `flowEditor-frontmatter-only` -> runtime keeps widget ownership scoped to Flow Editor -> Rich Media Panels stay visible.

Supported `kgCanvas2dRenderer` values:

| Value | Meaning | Usage guidance |
|---|---|---|
| `"d3"` | D3 document graph | Use for README-style document landing |
| `"flowchart"` | Flowchart renderer | Use only when Flowchart rendering is the explicit target |
| `"flow"` | Flow Canvas renderer | Avoid for widget-bundle canonical docs because it is frontmatter-only and can hide widget expectations |
| `"flowEditor"` | Flow Editor renderer | Use for widget-bundle and rich-media documents |
| `"design"` | Design renderer | Use only when design layout is the explicit target |

Alias guidance:

- `Flowchart` should be authored canonically as `kgCanvas2dRenderer: "flowchart"`.
- `Flow Canvas` normalizes to `flow`.
- `Document Structure Mode` normalizes to `document`.
- `Keyword Mode` normalizes to `keyword`.
- `Geospatial Mode` should be authored canonically as `kgCanvasSurfaceMode: "geospatial"`.
- Canonical documents should use normalized values, not aliases.

Surface guidance:

| Key | Meaning | Canonical values |
|---|---|---|
| `kgCanvasSurfaceMode` | Selects the top-level canvas surface | `"2d"`, `"3d"`, `"geospatial"` |
| `kgCanvasRenderMode` | Selects the 2D/3D render family when surface mode is not geospatial | `"2d"`, `"3d"` |
| `kgCanvas3dMode` | Selects the active 3D submode | `"3d"`, `"voxel"` |

## Widget Bundle Contract

Use this block when widgets or Rich Media Panels must remain visible in Flow Editor:

```yaml
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
```

## Validation Guidelines

- [ ] Reviewers confirm the frontmatter block is the first block in the file.
- [ ] Reviewers confirm switch-sensitive `*.md` files are directly runnable canonical seeds with explicit Canvas View frontmatter.
- [ ] Reviewers confirm `kgCanvasSurfaceMode` is explicit for switch-sensitive documents.
- [ ] Reviewers confirm `README.md`-style files use `kgCanvas2dRenderer: "d3"`.
- [ ] Reviewers confirm widget-bundle files use `kgCanvas2dRenderer: "flowEditor"`.
- [ ] Reviewers confirm 3D examples pair `kgCanvasSurfaceMode: "3d"` with `kgCanvas3dMode`.
- [ ] Reviewers confirm geospatial examples use `kgCanvasSurfaceMode: "geospatial"` instead of relying on stored geospatial state.
- [ ] Reviewers confirm `kgMultiDimTableModeEnabled` is explicitly set for switch-sensitive documents.
- [ ] Reviewers confirm canonical docs use normalized values instead of aliases.
- [ ] Reviewers confirm widget-bundle docs keep the Flow Editor behavior contract when overlays are present.

## Anti-Patterns

- Do not omit `kgFrontmatterModeEnabled` and rely on a prior document's mode.
- Do not treat a switch-sensitive `*.md` file as a canonical seed unless it declares the full Canvas View frontmatter block explicitly.
- Do not omit `kgCanvasSurfaceMode` when the document must switch deterministically across 2D, 3D, and Geospatial surfaces.
- Do not use `Flow Canvas` as the canonical renderer label for widget-bundle docs.
- Do not leave `kgMultiDimTableModeEnabled` unspecified when the document must switch deterministically.
- Do not rely on persisted Geospatial Mode when the document itself is map-first.
- Do not mix Flow Editor widget bundles with cross-renderer proxy behavior.
- Do not treat renderer aliases as the canonical authoring format.
