---
title: "Agentic SDLC YAML Frontmatter Runtime Guidelines"
doc_type: "Guidelines Module"
schema: "agentic-sdlc-yaml-frontmatter-runtime/v1"
version: "1.1.0"
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
runtime_proof: "agentic-canvas-os/__tests__/frontmatter-dictionary-projection.test.mjs"
evaluator: "npm run frontmatter-dictionary:check"
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

An artifact adopts a tier because of what it claims, not where it lives. Five tiers exist: **Identity** (every artifact), **Address** (every artifact a machine resolves, digests, or pins), **Accountability** (every artifact whose state gates work), **Evidence** (every artifact claiming readiness above `draft`), and **Boundary** (every artifact whose subject can reach a delivered surface).

Evidence is the tier that makes a readiness claim legible. An artifact that names a rung without naming its proof and its evaluating mechanism has asserted a conclusion and withheld its basis.

## Where the Vocabulary Lives

This module owns the **rules**: why a key exists, when a tier binds, and what a violation means. It deliberately does **not** enumerate the keys.

Tier membership, per-key contracts, substitute spellings, enforcement levels, and forbidden value patterns are data, and data belongs in one machine-readable place that the checker reads directly:

| Party | Owns |
|---|---|
| This module | Rules, directives, finding names, severities |
| `agentic-canvas-os/docs/schemas/frontmatter-runtime-dictionary.v1.json` | Which keys exist, their tier, enforcement level, substitutes, forbidden values |
| `agentic-canvas-os/scripts/frontmatter-runtime-contract.mjs` | Tier derivation, findings, the non-regressing ratchet |

The dictionary previously existed three times: as frozen arrays in the validator, as a tier table here, and as a key contract table beside it. The three had already diverged — this module named five keys in Tier 3 and Tier 4 that the validator never gated — and no check could see it, because prose is not a checkable surface. The enumeration is now single-sourced, the validator holds no key list of its own and fails closed on an absent or unpinned dictionary, and a human-browsable view is a generated, digest-fenced projection at `agentic-canvas-os/docs/DICTIONARY-FRONTMATTER.md`.

### Enforcement Levels

Every dictionary key declares one:

- `required` — a checker gates it; absent from a triggered tier it raises its finding and exits non-zero
- `recommended` — documented and reserved, not yet gated

The level is recorded rather than implied, because an unrecorded level is how a specification comes to promise enforcement that no check performs. Promotion from `recommended` to `required` is a ratchet step with its own recorded baseline, never a prose edit.

### Reference Shape

`agentic-canvas-os/docs/SYSTEM-PROMPT-RUNTIME.md` is the reference: it carries the identity keys of one corpus, the accountability keys of the other, and the evidence keys of both, inside a declared 1000-byte budget. It demonstrates that unification costs bytes, not concepts.

## Directives

- Populate every tier the artifact's own claims trigger; a missing triggered key is a `frontmatter-key-absent` finding, and a Tier 4 key absent from an artifact claiming readiness above `draft` escalates to `runtime-readiness-unproven`
- Keep `local_rung` and `delivered_rung` separate always; collapsing readiness into one field is a `rung-conflated` finding, because it lets a green local lane read as a delivered claim
- Name the evaluating mechanism in `evaluator` before the artifact claims any rung; an unnamed evaluator is `unnamed-evaluator` at `blocker` severity under the Independence Rule
- Express the same concept with the same key across every enrolled corpus; a second spelling for a key another corpus already owns is a `frontmatter-vocabulary-divergent` finding and is resolved by adopting the existing spelling, never by adding an alias
- Enumerate the keys in exactly one machine-readable dictionary that the checker reads at load time; a key list restated as frozen constants in code, or as a table in prose, is a second source and is itself a `frontmatter-vocabulary-divergent` finding regardless of whether the copies currently agree
- Declare an enforcement level on every key, and treat a rule that names a key no checker gates as guidance until the level says otherwise; prose that implies enforcement it cannot demonstrate is the defect the level exists to expose
- Render any human-readable view of the dictionary as a generated, digest-fenced projection whose staleness a check reports; a hand-maintained second table is the drift, not a convenience
- Fail closed on a dictionary that is absent, unreadable, or not pinned to the schema the checker accepts; falling back to a built-in vocabulary silently restores the divergence single-sourcing removed
- Advance `version` on every substantive change, and treat a digest pinned to a stale `version` as invalid rather than merely outdated
- Enforce this contract with a deterministic check that exits non-zero on violation; frontmatter rules that no check reads are guidance, not rules, and must be labelled as such
- Migrate an existing corpus by ratchet, never by sweep: record current conformance, require every new and every touched artifact to satisfy its triggered tiers, and forbid regression. A 295-artifact rewrite is an unreviewable change that no evaluator can meaningfully judge
- Forbid machine-specific paths, credentials, provider identity, personal names, and generated runtime values in every key

## Enforcement

The check loads the dictionary, reads each artifact's frontmatter, derives its triggered tiers from the artifact's own declared claims, and reports per-artifact findings plus a corpus conformance ratio. It runs with zero model calls, zero network access, and no mutation.

Reference implementation: `agentic-canvas-os/scripts/frontmatter-runtime-contract.mjs`, wired into that repository's `docs:check` and exposed as `npm run frontmatter-runtime:check`. The projection checker is `npm run frontmatter-dictionary:check`. Adapters may replace either; the dictionary as single source, the tier derivation, the finding names, and the non-regression ratchet are the contract.

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
- [ ] The key enumeration exists in exactly one machine-readable dictionary, and no code or prose restates it
- [ ] Every key declares `required` or `recommended`, and no rule implies enforcement above its declared level
- [ ] Every human-readable view of the dictionary is generated, digest-fenced, and staleness-checked
- [ ] The checker fails closed on an absent, unreadable, or unpinned dictionary
- [ ] A deterministic check enforces the above and its baseline is non-increasing
- [ ] No key carries a machine path, credential, provider identity, personal name, or generated value

## VCC

Given two or more enrolled corpora and their authored artifacts, when the frontmatter contract is evaluated, then the key enumeration is read from exactly one machine-readable dictionary and the checker fails closed if that dictionary is absent, unreadable, or unpinned; every key carries a declared enforcement level and only `required` keys gate; every artifact's triggered tiers are derived from its own declared claims; every absent triggered key raises a typed finding; conflated readiness, unnamed evaluators, and divergent spellings for one concept each raise their exact finding; every human-readable view of the dictionary is a digest-fenced projection whose staleness the check reports; the corpus conformance ratio is reported with per-artifact detail; the check performs no mutation, network, or model call and exits non-zero on any violation; and migration proceeds by non-regressing ratchet so no readiness claim is ever promoted by this specification alone.
