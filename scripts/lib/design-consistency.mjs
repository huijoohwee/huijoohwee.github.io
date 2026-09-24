import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { posix } from 'node:path';
import { readFrontmatter } from './git-guidelines/fm-reader.mjs';

const prefix = 'docs/documents/prd-tad-adr-mvp-gtm-design-consistency';
export const DESIGN_FILES = Object.freeze(['DESIGN.md', 'guidelines/design-guidelines.md',
  'guidelines/design-cid-guidelines.md', 'guidelines/design-theme-contract.md',
  'guidelines/prd-tad-adr-mvp-gtm-guidelines.md', 'guidelines/prd-tad-adr-mvp-gtm-templates.md',
  ...['', '-reference', '-evidence'].map(suffix => `${prefix}${suffix}.md`)]);
const roles = ['prd', 'tad', 'adr', 'mvp', 'gtm'];
const digest = text => createHash('sha256').update(text).digest('hex');
const slug = text => text.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-');
const anchors = text => new Set([...text.matchAll(/^#{1,6} (.+)$/gm)].map(match => slug(match[1])));
function block(text, name) {
  const matches = [...text.matchAll(new RegExp('```' + name + '\\n([\\s\\S]*?)\\n```', 'g'))];
  assert.equal(matches.length, 1, `one ${name} projection required`);
  return JSON.parse(matches[0][1]);
}

/** Fixed enrollment, bounded reads and local links; never fetch policy or claim browser proof. */
export function validateDesignConsistency(read) {
  const texts = new Map(DESIGN_FILES.map(path => [path, read(path)]));
  const metadata = new Map();
  for (const [path, text] of texts) {
    assert.ok(Buffer.byteLength(text) < 100000 && text.split('\n').length <= 600, `${path}: document budget`);
    const data = readFrontmatter(text).data;
    assert.equal(data.frontmatter_contract, 'required', `${path}: frontmatter contract`);
    metadata.set(path, data);
    // Validate the links in the enrolled entry point, contract and delivery records.
    if (!['DESIGN.md', 'guidelines/design-theme-contract.md'].includes(path) && !path.startsWith(prefix)) continue;
    const links = [...text.matchAll(/\[[^\]\n]+\]\(([^)\s]+)\)/g)];
    assert.ok(links.length <= 128, `${path}: link budget`);
    for (const [, link] of links) {
      if (/^[a-z]+:/i.test(link)) continue;
      const [file, anchor] = link.split('#');
      const target = file ? posix.normalize(posix.join(posix.dirname(path), file)) : path;
      assert.ok(!target.startsWith('../') && !posix.isAbsolute(target), `${path}: nonlocal link`);
      const content = texts.get(target) ?? read(target);
      assert.ok(typeof content === 'string', `${path}: missing ${target}`);
      if (anchor) assert.ok(anchors(content).has(anchor), `${path}: missing ${target}#${anchor}`);
    }
  }
  const parent = metadata.get(`${prefix}.md`);
  assert.equal(parent.version, parent.revision, 'joined version differs');
  assert.equal(parent.guideline_revision, metadata.get('guidelines/prd-tad-adr-mvp-gtm-guidelines.md').version,
    'guideline revision drift');
  for (const role of roles) assert.equal(parent[`${role}_revision`], parent.revision, `${role}: role revision drift`);
  for (const suffix of ['-reference', '-evidence']) {
    const child = metadata.get(`${prefix}${suffix}.md`);
    for (const field of ['continuity_id', 'revision', 'version']) assert.equal(child[field], parent[field], `${suffix}: ${field} drift`);
  }
  for (const path of ['guidelines/prd-tad-adr-mvp-gtm-guidelines.md', 'guidelines/prd-tad-adr-mvp-gtm-templates.md'])
    assert.ok(texts.get(path).includes('design-theme-contract.md#'), `${path}: missing native owner binding`);
  const policy = block(texts.get('guidelines/design-theme-contract.md'), 'native-design-policy');
  const adoption = block(texts.get(`${prefix}-reference.md`), 'native-design-adoption');
  assert.equal(policy.schema, 'native-design-policy/v1');
  assert.equal(policy.revision, metadata.get('guidelines/design-theme-contract.md').version, 'policy revision drift');
  assert.equal(new Set(policy.requiredConcerns).size, policy.requiredConcerns.length, 'duplicate policy concern');
  assert.ok(policy.requiredConcerns.length > 0 && policy.requiredConcerns.length <= 32);
  assert.match(adoption.sourceRevision, /^[a-f0-9]{40}$/);
  assert.equal(new Set(adoption.concerns.map(c => c.id)).size, adoption.concerns.length, 'duplicate concern owner');
  assert.deepEqual(adoption.concerns.map(c => c.id).sort(), [...policy.requiredConcerns].sort(), 'missing or unknown concern');
  for (const c of adoption.concerns) {
    for (const field of ['id', 'owner', 'source', 'symbol', 'check']) assert.ok(typeof c[field] === 'string' && c[field].trim(), `${c.id}: ${field} absent`);
    assert.match(c.source, /^[a-zA-Z0-9_./-]+$/);
    assert.ok(!c.source.split('/').some(part => ['..', '.', ''].includes(part)), 'unsafe source path');
  }
  return { policy, record: { continuityId: parent.continuity_id, revision: parent.revision,
    sourceRevision: adoption.sourceRevision, roles: Object.fromEntries(roles.map(role => [role, parent[`${role}_revision`]])),
    concerns: adoption.concerns } };
}

/** Trusted caller supplies exact historical Git bytes; this function does not run named checks. */
export function buildDesignCheckInput(read, readSource) {
  const { policy, record } = validateDesignConsistency(read);
  const sources = [...new Set(record.concerns.map(c => c.source))].map(id => {
    const text = readSource(record.sourceRevision, id);
    assert.ok(Buffer.byteLength(text) <= 65536, `${id}: source budget`);
    return { id, revision: record.sourceRevision, text, sha256: digest(text) };
  });
  for (const concern of record.concerns) assert.ok(sources.find(s => s.id === concern.source).text.includes(concern.symbol),
    `${concern.id}: source symbol absent`);
  return { schema: 'native-design-check/v1', expectedPolicyDigest: digest(JSON.stringify(policy)), policy, record, sources };
}
