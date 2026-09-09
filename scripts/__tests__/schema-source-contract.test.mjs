import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../../", import.meta.url));

test("published JSON-LD sources parse and their declared guideline owners resolve", async () => {
  let count = 0;
  async function inspect(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) { await inspect(file); continue; }
      if (!entry.name.endsWith(".jsonld")) continue;
      const source = await readFile(file, "utf8");
      assert(source.trim(), `${file}: empty published schema`);
      const document = JSON.parse(source);
      assert(document && typeof document === "object", `${file}: expected JSON-LD document`);
      for (const reference of document.documentation_paths ?? []) {
        assert(typeof reference === "string" && reference.startsWith("guidelines/"), `${file}: invalid guideline reference`);
        const target = path.resolve(root, reference);
        assert(target.startsWith(path.join(root, "guidelines") + path.sep), `${file}: reference escapes guidelines`);
        assert((await stat(target)).isFile(), `${file}: missing ${reference}`);
      }
      count++;
    }
  }
  await inspect(path.join(root, "schema"));
  assert(count > 0, "no published schemas checked");
});
