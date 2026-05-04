# RULES

## project-rules.md

### 20260502

```
CODE HYGIENE
- Lean MVP, SSOT, MECE, single-responsibility; <600 lines/file, <500kB chunks
- Meaningful names (no abbrev except i/j/k); comment why, not what
- No deep nesting, duplication, circular deps, hardcodes, silent failures

ARCHITECTURE
- Centralize config/constants; reuse shared utilities
- Appropriate data structures, abstraction, early returns
- Parallelise where possible; defer computation; release resources promptly

PIPELINE
- Optimize: batch, cache, chunk, virtualize, shard, lazy-load
- Ensure thread safety; prevent race conditions

CONFLICTS & STALE CODE
- Neutralize from root/upstream; forbid downstream patches/alias remapping
- Remove 100% legacy/stale/conflicting code; no backward-compat shims

VALIDATION
- Test focused diffs only; no indefinite full-codebase runs
- Resolve issues; verify no regressions

POST-TASK
- Update cross-repo + API docs
- Suggest next: /GitHub/knowgrph/{todo-log.md, docs/}, /GitHub/huijoohwee.github.io/schema/AgenticRAG
```

```
- ENFORCE Lean, MVP, SSOT, schema compliance, memoization, single-responsibility, <600 lines/file, <500kB chunks
- CENTRALIZE config & constants (`COPY_*`, `LS_KEY_*`); REUSE shared utilities
- OPTIMIZE happy-path pipeline (batch/cache/chunk/loading/memory/rendering/sharding/virtualization)
- APPLY MECE, early returns, appropriate abstraction; RESOLVE issues; PREVENT cross-repo conflicts: `/GitHub/{knowgrph,singabldr,gympgrph}`
- NAME meaningfully (no abbrev except i/j/k); GROUP related code; COMMENT why not what
- AVOID deep nesting, unnecessary object creation/cloning, redundant calc/render, memory leaks
- DEFER computation; RELEASE resources promptly; IDENTIFY parallelizable tasks
- USE appropriate data structures, algorithms, concurrency controls; ENSURE thread safety
- FORBID hardcoded domains, duplication, circular deps, race conditions, silent failures, stale code, unnecessary sync
- TEST/VERIFY focused diffs only; AVOID indefinite full-codebase runs
- AFTER: UPDATE cross-repo docs, API docs; SUGGEST next: `/GitHub/knowgrph/{todo-log.md,docs/documents}`, `/GitHub/huijoohwee.github.io/schema/AgenticRAG`
```

## native development skills

