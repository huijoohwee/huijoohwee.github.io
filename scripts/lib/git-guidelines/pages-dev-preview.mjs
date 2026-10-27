#!/usr/bin/env node
import { createServer } from "node:http";
import { createHash } from "node:crypto";
import { appendFileSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import { basename, extname, join, relative, resolve, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { canonicalJson, createReleaseCarrier, sha256 } from "./pages-release-controller.mjs";

const MAX_FILES = 512;
const MAX_TOTAL_BYTES = 16 * 1024 * 1024;
const fail = (code, detail = "") => { throw new Error(`blocked-pages-dev-preview:${code}${detail ? `:${detail}` : ""}`); };
const hash = bytes => createHash("sha256").update(bytes).digest("hex");
const safeRelative = value => typeof value === "string" && value.length > 0 && !value.startsWith("/")
  && !value.includes("\\") && !/[\u0000-\u001f\u007f%?#]/u.test(value)
  && value.split("/").every(part => part && part !== "." && part !== ".." && !part.startsWith("."));
const byteOrder = (left, right) => Buffer.compare(Buffer.from(left), Buffer.from(right));

function payloadFiles(root) {
  const files = [];
  let totalBytes = 0;
  function visit(directory) {
    for (const name of readdirSync(directory).sort(byteOrder)) {
      if (name.startsWith(".") || /[\\%?#\u0000-\u001f\u007f]/u.test(name)) fail("unsafe-path", name);
      const absolute = join(directory, name), stat = lstatSync(absolute);
      const path = relative(root, absolute).split(sep).join("/");
      if (stat.isSymbolicLink()) fail("symlink", path);
      if (stat.isDirectory()) {
        if (path === "release") continue;
        if (path !== "guidelines" && !path.startsWith("guidelines/")) fail("unexpected-directory", path);
        visit(absolute);
      } else if (stat.isFile()) {
        if (path.startsWith("release/")) continue;
        if (path !== "index.html" && !path.startsWith("guidelines/")) fail("unexpected-file", path);
        const bytes = readFileSync(absolute);
        totalBytes += bytes.length;
        if (bytes.length >= 500_000 || totalBytes > MAX_TOTAL_BYTES) fail("payload-size", path);
        files.push({ path, absolute, bytes, digest: hash(bytes) });
        if (files.length > MAX_FILES) fail("file-count");
      } else fail("non-regular-entry", path);
    }
  }
  visit(root);
  files.sort((left, right) => byteOrder(left.path, right.path));
  return { files, totalBytes };
}

function verifyArtifact(root, input) {
  const manifestPath = join(root, "release", "files.sha256");
  const carrierPath = join(root, "release", "release.json");
  const releaseEntries = readdirSync(join(root, "release")).sort();
  if (JSON.stringify(releaseEntries) !== JSON.stringify(["files.sha256", "release.json"])) fail("release-boundary");
  for (const path of [manifestPath, carrierPath]) if (!lstatSync(path).isFile()) fail("release-file", basename(path));
  const manifestBytes = readFileSync(manifestPath), manifestText = manifestBytes.toString("utf8");
  if (!Buffer.from(manifestText, "utf8").equals(manifestBytes) || !manifestText.endsWith("\n") || manifestText.includes("\r")) fail("manifest-encoding");
  const payloadManifestDigest = sha256(manifestBytes);
  if (payloadManifestDigest !== input.payloadManifestDigest) fail("manifest-digest");
  const rows = manifestText.slice(0, -1).split("\n").map(line => {
    const match = /^([a-f0-9]{64})  \.\/(.+)$/u.exec(line);
    if (!match || !safeRelative(match[2])) fail("manifest-row");
    return { digest: match[1], path: match[2] };
  });
  if (!rows.length || rows.length > MAX_FILES || !rows.some(row => row.path === "index.html")
    || rows.some(row => row.path !== "index.html" && !row.path.startsWith("guidelines/"))) fail("manifest-scope");
  if (JSON.stringify(rows.map(row => row.path)) !== JSON.stringify([...new Set(rows.map(row => row.path))].sort(byteOrder))) fail("manifest-order");
  const actual = payloadFiles(root);
  if (JSON.stringify(actual.files.map(row => row.path)) !== JSON.stringify(rows.map(row => row.path))) fail("payload-set");
  for (let index = 0; index < rows.length; index += 1) {
    if (actual.files[index].digest !== rows[index].digest) fail("payload-digest", rows[index].path);
  }
  const artifactId = `agentic-guideline-pages-release:${input.candidateSha}:${payloadManifestDigest}`;
  if (input.artifactId !== artifactId) fail("artifact-identity");
  const carrier = createReleaseCarrier({ repository: input.repository, candidateSha: input.candidateSha,
    artifactId, payloadManifestDigest, policyDigest: input.policyDigest });
  const carrierBytes = readFileSync(carrierPath);
  if (!Buffer.from(`${canonicalJson(carrier)}\n`, "utf8").equals(carrierBytes)
    || carrier.effectId !== input.effectId) fail("release-carrier");
  return { files: actual.files, totalBytes: actual.totalBytes, carrier, payloadManifestDigest };
}

function listen(server) {
  return new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => resolveListen(server.address().port));
  });
}
export async function runPagesDevPreview({ root, ...input }) {
  if (typeof root !== "string" || !root || !/^[a-f0-9]{40}$/u.test(input.candidateSha ?? "")
    || !/^[a-f0-9]{64}$/u.test(input.payloadManifestDigest ?? "")
    || !/^[a-f0-9]{64}$/u.test(input.policyDigest ?? "")
    || !/^[1-9][0-9]*$/u.test(input.providerArtifactId ?? "")
    || !/^[1-9][0-9]*$/u.test(input.runId ?? "")) fail("input");
  const directory = resolve(root), rootStat = lstatSync(directory);
  if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) fail("root");
  const releaseDirectory = lstatSync(join(directory, "release"));
  if (!releaseDirectory.isDirectory() || releaseDirectory.isSymbolicLink()) fail("release-boundary");
  const verified = verifyArtifact(directory, input), byPath = new Map(verified.files.map(row => [row.path, row]));
  const server = createServer((request, response) => {
    if (request.method !== "GET") { response.writeHead(405).end(); return; }
    let path;
    try { path = decodeURIComponent(new URL(request.url ?? "/", "http://127.0.0.1").pathname).replace(/^\/+/, "") || "index.html"; }
    catch { response.writeHead(400).end(); return; }
    const file = byPath.get(path);
    if (!file) { response.writeHead(404).end(); return; }
    const type = extname(path) === ".html" ? "text/html; charset=utf-8" : "text/markdown; charset=utf-8";
    response.writeHead(200, { "Content-Type": type, "Content-Length": file.bytes.length, "X-Content-Type-Options": "nosniff" });
    response.end(file.bytes);
  });
  let port;
  try {
    port = await listen(server);
    const origin = `http://127.0.0.1:${port}`;
    const observations = [];
    for (const file of verified.files) {
      const route = `/${file.path.split("/").map(encodeURIComponent).join("/")}`;
      const response = await fetch(`${origin}${route}`, { signal: AbortSignal.timeout(5000) });
      const bytes = Buffer.from(await response.arrayBuffer());
      if (response.status !== 200 || !bytes.equals(file.bytes) || hash(bytes) !== file.digest) fail("readback", file.path);
      observations.push({ path: file.path, status: response.status, byteLength: bytes.length, digest: hash(bytes) });
    }
    const rootResponse = await fetch(`${origin}/`, { signal: AbortSignal.timeout(5000) });
    const rootBytes = Buffer.from(await rootResponse.arrayBuffer()), index = byPath.get("index.html");
    if (rootResponse.status !== 200 || !rootBytes.equals(index.bytes)) fail("root-route");
    const receipt = { schema: "agentic-guideline-pages-dev-readback/v1", status: "verified",
      repository: input.repository, environment: "development", target: "runner-loopback",
      workflowRunId: input.runId, sourceRevision: input.candidateSha, artifactId: input.artifactId,
      providerArtifactId: input.providerArtifactId, effectId: input.effectId,
      payloadManifestDigest: verified.payloadManifestDigest, verifiedFileCount: observations.length,
      verifiedByteCount: verified.totalBytes, fileReadbackDigest: sha256(canonicalJson(observations)),
      rootRouteStatus: rootResponse.status, origin };
    return { receipt, receiptDigest: sha256(canonicalJson(receipt)), port };
  } finally {
    if (server.listening) await new Promise(resolveClose => server.close(resolveClose));
  }
}

export async function runCli(environment = process.env) {
  const { receipt, receiptDigest } = await runPagesDevPreview({ root: environment.DEV_ROOT,
    repository: environment.GITHUB_REPOSITORY, runId: environment.GITHUB_RUN_ID,
    candidateSha: environment.CANDIDATE_SHA, artifactId: environment.ARTIFACT_ID,
    effectId: environment.EFFECT_ID, providerArtifactId: environment.PROVIDER_ARTIFACT_ID,
    payloadManifestDigest: environment.PAYLOAD_MANIFEST_DIGEST, policyDigest: environment.POLICY_DIGEST });
  const outputs = `receipt_digest=${receiptDigest}\nsource_revision=${receipt.sourceRevision}\nartifact_id=${receipt.artifactId}\nprovider_artifact_id=${receipt.providerArtifactId}\npayload_manifest_digest=${receipt.payloadManifestDigest}\nverified_file_count=${receipt.verifiedFileCount}\n`;
  if (environment.GITHUB_OUTPUT) appendFileSync(environment.GITHUB_OUTPUT, outputs, { encoding: "utf8" });
  if (environment.GITHUB_STEP_SUMMARY) appendFileSync(environment.GITHUB_STEP_SUMMARY,
    `### Development preview verified\n\n- Source: \`${receipt.sourceRevision}\`\n- Artifact: \`${receipt.artifactId}\`\n- Provider artifact: \`${receipt.providerArtifactId}\`\n- Payload: \`${receipt.payloadManifestDigest}\`\n- Files read back: ${receipt.verifiedFileCount}\n- Bytes read back: ${receipt.verifiedByteCount}\n- Target: \`${receipt.origin}\` (loopback)\n- Dev receipt: \`${receiptDigest}\`\n`, { encoding: "utf8" });
  process.stdout.write(`${JSON.stringify({ ...receipt, receiptDigest })}\n`);
  return receiptDigest;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli().catch(error => { process.stderr.write(`${error.message}\n`); process.exitCode = 1; });
}
