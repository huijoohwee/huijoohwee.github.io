import assert from "node:assert/strict";
import test from "node:test";

import fc from "fast-check";
import yaml from "js-yaml";

import { readFrontmatter } from "../lib/git-guidelines/fm-reader.mjs";
import { checkFrontmatter } from "../lib/git-guidelines/frontmatter.mjs";

const RESERVED_STRINGS = [
  "", ": value", "value # comment", "-leading", "?leading", ":leading", ",leading", "[leading", "]leading", "{leading", "}leading",
  "&leading", "*leading", "!leading", "|leading", ">leading", "%leading", "@leading", "`leading", "'leading", '"leading',
  "café", "東京", "🙂", "a", "a".repeat(80), "a".repeat(120),
];
const text = fc.oneof(
  fc.constantFrom(...RESERVED_STRINGS),
  fc.array(fc.constantFrom("a", "Z", "0", " ", "_", "-", "é", "界", "🙂"), { maxLength: 30 }).map(characters => characters.join("")),
);
const scalar = fc.oneof(text, fc.boolean(), fc.integer({ min: -1_000_000, max: 1_000_000 }));
const sequence = fc.array(scalar, { maxLength: 8 });
const nonEmptySequence = fc.array(scalar, { minLength: 1, maxLength: 8 });
const safePlain = fc.stringMatching(/^[A-Za-z][A-Za-z0-9._-]{0,30}$/u);

test("Property 1: bounded frontmatter round-trips with the dev-time YAML oracle", () => {
  const mapping = fc.record({
    title: text,
    plain_value: safePlain,
    enabled: fc.boolean(),
    attempts: fc.integer({ min: -1000, max: 1000 }),
    flow: sequence,
    block: nonEmptySequence,
    nested: fc.record({ owner: text, active: fc.boolean(), tags: sequence }),
  });

  fc.assert(fc.property(mapping, value => {
    const source = serializeFixture(value);
    const first = readFrontmatter(source).data;
    const oracle = yaml.load(frontmatterBody(source));
    assert.deepEqual(toPlain(first), oracle);

    const serialized = serializeFixture(toPlain(first));
    const second = readFrontmatter(serialized).data;
    assert.deepEqual(toPlain(second), toPlain(first));
    assert.deepEqual(yaml.load(frontmatterBody(serialized)), toPlain(second));
  }), { numRuns: 150 });
});

test("Property 2: partition membership determines defect severity", () => {
  const requiredDefect = fc.option(fc.constantFrom(
    ["title", ""],
    ["doc_type", "Unknown"],
    ["version", "1"],
    ["date", "2025-02-29"],
    ["lang", "-"],
    ["owner", ["one", "two"]],
    ["local_rung", "integration-ready"],
    ["delivered_rung", ["undocumented"]],
    ["lane", "review"],
    ["universal_scope", true],
  ), { nil: null });
  const optionalDefect = fc.option(fc.constantFrom(
    ["companion_of", "wrong.md"],
    ["invocation_token", "/wrong"],
    ["semantic_filters", ["#wrong"]],
    ["bindings", ["@wrong"]],
    ["frontmatter_contract", false],
  ), { nil: null });

  fc.assert(fc.property(requiredDefect, optionalDefect, fc.boolean(), (required, optional, includeUnknown) => {
    const mapping = validMapping();
    if (required) mapping[required[0]] = required[1];
    if (optional) mapping[optional[0]] = optional[1];
    if (includeUnknown) mapping.unknown_property = "value";

    const result = checkFrontmatter({ text: serializeFlat(mapping), sourcePath: "/tmp/generated.md" });
    assert.equal(result.findings.filter(item => item.severity === "blocker").length, required ? 1 : 0);
    assert.equal(result.findings.filter(item => item.severity === "minor").length, Number(Boolean(optional)) + Number(includeUnknown));
    if (required) assert.ok(result.partitions[partitionOf(required[0])].includes(required[0]));
    if (optional) assert.ok(result.partitions.optional.includes(optional[0]));
    if (includeUnknown) assert.deepEqual(result.partitions.unknown, ["unknown_property"]);
  }), { numRuns: 150 });
});

test("duplicate keys always fail closed with the second key line", () => {
  fc.assert(fc.property(fc.stringMatching(/^[A-Za-z]{1,20}$/u), value => {
    assert.throws(
      () => readFrontmatter(`---\ntitle: ${value}\ntitle: ${value}\n---\n`),
      error => error.code === "frontmatter-unparseable" && error.line === 3,
    );
  }), { numRuns: 50 });
});

function serializeFixture(mapping) {
  const lines = [
    "---",
    `title: ${serializeScalar(mapping.title)}`,
    `plain_value: ${mapping.plain_value}`,
    `enabled: ${serializeScalar(mapping.enabled)}`,
    `attempts: ${serializeScalar(mapping.attempts)}`,
    `flow: [${mapping.flow.map(serializeScalar).join(", ")}]`,
    "block:",
    ...mapping.block.map(value => `  - ${serializeScalar(value)}`),
    "nested:",
    `  owner: ${serializeScalar(mapping.nested.owner)}`,
    `  active: ${serializeScalar(mapping.nested.active)}`,
    `  tags: [${mapping.nested.tags.map(serializeScalar).join(", ")}]`,
    "---",
    "",
  ];
  return lines.join("\n");
}

function validMapping() {
  return {
    title: "Git Guidelines",
    doc_type: "Guidelines",
    version: "1.0.0",
    date: "2026-08-04",
    lang: "en",
    owner: "Orchestrator function",
    local_rung: "spec-complete",
    delivered_rung: "undocumented",
    lane: "authoring",
    universal_scope: false,
    companion_of: "guidelines/agentic-sdlc-guidelines.md",
    invocation_token: "/git.guidelines",
    semantic_filters: ["#git-collaboration"],
    bindings: ["@git-guidelines"],
    frontmatter_contract: "required",
  };
}

function serializeFlat(mapping) {
  const entries = Object.entries(mapping).map(([key, value]) => {
    if (Array.isArray(value)) return `${key}: [${value.map(serializeScalar).join(", ")}]`;
    return `${key}: ${serializeScalar(value)}`;
  });
  return `---\n${entries.join("\n")}\n---\n`;
}

function serializeScalar(value) {
  return typeof value === "string" ? JSON.stringify(value) : String(value);
}

function frontmatterBody(source) {
  const lines = source.split("\n");
  return lines.slice(1, lines.lastIndexOf("---")).join("\n");
}

function partitionOf(key) {
  return ["title", "doc_type", "version", "date", "lang"].includes(key) ? "baseline" : "conformance";
}

function toPlain(value) {
  return JSON.parse(JSON.stringify(value));
}
