---
title: "MCP Contracts Module"
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

# MCP Contracts Module

## Scope & Ownership

Owns the four contract surfaces: tool contract authoring, transport, server lifecycle, and harness integration.

This module is loaded on demand from [MCP Guidelines](./mcp-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
