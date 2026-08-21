---
title: "PRD, TAD & ADR Production Runtime Ready Demo Guidelines"
doc_type: "Guidelines"
version: "1.1.0"
date: "2026-08-19"
lang: "en-US"
frontmatter_contract: "required"
---

# PRD, TAD & ADR Production Runtime Ready Demo Guidelines

## Scope & Neutrality Contract

- **Universal**: these guidelines apply to any capability, document set, runtime, demo surface, renderer, interface, protocol, platform, or delivery model. Nothing here assumes a specific repository, company, domain, vendor, product, framework, cloud, file path, or host.
- **Neutral**: name every actor, surface, and mechanism by function. Concrete tools may appear only inside a labelled **reference implementation** block and are always swappable for equivalent mechanisms.
- **Agnosticity**: demo readiness is derived from authored PRD/TAD/ADR content, declared frontmatter, Verifiable Completion Conditions, and Evidence References. It is never inferred from file names, directory layout, downstream mirrors, branding, screenshots, or informal narrative.
- **Adaptivity**: each rule supports substitution of surfaces, checks, deployment models, and evaluator mechanisms while preserving the evidence contract. A demo may be textual, visual, API-driven, CLI-driven, event-driven, or mixed, provided every claim remains observable and reproducible.
- **Modular**: each `##` section is self-contained and addressable by its heading anchor. Sections may be lifted into another guideline set without rewriting their internals.
- **Enforceable**: every rule is written so a conformance check can record a typed finding. Statements that express preference rather than observable requirements are labelled as guidance.

## Module Index

- `scope--neutrality-contract` — universality, neutrality, agnosticity, adaptivity, modularity, and enforceability rules
- `demo-readiness-vocabulary` — readiness meanings for demos and the boundary between runtime-ready and production-verified
- `as-is--to-be-demo-contract` — demo class dimension, observed-versus-intended labelling, and claim eligibility per class
- `bridge-ledger` — ordered as-is to to-be delta, blocking classification, and adjacency to the claim
- `demo-frontmatter-contract` — required metadata for canonical demo plans and reports
- `demo-scope-contract` — min-viable demo scope, explicit exclusions, and capability boundaries
- `demo-lane--surface-model` — authoring, mirror, delivery, and presentation surfaces without vendor coupling
- `demo-vcc--evidence-contract` — VCCs, Evidence References, evaluator independence, and proof format
- `demo-evidence-package` — required artifacts for a production-runtime-ready demo packet
- `demo-flow-pattern` — neutral sequence for preparing, running, observing, and closing a demo
- `surface-binding-contract` — renderer, interface, and channel binding rules
- `adaptivity--substitution-rules` — how to replace tools or surfaces without changing the claim
- `demo-risk--failure-modes` — failure handling and known-gap disclosure
- `anti-pattern-guards` — prohibited demo-readiness shortcuts and corrections
- `conformance-findings` — typed finding vocabulary, severity, and recording contract
- `validation-checklist` — pre-demo, run-time, and post-demo gates
- `roleactionoutcome` — role-to-outcome mapping
- `mantra-application` — compact framing mantra

## Demo Readiness Vocabulary

A demo is not a readiness rung by itself. A demo is a presentation of evidence for a capability whose rung is derived elsewhere.

| Term | Meaning | Minimum evidence |
|---|---|---|
| **Capability** | One bounded user-facing or operator-facing behavior described by PRD/TAD/ADR artifacts | Scope statement and VCCs |
| **Demo target** | The capability, surface, and claim being shown | Demo scope contract |
| **Production-runtime-ready demo** | A demo showing that every in-scope VCC has a satisfying Evidence Reference from a reproducible runtime check on the intended local or non-public runtime surface | Complete runtime evidence package |
| **Production-verified demo** | A demo showing runtime-ready evidence plus recorded delivery-surface check result plus explicit operator promotion instruction | Runtime evidence, delivery proof, promotion instruction |
| **Demo claim** | The exact readiness statement the demo is allowed to make | Derived rung and evidence references |

### Directives

- State whether the demo claims `runtime-ready` or `production-verified`; forbid ambiguous claims such as “production-ready” with no rung.
- For a `runtime-ready` demo, show complete local or non-public runtime proof and explicitly state that delivery promotion remains closed unless production verification evidence is present.
- For a `production-verified` demo, include a delivery-surface check and a referenced operator promotion instruction; forbid deriving production verification from a successful local demo alone.
- Treat demo success as evidence presentation, not evidence creation, unless the demo run itself records a new Evidence Reference with a named check and recorded result.
- Re-derive the demo claim whenever any VCC, Evidence Reference, scope boundary, or surface binding changes.

## As-Is / To-Be Demo Contract

A demo may legitimately present target state instead of achieved state. What it may never do is blend the two. Demo class is a dimension orthogonal to the demo claim: the claim answers **which rung**, the class answers **whether the shown behavior was observed or is intended**.

| Demo class | Shows | Evidence obligation |
|---|---|---|
| **As-is demo** | Only behavior observed and recorded on a named baseline | Every claim carries an Evidence Reference |
| **To-be demo** | Intended behavior once a declared bridge closes | No Evidence References required; every block labelled as target |
| **Bridge demo** | Both, with an explicit delta between them | As-is blocks evidenced; to-be blocks labelled; delta enumerated |

### Block Labelling Convention

Every block, table, code sample, figure, and step in a to-be or bridge demo carries a neutral two-token label:

```text
[AS-IS, OBSERVED]  → behavior recorded on the named baseline, backed by an Evidence Reference
[TO-BE, TARGET]    → behavior intended once the declared bridge closes, backed by no evidence
```

| Class | Label required | Evidence Reference | Readiness claim eligibility |
|---|---|---|---|
| As-is | Optional when the whole demo is as-is; required in mixed documents | Required per claim | `runtime-ready` or `production-verified` as evidenced |
| To-be | Required on every block | Forbidden | None; the demo asserts intent, not rung |
| Bridge | Required on every block | Required on as-is blocks only | Derived from the as-is half only |

### Directives

- Declare the demo class before the demo claim; an undeclared class is `undeclared-demo-class`, not a defaulted as-is demo.
- Label every block, table, code sample, figure, and script step in a to-be or bridge demo with exactly one class token pair; an unlabelled block is `unlabelled-demo-block`.
- Forbid both tokens in the same block; split the block instead. A block that mixes observed and intended content is `blended-as-is-to-be-block`.
- Reserve readiness claims for as-is evidence. A to-be demo asserts intent, not rung; it makes no readiness claim at all, and a to-be demo carrying one is `to-be-demo-readiness-claim`.
- Derive a bridge demo's claim from its as-is half only; the to-be half never raises the claim, adds a rung, or supplies a satisfying Evidence Reference.
- Name the baseline revision, fixture version, or dated observation identifier that the as-is half was observed against, so the as-is half is reproducible and its staleness is detectable; absence is `missing-baseline-reference`.
- Re-derive the demo class whenever an as-is block gains or loses evidence: an as-is block that loses its Evidence Reference becomes a to-be block, and a to-be block that gains one may be relabelled as-is only after the baseline reference is recorded.
- Keep the class declaration, the claim, and the bridge ledger in the same region of the document so no reader can obtain one without the others.

## Bridge Ledger

A to-be or bridge demo must carry an ordered delta from as-is to to-be, so the reader sees cost, not only ambition.

| Part | Definition |
|---|---|
| **Gap** | One named difference between observed behavior and intended behavior |
| **Claim impact** | Why the gap matters to the demo claim, stated as the claim it currently prevents |
| **Owning increment** | The increment, work item, or decision that closes the gap |
| **Blocking class** | `blocks-runnability` when the demo cannot run at all until closed, `narrows-scope` when it only reduces what the demo covers |
| **Ordering rationale** | Why this gap precedes the next, expressed as unblocking power |

### Bridge Ledger Template

```markdown
## Bridge Ledger: [Capability]

**Baseline reference**: [revision | fixture version | dated observation identifier]
**Derived claim**: [claim derived from as-is half only | none for pure to-be]

| # | Gap | Claim impact | Owning increment | Blocking class | Ordering rationale |
|---|---|---|---|---|---|
| 1 | [Gap] | [Claim currently prevented] | [Increment or work item] | [blocks-runnability \| narrows-scope] | [What this unblocks] |
| 2 | [Gap] | [Claim currently prevented] | [Increment or work item] | [blocks-runnability \| narrows-scope] | [What this unblocks] |
```

### Directives

- Require a bridge ledger for every to-be and bridge demo; absence is `missing-bridge-ledger`.
- Order entries by unblocking power, not by document order, authoring convenience, or estimated effort; state the ordering rationale per entry.
- Classify every gap as `blocks-runnability` or `narrows-scope`; an unclassified gap leaves the reader unable to tell an unrunnable demo from a partial one.
- Enumerate every gap that invalidates the claim, including removals, corrections, and reversals; a ledger listing only additive work while omitting a claim-invalidating gap is `incomplete-bridge-ledger`.
- Keep the ledger adjacent to the claim it qualifies; a ledger that can be read separately from the claim is `detached-bridge-ledger`.
- Re-order and re-derive the ledger whenever a gap closes, opens, or changes blocking class, and re-derive the demo claim in the same pass.

## Demo Frontmatter Contract

Canonical demo plans and demo reports must start with YAML frontmatter as the first block. Frontmatter is the single source of truth for demo identity, scope, claim, lane, and surface metadata.

| Key | Value domain | Required for |
|---|---|---|
| `title` | Quoted string | Identity |
| `doc_type` | `DemoPlan` \| `DemoReport` \| equivalent controlled value | Classification |
| `version` | Semantic version | Change tracking |
| `date` | `YYYY-MM-DD` | Baseline date |
| `lang` | Language tag | Localization |
| `frontmatter_contract` | `required` | Parser enforcement |
| `owner` | One accountable function | Accountability |
| `capability` | One bounded capability name | Scope |
| `local_rung` | Readiness Ladder rung | Local readiness |
| `delivered_rung` | Readiness Ladder rung | Delivered readiness |
| `demo_class` | `as-is` \| `to-be` \| `bridge` | Observed-versus-intended boundary |
| `demo_claim` | `runtime-ready` \| `production-verified` \| absent or `null` | Claim boundary |
| `baseline_reference` | Revision, fixture version, or dated observation identifier | Required when any as-is block is present |
| `lane` | `authoring` \| `mirror` \| `delivery` | Evidence surface |
| `demo_surface` | Functional surface class | Presentation binding |
| `universal_scope` | `true` \| `false` | Neutrality check |

### Directives

- Keep `local_rung` and `delivered_rung` separate; a blended status is invalid.
- Derive rung fields from Evidence References; forbid manually promoting a rung in frontmatter without evidence.
- Declare `demo_class` explicitly; forbid omitting it and forbid inferring it from the presence or absence of Evidence References.
- Keep `demo_claim` absent or explicitly `null` for a pure to-be demo; a populated `demo_claim` under `demo_class: to-be` is `to-be-demo-readiness-claim`.
- Declare `baseline_reference` whenever `demo_class` is `as-is` or `bridge`, and forbid a baseline reference invented for a demo with no as-is block.
- Derive `demo_claim` in a bridge demo from as-is blocks only; forbid a claim that any as-is Evidence Reference does not support.
- Name the demo surface by function, such as `[visual renderer]`, `[API endpoint]`, `[CLI interface]`, `[message stream]`, or `[report document]`; forbid brand-derived surface names outside labelled reference implementation blocks.
- Declare one accountable owner; multiple owners for the same demo contract are a duplicate-ownership defect.
- Use placeholders for examples; forbid deriving demo identity from a path, URL, repository, or directory.

## Demo Scope Contract

A production-runtime-ready demo must be small enough to prove, broad enough to represent the claim, and explicit about what it excludes.

| Part | Definition |
|---|---|
| **Capability boundary** | What behavior is being demonstrated and what is not |
| **Min-viable demo path** | Shortest sequence that proves every in-scope VCC |
| **Excluded increments** | Known follow-on work not covered by the claim |
| **Data boundary** | Fixture, synthetic, anonymized, seeded, or live data class used in the demo |
| **Mutation boundary** | Which state may change during the demo and which state must remain unchanged |
| **Rollback or reset** | How the demo returns to a known state |

### Directives

- State the min-viable demo path before preparing presentation assets; forbid expanding the demo to unrelated capabilities.
- List exclusions next to the claim; a demo that omits known gaps is an overclaim.
- Use non-sensitive fixtures or redacted runtime receipts unless live data is explicitly authorized and bounded.
- State allowed mutations and reset steps; a demo that mutates undeclared state is not reproducible.
- Map every visible demo step to at least one VCC or evidence artifact; presentation-only steps are allowed only when labelled as context.

## Demo Lane & Surface Model

Demo readiness is lane-aware. A successful authoring-lane or mirror-lane demo does not imply delivery-lane readiness.

| Lane | Function | Demo use | Maximum claim without promotion proof |
|---|---|---|---|
| **Authoring** | Where the capability is built and locally verified | Fast proof and focused debugging | `runtime-ready` |
| **Mirror** | Non-public delivery-shaped copy | Delivery-shape rehearsal | `runtime-ready` |
| **Delivery** | Public or customer-facing surface | Production verification | `production-verified` only with operator promotion instruction |
| **Presentation** | The medium used to show evidence | Slides, canvas, terminal, dashboard, API client, transcript, or report | No readiness claim by itself |

### Directives

- Name the lane for every Evidence Reference used in the demo.
- Keep presentation surfaces separate from runtime surfaces; a beautiful presentation cannot raise a readiness rung.
- Treat deploy boundaries as closed by default; forbid a demo script that promotes to mirror or delivery unless the operator instruction is referenced.
- If the presentation surface reads from generated artifacts, state whether it is read-only or mutation-capable.
- Forbid claiming that all renderer, interface, or channel classes are ready when evidence covers only one class.

## Demo VCC & Evidence Contract

A demo-ready capability must be backed by Verifiable Completion Conditions and Evidence References.

### VCC Template

```markdown
## Demo VCC: [Capability] — [Condition]

**End state**: [Observable outcome]
**Stated check**: [Named invocable check or deterministic inspection]
**Constraint**: [State, scope, data, or surface that must not change]
**Bound**: [Maximum iterations, retries, time, data volume, or not applicable]
```

### Evidence Reference Template

```markdown
## Evidence Reference: [Capability] — [Check]

**VCC**: [VCC identifier]
**Named check**: [Exact command, procedure, probe, or inspection name]
**Recorded result**: [Exit code, test summary, count, response measurement, rendered artifact, or equivalent]
**Surface**: [authoring | mirror | delivery]
**Artifact**: [Log, report, receipt, screenshot, trace, export, or rendered document]
**Timestamp basis**: [Recorded observation time or deterministic fixture version]
```

### Evidence-Shaped Value Rule

In a to-be or bridge demo, any value whose **shape implies verification** must appear as a structural placeholder and never as a plausible invented value. A plausible-looking fabricated digest is indistinguishable from evidence and is therefore worse than an obvious placeholder.

| Evidence-shaped value class | Required placeholder form |
|---|---|
| Digest, content hash, checksum | `[digest]` or `<digest:not-observed>` |
| Revision, build, or version identifier | `[revision]` or `<revision:not-observed>` |
| Timestamp, date, or duration | `[timestamp]`, `[duration]` |
| Count, size, or cardinality | `[count]`, `[size]` |
| Measurement, latency, throughput, score | `[measurement]` |
| Exit code, status, or result summary | `[recorded-result]` |
| Identifier, token, session, or account | `[identifier]` |

### Directives

- Attach every Evidence Reference to one VCC; unattached evidence proves nothing.
- Render every evidence-shaped value in a to-be or bridge block as a structural placeholder; a value shaped like observed output but not observed is `fabricated-evidence-value`.
- Choose placeholder forms that cannot be mistaken for observed output: forbid correct-length hexadecimal strings, well-formed version strings, realistic durations, and specific counts as stand-ins.
- Forbid truncating, abbreviating, or masking an invented value to make it look observed; use the placeholder form instead.
- Keep placeholder forms consistent within a document so a conformance check can distinguish placeholders from recorded results mechanically.
- Record a result, not an assertion; “check passed” with no surfaced result is insufficient.
- Use evaluator-independent checks wherever possible; the person or agent running the demo must not self-grade the claim.
- Prefer deterministic checks over visual inspection; if visual inspection is required, pair it with a structural assertion.
- Bound every loop, retry, poll, animation, stream, and live wait used in the demo.

## Demo Evidence Package

A production-runtime-ready demo package contains all artifacts required to recompute the claim without trusting the presenter.

| Artifact | Required content | Finding if absent |
|---|---|---|
| **Demo plan** | Scope, lane, surface, script, VCC mapping | `missing-demo-plan` |
| **Demo report** | What ran, result, deviations, and final claim | `missing-demo-report` |
| **VCC register** | Every in-scope condition and constraint | `missing-vcc` |
| **Evidence register** | Named checks and recorded results | `missing-evidence` |
| **Surface binding record** | How runtime artifact reaches presentation surface | `unbound-demo-surface` |
| **Data boundary statement** | Fixture/live/redacted/anonymized data class | `undeclared-demo-data` |
| **Known-gap register** | Deferred increments and explicit exclusions | `overclaimed-demo` |
| **Reset or rollback statement** | Return path to known state | `missing-reset-path` |

### Fail-Closed-as-Evidence Pattern

When a capability runs but has never completed its success path, its correct fail-closed behavior is legitimate as-is evidence **for the guard** and is not evidence **for the capability**.

| Observed | Proves | Does not prove |
|---|---|---|
| Guard refuses, blocks, or aborts as specified | The guard is present, reachable, and fail-closed | The guarded capability works |
| Capability invoked and terminated at the guard | Invocation path and bound are real | Success path exists or produces intended output |
| No success path ever observed | Nothing about the intended outcome | Anything the to-be half asserts |

### Directives

- Package evidence before rehearsal; forbid retrofitting evidence after a successful presentation.
- Scope fail-closed evidence to the guard VCC; forbid attaching it to a capability VCC whose end state was never observed.
- Disclose plainly, beside the claim, that no success path has been observed; an undisclosed unobserved success path is `undisclosed-unobserved-success-path`.
- Label the intended success path as a to-be block and enter its remaining work in the bridge ledger; forbid presenting a well-behaved error as though it were a working feature.
- Keep generated evidence artifacts immutable for the demo baseline; if regenerated, version the new baseline.
- Include negative or failure-path evidence when the claim depends on fail-closed behavior.
- Record deviations during the demo; do not silently substitute a different check, surface, or data set.
- State whether each artifact is authored, generated, observed, or derived.

## Demo Flow Pattern

Use this neutral sequence for production-runtime-ready demos:

```text
Declare claim → Load scope → Verify prerequisites → Run named checks → Bind evidence to surface → Present min-viable path → Show constraints → Show known gaps → Record outcome → Close or escalate findings
```

### Demo Script Template

```markdown
## Demo Script: [Capability]

**Claim**: [runtime-ready | production-verified]
**Lane**: [authoring | mirror | delivery]
**Surface**: [functional surface class]
**Data set**: [fixture | synthetic | anonymized | redacted | live-authorized]

| Step | Action | Evidence shown | VCC covered | Expected outcome |
|---|---|---|---|---|
| 1 | [Prepare known state] | [Artifact] | [VCC] | [Outcome] |
| 2 | [Run named check] | [Recorded result] | [VCC] | [Outcome] |
| 3 | [Open presentation surface] | [Rendered artifact] | [VCC] | [Outcome] |
| 4 | [Show constraint/non-leakage/fail-closed property] | [Recorded result] | [VCC] | [Outcome] |
| 5 | [State exclusions and final claim] | [Known-gap register] | [Scope] | [Outcome] |
```

### Directives

- Start the demo by reading the claim and lane; forbid leaving the audience to infer them.
- Run or display the named checks before showing derived presentation artifacts.
- Show the constraint evidence, not only the happy path.
- End with the derived final claim and any remaining findings.
- If any required check fails, downgrade the claim or stop the demo; forbid continuing with the original claim.

## Surface Binding Contract

A demo surface is a projection of runtime evidence. It must not redefine the runtime claim.

| Binding part | Definition |
|---|---|
| **Source artifact** | Evidence, receipt, report, state, fixture, or export being displayed |
| **Transform** | Parser, formatter, renderer, adapter, query, or import path |
| **Target surface** | Functional class that displays or exposes the artifact |
| **Integrity check** | Proof that target output reflects the source artifact |
| **Read/write mode** | Whether the target only displays or can mutate state |

### Directives

- Declare exactly one primary target surface for the demo claim; additional surfaces are supporting views unless separately evidenced.
- Verify source-to-surface integrity with a structural check, digest, count, schema match, deterministic snapshot, or equivalent.
- Avoid first-key, title, label, or category conventions that are implicit and undocumented; document grouping and ordering rules when the surface depends on them.
- Forbid adding a new renderer, adapter, or bridge solely to make the demo look complete when an existing surface can display the evidence.
- If a surface is unavailable, substitute only a functionally equivalent surface and record the substitution as a deviation.

## Adaptivity & Substitution Rules

A demo remains valid across environments when substitutions preserve function, evidence, and constraints.

| Substitution type | Allowed when | Required record |
|---|---|---|
| **Check mechanism** | Same VCC, same end state, comparable result | Replacement check and equivalence rationale |
| **Presentation surface** | Same source artifact, same readable fields, same integrity proof | Surface binding update |
| **Data set** | Same schema and edge-case coverage, no sensitivity downgrade | Data boundary update |
| **Runtime lane** | Same or stricter isolation and no claim inflation | Lane update and rerun evidence |
| **Evaluator mechanism** | Same independence and deterministic verdict | Evaluator record update |

### Directives

- Substitutions must be recorded before or during the demo; unrecorded substitutions invalidate the claim.
- A substitution may preserve or lower a claim; it must never raise a claim without new evidence.
- Prefer configuration-driven substitution over code changes in demo paths.
- Keep demo scripts parameterized by placeholders such as `[check]`, `[surface]`, `[artifact]`, and `[lane]`.
- Forbid hardcoded local paths, host names, tokens, accounts, or environment-specific identifiers in reusable demo guidelines.

## Demo Risk & Failure Modes

A credible demo shows how the capability behaves when prerequisites, evidence, or surfaces fail.

| Failure mode | Required behavior |
|---|---|
| Missing prerequisite | Stop before claim, record `missing-demo-prerequisite` |
| Failed named check | Downgrade or withdraw claim, record `failed-demo-check` |
| Stale evidence | Re-run evidence or record `stale-demo-evidence` |
| Surface mismatch | Stop surface claim, record `surface-integrity-failure` |
| Sensitive data exposure | Stop demo, revoke artifact, record `sensitive-demo-leak` |
| Unbounded wait or loop | Stop at bound, record `unbounded-demo-loop` |
| Known gap discovered | Add to known-gap register, re-derive claim |

### Directives

- Define failure handling before the demo; live improvisation is not a control.
- Preserve failed evidence unless it contains sensitive data; failures are part of readiness truth.
- Prefer fail-closed behavior for gates, permissions, spend, mutations, and promotions.
- Record every deviation from the script in the demo report.
- Do not hide known gaps behind presentation language.

## Anti-Pattern Guards

❌ Demo claims “production-ready” without naming `runtime-ready` or `production-verified`  
→ ✅ State the exact rung and derive it from Evidence References.

❌ Successful presentation treated as proof while named checks are absent  
→ ✅ Run or display named checks with recorded results before presenting derived views.

❌ Local runtime proof used to imply delivery-surface verification  
→ ✅ Separate local and delivered rungs; require delivery evidence and operator instruction for production verification.

❌ One surface proven, all surfaces claimed  
→ ✅ Scope the demo claim to the evidenced surface class only.

❌ Screenshot-only evidence for a structural claim  
→ ✅ Pair visual evidence with schema, digest, count, or deterministic structural checks.

❌ Demo script mutates undeclared state or crosses a closed deploy boundary  
→ ✅ Declare mutation boundaries and keep promotion gates closed absent explicit operator instruction.

❌ Sensitive identifiers, tokens, sessions, accounts, or live personal data shown in demo artifacts  
→ ✅ Use redacted, anonymized, synthetic, or explicitly authorized data boundaries.

❌ Substituting a check, surface, lane, or data set without recording the change  
→ ✅ Record substitutions and re-derive the claim.

❌ Known deferred increments omitted from the final claim  
→ ✅ Show the known-gap register and keep exclusions adjacent to the readiness claim.

❌ Intended behavior presented with no declared demo class, leaving the reader to guess what was observed  
→ ✅ Declare `as-is`, `to-be`, or `bridge` before the claim and treat an undeclared class as a finding, not a default.

❌ Observed and intended content mixed inside one block, table, or code sample  
→ ✅ Split into separately labelled `[AS-IS, OBSERVED]` and `[TO-BE, TARGET]` blocks; never both tokens in one block.

❌ To-be demo carrying a readiness claim because the target state looks achievable  
→ ✅ Reserve readiness claims for as-is evidence; a to-be demo asserts intent, not rung.

❌ Plausible invented digest, revision, timestamp, count, or measurement shown where evidence would appear  
→ ✅ Use structural placeholders that cannot be mistaken for observed output.

❌ As-is half presented with no named baseline, so it can be neither reproduced nor detected as stale  
→ ✅ Name the baseline revision, fixture version, or dated observation identifier for every as-is block.

❌ Bridge ledger listing only additive work while omitting a gap that invalidates the claim, or filed away from the claim it qualifies  
→ ✅ Enumerate every claim-invalidating gap, order by unblocking power, and keep the ledger adjacent to the claim.

❌ Correct fail-closed error presented as though it were a working feature  
→ ✅ Scope fail-closed evidence to the guard and disclose plainly that no success path has been observed.

❌ Demo guidelines tied to a repository path, vendor product, framework, or host  
→ ✅ Use functional names and placeholders; place concrete tools only in labelled reference implementation blocks.

## Conformance Findings

### Recording Contract

Every finding carries exactly six fields:

| Field | Definition |
|---|---|
| **Finding Type** | One member of the enumeration below |
| **Severity** | Exactly one of `blocker`, `major`, `minor` |
| **Rule anchor** | The section anchor plus rule ordinal or equivalent stable rule identifier |
| **Artifact reference** | Demo plan, report, VCC, evidence, surface binding, or not-applicable marker |
| **Evidence excerpt** | Bounded quote or observed result that triggered the finding |
| **Remediation** | Documentation change, evidence rerun, scope change, surface change, or claim downgrade |

### Severity Assignment

| Severity | Assigned when |
|---|---|
| `blocker` | The issue contradicts the stated demo claim, leaks sensitive data, crosses a closed boundary, or leaves execution unbounded |
| `major` | Required evidence, scope, surface, or reset artifact is absent or stale |
| `minor` | The issue weakens clarity, traceability, or neutrality without invalidating the claim |

### Finding Enumeration

| Rule family | Finding Type | Severity |
|---|---|---|
| Scope | `missing-demo-plan` | `major` |
| Scope | `overclaimed-demo` | `blocker` |
| Scope | `undeclared-demo-data` | `major` |
| Frontmatter | `missing-demo-frontmatter-key` | `minor` |
| Frontmatter | `blended-demo-status` | `minor` |
| Readiness | `unproven-demo-claim` | `blocker` |
| Readiness | `unknown-demo-rung` | `minor` |
| Demo class | `undeclared-demo-class` | `major` |
| Demo class | `unlabelled-demo-block` | `major` |
| Demo class | `blended-as-is-to-be-block` | `blocker` |
| Demo class | `to-be-demo-readiness-claim` | `blocker` |
| Bridge | `missing-bridge-ledger` | `major` |
| Bridge | `incomplete-bridge-ledger` | `blocker` |
| Bridge | `detached-bridge-ledger` | `minor` |
| Evidence | `missing-vcc` | `major` |
| Evidence | `missing-evidence` | `major` |
| Evidence | `stale-demo-evidence` | `major` |
| Evidence | `failed-demo-check` | `blocker` |
| Evidence | `self-graded-demo` | `major` |
| Evidence | `fabricated-evidence-value` | `blocker` |
| Evidence | `missing-baseline-reference` | `major` |
| Evidence | `undisclosed-unobserved-success-path` | `blocker` |
| Surface | `unbound-demo-surface` | `major` |
| Surface | `surface-integrity-failure` | `blocker` |
| Surface | `surface-overgeneralization` | `major` |
| Boundary | `demo-boundary-breach` | `blocker` |
| Boundary | `missing-reset-path` | `major` |
| Adaptivity | `unrecorded-demo-substitution` | `major` |
| Adaptivity | `environment-coupled-demo` | `major` |
| Runtime safety | `unbounded-demo-loop` | `blocker` |
| Runtime safety | `sensitive-demo-leak` | `blocker` |
| Runtime safety | `missing-demo-prerequisite` | `major` |
| Neutrality | `demo-vendor-coupling` | `major` |
| Neutrality | `demo-path-derived-claim` | `major` |
| Modularity | `non-modular-demo-section` | `minor` |

### Directives

- Deduplicate findings on `(Finding Type, Rule anchor, artifact reference)`.
- Order findings by severity, then type, then artifact reference.
- Report zero counts for checked finding types with no occurrence.
- Do not invent ad-hoc finding types in reports; extend this enumeration first.
- A demo with any `blocker` finding cannot claim `runtime-ready` or `production-verified`.

## Validation Checklist

### Pre-Demo Gate

- [ ] Demo plan has required frontmatter.
- [ ] Capability boundary, min-viable demo path, exclusions, data boundary, mutation boundary, and reset path are stated.
- [ ] Every in-scope acceptance criterion maps to a VCC.
- [ ] Every VCC has a named check and expected recorded result.
- [ ] Evidence package is complete or the demo is explicitly labelled rehearsal.
- [ ] Local and delivered rungs are separate and derived.
- [ ] Demo class is declared as `as-is`, `to-be`, or `bridge` before the claim.
- [ ] Every block, table, code sample, and step in a to-be or bridge demo carries exactly one class label, and no block carries both.
- [ ] Demo claim is exactly `runtime-ready` or `production-verified` for an as-is demo, derived from the as-is half only for a bridge demo, and absent or `null` for a pure to-be demo.
- [ ] Baseline reference is named whenever an as-is block is present.
- [ ] Every evidence-shaped value in a to-be or bridge block is a structural placeholder, not a plausible invented value.
- [ ] Bridge ledger is present for every to-be or bridge demo, lists gap, claim impact, owning increment, blocking class, and ordering rationale, and sits adjacent to the claim.
- [ ] Any capability with no observed success path is disclosed as such, with its fail-closed evidence scoped to the guard.
- [ ] Surface binding identifies source artifact, transform, target surface, integrity check, and read/write mode.
- [ ] Presentation surface does not cross a closed deploy boundary.
- [ ] All loops, retries, polls, and live waits are bounded.
- [ ] Data is synthetic, redacted, anonymized, fixture-based, or explicitly authorized.
- [ ] Known gaps and deferred increments are listed beside the claim.

### Run-Time Gate

- [ ] Prerequisites are verified before claim presentation.
- [ ] Named checks are run or displayed with recorded results.
- [ ] Surface integrity is shown before interpreting rendered output.
- [ ] Constraint evidence is shown, including non-mutation, non-leakage, fail-closed, or equivalent properties where relevant.
- [ ] Deviations from the script are recorded immediately.
- [ ] Failed checks downgrade or stop the claim.
- [ ] No sensitive data appears in presentation artifacts.

### Post-Demo Gate

- [ ] Demo report records final claim, demo class, lane, surface, evidence, deviations, and findings.
- [ ] Finding set is deduplicated, ordered, and severity-labelled.
- [ ] Any `blocker` finding withdraws the readiness claim.
- [ ] Major and minor findings have owner and remediation.
- [ ] Evidence artifacts are versioned or immutably referenced.
- [ ] Substitutions are recorded and the claim is re-derived.
- [ ] Demo class is re-derived for every as-is block that gained or lost evidence during the run.
- [ ] Bridge ledger is re-ordered and re-derived for every gap that closed, opened, or changed blocking class.
- [ ] No to-be block acquired a readiness claim, and no evidence-shaped placeholder was replaced by an unobserved value.
- [ ] Delivery promotion remains closed unless production verification evidence and operator instruction are present.

## Role—Action—Outcome

**Capability Owner** → defines the demo claim, min-viable scope, exclusions, and accepted data boundary → produces a bounded claim that cannot silently expand.

**Architecture Owner** → maps runtime components, lane boundaries, surface binding, and reset path → ensures the demo represents the system accurately without crossing closed boundaries.

**Evidence Owner** → maintains VCCs, runs or collects named checks, records results, and preserves artifacts → makes the readiness claim recomputable from evidence.

**Presenter** → follows the script, shows evidence before interpretation, records deviations, and states known gaps → communicates readiness without overclaiming.

**Evaluator** → independently compares the demo package against these guidelines, records findings, and derives the final claim → prevents self-graded readiness.

**Operator** → authorizes any mirror or delivery promotion, when applicable, and confirms rollback or reset instructions → keeps production verification gated and reversible.

## Mantra Application

**“Scope bounds the claim · Evidence earns the rung · Classes never blend · Surfaces display but do not prove · Substitutions are recorded · Boundaries stay closed · Gaps remain visible · Findings make demo truth comparable.”**

- **Scope bounds**: a demo proves only the stated capability, lane, surface, and data boundary.
- **Evidence earns**: readiness is derived from VCCs and Evidence References, never from presentation quality.
- **Classes never blend**: as-is blocks carry evidence against a named baseline, to-be blocks carry labels and placeholders, no block carries both, and a to-be demo asserts intent, not rung.
- **Surfaces display**: visual, API, terminal, report, or stream surfaces project evidence; they do not redefine it.
- **Substitutions adapt**: tools and surfaces may change when function, evidence, and constraints are preserved and recorded.
- **Boundaries stay closed**: runtime-ready does not become production-verified without delivery evidence and operator instruction.
- **Gaps remain visible**: exclusions and deferred increments sit beside the final claim.
- **Findings compare**: typed findings make demos auditable across runs, teams, and environments.
