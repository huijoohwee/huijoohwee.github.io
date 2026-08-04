import { finding, insideRanges, referenceImplementationRanges } from "./content.mjs";
import { buildRuleIndex } from "./rule-registry.mjs";

const KNOWN_CONCRETE_TERMS = Object.freeze([
  "GitHub", "GitLab", "Bitbucket", "Cloudflare", "Vercel", "Netlify", "Knowgrph", "huijoohwee", "airvio.co",
  "npm", "npx", "pnpm", "yarn", "bun", "deno", "brew", "Node.js", "yjs/yjs", "wrangler", "gh",
]);
const DOCUMENT_FILE_SUFFIX = /\.(?:md|json|mjs|cjs|js|jsx|ts|tsx|yaml|yml|toml|lock|patch|diff|bundle)$/iu;
const HOST_OR_URL = /(?<![A-Za-z0-9._\/-])(?:https?:\/\/)?(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}(?::\d{1,5})?(?:\/[^\s`)\]}>.,;]*)?/gu;
const REPOSITORY_SHORTHAND = /(?<![A-Za-z0-9._/-])([A-Za-z0-9][A-Za-z0-9._-]{1,62}\/[A-Za-z0-9][A-Za-z0-9._-]{1,62})(?![A-Za-z0-9._/-])/gu;
const COMMAND_NAME = /(?<![A-Za-z0-9._-])([a-z][a-z0-9._-]*(?:pm|cli|ctl))(?![A-Za-z0-9._-])/gu;
const INLINE_COMMAND = /`(?:\$\s*)?([a-z][a-z0-9._-]{1,40})(?=\s+(?:--[a-z0-9-]+|install|add|remove|uninstall|run|exec|publish|deploy|login|logout|init|build|dev|start|release)\b)/gu;
const PROPER_TOKEN = /(?<![A-Za-z0-9_-])([A-Z][A-Za-z0-9_-]{2,})(?![A-Za-z0-9_-])/gu;
const NEUTRAL_RELATION_TERMS = new Set([
  "admission", "preservation", "pass", "fail", "apply", "drop", "claim", "revision", "epoch", "fence",
  "recovery", "head", "branch", "index", "tracked", "untracked", "pre", "post", "registration", "lease",
  "retain", "revert", "retarget", "rebuild", "review", "scope", "code", "state", "source", "target",
]);
const NEUTRAL_PROPER_TERMS = new Set(`
Absent Accepted Acting Active Actor Adds Admission Admitted After Agentic-Lease-Epoch Agentic-Mechanism Agentic-Scope Agentic-Task Also
Anti-Patterns Any Artifact Artifacts Assertion Attach Attribution Authenticated Authoring Authority Before Blocked_Outcome Boundary Branch Browser
Budget Bundle_Backup Bundle_Backups CAS Canonical Canonical_Lane Cap Capture Chain Change_Manifest Changes Check Checklist Claim Class Classify
Cleanup Collaboration Collaboration_Identity Commit Companion Completion Conflict Consume Content Contract Coordination Coordination_Task Correct Corrects
Current Current_Authority Declared Define Delivery Delivery_Surface Dependency Derive Derived Dev_Repository Device Disposition Dormant_Preserved Draw
Duplicate Each Emit Encoding Epoch Evaluator Every Exact Exactly Execution Exit Expired Failed Failure Family Fence Filename Finding Findings Forbid
Gates Git Give Glossary Guidelines Hook Identity Immutable Implementer Index Integration JSON Join Keep KiB Lane Lease List Load Location Make
Manifest Mantra Match Meaning Missing Module Monotonic Move Name Never Non-empty Non-owner Normalize Observable Offline One Online Operator
Orchestrator Order Overlap Own Owner Ownership Park Pass Per-commit Permit Post-run Pre-lane Pre-promotion Pre-push Preservation Prod_Mirror
Profile Prohibited Projection Promotion Promotion_Chain Protected Prove Publish Publishing Receipts Re-read Reconnect Record Recovery Recovery_Capture
Recovery_Handle Reference Reference_Implementation_Block Registered Remotely Request Require Required Resolve Restore Result Reuse Review Revision Rules
Rollback Rule Rule_ID Rule_IDs Run Scope Seal Sections Selection Serialize Session Severity Snapshot Stage State Target Task_Lane Task_Lanes Term
Terminal The This Topology Trailer Type UTC UTF-8 Undeclared Update Use Validation Verification WIP Waiting_Successor Worktree Write
`.trim().split(/\s+/u));

export function checkNeutrality(document, suppliedRuleIndex = null) {
  const ranges = [...referenceImplementationRanges(document), ...referenceImplementationBlockRanges(document)];
  const ruleIndex = suppliedRuleIndex || buildRuleIndex(document);
  const ruleIdByLine = new Map(ruleIndex.rules.map(rule => [rule.line, rule.id]));
  const findings = [];
  for (let index = 0; index < document.lines.length; index += 1) {
    const lineNumber = index + 1;
    if (insideRanges(lineNumber, ranges)) continue;
    for (const occurrence of concreteOccurrences(document.lines[index])) {
      const section = [...document.sections].reverse().find(candidate => candidate.startLine <= lineNumber);
      findings.push(finding({
        ruleId: ruleIdByLine.get(lineNumber) || "lane-topology--admission#25",
        type: "vendor-coupling",
        severity: "major",
        path: document.sourcePath,
        line: lineNumber,
        column: occurrence.column,
        message: `Concrete ${occurrence.kind} outside a reference implementation block in ${section?.anchor || "frontmatter"}: ${occurrence.term}`,
      }));
    }
  }
  return findings;
}

function referenceImplementationBlockRanges(document) {
  return Object.freeze([
    ...fencedRanges(document.lines),
    ...contiguousBlockRanges(document.lines, /^\s*>/u),
    ...contiguousBlockRanges(document.lines, /^\s*\|/u),
  ].filter(range => /\breference implementation\b/iu.test(document.lines.slice(range.startLine - 1, range.endLine).join("\n"))));
}
function fencedRanges(lines) {
  const ranges = [];
  let open = null;
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^\s*(`{3,}|~{3,})/u);
    if (!match) continue;
    const marker = match[1][0];
    if (open === null) open = { marker, width: match[1].length, startLine: index + 1 };
    else if (open.marker === marker && match[1].length >= open.width) {
      ranges.push(Object.freeze({ startLine: open.startLine, endLine: index + 1 }));
      open = null;
    }
  }
  if (open !== null) ranges.push(Object.freeze({ startLine: open.startLine, endLine: lines.length }));
  return ranges;
}
function contiguousBlockRanges(lines, pattern) {
  const ranges = [];
  let start = null;
  for (let index = 0; index <= lines.length; index += 1) {
    if (index < lines.length && pattern.test(lines[index])) {
      if (start === null) start = index + 1;
    } else if (start !== null) {
      ranges.push(Object.freeze({ startLine: start, endLine: index }));
      start = null;
    }
  }
  return ranges;
}
function occurrenceColumns(line, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const prefix = /^[A-Za-z0-9]/u.test(term) ? "(?<![A-Za-z0-9])" : "";
  const suffix = /[A-Za-z0-9]$/u.test(term) ? "(?![A-Za-z0-9])" : "";
  return [...String(line).matchAll(new RegExp(`${prefix}${escaped}${suffix}`, "giu"))].map(match => match.index + 1);
}

function concreteOccurrences(line) {
  const candidates = [];
  for (const term of KNOWN_CONCRETE_TERMS) {
    for (const column of occurrenceColumns(line, term)) addCandidate(candidates, term, column - 1, "vendor token");
  }
  for (const match of String(line).matchAll(HOST_OR_URL)) {
    const term = match[0];
    if (!looksLikeDocumentFileOrField(line, term, match.index)) addCandidate(candidates, term, match.index, "host");
  }
  for (const match of String(line).matchAll(REPOSITORY_SHORTHAND)) {
    const term = match[1];
    const [owner, repository] = term.toLowerCase().split("/");
    if (DOCUMENT_FILE_SUFFIX.test(repository) || /^v\d+$/u.test(repository) || (NEUTRAL_RELATION_TERMS.has(owner) && NEUTRAL_RELATION_TERMS.has(repository))) continue;
    addCandidate(candidates, term, match.index, "repository");
  }
  for (const match of String(line).matchAll(INLINE_COMMAND)) {
    const start = match.index + match[0].indexOf(match[1]);
    addCandidate(candidates, match[1], start, "vendor command");
  }
  for (const match of String(line).matchAll(COMMAND_NAME)) addCandidate(candidates, match[1], match.index, "package manager or vendor command");
  for (const match of String(line).matchAll(PROPER_TOKEN)) {
    const term = match[1];
    if (!NEUTRAL_PROPER_TERMS.has(term) && !/^[A-Z]\d+$/u.test(term)) addCandidate(candidates, term, match.index, "brand");
  }
  return nonOverlappingCandidates(candidates).map(candidate => Object.freeze({
    term: candidate.term,
    kind: candidate.kind,
    column: candidate.start + 1,
  }));
}

function looksLikeDocumentFileOrField(line, term, start) {
  if (DOCUMENT_FILE_SUFFIX.test(term)) return true;
  if (term.includes("://") || term.includes("/")) return false;
  const source = String(line);
  const after = source[start + term.length] || "";
  return insideInlineCode(source, start) && (after === "`" || after === ":");
}

function insideInlineCode(line, start) {
  const before = line.slice(0, start);
  const after = line.slice(start);
  return (before.match(/`/gu)?.length || 0) % 2 === 1 && after.includes("`");
}

function addCandidate(candidates, term, start, kind) {
  candidates.push(Object.freeze({ term, kind, start, end: start + term.length }));
}

function nonOverlappingCandidates(candidates) {
  const ordered = [...candidates].sort((left, right) => left.start - right.start || right.end - right.start - (left.end - left.start));
  const output = [];
  for (const candidate of ordered) {
    if (output.some(existing => candidate.start < existing.end && candidate.end > existing.start)) continue;
    output.push(candidate);
  }
  return output;
}
