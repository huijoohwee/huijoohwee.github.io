## Local dev (Cloudflare Pages Functions)

This repo uses **Cloudflare Pages Functions** for `/api/*` endpoints (e.g. `/api/oembed`, `/api/link-preview`, `/api/link-proxy`).

### Run locally with Functions enabled (recommended)

From the repo root:

```bash
npm install
npm run dev:pages
```

Then open:
- `http://localhost:5175/` (serves `./` + `./functions/` as Pages Functions)

### Notes

- `npm run dev` (Vite) does **not** serve `functions/` by itself.
  - This repo includes `vite.config.js` to proxy `/api/*` (and `/__chat_proxy/*`) to `http://localhost:5175`.
  - Run in two terminals:
    - Terminal A: `npm run dev:pages`
    - Terminal B: `npm run dev`
- If you prefer not to use `npx` each time, install Wrangler once:
  - `npm i -D wrangler` (and update lockfile), or
  - `npm i -g wrangler`
