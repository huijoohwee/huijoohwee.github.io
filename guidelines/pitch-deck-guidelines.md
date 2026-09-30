---
title: "Pitch Deck Guidelines"
doc_type: "Guidelines Module"
version: "1.1.0"
date: "2026-09-30"
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
owns what a deck must cover. The deck is the audience-facing end of the parent's 0-to-1 chain: pain
(Phase 0) → PRD, TAD, ADR (Phases 1–3) → evidenced MVP through `START → RELEASE → DEPLOY` (Phase 4) →
GTM and venture projections (Phase 5) → a successor Context.

---

## Scope & Ownership

| Concern | Owner | This module |
|---|---|---|
| Twelve slide roles, sources, evidence status per row, traction and ask ties | [Venture Record — Slide Register](./prd-tad-adr-mvp-gtm-venture.md#slide-register) | consumes rows by number; never adds, renames or re-sources a role |
| Coverage domains C01–C16 and their dispositions | [From-0-to-1 coverage contract](./prd-tad-adr-mvp-gtm-guidelines.md#from-0-to-1-coverage-contract) | reads dispositions at audience handoff; shows gaps, never re-decides them |
| Hook, Probe, Reveal, `[domain action]`, Close beats and the Reveal VCC | [Demo Skeleton](./prd-tad-adr-mvp-gtm-guidelines.md#demo-skeleton) | orders register rows onto those beats |
| Pain, monetization and readiness labels | [Pain-Point Mapping](./prd-tad-adr-mvp-gtm-guidelines.md#pain-point-to-feature-mapping), [Monetization](./prd-tad-adr-mvp-gtm-guidelines.md#monetization), [Readiness Ladder](./prd-tad-adr-mvp-gtm-guidelines.md#readiness-ladder) | prints the owner's label on the slide |
| Built, proposed and deferred capability; rubric level | [Codebase Grounding](./prd-tad-adr-mvp-gtm-codebase-grounding.md), [Ecosystem](./prd-tad-adr-mvp-gtm-guidelines.md#ecosystem), [Domain-Object Rubric](./prd-tad-adr-mvp-gtm-guidelines.md#domain-object-rubric-assessment) | displays the recorded split and level |
| Time-to-value, AI harness and serving cost | [Economics & Time-to-Value](./prd-tad-adr-mvp-gtm-economics.md) | cites the TTV row and harness record |
| Instrument, channel and price choices | [Selection Criteria](./prd-tad-adr-mvp-gtm-selection.md) | cites the recorded decision in the ask |
| Numbers, formulas, scenarios and headline rows | [Financial Model](./prd-tad-adr-mvp-gtm-venture.md#financial-model) | displays them at the same revision |
| Market, competition, legal, risk and capitalization records | [Business Plan](./prd-tad-adr-mvp-gtm-venture.md#business-plan) | cites them; the appendix links, never re-authors |
| Lanes, source integration and publication | [ADLC Execution Seam](./prd-tad-adr-mvp-gtm-guidelines.md#adlc-execution-seam), [Lane Topology & Deploy Boundary](./prd-tad-adr-mvp-gtm-readiness.md#lane-topology--deploy-boundary) | routes deck source and publication through them |
| Slide syntax, layout, notes and export | [Markdown slide modules](./markdown-slide-styling-guidelines.md) | selects them as the default render profile |
| Tokens, typography, contrast and reach | [Native design contract](./design-theme-contract.md#ownership-and-adoption) | applies them; no deck-local theme |
| Finding names and severities | [Finding Enumeration](./prd-tad-adr-mvp-gtm-verification.md#finding-enumeration) | raises existing types only |

The [Projection Contract](./prd-tad-adr-mvp-gtm-venture.md#projection-contract) lets a deck add three
things: **ordering, time bounds and the ask**. This module owns those three and the delivery surfaces
around them — variants, claim manifest, slide composition, number display, Reveal delivery, notes,
objections, rendering, distribution, agent generation and outcome capture. It inherits the parent's
[Scope & Neutrality Contract](./prd-tad-adr-mvp-gtm-guidelines.md#scope--neutrality-contract),
[Rule Identity](./prd-tad-adr-mvp-gtm-guidelines.md#rule-identity--classification) derivation,
[frontmatter contract](./prd-tad-adr-mvp-gtm-guidelines.md#markdown-yaml-frontmatter-enforcement), the
[shared CID/RAO/SVO field contract](./cid-guidelines.md#shared-field-contract) and the
[recording contract](./prd-tad-adr-mvp-gtm-verification.md#recording-contract) without restating them.
Directive lists are labelled artifact-bearing or advisory per Rule Identity.

A deck is regenerated from the artifact, never edited into a competing source. A rendered, rehearsed or
well-received deck proves no product outcome, demand or revenue.

---

## Deck Lifecycle

```text
Slide Register @revision + coverage record → Variant Register → Narrative Spine → Claim Manifest
  → Render → Rehearse → Authorize → Deliver → Delivery & Outcome Log → successor Context
```

| Step | Consumes | Produces | Next step blocked without it |
|---|---|---|---|
| Variant | Slide Register at `continuity_id@revision`, C01–C16 record, audience, decision | Variant Register row | Spine |
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
- Keep the deck source in the joined artifact's repository or its declared companion location, joined by `continuity_id@revision` in frontmatter; the variant, stage and confidentiality class live in the Variant Register row, not in new frontmatter keys — `artifact-naming-noncompliant`

**Advisory**: a first deck at discovery can complete every step in one sitting; the steps are checks,
not meetings.

---

## Coverage Join

The parent requires coverage to be revisited at audience handoff. The deck reads that record; it
never re-decides a disposition.

| Register role | Coverage domains read | Shown on the slide when |
|---|---|---|
| 1 Problem · 2 Who pays | C01, C09 | always |
| 3 Market · 6 Why now | C02, C07 | always |
| 4 Solution · 5 Reveal | C04, C05, C06, C08 | always; C06 only for its quality, security or AI claim |
| 7 Why us | C10, C11 | always; operating and obligation detail in the appendix |
| 8 Competition | C03 | always |
| 9 Traction · 11 Roadmap | C09, C16 | always |
| 10 Economics | C12, C14 | always; ADLC cost detail in the appendix |
| 12 Ask | C13 | always |
| The deck itself | C15 | cover stamp and appendix |

**Artifact-bearing directives**:
- Cite the coverage record at the deck's revision in the appendix with both parent counts —
  dispositioned domains / 16 and covered applicable domains / applicable domains — and the deferred and
  not-applicable counts; a deck delivered without a current coverage record is `unimplemented-guideline`
- Show a claim that depends on a `deferred` domain as a gap row with the owner's revisit trigger;
  presenting it as covered is `unproven-claim`. Coverage is a disposition, never a readiness rung — `blended-status`

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
- Host every supplementary slide — architecture, ecosystem, AI approach, compliance, team detail — on the register role whose claim it supports; a slide with no host role or bound is `missing-demo-beat`
- Derive every variant from the same Slide Register revision; a variant that edits, re-rounds or reframes a claim is `duplicate-owner`
- Record exactly one decision sought per variant; a customer variant may ask for a paid pilot or next meeting, and a bootstrapped variant may state that no funding is sought

**Advisory** — audience emphasis:

| Audience | Lead beat | Emphasis | Ask shape |
|---|---|---|---|
| Funder | Hook | market, economics, team, use of funds | instrument, amount, milestone it buys |
| Partner | Reveal | interfaces, value exchange and obligations from [Ecosystem](./prd-tad-adr-mvp-gtm-guidelines.md#ecosystem) | integration scope and milestone |
| First customer | Hook, in the customer's words | Reveal on their workflow, price, onboarding time-to-value from the PRD TTV row, support | paid pilot terms and start date |
| Program or judge | Hook | stated criteria mapped to rows, eligibility, milestones | award use tied to Roadmap phases |

For a program or judged audience, keep a criteria map — each stated criterion to the register rows and
manifest rows that answer it — in the Variant Register; a criterion with no answering row is shown as a
gap, not padded.

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

**Advisory**: each transition answers the question the previous slide raised; the ask is the last
content slide and the appendix follows it.

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

**Advisory**: give the Reveal the largest single bound and reach it before half the speaking budget has
elapsed. Sent and teaser variants carry a reading-time estimate instead of speaking bounds.

---

## The Ask

The ask is the third thing a deck adds. The Venture Record ties it to Roadmap phases, use-of-funds rows
and capitalization; this section fixes its shape.

```markdown
| Field | Content | Source |
|---|---|---|
| Decision | [what the audience is asked to do] | Variant Register |
| Instrument / terms | [equity, debt, grant, paid pilot, purchase, integration, none] | Selection Criteria record; Business Plan capitalization or GTM offer |
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
- Take the instrument from a recorded selection decision when more than one was considered; an instrument chosen without its constraint gate is `constraint-gate-skipped`
- Keep the Roadmap phase the ask buys identical to the owner's phase, prerequisite and exit VCC; a deck-only milestone is `duplicate-owner`

**Advisory**: when the audience cannot decide in the meeting, the ask still names the next concrete step
and who takes it.

---

## Stage-Honest Deck

From 0 to 1, a deck states which stage it is at. Each row shows the evidence that stage actually has and
shows the gap where it has none. “0” and “1” carry the parent's
[coverage-contract](./prd-tad-adr-mvp-gtm-guidelines.md#from-0-to-1-coverage-contract) meanings.

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

## Built, Planned and AI Claims

The Solution, Reveal, architecture and ecosystem slides make capability claims. Each resolves to the
grounding, ecosystem and rubric records at the deck's revision.

**Artifact-bearing directives**:
- Mark every capability shown as implemented, proposed or deferred from the Codebase Grounding Record and the Ecosystem table; an implemented mark needs an exact source revision and named check, and a confirmed gap shown as existing capability is `unproven-claim`
- On any slide that lists a product flow, mark which steps the Reveal evidences and which are Roadmap rows; an unmarked future step read as built is `unproven-claim`
- Show the rubric as the recorded four-rating vector or the highest contiguous passing level with the next unpassed level named; an averaged, rounded-up or unassessed-as-passing level is `overclaimed-rubric-level`
- For every AI claim, name what the model does, what stays deterministic or human-gated, the harness fallback and the evaluation Evidence Reference behind any quality number; an AI capability or accuracy claim without that evidence is `unproven-claim`
- Carry serving-token and inference cost in the displayed margin as COGS — `missing-economics-metric`
- Show interoperability, partner or platform-neutral claims only for interfaces the Ecosystem table records with evidence; a partner shown as committed without a recorded agreement is `pitch-claim-unsourced`

---

## Claim Manifest

The Claim Manifest is the deck's check record. It joins every slide claim to its owner before rendering,
whether a person or an agent drafted the deck.

```markdown
| Slide | Register row | Headline claim | Source | Evidence status | On-slide label | Visual provenance | Retrieved / fresh until |
|---|---|---|---|---|---|---|---|
| [n] | [1–12] | [one claim sentence] | [anchor / Evidence Reference / A-id / model row / external citation] | [owner label] | [label shown] | captured@[revision] \| concept \| chart from [row] | [date] / [date] |
```

**Artifact-bearing directives**:
- Keep one manifest row per content slide, joined to the variant and its `continuity_id@revision`; a deck with no manifest is `unimplemented-guideline`
- Resolve every number, name, capability, quote and screen shown to a manifest source; an unresolved item is `pitch-claim-unsourced`
- Resolve every source to a current [Evidence Reference](./prd-tad-adr-mvp-gtm-verification.md#the-evidence-reference) or owning section at the stated revision; a dangling source is `unresolvable-reference`
- Route third-party facts — market figures, prices, regulations, competitor capabilities — through the Business Plan record that cites them, with publisher, date and retrieval date; a fact past its declared freshness at delivery is `stale-evidence`
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
- Keep customer alternatives separate from technical implementation candidates; commercial differentiation needs buyer evidence, not an architecture selection score — `pitch-claim-unsourced`

**Advisory**: one claim per slide; keep supporting content within the
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
- Label illustrative figures `illustrative` with their assumption IDs on the slide face; an illustrative figure read as an actual or a forecast is `financial-assumption-unsourced`

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
- Label fixture, sample and simulated data and simulated devices or receivers on screen — `pitch-claim-unsourced`
- Prepare the fallback before a live Reveal and bound the switch inside the Reveal reserve; a live Reveal without a fallback is `unimplemented-guideline`
- Disclose edits in a captured Reveal (cuts, speed changes, compositing); an undisclosed edit that changes what the VCC appears to prove is `unproven-claim`
- Run a live Reveal in a rehearsal or demonstration environment; a Reveal whose actions mutate a delivery surface or a physical effect without a referenced operator instruction is `deploy-boundary-breach`
- Keep a runbook for a live Reveal — preconditions, steps, expected observations, reset and fallback trigger — in the appendix or the Demo Skeleton record, linked from the notes — `unimplemented-guideline`

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

## Revision and Change Record

A deck revision follows its joined artifact revision. Each regenerated revision states what changed for
the audience.

```markdown
| Deck revision | Joined `continuity_id@revision` | Prior delivered revision | Claims added | Claims changed | Claims withdrawn | Recipients to notify |
|---|---|---|---|---|---|---|
```

**Artifact-bearing directives**:
- Record a change row for every revision that follows a delivered one, listing claim deltas by manifest row; a revised deck with no change row is `unimplemented-guideline`
- Withdraw a claim by row, with its reason; deleting it silently from a delivered revision's successor is `roadmap-scope-silently-dropped`
- Keep the deck revision distinct from the artifact revision and never let it advance a readiness rung; a deck version presented as product progress is `blended-status`

---

## Rendering and Accessibility

**Artifact-bearing directives**:
- Author the deck as diffable source in the selected render profile and treat PDF, image or video exports as projections of it; an export with no source is `unguided-artifact`
- Resolve colour, type and identity from the native design contract; a deck-local palette or font set is `duplicate-owner`
- Meet the [accessibility and reach](./design-theme-contract.md#accessibility-and-reach) obligations on every export — contrast, minimum text size, alt text for images and charts, reading order, captions for captured Reveals — and name the target surfaces (room display, laptop, phone for sent variants); a gap is `incomplete-delivery-reach`
- Keep diagrams as source under the [diagram companions](./prd-tad-adr-mvp-gtm-diagram-guidelines.companion.md); their findings apply unchanged
- Stamp the cover and footer with `continuity_id@revision`, variant, date and confidentiality class — `artifact-naming-noncompliant`

---

## Execution and Publication

Deck source is authored work; publishing it on a reachable surface is a delivery. Both reuse the
parent's [ADLC Execution Seam](./prd-tad-adr-mvp-gtm-guidelines.md#adlc-execution-seam) without a
deck-specific path.

| Verb | Deck instance | Returns |
|---|---|---|
| **START** | one scoped lane for the deck source and its manifest | lane identity, base revision |
| **RELEASE** | the exact deck source candidate with its manifest check | Integration Receipt |
| **DEPLOY** | publication of an export on a public or shared surface | deployment receipt, live identity, rollback predecessor |

**Artifact-bearing directives**:
- Author deck source in an authoring lane and integrate it by exact candidate; editing a published export in place is `deploy-boundary-breach`
- Publish an export to a mirror or delivery surface only across a named Deploy Boundary with Evidence Reference, operator instruction and rollback statement; an unrecorded publication is `ungated-promotion`
- Carry `worktree_id` and `agent_id` when variants are drafted in more than one work tree; one Deck Author per variant — `worktree-provenance-missing`, `duplicate-capability-owner`
- Before ending a turn or session that drafts, renders, delivers or learns from a deck, update the joined artifact's GTM and planning records with the variant state, manifest result, delivery rows and next bounded action; a chat summary alone does not discharge it — `unimplemented-guideline`

---

## Distribution and Confidentiality

**Artifact-bearing directives**:
- Treat every external send, upload or presentation as an audience action authorized by the Variant Register's named role through a recorded operator instruction; an agent never shares a deck on its own discretion — `human-gate-unstated`
- Classify content per variant; link private evidence (customer data, contracts, capitalization detail) from a private appendix or data room instead of copying it into a shared export — `unimplemented-guideline`
- Cite the Business Plan's legal, IP and regulatory row for the offering, solicitation, disclosure and forward-looking-statement duties of the variant's audience and jurisdiction; unknown applicability blocks the dependent audience action — `unimplemented-guideline`. This module gives no legal advice
- State a regulatory or licensing claim on a slide only as the Business Plan row records it, with jurisdiction and date; a slide asserting compliance the row does not evidence is `unproven-claim`
- Log every delivery; when a material correction supersedes a delivered revision, notify recipients of the affected claims under the same authorization — `stale-evidence`
- Record audiences by organization or role reference; personal contact data stays in its existing owner, linked not copied

---

## Agent-Generated Decks

An agent may draft, render and check a deck inside the
[AI-native harness pattern](./prd-tad-adr-mvp-gtm-economics.md#ai-native-harness-pattern).

| Harness part | Deck instance |
|---|---|
| Typed input | Slide Register, coverage record, Variant Register row, spine and sources at one revision |
| Typed output | deck source, Claim Manifest and change row |
| Cost log | tokens, iterations and wall-clock per generation, read by the [ADLC Cost Ledger](./prd-tad-adr-mvp-gtm-venture.md#adlc-cost-ledger) |
| Fallback | the last accepted deck revision, or the register rendered as plain slides |

**Artifact-bearing directives**:
- Emit a Claim Manifest with every generated deck and fail closed on any unresolved item — `pitch-claim-unsourced`
- Label generated imagery `concept` by default; never generate a product screen, logo, testimonial, chart value or quote that the manifest cannot source — `unproven-claim`
- Bound generation by iteration, token and wall-clock ceilings with a circuit-breaker — `unbounded-loop` at `blocker`
- Keep the Evaluator that judges the manifest distinct from the generating agent — `unproven-claim`
- Ledger generation and rehearsal cost from the harness cost log — `adlc-cost-unledgered`
- Ground every claim the agent drafts against the owning record before use; a claim taken from a prior deck, chat or draft without re-resolving it is `cid-grounding-unverified`

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
- Compare outcomes against the Roadmap's continue, pivot or stop threshold and record the decision in the successor Context — `unimplemented-guideline`

**Advisory**: a pass reason is evidence about the pitch hypothesis. Count pass reasons per variant before
rewriting the deck.

---

## Role—Action—Outcome

Each role may be one person, one agent or several; the Evaluator is always a mechanism.

- **Deck Author** → variant, spine, manifest, render, change row → a variant whose every claim resolves at one revision
- **Financial Modeler** → confirms displayed numbers against the model revision → zero deck–model mismatches
- **Presenter** → rehearses, delivers, logs the outcome → measured timing and an outcome row per delivery
- **Evaluator** *(mechanism)* → resolves the Claim Manifest, the coverage join and the Reveal VCC → verdicts the author cannot self-grade
- **Operator** → authorizes each external delivery and each publication across a Deploy Boundary → one recorded instruction per send or promotion

---

## Conformance Findings

This module introduces no new finding type. It raises the Venture Record family —
`pitch-claim-unsourced`, `market-size-single-method`, `financial-assumption-unsourced`,
`revenue-recognized-unpaid`, `scenario-set-incomplete`, `adlc-cost-unledgered` — and the parent's
existing types: `missing-demo-beat`, `monetization-demand-unvalidated`, `unproven-claim`,
`blended-status`, `stale-evidence`, `unresolvable-reference`, `artifact-naming-noncompliant`,
`duplicate-owner`, `status-conflict`, `vendor-coupling`, `human-gate-unstated`,
`incomplete-delivery-reach`, `unimplemented-guideline`, `unguided-artifact`,
`roadmap-scope-silently-dropped`, `gate-sequence-violation`, `deploy-boundary-breach`, `unbounded-loop`,
`overclaimed-rubric-level`, `missing-economics-metric`, `constraint-gate-skipped`, `ungated-promotion`,
`worktree-provenance-missing`, `duplicate-capability-owner`, `cid-grounding-unverified`.
Severity follows the Finding Enumeration unless a rule states it inline.

---

## Reference Implementation

Non-binding per Scope & Neutrality. A solo operator keeps one Markdown deck source per increment beside
the joined artifact and derives three variants from one Slide Register: a presented funder variant, a
sent variant and a first-customer pilot variant. The Reveal replays the Demo Skeleton capture from the
MVP build revision, with simulated inputs labelled on screen. An agent drafts the deck, Claim Manifest
and change row inside a bounded harness in its own lane, an independent check resolves every manifest
row, and the operator authorizes each send. In this repository, the
[full](../template/pitchdeck-prd-tad-adr-mvp-gtm-template.md) and
[lite](../template/pitchdeck-prd-tad-adr-mvp-gtm-template-lite.md) planning templates carry a condensed
deck rendering bound to the Slide Register. No vendor, funder, tool or platform is named here.

---

## Validation Checklist

- [ ] Deck built from a baselined `continuity_id@revision`, stamped on cover and footer
- [ ] Coverage record current at handoff; both counts shown; deferred domains appear as gaps
- [ ] Variant Register row per variant: audience, decision, format, slot with Reveal and Q&A reserves, row disposition, stage, confidentiality, authorizing role
- [ ] All twelve register roles accounted for per variant; every supplementary slide hosted on a role
- [ ] Spine records beat, bound and transition per slide; throughline clauses sourced
- [ ] Claim Manifest resolves every headline, number, name, quote and screen; third-party facts dated; judged by an independent Evaluator
- [ ] Stage declared from owners' labels; gaps shown with next check and date
- [ ] Capabilities marked implemented, proposed or deferred; rubric level not overclaimed; AI claims evidenced with fallback named
- [ ] Displayed numbers match model values, rounding and periods at the same revision; illustrative figures labelled
- [ ] Ask sourced: decision, terms, amount or scope, milestone, date, Base and Downside runway, next step
- [ ] Reveal mode recorded; fallback and runbook ready; simulated data and edits disclosed
- [ ] Notes, appendix and Objection Register add no unsourced claim; risks link the Business Plan
- [ ] Change row recorded for every revision after a delivered one
- [ ] Exports from source; native design tokens; accessibility and reach obligations met
- [ ] Timed rehearsal recorded before first external delivery
- [ ] Deck source integrated through a lane; publication crossed a named Deploy Boundary
- [ ] External delivery authorized by the named role; private evidence linked, not copied
- [ ] Delivery & Outcome Log row per delivery; outcomes and the continue/pivot/stop decision routed to a successor Context
- [ ] Joined artifact's GTM and planning records updated before the session ends

---

## Mantra Application

**"One audience, one decision, one revision · Order on the demo's beats · Every headline is a sourced claim · Labels live on the slide · Numbers match the model · Built, planned and simulated stay distinct · The Reveal shows only what the VCC proves · Show the gap, never pad it · An agent drafts, an Evaluator checks, an operator sends · Outcomes feed the next revision"**

- **One audience, one decision, one revision**: a variant is a view of one Slide Register at one `continuity_id@revision`
- **Order on the demo's beats**: Hook, Probe, Reveal, `[domain action]`, Close carry the twelve roles
- **Every headline is a sourced claim**: the Claim Manifest resolves it before rendering
- **Labels live on the slide**: evidence status sits beside the claim it qualifies
- **Numbers match the model**: same value, rounding and period as the Financial Model
- **Built, planned and simulated stay distinct**: grounding records decide what is implemented
- **The Reveal shows only what the VCC proves**: fallback ready, edits disclosed
- **Show the gap, never pad it**: deferred coverage and missing evidence appear as rows
- **An agent drafts, an Evaluator checks, an operator sends**: no self-graded manifest, no ungated send
- **Outcomes feed the next revision**: successor Context, never a backward edit
