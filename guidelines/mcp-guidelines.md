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

## Tool Contract Authoring

A tool contract is the SSOT for a tool's name, description, input schema, output schema, and error contract. It must be authored before implementation and must not be changed without versioning.

### Tool Naming Contract

| Rule | Requirement |
|------|-------------|
| Format | `[verb]_[noun]` or `[verb]_[noun]_[qualifier]` in `snake_case` |
| Verb | Imperative, action-oriented (e.g., `get`, `list`, `create`, `update`, `delete`, `search`, `execute`) |
| Noun | The resource or domain object acted upon |
| Length | ≤ 64 characters |
| Uniqueness | Globally unique within a server's capability set |

**Examples** *(placeholders — substitute real identifiers)*:
- `get_[resource]` — retrieves a single resource by identifier
- `list_[resources]` — retrieves a filtered collection of resources
- `create_[resource]` — creates a new resource instance
- `execute_[pipeline]` — triggers an execution pipeline

**Rules**:
- Forbid generic names with no resource scope (e.g., `do_thing`, `run`, `process`)
- Forbid names that encode transport or implementation details (e.g., `http_get_resource`)
- Forbid names that encode provider or product names in the tool name itself

### Tool Description Contract

Every tool description must:
- Be a single, imperative SVO sentence: `[Verb]s [object] [qualifier]`
- State what the tool does, not how it does it
- Be ≤ 128 characters
- Be distinct from every other tool description in the server

**Examples** *(placeholders)*:
- `Retrieves [resource] by [identifier] and returns its current state.`
- `Lists [resources] matching the given filter criteria.`
- `Executes [pipeline] with the provided configuration and returns the result.`

**Rules**:
- Forbid descriptions that reference internal implementation details
- Forbid vague descriptions (e.g., "Does stuff with the resource")
- Forbid descriptions that duplicate the tool name

### Input Schema Contract

Every tool input schema must:
- Be a valid JSON Schema object
- Declare all required fields in the `required` array
- Include a `description` for every field
- Specify `type`, `format`, and `enum` constraints wherever applicable
- Use `additionalProperties: false` to prevent unvalidated fields

**Template**:
```json
{
  "type": "object",
  "required": ["[required_field]"],
  "additionalProperties": false,
  "properties": {
    "[required_field]": {
      "type": "[string | number | boolean | array | object]",
      "description": "[SVO description of the field's purpose]"
    },
    "[optional_field]": {
      "type": "[type]",
      "description": "[SVO description]",
      "default": "[default_value]"
    }
  }
}
```

### Output Schema Contract

Every tool output schema must:
- Define a success shape and an error shape
- The success shape must be a typed object with documented fields
- The error shape must include at minimum: `error_code` (string), `message` (string), `recoverable` (boolean)
- Forbid returning raw exceptions, stack traces, or unstructured error strings to the client

**Success template**:
```json
{
  "type": "object",
  "required": ["[result_field]"],
  "properties": {
    "[result_field]": { "type": "[type]", "description": "[SVO description]" },
    "metadata": {
      "type": "object",
      "description": "Optional execution metadata",
      "properties": {
        "execution_ms": { "type": "number" },
        "cache_hit": { "type": "boolean" }
      }
    }
  }
}
```

**Error template**:
```json
{
  "type": "object",
  "required": ["error_code", "message", "recoverable"],
  "properties": {
    "error_code": { "type": "string", "description": "Machine-readable error code" },
    "message": { "type": "string", "description": "Human-readable error message" },
    "recoverable": { "type": "boolean", "description": "Whether the client can retry" },
    "retry_after_ms": { "type": "number", "description": "Suggested retry delay if recoverable" }
  }
}
```

### Verifiable Completion Condition (VCC)

Every tool must have a VCC derived from its acceptance criterion:

```
Verify: [tool name] returns [expected output field] with [expected value or shape]
        when given [valid input], and no persistent state is modified outside [stated scope]
```

VCCs are recorded in the TAD component specification alongside the acceptance criteria they implement.

---

## Transport Contract

MCP supports multiple transport mechanisms. Transport logic must be isolated from tool logic; tools must not contain transport-specific code.

### stdio Transport

Used for local process communication (e.g., CLI-launched servers).

**Rules**:
- Server reads JSON-RPC messages from stdin; writes responses to stdout
- stderr is reserved for logging and diagnostics only; never write JSON-RPC to stderr
- Server must handle graceful shutdown on stdin close or SIGTERM
- Forbid blocking stdin reads that prevent graceful shutdown

### HTTP/SSE Transport

Used for remote or networked server deployments.

**Rules**:
- Server exposes a single endpoint for JSON-RPC POST requests
- Server may expose an SSE endpoint for server-initiated notifications
- All HTTP responses use appropriate status codes: 200 for success, 4xx for client errors, 5xx for server errors
- Authentication is enforced at the transport layer; tool handlers must not implement auth logic
- TLS is required for all non-localhost HTTP deployments
- Forbid returning sensitive data in error responses

### Transport-Agnostic Rules

- Tool contracts are identical regardless of transport
- Client stubs generated from tool schemas must work across all supported transports
- Forbid transport-specific field names or conventions leaking into tool schemas

---

## Server Lifecycle Contract

### Capability Negotiation

On connection, the server declares its capability set to the client. Capability declarations must:
- List every available tool by name
- Include the tool's description and input/output schemas in the declaration
- Declare supported protocol version
- Declare supported transport features (e.g., streaming, notifications)

**Rules**:
- Forbid tools that are implemented but not declared
- Forbid declaring tools that are not implemented
- Capability set changes require a server version bump

### Initialization

1. Client sends `initialize` request with protocol version and client capabilities
2. Server responds with server capabilities and server version
3. Client sends `initialized` notification
4. Server is ready to accept tool calls

**Gate**: no tool calls accepted before initialization completes.

### Shutdown

1. Client sends `shutdown` request (or transport closes)
2. Server completes any in-flight tool calls (up to a stated timeout)
3. Server releases all resources
4. Server exits cleanly

**Rules**:
- Forbid abandoning in-flight tool calls without a typed error response
- Shutdown timeout must be documented; default to 30 seconds unless stated otherwise
- Cost logs must be flushed before shutdown

---

## Harness Integration

Every MCP tool call is an Executor node in an Orchestration/Harness Flow. The harness contract wraps the tool call with typed validation and cost logging on both sides.

### Harness Contract

```
[Caller] → [Harness: validate input schema] → [MCP Tool] → [Harness: validate output schema + emit cost log] → [Consumer]
```

**Harness requirements**:
- Input schema validated before tool execution; reject malformed inputs without invoking the tool
- Output schema validated after response; surface typed errors, not raw tool failures
- Cost log emitted per tool call: `{ tool, prompt_tokens, completion_tokens, cache_hits, estimated_cost_usd }`
- Fallback path defined for every harness: degraded-mode response or upstream error propagation

### Agentic Loop Integration

When an MCP tool is called inside an agentic loop:
- The loop must specify a **max-iteration bound** (e.g., max 10 tool calls per task)
- The loop must specify a **circuit-breaker condition** (e.g., exit if tool returns `recoverable: false`)
- The harness must enforce the iteration bound; forbid unbounded tool call loops
- Token spend must be bounded: total tokens across all iterations must not exceed the stated budget

### Fallback Paths

Every harness must define a fallback path:

| Failure scenario | Fallback action |
|-----------------|-----------------|
| Input schema invalid | Reject before tool call; return typed validation error to caller |
| Tool execution fails | Return typed execution error; do not retry unless `recoverable: true` |
| Output schema invalid | Return typed internal error; log schema mismatch for debugging |
| Max iterations reached | Return partial result with iteration-limit indicator; surface to caller |
| Cost budget exceeded | Return cost-limit error; halt further tool calls in the pipeline |

---

## Token Economics

Token accounting at the MCP layer is mandatory for every AI-powered pipeline that invokes tools.

### Cost Log Contract

Every tool call must emit a cost log entry. The cost log is the MCP layer's contribution to the pipeline-level token budget tracking defined in the PRD/TAD guidelines.

**Cost log schema**:
```json
{
  "tool": "[tool_name]",
  "invocation_id": "[uuid]",
  "timestamp_utc": "[ISO-8601]",
  "prompt_tokens": 0,
  "completion_tokens": 0,
  "cache_hits": 0,
  "estimated_cost_usd": 0.0,
  "model": "[model_identifier_or_null]"
}
```

**Rules**:
- Every tool call emits exactly one cost log entry; forbid tool calls with no cost log
- `prompt_tokens` and `completion_tokens` are 0 for non-LLM tools; the log is still emitted
- `estimated_cost_usd` is computed from the model's published pricing at call time; use 0.0 for free operations
- Cost logs are persisted asynchronously; failures in cost log emission must not block tool response

### Token Budget Estimation

Before deploying any AI-powered pipeline that uses MCP tools, estimate:

| Dimension | Estimate | Budget ceiling | Validation method |
|-----------|----------|----------------|-------------------|
| Avg prompt tokens / tool call | [N] | [≤ N] | Log sampling after first production run |
| Avg completion tokens / tool call | [N] | [≤ N] | Log sampling after first production run |
| Tool calls / task | [N] | [≤ N] | Workflow trace |
| Est. cost / task | [$ N] | [≤ $ N] | Cost log aggregation |
| Est. cost / month at [X] tasks/day | [$ N] | [≤ $ N] | Projection from above |

Record this table in the TAD component specification for the pipeline.

### FOSS-First at the MCP Layer

When selecting any MCP server runtime, SDK, or hosting infrastructure:
- Identify at least one FOSS alternative for every proprietary dependency
- Default to FOSS unless the proprietary option provides > 2× value at < 0.5× TCO over 12 months
- Record the decision in an ADR with explicit TCO comparison

---

## Testing and Drift Detection

### Contract Testing

Every tool must have contract tests that execute before deployment. Contract tests verify the tool contract, not the tool's internal logic.

**Required test cases per tool**:

| Test case | Input | Expected behaviour |
|-----------|-------|--------------------|
| Valid input — success path | All required fields populated, valid values | Returns typed success response matching output schema |
| Valid input — optional fields omitted | Required fields only | Returns typed success response; optional fields use defaults |
| Invalid input — missing required field | Required field absent | Returns typed validation error before tool execution |
| Invalid input — wrong type | Field value wrong type | Returns typed validation error before tool execution |
| Invalid input — out of range | Field value out of stated range | Returns typed validation error before tool execution |
| Execution failure | Valid input that triggers tool-level failure | Returns typed execution error matching error schema |

**Rules**:
- Forbid deploying a tool with no contract tests
- Contract tests run in CI on every change to tool schemas or handler code
- Contract tests must not depend on live external services; use mocks or fakes

### Schema Drift Detection

Tool schemas in the server must remain synchronized with any generated client stubs, documentation, and TAD component specifications.

**Drift detection rules**:
- Run a schema comparison check in CI on every push
- Exit code 0 = all client stubs, docs, and specs match the server schema
- Exit code 1 = drift detected; block merge
- Forbid deploying a server whose schema drifts from its TAD specification

### CI Integration

| CI gate | When to run | Blocks merge on |
|---------|-------------|-----------------|
| Contract tests | Every push, every PR | Any failing test |
| Schema drift check | Every push, every PR | Any schema mismatch |
| Token budget validation | Every PR touching tool handlers | Budget estimate missing or token count spike > 20% |
| Capability declaration check | Every PR touching server config | Undeclared or unimplemented tools |

---

## CID Directive Matrix

Each row is a universal, neutral, project-agnostic directive in `Context | Intent | Directive` grammar. Rows are sorted A→Z.

| Context | Intent | Directive |
|---------|--------|-----------|
| Atomicity | Keep tool handlers single-responsibility | - [ ] One tool = one responsibility; express responsibility as an SVO statement; forbid multi-purpose tool handlers |
| Authentication | Enforce auth at transport layer | - [ ] Implement authentication in transport layer only; forbid auth logic in tool handlers; forbid unauthenticated HTTP deployments outside localhost |
| Budget | Cap token spend per pipeline | - [ ] Estimate token budget before deployment; enforce max-iteration bound in agentic loops; forbid pipelines without stated token budgets |
| Capability | Declare all implemented tools | - [ ] Declare every implemented tool in capability negotiation; forbid undeclared tools and declared-but-unimplemented tools |
| Circuit-breaker | Prevent runaway tool call loops | - [ ] Define circuit-breaker condition for every agentic loop; exit on `recoverable: false`; forbid unbounded loops |
| Contracts | Define tool schemas before implementation | - [ ] Author input and output schemas before writing handler code; forbid implementation that deviates from the contract |
| Cost Log | Emit per-call cost log entries | - [ ] Emit one cost log entry per tool call; include `tool`, `prompt_tokens`, `completion_tokens`, `cache_hits`, `estimated_cost_usd`; forbid tool calls with no cost log |
| Dependencies | Justify every runtime dependency | - [ ] Identify FOSS alternative for every MCP runtime dependency; document TCO comparison in ADR; forbid undocumented vendor lock-in |
| Description | Write SVO tool descriptions | - [ ] Tool description is a single imperative SVO sentence ≤ 128 characters; forbid vague or duplicate descriptions |
| Determinism | Produce consistent tool output | - [ ] Same valid input always produces the same output shape; forbid non-deterministic output schemas |
| Drift | Keep schemas synchronized | - [ ] Run schema drift check in CI; block merges on drift; forbid deploying servers whose schemas diverge from their TAD specifications |
| Errors | Return typed error responses | - [ ] Return typed error objects with `error_code`, `message`, `recoverable`; forbid raw exceptions or unstructured error strings |
| Fallback | Define fallback for every failure mode | - [ ] Define fallback paths for input validation failure, execution failure, output validation failure, and budget exhaustion; forbid harnesses with no fallback |
| Harness | Wrap tool calls in typed, observable contracts | - [ ] Validate input before invocation; validate output after; emit cost log; define fallback; forbid direct tool calls with no harness wrapper in production pipelines |
| Initialization | Gate tool calls behind initialization | - [ ] Complete capability negotiation before accepting tool calls; forbid tool calls before `initialized` notification |
| Input Schema | Validate before execution | - [ ] Validate input schema before executing tool logic; reject malformed inputs with typed errors; forbid executing tools on unvalidated input |
| Isolation | Separate transport from tool logic | - [ ] Tool handlers must not contain transport-specific code; transport layer must not contain tool logic; forbid coupled transport-tool implementations |
| Lifecycle | Handle shutdown gracefully | - [ ] Complete in-flight calls within timeout; flush cost logs; release resources; forbid abandoned in-flight calls on shutdown |
| Modularity | Keep each section independently liftable | - [ ] Each guideline section is self-contained; forbid cross-section coupling |
| Naming | Use `verb_noun` tool names | - [ ] Tool names follow `[verb]_[noun]` snake_case pattern; ≤ 64 characters; globally unique within server; forbid generic or transport-encoding names |
| Neutrality | Keep tool contracts domain-agnostic | - [ ] Tool schemas use generic field names; forbid product names, project names, or vendor identifiers in tool schemas |
| Output Schema | Validate before response | - [ ] Validate output schema before returning to client; surface typed internal error on schema mismatch; forbid returning unvalidated tool output |
| Reproducibility | Enable full call reconstruction from logs | - [ ] Cost logs and tool call inputs must be sufficient to reconstruct every invocation; forbid log gaps that prevent replay |
| Resilience | Design for partial failure | - [ ] Every pipeline handles individual tool failures without full abort; log and continue or return partial result; forbid all-or-nothing pipelines with no partial-failure handling |
| Schema | Version tool contracts | - [ ] Apply semantic versioning to every tool contract change; forbid breaking schema changes without a version bump |
| Security | Forbid sensitive data in errors | - [ ] Error responses must not contain stack traces, internal paths, or sensitive data; forbid leaking implementation details via errors |
| Separation | Isolate tool logic from orchestration | - [ ] Tool handlers execute single operations; orchestration logic lives in the caller or orchestrator; forbid orchestration embedded in tool handlers |
| TCO | Make MCP infrastructure cost explicit | - [ ] Estimate 12-month TCO for every MCP server dependency; document in ADR; forbid uncosted infrastructure decisions |
| Testing | Gate deployment on contract tests | - [ ] All six required contract test cases pass before deployment; forbid deploying tools with no contract tests |
| TLS | Secure non-local HTTP transport | - [ ] TLS required for all non-localhost HTTP/SSE deployments; forbid plaintext HTTP outside local development |
| Token Economics | Treat token spend as an engineering metric | - [ ] Estimate prompt + completion tokens per tool call; track actuals; forbid AI pipelines invoking MCP tools without token budget estimates |
| Topology | Document server component connections | - [ ] Document MCP deployment topology for every system with ≥ 2 components; name every connection type; state data residency for persistent tools |
| Traceability | Link tool contracts to requirements | - [ ] Map every tool to a TAD component spec and a PRD user story; maintain `PRD ↔ TAD ↔ MCP` traceability chain; forbid orphaned tools |
| Transport | Implement transport-agnostic tool contracts | - [ ] Tool schemas are identical across transports; forbid transport-specific fields in tool schemas |
| VCC | Derive completion conditions from tool output | - [ ] Express every tool acceptance criterion as an evaluable VCC from tool output alone; forbid criteria requiring side-channel verification |
| Versioning | Stamp every contract change | - [ ] Apply semantic versioning to server version on every capability change; archive prior versions; forbid in-place overwrites without a version note |

---

## Anti-Pattern Guards

**Tool contracts**:
❌ Tool name encodes transport, product, or project name (e.g., `http_get_knowgrph_resource`)
→ ✅ `[verb]_[noun]` snake_case; ≤ 64 chars; no transport or brand encoding

❌ Vague tool description ("Does stuff with the resource")
→ ✅ Single imperative SVO sentence ≤ 128 chars; states what the tool does, not how

❌ Input or output schema missing required fields, types, or descriptions
→ ✅ Every field typed, constrained, and described; `additionalProperties: false` on input schema

❌ Tool implementation written before schema is authored
→ ✅ Author and review tool contract in Phase 1 before writing any handler code

**Validation and errors**:
❌ Tool executes on unvalidated input
→ ✅ Input validator rejects malformed input before invoking handler; returns typed validation error

❌ Raw exception or stack trace returned to client
→ ✅ Return typed error object with `error_code`, `message`, `recoverable`; log raw error server-side

❌ Tool outputs unstructured or variable-shape results
→ ✅ Output schema is fixed and versioned; output validator rejects schema-mismatched responses

**Harness and token economics**:
❌ Direct tool calls in production pipelines with no harness wrapper
→ ✅ Every production tool call is wrapped in a harness: validate input → invoke → validate output → emit cost log

❌ Agentic loop with no max-iteration bound or circuit-breaker
→ ✅ Every loop specifies max iterations and circuit-breaker condition; harness enforces both

❌ Tool call with no cost log entry
→ ✅ Every tool call emits a cost log entry; cost log emission failure does not block tool response

❌ Token cost treated as invisible; no budget estimate documented
→ ✅ Token budget table documented in TAD before deployment; actuals tracked after first production run

**Transport and security**:
❌ Auth logic in tool handlers
→ ✅ Authentication enforced at transport layer only; tool handlers receive only authenticated requests

❌ Plaintext HTTP for non-localhost MCP server
→ ✅ TLS required for all non-localhost HTTP/SSE deployments

❌ Sensitive data (stack traces, internal paths) in error responses
→ ✅ Error responses contain only `error_code`, `message`, `recoverable`; sensitive data logged server-side

**Lifecycle and testing**:
❌ Tool deployed with no contract tests
→ ✅ All six required contract test cases pass in CI before deployment

❌ Schema drift between server and TAD specification
→ ✅ Schema drift check runs in CI; merges blocked on drift exit code 1

❌ Server shutdown abandons in-flight tool calls
→ ✅ Graceful shutdown: complete in-flight calls within timeout; flush cost logs; then exit

---

## Validation Checklist

### Pre-Implementation (Required)

- [ ] Every tool has a name following `[verb]_[noun]` convention; ≤ 64 characters; globally unique within server
- [ ] Every tool description is a single imperative SVO sentence ≤ 128 characters
- [ ] Input schema defines required array, field types, constraints, and descriptions; `additionalProperties: false`
- [ ] Output schema defines success shape and error shape with typed fields
- [ ] Error contract defines `error_code`, `message`, `recoverable`, and optional `retry_after_ms`
- [ ] VCC derived from tool acceptance criterion and recorded in TAD
- [ ] Tool mapped to PRD user story and TAD component specification
- [ ] Token budget table estimated and recorded in TAD before implementation begins
- [ ] FOSS-first decision recorded in ADR for every runtime dependency

### Pre-Deployment (Required)

- [ ] All six required contract test cases pass per tool
- [ ] Schema drift check exits with code 0
- [ ] Capability declaration lists all implemented tools; no undeclared or unimplemented tools
- [ ] Transport layer implements authentication (for non-localhost HTTP deployments)
- [ ] TLS configured for all non-localhost HTTP/SSE deployments
- [ ] Cost log emission tested end-to-end; log entries appear in persistent store
- [ ] Shutdown timeout documented; graceful shutdown tested
- [ ] Max-iteration bound and circuit-breaker condition documented for every agentic loop using this server

### Post-Deployment (Required)

- [ ] Token cost actuals logged and compared to estimates after first production run
- [ ] Cost log entries present in persistent store for all tool calls
- [ ] No schema drift detected in first CI run post-deployment
- [ ] Error rate and `recoverable: false` rate within expected bounds
- [ ] VCCs validated: tool outputs are evaluable by an autonomous agent without side-channel verification

---

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
