---
title: "Agentic SDLC Specification Chain Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-08-13"
lang: "en-US"
frontmatter_contract: "required"
owner: "Orchestrator function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
lifecycle_status: "proposed"
---

# Agentic SDLC Specification Chain Module

## Scope and Ownership

This module is universal, neutral, adaptive, implementation-agnostic, and independently loadable. It defines how one
specification travels from stated intent to executable work across three artifact roles and the two seams between
them. It does not define a document product, file name, directory layout, editor, template engine, agent product, or
storage format.

The main Agentic SDLC Guidelines own task identity, state, budgets, roles, and the condition-to-task bridge. The
PRD, TAD & ADR authoring set owns document contents, the Readiness Ladder, the Rule ID scheme, and the
authoring-domain finding vocabulary. This module owns only the chain: artifact-role identity, the two coverage
seams, the re-derivation cascade, phase-advance authority, and the adaptation rules that let the chain shrink or
reorder without losing a seam.

## Artifact Role Contract

Three roles carry the chain. A role is a declared function, never a file.

| Role | Owns | Must not |
|---|---|---|
| **Requirements artifact** | Normative behaviour, observable acceptance criteria, correctness properties, glossary, scope boundary | State structure, name components, or choose mechanisms |
| **Design artifact** | Structure that satisfies the criteria: components, interfaces, data shapes, error taxonomy, decisions and rationale | Introduce behaviour absent upstream, or restate criteria as if authoring them |
| **Task list** | Work that realises the design, ordered and bounded, each item closable by a named check | Decide structure, introduce behaviour, or carry an obligation no check can close |

```text
Requirements artifact --[seam 1]--> Design artifact --[seam 2]--> Task list
       criterion                     design element                  task
```

**Directives**:
- Identify each artifact role from its declared frontmatter role, never from file name, directory, position on disk, or authoring order; a role inferred from layout is not identified
- Assign every criterion, design element, and task a stable identifier that survives unrelated edits to its neighbours, so seam joins remain checkable across revisions
- Permit one document to carry more than one role only when each role's content is separately addressable and its identifiers remain distinct
- Forbid a fourth role in this chain; additional artifacts are companions that consume the chain, not links inside it

## Seam 1 - Requirements to Design

The design artifact is a response to the requirements artifact. The seam is a coverage obligation in both
directions.

**Directives**:
- Cover every requirement criterion by at least one design element; an uncovered criterion is an `undesigned-criterion`
- Record the criterion identifiers each design element satisfies; a design element citing no criterion is an `ungrounded-design-element`
- Forbid stating normative behaviour in the design artifact: behaviour absent upstream is a specification defect returned to the requirements phase, and stating it downstream is a `requirement-introduced-downstream` at `blocker` severity
- Declare every correctness property in the requirements artifact and consume it in the design artifact; a property first appearing downstream of the role that owns it is a `requirement-introduced-downstream`
- Report seam 1 coverage as covered criteria over total criteria, separately from seam 2 coverage; one blended ratio hides which seam is thin
- Ground every design decision in a stated alternative and a reason; a decision with no alternative considered is a preference presented as a constraint

## Seam 2 - Design to Tasks

Task grounding, condition coverage, and the coverage ratio are owned by the main set's condition-to-task bridge and
are reused unchanged. This seam adds only the structural join.

**Directives**:
- Name the design elements each task realises alongside its criterion and condition joins; a task citing a criterion but no design element cannot be checked for structural drift
- Forbid a task deciding structure absent from the design artifact; return it to the design phase rather than settling structure inside the task list
- Keep every task closable by a named check; an obligation no check can close belongs in the design artifact or an Operator gate, never in the task list
- State the dependency graph over task identifiers explicitly at derivation time; ordering recovered from list position couples correctness to formatting

## Re-derivation Cascade

An upstream edit invalidates downstream coverage whether or not the downstream artifact still reads plausibly.

**Directives**:
- Re-open seam 1 and seam 2 on any changed criterion, and seam 2 on any changed design element; a downstream artifact left unrevised after an upstream change is a `stale-downstream-artifact`
- Record the upstream artifact revision each downstream artifact was derived from, so staleness is detected by comparison rather than by recollection
- Re-derive rather than patch: forbid editing a downstream artifact into agreement with a changed upstream artifact without re-running the seam coverage the change invalidated
- Treat a removed criterion as invalidating the design elements and tasks that cited it; orphaned downstream work is `stale-downstream-artifact`, not harmless surplus
- Forbid deriving a downstream artifact from an upstream artifact carrying an open `blocker` finding; the cascade starts from a clean upstream state

## Phase Advance Authority

Each seam is crossed by decision, not by elapsed effort or apparent completeness.

**Directives**:
- Require a recorded Operator decision to cross each seam; crossing on an agent's own assessment is a `phase-advanced-without-approval` at `blocker` severity
- Treat an absent decision as a `blocked` state, never an assumed yes; an inferred, defaulted, scheduled, or simulated approval is not an approval
- Record the decision reference on the artifact revision it authorises, so the authorisation remains auditable after the artifact advances
- Forbid an agent that authored an artifact from also recording the decision that advances it; the independence rule applies to phase advance exactly as it applies to task verdicts

## Adaptivity

The chain adapts its vocabulary and entry point to the work. It never adapts away a seam.

**Directives**:
- Choose the entry point by which artifact is already trustworthy: entering at design is legitimate when the requirements artifact is derived from that design before task derivation, and seam 1 then runs in the reverse direction with the same coverage obligation
- Substitute a role's content shape to fit the work while preserving its function: a corrective change may carry a reproduction-condition artifact in the requirements role, provided its conditions remain observable criteria that design elements and tasks join to
- Collapse artifacts, never seams: holding two roles in one document is a representation choice, while dropping a seam deletes the coverage obligation that makes the chain checkable, and is a `seam-elided` finding at `blocker` severity
- Scale seam evidence to change size rather than skipping it: a small change may satisfy a seam with a single stated join, but zero joins is an elided seam
- Forbid adapting the chain by widening a role's ownership: a design artifact that absorbs behaviour, or a task list that absorbs structure, has removed a seam under the appearance of efficiency

## Findings Raised by This Module

These types extend the main set's execution-domain enumeration, which remains the single source of truth for
execution finding names. Severity, recording, deduplication, and ordering are the authoring set's contract, reused
unchanged.

| Finding Type | Severity | Raised when |
|---|---|---|
| `undesigned-criterion` | `major` | A requirement criterion has no covering design element |
| `ungrounded-design-element` | `minor` | A design element cites no criterion |
| `requirement-introduced-downstream` | `blocker` | Normative behaviour or a correctness property first appears in the design artifact or task list |
| `stale-downstream-artifact` | `major` | An upstream artifact changed and a downstream artifact was not re-derived |
| `phase-advanced-without-approval` | `blocker` | A seam was crossed with no recorded Operator decision |
| `seam-elided` | `blocker` | A seam's coverage obligation is absent rather than satisfied |

## Module Load Budget

| Stage | Sections to load |
|---|---|
| Requirements authoring | `artifact-role-contract`, `adaptivity` |
| Design authoring | `artifact-role-contract`, `seam-1---requirements-to-design`, `adaptivity` |
| Task derivation | `seam-2---design-to-tasks`, `re-derivation-cascade` |
| Upstream change | `re-derivation-cascade` |
| Phase advance | `phase-advance-authority` |
| Conformance | `findings-raised-by-this-module` |

**Directives**:
- Load by section anchor for the current stage; forbid loading this module whole as a precondition for a single-seam action
- Record this module's load cost in the per-run token total alongside the main set's

## Validation Checklist

- [ ] **Roles declared**: each artifact role is identified from frontmatter, not from layout
- [ ] **Identifiers stable**: criteria, design elements, and tasks carry identifiers that survive neighbour edits
- [ ] **Seam 1 closed**: every criterion covered, every design element grounded, both ratios reported separately
- [ ] **No downstream behaviour**: no normative behaviour or correctness property originates in design or tasks
- [ ] **Seam 2 closed**: every task cites its criterion, condition, and design element joins
- [ ] **Cascade current**: each downstream artifact records the upstream revision it was derived from, and that revision is current
- [ ] **Advance authorised**: each seam crossing carries an Operator decision reference recorded by a party that did not author the artifact
- [ ] **Adaptation seam-preserving**: any collapsed or reordered chain still satisfies both seams

## Mantra Application

**"Requirements own behaviour · Design owns structure · Tasks own work · Seams own coverage · Cascade owns freshness · Decisions own advance"**
