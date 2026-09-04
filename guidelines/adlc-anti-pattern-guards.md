---
title: "ADLC Execution Anti-Pattern Guards"
doc_type: "Guideline Module"
version: "1.1.0"
date: "2026-09-05"
lang: "en-US"
frontmatter_contract: "required"
owner: "Orchestrator function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
provider_neutral: true
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Execution Anti-Pattern Guards

| Prohibited pattern | Required correction |
|---|---|
| An Implementer marking its own task complete; a `done` state any role may set; a verdict derived from state the Evaluator cannot see | `verified` as the only success state, set only by an Evaluator that is a distinct mechanism, judging surfaced output only |
| Tasks invented at task-authoring time to cover behaviour the specification never stated | Every task derived from a VCC; a behaviour gap returned to the authoring loop as a specification defect |
| Picking among several equally-ready candidates by convenience, recency, or an unstated preference, with no recorded reason | Hard constraints gate a bounded Constraints ↔ Argumentation ↔ Outranking loop; changed evidence reopens affected checks, preserves incomparability, and records a supported choice or unresolved decision |
| Tasks dispatched with no token, iteration, wall-clock, or context bound; bounds raised mid-run to rescue a failing task | All four bounds stated before dispatch with a circuit-breaker; overruns trigger re-decomposition, not a larger bound |
| Session-wide capability grants; an agent widening its own permissions mid-task; a standing approval for irreversible operations | Narrowest sufficient class granted per task; escalation via `blocked` and re-dispatch; an explicit Operator decision per irreversible occurrence |
| Tasks that reach a mirror or delivery surface, or transmit project content outward, because it was convenient | Execution confined to the authoring lane; promotion is the Deploy Boundary's job and never a task |
| Success asserted without a named check and a recorded result; a check named after the fact to match what happened | Named check stated before dispatch, run during the task, and its result surfaced in the Implementer's own output |
| Behavioral defects fixed without a failing witness; a general correctness claim unsupported by a meaningful check | A behavioral defect needs a bounded failing witness and passing result; use property tests when a general invariant and meaningful generated cases justify them |
| Long runs that cannot resume, discovering the context boundary by losing work at it | Run state persisted after every terminal transition; checkpoint before the context bound; resume from persisted state, not memory |
| Operator decisions inferred, defaulted, simulated, or accepted through a non-interactive confirmation flag because the run would otherwise stall | Absent decisions produce `blocked`; the configured interaction adapter records the exact human challenge response before the authority adapter can authorize |
| A green merge automatically deploying the current protected ref, one interaction transport treated as universal, or a release rebuilding after human approval | Protected integration emits no deployment authority; the configured interaction and authority adapters record one authenticated exact-candidate decision, and the controller deploys those reviewed bytes without rebuild |
| Reusing approval after source, dependency, policy, target, artifact, or manifest drift because a mutable ref still has the same name | Any identity mismatch invalidates approval and restarts convergence, review, candidate binding, and authorization |
| Two devices dispatching the same target concurrently, or handing off mutable local state between users | One target-and-candidate idempotency key, one fenced controller, and handoff only through immutable revisions and joined receipts |
| Treating provider-specific branch names, commands, approval products, or hosting services as universal lifecycle semantics | A provider-neutral receipt protocol with concrete behavior isolated in replaceable reference implementation adapters |
| The same effect split across successive recovery controllers, each demanding fresh authorization after creating the next projection-only blocker | One stable atomic convergence run reuses its bounded effect authorization, continues authority with successors, and stops as a controller defect if terminal projection cannot converge |
| Asking an Operator to relay a machine token, digest, nonce, or successor command for an unchanged recorded decision | Derive and transport encodings internally; re-prompt only after material decision drift |
| A task list with cycles, or a wave whose tasks write the same artifact concurrently | Acyclic dependency graph; wave membership checked for write disjointness before dispatch |
| A completion date produced from activity guesses or unlimited parallelism, with overhead, waits, verification, rework, contingency, or assumptions hidden | The Orchestrator derives a dependency-closed outcome WBS and evidenced critical-path and capacity basis, records range, confidence, assumptions, and time components, and reforecasts on invalidating evidence |
