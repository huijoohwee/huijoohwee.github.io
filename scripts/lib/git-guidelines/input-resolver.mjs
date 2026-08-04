import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const OWNER_PATHS = Object.freeze([
  "guidelines/agentic-sdlc-guidelines.md", "guidelines/prd-tad-adr-guidelines.md", "guidelines/agentic-sdlc-cloud-collaboration.md",
  "guidelines/agentic-sdlc-scoped-lane-admission.md", "guidelines/commit-push-deploy-guidelines.md",
]);
const REGISTRATION_PATHS = Object.freeze([
  "docs/README.md", "docs/DICTIONARY-COMMAND.md", "docs/DICTIONARY-SEMANTIC.md", "docs/DICTIONARY-BINDING.md",
]);

export function resolveInputs({ repositoryRoot = process.cwd(), documentPath, acosRoot, probeRemote = false } = {}) {
  const repo = git(repositoryRoot, ["rev-parse", "--show-toplevel"]).trim();
  const commonDir = path.resolve(repo, git(repo, ["rev-parse", "--git-common-dir"]).trim());
  const canonicalRepository = path.dirname(commonDir);
  const workspaceRoot = path.dirname(canonicalRepository);
  const resolvedAcos = path.resolve(acosRoot || process.env.AGENTIC_CANVAS_OS_ROOT || path.join(workspaceRoot, "agentic-canvas-os"));
  const resolvedDocument = path.resolve(documentPath || path.join(repo, "docs/documents/git-guidelines.md"));
  const problems = [];
  const document = readRequired(resolvedDocument, "document", problems);
  const owners = Object.fromEntries(OWNER_PATHS.map(relative => [relative, readRequired(path.join(repo, relative), "owner", problems)]));
  const registrations = Object.fromEntries(REGISTRATION_PATHS.map(relative => [relative, readRequired(path.join(resolvedAcos, relative), "registration", problems)]));
  const artifacts = readArtifactFiles(repo, problems);
  const gitFacts = Object.freeze({
    head: git(repo, ["rev-parse", "HEAD"]).trim(),
    branch: git(repo, ["symbolic-ref", "--quiet", "--short", "HEAD"], true).trim() || null,
    commitMessage: git(repo, ["log", "-1", "--format=%B"]),
    status: git(repo, ["status", "--porcelain=v1", "--untracked-files=all"]),
    worktrees: git(repo, ["worktree", "list", "--porcelain"]),
    remote: probeRemote ? probeConfiguredRemote(repo) : Object.freeze({ state: "not-probed", durationMs: 0 }),
  });
  return deepFreeze({ repo, canonicalRepository, workspaceRoot, acosRoot: resolvedAcos, documentPath: resolvedDocument, document, owners, registrations, artifacts, gitFacts, problems });
}

function readRequired(file, kind, problems) {
  try { return readFileSync(file, "utf8"); }
  catch (error) { problems.push(Object.freeze({ condition: "absent", kind, path: file, message: error.message })); return null; }
}

function readArtifactFiles(repo, problems) {
  const roots = [".coordination", ".agentic-manifests", ".recovery", ".backups"];
  const values = [];
  for (const relative of roots) {
    const root = path.join(repo, relative);
    if (!existsSync(root)) continue;
    for (const file of walk(root)) {
      try { values.push(Object.freeze({ path: file, relativePath: path.relative(repo, file), bytes: readFileSync(file) })); }
      catch (error) { problems.push(Object.freeze({ condition: "unreadable", kind: "artifact", path: file, message: error.message })); }
    }
  }
  return Object.freeze(values);
}

function walk(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap(entry => {
    const target = path.join(root, entry.name);
    return entry.isDirectory() ? walk(target) : entry.isFile() ? [target] : [];
  }).sort((left, right) => Buffer.from(left).compare(Buffer.from(right)));
}

function probeConfiguredRemote(repo) {
  const remote = git(repo, ["remote", "get-url", "origin"], true).trim();
  if (!remote) return Object.freeze({ state: "offline", remote: null, durationMs: 0 });
  const start = Date.now();
  const result = spawnSync("git", ["ls-remote", "--exit-code", "origin", "HEAD"], { cwd: repo, encoding: "utf8", timeout: 10_000, stdio: ["ignore", "pipe", "pipe"] });
  return Object.freeze({ state: result.status === 0 ? "online" : "offline", remote, durationMs: Date.now() - start, timedOut: Boolean(result.error?.code === "ETIMEDOUT") });
}

function git(cwd, argumentsList, optional = false) {
  try { return execFileSync("git", argumentsList, { cwd, encoding: "utf8", maxBuffer: 32 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] }); }
  catch (error) { if (optional) return ""; throw error; }
}
function deepFreeze(value) { if (value && typeof value === "object") for (const child of Object.values(value)) deepFreeze(child); return Object.freeze(value); }
