---
title: "PRD, TAD & ADR Economics & Time-to-Value Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-08-20"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
parent: "PRD, TAD & ADR Guidelines"
parent_version: "1.9.0"
---

# PRD, TAD & ADR Economics & Time-to-Value Module

## Scope & Ownership

This module owns the economic lenses every PRD and TAD decision is evaluated through, and the first-success latency gate that governs the Flow Patterns. It owns no document structure and no conformance vocabulary.

It inherits the parent set's Scope & Neutrality Contract, Rule Identity derivation, and finding recording contract without restating them. Rule IDs derive from the owning `##` section anchor and the rule's document-order ordinal, exactly as in the parent.

---

## Solo-Dev AI-Native Orientation

### Four Compounding Lenses

| Lens | Definition | Applied In |
|---|---|---|
| **Min-Viable-Max-Value** | Ship the smallest scope that maximises user impact per hour invested | Phase 0 validation, MoSCoW, success metrics |
| **TCO-Zero** | Total cost of ownership defaults to zero; every paid dependency requires explicit justification against a FOSS alternative | Phase 0 gate, ADR, Quality Attributes |
| **Token Economics** | LLM token consumption (input + output + cache hit rate) is a measurable system metric, not an afterthought | Data flows, Component specs, Quality Attributes |
| **Harness-First** | AI capabilities are accessed through structured, observable harnesses (typed inputs → typed outputs → logged decisions) rather than raw prompt calls | TAD components, Integration contracts, orchestration diagrams |

### Guideline Load Budget

Token economics applies to this guideline set itself, not only to the product pipelines it governs. A guideline set that must be loaded whole on every authoring turn taxes every turn.

| Phase | Sections to load | Rationale |
|---|---|---|
| Phase 0 | `solo-dev-ai-native-orientation`, `time-to-value` | ROI, TCO, TTV ceiling only |
| Phase 1 | `core-templates` (PRD), `flow-patterns` (journey), `time-to-value` | Authoring the PRD |
| Phase 2 | `core-templates` (TAD, ADR), `flow-patterns` (all), `readiness-ladder`, `lane-topology--deploy-boundary`, `agent-platform-readiness` | Authoring the TAD |
| Phase 3 | `rule-identity--classification`, `conformance-findings`, `validation-checklist`, `autonomous-implementation-verification` | Running the alignment check |
| Phase 4 | `conformance-findings`, `readiness-ladder` | Re-derivation and regression comparison |
| Any phase | `scope--neutrality-contract`, `module-index` | Always in scope; smallest sections in the set |

**Directives**:
- Load by section anchor for the current phase; forbid loading the whole set as a precondition for a single-phase task
- Keep `scope--neutrality-contract` and `module-index` small enough to be always-loaded; a growing contract section raises the floor cost of every turn
- Record the guideline load cost as a line item in the authoring loop's token budget; an unmeasured compliance cost is an `missing-economics-metric` against the process, not only against the product
- Prefer adding a new `##` section over lengthening an existing one, so phase-scoped loading stays possible; this is the modularity rule expressed as a cost constraint

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
