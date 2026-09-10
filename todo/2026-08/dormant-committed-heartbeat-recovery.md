---
schema: "todo-context-record/v2"
period: "2026-08"
context: "dormant-committed-heartbeat-recovery"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-12"
---

# Dormant Committed Heartbeat Recovery

## 2026-08-12

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| dormant-committed-heartbeat-recovery | Restore a sanctioned same-claim continuation for clean committed lanes whose admitted cloud authority expired into dormant preservation. | Select ordinary renewal for current claims and authenticated recovery for exact dormant claims, preserving idempotent replay and rejecting foreign progress or evidence drift. | `scripts/expired-committed-heartbeat-cloud-authority.mjs`; `scripts/expired-committed-heartbeat-recovery-lib.mjs` | Expired committed heartbeat cloud-authority selector | `continueExpiredCommittedHeartbeatCloudAuthority`; `runExpiredCommittedHeartbeatRecovery` | Exact local admitted lease, joined live claim, repository recovery evidence, transition counter, fence, and ledger digest | Renewed or recovered cloud authority that can be verified and projected through the existing repository-owned heartbeat controller | Current authority follows renewal; dormant-preserved authority follows recovery only when claim identity, counter, fence, and evidence remain exact; response-loss replay is mode-specific and all drift fails closed. | Integrate the controller fix, recover the blocked TDZ lane through its original session, then resume Flight Sim source correction and protected delivery. | 2026-08-12 |
