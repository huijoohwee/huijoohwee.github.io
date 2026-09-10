---
title: "Workspace Todo Contract"
graphId: "md:agentic-canvas-os-todo-contract"
doc_type: "Planning Ledger Contract"
date: "2026-08-01"
lang: "en-US"
schema: "todo-index/v3"
frontmatter_contract: "required"
status: "runtime-ready"
authority: "huijoohwee.github.io cross-repository planning index and context-record contract"
todo_root: "../todo"
active_period: "2026-09"
legacy_shard_pattern: "../todo/YYYY-MM.md"
context_record_pattern: "../todo/YYYY-MM/<context>.md"
legacy_policy: "immutable"
record_policy: "immutable"
size_limit_bytes: 500000
line_limit: 599
adoption_date: "2026-07-14"
publish_policy: "Dev-only; no Prod mirror or Cloudflare authority"
runtime_scope: "bounded planning retrieval, independently owned immutable task capture, and release compliance"
runtime_claim: "source contract and index only; reading this document performs no task mutation or deployment"
runtime_proof: "../scripts/planning-migration.mjs"
---

# Workspace Todo Contract

## Owner Migration

The operator moved the planning owner from `agentic-canvas-os` on 2026-09-10.
The [migration manifest](../todo/migration-agentic-canvas-os.json) records every imported path,
source Git blob, SHA-256 digest and byte count at the exact source revision. Imported task records
remain byte-identical; their relative `source_contract` paths resolve to this successor contract.
Canvas retains routing documents only. Existing website todo logs remain immutable history.
Run `npm run planning:check` here; planning validation and projection are owned here.
Fleet division and claim boundaries remain in [agentic-os/FLEET.md](https://github.com/huijoohwee/agentic-os/blob/main/FLEET.md).

## Authority And Boundaries

`TODO.md` is the bounded, always-loadable planning index and schema owner. New planning records live only in `../todo/YYYY-MM/<context>.md`; do not rebuild a monolithic table in this file.

The legacy monthly shards are immutable history. Each new task uses one stable kebab-case Context as its filename beneath the active UTC month. Independent tasks therefore claim only its exact context record path and never contend on a shared writable index or monthly file.

huijoohwee.github.io is the sole live planning owner for participating repositories. Repository-local todo files are forbidden because they duplicate authority and drift from immutable Context records. Committed historical rows may retain retired paths as immutable provenance, never as current routing instructions.

## Source Layout

| Source | Responsibility | Load policy |
|---|---|---|
| `TODO.md` | Schema, shard routing, lifecycle, retrieval, validation, and escalation. | Load at workflow start. |
| `../todo/YYYY-MM.md` | Immutable legacy `todo-log/v1` history. | Search only when exact record lookup is empty or history is requested. |
| `../todo/YYYY-MM/<context>.md` | One immutable `todo-context-record/v2` task record. | Load the exact Context; enumerate and sort only for a derived monthly view. |

## Context Record Frontmatter

Every new record starts with plain YAML using this contract:

```yaml
---
schema: "todo-context-record/v2"
period: "YYYY-MM"
context: "stable-kebab-case-context"
scope: "cross-repository"
status: "immutable"
record_policy: "immutable"
source_contract: "../../docs/TODO.md"
updated_date: "YYYY-MM-DD"
---
```

`period` must equal the parent directory, `context` must equal the filename, and `updated_date` must be inside the period. Status and record policy remain `immutable`. At UTC month rollover, update `active_period`; prior records and all legacy monthly shards remain byte-immutable.

## Row Contract

Each record has exactly one dated section and one canonical 11-column row:

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|---|---|---|---|---|---|---|---|---|---|---|

For every `todo-context-record/v2` record:

- create one complete row under an exact `## YYYY-MM-DD` UTC heading;
- keep the heading and `Updated Date` equal to frontmatter `updated_date`;
- fill all 11 cells; forbid empty cells and placeholder `-` values;
- keep `Directive` at 50 words or fewer;
- set `Updated Date` equal to the enclosing dated heading;
- name the affected source in `Module` and use a stable, unique `Context`;
- bind the row Context to both filename and frontmatter, then never rewrite the record.

Legacy `todo-log/v1` monthly shards are immutable, byte-preserved historical evidence. They are parsed only for deterministic projection and duplicate-Context detection, not retroactively normalized.

## Append And Merge Rules

- Record the exact huijoohwee.github.io base ref before the first task write.
- Claim only `todo/YYYY-MM/<context>.md` plus the semantic Context; shared planning files are not task write targets.
- Release requires the record to be absent at base and exactly one new record path for the declared Context.
- A monthly view is derived deterministically from legacy rows and context records ordered by date, Context, then source path.
- Changing a committed record, any legacy shard, or index identity requires a new contract version and migration proof.

## Retrieval And Token Economics

1. Load `TODO.md` plus the exact Context record by default.
2. Resolve an exact month or Context with `rg` before loading more files.
3. Search legacy and adjacent periods only when exact lookup is empty.
4. Add local BM25 ranking only after exact search becomes noisy.
5. Add embeddings only after measured keyword-retrieval failure and approved TCO review.

This keeps routine planning context bounded to one small index and one exact Context record instead of sending the full history to every model call.

## Size And Rollover

- Each context record stays below 500,000 bytes and 600 lines.
- Month rollover updates only `active_period`; it does not create a shared writable shard.
- Never split or rewrite committed records or legacy shards. A migration requires preserved source hashes, a mapping ledger, and explicit operator approval.

## Compliance Gates

Startup validates the index, immutable legacy identities, every context record, path/frontmatter identity, unique Context ownership, the one-row schema, date boundary, and size budget. Release additionally proves legacy shards unchanged, the declared record absent at base, and exactly one new Context record.

Any malformed record, legacy rewrite, missing declared Context, duplicate task Context, overlong directive, empty cell, wrong-month heading, wrong Updated Date, or extra planning path blocks the next workflow stage.

`active_period` records also project read-only into the `## Ledger Projection` table of `kanban.md` through `scripts/kanban-projection.mjs`. The projection is a consumer, never an authority: it adds no status, owner, or priority to a record, and board edits cannot write back here. Adding or changing a record shifts the projection, so regenerate with `npm run kanban:project` in the same change.

## Completion VCC

Given the Todo index and planning root, when compliance runs, then every new record resolves to one Context/month, legacy history remains immutable, and concurrent tasks own disjoint complete records.

VCC: verify frontmatter and path identity, unique Context ownership, deterministic projection, legacy immutability, and one new strict Context record relative to the base; stop without provider, Prod, or Cloudflare mutation.
