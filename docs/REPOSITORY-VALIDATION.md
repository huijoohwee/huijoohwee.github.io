---
title: "Website validation adoption"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "1.0.0"
owner: "huijoohwee.github.io"
date: "2026-09-14"
lang: "en-US"
frontmatter_contract: "required"
load_policy: "on-demand"
continuity_id: "WEBSITE-VALIDATION-ADOPTION-001"
prd_revision: "1.0.0"
tad_revision: "1.0.0"
adr_revision: "1.0.0"
mvp_revision: "1.0.0"
gtm_revision: "1.0.0"
status: "implementation"
---

# Website validation adoption

## PRD

`WEBSITE-VALIDATION-ADOPTION-001@1.0.0`: the maintainer validates changed planning,
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
