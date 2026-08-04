import assert from "node:assert/strict";
import test from "node:test";

import fc from "fast-check";

import { parseDocument } from "../lib/git-guidelines/content.mjs";
import { checkNeutrality } from "../lib/git-guidelines/neutrality.mjs";

const CONCRETE_TOKENS = Object.freeze([
  "GitHub",
  "example.com",
  "AcmeVendor",
  "some/package",
  "deno",
  "brew",
  "fictionpm",
  "acmectl",
]);

test("Property 7: concrete terms are accepted only inside reference implementation headings", () => {
  fc.assert(fc.property(fc.constantFrom(...CONCRETE_TOKENS), term => {
    const outside = parseDocument(`## Rules\n\n- [advisory] ${term}\n`, "doc.md");
    const inside = parseDocument(`## Rules\n\n### Reference implementation example\n\n- [advisory] ${term}\n`, "doc.md");
    const findings = checkNeutrality(outside);
    assert.equal(findings.length, 1);
    assert.deepEqual(pickPosition(findings[0]), { line: 3, column: 14 });
    assert.equal(checkNeutrality(inside).length, 0);
  }), { numRuns: 40 });
});

test("Property 7: concrete terms fail at exact positions across non-reference contexts", () => {
  const placements = Object.freeze([
    Object.freeze({ source: term => `---\nbrand: ${term}\n---\n## Rules\n`, line: 2, column: 8 }),
    Object.freeze({ source: term => `## Rules\n\n| value | class |\n|---|---|\n| ${term} | advisory |\n`, line: 5, column: 3 }),
    Object.freeze({ source: term => `## Anti-Patterns\n\nprefix ${term} suffix.\n`, line: 3, column: 8 }),
    Object.freeze({ source: term => `## Mantra\n\nprefix ${term} suffix.\n`, line: 3, column: 8 }),
    Object.freeze({ source: term => `## Rules\n\nprefix ${term}\n\n\`\`\`text\nreference implementation\nneutral\n\`\`\`\n`, line: 3, column: 8 }),
    Object.freeze({ source: term => `## Rules\n\n\`\`\`text\nreference implementation\nneutral\n\`\`\`\nprefix ${term}\n`, line: 7, column: 8 }),
  ]);
  fc.assert(fc.property(
    fc.constantFrom(...CONCRETE_TOKENS),
    fc.constantFrom(...placements),
    (term, placement) => {
      const findings = checkNeutrality(parseDocument(placement.source(term), "doc.md"));
      assert.equal(findings.length, 1);
      assert.deepEqual(pickPosition(findings[0]), { line: placement.line, column: placement.column });
    },
  ), { numRuns: 80 });
});

test("Property 7: exact block text licenses tokens and near-miss headings do not", () => {
  fc.assert(fc.property(fc.constantFrom(...CONCRETE_TOKENS), term => {
    const fence = parseDocument(`## Rules\n\n\`\`\`text\nreference implementation\n${term}\n\`\`\`\n`, "doc.md");
    const table = parseDocument(`## Rules\n\n| Kind | Value |\n|---|---|\n| note | reference implementation |\n| vendor | ${term} |\n`, "doc.md");
    assert.equal(checkNeutrality(fence).length, 0);
    assert.equal(checkNeutrality(table).length, 0);

    for (const heading of ["reference implementations", "for reference", "implementation reference"]) {
      const nearMiss = parseDocument(`## Rules\n\n### ${heading}\n\n- [advisory] ${term}\n`, "doc.md");
      const findings = checkNeutrality(nearMiss);
      assert.equal(findings.length, 1);
      assert.deepEqual(pickPosition(findings[0]), { line: 5, column: 14 });
    }
  }), { numRuns: 40 });
});

function pickPosition(finding) {
  return { line: finding.location.line, column: finding.location.column };
}
