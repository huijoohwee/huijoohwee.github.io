---
title: "Agentic Graph MCP Service - PRD-TAD-ADR-MVP-GTM Companion"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.4.24"
status: "mirror-notice"
date: "2026-07-11"
lang: "en-US"
frontmatter_contract: "required"
canonical_ssot: "https://github.com/huijoohwee/agentic-graph/blob/main/docs/documents/agentic-graph-mcp/agentic-graph-mcp-service-prd-tad-adr-mvp-gtm.companion.md"
parent: "https://github.com/huijoohwee/agentic-graph/blob/main/docs/documents/agentic-graph-mcp/agentic-graph-mcp-service-prd-tad-adr-mvp-gtm.md"
---

# Agentic Graph MCP Service - PRD-TAD-ADR-MVP-GTM Companion

> **Mirror notice**: canonical SSOT lives in
> [`agentic-graph/docs/documents/agentic-graph-mcp/agentic-graph-mcp-service-prd-tad-adr-mvp-gtm.companion.md`](https://github.com/huijoohwee/agentic-graph/blob/main/docs/documents/agentic-graph-mcp/agentic-graph-mcp-service-prd-tad-adr-mvp-gtm.companion.md).
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
- shipped surface ownership by file
- WebMCP, Pages, MCP Apps, and prompt/resource readiness owners
- architecture invariants and forbidden stale topologies
- the published template-only `promotionRecovery` operator contract that stays owned by the shared MCP Apps surface

Published operator surface:
- `https://airvio.co/agentic-graph/.well-known/mcp/apps/agentic-graph-agent-ready.html`
  - shared MCP Apps card for promotion-retry semantics
  - use it for command-template guardrails only; use browser-local finalize inspection for exact retry paths
