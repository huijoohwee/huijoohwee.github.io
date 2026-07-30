import assert from "node:assert/strict";
import fs from "node:fs";

const guidelineUrl = new URL("../guidelines/agentic-sdlc-guidelines.md", import.meta.url);
const conformanceRuntimeUrl = new URL("../guidelines/agentic-sdlc-conformance-runtime.md", import.meta.url);
const integrationOrderUrl = new URL("../guidelines/agentic-sdlc-integration-order.md", import.meta.url);
const upstreamAdmissionUrl = new URL("../guidelines/agentic-sdlc-upstream-dependency-admission.md", import.meta.url);
const cloudCollaborationUrl = new URL("../guidelines/agentic-sdlc-cloud-collaboration.md", import.meta.url);
const repositoryRuntimeReadinessUrl = new URL("../guidelines/agentic-sdlc-repository-runtime-readiness.md", import.meta.url);
const source = fs.readFileSync(guidelineUrl, "utf8");
const conformanceRuntime = fs.readFileSync(conformanceRuntimeUrl, "utf8");
const integrationOrder = fs.readFileSync(integrationOrderUrl, "utf8");
const upstreamAdmission = fs.readFileSync(upstreamAdmissionUrl, "utf8");
const cloudCollaboration = fs.readFileSync(cloudCollaborationUrl, "utf8");
const repositoryRuntimeReadiness = fs.readFileSync(repositoryRuntimeReadinessUrl, "utf8");
const lines = source.split("\n");
const conformanceRuntimeLines = conformanceRuntime.split("\n");
const integrationOrderLines = integrationOrder.split("\n");
const upstreamAdmissionLines = upstreamAdmission.split("\n");
const cloudCollaborationLines = cloudCollaboration.split("\n");
const repositoryRuntimeReadinessLines = repositoryRuntimeReadiness.split("\n");
const normalizedCloudCollaboration = cloudCollaboration.replace(/\s+/g, " ");

assert.ok(source.startsWith("---\n"), "guideline frontmatter must be present");
assert.match(source, /\nversion: "1\.10\.0"\n/);
assert.match(source, /\nuniversal_scope: "true"\n/);
assert.match(source, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.match(source, /\nupstream_blocking_policy: "prevent-not-bypass"\n/);
assert.match(source, /\nlocal_rung: "spec-complete"\n/);
assert.match(source, /\ndelivered_rung: "undocumented"\n/);
assert.match(source, /\nlifecycle_status: "proposed"\n/);
assert.ok(lines.length - 1 < 600, "guideline must remain below 600 lines");
assert.ok(conformanceRuntime.startsWith("---\n"), "conformance-runtime frontmatter must be present");
assert.match(conformanceRuntime, /\nversion: "1\.0\.0"\n/);
assert.match(conformanceRuntime, /\nlocal_rung: "spec-complete"\n/);
assert.match(conformanceRuntime, /\ndelivered_rung: "undocumented"\n/);
assert.match(conformanceRuntime, /\nuniversal_scope: "true"\n/);
assert.match(conformanceRuntime, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.match(conformanceRuntime, /\nlifecycle_status: "proposed"\n/);
assert.ok(
  conformanceRuntimeLines.length - 1 < 600,
  "conformance-runtime module must remain below 600 lines",
);
assert.match(integrationOrder, /\nversion: "1\.0\.0"\n/);
assert.match(integrationOrder, /\nuniversal_scope: "true"\n/);
assert.ok(integrationOrderLines.length - 1 < 600, "integration-order module must remain below 600 lines");
assert.ok(upstreamAdmissionLines.length - 1 < 600, "upstream-admission module must remain below 600 lines");
assert.match(upstreamAdmission, /\nversion: "1\.0\.0"\n/);
assert.match(upstreamAdmission, /\nuniversal_scope: "true"\n/);
assert.match(upstreamAdmission, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.ok(cloudCollaboration.startsWith("---\n"), "cloud-collaboration frontmatter must be present");
assert.match(cloudCollaboration, /\nversion: "1\.0\.0"\n/);
assert.match(cloudCollaboration, /\nuniversal_scope: "true"\n/);
assert.match(cloudCollaboration, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.ok(
  cloudCollaborationLines.length - 1 < 600,
  "cloud-collaboration module must remain below 600 lines",
);
assert.match(source, /\.\/agentic-sdlc-cloud-collaboration\.md/);
assert.match(source, /\.\/agentic-sdlc-repository-runtime-readiness\.md/);
assert.ok(repositoryRuntimeReadiness.startsWith("---\n"), "repository runtime-readiness frontmatter must be present");
assert.match(repositoryRuntimeReadiness, /\nversion: "1\.0\.0"\n/);
assert.match(repositoryRuntimeReadiness, /\nuniversal_scope: "true"\n/);
assert.match(repositoryRuntimeReadiness, /\nruntime_readiness_policy: "fail-closed"\n/);
assert.ok(
  repositoryRuntimeReadinessLines.length - 1 < 600,
  "repository runtime-readiness module must remain below 600 lines",
);

for (const term of [
  "GitHub",
  "Cloudflare",
  "Knowgrph",
  "Agentic Canvas OS",
  "huijoohwee",
  "airvio.co",
  "Builders Hub",
  "Avalanche",
  "Vercel",
]) {
  assert.doesNotMatch(
    repositoryRuntimeReadiness,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `repository runtime-readiness module must not contain adapter term ${term}`,
  );
}

for (const requirement of [
  "/runtime-ready.check #runtime-ready #harness #vcc #foss #ttv @repository-root @local-harness @runtime-proof",
  "Removing network access and the external repository",
  "Source admitted",
  "Local harness ready",
  "Browser ready",
  "Integration ready",
  "Deployed verified",
  "one package manager",
  "Content-address every generated or downloaded input",
  "actual offline or degraded-network transition",
  "prompt, cached, completion, and total tokens",
  "package-manager-drift",
  "deployment-proof-unjoined",
  "The command exits zero only for the requested layer",
  "performs no mutation, network, model, paid, integration, release, or deployment action",
]) {
  assert.match(
    repositoryRuntimeReadiness,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `repository runtime-readiness module must include ${requirement}`,
  );
}

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
assert.match(
  runtimeReadinessPolicy,
  /\.\/agentic-sdlc-conformance-runtime\.md/,
  "runtime-readiness policy must name its behavioral conformance companion",
);

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
  "turn:end",
  "localhost",
]) {
  assert.doesNotMatch(
    cloudCollaboration,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `cloud-collaboration module must not contain adapter term ${term}`,
  );
}

for (const requirement of [
  "protected remote ledger",
  "review requests and local execution locations are replaceable projections",
  "Actor ID, Device ID, Session ID, Worktree ID, Branch ID, Scope ID, Lease Epoch, and Fence Revision",
  "`repositoryId`",
  "`workItemId`",
  "`canonicalBaseRevision`",
  "`declaredWriteScope`",
  "`writeSetDigest`",
  "`claimId`",
  "`fenceRevision`",
  "`ledgerRevision`",
  "`expiresAt`",
  "`evaluationTime`",
  "`idempotencyKey`",
  "remotely addressable append-only hash chain",
  "complete active-writer inventory",
  "compare-and-swap",
  "at most one transition can be accepted",
  "Require an accepted `active` claim before any shared lane mutation",
  "Disjoint normalized write sets may proceed concurrently",
  "A review request is a projection of one ledger claim, not a lock",
  "They must not claim shared ownership",
  "Scheduling and queue concurrency create no lock authority",
  "Required protected checks independently verify the current ledger",
  "operation-derived digest-bound Collaboration Receipt joins admission evidence",
  "model-free commands for claim, renew, park, review-ready, handoff, release, inspect, and verify",
  "Byte-identical inputs and evaluation time produce identical findings",
  "Collaboration readiness is partial proof",
  "Forbid polling loops, per-device infrastructure, remote databases",
  "`parallel-scope-collision`",
  "`stale-collaboration-fence`",
  "`evidence-without-run`",
  "`runtime-readiness-unproven`",
]) {
  assert.match(
    normalizedCloudCollaboration,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `cloud-collaboration module must include ${requirement}`,
  );
}

for (const term of [
  "GitHub",
  "Cloudflare",
  "Knowgrph",
  "Agentic Canvas OS",
  "huijoohwee",
  "origin/main",
  "localhost",
]) {
  assert.doesNotMatch(
    upstreamAdmission,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `upstream-admission module must not contain adapter term ${term}`,
  );
}

for (const requirement of [
  "Prevent upstream dependencies from stopping an entire plan",
  "never permission to adopt, rewrite, mirror, project, or integrate unprotected",
  "Compute the exact transitive consumer closure",
  "Continue ready units outside those closures",
  "finite deadline and valid fallback",
  "Generate a downstream projection only from the exact protected source revision",
  "deterministic evaluator with typed input and output",
  "`upstream-source-unadmitted`",
  "`upstream-plan-overblocked`",
]) {
  assert.match(
    upstreamAdmission,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `upstream-admission module must include ${requirement}`,
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
  "repository-owned stage gates",
  "operation-derived evidence",
  "digest-bound receipts for admission, review, integration, runtime, candidate, authorization, deployment, and publication",
  "`npx`, `latest`, or dynamic resolution",
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
    conformanceRuntime,
    new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"),
    `conformance-runtime module must not contain adapter term ${term}`,
  );
}

for (const requirement of [
  "operation-derived evidence",
  "Policy Identity",
  "`policyRevision`",
  "`policyDigest`",
  "admission -> review -> integration -> runtime -> candidate -> authorization -> deployment -> publication",
  "Digest-Bound Stage Receipt",
  "`predecessorReceiptDigest`",
  "Every join compares run, policy, evaluator, source, dependency closure, stage order, evidence digest, and predecessor receipt digest",
  "Full-Stage Fail-Closed Invariants",
  "Byte-identical inputs produce identical findings, verdicts, and receipt digests",
  "Partial-Scope Claim Boundary",
  "`enforcedStages`",
  "`unevaluatedStages`",
  "cannot claim end-to-end conformance",
  "`npx`, a mutable `latest` selector",
  "none may establish policy identity",
]) {
  assert.match(
    conformanceRuntime,
    new RegExp(requirement.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    `conformance-runtime module must include ${requirement}`,
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
  `agentic SDLC guideline contract ok (${lines.length - 1} lines; conformance-runtime ${conformanceRuntimeLines.length - 1} lines; integration-order ${integrationOrderLines.length - 1} lines; cloud-collaboration ${cloudCollaborationLines.length - 1} lines; repository-runtime-readiness ${repositoryRuntimeReadinessLines.length - 1} lines)`,
);
