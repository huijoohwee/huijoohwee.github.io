# Video Script Generation Guidelines

## Overview

**Video script generation pipelines**: implement subject-agnostic designs to maximise applicability, adapt across formats, platforms, and tones to ensure versatility, avoid hardcoded narrative assumptions to preserve flexibility, apply general-purpose beat structures to enhance reusability, configure all creative parameters externally to enable customisation, define single-responsibility script nodes to maintain clarity, orchestrate with metadata to secure traceability, expose typed port handles to enable fan-out and fan-in wiring, and avoid embedded copy to reduce fragility.

---

## Context—Intent—Directive (CID) Framework

### Definition

- **Context**: focus domain of concern
- **Intent**: desired principle or guiding goal
- **Directive**: explicit prohibition or required safeguard

### Sorting

Each line and column is organised alphabetically (A→Z) for clarity and neutrality.

---

## Three-Beat Mantra Form

Each line is a three-beat `Context; Intent; Directive` mantra:

- Adaptation; enable customisation; forbid hardcoded platform behavior
- Algorithms; apply general-purpose beat logic; forbid topic-specific sequencing
- Applicability; maximise subject reach; forbid subject assumptions
- Assertions; enforce script correctness; forbid untested copy assumptions
- Assumptions; avoid hardcoded narrative constraints; forbid embedded copy logic
- Beats; sequence via timeline metadata; forbid duration hardcoding
- Boundaries; maintain node isolation; forbid cross-node coupling
- Broadcast; fan one source port to many inputs; forbid duplicate source nodes
- Captions; generate from templates; forbid platform-specific caption hardcoding
- Canvas; position nodes via explicit coordinates; forbid unpositioned nodes
- Clarity; preserve script precision; forbid ambiguous overlay interfaces
- Components; build reusable script nodes; forbid topic-specific copy blocks
- Configuration; externalise creative parameters; forbid embedded settings
- Connections; declare edges in node inputs and edge registry; forbid orphan edges
- Contexts; adapt across platforms and formats; forbid environment hardcoding
- Convergence; fan many inputs to one assembly node; forbid unmerged parallel streams
- Coupling; reduce inter-beat dependencies; forbid tangled script nodes
- Customisation; support runtime tone adaptation; forbid compile-time copy restrictions
- Datasets; process subject data universally; forbid subject-specific copy logic
- Detection; extract narrative hooks via heuristics; forbid hardcoded hook rules
- Domains; operate across subject categories; forbid sector-specific assumptions
- Duplication; eliminate redundant copy blocks; forbid copy-paste script logic
- Edges; type every connection explicitly; forbid untyped wires
- Embedded Logic; externalise narrative rules; forbid embedded story rules
- Entities; process schema-defined script types; forbid type hardcoding
- Fan-in; merge parallel streams at assembly nodes; forbid unresolved parallel paths
- Fan-out; broadcast one port to multiple consumers; forbid silent one-to-many wiring
- Flexibility; preserve script adaptability; forbid rigid narrative implementations
- Formats; abstract delivery format; forbid platform-specific rendering assumptions
- Fragility; reduce script brittleness; forbid embedded copy logic
- Generalisations; abstract specific narrative patterns; forbid subject-specific logic
- Handles; expose typed port handles on every node; forbid implicit connections
- Heuristics; detect via script metadata; forbid hardcoded narrative patterns
- Hooks; configure opening lines externally; forbid hardcoded hook copy
- Identifiers; drive script IDs via configuration; forbid project name hardcoding
- Interfaces; define clear node contracts; forbid implicit beat behavior
- Metadata; orchestrate script via annotations; forbid annotation-free processing
- Modules; maintain single script responsibility; forbid multi-concern script nodes
- Neutrality; preserve subject independence; forbid domain coupling
- Nodes; define typed graph nodes; forbid untyped script components
- Orchestration; coordinate beats via metadata; forbid direct beat dependencies
- Overlays; render from template; forbid hardcoded text overlays
- Parameters; configure externally; forbid inline copy values
- Patterns; match against script schemas; forbid entity hardcoding
- Placeholders; centralise all injectables in front matter; forbid inline resolved copy
- Platforms; abstract delivery targets; forbid embedded platform rules
- Portability; enable cross-platform script deployment; forbid environment assumptions
- Ports; type every input and output handle; forbid untyped sockets
- Projects; operate project-agnostically; forbid project-specific copy
- Provenance; track script metadata origins; forbid metadata loss
- Registry; maintain edge map as canonical wire source; forbid undeclared connections
- Reusability; maximise script node utility; forbid single-use copy implementations
- Schemas; define script entity structures; forbid implicit copy types
- Semantics; preserve copy meaning through processing; forbid semantic drift
- Separation; divide script concerns clearly; forbid mixed logic
- Sharing; reuse string definitions and socket types; forbid duplication
- Sockets; declare type registry before use; forbid unregistered socket types
- Strings; centralise all copy in a string library node; forbid inline copy literals
- Subjects; process subject data schema-agnostically; forbid subject hardcoding
- Templates; render via placeholder injection; forbid inline resolved copy
- Thresholds; configure timing via metadata; forbid hardcoded duration cutoffs
- Tiers; arrange nodes in execution-order columns; forbid unordered canvas layouts
- Tokens; handle script tokens generically; forbid subject-specific lexing
- Tone; configure voice and pov externally; forbid embedded tone assumptions
- Traceability; secure script audit trails; forbid provenance loss
- Transport; normalise script delivery patterns; forbid protocol hardcoding
- Types; share socket and script type definitions; forbid type proliferation
- Universality; preserve cross-subject applicability; forbid narrow implementations
- Validation; test across subject domains; forbid single-context validation
- Variables; expose A/B options via configuration; forbid hardcoded active variants
- Versatility; adapt across subjects and formats; forbid data assumptions
- Wiring; mirror edges in node inputs and connections registry; forbid single-location declarations

---

## Context—Intent—Directive Table

Each row is a universal, neutral, project-agnostic one-liner mantra: `Context | Intent | Directive`

| Context | Intent | Directive |
|---|---|---|
| Adaptation | Enable customisation | - [ ] Configure via metadata; enable customisation; forbid hardcoded platform behavior |
| Algorithms | Apply general-purpose beat logic | - [ ] Process beats generically; apply general-purpose sequencing; forbid topic-specific logic |
| Applicability | Maximise subject reach | - [ ] Design subject-agnostically; maximise applicability; forbid subject assumptions |
| Assertions | Enforce script correctness | - [ ] Validate with assertions; enforce copy correctness; forbid untested assumptions |
| Assumptions | Avoid hardcoded narrative constraints | - [ ] Externalise constraints; avoid hardcoded copy; forbid embedded narrative logic |
| Beats | Sequence via timeline metadata | - [ ] Drive beats from timeline config; sequence via metadata; forbid duration hardcoding |
| Boundaries | Maintain node isolation | - [ ] Define clear node interfaces; maintain isolation; forbid cross-node coupling |
| Broadcast | Fan one source port to many inputs | - [ ] Declare `fans_to` on every multi-consumer output; forbid duplicate source nodes |
| Captions | Generate from templates | - [ ] Render captions from string templates; forbid platform-specific caption hardcoding |
| Canvas | Position nodes via explicit coordinates | - [ ] Set `pos: {x, y}` on every node; arrange in tier columns; forbid unpositioned nodes |
| Clarity | Preserve script precision | - [ ] Use SVO structure in copy; preserve clarity; forbid ambiguous overlay interfaces |
| Components | Build reusable script nodes | - [ ] Design for reuse; build reusable nodes; forbid topic-specific copy blocks |
| Configuration | Externalise creative parameters | - [ ] Drive via configuration; externalise parameters; forbid embedded settings |
| Connections | Declare edges in node inputs and edge registry | - [ ] Mirror every `inputs[].from` in `connections[]`; forbid single-location edge declarations |
| Contexts | Adapt across platforms and formats | - [ ] Remain context-aware; adapt across contexts; forbid environment hardcoding |
| Convergence | Fan many inputs to one assembly node | - [ ] Declare all input handles individually on convergence nodes; forbid unmerged parallel streams |
| Coupling | Reduce inter-beat dependencies | - [ ] Isolate beat concerns; reduce coupling; forbid tangled script nodes |
| Customisation | Support runtime tone adaptation | - [ ] Enable configuration; support tone customisation; forbid compile-time copy restrictions |
| Datasets | Process subject data universally | - [ ] Stay subject-agnostic; process universally; forbid subject-specific copy logic |
| Detection | Extract narrative hooks via heuristics | - [ ] Configure hook heuristics; extract patterns; forbid hardcoded hook rules |
| Domains | Operate across subject categories | - [ ] Design subject-agnostically; operate universally; forbid sector-specific assumptions |
| Duplication | Eliminate redundant copy blocks | - [ ] Share string definitions; eliminate duplication; forbid copy-paste script logic |
| Edges | Type every connection explicitly | - [ ] Assign a socket type to every edge; forbid untyped wires |
| Embedded Logic | Externalise narrative rules | - [ ] Move rules to configuration; externalise logic; forbid embedded story rules |
| Entities | Process schema-defined script types | - [ ] Use schema definitions; process entities; forbid type hardcoding |
| Fan-in | Merge parallel streams at assembly nodes | - [ ] Declare every input handle individually on fan-in nodes; forbid unresolved parallel paths |
| Fan-out | Broadcast one port to multiple consumers | - [ ] Annotate `fans_to` on every output handle; forbid silent one-to-many wiring |
| Flexibility | Preserve script adaptability | - [ ] Avoid copy hardcoding; preserve flexibility; forbid rigid narrative implementations |
| Formats | Abstract delivery format | - [ ] Configure format externally; abstract delivery; forbid platform-specific rendering |
| Fragility | Reduce script brittleness | - [ ] Externalise copy dependencies; reduce fragility; forbid embedded narrative logic |
| Generalisations | Abstract specific narrative patterns | - [ ] Generalise beat algorithms; abstract patterns; forbid subject-specific sequencing |
| Handles | Expose typed port handles on every node | - [ ] Declare inputs and outputs on every node; forbid nodes with implicit or missing ports |
| Heuristics | Detect via script metadata | - [ ] Configure externally; detect via metadata; forbid hardcoded narrative patterns |
| Hooks | Configure opening lines externally | - [ ] Externalise hook copy via variables node; configure options; forbid hardcoded hook strings |
| Identifiers | Drive script IDs via configuration | - [ ] Use config-driven IDs; drive via configuration; forbid project name hardcoding |
| Interfaces | Define clear node contracts | - [ ] Use SVO semantics; define node contracts; forbid implicit beat behavior |
| Metadata | Orchestrate script via annotations | - [ ] Drive with metadata; orchestrate beats; forbid annotation-free processing |
| Modules | Maintain single script responsibility | - [ ] Scope nodes to one concern; maintain SRP; forbid multi-concern script nodes |
| Neutrality | Preserve subject independence | - [ ] Design neutrally; preserve independence; forbid domain coupling |
| Nodes | Define typed graph nodes | - [ ] Type all nodes explicitly; define inputs and outputs; forbid untyped script components |
| Orchestration | Coordinate beats via metadata | - [ ] Use metadata layer; coordinate nodes; forbid direct beat dependencies |
| Overlays | Render from template | - [ ] Inject overlays via placeholder; forbid hardcoded overlay text |
| Parameters | Configure externally | - [ ] Externalise all copy settings; configure parameters; forbid inline copy values |
| Patterns | Match against script schemas | - [ ] Use schema definitions; match beat patterns; forbid entity hardcoding |
| Placeholders | Centralise all injectables in front matter | - [ ] Define every `{{placeholder}}` once in front matter; forbid inline resolved copy |
| Platforms | Abstract delivery targets | - [ ] Configure platform externally; abstract targets; forbid embedded platform rules |
| Portability | Enable cross-platform script deployment | - [ ] Design portably; enable deployment; forbid environment assumptions |
| Ports | Type every input and output handle | - [ ] Assign a socket type from `socket_types` to every port; forbid untyped handles |
| Projects | Operate project-agnostically | - [ ] Remain project-neutral; operate universally; forbid project-specific copy |
| Provenance | Track script metadata origins | - [ ] Maintain provenance; track origins; forbid metadata loss |
| Registry | Maintain edge map as canonical wire source | - [ ] Keep `connections[]` in sync with all `inputs[].from` declarations; forbid divergence |
| Reusability | Maximise script node utility | - [ ] Design general-purpose; maximise reusability; forbid single-use copy implementations |
| Schemas | Define script entity structures | - [ ] Use schema definitions; define structures; forbid implicit copy types |
| Semantics | Preserve copy meaning through processing | - [ ] Maintain schema awareness; preserve semantics; forbid semantic drift |
| Separation | Divide script concerns clearly | - [ ] Apply SRP; separate source / beat / render concerns; forbid mixed logic |
| Sharing | Reuse string definitions and socket types | - [ ] Share string library and type registry; reuse types; forbid duplication |
| Sockets | Declare type registry before use | - [ ] Register all types in `socket_types` before first use; forbid unregistered socket types |
| Strings | Centralise all copy in a string library node | - [ ] Source all copy from `NODE_STRINGS`; forbid inline copy literals in any node params |
| Subjects | Process subject data schema-agnostically | - [ ] Drive subject via SVO config; forbid subject hardcoding in beat logic |
| Templates | Render via placeholder injection | - [ ] Resolve copy via `{{dot.notation}}`; forbid inline resolved strings |
| Thresholds | Configure timing via metadata | - [ ] Use metadata timing; configure beat durations; forbid hardcoded ms cutoffs |
| Tiers | Arrange nodes in execution-order columns | - [ ] Group nodes by `pos.x`; sources left, output right; forbid unordered canvas layouts |
| Tokens | Handle script tokens generically | - [ ] Use neutral token handling; forbid subject-specific lexing |
| Tone | Configure voice and pov externally | - [ ] Drive tone from variables node; forbid embedded tone assumptions |
| Traceability | Secure script audit trails | - [ ] Orchestrate with metadata; secure traceability; forbid provenance loss |
| Transport | Normalise script delivery patterns | - [ ] Abstract delivery layer; normalise patterns; forbid protocol hardcoding |
| Types | Share socket and script type definitions | - [ ] Use shared socket types; prevent duplication; forbid type proliferation |
| Universality | Preserve cross-subject applicability | - [ ] Design universally; preserve applicability; forbid narrow implementations |
| Validation | Test across subject domains | - [ ] Use 3+ subject fixtures; test across domains; forbid single-context validation |
| Variables | Expose A/B options via configuration | - [ ] Externalise all variants; configure active via metadata key; forbid hardcoded active copy |
| Versatility | Adapt across subjects and formats | - [ ] Design subject-agnostically; ensure versatility; forbid data assumptions |
| Wiring | Mirror edges in node inputs and connections registry | - [ ] Declare every edge in both `inputs[].from` and `connections[]`; forbid orphan edges |

---

## Neutrality Standards

Design with subject awareness to ensure adaptability, remain topic-agnostic to preserve universality, stay project-agnostic to maintain flexibility, keep platform-agnostic to guarantee portability, orchestrate beats with metadata to secure traceability, forbid hardcoding copy or narrative logic to avoid rigidity, adapt tone and format through configuration to enable customisation, define single-responsibility script nodes to uphold clarity, validate with subject-diverse fixtures to strengthen reliability, and apply assertion testing to enforce copy correctness.

---

## Core Directives

### Core Mandate

**Script authors write neutral, context-aware video scripts**

- Scripts remain neutral across subjects and topics
- Scripts adapt tone and format via metadata
- Scripts operate domain-agnostically
- Scripts function project-agnostically
- Scripts process subject data platform-agnostically

### Forbidden Patterns

**Script authors avoid hardcoding violations**

- Authors eliminate subject-specific copy hardcoding
- Authors remove embedded platform assumptions from beat logic
- Authors externalise all tone and voice configuration
- Authors abstract timing thresholds into metadata configuration
- Authors generalise subject-specific narrative logic into schema-driven patterns

---

## Single-Responsibility Principle Directives

**Script node designers implement focused nodes**

- Designers scope each node to one concern — source, timing, audio, visual, overlay, assembly, or output
- Source nodes produce typed data; they do not render copy or compute timing
- Beat nodes sequence timing; they do not resolve strings or apply visual styles
- Overlay nodes composite text onto clips; they do not sequence beats or mix audio
- Assembler nodes join ordered clips; they do not author captions or set render parameters
- Caption nodes build post copy; they do not control video sequencing or resolve timing

---

## Subject-Verb-Object Structure Directives

**Nodes process script data via configuration**
- Pattern: `Node processes input via configuration`

**Heuristics detect narrative patterns from metadata**
- Pattern: `Heuristic detects hook_pattern from beat_metadata`

**Algorithms sequence beats without subject dependencies**
- Pattern: `TimelineBuilder sequences beats without subject dependencies`

**Templates resolve copy via placeholder injection**
- Pattern: `TemplateResolver resolves {{placeholder}} via string_library`

**Port handles fan data from one source to many consumers**
- Pattern: `SourceNode.output_port fans_to [ConsumerNode_A, ConsumerNode_B, ConsumerNode_N]`

**Assembly nodes converge many typed inputs to one output**
- Pattern: `AssemblerNode receives [input_01…input_N] emits sequence_out`

**Rule**: Script authors ensure all beat algorithms remain subject-agnostic; authors enable adaptation via `variables` and `strings` configuration nodes only.

---

## Specification Pattern Directives

### Example: SourceNode

**From configuration to typed outputs**: SourceNode → reads all params from YAML front matter → resolves active variant via `params.*.active` key → emits typed output port handles → delivers `STRING`, `OBJECT`, or structured data to downstream nodes via `fans_to` wires.

**Script authors implement SourceNode neutrally**

- Authors externalise all params to YAML front matter — no inline literals in `params` blocks
- Authors resolve active variants via `params.*.active` key, never via inline conditional logic
- Authors type all output port handles explicitly using entries from `socket_types`
- Authors declare `fans_to` on every output handle listing all downstream consumers

### Example: BroadcastPort

**From one source handle to many consumer handles**: BroadcastPort → single output port on a source node → connects via typed wires to multiple downstream input handles → `fans_to` field declares every consumer → edge registry carries one entry per consumer sharing the same `from` port.

**Script authors implement BroadcastPort neutrally**

- Authors annotate `fans_to: [NODE_A, NODE_B, …]` on every output handle serving multiple consumers
- Authors register one edge entry per consumer in `connections[]` — never a single collapsed entry
- Authors forbid duplicate source nodes to circumvent fan-out — one source, many wires
- Authors verify all `fans_to` consumers appear in the edge registry with matching type tokens

### Example: ConvergenceNode

**From many upstream handles to one merged output**: ConvergenceNode → receives multiple typed input handles → each declared individually with upstream `from` reference → emits one merged output handle to the next tier.

**Script authors implement ConvergenceNode neutrally**

- Authors declare every input handle individually — no implicit multi-input ports
- Authors assign a distinct port name and socket type to each incoming handle
- Authors list every incoming edge in `connections[]` with matching type tokens
- Authors forbid merging incompatible socket types at a single input handle

### Example: BeatNode

**From raw timing to composed frame**: BeatNode → receives `BEAT` handle from TimelineBuilder → consumes `VIDEO_CLIP` from paired clip node → receives `STRING` from variables or string library via typed port handle → applies overlay animation from params → emits `VIDEO_CLIP` to SequenceAssembler.

**Script authors implement BeatNode neutrally**

- Authors configure all animation, style, font, and position params externally in front matter
- Authors source all overlay text from `NODE_STRINGS` or `NODE_VARIABLES` port handles — never inline
- Authors receive beat timing from `NODE_TIMELINE` port handles — never hardcode `start_ms` or `end_ms`
- Authors avoid subject-specific rendering logic in any overlay params block

### Example: TemplateResolver

**From string library to resolved post copy**: TemplateResolver → receives `STRING` and `OBJECT` port handles from source nodes → injects values into `{{dot.notation}}` template params → resolves active hook and CTA from variables → appends legal disclaimer from constants → emits `STRING` to RenderOutput.

**Script authors implement TemplateResolver neutrally**

- Authors drive all copy from `NODE_STRINGS`, `NODE_VARIABLES`, and `NODE_CONSTANTS` port handles
- Authors use `{{dot.notation}}` for all injectables in template params — forbid inline resolved strings
- Authors resolve A/B variants via `params.*.active` key, not conditional logic in node code
- Authors avoid platform-specific caption formatting in node logic

### Example: DualRegistryEdge

**Every edge declared twice — node-local and edge-global**: DualRegistryEdge → `inputs[].from` on consuming node → matching entry in top-level `connections[]` registry → both carry identical `type` token → graph parsers traverse either location with the same authoritative result.

**Script authors implement DualRegistryEdge neutrally**

- Authors write `from: NODE_ID.port_out` on every node input at the time the node is defined
- Authors add the corresponding `connections[]` entry with `id`, `from`, `to`, and `type`
- Authors assign sequential `eNN` IDs to all edges — never skip or reuse IDs
- Authors verify edge count in `connections[]` matches total `from` references across all nodes

---

## Implementation Notes Directives

**Script authors apply neutrality principles in practice**

**Placeholder and String Handling**

- Authors define every `{{placeholder}}` exactly once in the YAML front matter, organised into numbered sections: meta, SVO, strings, constants, variables, palette, timeline, audio, clips, overlays, assembly, render
- Authors reference placeholders exclusively via `{{dot.notation}}` in node params — resolution is deferred to render stage only
- Authors centralise all copy in `NODE_STRINGS.params` as the single source of truth; reference via typed port handles, never by re-declaring the value in another node

**Fan-out and Fan-in Wiring**

- Authors annotate every output port with `fans_to: [list of consumer node IDs]`; register every fan-out wire as a separate entry in `connections[]` — one entry per consumer
- Authors declare every input handle on convergence nodes individually — no implicit multi-input merging
- Authors document fan-out and fan-in patterns in a summary table: port, pattern type, fan count, and edge IDs

**Tone, Beat Timing, and Platform**

- Authors externalise voice, pov, and style to `NODE_VARIABLES.params.tone`; distribute via `tone_out` port handle to all consuming nodes; forbid subject-specific tone hardcoding
- Authors use `NODE_TIMELINE` as the canonical timing source; configure `total_ms` and per-beat `start_ms`, `end_ms`, and `duration_ms` from front matter metadata; forbid subject-specific or platform-specific timing assumptions
- Authors route all platform-specific configuration through `NODE_CONSTANTS.params.platform`; wire `platform_out` to `NODE_TIMELINE.platform_in` as the first edge in the wiring sequence

**Canvas Layout and Socket Types**

- Authors assign `pos: {x, y}` to every node in tier column order — sources at far left, render output at far right; document column-to-tier mapping in a canvas layout table; forbid nodes without canvas coordinates
- Authors declare all socket types in `socket_types` before first use; assign a unique hex colour per type; forbid untyped port handles or implicit wire coercion between incompatible types

**Testing Strategy**

- Authors validate the pipeline with representative fixtures across three or more unrelated subject domains
- Authors assert that swapping only `NODE_SVO`, `NODE_STRINGS`, and `NODE_VARIABLES` params fully re-skins all output without touching any node definition
- Authors verify that edge count in `connections[]` equals total `from` declarations across all node `inputs` blocks

---

## Anti-Pattern Guards

**Script authors avoid prohibited neutrality violations**:

❌ Hardcoded subject name in any node params → ✅ Configuration-driven `NODE_SVO.params.subject`
❌ Embedded hook copy in overlay node params → ✅ `NODE_VARIABLES.hook_out` port handle injected via `text_in`
❌ Subject-specific beat durations in assembler → ✅ `NODE_TIMELINE.beats[*].duration_ms` from front matter config
❌ Platform-specific caption logic in TemplateResolver → ✅ `NODE_CONSTANTS.platform_out` port handle
❌ Duplicate string definitions across multiple nodes → ✅ Single `NODE_STRINGS` source with `fans_to` port handles
❌ Inline resolved `{{placeholder}}` in node params → ✅ Unresolved `{{dot.notation}}` — deferred to render stage
❌ Hardcoded A/B active variant in copy → ✅ `params.*.active` key in `NODE_VARIABLES` front matter
❌ Untyped node output port handle → ✅ Explicit `type` field on every port, declared in `socket_types`
❌ Silent one-to-many wiring without `fans_to` → ✅ `fans_to: [NODE_A, NODE_B, …]` on every multi-consumer output
❌ Edge declared in only one location → ✅ Edge declared in both `inputs[].from` and `connections[]`
❌ Node missing canvas coordinates → ✅ `pos: {x, y}` on every node aligned to tier column
❌ Convergence node with implicit multi-input → ✅ Every input handle declared individually with distinct port name and type

---

## Neutrality Validation Checklist

**Pre-Commit** (Required):

- [ ] Authors confirm zero hardcoded subject, project, or platform names in any node params block
- [ ] Authors verify all beat algorithms accept `NODE_TIMELINE` configuration parameters
- [ ] Authors ensure each node maintains single responsibility — source, timing, audio, visual, overlay, assembly, or output
- [ ] Authors validate SVO structure in all overlay and caption copy
- [ ] Authors test full re-skin with 3+ subject fixtures without changing any node definition

**Script Review** (Required):

- [ ] Reviewers audit for embedded copy or subject-specific assumptions in node params blocks
- [ ] Reviewers verify configuration-driven behavior for tone, timing, and platform settings
- [ ] Reviewers confirm `socket_types` registry declarations cover all port handle types in use
- [ ] Reviewers validate that all `{{placeholders}}` resolve from `NODE_STRINGS`, `NODE_VARIABLES`, or `NODE_CONSTANTS`
- [ ] Reviewers check shared `fans_to` annotations, dual-registry edge declarations, and canvas tier coordinates

---

## Role—Action—Outcome

**Role: Script Schema Designer**
→ Action: designs neutral node schemas, defines SVO interfaces for overlay and caption nodes, establishes `socket_types` registry, declares `fans_to` annotations on all multi-consumer output handles, ensures metadata-driven beat orchestration, prevents subject hardcoding
→ Outcome: produces reusable node schemas enabling cross-subject script generation without copy changes

**Role: Beat Engineer**
→ Action: implements general-purpose beat sequencing, parameterises timing via `NODE_TIMELINE` port handles, wires beat output handles to clip and SFX nodes, processes schema-defined beat entities, computes durations via front matter metadata, avoids subject-specific beat dependencies
→ Outcome: delivers adaptable beat algorithms operating across diverse subjects and formats

**Role: Copy Module Developer**
→ Action: implements single-responsibility string and caption nodes, uses neutral `{{dot.notation}}` placeholder handling, applies template-layer abstraction, shares string definitions via `NODE_STRINGS` port handles, isolates copy concerns from timing and rendering
→ Outcome: builds focused copy modules preventing duplication and subject coupling

**Role: Configuration Architect**
→ Action: externalises all creative parameters to YAML front matter, defines metadata schemas for tone, timing, platform, and palette, establishes A/B variable configurations with `active` keys, documents `fans_to` fan-out patterns, enables runtime copy modification without touching node definitions
→ Outcome: provides configuration layer enabling subject adaptation without node logic modification

**Role: Graph Wiring Engineer**
→ Action: declares every edge in both `inputs[].from` and `connections[]`, assigns sequential `eNN` IDs, annotates `fans_to` on every multi-consumer output handle, documents fan-out and fan-in patterns in summary tables, assigns canvas coordinates to all nodes
→ Outcome: produces a complete dual-registered edge map enabling deterministic topological execution

**Role: Script Test Engineer**
→ Action: creates representative fixtures across 3+ subject domains, validates full re-skin via `NODE_SVO`, `NODE_STRINGS`, and `NODE_VARIABLES` param swap, writes assertion-based beat and wiring tests, verifies `fans_to` completeness, confirms edge registry count, prevents regression to hardcoded copy
→ Outcome: ensures script neutrality and wiring correctness through systematic validation across diverse subjects

**Role: Script Reviewer**
→ Action: audits for hardcoded copy violations in node params, verifies `{{placeholder}}` resolution via source node port handles, checks `socket_types` schema compliance on all handles, validates `fans_to` annotations and dual-registry edge declarations, enforces SRP node boundaries and tier column canvas layout
→ Outcome: maintains script pipeline neutrality and graph integrity through systematic review and feedback

---

## Node Graph Conventions

### Node Schema Requirements

Every node in a neutral video script graph must declare:

```yaml
- id: NODE_<IDENTIFIER>        # config-driven; forbid project-name hardcoding
  type: <NodeType>             # from node type registry; forbid untyped nodes
  category: source|timing|audio|visual|overlay|assembly|publish|output
  pos: { x: <int>, y: <int> } # tier column coordinates; forbid unpositioned nodes
  params: { }                  # all values as {{placeholder}} refs; forbid inline literals
  inputs:                      # typed handles; forbid implicit or missing from
    - port: <port_name>
      type: <SOCKET_TYPE>
      from: <NODE_ID>.<port_out>
  outputs:                     # typed handles; forbid untyped or missing fans_to
    - port: <port_name>
      type: <SOCKET_TYPE>
      fans_to: [<NODE_ID>, …]
```

### Edge Map Requirements

Every connection must appear in both locations — both are authoritative and must remain in sync:

```yaml
connections:
  - id: e<NN>                  # sequential; never skip or reuse IDs
    from: NODE_<ID>.<port_out>
    to:   NODE_<ID>.<port_in>
    type: <SOCKET_TYPE>        # must match both port declarations
```

### Socket Type Registry Requirements

All socket types must be declared in `socket_types` before first use:

```yaml
socket_types:
  <TYPE_NAME>:
    color: "<hex>"             # unique per type; drives canvas wire colour
    accepts: [<TYPE_NAME>]     # compatible types; forbid implicit coercion
```

### Canvas Tier Column Layout

Nodes are arranged left to right in ascending `pos.x` order. Sources occupy the leftmost column; the single terminal render node occupies the rightmost.

| Column | `pos.x` range | Tier | Category |
|---|---|---|---|
| 0 | ≈ 40 | Source | `source`, `visual` (palette) |
| 1 | ≈ 380 | Timing and Audio | `timing`, `audio` (score, sfx, vo) |
| 2 | ≈ 700 | Clips and Mixer | `visual` (clips), `audio` (mixer) |
| 3 | ≈ 1020 | Overlays | `overlay` |
| 4 | ≈ 1340 | Assembly | `assembly`, `publish` |
| 5 | ≈ 1660 | Output | `output` — single terminal node |

### Fan-out and Fan-in Reference

| Pattern | Definition | Canonical example | Edge IDs |
|---|---|---|---|
| Fan-out 1→8 | One port → eight consumer handles | `NODE_PALETTE.palette_out` → all clips and overlays | e09–e16 |
| Fan-out 1→4 | One port → four consumer handles | `NODE_STRINGS.stats_out` → VO, overlay 02, overlay 03, caption | e24, e26, e27, e29 |
| Fan-out 1→3 | One port → three consumer handles | `NODE_VARIABLES.hook_out` → VO, overlay 01, caption | e17, e18, e19 |
| Fan-out 1→2 | One port → two consumer handles | `NODE_TIMELINE.beat_01_out` → clip 01, SFX | e02, e06 |
| Fan-in 3→1 | Three input handles → one node | `NODE_AUDIO_MIX` ← score, SFX, VO | e43, e44, e45 |
| Fan-in 5→1 | Five input handles → one node | `NODE_SEQUENCE` ← four clips + timeline bundle | e08, e39–e42 |
| Fan-in 6→1 | Six input handles → one node | `NODE_CAPTION` ← hook, subject, stats, moments, hashtags, legal | e19, e28–e31, e34 |
| Fan-in 4→1 | Four input handles → one node | `NODE_RENDER` ← video, audio, caption, meta | e46, e47, e48 + meta |

---

## Mantra Application

**"CID frames neutrality standards, SRP isolates node concerns, RAO aligns author responsibilities, SVO clarifies script semantics"**

- **CID frames**: Establishes scope (script generation neutrality), purpose (subject-agnostic reusability), rules (no hardcoded copy, configuration-driven params, metadata-based beat orchestration, typed port handles, dual-registry edge declarations)
- **SRP isolates**: Ensures each node handles a single concern — source, timing, audio, visual, overlay, assembly, or output — and that each module owns a focused, testable responsibility
- **RAO aligns**: Maps schema designers, beat engineers, copy module developers, configuration architects, graph wiring engineers, test engineers, and script reviewers to their neutrality and wiring deliverables
- **SVO clarifies**: Expresses all script operations (`TimelineBuilder sequences beats`, `TemplateResolver resolves placeholders`, `SequenceAssembler joins clips`, `SourceNode fans_to consumers`) with grammatical precision, ensuring implementation clarity and preventing subject coupling

---

## Prompt_202603080000

### Prompt-01 · 2026-03-01

```
adhere to codebase-neutrality-guidelines.md,
generate video-script-generation-guidelines.md,
Context → Intent → Directive, each column A→Z,
apply CID framework, three-beat mantra form, SRP directives,
SVO directives, RAO roles, anti-pattern guards, node graph conventions
```

### Prompt-02 · 2026-03-08

```
adhere to codebase-neutrality-guidelines.md,
update video-script-generation-guidelines.md
— sync with video-script-template.md v2:
  fan-out / fan-in port handle patterns, fans_to annotation on output handles,
  dual-registry edge declaration (node-local + connections[]),
  canvas tier column layout with pos: {x, y}, socket_types registry requirements,
  beat panel wiring tables, convergence node input handle declarations,
  broadcast port 1→8 pattern
```

### Prompt-03 · 2026-03-08

```
adhere to codebase-neutrality-guidelines.md,
update video-script-generation-guidelines.md
— structural realignment to source document:
  CID definition tightened to 3-field form,
  three-beat mantras normalised to compact imperative register,
  CID table directive column enforces - [ ] verb; verb; forbid verb pattern,
  neutrality standards restored to single prose paragraph,
  core directives held to 5+5 economy,
  SRP directives compressed to source pattern,
  SVO directives aligned to 3 patterns + 1 rule with fan-out and fan-in additions,
  specification patterns aligned to pipeline sentence + 4-bullet form,
  implementation notes consolidated into 5 named subsections,
  anti-pattern guards restored to inline ❌ → ✅ format,
  checklist held to 5+5 economy,
  RAO held to source format with graph wiring engineer addition,
  mantra application held to 4-bullet form,
  prompt log held to clean fenced block per entry
```
