---
title: "Media & Gaming Development Template"
doc_type: "Template"
version: "1.0.0"
date: "2026-08-06"
lang: "en-US"
frontmatter_contract: "required"
derived_from: "media-gaming-development-guidelines.md@1.0.0"
owner: "[Solo Founder / AI Orchestrator, or named role]"
local_rung: "undocumented"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
media_modalities: "text,audio,image,video"
engine_neutral: "true"
lifecycle_status: "proposed"
---

# Media & Gaming Development Template

## How to Use This Template

- This is the **fillable companion** to `media-gaming-development-guidelines.md`. Every section below corresponds 1:1 to a Guidelines module; where the Guidelines state a directive, this template gives you the blank artifact that directive governs.
- **Instantiate, don't dilute neutrality**: copy this file per product/feature (e.g. `[product]-[feature]-gdd-game-tad.md`), fill every `[...]` placeholder, and delete any modality block (Text/Audio/Image/Video) or section that is genuinely out of scope for the instance — do not leave placeholders unresolved into a delivery lane.
- **A GDD is a PRD; a Game-TAD is a TAD.** If this instance is non-interactive media only (no game loop), skip the Game Loop sections and keep the Media Generation Flow and Asset Pipeline sections.
- Every acceptance criterion below must resolve to a **VCC** (`Verify [outcome] by [stated check] with [constraint]`) — a criterion with no stated check does not count.
- Track **local rung** vs **delivered rung** separately per section, per the shared Readiness Ladder (`undocumented < spec-complete < dev-proven < runtime-ready < production-verified`).
- Zero `blocker` findings (see Conformance Findings Log) is a hard gate before advancing phases.

## Module Index

- `phase-0-discovery--validation`
- `phase-1-gdd--media-prd`
- `phase-2-game-tad--media-tad`
- `media-modality-harness-contract`
- `generation-provenance-record`
- `rich-media-asset-pipeline`
- `game-loop-flow`
- `media-generation-flow`
- `performance--delivery-budget`
- `generation-economics`
- `readiness-ladder-tracker`
- `validation-checklist`
- `conformance-findings-log`
- `roleactionoutcome-assignment`
- `sign-off--version-history`

---

## Phase 0 — Discovery & Validation

| Item | Entry |
|---|---|
| Player fantasy / content premise | [One sentence] |
| Rights feasibility (real-world IP, likeness, licensed assets) | [Cleared / Unresolved / Blocked — named human + date] |
| Time-to-first-fun (TTV ceiling) | [N minutes/seconds from cold start to core loop] |
| Modalities in scope | [ ] Text  [ ] Audio  [ ] Image  [ ] Video  [ ] Interactive/Game loop |
| Target platform reach | [ ] Browser  [ ] Mobile-first  [ ] Offline-first |
| Go / No-go | [Decision + rationale] |

---

## Phase 1 — GDD / Media PRD

> Skip the Core Loop / Progression subsections entirely for non-interactive media-only instances; keep Player/Audience, Stories, Acceptance Criteria, Success Metrics.

### Player Fantasy
[What the player/audience gets to feel or become; one sentence]

### Player / Audience Personas
[Archetypes and their jobs-to-be-done]

### Core Loop *(games only)*
```
[Action] → [Feedback] → [Reward] → [Re-engagement trigger] → [Action]
```

### Progression *(games only)*
[What changes for the player across a session and across the product's lifetime]

### User Stories
**As a** [persona] **I want** [capability] **So that** [the fantasy or feedback it delivers]

### Acceptance Criteria
**Given** [state] **When** [action] **Then** [observable outcome]

> **VCC translation**: `Verify [outcome] by [stated check] with [constraint]`

### Success Metrics
| Metric | Baseline | Target | Timeline |
|---|---|---|---|
| Time-to-first-fun / Time-to-first-asset | | | |
| Session length *(games)* | | | |
| D1 / D7 retention *(if applicable)* | | | |
| Readiness rung (local / delivered) | | | |
| Token + compute cost / month | | | |
| ROI Score | | | |

### MoSCoW Priority
| Must | Should | Could | Won't |
|---|---|---|---|
| | | | |

### Min-Viable Scope
[The smallest playable/deliverable loop that proves the fantasy or premise]

### Out of Scope
[Explicitly excluded systems, modes, modalities, or platforms]

### Dependencies
[Required engines, harnesses, asset pipelines, or platform services]

### Open Questions
[Unresolved design uncertainties requiring playtesting or user testing]

---

## Phase 2 — Game-TAD / Media-TAD

> Skip the Game Loop Architecture / Entity Model / Performance Budget Table subsections for non-interactive media-only instances.

### Game Loop Architecture *(games only)*
```
[Input] → [Update: fixed or variable timestep] → [Simulate: physics/AI/state] → [Render] → [Present] → (next tick)
```

| Field | Entry |
|---|---|
| Timestep model | [ ] Fixed  [ ] Variable |
| Tick rate | [N Hz] |
| Frame budget | [N ms @ target FPS] |
| Circuit-breaker | [Degrade action: frame skip / dynamic resolution / simulation catch-up cap] |

### Entity Model *(games only)*
[Name the entity/component/system pattern in use, by function not brand]

### Component Specifications — AI-driven systems *(procedural gen, dynamic dialogue, adaptive difficulty)*
| Component | Harness Contract ref | Generation-call bound | Determinism requirement |
|---|---|---|---|
| | | | |

### Performance Budget Table *(games only — see also Performance & Delivery Budget below)*
| Attribute | Scenario | Pattern | Validation |
|---|---|---|---|
| Frame budget | | | |
| Draw calls | | | |
| Memory | | | |
| Load time | | | |
| Input latency | | | |
| Offline behaviour | | | |

---

## Media Modality Harness Contract

> One block per modality in scope. Delete unused modality rows.

```
Caller → [Harness: schema-validated input] → [Generator: model] → [Harness: schema-validated output + safety check + provenance stamp + cost log] → Consumer
```

**Extended cost log** (per call): `{ model, prompt_tokens, completion_tokens, cache_hits, estimated_cost_usd, modality, generation_seed, safety_check_result, provenance_id }`

| Modality | In scope? | Additional output fields | Modality-specific validation | Fallback path |
|---|---|---|---|---|
| Text | [Y/N] | `word_count`, `reading_level`, `locale` | | |
| Audio | [Y/N] | `duration_seconds`, `sample_rate`, `loudness_lufs` | | |
| Image | [Y/N] | `resolution`, `aspect_ratio`, `format`, `alpha_channel` | | |
| Video | [Y/N] | `resolution`, `fps`, `duration_seconds`, `codec` | | |

**Fidelity target for current rung**: [placeholder / draft / production] — must match the Readiness Ladder rung this instance is claiming (Modality-Appropriate Fidelity).

---

## Generation Provenance Record

> One row per asset, or one row per asset class if pipeline-generated at volume. This is the rights gate — `unresolved` blocks promotion past the mirror lane.

| Asset ID / class | `source` | `generator_identity` | `input_reference` | `license_terms` | `usage_scope` | `human_review_status` | `safety_check_result` |
|---|---|---|---|---|---|---|---|
| | [generated/captured/licensed/owned/derivative] | | [hash/pointer, never verbatim if rights-sensitive] | [named license / `unresolved`] | | [unreviewed/reviewed-pass/reviewed-flagged] | |

---

## Rich Media Asset Pipeline

> One instance per modality/pipeline. Copy the block per pipeline; map each to a Data Flow entry in this document's own Phase 2.

```
Source → [Ingest / Generate] → [Validate: schema + safety + provenance] → [Optimize] → [Store] → [Serve] → Consumer
```

### Asset Pipeline: [Modality] — [Name]

| Stage | Component | Input | Output | Rights gate | Persistence | Error handling |
|---|---|---|---|---|---|---|
| Ingest/Generate | | | | n/a | | |
| Validate | | | Pass/fail + Provenance Record | Blocks on `unresolved` | | |
| Optimize | | | | Carries forward | | |
| Store | | | | Carries forward | | |
| Serve | | | | Carries forward | | |

**Optimize-stage transform**: [locale/reading-level pass · loudness+bitrate · resize/format/alpha · transcode+ladder+thumbnail]
**Delivery format default**: [ ]

---

## Game Loop Flow *(games only)*

```
Input → [Update: fixed/variable timestep] → [Simulate: physics/AI/state] → [Render] → [Present] ↘ [Circuit-breaker: budget check]
```

## Game Loop Flow: [System Name]

**Timestep model**: [Fixed | Variable] | **Tick rate**: [N Hz]
**Frame budget**: [N ms] @ [target FPS] | **Circuit-breaker**: [degrade action]

| Stage | Component | Reads | Writes | Budget share | Fallback on overrun |
|---|---|---|---|---|---|
| Input | | | | | |
| Update | | | | | |
| Simulate | | | | | |
| Render | | | | | |
| Present | | | | | |

**Happy path**: [state the nominal per-tick sequence]
**Alternate paths**: [pause, slow-motion/time-scale, etc.]
**Error paths**: [stage overrun → stated circuit-breaker; 3 consecutive overruns → degrade tier]
**Postconditions**: [one committed frame per tick, or an explicit degrade action recorded]

---

## Media Generation Flow

```
Trigger → [Harness: validate prompt/input] → [Generator: model call] → [Harness: validate output + safety check] → [Provenance: stamp record] → [Optimizer: transcode/compress] → [Store] → Consumer
```

## Media Generation Flow: [Pipeline Name]

**Modality**: [Text | Audio | Image | Video] | **Generation-call bound**: [N per session/request]
**Token/compute budget**: [est. cost/call] | **Cache reuse target**: [%]

| Role | Component | Input | Output | Cost log | Provenance stamped | Fallback |
|---|---|---|---|---|---|---|
| Dispatcher | | | | — | — | [Reject with typed error] |
| Generator | | | | ✓ required | — | [Cached asset / degraded mode] |
| Validator | | | | — | — | [Reject, no promotion] |
| Provenance stamper | | | | — | ✓ required | [Block promotion until stamped] |
| Optimizer | | | | — | Carries forward | [Fallback format] |

**Happy path / Alternate paths / Error paths / Postconditions**: [as guideline template — cache hit bypasses Generator; invalid input/output blocks before spend/promotion; bound exhaustion falls back, never stalls]

---

## Performance & Delivery Budget

| Dimension | Browser-based ceiling | Mobile-first ceiling | Offline-first requirement | Validation method |
|---|---|---|---|---|
| Frame budget | | | n/a | |
| Initial load payload | | | | |
| Per-image asset | | | | |
| Per-audio asset | | | | |
| Per-video asset | | | | |
| Memory | | | n/a | |
| Cold-start TTV | | | | |

---

## Generation Economics

```
Cost per Asset = (generation calls to reach an accepted result) × (price per call)
Effective Cost per Asset = Cost per Asset × (1 − cache hit rate)
Monthly Generation Budget = Σ (Effective Cost per Asset × expected asset volume) across all pipelines
```

## Generation Economics: [Product / Feature]

| Modality | Avg calls/accepted asset | Price/call | Cache hit target | Effective cost/asset | Monthly volume | Monthly budget |
|---|---|---|---|---|---|---|
| Text | | | | | | |
| Audio | | | | | | |
| Image | | | | | | |
| Video | | | | | | |

**Rolled into overall product token/compute budget?** [Y/N + link/reference]

---

## Readiness Ladder Tracker

`undocumented < spec-complete < dev-proven < runtime-ready < production-verified`

| Tier | Definition | Minimum rung to exit | Current local rung | Current delivered rung | Evidence Reference |
|---|---|---|---|---|---|
| Must: Prototype-playable / Draft-deliverable | Core loop or premise runs end-to-end with placeholder/draft assets; no generated asset ships without a Provenance Record | `runtime-ready` | | | |
| Follow-on: Content-complete | Production-fidelity assets replace placeholders; every asset `reviewed-pass` | `runtime-ready` per track | | | |
| Follow-on: Live-ops ready *(games)* | Bounded, versioned post-launch releases with no regression | `runtime-ready` / `production-verified` per increment | | | |

---

## Validation Checklist

**Pre-Production**
- [ ] GDD/Media PRD authored with core loop (or premise) and success metrics stated before TAD/Game-TAD design begins
- [ ] Every acceptance criterion expressed as a VCC
- [ ] Game-TAD states timestep model, tick rate, and frame budget before Component Specification references simulation *(games)*
- [ ] Every AI-driven system states a generation-call bound and a determinism requirement
- [ ] Every pipeline in scope has a Media Generation Flow or Rich Media Asset Pipeline documented, with a stated cache hit target
- [ ] Performance & Delivery Budget populated with numeric ceilings for every applicable row
- [ ] Generation Economics populated per modality; rolled into overall budget

**Pre-Launch / Playtest Gate**
- [ ] Frame budget holds for a stated percentile of frames during scripted playtest, on target device class *(games)*
- [ ] Every shipped asset carries a complete Provenance Record with `human_review_status: reviewed-pass`
- [ ] No `license_terms: unresolved` asset present in the delivery-lane build
- [ ] Cold-start TTV walked through on a clean environment, online and airplane mode
- [ ] Offline behaviour validated per capability
- [ ] Asset ladder present; Serve confirmed to select the smallest rung meeting the delivery budget
- [ ] Zero `blocker` findings (this set + authoring set alignment check)

**Live-Ops / Post-Launch Gate**
- [ ] Each content release cycle carries a stated max-iteration bound and circuit-breaker
- [ ] Readiness rungs re-derived for any asset/system touched by the release
- [ ] Generation economics actuals tracked against estimates
- [ ] Provenance Records re-verified for any asset whose source license changed
- [ ] Finding set compared against prior release; any new `blocker` treated as a regression

---

## Conformance Findings Log

> Reference enumeration (do not redefine): `missing-provenance-record` (major) · `unlicensed-asset-use` (blocker) · `unresolved-generation-rights` (major) · `missing-cost-log-media` (major) · `unsafe-generation-output` (blocker) · `unbounded-game-loop` (blocker) · `undeclared-determinism` (minor) · `frame-budget-breach` (major) · `unbounded-asset-payload` (blocker) · `missing-offline-fallback` (major) · `orphaned-game-loop-flow` (major) · `orphaned-media-generation-flow` (major) · `missing-generation-economics` (major)

| ID | Finding Type | Severity | Location | Description | Status |
|---|---|---|---|---|---|
| | | | | | |

---

## Role—Action—Outcome Assignment

| Role | Assigned to | Notes |
|---|---|---|
| Game Designer / Content Lead | | |
| Narrative / Content Writer | | |
| Audio Designer / Composer | | |
| Technical Artist | | |
| Gameplay Engineer | | |
| Solo Founder / AI Orchestrator | | |
| Evaluator *(mechanism, not a person)* | | |

---

## Sign-off & Version History

| Version | Date | Author | Change | Rung at time of change |
|---|---|---|---|---|
| 1.0.0 | | | Initial instantiation | `undocumented` |

**Mantra**: Fidelity matches the rung it serves · Provenance ships with every asset, never after it · Every loop — game or generation — is bounded and breaks its own circuit · Budgets make delivery honest before launch, not after complaints · Evidence still earns the rung, even when the artifact is a frame or a sound
