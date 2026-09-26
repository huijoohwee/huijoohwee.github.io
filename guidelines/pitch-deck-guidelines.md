---
title: "Pitch Deck Guidelines"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-09-26"
lang: "en-US"
frontmatter_contract: "required"
owner: "Pitch deck authoring and delivery contract"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "3.3.0"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Pitch Deck Guidelines

A pitch deck asks one audience for one decision in bounded time, using only claims the joined
`PRD-TAD-ADR-MVP-GTM` artifact already owns. This module owns how a deck is ordered, timed, composed,
rendered, delivered and learned from. The [Venture Record](./prd-tad-adr-mvp-gtm-venture.md#pitch-deck)
owns what a deck must cover.

---

## Scope & Ownership

| Concern | Owner | This module |
|---|---|---|
| Twelve slide roles, sources, evidence status per row, traction and ask ties | [Venture Record — Slide Register](./prd-tad-adr-mvp-gtm-venture.md#slide-register) | consumes rows by number; never adds, renames or re-sources a role |
| Hook, Probe, Reveal, `[domain action]`, Close beats and the Reveal VCC | [Demo Skeleton](./prd-tad-adr-mvp-gtm-guidelines.md#demo-skeleton) | orders register rows onto those beats |
| Pain, monetization and readiness labels | [Pain-Point Mapping](./prd-tad-adr-mvp-gtm-guidelines.md#pain-point-to-feature-mapping), [Monetization](./prd-tad-adr-mvp-gtm-guidelines.md#monetization), [Readiness Ladder](./prd-tad-adr-mvp-gtm-guidelines.md#readiness-ladder) | prints the owner's label on the slide |
| Numbers, formulas, scenarios and headline rows | [Financial Model](./prd-tad-adr-mvp-gtm-venture.md#financial-model) | displays them at the same revision |
| Market, competition, legal, risk and capitalization records | [Business Plan](./prd-tad-adr-mvp-gtm-venture.md#business-plan) | cites them; the appendix links, never re-authors |
| Slide syntax, layout, notes and export | [Markdown slide modules](./markdown-slide-styling-guidelines.md) | selects them as the default render profile |
| Tokens, typography, contrast and reach | [Native design contract](./design-theme-contract.md#ownership-and-adoption) | applies them; no deck-local theme |
| Finding names and severities | [Finding Enumeration](./prd-tad-adr-mvp-gtm-verification.md#finding-enumeration) | raises existing types only |

The [Projection Contract](./prd-tad-adr-mvp-gtm-venture.md#projection-contract) lets a deck add three
things: **ordering, time bounds and the ask**. This module owns those three and the delivery surfaces
around them — variants, claim manifest, slide composition, number display, Reveal delivery, notes,
objections, rendering, distribution, agent generation and outcome capture. It inherits the parent's
[Scope & Neutrality Contract](./prd-tad-adr-mvp-gtm-guidelines.md#scope--neutrality-contract),
[Rule Identity](./prd-tad-adr-mvp-gtm-guidelines.md#rule-identity--classification) derivation and the
[recording contract](./prd-tad-adr-mvp-gtm-verification.md#recording-contract) without restating them.
Directive lists are labelled artifact-bearing or guidance per Rule Identity.

A deck is regenerated from the artifact, never edited into a competing source. A rendered, rehearsed or
well-received deck proves no product outcome, demand or revenue.

---

## Deck Lifecycle

```text
Slide Register @revision → Variant Register → Narrative Spine → Claim Manifest → Render
  → Rehearse → Authorize → Deliver → Delivery & Outcome Log → successor Context
```

| Step | Consumes | Produces | Next step blocked without it |
|---|---|---|---|
| Variant | Slide Register at `continuity_id@revision`, audience, decision | Variant Register row | Spine |
| Spine | variant row, Demo Skeleton beats | ordered rows with beat, bound, transition | Manifest |
| Manifest | ordered rows, owners' sources | one claim row per slide | Render |
| Render | manifest, render profile, design tokens | deck source and exports | Rehearse |
| Rehearse | export, time budget | measured timing, cut list | Authorize |
| Authorize | rehearsed export, confidentiality class | recorded operator instruction | Deliver |
| Deliver | authorized export, Reveal environment | Delivery & Outcome Log row | Learn |
| Learn | outcome rows | successor Context in GTM | next revision |

**Artifact-bearing directives**:
- Run the steps in order per variant; a later step recorded while an earlier one is missing is `gate-sequence-violation`
- Start from a Slide Register at a baselined revision that passed the [Phase 5 gate](./prd-tad-adr-mvp-gtm-process-flows.md#phase-5--gtm-and-venture-projections); a deck built from an unbaselined or superseded revision is `stale-evidence` for every audience action depending on it
- Re-enter at Manifest when the joined revision changes; re-enter at Variant when the audience or decision changes

**Guidance** (advisory): a first deck at discovery can complete every step in one sitting; the steps are
checks, not meetings.

---

## Variant Register

One Slide Register serves several audiences. A variant is a view: it selects, combines and orders rows;
it never changes a claim.

```markdown
| Variant | Audience (function) | Decision sought | Format | Slot: speak / Reveal reserve / Q&A | Rows: slide · combined · appendix · deferred | Stage | Confidentiality | Authorizing role |
|---|---|---|---|---|---|---|---|---|
| V1 | [funder / partner / first customer / program] | [one decision] | presented \| sent \| teaser | [m] / [m] / [m] | [1,2,5] · [3+8] · [10] · [none] | [stage] | public \| shared-under-terms \| private | [role] |
```

| Format | Read by | Consequence |
|---|---|---|
| Presented | an audience with a speaker | headlines and visuals on slides; spoken claim limits in notes |
| Sent | a reader alone | every slide stands without narration; sources and labels on the slide face |
| Teaser | a reader in under a minute | problem, Reveal evidence, one headline number, ask; other roles in the appendix or cited |

**Artifact-bearing directives**:
- Declare every variant before rendering; a deck with no Variant Register row is `unimplemented-guideline`
- Account for all twelve register roles per variant as slide, combined, appendix or deferred with reason and trigger; a role silently absent is `roadmap-scope-silently-dropped`
- Derive every variant from the same Slide Register revision; a variant that edits, re-rounds or reframes a claim is `duplicate-owner`
- Record exactly one decision sought per variant; a customer variant may ask for a paid pilot or next meeting, and a bootstrapped variant may state that no funding is sought

**Guidance** (advisory) — audience emphasis:

| Audience | Lead beat | Emphasis | Ask shape |
|---|---|---|---|
| Funder | Hook | market, economics, team, use of funds | instrument, amount, milestone it buys |
| Partner | Reveal | interfaces, value exchange and obligations from [Ecosystem](./prd-tad-adr-mvp-gtm-guidelines.md#ecosystem) | integration scope and milestone |
| First customer | Hook, in the customer's words | Reveal on their workflow, price, onboarding time-to-value, support | paid pilot terms and start date |
| Program or judge | Hook | stated criteria mapped to rows, eligibility, milestones | award use tied to Roadmap phases |

---

## Narrative Spine

Ordering is the first thing a deck adds. The default spine places register roles on the Demo Skeleton
beats, so the deck and the demo tell one story.

| Beat | Register roles | Job in the argument | Fails when |
|---|---|---|---|
| Hook | 1 Problem, 2 Who pays | the audience feels the cost of today's workaround | the pain is generic or its evidence label is missing |
| Probe | 3 Market, 6 Why now, 8 Competition | the gap is large, timely and not already closed | market has one method; alternatives omit doing nothing |
| Reveal | 4 Solution, 5 Reveal | the VCC holds, live or captured | the Reveal shows a path the VCC does not cover |
| `[domain action]` | 9 Traction, 10 Economics | real users performing the product's interaction produce measured value | users, pilots, orders, revenue and cash blur together |
| Close | 7 Why us, 11 Roadmap, 12 Ask | this team, this sequence, this decision now | the ask buys no named milestone |

**Artifact-bearing directives**:
- Record the spine per variant as ordered register rows, each with beat, bound and transition; a slide without a beat or bound is `missing-demo-beat`
- State a one-sentence throughline — `[segment] loses [cost] because [workaround]; [product] makes [VCC] hold; [evidence]; we ask for [decision] to reach [milestone]` — with every clause resolving to a register row; an unsourced clause is `pitch-claim-unsourced`
- Record the rationale when a variant departs from the default beat order

**Guidance** (advisory): each transition answers the question the previous slide raised; the ask is the
last content slide and the appendix follows it.

---

## Time Bounds

Time bounds are the second thing a deck adds. The Venture Record forbids slide bounds that sum past the
speaking budget; this section defines how the budget is built.

```text
slot ≥ Σ slide bounds + Reveal fallback reserve + Q&A reserve
```

**Artifact-bearing directives**:
- Declare slot, speaking budget, Reveal fallback reserve and Q&A reserve in the Variant Register; a presented variant missing either reserve is `unimplemented-guideline`
- Record at least one timed rehearsal per presented variant before its first external delivery, with measured seconds per slide; an unrehearsed first delivery is `unimplemented-guideline`
- Cut or combine rows when measured time exceeds a bound; restoring the budget by speaking faster or by moving content onto untimed slides leaves the Venture Record budget violation open

**Guidance** (advisory): give the Reveal the largest single bound and reach it before half the speaking
budget has elapsed. Sent and teaser variants carry a reading-time estimate instead of speaking bounds.

---

## The Ask

The ask is the third thing a deck adds. The Venture Record ties it to Roadmap phases, use-of-funds rows
and capitalization; this section fixes its shape.

```markdown
| Field | Content | Source |
|---|---|---|
| Decision | [what the audience is asked to do] | Variant Register |
| Instrument / terms | [equity, debt, grant, paid pilot, purchase, integration, none] | Business Plan capitalization or GTM offer |
| Amount / scope | [currency or pilot scope] | Financial Model use of funds or GTM price |
| Buys | [Roadmap phase R-id and its exit VCC] | Roadmap |
| By when | [dated milestone or observation period] | Roadmap bounds |
| Runway effect | [Base and Downside runway after the ask] | Scenario Set |
| Next step | [one concrete action, owner, date] | Variant Register |
```

**Artifact-bearing directives**:
- Source every field for the variant's single decision; an ask missing its milestone, date or next step is `pitch-claim-unsourced`
- Show runway after a funding ask under Base and Downside from the [Scenario Set](./prd-tad-adr-mvp-gtm-venture.md#scenario-set); an upside-only runway is `scenario-set-incomplete`
- For a customer ask, state price, pilot scope, a success criterion expressed as a VCC and the end-of-pilot decision; a pilot with no success criterion is `unimplemented-guideline`

**Guidance** (advisory): when the audience cannot decide in the meeting, the ask still names the next
concrete step and who takes it.

---

## Stage-Honest Deck

From 0 to 1, a deck states which stage it is at. Each row shows the evidence that stage actually has and
shows the gap where it has none.

| Stage | 1 Problem | 5 Reveal | 9 Traction | 10 Economics | 12 Ask |
|---|---|---|---|---|---|
| 0 — grounded opportunity | quotes or tickets with count and date; `unvalidated` | prototype or concept labelled `concept`; no VCC claimed | learning evidence with denominators, labelled as not demand | assumption register draft, inputs `unverified` | discovery budget, design partner or pilot |
| MVP evidenced | cited pain with its owner label | Demo Skeleton Reveal with Evidence Reference; local and delivered rungs separate | pilots and usage with period and denominator | model at the revision; unverified inputs labelled on the row | milestone to a collected first dollar |
| First dollar | `demand-proven` only with paid-customer evidence | Reveal at the rung its evidence earns | collected cash and recognized revenue on separate rows | observed unit economics beside forecast | milestone to repeat demand |
| Repeat demand | segment-level evidence | `production-verified` only with its receipt | cohort retention with window and denominator | cohort-based LTV, CAC and payback | scale milestone |

**Artifact-bearing directives**:
- Declare each variant's stage from the owners' labels; a stage claimed ahead of its evidence is `unproven-claim`
- Show an evidence gap on its own row with the next check and date; hiding the row, padding it with unrelated counts or presenting a later stage's metric is `pitch-claim-unsourced`
- Keep product delivery, first collected dollar and repeat demand on separate rows — `blended-status`
- Show verbal interest, waitlists, letters of intent and signed unpaid orders as their own labelled rows; presenting them as validated demand is `monetization-demand-unvalidated`, and as revenue is `revenue-recognized-unpaid`

---

## Claim Manifest

The Claim Manifest is the deck's check record. It joins every slide claim to its owner before rendering,
whether a person or an agent drafted the deck.

```markdown
| Slide | Register row | Headline claim | Source | Evidence status | On-slide label | Visual provenance |
|---|---|---|---|---|---|---|
| [n] | [1–12] | [one claim sentence] | [anchor / Evidence Reference / A-id / model row] | [owner label] | [label shown] | captured@[revision] \| concept \| chart from [row] |
```

**Artifact-bearing directives**:
- Keep one manifest row per content slide, joined to the variant and its `continuity_id@revision`; a deck with no manifest is `unimplemented-guideline`
- Resolve every number, name, capability, quote and screen shown to a manifest source; an unresolved item is `pitch-claim-unsourced`
- Resolve every source to a current [Evidence Reference](./prd-tad-adr-mvp-gtm-verification.md#the-evidence-reference) or owning section at the stated revision; a dangling source is `unresolvable-reference`
- Judge the manifest with an Evaluator distinct from the deck author; a self-certified manifest proves nothing — `unproven-claim`

---

## Slide Composition

**Artifact-bearing directives**:
- Write each headline as one claim sentence that matches its manifest row, not a topic label; a headline asserting more than its source supports is `pitch-claim-unsourced`
- Carry a source footer on every content slide with the manifest source and evidence status; sent and teaser variants keep it on the slide face — `pitch-claim-unsourced`
- Print the owner's label (`unvalidated`, `forecast`, `hypothesis`, rung, `concept`) beside the claim it qualifies at readable size; a label present only in notes, fine print or the appendix leaves the claim unlabelled — `pitch-claim-unsourced`
- Show a product screen only when captured from the build at a stated revision; label mockups, concept art and generated imagery `concept`; a concept presented as product is `unproven-claim`
- Show a customer name, logo, quote or testimonial only with a dated source and recorded permission; unsourced is `pitch-claim-unsourced`, unpermitted is `unimplemented-guideline`
- Name competitors, platforms and vendors only as the Venture Record permits — `vendor-coupling`; include doing nothing and the manual workaround among the alternatives — `pitch-claim-unsourced`

**Guidance** (advisory): one claim per slide; keep supporting content within the
[slide best practices](./markdown-slide-styling-guidelines.md#best-practices); prefer one chart or one
screen over text. A slide the audience must read while the speaker talks competes with the speaker.

---

## Numbers and Charts

**Artifact-bearing directives**:
- Give every displayed number its unit, period, denominator for a ratio, actual or forecast label and model row or assumption ID; a bare number is `pitch-claim-unsourced`
- Display the same value, rounding and period as the Financial Model at the same revision; a deck–model mismatch is `status-conflict`
- Label cumulative series as cumulative and state the window; take windows from the model's periods, never chosen to flatter a trend — `pitch-claim-unsourced`
- Start bar-chart value axes at zero or mark the break; pair every colour signal with a label or shape — `incomplete-delivery-reach`
- Show market size with its method labels and reconciled figure from the Business Plan; a single-method headline is `market-size-single-method`
- Show undefined or `unverified` ratios as labelled text, never as a number — `financial-assumption-unsourced`

---

## Reveal Delivery

The Venture Record anchors the Reveal slide to the Demo Skeleton VCC. This section governs how that VCC
is shown.

| Mode | Required record | Fallback |
|---|---|---|
| Live | environment, build revision, data class (`live`, `fixture`, `sample`), reset procedure | captured Reveal of the same VCC |
| Captured | capture date, build revision, environment, edit disclosure | still sequence from the same capture |
| Sent or teaser | captured Reveal link or still sequence with its Evidence Reference | none required |

**Artifact-bearing directives**:
- Show only the path the VCC and its Evidence Reference cover; a Reveal through an unevidenced path, a faster environment or hand-seeded state presented as real is `unproven-claim`
- Label fixture and sample data on screen — `pitch-claim-unsourced`
- Prepare the fallback before a live Reveal and bound the switch inside the Reveal reserve; a live Reveal without a fallback is `unimplemented-guideline`
- Disclose edits in a captured Reveal (cuts, speed changes, compositing); an undisclosed edit that changes what the VCC appears to prove is `unproven-claim`
- Run a live Reveal in a rehearsal or demonstration environment; a Reveal whose actions mutate a delivery surface without a referenced operator instruction is `deploy-boundary-breach`

---

## Notes, Appendix and Objections

**Artifact-bearing directives**:
- Author speaker notes per slide with the spoken claim, its source, its limit (what the evidence does not show) and the transition, using the render profile's [notes syntax](./markdown-slide-animation.md#speaker-notes-partially-supported); a note adding a claim absent from the manifest is `pitch-claim-unsourced`
- Put supporting calculations, method detail, risks and deferred roles in a cited appendix; link the Business Plan risk register instead of re-authoring it — `duplicate-owner`; an appendix risk slide omitting an open `blocker` is `roadmap-scope-silently-dropped`
- Keep an Objection Register per variant; answer live only from the manifest, appendix or register, and record anything else as a follow-up with owner and date, never an improvised number — `pitch-claim-unsourced`
- Source every follow-up message from the delivered revision or a named successor; citing a superseded revision without saying so is `stale-evidence`

```markdown
| ID | Anticipated question | Answer | Source | Evidence status | Gap owner / next check |
|---|---|---|---|---|---|
| Q1 | [question] | [one-sentence answer] | [anchor / Evidence Reference / A-id] | [owner label] | [role / check / date] |
```

---

## Rendering and Accessibility

**Artifact-bearing directives**:
- Author the deck as diffable source in the selected render profile and treat PDF, image or video exports as projections of it; an export with no source is `unguided-artifact`
- Resolve colour, type and identity from the native design contract; a deck-local palette or font set is `duplicate-owner`
- Meet the [accessibility and reach](./design-theme-contract.md#accessibility-and-reach) obligations on every export — contrast, minimum text size, alt text for images and charts, reading order, captions for captured Reveals — and name the target surfaces (room display, laptop, phone for sent variants); a gap is `incomplete-delivery-reach`
- Keep diagrams as source under the [diagram companions](./prd-tad-adr-mvp-gtm-diagram-guidelines.companion.md); their findings apply unchanged
- Stamp the cover and footer with `continuity_id@revision`, variant, date and confidentiality class — `artifact-naming-noncompliant`

---

## Distribution and Confidentiality

**Artifact-bearing directives**:
- Treat every external send, upload or presentation as an audience action authorized by the Variant Register's named role through a recorded operator instruction; an agent never shares a deck on its own discretion — `human-gate-unstated`
- Classify content per variant; link private evidence (customer data, contracts, capitalization detail) from a private appendix or data room instead of copying it into a shared export — `unimplemented-guideline`
- Cite the Business Plan's legal, IP and regulatory row for the offering, solicitation, disclosure and forward-looking-statement duties of the variant's audience and jurisdiction; unknown applicability blocks the dependent audience action — `unimplemented-guideline`. This module gives no legal advice
- Log every delivery; when a material correction supersedes a delivered revision, notify recipients of the affected claims under the same authorization — `stale-evidence`
- Record audiences by organization or role reference; personal contact data stays in its existing owner, linked not copied

---

## Agent-Generated Decks

An agent may draft, render and check a deck inside the
[AI-native harness pattern](./prd-tad-adr-mvp-gtm-economics.md#ai-native-harness-pattern).

| Harness part | Deck instance |
|---|---|
| Typed input | Slide Register, Variant Register row, spine and sources at one revision |
| Typed output | deck source and Claim Manifest |
| Cost log | tokens, iterations and wall-clock per generation, read by the [ADLC Cost Ledger](./prd-tad-adr-mvp-gtm-venture.md#adlc-cost-ledger) |
| Fallback | the last accepted deck revision, or the register rendered as plain slides |

**Artifact-bearing directives**:
- Emit a Claim Manifest with every generated deck and fail closed on any unresolved item — `pitch-claim-unsourced`
- Label generated imagery `concept` by default; never generate a product screen, logo, testimonial, chart value or quote that the manifest cannot source — `unproven-claim`
- Bound generation by iteration, token and wall-clock ceilings with a circuit-breaker — `unbounded-loop` at `blocker`
- Keep the Evaluator that judges the manifest distinct from the generating agent — `unproven-claim`
- Ledger generation and rehearsal cost from the harness cost log — `adlc-cost-unledgered`

---

## Delivery & Outcome Log

```markdown
| Date | Variant | Revision | Audience ref | Channel | Measured duration | Decision received | Objections / questions | Follow-ups (owner, date) | Successor Context |
|---|---|---|---|---|---|---|---|---|---|
```

**Artifact-bearing directives**:
- Log every delivery and send, including declines and no response — `unimplemented-guideline`
- Feed outcomes into the GTM learn loop as a successor Context through [successor feedback](./adlc-artifact-continuity.md#re-derivation-and-successor-feedback); never backward-edit the delivered revision — `duplicate-owner`
- Record a verbal yes, term sheet or funding commitment as financing intent, separate from received funds and from customer revenue — `revenue-recognized-unpaid`
- Promote a recurring objection to the Objection Register and, where it exposes a gap, to the owning PRD, GTM or Roadmap row; dropping it is `roadmap-scope-silently-dropped`

**Guidance** (advisory): a pass reason is evidence about the pitch hypothesis. Count pass reasons per
variant before rewriting the deck.

---

## Role—Action—Outcome

Each role may be one person, one agent or several; the Evaluator is always a mechanism.

- **Deck Author** → variant, spine, manifest, render → a variant whose every claim resolves at one revision
- **Financial Modeler** → confirms displayed numbers against the model revision → zero deck–model mismatches
- **Presenter** → rehearses, delivers, logs the outcome → measured timing and an outcome row per delivery
- **Evaluator** *(mechanism)* → resolves the Claim Manifest and judges the Reveal VCC → verdicts the author cannot self-grade
- **Operator** → authorizes each external delivery → one recorded instruction per send

---

## Conformance Findings

This module introduces no new finding type. It raises the Venture Record family —
`pitch-claim-unsourced`, `market-size-single-method`, `financial-assumption-unsourced`,
`revenue-recognized-unpaid`, `scenario-set-incomplete`, `adlc-cost-unledgered` — and the parent's
existing types: `missing-demo-beat`, `monetization-demand-unvalidated`, `unproven-claim`,
`blended-status`, `stale-evidence`, `unresolvable-reference`, `artifact-naming-noncompliant`,
`duplicate-owner`, `status-conflict`, `vendor-coupling`, `human-gate-unstated`,
`incomplete-delivery-reach`, `unimplemented-guideline`, `unguided-artifact`,
`roadmap-scope-silently-dropped`, `gate-sequence-violation`, `deploy-boundary-breach`, `unbounded-loop`.
Severity follows the Finding Enumeration unless a rule states it inline.

---

## Reference Implementation

Non-binding per Scope & Neutrality. A solo operator keeps one Markdown deck source per increment beside
the joined artifact and derives three variants from one Slide Register: a presented funder variant, a
sent variant and a first-customer pilot variant. The Reveal replays the Demo Skeleton capture from the
MVP build revision. An agent drafts the deck and Claim Manifest inside a bounded harness, an independent
check resolves every manifest row, and the operator authorizes each send. In this repository, the
[full](../template/pitchdeck-prd-tad-adr-mvp-gtm-template.md) and
[lite](../template/pitchdeck-prd-tad-adr-mvp-gtm-template-lite.md) planning templates carry a condensed
deck rendering bound to the Slide Register. No vendor, funder, tool or platform is named here.

---

## Validation Checklist

- [ ] Deck built from a baselined `continuity_id@revision`, stamped on cover and footer
- [ ] Variant Register row per variant: audience, decision, format, slot with Reveal and Q&A reserves, row disposition, stage, confidentiality, authorizing role
- [ ] All twelve register roles accounted for per variant
- [ ] Spine records beat, bound and transition per slide; throughline clauses sourced
- [ ] Claim Manifest resolves every headline, number, name, quote and screen; judged by an independent Evaluator
- [ ] Stage declared from owners' labels; gaps shown with next check and date
- [ ] Displayed numbers match model values, rounding and periods at the same revision
- [ ] Ask sourced: decision, terms, amount or scope, milestone, date, Base and Downside runway, next step
- [ ] Reveal mode recorded; fallback bounded; fixture data and edits disclosed
- [ ] Notes, appendix and Objection Register add no unsourced claim; risks link the Business Plan
- [ ] Exports from source; native design tokens; accessibility and reach obligations met
- [ ] Timed rehearsal recorded before first external delivery
- [ ] External delivery authorized by the named role; private evidence linked, not copied
- [ ] Delivery & Outcome Log row per delivery; outcomes routed to a successor Context

---

## Mantra Application

**"One audience, one decision, one revision · Order on the demo's beats · Every headline is a sourced claim · Labels live on the slide · Numbers match the model · The Reveal shows only what the VCC proves · Show the gap, never pad it · An agent drafts, an Evaluator checks, an operator sends · Outcomes feed the next revision"**
