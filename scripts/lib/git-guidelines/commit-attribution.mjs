import { finding } from "./content.mjs";
import { resolveRuleId } from "./rule-registry.mjs";

const SUBJECT_PATTERN = /^(feat|fix|docs|test|refactor|chore)\(([a-z0-9][a-z0-9._/-]*)\): (\S.*)$/u;
const REQUIRED_TRAILERS = Object.freeze([
  "Agentic-Task",
  "Agentic-Scope",
  "Agentic-Lease-Epoch",
  "Agentic-Mechanism",
]);

export function checkCommitAttribution(document, gitFacts, ruleIndex) {
  if (!requiresAgenticAttribution(gitFacts)) return [];
  const problems = validateCommitAttribution(gitFacts.commitMessage, { branch: gitFacts.branch });
  const grouped = Map.groupBy(problems, problem => attributionRuleId(problem, ruleIndex));
  return [...grouped.entries()].map(([ruleId, ruleProblems]) => finding({
    ruleId,
    type: "unattributed-agentic-commit",
    path: document.sourcePath,
    message: `Commit ${gitFacts.head || "HEAD"} has invalid agentic attribution: ${ruleProblems.join(" ")}`,
  }));
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
    const branchScope = branch.split("/").slice(2).join("/");
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
    : resolveRuleId(ruleIndex, "commit--attribution", /Record each trailer exactly once/u, "commit--attribution#12");
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
