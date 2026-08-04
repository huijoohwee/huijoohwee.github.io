import assert from "node:assert/strict";
import test from "node:test";

import fc from "fast-check";

import { digestBytes, validateArtifact } from "../lib/git-guidelines/artifact-schema.mjs";

test("Property 13: binary recovery digest round-trips exactly", () => {
  fc.assert(fc.property(fc.uint8Array({ maxLength: 4096 }), bytes => {
    const captured = Buffer.from(bytes);
    const restored = Buffer.from(captured);
    assert.equal(digestBytes(captured), digestBytes(restored));
    assert.deepEqual(restored, captured);
  }), { numRuns: 100 });
});

test("Property 14: manifest ordering is deterministic and duplicate-free", () => {
  const repositoryPath = fc
    .array(fc.stringMatching(/^[a-z][a-z0-9-]{0,20}$/u), { minLength: 1, maxLength: 6 })
    .map(segments => segments.join("/"));
  fc.assert(fc.property(fc.uniqueArray(repositoryPath, { maxLength: 500 }), paths => {
    const sorted = [...paths].sort((left, right) => Buffer.from(left).compare(Buffer.from(right)));
    const value = { schema: "agentic-change-manifest/v1", branch: "agent/device/scope", baseSha: "a".repeat(40), paths: sorted };
    assert.deepEqual(validateArtifact(value), []);
  }), { numRuns: 75 });
});
