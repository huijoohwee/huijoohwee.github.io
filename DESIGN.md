---
title: "Design policy entry point"
doc_type: "Guidelines Index"
version: "1.1.0"
date: "2026-09-24"
lang: "en-US"
frontmatter_contract: "required"
owner: "Design maintainers"
universal_scope: true
load_policy: "on-demand"
---

# Design policy entry point

This is a navigation contract, not a second palette or component library. Load it when changing
appearance, interaction, product copy, or design documentation. No global prompt change is required.

1. Read the affected section of [Design Guidelines](guidelines/design-guidelines.md).
2. For tokens, themes, text, icons, or settings, apply the
   [native design contract](guidelines/design-theme-contract.md).
3. Use [Design CID](guidelines/design-cid-guidelines.md) as a lookup; the owning sections supply rules.
4. Bind implementation to the application's existing settings, token definitions, adapters and tests.
5. Record proposed changes and observed evidence separately in the
   [joined plan](docs/documents/prd-tad-adr-mvp-gtm-design-consistency.md).

## Ownership

Global policy defines invariants; the product owns its identity, palette values and runtime settings;
the workflow harness owns admission and release evidence. A repository-local design entry point may
reference these owners and exact revisions. It must not duplicate them or assume that its filename
makes it authoritative. An offline checkout uses already-reviewed local content and records its
revision; it never fetches policy, fonts, icons, or a theme at runtime.

For reusable adoption, use the [native design contract](guidelines/design-theme-contract.md#ownership-and-adoption)
and its [copy-ready adoption record](guidelines/prd-tad-adr-mvp-gtm-templates.md#native-design-adoption-record)
in the existing joined plan. A product links its native settings, editor, notice, disclosure,
metric, illustration and token owners. Shared runtime utilities belong in the package already
consumed by that product; a policy document is never imported by the running application.

## Brand and design

Keep voice, naming and approved asset references in the product's existing identity owner. A separate
brand document is optional only when independently maintained identity content needs its own owner.
Do not create an empty brand file, invent a logo, or duplicate visual values there. The native contract
owns how identity, accessible semantics and personal appearance preferences compose.

## Reference implementation

For this repository, `guidelines/` owns reusable design policy. `agentic-os` owns workflow gates;
`agentic-graph` owns MainPanel Settings, its token source and rendering adapters. The
[source map and theme proposal](docs/documents/prd-tad-adr-mvp-gtm-design-consistency-reference.md)
bind those claims to inspected revisions. The proposal adds no runtime dependency on this entry point.
