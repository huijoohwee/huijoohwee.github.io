import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const expectedArchiveFiles = [
  "guidelines-archive/eda-guidelines.md",
  "guidelines-archive/eda-mlp-cid-implementation-guidelines.md",
  "guidelines-archive/eda-mlp-detailed-implementation-lod-steps.md",
  "guidelines-archive/eda-mlp-detailed-implementation-steps.md",
  "guidelines-archive/eda-mlp-implementation-guidelines.md",
  "guidelines-archive/eda-mlp-keywords-reference-guide.md",
  "guidelines-archive/eda-mlp-pattern-guidelines.md",
  "guidelines-archive/eda-mlp-summary-implementation-steps.md",
  "guidelines-archive/evals-guidelines.md",
  "guidelines-archive/github-implementation-reference-guide.md",
  "guidelines-archive/github-reference-guide.md",
].sort((left, right) => left < right ? -1 : left > right ? 1 : 0);

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
const expectedFiles = guidelinesDirectory
  ? (await readdir(guidelinesDirectory, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => `guidelines-archive/${entry.name}`)
      .sort((left, right) => left < right ? -1 : left > right ? 1 : 0)
  : expectedArchiveFiles;
const map = JSON.parse(await readFile(mapPath, "utf8"));
const guidelineIndexes = map["@graph"].filter(
  (item) => item["@id"] === "node:joohwee:guidelines-archive:index",
);

assert.equal(guidelineIndexes.length, 1, "AgenticRAG map must contain one guideline index");
assert.deepEqual(
  guidelineIndexes[0].properties.files,
  expectedFiles,
  guidelinesDirectory
    ? "AgenticRAG guideline index must match the sorted joohwee/guidelines-archive/*.md inventory"
    : "AgenticRAG guideline index must match the pinned joohwee/guidelines-archive file contract",
);

console.log(
  `AgenticRAG guideline map parity ok (${expectedFiles.length} files${guidelinesDirectory ? "" : "; pinned contract"})`,
);

async function resolveGuidelinesDirectory(candidates) {
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {}
  }

  return null;
}
