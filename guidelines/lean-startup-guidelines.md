---
title: "Lean Startup Guidelines"
doc_type: "Guidelines Module"
version: "1.1.0"
date: "2026-09-30"
lang: "en-US"
frontmatter_contract: "required"
owner: "Validated-learning loop contract"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "3.4.0"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Lean Startup Guidelines

From 0 to 1, the riskiest question is rarely whether something can be built; it is whether a named
segment will change behaviour and pay. This module owns the validated-learning loop that answers that
question with the least time, spend and code: hypotheses, experiments, the MVP as a learning vehicle,
innovation accounting and the pivot-or-persevere decision. The loop produces evidence. The labels that
evidence earns stay with their owners in the
[PRD-TAD-ADR-MVP-GTM Guidelines](./prd-tad-adr-mvp-gtm-guidelines.md).

---

## Scope & Ownership

| Concern | Owner | This module |
|---|---|---|
| Pain labels `unvalidated`, `demand-proven` | [Pain-Point Mapping](./prd-tad-adr-mvp-gtm-guidelines.md#pain-point-to-feature-mapping) | supplies the quote, ticket, behaviour or payment evidence a label needs |
| `mechanism-proven`, `demand-validated`, first dollar | [Monetization](./prd-tad-adr-mvp-gtm-guidelines.md#monetization) | supplies the validation result the owner requires |
| Phase order and gates | [Process & Flow Patterns](./prd-tad-adr-mvp-gtm-process-flows.md#phase-0--problem-discovery) | runs inside Phase 0 and the Phase 5 learn loop; adds no phase |
| Stop, pivot thresholds and exit VCCs | [Roadmap](./prd-tad-adr-mvp-gtm-guidelines.md#roadmap) | records each decision against them |
| Coverage domains C01–C16, especially C16 | [From-0-to-1 coverage contract](./prd-tad-adr-mvp-gtm-guidelines.md#from-0-to-1-coverage-contract) | updates evidence and gaps; never re-decides a disposition |
| Experiment record fields | [Business Plan — market, acquisition and operating detail](./prd-tad-adr-mvp-gtm-venture.md#market-acquisition-and-operating-detail) | consumes the fields; owns their order, design and decision |
| Assumption values and dispositions | [Assumption Register](./prd-tad-adr-mvp-gtm-venture.md#assumption-register) | proposes successor values from results; never edits the accepted row |
| Readiness rungs | [Readiness Ladder](./prd-tad-adr-mvp-gtm-guidelines.md#readiness-ladder) | never raises a rung; learning is not delivery |
| Build execution | [ADLC Execution Seam](./prd-tad-adr-mvp-gtm-guidelines.md#adlc-execution-seam) | routes any built experiment through `START → RELEASE → DEPLOY` |
| Finding names and severities | [Finding Enumeration](./prd-tad-adr-mvp-gtm-verification.md#finding-enumeration) | raises existing types only |

It inherits the parent's [Scope & Neutrality Contract](./prd-tad-adr-mvp-gtm-guidelines.md#scope--neutrality-contract),
[Rule Identity](./prd-tad-adr-mvp-gtm-guidelines.md#rule-identity--classification),
[frontmatter contract](./prd-tad-adr-mvp-gtm-guidelines.md#markdown-yaml-frontmatter-enforcement), the
[shared CID/RAO/SVO field contract](./cid-guidelines.md#shared-field-contract) and the
[recording contract](./prd-tad-adr-mvp-gtm-verification.md#recording-contract). Directive lists are
labelled artifact-bearing or advisory per Rule Identity. Records live in the joined artifact at one
`continuity_id@revision`; this module adds no document of its own. Its place in the lifecycle is the
[End-to-End Lifecycle Map](./prd-tad-adr-mvp-gtm-process-flows.md#end-to-end-lifecycle-map) rows *0 Discovery* and *Learn*.
**Terms**: *validated-learning loop* names this module's loop; a *lean sprint* is an ADLC execution policy
(time-bound, budget-driven delivery) and proves no learning; neither term implies the other.

---

## Learning Loop

```text
Hypothesis Register → riskiest first → Experiment Design → smallest artifact → Run → Measure
  → Learn → Pivot-or-Persevere Record → successor Context → next hypothesis
```

| Step | Consumes | Produces | Next step blocked without it |
|---|---|---|---|
| Hypothesize | pain rows, GTM streams, model assumptions | Hypothesis Register rows | Rank |
| Rank | register rows | one riskiest open hypothesis | Design |
| Design | hypothesis, experiment record fields | pre-registered experiment | Build |
| Build | experiment, smallest artifact type | the artifact, or an ADLC lane when code is needed | Run |
| Run | authorized experiment | raw evidence under its privacy class | Measure |
| Measure | raw evidence, metric definition | result against threshold | Learn |
| Learn | result, prior results | updated evidence status and assumption proposal | Decide |
| Decide | learning, Roadmap threshold | Pivot-or-Persevere Record | successor Context |

| Parent phase | Loop use |
|---|---|
| Phase 0 — discovery | problem, payer and channel hypotheses; no code unless the hypothesis is about feasibility |
| Phases 1–3 — PRD, TAD, ADR | results cited as pain, WTP and TTV evidence; unresolved hypotheses stay labelled |
| Phase 4 — MVP | the built slice is the experiment's artifact; its VCC and the experiment's threshold are separate |
| Phase 5 — GTM | offer, price, channel and retention experiments; outcomes enter the successor Context |

**Artifact-bearing directives**:
- Run the steps in order per experiment; a decision recorded without a pre-registered threshold or a measured result is `gate-sequence-violation`
- Keep one loop per hypothesis and bound it by time, spend and, for agent work, iterations and tokens with a circuit-breaker — `unbounded-loop` at `blocker`
- Record every loop in the joined artifact's GTM and planning records before the session ends, including inconclusive and abandoned runs — `unimplemented-guideline`

**Advisory**: a loop measured in days beats one measured in months. When a hypothesis can be tested
without building, do not build.

---

## Hypothesis Register

```markdown
| H-id | Type | Falsifiable statement | Drives | Impact | Uncertainty | Rank | Evidence status | Owner | Next experiment |
|---|---|---|---|---|---|---|---|---|---|
| H1 | problem \| payer \| value \| growth \| channel \| price \| feasibility \| viability \| obligation | [segment] will [observable behaviour] at [threshold] within [window] because [P-id] | [P-id / A-id / R-id] | high \| medium \| low | high \| medium \| low | [n] | [owner label] | [role] | [E-id] |
```

**Artifact-bearing directives**:
- Write every hypothesis so an observation can refute it, naming segment, behaviour, threshold and window; an unfalsifiable hypothesis cannot back a `Must` and remains `pain-point-not-validated`
- Join each hypothesis to the pain row, GTM stream, model assumption or Roadmap phase it drives; an orphan hypothesis is `unresolvable-reference`
- Rank by impact on viability times uncertainty, then by cost to test; test the riskiest open hypothesis first and record the reason for any other order — `roadmap-order-unexplained`
- Separate value hypotheses (users get the promised outcome) from growth hypotheses (new users arrive and pay through a channel); a growth claim argued from value evidence alone is `monetization-demand-unvalidated`
- Carry each assumption behind a `Must`, a price or a headline model row as a hypothesis until evidence confirms it; a register that omits one is `financial-assumption-unsourced`

---

## Experiment Design

The Venture Record fixes the minimum experiment fields: hypothesis, segment, offer or price, bounded
sample, time and spend, pass/fail threshold, evidence location and continue/pivot/stop decision. This
section fixes how they are designed.

```markdown
| E-id | H-id | Method (type) | Metric: definition · denominator · window | Pass / fail threshold | Minimum sample or stated uncertainty | Bounds: time · spend · tokens | Consent / privacy class | Authorizing role | Evidence location | Result | Decision |
|---|---|---|---|---|---|---|---|---|---|---|---|
```

**Artifact-bearing directives**:
- Register the metric, threshold and sample before the first observation; a threshold set or moved after seeing data turns the result into `unproven-claim`
- Define every metric with its denominator, window and cohort; a ratio without a denominator or a window chosen after the fact is `pitch-claim-unsourced` wherever it is projected
- State the minimum sample or the uncertainty a small sample leaves; a pass on a sample below its stated minimum stays inconclusive, never `demand-validated` — `monetization-demand-unvalidated`
- Keep spend within the declared bounds and the [free-core classification](./prd-tad-adr-mvp-gtm-venture.md#free-core-and-cost-classification); an experiment that needs paid capacity first passes the constraint gate — `constraint-gate-skipped`
- Record consent, data class and retention for any contact with real people; people's data stays with its existing owner, linked not copied — `unimplemented-guideline`
- Run any publication of an offer or artifact to real people at the release seam as a Boundary-crossing action, and any contact, recruitment or charge to real people as an Irreversible external commitment, each under a recorded operator decision bound to the exact audience and effect per [ADLC Tool Permission & Blast Radius](./adlc-guidelines.md#tool-permission--blast-radius); neither runs inside an execution task and an agent never starts one on its own discretion — `human-gate-unstated`, `deploy-boundary-breach`
- Keep negative, inconclusive and stopped results with the same prominence as passes; dropping them is `roadmap-scope-silently-dropped`

---

## The MVP as a Learning Vehicle

An MVP here is the smallest artifact that produces the evidence a hypothesis needs. The parent's MVP
role is the smallest evidenced product slice; the two coincide only when the hypothesis needs a working
product.

| Method (by function) | Tests | Strongest evidence it can support | Cannot support |
|---|---|---|---|
| Interview or observation | problem, current workaround, who pays | `unvalidated` pain with quotes, count and date; problem frequency | demand, WTP, price |
| Artifact review (tickets, logs, spend records) | problem size and frequency | measured behaviour behind a pain row | demand for this solution |
| Offer or landing test | stated intent to a specific offer and price | intent rate with denominator | payment, retention |
| Manual delivery | value, when a person performs the service by hand | outcome achieved per user; delivery cost | scalability, automation feasibility |
| Simulated automation | value and behaviour, when a person operates behind an automated interface | outcome and usage per user, disclosed as simulated where the audience's terms require | technical feasibility, serving cost |
| Prototype or recorded demo | usability, comprehension | task success and TTV on the prototype, labelled `concept` | delivered capability |
| Pre-sale, deposit or paid pilot | willingness to pay at a price | collected payment, the only method that supports a first dollar | repeat demand from one payment |
| Single-feature product slice built through the ADLC | value, feasibility, retention | a VCC holding with its Evidence Reference, then cohort usage | segment-wide demand from one cohort |

**Artifact-bearing directives**:
- Choose the cheapest method whose strongest evidence reaches the label the decision needs; a build chosen when a non-build method would answer the hypothesis is `cid-density-violation`
- Claim no more than the method's strongest evidence; intent, sign-ups, letters of intent and unpaid orders never become `demand-validated` or revenue — `monetization-demand-unvalidated`, `revenue-recognized-unpaid`
- Label prototypes, recorded demos and simulated automation as such in every projection; a simulated capability shown as built is `unproven-claim`
- Build a product slice only through the [ADLC Execution Seam](./prd-tad-adr-mvp-gtm-guidelines.md#adlc-execution-seam) with its own PRD VCC and [Demo Skeleton](./prd-tad-adr-mvp-gtm-guidelines.md#demo-skeleton); exposing it to real users crosses a named [Deploy Boundary](./prd-tad-adr-mvp-gtm-readiness.md#lane-topology--deploy-boundary) — `ungated-promotion`
- Keep the experiment threshold and the product VCC distinct; a VCC holding proves the build, not the hypothesis — `blended-status`
- Give agent-performed experiment work execution-integrity VCCs in the GTM role — registered before the first observation, run within bounds, result recorded against the threshold — so tasks derive from them under the [Specification to Task Bridge](./adlc-guidelines.md#specification-to-task-bridge); the VCC holds whether the hypothesis passes or fails — `unimplemented-guideline`

---

## Metrics That Decide

A metric earns a place in the loop when it is actionable (it changes a decision), accessible (its owner
can read it without special effort) and auditable (it traces to raw evidence).

**Artifact-bearing directives**:
- Measure per cohort, per user or per account with denominator and window; report cumulative totals, page views, downloads and follower counts only labelled as not evidence of value or demand — `pitch-claim-unsourced`
- Join every decision metric to a model driver or assumption ID so a result can update the model through a successor revision — `financial-assumption-unsourced`
- Keep activation, paid conversion, repeat use and retention as separate observations; a blended "traction" figure is `blended-status`
- Keep raw evidence retrievable at its privacy class and cite it by Evidence Reference; a summary with no retrievable source is `unresolvable-reference`
- Measure TTV on the real user path against the [TTV row](./prd-tad-adr-mvp-gtm-guidelines.md#time-to-value); a TTV measured only in a prepared environment is labelled so — `missing-economics-metric`

---

## Innovation Accounting

Innovation accounting turns experiment results into progress measured against the model instead of
against activity.

```markdown
| Driver (A-id) | Baseline (first measured) | Target (Base scenario) | Current | Cohorts observed | Trend | Experiments (E-ids) | Proposed successor value | Decision |
|---|---|---|---|---|---|---|---|---|
```

1. **Baseline** — measure the real current value of each driver the riskiest hypotheses touch, even when it is poor.
2. **Tune** — run experiments that aim to move one driver toward the model's Base value.
3. **Decide** — at each learning milestone, compare the trend to the Roadmap threshold and record pivot or persevere.

**Artifact-bearing directives**:
- Start from a measured baseline, not the forecast; a driver with no baseline cannot show progress — `financial-assumption-unsourced`
- Take targets from the Financial Model's Base scenario at the same revision; a target set only in the learning record is `duplicate-owner`
- Propose assumption changes to the [Assumption Register](./prd-tad-adr-mvp-gtm-venture.md#assumption-register) as a successor revision with E-ids as source; editing the accepted value in place is `duplicate-owner`
- Report progress as driver movement across cohorts; effort, features shipped or experiments run are not progress — `unproven-claim`

---

## Pivot-or-Persevere Record

```markdown
| Date | Milestone | Hypotheses and E-ids | Evidence vs threshold | Decision | Pivot type | Records needing successors | Coverage domains to revisit | Owner | Next check |
|---|---|---|---|---|---|---|---|---|---|
| [YYYY-MM-DD] | [R-id / learning milestone] | [H-ids / E-ids] | [measured / threshold] | persevere \| pivot \| stop | [type or n/a] | [PRD / TAD / ADR / GTM / model] | [C-ids] | [role] | [date / trigger] |
```

| Pivot type (by function) | What changes | Records needing successors |
|---|---|---|
| Segment | who the customer is | PRD pain rows, GTM segment, market sizing |
| Problem | which pain is solved | PRD pain rows, `Must` set, Demo Skeleton |
| Scope narrow | one feature becomes the product | PRD scope, MVP slice, Roadmap |
| Scope widen | the product becomes one feature of a larger offer | PRD scope, TAD components, Roadmap |
| Payer or value capture | who pays and how | GTM streams, pricing, model revenue drivers |
| Channel | how customers are reached | GTM channel, CAC assumptions |
| Platform or architecture | how the value is delivered | TAD, ADR, TCO rows |

**Artifact-bearing directives**:
- Record a decision at every learning milestone and when an experiment bound is reached; a milestone passing with no record is `unimplemented-guideline`
- Decide against the Roadmap's stop or pivot threshold stated before the run; a decision with no threshold, or a threshold changed to fit the result, is `unproven-claim`
- Carry a pivot into a successor Context: new PRD, TAD, ADR, GTM and model revisions as the type requires, re-dispositioned coverage domains, and regenerated projections — `stale-evidence` blocks audience actions on the old revision
- Record an ADR for a pivot that changes a material choice, with the alternatives considered and the evidence — `constraint-gate-skipped`
- Record `stop` with the evidence and the salvageable assets; a quiet abandonment is `roadmap-scope-silently-dropped`

**Advisory**: persevere is a decision too; record it with the same evidence.

---

## Agent-Run Learning

An agent may draft hypotheses, design experiments, analyse results and propose decisions inside the
[AI-native harness pattern](./prd-tad-adr-mvp-gtm-economics.md#ai-native-harness-pattern).

**Artifact-bearing directives**:
- Treat model-generated personas, simulated interviews and synthetic usage as `concept` input for designing experiments; they never validate a pain, a price or demand — `unproven-claim`
- Ground every analysed number in raw evidence at its location before use — `cid-grounding-unverified`
- Keep the Evaluator that judges a result against its threshold distinct from the agent that designed or ran the experiment — `unproven-claim`
- Ledger agent tokens, iterations and wall-clock per loop in the [ADLC Cost Ledger](./prd-tad-adr-mvp-gtm-venture.md#adlc-cost-ledger) — `adlc-cost-unledgered`

---

## Projection Seams

| Projection | Reads from this loop | Owner of the display rules |
|---|---|---|
| Pitch Deck | stage, traction rows, evidence gaps, pass reasons | [Pitch Deck Guidelines — Stage-Honest Deck](./pitch-deck-guidelines.md#stage-honest-deck) |
| Business Plan | experiment table, risks from open hypotheses, milestones | [Business Plan Guidelines](./business-plan-guidelines.md) |
| Financial Model | baselines, measured drivers, proposed assumption values | [Financial Model Guidelines](./financial-model-guidelines.md) |

**Artifact-bearing directives**:
- Project results only at the revision the successor Context accepted; a projection showing a result the artifact has not accepted is `pitch-claim-unsourced`
- Show open riskiest hypotheses as risks with owner and next experiment in every audience projection — `roadmap-scope-silently-dropped`

---

## Role—Action—Outcome

Each role may be one person, one agent or several. Roles map onto the ADLC execution roles per the [Role-Action-Outcome Contract](./adlc-artifact-continuity.md#role-action-outcome-contract): authors and modelers act as Implementer, reviewers and presenters act under Operator authority, and the Evaluator is always a mechanism.

- **Solo Founder / AI Orchestrator** → ranks hypotheses, chooses the cheapest sufficient method, decides pivot or persevere → the riskiest question answered first within bounds
- **Product Manager** → writes falsifiable hypotheses from pain rows, defines metrics → experiments whose results change a PRD decision
- **Financial Modeler** → supplies baselines and targets, receives proposed values → a model whose drivers move only on evidence
- **Evaluator** *(mechanism)* → judges each result against its pre-registered threshold → verdicts the experimenter cannot self-grade
- **Operator** → authorizes each contact, charge or publication to real people → one recorded instruction per audience action

---

## Conformance Findings

This module introduces no new finding type. It raises the Venture Record family —
`pitch-claim-unsourced`, `financial-assumption-unsourced`, `revenue-recognized-unpaid`,
`adlc-cost-unledgered` — and the parent's existing types: `gate-sequence-violation`, `unbounded-loop`,
`unimplemented-guideline`, `pain-point-not-validated`, `unresolvable-reference`,
`roadmap-order-unexplained`, `monetization-demand-unvalidated`, `unproven-claim`,
`constraint-gate-skipped`, `human-gate-unstated`, `roadmap-scope-silently-dropped`,
`cid-density-violation`, `ungated-promotion`, `deploy-boundary-breach`, `blended-status`, `missing-economics-metric`,
`duplicate-owner`, `stale-evidence`, `cid-grounding-unverified`.
Severity follows the Finding Enumeration unless a rule states it inline.

---

## Reference Implementation

Non-binding per Scope & Neutrality. A solo operator keeps the Hypothesis Register, experiment table,
innovation-accounting table and Pivot-or-Persevere Record as sections of the joined artifact. Discovery
runs interviews and an offer test before any code; the first built slice goes through one ADLC lane;
a paid pilot is the first method allowed to support a first-dollar claim. An agent drafts designs and
analyses, an independent check compares each result to its threshold, and the operator authorizes each
contact with real people. No vendor, tool or platform is named here.

---

## Validation Checklist

- [ ] Every hypothesis falsifiable, joined to the pain, stream, assumption or phase it drives, and ranked
- [ ] Riskiest open hypothesis tested first, or the other order explained
- [ ] Metric, threshold and sample registered before the first observation
- [ ] Method chosen is the cheapest whose strongest evidence reaches the needed label
- [ ] Bounds declared for time, spend and agent work; free-core constraints respected
- [ ] Consent, privacy class and operator authorization recorded for contact with real people
- [ ] Negative, inconclusive and stopped results retained
- [ ] Decision metrics per cohort with denominators, joined to model drivers
- [ ] Baselines measured; targets taken from the Base scenario; proposals routed as successor revisions
- [ ] Pivot-or-Persevere Record at every milestone against a pre-stated threshold
- [ ] Pivots carried into successor Contexts with coverage revisited and projections regenerated
- [ ] Synthetic or simulated inputs labelled `concept`; results judged by an independent Evaluator
- [ ] Joined artifact's GTM and planning records updated before the session ends

---

## Mantra Application

**"Riskiest assumption first · Falsifiable or it is not a hypothesis · Threshold before data · Cheapest method that can answer · Claim only what the method can prove · Only payment proves a first dollar · Progress is a moving driver · Every milestone ends in a decision · Pivots are successors, never rewrites"**

- **Riskiest assumption first**: rank by impact times uncertainty, then cost to test
- **Falsifiable or it is not a hypothesis**: segment, behaviour, threshold, window
- **Threshold before data**: a moved threshold voids the result
- **Cheapest method that can answer**: do not build what an interview or an offer test can answer
- **Claim only what the method can prove**: intent is not demand; a prototype is not a product
- **Only payment proves a first dollar**: collected payment, not sign-ups or letters of intent
- **Progress is a moving driver**: baseline, tune, decide against the model
- **Every milestone ends in a decision**: persevere, pivot or stop, recorded with evidence
- **Pivots are successors, never rewrites**: new revisions, revisited coverage, regenerated projections
