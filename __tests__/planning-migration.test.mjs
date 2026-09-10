import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
test('public planning routes select one private owner without retaining a writable corpus', () => {
  assert.equal(existsSync(new URL('../todo', import.meta.url)), false);
  for (const file of ['TODO.md', 'kanban.md']) {
    const text = readFileSync(new URL(`../docs/${file}`, import.meta.url), 'utf8');
    assert.match(text, /source_owner: "huijoohwee\/\.workspace"/u);
    assert.ok(text.includes(`https://github.com/huijoohwee/.workspace/blob/main/.todo/docs/${file}`));
    assert.match(text, /status: "retired"/u);
  }
  const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));
  assert.doesNotMatch(pkg.scripts['planning:check'], /&& node scripts/u);
});
