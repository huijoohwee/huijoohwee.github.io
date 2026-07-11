---
title: "HJH Topology Document"
doc_type: "PRD + TAD"
version: "1.1.0"
status: "active"
date: "2026-07-11"
lang: "en-US"
owners:
  - "cross-repo topology docs"
frontmatter_contract: "required"
---

# HJH Topology Document

> **Remote MCP onboarding note**: this is a shared topology document, not the
> canonical MCP setup contract. For current Knowgrph remote MCP onboarding,
> start with `docs/documents/knowgrph-mcp-onboarding-index.md`, then use
> `docs/documents/knowgrph-mcp-install-contract.md` for the explicit
> `https://airvio.co/knowgrph/mcp` vs
> `https://airvio.co/knowgrph/control-plane/mcp` boundary.

## Markdown YAML Frontmatter Contract

- The opening YAML frontmatter block remains the first block and canonical metadata SSOT for this topology PRD/TAD.
- This document is a canonical authored topology contract, not a typed validation fixture or generated registry surface.
- Frontmatter stays in plain YAML so the file demonstrates the default authoring path for cross-repo topology, deployment, and ownership docs.
- If typed `{key, type, value}` envelopes are needed for ingest -> parse -> render validation, that coverage should live in a dedicated fixture doc rather than replacing canonical topology prose.
- Cross-repo topology and publish-boundary decisions must be derived from parsed frontmatter and document content only, never from file path assumptions or downstream mirrors.

## Feature: Cross-Repo Dev, Publish, and Cloudflare Topology

### Problem Statement

Knowgrph and Singabldr need one deploy topology that preserves separate Dev SSOT repos, keeps `huijoohwee` artifact-only, and prevents route, source, or publish-flow drift across `airvio.co`, `airvio.co/knowgrph`, and `airvio.co/singabldr`.

### User Stories

**As a** maintainer  
**I want** each app to keep its own Dev SSOT and publish only generated surfaces  
**So that** releases stay reviewable, drift stays bounded, and Cloudflare routing remains isolated per app

### Acceptance Criteria

**Given** `knowgrph`, local checkout `singabldr` backed by `huijoohwee/singabldr`, and `huijoohwee` repos  
**When** topology docs and release flows are reviewed  
**Then** each app owns its own source/build logic, `huijoohwee` owns only publish/config surfaces, and each public route stays app-isolated. `airvio.co` must load the published Knowgrph React shell with its source-backed Live Canvas Hero; its entry action must resolve to `airvio.co/knowgrph/`.

### Success Metrics

- Metric: topology drift incidents | Baseline: ad-hoc | Target: zero active cross-app route/source drift | Timeline: ongoing
- Metric: publish-source duplication | Baseline: manual cleanup needed | Target: one SSOT repo per app | Timeline: ongoing

### Out of Scope

- Merging Knowgrph and Singabldr source into one repo
- Replacing Cloudflare Pages with a different hosting stack
- Defining per-feature runtime behavior inside either app

### Dependencies

- `knowgrph/docs/documents/knowgrph-cross-repo-publish-topology.md`
- `singabldr/docs/documents/singabldr-cross-repo-publish-topology.md`
- `huijoohwee/_redirects`
- per-app `sync:pages` and `release:pages` pipelines

### Open Questions

- Should publish updates be committed manually or by CI-generated pull requests
- Should a shared CODEOWNERS rule set be added for both app publish surfaces

## Architecture: Shared Pages Publish Topology

### Architecture Overview

**From app-owned source to public routes**: `knowgrph` or `singabldr` → app build and validation → sync generated surfaces into `huijoohwee` → Cloudflare Pages serves isolated routes under `airvio.co`.

### Knowgrph root-launch E2E flow

```text
knowgrph Dev SSOT
  docs/workspace-readme.md + React/FlowCanvas owners
    -> pages:build-sync (Vite base path: /knowgrph/)
    -> pages:functions:build
huijoohwee publish surfaces
  content/knowgrph/        generated artifact mirror
  knowgrph/                managed public-route shell/assets
  _worker.js               generated Pages Functions bundle
    -> Cloudflare Pages project: joohwee
Public runtime
  airvio.co                published React app shell + root-alias metadata
    -> source-backed interactive Live Canvas Hero
    -> Enter Knowgrph
    -> airvio.co/knowgrph/
```

The root route is not a separately maintained landing page and the hero is not a bitmap or duplicated static shell. The root Pages handler retrieves the published Knowgrph app shell, injects the `/knowgrph/` runtime alias marker, and lets the same React application render the interactive `workspace-readme.md` canvas. If persisted state has not materialized that source, the root hook retrieves the canonical `/docs/workspace-readme.md` text and parses the identical FlowCanvas projection; a Mermaid/timeline workspace must not take root-route ownership. Explorer → Source Files → **Share canvas embed** immediately replaces the hero canvas with the selected source's same-origin interactive `kgDoc` runtime. A later published URL may upgrade that runtime only when same-origin; this keeps localhost source previews functional under the production frame-ancestor policy. A minimal fallback may exist only when that app shell cannot be retrieved; it is not the normal delivery path.

For the detailed source-backed Markdown discovery contract behind that hero, use `docs/documents/markdown-convertible-agent-discovery-document.md`.

**Runtime boundary note (`knowgrph` / `agentic-canvas-os`)**: this document is
the shared **publish topology** contract, not the full runtime topology for the
Knowgrph video-remix product split. For that product specifically:

- `knowgrph` remains the control-plane + contract SSOT and publishes the
  Cloudflare surfaces under `airvio.co/knowgrph`.
- `agentic-canvas-os` is the realized split product repo for the user-facing
  runtime shell.
- The product runtime path is Vercel web + same-origin Vercel Agent-API as the
  **primary/default** browser path, with AWS Agent-API as the **fallback/proof**
  path.
- The live canvas is consumed through the run-scoped Knowgrph `doc-view` iframe
  surface; MCP is the orchestration/control-plane transport, not the browser
  canvas-render transport.
- For current remote MCP onboarding and the canonical public-discovery vs
  control-plane endpoint boundary, start with
  `docs/documents/knowgrph-mcp-onboarding-index.md` and
  `docs/documents/knowgrph-mcp-install-contract.md`.

**Knowgrph release-gate handoff**: keep Knowgrph-specific pre-deploy blockers
owned upstream in
`knowgrph/docs/documents/knowgrph-cross-repo-publish-topology.md` rather than
duplicating them here. The shared topology contract assumes three current
proof lanes remain source-owned there:

- responsive parity stays blocked on the mobile keyboard browser smoke,
  `pages:check-sync`, and the route-and-action matrix review before
  `pages:deploy-cloudflare`
- collaboration changes stay blocked on `npm run collaboration:release:check`
  plus publish-sync proof
- storage-route claims stay blocked on direct live proof such as
  `https://airvio.co/api/storage/*` and the storage worker origin checks before
  they are treated as publish-ready evidence

### Component Specifications

**Component**: `knowgrph`  
**Responsibility**: Own Knowgrph source, build rules, docs, and release validation  
**Interfaces**: `sync:pages`, `release:pages`, canonical docs  
**Dependencies**: `huijoohwee` publish repo, Cloudflare Pages  
**Configuration**: app-local publish path resolution and route contract

**Component**: `singabldr`  
**Responsibility**: Own Singabldr source, shell assets, build rules, and release validation through the local `singabldr` checkout backed by `huijoohwee/singabldr`  
**Interfaces**: `sync:pages`, `release:pages`, canonical docs  
**Dependencies**: `huijoohwee` publish repo, Cloudflare Pages  
**Configuration**: app-local publish path resolution and route contract

**Component**: `huijoohwee`  
**Responsibility**: Own shared publish surfaces, redirects, headers, generated Pages Functions, and Cloudflare-facing repo content
**Interfaces**: `_redirects`, `_headers`, `_worker.js`, Pages Functions, app publish targets
**Dependencies**: synced app artifacts from `knowgrph` and `singabldr`  
**Configuration**: Cloudflare Pages project settings and route rewrites

**Component**: Knowgrph root app-shell handler
**Responsibility**: Serve the canonical published Knowgrph app shell at `airvio.co`, inject the `/knowgrph/` runtime alias, and preserve normal SPA asset resolution
**Interfaces**: root request → published `/knowgrph/` assets + alias metadata
**Dependencies**: generated `cloudflare/pages/root-agent-ready-index.mjs` copied through the Knowgrph publish sync
**Configuration**: `x-knowgrph-root-alias=/knowgrph/`

### Integration Contracts

**Interface**: Dev-to-publish sync  
**Protocol**: local file sync plus Git commit  
**Data Format**: generated static assets, manifests, docs, and route files  
**Error Handling**: fail sync/release on missing artifacts, forbidden terms, or route drift

**Interface**: Publish-to-Cloudflare delivery  
**Protocol**: Cloudflare Pages deployment from an exact `huijoohwee` commit or clean archive of that commit
**Data Format**: static repo contents from `huijoohwee`  
**Error Handling**: keep route ownership explicit in `_redirects`; never patch routes downstream in generated app files. Verify both `airvio.co/` and `airvio.co/knowgrph/` after the custom domain observes the deployed asset hash.

### Architectural Decisions

**Decision**: Keep one Dev SSOT repo per app and one shared publish repo  
**Rationale**: preserves source ownership, reduces drift, and keeps Cloudflare delivery reviewable  
**Alternatives Considered**: store app source directly in `huijoohwee`; merge both apps into one repo  
**Trade-offs**: adds sync/release discipline but removes publish-repo source duplication and cross-app leakage

### Quality Attributes

- Performance: publish only generated app surfaces and avoid duplicate rebuild paths
- Scalability: allow more app routes later without turning the publish repo into source
- Security: keep public route ownership isolated and publish boundaries explicit
- Observability: keep release validation in app-owned pipelines and route config in one publish repo

### Deployment Strategy

Cloudflare Pages deploys from `huijoohwee`; `knowgrph` publishes `airvio.co/knowgrph` and the root Knowgrph launch alias at `airvio.co`; the local `singabldr` checkout backed by `huijoohwee/singabldr` publishes `airvio.co/singabldr`; app repos never deploy directly to Pages without syncing their generated outputs first.

For a root-launch release, validate the same React-owned surfaces in Dev and Prod: the Live Canvas Hero region, the interactive `workspace-readme.md` FlowCanvas, and the hero's visible **Share canvas embed** action copying a `kgPreview=1&kgLiveHero=1` URL. Open that URL and prove the dedicated embedded-preview owner (`data-kg-live-canvas-hero-embed-preview=true`) contains the real interactive Flow canvas with the source-derived node and edge counts. Then invoke Explorer → Source Files → **Share canvas embed** for a different source and verify the hero immediately mounts `data-kg-live-canvas-hero-selected-embed=true` at a same-origin URL with interactive controls and canvas surfaces. On the apex and selected embed, verify zero visible Canvas toolbars, editor shells, Mermaid SVGs, timelines, and minimaps; persisted workspace renderer state must not seep into or mutate the hero. Also verify the visible `/`, `#`, and `@` invocation controls, exactly one `Enter Knowgrph` link, and no normal-path static launch overlay. Keep the Dev instance running beside the production page during visual verification.

For the Knowgrph product split, keep this distinction explicit:

- **Publish topology**: `knowgrph` -> `huijoohwee` -> Cloudflare Pages for the
  public `airvio.co/knowgrph` surfaces.
- **Runtime topology**: `agentic-canvas-os` deploys its Vercel primary path and
  AWS fallback path outside the Pages publish repo; `huijoohwee` does not own
  those runtime app sources.

### Migration Path

If a repo still contains duplicated publish-side source, remove it from the publish repo, move ownership back to the app SSOT repo, and re-establish release flow through the app-owned sync and validation scripts.

## Cross-References

- Shared directive log: `huijoohwee.github.io/docs/documents/hjh-workspace-todo-log.md`
- Knowgrph canonical companion: `knowgrph/docs/documents/knowgrph-cross-repo-publish-topology.md`
- Markdown discovery companion: `huijoohwee.github.io/docs/documents/markdown-convertible-agent-discovery-document.md`
- Singabldr canonical companion: `singabldr/docs/documents/singabldr-cross-repo-publish-topology.md`
- Shared schema guidance: `huijoohwee.github.io/schema/AgenticRAG/{README.md,documentation.jsonld}`
