// Structural join validator for instantiated learning and venture records.
//
// It resolves identifiers across a deck, plan, model and learning record set: every cited
// headline (HL), hypothesis (H), experiment (E) and assumption (A) ID must be defined as the
// first cell of a table row in one of the documents, and every document must join the same
// continuity ID and version. It also guards the shared column shapes the guideline modules
// publish. It does not judge claims, demand, accounting or whether a threshold was met.

const ID_PATTERN = /\b(HL|H|E|A)(\d+)\b/g;
const DEFINITION_PATTERN = /^\|\s*(HL|H|E|A)(\d+)\s*\|/gm;
const PREFIX_NAMES = Object.freeze({ HL: "headline", H: "hypothesis", E: "experiment", A: "assumption" });

function frontmatter(text) {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  const fields = new Map();
  if (!match) return fields;
  for (const line of match[1].split("\n")) {
    const field = /^([a-z_]+):\s*"?([^"]*)"?\s*$/.exec(line);
    if (field) fields.set(field[1], field[2]);
  }
  return fields;
}

function body(text) {
  return text.replace(/^---\n[\s\S]*?\n---\n/, "");
}

// Placeholder rows such as `| [HL-id] |` are template text, not definitions or citations.
function withoutCode(text) {
  return text.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
}

export function collectRecordIds(text) {
  const source = withoutCode(body(text));
  const defined = new Set([...source.matchAll(DEFINITION_PATTERN)].map(([, prefix, n]) => `${prefix}${n}`));
  const cited = new Set([...source.matchAll(ID_PATTERN)].map(([, prefix, n]) => `${prefix}${n}`));
  for (const id of defined) cited.delete(id);
  return { defined, cited };
}

// documents: Map<name, markdown text>. Returns typed failures named by existing finding types.
export function validateRecordJoins(documents) {
  const failures = [];
  const defined = new Set();
  const perDocument = new Map();
  for (const [name, text] of documents) {
    const ids = collectRecordIds(text);
    perDocument.set(name, ids);
    for (const id of ids.defined) defined.add(id);
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
    const fields = frontmatter(text);
    const join = fields.has("continuity_id") ? `${fields.get("continuity_id")}@${fields.get("version") ?? ""}` : null;
    if (!join) failures.push({ type: "artifact-naming-noncompliant", document: name, detail: "missing continuity_id" });
    else joins.set(name, join);
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
