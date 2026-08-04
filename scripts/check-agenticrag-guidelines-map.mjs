import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const guidelinesDirectory = path.join(repositoryRoot, "../joohwee/guidelines-archive");
const mapPath = path.join(
  repositoryRoot,
  "schema/AgenticRAG/agenticrag-guidelines-and-surfaces-map.graph.jsonld",
);

const expectedFiles = (await readdir(guidelinesDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
  .map((entry) => `guidelines-archive/${entry.name}`)
  .sort((left, right) => left < right ? -1 : left > right ? 1 : 0);
const map = JSON.parse(await readFile(mapPath, "utf8"));
const guidelineIndexes = map["@graph"].filter(
  (item) => item["@id"] === "node:joohwee:guidelines-archive:index",
);

assert.equal(guidelineIndexes.length, 1, "AgenticRAG map must contain one guideline index");
assert.deepEqual(
  guidelineIndexes[0].properties.files,
  expectedFiles,
  "AgenticRAG guideline index must match the sorted joohwee/guidelines-archive/*.md inventory",
);

console.log(`AgenticRAG guideline map parity ok (${expectedFiles.length} files)`);
