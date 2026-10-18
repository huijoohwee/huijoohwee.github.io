---
title: "Video Script Generation Guidelines"
doc_type: "Guidelines"
date: "2026-10-18"
lang: "en-US"
frontmatter_contract: "required"
version: "2.0.0"
universal_scope: true
---

# Video Script Generation Guidelines

## Scope & Neutrality Contract

This guide applies to video scripts and script-generation workflows across subjects, languages, genres, runtimes, production methods, and delivery formats. The method stays general; the resulting script may be highly specific to its brief.

| Property | Rule | Finding |
|---|---|---|
| Universal | Support any subject and purpose; do not assume a product, character, genre, runtime, tool, or platform | vendor-coupling |
| Neutral | Name capabilities by function; use a brand only inside a block explicitly labelled “Reference implementation” | vendor-coupling |
| Agnostic | Derive requirements from the brief and parsed metadata, never from a filename, directory, or mirror | path-derived-claim |
| Modular | Each second-level section is independently usable and addressable by its heading | non-modular-section |
| Simple | Keep requirements checkable and load-bearing; mark preferences as guidance | cid-density-violation |

A subject-specific name, claim, or style is valid when supplied or approved as content in the brief. It is a defect only when the generation method silently assumes it.

## Purpose and Use

A video script may contain spoken words, dialogue, visible action, on-screen text, sound, timing, or a shot plan. Include only the elements needed by the requested work and production process. A text-only script does not need a storyboard; a storyboard does not need dialogue if none is intended.

**Requirement — Script brief:** Create a concise brief for each script. Record the requested purpose, subject, intended audience when known, desired audience response, core message, approved facts and their sources, tone or style if specified, language, known delivery constraints, available references, and exclusions. Mark unknown or inapplicable fields explicitly rather than filling them by guesswork.

**Guidance:** A one-sentence concept can help align a team, but do not force an advertising concept or a fixed narrative formula onto other kinds of video.

## Markdown Metadata and Provenance

- A canonical Markdown script specification starts with valid YAML frontmatter. Use plain YAML for authored metadata; use typed wrappers only in fixtures that test parsing or rendering.
- Put reusable settings, declared variants, timing assumptions, and placeholder definitions in metadata or a shared configuration when they are consumed more than once. Do not add a configuration layer to a one-off script without a concrete reuse need.
- Quote YAML values containing reserved punctuation. A parser or renderer must not silently repair malformed authored metadata.
- Identify facts, assumptions, and creative proposals distinctly. Keep a source or revision reference for supplied facts and approved creative references. A path can locate material but does not establish its identity or truth.

## Directive Grammar and Rule Classification

Use the shared [CID, RAO, and SVO contract](./cid-guidelines.md#shared-field-contract) for context, intent, directive, role, action, outcome, subject, verb, and object. This guide adds no alternate field meanings.

- **Artifact-bearing requirement:** Names a script record, brief, beat map, delivery profile, or review record that can be inspected. If the required artifact is absent, record unimplemented-guideline.
- **Advisory guidance:** Recommends a creative or production choice without requiring it. Unmet guidance does not produce a finding.
- When recording a finding, derive the Rule ID from its owning section anchor and the rule’s ordinal in that section. Include the rule text with the ID; do not identify a rule by filename, line number, or directory.
- Reuse the repository’s conformance vocabulary and recording contract in [Verification & Conformance](./prd-tad-adr-mvp-gtm-verification.md). Do not create a parallel finding enumeration here.

## Creative Spine and Beat Map

**Requirement — Beat map:** For work that needs timed or sequenced scenes, create a beat map that gives each beat an identifier, order or time range, purpose, intended change in information or feeling, and the principal action or reveal. Include spoken words, visible text, sound, and transition details where they affect the beat.

**Guidance:**

- Choose a structure that serves the brief. A sequence may explain, observe, instruct, persuade, entertain, or combine purposes; no single arc is universal.
- Give each beat and shot a clear job. Remove or revise material that repeats a point without adding meaning, action, or feeling.
- Set timing from the requested runtime and content. Check that beat durations fit the total; mark estimates as estimates and preserve intentional pauses.
- Let pacing vary with the material. A slow → fast → slow pattern is one option, not a default rhythm.
- Keep the primary message coherent. If the brief has several priorities, rank them instead of implying that every shot can emphasize all of them equally.

## Script and Shot Plan

**Requirement — Script record:** Separate spoken dialogue, narration, visible action, on-screen text, sound, and production directions so a reader or tool can tell what is heard, seen, and performed. Identify the speaker when speech is present. Distinguish approved factual claims from illustrative or fictional content.

**Requirement — Shot plan when requested or needed:** Give each shot a stable identifier and enough information to produce and review it: its beat or time range, purpose, subject and action, framing or viewpoint, relevant environment and visual treatment, camera movement when specified, dialogue or text, sound, and transition or continuity notes as applicable. Label intentionally unspecified details instead of inventing them.

**Guidance:**

- Describe concrete visible and audible details. Subject + action + environment + framing + visual treatment is a useful prompt order, not a required syntax.
- For a short generated clip, one primary action and one camera move usually make motion easier to control. Split complex action into shots, or state the intended sequence clearly when it must remain together.
- Vary shot scale and viewpoint to serve information and emotion. Close-ups, wide shots, and alternate angles are choices for coverage, not required quotas.
- Reserve uncluttered space for titles or captions only when the edit needs it.
- Use direct action sentences for production directions. Keep dialogue natural to the selected voice rather than forcing every spoken line into a formula.

## Continuity and Reference Assets

**Requirement — Continuity record when continuity matters:** Record the approved identity and visual or audio traits that must persist across shots, along with the reference assets or source revisions that establish them. Include only traits relevant to the work, such as appearance, materials, wardrobe, setting, palette, lighting, voice, or sound.

**Guidance:**

- Reuse a small set of deliberate anchors across related prompts and shots so the work reads as one piece.
- Create a turnaround, reference sheet, scene board, or other continuity asset only when repeated views or production risk make it useful.
- Keep location, lighting, palette, and materials stable across adjacent shots unless a change is intentional.
- Do not preserve a mistaken generated detail as canon. Reconcile each new result against the approved brief and references.

## Storyboards and Generated Media

**Requirement — Storyboard when requested or useful:** Map each planned frame to its beat or shot identifier. Record important visual decisions and note where a reference image or unresolved choice affects continuity.

**Guidance:**

- Consider generating representative keyframes before animating. Reviewing high-value or high-risk frames can expose composition and continuity problems early and reduce avoidable rework.
- Generate frames individually when detail and revision control matter; use a panel or contact sheet when comparison speed or resource limits matter. Choose based on the task and the tool’s actual capabilities.
- Keep style descriptions consistent across related prompts. Prefer specific observable properties over generic praise words.
- Treat generated images and clips as drafts until checked against the brief, references, and intended edit.

## Motion, Audio, and Editing

**Requirement — Production notes:** Record motion, audio, and editing constraints that materially affect the requested result. If a dimension is out of scope or undecided, label it rather than assuming a default.

**Guidance:**

- For image-to-video or other generated motion, state the starting state, primary action, camera behavior, and ending state when those details matter. Keep motion physically and temporally plausible for the selected clip.
- Do not presume narration, dialogue, music, sound effects, silence, or a particular mix. Specify the intended audio elements and their relationship to action.
- Separate audio from generated clips when later trimming or rearrangement is likely to require independent control. Integrated audio can be faster when the timing is settled and edit flexibility is not needed.
- Assemble shots to preserve meaning, continuity, rhythm, and the intended audience response. Add transitions, captions, graphics, or music only when they serve the brief.
- For text likely to change or be translated, consider adding it in editing rather than baking it into generated imagery.
- Take aspect ratio, frame rate, resolution, caption format, and other technical values from the declared delivery profile. Do not infer them from a platform name or assume one universal profile.

## Reusable Generation Prompt

Use or adapt this prompt when a structured first draft will help. Remove fields that do not apply; do not require the generator to invent missing facts.

~~~text
Use the supplied brief and approved references to create the requested video-script materials.

Brief:
- Purpose:
- Subject:
- Intended audience (if known):
- Desired audience response:
- Core message:
- Approved facts and sources:
- Tone or style:
- Language:
- Runtime or timing constraints:
- Delivery requirements:
- Available references:
- Exclusions:

Requirements:
- Keep supplied facts, assumptions, and creative proposals distinguishable.
- Do not introduce unsupported claims or unstated subject, genre, or platform assumptions.
- Make the beats serve the stated purpose; give each beat or shot a clear function.
- Keep visual, spoken, on-screen text, and audio instructions distinguishable.
- Mark missing information as unspecified. Ask a concise question only if the missing choice blocks a useful draft.
- Produce only the requested deliverables.

Return, as applicable:
1. Brief interpretation and any material assumptions.
2. One-sentence concept.
3. Beat map with order or time, purpose, action or reveal, and relevant sound or text.
4. Script and shot plan.
5. Continuity and reference notes.
6. Delivery and review notes.
~~~

## Review and Validation

**Requirement — Review record:** For a deliverable intended for production or handoff, record the checks performed, results, unresolved issues, and next decision or owner. Mark checks pass, issue, or not applicable; a claim of readiness is not a substitute for evidence.

Check only dimensions relevant to the brief:

- **Brief coverage:** purpose, audience response, core message, constraints, and exclusions are reflected in the script.
- **Accuracy:** factual claims trace to approved sources; assumptions and inventions are visible.
- **Structure:** beats have purpose, order, and transitions; timing is coherent with the requested duration.
- **Performance:** spoken text fits its time estimate and directions can be interpreted consistently.
- **Continuity:** recurring subjects, settings, and style match approved references or explain intentional changes.
- **Production:** actions, camera instructions, sound, and edit notes are feasible for the declared production method.
- **Delivery:** technical and accessibility requirements in the delivery profile are met or recorded as open issues.

A script can pass without a storyboard, continuity sheet, or delivery profile when those artifacts are outside the requested scope. Do not treat their absence as a defect unless a requirement above made them necessary.

## Roles and Outcomes

Keep role names functional and assign only the responsibilities needed for the work. One person or system may perform several roles when the scope allows it.

| Role | Action | Observable outcome |
|---|---|---|
| Brief owner | Supplies purpose, constraints, approved facts, and references | Inspectable brief with unknowns and exclusions identified |
| Script author | Converts the brief into the requested script and supporting records | Script and applicable beat, shot, or continuity records |
| Reviewer | Checks the work against its brief and records results | Review record with evidence, gaps, and next decision |

## Node and Workflow Modularity

Use the authoring and orchestration structure that fits the intended production process. Separate source material, creative decisions, timing, visual direction, audio, assembly, and delivery when that separation improves reuse or review. Combine them when separate modules add overhead without a clear benefit.

When a workflow uses machine-readable components, declare only the interfaces and types required by its actual consumers. Keep repeated values in a shared source when they need one owner; preserve each work product’s native, human-readable form when no machine interface requires another representation.

## Mantra Application

**“Ground the brief · Make every beat purposeful · Keep the method neutral · Preserve only needed continuity · Iterate against evidence · Deliver to the declared profile”**

- **Ground the brief:** supplied facts, references, and constraints outrank inferred defaults.
- **Make every beat purposeful:** each shot advances information, action, mood, or transition.
- **Keep the method neutral:** the script can name a particular subject; the generator must not assume one.
- **Preserve only needed continuity:** carry forward approved anchors and correct drift.
- **Iterate against evidence:** use keyframes, drafts, and review notes to decide what to refine.
- **Deliver to the declared profile:** format choices come from the request or a named delivery profile.
