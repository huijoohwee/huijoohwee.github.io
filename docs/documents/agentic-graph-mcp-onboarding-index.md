---
schema: agentic-os-computing-flow/v1
id: agentic-graph-mcp-onboarding-index
version: 1.0.4
status: implemented
created: 2026-07-10
updated: 2026-07-12
author: airvio / joohwee
domain: agentic-graph
doc_type: "Onboarding Index"
frontmatter_contract: required
canonical_service_url: "https://airvio.co/agentic-graph/"
public_read_mcp_url: "https://airvio.co/agentic-graph/mcp"
control_plane_mcp_url: "https://airvio.co/agentic-graph/control-plane/mcp"
tags: [mcp, onboarding, index, discovery, control-plane, operator]
constraints:
  - solo-dev
  - source-owned
  - token-efficient
  - fail-closed
related:
  - docs/documents/agentic-graph-mcp-install-contract.md
  - docs/documents/agentic-graph-mcp-install-boundary-release-note-20260710.md
  - docs/documents/agentic-graph-agent-ready-document.md
  - docs/documents/markdown-convertible-agent-discovery-document.md
  - docs/documents/agentic-graph-superagent-harness.md
  - docs/documents/agentic-graph-mcp/agentic-graph-mcp.md
  - docs/documents/agentic-graph-mcp-service-prd-tad.md
  - docs/documents/agentic-graph-mcp-agentic-os-prd-tad.md
  - docs/documents/agentic-graph-mcp-service-prd-tad.companion.md
  - docs/documents/agentic-graph-mcp-agentic-os-prd-tad.companion.md
---

# Agentic Graph MCP Onboarding Index

## Purpose

This is the one-stop landing page for remote MCP onboarding.

Use it when you need one short path to:

- choose the correct Agentic Graph MCP endpoint
- understand the public discovery vs control-plane split
- find the source-backed Markdown discovery contract behind the Live Canvas Hero
- find the canonical install contract
- scan the latest install-boundary release note
- jump straight to the latest evidence-backed release proof

## Quick Answer

Map intent. Orchestrate agents. Prove outcomes.

A source-backed canvas where `/` routes work, `#` sets meaning, and `@` binds context.

One canonical operator contract: install and discovery stay on `https://airvio.co/agentic-graph/mcp`, while live `/`, `#`, and `@` grammar stays on `https://airvio.co/agentic-graph/control-plane/mcp` or an app-owned forwarder until the host proves MCP session support.

- Install `https://airvio.co/agentic-graph/mcp` for public discovery and read-only MCP usage
- Use `https://airvio.co/agentic-graph/control-plane/mcp` only for approval-gated orchestration and
  live `/`, `#`, `@` grammar invocation

## Fastest Path

1. Map intent: start with `https://airvio.co/agentic-graph/mcp` for public discovery, retrieval, and
   inspection.
2. Orchestrate agents: add `https://airvio.co/agentic-graph/control-plane/mcp` only if the host can
   preserve MCP session state across calls and needs live grammar lookup.
3. Prove outcomes: if you want the cheapest proof path before hosted setup, use the source-side
   offline deterministic route in `README.md` or `docs/documents/agentic-graph-superagent-harness.md`
   in the `agentic-graph` repository.

## Fastest Grammar Path

Use this path when you need live Agentic Canvas OS grammar, not just read-only discovery:

1. Map intent: install `https://airvio.co/agentic-graph/mcp` first for discovery, retrieval, prompts, resources, and inspection
2. Orchestrate agents: add `https://airvio.co/agentic-graph/control-plane/mcp` only when the host can preserve MCP session state
3. Prove outcomes: resolve live grammar on the control plane through `agentic-graph.agentic_canvas_os.docs.invoke`

Concrete grammar examples:

- `/mcp.capabilities`
- `#mcp`
- `@mcp-gateway`

## Recommended Reading Order

1. `docs/documents/agentic-graph-mcp-install-contract.md`
   - Canonical install rule, host recipes, and dual-surface boundary
2. `docs/documents/agentic-graph-mcp-install-boundary-release-note-20260710.md`
   - Recent-change summary plus the latest evidence-backed release proof
3. `docs/documents/agentic-graph-agent-ready-document.md`
   - Broader agent-ready surface, trust boundary, and discovery context
4. `docs/documents/markdown-convertible-agent-discovery-document.md`
   - Live Canvas Hero Markdown-discovery contract, publish route, and live proof
5. `huijoohwee/agentic-graph` `README.md` or `docs/documents/agentic-graph-superagent-harness.md`
   - Lowest-cost local evaluation path before hosted setup
6. `docs/documents/agentic-graph-mcp/agentic-graph-mcp.md`
   - Full MCP topology, readiness scope, and current implementation truth
7. `docs/documents/agentic-graph-mcp-service-prd-tad.md`
   - Publish-side mirror entry for the implemented MCP baseline and shipped-vs-planned boundary
8. `docs/documents/agentic-graph-mcp-agentic-os-prd-tad.md`
   - Publish-side mirror entry for the Agentic Canvas OS dashboard and orchestration contract
9. `docs/documents/agentic-graph-mcp-service-prd-tad.companion.md` or
   `docs/documents/agentic-graph-mcp-agentic-os-prd-tad.companion.md`
   - Publish-side mirror entries for file-owner detail, lane payloads, and companion guardrails
10. `https://airvio.co/agentic-graph/.well-known/mcp/apps/agentic-graph-agent-ready.html`
   - Browser-published MCP Apps card for template-only `#promotion.retry <path...>` recovery semantics

## Which Doc To Open

| Need | Open |
|---|---|
| I just need the right install URL | `docs/documents/agentic-graph-mcp-install-contract.md` |
| I want the shortest update summary | `docs/documents/agentic-graph-mcp-install-boundary-release-note-20260710.md` |
| I want the latest release proof with preview URL and docs-seed verification | `docs/documents/agentic-graph-mcp-install-boundary-release-note-20260710.md` |
| I want the larger discovery and readiness context | `docs/documents/agentic-graph-agent-ready-document.md` |
| I want the Live Canvas Hero Markdown route and discovery contract | `docs/documents/markdown-convertible-agent-discovery-document.md` |
| I want the cheapest evaluation path before hosted setup | `huijoohwee/agentic-graph` `README.md` or `docs/documents/agentic-graph-superagent-harness.md` |
| I want the MCP-specific architecture and scope | `docs/documents/agentic-graph-mcp/agentic-graph-mcp.md` |
| I want the implemented MCP baseline in the publish docs tree | `docs/documents/agentic-graph-mcp-service-prd-tad.md` |
| I want the Agentic Canvas OS contract in the publish docs tree | `docs/documents/agentic-graph-mcp-agentic-os-prd-tad.md` |
| I want the companion-level ownership or lane detail in the publish docs tree | `docs/documents/agentic-graph-mcp-service-prd-tad.companion.md` or `docs/documents/agentic-graph-mcp-agentic-os-prd-tad.companion.md` |
| I want published promotion retry semantics without opening source docs | `https://airvio.co/agentic-graph/.well-known/mcp/apps/agentic-graph-agent-ready.html` |

## Canonical Endpoint Rule

| Surface | URL | Use |
|---|---|---|
| Public discovery | `https://airvio.co/agentic-graph/mcp` | Install, discovery, read-only retrieval, prompts, resources, inspection |
| Control plane | `https://airvio.co/agentic-graph/control-plane/mcp` | Approval-gated orchestration, live grammar invocation, sessioned MCP flows |

Canonicalize the contract first, not the transport. The current dual-surface runtime stays intentional until hosted proof supports a single-runtime claim.

## Guardrails

- Do not treat `/agentic-graph/mcp` as if it already exposes the control-plane grammar tool.
- Do not document both URLs as interchangeable install targets.
- Do not claim one-URL plug-and-play grammar invocation for hosts that cannot manage MCP session flow.
