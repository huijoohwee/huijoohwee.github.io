---
title: "Knowgrph Animatic Flows & Diagrams Module"
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

# Knowgrph Animatic Flows & Diagrams Module

## Scope & Ownership

Owns the runtime behaviour views: the two workflows, the data flows, and the architecture diagrams.

This module is loaded on demand from [Knowgrph Animatic PRD/TAD](./knowgrph-animatic-prd-tad.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Workflow: Beat Drag-to-Move

**Trigger**: User pointer-down on a beat card body in the timeline strip.  
**Actors**: Content Author, InteractionHandler (C5), AutoScrollController (C7), FrontmatterWriter (C6).

**Happy Path**:
1. Author pointer-down → C5 enters drag mode, records `dragStartMs`
2. Author drags → C5 computes `deltaMs`; if pointer near rail edge → C7 scrolls continuously
3. Author releases → C5 checks non-overlap invariant; pushes following beats if needed
4. C5 dispatches `BeatPatch` → C6 writes `start_ms`/`end_ms` to frontmatter
5. C3 re-renders beat strip from updated model

**Alternate Paths**:
- Push causes cascade: C5 recomputes all downstream beats before dispatching single batch patch

**Error Paths**:
- `applyMarkdownDocument` fails: C6 rolls back in-memory model; displays error chip

**Postconditions**: `timeline.beats.<beat>.start_ms` and `end_ms` in frontmatter match post-drag
values; no beat overlap exists; timeline strip reflects new positions.

---

---

## Workflow: Validator Script Run

**Trigger**: `python3 ./scripts/validate_animatic_timeline_interactions.py`  
**Actors**: QA Validator, ValidatorScript (C9), mounted KGC surface.

**Happy Path**:
1. Validator loads test fixture markdown documents
2. For each test case: calls `applyMarkdownDocument(fixture)` on mounted surface
3. Asserts DOM state (element presence, class names, aria attributes, geometry)
4. Asserts frontmatter state (key values match expected)
5. Reports `PASS` per test case; exits 0

**Alternate Paths**:
- Partial renderer implementation: affected test cases report `FAIL` with named assertion

**Error Paths**:
- `applyMarkdownDocument` unavailable: script exits 1 with `SURFACE_NOT_MOUNTED` error

**Postconditions**: exit code 0 if all test cases pass; each failing test case named in output.

---

---

## Data Flows

### Data Flow: Frontmatter → Beat Model → DOM

| Stage     | Component               | Input Format                       | Output Format                  | Persistence          | Error Handling             |
|-----------|-------------------------|------------------------------------|--------------------------------|----------------------|----------------------------|
| Ingest    | FrontmatterParser (C1)  | YAML string (`flow:`, `timeline:`) | `BeatModel`, `NodeGraph`       | In-memory only       | Fallback to ordinal beats  |
| Transform | BeatLanePopulator (C2)  | `BeatModel`, `NodeGraph`           | `LaneMap`                      | In-memory only       | Unknown node → `Node` lane |
| Store     | TimelineRenderer (C3)   | `LaneMap`, `BeatModel`             | DOM tree                       | DOM (transient)      | Re-render on error         |
| Serve     | PlayerShell (C4)        | DOM tree                           | Rendered timeline UI           | None                 | Error chip                 |

### Data Flow: Interaction → Frontmatter Patch

| Stage     | Component                  | Input Format              | Output Format              | Persistence            | Error Handling            |
|-----------|----------------------------|---------------------------|----------------------------|------------------------|---------------------------|
| Ingest    | InteractionHandler (C5)    | Pointer/keyboard events   | `InteractionEvent`         | None                   | Drop malformed event      |
| Transform | InteractionHandler (C5)    | `InteractionEvent`        | `FrontmatterPatch`         | None                   | Rollback on invariant fail|
| Store     | FrontmatterWriter (C6)     | `FrontmatterPatch`        | Updated YAML string        | YAML frontmatter (SSOT)| Retry once; error chip    |
| Serve     | FrontmatterParser (C1)     | Updated YAML              | Refreshed `BeatModel`      | In-memory              | Re-parse on reload        |

---

---

## Architecture Diagrams

### Diagram 1 — Component Topology

```mermaid
flowchart TB
  subgraph doc["KGC Document (SSOT)"]
    YAML["YAML Frontmatter<br/>timeline.* / flow:"]
    GRAPH["Flow Graph Nodes<br/>NODE_* + beat_ref"]
  end

  subgraph renderer["2D Animatic Renderer"]
    C1["C1 FrontmatterParser"]
    C2["C2 BeatLanePopulator"]
    C3["C3 TimelineRenderer<br/>32px geometry"]
    C4["C4 PlayerShell<br/>ant-switch contract"]
    C5["C5 InteractionHandler<br/>CRUD + drag"]
    C6["C6 FrontmatterWriter<br/>applyMarkdownDocument"]
    C7["C7 AutoScrollController"]
    C8["C8 KeyboardHandler<br/>roving tabindex"]
  end

  subgraph validator["Validator Script"]
    C9["C9 ValidatorScript<br/>exit 0 = all PASS"]
  end

  YAML -->|"parse - sync"| C1
  GRAPH -->|"read nodes - sync"| C2
  C1 -->|"BeatModel - sync"| C2
  C1 -->|"BeatModel - sync"| C3
  C2 -->|"LaneMap - sync"| C3
  C3 -->|"mount - sync"| C4
  C4 -->|"transport state - sync"| C7
  C3 -->|"bind handlers - sync"| C5
  C8 -->|"key intent - sync"| C5
  C5 -->|"BeatPatch - sync"| C6
  C5 -->|"scroll intent - sync"| C7
  C6 -->|"applyMarkdownDocument - sync write"| YAML
  C9 -->|"assert geometry - sync"| C3
  C9 -->|"assert contract - sync read"| YAML
```

### Diagram 2 — Beat Edit Workflow

```mermaid
sequenceDiagram
  actor Author
  participant C5 as InteractionHandler
  participant C7 as AutoScrollController
  participant C6 as FrontmatterWriter
  participant YAML as Frontmatter (SSOT)
  participant C3 as TimelineRenderer
  participant C1 as FrontmatterParser

  Author->>C5: pointer-down on beat card
  C5->>C5: enter drag mode; record dragStartMs
  loop drag active
    Author->>C5: pointer-move
    C5->>C7: check rail-edge proximity
    C7-->>C3: scroll if near edge
    C5->>C5: compute deltaMs
  end
  Author->>C5: pointer-up (release)
  C5->>C5: enforce non-overlap invariant; push following beats
  C5->>C6: dispatch BeatPatch
  C6->>YAML: applyMarkdownDocument({ name, text, ... })
  YAML-->>C1: re-parse
  C1-->>C3: updated BeatModel
  C3-->>Author: re-rendered beat strip
```

### Diagram 3 — Data Flow: Frontmatter → DOM → Frontmatter

```mermaid
flowchart LR
  YAML["YAML Frontmatter"]
  C1["C1 Parse<br/>BeatModel + NodeGraph"]
  C2["C2 Populate<br/>LaneMap"]
  C3["C3 Render<br/>DOM"]
  C5["C5 Interact<br/>FrontmatterPatch"]
  C6["C6 Write<br/>applyMarkdownDocument"]

  YAML -->|"parse - sync"| C1
  C1 -->|"BeatModel - sync"| C2
  C2 -->|"LaneMap - sync"| C3
  C3 -->|"pointer / keyboard events"| C5
  C5 -->|"FrontmatterPatch - sync"| C6
  C6 -->|"applyMarkdownDocument - sync write"| YAML
```

### Diagram 4 — Keyboard Navigation Scopes

```mermaid
flowchart TB
  TAB["Tab key<br/>Actor - Input"]

  subgraph beat_strip["Beat Strip (roving tabindex)"]
    BS["ArrowLeft / ArrowRight / Home / End<br/>Selector - selects active beat"]
  end

  subgraph lane_rail["Lane Rail (roving tabindex)"]
    LANE_NAV["ArrowUp / ArrowDown / Home / End<br/>Selector - selects active lane"]
    LANE_OPS["move-up, move-down<br/>Selector - H hide, U mute, O solo"]
  end

  subgraph lane_items["Lane Items (roving tabindex per lane)"]
    LI["prev-beat, next-beat<br/>Selector - updates params.beat_ref"]
  end

  subgraph global_hk["Global Hotkeys (suppressed in text-entry)"]
    GH["Space play/pause<br/>Selector - frame step, R reset, D duplicate, S split"]
    MH["L label, N note, M summary, T tags<br/>Selector - opens active-beat editor"]
  end

  C5["C5 InteractionHandler<br/>Consumer - Component"]

  TAB -->|"enters scope"| BS
  TAB -->|"enters scope"| LANE_NAV
  LANE_NAV -->|"scopes ops"| LANE_OPS
  LANE_NAV -->|"enters scope"| LI
  BS -->|"key intent - sync"| C5
  LANE_OPS -->|"key intent - sync"| C5
  LI -->|"key intent - sync"| C5
  GH -->|"key intent - sync"| C5
  MH -->|"key intent - sync"| C5
```

---
