import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";

import { canonicalJson, createReleaseCarrier, sha256 } from "../lib/git-guidelines/pages-release-controller.mjs";
import { runPagesDevPreview } from "../lib/git-guidelines/pages-dev-preview.mjs";

function artifact() {
  const root = mkdtempSync(join(tmpdir(), "pages-dev-preview-"));
  mkdirSync(join(root, "release"));
  mkdirSync(join(root, "guidelines"));
  const files = new Map([
    ["guidelines/adlc.md", Buffer.from("# Closeout\n")],
    ["guidelines/nested/source.md", Buffer.from("nested source\n")],
    ["index.html", Buffer.from("<!doctype html><title>Dev</title>\n")],
  ]);
  const manifest = Buffer.from([...files].sort(([a], [b]) => Buffer.compare(Buffer.from(a), Buffer.from(b)))
    .map(([path, bytes]) => `${sha256(bytes)}  ./${path}`).join("\n") + "\n");
  const payloadManifestDigest = sha256(manifest), candidateSha = "a".repeat(40), policyDigest = "b".repeat(64);
  const artifactId = `agentic-guideline-pages-release:${candidateSha}:${payloadManifestDigest}`;
  const carrier = createReleaseCarrier({ repository: "huijoohwee/huijoohwee.github.io", candidateSha,
    artifactId, payloadManifestDigest, policyDigest });
  writeFileSync(join(root, "release/files.sha256"), manifest);
  writeFileSync(join(root, "release/release.json"), `${canonicalJson(carrier)}\n`);
  for (const [path, bytes] of files) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), bytes);
  }
  return { root, files, input: { repository: "huijoohwee/huijoohwee.github.io", runId: "123",
    candidateSha, artifactId, effectId: carrier.effectId, providerArtifactId: "456",
    payloadManifestDigest, policyDigest } };
}

test("Development reads back each file from the exact sealed artifact", async () => {
  const fixture = artifact();
  try {
    const result = await runPagesDevPreview({ root: fixture.root, ...fixture.input });
    assert.equal(result.receipt.status, "verified");
    assert.equal(result.receipt.environment, "development");
    assert.equal(result.receipt.target, "runner-loopback");
    assert.equal(result.receipt.providerArtifactId, "456");
    assert.equal(result.receipt.verifiedFileCount, fixture.files.size);
    assert.match(result.receiptDigest, /^[a-f0-9]{64}$/u);
    await assert.rejects(fetch(`http://127.0.0.1:${result.port}/`));
  } finally { rmSync(fixture.root, { recursive: true, force: true }); }
});

test("Development rejects artifact bytes that differ from the sealed manifest", async () => {
  const fixture = artifact();
  try {
    writeFileSync(join(fixture.root, "index.html"), "tampered\n");
    await assert.rejects(runPagesDevPreview({ root: fixture.root, ...fixture.input }), /payload-digest/u);
  } finally { rmSync(fixture.root, { recursive: true, force: true }); }
});
