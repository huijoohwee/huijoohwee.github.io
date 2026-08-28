import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { computeCatalogDigest } from "../lib/git-guidelines/registration.mjs";

const checker = new URL("../check-git-guidelines.mjs", import.meta.url).pathname;
const repository = new URL("../..", import.meta.url).pathname;
const sourceDocument = new URL("../../docs/documents/git-guidelines.md", import.meta.url).pathname;
const workflowSource = readFileSync(new URL("../../.github/workflows/guideline-contract.yml", import.meta.url), "utf8");

test("checker emits one conformant report with complete registrations", () => {
  const acosRoot = createAcosFixture();
  const repositoryFixture = createRepositoryFixture(validCommitMessage());
  const output = execFileSync(process.execPath, [checker, `--repository=${repositoryFixture}`, `--acos-root=${acosRoot}`, "--skip-remote-probe"], { encoding: "utf8" });
  const report = JSON.parse(output);
  assert.equal(report.verdict, "conformant");
  assert.equal(report.exitStatus, 0);
  assert.equal(report.severityCounts.blocker, 0);
  assert.equal(Object.keys(report.typeCounts).length, 12);
});

test("unrelated duplicate dictionary rows do not poison registered token set parity", () => {
  const acosRoot = createAcosFixture({ duplicateUnrelated: true });
  const repositoryFixture = createRepositoryFixture(validCommitMessage());
  const output = execFileSync(process.execPath, [checker, `--repository=${repositoryFixture}`, `--acos-root=${acosRoot}`, "--skip-remote-probe"], { encoding: "utf8" });
  const report = JSON.parse(output);
  assert.equal(report.verdict, "conformant");
  assert.equal(report.exitStatus, 0);
});

test("frontmatter mutant fails closed and leaves source bytes unchanged", () => {
  const temp = mkdtempSync(path.join(os.tmpdir(), "git-guidelines-mutant-"));
  const mutant = path.join(temp, "git-guidelines.md");
  const original = readFileSync(sourceDocument, "utf8").replace('title: "Git Guidelines"\n', "");
  writeFileSync(mutant, original);
  const result = spawnSync(process.execPath, [checker, `--repository=${createRepositoryFixture(validCommitMessage())}`, `--document=${mutant}`, `--acos-root=${createAcosFixture()}`, "--skip-remote-probe"], { encoding: "utf8" });
  const report = JSON.parse(result.stdout);
  assert.equal(result.status, 1);
  assert.equal(report.verdict, "not-conformant");
  assert.ok(report.findings.some(item => item.ruleId === "boundary--ownership#7"));
  assert.equal(report.unsatisfiedRuleIds.includes("boundary--ownership#7"), false, "R13.9 lists artifact-bearing rules only");
  assert.equal(readFileSync(mutant, "utf8"), original);
});

test("checker rejects literal-newline Agentic trailers", () => {
  const malformed = "feat(git-guidelines-companion): validate attribution\n\nExplain the change.\\n\\nExplain why.\\n\\nAgentic-Task: git-guidelines-companion\\nAgentic-Scope: git-guidelines-companion\\nAgentic-Lease-Epoch: 1\\nAgentic-Mechanism: Codex task test\n";
  const result = spawnSync(process.execPath, [checker, `--repository=${createRepositoryFixture(malformed)}`, `--acos-root=${createAcosFixture()}`, "--skip-remote-probe"], { encoding: "utf8" });
  const report = JSON.parse(result.stdout);
  assert.equal(result.status, 1);
  assert.equal(report.verdict, "not-conformant");
  assert.ok(report.findings.some(finding => finding.type === "unattributed-agentic-commit" && /Literal escaped newline/u.test(finding.message)));
});

test("checker rejects a default squash body that aggregates authored trailer blocks", () => {
  const aggregate = `${validCommitMessage()}\n${validCommitMessage()}`;
  const result = spawnSync(process.execPath, [checker, `--repository=${createRepositoryFixture(aggregate)}`, `--acos-root=${createAcosFixture()}`, "--skip-remote-probe"], { encoding: "utf8" });
  const report = JSON.parse(result.stdout);
  assert.equal(result.status, 1);
  assert.ok(report.findings.some(finding => finding.type === "unattributed-agentic-commit" && /must occur exactly once/u.test(finding.message)));
});

test("checker accepts a two-hop refresh with authorized HEAD and independently attributed terminal", () => {
  const fixture = createRefreshRepositoryFixture();
  const output = execFileSync(process.execPath, [
    checker,
    `--repository=${fixture.root}`,
    `--expected-base-revision=${fixture.protectedRevision}`,
    `--workspace-root=${fixture.workspaceRoot}`,
    `--acos-root=${createAcosFixture()}`,
    "--skip-remote-probe",
  ], {
    encoding: "utf8",
    env: { ...process.env, GIT_GUIDELINES_EXPECTED_PROTECTED_REVISION: fixture.protectedRevision },
  });
  const report = JSON.parse(output);
  assert.equal(report.verdict, "conformant");
  assert.equal(report.exitStatus, 0);
  assert.equal(report.typeCounts["unattributed-agentic-commit"], 0);
});

test("checker accepts exact merge-tree semantics for clean different-hunk edits to one file", () => {
  const fixture = createRefreshRepositoryFixture({ sameFileCleanMerge: true });
  const output = execFileSync(process.execPath, [
    checker,
    `--repository=${fixture.root}`,
    `--expected-base-revision=${fixture.protectedRevision}`,
    `--workspace-root=${fixture.workspaceRoot}`,
    `--acos-root=${createAcosFixture()}`,
    "--skip-remote-probe",
  ], {
    encoding: "utf8",
    env: { ...process.env, GIT_GUIDELINES_EXPECTED_PROTECTED_REVISION: fixture.protectedRevision },
  });
  const report = JSON.parse(output);
  assert.equal(report.verdict, "conformant");
  assert.equal(report.typeCounts["unattributed-agentic-commit"], 0);
});

test("checker rejects an intermediate refresh merge whose tree is not Git's merge result", () => {
  const fixture = createRefreshRepositoryFixture({ tamperIntermediate: true });
  const result = spawnSync(process.execPath, [
    checker,
    `--repository=${fixture.root}`,
    `--expected-base-revision=${fixture.protectedRevision}`,
    `--workspace-root=${fixture.workspaceRoot}`,
    `--acos-root=${createAcosFixture()}`,
    "--skip-remote-probe",
  ], {
    encoding: "utf8",
    env: { ...process.env, GIT_GUIDELINES_EXPECTED_PROTECTED_REVISION: fixture.protectedRevision },
  });
  const report = JSON.parse(result.stdout);
  assert.equal(result.status, 1);
  assert.ok(report.findings.some(finding => finding.type === "unattributed-agentic-commit"));
});

test("checker rejects nonmonotonic protected parents in a refresh chain", () => {
  const fixture = createRefreshRepositoryFixture({ nonmonotonicProtected: true });
  const result = spawnSync(process.execPath, [
    checker,
    `--repository=${fixture.root}`,
    `--expected-base-revision=${fixture.protectedRevision}`,
    `--workspace-root=${fixture.workspaceRoot}`,
    `--acos-root=${createAcosFixture()}`,
    "--skip-remote-probe",
  ], {
    encoding: "utf8",
    env: { ...process.env, GIT_GUIDELINES_EXPECTED_PROTECTED_REVISION: fixture.protectedRevision },
  });
  const report = JSON.parse(result.stdout);
  assert.equal(result.status, 1);
  assert.ok(report.findings.some(finding => finding.type === "unattributed-agentic-commit"));
});

test("checker rejects a refresh chain when current authority does not join its bare HEAD", () => {
  const fixture = createRefreshRepositoryFixture({ authorityHeadMismatch: true });
  const result = spawnSync(process.execPath, [
    checker,
    `--repository=${fixture.root}`,
    `--expected-base-revision=${fixture.protectedRevision}`,
    `--workspace-root=${fixture.workspaceRoot}`,
    `--acos-root=${createAcosFixture()}`,
    "--skip-remote-probe",
  ], {
    encoding: "utf8",
    env: { ...process.env, GIT_GUIDELINES_EXPECTED_PROTECTED_REVISION: fixture.protectedRevision },
  });
  const report = JSON.parse(result.stdout);
  assert.equal(result.status, 2);
  assert.ok(report.findings.some(finding => /input-stale.*verified subject head/u.test(finding.message)));
});

test("checker never enables the refresh exception from an ordinary authoring claim", () => {
  const fixture = createRefreshRepositoryFixture({ ordinaryAuthority: true });
  const result = spawnSync(process.execPath, [
    checker,
    `--repository=${fixture.root}`,
    `--expected-base-revision=${fixture.protectedRevision}`,
    `--workspace-root=${fixture.workspaceRoot}`,
    `--acos-root=${createAcosFixture()}`,
    "--skip-remote-probe",
  ], {
    encoding: "utf8",
    env: { ...process.env, GIT_GUIDELINES_EXPECTED_PROTECTED_REVISION: fixture.protectedRevision },
  });
  const report = JSON.parse(result.stdout);
  assert.equal(result.status, 1);
  assert.ok(report.findings.some(finding => finding.type === "unattributed-agentic-commit"));
});

test("checker rejects a refresh-shaped merge without an event-bound protected revision", () => {
  const fixture = createRefreshRepositoryFixture();
  const result = spawnSync(process.execPath, [
    checker,
    `--repository=${fixture.root}`,
    `--expected-base-revision=${fixture.protectedRevision}`,
    `--workspace-root=${fixture.workspaceRoot}`,
    `--acos-root=${createAcosFixture()}`,
    "--skip-remote-probe",
  ], { encoding: "utf8", env: { ...process.env, GIT_GUIDELINES_EXPECTED_PROTECTED_REVISION: "" } });
  const report = JSON.parse(result.stdout);
  assert.equal(result.status, 1);
  assert.ok(report.findings.some(finding => finding.type === "unattributed-agentic-commit"));
});

test("pull-request workflow binds the protected revision into the checker environment", () => {
  assert.match(
    workflowSource,
    /GIT_GUIDELINES_EXPECTED_PROTECTED_REVISION:\s*\$\{\{ github\.event_name == 'pull_request' && github\.event\.pull_request\.base\.sha \|\| '' \}\}/u,
  );
});

function createRepositoryFixture(commitMessage) {
  const workspaceRoot = mkdtempSync(path.join(os.tmpdir(), "git-guidelines-workspace-"));
  const root = path.join(workspaceRoot, "repository");
  mkdirSync(root, { recursive: true });
  writeTask19Artifacts(workspaceRoot);
  const sourcePaths = [
    "docs/documents/git-guidelines.md",
    "guidelines/agentic-sdlc-guidelines.md",
    "guidelines/prd-tad-adr-guidelines.md",
    "guidelines/agentic-sdlc-cloud-collaboration.md",
    "guidelines/agentic-sdlc-scoped-lane-admission.md",
    "guidelines/commit-push-deploy-guidelines.md",
  ];
  for (const relative of sourcePaths) {
    const destination = path.join(root, relative);
    mkdirSync(path.dirname(destination), { recursive: true });
    writeFileSync(destination, readFileSync(path.join(repository, relative)));
  }
  runGit(root, ["init", "-q"]);
  runGit(root, ["config", "user.name", "Git Guidelines Test"]);
  runGit(root, ["config", "user.email", "git-guidelines@example.invalid"]);
  runGit(root, ["checkout", "-q", "-b", "agent/test/git-guidelines-companion"]);
  runGit(root, ["add", "."]);
  runGit(root, ["commit", "-q", "-F", "-"], commitMessage);
  return root;
}

function createRefreshRepositoryFixture({
  tamperIntermediate = false,
  nonmonotonicProtected = false,
  authorityHeadMismatch = false,
  ordinaryAuthority = false,
  sameFileCleanMerge = false,
} = {}) {
  const workspaceRoot = mkdtempSync(path.join(os.tmpdir(), "git-guidelines-refresh-workspace-"));
  const root = path.join(workspaceRoot, "repository");
  mkdirSync(root, { recursive: true });
  writeTask19Artifacts(workspaceRoot);
  for (const relative of [
    "docs/documents/git-guidelines.md",
    "guidelines/agentic-sdlc-guidelines.md",
    "guidelines/prd-tad-adr-guidelines.md",
    "guidelines/agentic-sdlc-cloud-collaboration.md",
    "guidelines/agentic-sdlc-scoped-lane-admission.md",
    "guidelines/commit-push-deploy-guidelines.md",
  ]) {
    const destination = path.join(root, relative);
    mkdirSync(path.dirname(destination), { recursive: true });
    writeFileSync(destination, readFileSync(path.join(repository, relative)));
  }

  runGit(root, ["init", "-q", "-b", "main"]);
  runGit(root, ["config", "user.name", "Git Guidelines Test"]);
  runGit(root, ["config", "user.email", "git-guidelines@example.invalid"]);
  if (sameFileCleanMerge) {
    writeFileSync(path.join(root, "shared.txt"), "candidate: base\nunchanged a\nmiddle\nunchanged b\nprotected: base\n");
  }
  runGit(root, ["add", "."]);
  runGit(root, ["commit", "-q", "-m", "chore(seed): create refresh fixture"]);
  const commonBase = readGit(root, ["rev-parse", "HEAD"]).trim();

  const branch = "agent/test/git-guidelines-companion";
  runGit(root, ["checkout", "-q", "-b", branch]);
  const ownedPath = sameFileCleanMerge ? "shared.txt" : "candidate.txt";
  if (sameFileCleanMerge) {
    const sharedPath = path.join(root, ownedPath);
    writeFileSync(sharedPath, readFileSync(sharedPath, "utf8").replace("candidate: base", "candidate: changed"));
  } else {
    writeFileSync(path.join(root, ownedPath), "candidate\n");
  }
  runGit(root, ["add", ownedPath]);
  runGit(root, ["commit", "-q", "-F", "-"], validRefreshParentMessage());
  const terminalRevision = readGit(root, ["rev-parse", "HEAD"]).trim();

  runGit(root, ["checkout", "-q", "-b", "protected-old", commonBase]);
  const firstProtectedPath = sameFileCleanMerge ? "shared.txt" : "protected-one.txt";
  if (sameFileCleanMerge) {
    const sharedPath = path.join(root, firstProtectedPath);
    writeFileSync(sharedPath, readFileSync(sharedPath, "utf8").replace("protected: base", "protected: changed"));
  } else {
    writeFileSync(path.join(root, firstProtectedPath), "protected one\n");
  }
  runGit(root, ["add", firstProtectedPath]);
  runGit(root, ["commit", "-q", "-m", "docs(protected-main): first protected advance"]);
  const olderProtectedRevision = readGit(root, ["rev-parse", "HEAD"]).trim();

  runGit(root, ["checkout", "-q", branch]);
  runGit(root, ["merge", "--no-ff", "--no-commit", "-q", "protected-old"]);
  if (tamperIntermediate) {
    writeFileSync(path.join(root, "unattributed-intermediate-edit.txt"), "not from protected main\n");
    runGit(root, ["add", "unattributed-intermediate-edit.txt"]);
  }
  runGit(root, ["commit", "-q", "-m", refreshSubject()]);
  const intermediateRevision = readGit(root, ["rev-parse", "HEAD"]).trim();

  runGit(root, ["checkout", "-q", "main"]);
  if (!nonmonotonicProtected) runGit(root, ["merge", "--ff-only", "-q", "protected-old"]);
  writeFileSync(path.join(root, "protected-two.txt"), "protected two\n");
  runGit(root, ["add", "protected-two.txt"]);
  runGit(root, ["commit", "-q", "-m", "docs(protected-main): second protected advance"]);
  const protectedRevision = readGit(root, ["rev-parse", "HEAD"]).trim();

  runGit(root, ["checkout", "-q", branch]);
  runGit(root, ["merge", "--no-ff", "--no-commit", "-q", "main"]);
  runGit(root, ["commit", "-q", "-m", refreshSubject()]);
  const head = readGit(root, ["rev-parse", "HEAD"]).trim();
  assert.equal(readGit(root, ["rev-parse", "HEAD^1"]).trim(), intermediateRevision);
  writeRefreshAuthority(workspaceRoot, {
    head,
    laneRevision: authorityHeadMismatch ? terminalRevision : head,
    baseRevision: protectedRevision,
    ownedPath,
    ordinaryAuthority,
  });
  return { root, workspaceRoot, protectedRevision };
}

function writeRefreshAuthority(workspaceRoot, {
  head, laneRevision, baseRevision, ownedPath, ordinaryAuthority,
}) {
  const coordinationRoot = path.join(workspaceRoot, ".coordination");
  const scope = "git-guidelines-companion";
  const branch = `agent/test/${scope}`;
  const declaredWriteScope = [`path:${ownedPath}`, `semantic:${scope}`];
  const claimDigest = "7".repeat(64);
  writeFileSync(path.join(coordinationRoot, `${scope}-write-scope.json`), JSON.stringify({
    schema: "agentic-declared-write-scope/v1",
    semanticScope: scope,
    paths: [ownedPath],
  }));
  if (ordinaryAuthority) {
    writeFileSync(path.join(coordinationRoot, `${scope}-cloud-authority.json`), JSON.stringify({
      targetRepository: "example/repository",
      result: {
        schema: "agentic-cloud-collaboration-result/v1",
        ok: true,
        action: "claim",
        status: "current",
        claimDigest,
        claim: {
          canonicalBaseRevision: baseRevision,
          laneRevision,
          leaseEpoch: 3,
          state: "active",
          declaredWriteScope,
          fenceRevision: claimDigest,
          expiresAt: "2099-01-01T00:00:00.000Z",
        },
      },
    }));
    return;
  }
  const claimId = "6".repeat(64);
  const ledgerRevision = "c".repeat(40);
  const reviewRequestId = "github-pull-request:PR_git_guidelines_checker";
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
  writeFileSync(path.join(coordinationRoot, `${scope}-cloud-authority.json`), JSON.stringify({
    ledgerRepository: "huijoohwee/agentic-canvas-os",
    reviewRequestId,
    scopeId: scope,
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
        laneRevision,
        declaredWriteScope,
        writeSetDigest: sha256(JSON.stringify(declaredWriteScope)),
        leaseEpoch: 3,
        reviewRequestId,
        expiresAt: "2099-01-01T00:00:00.000Z",
        fenceRevision: claimDigest,
        operationReceiptDigest: "9".repeat(64),
      },
      subject: {
        repository: "example/repository",
        pullRequestNumber: 17,
        branch,
        headSha: laneRevision,
        canonicalBaseSha: baseRevision,
      },
      findings: [],
      receipt: { ...receiptCore, receiptDigest: digestValue(receiptCore) },
    },
  }));
}

function writeTask19Artifacts(workspaceRoot) {
  const coordinationRoot = path.join(workspaceRoot, ".coordination");
  mkdirSync(coordinationRoot, { recursive: true });
  writeFileSync(path.join(coordinationRoot, "dev-source-resolver-write-scope.json"), JSON.stringify({
    schema: "agentic-declared-write-scope/v1",
    semanticScope: "dev-source-resolver",
    paths: ["scripts/__tests__/worktree-policy.test.mjs", "scripts/worktree-policy.mjs"],
  }));
  writeFileSync(path.join(coordinationRoot, "dev-source-resolver-cloud-request.json"), JSON.stringify({
    schema: "agentic-cloud-collaboration-request/v1",
    targetRepository: "example/repository",
    workItemId: "work-item:dev-source-resolver-test",
    canonicalBaseRevision: "a".repeat(40),
    laneRevision: "a".repeat(40),
    declaredWriteScope: [
      "path:scripts/__tests__/worktree-policy.test.mjs",
      "path:scripts/worktree-policy.mjs",
      "semantic:dev-source-resolver",
    ],
    leaseEpoch: 1,
    expiresAt: "2099-01-01T00:00:00.000Z",
    deviceId: "test-device",
    sessionId: "test-session",
    actorId: "test-actor",
  }));
}

function runGit(root, argumentsList, input = undefined) {
  execFileSync("git", argumentsList, { cwd: root, encoding: "utf8", input, stdio: ["pipe", "pipe", "pipe"] });
}

function readGit(root, argumentsList) {
  return execFileSync("git", argumentsList, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
}

function validCommitMessage() {
  return "feat(git-guidelines-companion): validate source\n\nValidate current source and checker bytes.\n\nReject malformed attribution before shared publication.\n\nAgentic-Task: git-guidelines-companion\nAgentic-Scope: git-guidelines-companion\nAgentic-Lease-Epoch: 1\nAgentic-Mechanism: Codex task test\n";
}

function refreshSubject() {
  return "fix(git-guidelines-companion): record agentic attribution";
}

function validRefreshParentMessage() {
  return `${refreshSubject()}\n\nBind the candidate to its accepted task-lane attribution.\n\nAgentic-Task: git-guidelines-companion\nAgentic-Scope: git-guidelines-companion\nAgentic-Lease-Epoch: 61\nAgentic-Mechanism: Codex test fixture\n`;
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

function createAcosFixture({ duplicateUnrelated = false } = {}) {
  const root = mkdtempSync(path.join(os.tmpdir(), "git-guidelines-acos-"));
  mkdirSync(path.join(root, "docs"), { recursive: true });
  const registrations = {
    "docs/README.md": "## Document Map\n\n| File | Role | Use |\n|---|---|---|\n| `docs/documents/git-guidelines.md` | Git-layer companion to the execution set | any git stage: session start through cleanup |\n",
    "docs/DICTIONARY-COMMAND.md": commandDictionary("0".repeat(64), 0, duplicateUnrelated),
    "docs/DICTIONARY-SEMANTIC.md": dictionary("Semantic", "Tags", "#git-collaboration", "Git collaboration rules"),
    "docs/DICTIONARY-BINDING.md": dictionary("Binding", "Bindings", "@git-guidelines", "Git guidelines source"),
  };
  const catalog = computeCatalogDigest(registrations);
  registrations["docs/DICTIONARY-COMMAND.md"] = commandDictionary(catalog.digest, catalog.count, duplicateUnrelated);
  for (const [relative, bytes] of Object.entries(registrations)) writeFileSync(path.join(root, relative), bytes);
  return root;
}

function commandDictionary(digest, count, duplicateUnrelated = false) {
  const metadata = duplicateUnrelated ? '  - "/unrelated"\n' : "";
  const rows = duplicateUnrelated
    ? "| `/unrelated` | Unrelated duplicate. | `@other` | `#other` | No effect. |\n| `/unrelated` | Unrelated duplicate. | `@other` | `#other` | No effect. |\n"
    : "";
  return `---\ncatalog_digest: "${digest}"\ncatalog_entry_count: ${count}\nsource_docs:\n  - "docs/documents/git-guidelines.md"\ndictionary_entries:\n  - "/git.guidelines"\n${metadata}---\n\n## Commands\n\n| Token | Intent | Required bindings | Semantic filters | Completion signal |\n|---|---|---|---|---|\n| \`/git.guidelines\` | Load git rules. | \`@git-guidelines\` | \`#git-collaboration\` | One conformant report. |\n${rows}`;
}
function dictionary(title, heading, token, summary) {
  return `---\ndictionary_entries:\n  - "${token}"\n---\n\n## ${heading}\n\n| Token | Meaning | Source |\n|---|---|---|\n| \`${token}\` | ${summary}. | \`docs/documents/git-guidelines.md\` |\n`;
}
