import assert from "node:assert/strict";
import test from "node:test";

import yaml from "js-yaml";

import { FrontmatterError, readFrontmatter } from "../lib/git-guidelines/fm-reader.mjs";
import { checkFrontmatter } from "../lib/git-guidelines/frontmatter.mjs";

test("bounded reader agrees with js-yaml for nested mappings and scalar sequences", () => {
  const source = [
    "---",
    'title: "Git: guidelines"',
    "enabled: true",
    "attempts: 3",
    "nothing: null",
    "flow: [\"one\", 'two', false, 4.5]",
    "block:",
    '  - "#git-collaboration"',
    "  - plain",
    "settings:",
    "  owner: 'operator''s function'",
    "  tags:",
    "    - alpha",
    '    - "beta, gamma"',
    "---",
    "# Body",
  ].join("\n");

  const parsed = readFrontmatter(source);
  const oracle = yaml.load(parsed.raw.split("\n").slice(1, -1).join("\n"));
  assert.deepEqual(toPlain(parsed.data), oracle);
  assert.equal(parsed.keyLines["settings.tags"], 12);
  assert.equal(parsed.endLine, 15);
  assert.ok(Object.isFrozen(parsed.data));
  assert.ok(Object.isFrozen(parsed.data.block));
  assert.ok(Object.isFrozen(parsed.data.settings));
});

test("reader reports typed, line-specific duplicate and grammar failures", () => {
  const duplicate = "---\nouter:\n  key: one\n  key: two\n---\n";
  assert.throws(() => readFrontmatter(duplicate), error => {
    assert.ok(error instanceof FrontmatterError);
    assert.equal(error.code, "frontmatter-unparseable");
    assert.equal(error.line, 4);
    assert.match(error.message, /Duplicate frontmatter key: outer\.key/u);
    return true;
  });

  const cases = [
    ["---\nouter:\n  inner:\n    deep: value\n---\n", 4, /another mapping level/u],
    ["---\nitems:\n  - key: value\n---\n", 3, /quoted scalar/u],
    ["---\nvalue: &anchor one\n---\n", 2, /quoted scalar/u],
    ["---\nvalue: [one, {two: three}]\n---\n", 2, /Flow mappings/u],
    ["---\nvalue: one\n\n---\n", 3, /Blank lines/u],
    ["---\nvalue:\tbad\n---\n", 2, /Tabs/u],
  ];
  for (const [source, line, message] of cases) {
    assert.throws(() => readFrontmatter(source), error => {
      assert.equal(error.code, "frontmatter-unparseable");
      assert.equal(error.line, line);
      assert.match(error.message, message);
      return true;
    });
  }
});

test("frontmatter validation rejects invalid calendar dates and stale rung names", () => {
  for (const date of ["2025-02-29", "2026-04-31", "2026-13-01", "2026-00-10"]) {
    const result = checkFrontmatter(document(validFrontmatter({ date })));
    assert.equal(result.findings.length, 1, date);
    assert.equal(result.findings[0].severity, "blocker");
    assert.match(result.findings[0].message, /Frontmatter date expected a calendar date/u);
  }

  assert.deepEqual(checkFrontmatter(document(validFrontmatter({ date: "2024-02-29" }))).findings, []);
  assert.deepEqual(checkFrontmatter(document(validFrontmatter({ local_rung: "dev-proven" }))).findings, []);
  assert.deepEqual(checkFrontmatter(document(validFrontmatter({ lang: "en-US" }))).findings, []);
  assert.equal(checkFrontmatter(document(validFrontmatter({ lang: "eng-US" }))).findings.length, 1);
  const stale = checkFrontmatter(document(validFrontmatter({ local_rung: "integration-ready" })));
  assert.equal(stale.findings.length, 1);
  assert.match(stale.findings[0].message, /Authoring_Authority readiness rung/u);
});

test("frontmatter validation partitions keys and accumulates every domain defect", () => {
  const source = frontmatter({
    title: "",
    doc_type: "Unknown",
    version: "1",
    date: "2025-02-29",
    lang: "-",
    owner: ["one", "two"],
    local_rung: "integration-ready",
    delivered_rung: ["undocumented"],
    lane: "review",
    universal_scope: true,
    companion_of: "wrong.md",
    invocation_token: "/wrong",
    semantic_filters: ["#wrong"],
    bindings: ["@wrong"],
    frontmatter_contract: false,
    unexpected_key: "value",
  });
  const before = Buffer.from(source);
  const result = checkFrontmatter(document(source));

  assert.deepEqual(result.partitions, {
    baseline: ["title", "doc_type", "version", "date", "lang"],
    conformance: ["owner", "local_rung", "delivered_rung", "lane", "universal_scope"],
    optional: ["companion_of", "invocation_token", "semantic_filters", "bindings", "frontmatter_contract"],
    unknown: ["unexpected_key"],
  });
  assert.equal(result.findings.length, 16);
  assert.equal(result.findings.filter(item => item.severity === "blocker").length, 10);
  assert.equal(result.findings.filter(item => item.severity === "minor").length, 6);
  for (const key of Object.keys(toPlain(result.parsed.data))) {
    assert.ok(result.findings.some(item => item.message.includes(key)), `missing finding for ${key}`);
  }
  assert.deepEqual(Buffer.from(source), before);
});

test("unparseable frontmatter short-circuits Requirement 1 as one fatal result", () => {
  const result = checkFrontmatter(document("title: absent delimiter\n"));
  assert.equal(result.parsed, null);
  assert.equal(result.partitions, null);
  assert.equal(result.findings.length, 1);
  assert.equal(result.findings[0].severity, "blocker");
  assert.equal(result.findings[0].location.line, 1);
  assert.match(result.findings[0].message, /^frontmatter-unparseable:/u);
  assert.doesNotMatch(result.findings[0].message, /Frontmatter owner expected/u);
});

function validFrontmatter(overrides = {}) {
  return frontmatter({
    title: "Git Guidelines",
    doc_type: "Guidelines",
    version: "1.0.0",
    date: "2026-08-04",
    lang: "en-US",
    owner: "Orchestrator function",
    local_rung: "spec-complete",
    delivered_rung: "undocumented",
    lane: "authoring",
    universal_scope: false,
    companion_of: "guidelines/adlc-guidelines.md",
    invocation_token: "/git.guidelines",
    semantic_filters: ["#git-collaboration"],
    bindings: ["@git-guidelines"],
    frontmatter_contract: "required",
    ...overrides,
  });
}

function frontmatter(mapping) {
  return `---\n${serializeMapping(mapping)}---\n`;
}

function serializeMapping(mapping, indent = 0) {
  const prefix = " ".repeat(indent);
  return Object.entries(mapping).map(([key, value]) => {
    if (Array.isArray(value)) return `${prefix}${key}: [${value.map(serializeScalar).join(", ")}]\n`;
    if (value && typeof value === "object") return `${prefix}${key}:\n${serializeMapping(value, indent + 2)}`;
    return `${prefix}${key}: ${serializeScalar(value)}\n`;
  }).join("");
}

function serializeScalar(value) {
  return typeof value === "string" ? JSON.stringify(value) : String(value);
}

function document(text) {
  return Object.freeze({ text, sourcePath: "/tmp/git-guidelines.md" });
}

function toPlain(value) {
  return JSON.parse(JSON.stringify(value));
}
