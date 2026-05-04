# HJH Topology Document

**Version**: 1.0.0  
**Date**: 2026-05-04  
**Status**: Active  
**Owner**: Cross-repo topology docs

## Feature: Cross-Repo Dev, Publish, and Cloudflare Topology

### Problem Statement

Knowgrph and Singabldr need one deploy topology that preserves separate Dev SSOT repos, keeps `huijoohwee` artifact-only, and prevents route, source, or publish-flow drift across `airvio.co/knowgrph` and `airvio.co/singabldr`.

### User Stories

**As a** maintainer  
**I want** each app to keep its own Dev SSOT and publish only generated surfaces  
**So that** releases stay reviewable, drift stays bounded, and Cloudflare routing remains isolated per app

### Acceptance Criteria

**Given** `knowgrph`, local checkout `singabldr` backed by `huijoohwee/singabldr`, and `huijoohwee` repos  
**When** topology docs and release flows are reviewed  
**Then** each app owns its own source/build logic, `huijoohwee` owns only publish/config surfaces, and each public route stays app-isolated

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

**From app-owned source to public routes**: `knowgrph` or `singabldr` → app build and validation → sync generated surfaces into `huijoohwee` → Cloudflare Pages serves isolated routes under `airvio.co`

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
**Responsibility**: Own shared publish surfaces, redirects, headers, and Cloudflare-facing repo content  
**Interfaces**: `_redirects`, `_headers`, Pages Functions, app publish targets  
**Dependencies**: synced app artifacts from `knowgrph` and `singabldr`  
**Configuration**: Cloudflare Pages project settings and route rewrites

### Integration Contracts

**Interface**: Dev-to-publish sync  
**Protocol**: local file sync plus Git commit  
**Data Format**: generated static assets, manifests, docs, and route files  
**Error Handling**: fail sync/release on missing artifacts, forbidden terms, or route drift

**Interface**: Publish-to-Cloudflare delivery  
**Protocol**: GitHub-connected Cloudflare Pages deploy  
**Data Format**: static repo contents from `huijoohwee`  
**Error Handling**: keep route ownership explicit in `_redirects`; never patch routes downstream in generated app files

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

Cloudflare Pages deploys from `huijoohwee`; `knowgrph` publishes `airvio.co/knowgrph`; the local `singabldr` checkout backed by `huijoohwee/singabldr` publishes `airvio.co/singabldr`; app repos never deploy directly to Pages without syncing their generated outputs first.

### Migration Path

If a repo still contains duplicated publish-side source, remove it from the publish repo, move ownership back to the app SSOT repo, and re-establish release flow through the app-owned sync and validation scripts.

## Cross-References

- Knowgrph canonical companion: `knowgrph/docs/documents/knowgrph-cross-repo-publish-topology.md`
- Singabldr canonical companion: `singabldr/docs/documents/singabldr-cross-repo-publish-topology.md`
- Shared schema guidance: `huijoohwee.github.io/schema/AgenticRAG/{README.md,documentation.jsonld}`
