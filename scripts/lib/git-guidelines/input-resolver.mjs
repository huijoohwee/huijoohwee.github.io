import path from "node:path";

import { validateCommitAttribution } from "./commit-attribution.mjs";
import { resolveArtifactInputs } from "./input-artifacts.mjs";
import { INPUT_BOUNDS, REMOTE_BLOCKED_CHECKS } from "./input-constants.mjs";
import { resolveRegistrationInventory } from "./input-registration.mjs";
import { createInputRuntime, git } from "./input-runtime.mjs";
import { byteCompare, deepFreeze, digestText, readRequired, recordProblem } from "./input-resolver-utils.mjs";
import { PROTECTED_REVIEW_VERIFICATION_MODE } from "./review-authority.mjs";

const OWNER_PATHS = Object.freeze([
  "guidelines/adlc-guidelines.md", "guidelines/prd-tad-adr-guidelines.md",
  "guidelines/prd-tad-adr-verification.md",
  "guidelines/adlc-cloud-collaboration.md", "guidelines/adlc-scoped-lane-admission.md",
  "guidelines/commit-push-deploy-guidelines.md",
]);
const REGISTRATION_PATHS = Object.freeze([
  "docs/README.md", "docs/DICTIONARY-COMMAND.md", "docs/DICTIONARY-SEMANTIC.md", "docs/DICTIONARY-BINDING.md",
]);
const OID_PATTERN = /^[0-9a-f]{40}(?:[0-9a-f]{24})?$/u;
const MAX_REFRESH_HOPS = 16;

export { INPUT_BOUNDS } from "./input-constants.mjs";

export function resolveInputs({
  repositoryRoot = process.cwd(), documentPath, acosRoot, workspaceRoot, expectedBaseRevision,
  expectedProtectedRevision, acceptedFenceRevision, probeRemote = true, runtime: runtimeOverrides,
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
  const refreshChain = resolveRefreshChainFacts(runtime, repo, head, expectedProtectedRevision, branch);
  const refreshAuthority = resolveRefreshAuthority(artifactInputs.workspaceArtifacts, branch);
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

  const gitFacts = Object.freeze({
    head, protectedBaseRevision, branch, commitMessage, refreshChain, refreshAuthority, status, worktrees, remote,
  });
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

function resolveRefreshChainFacts(runtime, repo, head, expectedProtectedRevision, branch) {
  const expected = resolveExactCommit(runtime, repo, expectedProtectedRevision);
  const nodes = [];
  let truncated = false;
  let objectFailure = false;
  let currentRevision = head;
  let newerProtectedParent = null;
  if (expected !== null) {
    for (let depth = 0; depth <= MAX_REFRESH_HOPS; depth += 1) {
      const revision = resolveExactCommit(runtime, repo, currentRevision);
      const tree = revision === null ? null : resolveCommitTree(runtime, repo, revision);
      if (revision === null || tree === null) {
        objectFailure = true;
        break;
      }
      const message = git(runtime, repo, ["show", "-s", "--format=%B", revision], true);
      const parents = oidList(git(runtime, repo, ["show", "-s", "--format=%P", revision], true));
      const attributed = validateCommitAttribution(message, { branch }).length === 0;
      const terminalNode = Object.freeze({
        revision, tree, message, parents: Object.freeze(parents), mergeBases: Object.freeze([]),
        mergeBaseTree: null, protectedTree: null, expectedMergeTree: null,
        protectedLineageBases: Object.freeze([]),
      });
      if (attributed) {
        nodes.push(terminalNode);
        break;
      }
      if (depth === MAX_REFRESH_HOPS) {
        nodes.push(terminalNode);
        truncated = true;
        break;
      }
      if (parents.length !== 2 || parents.some(parent => !OID_PATTERN.test(parent))) {
        nodes.push(terminalNode);
        break;
      }

      const [firstParent, protectedParent] = parents;
      const mergeBases = oidList(git(runtime, repo, ["merge-base", "--all", firstParent, protectedParent], true));
      const mergeBaseTree = mergeBases.length === 1 ? resolveCommitTree(runtime, repo, mergeBases[0]) : null;
      const protectedTree = resolveCommitTree(runtime, repo, protectedParent);
      const expectedMergeTree = resolveMergeTree(runtime, repo, firstParent, protectedParent);
      const protectedLineageBases = newerProtectedParent === null
        ? []
        : oidList(git(runtime, repo, ["merge-base", "--all", protectedParent, newerProtectedParent], true));
      nodes.push(Object.freeze({
        revision, tree, message, parents: Object.freeze(parents), mergeBases: Object.freeze(mergeBases),
        mergeBaseTree, protectedTree, expectedMergeTree,
        protectedLineageBases: Object.freeze(protectedLineageBases),
      }));
      if (mergeBaseTree === null || protectedTree === null) objectFailure = true;
      currentRevision = firstParent;
      newerProtectedParent = protectedParent;
    }
  }
  return Object.freeze({
    expectedProtectedRevision: expected,
    maximumHops: MAX_REFRESH_HOPS,
    truncated,
    objectFailure,
    nodes: Object.freeze(nodes),
  });
}

function resolveExactCommit(runtime, repo, revision) {
  if (!OID_PATTERN.test(String(revision || ""))) return null;
  const resolved = git(runtime, repo, ["rev-parse", "--verify", `${revision}^{commit}`], true).trim();
  return resolved === revision ? resolved : null;
}

function resolveCommitTree(runtime, repo, revision) {
  if (!OID_PATTERN.test(String(revision || ""))) return null;
  const tree = git(runtime, repo, ["rev-parse", "--verify", `${revision}^{tree}`], true).trim();
  return OID_PATTERN.test(tree) ? tree : null;
}

function resolveMergeTree(runtime, repo, firstParent, protectedParent) {
  const output = git(runtime, repo, [
    "-c", "merge.conflictStyle=merge", "merge-tree", "--write-tree", "--no-messages",
    firstParent, protectedParent,
  ], true).trim().split("\n").filter(Boolean);
  return output.length === 1 && OID_PATTERN.test(output[0]) ? output[0] : null;
}

function oidList(output) {
  return String(output || "").trim().split(/\s+/u).filter(Boolean);
}

function resolveRefreshAuthority(workspaceArtifacts, branch) {
  const scopeId = typeof branch === "string" && branch.startsWith("agent/")
    ? branch.split("/").slice(2).join("/")
    : null;
  if (!scopeId) return null;
  const authorities = workspaceArtifacts.filter(artifact => (
    path.basename(artifact.path) === `${scopeId}-cloud-authority.json`
      && artifact.condition === "ok"
      && artifact.validationProblems.length === 0
  ));
  if (authorities.length !== 1) return null;
  const wrapper = authorities[0].value;
  const result = wrapper?.result;
  const claim = result?.claim;
  if (wrapper?.verificationMode !== PROTECTED_REVIEW_VERIFICATION_MODE || result?.action !== "verify") return null;
  if (wrapper.scopeId !== scopeId || result?.subject?.branch !== branch) return null;
  if (result.subject.headSha !== claim?.laneRevision) return null;
  const semanticScopes = Array.isArray(claim?.declaredWriteScope)
    ? claim.declaredWriteScope.filter(entry => typeof entry === "string" && entry.startsWith("semantic:"))
    : [];
  if (!OID_PATTERN.test(String(claim?.laneRevision || ""))) return null;
  if (!Number.isSafeInteger(claim?.leaseEpoch) || claim.leaseEpoch < 1) return null;
  if (semanticScopes.length !== 1 || semanticScopes[0] !== `semantic:${scopeId}`) return null;
  return Object.freeze({ laneRevision: claim.laneRevision, leaseEpoch: claim.leaseEpoch, scopeId });
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
