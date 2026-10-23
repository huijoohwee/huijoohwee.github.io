---
title: "Agentic Base Joined Product Plan"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.1.0"
date: "2026-10-23"
lang: "en-US"
owner: "Product function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
continuity_id: "AGENTIC-BASE-PRD-001"
lifecycle_status: "proposed"
---

# Agentic Base Joined Product Plan

## Purpose

Create `docs/documents/prd-tad-adr-mvp-gtm-agentic-base.md` as one joined PRD, Technical Architecture Design (TAD), Architecture Decision Record (ADR), Minimum Viable Product (MVP), and Go-to-Market (GTM) artifact. Follow `guidelines/prd-tad-adr-mvp-gtm-guidelines.md` version 3.4.0 and its linked modules. Ground product and implementation claims in the current `agentic-base` source, its repository documentation, and exact consumer pins. Clearly label unknowns and distinguish observed behavior from proposals.

## Product objective

Specify Agentic Base as a reusable, product-neutral, headless foundation for Agentic OS products. Explain its shared Table and Multi-dimensional Table runtime, data/view contracts, local-first and offline behavior, integration seams, supported migration path, and the boundary between the shared Base runtime and product-owned UI. Record how the current Agentic Graph Multi-dimensional Table is the visual and behavior reference for parity work, without implying unverified parity or importing an unapproved implementation.

## Scope and required content

- State user and buyer pain, evidence, jobs, near-built solution, measurable outcomes, value, and explicit assumptions.
- Describe source modules, package/private distribution status, licensing evidence, consumer commit pins, runtime/data flow, portability, accessibility, security, performance, and offline operation using observed source as evidence.
- Record architecture options and decisions for shared table runtime ownership, visual fidelity, product-specific extension points, and versioned releases; call out decisions that still need evidence or owner approval.
- Define a zero-cost, free-tier, FOSS-first MVP suitable for mobile browsers, edge/device/local execution, and offline use; avoid paid plans, addons, and overages.
- Define acceptance criteria, verification contracts, risks, dependencies, non-goals, phased roadmap, rollback/recovery, and a GTM experiment that does not claim registry publication or consumer rollout.
- Include the guideline-required C01–C16 disposition, Validation Contract Cases (VCCs), coverage and evidence references, economics/time-to-value, and distinct PRD/TAD/ADR/MVP/GTM sections.
- Keep the artifact below 600 lines and ensure every claim about deployed, shipped, licensed, published, or verified behavior has evidence or is marked unknown/proposed.

## Constraints and non-goals

- Preserve the user's instruction not to mention, copy, or depend externally on the named prohibited component-library reference. Do not use it as a source, benchmark, dependency, or justification.
- Do not create conflicting table implementations or product-specific forks of shared behavior. Reuse the Agentic Graph Multi-dimensional Table contract and record an explicit source/owner/release boundary for reuse.
- This task is documentation only: do not publish a package, deploy a website, change consumer pins, migrate product code, alter licensing, or claim production parity.
- Do not expose credentials or private data. External spend must remain $0; prefer already available local tools and exact pinned source.
- Respect the repository's START, RELEASE, DEPLOY, and ROLLBACK workflows. A plan release may merge only the plan record; the final PRD remains reviewable until separately released.

## Deliverable and acceptance

The sole implementation deliverable is `docs/documents/prd-tad-adr-mvp-gtm-agentic-base.md` in an admitted scoped lane. It is accepted when the frontmatter and joined sections conform to guideline 3.4.0, all C01–C16 rows and VCCs resolve to explicit evidence or a marked gap, source pins and status claims are accurate at authoring time, the document is under 600 lines, and the repository's PRD policy check plus `git diff --check` pass. Report the exact lane, source revision, checks, unresolved decisions, and any release boundary in the handoff.

## Execution sequence

1. Admit a dedicated lane from clean canonical `main` using this committed plan.
2. Re-read current Agentic Base product/development/deploy/rollback documentation and relevant source manifests and consumers; record exact SHAs.
3. Draft the joined artifact from the guideline's required modules and verify claims against source.
4. Run the focused policy check and whitespace/diff check; fix any failures in the lane.
5. Present the resulting PRD for review. Do not merge or deploy the final PRD as part of this plan.

## Evidence baseline and known limits

Initial authoring baseline (recheck before drafting): `agentic-base` main was observed at `d7d7bde` with an MIT license, a private/unpublished `@agentic-base/views-react` package at version `0.1.0`, and Git commit pin distribution. Its source describes a shared TableCore and local browser demo. The observed `agentic-graph` checkout was at `60333d43486537df7b89f46293c58f282b0394f`, while a consumer manifest pinned an earlier Base commit `529f1d866974453327977595a457d5065a8dbc45`. Full runtime and visual parity, legal/owner reuse approval beyond the owner-authored Base source, release operation, adoption, and customer demand are not established by this baseline and must not be represented as facts.
