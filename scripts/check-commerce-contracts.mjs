#!/usr/bin/env node
// Source-contract checks only; never execute frontmatter or infer runtime readiness.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import yaml from 'js-yaml';

export function validateFrontmatter(text) {
  const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
  if (!match) return ['missing YAML frontmatter at byte zero'];
  let metadata;
  try { metadata = yaml.load(match[1], { schema: yaml.JSON_SCHEMA }); }
  catch { return ['invalid or duplicate YAML metadata']; }
  if (!metadata || typeof metadata !== 'object' || Array.isArray(metadata)) return ['metadata must be a mapping'];
  const failures = [];
  for (const key of ['title', 'doc_type', 'version', 'date', 'lang']) {
    if (typeof metadata[key] !== 'string' || !metadata[key].trim()) failures.push(`missing text ${key}`);
  }
  if (metadata.frontmatter_contract !== 'required') failures.push('frontmatter contract must be required');
  if (metadata.runtime_readiness_policy !== 'fail-closed') {
    for (const key of ['runtime_scope', 'runtime_claim']) {
      if (typeof metadata[key] !== 'string' || !metadata[key].trim()) failures.push(`missing text ${key}`);
    }
    if (metadata.load_policy !== 'on-demand') failures.push('optional guidance must load on demand');
  }
  if (Buffer.byteLength(text) >= 500_000 || text.trimEnd().split('\n').length >= 600) failures.push('artifact exceeds budget');
  return failures;
}

export function validateProjection(record) {
  const contract = record?.projectionContract;
  if (!contract || contract.kind !== 'reference-serialization') return ['missing reference projection contract'];
  const failures = [];
  if (contract.authorizesEffects !== false || contract.runtimeValidation !== 'declarative-only') failures.push('projection cannot authorize effects or claim runtime validation');
  for (const key of ['semanticAuthority', 'continuityAuthority']) {
    if (typeof record[key] !== 'string' || !record[key].startsWith('../../guidelines/')) failures.push(`missing local ${key}`);
  }
  const mapping = contract.fieldMapping;
  if (!mapping || typeof mapping !== 'object') return [...failures, 'missing field mapping'];
  const fields = ['role', 'action', 'outcome', 'subject', 'verb', 'object'];
  if (Object.keys(mapping).length !== fields.length || fields.some(key => typeof mapping[key] !== 'string')) failures.push('incomplete shared field mapping');
  if (new Set(Object.values(mapping)).size !== fields.length) failures.push('semantic fields must not collapse');
  for (const target of Object.values(mapping)) {
    if (typeof target !== 'string') continue;
    const [field, nested, ...extra] = target.split('.');
    const owner = record.propertyDefinitions?.[field];
    if (!owner || extra.length || (nested && !owner.properties?.[nested])) failures.push(`unresolved projection field ${target}`);
  }
  if (mapping.object !== 'svo_pattern.object' || mapping.outcome !== 'outcome') failures.push('scoped object and observable outcome need distinct bindings');
  if (record.schemaVersion !== '3.0.0' || !contract.migration) failures.push('semantic correction requires versioned migration');
  return failures;
}

export function checkCommerceContracts(root) {
  const failures = [];
  for (const file of ['guidelines/token-performance-economics-guidelines.md', 'guidelines/adlc-rapid-mvp-sprint.md']) {
    failures.push(...validateFrontmatter(readFileSync(path.join(root, file), 'utf8')).map(issue => `${file}: ${issue}`));
  }
  const file = 'schema/AgenticRAG/roles-actions-outcomes-schema.jsonld';
  const record = JSON.parse(readFileSync(path.join(root, file), 'utf8'));
  failures.push(...validateProjection(record));
  for (const field of ['semanticAuthority', 'continuityAuthority']) {
    const [relative, anchor] = record[field].split('#');
    const source = readFileSync(path.resolve(root, path.dirname(file), relative), 'utf8');
    const headings = [...source.matchAll(/^#+ (.+)$/gm)].map(match => match[1].toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/ /g, '-'));
    if (!headings.includes(anchor)) failures.push(`unresolved authority anchor ${field}`);
  }
  return failures;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const failures = checkCommerceContracts(path.resolve(fileURLToPath(new URL('..', import.meta.url))));
  if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
  else console.log('commerce source contracts valid; no runtime or payment claim');
}
