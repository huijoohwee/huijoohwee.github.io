---
title: "Agentic SDLC Artifact Continuity Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-08-22"
lang: "en-US"
frontmatter_contract: "required"
owner: "Orchestrator function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
schema: "agentic-artifact-continuity/v1"
universal_scope: "true"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Agentic SDLC Artifact Continuity Module

## Scope and Ownership

This module is universal, neutral, adaptive, implementation-agnostic, and independently loadable. It defines how
Context-Intent-Directives (CID) remain joined to Role-Action-Outcome (RAO) execution, produced artifacts, evidence,
demonstration, and successor planning. It defines semantic roles and joins, never file names, directory layouts,
document products, providers, tools, storage formats, or workflow transports.

The main Agentic SDLC Guidelines own execution roles, task state, budgets, permissions, and evidence emission. The
Specification Chain Module owns the requirements-design-tasks chain and its two coverage seams. This module owns
only the continuity envelope around that chain: CID-to-RAO coverage, companion-artifact joins, outcome evidence,
revision freshness, and feedback into a successor Context.

## Semantic Separation

CID is the policy plane. RAO is the accountable transformation plane. Artifacts carry state. Evidence records an
observation and verdict. None substitutes for another.

| Concept | Owns | Must not own |
|---|---|---|
| **Context** | Applicability, conditions, and bounded scope | A solution, implementation mechanism, or completion claim |
| **Intent** | One desired future state | An observed result or self-issued verdict |
| **Directive** | One required constraint, safeguard, or prohibition | A provider, tool, file path, or hidden implementation choice |
| **Role** | One accountable function | A person, product identity, or mutable session identity |
| **Action** | One atomic transformation over declared inputs | Multiple independently closable transformations |
| **Outcome** | One concrete, measurable result directly produced by the Action | The verdict that the result satisfies an Intent |
| **Artifact** | Versioned state consumed or produced by an Action | Authority, approval, or evidence by existence alone |
| **Evidence** | A recorded observation, surface, check, result, and independent verdict | New behaviour, structure, or task scope |
| **Successor Context** | Findings, changed conditions, and the next bounded Intent | Retrospective mutation of prior Context, Outcome, or Evidence |

**Directives**:
- Distinguish desired Intent from produced Outcome and verified satisfaction; forbid marking an Intent achieved from an Outcome assertion alone
- Keep each concept under one semantic owner; forbid duplicate fields or aliases that redefine another concept's meaning
- Treat identifiers and joins as content; forbid inferring semantic roles from names, locations, ordering, or presentation

## Continuity Graph

```text
Context --frames--> Intent --governed-by--> Directive
                                      Directive --implemented-by--> RAO Step
RAO Step --consumes--> Artifact Revision --produces--> Artifact Revision
RAO Step --yields--> Outcome --verified-by--> Evidence Reference
Evidence Reference --presented-by--> Demonstration
Evidence Reference --informs--> Successor Context --supersedes--> Prior Context
```

The requirements-design-tasks chain remains the only normative specification chain. Planning, demonstration, and
feedback are companion artifacts that join to the chain; they are not fourth, fifth, or sixth specification phases.

**Directives**:
- Preserve the three-role specification chain; forbid a companion artifact from absorbing requirements, design, or task ownership
- Join every companion by stable identity and exact revision; forbid continuity based only on co-location or matching prose
- Keep the graph acyclic within one execution revision; route learning through a successor Context rather than a backward mutation

## Continuity Identity and Revision Contract

One continuity unit carries the minimum identity required to reconstruct why work exists, what performed it, and
which evidence supports its result.

| Field | Meaning |
|---|---|
| Continuity ID | Stable identity for one bounded Context-to-evidence lineage |
| Context ID and revision | Exact conditions and scope that framed the work |
| Intent ID | Desired state within that Context |
| Directive IDs | Constraints and prohibitions governing execution |
| RAO Step IDs | Atomic accountable transformations implementing the Directives |
| Consumed artifact references | Exact input identities and revisions |
| Produced artifact references | Exact output identities and revisions |
| Evidence references | Checks, surfaces, results, and verdicts joined to Outcomes |
| Supersedes reference | Prior Context revision replaced by a successor, when applicable |

**Directives**:
- Assign globally unambiguous identifiers within the declared continuity scope; forbid list position as durable identity
- Bind every consumed and produced artifact to an immutable revision or digest; forbid mutable labels as evidence of sameness
- Record derivation revisions on consumers; forbid accepting a stale join because its prose still appears plausible
- Preserve prior records and append a successor reference; forbid rewriting history to manufacture continuity

## CID-to-RAO Coverage Seam

The seam is bidirectional. Every executable Directive is implemented by at least one RAO Step, and every RAO Step
is grounded in at least one Directive plus any applicable criterion and design element from the specification chain.

**Directives**:
- Map each executable Directive to one or more RAO Step IDs; an uncovered executable Directive is an `unjoined-directive`
- Map each RAO Step to its Directive IDs and applicable criterion and design-element IDs; an ungrounded step is an `ungrounded-rao-step`
- Mark a non-executable Directive explicitly as policy-only with its named conformance check; forbid using policy-only classification to evade verification
- Report Directive coverage and RAO grounding as separate ratios; forbid one blended percentage that hides a thin direction
- Re-open this seam whenever a Context, Intent, Directive, criterion, design element, or RAO Step changes

## Role-Action-Outcome Contract

One RAO Step contains one Role, one atomic Action, and one measurable Outcome. A workflow is a dependency graph of
RAO Steps, not a single record containing unrelated Actions. Roles are functions and reuse the main guideline's
execution vocabulary rather than creating a parallel authority model.

| Role | Atomic Action | Measurable Outcome |
|---|---|---|
| **Operator** | Authorizes one CID revision or phase transition | One exact decision reference bound to the authorized revision |
| **Orchestrator** | Derives one bounded set of grounded RAO Steps | One acyclic graph with complete joins and declared bounds |
| **Implementer** | Executes one declared Action | Enumerated produced artifacts and recorded results |
| **Evaluator** | Evaluates one Outcome against named conditions | One independent verdict with Evidence References and findings |

**Directives**:
- Express every Action as a subject-verb-object statement with one direct transformation; forbid compound Actions with independent completion conditions
- Require the Outcome to be concrete, measurable, and directly produced by the Action; forbid aspirations, activities, or verdicts as Outcomes
- Reference dependencies by RAO Step ID rather than Role; forbid treating a Role as a unique execution node
- Preserve evaluator independence from the Implementer; forbid self-graded Outcomes under any collapsed representation

## Artifact Companion Contract

| Companion role | Owns | Required join |
|---|---|---|
| Planning context | CID, scope, and next-step recommendation | Continuity ID and originating decision |
| Requirements artifact | Normative behaviour, criteria, and completion conditions | Context and Intent IDs |
| Design artifact | Structure, decisions, alternatives, and rationale | Criterion IDs and exact requirements revision |
| Task list | Bounded work, dependencies, and named checks | Directive, criterion, design-element, and RAO Step IDs |
| Demonstration artifact | Observable scenarios and recorded observations | Outcome and Evidence Reference IDs plus observation surface |
| Successor planning context | Findings, changed conditions, and next Intent | Prior Continuity ID, evidence, and supersedes reference |

**Directives**:
- Keep normative behaviour in requirements, structure in design, and executable work in tasks; forbid downstream companions from introducing upstream semantics
- Treat demonstration as evidence presentation rather than evidence creation; forbid a demonstration from upgrading a verdict or readiness layer
- Create a successor planning context for new or unresolved work; forbid editing an immutable prior context into agreement with later observations

### PRD/TAD/ADR Authoring Mapping

| Authoring role | Owns | Required continuity join | Must not |
|---|---|---|---|
| **PRD** | Product Context, Intent, Directives, normative criteria, VCCs, and scope boundary | Continuity, Context, Intent, Directive, criterion, and VCC IDs | Choose mechanisms or assert implementation Outcomes |
| **TAD** | Design elements, interfaces, data shapes, quality attributes, and structural rationale | Exact PRD revision plus Directive, criterion, and VCC IDs satisfied by each design element | Introduce behaviour or a new product Intent |
| **ADR** | One decision context, accountable decision function, selected alternative, rationale, and consequences | Continuity ID, governing Directive and criterion IDs, affected design-element IDs, and exact source revisions | Replace the PRD, widen requirements, or act as execution evidence |

**Directives**:
- Map every PRD Directive and criterion to at least one TAD design element or an explicit policy-only check; forbid uncovered normative scope
- Map every TAD design element to its governing Directive and criterion IDs; forbid ungrounded structure
- Express each ADR as one accountable decision function selecting one alternative with measurable consequences; forbid compound or ownerless decisions
- Derive task RAO Steps from joined Directive, criterion, VCC, design-element, and applicable ADR IDs; forbid task authoring as a new requirements phase
- Re-run affected coverage seams and re-derive consumers after any upstream revision; forbid patching stale downstream artifacts into apparent agreement

## Evidence and Demonstration

An Outcome is produced; an Evaluator determines whether it satisfies named conditions. A demonstration makes the
joined evidence observable without replacing the underlying check or decision.

**Directives**:
- Join every satisfied Outcome to a named check, recorded result, observation surface, evaluator identity, and verdict
- Label manual, simulated, local, integrated, and deployed observations distinctly; forbid surface substitution
- Mark a demonstration claim without joined evidence as unverified; forbid presenting rehearsal, placeholder, or intended output as observed proof
- Retain failed and degraded observations with their conditions; forbid replacing inconvenient evidence with a later passing presentation
- Derive runtime, integration, delivery, and production claims only from their layer-specific receipts; forbid a demonstration from collapsing readiness layers

## Re-derivation and Successor Feedback

Upstream change invalidates affected downstream joins. New learning creates a successor Context; it does not revise
the meaning of the Context under which earlier work and evidence were produced.

**Directives**:
- Re-derive every affected consumer after an upstream revision changes; forbid patching joins without re-running coverage
- Invalidate evidence whose subject, conditions, artifact revision, or surface drifted; forbid replaying a verdict against different bytes or conditions
- Record findings and changed conditions in a successor Context with an explicit supersedes reference
- Preserve unaffected disjoint branches of the continuity graph; forbid global invalidation when the changed node has a bounded consumer closure

## Adaptivity and Collapse

Representations may collapse; semantic ownership and joins may not. A small change may use one compact document,
while a large change may distribute the same roles across systems and repositories.

**Directives**:
- Scale evidence and representation to change size while preserving every applicable obligation
- Permit one artifact to carry multiple separately addressable roles; forbid one field from carrying multiple semantic meanings
- Permit entry at any trustworthy artifact role only after deriving the missing upstream or downstream joins
- Keep transport, storage, provider, tool, and presentation mappings in replaceable adapters; forbid adapter vocabulary in the universal contract

## CID Directive Matrix

| Context | Intent | Directive |
|---|---|---|
| Adaptivity | Scale without losing obligations | Scale representation and evidence; preserve semantic joins; forbid seam elision |
| Agnosticity | Evaluate declared content | Identify roles from content; preserve portability; forbid filename or layout inference |
| Coherence | Maintain one meaning per concept | Centralize semantic ownership; align projections; forbid conflicting definitions |
| Continuity | Preserve the complete lineage | Join CID, RAO, artifacts, and evidence; retain revisions; forbid orphaned transitions |
| Evidence | Ground every satisfaction claim | Record checks, surfaces, results, and verdicts; forbid assertion-only completion |
| Identity | Make joins deterministic | Assign stable IDs and immutable revisions; forbid positional or mutable identity |
| Modularity | Isolate responsibility | Separate policy, transformation, state, and proof; forbid multi-owner fields |
| Neutrality | Keep mechanisms replaceable | Use functional vocabulary; isolate adapters; forbid provider-bound semantics |
| Responsibility | Make accountability explicit | Bind each Action to one Role and Outcome; forbid unnamed or self-grading authority |
| Simplicity | Minimize the canonical contract | Require only reconstructive fields; derive views; forbid duplicate projections as sources |
| Universality | Apply across domains and runtimes | Define semantic roles and joins; permit equivalent implementations; forbid domain assumptions |

## Conformance Findings

| Finding Type | Severity | Raised when |
|---|---|---|
| `unjoined-directive` | `major` | An executable Directive has no implementing RAO Step |
| `ungrounded-rao-step` | `major` | A RAO Step cites no Directive or applicable specification join |
| `non-atomic-action` | `major` | One RAO Step contains independently closable transformations |
| `unevidenced-outcome` | `blocker` | An Outcome is presented as satisfied without independent evidence |
| `stale-continuity-join` | `major` | A consumer or evidence reference names a superseded revision |
| `history-rewritten` | `blocker` | Prior Context, Outcome, or Evidence is mutated instead of superseded |

## Module Load Budget

| Stage | Sections to load |
|---|---|
| Planning | `semantic-separation`, `continuity-identity-and-revision-contract`, `cid-to-rao-coverage-seam` |
| Task derivation | `cid-to-rao-coverage-seam`, `role-action-outcome-contract` |
| Execution | `role-action-outcome-contract`, `evidence-and-demonstration` |
| Demonstration | `artifact-companion-contract`, `evidence-and-demonstration` |
| Upstream change | `re-derivation-and-successor-feedback` |
| Conformance | `conformance-findings`, `validation-checklist` |

**Directives**:
- Load only the sections required for the active stage; forbid loading this module whole as a single-stage precondition
- Record module load cost with the run budget; forbid hiding continuity overhead from execution economics

## Reference Implementation Projection

The [Role-Action-Outcome JSON-LD schema](../schema/AgenticRAG/roles-actions-outcomes-schema.jsonld) is one replaceable
projection of RAO records. It does not override this module's semantic contract. A projection is conformant only
when its declared version, identifiers, atomicity, dependencies, artifact references, and evidence joins satisfy
this module. Domain phases, interface anchors, tooltip copy, tools, and storage paths remain profile data rather than
universal RAO semantics.

One reference artifact projection uses the following replaceable mappings. These names and locations are adapter
facts, not semantic identities and not requirements on another implementation.

| Universal role | Reference artifact projection |
|---|---|
| Planning context | `$GITHUB_ROOT/agentic-canvas-os/todo/YYYY-MM/<context>.md` under its immutable planning contract |
| Requirements artifact | `requirements.md` carrying Continuity, Context, Intent, Directive, criterion, and VCC IDs |
| Design artifact | `design.md` carrying exact requirements revision plus Directive, criterion, VCC, design-element, and ADR joins |
| Task list | `tasks.md` carrying RAO Step IDs, dependencies, Outcomes, named checks, and exact upstream revisions |
| Demonstration artifact | `demo.md` carrying scenario, Outcome, Evidence Reference, observation-surface, and measurement-status joins |

The PRD/TAD/ADR authoring guideline supplies the reference authoring seam. The execution guideline consumes the
joined task projection. The planning ledger remains immutable: new evidence or changed conditions create a new
context record rather than rewriting a committed record.

**Directives**:
- Validate a projection against this module before treating it as executable; forbid schema presence from implying semantic conformance
- Version incompatible semantic changes as a new projection and migrate consumers atomically; forbid compatibility aliases that preserve conflicting ownership
- Keep projection-specific fields in profiles; forbid expanding the universal RAO core for one consumer surface
- Validate every reference artifact projection by declared role and content; forbid granting continuity from its conventional filename
- Keep the planning ledger a successor-feedback adapter; forbid treating a planning row as implementation, evidence, approval, or deployment authority

## Validation Checklist

- [ ] **CID separated**: Context, Intent, and Directives have distinct IDs and semantic ownership
- [ ] **RAO atomic**: each step has one functional Role, one atomic Action, and one measurable Outcome
- [ ] **Coverage closed**: Directive coverage and RAO grounding ratios are both complete or explicitly blocked
- [ ] **Specification joined**: requirements, design, and task joins remain current without companion-role leakage
- [ ] **Artifacts exact**: consumed and produced artifacts carry immutable identity and revision
- [ ] **Evidence joined**: every satisfied Outcome names its check, result, surface, evaluator, and verdict
- [ ] **Demonstration bounded**: presentation does not create evidence or upgrade readiness
- [ ] **History preserved**: new learning creates a successor Context with a supersedes reference
- [ ] **Graph acyclic**: dependencies reference RAO Step IDs and contain no cycle within one revision
- [ ] **Adapters isolated**: provider, tool, domain, storage, and presentation vocabulary remains outside the universal core

## Mantra Application

**"CID frames purpose · RAO assigns transformation · Artifacts carry state · Evidence verifies outcomes · Successors preserve learning"**
