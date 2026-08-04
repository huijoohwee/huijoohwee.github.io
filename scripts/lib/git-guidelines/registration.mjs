import { createHash } from "node:crypto";
import { finding, tableCells } from "./content.mjs";

const DOCUMENT_PATH = "docs/documents/git-guidelines.md";
const TOKEN = "/git.guidelines";
const FILTER = "#git-collaboration";
const BINDING = "@git-guidelines";

export function checkRegistrations(document, registrations, frontmatter) {
  const findings = [];
  const docsIndex = registrations["docs/README.md"] || "";
  const command = registrations["docs/DICTIONARY-COMMAND.md"] || "";
  const semantic = registrations["docs/DICTIONARY-SEMANTIC.md"] || "";
  const binding = registrations["docs/DICTIONARY-BINDING.md"] || "";
  const docsRows = linesWith(docsIndex, DOCUMENT_PATH).filter(line => /^\|/u.test(line));
  if (docsRows.length !== 1 || tableCells(docsRows[0]).length < 3 || tableCells(docsRows[0]).slice(0, 3).some(cell => !cell)) findings.push(issue(document, "Docs Index row is missing or malformed."));
  if (count(command, `  - "${DOCUMENT_PATH}"`) !== 1 || count(command, `  - "${TOKEN}"`) !== 1) findings.push(issue(document, "Command metadata must name the document path and token exactly once."));
  const commandRows = linesWith(command, `\`${TOKEN}\``).filter(line => /^\|/u.test(line));
  const commandCells = commandRows.length === 1 ? tableCells(commandRows[0]) : [];
  if (commandCells.length < 5 || !commandCells[1] || !commandCells[2].includes("@") || !commandCells[3].includes("#") || !commandCells[4]) findings.push(issue(document, "Command token row is absent or incomplete."));
  if (!hasDictionaryEntry(semantic, FILTER) || !hasTableToken(semantic, FILTER)) findings.push(issue(document, "Semantic registration is absent.", "minor"));
  if (!hasDictionaryEntry(binding, BINDING) || !hasTableToken(binding, BINDING)) findings.push(issue(document, "Binding registration is absent.", "minor"));
  if (frontmatter?.data?.invocation_token !== TOKEN || frontmatter?.data?.semantic_filters?.[0] !== FILTER || frontmatter?.data?.bindings?.[0] !== BINDING) findings.push(issue(document, "Frontmatter invocation values diverge from registrations."));
  const catalog = computeCatalogDigest(registrations);
  const recordedDigest = command.match(/^catalog_digest:\s*"?([0-9a-f]{64})"?$/mu)?.[1] || null;
  const recordedCount = Number(command.match(/^catalog_entry_count:\s*(\d+)$/mu)?.[1] || Number.NaN);
  if (recordedDigest !== catalog.digest) findings.push(issue(document, `Catalog digest mismatch: recorded ${recordedDigest || "absent"}, recomputed ${catalog.digest}.`));
  if (recordedCount !== catalog.count) findings.push(issue(document, `Catalog count mismatch: recorded ${Number.isNaN(recordedCount) ? "absent" : recordedCount}, recomputed ${catalog.count}.`));
  return Object.freeze({ findings: Object.freeze(findings), ready: findings.every(item => item.severity === "minor"), catalog });
}

export function computeCatalogDigest(registrations) {
  const specs = [["docs/DICTIONARY-COMMAND.md", "command", "Commands"], ["docs/DICTIONARY-SEMANTIC.md", "semantic", "Tags"], ["docs/DICTIONARY-BINDING.md", "binding", "Bindings"]];
  const entries = specs.flatMap(([sourcePath, kind, heading]) => parseDictionaryTable(registrations[sourcePath] || "", { sourcePath, kind, heading }));
  entries.sort((left, right) => Buffer.from(left.token).compare(Buffer.from(right.token)));
  const encoded = entries.map(entry => JSON.stringify(Object.fromEntries(Object.entries(entry).sort(([left], [right]) => left.localeCompare(right))))).join("");
  return Object.freeze({ digest: createHash("sha256").update(encoded).digest("hex"), count: entries.length, entries: Object.freeze(entries) });
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
function hasTableToken(text, token) { return linesWith(text, `\`${token}\``).filter(line => /^\|/u.test(line)).length === 1; }
function count(text, needle) { return String(text).split(needle).length - 1; }
function issue(document, message, severity = "blocker") { return finding({ ruleId: "findings--rule-identity#2", type: "unimplemented-guideline", severity, path: document.sourcePath, message }); }
