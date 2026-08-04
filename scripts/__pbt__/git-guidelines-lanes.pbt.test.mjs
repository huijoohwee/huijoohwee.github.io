import assert from "node:assert/strict";
import test from "node:test";

import fc from "fast-check";

import { normalizedWriteSetsOverlap } from "../lib/git-guidelines/artifact-schema.mjs";

test("Property 11: normalized write-set overlap is symmetric", () => {
  const segment = fc.stringMatching(/^[a-z][a-z0-9-]{0,8}$/u);
  const path = fc.array(segment, { minLength: 1, maxLength: 5 }).map(parts => parts.join("/"));
  const scope = fc.array(fc.oneof(path, segment.map(value => `semantic:${value}`)), { minLength: 1, maxLength: 30 });
  fc.assert(fc.property(scope, scope, (left, right) => {
    assert.equal(normalizedWriteSetsOverlap(left, right), normalizedWriteSetsOverlap(right, left));
  }), { numRuns: 150 });
});

test("Property 12: no disjoint-authority cardinality ceiling is encoded", () => {
  fc.assert(fc.property(fc.integer({ min: 9, max: 100 }), count => {
    const scopes = Array.from({ length: count }, (_value, index) => [`path-${index}`]);
    for (let left = 0; left < scopes.length; left += 1) for (let right = left + 1; right < scopes.length; right += 1) assert.equal(normalizedWriteSetsOverlap(scopes[left], scopes[right]), false);
  }), { numRuns: 20 });
});
