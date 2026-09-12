import assert from 'node:assert/strict';

// Structural validation only. The evaluator owns ratings and evidence authenticity.
const text = value => typeof value === 'string' && value.trim().length > 0
  && Buffer.byteLength(value, 'utf8') <= 2048;
const score = value => Number.isInteger(value) && value >= 1 && value <= 5;
const keys = (value, expected) => {
  assert(value && typeof value === 'object' && !Array.isArray(value), 'record required');
  assert.deepEqual(Object.keys(value).sort(), [...expected].sort(), 'unexpected record fields');
};
const utc = value => typeof value === 'string'
  && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)
  && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value;

export function readMaturityRubric(source) {
  assert(typeof source === 'string' && Buffer.byteLength(source, 'utf8') <= 32_768,
    'rubric exceeds 32 KiB');
  const table = source.split('## Rating matrix\n')[1]?.split('\n## ')[0];
  assert(table, 'rating matrix missing');
  const lines = table.trim().split('\n');
  assert.equal(lines[0], '| Criterion | What we are looking for | 1 | 2 | 3 | 4 | 5 |');
  assert.equal(lines[1], '|---|---|---|---|---|---|---|');
  assert.equal(lines.length, 6, 'exactly four criteria required');
  const rubric = lines.slice(2).map(line => {
    assert(line.startsWith('| ') && line.endsWith(' |'), 'malformed rubric row');
    const cells = line.slice(1, -1).split('|').map(cell => cell.trim());
    assert(cells.length === 7 && cells.every(text), 'five nonempty descriptors required');
    return { criterion: cells[0], question: cells[1], descriptors: cells.slice(2) };
  });
  assert.equal(new Set(rubric.map(row => row.criterion)).size, 4, 'duplicate criterion');
  return rubric;
}

export function validateMaturityAssessment(rubric, assessment, repositories) {
  keys(assessment, ['continuity_id', 'revision', 'environment', 'evaluated_at', 'ratings', 'observations']);
  for (const field of ['continuity_id', 'revision', 'environment']) assert(text(assessment[field]), field);
  assert(utc(assessment.evaluated_at), 'evaluation time must be canonical UTC');
  assert(Array.isArray(assessment.ratings) && assessment.ratings.length === rubric.length,
    'every criterion requires a rating or null');
  assert(Array.isArray(assessment.observations) && assessment.observations.length <= 20,
    'observations must be bounded');
  const expected = rubric.map(row => row.criterion);
  assert.deepEqual(assessment.ratings.map(row => row.criterion), expected, 'criterion identity/order mismatch');
  const observations = new Map();
  for (const row of assessment.observations) {
    keys(row, ['id', 'criterion', 'score', 'continuity_id', 'revision', 'environment',
      'observed_at', 'expires_at', 'check', 'result', 'reference', 'evaluator', 'sources', 'kind']);
    for (const field of ['id', 'check', 'result', 'reference', 'evaluator']) assert(text(row[field]), field);
    assert(!observations.has(row.id), 'duplicate observation');
    assert(expected.includes(row.criterion) && score(row.score), 'invalid observed descriptor');
    assert.equal(row.kind, 'experience', 'source checks cannot score an experience');
    for (const field of ['continuity_id', 'revision', 'environment'])
      assert.equal(row[field], assessment[field], `stale ${field}`);
    assert(utc(row.observed_at) && utc(row.expires_at), 'canonical observation times required');
    assert(Date.parse(row.observed_at) <= Date.parse(assessment.evaluated_at)
      && Date.parse(assessment.evaluated_at) < Date.parse(row.expires_at), 'stale or future observation');
    assert(Array.isArray(row.sources) && row.sources.length > 0 && row.sources.length <= repositories.length,
      'bounded exact sources required');
    const seen = new Set();
    for (const source of row.sources) {
      keys(source, ['repository', 'revision']);
      assert(!seen.has(source.repository), 'duplicate source');
      seen.add(source.repository);
      const owner = repositories.find(item => item.id === source.repository);
      assert(owner && owner.revision === source.revision, 'stale source revision');
    }
    observations.set(row.id, row);
  }
  const used = new Set();
  const ratings = assessment.ratings.map(row => {
    keys(row, ['criterion', 'score', 'evidence', 'rationale', 'owner', 'next_check']);
    assert(repositories.some(owner => owner.id === row.owner), 'unknown gap owner');
    assert(text(row.rationale) && text(row.next_check), 'rationale and next check required');
    assert(row.score === null || score(row.score), 'score must be 1–5 or null');
    assert(Array.isArray(row.evidence) && row.evidence.length <= 20
      && new Set(row.evidence).size === row.evidence.length, 'bounded unique evidence required');
    if (row.score === null) assert.equal(row.evidence.length, 0, 'unassessed has no rating evidence');
    else assert(row.evidence.length > 0, 'unproven rating');
    for (const id of row.evidence) {
      const observation = observations.get(id);
      assert(observation && observation.criterion === row.criterion
        && observation.score === row.score, 'unjoined rating evidence');
      used.add(id);
    }
    return { criterion: row.criterion, score: row.score };
  });
  assert.equal(used.size, observations.size, 'orphan observation');
  return { ratings, assessed: ratings.filter(row => row.score !== null).length };
}
