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
import { isAbsolute, resolve } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { readFrontmatter } from "./lib/git-guidelines/fm-reader.mjs";

import { readMaturityRubric, validateMaturityAssessment } from "./lib/maturity-rubric.mjs";

const dir = "guidelines";
const read = (name) => readFileSync(join(dir, name), "utf8");

const INDEX = "prd-tad-adr-mvp-gtm-guidelines.md";

const MODULES = [
  "prd-tad-adr-mvp-gtm-maturity.md",
  "prd-tad-adr-mvp-gtm-codebase-grounding.md",
  "prd-tad-adr-mvp-gtm-economics.md",
  "prd-tad-adr-mvp-gtm-process-flows.md",
  "prd-tad-adr-mvp-gtm-readiness.md",
  "prd-tad-adr-mvp-gtm-verification.md",
  "prd-tad-adr-mvp-gtm-templates.md",
  "prd-tad-adr-mvp-gtm-cid-matrix.md",
  "prd-tad-adr-mvp-gtm-planning-record.md",
  "prd-tad-adr-mvp-gtm-selection.md",
  "prd-tad-adr-mvp-gtm-venture.md",
  "prd-tad-adr-mvp-gtm-diagram-guidelines.companion.md",
  "prd-tad-adr-mvp-gtm-diagram-canvas-render.companion.md",
  "prd-tad-adr-mvp-gtm-diagram-templates.companion.md",
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
  "prd-tad-adr-mvp-gtm-planning-record",
  "venture-record-pitch-deck-business-plan--financial-model",
  "adlc-execution-seam",
  "platform-specific-selection-criteria--multi-agent-reasoning-pipeline",
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
assert.match(indexText, /^title: "PRD, TAD & ADR Guidelines"$/m);
assert.ok(indexText.includes('`doc_type: "PRD-TAD-ADR-MVP-GTM"`'), "planning metadata must have one canonical document type");
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
  "solo-dev-ai-native-orientation": "prd-tad-adr-mvp-gtm-economics.md",
  "from-0-to-1-prd--tad-creation-process": "prd-tad-adr-mvp-gtm-process-flows.md",
  "readiness-ladder": "prd-tad-adr-mvp-gtm-readiness.md",
  "autonomous-implementation-verification": "prd-tad-adr-mvp-gtm-verification.md",
  "core-templates": "prd-tad-adr-mvp-gtm-templates.md",
  "cid-directive-matrix": "prd-tad-adr-mvp-gtm-cid-matrix.md",
  "prd-tad-adr-mvp-gtm-planning-record": "prd-tad-adr-mvp-gtm-planning-record.md",
  "platform-specific-selection-criteria--multi-agent-reasoning-pipeline": "prd-tad-adr-mvp-gtm-selection.md",
  "venture-record-pitch-deck-business-plan--financial-model": "prd-tad-adr-mvp-gtm-venture.md",
  "adlc-execution-seam": "adlc-guidelines.md",
};

// Every Venture Record finding the module raises is enumerated by the verification module first.
const VENTURE_FINDINGS = [
  "pitch-claim-unsourced",
  "market-size-single-method",
  "financial-assumption-unsourced",
  "revenue-recognized-unpaid",
  "scenario-set-incomplete",
  "adlc-cost-unledgered",
];
const verificationText = read("prd-tad-adr-mvp-gtm-verification.md");
const ventureText = read("prd-tad-adr-mvp-gtm-venture.md");
for (const type of VENTURE_FINDINGS) {
  assert.match(verificationText, new RegExp(`^\\| Venture Record \\| \`${type}\` \\| \`(blocker|major|minor)\` \\|$`, "m"),
    `verification module must enumerate ${type} before the venture module raises it`);
  assert.ok(ventureText.includes(`\`${type}\``), `venture module must raise ${type}`);
}
// Coverage decisions and model semantics are authored by their existing modules. These checks
// protect their navigable structural contract; they do not grade an instantiated business plan.
const coverageSection = indexText.split("### From-0-to-1 coverage contract\n")[1]?.split("\nA gate that")[0];
assert.ok(coverageSection, "index must publish the from-0-to-1 coverage contract");
const coverageIds = [...coverageSection.matchAll(/^\| (C\d{2}) \|/gm)].map(match => match[1]);
assert.deepEqual(coverageIds, Array.from({ length: 16 }, (_, index) => `C${String(index + 1).padStart(2, "0")}`),
  "coverage domains must appear exactly once in order, C01 through C16");
for (const heading of ["Measurement basis and horizon", "Driver schedule",
  "Reconciliation and edge-case checks", "Free-core and cost classification"])
  assert.ok(ventureText.includes(`### ${heading}\n`), `venture contract missing ${heading}`);
for (const name of [INDEX, "prd-tad-adr-mvp-gtm-venture.md", "prd-tad-adr-mvp-gtm-cid-matrix.md",
  "prd-tad-adr-mvp-gtm-process-flows.md"])
  assert.doesNotMatch(read(name), /recognize revenue only from collected payment|revenue (?:is collected money only|rows (?:carry|contain) collected payment only)|forbid revenue from anything but collected payment/i,
    `${name}: cash-only revenue rule contradicts the declared measurement basis`);
for (const name of ["pitchdeck-prd-tad-adr-mvp-gtm-template.md", "pitchdeck-prd-tad-adr-mvp-gtm-template-lite.md"]) {
  const template = readFileSync(join("template", name), "utf8");
  assert.ok(template.trimEnd().split("\n").length < 600, `${name}: must remain below 600 lines`);
  for (const heading of ["PRD", "TAD", "ADR", "MVP", "GTM", "Pitch Deck", "Business Plan",
    "Financial Model", "Coverage and ADLC Handoff"])
    assert.ok(template.includes(`## ${heading}\n`), `${name}: missing ${heading} section`);
  // Resolve the newly introduced cross-owner joins instead of checking link text alone.
  for (const match of template.matchAll(/\]\(\.\.\/guidelines\/(prd-tad-adr-mvp-gtm-[a-z-]+\.md)#([a-z0-9-]+)\)/g)) {
    const anchors = [...read(match[1]).matchAll(/^#{2,3} (.+)$/gm)].map(row => slug(row[1]));
    assert.ok(anchors.includes(match[2]), `${name}: unresolved source join ${match[1]}#${match[2]}`);
  }
}
console.log("Venture coverage: 16 domain IDs, financial contract sections and full/lite source joins checked; semantic venture evidence not evaluated");
const sections = indexText.split(/^## /m);
for (const [anchor, mod] of Object.entries(DELEGATIONS)) {
  const body = sections.find((s) => slug(s.split("\n")[0]) === anchor);
  assert.ok(body, `${INDEX}: section #${anchor} missing`);
  assert.ok(body.includes(`./${mod}`), `${INDEX}: section #${anchor} must delegate to ${mod}`);
}

const recordPath = "schema/AgenticRAG/prd-tad-adr-mvp-gtm-grounding.json";
const recordBytes = readFileSync(recordPath);
assert.ok(recordBytes.length < 65_536, "grounding record exceeds 64 KiB");
const grounding = JSON.parse(recordBytes.toString("utf8"));
const meta = readFrontmatter(read("prd-tad-adr-mvp-gtm-codebase-grounding.md")).data;
assert.equal(meta.schema, "prd-tad-adr-codebase-grounding/v1");
assert.equal(meta.parent, "PRD, TAD & ADR Guidelines");
assert.ok(read("prd-tad-adr-mvp-gtm-codebase-grounding.md").includes("../" + recordPath));
assert.equal(grounding.schema, "prd-tad-adr-codebase-grounding/v1");
assert.equal(grounding.semantic_owner, "../../guidelines/cid-guidelines.md#shared-field-contract");
assert.equal(grounding.continuity_owner, "../../guidelines/adlc-artifact-continuity.md");
assert.equal(grounding.load_policy, "on-demand");
assert.equal(grounding.production_ready, false);
const repoIds = ["agentic-os", "huijoohwee.github.io", "agentic-commerce-os", "agentic-canvas-os",
  "huijoohwee", "agentic-graph", "GameXR"];
assert.deepEqual(grounding.repositories.map(row => row.id).sort(), [...repoIds].sort());
const args = process.argv.slice(2);
assert.ok(args.length <= 1 && (!args.length || args[0].startsWith("--codebase-root=")),
  "only --codebase-root=/absolute/workspace is supported");
const codebaseRoot = args.length ? args[0].slice("--codebase-root=".length) : null;
if (codebaseRoot !== null) assert.ok(isAbsolute(codebaseRoot), "codebase root must be absolute");
let artifacts = 0;
for (const row of grounding.repositories) {
  assert.equal(row.repository, "github.com/huijoohwee/" + row.id);
  assert.match(row.revision, /^[0-9a-f]{40}$/u);
  assert.ok(typeof row.owns === "string" && row.owns.length > 0);
  assert.ok(Array.isArray(row.artifacts) && row.artifacts.length > 0 && row.artifacts.length <= 8);
  assert.equal(new Set(row.artifacts.map(item => item.path)).size, row.artifacts.length);
  assert.ok(Array.isArray(row.checks) && row.checks.length > 0 && row.checks.length <= 16);
  for (const script of row.checks) assert.match(script, /^[A-Za-z0-9:_-]+$/u);
  let pkg;
  for (const item of row.artifacts) {
    assert.match(item.path, /^[A-Za-z0-9_.\/-]+$/u);
    assert.ok(!isAbsolute(item.path) && !item.path.split("/").some(part => !part || part === ".." || part === "."));
    assert.match(item.sha256, /^[0-9a-f]{64}$/u);
    artifacts++;
    if (codebaseRoot === null) continue;
    const bytes = execFileSync("git", ["-C", resolve(codebaseRoot, row.id), "cat-file", "blob",
      row.revision + ":" + item.path], { timeout: 5000, maxBuffer: 500_000 });
    assert.equal(createHash("sha256").update(bytes).digest("hex"), item.sha256,
      row.id + "/" + item.path + ": source digest mismatch");
    if (item.path === "package.json") pkg = JSON.parse(bytes.toString("utf8"));
  }
  assert.ok(row.artifacts.some(item => item.path === "package.json"));
  if (codebaseRoot !== null) for (const script of row.checks)
    assert.ok(typeof pkg.scripts?.[script] === "string", row.id + ": missing owner check " + script);
}
assert.ok(Array.isArray(grounding.findings) && grounding.findings.length > 0 && grounding.findings.length <= 64);
assert.equal(new Set(grounding.findings.map(row => row.id)).size, grounding.findings.length);
for (const row of grounding.findings) {
  assert.ok(["confirmed", "contradicted", "absent", "unverified"].includes(row.disposition));
  for (const key of ["id", "claim", "limit"]) assert.ok(typeof row[key] === "string" && row[key].length > 0);
  assert.ok(Array.isArray(row.evidence) && row.evidence.length > 0
    && row.evidence.every(id => repoIds.includes(id)));
}
console.log(`PRD/TAD/ADR guideline contract ok (${files.length} files; ${report.join("; ")})`);
console.log(`Grounding: ${repoIds.length} repositories, ${artifacts} artifacts; ${codebaseRoot === null
  ? "structure checked; source bytes not read" : "exact historical source bytes and declared check names verified"}; no runtime or deployment verdict`);

const rubricText = read("prd-tad-adr-mvp-gtm-maturity.md");
assert.equal(grounding.rubric_source.owner, "../../guidelines/prd-tad-adr-mvp-gtm-maturity.md");
assert.match(grounding.rubric_source.sha256, /^[0-9a-f]{64}$/u);
assert.ok(rubricText.includes(grounding.rubric_source.sha256), "rubric provenance mismatch");
const maturity = validateMaturityAssessment(readMaturityRubric(rubricText), grounding.maturity, grounding.repositories);
console.log(`Maturity: ${maturity.assessed}/4 assessed; evidence structure only, no experience or readiness verdict`);
