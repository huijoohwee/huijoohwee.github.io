# todo-log

- **Canonical directive**: **STRICTLY COMPLY** with one-row-one-directive (Max 50 words)
- **Table cells**: MUST fill-up all cells in the table; FORBID empty/`-` cells.

## 2026-04-02

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|--------|--------|-----------|--------|-----------------|-------|--------|----------------|--------------------------|--------------------------|--------------|
| ...

## 2026-04-06

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|--------|--------|-----------|--------|-----------------|-------|--------|----------------|--------------------------|--------------------------|--------------|
| Security & Performance Audit | Identify top risks and quick wins | Prioritize dev-server advisory (Vite/esbuild), SSRF hardening for link proxy/preview, and baseline security headers; document actionable fixes. | `package.json`, `functions/api/link-proxy.js`, `functions/api/link-preview.js`, `_headers` | Cloudflare Pages Functions, Vite toolchain | `onRequestGet`, `npm audit` | Query `?url=...`, dependency tree | Audit report + prioritized recommendations | Rank by exploitability + blast radius; prefer config/allowlist mitigations before deeper refactors. | Update Vite/esbuild, default dev host to localhost, block private/loopback URLs, add security headers. | 2026-04-06 |

## sample

| Context | Intent | Directive | Module | Class/Object | Function/Method | Input | Output | Decision Logic | Next Step Recommendation | Updated Date |
|--------|--------|-----------|--------|-----------------|-------|--------|----------------|--------------------------|--------------------------|--------------|
| Engine Architecture | Create a generic 3D board game engine loading worlds entirely from JSON configurations | Extract board data into `singabldr.json` and `tokyopoly.json`, storing them in a dedicated `boards/` subdirectory. | `content/singabldr/singabldr.html`, `boards/*.json` | `Three.js` Engine, `URLSearchParams` | `fetch` JSON | URL `?board=` | Self-contained generic 3D HTML engine | Fetch map data dynamically based on URL parameter to enable switching between multiple geospatial voxel worlds without codebase duplication. | Verify deployment of the `boards/` directory on Cloudflare Pages. | 2026-04-02 |
