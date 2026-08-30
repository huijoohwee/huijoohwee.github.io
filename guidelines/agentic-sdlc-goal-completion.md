---
title: "Agentic SDLC Adaptive Goal Completion"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-08-30"
lang: "en-US"
frontmatter_contract: "required"
owner: "Orchestrator function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
provider_neutral: "true"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Adaptive Goal Completion

This module owns how an Orchestrator keeps a goal moving when part of it is blocked, and how observed outcomes are allowed to change future dispatch order. The main [Agentic SDLC Guidelines](./agentic-sdlc-guidelines.md) retain task identity, budgets, independence, capability grants, release control, and the finding vocabulary; [Proportionate Closeout](./agentic-sdlc-proportionate-closeout.md) retains outcome-profile selection; [Autonomous Continuation](./agentic-sdlc-autonomous-continuation.md) retains the decision-versus-transport boundary. This module creates no parallel scheduler, ledger, authority, or finding names.

```text
Advance Decision = goal identity + unit set + recorded outcomes + derived weights + typed disposition per unit
Non-Blocking = a blocked unit bounds itself and its dependents, never the goal
```

## Blocker Locality

A goal is a dependency graph, not a queue. Treating any blocker as a goal-level stop is the most common way an agent run wastes its remaining budget on nothing.

**Directives**:

- Bound every blocker to its own unit and its transitive dependents; a unit outside that closure stays dispatchable, and stopping it instead is a `coordination-revision-churn` finding when it delays disjoint ready work
- Report goal state as `continuable` whenever at least one unit is ready, and separate it from `stalled` (nothing ready, something waiting) and `blocked` (nothing ready, nothing waiting); forbid collapsing these three into a single failure
- Classify contention over a shared write set as serialization across ordered waves, never as a blocker; a unit that must wait for a peer is `waiting`, and calling it blocked hides recoverable progress
- Drop a satisfied dependency edge rather than modelling a completed unit as a live constraint; a terminal dependency that still gates its dependent is a stale graph
- Surface every blocked unit with its typed reason and the exact dependency ids that caused it, so an Operator reads one localized cause rather than a goal-wide failure

## Outcome-Weighted Ranking

Priority supplied by a caller is a guess. Priority derived from what actually happened is evidence, and it is the smallest useful form of self-improvement available to an execution runtime.

**Directives**:

- Derive dispatch order from recorded outcomes of the same unit kind — attempts, successes, and retries — rather than from an authored priority, and record the derivation inputs alongside the result
- Give an unobserved kind an explicit neutral prior; forbid treating absent history as either failure or success, because both bias the first run of every new capability
- Keep ranking strictly separable from admission: a weight may reorder the ready set and may never admit, gate, unblock, retire, or widen the scope of a unit. A weight that changes what is permitted rather than what runs first is a `self-escalated-capability` finding
- Make derivation deterministic and order-independent: identical outcome sets must yield identical weights and an identical digest regardless of arrival order, clock, locale, or platform
- Ship every applied weight with its attempt and success counts in the run record; an ordering change an Operator cannot explain from surfaced evidence is an `unsurfaced-result`
- Bound the outcome window explicitly and let a poorly performing kind sink toward the floor rather than being removed; silent removal converts a ranking signal into an undeclared admission decision
- Forbid a learned weight from relaxing a bound, a check, a gate, or an authorization; scaling evidence is conformant, eliding an obligation is not

## Fail-Closed Gates Under Adaptation

Adaptation changes order. It never changes authority.

**Directives**:

- Require an explicit authorization naming the exact unit before any gated unit becomes dispatchable; an absent authorization is a refusal, and inferring one is an `assumed-operator-decision` finding at `blocker` severity
- Reject an authorization that names a unit absent from the goal rather than ignoring it; a dangling authorization is evidence that the goal and the decision disagree
- Route a gate refusal through the same typed finding vocabulary as every other blocker; a second refusal path is a parallel vocabulary and is forbidden
- Keep the advance decision free of mutation authority: planning what to run next grants no capability to run it, and no weight, digest, or progress figure may satisfy a promotion, integration, release, or deployment gate

## Progress Evidence

**Directives**:

- Emit one immutable digest-bound advance record joining goal identity, the outcome-derived weights, the readiness result, and the per-unit disposition; byte-identical input must produce an identical record digest
- Report progress as terminal units over total units using exact integer arithmetic; forbid a floating-point completion figure whose value depends on platform rounding
- Record every unit's state with a reason, including the ones that made no progress; an omitted unit is indistinguishable from an unchecked one
- Treat the advance record as evidence for the Readiness Ladder, never as a rung: `runtime-ready` still requires the joined receipts the [Behavioral Conformance Runtime](./agentic-sdlc-conformance-runtime.md) owns

## Interaction Economy

The main set's `autonomous-goal-pursuit` seam delegates these rules here. They remove Operator round trips that carry no decision, and they relax no gate: scope, irreversibility, credentials, authority, and promotion stay exactly where the main set puts them.

**Directives**:

- Emit one completeness verdict naming **every** missing, malformed, or unresolvable required input before the first attempt; surfacing one missing operand per failed attempt is an `incomplete-input-report` finding, because N sequential refusals spend N round trips delivering information that was available at the first
- Derive every machine-derivable operand from authoritative local state rather than requesting it: an identity from its recorded lease or branch projection through the declared normalizer, a digest from the artifact, a revision from the fetched ref. Demanding a value the run can compute is a `derivable-operand-demanded` finding, and a normalizer that exists in the source but is left unapplied is the same defect
- Validate each constraint at the earliest point it is knowable so a local rule fails locally; message shape, size and line budgets, template conformance, and scope tokens are all checkable before publication, and discovering one only at a remote boundary is a `late-constraint-discovery` finding
- Bind volatile identity immediately before the transition that consumes it, never at plan time; on a compare-and-swap loss, re-read and re-derive within the declared retry bound rather than escalating, and escalate only when the relevant conflict set, policy, or authority genuinely changed
- Attempt the declared environment-only bootstrap once, bounded, before emitting any failing verdict; an absent dependency, uninitialised workspace, or missing generated input is transport, and reporting its symptom as a product regression is an `unsurfaced-result` finding that also poisons the outcome record it feeds
- Record every blocked attempt with its typed reason as an outcome the next selection consumes, so repeated mechanical failure changes ordering instead of repeating; a run that rediscovers the same blocker without recording it cannot improve
- Escalate only an unresolved semantic decision — scope change, irreversibility, credential or authority grant, contradiction, or budget re-authorisation. Transport, identity derivation, field discovery, idempotent retry, and mechanical remediation are never escalations, and raising them is an `avoidable-operator-interruption` finding
- Classify every rejection as contended or deterministic before responding: contended means an authoritative value moved between read and write and is re-read and retried within the bound, while deterministic means the request violated a contract and the identical request can never succeed. Retrying a deterministic rejection unchanged is an `incomplete-input-report` finding, and a rejection naming a required field, an exact expected value, or a rejected value is deterministic
- Correct every wrong value at its owning source, never at a projection of it. A cache, lease record, marker, body, or report projects an upstream value; patching one satisfies its own gate and invalidates every later gate derived from the same stale source. Treat three or more gates failing in sequence, where each failure was caused by the previous fix, as proof the defect is upstream of all of them, and re-derive the chain from the earliest wrong value instead of continuing to patch
- Bound the attempt budget per goal rather than per command, cap any repair that mutates shared state at one attempt whose reversal was stated in advance, and stop when either bound is reached. Terminate by preserving state and reporting the earliest wrong value, its owner, the exact residue left behind, and the one decision required; chained shared-state repair converts one inconsistency into several and a status dump is not an escalation

## Validation Checklist

- [ ] Every blocker is bounded to its unit and transitive dependents; disjoint ready units continued
- [ ] Goal state distinguishes `continuable`, `stalled`, `blocked`, and `complete`
- [ ] Write-set contention reported as ordered serialization, not as a blocker
- [ ] Dispatch order derived from recorded outcomes, with an explicit neutral prior for unobserved kinds
- [ ] Weights reorder only; no weight admitted, gated, unblocked, retired, or rescoped a unit
- [ ] Derivation deterministic and order-independent, with identical digests for identical outcome sets
- [ ] Applied weights surfaced with their attempt and success counts
- [ ] Every gated unit refused without an exact naming authorization; dangling authorizations rejected
- [ ] Advance record digest-bound, integer-exact, mutation-free, and claiming no rung
- [ ] Required inputs reported once and completely; every derivable operand derived rather than requested
- [ ] Locally knowable constraints failed locally; volatile identity bound immediately before its transition
- [ ] Environment-only remediation attempted before any failing verdict; each blocked attempt recorded as an outcome
- [ ] Every actual Operator prompt maps to one unresolved semantic decision
- [ ] Every rejection classified contended or deterministic; no deterministic rejection retried unchanged
- [ ] Every correction applied at its owning source; no projection patched to satisfy its own gate
- [ ] Gate cascades treated as upstream defects; attempt budget bounded per goal, not per command
- [ ] Shared-state repair capped at one attempt with its reversal stated; residue reported on termination

## Findings

This module owns the pursuit-domain finding names; the main set enumerates none of them, so no second enumeration can drift from this one.

| Rule family | Finding Type | Severity |
|---|---|---|
| Autonomous pursuit | `incomplete-input-report` | `major` |
| Autonomous pursuit | `derivable-operand-demanded` | `major` |
| Autonomous pursuit | `late-constraint-discovery` | `minor` |

Gate, authority, and Operator-interruption violations reuse the main set's and the Autonomous Continuation module's existing names; this module defines no parallel vocabulary for them.

## VCC

Given one goal, its unit set with declared dependencies, write sets, gates, and authority states, and its recorded prior outcomes, when the Orchestrator computes an advance decision, then every blocker bounds only its unit and dependents; every disjoint ready unit remains dispatchable; dispatch order derives deterministically from recorded outcomes with a declared neutral prior; no weight alters admission, authority, or any bound; every unauthorized gated unit is refused; and the run emits one immutable digest-bound advance record that grants no mutation, integration, release, or deployment authority.
