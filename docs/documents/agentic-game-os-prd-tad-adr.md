---
title: "Agentic Game OS — Persistent Strategy and Shared-World Reopening — PRD/TAD/ADR"
doc_type: "Combined PRD/TAD/ADR"
version: "1.1.0"
date: "2026-08-08"
updated: "2026-08-09"
lang: "en-US"
frontmatter_contract: "required"
owner: "Solo Founder / AI Orchestrator"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
evidence_rung: "source-reviewed"
runtime_claim: "none"
foss_policy: "FOSS-first software; managed services require a separate provider, TCO, egress, lock-in, privacy, and exit decision"
infrastructure_policy: "device-local zero-remote-infrastructure by default; shared authority is an optional metered adapter"
token_policy: "zero model calls on the deterministic play hot path"
research_input_digest: "sha256:5fb8f9f4a0c4bc6d7e96866ff5224cbb46f937368f8f22bb9de49f8fc94e2309"
---

# Agentic Game OS — Persistent Strategy and Shared-World Reopening — PRD/TAD/ADR

Governed by PRD, TAD & ADR Guidelines v1.7.0 (2026-07-28). The Agentic SDLC Guidelines separately own task decomposition, tool blast radius, verification, integration, and release.

Status boundary: this is a spec-complete source contract. It is not an implementation receipt, protected integration result, browser result, Xcode or Simulator result, physical-device result, Production authorization, or Cloudflare deployment result. Present-tense criteria describe required behavior, not observed behavior. Every Evidence Reference remains none recorded.

Neutrality boundary: universal capabilities, schemas, acceptance criteria, and decisions are provider- and repository-neutral. Concrete products, paths, commands, and hosts appear only in sections titled Reference Implementation.

## Version History

v1.1.0 (2026-08-09):

- Distinguished active network-offline play, cross-session continuity, and player-absent progression.
- Added the RTS first slice, bounded catch-up, pathfinding, typed multimodal input, dependency/SBOM, FOSS, TCO, and renderer-parity contracts.
- Preserved device-local single-writer authority while defining a gated provider-neutral shared-authority reopening path.
- Added non-binding Agentic Graph, GameXR, Dev, generated-Prod, Cloudflare, browser, and Apple-native mapping.
- Removed repeated component narratives and fixed-price assumptions; one table now owns each contract.

v1.0.0 (2026-08-08):

- Established the declared mode registry, deterministic simulation, device-local journal and snapshots, restore adapter, world lease, status surface, and first Persistent Strategy consumer.
- Deferred networked shared-world play behind a named reopening gate.

## Feature: Agentic Game OS

### Problem Statement

Adding a play mode currently widens shared identifiers and repeats activation, input, camera, persistence, and exit wiring. World state is also ephemeral, so closing a surface discards player investment. The required Game OS layer makes modes additive, arbitrates one shared 3D surface, and gives every committed world deterministic local continuity at zero required network, infrastructure, and model-token cost.

The first value slice is a persistent strategy world, not a persistence demo: territory, one resource, one base, bounded deterministic routing, unit movement, and bounded catch-up on reopen. Deeper local RTS systems follow only after the slice is proven. Shared MMO authority remains a separate later rung.

### Terms That Must Not Be Conflated

| Term | Required meaning |
|---|---|
| Active network-offline play | A person actively plays while the network is unavailable; required state and assets remain local |
| Cross-session continuity | Closing and reopening restores the last committed deterministic state in the same device and browser-storage profile |
| Player-absent progression | A recorded elapsed-duration input becomes bounded deterministic catch-up steps on reopen, or is later advanced by an optional authoritative scheduler |
| Shared world | Multiple clients observe one authoritative shard history; local persistence does not imply this capability |
| Device-local zero remote infrastructure | No remote compute, database, object store, scheduler, account, or network dependency is required |
| Zero provisioned infrastructure | A provider may operate remote services, while usage, storage, operations, and egress remain potentially metered |
| FOSS software | Software licensing permits the intended use and redistribution; a proprietary managed service is not made FOSS by using FOSS-compatible APIs |
| Runtime-ready | Exact source, executable checks, runtime evidence, and the relevant delivery boundary agree |

Offline progression is not an acceptance term. Requirements must name bounded local catch-up or remotely scheduled authoritative progression.

### Personas

| Persona | Jobs-to-be-done |
|---|---|
| Returning Strategist | Reopen a world in the same device and browser-storage profile, resume exact territory, economy, base, and unit state, issue orders offline, and retain committed progress |
| Solo Founder / AI Orchestrator | Register game families without shared-union edits, reuse one core and one scene owner, keep the hot path deterministic, and control TCO, token, licence, and vendor risk |
| External Agent | Discover one typed status surface and issue bounded commands without scraping the UI or learning each mode's internals |

### User Stories

- PRD-AGOS-1: A mode registers through one declaration without editing a shared identifier union.
- PRD-AGOS-2: A committed world restores to its last verified state in the same local storage profile.
- PRD-AGOS-3: Open, play, commit, close, and reopen work with the network disabled.
- PRD-AGOS-4: Corrupt or partial state is named and preserved rather than silently replaced.
- PRD-AGOS-5: Exactly one writer mutates a world or authoritative shard at a time.
- PRD-AGOS-6: Deterministic play makes zero model calls and emits zero model tokens.
- PRD-AGOS-7: Agents use one typed read surface and one bounded control route.
- PRD-AGOS-8: Assets and software dependencies carry provenance and admissible licences.
- PRD-AGOS-9: Recorded elapsed time produces bounded deterministic catch-up on reopen.
- PRD-AGOS-10: The first slice includes territory, one resource, one base, deterministic routing, and unit movement.
- PRD-AGOS-11: Pointer, touch, keyboard, and admitted sensing adapters emit one GameCommand before mutation.
- PRD-AGOS-12: Managed adapters require dated workload, TCO, privacy, residency, egress, lock-in, recovery, and exit evidence.

### Acceptance Criteria and Independent VCCs

| ID | Required behavior | Independent verification condition |
|---|---|---|
| AC1 | A valid declaration registers one activatable mode; duplicate or unknown identities fail closed; no shared mode union remains | Registry conformance exits 0 and asserts one mode per identity plus typed duplicate and unknown rejection |
| AC2 | Activating a new mode runs the incumbent exit exactly once and leaves exactly one live gameplay overlay | Surface-arbitration suite exits 0 and asserts exit count 1 and live-overlay count 1 |
| AC3 | The same seed, commands, and fixed steps produce byte-equivalent canonical state in two fresh runtimes | Determinism suite exits 0 and reports identical canonical digests |
| AC4 | Reopen restores the last committed tick and reports the matching tick and digest | Continuity round trip exits 0 and matches pre-close digest and tick |
| AC5 | With transport disabled, open, play, commit, close, and reopen complete with zero outbound requests | Offline suite exits 0 with outbound count 0 and successful restore |
| AC6 | Malformed, truncated, future-version, or digest-mismatched records create no world, preserve bytes, name the record, and expose explicit reset | Fail-closed restore exits 0, asserts creation count 0 and byte-identical storage |
| AC7 | A second writer receives a typed conflict and cannot change the incumbent journal | Lease suite exits 0 and proves the journal is unchanged |
| AC8 | Every unassisted fixed step emits one complete zero-cost record with null model and zero token fields | Cost suite exits 0 and asserts one zero record per step |
| AC9 | Invocation accepts only declared routes, bindings, tags, arguments, and operations | Grammar suite exits 0 and rejects duplicate sigils, unknown keys, and undeclared operations |
| AC10 | Assets resolve to committed local files with origin, digest, and redistributable licence; load performs no fetch or generation | Asset gate exits 0, covers every asset, rejects missing or disallowed licences, and records zero outbound loads |
| AC11 | Elapsed duration is recorded, capped, quantized to integer catch-up steps, replayed through the reducer, and committed with cap reason and digest | Catch-up suite exits 0, never exceeds the cap, and reproduces a byte-identical digest |
| AC12 | Territory claim, base construction, resource gathering, and unit movement reach declared expected state | Strategy-slice suite exits 0 and two fresh replays reach equal final state |
| AC13 | Same map, obstacle revision, start, goal, and budget produce one canonical route digest; unreachable and budget exhaustion are typed and non-mutating | Pathfinding suite exits 0, proves stable tie-breaking, equal replay, typed failures, P95 latency, and peak memory |
| AC14 | Every input adapter emits a schema-valid GameCommand before mutation; unsupported, denied, cancelled, or low-confidence input is typed and non-mutating | Adapter suite exits 0, proves command equivalence and keyboard or touch fallback for every required action |
| AC15 | Packages, WASM, models, datasets, and build artifacts have exact identity, provenance, direct and transitive licences, reproducible digests, budgets, and disposal obligations | Supply-chain suite exits 0 and lockfile-derived SBOM coverage equals the dependency closure |
| AC16 | A proposed shared adapter proves one writer per shard, reconnect, fencing, backpressure, idempotent wake, backup, restore, quotas, spend ceiling, and provider exit before reopening | Provider-neutral integration suite exits 0 and joins exact workload, cost, recovery, privacy, and export evidence |
| AC17 | Browser and native adapters consume the same versioned manifest, GameCommand, simulation fixtures, and canonical state without requiring pixel identity | Cross-adapter golden suite exits 0 with equal semantic IDs, command fixtures, and resulting state digests |

### Success Metrics

| Metric | Target |
|---|---|
| Committed worlds surviving a session boundary | 100% restore or a typed, byte-preserving failure |
| Time to first persistent value | At most 3 steps and 3 minutes on a clean mobile profile |
| Wiring required for a new mode | One declaration and zero shared-list edits |
| Deterministic play cost | Zero model calls, zero model tokens, zero required remote requests |
| Device-local remote TCO | Zero remote compute, storage, operations, and egress |
| Storage and restore | Measured target-device ceilings and bounded replay span |
| First-slice parity | Equal browser and native fixture digests |

### MoSCoW Priority

| Tier | Scope | Value and constraint |
|---|---|---|
| Must | Registry, arbiter, deterministic core, journal/snapshots, restore, one writer, bounded catch-up, first RTS slice, baseline input | Minimum viable maximum value; all later value depends on it |
| Must | Offline and zero-token hot path, corruption safety, asset and software provenance | Protects trust, TCO, and repeatability |
| Should | Status/control surface, expanded local RTS, browser/native semantic parity | High reuse and agent/operator value after continuity |
| Could | Voice, hand, object, camera, and motion adapters after capability, privacy, and fallback admission | Valuable only when baseline actions remain available |
| Won't this increment | Shared MMO authority, matchmaking, guilds, trading, ladders, chat moderation, cross-shard economy | Deferred by ADR-3 and AC16 |
| Won't this increment | Learned behavior or generative dialogue on the play hot path | Breaks zero-token economics and replay determinism |

### Minimum Viable Scope and Value Rungs

Rung 1 contains the Registry, Surface Arbiter, deterministic Simulation Core, Journal/Snapshot Store, Restore Adapter, World Lease Arbiter, bounded catch-up, and one Persistent Strategy World with territory, one resource, one base, first-party bounded pathfinding, unit movement, pointer, touch, and keyboard.

Rung 2 adds construction queues, gathering and regeneration, research dependencies, technology unlocks, combat, unit groups, deterministic quest state machines, obstacle updates, and admitted optional input adapters.

Rung 3 is the deferred Shared MMO: authoritative shard transport, multiple observers with one writer per shard, reconnect, fencing, backpressure, verified snapshots and recovery, cross-shard metadata, and measured remote TCO.

### Out of Scope for Rung 1

- Accounts, sign-in, cloud save, cross-device sync, and shared persistence.
- Remote authoritative tick, concurrent mutation, matchmaking, chat, trading, or cross-shard economy.
- Model inference, generative dialogue, or learned policies on the deterministic hot path.
- A second simulation core, command grammar, registry, world store, evidence constructor, or scene owner.
- Runtime asset generation, unadmitted remote assets, or mandatory managed services.

### Dependencies

- One existing scene-surface activation and exit owner.
- One existing fixed-step deterministic entity-component substrate.
- One device-local durable store with atomic append, revision, and compare-and-set semantics.
- One typed read/control surface.
- No external pathfinding, simulation, remote database, account, or model dependency is required by Rung 1.

### Open Questions

- What catch-up cap maximizes return value without rewarding clock manipulation?
- What snapshot and compaction policy fits target mobile storage and restore ceilings?
- Which Rung 2 systems improve retention enough to precede multiplayer?
- Can the first-party pathfinder meet group-movement budgets on target iPhone, iPad, Safari, and Vision Pro classes?
- Which sensor adapters prove local processing, and how is outbound transport disclosed when they cannot?
- What measured workload makes shared authority worth its cost and operator burden?
- What export format preserves canonical history across provider exit?

## Flow Patterns

### Returning Strategist Journey

| Stage | Action | Required result |
|---|---|---|
| Trigger | Reopen on the current device and storage profile | The last committed world, not a blank seed, is selected |
| Discover | Inspect restored tick, epoch, catch-up count, and digest | Continuity is explicit and auditable |
| Engage | Issue territory, resource, base, and move commands | Accepted GameCommands are journaled before acknowledgement |
| Complete | Commit and close | Commit is atomic and reports its tick and digest |
| Return | Reopen later, including without network | Restore and bounded catch-up complete with zero required outbound calls |

### Session Continuity and Catch-Up Workflow

1. Acquire the world writer lease and epoch.
2. Load the newest valid canonical snapshot.
3. Replay the journal tail through the fixed-step reducer.
4. Compare the reconstructed digest with the last commit.
5. Record elapsed duration, cap and quantize it, apply integer catch-up steps, and journal the applied count, cap reason, and digest.
6. Activate the registered mode only after every proof passes.

No record creates a partial world. Lease conflict, invalid state, or digest mismatch leaves stored bytes unchanged and returns a typed inspection/reset path.

### Data Flow

| Stage | Input | Owner | Durable output | Failure |
|---|---|---|---|---|
| Normalize | Pointer, touch, keyboard, or admitted sensing signal | Input adapter | Schema-valid GameCommand | Typed non-mutating result |
| Validate | GameCommand plus world epoch | Command intake | Accepted command record | Rejection before simulation |
| Transform | Command batch plus prior state | Deterministic core | Next state and zero-cost record | Tick not partially applied |
| Store | Accepted commands and periodic canonical state | Journal and snapshot store | Atomic append and content digest | Prior bytes unchanged |
| Serve | Snapshot plus journal tail and catch-up record | Restore adapter | Restored state report | Typed record-specific error |

### Topology

The player device is the sole Rung 1 trust domain for world data. Authoring assist is explicit and separate. Mirror and delivery lanes carry application bytes, never player world state.

~~~mermaid
flowchart LR
  Input["Input adapters"] --> Command["GameCommand validation"]
  Command --> Sim["Deterministic core"]
  Sim --> Journal["Journal and snapshots"]
  Journal --> Restore["Restore and bounded catch-up"]
  Restore --> Registry["Mode registry and scene arbiter"]
  Sim --> Status["Read-only status and evidence"]
  Manifest["Versioned domain manifest"] --> Registry
  Manifest --> Browser["Browser adapter"]
  Manifest --> Native["RealityKit and SwiftUI adapter"]
~~~

### Bounded Authoring Assist

Authoring assistance may draft terrain, factions, objectives, or asset metadata only after explicit operator request. It accepts a typed request, emits a schema-valid candidate, logs model and token cost, runs at most three validation iterations, and returns the last valid partial draft when progress stalls. It never auto-promotes a draft or becomes reachable from play.

## Time-to-Value

| Dimension | Ceiling | Proof |
|---|---|---|
| Steps | Open, activate, issue one command | Clean-profile walk-through |
| Elapsed | 3 minutes | Timed mobile-browser run |
| First persistent value | Command appears after close, reopen, and digest verification | Restored tick and digest |

## Architecture: Agentic Game OS

### Core Contracts

Every scene, asset, entity, motion, animation, camera mode, control binding, and game-mode configuration resolves through one versioned domain manifest with stable semantic IDs. Renderers persist domain configuration and state, never serialized Three.js objects or RealityKit entities.

Every input adapter emits one GameCommand before mutation. The record contains schema, commandId, worldId, modeId, actorId, operation, targetIds, arguments, and issuedAtStep. Pointer, touch, and keyboard are baseline. Voice, hand, object, camera, and motion are optional.

Optional inputs use capability detection rather than user-agent sniffing, request permission only after explicit action, process locally by default, disclose outbound sensor transport, quantize and debounce input, support cancellation, and never apply learned-model output directly to world state. Web Speech availability does not establish offline or on-device processing.

### Component Inventory and Ownership

| Component | Single responsibility | Principal interface | VCC |
|---|---|---|---|
| Game Mode Registry | Admit one declaration per stable identity | register, unregister, activate | AC1 |
| Surface Ownership Arbiter | Maintain exactly one live gameplay overlay | claim, release, registerExit | AC2 |
| Deterministic Simulation Core | Apply fixed-step commands, catch-up, stable tie-breaking, and canonical digest | step, catchUp, digest | AC3, AC8, AC11 |
| World Continuity Journal and Snapshot Store | Atomically append commands and periodic canonical snapshots | append, snapshot, readTail | AC4, AC6 |
| Continuity Restore Adapter | Reconstruct and verify the last committed world | restore | AC4-AC6, AC11 |
| World Lease Arbiter | Grant at most one writer per world and epoch | acquire, renew, release | AC7 |
| Persistent Strategy World | Own territory, resource, base, route, and unit rules | declared mode and applyCommands | AC12, AC13 |
| Domain Manifest and Provenance Gate | Admit stable IDs, configuration, assets, dependencies, licences, and budgets | validate, resolve | AC10, AC15, AC17 |
| Game OS Status Surface | Aggregate read-only continuity, lease, route, cost, and provenance state | status | AC8, AC9 |
| Input Adapter Registry | Convert capabilities into GameCommand without owning rules | registerAdapter, translate | AC14 |
| Authoring Assist Harness | Produce reviewed candidate definitions outside play | draft | AC8 negative reachability |

All components are first-party FOSS contracts at this rung. Evidence References: none recorded. Local rung: spec-complete. Delivered rung: undocumented.

### Default Device-Local Persistence

Validated GameCommand → fixed-step reducer → append-only journal → periodic canonical snapshot → compare-and-set commit under one writer lease → IndexedDB or native local-store adapter.

Wall-clock time is never an unrecorded simulation input. Catch-up records elapsed duration, integer steps, cap reason, resulting tick, and digest. Corrupt, partial, future-version, or mismatched state fails closed without overwriting bytes. Reset is explicit.

### Pathfinding

Rung 1 uses a small deterministic grid or graph route finder with bounded node expansion, stable tie-breaking, obstacle-version identity, canonical route serialization, and typed unreachable and budget_exhausted results.

A future Recast/Detour-style adapter may exist only behind a provider-neutral Pathfinder port after AC13 and AC15 pass for exact licences, pinned and reproducible WASM, mobile Safari and native memory budgets, normalized deterministic output, obstacle and group behavior, worker disposal, and absence of duplicate simulation ownership.

### Optional Shared-Authority Ports

The following ports are deferred and excluded from the Rung 1 component inventory:

- AuthoritativeShard: one simulation writer and ordered command admission per shard.
- RealtimeTransport: observation, backpressure, and bounded reconnect.
- SnapshotArchive: content-addressed cold snapshots and restore verification.
- MetadataIndex: non-authoritative profiles, discovery, and cross-shard metadata.
- WakeScheduler: at-least-once wake delivery with idempotent bounded progression.

A CRDT may project annotations or non-authoritative metadata. It cannot mutate canonical deterministic history. Any scheduler must bind world epoch and last committed tick, process a bounded range, persist before acknowledgement, and replay safely.

### Quality Attributes

| Attribute | Contract and proof |
|---|---|
| Determinism | Equal fixtures and commands yield byte-equal state across fresh browser and native runs |
| Performance | Fixed step, catch-up, route P95, restore, memory, storage, and first-load budgets are measured on target mobile classes |
| Safety | Untrusted state and second writers fail closed; stored bytes remain unchanged |
| Offline | Full local lifecycle works with transport disabled and outbound count 0 |
| Resource lifecycle | Workers, GPU resources, textures, ImageBitmap objects, subscriptions, sessions, and native entities are explicitly released |
| Accessibility | Every required action has keyboard or touch fallback and semantic controls |
| Token economics | Play emits zero model calls and zero tokens; authoring cost is separate |
| TCO | Remote rungs use dated scenario inputs, hard spend and abuse ceilings, and provider-exit evidence |

### FOSS, SBOM, and Cost Admission

Asset provenance and software dependency provenance are separate gates. Runtime packages, transitive dependencies, WASM, models, datasets, and generated artifacts require exact version and digest, SPDX-compatible licence identity, origin, attribution, redistribution decision, reproducible build evidence, bundle and memory budgets, and disposal obligations.

Managed services are provider choices, not FOSS claims. Do not persist price constants in this core contract. A dated scenario calculates monthly cost from observed requests, active duration, reads, writes, stored bytes, object operations, alarm frequency, egress, connected services, support plan, and operator time.

| Rung | Remote infrastructure | Cost truth | Operator truth |
|---|---|---|---|
| Device-local MVP | None required | Remote compute, storage, operations, and egress are zero; device storage and engineering remain real | No account, service, remote recovery, or quota |
| Managed shared authority | Optional metered provider | Free allowances do not remove usage, storage, quota, or failure risk | Configuration, observability, backup, residency, abuse, and exit remain |
| Self-hosted authority | Provisioned compute and storage | Standing capacity and egress can accrue at low usage | Highest solo-operator burden; rejected for MVP |

### Invocation and Agent Surface

| Identity | Kind | Typed purpose | Boundary |
|---|---|---|---|
| /world | Command | open, resume, order, commit, reset, close | Device-local; mutation requires explicit action |
| @game-os | Binding | Select Game OS surface | Read-only selection |
| #persistent-world | Tag | Select persistent-world context | Read-only context |
| inspect_game_os | Tool | Read normalized status views | Device-local, non-mutating |
| control_local_world | Tool | Issue bounded GameCommand operations | Device-local, action-gated |

Canonical invocation and MCP registries remain source-owned. No GameXR-only command dictionary, parser, alias, or proxy tier is permitted.

### Readiness and Deploy Boundaries

| Workstream | Local | Delivered | Exit |
|---|---|---|---|
| Registry, surface, simulation, continuity, lease | spec-complete | undocumented | AC1-AC8 recorded |
| Catch-up and first RTS slice | spec-complete | undocumented | AC11-AC13 recorded on target profiles |
| Input adapters | spec-complete | undocumented | AC14 plus permission and fallback evidence |
| Asset and software provenance | spec-complete | undocumented | AC10 and AC15 with complete SBOM |
| Browser/native parity | spec-complete | undocumented | AC17 with exact toolchain and artifact identity |
| Shared authority | deferred | undocumented | Every ADR-3 reopening gate and AC16 |

Mirror and delivery boundaries are closed. Registering zero modes is the application rollback. No authoring command writes a generated mirror or public route, and no promotion carries player world data.

## ADR-1: Declared Registry Replaces the Shared Mode Union

Status: Accepted.

Decision: a mode supplies identity, surface contract, exit handler, input adapter, and world schema in one declaration. The Registry rejects duplicates and removes the shared union rather than wrapping it.

Alternatives: retaining the union preserves coupling; a general plugin framework adds a second lifecycle owner; independent activation cannot guarantee one overlay. The first-party declaration has zero remote cost and the smallest upgrade surface.

Consequence: existing modes migrate once; future modes are additive and sibling modes remain unchanged.

## ADR-2: Device-Local Journal, Snapshot, Lease, and Bounded Catch-Up

Status: Accepted.

Decision: persist accepted commands and periodic canonical snapshots locally, restore the newest valid snapshot plus journal tail, guard commits with one writer lease, and apply only recorded capped catch-up steps. Rung 1 introduces no remote store or account.

Alternatives: snapshot-only loses acknowledged commands; provisioned authority adds standing cost and network dependence; managed serverless still adds remote, metered, quota, privacy, and availability dependencies; multiwriter convergence is not ordered deterministic replay.

Consequence: play and restore work offline with zero remote TCO, while cross-device continuity, storage ceilings, compaction, and clock-manipulation policy remain explicit constraints.

## ADR-3: Shared MMO Is Deferred Behind Provider-Neutral Reopening Gates

Status: Accepted.

Shared worlds require remote authoritative execution and network availability, but not necessarily operator-provisioned always-on servers. A scale-to-zero service is still remote, metered, quota-bound, provider-operated, and operationally consequential.

| Option | Disposition | Authority and cost truth |
|---|---|---|
| Device-local single writer | Accepted default | No remote dependency |
| Managed serverless authority | Deferred | One writer per shard; requests, duration, rows, storage, alarms, operations, and connected services may be metered |
| Self-hosted authority | Rejected for MVP | Standing capacity and highest solo-operator burden |
| Multiwriter CRDT simulation | Rejected | Convergence is not deterministic ordered simulation |
| Specific cloud stack as universal core | Rejected | Provider adapters cannot become core requirements or FOSS claims |

Reopening requires all of:

1. Measured local baseline and player-value signal.
2. Provider-neutral ports and deterministic migration/export format.
3. Exact concurrency, command, wake, storage, snapshot, and retention assumptions.
4. Dated TCO with hard monthly spend and abuse ceilings.
5. Reconnect, fencing, idempotent wake, backup, restore, and disaster-recovery proof.
6. Privacy, residency, licence, provider-exit, and data-export decisions.
7. Mobile browser, Safari, native visionOS, and accessibility acceptance.
8. Protected integration plus separate Production authorization.

## ADR-4: First-Party Bounded Pathfinder Before External Navigation

Status: Accepted.

Decision: Rung 1 owns a deterministic grid or graph route finder. Movement, collision, order arbitration, and routing remain first-party functions over the existing simulation.

Alternatives: a general navigation library offers capability but may add bundle, WASM, memory, disposal, licence, and cross-platform determinism risk; a second ECS duplicates the existing core; a normalizing adapter costs nearly the first-party subset while retaining dependency risk.

An external Pathfinder adapter may be evaluated later only through AC13 and AC15. It never becomes mandatory, and it cannot own simulation or scene state.

## ADR-5: One Domain Manifest and GameCommand, Separate Renderers

Status: Accepted.

Decision: browser and native adapters consume one versioned domain manifest, GameCommand schema, simulation fixtures, and canonical state. Three.js and RealityKit own rendering only. Game families may differ in presentation and configuration without forking the core.

Alternatives: browser-only delivery excludes native spatial value; native-only delivery increases distribution and setup cost; duplicated renderer-specific state makes parity unverifiable.

Consequence: semantic parity is required; pixel, stereo, audio, comfort, camera, and platform-distribution parity remain separate evidence.

## Reference Implementation: Current Workspace Mapping

Non-binding. Paths and products here can change without changing the neutral contract.

| Boundary | Mapping | Constraint |
|---|---|---|
| Invocation and orchestration SSOT | GitHub/agentic-canvas-os/docs | Canonical slash, at-sign, hash, and MCP registration; extend existing registries only |
| Shared Game OS core and canonical browser runtime | GitHub/agentic-graph; Dev: npm run dev:apex and npm run dev | Owns schemas, reducer, persistence, leases, pathfinding, provenance, cost/evidence constructors, and reusable backend utilities |
| Game presentation | GitHub/GameXR; Dev: npm run dev | May vary game family, frontend, and visuals; must not fork simulation, persistence, commands, provenance, evidence, or backend utilities |
| Generated Prod mirrors | GitHub/huijoohwee/content/agentic-graph and GitHub/huijoohwee/content/gamexr | Generated output only; never an authoring source |
| Delivery targets | https://airvio.co, https://airvio.co/agentic-graph, https://airvio.co/gamexr | Release targets only; a route, preview, or HTTP response is not runtime or Production proof |
| Optional managed reference | Cloudflare Workers, SQLite-backed Durable Objects, D1, R2, and alarms | Provider-specific, metered, deferred, and absent from the neutral core |

Agentic Graph FloatingPanel and its shared surface owners are reused for immersive input, media, animation, motion control, flight simulation, city building, camera, game mode, and geo projections. Panels remain controls; they do not own a second scene or renderer canvas.

GameXR may expose flight, city building, RTS/MMO, or other games. Difference from Agentic Graph is frontend, visuals, game configuration, and presentation—not backend or simulation ownership.

All 3D scenes, assets, motions, animations, cameras, controls, and game modes are user-configurable through the stable-ID manifest. Downstream aliases, duplicate stores, copied utilities, and compatibility shims are forbidden; fix defects at the shared owner and remove superseded behavior.

Every existing substrate named here remains source-located only until exact Evidence References are recorded. No existence statement in this section upgrades readiness.

## Reference Implementation: Apple, Safari, Browser, and Native Compatibility

The browser adapter uses Three.js, a service-worker offline shell, IndexedDB, capability-gated WebXR and WebGPU, and explicit GPU, texture, ImageBitmap, worker, subscription, and session disposal.

The native adapter uses SwiftUI scenes, RealityView, ImmersiveSpace, RealityKit components and systems, asynchronous asset loading, availability gates, native local persistence, and permission-gated camera, motion, hand, and object input.

The compatibility baseline is resolved and pinned at verification time. As of 2026-08-09, the official release listing identifies Xcode 26.6; the Xcode 26 SDK family includes Swift 6.2 and visionOS 26. WebGPU in WebXR has a Safari-on-visionOS minimum documented at Safari 26.2. Feature detection and availability gates remain mandatory because release labels do not prove capability.

RealityView is the native 3D presentation owner. ManipulationComponent may provide 6DOF entity interaction, but its transform updates must be normalized into GameCommand rather than mutating canonical simulation state directly. Reality Composer Pro assets resolve through the same domain manifest and provenance gate.

### Verification and Claim Ladder

| Layer | Minimum proof |
|---|---|
| Source contract | Schema, determinism, lease, restore, corruption, catch-up, RTS, pathfinding, input, provenance, SBOM, and zero-token tests |
| Browser | Fresh and returning offline sessions, service-worker convergence, IndexedDB restore, touch and pointer, Safari/WebKit coverage, and resource disposal |
| Native | Swift tests, exact Xcode and SDK record, build, installed-bundle/source hash agreement, direct visionOS Simulator launch, process inspection, and state restoration |
| Physical device | Camera, motion, hand, and object permissions; interruption, thermal, memory, comfort, and persistence |
| Optional shared adapter | Exact provider integration, multiple observers, one-writer fencing, wake replay, backup/restore, quotas, export, and measured cost |
| Production | Exact protected candidate, immutable artifact, authorization receipt, generated mirror parity, public runtime markers, rollback identity, and browser fidelity |

Simulator proof is not physical-device proof. Local browser proof is not deployed parity. A protected pull request is not Production authorization.

## Evidence References

None recorded. This document does not claim implementation, runtime, protected integration, Production, or deployment.

Primary references reviewed for this revision:

- Razarion architectural comparison: https://github.com/Razarion/razarion
- Apple RealityKit updates: https://developer.apple.com/documentation/updates/realitykit
- Apple RealityView: https://developer.apple.com/documentation/realitykit/realityview
- Apple Xcode releases: https://developer.apple.com/news/releases/
- WebKit Safari 26.2 and WebGPU in WebXR: https://webkit.org/blog/17640/webkit-features-for-safari-26-2/
- Three.js GLTFLoader disposal note: https://threejs.org/docs/pages/GLTFLoader.html
- Cloudflare Durable Object alarms: https://developers.cloudflare.com/durable-objects/api/alarms/
- Cloudflare Durable Objects pricing: https://developers.cloudflare.com/durable-objects/platform/pricing/

## Conformance and Alignment

The document owns one source contract for terminology, stories, AC1-AC17, flows, topology, component ownership, invocation, readiness, deploy boundaries, five ADRs, reference mapping, and the evidence ladder. Repeated component narratives, fixed provider prices, duplicate command grammars, and renderer-specific state ownership are intentionally absent.

Every local rung is spec-complete and every delivered rung is undocumented because Evidence References are empty. Shared authority is deferred, mirror and delivery boundaries are closed, and no runtime-ready or Production claim is authored.

The authoring harness is the only model-bearing loop and is bounded to three iterations. The deterministic play path contains no model call, no unbounded retry, and no remote dependency. Every acceptance criterion is independently judgeable by an exit code, count, digest, byte comparison, measured budget, or before/after diff.
