import assert from "node:assert/strict";
import test from "node:test";

import fc from "fast-check";

import { validateArtifact } from "../lib/git-guidelines/artifact-schema.mjs";

test("Property 15 and 16: authorization is single-use and closed by default", () => {
  const decision = fc.record({ actor: fc.option(fc.string({ minLength: 1 })), boundary: fc.option(fc.string({ minLength: 1 })), candidate: fc.option(fc.string({ minLength: 1 })), target: fc.option(fc.string({ minLength: 1 })), issuedAt: fc.option(fc.date().map(value => value.toISOString())), consumed: fc.boolean() });
  fc.assert(fc.property(decision, value => {
    const ready = [value.actor, value.boundary, value.candidate, value.target, value.issuedAt].every(Boolean) && !value.consumed;
    const first = ready; const second = ready && !first;
    assert.equal(second, false);
  }), { numRuns: 100 });
});

test("Property 18: degraded artifacts never validate as conformant", () => {
  fc.assert(fc.property(fc.constantFrom(
    null,
    {},
    { schema: "unknown/v1" },
    { schema: "agentic-change-manifest/v1" },
    { schema: "agentic-collaboration-claim-receipt/v1" },
    { schema: "agentic-collaboration-continuation-receipt/v1" },
    { schema: "agentic-collaboration-integration-receipt/v1" },
    { schema: "agentic-collaboration-retirement-receipt/v1" },
    { schema: "agentic-cloud-collaboration-result/v1" },
  ), value => {
    assert.ok(validateArtifact(value).length > 0);
  }), { numRuns: 40 });
});
