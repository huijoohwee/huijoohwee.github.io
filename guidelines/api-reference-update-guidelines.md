# API Reference Update Guidelines

## Overview

**API reference codebase index**: regenerate index files from TypeScript SSOT source to preserve single-source-of-truth accuracy, forbid manual edits to generated artifacts, enable drift detection via check mode, and maintain provider-agnostic generation contracts.

**Governing standards**: TypeScript source is the authoritative SSOT; markdown index files are generated artifacts; CLI script produces deterministic output; drift detection prevents stale documentation; provider-specific logic lives in SSOT source rows, not in the generation pipeline.

---

## CID Framework

### Definition
- **Context**: focus domain of concern
- **Intent**: desired principle or guiding goal
- **Directive**: explicit prohibition or required safeguard

### Sorting
Each entry is organized alphabetically (A→Z) for clarity and neutrality.

---

## From 0 to 1: Index Regeneration Process

A sequential, phase-gated process for keeping API reference index files synchronized with TypeScript SSOT source.

### Phase 0 — Source Authoring
**Before regenerating, ensure SSOT source rows are correct.**

1. Add, remove, or update rows in the TypeScript SSOT source file (e.g., `openaiResponsesSsot.ts`)
2. Each row must include: `key`, `typeLabel`, `value`, `responsibility`, and optional `modules`, `classes`, `functions`
3. Verify row fields reflect current runtime behavior (defaults, ranges, constraints)
4. Run existing tests to confirm no regressions from source changes

**Gate**: proceed only when SSOT source rows are validated and tests pass.

### Phase 1 — Generation
**Run the CLI script to regenerate index files from SSOT source.**

1. Run `npm run api-index:generate` to regenerate all index files
2. Or run `npm run api-index:generate -- <filename>` to regenerate a specific file
3. Or run `npm run api-index:generate -- <provider>` to regenerate by provider name
4. Script reads TypeScript SSOT exports via dynamic import
5. Script writes markdown table to the output directory

**Gate**: generation completes without errors; output files are written.

### Phase 2 — Drift Detection
**Verify generated output matches committed files.**

1. Run `npm run api-index:check` to detect drift without modifying files
2. Script compares generated output against existing files
3. Exit code 0 = all files up to date; exit code 1 = drift detected
4. Integrate `api-index:check` into CI/pre-push hooks

**Gate**: drift check passes before committing generated files.

### Phase 3 — Commit
**Commit both SSOT source changes and regenerated index files together.**

1. Stage both TypeScript source changes and regenerated markdown files
2. Commit with a message referencing the provider and change scope
3. Push only after drift check passes in CI

**Gate**: both source and generated artifacts are committed atomically.

---

## Flow Patterns

### Data Flow
**Traces how API parameter metadata moves from TypeScript source to markdown index.**

```
TypeScript SSOT Source → CLI Script (import + transform) → Markdown Table → Committed Artifact
```

| Stage     | Component                    | Input Format    | Output Format   | Persistence | Error Handling    |
|-----------|------------------------------|-----------------|-----------------|-------------|-------------------|
| Ingest    | CLI script                   | TS module path  | SsotRow[]       | None        | SKIP + log        |
| Transform | buildRow()                   | SsotRow + Spec  | Table row       | None        | Fallback defaults |
| Store     | writeFileSync                | Markdown string | .md file        | Disk        | mkdir recursive   |
| Serve     | Documentation site           | .md file        | Rendered table  | Git         | N/A               |

### Workflow Flow
**Maps how index regeneration tasks sequence through actors and decisions.**

**Trigger**: SSOT source row changes or new provider integration

**Happy Path**:
1. Developer updates TypeScript SSOT source rows
2. Developer runs `npm run api-index:generate`
3. CLI script imports SSOT, transforms rows, writes markdown
4. Developer runs `npm run api-index:check` to verify
5. Developer commits source + generated files

**Alternate Paths**:
- Single file: `npm run api-index:generate -- knowgrph-openai-images-api-reference-codebase-index.md`
- Single provider: `npm run api-index:generate -- deerflow`
- Verbose mode: `npm run api-index:generate -- --verbose`

**Error Paths**:
- Source not found: `SKIP: source not found` logged, continues to next spec
- Export not array: `SKIP: export is not an array` logged, continues
- Import failure: `SKIP: failed to import` logged, continues
- Drift detected: exit code 1, `DRIFT: N file(s) differ` message

**Postconditions**: All index files in the output directory reflect current SSOT source state.

---

## CID Reference Table

Each row is a universal, neutral, project-agnostic mantra: `Context | Intent | Directive`

| Context          | Intent                                    | Directive                                                                                          |
|------------------|-------------------------------------------|---------------------------------------------------------------------------------------------------|
| Artifacts        | Treat index files as generated outputs    | - [ ] Regenerate from source; treat as artifacts; forbid manual edits to generated index files    |
| Authority        | Establish TypeScript as SSOT              | - [ ] Derive from TypeScript source; establish authority; forbid markdown-first changes           |
| Automation       | Enable CLI-driven regeneration            | - [ ] Use CLI script for generation; enable automation; forbid manual copy-paste updates          |
| Check            | Detect drift between source and output    | - [ ] Run drift detection before commit; detect drift; forbid unchecked stale files               |
| Columns          | Maintain stable table schema              | - [ ] Keep 18-column schema; maintain stability; forbid column additions without migration        |
| Commit           | Atomically commit source and output       | - [ ] Stage source and generated files together; commit atomically; forbid split commits          |
| Defaults         | Infer from SSOT row values                | - [ ] Derive defaults from source; infer from rows; forbid hardcoded default values              |
| Drift            | Prevent stale documentation               | - [ ] Integrate check into CI; prevent drift; forbid unchecked index files in main                |
| Filtering        | Support targeted regeneration             | - [ ] Allow filename or provider filter; support targeting; forbid all-or-nothing generation only |
| Headers          | Preserve consistent document structure    | - [ ] Keep `## Table` header; preserve structure; forbid header format changes                    |
| Imports          | Resolve SSOT via module path              | - [ ] Use import paths for SSOT resolution; resolve dynamically; forbid hardcoded file reads      |
| Neutrality       | Keep generation logic provider-agnostic   | - [ ] Design provider-neutral pipeline; maintain neutrality; forbid provider-specific generation  |
| Output           | Write deterministic markdown tables       | - [ ] Produce stable output; write deterministically; forbid non-deterministic generation        |
| Provider         | Map source to output via spec             | - [ ] Define spec per provider; map explicitly; forbid implicit source-output associations        |
| Rows             | Transform SSOT rows to table rows         | - [ ] Map row fields to columns; transform consistently; forbid field-specific special cases      |
| Source           | Read from TypeScript SSOT exports         | - [ ] Import named exports; read from source; forbid duplicating data in the script              |
| Spec             | Define source-to-output mapping           | - [ ] Configure via INDEX_SPECS array; define mapping; forbid scattered mapping logic            |
| Types            | Infer column values from row metadata     | - [ ] Derive type, required, pattern from source; infer from metadata; forbid hardcoded inference |

---

## CLI Reference

### Script Location
`canvas/src/cli/generateApiCodebaseIndex.ts`

### Commands

| Command                              | Description                                      |
|--------------------------------------|--------------------------------------------------|
| `npm run api-index:generate`         | Regenerate all index files from SSOT source      |
| `npm run api-index:generate -- <f>`  | Regenerate specific file by filename             |
| `npm run api-index:generate -- <p>`  | Regenerate files for provider name               |
| `npm run api-index:generate -- --verbose` | Regenerate with detailed logging            |
| `npm run api-index:check`            | Check for drift without modifying files          |
| `npm run api-index:check -- --verbose` | Check with detailed logging                   |

### INDEX_SPECS Configuration

Each spec maps a TypeScript SSOT source to an output markdown file:

| Provider              | Source File                                          | Output Filename                                                        |
|-----------------------|------------------------------------------------------|------------------------------------------------------------------------|
| OpenAI Responses      | `openaiResponsesSsot.ts`                             | `knowgrph-openai-responses-api-reference-codebase-index.md`            |
| OpenAI Images         | `openaiImagesSsot.ts`                                | `knowgrph-openai-images-api-reference-codebase-index.md`               |
| BytePlus ModelArk     | `byteplusSharedTextApiSsot.rows.ts`                  | `knowgrph-byteplus-modelark-chat-api-reference-codebase-index.md`      |
| BytePlus ModelArk     | `byteplusImageGenerationSsot.ts`                     | `knowgrph-byteplus-modelark-image-generation-api-reference-codebase-index.md` |
| BytePlus ModelArk     | `byteplusVideoGenerationSsot.ts`                     | `knowgrph-byteplus-modelark-video-generation-api-reference-codebase-index.md` |
| GrabMaps              | `grabMapsSsot.rows.ts`                               | `knowgrph-grabmaps-api-reference-codebase-index.md`                    |
| DeerFlow Gateway      | `deerflowApiDocs.ts`                                 | `knowgrph-deerflow-gateway-api-reference-codebase-index.md`            |

### Output Directory
`docs/documents/knowgrph-api-reference/api-reference-codebase-index_202604261230/`

### Table Schema (18 columns)

| Column           | Source                                      | Description                              |
|------------------|---------------------------------------------|------------------------------------------|
| endpoint         | `spec.endpointPrefix` or inferred from key  | API endpoint or ALL for config           |
| kind             | `config`, `param`, `proxy`, `runtime`       | Row category                             |
| key              | `row.key`                                   | Parameter or config key name             |
| type             | Inferred from `row.typeLabel`               | `string`, `number`, `boolean`, `json`    |
| value            | `row.value`                                  | Default value or constraint description  |
| required         | Inferred from `row.value` prefix            | `yes` or `no`                            |
| direction        | Always `in`                                 | Request parameter direction              |
| actor            | Inferred from key (Operator/Caller/Proxy)   | Who supplies the value                   |
| seq-note         | `—`                                         | Reserved for sequence notes              |
| location         | `—` or `body`/`header`                      | Parameter location in request            |
| scope            | `—`                                         | Reserved for scope                       |
| pattern          | Inferred from `row.typeLabel`               | `scalar`, `array<union>`, `union`, `map` |
| key-description  | `row.responsibility`                        | SVO description of the key's purpose     |
| value-description| `row.value`                                  | Default, range, and impact description   |
| module           | `row.modules` or source file                | Source module paths                      |
| class            | `row.classes`                               | Related class names                      |
| function         | `row.functions`                             | Related function names                   |

---

## Adding a New Provider

1. Create the TypeScript SSOT source file with exported row array
2. Add an `IndexSpec` entry to `INDEX_SPECS` in the CLI script
3. Run `npm run api-index:generate` to produce the initial index file
4. Run `npm run api-index:check` to verify
5. Commit source + generated file atomically

---

## Anti-Pattern Guards

Manual edits to generated index files
→ Regenerate from SSOT source via CLI script

Split commits (source without generated, or vice versa)
→ Commit source and generated files in the same commit

Skipping drift check before push
→ Integrate `api-index:check` into CI or pre-push hook

Hardcoding defaults or types in the generation script
→ Infer from SSOT row metadata; keep generation logic provider-agnostic

Adding provider-specific logic to the CLI script
→ Encode provider specifics in SSOT source rows; keep the script neutral

---

## Validation Checklist

**Pre-Generation**:
- [ ] SSOT source rows are updated and validated
- [ ] Existing tests pass with source changes
- [ ] No manual edits pending in generated index files

**Post-Generation**:
- [ ] `npm run api-index:check` exits with code 0
- [ ] Generated table has 18 columns matching the schema
- [ ] Row count matches SSOT source export length
- [ ] No `SKIP` or error messages in generation output

**Pre-Commit**:
- [ ] Both SSOT source and generated files are staged
- [ ] Commit message references provider and change scope
- [ ] CI drift check passes

---

## Role—Action—Outcome

**SSOT Author** → updates TypeScript source rows with accurate parameter metadata → produces authoritative API parameter definitions → enables correct index generation

**CLI Operator** → runs generation and drift check commands → produces or validates markdown index files → keeps documentation synchronized with source

**Integration Author** → adds new provider spec to INDEX_SPECS → extends generation coverage to new providers → maintains universal generation pipeline

**CI Pipeline** → runs drift check on every push → detects stale index files → prevents documentation drift from reaching main
