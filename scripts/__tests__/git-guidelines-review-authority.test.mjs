import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  PROTECTED_REVIEW_VERIFICATION_MODE,
  projectProtectedReviewAuthority,
  validateProtectedReviewAuthority,
  validateProtectedReviewContinuity,
} from "../lib/git-guidelines/review-authority.mjs";
import { resolveArtifactInputs } from "../lib/git-guidelines/input-artifacts.mjs";
import { createInputRuntime } from "../lib/git-guidelines/input-runtime.mjs";
import { publishProtectedReviewProjection } from "../materialize-git-guidelines-review-authority.mjs";

const materializer = new URL("../materialize-git-guidelines-review-authority.mjs", import.meta.url).pathname;

test("exact reviewed pull-request verification projects the current-lane pair", () => {
  const event = validEvent();
  const verification = validVerification();
  const projection = projectProtectedReviewAuthority({
    event,
    verification,
    evaluationTime: Date.parse("2026-08-05T16:00:31.000Z"),
  });

  assert.equal(projection.semanticScope, "review-authority-scope");
  assert.equal(projection.writeScopeFileName, "review-authority-scope-write-scope.json");
  assert.equal(projection.authorityFileName, "review-authority-scope-cloud-authority.json");
  assert.deepEqual(projection.writeScope, {
    schema: "agentic-declared-write-scope/v1",
    semanticScope: "review-authority-scope",
    paths: ["docs/guide.md", "scripts/review.mjs"],
  });
  assert.equal(projection.authority.verificationMode, PROTECTED_REVIEW_VERIFICATION_MODE);
  assert.equal(projection.authority.result, verification);
  assert.deepEqual(validateProtectedReviewAuthority(projection.authority, {
    evaluationTime: Date.parse("2026-08-05T16:00:31.000Z"),
  }), []);
});

test("legacy reviewed pull-request verification accepts path-only claim scope", () => {
  const event = validEvent();
  const verification = validVerification({
    declaredWriteScope: [
      "path:docs/guide.md",
      "path:scripts/review.mjs",
    ],
  });
  const projection = projectProtectedReviewAuthority({
    event,
    verification,
    evaluationTime: Date.parse("2026-08-05T16:00:31.000Z"),
  });

  assert.deepEqual(projection.writeScope, {
    schema: "agentic-declared-write-scope/v1",
    semanticScope: "review-authority-scope",
    paths: ["docs/guide.md", "scripts/review.mjs"],
  });
  assert.deepEqual(validateProtectedReviewAuthority(projection.authority, {
    evaluationTime: Date.parse("2026-08-05T16:00:31.000Z"),
  }), []);
});

test("integrated-preserved verification projects one exact protected refresh event", () => {
  const verification = validVerification();
  verification.claim.state = "integrated-preserved";
  verification.claim.integrationReceiptDigest = "2".repeat(64);
  verification.claim.integration = {
    candidateRevision: verification.claim.laneRevision,
    reviewRequestId: verification.claim.reviewRequestId,
  };
  verification.subject.headSha = "d".repeat(40);
  verification.subject.canonicalBaseSha = "e".repeat(40);
  const event = validEvent({
    headSha: verification.subject.headSha,
    baseSha: verification.subject.canonicalBaseSha,
  });

  const projection = projectProtectedReviewAuthority({ event, verification });
  assert.deepEqual(validateProtectedReviewAuthority(projection.authority), []);
});

test("integrated-preserved verification rejects missing or drifted integration evidence", () => {
  const verification = validVerification();
  verification.claim.state = "integrated-preserved";
  verification.subject.headSha = "d".repeat(40);
  verification.subject.canonicalBaseSha = "e".repeat(40);
  const event = validEvent({
    headSha: verification.subject.headSha,
    baseSha: verification.subject.canonicalBaseSha,
  });
  assert.throws(
    () => projectProtectedReviewAuthority({ event, verification }),
    /integration receipt/u,
  );
});

test("automatic workspace discovery selects only a valid protected-review authority", t => {
  const workspaceRoot = mkdtempSync(path.join(os.tmpdir(), "git-guidelines-review-input-"));
  t.after(() => rmSync(workspaceRoot, { recursive: true, force: true }));
  const repository = path.join(workspaceRoot, "repository");
  const coordinationRoot = path.join(workspaceRoot, ".coordination");
  const branch = "agent/device/review-authority-scope";
  mkdirSync(path.join(repository, "docs"), { recursive: true });
  mkdirSync(path.join(repository, "scripts"), { recursive: true });
  mkdirSync(coordinationRoot);
  writeFileSync(path.join(repository, "docs/guide.md"), "guide\n");
  writeFileSync(path.join(repository, "scripts/review.mjs"), "export {};\n");
  runGit(repository, ["init", "-q"]);
  runGit(repository, ["config", "user.name", "Review Authority Test"]);
  runGit(repository, ["config", "user.email", "review-authority@example.invalid"]);
  runGit(repository, ["checkout", "-q", "-b", branch]);
  runGit(repository, ["add", "."]);
  runGit(repository, ["commit", "-q", "-m", "test: seed review authority"]);
  const head = runGit(repository, ["rev-parse", "HEAD"]).trim();
  const event = validEvent({ branch, baseSha: head, headSha: head });
  const projection = projectProtectedReviewAuthority({
    event,
    verification: validVerification({ branch, baseSha: head, headSha: head }),
  });
  writeJson(path.join(coordinationRoot, projection.writeScopeFileName), projection.writeScope);
  writeJson(path.join(coordinationRoot, projection.authorityFileName), projection.authority);
  for (const name of [
    "dev-source-resolver-cloud-request.json",
    "dev-source-resolver-write-scope.json",
  ]) {
    writeFileSync(
      path.join(coordinationRoot, name),
      readFileSync(new URL(`./fixtures/coordination/${name}`, import.meta.url)),
    );
  }
  const resolve = () => {
    const problems = [];
    const statuses = new Map();
    const result = resolveArtifactInputs({
      runtime: createInputRuntime({
        now: () => Date.parse("2026-08-05T16:00:31.000Z"),
        commandNow: () => 0,
      }),
      repo: repository,
      workspaceRoot,
      explicitWorkspace: false,
      protectedBaseRevision: head,
      acceptedFenceRevision: undefined,
      head,
      branch,
      evaluationTime: Date.parse("2026-08-05T16:00:31.000Z"),
      problems,
      statuses,
    });
    return { result, problems };
  };

  const valid = resolve();
  assert.deepEqual(valid.problems, []);
  assert.equal(valid.result.runtimeContext.currentAuthority.authorityPhase, "protected-review");
  assert.equal(valid.result.runtimeContext.currentAuthority.writeAuthority, false);

  const coordinatedDrift = [
    value => {
      value.result.claim.laneRevision = "d".repeat(40);
      value.result.subject.headSha = "d".repeat(40);
    },
    value => {
      value.result.claim.canonicalBaseRevision = "d".repeat(40);
      value.result.subject.canonicalBaseSha = "d".repeat(40);
    },
    value => { value.result.subject.branch = "agent/other/review-authority-scope"; },
  ];
  for (const mutate of coordinatedDrift) {
    const staleAuthority = structuredClone(projection.authority);
    mutate(staleAuthority);
    writeJson(path.join(coordinationRoot, projection.authorityFileName), staleAuthority);
    const stale = resolve();
    assert.ok(stale.problems.some(problem => problem.code === "input-stale"));
  }
  writeJson(path.join(coordinationRoot, projection.authorityFileName), projection.authority);

  const peer = protectedReviewPeer(projection.authority);
  writeJson(path.join(coordinationRoot, "peer-review-scope-cloud-authority.json"), peer);
  const withPeer = resolve();
  assert.deepEqual(withPeer.problems, []);
  assert.deepEqual(withPeer.result.runtimeContext.peerAuthorities.map(authority => authority.scopeId), [
    "peer-review-scope",
  ]);
  assert.equal(withPeer.result.runtimeContext.peerAuthorities[0].state, "reviewed");

  const releasedPeer = structuredClone(peer);
  releasedPeer.result.claim.scopeReserved = false;
  writeJson(path.join(coordinationRoot, "peer-review-scope-cloud-authority.json"), releasedPeer);
  const withoutReleasedPeer = resolve();
  assert.deepEqual(withoutReleasedPeer.problems, []);
  assert.deepEqual(withoutReleasedPeer.result.runtimeContext.peerAuthorities, []);

  const invalid = structuredClone(projection.authority);
  invalid.result.claim.writeAuthority = true;
  writeJson(path.join(coordinationRoot, projection.authorityFileName), invalid);
  const rejected = resolve();
  assert.ok(rejected.problems.some(problem => problem.code === "input-unparseable"));
  assert.equal(rejected.result.runtimeContext.currentAuthority, null);
});

test("review authority rejects mutation authority, subject drift, and unjoined evidence", async t => {
  const cases = [
    ["non-verify action", value => { value.result.action = "claim"; }],
    ["non-reviewed state", value => { value.result.claim.state = "active"; }],
    ["write authority", value => { value.result.claim.writeAuthority = true; }],
    ["released scope", value => { value.result.claim.scopeReserved = false; }],
    ["branch drift", value => { value.result.subject.branch = "agent/device/another-scope"; }],
    ["head drift", value => { value.result.subject.headSha = "d".repeat(40); }],
    ["fence drift", value => { value.result.claim.fenceRevision = "e".repeat(64); }],
    ["receipt drift", value => { value.result.receipt.claimId = "f".repeat(64); }],
    ["receipt digest drift", value => { value.result.receipt.receiptDigest = "0".repeat(64); }],
    ["write-set digest drift", value => { value.result.claim.writeSetDigest = "0".repeat(64); }],
    ["verification findings", value => { value.result.findings = [{ code: "blocked" }]; }],
    ["expired claim", value => { value.result.claim.expiresAt = "2026-08-05T16:00:30.000Z"; }],
    ["duplicate semantic scope", value => {
      value.result.claim.declaredWriteScope.push("semantic:review-authority-scope");
    }],
  ];
  for (const [name, mutate] of cases) {
    await t.test(name, () => {
      const projected = projectProtectedReviewAuthority({ event: validEvent(), verification: validVerification() });
      const value = structuredClone(projected.authority);
      mutate(value);
      assert.notDeepEqual(validateProtectedReviewAuthority(value, {
        evaluationTime: Date.parse("2026-08-05T16:00:31.000Z"),
      }), []);
    });
  }
});

test("materialization binds the event and fails closed for merge groups", () => {
  const wrongRepository = validVerification();
  wrongRepository.subject.repository = "example/other";
  assert.throws(
    () => projectProtectedReviewAuthority({ event: validEvent(), verification: wrongRepository }),
    /invalid|does not join/u,
  );

  const wrongReview = validVerification();
  wrongReview.claim.reviewRequestId = "github-pull-request:PR_other";
  assert.throws(
    () => projectProtectedReviewAuthority({ event: validEvent(), verification: wrongReview }),
    /invalid|does not join/u,
  );

  assert.throws(
    () => projectProtectedReviewAuthority({
      event: { merge_group: { head_sha: "a".repeat(40) } },
      verification: validVerification(),
    }),
    /exact member-claim joining/u,
  );
});

test("terminal verification retains the exact live claim and operation receipt", () => {
  const baseline = projectProtectedReviewAuthority({
    event: validEvent(),
    verification: validVerification(),
  }).authority;
  const terminal = structuredClone(baseline);
  terminal.result.ledgerRevision = "d".repeat(40);
  terminal.result.receipt.ledgerRevision = terminal.result.ledgerRevision;
  const { receiptDigest: _discarded, ...receiptCore } = terminal.result.receipt;
  terminal.result.receipt.receiptDigest = digestValue(receiptCore);
  assert.deepEqual(validateProtectedReviewContinuity(baseline, terminal, {
    evaluationTime: Date.parse("2026-08-05T16:00:31.000Z"),
  }), []);

  terminal.result.claim.operationReceiptDigest = "0".repeat(64);
  assert.match(
    validateProtectedReviewContinuity(baseline, terminal, {
      evaluationTime: Date.parse("2026-08-05T16:00:31.000Z"),
    }).join(" "),
    /does not retain the exact reviewed claim/u,
  );
});

test("CLI writes both exact artifacts and refuses a partial overwrite", t => {
  const directory = mkdtempSync(path.join(os.tmpdir(), "git-guidelines-review-authority-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const eventPath = path.join(directory, "event.json");
  const verificationPath = path.join(directory, "verification.json");
  const outputDirectory = path.join(directory, "coordination");
  writeJson(eventPath, validEvent());
  writeJson(verificationPath, validVerification());

  const result = spawnSync(process.execPath, [
    materializer,
    `--event-path=${eventPath}`,
    `--verification-path=${verificationPath}`,
    `--output-directory=${outputDirectory}`,
  ], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  const output = JSON.parse(result.stdout);
  assert.equal(output.status, "materialized");
  assert.equal(JSON.parse(readFileSync(output.writeScopePath, "utf8")).semanticScope, "review-authority-scope");
  assert.equal(JSON.parse(readFileSync(output.authorityPath, "utf8")).result.action, "verify");

  const revalidated = spawnSync(process.execPath, [
    materializer,
    `--event-path=${eventPath}`,
    `--verification-path=${verificationPath}`,
    `--output-directory=${outputDirectory}`,
    "--assert-existing",
  ], { encoding: "utf8" });
  assert.equal(revalidated.status, 0, revalidated.stderr);
  assert.equal(JSON.parse(revalidated.stdout).status, "revalidated");

  const blockedDirectory = path.join(directory, "blocked");
  mkdirSync(blockedDirectory);
  const existingAuthority = path.join(blockedDirectory, "review-authority-scope-cloud-authority.json");
  writeFileSync(existingAuthority, "preserved\n");
  const blocked = spawnSync(process.execPath, [
    materializer,
    `--event-path=${eventPath}`,
    `--verification-path=${verificationPath}`,
    `--output-directory=${blockedDirectory}`,
  ], { encoding: "utf8" });
  assert.notEqual(blocked.status, 0);
  assert.equal(existsSync(path.join(blockedDirectory, "review-authority-scope-write-scope.json")), false);
  assert.equal(readFileSync(existingAuthority, "utf8"), "preserved\n");

  const interruptedDirectory = path.join(directory, "interrupted");
  const projection = projectProtectedReviewAuthority({
    event: validEvent(),
    verification: validVerification(),
  });
  let writeCount = 0;
  assert.throws(() => publishProtectedReviewProjection(projection, interruptedDirectory, {
    writeFileSync(file, value, options) {
      writeCount += 1;
      if (writeCount === 2) throw new Error("simulated second-write interruption");
      return writeFileSync(file, value, options);
    },
  }), /simulated second-write interruption/u);
  assert.equal(existsSync(path.join(interruptedDirectory, projection.semanticScope)), false);
  assert.equal(readdirSync(directory).some(name => name.startsWith(".interrupted-review-authority-scope-")), false);
});

function validEvent({
  repository = "example/repository",
  branch = "agent/device/review-authority-scope",
  headSha = "b".repeat(40),
  baseSha = "a".repeat(40),
} = {}) {
  return {
    repository: { full_name: repository },
    pull_request: {
      number: 17,
      node_id: "PR_review_authority",
      head: { ref: branch, sha: headSha },
      base: { sha: baseSha },
    },
  };
}

function validVerification({
  repository = "example/repository",
  branch = "agent/device/review-authority-scope",
  headSha = "b".repeat(40),
  baseSha = "a".repeat(40),
  declaredWriteScope = [
    "path:docs/guide.md",
    "path:scripts/review.mjs",
    "semantic:review-authority-scope",
  ],
} = {}) {
  const claimDigest = "7".repeat(64);
  const claimId = "6".repeat(64);
  const ledgerRevision = "c".repeat(40);
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
  return {
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
      canonicalBaseRevision: baseSha,
      laneRevision: headSha,
      declaredWriteScope,
      writeSetDigest: sha256(JSON.stringify(declaredWriteScope)),
      reviewRequestId: "github-pull-request:PR_review_authority",
      expiresAt: "2099-01-01T00:00:00.000Z",
      fenceRevision: claimDigest,
      operationReceiptDigest: "9".repeat(64),
    },
    subject: {
      repository,
      pullRequestNumber: 17,
      branch,
      headSha,
      canonicalBaseSha: baseSha,
    },
    findings: [],
    receipt: { ...receiptCore, receiptDigest: digestValue(receiptCore) },
  };
}

function writeJson(file, value) {
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function protectedReviewPeer(source) {
  const value = structuredClone(source);
  const scope = "peer-review-scope";
  const claimId = "5".repeat(64);
  const claimDigest = "3".repeat(64);
  value.scopeId = scope;
  value.reviewRequestId = "github-pull-request:PR_peer_review";
  value.result.claimDigest = claimDigest;
  Object.assign(value.result.claim, {
    claimId,
    declaredWriteScope: ["path:docs", `semantic:${scope}`],
    reviewRequestId: value.reviewRequestId,
    fenceRevision: claimDigest,
  });
  value.result.claim.writeSetDigest = sha256(JSON.stringify(value.result.claim.declaredWriteScope));
  Object.assign(value.result.subject, {
    pullRequestNumber: 18,
    branch: `agent/peer/${scope}`,
  });
  value.result.receipt.claimId = claimId;
  value.result.receipt.claimDigest = claimDigest;
  const { receiptDigest: _discarded, ...receiptCore } = value.result.receipt;
  value.result.receipt.receiptDigest = digestValue(receiptCore);
  return value;
}

function runGit(directory, argumentsList) {
  return execFileSync("git", argumentsList, {
    cwd: directory,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
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
  return `{${Object.keys(value).sort().map(key => (
    `${JSON.stringify(key)}:${canonicalJson(value[key])}`
  )).join(",")}}`;
}
