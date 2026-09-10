---
title: "Project Rules"
doc_type: "Guidelines"
version: "1.1.0"
date: "2026-09-10"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
runtime_readiness_policy: "fail-closed"
---

# Project Rules

## Scope and Ownership

This entry routes project-wide concerns to their existing owners. Load only the module needed for
the current task. Product-specific requirements and budgets belong in the product's PRD/TAD/ADR;
these guidelines do not establish production readiness or deployment authority.

| Concern | Single normative owner | Load when |
|---|---|---|
| Convention selection and syntax boundaries | [Conventions and syntax](./conventions-and-syntax-guidelines.md) | Choosing naming, formatting, token or serialization profiles |
| Shared CID, RAO and SVO meanings | [Shared contract](./cid-guidelines.md) | Joining requirements, actions and evidence |
| Buyer problem, scope and design decisions | [PRD/TAD/ADR](./prd-tad-adr-mvp-gtm-guidelines.md) | Defining or changing a product contract |
| Lifecycle, execution and release evidence | [ADLC](./adlc-guidelines.md) | Starting, validating or handing off work |
| Resource selection and cost | [Token and performance economics](./token-performance-economics-guidelines.md) | Choosing checks, tools or runtime resources |
| Reusable implementation boundaries | [Codebase maintainability](./codebase-maintainability-guidelines.md) | Changing source modules |
| Schema representation | [Schema guidelines](./schema-guidelines.md) | Changing serialized data contracts |
| Human/agent interaction | [User rules](./user-rules.md) | Clarifying intent or reporting results |

## Development Methodology Directives

Prioritize evidenced buyer pain and willingness to pay, then the smallest complete user journey
that can test the value hypothesis. Apply constraints, compare arguments and outrank feasible
options by expected value and implementation cost. Record assumptions separately from observations.
Reuse existing source and validators before introducing abstractions or dependencies.

An MVP still handles failures that threaten its accepted journey, security, data integrity or
payment correctness. Its scope may be small; its acceptance criteria must be explicit.

## Performance & Quality Directives

Select resources from the requested operation and its actual prerequisites. Containers, VMs,
browsers, network tools, telemetry and model calls are conditional capabilities. Start them only
when a selected check needs them; reuse suitable running resources and release only resources
owned by the task. A missing required capability blocks that check; it does not turn it into a pass.

Use caching, batching, memoization, sharding or virtualization when measured workload and freshness
requirements justify them. Dependent operations remain ordered. Define thresholds with units,
baselines and an acceptance check in the owning product contract; ML metrics and latency examples
are not universal gates. Evidence of a local check is separate from production runtime proof.

## Anti-Pattern Guards

Keep shared semantics and reusable contracts central; keep domain behavior in the owning product.
Configuration is useful where variability exists, and does not require making every behavior
runtime-configurable. MCP, graph processing, distributed tracing and a particular UI framework
apply only to surfaces that use them.

Preserve authored work and exact revisions. Eliminate replaced duplicate sources after resolving
references. Respect module/chunk budgets, bound retries and concurrency, and make invalid input
or incomplete evidence visible at the relevant boundary.

## Three-Beat Mantra Form

[Mantra projection](./project-rules-mantras.md) describes a compact presentation of the shared
contract. It introduces no additional directives.

## Context—Intent—Directive Table

[CID application](./project-rules-cid-table.md) shows how to apply the shared fields without
maintaining another alphabetical policy catalog.

## Role—Action—Outcome

Use the [shared field contract](./cid-guidelines.md#shared-field-contract) for accountable function,
transformation and observable result. One person or agent may perform several functions; a role
list does not require a team, parallel agents or separate documents.

## Validation Checklist

Run the owning repository's applicable checks. For this corpus, `npm test` includes the guideline
and schema-link contract; `npm run check` additionally checks the source-owned document map.
Report passed, failed and blocked boundaries separately with the exact candidate revision.
