---
title: "Graph Markdown Syntax Profile Reference"
doc_type: "Guidelines"
version: "2.0.0"
date: "2026-09-10"
lang: "en-US"
owner: "agentic-graph"
frontmatter_contract: "required"
load_policy: "on-demand"
---

# Markdown Syntax Guidelines

The [Graph Markdown profile][profile] owns renderer variables, annotation syntax,
output shape, table persistence and retry rules. Its [validator][validator] and
[specification constants][constants] own executable checks. Load those sources
when producing Graph documents; their rules do not apply to every Markdown response.

For common authoring, use [conventions and syntax](conventions-and-syntax-guidelines.md)
and [runtime frontmatter](runtime-frontmatter-guidelines.md). The
[Canvas view profile](yaml-frontmatter-guidelines.md) remains a separate local profile.
This page retains the published website path; it no longer authors a second Graph rule table.

## Compatibility excerpts

The existing Graph [frontmatter documentation check][consumer] reads this path and
requires these two source sentences. They are verbatim excerpts from the
[pinned Graph profile][baseline], not independently editable rules:

> Canonical authored Markdown and reusable templates must keep `flow:` in plain YAML scalars, arrays, and objects.
> Normalized `{key, type, value}` wrappers are reserved for E2E ingestion/parsing/rendering fixtures after parsing; do not mix them into ordinary authored docs or templates.

Retire these excerpts when that source-owned check reads its local profile directly.
A future change must update the owning contract and its consumer together; do not
change only this reference to hide a mismatch. The source revision identifies the
excerpts, not current runtime readiness. Mutable links below are discovery only.

[profile]: https://github.com/huijoohwee/agentic-graph/blob/main/docs/documents/markdown-syntax-guidelines.md
[validator]: https://github.com/huijoohwee/agentic-graph/blob/main/canvas/src/features/chat/chatMarkdownValidation.ts
[constants]: https://github.com/huijoohwee/agentic-graph/blob/main/canvas/src/features/chat/chatAiMarkdownSpec.ts
[consumer]: https://github.com/huijoohwee/agentic-graph/blob/main/canvas/src/__tests__/docsFrontmatterE2EContract.test.ts
[baseline]: https://github.com/huijoohwee/agentic-graph/blob/32836542f5a401e276504a28e72fd6b17b09f006/docs/documents/markdown-syntax-guidelines.md
