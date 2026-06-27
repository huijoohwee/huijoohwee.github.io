---
title: "Design Guidelines"
doc_type: "Guidelines"
version: "2.0.0"
date: "2026-06-25"
lang: "en-US"
frontmatter_contract: "required"
---

# Design Guidelines

## Scope & Neutrality Contract

- **Universal**: these guidelines apply to any product, domain, language, or runtime; nothing here assumes a specific company, repository, file path, framework, or vendor.
- **Neutral**: name components and roles by their function, never by a brand or project. Where a concrete tool is shown, it appears only as a non-binding *reference implementation* and may be swapped for any equivalent.
- **Agnostic**: design decisions are derived from component contracts and configuration schemas only — never from file names, directory layout, or project-specific data models. Examples use placeholders (`[...]`) rather than real identifiers.
- **Modular**: each `##` section is self-contained and addressable by its heading anchor (see Module Index). Sections may be lifted into another guideline set without rewriting their internals.

## Module Index

- `scope--neutrality-contract` — universality, neutrality, agnosticism, modularity rules
- `core-design-principles` — composability, separation of concerns, emergent complexity
- `component-design-patterns` — atomic hierarchy, responsibility boundaries, SVO format
- `configuration-driven-design` — schema-first approach, theme and style system
- `flow-patterns` — user journey, workflow, data flow, orchestration/harness, topology integration
- `state-management-architecture` — unidirectional data flow, normalization
- `accessibility--internationalization` — a11y requirements, i18n strategy
- `performance-design-patterns` — rendering optimization, data fetching
- `cid-directive-matrix` — alphabetical, project-agnostic design directives
- `anti-pattern-guards` — prohibited patterns and their corrections
- `design-validation-checklist` — pre-implementation and post-documentation gates
- `documentation-integration` — SVO hooks, configuration surface, neutrality alignment
- `prd--tad-design-alignment` — traceability to PRD/TAD standards

---

## Core Design Principles

**Universal Composability**: domain-agnostic building blocks | configuration-driven assembly | schema-aligned interfaces | provenance-aware state

**Separation of Concerns**: Structure ≠ Semantics ≠ Presentation ≠ Behavior | each layer independently configurable

**Emergent Complexity**: simple primitives → complex behaviors via composition | forbid monolithic components

**Min-Viable-Max-Value**: ship the smallest component scope that delivers the largest user impact; defer complexity to composition, not internals

**TCO-Zero at Design Layer**: prefer zero-dependency rendering primitives; every third-party UI library requires explicit justification against a zero-dependency or FOSS alternative

**Harness-First Rendering**: AI-generated or dynamic content surfaces through typed, schema-validated render contracts — not raw string injection

---

## Component Design Patterns

### Atomic Design Hierarchy

**From primitives to systems**: Atoms → Molecules → Organisms → Templates → Pages

Every level in the hierarchy must be traversable without domain knowledge. A component at any level must render correctly given only its props schema — no ambient context, no hardcoded content.

**Component Description Pattern**:

> **From `[input_props]` to `[rendered_output]`**: Component → validates props via schema → computes state using pure functions → renders structure with accessibility hooks → emits events with metadata → delivers UI for `[user_interaction]`.

### Responsibility Boundaries (SVO)

Every component responsibility is expressed as a Subject–Verb–Object (SVO) directive:

> `[Component]` **verbs** `[data/artifact]` **via** `[mechanism]`

**Reference table (placeholders only — substitute real identifiers)**:

| Layer | Component | Verb | Object | Mechanism |
|-------|-----------|------|--------|-----------|
| Atom | `[ActionTrigger]` | dispatches | action events | to parent handlers |
| Molecule | `[InputProcessor]` | normalizes | input text | via sanitization rules |
| Organism | `[ListRenderer]` | virtualizes | row rendering | using windowing strategy |
| Template | `[PageLayout]` | composes | region slots | from configuration schema |

**Principles**: one component = one responsibility | props-driven behavior | zero hardcoded content

### Composition Rules

- Components at the same hierarchy level must not directly reference each other; mediate via a parent or a shared store
- Forbid components that import from a sibling at the same atomic level
- Cross-cutting concerns (logging, theming, i18n) are injected via context or configuration — never imported directly into leaf components

---

## Configuration-Driven Design

### Schema-First Approach

**Pattern**: define schema → generate types → validate runtime props → render from config

Every configurable surface must expose a schema before implementation begins. The schema is the contract between the component author and the component consumer.

**Configuration Schema Template** *(placeholders — adapt to actual runtime)*:

```yaml
component:
  type: "[ComponentType]"
  data_source: "${config.[endpoint_key]}"
  transform: "${transforms.[transform_name]}"
  render_mode: "[chart | table | list | custom]"
  accessibility:
    aria_label: "${i18n.[namespace].[key]}"
    keyboard_nav: true
```

**Rule**: every configurable behavior change must be achievable via a configuration change, not a code edit.

**Rule**: configuration schemas are versioned alongside the component; breaking schema changes require a major version bump.

### Theme and Style System

**Abstraction layers** (from most abstract to most concrete):

1. **Design Tokens** — semantic color, spacing, and typography variables (e.g., `--color-action-primary`, `--spacing-md`). These are the only values that may be referenced by components.
2. **Theme Modes** — sets of token values for each rendering context (e.g., Light, Dark, System). Components receive the active mode via context injection; they never read system state directly.
3. **Semantic Variables** — CSS custom properties scoped to surface areas (e.g., `--panel-bg`, `--toolbar-opacity`). Derived from tokens; never hardcoded.
4. **Component Classes** — stable, namespaced class names for layout and structural elements. Must not encode visual values; visual values come from tokens only.

**Rules**:
- Forbid raw hex, RGB, or named color literals anywhere in component code — reference tokens only.
- Forbid hardcoded numeric spacing values (e.g., `16px`) — reference spacing tokens only.
- Forbid utility class tokens that encode visual values (e.g., `text-gray-500`) inside component logic — use semantic tokens.
- Components must be theme-agnostic: they render correctly under any token set injected via context.
- Enforce 100% token coverage; remove legacy hardcoded style values on every touch.

### Code Block and Syntax Highlighting Pattern

**Structure**: `[highlight-container]` → `[pre]` → `[code-block]` → `[copy-trigger]`

**Rules**:
- Syntax highlighting is driven by the active theme token set — never by hardcoded color values.
- Copy triggers use absolute positioning relative to the highlight container; no layout-breaking floats.
- Language labels are injected via configuration, not hardcoded.

### Table and List Patterns

| State | Token reference | Rationale |
|-------|----------------|-----------|
| Row default | `[tokens.table.rowBg]` | Flat background; no zebra striping |
| Row hover | `[tokens.table.rowHover]` | Subtle tint for interactive context |
| Row selected | `[tokens.table.rowSelected]` | Distinct from hover; no border override |
| Drop target | `[tokens.dnd.dropIndicator]` | Consistent insertion-point indicator |

**Rule**: selection and hover states are mutually exclusive; encode them as separate token-driven classes, never combined.

### Preview Gallery Pattern

Gallery items follow the same selection/hover model as tables: a selection token for chosen state, a hover token for pointer-over state. Drag-and-drop indicators use the `[tokens.dnd.dropIndicator]` token for drop targets and insertion points.

**Rule**: gallery and table interaction models share a single token namespace to ensure visual consistency across surface types.

---

## Flow Patterns

These design-layer flow patterns are directly aligned with the five canonical flow types defined in the PRD/TAD guidelines. Every user-facing feature must trace through all five.

### User Journey Flow (Design Layer)

The user journey defines which components surface at each stage. Before designing any component, identify its journey anchor.

**Directive**: map journey stages to component surfaces before writing any component spec; forbid components with no journey anchor.

### Workflow Flow (Design Layer)

Workflows define the interaction sequences a component must support. Every interactive component must specify:
- **Trigger**: the event or user action that initiates the flow
- **Happy path**: the expected sequence of state transitions
- **Alternate paths**: divergent sequences under valid but non-default conditions
- **Error paths**: failure modes and recovery UI states
- **Postconditions**: the observable component state after the workflow completes

**Interaction Pattern — Click-to-Edit**:

| Step | Actor | Action | System response |
|------|-------|--------|----------------|
| 1 | User | clicks content block | Viewer captures click; identifies source context |
| 2 | Controller | evaluates layout mode | switches to edit mode if not already active |
| 3 | Controller | synchronizes scroll position | focuses editor at source context |
| 4 | User | begins editing | Editor is active and focused |

**Postcondition**: layout is in edit mode; editor is focused at the context matching the clicked block; no data loss.

### Data Flow (Design Layer)

Components are consumers and producers in data flows. Each component must declare:
- **Input schema**: what it accepts (typed props or store slice)
- **Output schema**: what it emits (events, mutations, or artifacts)
- **Persistence**: whether it reads from or writes to persistent state
- **Error handling**: what it renders when the input is invalid or the data fetch fails

**Cache-first Fetch Pattern**:

> Component → checks cache via key → returns stale data immediately → fetches fresh in background → updates cache → triggers re-render if changed.

**Rule**: every component that fetches data must define a loading state, a stale state, an error state, and an empty state.

### Orchestration/Harness Flow (Design Layer)

When a component surfaces AI-generated or model-driven content, it is a **consumer** in an Orchestration/Harness Flow. The component:
- Accepts only typed, schema-validated output from the harness — never raw model responses
- Renders a defined loading state while the harness is executing
- Renders a defined error state if the harness returns a typed error
- Never calls a model directly; never constructs prompt strings inline

**AI Content Consumer Pattern**:

> `[AIContentComponent]` → receives typed harness output → validates against output schema → renders structured content | renders typed error state

**Rule**: forbid components that call AI models directly; forbid components that render raw LLM output without schema validation.

### Topology (Design Layer)

The component topology maps which components exist, at which atomic level, how they connect, and what data they share. For any feature with ≥3 components:

- Document the component topology before implementation
- Name every connection type (prop-pass, event-emit, store-subscribe, context-inject)
- State which components own state and which derive or consume it
- Version-stamp the topology on every structural change

**Rule**: forbid undocumented multi-component connection maps.

---

## State Management Architecture

### Unidirectional Data Flow

**Pattern**: Action → Reducer → State → View → Action

> **From user input to state update**: User → triggers event via interaction → dispatcher validates action schema → reducer computes next state using pure logic → store notifies subscribers with diff → view re-renders affected subtree.

**Rules**:
- State mutations only via dispatched actions; forbid direct state assignment outside reducers
- Reducers are pure functions; forbid side effects inside reducers
- Actions carry typed payloads; forbid untyped or `any`-typed action payloads

### State Normalization

**Structure**: entities by ID | relationships by reference | derived data via selectors

```
state = {
  entities: {
    [entityType]: { "[id]": { ...fields } }
  },
  relationships: {
    [relationshipName]: { "[id]": ["[relatedId]", ...] }
  }
}
```

**Rules**:
- Single source of truth; forbid duplicate data across state slices
- Compute derived data in selectors on read; forbid denormalized writes
- Selectors are pure functions; memoize selectors that compose multiple slices

### Token Sharing for Rendering Pipelines

When multiple consumers (e.g., viewer, table of contents, editor) operate on the same parsed content:
- Compute shared lexing tokens once at the parent level
- Pass tokens down to consumers via props or context
- Forbid redundant re-parsing of the same source in sibling components

**Rule**: token sharing reduces CPU load and ensures consumer synchronization; forbid redundant lexing across sibling consumers of the same source.

---

## Accessibility and Internationalization

### A11y Requirements

**Mandatory for every interactive component**:
- Semantic HTML (`<button>` not `<div onclick>`; `<nav>` not `<div class="nav">`)
- ARIA labels for dynamic or non-descriptive interactive elements
- Full keyboard navigation (Tab, Shift+Tab, Enter, Space, Escape)
- Focus management for modals, dialogs, and overlays
- Color contrast ≥ 4.5:1 for body text; ≥ 3:1 for large text and UI components

**Pattern**:

> Every interactive component → keyboard accessible → screen reader friendly → focus indicator visible → contrast compliant

**Rule**: accessibility is not a post-implementation audit; it is a component acceptance criterion.

### i18n Strategy

**Structure**: `[i18n_root]/[locale]/[namespace].[ext]`

**Usage**: `t('[namespace].[key]')` not inline string literals

**Rules**:
- Zero hardcoded user-facing strings in component code; all text externalized
- RTL support via CSS logical properties (`margin-inline-start` not `margin-left`)
- Locale-sensitive formatting (dates, numbers, currencies) via a single formatting utility; forbid inline `toLocaleString` calls in components
- Component renders correctly under all supported locales without code changes

---

## Performance Design Patterns

### Rendering Optimization

**Techniques**:

| Technique | When to apply |
|-----------|--------------|
| Memoization (`memo`, `useMemo`, `useCallback`) | Components or values that re-render with equal inputs |
| Virtualization | Lists or grids exceeding 100 items |
| Code splitting | Route-level and feature-level lazy boundaries |
| Lazy loading | Below-fold content; non-critical images |
| Token sharing | Multiple consumers of the same parsed source |

**Core Web Vitals targets**:

| Metric | Target |
|--------|--------|
| FCP | < 1.8 s |
| LCP | < 2.5 s |
| CLS | < 0.1 |
| TTI | < 3.8 s |

**Rule**: performance targets are component acceptance criteria, not aspirational metrics.

### Data Fetching

**Pattern**: cache-first → stale-while-revalidate → optimistic updates

> Component → checks cache via key → returns stale data immediately → fetches fresh data in background → updates cache → triggers re-render if changed.

**Rules**:
- Every data-fetching component defines all four states: loading, stale, error, empty
- Forbid blocking synchronous reads (e.g., `localStorage`) during render
- Optimistic updates must define a rollback path for failed writes

---

## CID Directive Matrix

Each row is a universal, neutral, project-agnostic directive in `Context | Intent | Directive` grammar. Rows are sorted A→Z.

| Context | Intent | Directive |
|---------|--------|-----------|
| Accessibility | Ensure inclusive component design | - [ ] Implement semantic HTML, ARIA, keyboard nav, and contrast compliance in every interactive component; forbid accessibility as a post-implementation audit |
| Adaptability | Enable configuration-driven rendering | - [ ] Design components to adapt behavior via props/config; forbid hardcoded visual logic; forbid behavior changes that require code edits |
| AI Content | Surface model output safely | - [ ] Accept only typed harness output; validate against output schema before rendering; forbid raw LLM response rendering |
| Atomicity | Enforce hierarchy boundaries | - [ ] Assign every component to exactly one atomic level; forbid direct sibling-level references; mediate cross-level communication via parent or shared store |
| Caching | Minimize redundant computation | - [ ] Apply cache-first data fetching; share lexing tokens across sibling consumers; forbid redundant re-parsing of the same source |
| Composition | Build complex UIs from primitives | - [ ] Compose complex behaviors from atomic primitives; forbid monolithic components; enforce hierarchy boundaries |
| Configuration | Drive behavior from schema | - [ ] Define a schema before implementing any configurable surface; version schemas alongside components; forbid implicit configuration |
| Contracts | Define component interfaces explicitly | - [ ] Document props schema, emitted events, and store dependencies for every component; forbid implicit prop assumptions |
| Data States | Handle all fetch states | - [ ] Define loading, stale, error, and empty states for every data-fetching component; forbid single-state components |
| Dependencies | Minimize and justify third-party UI libraries | - [ ] Identify a zero-dependency or FOSS alternative before selecting any third-party UI library; document TCO justification; forbid undocumented vendor lock-in |
| Documentation | Enable SVO-style description | - [ ] Every component must be describable as "[Component] verbs [artifact] via [mechanism]"; forbid components with no stated responsibility |
| Error States | Specify failure rendering | - [ ] Define an error state for every component that fetches data or receives harness output; forbid silent error swallowing in UI |
| Harness Integration | Consume AI output safely | - [ ] Components are consumers of typed harness output only; forbid direct model calls from component code; forbid rendering unvalidated model responses |
| i18n | Externalize all user-facing text | - [ ] Use translation keys for all strings; support RTL via CSS logical properties; forbid hardcoded user-facing strings in component code |
| Journeys | Anchor components to user flows | - [ ] Map every component to a journey stage before writing its spec; forbid components with no journey anchor |
| Maintainability | Design for evolution | - [ ] Keep components under 300 lines; single responsibility; configuration-driven; forbid rigid, hardcoded component internals |
| Modularity | Enforce independent component units | - [ ] Each component is independently testable and renderable given only its props schema; forbid ambient context dependencies |
| Neutrality | Maintain domain independence | - [ ] Forbid project names, dataset-specific entity types, and domain-specific labels in component code; use schema-driven entity types |
| Observability | Enable component transparency | - [ ] Emit typed events with metadata for every significant user interaction; forbid fire-and-forget interactions with no observable output |
| Performance | Meet rendering targets | - [ ] Apply memoization, virtualization, and code splitting per the performance pattern table; validate against Core Web Vitals targets; forbid unoptimized long lists |
| Responsibility | Enforce single responsibility | - [ ] One component = one responsibility; express responsibility as an SVO directive; forbid god components (> 300 lines or > 10 props) |
| Schemas | Define data shapes at every boundary | - [ ] Validate props at component entry; validate harness output before rendering; forbid untyped or `any`-typed boundaries |
| Separation | Maintain layer boundaries | - [ ] Structure ≠ Semantics ≠ Presentation ≠ Behavior; configure each layer independently; forbid cross-layer coupling |
| State | Enforce unidirectional flow | - [ ] Mutations only via dispatched actions; reducers are pure; selectors are memoized; forbid direct state mutation |
| Theming | Enforce token-only styling | - [ ] Reference design tokens only; forbid raw hex, hardcoded spacing, or utility color classes in component logic; enforce 100% token coverage |
| Topology | Document component connections | - [ ] Map component topology for features with ≥3 components; name every connection type; version-stamp structural changes; forbid implicit connections |
| Traceability | Link components to requirements | - [ ] Map every component to a TAD component specification and a PRD user story; forbid orphaned components |
| Workflows | Define interaction sequences | - [ ] Specify trigger, happy path, alternate paths, error paths, and postconditions for every interactive component; forbid undocumented interaction sequences |

---

## Anti-Pattern Guards

**Component Design**:
❌ God components (> 300 lines, > 10 props)
→ ✅ Single-responsibility components; decompose via atomic hierarchy

❌ Prop drilling > 3 levels
→ ✅ Context injection or store subscription for deeply shared state

❌ Inline styles with magic numbers
→ ✅ Design token references only; no raw hex or px literals in component code

❌ Hardcoded content strings, project names, or dataset-specific labels
→ ✅ i18n keys and schema-driven entity types; zero hardcoded user-facing strings

❌ Direct sibling-level component imports
→ ✅ Mediate via parent or shared store; respect atomic hierarchy boundaries

**State Management**:
❌ Direct state mutation
→ ✅ Dispatch typed actions; mutations only via pure reducers

❌ Non-serializable state (functions, Promises, class instances)
→ ✅ Serialize state to plain objects; move non-serializable logic to effects

❌ Circular dependencies between components or state slices
→ ✅ Unidirectional dependency graph; shared logic extracted to utilities

❌ Global mutable singletons
→ ✅ Store slices with explicit ownership; inject dependencies via context

❌ Redundant lexing (multiple sibling consumers re-parsing the same source)
→ ✅ Compute tokens once at parent level; share via props or context

**Theming**:
❌ Raw hex, RGB, or named color literals in component code
→ ✅ Semantic design token references only

❌ Hardcoded numeric spacing (e.g., `margin: 16px`) in component code
→ ✅ Spacing token references only

❌ Utility color classes that encode visual values inside component logic
→ ✅ Semantic token classes; theme-agnostic component internals

**AI/Harness Integration**:
❌ Components calling AI models directly; raw LLM response rendering
→ ✅ Components consume typed harness output only; validate against output schema before render

❌ Untyped or `any`-typed harness output passed to render
→ ✅ Typed output schema enforced at the harness boundary; typed error state rendered on schema failure

**Performance**:
❌ Unnecessary re-renders (missing memoization on stable inputs)
→ ✅ `memo`, `useMemo`, `useCallback` applied to components and values with stable inputs

❌ Blocking main thread > 50 ms
→ ✅ Offload heavy computation to workers or split across frames

❌ Unoptimized images (no lazy load, no modern format)
→ ✅ Lazy-loaded, modern-format (WebP/AVIF) images with explicit dimensions

❌ Synchronous `localStorage` reads in render
→ ✅ Read in effects or at initialization; cache in state

**Data Fetching**:
❌ No loading, error, or empty states defined
→ ✅ All four states (loading, stale, error, empty) defined per data-fetching component

❌ Silent error swallowing (no error UI, no logging)
→ ✅ Typed error states rendered; errors surfaced to observability layer

---

## Design Validation Checklist

### Structural (Required)

- [ ] Component is < 300 lines and has a single stated responsibility in SVO format
- [ ] Props schema is defined and type-validated; no `any`-typed props
- [ ] Zero hardcoded content, colors, spacing, or project-specific labels
- [ ] Accessibility: semantic HTML, ARIA labels, keyboard nav, focus management, contrast ≥ 4.5:1
- [ ] Component is mapped to a journey stage (journey anchor confirmed)

### Configuration (Required)

- [ ] Behavior is controlled via props or configuration schema
- [ ] Design tokens used for all visual values (no magic numbers)
- [ ] i18n keys for all user-facing strings (no inline literals)
- [ ] Component renders correctly under ≥ 2 theme modes without code changes
- [ ] Schema is versioned alongside the component

### Performance (Required)

- [ ] Memoization applied to components and values with stable inputs
- [ ] Virtualization applied for lists > 100 items
- [ ] Code split at route and feature boundaries
- [ ] Core Web Vitals targets met: FCP < 1.8 s, LCP < 2.5 s, CLS < 0.1, TTI < 3.8 s
- [ ] Token sharing applied where multiple sibling consumers parse the same source

### State (Required)

- [ ] Normalized entity structure (entities by ID, relationships by reference)
- [ ] Unidirectional data flow (action → reducer → state → view)
- [ ] Pure reducer functions (no side effects)
- [ ] Selectors used for derived data; memoized where they compose multiple slices

### Workflow (Required)

- [ ] Trigger, happy path, alternate paths, error paths, and postconditions defined for every interactive component
- [ ] All four data states defined: loading, stale, error, empty
- [ ] Optimistic updates include a rollback path

### AI/Harness Integration (Required for AI-powered components)

- [ ] Component accepts only typed harness output; no direct model calls
- [ ] Output schema validated before rendering; typed error state rendered on failure
- [ ] Loading state defined for harness execution period
- [ ] No raw LLM response rendered without schema validation

### Traceability (Required)

- [ ] Component mapped to a TAD component specification
- [ ] Component mapped to a PRD user story
- [ ] Component topology documented for features with ≥ 3 components; connection types named

---

## Documentation Integration

Designs are easy to document when components conform to these conventions:

### Component Documentation Hooks

Every component supports a description of the form:

> **From `[input_props]` to `[rendered_output]`**: Component → validates props via schema → computes state using pure functions → renders structure with accessibility hooks → emits events with metadata → delivers UI for `[user_interaction]`.

Responsibilities are expressible as SVO directives:

> `[Component]` **verbs** `[artifact]` **via** `[mechanism]`

### Configuration Surface

Parameters are expressible in configuration schemas:

| Field | Type | Default | Range / Options | Impact |
|-------|------|---------|-----------------|--------|
| `[param]` | `[type]` | `[default]` | `[min–max or enum]` | `[behavior change]` |

Behavior changes are achievable via configuration, not code edits.

### Neutrality Alignment

Design must avoid:
- Hardcoded project names, product names, or brand identifiers in component internals
- Dataset-specific entity types baked into component logic

Instead:
- Use schema-driven entity types (e.g., `config.entityType` injected via props)
- Use metadata fields and token references to adapt to different domains
- Forbid any domain assumption that cannot be overridden by configuration

---

## PRD and TAD Design Alignment

This section records how the design guidelines map to the PRD/TAD guidelines, enabling bidirectional traceability.

| Design Concept | PRD/TAD Counterpart | Traceability |
|----------------|--------------------|-|
| Component responsibility (SVO) | TAD Component Specification (SVO format) | Design spec → TAD component |
| Props schema | TAD Integration Contract (payload schema) | Design contract → TAD interface |
| Journey anchor | PRD User Journey Stage | Component → PRD-[Epic]-[Story] |
| Harness consumer pattern | TAD Orchestration/Harness Flow (Consumer role) | Design consumer → TAD harness |
| Token sharing | TAD Data Flow (Transform/Store stages) | Design optimization → TAD data flow |
| Topology documentation | TAD Topology | Design topology → TAD topology node |
| A11y acceptance criteria | PRD Acceptance Criteria (Given-When-Then) | Design criterion → VCC |
| Performance targets | PRD Success Metrics / TAD Quality Attributes | Design metric → PRD metric |
| Anti-pattern guards | PRD/TAD Anti-Pattern Guards | Design prohibition → documented guard |

**Traceability pattern** (extends PRD/TAD standard):

```
PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface] ↔ Design-[Component]-[Contract]
```

**Rules**:
- Every design component must be traceable to a TAD component specification
- Every design acceptance criterion must be expressible as a VCC (see PRD/TAD Guidelines — Autonomous Implementation Verification)
- Design documents are living documents: update in lockstep with PRD and TAD changes; apply semantic versioning to every change
