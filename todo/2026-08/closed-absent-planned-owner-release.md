---
schema: "todo-context-record/v2"
period: "2026-08"
context: "closed-absent-planned-owner-release"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-24"
---

# Closed Absent Planned Owner Release

## 2026-08-24

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| closed-absent-planned-owner-release | Remove one expired planned writer lease after its worktree and branches are absent, its draft is closed unmerged, its retained head is an empty coordination commit, and its cloud claim is already terminal retired. | Seal the complete registry, original lease, provider marker, retained head, retired ledger lineage, and clean protected controller; require exact human authorization; permit only one replay-safe writer-registry CAS. | `scripts/closed-absent-planned-owner-release-contract.mjs`; `scripts/closed-absent-planned-owner-release-controller.mjs`; `scripts/closed-absent-planned-owner-release-repository-adapter.mjs`; `scripts/closed-absent-planned-owner-release.mjs` | Closed absent planned-owner plan, local release projection, terminal receipt, controller, and repository adapter | `buildPlan`; `buildReleasedLease`; `createController`; `createRepositoryAdapter` | Expired active/planned lease, full registry digest, absent local and remote projections, closed draft marker, retained empty head, terminal retired cloud lineage, protected controller, and exact authorization | Released lease with cleared admission/cloud authority, complete original-lease receipt, deterministic terminal receipt, and no source, Git, provider, cloud, merge, runtime, or deployment effect | Before CAS, every sealed external projection must remain exact; after CAS, only the reconstructable authorized terminal lease is required so provider or cloud reader drift cannot invalidate the completed mutation. | Integrate the controller through protected lifecycle gates, then separately plan the exact orphan release and request its digest-bound authorization before any live CAS. | 2026-08-24 |
