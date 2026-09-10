import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, cpSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkAgenticNaming } from '../scripts/check-agentic-naming.mjs';
import { MANIFEST_PATH } from '../scripts/planning-migration.mjs';

function fixture(t) {
  const root = mkdtempSync(join(tmpdir(), 'planning-naming-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  cpSync(new URL('../todo', import.meta.url), join(root, 'todo'), { recursive: true });
  execFileSync('git', ['init', '-q'], { cwd: root });
  execFileSync('git', ['add', 'todo'], { cwd: root });
  return root;
}

test('naming accepts the exact imported historical corpus after staging', t => {
  const result = checkAgenticNaming(fixture(t));
  assert.deepEqual(result.violations, []);
  assert.equal(result.preservedRecords, 30);
});

test('new planning records still obey current naming rules', t => {
  const root = fixture(t), relativePath = 'todo/new-record.md';
  writeFileSync(join(root, relativePath), ['agentic', 'graph'].join(''));
  execFileSync('git', ['add', relativePath], { cwd: root });
  assert.deepEqual(checkAgenticNaming(root).violations, [`${relativePath}: collapsed product namespace`]);
});

test('a historical path cannot exempt rewritten bytes from naming checks', t => {
  const root = fixture(t);
  const manifest = JSON.parse(readFileSync(join(root, MANIFEST_PATH), 'utf8'));
  const entry = manifest.entries.find(value => value.preserveBytes);
  writeFileSync(join(root, entry.path), ['agentic', 'graph'].join(''));
  assert.throws(() => checkAgenticNaming(root), /imported bytes changed/);
});
