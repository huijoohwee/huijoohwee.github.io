---
schema: "todo-context-record/v2"
period: "2026-08"
context: "dormant-recovery-replay-evidence"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-12"
---

# Dormant Recovery Replay Evidence

## 2026-08-12

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| dormant-recovery-replay-evidence | Reconcile a lost dormant-recovery response after its recovered transition expires before local writer CAS. | Read the exact repository ledger, join its latest claim transition to stable public status, and replay only the sealed recovery evidence digest. | `scripts/expired-committed-heartbeat-replay-evidence.mjs`; `scripts/expired-committed-heartbeat-cloud-authority.mjs` | Expired committed heartbeat replay evidence | `resolveExpiredCommittedRecoveryReplayEvidence`; `continueExpiredCommittedHeartbeatCloudAuthority` | Local transition N authority, live public transition N+1, stable ledger revision and digest, and current repository recovery snapshot | Exact original recovery idempotency key and renewed verified authority | A same-heartbeat N+1 transition may replay recovery whether currently active or expired; every ledger identity, fence, counter, owner, review, and digest join must remain exact. | Integrate the resolver, recover #434 locally, then resume its review and the Flight Sim source-correction chain. | 2026-08-12 |
