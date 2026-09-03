#!/usr/bin/env node
// Moves an oversized frontmatter `mermaid:` payload into its own diagram document.
//
// The frontmatter scalar is a declared canvas ingest surface, so the payload stays a
// frontmatter scalar in the new document rather than becoming a fenced block. That keeps
// the diagram projectable while giving it its own file and its own responsibility.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dir = "guidelines";

const TARGETS = [
  {
    entry: "scaffolding-pattern-guidelines.md",
    diagram: "scaffolding-pattern-diagram.md",
    title: "Scaffolding Pattern Progression Diagram",
    caption:
      "The scaffolding progression as a phase-partitioned graph: each phase is a boundary, and each edge names the act that advances the module.",
  },
  {
    entry: "scaffolding-implementation-guidelines.md",
    diagram: "scaffolding-implementation-diagram.md",
    title: "Scaffold-to-Production Implementation Diagram",
    caption:
      "The seven implementation phases as a step-numbered graph: each phase is a boundary and each edge names the transition between numbered steps.",
  },
  {
    entry: "scaffolding-implementation-guidelines-md-slide-demo.md",
    diagram: "scaffolding-implementation-slide-diagram.md",
    title: "Scaffold-to-Production Slide Deck Diagram",
    caption:
      "The slide-deck rendering of the seven implementation phases, carrying the same phase boundaries and step transitions as the guideline diagram.",
  },
];

for (const t of TARGETS) {
  const path = join(dir, t.entry);
  const text = readFileSync(path, "utf8");
  const lines = text.split("\n");

  const fmEnd = lines.findIndex((l, i) => i > 0 && l.trim() === "---");
  if (fmEnd < 0) throw new Error(`${t.entry}: no frontmatter`);
  const fm = lines.slice(1, fmEnd);

  const mStart = fm.findIndex((l) => /^mermaid:\s*\|/.test(l));
  if (mStart < 0) {
    console.log(`${t.entry}: no frontmatter mermaid payload; skipped`);
    continue;
  }
  let mEnd = mStart + 1;
  while (mEnd < fm.length && (fm[mEnd].startsWith("  ") || fm[mEnd].trim() === "")) mEnd += 1;

  const payload = fm.slice(mStart, mEnd); // includes the `mermaid: |` line
  const keptFm = [...fm.slice(0, mStart), ...fm.slice(mEnd)].filter((l) => !/^mermaidAnchorsOnly:/.test(l));

  // The diagram document: payload stays a frontmatter scalar so the canvas still projects it.
  const diagramFm = [
    "---",
    `title: ${JSON.stringify(t.title)}`,
    'doc_type: "Diagram"',
    'version: "1.0.0"',
    'date: "2026-08-20"',
    'lang: "en-US"',
    'frontmatter_contract: "required"',
    'owner: "Technical Writer function"',
    'local_rung: "spec-complete"',
    'delivered_rung: "undocumented"',
    'lane: "authoring"',
    'universal_scope: "true"',
    `parent: ${JSON.stringify(t.entry)}`,
    'agenticOsCanvasRenderMode: "2d"',
    'agenticOsCanvas2dRenderer: "d3"',
    "surfaces:",
    '  - "2D Renderer: D3 Graph"',
    '  - "2D Renderer: Flowchart"',
    "mermaidAnchorsOnly: true",
    ...payload,
    "---",
    "",
  ].join("\n");

  const diagramBody = [
    `# ${t.title}`,
    "",
    "## Scope & Ownership",
    "",
    `This document carries one diagram and nothing else. It is the diagram owner for [${t.entry}](./${t.entry}), which keeps the prose guidance.`,
    "",
    "The payload stays a frontmatter scalar because that is a declared canvas ingest surface; moving it into a fenced block would change how the surface reads it. See the [Diagram Canvas-Render Contract](./prd-tad-adr-diagram-canvas-render.companion.md) for the ingest-surface rules and the [Diagram Guidelines](./prd-tad-adr-diagram-guidelines.companion.md) for the identity and labelling rules.",
    "",
    "---",
    "",
    "## Diagram",
    "",
    `**Diagram** · Class: Component topology · Notation: frontmatter mermaid scalar · Surface: \`2D Renderer: D3 Graph\` · Version: 1`,
    `**Caption**: ${t.caption}`,
    "",
    "**Named check**: `node scripts/check-diagram-canvas-render.mjs guidelines` (parse-only, zero model calls)",
    "",
    "The projected node, edge, and cluster counts are reported by that check. A claim that this diagram renders, made without those counts, is a `render-proof-absent` finding under the canvas-render contract.",
    "",
  ].join("\n");

  if (existsSync(join(dir, t.diagram))) throw new Error(`${t.diagram} already exists`);
  writeFileSync(join(dir, t.diagram), diagramFm + diagramBody);

  const pointer = [
    "",
    `> **Diagram**: this guideline's phase diagram is owned by [${t.title}](./${t.diagram}). It is kept in its own document so the diagram payload does not load with every read of this guideline.`,
    "",
  ];

  const rest = lines.slice(fmEnd + 1);
  const out = ["---", ...keptFm, "---", ...pointer, ...rest].join("\n");
  writeFileSync(path, out);

  console.log(
    `${t.entry}: moved ${mEnd - mStart - 1} diagram lines -> ${t.diagram}; entry now ${out.split("\n").length} lines`,
  );
}
