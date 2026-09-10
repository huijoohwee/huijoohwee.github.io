---
schema: "todo-context-record/v2"
period: "2026-08"
context: "integrated-source-correction-recovery-transition"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-12"
---

# Integrated Source Correction Recovery Transition

## 2026-08-12

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| integrated-source-correction-recovery-transition | Accept one authenticated recovery wrapped around an integrated-preserved source. | Join local review transition N to integrated transition N+1 and exact recovery transition N+2. | `scripts/reviewed-lane-source-correction-{evidence,repository-adapter}.mjs` | Integrated source recovery join | `claim`, `assertJoined`, `sameSourceClaim` | Integration receipt plus recovery evidence and operation receipt | Exact N+2 source eligible for normal correction | Recovery must preserve the integration payload while supplying a distinct operation receipt; other progress fails closed. | Recover Flight Sim PR #772 and finish canonical runtime proof. | 2026-08-12 |
