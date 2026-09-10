import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  ABSENT_FIELD,
  ABSENT_PRIORITY,
  BEGIN_MARKER,
  BOARD_COLUMNS,
  END_MARKER,
  KANBAN_DOCS_PATH,
  PROJECTED_STATUS,
  PROJECTED_TYPE,
  collectProjectedRows,
  projectLedgerRow,
  renderProjection,
  replaceProjectionBlock,
  validateKanbanProjection,
} from "../scripts/kanban-projection.mjs";

const boardText = () => {
  const { block, digest } = renderProjection({ rows: [], period: "2026-09" });
  return ['---', 'projection_owner: "scripts/kanban-projection.mjs"', 'projection_source: "../todo"',
    'projection_period: "2026-09"', 'projection_row_count: 0', `projection_digest: "${digest}"`,
    'projection_status: "review"', '---', '', '# Synthetic board', '',
    '| KANBAN-0001 | task | ready | 1 | operator | none | none | example | outcome | evidence | next |',
    '', block, ''].join('\n');
};

test("a selected board matches the regenerated ledger projection", async t => {
  const fixture = await createFixture(t);
  assert.deepEqual(validateKanbanProjection(fixture.documents, { repository: fixture.repository }), []);
});

for (const [label, contexts, expected] of [
  ["empty", [], []],
  ["one-record", ["single-task"], ["single-task"]],
  ["multiple-record", ["beta-task", "alpha-task", "later-task"], ["alpha-task", "beta-task", "later-task"]],
]) {
  test(`the ${label} month projects exactly its active records`, async (t) => {
    const fixture = await createFixture(t, contexts);
    const { rows, period, failures } = collectProjectedRows({ repository: fixture.repository });
    assert.deepEqual(failures, []);
    assert.equal(period, "2026-09");
    assert.deepEqual(rows.map(({ id }) => id), expected);
    assert.deepEqual(rows.map(({ context_refs }) => context_refs),
      expected.map((context) => `\`todo/2026-09/${context}.md\``));
    assert.equal(new Set(rows.map(({ id }) => id)).size, contexts.length);
    assert.deepEqual(validateKanbanProjection(fixture.documents, {
      repository: fixture.repository,
    }), []);
    assert.match(fixture.text, new RegExp(`^projection_row_count: ${contexts.length}$`, "m"));
  });
}

test("every projected cell is either recorded or a declared absent value", async (t) => {
  const fixture = await createFixture(t);
  const { rows } = collectProjectedRows({ repository: fixture.repository });
  assert.equal(rows.length, 2);
  for (const row of rows) {
    assert.deepEqual(Object.keys(row), [...BOARD_COLUMNS]);
    assert.equal(row.type, PROJECTED_TYPE);
    assert.equal(row.status, PROJECTED_STATUS);
    // The ledger records no priority, owner, worker, or target, so the
    // projection must not manufacture one.
    assert.equal(row.priority, ABSENT_PRIORITY);
    assert.equal(row.owner_profile, ABSENT_FIELD);
    assert.equal(row.worker_process, ABSENT_FIELD);
    assert.equal(row.target_profile, ABSENT_FIELD);
    for (const column of ["acceptance", "evidence", "next_action"]) {
      assert.notEqual(row[column].trim(), "");
      assert.ok(!row[column].includes("|"), `${row.id} ${column} must not break the table`);
    }
  }
});

test("cells map to the recorded Output, Decision Logic, and Next Step columns", () => {
  const cells = [
    "sample-context", "intent", "directive", "module", "class", "function",
    "input", "recorded output", "recorded decision logic", "recorded next step",
    "2026-08-01",
  ];
  const row = projectLedgerRow({
    context: "sample-context",
    source: "todo/2026-08/sample-context.md",
    cells,
  });
  assert.equal(row.id, "sample-context");
  assert.equal(row.acceptance, "recorded output");
  assert.equal(row.evidence, "recorded decision logic");
  assert.equal(row.next_action, "recorded next step");
  assert.equal(row.context_refs, "`todo/2026-08/sample-context.md`");
});

test("v3 records project the outcome with its check, the artifact reference, and the directive", async (t) => {
  const fixture = await createFixture(t, ["alpha-task"]);
  await writeContextRecordV3(fixture.repository, "joined-task", "2026-09-04");
  const { rows, failures } = collectProjectedRows({ repository: fixture.repository });
  assert.deepEqual(failures, []);
  const row = rows.find(({ id }) => id === "joined-task");
  assert.equal(row.acceptance, "one validated record (check: npm run planning:check)");
  assert.equal(row.evidence, "`PRD-TAD-ADR-EXAMPLE-001@1.0.0`");
  assert.equal(row.next_action, "Author one v3 record joined to the artifact.");
  assert.equal(row.context_refs, "`todo/2026-09/joined-task.md`");
  assert.equal(row.status, PROJECTED_STATUS);
});

test("the rendered block is fenced, digest-stamped, and priority-aligned", () => {
  const { block, digest } = renderProjection({
    rows: [projectLedgerRow({
      context: "a-context",
      source: "todo/2026-08/a-context.md",
      cells: ["a-context", "i", "d", "m", "c", "f", "in", "out", "logic", "next", "2026-08-01"],
    })],
    period: "2026-08",
  });
  assert.ok(block.startsWith(`${BEGIN_MARKER} period=2026-08 rows=1 digest=${digest} -->`));
  assert.ok(block.endsWith(END_MARKER));
  assert.match(block, /\|---\|---\|---\|---:\|/);
  assert.match(digest, /^[0-9a-f]{64}$/);
});

test("a hand edit inside the fence fails closed", async (t) => {
  const { text, repository } = await createFixture(t);
  const tampered = text.replace(/^\| ([a-z0-9-]+) \| task \| review \|/m, "| $1 | task | done |");
  assert.notEqual(tampered, text, "the fixture must contain a projected row");
  const failures = validateKanbanProjection(new Map([[KANBAN_DOCS_PATH, tampered]]), { repository });
  assert.equal(failures.length, 1);
  assert.match(failures[0], /drifted from the immutable ledger/);
  assert.match(failures[0], /npm run kanban:project/);
});

test("stale declared row count, digest, and period fail for empty and populated months", async (t) => {
  for (const contexts of [[], ["single-task"], ["beta-task", "alpha-task"]]) {
    const { text, repository } = await createFixture(t, contexts);
    for (const [pattern, replacement, expected] of [
      [/^projection_row_count: \d+$/m, `projection_row_count: ${contexts.length + 1}`, "projection_row_count"],
      [/^projection_digest: ".*"$/m, `projection_digest: "${"0".repeat(64)}"`, "projection_digest"],
      [/^projection_period: ".*"$/m, 'projection_period: "1999-01"', "projection_period"],
    ]) {
      const tampered = text.replace(pattern, replacement);
      assert.notEqual(tampered, text, `${expected} control must change the fixture`);
      const failures = validateKanbanProjection(
        new Map([[KANBAN_DOCS_PATH, tampered]]), { repository },
      );
      assert.ok(
        failures.some((failure) => failure.includes(expected)),
        `${expected} drift must fail closed with ${contexts.length} records`,
      );
    }
  }
});

test("missing fence markers fail closed rather than silently skipping", async t => {
  const { text, repository } = await createFixture(t);
  const stripped = text.slice(0, text.indexOf(BEGIN_MARKER))
    + text.slice(text.indexOf(END_MARKER) + END_MARKER.length);
  const failures = validateKanbanProjection(new Map([[KANBAN_DOCS_PATH, stripped]]), { repository });
  assert.equal(failures.length, 1);
  assert.match(failures[0], /fence markers are missing or out of order/);
  assert.equal(replaceProjectionBlock(stripped, "block"), null);
});

test("authored rows keep the full status vocabulary and stay outside the fence", async () => {
  const text = await boardText();
  const authored = text.slice(0, text.indexOf(BEGIN_MARKER));
  assert.match(authored, /^\| KANBAN-0001 \| task \| ready \| 1 \| operator \|/m);
  const projected = text.slice(text.indexOf(BEGIN_MARKER));
  assert.ok(!projected.includes("KANBAN-"), "authored ids must not appear inside the fence");
});

test("legacy monthly shards and inactive context records are not projected", async (t) => {
  const { text } = await createFixture(t);
  const projected = text.slice(text.indexOf(BEGIN_MARKER), text.indexOf(END_MARKER));
  assert.ok(!/`todo\/\d{4}-\d{2}\.md`/.test(projected), "legacy shard rows must stay history");
  assert.ok(!projected.includes("legacy-task"));
  assert.ok(!projected.includes("past-task"));
  assert.ok(projected.includes("todo/2026-09/alpha-task.md"));
  assert.ok(projected.includes("todo/2026-09/beta-task.md"));
});

async function createFixture(t, contexts = ["beta-task", "alpha-task"]) {
  const repository = await mkdtemp(path.join(os.tmpdir(), "kanban-projection-"));
  t.after(() => rm(repository, { recursive: true, force: true }));
  await mkdir(path.join(repository, "docs"), { recursive: true });
  const index = ['---', 'schema: "todo-index/v3"', 'active_period: "2026-09"',
    'legacy_shard_pattern: "../todo/YYYY-MM.md"', 'context_record_pattern: "../todo/YYYY-MM/<context>.md"',
    'legacy_policy: "immutable"', 'record_policy: "immutable"', 'record_schema: "todo-context-record/v3"',
    'record_schema_adoption_date: "2026-09-10"', 'adoption_date: "2026-07-14"',
    'size_limit_bytes: 500000', 'line_limit: 599', '---', ''].join('\n');
  await writeFile(path.join(repository, "docs", "TODO.md"), index);

  await writeContextRecord(repository, "past-task", "2026-08-02");
  await writeFile(path.join(repository, "todo", "2026-08.md"), [
    "---", 'schema: "todo-log/v1"', 'period: "2026-08"',
    'scope: "cross-repository"', 'status: "append-only"',
    'append_policy: "append-only"', 'date_heading_format: "YYYY-MM-DD"',
    'source_contract: "../docs/TODO.md"', 'adoption_date: "2026-07-14"',
    "---", "", "# Synthetic legacy history", "", "## 2026-08-01", "",
    "| legacy-task | intent | directive | module | object | method | input | output | logic | next | 2026-08-01 |", "",
  ].join("\n"));
  for (const context of contexts) {
    const date = context === "later-task" ? "2026-09-03" : "2026-09-02";
    await writeContextRecord(repository, context, date);
  }

  const { rows, period, failures } = collectProjectedRows({ repository });
  assert.deepEqual(failures, []);
  const { block, digest } = renderProjection({ rows, period });
  const replaced = replaceProjectionBlock(await boardText(), block);
  assert.notEqual(replaced, null);
  const text = replaced
    .replace(/^projection_period: .*$/m, `projection_period: "${period}"`)
    .replace(/^projection_row_count: .*$/m, `projection_row_count: ${rows.length}`)
    .replace(/^projection_digest: .*$/m, `projection_digest: "${digest}"`);
  const documents = new Map([[KANBAN_DOCS_PATH, text]]);
  assert.deepEqual(validateKanbanProjection(documents, { repository }), []);
  return { repository, text, documents };
}

async function writeContextRecordV3(repository, context, date) {
  const period = date.slice(0, 7);
  const directory = path.join(repository, "todo", period);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, `${context}.md`), [
    "---", 'schema: "todo-context-record/v3"', `period: "${period}"`,
    `context: "${context}"`, 'scope: "cross-repository"', 'status: "immutable"',
    'record_policy: "immutable"', 'source_contract: "../../docs/TODO.md"',
    `updated_date: "${date}"`, "---", "", `# ${context}`, "", `## ${date}`, "",
    "| PRD-TAD-ADR-MVP-GTM | CID | RAO | Updated Date |",
    "|---|---|---|---|",
    "| `PRD-TAD-ADR-EXAMPLE-001@1.0.0` | C: fixture at base r1 · I: one joined planning record · D: Author one v3 record joined to the artifact. "
      + `| R: Implementer · A: Implementer writes one record · O: one validated record · check: npm run planning:check | ${date} |`, "",
  ].join("\n"));
}

async function writeContextRecord(repository, context, date) {
  const period = date.slice(0, 7);
  const directory = path.join(repository, "todo", period);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, `${context}.md`), [
    "---", 'schema: "todo-context-record/v2"', `period: "${period}"`,
    `context: "${context}"`, 'scope: "cross-repository"', 'status: "immutable"',
    'record_policy: "immutable"', 'source_contract: "../../docs/TODO.md"',
    `updated_date: "${date}"`, "---", "", `# ${context}`, "", `## ${date}`, "",
    "| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |",
    "|---|---|---|---|---|---|---|---|---|---|---|",
    `| ${context} | intent | Preserve exact records. | module | object | method | input | recorded output | recorded logic | recorded next step | ${date} |`, "",
  ].join("\n"));
}
