---
title: "MCP Process & Flow Patterns Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-08-20"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
parent: "MCP Guidelines"
parent_version: "1.0.0"
---

# MCP Process & Flow Patterns Module

## Scope & Ownership

Owns the phase-gated server creation process and the flow patterns that describe server behaviour.

This module is loaded on demand from [MCP Guidelines](./mcp-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## From 0 to 1: MCP Server Creation Process

A sequential, phase-gated process for producing a well-specified, testable MCP server.

### Phase 0 — Capability Discovery
**Before authoring any schema, validate the capabilities the server must expose.**

1. Identify the AI workflows that need external tool access
2. List candidate tool names and their responsibilities in SVO format
3. Confirm each tool has a distinct, non-overlapping responsibility
4. Estimate token cost per tool call at expected invocation frequency
5. Identify transport requirements: stdio (local process), HTTP/SSE (remote), or both
6. Run a preliminary TCO estimate; confirm server is worth building at projected cost
7. Estimate **time-to-value (TTV)**: minimum steps for an AI agent to reach first successful tool output from zero state

**Gate**: proceed only when capabilities are validated, non-overlapping, TCO-positive, and TTV is within acceptable ceiling.

### Phase 1 — Tool Contract Authoring
**Define typed schemas for every tool before any implementation.**

1. Write the tool name following the naming contract (see Tool Contract Authoring)
2. Write the tool description as a single, imperative SVO statement
3. Define the input schema: required fields, optional fields, types, constraints
4. Define the output schema: success shape and error shape
5. Define the error contract: error codes, messages, and recovery guidance
6. Map every tool to a PRD user story and a TAD component specification
7. Record the tool's Verifiable Completion Condition (VCC) — the evaluable end state an agent can confirm from its own output

**Gate**: all tool contracts reviewed and approved before implementation begins.

### Phase 2 — Server Implementation
**Implement tools against their contracts; do not deviate from Phase 1 schemas.**

1. Implement each tool as an isolated handler with a single responsibility
2. Validate input schema before executing any tool logic; reject malformed inputs with a typed error
3. Validate output schema before returning; surface structured errors, not raw exceptions
4. Emit a cost log entry per tool call: `{ tool, prompt_tokens, completion_tokens, cache_hits, estimated_cost_usd }`
5. Implement the transport layer separately from tool logic; tools must not depend on transport
6. Implement capability negotiation and initialization per the Server Lifecycle Contract
7. Write contract tests for every tool: valid input → expected output, invalid input → expected error

**Gate**: all contract tests pass; no tool deviates from its Phase 1 schema.

### Phase 3 — Integration and Alignment
**Verify MCP server ↔ client coherence and traceability.**

1. Establish bidirectional traceability: `PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface] ↔ MCP-[Server]-[Tool]`
2. Confirm no business logic embedded in transport handlers
3. Confirm no transport-specific logic embedded in tool handlers
4. Validate all VCCs are evaluable from tool output alone — no side-channel verification required
5. Confirm token budget estimates are documented per tool; actuals tracked after first production invocation
6. Confirm FOSS-first decisions are recorded in ADRs for every runtime dependency

**Gate**: server version-stamped and baselined before production deployment.

### Phase 4 — Living Contract
**Iterate tool contracts as capabilities evolve.**

- Apply semantic versioning to every tool contract change
- Update tool schemas and regenerate client stubs whenever contracts change
- Re-run contract tests for every change; forbid deploying servers with failing contract tests
- Archive superseded tool versions; do not delete
- Re-derive VCCs whenever tool output schemas change; stale conditions produce false completions
- Track token cost actuals vs estimates each sprint; update budget projections when usage patterns shift

---

---

## Flow Patterns

### User Journey Flow
**Maps how an AI agent moves from task trigger to tool output.**

```
Agent Task → Tool Discovery → Tool Selection → Input Construction → Tool Invocation → Output Consumption → Task Continuation
```

**Template**:
```markdown
## Journey: [Agent Role] — [Task Goal]

| Stage    | Action                        | Touchpoint           | Friction              | Opportunity             |
|----------|-------------------------------|----------------------|-----------------------|-------------------------|
| Trigger  | Agent receives task prompt    | Orchestrator         | Ambiguous tool choice | Clear tool descriptions |
| Discover | Agent reads tool list         | MCP capability list  | Too many tools        | Focused capability set  |
| Select   | Agent chooses tool            | Tool description     | Vague description     | SVO description         |
| Invoke   | Agent sends tool call         | MCP transport        | Schema mismatch       | Typed input validation  |
| Consume  | Agent reads tool output       | Tool result          | Unstructured output   | Typed output schema     |
| Continue | Agent uses output in task     | Orchestrator         | Output not actionable | VCC-aligned output      |
```

### Workflow Flow
**Maps how a tool call sequences through validation, execution, and response.**

**Trigger**: AI agent sends a tool call request

**Happy Path**:
1. Transport layer receives request → deserializes to typed payload
2. Input validator checks schema → accepts valid input
3. Tool handler executes → produces typed result
4. Output validator checks schema → accepts valid output
5. Cost log emitted → transport layer serializes and returns result

**Alternate Paths**:
- Optional field missing: handler uses default value; continues normally
- Rate limit reached: handler returns typed rate-limit error; client retries with backoff

**Error Paths**:
- Input schema invalid: input validator rejects before execution; returns typed validation error
- Tool execution fails: handler returns typed execution error; no partial results leaked
- Output schema invalid: output validator rejects; returns typed internal error; logs gap

**Postconditions**: cost log persisted; typed result or typed error delivered to client; no unbounded execution

### Data Flow
**Traces how data moves through an MCP tool call.**

```
[Client Request] → [Transport: deserialize] → [Input Validator] → [Tool Handler] → [Output Validator] → [Cost Logger] → [Transport: serialize] → [Client Response]
```

| Stage | Component | Input Format | Output Format | Persistence | Error Handling |
|-------|-----------|-------------|--------------|-------------|----------------|
| Ingest | Transport layer | Raw bytes / JSON-RPC | Typed request | None | Typed parse error |
| Validate input | Input validator | Typed request | Validated payload | None | Typed validation error |
| Execute | Tool handler | Validated payload | Raw result | Depends on tool | Typed execution error |
| Validate output | Output validator | Raw result | Typed response | None | Typed internal error |
| Log cost | Cost logger | Execution metadata | Cost log entry | Persistent store | Silent fail; log gap |
| Respond | Transport layer | Typed response | Serialized bytes | None | Transport error |

### Orchestration/Harness Flow
**Maps the MCP tool call as an Executor node in an AI pipeline.**

Every MCP tool call is an Executor role in an Orchestration/Harness Flow. The client (AI agent or orchestrator) is the Dispatcher; the MCP server is the Executor; the cost logger is the Observer; the downstream task is the Consumer.

```
[Dispatcher: AI agent] → [Harness: validate input] → [MCP Server: tool handler] → [Harness: validate output + emit cost log] → [Consumer: downstream task] ↘ [Observer: cost logger]
```

**Template**:
```markdown
## Orchestration/Harness Flow: [Pipeline Name]

**Trigger**: [Agent task that requires tool invocation]
**Topology pattern**: [Sequential | Fan-out/Fan-in | Agentic loop]
**Max iterations** *(loops only)*: [N] | **Circuit-breaker**: [exit condition]
**Token budget**: [avg prompt tokens] + [avg completion tokens] @ [cache hit rate] = [est. cost/call]

| Role       | Component              | Input schema      | Output schema      | Cost log | Fallback                     |
|------------|------------------------|-------------------|--------------------|----------|------------------------------|
| Dispatcher | [AI agent/orchestrator]| [Task context]    | [Tool call payload]| —        | [Fallback tool or skip]      |
| Executor   | [MCP server + tool]    | [Typed input]     | [Typed output]     | ✓        | [Typed error; degraded mode] |
| Observer   | [Cost logger]          | [Cost log stream] | [Metric / alert]   | —        | [Silent fail; log gap]       |
| Consumer   | [Downstream task]      | [Typed output]    | [Task continuation]| —        | [Upstream error propagation] |
```

### Topology
**Structural snapshot of an MCP deployment.**

**Template**:
```markdown
## Topology: [System Name] v[version] — [Date or milestone]

**Boundaries**: [Local process / Network / Trust domain]

| Node | Role | Type | Connects to | Connection type | Data residency |
|------|------|------|-------------|-----------------|----------------|
| [AI agent] | Dispatcher | Process | MCP client | In-process | None |
| [MCP client] | Proxy | Library | MCP server | stdio / HTTP | None |
| [MCP server] | Executor | Process / Service | Tool handlers | In-process | Local / Remote |
| [Tool handler] | Executor | Function | External API / DB | Sync / Async | Depends on tool |
| [Cost logger] | Observer | Service / File | Persistent store | Async write | Local / Remote |
```

**Rules**:
- Document topology for every MCP deployment with ≥ 2 components
- Name every connection type explicitly (stdio pipe, HTTP/SSE, in-process call)
- State data residency for every tool that reads or writes persistent state
- Version-stamp every topology update

---
