---
title: "YAML Frontmatter Guidelines for Canvas View Switching"
graphId: "md:yaml-frontmatter-guidelines"
doc_type: "Guidelines"
date: "2026-05-03"
lang: en-US

kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "flowEditor"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
---

# YAML Frontmatter Guidelines for Canvas View Switching

## Overview

These guidelines define the canonical YAML frontmatter contract for documents that must switch cleanly inside `EXPLORER -> Source Files` and land on the intended Canvas View without mutating renderer ownership, document mode state, or widget visibility.

## Context-Intent-Directive

| Context | Intent | Directive |
|---|---|---|
| Canvas View | Preserve deterministic landing | - [ ] Declare all Canvas View keys in frontmatter; preserve deterministic landing; forbid partial renderer-only presets |
| Document Modes | Keep frontmatter as SSOT | - [ ] Set `kgDocumentSemanticMode` and `kgFrontmatterModeEnabled` together; keep frontmatter as SSOT; forbid implicit mode carryover |
| Initialization Files | Support Source Files switching | - [ ] Use canonical presets on seed documents; support switching; forbid relying on stale runtime state |
| Multi-dimensional Table | Avoid unintended mode takeover | - [ ] Set `kgMultiDimTableModeEnabled: false` when D3 or Flow Editor frontmatter landing is the target; avoid unintended mode takeover; forbid ambiguous table-mode defaults |
| Widget Bundles | Preserve overlay ownership | - [ ] Keep Flow Editor widget behavior flags explicit; preserve overlay ownership; forbid cross-renderer proxy interference |

## Architecture Overview

**From initialization-file selection to rendered canvas**: Source Files selection -> markdown load -> frontmatter preset resolution -> source-file graph materialization -> post-graph Canvas View application -> visible document content and graph.

## Canonical Presets

README / D3 / Frontmatter Mode:

```yaml
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "d3"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

Video demo / Flow Editor / Frontmatter Mode:

```yaml
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "flowEditor"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

## Configuration Reference

**From missing renderer choice to explicit view choice**: Authors set `kgCanvas2dRenderer` to the exact target renderer -> runtime applies the requested Canvas View after graph hydration -> switching stays file-driven.

**From ambiguous mode state to explicit frontmatter mode**: Authors pair `kgDocumentSemanticMode: "document"` with `kgFrontmatterModeEnabled: true` -> runtime avoids stale mode seepage -> Source Files switching stays stable.

**From widget bundle definition to visible overlays**: Authors keep Flow Editor widget bundle behavior under `flowEditor-frontmatter-only` -> runtime keeps widget ownership scoped to Flow Editor -> Rich Media Panels stay visible.

Supported `kgCanvas2dRenderer` values:

| Value | Meaning | Usage guidance |
|---|---|---|
| `"d3"` | D3 document graph | Use for README-style document landing |
| `"d3Bipartite"` | D3 bipartite renderer | Use only when bipartite rendering is the explicit target |
| `"flow"` | Flow Canvas renderer | Avoid for widget-bundle canonical docs because it is frontmatter-only and can hide widget expectations |
| `"flowEditor"` | Flow Editor renderer | Use for widget-bundle and rich-media documents |
| `"design"` | Design renderer | Use only when design layout is the explicit target |

Alias guidance:

- `Flowchart` normalizes to `d3Bipartite`.
- `Flow Canvas` normalizes to `flow`.
- `Document Structure Mode` normalizes to `document`.
- `Keyword Mode` normalizes to `keyword`.
- Canonical documents should use normalized values, not aliases.

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
- [ ] Reviewers confirm `README.md`-style files use `kgCanvas2dRenderer: "d3"`.
- [ ] Reviewers confirm widget-bundle files use `kgCanvas2dRenderer: "flowEditor"`.
- [ ] Reviewers confirm `kgMultiDimTableModeEnabled` is explicitly set for switch-sensitive documents.
- [ ] Reviewers confirm canonical docs use normalized values instead of aliases.
- [ ] Reviewers confirm widget-bundle docs keep the Flow Editor behavior contract when overlays are present.

## Anti-Patterns

- Do not omit `kgFrontmatterModeEnabled` and rely on a prior document's mode.
- Do not use `Flow Canvas` as the canonical renderer label for widget-bundle docs.
- Do not leave `kgMultiDimTableModeEnabled` unspecified when the document must switch deterministically.
- Do not mix Flow Editor widget bundles with cross-renderer proxy behavior.
- Do not treat renderer aliases as the canonical authoring format.
