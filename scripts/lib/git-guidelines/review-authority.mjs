import { createHash } from "node:crypto";
import path from "node:path";

export const PROTECTED_REVIEW_VERIFICATION_MODE = "protected-review";

const DIGEST_PATTERN = /^[0-9a-f]{64}$/u;
const REPOSITORY_PATTERN = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/u;
const SCOPE_PATTERN = /^[a-z0-9-]{3,64}$/u;
const SHA_PATTERN = /^[0-9a-f]{40}$/u;
const WRAPPER_FIELDS = Object.freeze([
  "ledgerRepository",
  "reviewRequestId",
  "scopeId",
  "targetRepository",
  "verificationMode",
  "result",
]);

export function projectProtectedReviewAuthority({
  event,
  verification,
  ledgerRepository = "huijoohwee/agentic-canvas-os",
  evaluationTime = Date.now(),
} = {}) {
  const subject = eventSubject(event);
  const semanticScope = semanticScopeFromBranch(subject.branch);
  const reviewRequestId = `github-pull-request:${requiredText(
    event.pull_request.node_id,
    "event pull request node id",
  )}`;
  const authority = {
    ledgerRepository,
    targetRepository: subject.repository,
    verificationMode: PROTECTED_REVIEW_VERIFICATION_MODE,
    scopeId: semanticScope,
    reviewRequestId,
    result: verification,
  };
  const problems = validateProtectedReviewAuthority(authority, { evaluationTime });
  if (problems.length > 0) {
    throw new Error(`Protected review authority is invalid: ${problems.join(" ")}`);
  }
  const resultSubject = verification.subject;
  const eventJoinsVerification = (
    resultSubject.repository === subject.repository
    && resultSubject.pullRequestNumber === subject.pullRequestNumber
    && resultSubject.branch === subject.branch
    && resultSubject.canonicalBaseSha === subject.canonicalBaseSha
    && resultSubject.headSha === subject.headSha
    && verification.claim.reviewRequestId === reviewRequestId
  );
  if (!eventJoinsVerification) {
    throw new Error("Protected review verification does not join the exact pull-request event subject.");
  }

  const paths = verification.claim.declaredWriteScope
    .filter(entry => entry.startsWith("path:"))
    .map(entry => entry.slice("path:".length));
  const writeScope = Object.freeze({
    schema: "agentic-declared-write-scope/v1",
    semanticScope,
    paths: Object.freeze(paths),
  });
  return Object.freeze({
    semanticScope,
    writeScopeFileName: `${semanticScope}-write-scope.json`,
    authorityFileName: `${semanticScope}-cloud-authority.json`,
    writeScope,
    authority: Object.freeze(authority),
  });
}

export function validateProtectedReviewAuthority(value, {
  evaluationTime,
} = {}) {
  const problems = [];
  if (!isRecord(value)) return ["Protected review authority must be an object."];
  if (!sameFields(value, WRAPPER_FIELDS)) {
    problems.push(`Protected review authority must contain exactly: ${WRAPPER_FIELDS.join(", ")}.`);
  }
  if (!REPOSITORY_PATTERN.test(String(value.ledgerRepository || ""))) {
    problems.push("ledgerRepository must be a GitHub owner/repository name.");
  }
  if (!REPOSITORY_PATTERN.test(String(value.targetRepository || ""))) {
    problems.push("targetRepository must be a GitHub owner/repository name.");
  }
  if (value.verificationMode !== PROTECTED_REVIEW_VERIFICATION_MODE) {
    problems.push(`verificationMode must be ${PROTECTED_REVIEW_VERIFICATION_MODE}.`);
  }
  if (!SCOPE_PATTERN.test(String(value.scopeId || ""))) {
    problems.push("scopeId must be a lowercase semantic scope.");
  }
  if (!String(value.reviewRequestId || "").startsWith("github-pull-request:")) {
    problems.push("reviewRequestId must identify a GitHub pull request.");
  }

  const result = value.result;
  if (!isRecord(result)) return [...problems, "Protected review authority result is absent."];
  if (result.schema !== "agentic-cloud-collaboration-result/v1") {
    problems.push("Authority result schema is missing or unknown.");
  }
  if (result.ok !== true || result.action !== "verify" || result.status !== "ready") {
    problems.push("Authority result must be a successful ready verification.");
  }
  if (!SHA_PATTERN.test(String(result.ledgerRevision || ""))) {
    problems.push("result.ledgerRevision must be a 40-character Git revision.");
  }
  if (!DIGEST_PATTERN.test(String(result.claimDigest || ""))) {
    problems.push("result.claimDigest must be a lowercase SHA-256 digest.");
  }
  if (!Array.isArray(result.findings) || result.findings.length !== 0) {
    problems.push("Authority verification findings must be an empty array.");
  }

  const claim = result.claim;
  const subject = result.subject;
  const receipt = result.receipt;
  if (!isRecord(claim)) return [...problems, "Authority result claim is absent."];
  if (!isRecord(subject)) return [...problems, "Authority verification subject is absent."];
  if (!isRecord(receipt)) return [...problems, "Authority verification receipt is absent."];

  if (!DIGEST_PATTERN.test(String(claim.claimId || ""))) {
    problems.push("claim.claimId must be a lowercase SHA-256 digest.");
  }
  const integratedRefresh = claim.state === "integrated-preserved";
  if (!["reviewed", "integrated-preserved"].includes(claim.state)
    || claim.writeAuthority !== false || claim.scopeReserved !== true) {
    problems.push("Verified claim must be reviewed with write authority disabled and scope reservation retained.");
  }
  if (integratedRefresh && (
    !DIGEST_PATTERN.test(String(claim.integrationReceiptDigest || ""))
    || !isRecord(claim.integration)
    || claim.integration.candidateRevision !== claim.laneRevision
    || claim.integration.reviewRequestId !== claim.reviewRequestId
  )) {
    problems.push("Integrated refresh claim must retain its exact reviewed candidate and integration receipt.");
  }
  for (const field of ["canonicalBaseRevision", "laneRevision"]) {
    if (!SHA_PATTERN.test(String(claim[field] || ""))) {
      problems.push(`claim.${field} must be a 40-character Git revision.`);
    }
  }
  if (!DIGEST_PATTERN.test(String(claim.fenceRevision || ""))
    || claim.fenceRevision !== result.claimDigest) {
    problems.push("Verified claim fence must equal the accepted claim digest.");
  }
  if (!DIGEST_PATTERN.test(String(claim.operationReceiptDigest || ""))) {
    problems.push("claim.operationReceiptDigest must be a lowercase SHA-256 digest.");
  }
  if (claim.reviewRequestId !== value.reviewRequestId) {
    problems.push("Verified claim reviewRequestId differs from the projected pull request.");
  }

  const scopeProblems = validateDeclaredWriteScope(claim.declaredWriteScope, value.scopeId);
  problems.push(...scopeProblems);
  if (scopeProblems.length === 0) {
    const expectedWriteSetDigest = sha256(JSON.stringify(claim.declaredWriteScope));
    if (claim.writeSetDigest !== expectedWriteSetDigest) {
      problems.push("claim.writeSetDigest differs from the verified declared write scope.");
    }
  }

  if (subject.repository !== value.targetRepository) {
    problems.push("Verification subject repository differs from targetRepository.");
  }
  if (!Number.isSafeInteger(subject.pullRequestNumber) || subject.pullRequestNumber < 1) {
    problems.push("Verification subject pullRequestNumber must be positive.");
  }
  if (typeof subject.branch !== "string"
    || semanticScopeFromBranch(subject.branch, false) !== value.scopeId) {
    problems.push("Verification subject branch differs from scopeId.");
  }
  if (!integratedRefresh && (subject.canonicalBaseSha !== claim.canonicalBaseRevision
    || subject.headSha !== claim.laneRevision)) {
    problems.push("Verification subject base or head differs from the verified claim.");
  }
  for (const field of ["canonicalBaseSha", "headSha"]) {
    if (!SHA_PATTERN.test(String(subject[field] || ""))) {
      problems.push(`subject.${field} must be a 40-character Git revision.`);
    }
  }

  if (receipt.schema !== "agentic-cloud-collaboration-github-verification/v1"
    || receipt.ok !== true) {
    problems.push("Authority verification receipt is not successful.");
  }
  for (const field of ["ledgerDigest", "contractReceiptDigest", "receiptDigest"]) {
    if (!DIGEST_PATTERN.test(String(receipt[field] || ""))) {
      problems.push(`receipt.${field} must be a lowercase SHA-256 digest.`);
    }
  }
  if (receipt.ledgerRevision !== result.ledgerRevision
    || receipt.claimId !== claim.claimId
    || receipt.claimDigest !== result.claimDigest) {
    problems.push("Authority verification receipt does not join its result and claim.");
  }
  if (!Array.isArray(receipt.findings) || receipt.findings.length !== 0) {
    problems.push("Authority verification receipt findings must be an empty array.");
  }
  const { receiptDigest, ...receiptCore } = receipt;
  if (DIGEST_PATTERN.test(String(receiptDigest || ""))
    && receiptDigest !== sha256(canonicalJson(receiptCore))) {
    problems.push("Authority verification receipt digest is invalid.");
  }

  const expiry = canonicalInstant(claim.expiresAt);
  const verifiedAt = canonicalInstant(receipt.evaluationTime);
  if (expiry === null) problems.push("claim.expiresAt must be a canonical UTC instant.");
  if (verifiedAt === null) problems.push("receipt.evaluationTime must be a canonical UTC instant.");
  if (expiry !== null && verifiedAt !== null && expiry <= verifiedAt) {
    problems.push("Verified claim must expire after its verification receipt.");
  }
  if (evaluationTime !== undefined) {
    const observed = evaluationTime instanceof Date ? evaluationTime.getTime() : Number(evaluationTime);
    if (!Number.isFinite(observed)) problems.push("evaluationTime must be finite.");
    else if (expiry !== null && expiry <= observed) problems.push("Verified claim is expired.");
  }
  return problems;
}

export function validateProtectedReviewContinuity(baseline, observed, {
  evaluationTime,
} = {}) {
  const baselineProblems = validateProtectedReviewAuthority(baseline);
  const observedProblems = validateProtectedReviewAuthority(observed, { evaluationTime });
  const problems = [
    ...baselineProblems.map(problem => `Baseline authority: ${problem}`),
    ...observedProblems.map(problem => `Terminal authority: ${problem}`),
  ];
  if (baselineProblems.length > 0 || observedProblems.length > 0) return problems;
  if (canonicalJson(continuityIdentity(baseline)) !== canonicalJson(continuityIdentity(observed))) {
    problems.push("Terminal authority does not retain the exact reviewed claim, subject, fence, and write scope.");
  }
  return problems;
}

function eventSubject(event) {
  if (!isRecord(event)) throw new Error("Pull-request event must be an object.");
  if (event.merge_group) {
    throw new Error("Merge-group authority cannot be materialized without exact member-claim joining.");
  }
  const pullRequest = event.pull_request;
  if (!isRecord(pullRequest)) throw new Error("Protected review authority requires a pull_request event.");
  const pullRequestNumber = Number(pullRequest.number);
  if (!Number.isSafeInteger(pullRequestNumber) || pullRequestNumber < 1) {
    throw new Error("Event pull request number must be positive.");
  }
  return Object.freeze({
    repository: requiredRepository(event.repository?.full_name, "event repository"),
    pullRequestNumber,
    branch: requiredText(pullRequest.head?.ref, "event head branch"),
    headSha: requiredSha(pullRequest.head?.sha, "event head SHA"),
    canonicalBaseSha: requiredSha(pullRequest.base?.sha, "event base SHA"),
  });
}

function validateDeclaredWriteScope(value, expectedScope) {
  if (!Array.isArray(value) || value.length < 1) {
    return ["claim.declaredWriteScope must contain repository paths."];
  }
  if (value.some(entry => typeof entry !== "string")
    || new Set(value).size !== value.length
    || JSON.stringify(value) !== JSON.stringify([...value].sort(byteCompare))) {
    return ["claim.declaredWriteScope must be unique and byte-sorted."];
  }
  const semanticEntries = value.filter(entry => entry.startsWith("semantic:"));
  const pathEntries = value.filter(entry => entry.startsWith("path:"));
  if (semanticEntries.length > 1) {
    return ["claim.declaredWriteScope must not contain more than one semantic scope."];
  }
  if (pathEntries.length === 0 || pathEntries.length + semanticEntries.length !== value.length) {
    return ["claim.declaredWriteScope must contain only repository paths and an optional projected semantic scope."];
  }
  if (
    semanticEntries.length === 1
    && semanticEntries[0] !== `semantic:${expectedScope}`
  ) {
    return ["claim.declaredWriteScope semantic scope differs from the projected branch scope."];
  }
  const invalidPath = pathEntries.find(entry => !isCanonicalRepositoryPath(
    entry.slice("path:".length),
  ));
  return invalidPath
    ? [`claim.declaredWriteScope contains a non-canonical repository path: ${invalidPath}.`]
    : [];
}

function isCanonicalRepositoryPath(value) {
  if (typeof value !== "string" || !value || value.includes("\\") || value.includes("\0")) return false;
  if (value.startsWith("/") || /^[A-Za-z]:\//u.test(value) || /[*?\[\]]/u.test(value)) return false;
  const normalized = path.posix.normalize(value);
  return normalized === value && normalized !== "." && normalized !== ".." && !normalized.startsWith("../");
}

function semanticScopeFromBranch(branch, throwOnFailure = true) {
  const scope = String(branch || "").split("/").at(-1) || "";
  if (SCOPE_PATTERN.test(scope)) return scope;
  if (!throwOnFailure) return null;
  throw new Error("Pull-request branch does not end in a valid semantic scope.");
}

function canonicalInstant(value) {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) && new Date(parsed).toISOString() === value ? parsed : null;
}

function continuityIdentity(value) {
  const { claim, subject } = value.result;
  return {
    ledgerRepository: value.ledgerRepository,
    targetRepository: value.targetRepository,
    verificationMode: value.verificationMode,
    scopeId: value.scopeId,
    reviewRequestId: value.reviewRequestId,
    claimDigest: value.result.claimDigest,
    claim: {
      claimId: claim.claimId,
      canonicalBaseRevision: claim.canonicalBaseRevision,
      laneRevision: claim.laneRevision,
      declaredWriteScope: claim.declaredWriteScope,
      writeSetDigest: claim.writeSetDigest,
      leaseEpoch: claim.leaseEpoch,
      reviewRequestId: claim.reviewRequestId,
      fenceRevision: claim.fenceRevision,
      operationReceiptDigest: claim.operationReceiptDigest,
    },
    subject,
  };
}

function requiredText(value, label) {
  const normalized = String(value || "").trim();
  if (!normalized) throw new Error(`${label} is required.`);
  return normalized;
}

function requiredRepository(value, label) {
  const normalized = requiredText(value, label);
  if (!REPOSITORY_PATTERN.test(normalized)) throw new Error(`${label} is invalid.`);
  return normalized;
}

function requiredSha(value, label) {
  const normalized = requiredText(value, label);
  if (!SHA_PATTERN.test(normalized)) throw new Error(`${label} is invalid.`);
  return normalized;
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function canonicalJson(value) {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(Object.is(value, -0) ? 0 : value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map(key => (
    `${JSON.stringify(key)}:${canonicalJson(value[key])}`
  )).join(",")}}`;
}

function sameFields(value, expected) {
  const actual = Object.keys(value).sort(byteCompare);
  const required = [...expected].sort(byteCompare);
  return actual.length === required.length
    && actual.every((field, index) => field === required[index]);
}

function byteCompare(left, right) {
  return Buffer.compare(Buffer.from(String(left), "utf8"), Buffer.from(String(right), "utf8"));
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
