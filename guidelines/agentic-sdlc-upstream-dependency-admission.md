---
title: "Agentic SDLC Upstream Dependency Admission"
doc_type: "Guideline Module"
version: "1.0.0"
date: "2026-07-30"
lang: "en-US"
schema: "agentic-upstream-dependency-admission/v1"
status: "spec-complete"
authority: "provider-neutral upstream dependency admission"
universal_scope: "true"
runtime_readiness_policy: "fail-closed"
mutation_policy: "no source adoption or projection before protected admission"
---

# Agentic SDLC Upstream Dependency Admission

## Purpose

Prevent upstream dependencies from stopping an entire plan by admitting them
before dependent work is dispatched, isolating only their transitive consumers,
and continuing disjoint work. Prevention is scheduling and evidence discipline,
never permission to adopt, rewrite, mirror, project, or integrate unprotected
source.

This module is universal, neutral, implementation agnostic, and modular. It
requires typed identities and evidence but prescribes no repository, branch,
provider, framework, language, agent product, or deployment platform.

## Dependency Admission Record

Every external or separately owned prerequisite has one immutable record:

| Field | Requirement |
|---|---|
| `dependencyId` | Stable identity within the plan. |
| `capabilityId` | Capability required by downstream consumers. |
| `sourceRevision` | Immutable source identity; never a mutable label. |
| `sourceState` | `protected`, `candidate`, `local-only`, or `missing`. |
| `ownerId` | Registered source owner; absent only when the source is missing. |
| `scopeId` | Owned semantic or path scope. |
| `fenceRevision` | Current ownership fence. |
| `closureDigest` | Digest of the complete source dependency closure. |
| `requiredChecks` | Named checks and recorded terminal results. |
| `consumers` | Downstream unit ids that require the capability. |
| `decisionDeadline` | Finite instant for re-evaluation. |
| `fallback` | `defer`, `omit`, or an already protected equivalent capability. |

Unknown fields may be retained as metadata but cannot change the admission
decision. Mutable names, screenshots, prose assertions, task labels, and local
file presence are not source identities or protected evidence.

## Admission States

| State | Meaning |
|---|---|
| `eligible` | Protected source, complete evidence, exact closure, and one owner permit dependent dispatch. |
| `deferred` | A registered candidate has a finite deadline and valid fallback; only its consumer closure waits. |
| `blocked` | Source, ownership, evidence, deadline, fallback, or closure is missing, ambiguous, invalid, or stale. |
| `superseded` | An already protected equivalent capability covers the dependency with explicit equivalence evidence. |

No state grants mutation, integration, publication, release, or deployment
authority. `eligible` means only that dependent planning may proceed.

## Deterministic Admission Algorithm

1. Normalize records and sort by `dependencyId`.
2. Reject duplicate identities, ambiguous owners, overlapping owner scopes,
   malformed immutable identities, unknown consumers, and invalid fallbacks.
3. Compare every fence, source revision, closure digest, and named-check result
   with the current evidence.
4. Derive `eligible` only from protected source with complete passing evidence.
5. Derive `deferred` only for a registered candidate with a finite deadline and
   a fallback that does not require adopting or projecting that candidate.
6. Mark local-only, missing, stale, or ambiguously owned dependencies `blocked`.
7. Compute the exact transitive consumer closure for every non-eligible record.
8. Continue ready units outside those closures; forbid a plan-wide stop when
   disjoint work remains.
9. At the deadline, apply the recorded fallback or remain `blocked`; never extend
   a deadline automatically under delivery pressure.
10. Re-evaluate from current immutable evidence after any source, owner, fence,
    closure, check, policy, consumer, deadline, or fallback change.

The output is deterministic for identical normalized inputs and evaluation
time. Re-evaluation replaces the prior decision; it does not edit history.

## Projection and Source Boundary

- Generate a downstream projection only from the exact protected source revision
  recorded by an `eligible` decision
- Forbid projection from `candidate`, `local-only`, `missing`, or stale source
- Preserve an occupied source lane and its authored files; forbid copying them
  into a new lane to manufacture eligibility
- Record projection parity independently from source admission; a green
  projection check cannot promote source state
- Invalidate dependent readiness when protected source or its closure drifts

## Bounded Continuation

An Orchestrator must expose:

- the dependency decision and finding types;
- the exact waiting consumer closure;
- ready disjoint units that may continue;
- the finite next evaluation instant;
- the selected fallback and its capability impact; and
- the immutable evidence digest used for the decision.

If no disjoint unit exists, the plan is truthfully `blocked`. Creating unrelated
busywork, weakening checks, inferring ownership, or silently substituting a
capability is not continuation.

## Runtime Readiness Enforcement

A conforming runtime exposes a deterministic evaluator with typed input and output.
It exits successfully only when the evaluation itself is valid; an
individual dependency may still return `blocked` as a truthful domain result.

The focused proof must cover protected eligibility, bounded candidate deferral,
local-only rejection, ambiguous-owner rejection, stale-evidence invalidation,
premature-projection rejection, exact consumer-closure isolation, disjoint-work
continuation, deadline fallback, deterministic replay, and absence of mutation
or deployment side effects.

`runtime-ready` applies only to that evaluator at one immutable implementation
and guideline-source revision. It does not promote any evaluated dependency,
consumer, canonical runtime, protected integration, release, publication, or
deployment layer.

## Findings

| Finding Type | Severity |
|---|---|
| `upstream-source-unadmitted` | `blocker` |
| `upstream-owner-ambiguous` | `blocker` |
| `upstream-wait-unbounded` | `blocker` |
| `upstream-projection-premature` | `blocker` |
| `upstream-evidence-stale` | `blocker` |
| `upstream-fallback-invalid` | `major` |
| `upstream-plan-overblocked` | `major` |

Every finding names the dependency, affected consumers, observed state, expected
condition, and evidence digest. Zero counts are emitted for checked finding
types with no occurrence.

## VCC

| Field | Requirement |
|---|---|
| Variables | Admission records, plan units, dependency edges, evaluation time, immutable evidence. |
| Constraints | One owner, exact identities, protected-source projection, finite waits, valid fallback, consumer-closure isolation, no authority expansion. |
| Checks | Deterministic evaluator, focused scenario suite, neutral-core scan, immutable source binding, mutation and deployment boundaries. |
