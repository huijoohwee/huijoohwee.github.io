---
title: "PRD, TAD & ADR Guidelines"
doc_type: "Guidelines"
version: "2.4.0"
date: "2026-09-05"
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

# PRD, TAD & ADR Guidelines

## Scope & Neutrality Contract

- **Universal**: these guidelines apply to any product, domain, language, or runtime; nothing here assumes a specific company, repository, file path, framework, or vendor.
- **Neutral**: name capabilities and roles by their function, never by a brand. Where a concrete tool is shown, it appears only as a non-binding *reference implementation* and may be swapped for any equivalent. Every brand, product, or vendor name must sit under a heading or block whose own text contains the words "reference implementation"; a brand named outside such a label is a `vendor-coupling` finding regardless of surrounding intent.
- **Agnosticity**: requirements are derived from document content and parsed frontmatter only — never from file names, directory layout, or downstream mirrors. Examples use placeholders (`[...]`) rather than real identifiers.
- **Simple**: a rule earns its place by being checkable and load-bearing. Ceremony, Complication, Verbosity, and Clutter are named anti-patterns of the Directive Grammar (CID) Density Rules and apply at document scope as much as directive scope; a rule stateable in fewer words with no loss of observable consequence, and left unstated that way, is a `cid-density-violation` finding. Clutter is the artifact-scope case specifically: an unreferenced template field, an orphaned finding type, or a stale example carried past the rule that produced it, with no consumer left to read it, is a `cid-density-violation` finding at the artifact it clutters, not only at the rule that authored it.
- **Autonomous**: a rule or dispatched directive — human-, LLM-, or agent-authored — is completable by its named role using only the checks, evidence, and grounding this set defines, with no synchronous, unstated manual approval standing between dispatch and outcome; a directive whose completion silently depends on an unnamed human gate outside the stated Deploy Boundary or Evaluator path is a `human-gate-unstated` finding. Lane Topology & Deploy Boundary's closed-by-default rule is this principle's own promotion instance: the gate is named and evidenced, never a silent hold.
- **Modular**: each `##` section is self-contained and addressable by its heading anchor (see Module Index). Sections may be lifted into another guideline set without rewriting their internals.
- **Reusable**: extend or reference an existing rule, template, finding type, or component before authoring a new one. A newly authored rule that restates an existing rule's observable consequence without extending it is a `non-modular-section` finding.
- **Interoperable**: every module's inputs and outputs — frontmatter keys, Rule IDs, Finding Types, continuity IDs — are declared once and consumed by exact name across the set. A module that reads or writes an undeclared key is an `unresolvable-reference` finding.
- **Portable**: a module's own text carries what it needs to be lifted into another guideline set, with no hidden dependency on this document's line numbers, file path, or heading order beyond the anchors it explicitly names. An anchor-order dependency is a `non-modular-section` finding.
- **Coherent**: PRD, TAD, and ADR share exactly one CID/RAO/SVO schema (Directive Grammar (CID)) and one Finding Type enumeration (Conformance Findings). A document in this set that defines a competing schema or a parallel vocabulary is a `cid-schema-noncompliant` finding regardless of artifact type.
- **Enforceable**: every rule in this set is written so a conformance check can record a typed finding against it (see Conformance Findings). A statement that cannot be violated observably is guidance, not a rule, and is labelled as such.

---

## Module Index

- `scope--neutrality-contract` — universality, neutrality, agnosticity, simplicity, autonomy, modularity, reusability, interoperability, portability, coherence, enforceability rules
- `rule-identity--classification` — stable rule addressing and the artifact-bearing vs advisory split
- `markdown-yaml-frontmatter-enforcement` — authoring contract for frontmatter SSOT, including concurrency provenance keys
- `overview` — what PRD/TAD are, the governing standards, and the ADLC/MCP-/WebMCP-native operating posture
- `solo-operator-ai-native-orientation` — binding lens, harness, and bound obligations -> [Economics & Time-to-Value](./prd-tad-adr-economics.md)
- `directive-grammar-cid` — shared CID/RAO/SVO message fields, decomposition, grounding, and budgets -> [CID Guidelines](./cid-guidelines.md#shared-field-contract)
- `artifact-continuity-authoring-seam` — PRD/TAD/ADR CID ownership, codebase grounding, revision joins, RAO grounding, and execution handoff
- `concurrent-collaboration--work-tree-integrity` — multi-device, multi-LLM, multi-agent, multi-work-tree obligations -> [Cloud-Authoritative Collaboration](./adlc-cloud-collaboration.md)
- `from-0-to-1-prd--tad-creation-process` — binding gate order -> [Process & Flow Patterns](./prd-tad-adr-process-flows.md)
- `flow-patterns` — binding five-pattern coverage -> [Process & Flow Patterns](./prd-tad-adr-process-flows.md)
- `time-to-value` — binding TTV metric obligation -> [Economics & Time-to-Value](./prd-tad-adr-economics.md)
- `readiness-ladder` — binding status vocabulary -> [Readiness & Lane Topology](./prd-tad-adr-readiness.md)
- `agent-platform-readiness` — binding dimension and route obligations -> [Readiness & Lane Topology](./prd-tad-adr-readiness.md)
- `lane-topology--deploy-boundary` — binding closed-by-default rule -> [Readiness & Lane Topology](./prd-tad-adr-readiness.md)
- `autonomous-implementation-verification` — binding VCC and Evidence obligations -> [Verification & Conformance](./prd-tad-adr-verification.md)
- `cid-directive-matrix` — lookup surface -> [CID Directive Matrix](./prd-tad-adr-cid-matrix.md)
- `core-templates` — binding template-field obligations -> [Core Templates](./prd-tad-adr-templates.md)
- [Selection Criteria](#platform-specific-selection-criteria--multi-agent-reasoning-pipeline) — bounded Constraints ↔ Argumentation ↔ Outranking for platform/vendor/provider choices
- [Pain-Point Mapping](#pain-point-to-feature-mapping) — pain-point-to-feature traceability
- [Demo Skeleton](#demo-skeleton) — bounded demonstration of the acceptance condition
- [Domain-Object Rubric](#domain-object-rubric-assessment) — evidence-based capability assessment
- [Roadmap](#roadmap) — phased reuse and delta sequencing
- [Monetization](#monetization) — payer validation and revenue evidence
- `architecture-diagram-standards` — diagram format obligations, and the seam to the diagram companion set
- [Diagram Guidelines](./prd-tad-adr-diagram-guidelines.companion.md) — diagram identity, class catalog, notation, labelling, complexity, drift, diagram-domain findings
- [Diagram Canvas-Render Contract](./prd-tad-adr-diagram-canvas-render.companion.md) — surface declaration, ingest surfaces, graph element contract, projection rules, canvas-domain findings
- [Diagram Templates](./prd-tad-adr-diagram-templates.companion.md) — copy-ready, portable-intersection templates per class
- `prd--tad-integration` — separation of concerns, traceability, and closure rules
- `anti-pattern-guards` — prohibited patterns -> [CID Directive Matrix](./prd-tad-adr-cid-matrix.md)
- `conformance-findings` — binding recording contract -> [Verification & Conformance](./prd-tad-adr-verification.md)
- `validation-checklist` — binding alignment gate -> [Verification & Conformance](./prd-tad-adr-verification.md)
- [Division of Work](#division-of-work) — one capability owner and reuse decisions across concurrent worktrees
- `roleactionoutcome` — role-to-deliverable mapping
- `mantra-application` — the framing mantra

**Modular set**: load the bindings and named owners needed for the current phase. Every file stays under 600 lines; a compact protocol may live in its owning section, while larger protocols remain separately loadable. Do not copy a companion's rules into this index or require the entire set for one bounded action.

**Companion sets**: this document owns authoring. [ADLC Guidelines](./adlc-guidelines.md) own execution; [Cloud-Authoritative Collaboration](./adlc-cloud-collaboration.md) and [Scoped Lane Admission](./adlc-scoped-lane-admission.md) own concurrency. The three diagram companions own their domain. Consume each owner at its seam; the conformance vocabulary is the union of their enumerations.

**Continuity companion**: the [Artifact Continuity Module](./adlc-artifact-continuity.md) owns the universal CID-to-RAO seam, companion-artifact joins, outcome evidence, revision freshness, and successor feedback. This authoring set supplies its PRD, TAD, and ADR inputs; it does not redefine the continuity vocabulary.

**Message envelope companion**: [CID Guidelines](./cid-guidelines.md#shared-field-contract) own the shared Context/Intent/Directive, Role/Action/Outcome, and Subject/Verb/Object contract. PRD, TAD, ADR, and cross-agent dispatch consume its grounding, composition, clarification, density, and budget rules; compact prose and exact references may carry fields without copying a full form.

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
| `worktree_id` | One stable identifier for the work tree that produced this revision (spans one device or many in sync) | Concurrent Collaboration & Work-Tree Integrity, `worktree-provenance-missing` |
| `agent_id` | One stable identifier for the authoring agent or session — human or LLM | Concurrent Collaboration & Work-Tree Integrity, `worktree-provenance-missing` |

- Declare exactly one `owner` per document; two documents claiming ownership of one contract is a `duplicate-owner` finding, and a document with no `owner` cannot be assigned a rung
- Keep `local_rung` and `delivered_rung` as two separate keys; a single blended `status` key is a `blended-status` finding
- Treat every conformance key as derived where a derivation exists: `local_rung` and `delivered_rung` are computed from Evidence References and written back, never authored ahead of the evidence
- Carry `worktree_id` and `agent_id` on every revision authored under concurrent multi-device, multi-agent, or multi-work-tree conditions; a revision missing either where more than one work tree is active on the same document is a `worktree-provenance-missing` finding

---

## Overview

**Product Requirements Documentation (PRD)**: defines user value propositions, specifies acceptance criteria, prioritizes features systematically, aligns stakeholders, validates assumptions iteratively, and maintains bidirectional traceability.

**Technical Architecture Documentation (TAD)**: designs component interactions, specifies integration contracts, documents decision rationale, establishes quality attributes, defines deployment strategies, and traces requirements to implementation.

**Governing standards**: structure documents with user-centric narratives; design architectures with domain-agnostic patterns; specify measurable outcomes; maintain requirement-to-implementation traceability; apply iterative refinement; separate concerns systematically.

**Enforceability**: these standards are written to be checked, not only read. Each rule is phrased so a violation is observable, each violation has a name and a severity (see Conformance Findings), each readiness claim is a value derived from recorded evidence (see Readiness Ladder), and each step toward a public surface passes a named gate that is closed by default (see Lane Topology & Deploy Boundary). A rule that cannot fail a check is guidance; this set labels the difference rather than blurring it. The apparatus exists to keep the 0-to-1 loop fast and honest — a gate earns its place by narrowing a real, previously observed failure or by shortening time-to-first-dollar; a gate that does neither is itself a `cid-density-violation`, not a virtue.

**Solo-operator AI-native orientation**: these guidelines are calibrated for a solo founder or small team operating an AI-native product stack across an Agentic Development Lifecycle (ADLC), MCP-/WebMCP-native by default, and routinely running multiple devices, multiple LLMs, multiple agents, and multiple work trees in hybrid cloud/local concurrency. Every decision is evaluated through five compounding lenses — **min-viable-max-value** (ship the smallest artifact that delivers the largest user impact), **TCO-zero** (prefer FOSS and zero-egress infrastructure; make cost a first-class architectural constraint), **token economics** (treat LLM token consumption as a measurable engineering metric at every pipeline boundary), **harness-first** (orchestrate AI capabilities through composable, observable, MCP-/WebMCP-conformant harnesses rather than ad-hoc prompt calls), and **concurrency-safe** (every artifact, directive, and merge holds under multiple simultaneous work trees, devices, and agents without deadlock, corruption, or hallucinated state). These lenses do not replace the core PRD/TAD standards — they sharpen prioritization, constrain architecture choices, and accelerate validation cycles.

**Reference implementation** — one instantiation of this orientation, non-binding per Scope & Neutrality (a project instantiating this set states its own domain here in its place): a from-0-to-1, production-runtime-ready agentic-commerce/marketplace MVP — agent-to-agent discovery, agentic payment settlement, and AI-agent economics as the domain objects (Domain-Object Rubric Assessment) — drawing architectural inspiration from Anthropic's open-source `commerce-agents` reference architecture, run end-to-end on the ADLC and federated through an MCP-/WebMCP-conformant gateway per Agent-Platform Readiness, with `/`, `#`, and `@` as its three invocable routes declared in one Invocation Register. Neither the commerce domain, the inspiring architecture, nor the three route glyphs are universal; they name this project's own choices under the label this rule requires, and every future ADR in this project's set re-applies the general criterion, not the named example.

---

## Solo Dev AI-Native Orientation

The separately loadable [Solo-Operator AI-Native Orientation module](./prd-tad-adr-economics.md) owns the five compounding lenses, the guideline load budget, the AI-native harness pattern, orchestration topology, the ROI template, the FOSS-first rule, and deployment-model TCO variants. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Evaluate every decision through the five lenses named in that module — min-viable-max-value, TCO-zero, token economics, harness-first, concurrency-safe; forbid a scope or architecture decision that names none of them
- Wrap every AI-powered component in a harness with typed input, typed output, an emitted cost log, and a stated fallback; a raw prompt call in a production pipeline is an anti-pattern guard violation
- Prefer an MCP- or WebMCP-conformant tool contract for every AI Agent discovery, invocation, and harness route, labelled as a reference implementation per Scope & Neutrality; a proprietary protocol substituted where a conformant path exists, without a stated reason, is a `vendor-coupling` finding
- Bound every agentic loop with a max-iteration count and a circuit-breaker condition; an unbounded loop is an `unbounded-loop` finding at `blocker` severity
- Separate every candidate's deployment-model variants in a TCO comparison; a blended figure is a `blended-deployment-tco` finding
- Weigh every new rule, gate, or template field against the pain-point-to-feature and monetization loops it protects; a rule that adds authoring cost without narrowing an observed failure mode or shortening time-to-first-dollar is a `cid-density-violation`

---

## Directive Grammar (CID)

PRD, TAD, ADR, and authoring-to-execution or agent-to-agent messages consume one [CID/RAO/SVO contract](./cid-guidelines.md#shared-field-contract). Its roles name functions; worktree, device, and agent identities remain provenance rather than competing role definitions. SVO expresses the same RAO action at command granularity, not a second instruction.

### Field Contract

The [shared field contract](./cid-guidelines.md#shared-field-contract) is the sole schema owner. Carry its fields explicitly or by unambiguous reference in prose, tables, or structured records; all three tiers must resolve to the same instruction. This section adds no fields or mandatory serialization.

### Sorting
Each `CID Directive Matrix` entry is organized alphabetically (A→Z) for clarity and neutrality.

**Directives**:
- Keep each directive and dispatched message resolvable against the shared Field Contract; unresolved required meaning or a competing schema is `cid-schema-noncompliant`, while an omitted duplicate form is not
- Cite `context` and `directive` against real, locatable state — a file path, a revision, a Rule ID, a command output — or state `source=unverified` explicitly, per the module's Sender Grounding contract; an uncited or silently-paraphrased citation is a `cid-context-uncited` finding
- Verify cited source state before consuming it, regardless of worktree, device, or LLM origin; reuse evidence bound to an unchanged immutable revision and refresh volatile facts at their consuming transition. Acting on an unverified material claim is `cid-grounding-unverified`
- Resolve ambiguity from current evidence and existing decisions first; ask one concise question only for an unresolved semantic decision, with a concrete recommendation where available. A request for mechanically derivable facts or unnecessary reconfirmation is `cid-clarification-malformed`
- Keep the three grammar tiers convergent per the Composition Rule; a `context`/`intent`/`directive` that resolves to a different instruction than its own `role`/`action`/`outcome` or `subject`/`verb`/`object` is a `cid-composition-divergence` finding
- Apply the module's Density Rules and forbid its named anti-patterns — Ceremony, Complication, Verbosity — in every directive; a violation of either is a `cid-density-violation` finding
- Decompose independently closable outcomes into bounded task nodes with dependencies and checks; reuse the same lineage across phases. Missing actionable decomposition is `cid-decomposition-missing`; a phase label alone does not require another file or agent
- Stay within the ADLC Budgets on every always-load surface this document or its companions define; a directive that grows such a surface without stating its projected byte/module delta is a `cid-budget-exceeded` finding
- Preserve stable identity and exact revision for persisted messages using the project's declared naming convention; do not require a file per decision. An ambiguous persisted identity is `cid-naming-noncompliant`

---

## Artifact Continuity Authoring Seam

The [Artifact Continuity Module](./adlc-artifact-continuity.md) owns joins and validation. PRD owns product intent, scope, criteria, and VCCs; TAD consumes that exact revision and owns structure; ADR records material decisions, alternatives, consequences, and relevant recovery. Execution consumes their joined projection as bounded RAO Steps under the shared CID contract. Decompose independently closable outcomes, not phase labels; concurrent revisions also satisfy the collaboration seam before baseline.

**Directives**:
- Declare stable continuity IDs and exact revisions across PRD, TAD, and ADR; forbid prose, filename, or co-location joins
- Give every generated PRD, TAD, or ADR a stable, collision-free locator under the project's declared naming convention; identify its role and continuity in content. A rename retains exact provenance and repaired references; a filename substituted for a continuity join is `artifact-naming-noncompliant`
- Default to one combined `PRD-TAD-ADR` document with addressable sections; split only for a stated size, ownership, or review need. An unstated split that protects no boundary is a `cid-density-violation`
- Carry the continuity ID and exact revision as the join between the `PRD`, `TAD`, and `ADR` sections whether combined in one file or split across several; a filename-based join is `artifact-naming-noncompliant` in either shape
- Before baseline, produce an embedded or linked **Codebase Grounding Record** for every externally authored, generated, or imported document (a non-native input) used as specification input, including any PRD: bind the input revision and scoped codebase revision or digest; enumerate every material current-state claim used for capability existence, ownership, reuse, dependency or interface/configuration choice, feasibility, or readiness; cite source, configuration, schema, test, or runtime-contract evidence; and disposition each claim as `confirmed`, `contradicted`, `absent`, or `unverified`. Document provenance and internal consistency are not implementation evidence, while codebase evidence never silently rewrites product intent; a missing record or unresolved claim used to justify baseline, execution, or readiness is an `unproven-claim`
- Close PRD-to-TAD coverage, TAD grounding, and applicable ADR joins before deriving RAO Steps
- Re-run Directive-to-RAO coverage and affected re-derivation after any upstream revision, including one that arrived from a different work tree
- Require joined independent evidence before satisfaction or readiness advances; forbid narrative or self-graded completion
- Reuse the Artifact Continuity Module's findings and reference projections; forbid a parallel continuity vocabulary

**Authoring-to-execution gate**: advance only with current Codebase Grounding Records, complete PRD-to-TAD and Directive-to-RAO coverage, grounded design and RAO steps, independent checks, and a recorded decision covering the scope. Correct and re-ground in the authorized authoring loop without clerical reconfirmation; unresolved product, scope, or authority choices block the affected transition. A confirmed capability gap may become planned work within that scope; it never becomes evidence of an existing capability.

---

## Concurrent Collaboration & Work-Tree Integrity

[Cloud-Authoritative Collaboration](./adlc-cloud-collaboration.md) and [Scoped Lane Admission](./adlc-scoped-lane-admission.md) own coordination across devices, LLMs, agents, and worktrees. This section applies their contracts to PRD, TAD, and ADR and forbids **deadlock**, **corruption**, **hallucination**, **drift**, and **work-tree sprawl**. **Lossless** means preserved owner-authored work and reconstructable history; reviewed intentional replacement or deletion is permitted, silent loss is not.

**Directives**:
- Carry `worktree_id` and `agent_id` on every revision per Markdown YAML Frontmatter Enforcement whenever more than one work tree is concurrently active on the same document; an unattributed revision under those conditions is a `worktree-provenance-missing` finding
- Enforce single-writer-per-capability from Division of Work across every concurrent work tree and agent, not only within one; two work trees mutating the same owning component's capability without a recorded, merged reuse decision is a `duplicate-capability-owner` finding
- Require idempotent integration by exact candidate and receipt: replay returns the recorded result without repeating effects; a replay that changes state is `merge-non-idempotent`. Dependency order remains explicit; arbitrary merges need not commute or preserve obsolete content as a union
- Preserve every owner's unintegrated work and the provenance of intentional changes; a reviewed candidate may remove replaced content while keeping evidence and continuity reconstructable. Silent overwrites, dropped concurrent work, or invented resolution are `merge-lossy`; never force a content union to manufacture preservation
- Treat any recorded state that no longer matches its governing source — a phase order, a diagram, a status vocabulary, a continuity ID, a rung — as **drift** the moment it is observed; forbid letting it stand once named, and route it through the specific Finding Type its governing section already owns (`gate-order-drift`, `diagram-spec-drift`, `status-conflict`, or the closest section-owned equivalent) rather than inventing a parallel drift vocabulary
- Forbid any lock, lease, or wait condition spanning more than one work tree or device without a stated timeout and an escalation path to the Evaluator; an unbounded cross-work-tree wait is a `deadlock-unbounded-wait` finding at `blocker` severity
- Apply Receiver Grounding (Directive Grammar (CID)) with no exception to state produced by another work tree, device, or LLM before acting on it; treat an unverified cross-origin claim as a hallucination risk, not a shortcut — proceeding on it is a `cid-grounding-unverified` finding
- Bound active agents and worktrees by declared task capacity and review cadence; reuse admitted disjoint scopes before opening another lane. Retire or clean only exact profile-selected, receipt-eligible targets; unexplained inactive lanes raise `work-tree-sprawl` without authorizing deletion
- Route every irreconcilable concurrent claim — two work trees each asserting a different `outcome` for the same directive — to the Evaluator for a binding verdict; forbid resolving such a conflict by whichever write lands last
- Treat a hybrid cloud/local topology as a deployment-model variant of one coordination protocol, never a separate one; a claim authored locally and one authored in cloud CI reconcile through the identical merge and grounding rules, with no silent preference for either origin

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
- Federate every AI Agent discovery and invocation route through an MCP- or WebMCP-conformant gateway wherever one is available, per Solo-Operator AI-Native Orientation; an agent-callable route left outside the federated gateway with no stated reason is an `unfederated-tool` finding

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
- Keep the Evaluator a distinct mechanism from the implementer, and from every work tree or agent whose output it judges; a self-graded verdict is not a verdict

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
- Keep every template field that carries a conformance obligation — rungs, Evidence References, VCCs, token budget, TCO per deployment model, boundary state, work-tree provenance; dropping one silently removes the check that reads it

---

## Platform-Specific Selection Criteria — Multi-Agent Reasoning Pipeline

This section owns the reusable **Constraints ↔ Argumentation ↔ Outranking** pipeline for platform, vendor, or provider choices. The stages name reasoning functions, not a mandatory process count or one-way workflow: constraints gate comparison first, argumentation may challenge assumptions or pairwise relations, and changed evidence reopens affected checks. Keep one compact decision record with source evidence, constraints, comparisons, contested arguments, and an independent verdict; separate agents only where they contribute independent reasoning or evaluation. Single scalar or distance-to-ideal scoring cannot replace hard constraints or the recorded comparison relation.

### Stage 1 — Constraints

A gating pass, run before any comparison: every candidate is disposed `pass` or `fail-<named-constraint>` against the project's stated non-negotiable requirements (a license, a deployment model, an offline-capability floor). A `fail` candidate is named and excluded; it is never scored further.

**Directives**:
- State every disqualifying constraint explicitly before comparing any candidate; a candidate carried into outranking without a recorded `pass` disposition against every stated constraint is a `constraint-gate-skipped` finding at `major` severity
- Record disposition per candidate, not an aggregate score; naming a losing candidate's low overall score in place of its specific failed constraint is a `vendor-preference-unscored` finding
- Derive constraints from the product's own governing requirements — economics, deployment model, deployment platform, offline/edge posture, AI-native compute/token/embedding needs, license compliance — never from a candidate's own marketing or feature list; a constraint set that happens to match exactly one vendor's differentiators is a `vendor-coupling` finding under Scope & Neutrality

### Stage 2 — Outranking

Compare admitted candidates against project-stated criteria with an auditable non-compensatory relation. A simple Pareto comparison suffices when one candidate is no worse on every criterion and strictly better on at least one; use weighted concordance/discordance only when the tradeoff requires it. The result is a partial order; an unresolved pair is legitimate.

**Directives**:
- Record the criteria and supporting pairwise comparisons needed to justify the selected candidate, including concordance and discordance where the chosen method uses them; an unsupported relation is `outranking-relation-unstated`. A sole admitted candidate needs no fabricated comparison
- Preserve incomparability where the outranking relation does not resolve a pair; forbid collapsing an unresolved pair into an arbitrary total order — a forced order over an unresolved pair is an `outranking-incomparability-collapsed` finding at `minor` severity, and every pair it leaves unresolved routes to Stage 3
- Derive criteria and any weights from the governing requirements, never candidate marketing; a criteria set matching one vendor's differentiators is `vendor-coupling`

### Stage 3 — Argumentation

Route unresolved comparisons and contested assumptions to structured argumentation: a claim, its source evidence, and support/attack relations. Independent agents may test competing reasons within the same declared budget. The Evaluator, independent of the argument producers, records the accepted arguments and verdict; it may leave a choice unresolved rather than invent a winner.

**Directives**:
- Record the argument graph — claims, support/attack edges, accepted arguments — inline or by exact reference for a contested choice; compact prose or a table suffices when the relations are unambiguous. Closing a contested choice without that record is `argumentation-graph-missing`
- Require the rendering Evaluator to hold no argument of its own in the graph it adjudicates; a verdict authored by the same agent that submitted a winning argument is an `argumentation-self-graded` finding at `blocker` severity, extending Evaluator independence (Autonomous Implementation Verification) into the selection pipeline
- Attach the persisted argument graph to the selection ADR as its Evidence Reference; a selection ADR whose contested candidates carry no linked argument graph is an `unproven-claim`

**Directives (cross-stage)**:
- Label the outcome by its pipeline derivation: require constraint dispositions, pairwise evidence when alternatives survive, and an argument graph when contested. An unsupported winning choice is `vendor-preference-unscored`; record why a stage is inapplicable instead of fabricating evidence
- Reopen only affected constraints and comparisons when a cited fact changes; revising a governing requirement follows the authoring authority seam. Argumentation never waives a failed hard constraint, and no useful new evidence means no further reasoning round
- Bound the whole pipeline by the task's time, token, and iteration limits; reuse unchanged evidence and agent roles. At the bound, record the unresolved decision or select a supported in-scope alternative; preserve incomparability and continue disjoint work
- Present illustrative constraints, criteria, and candidates only under a heading or block whose own text contains the words "reference implementation," per the Scope & Neutrality Contract; a checklist or candidate list naming real vendors outside such a label is a `vendor-coupling` finding

**Reference implementation** — for a solo-operator, AI-native, MCP-/WebMCP-native, edge-native product (any project instantiates its own constraint set, criteria set, and candidates; none of this is universal): Stage 1 constraints typically include license compliance, offline/edge capability, and zero-infra posture; Stage 2 criteria typically include AI-native fit (embedding/vector and agentic-workload support), total cost of ownership, primary-deployment-platform fit, and a mobile-/web-/offline-first delivery triad — browser-based (web-first) delivery, mobile-first delivery, and offline-first operation via on-device/edge execution and local-first data ownership — scored alongside concurrency-safety under multi-device/multi-agent use, token performance and economics, min-viable-max-value, time-to-value, and ROI, with an ELECTRE- or PROMETHEE-style outranking relation; Stage 3 argumentation typically uses an abstract argumentation framework (Dung-style attack graph with grounded or preferred extension). A project's "primary-platform fit" criterion names whichever platform that project has already adopted as primary as a reference implementation of the general criterion — the criterion itself, not the named platform or method, is what every future ADR in that project's set re-applies.

---

## Pain-Point-to-Feature Mapping

This section owns the pain-point-to-feature record and its evidence requirements; embed it in the PRD or reference the exact record.

**Directives**:
- Trace every `Must`-priority feature to exactly one named pain point stated as: pain point, hook, break, fix, close, and a min-time-resource-max-value note; a feature with no traceable pain point is unscoped, not merely under-documented
- State the min-time-resource-max-value note as an explicit reuse-or-build split against components named in Division of Work; forbid presenting a fix as net-new when an existing capability already covers it
- Label a pain point `unvalidated` until a user quote, ticket, or measured behavior supports it; label it `demand-proven` only with actual paid-customer evidence. A price signal, unpaid signed pilot, or test transaction is WTP or mechanism evidence, not collected revenue; an `unvalidated` pain point backing a `Must` at baseline is `pain-point-not-validated`
- Rank competing fixes for the same pain point by proximity to what is already built — zero-code-change configuration first, minimal-code-change extension of an existing component second, net-new build last — before weighing any other feasibility factor; a fix ranked above a lower-cost equivalent with no stated reason is a `roadmap-order-unexplained` finding
- Prioritize among qualifying pain points by evidence of willingness-to-pay (WTP) magnitude — a stated price point, deal size, or committed budget — ahead of build cost or technical elegance; a `Must` ranking that inverts a recorded WTP ordering with no stated reason is a `roadmap-order-unexplained` finding, and a pain point with no WTP evidence at all cannot outrank one that has it
- Forbid a hook or close that implies a capability the fix does not have; both restate the pain point, they do not extend the claim beyond it

---

## Demo Skeleton

This section owns the bounded demonstration sequence; one compact flow may satisfy it without another document.

**Directives**:
- Require a fixed, time-boxed beat table — Hook, Probe, Reveal, `[domain action]`, Close — for every feature claiming `Must` priority or a Domain-Object Rubric rung of L3 or above; a beat with no stated time bound is a `missing-demo-beat` finding
- Bound total demonstration time to the budget stated in the feature entry; forbid beats whose stated durations sum past that budget
- Anchor the Reveal beat to the feature's own VCC — the instant the demo shows the acceptance condition holding, not a narrated claim of it
- Name the `[domain action]` beat by the product's own interaction (approve, swipe, confirm, sign); forbid a skeleton hardcoded to one input device or channel

---

## Domain-Object Rubric Assessment

This section owns rubric assessment. When using a rubric, the PRD or TAD declares or cites its exact levels and named acceptance checks; no universal domain object or external catalog is implied.

**Directives**:
- Identify the product's actual domain object before applying any external leveled capability rubric; forbid scoring against a rubric's supplied example object when the product's own domain object is structurally different
- Report the attained rubric level as the highest contiguous level whose checks pass, and the next unpassed level as a gap; claiming an aspirational level while a prerequisite is absent is `overclaimed-rubric-level`
- Name the specific blocking component for every unclaimed rung between the current and target level; an unclaimed rung with no stated blocker is an `unresolved-rubric-gap` finding
- Permit closing a rubric gap by reusing an existing capability from another artifact in this set; require an explicit cross-artifact reference per Division of Work rather than a silent re-implementation

---

## Roadmap

This section owns the compact roadmap: feature, current reuse, new work, priority rationale, and prerequisite per phase.

**Directives**:
- State, for every roadmap phase: the feature, what it reuses (naming the specific existing component or artifact), what is genuinely new, and a priority rationale; a phase with an empty reuse statement and no stated justification is a `roadmap-reuse-unstated` finding
- Order phases by reuse-adjusted build cost, not solely by an external rubric's nominal difficulty order; state any divergence from that nominal order explicitly, or record it as a `roadmap-order-unexplained` finding
- Gate a later phase on an earlier phase's named prerequisite component wherever one exists; the gate must be stated, not merely honored by coincidence
- Mark a deliberately deferred, real idea `Won't (this increment)` rather than omitting it; an omitted-but-known idea is a `roadmap-scope-silently-dropped` finding

---

## Monetization

This section owns monetization evidence and stream selection; reference observed customer results and distinguish them from pricing or settlement mechanism checks.

**Directives**:
- Track `mechanism-proven` (pricing/settlement works against stated test inputs) and `demand-validated` (a named segment supplies WTP evidence) independently; either may exist without the other. Record actual payment separately before claiming revenue; using a mechanism test as demand or paid evidence is `monetization-demand-unvalidated`
- Select the nearest-term stream by which customer segment already exists in the current phase, not by which stream is technically simplest; a stream requiring a segment gated behind a later phase is `Should`/`Could` at best until that segment exists, never `Must`
- Order every viable stream by its distance to a real first dollar — the fewest unvalidated assumptions and the least unbuilt infrastructure between today and one paying transaction — and state that ordering explicitly; a monetization section that proposes multiple streams without ranking them by time-to-first-dollar is a `monetization-demand-unvalidated` finding
- Require the result of a validation action — a priced customer conversation, pilot commitment, or payment — before using `demand-validated`; a planned action or unpriced signup alone is not WTP evidence
- Forbid deferring a monetization decision without stating the deferral explicitly; an undocumented default-to-free stance forecloses the test of whether a real payer exists

---

## Architecture Diagram Standards

The diagram domain is owned by the three linked companion modules: identity, classes, notation, complexity,
and diagram findings; canvas-render targets and projection; and portable template bodies.

| Module | Owns |
|---|---|
| [Diagram Guidelines](./prd-tad-adr-diagram-guidelines.companion.md) | Diagram identity, class selection, notation, labelling, complexity, render reach, versioning and drift |
| [Diagram Canvas-Render Contract](./prd-tad-adr-diagram-canvas-render.companion.md) | Render target, ingest, graph elements, convertibility, projection, and canvas findings |
| [Diagram Templates](./prd-tad-adr-diagram-templates.companion.md) | Copy-ready portable-intersection template bodies and reference examples |
| Diagram identity, class, notation, and canvas projection rules | The companion modules above are the owning source |
**Directives**:
- Keep diagram source present in the mandated notation; the companion owns class, identity, and render details.
- A diagram-bearing task must emit a projection check named by the authoring set's canvas-render contract.
- Apply the companion gates alongside this set's Alignment Gate; the vocabulary is the union of all declared domains.

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

The separately loadable [Conformance Findings module](./prd-tad-adr-verification.md) owns the recording contract,
severity assignment, authoring-domain vocabulary, and deterministic comparison. This section binds only the
module interface used by PRD, TAD, and ADR checks.

**Directives**:
- Record every finding with all six fields and anchor it to a Rule ID, not a section anchor alone.
- Treat the linked module as the single source of truth for authoring-domain finding names.
- Report zero counts for types with no finding and preserve deterministic, additive, bounded, comparable results.

## Validation Checklist

The separately loadable [Validation Checklist module](./prd-tad-adr-verification.md) owns the pre-implementation, post-documentation, and alignment-gate checklists, each item mapped to a Finding Type. This section owns only the obligations that bind a PRD, TAD, or ADR directly.

**Directives**:
- Require current artifact continuity before baseline sign-off: Codebase Grounding Records for non-native inputs, CID-to-RAO coverage, companion joins, artifact revisions, independent evidence, demonstration references, and successor references must satisfy the Artifact Continuity Module
- Require current work-tree integrity before baseline sign-off whenever more than one work tree contributed: provenance keys, merge idempotency, and zero open `deadlock-unbounded-wait` or unresolved concurrent-claim findings must satisfy Concurrent Collaboration & Work-Tree Integrity
- Discharge the alignment gate before baseline sign-off; zero `blocker` findings is the exit condition, and `major` and `minor` findings are resolved or formally tracked with an owner
- Compare the finding set against the prior run on every baselined change; a new `blocker` is a regression, not a note

---

## Division of Work

This section owns capability ownership and reuse decisions in TAD and ADR. Apply the shared RAO contract to components: the role is the capability owner, action is its transformation, and outcome is independently checked behavior. Other consumers call that owner; collaboration provenance identifies the current writer without redefining the role.

**Directives**:
- Assign exactly one owning component per capability (a pricing computation, a state-change detection, a ledger mutation); every other consumer calls the owning component rather than re-implementing its logic; a second implementation of an existing capability is a `duplicate-capability-owner` finding at `major` severity, extending `duplicate-owner` from document ownership to component ownership
- Record an explicit reuse-or-new decision, as an ADR or equivalent, for every component added to an architecture; a component with neither a stated reuse rationale nor a stated new-dependency rationale is a `component-origin-unstated` finding
- Prefer extending an existing store, function, or ledger with a new dimension (a flag, a field, a row type) over introducing a second one for structurally identical data; an unjustified second store is an `unjustified-storage-duplication` finding at `major` severity
- Permit cross-artifact reuse on the same terms as within-artifact reuse; require the consuming artifact to name the exact owning artifact and its version, not merely describe the capability in its own words

---

## Role—Action—Outcome

Each entry is the document-scope default `role`/`action`/`outcome` envelope defined in Directive Grammar (CID): the range of `action`s a directive naming this `role` typically performs, and the `outcome` category its completed directives produce. An individual directive's own `outcome` narrows this envelope; it never contradicts it. A role may be instantiated by one human, one LLM, or several LLMs across several concurrently active work trees; the envelope binds the function, not the instantiation count.

**Product Manager** → defines user problems, maps user journeys, writes stories and acceptance criteria, prioritizes via MoSCoW, defines success metrics → produces user-centric PRDs enabling valuable feature delivery

**System Architect** → designs component interactions, maps data flows, specifies interfaces, documents ADRs, defines quality attributes, plans deployment → establishes technical foundation enabling scalable implementation

**Solo Founder / AI Orchestrator** *(combines authoring roles while preserving independent evaluation)* → grounds pain and WTP, ranks reusable solutions, states resource bounds, tracks observed TCO, and keeps collaboration within declared capacity and exact cleanup policy → delivers verified user outcomes and measured economics without duplicate agents or lanes

**Evaluator** *(a mechanism, never a person; the one role that must not collapse into any other, including any work tree or agent whose output it judges)* → judges each VCC against the surfaced output only, records the Evidence Reference, derives the readiness rung, resolves irreconcilable concurrent claims, renders selection verdicts from an argumentation graph it holds no argument in, and emits the finding set with types and severities → produces verdicts no participant can self-grade, which is what makes a rung and an alignment claim trustworthy. See the ADLC Guidelines companion set for how this role is instantiated and bounded during execution.

**UX Designer** → creates personas, maps user journeys, validates usability requirements, provides design guidance → ensures user-centered design principles guide feature development

**Engineering Lead** → reviews TAD feasibility, validates architectural patterns, identifies technical risks, suggests alternatives → ensures technical approach is implementable and maintainable

**QA Engineer** → validates testability of acceptance criteria, creates test plans from PRD, defines automation strategy → ensures requirements are verifiable and quality is measurable

**Technical Writer** → structures documents, maintains templates, ensures consistency, tracks versions, manages traceability → maintains clear documentation supporting team alignment

**Stakeholder** → provides business context, validates user problems, reviews requirements, approves scope → ensures product development aligns with business objectives

---

## Mantra Application

**"CID frames PRD/TAD standards · Flow patterns anchor stories to reality · Agent-platform readiness sequences Must before Follow-on · Pain points ground every feature · Demo skeletons prove the story in one sitting · Domain-object rubrics name the breakthrough honestly · Roadmaps sequence reuse before invention · Monetization tests a real payer before it tests a mechanism · RAO aligns team responsibilities · Division of work gives each capability exactly one owner · Concurrent collaboration keeps every work tree honest without a single point of blocking · SVO clarifies requirement semantics · VCC closes the loop from criterion to verified implementation · Evidence earns the rung · Findings make the rules checkable · Boundaries stay closed until an operator opens them"**

- **CID frames**: establishes scope, user value, and traceable rules under the shared CID contract's grounding, density, and ADLC budgets
- **Flow patterns anchor**: user journeys, workflows, data flows, orchestration/harness flows, and topology connect abstract requirements to observable system behavior; every feature traces through all five; time-to-value is the gate metric that validates the shortest path through them
- **Agent-platform readiness sequences**: Agentic OS visibility → AI Agent discovery → Gateway federation (Must); then spend safety → live orchestration proof → operator UI (Follow-on); forbid proxy duplication and dependency-blind parallel surface work
- **Pain points ground**: every `Must` feature traces to one named pain point in fixed form, labelled `unvalidated` until an evidence reference exists — a feature with no pain point is unscoped, not merely under-documented
- **Demo skeletons prove**: a fixed, time-boxed beat table anchors the Reveal beat to the feature's own VCC, so the demonstration shows the acceptance condition holding rather than narrating a claim of it
- **Domain-object rubrics name**: the product's actual domain object is identified before any external rubric is applied, and the reported level is the lowest not yet cleared — never the highest aspired to
- **Roadmaps sequence**: phases order by reuse-adjusted build cost, each stating what it reuses and what is genuinely new; a real, deferred idea is marked `Won't (this increment)`, never silently dropped
- **Monetization tests**: mechanism evidence, WTP evidence, and collected revenue remain separate; prioritize an existing payer segment and the shortest credible path to its paid outcome
- **RAO aligns**: maps each role to documentation deliverables with clear accountability and measurable outcomes — the document-granularity instance of the CID `role`/`action`/`outcome` triad (Directive Grammar (CID))
- **Division of work**: assigns exactly one owning component per capability, extending the CID `role`/`action`/`outcome` triad from roles-to-documents into components-to-capabilities — every other consumer calls the owner rather than re-implementing it
- **Concurrent collaboration keeps honest**: one current writer owns an overlapping scope; exact replays are idempotent, owner work and history survive, and reviewed obsolete content may be removed. Bound waits and capacity, verify cross-origin claims, and use exact profile-selected cleanup receipts
- **SVO (Subject-Verb-Object) clarifies**: expresses the same accountable action as RAO using the shared contract; requirement prose names its actor, action, and target without creating another command schema
- **Evidence earns**: a readiness rung is computed from named checks with recorded results, never asserted; the ladder is monotone under added evidence, so status can only be raised by proof
- **Findings make checkable**: every prohibition carries a type and a severity, so alignment is a comparable measurement across runs rather than an impression that resets each review
- **Boundaries stay closed**: promotion toward a public surface requires a named gate, its evidence, its rollback path, and a referenced operator instruction; the default state is closed, so nothing reaches the delivery lane by momentum
- **VCC closes**: every acceptance criterion becomes an evaluable completion condition (mechanism-agnostic); the traceability chain extends from PRD through TAD to autonomous implementation verification
