import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  validatePlanningContextRecordContract,
  validatePlanningContextRecordRelease,
} from "../scripts/planning-context-record-contract.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("the repository satisfies the context-sharded planning contract", () => {
  const result = validatePlanningContextRecordContract({ repository: root });
  assert.deepEqual(result.failures, []);
  assert.equal(result.ok, true);
  assert.ok(result.recordPaths.includes("todo/2026-08/context-sharded-planning-authority.md"));
});

test("independent context records produce one deterministic order", () => {
  const fixture = createFixture();
  writeRecord(fixture, "beta-task", "2026-08-12");
  writeRecord(fixture, "alpha-task", "2026-08-12");
  const first = validatePlanningContextRecordContract({ repository: fixture });
  assert.equal(first.ok, true);
  assert.deepEqual(first.projection.map(item => item.context), ["alpha-task", "beta-task"]);
});

test("malformed, duplicate, and overlong records fail closed", () => {
  const fixture = createFixture({ legacyContext: "duplicate-task" });
  writeRecord(fixture, "duplicate-task", "2026-08-12", "word ".repeat(51).trim());
  const result = validatePlanningContextRecordContract({ repository: fixture });
  assert.equal(result.ok, false);
  assert.match(result.failures.join("\n"), /duplicate planning Context/u);
  assert.match(result.failures.join("\n"), /Directive exceeds 50 words/u);
});

test("v3 records join one artifact reference to CID and RAO with a named check", () => {
  const fixture = createFixture();
  writeRecordV3(fixture, "joined-task", "2026-08-20");
  const result = validatePlanningContextRecordContract({ repository: fixture });
  assert.deepEqual(result.failures, []);
  const [record] = result.projection.filter(item => item.context === "joined-task");
  assert.equal(record.schema, "todo-context-record/v3");
  assert.deepEqual(record.fields, {
    outcome: "one validated record (check: npm run planning:check)",
    decision: "`PRD-TAD-ADR-EXAMPLE-001@1.0.0` [artifact](../../docs/example.md)",
    next: "Author one v3 record joined to the artifact.",
  });
});

test("v3 rows reject path-only references, disordered triads, and a missing check", () => {
  const fixture = createFixture();
  writeRecordV3(fixture, "path-only-task", "2026-08-20", { reference: "`docs/example.md`" });
  writeRecordV3(fixture, "disordered-task", "2026-08-20", { cid: "I: value · C: source · D: act" });
  writeRecordV3(fixture, "uncheckable-task", "2026-08-20", { rao: "R: Implementer · A: implement it · O: done" });
  writeRecordV3(fixture, "legacy-header-task", "2026-08-20", {
    header: "| Context | CID | RAO | Updated Date |", reference: "legacy-header-task",
  });
  const failures = validatePlanningContextRecordContract({ repository: fixture }).failures;
  assert.match(failures.join("\n"), /path-only-task\.md: PRD-TAD-ADR-MVP-GTM must be `continuity_id@revision`/u);
  assert.match(failures.join("\n"), /disordered-task\.md: CID must carry/u);
  assert.match(failures.join("\n"), /uncheckable-task\.md: RAO must carry/u);
  assert.match(failures.join("\n"), /legacy-header-task\.md: canonical 4-column header is required/u);
});

test("the legacy 11-column schema closes after the adoption date while committed records stay valid", () => {
  const fixture = createFixture();
  writeRecord(fixture, "before-adoption", "2026-08-15");
  writeRecord(fixture, "after-adoption", "2026-08-16");
  const failures = validatePlanningContextRecordContract({ repository: fixture }).failures;
  assert.deepEqual(failures, [
    "todo/2026-08/after-adoption.md: todo-context-record/v2 is closed for records dated after 2026-08-15; author todo-context-record/v3",
  ]);
});

test("release accepts one new record and rejects shared legacy mutation", () => {
  const fixture = createFixture({ initializeGit: true });
  const baseRef = git(fixture, ["rev-parse", "HEAD"]);
  writeRecord(fixture, "release-task", "2026-08-12");
  git(fixture, ["add", "."]);
  git(fixture, ["commit", "-m", "add record"]);
  assert.equal(validatePlanningContextRecordRelease({
    repository: fixture, baseRef, context: "release-task", record: "todo/2026-08/release-task.md",
  }).ok, true);
  writeFileSync(path.join(fixture, "todo", "2026-08.md"), `${readFileSync(path.join(fixture, "todo", "2026-08.md"), "utf8")}\nchanged\n`);
  git(fixture, ["add", "."]);
  git(fixture, ["commit", "-m", "mutate legacy"]);
  assert.match(validatePlanningContextRecordRelease({
    repository: fixture, baseRef, context: "release-task", record: "todo/2026-08/release-task.md",
  }).failures.join("\n"), /legacy monthly shards are immutable/u);
});

test("release rejects mutation of the shared planning index", () => {
  const fixture = createFixture({ initializeGit: true });
  const baseRef = git(fixture, ["rev-parse", "HEAD"]);
  writeRecord(fixture, "index-mutation-task", "2026-08-12");
  writeFileSync(path.join(fixture, "docs", "TODO.md"), `${indexText()}\nchanged\n`);
  git(fixture, ["add", "."]);
  git(fixture, ["commit", "-m", "mutate index"]);
  assert.match(validatePlanningContextRecordRelease({
    repository: fixture, baseRef, context: "index-mutation-task", record: "todo/2026-08/index-mutation-task.md",
  }).failures.join("\n"), /planning index is not an ordinary task write target/u);
});

function createFixture({ legacyContext = null, initializeGit = false } = {}) {
  const fixture = mkdtempSync(path.join(os.tmpdir(), "planning-context-record-"));
  mkdirSync(path.join(fixture, "docs"), { recursive: true });
  mkdirSync(path.join(fixture, "todo"), { recursive: true });
  writeFileSync(path.join(fixture, "docs", "TODO.md"), indexText());
  writeFileSync(path.join(fixture, "todo", "2026-08.md"), legacyText(legacyContext));
  if (initializeGit) {
    git(fixture, ["init", "-b", "main"]);
    git(fixture, ["config", "user.email", "test@example.com"]);
    git(fixture, ["config", "user.name", "Test"]);
    git(fixture, ["add", "."]);
    git(fixture, ["commit", "-m", "base"]);
  }
  return fixture;
}

function indexText() {
  return `---\nschema: "todo-index/v3"\nactive_period: "2026-08"\nlegacy_shard_pattern: "../todo/YYYY-MM.md"\ncontext_record_pattern: "../todo/YYYY-MM/<context>.md"\nlegacy_policy: "immutable"\nrecord_policy: "immutable"\nrecord_schema: "todo-context-record/v3"\nrecord_schema_adoption_date: "2026-08-15"\nsize_limit_bytes: 500000\nline_limit: 599\nadoption_date: "2026-07-14"\n---\n\n# Todo\n`;
}

function writeRecordV3(fixture, context, date, {
  header = "| PRD-TAD-ADR-MVP-GTM | CID | RAO | Updated Date |",
  reference = "`PRD-TAD-ADR-EXAMPLE-001@1.0.0` [artifact](../../docs/example.md)",
  cid = "C: fixture at base r1 · I: one joined planning record · D: Author one v3 record joined to the artifact.",
  rao = "R: Implementer · A: Implementer writes one record · O: one validated record · check: npm run planning:check",
} = {}) {
  const directory = path.join(fixture, "todo", "2026-08");
  mkdirSync(directory, { recursive: true });
  writeFileSync(path.join(directory, `${context}.md`), `---\nschema: "todo-context-record/v3"\nperiod: "2026-08"\ncontext: "${context}"\nscope: "cross-repository"\nstatus: "immutable"\nrecord_policy: "immutable"\nsource_contract: "../../docs/TODO.md"\nupdated_date: "${date}"\n---\n\n# ${context}\n\n## ${date}\n\n${header}\n|---|---|---|---|\n| ${reference} | ${cid} | ${rao} | ${date} |\n`);
}

function legacyText(context) {
  const row = context ? `\n| ${context} | intent | directive | module | object | method | input | output | logic | next | 2026-08-01 |\n` : "";
  return `---\nschema: "todo-log/v1"\nperiod: "2026-08"\nscope: "cross-repository"\nstatus: "append-only"\nappend_policy: "append-only"\ndate_heading_format: "YYYY-MM-DD"\nsource_contract: "../docs/TODO.md"\nadoption_date: "2026-07-14"\n---\n\n# Legacy\n\n## 2026-08-01${row}`;
}

function writeRecord(fixture, context, date, directive = "Keep independent planning records deterministic and immutable.") {
  const directory = path.join(fixture, "todo", "2026-08");
  mkdirSync(directory, { recursive: true });
  writeFileSync(path.join(directory, `${context}.md`), `---\nschema: "todo-context-record/v2"\nperiod: "2026-08"\ncontext: "${context}"\nscope: "cross-repository"\nstatus: "immutable"\nrecord_policy: "immutable"\nsource_contract: "../../docs/TODO.md"\nupdated_date: "${date}"\n---\n\n# ${context}\n\n## ${date}\n\n| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |\n|---|---|---|---|---|---|---|---|---|---|---|\n| ${context} | intent | ${directive} | module | object | method | input | output | logic | next | ${date} |\n`);
}

function git(repository, args) {
  return execFileSync("git", args, { cwd: repository, encoding: "utf8" }).trim();
}
