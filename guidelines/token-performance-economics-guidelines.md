---
title: "Token Performance and Economics Guidelines"
doc_type: "Guideline Module"
version: "2.1.0"
date: "2026-09-21"
lang: "en-US"
schema: "agentic-economics-guidelines/v2"
frontmatter_contract: "required"
owner: "Performance and economics contract"
load_policy: "on-demand"
runtime_scope: "measurement and optimization guidance"
runtime_claim: "source contract only; no measured savings or deployed readiness implied"
local_rung: "spec-complete"
delivered_rung: "undocumented"
universal_scope: true
semantic_authority: "cid-guidelines.md#shared-field-contract"
---

# Token Performance and Economics

Optimize cost and elapsed time per accepted user outcome. Use the shared
[CID/RAO/SVO contract](./cid-guidelines.md#shared-field-contract),
[artifact continuity](./adlc-artifact-continuity.md), and
[rapid MVP loop](./adlc-rapid-prd-tad-adr-mvp-gtm-sprint.md). Lifecycle budgets and execution
remain owned by the pinned `agentic-os` package. This module loads on demand.

## Measurement Contract

State the accepted outcome, source revision, workload, environment, measurement
window, and correctness check before comparing alternatives. Report warm and cold
runs separately. Unknown usage stays unknown; absent cost is never zero cost.

| Measure | Accounting boundary |
|---|---|
| Time to value | User request through accepted result, including queues, review, retries and waits |
| Model usage | Input, cached input and output tokens with model/tokenizer identity; record tool calls separately |
| Resource usage | CPU time, peak memory, bytes read/written/transferred, provider requests and retention |
| Operating cost | Actual provider usage at dated rates plus infrastructure, maintenance and recovery effort |
| Revenue | Collected payment linked to the delivered outcome, with refunds and fees accounted separately |
| Reliability | Accepted outcomes / attempted outcomes, including failed and abandoned attempts |

Compare equivalent workloads and acceptance criteria. Report sample count and
latency distribution when sample size permits; a single run is an observation,
not a percentile or universal benchmark. For a nonzero comparable baseline,
relative reduction is `(baseline - candidate) / baseline`. No fixed format
compression ratio, model price or total-system speedup follows from one fixture.

## Optimization Responsibilities

Each row owns a different cost boundary. Select only measured bottlenecks; do not
create a controller, cache, service or agent for every row.

| Boundary | Smallest useful intervention | Required invalidation or bound |
|---|---|---|
| Context and discovery | Index metadata; load only the selected owner and relevant sections | Bind loaded content to source revision; cap bytes and expansion depth |
| Computation and tools | Reuse deterministic owner operations; batch independent reads | Cap batch size, concurrency, memory and deadlines; preserve per-item failures |
| Persistence and transfer | Reuse existing stores; deduplicate immutable content | Scope keys by tenant, capability, input digest and version; bound retention |
| Rendering and hydration | Defer optional surfaces; chunk and virtualize large views | Bound chunks below 500 kB; expose stale/partial state and cancellation |
| Coordination and delivery | Use disjoint lanes and dependency order; reuse exact check coverage | Refresh authority and source observations at each effect; never cache permission |
| Recovery and learning | Resume from verified progress; record failure and next condition | Bound retries/backoff; no automatic replay of an uncertain money effect |

Cache derived data only when its owner can define identity, lifetime and eviction.
Do not cache an authorization, payment outcome or readiness verdict as permanent
truth. A timeout means unknown completion until the effect owner reconciles it.
Prefer event-driven continuation when supported; otherwise use bounded polling
with backoff and a stated stop condition. Quotas and free-tier limits are inputs
to verify, not architectural promises.

## Incremental work contract

Forbid costly recomputation and rendering for unchanged inputs. Repair the existing
owner; do not add a parallel cache, scheduler, renderer, or performance controller.
Required simulation steps, changed inputs, validation and effect readback remain
real work. An optimization must preserve their ordering, events and correctness.

- Identify the hot operation and its dependency set before changing it. Precompute
  expensive sort keys outside comparators; update only affected items after a
  mutation. In a simulation step, invalidate contact results when resolution moves
  either body, and discard step-local results before the next step.
- Reuse derived work only with an explicit input identity, lifetime and invalidation
  rule. Include source/configuration revisions and caller scope where relevant.
  Bound entries and retained bytes; release them on replacement or disposal.
  Do not add memoization when key comparison, allocation or retention costs more
  than recomputing. Mutable inputs require versioning or explicit invalidation.
- Keep subscriptions, selectors, callbacks and effect dependencies stable when
  their meaning is unchanged. Do not recreate an entire scene, editor, catalog or
  list for a local edit, transport tick, pointer movement or unrelated state update.
  Reuse existing incremental updates, batching, instancing and virtualization;
  avoid per-frame UI state writes when the existing render owner can update directly.
- Use the existing clock and scheduling owner. Coalesce duplicate pending work by
  input identity, cap in-flight work, and cancel obsolete work or reject its stale
  result. Stop optional visual work for inactive/hidden surfaces and release
  listeners, animation handles, GPU resources and buffers on disposal. Visibility
  never silently cancels required simulation, persistence or acknowledged effects.
- Verify unchanged input, one changed dependency, reset/reload, eviction and teardown
  as applicable. Preserve deterministic state, events, selection and edit/view parity.
  Compare cold/warm and active/idle cases on the same fixture and device conditions;
  measure compute/render counts, CPU/frame time and memory without double-counting.
  Keep expensive profiling opt-in and bounded; no permanent profiler or polling loop.

Use existing affected-check and release owners. Cache reuse never substitutes for
fresh authority, required provider CI or content-integrity checks. Keep free/local
delivery and zero paid calls intact. Report measured resource changes separately
from provider waits, token usage and cash cost; a faster fixture proves neither
system-wide savings nor production readiness. Revert if correctness, responsiveness
or the agreed memory/frame budget regresses.

## Documentation and Agent Loading

- Keep identity and routing metadata in YAML frontmatter at byte zero. YAML is
  parsed as data; metadata never grants tool, spend, merge or deployment authority.
- Put universal behavior in the existing always-load owner; keep details lazy.
  Measure always-load byte deltas separately from optional corpus size.
- Use prose for reasoning, tables for comparisons, Mermaid for useful diagrams,
  and JSON/YAML for machine contracts. Choose clarity and measured use cost;
  renderer support and token counts depend on the actual consumer.
- Reference shared semantics and code. Remove replaced guidance instead of
  keeping repeated mantras, tables and checklists for the same obligation.
- Keep authored files below 600 lines. Compaction preserves decisions, source
  identities, pending effects and recheck conditions; it never discards evidence
  needed to resume safely or substitutes a summary for an authoritative receipt.

## Selection and Verification

Apply hard constraints first, then evidence-backed arguments and counterarguments,
then outrank feasible options by validated pain/WTP, near-built reuse, time to first
delivered value and operating cost. Unknown demand remains unknown. Reopen the
selection when evidence changes; a numerical score cannot waive a constraint.

Use existing owner suites and their declared coverage. Run a shared suite once per
unchanged candidate/context when its successful umbrella command covers the
needed checks; failures confer no inferred coverage. A source or context change
invalidates affected results. Report fixture, repository, cross-repository E2E and
live-provider evidence separately. Never label a focused suite as the full loop.

For payment flows, optimize discovery and readback with deterministic operations.
Keep explicit buyer confirmation, current price/expiry, idempotency, reconciliation,
receipt readback and failure recovery in the acceptance criteria. Offline drafts
may resume; settlement requires the effect owner's verified online result.

Close an optimization with the diff, comparable measurement, correctness result,
remaining risk and rollback condition. Without a comparable measurement, report
the structural change and leave the performance claim unmeasured.
