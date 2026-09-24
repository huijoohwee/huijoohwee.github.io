---
title: "Shared Runtime Frontmatter Guidelines"
doc_type: "Guidelines"
version: "1.0.0"
date: "2026-09-10"
lang: "en-US"
owner: "shared metadata authoring"
frontmatter_contract: "required"
local_rung: "spec-complete"
delivered_rung: "undocumented"
---

# Shared runtime frontmatter guidelines

This is the common authoring contract for agent-readable Markdown. It applies
independently of editor, model, agent provider, repository layout and operating
system. Load it when authoring or validating metadata; do not add the complete
guide to every session prompt.

## Ownership and local profiles

| Concern | Source owner | Consumer responsibility |
|---|---|---|
| Common authoring rules | This guideline | Reference it; do not copy or override its rules |
| CID, RAO, SVO and readiness meanings | [PRD/TAD/ADR](prd-tad-adr-mvp-gtm-guidelines.md), [CID](cid-guidelines.md), [shared schema](../schema/AgenticRAG/roles-actions-outcomes-schema.jsonld) | Reuse their fields and revisions |
| Parsed-data envelope and dictionary metadata | `agentic-os/frontmatter`, `agentic-os/invocation`, `agentic-os/catalog/dictionaries` | Install an exact revision; load requested assets only |
| Product fields, YAML dialect and executable checks | The product's local contract and validator | Declare required fields, unknown-key policy and bounded checks |
| Deployed readiness, approvals and other effects | The product's evidence and authority owners | Verify exact source, environment and outcome |

The website's `scripts/lib/git-guidelines/fm-reader.mjs` remains its restricted
YAML syntax adapter. `agentic-os` owns its parsed-data boundary; the website's
`frontmatter.mjs` owns guideline-specific field validation and findings.
Graph's `docs/runtime-readiness-contract.md` and
`docs/collaboration-runtime-contract.md` remain local executable profiles,
validated by their corresponding scripts. Nested deployment configuration,
CI scopes, invocation policy and product proof requirements stay with Graph.
The [Canvas view profile](yaml-frontmatter-guidelines.md) owns renderer fields.
Installing the shared API does not imply every local profile has adopted it.

## Common authoring rules

- Place one opening YAML mapping at the start of the document, before prose,
  HTML, comments or code fences. Declare the parser dialect in the local profile;
  duplicate keys and silently repaired malformed input are invalid.
- Use plain YAML authoring. Normalized `{key, type, value}` wrappers belong only
  in explicitly identified ingest/parse/render or validation fidelity fixtures.
- Quote scalars when YAML punctuation could change their meaning, including
  embedded colon-space, leading sigils and comment indicators.
- Frontmatter owns identity, version, status and reusable metadata. Body prose
  may reference those values; it must not introduce a second editable metadata
  block or compete with the local schema.
- Reuse the existing semantic owners above. A local profile may add product
  fields or narrow valid values; it must not redefine CID, RAO, SVO or readiness.
- Keep static requirements separate from dated observations. A status or rung
  label is a claim, never proof or permission. Bind each observation to its
  exact source revision, check, result and environment through the existing
  [readiness contract](adlc-repository-runtime-readiness.md).
- Use the existing provenance fields and continuity joins from the
  [PRD/TAD/ADR authoring contract](prd-tad-adr-mvp-gtm-guidelines.md). Do not invent
  parallel `runtime_ready: true` shortcuts or vendor-specific identity fields.
- Do not store credentials, live signed URLs or private runtime artifacts in
  metadata. Reference the evidence owner using its established contract.

## Validation and distribution

Validate in order: bounded input read -> local strict YAML parse -> shared
parsed-data envelope -> local semantic profile -> separately obtained evidence.
The shared envelope is `snapshotFrontmatter` from the exact installed
`agentic-os/frontmatter` revision; its limits are defined there. It returns a
detached immutable JSON mapping and rejects aliases/cycles, accessors, proxies,
non-JSON objects, non-finite numbers and over-budget input. Local parser
adapters must enforce byte, delimiter, duplicate-key and dialect rules first.
Do not fetch a schema URL from untrusted frontmatter or scan sibling checkouts.
Select reviewed local schemas explicitly and record the consumed revision.

Keep consumer-specific parsing behavior until compatibility fixtures justify
a change. The website's bounded subset is not a substitute for Graph's richer
YAML syntax. Parser recovery is diagnostic only; correct malformed source.
Positive and negative tests must exercise the actual consumer parser/profile,
including duplicate keys, unsupported syntax and resource limits.

Dictionary definitions and parsing belong to `agentic-os`. Consumers own
execution and UI routing. A published raw-document compatibility projection
may reproduce the exact locked asset only with a byte-equality CI gate and
an explicit refresh command. It has no independent editing or runtime authority.
Other consumers resolve the package export directly; missing assets fail closed.

## Reviewed Markdown template maintenance

For an explicitly enrolled, non-executable Markdown document, keep its template
source in the existing `source_docs` list as one exact Git commit-and-path URL.
The local profile still owns YAML syntax, required fields and unknown-key policy.
The document's own `version` and readiness fields describe that document; they
do not become template pins or change when a template is checked.

An enrolled document may carry one pair of managed-region markers from the
[central Markdown template](../template/document-maintenance-template.md). The
updater compares the old pinned template region, the current authored region,
and the proposed pinned template region. It preserves every byte outside the
markers, including local frontmatter, body notes and renderer metadata. A
missing baseline, ambiguous marker, overlapping edit, incompatible profile,
or unknown source revision produces a finding without updating the document.

The updater accepts reviewed local source revisions only. Never fetch a schema
or executable instruction from authored frontmatter, infer enrollment from a
filename, or treat `source_docs` as effect authority. Consumers validate the
candidate through their real parser and CI owner before publication; source
release and any delivery remain separately authorized.

Validation owners: `agentic-os npm run check`; website `npm test`; Graph
`npm run test:collaboration-contract` for local executable-profile changes;
Canvas `npm run dictionary-catalog:check` for dictionary projections.
These are source/profile checks, not production-release evidence.
