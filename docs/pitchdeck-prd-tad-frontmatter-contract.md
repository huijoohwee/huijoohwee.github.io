# Pitchdeck PRD TAD Frontmatter Contract

## Purpose

This document explains the canonical frontmatter-first contract used by the reusable pitchdeck templates.

It is the author-facing companion to `knowgrph/docs/documents/knowgrph-pitchdeck-frontmatter-template-contract.md`.

## Canonical Templates

| Template | Role | Path |
| --- | --- | --- |
| Lite | Minimal reusable frontmatter-first pitchdeck template | `template/pitchdeck-prd-tad-template-lite.md` |
| Full | Expanded reusable frontmatter-first pitchdeck template | `template/pitchdeck-prd-tad-template.md` |

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
| `template/pitchdeck-prd-tad-template-lite.md` | Minimal template source |
| `template/pitchdeck-prd-tad-template.md` | Full template source |
| `docs/kgc-ai-pipeline-prd-tad.md` | Broader KGC pipeline contract reference |
| `../knowgrph/docs/documents/knowgrph-pitchdeck-frontmatter-template-contract.md` | Upstream implementation contract |
