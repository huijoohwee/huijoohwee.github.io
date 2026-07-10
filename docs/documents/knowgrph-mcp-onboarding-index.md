---
title: "Knowgrph MCP Onboarding Index"
id: "md:knowgrph-mcp-onboarding-index"
author: "airvio / joohwee"
date: "2026-07-10"
updated: "2026-07-10"
version: "1.1.0"
status: "current"
doc_type: "Onboarding Index"
lang: "en-US"
frontmatter_contract: "required"
domain: "knowgrph"
orientation:
  - "solo-dev"
  - "AI-native"
  - "source-owned"
constraints:
  - "public discovery stays read-only"
  - "control-plane stays approval-gated"
  - "fail-closed"
traceability:
  repo: "huijoohwee/knowgrph"
  source_doc_path: "docs/documents/knowgrph-mcp-onboarding-index.md"
  feature_surface: "Remote MCP Onboarding"
---

# Knowgrph MCP Onboarding Index

## Purpose

This is the one-stop landing page for remote MCP onboarding.

Use it when you need one short path to:

- choose the correct Knowgrph MCP endpoint
- understand the public discovery vs control-plane split
- find the canonical install contract
- scan the latest install-boundary release note

## Fastest Path

Use this order when you want the lowest-friction public onboarding route:

1. install `https://airvio.co/knowgrph/mcp`
2. add `https://airvio.co/knowgrph/control-plane/mcp` only if the host can preserve MCP session state and needs live `/`, `#`, `@` grammar lookup
3. if you want the cheapest proof path before hosted setup, use the source-side offline deterministic route in `README.md` or `docs/documents/knowgrph-superagent-harness.md` in the `knowgrph` repository

## Quick Answer

- Install `https://airvio.co/knowgrph/mcp` for public discovery and read-only MCP usage
- Use `https://airvio.co/knowgrph/control-plane/mcp` only for approval-gated orchestration and
  live `/`, `#`, `@` grammar invocation

## Recommended Reading Order

1. `docs/documents/knowgrph-mcp-install-contract.md`
   - Canonical install rule, host recipes, and dual-surface boundary
2. `docs/documents/knowgrph-mcp-install-boundary-release-note-20260710.md`
   - Recent-change summary for the new install boundary
3. `docs/documents/knowgrph-agent-ready-document.md`
   - Broader agent-ready surface, trust boundary, and discovery context
4. `huijoohwee/knowgrph` `README.md` or `docs/documents/knowgrph-superagent-harness.md`
   - Lowest-cost local evaluation path before hosted setup
5. `docs/documents/knowgrph-mcp/knowgrph-mcp.md`
   - Full MCP topology, readiness scope, and current implementation truth

## Which Doc To Open

| Need | Open |
|---|---|
| I just need the right install URL | `docs/documents/knowgrph-mcp-install-contract.md` |
| I want the shortest update summary | `docs/documents/knowgrph-mcp-install-boundary-release-note-20260710.md` |
| I want the larger discovery and readiness context | `docs/documents/knowgrph-agent-ready-document.md` |
| I want the cheapest evaluation path before hosted setup | `huijoohwee/knowgrph` `README.md` or `docs/documents/knowgrph-superagent-harness.md` |
| I want the MCP-specific architecture and scope | `docs/documents/knowgrph-mcp/knowgrph-mcp.md` |

## Canonical Endpoint Rule

| Surface | URL | Use |
|---|---|---|
| Public discovery | `https://airvio.co/knowgrph/mcp` | Install, discovery, read-only retrieval, prompts, resources, inspection |
| Control plane | `https://airvio.co/knowgrph/control-plane/mcp` | Approval-gated orchestration, live grammar invocation, sessioned MCP flows |

## Guardrails

- Do not treat `/knowgrph/mcp` as if it already exposes the control-plane grammar tool.
- Do not document both URLs as interchangeable install targets.
- Do not claim one-URL plug-and-play grammar invocation for hosts that cannot manage MCP session flow.
