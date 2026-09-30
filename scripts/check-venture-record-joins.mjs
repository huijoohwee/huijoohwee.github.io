#!/usr/bin/env node
// Resolve HL-, H-, E- and A-id joins and the shared continuity join across one instantiated
// record set (deck, plan, model, learning record). Structural only: a passing run proves the
// records reference each other consistently, not that any claim, number or result is true.
//
// Usage: node scripts/check-venture-record-joins.mjs <record.md> [<record.md> ...]
import { readFileSync, statSync } from "node:fs";
import { validateRecordJoins } from "./lib/venture-record-joins.mjs";

const MAX_BYTES = 499999;
const MAX_RECORDS = 32;
const paths = process.argv.slice(2);
if (paths.length === 0 || paths.length > MAX_RECORDS || new Set(paths).size !== paths.length) {
  console.error("usage: check-venture-record-joins <record.md> [<record.md> ...]");
  console.error(`supply 1–${MAX_RECORDS} distinct records, each below 500 kB`);
  process.exit(2);
}
const documents = new Map();
for (const path of paths) {
  if (statSync(path).size > MAX_BYTES) {
    console.error(`${path}: exceeds ${MAX_BYTES} bytes`);
    process.exit(2);
  }
  documents.set(path, readFileSync(path, "utf8"));
}
const { failures, defined } = validateRecordJoins(documents);
for (const failure of failures) console.error(`${failure.type}: ${failure.document}: ${failure.detail}`);
console.log(`venture record joins: ${documents.size} document(s), ${defined} defined ID(s), ${failures.length} finding(s); structural only, no semantic verdict`);
process.exit(failures.length ? 1 : 0);
