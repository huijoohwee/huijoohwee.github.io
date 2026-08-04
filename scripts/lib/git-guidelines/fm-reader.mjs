const KEY_PATTERN = /^[A-Za-z][A-Za-z0-9_-]*$/u;
const ENTRY_PATTERN = /^([A-Za-z][A-Za-z0-9_-]*)\s*:\s*(.*)$/u;
const DECIMAL_PATTERN = /^-?(?:0|[1-9]\d*)(?:\.\d+)?$/u;
const LEADING_INDICATOR_PATTERN = /^[-?:,\[\]{}&*!|>%@`'"#]/u;

export class FrontmatterError extends Error {
  constructor(message, line = 1) {
    super(message);
    this.name = "FrontmatterError";
    this.code = "frontmatter-unparseable";
    this.line = line;
  }
}

export function readFrontmatter(text) {
  const source = String(text).replace(/\r\n?/gu, "\n");
  if (!source.startsWith("---\n")) fail("Frontmatter must be the first block with zero preceding bytes.", 1);

  const lines = source.split("\n");
  const closingIndex = lines.findIndex((line, index) => index > 0 && line === "---");
  if (closingIndex < 0) fail("Frontmatter closing delimiter is absent.", lines.length);

  const state = { lines, closingIndex, index: 1, keyLines: Object.create(null) };
  const data = parseRootMapping(state);
  if (state.index !== closingIndex) fail("Frontmatter entry is outside the bounded YAML subset.", state.index + 1);

  return Object.freeze({
    data: deepFreeze(data),
    keyLines: deepFreeze(state.keyLines),
    raw: lines.slice(0, closingIndex + 1).join("\n"),
    endLine: closingIndex + 1,
  });
}

function parseRootMapping(state) {
  const output = Object.create(null);
  while (state.index < state.closingIndex) {
    const lineNumber = state.index + 1;
    const line = state.lines[state.index];
    rejectBlankOrTab(line, lineNumber);
    if (leadingSpaces(line) !== 0) fail("Top-level mapping entries must start in column 1.", lineNumber);

    const { key, rawValue } = parseEntry(line, lineNumber);
    addUniqueKey(output, key, lineNumber);
    state.keyLines[key] = lineNumber;
    state.index += 1;

    if (rawValue.trim()) {
      output[key] = parseInlineValue(rawValue, lineNumber);
      continue;
    }
    output[key] = parseIndentedValue(state, 2, key);
  }
  return output;
}

function parseIndentedValue(state, indent, parentKey) {
  if (state.index >= state.closingIndex) fail(`Empty implicit value for ${parentKey} is forbidden.`, state.index + 1);
  const line = state.lines[state.index];
  rejectBlankOrTab(line, state.index + 1);
  const observedIndent = leadingSpaces(line);
  if (observedIndent !== indent) fail(`Expected ${indent} spaces below ${parentKey}.`, state.index + 1);

  if (isSequenceLine(line, indent)) return parseBlockSequence(state, indent);
  return parseNestedMapping(state, indent, parentKey);
}

function parseNestedMapping(state, indent, parentKey) {
  const output = Object.create(null);
  while (state.index < state.closingIndex) {
    const line = state.lines[state.index];
    const lineNumber = state.index + 1;
    rejectBlankOrTab(line, lineNumber);
    const observedIndent = leadingSpaces(line);
    if (observedIndent < indent) break;
    if (observedIndent !== indent) fail("Nested mappings may be one level deep only.", lineNumber);
    if (isSequenceLine(line, indent)) fail(`Cannot mix mapping and sequence entries below ${parentKey}.`, lineNumber);

    const { key, rawValue } = parseEntry(line.slice(indent), lineNumber);
    addUniqueKey(output, key, lineNumber, parentKey);
    state.keyLines[`${parentKey}.${key}`] = lineNumber;
    state.index += 1;

    if (rawValue.trim()) {
      output[key] = parseInlineValue(rawValue, lineNumber);
      continue;
    }
    if (state.index >= state.closingIndex) fail(`Empty implicit value for ${parentKey}.${key} is forbidden.`, state.index + 1);
    const next = state.lines[state.index];
    rejectBlankOrTab(next, state.index + 1);
    if (leadingSpaces(next) !== indent + 2 || !isSequenceLine(next, indent + 2)) {
      fail("Nested mappings may not contain another mapping level.", state.index + 1);
    }
    output[key] = parseBlockSequence(state, indent + 2);
  }
  if (Object.keys(output).length === 0) fail(`Nested mapping ${parentKey} must contain at least one entry.`, state.index + 1);
  return output;
}

function parseBlockSequence(state, indent) {
  const output = [];
  while (state.index < state.closingIndex) {
    const line = state.lines[state.index];
    const lineNumber = state.index + 1;
    rejectBlankOrTab(line, lineNumber);
    const observedIndent = leadingSpaces(line);
    if (observedIndent < indent) break;
    if (observedIndent !== indent) fail("Block sequence indentation is outside the bounded subset.", lineNumber);
    if (!isSequenceLine(line, indent)) fail("Cannot mix sequence and mapping entries at one indentation level.", lineNumber);

    const rawValue = line.slice(indent + 1).trimStart();
    if (!rawValue) fail("Block sequences require an explicit scalar after '-'.", lineNumber);
    output.push(parseScalar(rawValue, lineNumber));
    state.index += 1;
  }
  return output;
}

function parseEntry(line, lineNumber) {
  const match = line.match(ENTRY_PATTERN);
  if (!match || !KEY_PATTERN.test(match[1])) fail("Expected a scalar mapping key followed by ':'.", lineNumber);
  return { key: match[1], rawValue: match[2] };
}

function parseInlineValue(rawValue, lineNumber) {
  const value = rawValue.trim();
  if (value.startsWith("[")) return parseFlowSequence(value, lineNumber);
  return parseScalar(value, lineNumber);
}

function parseScalar(rawValue, lineNumber) {
  const value = rawValue.trim();
  if (!value) fail("Empty implicit values are forbidden.", lineNumber);
  if (value.startsWith('"')) return parseDoubleQuotedScalar(value, lineNumber);
  if (value.startsWith("'")) return parseSingleQuotedScalar(value, lineNumber);
  if (value === "true" || value === "True" || value === "TRUE") return true;
  if (value === "false" || value === "False" || value === "FALSE") return false;
  if (value === "null" || value === "Null" || value === "NULL" || value === "~") return null;
  if (DECIMAL_PATTERN.test(value)) return Number(value);
  if (LEADING_INDICATOR_PATTERN.test(value) || /:\s|\s#/u.test(value)) {
    fail("Reserved punctuation requires a quoted scalar.", lineNumber);
  }
  if (/[\u0000-\u001F\u007F]/u.test(value)) fail("Control characters are forbidden in plain scalars.", lineNumber);
  return value;
}

function parseDoubleQuotedScalar(value, lineNumber) {
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed !== "string") throw new TypeError("not a string");
    return parsed;
  } catch {
    fail("Invalid double-quoted scalar; use JSON-compatible escapes on one physical line.", lineNumber);
  }
}

function parseSingleQuotedScalar(value, lineNumber) {
  if (value.length < 2 || !value.endsWith("'")) fail("Invalid single-quoted scalar.", lineNumber);
  const inner = value.slice(1, -1);
  let output = "";
  for (let index = 0; index < inner.length; index += 1) {
    if (inner[index] !== "'") {
      output += inner[index];
      continue;
    }
    if (inner[index + 1] !== "'") fail("Single quotes inside a single-quoted scalar must be doubled.", lineNumber);
    output += "'";
    index += 1;
  }
  return output;
}

function parseFlowSequence(value, lineNumber) {
  if (!value.endsWith("]")) fail("Flow sequence closing bracket is absent.", lineNumber);
  const body = value.slice(1, -1).trim();
  if (!body) return [];

  const items = [];
  let token = "";
  let quote = null;
  let escaped = false;
  for (let index = 0; index < body.length; index += 1) {
    const character = body[index];
    if (quote === '"') {
      token += character;
      if (escaped) escaped = false;
      else if (character === "\\") escaped = true;
      else if (character === quote) quote = null;
      continue;
    }
    if (quote === "'") {
      token += character;
      if (character !== "'") continue;
      if (body[index + 1] === "'") {
        token += body[index + 1];
        index += 1;
      } else {
        quote = null;
      }
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      token += character;
      continue;
    }
    if (character === "[" || character === "]") fail("Nested flow sequences are outside the bounded subset.", lineNumber);
    if (character === "{" || character === "}") fail("Flow mappings are outside the bounded subset.", lineNumber);
    if (character === ",") {
      pushFlowScalar(items, token, lineNumber);
      token = "";
      continue;
    }
    token += character;
  }
  if (quote) fail("Flow sequence contains an unterminated quoted scalar.", lineNumber);
  pushFlowScalar(items, token, lineNumber);
  return items;
}

function pushFlowScalar(items, token, lineNumber) {
  if (!token.trim()) fail("Flow sequences may not contain empty implicit items.", lineNumber);
  items.push(parseScalar(token, lineNumber));
}

function addUniqueKey(mapping, key, lineNumber, parentKey = null) {
  if (Object.hasOwn(mapping, key)) {
    const qualifiedKey = parentKey ? `${parentKey}.${key}` : key;
    fail(`Duplicate frontmatter key: ${qualifiedKey}.`, lineNumber);
  }
  mapping[key] = undefined;
}

function rejectBlankOrTab(line, lineNumber) {
  if (!line.trim()) fail("Blank lines are outside the bounded frontmatter subset.", lineNumber);
  if (line.includes("\t")) fail("Tabs are forbidden in frontmatter indentation and scalars.", lineNumber);
}

function leadingSpaces(line) {
  return line.length - line.trimStart().length;
}

function isSequenceLine(line, indent) {
  return line.slice(0, indent) === " ".repeat(indent) && /^-(?:\s|$)/u.test(line.slice(indent));
}

function fail(message, line) {
  throw new FrontmatterError(message, line);
}

function deepFreeze(value) {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}
