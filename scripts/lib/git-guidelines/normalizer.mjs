import { FrontmatterError, readFrontmatter } from "./fm-reader.mjs";

const TIMESTAMP = /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?(?:Z|[+-]\d{2}:\d{2})\b/gu;
const RUN_IDENTIFIER_FIELDS = new Set(["runId", "operationId", "sessionId", "idempotencyKey"]);
const FRONTMATTER_ENTRY = /^(\s*)([A-Za-z][A-Za-z0-9_-]*)\s*:/u;

export const ARTIFACT_UNORDERED_SEQUENCE_PATHS = Object.freeze({
  "agentic-cloud-collaboration-result/v1": Object.freeze([
    "/claims",
    "/findings",
    "/receipt/findings",
  ]),
  "agentic-legacy-dirty-lane-recovery/v1": Object.freeze([
    "/tracked",
    "/untracked",
  ]),
});

export const NORMALIZATION_CLASSES = Object.freeze([
  "line-ending-style",
  "trailing-whitespace",
  "absolute-path-prefix",
  "iso-8601-timestamp",
  "run-identifiers",
  "ordering-insensitive-metadata",
]);
export const NORMALIZATION_EXCLUSIONS = Object.freeze([
  "interior-whitespace",
  "case",
  "unicode-normalization",
  "comments",
  "quote-style",
  "number-format",
  "separator-translation",
]);

export function normalizeValue(value, { absolutePrefixes = [], unorderedSequencePaths = [] } = {}) {
  const context = Object.freeze({
    absolutePrefixes: normalizeAbsolutePrefixes(absolutePrefixes),
    unorderedSequencePaths: normalizeUnorderedSequencePaths(unorderedSequencePaths),
  });
  return normalizeNode(value, context, "");
}

export function normalizeFrontmatterSource(source, { absolutePrefixes = [] } = {}) {
  const normalized = normalizeValue(String(source), { absolutePrefixes });
  let parsed;
  try {
    parsed = readFrontmatter(normalized);
  } catch (error) {
    if (error instanceof FrontmatterError) return normalized;
    throw error;
  }

  const lines = normalized.split("\n");
  const entries = splitMappingEntries(lines.slice(1, parsed.endLine - 1), 0)
    .map(canonicalizeNestedMapping)
    .sort(compareEntryChunks);
  return [
    "---",
    ...entries.flatMap(entry => entry.lines),
    ...lines.slice(parsed.endLine - 1),
  ].join("\n");
}

export function normalizeArtifactsForComparison(artifacts, {
  absolutePrefixes = [],
  unorderedSequencePathsBySchema = ARTIFACT_UNORDERED_SEQUENCE_PATHS,
} = {}) {
  if (!Array.isArray(artifacts)) throw new TypeError("artifacts must be an array.");
  validateSchemaSequencePaths(unorderedSequencePathsBySchema);
  const projections = artifacts.map(artifact => {
    const value = artifact?.value ?? null;
    const unorderedSequencePaths = unorderedSequencePathsBySchema[value?.schema] || [];
    return normalizeValue({
      path: artifact?.path ?? null,
      relativePath: artifact?.relativePath ?? null,
      condition: artifact?.condition ?? null,
      validationProblems: artifact?.validationProblems ?? [],
      value,
    }, { absolutePrefixes, unorderedSequencePaths: unorderedSequencePaths.map(pointer => `/value${pointer}`) });
  });
  projections.sort(compareArtifactProjections);
  return Object.freeze(projections);
}

function normalizeNode(value, context, pointer) {
  if (typeof value === "string") return normalizeText(value, context.absolutePrefixes);
  if (Array.isArray(value)) {
    const normalized = value.map((item, index) => normalizeNode(item, context, joinPointer(pointer, String(index))));
    if (context.unorderedSequencePaths.has(pointer)) normalized.sort(compareCanonicalValues);
    return Object.freeze(normalized);
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).map(([key, item]) => {
      const normalized = RUN_IDENTIFIER_FIELDS.has(key)
        ? "<RUN>"
        : normalizeNode(item, context, joinPointer(pointer, key));
      return [key, normalized];
    });
    entries.sort(([left], [right]) => byteCompare(left, right));
    return Object.freeze(Object.fromEntries(entries));
  }
  return value;
}

function normalizeText(value, absolutePrefixes) {
  let normalized = value.replace(/\r\n?/gu, "\n");
  normalized = normalized.split("\n").map(line => line.replace(/[\t ]+$/gu, "")).join("\n");
  for (const prefix of absolutePrefixes) normalized = stripAbsolutePrefix(normalized, prefix);
  return normalized.replace(TIMESTAMP, "<TS>");
}

function splitMappingEntries(lines, indent) {
  const entries = [];
  let current = null;
  for (const line of lines) {
    const match = line.match(FRONTMATTER_ENTRY);
    if (match && match[1].length === indent) {
      current = { key: match[2], lines: [line] };
      entries.push(current);
      continue;
    }
    if (current === null) return lines.map((sourceLine, index) => ({ key: String(index), lines: [sourceLine] }));
    current.lines.push(line);
  }
  return entries.map(entry => Object.freeze({ key: entry.key, lines: Object.freeze(entry.lines) }));
}

function canonicalizeNestedMapping(entry) {
  if (entry.lines.length < 2 || /^\s*-\s/u.test(entry.lines[1])) return entry;
  const nested = splitMappingEntries(entry.lines.slice(1), 2);
  if (nested.some(item => !/^\s{2}[A-Za-z]/u.test(item.lines[0]))) return entry;
  nested.sort(compareEntryChunks);
  return Object.freeze({ key: entry.key, lines: Object.freeze([entry.lines[0], ...nested.flatMap(item => item.lines)]) });
}

function compareEntryChunks(left, right) {
  return byteCompare(left.key, right.key);
}

function validateSchemaSequencePaths(declarations) {
  if (!declarations || typeof declarations !== "object" || Array.isArray(declarations)) {
    throw new TypeError("unorderedSequencePathsBySchema must be a schema-to-JSON-Pointer mapping.");
  }
  for (const [schema, pointers] of Object.entries(declarations)) {
    if (!schema || !Array.isArray(pointers)) throw new TypeError("Each schema declaration must contain a JSON Pointer array.");
    normalizeUnorderedSequencePaths(pointers);
  }
}

function compareArtifactProjections(left, right) {
  return byteCompare(left.relativePath || left.path || "", right.relativePath || right.path || "")
    || byteCompare(JSON.stringify(left.value), JSON.stringify(right.value));
}

function normalizeAbsolutePrefixes(prefixes) {
  if (!Array.isArray(prefixes)) throw new TypeError("absolutePrefixes must be an array.");
  const normalized = prefixes.map(prefix => String(prefix).replace(/\/+$/u, "")).filter(Boolean);
  return Object.freeze([...new Set(normalized)].sort((left, right) => right.length - left.length || byteCompare(left, right)));
}

function normalizeUnorderedSequencePaths(paths) {
  if (!Array.isArray(paths) || paths.some(pointer => typeof pointer !== "string" || (pointer !== "" && !pointer.startsWith("/")))) {
    throw new TypeError("unorderedSequencePaths must contain JSON Pointer strings.");
  }
  return new Set(paths);
}

function stripAbsolutePrefix(value, prefix) {
  const pattern = new RegExp(`${escapeRegExp(prefix)}(?=$|/)(?:/)?`, "gu");
  return value.replace(pattern, "");
}

function joinPointer(parent, segment) {
  const escaped = segment.replace(/~/gu, "~0").replace(/\//gu, "~1");
  return `${parent}/${escaped}`;
}

function compareCanonicalValues(left, right) {
  return byteCompare(canonicalOrderingKey(left), canonicalOrderingKey(right));
}

function canonicalOrderingKey(value) {
  if (value === undefined) return "undefined:";
  if (typeof value === "bigint") return `bigint:${value}`;
  return `${typeof value}:${JSON.stringify(value)}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}

export function byteCompare(left, right) {
  return Buffer.from(String(left)).compare(Buffer.from(String(right)));
}
