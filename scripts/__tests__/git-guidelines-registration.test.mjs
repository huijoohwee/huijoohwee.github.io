import assert from "node:assert/strict";
import test from "node:test";

import { computeCatalogDigest } from "../lib/git-guidelines/registration.mjs";

test("catalog digest is order-insensitive but rename-sensitive", () => {
  const first = dictionaries(["/b", "/a"]);
  const second = dictionaries(["/a", "/b"]);
  const renamed = dictionaries(["/a", "/c"]);
  assert.deepEqual(computeCatalogDigest(first), computeCatalogDigest(second));
  assert.equal(computeCatalogDigest(first).count, 2);
  assert.notEqual(computeCatalogDigest(first).digest, computeCatalogDigest(renamed).digest);
});

function dictionaries(tokens) {
  const rows = tokens.map(token => `| \`${token}\` | ${token} summary | b | f | done |`).join("\n");
  return {
    "docs/DICTIONARY-COMMAND.md": `## Commands\n\n| Token | Intent | B | F | Done |\n|---|---|---|---|---|\n${rows}\n`,
    "docs/DICTIONARY-SEMANTIC.md": "## Tags\n\n| Token | Meaning |\n|---|---|\n",
    "docs/DICTIONARY-BINDING.md": "## Bindings\n\n| Token | Meaning |\n|---|---|\n",
  };
}
