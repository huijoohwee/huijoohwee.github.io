---
title: "PRD, TAD & ADR Guidelines"
doc_type: "Guidelines"
version: "3.0.0"
date: "2026-09-21"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# PRD, TAD & ADR Guidelines — From 0 to 1, 360°

One joined artifact carries a product from unvalidated pain to a paying customer. Five **section roles** specify it — **PRD, TAD, ADR, MVP, GTM**. Three **projections** present it — **Pitch Deck, Business Plan, Financial Model**. One **execution set** builds and ships it — the **ADLC** operator path `START → RELEASE → DEPLOY`. This index binds every role, projection, and seam. Companion modules own the bodies.

---

## Scope & Neutrality Contract

| Property | Rule | Finding |
|---|---|---|
| Universal | Any product, domain, language, runtime; no assumed company, path, framework, or vendor | `vendor-coupling` |
| Neutral | Capabilities and roles are named by function; a brand appears only under a heading or block whose own text says "reference implementation"; a brand named outside such a label is a `vendor-coupling` finding regardless of surrounding intent | `vendor-coupling` |
| Agnostic | Requirements derive from content and parsed frontmatter, never from file names, directories, or mirrors; examples use `[...]` | `path-derived-claim` |
| Simple | A rule earns its place by being checkable and load-bearing; Ceremony, Complication, Verbosity, and Clutter are named anti-patterns | `cid-density-violation` |
| Autonomous | A named role completes a directive using only this set's checks, evidence, and grounding; a silent human gate outside the Deploy Boundary or Evaluator is a defect | `human-gate-unstated` |
| Modular | Each `##` section is self-contained and addressable by its anchor | `non-modular-section` |
| Reusable | Extend an existing rule, template, finding, or component before authoring one | `non-modular-section` |
| Interoperable | Every key, Rule ID, Finding Type, and continuity ID is declared once and consumed by exact name | `unresolvable-reference` |
| Portable | A module carries what it needs; no hidden dependency on line numbers, path, or heading order beyond named anchors | `non-modular-section` |
| Coherent | Every role and projection shares one CID/RAO/SVO schema and one finding enumeration | `cid-schema-noncompliant` |
| Enforceable | Every rule is phrased so a check records a typed finding; a statement that cannot fail is labelled guidance | — |

---

## Module Index

Load by phase. Every file stays under 600 lines.

**Foundations** — `scope--neutrality-contract` · `rule-identity--classification` · `markdown-yaml-frontmatter-enforcement` · `overview` · `directive-grammar-cid` → [CID Guidelines](./cid-guidelines.md#shared-field-contract) · `artifact-continuity-authoring-seam` → [Artifact Continuity](./adlc-artifact-continuity.md); [Codebase Grounding — reference implementation](./prd-tad-adr-mvp-gtm-codebase-grounding.md) · `concurrent-collaboration--work-tree-integrity` → [Cloud-Authoritative Collaboration](./adlc-cloud-collaboration.md), [Scoped Lane Admission](./adlc-scoped-lane-admission.md)

**From 0 to 1** — `solo-dev-ai-native-orientation` · `time-to-value` → [Economics & Time-to-Value](./prd-tad-adr-mvp-gtm-economics.md) · `from-0-to-1-prd--tad-creation-process` · `flow-patterns` → [Process & Flow Patterns](./prd-tad-adr-mvp-gtm-process-flows.md) · `pain-point-to-feature-mapping` · `demo-skeleton` · `roadmap` · `monetization` — owned here · `domain-object-rubric-assessment` → [Agent Experience Maturity](./prd-tad-adr-mvp-gtm-maturity.md)

**Roles and projections** — `core-templates` → [Core Templates](./prd-tad-adr-mvp-gtm-templates.md) · `prd-tad-adr-mvp-gtm-planning-record` → [MVP→GTM Planning Record](./prd-tad-adr-mvp-gtm-planning-record.md) · `platform-specific-selection-criteria--multi-agent-reasoning-pipeline` → [Selection Criteria](./prd-tad-adr-mvp-gtm-selection.md) · `venture-record-pitch-deck-business-plan--financial-model` → [Venture Record](./prd-tad-adr-mvp-gtm-venture.md) · `prd--tad-integration` · `division-of-work` · `roleactionoutcome`

**Readiness and execution** — `readiness-ladder` · `agent-platform-readiness` · `lane-topology--deploy-boundary` → [Readiness & Lane Topology](./prd-tad-adr-mvp-gtm-readiness.md) · `adlc-execution-seam` → [ADLC Guidelines](./adlc-guidelines.md); [Rapid MVP Sprint](./adlc-rapid-prd-tad-adr-mvp-gtm-sprint.md); [Production Release Lifecycle](./adlc-production-release-lifecycle.md); [Autonomous Continuation](./adlc-autonomous-continuation.md); [Execution Anti-Pattern Guards](./adlc-anti-pattern-guards.md); [Repository Runtime Readiness](./adlc-repository-runtime-readiness.md)

**Verification** — `autonomous-implementation-verification` · `conformance-findings` · `validation-checklist` → [Verification & Conformance](./prd-tad-adr-mvp-gtm-verification.md) · `cid-directive-matrix` · `anti-pattern-guards` → [CID Directive Matrix](./prd-tad-adr-mvp-gtm-cid-matrix.md) · `architecture-diagram-standards` → [Diagram Guidelines](./prd-tad-adr-mvp-gtm-diagram-guidelines.companion.md), [Canvas-Render Contract](./prd-tad-adr-mvp-gtm-diagram-canvas-render.companion.md), [Diagram Templates](./prd-tad-adr-mvp-gtm-diagram-templates.companion.md) · `mantra-application`

This document owns authoring. ADLC Guidelines own execution. Collaboration companions own concurrency. Diagram companions own their domain. Artifact Continuity owns the CID-to-RAO seam. The conformance vocabulary is the union of their enumerations.

---

## Rule Identity & Classification

`Rule ID = [owning section anchor] + "#" + [ordinal of the rule within that section, in document order]`.

**Directives**:
- Derive the Rule ID from anchor and ordinal only; forbid file name, line number, or directory; record rule text beside the ID, since inserting a rule re-ordinals those after it
- Classify every rule as **Artifact-bearing** (names a locatable output; unmet → `unimplemented-guideline`) or **Advisory** (preference; unmet → counted, no finding); forbid a third class
- Report coverage as linked artifact-bearing rules over total artifact-bearing rules, with the advisory count beside it

---

## Markdown YAML Frontmatter Enforcement

Frontmatter is the SSOT for identity, status, version, renderer activation, and reusable metadata.

- Canonical planning artifacts use `prd-tad-adr-mvp-gtm` locators through the [document naming profile](./conventions-and-syntax-guidelines.md#document-locators-and-format) and declare `doc_type: "PRD-TAD-ADR-MVP-GTM"`; PRD, TAD, ADR, MVP, GTM remain distinct section roles; Pitch Deck, Business Plan, and Financial Model are projections joined by `continuity_id@revision`
- Use plain YAML; quote scalars containing `:`; a `{key, type, value}` wrapper belongs only in a parse-fidelity fixture
- **Baseline keys**: `title`, `doc_type`, `version` (semantic), `date`, `lang`. **Conformance keys**:

| Key | Domain | Read by |
|---|---|---|
| `owner` | one accountable function | `duplicate-owner` |
| `local_rung` / `delivered_rung` | one Readiness Ladder rung each, derived from evidence | `status-conflict`, `blended-status`, `unproven-claim` |
| `lane` | `authoring` \| `mirror` \| `delivery` | Lane Topology |
| `universal_scope` | boolean | Scope & Neutrality |
| `worktree_id` / `agent_id` | producing work tree and agent | `worktree-provenance-missing` |
| `continuity_id` | one stable join for every role and projection | `artifact-naming-noncompliant` |

- One `owner` per document; a blended `status` key is `blended-status`; a rung authored ahead of Evidence References is `unproven-claim`

---

## Overview

**PRD** states WHAT and WHY. **TAD** states HOW. **ADR** records one material choice. **MVP** is the smallest evidenced slice. **GTM** is the payer path and learn loop. **Pitch Deck**, **Business Plan**, and **Financial Model** project the joined artifact. The **ADLC** executes bounded RAO Steps and returns receipts.

### 360° Coverage Map

| Element | Phase | Owner | Must produce | Finding family |
|---|---|---|---|---|
| Pain, WTP, TTV | 0 | Pain-Point Mapping, Time-to-Value | labelled pain, TTV estimate | Product-Market Fit, Economics |
| PRD | 1 | Core Templates, Flow Patterns, Verification | VCCs, TTV row, MoSCoW | Traceability, CID |
| TAD | 2 | Templates, Division of Work, Diagrams, Lanes | owners, five flows, budgets, boundaries | Ownership, Topology, Lane |
| ADR | 2 | Selection Criteria | decision, alternatives, consequences, recovery | Platform Selection |
| Alignment | 3 | Conformance, Validation Checklist | zero `blocker` | all |
| START / RELEASE / DEPLOY | 4 | ADLC Execution Seam | lane, exact candidate, exact deployed revision | execution-domain |
| MVP | 4 | Planning Record, Demo Skeleton, Rubric, Readiness | evidenced `Must` slice | Readiness, Demonstration |
| GTM | 5 | Monetization, Roadmap, Planning Record | ranked first-dollar path | Monetization, Roadmap |
| Pitch Deck | 5 | Venture Record | bounded Slide Register, Reveal = VCC | Venture Record |
| Business Plan | 5 | Venture Record | two-method market, risks from findings, legal and capital rows | Venture Record |
| Financial Model | 5 | Venture Record | assumptions, unit economics, income, cash, scenarios, ADLC ledger | Venture Record |

A gate that neither narrows an observed failure nor shortens time-to-first-dollar is a `cid-density-violation`.

**Reference implementation** — non-binding: a solo-operator, AI-native, MCP-/WebMCP-native product run end-to-end on the ADLC, with `/`, `#`, `@` as its three invocable routes in one Invocation Register.

---

## Solo Dev AI-Native Orientation

The [Economics & Time-to-Value module](./prd-tad-adr-mvp-gtm-economics.md) owns the five lenses, load budget, harness pattern, orchestration topology, ROI template, FOSS-first rule, and deployment-model TCO variants.

**Directives**:
- Evaluate every scope and architecture decision through min-viable-max-value, TCO-zero, token economics, harness-first, and concurrency-safe
- Wrap every AI component in a harness with typed input, typed output, emitted cost log, and stated fallback
- Prefer an MCP- or WebMCP-conformant contract for every agent route, labelled as reference implementation — otherwise `vendor-coupling`
- Bound every agentic loop with a max-iteration count and circuit-breaker — `unbounded-loop` at `blocker`
- Separate deployment-model variants in every TCO comparison — `blended-deployment-tco`
- Weigh every new rule against the pain-point and monetization loops it protects — otherwise `cid-density-violation`

---

## Directive Grammar (CID)

The [shared field contract](./cid-guidelines.md#shared-field-contract) is the sole schema owner for Context/Intent/Directive, Role/Action/Outcome, and Subject/Verb/Object. Roles name functions; worktree, device, and agent are provenance.

**Directives**:
- Keep every directive resolvable against the shared contract — `cid-schema-noncompliant`
- Cite `context` and `directive` against locatable state or mark `source=unverified` — `cid-context-uncited`
- Verify cited state before consuming it — `cid-grounding-unverified`
- Resolve ambiguity from evidence first; one concise question only for an unresolved semantic decision — `cid-clarification-malformed`
- Keep the three tiers convergent — `cid-composition-divergence`
- Apply Density Rules — `cid-density-violation`
- Decompose independently closable outcomes into bounded task nodes — `cid-decomposition-missing`
- Stay within ADLC budgets on every always-load surface — `cid-budget-exceeded`
- Preserve stable identity and exact revision for persisted messages — `cid-naming-noncompliant`

---

## Artifact Continuity Authoring Seam

The [Artifact Continuity Module](./adlc-artifact-continuity.md) owns joins and validation. PRD owns product intent, scope, criteria, and VCCs; TAD consumes that exact revision and owns structure; ADR records material decisions, alternatives, consequences, and relevant recovery; MVP and GTM consume all three; projections consume the whole. Execution consumes the joined projection as bounded RAO Steps under the shared CID contract. The [codebase-grounding reference implementation](./prd-tad-adr-mvp-gtm-codebase-grounding.md) supplies one machine-readable ownership snapshot.

**Directives**:
- Declare stable continuity IDs and exact revisions across every role and projection — `artifact-naming-noncompliant`
- Default to one combined document with addressable sections; an unstated split is `cid-density-violation`
- Before baseline, produce a **Codebase Grounding Record** for every non-native input; an unresolved claim used for baseline, execution, or readiness is `unproven-claim`
- Close PRD-to-TAD coverage, TAD grounding, and applicable ADR joins before deriving RAO Steps; re-run Directive-to-RAO coverage after any upstream revision
- Require joined independent evidence before satisfaction or readiness advances
- Treat the joined artifact at one `continuity_id@revision` as the sole SSOT; a downstream document stating a requirement, design, or decision absent from the artifact is `duplicate-owner`

**Authoring-to-execution gate**: advance only with current grounding records, complete coverage, grounded RAO steps, independent checks, and a recorded decision covering the scope. A confirmed capability gap may become planned work; it never becomes evidence of an existing capability.

---

## Concurrent Collaboration & Work-Tree Integrity

[Cloud-Authoritative Collaboration](./adlc-cloud-collaboration.md) and [Scoped Lane Admission](./adlc-scoped-lane-admission.md) own coordination.

**Directives**:
- Carry `worktree_id` and `agent_id` when more than one work tree is active — `worktree-provenance-missing`
- Enforce single-writer-per-capability — `duplicate-capability-owner`
- Require idempotent integration by exact candidate and receipt — `merge-non-idempotent`; preserve unintegrated owner work — `merge-lossy`
- Route observed drift through the finding its governing section owns; forbid a parallel drift vocabulary
- Forbid any cross-work-tree lock without timeout and Evaluator escalation — `deadlock-unbounded-wait` at `blocker`
- Apply Receiver Grounding to every cross-origin claim — `cid-grounding-unverified`
- Bound active agents and work trees by declared capacity; unexplained inactive lanes are `work-tree-sprawl` without authorizing deletion
- Route irreconcilable concurrent outcomes to the Evaluator; forbid last-write-wins

---

## From 0 to 1: PRD & TAD Creation Process

The [Process & Flow Patterns module](./prd-tad-adr-mvp-gtm-process-flows.md) owns the phases, steps, and gates. The spine is **Phase 0** pain, WTP, TTV, grounding → **Phase 1** PRD → **Phase 2** TAD and ADRs → **Phase 3** alignment with zero `blocker` → **Phase 4** ADLC `START → RELEASE → DEPLOY` to an evidenced MVP → **Phase 5** GTM and venture projections.

**Directives**:
- Treat the module's phase order as canonical — `gate-order-drift`; a later gate passing while an earlier fails is `gate-sequence-violation`
- Pass every gate before proceeding; Phase 3 exits only with version-stamped documents and zero `blocker` findings
- Bound the revision cycle: 3 alignment cycles maximum, circuit-breaker on no reduction in open `blocker` findings across two consecutive cycles

---

## Flow Patterns

The [Process & Flow Patterns module](./prd-tad-adr-mvp-gtm-process-flows.md) owns user journey, workflow, data flow, orchestration/harness flow, and topology.

**Directives**:
- Trace every feature through all five — a skipped flow is incompletely specified
- Render each flow as its bound diagram class — `missing-required-diagram`
- Anchor every data and harness flow to a journey stage

---

## Time-to-Value

The [Economics & Time-to-Value module](./prd-tad-adr-mvp-gtm-economics.md) owns the TTV definition, template, and validation method.

**Directives**:
- Estimate TTV in Phase 0 and state it as a named row in PRD success metrics for every user-facing feature — `missing-economics-metric`
- Validate TTV on a clean environment before Phase 3 sign-off

---

## Core Templates

The [Core Templates module](./prd-tad-adr-mvp-gtm-templates.md) owns the PRD, TAD, ADR, MVP, GTM, and projection template bodies, plus the component inventory, Diagram Register, and Deploy Boundary Register.

**Directives**:
- Instantiate the templates; a field exists because a rule requires the artifact it names
- Keep every conformance-bearing field — rungs, Evidence References, VCCs, token budget, TCO per deployment model, boundary state, provenance, assumption IDs, Slide Register bounds

---

## PRD-TAD-ADR-MVP-GTM Planning Record

The [MVP→GTM Planning Record module](./prd-tad-adr-mvp-gtm-planning-record.md) owns the five section roles and the four-column task record `PRD-TAD-ADR-MVP-GTM | CID | RAO | Updated Date`.

**Directives**:
- Treat MVP and GTM as consumers of PRD criteria, TAD elements, and ADR decisions under one `continuity_id@revision` — `duplicate-owner`
- Join every planning record by `continuity_id@revision` — `artifact-naming-noncompliant`

---

## Platform-Specific Selection Criteria — Multi-Agent Reasoning Pipeline

The [Selection Criteria module](./prd-tad-adr-mvp-gtm-selection.md) owns the **Constraints ↔ Argumentation ↔ Outranking** stage bodies for platform, vendor, provider, channel, price, or funder-instrument choices.

**Directives**:
- Dispose every candidate `pass` or `fail-<named-constraint>` against the project's own requirements before comparing — `constraint-gate-skipped`
- Record an auditable non-compensatory outranking relation and preserve incomparability — `outranking-relation-unstated`, `outranking-incomparability-collapsed`
- Route contested choices to an argument graph judged by an Evaluator holding no argument — `argumentation-graph-missing`, `argumentation-self-graded` at `blocker`
- Bound the pipeline by declared time, token, and iteration limits; record an unresolved decision at the bound rather than inventing a winner
- Name real vendors only under a "reference implementation" label — `vendor-coupling`

---

## Venture Record: Pitch Deck, Business Plan & Financial Model

The [Venture Record module](./prd-tad-adr-mvp-gtm-venture.md) owns the Slide Register, business-plan section contract, market-sizing method, assumption register, unit economics, income statement, cash-flow statement, capitalization, use of funds, scenario set, and ADLC Cost Ledger.

**Directives**:
- Treat all three as projections of the joined artifact at one `continuity_id@revision`; a claim, number, or decision first appearing in a projection is `pitch-claim-unsourced`; a path-only join is `artifact-naming-noncompliant`
- Carry every projected claim's evidence status in the owners' vocabulary; forbid an unlabelled forward-looking statement
- Recognize revenue only from collected payment — `revenue-recognized-unpaid`
- Register every model input with source, disposition, and date — `financial-assumption-unsourced`; carry token cost as COGS — `missing-economics-metric`; ledger ADLC operating cost from execution receipts — `adlc-cost-unledgered`
- Produce income statement, cash-flow statement, and Base/Downside/Upside scenarios with runway; omit a balance sheet only with a stated reason — `scenario-set-incomplete`
- Size a market by two cited independent methods and reconcile them — `market-size-single-method`
- Anchor the deck's Reveal to the MVP Demo Skeleton VCC; tie the ask to named Roadmap phases, use-of-funds rows, and capitalization when the instrument is equity

---

## Pain-Point-to-Feature Mapping

Owned here. Embed the record in the PRD or reference it exactly.

**Directives**:
- Trace every `Must` feature to one pain point in fixed form — pain point, hook, break, fix, close, min-time-resource-max-value note
- State the note as a reuse-or-build split against Division of Work components
- Label a pain point `unvalidated` until a quote, ticket, or measured behaviour supports it; `demand-proven` only with paid-customer evidence; an `unvalidated` pain backing a `Must` at baseline is `pain-point-not-validated`
- Rank fixes by proximity to what is built, and pain points by WTP magnitude before build cost — `roadmap-order-unexplained`
- Forbid a hook or close implying a capability the fix lacks

---

## Demo Skeleton

Owned here.

**Directives**:
- Require a time-boxed beat table — Hook, Probe, Reveal, `[domain action]`, Close — for every `Must` or L3+ feature — `missing-demo-beat`
- Keep the sum of beat bounds within the feature's stated budget
- Anchor the Reveal to the feature's own VCC
- Name `[domain action]` by the product's own interaction; forbid hardcoding a device or channel

---

## Domain-Object Rubric Assessment

The [Agent Experience Maturity module](./prd-tad-adr-mvp-gtm-maturity.md) owns the four-criterion 1–5 matrix.

**Directives**:
- Identify the product's actual domain object before applying any external rubric
- Report the highest contiguous passing level and the next unpassed as a gap — `overclaimed-rubric-level`
- Name the blocking component for every unclaimed rung — `unresolved-rubric-gap`
- Close a gap by named cross-artifact reuse, never a silent re-implementation

---

## Roadmap

Owned here.

**Directives**:
- State per phase: feature, named reuse, what is new, priority rationale, prerequisite — `roadmap-reuse-unstated`
- Order by reuse-adjusted build cost; state any divergence — `roadmap-order-unexplained`
- Gate later phases on named earlier prerequisites
- Mark a known deferred idea `Won't (this increment)` — `roadmap-scope-silently-dropped`

---

## Monetization

Owned here.

**Directives**:
- Track `mechanism-proven` and `demand-validated` independently; record collected payment separately before claiming revenue — `monetization-demand-unvalidated`
- Select the nearest-term stream by which segment exists now
- Order every viable stream by distance to a real first dollar and state the order
- Require a validation result before `demand-validated`
- State any monetization deferral explicitly

---

## Division of Work

Owned here.

**Directives**:
- Assign exactly one owning component per capability — `duplicate-capability-owner` at `major`
- Record a reuse-or-new decision for every component added — `component-origin-unstated`
- Extend an existing store, function, or ledger before introducing a second — `unjustified-storage-duplication` at `major`
- Permit cross-artifact reuse naming the exact owning artifact and version

---

## PRD ↔ TAD Integration

PRD stops at acceptance criteria; TAD starts at architectural approach. Forbid implementation detail in PRD and business logic in TAD.

```
PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface] ↔ VCC [condition] ↔ Evidence Reference [check + result]
```

The chain closes in both directions. Refinement is bounded: 3 cycles, circuit-breaker on no `blocker` reduction across two consecutive cycles, then escalate.

---

## Readiness Ladder

The [Readiness & Lane Topology module](./prd-tad-adr-mvp-gtm-readiness.md) owns what earns each rung. The vocabulary is published here:

```
undocumented  <  spec-complete  <  dev-proven  <  runtime-ready  <  production-verified
```

**Directives**:
- Draw every status from this ladder — `unknown-status`
- Derive every rung from Evidence References only — `unproven-claim` at `blocker`
- Report local and delivered readiness separately — `blended-status`

---

## Agent-Platform Readiness

The [Readiness & Lane Topology module](./prd-tad-adr-mvp-gtm-readiness.md) owns the dimensions, tiers, Invocation Surface Contract, gap matrix, and follow-on template.

**Directives**:
- Name which dimensions are in scope
- Keep every discovery and read route at zero token cost — `paid-read-path`
- Declare every `/`, `#`, `@`, and tool-identity route in exactly one Invocation Register — `orphan-route`, `ambiguous-route`
- Federate agent routes through an MCP- or WebMCP-conformant gateway where available — `unfederated-tool`

---

## Lane Topology & Deploy Boundary

The [Readiness & Lane Topology module](./prd-tad-adr-mvp-gtm-readiness.md) owns the lane sequence, the four boundary parts, and the closed-by-default rule.

**Directives**:
- Document all three lanes and every boundary before the first promotion — `missing-lane` at `blocker`
- Keep every Deploy Boundary `closed` absent a referenced operator instruction — `ungated-promotion`
- Forbid any authoring-lane command that mutates a mirror or delivery surface — `deploy-boundary-breach` at `blocker`

---

## ADLC Execution Seam

The [ADLC Guidelines](./adlc-guidelines.md) own execution: task model, per-task budgets, agent roles, tool permissions, human-in-the-loop gates, release control, execution findings. The [Rapid MVP Sprint profile](./adlc-rapid-prd-tad-adr-mvp-gtm-sprint.md) collapses phases without eliding obligations. This section owns only what crosses the seam.

| Verb | Artifact hands over | Execution returns | Next blocked without it |
|---|---|---|---|
| **START** | baselined `continuity_id@revision`, write-scope paths, VCCs as bounded RAO Steps | lane identity, worktree path, base SHA | RELEASE |
| **RELEASE** | exact lane head, review body, named checks | Integration Receipt, protected `main` SHA | DEPLOY, Financial Model ledger period |
| **DEPLOY** | exact protected SHA, consumer controller, operator instruction | deployment receipt, live identity, rollback predecessor | `production-verified` rung, GTM runtime evidence |

**Directives**:
- Hand execution a baselined artifact with zero open `blocker` findings, current Codebase Grounding Records, and VCCs decomposable into bounded task nodes — `cid-decomposition-missing`
- Name in the TAD every human-in-the-loop gate the execution set requires for this scope, with evidence and rollback — `human-gate-unstated`
- State per-feature token, iteration, and wall-clock ceilings that per-task budgets may narrow but never exceed — `unbounded-loop` at `blocker`
- Read readiness, cost, and integration facts back only from Evidence References and receipts; the Financial Model's ADLC Cost Ledger consumes those receipts by exact reference — `unproven-claim`, `adlc-cost-unledgered`
- Keep the operator path externally simple — start one lane, release one exact candidate, deploy one exact protected revision — `gate-order-drift`

---

## Autonomous Implementation Verification

The [Verification & Conformance module](./prd-tad-adr-mvp-gtm-verification.md) owns the VCC primitive, criterion-to-condition pipeline, Evaluator independence, Evidence Reference, traceability extension, and closure rules.

**Directives**:
- Express every acceptance criterion as a VCC with one measurable end state, a stated check, and constraints
- Attach an Evidence Reference — named invocable check, recorded result, surface — to every satisfied VCC
- Keep the Evaluator a distinct mechanism from the implementer and from every work tree or agent it judges

---

## Architecture Diagram Standards

| Module | Owns |
|---|---|
| [Diagram Guidelines](./prd-tad-adr-mvp-gtm-diagram-guidelines.companion.md) | identity, class selection, notation, labelling, complexity, render reach, versioning, drift |
| [Canvas-Render Contract](./prd-tad-adr-mvp-gtm-diagram-canvas-render.companion.md) | render target, ingest, graph elements, convertibility, projection, canvas findings |
| [Diagram Templates](./prd-tad-adr-mvp-gtm-diagram-templates.companion.md) | copy-ready portable template bodies |
| Diagram identity, class, notation, and canvas projection rules | The companion modules above are the owning source |

**Directives**:
- Keep diagram source present in the mandated notation
- A diagram-bearing task must emit a projection check named by the authoring set's canvas-render contract
- Apply the companion gates beside this set's Alignment Gate; the vocabulary is the union

---

## CID Directive Matrix

The [CID Directive Matrix module](./prd-tad-adr-mvp-gtm-cid-matrix.md) owns the A→Z Context/Intent/Directive lookup.

**Directives**:
- Use the matrix as the lookup surface; it summarizes obligations owned elsewhere and adds none

---

## Anti-Pattern Guards

The [Anti-Pattern Guards module](./prd-tad-adr-mvp-gtm-cid-matrix.md) owns the paired prohibited patterns and corrections.

**Directives**:
- Read each guard as the prose form of a typed finding; a guard without a Finding Type cannot be recorded

---

## Conformance Findings

The [Conformance Findings module](./prd-tad-adr-mvp-gtm-verification.md) owns the recording contract, severity assignment, enumeration, and determinism rules.

**Directives**:
- Record every finding with all six fields anchored to a Rule ID
- Treat the module's enumeration as the single source of truth for authoring-domain names; extend it by adding the row first, then the rule
- Report zero counts for types with no finding; keep results deterministic, additive, bounded, comparable

---

## Validation Checklist

The [Verification & Conformance module](./prd-tad-adr-mvp-gtm-verification.md) owns the pre-implementation, post-documentation, and alignment-gate checklists.

**Directives**:
- Require current artifact continuity before baseline sign-off: grounding records, CID-to-RAO coverage, companion joins, artifact revisions, independent evidence, demonstration and successor references
- Require work-tree integrity before baseline sign-off whenever more than one work tree contributed
- Require venture projections at the baselined revision before any audience action that depends on them
- Discharge the alignment gate: zero `blocker` is the exit; `major` and `minor` resolved or tracked with an owner
- Compare the finding set against the prior run on every baselined change; a new `blocker` is a regression

---

## Role—Action—Outcome

Each entry is the document-scope `role`/`action`/`outcome` envelope. A role may be one human, one LLM, or several agents across work trees.

- **Product Manager** → problems, journeys, stories, VCCs, MoSCoW, success metrics → user-centric PRD
- **System Architect** → interactions, flows, interfaces, ADRs, quality attributes, deployment → implementable TAD
- **Solo Founder / AI Orchestrator** → grounds pain and WTP, ranks reusable solutions, states bounds, tracks observed TCO, keeps collaboration within capacity → verified outcomes without duplicate agents or lanes
- **Financial Modeler** → sourced assumptions, unit economics with token cost as COGS, income and cash statements, ADLC Cost Ledger from receipts, scenarios → a model whose every headline row traces to evidence
- **Evaluator** *(a mechanism, never a person; never collapses into any role or work tree it judges)* → judges VCCs, records Evidence References, derives rungs, resolves concurrent claims, renders selection verdicts from a graph it holds no argument in → verdicts no participant can self-grade
- **UX Designer** → personas, journeys, usability → user-centred design
- **Engineering Lead** → feasibility, patterns, risks → implementable approach
- **QA Engineer** → testability, plans from PRD, automation → verifiable requirements
- **Technical Writer** → structure, templates, versions, traceability → aligned documentation
- **Stakeholder** → context, problem validation, scope approval → alignment with objectives

---

## Mantra Application

**"CID frames · Grounding binds claims to code · Flows anchor stories · Pain points ground every feature · Time-to-value gates the shortest path · Demo skeletons prove the story in one sitting · Rubrics name the breakthrough honestly · Roadmaps sequence reuse before invention · Monetization tests a real payer before a mechanism · Venture records project, never originate · The lifecycle has a ledger line · START then RELEASE then DEPLOY · One owner per capability · Evidence earns the rung · Findings make the rules checkable · Boundaries stay closed until an operator opens them"**

- **CID frames**: one grammar for every role, projection, and dispatch
- **Grounding binds**: a confirmed gap is planned work, never existing capability
- **Flows anchor**: five flows per feature; TTV validates the shortest path
- **Pain points ground**: every `Must` traces to one pain point labelled by evidence status
- **Demo skeletons prove**: the Reveal is the VCC holding
- **Rubrics name**: the real domain object first; highest contiguous pass, blockers named
- **Roadmaps sequence**: reuse-adjusted cost; deferred ideas marked, never dropped
- **Monetization tests**: mechanism, WTP, and collected revenue stay separate
- **Venture records project**: every slide, section, and row cites its source; revenue is collected money only
- **Ledger line**: active minutes, token spend, CI minutes, provider fees, and avoidable-block cost enter the model from receipts
- **START then RELEASE then DEPLOY**: one lane, one exact candidate, one exact protected revision
- **One owner**: consumers call, never re-implement
- **Evidence earns**: rungs are computed, never asserted
- **Findings make checkable**: type and severity on every prohibition
- **Boundaries stay closed**: named gate, evidence, rollback, operator instruction
