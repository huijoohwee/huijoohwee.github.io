import { createHash } from "node:crypto";
import { finding } from "./content.mjs";

const MAX_ARTIFACT_BYTES = 64 * 1024;
const DIGEST_PATTERN = /^[0-9a-f]{64}$/u;
const SHA_PATTERN = /^[0-9a-f]{40}$/u;
const ROOT_OPERATIONS = Object.freeze(["claim", "continue", "integrate", "retire"]);
const RECEIPT_SPECS = Object.freeze({
  "agentic-collaboration-claim-receipt/v1": Object.freeze({ operation: "claim", statuses: Object.freeze(["current", "waiting-successor"]) }),
  "agentic-collaboration-continuation-receipt/v1": Object.freeze({ operation: "continue", statuses: Object.freeze(["current", "reviewed", "integrated-preserved", "dormant-preserved"]) }),
  "agentic-collaboration-integration-receipt/v1": Object.freeze({ operation: "integrate", statuses: Object.freeze(["integrated-preserved"]) }),
  "agentic-collaboration-retirement-receipt/v1": Object.freeze({ operation: "retire", statuses: Object.freeze(["retired"]) }),
});
const OPERATION_RECEIPT_FIELDS = Object.freeze([
  "schema", "operation", "status", "repositoryId", "claimId", "claimDigest", "fenceRevision", "ledgerRevision",
  "ledgerSequence", "idempotencyKey", "requestDigest", "evaluationTime", "receiptDigest",
]);
const PUBLIC_CLAIM_FIELDS = Object.freeze([
  "claimId", "entrySchema", "state", "writeAuthority", "scopeReserved", "actorId", "repositoryId", "workItemId",
  "canonicalBaseRevision", "laneRevision", "declaredWriteScope", "writeSetDigest", "leaseEpoch", "transitionCounter",
  "heartbeatCounter", "reviewRequestId", "predecessorClaimId", "expiresAt", "fenceRevision", "transitionDigest",
  "operationReceiptDigest", "integrationReceiptDigest", "integration",
]);
const INTEGRATION_FIELDS = Object.freeze([
  "candidateRevision", "reviewRequestId", "focusedEvidenceDigest", "dependencyClosureDigest",
  "namedChecksDigest", "handoffEvidenceDigest", "operatorDecisionDigest", "integrationIntentDigest", "integratedAt",
]);

export function checkArtifacts(document, artifacts) {
  const findings = [];
  for (const artifact of artifacts) {
    if (!artifact.relativePath.endsWith(".json")) continue;
    if (artifact.bytes.length > MAX_ARTIFACT_BYTES) { findings.push(issue(document, artifact.relativePath, "Artifact exceeds 64 KiB.")); continue; }
    let value;
    try { value = JSON.parse(artifact.bytes.toString("utf8")); }
    catch (error) { findings.push(issue(document, artifact.relativePath, `Artifact JSON is unparseable: ${error.message}`)); continue; }
    for (const problem of validateArtifact(value, artifact.relativePath)) findings.push(issue(document, artifact.relativePath, problem));
  }
  return findings;
}

export function validateArtifact(value, relativePath = "artifact.json") {
  if (!value || typeof value !== "object" || Array.isArray(value)) return ["Artifact root must be an object."];
  const schema = value.schema;
  if (schema === "agentic-declared-write-scope/v1") return validateWriteScope(value, relativePath);
  if (schema === "agentic-change-manifest/v1") return validateManifest(value);
  if (schema === "agentic-cloud-collaboration-request/v1") return requireFields(value, ["targetRepository", "workItem", "canonicalBaseRevision", "laneRevision", "declaredWriteScope", "leaseEpoch", "expiresAt", "deviceId", "sessionId", "actorId"]);
  if (Object.hasOwn(RECEIPT_SPECS, schema)) return validateOperationReceipt(value);
  if (schema === "agentic-cloud-collaboration-result/v1") return validateCloudResult(value);
  if (schema === "agentic-legacy-dirty-lane-recovery/v1") return validateLegacyRecovery(value);
  return [`Unknown or missing artifact schema in ${relativePath}.`];
}

export function digestBytes(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
export function digestValue(value) { return digestBytes(Buffer.from(canonicalJson(value), "utf8")); }

export function normalizedWriteSetsOverlap(left, right) {
  if (!Array.isArray(left) || !Array.isArray(right) || left.length === 0 || right.length === 0) return true;
  const leftValues = left.map(normalizeScopeEntry); const rightValues = right.map(normalizeScopeEntry);
  if ([...leftValues, ...rightValues].some(value => value === null)) return true;
  return leftValues.some(leftValue => rightValues.some(rightValue => entriesOverlap(leftValue, rightValue)));
}

function validateWriteScope(value, relativePath) {
  const problems = requireFields(value, ["semanticScope", "paths"]);
  if (!/^[a-z0-9-]{3,64}$/u.test(String(value.semanticScope || ""))) problems.push("semanticScope is invalid.");
  if (!Array.isArray(value.paths) || value.paths.length < 1 || value.paths.length > 4096 || value.paths.some(item => typeof item !== "string" || item.length > 512)) problems.push("paths must be 1–4096 bounded strings.");
  else if (JSON.stringify(value.paths) !== JSON.stringify([...new Set(value.paths)].sort(byteCompare))) problems.push("paths must be unique and ascending by bytes.");
  const expected = `${value.semanticScope}-write-scope.json`;
  if (relativePath.split("/").at(-1) !== expected) problems.push(`Filename must be ${expected}.`);
  return problems;
}
function validateManifest(value) {
  const problems = requireFields(value, ["branch", "baseSha", "paths"]);
  if (!/^[0-9a-f]{40}$/u.test(String(value.baseSha || ""))) problems.push("baseSha must be a 40-character revision.");
  if (Array.isArray(value.paths) && JSON.stringify(value.paths) !== JSON.stringify([...new Set(value.paths)].sort(byteCompare))) problems.push("Manifest paths must be unique and byte-sorted.");
  return problems;
}
function validateOperationReceipt(value) {
  const spec = RECEIPT_SPECS[value.schema];
  const problems = [...exactRecordProblems(value, OPERATION_RECEIPT_FIELDS), ...requireFields(value, OPERATION_RECEIPT_FIELDS)];
  if (value.operation !== spec.operation) problems.push(`operation must be ${spec.operation} for ${value.schema}.`);
  if (!spec.statuses.includes(value.status)) problems.push(`status is invalid for ${value.schema}.`);
  if (typeof value.repositoryId !== "string" || !value.repositoryId.trim()) problems.push("repositoryId must be a non-empty identifier.");
  for (const field of ["claimId", "claimDigest", "fenceRevision", "ledgerRevision", "idempotencyKey", "requestDigest", "receiptDigest"]) {
    if (!DIGEST_PATTERN.test(String(value[field] || ""))) problems.push(`${field} must be a lowercase SHA-256 digest.`);
  }
  if (value.claimDigest !== value.fenceRevision) problems.push("fenceRevision must equal claimDigest.");
  if (!Number.isSafeInteger(value.ledgerSequence) || value.ledgerSequence < 1) problems.push("ledgerSequence must be a positive integer.");
  if (!validInstant(value.evaluationTime)) problems.push("evaluationTime must be a canonical ISO-8601 instant.");
  if (problems.length === 0 && digestWithout(value, "receiptDigest") !== value.receiptDigest) problems.push("receiptDigest does not bind the receipt bytes.");
  return problems;
}
function validateCloudResult(value) {
  if (value.status === "error") return validateErrorResult(value);
  if (ROOT_OPERATIONS.includes(value.action)) return validateMutationResult(value);
  if (value.action === "status") return value.status === "empty" ? validateEmptyResult(value) : validateStatusResult(value);
  if (value.action === "verify") return validateVerificationResult(value);
  return ["Cloud result action must be claim, continue, integrate, retire, status, or verify."];
}
function validateMutationResult(value) {
  const fields = ["schema", "ok", "action", "status", "replayed", "attempts", "ledgerRevision", "claim", "claimDigest", "operationReceipt", "receipt"];
  const problems = [...exactRecordProblems(value, fields), ...requireFields(value, fields)];
  if (value.ok !== true) problems.push("A mutation result with a ledger revision must have ok=true.");
  if (typeof value.replayed !== "boolean") problems.push("replayed must be boolean.");
  if (!Number.isSafeInteger(value.attempts) || value.attempts < 1) problems.push("attempts must be a positive integer.");
  if (!SHA_PATTERN.test(String(value.ledgerRevision || ""))) problems.push("ledgerRevision must be a 40-character Git revision.");
  if (!DIGEST_PATTERN.test(String(value.claimDigest || ""))) problems.push("claimDigest must be a lowercase SHA-256 digest.");
  const claimProblems = validatePublicClaim(value.claim);
  const operationProblems = validateOperationReceiptRecord(value.operationReceipt);
  const providerProblems = validateGitHubMutationReceipt(value.receipt);
  problems.push(...prefixProblems("claim", claimProblems), ...prefixProblems("operationReceipt", operationProblems), ...prefixProblems("receipt", providerProblems));
  if (operationProblems.length === 0) {
    if (value.operationReceipt.operation !== value.action) problems.push("operationReceipt.operation must equal result action.");
    if (value.operationReceipt.status !== value.status) problems.push("operationReceipt.status must equal result status.");
    if (value.operationReceipt.claimDigest !== value.claimDigest) problems.push("operationReceipt.claimDigest must equal result claimDigest.");
  }
  if (claimProblems.length === 0 && operationProblems.length === 0) {
    if (value.claim.state !== value.status) problems.push("claim.state must equal result status.");
    if (value.claim.fenceRevision !== value.claimDigest) problems.push("claim.fenceRevision must equal result claimDigest.");
    if (value.claim.operationReceiptDigest !== value.operationReceipt.receiptDigest) problems.push("claim must join the typed operation receipt.");
    if (value.claim.transitionDigest !== value.operationReceipt.ledgerRevision) problems.push("claim transition must equal the typed operation ledger revision.");
  }
  if (providerProblems.length === 0 && operationProblems.length === 0) {
    if (value.receipt.action !== value.action || value.receipt.ledgerRevision !== value.ledgerRevision) problems.push("Provider receipt identity must equal the result identity.");
    if (value.receipt.contractReceiptDigest !== value.operationReceipt.receiptDigest) problems.push("Provider receipt must join the typed operation receipt.");
  }
  return problems;
}
function validateStatusResult(value) {
  const fields = ["schema", "ok", "action", "status", "ledgerRevision", "ledgerDigest", "sequence", "claims"];
  const problems = [...exactRecordProblems(value, fields), ...requireFields(value, fields)];
  if (value.ok !== true || value.status !== "ready") problems.push("A populated status result must be ready with ok=true.");
  if (!SHA_PATTERN.test(String(value.ledgerRevision || ""))) problems.push("ledgerRevision must be a 40-character Git revision.");
  if (!DIGEST_PATTERN.test(String(value.ledgerDigest || ""))) problems.push("ledgerDigest must be a lowercase SHA-256 digest.");
  if (!Number.isSafeInteger(value.sequence) || value.sequence < 0) problems.push("sequence must be a non-negative integer.");
  if (!Array.isArray(value.claims)) problems.push("claims must be an array.");
  else value.claims.forEach((claim, index) => problems.push(...prefixProblems(`claims[${index}]`, validatePublicClaim(claim))));
  return problems;
}
function validateEmptyResult(value) {
  const fields = ["schema", "ok", "action", "status", "ledgerRevision", "claims"];
  const problems = exactRecordProblems(value, fields);
  if (value.ledgerRevision !== null) problems.push("An empty result must carry ledgerRevision=null.");
  if (!Array.isArray(value.claims) || value.claims.length !== 0) problems.push("An empty result must carry claims=[].");
  const statusAction = value.action === "status";
  if (value.ok !== statusAction || value.status !== (statusAction ? "empty" : "blocked")) problems.push("Empty result status does not match its action.");
  return problems;
}
function validateVerificationResult(value) {
  const fields = ["schema", "ok", "action", "status", "ledgerRevision", "claimDigest", "claim", "findings", "receipt"];
  const allowed = [...fields, "subject"];
  const problems = [...exactRecordProblems(value, allowed, fields), ...requireFields(value, ["schema", "ok", "action", "status", "ledgerRevision", "findings", "receipt"])];
  if (typeof value.ok !== "boolean" || value.status !== (value.ok ? "ready" : "blocked")) problems.push("Verification status must match ok.");
  if (!SHA_PATTERN.test(String(value.ledgerRevision || ""))) problems.push("ledgerRevision must be a 40-character Git revision.");
  if (value.claimDigest !== null && !DIGEST_PATTERN.test(String(value.claimDigest || ""))) problems.push("claimDigest must be null or a lowercase SHA-256 digest.");
  if (value.claim !== null) problems.push(...prefixProblems("claim", validatePublicClaim(value.claim)));
  if (!Array.isArray(value.findings)) problems.push("findings must be an array.");
  problems.push(...prefixProblems("receipt", validateGitHubVerificationReceipt(value.receipt)));
  return problems;
}
function validateErrorResult(value) {
  const fields = ["schema", "ok", "action", "status", "error"];
  const problems = exactRecordProblems(value, fields);
  if (value.ok !== false || value.status !== "error") problems.push("Error result must have ok=false and status=error.");
  if (value.action !== null && typeof value.action !== "string") problems.push("Error result action must be text or null.");
  if (!isRecord(value.error) || Object.keys(value.error).sort().join(",") !== "code,message" || !nonEmpty(value.error.code) || !nonEmpty(value.error.message)) {
    problems.push("Error result must contain exactly non-empty code and message fields.");
  }
  return problems;
}
function validateOperationReceiptRecord(value) {
  if (!isRecord(value) || !Object.hasOwn(RECEIPT_SPECS, value.schema)) return ["Typed operation receipt schema is missing or unknown."];
  return validateOperationReceipt(value);
}
function validatePublicClaim(value) {
  if (!isRecord(value)) return ["Public claim must be an object."];
  const problems = exactRecordProblems(value, PUBLIC_CLAIM_FIELDS);
  const required = PUBLIC_CLAIM_FIELDS.filter(field => !["reviewRequestId", "predecessorClaimId", "integrationReceiptDigest", "integration"].includes(field));
  problems.push(...requireFields(value, required));
  for (const field of ["claimId", "writeSetDigest", "fenceRevision", "transitionDigest", "operationReceiptDigest"]) {
    if (!DIGEST_PATTERN.test(String(value[field] || ""))) problems.push(`${field} must be a lowercase SHA-256 digest.`);
  }
  if (value.integrationReceiptDigest !== null && !DIGEST_PATTERN.test(String(value.integrationReceiptDigest || ""))) problems.push("integrationReceiptDigest must be null or a lowercase SHA-256 digest.");
  if (value.predecessorClaimId !== null && !DIGEST_PATTERN.test(String(value.predecessorClaimId || ""))) problems.push("predecessorClaimId must be null or a lowercase SHA-256 digest.");
  if (!new Set(["current", "waiting-successor", "reviewed", "integrated-preserved", "dormant-preserved", "retired"]).has(value.state)) problems.push("claim.state is invalid.");
  if (typeof value.writeAuthority !== "boolean" || typeof value.scopeReserved !== "boolean") problems.push("Claim authority projections must be boolean.");
  if (value.writeAuthority !== (value.state === "current")) problems.push("writeAuthority must be true only for current.");
  const reserved = ["current", "reviewed", "integrated-preserved", "dormant-preserved"].includes(value.state);
  if (value.scopeReserved !== reserved) problems.push("scopeReserved does not match claim state.");
  if (!["actorId", "repositoryId", "workItemId", "entrySchema"].every(field => nonEmpty(value[field]))) problems.push("Claim identities must be non-empty strings.");
  if (!SHA_PATTERN.test(String(value.canonicalBaseRevision || "")) || !SHA_PATTERN.test(String(value.laneRevision || ""))) problems.push("Claim revisions must be 40-character Git revisions.");
  if (!Array.isArray(value.declaredWriteScope) || value.declaredWriteScope.length === 0 || value.declaredWriteScope.some(item => !nonEmpty(item))) problems.push("declaredWriteScope must be a non-empty string array.");
  if (!Number.isSafeInteger(value.leaseEpoch) || value.leaseEpoch < 1 || !Number.isSafeInteger(value.transitionCounter) || value.transitionCounter < 1 || !Number.isSafeInteger(value.heartbeatCounter) || value.heartbeatCounter < 0) problems.push("Claim counters are invalid.");
  if (!validInstant(value.expiresAt)) problems.push("expiresAt must be a canonical ISO-8601 instant.");
  if (value.reviewRequestId !== null && !nonEmpty(value.reviewRequestId)) problems.push("reviewRequestId must be text or null.");
  if (value.integration !== null) problems.push(...prefixProblems("integration", validateIntegration(value.integration)));
  if (value.state === "integrated-preserved" && value.integration === null) problems.push("integrated-preserved requires integration evidence.");
  if (!["integrated-preserved", "retired"].includes(value.state) && value.integration !== null) problems.push("integration evidence is invalid for claim state.");
  if ((value.integration !== null) !== (value.integrationReceiptDigest !== null)) problems.push("integration evidence and receipt digest must be present together.");
  if (isRecord(value.integration) && (value.integration.candidateRevision !== value.laneRevision
    || value.integration.reviewRequestId !== value.reviewRequestId)) problems.push("integration evidence must join the immutable claim subject.");
  return problems;
}
function validateIntegration(value) {
  if (!isRecord(value)) return ["Integration evidence must be an object."];
  const problems = [...exactRecordProblems(value, INTEGRATION_FIELDS), ...requireFields(value, INTEGRATION_FIELDS)];
  for (const field of ["candidateRevision"]) if (!SHA_PATTERN.test(String(value[field] || ""))) problems.push(`${field} must be a 40-character Git revision.`);
  if (!nonEmpty(value.reviewRequestId)) problems.push("reviewRequestId must be a non-empty identifier.");
  for (const field of INTEGRATION_FIELDS.slice(2, -1)) if (!DIGEST_PATTERN.test(String(value[field] || ""))) problems.push(`${field} must be a lowercase SHA-256 digest.`);
  if (!validInstant(value.integratedAt)) problems.push("integratedAt must be a canonical ISO-8601 instant.");
  return problems;
}
function validateGitHubMutationReceipt(value) {
  const fields = ["schema", "action", "ledgerRevision", "ledgerDigest", "claimId", "claimDigest", "contractReceiptDigest", "sequence", "evaluationTime", "receiptDigest"];
  if (!isRecord(value)) return ["Provider receipt must be an object."];
  const problems = [...exactRecordProblems(value, fields), ...requireFields(value, fields)];
  if (value.schema !== "agentic-cloud-collaboration-github-receipt/v1") problems.push("Provider receipt schema is invalid.");
  if (!ROOT_OPERATIONS.includes(value.action)) problems.push("Provider receipt action is invalid.");
  if (!SHA_PATTERN.test(String(value.ledgerRevision || ""))) problems.push("Provider ledgerRevision must be a Git revision.");
  for (const field of ["ledgerDigest", "claimId", "claimDigest", "contractReceiptDigest", "receiptDigest"]) if (!DIGEST_PATTERN.test(String(value[field] || ""))) problems.push(`Provider ${field} must be a SHA-256 digest.`);
  if (!Number.isSafeInteger(value.sequence) || value.sequence < 1) problems.push("Provider sequence must be positive.");
  if (!validInstant(value.evaluationTime)) problems.push("Provider evaluationTime is invalid.");
  if (problems.length === 0 && digestWithout(value, "receiptDigest") !== value.receiptDigest) problems.push("Provider receiptDigest does not bind the receipt bytes.");
  return problems;
}
function validateGitHubVerificationReceipt(value) {
  const fields = ["schema", "ok", "ledgerRevision", "ledgerDigest", "claimId", "claimDigest", "contractReceiptDigest", "evaluationTime", "findings", "receiptDigest"];
  if (!isRecord(value)) return ["Provider verification receipt must be an object."];
  const problems = exactRecordProblems(value, fields);
  if (value.schema !== "agentic-cloud-collaboration-github-verification/v1" || typeof value.ok !== "boolean") problems.push("Provider verification schema or ok field is invalid.");
  if (!SHA_PATTERN.test(String(value.ledgerRevision || ""))) problems.push("Provider verification ledgerRevision must be a Git revision.");
  for (const field of ["ledgerDigest", "contractReceiptDigest", "receiptDigest"]) if (!DIGEST_PATTERN.test(String(value[field] || ""))) problems.push(`Provider verification ${field} must be a SHA-256 digest.`);
  for (const field of ["claimId", "claimDigest"]) if (value[field] !== null && !DIGEST_PATTERN.test(String(value[field] || ""))) problems.push(`Provider verification ${field} must be null or a SHA-256 digest.`);
  if (!validInstant(value.evaluationTime) || !Array.isArray(value.findings)) problems.push("Provider verification evidence is invalid.");
  if (problems.length === 0 && digestWithout(value, "receiptDigest") !== value.receiptDigest) problems.push("Provider verification receiptDigest does not bind the receipt bytes.");
  return problems;
}
function validateLegacyRecovery(value) {
  const fields = ["schema", "captureProfile", "sourceWorktree", "sourceBranch", "sourceHeadSha", "protectedTipSha", "operatorSessionId", "capturedAt", "stateDigest", "writeSetDigest", "trackedPatchDigest", "tracked", "untracked", "packageDigest"];
  const problems = [...exactRecordProblems(value, fields), ...requireFields(value, fields)];
  for (const field of ["sourceHeadSha", "protectedTipSha"]) if (!SHA_PATTERN.test(String(value[field] || ""))) problems.push(`${field} must be a 40-character Git revision.`);
  for (const field of ["stateDigest", "writeSetDigest", "trackedPatchDigest", "packageDigest"]) if (!DIGEST_PATTERN.test(String(value[field] || ""))) problems.push(`${field} must be a lowercase SHA-256 digest.`);
  if (!validInstant(value.capturedAt) || !Array.isArray(value.tracked) || !Array.isArray(value.untracked)) problems.push("Recovery capture evidence is invalid.");
  if (problems.length === 0 && digestWithout(value, "packageDigest") !== value.packageDigest) problems.push("packageDigest does not bind the recovery manifest.");
  return problems;
}
function normalizeScopeEntry(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  if (value === "*" || value.startsWith("wildcard:")) return "*";
  if (value.startsWith("semantic:")) return value;
  const normalized = value.replace(/\\/gu, "/").replace(/\/+$/gu, "");
  const parts = [];
  for (const segment of normalized.split("/")) {
    if (!segment || segment === ".") continue;
    if (segment === "..") { if (parts.length === 0) return null; parts.pop(); }
    else parts.push(segment);
  }
  return parts.length > 0 ? parts.join("/") : null;
}
function entriesOverlap(left, right) {
  if (left === "*" || right === "*") return true;
  if (left.startsWith("semantic:") || right.startsWith("semantic:")) return left === right;
  return left === right || left.startsWith(`${right}/`) || right.startsWith(`${left}/`);
}
function exactRecordProblems(value, allowedFields, requiredFields = allowedFields) {
  if (!isRecord(value)) return ["Value must be an object."];
  const allowed = new Set(allowedFields);
  const problems = requiredFields.filter(field => !Object.hasOwn(value, field)).map(field => `Required field is absent: ${field}.`);
  const unexpected = Object.keys(value).filter(field => !allowed.has(field)).sort(byteCompare);
  if (unexpected.length > 0) problems.push(`Unexpected fields: ${unexpected.join(", ")}.`);
  return problems;
}
function canonicalJson(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(Object.is(value, -0) ? 0 : value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
}
function digestWithout(value, field) { const draft = { ...value }; delete draft[field]; return digestValue(draft); }
function prefixProblems(prefix, problems) { return problems.map(problem => `${prefix}: ${problem}`); }
function isRecord(value) { return Boolean(value) && typeof value === "object" && !Array.isArray(value); }
function nonEmpty(value) { return typeof value === "string" && Boolean(value.trim()); }
function validInstant(value) {
  if (typeof value !== "string") return false;
  const milliseconds = Date.parse(value);
  return Number.isFinite(milliseconds) && new Date(milliseconds).toISOString() === value;
}
function requireFields(value, fields) { return fields.filter(field => value[field] === undefined || value[field] === null || value[field] === "").map(field => `Required field is absent: ${field}.`); }
function byteCompare(left, right) { return Buffer.from(String(left)).compare(Buffer.from(String(right))); }
function issue(document, artifact, message) { return finding({ ruleId: "coordination-artifacts#5", type: "evidence-without-run", path: document.sourcePath, message: `${artifact}: ${message}` }); }
