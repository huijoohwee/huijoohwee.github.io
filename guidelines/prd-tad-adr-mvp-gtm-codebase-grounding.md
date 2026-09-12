---
title: "PRD-TAD-ADR-MVP-GTM Codebase Grounding - Reference Implementation"
doc_type: "Guidelines Companion"
version: "1.2.0"
date: "2026-09-12"
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
parent_version: "2.7.0"
---
# Codebase grounding - reference implementation

Ground specifications in exact source evidence, keep one owner per concern and distinguish source
verification from runtime proof. This reusable procedure adds no semantic fields or universal topology.
The reference implementation connects the [authoring guideline](./prd-tad-adr-mvp-gtm-guidelines.md) to seven
named repositories. It covers ownership and integration seams, not every feature in their specifications.
The [machine-readable snapshot](../schema/AgenticRAG/prd-tad-adr-mvp-gtm-grounding.json) owns exact source
revisions, artifact SHA-256 values, named checks and claim dispositions. Do not copy that inventory
into consumer documents. This guide and the snapshot load only for affected authoring or integration work.

## Ownership - reference implementation

The upstream [composition guide](https://github.com/huijoohwee/agentic-os/blob/main/guides/TECH-STACK.md#division-of-work)
owns the seven-repository capability partition, topology and deployment boundaries. Its exact revision
and bytes are recorded in the snapshot. Use that source revision when verifying an older snapshot;
the navigation link follows current upstream. The snapshot's `owns` fields describe the bounded source
scope inspected here; this guide does not maintain a second topology table.

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
existing lifecycle-flight observations own prerequisite checks. Operation-scoped flight V2 is integrated
upstream and documented in the snapshot-bound `agentic-os/guides/LIFECYCLE-FLIGHT.md`. Consumer availability
still depends on its exact reviewed package pin and operation declarations. Select the actual runner's
coverage; do not make containers, browsers, model endpoints or accelerators mandatory for unrelated checks.

Discover owner suites through `agentic-os/test/repositories.json` and `observe --checks`; execute intact
umbrella commands using its advisory validation plan. Omit a repeated child suite only when exact source
and complete successful execution establish coverage. Missing profiles, dependencies or failed runs retain
unverified coverage. GameXR's observed source lacks `.agentic-os.json`, so shared harness discovery cannot
bind its checks; this snapshot records its package scripts without inventing a profile or authority.

Apply Constraints -> Argumentation -> Outranking with the existing `agentic-os/src/rank.mjs` owner:
reject infeasible options, compare grounded tradeoffs and prioritize verified buyer pain plus the
smallest source delta. Record uncertainty and a stop condition. Additional agents or models are useful
only when independent work or evaluation justifies their cost; stage names do not require extra agents.
No monetary savings, demand or production claim follows merely from a ranking or source test.

## Findings and integration - reference implementation

The refreshed 2026-09-12 snapshot records bounded source claims and unresolved delivery/demand claims. Their dispositions
apply to its exact revisions, not future HEADs. It is not an exhaustive guideline conformance ratio or
a production verdict. Git history retains the preceding snapshot and its then-unresolved corrections.

- Canonical RAO V3 separates the SVO target from the observed outcome and requires explicit re-grounding
  of older records. Source integration does not silently migrate V2 data or prove runtime semantics.
- The integrated Canvas combined specification declares `spec-complete`, retains `runtime-ready` as a
  target and routes evidence to individual owners; whole-document runtime readiness remains unproved.
- Graph's release workflow names `agentic-graph` paths; the production mirror also contains
  historical app artifacts. Treat requested public routes and mirror-route equivalence as unverified
  until the source release owner produces exact deployment evidence. Do not rename or patch generated
  assets from this documentation record.
- Buyer willingness to pay, settlement, repeat use and contribution margin remain unverified here.
  Use the existing Commerce demand/economics work, not invented savings or a new roadmap.

Verify each consumer's exact source pin before advancing its baseline. Refresh affected joins after
integration; capture a new snapshot when its referenced source or claim disposition changes.
Green documentation checks prove these documents' bounded contracts, not the complete commerce loop.

## Verification

`npm run prd-tad-adr-mvp-gtm:policy:check` validates the local guideline structure and grounding record shape.
For available local clones, `node scripts/check-prd-tad-adr-mvp-gtm-guideline.mjs --codebase-root=/absolute/workspace`
also verifies all recorded artifacts against the exact Git revisions, without executing their code,
fetching remotes, starting services or altering worktrees. Historical revision verification does not
establish current HEAD or deployment freshness; reacquire those at the consuming transition.

## Experience and first dollar — reference implementation

Apply the [maturity rubric](prd-tad-adr-mvp-gtm-maturity.md) to the existing commerce slice.
The snapshot owns exact source pins and digests; this table maps the four criteria to reusable code
and named checks. It is a check plan, not a scored product review.

| Criterion | Source owner and useful validation | Evidence still needed to rate the experience |
|---|---|---|
| Core Requirements & Functionality | Commerce `src/core/checkout-finalization.ts`, `test/e2e/dev-paid-loop.spec.ts`; `test:e2e:dev` | Observed entry-to-receipt/readback loop in the selected environment, including retries |
| Innovation & Theme Alignment | Commerce `src/local-first/checkout.ts` and existing merchant/storefront flow | Prospect comparison against today's workaround; explain why context and permitted actions help |
| Technical Execution & Integration | Canvas admission and lazy `tool-search.js`; `commerce-admission-provider:check`, `tool-search:check`; Graph payment/release owners | Exact deployed identity, isolation, spend limits, failure/recovery and concurrency evidence |
| Usefulness & Agentic Experience | Commerce demand verifier and `docs/prd-tad-adr-mvp-gtm-handoff.md`; demand verifier tests | Priced prospect walkthrough, accepted outcome and repeat use; synthetic signatures cannot establish WTP |

Follow the existing Commerce sprint rather than launching another backlog: a bounded merchant/storefront
setup and activation is a candidate first-dollar service. Record the reachable buyer's workaround,
frequency, economic cost and offered price before claiming high WTP. Prefer this existing slice only if
its observed buyer evidence outranks alternatives; the current snapshot selects no commercial winner.
The next useful transition is a priced pilot and timed demonstration, followed by collected payment and
support-cost evidence. Marketplace take-rate expansion and additional agent roles wait for that evidence.

Current Commerce handoff records a protected public **sandbox** release and synthetic settlement.
That is a newer observation than its retained 2026-09-09 blocked Dev-loop history. It still explicitly
reports `realMoney:false`; neither a test payment nor sandbox deployment proves actual revenue,
independently evaluated production payment, or demand. Consult the exact source-bound handoff before
repeating a historical blocker as current fact.

For this reference implementation, inspect
[commerce-agents at the recorded revision](https://github.com/anthropics/commerce-agents/blob/fd4d59224ab96b43c6dc6888207c67b3bd5a24cf/README.md)
for shopping/merchant responsibility boundaries and staged effects. Its demo does not place orders or
charge cards. Reuse the local owners above; no reference code, SDK or package is copied or installed.

Cloudflare, GitHub and Podman remain reference stack preferences under the project's cost/license and
runtime gates. [Cloudflare Wallets documentation](https://developers.cloudflare.com/wallets/) checked
2026-09-12 exposes handle reservation; a reserved handle cannot yet hold, send or receive funds.
Keep Wallets a deferred provider option until account eligibility, a usable API, cost and payment
acceptance evidence are available. Preserve existing payment adapters and do not invent a Wallets SDK.

The requested route chain remains source-owned: Graph `dev:apex` (apex preview) / `dev` → generated
`huijoohwee/agentic-graph` → Cloudflare `airvio.co`, `/agentic-commerce-os/`, `/agentic-graph`.
Graph release/sync code and the mirror acceptance contract supply the topology checks; the Commerce
sandbox route has its own owner evidence. Do not infer that all three URLs share one release or patch
mirror assets to manufacture agreement. Source-only validation here leaves route equivalence unverified.

Local recheck on 2026-09-12: Commerce checkout-finalization and demand-verifier suites passed 11 tests
at the snapshot revision. `npm run test:e2e:dev` stopped before artifact creation with
`podman_workerd_override_required`. Supply a matching-platform workerd verified against its build receipt
through the existing `MINIFLARE_WORKERD_PATH` contract before rerunning. This host result neither invalidates
the historical protected sandbox release nor proves the current full Dev loop.
