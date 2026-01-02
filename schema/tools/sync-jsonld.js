#!/usr/bin/env node
/**
 * JSON-LD Schema Synchronization
 * - Sorts schema files by `@id` (A->Z)
 * - Alphabetically sorts object keys for consistency
 * - Compares @id coverage between schema repo and project repo(s)
 * - Writes a sync report with alignment ratios
 */

const fs = require('fs');
const path = require('path');

const schemaRoot = path.resolve(__dirname, '..');
const projectRoots = [
  path.resolve('/Users/huijoohwee/Documents/GitHub/airvio/prjt0000-wbstcnvs'),
  path.resolve('/Users/huijoohwee/Documents/GitHub/airvio/00-root'),
];

function listFiles(dir, filterExts = ['.jsonld', '.json']) {
  const out = [];
  (function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(current, e.name);
      if (e.isDirectory()) {
        walk(full);
      } else {
        const ext = path.extname(e.name).toLowerCase();
        if (filterExts.includes(ext)) out.push(full);
      }
    }
  })(dir);
  return out;
}

function sortObjectKeys(obj) {
  const sorted = {};
  for (const key of Object.keys(obj).sort()) {
    const val = obj[key];
    sorted[key] = sortJson(val);
  }
  return sorted;
}

function sortArray(arr) {
  // Prefer elements with @id and sort them A->Z first, keep non-@id afterward
  const withId = arr.filter(x => x && typeof x === 'object' && '@id' in x);
  const withoutId = arr.filter(x => !(x && typeof x === 'object' && '@id' in x));
  withId.sort((a, b) => String(a['@id']).localeCompare(String(b['@id'])));
  return [...withId.map(sortJson), ...withoutId.map(sortJson)];
}

function sortJson(data) {
  if (Array.isArray(data)) return sortArray(data);
  if (data && typeof data === 'object') return sortObjectKeys(data);
  return data;
}

function parseJsonFile(fp) {
  try {
    const raw = fs.readFileSync(fp, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function writeJsonFile(fp, obj) {
  const content = JSON.stringify(obj, null, 2) + '\n';
  fs.writeFileSync(fp, content, 'utf8');
}

function collectIdsFromJson(json) {
  const ids = new Set();
  (function walk(node) {
    if (!node) return;
    if (Array.isArray(node)) {
      for (const item of node) walk(item);
    } else if (typeof node === 'object') {
      if (node['@id']) ids.add(String(node['@id']));
      for (const k of Object.keys(node)) walk(node[k]);
    }
  })(json);
  return ids;
}

function uniqueUnion(setA, setB) {
  const out = new Set();
  for (const v of setA) out.add(v);
  for (const v of setB) out.add(v);
  return out;
}

function intersection(setA, setB) {
  const out = new Set();
  for (const v of setA) if (setB.has(v)) out.add(v);
  return out;
}

function percent(n, d) {
  if (d === 0) return 100;
  return Math.round((n / d) * 10000) / 100;
}

function main() {
  // 1) Sort schema files by @id and keys
  const schemaFiles = listFiles(schemaRoot);
  let sortedCount = 0;
  let errorCount = 0;
  const schemaIds = new Set();

  for (const fp of schemaFiles) {
    const json = parseJsonFile(fp);
    if (!json) { errorCount++; continue; }
    const sorted = sortJson(json);
    try { writeJsonFile(fp, sorted); sortedCount++; } catch { errorCount++; }
    for (const id of collectIdsFromJson(sorted)) schemaIds.add(id);
  }

  // 2) Collect project ids
  let projectIds = new Set();
  for (const root of projectRoots) {
    const files = listFiles(root, ['.jsonld', '.json']);
    for (const fp of files) {
      const json = parseJsonFile(fp);
      if (!json) continue;
      const ids = collectIdsFromJson(json);
      projectIds = uniqueUnion(projectIds, ids);
    }
  }

  // 3) Alignment metrics
  const unionIds = uniqueUnion(schemaIds, projectIds);
  const sharedIds = intersection(schemaIds, projectIds);
  const globalAlignment = percent(sharedIds.size, unionIds.size);
  const systemicAlignment = percent(sharedIds.size, projectIds.size);

  // 4) Write report
  const report = {
    timestamp: new Date().toISOString(),
    schemaRoot,
    projectRoots,
    filesProcessed: schemaFiles.length,
    filesSorted: sortedCount,
    filesErrors: errorCount,
    ids: {
      schemaCount: schemaIds.size,
      projectCount: projectIds.size,
      unionCount: unionIds.size,
      sharedCount: sharedIds.size,
    },
    alignment: {
      globalAlignmentPercent: globalAlignment,
      systemicAlignmentPercent: systemicAlignment,
      targetGlobal: '>98%',
      targetSystemic: '>98%'
    }
  };

  fs.writeFileSync(path.join(schemaRoot, 'sync-report.json'), JSON.stringify(report, null, 2) + '\n');
  const md = [
    '# JSON-LD Sync Report',
    '',
    `- Timestamp: ${report.timestamp}`,
    `- Files processed: ${report.filesProcessed}`,
    `- Files sorted: ${report.filesSorted}`,
    `- Errors: ${report.filesErrors}`,
    `- Schema @id count: ${report.ids.schemaCount}`,
    `- Project @id count: ${report.ids.projectCount}`,
    `- Shared @id count: ${report.ids.sharedCount}`,
    `- Global alignment: ${report.alignment.globalAlignmentPercent}% (target >98%)`,
    `- Systemic alignment: ${report.alignment.systemicAlignmentPercent}% (target >98%)`,
    '',
    'This report is automatically generated by tools/sync-jsonld.js.'
  ].join('\n');
  fs.writeFileSync(path.join(schemaRoot, 'sync-report.md'), md + '\n');

  console.log(md);
}

main();