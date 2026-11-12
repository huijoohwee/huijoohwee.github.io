---
title: "Agentic RAG Venture Evidence Projection"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.1.0"
date: "2026-11-12"
lang: "en-US"
frontmatter_contract: "required"
owner: "Product function"
continuity_id: "AGENTIC-RAG-VENTURE-EVIDENCE-001"
prd_revision: "0.1.0"
tad_revision: "0.1.0"
adr_revision: "0.1.0"
mvp_revision: "0.1.0"
gtm_revision: "0.1.0"
guideline_revision: "3.4.1"
guideline_source: "guidelines/prd-tad-adr-mvp-gtm-guidelines.md"
reviewed_source_revision: "75757578f951b1b4c8aaa0e734a53326b446aaa9"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
load_policy: "on-demand"
lifecycle_status: "proposed"
verification_scope: "Optional JSON-LD evidence profile and static distribution route; no runtime service or product-demand claim"
---

# Agentic RAG Venture Evidence Projection

This joined PRD–TAD–ADR–MVP–GTM defines an optional, portable business-evidence profile for the existing
Agentic RAG JSON-LD consumer schema. It links operating evidence to the website's existing owners; it
does not create another business record, execution harness, or runtime authority.

## PRD

### Problem and minimum outcome

A founder needs to connect customer pain, an offer, a paid outcome, delivery, operating cost, and repeat
use while keeping observation separate from forecast and inference. The existing graph contract is
domain-neutral; the Lean Startup and Venture Record guidelines already own the experiment and financial
semantics. Without an optional projection, a consumer either invents fields or collapses different
business signals into one status.

The minimum outcome is one small JSON-LD module and example that carry those signals with provenance,
then publish the static schema at a stable, fetchable route. A single order or payment is evidence about
that transaction; it does not establish repeat demand, profitability, or viability.

### Ownership and boundaries

| Concern | Owner | This artifact |
|---|---|---|
| Hypotheses, experiments, learning metrics, pivot-or-persevere | [Lean Startup Guidelines](../../guidelines/lean-startup-guidelines.md) | References its evidence; defines no experiment process |
| PRD, TAD, ADR and continuity semantics | [PRD/TAD/ADR Guidelines](../../guidelines/prd-tad-adr-mvp-gtm-guidelines.md) and [CID contract](../../guidelines/cid-guidelines.md) | Reuses their IDs and joins |
| Bookings, billings, collected cash, recognized revenue, projections and accounting basis | [Venture Record](../../guidelines/prd-tad-adr-mvp-gtm-venture.md) | Carries source-linked evidence; defines no accounting policy |
| Agentic Graph execution, persistence and runtime behavior | Agentic Graph | Remains upstream; this profile is a passive consumer projection |
| JSON-LD projection and Pages artifact route | This PRD | Owns the optional module and static publication seam |

### Acceptance conditions

| ID | Acceptance condition | Evidence owner |
|---|---|---|
| VCC-01 | The graph, node, edge, metadata, and stage-metrics core remain domain-neutral. Venture fields live only in an optional module loaded by a consumer that needs them. | JSON-LD source review and `npm run check` |
| VCC-02 | The profile distinguishes `observed`, `forecast`, and `inferred` evidence and identifies the signal kind, event time, source, segment or cohort, period, denominator when meaningful, and measure/unit. Monetary observations carry currency. | Module structure and example review |
| VCC-03 | The example keeps pain observation, offer, order acceptance, cash collected, delivery, operating cost, and repeat use distinct. It makes no viability, revenue-recognition, or demand claim from a single transaction. | Example graph review against Lean Startup and Venture Record owners |
| VCC-04 | The module uses existing JSON-LD provenance and continuity fields. It adds no parallel CID, ledger, experiment record, accounting rules, or agent-invocation tokens. | Context and ownership review |
| VCC-05 | The exact Pages artifact serves the context and optional module at the lowercase `/schema/agentic-rag/` route. The published bytes are the same candidate checked in local Development readback. | Existing Pages artifact/readback owner |
| VCC-06 | Existing source links under `schema/AgenticRAG` remain valid during migration. The public lowercase route is generated from that source; the old v1 context URL remains a small compatibility alias. Existing v1 vocabulary IRIs stay unchanged. | Repository reference check and route readback |

### Product bounds

- Static JSON-LD only; free-tier and FOSS; no hosted service, paid dependency, external call, or new runtime.
- One optional evidence module and one bounded end-to-end example; no edits to downstream repositories.
- No personal customer data. Examples use synthetic names and values.
- Keep module files below 600 lines. Keep always-loaded prompt impact at zero; consumers opt in by reference.
- Preserve the existing source path because first-party source links exist in Agentic Graph, Knowgrph, Agentic OS, and Commerce OS. Use lowercase kebab case for the published URL. A physical source rename requires a separately grounded consumer migration.

## TAD

### Contract

Add `venture-evidence.jsonld` as an optional profile. Its compact record represents one business signal and
uses the existing base context, `prov:wasDerivedFrom`, `continuityId`, and ordinary graph-node identity.
`signalKind` distinguishes pain, offer, accepted order, collected cash, delivered outcome, operating cost,
repeat use, and decision. `evidenceState` distinguishes observation, forecast, and inference. Optional
measurement fields carry event time, cohort/segment, period, denominator, value, unit, and currency.

The profile transports evidence only. It does not infer demand, recognize revenue, calculate runway, set a
pivot threshold, or encode jurisdiction-specific accounting. The Lean Startup and Venture Record owners
retain those definitions.

### Distribution and resource use

The Pages controller copies the source schema to `/schema/agentic-rag/` in the sealed artifact and exposes
the existing v1 context at its prior URL as a compatibility route. The new route and compatibility context
are checked from the exact downloaded artifact before Production can start. No browser page loads the
profile by default; consumers fetch it only when selected.

## ADR

1. Keep `schema/AgenticRAG` as the authored source directory while first-party repositories link to it.
   Publish a lowercase URL from that source. Do not create a second editable schema tree.
2. Keep v1 vocabulary IRIs stable. Change the context document's distribution URL only for new consumers;
   retain the previous v1 context URL as a compatibility alias in the same Pages artifact.
3. Keep the universal graph context neutral. Add business semantics in one optional, lazy profile and
   link to the existing learning and financial owners.
4. Use the existing static Pages controller and exact-artifact readback. A new server, package, or separate
   release path costs more and is unnecessary for this payload.

## MVP — reference implementation

Implement the optional profile, one synthetic example, source-reference updates, and one Pages artifact
route. Reuse the existing JSON-LD files and controller. Close VCC-01 through VCC-06 on the exact candidate;
source checks alone do not prove public route availability. Production release remains a separate exact-SHA
authorization and receipt.

## GTM — reference implementation

The initial user is a founder or solo operator reviewing one real customer journey. The example demonstrates
how evidence stays distinct; it does not claim validated demand. First use should record one pain observation,
one priced offer, any actual payment, delivery, attributable cost, and repeat behavior, then link that evidence
to the existing experiment and Venture Record. A buyer's response, collected cash, and repeat demand remain
separate signals.

## Deferred scope

Physical source-directory rename, downstream-repository edits, accounting policy, automated financial
calculations, a general business ontology, new harnesses, and production deployment are outside this slice.
