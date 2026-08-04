import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { checkContentContract, parseDocument } from "../lib/git-guidelines/content.mjs";
import { checkFrontmatter } from "../lib/git-guidelines/frontmatter.mjs";
import { checkLineBudget } from "../lib/git-guidelines/line-budget.mjs";
import { buildRuleIndex } from "../lib/git-guidelines/rule-registry.mjs";
import { checkStructure } from "../lib/git-guidelines/structure.mjs";

const documentPath = new URL("../../docs/documents/git-guidelines.md", import.meta.url);
const source = readFileSync(documentPath, "utf8");
const packageJson = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8"));

test("source projects the four root operations and simplified concurrency model", () => {
  const document = parseDocument(source, documentPath.pathname);
  const rules = buildRuleIndex(document);
  const frontmatter = checkFrontmatter(document);
  assert.deepEqual(frontmatter.findings, []);
  assert.deepEqual(checkStructure(document), []);
  assert.deepEqual(checkLineBudget(document, frontmatter.parsed), []);
  assert.deepEqual(checkContentContract(document, rules), []);
  assert.equal(document.sections.length, 16);
  assert.ok(document.lines.length <= 400);
});

test("source and package enforce the independent yjs no-copy boundary", () => {
  assert.match(source, /\[yjs\/yjs\]\(https:\/\/github\.com\/yjs\/yjs\)/u);
  assert.match(source, /Forbid copied code, prose, schema, tests, examples, algorithms, names, dependencies, imports/iu);
  assert.equal(packageJson.dependencies, undefined);
  assert.equal(Object.hasOwn(packageJson.devDependencies || {}, "yjs"), false);
  assert.equal(packageJson.devDependencies["fast-check"], "3.23.2");
  assert.equal(packageJson.devDependencies["js-yaml"], "4.1.1");
});

test("Task 19 coordination artifacts are not created by this implementation", () => {
  for (const relative of ["../../.coordination/dev-source-resolver-write-scope.json", "../../.coordination/dev-source-resolver-cloud-request.json"]) {
    assert.throws(() => readFileSync(new URL(relative, import.meta.url)), /ENOENT/u);
  }
});
