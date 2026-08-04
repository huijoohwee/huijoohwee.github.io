import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { computeCatalogDigest } from "../lib/git-guidelines/registration.mjs";

const checker = new URL("../check-git-guidelines.mjs", import.meta.url).pathname;
const repository = new URL("../..", import.meta.url).pathname;
const sourceDocument = new URL("../../docs/documents/git-guidelines.md", import.meta.url).pathname;

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

function validCommitMessage() {
  return "feat(git-guidelines-companion): validate source\n\nValidate current source and checker bytes.\n\nReject malformed attribution before shared publication.\n\nAgentic-Task: git-guidelines-companion\nAgentic-Scope: git-guidelines-companion\nAgentic-Lease-Epoch: 1\nAgentic-Mechanism: Codex task test\n";
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
