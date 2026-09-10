---
schema: "todo-context-record/v2"
period: "2026-08"
context: "context-sharded-planning-authority"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-12"
---

# Context-Sharded Planning Authority

## 2026-08-12

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| context-sharded-planning-authority | Remove shared-file planning contention from concurrent protected lanes while preserving one canonical, deterministic planning history. | Replace shared monthly appends with one immutable context record per task, validate deterministic projection and legacy immutability, and keep provider lifecycle state outside the planning format. | `scripts/planning-context-record-contract.mjs`; `docs/TODO.md`; `todo/YYYY-MM/<context>.md`; workflow and validation contracts | Provider-neutral context-sharded planning authority | `validatePlanningContextRecordContract`; `validatePlanningContextRecordRelease` | Exact Context, UTC period, recorded base ref, legacy monthly history, and independently claimed record path | One immutable 11-field record, unique Context ownership, deterministic monthly projection, and release proof that shared legacy bytes did not change | Per-task immutable files eliminate false write overlap; the index routes reads but is not a mutable coordination surface; provider-specific claims and pull requests remain lifecycle evidence, not planning schema. | Integrate this upstream contract, then create the blocked adapter plan as its own context record and resume downstream work through ordinary protected lifecycle gates. | 2026-08-12 |
