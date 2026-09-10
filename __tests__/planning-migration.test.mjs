import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, cpSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validatePlanningMigration, MANIFEST_PATH } from '../scripts/planning-migration.mjs';

test('all imported planning records retain exact source bytes and Git blob identities', () => {
  assert.deepEqual(validatePlanningMigration(), []);
});
test('record rewrites and missing provenance fail verification', t => {
  const root = mkdtempSync(join(tmpdir(), 'planning-import-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(new URL('../todo', import.meta.url), join(root, 'todo'), { recursive: true });
  const manifest = JSON.parse(readFileSync(join(root, MANIFEST_PATH), 'utf8'));
  const record = manifest.entries.find(entry => entry.preserveBytes);
  writeFileSync(join(root, record.path), 'overwritten');
  assert(validatePlanningMigration(root).some(message => message.includes('imported bytes changed')));
  manifest.entries = [];
  writeFileSync(join(root, MANIFEST_PATH), JSON.stringify(manifest));
  assert(validatePlanningMigration(root).some(message => message.includes('provenance manifest changed')));
});
