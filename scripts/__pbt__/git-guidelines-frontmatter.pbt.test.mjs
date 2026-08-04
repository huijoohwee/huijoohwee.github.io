import assert from "node:assert/strict";
import test from "node:test";

import fc from "fast-check";
import yaml from "js-yaml";

import { readFrontmatter } from "../lib/git-guidelines/fm-reader.mjs";

test("Property 1: bounded frontmatter round-trips with the dev-time YAML oracle", () => {
  const safe = fc.stringMatching(/^[A-Za-z0-9 ._-]{1,40}$/u);
  fc.assert(fc.property(safe, safe, (title, owner) => {
    const source = `---\ntitle: ${JSON.stringify(title)}\ndoc_type: "Guidelines"\nversion: "1.0.0"\ndate: "2026-08-04"\nlang: "en"\nowner: ${JSON.stringify(owner)}\nlocal_rung: "spec-complete"\ndelivered_rung: "undocumented"\nlane: "authoring"\nuniversal_scope: false\n---\n`;
    const strict = readFrontmatter(source).data;
    const oracle = yaml.load(source.split("---\n")[1]);
    assert.deepEqual({ ...strict }, oracle);
  }), { numRuns: 100 });
});

test("Property 2: duplicate keys always fail closed", () => {
  fc.assert(fc.property(fc.stringMatching(/^[A-Za-z]{1,20}$/u), value => {
    assert.throws(() => readFrontmatter(`---\ntitle: ${value}\ntitle: ${value}\n---\n`));
  }), { numRuns: 50 });
});
