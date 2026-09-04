---
title: "ADLC Autonomous Continuation & Interaction Economy"
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

# Autonomous Continuation & Interaction Economy

This module defines bounded autonomous progress and minimum necessary human interruption. It is functional and provider-neutral: interaction, authority, and execution transports are replaceable adapters, never universal semantics.

The normal execution state is progress, not prompting. Human attention is a scarce runtime resource: reserve it for decisions that change intent, authority, irreversible reach, or promotion—not for translating an already-recorded decision into a machine representation.

## Decision Boundary

An Operator decision chooses or authorizes an effect. A digest, capability, nonce, command string, confirmation token, or signed receipt is only a transport encoding of that decision.

- When an explicit current decision already binds the same subject set, effect class, destructive reach, and externally visible consequence, controllers derive, sign, store, and transport every required machine encoding internally
- Revalidate every changed source, subject, scope, effect class, destructive reach, target, policy, or externally visible consequence against the decision's declared bounds; an effect-bound identity change invalidates that authorization. An in-scope reversible edit covered by the existing objective is not automatically a new decision
- A retry, refreshed nonce, regenerated digest, successor capability, or idempotent projection of the unchanged effect is not a new decision
- A broad objective is authority for normal in-scope reversible work, verification, and protected integration mechanics; it is not standing authorization for an unspecified irreversible effect or production candidate

## Autonomous Continuation Contract

- Continue across read-only discovery, reversible local work, already-authorized protected integration, verification, retry, observation, and idempotent replay while objective, bounds, scope, and evidence agree
- Repair contradicted or missing implementation assumptions in the owning authoring phase within authorized scope, then re-ground and re-derive affected joins; block dependent execution until checks pass. Ask only when evidence leaves an unresolved product choice, scope, or authority decision
- Persist the run and resume automatically after context compaction, external waits, transient failures, status requests, and turn boundaries; none cancels the objective
- Treat inability to consume a valid recorded decision as an interaction- or authority-adapter defect, not as a new decision; preserve state, continue disjoint safe work, and repair the adapter through the protected path
- Ask once for the smallest unresolved semantic decision only after evidence proves it cannot be derived from the specification, current policy, or a still-valid recorded decision
- Batch independent decisions that are simultaneously ready; do not serialize avoidable Operator interruptions
- Stop when the decision itself is absent at a human gate. Autonomous continuation supplies mechanics and evidence; it never substitutes agent judgment for a reserved human choice

## Bounded Recovery

- Distinguish a contention race from a deterministic contract rejection: refresh authoritative state and retry a race within the existing bound; diagnose the full violated contract before changing a rejected request
- After the same approach fails twice, correct the earliest wrong owned input or choose another approach; command aliases and new agents do not reset the run-wide attempt budget
- Every external wait names its dependency, condition, timeout or recheck, and escalation path; preserve blocked work and continue disjoint tasks without polling loops or duplicate lanes
- Reuse a live role or disjoint lane when it already covers the task; spawn only for independent useful work within declared capacity. Retire exact completed authorities and clean only receipt-eligible projections

## Interaction Adapter Contract

- Present the decision, current evidence, options, and consequence through the configured interaction adapter
- Record the authenticated decision once and bind it to the immutable decision envelope
- Propagate that receipt through downstream controllers without asking the Operator to copy, echo, or regenerate its machine encoding
- Re-prompt only after a material decision-bound identity or effect change; report the exact changed field
- Fail closed if the adapter cannot prove the decision, but continue every dependency-disjoint safe task before declaring the run blocked

## Findings

| Type | Severity | Raised when |
|---|---|---|
| `avoidable-operator-interruption` | `major` | A controller asks the Operator to relay a machine token for an unchanged, already-recorded decision |
| `assumed-operator-decision` | `blocker` | An agent invents, defaults, or simulates a genuinely absent reserved decision |
| `autonomous-continuation-stalled` | `major` | Safe dependency-ready work stops solely because another task is awaiting input |
| `decision-drift-unreported` | `blocker` | A prior decision is reused after a material bound identity or effect changed |

## Verification

- Every prompt maps to one unresolved semantic decision
- Every machine token traces to a recorded decision or an explicitly non-decision reversible action
- Every unchanged-effect retry reuses the decision receipt idempotently
- Every material drift invalidates the prior receipt before effect execution
- Every blocked run proves no dependency-disjoint safe task remains
