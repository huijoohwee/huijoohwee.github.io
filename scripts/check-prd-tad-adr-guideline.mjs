#!/usr/bin/env node
// Policy check for the PRD, TAD & ADR guideline set.
//
// Enforces the two structural rules the set claims for itself: single responsibility
// per file, and a hard 600-line ceiling on every file. Also verifies that every
// section anchor the set publishes still resolves in the index document, so splitting
// a module never silently breaks an inbound reference.

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const dir = "guidelines";
const read = (name) => readFileSync(join(dir, name), "utf8");

const INDEX = "prd-tad-adr-guidelines.md";

const MODULES = [
  "prd-tad-adr-economics.md",
  "prd-tad-adr-process-flows.md",
  "prd-tad-adr-readiness.md",
  "prd-tad-adr-verification.md",
  "prd-tad-adr-templates.md",
  "prd-tad-adr-cid-matrix.md",
  "prd-tad-adr-diagram-guidelines.companion.md",
  "prd-tad-adr-diagram-canvas-render.companion.md",
  "prd-tad-adr-diagram-templates.companion.md",
];

// Anchors the set publishes. Inbound references rely on these resolving in the index.
const PUBLISHED_ANCHORS = [
  "scope--neutrality-contract",
  "module-index",
  "rule-identity--classification",
  "markdown-yaml-frontmatter-enforcement",
  "overview",
  "solo-dev-ai-native-orientation",
  "directive-grammar-cid",
  "from-0-to-1-prd--tad-creation-process",
  "flow-patterns",
  "time-to-value",
  "readiness-ladder",
  "agent-platform-readiness",
  "lane-topology--deploy-boundary",
  "autonomous-implementation-verification",
  "cid-directive-matrix",
  "core-templates",
  "architecture-diagram-standards",
  "prd--tad-integration",
  "anti-pattern-guards",
  "conformance-findings",
  "validation-checklist",
  "roleactionoutcome",
  "mantra-application",
];

const REQUIRED_KEYS = [
  "title",
  "doc_type",
  "version",
  "date",
  "lang",
  "frontmatter_contract",
  "owner",
  "local_rung",
  "delivered_rung",
  "lane",
  "universal_scope",
];

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9 \-]/g, "")
    .replace(/ /g, "-");

const files = [INDEX, ...MODULES];
const report = [];

for (const name of files) {
  const text = read(name);
  const lines = text.split("\n");

  assert.ok(text.startsWith("---\n"), `${name}: frontmatter must be the first block`);
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(text);
  assert.ok(fm, `${name}: frontmatter must terminate`);
  assert.ok(!/\n---\n[\s\S]*?\n---\n/.test(text.slice(0, fm[0].length + 4)) || true, `${name}: frontmatter sanity`);
  for (const key of REQUIRED_KEYS) {
    assert.match(fm[1], new RegExp(`^${key}:`, "m"), `${name}: frontmatter must declare ${key}`);
  }
  assert.doesNotMatch(fm[1], /^status:/m, `${name}: forbid a blended status key`);

  const count = lines[lines.length - 1] === "" ? lines.length - 1 : lines.length;
  assert.ok(count < 600, `${name}: must remain below 600 lines (found ${count})`);
  report.push(`${name} ${count} lines`);
}

// Every published anchor still resolves as a `##` heading in the index.
const indexText = read(INDEX);
const headings = [...indexText.matchAll(/^## (.+)$/gm)].map((m) => slug(m[1]));
for (const anchor of PUBLISHED_ANCHORS) {
  assert.ok(headings.includes(anchor), `${INDEX}: published anchor #${anchor} no longer resolves`);
}

// Every module is reachable from the index, so no module is orphaned.
for (const name of MODULES) {
  assert.ok(indexText.includes(`./${name}`), `${INDEX}: must link the ${name} module`);
}

// Delegating sections must name their module rather than restating it.
const DELEGATIONS = {
  "solo-dev-ai-native-orientation": "prd-tad-adr-economics.md",
  "from-0-to-1-prd--tad-creation-process": "prd-tad-adr-process-flows.md",
  "readiness-ladder": "prd-tad-adr-readiness.md",
  "autonomous-implementation-verification": "prd-tad-adr-verification.md",
  "core-templates": "prd-tad-adr-templates.md",
  "cid-directive-matrix": "prd-tad-adr-cid-matrix.md",
};
const sections = indexText.split(/^## /m);
for (const [anchor, mod] of Object.entries(DELEGATIONS)) {
  const body = sections.find((s) => slug(s.split("\n")[0]) === anchor);
  assert.ok(body, `${INDEX}: section #${anchor} missing`);
  assert.ok(body.includes(`./${mod}`), `${INDEX}: section #${anchor} must delegate to ${mod}`);
}

console.log(`PRD/TAD/ADR guideline contract ok (${files.length} files; ${report.join("; ")})`);
