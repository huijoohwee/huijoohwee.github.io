import assert from "node:assert/strict";
import { readdir, readFile, stat, realpath } from "node:fs/promises";
import path from "node:path";

// Paths describe references; they never authorize reading outside this repository.
async function requireLocalFile(root, reference, from = "schema map") {
  const target = path.resolve(root, reference);
  assert(target.startsWith(`${path.resolve(root)}${path.sep}`), `${from}: path escapes repository: ${reference}`);
  const physical = await realpath(target).catch(() => null);
  assert(!physical || physical.startsWith(`${await realpath(root)}${path.sep}`), `${from}: symlink escapes repository: ${reference}`);
  assert((await stat(target).catch(() => null))?.isFile(), `${from}: missing local file: ${reference}`);
}

export async function validateGuidelinesMap(map, root) {
  const graph = map["@graph"];
  assert(Array.isArray(graph), "guideline map must contain @graph");
  const ids = new Set();
  for (const item of graph) {
    assert(typeof item["@id"] === "string" && !ids.has(item["@id"]), "map IDs must be present and unique");
    ids.add(item["@id"]);
  }
  for (const item of graph) {
    if (item["@type"] === "kg:Edge") {
      assert(ids.has(item.source) && ids.has(item.target), `${item["@id"]}: unresolved edge endpoint`);
    }
    if (item.properties?.repo === "huijoohwee.github.io" && item.properties.relPath) {
      await requireLocalFile(root, item.properties.relPath);
    }
  }
  const index = graph.find((item) => item["@id"] === "node:site:guidelines:index");
  assert(index, "map must identify the active guideline corpus separately from archives");
  assert.deepEqual(index.properties, {
    repo: "huijoohwee.github.io", relDir: "guidelines", inventoryPattern: "*.md", loadPolicy: "on-demand",
  }, "active corpus must use a live inventory and on-demand loading");
  const files = (await readdir(path.join(root, "guidelines"), { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => `guidelines/${entry.name}`).sort();
  assert(files.length > 0, "active guideline corpus is empty");
  let references = 0;
  for (const file of files) {
    await requireLocalFile(root, file);
    const source = await readFile(path.join(root, file), "utf8");
    // Check authored document/schema links; media examples and external URLs are separate surfaces.
    for (const match of source.matchAll(/\]\(<?([^\s)>]+)>?(?:\s+"[^"]*")?\)/g)) {
      const link = match[1].split(/[?#]/)[0];
      if (/^[a-z][a-z\d+.-]*:/i.test(link) || !(link.includes("schema/") || link.endsWith(".md"))) continue;
      const resolved = link.startsWith("/") ? link.slice(1) : path.join(path.dirname(file), link);
      await requireLocalFile(root, decodeURIComponent(resolved), file);
      references++;
    }
  }
  // Schema documents already carry their own guideline source references. Validate those
  // references directly, without adding a second generated copy of the guideline inventory.
  async function inspect(directory) {
    for (const entry of await readdir(path.join(root, directory), { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) { await inspect(file); continue; }
      if (!/\.json(ld)?$/.test(entry.name)) continue;
      await requireLocalFile(root, file);
      const source = await readFile(path.join(root, file), "utf8");
      // This is reference validation, not a replacement for each schema owner's parser.
      // Empty historical schema placeholders contain no references to validate.
      for (const match of source.matchAll(/"(\/?guidelines\/[^"\n]+\.md(?:#[^"\n]*)?)"/g)) {
        const reference = JSON.parse(match[0]).replace(/^\//, "").split("#")[0];
        await requireLocalFile(root, reference, file);
        references++;
      }
    }
  }
  await inspect("schema");
  return { files: files.length, references };
}
