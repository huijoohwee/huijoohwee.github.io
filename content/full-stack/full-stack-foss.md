# Hackamap — Full Stack · Critical Path · End-to-End Data Flow
### FOSS › TCO › Free Tier · Local-first · Solo · 3-Hour Build

> Historical archive note: this artifact preserves the original 3-hour Hackamap build plan and its bipartite-era canvas terminology as a dated implementation snapshot, not as the current Knowgrph Flowchart naming contract.

> **Reading key:** Every row = one tool/component. Columns span three dimensions simultaneously:
> **STACK** (what it is) · **CRITICAL PATH** (when you touch it) · **DATA FLOW** (what goes in and out).
> Sort or filter any column as you would in Airtable.

---

## DIMENSION LEGEND

| Prefix | Dimension | Columns |
|---|---|---|
| — | Stack identity | `#` `Tool` `Layer` `License` `Local/Cloud` `Free Tier Limit` `TCO` `Risk` |
| CP | Critical Path | `CP Hour` `CP Task` `CP Blocker` `CP Status` |
| DF | Data Flow | `DF Stage` `Data In` `Transformation` `Data Out` |
| UX | User Journey | `User Story` `Canvas Signal` |

---

## STACK PHILOSOPHY

```
Priority: FOSS (MIT/Apache/BSD) → lowest TCO → best Free Tier
Locality:  local / in-process tools before cloud services
Solo:      single sequential track, each task unblocks the next
Build:     0 → demo-ready in 3 hours, $0 spend
```

---

## MULTI-DIMENSIONAL TABLE

| # | Tool | Layer | License | Local / Cloud | Free Tier Limit | TCO | CP Hour | CP Task | CP Blocker | CP Status | DF Stage | Data In | Transformation | Data Out | User Story | Canvas Signal | Risk |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | **GitHub + GitHub Actions** | SCM · CI/CD | MIT tooling | Cloud SCM · Local clone | 2,000 CI min/month | $0 | **H0:00** | Init repo · `wrangler.toml` · `render.yaml` removed · `pages.json` · env vars · `deploy.yml` | — | ☐ | DF-00 Setup | — | Scaffold directory tree; wire `git push main` → Actions → CF Workers + Pages auto-deploy | Repo skeleton · CI pipeline live | — | — | Low |
| 02 | **Reddit API (PRAW / snoowrap)** | Scraping | MIT | **Local process** | 60 req/min OAuth | $0 | **H0:20** | Fetch `r/startups` + `r/SaaS` raw items | GitHub up | ☐ | DF-01 Ingestion | `GET oauth.reddit.com/r/startups/new?limit=100` | Adapter normalises `score`→`upvotes`, `num_comments`→`comments`, permalink→`source_url`; wraps into `RawItem` | `RawItem[]` · source=`reddit_r_startups` | U1 Founder Research · U2 Hackathon Ideation | N/A — backend only | Low |
| 03 | **HN Algolia API** | Scraping | Free API (public) | **Local process** | Unlimited public | $0 | **H0:20** | Fetch "Ask HN" items | GitHub up | ☐ | DF-01 Ingestion | `GET hn.algolia.com/api/v1/search?tags=ask_hn` | Adapter maps `points`→`upvotes`, `num_comments`→`comments`, `objectID`→`post_id` | `RawItem[]` · source=`hn_ask` | U1 · U2 | N/A — backend only | Low |
| 04 | **PH API v2 (GraphQL)** | Scraping | Free API | **Local process** | 1,000 req/day | $0 | **H0:20** | Fetch PH launches + comments | GitHub up | ☐ | DF-01 Ingestion | `POST api.producthunt.com/v2/api/graphql` — `posts { votesCount commentsCount url }` | Adapter maps `votesCount`→`upvotes`, `commentsCount`→`comments`, `url`→`source_url` | `RawItem[]` · source=`producthunt` | U1 · U2 | N/A — backend only | Low |
| 05 | **OpenClaw** | Orchestration | Free | **Local process** | Free tier | $0 | **H0:30** | Load skills manifest · rate-limit · retry wrapper | Scrapers return items | ☐ | DF-02 Orchestration | `RawItem[]` from DF-01 | Wraps each item in `Task` envelope with `task_id`, `skill`, `retry_count`; enforces concurrency token bucket (DeepSeek ≤10 req/s); dead-letters failures → `data/failed.json` | `Task[]` — 1-to-1 wrap, no field mutation | All U's — reliable ingestion without crashes | N/A — backend only | Low |
| 06 | **LiteLLM** | AI Proxy | MIT | **Local process** (`localhost:4000`) | Self-hosted · free | $0 | **H0:40** | Start local proxy · set `LITELLM_MODEL=deepseek/deepseek-chat` | OpenClaw manifest loaded | ☐ | DF-03 Classification | `Task` envelope carrying one `RawItem` | Receives `POST /v1/chat/completions` from worker; routes to DeepSeek; enforces retry × 1 on malformed JSON; model swap via env var with zero code change | Proxied request to DeepSeek; raw completion back to worker | U1 · U2 | N/A — transparent proxy | Low |
| 07 | **DeepSeek (`deepseek-chat`)** | AI Model | Apache 2.0 (model) | Cloud API | 500 req/day free | $0 | **H0:40** | Classify + tag items via LiteLLM | LiteLLM proxy up | ☐ | DF-03 Classification | `RawItem` `{title, body}` via structured prompt (JSON-only system prompt) | `title`+`body` → `type` (problem/solution) · `label` (≤8-word noun phrase) · `specificity` (named_tool/domain_specific/vague) · `cluster` (one of 8) · `tags` (3–6 strings) · `embedding` (1536-dim float array) | `ClassifiedItem` — `RawItem` + DeepSeek fields merged | U1 · U2 | Node type (left/right) · color · badge icon | Medium — 500 req/day; batch carefully |
| 08 | **JSON Local Storage** (`data/*.json`) | Dedup · Cache · Watchlist | MIT | **Local disk** | Disk only | $0 | **H0:50** | Write dedup cache to `data/cache.json`; init `data/watchlist.json` | DeepSeek returns `ClassifiedItem` | ☐ | DF-04 Deduplication | `ClassifiedItem` | `SHA256(source+post_id)` exact match → merge (increment `asks`, bump `source_count`, update `last_seen_at`); cosine sim of `embedding` vs centroid > 0.85 → merge; else `unique` → write new cache entry; flush to disk after every item | `DeduplicatedItem` — adds `dedup_status` (`unique`/`merged`) + resolved `node_id`; merged items do NOT proceed to Neon upsert | All U's — clean, spam-free canvas | Prevents duplicate nodes | Low |
| 09 | **Neon (PostgreSQL)** | Database | Apache 2.0 (client) | **Cloud DB** (serverless, autoscales to zero) | 0.5 GB · shared compute | $0 | **H1:00** | Provision DB · run `schema.sql` · deploy PL/pgSQL trigger | Dedup cache live | ☐ | DF-05 Storage + Scoring | `DeduplicatedItem` with `dedup_status = "unique"` | `INSERT ... ON CONFLICT DO UPDATE` upserts node; PL/pgSQL trigger fires on `INSERT OR UPDATE OF asks`; computes atomically: `gap_score = LOG(asks+1)/(sol_count+1)` · `urgency_weight` (1.5× if < 7 days) · `pmf_score = gap_score × urgency_weight × LOG(source_count+1) × specificity_mult`; result written back into same row | `nodes` row with all PMF scores (`gap_score=3.367` · `urgency_weight=1.5` · `pmf_score=5.24`); also flushed → `data/nodes.json` after each recalc | U3 Passive Monitoring — high-gap items flagged | Gap Score → node radius + color intensity | Low |
| 10 | **BullMQ** | Queue · Pipeline | MIT | **Local workers** | Self-hosted · free | $0 | **H1:30** | Wire recalc pipeline · define 3 job types | Neon schema + trigger up | ☐ | DF-06 Pipeline | Neon `pg_notify` on insert OR node-cron 60 s tick | Fan-out 1 event → 3 BullMQ jobs: (a) `recompute_edges` — cosine sim of new node embedding vs all solutions → insert `edges` rows where sim > 0.4; (b) `update_cluster_gap_ratios` → aggregate → `data/meta.json`; (c) `update_gap_velocity` — delta vs `data/velocity_snapshot.json` 24 h ago → `nodes.gap_velocity` | Updated `edges` table · `nodes.gap_velocity` float · `data/meta.json` · refreshed `data/nodes.json` | U1 · U2 — canvas stays current without refresh | Edge re-layout · pulse speed | Low |
| 11 | **Upstash Redis** | Queue Infra | MIT (client) | Cloud | 10,000 cmd/day | $0 | **H1:30** | Provision Upstash instance · set `REDIS_URL` env | BullMQ queue defined | ☐ | DF-06 Pipeline (infra) | BullMQ job enqueue/dequeue calls | Persists BullMQ job state (pending, active, completed, failed) across process restarts | Job queue state — enables BullMQ retry and delayed jobs | — | — | Low |
| 12 | **node-cron** | Scheduler | MIT | **Local process** | Self-hosted · free | $0 | **H1:30** | Schedule 60 s tick to trigger BullMQ recalc | BullMQ workers defined | ☐ | DF-06 Pipeline (trigger) | Wall-clock time | Every 60 s: fires `recalcQueue.add('recompute_edges', ...)` + gap_velocity job; every 5 min: fires alert loop | BullMQ `Job[]` enqueued | — | Canvas re-renders every 60 s | Low |
| 13 | **Cloudflare Worker** | API · Edge | Free tier | **Edge (CDN)** | 100,000 req/day | $0 | **H1:15** | Build `/api/graph` CF Worker · bind Neon `DATABASE_URL` | Neon schema up | ☐ | DF-07 API Exposure | `GET /api/graph` from D3 client | Queries Neon via `@neondatabase/serverless`; joins `nodes` + `edges`; injects `clusterColors` HEX map; computes `cluster_gap_ratios` from aggregate query; sets `Cache-Control: max-age=55` (aligns with 60 s D3 poll) | `ApiResponse` JSON — `nodes[]` + `edges[]` + `meta{}` — fully PMF-enriched, D3-ready | All U's — data delivered at edge | Single source of truth for every poll | Low |
| 14 | **Telegram Bot** (`node-telegram-bot-api`) | Alerts · Bot | MIT | Cloud | Unlimited | $0 | **H1:45** | Register bot via BotFather · set webhook · wire `/gaps` + `/watch` commands | CF Worker API live | ☐ | DF-08 Alerting | Neon query: `nodes WHERE pmf_score > threshold AND last_seen_at > NOW() - 5min`; cross-checked against `data/watchlist.json` keywords | Keyword substring match in-process (no extra DB query); format multi-line Telegram string with `gap_score`, `pmf_score`, `gap_velocity`, `source_url`, canvas deep-link | Telegram DM to `chat_id` in watchlist; `source_url` appended for one-tap jump to original post | U3 Passive Monitoring | Alert deep-links into highlighted gap cluster | Low |
| 15 | **D3.js v7** | Frontend · Canvas | MIT | **Browser** (self-hosted via CF Pages) | Unlimited | $0 | **H2:00** | Scaffold bipartite canvas · node/edge render · cluster groups (4×4) · collapse/expand · hover sidebar + `source_url` link | Telegram bot wired | ☐ | DF-09 Canvas Rendering + DF-10 User Interaction | `ApiResponse` JSON from `fetch('/api/graph')` every 60 s | `ApiNode[]` → D3 simulation nodes (positions mutated by force layout); `gap_score`→radius px (scaleSqrt 0–5→6–22px); `pmf_score`→CSS drop-shadow px; `gap_velocity`→pulse CSS class (`pulse-fast` if > 0.5); `source_count`→stroke-width px; `color` HEX→fill+glow; `source_url`→hover sidebar `<a>` tag; slider filter: `gap_score` threshold → opacity per-frame (client-side, no API call) | Rendered bipartite force-directed graph; 4×4 color-coded clusters; collapse/expand chevrons; hover sidebar; gap threshold slider; drag → whitespace highlight | U1 See whitespace · U2 Pick idea in < 5 min · U3 Jump from alert | Node radius · glow · pulse · border · badge · edge opacity · cluster badge · hover panel | Low |
| 16 | **Cloudflare Pages** | Frontend Hosting · CDN | Free tier | **Edge CDN** | Unlimited requests | $0 | **H2:55** | `git push main` → GitHub Actions → CF Pages deploy · public URL live | D3 canvas complete · CF Worker wired | ☐ | DF-09 Canvas Loading | Static build output from `src/app/` | CF Pages serves D3 HTML/JS globally via CDN; browser fetches `index.html` → loads D3 bundle → first `fetch('/api/graph')` call → canvas renders ≤ 3 s | Live canvas at `hackamap.pages.dev` — demo-ready | U1 · U2 — open tab, see live map | Initial bipartite layout on load (≤ 3 s) | Low |

---

## CRITICAL PATH — SOLO SEQUENTIAL TIMELINE

> One founder. One track. Each row unblocks the next. Hard stop: **H3:00 on stage.**

| CP # | Hour | Task | Unblocks | Category | Status |
|---|---|---|---|---|---|
| 1 | H0:00 | GitHub repo init · `wrangler.toml` · `pages.json` · `.github/workflows/deploy.yml` | Everything | Infra · SCM · Deploy | ☐ |
| 2 | H0:10 | Neon DB — provision · run `schema.sql` · PL/pgSQL trigger | Upsert (CP 9) | DB · Infra | ☐ |
| 3 | H0:20 | Reddit API + HN Algolia API + PH API v2 — fetch + normalise raw items | OpenClaw (CP 4) | Scrape · Data | ☐ |
| 4 | H0:30 | OpenClaw skills manifest — concurrency limits · retry · dead-letter to `data/failed.json` | LiteLLM (CP 5) | Orchestration | ☐ |
| 5 | H0:40 | LiteLLM local proxy start · DeepSeek classify + tag via structured prompt | JSON dedup (CP 6) | AI · Proxy | ☐ |
| 6 | H0:50 | JSON Local Storage — write `data/cache.json` dedup · init `data/watchlist.json` | Neon upsert (CP 7) | Local Storage · Dedup | ☐ |
| 7 | H1:00 | Neon upsert + PL/pgSQL trigger → `gap_score` · `urgency_weight` · `pmf_score` | CF Worker (CP 8) | DB · Logic | ☐ |
| 8 | H1:15 | Cloudflare Worker — `/api/graph` endpoint → D3 JSON shape + `clusterColors` + `Cache-Control` | BullMQ (CP 9) | API · Edge | ☐ |
| 9 | H1:30 | BullMQ + node-cron + Upstash Redis — 3-job recalc pipeline · `gap_velocity` snapshot | Telegram (CP 10) | Queue · Pipeline | ☐ |
| 10 | H1:45 | Telegram Bot — BotFather token · webhook · `/gaps` · `/watch` | D3 scaffold (CP 11) | Bot · Infra | ☐ |
| 11 | H2:00 | D3 bipartite canvas scaffold — node/edge render · force simulation | Cluster UX (CP 12) | Frontend · Graph | ☐ |
| 12 | H2:15 | Cluster grouping (4×4) + color ramp | Collapse/hover (CP 13) | Frontend · UX | ☐ |
| 13 | H2:30 | Collapse/expand chevron · cluster hover · edge bundling · hover sidebar with `source_url` | Integration (CP 14) | Frontend · UX | ☐ |
| 14 | **H2:40** | **Wire `/api/graph` CF Worker → D3 canvas · gap threshold slider** | **Alert loop (CP 15)** | **Integration · P0** | **☐** |
| 15 | **H2:50** | **Telegram alert loop — `pmf_score > 3.0` ∩ watchlist → DM with `source_url` deep-link** | **Deploy (CP 16)** | **Bot · Alerts · P0** | **☐** |
| 16 | H2:55 | `git push main` → GitHub Actions → auto-deploy CF Workers + Pages → public URL | Demo (CP 17) | CI/CD · Deploy | ☐ |
| 17 | **H3:00** | **DEMO READY — live scrape on stage · Telegram alert fires live** | — | **Demo · P0** | **☐** |

> **P0 risk:** Telegram live alert (CP 15, H2:50) is the most commonly missed milestone — wire and smoke-test this before any UI polish.

---

## END-TO-END DATA FLOW — STAGE × FIELD TRANSFORMATION

| DF # | Stage | Input Type | Input Example | Tool | Transformation | Output Type | Output Example | PMF Fields Added / Updated |
|---|---|---|---|---|---|---|---|---|
| DF-00 | Setup | — | — | GitHub + Actions | Scaffold repo; wire CI/CD | Repo + pipeline | `deploy.yml` pushing to CF on `main` | — |
| DF-01 | Ingestion | HTTP API responses (3 shapes) | Reddit `score:142`, HN `points:89`, PH `votesCount:210` | Reddit API · HN Algolia · PH API v2 | Source adapters normalise to unified `RawItem`: `upvotes`, `comments`, `source_url`, `raw_text`, `scraped_at` | `RawItem[]` | `{ source:"reddit_r_startups", upvotes:142, comments:28, source_url:"https://reddit.com/..." }` | `asks` · `upvotes` · `source` · `source_url` · `raw_text` · `scraped_at` |
| DF-02 | Orchestration | `RawItem[]` | 47 items from 3 sources | OpenClaw | Wrap each item in `Task{task_id, skill, payload, retry_count}`; enforce token bucket; route failures → `data/failed.json` | `Task[]` | `{ task_id:"cid-001", skill:"classify_and_embed", retry_count:0 }` | — (envelope only, no field mutation) |
| DF-03 | Classification | `Task` → `RawItem{title, body}` | `"AI agents can't remember context across sessions"` | LiteLLM (local) → DeepSeek `deepseek-chat` | Structured JSON-only prompt → `type` · `label` · `specificity` · `cluster` · `tags[]` · `embedding[1536]` | `ClassifiedItem` | `{ type:"problem", label:"AI agent memory persistence", specificity:"named_tool", cluster:"Validation", tags:["ai_agents","memory"], embedding:[0.234,-0.567,...] }` | `type` · `label` · `cluster` · `specificity` · `tags` · `embedding` |
| DF-04 | Deduplication | `ClassifiedItem` | `{ label:"AI agent memory persistence", embedding:[...] }` | JSON Local Storage (`data/cache.json`) | `SHA256(source+post_id)` exact check → merge if hit; cosine sim vs centroid > 0.85 → merge; else unique → write cache entry to disk | `DeduplicatedItem` | `{ dedup_status:"unique", node_id:"node-abc123", similarity:0.12 }` | `dedup_status` · `node_id`; on merge: `asks +=`, `source_count +=`, `last_seen_at` updated |
| DF-05 | Storage + Scoring | `DeduplicatedItem` (status=`unique`) | `{ node_id:"node-abc123", asks:28, upvotes:142, specificity:"named_tool" }` | Neon (PostgreSQL) + PL/pgSQL trigger | `INSERT ... ON CONFLICT DO UPDATE`; trigger: `gap_score=LOG(asks+1)/(sol_count+1)` · `urgency_weight=1.5 if <7d` · `pmf_score=gap×urgency×LOG(src_count+1)×spec_mult`; flush → `data/nodes.json` | `nodes` row | `{ gap_score:3.367, urgency_weight:1.5, pmf_score:5.24 }` | `gap_score` · `urgency_weight` · `pmf_score` |
| DF-06 | Pipeline | `pg_notify` event OR node-cron 60 s tick | `{ event:"gap_recalc_triggered", affected_node:"node-abc123" }` | BullMQ + node-cron + Upstash Redis | Fan-out → 3 jobs: (a) cosine sim new embedding vs solutions → `edges` rows (sim > 0.4); (b) cluster aggregate → `data/meta.json`; (c) gap delta vs `data/velocity_snapshot.json` → `gap_velocity` | Updated `edges` + `nodes.gap_velocity` + `data/meta.json` | `{ strength:0.4 }` edge · `gap_velocity:0.82` | `gap_velocity` · `source_count` (synced) · `cluster_gap_ratio` |
| DF-07 | API Exposure | `GET /api/graph` (browser, every 60 s) | Browser fetch request | Cloudflare Worker | Neon query → join nodes + edges; inject `clusterColors` HEX; aggregate `cluster_gap_ratios`; `Cache-Control: max-age=55` | `ApiResponse` JSON | `{ nodes:[{id,type,label,cluster,gap_score,pmf_score,gap_velocity,source_count,specificity,source_url,color}], edges:[{source,target,strength}], meta:{cluster_gap_ratios,top_pmf_node,last_updated} }` | `color` (HEX injected) · `cluster_gap_ratios` computed inline |
| DF-08 | Alerting | Neon query + `data/watchlist.json` | `pmf_score:5.24 > threshold:3.0`; keyword `"ai agents"` matches label | Telegram Bot + node-telegram-bot-api | Keyword substring match in-process; format multi-line Telegram string; append `source_url` for one-tap post jump; send to `telegram_chat_id` | Telegram DM | `🚨 NEW HIGH-GAP … Gap Score: 3.37 … → Source: https://reddit.com/...` | — (read-only from Neon; `source_url` surfaced to user) |
| DF-09 | Canvas Rendering | `ApiResponse` JSON | `{ nodes:[...], edges:[...], meta:{...} }` | D3.js v7 (browser) | `gap_score`→radius px (scaleSqrt); `pmf_score`→drop-shadow px; `gap_velocity`→pulse CSS class; `source_count`→stroke-width; `color`→fill+glow; `source_url`→hover sidebar `<a>`; force simulation mutates node `{x,y}` | Rendered bipartite graph | Live interactive canvas — 4×4 clusters · collapse/expand · hover panel with source link | — (all visual mappings; no new PMF fields) |
| DF-10 | User Interaction | User gestures (drag, hover, slider, click) | Drag problem node · slide gap threshold · click cluster | D3 force layout (client-side only) | Slider: `gap_score` ≥ val → opacity 1.0, else 0.1 (per-frame, no API call); drag: `highlightEmptyClusters(cluster)`; cluster click: snap positions + `simulation.alpha(0.3).restart()`; hover: `source_url` panel | Visual state update | Whitespace lit · threshold filter applied · cluster collapsed | — (client-side only; reads cached `ApiResponse`) |
| DF-11 | Final Canvas | All upstream data | 87 problem nodes · 34 solution nodes · live PMF scores | D3.js v7 + CF Pages | Synthesis of DF-01→DF-10 into one live interactive gap map | `hackamap.pages.dev` | Bright purple pulsing node (`gap_score 3.37` · `pmf_score 5.24`) · empty Capital cluster whitespace · Telegram fired | All PMF fields visible to founder |

---

## USER JOURNEY × TOOL COVERAGE

| User Story | Goal | Entry Point | Tools Touched (in order) | Canvas Moment | Exit / Action |
|---|---|---|---|---|---|
| **U1 — Founder Research** | See problems vs solutions across last 7 days | Opens `hackamap.pages.dev` | CF Pages → D3 → `GET /api/graph` (CF Worker) → Neon | Bipartite canvas loads ≤ 3 s; biggest nodes = highest `gap_score` | Drags problem node → empty cluster whitespace lights up → idea validated |
| **U2 — Hackathon Ideation** | Find validated idea in < 5 min | Opens canvas · types domain in filter | D3 slider/filter (client-side) → `tags` + `cluster` filter → canvas opacity update | Cluster with `cluster_gap_ratio = 1.0` glows; hover sidebar shows source post | Clicks `source_url` in hover panel → reads original Reddit/HN post → picks idea |
| **U3 — Passive Monitoring** | Receive alert when high-gap cluster appears | Sends `/watch ai agents` to Telegram Bot | Telegram Bot → `data/watchlist.json` → BullMQ alert worker → Neon query → Telegram DM | Follows deep-link `?highlight=node-id` → canvas auto-highlights node | Taps `→ Source` in Telegram → opens original post → acts on gap |

---

## COST-BENEFIT SNAPSHOT

| Tool | License | Local / Cloud | Free Tier | Est. 3h Usage | Headroom | Risk |
|---|---|---|---|---|---|---|
| GitHub + Actions | MIT tooling | Cloud | 2,000 CI min/month | ~10 push cycles | ✅ Very high | Low |
| Reddit API (PRAW) | MIT | Local | 60 req/min OAuth | ~300 requests | ✅ Well within | Low |
| HN Algolia API | Free API | Local | Unlimited | ~200 queries | ✅ No limit | Low |
| PH API v2 | Free API | Local | 1,000 req/day | ~200 requests | ✅ High | Low |
| OpenClaw | Free | Local | Free tier | Light orchestration | ✅ Comfortable | Low |
| LiteLLM | MIT | Local | Self-hosted | 500 proxied calls | ✅ No cost | Low |
| DeepSeek `deepseek-chat` | Apache 2.0 | Cloud API | 500 req/day free | ~500 classifications | ⚠️ At limit — batch | Medium |
| JSON Local Storage | MIT | **Local disk** | Disk only | ~1k cache entries | ✅ Zero infra | Low |
| Neon (PostgreSQL) | Apache 2.0 (client) | **Cloud DB** | 0.5 GB · autoscales to zero | ~50 MB (≤5k nodes) | ✅ Very high | Low |
| BullMQ | MIT | Local workers | Self-hosted | 3 jobs × 6 runs/hr | ✅ No cost | Low |
| Upstash Redis | MIT (client) | Cloud | 10,000 cmd/day | ~1k queue ops | ✅ Comfortable | Low |
| node-cron | MIT | Local | Self-hosted | 1 schedule | ✅ Zero overhead | Low |
| Cloudflare Worker | Free tier | Edge | 100,000 req/day | ~5k API calls | ✅ Very high | Low |
| Cloudflare Pages | Free tier | Edge CDN | Unlimited | Browser-side | ✅ No server cost | Low |
| Telegram Bot | MIT (client) | Cloud | Unlimited | ~50 test messages | ✅ No limit | Low |
| D3.js v7 | MIT | Browser | Self-hosted | Browser-side | ✅ No server cost | Low |
| **TOTAL** | **All FOSS / Free API** | **Local-first** | — | — | **$0/month** | **Low** |

---

*Hackamap · 100% FOSS · $0 TCO · Solo Founder Build · Local-First · 3-Hour Demo*
