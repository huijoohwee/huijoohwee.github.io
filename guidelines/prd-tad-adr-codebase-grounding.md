---
title: "PRD/TAD/ADR Codebase Grounding - Reference Implementation"
doc_type: "Guidelines Companion"
version: "1.0.0"
date: "2026-09-09"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
schema: "prd-tad-adr-codebase-grounding/v1"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
parent: "PRD, TAD & ADR Guidelines"
parent_version: "2.4.0"
---
# Codebase grounding - reference implementation

Ground specifications in exact source evidence, keep one owner per concern and distinguish source
verification from runtime proof. This reusable procedure adds no semantic fields or universal topology.
The reference implementation connects the [authoring guideline](./prd-tad-adr-guidelines.md) to seven
named repositories. It covers ownership and integration seams, not every feature in their specifications.
The [machine-readable snapshot](../schema/AgenticRAG/prd-tad-adr-grounding.json) owns exact source
revisions, artifact SHA-256 values, named checks and claim dispositions. Do not copy that inventory
into consumer documents. This guide and the snapshot load only for affected authoring or integration work.

## Ownership - reference implementation

| Repository | Sole responsibility in this mapping | Consumes rather than owns |
|---|---|---|
| `agentic-os` | ADLC lifecycle, bounded feature ranking, source-composition observation | Product acceptance, provider execution and release evidence |
| `huijoohwee.github.io` | Shared authoring semantics and reference schema projections | Application runtime and deployed-state claims |
| `agentic-canvas-os` | Agent application runtime, admission provider, progressive tool discovery | ADLC lifecycle and Graph browser/rendering implementation |
| `agentic-commerce-os` | Checkout, Commerce admission consumption and paid-loop validation | Admission-provider implementation and Graph provider contracts |
| `agentic-graph` | Canvas/browser source and Graph production build/release | Shared authoring semantics, pinned Canvas docs and ADLC |
| `huijoohwee` | Generated production artifacts and projection checks | Source authoring, architecture decisions and deployment authority |
| `GameXR` | Spatial runtime and its release validation | Reviewed shared archives; no duplicate shared input or physics owner |

This is a responsibility partition, not a claim that repository dependencies form a DAG. Service
request/reply relationships may be bidirectional; keep the build/release order explicit and acyclic.
Reuse the upstream `agentic-os/catalog/composition-source-lock.json` and existing composition check
for cross-repository admission contracts. This record neither replaces that lock nor executes it.

## One semantic chain

The [CID/RAO/SVO contract](./cid-guidelines.md#shared-field-contract) owns meaning; the
[continuity module](./adlc-artifact-continuity.md) owns joins. The
[RAO JSON-LD file](../schema/AgenticRAG/roles-actions-outcomes-schema.jsonld) is a versioned projection.
It must not redefine the scoped SVO object as the observed outcome or collapse several independently
closable actions into one step. Projection validation is not runtime execution or independent evaluation.

Use one continuity ID and exact upstream revisions across the PRD criterion, TAD component/interface,
applicable ADR and RAO task. Keep the three document roles addressable in one combined artifact unless
ownership or size requires a split. An ADR records a material decision and consequences, not every edit.

For one scoped change, join its criterion to an existing source owner, its contract, the smallest
implementation delta and a named behavior check. Carry budget, dependencies and evidence by reference.
Do not add a second registry, parser, store, orchestrator or schema to make a document appear complete.

## Resource and validation demand - reference implementation

Select checks by their real coverage and prerequisites. Commerce domain/unit/Worker checks are
independent of its sandbox paid-loop runner. A blocked sandbox leaves that loop unverified; a smaller
browser suite cannot earn its acceptance criterion. Record command, revision, scope, prerequisites,
outcome and elapsed time. Reuse unchanged evidence only within its declared validity.

Canvas's `agent-api/src/tool-search.js` already owns bounded session-scoped tool disclosure. ADLC's
existing lifecycle-flight observations own prerequisite checks. Operation-scoped flight V2 is an
unmerged upstream candidate (PR #81), not an installed capability of every consumer. Adopt exact reviewed
pins and owner declarations before using it; do not make containers, browsers, model endpoints or
accelerators mandatory for unrelated checks.

Apply Constraints -> Argumentation -> Outranking with the existing `agentic-os/src/rank.mjs` owner:
reject infeasible options, compare grounded tradeoffs and prioritize verified buyer pain plus the
smallest source delta. Record uncertainty and a stop condition. Additional agents or models are useful
only when independent work or evaluation justifies their cost; stage names do not require extra agents.
No monetary savings, demand or production claim follows merely from a ranking or source test.

## Findings and integration - reference implementation

The snapshot records six bounded claims: two confirmed, two contradicted and two unverified.
It is not an exhaustive guideline conformance ratio or a production verdict.

- Canonical RAO V2 still equates object and outcome. Site PR #197 contains the already-reviewed
  candidate correction; preserve that lane and integrate its exact candidate separately.
- The observed Canvas combined specification overstates whole-document readiness. Its companion
  candidate narrows the status to `spec-complete` and routes proof to individual owners.
- Graph's release workflow names `agentic-graph` paths; the production mirror also contains
  historical app artifacts. Treat requested public routes and mirror-route equivalence as unverified
  until the source release owner produces exact deployment evidence. Do not rename or patch generated
  assets from this documentation record.
- Buyer willingness to pay, settlement, repeat use and contribution margin remain unverified here.
  Use the existing Commerce demand/economics work, not invented savings or a new roadmap.

Review the schema correction and this grounding record before consumers advance their baselines.
Refresh affected joins after integration; capture a new snapshot only when its source scope changes.
Green documentation checks prove these documents' bounded contracts, not the complete commerce loop.

## Verification

`npm run prd-tad-adr:policy:check` validates the local guideline structure and grounding record shape.
For available local clones, `node scripts/check-prd-tad-adr-guideline.mjs --codebase-root=/absolute/workspace`
also verifies all recorded artifacts against the exact Git revisions, without executing their code,
fetching remotes, starting services or altering worktrees. Historical revision verification does not
establish current HEAD or deployment freshness; reacquire those at the consuming transition.
