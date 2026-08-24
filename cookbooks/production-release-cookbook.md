---
title: "Production Release Cookbook"
doc_type: "Operational Cookbook"
version: "1.0.0"
date: "2026-08-21"
lang: "en-US"
frontmatter_contract: "required"
universal_scope: "true"
runtime_readiness_policy: "fail-closed"
release_authority: "target-scoped protected delivery controller"
configuration_policy: "automated-discovery-with-provenance"
---

# Production Release Cookbook

## Module Index

- purpose-and-boundary
- operating-principles
- immutable-release-request
- configuration-contract
- external-contract-intake
- automated-configuration-resolution
- secret-safe-automation-rules
- bootstrap-gate
- candidate-authorization-and-deployment-gates
- adaptive-evidence-profile
- failure-and-recovery
- evidence-and-audit-record
- automation-conformance-checklist

## Purpose and Boundary

This cookbook defines a portable automated path from an independently verified
candidate to a production release. It applies to every domain, source-control
host, deployment platform, secret store, and external provider. Concrete
platforms are replaceable adapters, never part of the protocol.

The cookbook does not authorize a release. A target-scoped protected delivery
controller alone may deploy, reconcile, publish, or roll back. Automation may
never invent a credential, provider contract, bootstrap state, approval, or
success receipt.

## Operating Principles

| Principle | Operational rule |
|---|---|
| Universal | Represent targets, providers, and credentials as typed inputs; do not encode a product, vendor, account, domain, or local path. |
| Neutral | Name mechanisms by function: source adapter, secret adapter, deployment adapter, evaluator. |
| Agnostic | Keep gate semantics independent from adapter implementation; adapters provide observations and mutations only. |
| Adaptive | Scale discovery breadth and evidence depth to the target risk profile; never omit a required receipt. |
| Modular | Give each stage one owner, typed inputs, and typed outputs so adapters can be replaced independently. |
| Fail-closed | Missing, ambiguous, expired, malformed, sentinel, or unproven input produces blocked with no deployment-side mutation. |

## Immutable Release Request

The controller accepts one immutable request:

~~~
release_request:
  target: <target-identifier>
  candidate:
    source_revision: <immutable-revision>
    source_tree_digest: <digest>
    integration_receipt: <verified-receipt>
    local_review_receipt: <exact-candidate-receipt>
  configuration_contract:
    revision: <contract-revision>
    variables: [<typed-public-name>]
    secrets: [<typed-secret-name>]
    bootstrap_receipt_schema: <schema-id>
  adapters:
    source: <source-adapter-id>
    configuration: <configuration-adapter-id>
    secret: <secret-adapter-id>
    infrastructure: <infrastructure-adapter-id>
    deployment: <deployment-adapter-id>
    verification: <verification-adapter-id>
  authorization:
    policy_revision: <policy-revision>
    required: true
~~~

Every identifier must be concrete and every referenced artifact immutable. The
candidate must still equal the target's protected canonical frontier. A newer
frontier invalidates the request; it must never be retargeted.

## Configuration Contract

Configuration names are an interface, not a location. Each entry declares its
type, resolver, validator, consumer, and redaction rule.

~~~
configuration_entry:
  name: <stable-name>
  kind: variable | secret | structured-secret
  resolver: generated | source-copy | external-contract | infrastructure-observation
  owner: <functional-owner>
  validator: <deterministic-validator-id>
  consumers: [<deployment-unit-id>]
  redaction: public | hash-only | never-display
  rotation: immutable | renewable | operator-rotation
~~~

External-contract means a real independently operated service supplies the
value. It is never satisfied by examples, tests, defaults, a guessed endpoint,
or an unrelated deployed service.

## External Contract Intake

An operator supplies external-contract metadata, not secret plaintext, through
the approved secure-input adapter. The adapter records provenance and writes a
secret directly to its declared target without presenting it in a chat, ticket,
log, source file, or release record.

~~~
external_contract_intake:
  contract_id: <stable-provider-contract-id>
  service_role: inventory | experience | issuance | other
  issuer: <legal-or-operational-provider-identity>
  endpoint_origin: <credential-free-https-origin>
  endpoint_paths: <declared-contract-paths>
  credential_reference: <secure-adapter-reference>
  route_or_capability_catalogue: <validated-structured-input>
  issued_at: <utc-instant>
  expires_at: <utc-instant-or-null>
  owner: <functional-owner>
~~~

The input adapter must verify that the issuer, endpoint, credential, and
catalogue belong to the same declared contract. It returns only a redacted
intake receipt. The configuration adapter then resolves the referenced values
and performs its normal validation; an intake receipt alone does not populate
or authorize a target.

Values derived from target infrastructure are not external-contract input:
resource locators, binding maps, bootstrap receipts, rollback identities, and
deployment receipts are generated by their owning controlled workflow after
the prerequisite infrastructure exists.

## Automated Configuration Resolution

For each required entry, the configuration adapter performs this sequence:

1. Inventory the target by name, type, version, and update time. Do not read or print secret values.
2. Resolve approved sources in declared order: target scope, repository scope,
   organization scope, machine secret adapter, infrastructure secret adapter,
   then external-contract adapter.
3. Bind a candidate to its source identity, version, resolver class, and
   permitted value digest.
4. Run its deterministic validator before staging. Parse and schema-check
   structured values; validate endpoints against declared transport and
   identity constraints.
5. Stage only validated non-sentinel values. Keep current values intact until
   the complete staged configuration validates as a whole.
6. Apply atomically when supported; otherwise use an adapter-provided
   compensating transaction and emit before/after inventory digests.
7. Re-inventory and verify the exact names, types, versions, and permitted
   non-secret value digests.

The result is resolved, blocked, or failed:

~~~
configuration_resolution:
  status: resolved | blocked | failed
  contract_revision: <revision>
  target_inventory_digest: <digest>
  resolved: [<name-and-provenance>]
  unresolved: [<name-and-typed-reason>]
  mutation_receipt: <receipt-or-null>
~~~

Blocked means an authoritative contract, credential, or bootstrap state is
absent. Failed means an adapter operation or deterministic validator failed.
Neither state permits a deployment attempt.

## Secret-Safe Automation Rules

- Never pass a secret as a command argument, URL component, source artifact,
  process listing, test fixture, console output, or evidence payload.
- Read a secret only through its declared secret adapter and write it only to
  the target scope named by the contract.
- Report presence, provenance, version metadata, and permitted digests, never
  plaintext or reversible encodings.
- Do not copy a secret across targets solely because names match. The contract
  must explicitly declare source-copy and its compatibility validator.
- Do not replace a target value with an empty, example, sentinel, or generated
  value.

## Bootstrap Gate

Configuration alone is insufficient. The infrastructure adapter must emit a
bootstrap receipt proving that the declared deployment units, bindings, state
resources, routes, and reconciliation baseline exist for this exact target.

~~~
bootstrap_receipt:
  schema: <declared-schema>
  target: <target-identifier>
  configuration_digest: <digest>
  units: [<unit-identity-and-version>]
  resources: [<resource-identity-and-state>]
  captured_at: <utc-instant>
  receipt_digest: <digest>
~~~

A partial infrastructure observation is not a bootstrap receipt. Missing units
or bindings stop the controller before irreversible release mutation.

## Candidate, Authorization, and Deployment Gates

The protected controller evaluates gates in this order:

1. Exact candidate: frontier, integration receipt, local review, source, and dependency digests match.
2. Configuration: complete resolution is resolved and its inventory digest is current.
3. Bootstrap: the target bootstrap receipt validates against that configuration digest.
4. Authorization: an exact-candidate, target-scoped human authorization is present and current.
5. Release: capture last-known-good rollback identity and deploy through the sole controller.
6. Reconciliation and verification: independent adapters prove state,
   transport, browser/client behavior where applicable, publication, and
   rollback readiness.

Only the final gate may mark a release production-verified. A green build,
configuration inventory, deployment upload, or public response alone is not a
production receipt.

## Adaptive Evidence Profile

| Risk profile | Minimum additional evidence |
|---|---|
| Low | Typed configuration validation, target inventory proof, deployment observation, rollback identity. |
| Standard | Low profile plus bootstrap receipt, independent state reconciliation, and public transport verification. |
| High | Standard profile plus multi-surface verification, capacity/error evidence, publication proof, and exercised rollback. |

The profile may add evidence, but it cannot weaken configuration, bootstrap,
exact-candidate, authorization, or rollback gates.

## Failure and Recovery

| Condition | Required action |
|---|---|
| Required value absent | Record blocked with entry name and resolver class; await an authoritative source. |
| Value fails validation | Reject without mutation; repair the source contract or adapter mapping. |
| Partial configuration mutation | Run the compensating transaction; re-inventory and record the resulting digest. |
| Bootstrap mismatch | Repair through its controlled infrastructure workflow; reseal the bootstrap receipt. |
| Candidate drift | Discard the request and create a new exact-candidate request. |
| Deployment or verification failure | Run the declared rollback controller and retain redacted diagnostics. |

No retry may reuse expired authorization, a bootstrap receipt for another
configuration digest, or a configuration receipt for another candidate.

## Evidence and Audit Record

Persist one joined, redacted record:

~~~
release_record:
  request_digest: <digest>
  candidate_digest: <digest>
  configuration_resolution: <receipt-digest>
  bootstrap_receipt: <receipt-digest>
  authorization_receipt: <receipt-digest>
  rollback_identity: <receipt-digest>
  deployment_receipt: <receipt-digest>
  reconciliation_receipt: <receipt-digest>
  verification_receipt: <receipt-digest>
  publication_receipt: <receipt-digest-or-null>
  status: production-verified | rolled-back | blocked | failed
~~~

This record must reproduce the gate decision without retaining secret
plaintext. It proves one target and one candidate only; it grants no authority
for a successor.

## Automation Conformance Checklist

- [ ] The request names typed adapters and immutable candidate evidence.
- [ ] Every configuration entry has provenance, a validator, and a redaction classification.
- [ ] Discovery completed without printing or persisting secret plaintext.
- [ ] All required entries resolved from authoritative sources, or the run ended blocked.
- [ ] Every configuration mutation has a target-bound receipt and post-write inventory verification.
- [ ] A bootstrap receipt proves the complete declared target state.
- [ ] Exact-candidate authorization precedes the sole deployment controller.
- [ ] Independent reconciliation, verification, publication, and rollback receipts meet the selected profile.
