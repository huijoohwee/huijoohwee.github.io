---
title: "PRD, TAD & ADR Economics & Time-to-Value Module"
doc_type: "Guidelines Module"
version: "1.2.1"
date: "2026-11-17"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
parent: "PRD, TAD & ADR Guidelines"
parent_version: "3.5.1"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# PRD, TAD & ADR Economics & Time-to-Value Module

## Scope & Ownership

This module owns the economic lenses every PRD and TAD decision is evaluated through, and the first-success latency gate that governs the Flow Patterns. It owns no document structure and no conformance vocabulary.

It inherits the parent set's Scope & Neutrality Contract, Rule Identity derivation, and finding recording contract without restating them. Rule IDs derive from the owning `##` section anchor and the rule's document-order ordinal, exactly as in the parent.

---

## Solo-Dev AI-Native Orientation

For an MVP→GTM sprint, use the [maturity assessment handoffs](prd-tad-adr-mvp-gtm-maturity.md#mvp-to-gtm-use) alongside pain/WTP and time-to-first-dollar. Quality ratings never substitute for demand.

### Five Compounding Lenses

| Lens | Definition | Applied In |
|---|---|---|
| **Min-Viable-Max-Value** | Ship the smallest scope that maximises user impact per hour invested | Phase 0 validation, MoSCoW, success metrics |
| **TCO-Zero** | Total cost of ownership defaults to zero; every paid dependency requires explicit justification against a FOSS alternative | Phase 0 gate, ADR, Quality Attributes |
| **Token Economics** | LLM token consumption (input + output + cache hit rate) is a measurable system metric, not an afterthought | Data flows, Component specs, Quality Attributes |
| **Harness-First** | AI capabilities are accessed through structured, observable harnesses (typed inputs → typed outputs → logged decisions) rather than raw prompt calls | TAD components, Integration contracts, orchestration diagrams |
| **Concurrency-Safe** | Every artifact, directive, and merge holds under multiple simultaneous work trees, devices, and agents without deadlock, corruption, or hallucinated state | Concurrent Collaboration & Work-Tree Integrity, Division of Work, merge and lane rules |

### Guideline Load Budget

Load by the current decision and applicable capability, using phase as navigation. The scope contract
and module index remain the small always-load surface. Other sections are guideline add-ons loaded
when their trigger applies; entering a phase does not require all its modules or projections.

| Decision / trigger | Sections to load | Rationale |
|---|---|---|
| Material assumption needs testing | Lean Startup `hypothesis-register`, `experiment-design`; `time-to-value` if outcome latency matters | Cheapest sufficient test with pre-stated bounds and uncertainty |
| Requirements need specification | `core-templates` (PRD), applicable journey, `time-to-value` | One accepted outcome and its checks |
| Implementation or material choice needs design | `core-templates` (TAD, applicable ADR), applicable `flow-patterns` | Preserve relevant interfaces, failure modes and decisions |
| Capability or effect enters scope | Applicable AI harness, agent-platform, commerce, security, data or obligation owner | Resolve applicable constraints before the dependent action |
| Conformance verdict is needed | `rule-identity--classification`, applicable verification and findings | Check affected requirements and joins |
| Source execution or delivery is needed | `adlc-execution-seam`; applicable demonstration, readiness and Deploy Boundary sections | Exact checks, authority and receipts for the selected effect |
| Price, contribution, capacity, cash or financing affects a decision | PD-BP-FM and Financial Model sections needed for that decision | Smallest sufficient financial view; full model only when required |
| Named operating or audience decision needs a projection | Requested Business Plan or Pitch Deck sections and their lifecycle; model headlines only if used | One requested projection, with source evidence |
| Material result, review or decision changes an assumption | `roadmap`; applicable Lean Startup learning record and affected consumers | Record a successor and refresh affected joins |
| Any decision | `scope--neutrality-contract`, `module-index` | Always-load identity and routing |

**Directives**:
- Select sections by the decision and applicable boundary before acting; an applicable obligation blocks its dependent action until discharged. Phase alone never requires loading the whole set
- Keep `scope--neutrality-contract` and `module-index` small enough to be always-loaded; a growing contract section raises the floor cost of every turn
- Record the guideline load cost as a line item in the authoring loop's token budget; an unmeasured compliance cost is an `missing-economics-metric` against the process, not only against the product
- Measure always-load bytes separately from optional detail; keep net always-load growth at zero by replacing text or moving detail to its existing on-demand owner
- Extend an existing addressable owner before adding a module; examples remain optional reference sections, and task/turn boundaries alone require no reload or joined edit

### AI-Native Harness Pattern

Every AI-powered component in the TAD must conform to the harness contract:

```
Caller → [Harness: schema-validated input] → [LLM / model] → [Harness: schema-validated output + cost log] → Consumer
```

**Harness requirements**:
- Input schema validated before token spend; reject malformed inputs without calling the model
- Output schema validated after response; surface structured errors, not raw LLM failures
- Cost log emitted per call: `{ model, prompt_tokens, completion_tokens, cache_hits, estimated_cost_usd }`
- Fallback path defined for every harness: degraded-mode response or upstream error propagation

### Orchestration Topology

Document AI orchestration as one of three patterns:

| Pattern | Structure | When to Use |
|---|---|---|
| **Sequential** | A → B → C, each harness feeds the next | Single-path pipelines, linear enrichment |
| **Fan-out / Fan-in** | A → [B, C, D] → E aggregates | Parallel model calls, ensemble scoring |
| **Agentic loop** | A → decision → [branch or retry] → exit condition | Multi-step reasoning, tool-use agents, completion-condition-driven tasks |

Render orchestration topology as a `flowchart LR` or `sequenceDiagram` in the TAD. Every loop must specify a **max-iteration bound** and a **circuit-breaker condition** to cap runaway token spend.

### ROI Calculation Template

For every feature, estimate return on investment before implementation:

```
ROI Score = (User Impact × Reach) / (Build Hours + Monthly TCO + Token Cost / Month)

User Impact : 1–5 scale (pain severity × frequency)
Reach       : estimated monthly active users or sessions
Build Hours : solo-dev estimate including documentation
Monthly TCO : infrastructure + API cost at target load
Token Cost  : estimated tokens/month × model price/1M tokens
```

Features below ROI threshold (solo-dev or team-defined) are deferred to `Could / Won't` in MoSCoW. Document the calculation in the PRD success metrics section.

### FOSS-First Decision Rule

When selecting any dependency, library, or infrastructure component:
1. **Identify FOSS alternatives** — document at least one in every ADR
2. **Default to FOSS** unless the proprietary option provides >2× value at <0.5× TCO over 12 months
3. **Prefer zero-egress** storage and CDN over metered alternatives
4. **Record the decision** in the ADR with explicit TCO comparison at projected scale
5. **Compare deployment models within each candidate** — see Deployment-Model TCO Variants below; do not collapse a candidate's managed and self-managed variants into a single TCO figure

### Agentic OS Runtime — Reference Implementation

For work governed by the [Agentic OS ADLC runtime policy](https://github.com/huijoohwee/agentic-os/blob/22b46ed7dd5fc7f8cd4d0a0529256a7856a422c5/docs/adlc-guidelines.md), apply its stricter boundary: FOSS/free paths only; require a provider-observed hard `$0` cap or denial at quota exhaustion; and exclude paid plans, add-ons, overages, and upgrades. The generic proprietary-option comparison does not authorize paid execution through Agentic OS.

### Included Quota and Billable Boundary

Included free quota may be used; paid plans, paid add-ons and overages are outside the default scope.
An account plan label or a current `$0` bill does not prove that the next operation fits inside an
included allocation. A separately subscribed service must not be mistaken for free allowance.

**Directives**:
- Before a provider effect, record the current entitlement, billing window, relevant usage meters,
  included limits, observed usage, remaining headroom, and the planned effect's projected usage.
- Admit only usage covered by the included allocation. Require a provider-enforced fail-closed limit
  at that allocation, or stop before the effect when headroom cannot be bounded. A budget alert alone
  is not a hard limit. Do not require a synthetic `$0` billing cap when the included quota itself is
  a verified hard boundary.
- Include retention duration and accumulated data in storage forecasts; include operation classes,
  retrieval and egress meters when the provider prices them separately.
- After an effect, re-read the same billing window and record total and billable usage. Stop further
  effects if billable usage is nonzero, the free boundary is crossed, or the receipt is unavailable;
  use the provider owner's rollback or disable path where needed.
- Keep a redacted, revision-bound receipt with provider/resource, plan, check time, period, meter,
  included limit, before/after usage, billable amount and fail mode. Never include credentials.

### Deployment-Model TCO Variants

A single infrastructure candidate (a vendor, a FOSS stack, or a hosting category) frequently offers more than one **deployment model**, and each model carries a distinct cost and operations profile. Collapsing these into one TCO figure hides material tradeoffs. Evaluate deployment models by function, never by brand:

| Deployment Model | Definition | Cost Profile | Ops Profile |
|---|---|---|---|
| **Managed / Serverless** | Provider operates the runtime; caller pays per invocation, request, or consumed resource | Scales to zero; no idle cost; per-unit price may exceed provisioned equivalents at sustained high load | Near-zero ops burden; provider handles patching, scaling, failover |
| **Provisioned / Self-Managed** | Team operates a fixed-capacity runtime (a VM, container host, or cluster) directly | Fixed cost regardless of utilization; cheaper per-unit at sustained high load; idle capacity is wasted spend | Full ops burden: patching, backup, failover, capacity planning are the team's responsibility |
| **Hybrid / Consolidated** | Multiple workloads share one provisioned runtime to amortize its fixed cost | Fixed cost divided across workloads; total drops as more workloads consolidate | Ops burden of one Provisioned/Self-Managed runtime, not one per workload |

**Directives**:
- When an ADR or infrastructure comparison names a candidate that offers both a Managed/Serverless and a Provisioned/Self-Managed variant, present both as separate rows or columns; forbid a single blended TCO number that hides which variant it assumes
- State the ops-burden delta explicitly (e.g. "near-zero" vs "manual patching, backup, and failover"), not only the cost delta; a cheaper provisioned variant with unaccounted ops burden is not a valid FOSS-first justification
- When a Provisioned/Self-Managed total is computed by summing per-service costs independently, add a Hybrid/Consolidated estimate showing the realistic total once workloads share the same provisioned runtime; forbid presenting only the unconsolidated sum when consolidation is operationally realistic
- Apply this comparison symmetrically: a zero-egress managed candidate must still be compared against the self-managed variant of every alternative under consideration, not only against that alternative's managed variant

---

---

## Time-to-Value

**Time-to-value (TTV)** measures the minimum number of steps and elapsed time for a target persona to move from zero state to first successful outcome.

TTV is not a flow diagram — it is a gate metric that governs all five Flow Patterns. It is estimated in Phase 0, stated as a target in PRD success metrics, and validated by tracing the shortest possible path through the User Journey Flow, Workflow Flow, and Orchestration/Harness Flow end-to-end.

```
T₀ (zero state: prerequisites only, no config) → T₁ (install / configure) → T₂ (first input) → T✓ (first successful outcome)

TTV = T✓ − T₀   (elapsed clock time for target persona)
TTV steps = count of distinct manual actions between T₀ and T✓
```

**TTV Template** *(recorded in PRD success metrics)*:
```markdown
## Time-to-Value: [Feature / Product]

| Dimension          | Estimate      | Target ceiling | Validation method          |
|--------------------|---------------|----------------|----------------------------|
| TTV steps          | [N steps]     | [≤ N steps]    | Walk-through on clean env  |
| TTV elapsed time   | [N min]       | [≤ N min]      | Timed first-run test       |
| First-value action | [Description] | —              | Observable output defined  |
| Persona            | [ID]          | —              | Persona defined in PRD     |
```

**Directives**:
- Estimate TTV steps and elapsed time in Phase 0 before writing any PRD story; flag if TTV exceeds the acceptable ceiling
- Include TTV as a named row in PRD success metrics; forbid success metric tables without a TTV entry for any user-facing feature
- Validate TTV on a clean environment before Phase 3 sign-off; forbid TTV estimates that have never been walked through
- Reduce TTV by shortening the Orchestration/Harness Flow (fewer required inputs before first output) and the Topology (fewer required services before first run); forbid TTV reductions that compromise security or data integrity

---

---
