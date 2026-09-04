import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import yaml from "js-yaml";
import { readFrontmatter } from "./git-guidelines/fm-reader.mjs";
import { isBoundedString, isCalendarDate, isReadinessRung } from "./git-guidelines/frontmatter.mjs";

const DEFAULT_ROOT = fileURLToPath(new URL("../../", import.meta.url));
const MAX_BYTES = 500_000;
const REQUIRED_CONTEXT = "adlc-policy-contract";
const MODULES = Object.freeze({
  source: "adlc-guidelines.md",
  productionReleaseLifecycle: "adlc-production-release-lifecycle.md",
  conformanceRuntime: "adlc-conformance-runtime.md",
  integrationOrder: "adlc-integration-order.md",
  specificationChain: "adlc-specification-chain.md",
  artifactContinuity: "adlc-artifact-continuity.md",
  upstreamAdmission: "adlc-upstream-dependency-admission.md",
  cloudCollaboration: "adlc-cloud-collaboration.md",
  scopedLaneAdmission: "adlc-scoped-lane-admission.md",
  repositoryRuntimeReadiness: "adlc-repository-runtime-readiness.md",
  antiPatternGuards: "adlc-anti-pattern-guards.md",
  autonomousContinuation: "adlc-autonomous-continuation.md",
  rapidMvpSprint: "adlc-rapid-mvp-sprint.md",
  proportionateCloseout: "adlc-proportionate-closeout.md",
});
const VERSION = /^(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9]\d*|\d*[A-Za-z-][0-9A-Za-z-]*))*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;
const METADATA_KEYS = new Set([
  "title", "doc_type", "version", "date", "lang", "frontmatter_contract", "owner", "local_rung", "delivered_rung",
  "lane", "universal_scope", "provider_neutral", "runtime_readiness_policy", "upstream_blocking_policy", "lifecycle_status",
  "schema", "collaboration_schema", "status", "authority", "mutation_policy", "parent", "parent_version",
]);
const logicalLines = source => source === "" ? 0 : source.split("\n").length - Number(source.endsWith("\n"));

export function readAdlcFiles(root = DEFAULT_ROOT) {
  const inventory = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
    { cwd: root, encoding: "utf8", timeout: 10_000, maxBuffer: MAX_BYTES });
  const files = new Map();
  for (const relative of new Set(inventory.split("\0").filter(Boolean))) {
    if (!/\.(?:md|mjs|js|json|html|ya?ml)$/.test(relative)) continue;
    const file = join(root, relative);
    // A staged rename may still expose its deleted source through the index.
    if (existsSync(file)) files.set(relative, readFileSync(file, "utf8"));
  }
  return files;
}

function required(files, path) {
  assert.ok(files.has(path), `${path} must exist`);
  return files.get(path);
}

export function checkGuidelineFrontmatter(source, name) {
  let data;
  try { data = readFrontmatter(source).data; }
  catch (error) { throw new Error(`${name}: ${error.message}`, { cause: error }); }
  for (const key of Object.keys(data)) assert.ok(METADATA_KEYS.has(key), `${name}: undeclared frontmatter key ${key}`);
  assert.ok(isBoundedString(data.title, 120), `${name}: title must be a non-empty bounded string`);
  assert.ok(["Guidelines", "Guideline Module", "Guidelines Module", "Guidelines Companion"].includes(data.doc_type), `${name}: doc_type must name a guideline role`);
  assert.ok(typeof data.version === "string" && VERSION.test(data.version), `${name} must declare a semantic version`);
  assert.ok(isCalendarDate(data.date), `${name}: date must be a valid YYYY-MM-DD string`);
  assert.ok(typeof data.lang === "string" && /^(?:[A-Za-z]{2,5}|[A-Za-z]{2}-[A-Za-z]{2})$/.test(data.lang), `${name}: lang must be a language tag`);
  assert.equal(data.frontmatter_contract, "required", `${name}: frontmatter_contract must be required`);
  assert.ok(isBoundedString(data.owner, 80) && !/[;,|]/.test(data.owner), `${name}: owner must name one accountable function`);
  for (const key of ["local_rung", "delivered_rung"]) {
    assert.ok(isReadinessRung(data[key]), `${name}: ${key} must be a declared readiness rung`);
  }
  // This check verifies specification inputs; it has no deployment or runtime evidence authority.
  assert.ok(["undocumented", "spec-complete"].includes(data.local_rung), `${name}: unsupported local runtime readiness claim`);
  assert.equal(data.delivered_rung, "undocumented", `${name}: unsupported delivered readiness claim`);
  assert.ok(["authoring", "promotion"].includes(data.lane), `${name}: lane must name its declared lifecycle boundary`);
  assert.equal(data.universal_scope, true, `${name}: universal_scope must be a YAML boolean true`);
  if (Object.hasOwn(data, "provider_neutral")) assert.equal(data.provider_neutral, true, `${name}: provider_neutral must be a YAML boolean true`);
  assert.equal(data.runtime_readiness_policy, "fail-closed", `${name}: runtime_readiness_policy must be fail-closed`);
  assert.equal(data.lifecycle_status, "proposed", `${name}: unsupported lifecycle status without delivery evidence`);
  if (Object.hasOwn(data, "status")) assert.equal(data.status, data.local_rung, `${name}: status must agree with local_rung`);
  if (Object.hasOwn(data, "upstream_blocking_policy")) assert.equal(data.upstream_blocking_policy, "prevent-not-bypass");
  for (const key of ["schema", "collaboration_schema", "authority", "mutation_policy", "parent"]) {
    if (Object.hasOwn(data, key)) assert.ok(isBoundedString(data[key], 200), `${name}: ${key} must be a bounded scalar`);
  }
  return data;
}

export function checkAdlcMigration(files) {
  const canonical = new Set(Object.values(MODULES));
  const metadataByName = new Map();
  const reachable = new Set();
  const pending = [MODULES.source];
  for (const name of canonical) {
    const source = required(files, `guidelines/${name}`);
    const metadata = checkGuidelineFrontmatter(source, name);
    metadataByName.set(name, metadata);
    assert.match(metadata.title, /\bADLC\b/, `${name} must use the canonical ADLC title`);
    assert.ok(logicalLines(source) < 600, `${name} must remain below 600 lines`);
    assert.ok(Buffer.byteLength(source) < MAX_BYTES, `${name} must remain below ${MAX_BYTES} bytes`);
  }
  const companionPaths = [...files.keys()].filter(path => /^guidelines\/prd-tad-adr-.+\.md$/.test(path));
  for (const path of new Set(["guidelines/cid-guidelines.md", "guidelines/prd-tad-adr-guidelines.md", ...companionPaths])) {
    metadataByName.set(path.slice("guidelines/".length), checkGuidelineFrontmatter(required(files, path), path));
  }
  const metadataByTitle = new Map([...metadataByName.values()].map(data => [data.title, data]));
  for (const [name, data] of metadataByName) {
    if (!Object.hasOwn(data, "parent")) {
      assert.ok(!Object.hasOwn(data, "parent_version"), `${name}: parent_version requires a parent`);
      continue;
    }
    const parent = metadataByTitle.get(data.parent);
    assert.ok(parent, `${name}: declared parent must resolve to its owning document`);
    assert.equal(data.parent_version, parent.version, `${name}: parent_version must match the current owning document`);
  }
  while (pending.length) {
    const name = pending.pop();
    if (reachable.has(name)) continue;
    reachable.add(name);
    const source = required(files, `guidelines/${name}`);
    for (const [, target] of source.matchAll(/\]\((?:\.\/)?(adlc-[a-z0-9-]+\.md)(?:#[^)]*)?\)/g)) {
      assert.ok(canonical.has(target), `${name} links an unknown ADLC module ${target}`);
      pending.push(target);
    }
  }
  assert.deepEqual([...reachable].sort(), [...canonical].sort(), "every canonical ADLC module must be reachable from the entrypoint");

  for (const [path, source] of files) {
    assert.doesNotMatch(path, /(?:^|\/)agentic-sdlc-[^/]*\.md$/, "legacy guideline files must be removed");
    assert.doesNotMatch(source, /\b(?:guidelines\/|\.\/)agentic-sdlc-[a-z0-9-]+\.md\b/, `${path} contains a legacy guideline path`);
    if (path === "scripts/check-adlc-guideline.mjs" || /^scripts\/lib\/adlc-.*\.mjs$/.test(path)) {
      assert.ok(logicalLines(source) < 600, `${path} must remain below 600 lines`);
      assert.ok(Buffer.byteLength(source) < MAX_BYTES, `${path} must remain below ${MAX_BYTES} bytes`);
    }
  }
  assert.ok(!files.has("scripts/check-agentic-sdlc-guideline.mjs"), "legacy checker must be removed");
  const pkg = JSON.parse(required(files, "package.json"));
  assert.equal(pkg.scripts["adlc:policy:check"], "node scripts/check-adlc-guideline.mjs");
  assert.ok(!Object.hasOwn(pkg.scripts, "agentic-sdlc:policy:check"), "legacy package command must be removed");
  assert.doesNotMatch(JSON.stringify(pkg.scripts), /agentic-sdlc:policy:check/);

  // The native identity must agree across the profile and both validation workflows.
  const profile = JSON.parse(required(files, ".agentic-os.json"));
  assert.deepEqual(profile.requiredChecks, [REQUIRED_CONTEXT], "require only the native CI context");
  for (const path of [".github/workflows/guideline-contract.yml", ".github/workflows/protected-head-refresh-ci.yml"]) {
    const workflow = yaml.load(required(files, path));
    assert.equal(Object.values(workflow.jobs).filter(job => job.name === REQUIRED_CONTEXT).length, 1,
      `${path} must emit the native CI context exactly once`);
    assert.ok(Object.values(workflow.jobs).every(job => !/^agentic-sdlc-/.test(job.name ?? "")),
      `${path} must not emit legacy CI contexts`);
  }
  return Object.freeze({
    frontmatterCount: metadataByName.size,
    localRungs: [...new Set([...metadataByName.values()].map(data => data.local_rung))],
    deliveredRungs: [...new Set([...metadataByName.values()].map(data => data.delivered_rung))],
  });
}

export function loadAdlcSources(files) {
  const sources = Object.fromEntries(Object.entries(MODULES)
    .map(([key, name]) => [key, required(files, `guidelines/${name}`)]));
  sources.authoringGuideline = required(files, "guidelines/prd-tad-adr-guidelines.md");
  checkGuidelineFrontmatter(sources.authoringGuideline, "authoring guideline");
  for (const [key, value] of Object.entries(sources)) sources[`${key}Lines`] = value.split("\n");
  sources.guidelineLogicalLineCount = logicalLines(sources.source);
  for (const key of ["scopedLaneAdmission", "cloudCollaboration", "productionReleaseLifecycle"]) {
    sources[`normalized${key[0].toUpperCase()}${key.slice(1)}`] = sources[key].replace(/\s+/g, " ");
  }
  return sources;
}

export function assertOrderedPhrases(text, phrases, label) {
  let priorIndex = -1;
  for (const phrase of phrases) {
    const currentIndex = text.indexOf(phrase);
    assert.ok(currentIndex > priorIndex, `${label} must order ${phrase} after its predecessor`);
    priorIndex = currentIndex;
  }
}

export function contractSlice(text, start, end, label) {
  const startIndex = text.indexOf(start);
  const endIndex = text.indexOf(end);
  assert.ok(startIndex >= 0 && endIndex > startIndex, `${label} boundaries must be present`);
  return text.slice(startIndex, endIndex);
}
