# Hackamap Template (PostgreSQL + D3/Three.js Knowledge Graph)

This is a **project-agnostic** template for tracking:
- AI-powered product launches and hackathon demos/winners
- Founder/organizer problem framing (with citations)
- Value Triangle scoring (User / Founder / Investor)
- Whitespace **GAP SIGNALS** + a build-focused **Hackamap Gap Score**
- Rolled-up whitespace opportunities with a founder action + investor thesis

The canonical schema lives in `hackamap-template.json`.

---

## 1) Data model overview (Airtable-like, multi-dimensional)

**Core entities**
- `sources`: verifiable citations (URLs, dates, excerpt quotes)
- `events`: hackathons, demo days, conferences, product launches
- `products`: products/projects/demos
- `problem_statements`: the “pain” each product solves (grounded in sources)
- `value_triangle_scores`: 1–5 scores + rationale
- `gaps`: adjacent pain **not** solved by the product + 1–10 gap score
- `opportunities`: aggregated whitespace opportunities (often many gaps → one opp)
- `tags` + `product_tags`: multi-dimensional slicing and rollups (like Airtable)

**Graph-friendly relationships**
- products → sources (primary citation)
- products → events (where announced/demoed/won)
- products → problem statements → sources (evidence)
- products → gaps (gap signals)
- gaps → opportunities (roll-ups)
- products ↔ tags (multi-dimensional filters)

---

## 2) Suggested PostgreSQL DDL (starting point)

> You can generate DDL directly from `hackamap-template.json` in your app, but here’s a clean baseline.

```sql
CREATE TABLE sources (
  source_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  publisher TEXT,
  url TEXT NOT NULL UNIQUE,
  published_date DATE,
  retrieved_at TIMESTAMPTZ,
  quote TEXT,
  claim_scope TEXT
);

CREATE TABLE events (
  event_id TEXT PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  location TEXT,
  organizer TEXT,
  source_id TEXT REFERENCES sources(source_id)
);

CREATE TABLE products (
  product_id TEXT PRIMARY KEY,
  product_name TEXT NOT NULL,
  product_type TEXT NOT NULL,
  org_name TEXT,
  status TEXT,
  launch_or_demo_date DATE,
  event_id TEXT REFERENCES events(event_id),
  primary_source_id TEXT NOT NULL REFERENCES sources(source_id),
  canonical_url TEXT,
  one_liner TEXT,
  domain TEXT
);

CREATE TABLE problem_statements (
  problem_id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(product_id),
  user_persona TEXT,
  job_to_be_done TEXT,
  pain_statement TEXT NOT NULL,
  evidence_source_id TEXT NOT NULL REFERENCES sources(source_id),
  evidence_quote TEXT,
  constraints JSONB
);

CREATE TABLE value_triangle_scores (
  score_id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(product_id),
  score_user INT NOT NULL CHECK (score_user BETWEEN 1 AND 5),
  score_founder INT NOT NULL CHECK (score_founder BETWEEN 1 AND 5),
  score_investor INT NOT NULL CHECK (score_investor BETWEEN 1 AND 5),
  rationale JSONB,
  scored_at TIMESTAMPTZ
);

CREATE TABLE gaps (
  gap_id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(product_id),
  domain TEXT NOT NULL,
  unaddressed_pain TEXT NOT NULL,
  why_unclaimed TEXT NOT NULL,
  gap_score INT NOT NULL CHECK (gap_score BETWEEN 1 AND 10),
  assumptions JSONB,
  created_at TIMESTAMPTZ
);

CREATE TABLE opportunities (
  opportunity_id TEXT PRIMARY KEY,
  opportunity_title TEXT NOT NULL,
  opportunity_domain TEXT NOT NULL,
  opportunity_summary TEXT NOT NULL,
  gap_ids TEXT[],
  opportunity_score INT NOT NULL CHECK (opportunity_score BETWEEN 1 AND 10),
  founder_action TEXT,
  investor_thesis TEXT
);

CREATE TABLE tags (
  tag_id TEXT PRIMARY KEY,
  tag TEXT NOT NULL UNIQUE,
  tag_group TEXT
);

CREATE TABLE product_tags (
  product_tag_id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(product_id),
  tag_id TEXT NOT NULL REFERENCES tags(tag_id)
);
```

### Recommended indexes
```sql
CREATE INDEX idx_events_type_date ON events(event_type, start_date);
CREATE INDEX idx_products_domain ON products(domain);
CREATE INDEX idx_products_date ON products(launch_or_demo_date);
CREATE INDEX idx_problem_product ON problem_statements(product_id);
CREATE INDEX idx_gaps_domain_score ON gaps(domain, gap_score DESC);
CREATE INDEX idx_opportunities_score ON opportunities(opportunity_score DESC);
CREATE INDEX idx_product_tags_product ON product_tags(product_id);
CREATE INDEX idx_product_tags_tag ON product_tags(tag_id);
```

---

## 3) Knowledge-graph export shape (for D3 + Three.js)

Many graph renderers want a simple `{ nodes: [], links: [] }` object. A common export:

```json
{
  "nodes": [
    { "id": "prod:...", "type": "product", "label": "Example", "domain": "devtools", "score": 4.2 },
    { "id": "gap:...", "type": "gap", "label": "Unaddressed pain...", "score": 8 },
    { "id": "src:...", "type": "source", "label": "Press release", "url": "https://..." }
  ],
  "links": [
    { "source": "prod:...", "target": "gap:...", "type": "has_gap" },
    { "source": "prod:...", "target": "src:...", "type": "cited_by" }
  ]
}
```

The included `hackamap-template.html` expects this shape, but also supports loading from the relational tables by constructing nodes/links at runtime.

---

## 4) Hackamap Gap Score rubric (1–10)

Gap Score is **build-focused**. Suggested decomposition:
- **Demand signal** (0–3): clear recurring pain, measurable urgency
- **Market size / willingness to pay** (0–3): budgets exist, repeatable buyer
- **Low competition** (0–2): no dominant workflow + weak incumbents
- **Buildable in 3 months** (0–2): MVP feasible with small team + APIs

Total (0–10) → store as integer `gap_score`.

---

## 5) How to use this template

1) Ingest sources (`sources`) first (URLs + dates + quotes).
2) Create `products` and attach `primary_source_id`.
3) Add `problem_statements` with evidence quotes.
4) Score `value_triangle_scores`.
5) Create `gaps` per product/domain.
6) Roll up the best gaps into `opportunities`.
7) Add `tags` + `product_tags` for filtering and rollups.

