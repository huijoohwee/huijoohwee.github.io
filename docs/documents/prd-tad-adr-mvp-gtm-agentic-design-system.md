---
title: "Shared UI Icon-Size Adoption Delta"
doc_type: "PRD-TAD-ADR-MVP-GTM"
version: "0.4.0"
revision: "0.4.0"
date: "2026-10-28"
updated_date: "2026-11-03"
lang: "en-US"
frontmatter_contract: "required"
owner: "Design-system product function"
continuity_id: "DESIGN-TOKEN-ADOPTION-001"
prd_revision: "0.4.0"
tad_revision: "0.4.0"
adr_revision: "0.4.0"
mvp_revision: "0.4.0"
gtm_revision: "0.4.0"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
parent: "docs/documents/prd-tad-adr-mvp-gtm-agentic-design-systems.md"
parent_version: "0.4.0"
guideline_revision: "3.4.0"
guideline_sha256: "8f0eda9aaf4d0b1e2bcc7388e15d19d95e6ba88fe158dbbbb53c2c0d4225d87a"
template_revision: "1.5.0"
template_sha256: "862369425974a704529164c02973a7ccb98b94d9a4eea73e347c8b4b57aa7966"
worktree_id: "device-0232231d4a19--design-token-handoff-receipt"
agent_id: "codex"
source_revision: "3f56c215f2d62cfc644f366723ed6bf41df90829"
lifecycle_status: "proposed"
load_policy: "on-demand"
runtime_readiness_policy: "fail-closed"
---

# Shared UI Icon-Size Adoption Delta

This child records only adoption of the `shared-ui` icon-size profile. The plural parent owns the
product-wide PRD, architecture, market, economics, release and lifecycle contract. Those sections
are inherited; this document replaces earlier repeated or conflicting child text. It assigns no
ownership over product palettes, glyphs, components, or unrelated tokens.

## PRD — bounded outcome

Contributors need consistent compact and default icon sizing across product surfaces. This is an
internal consistency hypothesis; buyer pain, savings and willingness to pay remain unvalidated.
The bounded outcome is one Design System owner for two generic size values, with each consumer
pinning generated output. No product-specific third value, alternate profile, copied editable source,
or shared runtime package is part of this delta.

## TAD — source and consumer pins

| Record | Exact identity | Contract |
|---|---|---|
| Owner profile | `agentic-design-system` profile `shared-ui@0.1.0`; source candidate `3224afd19c086e511dcfd892d82d12b68460b971`, registry/projection candidate `f5faa7887d22ffbd61121f30485a8d9ecca957e4` | `site/tokens/shared-ui-profile.json`; keys are `icon.size.compact=0.75rem` → `--agentic-icon-size-compact` and `icon.size.default=1rem` → `--agentic-icon-size-default`. Source digest `sha256:f335bd273298f267eddffdf3b3f344a69e31e965223e527e6f599b2947ac9856`. |
| Generated artifact | `site/vendor/shared-ui-profile.css` at registry/projection candidate above | Digest `sha256:c1b166161b7d85ee3bfe8aa085e3427718086de4dfd1445225b52b747fbe475d`. Generated output is read-only and source-bound. MIT license coverage applies to Design System `site/` only; it grants no rights to consumer application source. |
| Base consumer candidate | `758210bb0507c81b6837a309e247881a54f37c51`, branch `agent/device-0232231d4a19/shared-ui-icon-sizes` | Pin: `packages/views-react/src/browser/shared-ui-profile.pin.json`; projection: `packages/views-react/src/browser/shared-ui-profile.css`. Local candidate only. |
| Graph consumer candidate | `87137f4734b22522da881f91ae648b893c0bb1bf`, branch `agent/device-0232231d4a19/graph-shared-icon-sizing-nov03` | Pin: `canvas/src/styles/shared-ui-profile.pin.json`; projection: `canvas/src/styles/shared-ui-profile.css`. Local candidate only. |
| Commerce consumer candidate | `f723285c4885dc6e20ad64459b565cb45bee6b54`, branch `agent/device-0232231d4a19/commerce-shared-icon-sizing-nov03` | Worker explicitly routes the profile CSS only through the existing local-first allowlist; candidate is local only. |

Base and Graph pin files, and Commerce’s local-first artifact check, bind the same Design System
source revision, registry revision, source digest and generated digest. Consumers may not edit or
extend those two values. Any new shared key requires an owner-approved Design System profile
revision and adoption delta; unrelated product tokens stay with their native owners. The central
catalog does not claim consumer merges or a public release.

## ADR — one owner, no variants

**Decision:** Design System owns exactly the two generic shared size keys above. Base, Graph and
Commerce consume the pinned generated projection. Existing design-system profiles, product token
sets, icon glyphs, component implementations and brand rules remain under their current owners.

**Rejected:** independently editable copies, a second profile containing the same keys, consumer
size overrides, or transferring unrelated tokens/components in this change. If either pinned digest
differs, fail the consumer check and regenerate from the one source; do not resolve drift by adding a
variant.

## MVP and live UI verification

Local candidate evidence recorded for this delta:

| Surface | Check / observation | Result and limit |
|---|---|---|
| Design System | Live local registry at `http://127.0.0.1:4175/` on a 390 CSS-pixel viewport; profile card displays both keys and values. Fetch `./vendor/shared-ui-profile.css` from that UI. | UI document width is 390px; CSS returns 200 and its SHA-256 matches pinned projection digest `c1b166…fbe475d`. The registry does not render an icon sample, so no computed glyph size is claimed. Local preview only. |
| Base | `npm run check`; live local preview on port `4176` at 390 CSS pixels. | Check passed; shared table icons render at 16px and document width is 390px. |
| Graph | Production canvas build and focused shared-profile test; live local preview on port `5175` at 390 CSS pixels. | Build and focused test passed; default icon glyphs render at 16px and document width is 390px. Build reports existing oversized/lazy chunk warnings. |
| Commerce | `npm run check:local-first`; local browser preview at 390 CSS pixels. | 233 checks passed; icon size is 16px and document width is 390px. No public merge or deploy. |

These observations verify the local candidate surfaces only. They do not establish visual parity for
every icon, accessibility conformance, rights to publish consumer source, a protected merge, production
runtime behavior or rollback. Preserve `local_rung: spec-complete` and `delivered_rung: undocumented`
until the separate evidence and owner gates in the parent are satisfied. The readiness ladder and
release/deploy requirements are inherited without duplication.

## GTM and handoff

This delta creates no offer, price, audience claim or external spend. It uses existing FOSS/free local
build and browser workflows; incremental provider spend and model calls are $0. Keep candidate branches
unmerged until normal owner review accepts each exact pin and check. Any changed token scope or consumer
requires one successor revision and updated pins; do not create parallel/stale variants.
