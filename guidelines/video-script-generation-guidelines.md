# Video Script Generation Guidelines

## Overview

**Video script generation pipelines**: implement subject-agnostic designs to maximise applicability, adapt across formats, platforms, and tones to ensure versatility, avoid hardcoded narrative assumptions to preserve flexibility, apply general-purpose beat structures to enhance reusability, configure all creative parameters externally to enable customisation, define single-responsibility script modules to maintain clarity, orchestrate with metadata to secure traceability, and avoid embedded copy to reduce fragility.

---

## Context—Intent—Directive (CID) Framework

### Definition
- **Context**: focus domain of concern within video script generation
- **Intent**: desired principle or guiding goal for the script pipeline
- **Directive**: explicit prohibition or required safeguard for neutral script authoring

### Sorting
Each line/column is organised alphabetically (A→Z) for clarity and neutrality.

---

## Three-Beat Mantra Form

Each line is a three-beat `Context; Intent; Directive` mantra:

- Adaptation; enable format customisation; forbid hardcoded platform behavior
- Algorithms; apply general-purpose beat logic; forbid topic-specific sequencing
- Applicability; maximise subject reach; forbid subject assumptions
- Assertions; enforce script correctness; forbid untested copy assumptions
- Assumptions; avoid hardcoded narrative constraints; forbid embedded copy logic
- Beats; sequence via timeline metadata; forbid duration hardcoding
- Boundaries; maintain module isolation; forbid cross-module copy coupling
- Captions; generate from templates; forbid platform-specific caption hardcoding
- Clarity; preserve script precision; forbid ambiguous overlays
- Components; build reusable script units; forbid topic-specific copy blocks
- Configuration; externalise creative parameters; forbid embedded tone settings
- Contexts; adapt across platforms and formats; forbid platform hardcoding
- Coupling; reduce inter-beat dependencies; forbid tangled script modules
- Customisation; support runtime tone adaptation; forbid compile-time copy restrictions
- Datasets; process subject data universally; forbid subject-specific copy logic
- Detection; extract narrative hooks via heuristics; forbid hardcoded hook rules
- Domains; operate across subject categories; forbid category-specific assumptions
- Duplication; eliminate redundant copy blocks; forbid copy-paste script logic
- Embedded Logic; externalise narrative rules; forbid embedded story rules
- Entities; process schema-defined script types; forbid type hardcoding
- Flexibility; preserve script adaptability; forbid rigid narrative implementations
- Formats; abstract delivery format; forbid platform-specific rendering assumptions
- Fragility; reduce script brittleness; forbid embedded copy logic
- Generalisations; abstract specific narrative patterns; forbid subject-specific logic
- Heuristics; detect via script metadata; forbid hardcoded narrative patterns
- Hooks; configure opening lines externally; forbid hardcoded hook copy
- Identifiers; drive script IDs via configuration; forbid project name hardcoding
- Interfaces; define clear script contracts; forbid implicit beat behavior
- Metadata; orchestrate script via annotations; forbid annotation-free beats
- Modules; maintain single script responsibility; forbid multi-concern script modules
- Neutrality; preserve subject independence; forbid subject coupling
- Nodes; define typed graph nodes; forbid untyped script components
- Orchestration; coordinate beats via metadata; forbid direct beat dependencies
- Overlays; render from template; forbid hardcoded text overlays
- Parameters; configure externally; forbid inline copy values
- Patterns; match against script schemas; forbid entity hardcoding
- Platforms; abstract delivery targets; forbid embedded platform rules
- Portability; enable cross-platform script deployment; forbid platform assumptions
- Projects; operate project-agnostically; forbid project-specific copy
- Provenance; track script metadata origins; forbid metadata loss
- Reusability; maximise script component utility; forbid single-use copy implementations
- Schemas; define script entity structures; forbid implicit copy types
- Semantics; preserve copy meaning through processing; forbid semantic drift
- Separation; divide script concerns clearly; forbid mixed logic
- Sharing; reuse string definitions and utilities; forbid duplication
- Strings; centralise all copy in a string library; forbid inline copy literals
- Subjects; process subject data schema-agnostically; forbid subject hardcoding
- Templates; render via placeholder injection; forbid inline resolved copy
- Thresholds; configure timing via metadata; forbid hardcoded duration cutoffs
- Tokens; handle script tokens generically; forbid subject-specific lexing
- Tone; configure voice and pov externally; forbid embedded tone assumptions
- Traceability; secure script audit trails; forbid provenance loss
- Transport; normalise script delivery patterns; forbid protocol hardcoding
- Types; share socket and script type definitions; forbid type proliferation
- Universality; preserve cross-subject applicability; forbid narrow implementations
- Validation; test across subject domains; forbid single-context validation
- Variables; expose A/B options via configuration; forbid hardcoded active variants
- Versatility; adapt across subjects and formats; forbid subject assumptions

---

## Context—Intent—Directive Table

Each row is a universal, neutral, project-agnostic one-liner mantra: `Context | Intent | Directive`

| Context | Intent | Directive |
|---|---|---|
| Adaptation | Enable format customisation | - [ ] Configure via metadata; enable customisation; forbid hardcoded platform behavior |
| Algorithms | Apply general-purpose beat logic | - [ ] Process beats generically; apply general-purpose sequencing; forbid topic-specific logic |
| Applicability | Maximise subject reach | - [ ] Design subject-agnostically; maximise applicability; forbid subject assumptions |
| Assertions | Enforce script correctness | - [ ] Validate with assertions; enforce copy correctness; forbid untested assumptions |
| Assumptions | Avoid hardcoded narrative constraints | - [ ] Externalise constraints; avoid hardcoded copy; forbid embedded narrative logic |
| Beats | Sequence via timeline metadata | - [ ] Drive beats from timeline config; forbid duration hardcoding |
| Boundaries | Maintain module isolation | - [ ] Define clear node interfaces; maintain isolation; forbid cross-module coupling |
| Captions | Generate from templates | - [ ] Render captions from string templates; forbid platform-specific caption hardcoding |
| Clarity | Preserve script precision | - [ ] Use SVO structure in copy; preserve clarity; forbid ambiguous overlay text |
| Components | Build reusable script units | - [ ] Design for reuse; build reusable nodes; forbid topic-specific copy blocks |
| Configuration | Externalise creative parameters | - [ ] Drive via configuration; externalise parameters; forbid embedded settings |
| Contexts | Adapt across platforms and formats | - [ ] Remain context-aware; adapt across formats; forbid platform hardcoding |
| Coupling | Reduce inter-beat dependencies | - [ ] Isolate beat concerns; reduce coupling; forbid tangled script modules |
| Customisation | Support runtime tone adaptation | - [ ] Enable configuration; support tone customisation; forbid hardcoded voice settings |
| Datasets | Process subject data universally | - [ ] Stay subject-agnostic; process universally; forbid subject-specific copy logic |
| Detection | Extract narrative hooks via heuristics | - [ ] Configure hook heuristics; extract patterns; forbid hardcoded hook rules |
| Domains | Operate across subject categories | - [ ] Design subject-agnostically; operate universally; forbid category-specific assumptions |
| Duplication | Eliminate redundant copy blocks | - [ ] Share string definitions; eliminate duplication; forbid copy-paste script logic |
| Embedded Logic | Externalise narrative rules | - [ ] Move rules to configuration; externalise logic; forbid embedded story rules |
| Entities | Process schema-defined script types | - [ ] Use schema definitions; process entities; forbid type hardcoding |
| Flexibility | Preserve script adaptability | - [ ] Avoid copy hardcoding; preserve flexibility; forbid rigid narrative implementations |
| Formats | Abstract delivery format | - [ ] Configure format externally; abstract delivery; forbid platform-specific rendering |
| Fragility | Reduce script brittleness | - [ ] Externalise copy dependencies; reduce fragility; forbid embedded narrative logic |
| Generalisations | Abstract specific narrative patterns | - [ ] Generalise beat algorithms; abstract patterns; forbid subject-specific sequencing |
| Heuristics | Detect via script metadata | - [ ] Configure externally; detect via metadata; forbid hardcoded narrative patterns |
| Hooks | Configure opening lines externally | - [ ] Externalise hook copy; configure options via variables; forbid hardcoded hook strings |
| Identifiers | Drive script IDs via configuration | - [ ] Use config-driven IDs; drive via configuration; forbid project name hardcoding |
| Interfaces | Define clear script contracts | - [ ] Use SVO semantics; define node contracts; forbid implicit beat behavior |
| Metadata | Orchestrate script via annotations | - [ ] Drive with metadata; orchestrate beats; forbid annotation-free nodes |
| Modules | Maintain single script responsibility | - [ ] Scope nodes to one concern; maintain SRP; forbid multi-concern script modules |
| Neutrality | Preserve subject independence | - [ ] Design neutrally; preserve subject independence; forbid subject coupling |
| Nodes | Define typed graph nodes | - [ ] Type all nodes explicitly; define inputs/outputs; forbid untyped script components |
| Orchestration | Coordinate beats via metadata | - [ ] Use metadata layer; coordinate nodes; forbid direct beat dependencies |
| Overlays | Render from template | - [ ] Inject overlays via placeholder; forbid hardcoded overlay text |
| Parameters | Configure externally | - [ ] Externalise all copy settings; configure parameters; forbid inline copy values |
| Patterns | Match against script schemas | - [ ] Use schema definitions; match beat patterns; forbid entity hardcoding |
| Platforms | Abstract delivery targets | - [ ] Configure platform externally; abstract targets; forbid embedded platform rules |
| Portability | Enable cross-platform script deployment | - [ ] Design portably; enable deployment; forbid platform assumptions |
| Projects | Operate project-agnostically | - [ ] Remain project-neutral; operate universally; forbid project-specific copy |
| Provenance | Track script metadata origins | - [ ] Maintain provenance; track origins; forbid metadata loss |
| Reusability | Maximise script component utility | - [ ] Design general-purpose; maximise reusability; forbid single-use copy implementations |
| Schemas | Define script entity structures | - [ ] Use schema definitions; define structures; forbid implicit copy types |
| Semantics | Preserve copy meaning through processing | - [ ] Maintain schema awareness; preserve semantics; forbid semantic drift in overlays |
| Separation | Divide script concerns clearly | - [ ] Apply SRP; separate source/beat/render concerns; forbid mixed logic |
| Sharing | Reuse string definitions and utilities | - [ ] Share string library; reuse types; forbid duplication |
| Strings | Centralise all copy in a string library | - [ ] Source all copy from `strings.*`; forbid inline copy literals in nodes |
| Subjects | Process subject data schema-agnostically | - [ ] Drive subject via SVO config; forbid subject hardcoding in beat logic |
| Templates | Render via placeholder injection | - [ ] Resolve copy via `{{dot.notation}}`; forbid inline resolved strings |
| Thresholds | Configure timing via metadata | - [ ] Use metadata timing; configure beat durations; forbid hardcoded ms cutoffs |
| Tokens | Handle script tokens generically | - [ ] Use neutral token handling; forbid subject-specific lexing |
| Tone | Configure voice and pov externally | - [ ] Drive tone from variables node; forbid embedded tone assumptions |
| Traceability | Secure script audit trails | - [ ] Orchestrate with metadata; secure traceability; forbid provenance loss |
| Transport | Normalise script delivery patterns | - [ ] Abstract delivery layer; normalise patterns; forbid protocol hardcoding |
| Types | Share socket and script type definitions | - [ ] Use shared socket types; prevent duplication; forbid type proliferation |
| Universality | Preserve cross-subject applicability | - [ ] Design universally; preserve applicability; forbid narrow implementations |
| Validation | Test across subject domains | - [ ] Use 3+ subject fixtures; test across domains; forbid single-context validation |
| Variables | Expose A/B options via configuration | - [ ] Externalise all variants; configure active via metadata key; forbid hardcoded active copy |
| Versatility | Adapt across subjects and formats | - [ ] Design subject-agnostically; ensure versatility; forbid subject assumptions |

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
- Authors abstract timing thresholds
- Authors generalise subject-specific narrative logic into schema-driven patterns

---

## Single-Responsibility Principle Directives

**Script module designers implement focused nodes**
- Designers scope each node to one beat, one concern
- Source nodes produce data; they do not render copy
- Beat nodes sequence timing; they do not resolve strings
- Overlay nodes render text; they do not compute timing
- Assembler nodes join clips; they do not author captions
- Caption nodes build post copy; they do not control video
- Render nodes output files; they do not set creative parameters

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

**Rule**: Script authors ensure all beat algorithms remain subject-agnostic; authors enable adaptation via `variables` and `strings` configuration only.

---

## Specification Pattern Directives

### Pattern: SourceNode

**From configuration to typed outputs**: SourceNode → reads params from YAML front matter → resolves active variant from configuration key → emits typed output ports → delivers strings, objects, or structured data to downstream nodes.

**Script authors implement SourceNode neutrally**
- Authors externalise all params to YAML front matter
- Authors resolve active variants via `params.*.active` key, never inline
- Authors type all output ports explicitly using the socket type registry
- Authors avoid embedding subject-specific copy in node logic

### Pattern: BeatNode (VideoClip + TextOverlay)

**From raw timing to composed frame**: BeatNode → receives `BEAT` from `TimelineBuilder` → consumes `VIDEO_CLIP` from upstream clip node → receives `STRING` from variables or string library → applies overlay animation from params → emits `VIDEO_CLIP` to SequenceAssembler.

**Script authors implement BeatNode neutrally**
- Authors configure all animation and style params externally
- Authors source all overlay text from `NODE_STRINGS` or `NODE_VARIABLES`, never inline
- Authors receive beat timing from `NODE_TIMELINE`, never hardcode `start_ms` / `end_ms`
- Authors avoid subject-specific rendering logic

### Pattern: TemplateResolver (CaptionBuilder)

**From string library to resolved post copy**: CaptionBuilder → receives `STRING` and `OBJECT` ports from source nodes → injects values into `{{dot.notation}}` template → resolves active hook and CTA from variables → appends legal disclaimer from constants → emits `STRING` to RenderOutput.

**Script authors implement CaptionBuilder neutrally**
- Authors drive all copy from `NODE_STRINGS`, `NODE_VARIABLES`, and `NODE_CONSTANTS`
- Authors use `{{dot.notation}}` for all injectables; forbid inline resolved strings
- Authors resolve A/B variants via `params.*.active` key, not conditional logic
- Authors avoid platform-specific caption formatting in node logic

### Pattern: GraphAssembler (SequenceAssembler)

**From composed clips to ordered sequence**: SequenceAssembler → receives ordered `VIDEO_CLIP` inputs → reads beat order from `NODE_TIMELINE.timeline_bundle` → applies progress bar and branding from constants → emits `VIDEO_SEQUENCE` to RenderOutput.

**Script authors implement SequenceAssembler neutrally**
- Authors drive clip order from `NODE_TIMELINE` config, not hardcoded index
- Authors source branding from `NODE_CONSTANTS`, not inline
- Authors avoid subject-specific assembly logic

---

## Implementation Notes Directives

**Script authors apply neutrality principles in practice**

**String Handling**
- Authors centralise all copy in `NODE_STRINGS.params` as the single source of truth
- Authors reference strings exclusively via `{{dot.notation}}` placeholders
- Authors avoid subject-specific inline copy in any node `params.text` field

**Tone and Voice**
- Authors externalise voice, pov, and style to `NODE_VARIABLES.params.tone`
- Authors avoid dataset-specific or subject-specific tone hardcoding
- Authors implement tone sharing across VO and overlay nodes via the `tone_out` port

**Beat Timing**
- Authors use `NODE_TIMELINE` as the canonical timing source for all beat durations
- Authors avoid subject-specific or platform-specific timing assumptions
- Authors configure `total_ms` and per-beat `duration_ms` from front matter metadata

**Platform and Format**
- Authors use `NODE_CONSTANTS.params.platform` for all platform-specific configuration
- Authors avoid subject-specific or project-specific platform rules in rendering logic

**Socket Types**
- Authors use shared socket type definitions from the `socket_types` registry
- Authors isolate concerns within single-responsibility node types
- Authors forbid untyped ports or implicit wire connections

**Testing Strategy**
- Authors use representative fixtures across 3+ subject domains to validate neutrality
- Authors avoid duplicated beat logic across fixtures
- Authors assert that swapping `NODE_SVO`, `NODE_STRINGS`, and `NODE_VARIABLES` params fully re-skins output without touching node logic

---

## Anti-Pattern Guards

**Script authors avoid prohibited neutrality violations**:

❌ Hardcoded subject names in node copy → ✅ Configuration-driven `NODE_SVO.params.subject`
❌ Embedded hook copy in overlay nodes → ✅ `NODE_VARIABLES.hook_out` injected via port
❌ Subject-specific beat durations in assembler → ✅ `NODE_TIMELINE.beats[*].duration_ms` from config
❌ Platform-specific caption logic in CaptionBuilder → ✅ `NODE_CONSTANTS.platform_out` port
❌ Duplicate string definitions across nodes → ✅ Single `NODE_STRINGS` source with shared ports
❌ Inline resolved `{{placeholders}}` in node params → ✅ Deferred resolution at render stage
❌ Hardcoded A/B active variant in copy → ✅ `params.*.active` key in `NODE_VARIABLES`
❌ Untyped node output ports → ✅ Explicit `type` field on every port from `socket_types`

---

## Neutrality Validation Checklist

**Pre-Commit** (Required):
- [ ] Authors confirm zero hardcoded subject / project / platform names in node logic
- [ ] Authors verify all beat algorithms accept `NODE_TIMELINE` configuration parameters
- [ ] Authors ensure each node maintains single responsibility (source / beat / overlay / assemble / render)
- [ ] Authors validate SVO structure in all overlay and caption copy
- [ ] Authors test full re-skin with 3+ subject fixtures without touching node logic

**Script Review** (Required):
- [ ] Reviewers audit for embedded copy or subject-specific assumptions in node params
- [ ] Reviewers verify configuration-driven behavior for tone, timing, and platform
- [ ] Reviewers confirm `socket_types` schema usage on all ports
- [ ] Reviewers validate that all `{{placeholders}}` resolve from `NODE_STRINGS` or `NODE_VARIABLES`
- [ ] Reviewers check shared string type usage; forbid inline copy literals in beat nodes
- [ ] Reviewers confirm edge map `connections[]` mirrors all node `inputs[].from` declarations

---

## Role—Action—Outcome

**Role: Script Schema Designer**
→ Action: designs neutral node schemas, defines SVO interfaces for overlay and caption nodes, establishes `socket_types` registry, ensures metadata-driven beat orchestration, prevents subject hardcoding
→ Outcome: produces reusable node schemas enabling cross-subject script generation without copy changes

**Role: Beat Engineer**
→ Action: implements general-purpose beat sequencing, parameterises timing via `NODE_TIMELINE` configuration, processes schema-defined beat entities, computes durations via metadata thresholds, avoids subject-specific beat dependencies
→ Outcome: delivers adaptable beat algorithms operating across diverse subjects and formats

**Role: Copy Module Developer**
→ Action: implements single-responsibility string and caption nodes, uses neutral placeholder handling, applies template-layer abstraction, shares string definitions via `NODE_STRINGS`, isolates copy concerns from timing and rendering
→ Outcome: builds focused copy modules preventing duplication and subject coupling

**Role: Configuration Architect**
→ Action: externalises creative parameters to YAML front matter, defines metadata schemas for tone, timing, and platform, establishes A/B variable configurations, documents adaptation mechanisms, enables runtime copy modification via `active` key
→ Outcome: provides configuration layer enabling subject adaptation without node logic modification

**Role: Script Test Engineer**
→ Action: creates representative script fixtures across 3+ subject domains, validates full re-skin via `NODE_SVO` / `NODE_STRINGS` / `NODE_VARIABLES` swap, writes assertion-based beat tests, verifies copy neutrality, prevents regression to hardcoded copy
→ Outcome: ensures script neutrality through systematic validation across diverse subjects

**Role: Script Reviewer**
→ Action: audits for hardcoded copy violations in node params, verifies `{{placeholder}}` resolution via source nodes, checks `socket_types` schema compliance on all ports, validates metadata-driven beat orchestration, enforces SRP node boundaries
→ Outcome: maintains script pipeline neutrality through systematic review and feedback

---

## Node Graph Conventions

### Node Schema Requirements

Every node in a neutral video script graph **must** declare:

```yaml
- id: NODE_<IDENTIFIER>          # config-driven; forbid project-name hardcoding
  type: <NodeType>               # from node type registry; forbid untyped nodes
  label: "<human-readable>"      # descriptive; forbid subject-specific labels
  category: source|timing|audio|visual|overlay|assembly|publish|output
  pos: { x: <int>, y: <int> }   # canvas layout; drives node editor positioning
  params: { }                    # all creative config; forbid inline copy literals
  inputs:                        # typed sockets; forbid implicit connections
    - port: <port_name>
      type: <SOCKET_TYPE>
      from: <NODE_ID>.<port_out> # canonical edge declaration
  outputs:                       # typed sockets; forbid untyped outputs
    - port: <port_name>
      type: <SOCKET_TYPE>
      description: "<purpose>"
```

### Edge Map Requirements

Every connection **must** appear in both locations:
- Inline on the consuming node's `inputs[].from` field
- As an entry in the top-level `connections[]` edge registry

```yaml
connections:
  - id: e<NN>                    # sequential; never skip IDs
    from_node: NODE_<ID>
    from_port: <port_name>_out
    to_node:   NODE_<ID>
    to_port:   <port_name>_in
    type: <SOCKET_TYPE>          # must match both port declarations
```

### Socket Type Registry Requirements

All socket types **must** be declared in `socket_types` before use:

```yaml
socket_types:
  <TYPE_NAME>:
    color: "<hex>"               # unique per type; drives canvas wire colour
    accepts: [<TYPE_NAME>]       # list of compatible types; forbid implicit coercion
```

---

## Mantra Application

**"CID frames neutrality standards, SRP isolates node concerns, RAO aligns author responsibilities, SVO clarifies script semantics"**

- **CID frames**: Establishes scope (script generation neutrality), purpose (subject-agnostic reusability), rules (no hardcoded copy + configuration-driven + metadata-based beat orchestration)
- **SRP isolates**: Ensures each node handles a single concern (source vs timing vs overlay vs assembly vs render), each module owns a focused responsibility
- **RAO aligns**: Maps schema designers, beat engineers, copy module developers, configuration architects, test engineers, and script reviewers to their neutrality deliverables
- **SVO clarifies**: Expresses all script operations (`TimelineBuilder sequences beats`, `TemplateResolver resolves placeholders`, `SequenceAssembler joins clips`) with grammatical precision, ensuring implementation clarity and preventing subject coupling

---

## Prompt_202603010000

### Prompt-01

```
adhere to codebase-neutrality-guidelines.md,
generate `video-script-generation-guidelines.md`,
from Context -> Intent -> Directive, each column sort by A->Z,
apply CID framework, three-beat mantra form, SRP directives,
SVO directives, RAO roles, anti-pattern guards, node graph conventions
```

| Context | Intent | Directive |
| Beats | Sequence via timeline metadata | - [ ] Drive beats from config; forbid duration hardcoding |
| Strings | Centralise all copy in a string library | - [ ] Source copy from `strings.*`; forbid inline literals |
| Variables | Expose A/B options via configuration | - [ ] Externalise variants; configure active via key; forbid hardcoded active copy |

```
## Slogan-style, three-beat mantra form (Context; Intent; Directive)

Beats; sequence via metadata; forbid duration hardcoding;
Strings; centralise all copy; forbid inline literals;
Templates; render via placeholder injection; forbid inline resolved copy;
Tone; configure externally; forbid embedded tone assumptions;
Variables; expose A/B via config; forbid hardcoded active variant;
```
