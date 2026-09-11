#!/usr/bin/env node
// Responsibility: Project the immutable planning ledger into the Kanban board as
// generated, digest-fenced rows that no hand edit can silently diverge from.
//
// The ledger (docs/TODO.md plus todo/<period>/<context>.md) is append-only and
// write-once: a record has no assignee, priority, or done marker, so progress is
// not representable there. The board owns coordination vocabulary but held one
// authored row, so the six declared row statuses advertised a practice nothing
// exercised.
//
// This projector connects the two without inventing state:
//   - it reuses the existing planning contract as the single ledger parser,
//   - it renders only the active period, because the legacy shards hold ~601
//     rows and would breach the board's own <600 line budget,
//   - it derives every cell from a recorded cell or marks the field absent:
//     acceptance <- Output (v2) or `O:` plus its named check (v3),
//     evidence   <- Decision Logic (v2) or the PRD-TAD-ADR-MVP-GTM reference (v3),
//     next_action <- Next Step Recommendation (v2) or `D:` (v3).
//
// Deliberately NOT derived: priority, owner_profile, worker_process, and
// target_profile. The ledger records none of them, so the projection emits the
// declared absent value rather than guessing an owner. Likewise every projected
// row carries exactly one status, `review`: the decision is recorded and
// immutable, and its recommendation is outstanding. `backlog`, `ready`, `doing`,
// `blocked`, and `done` stay reachable only for board-authored rows, which are a
// separate table with a separate owner.

import { readFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { writeGeneratedFile } from "agentic-os/generation";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { validatePlanningContextRecordContract } from "./planning-context-record-contract.mjs";
import { scanFrontmatter, frontmatterObject } from "./lib/planning-frontmatter.mjs";

const REPOSITORY_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const KANBAN_DOCS_PATH = "kanban.md";
export const BEGIN_MARKER = "<!-- kanban-projection:begin";
export const END_MARKER = "<!-- kanban-projection:end -->";
export const PROJECTED_STATUS = "review";
export const PROJECTED_TYPE = "task";
export const ABSENT_FIELD = "none";
export const ABSENT_PRIORITY = "0";

export const BOARD_COLUMNS = Object.freeze([
  "id", "type", "status", "priority", "owner_profile", "worker_process",
  "target_profile", "context_refs", "acceptance", "evidence", "next_action",
]);

// Ledger cell offsets in the legacy 11-column planning row. The contract supplies
// normalized `fields` for both row schemas; the offsets remain for callers that
// still pass raw legacy cells.
const LEDGER_OUTPUT = 7;
const LEDGER_DECISION_LOGIC = 8;
const LEDGER_NEXT_STEP = 9;

export function projectLedgerRow({ context, source, cells, fields }) {
  const recorded = fields ?? {
    outcome: cells[LEDGER_OUTPUT],
    decision: cells[LEDGER_DECISION_LOGIC],
    next: cells[LEDGER_NEXT_STEP],
  };
  return Object.freeze({
    id: context,
    type: PROJECTED_TYPE,
    status: PROJECTED_STATUS,
    priority: ABSENT_PRIORITY,
    owner_profile: ABSENT_FIELD,
    worker_process: ABSENT_FIELD,
    target_profile: ABSENT_FIELD,
    context_refs: `\`${source}\``,
    acceptance: recorded.outcome,
    evidence: recorded.decision,
    next_action: recorded.next,
  });
}

export function collectProjectedRows({ repository = REPOSITORY_ROOT } = {}) {
  const ledger = validatePlanningContextRecordContract({ repository });
  if (!ledger.ok) {
    return { rows: [], period: null, failures: ledger.failures.map((failure) => `ledger: ${failure}`) };
  }
  const period = activePeriod(repository);
  if (!period) return { rows: [], period: null, failures: ["docs/TODO.md: active_period is unreadable"] };

  const prefix = `todo/${period}/`;
  const rows = ledger.projection
    .filter((item) => item.source.startsWith(prefix))
    .map((item) => projectLedgerRow(item));
  return { rows, period, failures: [] };
}

export function renderProjection({ rows, period }) {
  if (!Array.isArray(rows) || rows.length > 400) throw new Error('kanban projection row budget exceeded');
  let bytes = 0;
  for (const row of rows) for (const column of BOARD_COLUMNS) {
    bytes += Buffer.byteLength(String(row[column] ?? ''), 'utf8');
    if (bytes > 400000) throw new Error('kanban projection byte budget exceeded');
  }
  const body = [
    `| ${BOARD_COLUMNS.join(" | ")} |`,
    `|${BOARD_COLUMNS.map((column) => column === "priority" ? "---:" : "---").join("|")}|`,
    ...rows.map((row) => `| ${BOARD_COLUMNS.map((column) => row[column]).join(" | ")} |`),
  ].join("\n");
  const digest = createHash("sha256").update(body, "utf8").digest("hex");
  return {
    digest,
    block: [
      `${BEGIN_MARKER} period=${period} rows=${rows.length} digest=${digest} -->`,
      body,
      END_MARKER,
    ].join("\n"),
  };
}

export function replaceProjectionBlock(text, block) {
  const begin = text.indexOf(BEGIN_MARKER);
  const end = text.indexOf(END_MARKER);
  if (begin < 0 || end < 0 || end < begin) return null;
  return `${text.slice(0, begin)}${block}${text.slice(end + END_MARKER.length)}`;
}

export function validateKanbanProjection(documents, { repository = REPOSITORY_ROOT } = {}) {
  const text = documents.get(KANBAN_DOCS_PATH);
  if (typeof text !== "string") return [`${KANBAN_DOCS_PATH}: board is absent from the docs artifact set`];

  const { rows, period, failures } = collectProjectedRows({ repository });
  if (failures.length > 0) return failures.map((failure) => `${KANBAN_DOCS_PATH}: ${failure}`);

  const { block, digest } = renderProjection({ rows, period });
  const regenerated = replaceProjectionBlock(text, block);
  if (regenerated === null) {
    return [`${KANBAN_DOCS_PATH}: projection fence markers are missing or out of order`];
  }
  if (regenerated !== text) {
    return [
      `${KANBAN_DOCS_PATH}: projected rows have drifted from the immutable ledger; `
      + `regenerate with \`npm run kanban:project\` (expected ${rows.length} rows for `
      + `${period} at digest ${digest})`,
    ];
  }

  const boardFailures = [];
  const declared = {
    projection_owner: "scripts/kanban-projection.mjs",
    projection_source: "../todo",
    projection_period: period,
    projection_row_count: String(rows.length),
    projection_digest: digest,
    projection_status: PROJECTED_STATUS,
  };
  for (const [key, value] of Object.entries(declared)) {
    if (boardScalar(text, key) !== value) {
      boardFailures.push(`${KANBAN_DOCS_PATH}: ${key} must be ${JSON.stringify(value)}`);
    }
  }

  // A projected id must never collide with a board-authored row id.
  const authoredIds = authoredRowIds(text);
  for (const row of rows) {
    if (authoredIds.includes(row.id)) {
      boardFailures.push(`${KANBAN_DOCS_PATH}: projected id ${row.id} collides with an authored row`);
    }
  }
  return boardFailures;
}

// The board frontmatter carries nested blocks, which the flat alignment-audit
// scanner rejects by design, so read the top-level scalars directly here.
function boardScalar(text, key) {
  const end = text.indexOf("\n---\n", 4);
  const frontmatter = end < 0 ? "" : text.slice(4, end);
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
  if (!match) return null;
  const raw = match[1].trim();
  const quoted = raw.match(/^(?:"([^"]*)"|'([^']*)')$/);
  return (quoted?.[1] ?? quoted?.[2] ?? raw).trim();
}

function authoredRowIds(text) {
  const begin = text.indexOf(BEGIN_MARKER);
  const authoredText = begin < 0 ? text : text.slice(0, begin);
  return authoredText
    .split("\n")
    .filter((line) => line.startsWith("| KANBAN-"))
    .map((line) => line.slice(1).split("|")[0].trim());
}

function activePeriod(repository) {
  try {
    const scanned = scanFrontmatter(
      readFileSync(path.join(repository, "docs", "TODO.md"), "utf8"),
    );
    return frontmatterObject(scanned.frontmatter).active_period || null;
  } catch {
    return null;
  }
}

async function runCli() {
  const write = process.argv.includes("--write");
  const boardPath = path.join(REPOSITORY_ROOT, "docs", KANBAN_DOCS_PATH);
  const text = await readFile(boardPath, "utf8");

  if (!write) {
    const failures = validateKanbanProjection(new Map([[KANBAN_DOCS_PATH, text]]));
    if (failures.length > 0) {
      console.error(failures.join("\n"));
      process.exitCode = 1;
      return;
    }
    const { rows, period } = collectProjectedRows();
    console.log(
      `kanban projection ok: ${rows.length} ledger rows projected for ${period} at status ${PROJECTED_STATUS}`,
    );
    return;
  }

  const { rows, period, failures } = collectProjectedRows();
  if (failures.length > 0) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
    return;
  }
  const { block, digest } = renderProjection({ rows, period });
  const replaced = replaceProjectionBlock(text, block);
  if (replaced === null) {
    console.error(`${KANBAN_DOCS_PATH}: projection fence markers are missing or out of order`);
    process.exitCode = 1;
    return;
  }
  const stamped = replaced
    .replace(/^projection_period: .*$/m, `projection_period: "${period}"`)
    .replace(/^projection_row_count: .*$/m, `projection_row_count: ${rows.length}`)
    .replace(/^projection_digest: .*$/m, `projection_digest: "${digest}"`);
  const result = await writeGeneratedFile(boardPath, stamped);
  console.log(`kanban projection ${result.written ? 'written' : 'unchanged'}: ${rows.length} rows for ${period}; digest ${digest}`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await runCli();
}
