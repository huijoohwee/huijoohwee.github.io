// Reusable guideline splitter.
//
// Extracts whole `##` sections from an entry document into modules, then replaces each
// moved section with a delegating stub so its anchor keeps resolving. Fence-aware, so a
// `##` inside a fenced template block is never mistaken for a section boundary.

import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

export const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9 \-]/g, "")
    .replace(/ /g, "-");

export function readDoc(dir, name) {
  const text = readFileSync(join(dir, name), "utf8");
  const lines = text.split("\n");
  const fm = /^---\n([\s\S]*?)\n---\n/.exec(text);
  const fmLines = fm ? fm[0].split("\n").length - 1 : 0;
  return { text, lines, fmLines, frontmatter: fm ? fm[1] : "" };
}

export function sectionMap(lines) {
  const secs = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i += 1) {
    if (/^\s*(```|~~~)/.test(lines[i])) {
      inFence = !inFence;
      continue;
    }
    if (!inFence && lines[i].startsWith("## ")) {
      secs.push({ start: i, title: lines[i].slice(3).trim() });
    }
  }
  for (let i = 0; i < secs.length; i += 1) {
    secs[i].end = i + 1 < secs.length ? secs[i + 1].start - 1 : lines.length - 1;
  }
  return secs;
}

function moduleFrontmatter({ title, parentTitle, extraKeys = {} }) {
  const keys = {
    title: JSON.stringify(title),
    doc_type: '"Guidelines Module"',
    version: '"1.0.0"',
    date: '"2026-08-20"',
    lang: '"en-US"',
    frontmatter_contract: '"required"',
    owner: '"Technical Writer function"',
    local_rung: '"spec-complete"',
    delivered_rung: '"undocumented"',
    lane: '"authoring"',
    universal_scope: '"true"',
    parent: JSON.stringify(parentTitle),
    parent_version: '"1.0.0"',
    ...extraKeys,
  };
  return ["---", ...Object.entries(keys).map(([k, v]) => `${k}: ${v}`), "---", ""].join("\n");
}

/**
 * @param {object} opts
 * @param {string} opts.dir            guidelines directory
 * @param {string} opts.entry          entry document file name
 * @param {string} opts.parentTitle    human title of the entry document
 * @param {Array<{file:string,title:string,intro:string,sections:string[]}>} opts.modules
 * @param {(mod:{file:string,title:string}) => string} [opts.stubText]
 */
export function splitGuideline({ dir, entry, parentTitle, modules, stubNote }) {
  const doc = readDoc(dir, entry);
  const lines = [...doc.lines];
  const secs = sectionMap(lines);
  const byTitle = new Map(secs.map((s) => [s.title, s]));

  // Refuse to run against an already-split entry document. Without this guard a re-run
  // extracts the delegating stubs into the modules and destroys the moved content.
  if (/^Owned by \[/m.test(doc.text)) {
    throw new Error(`${entry}: already split (delegating stub found) - refusing to re-split`);
  }

  const moved = [];
  for (const mod of modules) {
    const bodies = [];
    for (const title of mod.sections) {
      const sec = byTitle.get(title);
      if (!sec) throw new Error(`${entry}: section "${title}" not found`);
      const body = lines.slice(sec.start, sec.end + 1).join("\n").replace(/\s+$/, "");
      const payload = body.split("\n").slice(1).join("\n").trim();
      if (!payload) throw new Error(`${entry}: section "${title}" is empty - refusing to move an empty section`);
      bodies.push(body);
      moved.push({ sec, mod });
    }
    const out =
      moduleFrontmatter({ title: mod.title, parentTitle }) +
      `\n# ${mod.title}\n\n## Scope & Ownership\n\n${mod.intro}\n\n` +
      `This module is loaded on demand from [${parentTitle}](./${entry}), which keeps the binding rules and the index. ` +
      `It carries one responsibility and stays under the 600-line file budget.\n\n---\n\n` +
      bodies.join("\n\n---\n\n") +
      "\n";
    writeFileSync(join(dir, mod.file), out);
  }

  // Replace moved sections with stubs, bottom-up so earlier indices stay valid.
  moved.sort((a, b) => b.sec.start - a.sec.start);
  for (const { sec, mod } of moved) {
    const stub = [
      `## ${sec.title}`,
      "",
      `Owned by [${mod.title}](./${mod.file}). ${stubNote || "Loaded on demand; this entry keeps the anchor stable for inbound references."}`,
      "",
    ];
    lines.splice(sec.start, sec.end - sec.start + 1, ...stub);
  }

  writeFileSync(join(dir, entry), normalise(lines).join("\n"));

  return {
    entry,
    entryLines: normalise(lines).length,
    modules: modules.map((m) => ({
      file: m.file,
      lines: readFileSync(join(dir, m.file), "utf8").split("\n").length,
    })),
  };
}

function normalise(lines) {
  const out = [];
  for (const l of lines) {
    if (l.trim() === "" && out.length >= 2 && out[out.length - 1].trim() === "" && out[out.length - 2].trim() === "") {
      continue;
    }
    out.push(l);
  }
  while (out.length && out[out.length - 1].trim() === "") out.pop();
  out.push("");
  return out;
}
