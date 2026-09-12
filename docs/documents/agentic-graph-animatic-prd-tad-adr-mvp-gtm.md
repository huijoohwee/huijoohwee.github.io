---
title: Agentic Graph Animatic — PRD-TAD-ADR-MVP-GTM
agenticOsDocumentSemanticMode: document
agenticOsFrontmatterModeEnabled: true
agenticOsDocumentStructureBaselineLock: false
prd_version: "1.1.0"
tad_version: "1.1.0"
status: Enhanced Baseline
date: "2026-09-12"
source_validation_doc: agentic-graph-animatic-demo.md
guidelines_ref: guidelines/prd-tad-adr-mvp-gtm-guidelines.md
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.1.1"
lang: "en-US"
owner: "Product maintainers"
frontmatter_contract: "required"
continuity_id: "PLAN-AGENTIC-GRAPH-ANIMATIC-PRD-TAD-ADR-MVP-GTM"
local_rung: "undocumented"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
worktree_id: "device-cba000d3779d--planning-v27"
agent_id: "codex-01a0940a"
guideline_revision: "2.7.0"
guideline_source: "https://github.com/huijoohwee/huijoohwee.github.io/blob/e8d2a10a8d3e5735c43edf350a22523df05fdf91/guidelines/prd-tad-adr-mvp-gtm-guidelines.md"
reviewed_source_revision: "e8d2a10a8d3e5735c43edf350a22523df05fdf91"
previous_document_version: "0.1.0"
prd_revision: "0.1.1"
tad_revision: "0.1.1"
adr_revision: "0.1.1"
mvp_revision: "0.1.1"
gtm_revision: "0.1.1"
---

# Agentic Graph Animatic — PRD-TAD-ADR-MVP-GTM

**PRD v1.1.0 · TAD v1.1.0 · Enhanced Baseline 2026-05-25**
Source: `agentic-graph-animatic-demo.md § Validation Goals`
Standard: `guidelines/prd-tad-adr-mvp-gtm-guidelines.md`

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

Owned by [Agentic Graph Animatic Problem & Scope Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-scope.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## User Journey — Content Author: Author → Playback → Edit

Owned by [Agentic Graph Animatic Problem & Scope Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-scope.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Epics & User Stories

Owned by [Agentic Graph Animatic Epics & User Stories Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-epics.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Scope Boundaries

Owned by [Agentic Graph Animatic Problem & Scope Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-scope.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Implementation Constraints

Owned by [Agentic Graph Animatic Problem & Scope Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-scope.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Decisions & Open Questions

Owned by [Agentic Graph Animatic Problem & Scope Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-scope.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Architecture Overview

Owned by [Agentic Graph Animatic Components Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-components.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Journey → System Mapping

Owned by [Agentic Graph Animatic Components Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-components.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Component Specifications

Owned by [Agentic Graph Animatic Components Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-components.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Integration Contracts

Owned by [Agentic Graph Animatic Components Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-components.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Workflow: Beat Drag-to-Move

Owned by [Agentic Graph Animatic Flows & Diagrams Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-flows.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Workflow: Validator Script Run

Owned by [Agentic Graph Animatic Flows & Diagrams Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-flows.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Data Flows

Owned by [Agentic Graph Animatic Flows & Diagrams Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-flows.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Architectural Decisions

Owned by [Agentic Graph Animatic Decisions & Attributes Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-decisions.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Quality Attributes

Owned by [Agentic Graph Animatic Decisions & Attributes Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-decisions.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Deployment Strategy

Owned by [Agentic Graph Animatic Decisions & Attributes Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-decisions.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Architecture Diagrams

Owned by [Agentic Graph Animatic Flows & Diagrams Module](./agentic-graph-animatic-prd-tad-adr-mvp-gtm-flows.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

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

## Planning revision — reference implementation

All five roles below consume `PLAN-AGENTIC-GRAPH-ANIMATIC-PRD-TAD-ADR-MVP-GTM@0.1.1`. Existing source and runtime observations retain their original revisions and scope; this documentation update renews no deployment or demand evidence. The guideline is [v2.7.0](https://github.com/huijoohwee/huijoohwee.github.io/blob/e8d2a10a8d3e5735c43edf350a22523df05fdf91/guidelines/prd-tad-adr-mvp-gtm-guidelines.md); the shared maturity rubric loads on demand.

| Role | Owning content at this revision |
|---|---|
| PRD | [Part 1 — Product Requirements (PRD)](agentic-graph-animatic-prd-tad-adr-mvp-gtm.md#part-1--product-requirements-prd) |
| TAD | [Part 2 — Technical Architecture (TAD)](agentic-graph-animatic-prd-tad-adr-mvp-gtm-scope.md#part-2--technical-architecture-tad) |
| ADR | [Architectural Decisions](agentic-graph-animatic-prd-tad-adr-mvp-gtm-decisions.md#architectural-decisions) |
| MVP | [MVP — reference implementation](agentic-graph-animatic-prd-tad-adr-mvp-gtm.md#mvp--reference-implementation) |
| GTM | [GTM — reference implementation](agentic-graph-animatic-prd-tad-adr-mvp-gtm.md#gtm--reference-implementation) |

## MVP — reference implementation

Reuse the minimum scope, acceptance conditions and component owners identified above. The demonstration must follow the documented entry, permitted action, durable outcome and readback, including its stated failure/recovery path. Use `npm run check` for its actual coverage and the named feature checks in the specification; attach exact source, command, result and authoring/mirror/delivery surface to each VCC before advancing readiness. A source locator or structural check alone proves no user outcome.

Record the observed steps and elapsed time against the existing TTV target. If no target or invocation is stated, the demonstration remains unverified until the document owner supplies it. All four experience criteria are **unassessed** in this authoring review: Core Requirements & Functionality, Innovation & Theme Alignment, Technical Execution & Integration, and Usefulness & Agentic Experience. No scored user observation is attached to this revision; the document owner must capture a timed pilot and criterion-specific evidence.

## GTM — reference implementation

Use the stated persona and pain hypothesis to test one priced pilot in the existing user environment. Keep the documented free/self-serve workflow as the comparison; additional hosting, channels or agent roles require an evidenced constraint or buyer need. Record the buyer’s workaround, frequency, accepted outcome, offered price, observed response and support minutes before ranking a commercial winner. Demand, collected payment and repeat use remain unvalidated by this documentation review; mechanism evidence keeps its narrower original scope. Measure tokens, cash expense and maintenance separately for each proposed deployment model. Feed actual pilot outcomes into a successor Context using the shared four-column planning record.

## Planning gaps — reference implementation

Source review is bounded to repository `e8d2a10a8d3e5735c43edf350a22523df05fdf91`. No feature implementation artifact was independently bound by this document review; implementation disposition remains **unverified** pending the document owner’s source-to-VCC check.
Experience observations, current VCC execution and buyer/payment evidence are unverified here. This is a bounded planning update, not a full-guideline conformance verdict; historical conformance percentages above apply only to their recorded profile and revision.
