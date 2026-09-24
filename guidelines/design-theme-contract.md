---
title: "Native design consistency contract"
doc_type: "Guidelines Companion"
version: "1.0.0"
date: "2026-09-24"
lang: "en-US"
frontmatter_contract: "required"
owner: "Design maintainers"
universal_scope: true
load_policy: "on-demand"
parent: "Design Guidelines"
---

# Native design consistency contract

This companion extends [Design Guidelines](design-guidelines.md#configuration-driven-design).
It owns the rules below. A product binds them to existing source owners; it does not acquire a new
runtime package, registry, settings panel, or remote dependency by adopting this document.
Rule identity and findings use the existing
[authoring contract](prd-tad-adr-mvp-gtm-guidelines.md#rule-identity--classification) and
[finding enumeration](prd-tad-adr-mvp-gtm-verification.md#conformance-findings).
Each numbered rule is artifact-bearing; section anchor plus ordinal is its Rule ID.

## Ownership and adoption

1. Declare one source owner each for reusable policy, product identity, token values, appearance
   preferences, rendering adapters and evidence. Link existing owners before introducing a file.
   Conflicting authority records `duplicate-owner`.
2. Keep a design entry point as a small routing document. Store numeric values in the native token
   source and reference its exact revision in evidence; prose tables are observations or proposals,
   never a second executable palette. Missing source joins record `unresolvable-reference`.
3. For each adopter, bind changed surfaces and checks to an exact revision. A green policy check
   establishes document consistency only. Claim global runtime coverage only for individually proven
   adopters; missing acceptance evidence records `unimplemented-guideline`.

## Token resolution

1. Reuse the native token contract for names, types, units, purposes, references and bounds. Validate
   missing references, cycles, invalid values and incomplete palettes before publishing output.
   Unchecked output records `unimplemented-guideline`.
2. Resolve values in an acyclic order: native defaults → selected mode and palette → validated personal
   overrides → semantic tokens → rendering adapters. Keep application semantics out of token parsing.
   A competing owner records `duplicate-owner`.
3. Generate CSS and other exports from the same source; check deterministic bytes and source digest.
   Edit the source, regenerate outputs, and delete replaced literal values within the touched scope.
   An output that disagrees with its owner records `status-conflict`.
4. Use semantic roles for backgrounds, content, borders, focus, selection, syntax, type, spacing,
   radii, elevation and motion. Map renderer-specific slots through adapters. Distinguish data colors
   and authored document styles from application chrome. Missing mappings record `unimplemented-guideline`.

## Appearance settings

1. Extend existing settings entries, state actions, persistence and reset behavior. Reuse the same
   settings view, search, labels, icons and previews. A parallel appearance store or panel records
   `duplicate-owner`.
2. Separate mode selection from palette selection. Preserve system/light behavior, remember the dark
   palette while light is active and specify first-run, legacy migration, malformed storage and
   storage-unavailable behavior. Missing cases record `unimplemented-guideline`.
3. Apply one resolved appearance revision across already-mounted and newly-mounted surfaces. Handle
   asynchronous editor loading, disposal and rapid toggles so older callbacks cannot restore stale
   colors. Missing race checks record `unimplemented-guideline`.
4. Preserve text, icon and density overrides when switching palettes. Existing shared font, text-size,
   icon-format, stroke, size, color, animation and spacing settings remain authoritative. An unrelated
   preference reset records `status-conflict`.

## Typography ideograms and identity

1. Reuse product labels and action vocabulary from their existing source. Provide accessible names
   for icon-only controls and reuse native icon/ideogram components, previews and meaning. A newly invented
   synonym or asset without an owner records `unguided-artifact`.
2. Route interface typography and icons/ideograms through shared preferences: font family, size,
   weight, line height, spacing, glyph format, scale and stroke where the native owner supports them.
   Preserve separate document typography, code font and diagram/data semantics. Do not invent controls
   for unsupported dimensions; record the gap. Spell out affected consumers and deliberate exceptions.
   Missing coverage records `unimplemented-guideline`.
3. Treat ideograms as semantic symbols, including pictographic or textual glyphs, rather than a
   provider name. Bind symbol meaning, localized accessible label, fallback glyph and rendering owner;
   test missing glyphs and font fallback without downloading assets. Missing joins record
   `unresolvable-reference`.
4. Keep voice, product naming, logo provenance, asset licenses and permitted claims in one existing
   product identity owner. Use plain action-and-result copy; do not claim capabilities from a visual
   mockup. Invented capability evidence records `unproven-claim`.
5. Keep all required fonts, icons and appearance data locally available. Add no paid service, external
   fetch, telemetry, or runtime model call for appearance. A paid read path records `paid-read-path`.

## Accessibility and reach

1. Measure final composited colors, including opacity, for primary/secondary text, controls, selected
   rows, focus and syntax in every supported palette. Require text contrast at least 4.5:1 (3:1 for
   large text) and meaningful control/focus boundaries at least 3:1. Missing measured evidence records
   `unimplemented-guideline`; these thresholds are acceptance requirements, not present compliance claims.
2. Prove keyboard operation, visible focus, 200% text zoom, reduced motion and a narrow touch viewport.
   Keep touch targets usable at least 44 CSS pixels even when compact glyphs are smaller. Use labels
   or shapes as well as color. A missing target surface records `incomplete-delivery-reach`.
3. Test initial rendering, theme switching and reload offline after installation/cache priming. If
   storage fails, retain the session choice and expose the existing persistence failure signal without
   claiming it was saved. Missing recovery evidence records `unimplemented-guideline`.

## Enforcement and evidence

1. Before source acceptance, run existing token validation/export checks, settings tests and affected
   adapter tests. Extend the owning suite for missing cases; do not create a competing test registry.
   Record command, source revision, result and scope. Missing checks record `unimplemented-guideline`.
2. Add browser evidence for computed colors, typography, icons and preference persistence on desktop
   and mobile. Static literal scans and screenshots alone do not prove resolved values or accessibility.
   Claiming runtime readiness without that evidence records `unproven-claim`.
3. Report changed-scope coverage as verified consumers / declared affected consumers, with exceptions,
   gap owners and next checks. Expand only on measured need. Missing or stale joins record
   `stale-evidence` or `unresolvable-reference` as applicable.
4. Keep source release, deployment and runtime receipts distinct under the existing workflow. A
   published document supplies neither deployment authority nor a runtime receipt. A conflated claim
   records `blended-status`.

## Adoption record

Use this compact record inside the product's joined plan; it adds no parallel schema.

| Field | Required content |
|---|---|
| Continuity | Existing capability ID and one revision across PRD, TAD, ADR, MVP and GTM |
| Native owners | Exact source revision, path, symbol and existing consumers |
| Scope | Affected surfaces; reused text/icon/settings behavior; explicit exceptions |
| Change | Smallest owner extension, migration, replaced code and rollback |
| Evidence | Criterion, invocable check, observed result, environment and gap |
| Economics | Local/offline behavior, bytes, modules, active time and zero-spend bound |

Guidance: defer a standalone brand document until actual identity assets or voice rules need separate
maintenance. Consistency means shared semantics and ownership; different products need not share colors.
