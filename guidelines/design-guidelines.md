# Design Guidelines

## Context

- Design systems must remain domain-agnostic, project-agnostic, and dataset-agnostic.
- Components adapt behavior via configuration and schema, not hardcoded assumptions.
- Design artifacts (tokens, layouts, patterns) must support reuse across products and teams.

## Intent

These guidelines translate neutrality and documentation standards into concrete design rules:
- Enforce codebase neutrality at the design layer (no project/dataset hardcoding).
- Use SVO (Subject–Verb–Object) to express responsibilities for components.
- Provide design patterns that documentation can describe using “From [input] to [output]” statements.

## Core Design Principles

**Universal Composability**: Domain-agnostic building blocks | configuration-driven assembly | schema-aligned interfaces | provenance-aware state

**Separation of Concerns**: Structure ≠ Semantics ≠ Presentation ≠ Behavior | each layer configurable independently

**Emergent Complexity**: Simple primitives -> complex behaviors via composition | avoid monolithic components

---

## Component Design Patterns

### Atomic Design Hierarchy

**From primitives to systems**: Atoms -> Molecules -> Organisms -> Templates -> Pages

**Pattern Template**:

**From [input_props] to [rendered_output]**: Component -> validates props via schema -> computes state using pure functions -> renders structure with accessibility hooks -> emits events with metadata -> delivers UI for [user_interaction].

### Responsibility Boundaries (SVO)

| Layer | Component | Function | Responsibility (S-V-O) | Dependencies |
|-------|-----------|----------|------------------------|--------------|
| Atom | `Button` | `handleClick` | dispatches action events to parent handlers | `React` |
| Molecule | `SearchBar` | `processQuery` | normalizes input text via sanitization rules | `lodash` |
| Organism | `DataTable` | `renderRows` | virtualizes row rendering using windowing strategy | `react-window` |

**Principles**: One component = one responsibility | props-driven behavior | zero hardcoded content

---

## Configuration-Driven Design

### Schema-First Approach

**Pattern**: Define JSON schema -> generate TypeScript types -> validate runtime props -> render from config

**Example Config**:
```yaml
component:
  type: "DataVisualizer"
  data_source: "${config.api.endpoint}"
  transform: "${transforms.normalize}"
  render_mode: "chart"
  accessibility:
    aria_label: "${i18n.charts.label}"
    keyboard_nav: true
```

### Theme & Style System

**Abstraction Layers**:
- **Tokens**: `UI_THEME_TOKENS` (centralized semantic colors for buttons, panels, text, tables, inputs, code blocks, status badges) and `UI_THEME_COLORS` (raw hex values for Canvas/D3).
- **Theme Modes**: Light (GitHub Tritanopia Light) | Dark (GitHub Tritanopia Dark) | System
- **Semantic Variables**: `--panel-bg-rgb`, `--toolbar-opacity` (CSS variables for global surfaces)
- **Component Classes**: `.App-toolbar`, `.MainPanelContainer` (application-specific)

**Code Block Pattern**:
- **Structure**: `div.highlight` -> `pre` -> `div.zeroclipboard-container` -> `clipboard-copy`
- **Style**: Theme-aware syntax highlighting (Light/Dark) with absolute positioned copy button.

**Rule**: Never hardcode `#FF5733` or `16px` or Tailwind utility colors like `text-gray-500` -> reference tokens only.
**Rule**: Use `UI_THEME_TOKENS` for consistent styling across Light/Dark modes.
**Rule**: Components must adapt to `themeMode` state (Light/Dark/System) via `useGraphStore`.
**Rule**: Enforce 100% Global Theme Tokenization; remove legacy/stale hardcoded styles.

### Table & List Patterns

**Style**:
- **No Zebra Striping**: Rows use a flat background (`rowBg`) to maintain a clean, modern look.
- **Selection**: Selected rows use a subtle background tint (`UI_THEME_TOKENS.table.rowSelected`) for clear visibility without overwhelming color (replacing legacy blue borders).
- **Hover**: Rows highlight with a gallery-style amber focus (`UI_THEME_TOKENS.table.rowHoverAmber`) or a subtle gray tint (`UI_THEME_TOKENS.table.rowHover`) for interactive contexts.
- **Main Table Settings**: Key/Value rows follow the same interaction model as the Graph Data Table: hover amber and selected blue background.

### Preview Gallery Pattern

**Style**:
- **Consistency**: Gallery items follow the same selection/hover model as tables: blue border/tint for selection, subtle hover effects.
- **Drag & Drop**: Drag indicators use the primary blue indicator color (`#60A5FA`) for drop targets and insertion points.

### Interaction Patterns

**Click-to-Edit**:
- **Pattern**: View -> User Click -> Switch Layout Mode -> Sync Scroll Position -> Focus Editor
- **Intent**: Seamless transition from reading to editing.
- **Implementation**:
    - Viewer captures click events on content blocks.
    - Event handler identifies source line from block metadata.
    - Controller switches layout to 'Editor' (if needed) and scrolls editor to line.

---

## State Management Architecture

### Unidirectional Data Flow

**Pattern**: Action -> Reducer -> State -> View -> Action

**From user input to state update**: User -> triggers event via interaction -> dispatcher validates action schema -> reducer computes next state using pure logic -> store notifies subscribers with diff -> view re-renders affected subtree.

### State Normalization

**Structure**: Entities by ID | relationships by reference | derived data via selectors

**Example**:
```typescript
state = {
  entities: {
    users: { "u1": {...}, "u2": {...} },
    posts: { "p1": {...} }
  },
  relationships: {
    userPosts: { "u1": ["p1", "p2"] }
  }
}
```

**Rule**: Single source of truth | no duplicate data | compute on read, not on write

---

## Accessibility & Internationalization

### A11y Requirements

**Mandatory**:
- Semantic HTML (`<button>` not `<div onclick>`)
- ARIA labels for dynamic content
- Keyboard navigation (Tab, Enter, Escape)
- Focus management for modals/dialogs
- Color contrast ≥4.5:1 for text

**Pattern**: Every interactive component -> keyboard accessible -> screen reader friendly -> focus indicator visible

### i18n Strategy

**Structure**: `i18n/[locale]/[namespace].json`

**Usage**: `t('errors.validation.required')` not `"This field is required"`

**Rule**: Zero hardcoded user-facing strings | all text externalized | RTL support via CSS logical properties

---

## Performance Design Patterns

### Rendering Optimization

**Techniques**:
- Memoization: `React.memo`, `useMemo`, `useCallback`
- Virtualization: Windowing for lists >100 items
- Code splitting: Dynamic imports for routes/features
- Lazy loading: Below-fold content deferred

**Metric Targets**: FCP <1.8s | LCP <2.5s | CLS <0.1 | TTI <3.8s

### Data Fetching

**Pattern**: Cache-first -> stale-while-revalidate -> optimistic updates

**From request to render**: Component -> checks cache via key -> returns stale data immediately -> fetches fresh data in background -> updates cache -> triggers re-render if changed.

---

## Anti-Patterns (Forbidden)

**Component Design**:
❌ God components (>300 lines, >10 props)
❌ Prop drilling >3 levels
❌ Inline styles with magic numbers
❌ Hardcoded content strings, project names, or dataset-specific labels

**State Management**:
❌ Direct state mutation
❌ Non-serializable state (functions, Promises)
❌ Circular dependencies
❌ Global mutable singletons

**Performance**:
❌ Unnecessary re-renders
❌ Blocking main thread >50ms
❌ Unoptimized images (no lazy load, no WebP)
❌ Synchronous localStorage reads in render
❌ Redundant lexing (missing token sharing)

---

## Design Validation Checklist

**Structural** (Required):
- [ ] Component <300 lines, single responsibility
- [ ] Props schema-validated, TypeScript typed
- [ ] Zero hardcoded content/colors/spacing
- [ ] Accessibility: semantic HTML, ARIA, keyboard nav

**Configuration** (Required):
- [ ] Behavior controlled via props/config
- [ ] Theme tokens used (no magic values)
- [ ] i18n keys for all user-facing text
- [ ] Processes 3+ themes without code changes

**Performance** (Required):
- [ ] Memoization applied appropriately
- [ ] Virtualization for long lists
- [ ] Code split at route boundaries
- [ ] Core Web Vitals within targets

**State** (Required):
- [ ] Normalized entity structure
- [ ] Unidirectional data flow
- [ ] Pure reducer functions
- [ ] Selectors for derived data

---

## Documentation Integration

Designs should be easy to document using the documentation guidelines:

- Component documentation hooks
  - Each component should support a statement of the form:
    - “From [input_props] to [rendered_output]: Component -> actions -> outcome.”
  - Responsibilities should be describable as SVO directives:
    - “Component verbs data via configuration” (for example, `DataTable renders rows from config schema`).

- Configuration surface
  - Parameters should be expressible in configuration schemas:
    - Name, default, min, max, step, impact description.
  - Behavior changes must be achievable via configuration changes, not code edits.

- Neutrality alignment
  - Design must avoid:
    - Hardcoded project names.
    - Dataset-specific entity types baked into components.
  - Instead:
    - Use schema-driven entity types.
    - Use metadata fields and tokens to adapt to different domains.

---

## Integration with Universal Project Rules

**Alignment**:
- Design components follow SVO responsibility pattern
- Configuration-driven matches project-level orchestration
- Accessibility/i18n support domain-agnostic UIs
- Performance patterns complement <500kB chunk limits
- Anti-patterns extend code-level prohibitions to design layer
