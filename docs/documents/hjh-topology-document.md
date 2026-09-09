---
title: "HJH Topology Document"
doc_type: "PRD + TAD + ADR"
version: "2.0.0"
status: "spec-complete"
date: "2026-09-09"
lang: "en-US"
owners:
  - "cross-repo topology docs"
frontmatter_contract: "required"
load_policy: "on-demand"
verification_scope: "source declarations and static owner joins; no live deployment proof"
source_snapshot:
  agentic-os: "e89e96089c3a75b99d30135bb2c6f5a3eccc8036"
  huijoohwee.github.io: "95ed40c3605feab075fd5da7182c29b892dd9dd5"
  agentic-commerce-os: "50d0047fe140595c7086e1a122ffa76ab20a29bd"
  agentic-canvas-os: "efd892678083302d46e9a8205bc02b8b39c46c1a"
  huijoohwee: "b7b6c39ce0b5844a43042026a910f7552477c8ff"
  agentic-graph: "ac194fbd0c33a1899399ba9afbfa1bb7a886cf23"
  GameXR: "718298dec9928f30bd24e349a7527aba2c85bfb1"
---

# HJH Topology Document

## Scope and Evidence

This document maps seven repositories' source ownership, declared runtime interfaces, mirror state
and release boundaries. The snapshot records inspected canonical checkout revisions on 2026-09-09;
the website revision is the base before this document update. Pending PRs are not integrated source.
Source declarations establish intended behavior, not a deployed route, enabled provider or paid loop.
Revalidate affected rows when an owner revision changes. Load the linked detail only when needed.

Links to sibling repositories resolve from the canonical workspace layout. In isolated worktrees or
hosted viewers, resolve the named repository and path from `source_snapshot`; do not treat a broken
relative link as proof that its source is absent. This document creates no lifecycle controller.

## Markdown YAML Frontmatter Contract

Opening plain YAML owns this document's identity and source snapshot. The
[shared CID, RAO and SVO contract](../../guidelines/cid-guidelines.md) owns traceability meanings;
[PRD/TAD/ADR guidance](../../guidelines/prd-tad-adr-guidelines.md) owns document composition.
Neither a topology row nor `spec-complete` grants integration, deployment or runtime authority.

## Feature: Cross-Repo Dev, Publish, and Cloudflare Topology

### Problem Statement

A solo operator needs a small complete product loop without copying source, competing deployment
controllers or starting services merely because they appear in the architecture. Distinguish the
source owner, consumer, generated projection and evidence required at every boundary.

### User Stories

As a maintainer, I want each repository to expose its actual contracts and release owner so that
changes remain reusable, independently verifiable and safe to promote across the workspace.

### Acceptance Criteria

- Each of the seven repositories has one bounded responsibility and inspectable source references.
- Commands and service bindings resolve in the named owner's inspected revision.
- Intended routes, observed mirror artifacts and live provider evidence remain separate claims.
- No shared-project release proceeds on an unresolved deployment-owner conflict.
- Check and resource selection follows the changed boundary; documentation validation starts no
  browser, Worker, Podman VM or model process unless its selected check requires one.

### Out of Scope

Product feature design, new infrastructure, source migrations, mirror repair and deployment are
separate work. Singabldr remains an adjacent route in the mirror, but its source repository is
outside this seven-repository audit; no current release command is asserted for it here.

## Architecture: Source and Runtime Ownership

### Component Specifications

| Repository | Owned responsibility | Source of truth |
|---|---|---|
| `agentic-os` | Repository lifecycle, source locks, admission vocabulary and static composition observation; no product payment or renderer runtime | [Composition architecture](../../../agentic-os/guides/COMPOSITION-ARCHITECTURE.md), [agent instructions](../../../agentic-os/AGENTS.md) |
| `huijoohwee.github.io` | Shared guidelines, schema vocabulary and topology documentation; no product execution or deployment controller | [Shared semantic contract](../../guidelines/cid-guidelines.md), [schema index](../../schema/AgenticRAG/README.md) |
| `agentic-commerce-os` | Edge/core coordination, admission-receipt validation, provider routing, derived markup and evidence gates; provider owners retain money movement and settlement | [Package entry points](../../../agentic-commerce-os/package.json), [core bindings](../../../agentic-commerce-os/wrangler.core.jsonc), [edge routes](../../../agentic-commerce-os/wrangler.edge.jsonc) |
| `agentic-canvas-os` | Shared invocation/safety contracts, agent facade, Worker API/assets and its declared durable state; Graph retains its domain execution and live Canvas owners | [Product contract](../../../agentic-canvas-os/docs/PRD-TAD.md), [Worker configuration](../../../agentic-canvas-os/wrangler.jsonc) |
| `agentic-graph` | Canvas and domain execution, repository collaboration grammar, control-plane MCP, provider-backed commerce capabilities and its protected production release workflow | [Package entry points](../../../agentic-graph/package.json), [release workflow](../../../agentic-graph/.github/workflows/release.yml) |
| `huijoohwee` | Generated production artifacts plus repository-owned projection policy, validation, headers and redirects; generated Graph assets are not authored here | [Mirror instructions](../../../huijoohwee/AGENTS.md), [route projection](../../../huijoohwee/_redirects), [validation commands](../../../huijoohwee/package.json) |
| `GameXR` | Browser-local spatial flight and native visionOS host, configuration and build artifacts; consumes packaged Graph spatial-input/shared code | [Package dependencies](../../../GameXR/package.json), [build modes](../../../GameXR/vite.config.ts), [release contract](../../../GameXR/docs/RELEASE.md) |

### Canonical local Dev boundary

The canonical Graph checkout is `$GITHUB_ROOT/agentic-graph` only while it uniquely owns clean
`main` at the fetched canonical revision. Its actual commands are `npm run dev`, `npm run dev:apex`
and the guarded `npm run dev:latest`. The Apex command selects `/` as the Vite base; it does not
change public route ownership. Admitted `agent/<device>/<semantic-scope>` worktrees may run isolated
previews. A task preview or a separate linked `main` checkout is not canonical Dev proof.

The executable owner is [dev-source-consistency.mjs](../../../agentic-graph/scripts/dev-source-consistency.mjs).
A canonical-path conflict must preserve occupied work and return to the installed lifecycle owner.
Consumers follow their pinned `node_modules/agentic-os` workflows and committed repository profile;
this document neither upgrades those pins nor substitutes the latest sibling checkout for them.

Commerce separately exposes `dev`, `dev:apex` and offline Worker tests. GameXR separately exposes
`dev`, `dev:apex`, `build` and `build:apex`; its default artifact is scoped to `/gamexr/`, while Apex
mode disables service-worker registration at shared root scope. Identically named npm scripts do
not establish identical runtimes or permission to start them all.

### Runtime interfaces and provider bindings

| Surface | Inspected declaration | Boundary |
|---|---|---|
| Graph app and root alias | `APP_BASE_PATH=/agentic-graph`; root handler injects the same React app's alias metadata | [Shared constants](../../../agentic-graph/cloudflare/pages/agentic-graph-agent-ready-shared.mjs), [root handler](../../../agentic-graph/cloudflare/pages/root-agent-ready-index.mjs) |
| Public MCP discovery | `/agentic-graph/mcp` Pages surface | Public discovery/read-only surface; not the control-plane Worker |
| Control-plane MCP | `/agentic-os/control-plane/mcp` and child routes | [Graph Worker route](../../../agentic-graph/cloudflare/workers/agentic-graph-mcp/wrangler.toml); Canvas's `AGENTIC_OS_MCP_ENDPOINT` agrees |
| Canvas facade | `worker/index.js`, `web/dist` assets, `CANVAS_ROOM` and `AGENT_STATE` Durable Objects | [Canvas configuration](../../../agentic-canvas-os/wrangler.jsonc); configuration alone proves no live public production URL |
| Commerce edge | Production route pattern `airvio.co/agentic-commerce-os*`, binding `COMMERCE_CORE` | [Edge configuration](../../../agentic-commerce-os/wrangler.edge.jsonc); production identity and external authority remain required |
| Commerce sandbox | Separate Sandbox Worker/container declaration | [Sandbox configuration](../../../agentic-commerce-os/wrangler.sandbox.jsonc); not an always-on prerequisite for other operations |
| GameXR | `/gamexr/` build and root-mode alternative | [GameXR build configuration](../../../GameXR/vite.config.ts); root publication needs a separate routing decision |

The [Commerce production service manifest](../../../agentic-commerce-os/config/production-core-services.json)
and [core configuration](../../../agentic-commerce-os/wrangler.core.jsonc) bind:

| Binding | Provider service | Provider source owner |
|---|---|---|
| `ACOS_ADMISSION` | `agentic-canvas-os` | Canvas |
| `CHECKOUT_PROVIDER` | `agentic-travel-commerce-production` | Graph |
| `COMMERCE_SANDBOX` | `agentic-commerce-sandbox-production` | Commerce |
| `DOCS_MCP` | `agentic-mcp` | Graph |
| `MARKETPLACE_PROVIDER` | `agentic-marketplace-production` | Graph |

The source-owned `inspectCompositionDeploymentTopology` export in
[composition-deployment-topology.mjs](../../../agentic-os/bin/composition-deployment-topology.mjs)
passed against the four runtime/lifecycle repository roots at the recorded revisions: five expected,
configured and release-manifest targets agree, with zero findings and no sibling candidate execution.
Manifest digest: `fbd529714b6d236aa85a0f12fffd3a71c19eefbb83850c5a4e34dc6fda3ff9c4`.
This is static declaration consistency, not admission, settlement, provider or deployment proof.

### Agentic Graph root-launch E2E flow

The intended source flow remains one React shell with the root alias and source-backed interactive
Canvas. [Root source](../../../agentic-graph/cloudflare/pages/root-agent-ready-index.mjs) owns shell
retrieval and alias injection; [Markdown discovery](./markdown-convertible-agent-discovery-document.md)
owns the detailed discovery/hero contract. Renderer, embed and mobile behavior must be tested through
their runtime owners before a release claim; this source audit did not execute browser verification.
MCP controls orchestration and does not become the browser Canvas-render transport.

### Observed mirror state

At mirror revision `b7b6c39ce0b5844a43042026a910f7552477c8ff`, `_redirects` and the tracked app directories
still use the retired unhyphenated Graph namespace. The Graph source constants and mirror policy
instead select `/agentic-graph/` and `content/agentic-graph`. This is an observed source-to-mirror gap,
not evidence that the desired route has been deployed. Legacy names must remain only where the
source-owned compatibility policy explicitly permits them; do not repair generated assets by hand.

The mirror also declares `/gamexr/` and `/singabldr` routes. File presence or an old release note
cannot establish the currently deployed project configuration, route response or artifact digest.

## Integration Contracts and Deployment Strategy

### Agentic Graph release owner

The inspected [production workflow](../../../agentic-graph/.github/workflows/release.yml) requires an
exact protected Graph source revision, local-review candidate and release evidence. It resolves a
pinned Canvas docs revision, checks out the schema/mirror repositories, validates and builds the
candidate, then enters the protected production environment for exact-candidate authorization.
Its declared ordering is:

```text
source + exact dependencies -> validation and generated mirror candidate
  -> production authorization -> Wrangler Pages deployment
  -> immutable/stable/public runtime and browser verification
  -> verified mirror publication -> final release evidence
```

The actual build interfaces are `pages:build-sync`, `pages:sync`, `pages:functions:build` and
`pages:check-sync`. The historical `sync:pages` and `release:pages` names are not Graph package scripts.
Although `pages:deploy-cloudflare` still exists as a package script, its existence is not authority
to bypass the protected release controller or to deploy from an arbitrary local checkout.

### GameXR release owner and unresolved shared-project conflict

[GameXR's release contract](../../../GameXR/docs/RELEASE.md) specifies a different sequence: build
from exact source, project only its scoped artifact through a mirror PR, use the Git-connected
`joohwee` Pages preview, obtain exact authorization, merge, then verify production and rollback if needed.
It names Git integration as the sole forward deployment owner. Graph's workflow instead executes
Wrangler deployment before mirror publication; [mirror policy](../../../huijoohwee/AGENTS.md) assigns
Graph's workflow deployment ownership.

These declarations do not yet form one coherent shared-project deployment policy. Do not infer that
both controllers may independently publish the whole project. The next affected release needs a
source-owned decision reconciling controller ownership, project/route scope, preserved sibling
artifacts, serialization, authorization and rollback, supported by actual provider configuration.
This document records the conflict; it does not choose a new controller or authorize either path.

### Architectural Decisions

| Decision | Rationale and consequence |
|---|---|
| Retain distinct lifecycle, contract, runtime and generated-mirror owners | Reuse existing code and interfaces; a mirror does not become a second app source |
| Treat Vercel/AWS topology as historical | [Canvas's active contract](../../../agentic-canvas-os/docs/PRD-TAD.md) excludes the old tier split; [Graph's archived decision](../../../agentic-graph/docs/agentic-graph-acos-topology-decision.md) marks it superseded |
| Preserve separate source, mirror and deployment observations | A source migration can be complete while mirror convergence and live release remain unverified |
| Resolve shared-project release authority upstream | Prevent competing forward deployments and accidental replacement of another product's artifacts |

### Migration Path

Update the affected source owner first; validate its exact candidate and regenerate projections
through the authorized release owner. Mirror reconciliation, live route proof and deployment-owner
reconciliation remain separate follow-up work, not side effects of synchronizing this document.

## Verification and Cross-References

- Source audit: all seven recorded heads, package entry points, configuration and release owners were inspected.
- Static topology: five Commerce service joins passed the existing source-owned inspector.
- Document checks: validate opening YAML, resolve cited repository paths, and run this site's `npm test`
  and `npm run check`. Recheck source revisions before relying on this snapshot for a later change.
- Live/runtime evidence: not established here. Keep provider configuration, exact deployment identities,
  browser/device behavior and funded payment evidence with their existing owners.
- Detailed Graph publishing: [cross-repo publish topology](../../../agentic-graph/docs/documents/agentic-graph-cross-repo-publish-topology.md).
- MCP onboarding: [index](../../../agentic-graph/docs/documents/agentic-graph-mcp-onboarding-index.md)
  and [install contract](../../../agentic-graph/docs/documents/agentic-graph-mcp-install-contract.md);
  source Worker routes remain the authority for endpoint declarations.
- Product readiness: [Canvas runtime readiness](../../../agentic-canvas-os/docs/RUNTIME-READINESS.md)
  and [GameXR release evidence requirements](../../../GameXR/docs/RELEASE.md).
- Shared planning: [Canvas TODO](../../../agentic-canvas-os/docs/TODO.md); new planning records follow
  its owner contract and do not alter this source snapshot automatically.
