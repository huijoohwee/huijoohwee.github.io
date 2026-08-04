import path from "node:path";

import { FINDING_VOCABULARY, RULE_CONTRACTS, STAGE_SECTIONS } from "./content-contracts.mjs";

export const BLOCKING_CONDITIONS = Object.freeze([
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

export const INTEGRATION_DEPENDENCY_CLASSES = Object.freeze([
  "control-contract",
  "implementation",
  "consumer",
  "generated-projection",
  "mirror",
]);

const BLOCKED_OUTCOME_FIELDS = Object.freeze([
  "ruleId", "blockingCondition", "causingArtifact", "preState", "postState", "unchanged", "resolutionPath",
]);
const STATE_DIGEST_FIELDS = Object.freeze(["head", "index", "working", "untracked"]);
const BLOCKING_CONDITION_SET = new Set(BLOCKING_CONDITIONS);
const DEPENDENCY_CLASS_RANK = new Map(INTEGRATION_DEPENDENCY_CLASSES.map((value, index) => [value, index]));
const DIGEST_PATTERN = /^[0-9a-f]{64}$/u;
const SCOPE_ID_PATTERN = /^[a-z0-9-]{3,64}$/u;
const RULE_ID_PATTERN = /^[a-z0-9-]+#[1-9][0-9]*$/u;
const WILDCARD_PATTERN = /[*?\[\]]/u;

export function normalizeDeclaredWriteScope(scope) {
  const entries = declaredScopeEntries(scope);
  if (!entries || entries.length === 0) return frozenScope(false, [], [], false);

  const paths = new Set();
  const semantics = new Set();
  let decidable = true;
  let wildcard = false;
  for (const entry of entries) {
    const normalized = normalizeScopeEntry(entry);
    if (!normalized) {
      decidable = false;
      continue;
    }
    if (normalized.kind === "wildcard") wildcard = true;
    if (normalized.kind === "path") paths.add(normalized.value);
    if (normalized.kind === "semantic") semantics.add(normalized.value);
  }
  if (paths.size === 0 && semantics.size === 0 && !wildcard) decidable = false;
  return frozenScope(decidable, [...paths].sort(byteCompare), [...semantics].sort(byteCompare), wildcard);
}

export function declaredWriteScopesOverlap(leftScope, rightScope) {
  const left = normalizeDeclaredWriteScope(leftScope);
  const right = normalizeDeclaredWriteScope(rightScope);
  if (!left.decidable || !right.decidable || left.wildcard || right.wildcard) return true;
  if (left.semantics.some(value => right.semantics.includes(value))) return true;
  return left.paths.some(leftPath => right.paths.some(rightPath => repositoryPathsOverlap(leftPath, rightPath)));
}

export function compareIntegrationRequests(left, right) {
  const leftKey = integrationRequestKey(left, "left");
  const rightKey = integrationRequestKey(right, "right");
  const classOrder = leftKey.dependencyRank - rightKey.dependencyRank;
  if (classOrder !== 0) return Math.sign(classOrder);
  if (leftKey.leaseEpoch !== rightKey.leaseEpoch) return leftKey.leaseEpoch < rightKey.leaseEpoch ? -1 : 1;
  return byteCompare(leftKey.scopeId, rightKey.scopeId);
}

export function declaredWriteScopeCoversPaths(scope, changedPaths) {
  if (!Array.isArray(changedPaths)) return false;
  if (changedPaths.length === 0) return true;
  const normalizedScope = normalizeDeclaredWriteScope(scope);
  const normalizedChanges = changedPaths.map(changedPath => normalizeScopeEntry(`path:${changedPath}`));
  if (!normalizedScope.decidable || normalizedChanges.some(entry => entry?.kind !== "path")) return false;
  if (!declaredWriteScopesOverlap(scope, changedPaths.map(changedPath => `path:${changedPath}`))) return false;
  if (normalizedScope.wildcard) return true;
  return normalizedChanges.every(change => normalizedScope.paths.some(scopePath => (
    change.value === scopePath || change.value.startsWith(`${scopePath}/`)
  )));
}

export function evaluateRuntimeComposition({
  currentAuthority = null,
  peerAuthorities = [],
  changedPaths = [],
  publicationAuthorities = peerAuthorities,
  integrationRequests = [],
  selectedIntegrationRequest = null,
  evaluationTime = null,
  comparisonArtifacts = [],
} = {}) {
  const currentScope = currentAuthority?.declaredWriteScope;
  const orderedPeers = orderAuthorities(peerAuthorities, comparisonArtifacts);
  const orderedPublishers = orderAuthorities(publicationAuthorities, comparisonArtifacts);
  const admissionConflicts = currentAuthority === null ? [] : overlappingAuthorities(currentScope, orderedPeers);
  const outOfScopePaths = declaredWriteScopeCoversPaths(currentScope, changedPaths)
    ? []
    : canonicalChangedPaths(changedPaths).filter(changedPath => !declaredWriteScopeCoversPaths(currentScope, [changedPath]));
  const publicationConflicts = currentAuthority === null
    ? []
    : overlappingAuthorities(currentScope, orderedPublishers);
  const authorityProblems = publicationAuthorityProblems(currentAuthority, evaluationTime);
  const orderedRequests = Object.freeze([...integrationRequests].sort(compareIntegrationRequests));
  const selectedIsNext = selectedIntegrationRequest === null
    ? null
    : orderedRequests.length > 0 && compareIntegrationRequests(selectedIntegrationRequest, orderedRequests[0]) === 0;

  return Object.freeze({
    admission: Object.freeze({
      authorized: currentAuthority !== null && admissionConflicts.length === 0,
      overlappingAuthorityIds: Object.freeze(admissionConflicts.map(authorityIdentity)),
    }),
    commit: Object.freeze({
      authorized: currentAuthority !== null && outOfScopePaths.length === 0,
      outOfScopePaths: Object.freeze(outOfScopePaths),
    }),
    publication: Object.freeze({
      authorized: currentAuthority !== null
        && authorityProblems.length === 0
        && outOfScopePaths.length === 0
        && publicationConflicts.length === 0,
      authorityProblems: Object.freeze(authorityProblems),
      overlappingAuthorityIds: Object.freeze(publicationConflicts.map(authorityIdentity)),
    }),
    integration: Object.freeze({
      orderedRequestIds: Object.freeze(orderedRequests.map(integrationRequestIdentity)),
      nextRequestId: orderedRequests.length === 0 ? null : integrationRequestIdentity(orderedRequests[0]),
      selectedIsNext,
    }),
  });
}

export function validateBlockedOutcome(value) {
  if (!isRecord(value)) return Object.freeze(["Blocked_Outcome must be an object."]);
  const problems = exactFieldProblems(value, BLOCKED_OUTCOME_FIELDS, "Blocked_Outcome");
  if (!RULE_ID_PATTERN.test(String(value.ruleId || ""))) problems.push("ruleId must be a Rule_ID.");
  if (!BLOCKING_CONDITION_SET.has(value.blockingCondition)) problems.push("blockingCondition is not in the closed enumeration.");
  if (!isCausingArtifact(value.causingArtifact)) problems.push("causingArtifact must be a canonical repository-relative path, claim identity, or revision.");
  if (!isCanonicalRepositoryPath(value.resolutionPath)) problems.push("resolutionPath must be a canonical repository-relative path.");
  problems.push(...stateDigestProblems(value.preState, "preState"));
  problems.push(...stateDigestProblems(value.postState, "postState"));
  const statesMatch = validStateDigests(value.preState)
    && validStateDigests(value.postState)
    && STATE_DIGEST_FIELDS.every(field => value.preState[field] === value.postState[field]);
  if (value.unchanged !== statesMatch) problems.push("unchanged must equal the field-for-field preState/postState comparison.");
  if (!statesMatch) problems.push("Blocked_Outcome must leave all four state digests unchanged.");
  return Object.freeze(problems);
}

export function createBlockedOutcome({ ruleId, blockingCondition, causingArtifact, preState, postState, resolutionPath } = {}) {
  const outcome = {
    ruleId,
    blockingCondition,
    causingArtifact,
    preState: freezeState(preState),
    postState: freezeState(postState),
    unchanged: validStateDigests(preState)
      && validStateDigests(postState)
      && STATE_DIGEST_FIELDS.every(field => preState[field] === postState[field]),
    resolutionPath,
  };
  const problems = validateBlockedOutcome(outcome);
  if (problems.length > 0) throw new TypeError(problems.join(" "));
  return Object.freeze(outcome);
}

export function parseDocument(text, sourcePath = "git-guidelines.md") {
  const lines = String(text).replace(/\r\n?/gu, "\n").split("\n");
  if (lines.at(-1) === "") lines.pop();
  const sections = [];
  for (let index = 0; index < lines.length; index += 1) {
    const match = lines[index].match(/^## ([^#].*)$/u);
    if (!match) continue;
    const title = match[1].trim();
    const anchor = headingAnchor(title);
    const prior = sections.at(-1);
    if (prior) prior.endLine = index;
    sections.push({ title, anchor, headingLine: index + 1, startLine: index + 1, endLine: lines.length, lines: [] });
  }
  for (const section of sections) {
    section.lines = lines.slice(section.startLine - 1, section.endLine);
    Object.freeze(section.lines);
    Object.freeze(section);
  }
  return Object.freeze({ sourcePath: path.resolve(sourcePath), text: String(text), lines: Object.freeze(lines), sections: Object.freeze(sections) });
}

export function headingAnchor(title) {
  return String(title).trim().toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/gu, "-");
}

export function sectionByAnchor(document, anchor) {
  return document.sections.find(section => section.anchor === anchor) || null;
}

export function tableCells(line) {
  const value = String(line).trim();
  if (!value.startsWith("|") || !value.endsWith("|")) return [];
  const cells = [];
  let cell = "";
  let escaped = false;
  for (const character of value.slice(1, -1)) {
    if (escaped) {
      cell += character;
      escaped = false;
    } else if (character === "\\") {
      cell += character;
      escaped = true;
    } else if (character === "|") {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += character;
    }
  }
  cells.push(cell.trim());
  return cells;
}

export function tableRows(section) {
  if (!section) return [];
  return section.lines.flatMap((line, offset) => {
    const cells = tableCells(line);
    const nextCells = tableCells(section.lines[offset + 1] || "");
    const isHeader = cells.length > 0
      && nextCells.length === cells.length
      && nextCells.every(cell => /^:?-{3,}:?$/u.test(cell));
    if (cells.length === 0 || isHeader || cells.every(cell => /^:?-{3,}:?$/u.test(cell))) return [];
    return [{ cells, line: section.startLine + offset, text: line }];
  });
}

export function referenceImplementationRanges(document) {
  const ranges = [];
  const headingPattern = /^(#{1,6})\s+(.+)$/u;
  for (let index = 0; index < document.lines.length; index += 1) {
    const match = document.lines[index].match(headingPattern);
    if (!match || !/\breference implementation\b/iu.test(match[2])) continue;
    const depth = match[1].length;
    let end = document.lines.length;
    for (let cursor = index + 1; cursor < document.lines.length; cursor += 1) {
      const next = document.lines[cursor].match(headingPattern);
      if (next && next[1].length <= depth) { end = cursor; break; }
    }
    ranges.push(Object.freeze({ startLine: index + 1, endLine: end }));
  }
  return Object.freeze(ranges);
}

export function insideRanges(line, ranges) {
  return ranges.some(range => line >= range.startLine && line <= range.endLine);
}

export function finding({ ruleId, ruleText = "", type, severity = "blocker", path: findingPath, line = 1, column = 1, message }) {
  return Object.freeze({
    ruleId,
    ruleText,
    type,
    severity,
    location: Object.freeze({ path: findingPath, line, column }),
    message,
    repeatCount: 1,
  });
}

export function checkContentContract(document, ruleIndex) {
  const findings = [];
  for (const contract of RULE_CONTRACTS) checkRuleContract(document, ruleIndex, contract, findings);
  checkStagePlacement(document, ruleIndex, findings);
  checkFindingVocabulary(document, ruleIndex, findings);
  checkCheckerReferenceBlock(document, ruleIndex, findings);

  if (/maximum (?:of )?8 concurrent|at most 8 concurrent/iu.test(document.text)) {
    findings.push(contentIssue(document, ruleIndex, "lane-topology--admission#26", "concurrency-cap-forbidden", "A fixed concurrency cardinality contradicts unlimited disjoint upstream authority."));
  }
  return findings;
}

function checkRuleContract(document, ruleIndex, contract, findings) {
  const rule = ruleIndex.byId[contract.ruleId];
  if (!rule) {
    findings.push(contentIssue(document, ruleIndex, contract.ruleId, contract.code, `Required rule ${contract.ruleId} is absent.`));
    return;
  }
  if (rule.classification !== contract.classification) {
    findings.push(contentIssue(document, ruleIndex, rule.id, contract.code, `Expected ${contract.classification}, observed ${rule.classification || "unclassified"}.`, rule.line));
  }
  const absent = contract.patterns.filter(pattern => !pattern.test(rule.ruleText));
  if (absent.length > 0) {
    findings.push(contentIssue(document, ruleIndex, rule.id, contract.code, `Rule omits ${absent.length} required contract element(s).`, rule.line));
  }
}

function checkStagePlacement(document, ruleIndex, findings) {
  const rows = tableRows(sectionByAnchor(document, "load-budget"));
  const observed = new Map(rows.map(row => [row.cells[0], [...row.cells[1].matchAll(/`([a-z0-9-]+)`/gu)].map(match => match[1])]));
  for (const [stage, expectedSections] of Object.entries(STAGE_SECTIONS)) {
    const actual = observed.get(stage) || [];
    if (sameSet(actual, expectedSections) && actual.length === expectedSections.length) continue;
    findings.push(contentIssue(document, ruleIndex, "findings--rule-identity#2", "stage-placement-divergence", `Stage ${stage} must load exactly: ${expectedSections.join(", ")}.`));
  }
}

function checkFindingVocabulary(document, ruleIndex, findings) {
  const rows = tableRows(sectionByAnchor(document, "findings--rule-identity"));
  const observed = new Map();
  const referencesByType = new Map();
  for (const row of rows) {
    const types = [...String(row.cells[2] || "").matchAll(/`([a-z0-9-]+)`/gu)].map(match => match[1]);
    if (types.length === 0) continue;
    for (const type of types) observed.set(type, row);
    const references = [...(row.cells[1] || "").matchAll(/`([a-z0-9-]+#\d+(?:-\d+)?)`/gu)]
      .flatMap(match => expandRuleReference(match[1]));
    for (const type of types) {
      const typeReferences = referencesByType.get(type) || new Set();
      referencesByType.set(type, typeReferences);
      for (const ruleId of references) {
        const rule = ruleIndex.byId[ruleId];
        if (rule?.classification === "artifact-bearing") typeReferences.add(ruleId);
        if (!rule || rule.classification === "artifact-bearing") continue;
        findings.push(contentIssue(document, ruleIndex, ruleId, "advisory-raises-finding", `Advisory rule ${ruleId} is listed as raising ${type}.`, row.line));
      }
    }
  }
  for (const [type, [severity, ownership]] of Object.entries(FINDING_VOCABULARY)) {
    const row = observed.get(type);
    if (row && row.cells[3] === severity && row.cells[4] === ownership) continue;
    findings.push(contentIssue(document, ruleIndex, "findings--rule-identity#2", "finding-vocabulary-divergence", `Finding ${type} must retain severity ${severity} and ownership ${ownership}.`, row?.line));
  }
  const extras = [...observed.keys()].filter(type => !Object.hasOwn(FINDING_VOCABULARY, type));
  if (extras.length > 0) {
    findings.push(contentIssue(document, ruleIndex, "findings--rule-identity#2", "finding-vocabulary-divergence", `Unowned finding types are listed: ${extras.join(", ")}.`));
  }
  for (const rule of ruleIndex.artifactRules) {
    for (const type of Object.keys(FINDING_VOCABULARY)) {
      if (!rule.ruleText.includes(`\`${type}\``) || referencesByType.get(type)?.has(rule.id)) continue;
      findings.push(contentIssue(document, ruleIndex, rule.id, "finding-rule-unlisted", `Rule ${rule.id} names ${type} but that finding row omits it.`, rule.line));
    }
  }
}

function checkCheckerReferenceBlock(document, ruleIndex, findings) {
  const block = referenceImplementationRanges(document)
    .map(range => document.lines.slice(range.startLine - 1, range.endLine).join("\n"))
    .find(text => /checker invocation/iu.test(text));
  const requirements = [
    /huijoohwee\.github\.io\/scripts\/check-git-guidelines\.mjs/u,
    /npm run git-guidelines:check/u,
    /reads this document, five owners, four registrations, present coordination artifacts, and git facts/iu,
    /Exit zero means conformant/iu,
    /one means findings/iu,
    /two means degraded local input/iu,
    /three means remote or verdict timeout/iu,
  ];
  if (block && requirements.every(pattern => pattern.test(block))) return;
  findings.push(contentIssue(document, ruleIndex, "findings--rule-identity#2", "checker-reference-incomplete", "Reference implementation block must name the resolved checker path, invocation, inputs, and all exit meanings."));
}

function sameSet(left, right) {
  const leftSet = new Set(left);
  return leftSet.size === left.length && right.every(value => leftSet.has(value));
}

function expandRuleReference(reference) {
  const match = reference.match(/^([a-z0-9-]+)#(\d+)(?:-(\d+))?$/u);
  if (!match || !match[3]) return [reference];
  const start = Number(match[2]);
  const end = Number(match[3]);
  if (end < start || end - start > 100) return [reference];
  return Array.from({ length: end - start + 1 }, (_value, index) => `${match[1]}#${start + index}`);
}

function contentIssue(document, ruleIndex, ruleId, code, message, line = 1) {
  const resolvedRuleId = ruleIndex.byId[ruleId]?.id || ruleIndex.artifactRules[0]?.id || ruleIndex.rules[0]?.id || ruleId;
  return finding({
    ruleId: resolvedRuleId,
    type: code === "no-copy-boundary" ? "vendor-coupling" : "unimplemented-guideline",
    severity: "major",
    path: document.sourcePath,
    line,
    message: `${code}: ${message}`,
  });
}

function declaredScopeEntries(scope) {
  if (Array.isArray(scope)) return scope;
  if (!isRecord(scope)) return null;
  if (Array.isArray(scope.declaredWriteScope)) return scope.declaredWriteScope;
  if (Array.isArray(scope.paths) && Array.isArray(scope.semantics)) {
    if (scope.paths.some(value => typeof value !== "string") || scope.semantics.some(value => typeof value !== "string")) return null;
    return [
      ...scope.paths.map(value => `path:${value}`),
      ...scope.semantics.map(value => `semantic:${value}`),
      ...(scope.wildcard ? ["*"] : []),
    ];
  }
  if (!Array.isArray(scope.paths) || scope.paths.some(value => typeof value !== "string") || typeof scope.semanticScope !== "string") return null;
  return [...scope.paths.map(value => `path:${value}`), `semantic:${scope.semanticScope}`];
}

function normalizeScopeEntry(entry) {
  if (typeof entry !== "string" || entry.length === 0) return null;
  if (entry === "*" || entry.startsWith("wildcard:")) return Object.freeze({ kind: "wildcard", value: "*" });
  if (entry.startsWith("semantic:")) {
    const value = entry.slice("semantic:".length);
    if (!value) return null;
    if (WILDCARD_PATTERN.test(value)) return Object.freeze({ kind: "wildcard", value: "*" });
    return SCOPE_ID_PATTERN.test(value) ? Object.freeze({ kind: "semantic", value }) : null;
  }
  const rawPath = entry.startsWith("path:") ? entry.slice("path:".length) : entry;
  if (!rawPath || rawPath.includes("\\") || rawPath.includes("\0") || WILDCARD_PATTERN.test(rawPath)) {
    return WILDCARD_PATTERN.test(rawPath) ? Object.freeze({ kind: "wildcard", value: "*" }) : null;
  }
  if (rawPath.startsWith("/") || /^[A-Za-z]:\//u.test(rawPath)) return null;
  const normalizedPath = path.posix.normalize(rawPath);
  const normalized = normalizedPath === "." ? "." : normalizedPath.replace(/\/+$/u, "");
  if (normalized === ".." || normalized.startsWith("../") || normalized.startsWith("/")) return null;
  return Object.freeze({ kind: "path", value: normalized });
}

function frozenScope(decidable, paths, semantics, wildcard) {
  return Object.freeze({
    decidable,
    paths: Object.freeze(paths),
    semantics: Object.freeze(semantics),
    wildcard,
  });
}

function repositoryPathsOverlap(left, right) {
  return left === right
    || left === "."
    || right === "."
    || left.startsWith(`${right}/`)
    || right.startsWith(`${left}/`);
}

function integrationRequestKey(value, label) {
  if (!isRecord(value)) throw new TypeError(`${label} integration request must be an object.`);
  const dependencyRank = DEPENDENCY_CLASS_RANK.get(value.dependencyClass);
  if (dependencyRank === undefined) {
    throw new TypeError(`${label}.dependencyClass must be one of: ${INTEGRATION_DEPENDENCY_CLASSES.join(", ")}.`);
  }
  if (!Number.isSafeInteger(value.leaseEpoch) || value.leaseEpoch < 0) {
    throw new TypeError(`${label}.leaseEpoch must be a non-negative safe integer.`);
  }
  if (!SCOPE_ID_PATTERN.test(String(value.scopeId || ""))) {
    throw new TypeError(`${label}.scopeId must be a 3-64 character lowercase Scope ID.`);
  }
  return Object.freeze({ dependencyRank, leaseEpoch: value.leaseEpoch, scopeId: value.scopeId });
}

function canonicalChangedPaths(changedPaths) {
  if (!Array.isArray(changedPaths)) return [];
  const paths = changedPaths.flatMap(changedPath => {
    const normalized = normalizeScopeEntry(`path:${changedPath}`);
    return normalized?.kind === "path" ? [normalized.value] : [String(changedPath)];
  });
  return [...new Set(paths)].sort(byteCompare);
}

function overlappingAuthorities(currentScope, authorities) {
  if (!Array.isArray(authorities)) return [];
  return authorities.filter(authority => declaredWriteScopesOverlap(currentScope, authority?.declaredWriteScope));
}

function orderAuthorities(authorities, comparisonArtifacts) {
  if (!Array.isArray(authorities)) return [];
  const order = new Map((Array.isArray(comparisonArtifacts) ? comparisonArtifacts : []).map((artifact, index) => [
    String(artifact?.relativePath || artifact?.path || ""), index,
  ]));
  return [...authorities].sort((left, right) => (
    (order.get(String(left?.artifactPath || "")) ?? Number.MAX_SAFE_INTEGER)
      - (order.get(String(right?.artifactPath || "")) ?? Number.MAX_SAFE_INTEGER)
    || byteCompare(authorityIdentity(left), authorityIdentity(right))
  ));
}

function publicationAuthorityProblems(authority, evaluationTime) {
  if (!isRecord(authority)) return ["claim-absent"];
  const problems = [];
  if (authority.state !== "active") problems.push("claim-not-active");
  const expiry = Date.parse(authority.expiresAt);
  if (!Number.isFinite(expiry) || !Number.isFinite(evaluationTime) || expiry <= evaluationTime) problems.push("lease-expired");
  if (!DIGEST_PATTERN.test(String(authority.fenceRevision || ""))
    || authority.fenceRevision !== authority.acceptedFenceRevision) problems.push("fence-divergent");
  return problems;
}

function authorityIdentity(authority, index) {
  return String(authority?.authorityId || authority?.claimId || authority?.artifactPath || `authority-${index}`);
}

function integrationRequestIdentity(request) {
  return String(request.requestId || `${request.dependencyClass}:${request.leaseEpoch}:${request.scopeId}`);
}

function exactFieldProblems(value, expectedFields, label) {
  const actual = Object.keys(value).sort(byteCompare);
  const expected = [...expectedFields].sort(byteCompare);
  return sameArray(actual, expected) ? [] : [`${label} must contain exactly: ${expectedFields.join(", ")}.`];
}

function stateDigestProblems(value, label) {
  if (!isRecord(value)) return [`${label} must be an object with four digests.`];
  const problems = exactFieldProblems(value, STATE_DIGEST_FIELDS, label);
  for (const field of STATE_DIGEST_FIELDS) {
    if (!DIGEST_PATTERN.test(String(value[field] || ""))) problems.push(`${label}.${field} must be a lowercase SHA-256 digest.`);
  }
  return problems;
}

function validStateDigests(value) {
  return isRecord(value)
    && sameArray(Object.keys(value).sort(byteCompare), [...STATE_DIGEST_FIELDS].sort(byteCompare))
    && STATE_DIGEST_FIELDS.every(field => DIGEST_PATTERN.test(String(value[field] || "")));
}

function freezeState(value) {
  if (!isRecord(value)) return value;
  return Object.freeze({ ...value });
}

function isCausingArtifact(value) {
  if (typeof value !== "string" || value.length === 0) return false;
  if (/^claim:[a-zA-Z0-9._:-]+$/u.test(value)) return true;
  if (/^(?:revision:)?[0-9a-f]{40}(?:[0-9a-f]{24})?$/u.test(value)) return true;
  return isCanonicalRepositoryPath(value);
}

function isCanonicalRepositoryPath(value) {
  if (typeof value !== "string" || value.length === 0 || value.includes("\\") || value.includes("\0")) return false;
  if (value.startsWith("/") || /^[A-Za-z]:\//u.test(value) || value.endsWith("/")) return false;
  const normalized = path.posix.normalize(value);
  return normalized === value && normalized !== "." && normalized !== ".." && !normalized.startsWith("../");
}

function sameArray(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function byteCompare(left, right) {
  return Buffer.compare(Buffer.from(String(left), "utf8"), Buffer.from(String(right), "utf8"));
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
