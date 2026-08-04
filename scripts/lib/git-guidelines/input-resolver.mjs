import path from "node:path";

import { resolveArtifactInputs } from "./input-artifacts.mjs";
import { INPUT_BOUNDS, REMOTE_BLOCKED_CHECKS } from "./input-constants.mjs";
import { resolveRegistrationInventory } from "./input-registration.mjs";
import { createInputRuntime, git } from "./input-runtime.mjs";
import { byteCompare, deepFreeze, digestText, readRequired, recordProblem } from "./input-resolver-utils.mjs";

const OWNER_PATHS = Object.freeze([
  "guidelines/agentic-sdlc-guidelines.md", "guidelines/prd-tad-adr-guidelines.md",
  "guidelines/agentic-sdlc-cloud-collaboration.md", "guidelines/agentic-sdlc-scoped-lane-admission.md",
  "guidelines/commit-push-deploy-guidelines.md",
]);
const REGISTRATION_PATHS = Object.freeze([
  "docs/README.md", "docs/DICTIONARY-COMMAND.md", "docs/DICTIONARY-SEMANTIC.md", "docs/DICTIONARY-BINDING.md",
]);

export { INPUT_BOUNDS } from "./input-constants.mjs";

export function resolveInputs({
  repositoryRoot = process.cwd(), documentPath, acosRoot, workspaceRoot, expectedBaseRevision,
  acceptedFenceRevision, probeRemote = true, runtime: runtimeOverrides,
} = {}) {
  const runtime = createInputRuntime(runtimeOverrides, INPUT_BOUNDS.verdictMilliseconds);
  const startedAt = runtime.now();
  const repo = git(runtime, repositoryRoot, ["rev-parse", "--show-toplevel"]).trim();
  const commonDir = path.resolve(repo, git(runtime, repo, ["rev-parse", "--git-common-dir"]).trim());
  const canonicalRepository = path.dirname(commonDir);
  const explicitWorkspace = workspaceRoot !== undefined && workspaceRoot !== null;
  const resolvedWorkspaceRoot = explicitWorkspace
    ? path.resolve(workspaceRoot)
    : discoverWorkspaceRoot(runtime, repo, path.dirname(canonicalRepository));
  const resolvedAcos = path.resolve(
    acosRoot || process.env.AGENTIC_CANVAS_OS_ROOT || path.join(resolvedWorkspaceRoot, "agentic-canvas-os"),
  );
  const resolvedDocument = path.resolve(documentPath || path.join(repo, "docs/documents/git-guidelines.md"));
  const problems = [];
  const statuses = new Map();

  const document = readRequired(runtime, { file: resolvedDocument, inputId: "document", kind: "document",
    maximumBytes: INPUT_BOUNDS.sourceBytes, problems, statuses });
  const owners = Object.fromEntries(OWNER_PATHS.map(relative => [
    relative,
    readRequired(runtime, { file: path.join(repo, relative), inputId: `owner:${relative}`, kind: "owner",
      maximumBytes: INPUT_BOUNDS.sourceBytes, problems, statuses }),
  ]));
  const registrationSources = Object.fromEntries(REGISTRATION_PATHS.map(relative => [
    relative,
    readRequired(runtime, { file: path.join(resolvedAcos, relative), inputId: `registration:${relative}`,
      kind: "registration", maximumBytes: INPUT_BOUNDS.sourceBytes, problems, statuses }),
  ]));
  const registrations = {
    ...registrationSources,
    pathInventory: resolveRegistrationInventory(runtime, registrationSources, {
      repositoryRoot: repo,
      registrationRoot: resolvedAcos,
      workspaceRoot: resolvedWorkspaceRoot,
      statuses,
    }),
  };

  const head = git(runtime, repo, ["rev-parse", "HEAD"]).trim();
  const branch = git(runtime, repo, ["symbolic-ref", "--quiet", "--short", "HEAD"], true).trim() || null;
  const protectedBaseRevision = expectedBaseRevision || resolveProtectedBase(runtime, repo, head);
  const artifactInputs = resolveArtifactInputs({
    runtime,
    repo,
    workspaceRoot: resolvedWorkspaceRoot,
    explicitWorkspace,
    protectedBaseRevision,
    acceptedFenceRevision,
    head,
    branch,
    evaluationTime: startedAt,
    problems,
    statuses,
  });
  const remote = probeRemote
    ? probeConfiguredRemote(runtime, repo)
    : Object.freeze({ state: "not-probed", durationMs: 0, blockedChecks: Object.freeze([]) });
  const commitMessage = git(runtime, repo, ["log", "-1", "--format=%B"]);
  const status = git(runtime, repo, ["status", "--porcelain=v1", "--untracked-files=all"]);
  const worktrees = git(runtime, repo, ["worktree", "list", "--porcelain"]);
  const repositoryState = Object.freeze({
    head: digestText(head),
    index: digestText(git(runtime, repo, ["ls-files", "--stage", "-z"])),
    working: digestText(git(runtime, repo, ["diff", "--binary", "--no-ext-diff"])),
    untracked: digestText(git(runtime, repo, ["ls-files", "--others", "--exclude-standard", "-z"])),
  });
  const elapsedMilliseconds = runtime.now() - startedAt;
  const boundExceeded = elapsedMilliseconds > INPUT_BOUNDS.verdictMilliseconds;
  if (boundExceeded) {
    recordProblem(problems, statuses, {
      code: "input-unreadable",
      condition: "unreadable",
      inputId: "checker-input-set",
      kind: "input-set",
      path: repo,
      message: `Input set was not readable within ${INPUT_BOUNDS.verdictMilliseconds} ms.`,
    });
  }

  const gitFacts = Object.freeze({ head, protectedBaseRevision, branch, commitMessage, status, worktrees, remote });
  const inputStatus = Object.freeze(Object.fromEntries(
    [...statuses.entries()].sort(([left], [right]) => byteCompare(left, right)),
  ));

  return deepFreeze({
    repo,
    canonicalRepository,
    workspaceRoot: resolvedWorkspaceRoot,
    workspaceRootExplicit: explicitWorkspace,
    acosRoot: resolvedAcos,
    documentPath: resolvedDocument,
    document,
    owners,
    registrations,
    ...artifactInputs,
    gitFacts,
    repositoryState,
    inputStatus,
    problems,
    limits: { ...INPUT_BOUNDS, elapsedMilliseconds, boundExceeded },
  });
}

function probeConfiguredRemote(runtime, repo) {
  const remote = git(runtime, repo, ["remote", "get-url", "origin"], true).trim();
  if (!remote) {
    return Object.freeze({
      state: "offline",
      remote: null,
      durationMs: 0,
      timedOut: false,
      probeBoundMilliseconds: INPUT_BOUNDS.remoteProbeMilliseconds,
      requiredRemoteBoundMilliseconds: INPUT_BOUNDS.requiredRemoteMilliseconds,
      blockedChecks: REMOTE_BLOCKED_CHECKS,
    });
  }
  const start = runtime.now();
  const result = runtime.probeRemote(repo, INPUT_BOUNDS.remoteProbeMilliseconds);
  const durationMs = Math.max(0, runtime.now() - start);
  const timedOut = result?.error?.code === "ETIMEDOUT" || durationMs > INPUT_BOUNDS.remoteProbeMilliseconds;
  return Object.freeze({
    state: result?.status === 0 && !timedOut ? "online" : "offline",
    remote,
    durationMs,
    timedOut,
    probeBoundMilliseconds: INPUT_BOUNDS.remoteProbeMilliseconds,
    requiredRemoteBoundMilliseconds: INPUT_BOUNDS.requiredRemoteMilliseconds,
    blockedChecks: result?.status === 0 && !timedOut ? Object.freeze([]) : REMOTE_BLOCKED_CHECKS,
  });
}

function resolveProtectedBase(runtime, repo, head) {
  const originHead = git(runtime, repo, ["symbolic-ref", "--quiet", "refs/remotes/origin/HEAD"], true).trim();
  const candidates = [originHead, "refs/remotes/origin/main", "refs/remotes/origin/master"].filter(Boolean);
  for (const candidate of candidates) {
    const base = git(runtime, repo, ["merge-base", head, candidate], true).trim();
    if (/^[0-9a-f]{40}$/u.test(base)) return base;
  }
  return head;
}

function discoverWorkspaceRoot(runtime, repo, fallback) {
  let candidate = path.resolve(repo);
  let coordinationFallback = null;
  while (true) {
    try {
      if (runtime.stat(path.join(candidate, ".coordination")).isDirectory()) {
        coordinationFallback ||= candidate;
        if (runtime.stat(path.join(candidate, "agentic-canvas-os")).isDirectory()) return candidate;
      }
    } catch {
      // An absent ancestor marker is expected while walking toward the filesystem root.
    }
    const parent = path.dirname(candidate);
    if (parent === candidate) return path.resolve(coordinationFallback || fallback);
    candidate = parent;
  }
}
