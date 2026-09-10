---
schema: "todo-context-record/v2"
period: "2026-08"
context: "dormant-recovery-replay-recorded-authority"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-12"
---

# Dormant Recovery Replay Recorded Authority

## 2026-08-12

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| dormant-recovery-replay-recorded-authority | Preserve the recorded authority shape across effective dormant replay normalization. | Restore `active` only for the exact validated expired replay authority passed to the fresh recovery continuation. | `scripts/expired-committed-heartbeat-cloud-authority.mjs` | Recorded replay authority projection | `recoverDormant` | Exact expired replay result and current recovery evidence | Fresh live recovery request with the original claim identity | The state bridge exists only after the sealed replay receipt and expired effective state have been validated; no ordinary dormant claim is upgraded locally. | Integrate, recover #434, and continue Flight Sim delivery. | 2026-08-12 |
