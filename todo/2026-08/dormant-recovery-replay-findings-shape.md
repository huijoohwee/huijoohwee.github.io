---
schema: "todo-context-record/v2"
period: "2026-08"
context: "dormant-recovery-replay-findings-shape"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-12"
---

# Dormant Recovery Replay Findings Shape

## 2026-08-12

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| dormant-recovery-replay-findings-shape | Accept the provider's exact idempotent replay response shape. | Normalize an omitted or null replay `findings` value to an empty list only inside the already validated expired-replay receipt path. | `scripts/expired-committed-heartbeat-cloud-authority.mjs` | Expired replay result validation | `requireRecoverySubjectResult` | Exact sealed replay response with `findings: null` | Validated replay followed by fresh dormant recovery | A non-array non-null value or any finding remains rejected; ordinary continuation validation is unchanged. | Integrate, recover #434, and continue Flight Sim delivery. | 2026-08-12 |
