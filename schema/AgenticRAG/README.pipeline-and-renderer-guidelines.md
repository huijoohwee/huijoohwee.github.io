# Knowledge Graph JSON-LD Schema v1.0.0 - Pipeline and Renderer Guidelines Companion

> Continuation from `README.md`.

### Canvas Zoom/Fit SSOT (Knowgrph)

- **Preset SSOT:** `knowgrph/grph-shared/src/zoom/presets.ts` (capped 16:9 frame + default fill ratio)
- **Consumers:** `knowgrph/canvas/src/components/GraphCanvas/{fit.ts,simulation.ts}` (fit transforms + seeding/disjoint sizing)
- **Flow renderer:** `knowgrph/canvas/src/components/FlowCanvas.tsx` applies the same fit/zoom policies while rendering via a native Canvas2D Flow renderer.
- **Collective fit+center:** Fit-to-view / fit-to-screen must be computed from the display-derived graph (post filters/collapse) and must include node dimensions (prefer `visual:width/height` when present) plus group envelopes (clusters/subgraphs/layers) so the visible graph is fully in-viewport and centered.
- **Reset semantics:** Toolbar Reset is defined as Fit-to-View framing (centroid + group-aware bounds) and must not force `k=1` when the graph is larger than the viewport.
- **Initialization parity:** initial view restoration is bounds-guarded (do not apply stored transforms until bounds are computable) and idempotent (forbid “double-fit” jumps when a stored transform is applied); when positions are only partially available, skip invalid geometry to prevent one-long stray lines.
- **Zoom key isolation:** zoom view keys are isolated by 2D renderer variant (`canvas2dRenderer`) while still including semantic mode + schema layout fingerprint; forbid cross-renderer zoom state contamination.
- **2D layer order SSOT:** centralize layer ranks (nodes/edges/groups/labels/handles) and apply consistently across SVG (D3) and native canvas (Flow/Flow Editor/Storyboard) so stacking does not drift.
- **Canvas overlays:** in-canvas overlays (e.g. Storyboard Widget) must derive any zoom-coupled scaling from a single SSOT helper and should keep *macro view* usable at extreme zoom-out (avoid oversized overlays that hide the graph).
- **Collision relax parity:** apply a bounded collision relax pass when layouts are produced/frozen (post-collective-fit freeze in D3; post-layout in Flow/Flow Editor/Storyboard; post-drag in Design) to forbid persistent overlaps.
- **Collision relax determinism:** seed any collision force initializer RNG by stable inputs (e.g., node ids) and clamp displacement so overlap removal cannot destroy macro layout.
- **Flow overlap guard:** do not rely only on “unstable positions” detection; also trigger relax using a cheap overlap-pressure heuristic so overlapping-but-stable layouts get settled.
- **Bounded store writes:** when collision relax produces multi-node/frame patches, batch store updates to avoid rerender churn and feedback loops.
- **Design auto zoom modes:** Auto Fit-to-Screen and Auto Zoom-to-Selection should work in Design by using the renderer’s local display graph for fit signatures.
- **Flow packing cohesion:** collective packing should treat group membership as connectivity so groups/subgraphs remain cohesive even when edges are sparse.
- **Flow edge labels:** native edge-label placement should avoid collisions (nodes/groups/labels) and be gated by zoom and graph size to stay bounded.
- **Overlay event proxy:** fly-out overlays must expose a stable root selector (`[data-kg-widget][data-kg-flow-editor-mode="1"]`) at the portal root so global capture handlers can proxy wheel/gesture zoom without brittle DOM assumptions.
- **Safari pinch parity:** when Safari emits `gesture*` pinch events over the canvas or fly-out overlays, the app must prevent browser zoom and apply anchored zoom to the active 2D renderer.
- **Wheel/trackpad parity:** 2D zoom must share wheel delta normalization + zoom factor SSOT; clamp-edge behavior should avoid “min zoom-out bounce back zoom-in” and avoid zooming while dragging nodes.
- **Overlay z-index parity:** overlay-only routing/edges must stack relative to the panel z-index SSOT (e.g., `floatingPanelZIndex`) rather than hardcoded constants so widgets reliably remain on top.
- **Document baseline isolation:** switching semantic modes must not back-propagate zoom/collapse state into Document Structure mode unless explicitly pinned.
- **Keyword derive debounce settings:** `keyword.graph.previewDebounceMs` and `keyword.graph.fullDebounceMs` gate preview/full worker derivation to avoid churn.
- **Design webpage wireframe parity:** the Design 2D renderer must consume a neutral `webpageLayout` snapshot (DOM elements + bounding boxes + safe CSS signals) and a deterministic DOM→graph converter that enforces geometric nesting, drops tiny noisy leaves and glue wrappers, preserves major semantic containers and landmark roles, and may synthesize neutral `SECTION` containers for repeated grid/list regions (e.g., feature/pricing cards) using viewport-aware structural heuristics only (never host/URL rules). Design shares selection/marquee, snap-to-grid, align/distribute, and keyboard nudging semantics and shortcuts with D3 and Flow, and exposes schema-only wireframe presentation settings (`renderer:designWireframe`) for label/meta chips, text/media previews, depth-aware styling, optional edges, and label-collision avoidance; the Floating Panel UI is a thin shell over these settings.
- **XR panel surfaces:** Toolbar Surface Mode `XR`, BottomPanel `XR`, and FloatingPanel `XR` must consume one shared semantic XR panel projection over native Knowgrph XR state. The panel may activate `canvas3dMode: "xr"` and expose shared physics controls/status plus WebGL/WebGPU/WebXR/glTF/PLY readiness and manifest import/render cache identity. Import URL and Import local files must materialize standalone PLY/SPZ captures as source-owned XR manifests instead of embedding or refetching payload bytes, source-only captures must not advertise legacy GLTF/GLB exports, and standalone spatial manifests must render through a source-only spatial stage instead of graph/model fallback. The runtime must not copy SuperSplat/PlayCanvas code, add viewer/runtime dependencies, commit validation asset paths, or fork renderer state per panel.
- **Rich Media rendering SSOT:** Rich Media nodes (image/svg/video/iframe) are detected via shared URL/metadata heuristics and rendered through a bounded DOM overlay pool per canvas (2D D3/Flow/Design and 3D). Overlays follow node motion via a shared RAF-coalesced scheduler, reuse a single overlay surface per canvas, and maintain Script/Imgs/Fid defaults as auto, driven by shared rich-media + iframe heuristics across Markdown Viewer, Canvas, Design, and Geospatial modes; per-doc frontmatter overrides remain optional escape hatches only.
- **Rich Media browser smoke boundary:** Dev-only browser verification should mount `knowgrph/canvas/src/features/testing/RichMediaBrowserSmokePage.tsx` and run `npm run test:smoke:rich-media:browser` to validate shared `RichMediaPanel` runtime surfaces for markdown preview/edit, iframe/srcDoc, snapshot iframe, click-to-open overlay, image zoom wheel, video HTML fallback, audio, and flow-editor chrome visibility.
- **Storyboard rich-media drag smoke boundary:** Dev-only browser verification should mount `StoryboardRichMediaDropSmokePage.tsx` and run `npm run test:smoke:storyboard-rich-media-drop:browser` to prove one image and one video `Rich Media Panel` drop without shifting existing storyboard cards or panels. Live-route retention should validate markdown reapply cleanup, runtime scene seeding should prefer the freshest draft graph, and source/target port selectors should accept exact ids or workspace-prefixed suffixes. Generic flow-editor drag/resize callbacks outside this path stay in focused regressions.
- **Media renderer + Timeline split:** `kgCanvas2dRenderer: "media"` is preview-only for rich media and playable video-sequence sources. BottomPanel `Timeline` owns transport, playhead, cut/splice, selected-clip nudge/trim/snap/split, scopes, audio mix, Mermaid Gantt writeback, bounded multi-step pinch zoom, rounded scale-domain ruler ticks, bar/lane scale parity, and right-side append workspace; FloatingPanel `Timeline` stays row/list-only. Panel shells must not fork playback state or reach into store internals directly, and timeline zoom chrome must not alter source-backed scrub, drag, or trim math.
- **Visual annotation E2E renderer boundary:** `2D Renderer: Flow Editor`, `2D Renderer: Media`, and `2D Renderer: Storyboard` are the renderer surfaces that may reuse the native visual annotation dataset runtime for load/split/merge/save artifacts, frame bounding boxes, and zone-count timelines. External CV projects remain inspiration-only references; AgenticRAG mirrors must not imply copied code, package dependency, or committed validation URLs/docs.
- **Video-sequence import stability:** Video-sequence playback resolves through shared timeline source/metadata helpers. Launch local files/folder and Import URL should generate one source-backed Media sequence document with stacked video/audio rows, `kgsrc_*` source ranges, and no default Mask/Grade operation backfill; operation lanes belong to explicit Timeline tools. Video-sequence activation should open BottomPanel and FloatingPanel `Timeline` instead of preserving stale `storyboardWidget` state. Local absolute-path imports may become `/@fs...` runtime URLs, but successful metadata probes must not be cleaned up as failures, and repeated imports of the same source should preserve a stable visible media element instead of remounting the preview.
- **Video-sequence export boundary:** Edited-media export is a derived runtime surface over the same compiled sequence plan used by preview/edit. It must keep using shared source/metadata helpers plus neutral browser media APIs (`captureStream`, `MediaRecorder`, `createMediaElementSource`) and the shared delayed-revoke blob download helper; it must not introduce a parallel export-specific source registry or success-path probe cleanup. Media preview session assembly belongs to that same upstream boundary too: source-backed preview items, the compiled export plan, the selected-row preview-sync plan, and sequence duration should flow through one shared preview-session hook. Media preview collection policy belongs there too: timeline-backed preview items, generic rich-media inventory items, Mermaid exclusion, dedupe keys, and merged ordering should flow through one shared preview-collection hook so Media Canvas and future preview surfaces do not rebuild cut/splice playback mapping locally. Media preview grouping/model policy belongs there too: stable family ids, family labels, per-surface visibility, and future monitor/timeline preview ordering should flow through one shared preview-surface model so new surfaces do not invent local grouping heuristics over the same collection. Media preview context belongs there too: per-surface preview intent, active family selection, and monitor scope generation should flow through one shared preview-context hook so Media Canvas and BottomPanel/FloatingPanel Timeline do not split source-family emphasis from ruler scope semantics. Shared source activity belongs there too: active segment resolution, active source equality, playhead-vs-selection precedence, activity mode, and per-family activity flags should flow through one shared source-activity model so Media Canvas, preview context, and ruler scopes do not recompute active-source semantics independently. Shared preview activity surfacing belongs there too: per-family and per-item active/dimmed/playhead/selection emphasis should flow through one shared preview activity-surface model so Media cards and future monitor/timeline preview surfaces do not rebuild highlight policy locally. Shared preview family compaction belongs there too: family collapse rules, representative-card selection, hidden-variant counts, and active-family ordering should flow through one shared preview family-compaction model so Media cards and future preview surfaces do not flatten every visible family item by default. Shared preview family disclosure belongs there too: disclosure state, visible-item selection, and family presentation should flow through one shared preview family-disclosure model while document-scoped expanded-family persistence, stale-family pruning, and optional active/playhead auto-open flow through one shared preview family-disclosure controller, so Media cards and future preview surfaces do not invent local show-more behavior, retain dead family ids, or fork disclosure state per context instance. Shared preview family disclosure presentation belongs there too: header visibility, summary copy, toggle labels/titles, auto-open affordance styling, and family-header tone should flow through one shared preview family-disclosure surface model so Media Canvas and future monitor/timeline family views do not rebuild the same presentation policy locally. Shared preview family section layout belongs there too: family section labels, card-grid labels, section-level semantic attrs, and empty/list summary layout policy should flow through one shared preview family-section layout model so Media Canvas and future monitor/timeline family views do not rebuild structural layout semantics locally. Shared preview source-object URL lifetime belongs there too: replacing or re-registering the same local video source should reuse one canonical blob URL and only delay revocation when the canonical URL truly changes, so mounted media can finish swapping cleanly without visible `net::ERR_ABORTED` churn. Preview video-element ownership belongs there too: surfaces should register the rendered `<video>` element through one shared preview-video binder instead of querying panel DOM, so transport sync, event listeners, and playback fallback remain headless and reusable. Preview surface composition belongs there too: semantic host attrs, default panel chrome/state, control policy, and video registration should flow through one shared preview-surface adapter so Media Canvas, monitor surfaces, and future timeline previews do not rebuild `RichMediaPanel` wiring locally. Shared progress/cancel semantics belong to that same helper boundary: preparing/rendering/finalizing labels, shared abort detection, active-button cancellation, abort-safe cleanup, and the structured `kind`/`phase`/`percentage`/`completedSegments`/`totalSegments` payload must not fork into panel-local implementations or label parsing. Shared export-plan validation belongs there too: empty plans or plans without any positive-duration source range must fail through the upstream validator before recorder/runtime work starts, and surface enablement should reuse that same rule. Shared export error taxonomy belongs there too: abort, capability, plan, source, and runtime failures must resolve through shared export error codes/messages and shared feedback mapping so surfaces reuse one canonical message boundary instead of panel-local fallback copy. Shared export outcomes belong there too: downloaded/cancelled/failed results should reuse one structured upstream payload with canonical message, toast kind, filename, and error-code fields. Shared export event telemetry belongs there too: progress events and terminal outcome events should reuse one structured `onEvent` envelope so surfaces/logging subscribe once instead of splitting progress and outcome callbacks. Shared export session history belongs there too: bounded run snapshots should reuse one shared reducer/history model with run id, filename base, timing, progress, and terminal outcome fields so future history/retry/audit surfaces do not rebuild run state from toasts. Shared export retry/replay belongs there too: previous runs should resolve replay through one stale-plan-safe request helper that requires no active export and a matching current compiled plan before retrying. Shared export retry grouping/compaction belongs there too: future surfaces should consume one lineage-aware session collection that groups `retryOfRunId` families, keeps retry-relevant runs visible, and compacts noisy retries without rebuilding ancestry logic locally. Shared export retry control belongs there too: retry buttons should derive enabled/disabled state and copy from one shared retry-control helper over the latest retryable session instead of panel-local heuristics. Shared export session surface belongs there too: recent-export strips should render from one shared session-surface model with upstream detail labels, empty-state copy, and retry affordances instead of panel-local row formatting. Shared export session tone/style belongs there too: recent-export rows should reuse one shared semantic tone/mode helper so running, downloaded, cancelled, and failed states do not fork into surface-local style mapping. Shared export session selection belongs there too: recent-export surfaces should choose visible runs through one shared ordering/filter helper that can prioritize the latest retryable run, keep active runs visible, apply optional status filters, and then fall back to recency. Export shutdown must finalize through one cleanup path so recorder-stop failure or cancellation still releases tracks, disconnects/closes Web Audio, and clears the video element.
- **Video-sequence preview-sync + animation boundary:** Selected-row preview alignment, playhead-active family emphasis, ruler activity markers, and native `data-kg-animation-*` timing must flow through one shared preview-sync plan plus shared source-activity models. Media Canvas, BottomPanel `Timeline`, and FloatingPanel `Timeline` must not fork activity or animation heuristics.
- **Initialization-file bootstrap parity:** Knowgrph reads canonical initialization markdown from `huijoohwee/docs`, materializes `/workspace-readme.md`, `/knowgrph-agentic-video-canvas-demo.md`, and `/knowgrph-maps-places.md` into the workspace root, and keeps those root-level paths as the stable activation/source-file ids across repos.
- **Initialization-file frontmatter landing:** `workspace-readme.md` lands on 2D D3 + Frontmatter Mode, `knowgrph-agentic-video-canvas-demo.md` lands on 2D Storyboard + Frontmatter Mode, and `knowgrph-maps-places.md` lands on Geospatial Mode; renderer/layout helpers must not silently coerce these files back to generic block-layout defaults.
- **Frontmatter authoring split:** canonical authored Markdown and reusable templates keep `flow:` in plain YAML scalars, arrays, and objects; normalized `{key, type, value}` wrappers remain limited to E2E ingestion/parsing/rendering fixtures after parsing and must not become the default authoring format.
- **Storyboard preset completeness:** switch-sensitive Storyboard fixtures should declare `kgCanvasSurfaceMode`, `kgCanvasRenderMode`, `kgCanvas2dRenderer`, `kgDocumentSemanticMode`, `kgFrontmatterModeEnabled`, `kgMultiDimTableModeEnabled`, and `kgDocumentStructureBaselineLock` together so workspace/file switching stays file-driven instead of inheriting stale runtime state.
- **Canvas Interaction & Workspace Sync Modes:** Canvas exposes two SSOT toggles shared by Toolbar and MainPanel Settings: `infiniteCanvasInteractionMode∈{static,interactive}` and `canvasWorkspaceSyncMode∈{manual,realtime}`. Static+Manual (default) runs 2D D3 force layout to a bounded stable state then freezes simulation, forwards overlay wheel/pan to Canvas so pan/zoom stay primary, and treats position-only updates as non-syncing metadata (Graph Data Table and GraphRecordDb sync only on content changes or explicit “Sync now”). Interactive+Realtime keeps D3 forces running and enables full overlay interactivity (iframes/images/videos/markdown blocks accept wheel/pointer events without forwarding to Canvas) while still using the same GraphData/layout keys and revision+viewKey-gated sync (structure-only revisions in static mode; full graph revisions in interactive mode), with deduping via last-write/last-sync gates to avoid loops or background churn. Implementations must not introduce renderer-specific parallel flags; Toolbar toggles and Settings must always remain in lockstep over the same underlying state.
- **Force-directed stability:** Force-directed 2D D3 layouts must preserve settled node positions across scene rebuilds and renderer toggles, and must not re-run strict-overlap relax or reheat the simulation once alpha is near-settled; overlay/panel membership changes update hidden-node sets and collision extents only, never restarting forces or mutating settled layouts.
- **2D/3D Animation Mode (view-only):** Animation is controlled by a Toolbar switch (beside Rich Media) and is strictly view-only. 2D D3 radial mode exposes `schema.layout.forces.radialOrbit*` knobs that toggle Orbit-style nested radial animation over an already-stable radial layout; this animator is gated to D3 radial, non-Flowchart graphs and must never re-derive GraphData or restart D3 forces. 3D globe-based animation (Fibonacci particles, hub orbits, arc travellers, camera ellipse path) is driven by `schema.three.*` config, reuses the same SSOT GraphData/layout fingerprint as 2D, and must not introduce a parallel derivation pipeline or alternate node/edge set.
- **Block 3D parity:** Standard 3D must stay available for Block/frontmatter-flow graphs and reuse the same display-graph and layout-cache path as 2D; only Radial layout auto-demotes to 2D, while Voxel remains Block-only.
- **Voxel Mode (3D Flowchart sub-mode):** Voxel Mode is a 3D sub-mode gated to Flowchart with Block layout. It reuses the same SSOT display graph and Flowchart lane positions as its XY baseline, places voxel cubes on the XY ground plane (`z=0`), and forbids voxel-specific derivation pipelines or Z-column-only layouts in parity mode. Voxel seeding must pull from the same layout-position cache keys as 2D (`datasetKey + layoutMode + semanticMode + frontmatterMode + viewKey`) so switching between Infinite Canvas 2D renderers (D3/Flowchart/Flow/Design/Flow Editor), semantic modes (Document/Keyword/Frontmatter/Multi-dimensional Table), and 2D/3D/Voxel modes preserves XY parity wherever those layouts are defined; mode toggles remain view-only. Voxel grouping and color must prefer imported layer metadata (`visual:layer`, `layer:label`, `layer:color`, `visual:color`) before hashed fallback styling, and Voxel entry points stay unavailable while Geospatial Mode is active.
- **2D Flowchart super-groups:** Flowchart graphs (nodes with type∈{problem,solution} and cluster ids from metadata) must be represented as a nested super-group hierarchy (root Flowchart → Problems/Solutions sides → per-cluster groups) via kg:subgraphs metadata. Layout/fit/visibility reuse this hierarchy; renderer-specific flags must not introduce a parallel grouping model or hide super-group/group headers during interaction.
- **Targeted lazy-loading gates:** Heavy feature surfaces (Monaco editor, MapLibre GeoJSON previews, Mermaid diagrams, GLTF exporter) should be lazy-loaded per feature surface, and entry/vendor preloads must avoid auto-mounting these bundles on page load so low-end and mobile devices remain responsive.

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
- FloatingPanel Media is the catalog for uploaded and AI/LLM-generated image/audio/video. Its Upload Media button and the card-field `@ Upload Media` command must share one upload helper and one inventory builder; insertion renders an inline media chip without mutating neighboring text typography. The panel projects the same inventory through native grid cards and three-row list items, not legacy key/type/value columns. Media thumbnails and Storyboard card/reference media previews use shared hover/focus-appearing translucent kind, info, open-link, and Download Media overlays; thumbnail clicks portal a direct shared Rich Media Panel into the previous centered lightbox position and player size without instantiating `MediaLightbox` or replacing insert, rename, delete, or open-link behavior. That direct panel retains the shared native fullscreen action, which follows `fullscreenchange` and switches between Enter and Exit fullscreen states. Visible Previous/Next controls, Left/Up and Right/Down keys, and horizontal touch swipes all reuse one wraparound owner over the currently visible image/video catalog sequence: swipe left advances, swipe right returns, vertical gestures are ignored, and audio is excluded. Uploaded media surfaces editable media descriptions and `#` metadata fields rather than storage-status copy. Storage responsibilities stay split: R2 bytes, D1 metadata/provenance, KV short-lived access URL cache, Durable Objects room sync notifications.
- **Preview surface shell boundary:** Shell labels, title/summary copy, empty-shell framing, and shell-level semantic attrs should flow through one shared preview surface-shell model so `MediaCanvas` and future preview surfaces do not keep top-level chrome decisions local.
- **Preview family-section chrome boundary:** Header visibility, summary data binding, toggle icon/mode/title/state, and disclosure toggle handlers should flow through one shared preview family-section chrome model so `MediaCanvas` does not coordinate family header controls locally.
- **Preview family-section body boundary:** Card-grid labels and per-item preview-surface props should flow through one shared preview family-section body model so `MediaCanvas` does not assemble per-card `TimelinePreviewSurface` inputs locally.
- **Preview family-sections boundary:** Aligned chrome/body section identity, merged section labels/attrs, and unified section rendering contracts should flow through one shared preview family-sections model so `MediaCanvas` does not zip parallel section arrays locally.
- **Preview media-canvas render boundary:** Shell/content render mode, section markup composition, and empty-state rendering should flow through one shared media-canvas render model plus render adapter so `MediaCanvas` remains a thin surface shell over one preview render contract.
- **Preview media-canvas frame boundary:** Outer shell labels, host semantic attrs, and frame markup should flow through one shared media-canvas frame model plus frame renderer so `MediaCanvas` remains limited to store/context binding.
- **Preview bootstrap boundary:** Preview collection assembly, cleaned document-key derivation, and preview/export-plan selection should flow through one shared preview-bootstrap hook so Media Canvas and Gantt monitor entrypoints do not rebuild session bootstrap locally.
- **Preview media-canvas binding boundary:** Inventory intake, document/session store binding, preview-bootstrap invocation, and preview-context invocation should flow through one shared media-canvas binding hook so `MediaCanvas` becomes a near-empty surface entrypoint.
- **Preview monitor-binding boundary:** Timeline/monitor entrypoints should consume one shared preview monitor-binding hook that composes preview bootstrap plus monitor-context inputs and only returns monitor scopes, while document-key derivation stays shared through the preview-bootstrap helper, so `GanttTimelineTransportPanel` does not wire preview bootstrap/context locally.
- **Gantt transport preview-session boundary:** Video-sequence parsing, monitor-binding inputs, export-plan derivation, and preview/export validation should flow through one shared transport-preview session hook so the transport session does not mix preview bootstrap concerns into transport/store state.
- **Gantt transport-session boundary:** Document/selection/transport store binding, parsed timeline state, transport-controller state, tool status, and duration/display state should flow through one shared transport-session hook so `GanttTimelineTransportPanel` does not assemble runtime session state locally.
- **Gantt transport chrome/export boundary:** Export-session surfaces, retry/export button state, tool-strip wiring, and header/context chrome markup should flow through one shared transport-chrome model plus render adapters so `GanttTimelineTransportPanel` does not build inline export/session/tool JSX locally.
- **Gantt transport ruler boundary:** Ruler props, lane-count styling, subtitle/title copy, total label handoff, and clamped transport value should flow through one shared transport-ruler model plus ruler renderer so `GanttTimelineTransportPanel` does not assemble inline ruler/chrome metadata locally.
- **Gantt transport shell boundary:** `TimelineTransportChrome` runtime props, shell/root markers, range flags, and playback control handoff should flow through one shared transport-shell model plus shell renderer so `GanttTimelineTransportPanel` does not compose the chrome shell inline.
- **Gantt transport playback boundary:** Playback request handlers plus the transport playback loop should flow through one shared transport-playback model that composes the playback-controls hook with `useTimelineTransportPlayback()`, so `GanttTimelineTransportPanel` does not wire playback callbacks or the playback side effect inline.
- **Gantt transport interaction/view boundary:** Scrub/drag orchestration, zoom and fit state, playhead centering, row-key resolution, and selection-sync side effects should flow through one shared transport-interaction model that composes the lower interaction/view hooks, so `GanttTimelineTransportPanel` does not coordinate those runtime effects locally.
- **Gantt transport command boundary:** Document mutations, edited-media export state, drag-commit actions, and chrome-command handoff should flow through one shared transport-command model that composes the lower document-actions hook, so `GanttTimelineTransportPanel` does not own export/edit command assembly locally.
- **Gantt transport surface boundary:** Session, command, interaction, chrome, ruler, playback, and shell composition should flow through one shared transport-surface model plus one thin transport-surface renderer so `GanttTimelineTransportPanel` remains a thin layout-only entrypoint that only hands a top-level surface model to the surface renderer.
- **Gantt transport route boundary:** Route-level `code` and `compact` inputs should flow through one shared transport-route model so `GanttTimelineTransportPanel` does not even assemble the surface model directly and remains a nearly trivial route wrapper.
- **Preview route-entry boundary:** Media and monitor entrypoints should consume one shared preview route-entry hook that composes the common preview-bootstrap tuple plus intent-specific timeline runtime defaults, so entry hooks do not wire `useTimelinePreviewBootstrap()` directly.
- **Preview media-context boundary:** The media-only preview surface/activity/family/disclosure/frame composition chain should flow through one shared media-preview context builder so `MediaCanvas` does not depend on the full generic preview-context path.
- **Preview scope-projection boundary:** Timeline/monitor scope derivation should flow through one shared preview scope-projection builder so Gantt and future monitor/timeline surfaces do not depend on the remaining generic preview-context wrapper.
- **Preview monitor-context boundary:** Timeline/monitor consumers should use one shared preview monitor-context builder that composes media-preview state plus scope projection, and the legacy `useTimelinePreviewContext` wrapper should not exist in the runtime boundary.
- Timeline video-sequence editing remains source-backed Mermaid Gantt editing: cut, splice, masking, color grading, speed, transitions, adjustment layers, keyframes, effects, gaps, repeated segments, images, scenes, and audio lanes all map through the compiled sequence plan rather than panel-local timeline forks.
- Preview, edit, and edited-media export all share one source/metadata boundary: export may derive browser-recorded video/audio blobs, but source timing, playable URL resolution, metadata probing, progress/cancel semantics, structured segment progress data, plan validation, and runtime cleanup remain upstream/shared owners rather than export-local duplicates.

### Graph Data Table / Multi-dimensional Table (Host Fast Grid) (Knowgrph)

- The host Graph Data Table (workspace tool surface) is the Multi-dimensional Table workspace: a canvas fast-grid backed by an RxDB `GraphRecordDb` (`kg:graph-table`) with logical `nodes` and `edges` tables, inferred property columns, per-table views, and metadata.
- Graph import commits JSON-based `GraphData` into the store; the Multi-dimensional Table mirrors this SSOT via a materialized RxDB view where each row is a normalized JSON `data` object and each column is a stable property key.
- Workspace Editor `multiDimTable` must persist unchanged through workspace preferences, Graph Data Table header/view state, and local storage; reuse the current table renderer if needed, but do not silently coerce the shared mode contract back to plain `table`.
- Editor/Table workspace modes must reuse the same in-app Canvas pane (single `CanvasViewport`); do not mount a second Canvas Preview surface for these modes.
- Scroll extents must be driven by an explicit spacer element sized to the computed layout total width/height; do not rely on padding hacks.
- Forbid ResizeObserver→React state loops and scroll/resize feedback loops.
- Header must remain aligned to the body while horizontally scrolling: use a DOM header overlay that is translated by `-scrollLeft` from the same single scroll owner; the canvas should be clipped so it never draws into the header band.
- Visible data columns can be reordered by dragging the header; persist order per table via local storage `kg:ui:graphTable:columnOrderByTableId` (ordered `columnId` list). RxDB column `order` remains the base/default ordering.
- Header click selects a column (highlight the entire column in the body grid).
- Performance: avoid `getComputedStyle()` in the scroll loop; cache theme metrics and update only on theme mutation or resize.
- Date columns: infer ISO-like date strings as `kind: date` so the Date editor behavior is available end-to-end from imports; treat `text → date` upgrades as safe-only.
- Sync stability: gate RxDB sync by a `(revision, collapsedGroupIdsKey, viewKey)` triple and respect Canvas interaction/sync modes. In static interaction mode, use structure-only revisions (graphContentRevision) so position-only drags do not cause table recomputation; in interactive interaction mode, use full graph revisions (graphDataRevision) only when Workspace Sync Mode is realtime. Manual sync disables auto sync and exposes a single **Sync now** action in the Graph Table header; realtime uses the same pipeline triggered by revision changes and deduped via last-write/last-sync gates so collapsed-view toggles update the table without introducing render/rewrite loops.

### Graph Data Table (Curation Table) (singabldr)

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

### Markdown In-Place Editor Palette (Viewer Read mode)

- Viewer Read mode may enable click-and-edit contentEditable blocks for headings/paragraphs/lists/quotes/callouts/code/HTML via a shared MarkdownBlockContainer wrapper. The underlying SSOT remains Markdown text; there is no WYSIWYG-only model.
- Selecting text inside an editable block surfaces a selection-aware bubble toolbar (palette) positioned near the selection. The palette reuses shared floating-menu SSOT classes and theme tokens and exposes inline formatting (bold/italic/underline/strike/inline code/link), heading/list/quote transforms, color/highlight palette, checklist/divider insertion, and structural actions (duplicate/delete/comment).
- Slash commands are supported as a lightweight command palette: typing `/` near the caret at the start of a line (or after whitespace) opens a small menu aligned with the caret that triggers the same heading/list/quote/code/checklist transforms as the palette. Detection is line-local and must not rescan the entire document on every keystroke; the menu hides when the trailing slash context disappears or focus leaves.
- Cmd/Ctrl+K opens an inline link edit popover near the current selection. The popover uses the same SSOT floating-menu styles, exposes a single URL field, and applies `[label](href)` Markdown wraps over the current selection on Apply; Cancel or empty href leaves the document unchanged. No separate link state store or background URL validation loops are allowed.
- In-place edit surfaces must preserve read-surface parity for layout and interaction styling (indent/padding/margin/border/wrapper/caret/whitespace/tab-size). Entering edit is view-preserving and must not mutate surrounding geometry or typography.
- All actionable floating toolbar/slash/variable buttons must use shared hand-cursor tokens and shared pointer-down guards. Variable Apply must route through shared `applyVariableToken`; direct contentEditable query/mutation fallbacks are forbidden.
- All palette, slash, and link actions are view-only, bounded Markdown text transforms driven by the shared formatting pipeline; they must not mutate GraphData, layout, or zoom and must respect the FORBID-copy policy enforced at the viewer root and code-block copy buttons. Implementations must gate selection-change listeners with `requestAnimationFrame` and skip no-op commits to avoid churn, render jitter, or infinite selection listeners.
- WYSIWYG-ish in-place editing must preserve read-mode typography and spacing for inline code and lists, including list-to-list gaps and mixed paragraph→code→list sequences; entering contentEditable must not change layout, margins, or padding.
- View↔Edit WYSIWYG-ish parity helpers should be centralized in a shared layer (e.g., quote/callout contiguous line-range mapping, no-op replace-line guards, bounded typography/spacing capture) rather than duplicated per surface; schema clients must avoid scattering regex/range/guard logic that can drift, conflict, or create commit/blur loops.
- Workspace Data View header controls in Markdown Read Viewer (Table/Multi-dimensional Table/Kanban) must use semantic landmarks (`header/nav/aside`) and shared high-z floating menu classes so controls are never blocked by sticky table layers or hidden under neighboring surfaces.
- Source-attached Markdown with leading YAML frontmatter should render through shared structured-source data-view presentation defaults: `Markdown YAML Frontmatter` emphasizes `Key`, `Type`, generated type-specific value columns such as `Scalar Value`, `List Value`, and `Mermaid Gantt Value`, neutral semantic columns, `Content`, and `Line`; `Markdown Body` emphasizes `Content`, `Line`, and `Indent`. Canonical `Value` remains available in the complete field inventory and writeback may accept either it or the matching type-specific value column. The shared settings owner should persist a value-column presentation mode that defaults to type-specific columns and can switch the visible preset to the type-generic `Value` column without changing source projection, source-line mapping, or edit callbacks. Data-view column widths should be user drag-resizable through the shared resize separator runtime and applied with table `<colgroup>` preview widths for both row-record and column-record pivots. Typed frontmatter block-scalar payload rows should inherit their sibling `type` and keep payload text in the matching type-specific value column. Markdown pipe-table blocks that span adjacent source-line rows should render as nested row/column tables with compact captions, source line ranges, continuation markers, and Level-derived indentation for YAML Frontmatter rows, falling back to `Indent` when no `Level` column is present. `Pivot: rows as records` should expose the same nested-row depth through a dedicated leading hierarchy column that owns indentation, default-expanded parent-row collapse toggles, and expand-all/collapse-all. `Pivot: columns as records` should reuse that nested-row state in a transposed hierarchy field row so descendant record columns collapse without changing aligned semantic fields, source rows, line mapping, or edit callbacks. The complete field inventory remains configurable through the shared Properties/settings owner, not renderer-local column shims.

### Webpage Per-Document Fidelity Controls

- Per-doc frontmatter may override conversion/rendering fidelity when needed, but the default is **Auto**: Script/Imgs/Fid are inferred from shared rich-media + iframe heuristics and do not require frontmatter. Optional keys: `kgWebpageScriptPolicy: allow|strip`, `kgWebpageIncludeImages: true|false`, `kgWebpageFidelityLevel: 1|2|3|4`.
- UI placement SSOT: these controls live in the Markdown toolbar `nav` (Webpage group) with an explicit `Sync` (DOM→Markdown) action, and default to Auto; frontmatter is only written when the user explicitly chooses a non-auto override.

## Agentic GraphRAG/Knowledge Graph Pipeline Guidelines

## COMPLY
`/GitHub/{huijoohwee.github.io/guidelines/{codebase-neutrality-guidelines.md,codebase-maintainability-guidelines.md},agentic-canvas-os/docs/{AGENTS.md,TODO.md}}`

### Title and title-like inline editing
- Titles and title-like labels (Markdown headings, workspace property names) render truncated with ellipsis at rest, reuse the same typography in in-place html editors or rename inputs, reveal full text on focus via horizontal scroll, and forbid alternate WYSIWYG title stacks or layout/spacing drift on edit-open.

### Runtime sync, chunking, and deploy (Knowgrph)
- Runtime sync and GraphRecordDb writes must be gated by revision, collapsedGroupIdsKey, and viewKey, driven by the shared coalesced scheduler, and must avoid ad-hoc timers, uncontrolled polling, or background churn under rapid workspace switching.
- Build chunking enforces a soft <500 kB minified chunk target using package-level vendor manualChunks for react, d3, ui, three, maplibre, monaco, mermaid, and elk, and forbids deep source-level splits that can introduce init-order cycles or forwardRef/monaco runtime failures.
- Deployments run `pages:build-sync` before `pages:deploy-cloudflare`: sync `canvas/dist` into `huijoohwee/content/knowgrph`, refresh the managed `/knowgrph` public-route files, exclude cesium, vendor/mermaid, demo, examples, and large test fixtures, and rely on root `_redirects` + `_headers` for Cloudflare Pages route resolution and caching semantics.
- Responsive parity is part of that deploy gate: when mobile grammar reachability, heavy-runtime intent policy, or touch-first behavior changes, run `npm --prefix canvas run test:smoke:mobile-keyboard:browser`, run `pages:check-sync`, and review `knowgrph/docs/documents/knowgrph-feature-map.md` before `pages:deploy-cloudflare`.
- Publish-side mirror notes must not redefine those gates: `huijoohwee.github.io/docs/documents/knowgrph-mcp-*.md` may index or hand off to the canonical source docs, but responsive, collaboration, storyboard, and storage-route proof logic remains owned by `knowgrph/docs/documents/knowgrph-cross-repo-publish-topology.md`.
- Storyboard/Strybldr UI surfaces must normalize the renderer id to `kgCanvas2dRenderer: "storyboard"` (not `"strybldr"`) and keep Strybldr `mediaKind` preserved through import->serialize so release checks remain stable across Dev, generated mirrors, and live Pages.
- Before `pages:deploy-cloudflare`, any change to storyboard drag, rich-media drop, or overlay/layout placement should run `npm run storyboard:readiness:check`, which bundles `npm --prefix canvas run test:smoke:storyboard-rich-media-drop:source`, `npm --prefix canvas run test:smoke:storyboard-rich-media-drop:browser`, and `pages:check-sync` so authored drop placement, smoke seam drift, and publish-sync drift stay gated together. When validating live-route SSOT cleanup after transient Rich Media authoring, also run `npm --prefix canvas run test:live:storyboard-media-panel-retention:browser`, keep live-route handle selectors exact-or-suffix for workspace-prefixed node ids, and treat live `200` route proof plus post-deploy D1 docs seed as the final release evidence.
- Storyboard, Editor Workspace Table/Multi-dimensional Table/Kanban, and FloatingPanel `View` must reuse shared toolbar/data-view utility owners for action binding, hover `New Record`, and settings payload construction; do not leave per-surface inline toolbar branches or duplicate Kanban/header utility stacks in renderer loops.
- Mermaid and ELK layouts must be loaded via package dynamic imports rather than custom vendor bundles, keeping bundling predictable and preventing legacy `vendor/mermaid` payloads from re-entering Pages artifacts.

### Chunk-size & mobile responsiveness (Knowgrph)
- Heavy tool surfaces (Toolbar/menus/MainPanel/MarkdownWorkspace/export bridge/Graph Data Table/Mermaid preview) must remain behavior-identical while loading as lazy bundles; Canvas entry and Toolbar stay lean, and background renderer warm-mount/prefetch are gated by device memory/CPU/save-data so low-end/mobile devices avoid hidden heavy work.
- Shared utility extraction should shrink hot renderer loops rather than add wrapper churn: prefer one canonical helper for Storyboard card toolbar props/bindings/presentation and one canonical Workspace/Kanban utility owner for header/settings/new-record behavior, then reuse those helpers across surfaces.

## ALIGN (Semantic Definition)
- **GRAPHS Elements:** nodes, Storyboard Widgets, edges, graph layers (subgraphs, groups, clusters, communities), labels, text
- **GRAPHS Configs:** grouping, positioning, collisions, timing, knobs

## Baseline & Code Hygiene
- Reuse existing elements/configs.
- Enhance natively; forbid duplication.
- Prevent interference across layers/modes.
- Treat Document Structure Mode as the baseline; semantic-mode switches must restore per-mode view/schema snapshots and clear incompatible selection/collapse state (no cross-mode bleed).
- Remove legacy/conflicting/stale code.
- Repo hygiene: never commit `.knowgrph-workspace/**`, `node_modules/**`, or `backups/**` (store workspace artifacts under `sandbox/.knowgrph-workspace/` via symlink); if large artifacts were committed previously, purge history via `git-filter-repo` and force-push rewritten `main`.

## Pipeline Discipline
- Scope: `/GitHub/{knowgrph,gympgrph,singabldr}` → import → render.
- Support all `/GitHub/sandbox/` test data; no hardcoding.
- FORBID absolute local sandbox paths (e.g. `/Users/.../GitHub/sandbox/...`) in code/tests; use sandbox-root helpers + basenames or repo-local fixtures.
- Use semantic HTML for surface boundaries; use `div` for layout-only wrappers.
- Centralize configs (labels, boxes, collisions, timing, knobs).
- Resolve cross‑repo conflicts.
- Test only bounded diffs; forbid indefinite runs.
 - Treat `.md`, `.markdown`, `.mmd`, `.mdx` as canonical Markdown ingest extensions in the graph pipeline; keep document path/provenance neutral.
- On toolbar Markdown import, sync Markdown Editor SSOT (`markdownDocumentName/text/sourceUrl`) and Graph SSOT together; forbid split-brain Editor/Viewer state.
- Keep the Knowgrph docs map (`schema/AgenticRAG/knowgrph-documents-map.graph.jsonld`) in sync with `knowgrph/docs/documents` via `schema/AgenticRAG/sync_map.py --mode check` so schema comments and Markdown docs remain aligned as the import→render pipeline evolves.

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

### Integrations SSOT Sync Directives (Knowgrph)

- Text/Image/Video widget pipelines must consume shared TS SSOT rows in runtime panels and generate static references from the same source scripts only.
- MainPanel Integrations, Workflow Manager, and FloatingPanel Props Panel widget fields must stay schema-synchronized through shared field builders.
- For directive updates, use one-row-one-directive wording (max 50 words per directive cell) in the active `agentic-canvas-os/todo/YYYY-MM.md` shard and `knowgrph/docs/documents/knowgrph-integrations-ssot-sync-directives.md`.
- Oversized markdown docs must be sharded into companion files with continuation links; canonical originals stay under 600 lines.

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

## Continuation

See `README.pipeline-and-renderer-guidelines.companion.md` for resources, contributing, license, support, and status.
