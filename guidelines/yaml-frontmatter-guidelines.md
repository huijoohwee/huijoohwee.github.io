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

## Enforcement Rules

- The YAML frontmatter block must be the first block in the Markdown file; do not place prose, comments, HTML, or code fences before it.
- Canonical authored docs use plain YAML for frontmatter keys, `flow:`, `timeline.*`, and related schema-bearing sections.
- Normalized `{key, type, value}` wrappers are permitted only in dedicated validation fixtures that explicitly test E2E ingest -> parse -> render behavior.
- Scalars that contain reserved punctuation, including inline values with `:`, must be quoted so the frontmatter remains valid YAML under strict parsers.
- Parser repair or warning paths are safety nets, not authoring targets; malformed YAML frontmatter must be treated as invalid source that needs correction upstream.
- Do not split metadata ownership across duplicate blocks, renderer-only aliases, or body-only mirror declarations when the same value belongs in frontmatter.
- Keep one frontmatter block per Markdown document. Do not close frontmatter, place metadata in the body, and reopen or mirror schema-bearing YAML later in the file.
- Flow Editor graph topology, node metadata, renderer presets, workflow sections, and KGC-readable node summaries live in frontmatter. The Markdown body may reference node ids in prose, tables, and checklists, but it must not re-declare nodes, edges, ports, or summaries as a parallel hand-maintained layer.
- Use node-owned fields such as `kgc:readingSummary` for concise machine-readable node summaries in normalized fixtures. Do not add `## KGC Reading Layer`, line-start `@node:...`, or line-start `@edge:...` sections to mirror frontmatter.
- Runnable demo documents that need parser/routing portability should include `kgParserRoutingContract` in opening frontmatter. The contract names parser logic, routing keys, diagram kinds, render surfaces, edge policy, and fork policy in one source-owned block.
- `kgParserRoutingContract.routingKeys` must point to existing canonical keys such as `kgCanvasSurfaceMode`, `kgCanvasRenderMode`, `kgCanvas2dRenderer`, `kgDocumentSemanticMode`, `kgFrontmatterModeEnabled`, `flow`, `flow.nodes`, `flow.edges`, `flow_diagrams`, and `kgStrybldrStoryboard`. Do not add duplicate aliases for the same runtime concept.
- `kgParserRoutingContract.edgePolicy` and `kgParserRoutingContract.forkPolicy` must preserve authored topology. A document may declare edges through `flow.edges`, workflow edges, Mermaid diagrams, or Strybldr storyboard payloads, but it must not mirror those same edges in body prose as a second machine-readable graph.
- Storyboard-facing documents must keep renderer identity canonical as `kgCanvas2dRenderer: "storyboard"` while relying on shared Flow Editor toolbar helpers and shared Workspace/Kanban data-view utility owners at runtime; do not encode renderer-local utility forks or alias renderers in frontmatter.

## Context-Intent-Directive

| Context | Intent | Directive |
|---|---|---|
| Canvas View | Preserve deterministic landing | - [ ] Declare all Canvas View keys in frontmatter; preserve deterministic landing; forbid partial renderer-only presets |
| Document Modes | Keep frontmatter as SSOT | - [ ] Set `kgDocumentSemanticMode` and `kgFrontmatterModeEnabled` together; keep frontmatter as SSOT; forbid implicit mode carryover |
| Initialization Files | Support Source Files switching | - [ ] Use canonical presets on seed documents; support switching; forbid relying on stale runtime state |
| Multi-dimensional Table | Avoid unintended mode takeover | - [ ] Set `kgMultiDimTableModeEnabled` explicitly; use `false` for simple D3/Flow Editor landings and `true` only when Workflow Manager / Multi-dimensional Table companion views are intentional; forbid ambiguous table-mode defaults |
| Surface Modes | Keep surface state frontmatter-driven | - [ ] Set `kgCanvasSurfaceMode` explicitly; keep surface state frontmatter-driven; forbid stored geospatial or 3D carryover |
| Widget Bundles | Preserve overlay ownership | - [ ] Keep Flow Editor widget behavior flags explicit; preserve overlay ownership; forbid cross-renderer proxy interference |
| SuperAgent Harness | Preserve harness metadata without renderer drift | - [ ] Keep `superagent_harness_template` / `superagent_harness_demo` as metadata unless nodes are explicitly authored under `flow:`; forbid second parser, renderer, provider, memory, or graph apply owners |
| MCP Structured Chat | Land LLM tool-result responses through shared owners | - [ ] Accept renderable MCP `structuredContent` at submit validation; project widgets, panels, cards, media, safe inline compute, and edges into frontmatter flow; forbid synthetic KGC backfill or renderer-local graph patches |
| Markdown Body | Keep body as human projection | - [ ] Use headings, tables, validation checklists, and inspection notes as human-facing documentation only; forbid body `flow:` blocks, `## KGC Reading Layer`, and line-start `@node:` / `@edge:` mirrors for Flow Editor topology |
| Parser Routing | Keep diagram and workflow dispatch source-owned | - [ ] Declare parser routing keys, diagram kinds, surfaces, edges, and fork policy in `kgParserRoutingContract`; forbid renderer-local aliases, stale routing carryover, and body-side topology mirrors |
| Storyboard / Workspace Reuse | Keep shared utility ownership neutral | - [ ] Keep Storyboard frontmatter on canonical `storyboard`; reuse shared toolbar and Workspace/Kanban utility owners at runtime; forbid alias renderers or frontmatter-local utility forks |

## Architecture Overview

**From initialization-file selection to rendered canvas**: Source Files selection -> ingestion -> frontmatter parsing -> shared preset resolution -> source-file graph materialization -> post-graph Canvas View application -> visible document content and graph.

**From `*.md` document to directly runnable seed**: Authors declare the full Canvas View preset in the opening YAML block -> import and initialization paths consume the same explicit seed contract -> no prior renderer or surface state is required.

## Markdown Body Structure

For frontmatter-driven Knowgrph documents, the body is a human-readable projection of the same authored state, not another machine authority.

- Start the body after the single closing `---` with one `#` heading.
- Use body sections for purpose, workflow explanation, validation evidence, and inspection steps.
- Reference frontmatter node ids and edge ids with inline code when helpful.
- Keep reusable summaries on their owning frontmatter nodes, commonly as `kgc:readingSummary` in normalized fixtures.
- Do not put a second YAML-like metadata block in the body.
- Do not put `flow:`, `nodes:`, `edges:`, `@node:`, or `@edge:` declarations in the body to mirror the frontmatter graph.

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

Computing-flow demo / Flow Editor / Workflow Manager companion:

```yaml
kgCanvasSurfaceMode: "2d"
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "flowEditor"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: true
kgDocumentStructureBaselineLock: false
kgWorkflowManagerModeEnabled: true
```

Long-horizon SuperAgent template metadata:

```yaml
superagent_harness_template:
  schema_version: "knowgrph-superagent-harness-template/v1"
  harness_id: "example_superagent_harness"
  mode: "local-template-long-horizon"
  inspiration_policy: "deer-flow-inspired concepts only; no copied code, no copied architecture"
  native_owners:
    - "knowgrph_parser/superagent_harness.py"
    - "mcp/local-tool-contract.js"
  capabilities:
    message_gateway: ["MainPanel Integrations", "FloatingPanel Chat", "local MCP"]
    outputs: ["output", "imageUrl", "videoUrl", "outputSrcDoc"]
```

This block is metadata. It does not author graph nodes, change `kgCanvas2dRenderer`, or bypass the shared Markdown parser.

MCP-structured FloatingPanel Chat responses may materialize equivalent frontmatter-flow records only through the shared submit validation and structured-content projection owners. A literal MCP result with renderable `structuredContent` finalizes without KGC retry, then lands in Editor Workspace and renders Widgets, Rich Media Panels, Cards, media, inline compute, and edges through the same `flow:` contract.

Timeline demo / Animatic / Frontmatter Mode:

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

- Reuse the same canonical Markdown YAML syntax as Flow Editor: `flow:` remains the graph authoring surface.
- Optional timeline timing lives beside that shared graph contract under `timeline.beats.*`.
- Do not introduce a parallel animatic-only body syntax or renderer-specific frontmatter alias block.

Storyboard / Strybldr / Frontmatter Mode:

```yaml
kgCanvasSurfaceMode: "2d"
kgCanvasRenderMode: "2d"
kgCanvas2dRenderer: "storyboard"
kgDocumentSemanticMode: "document"
kgFrontmatterModeEnabled: true
kgMultiDimTableModeEnabled: false
kgDocumentStructureBaselineLock: false
```

- Storyboard cards may project graph-backed fields differently, but toolbar/data-view affordances still reuse shared Flow Editor and Workspace/Kanban utility owners at runtime.
- Do not replace `storyboard` with `strybldr` or introduce alternate frontmatter aliases for the same surface.

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

- `sandbox/demo/knowgrph-maps-grabmap-multim-demo.md`

Canonical seed documents aligned to the explicit vocabulary:

- `knowgrph/README.md`
- `knowgrph/knowgrph-video-demo.md`
- `knowgrph/knowgrph-video-demo-seeded.md`
- `knowgrph/knowgrph-video-demo-sea.md`
- `knowgrph/knowgrph-video-demo-the-general.md`
- `sandbox/demo/knowgrph-maps-grabmap-multim-demo.md`
- `sandbox/test-data/test-generate-video/knowgrph-demo-video.md`
- `sandbox/test-data/test-generate-video/knowgrph-rich-media-generation-demo.md`

## E2E Normalized Frontmatter

Canonical authored Markdown stays plain YAML for source-of-truth authoring, for example:

```yaml
flow:
  nodes:
    - id: n-scrape
      type: input
      label: scrape event URLs
```

E2E ingestion and rendering fixtures may use a normalized typed wrapper shape after parsing so the pipeline can validate `key`, `type`, and `value` explicitly:

```yaml
flow:
  nodes:
    - id: {key: id, type: string, value: "w-text-script"}
      type: {key: type, type: string, value: "TextGeneration"}
      label: {key: label, type: string, value: "Text Script Widget"}
```

Contract split:

- Use plain YAML in canonical authored docs and guideline examples unless the fixture is specifically validating the normalized E2E graph payload.
- Use `{key, type, value}` wrappers only in normalized validation fixtures that audit ingestion -> parsing -> rendering on Canvas.
- Keep the typed-wrapper scope additive: wrappers validate payload fidelity but do not replace canonical YAML authoring syntax in normal docs.
- In Flow Editor fixtures, the wrapper `key` is the semantic field/port key. Declaration containers such as `handles.source` and `handles.target` describe side membership only and must not replace row keys, edge handle keys, or connected-value schema paths.
- If a normalized field row and a declared input/output port resolve to the same schema path, the renderer should expose one inline-editable KTV row with the port handle on that row, not a duplicate non-inline port row.
- Do not hardcode machine-local absolute repo paths inside canonical docs or guideline references; use repo-relative paths or placeholders instead.

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
| `"animatic"` | Native animatic timeline renderer | Use for timeline playback/editing while reusing the same `flow:` and `timeline.beats.*` YAML contract as Flow Editor |
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
- [ ] Reviewers confirm there is exactly one frontmatter block and no body-side metadata mirror.
- [ ] Reviewers confirm the YAML frontmatter parses cleanly under a strict parser with no recovery-only dependency.
- [ ] Reviewers confirm switch-sensitive `*.md` files are directly runnable canonical seeds with explicit Canvas View frontmatter.
- [ ] Reviewers confirm `kgCanvasSurfaceMode` is explicit for switch-sensitive documents.
- [ ] Reviewers confirm `README.md`-style files use `kgCanvas2dRenderer: "d3"`.
- [ ] Reviewers confirm widget-bundle files use `kgCanvas2dRenderer: "flowEditor"`.
- [ ] Reviewers confirm animatic timeline files use `kgCanvas2dRenderer: "animatic"` while reusing the same canonical `flow:` YAML syntax as Flow Editor.
- [ ] Reviewers confirm 3D examples pair `kgCanvasSurfaceMode: "3d"` with `kgCanvas3dMode`.
- [ ] Reviewers confirm geospatial examples use `kgCanvasSurfaceMode: "geospatial"` instead of relying on stored geospatial state.
- [ ] Reviewers confirm `kgMultiDimTableModeEnabled` is explicitly set for switch-sensitive documents.
- [ ] Reviewers confirm `kgWorkflowManagerModeEnabled: true` appears only when workflow sections or table companion rendering are intentional, and that Flow Editor remains the renderer authority.
- [ ] Reviewers confirm canonical docs use normalized values instead of aliases.
- [ ] Reviewers confirm widget-bundle docs keep the Flow Editor behavior contract when overlays are present.
- [ ] Reviewers confirm normalized Flow Editor fixtures map `{key,type,value}` rows by semantic key / schema path and do not render `handles.source` or `handles.target` as substitute port keys.
- [ ] Reviewers confirm matching field/port rows are consolidated into one inline-editable KTV row with the functional handle attached.
- [ ] Reviewers confirm Flow Editor documents do not contain `## KGC Reading Layer` or line-start `@node:` / `@edge:` body mirrors.

## Anti-Patterns

- Do not omit `kgFrontmatterModeEnabled` and rely on a prior document's mode.
- Do not treat a switch-sensitive `*.md` file as a canonical seed unless it declares the full Canvas View frontmatter block explicitly.
- Do not omit `kgCanvasSurfaceMode` when the document must switch deterministically across 2D, 3D, and Geospatial surfaces.
- Do not use `Flow Canvas` as the canonical renderer label for widget-bundle docs.
- Do not leave `kgMultiDimTableModeEnabled` unspecified when the document must switch deterministically.
- Do not rely on persisted Geospatial Mode when the document itself is map-first.
- Do not mix Flow Editor widget bundles with cross-renderer proxy behavior.
- Do not treat renderer aliases as the canonical authoring format.
- Do not leave invalid inline YAML scalars unquoted and expect parser repair to recover them silently.
- Do not split one semantic Flow Editor driver into a separate editable value row and a separate read-only port row when both resolve to the same schema path.
- Do not close frontmatter early and place `title`, renderer presets, `workflow_sections`, `socket_types`, or `flow:` in the Markdown body.
- Do not keep parallel KGC reading sections in the body when the same node summaries can live on the frontmatter node records.


## Runnable Demo Compliance

Every `*-demo.md` file that uses `kgCanvas2dRenderer: "flowEditor"` must be runnable without any configuration outside the document itself. The following keys are required in the frontmatter:

```yaml
schema: "kgc-computing-flow/v1"
kgWorkflowManagerModeEnabled: true
kgAutoSaveEnabled: true
kgAutoSaveDebounceMs: 1500
kgAutoSaveOn: ["nodeEdit", "runComplete", "approval", "assetReady"]
```

### Diagram kinds and rendering surfaces

The parser (`deriveFlowDiagramsWidgets`) reads every `flow_diagrams` entry. The rendering path depends on the diagram kind and declared routing keys:

| Diagram type | `floatingPanelView` | `bottomPanelTab` | FloatingPanel | BottomPanel | RichMediaPanel in canvas |
|---|---|---|---|---|---|
| `mermaid_architecture` | `"architecture"` | `"architecture"` | row list (`renderMode="list"`) | chart (`renderMode="diagram"`) | **skipped** when routing keys set |
| `mermaid_eventmodeling` | `"eventModeling"` | `"eventModeling"` | row list (`renderMode="list"`) | chart (`renderMode="diagram"`) | **skipped** when routing keys set |
| `mermaid_flowchart` | `"flowchart"` | `"flowchart"` | row list (node/edge terms) | chart (node topology) | **skipped** when routing keys set |
| `mermaid_gitgraph` | `"gitGraph"` | `"gitGraph"` | row list | chart | **skipped** when routing keys set |
| `mermaid_gantt` | `"gantt"` | `"gantt"` | row list | chart | **skipped** when routing keys set |
| `mermaid_timeline` | `"timeline"` | `"timeline"` | row list | chart | **skipped** when routing keys set |
| any type (no routing keys) | — | — | — | — | ✓ always derived |

**Universal rule**: when both `floatingPanelView` AND `bottomPanelTab` are declared on a `flow_diagrams` entry, the parser skips ALL derived canvas nodes (source, compute, panel) and ALL edges for that entry. The FloatingPanel and BottomPanel read directly from the raw frontmatter YAML text via `useMermaidStructuredDiagramDocument` — no canvas nodes needed.

Without routing keys, the standard derivation always applies: `FlowDiagramSource → TextGeneration → RichMediaPanel`.

**There are no exceptions by diagram kind** — the skip is purely a function of whether routing keys are declared.

### Required routing keys on each typed `flow_diagrams` entry

```yaml
flow_diagrams:
  value:
    my_diagram:
      type: mermaid_architecture        # or mermaid_eventmodeling / mermaid_flowchart / mermaid_gitgraph / mermaid_gantt
      floatingPanelView: "architecture" # exact string from FloatingPanelView type
      floatingPanelOpen: true           # open FloatingPanel on load
      bottomPanelTab: "architecture"    # exact string from BottomSurfaceTab type
      bottomPanelOpen: true             # open BottomPanel on load
      value: |-
        architecture-beta
        ...
```

These strings must exactly match the `BottomSurfaceTab` and `FloatingPanelView` union types in `src/hooks/store/store-types/core.ts` and `graph-state-chat-import.ts`.

The routing key contract applies to ALL diagram types — there are no kind-specific exceptions.

### Doc-level panel open keys

Declare which panel is open when the document loads:

```yaml
kgBottomPanelOpen: true
kgBottomPanelTab: "eventModeling"   # the most informative diagram type
kgFloatingPanelOpen: true
kgFloatingPanelView: "eventModeling"
```

### Prohibition: stale pre-authored `flow-diagram-*` nodes

Never commit `flow-diagram-{key}-source`, `flow-diagram-{key}-compute`, or `flow-diagram-{key}-panel` nodes to the `flow:` block. The parser's `appendNodeIfMissing` check means a pre-authored node permanently blocks re-derivation, bypassing the `routedToPanelSurfaces` skip logic and causing typed diagrams to appear in the canvas or Rich Media Panel path.

The parser derives all `flow-diagram-*` nodes at load time from the `flow_diagrams:` frontmatter entries. The `flow:` block must not contain them.

### Image and video Rich Media Panel typing

Image and video output nodes must use typed fields:

```yaml
- id: panel_image_output
  type: RichMediaPanel
  media_type: image
  replayWithoutLlm: true
  imageAssetUrl: {key: imageAssetUrl, type: image_url, value: "https://..."}

- id: panel_video_output
  type: RichMediaPanel
  media_type: video
  replayWithoutLlm: true
  videoUrl: {key: videoUrl, type: video_url, value: "https://..."}
```

### Enforcement

| Layer | What it checks | Trigger |
|---|---|---|
| `doc:sanity` `checkRunnableFlowEditorDemoCompliance` | Required template keys, routing keys per diagram entry | Every `prebuild` |
| `test:ci` `testFlowEditorDemoRunnableStructure` | InputWidget, compute nodes, typed panel handles, routing keys | Every CI run |
| `test:ci` `testMarkdownFrontmatterFlowGraphPublishedAgenticCanvasOsDemoArchitectureAndEventModeling` | Routing keys present; no derived panel for routed entries | Every CI run |
| Kiro hook `runnable-demo-compliance-check` | Runs `doc:sanity` on every `*-demo.md` save | File save |

Run manually from `knowgrph/canvas/`:

```bash
npm run doc:sanity
```

## Compute Integrity

Every compute function must produce correct, deterministic output from its declared input values.

### Forbidden: `* 1000` scaling multipliers

Input fields store real dollar amounts. No secondary scaling:

```js
// FORBIDDEN — legacy thousands-scale convention
const rev0 = rn('input_initial_revenue', 42) * 1000;
const thr  = mt * 1000;

// CORRECT — read dollar value directly
const rev0 = rn('input_initial_revenue', 420000);
const thr  = mt;
```

### Forbidden: stale frozen materialized output

Commit output fields in idle state (empty) or exactly matching a fresh compute run. Forbidden:

- `run_status: "done"` with frozen markdown `output` from a prior run with different inputs
- Hardcoded inflated values: `$150,529,352`, `$350,000,000`, `$360,944,612`, `$1,061,546 at 37%`

Correct idle state:

```yaml
output: {key: output, type: markdown, value: ""}
imageUrl: {key: imageUrl, type: svg_data_uri, value: ""}
outputSrcDoc: {key: outputSrcDoc, type: html_srcdoc, value: ""}
run_status: {key: run_status, type: string, value: "idle"}
```

### Enforcement

| Layer | What it checks | Trigger |
|---|---|---|
| `doc:sanity` `checkComputeIntegrity` | `* 1000` bugs, inflated values, frozen `run_status:done` | Every `prebuild` |
| `test:ci` `testFlowEditorComputeIntegrity` | Same as above | Every CI run |
| Kiro hook | Runs `doc:sanity` on every `*-demo.md` save | File save |

See `knowgrph/docs/documents/knowgrph-compute-integrity-document.md` for the full parser logic, routing key contract, diagram kinds table, and companion source file references.
