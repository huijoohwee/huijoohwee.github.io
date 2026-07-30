---
title: "Agentic SDLC Behavioral Conformance Runtime Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-07-30"
lang: "en-US"
frontmatter_contract: "required"
owner: "Conformance evaluator function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Agentic SDLC Behavioral Conformance Runtime Module

## Scope and Ownership

This module is universal, neutral, implementation-agnostic, and independently loadable. The main Agentic SDLC Guidelines own behavioral rules and finding names. This module owns the machine boundary that joins operation-derived evidence to deterministic stage verdicts and digest-bound receipts.

The runtime evaluates evidence; it does not manufacture it. A schema-valid assertion, prose report, screenshot, mutable label, or Implementer verdict is not operation-derived evidence. Evidence producers remain responsible for observing the operation they describe and binding its exact input, output, mechanism, actor role, and result.

## Policy Identity

One evaluation binds:

| Field | Contract |
|---|---|
| `policyRevision` | Immutable revision containing every normative module consumed by the evaluator |
| `policyDigest` | Digest of the exact ordered normative module bytes |
| `evaluatorRevision` | Immutable revision of the evaluator implementation |
| `evaluatorDigest` | Digest of the exact evaluator artifact |
| `schemaRevision` | Immutable revision of the evidence and receipt schemas |
| `schemaDigest` | Digest of the exact schema closure |

Normative modules are ordered by their declared module identity, encoded with their byte lengths, and hashed without path, clock, locale, or filesystem-enumeration input. The same bytes and identities must yield the same policy digest.

Policy, evaluator, and schema identities are resolved before evidence evaluation. Missing, mutable, dynamically selected, or mismatched identity fails closed. Resolution success grants no stage authority.

## Operation-Derived Evidence Envelope

Every evidence envelope has these required fields:

| Field | Contract |
|---|---|
| `schema` | Exact evidence-schema identity |
| `runId` | Stable identifier for one evaluated run |
| `requestedStage` | One stage from the ordered stage vocabulary |
| `evaluationTime` | Explicit input used for expiry decisions; never read implicitly from the evaluator clock |
| `policyIdentity` | Policy revision and digest |
| `evaluatorIdentity` | Evaluator revision, digest, and independent mechanism identity |
| `sourceIdentity` | Immutable source revision and complete dependency-closure digest |
| `operations` | Ordered operation records consumed by the requested stage and its predecessors |
| `predecessorReceipts` | Exact receipt identities required by the requested stage |

Each operation record contains:

| Field | Contract |
|---|---|
| `operationId` | Stable identifier within the run |
| `stage` | Stage that owns the operation |
| `mechanismId` | Evidence-producing mechanism |
| `actorRole` | Role that caused or observed the operation |
| `inputDigest` | Digest of the exact operation input |
| `resultDigest` | Digest of the complete surfaced result |
| `terminalResult` | Recorded exit, verdict, count, measurement, or state |
| `evidenceReferences` | VCC, check, artifact, receipt, or target identities proved by the result |

Unknown fields may be retained as metadata but cannot alter a verdict. An operation without a terminal result, exact input and result digests, or a permitted producer is absent evidence.

## Ordered Stage Vocabulary

Stages are strictly ordered:

```text
admission -> review -> integration -> runtime -> candidate -> authorization -> deployment -> publication
```

A requested stage consumes every required predecessor receipt. A later stage cannot repair, infer, waive, or replace missing predecessor proof.

| Stage | Required operation-derived evidence | Canonical stage output |
|---|---|---|
| `admission` | Baselined specification, VCC-to-task closure, bounded tasks, capability grants, current collaboration identity, dependency admission, and named evaluator | Admission Stage Receipt |
| `review` | Surfaced named checks and results, changed artifacts, budget consumption, state transitions, Evidence References, and an evaluator distinct from the Implementer | Review Stage Receipt |
| `integration` | Sealed input frontier, dependency order, overlap preservation, protected transition, exact integrated revision, and checks on that revision | Integration Stage Receipt joined to the Integration Receipt |
| `runtime` | Exact integrated revision, complete runtime dependency closure, controlled surface identity, probes, reviewer, and expiry | Runtime Stage Receipt joined to the Runtime Review Receipt |
| `candidate` | Runtime receipt, source, dependency, policy, target, artifact, manifest, and candidate identities from one build | Candidate Stage Receipt joined to the Candidate Manifest |
| `authorization` | Current runtime and candidate revalidation, exact challenge and response, authenticated human actor, target, expiry, and unconsumed authority | Authorization Stage Receipt joined to the Interaction and Human Authorization Receipts |
| `deployment` | Current authorization, one target-scoped controller, zero drift, and deployment of the already-built authorized bytes | Deployment Stage Receipt |
| `publication` | Deployed artifact identity, live probes, rollback target, exact publication identities, and unchanged candidate bytes | Publication Stage Receipt joined to the Live Verification and Publication Receipts |

## Digest-Bound Stage Receipt

Every stage emits one immutable receipt with:

| Field | Contract |
|---|---|
| `schema` | Exact receipt-schema identity |
| `runId` | Evidence-envelope run identity |
| `stage` | Evaluated stage |
| `verdict` | `verified` or `blocked` |
| `policyRevision` | Exact evaluated policy revision |
| `policyDigest` | Exact evaluated policy digest |
| `evaluatorRevision` | Exact evaluator revision |
| `evaluatorDigest` | Exact evaluator digest |
| `sourceRevision` | Exact evaluated source revision |
| `dependencyClosureDigest` | Complete evaluated dependency closure |
| `inputEvidenceDigest` | Digest of the normalized evidence consumed by this stage |
| `predecessorReceiptDigest` | Prior stage receipt digest; explicit not-applicable marker for admission only |
| `findingSetDigest` | Digest of the complete ordered finding set, including zero counts |
| `stageEvidenceDigest` | Digest of the canonical stage-specific receipt or manifest closure |
| `receiptDigest` | Digest of every preceding receipt field |

The receipt digest excludes transport metadata and is computed last. A receipt with an unknown field that affects behavior, a missing predecessor, a digest mismatch, or a stale identity is blocked.

## Predecessor Joins

- `admission` has no predecessor and records the explicit not-applicable marker
- `review` joins the Admission Stage Receipt
- `integration` joins the Review Stage Receipt
- `runtime` joins the Integration Stage Receipt
- `candidate` joins the Runtime Stage Receipt
- `authorization` joins the Candidate Stage Receipt
- `deployment` joins the Authorization Stage Receipt
- `publication` joins the Deployment Stage Receipt

Every join compares run, policy, evaluator, source, dependency closure, stage order, evidence digest, and predecessor receipt digest. Any mismatch invalidates the affected receipt and every descendant.

## Full-Stage Fail-Closed Invariants

- Admission blocks on an unbaselined specification, open blocker, uncovered VCC, ungrounded or unbounded task, unnamed evaluator, invalid dependency admission, stale collaboration fence, scope collision, or capability ambiguity
- Review blocks on self-grading, unsurfaced results, missing named checks, unenumerated changes, unrecorded consumption, invalid state transitions, absent reasons, missing Evidence References, or unresumable state
- Integration blocks on cyclic or premature order, stale frontier, duplicate reintegration, unpreserved overlapping work, bypassed protection, missing exact-revision checks, or absent runtime convergence
- Runtime blocks unless the exact integrated source, dependency closure, controlled surface, review identity, named probes, results, and expiry join
- Candidate blocks on mutable identity, unresolved dependency, missing runtime receipt, multiple builds, missing artifact or manifest digest, or a candidate older than the sealed frontier
- Authorization blocks on inferred or simulated approval, stale runtime proof, missing interaction evidence, actor, candidate, target, or challenge mismatch, expiry, replay, or previously consumed authority
- Deployment blocks on multiple controllers, drift, rebuild, re-resolution, retargeting, source advancement, mismatched bytes, or authority consumption by another attempt
- Publication blocks without exact live runtime identity, passing probes, rollback identity, unchanged authorized bytes, Live Verification Receipt, and exact publication closure

One green stage never promotes another. Source validation, task review, protected integration, canonical runtime, authorization, deployment, and publication remain separate claims.

## Deterministic Evaluation

The evaluator:

1. validates the policy, schema, evaluator, source, and dependency identities;
2. normalizes records by stable identity and rejects duplicates;
3. validates the evidence envelope without discarding malformed members;
4. evaluates the requested stage and every predecessor in stage order;
5. emits typed findings using the main guideline vocabulary;
6. deduplicates and orders findings by severity, Finding Type, Rule ID, and artifact reference;
7. emits a zero count for every checked Finding Type;
8. serializes the finding set and receipt canonically; and
9. emits the same verdict and digest for byte-identical input and configuration.

Clock reads, randomness, mutable environment discovery, network-selected versions, filesystem enumeration order, locale-dependent comparison, and unchecked adapter defaults cannot affect semantic output. The explicit evaluation time is input evidence and participates in the evidence digest.

Malformed or incomplete evidence produces typed findings and a `blocked` receipt when policy identity and the failure envelope remain available. An internal evaluator failure never produces a verified or blocked domain verdict.

## Verdict and Exit Semantics

| Exit | Meaning |
|---|---|
| `0` | Requested stage and every predecessor evaluated to `verified`; a verified digest-bound receipt was emitted |
| `1` | Evaluation completed and emitted a `blocked` receipt with typed findings |
| `2` | Evaluator, configuration, schema implementation, or output validation failed; no domain verdict exists |
| `3` | Exact policy, evaluator, schema, source, or dependency identity was unavailable or mismatched |

Warnings and advisory findings do not change a verdict unless the policy maps them to the requested gate. Unknown Finding Types, omitted checked-type counts, and outputs that fail their own schema are evaluator failures.

## Partial-Scope Claim Boundary

A conforming adapter declares `enforcedStages` and `unevaluatedStages`. It may claim only the exact highest contiguous verified stage represented by its predecessor chain.

Audit-only evaluation, a subset of stages, fixture replay, source-contract validation, or a locally valid receipt is a partial-scope claim. It cannot claim end-to-end conformance, runtime readiness for an unevaluated runtime, authorization, release readiness, deployment, publication, or production verification.

`runtime-ready` requires verified receipts through `runtime` for one exact source and dependency closure. End-to-end release conformance requires verified receipts through `publication`. Missing adapters or unavailable operations remain explicitly unevaluated and fail closed when a broader claim is requested.

## Reference Implementation Authority Exclusions

Repository-owned commands and protected controllers may adapt this contract, but invocation convenience never creates authority. `npx`, a mutable `latest` selector, registry fallback, runtime package download, or any other dynamic resolution may run an optional diagnostic only; none may establish policy identity, replace the repository-owned evaluator, satisfy a stage gate, or emit an authoritative receipt.

The authoritative evaluator and schemas are resolved from one immutable repository revision before the run. Any resolution drift requires a new evaluation and receipt chain.

## Verification Checklist

- [ ] Main guideline, this module, evaluator, and schemas bind exact immutable revisions and digests
- [ ] Every stage consumes operation-derived evidence and the exact predecessor receipt
- [ ] Every receipt binds policy, evaluator, source, dependency closure, evidence, findings, and predecessor digests
- [ ] Byte-identical inputs produce identical findings, verdicts, and receipt digests
- [ ] Every missing, malformed, stale, unknown, replayed, or mismatched required field fails closed
- [ ] Partial-scope outputs enumerate unevaluated stages and make no broader readiness claim
- [ ] Dynamic package or version resolution creates no policy, gate, or release authority
- [ ] Rungs and lifecycle status remain evidence-derived and are not promoted by this specification alone
