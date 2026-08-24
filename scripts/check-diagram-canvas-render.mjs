#!/usr/bin/env node
// Named check for the diagram + canvas-render contract.
//
// Owner: guidelines/prd-tad-adr-diagram-canvas-render.companion.md
// Raises the diagram-domain and canvas-domain finding types defined there and in
// guidelines/prd-tad-adr-diagram-guidelines.companion.md. Parse-only: zero model calls.
//
// Usage: node scripts/check-diagram-canvas-render.mjs [path ...]
//   A path may be a file or a directory; directories are scanned for *.md.
//   Exits 0 only when no finding is raised.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const PROJECTING_KINDS = new Set(["flowchart"]);
const KNOWN_KINDS = new Set([
  "flowchart",
  "gitgraph",
  "gantt",
  "timeline",
  "architecture",
  "eventmodeling",
  "sequencediagram",
  "statediagram",
  "erdiagram",
  "classdiagram",
  "journey",
  "pie",
  "quadrantchart",
  "mindmap",
  "block",
  "sankey",
  "xychart",
  "requirementdiagram",
]);

const DIRECTIONS = new Set(["TB", "TD", "BT", "LR", "RL"]);

function readKind(code) {
  for (const raw of code.split("\n")) {
    const line = raw.trim();
    if (!line || line.startsWith("%%")) continue;
    if (line === "---") continue;
    const head = line.toLowerCase();
    if (/^(graph|flowchart)\b/.test(head)) return "flowchart";
    const word = head.split(/[\s:{(-]/)[0];
    if (KNOWN_KINDS.has(word)) return word;
    return word || "unknown";
  }
  return "unknown";
}

// The frontmatter `mermaid:` scalar is a declared ingest surface, so it is checked too.
function collectFrontmatterMermaid(text) {
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!fm) return null;
  const lines = fm[1].split("\n");
  const start = lines.findIndex((l) => /^mermaid:\s*[|>]/.test(l));
  if (start === -1) return null;
  const body = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    if (lines[i].trim() !== "" && !/^\s{2}/.test(lines[i])) break;
    body.push(lines[i].replace(/^ {2}/, ""));
  }
  return body.join("\n");
}

// The frontmatter graph envelope is a declared ingest surface, so it is counted too.
// Indentation-scoped so a nested `nodes:`/`edges:` elsewhere in frontmatter is ignored.
function collectFlowEnvelope(text) {
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!fm) return null;
  const lines = fm[1].split("\n");
  const start = lines.findIndex((l) => /^flow:\s*$/.test(l));
  if (start === -1) return null;
  let section = null;
  const counts = { nodes: 0, edges: 0, clusters: 0 };
  const ids = new Set();
  const endpoints = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^\S/.test(line)) break; // left the flow block
    const key = /^\s{2}(\w+):\s*$/.exec(line);
    if (key) {
      section = ["nodes", "edges", "connections"].includes(key[1]) ? key[1] : null;
      continue;
    }
    if (!section) continue;
    if (/^\s{4}-\s/.test(line)) {
      if (section === "nodes") counts.nodes += 1;
      else counts.edges += 1;
    }
    const idm = /^\s+(?:-\s+)?id:.*?value:\s*"([^"]+)"/.exec(line);
    if (idm && section === "nodes") ids.add(idm[1]);
    const em = /^\s+(source|target):.*?value:\s*"([^"]+)"/.exec(line);
    if (em) endpoints.push(em[2]);
    const kind = /^\s+kind:.*?value:\s*"(cluster|subgraph)"/.exec(line);
    if (kind) counts.clusters += 1;
  }
  const dangling = [...new Set(endpoints.filter((e) => !ids.has(e)))];
  return { counts, dangling };
}

function collectBlocks(text) {
  const blocks = [];
  const lines = text.split("\n");
  let open = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const fence = /^\s*```(\w*)\s*$/.exec(line);
    if (!fence) continue;
    if (open === null) {
      if (fence[1] === "mermaid" || fence[1] === "mmd") open = { lang: fence[1], start: i + 1 };
      else open = { lang: fence[1] || "plain", start: i + 1, ignore: true };
    } else {
      if (!open.ignore) {
        blocks.push({ startLine: open.start + 1, code: lines.slice(open.start, i).join("\n") });
      }
      open = null;
    }
  }
  return blocks;
}

function analyseFlowchart(code) {
  const findings = [];
  const lines = code.split("\n");
  const declared = new Set();
  const clusters = [];
  const edges = [];

  const firstMeaningful = lines.map((l) => l.trim()).find((l) => l && !l.startsWith("%%")) || "";
  const dirMatch = /^(?:graph|flowchart)\s+([A-Za-z]{2})\b/.exec(firstMeaningful);
  if (!dirMatch || !DIRECTIONS.has(dirMatch[1].toUpperCase())) {
    findings.push(["missing-explicit-direction", firstMeaningful || "(empty declaration)"]);
  }

  if (code.includes("\\n")) findings.push(["unparseable-diagram", "literal \\n inside a label; use <br/>"]);

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("%%")) continue;

    const sub = /^subgraph\b(.*)$/.exec(line);
    if (sub) {
      const rest = sub[1].trim();
      const named = /^[A-Za-z_]\w*\s*\[\s*"/.test(rest);
      if (!named) findings.push(["boundary-subgraph-missing", `subgraph ${rest || "(unnamed)"}`]);
      else clusters.push(rest.split(/\s*\[/)[0]);
      continue;
    }
    if (/^(end|classDef|class|style|linkStyle|click|direction|accTitle|accDescr)\b/.test(line)) continue;

    // bracketed placeholder used as a node key, e.g. [NodeA]([Component])
    if (/(^|\s)\[[A-Za-z][\w .-]*\]\s*[([{]/.test(line)) {
      findings.push(["unparseable-diagram", `bracketed node key: ${line}`]);
    }

    // node declarations
    const nodeRe = /(^|[\s|>])([A-Za-z_]\w*)\s*(\[\[|\[\(|\(\(|\(\[|\[|\(|\{\{|\{|>)/g;
    let m;
    while ((m = nodeRe.exec(line)) !== null) {
      const key = m[2];
      const open = m[3];
      declared.add(key);
      if (open === "([" || open === "((") {
        findings.push([
          "shape-primitive-mismatch",
          `${key} uses a circle/stadium shape, which projects as a cluster primitive`,
        ]);
      }
    }

    // edges. Two labelled forms exist: the canonical inline `|label|` and the tolerated
    // mid-arrow alias `A -- label --> B`. Both carry a label; only the canonical form is
    // guaranteed to survive every consumer, so the alias is a distinct, lesser finding.
    const aliasRe = /([A-Za-z_]\w*)\s*(?:-{2}|={2})\s*([^->=|]+?)\s*(?:-{2,}>|={2,}>)\s*([A-Za-z_]\w*)/g;
    const aliasSpans = [];
    while ((m = aliasRe.exec(line)) !== null) {
      const [, src, label, tgt] = m;
      aliasSpans.push([m.index, m.index + m[0].length]);
      edges.push({ src, tgt, label: label.trim(), line });
      declared.add(src);
      declared.add(tgt);
      findings.push(["non-canonical-edge-label", `${line}  (use |"${label.trim()}"| form)`]);
    }

    const edgeRe = /([A-Za-z_]\w*)\s*(-{2,}>|-{3,}|-\.-+>|={2,}>|-{2,}o|-{2,}x)\s*(\|[^|]*\|)?\s*([A-Za-z_]\w*)/g;
    while ((m = edgeRe.exec(line)) !== null) {
      if (aliasSpans.some(([s, e]) => m.index >= s && m.index < e)) continue;
      const [, src, , label, tgt] = m;
      edges.push({ src, tgt, label: label || "", line });
      if (!label || !label.replace(/\|/g, "").trim()) {
        findings.push(["unlabelled-edge", line]);
      }
      declared.add(src);
      declared.add(tgt);
    }
  }

  const clusterSet = new Set(clusters);
  const nodes = [...declared].filter((n) => !clusterSet.has(n));

  // Complexity budget. A leaf detail diagram (no boundaries of its own) gets the higher
  // leaf cap, because the "split on the next boundary" escape does not exist inside a leaf.
  const isLeaf = clusterSet.size === 0;
  const nodeCap = isLeaf ? 40 : 20;
  if (nodes.length > nodeCap) {
    findings.push([
      "diagram-complexity-overflow",
      `${nodes.length} nodes exceeds the ${isLeaf ? "leaf" : "hard"} ceiling of ${nodeCap}`,
    ]);
  }
  const edgeCap = isLeaf ? 60 : 30;
  if (edges.length > edgeCap) {
    findings.push(["diagram-complexity-overflow", `${edges.length} edges exceeds the ceiling of ${edgeCap}`]);
  }
  for (const e of edges) {
    for (const end of [e.src, e.tgt]) {
      if (!declared.has(end) && !clusterSet.has(end)) {
        findings.push(["unresolvable-reference", `edge endpoint ${end} is not a declared node: ${e.line}`]);
      }
    }
  }

  return { findings, counts: { nodes: nodes.length, edges: edges.length, clusters: clusterSet.size } };
}

function walk(target, acc) {
  const st = statSync(target);
  if (st.isDirectory()) {
    for (const entry of readdirSync(target)) {
      if (entry === "node_modules" || entry.startsWith(".")) continue;
      walk(join(target, entry), acc);
    }
  } else if (target.endsWith(".md")) acc.push(target);
  return acc;
}

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error("usage: node scripts/check-diagram-canvas-render.mjs [path ...]");
  process.exit(2);
}

const files = [];
for (const t of targets) walk(t, files);
files.sort();

const findings = [];
const register = [];
let blockCount = 0;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const rel = relative(process.cwd(), file);

  const fmDiagram = collectFrontmatterMermaid(text);
  if (fmDiagram) {
    blockCount += 1;
    const id = `${rel}:frontmatter-mermaid`;
    const kind = readKind(fmDiagram);
    if (PROJECTING_KINDS.has(kind)) {
      const { findings: f, counts } = analyseFlowchart(fmDiagram);
      for (const [type, evidence] of f) findings.push({ type, artifact: id, evidence });
      register.push({ id, kind, projects: true, ...counts });
    } else {
      register.push({ id, kind, projects: false, nodes: 0, edges: 0, clusters: 0 });
    }
  }

  const envelope = collectFlowEnvelope(text);
  if (envelope) {
    blockCount += 1;
    const id = `${rel}:frontmatter-flow`;
    for (const end of envelope.dangling) {
      findings.push({
        type: "unresolvable-reference",
        artifact: id,
        evidence: `flow connection endpoint ${end} is not a declared flow node`,
      });
    }
    register.push({ id, kind: "flow-envelope", projects: true, ...envelope.counts });
  }

  const blocks = collectBlocks(text);
  for (const block of blocks) {
    blockCount += 1;
    const kind = readKind(block.code);
    const id = `${rel}:${block.startLine}`;
    if (kind === "unknown") {
      findings.push({ type: "unclassed-diagram", artifact: id, evidence: "no recognised diagram declaration" });
      continue;
    }
    if (!PROJECTING_KINDS.has(kind)) {
      register.push({ id, kind, projects: false, nodes: 0, edges: 0, clusters: 0 });
      continue;
    }
    const { findings: f, counts } = analyseFlowchart(block.code);
    for (const [type, evidence] of f) findings.push({ type, artifact: id, evidence });
    register.push({ id, kind, projects: true, ...counts });
  }
}

// deterministic order: severity-free sort on (type, artifact, evidence)
findings.sort(
  (a, b) => a.type.localeCompare(b.type) || a.artifact.localeCompare(b.artifact) || a.evidence.localeCompare(b.evidence),
);

const byType = new Map();
for (const f of findings) byType.set(f.type, (byType.get(f.type) || 0) + 1);

for (const f of findings) {
  console.log(`${f.type}  ${f.artifact}  ${f.evidence}`);
}

const projecting = register.filter((r) => r.projects);
const totals = projecting.reduce(
  (a, r) => ({ nodes: a.nodes + r.nodes, edges: a.edges + r.edges, clusters: a.clusters + r.clusters }),
  { nodes: 0, edges: 0, clusters: 0 },
);

console.log(
  `\ndiagram canvas-render check: ${files.length} files, ${blockCount} diagrams ` +
    `(${projecting.length} projecting, ${register.length - projecting.length} non-projecting); ` +
    `projected ${totals.nodes} nodes, ${totals.edges} edges, ${totals.clusters} clusters; ` +
    `cost 0 prompt + 0 completion tokens`,
);

if (process.env.DIAGRAM_REGISTER === "1") {
  for (const r of register) {
    console.log(`register  ${r.id}  ${r.kind}  projects=${r.projects}  n=${r.nodes} e=${r.edges} c=${r.clusters}`);
  }
}

if (findings.length > 0) {
  console.error(`\n${findings.length} finding(s): ${[...byType].map(([t, n]) => `${t}=${n}`).join(", ")}`);
  process.exit(1);
}
console.log("no findings");
