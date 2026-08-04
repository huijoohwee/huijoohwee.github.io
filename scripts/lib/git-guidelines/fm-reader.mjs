export class FrontmatterError extends Error {
  constructor(message, line = 1) { super(message); this.name = "FrontmatterError"; this.line = line; }
}

export function readFrontmatter(text) {
  const source = String(text).replace(/\r\n?/gu, "\n");
  if (!source.startsWith("---\n")) throw new FrontmatterError("Frontmatter must be the first block.", 1);
  const lines = source.split("\n");
  const closing = lines.findIndex((line, index) => index > 0 && line === "---");
  if (closing < 0) throw new FrontmatterError("Frontmatter closing delimiter is absent.", 1);
  const data = Object.create(null);
  for (let index = 1; index < closing; index += 1) {
    const line = lines[index];
    if (!line.trim() || /^\s/u.test(line)) throw new FrontmatterError("Only top-level block mappings are accepted.", index + 1);
    const match = line.match(/^([A-Za-z][A-Za-z0-9_]*)\s*:\s*(.*)$/u);
    if (!match) throw new FrontmatterError("Frontmatter entry is outside the strict subset.", index + 1);
    const [, key, rawValue] = match;
    if (Object.hasOwn(data, key)) throw new FrontmatterError(`Duplicate frontmatter key: ${key}`, index + 1);
    data[key] = parseValue(rawValue, index + 1);
  }
  return Object.freeze({ data: deepFreeze(data), raw: lines.slice(0, closing + 1).join("\n"), endLine: closing + 1 });
}

function parseValue(raw, line) {
  const value = raw.trim();
  if (!value) throw new FrontmatterError("Empty implicit values are forbidden.", line);
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?(?:0|[1-9]\d*)(?:\.\d+)?$/u.test(value)) return Number(value);
  if (value.startsWith("[") && value.endsWith("]")) return parseFlowSequence(value, line);
  if (value.startsWith('"')) {
    try { const parsed = JSON.parse(value); if (typeof parsed !== "string") throw new Error(); return parsed; }
    catch { throw new FrontmatterError("Invalid double-quoted scalar.", line); }
  }
  if (value.startsWith("'")) {
    if (!value.endsWith("'")) throw new FrontmatterError("Invalid single-quoted scalar.", line);
    return value.slice(1, -1).replace(/''/gu, "'");
  }
  if (/[:#]\s|^[-?:,\[\]{}&*!|>%@`'"]/u.test(value)) {
    throw new FrontmatterError("Reserved punctuation requires a quoted scalar.", line);
  }
  return value;
}

function parseFlowSequence(value, line) {
  try {
    const parsed = JSON.parse(value.replace(/'([^']*(?:''[^']*)*)'/gu, (_match, inner) => JSON.stringify(inner.replace(/''/gu, "'"))));
    if (!Array.isArray(parsed) || parsed.some(item => typeof item !== "string")) throw new Error();
    return parsed;
  } catch {
    throw new FrontmatterError("Flow sequences may contain quoted scalar strings only.", line);
  }
}

function deepFreeze(value) {
  if (value && typeof value === "object") for (const child of Object.values(value)) deepFreeze(child);
  return Object.freeze(value);
}
