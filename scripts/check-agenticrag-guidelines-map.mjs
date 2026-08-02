import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const guidelinesDirectory = path.join(repositoryRoot, "guidelines");
const mapPath = path.join(
  repositoryRoot,
  "schema/AgenticRAG/agenticrag-guidelines-and-surfaces-map.graph.jsonld",
);

const expectedFiles = (await readdir(guidelinesDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
  .map((entry) => `guidelines/${entry.name}`)
  .sort((left, right) => left < right ? -1 : left > right ? 1 : 0);
const map = JSON.parse(await readFile(mapPath, "utf8"));
const guidelineIndexes = map["@graph"].filter(
  (item) => item["@id"] === "node:huijoohwee:guidelines:index",
);

assert.equal(guidelineIndexes.length, 1, "AgenticRAG map must contain one guideline index");
assert.deepEqual(
  guidelineIndexes[0].properties.files,
  expectedFiles,
  "AgenticRAG guideline index must match the sorted guidelines/*.md inventory",
);

console.log(`AgenticRAG guideline map parity ok (${expectedFiles.length} files)`);
