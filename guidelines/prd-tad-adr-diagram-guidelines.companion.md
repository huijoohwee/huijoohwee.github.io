---
title: "PRD, TAD & ADR Diagram Guidelines (Companion)"
doc_type: "Guidelines Companion"
version: "1.1.0"
date: "2026-08-20"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
parent: "PRD, TAD & ADR Guidelines"
parent_version: "1.8.0"
---

# PRD, TAD & ADR Diagram Guidelines (Companion)

## Scope & Ownership

This companion expands one section of the parent set — `architecture-diagram-standards` — into a full, independently loadable module. It is universal, neutral, agnostic, modular, and enforceable under the parent's Scope & Neutrality Contract, which it inherits rather than restates.

| Concern | Owner |
|---|---|
| What a PRD, TAD, or ADR must contain; the Readiness Ladder; the Rule ID scheme; the authoring-domain finding vocabulary | Parent set — **PRD, TAD & ADR Guidelines** |
| Task decomposition, agent roles, tool blast radius, per-task budgets, run state | **Agentic SDLC Guidelines** companion set |
| Diagram identity, class selection, notation rules, labelling contract, complexity budget, render reach, diagram drift, and the diagram-domain finding vocabulary | **This companion** |
| Render-target declaration, ingest surfaces, graph element contract, projection rules, and the canvas-domain finding vocabulary | [Diagram Canvas-Render Contract](./prd-tad-adr-diagram-canvas-render.companion.md) |
| Copy-ready template bodies for every diagram class | [Diagram Templates](./prd-tad-adr-diagram-templates.companion.md) |

Neither set restates the other. Where a rule crosses the boundary, this companion names the owning set and defers. A conformance claim sourced from this document alone is complete for the diagram domain and incomplete for every other domain.

**Notation neutrality**: the parent mandates a declarative, text-authored diagram notation without binding to a product. This companion calls it **the mandated notation** so every rule survives a notation swap. Concrete notation, renderer, host, and viewer names appear only under labelled reference-implementation blocks — the Canvas-Render module carries one such block.

## Module Index

- `scope--ownership` — ownership split, notation neutrality, deference rules
- `rule-identity` — Rule ID derivation inside this companion
- `diagram-identity-contract` — the five required parts of every diagram
- `diagram-class-catalog` — the closed set of diagram classes and their notation
- `class-selection-rules` — how a class is chosen and when a diagram is split
- `notation-rules` — identifier, direction, shape, escaping, and subgraph rules
- `labelling-contract` — node role naming and edge label requirements
- `complexity-budget` — node, edge, and depth ceilings, and the split rule
- `diagram-token-economics` — the cost of carrying a diagram in context
- `flow-pattern-binding` — which diagrams each of the five flow patterns requires
- `topology-diagram-rules` — boundary subgraphs, connection types, residency
- `orchestration-diagram-rules` — role chain, loop subgraphs, bound annotation
- `lane--deploy-boundary-diagram-rules` — lane sequence, closed-by-default rendering
- `readiness-on-diagrams` — what a diagram may and may not assert about status
- `render-reach--accessibility` — caption, alt text, mobile and offline reach
- `versioning--drift` — version notes, archival, diagram/spec agreement
- `canvas-render-binding` — when a diagram must also project onto a graph canvas surface
- [Diagram Canvas-Render Contract](./prd-tad-adr-diagram-canvas-render.companion.md) — surface declaration, ingest surfaces, graph element contract, projection rules, canvas findings
- [Diagram Templates](./prd-tad-adr-diagram-templates.companion.md) — copy-ready, portable-intersection templates per class
- `anti-pattern-guards-diagrams` — prohibited diagram patterns and corrections
- `conformance-findings--diagram-domain` — the typed diagram finding vocabulary
- `validation-checklist-diagrams` — pre-implementation, review, and gate items
- `cid-diagram-matrix` — alphabetical, project-agnostic diagram mantras
- `roleactionoutcome-diagrams` — role-to-diagram-deliverable mapping
- `mantra-application-diagrams` — the framing mantra for this companion

### Diagram Load Budget

The parent's guideline load budget applies to this companion: load by section anchor for the current phase, not the whole module for a single-phase task.

| Phase | Sections to load |
|---|---|
| Phase 1 (PRD authoring) | `diagram-class-catalog`, `class-selection-rules`, `flow-pattern-binding`, Templates module (journey) |
| Phase 2 (TAD authoring) | `diagram-identity-contract`, `notation-rules`, `labelling-contract`, `complexity-budget`, `topology-diagram-rules`, `orchestration-diagram-rules`, `lane--deploy-boundary-diagram-rules`, `canvas-render-binding`, Templates module |
| Phase 3 (alignment check) | `conformance-findings--diagram-domain`, `validation-checklist-diagrams`, `versioning--drift`, `readiness-on-diagrams`, Canvas-Render module |
| Phase 4 (living documents) | `versioning--drift`, `conformance-findings--diagram-domain` |
| Any phase | `scope--ownership`, `module-index` |

---

## Rule Identity

This companion inherits the parent's derivation unchanged:

```
Rule ID = [owning section anchor] + "#" + [ordinal of the rule within that section, in document order]
```

**Directives**:
- Derive every Rule ID from its owning `##` section anchor and the rule's document-order ordinal; forbid deriving it from a file name, a line number, or a directory
- Distinguish a companion Rule ID from a parent Rule ID by section anchor alone; no anchor is shared between the two documents, so no prefix is needed and none is permitted
- Classify every rule here as **artifact-bearing** or **advisory** by the parent's definitions; a diagram, a caption, an inventory table, a version note, and a recorded diagram check are all locatable artifacts
- Report the diagram-domain coverage ratio separately, then report the union with the parent's ratio; forbid folding one into the other silently
- Record the rule text alongside the ID wherever a finding is stored, because inserting a rule earlier in a section re-ordinals the rules after it

---

## Diagram Identity Contract

**Makes a diagram addressable, so a finding can point at one diagram rather than at a document.** A diagram with no identity cannot be traced, versioned, or regression-compared.

Every diagram carries five required parts:

| Part | Definition | Absent ⇒ |
|---|---|---|
| **Diagram ID** | A stable identifier, unique within the owning document, referenced by every table and finding that concerns it | `unidentified-diagram` |
| **Class** | Exactly one member of the Diagram Class Catalog | `unclassed-diagram` |
| **Notation block** | The diagram itself, in the mandated notation, parseable without repair | `unparseable-diagram` |
| **Caption** | One sentence stating what the reader should conclude | `missing-diagram-caption` |
| **Inventory table** | The accompanying table enumerating every node the diagram draws | `missing-diagram-inventory` |

**Diagram header template** *(precedes every notation block)*:

```markdown
**Diagram [ID]** · Class: [class] · Notation: [notation + direction] · Version: [N] — [date or milestone]
**Caption**: [What the reader should conclude from this diagram.]
```

**Directives**:
- Assign exactly one Diagram ID per diagram and keep it stable while the diagram's class and owning document are unchanged; a second diagram claiming an existing ID is a `duplicate-diagram-id`
- Declare the class explicitly in the header; forbid inferring it from the notation keyword, because one keyword serves several classes
- Pair every diagram with an inventory table in the same section; the parent requires this for architecture diagrams and this companion extends it to every class
- Reference a diagram by ID from any table, VCC, or finding that concerns it; forbid "the diagram above"
- Forbid a diagram whose nodes appear in no inventory, and forbid an inventory row that appears in no diagram; both directions are `diagram-spec-drift`
- Derive diagram identity from declared document content only; forbid deriving it from a file name, a heading position, or a rendered artifact path

---

## Diagram Class Catalog

The closed set of diagram classes. Each class has one purpose, one default notation, and one companion table.

| Class | Purpose | Default notation | Companion table |
|---|---|---|---|
| **Component topology** | Static system structure and module relationships | `flowchart TB` | Component inventory |
| **Data flow** | Stage-to-stage data movement through a pipeline or DAG | `flowchart LR` | Data Flow table |
| **User workflow** | Multi-actor request/response and event sequences | `sequenceDiagram` | Workflow happy / alternate / error paths |
| **Parallel orchestration** | Concurrent, multi-agent, or multi-locale execution | `flowchart TB` + subgraphs | Orchestration role table |
| **Orchestration / harness flow** | AI control path: dispatcher → executor → observer → consumer | `sequenceDiagram` or `flowchart LR` | Orchestration/Harness Flow table |
| **Runtime topology** | Runtime placement, connection types, trust boundaries, residency | `flowchart TB` + one subgraph per boundary | Topology table |
| **Lane & deploy boundary** | Ordered lanes and the gate between each adjacent pair | `flowchart LR` | Deploy Boundary Register |
| **State / lifecycle** | Legal states of one entity and the transitions between them | `stateDiagram-v2` | State transition table |
| **Entity relationship** | Persistent data shapes and their cardinalities | `erDiagram` | Schema table |
| **Journey stage map** | Persona movement across stages and touchpoints | `flowchart LR` | User Journey table |
| **Component inventory** | Module inventory, rungs, and file mapping | Markdown table | — *(is the table)* |

**Directives**:
- Choose exactly one class per diagram from this catalog; a diagram whose class is absent is `unclassed-diagram` until the catalog is extended
- Extend the catalog by adding a row here first, then the rule and template that use it; forbid the reverse order, mirroring the parent's enumeration-extension rule
- Use the class default notation unless the header states the substitution and its reason; a silent substitution is `wrong-notation-class`
- Forbid one notation block serving two classes; a block mixing structure with sequence, or topology with data flow, is split into two diagrams with two IDs
- Retain plain code blocks — not diagrams — for schemas, payloads, and configuration examples, per the parent

---

## Class Selection Rules

**Turns "which diagram do I draw" into a decision with one answer.** Class ambiguity is the most common cause of a diagram that satisfies no reader.

```
Is the subject a snapshot of what exists?        → Component topology / Runtime topology
Is the subject the order in which things happen? → User workflow / Orchestration flow
Is the subject what moves, and in what shape?    → Data flow / Entity relationship
Is the subject the legal states of one thing?    → State / lifecycle
Is the subject movement toward a public surface? → Lane & deploy boundary
Is the subject a person's path to value?         → Journey stage map
```

**Directives**:
- Answer from the subject of the diagram, not from the tool that renders it or the section it sits in; a class chosen by convenience is `wrong-notation-class`
- Where two answers apply, draw two diagrams rather than one hybrid; a hybrid reads as authoritative on both subjects and is reliable on neither
- Draw a Runtime topology diagram whenever the system has three or more runtime components, per the parent's threshold; a system over the threshold with no such diagram is `missing-required-diagram`
- Draw an Orchestration / harness flow diagram for every AI-powered pipeline; the parent forbids AI pipelines with no flow spec, and this companion makes the missing rendering separately raisable
- Prefer adding a diagram over overloading one; a diagram is cheaper to read than a legend

---

## Notation Rules

**Makes the notation block parseable on the first attempt.** A diagram needing repair before it renders has already cost more than the prose it replaced.

### Identifiers and Placeholders

- Use identifier-safe node keys: letters, digits, and underscores only; no spaces and no bracket characters
- Put every human-readable string inside the node label, never inside the node key
- Write placeholders as label text — `A["[Component A]"]` — never as a bare bracketed key such as `[NodeA]`; a bracketed key fails to parse in common implementations of the mandated notation and is `unparseable-diagram`
- Quote any label containing reserved punctuation, including `:`, `(`, `)`, `,`, and `#`, so strict parsers read it deterministically; this mirrors the parent's frontmatter quoting rule

### Direction and Shape

- State direction explicitly on every flowchart — `TB` for structure, `LR` for pipelines and lanes; forbid relying on a default
- Use shape as a typed signal, consistently within a document: rectangle for a service or component, rounded for an external actor, database shape for a store, diamond for a decision, doubled edge for a boundary gateway
- Declare the shape vocabulary once per document when more than three shapes appear; an undeclared vocabulary makes shape decorative

### Line Breaks and Escaping

- Break a label with `<br/>`; forbid a literal `\n` inside a label, which renders as visible text in common implementations of the mandated notation
- Escape or quote reserved characters rather than deleting them; a silently altered identifier breaks the diagram-to-inventory join

### Subgraphs

- Use one subgraph per boundary, per lane, or per parallel branch; forbid a subgraph used only to group visually with no named meaning
- Nest subgraphs at most two levels deep; deeper nesting is `diagram-complexity-overflow`
- Name every subgraph with the boundary, lane, or branch it represents; an unnamed subgraph is `boundary-subgraph-missing` where the class requires boundaries

### Determinism

- Author the notation so two renders of a byte-identical block produce the same reading order; forbid depending on layout randomness to convey meaning
- Order nodes in the source in the reading order the diagram intends, so the block is legible unrendered; the source is what agents and reviewers load

---

## Labelling Contract

**Every node states what it is; every edge states how it connects.** The parent forbids implicit or unlabelled connections in topology; this companion generalises the rule to every class and makes each half separately raisable.

**Node label form**:

```
[Name]<br/>[role · type]
```

**Edge label form**:

```
[connection type][ · protocol][ · cardinality]
```

**Directives**:
- Name a role for every node from the class role vocabulary — Producer, Consumer, Router, Store, Gateway, Dispatcher, Executor, Observer, Actor — plus a type; a node with a bare name is `unnamed-node-role`
- Label every edge with its connection type (sync request, async queue, event stream, batch, read-only) before any decoration; an unlabelled edge is `unlabelled-edge`
- Give dotted and solid edges a stated meaning, declared once per document; the common convention is solid for a runtime call and dotted for a derived or advisory relationship
- Keep the label vocabulary identical between the diagram and its companion table so the join is exact; a mismatch is `diagram-spec-drift`
- Forbid a legend carrying meaning absent from the labels; a legend documents the vocabulary, it does not substitute for it

---

## Complexity Budget

**A diagram is a reading budget, not a canvas.** Past a ceiling, a diagram stops reducing effort and starts hiding structure.

| Dimension | Soft ceiling | Hard ceiling | At the hard ceiling |
|---|---|---|---|
| Nodes per diagram | 12 | 20 | Split by boundary or by lane |
| Edges per diagram | 20 | 30 | Split by concern, or collapse a cluster into one node with its own diagram |
| Subgraph depth | 1 | 2 | Promote the inner subgraph to its own diagram |
| Distinct shapes | 3 | 5 | Declare the shape vocabulary explicitly |
| ASCII-art nodes | 5 | 5 | Convert to the mandated notation |
| Nodes per **leaf detail** diagram | 20 | 40 | Re-scope the boundary itself; there is nothing left to split on |

**Leaf detail exception**: a diagram produced by decomposing a parent overview along its boundaries may exceed the node ceiling up to the stated leaf cap. The escape the budget normally offers — split on the next boundary — does not exist inside a leaf, so forcing a further split would fragment one coherent boundary into arbitrary pieces and cost more comprehension than the excess nodes do. The exception is bounded, not open: past the leaf cap the boundary itself is too coarse and is re-scoped upstream. A leaf diagram over the leaf cap is a `diagram-complexity-overflow` like any other.

**Directives**:
- Split a diagram exceeding a hard ceiling into a parent overview plus per-boundary detail diagrams, each with its own ID and inventory; a diagram over a hard ceiling is `diagram-complexity-overflow`
- Keep the parent overview at or under the soft ceiling; an overview itself at the hard ceiling has decomposed nothing
- Forbid ASCII art for any diagram exceeding five nodes, per the parent; a sixth ASCII node is `ascii-overflow`
- Collapse a cluster into a single node only when that node names the diagram that expands it; an opaque collapsed node hides the structure the split was meant to expose
- Treat every ceiling as an observable count, not a judgement, so the check stays deterministic

---

## Diagram Token Economics

The parent records that the mandated notation reduces context token consumption by roughly 70–85% against equivalent ASCII art, and requires token spend to be a measured engineering metric. That measurement applies to diagrams themselves.

**Directives**:
- Count the notation block, not the rendered image, as the loaded cost; the source block is what an agent reads
- Prefer one diagram plus a table over two diagrams that overlap; duplicated structure is duplicated token cost on every turn that loads the section
- Keep every diagram source inside the complexity budget for the same reason the parent keeps sections phase-scoped: an oversized always-loaded artifact raises the floor cost of every turn
- Forbid a diagram whose rendering or description requires a model call on a read path; that is the parent's `paid-read-path`, not a new diagram finding
- Record diagram source cost as a line item wherever the guideline load budget is recorded; an unmeasured diagram cost is the parent's `missing-economics-metric` against the process

---

## Flow Pattern Binding

The parent defines five canonical flow patterns and requires every feature to trace through all five. This section binds each pattern to the diagram class that renders it, so a missing rendering is raisable independently of a missing prose spec.

| Flow pattern (parent) | Required diagram class | Required when | Missing ⇒ |
|---|---|---|---|
| User Journey Flow | Journey stage map | Any user-facing feature | `missing-required-diagram` |
| Workflow Flow | User workflow *(multi-actor)* or Component topology *(single-actor task flow)* | Every workflow | `missing-required-diagram` |
| Data Flow | Data flow | Every pipeline crossing a schema boundary | `missing-required-diagram` |
| Orchestration / Harness Flow | Orchestration / harness flow | Every AI-powered pipeline | `missing-required-diagram` |
| Topology | Runtime topology | Every system with ≥3 runtime components | `missing-required-diagram` |
| Lane Topology & Deploy Boundary | Lane & deploy boundary | Before the first promotion | `missing-required-diagram` |

**Directives**:
- Render each in-scope flow pattern as its bound class; forbid substituting one class for another because it is already drawn
- Anchor every diagram to the flow pattern it renders by naming the pattern in the caption; a diagram anchored to no pattern is the parent's `unguided-artifact`
- Trace every Journey stage map stage to at least one PRD journey stage and every Runtime topology node to a TAD Component Specification; an unanchored node is `orphan-diagram-node`
- Keep the five patterns in five diagrams; a single diagram claiming to cover several patterns is split per Class Selection Rules

---

## Topology Diagram Rules

Extends the parent's Topology directives into the notation layer.

**Directives**:
- Draw one subgraph per boundary — runtime environment, network zone, or trust domain — and place every node inside exactly one; a node outside every boundary subgraph is `boundary-subgraph-missing`
- Label every edge with its connection type: sync request, async queue, event stream, or batch; the parent forbids implicit connections and this companion raises `unlabelled-edge` for the rendering
- Annotate every store node with its data residency in the node label or in an adjacent residency note; a store with no residency is the parent's `incomplete-topology-node`
- Mark each node's lane in the node label or by lane subgraph, consistent with the Topology table's Lane column; a lane present in the table and absent in the diagram is `diagram-spec-drift`
- Version-stamp the diagram header and record what changed in a version note; forbid in-place overwrite without a note, per the parent
- Forbid mixing data flow stages or sequence steps into a topology diagram; topology is a structural snapshot

---

## Orchestration Diagram Rules

Extends the parent's Orchestration/Harness Flow directives into the notation layer.

**Directives**:
- Draw the four roles as four distinct nodes — Dispatcher, Executor, Observer, Consumer — even when one component fills two roles; a role folded into another is `harness-role-unrendered`
- Mark the Executor node as the cost-log emitter and draw the edge to the Observer; an Executor with no cost-log edge is `cost-log-unrendered`
- Enclose every loop in a named subgraph and annotate it with the max-iteration bound and the circuit-breaker condition; a loop drawn with neither is `unbounded-loop-unrendered`, and the underlying specification defect remains the parent's `unbounded-loop`
- Draw the fallback path as a labelled edge from the node that fails to the node that receives the degraded result or the propagated error; an undrawn fallback is `fallback-path-unrendered`
- Keep the diagram's role labels, schemas, and bounds identical to the Orchestration/Harness Flow table; a mismatch is `diagram-spec-drift`
- Draw a zero-token read path with an explicit `$0` annotation so a paid path is visible by contrast

---

## Lane & Deploy Boundary Diagram Rules

Extends the parent's Lane Topology & Deploy Boundary directives into the notation layer.

**Directives**:
- Draw the three lanes in canonical order — authoring, mirror, delivery — left to right; a diagram omitting a lane is the parent's `missing-lane`, and a diagram reordering them is `lane-order-unrendered`
- Draw each boundary as its own gateway node carrying the boundary name, never as a bare edge; an unnamed boundary is `boundary-node-unnamed`
- Render boundary state explicitly: a `closed` boundary is drawn closed and labelled `closed`, and only a boundary with a referenced operator instruction is drawn `open`; a boundary drawn open with no referenced instruction is the parent's `ungated-promotion`
- Draw the rollback path as a reverse edge from each lane to its predecessor, labelled with the rollback check; an absent rollback edge is `rollback-path-unrendered`
- Forbid drawing an edge from the authoring lane directly to the delivery lane; such an edge depicts the parent's `deploy-boundary-breach` and is a `blocker` in both domains
- State data residency per lane subgraph, not only per node, and note any residency change across a boundary

---

## Readiness on Diagrams

A diagram is a picture of structure, not a source of status. The parent's Readiness Ladder derives every rung from Evidence References; a diagram cannot produce evidence.

**Directives**:
- Forbid a diagram asserting a rung that its companion inventory does not carry; a rung visible only in a diagram is the parent's `unproven-claim`
- Where a diagram shows status, draw local and delivered rungs as two separate annotations; one blended badge is the parent's `blended-status`
- Draw only Readiness Ladder values; a colour or badge outside the ladder is the parent's `unknown-status`
- Draw planned-but-unbuilt nodes with a stated distinguishing convention, declared in the caption, so a plan is never read as a runtime fact; an undistinguished planned node is `aspirational-node`
- Re-render every status annotation whenever a rung is re-derived, per the parent's Phase 4 cascade; a stale annotation is `diagram-spec-drift`

---

## Render Reach & Accessibility

A diagram that only renders in one viewer has not communicated. The parent's Delivery Reach quality attribute — browser reach, mobile reach, offline behaviour — applies to diagrams.

**Directives**:
- Write the caption as the diagram's text equivalent, complete enough that a reader who cannot see the render still learns the diagram's conclusion; a caption that only names the diagram is `missing-diagram-caption`
- Keep the companion inventory table the authoritative fallback: every node, edge, and boundary the diagram draws is readable from the table alone; this is what makes the diagram optional at read time
- Verify the notation block renders in at least one host and degrades to legible source text where it does not; a block that renders nowhere is `unparseable-diagram`
- Size diagrams for the narrowest target viewport in scope: prefer `TB` for narrow screens and cap node label length; a diagram unreadable on the target device mix is the parent's `incomplete-delivery-reach`
- Forbid conveying meaning by colour alone; pair every colour signal with a label or shape
- Forbid embedding a rendered image as the only representation; the source block is required, because it is the reviewable and diffable artifact

---

## Versioning & Drift

**Directives**:
- Version-stamp every diagram in its header and increment the version on any node, edge, boundary, or annotation change
- Record a version note stating what changed from the prior version; archive superseded diagrams rather than deleting them, per the parent's ADR archival rule
- Re-derive every diagram whenever its companion table changes, and re-derive the table whenever the diagram changes; the two are one artifact pair, and disagreement in either direction is `diagram-spec-drift`
- Treat a diagram that names a component, route, or lane that no longer exists as `orphan-diagram-node`; treat a specified component absent from its required diagram as `missing-required-diagram`
- Compare the diagram finding set against the prior run on every baselined change, per the parent's regression rule; a new `blocker` is a regression
- Bound the diagram revision loop like every other loop in the parent set: max 3 cycles, circuit-breaker at no reduction in open `blocker` diagram findings across two consecutive cycles

---

## Canvas Render Binding

A static notation renderer consumes a diagram and emits a picture. A **graph canvas surface** consumes the same diagram, projects it into a node-link graph, and then lays it out, queries it, and inspects it. The second consumer needs strictly more from the author, and the difference is not stylistic: a diagram can render perfectly as a picture and project into an empty graph.

The [Diagram Canvas-Render Contract](./prd-tad-adr-diagram-canvas-render.companion.md) owns that contract in full — surface declaration, the three ingest surfaces, the graph element contract, the convertibility rule, the presentation namespace, projection rules, and the canvas-domain finding vocabulary. This section owns only the binding: when the contract applies, and what this companion's rules must not contradict.

**Directives**:
- Apply the canvas-render contract to every diagram in a document that declares a graph canvas surface; a diagram in such a document that satisfies only the static renderer is `unsupported-ingest-surface` or `non-projecting-diagram-kind` under that contract
- Author to the **portable intersection** by default — explicit direction, identifier-safe keys, human text in labels, canonical inline edge-label form, named boundary groups, presentation through style or class statements — because that intersection is exactly the subset both consumers read
- Keep one source per diagram for both consumers; a static variant and a canvas variant of the same diagram is guaranteed drift and is `diagram-spec-drift`
- Treat this companion's labelling contract as the projection prerequisite it already is: a node with no role and type projects an untyped element, and an unlabelled edge projects an untyped connection, so `unnamed-node-role` and `unlabelled-edge` are canvas defects as well as drawing defects
- Count projected clusters when reconciling the inventory table: a named boundary subgraph projects a cluster **element**, not only a visual frame, so an inventory that omits clusters under-reports the graph
- Choose the class before the surface, then confirm the declared surface projects that class; a class chosen because a surface renders it prettily is `wrong-notation-class`
- State plainly where a class does not project — sequence and state kinds commonly render on their own surface and contribute zero graph elements — and record the zero counts rather than omitting the row; an omitted count is `render-proof-absent`
- Record projected node, edge, and cluster counts as the Evidence Reference for any canvas-renderable claim; a claim resting on a visual check alone is the parent's `unproven-claim`

---

## Anti-Pattern Guards (Diagrams)

❌ A diagram with no ID, no class, or no caption, so a finding cannot name it and a reader cannot state its conclusion
→ ✅ Every diagram carries all five identity parts: ID, class, parseable notation block, caption, inventory table

❌ Bracketed node keys (`[NodeA]`), literal `\n` inside labels, or unquoted labels containing reserved punctuation
→ ✅ Identifier-safe keys, human text in labels, `<br/>` for line breaks, quoting for reserved punctuation

❌ One notation block mixing topology with data flow, or structure with sequence
→ ✅ One class per diagram; hybrids split into separately identified diagrams

❌ Unlabelled edges, nodes with a bare name and no role or type, colour as the only carrier of meaning
→ ✅ Every edge labelled with a connection type; every node labelled role · type; every colour paired with a label or shape

❌ A 40-node diagram with four nesting levels presented as the system overview
→ ✅ Complexity ceilings enforced; oversized diagrams split into an overview plus per-boundary detail diagrams

❌ ASCII art past five nodes; a rendered image with no source block
→ ✅ The mandated notation for anything over five nodes; the source block always present and diffable

❌ A topology diagram with unlocated stores, unlabelled connections, or nodes outside every boundary subgraph
→ ✅ One boundary subgraph per zone, every connection typed, every store carrying data residency

❌ An AI pipeline diagram with the Observer folded into the Executor, no cost-log edge, an unbounded loop, or no fallback edge
→ ✅ Four roles rendered distinctly, cost-log edge drawn, loop subgraph annotated with bound and breaker, fallback edge labelled

❌ A lane diagram omitting the mirror lane, drawing boundaries as bare edges, showing boundaries open by default, or drawing authoring straight to delivery
→ ✅ Three lanes in order, each boundary a named gateway node, `closed` by default, rollback edges present, no authoring-to-delivery edge

❌ A rung asserted by a diagram badge that no Evidence Reference supports; a blended status badge; planned nodes drawn identically to running ones
→ ✅ Status read from the inventory only, local and delivered annotated separately, planned nodes drawn by a convention stated in the caption

❌ A diagram edited without a version bump; a companion table updated while the diagram is left stale; a superseded diagram deleted
→ ✅ Version-stamped headers, version notes on every change, diagram and table re-derived together, superseded diagrams archived

❌ A diagram naming a component that no longer exists; a specified component absent from its required diagram
→ ✅ Bidirectional diagram/spec closure; both breaks resolved or formally tracked

❌ A diagram declared canvas-renderable on the strength of a static render; a sequence or state diagram claimed to populate a graph; separate static and canvas variants of one diagram
→ ✅ Canvas-renderability proven by recorded node, edge, and cluster counts; non-projecting classes recorded with zero counts; one portable source serving both consumers

---

## Conformance Findings — Diagram Domain

**Defines the typed vocabulary a conformance check records against this companion.** It is the diagram-domain member of the union described by the parent's Conformance Findings section: authoring-domain types stay in the parent, execution-domain types stay in the Agentic SDLC set, and no set redefines a type another owns.

Findings here use the parent's six-field recording contract, the parent's three severities, the parent's deduplication triple `(Finding Type, Rule ID, artifact reference)`, and the parent's ordering rule. The artifact reference for a diagram finding is the **Diagram ID**.

### Finding Enumeration

| Rule family | Finding Type | Severity |
|---|---|---|
| Diagram identity | `unidentified-diagram` | `major` |
| Diagram identity | `duplicate-diagram-id` | `major` |
| Diagram identity | `unclassed-diagram` | `major` |
| Diagram identity | `missing-diagram-caption` | `minor` |
| Diagram identity | `missing-diagram-inventory` | `major` |
| Notation | `unparseable-diagram` | `major` |
| Notation | `wrong-notation-class` | `minor` |
| Notation | `ascii-overflow` | `minor` |
| Labelling | `unlabelled-edge` | `major` |
| Labelling | `unnamed-node-role` | `minor` |
| Complexity | `diagram-complexity-overflow` | `minor` |
| Coverage | `missing-required-diagram` | `major` |
| Coverage | `orphan-diagram-node` | `major` |
| Coverage | `diagram-spec-drift` | `major` |
| Topology rendering | `boundary-subgraph-missing` | `major` |
| Orchestration rendering | `harness-role-unrendered` | `major` |
| Orchestration rendering | `cost-log-unrendered` | `major` |
| Orchestration rendering | `unbounded-loop-unrendered` | `blocker` |
| Orchestration rendering | `fallback-path-unrendered` | `major` |
| Lane rendering | `lane-order-unrendered` | `major` |
| Lane rendering | `boundary-node-unnamed` | `major` |
| Lane rendering | `rollback-path-unrendered` | `major` |
| Readiness rendering | `aspirational-node` | `major` |

### Directives

- Treat this enumeration as the single source of truth for **diagram-domain** finding names; forbid this companion redefining a type the parent set, the Agentic SDLC set, or the Canvas-Render module owns
- Raise a diagram-domain type where the defect is in the drawing and a canvas-domain type where the defect is in the projection; both may be raised for one diagram, and the conformance vocabulary is the union of all four domains
- Raise the parent's type, not a diagram type, where the defect is in the specification rather than the rendering: an unbounded loop in the spec is `unbounded-loop`, an unbounded loop drawn without its bound is `unbounded-loop-unrendered`, and both may be raised for the same pipeline
- Raise the parent's type where the diagram is the only place a status, residency, or lane claim appears: a rung visible only in a diagram is `unproven-claim`, a store with no residency is `incomplete-topology-node`, a missing lane is `missing-lane`, an open boundary with no operator instruction is `ungated-promotion`, and an authoring-to-delivery edge is `deploy-boundary-breach`
- Anchor every finding to a Rule ID from this companion and to a Diagram ID as the artifact reference; a finding anchored to a section alone collapses distinct violations
- Report a zero count for every type with no finding; an omitted row is indistinguishable from an unchecked rule
- Extend the enumeration by adding a row here first, then the rule that raises it; forbid the reverse order
- Forbid a Finding Type with no rule in this companion that can raise it
- Satisfy the parent's Check Determinism properties: deterministic, order-independent, additive, bounded by rules plus diagrams, comparable on fields only, and complete on degraded input — an unparseable notation block yields `unparseable-diagram` and the run completes

---

## Validation Checklist (Diagrams)

**Pre-Implementation**:
- [ ] Every diagram carries an ID, a declared class from the catalog, a parseable notation block, a caption, and a companion inventory table
- [ ] Class chosen by subject via Class Selection Rules; no hybrid diagram covering two classes
- [ ] Direction stated on every flowchart; shape vocabulary declared where more than three shapes appear
- [ ] Node keys identifier-safe; placeholders in labels; `<br/>` for breaks; reserved punctuation quoted
- [ ] Every node labelled `role · type`; every edge labelled with a connection type
- [ ] Complexity budget respected: nodes, edges, subgraph depth, and shape count within hard ceilings
- [ ] Runtime topology diagram present for every system with ≥3 runtime components, with one subgraph per boundary and residency on every store
- [ ] Orchestration / harness flow diagram present per AI pipeline, with four roles drawn, cost-log edge drawn, loop subgraph annotated with bound and breaker, and fallback edge labelled
- [ ] Lane & deploy boundary diagram present before the first promotion, with three lanes in order, named boundary nodes, `closed` default state, and rollback edges
- [ ] All five parent flow patterns rendered as their bound classes
- [ ] Diagram source cost recorded as a line item in the authoring loop's token budget

**Post-Documentation Review**:
- [ ] Every diagram node traced to a specification entry — Component Specification, Topology row, Deploy Boundary row, or journey stage
- [ ] Every specification entry requiring a diagram appears in one
- [ ] Captions readable as text equivalents; inventory tables sufficient as fallback without the render
- [ ] Notation blocks verified to render in at least one host and to degrade to legible source elsewhere
- [ ] Diagrams legible on the narrowest target viewport in scope; no meaning carried by colour alone
- [ ] Status annotations, where present, match the inventory rungs and separate local from delivered
- [ ] Planned-but-unbuilt nodes drawn by a convention stated in the caption
- [ ] Version stamps and version notes present for every changed diagram; superseded diagrams archived

**Alignment Gate** *(diagram-domain contribution to the parent's Phase 3 alignment check)*:
- [ ] **Diagram identity complete** — else `unidentified-diagram`, `duplicate-diagram-id`, `unclassed-diagram`, `missing-diagram-caption`, or `missing-diagram-inventory`
- [ ] **Notation parses and matches its class** — else `unparseable-diagram`, `wrong-notation-class`, or `ascii-overflow`
- [ ] **Labelling complete** on every node and edge — else `unnamed-node-role` or `unlabelled-edge`
- [ ] **Complexity within ceilings** — else `diagram-complexity-overflow`
- [ ] **Coverage closes both ways**: required diagrams present, no orphan nodes, diagram and table agree — else `missing-required-diagram`, `orphan-diagram-node`, or `diagram-spec-drift`
- [ ] **Topology rendering complete** — else `boundary-subgraph-missing`, or the parent's `incomplete-topology-node`
- [ ] **Orchestration rendering complete** — else `harness-role-unrendered`, `cost-log-unrendered`, `unbounded-loop-unrendered`, or `fallback-path-unrendered`
- [ ] **Lane rendering complete** — else `lane-order-unrendered`, `boundary-node-unnamed`, `rollback-path-unrendered`, or the parent's `missing-lane`, `ungated-promotion`, or `deploy-boundary-breach`
- [ ] **No status asserted by a diagram alone** — else `aspirational-node`, or the parent's `unproven-claim`, `blended-status`, or `unknown-status`
- [ ] **Diagram-domain coverage ratio stated** as linked artifact-bearing rules over total, with the advisory count reported separately
- [ ] **Canvas-render gate discharged** against the Canvas-Render module wherever a graph canvas surface is declared; projected counts recorded, non-projecting classes recorded as zero
- [ ] **Diagram revision loop bounded**: max 3 cycles, circuit-breaker on no reduction in open `blocker` diagram findings across two consecutive cycles
- [ ] **Zero `blocker` diagram findings** before baseline sign-off; `major` and `minor` resolved or formally tracked with an owner
- [ ] **Diagram finding set compared** against the prior run; any new `blocker` treated as a regression

---

## CID Diagram Matrix

Each row is a universal, neutral mantra in `Context | Intent | Directive` grammar, sorted A→Z, with no project, vendor, or file references.

| Context | Intent | Directive |
|---|---|---|
| Accessibility | Communicate without the render | - [ ] Write the caption as a text equivalent and keep the inventory table sufficient alone; forbid meaning carried by colour only |
| Boundaries | Make placement visible | - [ ] Draw one subgraph per boundary and place every node in exactly one; forbid nodes outside every boundary |
| Bounds | Render loop limits | - [ ] Annotate every loop subgraph with its max-iteration bound and circuit-breaker; forbid loops drawn without both |
| Captions | State the conclusion | - [ ] Give every diagram one sentence stating what the reader should conclude; forbid captions that only restate the title |
| Class | Choose one purpose per diagram | - [ ] Declare exactly one catalog class per diagram; forbid hybrid diagrams covering two subjects |
| Complexity | Keep diagrams readable | - [ ] Hold nodes, edges, depth, and shapes within stated ceilings; forbid oversized diagrams presented as overviews |
| Coverage | Render every required flow | - [ ] Draw the bound class for every in-scope flow pattern; forbid substituting an already-drawn diagram |
| Cost | Measure diagram spend | - [ ] Count notation source as loaded token cost and record it in the load budget; forbid overlapping duplicate diagrams |
| Drift | Keep picture and table equal | - [ ] Re-derive diagram and companion table together; forbid updating one and leaving the other stale |
| Edges | Type every connection | - [ ] Label every edge with its connection type before decoration; forbid implicit or unlabelled connections |
| Escaping | Parse on first attempt | - [ ] Use identifier-safe keys, `<br/>` breaks, and quoted reserved punctuation; forbid bracketed keys and literal escape text |
| Fallback | Show the degraded path | - [ ] Draw a labelled fallback edge from every failing node to its receiver; forbid undrawn fallbacks |
| Identity | Make diagrams addressable | - [ ] Assign one stable Diagram ID per diagram and reference it from every table and finding; forbid "the diagram above" |
| Inventory | Pair every diagram with a table | - [ ] Enumerate every drawn node in a companion table in the same section; forbid diagrams with no inventory |
| Lanes | Render the promotion path | - [ ] Draw three lanes in order with named boundary nodes closed by default and rollback edges; forbid authoring-to-delivery edges |
| Neutrality | Survive a notation swap | - [ ] Name the notation by function and confine brands to labelled reference-implementation blocks; forbid brand-coupled rules |
| Notation | Prefer declarative text | - [ ] Author diagrams in the mandated notation and keep the source block present; forbid ASCII art past five nodes and image-only diagrams |
| Readiness | Read status from evidence | - [ ] Take rungs from the inventory only and separate local from delivered; forbid status asserted by a diagram alone |
| Roles | Name what each node is | - [ ] Label every node `role · type` from the class vocabulary; forbid bare names |
| Residency | Locate every store | - [ ] State data residency on every store node and per lane; forbid unlocated stores |
| Roles (harness) | Render the control path | - [ ] Draw Dispatcher, Executor, Observer, and Consumer distinctly with the cost-log edge; forbid folded roles |
| Split | Decompose instead of crowding | - [ ] Split at the hard ceiling into an overview plus per-boundary details, each identified; forbid opaque collapsed nodes |
| Traceability | Anchor every node | - [ ] Trace every node to a specification entry and every required entry to a diagram; forbid orphan nodes |
| Versioning | Track diagram evolution | - [ ] Version-stamp every diagram with a change note and archive superseded versions; forbid in-place overwrites |

---

## Role—Action—Outcome (Diagrams)

**Technical Writer** *(owner of this companion)* → maintains the class catalog, the templates, and the labelling vocabulary; assigns Diagram IDs; enforces caption and inventory pairing → produces a diagram set that is addressable, diffable, and readable without the render

**System Architect** → selects the class per subject, draws runtime topology and lane diagrams, states connection types and residency, keeps diagrams inside the complexity budget → establishes a structural picture that agrees with the TAD tables node for node

**Solo Founder / AI Orchestrator** *(collapses the authoring roles; does not collapse the Evaluator)* → draws the harness control path with cost-log and fallback edges, annotates every loop with its bound and breaker, records diagram source cost in the token budget → keeps AI pipelines observable and bounded in the picture as well as the prose

**Evaluator** *(a mechanism, never a person)* → parses each notation block, joins diagram nodes against companion tables, counts against the complexity ceilings, and emits the diagram finding set with types and severities → produces diagram verdicts no author can self-grade

**UX Designer** → draws journey stage maps, marks friction and drop-off, validates diagram legibility on the target device mix → keeps the persona's path to value visible alongside the system's structure

**QA Engineer** → confirms each diagram's claims are checkable against its table, verifies render reach and source degradation, tracks diagram findings across runs → ensures the diagram set is verifiable rather than decorative

---

## Mantra Application (Diagrams)

**"One diagram, one class · One node, one role · One edge, one type · Every diagram carries a table · Ceilings force decomposition · Boundaries render closed · Evidence, not badges, earns the rung · Source is the artifact"**

- **One diagram, one class**: the catalog is closed and the subject picks the class, so a reader knows what a diagram is authoritative about before reading it
- **One node, one role · one edge, one type**: labelling is the whole contract; an unnamed node and an unlabelled edge are the two ways a diagram becomes a suggestion
- **Every diagram carries a table**: the inventory is the fallback, the join target, and the reason a diagram can be optional at read time without losing information
- **Ceilings force decomposition**: complexity limits are observable counts, so growth produces a split rather than a legend
- **Boundaries render closed**: the picture inherits the parent's default-closed promotion rule, so nothing reaches a delivery lane by momentum in the diagram either
- **Evidence, not badges, earns the rung**: a diagram shows structure and may echo a derived rung; it never originates one
- **Source is the artifact**: the notation block is what agents load, reviewers diff, and checks parse, which is why it is versioned, bounded, and never replaced by an image
