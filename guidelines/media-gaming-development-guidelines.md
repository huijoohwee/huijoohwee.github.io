---
title: "Media & Gaming Development Guidelines"
doc_type: "Guidelines"
version: "1.0.0"
date: "2026-08-06"
lang: "en-US"
frontmatter_contract: "required"
owner: "Media & Game Systems function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
media_modalities: "text,audio,image,video"
engine_neutral: "true"
lifecycle_status: "proposed"
---

# Media & Gaming Development Guidelines

## Scope & Neutrality Contract

- **Universal**: these guidelines apply to any product, domain, modality mix, engine, runtime, or team size; nothing here assumes a specific studio, repository, file path, model, engine, or vendor.
- **Neutral**: name generators, engines, and pipelines by their function, never by a brand. A concrete tool appears only under a heading or block whose own text contains the words "reference implementation", and may be swapped for any equivalent.
- **Agnosticity**: every rule is evaluated from document content and parsed frontmatter only — never from file names, directory layout, or downstream mirrors. Examples use placeholders (`[...]`) rather than real identifiers.
- **Modular**: each `##` section is self-contained and addressable by its heading anchor (see Module Index). Sections may be lifted into another guideline set without rewriting their internals.
- **Enforceable**: every rule is written so a conformance check can record a typed finding against it (see Conformance Findings). A statement that cannot be violated observably is guidance, not a rule, and is labelled as such.
- **Complementary**: this set owns the **rich-media and gaming domain layer** — modality harness contracts, generation provenance, asset pipelines, the Game Design Document and Game Technical Architecture specializations, game-loop and media-generation flow patterns, and performance/delivery budgets for interactive and generative media. It does not restate authoring or execution; it names its companions and consumes them.

## Module Index

- `scope--neutrality-contract` — universality, neutrality, agnosticity, modularity, enforceability, complementarity rules
- `module-index` — this index
- `boundary-with-the-companion-sets` — what this set owns, what it consumes, and where each seam sits
- `overview` — what this set adds, and the lenses layered onto the Solo-Dev AI-Native Orientation
- `media-modality-harness-contracts` — text, audio, image, and video generation harnesses, extending the AI-Native Harness Pattern
- `generation-provenance--rights-ledger` — the Provenance Record primitive and rights-gate rule
- `rich-media-asset-pipelines` — the generic ingest→validate→optimize→store→serve pipeline, parameterized per modality
- `game-design-document-gdd` — the PRD specialization for games
- `game-technical-architecture-game-tad` — the TAD specialization for games: game loop, entity model, performance budgets
- `game-loop-flow` — a sixth canonical flow: input→update→simulate→render→present
- `media-generation-flow` — a seventh canonical flow: prompt→generate→validate→provenance-stamp→optimize→serve
- `performance--delivery-budgets` — frame, load, payload, memory, and offline budgets for browser- and mobile-first delivery
- `generation-economics` — per-asset generation cost, caching, and regeneration budget
- `from-0-to-1-rich-media--game-creation-process` — how Phases 0–4 specialize for media and games
- `readiness-ladder-for-rich-media--games` — reused ladder, plus the Playable/Publishable tiering
- `conformance-findings` — new Finding Type rows added to the shared enumeration
- `anti-pattern-guards` — prohibited media/game patterns and their corrections
- `validation-checklist` — pre-production, pre-launch, and live-ops gates
- `roleactionoutcome` — role-to-deliverable mapping for media and game roles
- `mantra-application` — the framing mantra

## Boundary with the Companion Sets

Three sets meet at two seams. **Authoring** (what a PRD, TAD, or ADR must contain, the Readiness Ladder, the Rule ID scheme) is owned by the **PRD, TAD & ADR Guidelines** companion set. **Execution** (task decomposition, agent roles, tool blast radius, per-task budgets, run state) is owned by the **Agentic SDLC Guidelines** companion set. This set does not restate either; it specializes the first for rich-media and game content, and consumes the second unchanged for anything that runs as a task.

| Concern | Owner | This set's relationship |
|---|---|---|
| PRD/TAD/ADR structure, phase gates, Rule ID scheme, Readiness Ladder derivation | Authoring set | Specializes: GDD *is* a PRD, Game-TAD *is* a TAD, carrying the same required fields plus domain fields |
| Finding recording contract, severities, determinism, deduplication | Authoring set | Reuses unchanged; adds Finding Type rows only |
| VCC primitive and Evidence Reference shape | Authoring set | Reuses unchanged; adds the Generation VCC pattern (a VCC whose check includes a content-safety result and a provenance completeness check) |
| Lane topology and Deploy Boundary | Authoring set | Obeys; a generated asset is not promoted to the delivery lane until its Provenance Record and rights gate pass, in addition to the existing boundary evidence |
| Agent roles, tool permissions, per-task budgets, checkpointing | Execution set | Consumes unchanged for any task that generates, validates, or optimizes an asset |
| Token, iteration, wall-clock, context bounds per task | Execution set | Consumes unchanged; this set adds a fifth per-asset bound (**generation-call bound**) scoped to media tasks only |
| Media modality harness contracts, generation provenance, asset pipelines | **This set** | Owns |
| Game Design Document and Game Technical Architecture templates | **This set** | Owns, as PRD/TAD specializations |
| Game Loop Flow and Media Generation Flow | **This set** | Owns, as additions to the five canonical flow patterns |
| Performance and delivery budgets for interactive/generative media | **This set** | Owns |

**Directives**:
- Author a GDD or a Media PRD as a PRD; author a Game-TAD or Media-TAD as a TAD. Forbid inventing a third document type outside the authoring set's Rule ID scheme and frontmatter contract
- Treat every generation task as a task under the execution set's Task Model; forbid a parallel task vocabulary for media work
- Name the companion set wherever a rule crosses a seam; forbid a media or game rule that silently assumes an authoring or execution rule the reader has not been pointed at
- Extend the Conformance Findings enumeration rather than redefining a type either companion set owns

## Overview

**Rich-media and gaming development**: the from-0-to-1 practice of specifying, generating or capturing, validating, and delivering text, audio, image, and video content — including the interactive real-time case of games — inside a solo-dev, AI-native, zero-infra stack.

**Solo-dev AI-native orientation carries forward unchanged.** The four compounding lenses (min-viable-max-value, TCO-zero, token economics, harness-first) apply to every media and game decision exactly as they apply elsewhere. Three additional lenses layer on top, specific to this domain:

| Lens | Definition | Applied in |
|---|---|---|
| **Modality-Appropriate Fidelity** | Generate or capture at the resolution, duration, bitrate, or word count the current Readiness rung actually needs — not the maximum the generator can produce | Media Modality Harness Contracts, Performance & Delivery Budgets |
| **Provenance-by-Default** | Every asset that ships carries a Provenance Record before it is eligible for promotion; an asset with no record is a rights-unknown asset, not a cleared one | Generation Provenance & Rights Ledger |
| **Loop-Bounded Simulation** | A game loop and a generation loop are both loops; both carry a max-iteration or max-tick bound and a circuit-breaker, exactly as the execution set requires of any agentic loop | Game Loop Flow, Media Generation Flow |

**On rights and licensing**: this set states process rules — what record to keep, what gate to pass — and is not legal advice on copyright, trademark, or right-of-publicity in any jurisdiction. The legal status of AI-generated output varies by jurisdiction and is unsettled in several; treat every generated asset as rights-unresolved until a named human reviewer records a disposition, and consult qualified counsel for anything shipping under a paid license or into a regulated market.

## Media Modality Harness Contracts

Every generative call — text, audio, image, or video — conforms to the same harness contract the companion Authoring set defines, with an extended cost log and two additional required fields: a **safety check result** and a **provenance stamp**.

```
Caller → [Harness: schema-validated input] → [Generator: model] → [Harness: schema-validated output + safety check + provenance stamp + cost log] → Consumer
```

**Extended cost log** (superset of the base harness cost log):
```
{ model, prompt_tokens, completion_tokens, cache_hits, estimated_cost_usd,
  modality, generation_seed, safety_check_result, provenance_id }
```

| Modality | Additional output fields | Modality-specific validation |
|---|---|---|
| **Text** | `word_count`, `reading_level`, `locale` | Schema + profanity/safety filter appropriate to target audience; locale match |
| **Audio** | `duration_seconds`, `sample_rate`, `loudness_lufs` | Loudness-normalized to a stated target; duration within the requested bound |
| **Image** | `resolution`, `aspect_ratio`, `format`, `alpha_channel` | Resolution and aspect ratio match the requested slot; format matches the delivery pipeline |
| **Video** | `resolution`, `fps`, `duration_seconds`, `codec` | Frame rate and duration within bound; codec matches the delivery pipeline |

**Directives**:
- Validate input schema before token or compute spend on every modality; reject malformed prompts without calling the model
- Validate output schema and run the safety check after every response; surface structured errors, not raw generator failures
- Emit the extended cost log per call, including `safety_check_result` and `provenance_id`; a media call with no `provenance_id` in its cost log is a `missing-cost-log-media` finding
- Define a fallback path per modality: a cached prior asset, a lower-fidelity placeholder, or upstream error propagation; forbid a media harness with no fallback
- Generate at the fidelity the current Readiness rung requires (Modality-Appropriate Fidelity); regenerating at production fidelity during `spec-complete` or `dev-proven` work is a token/compute cost with no rung benefit

## Generation Provenance & Rights Ledger

**Defines the Provenance Record**: the artifact-bearing output every generated, captured, or licensed asset must carry before it is eligible for promotion past the authoring lane.

| Field | Value domain | Purpose |
|---|---|---|
| `source` | `generated` \| `captured` \| `licensed` \| `owned` \| `derivative` | Declares how the asset came to exist |
| `generator_identity` | Model/tool name + version, or `n/a` | Names what produced it, for reproducibility and audit |
| `input_reference` | Hash or pointer to the prompt/seed, never the verbatim prompt when rights-sensitive | Enables regeneration without storing sensitive or copyrighted input text |
| `license_terms` | Named license or `unresolved` | States what the asset may be used for |
| `usage_scope` | Product, region, or medium the license covers, or `unrestricted` | Bounds where the asset may ship |
| `human_review_status` | `unreviewed` \| `reviewed-pass` \| `reviewed-flagged` | Records whether a named human looked at it |
| `safety_check_result` | Pass/fail plus check name | Links back to the harness cost log entry that produced it |

**Directives**:
- Attach a Provenance Record to every asset before it enters the mirror lane; an asset with no record is `missing-provenance-record`
- Forbid promoting an asset whose `license_terms` reads `unresolved` past the mirror lane; a promoted unresolved asset is `unlicensed-asset-use` at `blocker` severity
- Forbid storing the verbatim generation prompt in the Provenance Record when the prompt itself risks reproducing copyrighted material; store a hash or a paraphrased reference instead
- Require `human_review_status` to read `reviewed-pass` before `production-verified` is reachable for any asset carrying `source: generated`; a `production-verified` claim over an `unreviewed` generated asset is `unresolved-generation-rights`
- Treat the Provenance Record as the rights gate at every Deploy Boundary in addition to the boundary's own four required parts; the boundary's Evidence Reference for a media-bearing promotion includes the Provenance Record check
- Re-verify `license_terms` whenever a licensed asset's source license changes; a stale license record is `stale-evidence` under the shared enumeration

## Rich Media Asset Pipelines

One generic pipeline, parameterized per modality, rather than four divergent ones — practicing Min-Viable-Max-Value on the guideline set itself.

```
Source → [Ingest / Generate] → [Validate: schema + safety + provenance] → [Optimize] → [Store] → [Serve] → Consumer
```

**Rich Media Pipeline Template**:
```markdown
## Asset Pipeline: [Modality] — [Name]

| Stage    | Component     | Input           | Output          | Rights gate                | Persistence        | Error handling     |
|----------|---------------|-----------------|------------------|-----------------------------|---------------------|----------------------|
| Ingest/Generate | [Harness]  | [Prompt/source] | [Raw asset]      | n/a                          | [Temp / none]       | [Retry / fallback]  |
| Validate | [Validator]   | [Raw asset]      | [Pass/fail + Provenance Record] | Blocks on `unresolved` | [None]               | [Reject / flag]     |
| Optimize | [Transcoder]  | [Raw asset]      | [Delivery-format asset] | Carries forward             | [Cache]              | [Fallback format]   |
| Store    | [Storage]     | [Optimized asset]| [Addressable asset] | Carries forward             | [Local-first cache / edge] | [Retry / alert]     |
| Serve    | [Delivery]    | [Query]          | [Streamed/lazy asset] | Carries forward             | [CDN / offline cache]| [Degraded quality / 503] |
```

**Modality-specific optimize-stage parameters**:

| Modality | Optimize-stage transform | Delivery format default |
|---|---|---|
| Text | Locale variants, reading-level pass | Structured markup, no binary asset |
| Audio | Loudness normalization, bitrate reduction | Compressed streaming codec |
| Image | Resize, format conversion, alpha strip if unneeded | Progressive/responsive format with multiple resolutions |
| Video | Transcode, resolution ladder, thumbnail extraction | Adaptive-bitrate segments |

**Directives**:
- Run the Validate stage before Optimize; forbid optimizing an asset that has not passed schema, safety, and provenance checks
- Carry the Provenance Record forward through every downstream stage unchanged; a pipeline that drops provenance mid-stream produces an unrecoverable `missing-provenance-record`
- Cache local-first by default; treat CDN or edge storage as an accelerator over the local-first cache, not a replacement for it
- Generate a resolution/bitrate ladder at the Optimize stage for image, audio, and video, so Serve can select the smallest asset that meets the current delivery budget (see Performance & Delivery Budgets)
- Map every pipeline to a Data Flow entry in the owning TAD or Game-TAD; forbid an asset pipeline with no upstream journey or loop anchor

## Game Design Document (GDD)

**A GDD is a PRD.** It carries every baseline and conformance frontmatter key the authoring set requires, plus the fields below in place of a generic feature narrative.

**GDD Template**:
```markdown
## Game Design: [Working Title]

### Player Fantasy
[What the player gets to feel or become; one sentence]

### Player Personas
[Player archetypes and their jobs-to-be-done, same shape as PRD Personas]

### Core Loop
```
[Action] → [Feedback] → [Reward] → [Re-engagement trigger] → [Action]
```

### Progression
[What changes for the player across a session and across the product's lifetime; systems that gate content]

### User Stories
**As a** [player persona] **I want** [capability] **So that** [the fantasy or feedback it delivers]

### Acceptance Criteria
**Given** [game state] **When** [player action] **Then** [observable outcome]

> **VCC translation**: `Verify [outcome] by [stated check] with [constraint]`
> Example: `frame budget stays under 16.6ms for 95% of frames during [scripted playtest sequence]`

### Success Metrics
| Metric | Baseline | Target | Timeline |
|---|---|---|---|
| Time-to-first-fun (TTV to core loop) | | | |
| Session length | | | |
| D1 / D7 retention (if applicable) | | | |
| Readiness rung (local / delivered) | | | |
| Token + compute cost / month | | | |
| ROI Score | | | |

### MoSCoW Priority
[Must / Should / Could / Won't, with ROI score and rationale]

### Min-Viable Scope
[The smallest playable loop that proves the player fantasy; excludes all Could/Won't systems]

### Out of Scope
[Explicitly excluded systems, modes, or platforms]

### Dependencies
[Required engines, harnesses, asset pipelines, or platform services]

### Open Questions
[Unresolved design uncertainties requiring playtesting]
```

**Directives**:
- Define the core loop before writing any user story; every story anchors to a stage of the core loop, exactly as a PRD story anchors to a user journey stage
- Express every acceptance criterion as a VCC per the authoring set's Autonomous Implementation Verification section; a criterion phrased as "feels fun" with no stated check is not a VCC
- State time-to-first-fun as the Time-to-Value metric for this document; forbid a GDD with no TTV entry
- Forbid business-logic-free narrative substituting for a stated core loop; "explore an open world" is a fantasy statement, not a loop

## Game Technical Architecture (Game-TAD)

**A Game-TAD is a TAD.** It carries every TAD section unchanged, plus the game loop, entity model, and performance budget sections below.

### Game Loop Architecture

```
[Input] → [Update: fixed or variable timestep] → [Simulate: physics/AI/state] → [Render] → [Present] → (next tick)
```

| Field | Definition |
|---|---|
| **Timestep model** | `fixed` (deterministic simulation, decoupled render) or `variable` (simpler, less deterministic) |
| **Tick rate** | Simulation updates per second |
| **Frame budget** | Milliseconds available per frame at the target frame rate (see Performance & Delivery Budgets) |
| **Circuit-breaker** | The degrade action taken when a frame or tick exceeds budget: frame skip, dynamic resolution, simulation catch-up cap |

### Entity Model

Name the entity/component/system pattern in use by function, not by a specific engine's API: **entities** (identity only), **components** (typed data), **systems** (behavior operating over components). Document the pattern once per Game-TAD; forbid mixing an undocumented ad-hoc object-inheritance model with a documented component model in the same codebase without an ADR explaining the boundary.

### Component Specifications (game-specific extension)

In addition to the base TAD Component Specification fields, an AI-driven game system (procedural generation, dynamic dialogue, adaptive difficulty) states:
- **Harness Contract**: per Media Modality Harness Contracts, including the extended cost log
- **Generation-call bound**: the maximum generation calls per session or per tick; exhaustion transitions to a cached or scripted fallback, never a stall
- **Determinism requirement**: whether this system's output must be reproducible from a stored seed for replay, save-state, or regression testing

### Performance Budget Table

| Attribute | Scenario | Pattern | Validation |
|---|---|---|---|
| Frame budget | [Target FPS → ms/frame] | Fixed timestep + render decoupling | Frame-time profiling under scripted load |
| Draw calls | [Scene complexity → max draw calls] | Batching, instancing, LOD | GPU profiler pass |
| Memory | [Target device → max resident memory] | Asset streaming, pooling | Memory profiler under sustained play |
| Load time | [Cold start → TTV ceiling] | Progressive/streamed asset loading | Timed cold-start test |
| Input latency | [Input → visible response] | Input polling decoupled from render | Latency capture on target device class |
| Offline behaviour | [Connectivity loss → which systems degrade] | Local-first save state, deferred sync | Airplane-mode pass |

**Directives**:
- State the timestep model and tick rate before any Component Specification references simulation; a Game-TAD with no stated timestep model is `spec-complete` at best, never `dev-proven`
- Every game loop states a frame budget and a circuit-breaker action, exactly as every agentic loop states a max-iteration bound and a circuit-breaker condition; an unstated circuit-breaker is `unbounded-game-loop` at `blocker` severity
- State a generation-call bound for every AI-driven game system; an unbounded in-loop generation call is both `unbounded-game-loop` and `unbounded-loop` under the shared economics enumeration
- Declare determinism requirements explicitly; forbid assuming determinism for a system with no stated seed and no recorded check

## Game Loop Flow

A sixth canonical flow pattern, alongside the authoring set's five, distinct from Workflow (task-actor sequencing) and Orchestration/Harness Flow (AI call routing): Game Loop Flow traces the *per-tick* control path of an interactive real-time system.

```
Input → [Update: fixed/variable timestep] → [Simulate: physics/AI/state] → [Render] → [Present] ↘ [Circuit-breaker: budget check]
```

**Game Loop Flow Template**:
```markdown
## Game Loop Flow: [System Name]

**Timestep model**: [Fixed | Variable] | **Tick rate**: [N Hz]
**Frame budget**: [N ms] @ [target FPS] | **Circuit-breaker**: [degrade action]

| Stage | Component | Reads | Writes | Budget share | Fallback on overrun |
|---|---|---|---|---|---|
| Input | [Handler] | [Device state] | [Input buffer] | [N ms] | [Drop to last known state] |
| Update | [Simulation] | [Input buffer, prior state] | [New state] | [N ms] | [Catch-up cap] |
| Simulate | [Physics/AI] | [State] | [State deltas] | [N ms] | [Reduced fidelity pass] |
| Render | [Renderer] | [State] | [Frame buffer] | [N ms] | [Dynamic resolution / LOD drop] |
| Present | [Compositor] | [Frame buffer] | [Display] | [N ms] | [Frame skip] |
```

**Happy path**: Input captured → Update advances simulation by one tick → Simulate resolves physics/AI → Render produces a frame → Present displays it → repeat.

**Alternate paths**: paused state suspends Update/Simulate while Input and Present continue; slow-motion or time-scale states alter tick rate without changing the loop structure.

**Error paths**: a stage exceeding its budget share invokes the stated circuit-breaker; three consecutive overruns escalate to a lower fidelity profile rather than continuing to drop frames silently.

**Postconditions**: one committed frame presented per tick, or an explicit degrade action recorded; no unbounded tick backlog.

**Directives**:
- Document a Game Loop Flow for every real-time interactive system before implementation; forbid shipping a render loop with no stated frame budget
- State a budget share per stage; forbid a single monolithic "render" budget with no per-stage accounting when the loop has more than three stages
- Map every Game Loop Flow to its parent Game-TAD's Game Loop Architecture section; forbid an undocumented loop
- Render with `sequenceDiagram` or `flowchart LR` per the shared diagram standards; use a subgraph to bound the per-tick cycle

## Media Generation Flow

A seventh canonical flow pattern, distinct from Game Loop Flow (per-tick interactive) and Orchestration/Harness Flow (generic AI call routing): Media Generation Flow is the *specific* control path for producing a rights-cleared, delivery-ready asset.

```
Trigger → [Harness: validate prompt/input] → [Generator: model call] → [Harness: validate output + safety check] → [Provenance: stamp record] → [Optimizer: transcode/compress] → [Store] → Consumer
```

**Media Generation Flow Template**:
```markdown
## Media Generation Flow: [Pipeline Name]

**Modality**: [Text | Audio | Image | Video] | **Generation-call bound**: [N per session/request]
**Token/compute budget**: [est. cost/call] | **Cache reuse target**: [%]

| Role | Component | Input | Output | Cost log | Provenance stamped | Fallback |
|---|---|---|---|---|---|---|
| Dispatcher | [Component] | [Typed prompt] | [Routed request] | — | — | [Reject with typed error] |
| Generator | [Harness + model] | [Typed prompt] | [Raw asset] | ✓ required | — | [Cached asset / degraded mode] |
| Validator | [Harness] | [Raw asset] | [Pass/fail] | — | — | [Reject, no promotion] |
| Provenance stamper | [Ledger writer] | [Pass result] | [Provenance Record] | — | ✓ required | [Block promotion until stamped] |
| Optimizer | [Transcoder] | [Raw + record] | [Delivery asset] | — | Carries forward | [Fallback format] |
```

**Happy path**: Trigger fires → input validated → Generator produces a raw asset → output validated and safety-checked → Provenance Record stamped → Optimizer produces the delivery asset → Consumer receives a rights-cleared, delivery-ready asset.

**Alternate paths**: a cache hit on an equivalent prior request bypasses Generator entirely and reuses its Provenance Record unchanged.

**Error paths**: input invalid → Dispatcher rejects before spend; output invalid or safety check fails → no Provenance Record is stamped and the asset does not promote; generation-call bound exhausted → fallback to cached or placeholder asset, never a stall.

**Postconditions**: a delivery-ready asset with a complete Provenance Record persisted, or a typed rejection with no partial promotion.

**Directives**:
- Document a Media Generation Flow for every asset-producing pipeline before implementation; forbid an AI media pipeline documented only as a generic Orchestration/Harness Flow once a Provenance Record is required
- Forbid promotion from Optimizer to Store without a stamped Provenance Record; an unstamped asset reaching Store is `missing-provenance-record`
- State the generation-call bound and the cache reuse target; an unstated bound on a Generator role is `unbounded-loop` under the shared economics enumeration
- Prefer cache-hit reuse over regeneration whenever an equivalent prior request exists at the required fidelity, per Modality-Appropriate Fidelity

## Performance & Delivery Budgets

Rich media and games inherit the authoring set's Quality Attributes and Device Reach obligations; this section states the concrete ceilings.

| Dimension | Browser-based ceiling | Mobile-first ceiling | Offline-first requirement | Validation method |
|---|---|---|---|---|
| Frame budget | ≤16.6ms (60fps) or stated degrade tier | ≤16.6ms or explicit 30fps tier | n/a (local compute) | Frame-time profiling |
| Initial load payload | Stated ceiling per target persona's TTV | Lower ceiling than desktop, cellular-aware | Cached after first load | Timed cold-start test on clean environment |
| Per-image asset | Stated ceiling per delivery slot, resolution-laddered | Smallest rung in the ladder served by default | Ladder rung cached locally | Payload size audit |
| Per-audio asset | Bitrate ceiling stated per use (music vs SFX vs voice) | Lower bitrate tier available | Cached after first play | Payload size audit |
| Per-video asset | Adaptive-bitrate segments, no single monolithic file above stated ceiling | Lowest segment served on cellular by default | Partial offline cache of visited segments | Payload size audit + playback test |
| Memory | Stated ceiling for target browser tab | Stated ceiling for target device class | n/a | Memory profiler under sustained use |
| Cold-start TTV | Aligned to the product's stated TTV ceiling | Same, cellular-aware | First run works from cache after one online session | Timed test, airplane mode second run |

**Directives**:
- State a numeric ceiling for every row that applies to the product; an unstated ceiling is an `incomplete-delivery-reach` finding under the shared enumeration
- Serve the smallest asset-ladder rung that meets the current delivery budget by default; forbid serving production-fidelity assets to a context whose budget cannot afford them
- Require every user-facing capability to state its offline behaviour per row; a capability with no stated offline behaviour is `missing-offline-fallback`
- Treat an asset payload that has no ceiling stated anywhere in the owning TAD/Game-TAD as `unbounded-asset-payload` at `blocker` severity
- Re-validate the cold-start TTV row whenever the asset ladder or the pipeline's Optimize stage changes; a stale validation is `stale-evidence`

## Generation Economics

Extends the authoring set's Token Economics lens and ROI Calculation Template with a per-asset view.

```
Cost per Asset = (generation calls to reach an accepted result) × (price per call)
Effective Cost per Asset = Cost per Asset × (1 − cache hit rate)
Monthly Generation Budget = Σ (Effective Cost per Asset × expected asset volume) across all pipelines
```

**Generation Economics Template**:
```markdown
## Generation Economics: [Product / Feature]

| Modality | Avg calls/accepted asset | Price/call | Cache hit target | Effective cost/asset | Monthly volume | Monthly budget |
|---|---|---|---|---|---|---|
| Text | | | | | | |
| Audio | | | | | | |
| Image | | | | | | |
| Video | | | | | | |
```

**Directives**:
- Record average calls-to-accepted-result per modality; a generator that frequently fails validation inflates real cost beyond the price-per-call alone
- State a cache hit target per modality and design the asset pipeline's Store stage to be addressable by input hash, so a repeat request is a cache read, not a regeneration
- Aggregate per-asset economics into the product's overall token/compute budget per the authoring set's ROI Calculation Template; a media pipeline with no line item there is a `missing-economics-metric`
- Re-evaluate regeneration-at-higher-fidelity decisions against the ROI threshold before promoting an asset from `dev-proven` fidelity to `production-verified` fidelity

## From-0-to-1 Rich Media & Game Creation Process

This is not a rival sequence to the authoring set's Phase 0–4 model; it is that model, specialized. A GDD is authored in Phase 1, a Game-TAD in Phase 2, exactly where a PRD and TAD are authored. Where this section's phase content conflicts with the phase model, the phase model is canonical, per the same rule the authoring set applies to its own Agent-Platform execution order.

| Phase | Media/game-specific addition |
|---|---|
| **Phase 0 — Discovery & Validation** | Validate the player fantasy or content premise; estimate time-to-first-fun as the TTV ceiling; assess rights feasibility for any real-world IP, likeness, or licensed asset before scoping further |
| **Phase 1 — PRD (GDD) Creation** | Author the GDD per its template; define the core loop and player personas before any story; state success metrics including TTV-to-first-fun |
| **Phase 2 — TAD (Game-TAD) Creation** | Author the Game-TAD per its template: timestep model, entity model, performance budgets, media modality harness contracts for every generative or captured asset pipeline in scope |
| **Phase 3 — Alignment & Playtest Review** | Run the standard alignment check, plus: confirm every shipped asset carries a complete, `reviewed-pass` Provenance Record; confirm the frame budget holds under a scripted playtest; confirm the cold-start TTV was walked through on a clean environment offline and online |
| **Phase 4 — Living Documents** | Iterate GDD/Game-TAD together under semantic versioning; re-derive readiness rungs whenever a VCC or Evidence Reference changes; bound live-ops content cycles with the same max-iteration and circuit-breaker discipline as any other loop |

**Directives**:
- Forbid beginning Phase 2 game-loop or asset-pipeline design before Phase 1's core loop is stated; an architecture with no design behind it is ungrounded
- Gate Phase 3 exit on zero `blocker` findings, exactly as the authoring set requires, including any new blocker types this set adds (`unlicensed-asset-use`, `unbounded-game-loop`, `unbounded-asset-payload`)
- Treat a live-ops content release as a Phase 4 revision cycle with its own bound; the default circuit-breaker is no reduction in open `blocker` findings across two consecutive release cycles

## Readiness Ladder for Rich Media & Games

Reuses the authoring set's five-rung ladder unchanged: `undocumented < spec-complete < dev-proven < runtime-ready < production-verified`. This section adds the domain-specific tiering that maps onto those rungs, in the same shape as the authoring set's Agent-Platform Readiness Tiers.

| Tier | Definition | Minimum rung to exit |
|---|---|---|
| **Must: Prototype-playable** | The core loop runs end-to-end with placeholder or draft-fidelity assets; frame budget holds; no generated asset ships without a Provenance Record | `runtime-ready` |
| **Follow-on: Content-complete** | Production-fidelity assets replace placeholders; every asset `reviewed-pass`; full asset ladder present for the delivery budget | `runtime-ready` per content track |
| **Follow-on: Live-ops ready** | Content pipeline supports bounded, versioned post-launch releases without a game-loop or budget regression | `runtime-ready`, `production-verified` per released increment |

**Directives**:
- Derive every rung from Evidence References only, including a playtest recording, a frame-time profile, or a Provenance Record completeness check; forbid authoring a rung by hand
- Forbid claiming `production-verified` for any asset whose Provenance Record reads `unreviewed`
- Report local and delivered readiness as two separate fields per asset pipeline and per game system, exactly as the base ladder requires

## Conformance Findings

**This section adds Finding Type rows only.** The Recording Contract, Severity Assignment, and Check Determinism rules are owned by the PRD, TAD & ADR Guidelines companion set and reused unchanged; a media or game finding is recorded with the same six fields, and the enumeration below is the union addition.

| Category | Finding Type | Default severity |
|---|---|---|
| Provenance | `missing-provenance-record` | `major` |
| Provenance | `unlicensed-asset-use` | `blocker` |
| Provenance | `unresolved-generation-rights` | `major` |
| Harness | `missing-cost-log-media` | `major` |
| Harness | `unsafe-generation-output` | `blocker` |
| Game loop | `unbounded-game-loop` | `blocker` |
| Game loop | `undeclared-determinism` | `minor` |
| Performance | `frame-budget-breach` | `major` |
| Performance | `unbounded-asset-payload` | `blocker` |
| Performance | `missing-offline-fallback` | `major` |
| Flow | `orphaned-game-loop-flow` | `major` |
| Flow | `orphaned-media-generation-flow` | `major` |
| Economics | `missing-generation-economics` | `major` |

**Directives**:
- Treat this table as additive to, not a replacement for, the shared enumeration; forbid redefining a type either companion set already owns
- Deduplicate and order findings exactly as the shared Recording Contract specifies, using Rule ID anchors within this set's own sections
- Extend this enumeration by adding a row here first, then the rule that raises it; forbid the reverse order, matching the shared discipline

## Anti-Pattern Guards

❌ A generated asset shipped with no Provenance Record because the pipeline "obviously" produced it in-house
→ ✅ Every asset stamped with a Provenance Record before Store; an unstamped asset cannot reach the mirror lane

❌ Storing the verbatim generation prompt when the prompt itself risks reproducing copyrighted text, lyrics, or a named style
→ ✅ Store a hash or paraphrased reference in `input_reference`; keep the Provenance Record itself free of reproduced copyrighted material

❌ A render loop with no stated frame budget, discovered only when players report stutter
→ ✅ Frame budget and circuit-breaker stated in the Game-TAD before implementation; overruns degrade gracefully, not silently

❌ An AI-driven game system (procedural content, adaptive dialogue) calling a generator once per tick with no bound
→ ✅ Generation-call bound stated per session or per tick; exhaustion falls back to cached or scripted content, never a stall

❌ Shipping production-fidelity textures, audio, or video during `spec-complete` or `dev-proven` work because the generator defaults to maximum quality
→ ✅ Generate at the fidelity the current rung needs (Modality-Appropriate Fidelity); reserve production fidelity for the Content-complete tier

❌ A single monolithic asset bundle loaded upfront with no resolution or bitrate ladder
→ ✅ Optimize stage produces a ladder; Serve selects the smallest rung that meets the current delivery budget

❌ An asset pipeline with no offline behaviour stated, breaking on first connectivity loss
→ ✅ Every user-facing capability states its offline behaviour; local-first cache is the default, not a stretch goal

❌ A GDD that describes a setting and a fantasy but never states the core loop
→ ✅ Core loop stated as `[Action] → [Feedback] → [Reward] → [Re-engagement trigger]` before any story is written

❌ Acceptance criteria phrased as "feels fun" or "looks polished" with no stated check
→ ✅ Every criterion expressed as a VCC: a measurable end state (frame time, load time, provenance completeness) plus a stated check

❌ Regenerating an asset from scratch on every request because caching was never designed in
→ ✅ Store is addressable by input hash; cache hit target stated per modality; regeneration only on cache miss or explicit invalidation

❌ A live-ops content cycle with no iteration bound, running until the team runs out of ideas or budget
→ ✅ Every live-ops release cycle carries a max-iteration bound and a circuit-breaker, exactly as any other loop in the companion sets

❌ Treating "AI-generated, so no license needed" as a default assumption
→ ✅ `license_terms` defaults to `unresolved`; promotion is blocked until a named human records a disposition

## Validation Checklist

**Pre-Production**:
- [ ] GDD authored with core loop, player personas, and TTV-to-first-fun stated before any Game-TAD design begins
- [ ] Every acceptance criterion expressed as a VCC
- [ ] Game-TAD states timestep model, tick rate, and frame budget before any Component Specification references simulation
- [ ] Every AI-driven game system states a generation-call bound and a determinism requirement
- [ ] Every media pipeline in scope has a Media Generation Flow or Rich Media Asset Pipeline documented, with a stated cache hit target
- [ ] Performance & Delivery Budget table populated with numeric ceilings for every row that applies
- [ ] Generation Economics table populated per modality in scope; monthly budget rolled into the product's overall token/compute budget

**Pre-Launch / Playtest Gate**:
- [ ] Frame budget holds for a stated percentile of frames during a scripted playtest, on the target device class
- [ ] Every shipped asset carries a complete Provenance Record with `human_review_status: reviewed-pass`
- [ ] No `license_terms: unresolved` asset present in the delivery-lane build
- [ ] Cold-start TTV walked through on a clean environment, both online and in airplane mode
- [ ] Offline behaviour validated per capability against its stated row in the budget table
- [ ] Asset ladder present and Serve confirmed to select the smallest rung meeting the delivery budget
- [ ] Zero `blocker` findings from this set's enumeration, in addition to zero `blocker` findings from the authoring set's own alignment check

**Live-Ops / Post-Launch Gate**:
- [ ] Each content release cycle carries a stated max-iteration bound and circuit-breaker
- [ ] Readiness rungs re-derived for any asset or system touched by the release
- [ ] Generation economics actuals tracked against estimates; budget projections updated on price or volume changes
- [ ] Provenance Records re-verified for any asset whose source license changed since last release
- [ ] Finding set compared against the prior release; any new `blocker` treated as a regression

## Role—Action—Outcome

**Game Designer** → defines player fantasy, core loop, and progression; writes stories and acceptance criteria as VCCs; prioritizes via MoSCoW → produces a GDD that grounds every downstream system in a stated loop

**Narrative / Content Writer** → drafts dialogue, lore, and localized text; supplies prompts and review for text-generation harnesses → produces text assets with complete Provenance Records and locale coverage

**Audio Designer / Composer** → specifies music and SFX requirements; reviews generated or captured audio against loudness and duration bounds → produces audio assets meeting the delivery budget's bitrate ceilings

**Technical Artist** → defines the image/video asset ladder, resolution and format standards, and the Optimize-stage transform per pipeline → produces a delivery-ready asset pipeline within the stated payload ceilings

**Gameplay Engineer** → implements the game loop, entity/component/system model, and performance budget enforcement; instruments the circuit-breaker → produces a Game-TAD-conformant runtime that degrades gracefully under load

**Solo Founder / AI Orchestrator** *(collapses all authoring roles in a solo-dev context; does not collapse the Evaluator)* → validates rights feasibility and ROI before scoping any content system; sets generation-call and token budgets per pipeline; maintains the Provenance Ledger discipline → ships a playable, rights-clear product at near-zero infrastructure cost

**Evaluator** *(a mechanism, never a person; reused unchanged from the companion sets)* → judges each Generation VCC — including its safety check and provenance completeness — against surfaced output only, records the Evidence Reference, derives the readiness rung → produces verdicts on generated content that no participant can self-grade

## Mantra Application

**"Fidelity matches the rung it serves · Provenance ships with every asset, never after it · Every loop — game or generation — is bounded and breaks its own circuit · Budgets make delivery honest before launch, not after complaints · Evidence still earns the rung, even when the artifact is a frame or a sound"**

- **Fidelity matches the rung**: a placeholder-fidelity asset at `spec-complete` is correct; a production-fidelity asset at the same rung is wasted spend, not diligence
- **Provenance ships with**: the Provenance Record is stamped inside the generation flow, not appended after the fact; an asset with no record cannot reach the mirror lane by construction
- **Every loop is bounded**: a game's per-tick loop and a generator's per-request loop obey the same discipline as any agentic loop — a stated bound, a stated circuit-breaker, and a degrade path that is never silence
- **Budgets make delivery honest**: frame time, payload size, and offline behaviour are stated numbers checked before launch, so "it feels slow" becomes a regression against a ceiling rather than a surprise
- **Evidence still earns**: a readiness rung for a texture, a voice line, or a frame budget is derived from a recorded check exactly like any other capability; narrative claims about how a game "feels" raise nothing on the ladder
