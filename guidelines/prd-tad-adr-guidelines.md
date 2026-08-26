---
title: "PRD, TAD & ADR Guidelines"
doc_type: "Guidelines"
version: "1.12.0"
date: "2026-08-26"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
---

# PRD, TAD & ADR Guidelines

## Scope & Neutrality Contract

- **Universal**: these guidelines apply to any product, domain, language, or runtime; nothing here assumes a specific company, repository, file path, framework, or vendor.
- **Neutral**: name capabilities and roles by their function, never by a brand. Where a concrete tool is shown, it appears only as a non-binding *reference implementation* and may be swapped for any equivalent. Every brand, product, or vendor name must sit under a heading or block whose own text contains the words "reference implementation"; a brand named outside such a label is a `vendor-coupling` finding regardless of surrounding intent.
- **Agnosticity**: requirements are derived from document content and parsed frontmatter only — never from file names, directory layout, or downstream mirrors. Examples use placeholders (`[...]`) rather than real identifiers.
- **Modular**: each `##` section is self-contained and addressable by its heading anchor (see Module Index). Sections may be lifted into another guideline set without rewriting their internals.
- **Enforceable**: every rule in this set is written so a conformance check can record a typed finding against it (see Conformance Findings). A statement that cannot be violated observably is guidance, not a rule, and is labelled as such.

---

## Module Index

- `scope--neutrality-contract` — universality, neutrality, agnosticity, modularity, enforceability rules
- `rule-identity--classification` — stable rule addressing and the artifact-bearing vs advisory split
- `markdown-yaml-frontmatter-enforcement` — authoring contract for frontmatter SSOT
- `overview` — what PRD/TAD are and the governing standards
- `solo-dev-ai-native-orientation` — binding lens, harness, and bound obligations -> [Economics & Time-to-Value](./prd-tad-adr-economics.md)
- `directive-grammar-cid` — Context/Intent/Directive grammar and sorting
- `artifact-continuity-authoring-seam` — PRD/TAD/ADR CID ownership, RAO grounding, revision joins, and execution handoff
- `from-0-to-1-prd--tad-creation-process` — binding gate order -> [Process & Flow Patterns](./prd-tad-adr-process-flows.md)
- `flow-patterns` — binding five-pattern coverage -> [Process & Flow Patterns](./prd-tad-adr-process-flows.md)
- `time-to-value` — binding TTV metric obligation -> [Economics & Time-to-Value](./prd-tad-adr-economics.md)
- `readiness-ladder` — binding status vocabulary -> [Readiness & Lane Topology](./prd-tad-adr-readiness.md)
- `agent-platform-readiness` — binding dimension and route obligations -> [Readiness & Lane Topology](./prd-tad-adr-readiness.md)
- `lane-topology--deploy-boundary` — binding closed-by-default rule -> [Readiness & Lane Topology](./prd-tad-adr-readiness.md)
- `autonomous-implementation-verification` — binding VCC and Evidence obligations -> [Verification & Conformance](./prd-tad-adr-verification.md)
- `cid-directive-matrix` — lookup surface -> [CID Directive Matrix](./prd-tad-adr-cid-matrix.md)
- `core-templates` — binding template-field obligations -> [Core Templates](./prd-tad-adr-templates.md)
- `platform-specific-selection-criteria-topsis` — binding weighted, auditable multi-criteria ranking obligation for any platform/vendor/provider choice -> [Selection Criteria](./prd-tad-adr-selection-criteria.md)
- `pain-point-to-feature-mapping` — binding pain-point-to-feature traceability obligation -> [Pain-Point Mapping](./prd-tad-adr-pain-point-mapping.md)
- `demo-skeleton` — binding time-boxed demonstration obligation -> [Demo Skeleton](./prd-tad-adr-demo-skeleton.md)
- `domain-object-rubric-assessment` — binding breakthrough-level self-assessment obligation -> [Domain-Object Rubric](./prd-tad-adr-domain-object-rubric.md)
- `roadmap` — binding phased reuse/delta sequencing obligation -> [Roadmap](./prd-tad-adr-roadmap.md)
- `monetization` — binding real-payer validation obligation -> [Monetization](./prd-tad-adr-monetization.md)
- `architecture-diagram-standards` — diagram format obligations, and the seam to the diagram companion set
- [Diagram Guidelines](./prd-tad-adr-diagram-guidelines.companion.md) — diagram identity, class catalog, notation, labelling, complexity, drift, diagram-domain findings
- [Diagram Canvas-Render Contract](./prd-tad-adr-diagram-canvas-render.companion.md) — surface declaration, ingest surfaces, graph element contract, projection rules, canvas-domain findings
- [Diagram Templates](./prd-tad-adr-diagram-templates.companion.md) — copy-ready, portable-intersection templates per class
- `prd--tad-integration` — separation of concerns, traceability, and closure rules
- `anti-pattern-guards` — prohibited patterns -> [CID Directive Matrix](./prd-tad-adr-cid-matrix.md)
- `conformance-findings` — binding recording contract -> [Verification & Conformance](./prd-tad-adr-verification.md)
- `validation-checklist` — binding alignment gate -> [Verification & Conformance](./prd-tad-adr-verification.md)
- `division-of-work` — binding capability-ownership obligation -> [Division of Work](./prd-tad-adr-division-of-work.md)
- `roleactionoutcome` — role-to-deliverable mapping
- `mantra-application` — the framing mantra

**Modular set**: this document is the always-loaded index and binding layer. Each `##` section below keeps its anchor and states only what binds a PRD, TAD, or ADR directly; the full protocol for a section lives in the module its entry names. Every file in this set stays under 600 lines and carries one responsibility, so a single-phase task loads one module rather than the whole set.

**Companion sets**: this document is the authority for **authoring** — what a PRD, TAD, or ADR must contain and how conformance is named. Execution — task decomposition, agent roles and independence, tool blast radius, per-task budgets, and run state — is owned by the **Agentic SDLC Guidelines** companion set. The **diagram domain** — diagram identity, class selection, notation, labelling, canvas projection, and templates — is owned by the three diagram companion modules named in the Module Index. No set restates another; each names the others where a rule crosses the boundary, and the conformance vocabulary is the union of their enumerations. A claim about execution, or about a diagram's canvas-renderability, sourced from this document alone is incomplete.

**Continuity companion**: the [Artifact Continuity Module](./agentic-sdlc-artifact-continuity.md) owns the universal CID-to-RAO seam, companion-artifact joins, outcome evidence, revision freshness, and successor feedback. This authoring set supplies its PRD, TAD, and ADR inputs; it does not redefine the continuity vocabulary.

---

## Rule Identity & Classification

**Makes every individual rule separately addressable and separately classifiable.** Section anchors address a *group* of rules; a conformance check needs to address *one*. Without per-rule identity, two different violations inside one section collapse into a single finding and the regression comparison in Conformance Findings silently stops working.

### Rule Identifier

Every rule carries a **Rule ID** that is stable across edits to unrelated rules:

```
Rule ID = [owning section anchor] + "#" + [ordinal of the rule within that section, in document order]
```

**Directives**:
- Derive the Rule ID from the owning `##` section anchor and the rule's position within that section; forbid deriving it from a file name, a line number, or a directory
- Treat the Rule ID as stable while the rule's own text and owning section are unchanged; inserting an unrelated rule earlier in the same section re-ordinals the rules after it, so record the rule text alongside the ID wherever a finding is stored
- Where two rules in one section carry identical text, disambiguate by ascending document-order ordinal; forbid merging them into one addressable rule
- Use the Rule ID, not the section anchor alone, as the `rule anchor` field of a finding and as a component of the deduplication key
- Rules authored before this section existed inherit their ID by the same derivation; no retroactive hand-labelling is required, and none is permitted to override the derivation

### Artifact-Bearing vs Advisory

Every rule is exactly one of two classes, and the class decides whether an unmet rule is a defect or a preference:

| Class | Definition | Unmet consequence |
|---|---|---|
| **Artifact-bearing** | The rule requires a named, locatable output: a document, a section, a template field, a schema, a diagram, a recorded status, a named check | `unimplemented-guideline` |
| **Advisory** | The rule states a preference, a framing, or a judgement that produces no separately locatable output | No finding; counted as advisory coverage |

**Directives**:
- Classify a rule as artifact-bearing when its text names a produced output; classify it as advisory otherwise; forbid a third class and forbid leaving a rule unclassified
- Derive the class from the rule text, so the classification is recomputable and cannot drift from the rule it describes
- Report the coverage ratio as linked artifact-bearing rules over total artifact-bearing rules; forbid an alignment claim that omits that ratio
- Distinguish the two classes explicitly, because only artifact-bearing rules can produce an `unimplemented-guideline`; mislabelling advice as a rule inflates the defect count without improving the product
- Forbid inflating the defect count by classifying advice as artifact-bearing; a high count achieved that way measures labelling, not conformance
- Count advisory rules separately and report the count; an advisory rule with no artifact is expected, not a gap

---

## Markdown YAML Frontmatter Enforcement

- Canonical PRD, TAD, and combined PRD/TAD Markdown docs must start with a valid YAML frontmatter block as the first block in the file.
- Frontmatter is the SSOT for document identity, status, versioning, renderer activation, and reusable metadata referenced by the body specification.
- Canonical authored PRD/TAD docs use plain YAML for frontmatter and related schema-bearing blocks; do not replace normal authoring syntax with typed wrapper records.
- Normalized `{key, type, value}` wrappers are permitted only in dedicated validation fixtures that explicitly test ingest -> parse -> render or ingest -> parse -> validate fidelity.
- Scalars that contain reserved punctuation, including inline `:` content, must be quoted so strict YAML parsers read planning and architecture metadata deterministically.
- Parser warning, repair, or fallback behavior is recovery-only; malformed YAML frontmatter remains an upstream authoring defect that must be fixed at source.
- **Baseline required keys** for any canonical PRD, TAD, or ADR doc: `title`, `doc_type`, `version` (semantic), `date`, `lang`. Extend with domain-specific keys as needed (e.g. `parent` / `parent_version` for a linked Follow-On PRD/TAD per the Agent-Platform Readiness template) without dropping the baseline set.
- **Conformance keys** are required in addition to the baseline set, because the rules in this guideline set read them and the agnosticity rule forbids recovering them from a path or a directory:

| Key | Value domain | Read by |
|---|---|---|
| `owner` | One named accountable function | `duplicate-owner` |
| `local_rung` | One Readiness Ladder rung | Readiness Ladder, `status-conflict` |
| `delivered_rung` | One Readiness Ladder rung | Readiness Ladder, `blended-status` |
| `lane` | `authoring` \| `mirror` \| `delivery` | Lane Topology & Deploy Boundary |
| `universal_scope` | `true` \| `false` | Scope & Neutrality Contract modularity rule |

- Declare exactly one `owner` per document; two documents claiming ownership of one contract is a `duplicate-owner` finding, and a document with no `owner` cannot be assigned a rung
- Keep `local_rung` and `delivered_rung` as two separate keys; a single blended `status` key is a `blended-status` finding
- Treat every conformance key as derived where a derivation exists: `local_rung` and `delivered_rung` are computed from Evidence References and written back, never authored ahead of the evidence

---

## Overview

**Product Requirements Documentation (PRD)**: defines user value propositions, specifies acceptance criteria, prioritizes features systematically, aligns stakeholders, validates assumptions iteratively, and maintains bidirectional traceability.

**Technical Architecture Documentation (TAD)**: designs component interactions, specifies integration contracts, documents decision rationale, establishes quality attributes, defines deployment strategies, and traces requirements to implementation.

**Governing standards**: structure documents with user-centric narratives; design architectures with domain-agnostic patterns; specify measurable outcomes; maintain requirement-to-implementation traceability; apply iterative refinement; separate concerns systematically.

**Enforceability**: these standards are written to be checked, not only read. Each rule is phrased so a violation is observable, each violation has a name and a severity (see Conformance Findings), each readiness claim is a value derived from recorded evidence (see Readiness Ladder), and each step toward a public surface passes a named gate that is closed by default (see Lane Topology & Deploy Boundary). A rule that cannot fail a check is guidance; this set labels the difference rather than blurring it.

**Solo-dev AI-native orientation**: these guidelines are calibrated for a solo founder or small team operating an AI-native product stack. Every decision is evaluated through four compounding lenses — **min-viable-max-value** (ship the smallest artifact that delivers the largest user impact), **TCO-zero** (prefer FOSS and zero-egress infrastructure; make cost a first-class architectural constraint), **token economics** (treat LLM token consumption as a measurable engineering metric at every pipeline boundary), and **harness-first** (orchestrate AI capabilities through composable, observable harnesses rather than ad-hoc prompt calls). These lenses do not replace the core PRD/TAD standards — they sharpen prioritization, constrain architecture choices, and accelerate validation cycles.

---

## Solo-Dev AI-Native Orientation

The separately loadable [Solo-Dev AI-Native Orientation module](./prd-tad-adr-economics.md) owns the four compounding lenses, the guideline load budget, the AI-native harness pattern, orchestration topology, the ROI template, the FOSS-first rule, and deployment-model TCO variants. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Evaluate every decision through the four lenses named in that module — min-viable-max-value, TCO-zero, token economics, harness-first; forbid a scope or architecture decision that names none of them
- Wrap every AI-powered component in a harness with typed input, typed output, an emitted cost log, and a stated fallback; a raw prompt call in a production pipeline is an anti-pattern guard violation
- Bound every agentic loop with a max-iteration count and a circuit-breaker condition; an unbounded loop is an `unbounded-loop` finding at `blocker` severity
- Separate every candidate's deployment-model variants in a TCO comparison; a blended figure is a `blended-deployment-tco` finding

---

## Directive Grammar (CID)

Every directive in this guideline set is expressed with a uniform, project-agnostic grammar so it can be lifted into any context unchanged. The `CID Directive Matrix` section applies this grammar.

### Definition
- **Context**: focus domain of concern
- **Intent**: desired principle or guiding goal
- **Directive**: explicit prohibition or required safeguard

### Sorting
Each entry is organized alphabetically (A→Z) for clarity and neutrality.

---

## Artifact Continuity Authoring Seam

The [Artifact Continuity Module](./agentic-sdlc-artifact-continuity.md) owns the reusable seam and its complete validation contract. PRD owns the product Context, Intent, Directives, normative criteria, and VCCs. TAD consumes that exact PRD revision and owns the structural response. ADR records one grounded decision and its consequences. The execution companion consumes their joined projection as bounded RAO Steps; evidence, demonstration, and successor planning remain downstream companions rather than authoring phases.

**Directives**:
- Declare stable continuity IDs and exact revisions across PRD, TAD, and ADR; forbid prose, filename, or co-location joins
- Close PRD-to-TAD coverage, TAD grounding, and applicable ADR joins before deriving RAO Steps
- Re-run Directive-to-RAO coverage and affected re-derivation after any upstream revision
- Require joined independent evidence before satisfaction or readiness advances; forbid narrative or self-graded completion
- Reuse the Artifact Continuity Module's findings and reference projections; forbid a parallel continuity vocabulary

**Authoring-to-execution gate**: advance only when PRD-to-TAD coverage, TAD grounding, Directive-to-RAO coverage, RAO grounding, revision freshness, and evaluator independence are complete. An absent or failing join yields a typed finding and a blocked transition, never an inferred approval.

---

## From 0 to 1: PRD & TAD Creation Process

The separately loadable [From 0 to 1: PRD & TAD Creation Process module](./prd-tad-adr-process-flows.md) owns the five phases, their numbered steps, and the gate that closes each one. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Treat the phase order in that module as the canonical order; a documented stage order that contradicts it is a `gate-order-drift` finding, and a later gate passing while an earlier one fails is a `gate-sequence-violation`
- Pass every gate before proceeding; Phase 3 exits only with both documents version-stamped and the alignment check reporting zero `blocker` findings
- Bound the Phase 4 revision cycle like every other loop in this set: a max-iteration count plus a circuit-breaker on no reduction in open `blocker` findings across two consecutive cycles

---

## Flow Patterns

The separately loadable [Flow Patterns module](./prd-tad-adr-process-flows.md) owns the five canonical flow types — user journey, workflow, data flow, orchestration/harness flow, and topology — with a template and directives for each. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Trace every feature through all five flow patterns; a feature that skips one is incompletely specified
- Render each flow pattern as its bound diagram class per the diagram companion set; a missing rendering is a `missing-required-diagram` finding in the diagram domain
- Anchor every data flow and harness flow to a journey stage; an orphaned flow has no user value to preserve

---

## Time-to-Value

The separately loadable [Time-to-Value module](./prd-tad-adr-economics.md) owns the TTV definition, its metric template, and its validation method. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Estimate TTV steps and elapsed time in Phase 0 and state TTV as a named row in PRD success metrics for every user-facing feature; an absent TTV is a `missing-economics-metric` finding
- Validate TTV on a clean environment before Phase 3 sign-off; forbid an estimate that has never been walked through

---

## Readiness Ladder

The separately loadable [Readiness Ladder module](./prd-tad-adr-readiness.md) owns what earns each rung and the evidence rule that governs it. This section publishes the **vocabulary**, because other documents consume it and a consumed interface belongs with the index rather than behind a load.

Strictly ordered, lowest to highest:

```
undocumented  <  spec-complete  <  dev-proven  <  runtime-ready  <  production-verified
```

| Rung | Earned when |
|---|---|
| `undocumented` | No VCC and no Evidence Reference exists |
| `spec-complete` | At least one VCC is stated, none yet satisfied |
| `dev-proven` | At least one VCC is satisfied by a reproducible local check with a recorded result |
| `runtime-ready` | Every VCC carries a satisfying Evidence Reference |
| `production-verified` | `runtime-ready` plus a recorded delivery-surface result and a referenced operator promotion instruction |

**Directives**:
- Draw every status value from that ladder and no other vocabulary; an unrecognised value is an `unknown-status` finding
- Derive every rung from Evidence References only; a hand-authored rung is an `unproven-claim` at `blocker` severity
- Report local and delivered readiness as two separate fields; one blended field is a `blended-status` finding

---

## Agent-Platform Readiness

The separately loadable [Agent-Platform Readiness module](./prd-tad-adr-readiness.md) owns the three readiness dimensions, their tiers, the execution order, the Invocation Surface Contract, the readiness gap matrix, and the follow-on document template. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Name which dimensions are in scope; an unqualified "agent-ready" claim is unverifiable
- Keep every discovery and read route at zero token cost; a non-zero cost on a read route is a `paid-read-path` finding
- Declare every `/`, `#`, `@`, and tool-identity route in exactly one Invocation Register; a route declared nowhere is an `orphan-route` and one declared twice is an `ambiguous-route`

---

## Lane Topology & Deploy Boundary

The separately loadable [Lane Topology & Deploy Boundary module](./prd-tad-adr-readiness.md) owns the canonical lane sequence, the four required parts of every boundary, and the closed-by-default promotion rule. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Document all three lanes and every boundary before the first promotion; a missing lane is a `missing-lane` finding at `blocker` severity
- Keep every Deploy Boundary `closed` absent a referenced operator instruction; an unrecorded promotion is an `ungated-promotion`
- Forbid any authoring-lane command that mutates a mirror or delivery surface; such a command is a `deploy-boundary-breach` at `blocker` severity

---

## Autonomous Implementation Verification

The separately loadable [Autonomous Implementation Verification module](./prd-tad-adr-verification.md) owns the VCC primitive, the criterion-to-condition pipeline, evaluator independence, the Evidence Reference, the traceability extension, and the closure rules. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Express every acceptance criterion as a VCC with one measurable end state, a stated check, and its constraints; a criterion that cannot be demonstrated from surfaced output is not testable
- Attach an Evidence Reference — named invocable check, recorded result, surface — to every satisfied VCC; a named check with no recorded result cannot raise a rung
- Keep the Evaluator a distinct mechanism from the implementer; a self-graded verdict is not a verdict

---

## CID Directive Matrix

The separately loadable [CID Directive Matrix module](./prd-tad-adr-cid-matrix.md) owns the alphabetical Context/Intent/Directive mantras covering every concern in this set. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Use the matrix as the lookup surface for a concern's directive; it summarises obligations owned by the sections named in the Module Index and adds none of its own

---

## Core Templates

The separately loadable [Core Templates module](./prd-tad-adr-templates.md) owns the copy-ready PRD, TAD, and ADR template bodies, including the component inventory, Diagram Register, and Deploy Boundary Register. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Instantiate the templates rather than reinventing their fields; a template field exists because a rule in this set requires the artifact it names
- Keep every template field that carries a conformance obligation — rungs, Evidence References, VCCs, token budget, TCO per deployment model, boundary state; dropping one silently removes the check that reads it

---

## Platform-Specific Selection Criteria (TOPSIS)

The separately loadable [Selection Criteria module](./prd-tad-adr-selection-criteria.md) owns the full scoring worksheet, normalization procedure, and worked examples. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Score any platform-, vendor-, or provider-level candidate against a project-stated, explicitly weighted criteria set using TOPSIS (Technique for Order of Preference by Similarity to Ideal Solution) or an equivalent auditable multi-criteria ranking method; a candidate selected without a stated criteria set and weights is a `vendor-preference-unscored` finding at `major` severity
- Derive the criteria set from the product's own governing constraints — its economics, deployment model, deployment platform, offline/edge posture, and AI-native compute/token/embedding needs — never from a candidate's own marketing or feature list; a criteria set that happens to match exactly one vendor's differentiators is a `vendor-coupling` finding under Scope & Neutrality
- State each criterion's weight, and every candidate's normalized score, distance to the ideal and negative-ideal solution (or the equivalent intermediate step in a substituted method), and closeness coefficient; a ranking presented without these intermediate values is unauditable and is a `selection-criteria-unweighted` finding at `minor` severity
- Rule a candidate out on a single named disqualifying criterion — for example, a license that fails a stated hard-gate — without requiring it to be scored on the remaining criteria; name the disqualifying criterion explicitly rather than reporting an aggregate low score
- Label the outcome by its criteria derivation, never by preference: a write-up that names a winning candidate without showing the criteria, weights, and scores that produced it is a `vendor-preference-unscored` finding regardless of whether the ranking itself was sound
- Present illustrative criteria and candidates only under a heading or block whose own text contains the words "reference implementation," per the Scope & Neutrality Contract; a criteria checklist or candidate list naming real vendors outside such a label is a `vendor-coupling` finding

**Reference implementation** — an illustrative criteria checklist for an AI-native, edge-native, solo-dev product (any project instantiates its own set; this one is not universal): AI-native fit (embedding/vector and agentic-workload support), total cost of ownership, zero-infra posture, primary-deployment-platform fit, browser-based delivery, mobile-first delivery, on-device/edge execution, local-first data ownership, offline-first operation, token performance and economics, FOSS license compliance, min-viable-max-value, time-to-value, and ROI. A project's "primary-platform fit" criterion names whichever platform that project has already adopted as primary (for example, a specific cloud/edge provider) as a reference implementation of the general criterion — the criterion itself, not the named platform, is what every future ADR in that project's set re-applies.

---

## Pain-Point-to-Feature Mapping

The separately loadable [Pain-Point Mapping module](./prd-tad-adr-pain-point-mapping.md) owns the fixed six-field card form and its authoring procedure. This section owns only the obligations that bind a PRD directly.

**Directives**:
- Trace every `Must`-priority feature to exactly one named pain point stated as: pain point, hook, break, fix, close, and a min-time-resource-max-value note; a feature with no traceable pain point is unscoped, not merely under-documented
- State the min-time-resource-max-value note as an explicit reuse-or-build split against components named in Division of Work; forbid presenting a fix as net-new when an existing capability already covers it
- Label a pain point `unvalidated` until it carries a named evidence reference (a user quote, a ticket, a measured drop-off), and label it `demand-proven` only when that evidence is a real paying customer — a signed pilot, an active subscription, a completed transaction — rather than expressed interest; an `unvalidated` pain point still backing a `Must` feature at baseline sign-off is a `pain-point-not-validated` finding at `major` severity
- Rank competing fixes for the same pain point by proximity to what is already built — zero-code-change configuration first, minimal-code-change extension of an existing component second, net-new build last — before weighing any other feasibility factor; a fix ranked above a lower-cost equivalent with no stated reason is a `roadmap-order-unexplained` finding
- Forbid a hook or close that implies a capability the fix does not have; both restate the pain point, they do not extend the claim beyond it

---

## Demo Skeleton

The separately loadable [Demo Skeleton module](./prd-tad-adr-demo-skeleton.md) owns the beat catalog and timing conventions. This section owns only the obligations that bind a PRD directly.

**Directives**:
- Require a fixed, time-boxed beat table — Hook, Probe, Reveal, `[domain action]`, Close — for every feature claiming `Must` priority or a Domain-Object Rubric rung of L3 or above; a beat with no stated time bound is a `missing-demo-beat` finding
- Bound total demonstration time to the budget stated in the feature entry; forbid beats whose stated durations sum past that budget
- Anchor the Reveal beat to the feature's own VCC — the instant the demo shows the acceptance condition holding, not a narrated claim of it
- Name the `[domain action]` beat by the product's own interaction (approve, swipe, confirm, sign); forbid a skeleton hardcoded to one input device or channel

---

## Domain-Object Rubric Assessment

The separately loadable [Domain-Object Rubric module](./prd-tad-adr-domain-object-rubric.md) owns the leveled rubric catalog and scoring procedure. This section owns only the obligations that bind a PRD or TAD directly.

**Directives**:
- Identify the product's actual domain object before applying any external leveled capability rubric; forbid scoring against a rubric's supplied example object when the product's own domain object is structurally different
- Report the rubric level as the lowest level not yet cleared, not the highest level partially attempted; a self-assessment reporting an aspirational level while a lower level's named prerequisite is absent is an `overclaimed-rubric-level` finding at `major` severity
- Name the specific blocking component for every unclaimed rung between the current and target level; an unclaimed rung with no stated blocker is an `unresolved-rubric-gap` finding
- Permit closing a rubric gap by reusing an existing capability from another artifact in this set; require an explicit cross-artifact reference per Division of Work rather than a silent re-implementation

---

## Roadmap

The separately loadable [Roadmap module](./prd-tad-adr-roadmap.md) owns the phase-table template and sequencing procedure. This section owns only the obligations that bind a PRD or TAD directly.

**Directives**:
- State, for every roadmap phase: the feature, what it reuses (naming the specific existing component or artifact), what is genuinely new, and a priority rationale; a phase with an empty reuse statement and no stated justification is a `roadmap-reuse-unstated` finding
- Order phases by reuse-adjusted build cost, not solely by an external rubric's nominal difficulty order; state any divergence from that nominal order explicitly, or record it as a `roadmap-order-unexplained` finding
- Gate a later phase on an earlier phase's named prerequisite component wherever one exists; the gate must be stated, not merely honored by coincidence
- Mark a deliberately deferred, real idea `Won't (this increment)` rather than omitting it; an omitted-but-known idea is a `roadmap-scope-silently-dropped` finding

---

## Monetization

The separately loadable [Monetization module](./prd-tad-adr-monetization.md) owns the stream-labelling procedure and validation-action catalog. This section owns only the obligations that bind a PRD directly.

**Directives**:
- Label every monetization stream exactly one of `mechanism-proven` (the pricing/settlement logic works against test data) or `demand-validated` (a named customer segment has indicated willingness to pay, or has paid); presenting `mechanism-proven` as `demand-validated` is a `monetization-demand-unvalidated` finding at `major` severity
- Select the nearest-term stream by which customer segment already exists in the current phase, not by which stream is technically simplest; a stream requiring a segment gated behind a later phase is `Should`/`Could` at best until that segment exists, never `Must`
- Order every viable stream by its distance to a real first dollar — the fewest unvalidated assumptions and the least unbuilt infrastructure between today and one paying transaction — and state that ordering explicitly; a monetization section that proposes multiple streams without ranking them by time-to-first-dollar is a `monetization-demand-unvalidated` finding
- Require a stated validation action — a customer conversation, a priced pilot, real signups — before using the `demand-validated` label
- Forbid deferring a monetization decision without stating the deferral explicitly; an undocumented default-to-free stance forecloses the test of whether a real payer exists

---

## Architecture Diagram Standards

**A declarative, text-authored diagram notation is the mandatory diagram format.** Diagrams are source, not images: the notation block is what agents load, reviewers diff, and checks parse.

The diagram domain is owned by a three-module companion set, and this section states only the obligations that bind a PRD or TAD directly:

| Module | Owns |
|---|---|
| [Diagram Guidelines](./prd-tad-adr-diagram-guidelines.companion.md) | Diagram identity, the closed class catalog, class selection, notation rules, the labelling contract, complexity budget, render reach, versioning and drift, and the diagram-domain finding vocabulary |
| [Diagram Canvas-Render Contract](./prd-tad-adr-diagram-canvas-render.companion.md) | Render-target declaration, ingest surfaces, the graph element contract, convertibility, projection rules, and the canvas-domain finding vocabulary |
| [Diagram Templates](./prd-tad-adr-diagram-templates.companion.md) | Copy-ready, portable-intersection template bodies per class |

**Directives**:
- Author every diagram in the mandated notation and keep the source block present; forbid ASCII art for any diagram exceeding 5 nodes and forbid a rendered image as a diagram's only representation
- Give every diagram an ID, a declared class, a caption, and an accompanying inventory table; the diagram companion owns the full identity contract, and a diagram missing any part is raisable there
- Render each of the five Flow Patterns and the Lane Topology as its bound diagram class; the class-to-pattern binding is the diagram companion's
- Retain plain code blocks — not diagrams — for schemas, API payloads, and configuration examples
- Declare a target render surface and satisfy the Canvas-Render Contract wherever a diagram must also project into a graph canvas surface; a canvas-renderable claim requires recorded projected element counts, not a visual check
- Discharge the diagram-domain and canvas-domain gates alongside this set's Alignment Gate; the conformance vocabulary is the union of the authoring, execution, diagram, and canvas enumerations

**Token Economics**: the mandated notation reduces LLM context token consumption ~70–85% vs equivalent ASCII art, while providing auto-layout, platform-native rendering, and structured parseability. Diagram source cost is a line item in the authoring loop's token budget, per the Guideline Load Budget.

---

## PRD ↔ TAD Integration

### Separation of Concerns
- PRD describes **WHAT** and **WHY**: user value, business logic
- TAD describes **HOW**: technical approach, architecture
- Forbid implementation details in PRDs; forbid business logic in TADs
- **Boundary**: PRD stops at acceptance criteria; TAD starts at architectural approach

### Traceability Pattern
```
PRD-[Epic-ID]-[Story-ID] ↔ TAD-[Component-ID]-[Interface-ID] ↔ VCC [condition] ↔ Evidence Reference [check + result]
```

The chain is bidirectional and must close in both directions. A link that resolves one way only is a defect with a named Finding Type — see Closure Rules in Autonomous Implementation Verification.

### Iterative Refinement

**Max iterations**: 3 alignment cycles | **Circuit-breaker**: no reduction in open `blocker` findings between two consecutive cycles

1. The authoring function drafts the PRD from user research
2. The architecture function reviews the PRD for feasibility → drafts the TAD
3. The authoring function validates the TAD preserves user value
4. Run the alignment check; if `blocker` findings remain and the circuit-breaker has not tripped, repeat from step 2
5. On reaching the max-iteration bound or tripping the circuit-breaker, stop and escalate the unresolved findings as an explicit scope or design decision; forbid continuing to iterate past the bound

---

## Anti-Pattern Guards

The separately loadable [Anti-Pattern Guards module](./prd-tad-adr-cid-matrix.md) owns the prohibited patterns and their corrections, stated as paired guards. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Read each guard as the prose form of a typed finding; a guard with no corresponding Finding Type cannot be recorded, compared, or regression-tracked

---

## Conformance Findings

The separately loadable [Conformance Findings module](./prd-tad-adr-verification.md) owns the recording contract, severity assignment, the authoring-domain type enumeration, and the check determinism properties. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Record every finding with all six fields and anchor it to a Rule ID, not a section anchor alone
- Treat that enumeration as the single source of truth for **authoring-domain** finding names; forbid either set redefining a type the other owns, because the conformance vocabulary is the union of the authoring, execution, diagram, and canvas enumerations
- Report a zero count for every type with no finding; an omitted row is indistinguishable from an unchecked rule
- Satisfy every determinism property before comparing two runs: deterministic, order-independent, additive, bounded, comparable, and complete on degraded input

### Finding Enumeration

*The published authoring-domain vocabulary. The module owns the recording procedure; this table is the interface other documents and checks read.*

| Rule family | Finding Type | Severity |
|---|---|---|
| Frontmatter | `missing-frontmatter-key` | `minor` |
| Frontmatter | `malformed-document` | `major` |
| Readiness Ladder | `unknown-status` | `minor` |
| Readiness Ladder | `unproven-claim` | `blocker` |
| Readiness Ladder | `blended-status` | `minor` |
| Traceability closure | `unimplemented-guideline` | `major` |
| Traceability closure | `unguided-artifact` | `minor` |
| Traceability closure | `unresolvable-reference` | `major` |
| Traceability closure | `stale-evidence` | `major` |
| Traceability closure | `missing-companion` | `major` |
| Ownership | `duplicate-owner` | `major` |
| Ownership | `status-conflict` | `major` |
| Phase gates | `gate-order-drift` | `major` |
| Phase gates | `gate-sequence-violation` | `major` |
| Scope & neutrality | `vendor-coupling` | `major` |
| Scope & neutrality | `path-derived-claim` | `major` |
| Scope & neutrality | `non-modular-section` | `minor` |
| Economics | `missing-economics-metric` | `major` |
| Economics | `blended-deployment-tco` | `major` |
| Economics | `missing-foss-comparison` | `major` |
| Economics | `unbounded-loop` | `blocker` |
| Economics | `paid-read-path` | `major` |
| Delivery reach | `incomplete-delivery-reach` | `major` |
| Invocation surface | `orphan-route` | `major` |
| Invocation surface | `ambiguous-route` | `major` |
| Invocation surface | `unfederated-tool` | `major` |
| Invocation surface | `uncatalogued-tool` | `major` |
| Lane topology | `missing-lane` | `blocker` |
| Lane topology | `incomplete-lane-transition` | `major` |
| Lane topology | `deploy-boundary-breach` | `blocker` |
| Lane topology | `ungated-promotion` | `blocker` |
| Topology | `incomplete-topology-node` | `major` |
| Product-Market Fit | `pain-point-not-validated` | `major` |
| Demonstration | `missing-demo-beat` | `minor` |
| Domain-Object Rubric | `overclaimed-rubric-level` | `major` |
| Domain-Object Rubric | `unresolved-rubric-gap` | `minor` |
| Roadmap | `roadmap-reuse-unstated` | `major` |
| Roadmap | `roadmap-order-unexplained` | `minor` |
| Roadmap | `roadmap-scope-silently-dropped` | `minor` |
| Platform Selection | `vendor-preference-unscored` | `major` |
| Platform Selection | `selection-criteria-unweighted` | `minor` |
| Monetization | `monetization-demand-unvalidated` | `major` |
| Division of Work | `duplicate-capability-owner` | `major` |
| Division of Work | `component-origin-unstated` | `minor` |
| Division of Work | `unjustified-storage-duplication` | `major` |

---

## Validation Checklist

The separately loadable [Validation Checklist module](./prd-tad-adr-verification.md) owns the pre-implementation, post-documentation, and alignment-gate checklists, each item mapped to a Finding Type. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Require current artifact continuity before baseline sign-off: CID-to-RAO coverage, companion joins, artifact revisions, independent evidence, demonstration references, and successor references must satisfy the Artifact Continuity Module
- Discharge the alignment gate before baseline sign-off; zero `blocker` findings is the exit condition, and `major` and `minor` findings are resolved or formally tracked with an owner
- Compare the finding set against the prior run on every baselined change; a new `blocker` is a regression, not a note

---

## Division of Work

The separately loadable [Division of Work module](./prd-tad-adr-division-of-work.md) owns the capability-ownership procedure and the reuse-decision record form. This section owns only the obligations that bind a TAD or ADR directly, and extends Role—Action—Outcome from roles-to-documents into components-to-capabilities.

**Directives**:
- Assign exactly one owning component per capability (a pricing computation, a state-change detection, a ledger mutation); every other consumer calls the owning component rather than re-implementing its logic; a second implementation of an existing capability is a `duplicate-capability-owner` finding at `major` severity, extending `duplicate-owner` from document ownership to component ownership
- Record an explicit reuse-or-new decision, as an ADR or equivalent, for every component added to an architecture; a component with neither a stated reuse rationale nor a stated new-dependency rationale is a `component-origin-unstated` finding
- Prefer extending an existing store, function, or ledger with a new dimension (a flag, a field, a row type) over introducing a second one for structurally identical data; an unjustified second store is an `unjustified-storage-duplication` finding at `major` severity
- Permit cross-artifact reuse on the same terms as within-artifact reuse; require the consuming artifact to name the exact owning artifact and its version, not merely describe the capability in its own words

---

## Role—Action—Outcome

**Product Manager** → defines user problems, maps user journeys, writes stories and acceptance criteria, prioritizes via MoSCoW, defines success metrics → produces user-centric PRDs enabling valuable feature delivery

**System Architect** → designs component interactions, maps data flows, specifies interfaces, documents ADRs, defines quality attributes, plans deployment → establishes technical foundation enabling scalable implementation

**Solo Founder / AI Orchestrator** *(collapses all **authoring** roles in a solo-dev context; does not collapse the Evaluator)* → validates ROI before writing any doc, applies min-viable-max-value lens to MoSCoW, designs harness contracts for every AI component, sets token budgets, maintains FOSS-first ADRs, tracks TCO actuals each sprint → ships high-ROI features at near-zero infrastructure cost while keeping the codebase auditable and the AI pipelines observable

**Evaluator** *(a mechanism, never a person; the one role that must not collapse into any other)* → judges each VCC against the surfaced output only, records the Evidence Reference, derives the readiness rung, and emits the finding set with types and severities → produces verdicts no participant can self-grade, which is what makes a rung and an alignment claim trustworthy. See the Agentic SDLC Guidelines companion set for how this role is instantiated and bounded during execution.

**UX Designer** → creates personas, maps user journeys, validates usability requirements, provides design guidance → ensures user-centered design principles guide feature development

**Engineering Lead** → reviews TAD feasibility, validates architectural patterns, identifies technical risks, suggests alternatives → ensures technical approach is implementable and maintainable

**QA Engineer** → validates testability of acceptance criteria, creates test plans from PRD, defines automation strategy → ensures requirements are verifiable and quality is measurable

**Technical Writer** → structures documents, maintains templates, ensures consistency, tracks versions, manages traceability → maintains clear documentation supporting team alignment

**Stakeholder** → provides business context, validates user problems, reviews requirements, approves scope → ensures product development aligns with business objectives

---

## Mantra Application

**"CID frames PRD/TAD standards · Flow patterns anchor stories to reality · Agent-platform readiness sequences Must before Follow-on · Pain points ground every feature · Demo skeletons prove the story in one sitting · Domain-object rubrics name the breakthrough honestly · Roadmaps sequence reuse before invention · Monetization tests a real payer before it tests a mechanism · RAO aligns team responsibilities · Division of work gives each capability exactly one owner · SVO clarifies requirement semantics · VCC closes the loop from criterion to verified implementation · Evidence earns the rung · Findings make the rules checkable · Boundaries stay closed until an operator opens them"**

- **CID frames**: establishes scope (product + technical), purpose (user value + clarity), rules (problem-first · domain-agnostic · traceable)
- **Flow patterns anchor**: user journeys, workflows, data flows, orchestration/harness flows, and topology connect abstract requirements to observable system behavior; every feature traces through all five; time-to-value is the gate metric that validates the shortest path through them
- **Agent-platform readiness sequences**: Agentic OS visibility → AI Agent discovery → Gateway federation (Must); then spend safety → live orchestration proof → operator UI (Follow-on); forbid proxy duplication and dependency-blind parallel surface work
- **Pain points ground**: every `Must` feature traces to one named pain point in fixed form, labelled `unvalidated` until an evidence reference exists — a feature with no pain point is unscoped, not merely under-documented
- **Demo skeletons prove**: a fixed, time-boxed beat table anchors the Reveal beat to the feature's own VCC, so the demonstration shows the acceptance condition holding rather than narrating a claim of it
- **Domain-object rubrics name**: the product's actual domain object is identified before any external rubric is applied, and the reported level is the lowest not yet cleared — never the highest aspired to
- **Roadmaps sequence**: phases order by reuse-adjusted build cost, each stating what it reuses and what is genuinely new; a real, deferred idea is marked `Won't (this increment)`, never silently dropped
- **Monetization tests**: a stream is `mechanism-proven` or `demand-validated`, never presented as one when it is only the other, and the nearest-term stream is chosen by which customer segment already exists, not by which mechanism is simplest to build
- **RAO aligns**: maps each role to documentation deliverables with clear accountability and measurable outcomes
- **Division of work**: assigns exactly one owning component per capability, extending RAO from roles-to-documents into components-to-capabilities — every other consumer calls the owner rather than re-implementing it
- **SVO (Subject-Verb-Object) clarifies**: expresses all requirements with grammatical precision — users accomplish tasks → systems process data → components deliver artifacts — enabling unambiguous implementation
- **Evidence earns**: a readiness rung is computed from named checks with recorded results, never asserted; the ladder is monotone under added evidence, so status can only be raised by proof
- **Findings make checkable**: every prohibition carries a type and a severity, so alignment is a comparable measurement across runs rather than an impression that resets each review
- **Boundaries stay closed**: promotion toward a public surface requires a named gate, its evidence, its rollback path, and a referenced operator instruction; the default state is closed, so nothing reaches the delivery lane by momentum
- **VCC closes**: every acceptance criterion becomes an evaluable completion condition (mechanism-agnostic); the traceability chain extends from PRD through TAD to autonomous implementation verification