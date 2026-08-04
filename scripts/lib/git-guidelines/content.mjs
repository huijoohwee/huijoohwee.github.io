import path from "node:path";

export function parseDocument(text, sourcePath = "git-guidelines.md") {
  const lines = String(text).replace(/\r\n?/gu, "\n").split("\n");
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
  if (!/^\|.*\|\s*$/u.test(line)) return [];
  return line.slice(1, line.lastIndexOf("|")).split("|").map(cell => cell.trim());
}

export function tableRows(section) {
  if (!section) return [];
  return section.lines.flatMap((line, offset) => {
    const cells = tableCells(line);
    if (cells.length === 0 || cells.every(cell => /^:?-{3,}:?$/u.test(cell))) return [];
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

export function finding({ ruleId, type, severity = "blocker", path: findingPath, line = 1, column = 1, message }) {
  return Object.freeze({
    ruleId,
    type,
    severity,
    location: Object.freeze({ path: findingPath, line, column }),
    message,
    repeatCount: 1,
  });
}

export function checkContentContract(document, ruleIndex) {
  const findings = [];
  const required = [
    "`claim(scope)`", "`continue(claim)`", "`integrate(candidate)`", "`retire(claim)`",
    "unlimited current disjoint authorities", "exactly one current authority per overlap", "non-writing waiting successors",
    "`dormant-preserved`", "independent of the expired local lease", "monotonic CAS", "agentic-collaboration-claim-receipt/v1",
    "dependency-ordered group of immutable per-repository work units", "repository, branch, worktree, scope, claim, epoch, fence, PR/review identity, checks, and handoff evidence",
    "Orchestrator, Implementer, Evaluator, and Operator", "`canonical`", "`overlapping`", "`disjoint-attributed`", "`ambiguous`",
    "24 hours", "agentic-declared-write-scope/v1", "agentic-change-manifest/v1",
  ];
  for (const phrase of required) {
    if (document.text.includes(phrase)) continue;
    findings.push(finding({
      ruleId: ruleIndex.artifactRules[0]?.id || "lane-topology--admission#1",
      type: "unimplemented-guideline", severity: "major", path: document.sourcePath,
      message: `Required git-guidelines contract phrase is absent: ${phrase}`,
    }));
  }
  if (!/\[yjs\/yjs\]\(https:\/\/github\.com\/yjs\/yjs\)/u.test(document.text)
    || !/Forbid copied code, prose, schema, tests, examples, algorithms, names, dependencies, imports/iu.test(document.text)) {
    findings.push(finding({ ruleId: "lane-topology--admission#13", type: "vendor-coupling", severity: "major", path: document.sourcePath, message: "The yjs inspiration boundary must be linked and explicitly no-copy/no-dependency." }));
  }
  if (/maximum (?:of )?8 concurrent|at most 8 concurrent/iu.test(document.text)) {
    findings.push(finding({ ruleId: "lane-topology--admission#7", type: "concurrent-write-conflict", path: document.sourcePath, message: "A fixed concurrency cardinality contradicts unlimited disjoint authority." }));
  }
  return findings;
}
