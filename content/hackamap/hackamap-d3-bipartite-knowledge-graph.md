# Hackamap — D3 Bipartite + Hub-and-Spoke Knowledge Graph
### Multi-Dimensional Reference · Airtable Format · v1.1
*Source: `hackamap-d3-bipartite-knowledge-graph.html` + `.json`*

---

## TABLE 1 — CLUSTERS

| ID | Name | Side | Color | Hub ID | Gap Ratio | Members | Cross Edges | Spoke Edges | Priority |
|---|---|---|---|---|---|---|---|---|---|
| `team` | Team Building | Problem | `#f59e0b` | `h-team` | 31% | 3 | 4 | 3 | Low |
| `validation` | Validation | Problem | `#9f7cff` | `h-validation` | 72% | 3 | 4 | 3 | High |
| `growth` | Growth | Problem | `#f43f5e` | `h-growth` | 55% | 3 | 4 | 3 | Medium |
| `capital` | Capital | Problem | `#c084fc` | `h-capital` | 100% | 3 | 2 | 3 | 🚨 Critical |
| `network` | Network | Solution | `#06b6d4` | `h-network` | — | 3 | 3 | 3 | — |
| `launch` | Launch Platforms | Solution | `#22c55e` | `h-launch` | — | 3 | 4 | 3 | — |
| `build` | Build & Hire | Solution | `#2dd4bf` | `h-build` | — | 3 | 3 | 3 | — |
| `funding` | Funding & Growth | Solution | `#3b82f6` | `h-funding` | — | 2 | 2 | 2 | — |

---

## TABLE 2 — HUB NODES

| ID | Cluster | Label | Members | Position | Outer Ring r | Inner r | Halo r | Animation | Gap Ratio | Tooltip Shows |
|---|---|---|---|---|---|---|---|---|---|---|
| `h-team` | team | Team Building | 3 | Pinned (fx,fy) | 26px | 18px | 38px | Spin 9s | 31% | Member count + 31% gap ratio |
| `h-validation` | validation | Validation | 3 | Pinned (fx,fy) | 26px | 18px | 38px | Spin 9s | 72% | Member count + 72% gap ratio |
| `h-growth` | growth | Growth | 3 | Pinned (fx,fy) | 26px | 18px | 38px | Spin 9s | 55% | Member count + 55% gap ratio |
| `h-capital` | capital | Capital | 3 | Pinned (fx,fy) | 26px | 18px | 38px | Spin 9s | 100% | Member count + 100% gap ratio |
| `h-network` | network | Network | 3 | Pinned (fx,fy) | 26px | 18px | 38px | Spin 9s | — | Member count |
| `h-launch` | launch | Launch Platforms | 3 | Pinned (fx,fy) | 26px | 18px | 38px | Spin 9s | — | Member count |
| `h-build` | build | Build & Hire | 3 | Pinned (fx,fy) | 26px | 18px | 38px | Spin 9s | — | Member count |
| `h-funding` | funding | Funding & Growth | 2 | Pinned (fx,fy) | 26px | 18px | 38px | Spin 9s | — | Member count |

> Hub nodes are fixed via `fx/fy` — they anchor their cluster, immune to `forceManyBody` drift. `forceManyBody` strength on hubs is `-8` (minimal); members repel each other at `-95`.

---

## TABLE 3 — SPOKE EDGES

| ID | Hub | Member | Cluster | Force Strength | Distance | Render | Canvas Opacity | PMF Insight |
|---|---|---|---|---|---|---|---|---|
| `sp01` | `h-team` | `p1` Finding co-founders | team | 0.42 | 70px | Dashed line `3,6` | 0.22 | Hub visually confirms p1 is team-owned |
| `sp02` | `h-team` | `p2` Async coordination | team | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp03` | `h-team` | `p3` Equity disputes | team | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp04` | `h-validation` | `p4` AI agent memory | validation | 0.42 | 70px | Dashed line `3,6` | 0.22 | High-gap node visually close to hub = cluster owns the gap |
| `sp05` | `h-validation` | `p5` No-code MVP | validation | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp06` | `h-validation` | `p6` First 10 users | validation | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp07` | `h-growth` | `p7` Churn prediction | growth | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp08` | `h-growth` | `p8` Viral loop design | growth | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp09` | `h-growth` | `p9` SEO vs paid ROI | growth | 0.42 | 70px | Dashed line `3,6` | 0.22 | Zero cross-edges — spoke is only connection visible |
| `sp10` | `h-capital` | `p10` Pre-seed access | capital | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp11` | `h-capital` | `p11` SAFE confusion | capital | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp12` | `h-capital` | `p12` Revenue-based financing | capital | 0.42 | 70px | Dashed line `3,6` | 0.22 | **Top opportunity** — hub surrounded by 3 high-gap nodes, 0 cross-edges |
| `sp13` | `h-network` | `s1` YC Co-Founder Matching | network | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp14` | `h-network` | `s2` Lunchclub AI | network | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp15` | `h-network` | `s3` On Deck Fellowship | network | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp16` | `h-launch` | `s4` Product Hunt | launch | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp17` | `h-launch` | `s5` Betalist | launch | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp18` | `h-launch` | `s6` Hacker News | launch | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp19` | `h-build` | `s7` LangGraph | build | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp20` | `h-build` | `s8` Cursor IDE | build | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp21` | `h-build` | `s9` Replit | build | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp22` | `h-funding` | `s10` Carta SAFE Manager | funding | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |
| `sp23` | `h-funding` | `s11` AngelList | funding | 0.42 | 70px | Dashed line `3,6` | 0.22 | — |

---

## TABLE 4 — FORCE SIMULATION PARAMETERS

| Force | Type | Applies To | Strength | Distance / Alpha | Purpose |
|---|---|---|---|---|---|
| `forceX` | Position | Members only | 0.46 | Target: column X | Keeps problems left, solutions right |
| `forceY` | Position | Members only | 0.33 | Target: clY[cluster] | Keeps nodes in cluster row |
| `forceManyBody` (member) | Repulsion | Members | -95 | — | Spreads member nodes around hub |
| `forceManyBody` (hub) | Minimal | Hubs | -8 | — | Hubs pinned; minimal drift suppression |
| `forceCollide` (member) | Collision | Members | — | r + 12px | Prevents node overlap |
| `forceCollide` (hub) | Collision | Hubs | — | 30px | Reserves hub space |
| `forceLink` (spoke) | Attraction | Hub↔Member | 0.42 | 70px | Pulls members into orbit around hub |
| `forceLink` (cross) | Attraction | Problem↔Solution | 0.012 | 46% W | Gentle cross-cluster pull |
| `alphaDecay` | Cooling | Global | 0.024 | — | Slow settle for organic layout |
| Hub pin | Fixed | Hubs | — | `fx=clX, fy=clY` | Hubs never move regardless of forces |

---

## TABLE 5 — PROBLEM NODES

| ID | Label | Cluster | Hub | Gap Score | PMF Score | Velocity | Sources | Spec | Solutions | Alert | Pulse | Rank |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `p12` | Revenue-based financing | capital | `h-capital` | **4.50** | **6.75** | +0.95 ↑ | 2 | domain | 0 | 🚨 | Fast | **#1** |
| `p10` | Pre-seed without warm intro | capital | `h-capital` | **4.10** | **6.15** | +0.90 ↑ | 4 | domain | 1 | 🚨 | Fast | **#2** |
| `p11` | SAFE vs priced round confusion | capital | `h-capital` | **3.80** | **5.70** | +0.85 ↑ | 3 | named | 1 | 🚨 | Fast | **#3** |
| `p4` | AI agent memory persistence | validation | `h-validation` | 3.37 | 5.24 | +0.82 ↑ | 1 | named | 1 | 🚨 | Fast | #4 |
| `p9` | SEO vs paid acquisition ROI | growth | `h-growth` | 2.80 | 3.40 | +0.70 ↑ | 3 | domain | 0 | 🚨 | Fast | #5 |
| `p7` | Churn prediction for B2B SaaS | growth | `h-growth` | 2.40 | 3.60 | +0.60 ↑ | 2 | named | 1 | 🚨 | Med | #6 |
| `p5` | No-code MVP testing pipeline | validation | `h-validation` | 2.10 | 3.20 | +0.45 ↑ | 2 | domain | 2 | 🚨 | Med | #7 |
| `p8` | Viral loop design for dev tools | growth | `h-growth` | 1.90 | 2.90 | +0.35 ↑ | 1 | domain | 2 | ❌ | — | #8 |
| `p1` | Finding co-founders remotely | team | `h-team` | 1.80 | 2.70 | +0.30 ↑ | 2 | domain | 3 | ❌ | — | #9 |
| `p6` | Getting first 10 users | validation | `h-validation` | 1.50 | 2.30 | +0.25 ↑ | 3 | vague | 2 | ❌ | — | #10 |
| `p3` | Equity splitting disputes | team | `h-team` | 1.20 | 1.80 | +0.20 ↑ | 2 | domain | 1 | ❌ | — | #11 |
| `p2` | Async team coordination | team | `h-team` | 0.90 | 1.10 | +0.10 ↑ | 1 | domain | 1 | ❌ | — | #12 |

---

## TABLE 6 — SOLUTION NODES

| ID | Label | Cluster | Hub | Sources | Problems Linked | Strength Range | Radius | Border |
|---|---|---|---|---|---|---|---|---|
| `s4` | Product Hunt | launch | `h-launch` | 8 | 3 (p5,p6,p8) | 0.40–0.60 | 9px | 2.0px |
| `s6` | Hacker News | launch | `h-launch` | 7 | 2 (p6,p8) | 0.50–0.65 | 9px | 2.0px |
| `s10` | Carta SAFE Manager | funding | `h-funding` | 6 | 2 (p3,p11) | 0.30–0.50 | 9px | 2.0px |
| `s1` | YC Co-Founder Matching | network | `h-network` | 5 | 1 (p1) | 0.85 | 9px | 2.0px |
| `s8` | Cursor IDE | build | `h-build` | 5 | 1 (p2) | 0.40 | 9px | 2.0px |
| `s11` | AngelList | funding | `h-funding` | 5 | 1 (p10) | 0.20 | 9px | 2.0px |
| `s3` | On Deck Fellowship | network | `h-network` | 4 | 1 (p1) | 0.60 | 9px | 2.0px |
| `s5` | Betalist | launch | `h-launch` | 4 | 1 (p5) | 0.55 | 9px | 2.0px |
| `s9` | Replit | build | `h-build` | 4 | 0 | — | 9px | 2.0px |
| `s2` | Lunchclub AI | network | `h-network` | 3 | 1 (p1) | 0.70 | 9px | 2.0px |
| `s7` | LangGraph by LangChain | build | `h-build` | 3 | 2 (p4,p7) | 0.30–0.40 | 9px | 2.0px |

---

## TABLE 7 — CANVAS ENCODING (FULL)

| Visual Property | Node Type | Data Field | Rule | Low → High |
|---|---|---|---|---|
| Member radius | Problem | `gap_score` | sqrt 7–20px | 7px (gap=0) → 20px (gap=5) |
| Member radius | Solution | fixed | 9px | — |
| Hub outer ring | Hub | fixed | r=26, stroke-dasharray 12,8 | Spinning 9s CSS animation |
| Hub inner fill | Hub | cluster | r=18, fill 11% opacity | Glow filter `gh` (5px blur) |
| Hub ambient halo | Hub | cluster | r=38, fill 4% opacity | Subtle depth layer |
| Hub center label | Hub | `members` | Integer count | — |
| Hub sub-label | Hub | `lbl` | 11 chars, dy=42 | Cluster name below ring |
| Spoke line | Spoke edge | cluster | stroke-dasharray 3,6 | opacity 0.22 |
| Node glow | Problem | `pmf_score` | >1.5→g1 >3→g2 >5→g3 | 3px → 7px → 12px blur |
| Pulse speed | Problem | `gap_velocity` | >0.7→0.85s >0.4→1.6s | None → fast |
| Gap label | Problem | `gap_score` | Shown if ≥1, dy=-(r+5) | Score above node |
| Fill opacity | Problem/Solution | `type` | problem=0.82, solution=0.55 | — |
| Border width | Member | `source_count` | >3 → 2px, else 1.2px | 1.2px → 2.0px |
| Cross-edge opacity | Cross edge | `strength` | 0.12 + str×0.38 | 0.12 → 0.50 |
| Cross-edge width | Cross edge | `strength` | 0.5 + str×2.2 | 0.5px → 2.7px |
| Cluster badge | Cluster header | `gap_ratio` | Problems only: XX% gap | 31% → 100% |
| Hover dim | All | interaction | non-connected → opacity 0.07 | — |
| Spoke toggle | Layout | UI button | `⊛ Hub-Spoke ON/OFF` | Hides hubG + spokeG layers |

---

## TABLE 8 — INTERACTION MATRIX

| Trigger | Target | nodeEls dim | hubEls dim | spokeEls dim | linkEls dim | Tooltip |
|---|---|---|---|---|---|---|
| Hover member node | connected nodes only | Non-connected | Other clusters | Non-member spokes | Non-connected | Member PMF details |
| Hover hub node | cluster members | Other clusters | Other hubs | Other cluster spokes | Non-cluster links | Hub: members + gap ratio |
| Hover cluster header | cluster members | Other clusters | Other hubs | Other cluster spokes | Non-cluster links | — |
| Click cluster header | collapse/expand | Hidden (display:none) | Hub stays visible | Hidden | Unchanged | — |
| Toggle Hub-Spoke OFF | hub+spoke layers | Unchanged | display:none | display:none | Unchanged | — |
| Gap slider input | pmf filter | opacity 0.08 if gap < v | Unchanged | Unchanged | opacity 0.03 if gap < v | — |
| Cluster filter select | cluster filter | display:none (other cl) | display:none (other cl) | display:none (other cl) | display:none (other cl) | — |
| Drag member node | dragged node | Unchanged | Unchanged | Unchanged | Unchanged | — |

---

## TABLE 9 — WHITESPACE MAP

| Problem ID | Label | Cluster | Hub | Spoke Connects To | Cross-Edges | Gap Score | Hub-Spoke Insight |
|---|---|---|---|---|---|---|---|
| `p12` | Revenue-based financing | capital | `h-capital` | Hub only | 0 | **4.50** | Only connection is spoke to hub — isolated in bipartite layer; capital hub surrounded by 3 zero-solution problems |
| `p9` | SEO vs paid acquisition ROI | growth | `h-growth` | Hub only | 0 | 2.80 | Spoke-only node; growth hub shows the unserved gap visually |
| `s9` | Replit | build | `h-build` | Hub only | 0 | — | Solution with no problem edges; potential over-supply in build cluster |

---

*Hackamap · Agent Forge Hackathon 2026 · $0 TCO · v1.1*
