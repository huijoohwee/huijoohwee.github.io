---
schema: "todo-context-record/v2"
period: "2026-08"
context: "dormant-recovery-replay-expired-state"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-12"
---

# Dormant Recovery Replay Expired State

## 2026-08-12

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| dormant-recovery-replay-expired-state | Accept the exact effective state of an expired sealed replay result. | Permit `dormant-preserved` only inside the already-expired exact replay validator before the fresh recovery continuation. | `scripts/expired-committed-heartbeat-cloud-authority.mjs` | Expired replay state projection | `requireRecoverySubjectResult` | Exact replayed continuation receipt whose recorded current authority has expired | Validated dormant replay source for the fresh recovery step | Ordinary results still require live current authority; only the sealed expired replay branch accepts the effective dormant projection. | Integrate, recover #434, then complete Flight Sim delivery. | 2026-08-12 |
