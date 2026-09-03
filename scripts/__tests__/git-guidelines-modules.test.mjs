import assert from "node:assert/strict";
import test from "node:test";

import { digestValue, normalizedWriteSetsOverlap, validateArtifact } from "../lib/git-guidelines/artifact-schema.mjs";
import {
  isExactProtectedMainRefresh,
  validateCommitAttribution,
} from "../lib/git-guidelines/commit-attribution.mjs";
import { readFrontmatter } from "../lib/git-guidelines/fm-reader.mjs";
import { normalizeValue, NORMALIZATION_CLASSES, NORMALIZATION_EXCLUSIONS } from "../lib/git-guidelines/normalizer.mjs";
import { collapseFindings } from "../lib/git-guidelines/report.mjs";

test("strict frontmatter rejects duplicates and reserved unquoted punctuation", () => {
  assert.throws(() => readFrontmatter("---\ntitle: one\ntitle: two\n---\n"), /Duplicate/u);
  assert.throws(() => readFrontmatter("---\ntitle: bad: value\n---\n"), /quoted/u);
});

test("normalization is exhaustive and leaves excluded changes sensitive", () => {
  assert.equal(NORMALIZATION_CLASSES.length, 6);
  assert.equal(NORMALIZATION_EXCLUSIONS.length, 7);
  const left = normalizeValue("/tmp/work/a  \r\n2026-08-04T01:02:03Z", { absolutePrefixes: ["/tmp/work"] });
  const right = normalizeValue("a\n2027-01-01T00:00:00Z");
  assert.equal(left, right);
  assert.notEqual(normalizeValue("Mixed Case"), normalizeValue("mixed case"));
});

test("finding ordering and dedup choose maximum severity deterministically", () => {
  const base = { ruleId: "lane#2", type: "evidence-without-run", location: { path: "a", line: 2, column: 1 }, message: "x" };
  const sameLocation = { ...base, type: "vendor-coupling", severity: "blocker" };
  const laterType = { ...base, location: { path: "a", line: 3, column: 1 }, type: "vendor-coupling", severity: "major" };
  const output = collapseFindings([{ ...base, severity: "minor" }, laterType, sameLocation]);
  assert.equal(output.length, 2);
  assert.equal(output[0].severity, "blocker");
  assert.equal(output[0].repeatCount, 2);
  assert.equal(output[0].type, "evidence-without-run");
  assert.equal(output[1].type, "vendor-coupling");
});

test("artifact validation and overlap algebra fail closed", () => {
  assert.equal(normalizedWriteSetsOverlap(["src/a"], ["src/a/b"]), true);
  assert.equal(normalizedWriteSetsOverlap(["src/a"], ["docs/b"]), false);
  assert.equal(normalizedWriteSetsOverlap([], ["docs/b"]), true);
  assert.deepEqual(validateArtifact({ schema: "agentic-change-manifest/v1", branch: "agent/a/b", baseSha: "a".repeat(40), paths: ["a", "b"] }), []);
});

test("cloud request validation matches the repository coordination contract", () => {
  const request = {
    schema: "agentic-cloud-collaboration-request/v1",
    targetRepository: "huijoohwee/agentic-graph",
    workItemId: "work-item:dev-source-resolver-20260803",
    canonicalBaseRevision: "a".repeat(40),
    laneRevision: "b".repeat(40),
    declaredWriteScope: ["path:scripts/worktree-policy.mjs", "semantic:dev-source-resolver"],
    leaseEpoch: 0,
    expiresAt: "2026-08-03T06:04:07Z",
    deviceId: "huis-macbook-pro-3",
    sessionId: "codex-dev-source-resolver-20260803",
    actorId: "github-user:8945812",
    actorLogin: "huijoohwee",
  };
  assert.deepEqual(validateArtifact(request), []);
  for (const field of Object.keys(request).filter(field => field !== "actorLogin")) {
    const degraded = { ...request }; delete degraded[field];
    assert.ok(validateArtifact(degraded).length > 0, `cloud request accepted missing ${field}`);
  }
  assert.ok(validateArtifact({ ...request, workItem: request.workItemId }).length > 0);
  assert.ok(validateArtifact({ ...request, declaredWriteScope: ["scripts/worktree-policy.mjs"] }).length > 0);
});

test("typed operation receipts require every field and bind their digest", () => {
  const cases = [
    ["agentic-collaboration-claim-receipt/v1", "claim", "current"],
    ["agentic-collaboration-continuation-receipt/v1", "continue", "reviewed"],
    ["agentic-collaboration-integration-receipt/v1", "integrate", "integrated-preserved"],
    ["agentic-collaboration-retirement-receipt/v1", "retire", "retired"],
  ];
  for (const [schema, operation, status] of cases) {
    const receipt = operationReceipt({ schema, operation, status });
    assert.deepEqual(validateArtifact(receipt), []);
    for (const field of Object.keys(receipt)) {
      const degraded = { ...receipt }; delete degraded[field];
      assert.ok(validateArtifact(degraded).length > 0, `${schema} accepted missing ${field}`);
    }
  }
});

test("accepted claim results use the Collaboration owner state vocabulary", () => {
  const operation = operationReceipt();
  const providerDraft = {
    schema: "agentic-cloud-collaboration-github-receipt/v1", action: "claim", ledgerRevision: "a".repeat(40),
    ledgerDigest: "b".repeat(64), claimId: operation.claimId, claimDigest: operation.claimDigest,
    contractReceiptDigest: operation.receiptDigest, sequence: 1, evaluationTime: operation.evaluationTime,
  };
  const provider = { ...providerDraft, receiptDigest: digestValue(providerDraft) };
  const result = {
    schema: "agentic-cloud-collaboration-result/v1", ok: true, action: "claim", status: "active", replayed: false,
    attempts: 1, ledgerRevision: provider.ledgerRevision, claim: acceptedClaim(provider), claimDigest: operation.claimDigest,
    receipt: provider,
  };
  assert.deepEqual(validateArtifact(result), []);
  for (const field of Object.keys(result)) {
    const degraded = { ...result }; delete degraded[field];
    assert.ok(validateArtifact(degraded).length > 0, `cloud result accepted missing ${field}`);
  }
  assert.ok(validateArtifact({ ...result, admissionDecision: "accepted" }).length > 0);
  assert.ok(validateArtifact({ ...result, status: "current", claim: { ...result.claim, state: "current" } }).length > 0);
  assert.ok(validateArtifact({ ...result, claim: { ...result.claim, declaredWriteScope: ["semantic:other"] } }).length > 0);
});

test("commit attribution rejects literal newline escapes and accepts a real trailer block", () => {
  const valid = "feat(git-guidelines-companion): validate attribution\n\nExplain the source repair and its fail-closed reason.\n\nAgentic-Task: git-guidelines-companion\nAgentic-Scope: git-guidelines-companion\nAgentic-Lease-Epoch: 1\nAgentic-Mechanism: Codex task test\n";
  assert.deepEqual(validateCommitAttribution(valid, { branch: "agent/test/git-guidelines-companion" }), []);
  const malformed = valid.replaceAll("\n", "\\n");
  assert.ok(validateCommitAttribution(malformed, { branch: "agent/test/git-guidelines-companion" }).some(problem => /Literal escaped newline/u.test(problem)));
});

test("commit attribution enforces the 1–200-codepoint final trailer-line bound", () => {
  const prefix = "Agentic-Note: ";
  const valid = `${validAttributedMessage().trimEnd()}\n${prefix}${"x".repeat(200 - [...prefix].length)}\n`;
  assert.deepEqual(validateCommitAttribution(valid, { branch: "agent/test/git-guidelines-companion" }), []);
  const overlong = `${validAttributedMessage().trimEnd()}\n${prefix}${"x".repeat(201 - [...prefix].length)}\n`;
  assert.ok(validateCommitAttribution(overlong, { branch: "agent/test/git-guidelines-companion" })
    .includes("Every final trailer line must contain 1–200 characters."));
});

test("protected squash attribution accepts one integration block and rejects aggregated authored blocks", () => {
  const canonical = "fix(git-guidelines-companion): preserve squash attribution (#102)\n\nBind the protected integration commit to one accepted claim.\n\nAgentic-Task: git-guidelines-companion\nAgentic-Scope: git-guidelines-companion\nAgentic-Lease-Epoch: 1\nAgentic-Mechanism: Codex protected integration\n";
  assert.deepEqual(validateCommitAttribution(canonical, { branch: "main" }), []);

  const aggregate = canonical.replace(
    "\n\nAgentic-Task:",
    "\n\nAgentic-Task: prior-task\nAgentic-Scope: prior-scope\nAgentic-Lease-Epoch: 1\nAgentic-Mechanism: prior agent\n\nAgentic-Task:",
  );
  const problems = validateCommitAttribution(aggregate, { branch: "main" });
  for (const trailer of ["Agentic-Task", "Agentic-Scope", "Agentic-Lease-Epoch", "Agentic-Mechanism"]) {
    assert.ok(problems.includes(`${trailer} must occur exactly once in the commit message.`));
  }
});

test("exact refresh joins current authority to HEAD and independently validates its terminal attribution", () => {
  const exact = exactRefreshChainFacts();
  assert.equal(isExactProtectedMainRefresh(exact), true);

  const mutations = [
    facts => ({ ...facts, branch: "main" }),
    facts => mutateNode(facts, 0, node => ({ ...node, parents: [node.parents[0]] })),
    facts => mutateNode(facts, 0, node => ({ ...node, parents: [...node.parents].reverse() })),
    facts => ({ ...facts, refreshChain: { ...facts.refreshChain, expectedProtectedRevision: "9".repeat(40) } }),
    facts => mutateNode(facts, 0, node => ({ ...node, mergeBases: [] })),
    facts => mutateNode(facts, 0, node => ({ ...node, mergeBases: ["d".repeat(40), "8".repeat(40)] })),
    facts => mutateNode(facts, 0, node => ({ ...node, mergeBases: [node.parents[0]] })),
    facts => mutateNode(facts, 0, node => ({ ...node, protectedTree: node.mergeBaseTree })),
    facts => mutateNode(facts, 0, node => ({ ...node, expectedMergeTree: "8".repeat(40) })),
    facts => mutateNode(facts, 0, node => ({ ...node, message: `${node.message.trimEnd()}\n\nmerge body\n` })),
    facts => mutateNode(facts, 0, node => ({ ...node, message: "fix(git-guidelines-companion): different subject\n" })),
    facts => mutateNode(facts, 1, node => ({ ...node, expectedMergeTree: "8".repeat(40) })),
    facts => mutateNode(facts, 1, node => ({ ...node, protectedLineageBases: [facts.refreshChain.nodes[0].parents[1]] })),
    facts => mutateNode(facts, 1, node => ({ ...node, parents: [node.parents[0], facts.refreshChain.nodes[0].parents[1]] })),
    facts => mutateNode(facts, 2, node => ({ ...node, message: "invalid terminal\n" })),
    facts => ({ ...facts, refreshChain: { ...facts.refreshChain, truncated: true } }),
    facts => ({ ...facts, refreshChain: { ...facts.refreshChain, maximumHops: 15 } }),
    facts => ({ ...facts, refreshChain: { ...facts.refreshChain, objectFailure: true } }),
    facts => mutateNode(facts, 0, node => ({ ...node, expectedMergeTree: null })),
    facts => ({ ...facts, refreshAuthority: { ...facts.refreshAuthority, leaseEpoch: 0 } }),
    facts => ({ ...facts, refreshAuthority: { ...facts.refreshAuthority, scopeId: "other-scope" } }),
    facts => ({ ...facts, refreshAuthority: null }),
    facts => ({ ...facts, refreshChain: null }),
  ];
  for (const mutate of mutations) assert.equal(isExactProtectedMainRefresh(mutate(exact)), false);
  assert.equal(isExactProtectedMainRefresh({
    ...exact,
    refreshAuthority: { ...exact.refreshAuthority, leaseEpoch: 99 },
  }), true, "a current reseeded claim need not reuse the historical terminal epoch");
  assert.equal(isExactProtectedMainRefresh({
    ...exact,
    refreshAuthority: { ...exact.refreshAuthority, laneRevision: "9".repeat(40) },
  }), false, "the current accepted authority must join the bare refresh HEAD");

  assert.equal(isExactProtectedMainRefresh(mutateNode(exact, 2, node => ({
    ...node, revision: "9".repeat(40),
  }))), false, "the terminal remains bound to the first-parent chain");
  assert.equal(isExactProtectedMainRefresh(mutateNode(exact, 2, node => ({
    ...node, message: node.message.replace("Agentic-Lease-Epoch: 61", "Agentic-Lease-Epoch: 0"),
  }))), false, "the historical terminal epoch remains positive");
  assert.equal(isExactProtectedMainRefresh(mutateNode(exact, 2, node => ({
    ...node, message: node.message.replaceAll("git-guidelines-companion", "other-scope"),
  }))), false, "the historical terminal scope remains branch-bound");

  const overlongTerminal = mutateNode(exact, 2, node => ({
    ...node,
    message: `${node.message.trimEnd()}\nAgentic-Note: ${"x".repeat(201)}\n`,
  }));
  assert.equal(isExactProtectedMainRefresh(overlongTerminal), false);

  const truncatedNodes = Array.from({ length: 17 }, (_, index) => ({
    ...exact.refreshChain.nodes[index < 2 ? index : 1],
    revision: index.toString(16).padStart(40, "0"),
    message: `${refreshSubject()}\n`,
  }));
  assert.equal(isExactProtectedMainRefresh({
    ...exact,
    head: truncatedNodes[0].revision,
    refreshChain: { ...exact.refreshChain, truncated: true, nodes: truncatedNodes },
  }), false);
});

function exactRefreshChainFacts() {
  const head = "a".repeat(40);
  const firstParent = "b".repeat(40);
  const terminal = "e".repeat(40);
  return {
    head,
    branch: "agent/test/git-guidelines-companion",
    commitMessage: `${refreshSubject()}\n`,
    refreshAuthority: { laneRevision: head, leaseEpoch: 3, scopeId: "git-guidelines-companion" },
    refreshChain: {
      expectedProtectedRevision: "c".repeat(40),
      maximumHops: 16,
      truncated: false,
      objectFailure: false,
      nodes: [
        refreshNode({
          revision: head, tree: "1".repeat(40), firstParent, protectedParent: "c".repeat(40),
          mergeBase: "d".repeat(40), mergeBaseTree: "2".repeat(40), protectedTree: "3".repeat(40),
        }),
        refreshNode({
          revision: firstParent, tree: "4".repeat(40), firstParent: terminal, protectedParent: "f".repeat(40),
          mergeBase: "0".repeat(40), mergeBaseTree: "5".repeat(40), protectedTree: "6".repeat(40),
          protectedLineageBases: ["f".repeat(40)],
        }),
        {
          revision: terminal, tree: "7".repeat(40), message: validAttributedMessage(), parents: [], mergeBases: [],
          mergeBaseTree: null, protectedTree: null, expectedMergeTree: null, protectedLineageBases: [],
        },
      ],
    },
  };
}

function refreshNode({
  revision, tree, firstParent, protectedParent, mergeBase, mergeBaseTree, protectedTree,
  protectedLineageBases = [],
}) {
  return {
    revision, tree, message: `${refreshSubject()}\n`, parents: [firstParent, protectedParent],
    mergeBases: [mergeBase], mergeBaseTree, protectedTree, expectedMergeTree: tree, protectedLineageBases,
  };
}

function mutateNode(facts, index, mutate) {
  return {
    ...facts,
    refreshChain: {
      ...facts.refreshChain,
      nodes: facts.refreshChain.nodes.map((node, nodeIndex) => nodeIndex === index ? mutate(node) : node),
    },
  };
}

function refreshSubject() {
  return "fix(git-guidelines-companion): record agentic attribution";
}

function validAttributedMessage() {
  return `${refreshSubject()}\n\nRecord why the attributed candidate exists.\n\nAgentic-Task: git-guidelines-companion\nAgentic-Scope: git-guidelines-companion\nAgentic-Lease-Epoch: 61\nAgentic-Mechanism: Codex task test\n`;
}

function operationReceipt(overrides = {}) {
  const draft = {
    schema: "agentic-collaboration-claim-receipt/v1", operation: "claim", status: "current",
    repositoryId: "github-repository:test", claimId: "1".repeat(64), claimDigest: "2".repeat(64),
    fenceRevision: "2".repeat(64), ledgerRevision: "3".repeat(64), ledgerSequence: 1,
    idempotencyKey: "4".repeat(64), requestDigest: "5".repeat(64), evaluationTime: "2026-08-04T00:00:00.000Z",
    ...overrides,
  };
  return { ...draft, receiptDigest: digestValue(draft) };
}

function acceptedClaim(receipt) {
  const declaredWriteScope = ["semantic:git-guidelines-companion"];
  return {
    claimId: receipt.claimId, state: "active", actorId: "github-user:1", repositoryId: "github-repository:test",
    workItemId: "work-item:test", canonicalBaseRevision: "6".repeat(40), laneRevision: "7".repeat(40),
    declaredWriteScope, writeSetDigest: digestValue(declaredWriteScope), leaseEpoch: 1,
    transitionCounter: 1, heartbeatCounter: 0, reviewRequestId: null,
    expiresAt: "2026-08-05T00:00:00.000Z", fenceRevision: receipt.claimDigest, transitionDigest: receipt.ledgerDigest,
  };
}
