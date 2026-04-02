# PMF Voxel Layer Model

**Hackamap — Product-Market Fit Framework**
`v1.0.0 · FOSS · 3-hour hackathon build`

---

## Concept

Product-Market Fit is not a binary switch — it is the emergent alignment across three stacked layers of a startup's reality. This model renders that alignment as a three-dimensional voxel scene, where **height encodes fit score** and **colour encodes dimension**.

```
┌─────────────────────────────────────────┐  ↑ TOP
│  MARKET layer — Problem clusters         │  Problems the world has
│  [ Team ] [ Validation ] [ Growth ] [ Capital ] │
├─────────────────────────────────────────┤
│  SOLUTION layer — Feature clusters       │  What bridges product to market
│  [ Network ] [ Launch ] [ Build ] [ Funding ]  │
├─────────────────────────────────────────┤
│  PRODUCT layer — Individual builds       │  What teams shipped
│  [ Hackamap ][ AngelBot ][ MVPForge ]... │
└─────────────────────────────────────────┘  ↓ BOTTOM
```

PMF is achieved when voxel columns align **vertically through all three layers** — the same profile of Money / Man / Machine scores top-to-bottom. Misaligned columns = gap = opportunity.

---

## Three Voxel Dimensions — The 3 Ms

Each node in every layer carries exactly three voxels. Their heights (score 0.0–1.0) encode:

| Voxel | Dimension | Fit Label | Colour | Meaning |
|-------|-----------|-----------|--------|---------|
| **Money** | Capital | CMF — Capital-Market Fit | `#EF9F27` amber | Runway, monetisation model, investor-market alignment |
| **Man** | Founder | FMF — Founder-Market Fit | `#D85A30` coral | Domain expertise, lived problem experience, target-market network |
| **Machine** | Tech Stack | TMF — Tech-Market Fit | `#1D9E75` teal | Build speed, scalability, stack-to-problem alignment |

A tall amber voxel = capital-rich node. A tall coral voxel = founder deeply domain-matched. A tall teal voxel = technically capable for this problem. PMF = all three tall, all three matched across layers.

---

## Layer Definitions

### PRODUCT layer — bottom (y = −4.5)

Individual hackathon builds or early-stage startups. Each has three voxels showing the team's current strength on each dimension.

| Product | Money | Man | Machine | PMF Score |
|---------|-------|-----|---------|-----------|
| Hackamap | 0.50 | 0.80 | 0.70 | 0.67 |
| AngelBot | 0.70 | 0.50 | 0.60 | 0.60 |
| MVPForge | 0.30 | 0.70 | 0.90 | 0.63 |
| GenZLaunch | 0.50 | 0.60 | 0.50 | 0.53 |
| CoFind | 0.20 | 0.90 | 0.40 | 0.50 |

### SOLUTION layer — middle (y = 0)

Feature / functionality clusters — the bridge layer. These are the categories of tools and capabilities that exist in the market today.

| Solution Cluster | Money | Man | Machine |
|-----------------|-------|-----|---------|
| Network | 0.50 | 0.80 | 0.40 |
| Launch Platforms | 0.40 | 0.60 | 0.70 |
| Build & Hire | 0.60 | 0.50 | 0.90 |
| Funding & Growth | 0.90 | 0.70 | 0.50 |

### MARKET layer — top (y = +4.5)

Problem clusters scraped from Reddit, HN, and Product Hunt. The gap score is `log(asks + 1) / (solution_count + 1)`. Gap ≥ 0.85 = unsolved opportunity.

| Market Cluster | Money | Man | Machine | Gap Score |
|---------------|-------|-----|---------|-----------|
| Team Building | 0.30 | 1.00 | 0.40 | 0.30 |
| Validation | 0.40 | 0.70 | 0.60 | 0.52 |
| Growth | 0.50 | 0.60 | 0.80 | 0.58 |
| Capital | 1.00 | 0.50 | 0.30 | **1.00** ⚡ |

**Capital** is the full gap — no current product in this build set achieves CMF against a market that overwhelmingly needs funding solutions.

---

## PMF Score Formula

```
dimension_alignment(dim) =
  min(product[dim], market[dim]) / max(product[dim], market[dim])

pmfScore =
  geometric_mean(
    CMF_alignment,   ← money dimension
    FMF_alignment,   ← man dimension
    TMF_alignment    ← machine dimension
  )
```

A score of 1.0 = perfect three-dimensional fit. A score below 0.4 on any single dimension is a red-flag mismatch even if the other two are strong.

---

## Edge Map — Product → Solution → Market

```
Hackamap   ──→  Network          ──→  Team Building
           ──→  Launch Platforms ──→  Validation
                                 ──→  Growth
AngelBot   ──→  Funding & Growth ──→  Capital
           ──→  Network
MVPForge   ──→  Build & Hire     ──→  Growth
GenZLaunch ──→  Launch Platforms
CoFind     ──→  Network
```

---

## Tech Stack Mapping (3-hour hackathon)

| Layer | Component | Tool |
|-------|-----------|------|
| Data ingestion | Web scraping | Bright Data Web Unlocker |
| Classification | Problem/solution tagging | Agnes AI (ZenMux) |
| Memory / dedup | Seen-problem cache | mem9 |
| Graph storage | JSON nodes + edges | TiDB Cloud (MySQL-compatible) |
| API gateway / rate-limit | OpenClaw | OpenClaw |
| Bot interface | Telegram problem submissions | Telegram Bot Father |
| Backend deploy | Node.js Express | Zeabur free tier |
| Frontend | D3 bipartite canvas + Three.js PMF | Static on Zeabur |

**TiDB Cloud chosen DB type: MySQL** — wire-compatible, native JSON column type, `JSON_ARRAYAGG()` outputs directly into D3 `{nodes, links}` format.

---

## How to Read the 3D Visualization (PMF.HTML)

- **Drag** to orbit the scene; **scroll** to zoom.
- **Hover** any voxel cluster to see the node name, fit scores, and tagged tools.
- **Click** a node to open a deeper explanation in the chat.
- Tall amber column = capital-rich; tall coral = founder-matched; tall teal = tech-capable.
- When all three voxel heights in a cluster match across PRODUCT → SOLUTION → MARKET, that vertical stack is a PMF candidate.
- A **red pulsing ring** on a Market cluster = gap score ≥ 0.85 — unsolved opportunity.
- Connection lines between layers show which products address which solution clusters address which market problems.

---

## FOSS Licence

All code in this repository is MIT licensed. Data scraped via Bright Data is used for educational and non-commercial hackathon demonstration purposes only.

---

*Generated for Hackamap PMF hackathon build · Zeabur · TiDB Cloud · Three.js r128*
