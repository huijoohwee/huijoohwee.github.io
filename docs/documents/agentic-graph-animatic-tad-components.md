---
title: "Agentic Graph Animatic Components Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-08-20"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
parent: "Agentic Graph Animatic PRD/TAD"
parent_version: "1.0.0"
---

# Agentic Graph Animatic Components Module

## Scope & Ownership

Owns the architecture overview, the journey-to-system mapping, the component specifications, and the integration contracts.

This module is loaded on demand from [Agentic Graph Animatic PRD/TAD](./agentic-graph-animatic-prd-tad.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Architecture Overview

**From frontmatter to rendered, interactable timeline**: `config.render.ts` declares the canonical
`animatic` renderer id, and `CanvasViewport.tsx` mounts `AnimaticCanvas.tsx` when the active 2D
surface resolves to `animatic`. `AnimaticCanvas.tsx` renders the Player Shell, Scale Rail, Beat
Strip, and Lane Rows. `animaticTimeline.ts` parses frontmatter, builds the timeline model, and
rewrites markdown for timing, metadata, lane controls, and lane order updates. `animaticLaneControls.ts`
projects lane presentation state, and `animaticKeyboard.ts` owns hotkey mapping/suppression rules.
Mounted validation runs through `validate_animatic_timeline_interactions.py`, which drives the live
surface via `window.agentic-graphWorkspaceCommand.applyMarkdownDocument(...)` exposed by
`workspaceRuntimeCommand.ts`.

**Mapping note**: the components below are logical responsibilities. Several are co-owned by the
same runtime file family rather than by one file per component.

---

---

## Journey → System Mapping

| Journey Stage | Workflow                      | Data Flow                            | Runtime Owner |
|---------------|-------------------------------|--------------------------------------|---------------|
| Trigger       | Renderer Activation           | YAML → renderer id → surface mount   | `config.render.ts`, `CanvasViewport.tsx` |
| Discover      | Lane Population               | Graph Nodes + `timeline.*` → model   | `animaticTimeline.ts` |
| Engage        | Beat CRUD & Metadata Edit     | Interaction → delta compute → markdown rewrite | `AnimaticCanvas.tsx`, `animaticTimeline.ts` |
| Complete      | Playback + Auto Scroll        | Player events → edge-scroll loop     | `AnimaticCanvas.tsx` |
| Return        | Reload & State Restoration    | markdown reapply → state re-parse    | `animaticTimeline.ts`, `AnimaticCanvas.tsx` |

---

---

## Component Specifications

---

### C1 — FrontmatterParser

**Responsibility**: Parses YAML frontmatter from the active AGENTIC_OS document into typed Beat Model,
Scale Config, and Node Graph structures; emits no side effects.

**Interfaces**:
- Input: raw YAML string (`flow:`, `timeline:` keys)
- Output: `BeatModel { beats: Record<string, Beat>, scale: ScaleConfig }`, `NodeGraph { nodes: Node[] }`

**Dependencies**: AGENTIC_OS document store

**Configuration**: none (reads exclusively from frontmatter)

**`/goal` Conditions** (from E1-S1, E1-S2, E1-S3):
- `renderer activates from agenticOsCanvas2dRenderer: animatic and no demo fixture is loaded`
- `timeline.scale.* is sole scale source and no renderer-only override exists`
- `ordinal fallback renders when timing absent`

---

### C2 — BeatLanePopulator

**Responsibility**: Reads `params.beat_ref` from each graph node and assigns nodes to the correct
lane row; resolves canonical node IDs (e.g. `NODE_CLIP_01`) to their lane type.

**Interfaces**:
- Input: `NodeGraph`, `BeatModel`
- Output: `LaneMap { [beatKey]: { [laneType]: Node[] } }`

**Dependencies**: C1 FrontmatterParser output

**Configuration**: lane-type lookup table (Clip, Overlay, Audio, Scene, Node)

**`/goal` Conditions** (from E2-S1):
- `NODE_CLIP_01 in Clip lane under beat_01`
- `NODE_AUDIO_02 in Audio lane under beat_02`
- `NODE_OVERLAY_01 in Overlay lane by canonical id`

---

### C3 — TimelineRenderer

**Responsibility**: Renders the Timeline Editor DOM: Scale Rail, Beat Strip, Lane Rows, and beat
card inline metadata (summary, tags, item count, per-lane chips); enforces compact geometry
(32 px rows, 28 px action pills).

**Interfaces**:
- Input: `BeatModel`, `LaneMap`, `LaneControlState`, `LaneOrder`
- Output: DOM tree rooted at `timeline-editor-time-area`

**Dependencies**: C2 BeatLanePopulator, C4 PlayerShell, shared Toolbar icon-button utilities

**Configuration**: compact row height (`32px`), action pill height (`28px`)

**`/goal` Conditions** (from E3-S3, E5-S1):
- `timeline-editor-time-area height 32px`
- `lane rows 32px`
- `action pills 28px`
- `beat card summary, tags, item count, per-lane chips present`

---

### C4 — PlayerShell

**Responsibility**: Renders the `timeline-player` wrapper with `play-control`, `time`, and
`rate-control` surfaces; owns the `Enable Runtime Auto Scroll` switch at the exact reference DOM
contract; keeps non-player controls visually secondary.

**Interfaces**:
- Input: playback state, auto-scroll flag
- Output: DOM rooted at `div.timeline-player` containing `div.player-config > button[role="switch"]`

**Dependencies**: C7 AutoScrollController

**Configuration**: `ant-switch` component class names (reference-fidelity locked)

**`/goal` Conditions** (from E3-S1, E3-S2):
- `player-config > button[role=switch][aria-checked=true][class~=ant-switch-checked] present`
- `div.ant-switch-handle, span.ant-switch-inner, div.ant-click-animating-node children present`
- `timeline-player, play-control, time, rate-control wrappers present and no aliases`

---

### C5 — InteractionHandler

**Responsibility**: Captures drag-to-move, edge-drag-to-resize, and beat CRUD events from the
timeline strip; computes timing deltas; enforces non-overlap invariant; dispatches patches.

**Interfaces**:
- Input: DOM pointer events, keyboard events
- Output: `BeatPatch { beatKey: string, start_ms: number, end_ms: number }` or `BeatCRUDOp`

**Dependencies**: C6 FrontmatterWriter, C7 AutoScrollController, SnapGrid service

**Configuration**: grid snap steps (ms), auto-scroll trigger zone (px)

**`/goal` Conditions** (from E4-S1, E4-S2):
- `drag commits start_ms/end_ms to frontmatter on release`
- `edge-hold auto-scroll fires continuously at rail edge`
- `contiguous push carries following beats forward with no overlap`
- `non-empty delete guard rejects operation`
- `Split midpoint snaps to grid`
- `Duplicate forward-shifts following beats`
- `Merge Next guard requires empty adjacent beat`
- `Remove Gap requires positive timing gap`

---

### C6 — FrontmatterWriter

**Responsibility**: Accepts typed patch objects and rewrites the relevant YAML frontmatter slices
for the active document, then commits them through the canonical workspace runtime command
`window.agentic-graphWorkspaceCommand.applyMarkdownDocument(...)`; preserves unrelated document state and
allows explicit beat insert/delete/reorder mutations when the interaction requires them.

**Interfaces**:
- Input: `FrontmatterPatch` (typed union: `BeatPatch | LaneControlPatch | LaneOrderPatch | MetadataPatch`)
- Output: updated YAML string committed to document store

**Dependencies**: AGENTIC_OS document store, `applyMarkdownDocument` workspace command

**Configuration**: targeted frontmatter rewrite policy; no parallel persistence store

**`/goal` Conditions** (from E4, E5, E6):
- `frontmatter updated within one write cycle after any interaction`
- `no unrelated key deleted on any patch`
- `lane_controls and lane_order persist and restore after reload`

---

### C7 — AutoScrollController

**Responsibility**: Monitors pointer position during drag interactions; triggers continuous
horizontal scroll when pointer is within the auto-scroll trigger zone near the rail edge.

**Interfaces**:
- Input: pointer x-position, rail bounds, drag-active flag
- Output: scroll delta applied to `timeline-editor-time-area`

**Dependencies**: C5 InteractionHandler (drag-active signal)

**Configuration**: trigger zone width (px), scroll velocity (px/frame)

**`/goal` Conditions** (from E4-S1):
- `horizontal scroll fires continuously when pointer held at rail edge during drag`

---

### C8 — KeyboardHandler

**Responsibility**: Maps keyboard events to playback actions (`Space`, `Left/Right`, `R`, `D`,
`S`) and metadata editor openers (`L`, `N`, `M`, `T`); suppresses all hotkeys when focus is inside
a text-entry control; routes lane/item/beat-strip roving tabindex events.

**Interfaces**:
- Input: `KeyboardEvent` stream, focus context flag
- Output: `TimelineAction` dispatched to C5 or metadata editor; roving tabindex mutations

**Dependencies**: C5 InteractionHandler, C3 TimelineRenderer (focus context)

**Configuration**: hotkey map (externalized); roving tabindex scope selectors

**`/goal` Conditions** (from E7-S1, E7-S2, E7-S3):
- `Space/Left/Right/R/D/S fire actions outside text-entry`
- `all hotkeys suppressed inside text-entry`
- `L/N/M/T open corresponding editor`
- `lane, item, beat-strip roving tabindex navigation correct`
- `hint chips compact with tooltip expansion`

---

### C9 — ValidatorScript

**Responsibility**: Provides the mounted-surface test harness at
`./scripts/validate_animatic_timeline_interactions.py`; applies markdown documents via
`applyMarkdownDocument`; asserts DOM state and frontmatter values; exits 0 on full pass.

**Interfaces**:
- Input: mounted AGENTIC_OS surface, test fixtures (markdown documents)
- Output: `PASS` / `FAIL` per named test case; process exit code 0 (pass) or 1 (fail)

**Dependencies**: `window.agentic-graphWorkspaceCommand.applyMarkdownDocument`, DOM query APIs

**Configuration**: test fixture markdown blocks, named test case registry, Playwright Chromium

**`/goal` Conditions** (from E8-S1):
- `script exits 0 with all named test cases PASS`
- `every test case references applyMarkdownDocument`

---

---

## Integration Contracts

| Interface                    | Protocol      | Format             | Error Handling                              |
|------------------------------|---------------|--------------------|---------------------------------------------|
| FrontmatterParser → BeatModel| In-process    | TypeScript object  | Throw + renderer fallback to ordinal beats  |
| BeatLanePopulator → LaneMap  | In-process    | TypeScript object  | Unknown node type → lane `Node` fallback    |
| InteractionHandler → FMWriter| In-process    | `FrontmatterPatch` | Rollback patch on write failure; alert user |
| FMWriter → applyMarkdownDocument | Browser command | `WorkspaceRuntimeCommandApplyDocumentArgs` | Fail fast; preserve current runtime state when apply returns `applied: false` |
| ValidatorScript → mounted DOM| Playwright Chromium | browser-evaluated command calls + DOM assertions | Test case FAIL on assertion error |

---
