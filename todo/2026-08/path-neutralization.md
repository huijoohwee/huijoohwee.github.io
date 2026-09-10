---
schema: "todo-context-record/v2"
period: "2026-08"
context: "path-neutralization"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "2026-08-28"
---

# Path Neutralization

## 2026-08-28

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|
| path-neutralization | Remove hardcoded machine paths from tracked sources | Replace every /Users/huijoohwee occurrence with $GITHUB_ROOT-relative placeholders in the six tracked offenders; verify by deterministic grep and focused test | .kiro/specs/native-skill-creation-harness; __tests__/cross-repository-coordination-task.test.mjs; docs/NATIVE-SKILL-HARNESS*.md | n/a | n/a | Six tracked files with ten /Users/huijoohwee hits at base 893f969 | Zero tracked machine-path hits outside memory/, todo/, package-lock.json; focused test green | Engineering contract forbids machine paths in source, fixtures, tests, and docs; fixtures only require unique normalized worktree strings, so placeholders preserve behavior | Integrate via protected PR then proceed to agentic-graph supersession lane | 2026-08-28 |
