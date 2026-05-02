# Security & Performance Audit (2026-04-06)

Repo: `huijoohwee` (Vite + static content + Cloudflare Pages Functions)

## Executive summary (prioritized)

1. **[MED] Dev-server exposure + known advisory in toolchain (Vite/esbuild)**  
   `npm audit` reports a **moderate** issue affecting `vite` via `esbuild` (dev server request/response exposure). Your `dev` script runs Vite with `--host 0.0.0.0`, which increases the practical risk if you run it on untrusted networks.

2. **[MED] SSRF / open-proxy risk in Cloudflare Pages Functions (`link-preview`, `link-proxy`)**  
   Both endpoints fetch arbitrary `http(s)` URLs provided via querystring. They validate scheme, but **do not block** private/loopback IPs or “internal” hostnames (e.g. `localhost`). This can be abused for SSRF-like behavior / network probing and to use your domain as a proxy.

3. **[LOW] Missing baseline security headers for static assets/pages**  
   `_headers` currently sets caching only. Adding standard headers reduces risk from MIME sniffing, clickjacking, etc.

4. **[INFO] Deploy payload looks small; local repo is large due to `node_modules/`**  
   `content/` is ~2.1MB total, but the repo working copy is ~243MB mainly because of `node_modules/`. Ensure CI/deploy does not publish `node_modules/` or other local artifacts.

---

## What I checked

### Automated security checks
- `npm audit` (dev + prod)  
  - `--omit=dev` (prod deps): **0 vulnerabilities**
  - full (dev deps included): **2 moderate** vulnerabilities (Vite/esbuild chain)
- Secret scanning (common patterns: private keys, AWS keys, OpenAI-style keys, “apiKey/secret/password=…”): **no obvious leaks found**
- `.gitignore` review: includes explicit ignores for Singabldr local secrets (`user-secrets.local.json`, `.env.local`, etc.)

### Code/config hotspot review
- Cloudflare Pages Functions:
  - `functions/api/link-preview.js`
  - `functions/api/link-proxy.js`
- Static hosting rules:
  - `_headers`, `_redirects`

### Performance sanity checks
- Asset size review (largest deploy artifacts):
  - `content/singabldr/assets/app-F2P7J5VB.js` ~824KB
  - `content/hackamap/hackamap-graph.json` ~620KB
- Attempted `npm run build` in this environment, but it failed because `node_modules` appears to contain macOS/darwin Rollup native packages, not Linux ones.

---

## Findings & recommendations

### 1) [MED] Vite/esbuild dev-server advisory + `--host 0.0.0.0`

**Evidence**
- `npm audit` flags:
  - `esbuild` (moderate): GHSA-67mh-4wv8-2f99
  - `vite` (moderate) via `esbuild`
- `package.json`:
  - `dev`: `vite --host 0.0.0.0 --port 5173`

**Why it matters**
- The advisory is mainly a **dev-server** concern. Exposing the dev server on `0.0.0.0` makes it reachable by other devices on the network, increasing exposure to “drive-by” web pages making requests to your dev server.

**Recommended fixes**
- **Quick win (no dependency changes):**
  - Change dev script to bind to localhost by default:
    - `vite --host 127.0.0.1 --port 5173`
  - Only use `--host 0.0.0.0` when you explicitly need LAN access.
- **Toolchain upgrade (recommended):**
  - Upgrade to a Vite version that pulls a non-vulnerable `esbuild`.
  - `npm audit` suggests: `vite@8.0.3` (major). If you prefer to stay on Vite 5/6/7, check the latest patched minor/major and test.

**Operational mitigations**
- Firewall dev ports; avoid running dev server on public Wi‑Fi; don’t port-forward dev ports.

---

### 2) [MED] SSRF / open-proxy risk in `link-preview` and `link-proxy`

**Evidence**
- `functions/api/link-preview.js` and `functions/api/link-proxy.js` accept `?url=` and only validate `http:`/`https:`.

**Why it matters**
- Attackers can call these endpoints to have your server-side runtime fetch arbitrary URLs.
- Even in edge runtimes, this can be abused for:
  - proxying content through your domain
  - probing/targeting internal/loopback resources if reachable
  - amplifying traffic to targets (abuse)

**Recommended fixes (pick one, in order)**
1. **Allowlist**: only allow preview/proxy for known domains you expect (strongest).
2. **Denylist private/loopback** (good baseline):
   - Block hostnames: `localhost`, `*.local`, `*.internal`, etc.
   - Block IP literals in:
     - `127.0.0.0/8`, `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`
     - `169.254.0.0/16` (link-local)
     - `::1`, `fc00::/7`, `fe80::/10`
   - Consider restricting ports to `80`/`443` only.
3. **Add abuse controls**:
   - rate limiting (Cloudflare)
   - require a signed token (HMAC) or check `Origin/Referer` to be your site

**Notes**
- `link-proxy` does a decent job on *client-side* safety by applying a restrictive CSP to the proxied HTML response (`default-src 'none' ...`).
- The main gap is the **server-side fetch policy** (what URLs it will fetch).

---

### 3) [LOW] Add baseline security headers in `_headers`

**Evidence**
- `_headers` currently only sets `Cache-Control`.

**Recommended headers (typical for static sites)**
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin` (or stricter)
- `Permissions-Policy: geolocation=(), microphone=(), camera=()` (adjust as needed)
- `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Resource-Policy: same-origin` (only if it won’t break embeds/resources)
- Consider HSTS if fully HTTPS: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`

---

### 4) [INFO] Build reproducibility + platform-specific `node_modules`

**Evidence**
- `npm run build` failed here with:
  - `Cannot find module @rollup/rollup-linux-arm64-gnu`
  - and `@rollup/rollup-darwin-arm64` exists in `node_modules/`

**Recommended practice**
- For CI/build servers, always do a clean install on that OS/arch:
  - `rm -rf node_modules && npm ci` (preferred when lockfile is committed)
  - or `npm install` if you intentionally don’t lock

---

## Quick wins checklist (actionable)

- [ ] Change `npm run dev` to bind to `127.0.0.1` by default; only use `0.0.0.0` when required.
- [ ] Upgrade `vite` (and thus `esbuild`) to remove the dev-server advisory; re-run `npm audit`.
- [ ] Add private/loopback blocking (or allowlist) to `link-preview` + `link-proxy`.
- [ ] Add baseline security headers in `_headers`.
- [ ] Ensure CI/build uses clean installs (`npm ci`) and doesn’t deploy `node_modules/`.

