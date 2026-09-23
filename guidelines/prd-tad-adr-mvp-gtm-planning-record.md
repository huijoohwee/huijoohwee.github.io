---
title: "PRD, TAD & ADR MVP→GTM Planning Record Module"
doc_type: "Guidelines Module"
version: "1.1.0"
date: "2026-09-21"
lang: "en-US"
frontmatter_contract: "required"
owner: "Planning record contract"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "3.3.0"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# PRD, TAD & ADR MVP→GTM Planning Record Module

## Scope & Ownership

This module owns two seams and nothing else:

1. **Unified artifact composition** — how the `MVP` and `GTM` sections join the PRD → TAD → ADR
   specification chain under one continuity ID and exact revision without becoming a fourth or fifth
   specification phase, a second document set, or a lifecycle controller.
2. **Planning record row** — the four-column task record that joins one bounded unit of work to that
   artifact through the shared CID and RAO fields, replacing the former eleven-column planning row.

It inherits the parent set's Scope & Neutrality Contract, Rule Identity derivation, and finding recording
contract without restating them. Field meanings stay in the [shared CID/RAO/SVO contract](./cid-guidelines.md#shared-field-contract);
identity and revision joins stay in [Artifact Continuity](./adlc-artifact-continuity.md#continuity-identity-and-revision-contract);
sprint compression stays in the [Rapid MVP Sprint profile](./adlc-rapid-prd-tad-adr-mvp-gtm-sprint.md); pain, demo, roadmap and
monetization obligations stay in the parent index; pitch-deck, business-plan, and financial-model projections of
the five roles stay in the [Venture Record module](./prd-tad-adr-mvp-gtm-venture.md) and add no sixth role. A planning
record that redefines any of those is a `duplicate-owner` finding.

---

## Unified Artifact Composition

`PRD-TAD-ADR-MVP-GTM` is one joined artifact with five addressable section roles. The locator names the roles
for a human reader; the join is the continuity ID and exact revision carried in content.

| Section role | Consumes | Produces | Owning rules |
|---|---|---|---|
| PRD | Grounded pain, WTP evidence, constraints, current capabilities | Intent, scope, criteria as VCCs, TTV row | [Pain-Point Mapping](./prd-tad-adr-mvp-gtm-guidelines.md#pain-point-to-feature-mapping), [Time-to-Value](./prd-tad-adr-mvp-gtm-guidelines.md#time-to-value) |
| TAD | The exact accepted PRD revision | Component owners, contracts, flows, Deploy Boundary Register | [Flow Patterns](./prd-tad-adr-mvp-gtm-guidelines.md#flow-patterns), [Division of Work](./prd-tad-adr-mvp-gtm-guidelines.md#division-of-work) |
| ADR | One material choice and its evidence | Decision, rejected alternatives, consequences, recovery condition | [Selection Criteria](./prd-tad-adr-mvp-gtm-guidelines.md#platform-specific-selection-criteria--multi-agent-reasoning-pipeline) |
| MVP | Accepted criteria, design elements, applicable decisions | One dependency-closed vertical slice: `Must` features, Evidence References, derived rung, Demo Skeleton | [Readiness Ladder](./prd-tad-adr-mvp-gtm-guidelines.md#readiness-ladder), [Verification](./prd-tad-adr-mvp-gtm-guidelines.md#autonomous-implementation-verification), [Demo Skeleton](./prd-tad-adr-mvp-gtm-guidelines.md#demo-skeleton) |
| GTM | The MVP slice plus its pain and WTP evidence | Named payer segment, first-dollar path ranking, boundary evidence (demand, offer, transaction, fulfillment, runtime, economics), learn-loop measurements | [Monetization](./prd-tad-adr-mvp-gtm-guidelines.md#monetization), [Roadmap](./prd-tad-adr-mvp-gtm-guidelines.md#roadmap), [Lane Topology](./prd-tad-adr-mvp-gtm-guidelines.md#lane-topology--deploy-boundary), [Value-to-Revenue Loop](./adlc-rapid-prd-tad-adr-mvp-gtm-sprint.md#value-to-revenue-loop) |

**Directives**:
- Bind all five section roles to one continuity ID at one exact revision, whether combined in one file or
  split for a stated size, ownership, or review need; a filename-only join is `artifact-naming-noncompliant`
- Keep `MVP` the smallest dependency-closed slice whose every `Must` criterion carries a VCC and an Evidence
  Reference; a rung authored ahead of that evidence is an `unproven-claim` at `blocker` severity
- Keep `GTM` an evidence record, not a narrative: reuse the parent's `unvalidated` → `demand-proven` pain
  labels and `mechanism-proven` / `demand-validated` monetization labels; a revenue statement without actual
  payment evidence is `monetization-demand-unvalidated`
- Treat `MVP` and `GTM` as consumers of PRD criteria, TAD elements, and ADR decisions; a requirement, design,
  or decision that first appears in either section is a `duplicate-owner` finding against the owning role
- Run one Constraints ↔ Argumentation ↔ Outranking record for a GTM channel, price, or provider choice exactly
  as for any platform choice; a ranked stream without that record is `roadmap-order-unexplained`
- Feed every GTM learn-loop result — completed outcome, paid conversion, operating cost — into a successor
  Context rather than a backward edit of the accepted revision, per the Continuity Graph

---

## Planning Record Row Contract

One planning record joins one bounded unit of work to one `PRD-TAD-ADR-MVP-GTM` revision. Its body carries
exactly one dated heading and one row under the canonical four-column header:

```markdown
| PRD-TAD-ADR-MVP-GTM | CID | RAO | Updated Date |
|---|---|---|---|
| `[CONTINUITY-ID]@[revision]` | C: [context] · I: [intent] · D: [directive] | R: [role] · A: [subject verb object] · O: [outcome] · check: [named check] | YYYY-MM-DD |
```

### Cell Grammar

| Cell | Grammar | Resolves to |
|---|---|---|
| `PRD-TAD-ADR-MVP-GTM` | `` `[continuity_id]@[revision]` `` optionally followed by one locator link `[text](path)` | The `continuity_id` declared in the artifact's frontmatter at that exact `prd`/`tad`/`adr` revision or immutable digest |
| `CID` | `C: … · I: … · D: …`, three non-empty segments in that order; `D` at fifty words or fewer | `context`, `intent`, `directive` of the shared field contract |
| `RAO` | `R: … · A: … · O: … · check: …`, four non-empty segments in that order; `A` is one subject-verb-object statement | `role`, `action`, `outcome` of the shared field contract; `check` is the outcome's named acceptance check |
| `Updated Date` | `YYYY-MM-DD` equal to the dated heading and the record's `updated_date` | Immutable record date |

SVO is recovered from `A`, not authored as another column. The record key — a stable kebab-case context
key — is carried by the record's locator and frontmatter, never as a table column, so the row states no
identity twice.

### Identity Choice

The first cell is a **continuity reference**, not a freshly minted random identifier:

- A random UUID resolves to nothing without a registry; a registry is a second store for structurally
  identical identity data and an `unjustified-storage-duplication` finding
- `continuity_id@revision` resolves to one locatable artifact whose frontmatter declares that ID, so a
  reader or checker can open it, and the `@revision` pins which PRD, TAD, ADR, MVP, and GTM content the task
  consumed — the continuity module's "paths locate content; they do not prove identity" rule
- A project whose declared naming convention issues continuity IDs as UUIDs (for example time-ordered UUIDs)
  satisfies this cell unchanged: the grammar constrains the join, not the ID alphabet

**Directives**:
- Reference one `continuity_id@revision` per record; a record with none, or with a path in place of the
  reference, is `artifact-naming-noncompliant`, and a task whose directive is not joined to that artifact's
  criterion, design element, or decision is an `unjoined-directive`
- Carry `C`, `I`, `D`, `R`, `A`, `O`, and `check` explicitly; a missing or empty segment is
  `cid-schema-noncompliant`, and a `C` that names no inspectable source or revision is `cid-context-uncited`
- Keep the three tiers convergent: `A` implements `D`, `O` is checkable against `I`, and `check` names the
  mechanism that will judge `O`; a row whose RAO resolves to a different instruction than its CID is
  `cid-composition-divergence`
- Write `A` as one transformation with one completion condition; a compound action is
  `cid-decomposition-missing` — author a second record with its own key instead
- Keep `O` a produced, observable state, never a verdict; a self-graded outcome is not an outcome
- Author a new record for a new bounded unit of work under a new key; never rewrite a committed record or
  reuse its key for a successor

---

## Legacy Column Mapping

The former eleven-column row is retired for new records. Committed legacy rows remain immutable history and
are parsed only for ordering and duplicate-key detection. Every legacy column has exactly one destination:

| Legacy column | Destination | Why |
|---|---|---|
| Context | Record key (locator and frontmatter) plus `C:` | Key and prose context were conflated in one cell |
| Intent | `I:` | Unchanged meaning |
| Directive | `D:` | Unchanged meaning and fifty-word bound |
| Module, Class/Object, Function/Method | `A:` object, grounded in the referenced TAD design element | Structure is owned by TAD, not restated per task |
| Input | `C:` | Verified inputs are context |
| Output | `O:` plus `check:` | An outcome without a named check cannot raise a rung |
| Decision Logic | The referenced ADR at `@revision` | Restating a decision per task was a `duplicate-owner` pattern |
| Next Step Recommendation | Successor record's `D:` | A next step is a new bounded unit, not a trailing cell |
| Updated Date | `Updated Date` | Unchanged |

---

## Projection Contract

A board or index may derive rows from planning records; it invents nothing:

| Derived field | Source cell | Absent value |
|---|---|---|
| acceptance | `O:` including its `check:` | none |
| evidence | `PRD-TAD-ADR-MVP-GTM` reference | none |
| next action | `D:` | none |
| priority, owner, worker, target | not recorded | declared absent value |

**Directives**:
- Derive every projected cell from a recorded cell or a declared absent value; a projected status other
  than "recorded, recommendation outstanding" is `status-conflict`
- Fail closed on any projection drift from the immutable records; regenerate rather than hand-edit

---

## Conformance Findings

This module introduces no new finding type. It records against the parent's enumeration:
`artifact-naming-noncompliant`, `unjoined-directive`, `cid-schema-noncompliant`, `cid-context-uncited`,
`cid-composition-divergence`, `cid-decomposition-missing`, `duplicate-owner`, `unproven-claim`,
`monetization-demand-unvalidated`, `roadmap-order-unexplained`, `status-conflict`, and
`unjustified-storage-duplication`.

---

## Reference Implementation

Non-binding per Scope & Neutrality. The publishing repository binds this contract as follows:

- `docs/TODO.md` declares the active record schema `todo-context-record/v3`, its adoption date, the record
  path pattern `todo/YYYY-MM/<context>.md`, and the frontmatter keys
- `scripts/planning-context-record-contract.mjs` validates the header, cell grammar, revision reference,
  date identity, unique record keys, immutable legacy shards, and the adoption rule that forbids a legacy
  eleven-column record dated after adoption
- `scripts/kanban-projection.mjs` renders the Projection Contract into a digest-fenced board block
- `npm run planning:check` in the private `.workspace/.todo` owner validates shared records and the board; this website tests the reusable validators with synthetic records

Legacy `todo-context-record/v2` and `todo-log/v1` files are byte-immutable and stay valid; only their
authoring is closed.

---

## Validation Checklist

- [ ] One continuity reference `continuity_id@revision` per record, resolvable to a declared frontmatter ID
- [ ] `C`, `I`, `D` present and ordered; `D` at fifty words or fewer
- [ ] `R`, `A`, `O`, `check` present and ordered; `A` is one subject-verb-object transformation
- [ ] RAO implements CID; `check` names the mechanism that judges `O`
- [ ] Record key unique, immutable, kebab-case, equal in locator and frontmatter
- [ ] `Updated Date` equals the dated heading and `updated_date`
- [ ] MVP and GTM sections consume PRD, TAD, and ADR rather than restating them
- [ ] Legacy records untouched; projection regenerated in the same change

---

## Mantra Application

**"One artifact, five roles · One record, four cells · Reference resolves, UUID alone does not · Outcome names its check · Next step is a new record"**
