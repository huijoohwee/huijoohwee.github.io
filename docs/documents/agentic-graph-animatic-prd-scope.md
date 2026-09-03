---
title: "Agentic Graph Animatic Problem & Scope Module"
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
parent: "Agentic Graph Animatic PRD/TAD"
parent_version: "1.0.0"
---

# Agentic Graph Animatic Problem & Scope Module

## Scope & Ownership

Owns problem discovery, the author journey, scope boundaries, implementation constraints, and open questions.

This module is loaded on demand from [Agentic Graph Animatic PRD/TAD](./agentic-graph-animatic-prd-tad.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Phase 0 — Problem Discovery

### Problem Statement

Content authors and renderer implementers working with the Agentic Graph 2D Animatic surface lack a
structured, auditable acceptance baseline. Without it, renderer patches introduce regressions in
timing fidelity, player-shell DOM contracts, keyboard accessibility, and frontmatter persistence —
each detectable only through manual inspection. The opportunity is a fully specified, autonomously
verifiable acceptance suite that drives both implementation and CI validation from a single
frontmatter-backed document.

### Personas

**P1 — Content Author**  
Jobs-to-be-done: author `timeline.beats.*` and `flow:` YAML in a Markdown document; play back the
resulting animatic in the AGENTIC_OS canvas; edit beat timing and metadata without leaving the renderer;
rely on keyboard shortcuts for efficient navigation.

**P2 — Renderer Implementer**  
Jobs-to-be-done: implement or patch the 2D Animatic renderer against a stable contract; confirm
that every frontmatter mutation survives a document reload; avoid copying vendor timeline code into
the repo.

**P3 — QA Validator**  
Jobs-to-be-done: run `python3 ./scripts/validate_animatic_timeline_interactions.py` or
`npm run validate:animatic-interactions` and receive
a pass/fail verdict with named failure reasons; confirm acceptance criteria without manual
browser inspection.

---

---

## User Journey — Content Author: Author → Playback → Edit

| Stage    | Action                                              | Touchpoint                        | Pain Point                                     | Opportunity                                  |
|----------|-----------------------------------------------------|-----------------------------------|------------------------------------------------|----------------------------------------------|
| Trigger  | Opens a `agenticOsCanvas2dRenderer: animatic` document    | AGENTIC_OS canvas surface                | Renderer fails to activate from frontmatter    | Single-field activation from YAML            |
| Discover | Sees timeline rail with beat lanes and player shell | Timeline Editor UI                | Inconsistent lane population from node params  | `beat_ref` drives lane assignment reliably   |
| Engage   | Drags beats, edits metadata, uses keyboard shortcuts| Timeline strip + inspector panel  | Timing edits lost on reload; no keyboard nav   | Frontmatter write-back + roving tabindex     |
| Complete | Plays back animatic with auto-scroll enabled       | Player shell                      | Auto-scroll breaks or ignores DOM contract     | Exact switch DOM contract enforced           |
| Return   | Re-opens document; validates persisted state        | AGENTIC_OS canvas + frontmatter          | Lane controls and order not restored           | `timeline.lane_controls` / `lane_order` SSOT |

---

---

## Scope Boundaries

**In scope**: 2D Animatic renderer surface; `timeline.beats.*` authoring; player shell DOM
contract; beat CRUD interactions; lane controls; keyboard navigation; validator script.

**Out of scope**: 3D renderer surfaces; video export pipeline; multi-user real-time CRDT sync;
external audio engine integration; i18n/localisation; mobile touch gesture handling.

---

---

## Implementation Constraints

- Canonical 2D renderer id and surface stay `animatic`; do not preserve legacy `animation`
  aliases or remaps.
- Animatic reuses the shared `flow:` authoring surface and may extend it with `timeline.*`;
  do not introduce a parallel animatic-only markdown syntax.
- Runtime stays native in-repo; do not copy vendor timeline runtime code or bolt on downstream
  compatibility wrappers.
- Reuse shared semantic owners and utilities first, especially renderer registry helpers,
  Toolbar row-scroll utilities, icon sizing, and the browser-facing workspace runtime command.
- Frontmatter remains the only persisted state surface for timing, metadata, lane controls,
  and lane order; do not create a parallel renderer-local persistence layer.

---

---

## Decisions & Open Questions

| ID  | Question                                                                    | Owner      | Status   |
|-----|-----------------------------------------------------------------------------|------------|----------|
| D1 | What is the current validator execution baseline? | QA | Resolved: headless Playwright Chromium via `validate_animatic_timeline_interactions.py` against the mounted app surface |
| D2 | Should `timeline.lane_controls` use arrays or keyed objects? | Arch | Resolved: arrays for `hiddenLaneIds` / `mutedLaneIds`, scalar `soloLaneId` |
| D3 | Is `ant-switch` still the acceptance baseline for the runtime auto-scroll switch? | Impl | Resolved: yes for current reference-fidelity contract; any future replacement must preserve the same DOM contract |
| D4 | Does grid snap affect `Split Beat` at non-integer playhead positions? | Impl | Resolved: yes, split snaps to the active grid step before frontmatter commit |
| OQ1 | Should validation expand beyond Chromium to Firefox/WebKit after the baseline stabilizes? | QA | Open |

---

---

# Part 2 — Technical Architecture (TAD)

---
