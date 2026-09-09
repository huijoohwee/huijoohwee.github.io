import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { validateGuidelinesMap } from "../lib/guidelines-map-contract.mjs";

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), "guidelines-map-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "guidelines"));
  await mkdir(path.join(root, "schema"));
  await writeFile(path.join(root, "guidelines/owner.md"), "[Schema](../schema/contract.json)\n");
  await writeFile(path.join(root, "schema/contract.json"), JSON.stringify({ sources: ["guidelines/owner.md"] }));
  return { root, map: { "@graph": [{ "@id": "node:site:guidelines:index", "properties": {
    repo: "huijoohwee.github.io", relDir: "guidelines", inventoryPattern: "*.md", loadPolicy: "on-demand",
  } }] } };
}

test("active inventory resolves additions without a second file catalog", async (t) => {
  const { root, map } = await fixture(t);
  assert.deepEqual(await validateGuidelinesMap(map, root), { files: 1, references: 2 });
  await writeFile(path.join(root, "guidelines/addition.md"), "# New concern\n");
  assert.equal((await validateGuidelinesMap(map, root)).files, 2);
});

test("deleting a guideline referenced by a schema fails closed", async (t) => {
  const { root, map } = await fixture(t);
  await writeFile(path.join(root, "guidelines/other.md"), "# Other\n");
  await rm(path.join(root, "guidelines/owner.md"));
  await assert.rejects(validateGuidelinesMap(map, root), /missing local file: guidelines\/owner.md/);
});

test("broken local schema links fail without fetching external URLs", async (t) => {
  const { root, map } = await fixture(t);
  await writeFile(path.join(root, "guidelines/owner.md"), "[External](https://example.invalid/schema/a.json)\n[Missing](/schema/missing.json)\n");
  await assert.rejects(validateGuidelinesMap(map, root), /missing local file: schema\/missing.json/);
});

test("map rejects duplicate IDs and unresolved relationships", async (t) => {
  const { root, map } = await fixture(t);
  map["@graph"].push(structuredClone(map["@graph"][0]));
  await assert.rejects(validateGuidelinesMap(map, root), /unique/);
  map["@graph"].pop();
  map["@graph"].push({ "@id": "edge:missing", "@type": "kg:Edge", source: "absent", target: "node:site:guidelines:index" });
  await assert.rejects(validateGuidelinesMap(map, root), /unresolved edge endpoint/);
});

test("source paths cannot escape the repository", async (t) => {
  const { root, map } = await fixture(t);
  map["@graph"].push({ "@id": "node:escape", properties: { repo: "huijoohwee.github.io", relPath: "../outside.md" } });
  await assert.rejects(validateGuidelinesMap(map, root), /path escapes repository/);
});


test("removed documents cannot remain linked by another guideline", async (t) => {
  const { root, map } = await fixture(t);
  await writeFile(path.join(root, "guidelines/owner.md"), "[Retired](./retired.md)\n");
  await assert.rejects(validateGuidelinesMap(map, root), /missing local file: guidelines\/retired.md/);
});

test("linked symlinks cannot read a file outside the repository", async (t) => {
  const { root, map } = await fixture(t);
  const outside = await mkdtemp(path.join(tmpdir(), "guidelines-outside-"));
  t.after(() => rm(outside, { recursive: true, force: true }));
  await writeFile(path.join(outside, "external.md"), "# Outside\n");
  await symlink(path.join(outside, "external.md"), path.join(root, "guidelines/external.md"));
  await writeFile(path.join(root, "guidelines/owner.md"), "[External](./external.md)\n");
  await assert.rejects(validateGuidelinesMap(map, root), /symlink escapes repository/);
});
