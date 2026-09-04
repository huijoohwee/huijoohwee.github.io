import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { resolveInputs } from "../../lib/git-guidelines/input-resolver.mjs";

export function createFixture() {
  const workspaceRoot = mkdtempSync(path.join(os.tmpdir(), "git-guidelines-inputs-"));
  const repository = path.join(workspaceRoot, "repository");
  const acosRoot = path.join(workspaceRoot, "agentic-canvas-os");
  const coordinationRoot = path.join(workspaceRoot, ".coordination");
  const scope = "git-guidelines-companion-implementation";
  mkdirSync(repository, { recursive: true });
  mkdirSync(path.join(acosRoot, "docs"), { recursive: true });
  mkdirSync(coordinationRoot, { recursive: true });
  for (const relative of [
    "docs/documents/git-guidelines.md",
    "guidelines/adlc-guidelines.md",
    "guidelines/prd-tad-adr-guidelines.md",
    "guidelines/prd-tad-adr-verification.md",
    "guidelines/adlc-cloud-collaboration.md",
    "guidelines/adlc-scoped-lane-admission.md",
    "guidelines/commit-push-deploy-guidelines.md",
  ]) writeText(path.join(repository, relative), `${relative}\n`);
  for (const relative of [
    "docs/README.md",
    "docs/DICTIONARY-COMMAND.md",
    "docs/DICTIONARY-SEMANTIC.md",
    "docs/DICTIONARY-BINDING.md",
  ]) writeText(path.join(acosRoot, relative), `${relative}\n`);
  runGit(repository, ["init", "-q"]);
  runGit(repository, ["config", "user.name", "Input Resolver Test"]);
  runGit(repository, ["config", "user.email", "input-resolver@example.invalid"]);
  runGit(repository, ["checkout", "-q", "-b", `agent/test/${scope}`]);
  runGit(repository, ["add", "."]);
  runGit(repository, ["commit", "-q", "-m", "test: seed input resolver fixture"]);
  runGit(repository, ["remote", "add", "origin", "https://example.invalid/repository.git"]);
  const head = runGit(repository, ["rev-parse", "HEAD"]).trim();
  const scopePath = path.join(coordinationRoot, `${scope}-write-scope.json`);
  const authorityPath = path.join(coordinationRoot, `${scope}-cloud-authority.json`);
  writeJson(scopePath, {
    schema: "agentic-declared-write-scope/v1",
    semanticScope: scope,
    paths: ["docs/documents/git-guidelines.md", "scripts/lib/git-guidelines"],
  });
  const fixture = { workspaceRoot, repository, acosRoot, coordinationRoot, scope, scopePath, authorityPath, head };
  writeAuthority(fixture);
  writeJson(path.join(coordinationRoot, "dev-source-resolver-write-scope.json"), {
    schema: "agentic-declared-write-scope/v1",
    semanticScope: "dev-source-resolver",
    paths: ["scripts/__tests__/worktree-policy.test.mjs", "scripts/worktree-policy.mjs"],
  });
  writeJson(path.join(coordinationRoot, "dev-source-resolver-cloud-request.json"), {
    schema: "agentic-cloud-collaboration-request/v1",
    targetRepository: "example/repository",
    workItemId: "work-item:input-resolver-test",
    canonicalBaseRevision: head,
    laneRevision: head,
    declaredWriteScope: [
      "path:scripts/__tests__/worktree-policy.test.mjs",
      "path:scripts/worktree-policy.mjs",
      "semantic:dev-source-resolver",
    ],
    leaseEpoch: 1,
    expiresAt: "2026-08-05T12:00:00.000Z",
    deviceId: "test-device",
    sessionId: "test-session",
    actorId: "test-actor",
  });
  return fixture;
}

export function writeAuthority(fixture, claimOverrides = {}, wrapperOverrides = {}) {
  const claimDigest = "d".repeat(64);
  const claim = {
    canonicalBaseRevision: fixture.head,
    laneRevision: fixture.head,
    leaseEpoch: 1,
    state: "active",
    declaredWriteScope: [
      "path:docs/documents/git-guidelines.md",
      "path:scripts/lib/git-guidelines",
      `semantic:${fixture.scope}`,
    ],
    fenceRevision: claimDigest,
    expiresAt: "2099-01-01T00:00:00.000Z",
    ...claimOverrides,
  };
  writeJson(fixture.authorityPath, {
    targetRepository: "example/repository",
    ...wrapperOverrides,
    result: {
      schema: "agentic-cloud-collaboration-result/v1",
      ok: true,
      action: "claim",
      status: "current",
      claimDigest,
      claim,
    },
  });
}

export function writeProtectedReviewAuthority(fixture, { leaseEpoch, baseRevision }) {
  const scopeId = fixture.scope;
  const branch = `agent/test/${scopeId}`;
  const declaredWriteScope = [
    "path:docs/documents/git-guidelines.md",
    "path:scripts/lib/git-guidelines",
    `semantic:${scopeId}`,
  ];
  const claimDigest = "7".repeat(64);
  const claimId = "6".repeat(64);
  const ledgerRevision = "c".repeat(40);
  const reviewRequestId = "github-pull-request:PR_input_resolver";
  const receiptCore = {
    schema: "agentic-cloud-collaboration-github-verification/v1",
    ok: true,
    ledgerRevision,
    ledgerDigest: "4".repeat(64),
    claimId,
    claimDigest,
    contractReceiptDigest: "8".repeat(64),
    evaluationTime: "2026-08-05T16:00:30.000Z",
    findings: [],
  };
  writeJson(fixture.authorityPath, {
    ledgerRepository: "huijoohwee/agentic-canvas-os",
    reviewRequestId,
    scopeId,
    targetRepository: "example/repository",
    verificationMode: "protected-review",
    result: {
      schema: "agentic-cloud-collaboration-result/v1",
      ok: true,
      action: "verify",
      status: "ready",
      ledgerRevision,
      claimDigest,
      claim: {
        claimId,
        state: "reviewed",
        writeAuthority: false,
        scopeReserved: true,
        canonicalBaseRevision: baseRevision,
        laneRevision: fixture.head,
        declaredWriteScope,
        writeSetDigest: sha256(JSON.stringify(declaredWriteScope)),
        leaseEpoch,
        reviewRequestId,
        expiresAt: "2099-01-01T00:00:00.000Z",
        fenceRevision: claimDigest,
        operationReceiptDigest: "9".repeat(64),
      },
      subject: {
        repository: "example/repository",
        pullRequestNumber: 17,
        branch,
        headSha: fixture.head,
        canonicalBaseSha: baseRevision,
      },
      findings: [],
      receipt: { ...receiptCore, receiptDigest: digestValue(receiptCore) },
    },
  });
}

export function writePeerAuthority(fixture, { scopeId, requestId, dependencyClass }) {
  const claimDigest = "c".repeat(64);
  writeJson(path.join(fixture.coordinationRoot, `${scopeId}-cloud-authority.json`), {
    targetRepository: "example/repository",
    integrationRequest: integrationRequest(requestId, dependencyClass, scopeId, 1),
    result: {
      schema: "agentic-cloud-collaboration-result/v1",
      ok: true,
      action: "claim",
      status: "current",
      claimDigest,
      claim: {
        claimId: "b".repeat(64),
        canonicalBaseRevision: fixture.head,
        laneRevision: fixture.head,
        declaredWriteScope: ["path:scripts/lib/git-guidelines", `semantic:${scopeId}`],
        leaseEpoch: 1,
        state: "active",
        fenceRevision: claimDigest,
        expiresAt: "2099-01-01T00:00:00.000Z",
      },
    },
  });
}

export function integrationRequest(requestId, dependencyClass, scopeId, leaseEpoch) {
  return { requestId, dependencyClass, scopeId, leaseEpoch };
}

function digestValue(value) {
  return sha256(canonicalJson(value));
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function canonicalJson(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
}

export function resolveFixture(fixture, overrides = {}) {
  return resolveInputs({
    repositoryRoot: fixture.repository,
    acosRoot: fixture.acosRoot,
    workspaceRoot: fixture.workspaceRoot,
    expectedBaseRevision: fixture.head,
    probeRemote: false,
    ...overrides,
  });
}

export function resolveDefaultFixture(fixture, overrides = {}) {
  return resolveInputs({
    repositoryRoot: fixture.repository,
    acosRoot: fixture.acosRoot,
    expectedBaseRevision: fixture.head,
    probeRemote: false,
    ...overrides,
  });
}

export function assertProblem(inputs, code, condition, expectedPath) {
  const problem = inputs.problems.find(candidate => candidate.code === code && candidate.condition === condition && candidate.path === expectedPath);
  assert.ok(problem, `Expected ${code} for ${expectedPath}; received ${JSON.stringify(inputs.problems)}`);
  assert.equal(inputs.inputStatus[problem.inputId], condition);
  return problem;
}

export function writeText(file, contents) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, contents);
}

export function writeJson(file, value) {
  writeText(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function runGit(root, argumentsList, input = undefined) {
  return execFileSync("git", argumentsList, {
    cwd: root, encoding: "utf8", input, stdio: ["pipe", "pipe", "pipe"],
  });
}

export function byteCompare(left, right) {
  return Buffer.from(left).compare(Buffer.from(right));
}
