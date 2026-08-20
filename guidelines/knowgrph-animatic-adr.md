---
title: "Knowgrph Animatic Decisions & Attributes Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-08-20"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
parent: "Knowgrph Animatic PRD/TAD"
parent_version: "1.0.0"
---

# Knowgrph Animatic Decisions & Attributes Module

## Scope & Ownership

Owns the architectural decision records, the quality attribute scenarios, and the deployment strategy.

This module is loaded on demand from [Knowgrph Animatic PRD/TAD](./knowgrph-animatic-prd-tad.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Architectural Decisions

### ADR-1: Frontmatter as Single Source of Truth for All animatic State
**Status**: Accepted  
**Date**: 2026-05-25

#### Context
animatic timing, lane controls, beat metadata, and lane order could live in a renderer-internal
store, a separate animatic config block, or the existing YAML frontmatter.

#### Decision
All animatic state (`timeline.beats.*`, `timeline.scale.*`, `timeline.lane_controls`,
`timeline.lane_order`) lives exclusively in YAML frontmatter. The renderer reads from and writes
back to frontmatter only.

#### Alternatives Considered
1. Renderer-internal store: fast reads / Cons: state lost on reload, no diffability
2. Separate animatic config block: clean separation / Cons: duplicate surface, sync complexity

#### Rationale
Frontmatter as SSOT enables Git-diffable history, document reload determinism, and alignment with
the existing KGC `flow:` authoring surface. It eliminates sync bugs between a renderer store and
the document.

#### Consequences
- **Positive**: Reload restores full state; state is human-readable and version-controlled
- **Negative**: Write latency for high-frequency drag events (mitigated by batch patch dispatch)
- **Neutral**: All renderer state must be serializable to YAML

---

### ADR-2: applyMarkdownDocument as the Canonical Write Path
**Status**: Accepted  
**Date**: 2026-05-25

#### Context
FrontmatterWriter needs a write mechanism to commit patches. Options include direct DOM mutation,
a REST API, or the workspace command API.

#### Decision
Use `window.knowgrphWorkspaceCommand.applyMarkdownDocument(...)` as the sole write path.

#### Alternatives Considered
1. Direct localStorage write: simple / Cons: bypasses document lifecycle, no undo support
2. REST API: decoupled / Cons: network round-trip latency, auth complexity

#### Rationale
`applyMarkdownDocument` is the existing workspace command contract; reusing it preserves document
lifecycle semantics (undo, reload, version) without new infrastructure.

#### Consequences
- **Positive**: Undo/redo, reload consistency, single write surface
- **Negative**: Patch must be serialized to full YAML string; no partial-key writes
- **Neutral**: Validator script can use the same API for test fixture application

---

### ADR-3: Roving Tabindex for Keyboard Navigation
**Status**: Accepted  
**Date**: 2026-05-25

#### Context
Keyboard navigation across lanes, items, and beat strip requires a focus management strategy.
Options: global event listeners, dedicated focus component, or roving tabindex.

#### Decision
Roving tabindex: one `tabindex="0"` on the focused element; all others `tabindex="-1"`. Arrow keys
move focus within each navigation scope (lane rail, lane items, beat strip).

#### Alternatives Considered
1. Global key listeners: simple / Cons: no visible focus, inaccessible, hotkey conflicts
2. Dedicated focus component: explicit / Cons: additional state layer, sync with DOM

#### Rationale
Roving tabindex is the ARIA-recommended pattern for composite widgets (listbox, grid, toolbar).
It provides visible focus styling, correct Tab behavior, and maps directly to the KGC compact
lane geometry without a separate focus store.

#### Consequences
- **Positive**: ARIA-compliant, visible focus, single Tab entry point per scope
- **Negative**: Requires `tabindex` mutation on every arrow-key event
- **Neutral**: Each navigation scope (lanes, items, beats) is independently roving

---

### ADR-4: Validator Script as Mounted-Surface Test Harness
**Status**: Accepted  
**Date**: 2026-05-25

#### Context
Acceptance criteria for timeline interactions require observing both DOM state and frontmatter
mutations after interactions. Options: unit tests, Playwright E2E, or a custom mounted-surface
script.

#### Decision
A single Python validator script at `./scripts/validate_animatic_timeline_interactions.py`
drives the mounted surface in headless Playwright Chromium via `applyMarkdownDocument` and asserts
DOM + frontmatter state.

#### Alternatives Considered
1. Playwright E2E suite: standard / Cons: full browser overhead, separate test infra
2. Unit tests only: fast / Cons: cannot assert mounted DOM or frontmatter write-back

#### Rationale
The validator script reuses the mounted surface directly, testing the integration between the
renderer, interaction handler, and frontmatter writer in a single pass without a separate test
infrastructure. Exit code 0/1 maps cleanly to CI pass/fail.

#### Consequences
- **Positive**: Full integration coverage; CI-runnable; deterministic pass/fail
- **Negative**: Requires mounted surface (cannot run in pure unit test environment)
- **Neutral**: Python chosen for scripting convenience; Playwright can be added as an option (OQ4)

---

---

## Quality Attributes

| Attribute     | Scenario                                              | Pattern                                     | Validation                                     |
|---------------|-------------------------------------------------------|---------------------------------------------|------------------------------------------------|
| Performance   | Drag event at 60 fps → frontmatter patch latency ≤16 ms | Batch patch dispatch; debounce on release  | Validator measures patch round-trip time       |
| Scalability   | 50-beat document → renderer renders without jank      | Virtual lane row rendering for large beat count | Validator document with 50 beats exits 0   |
| Security      | `applyMarkdownDocument` called with arbitrary string  | Input schema validation before write        | Malformed YAML patch rejected; no document corruption |
| Observability | Frontmatter write failure is silent                   | Error chip surface in PlayerShell; console warn | Validator asserts error chip present on failed write |

---

---

## Deployment Strategy

**Strategy**: Enhancement-first, rolling. No vendor timeline runtime code is copied into the repo.
Each epic ships as an incremental enhancement against the existing renderer surface. The validator
script is run on every commit touching the renderer or `timeline.*` frontmatter schema.

**Rollback**: Any commit that causes `npm run validate:animatic-interactions` to exit non-zero
is reverted. The frontmatter SSOT ensures document state is always recoverable from the YAML source.

---
