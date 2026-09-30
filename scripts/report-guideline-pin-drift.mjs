#!/usr/bin/env node
// Read-only report of planning documents pinned behind the current authoring guideline.
//
// For each repository root given (default: this repository), list tracked Markdown files that
// declare `guideline_revision` and compare it with the current guideline version. It changes
// nothing and always exits 0 on a readable inventory: an older pin is a deliberate owner choice
// until that owner reviews the delta, so this report informs a successor rather than upgrading.
//
// Usage: node scripts/report-guideline-pin-drift.mjs [--json] [<repository-root> ...]
import { execFileSync } from "node:child_process";
import { closeSync, openSync, readSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HEAD_BYTES = 8 * 1024;
const MAX_FILES = 5000;
const here = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
const json = args.includes("--json");
const roots = args.filter(arg => arg !== "--json").map(root => resolve(root));
if (roots.length === 0) roots.push(here);

const index = readFileSync(join(here, "guidelines/prd-tad-adr-mvp-gtm-guidelines.md"), "utf8");
const current = /^version:\s*"([^"]+)"/m.exec(index)?.[1];
if (!current) throw new Error("current guideline version is unreadable");

const compare = (a, b) => {
  const [x, y] = [a, b].map(v => v.split(".").map(Number));
  for (let i = 0; i < 3; i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) - (y[i] ?? 0);
  return 0;
};
const head = file => {
  const fd = openSync(file, "r");
  try {
    const buffer = Buffer.alloc(HEAD_BYTES);
    return buffer.subarray(0, readSync(fd, buffer, 0, HEAD_BYTES, 0)).toString("utf8");
  } finally { closeSync(fd); }
};

const report = { current, repositories: [] };
for (const root of roots) {
  const listed = execFileSync("git", ["ls-files", "-z", "--", "*.md"], { cwd: root, encoding: "utf8", maxBuffer: 16 * 1024 * 1024 })
    .split("\0").filter(Boolean);
  const byPin = new Map();
  const behind = [];
  for (const relative of listed.slice(0, MAX_FILES)) {
    const frontmatter = /^---\n([\s\S]*?)\n---/.exec(head(join(root, relative)))?.[1];
    const pin = frontmatter && /^guideline_revision:\s*"([^"{}]+)"/m.exec(frontmatter)?.[1];
    if (!pin) continue;
    byPin.set(pin, (byPin.get(pin) ?? 0) + 1);
    if (compare(pin, current) < 0) behind.push({ path: relative, pin });
  }
  report.repositories.push({ root, scanned: Math.min(listed.length, MAX_FILES), truncated: listed.length > MAX_FILES,
    pins: Object.fromEntries([...byPin].sort(([a], [b]) => compare(b, a))), behind });
}

if (json) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`current guideline ${current}; report only, nothing changed`);
  for (const repo of report.repositories) {
    const pins = Object.entries(repo.pins).map(([pin, count]) => `${pin}×${count}`).join(", ") || "none";
    console.log(`${repo.root}: pins ${pins}; ${repo.behind.length} behind${repo.truncated ? " (inventory truncated)" : ""}`);
  }
}
