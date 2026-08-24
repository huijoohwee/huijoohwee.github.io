---
title: "MCP Economics & Testing Module"
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

# MCP Economics & Testing Module

## Scope & Ownership

Owns token economics for tool surfaces and the testing and drift-detection obligations.

This module is loaded on demand from [MCP Guidelines](./mcp-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
