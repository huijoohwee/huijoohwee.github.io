---
schema: "todo-context-record/v2"
period: "2026-08"
context: "integrated-source-correction-replay-v2"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-12"
---

# Integrated Source Correction Replay v2

## 2026-08-12

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| integrated-source-correction-replay-v2 | Recover a reviewed lane whose cloud claim advanced once through integration while its local review projection remained behind protected main. | Join the exact local review projection to the exact integrated-preserved cloud transition, retire it with its sealed integration receipt, and promote a current-main successor bound to the original PR. | `scripts/reviewed-lane-source-correction-{evidence,repository-adapter}.mjs` | Reviewed source-correction recovery | source evidence and repository adapter | Local review-ready transition N, live integrated transition N+1, lagging PR base, current protected ref | Active successor retaining the reviewed PR identity | Only an exact one-transition integration receipt and disjoint protected-main advance qualify; all identity, state, counter, receipt, and ancestry drift fails closed. | Integrate this controller, recover Flight Sim PR #772, then complete canonical runtime proof. | 2026-08-12 |
