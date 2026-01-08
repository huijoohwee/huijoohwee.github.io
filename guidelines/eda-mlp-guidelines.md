# EDA ML Pipeline Guidelines

## Core Principles

**ML Artifact Analysis**: EDA examines embeddings, features, clusters, model outputs -> statistical validation without domain assumptions | Dimensionality-agnostic | Algorithm-neutral assessment | Notebook-exportable insights

**Quality Transparency**: Reveal ML component behavior through metrics, visualizations, diagnostics -> guide hyperparameter tuning

---

## Embedding Space Analysis

### Component: EmbeddingAnalyzer

**From vectors to insights**: EmbeddingAnalyzer -> computes embedding statistics -> measures vector space properties -> detects distribution anomalies -> generates dimensionality reduction -> delivers embedding quality report.

```
FUNCTION EmbeddingAnalyzer.analyze_embedding_space({ embeddings, config }) -> { analysis }
  // EmbeddingAnalyzer evaluates vector space properties via statistical measures
  
  vectors <- [e.vector FOR e IN embeddings]
  
  statistics <- {
    dimension: length(vectors[0]),
    total_count: count(vectors),
    norm_distribution: compute_distribution([norm(v) FOR v IN vectors], bins: config.bin_count),
    pairwise_similarity_stats: {
      mean: mean(sample_pairwise_similarities(vectors, config.sample_size)),
      std: std(sample_pairwise_similarities(vectors, config.sample_size)),
      percentiles: compute_percentiles([0.25, 0.5, 0.75, 0.95])
    }
  }
  
  // Dimensionality reduction for visualization
  IF config.enable_dimensionality_reduction:
    reducer <- config.reduction_algorithms[config.active_reducer]
    reduced_vectors <- reducer.fit_transform(vectors, target_dim: config.target_dimensions)
    
    statistics.reduced_space <- {
      method: reducer.name,
      explained_variance: reducer.explained_variance_ratio,
      coordinates: reduced_vectors
    }
  
  // Detect embedding collapse
  rank <- estimate_rank(vectors, config.rank_threshold)
  IF rank < config.min_expected_rank:
    statistics.warnings <- [{
      issue: "embedding_collapse",
      effective_rank: rank,
      expected: config.min_expected_rank,
      recommendation: "Review embedding model or increase diversity"
    }]
  
  RETURN { statistics: statistics, timestamp: now() }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `eda/ml/embeddings.ext` | `EmbeddingAnalyzer` | `analyze_embedding_space` | EmbeddingAnalyzer evaluates vector space properties via statistical measures | `config.reduction_algorithms` | `EmbeddingAnalysis{}` |

---

## Feature Distribution Analysis

### Component: FeatureDistributionAnalyzer

**From features to patterns**: FeatureDistributionAnalyzer -> profiles feature distributions -> detects skewness and outliers -> measures feature correlations -> identifies low-variance features -> delivers feature quality diagnostics.

```
FUNCTION FeatureDistributionAnalyzer.analyze_features({ feature_vectors, config }) -> { analysis }
  // FeatureDistributionAnalyzer profiles feature statistics via distribution metrics
  
  feature_names <- get_feature_names(feature_vectors)
  
  feature_stats <- {}
  FOR EACH feature_name IN feature_names:
    values <- [fv.features[feature_name] FOR fv IN feature_vectors]
    
    feature_stats[feature_name] <- {
      mean: mean(values),
      std: std(values),
      min: min(values),
      max: max(values),
      skewness: compute_skewness(values),
      kurtosis: compute_kurtosis(values),
      missing_rate: count_missing(values) / count(values),
      unique_count: count(unique(values))
    }
    
    // Flag low-variance features
    IF feature_stats[feature_name].std < config.min_variance_threshold:
      feature_stats[feature_name].warning <- "low_variance"
  
  // Correlation matrix
  correlation_matrix <- compute_correlation(feature_vectors, method: config.correlation_method)
  
  high_correlations <- find_pairs_above_threshold(correlation_matrix, threshold: config.correlation_threshold)
  
  RETURN {
    feature_statistics: feature_stats,
    correlations: { matrix: correlation_matrix, high_correlations: high_correlations },
    recommendations: generate_feature_recommendations(feature_stats, config)
  }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `eda/ml/features.ext` | `FeatureDistributionAnalyzer` | `analyze_features` | FeatureDistributionAnalyzer profiles feature statistics via distribution metrics | `config.correlation_method` | `FeatureAnalysis{}` |

---

## Clustering Quality Assessment

### Component: ClusterQualityEvaluator

**From clusters to metrics**: ClusterQualityEvaluator -> computes clustering quality scores -> measures cluster separation -> evaluates cohesion -> detects optimal cluster count -> delivers clustering diagnostics.

```
FUNCTION ClusterQualityEvaluator.evaluate_clustering({ clusters, embeddings, config }) -> { evaluation }
  // ClusterQualityEvaluator computes clustering quality via internal metrics
  
  metrics <- {}
  
  // Silhouette score
  silhouette_scores <- compute_silhouette(clusters, embeddings, config.distance_metric)
  metrics.silhouette <- {
    mean: mean(silhouette_scores),
    per_cluster: aggregate_by_cluster(silhouette_scores, clusters)
  }
  
  // Davies-Bouldin index (lower is better)
  metrics.davies_bouldin <- compute_davies_bouldin(clusters, embeddings)
  
  // Calinski-Harabasz score (higher is better)
  metrics.calinski_harabasz <- compute_calinski_harabasz(clusters, embeddings)
  
  // Cluster size distribution
  metrics.cluster_sizes <- {
    distribution: [count(c.members) FOR c IN clusters.values()],
    imbalance_ratio: max(cluster_sizes) / mean(cluster_sizes)
  }
  
  // Elbow analysis for optimal k
  IF config.enable_elbow_analysis:
    k_range <- range(config.min_k, config.max_k)
    inertias <- [compute_inertia_for_k(embeddings, k) FOR k IN k_range]
    
    metrics.elbow_analysis <- {
      k_range: k_range,
      inertias: inertias,
      suggested_k: find_elbow_point(inertias, k_range)
    }
  
  RETURN {
    quality_metrics: metrics,
    overall_quality: compute_composite_score(metrics, config.metric_weights),
    recommendations: generate_clustering_recommendations(metrics, config)
  }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `eda/ml/clustering.ext` | `ClusterQualityEvaluator` | `evaluate_clustering` | ClusterQualityEvaluator computes clustering quality via internal metrics | `config.distance_metric` | `ClusteringEvaluation{}` |

---

## Model Performance Profiling

### Component: ModelPerformanceProfiler

**From predictions to diagnostics**: ModelPerformanceProfiler -> measures inference latency -> profiles memory usage -> tracks batch throughput -> generates performance reports -> delivers optimization recommendations.

```
FUNCTION ModelPerformanceProfiler.profile_model({ model_operations, config }) -> { profile }
  // ModelPerformanceProfiler measures model performance via runtime metrics
  
  latency_stats <- {
    mean: mean([op.duration_ms FOR op IN model_operations]),
    p50: percentile([op.duration_ms FOR op IN model_operations], 0.5),
    p95: percentile([op.duration_ms FOR op IN model_operations], 0.95),
    p99: percentile([op.duration_ms FOR op IN model_operations], 0.99)
  }
  
  throughput <- count(model_operations) / sum([op.duration_ms FOR op IN model_operations]) * 1000
  
  memory_profile <- {
    peak_mb: max([op.memory_mb FOR op IN model_operations]),
    average_mb: mean([op.memory_mb FOR op IN model_operations])
  }
  
  RETURN {
    latency: latency_stats,
    throughput_ops_per_sec: throughput,
    memory: memory_profile,
    optimization_suggestions: generate_performance_recommendations(latency_stats, memory_profile, config)
  }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `eda/ml/performance.ext` | `ModelPerformanceProfiler` | `profile_model` | ModelPerformanceProfiler measures model performance via runtime metrics | `config.percentiles` | `PerformanceProfile{}` |

---

## Configuration Schema

**reduction_algorithms**: `{ pca, tsne, umap }` - Dimensionality reduction methods  
**correlation_method**: `{ pearson, spearman }` - Feature correlation computation  
**distance_metric**: `{ euclidean, cosine }` - Clustering distance function  
**metric_weights**: `{ silhouette, davies_bouldin, calinski_harabasz }` - Composite scoring

---

## Quality Metrics

**Embedding Space Health**: Effective rank / Expected rank  
**Feature Quality Score**: Non-low-variance features / Total features  
**Clustering Quality**: Composite score from silhouette, DB, CH indices  
**Model Efficiency**: Throughput vs target performance