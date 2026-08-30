---
title: "Agentic SDLC YAML Frontmatter Runtime Guidelines"
doc_type: "Guidelines Module"
schema: "agentic-sdlc-yaml-frontmatter-runtime/v1"
version: "1.0.0"
date: "2026-08-30"
lang: "en-US"
frontmatter_contract: "required"
owner: "Conformance evaluator function"
lane: "authoring"
local_rung: "spec-complete"
delivered_rung: "undocumented"
universal_scope: "true"
provider_neutral: "true"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
runtime_scope: "frontmatter key contract for every authored artifact in an enrolled corpus"
runtime_claim: "declares and enforces frontmatter identity, accountability, and evidence keys; grants no readiness, integration, or deployment authority"
runtime_proof: "agentic-canvas-os/__tests__/frontmatter-runtime-contract.test.mjs"
evaluator: "npm run frontmatter-runtime:check"
publish_policy: "Dev-only; no protected integration, Production, publication, or deployment authority"
---

# YAML Frontmatter Runtime Contract

Frontmatter is the only machine-readable surface every authored artifact shares. The Agnosticity rule evaluates rules "from document content and parsed frontmatter only," so a key that is absent, ambiguous, or spelled differently in each corpus is not a style problem: it is an unreadable contract.

This module unifies that surface. It is bidirectional by necessity — neither existing vocabulary is complete.

## Measured Divergence

Two corpora, 295 authored artifacts, surveyed 2026-08-30.

| Key | `agentic-canvas-os/docs` (158) | `guidelines` (137) | Expresses |
|---|---:|---:|---|
| `title`, `date`, `lang`, `doc_type`, `frontmatter_contract` | 158 | 100-111 | Identity |
| `schema` | 158 | 6 | Machine identity |
| `graphId` | 158 | 3 | Stable address |
| `status` | 158 | 5 | Local readiness |
| `version` | 1 | 100 | Immutable revision |
| `owner` | 6 | 91 | Accountability |
| `local_rung` / `delivered_rung` | 1 / 4 | 91 / 91 | Separated readiness |
| `lane` | 1 | 91 | Deploy boundary |
| `runtime_proof` | 139 | 0 | Evidence pointer |
| `runtime_scope` / `runtime_claim` | 108 / 102 | 0 / 0 | Claim bounds |
| `publish_policy` | 109 | 1 | Authority ceiling |
| `evaluator` | 2 | 0 | Independent mechanism |

Only five keys are shared. Beyond them the corpora are disjoint: one records **evidence** and no accountability, the other records **accountability** and no evidence. Each is missing exactly what the other has, so unification adds keys to both and renames nothing that carries weight.

## Tiers and Applicability

An artifact adopts a tier because of what it claims, not where it lives.

| Tier | Keys | Applies to |
|---|---|---|
| 1 Identity | `title`, `doc_type`, `date`, `lang`, `frontmatter_contract` | Every authored artifact |
| 2 Address | `schema`, `version` | Every artifact a machine resolves, digests, or pins |
| 3 Accountability | `owner`, `local_rung`, `delivered_rung`, `lane`, `runtime_readiness_policy` | Every artifact whose state gates work |
| 4 Evidence | `runtime_proof`, `evaluator`, `runtime_scope`, `runtime_claim` | Every artifact claiming any readiness above `draft` |
| 5 Boundary | `publish_policy` | Every artifact whose subject can reach a delivered surface |

Tier 4 is the tier that makes a readiness claim legible. An artifact that names a rung without naming its proof and its evaluating mechanism has asserted a conclusion and withheld its basis.

## Key Contract

| Key | Contract |
|---|---|
| `title` | Human-readable subject; never a file path. |
| `doc_type` | Artifact class from the corpus vocabulary. |
| `date` | `YYYY-MM-DD`, last substantive authoring. |
| `lang` | BCP-47 tag. |
| `frontmatter_contract` | `required` where these rules bind; `optional` only for an explicitly exempt class. |
| `schema` | `<slug>/v<major>`, stable while the artifact's contract is unchanged. Its stem matches `graphId` where both exist. |
| `version` | Semantic version of this artifact, advanced on every substantive change. Policy digests pin it, so a stale `version` invalidates every digest that bound it. |
| `graphId` | `md:<slug>` stable address. Required where a graph, canvas, or index resolves the artifact by identity. |
| `owner` | The function accountable for the artifact, named by role, never by person or vendor. |
| `local_rung` | Readiness of this artifact in its own lane. |
| `delivered_rung` | Readiness at the delivered surface. **Never equal to `local_rung` by default and never omitted when `local_rung` is set**; a single conflated status is the defect this pair exists to prevent. |
| `lane` | Current lane; the Deploy Boundary reads it and never infers it. |
| `runtime_readiness_policy` | `fail-closed` unless an explicit, versioned, auditable exception names its alternate boundary. |
| `runtime_scope` | Exactly what the artifact governs, bounded. |
| `runtime_claim` | Exactly what it asserts and, explicitly, what it does not. |
| `runtime_proof` | Pointer to the recorded evidence: test path, receipt, or proof ledger. Canonical spelling; `proof` is a permitted short form only where a declared byte budget makes the canonical key infeasible, and the artifact declares that budget. |
| `evaluator` | The exactly-invocable mechanism that judges this artifact, distinct from whoever authored it. |
| `publish_policy` | The authority ceiling, stated as what is *not* granted. |
| `status` | Where a corpus already requires it, `status` **is** `local_rung` and carries no other meaning. Declaring both requires them to agree. |

### Reference Shape

`agentic-canvas-os/docs/SYSTEM-PROMPT-RUNTIME.md` is the reference: it carries the identity keys of one corpus, the accountability keys of the other, and the evidence keys of both, inside a declared 1000-byte budget. It demonstrates that unification costs bytes, not concepts.

## Directives

- Populate every tier the artifact's own claims trigger; a missing triggered key is a `frontmatter-key-absent` finding, and a Tier 4 key absent from an artifact claiming readiness above `draft` escalates to `runtime-readiness-unproven`
- Keep `local_rung` and `delivered_rung` separate always; collapsing readiness into one field is a `rung-conflated` finding, because it lets a green local lane read as a delivered claim
- Name the evaluating mechanism in `evaluator` before the artifact claims any rung; an unnamed evaluator is `unnamed-evaluator` at `blocker` severity under the Independence Rule
- Express the same concept with the same key across every enrolled corpus; a second spelling for a key another corpus already owns is a `frontmatter-vocabulary-divergent` finding and is resolved by adopting the existing spelling, never by adding an alias
- Advance `version` on every substantive change, and treat a digest pinned to a stale `version` as invalid rather than merely outdated
- Enforce this contract with a deterministic check that exits non-zero on violation; frontmatter rules that no check reads are guidance, not rules, and must be labelled as such
- Migrate an existing corpus by ratchet, never by sweep: record current conformance, require every new and every touched artifact to satisfy its triggered tiers, and forbid regression. A 295-artifact rewrite is an unreviewable change that no evaluator can meaningfully judge
- Forbid machine-specific paths, credentials, provider identity, personal names, and generated runtime values in every key

## Enforcement

The check reads each artifact's frontmatter, derives its triggered tiers from its own declared claims, and reports per-artifact findings plus a corpus conformance ratio. It runs with zero model calls, zero network access, and no mutation.

Reference implementation: `agentic-canvas-os/scripts/frontmatter-runtime-contract.mjs`, wired into that repository's `docs:check` and exposed as `npm run frontmatter-runtime:check`. Adapters may replace it; the tier derivation, finding names, and non-regression ratchet are the contract.

## Findings

| Rule family | Finding Type | Severity |
|---|---|---|
| Frontmatter | `frontmatter-key-absent` | `major` |
| Frontmatter | `rung-conflated` | `major` |
| Frontmatter | `frontmatter-vocabulary-divergent` | `minor` |

Runtime-readiness and evaluator-independence violations reuse `runtime-readiness-unproven` and `unnamed-evaluator` from the main set's enumeration; this module defines no parallel vocabulary.

## Validation Checklist

- [ ] Every artifact satisfies Tier 1
- [ ] Every machine-resolved artifact declares `schema` and a current `version`
- [ ] Every state-gating artifact declares `owner`, `lane`, and separated rungs
- [ ] Every artifact above `draft` declares `runtime_proof` and `evaluator`
- [ ] Every artifact whose subject can reach a delivered surface declares `publish_policy`
- [ ] `runtime_readiness_policy` is `fail-closed` or names a versioned, auditable exception
- [ ] One key per concept across every enrolled corpus; no aliases introduced
- [ ] A deterministic check enforces the above and its baseline is non-increasing
- [ ] No key carries a machine path, credential, provider identity, personal name, or generated value

## VCC

Given two or more enrolled corpora and their authored artifacts, when the frontmatter contract is evaluated, then every artifact's triggered tiers are derived from its own declared claims; every absent triggered key raises a typed finding; conflated readiness, unnamed evaluators, and divergent spellings for one concept each raise their exact finding; the corpus conformance ratio is reported with per-artifact detail; the check performs no mutation, network, or model call and exits non-zero on any violation; and migration proceeds by non-regressing ratchet so no readiness claim is ever promoted by this specification alone.
