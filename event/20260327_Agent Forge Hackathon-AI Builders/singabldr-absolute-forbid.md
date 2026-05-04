# Singabldr: AI-native “absolute forbid” boundary

## Goal
Make production changes **mechanical + reviewable**, so the publish repo stays a clean deployment target and never becomes a second SSOT.

## Boundary (absolute forbid)
In the publish repo (`huijoohwee`), the following paths are **deployment artifacts** and must not be hand-edited:

- `content/singabldr/**`
- `singabldr/**`

> These are protected via `.github/CODEOWNERS` and should be additionally enforced by GitHub branch protection rules.

## Allowed workflow (only)
1) Edit SSOT in dev repo: `singabldr` (`/Users/huijoohwee/Documents/GitHub/singabldr`)
   - `singabldr-src/**` for the upstream `app.rebundled.js` source
   - `singabldr/assets/**` for shell-managed boot scripts, overrides, fonts, and POI media
   - `singabldr/index.html`, `singabldr/manifest.webmanifest`, `singabldr/sw.js`
   - `singabldr/boards/**`
   - `script-*.json`, `singabldr*.json`, `singabldr.geojson`
2) Run from dev repo:
   - `npm run sync:pages`
   - `npm run release:pages`
3) Push `huijoohwee` to deploy Cloudflare Pages at `airvio.co/singabldr`.

## GitHub enforcement checklist (recommended)
In GitHub → Repo Settings → Branches → Branch protection (for the deploy branch):

- Require pull request reviews before merging
- Require review from Code Owners
- Restrict who can push to matching branches
- (Optional) Require signed commits

## Local enforcement (already in pipeline)
The dev repo `release:pages` script rebuilds `assets/app.rebundled.js` from `singabldr-src`, syncs the full Singabldr shell/app surface into `huijoohwee`, validates forbidden terms, and stages only `content/singabldr` + `singabldr`.
