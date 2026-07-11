---
title: "Knowgrph MCP Service - PRD & TAD Companion"
doc_type: "PRD/TAD Companion"
version: "0.4.24"
status: "mirror-notice"
date: "2026-07-11"
lang: "en-US"
frontmatter_contract: "required"
canonical_ssot: "https://github.com/huijoohwee/knowgrph/blob/main/docs/documents/knowgrph-mcp/knowgrph-mcp-service-prd-tad.companion.md"
parent: "https://github.com/huijoohwee/knowgrph/blob/main/docs/documents/knowgrph-mcp/knowgrph-mcp-service-prd-tad.md"
---

# Knowgrph MCP Service - PRD & TAD Companion

> **Mirror notice**: canonical SSOT lives in
> [`knowgrph/docs/documents/knowgrph-mcp/knowgrph-mcp-service-prd-tad.companion.md`](https://github.com/huijoohwee/knowgrph/blob/main/docs/documents/knowgrph-mcp/knowgrph-mcp-service-prd-tad.companion.md).
> Edit there first; this file exists as a stable publish-side entry in the
> `huijoohwee.github.io` doc index.
>
> For current remote MCP onboarding, start with
> `docs/documents/knowgrph-mcp-onboarding-index.md`, then use
> `docs/documents/knowgrph-mcp-install-contract.md` for the canonical
> public-discovery vs control-plane endpoint boundary.
> Map intent on `https://airvio.co/knowgrph/mcp`, orchestrate agents on
> `https://airvio.co/knowgrph/control-plane/mcp` only for session-capable
> hosts, and prove outcomes first with the source-side `README.md` or
> `docs/documents/knowgrph-superagent-harness.md` offline path.

Use the canonical source doc for:
- shipped surface ownership by file
- WebMCP, Pages, MCP Apps, and prompt/resource readiness owners
- architecture invariants and forbidden stale topologies
- the published template-only `promotionRecovery` operator contract that stays owned by the shared MCP Apps surface

Published operator surface:
- `https://airvio.co/knowgrph/.well-known/mcp/apps/knowgrph-agent-ready.html`
  - shared MCP Apps card for promotion-retry semantics
  - use it for command-template guardrails only; use browser-local finalize inspection for exact retry paths
