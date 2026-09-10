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
  return `---\nschema: "todo-index/v3"\nactive_period: "2026-08"\nlegacy_shard_pattern: "../todo/YYYY-MM.md"\ncontext_record_pattern: "../todo/YYYY-MM/<context>.md"\nlegacy_policy: "immutable"\nrecord_policy: "immutable"\nsize_limit_bytes: 500000\nline_limit: 599\nadoption_date: "2026-07-14"\n---\n\n# Todo\n`;
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
