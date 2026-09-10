#!/usr/bin/env node
// Verify the imported immutable corpus against its source-bound migration inventory.
import { createHash } from 'node:crypto';
import { readFileSync, lstatSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const MANIFEST_PATH = 'todo/migration-agentic-canvas-os.json';
export const MANIFEST_SHA256 = '653ab164ba373a65e3112be0bf945704e70ec3568275284f7f047001e4f450dc';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export function validatePlanningMigration(repository = ROOT) {
  const failures = [];
  try {
    const manifestBytes = readFileSync(path.join(repository, MANIFEST_PATH));
    if (createHash('sha256').update(manifestBytes).digest('hex') !== MANIFEST_SHA256)
      throw new Error('provenance manifest changed');
    const manifest = JSON.parse(manifestBytes.toString('utf8'));
    if (manifest.schema !== 'workspace-planning-migration/v1'
      || manifest.sourceRepository !== 'github.com/huijoohwee/agentic-canvas-os'
      || manifest.targetRepository !== 'github.com/huijoohwee/huijoohwee.github.io'
      || !/^[a-f0-9]{40}$/.test(manifest.sourceRevision) || !Array.isArray(manifest.entries)) {
      throw new Error('invalid migration identity');
    }
    const seen = new Set();
    for (const entry of manifest.entries) {
      if (typeof entry.path !== 'string' || path.isAbsolute(entry.path)
        || entry.path.split('/').some(part => !part || part === '..' || part === '.')
        || entry.path.includes('\\') || seen.has(entry.path)
        || !/^[a-f0-9]{40}$/.test(entry.sourceBlob) || !/^[a-f0-9]{64}$/.test(entry.sha256)
        || !Number.isSafeInteger(entry.bytes) || entry.bytes < 1
        || entry.preserveBytes !== entry.path.startsWith('todo/')) throw new Error('invalid migration entry');
      seen.add(entry.path);
      if (!entry.preserveBytes) continue;
      const file = path.join(repository, entry.path), stat = lstatSync(file);
      if (!stat.isFile() || stat.size !== entry.bytes) { failures.push(`${entry.path}: imported bytes changed`); continue; }
      const bytes = readFileSync(file);
      if (createHash('sha256').update(bytes).digest('hex') !== entry.sha256)
        failures.push(`${entry.path}: imported digest changed`);
      const blob = createHash('sha1').update(`blob ${bytes.length}\0`).update(bytes).digest('hex');
      if (blob !== entry.sourceBlob) failures.push(`${entry.path}: source Git blob changed`);
    }
    if (!manifest.entries.some(entry => entry.preserveBytes)) failures.push('immutable import inventory is empty');
  } catch (error) { failures.push(`planning migration: ${error.message}`); }
  return failures;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const failures = validatePlanningMigration();
  if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
  else console.log('Planning migration: imported record bytes and source Git blobs verified');
}
