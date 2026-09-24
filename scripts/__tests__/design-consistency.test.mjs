import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateDesignConsistency } from '../lib/design-consistency.mjs';

const root = new URL('../../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
test('native design record resolves through one joined policy chain', () => {
  const { policy, record } = validateDesignConsistency(read);
  assert.equal(policy.requiredConcerns.length, record.concerns.length);
});
for (const [name, path, from, to] of [
  ['stale role', 'docs/documents/prd-tad-adr-mvp-gtm-design-consistency.md', 'gtm_revision: "0.2.0"', 'gtm_revision: "0.1.0"'],
  ['stale guideline', 'docs/documents/prd-tad-adr-mvp-gtm-design-consistency.md', 'guideline_revision: "3.3.0"', 'guideline_revision: "3.2.0"'],
  ['broken entry link', 'DESIGN.md', 'guidelines/design-theme-contract.md', 'guidelines/absent.md'],
  ['broken anchor', 'guidelines/design-theme-contract.md', '#configuration-driven-design', '#absent-design-rule'],
  ['missing typography concern', 'docs/documents/prd-tad-adr-mvp-gtm-design-consistency-reference.md', '"id":"code-typography"', '"id":"unknown"'],
  ['duplicate owner', 'docs/documents/prd-tad-adr-mvp-gtm-design-consistency-reference.md', '"id":"code-typography"', '"id":"typography"'],
]) test(name, () => {
  assert.ok(read(path).includes(from), 'mutation target exists');
  assert.throws(() => validateDesignConsistency(target => target === path ? read(target).replace(from, to) : read(target)));
});
