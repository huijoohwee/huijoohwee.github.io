---
schema: "todo-context-record/v2"
period: "2026-08"
context: "active-publish-directory-scope-recovery"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-12"
---

# Active publish directory-scope recovery

## 2026-08-12

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| active-publish-directory-scope-recovery | Preserve an admitted directory write scope while refreshing an active publish successor to current protected main. | Validate every changed path by exact-or-descendant containment without rebuilding immutable admission digests. | `scripts/active-publish-write-scope.mjs`; `scripts/device-integrate-lib.mjs` | Active publish successor recovery | `assertActivePublishPathsAdmitted`; `refreshActivePublishSuccessor` | Current-base-to-head paths plus admitted lease projection | Exact contained paths or a pre-mutation rejection | Exact file scopes and directory descendants qualify; outside paths, prefix lookalikes, malformed paths, and semantic drift fail closed. | Integrate the controller fix, then replay Flight Sim PR #772 delivery and canonical runtime proof. | 2026-08-12 |
