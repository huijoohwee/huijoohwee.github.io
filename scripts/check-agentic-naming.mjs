import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const checkerPath = 'scripts/check-agentic-naming.mjs'
const forbidden = [
  { label: 'legacy product name', expression: /knowgrph/i },
  { label: 'collapsed product namespace', expression: /agenticgraph/i },
  { label: 'legacy canvas protocol token', expression: /\bkgc\b/i },
  { label: 'legacy canvas environment prefix', expression: /\bkg_/i },
]

const trackedFiles = execFileSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' })
  .split('\0')
  .filter(Boolean)
  .filter(relativePath => relativePath !== checkerPath)

const violations = []
for (const relativePath of trackedFiles) {
  const absolutePath = path.resolve(root, relativePath)
  const content = fs.readFileSync(absolutePath)
  if (content.includes(0)) continue
  const text = content.toString('utf8')
  for (const rule of forbidden) {
    if (rule.expression.test(relativePath) || rule.expression.test(text)) {
      violations.push(`${relativePath}: ${rule.label}`)
    }
  }
}

if (violations.length > 0) {
  throw new Error(`agentic naming violations:\n${violations.join('\n')}`)
}

console.log(`agentic naming contract ok (${trackedFiles.length} tracked files)`)
