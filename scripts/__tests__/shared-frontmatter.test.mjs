import test from "node:test";
import assert from "node:assert/strict";
import { FRONTMATTER_LIMITS } from "agentic-os/frontmatter";
import { FrontmatterError, readFrontmatter } from "../lib/git-guidelines/fm-reader.mjs";

test("the local YAML adapter applies upstream byte and parsed-value limits", () => {
  for (const source of [
    "---\ntitle: " + "é".repeat(FRONTMATTER_LIMITS.maxStringBytes / 2 + 1) + "\n---\n",
    "---\ntitle: valid\n---\n" + "x".repeat(FRONTMATTER_LIMITS.documentBytes),
    "---\nitems: [" + Array(1025).fill("true").join(", ") + "]\n---\n",
    "---\nnumber: " + "9".repeat(400) + "\n---\n",
  ]) {
    assert.throws(() => readFrontmatter(source), error => error instanceof FrontmatterError);
  }
});

test("shared handling preserves local syntax errors, line diagnostics and immutable metadata", () => {
  const parsed = readFrontmatter("---\ntitle: 'Example: one'\nowner: team\n---\n");
  assert.equal(parsed.data.title, "Example: one");
  assert.equal(parsed.keyLines.owner, 3);
  assert.equal(Object.isFrozen(parsed.data), true);
  assert.throws(() => readFrontmatter("---\ntitle: one\ntitle: two\n---\n"),
    error => error instanceof FrontmatterError && error.line === 3);
  assert.throws(() => readFrontmatter("---\nflow: {nodes: []}\n---\n"), FrontmatterError);
});
