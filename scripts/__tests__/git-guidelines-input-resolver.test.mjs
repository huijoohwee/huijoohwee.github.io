import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

import { INPUT_BOUNDS, resolveInputs } from "../lib/git-guidelines/input-resolver.mjs";
import { createInputRuntime, git as runBoundedGit } from "../lib/git-guidelines/input-runtime.mjs";

import {
  createFixture, writeAuthority, writeProtectedReviewAuthority, writePeerAuthority, integrationRequest, resolveFixture,
  resolveDefaultFixture, assertProblem, writeText, writeJson, runGit, byteCompare
} from "./helpers/git-guidelines-input-fixture.mjs";

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

test("resolver binds a two-hop protected-main refresh chain to exact merge trees and authority", () => {
  const fixture = createFixture();
  const branch = `agent/test/${fixture.scope}`;
  const commonBase = fixture.head;
  const subject = `fix(${fixture.scope}): refresh protected main`;
  const parentMessage = `${subject}\n\nPreserve the attributed candidate while refreshing protected main.\n\nAgentic-Task: ${fixture.scope}\nAgentic-Scope: ${fixture.scope}\nAgentic-Lease-Epoch: 61\nAgentic-Mechanism: Codex test fixture\n`;

  writeText(path.join(fixture.repository, "candidate.txt"), "candidate\n");
  runGit(fixture.repository, ["add", "candidate.txt"]);
  runGit(fixture.repository, ["commit", "-q", "-F", "-"], parentMessage);
  const terminalRevision = runGit(fixture.repository, ["rev-parse", "HEAD"]).trim();

  runGit(fixture.repository, ["checkout", "-q", "-b", "main", commonBase]);
  writeText(path.join(fixture.repository, "protected-one.txt"), "protected one\n");
  runGit(fixture.repository, ["add", "protected-one.txt"]);
  runGit(fixture.repository, ["commit", "-q", "-m", "docs(protected-main): first protected advance"]);
  const olderProtectedRevision = runGit(fixture.repository, ["rev-parse", "HEAD"]).trim();

  runGit(fixture.repository, ["checkout", "-q", branch]);
  runGit(fixture.repository, ["merge", "--no-ff", "-q", "-m", subject, "main"]);
  const intermediateRevision = runGit(fixture.repository, ["rev-parse", "HEAD"]).trim();

  runGit(fixture.repository, ["checkout", "-q", "main"]);
  writeText(path.join(fixture.repository, "protected-two.txt"), "protected two\n");
  runGit(fixture.repository, ["add", "protected-two.txt"]);
  runGit(fixture.repository, ["commit", "-q", "-m", "docs(protected-main): second protected advance"]);
  const protectedRevision = runGit(fixture.repository, ["rev-parse", "HEAD"]).trim();

  runGit(fixture.repository, ["checkout", "-q", branch]);
  runGit(fixture.repository, ["merge", "--no-ff", "-q", "-m", subject, "main"]);
  fixture.head = runGit(fixture.repository, ["rev-parse", "HEAD"]).trim();
  writeProtectedReviewAuthority(fixture, { leaseEpoch: 3, baseRevision: protectedRevision });

  const inputs = resolveFixture(fixture, {
    expectedBaseRevision: protectedRevision,
    expectedProtectedRevision: protectedRevision,
  });
  const proof = inputs.gitFacts.refreshChain;
  assert.equal(proof.expectedProtectedRevision, protectedRevision);
  assert.equal(proof.maximumHops, 16);
  assert.equal(proof.truncated, false);
  assert.equal(proof.objectFailure, false);
  assert.equal(proof.nodes.length, 3);
  assert.deepEqual(proof.nodes[0].parents, [intermediateRevision, protectedRevision]);
  assert.equal(proof.nodes[0].tree, proof.nodes[0].expectedMergeTree);
  assert.deepEqual(proof.nodes[0].protectedLineageBases, []);
  assert.deepEqual(proof.nodes[1].parents, [terminalRevision, olderProtectedRevision]);
  assert.equal(proof.nodes[1].tree, proof.nodes[1].expectedMergeTree);
  assert.deepEqual(proof.nodes[1].mergeBases, [commonBase]);
  assert.deepEqual(proof.nodes[1].protectedLineageBases, [olderProtectedRevision]);
  assert.equal(proof.nodes[2].revision, terminalRevision);
  assert.equal(proof.nodes[2].message.trimEnd(), parentMessage.trimEnd());
  assert.deepEqual(inputs.gitFacts.refreshAuthority, {
    laneRevision: fixture.head,
    leaseEpoch: 3,
    scopeId: fixture.scope,
  });

  const unbound = resolveFixture(fixture, {
    expectedBaseRevision: protectedRevision,
    expectedProtectedRevision: "f".repeat(40),
  });
  assert.equal(unbound.gitFacts.refreshChain.expectedProtectedRevision, null);
  assert.deepEqual(unbound.gitFacts.refreshChain.nodes, []);

  writeAuthority(fixture, { leaseEpoch: 3, canonicalBaseRevision: protectedRevision });
  const ordinaryClaim = resolveFixture(fixture, {
    expectedBaseRevision: protectedRevision,
    expectedProtectedRevision: protectedRevision,
  });
  assert.deepEqual(ordinaryClaim.problems, []);
  assert.equal(ordinaryClaim.gitFacts.refreshAuthority, null);
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
