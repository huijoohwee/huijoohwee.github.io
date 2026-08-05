import assert from "node:assert/strict";
import test from "node:test";

import {
  BLOCKING_CONDITIONS,
  INTEGRATION_DEPENDENCY_CLASSES,
  compareIntegrationRequests,
  createBlockedOutcome,
  declaredWriteScopeCoversPaths,
  declaredWriteScopesOverlap,
  evaluateRuntimeComposition,
  normalizeDeclaredWriteScope,
  validateBlockedOutcome,
} from "../lib/git-guidelines/content.mjs";

const EXPECTED_BLOCKING_CONDITIONS = Object.freeze([
  "canonical-base-unclean",
  "claim-absent",
  "claim-scope-overlap",
  "lease-expired",
  "lease-epoch-regressed",
  "fence-divergent",
  "identity-unprojectable",
  "scope-undeclared",
  "offline-no-claim",
  "recovery-artifact-absent",
  "capture-incomplete",
  "restore-mismatch",
  "operator-decision-absent",
  "subject-format-invalid",
  "scope-containment-violated",
  "attribution-incomplete",
  "check-not-terminal",
  "evidence-revision-mismatch",
  "verdict-not-independent",
  "hook-bypassed-unauthorized",
  "conflict-owner-mismatch",
  "unresolved-conflict-content",
  "integration-order-violated",
  "approach-repeated-without-cause",
  "boundary-closed",
  "authorization-invalidated",
  "publication-claim-failed",
]);

test("declared write-scope normalization is idempotent and preserves repository semantics", () => {
  const normalized = normalizeDeclaredWriteScope([
    "path:src//runtime/./",
    "path:src/runtime/../runtime",
    "path:docs/reference/../api/",
    "semantic:git-guidelines-companion",
  ]);
  assert.deepEqual(normalized, {
    decidable: true,
    paths: ["docs/api", "src/runtime"],
    semantics: ["git-guidelines-companion"],
    wildcard: false,
  });
  assert.deepEqual(normalizeDeclaredWriteScope(normalized), normalized);
  assert.deepEqual(normalizeDeclaredWriteScope({
    paths: ["src/runtime/./"],
    semanticScope: "git-guidelines-companion",
  }), {
    decidable: true,
    paths: ["src/runtime"],
    semantics: ["git-guidelines-companion"],
    wildcard: false,
  });
});

test("the shared overlap relation is reflexive, symmetric, ancestry-aware, and fail-closed", () => {
  const scopes = [
    ["path:src/runtime", "semantic:runtime-owner"],
    ["path:src/runtime/child", "semantic:runtime-child"],
    ["path:docs/guide", "semantic:docs-owner"],
    ["path:src/other", "semantic:runtime-owner"],
    ["path:*"],
    ["path:../../outside"],
    undefined,
  ];
  for (const scope of scopes) assert.equal(declaredWriteScopesOverlap(scope, scope), true);
  for (const left of scopes) {
    for (const right of scopes) {
      assert.equal(declaredWriteScopesOverlap(left, right), declaredWriteScopesOverlap(right, left));
    }
  }
  assert.equal(declaredWriteScopesOverlap(["path:src/a/./b/../"], ["path:src/a/deep/file.mjs"]), true);
  assert.equal(declaredWriteScopesOverlap(["path:src/runtime"], ["path:docs/guide"]), false);
  assert.equal(declaredWriteScopesOverlap(["semantic:shared-artifact"], ["semantic:shared-artifact"]), true);
  assert.equal(declaredWriteScopesOverlap(["semantic:left-artifact"], ["semantic:right-artifact"]), false);
  assert.equal(declaredWriteScopesOverlap(["path:*"], ["path:anywhere"]), true);
  assert.equal(declaredWriteScopesOverlap(["path:/absolute"], ["path:disjoint"]), true);
  assert.equal(declaredWriteScopesOverlap([], ["path:disjoint"]), true);
});

test("serialization comparator follows dependency class, epoch, and byte-lexicographic Scope ID", () => {
  assert.deepEqual(INTEGRATION_DEPENDENCY_CLASSES, [
    "control-contract", "implementation", "consumer", "generated-projection", "mirror",
  ]);
  const requests = [
    request("mirror", 0, "zzz"),
    request("control-contract", 8, "zzz"),
    request("consumer", 0, "aaa"),
    request("control-contract", 2, "bbb"),
    request("generated-projection", 0, "aaa"),
    request("implementation", 0, "aaa"),
    request("control-contract", 2, "aaa"),
  ];
  const expected = [
    "control-contract:2:aaa",
    "control-contract:2:bbb",
    "control-contract:8:zzz",
    "implementation:0:aaa",
    "consumer:0:aaa",
    "generated-projection:0:aaa",
    "mirror:0:zzz",
  ];
  for (const permutation of permutations(requests)) {
    assert.deepEqual([...permutation].sort(compareIntegrationRequests).map(requestIdentity), expected);
  }
  assert.equal(compareIntegrationRequests(request("consumer", 1, "same"), request("consumer", 1, "same")), 0);
});

test("serialization comparator is total, antisymmetric, and transitive", () => {
  const requests = [
    request("control-contract", 3, "gamma"),
    request("control-contract", 3, "alpha"),
    request("control-contract", 7, "alpha"),
    request("implementation", 0, "alpha"),
    request("consumer", 0, "alpha"),
    request("generated-projection", 0, "alpha"),
    request("mirror", 0, "alpha"),
  ];
  for (const left of requests) {
    for (const right of requests) {
      const forward = Math.sign(compareIntegrationRequests(left, right));
      const backward = Math.sign(compareIntegrationRequests(right, left));
      assert.equal(forward + backward, 0);
      assert.ok([-1, 0, 1].includes(forward));
      for (const last of requests) {
        if (forward <= 0 && compareIntegrationRequests(right, last) <= 0) {
          assert.ok(compareIntegrationRequests(left, last) <= 0);
        }
      }
    }
  }
  assert.throws(() => compareIntegrationRequests(request("unknown", 0, "scope"), requests[0]), /dependencyClass/u);
  assert.throws(() => compareIntegrationRequests(request("consumer", -1, "scope"), requests[0]), /leaseEpoch/u);
  assert.throws(() => compareIntegrationRequests(request("consumer", 0, "UPPER"), requests[0]), /scopeId/u);
});

test("one runtime composition reuses scope overlap for admission, commit, and publication", () => {
  const currentAuthority = authority("current", "current.json", ["path:src/runtime", "semantic:runtime-owner"]);
  const zeta = authority("zeta", "zeta.json", ["path:src/runtime/peer", "semantic:zeta-owner"]);
  const alpha = authority("alpha", "alpha.json", ["path:src/runtime/shared", "semantic:alpha-owner"]);
  const first = request("control-contract", 1, "alpha");
  const second = request("implementation", 1, "beta");
  const evaluation = evaluateRuntimeComposition({
    currentAuthority,
    peerAuthorities: [zeta, alpha],
    publicationAuthorities: [zeta, alpha],
    changedPaths: ["src/runtime/index.mjs", "docs/outside.md"],
    integrationRequests: [second, first],
    selectedIntegrationRequest: second,
    evaluationTime: 0,
    comparisonArtifacts: [{ relativePath: "alpha.json" }, { relativePath: "zeta.json" }],
  });

  assert.equal(declaredWriteScopeCoversPaths(currentAuthority.declaredWriteScope, ["src/runtime/index.mjs"]), true);
  assert.equal(declaredWriteScopeCoversPaths(currentAuthority.declaredWriteScope, ["src"]), false);
  assert.deepEqual(evaluation.admission.overlappingAuthorityIds, ["alpha", "zeta"]);
  assert.deepEqual(evaluation.commit.outOfScopePaths, ["docs/outside.md"]);
  assert.deepEqual(evaluation.publication.overlappingAuthorityIds, ["alpha", "zeta"]);
  assert.deepEqual(evaluation.integration.orderedRequestIds, ["control-contract:1:alpha", "implementation:1:beta"]);
  assert.equal(evaluation.integration.selectedIsNext, false);
  assert.equal(evaluation.publication.authorized, false);
  assert.equal(Object.isFrozen(evaluation), true);
});

test("protected review verification is narrow and never widens ordinary authoring authority", () => {
  const base = authority("reviewed", "reviewed.json", [
    "path:src/runtime",
    "semantic:runtime-owner",
  ]);
  const protectedReview = Object.freeze({
    ...base,
    state: "reviewed",
    authorityPhase: "protected-review",
    writeAuthority: false,
    scopeReserved: true,
    verificationReceiptDigest: "a".repeat(64),
  });
  const verified = evaluateRuntimeComposition({
    currentAuthority: protectedReview,
    changedPaths: ["src/runtime/index.mjs"],
    evaluationTime: 0,
  });
  assert.equal(verified.publication.authorized, true);
  assert.deepEqual(verified.publication.authorityProblems, []);

  const ordinaryReviewed = evaluateRuntimeComposition({
    currentAuthority: Object.freeze({ ...base, state: "reviewed" }),
    changedPaths: ["src/runtime/index.mjs"],
    evaluationTime: 0,
  });
  assert.equal(ordinaryReviewed.publication.authorized, false);
  assert.deepEqual(ordinaryReviewed.publication.authorityProblems, ["claim-not-active"]);

  const mutationEnabled = evaluateRuntimeComposition({
    currentAuthority: Object.freeze({ ...protectedReview, writeAuthority: true }),
    changedPaths: ["src/runtime/index.mjs"],
    evaluationTime: 0,
  });
  assert.equal(mutationEnabled.publication.authorized, false);
  assert.deepEqual(mutationEnabled.publication.authorityProblems, [
    "protected-review-verification-invalid",
  ]);
});

test("Blocked_Outcome uses the exact closed conditions and enforces four unchanged digests", () => {
  assert.equal(BLOCKING_CONDITIONS.length, 27);
  assert.deepEqual(BLOCKING_CONDITIONS, EXPECTED_BLOCKING_CONDITIONS);
  assert.equal(new Set(BLOCKING_CONDITIONS).size, 27);

  const preState = repositoryState("a", "b", "c", "d");
  const outcome = createBlockedOutcome({
    ruleId: "coordination-artifacts#13",
    blockingCondition: "claim-absent",
    causingArtifact: ".coordination/git-guidelines-companion-claim.json",
    preState,
    postState: { ...preState },
    resolutionPath: ".coordination/git-guidelines-companion-request.json",
  });
  assert.deepEqual(validateBlockedOutcome(outcome), []);
  assert.equal(outcome.unchanged, true);
  assert.deepEqual(Object.keys(outcome).sort(), [
    "blockingCondition", "causingArtifact", "postState", "preState", "resolutionPath", "ruleId", "unchanged",
  ]);
  assert.equal(Object.isFrozen(outcome), true);
  assert.equal(Object.isFrozen(outcome.preState), true);

  assert.throws(() => createBlockedOutcome({
    ...outcome,
    postState: { ...preState, index: "e".repeat(64) },
  }), /unchanged/u);
  assert.ok(validateBlockedOutcome({ ...outcome, blockingCondition: "unknown" })
    .some(problem => /closed enumeration/u.test(problem)));
  assert.ok(validateBlockedOutcome({ ...outcome, causingArtifact: "/tmp/prose" })
    .some(problem => /repository-relative/u.test(problem)));
  assert.ok(validateBlockedOutcome({ ...outcome, extra: true })
    .some(problem => /contain exactly/u.test(problem)));
});

function request(dependencyClass, leaseEpoch, scopeId) {
  return Object.freeze({ dependencyClass, leaseEpoch, scopeId });
}

function authority(authorityId, artifactPath, declaredWriteScope) {
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

function requestIdentity(value) {
  return `${value.dependencyClass}:${value.leaseEpoch}:${value.scopeId}`;
}

function permutations(values) {
  return [
    values,
    [...values].reverse(),
    [...values.slice(2), ...values.slice(0, 2)],
    [values[3], values[0], values[6], values[2], values[5], values[1], values[4]],
  ];
}

function repositoryState(head, index, working, untracked) {
  return Object.freeze({
    head: head.repeat(64),
    index: index.repeat(64),
    working: working.repeat(64),
    untracked: untracked.repeat(64),
  });
}
