---
title: "Media & Gaming Development Guidelines"
doc_type: "Guidelines"
version: "2.0.0"
date: "2026-10-18"
lang: "en-US"
frontmatter_contract: "required"
owner: "Media & Game Systems function"
lane: "authoring"
universal_scope: true
engine_neutral: true
runtime_readiness_policy: "fail-closed"
lifecycle_status: "proposed"
---

# Media & Gaming Development Guidelines

## Scope & Neutrality Contract

This guide applies to media and interactive experiences across content types, modalities, genres, technologies, deployment models, and team sizes. It specializes the shared product and architecture process for media and games; it does not assume that content is generated, that a game uses a real-time loop, or that delivery targets a particular device or platform.

| Property | Rule | Finding |
|---|---|---|
| Universal | Support any media or game domain, production method, and delivery model; no fixed modality list or runtime architecture | vendor-coupling |
| Neutral | Name capabilities and roles by function; a brand appears only inside a block explicitly labelled “Reference implementation” | vendor-coupling |
| Agnostic | Derive claims from artifact content and parsed metadata, never from filenames, directories, or mirrors | path-derived-claim |
| Modular | Each second-level section is self-contained and addressable by its heading | non-modular-section |
| Simple | Keep requirements checkable and load-bearing; label preferences as guidance | cid-density-violation |
| Enforceable | Each requirement names an observable artifact or state; advice that cannot fail is not a finding | unimplemented-guideline |

A specific character, product, genre, style, or platform may be part of the brief. The method stays general; the authored experience may be specific.

## Ownership and Shared Contracts

This guide owns media- and game-specific requirements for creative production, assets, interactive design, runtime architecture, delivery, and applicable cost or quality checks.

- The [PRD, TAD & ADR Guidelines](./prd-tad-adr-mvp-gtm-guidelines.md) own baseline artifact structure, Rule IDs, shared readiness, conformance, verification, and the product lifecycle.
- The [CID, RAO, and SVO contract](./cid-guidelines.md#shared-field-contract) owns the meanings and joins of those fields.
- The [ADLC Guidelines](./adlc-guidelines.md) own execution tasks, authorization, budgets, and receipts.
- A Game Design Document (GDD) specializes a PRD; a Game Technical Architecture (Game-TAD) specializes a TAD. They retain the shared contracts rather than defining parallel document or finding schemas.
- Extend an existing rule, template, finding, or flow where it already covers the need. Name the owning companion section at every cross-set seam.

**Rule classification:** An artifact-bearing requirement names an inspectable output or state. Its absence may produce unimplemented-guideline. Advisory guidance describes a useful choice; unmet guidance does not produce a finding. For any recorded finding, use the shared Rule ID and finding-recording contracts rather than a local numbering or severity scheme.

## Brief and Creative Workflow

**Requirement — Production brief:** For a media or game increment, record its purpose, intended audience or player when known, desired experience or response, content and interaction scope, approved facts or references, exclusions, and applicable language, accessibility, rights, delivery, and resource constraints. Mark unknown and inapplicable fields explicitly.

**Guidance — Select the stages that serve the work:** A production path may move from brief and concept through story or interaction design, continuity planning, scene or asset planning, creation or capture, integration or editing, and review. Combine or omit stages when the deliverable does not need them. A text-only asset need not have a storyboard; a static asset need not have an animation plan.

**Guidance — Make creative decisions legible:**

- Give each scene, shot, asset, or interaction a purpose tied to the intended experience.
- Use concrete descriptions of visible action, sound, environment, timing, and composition when those details affect the result.
- Keep recurring style or identity anchors consistent across related work when continuity matters.
- Consider keyframes or representative prototypes before producing a large set of dependent assets; this can expose composition, interaction, and continuity issues early.
- Choose individual frames, contact sheets, prototypes, or other review forms according to detail, comparison, iteration, and resource needs.
- For generated motion, a simple primary action and camera movement can be easier to control. Split complex action only when that improves production or review.
- Keep audio separate when later editing needs independent control; integrated audio may suit work whose timing is already settled.
- Add titles or translated text in post-production when likely changes make text baked into imagery costly to revise.

No fixed shot count, cast size, beat formula, reference-sheet format, prompt syntax, iteration count, or media-generation tool is universal.

## Media Asset Records and Rights

**Requirement — Asset record:** For each asset that is delivered, reused, or passed to another production stage, maintain an identifier and the source or lineage needed to locate its revision. Record only the additional metadata relevant to the asset and its intended use, such as modality, creator or generator, source reference, technical properties, license or usage conditions, review result, and dependencies.

**Requirement — Rights disposition:** Record the permitted use and any known restrictions for assets whose source or license affects distribution. An unresolved rights status is not evidence of permission. Keep the asset out of a release when its use is not established under the project’s applicable policy.

**Guidance:**

- Apply provenance to generated, captured, licensed, user-supplied, and derived assets in proportion to the traceability and reuse needs of the project.
- For generated assets, retain a safe reference to the relevant prompt, configuration, model or tool, and seed when those details are available and useful for reproduction. Do not copy sensitive or restricted input into an otherwise shareable record.
- Keep approved source assets and their revisions distinct from generated variations. Do not treat a generated variation as the source of truth without review.
- Use the project’s applicable rights and content review process. This guide does not determine legal status or prescribe a reviewer for every asset.

## Media Creation and Asset Pipelines

**Requirement — Asset pipeline when assets cross stages:** For a pipeline that creates, captures, transforms, stores, or delivers assets, record the stages that apply, each stage’s input and output, its owner, and the relevant validation, provenance, and failure behavior. Do not add empty stages merely to fit a canonical diagram.

A pipeline may use any applicable subset of:

| Stage | Inspectable decision |
|---|---|
| Source or create | Supplied, captured, authored, generated, or reused input |
| Validate | Content, format, rights, safety, accessibility, or quality checks relevant to use |
| Transform | Editing, compositing, localization, optimization, packaging, or other required change |
| Store or index | Identity, revision, retrieval, and retention needs |
| Deliver or integrate | Consumer, target profile, and acceptance check |
| Recover | Reject, retry within declared bounds, use an approved fallback, or report a typed failure |

**Guidance:** Keep provenance attached through transformations. Cache or reuse equivalent approved assets when that reduces cost or latency without violating freshness, rights, privacy, or quality requirements. Define regeneration and invalidation conditions instead of assuming every request needs new output.

## Modality and Generation Contracts

Choose modality-specific checks from the requested output and delivery profile. The list below is illustrative and extensible.

| Content type | Possible checks when applicable |
|---|---|
| Text | Factual support, structure, language, terminology, reading needs, and content restrictions |
| Audio | Duration, intelligibility, loudness, format, voice or source permissions, and synchronization |
| Image or visual composition | Dimensions, crop, visual continuity, contrast, accessibility description, and source rights |
| Video or animation | Duration, frame rate, synchronization, motion continuity, captions, and delivery format |
| Interactive or spatial content | Input and feedback behavior, state transitions, responsiveness, persistence, accessibility, and target constraints |

**Requirement — Generation contract when generation is used:** Specify accepted inputs, expected output, applicable checks, resource bounds, and what happens when generation or validation fails. Use a fallback only if it is approved for the intended experience; otherwise return a clear failure.

- Validate generated output against the requirements that matter to its use before delivery.
- Apply content-safety or audience checks when the content, audience, or distribution context requires them; record the check and result.
- Bound a repeating or retrying generation process. Reuse the shared loop and budget rules; do not create an unbounded retry path.
- Record generation cost when it is material to an agreed budget, product economics, or operational limit. Reuse the shared cost record rather than inventing a media-only schema.
- Do not treat generated, captured, or transformed content as automatically accurate, safe, consistent, or rights-cleared.

## Game Design Document

A GDD carries the shared PRD requirements and adds only the game-design information needed to define and validate the intended experience. Use the shared PRD template and extend it where necessary; do not duplicate unchanged sections.

**Requirement — Game design record:** As applicable to the game, record:

- Intended player experience and audience, distinguishing evidence from assumptions.
- Player actions, responses, game states, and the interaction or gameplay loop when one exists. For a form without a recurring loop, describe its progression or interaction structure instead.
- Rules, systems, content, choices, progression, narrative, and dependencies that materially shape the experience.
- User or player stories and acceptance criteria linked to observable outcomes and checks.
- Scope, exclusions, risks, accessibility needs, target profiles, and unresolved design questions.
- Success measures that test the intended experience; select metrics for the game rather than requiring a universal retention, engagement, or monetization measure.

**Guidance:** Prototype the smallest interaction or content slice that can answer the current design question. Validate experiential claims with an appropriate playtest, observation, or other named check; subjective intent can be recorded, but does not by itself prove an acceptance criterion.

## Game Technical Architecture

A Game-TAD carries the shared TAD requirements and adds technical detail for the game’s actual interaction and runtime model.

**Requirement — Game architecture record:** Describe the component responsibilities, interfaces, state ownership, data flow, failure behavior, and deployment boundaries needed to implement the accepted game requirements. Include relevant input handling, simulation, rendering, persistence, networking, media delivery, and accessibility paths.

**Guidance — Choose relevant runtime contracts:**

- For real-time or tick-based systems, declare the update model, timing assumptions, performance target, measurement method, and overload behavior.
- For turn-based, event-driven, narrative, asynchronous, or other models, describe their actual state transitions and response expectations instead of imposing a frame loop.
- Specify deterministic or replayable behavior only where save/replay, synchronization, simulation, or testing requires it.
- Use any entity, component, object, or data-oriented organization that fits the architecture. No engine pattern is universal.
- Bound recurring simulation and generation work when a runaway loop could affect resource use, responsiveness, or safety. State the bound and recovery behavior.

## Interaction and Media Flows

**Requirement — Flow record when needed:** For a feature with multiple states, components, or failure paths, record the flow that connects its user or player goal to the responsible components and observable outcome. Include alternate, failure, recovery, and exit paths that materially affect the experience.

**Guidance — Model the actual process:** An interaction flow may begin with an input or event, change state, produce feedback, and continue, pause, or exit. A media flow may source or create an asset, validate it, transform it, and deliver it. These are patterns, not required step orders; use the sequence and names that match the system.

Tie each flow to the requirement or user journey it serves. Do not add a separate flow document when the same information is already clear in an addressable section of the PRD or TAD.

## Performance, Delivery, and Economics

**Requirement — Delivery profile:** For each release target that materially changes the experience, state the applicable performance, payload, memory, latency, accessibility, offline, compatibility, and quality constraints. Give each selected constraint a target and a check. Mark dimensions outside the scope as not applicable; do not invent universal ceilings.

**Guidance:**

- Derive targets from the intended experience, audience, supported environment, and evidence. Do not assume browser, mobile, offline, or a specific frame rate is always in scope.
- Measure the behavior that matters to the feature: for example, frame time for a real-time loop, load time for a large asset, or response time for an interactive service.
- Serve an asset that meets the declared quality need within the target profile. Use variants or progressive delivery when they solve an evidenced constraint.
- Estimate generation, transformation, storage, and delivery costs when they affect a budget or decision. Record assumptions and compare actual use with the estimate when operating at scale.
- Re-evaluate a quality or fidelity increase against its user value, delivery constraints, and cost; maximum quality is not a universal target.

## Lifecycle and Readiness

Follow the shared [PRD, TAD & ADR lifecycle](./prd-tad-adr-mvp-gtm-guidelines.md) and [Readiness & Lane Topology](./prd-tad-adr-mvp-gtm-readiness.md). Media and game additions specialize the checks; they do not create a competing phase sequence or readiness ladder.

- Establish media, game, rights, and delivery risks in the owning PRD or TAD at the phase where they affect a decision.
- Derive readiness from the shared ladder and Evidence References. A draft, playable prototype, approved asset, or content-complete milestone may describe local scope; none substitutes for a readiness rung.
- Revisit affected checks when an asset, content pipeline, target profile, game system, or accepted requirement changes.
- Keep release promotion subject to the shared authorization, evidence, and rollback boundaries.

## Conformance Findings

The shared [Verification & Conformance module](./prd-tad-adr-mvp-gtm-verification.md) owns Rule IDs, finding fields, severities, and recording determinism. This section adds only media- and game-specific Finding Types.

| Category | Finding Type | Default severity |
|---|---|---|
| Provenance | missing-provenance-record | major |
| Rights | unlicensed-asset-use | blocker |
| Content validation | unsafe-generation-output | blocker |
| Runtime performance | frame-budget-breach | major |
| Flow | orphaned-game-loop-flow | major |
| Flow | orphaned-media-generation-flow | major |

- Add a new Finding Type here before adding a rule that raises it.
- Reuse shared Finding Types such as unbounded-loop, incomplete-delivery-reach, missing-economics-metric, stale-evidence, and unimplemented-guideline where they apply.
- Do not use a local Finding Type for a preference or for a gap already represented by the shared enumeration.

## Anti-Pattern Guards

| Avoid | Use instead |
|---|---|
| Assuming all media is generated or fits a fixed set of modalities | Declare the actual content types and creation methods in scope |
| Requiring the same scene formula, shot count, cast size, or visual style for every project | Choose structure and continuity practices from the brief |
| Assuming a specific engine, entity model, timestep, frame rate, platform, or deployment mode | Record the architecture and targets that apply to the product |
| Treating an asset’s origin as proof of permission, accuracy, safety, or quality | Keep source, rights disposition, and validation evidence explicit |
| Requiring human approval for every asset regardless of context | Name the authorized review gate when the project’s policy or risk requires one |
| Requiring browser/mobile/offline budgets when those targets are out of scope | Define only the delivery profiles and checks that apply |
| Retrying or regenerating without a bound, cost basis, or failure path | Set relevant resource bounds and an approved recovery path |
| Requiring every flow, ladder, budget table, or pipeline stage for every feature | Add an artifact only when a requirement, risk, or consumer needs it |

## Validation Checklist

Apply only checks relevant to the scope. Record results and open issues in the owning artifact or its review record.

- [ ] The brief identifies intended experience, scope, constraints, approved references, and important unknowns.
- [ ] GDD requirements and acceptance checks trace to the shared PRD contract.
- [ ] Game-TAD components, state, interfaces, flows, and failure paths trace to accepted requirements.
- [ ] Asset records preserve identity, revision, source, and applicable usage restrictions through delivery.
- [ ] Generated content has applicable quality, safety, and provenance checks before use.
- [ ] Selected delivery targets have measurable constraints and current Evidence References.
- [ ] Repeating generation or runtime work has applicable bounds and recovery behavior.
- [ ] Cost estimates, actuals, or cache rules are recorded when required by the shared economics contract or project budget.
- [ ] Readiness and promotion use the shared ladder, evidence, and Deploy Boundary.
- [ ] Findings use the shared recording contract and this section’s additive enumeration.

## Roles and Outcomes

Use functional roles from the shared RAO contract. One role may cover multiple actions when ownership and review remain clear; use an independent evaluator where the shared contract requires one.

| Role | Action | Observable outcome |
|---|---|---|
| Experience designer | Defines intended experience, interaction, content scope, and acceptance checks | Brief or GDD sections traceable to user or player outcomes |
| Media or asset owner | Specifies asset sources, transformations, relevant constraints, and validation | Addressable assets with applicable provenance and delivery records |
| Runtime architect | Assigns system responsibilities, interfaces, state, flow, and target budgets | Game-TAD sections and checks for the accepted requirements |
| Reviewer | Evaluates applicable content, rights, quality, performance, and delivery checks | Review record with evidence, findings, and unresolved decisions |

## Mantra Application

**“Ground the experience · Choose only the needed workflow · Preserve asset lineage · Measure declared targets · Reuse shared contracts · Let evidence earn readiness”**

- **Ground the experience:** start with the intended audience, purpose, and constraints.
- **Choose only the needed workflow:** select creative and technical stages that reduce risk or support a required outcome.
- **Preserve asset lineage:** carry source identity and applicable rights through transformations.
- **Measure declared targets:** quality and performance are judged against the delivery profile.
- **Reuse shared contracts:** keep requirements, roles, findings, and readiness interoperable.
- **Let evidence earn readiness:** a claim about playability or polish is not a substitute for a named check.
