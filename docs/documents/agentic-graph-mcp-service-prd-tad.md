---
title: "Agentic Graph MCP Service - PRD & TAD"
doc_type: "Combined PRD/TAD"
version: "0.4.27"
status: "mirror-notice"
date: "2026-07-11"
lang: "en-US"
frontmatter_contract: "required"
canonical_ssot: "https://github.com/huijoohwee/agentic-graph/blob/main/docs/documents/agentic-graph-mcp/agentic-graph-mcp-service-prd-tad.md"
parent: "https://github.com/huijoohwee/agentic-graph/blob/main/docs/documents/agentic-graph-mcp/agentic-graph-mcp.md"
---

# Agentic Graph MCP Service - PRD & TAD

> **Mirror notice**: canonical SSOT lives in
> [`agentic-graph/docs/documents/agentic-graph-mcp/agentic-graph-mcp-service-prd-tad.md`](https://github.com/huijoohwee/agentic-graph/blob/main/docs/documents/agentic-graph-mcp/agentic-graph-mcp-service-prd-tad.md).
> Edit there first; this file exists as a stable publish-side entry in the
> `huijoohwee.github.io` doc index.
>
> For current remote MCP onboarding, start with
> `docs/documents/agentic-graph-mcp-onboarding-index.md`, then use
> `docs/documents/agentic-graph-mcp-install-contract.md` for the canonical
> public-discovery vs control-plane endpoint boundary.
> Map intent on `https://airvio.co/agentic-graph/mcp`, orchestrate agents on
> `https://airvio.co/agentic-graph/control-plane/mcp` only for session-capable
> hosts, and prove outcomes first with the source-side `README.md` or
> `docs/documents/agentic-graph-superagent-harness.md` offline path.

Use the canonical source doc for:
- implemented MCP baseline and shipped-vs-planned boundaries
- local stdio, Pages HTTP MCP, WebMCP, and MCP Apps readiness ownership
- current public install vs control-plane orchestration truth
- the published template-only `promotionRecovery` operator contract on the shared MCP Apps card

Related publish-side entry points:
- `docs/documents/agentic-graph-mcp-onboarding-index.md`
- `docs/documents/agentic-graph-mcp-install-contract.md`
- `docs/documents/agentic-graph-mcp-install-boundary-release-note-20260710.md`

Published operator surface:
- `https://airvio.co/agentic-graph/.well-known/mcp/apps/agentic-graph-agent-ready.html`
  - shared MCP Apps card that advertises `#promotion.retry <path...>` as a template-only published contract
  - exact path-bearing retry commands still come from browser-local finalize inspection after a real mirroring failure
