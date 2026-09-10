---
schema: "todo-context-record/v2"
period: "2026-08"
context: "lifecycle-convergence-monitor"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-12"
---

# Lifecycle Convergence Monitor

## 2026-08-12

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| lifecycle-convergence-monitor | Replace fixed-expiry waiting with a universal, provider-neutral, adaptive, read-only lifecycle observation owner. | Observe exact source evidence with deterministic bounded scheduling; emit only non-authoritative checkpoints and wake signals; never renew claims or infer completion from silence, expiry, or timeout. | `scripts/lifecycle-monitor-contract.mjs`; `scripts/lifecycle-monitor-controller.mjs`; `scripts/lifecycle-monitor-json-adapter.mjs`; `scripts/lifecycle-monitor.mjs` | Lifecycle monitor request, observation, checkpoint, resume signal, controller, and JSON adapter | `createLifecycleMonitorCheckpoint`; `advanceLifecycleMonitor`; `monitorLifecycle`; `createJsonLifecycleObservationReader` | Versioned subject, target, schedule, budget, normalized observations, and optional checkpoint | Content-bound `ready`, `blocked`, or `stopped` result with adaptive next-observation checkpoints and `mutationAuthority: false` | Exact target plus minimum generation and heartbeat sequence emits a wake-and-revalidate signal; drift blocks; progress resets delay; unchanged/transient evidence backs off; exhausted TCO budgets stop. | Integrate the protected monitor owner, then add only thin read-only adapters where measured runtime value justifies them. | 2026-08-12 |
