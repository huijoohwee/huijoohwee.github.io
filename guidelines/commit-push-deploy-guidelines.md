---
title: "Commit / Push / Deploy Guidelines"
author: "huijoohwee"
tags: [Git, GitHub, Deploy, Cloudflare, Vercel, CI/CD, Release]
date: 2026-06-10
version: 1.2
applies_to:
  - knowgrph        # /Users/huijoohwee/Documents/GitHub/knowgrph
  - huijoohwee      # /Users/huijoohwee/Documents/GitHub/huijoohwee (Prod mirror)
  - agentic-canvas-os  # /Users/huijoohwee/Documents/GitHub/agentic-canvas-os
---

# Commit / Push / Deploy Guidelines

**Principle**: commit and push are the default; skip only with an explicit reason
and a known expiry date for the exception.

---

## Why commit and push?

- **Reproducibility** — every deployed artifact is pinned to a SHA; you can
  reproduce or roll back exactly what is live.
- **History / audit trail** — working-tree deploys (`--commit-dirty`) ship
  *unknown* code; git commits ship *named* code.
- **Collaboration** — changes that live only on disk are invisible to teammates,
  CI, and future-you.
- **Safety net** — `git revert`, `git bisect`, and branch protection all require
  a commit history.

---

## Priority Legend

- 🔴 **CRITICAL** — must be done every time, no exceptions
- 🟡 **HIGH** — strongly recommended; skip only with documented reason
- 🟢 **MEDIUM** — good practice; context-dependent
- ⚪ **OPTIONAL** — nice to have

---

## Phase 0: Before You Start Work

### 🔴 CRITICAL

| When | Action | Command | Do / Don't |
|---|---|---|---|
| Beginning any change | Pull latest from remote | `git pull --rebase origin <branch>` | ✅ Start clean<br>❌ Don't work on stale base |
| Stale/unrelated WIP in tree | Stash it before building or deploying | `git stash push -m "WIP: <topic>"` | ✅ Keep the deploy tree clean<br>❌ Don't let WIP ride along silently |

---

## Phase 1: Commit (Dev → local history)

### 🔴 CRITICAL

| When | Action | Command | Do / Don't |
|---|---|---|---|
| Feature/fix is buildable and tests pass | Stage **related** files only | `git add <specific-files>` or `git add -p` | ✅ Stage by topic<br>❌ Don't `git add .` without reviewing `git status` first |
| Files staged | Commit with a clear message | `git commit -m "<type>: <short summary>"` | ✅ Imperative mood, ≤72 chars subject<br>❌ Don't use "fix", "update", "changes" alone |
| Multiple unrelated changes in tree | Split into separate commits | `git add -p` → commit each topic | ✅ One commit per logical unit<br>❌ Don't bundle unrelated changes |
| Commit message types | Use conventional prefix | `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:` | ✅ Consistent prefix<br>❌ Don't invent new prefixes |

**Commit message format:**
```
<type>(<optional scope>): <short summary>

<optional body — what and why, not how>
```

**Examples:**
```bash
git commit -m "feat(settings): add operator-deploy MCP settings to MainPanel"
git commit -m "docs: annotate PRD/TAD frontmatter with monorepo topology"
git commit -m "fix(canvas): repair flow-editor run-button regression"
```

### 🟡 HIGH

| When | Action | Do / Don't |
|---|---|---|
| Commit is unpushed and only on your branch | Amend rather than create a fixup | ✅ `git commit --amend --no-edit` for tiny typos<br>❌ Don't amend already-pushed commits |
| Pre-commit hooks (hygiene/lint) fail | Fix, don't skip | ✅ Fix the issue<br>❌ Don't `--no-verify` as a habit |

---

## Phase 2: Push (Dev → remote / GitHub)

### 🔴 CRITICAL

| When | Action | Command | Do / Don't |
|---|---|---|---|
| Commit is ready to share | Push to a **feature branch** | `git push -u origin <branch>` | ✅ Push to branch, never directly to main<br>❌ Don't force-push shared branches |
| Branch is the first of its kind on remote | Set upstream | `git push -u origin <branch>` | ✅ Establishes tracking for future `git push`<br>❌ Don't forget `-u` on first push |
| Branch is ready for production | Open a PR or merge to main | GitHub PR → review → squash/merge | ✅ PR title ≤70 chars; describe what + why<br>❌ Don't merge your own PR without review on shared repos |

### 🟡 HIGH

| When | Action | Do / Don't |
|---|---|---|
| Push triggers CI | Watch the CI result before deploying | ✅ Green CI gate is the signal to deploy<br>❌ Don't deploy over a red CI |
| Branch is stale | Delete after merge | `git branch -d <branch>` + `git push origin --delete <branch>` | ✅ Keep remote clean<br>❌ Don't accumulate merged branches |

---

## Phase 3: knowgrph Dev → Prod mirror → Cloudflare deploy

The `knowgrph` → `huijoohwee` → Cloudflare pipeline uses **Wrangler Pages** with
`--commit-dirty=true`, which means it can deploy a dirty working tree. The
**correct operating mode** is:

1. **Commit and push in knowgrph first** (Phase 1–2 above).
2. Run the deploy chain, which builds from the now-clean tree.
3. The Cloudflare deployment record is then pinned to a real SHA.

Using `--commit-dirty=true` as a **crutch** (deploying without committing) is
acceptable **only** during a fast demo crunch, and only when the uncommitted
changes are intentional and bounded. Never use it as the default mode.

### 🔴 CRITICAL — deploy sequence

| Step | Command | Gate |
|---|---|---|
| 1. Stash unrelated WIP | `git stash push -m "WIP: <topic>"` | Clean tree before build |
| 2. Production build | `npm run pages:build` | Must exit 0 |
| 3. Sync check | `npm run pages:check-sync` | Skip deploy if "up to date" **and** nothing changed |
| 4. Responsive parity gate | `npm --prefix canvas run test:smoke:mobile-keyboard:browser` + review `docs/documents/knowgrph-feature-map.md` | Required when mobile grammar reachability, heavy-runtime intent policy, or touch-first responsive behavior changes |
| 5. Sync if needed | `npm run pages:sync` | Only on drift |
| 6. Deploy + D1 seed | `npm run pages:deploy-cloudflare` | Block if sync proof, mobile keyboard proof, or route-and-action review is missing; record the deployment URL/ID |
| 7. Verify live surfaces | `npm run runtime:verify` | Three `/health`/reachability surfaces green before demoing |
| 8. Restore stash | `git stash pop` | Don't leave stash dangling |

### 🟡 HIGH - release evidence to record

After a real `knowgrph` release, record the bounded evidence that proves the
ship actually happened instead of relying on terminal scrollback alone.

| Evidence | Source | What to record |
|---|---|---|
| Pages build | `npm run pages:build` | success/failure plus total wall time |
| Sync check | `npm run pages:check-sync` | whether deploy scope was already in sync or required publish drift correction |
| Responsive parity gate | `npm --prefix canvas run test:smoke:mobile-keyboard:browser` + route-and-action review | pass/fail result plus the feature-map revision reviewed for the deploy |
| Pages deploy | `npm run pages:deploy-cloudflare` | preview URL or deployment id returned by Wrangler |
| Docs seed | `node ./scripts/seed-storage-docs-to-cloudflare.mjs` or deploy log | before-seed export time, per-document D1 progress, final `documents=<n>` verification |
| Live verify | `npm run runtime:verify` | green/failed result for live `/knowgrph` and MCP health surfaces |

For the canonical-docs D1 seed, the current observable proof shape is:

- `source-files=<n>`
- `chunked-source-files=<n>`
- `export start/done: before-seed`
- `d1 document upsert i/n: <canonicalPath>`
- `export start/done: direct-d1-verification`
- `export verification: documents=<n>`
- `direct D1 seed complete`

This keeps Dev -> Prod -> Cloudflare release notes short, evidence-backed, and
easy to compare across runs.

### 🟡 HIGH

| When | Action | Do / Don't |
|---|---|---|
| Re-deploying with no code change | Check sync first; skip if "up to date" | ✅ Avoid redundant billable deploys + D1 re-seeds<br>❌ Don't re-deploy on every run |
| `huijoohwee` (Prod mirror) is on a non-main branch | That's fine — wrangler targets the Pages project, not the local branch | ✅ Note the local branch in the deploy log<br>❌ Don't mistake the local branch for the Pages branch |

---

## Phase 4: agentic-canvas-os → Vercel

`agentic-canvas-os` is the product tier (Vercel frontend + Vercel serverless
functions as primary Agent-API, AWS Lambda as fallback). The repo structure
that matters for Vercel:

```
agentic-canvas-os/
  web/                     ← Root Directory for Vercel
    index.html / main.js / styles.css   static shell
    api/                   ← Vercel serverless functions
      auth/session.js      POST /api/auth/session (HS256 JWT mint)
      run.js               POST /api/run (forward to knowgrph MCP)
      _runtime.js          shared Agent-API core
    build.mjs              Vercel buildCommand (node build.mjs)
    vercel.json            framework:null, outputDirectory:dist
```

The **full knowgrph canvas** is served by `airvio.co/knowgrph`. The Vercel app
embeds it in an iframe (`https://airvio.co/knowgrph/doc-view?run=<runId>`) for
100% fidelity. For this to work, `airvio.co` must allow `frame-ancestors` for
the Vercel origin in its `_headers` file — see the iframe fidelity section below.

### 🔴 CRITICAL — initial Vercel setup

| Step | Action | Do / Don't |
|---|---|---|
| 1. Initial commit | `git add -A && git commit -m "feat: initial agentic-canvas-os product tier"` | ✅ One clean commit on an unborn branch<br>❌ Don't `vercel deploy` before the first commit |
| 2. Push | `git push -u origin main` | ✅ Remote must exist before wiring Vercel Git integration<br>❌ Don't wire Vercel before the remote exists |
| 3. Create Vercel project | Dashboard → Import → **Root Directory = `web`** | ✅ `web/` is the critical setting — `vercel.json` + `build.mjs` + `api/` all live there<br>❌ Don't leave Root Dir at repo root |
| 4. Set public build-time env | `CANVAS_BASE_URL=https://airvio.co/knowgrph` | ✅ Public URL only; defaults to `https://airvio.co/knowgrph` if unset<br>❌ Don't put secrets in build-time env |
| 5. Optionally set fallback | `AGENT_API_FALLBACK_URL=<AWS-endpoint>` | ✅ Vercel functions are primary; AWS Lambda is the 5xx/transport fallback<br>❌ Don't invert — AWS is fallback, not primary |
| 6. Set server-side secret | `AUTH_JWT_SECRET=<HS256-signing-secret>` as **server** env (not build) | ✅ Server-only; never emitted to the bundle or logs<br>❌ Don't set as a public/build var |
| 7. Trigger first deploy | Push to `main` → Vercel auto-deploys | ✅ Verify `GET /api/run → 405` and `POST /api/auth/session → 200` |
| 8. Wire `frame-ancestors` on airvio.co | See iframe fidelity section | ✅ Required for the canvas embed to load inside the Vercel iframe |

### 🔴 CRITICAL — ongoing Vercel deploy cycle

```
git add -A
git commit -m "<type>: <summary>"
git push                        # triggers Vercel auto-deploy on main
                                # every branch push gets a Vercel preview URL
```

Vercel's Git integration is the deploy mechanism — there is no manual deploy
step. Pushing to `main` IS the production deploy.

### 🟡 HIGH — iframe fidelity (knowgrph canvas embedded in Vercel)

The Vercel app frames `airvio.co/knowgrph` via an `<iframe>`. Without the
correct `Content-Security-Policy: frame-ancestors` header on airvio.co, the
browser refuses to load the canvas cross-origin and the iframe is blank.

**Rule: whenever a new Vercel deployment URL is created, verify `frame-ancestors`
covers that origin.**

The current setting in `knowgrph/canvas/public/_headers`:

```
/knowgrph*
  Content-Security-Policy: frame-ancestors 'self' https://*.vercel.app https://*.joohwee.pages.dev
```

This covers:
- All `*.vercel.app` preview URLs (e.g. `agentic-canvas-f3yw4nhqx-joohwees-projects.vercel.app`)
- All `*.joohwee.pages.dev` Cloudflare preview URLs
- `'self'` (airvio.co itself)

If a custom domain is added to the Vercel project, add it explicitly:

```
/knowgrph*
  Content-Security-Policy: frame-ancestors 'self' https://*.vercel.app https://*.joohwee.pages.dev https://your-custom-domain.com
```

Then run `npm run pages:deploy-cloudflare` in `knowgrph` to deploy the updated header.

| When | Action | Do / Don't |
|---|---|---|
| New Vercel preview URL appears | Confirm it matches `*.vercel.app` wildcard | ✅ Wildcards cover all `joohwee.vercel.app` variants<br>❌ Don't add per-deployment hashes — the wildcard covers them |
| Custom domain added to Vercel | Add it to `frame-ancestors` in `canvas/public/_headers` and redeploy knowgrph | ✅ Explicit domain; deploy both repos<br>❌ Don't assume the wildcard covers custom domains |
| Canvas iframe shows blank | Check browser console for `Refused to display ... in a frame` | ✅ Update `frame-ancestors` and redeploy airvio.co<br>❌ Don't debug in Vercel — the fix is in knowgrph `_headers` |

### 🟡 HIGH — test before every Vercel deploy

| When | Action | Do / Don't |
|---|---|---|
| Any change to `web/api/*` | `npm test` in `agentic-canvas-os/` (51 tests, network-free) | ✅ Green gate before push<br>❌ Don't push a red test run |
| Any change to `web/build.mjs` | `CANVAS_BASE_URL=https://airvio.co/knowgrph npm run web:build` | ✅ Verify `web/dist` is produced correctly<br>❌ Don't push a build that emits secrets |
| Feature work | Push to a feature branch first | ✅ Vercel auto-creates a preview URL; verify the iframe loads before merging<br>❌ Don't develop directly on `main` |

---

## Phase 5: Commit-free exceptions (when --commit-dirty is legitimate)

| Situation | Acceptable? | Expiry |
|---|---|---|
| Fast demo crunch; changes are finished but not yet cleaned up for commit | ✅ Yes, with `--commit-dirty` | Commit within the day; before next deploy |
| Mid-experiment; half-finished branch; don't want noise in history | ✅ Yes | Commit or `git stash` before the next substantive deploy |
| Ongoing habit; "I'll commit later" for weeks | ❌ No | Commit now |
| CI is failing and you want to skip the gate | ❌ No | Fix CI |

---

## CID Mantras

- **Commit**; guarantee reproducibility; forbid deploying unversioned artifacts
- **Push**; share verified history; forbid lone-machine knowledge hoarding
- **Branch**; isolate changes by topic; forbid direct work on `main`
- **Deploy**; gate on a passing build; forbid deploying over red CI
- **Stash**; isolate WIP before building; forbid unrelated changes riding silently into prod
- **Rollback**; keep history clean enough to revert; forbid force-push on shared branches
- **Verify**; probe live surfaces after every deploy; forbid shipping unverified live endpoints
- **frame-ancestors**; allow only named origins to embed the canvas; forbid `X-Frame-Options: DENY` on embeddable routes
