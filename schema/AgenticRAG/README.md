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
├── flow-widget-bundle.jsonld       # Widget bundle import/export contract
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
- Knowgrph goal-driven refactors use `$GITHUB_ROOT/knowgrph` as Dev SSOT, `$GITHUB_ROOT/huijoohwee/content/knowgrph` as generated Prod artifact mirror, and `airvio.co/knowgrph` as the public Cloudflare route; schema notes mirror upstream docs only after source validation.
- Production release evidence belongs in the active `agentic-canvas-os/todo/YYYY-MM.md` shard under the `agentic-canvas-os/docs/TODO.md` contract; the migrated 2026-06-29 Dev->Prod->Cloudflare release record is in `agentic-canvas-os/todo/2026-06.md`, anchored by Dev `530462d6`, publish `ec4dfa47`, preview `https://0d3c18ba.joohwee.pages.dev`, live `https://airvio.co/` plus `https://airvio.co/knowgrph/`, and D1 docs seed `applied=41 conflict=0 rejected=0`.
- Settings-flow provenance remains code-derived and source-owned in `knowgrph`; generated outputs such as `canvas/public/settings-flow.json` and the publish mirror `huijoohwee/knowgrph/settings-flow.json` are release artifacts, not downstream hand-edit surfaces.
- Knowgrph super-agent harness responsive proof is source-owned by `knowgrph_parser/superagent_responsive.py`, emitted into graph/workspace metadata plus `artifacts/responsive/responsive-proof.json`, and must cover `320x640`, `390x844`, `768x1024`, `1366x768`, and `1920x1080` classes before Cloudflare route parity claims.
- The canonical mobile-first execution queue lives in `knowgrph/docs/documents/knowgrph-mobile-first-enhancement-plan.md`; schema notes should mirror only the validated upstream plan and must not create a second mobile checklist.
- Responsive parity is now a named upstream release blocker: before `pages:deploy-cloudflare`, the mobile keyboard browser smoke, the route-and-action matrix review, and `pages:check-sync` must agree; schema notes should mirror that blocker exactly and must not weaken it into optional guidance.
- Publish-side MCP PRD/TAD pages in `huijoohwee.github.io/docs/documents/knowgrph-mcp-*.md` are mirror notices and index entry points, not downstream contract owners; schema guidance must point edits and release-gate ownership back to the canonical `knowgrph/docs/documents/**` sources.
- Oversized `knowgrph/docs/documents` markdown stays split at stable section boundaries into companion files; keep the original filename as the canonical sub-600-line index and keep explicit continuation links to the companions.
- Storage docs follow the same sharding rule: `knowgrph-storage-document.md` stays the canonical sub-600-line index, companion files carry schema/runtime detail, and the docs map must keep canonical and companion files as separate nodes.
- Knowgrph storage remains Git-markdown canonical plus browser-local RxDB working state, with optional Cloudflare Worker + D1 shared sync; pulled remote records must re-enter visible `sourceFiles` through the existing runtime path rather than a second import flow.
- Knowgrph D1 document writes must resolve `(workspace_id, canonical_path)` as the storage identity before insert so seeded docs, Source Files edits, and Share URL publication converge on one row.
- Source Files bootstrap must keep seed-sync and rematerialize scheduling request-owned in `SourceFilesPersistenceBootstrap.tsx`, reuse caller-owned sourceFiles snapshots, and document prepared-request handoffs so Source Files, Workspace, and Storage stay in sync without redundant store reads.
- Rich-media browser smoke remains a Dev-only verification boundary owned by `knowgrph`: `canvas/src/features/testing/RichMediaBrowserSmokePage.tsx` plus `npm run test:smoke:rich-media:browser` validate shared `RichMediaPanel` runtime surfaces and emit `data/outputs/rich-media-browser-smoke.png`; schema mirrors should describe that boundary only, not restate it as a deploy artifact.
- Rich-media preview timing owners remain one affected-CI scope in `knowgrph`: changes to the v1 schema, validator, fixture manifest, smoke page/runner/verifier, or browser-contract test must automatically select both the timing-schema gate and focused `richMedia.browserSmokeContract` gate.
- Knowgrph local collaboration keeps exactly one registered worktree per repository on each device and switches task branches in place. The count-only `npm run worktree:check` command reuses the canonical source registry without fetching or starting Dev, and runs first in `ci:integration`, so pre-push and the remote Integration Gate fail closed on redundant linked worktrees.
- Knowgrph owns the Agentic Canvas OS checkout repository and immutable revision only in `docs/runtime-readiness-contract.md`. The standalone `npm run collaboration:contract:check` auto-discovers every workflow consumer and requires dependency installation, the validated `npm run runtime:docs-dependency:resolve` output, and checkout in order; workflow YAML must not copy the SHA or accept a mutable ref. Its `--json` mode validates against the canonical Draft 2020-12 `schemas/collaboration-runtime-report.v1.schema.json` before emitting `knowgrph.collaboration-runtime-report/v1`; Integration uploads, downloads, and revalidates the seven-day `collaboration-contract-report` artifact with `npm run collaboration:report:check`. External consumers can run `npm run --silent collaboration:report:schema` to receive the exact canonical schema bytes and `npm run --silent collaboration:report:example` to receive a current schema-valid local report with pull-request coordination marked `not-applicable`; piping that example into `npm run --silent collaboration:report:check -- -` is the canonical path-independent smoke test, while `npm run --silent collaboration:report:check -- --json -` emits structured status, schema identity, and input type for automation. AgenticRAG references those upstream contract surfaces and must not copy or redefine their schema, example fixtures, or validator output.
- Storyboard rich-media drag smoke remains a Dev-only boundary owned by `knowgrph`: browser smoke proves one image and one video `Rich Media Panel` drop without shifting existing storyboard cards or panels, live-route retention proves markdown reapply cleanup, runtime scene seeding prefers the freshest draft graph, and source/target port selectors accept exact ids or workspace-prefixed suffixes.
- Visual annotation renderer reuse remains Dev-owned by `knowgrph`: `2D Renderer: Flow Editor`, `2D Renderer: Media`, and `2D Renderer: Storyboard` consume one native dataset runtime for detections, masks, persistent track ids, polygon-zone filters/counts, and dataset save/convert artifacts; external CV projects are reference-only and must not become copied code, package dependencies, or hardcoded validation inputs.
- Video-agent media routing remains split by surface: Flowchart panels own workflow/process stages, while Timeline panels expose compact source video, semantic frame-by-frame annotation samples, and source audio tracks; granular detections and source-frame images stay in dataset and frame-analysis payloads instead of becoming overlapping Timeline transport rows or thumbnail strips.
- Video-frame extraction mirrors the timestamped Import URL artifact shape: Dev/Preview frame images land under `huijoohwee/image/video-frame/YYYYMMDDTHHmmssZ` through the shared Import URL frame endpoint.
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
- Knowgrph initialization-file bootstrap must treat `huijoohwee/docs` as the source-text SSOT, materialize the canonical 3-file family (`workspace-readme.md`, `knowgrph-agentic-video-canvas-demo.md`, `knowgrph-maps-places.md`) into the workspace root, and keep those root-level paths as the stable activation/source-file ids.
- Initialization-file Canvas View switching must stay frontmatter-driven: `workspace-readme.md` -> 2D D3 + Frontmatter Mode, `knowgrph-agentic-video-canvas-demo.md` -> 2D Storyboard + Frontmatter Mode, `knowgrph-maps-places.md` -> Geospatial Mode.
- Canonical authored Markdown and reusable templates must keep `flow:` in plain YAML scalars, arrays, and objects; normalized `{key, type, value}` wrappers are reserved for E2E ingestion/parsing/rendering fixtures after parsing.
- Storyboard initialization fixtures such as `knowgrph-agentic-video-canvas-demo.md` should declare the full explicit frontmatter preset (`kgCanvasSurfaceMode`, `kgCanvasRenderMode`, `kgCanvas2dRenderer`, `kgDocumentSemanticMode`, `kgFrontmatterModeEnabled`, `kgMultiDimTableModeEnabled`, `kgDocumentStructureBaselineLock`) so Canvas View switching remains deterministic.
- Exact UI imports must promote the first imported preset document to the active raw-frontmatter authority before composed source-file replay, so the previously selected document cannot overwrite the imported document's renderer or surface landing.
- Metadata/layout autosuggest paths must not coerce block-layout initialization files away from an explicit frontmatter-selected renderer or geospatial surface.
- Frontmatter flow imports should resolve frontmatter variables first, then a second pass of dotted node-scoped refs like `{{node.data.key}}` before labels/data finalize.
- `kgCanvas2dRenderer: "animatic"` must reuse the same canonical `flow:` frontmatter graph contract as `kgCanvas2dRenderer: "storyboard"` and keep timeline timing additive under `timeline.beats.*`; do not introduce a parallel animatic-only markdown dialect.
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
- FloatingPanel Chat composer discovery should reuse the native shared command-menu listbox: `/` resolves canonical chat skills/commands; `@` resolves active Markdown variables into `{{key}}` or canonical image/audio/video embeds with shared mini thumbnails from the cached FloatingPanel Media inventory; rendered media variables such as `{{mediaUrl}}` reuse that thumbnail utility; and `#` resolves registered memory/media/agent/model/MCP directives without duplicating generic keywords. External execution requires explicit scope and an exposed tool; unavailable tools return exact handoffs instead of fabricated success, and media directives preserve referenced assets instead of inventing URLs.
- Treat streaming as one shared Chat/Workspace lifecycle: materialize one visible busy assistant bubble before the first token, update that same row in place through live and final states, keep chronological stream status after it, preserve tail-follow until the user scrolls away, write in-progress workspace evidence through the active trace/canonical session path, and avoid any second graph-apply runtime.
- Streaming lineage should also stay on the shared workspace path: persist one timestamped session folder with `chat-stream-log_*`, `chat-stream-report*`, and additive dereferenced share/report markdown artifacts derived through the shared URL-content import pipeline.
- Oversized streaming source docs in `knowgrph/docs/documents` must keep the original filename as the canonical sub-600 index and move detail into companion markdown files linked by explicit Continuation notes.
- `chatKnowgrph` canonical acceptance must enforce frontmatter↔body linkage: all body `{{key}}` refs must be declared in YAML frontmatter (base-template allows dotted `runtime.*` refs), and persistence only normalizes `links.self_ref` from the `kgc_yyyymmddhhmmss.md` filename.
- FloatingPanel Chat should optionally append chat exchanges into a workspace Markdown file (configurable path; default create `chh_yyyymmddhhmmss.md` under `chatLocalStorageRootPath` on first success) so Chat history is viewable and editable in the Workspace Editor Split view without relying on server log artifacts.
- Chat history storage should remain explicit: `local` writes to workspace files; `cloud` reserves a URL field and must remain inert until a real sync backend exists.
- Chat history Settings actions should reuse Launch import contracts: local path setup via the same `Import local files` bridge/fallback path and cloud URL setup via the same `Import URL` bridge/fallback path.
- FloatingPanel should derive view buttons, shared header status chips, full-height body rules, and renderer-only header actions from one shell metadata path; cap width to the viewport, wrap header/status rows, and keep only the active view mounted.


### Continuation

See continuation in `README.pipeline-and-renderer-guidelines.md` for Canvas Zoom/Fit SSOT, Graph Data Table, markdown/webpage, and pipeline guidelines.
