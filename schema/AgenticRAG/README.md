# Knowledge Graph JSON-LD Schema v1.0.0

> **Compliant with:** structural-only, domain-agnostic pipeline principles  
> **Languages:** English (en-us), Chinese (zh-cn)  
> **Use Case:** Agentic GraphRAG with domain-agnostic structure

---

## 📁 Schema Files

<!-- SCHEMA_FILES_START -->
```
schema/AgenticRAG/
├── v1/
│   └── context.jsonld                         # Base @context (semantic vocabulary)
├── README.md                                 # This file
├── node-schema.jsonld                        # Node structural contract (@id + labels required)
├── edge-schema.jsonld                        # Edge structural contract (@id + source/target/label required)
├── graph-schema.jsonld                       # Graph container contract (@context/@graph + metadata)
├── metadata.jsonld                           # Provenance/metrics conventions (structural, not semantic)
├── neutrality.jsonld                         # Domain-agnostic constraints and anti-patterns
├── colors.jsonld                             # Lean Startup MVP palette (renderer directive)
├── canvas.jsonld                             # Canvas/renderer integration directives
├── panels.jsonld                             # Panel/pane interaction directives (UI contract)
├── flow-node-quick-editor-bundle.jsonld       # Node Quick Editor bundle import/export contract
├── video-generation-node-quick-editor.jsonld  # VideoGeneration node quick editor contract
├── curation.jsonld                           # Graph Data curation surfaces (tables/editors/presentation)
├── settings.jsonld                           # Settings surface (config-driven behavior)
├── settings-flow.jsonld                      # Settings provenance flow (modules/classes/functions/line ranges)
├── semantic-mode.jsonld                      # Semantic mode surface (renderer directive)
├── keyword-mode.jsonld                       # Keyword mode surface (renderer directive)
├── geospatial.jsonld                         # Geospatial mode surface (map + bounded spatial queries)
├── youtube.jsonld                            # YouTube transcript ingest surface (segments + metadata)
├── markdown.jsonld                           # Markdown ingest surface (provenance + preview hooks)
├── parser.jsonld                             # Parser surface (token linking + edge elevation)
├── pipeline.jsonld                           # Pipeline stage vocabulary (ingest→validate→produce→reuse)
├── workflow.jsonld                           # Workflow vocabulary (agents/tools/stages)
├── orchestrator.jsonld                       # Orchestrator contract (workflow execution + exports)
├── graphrag-pipeline.jsonld                  # GraphRAG pipeline directives
├── roles-actions-outcomes-schema.jsonld      # Role→Action→Outcome wording contract
├── documentation.jsonld                      # Documentation copy patterns (neutral wording)
├── stage-metrics.jsonld                      # Stage metrics schema (quality gates, drift checks)
├── evals.jsonld                              # Evaluation harnesses and metrics (quality gates)
├── action-verbs.jsonld                       # Action verb canonicalization (neutral verbs)
├── system-design-pattern.jsonld              # System design patterns (domain-agnostic)
├── prompt-shaping-heuristics-framework.jsonld # Prompt shaping heuristics (agentic, domain-agnostic)
├── ast-traversal.jsonld                      # AST traversal surface (code analysis mode)
├── aie-book-chapter-snippets.jsonld          # Example ingest surface (snippets)
├── agenticrag-guidelines-and-surfaces-map.graph.jsonld # Guidelines ↔ surfaces map (sync artifact)
├── knowgrph-documents-map.graph.jsonld      # Knowgrph docs/documents ↔ schema surfaces map (sync artifact)
├── example-graph.jsonld                      # Complete working example graph
└── example-lean-startup-layer-modes.jsonld   # Example layer modes (Lean Startup tags + palette)
```
<!-- SCHEMA_FILES_END -->

---

## 🔄 Docs Sync (Knowgrph)

This folder stays in sync with Knowgrph documentation via a deterministic sync script:

- **Source:** `knowgrph/docs/documents` (repo-relative)
- **Target artifact:** `schema/AgenticRAG/knowgrph-documents-map.graph.jsonld`
- **Language compliance:** the sync enforces both `en-us` and `zh-cn` support (see Languages above). Document node `language` is inferred from filename (`*.zh-cn.*` → `zh-cn`), otherwise defaults to `en-us`.

### Git Rebase / Conflict Resolution (Cross‑Repo)

- Prefer rebasing when syncing Knowgrph↔Schema changes to keep one linear history for contract updates.
- If conflicts involve `knowgrph/canvas/src/components/GraphCanvas/scene.ts`, preserve idempotent initialization (no “double-fit” jump) and schema-driven fit (`readFitAllOptions` + `fitAllTransform`).
- Never hand-merge `knowgrph/canvas/tsconfig.tsbuildinfo`; regenerate via `npm --prefix canvas run check` or `npm --prefix canvas run build`.

### Canvas Zoom/Fit SSOT (Knowgrph)

- **Preset SSOT:** `knowgrph/grph-shared/src/zoom/presets.ts` (capped 16:9 frame + default fill ratio)
- **Consumers:** `knowgrph/canvas/src/components/GraphCanvas/{fit.ts,simulation.ts}` (fit transforms + seeding/disjoint sizing)
- **Flow renderer:** `knowgrph/canvas/src/components/FlowCanvas.tsx` applies the same fit/zoom policies while rendering via a native Canvas2D Flow renderer.
- **Collective fit+center:** Fit-to-view / fit-to-screen must be computed from the display-derived graph (post filters/collapse) and must include node dimensions (prefer `visual:width/height` when present) plus group envelopes (clusters/subgraphs/layers) so the visible graph is fully in-viewport and centered.
- **Reset semantics:** Toolbar Reset is defined as Fit-to-View framing (centroid + group-aware bounds) and must not force `k=1` when the graph is larger than the viewport.
- **Initialization parity:** initial view restoration is bounds-guarded (do not apply stored transforms until bounds are computable) and idempotent (forbid “double-fit” jumps when a stored transform is applied); when positions are only partially available, skip invalid geometry to prevent one-long stray lines.
- **Zoom key isolation:** zoom view keys are isolated by 2D renderer variant (`canvas2dRenderer`) while still including semantic mode + schema layout fingerprint; forbid cross-renderer zoom state contamination.
- **2D layer order SSOT:** centralize layer ranks (nodes/edges/groups/labels/handles) and apply consistently across SVG (D3) and native canvas (Flow/Flow Editor) so stacking does not drift.
- **Canvas overlays:** in-canvas overlays (e.g. Flow Node Quick Editor) must derive any zoom-coupled scaling from a single SSOT helper and should keep *macro view* usable at extreme zoom-out (avoid oversized overlays that hide the graph).
- **Collision relax parity:** apply a bounded collision relax pass when layouts are produced/frozen (post-collective-fit freeze in D3; post-layout in Flow/Flow Editor; post-drag in Design) to forbid persistent overlaps.
- **Collision relax determinism:** seed any collision force initializer RNG by stable inputs (e.g., node ids) and clamp displacement so overlap removal cannot destroy macro layout.
- **Flow overlap guard:** do not rely only on “unstable positions” detection; also trigger relax using a cheap overlap-pressure heuristic so overlapping-but-stable layouts get settled.
- **Bounded store writes:** when collision relax produces multi-node/frame patches, batch store updates to avoid rerender churn and feedback loops.
- **Design auto zoom modes:** Auto Fit-to-Screen and Auto Zoom-to-Selection should work in Design by using the renderer’s local display graph for fit signatures.
- **Flow packing cohesion:** collective packing should treat group membership as connectivity so groups/subgraphs remain cohesive even when edges are sparse.
- **Flow edge labels:** native edge-label placement should avoid collisions (nodes/groups/labels) and be gated by zoom and graph size to stay bounded.
- **Overlay event proxy:** fly-out overlays must expose a stable root selector (`[data-kg-node-quick-editor]`) at the portal root so global capture handlers can proxy wheel/gesture zoom without brittle DOM assumptions.
- **Safari pinch parity:** when Safari emits `gesture*` pinch events over the canvas or fly-out overlays, the app must prevent browser zoom and apply anchored zoom to the active 2D renderer.
- **Wheel/trackpad parity:** 2D zoom must share wheel delta normalization + zoom factor SSOT; clamp-edge behavior should avoid “min zoom-out bounce back zoom-in” and avoid zooming while dragging nodes.
- **Overlay z-index parity:** overlay-only routing/edges must stack relative to the panel z-index SSOT (e.g., `floatingPanelZIndex`) rather than hardcoded constants so quick editors reliably remain on top.
- **Document baseline isolation:** switching semantic modes must not back-propagate zoom/collapse state into Document Structure mode unless explicitly pinned.
- **Keyword derive debounce settings:** `keyword.graph.previewDebounceMs` and `keyword.graph.fullDebounceMs` gate preview/full worker derivation to avoid churn.
- **Design webpage wireframe parity:** the Design 2D renderer must consume a neutral `webpageLayout` snapshot (DOM elements + bounding boxes + safe CSS signals) and a deterministic DOM→graph converter that enforces geometric nesting, drops tiny noisy leaves and glue wrappers, preserves major semantic containers and landmark roles, and may synthesize neutral `SECTION` containers for repeated grid/list regions (e.g., feature/pricing cards) using viewport-aware structural heuristics only (never host/URL rules). Design shares selection/marquee, snap-to-grid, align/distribute, and keyboard nudging semantics and shortcuts with D3 and Flow, and exposes schema-only wireframe presentation settings (`renderer:designWireframe`) for label/meta chips, text/media previews, depth-aware styling, optional edges, and label-collision avoidance; the Floating Panel UI is a thin shell over these settings.
- **Rich Media rendering SSOT:** Rich Media nodes (image/svg/video/iframe) are detected via shared URL/metadata heuristics and rendered through a bounded DOM overlay pool per canvas (2D D3/Flow/Design and 3D). Overlays follow node motion via a shared RAF-coalesced scheduler, reuse a single overlay surface per canvas, and maintain Script/Imgs/Fid defaults as auto, driven by shared rich-media + iframe heuristics across Markdown Viewer, Canvas, Design, and Geospatial modes; per-doc frontmatter overrides remain optional escape hatches only.
- **Canvas Interaction & Workspace Sync Modes:** Canvas exposes two SSOT toggles shared by Toolbar and MainPanel Settings: `infiniteCanvasInteractionMode∈{static,interactive}` and `canvasWorkspaceSyncMode∈{manual,realtime}`. Static+Manual (default) runs 2D D3 force layout to a bounded stable state then freezes simulation, forwards overlay wheel/pan to Canvas so pan/zoom stay primary, and treats position-only updates as non-syncing metadata (Graph Data Table and GraphTableDb sync only on content changes or explicit “Sync now”). Interactive+Realtime keeps D3 forces running and enables full overlay interactivity (iframes/images/videos/markdown blocks accept wheel/pointer events without forwarding to Canvas) while still using the same GraphData/layout keys and revision+viewKey-gated sync (structure-only revisions in static mode; full graph revisions in interactive mode), with deduping via last-write/last-sync gates to avoid loops or background churn. Implementations must not introduce renderer-specific parallel flags; Toolbar toggles and Settings must always remain in lockstep over the same underlying state.
- **Force-directed stability:** Force-directed 2D D3 layouts must preserve settled node positions across scene rebuilds and renderer toggles, and must not re-run strict-overlap relax or reheat the simulation once alpha is near-settled; overlay/panel membership changes update hidden-node sets and collision extents only, never restarting forces or mutating settled layouts.

### Graph Search Query Filters (Knowgrph)

- Search supports `key:value` filters (space-separated) for targeted queries, e.g. `kind:node type:hook path:hooks usegraphstore` or `kind:edge source:foo target:bar`.

### UI Event SSOT (Knowgrph)

- Mode/selection sync events that cross repo boundaries should be centralized in `knowgrph/grph-shared/src/*/events.ts` to keep payload shapes aligned.

### Floating Panel Lightweight Pattern (Knowgrph)

- Floating Panel view bodies must reuse the Props Panel lightweight embedding contract: shell owns background + typography; default to a single shell-owned scroll container.
- Embedded views must be content-only (no nested `h-full`/`overflow-*` scrollers, no redundant panel bg/borders/shadows, no hardcoded widths/colors).
- If a view must own an internal scroller (e.g. chat messages), the Floating Panel body must switch to `overflow-hidden` for that view to prevent double-scroll.
- Layout-only wrappers inside panel bodies should prefer `div`; reserve `section/header/nav/aside` for meaningful surface boundaries.
- Infinite-canvas interaction actions (mode/layout/center/distribute/perf) live in a dedicated SSOT Interaction floating panel adjacent to the Floating Panel Props view; do not add legacy Arrange overlays/tabs.

### Graph Data Table (Host Fast Grid) (Knowgrph)

- The host Graph Data Table (workspace tool surface) is a canvas fast-grid with a single scroll owner.
- Editor/Table workspace modes must reuse the same in-app Canvas pane (single `CanvasViewport`); do not mount a second Canvas Preview surface for these modes.
- Scroll extents must be driven by an explicit spacer element sized to the computed layout total width/height; do not rely on padding hacks.
- Forbid ResizeObserver→React state loops and scroll/resize feedback loops.
- Header must remain aligned to the body while horizontally scrolling: use a DOM header overlay that is translated by `-scrollLeft` from the same single scroll owner; the canvas should be clipped so it never draws into the header band.
- Visible data columns can be reordered by dragging the header; persist order per table via local storage `kg:ui:graphTable:columnOrderByTableId` (ordered `columnId` list). RxDB column `order` remains the base/default ordering.
- Header click selects a column (highlight the entire column in the body grid).
- Performance: avoid `getComputedStyle()` in the scroll loop; cache theme metrics and update only on theme mutation or resize.
- Date columns: infer ISO-like date strings as `kind: date` so the Date editor behavior is available end-to-end from imports; treat `text → date` upgrades as safe-only.
- Sync stability: gate RxDB sync by a `(revision, collapsedGroupIdsKey, viewKey)` triple and respect Canvas interaction/sync modes. In static interaction mode, use structure-only revisions (graphContentRevision) so position-only drags do not cause table recomputation; in interactive interaction mode, use full graph revisions (graphDataRevision) only when Workspace Sync Mode is realtime. Manual sync disables auto sync and exposes a single **Sync now** action in the Graph Table header; realtime uses the same pipeline triggered by revision changes and deduped via last-write/last-sync gates so collapsed-view toggles update the table without introducing render/rewrite loops.

### Graph Data Table (Curation Table) (curagrph)

- The curation Graph Data Table is a DOM `<table>` surface (BottomPanel / curation views) over the same SSOT-derived active graph render view.
- Sticky header and optional frozen first data column must remain aligned with horizontal scroll; avoid empty sticky overlays that block pointer interaction.
- Header and body must share column widths; visible columns can be reordered via pointer drag (Glide-like), persisted via `graphDataTableColumnOrder`.
- When the active graph becomes empty, the table must render empty state (no stale rows from prior graphs).

### PDF Workspace (Knowgrph)

- Local PDF→Markdown workspace artifacts should be written under `.knowgrph-workspace/` and configured via the Settings key `pdfWorkspaceOutputDirRel`.
- In this repo, `.knowgrph-workspace/` is moved to `sandbox/.knowgrph-workspace/` via symlink to avoid storing large artifacts inside `knowgrph`.

### Webpage Markdown Artifact (Fixture-Driven Structure)

- Webpage markdown artifact structure enhancements (Header Navigation tables, Hero breakdown, section statistics, template grids, pricing tables, rendering options) must be driven by extracted tokens and optional appended `(Extracted)` blocks, never by hardcoded domains.
- Regression tests should use repo-local fixtures under `knowgrph/canvas/src/__tests__/fixtures/` and a placeholder URL like `https://example.com/` for deterministic generation.

### Website Import (Sitemap → Workspace)

- Website imports should generate a workspace-level sitemap document (`website.sitemap.md`) that provides a single tree + page table view over imported webpages.
- The sitemap pages table should include stable `Doc` links to the actual generated workspace markdown files.
- Webpage view switching (`Markdown` / `HTML` / `DOM` / `Raw` / `JSON`) must keep a shared token vocabulary (`[NAV]`, `[CTA]`, `[PRICE]`, `[TIME]`) visible across modes.
- HTML/JSON rendering must use a sandboxed iframe and remain view-only (no graph/layout/zoom side effects): HTML/JSON render via sanitized iframe `srcdoc`; HTML source may be fetched via the same-origin proxy, via `/__codebase_file?path=...` (text) + `/__codebase_asset?path=...` (assets) for repo-relative `kgWebpageUrl`, or loaded from stored `raw.html` artifacts. `/__repo_file/*` is legacy/back-compat only.
- Local repo-relative imports should accept both `path/to/file.html` and `file://path/to/file.html` as equivalent repo-relative inputs.
- Markdown preview should render safe rich-media HTML blocks (e.g., `<svg>`, `<iframe>`, `<video>`, `<audio>`, `<details>`, `<picture>`, `<figure>`) even when the upstream markdown lexer emits them as standalone inline HTML.
- HTML/CSS/JS→Markdown SSOT invariants (universal): resolve relative URLs against baseUrl for href/src/action/poster/srcset and common lazy-load `data-*` media attributes; upsert missing `img src` from `data-src/srcset`; forbid duplicate content emissions in converted Markdown (no repeated synthetic headings/cards/pricing/features). See `markdown.jsonld`.
- HTML→Markdown import should prefer lossless embedded Markdown payloads; otherwise use unified/rehype/remark as a general-purpose fallback without replacing the markdown-it-based Markdown UI renderer.
- Monaco editor initialization must apply the latest hydrated file contents at create-time to avoid an empty editor during async imports or `kgWebpageView` toggles.
- Lossless round-trip: when Markdown is rendered to HTML/DOM for preview, embed the exact Markdown source in a non-executing payload so HTML imports can restore the Markdown exactly (MD → HTML → MD).

### Webpage Per-Document Fidelity Controls

- Per-doc frontmatter may override conversion/rendering fidelity when needed, but the default is **Auto**: Script/Imgs/Fid are inferred from shared rich-media + iframe heuristics and do not require frontmatter. Optional keys: `kgWebpageScriptPolicy: allow|strip`, `kgWebpageIncludeImages: true|false`, `kgWebpageFidelityLevel: 1|2|3|4`.
- UI placement SSOT: these controls live in the Markdown toolbar `nav` (Webpage group) with an explicit `Sync` (DOM→Markdown) action, and default to Auto; frontmatter is only written when the user explicitly chooses a non-auto override.

## Agentic GraphRAG/Knowledge Graph Pipeline Guidelines

## COMPLY
`/GitHub/{huijoohwee.github.io/guidelines/{codebase-neutrality-guidelines.md,codebase-maintainability-guidelines.md},knowgrph/todo.md#L5-21}`

## ALIGN (Semantic Definition)
- **GRAPHS Elements:** nodes, Node Quick Editors, edges, graph layers (subgraphs, groups, clusters, communities), labels, text
- **GRAPHS Configs:** grouping, positioning, collisions, timing, knobs

## Baseline & Code Hygiene
- Reuse existing elements/configs.
- Enhance natively; forbid duplication.
- Prevent interference across layers/modes.
- Treat Document Structure Mode as the baseline; semantic-mode switches must restore per-mode view/schema snapshots and clear incompatible selection/collapse state (no cross-mode bleed).
- Remove legacy/conflicting/stale code.
- Repo hygiene: never commit `.knowgrph-workspace/**`, `node_modules/**`, or `backups/**` (store workspace artifacts under `sandbox/.knowgrph-workspace/` via symlink); if large artifacts were committed previously, purge history via `git-filter-repo` and force-push rewritten `main`.

## Pipeline Discipline
- Scope: `/GitHub/{knowgrph,gympgrph,curagrph}` → import → render.
- Support all `/GitHub/sandbox/` test data; no hardcoding.
- FORBID absolute local sandbox paths (e.g. `/Users/.../GitHub/sandbox/...`) in code/tests; use sandbox-root helpers + basenames or repo-local fixtures.
- Use semantic HTML for surface boundaries; use `div` for layout-only wrappers.
- Centralize configs (labels, boxes, collisions, timing, knobs).
- Resolve cross‑repo conflicts.
- Test only bounded diffs; forbid indefinite runs.
 - Treat `.md`, `.markdown`, `.mmd`, `.mdx` as canonical Markdown ingest extensions in the graph pipeline; keep document path/provenance neutral.
- On toolbar Markdown import, sync Markdown Editor SSOT (`markdownDocumentName/text/sourceUrl`) and Graph SSOT together; forbid split-brain Editor/Viewer state.

## Canvas Layout Rules
- FORBID GRAPHS Elements overlaps or single‑line formations.
- MAINTAIN 80:20 element‑to‑empty space ratio.
- OPTIMIZE modularity, memory, rendering.
- REUSE shared utilities.

## GRAPHS Elements
- Centralized zoom utils (“Fit to View/Screen/Selection”) on 1920×1080; center the collective bounds (not per-node centroids).
- ENFORCE Fit to Screen 80:20 ratio.
- FORCE nodes/subgraphs into grid (d3.forceSimulation + constraints).
- Snap to grid for block‑like appearance.
- Combine simulation + constraints for hybrid layout.

### Run (write)

```bash
python3 schema/AgenticRAG/sync_map.py --mode write
```

### Run (check / CI)

```bash
python3 schema/AgenticRAG/sync_map.py --mode check
```

## 🚀 Quick Start

### 1. **Reference Context in Your Data**

```json
{
  "@context": "https://huijoohwee.github.io/schema/AgenticRAG/v1/context.jsonld",
  "@type": "kg:Graph",
  "@graph": [
    {
      "@type": "kg:Node",
      "@id": "node:123",
      "labels": ["Entity"],
      "skos:prefLabel": "Example term",
      "skos:altLabel": ["Example synonym"],
      "schema:sameAs": ["http://example.org/concept/example-term"],
      "name": ["Example term", "Example synonym"],
      "chunk_text": "Your content here...",
      "embedding": [0.1, 0.2, 0.3]
    }
  ]
}
```

### 2. **Validate Your Graph**

```javascript
// Validator checks (structural only, no domain semantics)
✅ All node @id values are unique
✅ All edge source/target reference existing nodes
✅ Required fields present: @id, labels (nodes), label (edges)
❌ NO validation of property content or label semantics
```

### 3. **Export to DuckDB**

```sql
-- Ingest JSON-LD
CREATE TABLE nodes AS 
  SELECT * FROM read_json('graph.jsonld', 
    format='auto', 
    columns={
      id: 'VARCHAR',
      labels: 'VARCHAR[]',
      properties: 'JSON',
      chunk_text: 'VARCHAR',
      embedding: 'FLOAT[]',
      geo: 'JSON',
      metadata: 'JSON'
    }
  );

-- Query with agent
SELECT * FROM nodes 
WHERE array_contains(labels, 'Company')
  AND metadata->>'confidence' > 0.9;
```

---

## 🎯 Core Principles

### ✅ **DO:**
- Treat `labels[]` and `relation` as opaque strings
- Store arbitrary domain data in `properties` JSON
- Use `chunk_text` for RAG grounding
- Include `metadata` with source, confidence, timestamp
- Support geo-coordinates via `geo` object
- Link media via `media_url`
- Keep renderer-specific settings (color palettes, layer modes) in separate JSON-LD directives such as `colors.jsonld` and `semantic-mode.jsonld` rather than embedding them into the core node and edge schemas; this keeps structural validation domain-agnostic while still allowing a shared Lean Startup MVP palette and AI-KG layer configuration for downstream visualizers. When graphs include neutral external references (for example properties that point to markdown or code artifacts modeled with the `Markdown` class), UI layers such as Knowgrph Canvas can use those properties to drive split-pane external file previews (textarea editor + GFM-first `marked` renderer) anchored to the active node or edge selection, without changing the structural JSON-LD contract.
- When emitting graphs intended for Knowgrph Canvas, optionally populate the `tags` array with Lean Startup categories such as `idea`, `hypothesis`, `execution`, `pivot`, and `alert`; renderers that understand the AgenticRAG directives will map these tags onto the shared MVP palette defined in `colors.jsonld` while structural validators continue to treat `tags` as an opaque, domain-agnostic field.

### ❌ **DON'T:**
- Require domain-specific fields (no "name", "description" mandates)
- Validate property semantics (Schema doesn't know "name" should be string)
- Hardcode visual properties (color, size → decided by Renderer)
- Reference test data or specific domains in schema

---

## 🔧 Pipeline Integration

### **Phase 1: UI Curation (tabular editor)**
```
Curator enters data → Export as JSON
↓
Uses this schema as target format
```

### **Phase 2: Ingest**
```
Loader: Fetches JSON (syntax validation only)
Parser: Builds node/edge objects (structure validation)
Validator: Checks @id uniqueness, referential integrity
GraphData: Stores canonical representation
```

#### Markdown Ingest (optional)
```
UI import: local file / URL (.md)
↓
Parser emits Graph JSON-LD where each extracted block carries provenance:
  metadata.documentPath
  metadata.lineStart / metadata.lineEnd
  metadata.timestamp
↓
Renderers can use this metadata to highlight and preview source markdown without changing the core schema

Preview rendering hooks (UI-level, schema-neutral):
- Fenced `mermaid` blocks may render as diagrams; per-block YAML config may be supported inside the fence.
- Fenced `geojson` blocks may render as maps; `json` fences must be explicitly detected as GeoJSON (do not assume all JSON is GeoJSON).
- Explorer folder expansion/collapse must not clear or change the active markdown document; only explicit file selection changes activeDocumentPath.
- GeoJSON map previews should keep a stable map container element across deferred-load states so they don’t require a remount/toggle to appear.
- In Viewer surfaces, GeoJSON-renderable blocks follow the global Beside/Inline/Render mode; in Presentation surfaces, GeoJSON-renderable blocks (including `json` fences recognized as GeoJSON) may default to Render even when the global mode is Inline.
- GeoJSON previews require an injected renderer hook (e.g., `geoDatasetIntegration.renderGeoJsonFeatureCollection`); if unavailable, surfaces should degrade gracefully with a compact error bar (not a full-height panel).
```

### **Phase 3: Produce**
```
Exporter queries GraphData → Generates JSON-LD
Uses context.jsonld as @context
Outputs to file/API
```

### **Phase 4: Reuse**
```
Renderer: D3.js/three.js consumes JSON-LD
Indexer: RAG system indexes chunk_text + embeddings
Agent: Queries DuckDB with SQL/Cypher
```

---

## 🤖 Agent Query Patterns

### **Vector Search + Confidence Filtering**
```sql
SELECT n.id, n.chunk_text, n.metadata
FROM nodes n
WHERE array_cosine_similarity(n.embedding, $query_vec) > 0.8
  AND (n.metadata->>'confidence')::float > 0.9
ORDER BY similarity DESC
LIMIT 10;
```

### **Multi-Hop Traversal**
```cypher
-- Via duckdb-age extension
MATCH (a:Entity)-[:FOUNDED_BY]->(p:Person)-[:LOCATED_IN]->(c:City)
WHERE a.properties->>'industry' = 'AI'
  AND (a.metadata->>'confidence')::float > 0.8
RETURN a, p, c;
```

### **Spatial Reasoning**
```sql
SELECT n.id, n.properties->>'name', n.geo
FROM nodes n
WHERE ST_Distance(
  ST_Point((n.geo->>'lng')::float, (n.geo->>'lat')::float),
  ST_Point($lng, $lat)
) < 50000  -- 50km radius
AND array_contains(n.labels, 'Company');
```

---

## 🌐 Multilingual Usage

### **English Context**
```json
{
  "@context": {
    "@language": "en-us",
    "chunk_text": "rag:chunk_text"
  }
}
```

### **Chinese Context**
```json
{
  "@context": {
    "@language": "zh-cn",
    "chunk_text": "rag:chunk_text"
  }
}
```

**Labels automatically localized:**
```json
"rdfs:label": [
  {"@value": "Text Chunk", "@language": "en-us"},
  {"@value": "文本块", "@language": "zh-cn"}
]
```

---

## 📊 Metadata Best Practices

### **Synonym Clustering Pattern**
```json
{
  "@id": "node:synonym_cluster_001",
  "labels": ["Concept"],
  "skos:prefLabel": "car",
  "skos:altLabel": ["automobile", "vehicle"],
  "schema:sameAs": [
    "http://dbpedia.org/resource/Car",
    "http://wikidata.org/entity/Q1420"
  ],
  "name": ["car", "automobile", "vehicle"]
}
```

### **Node Metadata Example**
```json
{
  "metadata": {
    "source": "system:row_abc123",
    "confidence": 0.95,
    "timestamp": "2025-12-19T10:00:00Z",
    "curator": "curator:example",
    "validation_status": "verified",
    "last_updated": "2025-12-19T10:30:00Z"
  }
}
```

### **Edge Metadata Example**
```json
{
  "metadata": {
    "source": "system:relationship_xyz",
    "confidence": 0.88,
    "timestamp": "2025-12-19T10:15:00Z",
    "derivation": "llm_extracted",
    "reviewed_by": "curator:example"
  }
}
```

---

## 🔄 Schema Versioning

**Current:** `1.0.0`

**Compatibility:**
```json
{
  "metadata": {
    "schemaVersion": "1.0.0",
    "compatible_versions": ["1.0.0", "1.0.1"]
  }
}
```

**Migration Path:**
- Backward compatible within major versions
- @context can be extended without breaking changes
- Agents query schemaVersion (or schema_version alias) to adapt behavior

---

## 🖼️ Canvas Integration (v1.1 Update)

Recent updates to the Knowgrph Canvas pipeline ensure seamless rendering of this schema:
- **Radial Layout Stability**: Force simulation forces are automatically disabled in Radial mode to prevent layout drift.
- **Fit-to-Screen Policy**: Fit uses capped `1920×1080` (16:9) with `targetFillRatio=0.8` and responds to UI chrome changes (e.g. sidebar toggles).
- **Zoom State Isolation**: Zoom state is cached per viewKey (render/layout/frontmatter/semantic + presentation toggles) to prevent cross-mode contamination.
- **Non-Overlap Guarantees**: Group bbox collision is enforced whenever `layout.groups.enabled !== false`; legacy `groupBboxCollide` is deprecated for disabling.
- **Collision Tolerance**: Implementations may expose `layout.forces.bboxCollideTouchEpsilon*`, `layout.forces.groupBboxCollideTouchEpsilon*`, and `layout.forces.groupBboxCollideNestedTouchEpsilon*` to stabilize near-touch AABB separation (including nested group inner-border vs parent border, computed from the group’s rendered bounds rather than inflated collision gap). Broadphase should be subquadratic (e.g., packed R-tree), and Z pushes should be gated by `*ZEnabled` + explicit Z values.
- **Theme Alignment**: Labels and headings automatically adapt to System/Light/Dark themes.
- **Theme-Safe Defaults**: Renderer label colors are theme-derived by default (no hardcoded black/white schema defaults).
- **Performance**: Optimized caching for adjacency maps and layout positions.
- **Renderer Exclusivity**: D3 2D, Flow 2D, 3D, and Geospatial Mode are mutually exclusive at runtime to forbid hidden background rendering/recalculation; only the active mode is mounted and may consume shared requests.
- **2D Renderer Toggle**: Canvas supports a 2D renderer toggle (D3 ↔ Flow) while preserving selection and isolating view/layout caches by renderer id.

---

## 🧪 Validation Checklist

### **Structural (✅ Required)**
- [ ] All nodes have unique `@id`
- [ ] All nodes have non-empty `labels[]`
- [ ] All edges have `source`, `target`, `label`
- [ ] All edge references point to existing node `@id`
- [ ] Valid JSON syntax

### **Semantic (❌ NOT Validated by Schema)**
- ❌ Property value types (e.g., "name" is string)
- ❌ Label validity (e.g., "Company" is an allowed type)
- ❌ Business rules (e.g., "founded" date < "dissolved" date)

**Rationale:** Schema is domain-agnostic → Domain validation is application logic

---

## 📦 Export Formats

| Format | Use Case | File Extension |
|--------|----------|----------------|
| **JSON-LD** | Agents, RAG, Semantic Web | `.jsonld` |
| **JSON** | D3.js, Generic Apps | `.json` |
| **CSV** | Spreadsheets, Analysis | `.csv` (nodes + edges) |
| **DuckDB** | Agent Queries, Hybrid Search | `.duckdb` |
| **Neo4j Cypher** | Graph Database Import | `.cypher` |
| **GraphML** | Visualization Tools | `.graphml` |

---

## 🛠️ Tool Integration

### **D3.js Visualization**
```javascript
d3.json('graph.jsonld').then(data => {
  const nodes = data['@graph'].filter(n => n['@type'] === 'kg:Node');
  const edges = data['@graph'].filter(e => e['@type'] === 'kg:Edge');
  // Render force-directed layout
});
```

### **RAG Retrieval**
```python
query_text = "example query"
# 1) load graph nodes that have chunk_text and embedding
# 2) compute similarity(query_text_embedding, node.embedding)
# 3) filter by metadata.confidence if present
# 4) return top-k nodes and relevant subgraph context
```

### **Neo4j Import**
```cypher
// Generated by Exporter from graph.jsonld
CREATE (n:Entity {id: 'node:123', properties: {...}})
CREATE (e:Edge {relation: 'FOUNDED_BY', ...})
MERGE (a)-[r:FOUNDED_BY]->(b);
```

---

## 📚 Resources

- **Example Data:** See `example-graph.jsonld` and `example-lean-startup-layer-modes.jsonld`
- **Renderer Palette:** See `colors.jsonld` (Lean Startup MVP node/edge palette shared across layer modes)
- **Agentic Use Cases:** See "Why This Schema Matters for Agentic GraphRAG"

---

## 🤝 Contributing

### **Adding Language Support**
1. Fork schema files
2. Add `@language` entries to `rdfs:label` and `rdfs:comment`
3. Update `@context` default language if needed
4. Test with multilingual data

### **Extending Schema (Backward Compatible)**
1. Add new optional fields to context.jsonld
2. Increment minor version (1.0.0 → 1.1.0)
3. Document in CHANGELOG.md
4. Never make new fields required

---

## ⚖️ License

MIT License - Use freely in commercial and open-source projects

---

## 📞 Support

- **Issues:** github.com/huijoohwee/huijoohwee.github.io/issues
- **Discussions:** For agentic GraphRAG patterns
- **Email:** Schema maintainer contact

**Status:** Production Ready ✅
