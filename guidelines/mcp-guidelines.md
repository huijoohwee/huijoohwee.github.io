---
title: "MCP Guidelines"
doc_type: "Guidelines"
version: "1.0.0"
date: "2026-06-25"
lang: "en-US"
frontmatter_contract: "required"
---

# MCP Guidelines

## Scope & Neutrality Contract

- **Universal**: these guidelines apply to any MCP server, tool, or client regardless of domain, language, runtime, or vendor. Nothing here assumes a specific product, repository, framework, or deployment environment.
- **Neutral**: name capabilities and roles by their function, never by a brand. Where a concrete transport or tool is shown, it appears only as a non-binding *reference implementation* and may be swapped for any equivalent.
- **Agnostic**: tool contracts and server specifications are derived from schema definitions and capability declarations only — never from file names, directory layout, or project-specific conventions. Examples use placeholders (`[...]`) rather than real identifiers.
- **Modular**: each `##` section is self-contained and addressable by its heading anchor (see Module Index). Sections may be lifted into another guideline set without rewriting their internals.

## Module Index

- `scope--neutrality-contract` — universality, neutrality, agnosticism, modularity rules
- `overview` — what MCP is, governing standards, and AI-native orientation
- `directive-grammar-cid` — Context/Intent/Directive grammar and sorting
- `from-0-to-1-mcp-server-creation-process` — phase-gated authoring process
- `flow-patterns` — user journey, workflow, data flow, orchestration/harness, topology
- `tool-contract-authoring` — tool name, description, input/output schema, and error contract
- `transport-contract` — stdio, HTTP/SSE, and future transport rules
- `server-lifecycle-contract` — capability negotiation, initialization, and shutdown
- `harness-integration` — wrapping MCP tool calls in typed, observable harnesses
- `token-economics` — prompt budget, cost log, and tool-call token accounting
- `testing-and-drift-detection` — contract testing, schema drift, and CI integration
- `cid-directive-matrix` — alphabetical, project-agnostic MCP directives
- `anti-pattern-guards` — prohibited patterns and their corrections
- `validation-checklist` — pre-implementation and post-deployment gates
- `role-action-outcome` — role-to-deliverable mapping

---

## Overview

**Model Context Protocol (MCP)**: an open, transport-agnostic protocol that enables AI models and agents to invoke typed tools, access structured resources, and receive prompt templates from external servers. MCP separates *capability definition* (what a server can do) from *capability invocation* (how a client calls it), enabling composable, interoperable AI pipelines.

**Governing standards**: define tool contracts with typed schemas; validate inputs before execution; validate and log outputs after execution; separate transport concerns from tool logic; maintain bidirectional traceability between tool contracts and PRD acceptance criteria; apply iterative refinement; document all capability declarations.

**AI-native orientation**: MCP servers are harness boundaries in the AI-native architecture. Every MCP tool call is an Executor node in an Orchestration/Harness Flow (see PRD/TAD Guidelines). Token economics, cost logging, and circuit-breaker conditions apply at every tool boundary. The four compounding lenses — **min-viable-max-value**, **TCO-zero**, **token economics**, and **harness-first** — govern every MCP design decision.

---

## Directive Grammar (CID)

Every directive in this guideline set is expressed with a uniform, project-agnostic grammar so it can be lifted into any context unchanged.

### Definition
- **Context**: focus domain of concern
- **Intent**: desired principle or guiding goal
- **Directive**: explicit prohibition or required safeguard

### Sorting
Each entry is organized alphabetically (A→Z) for clarity and neutrality.

---

## From 0 to 1: MCP Server Creation Process

Owned by [MCP Process & Flow Patterns Module](./mcp-process-flows.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Flow Patterns

Owned by [MCP Process & Flow Patterns Module](./mcp-process-flows.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Tool Contract Authoring

Owned by [MCP Contracts Module](./mcp-contracts.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Transport Contract

Owned by [MCP Contracts Module](./mcp-contracts.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Server Lifecycle Contract

Owned by [MCP Contracts Module](./mcp-contracts.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Harness Integration

Owned by [MCP Contracts Module](./mcp-contracts.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Token Economics

Owned by [MCP Economics & Testing Module](./mcp-economics-testing.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Testing and Drift Detection

Owned by [MCP Economics & Testing Module](./mcp-economics-testing.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## CID Directive Matrix

Owned by [MCP CID Matrix & Checklist Module](./mcp-cid-matrix.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Anti-Pattern Guards

Owned by [MCP CID Matrix & Checklist Module](./mcp-cid-matrix.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Validation Checklist

Owned by [MCP CID Matrix & Checklist Module](./mcp-cid-matrix.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Role—Action—Outcome

**Tool Contract Author**
→ Action: defines tool name, description, input schema, output schema, and error contract before implementation; derives VCC from acceptance criterion; records token budget estimate
→ Outcome: produces authoritative tool contracts that implementation, testing, and client generation all depend on

**Tool Handler Implementer**
→ Action: implements tool handlers against contracts; validates input before execution; validates output before response; emits cost log per call; writes contract tests for all six test cases
→ Outcome: delivers tested, contract-compliant tool implementations ready for deployment

**Transport Layer Implementer**
→ Action: implements stdio or HTTP/SSE transport; enforces authentication at transport layer; isolates transport logic from tool logic; handles graceful shutdown
→ Outcome: delivers a transport layer that tool handlers can be deployed on without modification

**Harness Integrator**
→ Action: wraps MCP tool calls in typed harnesses; enforces max-iteration bounds and circuit-breakers in agentic loops; aggregates cost logs at pipeline level
→ Outcome: ensures every AI pipeline invoking MCP tools has bounded token spend and typed failure handling

**CI Pipeline**
→ Action: runs contract tests, schema drift check, token budget validation, and capability declaration check on every push and PR; blocks merges on failures
→ Outcome: prevents contract drift, unvalidated deployments, and unbounded token spend from reaching the main branch

**Schema Steward**
→ Action: applies semantic versioning to tool contract changes; archives prior schema versions; manages client stub regeneration after schema changes; ensures TAD stays synchronized
→ Outcome: ensures stable, traceable tool contract evolution without breaking existing clients

---

## PRD and TAD Alignment

This section records how MCP guidelines map to the PRD/TAD guidelines, enabling bidirectional traceability.

| MCP Concept | PRD/TAD Counterpart | Traceability |
|-------------|--------------------|-|
| Tool contract | TAD Component Specification | Tool contract → TAD component |
| Input/output schema | TAD Integration Contract (payload schema) | Tool schema → TAD interface |
| Tool VCC | PRD Acceptance Criterion (Given-When-Then) | Tool VCC → PRD-[Epic]-[Story] |
| Orchestration/Harness Flow | TAD Orchestration/Harness Flow (Executor role) | Tool call → TAD harness Executor |
| Cost log | TAD Quality Attribute (Token Cost) | Tool cost log → TAD token budget |
| Topology | TAD Topology | MCP topology node → TAD topology |
| Contract tests | PRD Acceptance Criteria / VCC | Test case → PRD criterion → VCC |
| Token budget | PRD Success Metrics / TAD Quality Attributes | Tool budget → PRD metric |

**Traceability pattern** (extends PRD/TAD standard):

```
PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface] ↔ MCP-[Server]-[Tool] ↔ VCC [condition]
```

**Rules**:
- Every MCP tool must be traceable to a TAD component specification
- Every tool acceptance criterion must be expressible as a VCC evaluable from tool output alone
- MCP server version bumps trigger TAD updates; both are committed atomically
- Token budget estimates in TAD are updated from cost log actuals each sprint
