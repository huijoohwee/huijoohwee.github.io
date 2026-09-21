---
title: "PRD, TAD & ADR Venture Record Module"
doc_type: "Guidelines Module"
version: "2.0.0"
date: "2026-09-21"
lang: "en-US"
frontmatter_contract: "required"
owner: "Venture record contract"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "3.0.0"
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
or to one Evidence Reference. None originates a requirement, design, decision, or number. A projection
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
| Business Plan | All five roles, ADR records, Roadmap, Lane Topology, RAO, open findings | Market sizing, acquisition narrative, legal/IP, capitalization | A requirement or decision first stated here |
| Financial Model | GTM streams, TAD budgets and TCO, Roadmap, ADLC receipts, WTP evidence | Assumption register, statements, scenarios, runway, sensitivity | Revenue from anything other than collected payment |

**Directives**:
- Join every projection by `continuity_id@revision` in frontmatter — `artifact-naming-noncompliant`
- Cite, for every claim, the owning section or Evidence Reference — `pitch-claim-unsourced`
- Label every forward-looking statement with the owners' vocabulary; an unlabelled projection of an unvalidated pain or stream is `pitch-claim-unsourced`
- Regenerate when the joined revision changes — `stale-evidence` blocks only the audience action that depends on it
- Keep each projection separately loadable under the parent's file budget — `cid-density-violation`

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
| 8 | Competition | ADR Stage 1/2 candidates | dispositions | [s] |
| 9 | Traction | Collected revenue; `mechanism-proven` / `demand-validated` counts | recorded | [s] |
| 10 | Economics | Model headlines: price, margin, LTV:CAC, payback, runway | assumption register | [s] |
| 11 | Roadmap | Roadmap phases R1..Rn with prerequisites | recorded | [s] |
| 12 | Ask | Instrument, amount, use-of-funds, capitalization if equity | stated | [s] |
```

**Directives**:
- Carry a Slide Register with one row per slide, each naming what it projects, its evidence status, and a bound; a slide with no row or bound is `missing-demo-beat`
- Bound total speaking time; forbid a deck whose bounds sum past the stated budget
- Anchor the Reveal slide to the MVP Demo Skeleton's Reveal beat and its VCC — `pitch-claim-unsourced`
- Present traction as counts under the owners' labels; blending them is `revenue-recognized-unpaid`
- State one ask tied to named Roadmap phases, use-of-funds rows, and capitalization when the instrument is equity — `pitch-claim-unsourced`
- Keep every competitor, platform, or vendor name under a "reference implementation" label — `vendor-coupling`

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
| Competition & positioning | ADR selection records | Candidates with Stage 1/2 dispositions only |
| Go-to-market & acquisition | GTM ranking, Roadmap | Streams in time-to-first-dollar order; named channels |
| Operations | Lane Topology, Deploy Boundary, ADLC budgets | Every boundary `closed` unless an operator instruction is referenced |
| Team & hiring | Role—Action—Outcome, headcount plan | Roles by function; Evaluator is a mechanism, never a person |
| Legal, IP, regulatory | TAD constraints, ADRs | Status of each obligation; `Won't` if none apply, stated |
| Capitalization | Financial Model cap rows | Instrument, outstanding claims, dilution of the ask |
| Risks | Open findings, unresolved rubric gaps, `unverified` grounding | Each risk cites finding type and owner |
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
- Draw the risk register from the open finding set; a risk with no finding type or owner is `pitch-claim-unsourced`; a known open `blocker` omitted from risks is `roadmap-scope-silently-dropped`
- State every milestone's rung from Evidence References — `unproven-claim`
- Write operations as the recorded lane topology and ADLC budgets — `gate-order-drift`
- Name competitors only as candidates in a recorded selection pipeline under a "reference implementation" label — `constraint-gate-skipped`
- State legal, IP, and regulatory status, or mark `Won't (this increment)` with a reason
- State capitalization whenever an equity ask exists; otherwise `financial-assumption-unsourced`

---

## Financial Model

A financial model is the artifact's numbers under stated assumptions. Inputs are an evidence record;
outputs are statements and scenarios. The ADLC Cost Ledger makes the operating cost of an agent-run
pipeline visible rather than assumed.

### Assumption Register

```markdown
| ID | Assumption | Value | Unit | Source | Disposition | Dated | Drives |
|---|---|---|---|---|---|---|---|
| A1 | [price per unit] | [n] | [currency/unit] | [GTM stream, WTP evidence] | confirmed \| unverified | YYYY-MM-DD | revenue |
| A2 | [token cost per served unit] | [n] | [currency/unit] | [harness cost log, TAD token budget] | confirmed \| unverified | YYYY-MM-DD | COGS |
| A3 | [conversion at first-dollar step] | [n] | ratio | [GTM learn-loop] | confirmed \| unverified | YYYY-MM-DD | volume |
| A4 | [gross retention / churn] | [n] | ratio | [observed or unverified] | confirmed \| unverified | YYYY-MM-DD | LTV |
```

### Unit Economics

```markdown
| Row | Formula | Source assumptions |
|---|---|---|
| Price per unit | A1 | A1 |
| COGS per unit | infra + token cost + settlement fee | A2, TCO rows |
| Gross margin | (price − COGS) / price | |
| CAC | acquisition spend / paid conversions | A3, GTM channel |
| LTV | gross profit per period × expected periods | A1, A2, A4 |
| LTV:CAC | LTV / CAC | |
| Payback (months) | CAC / monthly gross profit per payer | |
| Contribution after ADLC cost | gross profit − ADLC cost per unit | ADLC Cost Ledger |
```

### Statements

```markdown
## Income statement (period [YYYY-MM])
| Line | Value | Source |
|---|---|---|
| Collected revenue | | payment evidence |
| COGS (incl. token cost) | | A2, TCO |
| Gross profit | | |
| Operating expense (people, tools, ADLC ledger) | | headcount, TCO, ledger |
| Operating result | | |

## Cash flow (period [YYYY-MM])
| Line | Value | Source |
|---|---|---|
| Operating cash | | income statement + working capital |
| Investing cash | | capitalized spend |
| Financing cash | | capitalization / ask |
| Net change | | |
| Ending cash | | |
| Runway (months) | ending cash / monthly burn | |

## Balance sheet
Present, or omit with the stated reason `[pre-revenue / no capitalized assets / not applicable this increment]`.
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

### Scenario Set

```markdown
| Scenario | Changed assumptions | Collected revenue | Monthly burn | Runway (months) | Break-even month |
|---|---|---|---|---|---|
| Base | none | | | | |
| Downside | [A-ids and values] | | | | |
| Upside | [A-ids and values] | | | | |
```

**Directives**:
- Register every model input with value, unit, source, disposition, and date — `financial-assumption-unsourced`; an `unverified` input driving a headline row is labelled on that row
- Recognize revenue only from collected payment; WTP, unpaid pilots, and test transactions sit on labelled rows — `revenue-recognized-unpaid`
- Carry token cost per served unit as COGS sourced from the harness cost log — `missing-economics-metric`
- Carry TCO per deployment model as separate rows — `blended-deployment-tco`
- Produce income statement and cash-flow statement for the same period as the ADLC Cost Ledger; omit a balance sheet only with a stated reason — `scenario-set-incomplete`
- State LTV and LTV:CAC when CAC is stated; a CAC without an LTV row is `financial-assumption-unsourced`
- Ledger ADLC operating cost from execution receipts and observations; omitting the ledger, or filling it from estimates when receipts exist, is `adlc-cost-unledgered`
- Provide Base, Downside, and Upside with identical row structure, each stating runway and break-even month — `scenario-set-incomplete`
- Run sensitivity on the three assumptions with the largest effect on runway and state them by ID
- Tie use-of-funds rows to named Roadmap phases; an equity ask without capitalization rows is `financial-assumption-unsourced`
- Derive every headline row the Pitch Deck projects from this model at the same revision — `pitch-claim-unsourced`

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
- [ ] Risk register drawn from open findings; every open `blocker` present
- [ ] Legal/IP/regulatory stated or marked `Won't` with a reason
- [ ] Assumption register complete: value, unit, source, disposition, date, driver
- [ ] Revenue rows contain collected payment only
- [ ] Token cost and unblended TCO present as COGS; LTV stated when CAC is stated
- [ ] Income statement and cash flow present; balance sheet present or omitted with reason
- [ ] Use of funds tied to Roadmap phases; capitalization present for an equity ask
- [ ] ADLC Cost Ledger filled from receipts for the stated period
- [ ] Base, Downside, Upside present with runway and break-even; top three drivers named by ID
- [ ] All competitor, platform, and vendor names under a "reference implementation" label

---

## Mantra Application

**"Projections consume, never originate · Every slide cites its section · Revenue is collected money only · Token cost is COGS · Statements and runway travel together · The lifecycle has a ledger line"**
