# Hackamap — End-to-End Data Flow
### Ingestion → PMF Gap Score → D3 Visualization

Every step below traces **one single example item** through the full pipeline.
Raw noise → classified node → Gap Score → live D3 canvas → Telegram alert.

---

## PMF INSIGHT MODEL

Hackamap measures product-market fit as **whitespace density** on a bipartite graph.

| PMF Signal | How Hackamap Measures It | Field |
|---|---|---|
| Demand intensity | Upvotes + comment count on problem posts | `asks` |
| Supply coverage | Count of solution nodes within cosine distance < 0.4 | `solution_count` |
| Raw gap magnitude | `LOG(asks + 1) / (solution_count + 1)` | `gap_score` |
| Urgency | Recency-weighted asks (posts < 7 days get 1.5× multiplier) | `urgency_weight` |
| Specificity | Named technology/tool vs vague frustration (DeepSeek tag) | `specificity` ENUM |
| Cluster saturation | Ratio of gap nodes to total nodes in cluster | `cluster_gap_ratio` |
| Velocity | Gap score delta over last 24 hrs (rising = accelerating demand) | `gap_velocity` |
| Reach | Unique sources citing same problem (cross-platform signal) | `source_count` |

**Composite PMF Score** (used in Telegram alerts and canvas highlight intensity):
```
pmf_score = gap_score × urgency_weight × LOG(source_count + 1) × specificity_multiplier
```
Where `specificity_multiplier`: `named_tool` = 1.5 · `domain_specific` = 1.2 · `vague` = 0.8

---

## DATA FIELD REQUIREMENTS

### Node Schema (Neon — PostgreSQL `nodes` table)

| Field | Type | Required | Source | PMF Role |
|---|---|---|---|---|
| `id` | UUID PRIMARY KEY | ✅ | System (`gen_random_uuid()`) | Primary key |
| `type` | TEXT CHECK IN ('problem','solution') | ✅ | DeepSeek via LiteLLM | Graph side assignment |
| `label` | VARCHAR(255) | ✅ | DeepSeek via LiteLLM | Canvas display text |
| `source` | VARCHAR(64) | ✅ | Scraper | Cross-platform reach calc |
| `source_url` | TEXT | ✅ | Reddit / HN / PH API | Telegram link |
| `raw_text` | TEXT | ✅ | Official API | DeepSeek re-classification |
| `asks` | INT | ✅ | Scraped | Demand intensity |
| `upvotes` | INT | ✅ | Scraped | Demand intensity |
| `comments` | INT | ✅ | Scraped | Demand intensity |
| `tags` | JSONB | ✅ | DeepSeek via LiteLLM | Domain filter + cluster routing |
| `embedding` | JSONB (1536-dim) | ✅ | DeepSeek via LiteLLM | Cosine similarity for edges |
| `gap_score` | FLOAT | ✅ | PL/pgSQL trigger | Primary PMF metric |
| `urgency_weight` | FLOAT | ✅ | PL/pgSQL trigger | Recency multiplier |
| `pmf_score` | FLOAT | ✅ | PL/pgSQL trigger | Composite alert score |
| `gap_velocity` | FLOAT | ❌ computed | node-cron job | Rising vs falling demand |
| `source_count` | INT | ❌ computed | node-cron job | Cross-platform reach |
| `specificity` | TEXT CHECK IN ('named_tool','domain_specific','vague') | ✅ | DeepSeek via LiteLLM | PMF multiplier |
| `cluster` | TEXT CHECK IN (8 cluster values) | ✅ | DeepSeek via LiteLLM | Canvas grouping |
| `scraped_at` | TIMESTAMPTZ | ✅ | System | TTL + recency weight |
| `last_seen_at` | TIMESTAMPTZ | ✅ | System | Dedup + freshness |

### Edge Schema (Neon — PostgreSQL `edges` table)

| Field | Type | Required | Source | PMF Role |
|---|---|---|---|---|
| `problem_id` | UUID REFERENCES nodes(id) | ✅ | System | FK → nodes |
| `solution_id` | UUID REFERENCES nodes(id) | ✅ | System | FK → nodes |
| `strength` | FLOAT [0–1] | ✅ | Cosine similarity | Edge weight / canvas opacity |
| `computed_at` | TIMESTAMPTZ | ✅ | System | Staleness detection |

### Local Cache Schema (`data/cache.json` — JSON Local Storage)

```json
{
  "version": 1,
  "entries": {
    "<sha256(source + post_id)>": {
      "node_id": "node-uuid-abc123",
      "label_hash": "<sha256(normalised_label)>",
      "embedding_centroid": [0.234, -0.567, "..."],
      "last_seen_at": "2026-03-27T12:45:00Z",
      "source_count": 1
    }
  }
}
```

Entries written by the dedup step (DF-04); flushed to Neon on each pipeline run. Prevents a DB round-trip for known items.

### Local Watchlist Schema (`data/watchlist.json` — JSON Local Storage)

```json
{
  "keywords": ["ai agents", "memory", "edtech"],
  "pmf_threshold": 3.0,
  "telegram_chat_id": "123456789"
}
```

### API Response Schema (`/api/graph` — Cloudflare Worker)

| Field | Type | D3 Usage | PMF Usage |
|---|---|---|---|
| `nodes[].id` | STRING | Node identity | — |
| `nodes[].type` | STRING | Left/right bipartite side | — |
| `nodes[].label` | STRING | Canvas text | — |
| `nodes[].cluster` | STRING | Cluster grouping + color | — |
| `nodes[].gap_score` | FLOAT | Node radius scaling | Primary gap metric |
| `nodes[].pmf_score` | FLOAT | Glow intensity (high = bright) | Alert trigger |
| `nodes[].gap_velocity` | FLOAT | Pulse animation speed | Momentum signal |
| `nodes[].source_count` | INT | Border thickness | Cross-platform reach |
| `nodes[].specificity` | STRING | Icon badge on node | Actionability |
| `nodes[].color` | HEX | Node fill | Cluster identity |
| `nodes[].x`, `nodes[].y` | FLOAT | Simulation seed position | — |
| `edges[].source` | STRING | D3 link source | — |
| `edges[].target` | STRING | D3 link target | — |
| `edges[].strength` | FLOAT | Line opacity + width | Similarity signal |
| `meta.cluster_gap_ratios` | OBJECT | Cluster header badge | Cluster-level PMF |
| `meta.top_pmf_node` | STRING | Canvas highlight on load | Alert preview |
| `meta.last_updated` | ISO8601 | Freshness indicator | — |

---

## PIPELINE STEPS

---

### DF-01 — Ingestion (Reddit API · HN Algolia API · PH API v2)

**Sources:** Reddit `r/startups` `r/SaaS` (PRAW OAuth), HN "Ask HN" (Algolia public endpoint), ProductHunt launches + comments (PH API v2).

**Input:** HTTP GET requests to official APIs — no proxy, no scraping middleware.

```js
// Reddit — PRAW-style fetch (Node snoowrap)
GET https://oauth.reddit.com/r/startups/new?limit=100
Authorization: Bearer <oauth_token>

// HN Algolia
GET https://hn.algolia.com/api/v1/search?query=Ask+HN&tags=ask_hn&hitsPerPage=100

// ProductHunt API v2
POST https://api.producthunt.com/v2/api/graphql
{ posts(order: NEWEST, first: 50) { nodes { id name tagline votesCount commentsCount url } } }
```

**Raw output per item (uniform shape after normalisation):**

```json
{
  "source": "reddit_r_startups",
  "post_id": "1fghjkl",
  "url": "https://reddit.com/r/startups/comments/1fghjkl/",
  "title": "AI agents are cool but I spent 8 hours on prompt engineering just to get it to remember context across sessions 😩",
  "body": "Anyone else hitting this wall? Need something that persists memory without paying $50/mo...",
  "timestamp": "2026-03-27T12:45:00Z",
  "upvotes": 142,
  "comments": 28
}
```

**Data transformation:**
- Per-API response shape → unified `RawItem` interface via source-specific adapters (`src/scraper/{reddit,hn,ph}.ts`)
- `upvotes` normalised across platforms (Reddit `score`, HN `points`, PH `votesCount` → all → `upvotes`)
- `comments` = Reddit `num_comments` / HN `num_comments` / PH `commentsCount`
- `asks` initialised as `comments` value; incremented on dedup merge (DF-04)
- `source_url` always set to canonical post permalink

**PMF fields captured here:** `asks` · `upvotes` · `source` · `source_url` · `raw_text` · `scraped_at`

---

### DF-02 — Orchestration (OpenClaw)

**Input:** array of `RawItem[]` from DF-01 scrapers.

**What OpenClaw does:**
- Loads skills manifest (`src/openclaw/manifest.json`) defining concurrency limits, retry policy, and fan-out order
- Rate-limits downstream calls (DeepSeek: max 10 req/s; Neon: max 50 concurrent connections)
- Wraps each item in a `Task` envelope with correlation ID for end-to-end tracing
- On failure: exponential backoff × 3, then dead-letter to `data/failed.json`

```json
// OpenClaw Task envelope
{
  "task_id": "task-cid-001",
  "skill": "classify_and_embed",
  "payload": { /* RawItem */ },
  "retry_count": 0,
  "enqueued_at": "2026-03-27T12:45:05Z"
}
```

**Data transformation:**
- `RawItem[]` → `Task[]` (1-to-1 wrap, no field mutation)
- Failed tasks appended to `data/failed.json` for manual re-run
- Concurrency token bucket enforced before handing off to DF-03

---

### DF-03 — Classification + Embedding (LiteLLM → DeepSeek)

**Input:** `Task` envelope carrying one `RawItem`.

**LiteLLM** runs as a local proxy process (`litellm --model deepseek/deepseek-chat --port 4000`). The worker calls `http://localhost:4000/v1/chat/completions` — model is swappable via env var without code changes.

**Prompt sent to DeepSeek (`deepseek-chat`):**

```
System: You are a startup signal classifier. Respond ONLY with valid JSON — no markdown, no preamble.

User: Classify this post and return JSON with these exact fields:
- type: "problem" or "solution"
- label: concise noun phrase (max 8 words)
- specificity: "named_tool" | "domain_specific" | "vague"
- cluster: one of [Team building, Validation, Growth, Capital, Network, Launch platforms, Build & hire, Funding & growth]
- tags: array of 3–6 lowercase snake_case strings
- embedding: 1536-dim float array representing semantic meaning

Post title: "{{title}}"
Post body: "{{body}}"
```

**Raw DeepSeek response (via LiteLLM):**

```json
{
  "type": "problem",
  "label": "AI agent memory persistence across sessions",
  "specificity": "named_tool",
  "cluster": "Validation",
  "tags": ["ai_agents", "memory", "hackathon", "context_window"],
  "embedding": [0.234, -0.567, 0.891, "...1536 dims..."]
}
```

**Data transformation:**
- `RawItem` → `ClassifiedItem` by merging DeepSeek output fields onto the raw item
- `label` replaces `title` as the canonical display string
- `embedding` stored as JSONB array (serialised to string for cache key derivation)
- `specificity_multiplier` derived: `named_tool`→1.5 · `domain_specific`→1.2 · `vague`→0.8 (applied downstream in DF-05)
- If DeepSeek returns malformed JSON: LiteLLM retry × 1, then item routed to `data/failed.json` via OpenClaw dead-letter

**PMF fields added:** `type` · `label` · `cluster` · `specificity` · `tags` · `embedding`

---

### DF-04 — Deduplication (JSON Local Storage — `data/cache.json`)

**Input:** `ClassifiedItem` from DF-03.

**Cache key:** `SHA256(source + post_id)` (exact duplicate) + `SHA256(normalised_label)` (near-duplicate label match).

```js
// src/worker/dedup.ts
const exactKey  = sha256(`${item.source}:${item.post_id}`);
const labelKey  = sha256(normalise(item.label)); // lowercase, strip punctuation

const cache = JSON.parse(fs.readFileSync('data/cache.json', 'utf8'));

if (cache.entries[exactKey]) {
  // Known post — merge: increment asks, update last_seen_at, bump source_count
  cache.entries[exactKey].source_count += 1;
  cache.entries[exactKey].last_seen_at = item.scraped_at;
  return { status: "merged", node_id: cache.entries[exactKey].node_id };
}

const embeddingSimilarity = cosineSim(item.embedding, cache.entries[labelKey]?.embedding_centroid);
if (embeddingSimilarity > 0.85) {
  // Near-duplicate — merge into existing node
  return { status: "merged", node_id: cache.entries[labelKey].node_id };
}

// Unique — add to cache
cache.entries[exactKey] = {
  node_id: item.id,
  label_hash: labelKey,
  embedding_centroid: item.embedding,
  last_seen_at: item.scraped_at,
  source_count: 1
};
fs.writeFileSync('data/cache.json', JSON.stringify(cache, null, 2));
return { status: "unique", node_id: item.id };
```

**Dedup result:**

```json
{
  "status": "unique",
  "node_id": "node-uuid-abc123",
  "similarity_to_existing": 0.12,
  "action": "proceed_to_upsert"
}
```

**Data transformation:**
- `ClassifiedItem` → `DeduplicatedItem` — adds `dedup_status` (`unique` | `merged`) and resolved `node_id`
- On `merged`: `asks` += scraped `comments`; `source_count` += 1; `last_seen_at` updated — no new DB row written
- On `unique`: item proceeds to DF-05 with `source_count = 1`
- Cache flushed to disk after every item; full cache synced to Neon `nodes.source_count` on each BullMQ recalc run (DF-06)

**PMF benefit:** prevents demand signal inflation from cross-posted duplicates across Reddit, HN, and PH.

---

### DF-05 — Storage + Scoring (Neon — PostgreSQL)

**Input:** `DeduplicatedItem` with `dedup_status = "unique"`.

**Upsert + PL/pgSQL trigger** atomically computes `gap_score`, `urgency_weight`, and `pmf_score` on every insert or `asks` increment.

```sql
-- Upsert
INSERT INTO nodes (
  id, type, label, source, source_url, raw_text,
  asks, upvotes, comments, tags, embedding,
  specificity, cluster, scraped_at, last_seen_at, source_count
) VALUES (
  'node-uuid-abc123', 'problem',
  'AI agent memory persistence across sessions',
  'reddit_r_startups',
  'https://reddit.com/r/startups/comments/1fghjkl/',
  'Anyone else hitting this wall?...',
  28, 142, 28,
  '["ai_agents","memory","hackathon","context_window"]'::jsonb,
  '[0.234,-0.567,...]'::jsonb,
  'named_tool', 'Validation',
  NOW(), NOW(), 1
)
ON CONFLICT (id) DO UPDATE
  SET asks        = nodes.asks + EXCLUDED.asks,
      source_count = nodes.source_count + 1,
      last_seen_at = NOW();

-- PL/pgSQL trigger (fires AFTER INSERT OR UPDATE OF asks)
CREATE OR REPLACE FUNCTION compute_pmf_scores() RETURNS TRIGGER AS $$
DECLARE
  sol_count      INT;
  spec_mult      FLOAT;
  raw_gap        FLOAT;
  urgency        FLOAT;
BEGIN
  -- Count solutions within cosine distance < 0.4
  SELECT COUNT(*) INTO sol_count
  FROM edges
  WHERE problem_id = NEW.id;

  -- gap_score
  raw_gap := LOG(NEW.asks + 1) / (sol_count + 1);   -- → 3.367

  -- urgency_weight: 1.5× if scraped within last 7 days
  urgency := CASE WHEN NEW.scraped_at > NOW() - INTERVAL '7 days' THEN 1.5 ELSE 1.0 END;

  -- specificity multiplier
  spec_mult := CASE NEW.specificity
    WHEN 'named_tool'      THEN 1.5
    WHEN 'domain_specific' THEN 1.2
    ELSE 0.8
  END;

  NEW.gap_score      := raw_gap;
  NEW.urgency_weight := urgency;
  NEW.pmf_score      := raw_gap * urgency * LOG(NEW.source_count + 1) * spec_mult;
  -- → 3.367 × 1.5 × LOG(2) × 1.5 = 5.24

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

**Resulting row PMF fields:** `gap_score = 3.367` · `urgency_weight = 1.5` · `pmf_score = 5.24` · `specificity_multiplier = 1.5`

**Data transformation:**
- `DeduplicatedItem` (application object) → persisted `nodes` row (Neon)
- Trigger output written back into the same row atomically — no second UPDATE needed
- `data/nodes.json` refreshed from Neon after each BullMQ recalc job (DF-06) for zero-latency local reads by the CF Worker

---

### DF-06 — Queue + Pipeline (BullMQ + node-cron)

**Input:** Neon `NOTIFY` on insert (via `pg_notify`) or node-cron tick every 60 s.

**BullMQ** (backed by Upstash Redis) enqueues three jobs per recalc cycle:

```js
// src/queue/scheduler.ts
await recalcQueue.add('recompute_edges',          { affected_node: 'node-uuid-abc123' });
await recalcQueue.add('update_cluster_gap_ratios', {});
await recalcQueue.add('update_gap_velocity',       { window_hrs: 24 });
```

**Job: `recompute_edges`**

```js
// For each new problem node, compute cosine similarity against all solution nodes
// Edge inserted if similarity > 0.4
const newEdges = solutionNodes
  .map(sol => ({ problem_id: node.id, solution_id: sol.id, strength: cosineSim(node.embedding, sol.embedding) }))
  .filter(e => e.strength > 0.4);
await neon.query(`INSERT INTO edges ... ON CONFLICT DO UPDATE SET strength = EXCLUDED.strength`);
```

**Job: `update_gap_velocity`**

```js
// Compare current gap_score to value 24 hrs ago stored in data/velocity_snapshot.json
const snapshot = loadLocalJSON('data/velocity_snapshot.json');
const delta = node.gap_score - (snapshot[node.id]?.gap_score_24h ?? node.gap_score);
await neon.query(`UPDATE nodes SET gap_velocity = $1 WHERE id = $2`, [delta, node.id]);
saveLocalJSON('data/velocity_snapshot.json', currentSnapshot);
```

**Orchestration envelope:**

```json
{
  "event": "gap_recalc_triggered",
  "affected_node": "node-uuid-abc123",
  "reason": "new_problem_inserted",
  "timestamp": "2026-03-27T12:46:12Z",
  "jobs": ["recompute_edges", "update_cluster_gap_ratios", "update_gap_velocity"]
}
```

**Data transformation:**
- Neon `pg_notify` event → BullMQ `Job[]` (fan-out, 1→3 jobs)
- `recompute_edges`: embedding vectors → cosine similarity float → `edges` rows
- `update_cluster_gap_ratios`: aggregates gap nodes per cluster → `meta.cluster_gap_ratios` JSON (written to `data/meta.json` for CF Worker read)
- `update_gap_velocity`: `gap_score` delta vs 24 h snapshot → `nodes.gap_velocity` float
- After all jobs complete: full node list flushed from Neon → `data/nodes.json` (local cache refresh)

---

### DF-07 — API Exposure (`/api/graph` — Cloudflare Worker)

**Input:** Cloudflare Worker receives `GET /api/graph` from D3 client every 60 s.

**CF Worker reads from Neon** (serverless Postgres connection via `@neondatabase/serverless`):

```js
// src/app/worker.ts (CF Worker)
import { neon } from '@neondatabase/serverless';
const sql = neon(env.DATABASE_URL);

export default {
  async fetch(req) {
    const nodes = await sql`
      SELECT id, type, label, cluster, gap_score, pmf_score,
             gap_velocity, source_count, specificity, source_url
      FROM nodes ORDER BY pmf_score DESC LIMIT 300
    `;
    const edges = await sql`
      SELECT problem_id AS source, solution_id AS target, strength FROM edges
    `;
    const meta  = await sql`
      SELECT cluster, ROUND(AVG(gap_score)::numeric, 2) AS gap_ratio
      FROM nodes WHERE type = 'problem' GROUP BY cluster
    `;

    const clusterColors = {
      Validation: '#9f7cff', Capital: '#f472b6',
      Growth: '#34d399',     'Team building': '#60a5fa',
      Network: '#2dd4bf',    'Launch platforms': '#fb923c',
      'Build & hire': '#a78bfa', 'Funding & growth': '#f59e0b'
    };

    const response = {
      nodes: nodes.map(n => ({ ...n, color: clusterColors[n.cluster] })),
      edges,
      meta: {
        total_problems:      nodes.filter(n => n.type === 'problem').length,
        total_solutions:     nodes.filter(n => n.type === 'solution').length,
        cluster_gap_ratios:  Object.fromEntries(meta.map(r => [r.cluster, r.gap_ratio])),
        top_pmf_node:        nodes[0]?.id,
        last_updated:        new Date().toISOString()
      }
    };
    return Response.json(response, {
      headers: { 'Cache-Control': 'public, max-age=55' }
    });
  }
};
```

> **IMPLEMENT:** hover on node → show panel with URL → click → open `source_url` in new tab.

**Full PMF-enriched D3 JSON:**

```json
{
  "nodes": [
    {
      "id": "node-uuid-abc123",
      "type": "problem",
      "label": "AI agent memory persistence across sessions",
      "cluster": "Validation",
      "gap_score": 3.367,
      "pmf_score": 5.24,
      "gap_velocity": 0.82,
      "source_count": 1,
      "specificity": "named_tool",
      "source_url": "https://reddit.com/r/startups/comments/1fghjkl/",
      "color": "#9f7cff",
      "x": 120, "y": 340
    },
    {
      "id": "sol-xyz987",
      "type": "solution",
      "label": "LangGraph by LangChain",
      "cluster": "Build & hire",
      "gap_score": 0,
      "pmf_score": 0,
      "gap_velocity": 0,
      "source_count": 3,
      "specificity": "named_tool",
      "source_url": "https://www.producthunt.com/posts/langgraph",
      "color": "#a78bfa"
    }
  ],
  "edges": [
    { "source": "node-uuid-abc123", "target": "sol-xyz987", "strength": 0.4 }
  ],
  "meta": {
    "total_problems": 87,
    "total_solutions": 34,
    "cluster_gap_ratios": {
      "Validation": 0.72, "Capital": 1.0, "Growth": 0.55, "Team building": 0.31
    },
    "top_pmf_node": "node-uuid-abc123",
    "last_updated": "2026-03-27T12:46:30Z"
  }
}
```

**Data transformation:**
- Neon rows (raw DB types) → `ApiNode[]` / `ApiEdge[]` (camelCase JS objects + `color` HEX injected)
- `cluster_gap_ratios` computed inline from aggregate query — no extra table
- Response cached at CF edge for 55 s (`Cache-Control: max-age=55`) — aligns with 60 s D3 poll interval

---

### DF-08 — Alerting (Telegram Bot + node-telegram-bot-api)

**Input:** BullMQ alert worker polling Neon every 5 min; cross-checked against `data/watchlist.json`.

**Fires when** `pmf_score > 3.0` AND `node.label` matches a watchlist keyword (case-insensitive substring).

```js
// src/bot/alertLoop.ts
const watchlist = loadLocalJSON('data/watchlist.json');
const hotNodes  = await neon`
  SELECT * FROM nodes
  WHERE pmf_score > ${watchlist.pmf_threshold}
    AND last_seen_at > NOW() - INTERVAL '5 minutes'
  ORDER BY pmf_score DESC LIMIT 5
`;

for (const node of hotNodes) {
  const match = watchlist.keywords.some(kw =>
    node.label.toLowerCase().includes(kw.toLowerCase())
  );
  if (!match) continue;

  const message = `
🚨 NEW HIGH-GAP DETECTED

Problem: ${node.label}
Gap Score:   ${node.gap_score.toFixed(2)}  (${solutionCount} matching solutions)
PMF Score:   ${node.pmf_score.toFixed(2)}  ← highest today
Velocity:    +${node.gap_velocity.toFixed(2)} (rising fast)
Specificity: ${node.specificity} ✅
Cluster:     ${node.cluster} · Sources: ${node.source_count}

→ Explore: https://hackamap.pages.dev/?highlight=${node.id}
→ Source:  ${node.source_url}
  `.trim();

  await bot.sendMessage(watchlist.telegram_chat_id, message);
}
```

**Telegram alert output:**

```
🚨 NEW HIGH-GAP DETECTED

Problem: AI agent memory persistence across sessions
Gap Score:   3.37  (0 matching solutions)
PMF Score:   5.24  ← highest today
Velocity:    +0.82 (rising fast)
Specificity: named_tool ✅
Cluster:     Validation · Sources: 1

→ Explore: https://hackamap.pages.dev/?highlight=node-uuid-abc123
→ Source:  https://reddit.com/r/startups/comments/1fghjkl/
```

**Data transformation:**
- Neon query result rows → formatted Telegram markdown string
- `watchlist.json` keyword filter applied in-process (no DB query for filter)
- `source_url` appended to alert (available since DF-01) — enables one-tap founder jump to original post

---

### DF-09 — Canvas Rendering (D3.js v7 — Cloudflare Pages)

**Input:** `fetch('/api/graph')` response (CF Worker) polled every 60 s.

```js
const { nodes, edges, meta } = await fetch('/api/graph').then(r => r.json());

// Node radius = gap_score magnitude
const rScale = d3.scaleSqrt().domain([0, 5]).range([6, 22]);

// Node glow intensity = pmf_score (CSS filter: drop-shadow)
node.style("filter", d => `drop-shadow(0 0 ${d.pmf_score * 2}px ${d.color})`);

// Edge opacity = similarity strength
link.style("opacity", d => 0.2 + d.strength * 0.6);

// Pulse animation speed = gap_velocity (CSS animation-duration)
node.classed("pulse-fast", d => d.gap_velocity > 0.5);

// Source URL panel — hover to preview, click to open original post
node.on("mouseover", (event, d) => {
  sidebar.html(`
    <strong>${d.label}</strong><br/>
    Gap: ${d.gap_score.toFixed(2)} · PMF: ${d.pmf_score.toFixed(2)}<br/>
    <a href="${d.source_url}" target="_blank">→ View original post</a>
  `).style("display", "block");
});

const simulation = d3.forceSimulation(nodes)
  .force("link",      d3.forceLink(edges).id(d => d.id).strength(d => d.strength))
  .force("bipartite", customBipartiteForce())
  .force("cluster",   clusterForce(clusterCenters));
```

**Data transformation:**
- `ApiNode[]` → D3 simulation nodes (positions mutated in-place by force layout)
- `ApiEdge[]` → D3 link objects (source/target resolved from node id → object reference)
- `gap_score` → radius px (scaleSqrt)
- `pmf_score` → CSS drop-shadow px value
- `gap_velocity` → CSS class toggle (`pulse-fast` / `pulse-slow`)
- `source_count` → stroke-width px (thicker = more platforms)
- `color` (HEX from CF Worker) → node fill + glow tint (no client-side colour logic)

---

### DF-10 — User Interaction → PMF Exploration

```js
// Drag problem node → whitespace in empty clusters lights up
node.call(d3.drag().on("drag", (event, d) => {
  highlightEmptyClusters(d.cluster);
  showGapScore(d.gap_score, d.pmf_score, d.gap_velocity);
}));

// Gap threshold slider — filters canvas in real time (client-side, no API call)
slider.on("input", val => {
  node.style("opacity", d => d.gap_score >= val ? 1 : 0.1);
  link.style("opacity", d => getNode(d.source).gap_score >= val ? 0.6 : 0.05);
});

// Cluster header hover → show cluster_gap_ratio badge from meta
clusterHeader.on("mouseover", d => {
  showTooltip(`${d.name} · Gap ratio: ${meta.cluster_gap_ratios[d.name]}`);
  highlightClusterEdges(d.name);
});

// Collapse cluster → edges re-route to cluster header Y position
clusterHeader.on("click", d => {
  toggleCluster(d.name);
  simulation.alpha(0.3).restart();
});
```

**Data transformation:**
- All interactions are **client-side only** — no API calls triggered by drag/hover/slider
- Slider filter: `gap_score` float threshold → opacity style (0.1 or 1.0), applied per-frame
- Cluster collapse: node positions snapped to cluster header `{x, y}` → simulation re-heated (`alpha=0.3`)
- Tooltip: `meta.cluster_gap_ratios[cluster_name]` (cached from last poll) → formatted string

---

### DF-11 — Final Canvas State (What the Founder Sees)

| Canvas Element | Data Source | Data Type | PMF Meaning |
|---|---|---|---|
| Node radius | `gap_score` | FLOAT → px (scaleSqrt) | Bigger = more unmet demand |
| Node glow | `pmf_score` | FLOAT → CSS drop-shadow px | Brighter = higher composite opportunity |
| Pulse speed | `gap_velocity` | FLOAT → CSS class toggle | Faster pulse = accelerating demand |
| Border thickness | `source_count` | INT → stroke-width px | Thicker = seen across more platforms |
| Badge icon | `specificity` | ENUM → icon character | 🔧 named tool · 🏷 domain · 💬 vague |
| Edge opacity | `strength` | FLOAT [0–1] → opacity | Fainter = weaker solution match |
| Cluster badge | `cluster_gap_ratio` | FLOAT → % label | % of nodes in cluster with no solution |
| Hover sidebar | `source_url` + `label` | STRING → HTML link | One-click jump to original post |
| Empty whitespace | No edges from cluster | — | The actual opportunity |

**Full journey:** one Reddit complaint → 11-step pipeline → Gap Score 3.37 · PMF Score 5.24 · bright purple pulsing node on live D3 canvas with Telegram alert → founder drags node → whitespace lights up → billion-dollar gap found.

---

## STACK SUMMARY

| Step | Tool | Local / Cloud | License |
|---|---|---|---|
| DF-01 Ingestion | Reddit API (PRAW) + HN Algolia + PH API v2 | Local process | MIT / Free API |
| DF-02 Orchestration | OpenClaw skills manifest | Local process | Free |
| DF-03 Classification | LiteLLM (local proxy) → DeepSeek `deepseek-chat` | Local proxy / Cloud API | MIT / Apache 2.0 |
| DF-04 Deduplication | JSON Local Storage (`data/cache.json`) | **Local disk** | MIT |
| DF-05 Storage + Scoring | Neon (PostgreSQL) + PL/pgSQL trigger | Cloud DB | Apache 2.0 client |
| DF-06 Pipeline | BullMQ + node-cron + Upstash Redis | Local workers / Cloud queue | MIT |
| DF-07 API | Cloudflare Worker + `@neondatabase/serverless` | Edge | Free tier |
| DF-08 Alerting | Telegram Bot + node-telegram-bot-api | Cloud | MIT |
| DF-09–10 Canvas | D3.js v7 on Cloudflare Pages | Edge CDN | MIT |
| SCM / CI | GitHub + GitHub Actions → CF auto-deploy | Cloud | MIT tooling |

**Total TCO: $0/month · 100% FOSS · Local-first**

---

*Hackamap · $0 TCO · Solo Founder Build · Local-First*