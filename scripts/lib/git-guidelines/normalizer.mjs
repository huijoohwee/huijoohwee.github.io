const TIMESTAMP = /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,9})?)?Z\b/gu;
const RUN_FIELD = /("?(?:runId|operationId|sessionId|idempotencyKey)"?\s*[:=]\s*)"?[^",}\s]+"?/gu;

export const NORMALIZATION_CLASSES = Object.freeze([
  "line-ending-style", "trailing-whitespace", "absolute-path-prefix", "iso-8601-timestamp", "run-identifiers", "ordering-insensitive-metadata",
]);
export const NORMALIZATION_EXCLUSIONS = Object.freeze([
  "interior-whitespace", "case", "unicode-normalization", "comments", "quote-style", "number-format", "separator-translation",
]);

export function normalizeValue(value, { absolutePrefixes = [] } = {}) {
  if (typeof value === "string") {
    let normalized = value.replace(/\r\n?/gu, "\n").split("\n").map(line => line.replace(/[\t ]+$/gu, "")).join("\n");
    for (const prefix of [...absolutePrefixes].sort((a, b) => b.length - a.length)) normalized = normalized.split(prefix).join("<ROOT>");
    return normalized.replace(TIMESTAMP, "<TS>").replace(RUN_FIELD, "$1\"<RUN>\"");
  }
  if (Array.isArray(value)) return Object.freeze(value.map(item => normalizeValue(item, { absolutePrefixes })).sort(byteCompare));
  if (value && typeof value === "object") {
    return Object.freeze(Object.fromEntries(Object.entries(value).sort(([left], [right]) => byteCompare(left, right)).map(([key, item]) => [key, normalizeValue(item, { absolutePrefixes })])));
  }
  return value;
}

export function byteCompare(left, right) { return Buffer.from(String(left)).compare(Buffer.from(String(right))); }
