import assert from "node:assert/strict";
import fs from "node:fs";

const guidelineUrl = new URL("../guidelines/agentic-sdlc-guidelines.md", import.meta.url);
const source = fs.readFileSync(guidelineUrl, "utf8");
const lines = source.split("\n");

assert.ok(source.startsWith("---\n"), "guideline frontmatter must be present");
assert.match(source, /\nversion: "1\.2\.0"\n/);
assert.match(source, /\nuniversal_scope: "true"\n/);
assert.match(source, /\nlifecycle_status: "proposed"\n/);
assert.ok(lines.length - 1 < 600, "guideline must remain below 600 lines");

const requiredSections = [
  "## Scope & Neutrality Contract",
  "## Boundary with the Authoring Set",
  "## Task Model",
  "### Collaboration Identity",
  "## Human-in-the-Loop Gates",
  "## End-to-End Release Lifecycle Protocol",
  "### Receipt Chain",
  "### Collaboration and Controller Concurrency",
  "### Lifecycle Stages",
  "### Drift and Replay Invalidation",
  "### Reference Implementation Boundary",
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
  "Integration Receipt",
  "Runtime Review Receipt",
  "Candidate Manifest",
  "Human Authorization Receipt",
  "Live Verification Receipt",
  "Publication Receipt",
]) {
  assert.match(neutralReleaseProtocol, new RegExp(receipt), `receipt chain must include ${receipt}`);
}

for (const finding of [
  "`parallel-scope-collision`",
  "`stale-collaboration-fence`",
  "`dependency-closure-drift`",
  "`authorization-evidence-unjoined`",
  "`duplicate-release-controller`",
  "`production-authorization-drift`",
  "`post-authorization-rebuild`",
]) {
  assert.match(source, new RegExp(finding), `finding vocabulary must include ${finding}`);
}

console.log(`agentic SDLC guideline contract ok (${lines.length - 1} lines)`);
