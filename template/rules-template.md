# RULES

## project-rules.md

```
- ENFORCE Lean, MVP, SSOT, schema compliance, memoization, single-responsibility, <600 lines/file, <500kB chunks
- CENTRALIZE config & constants (`COPY_*`, `LS_KEY_*`); REUSE shared utilities
- OPTIMIZE happy-path pipeline (batch/cache/chunk/loading/memory/rendering/sharding/virtualization)
- APPLY MECE, early returns, appropriate abstraction; RESOLVE issues; PREVENT cross-repo conflicts: `/GitHub/{knowgrph,curagrph,gympgrph}`
- NAME meaningfully (no abbrev except i/j/k); GROUP related code; COMMENT why not what
- AVOID deep nesting, unnecessary object creation/cloning, redundant calc/render, memory leaks
- DEFER computation; RELEASE resources promptly; IDENTIFY parallelizable tasks
- USE appropriate data structures, algorithms, concurrency controls; ENSURE thread safety
- FORBID hardcoded domains, duplication, circular deps, race conditions, silent failures, stale code, unnecessary sync
- TEST/VERIFY focused diffs only; AVOID indefinite full-codebase runs
- AFTER: UPDATE cross-repo docs, API docs; SUGGEST next: `/GitHub/knowgrph/{todo-log.md,docs/documents}`, `/GitHub/huijoohwee.github.io/schema/AgenticRAG`
```

## native development skills

