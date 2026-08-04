import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { resolveRegistrationInventory } from "../lib/git-guidelines/input-registration.mjs";
import { checkRegistrations, collectRegistrationPathReferences, computeCatalogDigest } from "../lib/git-guidelines/registration.mjs";

test("catalog digest is order-insensitive but rename-sensitive", () => {
  const first = dictionaries(["/b", "/a"]);
  const second = dictionaries(["/a", "/b"]);
  const renamed = dictionaries(["/a", "/c"]);
  assert.deepEqual(computeCatalogDigest(first), computeCatalogDigest(second));
  assert.equal(computeCatalogDigest(first).count, 2);
  assert.notEqual(computeCatalogDigest(first).digest, computeCatalogDigest(renamed).digest);
});

test("registration path collection is exhaustive, artifact-scoped, bounded, and immutable", () => {
  const registrations = registrationFixture();
  const references = collectRegistrationPathReferences(registrations);
  assert.equal(Object.isFrozen(references), true);
  assert.ok(references.every(reference => Object.isFrozen(reference)));
  assert.deepEqual(references, [
    reference("docs/DICTIONARY-BINDING.md", "BINDING-META.md"),
    reference("docs/DICTIONARY-BINDING.md", "BINDING-TABLE.md"),
    reference("docs/DICTIONARY-BINDING.md", "docs/documents/git-guidelines.md"),
    reference("docs/DICTIONARY-COMMAND.md", "COMMAND-META.md"),
    reference("docs/DICTIONARY-COMMAND.md", "COMMAND-PROOF.md"),
    reference("docs/DICTIONARY-COMMAND.md", "COMMAND-TABLE.md"),
    reference("docs/DICTIONARY-COMMAND.md", "docs/documents/git-guidelines.md"),
    reference("docs/DICTIONARY-SEMANTIC.md", "SEMANTIC-META.md"),
    reference("docs/DICTIONARY-SEMANTIC.md", "SEMANTIC-TABLE.md"),
    reference("docs/DICTIONARY-SEMANTIC.md", "docs/documents/git-guidelines.md"),
    reference("docs/README.md", "../README.md", "artifact"),
    reference("docs/README.md", "./AGENTS.md", "artifact"),
    reference("docs/README.md", "DOCS-INDEX-ONLY.md"),
    reference("docs/README.md", "docs/documents/git-guidelines.md"),
  ]);
});

test("registration path collection excludes templates and compatibility types but retains concrete missing paths", () => {
  const references = collectRegistrationPathReferences({
    "docs/README.md": "Use `SKILL.md`-compatible input, rotate todo/YYYY-MM.md, and load docs/missing.md.\n",
    "docs/DICTIONARY-COMMAND.md": "",
    "docs/DICTIONARY-SEMANTIC.md": "",
    "docs/DICTIONARY-BINDING.md": "",
  });
  assert.deepEqual(references, [reference("docs/README.md", "docs/missing.md")]);
});

test("every referenced path requires one positive resolver tuple regardless of loaded-document suffix", () => {
  const registrations = registrationFixture();
  registrations.pathInventory = Object.freeze(registrations.pathInventory.map(entry => (
    entry.artifact === "docs/DICTIONARY-SEMANTIC.md" && entry.path === "SEMANTIC-TABLE.md"
      ? Object.freeze({ ...entry, exists: false })
      : entry
  )).filter(entry => !(entry.artifact === "docs/README.md" && entry.path === "docs/documents/git-guidelines.md")));
  const result = checkRegistrations(documentFixture("/tmp/docs/documents/git-guidelines.md"), registrations, frontmatterFixture());
  const dangling = result.findings.filter(finding => finding.message.startsWith("registration-dangling:"));
  assert.ok(dangling.some(finding => finding.message.includes("docs/DICTIONARY-SEMANTIC.md") && finding.message.includes("SEMANTIC-TABLE.md")));
  assert.ok(dangling.some(finding => finding.message.includes("docs/README.md") && finding.message.includes("docs/documents/git-guidelines.md")));
});

test("non-canonical paths fail closed while unrelated duplicate rows preserve parity", () => {
  const valid = registrationFixture({ duplicateUnrelated: true });
  assert.deepEqual(checkRegistrations(documentFixture(), valid, frontmatterFixture()).findings, []);

  const escaped = registrationFixture({ extraDocsPath: "../escape.md" });
  const result = checkRegistrations(documentFixture(), escaped, frontmatterFixture());
  assert.ok(result.findings.some(finding => finding.message.includes("docs/README.md references unsafe root-relative document path ../escape.md")));
});

test("root registration references never resolve from a same-path dictionary repository collision", t => {
  const sandbox = mkdtempSync(path.join(tmpdir(), "git-guidelines-registration-"));
  t.after(() => rmSync(sandbox, { recursive: true, force: true }));
  const repositoryRoot = path.join(sandbox, "delivered-repository");
  const registrationRoot = path.join(sandbox, "dictionary-repository");
  const collisionPath = "docs/documents/git-guidelines.md";
  mkdirSync(repositoryRoot, { recursive: true });
  mkdirSync(path.dirname(path.join(registrationRoot, collisionPath)), { recursive: true });
  writeFileSync(path.join(registrationRoot, collisionPath), "wrong repository\n");
  const registrations = {
    "docs/README.md": `Load ${collisionPath}.\n`,
    "docs/DICTIONARY-COMMAND.md": "",
    "docs/DICTIONARY-SEMANTIC.md": "",
    "docs/DICTIONARY-BINDING.md": "",
  };
  const options = {
    repositoryRoot,
    registrationRoot,
    workspaceRoot: sandbox,
    statuses: new Map(),
  };

  const missing = resolveRegistrationInventory({ stat: file => statSync(file) }, registrations, options)[0];
  assert.equal(missing.base, "root");
  assert.equal(missing.resolvedPath, path.join(repositoryRoot, collisionPath));
  assert.equal(missing.exists, false);

  mkdirSync(path.dirname(path.join(repositoryRoot, collisionPath)), { recursive: true });
  writeFileSync(path.join(repositoryRoot, collisionPath), "delivered repository\n");
  const present = resolveRegistrationInventory({ stat: file => statSync(file) }, registrations, {
    ...options,
    statuses: new Map(),
  })[0];
  assert.equal(present.resolvedPath, path.join(repositoryRoot, collisionPath));
  assert.equal(present.exists, true);
});

function dictionaries(tokens) {
  const rows = tokens.map(token => `| \`${token}\` | ${token} summary | b | f | done |`).join("\n");
  return {
    "docs/DICTIONARY-COMMAND.md": `## Commands\n\n| Token | Intent | B | F | Done |\n|---|---|---|---|---|\n${rows}\n`,
    "docs/DICTIONARY-SEMANTIC.md": "## Tags\n\n| Token | Meaning |\n|---|---|\n",
    "docs/DICTIONARY-BINDING.md": "## Bindings\n\n| Token | Meaning |\n|---|---|\n",
  };
}

function registrationFixture({ duplicateUnrelated = false, extraDocsPath = "DOCS-INDEX-ONLY.md" } = {}) {
  const docsIndex = `[Workspace README](../README.md) and [local agents](./AGENTS.md).

## Document Map

| File | Role | Use |
|---|---|---|
| \`docs/documents/git-guidelines.md\` | Git-layer companion to the execution set | any git stage: session start through cleanup |
| \`${extraDocsPath}\` | Extra source | focused verification |
`;
  let registrations = {
    "docs/README.md": docsIndex,
    "docs/DICTIONARY-COMMAND.md": commandDictionary("0".repeat(64), 0, duplicateUnrelated),
    "docs/DICTIONARY-SEMANTIC.md": sourceDictionary("Semantic", "Tags", "#git-collaboration", "#other", "SEMANTIC-META.md", "SEMANTIC-TABLE.md"),
    "docs/DICTIONARY-BINDING.md": sourceDictionary("Binding", "Bindings", "@git-guidelines", "@other", "BINDING-META.md", "BINDING-TABLE.md"),
  };
  const catalog = computeCatalogDigest(registrations);
  registrations["docs/DICTIONARY-COMMAND.md"] = commandDictionary(catalog.digest, catalog.count, duplicateUnrelated);
  const references = collectRegistrationPathReferences(registrations);
  registrations.pathInventory = Object.freeze(references.map(({ artifact, path, base }) => Object.freeze({
    artifact,
    path,
    base,
    resolvedPath: `/resolved/${path}`,
    exists: true,
  })));
  return registrations;
}

function commandDictionary(digest, count, duplicateUnrelated) {
  const duplicateRow = duplicateUnrelated
    ? "| `/other` | COMMAND-TABLE.md | `@other` | `#other` | Complete. |\n"
    : "";
  return `---
catalog_digest: "${digest}"
catalog_entry_count: ${count}
source_docs:
  - "docs/documents/git-guidelines.md"
  - "COMMAND-META.md"
runtime_proof: "COMMAND-PROOF.md"
dictionary_entries:
  - "/git.guidelines"
  - "/other"
---

## Commands

| Token | Intent | Required bindings | Semantic filters | Completion signal |
|---|---|---|---|---|
| \`/git.guidelines\` | Load git rules. | @git-guidelines | #git-collaboration | One conformant report. |
| \`/other\` | COMMAND-TABLE.md | \`@other\` | \`#other\` | Complete. |
${duplicateRow}`;
}

function sourceDictionary(title, heading, token, otherToken, metadataPath, tablePath) {
  return `---
title: "${title} Dictionary"
source_docs:
  - "docs/documents/git-guidelines.md"
  - "${metadataPath}"
dictionary_entries:
  - "${token}"
  - "${otherToken}"
---

## ${heading}

| Token | Meaning | Source |
|---|---|---|
| \`${token}\` | Registered source. | \`docs/documents/git-guidelines.md\` |
| \`${otherToken}\` | Other source. | \`${tablePath}\` |
`;
}

function documentFixture(sourcePath = "/resolved/checked-document.md") {
  return Object.freeze({ sourcePath, text: "# Git Guidelines\n" });
}

function frontmatterFixture() {
  return Object.freeze({ data: Object.freeze({
    invocation_token: "/git.guidelines",
    semantic_filters: Object.freeze(["#git-collaboration"]),
    bindings: Object.freeze(["@git-guidelines"]),
  }) });
}

function reference(artifact, path, base = "root") { return Object.freeze({ artifact, path, base }); }
