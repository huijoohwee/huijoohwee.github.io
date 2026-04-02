# Hackamap Build Plan

## Hackamap — Interactive PMF Gap Canvas Demo

Full cluster grouping on both sides, collapsible cluster headers with animated chevrons, edge-bundling to cluster headers on collapse, cross-cluster hover dimming, and cluster-level highlight on header hover.

- **Cluster groups**: 4 problem clusters (Team building, Validation, Growth, Capital) and 4 solution clusters (Network, Launch platforms, Build & hire, Funding & growth), each color-coded with its own fill/border from the ramp palette.

- **Collapse / expand**: clicking any cluster header shrinks it down to just its label bar with an animated chevron flip. Edges dynamically re-route to the cluster header's Y position when nodes are hidden, so you never lose the connectivity picture.

- **Cluster-level hover**: hovering a cluster header highlights all edges from that entire cluster and dims everything else, giving you an instant cross-cluster dependency view. The tooltip on a cluster header shows node count, edge count, and whether there are unsolved gaps inside.

- **Node-level hover**: hover any single node to trace its individual edges.

The **Capital** cluster (purple, both nodes gap = 1.0) and the scattered gap nodes in Validation and Growth show where the real whitespace is for the hackathon's own pitch.

---

## Hackamap: 3-hour build plan

### **Hour 0–1 — Data & DB**

Bright Data's Web Unlocker scrapes Reddit (`r/startups`, `r/SaaS`), Hacker News "Ask HN", and Product Hunt comments. 
Extract problem phrases using Agnes AI's text classifier. 
Store everything in TiDB Cloud with this schema:

```sql
CREATE TABLE nodes (
  id VARCHAR(36) PRIMARY KEY,
  type ENUM('problem','solution'),
  label VARCHAR(255),
  metadata JSON,           -- { asks, tags, source_url }
  gap_score FLOAT DEFAULT 0
);
CREATE TABLE edges (
  problem_id VARCHAR(36), solution_id VARCHAR(36),
  strength FLOAT,
  INDEX(problem_id), INDEX(solution_id)
);
```

`gap_score = LOG(asks + 1) / (solution_count + 1)` — pure SQL, runs on insert trigger.

Note:
**TiDB Cloud DB**: MySQL‑compatible, supports native `JSON` columns, and can serialize nodes/edges via `JSON_ARRAYAGG()` into D3’s `{nodes, links}` format. Vector search tools (Chroma, Faiss, Pinecone, Milvus) act as the embedding layer, not the graph store.  

---

### **Hour 1–2 — Backend + Bot**

Deploy a Node.js Express app on **Zeabur** (free tier). 
Telegram Bot Father endpoint lets founders DM a problem; Agnes AI classifies it, mem9 checks if it's a duplicate memory, and TiDB upserts the node. 
OpenClaw handles API auth/rate-limiting across Bright Data + Telegram.

---

### **Hour 2–3 — Frontend**

The D3 canvas above (HTML artifact served from Zeabur). 
ZenMux orchestrates the real-time gap recalculation pipeline so the canvas updates live as new Telegram submissions come in.