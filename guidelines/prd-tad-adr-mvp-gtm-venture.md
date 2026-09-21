---
title: "PRD, TAD & ADR Venture Record Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-09-21"
lang: "en-US"
frontmatter_contract: "required"
owner: "Venture record contract"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "2.8.0"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# PRD, TAD & ADR Venture Record Module

## Scope & Ownership

This module owns three **audience projections** of the joined `PRD-TAD-ADR-MVP-GTM` artifact and the
cost ledger that feeds them:

1. **Pitch Deck** — a bounded, time-boxed narrative projection for a funder, partner, or first customer.
2. **Business Plan** — an operating projection: segment, offer, market, competition, operations, team, risks, milestones.
3. **Financial Model** — a quantified projection: assumption register, unit economics, scenarios, runway, ADLC cost ledger.

Each is a *consumer*. Every claim in a projection resolves to one section of the joined artifact at one
exact revision, or to one Evidence Reference; none originates a requirement, design, decision, or
number. A projection is regenerated from the artifact, never edited into a competing source of truth.

This module inherits the parent set's Scope & Neutrality Contract, Rule Identity derivation, finding
recording contract, and the [five section roles](./prd-tad-adr-mvp-gtm-planning-record.md#unified-artifact-composition).
Monetization labels (`mechanism-proven`, `demand-validated`), pain labels (`unvalidated`, `demand-proven`),
readiness rungs, TCO variants, and the selection pipeline stay with their owners and are consumed by
exact name. Execution cost facts come from the [ADLC Guidelines](./adlc-guidelines.md) receipts and
budgets; this module reads them, it does not redefine them.

---

## Projection Contract

| Projection | Consumes from the joined artifact | Adds | Never adds |
|---|---|---|---|
| Pitch Deck | PRD pain and segment, MVP Demo Skeleton, GTM first-dollar path, readiness rungs, Financial Model headline rows | Ordering, time bounds, the ask | A capability, metric, or number absent from the artifact |
| Business Plan | All five roles, ADR selection records, Roadmap, Lane Topology, Role—Action—Outcome | Market sizing, operations narrative, risk register drawn from open findings | A requirement or decision first stated here |
| Financial Model | GTM streams and labels, TAD budgets and TCO rows, Roadmap phases, ADLC execution receipts | Assumption register, unit economics, scenarios, runway, sensitivity | Revenue from anything other than collected payment |

**Directives**:
- Join every projection to the artifact by `continuity_id@revision` in its frontmatter; a projection joined by path or with no join is `artifact-naming-noncompliant`
- Cite, for every claim, the owning section anchor or Evidence Reference it projects; an uncited claim, or one whose cited section does not contain it, is `pitch-claim-unsourced` whichever projection carries it
- Label every forward-looking statement by its evidence status using the owners' vocabulary — `unvalidated`, `mechanism-proven`, `demand-validated`, or collected revenue; an unlabelled projection of an unvalidated pain or stream is `pitch-claim-unsourced`
- Regenerate a projection when its joined revision changes; a projection at a stale revision is `stale-evidence` and blocks only the audience action that depends on it
- Keep each projection a separately loadable document or section under the parent's file budget; a projection that inlines the artifact it projects is a `cid-density-violation`

---

## Pitch Deck

A pitch deck is the Demo Skeleton's beat table extended to an audience with a decision to make. It is
bounded in slides and in minutes, and its Reveal is the same VCC the Demo Skeleton reveals.

### Slide Register

```markdown
| # | Slide role | Projects | Evidence status | Bound |
|---|---|---|---|---|
| 1 | Problem | PRD Pain-Point Mapping `[P-id]` | `unvalidated` \| `demand-proven` | [s] |
| 2 | Who pays | GTM payer segment, WTP evidence | `unvalidated` \| `demand-validated` | [s] |
| 3 | Solution | MVP slice, Domain-Object Rubric current level | derived rung | [s] |
| 4 | Reveal | Demo Skeleton Reveal beat, VCC `[id]` | Evidence Reference | [s] |
| 5 | Why now / why us | ADR selection record, Division of Work reuse | recorded decision | [s] |
| 6 | Traction | Collected revenue, `mechanism-proven` / `demand-validated` counts | recorded | [s] |
| 7 | Economics | Financial Model headline rows (price, margin, payback, runway) | assumption register | [s] |
| 8 | Roadmap | Roadmap phases R1..Rn with prerequisites | recorded | [s] |
| 9 | Ask | One instrument, one amount, one use-of-funds tied to Roadmap phases | stated | [s] |
```

**Directives**:
- Carry a Slide Register with one row per slide, each naming what it projects and its evidence status; a slide with no row, or a row with no bound, is `missing-demo-beat`
- Bound total speaking time and keep the sum of slide bounds within it; forbid a deck whose bounds sum past the stated budget
- Anchor the Reveal slide to the MVP Demo Skeleton's Reveal beat and its VCC; a Reveal that narrates a capability instead of showing the acceptance condition is `pitch-claim-unsourced`
- Present traction as counts under the owners' labels — collected revenue separately from `demand-validated` separately from `mechanism-proven`; blending them is `revenue-recognized-unpaid`
- State one ask tied to named Roadmap phases and to the Financial Model's use-of-funds rows; an ask with no phase or row behind it is `pitch-claim-unsourced`
- Keep every competitor, platform, or vendor name under a block whose own text says "reference implementation"; otherwise it is `vendor-coupling`

---

## Business Plan

A business plan is the joined artifact read as an operating system for one segment. It restates
nothing; it orders and sizes.

### Section Contract

| Section | Projects | Owning rules consumed | Module-specific obligation |
|---|---|---|---|
| Segment & problem | PRD Pain-Point Mapping | Pain labels | One primary segment named; others marked `Won't (this increment)` |
| Offer & MVP | MVP slice, Domain-Object Rubric | Readiness Ladder | Current rung stated from Evidence References only |
| Market sizing | GTM payer segment | — | Two independent methods, both cited (see below) |
| Competition & positioning | ADR selection records | Selection pipeline | Alternatives appear only as Stage 1/2 candidates with dispositions |
| Go-to-market | GTM first-dollar ranking, Roadmap | Monetization, Roadmap | Streams in recorded time-to-first-dollar order |
| Operations | Lane Topology, Deploy Boundary Register, Division of Work, ADLC lanes and budgets | Lane Topology, ADLC Guidelines | Every operating boundary named `closed` unless an operator instruction is referenced |
| Team & roles | Role—Action—Outcome | RAO | Roles by function; the Evaluator listed as a mechanism, never a person |
| Risks | Open conformance findings, unresolved rubric gaps, `unverified` grounding claims | Conformance Findings | Each risk cites its finding type and owner |
| Milestones | Roadmap phases, readiness rungs | Roadmap, Readiness Ladder | A milestone claims a rung only with the Evidence Reference that earns it |

**Market sizing method**:

```markdown
| Method | Population source | Filter chain | Result | Cited |
|---|---|---|---|---|
| Top-down | [named external source, date] | [segment filters] | [n units / currency] | [ref] |
| Bottom-up | [observed reachable accounts or channel capacity] | [conversion assumptions from register] | [n units / currency] | [ref] |
| Reconciliation | — | ratio and stated explanation of the gap | — | — |
```

**Directives**:
- Size the market by at least two independent methods, each with a cited population source and its date, and reconcile the gap; one method, or an uncited population, is `market-size-single-method`
- Draw the risk register from the open finding set and unresolved grounding claims; a risk with no finding type or owner is `pitch-claim-unsourced`, and a known open `blocker` omitted from risks is `roadmap-scope-silently-dropped`
- State every milestone's rung from Evidence References; a milestone rung authored ahead of evidence is `unproven-claim`
- Write operations as the recorded lane topology and ADLC budgets; a narrated process that contradicts the Deploy Boundary Register or the per-task budgets is `gate-order-drift`
- Name competitors only as candidates in a recorded selection pipeline under a "reference implementation" label; a comparison table with no constraint dispositions is `constraint-gate-skipped`

---

## Financial Model

A financial model is the artifact's numbers under stated assumptions. Its inputs are an evidence
record, its outputs are scenarios, and its ADLC cost ledger is what makes the operating cost of an
AI-native, agent-run pipeline visible rather than assumed.

### Assumption Register

```markdown
| ID | Assumption | Value | Unit | Source | Disposition | Dated | Drives |
|---|---|---|---|---|---|---|---|
| A1 | [price per unit] | [n] | [currency/unit] | [GTM stream, WTP evidence ref] | confirmed \| unverified | YYYY-MM-DD | revenue |
| A2 | [token cost per served unit] | [n] | [currency/unit] | [harness cost log, TAD token budget] | confirmed \| unverified | YYYY-MM-DD | COGS |
| A3 | [conversion at first-dollar step] | [n] | ratio | [GTM learn-loop measurement] | confirmed \| unverified | YYYY-MM-DD | volume |
```

### Unit Economics

```markdown
| Row | Formula | Base | Source assumptions |
|---|---|---|---|
| Price per unit | A1 | | A1 |
| COGS per unit | infra per unit + token cost per unit + settlement fee | | A2, TCO rows |
| Gross margin | (price − COGS) / price | | |
| CAC | acquisition spend / paid conversions | | A3, GTM channel |
| Payback (months) | CAC / (monthly gross profit per payer) | | |
| Contribution after ADLC cost | gross profit − ADLC cost per unit | | ADLC Cost Ledger |
```

### ADLC Cost Ledger

The operating cost of the development lifecycle itself is a model line, sourced from execution
receipts and observations rather than estimated once and forgotten.

```markdown
| Line | Source of record | Period | Value | Attribution |
|---|---|---|---|---|
| Active operator minutes | task receipts, per-task budgets | month | [n] | per change set |
| Token spend | harness cost logs, guideline load budget | month | [currency] | per pipeline call |
| Provider CI minutes | CI observation records | month | [n] | wait vs execution |
| Provider and hosting fees | TCO rows per deployment model | month | [currency] | per model, unblended |
| Avoidable-block cost | blocked-verdict counts × mean recovery minutes | month | [n] | per block class |
```

### Scenario Set and Runway

```markdown
| Scenario | Changed assumptions | Monthly revenue (collected) | Monthly burn | Runway (months) | Break-even month |
|---|---|---|---|---|---|
| Base | none | | | | |
| Downside | [A-ids and values] | | | | |
| Upside | [A-ids and values] | | | | |
```

**Directives**:
- Register every model input with value, unit, source, disposition, and date; an input with no source or disposition is `financial-assumption-unsourced`, and an `unverified` input driving a headline row is stated as such on that row
- Recognize revenue only from collected payment; pipeline, `demand-validated` WTP, signed-unpaid pilots, and test transactions appear on their own labelled rows, never in revenue — otherwise `revenue-recognized-unpaid`
- Carry token cost per served unit as an explicit COGS component sourced from the harness cost log; a model with AI-served units and no token line is `missing-economics-metric`
- Carry TCO per deployment model as separate rows from the owner's variant table; a blended infrastructure line is `blended-deployment-tco`
- Ledger ADLC operating cost — active minutes, token spend, CI minutes, provider fees, avoidable-block cost — from execution receipts and observations; a model that omits the ledger, or fills it from estimates when receipts exist, is `adlc-cost-unledgered`
- Provide at least Base, Downside, and Upside scenarios with identical row structure, each stating runway and break-even month; a missing scenario, runway, or break-even is `scenario-set-incomplete`
- Run sensitivity on the three assumptions with the largest effect on runway and state them by ID; forbid a scenario set whose drivers are unnamed
- Derive every headline row the Pitch Deck projects from this model at the same revision; a deck number absent from the model is `pitch-claim-unsourced`

---

## ADLC Seam

The financial model reads execution facts; it does not create them. The seam is one-directional:

| Execution fact | Owner | Financial Model reads it as |
|---|---|---|
| Per-task token, iteration, wall-clock budgets and actuals | ADLC Guidelines — Per-Task Budgets | Token spend and active minutes lines |
| Integration Receipt, block verdicts, recovery | ADLC Guidelines — Execution Contract, Atomic Lane Convergence | Avoidable-block cost line |
| Bound CI observation | ADLC Guidelines — Runtime Readiness Enforcement | Provider CI minutes, wait vs execution |
| Lane admission and cleanup receipts | Scoped Lane Admission, Proportionate Closeout | Retained-lane carrying cost (optional line) |

**Directives**:
- Read execution cost from the ADLC set's receipts by exact reference; a financial model that restates a budget, receipt shape, or verdict vocabulary is `duplicate-owner`
- Attribute cost per change set where receipts allow it, so the Pitch Deck's economics slide and the Business Plan's operations section cite the same ledger period; two projections citing different periods for one line is `status-conflict`

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

---

## Reference Implementation

Non-binding per Scope & Neutrality. A solo operator running an AI-native product across several
repositories instantiates this module as: one joined `PRD-TAD-ADR-MVP-GTM` per product increment; one
nine-slide register whose Reveal replays the increment's Demo Skeleton; one business plan whose
operations section is the recorded lane topology and cleanup policy of the repository catalog; and one
financial model whose ADLC Cost Ledger is filled monthly from test receipts, harness cost logs, and
bound CI observations, with the avoidable-block line derived from recorded block-verdict classes. No
vendor, funder, or provider is named; the operator states their own in their own instantiation.

---

## Validation Checklist

- [ ] Every projection carries `continuity_id@revision` and regenerates when the revision changes
- [ ] Every slide, plan section, and model row cites the artifact section or Evidence Reference it projects
- [ ] Slide Register bounds sum within the stated speaking budget; Reveal anchors to the MVP VCC
- [ ] Market sized by two cited methods and reconciled
- [ ] Risk register drawn from open findings; every open `blocker` present
- [ ] Assumption register complete: value, unit, source, disposition, date, driver
- [ ] Revenue rows contain collected payment only; other signals on labelled rows
- [ ] Token cost and unblended TCO present as COGS components
- [ ] ADLC Cost Ledger filled from receipts and observations for the stated period
- [ ] Base, Downside, Upside present with runway and break-even; top three drivers named by ID
- [ ] All competitor, platform, and vendor names under a "reference implementation" label

---

## Mantra Application

**"Projections consume, never originate · Every slide cites its section · Revenue is collected money only · Token cost is COGS · The lifecycle has a ledger line · Three scenarios, one runway each"**
