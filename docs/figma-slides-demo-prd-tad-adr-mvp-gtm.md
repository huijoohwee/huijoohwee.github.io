---
title: "Figma Slides Demo Canvas - PRD-TAD-ADR-MVP-GTM"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.1.1"
status: "draft"
date: "2026-09-12"
lang: "en-US"
owners:
  - "product"
  - "frontend"
  - "platform"
source_basis:
  - "Live route analysis of https://aoshe.ng/aie on 2026-05-16"
  - "Production bundle inspection: /assets/index-Pdfrf5ta.js"
  - "Production stylesheet inspection: /assets/index-ByJ_i7IO.css"
owner: "Product maintainers"
frontmatter_contract: "required"
continuity_id: "PLAN-FIGMA-SLIDES-DEMO-PRD-TAD-ADR-MVP-GTM"
local_rung: "undocumented"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
worktree_id: "device-cba000d3779d--planning-v27"
agent_id: "codex-01a0940a"
guideline_revision: "2.7.0"
guideline_source: "https://github.com/huijoohwee/huijoohwee.github.io/blob/e8d2a10a8d3e5735c43edf350a22523df05fdf91/guidelines/prd-tad-adr-mvp-gtm-guidelines.md"
reviewed_source_revision: "e8d2a10a8d3e5735c43edf350a22523df05fdf91"
previous_document_version: "0.1.0"
prd_revision: "0.1.1"
tad_revision: "0.1.1"
adr_revision: "0.1.1"
mvp_revision: "0.1.1"
gtm_revision: "0.1.1"
---

# Reference implementation: Figma Slides Demo Canvas - PRD-TAD-ADR-MVP-GTM

This combined planning artifact joins `PLAN-FIGMA-SLIDES-DEMO-PRD-TAD-ADR-MVP-GTM@0.1.1`. Sections are split solely to keep each authored file below 600 lines. Existing source observations retain their recorded scope and revision. The links below preserve the original section anchors and locate the unchanged requirement/design/decision text plus the current MVP/GTM assessment.

- <a id="markdown-yaml-frontmatter-contract"></a>[Markdown YAML Frontmatter Contract](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#markdown-yaml-frontmatter-contract)
- <a id="1-document-purpose"></a>[1. Document Purpose](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#1-document-purpose)
- <a id="2-problem-discovery"></a>[2. Problem Discovery](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#2-problem-discovery)
- <a id="21-problem-statement"></a>[2.1 Problem Statement](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#21-problem-statement)
- <a id="22-hypothesis"></a>[2.2 Hypothesis](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#22-hypothesis)
- <a id="23-assumptions"></a>[2.3 Assumptions](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#23-assumptions)
- <a id="24-scope-of-this-reconstruction"></a>[2.4 Scope of This Reconstruction](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#24-scope-of-this-reconstruction)
- <a id="3-personas-and-jobs-to-be-done"></a>[3. Personas and Jobs-to-be-Done](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#3-personas-and-jobs-to-be-done)
- <a id="31-persona-presenter"></a>[3.1 Persona: Presenter](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#31-persona-presenter)
- <a id="32-persona-audience-participant"></a>[3.2 Persona: Audience Participant](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#32-persona-audience-participant)
- <a id="33-persona-technical-facilitator"></a>[3.3 Persona: Technical Facilitator](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#33-persona-technical-facilitator)
- <a id="4-user-journey-flow"></a>[4. User Journey Flow](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#4-user-journey-flow)
- <a id="journey-presenter---run-a-live-interactive-demo"></a>[Journey: Presenter - Run a Live Interactive Demo](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#journey-presenter---run-a-live-interactive-demo)
- <a id="journey-audience-participant---contribute-a-live-idea"></a>[Journey: Audience Participant - Contribute a Live Idea](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#journey-audience-participant---contribute-a-live-idea)
- <a id="5-workflow-flow"></a>[5. Workflow Flow](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#5-workflow-flow)
- <a id="workflow-join-and-initialize-live-session"></a>[Workflow: Join and Initialize Live Session](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#workflow-join-and-initialize-live-session)
- <a id="workflow-prompt-a-card-and-create-a-fork"></a>[Workflow: Prompt a Card and Create a Fork](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#workflow-prompt-a-card-and-create-a-fork)
- <a id="workflow-reset-the-room"></a>[Workflow: Reset the Room](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#workflow-reset-the-room)
- <a id="6-prd-requirements"></a>[6. PRD Requirements](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#6-prd-requirements)
- <a id="61-product-goals"></a>[6.1 Product Goals](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#61-product-goals)
- <a id="62-epics"></a>[6.2 Epics](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#62-epics)
- <a id="prd-e1-seeded-live-presentation-surface"></a>[PRD-E1 Seeded Live Presentation Surface](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#prd-e1-seeded-live-presentation-surface)
- <a id="prd-e2-inline-ai-assisted-card-iteration"></a>[PRD-E2 Inline AI-Assisted Card Iteration](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#prd-e2-inline-ai-assisted-card-iteration)
- <a id="prd-e3-multi-user-collaboration-and-presence"></a>[PRD-E3 Multi-User Collaboration and Presence](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#prd-e3-multi-user-collaboration-and-presence)
- <a id="prd-e4-presenter-recovery-controls"></a>[PRD-E4 Presenter Recovery Controls](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#prd-e4-presenter-recovery-controls)
- <a id="63-moscow-prioritization"></a>[6.3 MoSCoW Prioritization](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#63-moscow-prioritization)
- <a id="64-success-metrics"></a>[6.4 Success Metrics](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#64-success-metrics)
- <a id="65-explicit-exclusions"></a>[6.5 Explicit Exclusions](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#65-explicit-exclusions)
- <a id="66-open-questions"></a>[6.6 Open Questions](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#66-open-questions)
- <a id="7-tad-component-inventory"></a>[7. TAD Component Inventory](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#7-tad-component-inventory)
- <a id="8-component--architecture-diagram"></a>[8. Component / Architecture Diagram](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#8-component--architecture-diagram)
- <a id="9-data-flow"></a>[9. Data Flow](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#9-data-flow)
- <a id="data-flow-join-and-sync-session"></a>[Data Flow: Join and Sync Session](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#data-flow-join-and-sync-session)
- <a id="data-flow-fork-a-card-variant"></a>[Data Flow: Fork a Card Variant](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#data-flow-fork-a-card-variant)
- <a id="10-integration-contracts"></a>[10. Integration Contracts](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#10-integration-contracts)
- <a id="101-collaboration-socket"></a>[10.1 Collaboration Socket](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#101-collaboration-socket)
- <a id="102-presenter-login"></a>[10.2 Presenter Login](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#102-presenter-login)
- <a id="103-fork-variant"></a>[10.3 Fork Variant](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#103-fork-variant)
- <a id="104-rewrite-existing-node"></a>[10.4 Rewrite Existing Node](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#104-rewrite-existing-node)
- <a id="105-reset-room"></a>[10.5 Reset Room](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#105-reset-room)
- <a id="11-sequence-diagram"></a>[11. Sequence Diagram](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#11-sequence-diagram)
- <a id="12-architectural-decisions"></a>[12. Architectural Decisions](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#12-architectural-decisions)
- <a id="adr-01-use-a-collaborative-canvas-as-the-primary-container"></a>[ADR-01: Use a collaborative canvas as the primary container](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#adr-01-use-a-collaborative-canvas-as-the-primary-container)
- <a id="adr-02-model-slides-and-demo-cards-as-custom-shapes"></a>[ADR-02: Model slides and demo cards as custom shapes](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#adr-02-model-slides-and-demo-cards-as-custom-shapes)
- <a id="adr-03-use-http-mutations-for-ai-actions-and-realtime-sync-for-propagation"></a>[ADR-03: Use HTTP mutations for AI actions and realtime sync for propagation](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#adr-03-use-http-mutations-for-ai-actions-and-realtime-sync-for-propagation)
- <a id="adr-04-keep-presenter-auth-lightweight"></a>[ADR-04: Keep presenter auth lightweight](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#adr-04-keep-presenter-auth-lightweight)
- <a id="13-quality-attribute-scenarios"></a>[13. Quality Attribute Scenarios](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#13-quality-attribute-scenarios)
- <a id="performance"></a>[Performance](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#performance)
- <a id="reliability"></a>[Reliability](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#reliability)
- <a id="security"></a>[Security](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#security)
- <a id="observability"></a>[Observability](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#observability)
- <a id="usability"></a>[Usability](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#usability)
- <a id="14-probable-source-tree-reconstruction"></a>[14. Probable Source-Tree Reconstruction](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#14-probable-source-tree-reconstruction)
- <a id="reconstruction-notes"></a>[Reconstruction Notes](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#reconstruction-notes)
- <a id="15-requirement-to-implementation-traceability"></a>[15. Requirement-to-Implementation Traceability](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#15-requirement-to-implementation-traceability)
- <a id="16-how-id-rebuild-this"></a>[16. How I'd Rebuild This](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#16-how-id-rebuild-this)
- <a id="phase-0---confirm-product-shape"></a>[Phase 0 - Confirm Product Shape](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#phase-0---confirm-product-shape)
- <a id="phase-1---ship-the-narrowest-vertical-slice"></a>[Phase 1 - Ship the Narrowest Vertical Slice](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#phase-1---ship-the-narrowest-vertical-slice)
- <a id="phase-2---add-artifact-iteration"></a>[Phase 2 - Add Artifact Iteration](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#phase-2---add-artifact-iteration)
- <a id="phase-3---add-tree-semantics-and-spatial-legibility"></a>[Phase 3 - Add Tree Semantics and Spatial Legibility](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#phase-3---add-tree-semantics-and-spatial-legibility)
- <a id="phase-4---add-presenter-operations"></a>[Phase 4 - Add Presenter Operations](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#phase-4---add-presenter-operations)
- <a id="phase-5---harden-for-reuse"></a>[Phase 5 - Harden for Reuse](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#phase-5---harden-for-reuse)
- <a id="17-implementation-risks"></a>[17. Implementation Risks](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#17-implementation-risks)
- <a id="18-review-checklist"></a>[18. Review Checklist](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#18-review-checklist)
- <a id="planning-revision--reference-implementation"></a>[Planning revision — reference implementation](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#planning-revision--reference-implementation)
- <a id="mvp--reference-implementation"></a>[MVP — reference implementation](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#mvp--reference-implementation)
- <a id="gtm--reference-implementation"></a>[GTM — reference implementation](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#gtm--reference-implementation)
- <a id="planning-gaps--reference-implementation"></a>[Planning gaps — reference implementation](figma-slides-demo-prd-tad-adr-mvp-gtm.part-02.md#planning-gaps--reference-implementation)

<a id="figma-slides-demo-canvas---prd-tad-adr-mvp-gtm"></a> [Figma Slides Demo Canvas - PRD-TAD-ADR-MVP-GTM](figma-slides-demo-prd-tad-adr-mvp-gtm.part-01.md#figma-slides-demo-canvas---prd-tad-adr-mvp-gtm)
