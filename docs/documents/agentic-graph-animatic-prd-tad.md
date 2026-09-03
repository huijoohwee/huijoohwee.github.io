---
title: Agentic Graph Animatic — PRD + TAD
agenticOsDocumentSemanticMode: document
agenticOsFrontmatterModeEnabled: true
agenticOsDocumentStructureBaselineLock: false
prd_version: "1.1.0"
tad_version: "1.1.0"
status: Enhanced Baseline
date: 2026-05-25
source_validation_doc: agentic-graph-animatic-demo.md
guidelines_ref: prd-tad-guidelines.md
---

# Agentic Graph Animatic — PRD + TAD

**PRD v1.1.0 · TAD v1.1.0 · Enhanced Baseline 2026-05-25**
Source: `agentic-graph-animatic-demo.md § Validation Goals`
Standard: `prd-tad-guidelines.md`

## Markdown YAML Frontmatter Contract

- This PRD/TAD and its referenced animatic source docs use the opening YAML frontmatter block as the canonical metadata and renderer-activation contract.
- `agenticOsCanvas2dRenderer: animatic` remains the single frontmatter trigger for the animatic renderer; no duplicate renderer-only bootstrap path is allowed.
- Canonical animatic authoring keeps `flow:` and `timeline.beats.*` in plain YAML; normalized `{key, type, value}` wrappers are reserved for dedicated validation fixtures, not baseline authored animatic docs.
- Invalid YAML frontmatter is an acceptance failure because parser warning or repair paths are recovery mechanisms, not release-authoring targets.
- Scalars with reserved punctuation must be quoted so animatic docs stay valid under strict YAML parsing during ingest, reload, and validation automation.

## Current Runtime Owners

- Renderer registry SSOT: `agentic-graph/canvas/src/lib/config.render.ts`
- Surface mount owner: `agentic-graph/canvas/src/components/CanvasViewport.tsx`
- Runtime shell + DOM/CSS contract: `agentic-graph/canvas/src/components/AnimaticCanvas.tsx`,
  `agentic-graph/canvas/src/components/AnimaticCanvas.css`
- Timeline model + frontmatter rewrite owner:
  `agentic-graph/canvas/src/components/AnimaticCanvas/animaticTimeline.ts`
- Lane presentation owner:
  `agentic-graph/canvas/src/components/AnimaticCanvas/animaticLaneControls.ts`
- Keyboard policy owner:
  `agentic-graph/canvas/src/components/AnimaticCanvas/animaticKeyboard.ts`
- Browser-facing runtime command owner:
  `agentic-graph/canvas/src/features/agent-ready/workspaceRuntimeCommand.ts`
- Mounted validator owner:
  `agentic-graph/canvas/scripts/validate_animatic_timeline_interactions.py`
- Canonical validator entry command: `npm run validate:animatic-interactions`

---

# Part 1 — Product Requirements (PRD)

---

## Phase 0 — Problem Discovery

Owned by [Agentic Graph Animatic Problem & Scope Module](./agentic-graph-animatic-prd-scope.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## User Journey — Content Author: Author → Playback → Edit

Owned by [Agentic Graph Animatic Problem & Scope Module](./agentic-graph-animatic-prd-scope.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Epics & User Stories

Owned by [Agentic Graph Animatic Epics & User Stories Module](./agentic-graph-animatic-prd-epics.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Scope Boundaries

Owned by [Agentic Graph Animatic Problem & Scope Module](./agentic-graph-animatic-prd-scope.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Implementation Constraints

Owned by [Agentic Graph Animatic Problem & Scope Module](./agentic-graph-animatic-prd-scope.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Decisions & Open Questions

Owned by [Agentic Graph Animatic Problem & Scope Module](./agentic-graph-animatic-prd-scope.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Architecture Overview

Owned by [Agentic Graph Animatic Components Module](./agentic-graph-animatic-tad-components.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Journey → System Mapping

Owned by [Agentic Graph Animatic Components Module](./agentic-graph-animatic-tad-components.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Component Specifications

Owned by [Agentic Graph Animatic Components Module](./agentic-graph-animatic-tad-components.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Integration Contracts

Owned by [Agentic Graph Animatic Components Module](./agentic-graph-animatic-tad-components.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Workflow: Beat Drag-to-Move

Owned by [Agentic Graph Animatic Flows & Diagrams Module](./agentic-graph-animatic-tad-flows.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Workflow: Validator Script Run

Owned by [Agentic Graph Animatic Flows & Diagrams Module](./agentic-graph-animatic-tad-flows.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Data Flows

Owned by [Agentic Graph Animatic Flows & Diagrams Module](./agentic-graph-animatic-tad-flows.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Architectural Decisions

Owned by [Agentic Graph Animatic Decisions & Attributes Module](./agentic-graph-animatic-adr.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Quality Attributes

Owned by [Agentic Graph Animatic Decisions & Attributes Module](./agentic-graph-animatic-adr.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Deployment Strategy

Owned by [Agentic Graph Animatic Decisions & Attributes Module](./agentic-graph-animatic-adr.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Architecture Diagrams

Owned by [Agentic Graph Animatic Flows & Diagrams Module](./agentic-graph-animatic-tad-flows.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Component Inventory

| Layer          | Component              | File / Module                                           | Status      |
|----------------|------------------------|---------------------------------------------------------|-------------|
| Registry       | Surface registry + mount | `agentic-graph/canvas/src/lib/config.render.ts`, `agentic-graph/canvas/src/components/CanvasViewport.tsx` | Live |
| Parse + Model  | C1 FrontmatterParser / C2 BeatLanePopulator | `agentic-graph/canvas/src/components/AnimaticCanvas/animaticTimeline.ts` | Live |
| Render         | C3 TimelineRenderer    | `agentic-graph/canvas/src/components/AnimaticCanvas.tsx`, `agentic-graph/canvas/src/components/AnimaticCanvas.css` | Live |
| Player         | C4 PlayerShell         | `agentic-graph/canvas/src/components/AnimaticCanvas.tsx`, `agentic-graph/canvas/src/components/AnimaticCanvas.css` | Live |
| Interaction    | C5 InteractionHandler  | `agentic-graph/canvas/src/components/AnimaticCanvas.tsx`, `agentic-graph/canvas/src/components/AnimaticCanvas/animaticTimeline.ts` | Live |
| Write          | C6 FrontmatterWriter   | `agentic-graph/canvas/src/components/AnimaticCanvas/animaticTimeline.ts`, `agentic-graph/canvas/src/features/agent-ready/workspaceRuntimeCommand.ts` | Live |
| Scroll         | C7 AutoScrollController| `agentic-graph/canvas/src/components/AnimaticCanvas.tsx` | Live |
| Keyboard       | C8 KeyboardHandler     | `agentic-graph/canvas/src/components/AnimaticCanvas/animaticKeyboard.ts`, `agentic-graph/canvas/src/components/AnimaticCanvas.tsx` | Live |
| Lane State     | Lane presentation      | `agentic-graph/canvas/src/components/AnimaticCanvas/animaticLaneControls.ts` | Live |
| Validation     | C9 ValidatorScript     | `agentic-graph/canvas/scripts/validate_animatic_timeline_interactions.py`, `agentic-graph/canvas/package.json` | Live |

---

# Traceability Matrix

| PRD Story    | Acceptance Criterion (summary)                               | TAD Component            | `/goal` Condition                                                                   |
|--------------|--------------------------------------------------------------|--------------------------|--------------------------------------------------------------------------------------|
| E1-S1        | Renderer activates from `agenticOsCanvas2dRenderer: animatic`      | C1, C3                   | `renderer activates and no demo fixture loaded; validator exits 0`                  |
| E1-S1        | Canonical flow: YAML syntax reused; no parallel block        | C1                       | `grep animatic-only block returns no match`                                        |
| E1-S2        | `timeline.scale.*` sole scale config source                  | C1, C3                   | `scale rail matches frontmatter; no renderer-only key in source`                    |
| E1-S3        | Ordinal fallback when timing absent                          | C1, C3                   | `ordinal beats render when timing absent; validator exits 0`                        |
| E2-S1        | `NODE_CLIP_01` in Clip lane under beat_01                    | C2                       | `NODE_CLIP_01 in Clip/beat_01; validator exits 0`                                   |
| E2-S1        | `NODE_AUDIO_02` in Audio lane under beat_02                  | C2                       | `NODE_AUDIO_02 in Audio/beat_02; validator exits 0`                                 |
| E2-S1        | `NODE_OVERLAY_01` by canonical id                            | C2                       | `NODE_OVERLAY_01 in Overlay; validator exits 0`                                     |
| E3-S1        | Auto-scroll switch exact DOM contract                        | C4                       | `button[role=switch][aria-checked=true][class~=ant-switch-checked] present`         |
| E3-S2        | Player shell wrapper contract                                | C4                       | `timeline-player, play-control, time, rate-control present; no aliases`             |
| E3-S3        | 32 px row geometry; 28 px action pills                       | C3                       | `time-area 32px; lane rows 32px; pills 28px; validator exits 0`                     |
| E4-S1        | Drag commits `start_ms`/`end_ms` on release                  | C5, C6                   | `frontmatter start_ms/end_ms match post-drag; validator move test exits 0`          |
| E4-S1        | Auto-scroll at rail edge during drag                         | C5, C7                   | `validator edge-hold auto-scroll test exits 0`                                      |
| E4-S1        | Contiguous push carries following beats                      | C5, C6                   | `validator contiguous-push test exits 0; no overlap in frontmatter`                 |
| E4-S2        | Insert Before / After with non-overlap shift                 | C5, C6                   | `validator Insert Before timing shift test exits 0`                                 |
| E4-S2        | Non-empty delete guard rejects operation                     | C5, C6                   | `validator non-empty delete guard test exits 0; beat count unchanged`               |
| E4-S2        | Empty beat delete with backward compaction                   | C5, C6                   | `validator empty-beat delete compaction test exits 0`                               |
| E4-S2        | Split at grid-snapped playhead                               | C5, C6                   | `validator Split midpoint continuity test exits 0`                                  |
| E4-S2        | Duplicate with forward-shift                                 | C5, C6                   | `validator Duplicate forward-shift compaction test exits 0`                         |
| E4-S2        | Merge Next with empty-adjacent guard                         | C5, C6                   | `validator Merge Next guard test exits 0`                                           |
| E4-S2        | Remove Gap with positive-gap guard                           | C5, C6                   | `validator Remove Gap guard test exits 0`                                           |
| E4-S2        | Hover quick-action icons present                             | C3                       | `validator hover icon presence test exits 0 for all 7 icon types`                  |
| E5-S1        | Summary visible inline on beat card                          | C3                       | `beat card summary text matches frontmatter.summary; validator exits 0`             |
| E5-S1        | Tags as inline chips with `+N` overflow                      | C3                       | `tag chips render; overflow badge present; validator exits 0`                       |
| E5-S1        | Item count + per-lane chips with `+N` overflow               | C3                       | `item count and per-lane chips correct; validator exits 0`                          |
| E5-S1        | Lane chip click scrolls row without mutating state           | C3, C6                   | `validator lane chip scroll test exits 0; lane_controls unchanged`                  |
| E5-S2        | Label/note/summary/tags edit commits to frontmatter          | C5, C6, C8               | `frontmatter beat.* keys match committed values; validator exits 0`                 |
| E5-S2        | `Cmd/Ctrl+Enter` saves; `Escape` cancels                     | C8, C6                   | `Cmd+Enter commits; Escape leaves frontmatter unchanged; validator exits 0`         |
| E5-S2        | No duplicate tags after commit                               | C6                       | `tags array has no duplicates; validator exits 0`                                   |
| E6-S1        | Hide/Mute/Solo commit to `lane_controls`                     | C5, C6                   | `frontmatter lane_controls reflects mutation; validator exits 0`                    |
| E6-S1        | Lane controls restore on reload                              | C1, C3                   | `validator lane Hide/Mute/Solo persist/clear/restore test exits 0`                  |
| E6-S2        | Lane order commits to `lane_order`                           | C5, C6                   | `frontmatter lane_order reflects new sequence; validator exits 0`                   |
| E6-S2        | Lane order restores on reload                                | C1, C3                   | `validator lane order persist/clear/restore test exits 0`                           |
| E7-S1        | Playback hotkeys fire outside text-entry                     | C8, C5                   | `validator playback hotkey test exits 0 for 6 keys`                                 |
| E7-S1        | Hotkeys suppressed in text-entry                             | C8                       | `validator hotkey suppression test exits 0`                                         |
| E7-S2        | `L/N/M/T` open metadata editors                              | C8, C3                   | `validator metadata hotkey open test exits 0 for 4 keys`                            |
| E7-S3        | Lane roving tabindex + `[]/H/U/O` shortcuts                  | C8, C3, C6               | `validator lane roving tabindex and shortcut test exits 0`                          |
| E7-S3        | Item `,`/`.` reassignment updates `beat_ref`                 | C8, C6                   | `validator item reassignment hotkey test exits 0; beat_ref updated`                 |
| E7-S3        | Beat strip roving tabindex                                   | C8, C3                   | `validator beat strip roving tabindex test exits 0`                                 |
| E7-S3        | Hint chips compact with tooltip expansion                    | C3                       | `validator hint chip height test exits 0`                                           |
| E8-S1        | Validator exits 0 on correct renderer                        | C9                       | `python3 ./scripts/validate_animatic_timeline_interactions.py exits 0`             |
| E8-S1        | All test cases reference `applyMarkdownDocument`             | C9                       | `all test cases call applyMarkdownDocument; deterministic PASS/FAIL output`         |

---

*End of document. PRD v1.1.0 · TAD v1.1.0 · Enhanced Baseline 2026-05-25.*
