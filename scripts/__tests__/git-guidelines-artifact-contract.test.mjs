import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { checkArtifacts, digestValue, validateArtifact } from "../lib/git-guidelines/artifact-schema.mjs";
import { validateBlockedOutcome } from "../lib/git-guidelines/content.mjs";
import { buildReport } from "../lib/git-guidelines/report.mjs";

const DOCUMENT = Object.freeze({ sourcePath: "docs/documents/git-guidelines.md" });
const COORDINATION_FIXTURE_ROOT = new URL("./fixtures/coordination/", import.meta.url);

test("all five live artifact schemas join without findings", () => {
  const result = checkArtifacts(DOCUMENT, validArtifactSet());
  assert.deepEqual(result.findings, []);
  assert.deepEqual(result.blockedOutcomes, []);
});

test("claim request and accepted claim must join on scope, epoch, and the 24-hour ceiling", () => {
  const mismatchedEpoch = validArtifactSet({ claimEpoch: 2 });
  assert.ok(messages(checkArtifacts(DOCUMENT, mismatchedEpoch)).some(message => message.includes("leaseEpoch 2 does not equal request leaseEpoch 1")));

  const mismatchedScope = validArtifactSet({ claimPath: "src/other.mjs" });
  assert.ok(messages(checkArtifacts(DOCUMENT, mismatchedScope)).some(message => message.includes("declaredWriteScope does not equal the answered request")));

  const excessiveExpiry = validArtifactSet({ requestExpiry: "2026-08-05T00:00:00.001Z" });
  assert.ok(messages(checkArtifacts(DOCUMENT, excessiveExpiry)).some(message => message.includes("no more than 24 hours")));
});

test("recovery completeness, canonical paths, and artifact names fail closed", () => {
  const withoutMarker = validArtifactSet().filter(artifact => !artifact.relativePath.endsWith("/.complete"));
  assert.ok(messages(checkArtifacts(DOCUMENT, withoutMarker)).some(message => message.startsWith("capture-incomplete:")));

  const invalidScope = { schema: "agentic-declared-write-scope/v1", semanticScope: "scope", paths: ["/absolute"] };
  assert.ok(validateArtifact(invalidScope, ".coordination/scope-write-scope.json").some(problem => problem.includes("repository-relative")));
  assert.ok(validateArtifact({ ...invalidScope, paths: ["src/a.mjs"] }, ".coordination/wrong-write-scope.json").some(problem => problem.includes("Filename must be scope-write-scope.json")));
});

test("the repaired repository-owned cloud request path is accepted exactly", () => {
  const request = {
    schema: "agentic-cloud-collaboration-request/v1",
    targetRepository: "huijoohwee/knowgrph",
    workItemId: "work-item:dev-source-resolver-20260803",
    canonicalBaseRevision: "a".repeat(40),
    laneRevision: "b".repeat(40),
    declaredWriteScope: ["path:scripts/worktree-policy.mjs", "semantic:dev-source-resolver"],
    leaseEpoch: 1,
    expiresAt: "2026-08-05T00:00:00.000Z",
    deviceId: "device",
    sessionId: "session",
    actorId: "actor",
  };
  assert.deepEqual(validateArtifact(request, ".coordination/dev-source-resolver-cloud-request.json"), []);
  assert.ok(validateArtifact(request, ".coordination/another-scope-cloud-request.json").some(problem => problem.includes("Filename must be dev-source-resolver-request.json")));
});

test("CI materializes the exact repaired Task 19 input pair", () => {
  const scopePath = new URL("dev-source-resolver-write-scope.json", COORDINATION_FIXTURE_ROOT);
  const requestPath = new URL("dev-source-resolver-cloud-request.json", COORDINATION_FIXTURE_ROOT);
  const scope = JSON.parse(readFileSync(scopePath, "utf8"));
  const request = JSON.parse(readFileSync(requestPath, "utf8"));
  const sortedPaths = [...scope.paths].sort((left, right) => Buffer.from(left).compare(Buffer.from(right)));
  const expectedDeclaredScope = [
    ...scope.paths.map(relativePath => `path:${relativePath}`),
    `semantic:${scope.semanticScope}`,
  ].sort((left, right) => Buffer.from(left).compare(Buffer.from(right)));

  assert.deepEqual(validateArtifact(scope, ".coordination/dev-source-resolver-write-scope.json"), []);
  assert.deepEqual(validateArtifact(request, ".coordination/dev-source-resolver-cloud-request.json"), []);
  assert.deepEqual(scope.paths, sortedPaths);
  assert.deepEqual(request.declaredWriteScope, expectedDeclaredScope);
});

test("CI materializes its exact admitted current-authority pair", () => {
  const scopePath = new URL("git-guidelines-companion-ci-authority-write-scope.json", COORDINATION_FIXTURE_ROOT);
  const authorityPath = new URL("git-guidelines-companion-ci-authority-cloud-authority.json", COORDINATION_FIXTURE_ROOT);
  const scope = JSON.parse(readFileSync(scopePath, "utf8"));
  const authority = JSON.parse(readFileSync(authorityPath, "utf8"));
  const { result } = authority;
  const expectedDeclaredScope = [
    ...scope.paths.map(relativePath => `path:${relativePath}`),
    `semantic:${scope.semanticScope}`,
  ].sort((left, right) => Buffer.from(left).compare(Buffer.from(right)));

  assert.deepEqual(validateArtifact(scope, ".coordination/git-guidelines-companion-ci-authority-write-scope.json"), []);
  assert.equal(authority.targetRepository, "huijoohwee/huijoohwee.github.io");
  assert.equal(result.schema, "agentic-cloud-collaboration-result/v1");
  assert.equal(result.ok, true);
  assert.equal(result.action, "claim");
  assert.equal(result.claim.state, "active");
  assert.equal(result.claimDigest, result.claim.fenceRevision);
  assert.deepEqual(result.claim.declaredWriteScope, expectedDeclaredScope);
});

test("the existing repository-owned accepted claim path remains exact", () => {
  const claim = cloudResult({
    declaredWriteScope: ["path:scripts/worktree-policy.mjs", "semantic:dev-source-resolver"],
    leaseEpoch: 1,
    expiresAt: "2026-08-05T00:00:00.000Z",
  });
  assert.deepEqual(validateArtifact(claim, ".coordination/dev-source-resolver-cloud-claim.json"), []);
  assert.ok(validateArtifact(claim, ".coordination/another-cloud-claim.json").some(problem => problem.includes("Filename must be dev-source-resolver-claim.json")));
});

test("artifact conformance consumes the runtime scope and integration context", () => {
  const context = runtimeContext();
  const conformant = checkArtifacts(DOCUMENT, validArtifactSet(), undefined, context);
  assert.deepEqual(conformant.findings, []);
  assert.deepEqual(conformant.blockedOutcomes, []);

  const conflicted = {
    ...context,
    changedPaths: ["outside/file.mjs"],
    peerAuthorities: [runtimeAuthority("peer", "peer.json", ["path:src/runtime/child", "semantic:peer"])],
    publicationAuthorities: [runtimeAuthority("peer", "peer.json", ["path:src/runtime/child", "semantic:peer"])],
    integrationRequests: [
      { requestId: "later", dependencyClass: "implementation", leaseEpoch: 1, scopeId: "later" },
      { requestId: "first", dependencyClass: "control-contract", leaseEpoch: 1, scopeId: "first" },
    ],
    selectedIntegrationRequest: { requestId: "later", dependencyClass: "implementation", leaseEpoch: 1, scopeId: "later" },
    comparisonArtifacts: [{ relativePath: "peer.json" }],
    repositoryState: repositoryState(),
    evaluationTime: Date.parse("2100-01-01T00:00:00.000Z"),
  };
  const result = checkArtifacts(DOCUMENT, validArtifactSet(), undefined, conflicted);
  const { findings, blockedOutcomes } = result;
  assert.ok(findings.some(finding => finding.type === "concurrent-write-conflict" && finding.message.startsWith("claim-scope-overlap:")));
  assert.ok(findings.some(finding => finding.type === "out-of-scope-write" && finding.message.includes("outside/file.mjs")));
  assert.ok(findings.some(finding => finding.message.startsWith("publication-claim-failed:")));
  assert.ok(findings.some(finding => finding.message.startsWith("publication-scope-overlap:")));
  assert.ok(findings.some(finding => finding.message.startsWith("integration-order-violated:")));
  assert.equal(blockedOutcomes.length, findings.length);
  assert.deepEqual(new Set(blockedOutcomes.map(outcome => outcome.blockingCondition)), new Set([
    "claim-scope-overlap",
    "scope-containment-violated",
    "publication-claim-failed",
    "integration-order-violated",
  ]));
  assert.ok(blockedOutcomes.every(outcome => outcome.unchanged && validateBlockedOutcome(outcome).length === 0));

  const report = buildReport({
    findings,
    inputStatus: Object.freeze({ runtime: "ok" }),
    registrationReady: true,
    blockedOutcomes,
  });
  assert.equal(report.verdict, "not-conformant");
  assert.equal(report.blockedOutcomes.length, findings.length);
  assert.ok(report.blockedOutcomes.every(outcome => outcome.unchanged));

  const claimless = checkArtifacts(DOCUMENT, validArtifactSet(), undefined, {
    ...context,
    currentAuthority: null,
    changedPaths: ["src/runtime/index.mjs"],
    repositoryState: repositoryState(),
  });
  assert.ok(claimless.findings.some(finding => finding.message.startsWith("claim-absent:")));
  assert.equal(claimless.blockedOutcomes.length, claimless.findings.length);
  assert.ok(claimless.blockedOutcomes.some(outcome => outcome.blockingCondition === "claim-absent"));
  assert.ok(claimless.blockedOutcomes.every(outcome => validateBlockedOutcome(outcome).length === 0));
});

function validArtifactSet({ claimEpoch = 1, claimPath = "src/a.mjs", requestExpiry = "2026-08-05T00:00:00.000Z" } = {}) {
  const semanticScope = "scope";
  const requestScope = ["path:src/a.mjs", `semantic:${semanticScope}`];
  const claimScope = [`path:${claimPath}`, `semantic:${semanticScope}`];
  const scope = { schema: "agentic-declared-write-scope/v1", semanticScope, paths: ["src/a.mjs"] };
  const request = {
    schema: "agentic-cloud-collaboration-request/v1",
    targetRepository: "example/repository",
    workItemId: "work-item:scope",
    canonicalBaseRevision: "a".repeat(40),
    laneRevision: "b".repeat(40),
    declaredWriteScope: requestScope,
    leaseEpoch: 1,
    expiresAt: requestExpiry,
    deviceId: "device",
    sessionId: "session",
    actorId: "actor",
  };
  const result = cloudResult({ declaredWriteScope: claimScope, leaseEpoch: claimEpoch, expiresAt: requestExpiry });
  const manifest = { schema: "agentic-change-manifest/v1", branch: "agent/device/scope", baseSha: "a".repeat(40), paths: ["src/a.mjs"] };
  const recoveryDraft = {
    schema: "agentic-legacy-dirty-lane-recovery/v1",
    captureProfile: "tracked-and-untracked",
    sourceWorktree: "/tmp/source",
    sourceBranch: "agent/device/scope",
    sourceHeadSha: "b".repeat(40),
    protectedTipSha: "a".repeat(40),
    operatorSessionId: "session",
    capturedAt: "2026-08-04T00:00:00.000Z",
    stateDigest: "1".repeat(64),
    writeSetDigest: "2".repeat(64),
    trackedPatchDigest: "3".repeat(64),
    tracked: [],
    untracked: [],
  };
  const recovery = { ...recoveryDraft, packageDigest: digestValue(recoveryDraft) };
  return [
    artifact(".coordination/scope-write-scope.json", scope),
    artifact(".coordination/scope-request.json", request),
    artifact(".coordination/scope-claim.json", result),
    artifact(".agentic-manifests/scope.json", manifest),
    artifact(".recovery/scope-20260804T0000Z/manifest.json", recovery),
    { path: ".recovery/scope-20260804T0000Z/.complete", relativePath: ".recovery/scope-20260804T0000Z/.complete", bytes: Buffer.alloc(0) },
  ];
}

function cloudResult({ declaredWriteScope, leaseEpoch, expiresAt }) {
  const providerDraft = {
    schema: "agentic-cloud-collaboration-github-receipt/v1",
    action: "claim",
    ledgerRevision: "c".repeat(40),
    ledgerDigest: "4".repeat(64),
    claimId: "6".repeat(64),
    claimDigest: "7".repeat(64),
    contractReceiptDigest: "8".repeat(64),
    sequence: 1,
    evaluationTime: "2026-08-04T00:00:00.000Z",
  };
  const provider = { ...providerDraft, receiptDigest: digestValue(providerDraft) };
  return {
    schema: "agentic-cloud-collaboration-result/v1",
    ok: true,
    action: "claim",
    status: "active",
    replayed: false,
    attempts: 1,
    ledgerRevision: provider.ledgerRevision,
    claim: {
      claimId: provider.claimId,
      state: "active",
      actorId: "actor",
      repositoryId: "repository",
      workItemId: "work-item:scope",
      canonicalBaseRevision: "a".repeat(40),
      laneRevision: "b".repeat(40),
      declaredWriteScope,
      writeSetDigest: digestValue(declaredWriteScope),
      leaseEpoch,
      transitionCounter: 1,
      heartbeatCounter: 0,
      reviewRequestId: null,
      expiresAt,
      fenceRevision: provider.claimDigest,
      transitionDigest: provider.ledgerDigest,
    },
    claimDigest: provider.claimDigest,
    receipt: provider,
  };
}

function runtimeContext() {
  const currentAuthority = runtimeAuthority("current", "current.json", ["path:src/runtime", "semantic:current"]);
  return Object.freeze({
    currentAuthority,
    peerAuthorities: Object.freeze([runtimeAuthority("peer", "peer.json", ["path:docs", "semantic:peer"])]),
    changedPaths: Object.freeze(["src/runtime/index.mjs"]),
    publicationAuthorities: Object.freeze([runtimeAuthority("peer", "peer.json", ["path:docs", "semantic:peer"])]),
    integrationRequests: Object.freeze([]),
    selectedIntegrationRequest: null,
    evaluationTime: 0,
    comparisonArtifacts: Object.freeze([{ relativePath: "peer.json" }]),
  });
}

function runtimeAuthority(authorityId, artifactPath, declaredWriteScope) {
  return Object.freeze({
    authorityId,
    artifactPath,
    declaredWriteScope: Object.freeze(declaredWriteScope),
    state: "active",
    expiresAt: "2099-01-01T00:00:00.000Z",
    fenceRevision: "f".repeat(64),
    acceptedFenceRevision: "f".repeat(64),
  });
}

function artifact(relativePath, value) {
  return { path: relativePath, relativePath, bytes: Buffer.from(JSON.stringify(value), "utf8") };
}

function repositoryState() {
  return Object.freeze({
    head: "1".repeat(64),
    index: "2".repeat(64),
    working: "3".repeat(64),
    untracked: "4".repeat(64),
  });
}

function messages(result) { return result.findings.map(finding => finding.message); }
