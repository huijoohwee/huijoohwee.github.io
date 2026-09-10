#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { frontmatterObject, scanFrontmatter } from "./lib/planning-frontmatter.mjs";

const INDEX_KEYS = [
  "schema", "active_period", "legacy_shard_pattern", "context_record_pattern",
  "legacy_policy", "record_policy", "record_schema", "record_schema_adoption_date",
];
const RECORD_KEYS = [
  "schema", "period", "context", "scope", "status", "record_policy",
  "source_contract", "updated_date",
];
// Legacy todo-context-record/v2 row. Committed records stay immutable and valid;
// authoring one after the v3 adoption date fails.
const HEADER = [
  "Context", "Intent", "Directive", "Module", "Class/Object", "Function/Method",
  "Input", "Output", "Decision Logic", "Next Step Recommendation", "Updated Date",
];
// todo-context-record/v3 row: the artifact join, the CID triad, the RAO triad with its
// named check, and the record date. The record key lives in the path and frontmatter.
export const RECORD_SCHEMA_V2 = "todo-context-record/v2";
export const RECORD_SCHEMA_V3 = "todo-context-record/v3";
export const HEADER_V3 = ["PRD-TAD-ADR-MVP-GTM", "CID", "RAO", "Updated Date"];
export const CONTINUITY_REFERENCE = /^`([A-Za-z0-9][A-Za-z0-9._-]*)@([A-Za-z0-9][A-Za-z0-9._-]*)`(?: \[[^\]\n]+\]\([^)\s]+\))?$/u;
export const CID_CELL = /^C: (\S.*?) · I: (\S.*?) · D: (\S.*)$/u;
export const RAO_CELL = /^R: (\S.*?) · A: (\S.*?) · O: (\S.*?) · check: (\S.*)$/u;
const PERIOD = /^\d{4}-(?:0[1-9]|1[0-2])$/u;
const DATE = /^(\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01]))$/u;
const CONTEXT = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

export function validatePlanningContextRecordContract({ repository = process.cwd() } = {}) {
  const root = path.resolve(repository);
  const failures = [];
  const indexPath = path.join(root, "docs", "TODO.md");
  const index = readDocument(indexPath, INDEX_KEYS, failures, "planning index");
  if (index) validateIndex(index.frontmatter, failures);
  const limits = {
    size: Number(index?.frontmatter.size_limit_bytes || 500000),
    lines: Number(index?.frontmatter.line_limit || 599),
    adoptionDate: index?.frontmatter.adoption_date || "2026-07-14",
    recordSchemaAdoptionDate: index?.frontmatter.record_schema_adoption_date || "",
  };

  const legacyPaths = listLegacyPaths(root);
  const recordPaths = listRecordPaths(root);
  const contexts = new Map();
  const legacyRows = [];
  const records = [];

  for (const file of legacyPaths) {
    const relative = relativePath(root, file);
    const document = readDocument(file, ["schema", "period"], failures, relative);
    if (!document) continue;
    const period = path.basename(file, ".md");
    validateLegacy({ file, relative, period, document, limits, failures });
    for (const row of parseTableRows(document.body)) {
      if (row.cells.length !== HEADER.length || row.cells[0] === "Context") continue;
      const context = row.cells[0];
      registerContext(contexts, context, relative, failures);
      legacyRows.push({
        context, date: row.cells[10] || "", source: relative, schema: "todo-log/v1",
        cells: row.cells, fields: legacyFields(row.cells),
      });
    }
  }

  for (const file of recordPaths) {
    const relative = relativePath(root, file);
    const document = readDocument(file, RECORD_KEYS, failures, relative);
    if (!document) continue;
    const record = validateRecord({ file, relative, document, limits, failures });
    if (!record) continue;
    registerContext(contexts, record.context, relative, failures);
    records.push(record);
  }

  const projection = [...legacyRows, ...records]
    .sort((left, right) => left.date.localeCompare(right.date, "en")
      || left.context.localeCompare(right.context, "en")
      || left.source.localeCompare(right.source, "en"));
  return Object.freeze({
    schema: "todo-context-record-validation/v2",
    ok: failures.length === 0,
    failures: Object.freeze(failures),
    legacyPaths: Object.freeze(legacyPaths.map(file => relativePath(root, file))),
    recordPaths: Object.freeze(recordPaths.map(file => relativePath(root, file))),
    projection: Object.freeze(projection),
  });
}

export function validatePlanningContextRecordRelease({
  repository = process.cwd(), baseRef, context, record,
} = {}) {
  const root = path.resolve(repository);
  const failures = [];
  if (!baseRef) failures.push("release: baseRef is required");
  if (!CONTEXT.test(context || "")) failures.push("release: context must be a stable kebab-case key");
  const expectedRecord = context && `todo/${activePeriod(root)}/${context}.md`;
  if (record !== expectedRecord) failures.push(`release: record must be ${expectedRecord}`);
  if (failures.length > 0) return releaseResult(failures, [], context, record);

  const changedPaths = git(root, ["diff", "--name-only", `${baseRef}...HEAD`, "--", "docs/TODO.md", "todo"])
    .split("\n").filter(Boolean).sort();
  const legacyChanges = changedPaths.filter(file => /^todo\/\d{4}-\d{2}\.md$/u.test(file));
  if (legacyChanges.length > 0) failures.push(`release: legacy monthly shards are immutable (${legacyChanges.join(", ")})`);
  if (changedPaths.includes("docs/TODO.md")) failures.push("release: the planning index is not an ordinary task write target");
  const recordChanges = changedPaths.filter(file => /^todo\/\d{4}-\d{2}\/[^/]+\.md$/u.test(file));
  if (recordChanges.length !== 1 || recordChanges[0] !== record) {
    failures.push(`release: exactly one changed context record is required (${recordChanges.join(", ") || "none"})`);
  }
  if (gitOptional(root, ["cat-file", "-e", `${baseRef}:${record}`])) {
    failures.push("release: context record already exists at the recorded base");
  }
  const structural = validatePlanningContextRecordContract({ repository: root });
  failures.push(...structural.failures);
  const selected = structural.projection.filter(item => item.source === record);
  if (selected.length !== 1 || selected[0].context !== context) {
    failures.push("release: declared context does not resolve to exactly one record");
  }
  return releaseResult(failures, changedPaths, context, record);
}

function validateIndex(frontmatter, failures) {
  const expected = {
    schema: "todo-index/v3",
    legacy_shard_pattern: "../todo/YYYY-MM.md",
    context_record_pattern: "../todo/YYYY-MM/<context>.md",
    legacy_policy: "immutable",
    record_policy: "immutable",
    record_schema: RECORD_SCHEMA_V3,
  };
  for (const [key, value] of Object.entries(expected)) {
    if (frontmatter[key] !== value) failures.push(`docs/TODO.md: ${key} must be ${value}`);
  }
  if (!PERIOD.test(frontmatter.active_period || "")) failures.push("docs/TODO.md: active_period must be YYYY-MM");
  if (!isRealDate(frontmatter.record_schema_adoption_date || "")) failures.push("docs/TODO.md: record_schema_adoption_date must be YYYY-MM-DD");
  if (!Number.isInteger(Number(frontmatter.size_limit_bytes)) || Number(frontmatter.size_limit_bytes) <= 0) failures.push("docs/TODO.md: size_limit_bytes must be positive");
  if (!Number.isInteger(Number(frontmatter.line_limit)) || Number(frontmatter.line_limit) <= 0) failures.push("docs/TODO.md: line_limit must be positive");
}

function validateLegacy({ file, relative, period, document, limits, failures }) {
  const expected = {
    schema: "todo-log/v1", period, scope: "cross-repository", status: "append-only",
    append_policy: "append-only", date_heading_format: "YYYY-MM-DD",
    source_contract: "../docs/TODO.md", adoption_date: limits.adoptionDate,
  };
  for (const [key, value] of Object.entries(expected)) {
    if (document.frontmatter[key] !== value) failures.push(`${relative}: ${key} must be ${value}`);
  }
  validateBudget(file, relative, limits, failures);
  const headings = [...document.body.matchAll(/^## (\d{4}-\d{2}-\d{2})$/gmu)].map(match => match[1]);
  if (headings.length === 0) failures.push(`${relative}: at least one dated heading is required`);
  if (new Set(headings).size !== headings.length || [...headings].sort().join("\n") !== headings.join("\n")) failures.push(`${relative}: dated headings must be unique and chronological`);
  for (const heading of headings) {
    if (!isRealDate(heading) || !heading.startsWith(`${period}-`)) failures.push(`${relative}: invalid dated heading ${heading}`);
  }
}

function validateRecord({ file, relative, document, limits, failures }) {
  const metadata = document.frontmatter;
  const period = path.basename(path.dirname(file));
  const context = path.basename(file, ".md");
  const schema = metadata.schema === RECORD_SCHEMA_V2 ? RECORD_SCHEMA_V2 : RECORD_SCHEMA_V3;
  const expected = {
    schema, period, context, scope: "cross-repository",
    status: "immutable", record_policy: "immutable", source_contract: "../../docs/TODO.md",
  };
  for (const [key, value] of Object.entries(expected)) {
    if (metadata[key] !== value) failures.push(`${relative}: ${key} must be ${value}`);
  }
  if (!CONTEXT.test(context)) failures.push(`${relative}: context filename must be kebab-case`);
  validateBudget(file, relative, limits, failures);
  if (!isRealDate(metadata.updated_date || "") || !metadata.updated_date.startsWith(`${period}-`)) {
    failures.push(`${relative}: updated_date must be a valid date in ${period}`);
  }
  if (schema === RECORD_SCHEMA_V2 && limits.recordSchemaAdoptionDate && metadata.updated_date > limits.recordSchemaAdoptionDate) {
    failures.push(`${relative}: ${RECORD_SCHEMA_V2} is closed for records dated after ${limits.recordSchemaAdoptionDate}; author ${RECORD_SCHEMA_V3}`);
  }
  const headings = [...document.body.matchAll(/^## (\d{4}-\d{2}-\d{2})$/gmu)].map(match => match[1]);
  if (headings.length !== 1 || headings[0] !== metadata.updated_date) {
    failures.push(`${relative}: exactly one dated heading matching updated_date is required`);
  }
  const tableRows = parseTableRows(document.body);
  const header = schema === RECORD_SCHEMA_V2 ? HEADER : HEADER_V3;
  const headers = tableRows.filter(row => row.cells[0] === header[0]);
  if (headers.length !== 1 || JSON.stringify(headers[0].cells) !== JSON.stringify(header)) failures.push(`${relative}: canonical ${header.length}-column header is required`);
  const rows = tableRows.filter(row => row.cells[0] !== header[0]);
  if (rows.length !== 1 || rows[0].cells.length !== header.length) {
    failures.push(`${relative}: exactly one ${header.length}-cell planning row is required`);
    return null;
  }
  const cells = rows[0].cells;
  if (cells.some(cell => cell.length === 0 || cell === "-")) failures.push(`${relative}: row cells must be non-empty and non-placeholder`);
  const date = cells[header.length - 1];
  if (date !== metadata.updated_date) failures.push(`${relative}: Updated Date must match updated_date`);
  const fields = schema === RECORD_SCHEMA_V2
    ? validateLegacyRow({ relative, context, cells, failures })
    : validateRecordRow({ relative, cells, failures });
  return { context, date, source: relative, schema, cells, fields };
}

function validateLegacyRow({ relative, context, cells, failures }) {
  if (cells[0] !== context) failures.push(`${relative}: row Context must match frontmatter context`);
  if (wordCount(cells[2]) > 50) failures.push(`${relative}: Directive exceeds 50 words`);
  return legacyFields(cells);
}

function validateRecordRow({ relative, cells, failures }) {
  const [reference, cid, rao] = cells;
  const artifact = CONTINUITY_REFERENCE.exec(reference);
  if (!artifact) failures.push(`${relative}: PRD-TAD-ADR-MVP-GTM must be \`continuity_id@revision\` with at most one locator link`);
  const triad = CID_CELL.exec(cid);
  if (!triad) failures.push(`${relative}: CID must carry "C: … · I: … · D: …" in order`);
  else if (wordCount(triad[3]) > 50) failures.push(`${relative}: Directive exceeds 50 words`);
  const step = RAO_CELL.exec(rao);
  if (!step) failures.push(`${relative}: RAO must carry "R: … · A: … · O: … · check: …" in order`);
  return {
    outcome: step ? `${step[3]} (check: ${step[4]})` : rao,
    decision: reference,
    next: triad ? triad[3] : cid,
  };
}

// Output, Decision Logic, and Next Step Recommendation of the eleven-column row.
function legacyFields(cells) {
  return { outcome: cells[7], decision: cells[8], next: cells[9] };
}

function parseTableRows(body) {
  return body.split("\n").flatMap((line, index) => {
    if (!line.startsWith("|") || !line.endsWith("|")) return [];
    const cells = line.slice(1, -1).split("|").map(cell => cell.trim());
    if (cells.every(cell => /^:?-+:?$/u.test(cell))) return [];
    return [{ index: index + 1, cells }];
  });
}

function readDocument(file, requiredKeys, failures, label) {
  if (!existsSync(file)) {
    failures.push(`${label}: missing`);
    return null;
  }
  const scanned = scanFrontmatter(readFileSync(file, "utf8"), { requiredKeys });
  if (scanned.readState !== "ok") {
    failures.push(`${label}: ${scanned.error}`);
    return null;
  }
  for (const key of scanned.missingKeys) failures.push(`${label}: missing frontmatter key ${key}`);
  return { frontmatter: frontmatterObject(scanned.frontmatter), body: scanned.body };
}

function listLegacyPaths(root) {
  const directory = path.join(root, "todo");
  return existsSync(directory) ? readdirSync(directory, { withFileTypes: true })
    .filter(entry => entry.isFile() && PERIOD.test(entry.name.replace(/\.md$/u, "")) && entry.name.endsWith(".md"))
    .map(entry => path.join(directory, entry.name)).sort() : [];
}

function listRecordPaths(root) {
  const directory = path.join(root, "todo");
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && PERIOD.test(entry.name)).sort((a, b) => a.name.localeCompare(b.name, "en"))
    .flatMap(entry => readdirSync(path.join(directory, entry.name), { withFileTypes: true })
      .filter(child => child.isFile() && child.name.endsWith(".md"))
      .map(child => path.join(directory, entry.name, child.name)).sort());
}

function registerContext(contexts, context, source, failures) {
  const prior = contexts.get(context);
  if (prior) failures.push(`${source}: duplicate planning Context ${JSON.stringify(context)} already owned by ${prior}`);
  else contexts.set(context, source);
}

function validateBudget(file, relative, limits, failures) {
  const text = readFileSync(file, "utf8");
  if (Buffer.byteLength(text) >= limits.size) failures.push(`${relative}: byte cap exceeded`);
  const lines = text.split("\n").length - (text.endsWith("\n") ? 1 : 0);
  if (lines > limits.lines) failures.push(`${relative}: line cap exceeded`);
}

function isRealDate(value) {
  if (!DATE.test(value)) return false;
  const instant = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(instant.valueOf()) && instant.toISOString().slice(0, 10) === value;
}

function activePeriod(root) {
  const scanned = scanFrontmatter(readFileSync(path.join(root, "docs", "TODO.md"), "utf8"));
  return frontmatterObject(scanned.frontmatter).active_period;
}

function wordCount(value) { return String(value).trim().split(/\s+/u).filter(Boolean).length; }
function relativePath(root, file) { return path.relative(root, file).split(path.sep).join("/"); }
function git(root, args) { return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim(); }
function gitOptional(root, args) {
  try { execFileSync("git", args, { cwd: root, stdio: "ignore" }); return true; } catch { return false; }
}
function releaseResult(failures, changedPaths, context, record) {
  return Object.freeze({ schema: "todo-context-record-release/v2", ok: failures.length === 0, failures: Object.freeze(failures), changedPaths: Object.freeze(changedPaths), context, record });
}

function option(name) {
  const prefix = `--${name}=`;
  return process.argv.slice(3).find(argument => argument.startsWith(prefix))?.slice(prefix.length) || null;
}

const direct = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (direct) {
  const mode = process.argv[2];
  const repository = option("repository") || process.cwd();
  const result = mode === "check"
    ? validatePlanningContextRecordContract({ repository })
    : mode === "release"
      ? validatePlanningContextRecordRelease({ repository, baseRef: option("base-ref"), context: option("context"), record: option("record") })
      : null;
  if (!result) {
    console.error("Usage: planning-context-record-contract.mjs check --repository=<path> | release --repository=<path> --base-ref=<sha> --context=<key> --record=<path>");
    process.exit(2);
  }
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  if (!result.ok) process.exit(1);
}
