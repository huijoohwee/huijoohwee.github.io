---
title: "PR #297 current facts enrollment and closeout"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.1.0"
date: "2026-10-25"
lang: "en-US"
frontmatter_contract: "required"
owner: "huijoohwee.github.io recovery operator"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
continuity_id: "PR297-RECOVERY-CLOSEOUT-001"
prd_revision: "0.1.0"
tad_revision: "0.1.0"
adr_revision: "0.1.0"
mvp_revision: "0.1.0"
gtm_revision: "0.1.0"
status: "implementation"
parent: "guidelines/prd-tad-adr-mvp-gtm-guidelines.md"
parent_version: "3.4.0"
guideline_revision: "3.4.0"
load_policy: "on-demand"
---

# PR #297 current facts enrollment and closeout

This repository-bound plan replaces the missing local lane candidate. It does not claim to restore
the original uncommitted bytes. The authoritative fact source is the committed Agentic OS owner
record at `971da898026b037f84b336a297c41b502462555e`,
`guides/CLEANUP-AUTHORITY-ENROLLMENTS.md`.

## PRD

### Objective and scope

Record the exact current historical-content and quarantine-adoption facts for
`github.com/huijoohwee/huijoohwee.github.io` PR #297 in the consumer transition policy, then close
the resulting source lane through the repository's protected release workflow. This is an internal
governance record change; it does not add product behavior.

The owner record binds PR #297 base `254ad7c28ded94f0169c29c63db589a72bd5e8ef`, reviewed head
`d824d8275fed084bc12d87597d87d7a3dd7d1722`, merge
`6b1e7488719b726e979c848dd0078f29d69ca3d0`, and equal source/merge tree
`f4dcccfc766787299e4a503395da242c834bac46`. Its scope is
`recovery/current-historical-content/pr-297`; the enrolled required check is
`adlc-policy-contract`. `guideline-contract-check` also succeeded on the historical PR, but is not
part of the enrolled check context.

Add exactly one `historicalIntegrations` row and one `retentionAdoptions` row, using the values in
the owner record. Preserve all existing rows. The historical row must use
`adoptionScope: ["recovery/current-historical-content/pr-297"]` and
`checkContexts: ["adlc-policy-contract"]`. The adoption row must bind quarantine coordinate
`0478f11946ca62f2b8434ee0b0c961d49767e06e65dd0831d454632273e7133c` and original receipt digest
`f47a1c15a5901f4bb43f4405c54f8d3e6ebbfd328eecbd7416211e7d250b1932`.

This plan does not claim historical branch protection, required-check policy, Ruleset Suite,
historical quarantine authority, or a merge-method decision for PR #297. Reobserve live provider
policy and the exact implementation candidate before integration.

### Acceptance

- The consumer policy contains the two exact PR #297 rows and retains prior PR #218 rows unchanged.
- `npm run adlc:policy:check` passes on the implementation candidate.
- Current provider evidence binds the candidate PR, required `adlc-policy-contract` result and
  squash integration; a separate integration receipt and read-only completion status confirm it.
- Canonical `main` is synchronized by the recovery-backed canonical-sync workflow, with its exact
  receipt retained.
- Retirement and cleanup receipts name only the newly created plan and implementation lanes and
  their exact paths, refs, and bytes.
- No Pages deployment runs: both changed paths are outside the sealed payload, which contains
  `index.html` and `guidelines/`. If source rollback becomes necessary, use a new protected revert
  revision and retain its receipt; no local reset or guessed production rollback is allowed.

## TAD

Use two protected source changes so the implementation lane starts only after this plan is committed
on `main`:

1. Integrate this plan document in one plan-only PR.
2. Start a new declared lane from current protected `main` with this exact plan and write only
   `.agentic-os/github-transition-policy.json`.
3. Copy the two exact policy rows from the owner record, run the focused consumer policy check, and
   publish the immutable candidate through the repository lifecycle.
4. Reobserve the active ruleset, required check, candidate head, and merge method; integrate only
   after the required check is green. Refresh and sync canonical `main` through its exact plan and
   receipt.
5. Close each new lane with separate integration, retirement, and cleanup evidence. Reconcile
   delivery as not required because the payload boundary is unchanged.

The live observation at plan authoring found active repository ruleset `20008203` for the default
branch, required check `adlc-policy-contract`, and squash as the only allowed merge method. Refresh
these facts immediately before publication and integration; the historical PR's success is not a
substitute for current policy evidence.

## ADR

Use the committed owner record as the single fact source instead of reconstructing the lost diff.
Use only the required check it enrolled, not every successful historical check. Keep historical
governance claims unproven. Preserve the retained quarantine record and existing policy rows.
Treat user authorization for integration, retirement, cleanup, sync, deployment, and rollback in
this task as effect-class authority; bind each applicable effect to its own current candidate,
provider evidence, and receipt. The authorization does not authenticate a provider result.

## MVP

The minimum accepted result is the two exact policy rows integrated into protected `main`, current
canonical synchronization proved, and only the new clean lanes retired and cleaned with exact
receipts. Source checks and the GitHub required check remain separate evidence. Deployment and
runtime verification are out of scope because no Pages payload file changes.

## GTM

This is internal recovery, not a buyer-facing feature. External spend ceiling is USD 0; use existing
FOSS and repository tooling. No dependency, runtime module, workflow, or always-load instruction is
added. The sprint budget is 60 active minutes, one plan document, two policy rows, zero runtime
modules, zero dependencies, and a 12 KiB plan-file ceiling. Provider review and CI waits have no ETA;
report the exact blocker and recheck condition. Demand, revenue, and savings remain unmeasured.
