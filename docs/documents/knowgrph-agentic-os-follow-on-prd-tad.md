---
title: "Knowgrph — Agentic OS Follow-On PRD/TAD"
doc_type: "Combined PRD/TAD"
version: "1.0.0"
status: "spec-complete to runtime-ready"
date: "2026-07-03"
lang: "en-US"
frontmatter_contract: "required"
canonical_ssot: "https://github.com/huijoohwee/knowgrph/blob/main/docs/documents/knowgrph-agentic-os-follow-on-prd-tad.md"
parent: "https://github.com/huijoohwee/knowgrph/blob/main/docs/documents/knowgrph-agentic-os-prd-tad.md"
---

# Knowgrph — Agentic OS Follow-On PRD/TAD

> **Mirror notice**: canonical SSOT lives in
> [`knowgrph/docs/documents/knowgrph-agentic-os-follow-on-prd-tad.md`](https://github.com/huijoohwee/knowgrph/blob/main/docs/documents/knowgrph-agentic-os-follow-on-prd-tad.md).
> Edit there first; this file tracks the same content for the `huijoohwee.github.io` doc index.
>
> For current remote MCP onboarding, start with
> `docs/documents/knowgrph-mcp-onboarding-index.md`, then use
> `docs/documents/knowgrph-mcp-install-contract.md` for the canonical
> public-discovery vs control-plane endpoint boundary.

Parent: [`knowgrph-agentic-os-prd-tad.md`](https://github.com/huijoohwee/knowgrph/blob/main/docs/documents/knowgrph-agentic-os-prd-tad.md) v0.4.0.

## Purpose

Closes the three follow-on tracks from the Agentic OS Must-tier increment:

| Track | Focus | Local status | Deploy gap |
|---|---|---|---|
| **A — HITL Gate Service** | Durable Approval_Tokens on Worker | Issuance/verify/consume **implemented** (`mcp/video-remix/approval-token-issuer.js`) | KV/DO durable store on control plane |
| **B — Live stage harnesses** | Exa / BytePlus / Stripe behind gates | Exa + storyboard **wireable** (`live-clients.js`); render/commerce **async scaffold** | Secrets + golden-path live proof |
| **C — Dashboard UI lanes** | Canvas operator dashboard | `knowgrph.agentic_canvas_os.plan` dry-run **implemented** | Storyboard render of dashboard doc |

## Min-Viable Follow-On Sprint 1

1. Worker KV adapter for Approval_Token store (interface already defined in issuer).
2. Deploy `knowgrph-mcp` with `KNOWGRPH_LIVE_CLIENTS=1` + Exa + AI Gateway chat env.
3. One gated live Director run (research + storyboard) with persisted Run_Manifest.
4. Open `dashboard.agentic-os.md` through existing Canvas apply path.

## Validation (from repo root)

```bash
node --test mcp/__tests__/approval-token-single-use.test.mjs \
  mcp/__tests__/approval-rejection-path.test.mjs \
  mcp/__tests__/director-gates-enforcement.test.mjs \
  mcp/__tests__/research-harness.test.mjs \
  mcp/__tests__/director-live-run.test.mjs
npm run runtime:test
```

## Related documents (in-repo)

- [Agentic OS PRD/TAD v0.4.0](https://github.com/huijoohwee/knowgrph/blob/main/docs/documents/knowgrph-agentic-os-prd-tad.md)
- [Agent-ready document v1.2.0](https://github.com/huijoohwee/knowgrph/blob/main/docs/documents/knowgrph-agent-ready-document.md)
- [Agentic Canvas OS PRD/TAD + companion](https://github.com/huijoohwee/knowgrph/tree/main/docs/documents/knowgrph-mcp)
- [PRD & TAD Guidelines v1.3.0](../guidelines/prd-tad-guidelines.md)

Full specification (user stories, topology v2.2.0, ADRs, traceability): see canonical SSOT file above.
