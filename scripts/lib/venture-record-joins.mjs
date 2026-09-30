// Structural join validator for instantiated learning and venture records.
//
// It resolves identifiers across a deck, plan, model and learning record set: every cited
// headline (HL), hypothesis (H), experiment (E) and assumption (A) ID must be defined as the
// first cell of a table row in one of the documents, and every document must join the same
// continuity ID and version. It also guards the shared column shapes the guideline modules
// publish. It does not judge claims, demand, accounting or whether a threshold was met.

import { scanFrontmatter } from "./planning-frontmatter.mjs";

const ID_PATTERN = /\b(HL|H|E|A)(\d+)\b/g;
const DEFINITION_PATTERN = /^\|\s*(HL|H|E|A)(\d+)\s*\|/gm;
const PREFIX_NAMES = Object.freeze({ HL: "headline", H: "hypothesis", E: "experiment", A: "assumption" });

// Fenced examples and placeholder IDs are not records. Inline-code IDs are real citations.
function recordText(text) {
  let fence = null;
  return text.split("\n").filter(line => {
    const marker = /^\s{0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    if (marker && !fence) { fence = marker[1]; return false; }
    if (marker && marker[1][0] === fence?.[0] && marker[1].length >= fence.length && !marker[2].trim()) {
      fence = null; return false;
    }
    return !fence;
  }).join("\n").replace(/`+/g, "");
}

export function collectRecordIds(text) {
  const parsed = scanFrontmatter(text);
  const source = recordText(parsed.readState === "ok" ? parsed.body : text);
  const definitions = [...source.matchAll(DEFINITION_PATTERN)].map(([, prefix, n]) => `${prefix}${n}`);
  const defined = new Set(definitions);
  const cited = new Set([...source.matchAll(ID_PATTERN)].map(([, prefix, n]) => `${prefix}${n}`));
  for (const id of defined) cited.delete(id);
  return { defined, cited, definitions };
}

// documents: Map<name, markdown text>. Returns typed failures named by existing finding types.
export function validateRecordJoins(documents) {
  const failures = [];
  const defined = new Set();
  const owners = new Map();
  const perDocument = new Map();
  if (!documents.size) failures.push({ type: "unresolvable-reference", document: "record set", detail: "no records supplied" });
  for (const [name, text] of documents) {
    const ids = collectRecordIds(text);
    perDocument.set(name, ids);
    for (const id of ids.definitions) {
      if (owners.has(id)) failures.push({ type: "duplicate-owner", document: name,
        detail: `${id} is defined more than once; first owner: ${owners.get(id)}` });
      else owners.set(id, name);
      defined.add(id);
    }
  }
  for (const [name, { cited }] of perDocument) {
    for (const id of [...cited].sort()) {
      if (defined.has(id)) continue;
      const kind = PREFIX_NAMES[id.match(/^(HL|H|E|A)/)[1]];
      failures.push({ type: kind === "assumption" ? "financial-assumption-unsourced" : "unresolvable-reference",
        document: name, detail: `${kind} ${id} is cited but defined in no record` });
    }
  }
  const joins = new Map();
  for (const [name, text] of documents) {
    const parsed = scanFrontmatter(text);
    const { continuity_id: id, version } = parsed.frontmatter;
    if (parsed.readState !== "ok" || typeof id !== "string" || !id.trim() ||
        typeof version !== "string" || !/^\d+\.\d+(?:\.\d+)?$/.test(version)) {
      failures.push({ type: "artifact-naming-noncompliant", document: name,
        detail: parsed.error ?? "requires a nonempty continuity_id and a numeric dotted version" });
    } else joins.set(name, `${id}@${version}`);
  }
  if (new Set(joins.values()).size > 1) {
    for (const [name, join] of joins) {
      failures.push({ type: "status-conflict", document: name, detail: `joins ${join}; the record set disagrees` });
    }
  }
  return { failures, defined: defined.size };
}

// Column shapes published by the modules. `read(name)` returns a guideline module's text.
export const RECORD_SCHEMAS = Object.freeze([
  { module: "pitch-deck-guidelines.md", header: "| Slide | Register row | Headline claim | Source | Evidence status |" },
  { module: "business-plan-guidelines.md", header: "| Section | Claim | Source | Evidence status |" },
  { module: "financial-model-guidelines.md", header: "| HL-id | Row | Base | Downside | Upside | Unit | Period / window | Actual or forecast | Label | Source rows | Consumers |" },
  { module: "lean-startup-guidelines.md", header: "| H-id | Type | Falsifiable statement | Drives |" },
  { module: "lean-startup-guidelines.md", header: "| E-id | H-id | Method (type) |" },
]);
const SHARED_CLAIM_COLUMNS = ["Source", "Evidence status", "Retrieved / fresh until"];

export function validateRecordSchemas(read) {
  const failures = [];
  for (const { module, header } of RECORD_SCHEMAS) {
    if (!read(module).includes(header)) failures.push({ type: "unresolvable-reference", document: module, detail: `record header drifted: ${header}` });
  }
  for (const module of ["pitch-deck-guidelines.md", "business-plan-guidelines.md"]) {
    const text = read(module);
    const header = text.split("\n").find(line => line.startsWith("| Slide | Register row") || line.startsWith("| Section | Claim |"));
    for (const column of SHARED_CLAIM_COLUMNS) {
      if (!header?.includes(`| ${column} |`)) failures.push({ type: "status-conflict", document: module, detail: `claim record lacks shared column ${column}` });
    }
  }
  return failures;
}
