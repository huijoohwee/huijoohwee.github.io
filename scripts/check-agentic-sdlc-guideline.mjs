import assert from "node:assert/strict";
import fs from "node:fs";

const guidelineUrl = new URL("../guidelines/agentic-sdlc-guidelines.md", import.meta.url);
const integrationOrderUrl = new URL("../guidelines/agentic-sdlc-integration-order.md", import.meta.url);
const source = fs.readFileSync(guidelineUrl, "utf8");
const integrationOrder = fs.readFileSync(integrationOrderUrl, "utf8");
const lines = source.split("\n");
const integrationOrderLines = integrationOrder.split("\n");

assert.ok(source.startsWith("---\n"), "guideline frontmatter must be present");
assert.match(source, /\nversion: "1\.6\.0"\n/);
assert.match(source, /\nuniversal_scope: "true"\n/);
assert.match(source, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.match(source, /\nlifecycle_status: "proposed"\n/);
assert.ok(lines.length - 1 < 600, "guideline must remain below 600 lines");
assert.match(integrationOrder, /\nversion: "1\.0\.0"\n/);
assert.match(integrationOrder, /\nuniversal_scope: "true"\n/);
assert.ok(integrationOrderLines.length - 1 < 600, "integration-order module must remain below 600 lines");

const requiredSections = [
  "## Scope & Neutrality Contract",
  "## Boundary with the Authoring Set",
  "## Task Model",
  "### Collaboration Identity",
  "## Human-in-the-Loop Gates",
  "## Dependency-Ordered Integration",
  "## End-to-End Release Lifecycle Protocol",
  "### Receipt Chain",
  "### Collaboration and Controller Concurrency",
  "### Lifecycle Stages",
  "### Drift and Replay Invalidation",
  "### Reference Implementation Boundary",
  "## Runtime Readiness Enforcement",
  "## Execution Conformance Findings",
  "## Validation Checklist",
];

for (const heading of requiredSections) {
  assert.equal(
    source.split(heading).length - 1,
    1,
    `${heading} must occur exactly once`,
  );
}

const releaseStart = source.indexOf("## End-to-End Release Lifecycle Protocol");
const referenceStart = source.indexOf("### Reference Implementation Boundary");
assert.ok(releaseStart >= 0 && referenceStart > releaseStart, "reference adapters must follow the neutral protocol");
const neutralReleaseProtocol = source.slice(releaseStart, referenceStart);
const runtimeReadinessStart = source.indexOf("## Runtime Readiness Enforcement");
const findingsStart = source.indexOf("## Execution Conformance Findings");
assert.ok(
  runtimeReadinessStart >= 0 && findingsStart > runtimeReadinessStart,
  "runtime-readiness enforcement must precede its finding vocabulary",
);
const runtimeReadinessPolicy = source.slice(runtimeReadinessStart, findingsStart);

for (const term of [
  "GitHub",
  "Cloudflare",
  "Knowgrph",
  "Agentic Canvas OS",
  "huijoohwee",
  "airvio.co",
  "origin/main",
  "turn:end",
  "localhost",
]) {
  assert.doesNotMatch(
    neutralReleaseProtocol,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `normative release protocol must not contain adapter term ${term}`,
  );
}

for (const term of [
  "GitHub",
  "Cloudflare",
  "Knowgrph",
  "Agentic Canvas OS",
  "huijoohwee",
  "airvio.co",
  "origin/main",
  "localhost",
]) {
  assert.doesNotMatch(
    runtimeReadinessPolicy,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `runtime-readiness policy must not contain adapter term ${term}`,
  );
}

for (const requirement of [
  "typed inputs and outputs",
  "bounded orchestration",
  "independent evaluation",
  "one immutable source revision",
  "complete dependency closure",
  "source validation, canonical runtime, protected integration, and deployed proof as separate claims",
  "deterministic evaluator command that exits zero only when every required proof joins",
  "`runtime-readiness-unproven` at `blocker` severity",
]) {
  assert.match(
    runtimeReadinessPolicy,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `runtime-readiness policy must include ${requirement}`,
  );
}

for (const term of [
  "GitHub",
  "Cloudflare",
  "Knowgrph",
  "Agentic Canvas OS",
  "huijoohwee",
  "airvio.co",
  "origin/main",
  "localhost",
]) {
  assert.doesNotMatch(
    integrationOrder,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `integration-order module must not contain adapter term ${term}`,
  );
}

for (const identity of [
  "Actor ID",
  "Device ID",
  "Session ID",
  "Worktree ID",
  "Branch ID",
  "Scope ID",
  "Lease Epoch",
  "Fence Revision",
]) {
  assert.match(source, new RegExp(identity), `collaboration identity must include ${identity}`);
}

for (const receipt of [
  "Overlap Preservation & Disposition Receipts",
  "Integration Receipt",
  "Runtime Review Receipt",
  "Candidate Manifest",
  "Authorization Interaction Receipt",
  "Human Authorization Receipt",
  "Live Verification Receipt",
  "Publication Receipt",
]) {
  assert.match(neutralReleaseProtocol, new RegExp(receipt), `receipt chain must include ${receipt}`);
}

assert.match(neutralReleaseProtocol, /overlapping work retained in its owning lane or an immutable recovery object/);
assert.match(neutralReleaseProtocol, /restore disjoint work only when its state and recovery identity still match exactly/);
assert.match(neutralReleaseProtocol, /Preservation is not review, integration, or authorization/);
assert.match(neutralReleaseProtocol, /interaction and authority adapters are independent modules/);
assert.match(source.slice(referenceStart), /terminal-first and browser-independent/);
assert.match(source.slice(referenceStart), /without launching or requiring a browser/);
assert.match(source.slice(referenceStart), /The release is verified and awaiting fresh human authorization\./);
assert.match(source.slice(referenceStart), /localhost: `\{\{localhost_review_url\}\}`/);
assert.match(source.slice(referenceStart), /`authorize \{\{candidate_digest\}\}`/);
assert.match(neutralReleaseProtocol, /runtime-readiness gate revalidates the current review receipt and candidate/);
assert.match(source.slice(referenceStart), /emit this template only while the exact source, dependency closure, protected checks, probes, review receipt, candidate, and release run remain runtime-ready/);

for (const finding of [
  "`parallel-scope-collision`",
  "`stale-collaboration-fence`",
  "`dependency-closure-drift`",
  "`authorization-evidence-unjoined`",
  "`authorization-interaction-unjoined`",
  "`duplicate-release-controller`",
  "`production-authorization-drift`",
  "`post-authorization-rebuild`",
  "`integration-order-cycle`",
  "`integration-before-dependency`",
  "`canonical-frontier-unverified`",
  "`duplicate-change-reintegrated`",
  "`stale-candidate-frontier`",
  "`runtime-readiness-unproven`",
]) {
  assert.match(source, new RegExp(finding), `finding vocabulary must include ${finding}`);
}

for (const phrase of [
  "Integration Frontier",
  "already-integrated",
  "superseded",
  "exact-canonical checks",
  "runtime-convergence evidence",
  "Seal the Release Frontier",
]) {
  assert.match(integrationOrder, new RegExp(phrase), `integration-order module must include ${phrase}`);
}

console.log(
  `agentic SDLC guideline contract ok (${lines.length - 1} lines; integration-order ${integrationOrderLines.length - 1} lines)`,
);
