---
title: "Business Plan Guidelines"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-09-30"
lang: "en-US"
frontmatter_contract: "required"
owner: "Business plan authoring and delivery contract"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "3.3.0"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Business Plan Guidelines

A business plan reads the joined `PRD-TAD-ADR-MVP-GTM` artifact as an operating system for one segment:
who pays, how they are reached and served, what it costs, what could fail and what happens next. The
[Venture Record](./prd-tad-adr-mvp-gtm-venture.md#business-plan) owns what a plan must cover. This module
owns how a plan is scoped, ordered, written, reconciled, reviewed, delivered, operated and learned from.
It is the plan-side twin of the [Pitch Deck Guidelines](./pitch-deck-guidelines.md): the same revision,
the same claims, a longer form.

---

## Scope & Ownership

| Concern | Owner | This module |
|---|---|---|
| Section roles, market-sizing method, market, acquisition and operating detail | [Venture Record — Section Contract](./prd-tad-adr-mvp-gtm-venture.md#section-contract) | consumes sections by name; never adds, renames or re-sources one |
| Coverage domains C01–C16 | [From-0-to-1 coverage contract](./prd-tad-adr-mvp-gtm-guidelines.md#from-0-to-1-coverage-contract) | reads dispositions; shows gaps, never re-decides them |
| Pain, monetization and readiness labels | [Pain-Point Mapping](./prd-tad-adr-mvp-gtm-guidelines.md#pain-point-to-feature-mapping), [Monetization](./prd-tad-adr-mvp-gtm-guidelines.md#monetization), [Readiness Ladder](./prd-tad-adr-mvp-gtm-guidelines.md#readiness-ladder) | prints the owner's label beside the claim |
| Experiments, hypotheses and pivot decisions | [Lean Startup Guidelines](./lean-startup-guidelines.md) | reports them; never re-scores a result |
| Numbers, statements, scenarios, headline rows | [Financial Model](./prd-tad-adr-mvp-gtm-venture.md#financial-model), [Financial Model Guidelines](./financial-model-guidelines.md) | cites headline IDs at the same revision |
| Participants, interfaces and value exchange | [Ecosystem](./prd-tad-adr-mvp-gtm-guidelines.md#ecosystem) | cites rows in operations and partnerships |
| Roadmap phases, thresholds and exit VCCs | [Roadmap](./prd-tad-adr-mvp-gtm-guidelines.md#roadmap) | cites phases as milestones |
| Deck variants, Claim Manifest, deck delivery | [Pitch Deck Guidelines](./pitch-deck-guidelines.md#deck-lifecycle) | shares the revision, claims and ask; owns no deck rule |
| Lanes, integration and publication | [ADLC Execution Seam](./prd-tad-adr-mvp-gtm-guidelines.md#adlc-execution-seam), [Lane Topology & Deploy Boundary](./prd-tad-adr-mvp-gtm-readiness.md#lane-topology--deploy-boundary) | routes plan source and publication through them |
| Tokens, typography, contrast and reach | [Native design contract](./design-theme-contract.md#ownership-and-adoption) | applies them; no plan-local theme |
| Finding names and severities | [Finding Enumeration](./prd-tad-adr-mvp-gtm-verification.md#finding-enumeration) | raises existing types only |

The [Projection Contract](./prd-tad-adr-mvp-gtm-venture.md#projection-contract) lets a plan add one
thing: **the arrangement of sourced market, acquisition, legal/IP and capital records**. This module
owns that arrangement and the surfaces around it — variants, depth, outline, section claims, risk
presentation, cross-projection reconciliation, review, rendering, distribution, operating use and
outcome capture. It inherits the parent's [Scope & Neutrality Contract](./prd-tad-adr-mvp-gtm-guidelines.md#scope--neutrality-contract),
[Rule Identity](./prd-tad-adr-mvp-gtm-guidelines.md#rule-identity--classification),
[frontmatter contract](./prd-tad-adr-mvp-gtm-guidelines.md#markdown-yaml-frontmatter-enforcement) and
[recording contract](./prd-tad-adr-mvp-gtm-verification.md#recording-contract). Directive lists are
labelled artifact-bearing or advisory per Rule Identity.

A plan is regenerated from the artifact, never edited into a competing source. An approved, funded or
well-received plan proves no product outcome, demand or revenue.

---

## Plan Lifecycle

```text
Section Contract @revision + coverage record → Variant Register → Outline → Section Claim Record
  → Draft → Reconcile with deck and model → Review → Authorize → Deliver → Operate
  → Delivery & Outcome Log → successor Context
```

| Step | Consumes | Produces | Next step blocked without it |
|---|---|---|---|
| Variant | joined revision, C01–C16 record, audience, decision | Variant Register row | Outline |
| Outline | variant row, Section Contract | ordered sections with depth and disposition | Claim Record |
| Claim Record | outline, owners' sources | one claim row per section statement | Draft |
| Draft | claim record, render profile | plan source and exports | Reconcile |
| Reconcile | draft, deck at the same revision, model headline IDs | zero mismatches or recorded findings | Review |
| Review | reconciled draft | Evaluator verdict and domain-reviewer sign-offs | Authorize |
| Authorize | reviewed export, confidentiality class | recorded operator instruction | Deliver |
| Deliver | authorized export | Delivery & Outcome Log row | Operate |
| Operate | milestones, KPIs, risk triggers | review rows at declared cadence | Learn |
| Learn | outcome and review rows | successor Context | next revision |

**Artifact-bearing directives**:
- Run the steps in order per variant; a later step recorded while an earlier one is missing is `gate-sequence-violation`
- Start from a baselined revision that passed the [Phase 5 gate](./prd-tad-adr-mvp-gtm-process-flows.md#phase-5--gtm-and-venture-projections); a plan built from an unbaselined or superseded revision is `stale-evidence` for every audience action depending on it
- Keep plan source beside the joined artifact, joined by `continuity_id@revision` in frontmatter; variant, depth and confidentiality live in the Variant Register, not in new frontmatter keys — `artifact-naming-noncompliant`
- Re-enter at Claim Record when the joined revision changes and at Variant when the audience or decision changes

---

## Variant Register

A plan variant is a view: it selects, orders and sets depth; it never changes a claim.

```markdown
| Variant | Audience (function) | Decision sought | Depth | Sections: full · summary · appendix · deferred | Stage | Confidentiality | Authorizing role | Domain reviewers |
|---|---|---|---|---|---|---|---|---|
| P1 | [operator / funder / lender / program / partner / enterprise buyer] | [one decision] | one-page \| standard \| full | [...] | [stage] | public \| shared-under-terms \| private | [role] | [legal / tax / sector roles] |
```

**Artifact-bearing directives**:
- Declare every variant before drafting; a plan with no Variant Register row is `unimplemented-guideline`
- Account for every Section Contract row per variant as full, summary, appendix or deferred with reason and trigger; a section silently absent is `roadmap-scope-silently-dropped`
- Record exactly one decision sought per variant; an internal operating variant may seek only commitment to milestones and owners
- Derive every variant from the same revision as the deck and model shown to the same audience — `status-conflict`

**Advisory** — audience emphasis:

| Audience | Leads with | Emphasis |
|---|---|---|
| Operator (internal) | Milestones & KPIs | owners, cadence, risk triggers, capacity and cash floor |
| Funder | Executive summary | market, economics, team, capitalization, use of funds |
| Lender | Financial plan | Downside cash coverage, repayment schedule, security, covenants |
| Program or grant | Eligibility and milestones | stated criteria mapped to sections, award use by Roadmap phase |
| Partner | Operations and ecosystem | interfaces, obligations, value exchange, exit terms |
| Enterprise buyer | Offer & MVP | outcome, onboarding TTV, support, security and data obligations |

---

## Depth by Stage

Depth follows the decision, not a page target. The Section Contract applies at every depth; lower depth
summarizes or defers, it never omits.

| Stage | Depth | Minimum content |
|---|---|---|
| 0 — grounded opportunity | one-page | segment and problem, current alternative, offer and price hypothesis, first channel, key decision metric, cost drivers, revenue stream, riskiest hypotheses; every row labelled |
| MVP evidenced | standard | every section with evidence or gap; model at the revision; experiments and results |
| First dollar | full | observed unit economics, operations capacity, legal and capital rows complete |
| Repeat demand | full | cohort evidence, scale plan, hiring triggers, contingency per cash-floor breach |

**Artifact-bearing directives**:
- Declare each variant's stage from the owners' labels; a stage claimed ahead of its evidence is `unproven-claim`
- Show a missing section at any depth as a gap row with owner, next check and date; padding it with generic text is `pitch-claim-unsourced`
- Label a one-page plan incomplete for any audience action that needs a full plan — `unimplemented-guideline`

---

## Section Composition

**Artifact-bearing directives**:
- Open each section with one claim sentence that its section claim row supports; a topic heading with no claim leaves the section unsourced — `pitch-claim-unsourced`
- Write the executive summary last; every sentence cites the later section it summarizes and adds nothing — `pitch-claim-unsourced`
- Keep one primary segment; secondary segments appear as `Won't (this increment)` with trigger — `roadmap-scope-silently-dropped`
- Present market size with both methods, their dates and the reconciliation from the owner — `market-size-single-method`
- Present competition as the buyer's alternatives, including doing nothing and the manual workaround, separate from technical choices recorded in ADRs; name competitors and vendors only as the Venture Record permits — `vendor-coupling`
- Present each channel as its funnel from the owner with denominators and windows; a channel with no measured or labelled conversion is `financial-assumption-unsourced`
- Mark every capability in Offer & MVP as implemented, proposed or deferred from the grounding and ecosystem records; a planned capability written as existing is `unproven-claim`
- Bind Operations to TAD capacity, lane topology and ADLC budgets; staffing that exceeds recorded capacity without a hiring trigger is `gate-order-drift`
- Name team roles by function with gaps and hiring triggers tied to model volumes; a capacity gap with no trigger is `unimplemented-guideline`
- State legal, IP, regulatory and tax rows with jurisdiction, owner and review evidence; unknown applicability stays open and blocks the dependent action — `unimplemented-guideline`. This module gives no legal advice
- State every milestone's rung from Evidence References and every KPI with its definition, denominator and owner — `unproven-claim`
- Print owner labels (`unvalidated`, `forecast`, `hypothesis`, rung, `concept`, `illustrative`) beside the claim they qualify — `pitch-claim-unsourced`

**Advisory**: prefer tables and short claims over narrative; a reader should find any number's source in
one step.

---

## Section Claim Record

The plan's check record, with the same shape as the deck's
[Claim Manifest](./pitch-deck-guidelines.md#claim-manifest) so one check reads both.

```markdown
| Section | Claim | Source | Evidence status | On-page label | Headline ID | Retrieved / fresh until |
|---|---|---|---|---|---|---|
| [Section Contract row] | [one claim sentence] | [anchor / Evidence Reference / A-id / E-id / external citation] | [owner label] | [label shown] | [HL-id or n/a] | [date] / [date] |
```

**Artifact-bearing directives**:
- Keep one row per claim, joined to the variant and its `continuity_id@revision`; a plan with no claim record is `unimplemented-guideline`
- Resolve every number, name, capability, quote and obligation to a source at the stated revision; unresolved is `pitch-claim-unsourced`, dangling is `unresolvable-reference`
- Cite every model number by its Financial Model headline ID; a number re-typed without an ID is `financial-assumption-unsourced`
- Route third-party facts through a dated citation with retrieval date; a fact past its declared freshness at delivery is `stale-evidence`
- Judge the record with an Evaluator distinct from the plan author — `unproven-claim`

---

## Risk Presentation

The Venture Record owns the risk fields: likelihood, impact, trigger, mitigation, contingency and owner,
plus the open finding set. This section fixes how risks are shown.

```markdown
| Risk | Class | Likelihood / impact | Evidence | Trigger | Mitigation | Contingency | Owner | Finding type (if any) |
|---|---|---|---|---|---|---|---|---|
```

**Artifact-bearing directives**:
- Show demand, concentration, channel, capacity, cash, security, legal and dependency risks where applicable, plus every open riskiest hypothesis from the Lean Startup record — `roadmap-scope-silently-dropped`
- Show every open `blocker` finding; omission is `roadmap-scope-silently-dropped`
- Tie the cash risk to the Downside cash-floor breach month and its dated contingency from the model — `scenario-set-incomplete`
- Map only actual violations to finding types; a business risk needs no fabricated finding

---

## Cross-Projection Reconciliation

Deck, plan and model shown to the same audience are one claim set at one revision.

**Artifact-bearing directives**:
- Reconcile every shared claim — segment, price, market figure, headline number, stage, rung, ask, milestone — across deck, plan and model before review; a mismatch is `status-conflict`
- Keep the ask identical to the deck's [ask](./pitch-deck-guidelines.md#the-ask): decision, instrument, amount, milestone, date, Base and Downside runway — `status-conflict`
- Regenerate all three when any shared claim changes; delivering one at a newer revision than the others to the same audience is `stale-evidence`
- Record a change row for every revision after a delivered one, listing added, changed and withdrawn claims and recipients to notify — `unimplemented-guideline`

---

## Review and Assurance

**Artifact-bearing directives**:
- Resolve the claim record and the reconciliation with an Evaluator mechanism distinct from the author — `unproven-claim`
- Name domain reviewers for legal, tax, accounting-basis and sector obligations in the Variant Register and record their review evidence; a reviewer's absence leaves the dependent claim open — `human-gate-unstated`
- Keep reviewer sign-off separate from the Evaluator's verdict; neither advances a readiness rung — `blended-status`

---

## Rendering, Distribution and Confidentiality

**Artifact-bearing directives**:
- Author the plan as diffable source; PDF or document exports are projections of it — `unguided-artifact`
- Resolve colour, type and identity from the native design contract and meet its [accessibility and reach](./design-theme-contract.md#accessibility-and-reach) obligations on every export — `duplicate-owner`, `incomplete-delivery-reach`
- Render charts and numbers under the deck's [number rules](./pitch-deck-guidelines.md#numbers-and-charts) — the same findings apply
- Stamp cover and footer with `continuity_id@revision`, variant, date and confidentiality class — `artifact-naming-noncompliant`
- Treat every external send or upload as an audience action authorized by the named role through a recorded operator instruction — `human-gate-unstated`; publication on a reachable surface crosses a named Deploy Boundary — `ungated-promotion`
- Link private evidence from a private appendix or data room instead of copying it into a shared export; record audiences by organization or role reference — `unimplemented-guideline`
- Author plan source in an authoring lane and integrate it by exact candidate; editing a published export in place is `deploy-boundary-breach`

---

## Operating Plan Use

An internal variant is the operator's plan of record between revisions.

```markdown
| Date | Milestone / KPI | Target | Actual | Variance | Risk triggers fired | Decision | Owner | Successor needed |
|---|---|---|---|---|---|---|---|---|
```

**Artifact-bearing directives**:
- Declare a review cadence and review milestones, KPIs and risk triggers at each; a missed review is `unimplemented-guideline`
- Take actuals from Evidence References and the model's actuals; an actual typed into the plan is `financial-assumption-unsourced`
- Route a variance that breaches a Roadmap threshold to a Pivot-or-Persevere Record under the [Lean Startup Guidelines](./lean-startup-guidelines.md) — `unimplemented-guideline`
- Change targets only through a successor revision; editing a target to match an actual is `duplicate-owner`

---

## Agent-Generated Plans

An agent may draft, reconcile and check a plan inside the
[AI-native harness pattern](./prd-tad-adr-mvp-gtm-economics.md#ai-native-harness-pattern).

**Artifact-bearing directives**:
- Emit a Section Claim Record with every generated plan and fail closed on any unresolved item — `pitch-claim-unsourced`
- Never generate a market figure, quote, customer name, obligation or number the record cannot source — `unproven-claim`
- Ground every drafted claim against the owning record, not a prior plan or chat — `cid-grounding-unverified`
- Bound generation by iteration, token and wall-clock ceilings with a circuit-breaker — `unbounded-loop` at `blocker`
- Ledger generation cost from the harness cost log — `adlc-cost-unledgered`
- Carry `worktree_id` and `agent_id` when variants are drafted in more than one work tree — `worktree-provenance-missing`
- Update the joined artifact's GTM and planning records before the session ends — `unimplemented-guideline`

---

## Delivery & Outcome Log

```markdown
| Date | Variant | Revision | Audience ref | Channel | Decision received | Questions / conditions | Follow-ups (owner, date) | Successor Context |
|---|---|---|---|---|---|---|---|---|
```

**Artifact-bearing directives**:
- Log every delivery, including declines and no response — `unimplemented-guideline`
- Feed outcomes into a successor Context through [successor feedback](./adlc-artifact-continuity.md#re-derivation-and-successor-feedback); never backward-edit the delivered revision — `duplicate-owner`
- Record approvals, term sheets and grant awards as intent, separate from received funds and from customer revenue — `revenue-recognized-unpaid`
- Promote a recurring condition or question to the owning PRD, GTM, Roadmap or risk row — `roadmap-scope-silently-dropped`

---

## Role—Action—Outcome

- **Plan Author** → variant, outline, claim record, draft, change row → a plan whose every claim resolves at one revision
- **Financial Modeler** → supplies headline IDs and confirms displayed numbers → zero plan–model mismatches
- **Domain Reviewer** → reviews legal, tax, accounting-basis and sector rows → recorded review evidence or an open obligation
- **Evaluator** *(mechanism)* → resolves the claim record and cross-projection reconciliation → verdicts the author cannot self-grade
- **Operator** → authorizes each send and publication, runs the operating review → one recorded instruction per audience action

---

## Conformance Findings

This module introduces no new finding type. It raises the Venture Record family —
`pitch-claim-unsourced`, `market-size-single-method`, `financial-assumption-unsourced`,
`revenue-recognized-unpaid`, `scenario-set-incomplete`, `adlc-cost-unledgered` — and the parent's
existing types: `gate-sequence-violation`, `stale-evidence`, `artifact-naming-noncompliant`,
`unimplemented-guideline`, `roadmap-scope-silently-dropped`, `status-conflict`, `unproven-claim`,
`vendor-coupling`, `gate-order-drift`, `human-gate-unstated`, `unresolvable-reference`, `blended-status`,
`unguided-artifact`, `duplicate-owner`, `incomplete-delivery-reach`, `ungated-promotion`,
`deploy-boundary-breach`, `cid-grounding-unverified`, `unbounded-loop`, `worktree-provenance-missing`.
Severity follows the Finding Enumeration unless a rule states it inline.

---

## Reference Implementation

Non-binding per Scope & Neutrality. A solo operator keeps one Markdown plan source per increment beside
the joined artifact and derives two variants: an internal operating plan reviewed at a fixed cadence and
a funder or program variant delivered with the deck at the same revision. Model numbers enter by headline
ID; an agent drafts the plan and claim record inside a bounded harness, an independent check resolves
every row and reconciles deck, plan and model, and the operator authorizes each send. No vendor, funder,
tool or platform is named here.

---

## Validation Checklist

- [ ] Plan built from a baselined `continuity_id@revision`, stamped on cover and footer
- [ ] Coverage record current; deferred domains shown as gaps
- [ ] Variant Register row per variant: audience, decision, depth, section disposition, stage, confidentiality, authorizing role, domain reviewers
- [ ] Every Section Contract row accounted for per variant
- [ ] Stage declared from owners' labels; gaps shown with owner, next check and date
- [ ] Section Claim Record resolves every claim; model numbers cited by headline ID; third-party facts dated
- [ ] Capabilities marked implemented, proposed or deferred
- [ ] Risks include business risks, open riskiest hypotheses and every open `blocker`; cash risk tied to Downside
- [ ] Deck, plan and model reconciled at one revision; the ask identical across them
- [ ] Evaluator verdict and domain-reviewer evidence recorded separately
- [ ] Exports from source; native design tokens; accessibility and reach obligations met
- [ ] External delivery authorized; publication crossed a named Deploy Boundary; private evidence linked, not copied
- [ ] Operating reviews at the declared cadence; threshold breaches routed to a pivot-or-persevere decision
- [ ] Delivery & Outcome Log row per delivery; outcomes routed to a successor Context
- [ ] Joined artifact's GTM and planning records updated before the session ends

---

## Mantra Application

**"One segment, one revision, one claim set · Write the summary last · Every section opens with a sourced claim · Depth follows the decision · Deck, plan and model agree · Risks show what could fail, including what we have not tested · Reviewers sign, the Evaluator checks, the operator sends · The plan runs the business between revisions"**

- **One segment, one revision, one claim set**: a variant is a view of the joined artifact
- **Write the summary last**: it cites; it never adds
- **Every section opens with a sourced claim**: the Section Claim Record resolves it
- **Depth follows the decision**: one page at discovery, a full plan when an audience action needs it
- **Deck, plan and model agree**: same numbers, labels, stage and ask
- **Risks show what could fail**: business risks, open hypotheses and open `blocker` findings
- **Reviewers sign, the Evaluator checks, the operator sends**: no self-graded plan, no ungated send
- **The plan runs the business**: operating reviews feed the next revision
