import { finding, tableCells } from "./content.mjs";

const CLASSIFICATIONS = Object.freeze(["artifact-bearing", "advisory"]);
const DIRECTIVE_PREFIX = /^\s*-\s+(\[[^\]\n]+\](?:\s*\[(?:artifact-bearing|advisory)\])*)\s+(.*)$/u;
const PLAIN_DIRECTIVE = /^\s*-\s+(.*)$/u;
const CLASSIFICATION_MARKER = /\[(artifact-bearing|advisory)\]/gu;

export function buildRuleIndex(document) {
  const rules = [];
  const findings = [];
  const observedAnchors = new Set();

  for (const section of document.sections) {
    const duplicateAnchor = observedAnchors.has(section.anchor);
    observedAnchors.add(section.anchor);
    const tableRules = parsedTableRules(section);
    let ordinal = 0;

    for (let offset = 1; offset < section.lines.length; offset += 1) {
      const parsed = parseDirective(section.lines[offset]) || tableRules.get(offset);
      if (!parsed) continue;

      ordinal += 1;
      const id = `${section.anchor}#${ordinal}`;
      const rule = Object.freeze({
        id,
        anchor: section.anchor,
        ordinal,
        classification: parsed.classifications.length === 1 ? parsed.classifications[0] : null,
        classifications: Object.freeze([...parsed.classifications]),
        ruleText: parsed.ruleText,
        line: section.startLine + offset,
        source: parsed.source,
      });
      rules.push(rule);

      if (parsed.classifications.length === 0) {
        findings.push(issue(document, rule, "rule-unclassified", "Rule carries no artifact-bearing or advisory classification."));
      } else if (parsed.classifications.length > 1) {
        findings.push(issue(document, rule, "rule-multiclassified", `Rule carries ${parsed.classifications.length} classification markers.`));
      }
      if (parsed.authoredRuleId && parsed.authoredRuleId !== id) {
        findings.push(issue(document, rule, "rule-ordinal-mismatch", `Authored Rule_ID ${parsed.authoredRuleId} differs from derived Rule_ID ${id}.`));
      }
      if (parsed.ruleText.length === 0) {
        findings.push(issue(document, rule, "rule-unclassified", "Classified rule has no rule text."));
      }
    }

    if (duplicateAnchor) {
      const firstRule = rules.find(rule => rule.anchor === section.anchor && rule.line >= section.startLine);
      findings.push(finding({
        ruleId: firstRule?.id || `${section.anchor}#1`,
        type: "unimplemented-guideline",
        severity: "major",
        path: document.sourcePath,
        line: section.startLine,
        message: `rule-id-duplicate: Duplicate section anchor ${section.anchor}.`,
      }));
    }
  }

  const byId = Object.create(null);
  for (const rule of rules) {
    if (Object.hasOwn(byId, rule.id)) {
      findings.push(issue(document, rule, "rule-id-duplicate", `Derived Rule_ID ${rule.id} is duplicated document-wide.`));
      continue;
    }
    byId[rule.id] = rule;
  }

  return Object.freeze({
    rules: Object.freeze(rules),
    artifactRules: Object.freeze(rules.filter(rule => rule.classification === "artifact-bearing")),
    advisoryRules: Object.freeze(rules.filter(rule => rule.classification === "advisory")),
    byId: Object.freeze(byId),
    findings: Object.freeze(findings),
  });
}

export function resolveRuleId(ruleIndex, anchor, pattern, fallback = `${anchor}#1`) {
  const matches = (ruleIndex?.rules || []).filter(rule => (
    rule.anchor === anchor && pattern.test(rule.ruleText)
  ));
  return matches.length === 1 ? matches[0].id : fallback;
}

function parseDirective(line) {
  const match = line.match(DIRECTIVE_PREFIX);
  if (!match) {
    const plain = line.match(PLAIN_DIRECTIVE);
    if (!plain) return null;
    return Object.freeze({
      classifications: Object.freeze([]),
      authoredRuleId: null,
      ruleText: plain[1].trim(),
      source: "directive",
    });
  }
  return Object.freeze({
    classifications: Object.freeze([...match[1].matchAll(CLASSIFICATION_MARKER)].map(marker => marker[1])),
    authoredRuleId: null,
    ruleText: match[2].trim(),
    source: "directive",
  });
}

function parsedTableRules(section) {
  const rules = new Map();
  for (let offset = 1; offset < section.lines.length - 1; offset += 1) {
    const header = tableCells(section.lines[offset]);
    const separator = tableCells(section.lines[offset + 1]);
    if (header.length === 0 || !isSeparator(separator, header.length)) continue;

    const normalizedHeaders = header.map(normalizeHeader);
    const classIndex = normalizedHeaders.findIndex(value => value === "class" || value === "classification");
    const ruleIdIndex = normalizedHeaders.findIndex(value => value === "rule id" || value === "ruleid");

    for (let rowOffset = offset + 2; rowOffset < section.lines.length; rowOffset += 1) {
      const cells = tableCells(section.lines[rowOffset]);
      if (cells.length === 0) break;
      if (isSeparator(cells, header.length)) continue;

      const classCell = classIndex < 0 ? "" : cells[classIndex] || "";
      const classifications = CLASSIFICATIONS.filter(value => containsClassification(classCell, value));
      const authoredRuleId = ruleIdIndex < 0 ? null : normalizeRuleId(cells[ruleIdIndex]);
      const ruleText = cells
        .filter((_cell, index) => index !== classIndex && index !== ruleIdIndex)
        .join(" | ")
        .trim();
      rules.set(rowOffset, Object.freeze({
        classifications: Object.freeze(classifications),
        authoredRuleId,
        ruleText,
        source: "table-row",
      }));
    }
  }
  return rules;
}

function containsClassification(cell, classification) {
  const tokens = String(cell).toLowerCase().match(/[a-z]+(?:-[a-z]+)*/gu) || [];
  return tokens.includes(classification);
}

function isSeparator(cells, expectedLength) {
  return cells.length === expectedLength && cells.every(cell => /^:?-{3,}:?$/u.test(cell));
}

function normalizeHeader(value) {
  return String(value).replace(/[`_*]/gu, "").trim().toLowerCase().replace(/[_-]+/gu, " ").replace(/\s+/gu, " ");
}

function normalizeRuleId(value) {
  const candidate = String(value).replace(/[`*_]/gu, "").trim();
  return /^[a-z0-9-]+#\d+$/u.test(candidate) ? candidate : candidate || null;
}

function issue(document, rule, code, message) {
  return finding({
    ruleId: rule.id,
    type: "unimplemented-guideline",
    severity: "major",
    path: document.sourcePath,
    line: rule.line,
    message: `${code}: ${message}`,
  });
}

export { CLASSIFICATIONS };
