#!/usr/bin/env node
// Repo-wide structural budget for the guideline corpus.
//
// Two rules, both observable:
//   1. Every guideline document stays under 600 lines.
//   2. Every guideline document starts with YAML frontmatter carrying its identity keys,
//      so a module can be addressed by declared content rather than by file path.
//
// Only rule 1 fails the run. Rule 2 is reported, because the legacy corpus predates the
// frontmatter contract and failing on it would block the line budget behind an unrelated
// migration. Reporting keeps the gap visible and countable without coupling the two.

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = "guidelines";
const LINE_BUDGET = 600;

const IDENTITY_KEYS = ["title", "doc_type", "version", "date", "lang"];

const files = readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .sort();

const overBudget = [];
const missingFrontmatter = [];
const incompleteFrontmatter = [];
let largest = { file: "", lines: 0 };

for (const f of files) {
  const text = readFileSync(join(dir, f), "utf8");
  const lines = text.split("\n");
  const count = lines[lines.length - 1] === "" ? lines.length - 1 : lines.length;
  if (count > largest.lines) largest = { file: f, lines: count };
  if (count >= LINE_BUDGET) overBudget.push(`${f} (${count} lines)`);

  const fm = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!fm) {
    missingFrontmatter.push(f);
    continue;
  }
  const missing = IDENTITY_KEYS.filter((k) => !new RegExp(`^${k}:`, "m").test(fm[1]));
  if (missing.length) incompleteFrontmatter.push(`${f} (missing ${missing.join(", ")})`);
}

let failed = false;

if (overBudget.length) {
  failed = true;
  console.error(`FAIL: ${overBudget.length} guideline file(s) at or over the ${LINE_BUDGET}-line budget:`);
  for (const f of overBudget) console.error(`  ${f}`);
}

if (incompleteFrontmatter.length) {
  console.log(`note: ${incompleteFrontmatter.length} document(s) declare frontmatter but omit identity keys:`);
  for (const f of incompleteFrontmatter.slice(0, 12)) console.log(`  ${f}`);
  if (incompleteFrontmatter.length > 12) console.log(`  ... and ${incompleteFrontmatter.length - 12} more`);
}

if (missingFrontmatter.length) {
  console.log(`note: ${missingFrontmatter.length} legacy document(s) carry no frontmatter (reported, not failed):`);
  for (const f of missingFrontmatter.slice(0, 12)) console.log(`  ${f}`);
  if (missingFrontmatter.length > 12) console.log(`  ... and ${missingFrontmatter.length - 12} more`);
}

if (failed) process.exit(1);

console.log(
  `guideline file budget ok (${files.length} documents, all under ${LINE_BUDGET} lines; largest ${largest.file} at ${largest.lines})`,
);
