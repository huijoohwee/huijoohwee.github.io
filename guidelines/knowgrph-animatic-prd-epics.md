---
title: "Knowgrph Animatic Epics & User Stories Module"
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
parent: "Knowgrph Animatic PRD/TAD"
parent_version: "1.0.0"
---

# Knowgrph Animatic Epics & User Stories Module

## Scope & Ownership

Owns the epic and user-story decomposition with its acceptance criteria. This is the requirements payload of the PRD.

This module is loaded on demand from [Knowgrph Animatic PRD/TAD](./knowgrph-animatic-prd-tad.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Epics & User Stories

---

### Epic E1 — Renderer Activation & Schema Ownership

**Problem**: The renderer may activate via hardcoded demo paths or duplicate config surfaces rather
than reading exclusively from frontmatter.

#### E1-S1 — Frontmatter-driven activation

**As a** Content Author **I want** the 2D Animatic renderer to activate solely from
`kgCanvas2dRenderer: animatic` in YAML frontmatter **so that** no out-of-band configuration is
needed to start the renderer.

**Acceptance Criteria**

- **Given** a document with `kgCanvas2dRenderer: animatic` in frontmatter **When** the KGC canvas
  loads the document **Then** the animatic renderer activates and the timeline rail renders without
  any additional configuration.

  > **`/goal` translation**: `renderer activates and timeline rail is present in DOM verified by
  > python3 ./scripts/validate_animatic_timeline_interactions.py exits 0 and no hardcoded demo
  > bootstrap path is called`

- **Given** a document that uses `flow:` YAML authoring surface **When** the animatic renderer
  reads it **Then** it reuses the same canonical Storyboard frontmatter syntax with no
  parallel animatic-only markdown block.

  > **`/goal` translation**: `grep for animatic-only markdown block returns no match and
  > flow: key is present in frontmatter verified by file content check`

#### E1-S2 — timeline.scale as single scale owner

**As a** Content Author **I want** `timeline.scale.*` to be the only configuration surface for
scale rail, major interval, split count, rail width, and leading offset **so that** no renderer-only
config path overrides or duplicates scale values.

**Acceptance Criteria**

- **Given** `timeline.scale.scale`, `scale_split_count`, `scale_width`, `start_left` set in
  frontmatter **When** the renderer renders the scale rail **Then** it reads exclusively those
  values with no parallel renderer-only override path.

  > **`/goal` translation**: `timeline scale rail values match frontmatter scale.* values verified
  > by validator script and no renderer-only config key exists in source`

#### E1-S3 — Beat timing from frontmatter only

**As a** Renderer Implementer **I want** `timeline.beats.*` to drive all beat labels and timing
**so that** no hardcoded demo rows exist in the renderer code.

**Acceptance Criteria**

- **Given** a document with `timeline.beats.*` entries **When** timing data is absent **Then** the
  renderer falls back to ordinal beat order rather than fixture-only fake data.

  > **`/goal` translation**: `renderer renders ordinal beats when timing absent verified by
  > validator and no fixture data constant exists in renderer source`

**MoSCoW**: Must  
**Success Metrics**

| Metric                               | Baseline       | Target                    | Timeline |
|--------------------------------------|----------------|---------------------------|----------|
| Renderer activation failures         | Unknown        | 0 per 100 document opens  | v1.0     |
| Hardcoded demo fixtures in renderer  | Unknown        | 0                         | v1.0     |
| Scale config surfaces                | Unknown        | Exactly 1 (`timeline.scale.*`) | v1.0 |

---

### Epic E2 — Timeline Lane Population & Graph Binding

**Problem**: Graph nodes with `beat_ref` or canonical IDs do not reliably populate the correct beat
lane, causing mismatches between the visual timeline and the frontmatter graph.

#### E2-S1 — beat_ref drives lane assignment

**As a** Content Author **I want** graph nodes with `params.beat_ref` pointing at a beat key to
appear in the correct lane **so that** the visual timeline reflects the frontmatter graph structure.

**Acceptance Criteria**

- **Given** `NODE_CLIP_01` with `params.beat_ref: beat_01` **When** the renderer renders lanes
  **Then** the node appears in the Clip lane under beat_01.

  > **`/goal` translation**: `NODE_CLIP_01 is in lane Clip under beat_01 verified by
  > validator exits 0`

- **Given** `NODE_AUDIO_02` with `params.beat_ref: beat_02` **When** the renderer renders lanes
  **Then** the node appears in the Audio lane under beat_02.

  > **`/goal` translation**: `NODE_AUDIO_02 is in lane Audio under beat_02 verified by
  > validator exits 0`

- **Given** any node linked by canonical id (e.g. `NODE_OVERLAY_01`) **When** the renderer reads
  the active graph **Then** it populates the matching beat lane without requiring explicit
  `beat_ref` duplication.

  > **`/goal` translation**: `NODE_OVERLAY_01 is in lane Overlay verified by validator exits 0`

**MoSCoW**: Must  
**Success Metrics**

| Metric                          | Baseline | Target    | Timeline |
|---------------------------------|----------|-----------|----------|
| Lane misassignment rate         | Unknown  | 0         | v1.0     |
| Nodes requiring beat_ref re-map | Unknown  | 0         | v1.0     |

---

### Epic E3 — Player Shell & Compact Geometry

**Problem**: The player shell DOM contract deviates from the reference spec, and non-player controls
inflate geometry beyond the compact 32 px target.

#### E3-S1 — Auto-scroll switch DOM contract

**As a** QA Validator **I want** the `Enable Runtime Auto Scroll` switch to match the exact
reference DOM shape **so that** automated selectors targeting the switch remain stable.

**Acceptance Criteria**

- **Given** the timeline player is rendered **When** the auto-scroll switch is present **Then** the
  DOM shape is exactly `div.player-config > button[role="switch"][aria-checked="true"]
  .ant-switch.ant-switch-checked[ant-click-animating="true"][style="margin-bottom:20px"]`
  containing `div.ant-switch-handle`, `span.ant-switch-inner`, `div.ant-click-animating-node`.

  > **`/goal` translation**: `DOM query for player-config > button[role=switch] returns element
  > with aria-checked=true and class ant-switch-checked verified by validator exits 0`

#### E3-S2 — Player shell wrapper contract

**As a** Renderer Implementer **I want** the player shell to use `timeline-player`,
`play-control`, `time`, and `rate-control` surface names **so that** no bespoke wrapper aliases
are introduced.

**Acceptance Criteria**

- **Given** the rendered player shell **When** inspected **Then** wrapper names match the reference
  contract exactly, with no local-only player meta chips inside the shell and no oversized
  header-only lane/item banners.

  > **`/goal` translation**: `DOM contains timeline-player, play-control, time, rate-control and
  > no bespoke wrapper alias exists verified by validator exits 0`

#### E3-S3 — Compact geometry (32 px targets)

**As a** Content Author **I want** the timeline editor geometry to use compact 32 px row heights
**so that** the timeline rail maximises visible beat density.

**Acceptance Criteria**

- **Given** the timeline editor is rendered **When** geometry is measured **Then**
  `timeline-editor-time-area` is 32 px, lane rows are 32 px, mounted action pills are 28 px height,
  and no oversized header-only banners inflate the rail.

  > **`/goal` translation**: `timeline-editor-time-area height is 32px and lane rows are 32px
  > and action pills are 28px verified by validator exits 0`

**MoSCoW**: Must  
**Success Metrics**

| Metric                              | Baseline | Target        | Timeline |
|-------------------------------------|----------|---------------|----------|
| DOM contract deviations             | Unknown  | 0             | v1.0     |
| Row height violations (>32 px)      | Unknown  | 0             | v1.0     |
| Bespoke wrapper aliases             | Unknown  | 0             | v1.0     |

---

### Epic E4 — Beat CRUD & Timing Interactions

**Problem**: Beat drag/resize operations either silently no-op or fail to commit updated timing back
into frontmatter, and contiguous-beat push logic is unimplemented.

#### E4-S1 — Drag-to-move and edge-drag-to-resize

**As a** Content Author **I want** to drag beats to move them and drag their edges to resize them
**so that** I can adjust timing directly on the timeline without editing YAML manually.

**Acceptance Criteria**

- **Given** a beat card in the timeline strip **When** the user drags the beat body **Then** it
  moves to the new position and `start_ms`/`end_ms` update in frontmatter on release.

  > **`/goal` translation**: `validator move test exits 0 and frontmatter start_ms/end_ms match
  > post-drag values with no other beat modified unless pushed`

- **Given** a beat card near the viewport edge while being dragged **When** the pointer is held at
  the rail edge **Then** the timeline auto-scrolls horizontally continuously until the pointer is
  released.

  > **`/goal` translation**: `validator edge-hold auto-scroll test exits 0`

- **Given** a drag or right-resize that pushes into the next beat **When** the operation is
  committed **Then** following beats carry forward to preserve a non-overlapping sequence with no
  silent no-op.

  > **`/goal` translation**: `validator contiguous-push test exits 0 and no beat overlap exists
  > in frontmatter after operation`

#### E4-S2 — Beat Insert, Delete, Split, Duplicate, Merge, Remove Gap

**As a** Content Author **I want** full beat lifecycle operations (insert, delete, split, duplicate,
merge, remove gap) with appropriate guards **so that** the beat sequence stays consistent and
non-overlapping at all times.

**Acceptance Criteria**

- **Given** a beat is active **When** Insert Before or Insert After is triggered **Then** a new
  beat is placed relative to the active beat with all following beats shifted to preserve
  non-overlapping absolute timing.

  > **`/goal` translation**: `validator Insert Before timing shift test exits 0 and no overlap
  > in resulting frontmatter beats`

- **Given** a beat is non-empty **When** Delete Beat is triggered **Then** the action is rejected
  and no frontmatter mutation occurs.

  > **`/goal` translation**: `validator non-empty delete guard test exits 0 and beat count
  > unchanged in frontmatter`

- **Given** a beat is empty **When** Delete Beat is triggered **Then** the beat is removed and
  following beats compact backward.

  > **`/goal` translation**: `validator empty-beat delete compaction test exits 0 and frontmatter
  > beat count decremented by 1`

- **Given** a beat is active **When** Split Beat is triggered **Then** the split occurs at the
  playhead position snapped to the active grid step, and two non-overlapping beats replace the
  original.

  > **`/goal` translation**: `validator Split midpoint continuity test exits 0 and split point
  > matches grid-snapped playhead in frontmatter`

- **Given** a beat is active **When** Duplicate Beat is triggered **Then** a copied beat is placed
  after the active beat and following beats shift forward by the duplicated duration.

  > **`/goal` translation**: `validator Duplicate forward-shift compaction test exits 0`

- **Given** the adjacent next beat is empty **When** Merge Next is triggered **Then** the active
  beat extends through the empty next beat window without orphaning any items.

  > **`/goal` translation**: `validator Merge Next guard/empty-beat merge test exits 0 and
  > merged beat end_ms equals original next beat end_ms`

- **Given** a positive absolute-timing gap exists before the active beat **When** Remove Gap is
  triggered **Then** the active beat and following beats compact back to the previous beat boundary.

  > **`/goal` translation**: `validator Remove Gap guard/backward compaction test exits 0`

- **Given** each beat card **When** the pointer hovers **Then** native quick-action icons for
  delete, insert-before, insert-after, label-rename, note, duplicate, and split are visible.

  > **`/goal` translation**: `validator hover quick-action icon presence test exits 0 for all
  > seven icon types`

**MoSCoW**: Must  
**Success Metrics**

| Metric                            | Baseline | Target              | Timeline |
|-----------------------------------|----------|---------------------|----------|
| Silent no-ops on drag/resize      | Unknown  | 0                   | v1.0     |
| Frontmatter sync failures         | Unknown  | 0 after any CRUD op | v1.0     |
| Beat overlap after any operation  | Unknown  | 0                   | v1.0     |

---

### Epic E5 — Beat Metadata & Inline Display

**Problem**: Beat cards display no inline metadata (summary, tags, item count, per-lane chips),
forcing authors to open separate inspectors for information available on the strip.

#### E5-S1 — Inline metadata on beat cards

**As a** Content Author **I want** beat cards to show summary, tags, item count, and per-lane
item chips inline **so that** I can review beat density at a glance without leaving the timeline
strip.

**Acceptance Criteria**

- **Given** a beat with a saved summary **When** the beat card renders **Then** the summary is
  visible inline without entering edit mode.

  > **`/goal` translation**: `beat card contains summary text matching frontmatter
  > timeline.beats.<beat>.summary verified by validator exits 0`

- **Given** a beat with saved tags **When** the beat card renders **Then** tags appear as inline
  chips with overflow collapsed into a `+N` badge.

  > **`/goal` translation**: `beat card tag chips render and overflow badge present when count
  > exceeds threshold verified by validator exits 0`

- **Given** a beat with lane items **When** the beat card renders **Then** the item count is shown
  inline and per-lane item summary chips are present with `+N` badge overflow.

  > **`/goal` translation**: `beat card item count matches lane item count and per-lane chips
  > render verified by validator exits 0`

- **Given** a beat-card lane summary chip is clicked **When** the navigation fires **Then** the
  matching lane row scrolls into view and briefly highlights without mutating frontmatter
  lane-control state.

  > **`/goal` translation**: `validator lane chip scroll test exits 0 and lane_controls
  > frontmatter unchanged after chip click`

#### E5-S2 — Active beat metadata editing

**As a** Content Author **I want** to edit the active beat's label, note, summary, and tags from
the renderer **so that** I never need to manually edit the YAML frontmatter for metadata.

**Acceptance Criteria**

- **Given** the active beat **When** label, note, summary, or tag is edited and saved **Then** the
  corresponding `timeline.beats.<beat>.*` key is updated in frontmatter.

  > **`/goal` translation**: `frontmatter timeline.beats.<beat>.label/note/summary/tags match
  > editor-committed values verified by validator exits 0`

- **Given** a multiline note or summary editor is open **When** `Cmd/Ctrl+Enter` is pressed
  **Then** the value is saved; when `Escape` is pressed **Then** the edit is cancelled without
  mutation.

  > **`/goal` translation**: `Cmd/Ctrl+Enter commits note to frontmatter and Escape leaves
  > frontmatter unchanged verified by validator exits 0`

- **Given** tag editing is active **When** a tag value is committed **Then** no duplicate tag
  values appear in `timeline.beats.<beat>.tags[]`.

  > **`/goal` translation**: `frontmatter tags array has no duplicates after commit verified
  > by validator exits 0`

**MoSCoW**: Should  
**Success Metrics**

| Metric                                 | Baseline | Target | Timeline |
|----------------------------------------|----------|--------|----------|
| Metadata edits requiring manual YAML   | Unknown  | 0      | v1.0     |
| Duplicate tag entries after edit       | Unknown  | 0      | v1.0     |

---

### Epic E6 — Lane Controls & Order Persistence

**Problem**: Lane Hide/Mute/Solo and lane order changes are not persisted to frontmatter and are
lost on document reload.

#### E6-S1 — Lane control state persistence

**As a** Content Author **I want** Hide, Mute, and Solo lane actions to persist into frontmatter
and restore on reload **so that** my lane configuration survives document round-trips.

**Acceptance Criteria**

- **Given** a lane is hidden, muted, or set to solo **When** the mutation fires **Then**
  `timeline.lane_controls.hidden|muted|solo` is updated in frontmatter.

  > **`/goal` translation**: `frontmatter lane_controls reflects mutation within one write cycle
  > verified by validator exits 0`

- **Given** a document is reloaded after lane control mutations **When** the renderer re-renders
  **Then** hidden, muted, and solo states are restored to the persisted values.

  > **`/goal` translation**: `validator lane Hide/Mute/Solo persist/clear/restore test exits 0`

- **Given** the original markdown is re-applied **When** the renderer re-renders **Then**
  lane control state clears to the original document defaults.

  > **`/goal` translation**: `validator lane control clear-on-reapply test exits 0`

#### E6-S2 — Lane order persistence

**As a** Content Author **I want** lane reorder actions to persist into `timeline.lane_order`
and restore on reload **so that** my preferred lane sequence is retained.

**Acceptance Criteria**

- **Given** lane up/down controls are used **When** the mutation fires **Then**
  `timeline.lane_order` is updated in frontmatter.

  > **`/goal` translation**: `frontmatter lane_order array reflects new sequence after move
  > verified by validator exits 0`

- **Given** a document is reloaded after lane order mutation **When** the renderer re-renders
  **Then** the lane rail follows the persisted `timeline.lane_order` sequence.

  > **`/goal` translation**: `validator lane order persist/clear/restore test exits 0`

**MoSCoW**: Should  
**Success Metrics**

| Metric                             | Baseline | Target | Timeline |
|------------------------------------|----------|--------|----------|
| Lane state lost on reload          | Unknown  | 0      | v1.0     |
| Lane order deviations after reload | Unknown  | 0      | v1.0     |

---

### Epic E7 — Keyboard Navigation & Accessibility

**Problem**: Timeline interactions are mouse-only, making the renderer inaccessible to keyboard
users and incompatible with power-user shortcut workflows.

#### E7-S1 — Playback and beat-editing hotkeys

**As a** Content Author **I want** keyboard shortcuts for playback and beat editing **so that**
I can operate the timeline without reaching for the mouse.

**Acceptance Criteria**

- **Given** focus is outside a text-entry control **When** `Space`, `Left Arrow`, `Right Arrow`,
  `R`, `D`, or `S` is pressed **Then** the corresponding playback or beat-editing action fires.

  > **`/goal` translation**: `validator playback hotkey test exits 0 for all six keys and no
  > action fires when focus is in text input`

- **Given** focus is inside a beat label, note, summary, or tags editor **When** any hotkey is
  pressed **Then** no timeline action fires (hotkeys suppressed in text-entry controls).

  > **`/goal` translation**: `validator hotkey suppression test exits 0 with focus inside
  > text-entry control`

#### E7-S2 — Active beat metadata hotkeys

**As a** Content Author **I want** keyboard shortcuts `L`, `N`, `M`, `T` to open the
corresponding active-beat editor **so that** metadata editing is keyboard-reachable.

**Acceptance Criteria**

- **Given** focus is outside text-entry **When** `L`, `N`, `M`, or `T` is pressed **Then** the
  corresponding label, note, summary, or tags editor opens without bypassing the frontmatter-backed
  save/cancel flow.

  > **`/goal` translation**: `validator metadata hotkey open test exits 0 for all four keys`

#### E7-S3 — Lane and beat-strip roving tabindex

**As a** Content Author **I want** lanes and the beat strip to support roving tabindex keyboard
navigation **so that** all timeline interactions are reachable without a mouse.

**Acceptance Criteria**

- **Given** the lane rail **When** `Tab` enters it **Then** one tab stop focuses the first lane;
  `Arrow Up`, `Arrow Down`, `Home`, `End` move focus/selection between lanes using roving tabindex.

  > **`/goal` translation**: `validator lane roving tabindex test exits 0 and aria-selected
  > matches focused lane`

- **Given** a lane is selected **When** `[`, `]`, `H`, `U`, or `O` is pressed **Then** the
  corresponding reorder or lane-control action fires and commits to frontmatter.

  > **`/goal` translation**: `validator lane shortcut test exits 0 for all five keys and
  > frontmatter reflects mutation`

- **Given** a lane item is selected **When** `,` or `.` is pressed **Then** the item's
  `params.beat_ref` is updated to the previous or next beat in frontmatter.

  > **`/goal` translation**: `validator item reassignment hotkey test exits 0 and
  > params.beat_ref updated in frontmatter`

- **Given** the beat strip **When** `Tab` enters it **Then** one tab stop focuses the first beat;
  `Arrow Left`, `Arrow Right`, `Home`, `End` move focus between beats.

  > **`/goal` translation**: `validator beat strip roving tabindex test exits 0`

- **Given** selected lane hint chips **When** rendered **Then** they are compact shorthand with
  tooltip-expanded meaning, not multi-line helper labels inflating row height.

  > **`/goal` translation**: `validator hint chip height test exits 0 with no chip exceeding
  > row height`

**MoSCoW**: Should  
**Success Metrics**

| Metric                                    | Baseline | Target     | Timeline |
|-------------------------------------------|----------|------------|----------|
| Timeline interactions keyboard-unreachable| Unknown  | 0          | v1.0     |
| Hotkey suppression failures in text input | Unknown  | 0          | v1.0     |

---

### Epic E8 — Validator Script Coverage

**Problem**: Without a mounted-surface validator, acceptance criteria can only be verified
manually through browser inspection.

#### E8-S1 — Validator script proves all acceptance criteria

**As a** QA Validator **I want** `python3 ./scripts/validate_animatic_timeline_interactions.py`
to verify every runtime interaction **so that** acceptance is deterministic and CI-runnable.

**Acceptance Criteria**

- **Given** the validator script is run against the mounted surface **When** all renderer
  interactions are correctly implemented **Then** the script exits 0 and each named test case
  passes.

  > **`/goal` translation**: `python3 ./scripts/validate_animatic_timeline_interactions.py
  > exits 0 with all named test cases reported as PASS`

- **Given** any acceptance criterion from E1–E7 **When** the validator runs the corresponding
  test case **Then** it proves the criterion by applying
  `window.knowgrphWorkspaceCommand.applyMarkdownDocument(...)` and asserting the resulting DOM and
  frontmatter state.

  > **`/goal` translation**: `all validator test cases reference applyMarkdownDocument and
  > produce deterministic PASS/FAIL output verified by script exit code`

**MoSCoW**: Must  
**Success Metrics**

| Metric                               | Baseline | Target | Timeline |
|--------------------------------------|----------|--------|----------|
| Validator exit 0 on correct renderer | Unknown  | 100%   | v1.0     |
| Manual browser checks required       | Unknown  | 0      | v1.0     |

---
