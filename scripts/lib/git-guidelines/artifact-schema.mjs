import { createHash } from "node:crypto";
import path from "node:path";
import { TextDecoder } from "node:util";
import { declaredWriteScopesOverlap, finding } from "./content.mjs";
import { resolveRuleId } from "./rule-registry.mjs";
import { checkRuntimeConformance } from "./runtime-conformance.mjs";

const MAX_ARTIFACT_BYTES = 64 * 1024;
const DIGEST_PATTERN = /^[0-9a-f]{64}$/u;
const SHA_PATTERN = /^[0-9a-f]{40}$/u;
const SEMANTIC_SCOPE_PATTERN = /^[a-z0-9-]{3,64}$/u;
const TASK_BRANCH_PATTERN = /^agent\/[a-z0-9-]{1,64}\/[a-z0-9-]{1,64}$/u;
const UTF8_DECODER = new TextDecoder("utf-8", { fatal: true });
const REPOSITORY_OWNED_REQUEST_PATH = ".coordination/dev-source-resolver-cloud-request.json";
const REPOSITORY_OWNED_CLAIM_PATH = ".coordination/dev-source-resolver-cloud-claim.json";
const ROOT_OPERATIONS = Object.freeze(["claim", "continue", "integrate", "retire"]);
const ACCEPTED_CLAIM_ACTIONS = Object.freeze(["claim", "renew", "park", "review-ready", "handoff", "release"]);
const ACCEPTED_CLAIM_STATES = Object.freeze(["active", "review-ready", "parked", "released", "expired", "revoked"]);
const ACCEPTED_CLAIM_FIELDS = Object.freeze([
  "claimId", "state", "actorId", "repositoryId", "workItemId", "canonicalBaseRevision", "laneRevision",
  "declaredWriteScope", "writeSetDigest", "leaseEpoch", "transitionCounter", "heartbeatCounter", "reviewRequestId",
  "expiresAt", "fenceRevision", "transitionDigest",
]);
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

export function checkArtifacts(document, artifacts, ruleIndex, runtimeContext) {
  const findings = [];
  const records = [];
  const markerPaths = new Set(artifacts
    .filter(artifact => path.basename(String(artifact.relativePath || artifact.path || "")) === ".complete")
    .map(artifact => normalizeArtifactPath(artifact.path || artifact.relativePath)));
  for (const artifact of artifacts) {
    if (!artifact.relativePath.endsWith(".json")) continue;
    if (!artifact.bytes) { findings.push(issue(document, ruleIndex, artifact.relativePath, "artifact-schema-invalid", "Artifact bytes are unreadable.")); continue; }
    if (artifactByteLength(artifact.bytes) > MAX_ARTIFACT_BYTES) { findings.push(issue(document, ruleIndex, artifact.relativePath, "artifact-schema-invalid", "Artifact exceeds 64 KiB.")); continue; }
    let value;
    try { value = JSON.parse(decodeArtifactBytes(artifact.bytes)); }
    catch (error) { findings.push(issue(document, ruleIndex, artifact.relativePath, "artifact-schema-invalid", `Artifact is not strict UTF-8 JSON: ${error.message}`)); continue; }
    records.push(Object.freeze({ artifact, value }));
    for (const problem of validateArtifact(value, artifact.relativePath)) {
      findings.push(issue(document, ruleIndex, artifact.relativePath, diagnosticCode(problem), problem));
    }
  }
  findings.push(...checkArtifactRelationships(document, records, markerPaths, ruleIndex));
  const runtime = checkRuntimeConformance(document, runtimeContext, ruleIndex);
  findings.push(...runtime.findings);
  return Object.freeze({
    findings: Object.freeze(findings),
    blockedOutcomes: runtime.blockedOutcomes,
  });
}

export function validateArtifact(value, relativePath = "artifact.json") {
  if (!value || typeof value !== "object" || Array.isArray(value)) return ["Artifact root must be an object."];
  const schema = value.schema;
  if (schema === "agentic-declared-write-scope/v1") return validateWriteScope(value, relativePath);
  if (schema === "agentic-change-manifest/v1") return validateManifest(value, relativePath);
  if (schema === "agentic-cloud-collaboration-request/v1") return validateCloudRequest(value, relativePath);
  if (Object.hasOwn(RECEIPT_SPECS, schema)) return validateOperationReceipt(value);
  if (schema === "agentic-cloud-collaboration-result/v1") return validateCloudResult(value, relativePath);
  if (schema === "agentic-legacy-dirty-lane-recovery/v1") return validateLegacyRecovery(value, relativePath);
  return [`Unknown or missing artifact schema in ${relativePath}.`];
}

export function digestBytes(bytes) { return createHash("sha256").update(bytes).digest("hex"); }
export function digestValue(value) { return digestBytes(Buffer.from(canonicalJson(value), "utf8")); }

export function normalizedWriteSetsOverlap(left, right) {
  return declaredWriteScopesOverlap(left, right);
}

function validateWriteScope(value, relativePath) {
  const fields = ["schema", "semanticScope", "paths"];
  const problems = [...exactRecordProblems(value, fields), ...requireFields(value, fields)];
  if (!SEMANTIC_SCOPE_PATTERN.test(String(value.semanticScope || ""))) problems.push("semanticScope is invalid.");
  if (!Array.isArray(value.paths) || value.paths.length < 1 || value.paths.length > 4096 || value.paths.some(item => typeof item !== "string" || item.length > 512 || !isCanonicalRepositoryPath(item))) problems.push("paths must be 1–4096 canonical repository-relative strings of at most 512 characters.");
  else if (JSON.stringify(value.paths) !== JSON.stringify([...new Set(value.paths)].sort(byteCompare))) problems.push("paths must be unique and ascending by bytes.");
  const expected = `${value.semanticScope}-write-scope.json`;
  if (checksArtifactName(relativePath) && path.posix.basename(normalizeArtifactPath(relativePath)) !== expected) problems.push(`Filename must be ${expected}.`);
  return problems;
}
function validateManifest(value, relativePath) {
  const fields = ["schema", "branch", "baseSha", "paths"];
  const problems = [...exactRecordProblems(value, fields), ...requireFields(value, fields)];
  if (!TASK_BRANCH_PATTERN.test(String(value.branch || "")) || String(value.branch || "").length > 200) problems.push("branch must be agent/<device-id>/<semantic-scope> within the stated segment and total bounds.");
  if (!SHA_PATTERN.test(String(value.baseSha || ""))) problems.push("baseSha must be a 40-character revision.");
  if (!Array.isArray(value.paths) || value.paths.some(item => !isCanonicalRepositoryPath(item))) problems.push("Manifest paths must be canonical repository-relative strings.");
  else if (JSON.stringify(value.paths) !== JSON.stringify([...new Set(value.paths)].sort(byteCompare))) problems.push("Manifest paths must be unique and byte-sorted.");
  const semanticScope = branchSemanticScope(value.branch);
  if (semanticScope && checksArtifactName(relativePath) && path.posix.basename(normalizeArtifactPath(relativePath)) !== `${semanticScope}.json`) problems.push(`Filename must be ${semanticScope}.json.`);
  return problems;
}
function validateCloudRequest(value, relativePath) {
  const fields = [
    "schema", "targetRepository", "workItemId", "canonicalBaseRevision", "laneRevision", "declaredWriteScope",
    "leaseEpoch", "expiresAt", "deviceId", "sessionId", "actorId", "actorLogin",
  ];
  const required = fields.filter(field => field !== "actorLogin");
  const problems = [...exactRecordProblems(value, fields, required), ...requireFields(value, required)];
  for (const field of ["targetRepository", "workItemId", "deviceId", "sessionId", "actorId"]) {
    if (!nonEmpty(value[field])) problems.push(`${field} must be a non-empty string.`);
  }
  if (Object.hasOwn(value, "actorLogin") && !nonEmpty(value.actorLogin)) problems.push("actorLogin must be a non-empty string when present.");
  for (const field of ["canonicalBaseRevision", "laneRevision"]) {
    if (!SHA_PATTERN.test(String(value[field] || ""))) problems.push(`${field} must be a 40-character Git revision.`);
  }
  if (!Array.isArray(value.declaredWriteScope) || value.declaredWriteScope.length === 0
    || value.declaredWriteScope.some(item => !nonEmpty(item) || !/^(?:path:.+|semantic:.+)$/u.test(item))) {
    problems.push("declaredWriteScope must be a non-empty array of path: or semantic: entries.");
  } else {
    if (JSON.stringify(value.declaredWriteScope) !== JSON.stringify([...new Set(value.declaredWriteScope)].sort(byteCompare))) problems.push("declaredWriteScope must be unique and ascending by bytes.");
    const semanticScopes = semanticScopesFromDeclaredScope(value.declaredWriteScope);
    if (semanticScopes.length !== 1 || !SEMANTIC_SCOPE_PATTERN.test(semanticScopes[0] || "")) problems.push("declaredWriteScope must contain exactly one valid semantic: entry.");
    for (const entry of value.declaredWriteScope.filter(item => item.startsWith("path:"))) {
      if (!isCanonicalRepositoryPath(entry.slice("path:".length))) problems.push(`Declared path scope is not canonical and repository-relative: ${entry}.`);
    }
    if (semanticScopes.length === 1 && checksArtifactName(relativePath)) {
      const expected = `${semanticScopes[0]}-request.json`;
      const normalizedPath = normalizeArtifactPath(relativePath);
      const repositoryOwnedRequest = normalizedPath === REPOSITORY_OWNED_REQUEST_PATH && semanticScopes[0] === "dev-source-resolver";
      if (path.posix.basename(normalizedPath) !== expected && !repositoryOwnedRequest) problems.push(`Filename must be ${expected}.`);
    }
  }
  if (!Number.isSafeInteger(value.leaseEpoch) || value.leaseEpoch < 0) problems.push("leaseEpoch must be a non-negative integer.");
  if (!validUtcInstant(value.expiresAt)) problems.push("expiresAt must be an absolute UTC instant.");
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
function validateCloudResult(value, relativePath) {
  return [...validateAcceptedClaimResult(value), ...validateCloudResultName(value, relativePath)];
}
function validateAcceptedClaimResult(value) {
  const fields = ["schema", "ok", "action", "status", "replayed", "attempts", "ledgerRevision", "claim", "claimDigest", "receipt"];
  const problems = [...exactRecordProblems(value, fields), ...requireFields(value, fields)];
  if (typeof value.ok !== "boolean" || typeof value.replayed !== "boolean") problems.push("Accepted claim result booleans are invalid.");
  if (!ACCEPTED_CLAIM_ACTIONS.includes(value.action)) problems.push("Accepted claim action is outside the owner vocabulary.");
  if (!ACCEPTED_CLAIM_STATES.includes(value.status)) problems.push("Accepted claim status is outside the owner vocabulary.");
  if (!Number.isSafeInteger(value.attempts) || value.attempts < 1) problems.push("attempts must be a positive integer.");
  if (!SHA_PATTERN.test(String(value.ledgerRevision || ""))) problems.push("ledgerRevision must be a 40-character Git revision.");
  if (!DIGEST_PATTERN.test(String(value.claimDigest || ""))) problems.push("claimDigest must be a lowercase SHA-256 digest.");
  const claimProblems = validateAcceptedClaim(value.claim);
  const receiptProblems = validateAcceptedClaimReceipt(value.receipt);
  problems.push(...prefixProblems("claim", claimProblems), ...prefixProblems("receipt", receiptProblems));
  if (claimProblems.length === 0) {
    if (value.claim.state !== value.status) problems.push("claim.state must equal result status.");
    if (value.claim.fenceRevision !== value.claimDigest) problems.push("claim.fenceRevision must equal result claimDigest.");
  }
  if (receiptProblems.length === 0) {
    if (value.receipt.action !== value.action || value.receipt.ledgerRevision !== value.ledgerRevision) problems.push("Receipt action and ledger revision must equal the result identity.");
    if (value.receipt.claimDigest !== value.claimDigest || value.receipt.claimId !== value.claim?.claimId) problems.push("Receipt claim identity must equal the result claim identity.");
    if (value.receipt.ledgerDigest !== value.claim?.transitionDigest) problems.push("Receipt ledgerDigest must equal claim.transitionDigest.");
  }
  return problems;
}
function validateAcceptedClaim(value) {
  if (!isRecord(value)) return ["Accepted claim must be an object."];
  const problems = [...exactRecordProblems(value, ACCEPTED_CLAIM_FIELDS), ...requireFields(value, ACCEPTED_CLAIM_FIELDS.filter(field => field !== "reviewRequestId"))];
  if (!ACCEPTED_CLAIM_STATES.includes(value.state)) problems.push("claim.state is outside the owner vocabulary.");
  for (const field of ["actorId", "repositoryId", "workItemId"]) if (!nonEmpty(value[field])) problems.push(`${field} must be a non-empty identifier.`);
  for (const field of ["canonicalBaseRevision", "laneRevision"]) if (!SHA_PATTERN.test(String(value[field] || ""))) problems.push(`${field} must be a 40-character Git revision.`);
  for (const field of ["claimId", "writeSetDigest", "fenceRevision", "transitionDigest"]) if (!DIGEST_PATTERN.test(String(value[field] || ""))) problems.push(`${field} must be a lowercase SHA-256 digest.`);
  if (!validDeclaredWriteScope(value.declaredWriteScope)) problems.push("declaredWriteScope must be a unique byte-sorted path:/semantic: array with exactly one semantic scope.");
  else if (digestValue(value.declaredWriteScope) !== value.writeSetDigest) problems.push("writeSetDigest must bind the canonical declaredWriteScope.");
  if (!Number.isSafeInteger(value.leaseEpoch) || value.leaseEpoch < 0 || !Number.isSafeInteger(value.transitionCounter) || value.transitionCounter < 1 || !Number.isSafeInteger(value.heartbeatCounter) || value.heartbeatCounter < 0) problems.push("Claim counters are invalid.");
  if (value.reviewRequestId !== null && !nonEmpty(value.reviewRequestId)) problems.push("reviewRequestId must be text or null.");
  if (!validUtcInstant(value.expiresAt)) problems.push("expiresAt must be an absolute UTC instant.");
  return problems;
}
function validateAcceptedClaimReceipt(value) {
  const fields = ["schema", "action", "ledgerRevision", "ledgerDigest", "claimId", "claimDigest", "contractReceiptDigest", "sequence", "evaluationTime", "receiptDigest"];
  if (!isRecord(value)) return ["Accepted claim receipt must be an object."];
  const problems = [...exactRecordProblems(value, fields), ...requireFields(value, fields)];
  if (value.schema !== "agentic-cloud-collaboration-github-receipt/v1") problems.push("Accepted claim receipt schema is invalid.");
  if (!ACCEPTED_CLAIM_ACTIONS.includes(value.action)) problems.push("Accepted claim receipt action is outside the owner vocabulary.");
  if (!SHA_PATTERN.test(String(value.ledgerRevision || ""))) problems.push("Accepted claim receipt ledgerRevision must be a Git revision.");
  for (const field of ["ledgerDigest", "claimId", "claimDigest", "contractReceiptDigest", "receiptDigest"]) if (!DIGEST_PATTERN.test(String(value[field] || ""))) problems.push(`${field} must be a lowercase SHA-256 digest.`);
  if (!Number.isSafeInteger(value.sequence) || value.sequence < 1) problems.push("Accepted claim receipt sequence must be positive.");
  if (!validInstant(value.evaluationTime)) problems.push("Accepted claim receipt evaluationTime is invalid.");
  if (problems.length === 0 && digestWithout(value, "receiptDigest") !== value.receiptDigest) problems.push("Accepted claim receiptDigest does not bind the receipt bytes.");
  return problems;
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
function validateLegacyRecovery(value, relativePath) {
  const fields = ["schema", "captureProfile", "sourceWorktree", "sourceBranch", "sourceHeadSha", "protectedTipSha", "operatorSessionId", "capturedAt", "stateDigest", "writeSetDigest", "trackedPatchDigest", "tracked", "untracked", "packageDigest"];
  const problems = [...exactRecordProblems(value, fields), ...requireFields(value, fields)];
  for (const field of ["sourceHeadSha", "protectedTipSha"]) if (!SHA_PATTERN.test(String(value[field] || ""))) problems.push(`${field} must be a 40-character Git revision.`);
  for (const field of ["stateDigest", "writeSetDigest", "trackedPatchDigest", "packageDigest"]) if (!DIGEST_PATTERN.test(String(value[field] || ""))) problems.push(`${field} must be a lowercase SHA-256 digest.`);
  if (!validInstant(value.capturedAt) || !Array.isArray(value.tracked) || !Array.isArray(value.untracked)) problems.push("Recovery capture evidence is invalid.");
  if (Array.isArray(value.tracked)) problems.push(...validateRecoveryEntries(value.tracked, "tracked"));
  if (Array.isArray(value.untracked)) problems.push(...validateRecoveryEntries(value.untracked, "untracked"));
  if (Array.isArray(value.tracked) && Array.isArray(value.untracked)) {
    const allPaths = [...value.tracked, ...value.untracked].map(entry => entry?.path);
    if (new Set(allPaths).size !== allPaths.length) problems.push("Recovery entry paths must be unique across tracked and untracked sets.");
  }
  if (checksArtifactName(relativePath) && path.posix.basename(normalizeArtifactPath(relativePath)) !== "manifest.json") problems.push("Recovery artifact filename must be manifest.json.");
  if (problems.length === 0 && digestWithout(value, "packageDigest") !== value.packageDigest) problems.push("packageDigest does not bind the recovery manifest.");
  return problems;
}
function checkArtifactRelationships(document, records, markerPaths, ruleIndex) {
  const findings = [];
  const bySemanticScope = new Map();
  for (const record of records) {
    const semanticScope = semanticScopeForRecord(record);
    if (semanticScope) {
      const group = bySemanticScope.get(semanticScope) || { scopes: [], requests: [], claims: [] };
      if (record.value.schema === "agentic-declared-write-scope/v1") group.scopes.push(record);
      if (record.value.schema === "agentic-cloud-collaboration-request/v1") group.requests.push(record);
      if (record.value.schema === "agentic-cloud-collaboration-result/v1" && isClaimResult(record.value)) group.claims.push(record);
      bySemanticScope.set(semanticScope, group);
    }
    if (record.value.schema === "agentic-legacy-dirty-lane-recovery/v1") {
      const manifestPath = normalizeArtifactPath(record.artifact.path || record.artifact.relativePath);
      const markerPath = normalizeArtifactPath(path.join(path.dirname(manifestPath), ".complete"));
      if (!markerPaths.has(markerPath)) {
        findings.push(issue(document, ruleIndex, record.artifact.relativePath, "capture-incomplete", "Recovery capture lacks the completion marker written last."));
      }
    }
  }
  for (const [semanticScope, group] of bySemanticScope) {
    findings.push(...duplicateRoleFindings(document, semanticScope, group, ruleIndex));
    const scope = group.scopes[0]?.value;
    for (const requestRecord of group.requests) {
      const request = requestRecord.value;
      if (!scope) {
        findings.push(issue(document, ruleIndex, requestRecord.artifact.relativePath, "artifact-schema-invalid", `Claim request ${semanticScope} has no matching declared write-scope artifact.`));
      } else {
        const expected = [...scope.paths.map(value => `path:${value}`), `semantic:${scope.semanticScope}`].sort(byteCompare);
        if (!equalStringArrays(request.declaredWriteScope, expected)) {
          findings.push(issue(document, ruleIndex, requestRecord.artifact.relativePath, "artifact-schema-invalid", `Claim request declaredWriteScope does not equal ${semanticScope}-write-scope.json.`));
        }
      }
    }
    for (const claimRecord of group.claims) {
      const claim = claimRecord.value.claim;
      const requestRecord = selectAnsweredRequest(group.requests, claim);
      if (!requestRecord) {
        findings.push(issue(document, ruleIndex, claimRecord.artifact.relativePath, "artifact-schema-invalid", `Accepted claim ${semanticScope} has no matching request artifact.`));
        continue;
      }
      const request = requestRecord.value;
      if (request.leaseEpoch !== claim.leaseEpoch) {
        findings.push(issue(document, ruleIndex, claimRecord.artifact.relativePath, "artifact-schema-invalid", `Accepted claim leaseEpoch ${claim.leaseEpoch} does not equal request leaseEpoch ${request.leaseEpoch}.`));
      }
      if (!equalStringArrays(request.declaredWriteScope, claim.declaredWriteScope)) {
        findings.push(issue(document, ruleIndex, claimRecord.artifact.relativePath, "artifact-schema-invalid", "Accepted claim declaredWriteScope does not equal the answered request."));
      }
      const issuedAt = issuanceInstant(claimRecord.value);
      if (issuedAt !== null) {
        const expiry = Date.parse(request.expiresAt);
        if (!Number.isFinite(expiry) || expiry <= issuedAt || expiry - issuedAt > 24 * 60 * 60 * 1000) {
          findings.push(issue(document, ruleIndex, requestRecord.artifact.relativePath, "artifact-schema-invalid", "Request expiry must be after issuance and no more than 24 hours later."));
        }
      }
    }
  }
  return findings;
}
function duplicateRoleFindings(document, semanticScope, group, ruleIndex) {
  const findings = [];
  for (const [role, values] of [["write-scope", group.scopes], ["request", group.requests], ["claim", group.claims]]) {
    if (values.length > 1) findings.push(issue(document, ruleIndex, values[1].artifact.relativePath, "artifact-name-mismatch", `Semantic scope ${semanticScope} has ${values.length} ${role} artifacts; expected at most one.`));
  }
  return findings;
}
function selectAnsweredRequest(requests, claim) {
  return requests.find(record => record.value.canonicalBaseRevision === claim.canonicalBaseRevision
    && record.value.laneRevision === claim.laneRevision
    && equalStringArrays(record.value.declaredWriteScope, claim.declaredWriteScope)) || requests[0] || null;
}
function semanticScopeForRecord(record) {
  if (record.value.schema === "agentic-declared-write-scope/v1") return record.value.semanticScope;
  if (record.value.schema === "agentic-cloud-collaboration-request/v1") return semanticScopesFromDeclaredScope(record.value.declaredWriteScope)[0] || null;
  if (record.value.schema === "agentic-cloud-collaboration-result/v1" && isClaimResult(record.value)) return semanticScopesFromDeclaredScope(record.value.claim.declaredWriteScope)[0] || null;
  return null;
}
function validateCloudResultName(value, relativePath) {
  if (!checksArtifactName(relativePath) || !isClaimResult(value)) return [];
  const semanticScopes = semanticScopesFromDeclaredScope(value.claim.declaredWriteScope);
  if (semanticScopes.length !== 1 || !SEMANTIC_SCOPE_PATTERN.test(semanticScopes[0] || "")) return ["Claim declaredWriteScope must carry exactly one valid semantic: entry."];
  const expected = `${semanticScopes[0]}-claim.json`;
  const normalizedPath = normalizeArtifactPath(relativePath);
  const repositoryOwnedClaim = normalizedPath === REPOSITORY_OWNED_CLAIM_PATH && semanticScopes[0] === "dev-source-resolver";
  return path.posix.basename(normalizedPath) === expected || repositoryOwnedClaim ? [] : [`Filename must be ${expected}.`];
}
function validateRecoveryEntries(entries, ownership) {
  const problems = [];
  const fields = ["path", "ownership", "kind", "mode", "digest"];
  for (const [index, entry] of entries.entries()) {
    const prefix = `${ownership}[${index}]`;
    if (!isRecord(entry)) { problems.push(`${prefix} must be an object.`); continue; }
    problems.push(...exactRecordProblems(entry, fields).map(problem => `${prefix}: ${problem}`));
    if (!isCanonicalRepositoryPath(entry.path)) problems.push(`${prefix}.path must be canonical and repository-relative.`);
    if (entry.ownership !== ownership) problems.push(`${prefix}.ownership must be ${ownership}.`);
    if (!new Set(["file", "symlink"]).has(entry.kind)) problems.push(`${prefix}.kind must be file or symlink.`);
    if (!Number.isSafeInteger(entry.mode) || entry.mode < 0 || entry.mode > 0o7777) problems.push(`${prefix}.mode must be a bounded POSIX mode integer.`);
    if (!DIGEST_PATTERN.test(String(entry.digest || ""))) problems.push(`${prefix}.digest must be a lowercase SHA-256 digest.`);
  }
  return problems;
}
function isCanonicalRepositoryPath(value) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\\") || value.startsWith("/") || /^[A-Za-z]:\//u.test(value) || value.endsWith("/")) return false;
  const segments = value.split("/");
  return segments.every(segment => segment.length > 0 && segment !== "." && segment !== "..");
}
function branchSemanticScope(value) {
  const match = String(value || "").match(TASK_BRANCH_PATTERN);
  return match ? match[0].split("/")[2] : null;
}
function semanticScopesFromDeclaredScope(value) {
  if (!Array.isArray(value)) return [];
  return value.filter(entry => typeof entry === "string" && entry.startsWith("semantic:")).map(entry => entry.slice("semantic:".length));
}
function validDeclaredWriteScope(value) {
  if (!Array.isArray(value) || value.length === 0 || JSON.stringify(value) !== JSON.stringify([...new Set(value)].sort(byteCompare))) return false;
  if (semanticScopesFromDeclaredScope(value).length !== 1) return false;
  return value.every(entry => typeof entry === "string" && (
    (entry.startsWith("path:") && isCanonicalRepositoryPath(entry.slice("path:".length)))
    || (entry.startsWith("semantic:") && SEMANTIC_SCOPE_PATTERN.test(entry.slice("semantic:".length)))
  ));
}
function isClaimResult(value) { return isRecord(value?.claim) && Array.isArray(value.claim.declaredWriteScope); }
function equalStringArrays(left, right) { return Array.isArray(left) && Array.isArray(right) && JSON.stringify(left) === JSON.stringify(right); }
function issuanceInstant(value) {
  for (const candidate of [value.operationReceipt?.evaluationTime, value.receipt?.evaluationTime]) {
    const milliseconds = Date.parse(candidate);
    if (Number.isFinite(milliseconds)) return milliseconds;
  }
  return null;
}
function checksArtifactName(relativePath) { return relativePath !== "artifact.json" && String(relativePath || "").length > 0; }
function normalizeArtifactPath(value) { return String(value || "").replaceAll("\\", "/"); }
function artifactByteLength(value) { return typeof value === "string" ? Buffer.byteLength(value, "utf8") : value.byteLength; }
function decodeArtifactBytes(value) {
  if (typeof value !== "string") return UTF8_DECODER.decode(value);
  const roundTrip = UTF8_DECODER.decode(Buffer.from(value, "utf8"));
  if (roundTrip !== value) throw new TypeError("Artifact string contains a non-round-trippable Unicode scalar.");
  return value;
}
function diagnosticCode(problem) {
  if (/Filename|filename/u.test(problem)) return "artifact-name-mismatch";
  if (/Manifest paths must be unique and byte-sorted/u.test(problem)) return "manifest-order-invalid";
  return "artifact-schema-invalid";
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
function validUtcInstant(value) {
  return typeof value === "string" && value.endsWith("Z") && Number.isFinite(Date.parse(value));
}
function requireFields(value, fields) { return fields.filter(field => value[field] === undefined || value[field] === null || value[field] === "").map(field => `Required field is absent: ${field}.`); }
function byteCompare(left, right) { return Buffer.from(String(left)).compare(Buffer.from(String(right))); }
function issue(document, ruleIndex, artifact, code, message) {
  const ruleId = artifactRuleId(ruleIndex, code);
  return finding({
    ruleId,
    type: "unimplemented-guideline",
    path: document.sourcePath,
    message: `${code}: ${artifact}: ${message}`,
  });
}

function artifactRuleId(ruleIndex, code) {
  if (code === "artifact-name-mismatch") {
    return resolveRuleId(ruleIndex, "coordination-artifacts", /Match each filename's semantic scope and role/u, "coordination-artifacts#16");
  }
  if (code === "manifest-order-invalid") {
    return resolveRuleId(ruleIndex, "authoring--write-scope", /Make manifest `paths` equal the sorted set/u, "authoring--write-scope#7");
  }
  if (code === "capture-incomplete") {
    return resolveRuleId(ruleIndex, "preservation-recovery--cleanup", /Write `.complete` last/u, "preservation-recovery--cleanup#15");
  }
  return resolveRuleId(ruleIndex, "coordination-artifacts", /Require every declared-scope, request, and accepted-result schema/u, "coordination-artifacts#15");
}
