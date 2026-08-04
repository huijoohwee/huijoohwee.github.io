import assert from "node:assert/strict";
import test from "node:test";

import fc from "fast-check";

import { headingAnchor, parseDocument } from "../lib/git-guidelines/content.mjs";

test("Property 6: section anchors and derived positions are deterministic", () => {
  fc.assert(fc.property(fc.array(fc.stringMatching(/^[A-Za-z][A-Za-z ]{0,30}$/u), { minLength: 1, maxLength: 20 }), titles => {
    const unique = [...new Set(titles)];
    const source = unique.map(title => `## ${title}\n\n- [advisory] rule\n`).join("\n");
    const first = parseDocument(source, "doc.md");
    const second = parseDocument(source.replace(/\n/gu, "\r\n"), "doc.md");
    assert.deepEqual(first.sections.map(section => section.anchor), second.sections.map(section => section.anchor));
    assert.deepEqual(first.sections.map(section => section.anchor), unique.map(headingAnchor));
  }), { numRuns: 75 });
});
