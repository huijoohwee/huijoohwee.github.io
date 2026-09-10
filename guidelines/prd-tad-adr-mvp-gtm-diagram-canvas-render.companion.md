---
title: "PRD, TAD & ADR Diagram Canvas-Render Contract (Companion)"
doc_type: "Guidelines Companion"
version: "1.0.1"
date: "2026-09-05"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Diagram Guidelines (Companion)"
parent_version: "1.1.1"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# PRD, TAD & ADR Diagram Canvas-Render Contract (Companion)

## Scope & Ownership

This module answers one question the diagram companion deliberately leaves open: **what makes an authored diagram renderable by a graph canvas surface, rather than only by a static notation renderer.**

A static notation renderer consumes the diagram source and emits a picture. A **graph canvas surface** consumes the diagram source, projects it into a node-link graph, and then renders, lays out, queries, and inspects that graph. The second consumer needs strictly more from the author: element identity, element type, typed connections, and a declared target surface. A diagram that renders as a picture but projects into an empty or partial graph is not canvas-renderable.

| Concern | Owner |
|---|---|
| Document contents, Readiness Ladder, Rule ID scheme, authoring-domain findings | **PRD, TAD & ADR Guidelines** |
| Task decomposition, agent roles, budgets, run state, Evidence References | **ADLC Guidelines** |
| Diagram identity, class catalog, notation rules, labelling, complexity budget | **PRD, TAD & ADR Diagram Guidelines** companion |
| Render-target declaration, ingest surfaces, graph element contract, visual property namespace, projection rules, canvas-domain findings | **This module** |

**Neutrality**: this module names the render target, the ingest surfaces, and the projection behaviour **by function**. Concrete surface identifiers, notation keywords, and property prefixes appear only under the labelled reference-implementation section at the end, and may be swapped for any equivalent registry without changing a single rule above it.

## Module Index

- `scope--ownership` — ownership split and notation neutrality
- `rule-identity` — Rule ID derivation inside this module
- `render-target-contract` — the five parts that make a diagram canvas-renderable
- `surface-declaration` — declaring the target surface in frontmatter
- `ingest-surface-contract` — the three ways a canvas reads a diagram
- `graph-element-contract` — required identity on every projected node and edge
- `convertibility-rule` — which notation kinds project into a graph and which do not
- `visual-property-namespace` — author-controlled presentation, and its precedence
- `projection-rules` — direction, cluster, boundary, and lane projection
- `zero-cost-render-rule` — ingest is parse-only; render paths never spend tokens
- `dual-target-portability` — one source that satisfies both consumers
- `invocation-register` — the `/`, `#`, and `@` routes this module declares
- `reference-implementation--surface-registry` — a concrete registry, non-binding
- `conformance-findings--canvas-domain` — the typed canvas finding vocabulary
- `validation-checklist-canvas-render` — authoring, review, and gate items

---

## Rule Identity

Inherits the parent set's derivation unchanged:

```
Rule ID = [owning section anchor] + "#" + [ordinal of the rule within that section, in document order]
```

**Directives**:
- Derive every Rule ID from its owning `##` section anchor and the rule's document-order ordinal; forbid deriving it from a file name, a directory, or a line number
- Classify every rule here as artifact-bearing or advisory by the parent set's definitions; a declared surface, an ingest block, a projected element, and a recorded render check are all locatable artifacts
- Report the canvas-domain coverage ratio separately, then report the union with the diagram-domain and authoring-domain ratios

---

## Render Target Contract

A diagram is **canvas-renderable** when all five parts hold. Each part is separately raisable, because each fails independently.

| Part | Requirement | Absent ⇒ |
|---|---|---|
| **Declared surface** | The document names the target surface (or surfaces) the diagram is authored for | `undeclared-render-surface` |
| **Supported ingest** | The diagram sits in an ingest surface the target parses | `unsupported-ingest-surface` |
| **Convertible kind** | The notation kind projects into node-link elements on that target | `non-projecting-diagram-kind` |
| **Complete elements** | Every projected node and edge carries its required identity fields | `incomplete-graph-element` |
| **Authored connections** | Every intended connection is stated in source | `renderer-inferred-edge` |

**Directives**:
- Satisfy all five parts before claiming a diagram is canvas-renderable; a claim resting on a static render alone is the parent set's `unproven-claim`
- Treat a diagram that renders as a picture but projects zero nodes as a defect, not a partial success; the canvas consumer received nothing
- Verify canvas-renderability by a named check that reports projected node, edge, and cluster counts, and record those counts as the Evidence Reference; a claim with no counts is `render-proof-absent`
- Keep the check parse-only, deterministic, and order-independent, per the parent set's Check Determinism properties; a reference implementation of such a check is `scripts/check-diagram-canvas-render.mjs`, invocable against any file or directory and exiting non-zero on any finding
- Keep the diagram's own identity contract intact: a canvas-renderable diagram still carries its ID, class, caption, and inventory table per the diagram companion

---

## Surface Declaration

The target surface is a **declared** property of the document, never inferred from the diagram's shape or from which viewer happened to open it.

**Directives**:
- Declare the target surface set in frontmatter, using identifiers drawn from the target's own surface registry; an undeclared surface is `undeclared-render-surface`
- Declare the render mode alongside the surface where the target separates mode from surface, so a two-dimensional surface is never selected under a three-dimensional mode
- Declare exactly one **primary** surface per document and list additional surfaces as secondary; two surfaces claiming primacy is `ambiguous-render-surface`
- Verify every declared identifier resolves in the target registry; an identifier that resolves to nothing is the parent set's `unresolvable-reference`
- Forbid deriving the surface from a file name, a directory, or a heading; this is the parent set's agnosticity rule applied to rendering
- Re-declare the surface set whenever a diagram class is added that the current primary surface does not project; a stale declaration is `surface-declaration-drift`

---

## Ingest Surface Contract

A canvas reads a diagram from one of three places. Which places a target supports is a property of the target; that a diagram must sit in a supported one is a rule.

| Ingest surface | Shape | Typical use |
|---|---|---|
| **Fenced notation block** | A fenced block in the document body, tagged with a notation language the target recognises | Structural and flow diagrams authored inline beside their prose |
| **Frontmatter notation scalar** | The same notation carried as a frontmatter scalar | A document whose primary payload is one diagram |
| **Frontmatter graph envelope** | A structured frontmatter block declaring nodes, connections, and connection types directly | Surfaces that project only from frontmatter, and diagrams needing typed ports |

**Directives**:
- Place every canvas-renderable diagram in an ingest surface the declared primary surface parses; a body block authored for a frontmatter-only surface is `unsupported-ingest-surface`
- Tag every fenced notation block with a language the target recognises; forbid relying on untagged-block sniffing, which is a tolerance, not a contract
- Quote or block-scalar every frontmatter notation payload so reserved punctuation survives a strict parser, per the parent set's frontmatter quoting rule
- Declare connection types in the graph envelope where the surface supports typed ports, and reference them from every connection; an untyped connection on a typed surface is `untyped-connection`
- Keep one diagram's source in one ingest surface; the same diagram duplicated across a body block and a frontmatter scalar projects twice and is `duplicate-projection`
- Forbid an ingest surface whose content must be generated at read time by a model call; see the zero-cost render rule

---

## Graph Element Contract

Projection is only as good as the identity the author supplies. Every projected element carries required fields; a canvas cannot invent them.

| Element | Required | Author-supplied optional |
|---|---|---|
| **Node** | Stable identifier, human label, element type | Position, pinned position, presentation properties, domain properties |
| **Edge** | Stable identifier, source identifier, target identifier, relation label | Relation type, presentation properties, domain properties |
| **Graph** | Element type name for the graph itself | Context, metadata |

**Directives**:
- Give every node a stable identifier that survives unrelated edits, a human-readable label, and an element type; a node missing any of the three is `incomplete-graph-element`
- Give every edge an identifier, a source, a target, and a relation label; an unlabelled edge projects as an untyped line and is the diagram companion's `unlabelled-edge` as well as `incomplete-graph-element`
- Keep the identifier separate from the label: the identifier is machine identity and the label is human text; forbid a human sentence used as an identifier
- Assign element types from a declared type vocabulary, because the target resolves presentation and grouping by type; an undeclared type is `undeclared-element-type`
- State every intended connection in source. A canvas projects the connections it is given and must not be expected to infer them from adjacency, ordering, or naming; an intended-but-unstated connection is `renderer-inferred-edge`
- Forbid an edge whose source or target identifier does not resolve to a declared node; a dangling endpoint is the parent set's `unresolvable-reference`

---

## Convertibility Rule

Not every notation kind becomes a graph. A target typically projects **structural and flow** kinds into nodes and edges, and renders **timeline, history, and sequence** kinds on their own dedicated surfaces without contributing any elements to the node-link graph.

**Directives**:
- Author any diagram whose purpose is node-link projection in a structural or flow notation kind; a timeline or history kind authored to populate a graph is `non-projecting-diagram-kind`
- Route a timeline or history diagram to the dedicated surface that renders it, and declare that surface; forbid claiming such a diagram contributes nodes to the graph
- Verify the projected element count before claiming a class is canvas-renderable on a target; a kind the target renders but does not project yields nodes zero, and that is the expected result rather than a bug
- Record which declared surface renders each diagram class in the document's diagram register, so a reader knows which surface to open per diagram
- Split a document that needs both projection and timeline rendering into two diagrams with two IDs and two surfaces, per the diagram companion's one-class-per-diagram rule

---

## Visual Property Namespace

Presentation is authored, namespaced, and resolved by a stated precedence. This is what keeps a canvas render deterministic instead of theme-dependent.

```
element presentation property (namespaced) → plain property → type-derived style → schema default → palette default
```

**Directives**:
- Express every author-chosen fill, stroke, label colour, shape, size, and layer as a namespaced presentation property on the element; forbid depending on a default palette to carry meaning
- Set presentation through the notation's own style and class mechanisms where the ingest path maps them onto the namespace, so one authored value serves both the static render and the canvas render
- Keep the presentation namespace distinct from the domain property namespace on the same element; mixing them makes a style change look like a data change
- State the shape vocabulary the target accepts before using shape as a typed signal, and confirm each value projects to the primitive intended; a shape whose projected primitive differs from the authored intent is `shape-primitive-mismatch`
- Forbid conveying meaning by presentation alone: every colour, shape, and size signal is also carried by a label or an element type, so the graph stays queryable and the render stays accessible
- Derive size from a declared property or accept the target's degree-derived default explicitly; an unstated size expectation is advisory, not a defect

---

## Projection Rules

How authored structure becomes canvas structure. Each rule exists because the projection is lossy in a specific, predictable way.

### Direction

- Declare the flow direction explicitly on every projecting diagram; the target derives layout orientation and edge sense from that declaration, so an omitted direction yields a default the author did not choose
- Choose direction by subject, per the diagram companion: structural top-to-bottom, pipelines and lanes left-to-right
- Expect a reversed-direction declaration to reverse edge sense in the projection; forbid using a reversed direction merely to improve visual layout, because it changes the projected graph

### Clusters and Boundaries

- Author every boundary as a named nested group in the notation; the target projects it into a cluster element plus a membership record, and an unnamed group projects an anonymous cluster
- Expect a cluster to appear as an element in the projected graph, not only as a visual frame; count it when checking element counts and list it in the inventory table
- Keep nesting within the diagram companion's two-level limit; deeper nesting projects a membership chain that no layout resolves legibly
- Name lanes as boundaries where the class carries lanes, so lane membership survives projection; a lane present in the table and absent from the projected graph is the diagram companion's `diagram-spec-drift`

### Positions

- Supply positions only where layout must be stable across renders; an authored position is honoured and a pinned position is fixed against the layout simulation
- Forbid hand-positioning an entire projecting diagram to compensate for a layout preference; that converts a graph into a picture and defeats the canvas consumer

---

## Zero-Cost Render Rule

The parent set requires every discovery and read path to spend zero model tokens. Rendering a diagram is a read path.

**Directives**:
- Keep every ingest, projection, and render path parse-only and free of model calls; a render path that invokes a paid model is the parent set's `paid-read-path`
- Count the diagram source as the loaded cost, per the diagram companion; a projected graph adds no authoring token cost beyond its source
- Forbid generating diagram source at read time to satisfy a render; generate it at authoring time, record it in source, and version it
- Record the render check's cost fields as zero in the Evidence Reference, so a future non-zero value is visible as a regression rather than as noise

---

## Dual-Target Portability

Most diagrams must satisfy two consumers at once: a static notation renderer embedded in a document host, and a graph canvas surface. One source can satisfy both, but only under constraints.

**Directives**:
- Author one source per diagram and let both consumers read it; forbid maintaining a static variant and a canvas variant of the same diagram, which guarantees drift
- Restrict the notation to the intersection the two consumers both support: explicit direction, identifier-safe keys, labels in label position, stated edge labels, named groups, and style through class or style statements
- Use the notation's canonical edge-label form, not a tolerated alias, because an alias is normalised by one consumer and may be ignored by the other; an alias-labelled edge is a `non-canonical-edge-label`
- Declare the flow direction explicitly on every projecting diagram; an omitted direction yields a layout the author did not choose and is a `missing-explicit-direction`
- Avoid any shape whose projected primitive differs from its visual reading on the static renderer; where the target documents such a divergence, choose a different shape rather than relying on the divergence
- Verify both consumers on every changed diagram: the static render must be legible and the projection must report the expected element counts; verifying one and claiming both is `render-proof-absent`
- Where the intersection cannot express the diagram, split it: keep the projecting structure in the portable diagram and move the non-portable presentation into the companion inventory table

---

## Invocation Register

| Route | Kind | Owner | Typed arguments | Trust boundary | Token cost |
|---|---|---|---|---|---|
| `/diagram.render` | Command | Canvas render owner | `{ documentRef, diagramId, surfaceId }` | read | 0 |
| `/diagram.project` | Command | Canvas render owner | `{ documentRef, diagramId }` → `{ nodeCount, edgeCount, clusterCount }` | read | 0 |
| `/diagram.verify` | Command | Evaluator mechanism | `{ documentRef, diagramId, expectedCounts }` → typed findings | read | 0 |
| `#diagram` | Tag | Diagram companion owner | — | read | 0 |
| `#canvas-render` | Tag | This module | — | read | 0 |
| `@render-surface` | Binding | Target surface registry | — | read | 0 |
| `@diagram-register` | Binding | Owning document | — | read | 0 |

**Directives**:
- Declare each of these routes in exactly one register; a route declared nowhere is the parent set's `orphan-route` and one declared twice is `ambiguous-route`
- Keep every route above at zero token cost, consistent with the zero-cost render rule; a non-zero cost is `paid-read-path`
- Route only read operations here; a spend-bearing or mutating render operation belongs to a control-plane surface and is out of this module's scope
- Register any tool identity that implements these routes in both the federation contract and the capability catalog, per the parent set

---

## Reference Implementation — Surface Registry

*Non-binding. This section names concrete products solely to show one registry that satisfies the contract above; every identifier here may be swapped for an equivalent without changing any rule.*

One reference implementation is the `agentic-graph` Canvas, whose two-dimensional render mode exposes a named surface registry titled `2D Renderer: [label]`. Its twelve surface identifiers, and what each projects, are the concrete instance of the Surface Declaration rules:

| Surface id | Registry label | Projects a node-link graph | Notes |
|---|---|---|---|
| `d3` | D3 Graph | Yes | Force-directed node-link surface |
| `flowchart` | Flowchart | Yes | Bipartite framing over the same graph |
| `dashboard` | Dashboard | Yes, graph-derived | Card projection over the graph |
| `multiDimTable` | Multi-dimensional Table | Yes, tabular | Structured table projection |
| `storyboard` | Storyboard | Yes, from the graph envelope | Default surface; the only one accepting the frontmatter graph-envelope syntax |
| `flow` | Flow Canvas | Yes, from the graph envelope | Frontmatter-only surface |
| `design` | Design | Structural inspection | Wireframe inspection surface |
| `gallery` | Gallery | No | Document gallery |
| `media` | Media | No | Rich media surface |
| `animatic` | Animatic | No | Beat timeline editor |
| `gitGraph` | GitGraph | No | Renders history notation on its own surface |
| `gantt` | Gantt-timeline | No | Renders timeline notation on its own surface |

Concrete bindings for the neutral rules above, in this reference implementation:

- **Notation**: Mermaid. Recognised fence languages are `mermaid` and `mmd`; `graph` and `gitgraph` are tolerated aliases, and an untagged fence is sniffed from its first meaningful line
- **Convertibility**: only `flowchart` / `graph` declarations project into nodes and edges. `gitGraph`, `gantt`, and `timeline` declarations render on their own surfaces and contribute no graph elements
- **Ingest surfaces**: a fenced body block; the frontmatter `mermaid:` scalar, optionally narrowed by `mermaidAnchorsOnly: true`; and the frontmatter `flow:` envelope carrying `nodes`, `connections` or `edges`, and `socket_types`
- **Surface declaration keys**: `agenticOsCanvasRenderMode: "2d"` with `agenticOsCanvas2dRenderer: "[surface id]"`, plus an optional `surfaces: ["2D Renderer: [label]", ...]` list
- **Graph element contract**: `GraphNode` requires `id`, `label`, `type`, `properties`; `GraphEdge` requires `id`, `source`, `target`, `label`, `properties`
- **Presentation namespace**: the `visual:` prefix — `visual:fill`, `visual:stroke`, `visual:labelColor`, `visual:color`, `visual:shape` (`rect` | `circle` | `diamond` | `hex`), `visual:width`, `visual:height`, `visual:nodeSize`, `visual:strokeWidth`, `visual:zIndex`, `visual:layer`, `visual:nestingDepth`. Notation `style`, `classDef`, `class`, and `linkStyle` statements map onto this namespace
- **Shape-primitive divergence**: the `circle` shape projects as a *cluster* primitive and `hex` projects as an *edge* primitive, so a non-cluster node authored as a circle triggers `shape-primitive-mismatch`; author non-cluster nodes as `rect` or `diamond`
- **Direction projection**: `TD` / `TB` → vertical source→target, `BT` → vertical target→source, `LR` → horizontal source→target, `RL` → horizontal target→source
- **Cluster projection**: a `subgraph` block projects a cluster element plus a membership record carrying its member ids, parent, and kind
- **Edge-label normalisation**: `A -- label --> B` is normalised to `A-->|label|B`; author the canonical `|label|` form directly
- **Portability caution**: the reference implementation only guarantees projection for the structural/flow kind, so a portable diagram in this instance is a `flowchart` with an explicit direction, identifier-safe keys, `|label|` edges, named `subgraph` boundaries, and `classDef` / `style` presentation

---

## Conformance Findings — Canvas Domain

The **canvas-domain** member of the conformance vocabulary union. The recording contract, six fields, three severities, deduplication triple, ordering, and determinism properties are the parent set's and are reused unchanged; only the type enumeration is added here. The artifact reference for a canvas finding is the Diagram ID plus the declared surface id.

| Rule family | Finding Type | Severity |
|---|---|---|
| Surface declaration | `undeclared-render-surface` | `major` |
| Surface declaration | `ambiguous-render-surface` | `minor` |
| Surface declaration | `surface-declaration-drift` | `major` |
| Ingest | `unsupported-ingest-surface` | `major` |
| Ingest | `duplicate-projection` | `minor` |
| Ingest | `untyped-connection` | `major` |
| Convertibility | `non-projecting-diagram-kind` | `major` |
| Element contract | `incomplete-graph-element` | `major` |
| Element contract | `undeclared-element-type` | `minor` |
| Element contract | `renderer-inferred-edge` | `major` |
| Presentation | `shape-primitive-mismatch` | `minor` |
| Portability | `non-canonical-edge-label` | `minor` |
| Portability | `missing-explicit-direction` | `major` |
| Proof | `render-proof-absent` | `major` |

**Directives**:
- Treat this enumeration as the single source of truth for **canvas-domain** finding names; forbid redefining a type the authoring, execution, or diagram domain owns
- Raise the diagram domain's type where the defect is in the drawing and this module's type where the defect is in the projection; both may be raised for one diagram
- Raise the parent set's `paid-read-path` for a non-zero-cost render path, `unresolvable-reference` for a dangling endpoint or unresolvable surface id, and `unproven-claim` for a canvas-renderable claim with no recorded counts
- Anchor every finding to a Rule ID from this module and report a zero count for every type with no finding
- Extend the enumeration by adding a row here first, then the rule that raises it; forbid the reverse order, and forbid a type no rule here can raise

---

## Validation Checklist (Canvas Render)

**Authoring**:
- [ ] Primary render surface declared in frontmatter, with render mode where the target separates them; secondary surfaces listed, not competing for primacy
- [ ] Every declared surface identifier resolves in the target's surface registry
- [ ] Every canvas-renderable diagram placed in an ingest surface the primary surface parses, and tagged with a recognised notation language
- [ ] Diagrams intended to project authored in a structural or flow notation kind; timeline and history diagrams routed to their own declared surfaces
- [ ] Every node carries a stable identifier, a human label, and a declared element type; every edge carries an identifier, source, target, and relation label
- [ ] Every intended connection stated in source; no connection left for the target to infer
- [ ] Flow direction declared explicitly; boundaries authored as named groups within two levels of nesting
- [ ] Presentation expressed as namespaced properties or through style and class statements; no meaning carried by presentation alone
- [ ] Notation restricted to the intersection both consumers support; no shape used whose projected primitive contradicts its visual reading

**Review**:
- [ ] Projection verified by a named check reporting node, edge, and cluster counts, and those counts recorded as the Evidence Reference
- [ ] Static render verified legible in at least one host, and the source verified legible unrendered
- [ ] Counts reconciled against the companion inventory table, clusters included
- [ ] Render path confirmed parse-only with cost fields recorded as zero
- [ ] Diagram register lists every diagram with its class and the surface that renders it

**Alignment Gate** *(canvas-domain contribution to the Phase 3 alignment check)*:
- [ ] **Surface declared and resolvable** — else `undeclared-render-surface`, `ambiguous-render-surface`, `surface-declaration-drift`, or the parent set's `unresolvable-reference`
- [ ] **Ingest supported and singular** — else `unsupported-ingest-surface`, `duplicate-projection`, or `untyped-connection`
- [ ] **Kind projects on the declared surface** — else `non-projecting-diagram-kind`
- [ ] **Elements complete and connections authored** — else `incomplete-graph-element`, `undeclared-element-type`, or `renderer-inferred-edge`
- [ ] **Presentation projects as authored** — else `shape-primitive-mismatch`
- [ ] **Portable form held**: explicit direction and canonical edge labels — else `missing-explicit-direction` or `non-canonical-edge-label`
- [ ] **Render proof recorded** with counts and zero cost — else `render-proof-absent`, or the parent set's `paid-read-path` or `unproven-claim`
- [ ] **Canvas-domain coverage ratio stated**, with the advisory count reported separately
- [ ] **Zero `blocker` canvas findings** before baseline sign-off; `major` and `minor` resolved or formally tracked with an owner
