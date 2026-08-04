import assert from "node:assert/strict";
import test from "node:test";

import fc from "fast-check";

import { parseDocument } from "../lib/git-guidelines/content.mjs";
import { checkNeutrality } from "../lib/git-guidelines/neutrality.mjs";

test("Property 7: concrete terms are accepted only inside reference implementation blocks", () => {
  fc.assert(fc.property(fc.constantFrom("GitHub", "Cloudflare", "yjs/yjs", "npm"), term => {
    const outside = parseDocument(`## Rules\n\n- [advisory] ${term}\n`, "doc.md");
    const inside = parseDocument(`## Rules\n\n### Reference implementation example\n\n- [advisory] ${term}\n`, "doc.md");
    assert.equal(checkNeutrality(outside).length, 1);
    assert.equal(checkNeutrality(inside).length, 0);
  }), { numRuns: 40 });
});
