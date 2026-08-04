# Exploratory Data Analysis Guidelines

## Core Principles

**Corpus-Aware Profiling**: EDA operates on statistical properties, not domain semantics | Configuration-driven metrics | Schema-agnostic analysis | Notebook-compatible outputs | Zero hardcoded assumptions about data distributions

**Insight Generation**: Automated detection of patterns, anomalies, quality issues -> actionable recommendations for pipeline tuning

---

## Statistical Profiling

### Component: StatisticalProfiler

**From corpus to statistics**: StatisticalProfiler -> computes distribution metrics -> aggregates counts and frequencies -> generates summary statistics -> identifies data characteristics -> delivers profiling report with recommendations.

```
FUNCTION StatisticalProfiler.profile_corpus({ documents, config }) -> { profile }
  // StatisticalProfiler computes corpus statistics via configurable metrics
  
  stats <- {
    document_count: count(documents),
    entity_statistics: {},
    relationship_statistics: {},
    structural_statistics: {}
  }
  
  // Entity profiling
  all_entities <- flatten([doc.entities FOR doc IN documents])
  stats.entity_statistics <- {
    total_count: count(all_entities),
    unique_count: count(unique(all_entities, by: "canonical_form")),
    type_distribution: compute_distribution(all_entities, by: "type"),
    mention_frequency: compute_frequency_histogram(all_entities),
    avg_mentions_per_doc: count(all_entities) / count(documents)
  }
  
  // Relationship profiling
  all_edges <- flatten([doc.relationships FOR doc IN documents])
  stats.relationship_statistics <- {
    total_count: count(all_edges),
    confidence_distribution: compute_distribution(all_edges, by: "confidence", bins: config.bin_count),
    edge_type_distribution: compute_distribution(all_edges, by: "type"),
    avg_edges_per_doc: count(all_edges) / count(documents)
  }
  
  // Structural profiling
  stats.structural_statistics <- {
    avg_tokens_per_doc: mean([doc.token_count FOR doc IN documents]),
    block_type_distribution: compute_distribution(flatten([doc.blocks FOR doc IN documents]), by: "type"),
    chunk_size_distribution: compute_distribution(flatten([doc.chunks FOR doc IN documents]), by: "token_count")
  }
  
  RETURN { statistics: stats, timestamp: now() }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `eda/profiler.ext` | `StatisticalProfiler` | `profile_corpus` | StatisticalProfiler computes corpus statistics via configurable metrics | `config.bin_count` | `CorpusProfile{}` |

---

## Quality Assessment

### Component: QualityAssessor

**From metrics to insights**: QualityAssessor -> evaluates extraction quality -> detects data quality issues -> flags anomalies -> compares against thresholds -> delivers quality report with severity levels.

```
FUNCTION QualityAssessor.assess_quality({ corpus_profile, config }) -> { quality_report }
  // QualityAssessor evaluates data quality via threshold comparison
  
  issues <- []
  
  // Entity quality checks
  IF corpus_profile.entity_statistics.unique_count / corpus_profile.entity_statistics.total_count < config.min_entity_uniqueness:
    issues.append({
      category: "entity_duplication",
      severity: "warning",
      metric: "uniqueness_ratio",
      actual: corpus_profile.entity_statistics.unique_count / corpus_profile.entity_statistics.total_count,
      expected: config.min_entity_uniqueness,
      recommendation: "Increase entity_merge_threshold to reduce duplicates"
    })
  
  // Confidence distribution check
  low_confidence_edges <- count_below_threshold(
    corpus_profile.relationship_statistics.confidence_distribution,
    threshold: config.min_acceptable_confidence
  )
  
  IF low_confidence_edges / corpus_profile.relationship_statistics.total_count > config.max_low_confidence_ratio:
    issues.append({
      category: "low_confidence_relationships",
      severity: "error",
      metric: "low_confidence_ratio",
      actual: low_confidence_edges / corpus_profile.relationship_statistics.total_count,
      expected: config.max_low_confidence_ratio,
      recommendation: "Increase edge_confidence_threshold or review extraction heuristics"
    })
  
  // Structural consistency check
  chunk_size_variance <- variance(corpus_profile.structural_statistics.chunk_size_distribution)
  IF chunk_size_variance > config.max_chunk_variance:
    issues.append({
      category: "inconsistent_chunking",
      severity: "warning",
      metric: "chunk_size_variance",
      actual: chunk_size_variance,
      expected: config.max_chunk_variance,
      recommendation: "Adjust chunk_token_limit or coherence_metric"
    })
  
  RETURN {
    overall_quality: compute_quality_score(issues, config.severity_weights),
    issues: issues,
    metrics_summary: extract_key_metrics(corpus_profile)
  }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `eda/quality.ext` | `QualityAssessor` | `assess_quality` | QualityAssessor evaluates data quality via threshold comparison | `config.min_entity_uniqueness` | `QualityReport{}` |

---

## Visualization Generation

### Component: VisualizationGenerator

**From statistics to visuals**: VisualizationGenerator -> selects plot types from config -> generates distribution charts -> creates network visualizations -> exports to notebook-compatible formats -> delivers visual insights.

```
FUNCTION VisualizationGenerator.generate_visualizations({ corpus_profile, config }) -> { visualizations }
  // VisualizationGenerator creates plots via configured chart types
  
  visualizations <- []
  
  FOR EACH viz_spec IN config.visualization_specs:
    data <- extract_data(corpus_profile, viz_spec.data_path)
    
    chart <- {
      type: viz_spec.chart_type,  // histogram, scatter, network, heatmap
      data: format_for_chart(data, viz_spec.format_params),
      config: viz_spec.display_config,
      title: viz_spec.title,
      export_format: viz_spec.export_format  // svg, png, json
    }
    
    visualizations.append(chart)
  
  RETURN { charts: visualizations, notebook_compatible: true }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `eda/visualizations.ext` | `VisualizationGenerator` | `generate_visualizations` | VisualizationGenerator creates plots via configured chart types | `config.visualization_specs` | `Visualization[]` |

---

## Anomaly Detection

### Component: AnomalyDetector

**From distributions to outliers**: AnomalyDetector -> applies statistical tests -> identifies outliers via configured methods -> flags anomalous patterns -> delivers anomaly report with context.

```
FUNCTION AnomalyDetector.detect_anomalies({ corpus_profile, config }) -> { anomalies }
  // AnomalyDetector identifies outliers via statistical methods
  
  detector <- config.anomaly_detection_methods[config.active_method]
  
  anomalies <- []
  
  // Entity mention outliers
  mention_frequencies <- corpus_profile.entity_statistics.mention_frequency
  outliers <- detector.find_outliers(mention_frequencies, config.outlier_threshold)
  
  FOR EACH outlier IN outliers:
    anomalies.append({
      type: "entity_mention_anomaly",
      entity_id: outlier.id,
      value: outlier.mention_count,
      z_score: outlier.z_score,
      investigation_required: outlier.z_score > config.critical_threshold
    })
  
  RETURN { anomalies: anomalies, method: detector.name }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `eda/anomaly.ext` | `AnomalyDetector` | `detect_anomalies` | AnomalyDetector identifies outliers via statistical methods | `config.anomaly_detection_methods` | `Anomaly[]` |

---

## Configuration Schema

**bin_count**: Histogram bins for distribution analysis  
**quality_thresholds**: `{ min_entity_uniqueness, max_low_confidence_ratio, max_chunk_variance }` - Quality gates  
**visualization_specs**: `[{ chart_type, data_path, export_format }]` - Chart definitions  
**anomaly_detection_methods**: `{ zscore, iqr, isolation_forest }` - Outlier detection algorithms

---

## Quality Metrics

**Profile Completeness**: Computed metrics / Total available metrics  
**Anomaly Detection Rate**: Flagged outliers / Total data points  
**Visualization Coverage**: Generated charts / Requested specs