---
title: "Orchestrator Guidelines"
doc_type: "Guidelines"
version: "1.0.0"
date: "2026-09-09"
lang: "en-US"
frontmatter_contract: "required"
owner: "Orchestration contract"
local_rung: "spec-complete"
delivered_rung: "undocumented"
universal_scope: true
runtime_readiness_policy: "fail-closed"
---

# Orchestrator Guidelines

## Scope and Ownership

Orchestration coordinates existing operations over parsed inputs. [Parser Guidelines](./parser-guidelines.md)
own extraction, structure detection, chunking and source provenance. Reuse that owner instead of copying
parser algorithms into orchestration. [Shared CID, RAO and SVO](./cid-guidelines.md) define the meanings
used to join requested work, accountable functions and evidence.

The [orchestrator schema](../schema/AgenticRAG/orchestrator.jsonld) describes optional corpus unification,
reasoning and feedback configuration. It is a vocabulary surface, not an executable controller.
Repository lifecycle belongs to the pinned `agentic-os` owner; product runtimes own their execution state.

## Plan and Select

1. Resolve scoped inputs, constraints, acceptance criteria, authority and budgets.
2. Compare arguments for feasible approaches and outrank them by expected value, cost and reliability.
3. Select the smallest operation graph that satisfies the task. Preserve dependency order and bound
   concurrency; multiple roles do not imply multiple agents, processes or model calls.
4. Record the selected source revisions and outcome checks. Replan when material constraints change.

## Execute on Demand

Acquire only capabilities required by the selected operation. Parsing, retrieval, model inference,
containers, browsers and telemetry are independent capabilities; an orchestration request does not
require all of them. Reuse available suitable resources and release only task-owned resources.

Registered tools and skills expose their input, output and authorization contracts before execution.
Keep provider adaptation in the existing boundary. A missing required prerequisite blocks the dependent
operation; an optional omission is recorded without hiding a failed required check.

## Long-Horizon SuperAgent Orchestration

Durable objectives use the existing message gateway and native run-state, trace, memory and artifact
owners. Role-scoped agents may plan, research, code, create, verify and synthesize within shared budgets
and explicit stop conditions. Durable checkpoints and review interrupts are required when the selected
operation needs recovery or external approval; a role label or checkpoint cannot grant authority.

## Feedback and Outcomes

Enable corpus unification, threshold tuning or feedback only for a demonstrated need and declared
configuration. Preserve source provenance through every transformation. Bound iterations and retries;
stop when the acceptance check is met, resources are exhausted, or an unresolved prerequisite blocks work.

Use [stage metrics](../schema/AgenticRAG/stage-metrics.jsonld) for optional inspection data and
[evaluation references](../schema/AgenticRAG/evals.jsonld) to find the existing verification owners.
Metrics describe observations; they do not replace acceptance criteria or establish runtime readiness.
