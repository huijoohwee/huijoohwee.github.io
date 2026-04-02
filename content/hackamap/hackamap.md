# Hackamap
### Startup Idea Radar · Gap Map · Knowledge Graph Canvas
*Pitch Deck + PRD + TAD*

---

## PART 1 — PITCH DECK

### One-liner
**Hackamap makes product-market fit visible in real time** — turning every customer problem into a live map that shows founders exactly where the money is still unclaimed.

---

### Slide 1 · Problem
Young founders and hackathon teams waste days on manual research:
- "Is this idea already built?" → ProductHunt rabbit hole, 3 hrs
- "Is anyone asking for this?" → Reddit spelunking, no structure
- "Where's the gap?" → gut feel, guesswork

**No tool cross-references what's being built against what people are screaming for.**

---

### Slide 2 · Solution
**Hackamap** is a live knowledge graph canvas that:
1. **Live Interactive Canvas** — D3-powered bipartite graph connecting what people desperately ask for with every solution already being built
2. **Gap Score** — one number that flags the biggest unmet needs before anyone else sees them
3. **Opportunity Finder** — drag any problem node and watch whitespace light up; that empty space is your next billion-dollar idea

One graph. Built in 3 hours. Updated continuously.

---

### Slide 3 · Live Demo Flow
```
[Today's ProductHunt launches]   →  LiteLLM → DeepSeek  →  Solution nodes
[Reddit r/startups this morning] →  LiteLLM → DeepSeek  →  Problem nodes
                                                                ↓
                             Gap Score Engine (LOG(asks+1) / (solutions+1))
                                                                ↓
                     D3 bipartite canvas · Telegram alert · BullMQ · OpenClaw
```
**Demo moment:** On stage, scrape live → show a real gap in real time.

---

### Slide 4 · Market
- **3.2M** hackathon participants globally (2025, Devpost)
- **18M+** indie hackers / solo founders (Indie Hackers community)
- **Primary:** hackathon teams, solo founders, startup researchers
- **Secondary:** VCs doing landscape mapping, accelerators doing cohort analysis

---

### Slide 5 · Feature Comparison Matrix

| Feature | Hackamap | ProductHunt | Exploding Topics | Google Trends | Devpost |
|---|---|---|---|---|---|
| Problem-side signal | ✅ Live scrape | ❌ | Partial | Partial | ❌ |
| Solution-side mapping | ✅ Bipartite graph | ✅ Launches only | ❌ | ❌ | ✅ Demos only |
| Cross-reference both | ✅ | ❌ | ❌ | ❌ | ❌ |
| Gap Score (quantified) | ✅ | ❌ | ❌ | ❌ | ❌ |
| Real-time alerts | ✅ Telegram | ❌ | ❌ Newsletter | ❌ | ❌ |
| Open-source / $0 | ✅ | ❌ Paid | ❌ Paid | ✅ | ✅ |
| Cluster grouping | ✅ 4×4 clusters | ❌ | ❌ | ❌ | ❌ |
| **Category** | **Graph · AI · Alerts** | **Discovery** | **Trends** | **Search** | **Demos** |

---

### Slide 6 · Ask
**Hackathon:** Ship a working demo. Win.
**Post-hackathon:** Open-source the core, build a community around the gap map.

---

## PART 2 — PRODUCT REQUIREMENTS DOCUMENT (PRD)

### Overview
| Field | Value |
|---|---|
| Product | Hackamap |
| Version | 0.1.0 (Hackathon MVP) |
| Timeline | **3-hour build** |
| Deployment | Cloudflare Workers (API) + Cloudflare Pages (frontend) |
| Source Control | GitHub + GitHub Actions (CI/CD) |

---

### Goals
1. Ingest live data from ≥3 public sources with no manual intervention
2. Surface a bipartite D3 canvas with cluster grouping in a browser tab — no login required
3. Compute and display a **Gap Score** per problem node
4. Deliver Telegram alerts when a high-gap problem is detected

### Non-Goals (MVP)
- User accounts / auth · Mobile native app · Real-time collaboration on canvas

---

### User Stories

**U1 — Founder Research:** I open Hackamap and see a canvas of problems and solutions from the last 7 days to identify where no one is building.

**U2 — Hackathon Ideation:** I query "EdTech" and see clustered pain points with Gap Scores so I can pick a validated idea in under 5 minutes.

**U3 — Passive Monitoring:** I add keywords to my Telegram watchlist and receive alerts when a new high-gap cluster appears in my domain.

---

### Canvas Feature Set (from Build Plan)

- **Cluster groups:** 4 problem clusters (Team building, Validation, Growth, Capital) × 4 solution clusters (Network, Launch platforms, Build & hire, Funding & growth) — each color-coded from ramp palette
- **Collapse / expand:** clicking a cluster header shrinks it to a label bar with animated chevron flip; edges dynamically re-route to the header's Y position
- **Cluster-level hover:** highlights all edges from that cluster, dims everything else; tooltip shows node count, edge count, and open gaps
- **Node-level hover:** traces individual edges; sidebar shows source posts, Gap Score, related nodes
- **Gap highlight:** Capital cluster (purple, gap = 1.0) and scattered Validation/Growth gap nodes surface the real whitespace

---

### Acceptance Criteria
| Feature | Criterion |
|---|---|
| Scrape pipeline | ≥50 items ingested per source per run, zero crashes |
| Classification | Latency < 3s per item on CPU |
| Gap Score | Updates visible in canvas within 60s of recompute |
| Canvas | Loads ≤ 3s with 200 nodes; pan/zoom smooth |
| Telegram alert | Delivered < 5 min after trigger condition |

---

## PART 3 — TECHNICAL ARCHITECTURE DOCUMENT (TAD)

### Stack — FOSS › TCO › Free Tier · Local before Cloud

> Selection order: **FOSS** (MIT/Apache/BSD) first → lowest **TCO** → best **Free Tier**. Locality preference: **local / in-process** tools before cloud services. Every tool below costs $0/month.

| Priority | Layer | Tool | Role | License | Cost |
|---|---|---|---|---|---|
| LOCAL 1 | **Source control / CI** | GitHub + GitHub Actions | Repo, PR checks, auto-deploy to Cloudflare on push to `main` | MIT tooling / Free tier | $0 |
| LOCAL 2 | **Scraping** | Reddit API (PRAW) + HN Algolia API + PH API v2 | Official public APIs — in-process, no proxy needed | MIT (clients) / Free API | $0 |
| LOCAL 3 | **Orchestration** | OpenClaw | Agent skills manifest, pipeline sequencing, API rate-limiting, retry | — / Free | $0 |
| LOCAL 4 | **AI proxy** | LiteLLM (self-hosted, local process) | Unified model-agnostic router; swap models without code changes | MIT | $0 |
| LOCAL 5 | **AI model** | DeepSeek API (`deepseek-chat`) | Problem/solution classify + keyword extraction via LiteLLM | Apache 2.0 (model) / Free tier | $0 |
| LOCAL 6 | **Local storage / dedup** | JSON Local Storage (`data/*.json`) | Flat-file dedup cache + watchlist — zero infra, instant reads; flushed to Neon on interval | MIT | $0 |
| LOCAL 7 | **Queue / pipeline** | BullMQ + Upstash Redis | Gap recalculation job queue, retry logic; Upstash backs BullMQ (10k cmd/day free) | MIT / Free tier | $0 |
| CLOUD 1 | **Database** | Neon (PostgreSQL) | Persistent nodes, edges, gap_score; serverless Postgres, 0.5 GB free, autoscales to zero | Apache 2.0 (client) / Free tier | $0 |
| CLOUD 2 | **API hosting** | Cloudflare Workers | Edge-hosted `/api/graph` + alert loop; 100k req/day free | — / Free tier | $0 |
| CLOUD 3 | **Frontend hosting** | Cloudflare Pages | Static D3 canvas, globally CDN-served; unlimited requests free | — / Free tier | $0 |
| CLOUD 4 | **Bot channel** | Telegram Bot + node-telegram-bot-api | User DM intake, real-time alerts, `/gaps` & `/watch` commands | MIT / Free | $0 |
| ANY | **Frontend** | D3.js v7 | Force-directed bipartite canvas | MIT | $0 |

**Total TCO: $0/month**

---

### Data Schema (Neon — PostgreSQL)

```sql
CREATE TABLE nodes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type       TEXT CHECK (type IN ('problem','solution')),
  label      VARCHAR(255),
  metadata   JSONB,           -- { asks, tags, source_url }
  gap_score  FLOAT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE edges (
  problem_id  UUID REFERENCES nodes(id),
  solution_id UUID REFERENCES nodes(id),
  strength    FLOAT,
  PRIMARY KEY (problem_id, solution_id)
);
CREATE INDEX ON edges(problem_id);
CREATE INDEX ON edges(solution_id);
```

`gap_score = LOG(asks + 1) / (solution_count + 1)` — computed via Neon trigger on upsert; result also written back to `data/nodes.json` for zero-latency local reads.

---

### Sequence — End to End

```
1. Reddit API + HN Algolia + PH API v2     →  fetch raw items (official APIs, no proxy)
2. OpenClaw                                →  skills manifest — rate-limit, retry, fan-out
3. LiteLLM → DeepSeek (deepseek-chat)     →  classify problem/solution, extract keywords
4. JSON Local Storage (data/cache.json)   →  deduplicate against local flat-file cache
5. BullMQ + node-cron                     →  enqueue gap recalculation jobs
6. Neon (PostgreSQL)                      →  upsert node; trigger recomputes gap_score; flush → data/nodes.json
7. Cloudflare Worker /api/graph           →  serve D3-ready JSON from Neon at edge
8. D3 Canvas (Cloudflare Pages)           →  poll /api/graph every 60s, re-render force layout
9. Alert loop                             →  every 5min: gap_score > 0.7 ∩ watchlist → Telegram
```

---

## PART 4 — CRITICAL PATH: 0 → 1 IN 3 HOURS (FREE TIER)

> **Solo build.** Single track — tasks sequenced so each unblocks the next. Hard deadline: H3:00 demo on stage.

| Task | Hour | Status | Category |
|---|---|---|---|
| GitHub repo init + `wrangler.toml` + Pages config | 0:00 | ☐ | Infra, SCM, Deploy |
| Neon DB — provision + schema (nodes, edges, gap_score trigger) | 0:10 | ☐ | DB, Infra |
| Reddit API + HN Algolia API + PH API — fetch raw items | 0:20 | ☐ | Scrape, Data |
| OpenClaw skills manifest — rate-limit + retry wrapper | 0:30 | ☐ | Orchestration |
| LiteLLM local proxy + DeepSeek API — classify + tag items | 0:40 | ☐ | AI, Data |
| JSON Local Storage — write dedup cache to `data/cache.json` | 0:50 | ☐ | Local Storage |
| Neon upsert + gap_score trigger + flush → `data/nodes.json` | 1:00 | ☐ | DB, Logic |
| Cloudflare Worker — `/api/graph` endpoint → D3 JSON shape | 1:15 | ☐ | API, Edge |
| BullMQ + node-cron — live recalc pipeline wiring | 1:30 | ☐ | Queue, Orchestration |
| Telegram Bot — token + webhook + `/gaps` / `/watch` | 1:45 | ☐ | Bot, Infra |
| D3 bipartite canvas — node/edge scaffold (CF Pages) | 2:00 | ☐ | Frontend, Graph |
| Cluster grouping (4×4) + color ramp | 2:15 | ☐ | Frontend, UX |
| Collapse/expand + hover + edge bundling | 2:30 | ☐ | Frontend, UX |
| **Wire `/api/graph` CF Worker → D3 canvas** | **2:40** | **☐** | **Integration** |
| Telegram alert loop — gap_score > 0.7 → DM | 2:50 | ☐ | Bot, Alerts, P0 |
| `git push main` → GitHub Actions → auto-deploy CF Workers + Pages | 2:55 | ☐ | CI/CD, Deploy |
| **DEMO READY: live scrape on stage** | **3:00** | **☐** | **Demo, P0** |

> **P0 risk:** Telegram live alert on stage (H2:50 task) is the most commonly missed milestone — wire and test this before polishing the UI.

---

## PART 5 — COST-BENEFIT MATRIX

| Tool | Role in Hackamap | License | Local / Cloud | Free Tier Limit | Est. Hackathon Usage | Headroom | Category | Risk |
|---|---|---|---|---|---|---|---|---|
| GitHub + Actions | Source control + CI/CD auto-deploy on `git push` | MIT tooling | Local clone + Cloud SCM | 2,000 CI min/month | ~10 push cycles | ✅ Very high | SCM, Deploy | Low |
| JSON Local Storage (`data/*.json`) | Dedup cache + watchlist — zero infra, instant reads | MIT | **Local** | Disk only | ~1k entries | ✅ Zero infra | Memory, Cache | Low |
| Reddit API (PRAW) | r/startups scraping via official OAuth | MIT | Local process | 60 req/min | ~200–500 requests | ✅ Well within | Scrape, Data | Low |
| HN Algolia API | Ask HN items via public Algolia endpoint | Free API | Local process | Unlimited | ~500 queries | ✅ No limit | Scrape, Data | Low |
| PH API v2 | ProductHunt launches + comments | Free API | Local process | 1,000 req/day | ~200 requests | ✅ High | Scrape, Data | Low |
| OpenClaw | Skills manifest, rate-limiting, retry | — / Free | Local process | Free tier | Light orchestration | ✅ Comfortable | Orchestration | Low |
| LiteLLM | Local AI proxy router — model-agnostic | MIT | **Local process** | Self-hosted / free | 500 proxied calls | ✅ No cost | AI, Proxy | Low |
| DeepSeek API (`deepseek-chat`) | Classify + tag items via LiteLLM | Apache 2.0 (model) | Cloud API | 500 req/day free | ~500 classifications | ⚠️ At limit — batch carefully | AI, Classification | Medium |
| BullMQ | Gap recalc job queue + retry workers | MIT | Local process | Self-hosted / free | 1 queue, ~6 runs/hr | ✅ No cost | Queue | Low |
| Upstash Redis | BullMQ backing store | MIT (client) | Cloud | 10,000 cmd/day | ~1k queue ops | ✅ Comfortable | Queue Infra | Low |
| Neon (PostgreSQL) | Persistent nodes, edges, gap_score | Apache 2.0 (client) | **Cloud DB** | 0.5 GB, autoscales to zero | ~50 MB (≤5k nodes) | ✅ Very high | DB, Graph | Low |
| Cloudflare Workers | Edge API — `/api/graph`, alert loop | — / Free tier | **Edge** | 100,000 req/day | ~5k API calls | ✅ Very high | Deploy, API | Low |
| Cloudflare Pages | Static D3 canvas CDN hosting | — / Free tier | **Edge** | Unlimited requests | Browser-side only | ✅ No server cost | Deploy, Frontend | Low |
| Telegram Bot | DM intake + alerts channel | MIT (client) | Cloud | Unlimited | ~50 test messages | ✅ No limit | Bot, Alerts | Low |
| D3.js v7 | Frontend canvas rendering | MIT | Browser | Self-hosted | Browser-side only | ✅ No server cost | Frontend | Low |
| **Total** | | **All FOSS or free-API** | **Local-first** | | | **$0/month** | **Full stack** | **Low** |

---

## REPO STRUCTURE

```
Hackamap/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions → CF Workers + Pages on push to main
├── wrangler.toml               # Cloudflare Workers config
├── package.json
├── data/                       # JSON Local Storage (gitignored in prod)
│   ├── cache.json              # Dedup session cache
│   └── watchlist.json          # User keyword watchlist (local dev)
├── src/
│   ├── scraper/                # Reddit API (PRAW) + HN Algolia + PH API v2 clients
│   ├── worker/                 # LiteLLM→DeepSeek classify + JSON dedup + Neon upsert
│   ├── openclaw/               # OpenClaw skills manifest + rate-limit middleware
│   ├── queue/                  # BullMQ workers + node-cron schedules
│   ├── app/                    # CF Worker API — /api/graph + D3 canvas static (Pages)
│   └── bot/                    # Telegram bot handlers + alert loop
├── sql/
│   └── schema.sql              # Neon schema + gap_score trigger
└── README.md
```

---

## End-to-End User Journey + Workflow + Data Flow (Ingestion → D3 Visualization)

This single table is the complete live blueprint from any source screaming a problem → classified node → Gap Score → beautiful D3 gap map that founders can drag and explore in real time.

| ID | Stage | Workflow Step | Data Flow (Sources → Output) | Tools / Components | User Journey Touchpoint | Rendering in D3 Canvas | Notes / Critical Path (3h MVP) |
|---|---|---|---|---|---|---|---|
| DF-01 | Ingestion | Live public scraping (no manual intervention) | reddit (r/startups), producthunt (launches + comments), hackernews (Ask HN) → raw unstructured items | Reddit API (PRAW) + HN Algolia API + PH API v2 | U1 (Founder Research) & U2 (Hackathon Ideation) – fresh signals appear instantly | N/A (backend only) | H0:20 – official API fetch |
| DF-02 | Orchestration | Skills manifest — rate-limit + fan-out | Raw fetch tasks → OpenClaw skills DAG controls concurrency, retries, API auth | OpenClaw | All U's – reliable ingestion without crashes | N/A (backend only) | H0:30 – OpenClaw wiring |
| DF-03 | Classification | AI tagging via LiteLLM proxy → DeepSeek | Raw posts → LiteLLM (local) routes to DeepSeek (`deepseek-chat`) → classified as **problem** or **solution** + keywords + tags | LiteLLM + DeepSeek API | U1 & U2 – problems vs solutions separated automatically | Nodes typed & colored (problem = left, solution = right) | H0:40 – DeepSeek classification |
| DF-04 | Deduplication | Local flat-file cache check | Classified items → checked against `data/cache.json`; duplicates dropped before DB write | JSON Local Storage | All U's – clean, spam-free canvas | Prevents duplicate nodes & crossed edges | H0:50 – local JSON dedup |
| DF-05 | Storage & Scoring | Neon upsert + auto gap_score trigger | Deduplicated nodes → Neon (`nodes` + `edges`); **gap_score = LOG(asks+1)/(solutions+1)** on insert trigger; result flushed back to `data/nodes.json` | Neon (PostgreSQL) + SQL trigger + JSON flush | U3 (Passive Monitoring) – high-gap items flagged | Gap Score on every problem node (color intensity + label) | H1:00 – Neon + trigger |
| DF-06 | Pipeline | Gap recalculation job queue | New/updated nodes → BullMQ job enqueued → node-cron fires full recalc | BullMQ + node-cron | U1 & U2 – canvas stays current without manual refresh | Edges & node positions re-layout on gap change | H1:30 – BullMQ wiring |
| DF-07 | API Exposure | Graph JSON endpoint (edge-hosted) | Aggregated nodes/edges/gap_scores from Neon → clean D3-ready JSON via CF Worker | Cloudflare Worker `/api/graph` | All U's – data delivered to browser at edge | Single source of truth for every poll | H1:15 – CF Worker endpoint |
| DF-08 | Alerting | High-gap detection & delivery | gap_score > 0.7 ∩ user watchlist (`data/watchlist.json`) → instant Telegram alert with direct canvas link | Telegram Bot + BullMQ alert worker | U3 (Passive Monitoring) – "new billion-dollar gap found" | Alert links into highlighted gap cluster | H2:50 – P0 Telegram live alert |
| DF-09 | Canvas Loading | Browser loads interactive graph (CDN) | User opens hackamap (CF Pages) → `fetch('/api/graph')` every 60 s | D3.js v7 + Cloudflare Pages | U1 & U2 – open tab and see live map | Initial bipartite force-directed layout (≤3 s load) | H2:00 – D3 scaffold + H2:40 convergence |
| DF-10 | User Interaction | Drag, hover, cluster collapse, gap exploration | Polled JSON + user actions → real-time canvas updates | D3 force layout + custom 4×4 clusters | U1 (see whitespace), U2 (pick validated idea in <5 min), U3 (jump from alert) | • 4×4 clusters (Team/Validation/Growth/Capital × Network/Launch/Build/Funding)<br>• Collapse/expand with animated chevrons<br>• Hover traces edges + sidebar<br>• Drag problem → whitespace lights up | H2:15–2:30 – cluster UX + hover |
| DF-11 | Final Visualization | Bipartite knowledge graph canvas | All upstream data synthesized → live interactive Gap Map | D3.js v7 (client-side, CF Pages) | Complete journey: Research → Ideation → Monitoring → Action | Full D3 bipartite graph with Gap Score highlights, edge bundling, zoom/pan, gap threshold slider | Demo-ready at H3:00 on CF Pages |

**How to use this table**
- **Filter by column** → e.g. filter "User Journey" = U3 to see only passive monitoring flow.
- **Filter by Source** → the Ingestion row shows all 3 official API sources (Reddit, ProductHunt, Hacker News).
- **Sort by Critical Path** → see exact 3-hour solo build order.
- Everything runs on **$0 TCO** (Cloudflare + Neon free tiers, local-first) and updates **continuously**.

---

*Hackamap · 100% FOSS · $0 TCO · Solo Founder Build · Local-First*