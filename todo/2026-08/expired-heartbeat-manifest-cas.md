---
schema: "todo-context-record/v2"
period: "2026-08"
context: "expired-heartbeat-manifest-cas"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-12"
---

# Expired Heartbeat Manifest CAS

## 2026-08-12

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| expired-heartbeat-manifest-cas | Preserve an older admitted lane's exact cloud manifest transport identity while accepting its semantically equivalent admitted projection during dormant recovery. | Validate the normalized manifest for cloud authority, then restore the source transport digest before the writer-registry compare-and-swap without masking arbitrary manifest drift. | `scripts/expired-committed-heartbeat-cloud-authority.mjs`; `scripts/expired-committed-heartbeat-recovery-lib.mjs` | Expired heartbeat manifest projection | `preserveSourceManifestProjection`; `recoverExpiredCommittedHeartbeat` | Exact source cloud authority, semantically validated renewed projection, admitted manifest digest, and writer lease | Renewed authority that retains the source manifest transport identity through atomic local lease recovery | Only the known transport-versus-admitted digest equivalence may normalize for validation; writer CAS receives the immutable source projection and all other subject drift remains rejected. | Integrate this compatibility fix, replay #434's repository-owned heartbeat, then resume the Flight Sim source-correction and delivery chain. | 2026-08-12 |
