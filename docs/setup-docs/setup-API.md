# Setup API

## Overview

This document defines a single-path API setup for a static-site repository that may call external providers directly, route requests through an edge layer, or restore a Pages Functions runtime later.

- **Current repository state**: `docs/setup-docs/setup-github.md` covers local tool installation, `docs/reference.md` and `docs/GrabMaps-SKILL.md` capture external API references, and `audit-security-performance-2026-04-06.md` records prior Cloudflare Pages Functions findings.
- **Current runtime observation**: the working tree does not currently expose a checked-in `functions/` directory, so API setup must start from configuration, secrets management, and validation rules before any edge runtime is added or restored.
- **Primary goal**: establish a reproducible API setup path that keeps credentials server-managed, keeps browser code free of long-lived secrets, and keeps future API surfaces documented before they are exposed.

---

## CID Frame

### Three-Beat Mantras

- [ ] API; enable reproducible provider access; forbid undocumented endpoints
- [ ] Authentication; secure server-managed credentials; forbid client-exposed long-lived secrets
- [ ] Configuration; centralize runtime parameters; forbid scattered API settings
- [ ] Documentation; record setup contracts clearly; forbid implicit operator knowledge
- [ ] Edge; isolate request mediation; forbid direct secret handling in browser code
- [ ] Logging; preserve operator traceability; forbid unlogged API failures
- [ ] Validation; verify structural readiness; forbid untested setup changes
- [ ] Variables; store secrets in managed runtime settings; forbid committed credentials

### Context-Intent-Directive Table

| Context | Intent | Directive |
|---|---|---|
| API | Enable reproducible provider access | - [ ] Document API surfaces; enable reproducibility; forbid undocumented endpoints |
| Authentication | Secure server-managed credentials | - [ ] Store secrets in managed runtime settings; secure credential flow; forbid client-exposed long-lived secrets |
| Configuration | Centralize runtime parameters | - [ ] Define one setup path; centralize configuration; forbid scattered API settings |
| Documentation | Record setup contracts clearly | - [ ] Capture setup steps; preserve operator clarity; forbid implicit operator knowledge |
| Edge | Isolate request mediation | - [ ] Route protected calls through edge handlers; isolate secrets; forbid direct browser secret handling |
| Logging | Preserve operator traceability | - [ ] Log request failures and setup decisions; preserve traceability; forbid unlogged API failures |
| Validation | Verify structural readiness | - [ ] Validate setup before release; ensure readiness; forbid untested setup changes |
| Variables | Store secrets in managed runtime settings | - [ ] Use Variables and Secrets deliberately; protect runtime state; forbid committed credentials |

---

## Architecture Overview

### Layer Flow

**Layer flow pattern**: Local setup -> Secret provisioning -> Optional edge mediation -> External provider call -> Response handling -> Validation

### Current Surface Map

- **Local setup surface**: `docs/setup-docs/setup-github.md`
- **Reference surface**: `docs/reference.md`
- **Provider-specific reference surface**: `docs/GrabMaps-SKILL.md`
- **Operational audit surface**: `audit-security-performance-2026-04-06.md`
- **Runtime caveat**: a checked-in `functions/` directory is not present in the current tree, even though the audit references earlier API handlers

### Transformation Statements

**From local repository state to operator-ready API configuration**: Operator -> installs tooling, identifies provider surfaces, defines runtime variables, and records deployment choices -> delivers a reproducible setup baseline for local and hosted execution.

**From protected credential state to callable upstream request path**: Edge runtime -> reads managed secrets, validates request scope, forwards approved calls, and returns bounded responses -> delivers protected API access without exposing long-lived credentials to browser code.

**From undocumented behavior to auditable setup contract**: Documenter -> records variables, auth modes, validation checks, and rollback expectations -> delivers an API setup guide that operators can repeat without guesswork.

---

## Single-Path Setup

### 1. Prepare The Local Environment

- Complete the local prerequisites in `docs/setup-docs/setup-github.md`.
- Confirm repository access and deployment access before touching secrets.
- Create a local operator note listing:
  - target provider
  - target environment
  - auth mode
  - base URL
  - owner of the credential

### 2. Choose The API Exposure Mode

Use one mode per protected provider path.

- **Browser-safe public mode**: use only for public, unauthenticated endpoints
- **Edge-mediated mode**: use for authenticated upstream calls, signed requests, token exchange, or URL fetch mediation
- **Deferred mode**: use when documentation exists but runtime code has not yet been restored to the repository

**Recommendation**: default to edge-mediated mode for any upstream that requires an API key, bearer token, signing secret, or request filtering.

### 3. Define The Minimum Runtime Contract

Record these fields before implementation:

| Field | Purpose |
|---|---|
| `API_PROVIDER_NAME` | Human-readable provider identifier |
| `API_BASE_URL` | Canonical upstream base URL |
| `API_AUTH_SCHEME` | Auth pattern such as `Bearer`, `HMAC`, or `None` |
| `API_PROXY_MODE` | `browser`, `edge`, or `deferred` |
| `API_REQUIRED_SECRETS` | Secret names required for hosted execution |
| `API_ALLOWED_ORIGINS` | Caller origins permitted to reach the runtime |
| `API_ALLOWED_HOSTS` | Upstream hosts allowed for outbound fetch |
| `API_TIMEOUT_MS` | Max upstream wait time |

### 4. Provision Variables And Secrets

For hosted execution on Cloudflare:

1. Open `Cloudflare Dashboard -> Workers & Pages -> <project> -> Settings -> Variables and Secrets`.
2. Add non-sensitive configuration as **Variables**.
3. Add credentials, tokens, and signing material as **Secrets**.
4. Keep naming stable across environments so preview and production differ by value, not by shape.
5. Restart or redeploy after secret changes so runtime bindings refresh.

Use this naming pattern:

| Type | Pattern | Example Shape |
|---|---|---|
| Variable | uppercase snake case | `API_BASE_URL` |
| Variable | scoped uppercase snake case | `API_ALLOWED_HOSTS` |
| Secret | provider-scoped uppercase snake case | `PROVIDER_API_KEY` |
| Secret | signing-scoped uppercase snake case | `WEBHOOK_SIGNING_SECRET` |

### 5. Keep Credentials Server-Managed

- Put long-lived secrets only in managed runtime settings.
- Keep browser-visible configuration limited to non-secret values.
- Route authenticated upstream traffic through an edge runtime when secrets are required.
- Reject ad-hoc patterns such as embedding tokens in source files, markdown, JSON artifacts, or client bundle constants.

### 6. Restore Or Add API Runtime Only After Config Exists

If a Pages Functions layer is added or restored later:

- create the runtime directory deliberately
- bind secrets from hosted settings
- validate caller origin and upstream host
- cap request timeout and response size
- document the route before exposing it publicly

---

## Component Specifications

### Operator Setup Component

**From unprepared environment to configured environment**: Operator setup -> identifies provider contract, provisions variables, provisions secrets, and records exposure mode -> delivers a repeatable API baseline for local and hosted use.

Atomic directives:

- Operator defines provider contract.
- Operator provisions runtime variables.
- Operator provisions managed secrets.
- Operator records auth mode.
- Operator validates deployment bindings.

### Edge Mediation Component

**From inbound request to bounded upstream response**: Edge mediation -> validates caller scope, validates upstream target, injects server-managed credentials, applies timeout guards, and returns filtered responses -> delivers protected API access with reduced client exposure.

Atomic directives:

- Edge validates request method.
- Edge validates caller origin.
- Edge validates upstream host.
- Edge injects managed credentials.
- Edge bounds timeout and payload size.

### Documentation Component

**From changing runtime state to durable setup knowledge**: Documentation component -> records setup contracts, records secret ownership, records validation checks, and records rollback steps -> delivers operator clarity and auditability.

Atomic directives:

- Documenter records variable names.
- Documenter records secret scopes.
- Documenter records deployment steps.
- Documenter records failure checks.
- Documenter records rollback actions.

---

## Configuration Reference

### Core Parameters

| Parameter | Scope | Default | Min | Max | Interval | Impact |
|---|---|---:|---:|---:|---:|---|
| `API_ALLOWED_HOSTS` | Edge | empty allowlist | n/a | n/a | n/a | Tighter host lists reduce SSRF risk and narrow outbound fetch scope. |
| `API_ALLOWED_ORIGINS` | Edge | current site origin only | n/a | n/a | n/a | Tighter origin rules reduce abuse and narrow cross-site request exposure. |
| `API_AUTH_SCHEME` | Shared | `Bearer` or provider-defined | n/a | n/a | n/a | Stable auth schemes reduce integration drift and preserve predictable request construction. |
| `API_BASE_URL` | Shared | provider-defined | n/a | n/a | n/a | Stable base URLs reduce routing ambiguity and preserve one upstream source of truth. |
| `API_PROXY_MODE` | Shared | `edge` for protected APIs | n/a | n/a | n/a | Edge mode reduces browser secret exposure and preserves server-managed credential handling. |
| `API_RESPONSE_MAX_BYTES` | Edge | `1048576` | `1024` | `10485760` | `1024` | Lower limits reduce abuse radius and bound oversized upstream payload handling. |
| `API_TIMEOUT_MS` | Edge | `10000` | `1000` | `60000` | `500` | Lower timeouts reduce hanging requests and bound provider latency impact. |
| `PROVIDER_API_KEY` | Secret | unset | n/a | n/a | n/a | Managed secrets enable authenticated requests without exposing long-lived credentials to clients. |
| `WEBHOOK_SIGNING_SECRET` | Secret | unset | n/a | n/a | n/a | Signing secrets reduce spoofed callbacks and preserve webhook authenticity checks. |

### Parameter Transformation Patterns

**API timeout -> From low timeout to high timeout**: Edge runtime -> aborts upstream waits earlier or later -> controls request patience -> affects resilience versus latency tolerance. Default: `10000`; Min: `1000`; Max: `60000`; Interval: `500`; Lower values reduce hanging calls, higher values tolerate slower providers.

**Response size cap -> From small payload allowance to large payload allowance**: Edge runtime -> truncates or rejects payloads sooner or later -> controls memory and abuse exposure -> affects compatibility with larger upstream responses. Default: `1048576`; Min: `1024`; Max: `10485760`; Interval: `1024`; Lower values reduce abuse radius, higher values tolerate richer payloads.

---

## Cloudflare Setup

### Variables And Secrets Procedure

1. Create the project in Cloudflare Pages if it is not already deployed.
2. Open the project settings for runtime configuration.
3. Add stable non-secret values as Variables.
4. Add all provider credentials as Secrets.
5. Keep preview and production keys separate by environment value.
6. Redeploy after updates.

### Recommended Separation

| Item | Storage | Reason |
|---|---|---|
| Base URL | Variable | Non-secret runtime routing value |
| Allowed hosts | Variable | Policy value that may differ by environment |
| Allowed origins | Variable | Policy value that may differ by environment |
| API key | Secret | Long-lived credential |
| Signing secret | Secret | Verification credential |
| Timeout | Variable | Operational tuning value |

### Hosted Guardrails

- Allowlist upstream hosts before enabling proxy-style fetch.
- Restrict methods to only the verbs the route needs.
- Return explicit error messages for missing bindings.
- Avoid reflecting upstream secrets or raw stack traces in responses.

---

## Validation Guidelines

### Structural Validation Checklist

- [ ] Variables exist for every non-secret runtime parameter.
- [ ] Secrets exist for every authenticated provider path.
- [ ] Browser code contains no embedded long-lived credential.
- [ ] Edge routes validate caller origin before protected fetch.
- [ ] Edge routes validate upstream host before outbound fetch.
- [ ] Timeout and payload caps are configured.
- [ ] Deployment is redeployed after secret changes.
- [ ] Setup steps are documented before route exposure.

### Zero-Hardcoding Audit Questions

- [ ] Does any committed file contain a live API key, bearer token, or signing secret?
- [ ] Does any browser bundle constant hold a provider credential?
- [ ] Does any proxy route accept arbitrary upstream hosts without allowlisting?
- [ ] Does any setup step depend on undocumented operator memory?

### Domain-Blindness Checks

- [ ] Can the same setup pattern support mapping, media, language, or webhook providers without code rewrites?
- [ ] Can a new provider be added by changing config, secrets, and route bindings rather than patching hardcoded branches?
- [ ] Can preview and production differ by Variables and Secrets only?

---

## Anti-Patterns

- **Committed credentials**: never commit live secrets to markdown, JSON, JavaScript, or shell history.
- **Client-side secret ownership**: never treat the browser as the owner of long-lived authenticated provider credentials.
- **Implicit runtime contracts**: never expose a route before its variables, secrets, timeout rules, and host rules are documented.
- **Open proxy behavior**: never forward arbitrary user-provided URLs without caller and upstream validation.
- **Scattered configuration**: never duplicate base URLs, host policies, or auth schemes across unrelated files.

---

## Role-Action-Outcome

- **Role: API Documenter**  
  -> Action: records API surfaces, variables, secrets, validation rules, and rollback expectations  
  -> Outcome: produces a repeatable setup guide with low operator ambiguity

- **Role: Operator**  
  -> Action: provisions variables, provisions secrets, validates deployment bindings, and verifies route behavior  
  -> Outcome: delivers a working hosted API setup without exposing long-lived credentials

- **Role: Runtime Maintainer**  
  -> Action: restores or implements edge handlers, validates hosts and origins, and bounds runtime behavior  
  -> Outcome: delivers controlled API mediation with reduced abuse exposure

- **Role: Reviewer**  
  -> Action: audits hardcoding risks, audits secret placement, checks validation coverage, and checks documentation completeness  
  -> Outcome: prevents undocumented or unsafe API setup changes from shipping

---

## Quick Start Checklist

- [ ] Complete local setup from `docs/setup-docs/setup-github.md`
- [ ] Decide whether each provider is `browser`, `edge`, or `deferred`
- [ ] Define `API_BASE_URL`, `API_AUTH_SCHEME`, `API_ALLOWED_HOSTS`, and `API_TIMEOUT_MS`
- [ ] Store long-lived credentials in Cloudflare Secrets
- [ ] Store non-secret routing and policy values in Cloudflare Variables
- [ ] Rebuild or redeploy after configuration changes
- [ ] Validate origin rules, host rules, timeout rules, and payload caps
- [ ] Record every exposed route and every required binding in documentation

---

## Notes

- This setup guide intentionally prefers configuration-first API setup because the current repository tree does not include checked-in API runtime handlers.
- If a Pages Functions layer is restored later, extend this document with concrete route contracts, request and response schemas, and per-route validation rules before public exposure.
- Use provider-specific documents such as `docs/GrabMaps-SKILL.md` for upstream semantics, and keep this file focused on setup, secrets, runtime policy, and deployment readiness.
