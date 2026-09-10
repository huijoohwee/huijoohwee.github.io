---
title: "Conventions and Syntax Guidelines"
doc_type: "Guidelines"
version: "1.0.0"
date: "2026-09-10"
lang: "en-US"
owner: "shared authoring conventions"
frontmatter_contract: "required"
universal_scope: true
load_policy: "on-demand"
---

# Conventions and syntax guidelines

This guideline owns how to select, compose and change conventions across repositories.
It is independent of editor, agent, model, language and hosting provider. Load the relevant
section when authoring or changing a contract; do not append this guide to every session.

## Responsibility boundaries

| Concern | Owns | Does not determine |
|---|---|---|
| Convention | Choices among valid representations: naming, layout and formatting | Whether an input parses or an operation is authorized |
| Syntax | Accepted token/field shape, escaping, cardinality and serialization | The business meaning of a term |
| Dictionary or schema | Term meanings, field types and semantic constraints | Execution or deployed readiness |
| Index | Links to the defining source | A second set of rules or version pins |
| Product contract | Applicable profile, behavior, validation and evidence requirements | A replacement for shared definitions |

For a change, identify the affected layer and edit its defining source. A syntax change that
affects meaning needs the schema owner too; updating a label does not authorize a protocol rename.
The [documentation ownership rules](documentation-guidelines.md#document-routing-and-ownership)
own index placement and compatibility policy. Keep one entry point and reuse existing local indexes;
adding both `CONVENTIONS.md` and `SYNTAX.md` is useful only when their responsibilities are distinct.

## Select a profile before applying rules

- Identify the artifact, producer, consumer and exact contract revision. Reuse the local parser,
  schema, formatter and fixtures before adding configuration or dependencies.
- Separate human display names, source identifiers, serialized keys, environment variables,
  tool names and public routes. Each namespace follows its existing owner; one spelling convention
  must not rewrite all of them. Preserve externally owned and immutable identifiers.
- New internal names should follow the containing language/module's established conventions.
  Do not impose one casing, indentation, quotation or file-layout policy across unrelated languages.
- A product profile may narrow shared syntax where that subset is compatible. Extensions need an
  explicitly named local contract; they do not silently broaden the shared parser or other consumers.
- Resolve contradictory rules at their defining owner. Record the affected contract and revision;
  do not guess precedence from filenames or silently normalize an incompatible published value.
- Distinguish authored data from normalized parser output and generated projections. Edit authored
  sources; use the existing generator for projections. Preserve field identity through conversions.

## Shared rule owners

| Concern | Read only when applicable |
|---|---|
| Markdown metadata, YAML syntax boundary and local dialects | [Runtime frontmatter](runtime-frontmatter-guidelines.md) |
| Schema representation and extension policy | [Schema guidelines](schema-guidelines.md) |
| CID, RAO and SVO field meanings | [Shared field contract](cid-guidelines.md#shared-field-contract) |
| PRD, TAD and ADR joins and revision conventions | [Specification guidelines](prd-tad-adr-guidelines.md) |
| Source structure, names and reusable boundaries | [Maintainability](codebase-maintainability-guidelines.md), [neutrality](codebase-neutrality-guidelines.md) |
| Extraction, parse diagnostics and provenance | [Parser guidelines](parser-guidelines.md) |
| MCP capability/schema boundaries | [MCP contracts](mcp-contracts.md) |
| Renderer-specific Markdown | [Graph Markdown profile reference](markdown-syntax-guidelines.md) |

Common frontmatter rules do not impose a renderer's output format on ordinary documentation.
Renderer variables, color annotations, table persistence and retry rules apply only to the selected
product profile. The shared field contract owns semantic definitions; do not restate them here.

## Reference implementation: seven repository profiles

The [workspace document index][documents] owns the complete repository map. These links select
convention and syntax sources within that map; they are not a second inventory or dependency lock.

| Repository | Convention or syntax source | Validation owner |
|---|---|---|
| `agentic-os` | [Shared token core][invocation], [lifecycle tuple profile][cli-syntax], [dictionary contract][dictionaries] | [Invocation tests][invocation-tests] |
| `huijoohwee.github.io` | Shared rules above; [local naming scope](../scripts/check-agentic-naming.mjs) | [Guideline parser](../scripts/lib/git-guidelines/fm-reader.mjs), [schema-link validator](../scripts/lib/guidelines-map-contract.mjs) |
| `agentic-canvas-os` | [Product rules][canvas-rules], [dictionary projection contract][canvas-dictionaries] | [Docs contract][canvas-check] |
| `agentic-graph` | [Markdown profile][graph-markdown], [executable collaboration profile][graph-collaboration] | [Markdown validator][graph-validator], [collaboration validator][graph-check] |
| `agentic-commerce-os` | [Terminology register][commerce-terms], [runtime API][commerce-api] | [Terminology validator][commerce-check] |
| `huijoohwee` | [Generated mirror routing][mirror-rules], [acceptance contract][mirror-contract] | [Mirror check scripts][mirror-check] |
| `GameXR` | [Scene contract][game-scene], [shared Graph boundary][game-contract] | [Product check scripts][game-check] |

The shared invocation core parses individual `/`, `#` and `@` tokens. Its lifecycle tuple profile
and Graph's structured invocation have different cardinality and name constraints; use the selected
profile. A Markdown heading, URL fragment, color sigil or mention is not an executable invocation.
Dictionary membership does not grant dispatch, payment, filesystem or deployment authority.

Repository naming guards and terminology registers validate their own scopes. Do not spread a
product's forbidden-name list into a universal rule or rename persisted keys through text replacement.
The production mirror consumes source-owned output; conventions change at its upstream source.

## Change and verification

Use the existing PRD/TAD/ADR or contract to record a breaking syntax, casing or serialization change.
Bind consumers to the reviewed source revision, preserve required compatibility explicitly, and
remove replaced definitions when their consumers migrate. A general guideline update alone does
not migrate a parser, registry, persisted value, package pin or deployed environment.

For guidance edits, run the owning guideline and link checks. For behavior changes, also run the
selected producer/consumer parser and schema tests with valid, invalid and boundary inputs;
verify round-trip behavior only where the contract promises it. Keep local checks, CI and runtime
evidence separate. Reuse existing validators rather than creating another cross-repository runner.

Links to `main` support discovery. Evidence and offline use select an explicit repository/path
and exact revision or locked package asset. Missing sources stay unavailable; do not scan sibling
checkouts or fetch arbitrary schemas from authored input. This guide adds no always-loaded rules.

[documents]: https://github.com/huijoohwee/agentic-os/blob/main/DOCUMENTS.md
[invocation]: https://github.com/huijoohwee/agentic-os/blob/main/guides/INVOCATION-CORE.md
[cli-syntax]: https://github.com/huijoohwee/agentic-os/blob/main/docs/INVOCATION.md
[dictionaries]: https://github.com/huijoohwee/agentic-os/blob/main/guides/INVOCATION-DICTIONARIES.md
[invocation-tests]: https://github.com/huijoohwee/agentic-os/blob/main/__tests__/invocation-core.test.mjs
[canvas-rules]: https://github.com/huijoohwee/agentic-canvas-os/blob/main/docs/PROJECT-RULES.md
[canvas-dictionaries]: https://github.com/huijoohwee/agentic-canvas-os/blob/main/docs/DICTIONARY-OWNERSHIP.md
[canvas-check]: https://github.com/huijoohwee/agentic-canvas-os/blob/main/scripts/docs-contract.mjs
[graph-markdown]: https://github.com/huijoohwee/agentic-graph/blob/main/docs/documents/markdown-syntax-guidelines.md
[graph-collaboration]: https://github.com/huijoohwee/agentic-graph/blob/main/docs/collaboration-runtime-contract.md
[graph-validator]: https://github.com/huijoohwee/agentic-graph/blob/main/canvas/src/features/chat/chatMarkdownValidation.ts
[graph-check]: https://github.com/huijoohwee/agentic-graph/blob/main/scripts/collaboration-contract.mjs
[commerce-terms]: https://github.com/huijoohwee/agentic-commerce-os/blob/main/config/terminology-register.json
[commerce-api]: https://github.com/huijoohwee/agentic-commerce-os/blob/main/docs/runtime-api.md
[commerce-check]: https://github.com/huijoohwee/agentic-commerce-os/blob/main/scripts/validate-terminology-register.ts
[mirror-rules]: https://github.com/huijoohwee/huijoohwee/blob/main/AGENTS.md
[mirror-contract]: https://github.com/huijoohwee/huijoohwee/blob/main/docs/RUNTIME-READINESS.md
[mirror-check]: https://github.com/huijoohwee/huijoohwee/blob/main/package.json
[game-scene]: https://github.com/huijoohwee/GameXR/blob/main/shared/default-scene.json
[game-contract]: https://github.com/huijoohwee/GameXR/blob/main/docs/AGENTIC-GRAPH-HARMONIZATION.md
[game-check]: https://github.com/huijoohwee/GameXR/blob/main/package.json
