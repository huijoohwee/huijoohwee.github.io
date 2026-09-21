---
title: "PRD, TAD & ADR Venture Record Module"
doc_type: "Guidelines Module"
version: "2.1.0"
date: "2026-09-21"
lang: "en-US"
frontmatter_contract: "required"
owner: "Venture record contract"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "3.1.0"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# PRD, TAD & ADR Venture Record Module

## Scope & Ownership

This module owns three **audience projections** of the joined `PRD-TAD-ADR-MVP-GTM` artifact and the
cost ledger that feeds them:

1. **Pitch Deck** — a bounded, time-boxed narrative projection for a funder, partner, or first customer.
2. **Business Plan** — an operating projection: segment, offer, market, competition, acquisition, operations, team, legal, capital, risks, milestones.
3. **Financial Model** — a quantified projection: assumption register, unit economics, income statement, cash flow, capitalization, use of funds, scenarios, runway, ADLC cost ledger.

Each is a *consumer*. Every claim resolves to one section of the joined artifact at one exact revision,
or to one Evidence Reference. None originates a requirement, design, decision, or input number; derived outputs cite their formulas. A projection
is regenerated from the artifact, never edited into a competing source of truth.

This module inherits the parent set's Scope & Neutrality Contract, Rule Identity derivation, finding
recording contract, and the [five section roles](./prd-tad-adr-mvp-gtm-planning-record.md#unified-artifact-composition).
Monetization labels, pain labels, readiness rungs, TCO variants, and the selection pipeline stay with
their owners. Execution cost facts come from the [ADLC Guidelines](./adlc-guidelines.md); this module
reads them, it does not redefine them.

---

## Projection Contract

| Projection | Consumes | Adds | Never adds |
|---|---|---|---|
| Pitch Deck | PRD pain, MVP Demo Skeleton, GTM path, rungs, model headlines, Roadmap, RAO team | Ordering, time bounds, the ask | A capability, metric, or number absent from the artifact |
| Business Plan | All five roles, ADR records, Roadmap, Lane Topology, RAO, open findings | Arrangement of sourced market, acquisition, legal/IP and capital records | A requirement or decision first stated here |
| Financial Model | GTM streams, TAD budgets and TCO, Roadmap, ADLC receipts, WTP evidence | Computed statements, scenarios, runway and sensitivity from owned assumptions | Unlabelled forecasts or cash receipts presented as recognized revenue |

**Directives**:
- Join every projection by `continuity_id@revision` in frontmatter — `artifact-naming-noncompliant`
- Cite, for every claim, the owning section or Evidence Reference — `pitch-claim-unsourced`
- Label every forward-looking statement with the owners' vocabulary; an unlabelled projection of an unvalidated pain or stream is `pitch-claim-unsourced`
- Regenerate when the joined revision changes — `stale-evidence` blocks only the audience action that depends on it
- Keep each projection separately loadable under the parent's file budget — `cid-density-violation`

Inputs and material assumptions live in GTM/TAD at the joined revision before projection. A model
may calculate derived values, but its formula and assumption IDs must resolve to that source.
Coverage is recorded through the parent's [C01–C16 contract](./prd-tad-adr-mvp-gtm-guidelines.md#from-0-to-1-coverage-contract).

---

## Pitch Deck

A pitch deck is the Demo Skeleton's beat table extended to an audience with a decision to make.

### Slide Register

```markdown
| # | Slide role | Projects | Evidence status | Bound |
|---|---|---|---|---|
| 1 | Problem | PRD Pain-Point Mapping `[P-id]` | `unvalidated` \| `demand-proven` | [s] |
| 2 | Who pays | GTM payer segment, WTP evidence | `unvalidated` \| `demand-validated` | [s] |
| 3 | Market | Business Plan sizing (two methods, reconciled) | cited | [s] |
| 4 | Solution | MVP slice, Domain-Object Rubric current level | derived rung | [s] |
| 5 | Reveal | Demo Skeleton Reveal beat, VCC `[id]` | Evidence Reference | [s] |
| 6 | Why now | ADR selection record, Roadmap trigger | recorded decision | [s] |
| 7 | Why us / team | Division of Work reuse, Role—Action—Outcome | recorded | [s] |
| 8 | Competition | GTM buyer alternatives and differentiation | dated comparison evidence | [s] |
| 9 | Traction | Collected cash, recognized revenue, cohort retention; mechanism / demand labels | dated evidence, period and denominator | [s] |
| 10 | Economics | Model headlines: price, margin, LTV:CAC, payback, runway | assumption register | [s] |
| 11 | Roadmap | Roadmap phases R1..Rn with prerequisites | recorded | [s] |
| 12 | Ask | Instrument, amount, use-of-funds, capitalization if equity | stated | [s] |
```

**Directives**:
- Carry a Slide Register with one row per slide, each naming what it projects, its evidence status, and a bound; a slide with no row or bound is `missing-demo-beat`
- Bound total speaking time; forbid a deck whose bounds sum past the stated budget
- Anchor the Reveal slide to the MVP Demo Skeleton's Reveal beat and its VCC — `pitch-claim-unsourced`
- Present traction with cohort, period, denominator and actual/forecast labels. Separate users, pilots, signed orders, recognized revenue and collected cash — `revenue-recognized-unpaid`
- State one ask tied to named Roadmap phases, use-of-funds rows, and capitalization when the instrument is equity — `pitch-claim-unsourced`
- Keep every competitor, platform, or vendor name under a "reference implementation" label — `vendor-coupling`

- Declare audience, decision sought, deck revision and presentation time; a customer ask can be a paid
  pilot or next meeting, and a bootstrapped plan can state no external funding is sought.
- The twelve roles are coverage obligations, not a fixed slide count: combine roles for a short deck,
  keeping every role in the Slide Register; put supporting calculations and risks in a cited appendix.
- Distinguish customer alternatives (including doing nothing) from technical implementation candidates;
  commercial differentiation requires buyer evidence, not only an architecture selection score.

---

## Business Plan

A business plan is the joined artifact read as an operating system for one segment.

### Section Contract

| Section | Projects | Module-specific obligation |
|---|---|---|
| Executive summary | Overview, GTM stream, model headlines | One page; every sentence cites a later section |
| Segment & problem | PRD Pain-Point Mapping | One primary segment; others `Won't (this increment)` |
| Offer & MVP | MVP slice, Domain-Object Rubric | Current rung from Evidence References only |
| Market sizing | GTM payer segment | Two independent methods, both cited |
| Competition & positioning | GTM buyer alternatives; ADR technical choices | Current workaround, direct/indirect substitutes, switching costs, dated evidence; separate technical ranking |
| Go-to-market & acquisition | GTM ranking, Roadmap | Streams in time-to-first-dollar order; named channels |
| Operations | TAD service model, Lane Topology, ADLC budgets | Fulfilment, support, capacity, suppliers, incidents, continuity and authorized boundaries |
| Team & hiring | Role—Action—Outcome, headcount plan | Roles by function; Evaluator is a mechanism, never a person |
| Legal, IP, regulatory | TAD constraints, ADRs | Jurisdiction, entity, IP/license, privacy/data, contracts, tax and sector duties; evidence or review owner |
| Capitalization | Financial Model cap rows | Instrument, outstanding claims, dilution of the ask |
| Risks | Business risks, open findings, unresolved rubric gaps, `unverified` grounding | Each risk cites evidence and owner; finding type when applicable |
| Milestones & KPIs | Roadmap, Readiness Ladder, success metrics | A milestone claims a rung only with its Evidence Reference |

**Market sizing method**:

```markdown
| Method | Population source | Filter chain | Result | Cited |
|---|---|---|---|---|
| Top-down | [named external source, date] | [segment filters] | [n units / currency] | [ref] |
| Bottom-up | [observed reachable accounts or channel capacity] | [conversion assumptions from register] | [n units / currency] | [ref] |
| Reconciliation | — | ratio and stated explanation of the gap | — | — |
```

**Directives**:
- Size the market by at least two independent methods, each with a cited population source and its date, and reconcile the gap — `market-size-single-method`
- Include the open finding set in the broader business risk register; cite evidence and owner for each risk, and its finding type when applicable. A known open `blocker` omitted from risks is `roadmap-scope-silently-dropped`
- State every milestone's rung from Evidence References — `unproven-claim`
- Bind delivery/support operations to TAD capacity, the recorded lane topology and ADLC budgets — `gate-order-drift`
- Compare buyer alternatives in GTM and implementation alternatives in ADR; preserve the parent's reference-implementation label for named examples — `pitch-claim-unsourced`
- State applicable legal, IP and regulatory obligations, owner and review evidence; unknown applicability remains unresolved. Use `not-applicable` only with rationale and reviewer; a roadmap deferral cannot waive an obligation.
- State capitalization whenever an equity ask exists; otherwise `financial-assumption-unsourced`

### Market, acquisition and operating detail

- Define TAM (total addressable), SAM (serviceable under the chosen scope) and SOM (obtainable within
  the stated horizon). Keep geography, year, currency, customer count and spend unit consistent.
  Bottom-up SOM is constrained by reachable prospects, conversion, sales cycle and delivery capacity;
  a chosen market-share percentage is an assumption, not proof. Label unavailable research explicitly.
- For each channel, state source audience → qualified lead → offer → paid conversion → activation →
  retained cohort, with denominator, window, owner and cost. Include onboarding, distribution,
  partnerships, sales motion and support/refund handling as applicable.
- Give each experiment a hypothesis, segment, offer/price, bounded sample/time/spend, pass/fail threshold,
  evidence location and continue/pivot/stop decision. Small samples remain uncertain; paid conversion
  and repeat use remain separate observations.
- Link delivery capacity, operator time and hiring triggers to model volumes. Cover data retention,
  export/deletion, access, incidents, backup/restore and supplier exit through the existing TAD owners.
- Expand risks beyond open findings: demand, concentration, channel, capacity, cash, security, legal
  and dependency risks each have likelihood/impact, trigger, mitigation, contingency and owner. These
  business risks need no fabricated conformance violation; map actual violations to the finding set.

---

## Financial Model

A financial model is the artifact's numbers under stated assumptions. Inputs are an evidence record;
outputs are statements and scenarios. The ADLC Cost Ledger makes the operating cost of an agent-run
pipeline visible rather than assumed.

### Measurement basis and horizon

Declare currency, FX date if used, period cadence, opening balances, model horizon, accounting basis,
actuals cut-off and source revision. Show monthly cash for at least the first 12 months; extend through
the next funding/viability milestone and justify the later cadence. This is a planning model, not a
jurisdiction-independent accounting policy.

Keep **bookings**, **billings**, **recognized revenue**, **collected cash**, **refunds** and **taxes
collected for others** on distinct rows. Forecasts never become actuals because a scenario was accepted.
State the recognition policy and delivery/performance evidence; prepaid cash may remain a liability,
and earned invoiced revenue may be receivable. First-dollar validation requires actual net customer
payment evidence, excluding financing, internal transfers and test payments. Preserve the existing
`revenue-recognized-unpaid` finding name for unsupported revenue/cash or traction claims; it does not
prohibit a properly supported accrual receivable.

**Reference implementation — accounting context:** [IFRS 15](https://www.ifrs.org/issued-standards/list-of-standards/ifrs-15-revenue-from-contracts-with-customers/)
links revenue recognition to satisfaction of performance obligations, not simply the receipt of cash.
Record the basis applicable to the venture; this example selects no accounting jurisdiction.

### Assumption Register

```markdown
| ID | Assumption | Value | Unit | Source | Disposition | Dated | Drives |
|---|---|---|---|---|---|---|---|
| A1 | [price per unit] | [n] | [currency/unit] | [GTM stream, WTP evidence] | confirmed \| unverified | YYYY-MM-DD | revenue |
| A2 | [token cost per served unit] | [n] | [currency/unit] | [harness cost log, TAD token budget] | confirmed \| unverified | YYYY-MM-DD | COGS |
| A3 | [conversion at first-dollar step] | [n] | ratio | [GTM learn-loop] | confirmed \| unverified | YYYY-MM-DD | volume |
| A4 | [gross retention / churn] | [n] | ratio | [observed or unverified] | confirmed \| unverified | YYYY-MM-DD | LTV |
```

For each input also record owner, applicable segment/cohort, actual vs forecast, low/base/high values,
refresh trigger and dependent formula IDs. `confirmed` means supported for that scope and date; it does
not convert a forecast into an observed outcome. Missing inputs stay unknown, never silently zero.

### Driver schedule

| Schedule | Required bridge / consistency |
|---|---|
| Customer cohorts | opening active + new + reactivated − churned = closing active; acquisition and retention by cohort |
| Demand to delivery | reachable leads × conversion, sales-cycle lag and capacity ceiling; usage per active customer |
| Revenue to cash | units × net price under stated recognition; invoicing/collection lag, receivables, prepayments, refunds |
| Costs and capacity | variable serving costs; fixed people/tools/operations; hiring dates, support load and free-quota headroom |
| Working capital and funding | collection/payment timing, inventory if relevant, taxes, capex/depreciation, debt/equity/grants |

### Unit Economics

```markdown
| Row | Formula | Source assumptions |
|---|---|---|
| Price per unit | A1 | A1 |
| COGS per unit | attributable serving infra + serving tokens + settlement + variable fulfilment/support | A2, allocated cost rows |
| Gross margin | (price − COGS) / price | A1, allocated serving costs |
| Contribution per unit | net price − all variable costs, each allocated once | selling + serving + fulfilment costs |
| CAC | attributable acquisition spend / new paying customers in the matching cohort/window | A3, GTM channel |
| LTV | cohort contribution over a stated horizon; steady-state shortcut only with supported retention | A1, A2, A4 |
| LTV:CAC | LTV / CAC | |
| Payback (months) | first month cumulative cohort contribution covers CAC; constant-cost shortcut only when justified | cohort schedule |
| Contribution after allocated ADLC cost | contribution − ADLC cost not already included above | ADLC allocation, no double count |
```

### Statements

```markdown
## Income statement (period [YYYY-MM])
| Line | Value | Source |
|---|---|---|
| Recognized revenue (actual / forecast separate) | | recognition policy + delivered units / assumptions |
| COGS (incl. token cost) | | A2, TCO |
| Gross profit | | |
| Operating expense (people, tools, ADLC ledger) | | headcount, TCO, ledger |
| Operating result | | gross profit − operating expense |
| Net result | | operating result + other income − interest − tax |

## Cash flow (period [YYYY-MM])
| Line | Value | Source |
|---|---|---|
| Operating cash | | customer collections − operating payments − taxes; reconcile net result + noncash + working capital |
| Investing cash | | capitalized spend |
| Financing cash | | capitalization / ask |
| Net change | | |
| Ending cash | | opening cash + net change |
| Runway (months) | first forecast period below the stated minimum cash floor | scenario cash schedule |

## Balance sheet
| Line | Value | Source |
|---|---|---|
| Assets | | cash + receivables + inventory + net fixed assets, as applicable |
| Liabilities | | payables + deferred revenue + debt + taxes due, as applicable |
| Equity | | opening equity + contributions + net result − distributions |
| Balance check | 0 | assets − liabilities − equity |

A discovery sketch may defer statements with an owner and trigger, but cannot claim a complete financial
model. Pre-revenue status alone does not remove opening cash, founder capital or other balances.
```

### Use of funds and capitalization

```markdown
| Use | Amount | Roadmap phase | Check |
|---|---|---|---|
| [named work] | [currency] | [R-id] | [named check] |

| Claim | Instrument | Outstanding | Dilution of this ask |
|---|---|---|---|
| [holder function] | [equity / debt / grant / none] | [n] | [ratio or n/a] |
```

### ADLC Cost Ledger

```markdown
| Line | Source of record | Period | Value | Attribution |
|---|---|---|---|---|
| Active operator minutes | task receipts, per-task budgets | month | [n] | per change set |
| Token spend | harness cost logs, guideline load budget | month | [currency] | per pipeline call |
| Provider CI minutes | CI observation records | month | [n] | wait vs execution |
| Provider and hosting fees | TCO rows per deployment model | month | [currency] | per model, unblended |
| Avoidable-block cost | blocked-verdict counts × mean recovery minutes | month | [n] | per block class |
```

Give each ledger entry a unique receipt/event ID, source revision, task/change ID, cost class, unit,
actual/estimate label and model allocation. Include discovery, failed checks, retries, abandoned work,
maintenance and incidents when incurred; a merge receipt is not a prerequisite for a cost period.
Record missing telemetry explicitly. Separate active work, provider execution and waiting; do not add
recovery minutes a second time when already counted in active minutes. Keep cash and imputed labor
columns separate, and distinguish development cost from per-customer serving cost.

### Scenario Set

```markdown
| Scenario | Changed assumptions | Revenue / collected cash | Monthly burn | Runway (months) | Break-even month |
|---|---|---|---|---|---|
| Base | none | | | | |
| Downside | [A-ids and values] | | | | |
| Upside | [A-ids and values] | | | | |
```

**Directives**:
- Register every model input with value, unit, source, disposition, and date — `financial-assumption-unsourced`; an `unverified` input driving a headline row is labelled on that row
- Apply the declared measurement basis; separate actuals, forecasts, recognized revenue and collected cash, with reconciliation and payment evidence for first-dollar claims — `revenue-recognized-unpaid`
- Carry serving-token costs in COGS; classify development/research tokens by the stated accounting policy, without charging them again as serving costs — `missing-economics-metric`
- Carry TCO per deployment model as separate rows — `blended-deployment-tco`
- Produce linked income, cash-flow and balance-sheet statements with reconciled periods and opening balances; mark discovery deferrals incomplete — `scenario-set-incomplete`
- Include LTV and LTV:CAC rows when CAC is stated; label insufficient retention data `unverified` and zero-denominator results undefined rather than inventing ratios — `financial-assumption-unsourced`
- Ledger ADLC operating cost from execution receipts and observations; omitting the ledger, or filling it from estimates when receipts exist, is `adlc-cost-unledgered`
- Provide Base, Downside, and Upside with identical row structure, each stating runway and break-even month — `scenario-set-incomplete`
- Run sensitivity on the three assumptions with the largest effect on runway and state them by ID
- Tie use-of-funds rows to named Roadmap phases; an equity ask without capitalization rows is `financial-assumption-unsourced`
- Derive every headline row the Pitch Deck projects from this model at the same revision — `pitch-claim-unsourced`

### Reconciliation and edge-case checks

Record named checks and results at the model revision, including:

1. Every formula resolves to assumption/schedule IDs; no hidden constants, mixed currencies or stale
   periods. All three scenarios share formulas and periods; only declared driver values change.
2. Assets − liabilities − equity = 0; closing cash agrees between cash flow and balance sheet; each
   opening balance equals the prior close; retained earnings reconcile to net result and distributions.
3. Revenue, receivables, customer advances, collections and refunds reconcile under the declared policy;
   bookings, financing and taxes collected for others cannot inflate customer revenue.
4. Cost allocations sum to each source receipt exactly once; model and deck headline values agree.
5. Test zero customers, zero price, zero CAC, missing churn, prepaid sales, refunds and delayed receipts.
   Undefined margin/CAC/LTV/payback remains labelled; non-positive burn is `no depletion within horizon`
   only when the forecast supports it. A cash deficit in an earlier month cannot be hidden by later funds.
6. Define break-even (operating, contribution or cash) and report `not reached within horizon` when
   appropriate. Rank sensitivities by impact, include downside combined-driver stress, and tie cash-floor
   breach to a dated contingency, owner and next decision.

These checks discharge the existing assumption, scenario and evidence findings. They are obligations
for instantiated models; this guideline's structural checker does not validate a venture's spreadsheet.

### Free-core and cost classification

Zero-spend delivery uses FOSS and eligible free quotas with recorded limits, headroom, reset conditions
and a stop/local/offline fallback. No scenario authorizes a paid plan, addon or overage. A forecast
exceeding free capacity is an unmet constraint with reduced volume or a redesign, not permission to pay.
Separate cash paid, quota consumption, estimated economic cost and operator opportunity cost. Free
hosting is not itself a FOSS license. Financing forecasts likewise grant no spending authority.

---

## ADLC Seam

The financial model reads execution facts; it does not create them.

| Execution fact | Owner | Financial Model reads it as |
|---|---|---|
| Per-task token, iteration, wall-clock budgets and actuals | ADLC Guidelines — Per-Task Budgets | Token spend and active minutes |
| Integration Receipt, block verdicts, recovery | Execution Contract, Atomic Lane Convergence | Avoidable-block cost |
| Bound CI observation | Runtime Readiness Enforcement | Provider CI minutes, wait vs execution |
| Lane admission and cleanup receipts | Scoped Lane Admission, Proportionate Closeout | Retained-lane carrying cost (optional) |
| START / RELEASE / DEPLOY receipts | Production Release Lifecycle | Period attribution for the ledger |

**Directives**:
- Read execution cost from the ADLC set's receipts by exact reference — `duplicate-owner`
- Attribute cost per change set where receipts allow it, so the Pitch Deck economics slide and the Business Plan operations section cite the same ledger period — `status-conflict`

---

## Conformance Findings

This module raises the six `Venture Record` types enumerated by the
[verification module](./prd-tad-adr-mvp-gtm-verification.md#finding-enumeration) —
`pitch-claim-unsourced`, `market-size-single-method`, `financial-assumption-unsourced`,
`revenue-recognized-unpaid`, `scenario-set-incomplete`, `adlc-cost-unledgered` — and records against
the parent's existing types where an existing type already names the violation:
`artifact-naming-noncompliant`, `stale-evidence`, `missing-demo-beat`, `vendor-coupling`,
`constraint-gate-skipped`, `roadmap-scope-silently-dropped`, `unproven-claim`, `gate-order-drift`,
`missing-economics-metric`, `blended-deployment-tco`, `duplicate-owner`, `status-conflict`,
`cid-density-violation`.

`scenario-set-incomplete` covers a missing Base/Downside/Upside pair, a missing runway or break-even,
a missing income statement, a missing cash-flow statement, and a balance sheet omitted without reason.

---

## Reference Implementation

Non-binding per Scope & Neutrality. A solo operator instantiates this module as: one joined
`PRD-TAD-ADR-MVP-GTM` per increment; one twelve-slide register whose Reveal replays the increment's
Demo Skeleton; one business plan whose operations section is the recorded lane topology; and one
financial model whose ADLC Cost Ledger is filled from test receipts, harness cost logs, and bound
CI observations. No vendor, funder, or provider is named here.

---

## Validation Checklist

- [ ] Every projection carries `continuity_id@revision` and regenerates when the revision changes
- [ ] Every slide, plan section, and model row cites the artifact section or Evidence Reference it projects
- [ ] Slide Register bounds sum within the stated speaking budget; Reveal anchors to the MVP VCC
- [ ] Market sized by two cited methods and reconciled
- [ ] Risk register includes business risks and open findings; every open `blocker` present
- [ ] Legal/IP/regulatory applicability, owner and review evidence stated; unknowns remain open
- [ ] Assumption register complete: value, unit, source, disposition, date, driver
- [ ] Actuals, forecasts, recognized revenue and collected cash separated and reconciled
- [ ] Serving costs, development cost and cash/imputed cost separated; unsupported ratios labelled
- [ ] Three linked statements reconcile; reduced discovery sketches explicitly incomplete
- [ ] Use of funds tied to Roadmap phases; capitalization present for an equity ask
- [ ] ADLC Cost Ledger filled from receipts for the stated period
- [ ] Base, Downside, Upside present with runway and break-even; top three drivers named by ID
- [ ] All competitor, platform, and vendor names under a "reference implementation" label

---

## Mantra Application

**"Projections consume, never originate · Every slide cites its section · Cash and recognized revenue differ · Serving tokens are COGS · Statements and runway travel together · The lifecycle has a ledger line"**
