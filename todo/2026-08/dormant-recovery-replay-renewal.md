---
schema: "todo-context-record/v2"
period: "2026-08"
context: "dormant-recovery-replay-renewal"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-12"
---

# Dormant Recovery Replay Renewal

## 2026-08-12

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| dormant-recovery-replay-renewal | Complete local recovery when the sealed response-loss transition expires before replay. | Replay the original ledger-bound recovery, then issue one fresh recovery from that exact expired transition using current repository evidence. | `scripts/expired-committed-heartbeat-cloud-authority.mjs` | Expired recovery replay continuation | `recoverDormant` | Exact transition N source, sealed transition N+1 replay evidence, and current repository evidence | One verified live transition N+2 authority suitable for atomic local CAS | The second recovery is permitted only after the first exact replay returns an already-expired authority; any other drift remains fail-closed. | Integrate this continuation, recover #434, and resume the Flight Sim delivery chain. | 2026-08-12 |
