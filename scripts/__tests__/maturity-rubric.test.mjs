import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { readMaturityRubric, validateMaturityAssessment } from '../lib/maturity-rubric.mjs';

const rubricText = readFileSync(new URL('../../guidelines/prd-tad-adr-mvp-gtm-maturity.md', import.meta.url), 'utf8');
const rubric = readMaturityRubric(rubricText);
const snapshot = JSON.parse(readFileSync(new URL('../../schema/AgenticRAG/prd-tad-adr-mvp-gtm-grounding.json', import.meta.url)));
const run = data => validateMaturityAssessment(rubric, data, snapshot.repositories);
function observed(score = 3) {
  const data = structuredClone(snapshot.maturity);
  data.ratings[0].score = score;
  data.ratings[0].evidence = ['experience-1'];
  data.observations = [{ id: 'experience-1', criterion: rubric[0].criterion, score,
    continuity_id: data.continuity_id, revision: data.revision, environment: data.environment,
    observed_at: '2026-09-12T00:00:00.000Z', expires_at: '2026-09-13T00:00:00.000Z',
    check: 'synthetic experience fixture', result: 'descriptor observed in fixture only',
    reference: 'fixture:experience-1', evaluator: 'fixture-evaluator', kind: 'experience',
    sources: [{ repository: snapshot.repositories[0].id, revision: snapshot.repositories[0].revision }],
  }];
  return data;
}
test('source-only baseline keeps all four ratings unassessed without deriving readiness', () => {
  assert.equal(rubric.length, 4);
  assert(rubric.every(row => row.descriptors.length === 5));
  assert.deepEqual(run(snapshot.maturity), { ratings: rubric.map(row => ({ criterion: row.criterion, score: null })), assessed: 0 });
});
test('observed descriptors 1–5 are ordinal; failure at 1 is not a prerequisite for 3', () => {
  for (let score = 1; score <= 5; score++) assert.equal(run(observed(score)).ratings[0].score, score);
});
for (const [name, mutate] of [
  ['unsupported score', d => { d.ratings[0].evidence = []; }],
  ['wrong descriptor', d => { d.observations[0].score = 5; }],
  ['unknown criterion', d => { d.ratings[0].criterion = 'Invented'; }],
  ['missing criterion', d => { d.ratings.pop(); }],
  ['fractional rating', d => { d.ratings[0].score = 3.5; }],
  ['out of range', d => { d.ratings[0].score = 6; }],
  ['numeric string', d => { d.ratings[0].score = '3'; }],
  ['missing gap owner', d => { d.ratings[0].owner = ''; }],
  ['missing next check', d => { d.ratings[0].next_check = ''; }],
  ['structural check promoted', d => { d.observations[0].kind = 'source'; }],
  ['stale continuity', d => { d.observations[0].revision = 'old'; }],
  ['stale source', d => { d.observations[0].sources[0].revision = '0'.repeat(40); }],
  ['foreign environment', d => { d.observations[0].environment = 'production'; }],
  ['expired evidence', d => { d.observations[0].expires_at = d.evaluated_at; }],
  ['future observation', d => { d.observations[0].observed_at = '2026-09-14T00:00:00.000Z'; }],
  ['invalid calendar date', d => { d.observations[0].observed_at = '2026-02-30T00:00:00.000Z'; }],
  ['duplicate observation', d => { d.observations.push(d.observations[0]); }],
  ['orphan observation', d => { d.observations.push({ ...d.observations[0], id: 'unused' }); }],
  ['readiness injection', d => { d.production_ready = true; }],
  ['unbounded observations', d => { d.observations = Array(21).fill(d.observations[0]); }],
]) test(`rejects ${name}`, () => {
  const data = observed(); mutate(data); assert.throws(() => run(data));
});
test('rubric rejects missing or duplicate dimensions and empty descriptors', () => {
  assert.throws(() => readMaturityRubric(rubricText.replace('Core Requirements & Functionality', 'Innovation & Theme Alignment')));
  assert.throws(() => readMaturityRubric(rubricText.replace('| 1 | 2 | 3 | 4 | 5 |', '| 1 | 2 | 3 | 4 |')));
  assert.throws(() => readMaturityRubric('x'.repeat(32_769)));
});
