---
title: "Native design consistency PRD-TAD-ADR-MVP-GTM"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.2.0"
revision: "0.2.0"
date: "2026-09-24"
lang: "en-US"
frontmatter_contract: "required"
owner: "Design maintainers"
continuity_id: "NATIVE-DESIGN-CONSISTENCY"
prd_revision: "0.2.0"
tad_revision: "0.2.0"
adr_revision: "0.2.0"
mvp_revision: "0.2.0"
gtm_revision: "0.2.0"
local_rung: "undocumented"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: true
worktree_id: "device-0232231d4a19--design-theme-governance"
agent_id: "codex-design-governance"
guideline_revision: "3.3.0"
load_policy: "on-demand"
---

# Native design consistency PRD-TAD-ADR-MVP-GTM

Join: **NATIVE-DESIGN-CONSISTENCY@0.2.0**. This change authors reusable policy and an implementation
proposal. Runtime palette selection, browser acceptance and independent evaluation remain open;
the frontmatter rungs are conservative pending that evidence, not a claim that no documentation exists.
All five roles live here. The [reference implementation](prd-tad-adr-mvp-gtm-design-consistency-reference.md)
isolates concrete source names; the [evidence record](prd-tad-adr-mvp-gtm-design-consistency-evidence.md)
isolates observations and release status. Both consume this join rather than define another roadmap.

## Directive and scope

**Context:** user-provided browser observations show a dark editor beside dark-blue panels; the source
inspection in the reference companion confirms separate theme paths. The follow-up requires reuse
of existing MainPanel Settings, including text, icons, typography and ideograms. The authoring
guideline itself must consume and enforce this same contract.
**Intent:** provide one predictable appearance choice across editing surfaces and reduce repeated fixes.
**Directive:** enhance native design policy, bind a two-variant dark-theme proposal to existing owners,
and record checks without claiming unimplemented runtime behavior.
**Role:** Design maintainers. **Action:** maintain the native consistency contract.
**Outcome:** reviewable policy, source joins and acceptance conditions. **Check:** evidence record.
**SVO:** Design maintainers maintain the native consistency contract.

Scope is policy, planning and structural enforcement, with the existing application as the first
adopter. The shared harness and Canvas adapters are separate source candidates; palette implementation,
paid services, public deployment and customer outreach remain outside this increment.

## PRD

### Pain, people and value

| Pain | Evidence status | User / buyer / beneficiary | Existing workaround | Desired outcome |
|---|---|---|---|---|
| P1: editors and surrounding panels use different dark palettes | User observation plus confirmed source split; frequency unmeasured | Workspace author / operator hypothesis / learners and collaborators | Accept mismatched surfaces or change individual styles | One dark palette across application chrome and editor surfaces |
| P2: text and icons can drift when a new surface bypasses Settings | Explicit user constraint; exhaustive consumer coverage unmeasured | Workspace operator / same buyer hypothesis / all users | Adjust preferences repeatedly or patch individual components | Existing Settings changes reach every declared consumer |
| P3: agents can duplicate policy and palette owners | Existing multi-repository policy split; incident cost unmeasured | Maintainer / product operator hypothesis / contributors | Search multiple guidelines and runtime files | One navigable ownership chain with exact source evidence |

The job is to choose a readable workspace appearance, keep personal text/icon preferences, and return
to editing without surprise resets. Buyer demand and willingness to pay are hypotheses, not inferred
from a styling request. Priority: P1 → P2 → P3, based on direct observed pain and minimal native changes.

### Stories and acceptance

| ID / priority | Given → when → then | VCC / check / constraint |
|---|---|---|
| F1 Must | Given Dark mode, when opening Themes in existing Settings, then Black (Default) and Dark Blue are available | V1: settings interaction and persistence test proves both choices, default and reset; no second view/store |
| F2 Must | Given an active palette, when opening or switching editors, then chrome, code and canvas adapters resolve that same palette | V2: computed-style and editor-theme assertions match source tokens for every declared surface; authored data colors remain intact |
| F3 Must | Given typography/icon/ideogram/density preferences, when switching palettes and reloading, then preferences, glyph meaning and accessible names persist | V3: change representative existing settings, inspect consumers, test glyph fallback and reload; no renamed keys or icon library replacement |
| F4 Must | Given fresh, legacy, malformed or inaccessible storage and system changes, when resolving appearance, then a deterministic compatible result appears | V4: migration and race matrix passes; existing mode cycle and non-theme state preserved |
| F5 Must | Given desktop, narrow touch viewport and offline cached app, when completing the task, then it remains usable | V5: contrast, keyboard, zoom, touch and offline checks meet the native contract; zero remote appearance requests |
| F6 Must | Given an appearance change, when reviewing source, then each affected consumer has an owner and evidence | V6: token/export checks and consumer matrix pass at one revision; no generated-output-only patch |
| F7 Should | Given source drift, when updating policy, then stale joins are visible | V7: compare pinned revision/digest before consuming evidence; refresh only affected joins |

V1–V7 are required future checks, not reported passes. Exact native test names and gaps are in the
reference companion. This increment delivers the conditions, owner map and a structural coherence check.

### Reach and success metrics

| Metric | Baseline | Target / observation window |
|---|---|---|
| Cross-surface palette mismatch | Source split confirmed; runtime count unmeasured | Zero mismatches across declared surfaces in both variants per release |
| TTV from open workspace | Unmeasured | At most 4 actions and 30 seconds to select variant and resume, first pilot |
| Settings preservation | Existing controls observed in source | 100% of selected text/icon/density cases survive switching and reload |
| Affected consumer evidence | No variant coverage | 100% of declared consumer rows before runtime acceptance |
| Runtime request/token/hosting increment | Proposal uses local existing owners | 0 requests, 0 model tokens, $0 incremental recurring charges |
| Measured support time / ROI | Unknown | Record before/after task time and rework for a 7-day pilot; do not claim savings yet |

Could: validated custom palettes after the native variants. Won't: rebranding, a new design app,
replacing the Settings UI, universal palette values across products, theme marketplace, font downloads,
cross-device preference sync, or paid integrations. Preserve system and light modes.

## TAD

### Ownership and dependency direction

Reusable policy → product settings/token owners → view/renderer adapters → generated exports and tests.
Workflow admission and release checks observe this chain; they do not supply palette values. The
[native contract](../../guidelines/design-theme-contract.md) owns the invariant rules. The source
companion records the existing implementation owners and smallest extension for each VCC.

| Component | SVO responsibility | Input → output | Boundary / evidence |
|---|---|---|---|
| Policy entry point | Router locates owning guidance | Affected concern → policy anchor | Authoring only; no runtime fetch |
| Appearance resolver | Resolver validates user appearance | Mode, variant, overrides → resolved appearance | Browser/local; V1/V4 |
| Native token owner | Token source supplies semantic values | Valid palette → bounded token map | Pure portable module; V2/V6 |
| Existing settings | Settings dispatch preference changes | Native controls → existing actions | Same state/persistence owner; V1/V3 |
| Rendering adapters | Adapters apply resolved appearance | Token map → DOM/editor/canvas values | Lifecycle-aware; V2/V4 |
| Existing check owners | Checks report bounded results | Exact source candidate → evidence | Local and CI; V1–V7 |

Use the existing token validator, serializer, settings registry, store and icon components. Keep
headless resolution pure; browser DOM, editor APIs and storage stay behind existing adapters. Do not
extract another package: multiple consumers already share a native owner. Build/release dependencies
remain acyclic. Code, document content and scene entities retain their own semantic coloring contracts.

### Five flows

| Flow | Existing path plus proposed extension | Failure / recovery |
|---|---|---|
| User journey | Open workspace → MainPanel Settings → Themes → choose dark variant → resume editing | Existing search and keyboard navigation locate controls; no new setup |
| Workflow | Read preference → validate → resolve mode/variant → notify native consumers → persist | Storage failure keeps session value and exposes persistence failure |
| Data | Local mode + variant + text/icon overrides → token map → renderer slots | Unknown variant falls back to Black; invalid token source fails validation |
| Orchestration/harness | Author owner change → token check → settings tests → adapters → browser evidence → review | Failed VCC blocks only dependent acceptance; no model needed at runtime |
| Topology | Local browser/storage + bundled token module/editor assets; source repository + existing CI | Offline theme switching; no service, edge deployment or new trust domain |

### Data, races and interfaces

Keep stored mode and variant independent; the reference companion specifies their compatibility
matrix. A monotonic appearance revision or equivalent current-state check prevents delayed editor
mounts from applying obsolete palettes. One publisher updates consumers; a theme change must not
reset documents, selection, undo history, viewport or user text/icon settings. Remove subscriptions
on unmount. Do not add server sync or claim cross-tab conflict resolution without an existing owner.

Token parsing remains finite and bounded. Untrusted document metadata cannot execute code, load a font,
inject arbitrary CSS or overwrite application preferences. Local user preferences are personal data;
do not transmit them or log document contents. Appearance changes move no money or external identity.

### Invocation and ecosystem — reference implementation

The supported appearance mutation surface is existing MainPanel Settings in `agentic-graph`.
Structural enforcement extends the native OS invocation register with `/design.check #read-only
@input:record.json`, CLI `design-check` and MCP `design.check`. Canvas supplies a WebMCP adapter
for the same checker and host-pinned policy. Its locked dependency and live registration await upstream
protected admission; source-level adapter proof is not deployed availability. These routes do not
mutate Settings or execute named acceptance tests. See the evidence companion for actual proof.

Users receive coherent appearance; maintainers receive fewer duplicate fixes; the product operator
owns support and release. No new provider, supplier, data processor or commercial dependency is added.
Third-party code already in the product keeps its existing license owner; this change installs none.

### Quality and resource budgets

Documentation sprint: estimated 20 active minutes; 12-file/150 KB cap, below 600 lines per file.
Always-load prompt delta: zero; all new guidance loads on demand. The guideline slice adds zero application runtime bytes. The authorized enforcement extension
has a revised 75-minute active-work cap, at most 14 OS files and six Canvas files / 50 kB source
per owner, and no new dependency. Actual module counts and bytes belong to their native check receipts. Runtime successor: target two 30-minute local sprints, at most 12 touched owner modules
and 50 KB source delta per sprint; split or re-scope before overrun. Preserve native token limits
(256 definitions, depth 16, serialized bytes 65,536) and lazy chunks below 500 kB. Measure bundle delta;
no new network fetch, service, model call, paid plan or overage is allowed.

## ADR

### ADR-01: Separate global policy from product appearance

Proposed: keep reusable policy with the existing guideline owner and use a small design entry point.
Keep exact values in the product's existing token source and workflow enforcement in the existing
harness. Alternatives: put product palettes in the workflow repository (mixes responsibilities), copy
full guidelines into every app (creates drift), or retain current scattered references (minimal effort
but leaves the observed gap). The selected approach adds links and bounded policy, no dependency.
Recovery: revert the scoped documentation change; application data is unaffected. Revisit if multiple
independent adopters demonstrate a missing portable contract, not merely because another file exists.

### ADR-02: Add a dark variant through existing Settings

Proposed: retain System/Light/Dark mode and its toolbar cycle; add a subordinate dark palette in the
same registry. Black is the default for new/reset preferences; explicitly retain Dark Blue for a
recognized legacy Dark preference during migration. The complete migration matrix is in the companion.
Alternatives: flatten the mode enum (breaks mode assumptions), hardcode the editor background (leaves
other consumers inconsistent), or add a separate appearance panel (duplicates Settings).
Cost: local code and validation only; chosen native extension and a FOSS-only manual CSS alternative
both add $0 infrastructure, egress and runtime token cost. Engineering/support time remains unmeasured;
the manual alternative repeats adapter work. Recovery restores the prior source revision and leaves
new preferences inert; no destructive storage cleanup. V1–V4 must pass before acceptance.

### ADR-03: Keep identity guidance small and native

Proposed: include voice, label and asset-owner rules in the design contract; do not create a separate
brand file in this increment. Existing native scene illustrations already have a code owner; no separate identity owner is needed.
Alternatives: introduce a blank brand template (ceremony), or duplicate palette values in identity prose
(drift). Revisit when approved assets, claims or voice rules have an accountable independent owner.
Appearance preferences remain separate from product identity. This decision invents no brand system.

## MVP

The documentation slice delivers F6's specification and source map, not its runtime acceptance.
The runtime slice is F1–F6 in the existing workspace; F7 supplies maintenance evidence. All role joins
remain at this document revision. Independent evaluation is pending, so no runtime rung is earned.

| Phase / rank | Reuse and smallest change | Exit / bounds / next owner |
|---|---|---|
| A: policy and grounded proposal / first | Existing guidelines plus native source inspection | Document checks and preserved lane; this sprint's bounds; Design maintainers |
| B: native variant / second | Settings, state, token source and generator; no new panel | V1/V4/V6, first 30-minute runtime sprint; Runtime maintainers |
| C: consumer parity / third | Editor and canvas adapters plus existing text/icon controls | V2/V3/V5, second sprint; Runtime maintainers and browser evaluator |
| D: source and delivery / dependent | Existing protected release and deploy workflows | Exact separate receipts; external wait has blocker and recheck condition, no ETA |
| E: pilot / evidence dependent | Existing workspace and operator relationship | Timed task, accepted result, optional priced service and observed payment; Product owner |

Demo (planned, 90 seconds): Hook show source-bound mismatch (15s); Probe choose Dark → Black in existing
Settings (20s); Reveal V2 same resolved appearance (20s); change text/icon settings and Dark Blue (20s);
Close reload offline and show V3/V5 (15s). Never present a source scan as this demonstration.

Experience rubric: functionality, theme alignment, technical integration and usefulness are all
unassessed for the new variants. Current proof is a code-grounded specification, not a scored runtime.
Deferred: custom palettes, standalone identity package and preference sync; Runtime maintainers revisit
only after pilot evidence. Stop if a new theme store or paid dependency is required; revisit owners.

## GTM

This enhancement is a retention/support improvement within an existing workspace, not a standalone
theme product. First-dollar hypothesis: an existing workspace operator pays for a bounded setup or
accessibility configuration session after seeing the improvement. Geography is unspecified; start with
one reachable existing operator rather than assert a market size. No payment collection is authorized.

| Stream / rank | Segment / offer | Mechanism | Demand | Collected revenue |
|---|---|---|---|---|
| S1 / 1 | Existing operator; optional $1-equivalent setup pilot, price hypothesis | Service proposal only | Unvalidated | None evidenced |
| S2 / deferred | Custom theme marketplace | No native commercial mechanism scoped | Unvalidated | None evidenced |

Acquisition: existing product help/settings documentation. Activation: complete the ≤30-second task.
Learning: one 7-day opt-in pilot measures accepted task, repeat use and support minutes. Continue when
the operator completes the task and returns without a palette workaround; revise on failed acceptance;
defer commercial expansion if no buyer accepts a priced offer. Do not send outreach or add analytics.
Market sizing is deferred: bottom-up reachable operators × observed paid conversion and top-down
verified segment spending are the two candidate methods; neither input exists yet. No TAM claim.

Financial assumptions: bootstrap, no funding ask, no new recurring infrastructure/model cost. Revenue,
conversion, labor cost and contribution margin remain unknown. Sensitivity is zero/one/repeat paid
session minus measured support time. A linked income/cash/balance projection and any audience deck or
business plan wait for actual pilot inputs; this document is not an investor projection. User payment,
profit and repeat demand require distinct evidence. Product owner tracks the same MVP roadmap.

## Coverage and handoff

At this revision, “0” is observed visual inconsistency with unknown demand; “1” is a proven native
two-variant workspace plus one measured pilot. The documentation increment only prepares that path.
Coverage dispositions are in the evidence companion. Missing commercial inputs and runtime checks
remain explicit gaps. Source acceptance, deployment and outcome acceptance require their own evidence.

Next implementation owner consumes this exact join and the source map, rechecks source drift, then
extends existing MainPanel Settings. Existing labels, icons and text/density controls are mandatory
reuse constraints. Only exact successful runtime evidence can advance the new feature's rung.
