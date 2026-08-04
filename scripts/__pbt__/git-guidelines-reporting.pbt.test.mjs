import assert from "node:assert/strict";
import test from "node:test";

import fc from "fast-check";

import { collapseFindings } from "../lib/git-guidelines/report.mjs";

test("Property 3 and 17: finding reports are total and permutation-idempotent", () => {
  const finding = fc.record({
    ruleId: fc.integer({ min: 1, max: 20 }).map(value => `scope#${value}`),
    type: fc.constantFrom("evidence-without-run", "out-of-scope-write", "vendor-coupling"),
    severity: fc.constantFrom("minor", "major", "blocker"),
    location: fc.record({ path: fc.constant("doc.md"), line: fc.integer({ min: 1, max: 40 }), column: fc.integer({ min: 1, max: 20 }) }),
    message: fc.string({ minLength: 1, maxLength: 20 }),
  });
  fc.assert(fc.property(fc.array(finding, { maxLength: 30 }), values => {
    assert.deepEqual(collapseFindings(values), collapseFindings([...values].reverse()));
  }), { numRuns: 100 });
});
