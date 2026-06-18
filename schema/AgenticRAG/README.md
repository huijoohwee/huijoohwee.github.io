---
title: "Knowledge Graph JSON-LD Schema v1.0.0"
doc_type: "Schema Index"
status: "active"
lang: "en-US"
frontmatter_contract: "required"
---

# Knowledge Graph JSON-LD Schema v1.0.0

## Markdown YAML Frontmatter Contract

- The opening YAML frontmatter block remains the first block and canonical metadata SSOT for this schema index.
- This document is a canonical authored schema README, not a typed validation fixture or generated registry surface.
- Frontmatter stays in plain YAML so the file demonstrates the default authoring path for schema indexes, sync rules, and renderer/pipeline contract overviews.
- If typed `{key, type, value}` envelopes are needed for ingest -> parse -> render validation, that coverage should live in a dedicated fixture doc rather than replacing canonical schema prose.
- Cross-repo sync and schema decisions must be derived from parsed frontmatter and document content only, never from file path assumptions or downstream mirrors.

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
├── README.pipeline-and-renderer-guidelines.md # Continuation: pipeline and renderer guidelines
├── node-schema.jsonld                        # Node structural contract (@id + labels required)
├── edge-schema.jsonld                        # Edge structural contract (@id + source/target/label required)
├── graph-schema.jsonld                       # Graph container contract (@context/@graph + metadata)
├── metadata.jsonld                           # Provenance/metrics conventions (structural, not semantic)
├── neutrality.jsonld                         # Domain-agnostic constraints and anti-patterns
├── colors.jsonld                             # Lean Startup MVP palette (renderer directive)
├── canvas.jsonld                             # Canvas/renderer integration directives
├── panels.jsonld                             # Panel/pane interaction directives (UI contract)
├── flow-widget-bundle.jsonld       # Flow Editor widget bundle import/export contract
├── video-generation-widget.jsonld  # VideoGeneration widget contract
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

- **Source:** `knowgrph/docs/documents/**` (repo-relative, recursive)
- **Target artifact:** `schema/AgenticRAG/knowgrph-documents-map.graph.jsonld`
- **Language compliance:** the sync enforces both `en-us` and `zh-cn` support (see Languages above). Document node `language` is inferred from filename (`*.zh-cn.*` → `zh-cn`), otherwise defaults to `en-us`.
- **Config artifact root:** Knowgrph repo config artifacts resolve from `data/config/{graphrag,schema,orchestrator,llm-chat}`; schema docs must mirror that source-owned tree and must not preserve alternate root-level config folders.
- Nested document families such as `docs/documents/knowgrph-api-reference/**`, `docs/documents/knowgrph-mcp/**`, and future sharded companion folders must be represented in the sync map by their relative document paths, not dropped because they are not top-level files.

### Git Rebase / Conflict Resolution (Cross‑Repo)

- Prefer rebasing when syncing Knowgrph↔Schema changes to keep one linear history for contract updates.
- Integrations pipeline docs must follow one-row-one-directive (max 50 words per directive) and keep runtime/doc behavior tied to one shared TS SSOT source.
- Cross-repo integration directives are indexed at `knowgrph/docs/documents/knowgrph-integrations-ssot-sync-directives.md`.
- Multi-app publish topology keeps `knowgrph` and `singabldr` as separate Dev SSOT repos, syncs only generated app surfaces into `huijoohwee`, and keeps `airvio.co/knowgrph` and `airvio.co/singabldr` route ownership isolated.
- Knowgrph goal-driven refactors use `/Users/huijoohwee/Documents/GitHub/knowgrph` as Dev SSOT, `/Users/huijoohwee/Documents/GitHub/huijoohwee/content/knowgrph` as generated Prod artifact mirror, and `airvio.co/knowgrph` as the public Cloudflare route; schema notes mirror upstream docs only after source validation.
- Production release evidence belongs in `knowgrph/todo-log.md` as the canonical ledger row; for example the 2026-06-16 Dev->Prod->Cloudflare release is anchored by Dev `36dd25e7`, publish `af9f48a5`, preview `https://ea647ff5.joohwee.pages.dev`, and live `https://airvio.co/knowgrph/`.
- Knowgrph super-agent harness responsive proof is source-owned by `knowgrph_parser/superagent_responsive.py`, emitted into graph/workspace metadata plus `artifacts/responsive/responsive-proof.json`, and must cover `320x640`, `390x844`, `768x1024`, `1366x768`, and `1920x1080` classes before Cloudflare route parity claims.
- Oversized `knowgrph/docs/documents` markdown stays split at stable section boundaries into companion files; keep the original filename as the canonical sub-600-line index and keep explicit continuation links to the companions.
- Storage docs follow the same sharding rule: `knowgrph-storage-document.md` stays the canonical sub-600-line index, companion files carry schema/runtime detail, and the docs map must keep canonical and companion files as separate nodes.
- Knowgrph storage remains Git-markdown canonical plus browser-local RxDB working state, with optional Cloudflare Worker + D1 shared sync; pulled remote records must re-enter visible `sourceFiles` through the existing runtime path rather than a second import flow.
- Knowgrph D1 document writes must resolve `(workspace_id, canonical_path)` as the storage identity before insert so seeded docs, Source Files edits, and Share URL publication converge on one row.
- Source Files bootstrap must keep seed-sync and rematerialize scheduling request-owned in `SourceFilesPersistenceBootstrap.tsx`, reuse caller-owned sourceFiles snapshots, and document prepared-request handoffs so Source Files, Workspace, and Storage stay in sync without redundant store reads.
- Storage sync conflict resolution must reuse the shared toast/log/runtime action path; the same action descriptors may appear in toast cards and History log rows, and duplicate conflict-only panels or modals are forbidden.
- KGC run lineage must stay explicit across docs and schema references: `kgc-trace_<ts>.md` -> `kgc_<ts>.md` (`Run`) -> `kgc-output_<ts>.md`.
- Widget (Image/Video) documentation must describe one shared widget-bundle SSOT so JSON and Markdown projections remain parity-safe for `registry` and `graph` content.
- Ingest→parse→render doc sync should treat `knowgrph-computing-data-flows-import-render-pipeline-document.md` and the computing-flow sample as the canonical fixture/doc pair; companion-file sharding must preserve the original doc path for stable sync-map references.
- The docs sync map should keep both the canonical index files and their companion markdown files as separate document nodes so cross-repo references remain lossless after sharding.
- If conflicts involve `knowgrph/canvas/src/components/GraphCanvas/scene.ts`, preserve idempotent initialization (no “double-fit” jump) and schema-driven fit (`readFitAllOptions` + `fitAllTransform`).
- Never hand-merge `knowgrph/canvas/tsconfig.tsbuildinfo`; regenerate via `npm --prefix canvas run check` or `npm --prefix canvas run build`.
- Public HackaMap delivery must prefer precomputed `hackamap_api_graph.json`; graph→Flowchart fallback is resilience-only.
- HackaMap runtime metadata must stay browser-fetchable from the published SSOT pipeline contract and `/api/graph?view=meta`, not a second manifest.
- Knowgrph Flowchart client fetches should build `/api/graph`, `?run=`, and `?view=meta` from one shared helper so runtime-meta and data payload paths do not drift.
- HackaMap preset builders must derive parameter choices from published runs and apply exact published matches only.
- Expand published HackaMap runs by adding verified non-empty variants with stable suffixes, then regenerate query outputs and republish the bundle.
- Prefer parameter axes that constrain event and demo subsets directly; published year-series runs for `2024`/`2025`/`2026` are safe builder inputs.
- Mobile/PWA metadata for `/knowgrph` must come from `knowgrph/canvas` source and be mirrored by Pages sync, not patched in `content/knowgrph`.
- Public Flowchart controls should consume published `runtime.mobile_pwa` hints for compact stacking and safe-area spacing instead of host-specific breakpoint forks.
- Installed `/knowgrph` must precache all hashed `assets/*` chunks, cache same-origin JSON/JSON-LD/webmanifest payloads, and expose Canvas plus Editor manifest shortcuts from source-owned PWA config.
- Installed `/knowgrph` should publish `data-kg-display-mode` and `data-kg-installed` from one shared PWA runtime helper and surface offline-ready/update-ready signals through the in-app toast path.
- Installed `/knowgrph` should also recognize `standalone`, `fullscreen`, and `minimal-ui` from the same helper and publish offline/update datasets for CSS-only shell tuning.
- Canvas touch ergonomics should stay source-driven through shared toolbar CSS, scrollable narrow toolbar chrome, touch-sized dropdown rows, viewport touch pan slop, node/group drag intent thresholds, collapsed-group chevron hit targets, resize-handle touch tolerance, active resize feedback with stronger outline/label emphasis, parent/child semantic emphasis, inset handle anchoring, exclusive active handle ownership, active-shape layer raising, and root-owned motion-token transition recipes reused by graph chrome plus action buttons/viewer buttons, prevented-drag click guards, and viewport gesture guards rather than per-surface mobile forks.
- Import loader telemetry must finalize `loader:all` on no-match, empty-result, cache-hit, and markdown-fallback paths and emit a dedicated markdown fallback stage for comparable ingest timing.
- Source-file ingest should skip duplicate pending parses when the same file text hash is already loading while preserving stale-job and latest-hash writeback guards.
- Knowgrph initialization-file bootstrap must treat `huijoohwee/docs` as the source-text SSOT, materialize the canonical 3-file family (`README.md`, `knowgrph-video-demo.md`, `knowgrph-maps-grabmap-multim-demo.md`) into the workspace root, and keep those root-level paths as the stable activation/source-file ids.
- Initialization-file Canvas View switching must stay frontmatter-driven: `README.md` -> 2D D3 + Frontmatter Mode, `knowgrph-video-demo.md` -> 2D Flow Editor + Frontmatter Mode, `knowgrph-maps-grabmap-multim-demo.md` -> Geospatial Mode.
- Canonical authored Markdown and reusable templates must keep `flow:` in plain YAML scalars, arrays, and objects; normalized `{key, type, value}` wrappers are reserved for E2E ingestion/parsing/rendering fixtures after parsing.
- Flow Editor initialization fixtures such as `knowgrph-video-demo.md` should declare the full explicit frontmatter preset (`kgCanvasSurfaceMode`, `kgCanvasRenderMode`, `kgCanvas2dRenderer`, `kgDocumentSemanticMode`, `kgFrontmatterModeEnabled`, `kgMultiDimTableModeEnabled`, `kgDocumentStructureBaselineLock`) so Canvas View switching remains deterministic.
- Exact UI imports must promote the first imported preset document to the active raw-frontmatter authority before composed source-file replay, so the previously selected document cannot overwrite the imported document's renderer or surface landing.
- Metadata/layout autosuggest paths must not coerce block-layout initialization files away from an explicit frontmatter-selected renderer or geospatial surface.
- Frontmatter flow imports should resolve frontmatter variables first, then a second pass of dotted node-scoped refs like `{{node.data.key}}` before labels/data finalize.
- `kgCanvas2dRenderer: "animatic"` must reuse the same canonical `flow:` frontmatter graph contract as `kgCanvas2dRenderer: "flowEditor"` and keep timeline timing additive under `timeline.beats.*`; do not introduce a parallel animatic-only markdown dialect.
- Flowchart ingest must normalize `api`/`fixture`/`workspace` source metadata and `cross`/`spoke` edge roles through shared helpers; forbid renderer styling, fallback payloads, or workspace detection that depend on `/api/graph`, sample content, or filename-only JSON cues.
- Shared workspace Flowchart fallback parsing must use neutral workspace source/context ids and inline parse hints; forbid fake `.json` fallback names or `workspace-json` identity tokens.
- Shared 2D renderer behavior must derive D3-like, surface-mount, and minimap rules from central helpers; workspace JSON fallback parsing must stay generic and workspace Flowchart payloads must retain workspace source metadata.
- Shared 2D renderer menus must derive renderer order and short labels from the same shared renderer spec used by frontmatter normalization; toolbar surfaces may keep local icon/title presentation only.
- Adjacent 2D surfaces must also reuse shared renderer-id and family helpers in persistence, store bootstrap/setters, minimap/editor gating, and D3 scene/schema activation instead of repeating inline renderer allowlists.
- 2D renderer initialization across D3 Graph, Flowchart, Flow Canvas, Design, and Flow Editor should compute fit and group envelopes from the same display-derived node and cluster bounds so switching variants preserves visible extents; Flow Editor additionally extends these envelopes with widget overlay extents as described below.
- Flow Editor group containment should merge explicit group bounds with computed member-footprint AABBs (including configured padding/label-top offsets) so initialization keeps widget-driven surfaces within layer/subgraph/cluster/group envelopes.
- Flow Editor containment must also union zoom-aware pinned widget panel world extents for member nodes and seed new pinned editors evenly by containment-group envelopes (viewport-centered fallback) to avoid startup clumping and panel-box overflow.
- For `frontmatter-flow`, widget node/handle/edge rendering should be flow-derived SSOT: include only declared flow node ids plus typed ports referenced by handles/edges/registry, suppress synthetic fallback handles in overlays, and do not render absent hardcoded ports such as `compute`/`data`.
- Frontmatter-flow parser surfaces should treat `flow` as canonical and avoid synthetic placeholders: skip legacy top-level `edges` when flow metadata exists, keep endpoint ids as declared, and emit subgraph metadata only from explicit `kg:subgraphs` plus cluster derivation.
- Frontmatter `flow:` metadata should centralize `direction`, `edgeType`, and `computed`; Flow, Flow Editor, and runtime dataflow must consume one shared helper instead of re-parsing settings per surface.
- Frontmatter `computed:false` must disable runtime `flow:compute` hydration only; parse-time variable/template resolution remains unchanged to preserve authored markdown labels and text.
- Markdown preview link resolution should read `VITE_CODEBASE_ROOT` from both Vite env and Node test env so repo-relative `/__codebase_asset` URLs stay stable across dev, tests, and publish previews.
- Embedded Markdown GeoJSON should extract GraphData load requests through one shared helper, then reuse the same graph-load and geospatial auto-enable path as `.geojson` imports; keep the computing-flow sample generic and forbid Markdown-only toggles.
- MainPanel should derive searchable tabs, search placeholders, and footer labels from one tab metadata path, let header/search/footer plus key-value rows wrap responsively, and keep Settings lazy-load helpers off toolbar-owned init bridges.
- MainPanel Integrations should expose a distinct Integrations tab icon, prefer BytePlus ModelArk as the default official AI profile with OpenAI secondary, route provider auth/model refresh through one proxy-backed chat contract, and auto-expand matching Settings groups when Chat launches a `chat` search so AI routing state is immediately visible.
- FloatingPanel Chat and MainPanel Flow Editor Manager should both reflect the same shared official AI profile summary (provider, region, model) and link configuration back to MainPanel Settings instead of introducing duplicate provider controls.
- FloatingPanel Chat should inject a strict Markdown response contract system prompt; standard chat responses may include one optional `response:` YAML metadata block for parameterized follow-up turns, while `chatKnowgrph` persists only the structured KGC base-template contract (`kgc-pipeline/v1`).
- Treat streaming as a Workspace-only concern: write in-progress turns into the active `kgc_*.md` document, keep Chat UI to one final assistant bubble plus the workspace link, and avoid any second graph-apply runtime.
- Streaming lineage should also stay on the shared workspace path: persist one timestamped session folder with `chat-stream-log_*`, `chat-stream-report*`, and additive dereferenced share/report markdown artifacts derived through the shared URL-content import pipeline.
- Oversized streaming source docs in `knowgrph/docs/documents` must keep the original filename as the canonical sub-600 index and move detail into companion markdown files linked by explicit Continuation notes.
- `chatKnowgrph` canonical acceptance must enforce frontmatter↔body linkage: all body `{{key}}` refs must be declared in YAML frontmatter (base-template allows dotted `runtime.*` refs), and persistence only normalizes `links.self_ref` from the `kgc_yyyymmddhhmmss.md` filename.
- FloatingPanel Chat should optionally append chat exchanges into a workspace Markdown file (configurable path; default create `chh_yyyymmddhhmmss.md` under `chatLocalStorageRootPath` on first success) so Chat history is viewable and editable in the Workspace Editor Split view without relying on server log artifacts.
- Chat history storage should remain explicit: `local` writes to workspace files; `cloud` reserves a URL field and must remain inert until a real sync backend exists.
- Chat history Settings actions should reuse Launch import contracts: local path setup via the same `Import local files` bridge/fallback path and cloud URL setup via the same `Import URL` bridge/fallback path.
- FloatingPanel should derive view buttons, shared header status chips, full-height body rules, and renderer-only header actions from one shell metadata path; cap width to the viewport, wrap header/status rows, and keep only the active view mounted.


### Continuation

See continuation in `README.pipeline-and-renderer-guidelines.md` for Canvas Zoom/Fit SSOT, Graph Data Table, markdown/webpage, and pipeline guidelines.
