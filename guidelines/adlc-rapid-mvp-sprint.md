---
title: "ADLC Rapid MVP Sprint Profile"
doc_type: "Guideline Module"
version: "1.1.0"
date: "2026-09-05"
lang: "en-US"
frontmatter_contract: "required"
owner: "Orchestrator function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
provider_neutral: true
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Rapid MVP Sprint Profile

This reference implementation is optional. Any repository or team may declare a different compressed profile, or none. It demonstrates how to minimize time and resources without adapting away an obligation.

```
Sprint Clock = fixed wall-clock ceiling stated before task 1 dispatches
Collapse = fewer named phases discharging the same obligations, never fewer obligations
```

## Compression Map

| Normally | Under this profile | What still cannot be elided |
|---|---|---|
| Requirements → design → task list as three artifacts | One VCC-bearing one-pager: validated pain, WTP evidence, reusable feature, acceptance checks | Both chain seams; an uncovered criterion remains `undesigned-criterion` |
| Multi-wave dependency-ordered integration | One wave per dependency layer, fitting the sprint in one or two waves | Acyclic graph and write-disjoint waves |
| Separate Orchestrator and Implementer processes | One operator-run loop | Evaluator remains a distinct mechanism the operator does not adjudicate |
| Four-bound table per task | One sprint-wide token/time ceiling divided across remaining tasks at dispatch | Token, iteration, wall-clock, and context bounds remain stated |
| Property tests for every stated correctness property | State only the round-trip and money-touching properties that warrant property tests; use examples elsewhere | Every stated correctness property still has an executable test |
| Release lifecycle as separately scheduled stages | One sitting records the same joined receipts and one exact human decision | Release control, Integration Receipt, and Human Authorization remain intact |
| Operator sign-off scheduled per irreversible operation | One explicit decision per distinct effect envelope, then autonomous idempotent continuation | No inferred or standing approval for unspecified irreversibility |

## Directives

- State the Sprint Clock before the first dispatch; without it the run is ordinary-cadence
- Use the one-pager for a feature tracing to validated pain, a named prospective payer or segment, and evidenced WTP; mark a proposed price or unpaid pilot separately from collected revenue
- Collapse Orchestrator and Implementer only when the Evaluator stays independently named and mechanized
- Reallocate the remaining sprint-wide token/time ceiling at each dispatch without raising the total ceiling
- State property-test narrowing explicitly; narrowing claims is allowed, leaving a stated property untested is not
- Record the Human Authorization decision once through the configured interaction adapter and propagate its receipt autonomously
- At the midpoint, split feature scope if the selected features will not close; never silently drop a bound, check, or gate

## Value-to-Revenue Loop

Use the same CID/RAO/SVO lineage and independent checks from discovery through operation; a new phase does not require a new agent, document, or worktree.

1. **Design**: select validated pain and the strongest evidenced WTP within hard constraints. Record the smallest useful outcome, acceptance checks, and facts still needing validation
2. **Build**: inspect current capabilities, prefer a conforming reuse or minimal extension, and implement one dependency-closed vertical slice through its real interfaces
3. **Verify**: join independent behavior evidence to that exact slice and its applicable production runtime, configuration, recovery, and resource checks; mocks, test payments, demos, and successful builds retain their limited evidence labels
4. **Launch**: pass the declared protected integration and delivery workflow with exact target authorization; record integration, runtime, deployment, and cleanup outcomes separately
5. **Learn**: measure the real user's completed outcome, paid conversion, and operating cost; count first revenue only with actual payment evidence. Feed failures or absent conversion into the next bounded Context instead of claiming a complete revenue loop

Record only failure modes material to the slice, with their prevention check and recovery action. Prioritize irreversible loss, duplicate effects, rejected authorization, broken recovery, or an unusable core flow when applicable; do not create a generic risk register detached from acceptance checks.

**Reference implementation — lean agentic commerce**: a mobile/web/offline-first service may expose one reusable capability through browser, MCP, WebMCP, and `/`, `@`, `#` adapters, with local/edge operation where the dependency contract permits. Rank delivered buyer value, time-to-first-dollar, and token/TCO economics through the shared Constraints ↔ Argumentation ↔ Outranking pipeline; test-mode transactions never prove revenue or production settlement.

## Completion-Time Forecast

The ordinary orchestration-reasoned WBS still applies. Use the smallest dependency-closed outcome WBS that can expose the critical path, evidenced concurrency, waits, verification, expected rework, and confidence inside the Sprint Clock. Reforecast at the midpoint and whenever evidence changes the critical path.
