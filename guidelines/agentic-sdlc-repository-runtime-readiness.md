---
title: "Agentic SDLC Repository Runtime Readiness"
doc_type: "Guideline Module"
version: "1.0.0"
date: "2026-07-30"
lang: "en-US"
frontmatter_contract: "required"
owner: "Evaluator function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Repository Runtime Readiness

## Purpose

This module turns one immutable local repository revision into a bounded readiness assessment for a solo operator using AI-native execution. It optimizes minimum-viable maximum-value, time-to-value, total cost of ownership, token economics, local and offline capability, mobile browser usability, and FOSS substitution without confusing source inspection with runtime proof.

It extends the parent guideline's `runtime-readiness-enforcement` module. The parent finding vocabulary, Evidence Reference, independence rule, budgets, collaboration fence, and release boundary remain authoritative.

## Invocation Contract

The neutral invocation is:

```text
/runtime-ready.check #runtime-ready #harness #vcc #foss #ttv @repository-root @local-harness @runtime-proof
```

- `/runtime-ready.check` selects the deterministic readiness evaluator
- `#runtime-ready` requires layer-specific proof rather than a prose status
- `#harness` requires a repository-owned, bounded execution path
- `#vcc` binds each result to an observable completion condition
- `#foss` requires a local or open substitute before paid or proprietary adoption
- `#ttv` limits the first closure to the smallest high-value proof set
- `@repository-root` binds one exact local Git worktree
- `@local-harness` binds repository-owned checks and production-like local start commands
- `@runtime-proof` carries recorded command results, measurements, and receipt digests

No token grants mutation, network egress, provider spend, integration, release, or deployment authority.

## Clean-Room Reference Boundary

An external repository may supply observable constraints and failure examples only. Record its source locator, exact revision, inspection time, license, and the neutral capability or risk learned from it.

Forbid copying external code, prose, prompts, schemas, tests, fixtures, examples, configuration, dependency lists, command layouts, generated content, or repository structure. Removing network access and the external repository must leave this module, its evaluator, its tests, and its output grammar unchanged. Similarity and provenance review remain separate human obligations.

## Immutable Audit Input

The evaluator receives:

| Field | Requirement |
|---|---|
| Repository identity | Canonical local Git worktree root and exact commit SHA |
| Working state | Clean tracked and untracked counts, with owned non-canonical work reported separately |
| Runtime identity | Declared runtime family and version source |
| Dependency identity | One package manager or equivalent installer, one lock graph, and immutable resolution mode |
| Command graph | Install, generate, build, test, production-like start, smoke, and teardown commands |
| Configuration inventory | Environment-variable names classified by build-time, runtime, public, secret, optional, and required use |
| External inputs | Remote content, generated inputs, databases, caches, queues, scheduled jobs, chains, providers, and hosted services |
| Surface inventory | Server, API, browser, mobile, offline, storage, worker, and scheduled surfaces that actually exist |
| Policy identity | Exact evaluator revision, policy revision, limits, and selected readiness layer |
| Budget | File, byte, command, retry, wall-clock, token, cache, and monetary bounds |

Missing identity does not trigger discovery by mutable remote reference. It returns `runtime-readiness-unproven`.

## Bounded Discovery

Discovery is read-only and stops at declared caps.

- Enumerate tracked text files from the exact worktree without following escaping symlinks
- Read metadata before content; skip binaries and files above the per-file cap
- Stop at the total file and byte caps, report omissions, and refuse a complete-repository claim after truncation
- Read environment-variable names and classification only; never print values
- Inspect commands as data; do not run install, generation, build, browser, provider, testnet, release, or deploy actions during discovery
- Detect dynamically resolved tools, mutable selectors, foreign package-manager commands, hidden network generators, and install-time mutation as risks rather than executing them
- Emit exact zero model calls, zero provider calls, zero paid calls, and zero deployment actions for the discovery stage

## Readiness Layers

Each layer is independent and monotonic only while its exact inputs remain unchanged.

| Layer | Required evidence | What it cannot claim |
|---|---|---|
| Source admitted | Exact clean revision, bounded complete scan, runtime and dependency identity, configuration inventory, command graph, and source policy pass | A build ran |
| Local harness ready | Immutable install, generated-input closure, build, production-like start, health/readiness probe, deterministic teardown, and cost record pass on the same revision | Browser behavior or protected integration |
| Browser ready | Local harness receipt joins responsive desktop and mobile browser smoke, offline or degraded-network behavior, accessibility, and performance budgets | Protected integration or public behavior |
| Integration ready | Protected checks reproduce the local command graph, verify an immutable artifact, and join browser evidence for the exact head | Deployment |
| Deployed verified | One authorized immutable artifact starts at the target and passes health, critical browser, rollback, and public identity probes | Any later revision or environment |

A green later layer never repairs a missing earlier receipt. Any revision, lock graph, generated input, environment contract, policy, budget, artifact, target, or external dependency drift invalidates the affected layer and every dependent layer.

## Minimum-Viable Maximum-Value Closure

The first useful closure is deliberately small.

### Must

- Pin the runtime and use one package manager or equivalent installer consistently across docs, scripts, hooks, CI, and production start
- Resolve dependencies immutably from one lock graph and prove a warm-cache or local-mirror path before calling the repository offline-capable
- Separate install, networked generation, build, and start; installation must not silently refresh mutable external inputs
- Content-address every generated or downloaded input and retain a declared stale-but-safe fallback where the product can operate without refresh
- Provide a checked configuration contract containing names, classification, validation, and safe failure behavior without secret values
- Run the production build in protected checks and start the same artifact locally without rebuilding it
- Provide a cheap health probe for process readiness and a deeper dependency probe that cannot leak credentials
- Run deterministic critical-path browser smoke on every candidate, including one narrow mobile viewport
- Exercise declared offline or degraded-network behavior; a responsive layout alone is not offline proof
- Record install, build, start, browser, cache, token, external-call, and monetary cost against explicit budgets
- Keep source, local runtime, browser, integration, and deployed claims separate

### Should

- Cache immutable dependency and generated-input artifacts by digest with explicit invalidation
- Measure bundle or payload growth, critical-path latency, memory, and cold-start cost against repository-owned thresholds
- Substitute local fixtures, emulators, or read-only snapshots for paid services in default development
- Run live-provider, public-chain, or other spend-bearing probes only as a separately labelled optional tier with an Operator budget
- Produce one portable artifact manifest that joins source, dependency, generated-input, build, and policy digests

### Could

- Add broader browsers, devices, accessibility paths, and long-running scenarios after the critical path is stable
- Add remote cache or hosted preview adapters only when measured time-to-value exceeds their lifecycle and egress cost
- Add live external-system tests after deterministic substitutes have isolated product failures from provider failures

### Won't in the first closure

- Provision always-on coordination infrastructure for one operator
- Treat a hosted preview, merge label, deploy event, or optional live test as local runtime proof
- Require a model call to inspect, score, or join deterministic repository evidence
- Promise full offline behavior for server, database, scheduled, or remote-content features that still require a network

## Zero-Infrastructure and Offline Decision

`zero-infrastructure` is a deployment choice, not a slogan.

1. Inventory every request-time server route, database, cache, queue, scheduled job, secret-bearing integration, mutable remote source, and runtime image transform.
2. If none are required for the selected critical path, prefer a static or local artifact with browser-owned state.
3. If any remain, name the minimum runtime owner and its lifecycle cost. Do not call the path zero-infrastructure.
4. Provide deterministic local substitutes for development where feasible, but label substitute proof separately from the real dependency.
5. Define offline behavior per capability: `available`, `read-only-snapshot`, `queued`, `degraded`, or `blocked`.
6. Reconcile queued work by stable idempotency key and bounded retry after connectivity returns.

## Browser and Mobile Contract

- Use one production-like local origin and the same immutable artifact exercised by the local harness receipt
- Test the smallest critical path at desktop and narrow mobile widths with touch-safe targets, keyboard access, no horizontal overflow, and bounded hydration
- Test an actual offline or degraded-network transition, then recovery, without erasing unsynchronized local work
- Measure first useful render, interaction readiness, route payload, and client JavaScript against explicit budgets
- Keep screenshots diagnostic; selectors, state transitions, network outcomes, and recorded measurements establish proof
- Treat third-party authentication, wallet, analytics, RPC, or content availability as external dependencies with typed fallback states

## AI-Native Harness and Token Economics

The evaluator and default harness are model-free. AI may recommend work only after deterministic discovery emits a compact evidence packet.

- Cache stable repository metadata and policy prefixes by source and policy digest
- Load only the failed obligation, its evidence, and the owning module into model context
- Cap recommendation count and require each recommendation to name its blocking obligation, smallest change, expected value, and proof command
- Record prompt, cached, completion, and total tokens separately when a model is explicitly approved
- Prefer a deterministic fix or FOSS local tool when it closes the same obligation
- Stop after two no-progress attempts on the same named check and return the root blocker

## Deterministic Evaluation

The evaluator emits:

- exact source and policy identities
- bounded-scan counts and omissions
- one evidence record per obligation
- layer verdicts with `ready`, `blocked`, or `unverified`
- parent-vocabulary findings with stable reason codes
- zero-cost discovery evidence
- the smallest ordered recommendation set
- unchanged mutation, integration, release, and deployment boundaries

Stable reason codes include `package-manager-drift`, `runtime-version-unpinned`, `mutable-generation-input`, `configuration-contract-missing`, `health-contract-missing`, `protected-build-missing`, `candidate-browser-smoke-missing`, `mobile-browser-proof-missing`, `offline-proof-missing`, `cost-budget-missing`, and `deployment-proof-unjoined`.

Map every reason to the parent finding vocabulary. Identity, missing gate, or missing join maps to `runtime-readiness-unproven`; changed dependency or generated input maps to `dependency-closure-drift`; missing executable behavior maps to `unproven-property`; absent recorded output maps to `unsurfaced-result`; and absent cost evidence maps to `unrecorded-consumption`.

The command exits zero only for the requested layer. A source-admission pass cannot exit zero for local, browser, integration, or deployed readiness.

## VCC

Given one exact local Git worktree, policy revision, requested layer, and bounded audit budget, when the repository readiness evaluator runs, then it performs no mutation, network, model, paid, integration, release, or deployment action; emits a complete secret-free evidence packet; fails closed on truncation or missing proof; separates all readiness layers; returns stable findings and minimum-value recommendations; and exits zero only when every obligation for the requested layer joins to the same source, dependency, generated-input, policy, artifact, and predecessor identities.
