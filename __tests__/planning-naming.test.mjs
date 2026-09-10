import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { checkAgenticNaming } from '../scripts/check-agentic-naming.mjs';
function fixture(t, text) {
  const root = mkdtempSync(join(tmpdir(), 'planning-naming-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  writeFileSync(join(root, 'route.md'), text);
  execFileSync('git', ['init', '-q'], { cwd: root });
  execFileSync('git', ['add', '.'], { cwd: root });
  return root;
}
test('public naming checks require no access to private planning records', t => {
  const result = checkAgenticNaming(fixture(t, 'Planning owner: huijoohwee/.todo'));
  assert.deepEqual(result.violations, []); assert.equal(result.preservedRecords, 0);
});
test('new public records still obey current naming rules', t => {
  assert.deepEqual(checkAgenticNaming(fixture(t, ['agentic', 'graph'].join(''))).violations,
    ['route.md: collapsed product namespace']);
});
