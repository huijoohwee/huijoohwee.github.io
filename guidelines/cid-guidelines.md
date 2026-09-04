---
title: "Shared CID, RAO and SVO Contract"
doc_type: "Guidelines Module"
version: "2.0.0"
date: "2026-09-05"
lang: "en-US"
frontmatter_contract: "required"
owner: "Directive contract"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Shared CID, RAO and SVO Contract

## Scope and Ownership

This is the shared semantic contract for PRD, TAD, ADR and ADLC dispatch. It applies across products,
languages, runtimes, models, devices and collaboration transports. It prescribes meanings and joins,
not a provider, directory layout, message serialization or separate document per decision.

[PRD, TAD and ADR](./prd-tad-adr-guidelines.md) own requirements, design and decision records.
[ADLC](./adlc-guidelines.md) owns execution obligations; [Artifact Continuity](./adlc-artifact-continuity.md)
owns revision and evidence joins. Consumers reference this field contract instead of forking it.

## Shared Field Contract

| Field | Meaning | Required consistency |
|---|---|---|
| `context` | Current conditions, evidence, constraints and bounded scope | Cite inspectable source/revision or mark the assumption unverified |
| `intent` | Desired value or future state | Distinguish intended value from an observed result |
| `directive` | Required action, constraint or safeguard | Trace to intent; do not smuggle in scope or authority |
| `role` | Accountable function performing the work | Name a responsibility, not a brand or personality |
| `action` | One independently verifiable transformation | Name inputs and operation; split independently closable outcomes |
| `outcome` | Observable state produced by the action | State its acceptance check; do not substitute a self-issued verdict |
| `subject` | Functional actor performing the action | Resolve to the same accountable role |
| `verb` | Operation expressed by the action | Prefer one precise transitive verb |
| `object` | Target transformed or inspected | Resolve to the same scoped input or artifact |

CID expresses context, purpose and obligation. RAO expresses accountability, transformation and result.
SVO compresses the same action. None introduces a second instruction or supplies missing authorization.
A human, agent or component may be the subject; no literal actor name is universally required.

### Composition Rule

- Every RAO action implements its referenced directive, and its outcome can be checked against intent.
- Derive SVO from RAO; do not author an unrelated command merely to fill three fields.
- Inherit stable context, scope and role by an explicit reference. Expand only changed or ambiguous fields.
- A concise sentence, table row or structured record is valid when the same semantics can be recovered.
  Machine interfaces declare the serialization they accept. Ordinary progress messages need no nine-field wrapper.
- Record stable IDs and exact revisions at handoff boundaries. Paths locate content; they do not prove identity.

### Reference serialization

This YAML is one portable representation, not an additional schema or mandatory message wrapper:

```yaml
context: "Criterion C1 at revision r2 needs a result; input I1 is verified."
intent: "A caller receives the requested valid result."
directive: "Implement C1 within the accepted scope and resource limits."
role: "Implementer"
action: "Implement result validation for C1."
outcome: "Named check V1 passes for valid input and rejects invalid input."
subject: "Implementer"
verb: "implement"
object: "result validation for C1"
```

## PRD, TAD and ADR Alignment

| Artifact role | Consumes | Produces |
|---|---|---|
| PRD | Grounded pain, WTP evidence, constraints and current capabilities | Intent, scope, requirements and verifiable acceptance criteria |
| TAD | The exact accepted PRD revision | Component owners, contracts and designs covering those criteria |
| ADR | A material design choice and its supporting/attacking evidence | Decision, rejected alternatives, consequences and relevant recovery condition |
| ADLC task | Joined criteria, design, applicable decisions and authority | Scoped RAO work, recorded results and independent evaluation |

A combined artifact may contain all roles. Split only for a real ownership, review or size constraint.
Maintain requirement → design → task → evidence joins; a merged file does not erase those obligations.
Update the owning requirement or design before dependent implementation when grounding changes a premise.
A reserved product choice still needs the operator; routine in-scope correction uses existing authorization.

## Grounding and Clarification

- Inspect the current inputs that materially justify reuse, ownership, feasibility or readiness.
  Cross-agent output is an input to verify, not implementation evidence by provenance alone.
- Separate confirmed facts, contradicted claims, absent capabilities and unverified assumptions.
  Research, source inspection, tests and deployed observations prove different things.
- Repair mechanical gaps within the authorized scope and recheck affected joins. Continue disjoint safe work.
- Ask only for a decision that cannot be derived from current evidence and authorization; explain the actual
  scope, consequence or authority gap. Present a concrete recommendation when useful; do not require a
  binary reply or invented confirmation token.
- Preserve valid authorization for unchanged effects. A transport failure or new digest does not create
  a new product choice; a material effect or target change must be re-evaluated.

## Minimal Task and Budget Contract

A task references its criterion/design, accountable role, scoped action, observable outcome, named check,
permissions, dependencies and applicable resource bounds. Reuse run-level bounds rather than repeating
identical tables. Decompose only where independent outcomes, ownership or the budget require it.

- State elapsed-time and resource bounds; record measured use where available and label estimates honestly.
- Keep authored files below 600 lines and chunks below 500 kB in profiles adopting these repository limits.
- Do not create an agent, worktree, schema or artifact unless it reduces an evidenced coordination or
  verification cost. One lane may contain disjoint agent work; every writable path still has one owner.
- On repeated deterministic failure, change approach from the cause. Use bounded retries for contention.
  External waits name a condition and recheck trigger, not an invented completion ETA.

## Preservation and Interoperability

- Preserve owner-authored work and reconstructable history. Intentional deletion or replacement belongs
  in the reviewed diff; losslessness does not require retaining obsolete text in every successor.
- Never overwrite concurrent work, invent evidence, transfer ownership by copying bytes, or force a
  successful result by editing a receipt or projection.
- Keep wire identities and accepted versions stable until an explicit compatibility migration exists.
  Human-readable names may change without renaming unrelated protocol fields or historical receipts.
- Use stable content identity and revision joins for portable handoffs. Follow the repository's naming
  convention; do not require a timestamp, alphabetic ordering or one new file for every message.

## Density and Verification

A contract is sufficient when its reader can identify the obligation, owner, scope, check and authority.
Remove duplicated prose, unexplained fields and ceremony that protects no observed failure mode.
Prefer one cited record with multiple views over copies that can drift.

An independent check verifies that CID, RAO and SVO converge, each task covers a criterion, each observed
outcome has evidence, and unsupported assumptions cannot become readiness or revenue claims. Reuse the
finding vocabulary in the [authoring set](./prd-tad-adr-guidelines.md) and
[ADLC set](./adlc-guidelines.md); this module introduces no parallel finding taxonomy.
