---
title: "Website validation adoption"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "1.0.1"
owner: "huijoohwee.github.io"
date: "2026-10-01"
lang: "en-US"
frontmatter_contract: "required"
load_policy: "on-demand"
continuity_id: "WEBSITE-VALIDATION-ADOPTION-001"
prd_revision: "1.0.1"
tad_revision: "1.0.1"
adr_revision: "1.0.1"
mvp_revision: "1.0.1"
gtm_revision: "1.0.1"
status: "implementation"
---

# Website validation adoption

## PRD

`WEBSITE-VALIDATION-ADOPTION-001@1.0.1`: the maintainer validates changed planning,
guideline and mapping inputs without repeatedly executing unrelated check groups.
Role/Subject: solo maintainer. Action/Verb: validates. Object: changed source inputs.
Acceptance: preserve existing assertions and protected status, select owner checks
by declared inputs, broaden unknown/shared changes, and expose actual coverage.

## TAD and ADR

The pinned Agentic OS package owns execution under its
`guides/REPOSITORY-VALIDATION.md` contract. Package and lockfile identify that exact
source; `.agentic-os-validation.json` declares only website commands and input
boundaries. `npm test` now uses that executor; `test:source` preserves the original
complete chain. `check:plan` previews selection and `test:all` requests fresh broad
local validation. No consumer runner or runtime dependency is added.

The existing CI job still invokes `npm test`. CI is detected by the shared owner,
which verifies the website's exact PR-head checkout against its provider event and
base SHA, runs fresh, and labels the receipt as head coverage. Existing branch
binding, fixture materialization and required aggregate status remain unchanged.
Owner evaluators remain mandatory; external workspace and installed-package inputs
make these checks ineligible for cached success reuse.

## MVP

PR CI keeps its explicit head and branch identity. It materializes the exact
provider revision when absent, allowing the shared verifier to check its base/head
parents independently of optional merge metadata in the PR webhook.

The broad fallback covers all six original test groups exactly once. Validate the
policy with the shared selector, check script/CI reachability, then run the existing
checks on the pinned candidate and require `adlc-policy-contract` in protected CI.
Graph document-map projection remains owned by `schema/AgenticRAG/sync_map.py` and
the separate existing `npm run check` path. Regenerate from integrated Graph source;
never hand-edit generated map contents or treat a source check as deployed parity.

## GTM

Measure selected groups and command time for one planning edit, one schema edit and
unchanged inputs. This is an engineering delivery improvement; buyer demand, payment
and production runtime readiness are separate and unmeasured by these receipts.

## Block Editor map reconciliation — 2026-09-25

Production verification run `36054392227` found one missing Graph document node.
Regenerate the existing map from integrated Graph `2bd36eeec85d7f0ffa3b4c68c51129627fab0302`
with `schema/AgenticRAG/sync_map.py`; accept exactly the Block Editor PRD node,
zero removals, and a clean subsequent `--mode check` across all 302 documents.
This consumes the existing source owner and generator without a parallel map or checker.
Protected schema integration unblocks Graph candidate verification; it does not authorize
Production activation. The map is outside this website's current Pages payload.
Rollback is a reviewed regeneration from the selected canonical Graph document set.

## Venture record continuity — 2026-10-01

PRD: a deck, plan, financial model and learning record must resolve each HL/H/E/A
identifier to one definition and share a nonempty continuity ID and revision. Missing,
malformed or conflicting joins fail the dependent projection; inline-code IDs remain
citations. Fenced examples and placeholder rows remain outside the instantiated set.

TAD/ADR: reuse the existing shared frontmatter adapter in the record-join validator;
remove its permissive duplicate parser. Report duplicate definitions as `duplicate-owner`
and malformed identities as `artifact-naming-noncompliant`. No new runtime dependency.

MVP: `npm run venture:joins:check -- <record.md> ...` accepts 1–32 distinct inputs,
each below 500 kB. Regression tests cover absent revisions, malformed metadata,
duplicate definitions, quoted IDs, fences and cross-record identity drift; the existing
`git-guidelines:test` group runs them in protected CI. This proves structural joins only.

GTM: fewer silently inconsistent audience projections is the intended value; time saved,
demand and payment remain unmeasured. The process-flow guideline reuses valid decisions
for the same authorized effect. It is part of the Pages payload; checker scripts and this
adoption record are source-only. Source release, Pages deployment and live readback retain
separate receipts. Rollback is a reviewed source successor and, for public guideline changes,
a fresh exact-candidate Pages deployment under the repository deploy workflow.
