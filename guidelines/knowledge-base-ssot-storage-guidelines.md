---
title: "Knowledge-Base SSOT Storage Guidelines"
doc_type: "Guidelines"
version: "1.0.0"
date: "2026-08-05"
lang: "en-US"
frontmatter_contract: "required"
---

# Knowledge-Base SSOT Storage Guidelines

## Scope and authority

These directives govern a portable knowledge source plus optional collaboration, serving, indexing, and interchange projections. Concrete providers are reference implementations of provider-neutral roles.

## Directives

### Canonical source

- Authors keep Markdown plus YAML frontmatter as the canonical authored knowledge format.
- Operators accept source only through the protected revision and review owner.
- Integrators record repository-relative identity, accepted revision, and content digest on every projection.
- Teams may replace the Git forge without changing the canonical content contract.
- Teams forbid browser databases, collaboration pages, generated sites, indexes, caches, and interchange files from becoming implicit source authority.

### Store roles

- Integrators use a structured collaboration table for catalog and workflow fields.
- Integrators use collaborative documents or knowledge spaces for navigation, discussion, and review.
- Publishers generate static Markdown for public reads and rebuild structured indexes from accepted source.
- Operators store large bytes separately from authored document truth.
- Importers treat CSV/JSON as deterministic interchange and create reviewed candidates.
- Architects defer another durable database until measurements prove a query, scale, retention, or compliance gap.

### Trust boundary

- Hosts custody app secrets and reusable provider credentials outside browser code and output.
- Clients request only short-lived, scoped authorization needed for the current user action.
- Adapters verify application scope, resource membership, provider revision, and caller authority before reads or writes.
- Systems minimize personal data, declare residency/retention, and redact credentials from logs and evidence.
- Browsers forbid direct durable provider writes that bypass the host adapter, audit record, or candidate review.

### Local-first synchronization

- Clients persist recoverable local state before optional transport and keep a bounded outbox on failure.
- Adapters acquire immutable provider snapshots before transformation.
- Mappers transform deterministically, version their mapping, and preserve unsupported fields for review.
- Reconcilers require both accepted source base and provider revision; they forbid last-write-wins.
- Conflicts remain explicit and retryable; rejection cannot be silently converted into success.

### Projection and retry

- Publishers bind source identity, projection identity, direction, review state, mapping version, and prior projection identity.
- Publishers derive one deterministic idempotency key per exact operation.
- Adapters replay only an identical key and payload; they reject key reuse with changed content.
- Publishers update only changed projections and retain the prior readable projection when publication fails.
- Operators prove digest parity, rollback, deletion, and recovery before enabling write-back.

### Agentic invocation grammar

- Documentation consumes `/` actions, `#` semantic scopes, and `@` actor/owner bindings from the centralized Agentic Canvas OS frontmatter dictionaries.
- Provider projections preserve those identities and forbid local aliases, remaps, or duplicate registries.
- Display labels never grant execution, mutation, or ownership authority.

### TCO and token performance

- Pipelines parse frontmatter and metadata before fetching or chunking full bodies.
- Pipelines cache immutable revisions and content digests, batch operations, and skip unchanged projections.
- Correctness paths use deterministic parsing, hashing, mapping, and conflict checks with zero mandatory LLM tokens.
- Teams meter provider calls, storage, egress, operations time, and optional model usage before expanding scope.
- Teams prefer the minimum managed surface that produces measured collaboration value and retain a portable FOSS exit path.

## Reference implementation mapping

| Neutral role | Current reference implementation |
|---|---|
| Canonical source | Git-backed Markdown/frontmatter in the product source repository |
| Collaborative structured projection | Lark Base / Bitable API |
| Collaborative navigation/review | Lark Wiki and Docs |
| Public/static projection | Cloudflare Pages/static Markdown |
| Structured query projection | Cloudflare D1 |
| Binary/cache/live coordination | Cloudflare R2, KV, and one selected Durable Object room when justified |
| Interchange | CSV/JSON |

## Validation checklist

- [ ] One canonical source and protected acceptance revision are explicit.
- [ ] Every projection carries source revision and content digest.
- [ ] Browser output contains no app secret or reusable provider credential.
- [ ] Read-only discovery precedes outbound mutation.
- [ ] Re-import is deterministic and idempotent.
- [ ] Source-base and provider-revision drift produce explicit conflict.
- [ ] Offline outbox, bounded retry, rollback, deletion, and retention behavior are tested.
- [ ] Invocation identities resolve from the centralized `/`, `#`, and `@` dictionaries.
- [ ] Provider calls, cash TCO, operational time, and optional token use are measured.
- [ ] Delivery and production claims cite exact runtime evidence rather than documentation status.

## Anti-patterns

| Anti-pattern | Required correction |
|---|---|
| Collaboration provider as hidden SSOT | Restore portable source authority and publish collaboration as a projection. |
| Browser-held app secret | Move credential exchange and provider calls behind the host boundary. |
| Dual-write or last-write-wins | Create immutable snapshots and reviewed source candidates. |
| Generated site or database edited as source | Regenerate from the accepted revision. |
| CSV imported directly into canonical bytes | Normalize, diagnose, review, and accept as a candidate. |
| LLM required for synchronization correctness | Replace with deterministic mapping; keep enrichment optional. |

