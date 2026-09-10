---
schema: "todo-context-record/v2"
period: "2026-08"
context: "local-runtime-split"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-28"
---

# Local Runtime Split

## 2026-08-28

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| local-runtime-split | Enforce the 600-line rule on the local runtime owner | Split local-runtime-lib.mjs into candidate, supervisor, session, and canonical-runtime owners with acyclic imports and no alias re-exports; verify with focused and full test suites; record typed findings for remaining oversized files | scripts/local-runtime-lib.mjs; scripts/local-runtime-candidate-lib.mjs; scripts/local-runtime-supervisor-lib.mjs; scripts/local-runtime-session-lib.mjs | n/a | ensureLocalRuntime; startSessionRuntime; validateCanonicalRuntimeCandidate; createDependencies | One 1,095-line module at base fc57ade | Four owner-aligned modules of 260, 362, 292, and 251 lines; npm test 3085 pass | Engineering contract requires sub-600-line owner-and-behavior splits; vendored artifacts, claim-reserved files, and remaining lifecycle libs are typed findings not rushed splits | Split device-integrate-lib and remaining lifecycle libs in follow-up lanes as budget allows | 2026-08-28 |
