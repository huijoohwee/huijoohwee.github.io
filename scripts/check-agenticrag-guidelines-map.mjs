import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const mapPath = path.join(
  repositoryRoot,
  "schema/AgenticRAG/agenticrag-guidelines-and-surfaces-map.graph.jsonld",
);
const guidelinesDirectoryCandidates = [
  process.env.AGENTICRAG_GUIDELINES_ARCHIVE_DIR,
  path.join(repositoryRoot, "joohwee/guidelines-archive"),
  path.join(repositoryRoot, "../joohwee/guidelines-archive"),
].filter(Boolean);

const guidelinesDirectory = await resolveGuidelinesDirectory(guidelinesDirectoryCandidates);

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

async function resolveGuidelinesDirectory(candidates) {
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {}
  }

  throw new Error(
    `Could not locate joohwee/guidelines-archive. Tried: ${candidates.join(", ")}`,
  );
}
