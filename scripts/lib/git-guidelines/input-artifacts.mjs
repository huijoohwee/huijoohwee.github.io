import { createHash } from "node:crypto";
import path from "node:path";
import { TextDecoder } from "node:util";

import { validateArtifact } from "./artifact-schema.mjs";
import { INPUT_BOUNDS } from "./input-constants.mjs";
import { git } from "./input-runtime.mjs";
import { byteCompare, isRecord, readRequired, recordProblem } from "./input-resolver-utils.mjs";
import {
  PROTECTED_REVIEW_VERIFICATION_MODE,
  validateProtectedReviewAuthority,
} from "./review-authority.mjs";

const REPOSITORY_ARTIFACT_ROOTS = Object.freeze([
  ".coordination", ".agentic-manifests", ".recovery", ".backups",
]);
const WORKSPACE_REFERENCE_ARTIFACTS = Object.freeze([
  "dev-source-resolver-cloud-request.json", "dev-source-resolver-write-scope.json",
]);
const LIVE_AUTHORITY_STATES = new Set(["active", "reviewed", "review-ready", "parked"]);
const DEPENDENCY_CLASSES = new Set([
  "control-contract", "implementation", "consumer", "generated-projection", "mirror",
]);

export function resolveArtifactInputs({
  runtime,
  repo,
  workspaceRoot,
  explicitWorkspace,
  protectedBaseRevision,
  acceptedFenceRevision,
  head,
  branch,
  evaluationTime,
  problems,
  statuses,
}) {
  const repositoryArtifactFiles = listArtifactFiles(
    runtime,
    REPOSITORY_ARTIFACT_ROOTS.map(relative => path.join(repo, relative)),
    problems,
    statuses,
    true,
  );
  const workspaceArtifactFiles = listArtifactFiles(
    runtime,
    [path.join(workspaceRoot, ".coordination")],
    problems,
    statuses,
    false,
  );
  const repositoryArtifacts = repositoryArtifactFiles.filter(isCheckerArtifact).map(file => readArtifact(runtime, {
    file, root: repo, required: true, problems, statuses,
  })).filter(Boolean);
  const workspaceArtifacts = workspaceArtifactFiles.filter(isJsonArtifact).map(file => readArtifact(runtime, {
    file, root: workspaceRoot, required: false, problems, statuses,
  })).filter(Boolean);
  const retainedArtifacts = repositoryArtifactFiles.filter(file => !isCheckerArtifact(file)).map(file => readRetainedArtifact(runtime, {
    file, root: repo, problems, statuses,
  })).filter(Boolean);
  const workspaceReferenceArtifacts = selectWorkspaceReferenceArtifacts(workspaceArtifacts);
  const currentScope = branch?.split("/").at(-1) || null;
  const currentWorkspaceArtifacts = selectCurrentWorkspaceArtifacts(workspaceArtifacts, currentScope);

  enforceRequiredWorkspaceReferences({
    workspaceRoot, workspaceReferenceArtifacts, problems, statuses,
  });
  if (explicitWorkspace || currentWorkspaceArtifacts.length > 0) {
    enforceCurrentWorkspacePair({
      currentScope, workspaceRoot, workspaceArtifacts, currentWorkspaceArtifacts,
      protectedBaseRevision, acceptedFenceRevision, head, branch, repo, runtime, problems, statuses,
    });
  }
  validateRepositoryArtifactFreshness({
    artifacts: repositoryArtifacts, protectedBaseRevision, acceptedFenceRevision, head, repo, runtime, problems, statuses,
  });

  const checkerWorkspaceArtifacts = currentWorkspaceArtifacts.filter(artifact => Boolean(artifact.value?.schema));
  const artifacts = deduplicateArtifacts([
    ...repositoryArtifacts,
    ...workspaceReferenceArtifacts,
    ...checkerWorkspaceArtifacts,
  ]);
  const changedPaths = resolveChangedPaths(runtime, repo, protectedBaseRevision, head);
  const runtimeContext = buildRuntimeContext({
    currentScope,
    currentWorkspaceArtifacts,
    repositoryArtifacts,
    workspaceArtifacts,
    acceptedFenceRevision,
    changedPaths,
    evaluationTime,
  });

  return Object.freeze({
    artifacts,
    retainedArtifacts,
    workspaceArtifacts,
    workspaceReferenceArtifacts,
    runtimeContext,
  });
}

function readArtifact(runtime, { file, root, required, problems, statuses }) {
  const inputId = `artifact:${path.relative(root, file).replaceAll(path.sep, "/")}`;
  const localProblems = [];
  const bytes = readRequired(runtime, {
    file,
    inputId,
    kind: "artifact",
    maximumBytes: INPUT_BOUNDS.artifactBytes,
    problems: required ? problems : localProblems,
    statuses: required ? statuses : new Map(),
    binary: true,
  });
  const relativePath = path.relative(root, file).replaceAll(path.sep, "/");
  if (bytes === null) {
    return Object.freeze({
      path: file,
      relativePath,
      bytes: null,
      value: null,
      condition: localProblems[0]?.condition || "unreadable",
      validationProblems: Object.freeze(localProblems.map(problem => problem.message)),
    });
  }
  let text;
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch (error) {
    if (required) recordProblem(problems, statuses, {
      code: "input-unparseable", condition: "unparseable", inputId, kind: "artifact", path: file,
      message: `UTF-8 decode failed: ${error.message}`,
    });
    return Object.freeze({ path: file, relativePath, bytes: null, value: null, condition: "unparseable", validationProblems: Object.freeze([error.message]) });
  }
  if (path.basename(file) === ".complete") {
    return Object.freeze({ path: file, relativePath, bytes: text, value: null, condition: "ok", validationProblems: Object.freeze([]) });
  }
  let value;
  try {
    value = JSON.parse(text);
  } catch (error) {
    if (required) recordProblem(problems, statuses, {
      code: "input-unparseable", condition: "unparseable", inputId, kind: "artifact", path: file,
      message: `JSON parse failed: ${error.message}`,
    });
    return Object.freeze({ path: file, relativePath, bytes: text, value: null, condition: "unparseable", validationProblems: Object.freeze([error.message]) });
  }
  const validationProblems = path.basename(file).endsWith("-cloud-authority.json")
    ? validateAuthorityWrapper(value)
    : validateArtifactSafely(value, relativePath);
  if (required && validationProblems.length > 0) {
    recordProblem(problems, statuses, {
      code: "input-unparseable", condition: "unparseable", inputId, kind: "artifact", path: file,
      message: validationProblems.join(" "),
    });
  }
  return Object.freeze({
    path: file,
    relativePath,
    bytes: text,
    value,
    condition: validationProblems.length > 0 ? "unparseable" : "ok",
    validationProblems: Object.freeze(validationProblems),
  });
}

function readRetainedArtifact(runtime, { file, root, problems, statuses }) {
  const relativePath = path.relative(root, file).replaceAll(path.sep, "/");
  const bytes = readRequired(runtime, {
    file,
    inputId: `retained:${relativePath}`,
    kind: "retained-artifact",
    maximumBytes: INPUT_BOUNDS.retainedBytes,
    problems,
    statuses,
    binary: true,
  });
  if (bytes === null) return null;
  return Object.freeze({
    path: file,
    relativePath,
    byteLength: bytes.byteLength,
    digest: createHash("sha256").update(bytes).digest("hex"),
    condition: "ok",
  });
}

function enforceCurrentWorkspacePair({
  currentScope, workspaceRoot, workspaceArtifacts, currentWorkspaceArtifacts,
  protectedBaseRevision, acceptedFenceRevision, head, branch, repo, runtime, problems, statuses,
}) {
  if (!currentScope) return;
  const expectedNames = [`${currentScope}-write-scope.json`, `${currentScope}-cloud-authority.json`];
  for (const expectedName of expectedNames) {
    const artifact = workspaceArtifacts.find(candidate => path.basename(candidate.path) === expectedName);
    const inputId = `artifact:.coordination/${expectedName}`;
    if (!artifact) {
      recordProblem(problems, statuses, {
        code: "input-absent", condition: "absent", inputId, kind: "workspace-coordination",
        path: path.join(workspaceRoot, ".coordination", expectedName),
        message: `Required current-lane coordination input is absent: ${expectedName}.`,
      });
      continue;
    }
    promoteWorkspaceArtifactProblem(artifact, inputId, problems, statuses);
  }
  if (currentWorkspaceArtifacts.length < 2 || currentWorkspaceArtifacts.some(artifact => artifact.value === null)) return;
  const scopeArtifact = currentWorkspaceArtifacts.find(artifact => path.basename(artifact.path).endsWith("-write-scope.json"));
  const authorityArtifact = currentWorkspaceArtifacts.find(artifact => path.basename(artifact.path).endsWith("-cloud-authority.json"));
  if (!scopeArtifact || !authorityArtifact) return;
  const scopeProblems = validateArtifactSafely(scopeArtifact.value, scopeArtifact.relativePath);
  if (scopeProblems.length > 0) {
    recordProblem(problems, statuses, {
      code: "input-unparseable", condition: "unparseable", inputId: `artifact:${scopeArtifact.relativePath}`,
      kind: "workspace-coordination", path: scopeArtifact.path, message: scopeProblems.join(" "),
    });
    return;
  }
  const authorityProblems = validateAuthorityWrapper(authorityArtifact.value);
  if (authorityProblems.length > 0) {
    recordProblem(problems, statuses, {
      code: "input-unparseable", condition: "unparseable", inputId: `artifact:${authorityArtifact.relativePath}`,
      kind: "workspace-coordination", path: authorityArtifact.path, message: authorityProblems.join(" "),
    });
    return;
  }
  const result = authorityArtifact.value.result;
  const claim = result.claim;
  const expectedScope = [
    ...scopeArtifact.value.paths.map(relative => `path:${relative}`),
    `semantic:${scopeArtifact.value.semanticScope}`,
  ].sort(byteCompare);
  const recordedScope = [...claim.declaredWriteScope].sort(byteCompare);
  const staleReasons = [];
  if (claim.canonicalBaseRevision !== protectedBaseRevision) staleReasons.push(`canonical base ${claim.canonicalBaseRevision} differs from protected base ${protectedBaseRevision}`);
  if (result.claimDigest !== claim.fenceRevision) staleReasons.push("claim fence differs from the accepted claim digest");
  if (acceptedFenceRevision && claim.fenceRevision !== acceptedFenceRevision) staleReasons.push(`claim fence ${claim.fenceRevision} differs from accepted fence ${acceptedFenceRevision}`);
  if (Date.parse(claim.expiresAt) <= runtime.now()) staleReasons.push(`claim authority expired at ${claim.expiresAt}`);
  if (JSON.stringify(recordedScope) !== JSON.stringify(expectedScope)) staleReasons.push("claim write scope differs from the current declared write scope");
  if (result.action === "verify") {
    if (result.subject?.branch !== branch) staleReasons.push("verified branch differs from the branch under check");
    if (result.subject?.canonicalBaseSha !== protectedBaseRevision) staleReasons.push("verified subject base differs from the protected base");
    if (result.subject?.headSha !== head || claim.laneRevision !== head) staleReasons.push("verified subject head differs from the revision under check");
    if (authorityArtifact.value.scopeId !== currentScope) staleReasons.push("verified scope differs from the current branch scope");
  } else if (!gitRevisionIsAncestor(runtime, repo, claim.laneRevision, head)) {
    staleReasons.push("claim lane revision is not an ancestor of the revision under check");
  }
  if (staleReasons.length > 0) {
    recordProblem(problems, statuses, {
      code: "input-stale", condition: "stale", inputId: `artifact:${authorityArtifact.relativePath}`,
      kind: "workspace-coordination", path: authorityArtifact.path, message: staleReasons.join("; "),
    });
  }
}

function validateRepositoryArtifactFreshness({ artifacts, protectedBaseRevision, acceptedFenceRevision, head, repo, runtime, problems, statuses }) {
  for (const artifact of artifacts) {
    if (!artifact.value || artifact.validationProblems.length > 0) continue;
    const value = artifact.value;
    const staleReasons = [];
    if (value.schema === "agentic-change-manifest/v1" && value.baseSha !== protectedBaseRevision) {
      staleReasons.push(`recorded base ${value.baseSha} differs from protected base ${protectedBaseRevision}`);
    }
    const result = value.schema === "agentic-cloud-collaboration-result/v1" ? value : value.result;
    const claim = result?.claim || null;
    if (claim && result.claimDigest !== claim.fenceRevision) staleReasons.push("claim fence differs from the accepted claim digest");
    if (claim && acceptedFenceRevision && claim.fenceRevision !== acceptedFenceRevision) staleReasons.push("claim fence differs from the accepted fence");
    if (claim && !gitRevisionIsAncestor(runtime, repo, claim.laneRevision, head)) staleReasons.push("claim lane revision is not an ancestor of the revision under check");
    if (staleReasons.length === 0) continue;
    recordProblem(problems, statuses, {
      code: "input-stale", condition: "stale", inputId: `artifact:${artifact.relativePath}`,
      kind: "artifact", path: artifact.path, message: staleReasons.join("; "),
    });
  }
}

function buildRuntimeContext({
  currentScope, currentWorkspaceArtifacts, repositoryArtifacts, workspaceArtifacts,
  acceptedFenceRevision, changedPaths, evaluationTime,
}) {
  const currentCandidates = [
    ...currentWorkspaceArtifacts,
    ...repositoryArtifacts.filter(artifact => semanticScopeFromArtifact(artifact) === currentScope),
  ].filter(artifact => artifact.condition === "ok");
  const currentAuthority = currentCandidates.map(artifact => authorityFromArtifact(artifact, acceptedFenceRevision)).find(Boolean) || null;
  const repositoryAuthorities = repositoryArtifacts.filter(artifact => artifact.condition === "ok")
    .map(artifact => authorityFromArtifact(artifact)).filter(Boolean)
    .map(authority => Object.freeze({ ...authority, repositoryLocal: true }));
  const workspaceAuthorities = workspaceArtifacts.filter(artifact => artifact.condition === "ok")
    .map(artifact => authorityFromArtifact(artifact)).filter(Boolean);
  const peerAuthorities = [...repositoryAuthorities, ...workspaceAuthorities]
    .filter(authority => !sameAuthority(authority, currentAuthority))
    .filter(authority => sameRepository(authority, currentAuthority))
    .filter(authority => LIVE_AUTHORITY_STATES.has(authority.state) && Date.parse(authority.expiresAt) > evaluationTime)
    .filter(authority => authority.state !== "reviewed" || authority.scopeReserved === true)
    .sort((left, right) => byteCompare(left.authorityId, right.authorityId));
  const integrationRequests = collectIntegrationRequests([...repositoryArtifacts, ...workspaceArtifacts]);
  const selectedIntegrationRequest = selectCurrentIntegrationRequest(integrationRequests, currentAuthority);
  return Object.freeze({
    currentAuthority,
    peerAuthorities: Object.freeze(peerAuthorities),
    changedPaths: Object.freeze(changedPaths),
    publicationAuthorities: Object.freeze(peerAuthorities),
    integrationRequests: Object.freeze(integrationRequests),
    selectedIntegrationRequest,
    evaluationTime,
  });
}

function authorityFromArtifact(artifact, acceptedFenceRevision) {
  const root = artifact?.value;
  const result = root?.schema === "agentic-cloud-collaboration-result/v1" ? root : root?.result;
  const claim = result?.claim;
  if (!isRecord(claim) || !Array.isArray(claim.declaredWriteScope)) return null;
  const protectedReview = root?.verificationMode === PROTECTED_REVIEW_VERIFICATION_MODE
    && result.action === "verify";
  const scopeId = claim.declaredWriteScope.find(entry => String(entry).startsWith("semantic:"))?.slice("semantic:".length) || null;
  return Object.freeze({
    authorityId: String(claim.claimId || artifact.relativePath),
    artifactPath: artifact.relativePath,
    targetRepository: root?.targetRepository || null,
    claimId: claim.claimId || null,
    scopeId,
    declaredWriteScope: Object.freeze([...claim.declaredWriteScope]),
    leaseEpoch: claim.leaseEpoch,
    state: claim.state,
    authorityPhase: protectedReview ? PROTECTED_REVIEW_VERIFICATION_MODE : "authoring",
    writeAuthority: claim.writeAuthority,
    scopeReserved: claim.scopeReserved,
    expiresAt: claim.expiresAt,
    fenceRevision: claim.fenceRevision,
    acceptedFenceRevision: acceptedFenceRevision || result.claimDigest,
    verificationReceiptDigest: protectedReview ? result.receipt?.receiptDigest || null : null,
  });
}

function collectIntegrationRequests(artifacts) {
  const requests = new Map();
  for (const artifact of artifacts) {
    if (artifact.condition !== "ok") continue;
    for (const candidate of [artifact.value, artifact.value?.integrationRequest]) {
      if (!isRecord(candidate) || !DEPENDENCY_CLASSES.has(candidate.dependencyClass)
        || !Number.isSafeInteger(candidate.leaseEpoch) || candidate.leaseEpoch < 0
        || !/^[a-z0-9-]{3,64}$/u.test(String(candidate.scopeId || ""))) continue;
      const request = Object.freeze({
        requestId: String(candidate.requestId || artifact.relativePath),
        dependencyClass: candidate.dependencyClass,
        leaseEpoch: candidate.leaseEpoch,
        scopeId: candidate.scopeId,
      });
      requests.set(request.requestId, request);
    }
  }
  return [...requests.values()].sort((left, right) => byteCompare(left.requestId, right.requestId));
}

function selectCurrentIntegrationRequest(requests, currentAuthority) {
  if (!currentAuthority) return null;
  return requests.find(request => (
    request.scopeId === currentAuthority.scopeId
      && request.leaseEpoch === currentAuthority.leaseEpoch
  )) || null;
}

function resolveChangedPaths(runtime, repo, protectedBaseRevision, head) {
  const outputs = [
    git(runtime, repo, ["diff", "--name-only", "--no-renames", "-z", protectedBaseRevision, head, "--"]),
    git(runtime, repo, ["diff", "--name-only", "--no-renames", "-z", "--"]),
    git(runtime, repo, ["diff", "--cached", "--name-only", "--no-renames", "-z", "--"]),
    git(runtime, repo, ["ls-files", "--others", "--exclude-standard", "-z"]),
  ];
  return [...new Set(outputs.flatMap(parseNullList))].sort(byteCompare);
}

function validateAuthorityWrapper(value) {
  if (value?.result?.action === "verify") {
    return validateProtectedReviewAuthority(value);
  }
  const problems = [];
  if (!isRecord(value) || !isRecord(value.result)) return ["Authority wrapper must contain a result object."];
  const { result } = value;
  if (result.schema !== "agentic-cloud-collaboration-result/v1") problems.push("Authority result schema is missing or unknown.");
  if (result.ok !== true || !["claim", "continue"].includes(result.action)) problems.push("Authority result is not an accepted claim or continuation.");
  if (!isRecord(result.claim)) return [...problems, "Authority result claim is absent."];
  for (const field of ["canonicalBaseRevision", "laneRevision"]) {
    if (!/^[0-9a-f]{40}$/u.test(String(result.claim[field] || ""))) problems.push(`claim.${field} must be a 40-character Git revision.`);
  }
  if (!/^[0-9a-f]{64}$/u.test(String(result.claimDigest || ""))) problems.push("claimDigest must be a lowercase SHA-256 digest.");
  if (!/^[0-9a-f]{64}$/u.test(String(result.claim.fenceRevision || ""))) problems.push("claim.fenceRevision must be a lowercase SHA-256 digest.");
  const expiryMilliseconds = Date.parse(result.claim.expiresAt);
  if (!Number.isFinite(expiryMilliseconds) || new Date(expiryMilliseconds).toISOString() !== result.claim.expiresAt) problems.push("claim.expiresAt must be a canonical UTC instant.");
  if (!Array.isArray(result.claim.declaredWriteScope) || result.claim.declaredWriteScope.length === 0) problems.push("claim.declaredWriteScope must be a non-empty array.");
  if (Object.hasOwn(value, "integrationRequest")) {
    problems.push(...validateIntegrationRequest(value.integrationRequest));
  }
  return problems;
}

function validateIntegrationRequest(value) {
  if (!isRecord(value)) return ["integrationRequest must be an object."];
  const problems = [];
  if (typeof value.requestId !== "string" || !value.requestId.trim()) problems.push("integrationRequest.requestId must be non-empty.");
  if (!DEPENDENCY_CLASSES.has(value.dependencyClass)) problems.push("integrationRequest.dependencyClass is invalid.");
  if (!Number.isSafeInteger(value.leaseEpoch) || value.leaseEpoch < 0) problems.push("integrationRequest.leaseEpoch must be non-negative.");
  if (!/^[a-z0-9-]{3,64}$/u.test(String(value.scopeId || ""))) problems.push("integrationRequest.scopeId is invalid.");
  return problems;
}

function validateArtifactSafely(value, relativePath) {
  try { return validateArtifact(value, relativePath); }
  catch (error) { return [`Schema validator failed closed: ${error.message}`]; }
}

function promoteWorkspaceArtifactProblem(artifact, inputId, problems, statuses) {
  if (artifact.condition === "ok") {
    statuses.set(inputId, "ok");
    return;
  }
  recordProblem(problems, statuses, {
    code: `input-${artifact.condition}`, condition: artifact.condition, inputId,
    kind: "workspace-coordination", path: artifact.path,
    message: artifact.validationProblems.join(" ") || `Artifact is ${artifact.condition}.`,
  });
}

function enforceRequiredWorkspaceReferences({
  workspaceRoot, workspaceReferenceArtifacts, problems, statuses,
}) {
  for (const expectedName of WORKSPACE_REFERENCE_ARTIFACTS) {
    const inputId = `artifact:.coordination/${expectedName}`;
    const artifact = workspaceReferenceArtifacts.find(candidate => path.basename(candidate.path) === expectedName);
    if (!artifact) {
      recordProblem(problems, statuses, {
        code: "input-absent",
        condition: "absent",
        inputId,
        kind: "workspace-reference",
        path: path.join(workspaceRoot, ".coordination", expectedName),
        message: `Required Task 19 workspace reference is absent: ${expectedName}.`,
      });
      continue;
    }
    promoteWorkspaceArtifactProblem(artifact, inputId, problems, statuses);
  }
}

function selectWorkspaceReferenceArtifacts(artifacts) {
  return artifacts.filter(artifact => (
    WORKSPACE_REFERENCE_ARTIFACTS.includes(path.basename(artifact.path))
  )).sort(compareArtifactPaths);
}

function selectCurrentWorkspaceArtifacts(artifacts, currentScope) {
  if (!currentScope) return [];
  const names = new Set([`${currentScope}-write-scope.json`, `${currentScope}-cloud-authority.json`]);
  return artifacts.filter(artifact => names.has(path.basename(artifact.path))).sort(compareArtifactPaths);
}

function deduplicateArtifacts(artifacts) {
  const byPath = new Map();
  for (const artifact of artifacts) byPath.set(path.resolve(artifact.path), artifact);
  return [...byPath.values()].sort(compareArtifactPaths);
}

function listArtifactFiles(runtime, roots, problems, statuses, requiredRoots) {
  const files = new Set();
  for (const root of [...new Set(roots.map(value => path.resolve(value)))].sort(byteCompare)) {
    try {
      for (const file of walk(runtime, root)) files.add(path.resolve(file));
    } catch (error) {
      if (error?.code === "ENOENT") continue;
      if (requiredRoots) recordProblem(problems, statuses, {
        code: "input-unreadable", condition: "unreadable", inputId: `artifact-root:${root}`,
        kind: "artifact-root", path: root, message: error.message,
      });
    }
  }
  return [...files].sort(byteCompare);
}

function walk(runtime, root) {
  return runtime.readDirectory(root, { withFileTypes: true }).flatMap(entry => {
    const target = path.join(root, entry.name);
    return entry.isDirectory() ? walk(runtime, target) : entry.isFile() ? [target] : [];
  }).sort(byteCompare);
}

function gitRevisionIsAncestor(runtime, repo, ancestor, descendant) {
  if (!/^[0-9a-f]{40}$/u.test(String(ancestor || "")) || !/^[0-9a-f]{40}$/u.test(String(descendant || ""))) return false;
  return runtime.git(repo, ["merge-base", "--is-ancestor", ancestor, descendant], true).status === 0;
}

function semanticScopeFromArtifact(artifact) {
  const authority = authorityFromArtifact(artifact);
  return authority?.scopeId || null;
}

function sameAuthority(left, right) {
  if (left === null || right === null) return false;
  if (left.claimId && right.claimId && left.claimId === right.claimId) return true;
  return left.scopeId === right.scopeId && left.fenceRevision === right.fenceRevision;
}

function sameRepository(authority, currentAuthority) {
  if (currentAuthority === null) return false;
  if (authority.repositoryLocal) return true;
  return Boolean(authority.targetRepository && currentAuthority.targetRepository
    && authority.targetRepository === currentAuthority.targetRepository);
}

function parseNullList(value) {
  return String(value || "").split("\0").filter(Boolean);
}

function compareArtifactPaths(left, right) { return byteCompare(left.path, right.path); }
function isJsonArtifact(file) { return path.extname(file).toLowerCase() === ".json"; }
function isCheckerArtifact(file) { return isJsonArtifact(file) || path.basename(file) === ".complete"; }
