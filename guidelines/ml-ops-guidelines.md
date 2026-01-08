# ML Operations Guidelines

## Core Principles

**Model-Agnostic Interfaces**: All ML operations abstracted via config -> model selection at runtime -> embedding/classification/clustering decoupled from algorithms | Zero hardcoded model assumptions | Metric-driven quality control

**Feature Neutrality**: Feature engineering operates on metadata properties, not domain semantics | Schema-driven feature extraction | Provenance for all transformations

---

## Embedding Generation

### Component: EmbeddingGenerator

**From text to vectors**: EmbeddingGenerator -> loads model from config -> batches inputs for efficiency -> generates embeddings -> caches results -> delivers vector representations with provenance.

```
FUNCTION EmbeddingGenerator.embed_texts({ texts, config }) -> { embeddings }
  // EmbeddingGenerator transforms text into vectors via configured model
  
  model <- load_model(config.embedding_model_id, config.model_registry)
  batch_size <- config.embedding_batch_size
  
  embeddings <- []
  
  FOR batch IN chunk_by_size(texts, batch_size):
    batch_vectors <- model.encode(batch, config.encoding_params)
    
    FOR EACH text, vector IN zip(batch, batch_vectors):
      embeddings.append({
        text_id: text.id,
        vector: normalize(vector, config.normalization_strategy),
        dimension: length(vector),
        provenance: {
          model: config.embedding_model_id,
          version: model.version,
          timestamp: now()
        }
      })
    
    metrics.histogram("embeddings.batch_duration_ms", batch_duration)
  
  RETURN { embeddings: embeddings, cache_key: compute_cache_key(texts, config) }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `ml/embeddings.ext` | `EmbeddingGenerator` | `embed_texts` | EmbeddingGenerator transforms text into vectors via configured model | `config.embedding_model_id` | `Embedding[]` |

---

## Similarity Computation

### Component: SimilarityComputer

**From vectors to distances**: SimilarityComputer -> selects metric from config -> computes pairwise similarities -> applies threshold filtering -> ranks results -> delivers scored pairs with confidence.

```
FUNCTION SimilarityComputer.compute_similarities({ embeddings, config }) -> { similarities }
  // SimilarityComputer calculates distances between embeddings via metric
  
  metric <- config.similarity_metrics[config.active_metric]
  threshold <- config.similarity_threshold
  
  similarities <- []
  
  FOR EACH pair IN generate_pairs(embeddings, config.pairing_strategy):
    score <- metric.compute(pair.source.vector, pair.target.vector)
    
    IF score >= threshold:
      similarities.append({
        source_id: pair.source.text_id,
        target_id: pair.target.text_id,
        score: score,
        metric: metric.name,
        provenance: {
          source_embedding: pair.source.provenance,
          target_embedding: pair.target.provenance,
          computation_timestamp: now()
        }
      })
  
  RETURN rank_by_score(similarities, descending: true)
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `ml/similarity.ext` | `SimilarityComputer` | `compute_similarities` | SimilarityComputer calculates distances between embeddings via metric | `config.similarity_metrics` | `SimilarityPair[]` |

---

## Entity Clustering

### Component: ClusterManager

**From embeddings to groups**: ClusterManager -> applies clustering algorithm from config -> assigns cluster IDs -> computes cluster statistics -> validates coherence -> delivers entity groupings with quality metrics.

```
FUNCTION ClusterManager.cluster_entities({ embeddings, config }) -> { clusters }
  // ClusterManager groups embeddings via clustering algorithm
  
  algorithm <- config.clustering_algorithms[config.active_algorithm]
  vectors <- extract_vectors(embeddings)
  
  cluster_labels <- algorithm.fit_predict(vectors, config.algorithm_params)
  
  clusters <- {}
  FOR EACH embedding, label IN zip(embeddings, cluster_labels):
    IF label NOT IN clusters:
      clusters[label] <- []
    
    clusters[label].append({
      entity_id: embedding.text_id,
      distance_to_centroid: compute_distance(embedding.vector, algorithm.centroids[label])
    })
  
  // Compute cluster quality
  FOR EACH cluster_id IN clusters.keys():
    cluster_embeddings <- [e.vector FOR e IN clusters[cluster_id]]
    
    clusters[cluster_id].metadata <- {
      size: count(clusters[cluster_id]),
      coherence: compute_coherence(cluster_embeddings, config.coherence_metric),
      centroid: algorithm.centroids[cluster_id]
    }
  
  metrics.histogram("clusters.size_distribution", [c.metadata.size FOR c IN clusters.values()])
  
  RETURN { clusters: clusters, algorithm: algorithm.name }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `ml/clustering.ext` | `ClusterManager` | `cluster_entities` | ClusterManager groups embeddings via clustering algorithm | `config.clustering_algorithms` | `Cluster[]` |

---

## Feature Engineering

### Component: FeatureEngineer

**From properties to features**: FeatureEngineer -> extracts features from entity metadata -> applies transformations from config -> normalizes distributions -> delivers feature vectors for downstream ML.

```
FUNCTION FeatureEngineer.extract_features({ entities, config }) -> { feature_vectors }
  // FeatureEngineer transforms entity properties via feature extractors
  
  extractors <- config.feature_extractors
  
  feature_vectors <- []
  
  FOR EACH entity IN entities:
    features <- {}
    
    FOR EACH extractor IN extractors:
      raw_value <- entity.properties[extractor.property_key]
      
      IF raw_value IS NULL:
        features[extractor.name] <- extractor.default_value
      ELSE:
        features[extractor.name] <- extractor.transform(raw_value, extractor.params)
    
    normalized <- normalize_features(features, config.normalization_strategy)
    
    feature_vectors.append({
      entity_id: entity.id,
      features: normalized,
      provenance: { extractors: [e.name FOR e IN extractors], timestamp: now() }
    })
  
  RETURN feature_vectors
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `ml/features.ext` | `FeatureEngineer` | `extract_features` | FeatureEngineer transforms entity properties via feature extractors | `config.feature_extractors` | `FeatureVector[]` |

---

## Configuration Schema

**embedding_model_id**: Model identifier in registry  
**similarity_metrics**: `{ cosine, euclidean, dot_product }` - Distance functions  
**clustering_algorithms**: `{ kmeans, dbscan, hierarchical }` - Grouping methods  
**feature_extractors**: `{ property_key, transform, default_value }` - Feature definitions  
**normalization_strategy**: `{ min_max, z_score, l2_norm }` - Scaling method

---

## Quality Metrics

**Embedding Coverage**: Entities with embeddings / Total entities  
**Cluster Coherence**: Mean intra-cluster similarity  
**Similarity Precision**: True matches / Total above threshold  
**Feature Completeness**: Non-null features / Total features