#!/usr/bin/env node
// Splits an oversized frontmatter diagram into an overview plus one document per boundary,
// and normalises it to the portable intersection: labelled edges and no cluster-projecting
// shapes on non-cluster nodes.
//
// Rationale: the diagram companion's complexity budget caps a diagram at 20 nodes and 30
// edges. A 200-node diagram is not a diagram, it is a database with a layout engine. The
// subgraph boundaries are the decomposition the budget asks for.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dir = "guidelines";

const TARGETS = [
  { entry: "scaffolding-implementation-diagram.md", stem: "scaffolding-implementation-diagram", title: "Scaffold-to-Production Implementation Diagram" },
  { entry: "scaffolding-implementation-slide-diagram.md", stem: "scaffolding-implementation-slide-diagram", title: "Scaffold-to-Production Slide Deck Diagram" },
  { entry: "scaffolding-pattern-diagram.md", stem: "scaffolding-pattern-diagram", title: "Scaffolding Pattern Progression Diagram" },
];

// Every edge in these diagrams is one of two relations. Naming them is what makes the
// diagram queryable rather than merely drawable.
function labelEdge(line, intraBoundary) {
  if (/\|/.test(line)) return line; // already labelled
  const rel = intraBoundary ? "advances to" : "phase complete";
  return line.replace(/(-{2,}>|-\.->|={2,}>)/, `-->|"${rel}"|`).replace(/-->\|/, "-->|");
}

function normaliseNodeShapes(line) {
  // `X([label])` and `X((label))` project as cluster primitives; use a rectangle.
  return line
    .replace(/([A-Za-z_]\w*)\(\[([^\]]*)\]\)/g, (_m, k, l) => `${k}["${l.replace(/"/g, "'")}"]`)
    .replace(/([A-Za-z_]\w*)\(\(([^)]*)\)\)/g, (_m, k, l) => `${k}["${l.replace(/"/g, "'")}"]`);
}

function quoteBareLabel(line) {
  // `X[1.1.0 Create Module File]` -> `X["1.1.0 Create Module File"]` so reserved
  // punctuation inside a label cannot break a strict parser.
  return line.replace(/([A-Za-z_]\w*)\[(?!")([^\]]+)\]/g, (_m, k, l) => `${k}["${l.replace(/"/g, "'")}"]`);
}

function readPayload(text) {
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(text);
  const lines = fm[1].split("\n");
  const start = lines.findIndex((l) => /^mermaid:\s*\|/.test(l));
  const body = [];
  let i = start + 1;
  for (; i < lines.length; i += 1) {
    if (lines[i].trim() !== "" && !/^\s{2}/.test(lines[i])) break;
    body.push(lines[i].replace(/^ {2}/, ""));
  }
  return { fmLines: lines, start, end: i, payload: body, header: fm[0] };
}

function parse(payload) {
  const boundaries = [];
  const topEdges = [];
  let current = null;
  for (const raw of payload) {
    const line = raw.replace(/\s+$/, "");
    if (!line.trim()) continue;
    const sub = /^\s*subgraph\s+([A-Za-z_]\w*)\s*\[\s*"?(.*?)"?\s*\]\s*$/.exec(line);
    if (sub) {
      current = { key: sub[1], label: sub[2], lines: [] };
      boundaries.push(current);
      continue;
    }
    if (/^\s*end\s*$/.test(line)) {
      current = null;
      continue;
    }
    if (/^\s*(graph|flowchart)\b/.test(line)) continue;
    if (current) current.lines.push(line.trim());
    else topEdges.push(line.trim());
  }
  return { boundaries, topEdges };
}

const FM = (title, parent, extra = []) =>
  [
    "---",
    `title: ${JSON.stringify(title)}`,
    'doc_type: "Diagram"',
    'version: "2.0.0"',
    'date: "2026-08-20"',
    'lang: "en-US"',
    'frontmatter_contract: "required"',
    'owner: "Technical Writer function"',
    'local_rung: "spec-complete"',
    'delivered_rung: "undocumented"',
    'lane: "authoring"',
    'universal_scope: "true"',
    `parent: ${JSON.stringify(parent)}`,
    'agenticOsCanvasRenderMode: "2d"',
    'agenticOsCanvas2dRenderer: "d3"',
    "surfaces:",
    '  - "2D Renderer: D3 Graph"',
    '  - "2D Renderer: Flowchart"',
    "mermaidAnchorsOnly: true",
    ...extra,
    "---",
    "",
  ].join("\n");

for (const t of TARGETS) {
  const path = join(dir, t.entry);
  const text = readFileSync(path, "utf8");
  const { payload } = readPayload(text);
  const { boundaries, topEdges } = parse(payload);

  if (boundaries.length === 0) {
    console.log(`${t.entry}: no boundaries; skipped`);
    continue;
  }

  // ---- per-boundary detail documents
  const detailFiles = [];
  boundaries.forEach((b, idx) => {
    const num = String(idx + 1).padStart(2, "0");
    const file = `${t.stem}-${num}-${b.key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.md`;
    const body = b.lines
      .filter((l) => !/^direction\b/.test(l))
      .map((l) => labelEdge(quoteBareLabel(normaliseNodeShapes(l)), true));
    const mermaid = ["mermaid: |", "  flowchart TB", ...body.map((l) => `  ${l}`)];
    const title = `${t.title} — ${b.label}`;
    const out =
      FM(title, t.entry, mermaid) +
      [
        `# ${title}`,
        "",
        `One boundary of [${t.title}](./${t.entry}), split out because the combined diagram exceeded the complexity budget.`,
        "",
        `**Diagram** · Class: Component topology · Notation: frontmatter mermaid scalar, \`flowchart TB\` · Surface: \`2D Renderer: D3 Graph\` · Version: 2`,
        `**Caption**: ${b.label} — its numbered steps and the transitions between them.`,
        "",
        "**Named check**: `node scripts/check-diagram-canvas-render.mjs guidelines`",
        "",
      ].join("\n");
    if (!existsSync(join(dir, file))) writeFileSync(join(dir, file), out);
    detailFiles.push({ file, label: b.label, nodes: body.filter((l) => /\[/.test(l) && !/-->/.test(l)).length });
  });

  // ---- overview document replaces the original payload
  const overviewNodes = boundaries.map(
    (b) => `  ${b.key}["${b.label.replace(/"/g, "'")}"]`,
  );
  const overviewEdges = [];
  for (let i = 0; i < boundaries.length - 1; i += 1) {
    overviewEdges.push(`  ${boundaries[i].key} -->|"phase complete"| ${boundaries[i + 1].key}`);
  }
  const entryEdges = topEdges
    .map((l) => labelEdge(quoteBareLabel(normaliseNodeShapes(l)), false))
    .filter((l) => /-->/.test(l))
    .map((l) => `  ${l}`);

  const mermaid = ["mermaid: |", "  flowchart TB", ...overviewNodes, ...overviewEdges, ...entryEdges];
  const overview =
    FM(t.title, t.entry, mermaid) +
    [
      `# ${t.title}`,
      "",
      "## Scope & Ownership",
      "",
      "This document owns the **overview** only: one node per phase boundary, with the transitions between them. Each boundary's numbered steps live in their own document, listed below.",
      "",
      "The combined diagram carried 200+ nodes in a single graph, roughly ten times the 20-node hard ceiling in the [Diagram Guidelines](./prd-tad-adr-diagram-guidelines.companion.md) complexity budget. That budget requires a parent overview plus per-boundary detail diagrams, which is the decomposition applied here.",
      "",
      "---",
      "",
      "## Diagram",
      "",
      `**Diagram** · Class: Component topology · Notation: frontmatter mermaid scalar, \`flowchart TB\` · Surface: \`2D Renderer: D3 Graph\` · Version: 2`,
      "**Caption**: The phase sequence at a glance; each node expands to its own detail document.",
      "",
      "**Named check**: `node scripts/check-diagram-canvas-render.mjs guidelines` (parse-only, zero model calls)",
      "",
      "---",
      "",
      "## Detail Diagrams",
      "",
      "| Boundary | Document |",
      "|---|---|",
      ...detailFiles.map((d) => `| ${d.label} | [${d.file}](./${d.file}) |`),
      "",
    ].join("\n");

  writeFileSync(path, overview);
  console.log(`${t.entry}: overview ${overview.split("\n").length} lines + ${detailFiles.length} detail documents`);
}
