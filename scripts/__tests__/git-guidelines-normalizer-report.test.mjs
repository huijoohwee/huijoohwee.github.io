import assert from "node:assert/strict";
import test from "node:test";

import {
  ARTIFACT_UNORDERED_SEQUENCE_PATHS,
  NORMALIZATION_CLASSES,
  NORMALIZATION_EXCLUSIONS,
  normalizeArtifactsForComparison,
  normalizeFrontmatterSource,
  normalizeValue,
} from "../lib/git-guidelines/normalizer.mjs";
import { checkFrontmatter } from "../lib/git-guidelines/frontmatter.mjs";
import { finding as createFinding, parseDocument } from "../lib/git-guidelines/content.mjs";
import { buildReport, collapseFindings } from "../lib/git-guidelines/report.mjs";
import { buildRuleIndex } from "../lib/git-guidelines/rule-registry.mjs";

test("normalization applies exactly the six ordered classes to structured input", () => {
  assert.deepEqual(NORMALIZATION_CLASSES, [
    "line-ending-style",
    "trailing-whitespace",
    "absolute-path-prefix",
    "iso-8601-timestamp",
    "run-identifiers",
    "ordering-insensitive-metadata",
  ]);
  assert.deepEqual(NORMALIZATION_EXCLUSIONS, [
    "interior-whitespace",
    "case",
    "unicode-normalization",
    "comments",
    "quote-style",
    "number-format",
    "separator-translation",
  ]);

  const input = {
    sessionId: "session-123",
    path: "/workspace/repository/src/file.mjs",
    metadata: {
      ordered: ["second", "first"],
      tags: [{ z: 1, a: 2 }, { name: "alpha" }],
      operationId: 42,
    },
    text: "line one  \r\n2026-08-05T11:22:33+08:00\t",
  };
  const normalized = normalizeValue(input, {
    absolutePrefixes: ["/workspace/repository"],
    unorderedSequencePaths: ["/metadata/tags"],
  });

  assert.deepEqual(Object.keys(normalized), ["metadata", "path", "sessionId", "text"]);
  assert.deepEqual(Object.keys(normalized.metadata), ["operationId", "ordered", "tags"]);
  assert.equal(normalized.path, "src/file.mjs");
  assert.equal(normalized.sessionId, "<RUN>");
  assert.equal(normalized.metadata.operationId, "<RUN>");
  assert.deepEqual(normalized.metadata.ordered, ["second", "first"]);
  assert.deepEqual(normalized.metadata.tags, [{ a: 2, z: 1 }, { name: "alpha" }]);
  assert.equal(normalized.text, "line one\n<TS>");
  assert.deepEqual(input.metadata.ordered, ["second", "first"], "normalization must not mutate input arrays");
  assert.equal(Object.isFrozen(normalized.metadata.tags), true);
});

test("normalization preserves every excluded difference and rejects undeclared sequence metadata", () => {
  assert.notEqual(normalizeValue("two  spaces"), normalizeValue("two spaces"));
  assert.notEqual(normalizeValue("Mixed"), normalizeValue("mixed"));
  assert.notEqual(normalizeValue("é"), normalizeValue("e\u0301"));
  assert.notEqual(normalizeValue("# one"), normalizeValue("# two"));
  assert.notEqual(normalizeValue("'value'"), normalizeValue('"value"'));
  assert.notEqual(normalizeValue("1.0"), normalizeValue("1"));
  assert.notEqual(normalizeValue("a\\b"), normalizeValue("a/b"));
  assert.deepEqual(normalizeValue(["b", "a"]), ["b", "a"]);
  assert.throws(() => normalizeValue([], { unorderedSequencePaths: ["metadata.tags"] }), /JSON Pointer/u);
});

test("assembled normalization makes frontmatter order, run IDs, and schema-unordered fields report-idempotent", () => {
  const forwardSource = frontmatterSource(FRONTMATTER_ENTRIES);
  const reverseSource = frontmatterSource([...FRONTMATTER_ENTRIES].reverse());
  const leftArtifacts = [comparisonArtifact({
    sessionId: "session-left",
    operationId: "operation-left",
    findings: [{ code: "zeta" }, { code: "alpha" }],
    receipt: { idempotencyKey: "key-left", findings: ["zeta", "alpha"] },
  })];
  const rightArtifacts = [comparisonArtifact({
    sessionId: "session-right",
    operationId: "operation-right",
    findings: [{ code: "alpha" }, { code: "zeta" }],
    receipt: { idempotencyKey: "key-right", findings: ["alpha", "zeta"] },
  })];

  const leftReport = assembledReport(forwardSource, leftArtifacts);
  const rightReport = assembledReport(reverseSource, rightArtifacts);
  assert.deepEqual(leftReport, rightReport);
  assert.equal(leftArtifacts[0].value.sessionId, "session-left", "comparison normalization must preserve raw validator input");
  assert.equal(leftArtifacts[0].bytes.toString("utf8"), "raw-left");

  const projection = normalizeArtifactsForComparison(leftArtifacts);
  assert.equal(projection[0].value.sessionId, "<RUN>");
  assert.equal(projection[0].value.receipt.idempotencyKey, "<RUN>");
  assert.deepEqual(projection[0].value.findings, [{ code: "alpha" }, { code: "zeta" }]);
  assert.deepEqual(projection[0].value.receipt.findings, ["alpha", "zeta"]);
});

test("artifact comparison sorts only sequences declared unordered by schema", () => {
  assert.deepEqual(ARTIFACT_UNORDERED_SEQUENCE_PATHS["agentic-cloud-collaboration-result/v1"], [
    "/claims",
    "/findings",
    "/receipt/findings",
  ]);
  const left = comparisonArtifact({ schema: "agentic-cloud-collaboration-result/v1", declaredWriteScope: ["path:z", "path:a"] });
  const right = comparisonArtifact({ schema: "agentic-cloud-collaboration-result/v1", declaredWriteScope: ["path:a", "path:z"] });
  assert.notDeepEqual(normalizeArtifactsForComparison([left]), normalizeArtifactsForComparison([right]));
  assert.throws(() => normalizeArtifactsForComparison([], {
    unorderedSequencePathsBySchema: { "schema/v1": ["not-a-pointer"] },
  }), /JSON Pointer/u);
});

test("finding order is anchor, numeric ordinal, line, column, type, then path", () => {
  const findings = [
    finding({ ruleId: "scope#10", line: 1, path: "a", type: "vendor-coupling" }),
    finding({ ruleId: "scope#2", line: 2, path: "a", type: "vendor-coupling" }),
    finding({ ruleId: "scope#2", line: 1, path: "a", type: "vendor-coupling" }),
    finding({ ruleId: "scope#2", line: 1, path: "z", type: "evidence-without-run" }),
    finding({ ruleId: "alpha#9", line: 99, path: "z", type: "vendor-coupling" }),
  ];
  const ordered = collapseFindings(findings);
  assert.deepEqual(ordered.map(item => [item.ruleId, item.location.line, item.type, item.location.path]), [
    ["alpha#9", 99, "vendor-coupling", "z"],
    ["scope#2", 1, "evidence-without-run", "z"],
    ["scope#2", 1, "vendor-coupling", "a"],
    ["scope#2", 2, "vendor-coupling", "a"],
    ["scope#10", 1, "vendor-coupling", "a"],
  ]);
});

test("dedup folds non-adjacent types by Rule_ID and full location while preserving ruleText", () => {
  const shared = { ruleId: "scope#2", line: 4, column: 3, path: "a" };
  const output = collapseFindings([
    finding({ ...shared, type: "evidence-without-run", severity: "minor" }),
    finding({ ...shared, path: "b", type: "vendor-coupling", severity: "major" }),
    finding({ ...shared, type: "vendor-coupling", severity: "blocker", ruleText: "The exact source rule." }),
  ]);
  assert.equal(output.length, 2);
  assert.equal(output[0].type, "evidence-without-run");
  assert.equal(output[0].severity, "blocker");
  assert.equal(output[0].repeatCount, 2);
  assert.equal(output[0].ruleText, "The exact source rule.");
  assert.equal(output[1].location.path, "b");
});

function finding({ ruleId, line, column = 1, path, type, severity = "major", ruleText }) {
  const value = { ruleId, type, severity, location: { path, line, column }, message: `${type} at ${path}` };
  if (ruleText !== undefined) value.ruleText = ruleText;
  return value;
}

const FRONTMATTER_ENTRIES = Object.freeze([
  'title: "Git Guidelines"',
  'doc_type: "Guidelines"',
  'version: "1.0.0"',
  'date: "2026-08-04"',
  'lang: "en"',
  'owner: "Orchestrator function"',
  'local_rung: "spec-complete"',
  'delivered_rung: "undocumented"',
  'lane: "authoring"',
  "universal_scope: false",
  'companion_of: "guidelines/agentic-sdlc-guidelines.md"',
  'invocation_token: "/git.guidelines"',
  'semantic_filters: ["#git-collaboration"]',
  'bindings: ["@git-guidelines"]',
  'frontmatter_contract: "required"',
]);

function frontmatterSource(entries) {
  return `---\n${entries.join("\n")}\n---\n## Rules\n\n- [advisory] neutral rule\n`;
}

function comparisonArtifact(value) {
  return {
    path: "/workspace/.coordination/example.json",
    relativePath: ".coordination/example.json",
    bytes: Buffer.from("raw-left"),
    value: { schema: "agentic-cloud-collaboration-result/v1", ...value },
    validationProblems: [],
  };
}

function assembledReport(source, artifacts) {
  const document = parseDocument(normalizeFrontmatterSource(source), "doc.md");
  const ruleIndex = buildRuleIndex(document);
  const frontmatter = checkFrontmatter(document, ruleIndex);
  const contextFinding = createFinding({
    ruleId: "rules#1",
    ruleText: "Normalized comparison context must be stable.",
    type: "unimplemented-guideline",
    severity: "minor",
    path: document.sourcePath,
    line: frontmatter.parsed.keyLines.title,
    message: JSON.stringify(normalizeArtifactsForComparison(artifacts, { absolutePrefixes: ["/workspace"] })),
  });
  return buildReport({
    findings: [...frontmatter.findings, contextFinding],
    inputStatus: "ready",
    registrationReady: true,
    ruleIndex,
  });
}
