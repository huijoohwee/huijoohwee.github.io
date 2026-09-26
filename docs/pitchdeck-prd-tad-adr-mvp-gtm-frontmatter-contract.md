---
title: "Pitchdeck PRD TAD Frontmatter Contract"
doc_type: "Template Contract"
version: "1.0.2"
date: "2026-09-26"
lang: "en-US"
owner: "Documentation maintainers"
local_rung: "undocumented"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: false
worktree_id: "device-0232231d4a19--pitch-deck-guidelines"
agent_id: "kiro-pitch-deck-guidelines"
frontmatter_contract: "required"
continuity_id: "PLAN-PITCHDECK-PRD-TAD-ADR-MVP-GTM-FRONTMATTER-CONTRACT"
guideline_revision: "2.7.0"
guideline_source: "https://github.com/huijoohwee/huijoohwee.github.io/blob/e8d2a10a8d3e5735c43edf350a22523df05fdf91/guidelines/prd-tad-adr-mvp-gtm-guidelines.md"
reviewed_source_revision: "e8d2a10a8d3e5735c43edf350a22523df05fdf91"
previous_document_version: "1.0.1"
gtm_revision: "1.0.2"
planning_source: "https://github.com/huijoohwee/agentic-graph/blob/main/docs/documents/agentic-graph-pitchdeck-frontmatter-template-contract.md"
---

# Pitchdeck PRD TAD Frontmatter Contract

## Purpose

This document explains the canonical frontmatter-first contract used by the reusable pitchdeck templates.

It is the author-facing companion to `agentic-graph/docs/documents/agentic-graph-pitchdeck-frontmatter-template-contract.md`.

## Canonical Templates

| Template | Role | Path |
| --- | --- | --- |
| Lite | Minimal reusable frontmatter-first pitchdeck template | `template/pitchdeck-prd-tad-adr-mvp-gtm-template-lite.md` |
| Full | Expanded reusable frontmatter-first pitchdeck template | `template/pitchdeck-prd-tad-adr-mvp-gtm-template.md` |

## Core Contract

| Rule | Directive |
| --- | --- |
| Frontmatter-first | YAML frontmatter is the machine-readable SSOT. Markdown body is the human-readable projection. |
| Shared graph surfaces | `widget_bundle`, `runner`, `pipeline`, `mermaid`, `flow`, and `graph_meta` must describe the same graph. |
| Typed envelopes | Widget and panel fields use `{key, type, value}` envelopes for parser-safe round-trip fidelity. |
| Canonical form ids | Use `textGeneration`, `imageGeneration`, `videoGeneration`, `richMediaPanel`. |
| Canonical output surface | Rich Media Panel is the final render surface for text, image, and video outputs. |
| Neutral defaults | Keep placeholders and generic defaults only; do not hardcode validation-demo content. |

## Canonical Widget Keys

| Surface | Canonical keys | Canonical handles |
| --- | --- | --- |
| Text Widget | `chatProvider`, `chatAuthMode`, `chatEndpointUrl`, `chatModel`, `prompt`, `chatThinkingType`, `chatReasoningEffort`, `chatStream` | `prompt_in`, `text_out` |
| Image Widget | `model`, `prompt`, `size`, `output_format`, `response_format`, `optimize_prompt_options`, `aspect_ratio`, `stream`, `watermark`, `seed`, `guidance_scale`, `reference_image` | `reference_image`, `imageUrl` |
| Video Widget | `model`, `prompt`, `content_json`, `resolution`, `ratio`, `duration`, `generate_audio`, `draft`, `camera_fixed`, `image_url_url`, `reference_image` | `reference_image`, `videoUrl` |
| Rich Media Panel | `output`, `imageUrl`, `videoUrl`, `outputSrcDoc`, `media_interactive` | `output`, `imageUrl`, `videoUrl`, `outputSrcDoc` |

## Reuse Rules

| Consumer | Reuse rule |
| --- | --- |
| FloatingPanel Props Panel | Read and write the same canonical `properties.*` keys serialized in template `flow.nodes`. |
| MainPanel Integrations | Reuse the same field names and row semantics as the shared integration registry SSOT. |
| Frontmatter parser | Parse the same canonical `flow:widgetFormId`, handles, and typed envelopes emitted by the templates. |
| Rich Media renderer | Receive connected values through edges before any display-only filtering or dedupe. |

## Authoring Rules

| Context | Directive |
| --- | --- |
| Project customization | Change `template_inputs.*` first. |
| Story content | Keep project-specific narrative in placeholders and body prose only. |
| Structural edits | If you rename ids or add nodes, update all SSOT surfaces together. |
| Hardcode ban | Do not embed validation-demo scripts, scene names, asset URLs, or repo-specific filesystem paths. |
| Legacy ban | Do not restore old node/cluster-only template layouts or alias old property keys. |

## Related References

| Reference | Purpose |
| --- | --- |
| `template/pitchdeck-prd-tad-adr-mvp-gtm-template-lite.md` | Minimal template source |
| `template/pitchdeck-prd-tad-adr-mvp-gtm-template.md` | Full template source |
| [`guidelines/pitch-deck-guidelines.md`](../guidelines/pitch-deck-guidelines.md) | Deck ordering, timing, Claim Manifest, delivery and outcome capture for the rendered Pitch Deck section |
| `docs/agentic-os-ai-pipeline-prd-tad-adr-mvp-gtm.md` | Broader AGENTIC_OS pipeline contract reference |
| `../agentic-graph/docs/documents/agentic-graph-pitchdeck-frontmatter-template-contract.md` | Upstream implementation contract |

## Source role - reference implementation

This stable guide owns template authoring bindings above. Its content is a template contract, not a competing combined product plan. The `planning_source` locator identifies the product owner; consume its declared continuity and exact revision before deriving work. Historical implementation observations are unchanged and supply no current production or buyer evidence.
