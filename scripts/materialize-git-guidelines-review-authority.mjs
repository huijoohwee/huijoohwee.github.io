#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  projectProtectedReviewAuthority,
  validateProtectedReviewContinuity,
} from "./lib/git-guidelines/review-authority.mjs";

const MAXIMUM_INPUT_BYTES = 1024 * 1024;
const FILESYSTEM = Object.freeze({
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
});

export function publishProtectedReviewProjection(projection, outputDirectory, overrides = {}) {
  const filesystem = { ...FILESYSTEM, ...overrides };
  filesystem.mkdirSync(outputDirectory, { recursive: true, mode: 0o700 });
  const finalDirectory = path.join(outputDirectory, projection.semanticScope);
  const legacyPaths = [projection.writeScopeFileName, projection.authorityFileName]
    .map(file => path.join(outputDirectory, file));
  if (filesystem.existsSync(finalDirectory) || legacyPaths.some(file => filesystem.existsSync(file))) {
    throw new Error("Current pull-request authority projection already exists; refusing to overwrite it.");
  }

  const stagingPrefix = path.join(
    path.dirname(outputDirectory),
    `.${path.basename(outputDirectory)}-${projection.semanticScope}-`,
  );
  const stagingDirectory = filesystem.mkdtempSync(stagingPrefix, { encoding: "utf8" });
  try {
    writeJsonExclusive(filesystem, path.join(stagingDirectory, projection.writeScopeFileName), projection.writeScope);
    writeJsonExclusive(filesystem, path.join(stagingDirectory, projection.authorityFileName), projection.authority);
    filesystem.renameSync(stagingDirectory, finalDirectory);
  } catch (error) {
    filesystem.rmSync(stagingDirectory, { recursive: true, force: true });
    throw error;
  }
  return projectionPaths(projection, finalDirectory);
}

export function revalidateProtectedReviewProjection(projection, outputDirectory, overrides = {}) {
  const filesystem = { ...FILESYSTEM, ...overrides };
  const finalDirectory = path.join(outputDirectory, projection.semanticScope);
  const paths = projectionPaths(projection, finalDirectory);
  const retainedScope = readJsonObject(filesystem, paths.writeScopePath, "retained write scope");
  const retainedAuthority = readJsonObject(filesystem, paths.authorityPath, "retained review authority");
  if (canonicalJson(retainedScope) !== canonicalJson(projection.writeScope)) {
    throw new Error("Terminal write scope differs from the initially materialized review scope.");
  }
  const continuityProblems = validateProtectedReviewContinuity(retainedAuthority, projection.authority, {
    evaluationTime: Date.now(),
  });
  if (continuityProblems.length > 0) {
    throw new Error(continuityProblems.join(" "));
  }
  return paths;
}

if (isMainModule()) {
  try {
    const eventPath = requiredPath("event-path");
    const verificationPath = requiredPath("verification-path");
    const outputDirectory = requiredPath("output-directory");
    const projection = projectProtectedReviewAuthority({
      event: readJsonObject(FILESYSTEM, eventPath, "pull-request event"),
      verification: readJsonObject(FILESYSTEM, verificationPath, "cloud verification"),
      ledgerRepository: option("ledger-repository") || "huijoohwee/agentic-canvas-os",
    });
    const revalidation = process.argv.includes("--assert-existing");
    const paths = revalidation
      ? revalidateProtectedReviewProjection(projection, outputDirectory)
      : publishProtectedReviewProjection(projection, outputDirectory);
    process.stdout.write(`${JSON.stringify({
      schema: "git-guidelines-review-authority-materialization/v1",
      status: revalidation ? "revalidated" : "materialized",
      semanticScope: projection.semanticScope,
      ...paths,
    })}\n`);
  } catch (error) {
    process.stderr.write(`Review authority materialization failed: ${publicMessage(error)}\n`);
    process.exitCode = 1;
  }
}

function readJsonObject(filesystem, file, label) {
  let bytes;
  try {
    bytes = filesystem.readFileSync(file);
  } catch (error) {
    throw new Error(`${label} is unreadable: ${publicMessage(error)}`);
  }
  if (bytes.byteLength > MAXIMUM_INPUT_BYTES) {
    throw new Error(`${label} exceeds the ${MAXIMUM_INPUT_BYTES}-byte bound.`);
  }
  let value;
  try {
    value = JSON.parse(bytes.toString("utf8"));
  } catch (error) {
    throw new Error(`${label} is not valid JSON: ${publicMessage(error)}`);
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be a JSON object.`);
  }
  return value;
}

function writeJsonExclusive(filesystem, file, value) {
  filesystem.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`, {
    encoding: "utf8",
    flag: "wx",
    mode: 0o600,
  });
}

function projectionPaths(projection, directory) {
  return Object.freeze({
    writeScopePath: path.join(directory, projection.writeScopeFileName),
    authorityPath: path.join(directory, projection.authorityFileName),
  });
}

function requiredPath(name) {
  const value = option(name);
  if (!value) throw new Error(`--${name}=<path> is required.`);
  return path.resolve(value);
}

function option(name) {
  const prefix = `--${name}=`;
  const inline = process.argv.slice(2).find(value => value.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : "";
}

function canonicalJson(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map(key => (
    `${JSON.stringify(key)}:${canonicalJson(value[key])}`
  )).join(",")}}`;
}

function isMainModule() {
  return Boolean(process.argv[1]) && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
}

function publicMessage(error) {
  return String(error?.message || error || "unknown failure").replaceAll(/\s+/gu, " ").trim();
}
