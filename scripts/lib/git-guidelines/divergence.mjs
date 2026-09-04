import path from "node:path";

import { finding, referenceImplementationRanges, sectionByAnchor, tableCells, tableRows } from "./content.mjs";
import { readFrontmatter } from "./fm-reader.mjs";
import { buildRuleIndex } from "./rule-registry.mjs";

const EXACT_TERMS = Object.freeze(["`canonical`", "`overlapping`", "`disjoint-attributed`", "`ambiguous`", "Orchestrator", "Implementer", "Evaluator", "Operator"]);
const ROOT_OPERATIONS = Object.freeze(["claim(scope)", "continue(claim)", "integrate(candidate)", "retire(claim)"]);
const CLAIM_STATES = Object.freeze(["active", "review-ready", "delivery-authorized", "parked", "released", "expired", "revoked"]);
const CLAIM_ACTIONS = Object.freeze(["claim", "renew", "park", "review-ready", "delivery-authorize", "handoff", "release"]);
const LANE_CLASSES = Object.freeze(["canonical", "overlapping", "disjoint-attributed", "ambiguous"]);
const IDENTITY_FIELDS = Object.freeze(["Actor ID", "Device ID", "Session ID", "Worktree ID", "Branch ID", "Scope ID", "Lease Epoch", "Fence Revision"]);
const TERMINOLOGY_ALIASES = Object.freeze({
  Orchestrator: /\b(?:Coordinator|Orch(?:estrator)?s)\b/giu,
  Implementer: /\b(?:Implementor|Coder|Builder|Implementers)\b/giu,
  Evaluator: /\b(?:Reviewer|Judge|Eval|Evaluators)\b/giu,
  Operator: /\b(?:Approver|Ops|Operators)\b/giu,
  canonical: /`(?:canonical-lane|canon|canonicals)`/giu,
  overlapping: /`(?:overlap|overlapped|overlappings)`/giu,
  "disjoint-attributed": /`(?:disjoint|disjoint-lane|disjoint-attribution)`/giu,
  ambiguous: /`(?:ambig|unknown-lane|ambiguous-lane)`/giu,
});
const OWNER_FILES = Object.freeze({
  "Execution Companion": "guidelines/adlc-guidelines.md",
  "Authoring Authority": "guidelines/prd-tad-adr-guidelines.md",
  "Collaboration Module": "guidelines/adlc-cloud-collaboration.md",
  "Lane Admission Module": "guidelines/adlc-scoped-lane-admission.md",
  "Delivery Guidelines": "guidelines/commit-push-deploy-guidelines.md",
});
const RETIRED_DELIVERY_COMMAND_PATTERNS = Object.freeze([
  ["blind pull/rebase", /\bgit\s+pull\b[^\n]*--rebase(?:=\S+)?(?:\s|$)/iu],
  ["manual stash transport", /\bgit\s+stash\b/iu],
  ["broad staging", /\bgit\s+add\b[^\n]*(?:^|\s)(?:\.|-A|--all)(?:\s|$)/iu],
  ["direct canonical push", /\bgit\s+push\b[^\n]*(?:\borigin\b[^\n]*(?:\bmain\b|HEAD:(?:refs\/heads\/)?main\b)|(?:-u|--set-upstream)\b[^\n]*\borigin\b)/iu],
  ["manual branch cleanup", /\bgit\s+(?:branch\s+(?:-[dD]|--delete)|push\b[^\n]*\s--delete\b)/iu],
  ["dirty deployment", /--commit-dirty/iu],
  ["local Cloudflare deployment", /pages:deploy-cloudflare/iu],
]);
const RETIRED_DELIVERY_PROSE_PATTERNS = Object.freeze([
  ["merge-triggered production", /Pushing to main IS the production deploy/iu],
  ["commit-free delivery", /Commit-free exceptions/iu],
]);
const DELIVERY_AUTHORIZATION_CHALLENGE = "authorize agentic-graph-production-state-plan <planDigest> plan-run <planRunId> artifact <artifactId> sha256 <artifactDigest>";
const DELIVERY_REPOSITORY_PROFILES = Object.freeze({
  guideline_site: Object.freeze(["huijoohwee/huijoohwee.github.io", "isolated-worktree", "squash", "adlc-policy-contract"]),
  agentic_canvas_os: Object.freeze(["huijoohwee/agentic-canvas-os", "isolated-worktree", "squash", "test", "build", "docs-contract", "collaboration-integration", "cloud-collaboration"]),
  agentic_graph: Object.freeze(["huijoohwee/agentic-graph", "isolated-worktree", "squash", "Integration Gate"]),
  gamexr: Object.freeze(["huijoohwee/GameXR", "isolated-worktree", "squash", "Integration Gate"]),
  generated_production: Object.freeze(["huijoohwee/huijoohwee", "isolated-worktree", "squash", "Runtime Readiness Gate"]),
});

const CONSUMED_FAMILIES = Object.freeze([
  family("C1", "claim identity", "Collaboration Module", [
    projection("term", "lane-topology--admission#1", [/Actor ID \| Authenticated claim actor/u], [/tuple remains Actor ID, Device ID, Session ID,\s+Worktree ID, Branch ID, Scope ID, Lease Epoch, and Fence Revision/u]),
    projection("outcome", "lane-topology--admission#13", [/sole live writer per lane/iu], [/one active writer/iu, /current\s+accepted remote claim/iu]),
    projection("domain", "coordination-artifacts#12", [/claim, write-set, fence, ledger, and receipt digests/iu, /lease epoch/iu], [/`claimId`/u, /`writeSetDigest`/u, /`fenceRevision`/u, /`ledgerRevision`/u, /`leaseEpoch`/u]),
  ]),
  family("C2", "authority order", "Collaboration Module", [
    projection("ordering", "coordination-artifacts#9", [/action is claim, renew, park, review-ready, delivery-authorize, handoff, or release/iu], [/commands for claim, renew, park,\s+review-ready, delivery-authorize, handoff, release/iu]),
    projection("outcome", "lane-topology--admission#17", [/monotonic CAS/iu], [/compare-and-swap update/iu, /never force, overwrite, or silently retry as success/iu]),
    projection("outcome", "lane-topology--admission#26", [/unlimited pairwise-disjoint current authorities/iu, /each overlap has one writer/iu], [/Disjoint normalized write sets may proceed concurrently/iu, /overlap and must serialize/iu]),
  ]),
  family("C3", "write-scope comparison", "Collaboration Module", [
    projection("domain", "coordination-artifacts#18", [/equality, ancestry, shared semantics, wildcards, and undecidable scope all overlap/iu], [/Equal paths, ancestor\s+and descendant paths, shared semantic artifacts, generated-output authorities,\s+or ambiguous wildcards overlap/iu]),
    projection("term", "coordination-artifacts#18", [/Normalize `\.` and `\.\.` and trailing separators/iu], [/Normalize the requested write set/iu]),
    projection("outcome", "conflict--integration-order#9", [/Content mergeability proves no ownership safety/iu], [/Content mergeability does not prove ownership safety/iu]),
  ]),
  family("C4", "fence meaning", "Collaboration Module", [
    projection("term", "coordination-artifacts#24", [/fence equals the current accepted fence/iu], [/current cloud fence/iu, /`fenceRevision`/u]),
    projection("ordering", "coordination-artifacts#26", [/`claim.state: active`/u, /future expiry/iu, /current accepted fence/iu], [/current, non-expired, and state-valid/iu, /epoch, fence, and ledger\s+revision match/iu]),
    projection("outcome", "conflict--integration-order#13", [/Fence mismatch/iu, /raises `stale-collaboration-fence` and blocks/iu], [/rejects stale fences even when the authored bytes would merge\s+cleanly/iu]),
  ]),
  family("C5", "handoff semantics", "Collaboration Module", [
    projection("term", "lane-topology--admission#19", [/retirement, handoff, or reclaim/iu], [/accepted handoff/iu, /new accepted ledger transition/iu]),
    projection("ordering", "preservation-recovery--cleanup#16", [/Park for handoff only after pushing the lane revision/iu, /current Change_Manifest/iu, /recorded Recovery_Handle/iu], [/Move to `parked` when yielding/iu, /retain the\s+immutable recovery revision and exact write set/iu]),
    projection("outcome", "conflict--integration-order#8", [/peer blocks until release, handoff, or retirement/iu], [/Admit a successor only after the handoff transition is current/iu, /never copy\s+mutable working state between devices/iu]),
  ]),
  family("C6", "additive lane admission and preservation proof", "Lane Admission Module", [
    projection("term", "lane-topology--admission#18", [/Admission\/Preservation Receipts/u], [/Admission and Preservation Receipts/u]),
    projection("domain", "lane-topology--admission#18", [/head\/branch\/index\/tracked\/untracked bytes/iu, /registration\/lease\/fence\/recovery\/shared state/iu], [/indexDigest`, `workingBytesDigest`, `untrackedBytesDigest/u, /registrationInventoryDigest/u, /leaseInventoryDigest/u, /recoveryInventoryDigest/u]),
    projection("outcome", "lane-topology--admission#25", [/failed admission condition/iu, /preserves the pre-request state/iu, /no branch, ref, working, or untracked byte changes/iu], [/blocks before candidate creation or claim use/iu, /candidate operation must not mutate/iu]),
  ]),
  family("C7", "frontmatter, Rule_ID, findings, and readiness rungs", "Authoring Authority", [
    projection("term", "findings--rule-identity#1", [/section anchor plus `#`/iu, /1-based directive bullet or classified table-row ordinal/iu], [/owning section anchor/u, /"#"/u, /ordinal of the rule within that section, in document order/iu]),
    projection("domain", "findings--rule-identity#2", [/Classify every rule once/iu, /raisable finding and raising Rule_ID/iu, /explicit zero type counts/iu], [/Artifact-bearing/u, /Advisory/u, /zero count for every type/iu]),
    projection("outcome", "findings--rule-identity#3", [/inherited name and current owner severity unchanged/iu, /document-local marker extends the vocabulary/iu], [/single source of truth for \*\*authoring-domain\*\* finding names/iu, /Forbid either set redefining a type the other owns/iu]),
  ]),
  family("C8", "task model, roles, independence, blast radius, and budgets", "Execution Companion", [
    projection("term", "verification-gates#8", [/Evaluator mechanism and Session ID/iu, /differ from every Implementer pair/iu], [/Evaluator must be a different mechanism from the Implementer/iu]),
    projection("outcome", "verification-gates#14", [/verdict from an authoring mechanism and Session ID pair/iu, /raises `self-graded-verdict` and blocks/iu], [/verdict produced by the Implementer about its own task/iu, /`self-graded-verdict` finding at `blocker` severity/iu]),
    projection("outcome", "authoring--write-scope#8", [/`out-of-scope-write`/u, /every path outside the declared scope/iu], [/write outside it is an `out-of-scope-write` finding/iu]),
    projection("domain", null, [], [/Token bound/u, /Iteration bound/u, /Wall-clock bound/u, /Context bound/u, /four bounds and a circuit-breaker/iu]),
  ]),
  family("C9", "commit, push, and deploy command sequences", "Delivery Guidelines", [
    projection("term", "commit--attribution#16", [/Consume commit, push, and deploy sequences only from the Delivery Guidelines owner/iu], [/Phase 1: Commit/iu, /Phase 2: Push/iu, /Phase 3: .*deploy/iu]),
    projection("ordering", "commit--attribution#16", [/commit, push, and deploy sequences/iu], [/Commit and push the admitted task candidate first/iu, /Run the deploy chain only/iu]),
    projection("outcome", "commit--attribution#16", [/only from the Delivery Guidelines owner named in the boundary table/iu], [/Don't deploy over a red CI/iu, /Verify every live surface before\s+publishing the production mirror/iu]),
    projection("authority", "commit--attribution#16", [/only from the Delivery Guidelines owner named in the boundary table/iu], [
      /Only the target-scoped protected integration controller may advance the\s+canonical release frontier or initiate delivery/iu,
      /profile declares exactly one integration method/iu,
      /`integrationMethod: squash`/u,
      /Direct canonical writes are\s+forbidden/iu,
      /Dirty,\s+unversioned,\s+or\s+local-checkout deployment is forbidden/iu,
      /Exact authenticated human authorization binds one immutable candidate and\s+target/iu,
      /Deploy the sealed artifact without rebuilding or retargeting it/iu,
      /reconciles? state by direct authoritative readback/iu,
      /Cleanup removes only clean, integrated, completion-proven lanes/iu,
      /preserves\s+active, parked, dirty, divergent, ambiguous, and unrelated work/iu,
    ]),
  ]),
]);

const FINDING_CONTRACTS = Object.freeze([
  inheritedFinding("out-of-scope-write", "C8", "scope", "Tool permission", "major", ["authoring--write-scope#1-3", "authoring--write-scope#5-9", "authoring--write-scope#13-15"], /write outside it is an `out-of-scope-write` finding/iu),
  inheritedFinding("evidence-without-run", "C8", "evidence", "Verification", "blocker", ["verification-gates#6-13", "verification-gates#15-18", "preservation-recovery--cleanup#6-24"], /asserts success without a named check and a recorded result/iu),
  inheritedFinding("self-graded-verdict", "C8", "independence", "Role independence", "blocker", ["verification-gates#8", "verification-gates#14"], /verdict produced by the Implementer about its own task/iu),
  inheritedFinding("stale-collaboration-fence", "C4", "fence", null, "blocker", ["coordination-artifacts#15-19", "coordination-artifacts#21-29", "conflict--integration-order#13-14"], /rejects stale fences even when the authored bytes would merge/iu),
  inheritedFinding("deploy-boundary-breach", "C7", "promotion", "Lane topology", "blocker", ["promotion-chain#8-14"], /authoring-lane command that mutates a mirror or delivery surface/iu),
  inheritedFinding("admission-snapshot-stale", "C6", "admission", null, "blocker", ["lane-topology--admission#15", "lane-topology--admission#18-25", "lane-topology--admission#27-29"], /unknown or conflicting causality\s+raises `admission-snapshot-stale` and blocks/iu),
  inheritedFinding("concurrent-write-conflict", "C8", "concurrency", "Task model", "major", ["lane-topology--admission#13-29", "conflict--integration-order#6-18"], /forbid two tasks in one wave writing the same artifact/iu),
  inheritedFinding("vendor-coupling", "C7", "neutrality", "Scope & neutrality", "major", ["promotion-chain#17"], /brand named outside such a label is a `vendor-coupling` finding/iu),
  inheritedFinding("unimplemented-guideline", "C7", "conformance", "Traceability closure", "major", ["findings--rule-identity#2"], /only artifact-bearing rules can produce an `unimplemented-guideline`/iu),
]);

export function checkDivergence(document, owners, suppliedRuleIndex = null) {
  const findings = [];
  const ruleIndex = suppliedRuleIndex || buildRuleIndex(document);
  const contexts = resolveConsumedContexts(document, owners, ruleIndex, findings);
  checkProjectionEvidence(document, ruleIndex, contexts, findings);
  checkOrderedDomains(document, ruleIndex, contexts, findings);
  checkExactExecutionTerminology(document, ruleIndex, contexts.get("C8"), findings);
  checkFrontmatterProjection(document, ruleIndex, contexts.get("C7"), findings);
  checkDeliverySequenceOwnership(document, ruleIndex, contexts.get("C9"), findings);
  checkInheritedFindingRows(document, ruleIndex, contexts, findings);
  return findings;
}

function resolveConsumedContexts(document, owners, ruleIndex, findings) {
  const rows = tableRows(sectionByAnchor(document, "boundary--ownership"));
  const contexts = new Map();
  for (const contract of CONSUMED_FAMILIES) {
    const row = rows.find(candidate => candidate.cells[0] === contract.id);
    const boundaryRule = ruleAtLine(ruleIndex, row?.line) || ruleIndex.byId[`boundary--ownership#${Number(contract.id.slice(1))}`];
    const link = String(row?.cells[3] || "").match(/^\[([^\]]+)\]\(([^)]+)\)$/u);
    const namedOwner = link?.[1] || "missing owner";
    const ownerPath = link ? resolveOwnerPath(link[2], owners) : null;
    let ownerText = ownerPath ? String(owners[ownerPath] || "") : "";
    if (contract.id === "C7" && namedOwner === contract.ownerName) {
      const companion = "guidelines/prd-tad-adr-verification.md";
      const link = ownerText.match(/\[Conformance Findings module\]\(([^)]+)\)/u)?.[1];
      const linkedPath = link && ownerPath ? normalizedPath(path.posix.join(path.posix.dirname(ownerPath), link)) : null;
      const companionPath = linkedPath ? resolveOwnerPath(linkedPath, owners) : null;
      if (linkedPath !== companion || !companionPath || !String(owners[companionPath] || "").trim()) {
        findings.push(issue(document, boundaryRule, "owner-divergence", contract, namedOwner,
          "declared authoring verification companion is absent or does not resolve to its owner link.", row?.line));
      } else {
        ownerText += `\n${owners[companionPath]}`;
      }
    }
    const context = Object.freeze({ ...contract, row, boundaryRule, namedOwner, ownerPath, ownerText });
    contexts.set(contract.id, context);
    if (!row || row.cells[1] !== contract.family || row.cells[2] !== "consumes") {
      findings.push(issue(document, boundaryRule, "owner-divergence", contract, namedOwner, `boundary evidence is missing or mismatched for ${contract.id}.`, row?.line));
    }
    if (namedOwner !== contract.ownerName) {
      findings.push(issue(document, boundaryRule, "owner-divergence", contract, namedOwner, `expected current owner ${contract.ownerName}, observed ${namedOwner}.`, row?.line));
    }
    const expectedPath = OWNER_FILES[namedOwner];
    if (!ownerPath || !expectedPath || !normalizedPath(ownerPath).endsWith(expectedPath) || ownerText.length === 0) {
      findings.push(issue(document, boundaryRule, "owner-divergence", contract, namedOwner, "named current-owner evidence is absent or does not resolve to the boundary link.", row?.line));
    }
  }
  return contexts;
}

function checkProjectionEvidence(document, ruleIndex, contexts, findings) {
  for (const context of contexts.values()) {
    for (const entry of context.projections) {
      const rule = entry.ruleId ? ruleIndex.byId[entry.ruleId] : context.boundaryRule;
      const documentText = rule?.ruleText || "";
      for (const pattern of entry.documentPatterns) {
        if (pattern.test(documentText)) continue;
        findings.push(issue(document, rule || context.boundaryRule, "owner-divergence", context, context.namedOwner, `${entry.dimension} projection lacks document evidence ${pattern}.`, rule?.line || context.row?.line));
      }
      for (const pattern of entry.ownerPatterns) {
        if (pattern.test(context.ownerText)) continue;
        findings.push(issue(document, rule || context.boundaryRule, "owner-divergence", context, context.namedOwner, `${entry.dimension} projection lacks current-owner evidence ${pattern}.`, rule?.line || context.row?.line));
      }
    }
  }
}

function checkOrderedDomains(document, ruleIndex, contexts, findings) {
  compareDomain(document, ruleIndex, contexts.get("C1"), "collaboration identity", identityDomain(ruleIndex), identityOwnerDomain(contexts.get("C1")?.ownerText), IDENTITY_FIELDS, findings);
  compareDomain(document, ruleIndex, contexts.get("C1"), "accepted claim states", claimStateDomain(ruleIndex), ownerClaimStateDomain(contexts.get("C1")?.ownerText), CLAIM_STATES, findings, "coordination-artifacts#10");
  compareDomain(document, ruleIndex, contexts.get("C2"), "claim action order", claimActionDomain(ruleIndex), ownerClaimActionDomain(contexts.get("C2")?.ownerText), CLAIM_ACTIONS, findings, "coordination-artifacts#9");
  compareDomain(document, ruleIndex, contexts.get("C6"), "lane class order", laneClassDomain(ruleIndex), ownerLaneClassDomain(contexts.get("C6")?.ownerText), LANE_CLASSES, findings, "lane-topology--admission#9");
  compareDomain(document, ruleIndex, contexts.get("C8"), "root operation order", rootOperationDomain(ruleIndex), rootOperationOwnerDomain(contexts.get("C8")?.ownerText), ROOT_OPERATIONS, findings, "lane-topology--admission#17");
  compareDomain(document, ruleIndex, contexts.get("C8"), "lane class terminology", laneClassDomain(ruleIndex), executionLaneClassDomain(contexts.get("C8")?.ownerText), LANE_CLASSES, findings, "lane-topology--admission#9");
}

function compareDomain(document, ruleIndex, context, label, documentValues, ownerValues, expected, findings, ruleId = null) {
  if (!context) return;
  const rule = ruleIndex.byId[ruleId] || context.boundaryRule;
  if (sameArray(documentValues, ownerValues) && sameArray(documentValues, expected)) return;
  findings.push(issue(document, rule, "owner-divergence", context, context.namedOwner, `${label} differs: document=[${documentValues.join(", ")}], owner=[${ownerValues.join(", ")}].`, rule?.line || context.row?.line));
}

function checkExactExecutionTerminology(document, ruleIndex, context, findings) {
  if (!context) return;
  for (const term of [...EXACT_TERMS, ...ROOT_OPERATIONS]) {
    const plain = term.replaceAll("`", "");
    if (!document.text.includes(term) && !document.text.includes(plain)) {
      findings.push(issue(document, context.boundaryRule, "terminology-drift", context, context.namedOwner, `document omits exact consumed term ${term}.`, context.row?.line));
    }
    if (!context.ownerText.includes(term) && !context.ownerText.includes(plain)) {
      findings.push(issue(document, context.boundaryRule, "owner-divergence", context, context.namedOwner, `current owner omits consumed term ${term}.`, context.row?.line));
    }
    for (const variant of terminologyVariants(document.text, plain, term.startsWith("`"))) {
      const rule = ruleContaining(ruleIndex, variant) || context.boundaryRule;
      findings.push(issue(document, rule, "terminology-drift", context, context.namedOwner, `Alternative spelling ${variant} is forbidden; use ${plain}.`, rule?.line || context.row?.line));
    }
  }
  for (const [canonical, pattern] of Object.entries(TERMINOLOGY_ALIASES)) {
    for (const match of document.text.matchAll(pattern)) {
      const variant = match[0].replaceAll("`", "");
      const rule = ruleContaining(ruleIndex, match[0]) || ruleContaining(ruleIndex, variant) || context.boundaryRule;
      findings.push(issue(document, rule, "terminology-drift", context, context.namedOwner, `Alternative spelling ${variant} is forbidden; use ${canonical}.`, rule?.line || context.row?.line));
    }
  }
  for (const [phrase, pattern] of [
    ["capacity-bounded disjoint concurrency", /Permit policy-unbounded concurrency for disjoint normalized write sets within declared resource, evaluator, and coordination capacity/u],
    ["one writer per overlap", /exactly one current write authority owns an overlapping write set/u],
    ["non-writing waiting successor", /an overlapping newcomer waits without writing/u],
    ["ambiguous scope creates no authority", /ambiguous scope cannot create authority/u],
    ["dormant-preserved", /dormant-preserved/u],
  ]) {
    if (pattern.test(context.ownerText)) continue;
    findings.push(issue(document, context.boundaryRule, "owner-divergence", context, context.namedOwner, `current owner lacks authority rule: ${phrase}.`, context.row?.line));
  }
}

function checkFrontmatterProjection(document, ruleIndex, context, findings) {
  if (!context) return;
  const requiredKeys = ["title", "doc_type", "version", "date", "lang", "owner", "local_rung", "delivered_rung", "lane", "universal_scope"];
  const frontmatter = document.text.match(/^---\n([\s\S]*?)\n---/u)?.[1] || "";
  const documentKeys = frontmatter.split("\n").map(line => line.match(/^([a-z_]+):/u)?.[1]).filter(Boolean);
  const missingKeys = requiredKeys.filter(key => !documentKeys.includes(key));
  const ownerMissing = ["title", "doc_type", "version", "date", "lang"].filter(key => !context.ownerText.includes(`\`${key}\``));
  for (const key of ["owner", "local_rung", "delivered_rung", "lane", "universal_scope"]) if (!context.ownerText.includes(`\`${key}\``)) ownerMissing.push(key);
  const selectedRungs = ["local_rung", "delivered_rung"].map(key => frontmatter.match(new RegExp(`^${key}:\\s*[\"']?([^\"'\\n]+)`, "mu"))?.[1]?.trim()).filter(Boolean);
  const ownerRungs = readinessRungs(context.ownerText);
  const invalidRungs = selectedRungs.filter(rung => !ownerRungs.includes(rung));
  if (missingKeys.length === 0 && ownerMissing.length === 0 && invalidRungs.length === 0 && sameArray(ownerRungs, ["undocumented", "spec-complete", "dev-proven", "runtime-ready", "production-verified"])) return;
  findings.push(issue(document, ruleIndex.byId["findings--rule-identity#1"] || context.boundaryRule, "owner-divergence", context, context.namedOwner, `frontmatter/readiness domain differs; document missing=[${missingKeys}], owner missing=[${ownerMissing}], invalid rungs=[${invalidRungs}].`));
}

function checkDeliverySequenceOwnership(document, ruleIndex, context, findings) {
  if (!context) return;
  checkDeliveryOwnerProfile(document, ruleIndex, context, findings);
  const phasePatterns = [/^## Phase 1: Commit/mu, /^## Phase 2: Push/mu, /^## Phase 3: .*deploy/mu];
  const phaseMatches = phasePatterns.map(pattern => [...context.ownerText.matchAll(new RegExp(pattern.source, pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`))]);
  const positions = phaseMatches.map(matches => matches[0]?.index ?? -1);
  if (phaseMatches.some(matches => matches.length !== 1)
    || positions.some(position => position < 0)
    || positions.some((position, index) => index > 0 && position <= positions[index - 1])) {
    findings.push(issue(document, ruleIndex.byId["commit--attribution#16"] || context.boundaryRule, "owner-divergence", context, context.namedOwner, `owner commit/push/deploy phases must occur exactly once and in order.`));
  }
  for (const [label, pattern] of RETIRED_DELIVERY_PROSE_PATTERNS) {
    if (!pattern.test(context.ownerText)) continue;
    findings.push(issue(document, ruleIndex.byId["commit--attribution#16"] || context.boundaryRule, "owner-divergence", context, context.namedOwner, `retired delivery behavior remains: ${label}.`));
  }
  for (const command of executableDeliveryCommands(context.ownerText)) {
    for (const [label, pattern] of RETIRED_DELIVERY_COMMAND_PATTERNS) {
      if (!pattern.test(command)) continue;
      findings.push(issue(document, ruleIndex.byId["commit--attribution#16"] || context.boundaryRule, "owner-divergence", context, context.namedOwner, `retired delivery behavior remains: ${label}.`));
    }
  }
  const licensed = referenceImplementationRanges(document);
  for (const command of commandOccurrences(document.text)) {
    if (licensed.some(range => command.startLine >= range.startLine && command.endLine <= range.endLine)) continue;
    const rule = ruleAtLine(ruleIndex, command.startLine) || context.boundaryRule;
    findings.push(issue(document, rule, "owner-divergence", context, context.namedOwner, `owner command sequence is restated outside a reference implementation block: \`${command.text}\`.`, command.startLine));
  }
}

function checkDeliveryOwnerProfile(document, ruleIndex, context, findings) {
  const rule = ruleIndex.byId["commit--attribution#16"] || context.boundaryRule;
  let frontmatter;
  try {
    frontmatter = readFrontmatter(context.ownerText).data;
  } catch (error) {
    findings.push(issue(document, rule, "owner-divergence", context, context.namedOwner, `delivery owner frontmatter is not parseable: ${error.message}.`));
    return;
  }
  const expectedRepositories = Object.values(DELIVERY_REPOSITORY_PROFILES).map(profile => profile[0]);
  const profileErrors = [];
  if (frontmatter.repository !== "huijoohwee/huijoohwee.github.io") profileErrors.push("current repository");
  if (frontmatter.workspaceTopology !== "isolated-worktree") profileErrors.push("workspaceTopology");
  if (frontmatter.integrationMethod !== "squash") profileErrors.push("integrationMethod");
  if (!sameArray(frontmatter.required_checks, ["adlc-policy-contract"])) profileErrors.push("required_checks");
  if (!sameArray(frontmatter.applies_to, expectedRepositories)) profileErrors.push("applies_to");
  if (!frontmatter.repository_profiles || typeof frontmatter.repository_profiles !== "object"
    || Array.isArray(frontmatter.repository_profiles)) profileErrors.push("repository_profiles");
  else {
    const observedKeys = Object.keys(frontmatter.repository_profiles);
    const expectedKeys = Object.keys(DELIVERY_REPOSITORY_PROFILES);
    if (!sameArray(observedKeys, expectedKeys)) profileErrors.push("repository profile keys");
    for (const key of expectedKeys) {
      if (!sameArray(frontmatter.repository_profiles[key], DELIVERY_REPOSITORY_PROFILES[key])) {
        profileErrors.push(`repository profile ${key}`);
      }
    }
  }
  const structuredProfiles = frontmatter.repository_profiles && typeof frontmatter.repository_profiles === "object"
    && !Array.isArray(frontmatter.repository_profiles)
    ? Object.keys(DELIVERY_REPOSITORY_PROFILES).map(key => frontmatter.repository_profiles[key]).filter(Array.isArray)
    : [];
  const expectedHumanRows = structuredProfiles.map(profile => [profile[0], String(profile[1] ?? "").replaceAll("-", " "), profile[2], ...profile.slice(3)]);
  const observedHumanRows = deliveryProfileTableRows(context.ownerText);
  if (!observedHumanRows || !sameNestedArray(observedHumanRows, expectedHumanRows)
    || !sameNestedArray(observedHumanRows, Object.values(DELIVERY_REPOSITORY_PROFILES)
      .map(profile => [profile[0], profile[1].replaceAll("-", " "), profile[2], ...profile.slice(3)]))) {
    profileErrors.push("human repository-profile table");
  }
  const challengeCount = context.ownerText.split(DELIVERY_AUTHORIZATION_CHALLENGE).length - 1;
  if (challengeCount !== 1) profileErrors.push("byte-exact Agentic Graph authorization challenge");
  if (profileErrors.length === 0) return;
  findings.push(issue(document, rule, "owner-divergence", context, context.namedOwner, `delivery owner structured policy differs: ${profileErrors.join(", ")}.`));
}

function executableDeliveryCommands(text) {
  return commandSpans(text)
    .filter(command => !isExplicitProhibition(command))
    .map(command => command.text);
}

function commandOccurrences(text) {
  const seen = new Set();
  return commandSpans(text).filter(command => {
    if (!looksLikeDeliveryCommand(command.text)) return false;
    const key = `${command.startLine}:${command.endLine}:${command.text}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function looksLikeDeliveryCommand(value) {
  return /^(?:git\s+(?:add|branch|commit|push|pull|merge|rebase|reset|checkout|stash|switch)\b|npm\s+run\s+(?:pages:|deploy|release)|wrangler\s+|vercel\s+deploy\b)/iu.test(value);
}

function commandSpans(text) {
  const commands = [];
  for (const logicalLine of logicalCommandLines(text)) {
    const codeRanges = [...logicalLine.text.matchAll(/`([^`\n]+)`/gu)].map(match => ({
      start: match.index,
      end: match.index + match[0].length,
      text: match[1],
    }));
    for (const range of codeRanges) {
      const normalized = normalizeCommandText(range.text);
      if (!looksLikeDeliveryCommand(normalized)
        && !RETIRED_DELIVERY_COMMAND_PATTERNS.some(([, pattern]) => pattern.test(normalized))) continue;
      commands.push(commandSpan(logicalLine, normalized, range.start, range.end, "inline-code"));
    }

    for (const match of logicalLine.text.matchAll(/\b(?:git\s+(?:add|branch|commit|push|pull|merge|rebase|reset|checkout|stash|switch)\b|npm\s+run\s+(?:pages:|deploy|release)|wrangler\s+|vercel\s+deploy\b)/giu)) {
      if (codeRanges.some(range => match.index >= range.start && match.index < range.end)) continue;
      const normalized = normalizeCommandText(logicalLine.text.slice(match.index));
      commands.push(commandSpan(logicalLine, normalized, match.index, logicalLine.text.length, "plain"));
    }

    for (const match of logicalLine.text.matchAll(/--commit-dirty|pages:deploy-cloudflare/giu)) {
      if (codeRanges.some(range => match.index >= range.start && match.index < range.end)) continue;
      if (commands.some(command => command.logicalLine === logicalLine && match.index >= command.startIndex)) continue;
      const normalized = normalizeCommandText(logicalLine.text.slice(match.index));
      commands.push(commandSpan(logicalLine, normalized, match.index, logicalLine.text.length, "plain"));
    }
  }
  return commands;
}

function logicalCommandLines(text) {
  const physicalLines = String(text).replace(/\r\n?/gu, "\n").split("\n");
  const logicalLines = [];
  for (let index = 0; index < physicalLines.length; index += 1) {
    const startLine = index + 1;
    let endLine = startLine;
    let value = physicalLines[index];
    while (/\\\s*$/u.test(value) && index + 1 < physicalLines.length) {
      value = `${value.replace(/\\\s*$/u, " ")}${physicalLines[index + 1].trimStart()}`;
      index += 1;
      endLine = index + 1;
    }
    logicalLines.push({ text: value, startLine, endLine });
  }
  return logicalLines;
}

function commandSpan(logicalLine, text, startIndex, endIndex, kind) {
  return { ...logicalLine, logicalLine, text, startIndex, endIndex, kind };
}

function normalizeCommandText(value) {
  return String(value).trim().replace(/^\$\s*/u, "").replace(/\\\s+/gu, " ").replace(/\s+/gu, " ");
}

function isExplicitProhibition(command) {
  const prefix = command.logicalLine.text.slice(0, command.startIndex)
    .replace(/^\s*(?:[-*+]\s+)?/u, "")
    .split(/[.!?;]|\s+#/u).at(-1).trim();
  if (/(?:^|\b)(?:(?:never|do not|don't|must not|may not)(?:\s+(?:run|execute|invoke|issue|use|allow|permit))?(?:\s+the)?(?:\s+shell)?(?:\s+command)?\s*:?|(?:it\s+is\s+)?(?:forbidden|prohibited)\s+to\s+(?:run|execute|invoke|issue|use)(?:\s+the)?(?:\s+command)?|(?:forbidden|prohibited|retired)\s+(?:shell\s+)?command\s*:)\s*$/iu.test(prefix)) return true;
  if (command.kind !== "inline-code") return false;
  const suffix = command.logicalLine.text.slice(command.endIndex);
  return /^\s*(?:is|remains)\s+(?:strictly\s+)?(?:forbidden|prohibited|retired)\b/iu.test(suffix);
}

function deliveryProfileTableRows(text) {
  const lines = String(text).replace(/\r\n?/gu, "\n").split("\n");
  const sectionStarts = lines.map((line, index) => /^## Delivery profiles\s*$/u.test(line) ? index : -1).filter(index => index >= 0);
  if (sectionStarts.length !== 1) return null;
  const sectionStart = sectionStarts[0];
  const sectionEndOffset = lines.slice(sectionStart + 1).findIndex(line => /^##\s+/u.test(line));
  const sectionEnd = sectionEndOffset < 0 ? lines.length : sectionStart + 1 + sectionEndOffset;
  const headerIndexes = [];
  for (let index = sectionStart + 1; index < sectionEnd; index += 1) {
    if (sameArray(tableCells(lines[index]), ["Repository", "Workspace", "Integration", "Required checks"])) headerIndexes.push(index);
  }
  if (headerIndexes.length !== 1) return null;
  const headerIndex = headerIndexes[0];
  if (!tableCells(lines[headerIndex + 1] || "").every(cell => /^:?-{3,}:?$/u.test(cell))) return null;
  const rows = [];
  for (let index = headerIndex + 2; index < sectionEnd; index += 1) {
    const cells = tableCells(lines[index]);
    if (cells.length === 0) break;
    if (cells.length !== 4) return null;
    const repository = exactCodeCell(cells[0]);
    const checks = exactCodeList(cells[3]);
    if (!repository || !checks) return null;
    rows.push([repository, cells[1], cells[2], ...checks]);
  }
  return rows;
}

function exactCodeCell(value) { return String(value).match(/^`([^`]+)`$/u)?.[1] || null; }
function exactCodeList(value) {
  const checks = [...String(value).matchAll(/`([^`]+)`/gu)].map(match => match[1]);
  return checks.length > 0 && String(value) === checks.map(check => `\`${check}\``).join(", ") ? checks : null;
}

function checkInheritedFindingRows(document, ruleIndex, contexts, findings) {
  const rows = tableRows(sectionByAnchor(document, "findings--rule-identity"));
  for (const contract of FINDING_CONTRACTS) {
    const context = contexts.get(contract.boundaryId);
    if (!context) continue;
    const row = rows.find(candidate => findingTypes(candidate.cells[2]).includes(contract.type));
    const rowRule = ruleAtLine(ruleIndex, row?.line) || ruleIndex.byId["findings--rule-identity#2"] || context.boundaryRule;
    if (!row) {
      findings.push(issue(document, rowRule, "finding-type-redefinition", context, context.namedOwner, `Finding ${contract.type} is absent from the inherited registry.`));
      continue;
    }
    const ownership = row.cells[4] || "";
    const namedOwner = ownership.startsWith("inherited: ") ? ownership.slice("inherited: ".length) : ownership;
    const references = [...String(row.cells[1] || "").matchAll(/`([a-z0-9-]+#\d+(?:-\d+)?)`/gu)].map(match => match[1]);
    const enumerationRows = ownerFindingRows(context.ownerText, contract.type);
    const ownerSeverities = [...new Set(enumerationRows.map(ownerRow => ownerRow.severity))];
    const ownerScopes = [...new Set(enumerationRows.map(ownerRow => ownerRow.scope).filter(Boolean))];
    if (namedOwner !== context.ownerName || row.cells[0] !== contract.documentFamily) {
      findings.push(issue(document, rowRule, "finding-type-redefinition", context, namedOwner, `Finding ${contract.type} ownership or trigger family differs from ${context.ownerName}.`, row.line));
    }
    if (enumerationRows.length === 0) {
      findings.push(issue(document, rowRule, "finding-type-redefinition", context, namedOwner, `Finding ${contract.type} names ${namedOwner}, but that owner has no matching enumeration row.`, row.line));
    } else if (!ownerSeverities.includes(row.cells[3])) {
      findings.push(issue(document, rowRule, "finding-type-redefinition", context, namedOwner, `Finding ${contract.type} severity ${row.cells[3]} diverges from ${namedOwner} severity ${ownerSeverities.join(" or ")}.`, row.line));
    }
    if (row.cells[3] !== contract.severity || !sameArray(references, contract.references)) {
      findings.push(issue(document, rowRule, "finding-type-redefinition", context, namedOwner, `Finding ${contract.type} trigger or raising scope differs; observed [${references.join(", ")}].`, row.line));
    }
    if (contract.ownerScope && !ownerScopes.includes(contract.ownerScope)) {
      findings.push(issue(document, rowRule, "finding-type-redefinition", context, namedOwner, `Finding ${contract.type} owner raising scope differs; expected ${contract.ownerScope}, observed ${ownerScopes.join(" or ") || "none"}.`, row.line));
    }
    if (!contract.ownerTrigger.test(context.ownerText)) {
      findings.push(issue(document, rowRule, "finding-type-redefinition", context, namedOwner, `Finding ${contract.type} has no matching current-owner trigger evidence.`, row.line));
    }
  }
}

function identityDomain(ruleIndex) {
  return IDENTITY_FIELDS.map(label => ruleIndex.rules.find(rule => rule.anchor === "lane-topology--admission" && rule.ruleText.startsWith(`${label} |`))?.ruleText.split(" | ")[0]).filter(Boolean);
}
function identityOwnerDomain(text = "") {
  const tuple = text.match(/tuple remains ([^.]+)\./u)?.[1] || "";
  return IDENTITY_FIELDS.filter(label => tuple.includes(label));
}
function claimStateDomain(ruleIndex) {
  const text = ruleIndex.byId["coordination-artifacts#10"]?.ruleText || "";
  return [...text.matchAll(/`([a-z-]+)`/gu)].map(match => match[1]).filter(value => value !== "claim" && value !== "state");
}
function ownerClaimStateDomain(text = "") {
  const sentence = text.match(/Accepted states are ([^.]+)\./u)?.[1] || "";
  return [...sentence.matchAll(/`([a-z-]+)`/gu)].map(match => match[1]);
}
function claimActionDomain(ruleIndex) {
  const text = ruleIndex.byId["coordination-artifacts#9"]?.ruleText || "";
  return splitList(text.match(/action is (.+?)(?:\.|$)/iu)?.[1]);
}
function ownerClaimActionDomain(text = "") {
  const list = text.match(/commands for (.+?)\.(?:\s+Commands\s+accept|$)/isu)?.[1] || "";
  return splitList(list).filter(value => CLAIM_ACTIONS.includes(value));
}
function laneClassDomain(ruleIndex) {
  return ruleIndex.rules.filter(rule => rule.anchor === "lane-topology--admission" && rule.ordinal >= 9 && rule.ordinal <= 12)
    .map(rule => rule.ruleText.match(/^`([^`]+)` \|/u)?.[1]).filter(Boolean);
}
function ownerLaneClassDomain(text = "") {
  return tableLines(text).map(cells => cells[0]?.replaceAll("`", "")).filter(value => LANE_CLASSES.includes(value));
}
function executionLaneClassDomain(text = "") {
  const sentence = text.match(/Classify lanes as ([^\n]+)/u)?.[1] || "";
  return [...new Set([...sentence.matchAll(/`([^`]+)`/gu)].map(match => match[1]).filter(value => LANE_CLASSES.includes(value)))];
}
function rootOperationDomain(ruleIndex) {
  return ruleIndex.rules.filter(rule => rule.anchor === "lane-topology--admission")
    .flatMap(rule => [...rule.ruleText.matchAll(/`([a-z]+\([^`]+\))`/gu)].map(match => match[1]))
    .filter(value => ROOT_OPERATIONS.includes(value));
}
function rootOperationOwnerDomain(text = "") {
  const sentence = text.match(/Expose exactly four provider-neutral root operations: ([^\n]+)/u)?.[1] || "";
  return [...sentence.matchAll(/`([^`]+)`/gu)].map(match => match[1]).filter(value => ROOT_OPERATIONS.includes(value));
}
function readinessRungs(text = "") {
  const ladder = text.match(/undocumented\s*<\s*spec-complete\s*<\s*dev-proven\s*<\s*runtime-ready\s*<\s*production-verified/u)?.[0] || "";
  return ladder.split(/\s*<\s*/u).filter(Boolean);
}
function ownerFindingRows(text, type) {
  return tableLines(text).filter(cells => cells.includes(`\`${type}\``)).flatMap(cells => {
    const severity = cells.map(cell => cell.replace(/^`|`$/gu, "")).find(cell => /^(?:blocker|major|minor)$/u.test(cell));
    if (!severity) return [];
    const typeIndex = cells.indexOf(`\`${type}\``);
    return [{ severity, scope: typeIndex > 0 ? cells[typeIndex - 1].replace(/\*\*/gu, "") : null }];
  });
}
function tableLines(text) { return String(text).split(/\r?\n/u).map(tableCells).filter(cells => cells.length > 0); }
function findingTypes(cell) { return [...String(cell || "").matchAll(/`([a-z0-9-]+)`/gu)].map(match => match[1]); }
function splitList(value = "") { return String(value).replace(/\band\b|\bor\b/giu, ",").split(",").map(item => item.trim()).filter(Boolean); }
function sameArray(left, right) { return left.length === right.length && left.every((value, index) => value === right[index]); }
function sameNestedArray(left, right) { return left.length === right.length && left.every((value, index) => sameArray(value, right[index] || [])); }
function ruleAtLine(ruleIndex, line) { return ruleIndex.rules.find(rule => rule.line === line); }
function ruleContaining(ruleIndex, value) { return ruleIndex.rules.find(rule => rule.ruleText.includes(value)); }
function normalizedPath(value) { return path.posix.normalize(String(value).replaceAll("\\", "/")).replace(/^\.\//u, ""); }
function resolveOwnerPath(href, owners) {
  const linked = normalizedPath(href).replace(/^(?:\.\.\/)+/u, "");
  const matches = Object.keys(owners).filter(candidate => {
    const normalized = normalizedPath(candidate);
    return normalized === linked || normalized.endsWith(`/${linked}`) || linked.endsWith(`/${normalized}`);
  });
  return matches.length === 1 ? matches[0] : null;
}
function terminologyVariants(text, canonical, codeTokenOnly) {
  const source = codeTokenOnly ? [...String(text).matchAll(/`([^`\n]+)`/gu)].map(match => match[1]).join("\n") : String(text);
  const pattern = canonical.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&").replaceAll("-", "[-_ ]?");
  return [...source.matchAll(new RegExp(`(?<![A-Za-z0-9_])${pattern}(?![A-Za-z0-9_])`, "giu"))]
    .map(match => match[0]).filter(value => value !== canonical && `\`${value}\`` !== canonical);
}
function family(id, familyName, ownerName, projections) { return Object.freeze({ id, family: familyName, ownerName, projections: Object.freeze(projections) }); }
function projection(dimension, ruleId, documentPatterns, ownerPatterns) { return Object.freeze({ dimension, ruleId, documentPatterns: Object.freeze(documentPatterns), ownerPatterns: Object.freeze(ownerPatterns) }); }
function inheritedFinding(type, boundaryId, documentFamily, ownerScope, severity, references, ownerTrigger) { return Object.freeze({ type, boundaryId, documentFamily, ownerScope, severity, references: Object.freeze(references), ownerTrigger }); }
function issue(document, rule, code, context, namedOwner, detail, line = null) {
  const ruleId = rule?.id || `boundary--ownership#${Number(context?.id?.slice(1) || 1)}`;
  const ruleText = rule?.ruleText || `${context?.id || "boundary"} ${context?.family || "owner comparison"}`;
  const familyName = context?.family || "owner comparison";
  return finding({ ruleId, ruleText, type: "unimplemented-guideline", severity: "major", path: document.sourcePath, line: line || rule?.line || 1, message: `${code}: ${context?.id || "finding"} ${familyName}; owner ${namedOwner || "missing owner"}; ${detail}` });
}
