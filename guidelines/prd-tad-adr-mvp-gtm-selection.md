---
title: "PRD, TAD & ADR Selection Criteria Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-09-21"
lang: "en-US"
frontmatter_contract: "required"
owner: "Selection pipeline contract"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "3.3.0"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# PRD, TAD & ADR Selection Criteria Module

## Scope & Ownership

This module owns the reusable **Constraints ↔ Argumentation ↔ Outranking** pipeline for platform,
vendor, provider, channel, or price choices. The stages name reasoning functions, not a mandatory
process count or one-way workflow: constraints gate comparison first, argumentation may challenge
assumptions or pairwise relations, and changed evidence reopens affected checks. Keep one compact
decision record with source evidence, constraints, comparisons, contested arguments, and an independent
verdict; separate agents only where they contribute independent reasoning or evaluation. Single scalar
or distance-to-ideal scoring cannot replace hard constraints or the recorded comparison relation.

The parent index binds a PRD, TAD, or ADR to this pipeline under
[Platform-Specific Selection Criteria](./prd-tad-adr-mvp-gtm-guidelines.md#platform-specific-selection-criteria--multi-agent-reasoning-pipeline);
this module owns the stage bodies. It inherits the parent's Scope & Neutrality Contract, Rule Identity
derivation, and finding recording contract without restating them.

---

## Stage 1 — Constraints

A gating pass, run before any comparison: every candidate is disposed `pass` or `fail-<named-constraint>` against the project's stated non-negotiable requirements (a license, a deployment model, an offline-capability floor). A `fail` candidate is named and excluded; it is never scored further.

**Directives**:
- State every disqualifying constraint explicitly before comparing any candidate; a candidate carried into outranking without a recorded `pass` disposition against every stated constraint is a `constraint-gate-skipped` finding at `major` severity
- Record disposition per candidate, not an aggregate score; naming a losing candidate's low overall score in place of its specific failed constraint is a `vendor-preference-unscored` finding
- Derive constraints from the product's own governing requirements — economics, deployment model, deployment platform, offline/edge posture, AI-native compute/token/embedding needs, license compliance — never from a candidate's own marketing or feature list; a constraint set that happens to match exactly one vendor's differentiators is a `vendor-coupling` finding under Scope & Neutrality

---

## Stage 2 — Outranking

Compare admitted candidates against project-stated criteria with an auditable non-compensatory relation. A simple Pareto comparison suffices when one candidate is no worse on every criterion and strictly better on at least one; use weighted concordance/discordance only when the tradeoff requires it. The result is a partial order; an unresolved pair is legitimate.

**Directives**:
- Record the criteria and supporting pairwise comparisons needed to justify the selected candidate, including concordance and discordance where the chosen method uses them; an unsupported relation is `outranking-relation-unstated`. A sole admitted candidate needs no fabricated comparison
- Preserve incomparability where the outranking relation does not resolve a pair; forbid collapsing an unresolved pair into an arbitrary total order — a forced order over an unresolved pair is an `outranking-incomparability-collapsed` finding at `minor` severity, and every pair it leaves unresolved routes to Stage 3
- Derive criteria and any weights from the governing requirements, never candidate marketing; a criteria set matching one vendor's differentiators is `vendor-coupling`

---

## Stage 3 — Argumentation

Route unresolved comparisons and contested assumptions to structured argumentation: a claim, its source evidence, and support/attack relations. Independent agents may test competing reasons within the same declared budget. The Evaluator, independent of the argument producers, records the accepted arguments and verdict; it may leave a choice unresolved rather than invent a winner.

**Directives**:
- Record the argument graph — claims, support/attack edges, accepted arguments — inline or by exact reference for a contested choice; compact prose or a table suffices when the relations are unambiguous. Closing a contested choice without that record is `argumentation-graph-missing`
- Require the rendering Evaluator to hold no argument of its own in the graph it adjudicates; a verdict authored by the same agent that submitted a winning argument is an `argumentation-self-graded` finding at `blocker` severity, extending Evaluator independence (Autonomous Implementation Verification) into the selection pipeline
- Attach the persisted argument graph to the selection ADR as its Evidence Reference; a selection ADR whose contested candidates carry no linked argument graph is an `unproven-claim`

---

## Cross-Stage Rules

**Directives**:
- Label the outcome by its pipeline derivation: require constraint dispositions, pairwise evidence when alternatives survive, and an argument graph when contested. An unsupported winning choice is `vendor-preference-unscored`; record why a stage is inapplicable instead of fabricating evidence
- Reopen only affected constraints and comparisons when a cited fact changes; revising a governing requirement follows the authoring authority seam. Argumentation never waives a failed hard constraint, and no useful new evidence means no further reasoning round
- Bound the whole pipeline by the task's time, token, and iteration limits; reuse unchanged evidence and agent roles. At the bound, record the unresolved decision or select a supported in-scope alternative; preserve incomparability and continue disjoint work
- Present illustrative constraints, criteria, and candidates only under a heading or block whose own text contains the words "reference implementation," per the Scope & Neutrality Contract; a checklist or candidate list naming real vendors outside such a label is a `vendor-coupling` finding

---

## Reference Implementation

Non-binding per Scope & Neutrality — for a solo-operator, AI-native, MCP-/WebMCP-native, edge-native product (any project instantiates its own constraint set, criteria set, and candidates; none of this is universal): Stage 1 constraints typically include license compliance, offline/edge capability, and zero-infra posture; Stage 2 criteria typically include AI-native fit (embedding/vector and agentic-workload support), total cost of ownership, primary-deployment-platform fit, and a mobile-/web-/offline-first delivery triad — browser-based (web-first) delivery, mobile-first delivery, and offline-first operation via on-device/edge execution and local-first data ownership — scored alongside concurrency-safety under multi-device/multi-agent use, token performance and economics, min-viable-max-value, time-to-value, and ROI, with an ELECTRE- or PROMETHEE-style outranking relation; Stage 3 argumentation typically uses an abstract argumentation framework (Dung-style attack graph with grounded or preferred extension). A project's "primary-platform fit" criterion names whichever platform that project has already adopted as primary as a reference implementation of the general criterion — the criterion itself, not the named platform or method, is what every future ADR in that project's set re-applies.

---

## Conformance Findings

This module introduces no new finding type. It raises the parent's `Platform Selection` family —
`vendor-preference-unscored`, `constraint-gate-skipped`, `outranking-relation-unstated`,
`outranking-incomparability-collapsed`, `argumentation-graph-missing`, `argumentation-self-graded` —
plus `vendor-coupling` and `unproven-claim`.

---

## Mantra Application

**"Constraints gate before anyone compares · Outranking records the relation, not a score · Incomparability is a legitimate answer · The Evaluator holds no argument it judges"**
