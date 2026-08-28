import { finding } from "./content.mjs";
import { resolveRuleId } from "./rule-registry.mjs";

const SUBJECT_PATTERN = /^(feat|fix|docs|test|refactor|chore)\(([a-z0-9][a-z0-9._/-]*)\): (\S.*)$/u;
const OID_PATTERN = /^[0-9a-f]{40}(?:[0-9a-f]{24})?$/u;
const MAX_REFRESH_HOPS = 16;
const REQUIRED_TRAILERS = Object.freeze([
  "Agentic-Task",
  "Agentic-Scope",
  "Agentic-Lease-Epoch",
  "Agentic-Mechanism",
]);

export function checkCommitAttribution(document, gitFacts, ruleIndex) {
  if (!requiresAgenticAttribution(gitFacts)) return [];
  const problems = validateCommitAttribution(gitFacts.commitMessage, { branch: gitFacts.branch });
  if (problems.length === 0 || isExactProtectedMainRefresh(gitFacts)) return [];
  const grouped = Map.groupBy(problems, problem => attributionRuleId(problem, ruleIndex));
  return [...grouped.entries()].map(([ruleId, ruleProblems]) => finding({
    ruleId,
    type: "unattributed-agentic-commit",
    path: document.sourcePath,
    message: `Commit ${gitFacts.head || "HEAD"} has invalid agentic attribution: ${ruleProblems.join(" ")}`,
  }));
}

export function isExactProtectedMainRefresh(gitFacts) {
  const branch = gitFacts?.branch;
  const proof = gitFacts?.refreshChain;
  const authority = gitFacts?.refreshAuthority;
  const branchScope = branchScopeOf(branch);
  if (!branchScope || !proof || !validRefreshAuthority(authority, branchScope)) return false;
  if (proof.maximumHops !== MAX_REFRESH_HOPS || proof.truncated !== false || proof.objectFailure !== false) return false;
  if (!isOid(proof.expectedProtectedRevision) || !Array.isArray(proof.nodes)) return false;
  if (proof.nodes.length < 2 || proof.nodes.length > MAX_REFRESH_HOPS + 1) return false;

  const firstNode = proof.nodes[0];
  if (!isOid(gitFacts?.head) || firstNode?.revision !== gitFacts.head) return false;
  if (authority.laneRevision !== gitFacts.head) return false;
  const subject = bareEnvelopeSubject(firstNode?.message, branchScope);
  if (subject === null) return false;

  const visited = new Set();
  let newerProtectedParent = null;
  for (let index = 0; index < proof.nodes.length; index += 1) {
    const node = proof.nodes[index];
    if (!validCommitNode(node) || visited.has(node.revision)) return false;
    visited.add(node.revision);

    const attributionProblems = validateCommitAttribution(node.message, { branch });
    if (attributionProblems.length === 0) {
      return index > 0
        && index === proof.nodes.length - 1
        && firstSubject(node.message) === subject;
    }

    if (index >= MAX_REFRESH_HOPS || index === proof.nodes.length - 1) return false;
    if (bareEnvelopeSubject(node.message, branchScope) !== subject) return false;
    if (node.parents.length !== 2 || node.parents.some(parent => !isOid(parent))) return false;
    const [firstParent, protectedParent] = node.parents;
    if (firstParent === protectedParent || visited.has(protectedParent)) return false;
    visited.add(protectedParent);
    if (proof.nodes[index + 1]?.revision !== firstParent) return false;
    if (!exactSingleton(node.mergeBases) || node.mergeBases[0] === firstParent || node.mergeBases[0] === protectedParent) return false;
    if (!isOid(node.mergeBaseTree) || !isOid(node.protectedTree) || node.mergeBaseTree === node.protectedTree) return false;
    if (!isOid(node.expectedMergeTree) || node.expectedMergeTree !== node.tree) return false;

    if (index === 0) {
      if (protectedParent !== proof.expectedProtectedRevision) return false;
      if (!Array.isArray(node.protectedLineageBases) || node.protectedLineageBases.length !== 0) return false;
    } else {
      if (protectedParent === newerProtectedParent) return false;
      if (!exactSingleton(node.protectedLineageBases) || node.protectedLineageBases[0] !== protectedParent) return false;
    }
    newerProtectedParent = protectedParent;
  }
  return false;
}

export function validateCommitAttribution(message, { branch = null } = {}) {
  const normalized = String(message || "").replace(/\r\n?/gu, "\n");
  const problems = [];
  if (/\\n(?:\\n)?Agentic-/u.test(normalized) || /\\r(?:\\n)?Agentic-/u.test(normalized)) {
    problems.push("Literal escaped newline separators before Agentic trailers are forbidden; use real line breaks.");
  }
  const lines = normalized.split("\n");
  while (lines.at(-1) === "") lines.pop();
  const subject = lines[0] || "";
  const subjectMatch = subject.match(SUBJECT_PATTERN);
  if (!subjectMatch) problems.push("Subject must use <type>(<scope>): <summary> with the closed type set.");
  if ([...subject].length > 72) problems.push("Subject exceeds 72 characters.");

  const trailerBlock = finalTrailerBlock(lines);
  if (trailerBlock.start === null) problems.push("A final trailer block separated by a blank line is required.");
  if (trailerBlock.start !== null && lines.slice(trailerBlock.start).some(line => [...line].length < 1 || [...line].length > 200)) {
    problems.push("Every final trailer line must contain 1–200 characters.");
  }
  const values = new Map();
  for (const key of REQUIRED_TRAILERS) {
    const matches = trailerBlock.entries.filter(entry => entry.key === key);
    if (matches.length !== 1) problems.push(`${key} must occur exactly once in the final trailer block.`);
    else values.set(key, matches[0].value);
    const occurrences = lines.filter(line => line.includes(`${key}:`)).length;
    if (occurrences !== 1) problems.push(`${key} must occur exactly once in the commit message.`);
  }
  if (trailerBlock.start !== null) {
    const body = lines.slice(1, trailerBlock.start - 1).join("\n").trim();
    if (!body) problems.push("Commit body must explain what changed and why.");
  }
  if (subjectMatch && values.has("Agentic-Scope") && subjectMatch[2] !== values.get("Agentic-Scope")) {
    problems.push("Subject scope must equal Agentic-Scope.");
  }
  const epoch = values.get("Agentic-Lease-Epoch");
  if (epoch !== undefined && !/^[1-9][0-9]*$/u.test(epoch)) problems.push("Agentic-Lease-Epoch must be a positive integer.");
  for (const key of ["Agentic-Task", "Agentic-Scope", "Agentic-Mechanism"]) {
    if (values.has(key) && !values.get(key).trim()) problems.push(`${key} must be non-empty.`);
  }
  if (branch?.startsWith("agent/") && values.has("Agentic-Scope")) {
    const branchScope = branchScopeOf(branch);
    if (!branchScope || branchScope !== values.get("Agentic-Scope")) problems.push("Agentic-Scope must equal the task-lane branch scope.");
  }
  return [...new Set(problems)];
}

function requiresAgenticAttribution(gitFacts) {
  return Boolean(gitFacts?.branch?.startsWith("agent/") || /Agentic-(?:Task|Scope|Lease-Epoch|Mechanism):/u.test(String(gitFacts?.commitMessage || "")));
}

function attributionRuleId(problem, ruleIndex) {
  return /^(?:Subject|Agentic-Scope must equal the task-lane branch scope)/u.test(problem)
    ? resolveRuleId(ruleIndex, "commit--attribution", /Use `<type>\(<scope>\): <summary>`/u, "commit--attribution#11")
    : resolveRuleId(ruleIndex, "commit--attribution", /Use 1–200-char trailer lines once/u, "commit--attribution#12");
}

function validCommitNode(node) {
  return node && isOid(node.revision) && isOid(node.tree)
    && typeof node.message === "string" && Array.isArray(node.parents);
}

function validRefreshAuthority(authority, branchScope) {
  if (!authority || Object.keys(authority).sort().join(",") !== "laneRevision,leaseEpoch,scopeId") return false;
  return isOid(authority.laneRevision)
    && Number.isSafeInteger(authority.leaseEpoch)
    && authority.leaseEpoch > 0
    && authority.scopeId === branchScope;
}

function bareEnvelopeSubject(message, branchScope) {
  const lines = normalizedMessageLines(message);
  if (lines.length !== 1 || [...lines[0]].length > 72) return null;
  const match = lines[0].match(SUBJECT_PATTERN);
  return match && match[2] === branchScope ? lines[0] : null;
}

function firstSubject(message) {
  return normalizedMessageLines(message)[0] || null;
}

function branchScopeOf(branch) {
  if (typeof branch !== "string" || !branch.startsWith("agent/")) return null;
  return branch.split("/").slice(2).join("/") || null;
}

function normalizedMessageLines(message) {
  const lines = String(message || "").replace(/\r\n?/gu, "\n").split("\n");
  while (lines.at(-1) === "") lines.pop();
  return lines;
}

function exactSingleton(values) {
  return Array.isArray(values) && values.length === 1 && isOid(values[0]);
}

function isOid(value) {
  return OID_PATTERN.test(String(value || ""));
}

function finalTrailerBlock(lines) {
  const entries = [];
  let cursor = lines.length - 1;
  while (cursor >= 0) {
    const match = lines[cursor].match(/^([A-Za-z0-9-]+):[ \t]+(.+?)\s*$/u);
    if (!match) break;
    entries.unshift(Object.freeze({ key: match[1], value: match[2] }));
    cursor -= 1;
  }
  const separated = entries.length > 0 && cursor >= 1 && lines[cursor] === "";
  return Object.freeze({ start: separated ? cursor + 1 : null, entries: separated ? Object.freeze(entries) : Object.freeze([]) });
}
