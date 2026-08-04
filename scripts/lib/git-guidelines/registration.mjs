import { createHash } from "node:crypto";
import path from "node:path";
import { finding, tableCells } from "./content.mjs";
import { resolveRuleId } from "./rule-registry.mjs";

const DOCUMENT_PATH = "docs/documents/git-guidelines.md";
const TOKEN = "/git.guidelines";
const FILTER = "#git-collaboration";
const BINDING = "@git-guidelines";
const REGISTRATION_ARTIFACTS = Object.freeze([
  "docs/README.md",
  "docs/DICTIONARY-COMMAND.md",
  "docs/DICTIONARY-SEMANTIC.md",
  "docs/DICTIONARY-BINDING.md",
]);
const MAX_PATH_REFERENCES = 4096;
const DOCUMENT_REFERENCE = /(?:^|[\s`"'(])([^`\s"'()|,;]+\.md)(?=$|[\s`"')|.,;:#])/gmu;
const MARKDOWN_LINK_REFERENCE = /\[[^\]]*\]\(([^)\s#]+\.md)(?:#[^)\s]*)?\)/gmu;
const TEMPLATE_PATH_COMPONENT = /(?:^|\/)(?:YYYY(?:[-_]MM)?(?:[-_]DD)?|MM[-_]DD|[<{[][^/>{}\]]+[>}\]]|:[a-z][a-z0-9_-]*)(?:\.md)?(?:$|\/)/u;

export function checkRegistrations(document, registrations, frontmatter, ruleIndex) {
  const findings = [];
  const reportIssue = (code, message, severity = "blocker") => issue(document, ruleIndex, code, message, severity);
  const docsIndex = registrations["docs/README.md"] || "";
  const command = registrations["docs/DICTIONARY-COMMAND.md"] || "";
  const semantic = registrations["docs/DICTIONARY-SEMANTIC.md"] || "";
  const binding = registrations["docs/DICTIONARY-BINDING.md"] || "";
  const docsRows = linesWith(docsIndex, DOCUMENT_PATH).filter(line => /^\|/u.test(line));
  const docsCells = docsRows.length === 1 ? tableCells(docsRows[0]) : [];
  if (docsCells.length < 3 || unquoteCode(docsCells[0]) !== DOCUMENT_PATH || docsCells[1] !== "Git-layer companion to the execution set" || docsCells[1].length > 120 || docsCells[2] !== "any git stage: session start through cleanup") {
    findings.push(reportIssue("registration-missing", "Docs Index row is absent or differs from its exact path, role, or load condition."));
  }
  if (count(command, `  - "${DOCUMENT_PATH}"`) !== 1 || count(command, `  - "${TOKEN}"`) !== 1) findings.push(reportIssue("registration-missing", "Command metadata must name the document path and token exactly once."));
  const commandRows = linesWith(command, `\`${TOKEN}\``).filter(line => /^\|/u.test(line));
  const commandCells = commandRows.length === 1 ? tableCells(commandRows[0]) : [];
  if (commandCells.length < 5 || !commandCells[1] || unquoteCode(commandCells[2]) !== BINDING || unquoteCode(commandCells[3]) !== FILTER || !commandCells[4]) findings.push(reportIssue("registration-missing", "Command token row is absent or incomplete."));
  const semanticRow = tokenRow(semantic, FILTER);
  const bindingRow = tokenRow(binding, BINDING);
  if (!hasDictionaryEntry(semantic, FILTER) || !semanticRow) findings.push(reportIssue("registration-missing", "Semantic registration is absent.", "minor"));
  else if (!semanticRow.includes(`\`${DOCUMENT_PATH}\``)) findings.push(reportIssue("registration-dangling", "Semantic registration does not name the document source path."));
  if (!hasDictionaryEntry(binding, BINDING) || !bindingRow) findings.push(reportIssue("registration-missing", "Binding registration is absent.", "minor"));
  else if (!bindingRow.includes(`\`${DOCUMENT_PATH}\``)) findings.push(reportIssue("registration-dangling", "Binding registration does not name the document source path."));
  if (frontmatter?.data?.invocation_token !== TOKEN || !sameArray(frontmatter?.data?.semantic_filters, [FILTER]) || !sameArray(frontmatter?.data?.bindings, [BINDING])) findings.push(reportIssue("token-divergence", "Frontmatter invocation values diverge from registrations."));
  for (const [sourcePath, text, kind, heading] of [
    ["docs/DICTIONARY-COMMAND.md", command, "command", "Commands"],
    ["docs/DICTIONARY-SEMANTIC.md", semantic, "semantic", "Tags"],
    ["docs/DICTIONARY-BINDING.md", binding, "binding", "Bindings"],
  ]) {
    const metadata = metadataEntries(text);
    const content = parseDictionaryTable(text, { sourcePath, kind, heading }).map(entry => entry.token);
    if (!sameSet(metadata, content)) findings.push(reportIssue("token-divergence", `${sourcePath} dictionary_entries and table tokens differ in one or both directions.`));
  }
  findings.push(...checkRegistrationPaths(registrations, reportIssue));
  const catalog = computeCatalogDigest(registrations);
  const recordedDigest = command.match(/^catalog_digest:\s*"?([0-9a-f]{64})"?$/mu)?.[1] || null;
  const recordedCount = Number(command.match(/^catalog_entry_count:\s*(\d+)$/mu)?.[1] || Number.NaN);
  if (recordedDigest !== catalog.digest) findings.push(reportIssue("catalog-digest-mismatch", `Catalog digest mismatch: recorded ${recordedDigest || "absent"}, recomputed ${catalog.digest}.`));
  if (recordedCount !== catalog.count) findings.push(reportIssue("catalog-count-mismatch", `Catalog count mismatch: recorded ${Number.isNaN(recordedCount) ? "absent" : recordedCount}, recomputed ${catalog.count}.`));
  return Object.freeze({ findings: Object.freeze(findings), ready: findings.every(item => item.severity === "minor"), catalog });
}

export function computeCatalogDigest(registrations) {
  const specs = [["docs/DICTIONARY-COMMAND.md", "command", "Commands"], ["docs/DICTIONARY-SEMANTIC.md", "semantic", "Tags"], ["docs/DICTIONARY-BINDING.md", "binding", "Bindings"]];
  const entries = specs.flatMap(([sourcePath, kind, heading]) => parseDictionaryTable(registrations[sourcePath] || "", { sourcePath, kind, heading }));
  entries.sort((left, right) => Buffer.from(left.token).compare(Buffer.from(right.token)));
  const encoded = entries.map(entry => JSON.stringify(Object.fromEntries(Object.entries(entry).sort(([left], [right]) => left.localeCompare(right))))).join("");
  return Object.freeze({ digest: createHash("sha256").update(encoded).digest("hex"), count: entries.length, entries: Object.freeze(entries) });
}

export function collectRegistrationPathReferences(registrations) {
  const references = new Map();
  for (const artifact of REGISTRATION_ARTIFACTS) {
    const text = typeof registrations?.[artifact] === "string" ? registrations[artifact] : "";
    const linkRanges = [];
    for (const match of text.matchAll(MARKDOWN_LINK_REFERENCE)) {
      linkRanges.push(Object.freeze({ start: match.index, end: match.index + match[0].length }));
      if (!isConcretePathMention(text, match[1], match.index + match[0].indexOf(match[1]))) continue;
      addPathReference(references, { artifact, path: match[1], base: "artifact" });
    }
    for (const match of text.matchAll(DOCUMENT_REFERENCE)) {
      const pathStart = match.index + match[0].indexOf(match[1]);
      if (linkRanges.some(range => pathStart >= range.start && pathStart < range.end)) continue;
      if (!isConcretePathMention(text, match[1], pathStart)) continue;
      addPathReference(references, { artifact, path: match[1], base: "root" });
    }
  }
  return Object.freeze([...references.values()].sort(comparePathReference));
}

function parseDictionaryTable(text, { sourcePath, kind, heading }) {
  const lines = String(text).split(/\r?\n/u); const start = lines.indexOf(`## ${heading}`);
  if (start < 0) return [];
  const output = [];
  for (let index = start + 1; index < lines.length && !/^## /u.test(lines[index]); index += 1) {
    const cells = tableCells(lines[index]); const token = cells[0]?.match(/^`([^`]+)`$/u)?.[1];
    if (!token || !token.startsWith(kind === "command" ? "/" : kind === "semantic" ? "#" : "@")) continue;
    output.push(Object.freeze({ token, kind, label: token, summary: cells[1] || "", sourcePath }));
  }
  return output;
}
function linesWith(text, raw) { return String(text).split(/\r?\n/u).filter(line => line.includes(raw)); }
function hasDictionaryEntry(text, token) { return count(text, `  - "${token}"`) === 1; }
function tokenRow(text, token) { const rows = linesWith(text, `\`${token}\``).filter(line => /^\|/u.test(line)); return rows.length === 1 ? rows[0] : null; }
function metadataEntries(text) {
  const lines = String(text).split(/\r?\n/u); const start = lines.indexOf("dictionary_entries:");
  if (start < 0) return [];
  const entries = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const match = lines[index].match(/^  - "([^"]+)"$/u);
    if (match) { entries.push(match[1]); continue; }
    if (!/^\s/u.test(lines[index]) || lines[index] === "---") break;
  }
  return entries;
}
function checkRegistrationPaths(registrations, reportIssue) {
  let references;
  try {
    references = collectRegistrationPathReferences(registrations);
  } catch (error) {
    return [reportIssue("registration-dangling", `Registration path enumeration failed: ${error.message}`)];
  }
  const inventory = Array.isArray(registrations?.pathInventory) ? registrations.pathInventory : [];
  const findings = [];
  for (const reference of references) {
    if (!isSafeDocumentReference(reference)) {
      findings.push(reportIssue("registration-dangling", `${reference.artifact} references unsafe ${reference.base}-relative document path ${reference.path}.`));
      continue;
    }
    const candidates = inventory.filter(entry => entry?.artifact === reference.artifact && entry?.path === reference.path);
    const matches = candidates.some(entry => entry?.base !== undefined)
      ? candidates.filter(entry => entry?.base === reference.base)
      : candidates;
    const evidence = matches[0];
    if (matches.length !== 1) {
      findings.push(reportIssue("registration-dangling", `${reference.artifact} references ${reference.path}, but resolver evidence count is ${matches.length}.`));
      continue;
    }
    if (typeof evidence.exists !== "boolean" || typeof evidence.resolvedPath !== "string" || (evidence.exists && evidence.resolvedPath.length === 0)) {
      findings.push(reportIssue("registration-dangling", `${reference.artifact} references ${reference.path}, but resolver evidence is malformed.`));
      continue;
    }
    if (!evidence.exists) findings.push(reportIssue("registration-dangling", `${reference.artifact} references ${reference.path}, but ${evidence.resolvedPath || "no candidate path"} does not exist.`));
  }
  return findings;
}
function isSafeDocumentReference(reference) {
  const value = reference?.path;
  if (typeof value !== "string" || !value.endsWith(".md") || value.includes("\\") || value.includes("\0") || path.posix.isAbsolute(value)) return false;
  const resolved = reference.base === "artifact"
    ? path.posix.normalize(path.posix.join(path.posix.dirname(reference.artifact), value))
    : path.posix.normalize(value);
  return resolved !== "." && resolved !== ".." && !resolved.startsWith("../") && !path.posix.isAbsolute(resolved);
}
function comparePathReference(left, right) {
  const artifactOrder = Buffer.from(left.artifact).compare(Buffer.from(right.artifact));
  const pathOrder = Buffer.from(left.path).compare(Buffer.from(right.path));
  return artifactOrder || pathOrder || Buffer.from(left.base).compare(Buffer.from(right.base));
}
function isConcretePathMention(text, documentPath, start) {
  if (TEMPLATE_PATH_COMPONENT.test(documentPath)) return false;
  const suffix = String(text).slice(start + documentPath.length, start + documentPath.length + 32);
  return !/^`?(?:-|\s)+(?:compatible|style|format|shaped)\b/iu.test(suffix);
}
function addPathReference(references, { artifact, path: documentPath, base }) {
  const key = `${artifact}\0${documentPath}\0${base}`;
  if (!references.has(key)) references.set(key, Object.freeze({ artifact, path: documentPath, base }));
  if (references.size > MAX_PATH_REFERENCES) throw new RangeError(`Registration path references exceed ${MAX_PATH_REFERENCES}.`);
}
function unquoteCode(value) { return String(value).replace(/^`|`$/gu, ""); }
function sameArray(left, right) { return Array.isArray(left) && left.length === right.length && left.every((value, index) => value === right[index]); }
function sameSet(left, right) {
  const leftSet = new Set(left); const rightSet = new Set(right);
  return leftSet.size === rightSet.size && [...leftSet].every(value => rightSet.has(value));
}
function count(text, needle) { return String(text).split(needle).length - 1; }
function issue(document, ruleIndex, code, message, severity = "blocker") {
  const ruleId = resolveRuleId(ruleIndex, "verification-gates", /Run every verification command registered/u, "verification-gates#9");
  return finding({ ruleId, type: "unimplemented-guideline", severity, path: document.sourcePath, message: `${code}: ${message}` });
}
