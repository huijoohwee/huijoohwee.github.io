Reusable JSON-LD Schema Pattern for Synonym Clustering

This template provides a consistent way to represent and cluster synonyms across automation flows using JSON-LD. It leverages SKOS for internal synonym management and sameAs for external equivalence.

📐 Schema Pattern

{
  "@context": {
    "skos": "http://www.w3.org/2004/02/skos/core#",
    "schema": "http://schema.org/",
    "name": "http://schema.org/name"
  },
  "@id": "http://example.org/concept/{UUID}",
  "skos:prefLabel": "{preferred_term}",
  "skos:altLabel": [
    "{synonym_1}",
    "{synonym_2}",
    "{synonym_3}"
  ],
  "schema:sameAs": [
    "{external_URI_1}",
    "{external_URI_2}"
  ],
  "name": [
    "{preferred_term}",
    "{synonym_1}",
    "{synonym_2}"
  ]
}

🧩 Field Guidelines

@id → Canonical identifier for the concept (use UUID or stable URI).

skos:prefLabel → Preferred human-readable label.

skos:altLabel → Synonyms, variants, or alternative labels.

schema:sameAs → External references to equivalent concepts in other vocabularies (e.g., Wikidata, DBpedia).

name → Redundant clustering field for pipelines that expect schema.org alignment.

🔄 Usage in Automation Flows

Clustering: Group all terms under the same @id.

Synonym Expansion: Use skos:altLabel for query expansion.

Cross-Graph Linking: Resolve equivalence with schema:sameAs.

Normalization: Always map incoming terms to their canonical @id.

✅ Example Instance

{
  "@context": {
    "skos": "http://www.w3.org/2004/02/skos/core#",
    "schema": "http://schema.org/",
    "name": "http://schema.org/name"
  },
  "@id": "http://example.org/concept/123",
  "skos:prefLabel": "car",
  "skos:altLabel": ["automobile", "vehicle"],
  "schema:sameAs": [
    "http://dbpedia.org/resource/Car",
    "http://wikidata.org/entity/Q1420"
  ],
  "name": ["car", "automobile", "vehicle"]
}

📝 Implementation Notes

Keep @id stable across pipelines.

Use SKOS consistently for synonym clustering.

Add sameAs links when external equivalence is known.

Ensure automation flows normalize input terms to the canonical @id before processing.