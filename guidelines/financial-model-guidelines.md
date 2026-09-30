---
title: "Financial Model Guidelines"
doc_type: "Guidelines Module"
version: "1.1.0"
date: "2026-09-30"
lang: "en-US"
frontmatter_contract: "required"
owner: "Financial model construction and operation contract"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "3.4.0"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Financial Model Guidelines

A financial model is the joined `PRD-TAD-ADR-MVP-GTM` artifact's numbers under stated assumptions. The
[Venture Record](./prd-tad-adr-mvp-gtm-venture.md#financial-model) owns what a model must contain:
measurement basis, assumption register, driver schedules, unit economics, linked statements, use of
funds, capitalization, ADLC Cost Ledger, scenario set, reconciliation checks and free-core
classification. This module owns how a model is structured, built, checked, published, operated
against actuals and learned from, in any tool. The deck's economics slide and the plan's financial
section read the model through one Headline Register.

---

## Scope & Ownership

| Concern | Owner | This module |
|---|---|---|
| Required rows, formulas, statements, scenarios and checks | [Venture Record — Financial Model](./prd-tad-adr-mvp-gtm-venture.md#financial-model) | builds them; never adds, renames or re-defines a row |
| Measurement basis, recognition and cash separation | [Measurement basis and horizon](./prd-tad-adr-mvp-gtm-venture.md#measurement-basis-and-horizon) | applies it per row |
| Input fields and dispositions | [Assumption Register](./prd-tad-adr-mvp-gtm-venture.md#assumption-register) | enforces entry only through it |
| Execution cost facts | [ADLC Seam](./prd-tad-adr-mvp-gtm-venture.md#adlc-seam), [ADLC Cost Ledger](./prd-tad-adr-mvp-gtm-venture.md#adlc-cost-ledger) | ingests receipts; never estimates where receipts exist |
| TCO per deployment model, FOSS-first | [Deployment-Model TCO Variants](./prd-tad-adr-mvp-gtm-economics.md#deployment-model-tco-variants), [FOSS-First Decision Rule](./prd-tad-adr-mvp-gtm-economics.md#foss-first-decision-rule) | carries them as separate rows |
| Baselines, measured drivers, pivot decisions | [Lean Startup Guidelines](./lean-startup-guidelines.md) | receives proposed values as successor revisions |
| Deck number display | [Pitch Deck Guidelines — Numbers and Charts](./pitch-deck-guidelines.md#numbers-and-charts) | supplies Headline Register rows |
| Plan financial section | [Business Plan Guidelines](./business-plan-guidelines.md) | supplies Headline Register rows |
| Coverage domains C12, C13, C14 | [From-0-to-1 coverage contract](./prd-tad-adr-mvp-gtm-guidelines.md#from-0-to-1-coverage-contract) | supplies evidence or gaps |
| Lanes, integration and publication | [ADLC Execution Seam](./prd-tad-adr-mvp-gtm-guidelines.md#adlc-execution-seam), [Lane Topology & Deploy Boundary](./prd-tad-adr-mvp-gtm-readiness.md#lane-topology--deploy-boundary) | routes model source and publication through them |
| Finding names and severities | [Finding Enumeration](./prd-tad-adr-mvp-gtm-verification.md#finding-enumeration) | raises existing types only |

The [Projection Contract](./prd-tad-adr-mvp-gtm-venture.md#projection-contract) lets a model add
**computed statements, scenarios, runway and sensitivity from owned assumptions** and nothing else. It
inherits the parent's [Scope & Neutrality Contract](./prd-tad-adr-mvp-gtm-guidelines.md#scope--neutrality-contract),
[Rule Identity](./prd-tad-adr-mvp-gtm-guidelines.md#rule-identity--classification),
[frontmatter contract](./prd-tad-adr-mvp-gtm-guidelines.md#markdown-yaml-frontmatter-enforcement) and
[recording contract](./prd-tad-adr-mvp-gtm-verification.md#recording-contract). Directive lists are
labelled artifact-bearing or advisory per Rule Identity. This module gives no accounting, tax or
investment advice; the venture's declared basis and its domain reviewers govern those.

A forecast is a labelled calculation, not an observation. A model that balances proves arithmetic, not
demand, revenue or viability.

---

## Model Lifecycle

```text
Assumption Register @revision → Structure → Drivers → Statements → Checks → Headline Register
  → Review → Authorize → Publish → Close period (actuals) → Variance → Re-forecast → successor Context
```

| Step | Consumes | Produces | Next step blocked without it |
|---|---|---|---|
| Structure | Venture Record rows, measurement basis | layered model skeleton | Drivers |
| Drivers | assumption rows, driver schedules | period-by-period drivers | Statements |
| Statements | drivers, opening balances | linked income, cash-flow and balance-sheet rows | Checks |
| Checks | statements, scenarios | named reconciliation results | Headlines |
| Headlines | passing checks | Headline Register rows | Review |
| Review | model, check results | Evaluator verdict, domain-reviewer evidence | Authorize |
| Authorize | reviewed model, confidentiality class | recorded operator instruction | Publish |
| Close period | payment evidence, receipts, ledger | actuals for the period | Variance |
| Variance | actuals, frozen forecast | variance rows with explanation | Re-forecast |
| Re-forecast | variance, proposed assumption values | successor revision | next period |

**Artifact-bearing directives**:
- Run the steps in order per revision; a headline published before its checks pass is `gate-sequence-violation`
- Join the model to `continuity_id@revision` and stamp that identity on every output, chart and export — `artifact-naming-noncompliant`
- Recompute outputs from inputs; hand-editing an output, statement line or headline is `financial-assumption-unsourced`

---

## Model Structure

Any tool can hold the model. Its layers are fixed, and values flow one way.

| Layer | Holds | Rule |
|---|---|---|
| Inputs | Assumption Register rows with low, base and high values, opening balances, measurement basis | the only place a value enters |
| Drivers | cohort, demand-to-delivery, revenue-to-cash, cost-and-capacity, working-capital and funding schedules | reference inputs only |
| Calculations | unit economics, allocations, ADLC ledger aggregation | reference inputs and drivers only |
| Statements | income, cash flow, balance sheet per period | reference calculations only |
| Outputs | Scenario Set, sensitivities, runway, break-even, Headline Register | reference statements and calculations only |
| Checks | the Venture Record's reconciliation and edge-case checks with results | read every layer; write none |

**Artifact-bearing directives**:
- Enter every value through the Inputs layer with its A-id; a literal constant in any later layer is `financial-assumption-unsourced`
- Keep references pointing down the layer order; a calculation that reads an output, or an input that reads a calculation, is `unresolvable-reference`
- Give every row one unit, one sign convention and one period cadence, identical across scenarios — `status-conflict`
- Keep one formula per row across all periods; a period-specific override is an input with its own A-id — `financial-assumption-unsourced`
- Declare and bound any intentional circular calculation with an iteration limit and convergence check — `unbounded-loop` at `blocker`
- Round only at display; convert currency only through a dated FX input — `financial-assumption-unsourced`
- Keep deployment-model TCO variants as separate rows — `blended-deployment-tco`

---

## Input Provenance

**Artifact-bearing directives**:
- Source each input from its owner at the joined revision: GTM for price, conversion and channel cost; TAD for token budgets, capacity and TCO; ADLC receipts for execution cost; payment evidence for actuals — `financial-assumption-unsourced`
- Take measured drivers from experiment results under the [Lean Startup Guidelines](./lean-startup-guidelines.md) as proposed successor values with E-ids; a result entered into the accepted revision is `duplicate-owner`
- Label third-party benchmarks with publisher, date, population and applicability, and keep them `unverified` for this venture until measured — `financial-assumption-unsourced`
- Keep missing inputs unknown and visibly flagged; a blank read as zero is `financial-assumption-unsourced`
- Record low, base and high values for every input that drives a headline, runway or break-even row — `scenario-set-incomplete`

---

## Headline Register

The Headline Register is the only export surface. The deck's economics and traction slides and the
plan's financial section cite its IDs.

```markdown
| HL-id | Row | Base | Downside | Upside | Unit | Period / window | Actual or forecast | Label | Source rows | Consumers |
|---|---|---|---|---|---|---|---|---|---|---|
| HL1 | [runway months to cash floor] | [n] | [n] | [n] | months | [from YYYY-MM] | forecast | [label] | [statement / schedule rows] | [deck slide / plan section] |
```

**Artifact-bearing directives**:
- Export every number a projection shows through a Headline Register row with value per scenario, unit, period, label and source rows — `pitch-claim-unsourced`
- Keep display rounding and period in the register so deck and plan show the same value — `status-conflict`
- Show undefined or `unverified` ratios as labelled text in the register, never as a number — `financial-assumption-unsourced`
- List every consumer; a revision that changes a headline triggers regeneration of each consumer — `stale-evidence`

---

## Scenarios and Sensitivity

The Venture Record requires Base, Downside and Upside, runway, break-even and three ranked
sensitivities. This section fixes how they are built.

**Artifact-bearing directives**:
- Build scenarios by switching declared input values only; a scenario with its own formula or row set is `scenario-set-incomplete`
- Derive Downside from evidence-based adverse values — slower conversion, higher churn, longer collection lag, higher serving cost — not from a flat haircut on revenue alone; record the rationale per changed A-id — `financial-assumption-unsourced`
- Rank one-at-a-time sensitivities by effect on runway across each input's low–high range, and run one combined-driver Downside stress — `scenario-set-incomplete`
- Define the break-even basis (operating, contribution or cash) once and report `not reached within horizon` when true — `scenario-set-incomplete`
- Tie every cash-floor breach to a dated contingency, owner and next decision that the plan's risk register cites — `scenario-set-incomplete`
- Keep free-quota ceilings and zero-spend constraints binding in every scenario; a scenario that assumes paid capacity without a passed constraint gate is `constraint-gate-skipped`

**Advisory**: a Downside that never breaches the cash floor is worth re-examining before an audience sees it.

---

## Actuals, Variance and Re-forecast

**Artifact-bearing directives**:
- Close each period at a declared cut-off and import actuals from payment evidence, invoices, receipts and the ADLC Cost Ledger; an actual typed without its source is `financial-assumption-unsourced`
- Keep the forecast that was current at period start frozen beside the actual; overwriting forecast history is `duplicate-owner`
- Record variance per material row with an explanation that names the driver and, where known, the E-id or event — `unimplemented-guideline`
- Keep recognized revenue, collected cash, refunds and financing on separate actual rows — `revenue-recognized-unpaid`
- Re-forecast through a successor revision with changed A-ids listed; route a variance that breaches a Roadmap threshold to a pivot-or-persevere decision — `unimplemented-guideline`

```markdown
| Period | Row | Frozen forecast | Actual | Variance | Driver / E-id | Explanation | Action |
|---|---|---|---|---|---|---|---|
```

---

## ADLC Cost Ingestion

**Artifact-bearing directives**:
- Ingest ledger rows by receipt or event ID, deduplicated, with source revision and cost class — `adlc-cost-unledgered`
- Include failed checks, retries, abandoned work and incidents in the period they occurred — `adlc-cost-unledgered`
- Label missing telemetry as unknown; an estimate standing in for an available receipt is `adlc-cost-unledgered`
- Allocate serving-token cost to COGS once and development cost to operating expense once — `missing-economics-metric`

---

## Views and Variants

A view selects outputs for an audience; it never changes an input or formula.

| View | Audience | Shows |
|---|---|---|
| Operating budget | operator | monthly cash, burn, capacity, variance, cash-floor contingency |
| Funder | investor | unit economics, scenarios, runway, use of funds, capitalization |
| Lender | creditor | Downside cash coverage, repayment schedule, working capital |
| Program | grant or program body | milestone costs by Roadmap phase, eligible cost classes |
| Buyer | enterprise customer | price and pilot economics for that buyer only |

**Artifact-bearing directives**:
- Derive every view from one model revision; a view with its own inputs is `duplicate-owner`
- Classify each view's confidentiality; link private detail (capitalization, contracts, customer data) from a private appendix or data room — `unimplemented-guideline`
- Run every external send or publication of a model view at the release seam as a Boundary-crossing action, and any contact, recruitment or charge to real people as an Irreversible external commitment, each under a recorded operator decision bound to the exact audience and effect per [ADLC Tool Permission & Blast Radius](./adlc-guidelines.md#tool-permission--blast-radius); neither runs inside an execution task and an agent never starts one on its own discretion — `human-gate-unstated`, `ungated-promotion`

---

## Tool Neutrality and Rendering

**Artifact-bearing directives**:
- Keep a diffable text projection of inputs, formulas and outputs beside any binary workbook, or author the model as code; a model whose formulas cannot be reviewed as text is `unguided-artifact`
- Make the model recomputable from its inputs by a second party without the author's environment — `unproven-claim`
- Render charts under the deck's [number rules](./pitch-deck-guidelines.md#numbers-and-charts) and meet [accessibility and reach](./design-theme-contract.md#accessibility-and-reach) obligations on every export — `incomplete-delivery-reach`
- Author model source in an authoring lane and integrate it by exact candidate; publication on a reachable surface crosses a named Deploy Boundary — `ungated-promotion`
- Declare model deliverables as execution-integrity VCCs in the GTM role — every check passes at the revision and an independent recomputation matches the Headline Register — so agent tasks derive from them under the [Specification to Task Bridge](./adlc-guidelines.md#specification-to-task-bridge); such a VCC proves arithmetic and joins, never demand — `unimplemented-guideline`

---

## Review and Assurance

**Artifact-bearing directives**:
- Have an Evaluator mechanism recompute the checks and Headline Register independently from the inputs; a model certified only by its author is `unproven-claim`
- Name domain reviewers for the accounting basis, tax and financing terms and record their evidence; an unreviewed basis leaves dependent headlines open — `human-gate-unstated`
- Record check results at the model revision; a passing check never advances a readiness rung — `blended-status`

---

## Agent-Generated Models

An agent may build, extend and check a model inside the
[AI-native harness pattern](./prd-tad-adr-mvp-gtm-economics.md#ai-native-harness-pattern).

**Artifact-bearing directives**:
- Never invent an input value; an agent may propose a structure or a formula, but values come from owners with A-ids — `financial-assumption-unsourced`
- Ground every input against its owning record at the revision — `cid-grounding-unverified`
- Emit check results and the Headline Register with every generated model and fail closed on any failed check — `scenario-set-incomplete`
- Bound generation by iteration, token and wall-clock ceilings with a circuit-breaker — `unbounded-loop` at `blocker`
- Ledger generation cost from the harness cost log — `adlc-cost-unledgered`
- Update the joined artifact's GTM and planning records before the session ends — `unimplemented-guideline`

---

## Role—Action—Outcome

Roles map onto the ADLC execution roles per the [Role-Action-Outcome Contract](./adlc-artifact-continuity.md#role-action-outcome-contract): authors and modelers act as Implementer, reviewers and presenters act under Operator authority, and the Evaluator is always a mechanism.

- **Financial Modeler** → structure, drivers, statements, checks, Headline Register, variance → a model whose every headline traces to inputs and evidence
- **Solo Founder / AI Orchestrator** → supplies owner inputs, decides on variance and cash-floor contingencies → decisions made on the Downside, not the Upside
- **Domain Reviewer** → reviews accounting basis, tax and financing terms → recorded evidence or an open obligation
- **Evaluator** *(mechanism)* → recomputes checks and headlines from inputs → verdicts the modeler cannot self-grade
- **Operator** → authorizes each send and publication → one recorded instruction per audience action

---

## Conformance Findings

This module introduces no new finding type. It raises the Venture Record family —
`pitch-claim-unsourced`, `financial-assumption-unsourced`, `revenue-recognized-unpaid`,
`scenario-set-incomplete`, `adlc-cost-unledgered` — and the parent's existing types:
`gate-sequence-violation`, `artifact-naming-noncompliant`, `unresolvable-reference`, `status-conflict`,
`unbounded-loop`, `blended-deployment-tco`, `duplicate-owner`, `stale-evidence`,
`constraint-gate-skipped`, `unimplemented-guideline`, `missing-economics-metric`, `human-gate-unstated`,
`unguided-artifact`, `unproven-claim`, `incomplete-delivery-reach`, `ungated-promotion`, `blended-status`,
`cid-grounding-unverified`.
Severity follows the Finding Enumeration unless a rule states it inline.

---

## Reference Implementation

Non-binding per Scope & Neutrality. A solo operator keeps the model as a text-diffable source beside
the joined artifact, with an Inputs layer that mirrors the Assumption Register, monthly periods for the
first 12 months and a Headline Register the deck and plan cite. The ADLC Cost Ledger fills from task
receipts and harness cost logs; experiment results arrive as proposed successor values. An agent builds
and extends the model inside a bounded harness, an independent check recomputes every headline, and the
operator authorizes each send. No vendor, tool or platform is named here.

---

## Validation Checklist

- [ ] Model joined to `continuity_id@revision`; identity stamped on every output
- [ ] Six layers present; every value enters through Inputs with an A-id; references flow one way
- [ ] One unit, sign convention, cadence and formula per row; circular calculations bounded
- [ ] Inputs sourced from owners; benchmarks labelled; missing inputs flagged, never zero
- [ ] Low, base and high values for every headline-driving input
- [ ] Headline Register exports every projected number with scenario values, unit, period, label and consumers
- [ ] Scenarios switch inputs only; Downside evidence-based; sensitivities ranked; combined stress run
- [ ] Break-even basis defined; cash-floor breaches tied to dated contingencies
- [ ] Free-quota and zero-spend constraints binding in every scenario
- [ ] Actuals imported from evidence at a cut-off; forecast frozen; variance explained; re-forecast as successor
- [ ] ADLC ledger ingested by receipt ID, deduplicated, failures included, unknowns labelled
- [ ] Views derived from one revision; confidentiality classified; sends authorized
- [ ] Text-diffable and recomputable by a second party; exports accessible
- [ ] Evaluator recomputation and domain-reviewer evidence recorded
- [ ] Joined artifact's GTM and planning records updated before the session ends

---

## Mantra Application

**"Values enter once, through inputs · Formulas flow one way · Outputs are computed, never typed · One register feeds deck and plan · Scenarios change inputs, not formulas · Decide on the Downside · Freeze the forecast, explain the variance · Receipts, not estimates, for the lifecycle · A balanced model proves arithmetic, not demand"**

- **Values enter once, through inputs**: every value has an A-id and an owner
- **Formulas flow one way**: inputs → drivers → calculations → statements → outputs, checked throughout
- **Outputs are computed, never typed**: recompute from inputs, never hand-edit a headline
- **One register feeds deck and plan**: Headline Register IDs keep all three projections identical
- **Scenarios change inputs, not formulas**: one structure, three value sets
- **Decide on the Downside**: runway, cash floor and contingency come from the adverse case
- **Freeze the forecast, explain the variance**: actuals sit beside the forecast they tested
- **Receipts, not estimates**: the ADLC ledger fills from execution evidence
- **A balanced model proves arithmetic**: demand and revenue need their own evidence
