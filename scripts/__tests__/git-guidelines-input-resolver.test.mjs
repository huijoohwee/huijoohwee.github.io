import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { INPUT_BOUNDS, resolveInputs } from "../lib/git-guidelines/input-resolver.mjs";
import { createInputRuntime, git as runBoundedGit } from "../lib/git-guidelines/input-runtime.mjs";

const checker = new URL("../check-git-guidelines.mjs", import.meta.url).pathname;

test("explicit workspace resolution observes Task 19 inputs and deduplicates current-scope artifacts", () => {
  const fixture = createFixture();
  const first = resolveFixture(fixture);
  const second = resolveFixture(fixture);
  assert.deepEqual(first.problems, []);
  assert.deepEqual(first.inputStatus, second.inputStatus);
  assert.deepEqual(
    first.workspaceReferenceArtifacts.map(artifact => path.basename(artifact.path)),
    ["dev-source-resolver-cloud-request.json", "dev-source-resolver-write-scope.json"],
  );
  assert.ok(first.workspaceReferenceArtifacts.every(artifact => artifact.validationProblems.length === 0));
  assert.deepEqual(
    first.artifacts.map(artifact => path.basename(artifact.path)),
    [
      "dev-source-resolver-cloud-request.json",
      "dev-source-resolver-write-scope.json",
      `${fixture.scope}-write-scope.json`,
    ],
  );
  const observedPaths = first.workspaceArtifacts.map(artifact => artifact.path);
  assert.deepEqual(observedPaths, [...new Set(observedPaths)].sort(byteCompare));
});

test("default workspace discovery observes Task 19 inputs", () => {
  const fixture = createFixture();
  const inputs = resolveInputs({
    repositoryRoot: fixture.repository,
    acosRoot: fixture.acosRoot,
    expectedBaseRevision: fixture.head,
    probeRemote: false,
  });
  assert.equal(path.basename(inputs.workspaceRoot), path.basename(fixture.workspaceRoot));
  assert.deepEqual(
    inputs.workspaceReferenceArtifacts.map(artifact => path.basename(artifact.path)),
    ["dev-source-resolver-cloud-request.json", "dev-source-resolver-write-scope.json"],
  );
  assert.ok(inputs.workspaceReferenceArtifacts.every(reference => (
    inputs.artifacts.some(artifact => artifact.path === reference.path && artifact.bytes === reference.bytes)
  )));
  assert.deepEqual(inputs.problems, []);
});

test("default Task 19 references are required, raw, and fail closed", async t => {
  await t.test("missing reference produces status and exit 2", () => {
    const fixture = createFixture();
    const requestPath = path.join(fixture.coordinationRoot, "dev-source-resolver-cloud-request.json");
    rmSync(requestPath);
    const inputs = resolveDefaultFixture(fixture);
    const resolvedRequestPath = path.join(inputs.workspaceRoot, ".coordination", path.basename(requestPath));
    assertProblem(inputs, "input-absent", "absent", resolvedRequestPath);

    const result = spawnSync(process.execPath, [
      checker,
      `--repository=${fixture.repository}`,
      `--acos-root=${fixture.acosRoot}`,
      "--skip-remote-probe",
    ], { encoding: "utf8" });
    const report = JSON.parse(result.stdout);
    assert.equal(result.status, 2);
    assert.equal(report.exitStatus, 2);
    assert.match(report.findings[0].message, /input-absent.*dev-source-resolver-cloud-request/u);
  });

  await t.test("invalid reference retains raw bytes and records schema failure", () => {
    const fixture = createFixture();
    const scopePath = path.join(fixture.coordinationRoot, "dev-source-resolver-write-scope.json");
    writeJson(scopePath, { semanticScope: "dev-source-resolver", paths: ["scripts/worktree-policy.mjs"] });
    const inputs = resolveDefaultFixture(fixture);
    const resolvedScopePath = path.join(inputs.workspaceRoot, ".coordination", path.basename(scopePath));
    const problem = assertProblem(inputs, "input-unparseable", "unparseable", resolvedScopePath);
    assert.match(problem.message, /Unknown or missing artifact schema/u);
    const raw = inputs.artifacts.find(artifact => artifact.path === resolvedScopePath);
    assert.equal(typeof raw.bytes, "string");
    assert.match(raw.bytes, /dev-source-resolver/u);
    assert.equal(raw.condition, "unparseable");
    assert.ok(raw.validationProblems.some(message => /missing artifact schema/iu.test(message)));
  });
});

test("absent and unparseable current-lane inputs are named and fail closed", async t => {
  await t.test("absent authority", () => {
    const fixture = createFixture();
    rmSync(fixture.authorityPath);
    const inputs = resolveFixture(fixture);
    assertProblem(inputs, "input-absent", "absent", fixture.authorityPath);
  });

  await t.test("unparseable declared scope", () => {
    const fixture = createFixture();
    writeFileSync(fixture.scopePath, "{\n");
    const inputs = resolveFixture(fixture);
    assertProblem(inputs, "input-unparseable", "unparseable", fixture.scopePath);
  });
});

test("base, fence, and declared-scope drift produce deterministic stale findings", async t => {
  await t.test("protected base drift", () => {
    const fixture = createFixture();
    writeAuthority(fixture, { canonicalBaseRevision: "b".repeat(40) });
    const inputs = resolveFixture(fixture);
    const problem = assertProblem(inputs, "input-stale", "stale", fixture.authorityPath);
    assert.match(problem.message, /canonical base .* differs from protected base/u);
  });

  await t.test("accepted fence drift", () => {
    const fixture = createFixture();
    writeAuthority(fixture, { fenceRevision: "e".repeat(64) });
    const inputs = resolveFixture(fixture);
    const problem = assertProblem(inputs, "input-stale", "stale", fixture.authorityPath);
    assert.match(problem.message, /claim fence differs from the accepted claim digest/u);
  });

  await t.test("declared scope drift", () => {
    const fixture = createFixture();
    writeAuthority(fixture, { declaredWriteScope: ["path:outside-scope.txt", `semantic:${fixture.scope}`] });
    const first = resolveFixture(fixture);
    const second = resolveFixture(fixture);
    const problem = assertProblem(first, "input-stale", "stale", fixture.authorityPath);
    assert.match(problem.message, /write scope differs/u);
    assert.deepEqual(first.problems, second.problems);
  });

  await t.test("expired authority", () => {
    const fixture = createFixture();
    writeAuthority(fixture, { expiresAt: "2026-08-05T10:00:00.000Z" });
    const inputs = resolveFixture(fixture, {
      runtime: { now: () => Date.parse("2026-08-05T10:00:00.001Z") },
    });
    const problem = assertProblem(inputs, "input-stale", "stale", fixture.authorityPath);
    assert.match(problem.message, /authority expired/u);
  });
});

test("unreadable and over-bound inputs are deterministic without permission changes", async t => {
  await t.test("read failure", () => {
    const fixture = createFixture();
    const inputs = resolveFixture(fixture, {
      runtime: {
        readFile(file) {
          if (path.resolve(file) === fixture.authorityPath) {
            const error = new Error("injected read failure");
            error.code = "EACCES";
            throw error;
          }
          return readFileSync(file);
        },
      },
    });
    const problem = assertProblem(inputs, "input-unreadable", "unreadable", fixture.authorityPath);
    assert.match(problem.message, /injected read failure/u);
  });

  await t.test("artifact byte bound", () => {
    const fixture = createFixture();
    writeFileSync(fixture.scopePath, "x".repeat(INPUT_BOUNDS.artifactBytes + 1));
    const inputs = resolveFixture(fixture);
    const problem = assertProblem(inputs, "input-unreadable", "unreadable", fixture.scopePath);
    assert.match(problem.message, /byte bound/u);
  });
});

test("remote timeout is classified without opening a network connection", () => {
  const fixture = createFixture();
  let probeCalls = 0;
  const inputs = resolveFixture(fixture, {
    probeRemote: true,
    runtime: {
      probeRemote(repository, timeout) {
        probeCalls += 1;
        assert.equal(path.basename(repository), path.basename(fixture.repository));
        assert.equal(timeout, INPUT_BOUNDS.remoteProbeMilliseconds);
        return { status: null, error: { code: "ETIMEDOUT" } };
      },
    },
  });
  assert.equal(probeCalls, 1);
  assert.deepEqual({ ...inputs.gitFacts.remote, durationMs: 0 }, {
    state: "offline",
    remote: "https://example.invalid/repository.git",
    durationMs: 0,
    timedOut: true,
    probeBoundMilliseconds: 10_000,
    requiredRemoteBoundMilliseconds: 30_000,
    blockedChecks: [
      "configured-remote-reachability",
      "protected-base-freshness",
      "collaboration-fence-freshness",
    ],
  });
  assert.ok(inputs.gitFacts.remote.probeBoundMilliseconds < inputs.gitFacts.remote.requiredRemoteBoundMilliseconds);
});

test("configured remote probing is a default git fact", () => {
  const fixture = createFixture();
  let probeCalls = 0;
  const inputs = resolveInputs({
    repositoryRoot: fixture.repository,
    acosRoot: fixture.acosRoot,
    workspaceRoot: fixture.workspaceRoot,
    expectedBaseRevision: fixture.head,
    runtime: {
      probeRemote() {
        probeCalls += 1;
        return { status: 0 };
      },
    },
  });
  assert.equal(probeCalls, 1);
  assert.equal(inputs.gitFacts.remote.state, "online");
});

test("local git commands receive the remaining verdict deadline", () => {
  let commandTime = 100;
  const observed = [];
  const runtime = createInputRuntime({
    commandNow: () => commandTime,
    git(_cwd, _argumentsList, _optional, timeout) {
      observed.push(timeout);
      return { status: 0, stdout: "ok", stderr: "" };
    },
  }, 1_000);
  commandTime = 400;
  assert.equal(runBoundedGit(runtime, "/tmp/repository", ["status"]), "ok");
  commandTime = 1_200;
  assert.equal(runBoundedGit(runtime, "/tmp/repository", ["status"]), "ok");
  assert.deepEqual(observed, [700, 1]);
});

test("local git deadline failures preserve the timeout classification", () => {
  const runtime = createInputRuntime({
    git() { return { status: null, stdout: "", stderr: "deadline", error: { code: "ETIMEDOUT" } }; },
  }, 1);
  assert.throws(
    () => runBoundedGit(runtime, "/tmp/repository", ["status"]),
    error => error.code === "ETIMEDOUT" && /deadline/u.test(error.message),
  );
});

test("the 60-second input bound is explicit and degrades the input set", () => {
  const fixture = createFixture();
  let clockReads = 0;
  const inputs = resolveFixture(fixture, {
    runtime: {
      now() {
        clockReads += 1;
        return clockReads === 1 ? 0 : INPUT_BOUNDS.verdictMilliseconds + 1;
      },
    },
  });
  assert.equal(inputs.limits.boundExceeded, true);
  assertProblem(inputs, "input-unreadable", "unreadable", inputs.repo);
});

test("large retained non-JSON bundles are not treated as bounded schema artifacts", () => {
  const fixture = createFixture();
  const bundle = path.join(fixture.repository, ".backups", "preserved.bundle");
  writeText(bundle, "x".repeat(INPUT_BOUNDS.artifactBytes + 1));
  const inputs = resolveFixture(fixture);
  assert.deepEqual(inputs.problems, []);
  assert.equal(inputs.artifacts.some(artifact => artifact.path === bundle), false);
  const retained = inputs.retainedArtifacts.find(artifact => path.basename(artifact.path) === path.basename(bundle));
  assert.equal(retained.byteLength, INPUT_BOUNDS.artifactBytes + 1);
  assert.match(retained.digest, /^[0-9a-f]{64}$/u);
  assert.equal(Object.isFrozen(retained), true);
});

test("required repository JSON without a declared schema is unparseable", () => {
  const fixture = createFixture();
  const artifact = path.join(fixture.repository, ".coordination", "missing-schema.json");
  writeJson(artifact, { value: true });
  const inputs = resolveFixture(fixture);
  const problem = assertProblem(inputs, "input-unparseable", "unparseable", path.join(inputs.repo, ".coordination", "missing-schema.json"));
  assert.match(problem.message, /missing artifact schema/iu);
});

test("current authority deterministically selects its pending integration request in the assembled CLI", () => {
  const fixture = createFixture();
  writeAuthority(fixture, {}, {
    integrationRequest: integrationRequest("selected-current", "implementation", fixture.scope, 1),
  });
  writePeerAuthority(fixture, {
    scopeId: "control-contract-peer",
    requestId: "earlier-control",
    dependencyClass: "control-contract",
  });

  const inputs = resolveFixture(fixture);
  assert.deepEqual(inputs.runtimeContext.integrationRequests.map(request => request.requestId), [
    "earlier-control", "selected-current",
  ]);
  assert.equal(inputs.runtimeContext.selectedIntegrationRequest.requestId, "selected-current");
  assert.equal(inputs.runtimeContext.selectedIntegrationRequest.scopeId, fixture.scope);

  const result = spawnSync(process.execPath, [
    checker,
    `--repository=${fixture.repository}`,
    `--acos-root=${fixture.acosRoot}`,
    `--workspace-root=${fixture.workspaceRoot}`,
    "--skip-remote-probe",
  ], { encoding: "utf8" });
  const report = JSON.parse(result.stdout);
  assert.ok(report.findings.some(finding => finding.message.startsWith("integration-order-violated:")));
  assert.ok(report.blockedOutcomes.some(outcome => (
    outcome.blockingCondition === "integration-order-violated" && outcome.unchanged === true
  )));
});

test("checker maps a required workspace input failure to exit 2 without running families", () => {
  const fixture = createFixture();
  rmSync(fixture.authorityPath);
  const result = spawnSync(process.execPath, [
    checker,
    `--repository=${fixture.repository}`,
    `--acos-root=${fixture.acosRoot}`,
    `--workspace-root=${fixture.workspaceRoot}`,
    "--skip-remote-probe",
  ], { encoding: "utf8" });
  const report = JSON.parse(result.stdout);
  assert.equal(result.status, 2);
  assert.equal(report.exitStatus, 2);
  assert.equal(report.verdict, "not-conformant");
  assert.equal(report.findingTotal, 1);
  assert.match(report.findings[0].message, /input-absent.*cloud-authority/u);
});

test("checker CLI binds the expected base and accepted fence", () => {
  const fixture = createFixture();
  const result = spawnSync(process.execPath, [
    checker,
    `--repository=${fixture.repository}`,
    `--acos-root=${fixture.acosRoot}`,
    `--workspace-root=${fixture.workspaceRoot}`,
    `--expected-base-revision=${fixture.head}`,
    `--accepted-fence-revision=${"e".repeat(64)}`,
    "--skip-remote-probe",
  ], { encoding: "utf8" });
  const report = JSON.parse(result.stdout);
  assert.equal(result.status, 2);
  assert.equal(report.findings[0].ruleId, "coordination-artifacts#28");
  assert.match(report.findings[0].message, /input-stale.*differs from accepted fence/u);
});

test("checker maps an unreachable local remote to exit 3 and names blocked checks", () => {
  const fixture = createFixture();
  runGit(fixture.repository, ["remote", "set-url", "origin", path.join(fixture.workspaceRoot, "absent-remote.git")]);
  const result = spawnSync(process.execPath, [
    checker,
    `--repository=${fixture.repository}`,
    `--acos-root=${fixture.acosRoot}`,
    `--workspace-root=${fixture.workspaceRoot}`,
    "--probe-remote",
  ], { encoding: "utf8" });
  const report = JSON.parse(result.stdout);
  const remoteFinding = report.findings.find(finding => /remote-unreachable/u.test(finding.message));
  assert.equal(result.status, 3);
  assert.equal(remoteFinding.ruleId, "verification-gates#6");
  assert.match(remoteFinding.message, /configured-remote-reachability.*30-second required-remote upper bound/u);
});

function createFixture() {
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
    "guidelines/agentic-sdlc-guidelines.md",
    "guidelines/prd-tad-adr-guidelines.md",
    "guidelines/agentic-sdlc-cloud-collaboration.md",
    "guidelines/agentic-sdlc-scoped-lane-admission.md",
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

function writeAuthority(fixture, claimOverrides = {}, wrapperOverrides = {}) {
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

function writePeerAuthority(fixture, { scopeId, requestId, dependencyClass }) {
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

function integrationRequest(requestId, dependencyClass, scopeId, leaseEpoch) {
  return { requestId, dependencyClass, scopeId, leaseEpoch };
}

function resolveFixture(fixture, overrides = {}) {
  return resolveInputs({
    repositoryRoot: fixture.repository,
    acosRoot: fixture.acosRoot,
    workspaceRoot: fixture.workspaceRoot,
    expectedBaseRevision: fixture.head,
    probeRemote: false,
    ...overrides,
  });
}

function resolveDefaultFixture(fixture, overrides = {}) {
  return resolveInputs({
    repositoryRoot: fixture.repository,
    acosRoot: fixture.acosRoot,
    expectedBaseRevision: fixture.head,
    probeRemote: false,
    ...overrides,
  });
}

function assertProblem(inputs, code, condition, expectedPath) {
  const problem = inputs.problems.find(candidate => candidate.code === code && candidate.condition === condition && candidate.path === expectedPath);
  assert.ok(problem, `Expected ${code} for ${expectedPath}; received ${JSON.stringify(inputs.problems)}`);
  assert.equal(inputs.inputStatus[problem.inputId], condition);
  return problem;
}

function writeText(file, contents) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, contents);
}

function writeJson(file, value) {
  writeText(file, `${JSON.stringify(value, null, 2)}\n`);
}

function runGit(root, argumentsList) {
  return execFileSync("git", argumentsList, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

function byteCompare(left, right) {
  return Buffer.from(left).compare(Buffer.from(right));
}
