# Knowledge Graph JSON-LD Schema v1.0.0

> **Compliant with:** structural-only, domain-agnostic pipeline principles  
> **Languages:** English (en-us), Chinese (zh-cn)  
> **Use Case:** Agentic GraphRAG with domain-agnostic structure

---

## 📁 Schema Files

<!-- SCHEMA_FILES_START -->
```
schema/AgenticRAG/
├── v1/
│   └── context.jsonld                         # Base @context (semantic vocabulary)
├── README.md                                 # This file
├── node-schema.jsonld                        # Node structural contract (@id + labels required)
├── edge-schema.jsonld                        # Edge structural contract (@id + source/target/label required)
├── graph-schema.jsonld                       # Graph container contract (@context/@graph + metadata)
├── metadata.jsonld                           # Provenance/metrics conventions (structural, not semantic)
├── neutrality.jsonld                         # Domain-agnostic constraints and anti-patterns
├── colors.jsonld                             # Lean Startup MVP palette (renderer directive)
├── canvas.jsonld                             # Canvas/renderer integration directives
├── panels.jsonld                             # Panel/pane interaction directives (UI contract)
├── curation.jsonld                           # Graph Data curation surfaces (tables/editors/presentation)
├── settings.jsonld                           # Settings surface (config-driven behavior)
├── settings-flow.jsonld                      # Settings provenance flow (modules/classes/functions/line ranges)
├── semantic-mode.jsonld                      # Semantic mode surface (renderer directive)
├── keyword-mode.jsonld                       # Keyword mode surface (renderer directive)
├── geospatial.jsonld                         # Geospatial mode surface (map + bounded spatial queries)
├── youtube.jsonld                            # YouTube transcript ingest surface (segments + metadata)
├── markdown.jsonld                           # Markdown ingest surface (provenance + preview hooks)
├── parser.jsonld                             # Parser surface (token linking + edge elevation)
├── pipeline.jsonld                           # Pipeline stage vocabulary (ingest→validate→produce→reuse)
├── workflow.jsonld                           # Workflow vocabulary (agents/tools/stages)
├── orchestrator.jsonld                       # Orchestrator contract (workflow execution + exports)
├── graphrag-pipeline.jsonld                  # GraphRAG pipeline directives
├── roles-actions-outcomes-schema.jsonld      # Role→Action→Outcome wording contract
├── documentation.jsonld                      # Documentation copy patterns (neutral wording)
├── stage-metrics.jsonld                      # Stage metrics schema (quality gates, drift checks)
├── evals.jsonld                              # Evaluation harnesses and metrics (quality gates)
├── action-verbs.jsonld                       # Action verb canonicalization (neutral verbs)
├── system-design-pattern.jsonld              # System design patterns (domain-agnostic)
├── prompt-shaping-heuristics-framework.jsonld # Prompt shaping heuristics (agentic, domain-agnostic)
├── ast-traversal.jsonld                      # AST traversal surface (code analysis mode)
├── aie-book-chapter-snippets.jsonld          # Example ingest surface (snippets)
├── agenticrag-guidelines-and-surfaces-map.graph.jsonld # Guidelines ↔ surfaces map (sync artifact)
├── knowgrph-documents-map.graph.jsonld      # Knowgrph docs/documents ↔ schema surfaces map (sync artifact)
├── example-graph.jsonld                      # Complete working example graph
└── example-lean-startup-layer-modes.jsonld   # Example layer modes (Lean Startup tags + palette)
```
<!-- SCHEMA_FILES_END -->

---

## 🔄 Docs Sync (Knowgrph)

This folder stays in sync with Knowgrph documentation via a deterministic sync script:

- **Source:** `/Users/huijoohwee/Documents/GitHub/knowgrph/docs/documents`
- **Target artifact:** `schema/AgenticRAG/knowgrph-documents-map.graph.jsonld`
- **Language compliance:** the sync enforces both `en-us` and `zh-cn` support (see Languages above). Document node `language` is inferred from filename (`*.zh-cn.*` → `zh-cn`), otherwise defaults to `en-us`.

### Canvas Zoom/Fit SSOT (Knowgrph)

- **Preset SSOT:** `knowgrph/grph-shared/src/zoom/presets.ts` (capped 16:9 frame + default fill ratio)
- **Consumers:** `knowgrph/canvas/src/components/GraphCanvas/{fit.ts,simulation.ts}` (fit transforms + seeding/disjoint sizing)
- **Flow renderer:** `knowgrph/canvas/src/components/FlowCanvas.tsx` applies the same fit/zoom policies while rendering via a native Canvas2D Flow renderer.

### UI Event SSOT (Knowgrph)

- Mode/selection sync events that cross repo boundaries should be centralized in `knowgrph/grph-shared/src/*/events.ts` to keep payload shapes aligned.

## Agentic GraphRAG/Knowledge Graph Pipeline Guidelines

## COMPLY
`/GitHub/{huijoohwee.github.io/guidelines/{codebase-neutrality-guidelines.md,codebase-maintainability-guidelines.md},knowgrph/todo.md#L5-21}`

## ALIGN (Semantic Definition)
- **GRAPHS Elements:** nodes, edges, graph layers (subgraphs, groups, clusters, communities), labels, text
- **GRAPHS Configs:** grouping, positioning, collisions, timing, knobs

## Baseline & Code Hygiene
- Reuse existing elements/configs.
- Enhance natively; forbid duplication.
- Prevent interference across layers/modes.
- Remove legacy/conflicting/stale code.

## Pipeline Discipline
- Scope: `/GitHub/{knowgrph,gympgrph,curagrph}` → import → render.
- Support all `/GitHub/sandbox/` test data; no hardcoding.
- Use semantic HTML; forbid generic `<div>`.
- Centralize configs (labels, boxes, collisions, timing, knobs).
- Resolve cross‑repo conflicts.
- Test only bounded diffs; forbid indefinite runs.
 - Treat `.md`, `.markdown`, `.mmd`, `.mdx` as canonical Markdown ingest extensions in the graph pipeline; keep document path/provenance neutral.

## Canvas Layout Rules
- FORBID GRAPHS Elements overlaps or single‑line formations.
- MAINTAIN 80:20 element‑to‑empty space ratio.
- OPTIMIZE modularity, memory, rendering.
- REUSE shared utilities.

## GRAPHS Elements
- Centralized zoom utils (“Fit to View/Screen/Selection”) on 1920×1080; always center centroid.
- ENFORCE Fit to Screen 80:20 ratio.
- FORCE nodes/subgraphs into grid (d3.forceSimulation + constraints).
- Snap to grid for block‑like appearance.
- Combine simulation + constraints for hybrid layout.

### Run (write)

```bash
python3 schema/AgenticRAG/sync_map.py --mode write
```

### Run (check / CI)

```bash
python3 schema/AgenticRAG/sync_map.py --mode check
```

## 🚀 Quick Start

### 1. **Reference Context in Your Data**

```json
{
  "@context": "https://huijoohwee.github.io/schema/AgenticRAG/v1/context.jsonld",
  "@type": "kg:Graph",
  "@graph": [
    {
      "@type": "kg:Node",
      "@id": "node:123",
      "labels": ["Entity"],
      "skos:prefLabel": "Example term",
      "skos:altLabel": ["Example synonym"],
      "schema:sameAs": ["http://example.org/concept/example-term"],
      "name": ["Example term", "Example synonym"],
      "chunk_text": "Your content here...",
      "embedding": [0.1, 0.2, 0.3]
    }
  ]
}
```

### 2. **Validate Your Graph**

```javascript
// Validator checks (structural only, no domain semantics)
✅ All node @id values are unique
✅ All edge source/target reference existing nodes
✅ Required fields present: @id, labels (nodes), label (edges)
❌ NO validation of property content or label semantics
```

### 3. **Export to DuckDB**

```sql
-- Ingest JSON-LD
CREATE TABLE nodes AS 
  SELECT * FROM read_json('graph.jsonld', 
    format='auto', 
    columns={
      id: 'VARCHAR',
      labels: 'VARCHAR[]',
      properties: 'JSON',
      chunk_text: 'VARCHAR',
      embedding: 'FLOAT[]',
      geo: 'JSON',
      metadata: 'JSON'
    }
  );

-- Query with agent
SELECT * FROM nodes 
WHERE array_contains(labels, 'Company')
  AND metadata->>'confidence' > 0.9;
```

---

## 🎯 Core Principles

### ✅ **DO:**
- Treat `labels[]` and `relation` as opaque strings
- Store arbitrary domain data in `properties` JSON
- Use `chunk_text` for RAG grounding
- Include `metadata` with source, confidence, timestamp
- Support geo-coordinates via `geo` object
- Link media via `media_url`
- Keep renderer-specific settings (color palettes, layer modes) in separate JSON-LD directives such as `colors.jsonld` and `semantic-mode.jsonld` rather than embedding them into the core node and edge schemas; this keeps structural validation domain-agnostic while still allowing a shared Lean Startup MVP palette and AI-KG layer configuration for downstream visualizers. When graphs include neutral external references (for example properties that point to markdown or code artifacts modeled with the `Markdown` class), UI layers such as Knowgrph Canvas can use those properties to drive split-pane external file previews (textarea editor + GFM-first `marked` renderer) anchored to the active node or edge selection, without changing the structural JSON-LD contract.
- When emitting graphs intended for Knowgrph Canvas, optionally populate the `tags` array with Lean Startup categories such as `idea`, `hypothesis`, `execution`, `pivot`, and `alert`; renderers that understand the AgenticRAG directives will map these tags onto the shared MVP palette defined in `colors.jsonld` while structural validators continue to treat `tags` as an opaque, domain-agnostic field.

### ❌ **DON'T:**
- Require domain-specific fields (no "name", "description" mandates)
- Validate property semantics (Schema doesn't know "name" should be string)
- Hardcode visual properties (color, size → decided by Renderer)
- Reference test data or specific domains in schema

---

## 🔧 Pipeline Integration

### **Phase 1: UI Curation (tabular editor)**
```
Curator enters data → Export as JSON
↓
Uses this schema as target format
```

### **Phase 2: Ingest**
```
Loader: Fetches JSON (syntax validation only)
Parser: Builds node/edge objects (structure validation)
Validator: Checks @id uniqueness, referential integrity
GraphData: Stores canonical representation
```

#### Markdown Ingest (optional)
```
UI import: local file / URL (.md)
↓
Parser emits Graph JSON-LD where each extracted block carries provenance:
  metadata.documentPath
  metadata.lineStart / metadata.lineEnd
  metadata.timestamp
↓
Renderers can use this metadata to highlight and preview source markdown without changing the core schema

Preview rendering hooks (UI-level, schema-neutral):
- Fenced `mermaid` blocks may render as diagrams; per-block YAML config may be supported inside the fence.
- Fenced `geojson` blocks may render as maps; `json` fences must be explicitly detected as GeoJSON (do not assume all JSON is GeoJSON).
- Explorer folder expansion/collapse must not clear or change the active markdown document; only explicit file selection changes activeDocumentPath.
- GeoJSON map previews should keep a stable map container element across deferred-load states so they don’t require a remount/toggle to appear.
- In Viewer surfaces, GeoJSON-renderable blocks follow the global Beside/Inline/Render mode; in Presentation surfaces, GeoJSON-renderable blocks (including `json` fences recognized as GeoJSON) may default to Render even when the global mode is Inline.
- GeoJSON previews require an injected renderer hook (e.g., `geoDatasetIntegration.renderGeoJsonFeatureCollection`); if unavailable, surfaces should degrade gracefully with a compact error bar (not a full-height panel).
```

### **Phase 3: Produce**
```
Exporter queries GraphData → Generates JSON-LD
Uses context.jsonld as @context
Outputs to file/API
```

### **Phase 4: Reuse**
```
Renderer: D3.js/three.js consumes JSON-LD
Indexer: RAG system indexes chunk_text + embeddings
Agent: Queries DuckDB with SQL/Cypher
```

---

## 🤖 Agent Query Patterns

### **Vector Search + Confidence Filtering**
```sql
SELECT n.id, n.chunk_text, n.metadata
FROM nodes n
WHERE array_cosine_similarity(n.embedding, $query_vec) > 0.8
  AND (n.metadata->>'confidence')::float > 0.9
ORDER BY similarity DESC
LIMIT 10;
```

### **Multi-Hop Traversal**
```cypher
-- Via duckdb-age extension
MATCH (a:Entity)-[:FOUNDED_BY]->(p:Person)-[:LOCATED_IN]->(c:City)
WHERE a.properties->>'industry' = 'AI'
  AND (a.metadata->>'confidence')::float > 0.8
RETURN a, p, c;
```

### **Spatial Reasoning**
```sql
SELECT n.id, n.properties->>'name', n.geo
FROM nodes n
WHERE ST_Distance(
  ST_Point((n.geo->>'lng')::float, (n.geo->>'lat')::float),
  ST_Point($lng, $lat)
) < 50000  -- 50km radius
AND array_contains(n.labels, 'Company');
```

---

## 🌐 Multilingual Usage

### **English Context**
```json
{
  "@context": {
    "@language": "en-us",
    "chunk_text": "rag:chunk_text"
  }
}
```

### **Chinese Context**
```json
{
  "@context": {
    "@language": "zh-cn",
    "chunk_text": "rag:chunk_text"
  }
}
```

**Labels automatically localized:**
```json
"rdfs:label": [
  {"@value": "Text Chunk", "@language": "en-us"},
  {"@value": "文本块", "@language": "zh-cn"}
]
```

---

## 📊 Metadata Best Practices

### **Synonym Clustering Pattern**
```json
{
  "@id": "node:synonym_cluster_001",
  "labels": ["Concept"],
  "skos:prefLabel": "car",
  "skos:altLabel": ["automobile", "vehicle"],
  "schema:sameAs": [
    "http://dbpedia.org/resource/Car",
    "http://wikidata.org/entity/Q1420"
  ],
  "name": ["car", "automobile", "vehicle"]
}
```

### **Node Metadata Example**
```json
{
  "metadata": {
    "source": "system:row_abc123",
    "confidence": 0.95,
    "timestamp": "2025-12-19T10:00:00Z",
    "curator": "curator:example",
    "validation_status": "verified",
    "last_updated": "2025-12-19T10:30:00Z"
  }
}
```

### **Edge Metadata Example**
```json
{
  "metadata": {
    "source": "system:relationship_xyz",
    "confidence": 0.88,
    "timestamp": "2025-12-19T10:15:00Z",
    "derivation": "llm_extracted",
    "reviewed_by": "curator:example"
  }
}
```

---

## 🔄 Schema Versioning

**Current:** `1.0.0`

**Compatibility:**
```json
{
  "metadata": {
    "schemaVersion": "1.0.0",
    "compatible_versions": ["1.0.0", "1.0.1"]
  }
}
```

**Migration Path:**
- Backward compatible within major versions
- @context can be extended without breaking changes
- Agents query schemaVersion (or schema_version alias) to adapt behavior

---

## 🖼️ Canvas Integration (v1.1 Update)

Recent updates to the Knowgrph Canvas pipeline ensure seamless rendering of this schema:
- **Radial Layout Stability**: Force simulation forces are automatically disabled in Radial mode to prevent layout drift.
- **Fit-to-Screen Policy**: Fit uses capped `1920×1080` (16:9) with `targetFillRatio=0.8` and responds to UI chrome changes (e.g. sidebar toggles).
- **Zoom State Isolation**: Zoom state is cached per viewKey (render/layout/frontmatter/semantic + presentation toggles) to prevent cross-mode contamination.
- **Non-Overlap Guarantees**: Group bbox collision is enforced whenever `layout.groups.enabled !== false`; legacy `groupBboxCollide` is deprecated for disabling.
- **Theme Alignment**: Labels and headings automatically adapt to System/Light/Dark themes.
- **Theme-Safe Defaults**: Renderer label colors are theme-derived by default (no hardcoded black/white schema defaults).
- **Performance**: Optimized caching for adjacency maps and layout positions.
- **Renderer Exclusivity**: D3 2D, Flow 2D, 3D, and Geospatial Mode are mutually exclusive at runtime to forbid hidden background rendering/recalculation; only the active mode is mounted and may consume shared requests.
- **2D Renderer Toggle**: Canvas supports a 2D renderer toggle (D3 ↔ Flow) while preserving selection and isolating view/layout caches by renderer id.

---

## 🧪 Validation Checklist

### **Structural (✅ Required)**
- [ ] All nodes have unique `@id`
- [ ] All nodes have non-empty `labels[]`
- [ ] All edges have `source`, `target`, `label`
- [ ] All edge references point to existing node `@id`
- [ ] Valid JSON syntax

### **Semantic (❌ NOT Validated by Schema)**
- ❌ Property value types (e.g., "name" is string)
- ❌ Label validity (e.g., "Company" is an allowed type)
- ❌ Business rules (e.g., "founded" date < "dissolved" date)

**Rationale:** Schema is domain-agnostic → Domain validation is application logic

---

## 📦 Export Formats

| Format | Use Case | File Extension |
|--------|----------|----------------|
| **JSON-LD** | Agents, RAG, Semantic Web | `.jsonld` |
| **JSON** | D3.js, Generic Apps | `.json` |
| **CSV** | Spreadsheets, Analysis | `.csv` (nodes + edges) |
| **DuckDB** | Agent Queries, Hybrid Search | `.duckdb` |
| **Neo4j Cypher** | Graph Database Import | `.cypher` |
| **GraphML** | Visualization Tools | `.graphml` |

---

## 🛠️ Tool Integration

### **D3.js Visualization**
```javascript
d3.json('graph.jsonld').then(data => {
  const nodes = data['@graph'].filter(n => n['@type'] === 'kg:Node');
  const edges = data['@graph'].filter(e => e['@type'] === 'kg:Edge');
  // Render force-directed layout
});
```

### **RAG Retrieval**
```python
query_text = "example query"
# 1) load graph nodes that have chunk_text and embedding
# 2) compute similarity(query_text_embedding, node.embedding)
# 3) filter by metadata.confidence if present
# 4) return top-k nodes and relevant subgraph context
```

### **Neo4j Import**
```cypher
// Generated by Exporter from graph.jsonld
CREATE (n:Entity {id: 'node:123', properties: {...}})
CREATE (e:Edge {relation: 'FOUNDED_BY', ...})
MERGE (a)-[r:FOUNDED_BY]->(b);
```

---

## 📚 Resources

- **Example Data:** See `example-graph.jsonld` and `example-lean-startup-layer-modes.jsonld`
- **Renderer Palette:** See `colors.jsonld` (Lean Startup MVP node/edge palette shared across layer modes)
- **Agentic Use Cases:** See "Why This Schema Matters for Agentic GraphRAG"

---

## 🤝 Contributing

### **Adding Language Support**
1. Fork schema files
2. Add `@language` entries to `rdfs:label` and `rdfs:comment`
3. Update `@context` default language if needed
4. Test with multilingual data

### **Extending Schema (Backward Compatible)**
1. Add new optional fields to context.jsonld
2. Increment minor version (1.0.0 → 1.1.0)
3. Document in CHANGELOG.md
4. Never make new fields required

---

## ⚖️ License

MIT License - Use freely in commercial and open-source projects

---

## 📞 Support

- **Issues:** github.com/huijoohwee/huijoohwee.github.io/issues
- **Discussions:** For agentic GraphRAG patterns
- **Email:** Schema maintainer contact

**Status:** Production Ready ✅
