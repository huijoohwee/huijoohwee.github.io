import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { validateFrontmatter, validateProjection, checkCommerceContracts } from '../check-commerce-contracts.mjs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const document = readFileSync(new URL('../../guidelines/adlc-rapid-mvp-sprint.md', import.meta.url), 'utf8');
const projection = JSON.parse(readFileSync(new URL('../../schema/AgenticRAG/roles-actions-outcomes-schema.jsonld', import.meta.url), 'utf8'));

test('source contracts resolve shared authorities without runtime execution', () => {
  assert.deepEqual(checkCommerceContracts(root), []);
});
test('frontmatter rejects duplicate keys, displaced headers and incomplete runtime scope', () => {
  for (const text of [document.replace('---\n', '---\ntitle: duplicate\n'), `prefix\n${document}`, document.replace(/^runtime_readiness_policy:.*\n/m, '')]) {
    assert.ok(validateFrontmatter(text).length);
  }
});
test('projection rejects the legacy object/outcome collapse and unresolved fields', () => {
  for (const target of ['outcome', 'svo_pattern.absent']) {
    const record = structuredClone(projection);
    record.projectionContract.fieldMapping.object = target;
    assert.ok(validateProjection(record).length);
  }
});
test('declarations cannot become effect authority or an unversioned semantic migration', () => {
  const record = structuredClone(projection);
  record.projectionContract.authorizesEffects = true;
  assert.ok(validateProjection(record).length);
  record.projectionContract.authorizesEffects = false;
  record.schemaVersion = '2.0.0';
  assert.ok(validateProjection(record).length);
});
