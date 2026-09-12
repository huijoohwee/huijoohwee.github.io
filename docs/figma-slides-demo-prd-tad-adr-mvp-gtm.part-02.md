---
title: "Reference implementation: figma-slides-demo-prd-tad-adr-mvp-gtm section 2"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.1.1"
date: "2026-09-12"
lang: "en-US"
owner: "Product maintainers"
continuity_id: "PLAN-FIGMA-SLIDES-DEMO-PRD-TAD-ADR-MVP-GTM"
prd_revision: "0.1.1"
tad_revision: "0.1.1"
adr_revision: "0.1.1"
mvp_revision: "0.1.1"
gtm_revision: "0.1.1"
local_rung: "undocumented"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
worktree_id: "device-cba000d3779d--planning-v27"
agent_id: "codex-01a0940a"
parent: "figma-slides-demo-prd-tad-adr-mvp-gtm.md"
guideline_revision: "2.7.0"
source_section_lines: "478-713"
---

[Combined planning owner](figma-slides-demo-prd-tad-adr-mvp-gtm.md) · `PLAN-FIGMA-SLIDES-DEMO-PRD-TAD-ADR-MVP-GTM@0.1.1`. This companion preserves the source section; diagrams and frontmatter projections remain owned by the combined artifact.

### Performance

- Scenario: Presenter submits a prompt during a live talk.
- Stimulus: User clicks `Add new node`.
- Response: UI should acknowledge pending state immediately, then reflect the new branch without manual refresh.
- Target: Immediate pending feedback; successful mutation visible within a few seconds under normal network conditions.

### Reliability

- Scenario: A generated branch fails or creates unusable state.
- Stimulus: Presenter invokes room reset.
- Response: System must restore seed state without reloading the entire app.

### Security

- Scenario: Non-presenter user attempts privileged reset.
- Stimulus: Reset request without valid presenter credential.
- Response: Server rejects the request; client remains in participant mode.

### Observability

- Scenario: A live session experiences degraded interactivity.
- Stimulus: Socket instability or mutation errors.
- Response: System should expose actionable client-visible states and server-side request traces for mutation endpoints.

### Usability

- Scenario: First-time participant joins mid-session.
- Stimulus: Route opens on active talk room.
- Response: User can identify what to look at and where to type within seconds.

## 14. Probable Source-Tree Reconstruction

```text
src/
  main.tsx
  router/
    routes.tsx
  routes/
    aie/
      AieRoute.tsx
      AieLoadingScreen.tsx
      AieNameEntry.tsx
      AieTalkShell.tsx
      context/
        TalkContext.tsx
      hooks/
        useAudienceId.ts
        usePresenterAuth.ts
        useTalkIdentity.ts
        useCollaboratorPresence.ts
        useActiveRegions.ts
      collaboration/
        createMuxSocket.ts
        talkRoomIds.ts
        tldrawStore.ts
      components/
        TopRightChrome.tsx
        ResetDialog.tsx
        FallbackOverlay.tsx
        CardPromptOverlay.tsx
        ActiveRegionOverlay.tsx
        GameConnectorOverlay.tsx
      shapes/
        TalkStateShape.tsx
        TalkGameShape.tsx
        TalkFigmaSlidesShape.tsx
      seed/
        seedTalkState.ts
        seedSlides.ts
        seedGames.ts
        layoutVariants.ts
        zoomToSeedBounds.ts
      llm/
        forkVariant.ts
        rewriteVariant.ts
      theme/
        talkTheme.css
        talkTokens.ts
      types/
        talk.ts
        gameCard.ts
        presenter.ts

public/
  talk-fallback/
    demo.mp4

server/
  api/
    talk/
      login.ts
      reset.ts
      llm/
        fork.ts
        regen-code.ts
    mux/
      [roomId].ts

shared/
  prompts/
    game-fork.prompt.ts
    game-rewrite.prompt.ts
  schemas/
    talkMutation.ts
    gameCard.ts
```

### Reconstruction Notes

- `React Router` is strongly indicated by the route table embedded in the production bundle.
- `tldraw` custom shape utilities are strongly indicated by the custom `talk-state`, `talk-game`, and `talk-figma-slides` shape types.
- The room id appears hardcoded as `talk-demo-v10` in the client bundle.
- Presenter mode is inferred from localStorage/sessionStorage use and authenticated fetch wrappers.

## 15. Requirement-to-Implementation Traceability

| Requirement | Components | Interfaces |
| --- | --- | --- |
| PRD-E1-S1 | TAD-C1, TAD-C5, TAD-C6, TAD-C7, TAD-C8 | Collaboration socket, seed initialization |
| PRD-E1-S2 | TAD-C5, TAD-C7, TAD-C8, TAD-C10 | Canvas rendering, layout engine |
| PRD-E2-S1 | TAD-C8, TAD-C9, TAD-C10, TAD-C11 | `POST /api/talk/llm/fork` |
| PRD-E2-S2 | TAD-C8, TAD-C9, TAD-C11 | `POST /api/talk/llm/regen-code` |
| PRD-E3-S1 | TAD-C2, TAD-C4, TAD-C5 | Session bootstrap, collaboration transport |
| PRD-E3-S2 | TAD-C12, TAD-C13 | Presence and active-region overlays |
| PRD-E4-S1 | TAD-C3, TAD-C14 | `POST /api/talk/login`, `POST /api/talk/reset` |
| PRD-E4-S2 | TAD-C15 | Fallback asset check and overlay logic |

## 16. How I'd Rebuild This

### Phase 0 - Confirm Product Shape

1. Validate whether the experience is presentation-first, workshop-first, or reusable as a general product surface.
2. Decide whether `talk-game` is a specific content type or a placeholder for a generic "AI artifact card."
3. Confirm trust model for presenter controls.

### Phase 1 - Ship the Narrowest Vertical Slice

1. Build a React route for `/aie`.
2. Mount a `tldraw` canvas with custom theme and reduced default chrome.
3. Add lightweight name entry and audience id persistence.
4. Seed one locked slide embed shape and one artifact card shape.
5. Connect a single collaboration room through the mux endpoint.

Deliverable:
A working shared canvas with slides and one editable card, but no forking yet.

### Phase 2 - Add Artifact Iteration

1. Define card schema with source, plan, status, lineage, and author metadata.
2. Implement prompt overlay anchored under selected/hovered cards.
3. Add `Make edits` and `Add new node` actions.
4. Wire rewrite and fork endpoints.
5. Render pending, success, and error states directly on cards.

Deliverable:
Users can mutate one artifact in place or create a visible branch.

### Phase 3 - Add Tree Semantics and Spatial Legibility

1. Implement lineage-aware layout for child variants.
2. Draw connectors between parent and child nodes.
3. Auto-zoom to seeded or changed regions when appropriate.
4. Add active-region highlighting for collaborators.

Deliverable:
The experience becomes legible as a branching narrative, not just a bag of cards.

### Phase 4 - Add Presenter Operations

1. Add presenter login check and local credential cache.
2. Wrap privileged requests with presenter-auth header injection.
3. Implement reset modal and cooldown behavior.
4. Add fallback overlay and shortcut-driven recovery mode.

Deliverable:
Presenter can recover gracefully during a live session.

### Phase 5 - Harden for Reuse

1. Replace hardcoded room ids and seed payloads with configuration.
2. Generalize artifact card type beyond game demos if product direction supports it.
3. Add telemetry for join, prompt submit, fork, rewrite, reset, and fallback usage.
4. Add server-side rate limiting and moderation policy for public sessions.

Deliverable:
A platform-ready version rather than a single curated demo route.

## 17. Implementation Risks

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Hardcoded seeds and room ids limit reuse | Medium | Externalize content config and room configuration |
| Presenter auth stored locally is too weak for broader exposure | High | Move to account-backed auth or signed short-lived session tokens |
| AI mutation latency disrupts live flow | High | Show immediate pending states, precompute context, stream partial updates if possible |
| Branch trees become visually overwhelming | Medium | Add collapse, filtering, or branch focus modes |
| Collaboration and HTTP mutations drift out of sync | High | Use server-authoritative room updates and idempotent mutation reconciliation |

## 18. Review Checklist

- [x] User journeys documented before detailed stories
- [x] Epics decomposed into user stories with Given-When-Then criteria
- [x] MoSCoW prioritization included
- [x] Success metrics stated with measurable targets
- [x] Component inventory and architecture diagram included
- [x] Workflow and data flow sections included
- [x] Integration contracts documented
- [x] Requirement-to-implementation traceability included
- [x] Open questions and assumptions made explicit

## Planning revision — reference implementation

All five roles below consume `PLAN-FIGMA-SLIDES-DEMO-PRD-TAD-ADR-MVP-GTM@0.1.1`. Existing source and runtime observations retain their original revisions and scope; this documentation update renews no deployment or demand evidence. The guideline is [v2.7.0](https://github.com/huijoohwee/huijoohwee.github.io/blob/e8d2a10a8d3e5735c43edf350a22523df05fdf91/guidelines/prd-tad-adr-mvp-gtm-guidelines.md); the shared maturity rubric loads on demand.

| Role | Owning content at this revision |
|---|---|
| PRD | [6. PRD Requirements](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#6-prd-requirements) |
| TAD | [7. TAD Component Inventory](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#7-tad-component-inventory) |
| ADR | [12. Architectural Decisions](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#12-architectural-decisions) |
| MVP | [MVP — reference implementation](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#mvp--reference-implementation) |
| GTM | [GTM — reference implementation](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#gtm--reference-implementation) |

## MVP — reference implementation

Reuse the minimum scope, acceptance conditions and component owners identified above. The demonstration must follow the documented entry, permitted action, durable outcome and readback, including its stated failure/recovery path. Use `npm run check` for its actual coverage and the named feature checks in the specification; attach exact source, command, result and authoring/mirror/delivery surface to each VCC before advancing readiness. A source locator or structural check alone proves no user outcome.

Record the observed steps and elapsed time against the existing TTV target. If no target or invocation is stated, the demonstration remains unverified until the document owner supplies it. All four experience criteria are **unassessed** in this authoring review: Core Requirements & Functionality, Innovation & Theme Alignment, Technical Execution & Integration, and Usefulness & Agentic Experience. No scored user observation is attached to this revision; the document owner must capture a timed pilot and criterion-specific evidence.

## GTM — reference implementation

Use the stated persona and pain hypothesis to test one priced pilot in the existing user environment. Keep the documented free/self-serve workflow as the comparison; additional hosting, channels or agent roles require an evidenced constraint or buyer need. Record the buyer’s workaround, frequency, accepted outcome, offered price, observed response and support minutes before ranking a commercial winner. Demand, collected payment and repeat use remain unvalidated by this documentation review; mechanism evidence keeps its narrower original scope. Measure tokens, cash expense and maintenance separately for each proposed deployment model. Feed actual pilot outcomes into a successor Context using the shared four-column planning record.

## Planning gaps — reference implementation

Source review is bounded to repository `e8d2a10a8d3e5735c43edf350a22523df05fdf91`. No feature implementation artifact was independently bound by this document review; implementation disposition remains **unverified** pending the document owner’s source-to-VCC check.
Experience observations, current VCC execution and buyer/payment evidence are unverified here. This is a bounded planning update, not a full-guideline conformance verdict; historical conformance percentages above apply only to their recorded profile and revision.
