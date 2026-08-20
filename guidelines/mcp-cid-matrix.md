---
title: "MCP CID Matrix & Checklist Module"
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

# MCP CID Matrix & Checklist Module

## Scope & Ownership

Owns the directive lookup surface, the prohibited-pattern guards, and the validation checklist.

This module is loaded on demand from [MCP Guidelines](./mcp-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
