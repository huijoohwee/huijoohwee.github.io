---
title: "Native design consistency — reference implementation"
doc_type: "PRD-TAD-ADR-MVP-GTM Companion"
version: "0.2.0"
revision: "0.2.0"
date: "2026-09-24"
lang: "en-US"
frontmatter_contract: "required"
owner: "Design maintainers"
continuity_id: "NATIVE-DESIGN-CONSISTENCY"
local_rung: "undocumented"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
worktree_id: "device-0232231d4a19--design-theme-governance"
agent_id: "codex-design-governance"
load_policy: "on-demand"
---

# Native design consistency — reference implementation

This is the source-grounding and implementation proposal companion for
[NATIVE-DESIGN-CONSISTENCY@0.2.0](prd-tad-adr-mvp-gtm-design-consistency.md). Paths below are relative
to their named repository. Source inspection proves the described code exists, not live deployment.
All product and repository names in this companion are reference implementation bindings.

## Reviewed revisions — reference implementation

| Repository | Exact source revision | Bounded role |
|---|---|---|
| `huijoohwee.github.io` | `fc14505ac603c6e72bd682326d0b4c4d75e1745c` | Design and PRD/TAD/ADR guidelines; document checks and release workflow |
| `agentic-os` | `e96dd20f7ae5e12cfd2bda037c6cb1518237d378` | Runtime instructions and workflow ownership |
| `agentic-graph` | `414ca9afcea332c7e5f357a850caa9463bb837c5` | Settings, shared tokens, editor and workspace consumers |

Recheck these commits and the cited symbols before implementation; this snapshot does not update
consumer package pins. The requested historical `templates/SYSTEM-PROMPT-RUNTIME.md` locator is absent
locally; `agentic-os/AGENTS.md` routes to the existing `guides/SYSTEM-PROMPT-RUNTIME.md`, which was read.
No replacement prompt was created. The guideline authoring contract is version 3.3.0 at the first pin.

## Source map — reference implementation

| Native owner / inspected symbol | Observed behavior | Smallest proposed change / criterion |
|---|---|---|
| `grph-shared/src/ui/kgTokens.ts` / `AG_TOKEN_DEFS`, `buildKgTokensCssText` | One ordered light/dark token inventory with semantic metadata | Add native dark-variant resolution while keeping semantic keys / V2,V6 |
| `grph-shared/src/ui/kgTokenContract.ts` / `KgTheme`, `KgTokenDef` and the native size limits | Two-theme contract, native color parsing, reference and size limits | Extend the existing contract/validator for complete variant palettes; no second schema / V4,V6 |
| `grph-shared/src/ui/themeTokens.ts` / `UI_THEME_TOKENS` | Shared semantic class references | Retain native consumer API; avoid product-wide literal replacements / V2,V3 |
| `canvas/src/lib/ui/tokens-ssot.ts` and `theme-tokens.ts` | Thin re-exports of shared owners; CSS-state key helper | Retain re-exports, include variant in state invalidation where needed / V2,V4 |
| `canvas/src/lib/ui/theme.ts` / `ThemeMode`, `THEME_MODE_OPTIONS`, `applyThemeMode` | `system/light/dark`; default `system`; root `data-theme` and `dark` class | Keep mode API/cycle; introduce subordinate validated variant in this owner / V1,V4 |
| `canvas/src/hooks/store/uiSettingsSliceCoreState.ts` / `setThemeMode` | Persists and applies mode then stores resolved mode | Add variant action in the existing slice; preserve unrelated preferences / V1,V3,V4 |
| `canvas/src/features/settings/registry-ui.ui.ts` | `themeMode` plus panel/font and icon settings already registered | Add variant entry beside mode with existing read/write/default/options/docKey pattern / V1,V3 |
| `canvas/src/features/panels/views/SettingsView.tsx`, `SettingsEntryRow.tsx`, `settingsEntryRow.input.tsx` | Existing view and shared input rendering; row uses icon stroke and text size | Reuse this path, search and labels; no separate theme modal / V1,V3 |
| `canvas/src/features/settings/ui.tsx` | Existing icon/color/stroke preview support | Reuse previews and existing meaning, not parallel widgets / V3 |
| `canvas/src/lib/ui/icons.ts` | Native shared icon entry point | Reuse existing icons and accessible action names / V3 |
| `grph-shared/src/ui/panelTypography.ts` / `PANEL_TYPOGRAPHY_DEFAULTS`, density presets | Native font, size, micro-label, monospace and input classes | Reuse shared defaults and coercion; extend only proven missing dimensions / V3 |
| `canvas/src/lib/ui/panelTypography.ts` / `usePanelTypography` | Reads existing store preferences and derives panel classes | Every affected chrome consumer uses the same preference path / V3 |
| `canvas/src/cli/gen-kg-tokens-css.ts` | Generates CSS or JSON/TypeScript; `--check` compares exact bytes; atomic file rename | Generate variants from shared owner; extend deterministic checks / V6 |
| `canvas/src/styles/kgTokens.generated.css` | Generated light and dark CSS selectors | Regenerate only; never author a corrective override here / V2,V6 |
| `canvas/src/hooks/useThemeDetector.ts` | Observes root `class` and `data-theme`; returns light/dark | Observe variant changes as well, or subscribe to the native resolved appearance owner / V2,V4 |
| `canvas/src/lib/monaco/MonacoTextEditor.impl.tsx` | Calls `setTheme(... ? 'vs-dark' : 'vs')` at mount and update paths | Replace these choices with one native token-to-Monaco adapter; bind lazy mounts / V2,V4 |
| `canvas/src/__tests__/theme.test.ts` | Tests persistence, system changes and the single toolbar cycle | Extend for variant, migration, reset and storage failure; retain existing mode tests / V1,V4 |
| `canvas/src/__tests__/kgTokenSsot.test.ts` | Existing source/CSS consistency, contract and export tests | Extend native cases for both variants / V6 |
| `canvas/src/__tests__/markdownWorkspaceTheme.test.ts` | Selected workspace files avoid several hardcoded light classes | Retain checks; add computed-style evidence, not a broader claim from this scan / V2,V5 |

The existing Design editor planning owner is
`docs/documents/agentic-graph-design-editor-baseline-prd-tad-adr-mvp-gtm.md`. This cross-repository
policy plan complements its token/editor baseline and does not claim ownership of its implementation.
The file-size gate already requires oversized touched files not to grow; the Monaco implementation
is over 600 lines. Extract its bounded theme adapter and remove replaced call-site logic; do not add
another block to that oversized owner. Keep the new adapter below 600 lines.

## Observed mismatch — reference implementation

User comments label the editor “black” and split pane “dark blue”. Treat those as requested appearance
directions, not sampled color values. The inspected token source defines dark application background
`#020617`, surface `#0b1220`, panel `#020b2a`, primary text `#f3f4f6`, accent `#60a5fa`; code background
is `rgba(2, 6, 23, 0.6)`. Monaco instead requests its built-in `vs-dark` theme. This independently
selected editor theme explains a plausible source of the mismatch; browser computed colors have not
been measured. These literals are source observations, not a new palette source.

The current code supports no `Black`/`Dark Blue` variant setting. “Black (Default)” is a requested
future dark-palette default; the current top-level default is System and remains so in this proposal.
“Themes” is the intended Settings grouping label, not evidence that that group already exists.

## Proposed settings behavior — reference implementation

Reuse MainPanel → Settings → Themes. Keep the existing mode control and toolbar cycle.
Add one subordinate `darkThemeVariant` value (`black` or `dark-blue`, proposed key) in the same
registry/store/persistence owner. Display labels `Black (Default)` and `Dark Blue` through the same
native option-label mechanism; if one is missing, extend that shared mechanism once. Show the
variant under Dark and System; while Light is active, retain it and explain it applies to dark mode.
Do not replace the settings table, section controls, search, text or icon rendering.

| Stored/active state | Proposed result |
|---|---|
| Fresh storage | Mode remains System; dark variant defaults Black; current system light remains Light |
| Explicit Dark plus valid Black or Dark Blue | Selected dark variant applies immediately and survives reload |
| Existing saved Dark, no variant key | Preserve prior dark-blue appearance by one idempotent migration to Dark Blue |
| Existing System or Light, no variant key | Keep mode; initialize Black for future resolved Dark; document this intentional new default |
| Malformed variant value | Normalize to Black; keep valid mode and all text/icon preferences |
| Malformed mode value | Existing System fallback; retain valid variant independently |
| Storage read/write denied | Use safe initial defaults or current session choice; report inability to persist via existing error UX |
| System switches to dark/light | Apply retained dark variant only for resolved Dark; preserve top-level mode |
| Theme-only reset | Mode System plus Black; preserve unrelated text/icon/density settings |
| Application-wide reset | Existing native reset scope remains authoritative; no new reset semantics |
| New editor mounts during rapid toggles | Mount reads latest appearance; a stale async result cannot overwrite the active variant |

The legacy-Dark migration is a proposed compatibility choice, not user evidence of a stored value.
It must be verified against actual persistence ownership before implementation. Do not add a second
local-storage key registry; extend the existing configuration constants and migration mechanism.

## Proposed palette and adapters — reference implementation

Preserve the current native dark colors as the initial Dark Blue variant. Add Black as a neutral
dark palette in the same source. Candidate values below are a design proposal for review and contrast
measurement; implementation owns the final values in `AG_TOKEN_DEFS`, not this table.

| Semantic role | Black candidate | Dark Blue starting point |
|---|---|---|
| Application/canvas backdrop | `#000000` | Existing `--kg-app-bg` / `--kg-canvas-bg` |
| Panel/editor backdrop | `#0a0a0a` | Existing `--kg-panel-bg`; map editor backdrop to this same resolved role |
| Raised surface | `#171717` | Existing `--kg-surface-bg` |
| Primary / secondary text | Existing light foregrounds, subject to measured contrast | Existing foreground roles, subject to measured contrast |
| Accent / focus / selection | Existing semantic accents, adjusted only when contrast fails | Existing semantic roles, adjusted only when contrast fails |

“Black” denotes a neutral palette, not identical black fills everywhere. Elevation, focus and syntax
remain legible. Preserve existing semantic token names; validate every role in both variants rather
than silently inheriting blue backgrounds into Black. Theme-specific values stay in the native owner.
Map Monaco background, foreground, gutter, selection, cursor, line highlight, widgets and syntax
through a single lazy adapter. Audit DOM, SVG and 2D/3D canvas background/grid/label adapters; preserve
authored graph/scene colors. Editor theme application is global within Monaco, so multiple instances
must share one current resolved appearance and cannot race to impose per-instance defaults.

## Typography and ideogram reuse — reference implementation

Typography includes native font, text size, micro-labels and code/monospace settings. The shared
`panelTypography.ts` owner defines defaults and Comfortable/Compact presets; its browser hook reads
existing Settings state. Weight, line height and letter spacing are not established as separate
Settings controls by this inspection: preserve existing style semantics and mark missing requirements
before extending the shared owner. Do not introduce a second typography panel or font loader.

Code typography is the user-selected live editor treatment. Read-only browser inspection on
2026-09-24 measured `.view-lines`: `Menlo, Monaco, "Courier New", monospace`, `12px`, weight `400`,
line height `18px`, foreground `rgb(212, 212, 212)`. This host observation establishes the requested
code-related reference, not a platform-wide font guarantee. Use the existing code/monospace preference
for source editors, schemas, code blocks and invocation samples; preserve alignment and copy fidelity.
Keep local fallback fonts, user zoom and accessible size adjustments. Do not apply code typography to
all interface prose or hardcode that foreground across themes. The inspected Monaco owner disables
font ligatures; preserve that behavior unless an existing setting explicitly changes it. Font-size
controls for Monaco were not established by this audit; do not claim a control already exists.

“Ideogram” is interpreted as a semantic symbol/glyph. No separately named ideogram registry or setting
was found in the inspected UI owners. Reuse the existing icon/glyph path: `uiIconFormat` supports
`1`, `default`, `minimal`; `uiIconScale` and shared responsive glyph classes own scale. Preserve meaning
and accessible names across formats, language/font fallbacks and palette changes. A new product or
image-generation provider is outside scope. V3 includes missing-glyph fallback and localized-label checks.

Preserve existing settings keys and consumers, including `uiPanelTextFontClass`,
`uiPanelKeyValueTextSizeClass`, `uiPanelMicroLabelTextSizeClass`, `uiPanelMonospaceTextClass`,
`uiPanelRowDensityDefaultClass`, `uiPanelKeyValueInputClass`, `uiIconFormat`, `uiIconScale`, `uiIconStrokeWidth`,
`uiIconColorClass`, `uiIconButtonPaddingClass`, `uiIconBadgeChipClass`,
`uiIconBadgeChipTextSizeClass` and `uiIconAnimationEnabled`. No theme selection may reset them.
The next owner must inventory their actual consumers before claiming full propagation. A hardcoded
`uiPanelTextFontClass="font-sans"` in `RichMediaPanelWorkspaceViewerSurface.tsx` is one source-audit
candidate; decide whether it is intentional document typography or a chrome bypass before changing it.

| Required consumer | Appearance assertions for V2/V3 |
|---|---|
| MainPanel Settings and docked/floating host | Same labels/icons, active state, search, density and preference previews |
| Workspace shell, explorer and split panes | Same resolved palette; text and icon settings; focus and selected rows |
| Code/JSON/Python editors | Current editor adapter, cursor, selection, gutters and syntax; code-font preference |
| Blocks and learning controls | Tokenized chrome and action icons; retain instructional/category colors |
| Markdown preview, TOC and backlinks | Readable application chrome and links; preserve intentional authored styles |
| 2D/3D canvas and toolbar | Same appearance revision for backdrop, grid, labels and controls; retain scene colors |
| Menus, tooltips, dialogs and error/empty states | No stale light surface; text, focus, icon meaning and contrast |

## Native illustration style — reference implementation

The user-selected **Tropical Playground** thumbnail is native product artwork, owned by
`canvas/src/features/command-menu/XrMediaCatalogThumbs.tsx` / `XrCatalogArtwork`; the tropical branch
renders the illustration. `XrCatalogThumb` owns its small preview wrapper. The environment card is
composed by `XrMediaLibraryPanel.tsx`; `canvas/src/features/three/xrSceneLibrary.ts` owns the stable
`tropical-playground` ID, label and description. Reuse these owners, not a screenshot or a copied SVG.

Style: flat vector silhouettes with soft organic curves, an elevated oval island, simplified palm
trees, layered lagoon/sand/grass shapes and sparse brown structural strokes. Retain a clear silhouette
at thumbnail size; avoid photorealistic detail or text baked into artwork. The source uses a 96×72
viewBox (4:3); scale proportionally, preserve the full composition and rounded container, and do not
stretch, crop landmarks, recolor by theme, or repurpose it as the product logo.

Source-observed illustration palette: sky `#a5e6ed`, water `#36b6bd`, lagoon `#b5ebe0`, sand `#f4d797`,
grass `#9ac66b`, palms `#338e60`, trunks `#916244`, timber `#a5734e`. These are artwork colors, not UI
theme roles. Keep their single definition in the artwork owner; Black/Dark Blue changes the card,
border, focus, text and controls around it. The global token-only chrome rule does not erase authored
illustration colors. Asset licensing/provenance follows the repository owner; no new license is inferred.

The SVG exposes `role="img"`, a label ending in `native illustration`, and
`data-kg-xr-catalog-artwork`. Preserve semantic identification; when surrounding text already names
the artwork, avoid duplicate screen-reader announcements. Interactive selection belongs to the card
control, with its native label and focus ring, not an unlabeled SVG click handler. Validate Black,
Dark Blue and Light at small/large thumbnail sizes, 200% text zoom and offline rendering. Do not claim
illustration detail itself is an interactive control or recolor the scene to meet chrome contrast.

Observed fallback icon uses fixed `size-7` and `strokeWidth={1.6}`. Track it as a V3 consumer gap:
reuse the existing icon/ideogram scale and stroke owner for interface fallback symbols when implementing
consistency. Preserve the illustration's internal composition independently from user icon stroke.

## Check map — reference implementation

From `agentic-graph/canvas`, reuse `npm run test:ci:unit -- <registered-case>`; verify case registration
and current runner semantics before executing. Existing cases include `ui.themeModePersistence`,
`ui.themeSystemModeApplyAndSubscribe`, `ui.themeToolbar.singleButtonSystemLightDark`,
`ui.tokens.ssot.indexCssDefinesAll`, `design.editor.tokens.contract`, `design.editor.tokens.exports`,
`markdown.workspace.noHardcodedLightTheme` and `markdown.preview.forcesPrimaryTextColor`.
Generator check: `node --import tsx src/cli/gen-kg-tokens-css.ts --check` from `canvas`.

These existing checks do not prove variants. Extend them for V1/V4/V6; add focused runtime assertions
for V2/V3/V5 in the existing browser harness. Use desktop 1134×962 (the reported viewport), narrow
390×844, 200% text zoom, keyboard-only input and offline reload after cache priming. Assert computed
colors and preferences for every consumer row; repeat both variants, lazy mounts and rapid toggles.
Capture environment, source revision, test result and screenshots as evidence. A contrast failure in
an existing palette blocks that claim; retaining old values is not a waiver.

## Release and rollback — reference implementation

Documentation uses the guideline repository's START/RELEASE workflow and protected check
`adlc-policy-contract`; production Pages deployment is a separate exact-candidate operation.
The current Pages payload includes `index.html` and `guidelines/`, not root `DESIGN.md` or
`docs/documents/`. Source links work in the repository; do not claim the complete plan is deployed.

Runtime successor uses `agentic-graph/docs/collaboration-runtime-contract.md`, its affected checks,
Integration Gate and production release controller. The browser at `127.0.0.1:5175` is observation
context, not a production identity. This increment neither edits that runtime nor proves deployment.
On runtime regression, retain preferences and use the owner's authorized exact predecessor; a prior
build ignores the proposed variant and retains the old mode. Prove that rollback compatibility before
release; do not remove stored user values or force a reset as a shortcut.

## Source-bound concern projection — reference implementation

This projection names existing owners, not accepted variant behavior. All paths are in `agentic-graph`
at the inspected revision below. Named checks are acceptance references; the structural checker never
executes them. The Monaco source exceeds the bounded source-file limit, so code typography binds to
the smaller native typography owner and the separately observed editor evidence above.

```native-design-adoption
{"sourceRevision":"414ca9afcea332c7e5f357a850caa9463bb837c5","concerns":[
{"id":"settings","owner":"native-settings","source":"canvas/src/features/settings/registry-ui.ui.ts","symbol":"themeMode","check":"ui.themeModePersistence"},
{"id":"tokens","owner":"shared-token-source","source":"grph-shared/src/ui/kgTokens.ts","symbol":"AG_TOKEN_DEFS","check":"ui.tokens.ssot.indexCssDefinesAll"},
{"id":"typography","owner":"shared-panel-typography","source":"grph-shared/src/ui/panelTypography.ts","symbol":"PANEL_TYPOGRAPHY_DEFAULTS","check":"V3"},
{"id":"code-typography","owner":"shared-panel-typography","source":"grph-shared/src/ui/panelTypography.ts","symbol":"monospaceTextClass","check":"V3"},
{"id":"ideograms","owner":"native-icon-settings","source":"canvas/src/features/settings/registry-ui.ui.ts","symbol":"uiIconFormat","check":"V3"},
{"id":"illustration","owner":"native-catalog-artwork","source":"canvas/src/features/command-menu/XrMediaCatalogThumbs.tsx","symbol":"XrCatalogArtwork","check":"V3"}
]}
```
