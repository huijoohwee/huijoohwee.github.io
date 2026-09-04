import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { parseDocument } from "../lib/git-guidelines/content.mjs";
import { checkDivergence } from "../lib/git-guidelines/divergence.mjs";
import { buildRuleIndex } from "../lib/git-guidelines/rule-registry.mjs";

const repository = new URL("../..", import.meta.url);
const source = readFileSync(new URL("../../docs/documents/git-guidelines.md", import.meta.url), "utf8");
const ownerPaths = Object.freeze([
  "guidelines/adlc-guidelines.md",
  "guidelines/prd-tad-adr-guidelines.md",
  "guidelines/prd-tad-adr-verification.md",
  "guidelines/adlc-cloud-collaboration.md",
  "guidelines/adlc-scoped-lane-admission.md",
  "guidelines/commit-push-deploy-guidelines.md",
]);
const owners = Object.freeze(Object.fromEntries(ownerPaths.map(relative => [relative, readFileSync(new URL(relative, repository), "utf8")])));

test("real current-owner domains are conformant and inputs remain unchanged", () => {
  const document = parseDocument(source, "docs/documents/git-guidelines.md");
  const ruleIndex = buildRuleIndex(document);
  const ownersBefore = JSON.stringify(owners);
  assert.deepEqual(checkDivergence(document, owners, ruleIndex), []);
  assert.equal(document.text, source);
  assert.equal(JSON.stringify(owners), ownersBefore);
});

test("authoring findings require the declared companion and its unchanged semantic contract", () => {
  const authoringPath = "guidelines/prd-tad-adr-guidelines.md";
  const verificationPath = "guidelines/prd-tad-adr-verification.md";
  const missing = { ...owners };
  delete missing[verificationPath];
  assert.ok(run(source, missing).some(item => item.message.includes("verification companion is absent")));
  const unlinked = { ...owners, [authoringPath]: owners[authoringPath].replace(
    "[Conformance Findings module](./prd-tad-adr-verification.md)", "[Conformance Findings module](./unrelated.md)") };
  assert.ok(run(source, unlinked).some(item => item.message.includes("verification companion is absent")));
  for (const [before, after] of [
    ["Report a zero count for every type with no finding", "Omit every type with no finding"],
    ["Forbid either set redefining a type the other owns", "Allow either set to redefine the other's types"],
    ["| Lane topology | `deploy-boundary-breach` | `blocker` |", "| Lane topology | `deploy-boundary-breach` | `minor` |"],
    ["| Scope & neutrality | `vendor-coupling` | `major` |", "| Different scope | `vendor-coupling` | `major` |"],
    ["| Traceability closure | `unimplemented-guideline` | `major` |", ""],
  ]) {
    assert.ok(owners[verificationPath].includes(before), `verification fixture is stale: ${before}`);
    const findings = run(source, { ...owners, [verificationPath]: owners[verificationPath].replace(before, after) });
    assert.ok(findings.some(item => item.message.includes("C7 ")), before);
  }
});

test("execution concurrency retains capacity, overlap exclusion, waiting, and ambiguity fences", () => {
  const ownerPath = "guidelines/adlc-guidelines.md";
  for (const [before, after] of [
    ["within declared resource, evaluator, and coordination capacity", "without capacity bounds"],
    ["exactly one current write authority owns an overlapping write set", "multiple authorities may write an overlapping set"],
    ["an overlapping newcomer waits without writing", "an overlapping newcomer writes immediately"],
    ["ambiguous scope cannot create authority", "ambiguous scope creates authority"],
    ["Classify lanes as `canonical`, `overlapping`", "Classify lanes as `overlapping`, `canonical`"],
  ]) {
    assert.ok(owners[ownerPath].includes(before), `concurrency fixture is stale: ${before}`);
    const findings = run(source, { ...owners, [ownerPath]: owners[ownerPath].replace(before, after) });
    assert.ok(findings.some(item => item.message.startsWith("owner-divergence: C8 ")), before);
  }
});

test("every C1-C9 family fails closed when its named owner evidence changes", () => {
  const mutations = [
    ["C1", "Collaboration Module", "guidelines/adlc-cloud-collaboration.md", "tuple remains Actor ID", "tuple remains Principal ID"],
    ["C2", "Collaboration Module", "guidelines/adlc-cloud-collaboration.md", "commands for claim, renew, park,", "commands for renew, claim, park,"],
    ["C3", "Collaboration Module", "guidelines/adlc-cloud-collaboration.md", "Content mergeability does not prove ownership safety.", "Content mergeability proves ownership safety."],
    ["C4", "Collaboration Module", "guidelines/adlc-cloud-collaboration.md", "rejects stale fences", "accepts stale fences"],
    ["C5", "Collaboration Module", "guidelines/adlc-cloud-collaboration.md", "Admit a successor only after", "Admit a successor before"],
    ["C6", "Lane Admission Module", "guidelines/adlc-scoped-lane-admission.md", "Blocks before candidate creation or claim use.", "Allows candidate creation before claim use."],
    ["C7", "Authoring Authority", "guidelines/prd-tad-adr-guidelines.md", "owning section anchor", "source file path"],
    ["C8", "Execution Companion", "guidelines/adlc-guidelines.md", "Evaluator must be a different mechanism from the Implementer", "Evaluator may be the same mechanism as the Implementer"],
    ["C9", "Delivery Guidelines", "guidelines/commit-push-deploy-guidelines.md", "## Phase 2: Push", "## Phase 2: Share"],
  ];
  for (const [familyId, ownerName, ownerPath, before, after] of mutations) {
    assert.ok(owners[ownerPath].includes(before), `${familyId} mutation fixture is stale`);
    const mutatedOwners = { ...owners, [ownerPath]: owners[ownerPath].replaceAll(before, after) };
    const findings = run(source, mutatedOwners);
    assert.ok(findings.some(item => item.message.startsWith(`owner-divergence: ${familyId} `)
      && item.message.includes(`owner ${ownerName}`)), `${familyId} did not fail closed`);
  }
});

test("delivery ownership requires protected immutable authorization and proof-gated cleanup", () => {
  const ownerPath = "guidelines/commit-push-deploy-guidelines.md";
  const mutations = [
    ["Only the target-scoped protected integration controller may advance the", "Any workflow may advance the"],
    ["profile declares exactly one integration method", "profile accepts any enabled integration method"],
    ["`integrationMethod: squash`", "`integrationMethod: merge-commit`"],
    ["Direct canonical writes are", "Direct canonical writes may be"],
    ["Dirty, unversioned, or local-checkout deployment is forbidden.", "Dirty deployment is acceptable."],
    ["Exact authenticated human authorization binds one immutable candidate", "Automation authorization binds a mutable candidate"],
    ["Deploy the sealed artifact without rebuilding or retargeting it.", "Rebuild the artifact during deployment."],
    ["reconciles state by direct authoritative readback", "accepts the controller response without readback"],
    ["Verify every live surface before", "Verify every live surface after"],
    ["Cleanup removes only clean, integrated, completion-proven lanes.", "Cleanup removes every old lane."],
    ["active, parked, dirty, divergent, ambiguous, and unrelated work", "only active work"],
  ];
  for (const [before, after] of mutations) {
    assert.ok(owners[ownerPath].includes(before), `delivery mutation fixture is stale: ${before}`);
    const findings = run(source, { ...owners, [ownerPath]: owners[ownerPath].replace(before, after) });
    assert.ok(findings.some(item => item.message.startsWith("owner-divergence: C9 ")), before);
  }
});

test("delivery ownership parses target-specific frontmatter and the byte-exact Run A challenge", () => {
  const ownerPath = "guidelines/commit-push-deploy-guidelines.md";
  const mutations = [
    ['integrationMethod: "squash"', 'integrationMethod: "rebase"'],
    ['agentic_graph: ["huijoohwee/agentic-graph", "isolated-worktree", "squash", "Integration Gate"]',
      'agentic_graph: ["huijoohwee/agentic-graph", "isolated-worktree", "squash", "Runtime Readiness Gate"]'],
    ["artifact <artifactId> sha256 <artifactDigest>", "artifact <artifactId> digest <artifactDigest>"],
  ];
  for (const [before, after] of mutations) {
    assert.ok(owners[ownerPath].includes(before), `structured delivery fixture is stale: ${before}`);
    const mutatedOwners = { ...owners, [ownerPath]: owners[ownerPath].replace(before, after) };
    const findings = run(source, mutatedOwners);
    assert.ok(findings.some(item => item.message.includes("delivery owner structured policy differs")), before);
  }
});

test("delivery ownership keeps the human profile table byte-consistent with structured profiles", () => {
  const ownerPath = "guidelines/commit-push-deploy-guidelines.md";
  const gamexrRow = "| `huijoohwee/GameXR` | isolated worktree | squash | `Integration Gate` |";
  const mutantRow = "| `huijoohwee/GameXR` | isolated worktree | squash | `Runtime Readiness Gate` |";
  assert.ok(owners[ownerPath].includes(gamexrRow), "GameXR delivery-profile fixture is stale");
  const findings = run(source, { ...owners, [ownerPath]: owners[ownerPath].replace(gamexrRow, mutantRow) });
  assert.ok(findings.some(item => item.message.includes("human repository-profile table")));
});

test("delivery ownership rejects retired unsafe command and deployment patterns", () => {
  const ownerPath = "guidelines/commit-push-deploy-guidelines.md";
  const retired = [
    "git pull --rebase origin main",
    "git stash",
    "git stash push -m WIP",
    "git stash pop",
    "git add .",
    "git add -A",
    "git add --all",
    "git push -u origin main",
    "git push --set-upstream origin main",
    "git push origin main",
    "git push origin HEAD:main",
    "git push origin main # never skip verification",
    "Never skip verification: git push origin main",
    "git push origin \\\n  main",
    "git branch -d feature",
    "git branch -D feature",
    "git push origin --delete feature",
    "--commit-dirty",
    "pages:deploy-cloudflare",
    "Pushing to main IS the production deploy",
    "Commit-free exceptions",
  ];
  for (const value of retired) {
    const mutated = `${owners[ownerPath]}\n\n${value}\n`;
    const findings = run(source, { ...owners, [ownerPath]: mutated });
    assert.ok(findings.some(item => item.message.includes("retired delivery behavior remains")), value);
  }
});

test("delivery ownership permits explicit prohibitions to name a retired command", () => {
  const ownerPath = "guidelines/commit-push-deploy-guidelines.md";
  const mutated = `${owners[ownerPath]}\n\nNever run \`git push origin HEAD:main\`; it is forbidden.\nThe command \`git branch -D feature\` is forbidden.\nDo not use \`git stash push -m WIP\`.\n`;
  const findings = run(source, { ...owners, [ownerPath]: mutated });
  assert.equal(findings.some(item => item.message.includes("retired delivery behavior remains")), false);
});

test("delivery phase headings occur exactly once and in order", () => {
  const ownerPath = "guidelines/commit-push-deploy-guidelines.md";
  const duplicated = `${owners[ownerPath]}\n\n## Phase 2: Push\n`;
  const findings = run(source, { ...owners, [ownerPath]: duplicated });
  assert.ok(findings.some(item => item.message.includes("must occur exactly once and in order")));
});

test("ordered consumed domains reject claim-state, action, lane-class, and root-operation substitutions", () => {
  const mutations = [
    ["`active`, `review-ready`", "`current`, `review-ready`", "C1", "coordination-artifacts#10"],
    ["action is claim, renew, park", "action is renew, claim, park", "C2", "coordination-artifacts#9"],
    ["| `canonical` | Registered canonical branch", "| `primary` | Registered canonical branch", "C6", "lane-topology--admission#9"],
    ["`claim(scope)` uses clean exact base", "`continue(claim)` uses clean exact base", "C8", "lane-topology--admission#17"],
  ];
  for (const [before, after, familyId, ruleId] of mutations) {
    assert.ok(source.includes(before), `${familyId} document fixture is stale`);
    const findings = run(source.replace(before, after), owners);
    assert.ok(findings.some(item => item.ruleId === ruleId && item.message.startsWith(`owner-divergence: ${familyId} `)));
  }
});

test("boundary-row owner identity selects the current owner and fails closed on a mismatch", () => {
  const mutant = source.replace(
    "| C3 | write-scope comparison | consumes | [Collaboration Module](../../guidelines/adlc-cloud-collaboration.md) |",
    "| C3 | write-scope comparison | consumes | [Execution Companion](../../guidelines/adlc-guidelines.md) |",
  );
  const findings = run(mutant, owners);
  assert.ok(findings.some(item => item.ruleId === "boundary--ownership#3"
    && item.message.startsWith("owner-divergence: C3 write-scope comparison; owner Execution Companion;")));
});

test("inherited finding triggers, owner scopes, and document raising scopes are compared", () => {
  const changedReferences = source.replace("`authoring--write-scope#5-9`", "`authoring--write-scope#5-8`");
  assert.ok(run(changedReferences, owners).some(item => item.message.includes("Finding out-of-scope-write trigger or raising scope differs")));

  const executionPath = "guidelines/adlc-guidelines.md";
  const changedTriggerOwners = {
    ...owners,
    [executionPath]: owners[executionPath].replace("a write outside it is an `out-of-scope-write` finding", "a write outside it is permitted"),
  };
  assert.ok(run(source, changedTriggerOwners).some(item => item.message.includes("Finding out-of-scope-write has no matching current-owner trigger evidence")));

  const changedScopeOwners = {
    ...owners,
    [executionPath]: owners[executionPath].replace("| Tool permission | `out-of-scope-write`", "| Runtime | `out-of-scope-write`"),
  };
  assert.ok(run(source, changedScopeOwners).some(item => item.message.includes("Finding out-of-scope-write owner raising scope differs")));
});

test("terminology drift and unlicensed delivery commands carry supplied RuleIndex attribution", () => {
  const roleMutant = source.replace("Evaluator mechanism and Session ID", "Reviewer mechanism and Session ID");
  const roleFindings = run(roleMutant, owners);
  assert.ok(roleFindings.some(item => item.ruleId === "verification-gates#8"
    && item.message.startsWith("terminology-drift: C8 ") && item.message.includes("owner Execution Companion")));

  const commandMutant = source.replace("- [artifact-bearing] Stage only explicit repository-relative paths or selected interactive hunks.", "- [artifact-bearing] Stage only explicit paths with `git add . && git push`.");
  const commandFindings = run(commandMutant, owners);
  assert.ok(commandFindings.some(item => item.ruleId === "authoring--write-scope#3"
    && item.message.includes("owner command sequence is restated outside a reference implementation block")));

  const fencedMutant = source.replace(
    "- [artifact-bearing] Stage only explicit repository-relative paths or selected interactive hunks.",
    "- [artifact-bearing] Stage only explicit repository-relative paths or selected interactive hunks.\n\n  ```sh\n  git push origin main\n  ```",
  );
  const fencedFindings = run(fencedMutant, owners);
  assert.ok(fencedFindings.some(item => item.message.includes(
    "owner command sequence is restated outside a reference implementation block: `git push origin main`",
  )));

  for (const command of ["git branch -D feature", "git stash", "git stash push -m WIP", "git stash pop"]) {
    const inlineMutant = source.replace(
      "- [artifact-bearing] Stage only explicit repository-relative paths or selected interactive hunks.",
      `- [artifact-bearing] Stage only explicit repository-relative paths or selected interactive hunks with \`${command}\`.`,
    );
    const inlineFindings = run(inlineMutant, owners);
    assert.ok(inlineFindings.some(item => item.ruleId === "authoring--write-scope#3"
      && item.message.includes(`owner command sequence is restated outside a reference implementation block: \`${command}\``)), command);
  }

  const continuedMutant = source.replace(
    "- [artifact-bearing] Stage only explicit repository-relative paths or selected interactive hunks.",
    "- [artifact-bearing] Stage only explicit repository-relative paths or selected interactive hunks.\n\n  ```sh\n  git push origin \\\n    main\n  ```",
  );
  const continuedFindings = run(continuedMutant, owners);
  assert.ok(continuedFindings.some(item => item.message.includes(
    "owner command sequence is restated outside a reference implementation block: `git push origin main`",
  )));
});

function run(documentSource, ownerInput) {
  const document = parseDocument(documentSource, "docs/documents/git-guidelines.md");
  return checkDivergence(document, ownerInput, buildRuleIndex(document));
}
