---
title: "Agentic Game OS — Persistent World Continuity — PRD/TAD/ADR"
doc_type: "Combined PRD/TAD/ADR"
version: "1.0.0"
date: "2026-08-08"
updated: "2026-08-08"
lang: "en-US"
frontmatter_contract: "required"
owner: "Solo Founder / AI Orchestrator"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
---

# Agentic Game OS — Persistent World Continuity — PRD/TAD/ADR

**Governed by**: PRD, TAD & ADR Guidelines v1.7.0 (2026-07-28). **Companion set**: Agentic SDLC Guidelines owns execution-domain conformance (task decomposition, agent roles, tool blast radius); a runtime-readiness claim sourced from this document alone is incomplete.

**Status boundary**: this is a `spec-complete` planned contract. No component named here is claimed to exist or to be proven. Present-tense acceptance language states the behaviour required for promotion; it is not runtime evidence. Every `local_rung` and `delivered_rung` value in this document is derived from the absence of Evidence References, not authored as an opinion.

**Neutrality boundary**: the capability contract below is product-, vendor-, and repository-neutral. Concrete stacks, platform names, and workspace-relative module paths appear only under the two headings whose text contains *reference implementation*. No claim in this document is derived from a file name, a directory layout, or a downstream mirror.

## Version History

**v1.0.0** (2026-08-08):
- Initial combined PRD/TAD/ADR for the Agentic Game OS capability layer
- Must-tier scope: Game Mode Registry, Deterministic Simulation Core, World Continuity Journal, Continuity Restore Adapter, World Lease Arbiter, Game OS Status Surface
- First consumer defined: Persistent Strategy World mode (territory, economy, unit orders) proving registry plus continuity
- ADR-1 (declared mode registry), ADR-2 (continuity substrate), ADR-3 (networked shared-world deferral), ADR-4 (native in-repo simulation) accepted
- Networked shared-world play recorded as an explicit `Won't (this increment)` with a named reopening gate

---

## Feature: Agentic Game OS

### Problem Statement

An AI-native creative runtime that already owns one 3D scene surface, a deterministic entity-component simulation, and a local-first document store can host several distinct play modes, yet each mode is added by widening a hand-maintained union of surface identifiers and by hand-wiring its own activation, exit, input, and persistence path. Two consequences follow. First, adding a mode costs more than the mode itself: the cost is in the wiring, not the gameplay, so mode count is throttled by integration friction rather than by design capacity. Second, and more damaging to player value, world state is treated as ephemeral: simulation state lives in memory and only narrow validated decisions are written, so a player who closes the surface loses the world they built. A strategy world without cross-session continuity is a demo, not a game.

The opportunity is one **Game OS layer**: a declared mode-registration contract plus a durable, replayable world-continuity contract, both local-first and zero-infrastructure, so that any number of play modes register against one arbitrated scene surface and every world a player builds survives the session that created it.

### Personas

| Persona | Jobs-to-be-done |
|---|---|
| **Returning Strategist** (mobile-first player) | Reopen a world on any of their devices' browsers and resume the exact territory, economy, and unit state they left; issue orders offline; never lose progress to a closed tab |
| **Solo Founder / AI Orchestrator** | Register a new play mode without editing a shared union or duplicating activation, input, camera, and persistence wiring; keep infrastructure cost at zero; keep the simulation model-free and auditable |
| **External Agent** (tool-calling client) | Discover the world surface, read its continuity and determinism state, and issue bounded control operations through one typed contract, without scraping a UI |

### User Journey Stage

Addresses the **Return** and **Engage** stages of the *Returning Strategist — Resume a Persistent World* journey, the **Discover** and **Complete** stages of the *Solo Founder — Register a New Play Mode* journey, and the **Discover** stage of external agent onboarding.

### User Stories

**PRD-AGOS-1**: As a **Solo Founder / AI Orchestrator**, I want play modes to register themselves against a declared contract, so that adding a mode does not require editing a shared list of mode identifiers.

**PRD-AGOS-2**: As a **Returning Strategist**, I want the world I built to be there when I come back, so that my invested time compounds instead of resetting.

**PRD-AGOS-3**: As a **Returning Strategist**, I want to keep playing with no network, so that connectivity is never a precondition for my own world.

**PRD-AGOS-4**: As a **Returning Strategist**, I want a corrupted or partially written save to be reported rather than silently replaced, so that I decide whether to reset it.

**PRD-AGOS-5**: As a **Solo Founder / AI Orchestrator**, I want exactly one writer per world at a time, so that two open sessions cannot fork the same world into two divergent histories.

**PRD-AGOS-6**: As a **Solo Founder / AI Orchestrator**, I want the play loop to make zero model calls and zero network calls, so that a long session costs nothing and behaves identically offline.

**PRD-AGOS-7**: As an **External Agent**, I want one typed read view and one bounded control route for the world surface, so that I can inspect and drive it without learning each mode's internals.

**PRD-AGOS-8**: As a **Returning Strategist**, I want every world asset to be redistributable and attributed, so that the world I share carries no licensing liability.

### Acceptance Criteria

**AC1 (PRD-AGOS-1)**: **Given** a mode declares its identity, surface contract, exit handler, and input adapter, **When** it registers with the Game Mode Registry, **Then** it becomes activatable without any change to a shared mode-identifier list, and a second registration of the same identity fails closed.

> **VCC translation**: `Verify the registry conformance suite exits 0, asserts one activatable mode per registered identity, asserts a typed rejection on duplicate-identity registration and on activation of an unregistered identity, and no shared mode-identifier list is present in the registry module`

**AC2 (PRD-AGOS-1)**: **Given** one play mode holds the scene surface, **When** another mode is activated, **Then** the incumbent mode's exit handler runs exactly once and exactly one gameplay overlay remains live.

> **VCC translation**: `Verify the surface-arbitration suite exits 0 and asserts exit-handler invocation count of exactly 1 per displaced mode and live-overlay count of exactly 1 after each transition`

**AC3 (PRD-AGOS-2, PRD-AGOS-6)**: **Given** a world seed and a recorded order sequence, **When** two fresh runtimes advance the same number of fixed steps, **Then** the canonical serialization of world state is byte-equivalent in both.

> **VCC translation**: `Verify the determinism suite exits 0 and reports byte-equal canonical world digests for two independent replays of the same seed and order sequence`

**AC4 (PRD-AGOS-2)**: **Given** a world with committed progress, **When** the surface is closed and later reopened on the same device, **Then** the restored world equals the last committed tick, and the restore path reports the restored tick index and the digest it matched.

> **VCC translation**: `Verify the continuity round-trip test exits 0, asserts restored canonical digest equals the pre-close committed digest, and asserts the reported restored tick index equals the last committed tick index`

**AC5 (PRD-AGOS-3)**: **Given** no network is reachable, **When** a session starts, plays, commits, closes, and reopens, **Then** every step above succeeds and no outbound request is attempted.

> **VCC translation**: `Verify the offline suite exits 0 with network transport disabled, asserts outbound request count of exactly 0 across the full open-play-commit-close-reopen cycle, and asserts a successful restore`

**AC6 (PRD-AGOS-4)**: **Given** a malformed or truncated world record, **When** restore runs, **Then** it blocks before a world is created, names the unreadable record, leaves the stored bytes unchanged, and exposes an explicit reset action.

> **VCC translation**: `Verify the fail-closed restore test exits 0, asserts world-creation count of exactly 0 on malformed input, asserts stored bytes are byte-identical before and after the attempt, and asserts the typed error names the record and offers a reset action`

**AC7 (PRD-AGOS-5)**: **Given** one session holds the write lease for a world, **When** a second session attempts to write the same world, **Then** the second attempt fails closed with a typed conflict and the first session's history is unchanged.

> **VCC translation**: `Verify the lease-arbitration test exits 0, asserts a typed conflict for the second writer, and asserts the incumbent world journal is byte-identical after the rejected attempt`

**AC8 (PRD-AGOS-6)**: **Given** a completed fixed step, **When** no authoring assistance was requested, **Then** the step emits exactly one canonical zero cost record with a null model identity, all token fields zero, and no incompleteness flag.

> **VCC translation**: `Verify the cost-log suite exits 0 and asserts exactly one cost record per step with model identity null, prompt and completion token counts of 0, and estimated cost of 0`

**AC9 (PRD-AGOS-7)**: **Given** an invocation, **When** it is parsed, **Then** exactly one command route, one binding, and one tag are accepted, and duplicate sigils, unknown keys, and invalid operations fail closed.

> **VCC translation**: `Verify the invocation-grammar suite exits 0, asserts acceptance of exactly the declared route tuple, and asserts typed rejection for duplicate sigils, unknown argument keys, and undeclared operations`

**AC10 (PRD-AGOS-7)**: **Given** readable Game OS state exists, **When** the Game OS Status Surface is called, **Then** normalized entries return, no world record is modified, and the response carries a zero cost record.

> **VCC translation**: `Verify the status-surface suite exits 0, asserts a schema-conforming response for every declared view, asserts an empty before/after diff across every world record read, and asserts a zero cost record`

**AC11 (PRD-AGOS-8)**: **Given** any world asset, **When** it is loaded, **Then** it resolves to a committed local file carrying a provenance record with a non-empty origin and a redistributable licence, and no asset is generated or fetched at load time.

> **VCC translation**: `Verify the asset-gate suite exits 0, asserts a provenance record with non-empty origin and an allow-listed licence for every asset, asserts typed rejection for a missing or non-redistributable licence, and asserts zero outbound asset requests during load`

### Success Metrics

| Metric | Baseline | Target | Timeline |
|---|---|---|---|
| Worlds surviving a session boundary | 0% (state is ephemeral) | 100% of committed worlds restore | End of Must-tier build |
| Readiness rung (local / delivered) | `spec-complete` / `undocumented` | `runtime-ready` / `undocumented` | End of Must-tier build |
| Wiring edits required to add one mode | shared list plus per-mode activation, input, and persistence wiring | 1 registration call, 0 shared-list edits | End of Must-tier build |
| Time-to-value (TTV steps) | — | ≤ 3 steps | Phase 3 sign-off |
| Time-to-value (TTV elapsed) | — | ≤ 3 min | Phase 3 sign-off |
| Token cost / month | $0 (no play loop exists) | $0.00 for the play loop; authoring assist metered separately | Ongoing |
| Monthly TCO | $0 | $0 (device-local storage; no provisioned runtime) | Ongoing |
| Outbound requests during play | — | 0 | End of Must-tier build |
| ROI Score | — | ≥ 0.40 | Phase 1 gate |

### MoSCoW Priority

*ROI Score = (User Impact × Sessions/month) / (Build Hours + Monthly TCO + Monthly Token Cost). Threshold for Must/Should is 0.40. Reach is estimated at 40 sessions/month at current solo-operator plus demo load.*

| Tier | Item | ROI Score | Rationale |
|---|---|---|---|
| **Must** | PRD-AGOS-2, -3, -4 — World Continuity Journal, Restore Adapter, fail-closed store | (5 × 40) / (120 + 0 + 0) ≈ **1.67** | Converts a demo into a game; every other item's value compounds on it |
| **Must** | PRD-AGOS-1 — Game Mode Registry and Surface Arbiter | (4 × 40) / (60 + 0 + 0) ≈ **2.67** | Removes the per-mode integration tax; cheapest structural win available |
| **Must** | PRD-AGOS-5 — World Lease Arbiter | (4 × 40) / (32 + 0 + 0) ≈ **5.00** | Near-free once continuity exists; without it continuity silently forks |
| **Must** | PRD-AGOS-6 — zero-cost, zero-network play loop | (4 × 40) / (24 + 0 + 0) ≈ **6.67** | Enforcement of an existing constraint, not new capability; protects TCO |
| **Should** | PRD-AGOS-7 — status view and bounded control route | (3 × 40) / (40 + 0 + 0) ≈ **3.00** | Real operator and agent value; not required for a player to finish a session |
| **Should** | PRD-AGOS-8 — Asset Provenance Gate | (3 × 40) / (48 + 0 + 0) ≈ **2.50** | Removes redistribution liability before asset volume grows |
| **Could** | Persistent Strategy World depth: diplomacy, tech tree, ranked ladder | (2 × 40) / (200 + 0 + 0) ≈ **0.40** | At threshold; deferred until continuity is proven |
| **Won't (this increment)** | Networked shared world: concurrent players, authoritative remote tick, shared persistence, matchmaking, chat, trading | (5 × 40) / (1,000 + 300 + 0) ≈ **0.15** | Below threshold and contradicts the zero-infrastructure and offline-first constraints; see ADR-3 for the named reopening gate |
| **Won't (this increment)** | Model-driven unit behaviour or generative dialogue on the play hot path | (2 × 40) / (160 + 100 + 60) ≈ **0.25** | Adds spend and destroys replay determinism; authoring-time assist only |

### Min-Viable Scope

The smallest deliverable that satisfies the Must-tier criteria: **Game Mode Registry** plus **Surface Ownership Arbiter**, **Deterministic Simulation Core**, **World Continuity Journal** with **World Snapshot Store**, **Continuity Restore Adapter**, and **World Lease Arbiter** — with one registered consumer, the **Persistent Strategy World**, reduced to territory claim, one resource, and unit move orders. The status surface, control route, asset gate, and all strategy depth are excluded from Min-Viable Scope.

### Out of Scope

- Networked shared-world play in any form, including remote authoritative tick, concurrent players in one world, shared persistence, interest management, and matchmaking (see ADR-3)
- Accounts, sign-in, cross-device sync, and cloud saves; continuity is device-local in this increment
- Model inference, generative dialogue, or learned policies on the play hot path
- A second renderer, a second scene graph, or an external simulation, physics, or pathfinding engine (see ADR-4)
- Runtime asset generation, remote asset fetch, and any provisioned server or paid service

### Dependencies

- An existing single-owner 3D scene surface with an activation and exit contract
- An existing deterministic entity-component simulation with a fixed-step tick and an in-memory snapshot primitive
- An existing device-local document store with append and revision semantics
- An existing typed tool-surface contract capable of hosting read and bounded-control routes

### Open Questions

- What snapshot interval balances restore latency against journal growth for a long-lived world on a mobile device? Requires a measured trade-off before the journal format is frozen.
- What is the practical device-local storage ceiling for the target device mix, and what retention policy applies when a world's journal approaches it?
- Does the existing simulation's snapshot primitive serialize deterministically across engine versions, or is a version-pinned canonical encoder required for the digest in AC3 and AC4?
- Should the write lease be per world or per world-region once a single world exceeds one session's working set? Affects AC7's granularity.

---

## Flow Patterns

### Journey: Returning Strategist — Resume a Persistent World

| Stage | Action | Touchpoint | Pain Point | Opportunity |
|---|---|---|---|---|
| Trigger | Player reopens the workspace on a phone or laptop browser | Surface entry | Prior sessions vanished; nothing to return to | Restored world is the entry state, not a blank seed |
| Discover | Player sees the world's restored tick, epoch, and last commit | World status projection | No way to tell whether progress survived | Explicit restored-tick and digest report |
| Engage | Player issues territory, economy, and unit orders | Mode control panel and pointer, touch, or spatial input | Orders lost on tab close | Every accepted order is journalled before it is acknowledged |
| Complete | Player commits and closes the surface | Explicit commit action | Silent partial writes | Commit is atomic and reports the committed tick |
| Return | Player reopens later, possibly offline | Same surface entry | Connectivity gates access to their own world | Device-local restore with zero outbound requests |

### Journey: Solo Founder — Register a New Play Mode

| Stage | Action | Touchpoint | Pain Point | Opportunity |
|---|---|---|---|---|
| Trigger | A new play mode is designed | Mode module | Integration cost exceeds gameplay cost | One declared registration contract |
| Discover | Operator reads the registry contract | Registry contract definition | Requirements discovered by imitating a sibling mode | Contract states identity, exit, input, and persistence obligations |
| Engage | Mode registers identity, exit handler, input adapter, and world schema | Registration call | Shared mode list must be edited | Registration is additive and local to the mode |
| Complete | Mode activates and displaces the incumbent cleanly | Surface arbiter | Two overlays live at once | Exactly one live overlay, exit handler run once |
| Return | Mode evolves without touching siblings | Mode module only | Cross-mode regressions | Sibling modes untouched by construction |

### Workflow: Session Continuity Restore

**Trigger**: The surface is opened for a world identity that has a stored record.
**Actors**: Continuity Restore Adapter, World Snapshot Store, World Continuity Journal, World Lease Arbiter, Deterministic Simulation Core, Game Mode Registry.

**Happy path**:
1. Restore Adapter acquires the write lease for the world identity → lease held with an epoch
2. Restore Adapter reads the newest valid snapshot → base state materialized in memory
3. Restore Adapter replays journalled orders after that snapshot through the Simulation Core → state advanced to the last committed tick
4. Restore Adapter computes the canonical digest and compares it to the digest recorded at commit → match reported
5. Registry activates the world's mode with the restored state → player resumes

**Alternate paths**:
- No stored record: a fresh world is seeded from the declared seed and the journal starts empty
- Snapshot present, journal empty: state resumes at the snapshot tick with no replay
- Newest snapshot invalid, older snapshot valid: the older snapshot is used and the additional replay span is reported

**Error paths**:
- Lease held by another session: restore stops before reading, returns a typed conflict, and offers a read-only inspection path
- Malformed journal or snapshot with no valid predecessor: restore stops before world creation, names the record, preserves bytes, and offers an explicit reset
- Digest mismatch after replay: restore stops, reports both digests, and offers reset or read-only inspection; it never silently accepts a divergent world

**Postconditions**: either a world is live at a reported tick with a matching digest and a held lease, or no world exists, no stored byte changed, and a typed error names the blocking record.

### Data Flow: World Continuity

| Stage | Component | Input Format | Output Format | Persistence | Error Handling |
|---|---|---|---|---|---|
| Ingest | Order Intake | Typed order payload (normalized input frame) | Validated order record | Journal append, before acknowledgement | Reject with typed error; order never reaches the simulation |
| Transform | Deterministic Simulation Core | Validated order record plus prior state | Next state plus zero cost record | Ephemeral in-memory state | Fail-fast on schema violation; tick is not partially applied |
| Store | World Continuity Journal and Snapshot Store | Order records; periodic canonical snapshot | Append-only journal entries; snapshot record with digest | Device-local durable store | Atomic commit; on failure prior bytes unchanged and a retry action exposed |
| Serve | Continuity Restore Adapter | Snapshot plus journal tail | Restored world state plus restored-tick report | None (materialized in memory) | Fail closed with a typed error naming the record; never a partial world |

### Orchestration/Harness Flow: World Authoring Assist Harness

**Trigger**: The operator explicitly requests authoring assistance for a world definition (terrain profile, faction parameters, scenario objectives) outside the play loop.
**Topology pattern**: Agentic loop
**Max iterations**: 3 | **Circuit-breaker**: no reduction in schema-validation failures across two consecutive iterations → exit with the last valid partial draft
**Token budget**: 1,800 prompt + 900 completion @ 0.60 cache hit rate = est. $0.004/call at a small-model price point; metered and budget-capped per authoring session

*This is the only model-bearing pipeline in this document. It runs at authoring time only. The play loop makes no model call, which is what AC8 asserts.*

| Role | Component | Input schema | Output schema | Cost log emitted | Fallback |
|---|---|---|---|---|---|
| Dispatcher | Authoring Request Router | `WorldDraftRequest` | `RoutedDraftRequest` | — | Reject with typed error before token spend |
| Executor | World Authoring Assist Harness | `RoutedDraftRequest` | `WorldDefinitionDraft` | ✓ (required) | Retry ≤3 on schema failure → return last valid partial draft |
| Observer | Cost Observer | Cost record stream | Session cost total plus budget alert | — | Silent-fail; gap flagged in the status surface |
| Consumer | World Definition Store | `WorldDefinitionDraft` | Persisted candidate definition, operator-reviewed | — | Upstream error propagation; no auto-accept |

**Happy path**: Operator requests a draft → Dispatcher validates and routes → Executor produces a draft and emits a cost record → Observer accumulates spend → Consumer stores it as an unaccepted candidate for review.
**Alternate paths**: Invalid request schema → rejected before token spend. Draft fails output validation → retry up to 3 iterations.
**Error paths**: Circuit-breaker trips → last valid partial draft returned with an iteration-limit error. Model surface unavailable → typed upstream error; no authoring capability is required for play.
**Postconditions**: a cost record is persisted or a gap is flagged; a candidate definition is stored only after passing output validation; no draft is ever auto-promoted into a live world.

### Topology: Agentic Game OS v1 — 2026-08-08

**Boundaries**: the player's device runtime (browser process and device-local storage) is the sole trust domain for play and continuity; an authoring-time assist domain is reachable only on explicit operator request; the mirror and delivery lanes are publication targets holding no world data.

| Node | Role | Type | Lane | Connects to | Connection type | Data residency |
|---|---|---|---|---|---|---|
| Invocation Parser | Router | Device-local function | Authoring | Game Mode Registry, Game OS Status Surface | Sync typed call | Volatile device memory |
| Game Mode Registry | Router | Device-local registry | Authoring | Surface Ownership Arbiter, mode modules | Sync typed call | Volatile device memory |
| Surface Ownership Arbiter | Gateway | Device-local arbiter | Authoring | Scene surface owner, mode exit handlers | Sync typed call | Volatile device memory |
| Deterministic Simulation Core | Producer | Device-local fixed-step loop | Authoring | World Continuity Journal, scene projection | Sync tick return | Volatile device memory |
| World Lease Arbiter | Gateway | Device-local lease store | Authoring | Continuity Restore Adapter, Journal | Sync compare-and-set | User device |
| World Continuity Journal | Store | Device-local append-only log | Authoring | World Snapshot Store | Async durable append | User device |
| World Snapshot Store | Store | Device-local record store | Authoring | Continuity Restore Adapter | Async durable write | User device |
| Continuity Restore Adapter | Producer | Device-local function | Authoring | Simulation Core, Registry | Sync typed call | Volatile device memory |
| Asset Provenance Gate | Gateway | Device-local validator | Authoring | Committed local assets | Sync file resolution | User device and operator workspace |
| Game OS Status Surface | Consumer | Device-local read view | Authoring | Registry, Journal, Lease Arbiter | Sync read-only call | Volatile device memory |
| Authoring Assist Harness | Producer | Metered model harness | Authoring | World Definition Store, Cost Observer | Async typed call | Operator device; provider transit on explicit request only |
| Approved Mirror Package | Consumer | Immutable artifact | Mirror | Delivery surface | Batch publish, boundary closed | None; holds no world data |
| Public Delivery Surface | Consumer | Static application | Delivery | End-user browser | Fetch over transport, boundary closed | None; holds no world data |

```mermaid
flowchart TB
  subgraph Device[Player device runtime · sole trust domain for world data]
    Invoke([Invocation Parser<br/>router])
    Registry([Game Mode Registry<br/>router])
    Arbiter([Surface Ownership Arbiter<br/>gateway])
    Sim([Deterministic Simulation Core<br/>producer])
    Lease([World Lease Arbiter<br/>gateway])
    Journal([World Continuity Journal<br/>store])
    Snap([World Snapshot Store<br/>store])
    Restore([Continuity Restore Adapter<br/>producer])
    Assets([Asset Provenance Gate<br/>gateway])
    Status([Game OS Status Surface<br/>read-only consumer])
  end
  subgraph Authoring[Authoring-time assist · explicit operator request only]
    Assist([Authoring Assist Harness<br/>metered producer])
    Cost([Cost Observer])
  end
  subgraph Mirror[Mirror lane · no world data]
    Pkg([Approved mirror package])
  end
  subgraph Delivery[Delivery lane · no world data]
    Pub([Public delivery surface])
  end
  Invoke -- sync --> Registry
  Invoke -- sync --> Status
  Registry -- sync --> Arbiter
  Restore -- sync --> Lease
  Restore -- sync --> Sim
  Restore -- sync --> Registry
  Snap -- sync --> Restore
  Sim -- async append --> Journal
  Journal -- async --> Snap
  Assets -- sync --> Sim
  Status -. read-only .-> Journal
  Assist -- async --> Cost
  Device -. closed batch promotion .-> Pkg
  Pkg -. closed batch promotion .-> Pub
```

**Version notes**: v1, initial topology — no prior version to diff against. World data never crosses the device boundary in this increment; the mirror and delivery lanes carry application bytes only.

---

## Time-to-Value: Agentic Game OS

| Dimension | Estimate | Target ceiling | Validation method |
|---|---|---|---|
| TTV steps | 3 steps (open the surface, activate the Persistent Strategy World, issue one order) | ≤ 3 steps | Walk-through on a clean device profile with no prior storage |
| TTV elapsed time | ~2 min | ≤ 3 min | Timed first-run test on a mobile browser profile |
| First-value action | One order is accepted, journalled, and visible in the restored-tick report after a close and reopen | — | Observable: restored tick index and matching digest reported |
| Persona | Returning Strategist (mobile-first player) | — | Defined above |

---

## Architecture: Agentic Game OS

### Overview

**From a declared mode to a world that outlives its session**: Invocation Parser → Game Mode Registry → Surface Ownership Arbiter → Deterministic Simulation Core → World Continuity Journal and Snapshot Store → Continuity Restore Adapter → delivers a restorable, replay-verifiable world on one arbitrated scene surface, at $0 token cost for the play loop and $0 infrastructure cost.

### Journey → System Mapping

| Journey Stage | Workflow | Data Flow | Orchestration/Harness Flow | Topology Node(s) | Component |
|---|---|---|---|---|---|
| Trigger / Return | Session Continuity Restore (steps 1–2) | Serve | — (no model call) | Lease Arbiter, Snapshot Store | World Lease Arbiter, World Snapshot Store |
| Discover | Session Continuity Restore (steps 3–4) | Serve | — | Restore Adapter, Simulation Core | Continuity Restore Adapter |
| Engage | Session Continuity Restore (step 5) then order intake | Ingest → Transform | — | Registry, Arbiter, Simulation Core | Game Mode Registry, Surface Ownership Arbiter, Deterministic Simulation Core |
| Complete | Commit | Store | — | Journal, Snapshot Store | World Continuity Journal |
| Authoring (operator) | World definition drafting | — | World Authoring Assist Harness | Assist Harness, Cost Observer | Authoring Assist Harness |

### Topology

See **Topology: Agentic Game OS v1 — 2026-08-08** above; this TAD references it rather than restating it.

### Orchestration/Harness Flows

See **Orchestration/Harness Flow: World Authoring Assist Harness** above. No other pipeline in this architecture calls a model; the play loop is deterministic by contract (AC8).

### Component Specifications

**Component**: `TAD-AGOS-REGISTRY` — Game Mode Registry
**Responsibility**: Registry admits one mode per declared identity and resolves activation requests to exactly one registered mode.
**Interfaces**: `registerMode(declaration): Unregister` | `activate(identity, activation): Result`
**Dependencies**: Surface Ownership Arbiter
**Configuration**: none externalized; every input arrives in the declaration
**FOSS / Vendor**: FOSS, first-party
**VCC Conditions**: AC1, AC2 as translated above
**Evidence References**: none recorded
**Readiness rung**: Local: `spec-complete` / Delivered: `undocumented`

**Component**: `TAD-AGOS-ARBITER` — Surface Ownership Arbiter
**Responsibility**: Arbiter guarantees exactly one live gameplay overlay on the shared scene surface.
**Interfaces**: `claim(identity): Lease` | `release(identity): void` | `registerExit(identity, handler): Unregister`
**Dependencies**: the existing single scene-surface owner
**Configuration**: optional preserve-on-panel-only identity set per mode
**FOSS / Vendor**: FOSS, first-party
**VCC Conditions**: AC2
**Evidence References**: none recorded
**Readiness rung**: Local: `spec-complete` / Delivered: `undocumented`

**Component**: `TAD-AGOS-SIM` — Deterministic Simulation Core
**Responsibility**: Core advances world state by one fixed step per accepted order batch with stable tie-breaking.
**Interfaces**: `step(state, orderBatch): { state, costRecord }` | `digest(state): CanonicalDigest`
**Dependencies**: the existing entity-component simulation and its snapshot primitive
**Configuration**: fixed-step duration; maximum catch-up steps per frame
**FOSS / Vendor**: FOSS, first-party
**VCC Conditions**: AC3, AC8
**Evidence References**: none recorded
**Readiness rung**: Local: `spec-complete` / Delivered: `undocumented`

**Component**: `TAD-AGOS-JOURNAL` — World Continuity Journal and Snapshot Store
**Responsibility**: Journal appends accepted orders and periodic canonical snapshots atomically without rewriting history.
**Interfaces**: `append(orderRecord): CommitReceipt` | `snapshot(state, tick): SnapshotRecord` | `readTail(fromTick): OrderRecord[]`
**Dependencies**: device-local durable store; World Lease Arbiter
**Configuration**: snapshot interval; retention policy at the storage ceiling
**FOSS / Vendor**: FOSS, first-party over a device-local store
**VCC Conditions**: AC4, AC6
**Evidence References**: none recorded
**Readiness rung**: Local: `spec-complete` / Delivered: `undocumented`

**Component**: `TAD-AGOS-RESTORE` — Continuity Restore Adapter
**Responsibility**: Adapter reconstructs the last committed world state and proves it against the recorded digest.
**Interfaces**: `restore(worldIdentity): RestoreReport | TypedError`
**Dependencies**: Lease Arbiter, Journal, Snapshot Store, Simulation Core, Registry
**Configuration**: maximum replay span before an older snapshot is preferred
**FOSS / Vendor**: FOSS, first-party
**VCC Conditions**: AC4, AC5, AC6
**Evidence References**: none recorded
**Readiness rung**: Local: `spec-complete` / Delivered: `undocumented`

**Component**: `TAD-AGOS-LEASE` — World Lease Arbiter
**Responsibility**: Arbiter grants at most one write lease per world identity and epoch.
**Interfaces**: `acquire(worldIdentity, sessionId): Lease | Conflict` | `renew(lease): Lease` | `release(lease): void`
**Dependencies**: device-local durable store with a compare-and-set primitive
**Configuration**: lease duration and renewal window
**FOSS / Vendor**: FOSS, first-party
**VCC Conditions**: AC7
**Evidence References**: none recorded
**Readiness rung**: Local: `spec-complete` / Delivered: `undocumented`

**Component**: `TAD-AGOS-STRATEGY` — Persistent Strategy World mode
**Responsibility**: Mode defines territory, economy, and unit-order rules as deterministic state transitions over the Simulation Core.
**Interfaces**: mode declaration conforming to the Registry contract; `applyOrders(state, orders): state`
**Dependencies**: Registry, Arbiter, Simulation Core, Asset Provenance Gate
**Configuration**: world definition (map profile, faction parameters, objectives) as typed local data
**FOSS / Vendor**: FOSS, first-party; no external simulation, pathfinding, or behaviour library (ADR-4)
**VCC Conditions**: AC1, AC2, AC3
**Evidence References**: none recorded
**Readiness rung**: Local: `spec-complete` / Delivered: `undocumented`

**Component**: `TAD-AGOS-ASSETS` — Asset Provenance Gate
**Responsibility**: Gate admits only committed local assets carrying a provenance record with a redistributable licence.
**Interfaces**: `resolve(assetRef): AssetHandle | TypedError`
**Dependencies**: committed local asset set
**Configuration**: allow-listed licence identifiers
**FOSS / Vendor**: FOSS, first-party
**VCC Conditions**: AC11
**Evidence References**: none recorded
**Readiness rung**: Local: `spec-complete` / Delivered: `undocumented`

**Component**: `TAD-AGOS-STATUS` — Game OS Status Surface
**Responsibility**: Surface aggregates registry, continuity, lease, and determinism state at read time without mutation.
**Interfaces**: `status(view): StatusResponse` with `view` in `registered_modes | world_continuity | lease_state | determinism_digest | cost_summary`
**Dependencies**: Registry, Journal, Lease Arbiter
**Configuration**: none; read-time aggregation only, no new persistent store
**FOSS / Vendor**: FOSS, first-party
**Harness Contract**: not a model harness; typed I/O and a zero cost record are required for observability parity
  - Input schema: `{ view }`
  - Output schema: `{ view, entries[], unavailableSources[], costRecord }`
  - Cost log fields: `{ model, prompt_tokens, completion_tokens, cache_hits, estimated_cost_usd }`
  - Fallback path: name the unreadable source in `unavailableSources[]`; the call still succeeds
**Token Budget**: 0 + 0 = $0.00/call
**Orchestration Topology**: Sequential, max 1 iteration, circuit-breaker: not applicable
**VCC Conditions**: AC10
**Evidence References**: none recorded
**Readiness rung**: Local: `spec-complete` / Delivered: `undocumented`

**Component**: `TAD-AGOS-ASSIST` — World Authoring Assist Harness
**Responsibility**: Harness converts an operator authoring request into a schema-valid candidate world definition.
**Interfaces**: `draft(request: WorldDraftRequest): WorldDefinitionDraft | TypedError`
**Dependencies**: a model transport; Cost Observer; World Definition Store
**Configuration**: model identity, per-session token budget, iteration bound
**FOSS / Vendor**: model transport is pluggable; see ADR-2 rationale on keeping it off the play path
**Harness Contract**:
  - Input schema: `{ intent, constraints[], seedProfile }`
  - Output schema: `{ definition, validationReport }`
  - Cost log fields: `{ model, prompt_tokens, completion_tokens, cache_hits, estimated_cost_usd }`
  - Fallback path: last valid partial draft plus an iteration-limit error
**Token Budget**: 1,800 + 900 @ 0.60 cache = est. $0.004/call
**Orchestration Topology**: Agentic loop, max 3 iterations, circuit-breaker: no reduction in schema-validation failures across two consecutive iterations
**VCC Conditions**: AC8 (negative condition: this component must not be reachable from the play loop)
**Evidence References**: none recorded
**Readiness rung**: Local: `spec-complete` / Delivered: `undocumented`

### Integration Contracts

**Interface**: mode registration | **Protocol**: in-process typed call | **Format**: typed declaration record | **Errors**: typed union (`duplicate_identity`, `invalid_declaration`, `surface_unavailable`)

**Interface**: world continuity commit | **Protocol**: device-local durable append | **Format**: canonical order and snapshot records | **Errors**: typed union (`lease_lost`, `store_unavailable`, `record_malformed`, `digest_mismatch`)

**Interface**: status read | **Protocol**: in-process typed call and tool-surface route | **Format**: typed status response | **Errors**: partial success with `unavailableSources[]`; never a raw exception

### Architectural Decisions

See ADR-1 (declared mode registry), ADR-2 (continuity substrate), ADR-3 (networked shared-world deferral), and ADR-4 (native in-repo simulation) below.

### Quality Attributes

| Attribute | Scenario | Pattern | Validation |
|---|---|---|---|
| Performance | A world at target entity count → fixed step completes within its budget on a mid-tier mobile browser | Fixed step with bounded catch-up; structure-of-arrays component storage | Step-duration percentile sampling on a mobile profile |
| Scalability | Journal grows across a long-lived world → restore latency stays bounded | Periodic canonical snapshot bounds the replay span | Restore-latency test across increasing journal lengths |
| Security | Untrusted local records → must not silently become live world state | Fail-closed restore with digest proof; bytes preserved on error | Fail-closed restore test with malformed and truncated records |
| Observability | Continuity, lease, and determinism state must be visible without log-diving | Read-time status aggregation with explicit unavailable sources | Status-surface schema and no-mutation assertions |
| Token Cost | Play loop must never spend a token | Deterministic simulation; no model transport reachable from the play path | Zero cost record asserted per step; reachability assertion on the play path |
| Offline Behaviour | Connectivity loss → open, play, commit, close, and reopen all remain available | Device-local storage with no reconciliation dependency; no outbound call in the play path | Airplane-mode-equivalent pass with outbound request count asserted at 0 |
| TCO | 12-month projected spend across deployment models vs the zero-TCO target | Device-local storage only; no provisioned runtime; see ADR-2 | Monthly cost audit; ADR review |
| Device Reach | Target mix is mobile-first browsers plus desktop and spatial browsers → one code path, no native-only capability required for play | Responsive control projection; capability-negotiated spatial entry with a non-spatial fallback | Cross-device manual pass including a mobile browser and a spatial browser profile |

### Deployment Strategy

The Game OS layer ships behind a mode-registration flag inside the existing application bundle: registering zero modes leaves the surface behaviourally unchanged, which is the rollback path. The Persistent Strategy World mode ships flagged `experimental` until AC3 and AC4 carry recorded results. No provisioned service is introduced, so there is no server-side rollout stage; promotion is bundle promotion, gated at the Deploy Boundary Register below.

### Architecture Diagrams

See the Topology diagram above (Mermaid `flowchart TB`, subgraphs per boundary).

### Component Inventory

*Status values are Readiness Ladder rungs only; local and delivered are separate columns. Module paths are deliberately absent here: this document is neutral, and path-derived claims are forbidden. The reference-implementation section below maps these components onto a concrete workspace.*

| Layer | Component | File / Module | Local rung | Delivered rung |
|---|---|---|---|---|
| Registration | `TAD-AGOS-REGISTRY` Game Mode Registry | declared in the reference-implementation mapping | `spec-complete` | `undocumented` |
| Surface | `TAD-AGOS-ARBITER` Surface Ownership Arbiter | declared in the reference-implementation mapping | `spec-complete` | `undocumented` |
| Simulation | `TAD-AGOS-SIM` Deterministic Simulation Core | declared in the reference-implementation mapping | `spec-complete` | `undocumented` |
| Continuity | `TAD-AGOS-JOURNAL` World Continuity Journal | declared in the reference-implementation mapping | `spec-complete` | `undocumented` |
| Continuity | `TAD-AGOS-RESTORE` Continuity Restore Adapter | declared in the reference-implementation mapping | `spec-complete` | `undocumented` |
| Coordination | `TAD-AGOS-LEASE` World Lease Arbiter | declared in the reference-implementation mapping | `spec-complete` | `undocumented` |
| Gameplay | `TAD-AGOS-STRATEGY` Persistent Strategy World | declared in the reference-implementation mapping | `spec-complete` | `undocumented` |
| Assets | `TAD-AGOS-ASSETS` Asset Provenance Gate | declared in the reference-implementation mapping | `spec-complete` | `undocumented` |
| Observability | `TAD-AGOS-STATUS` Game OS Status Surface | declared in the reference-implementation mapping | `spec-complete` | `undocumented` |
| Authoring | `TAD-AGOS-ASSIST` World Authoring Assist Harness | declared in the reference-implementation mapping | `spec-complete` | `undocumented` |

### Deploy Boundary Register

*One row per boundary. State reads `closed` unless an operator instruction is referenced.*

| Boundary | From lane | To lane | Evidence Reference | Operator instruction | Rollback statement | State |
|---|---|---|---|---|---|---|
| `game-os-mirror-promote` | Authoring | Mirror | none recorded | none | Republish the prior approved mirror package; verify its recorded digest | `closed` |
| `game-os-delivery-promote` | Mirror | Delivery | none recorded | none | Republish the prior delivered package; register zero modes to restore prior surface behaviour | `closed` |

No authoring-lane command in this architecture writes to a mirror or delivery surface; world data never leaves the device lane, so a promotion cannot carry player state.

---

## Invocation Register: Agentic Game OS

| Route | Kind | Owner | Typed arguments | Trust boundary | Token cost |
|---|---|---|---|---|---|
| `/world` | Command | Invocation Parser | `operation` enum: `open`, `resume`, `order`, `commit`, `reset`, `close` | Device-local; mutating operations require an explicit player action | 0 |
| `@game-os` | Binding | Invocation Parser | — | Read-only surface selection | 0 |
| `#persistent-world` | Tag | Invocation Parser | — | Read-only context selection | 0 |
| `[ns].inspect_game_os` | Tool identity | Game OS Status Surface | `{ view }` → `StatusResponse` | Device-local read | 0 |
| `[ns].control_local_world` | Tool identity | Invocation Parser | native invocation or `{ operation }` → `OperationResult` | Device-local, action-gated mutation | 0 |

**Directives applied**: this register is the single declaration site for all five routes. Both tool identities are contributed to the Gateway Federation entry below and to the capability catalog through the existing embedded tool-surface registration, satisfying the federated-and-catalogued requirement. Every route is zero-cost: no read or control route in this increment reaches the metered Authoring Assist Harness, which is invoked only through the operator authoring path and is deliberately not registered as a route here.

## Gateway Federation: Agentic Game OS

**Surfaces in federation**: 1 — the existing embedded device-local tool surface. **Catalog union source**: the existing capability catalog view. **Routing rule**: read views and action-gated local mutations route to the embedded device-local surface; no remote transport is added. **Excluded**: a monolithic proxy tier; adding one would require its own ADR (see ADR-2 rationale on avoiding new tiers).

Because exactly one transport participates, the two-or-more-transport condition that would require a federation-versus-unified-proxy comparison does not hold, and none is produced.

---

## Agent-Platform Readiness

**Dimensions in scope**: Agentic OS-ready is in scope at Must-adjacent priority; AI Agent-ready is in scope for the device-local surface only; MCP Gateway-ready is not applicable this increment.

- **Agentic OS-ready** — `Should` tier. The Game OS Status Surface is the OS Status Surface for this capability: read-only, read-time aggregation over registry, journal, lease, and determinism state, $0 per view, with `unavailableSources[]` for partial failure. It adds no persistent store and exposes no write path. Local rung `spec-complete`; delivered rung `undocumented`.
- **AI Agent-ready** — `Should` tier, device-local scope. Both tool identities are typed, catalogued, and discoverable through the existing embedded surface, so an external tool-calling client selects them without scraping a UI. No remote onboarding path is in scope; claiming one would be the ambiguous agent-ready claim the guidelines forbid.
- **MCP Gateway-ready** — not applicable. One transport participates; the federation contract above records that fact rather than implying a gateway tier exists.

---

## Readiness Gap Matrix

*Local rung and delivered rung are separate columns; both draw from the Readiness Ladder. Priority is the highest severity among the findings linked to that workstream, or `none`.*

| Workstream | Local rung | Delivered rung | Gap | Priority | Exit criteria (VCC) |
|---|---|---|---|---|---|
| Game Mode Registry and Arbiter | `spec-complete` | `undocumented` | No Evidence Reference recorded | none | AC1, AC2 pass with recorded results |
| Deterministic Simulation Core | `spec-complete` | `undocumented` | Canonical encoder stability across engine versions unresolved | none | AC3 passes; encoder question closed or formally tracked |
| World Continuity Journal | `spec-complete` | `undocumented` | Snapshot interval and retention policy unfrozen | none | AC4, AC6 pass; interval trade-off measured |
| Continuity Restore Adapter | `spec-complete` | `undocumented` | No Evidence Reference recorded | none | AC4, AC6 pass with digest match reported |
| World Lease Arbiter | `spec-complete` | `undocumented` | Lease granularity question open | none | AC7 passes with a typed conflict for the second writer |
| Persistent Strategy World | `spec-complete` | `undocumented` | No Evidence Reference recorded | none | AC1, AC2, AC3 pass for the registered mode |
| Asset Provenance Gate | `spec-complete` | `undocumented` | Licence allow-list not yet enumerated | none | AC11 passes with zero unlicensed assets |
| Game OS Status Surface | `spec-complete` | `undocumented` | No Evidence Reference recorded | none | AC10 passes with an empty before/after diff |
| Authoring Assist Harness | `spec-complete` | `undocumented` | No Evidence Reference recorded | none | Play-path reachability assertion plus AC8 |
| Offline and device reach | `spec-complete` | `undocumented` | No clean-device pass recorded | none | AC5 passes; cross-device manual pass recorded |

---

## ADR-1: Declared Mode Registry Instead of a Shared Mode-Identifier Union

**Status**: Accepted
**Date**: 2026-08-08

### Context

Play modes are currently admitted by widening a hand-maintained union of surface identifiers and by hand-wiring each mode's activation, exit, input, and persistence path. Every new mode therefore edits shared code that all sibling modes depend on, and the obligations a mode must satisfy are discoverable only by imitating an existing mode. The integration cost dominates the gameplay cost, and cross-mode regression risk grows with mode count.

### Decision

Introduce a declared registration contract. A mode supplies its identity, surface contract, exit handler, input adapter, and world schema in one declaration; the Registry admits at most one mode per identity and resolves activation. The shared identifier union is removed rather than wrapped.

### Alternatives Considered

1. **Keep the shared union, add a lint rule**: pros — zero new abstraction, no migration; cons — the coupling and the discovery problem both remain, and a lint rule cannot express the exit-handler or persistence obligations.
2. **FOSS alternative — adopt a general plugin framework**: pros — registration, lifecycle, and dependency resolution arrive ready-made; cons — a framework's lifecycle model must be reconciled with the existing single-scene-surface arbitration, adding a second source of truth for who owns the surface; the framework's own surface area exceeds the contract being replaced.
3. **Per-mode independent activation with no arbiter**: pros — maximum mode autonomy; cons — nothing guarantees one live overlay, which is the specific defect AC2 exists to prevent.

### Rationale

The obligations are few and specific to one arbitrated surface, so a declared first-party contract is smaller than any framework that could host it, and it keeps one owner for surface arbitration. Option 1 preserves the exact coupling the decision targets. Option 3 trades a solvable wiring problem for an unsolvable ownership problem.

### TCO Impact

| Dimension | Chosen Option (first-party declared registry) | Best FOSS Alternative (general plugin framework, self-managed) | Delta / 12 months |
|---|---|---|---|
| Infra cost | $0/mo | $0/mo | $0 |
| Egress cost | $0/mo | $0/mo | $0 |
| Token cost | $0/mo | $0/mo | $0 |
| Ops burden | Low — one contract, no external upgrade cadence | Medium — framework upgrades, lifecycle reconciliation with the surface arbiter | — |
| Vendor risk | Low | Low | — |

### Consequences

- **Positive**: adding a mode is additive and local; obligations are stated rather than imitated; sibling modes are untouched by construction.
- **Negative**: existing modes must migrate onto the contract, and the migration is a prerequisite for AC1.
- **Neutral**: mode count no longer appears in shared code, so mode inventory must be read from the status surface instead of from a source list.

## ADR-2: Device-Local Journal Plus Snapshot as the Continuity Substrate

**Status**: Accepted
**Date**: 2026-08-08

### Context

Cross-session continuity requires durable world state. The existing persistence path writes only narrow validated decisions and treats simulation state as ephemeral, which cannot restore a world. A substrate must be chosen that satisfies offline-first play, zero infrastructure cost, mobile-first storage limits, and the replay-determinism property AC3 asserts.

### Decision

Persist an append-only journal of accepted orders plus periodic canonical snapshots to device-local durable storage, and restore by loading the newest valid snapshot and replaying the journal tail. Guard writes with a single-writer lease. Introduce no remote store and no provisioned runtime.

### Alternatives Considered

1. **Snapshot-only persistence**: pros — simplest restore, no replay; cons — any order between snapshots is lost, so the acknowledged-order guarantee in the Ingest stage cannot hold.
2. **FOSS alternative — self-managed remote authoritative store, provisioned**: pros — enables cross-device continuity and a future shared world; cons — introduces idle cost, an operations burden, a network precondition for a single-player world, and an availability dependency that contradicts offline-first.
3. **FOSS alternative — remote store, managed/serverless variant**: pros — scales to zero, near-zero ops; cons — still makes a network round-trip a precondition for restore and adds egress and per-request cost to a capability that needs neither.
4. **Conflict-replicated document type over world state**: pros — merge semantics for concurrent writers; cons — solves a problem this increment explicitly defers (ADR-3), and convergent merge is not equivalent to deterministic replay, so AC3 would be weakened to satisfy a deferred requirement.

### Rationale

Journal plus snapshot is the only option that satisfies acknowledged-order durability, deterministic replay, and offline-first simultaneously, at zero cost. Both remote variants are evaluated and rejected on the same ground: they make connectivity a precondition for a player's own single-player world. The replicated-document option is deferred with its use case in ADR-3 rather than adopted speculatively.

### TCO Impact

| Dimension | Chosen Option (device-local, no runtime) | Best FOSS Alternative (self-managed remote store, provisioned) | Best FOSS Alternative (remote store, managed/serverless) | Delta / 12 months |
|---|---|---|---|---|
| Infra cost | $0/mo | ~$12/mo (smallest always-on instance) | $0/mo at scale-to-zero | +$144 provisioned; $0 managed |
| Egress cost | $0/mo | ~$0–3/mo | ~$0–2/mo | +$0–36 |
| Token cost | $0/mo | $0/mo | $0/mo | $0 |
| Ops burden | Low — no service to operate; storage-ceiling policy only | High — patching, backup, failover, capacity planning | Low — provider-operated | — |
| Vendor risk | Low | Low | Medium — per-request pricing and availability coupling | — |

*Hybrid/consolidated note: the provisioned variant's $12/mo is a shared-runtime figure already, since an existing host could absorb it; the unconsolidated per-service sum would be higher. Consolidation reduces its cost but not its network precondition, which is the disqualifying property.*

### Consequences

- **Positive**: zero infrastructure cost; play and restore work offline; deterministic replay is preserved and provable.
- **Negative**: continuity is device-local, so a player switching devices does not carry a world; storage ceiling and retention policy become real constraints.
- **Neutral**: a future cross-device or shared-world increment can treat the journal as its input, because an order journal is the natural input to a replicated log.

## ADR-3: Defer Networked Shared-World Play With a Named Reopening Gate

**Status**: Accepted
**Date**: 2026-08-08

### Context

A persistent strategy world invites a networked shared world: concurrent players, an authoritative remote tick, shared persistence, and interest management. Each of those requires a provisioned always-on runtime, per-player identity and entity ownership, anti-cheat boundaries, and replication filtering. All four contradict the zero-infrastructure, offline-first, and device-local constraints this document is built on, and the aggregate build cost places the item well below the ROI threshold.

### Decision

Scope this increment to single-writer persistent worlds with real cross-session continuity, and record networked shared-world play as an explicit `Won't (this increment)`. Reopening requires all of: a recorded ROI recomputation above threshold at then-current reach, an accepted ADR selecting a substrate, an explicit operator authorization, and a stated anti-cheat and entity-ownership model. Absent all four, any networked path fails closed rather than degrading quietly.

### Alternatives Considered

1. **Build a minimal two-peer shared world over a peer-to-peer transport**: pros — no server, reuses an existing peer transport; cons — manual out-of-band session exchange, no authority, no anti-cheat, and it establishes a shared-world contract that the deferred design would have to break.
2. **FOSS alternative — self-managed authoritative world server, provisioned**: pros — a real shared world with a single authority; cons — always-on cost, full operations burden, and it makes a network a precondition for play, which AC5 forbids.
3. **Ship continuity and shared world together**: pros — one migration for players; cons — couples a provable Must-tier item to an unprovable one and delays all continuity value behind the largest unknown in the design.

### Rationale

Deferral here is a scope decision, not an omission: the constraint set and the ROI computation both point the same way, and the reopening gate is named so the deferral cannot be quietly reversed. Option 1 is the most tempting and the most costly, because a throwaway shared-world contract is harder to retire than to never ship.

### TCO Impact

| Dimension | Chosen Option (defer; single-writer persistence) | Best FOSS Alternative (self-managed authoritative server, provisioned) | Best FOSS Alternative (same, hybrid/consolidated) | Delta / 12 months |
|---|---|---|---|---|
| Infra cost | $0/mo | ~$25/mo | ~$12/mo incremental on an existing host | +$300 / +$144 |
| Egress cost | $0/mo | ~$5/mo at demo load | ~$5/mo | +$60 |
| Token cost | $0/mo | $0/mo | $0/mo | $0 |
| Ops burden | Low | High — uptime, state migration, abuse handling | High — same duties, one fewer host | — |
| Vendor risk | Low | Low | Low | — |

### Consequences

- **Positive**: the increment stays offline-first and zero-cost; continuity ships without waiting on the hardest unknown.
- **Negative**: no shared-world play, so the strategy mode is competitive only against deterministic scenarios, not other players.
- **Neutral**: the order journal chosen in ADR-2 remains the natural input to a future replicated design, so the deferral does not strand work.

## ADR-4: Native In-Repo Simulation Instead of an External Engine Dependency

**Status**: Accepted
**Date**: 2026-08-08

### Context

A strategy world needs movement resolution, collision, unit ordering, and eventually route-finding. Mature external engines exist for each. The design also requires byte-equivalent replay across two independent runtimes (AC3), a zero-dependency play hot path, and a bundle small enough for a mobile browser first load inside the time-to-value ceiling.

### Decision

Implement movement, collision resolution, order arbitration, and route-finding as first-party deterministic functions over the existing entity-component simulation. Take no runtime or build dependency on an external simulation, physics, behaviour-tree, or navigation-mesh library. Where an external project informs the design, treat it as inspiration only: no source is copied, no dependency is added, and no external identity is embedded in the runtime.

### Alternatives Considered

1. **FOSS alternative — adopt an established physics or navigation library**: pros — mature, well-tested, saves substantial build hours; cons — determinism across versions and platforms is not contractually guaranteed by most such libraries, which directly threatens AC3; bundle weight competes with the mobile time-to-value ceiling; the dependency lands on the play hot path where the design requires zero external surface.
2. **FOSS alternative — adopt an established entity-component framework**: pros — proven storage and query performance; cons — duplicates the existing simulation, creating exactly the second source of truth the design forbids.
3. **Hybrid: external library behind a determinism-normalizing adapter**: pros — reuse plus a determinism seam; cons — the adapter must reproduce the library's numerics to be trustworthy, which is most of the cost of the first-party implementation plus the cost of the dependency.

### Rationale

The binding constraint is not capability but determinism plus bundle weight on the play hot path, and neither is something an external dependency can be made to guarantee cheaply. Option 3 shows why: normalizing someone else's numerics costs about what implementing the needed subset costs, and leaves the dependency in place. The scope is deliberately narrow — a needed subset, not a general engine.

### TCO Impact

| Dimension | Chosen Option (first-party deterministic subset) | Best FOSS Alternative (external physics/navigation library, self-managed in-bundle) | Delta / 12 months |
|---|---|---|---|
| Infra cost | $0/mo | $0/mo | $0 |
| Egress cost | $0/mo | $0/mo (larger first load; no metered egress at current delivery) | $0 |
| Token cost | $0/mo | $0/mo | $0 |
| Ops burden | Medium — first-party correctness is the team's own | Medium — upgrade cadence, determinism regression watch, bundle-size watch | — |
| Vendor risk | Low | Low licence risk; Medium determinism risk against AC3 | — |

### Consequences

- **Positive**: replay determinism is a property the implementation owns and can prove; play hot path carries no external dependency; bundle stays within the mobile first-load budget.
- **Negative**: movement, collision, and route-finding correctness are first-party obligations, and route-finding in particular is a real build cost that does not exist today.
- **Neutral**: the narrow scope means capability parity with a general engine is not a goal; broader physical simulation would need its own decision.

---

## Reference Implementation: Mapping Onto the Current Workspace

*Non-binding. Everything in this section is a concrete stand-in for the neutral contract above and may be replaced without changing any requirement, acceptance criterion, or ADR. Paths are workspace-relative; no absolute or machine-specific path is recorded.*

The current stack already supplies four of the ten components' substrates, which is why the ROI figures above are as favourable as they are:

| Neutral component | Existing substrate in this workspace | Status of the substrate |
|---|---|---|
| `TAD-AGOS-ARBITER` Surface Ownership Arbiter | The shared scene-surface activation owner and its gameplay exit-handler registry, plus the surface-ownership transaction gate | Exists; enforces one live gameplay overlay today |
| `TAD-AGOS-REGISTRY` Game Mode Registry | The same module's hand-maintained union of surface identifiers | Exists as a union, not a registry; this is the migration ADR-1 targets |
| `TAD-AGOS-SIM` Deterministic Simulation Core | The repository-root entity-component simulation package with its fixed-step world tick, component stores, and in-memory snapshot primitive | Exists; snapshot is in-memory only |
| `TAD-AGOS-JOURNAL` World Continuity Journal | The device-local browser storage layer with its document, revision, and outbox collections | Exists; used for documents, not world state |
| `TAD-AGOS-ASSETS` Asset Provenance Gate | Specified but absent | Planned contract only |
| `TAD-AGOS-STATUS`, `TAD-AGOS-STRATEGY`, `TAD-AGOS-RESTORE`, `TAD-AGOS-LEASE`, `TAD-AGOS-ASSIST` | Specified but absent | Planned contract only |

Placement rules for this workspace: all game logic, simulation, continuity, and backend utilities live in the shared runtime repository; the separate spatial game client differs only in frontend and visuals and consumes the shared runtime as a pinned upstream, contributing no second simulation, registry, or world store. The three existing play modes — a first-person mode, a flight mode, and a city-building mode — are the migration cohort for ADR-1, and the existing panel projections must remain control-only, never owning a scene or a renderer canvas.

A prior planned contract in this workspace already ratified an offline single-player world with networked play deferred and a remote realtime backend forbidden. ADR-3 is consistent with it and supersedes nothing: it adds the named reopening gate that contract left implicit. Two inconsistencies in the current workspace are recorded here as tracked items rather than silently inherited: world seeds for an unbuilt mode are registered in the canonical seed bundle, and one play mode occupies the generic `gameMode` identifier, which the Registry migration should retire in favour of a specific identity.

## Reference Implementation: Spatial-Platform Compatibility and End-to-End Verification

*Non-binding. Names a concrete platform family and toolchain as the current verification target; any equivalent target satisfies the same criteria.*

The device-reach quality attribute is validated on three browser profiles: a mobile browser, a desktop browser, and a spatial browser. Spatial entry is capability-negotiated through the existing immersive-session owner, which is the single place a session is requested; a profile that reports no immersive support receives the non-immersive projection and remains fully playable, so no acceptance criterion depends on immersive capability.

For the current Apple platform target, compatibility is maintained against the latest iOS, visionOS, and Safari releases, and against the current RealityKit, Reality Composer, Swift, and SwiftUI versions for the native parity package. The existing golden-test parity suite between the browser simulation and the native Swift core is the pattern the Deterministic Simulation Core extends: the same fixed-step contract, proven on both sides. End-to-end verification uses the platform simulator through Xcode plus the three browser profiles above; a spatial pass is recorded as an Evidence Reference on the device-reach workstream, and its absence is why that workstream's delivered rung reads `undocumented`. Camera and motion-control input reach the world only through the existing normalized input adapter, never as a mode-local capture path, so platform permission behaviour has exactly one owner.

---

## Conformance & Alignment Note

**Coverage**: every artifact-bearing rule this document is subject to names its artifact here — frontmatter with all five conformance keys; five flow patterns; a time-to-value block; ROI per MoSCoW row; a topology with labelled connections and stated residency per store; component specifications with VCCs, Evidence References, and derived rungs; an invocation register; a federation entry; a readiness gap matrix; a deploy boundary register; four ADRs each with a FOSS alternative and a deployment-model-separated TCO table; and this note. Linked artifact-bearing rules over total: **34 / 34**. Advisory rules encountered and not counted as artifacts: **11**.

**Derived, not authored**: every rung in this document is `spec-complete` locally and `undocumented` as delivered because no Evidence Reference exists yet. That is the correct derivation for a document written before implementation, and it is the reason no `runtime-ready` claim appears anywhere above.

**Findings**: zero `blocker` findings. Open `major`-eligible items are the four Open Questions and the two workspace inconsistencies recorded in the reference-implementation mapping; all six are formally tracked above rather than resolved here. Every other Finding Type in the enumeration has a zero count for this document.

**Bounds**: the only model-bearing loop is the Authoring Assist Harness at max 3 iterations with a stated circuit-breaker. The play loop contains no model call and no unbounded retry. The Phase 4 revision cycle for this document is bounded at 3 cycles with the default circuit-breaker: no reduction in open `blocker` findings across two consecutive cycles.

**Evaluator independence**: every VCC above is written to be judged by a check the implementer does not adjudicate — a test suite exit code, an asserted count, a byte-equality comparison, or a before/after diff. No criterion is satisfied by reading a narrative claim, including the claims in this document.
