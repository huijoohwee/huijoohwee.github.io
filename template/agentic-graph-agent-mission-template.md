---
schema: agentic-graph/dashboard-template/v1
title: Agent Mission dashboard
template_id: agent-mission
template_version: '2.0.0'
mission_snapshot: mission
dashboard:
  version: 1
  widgets:
    mission:overview: {template: table, title: Codebase → Agent Mission}
    mission:tree: {template: tree, title: Span tree, subtitle: Agent Mission · selected run, aspectRatio: '16:9'}
    mission:codebase: {template: codebase, title: Codebase knowledge graph, subtitle: Retained native snapshot · read only, aspectRatio: '16:9'}
    mission:index-economics: {template: disclosure, title: Indexing economics, expanded: true}
    mission:execution-economics: {template: disclosure, title: Agent execution economics, expanded: true}
    graph:nodes: {template: metric, title: Nodes, tone: blue, aspectRatio: '16:9'}
    graph:edges: {template: metric, title: Edges, tone: green, aspectRatio: '16:9'}
    graph:density: {template: metric, title: Density, tone: green, aspectRatio: '16:9'}
    graph:signals: {template: metric, title: Signals, tone: rose, aspectRatio: '16:9'}
    graph:grid: {template: metric, title: Grid, tone: blue, aspectRatio: '16:9'}
    graph:node-types: {template: bar, title: Node Types, subtitle: Distribution by node type, tone: blue, aspectRatio: '16:9'}
    graph:edge-types: {template: bar, title: Relationship Types, subtitle: Distribution by edge type, tone: green, aspectRatio: '16:9'}
    graph:degree-leaders: {template: table, title: Connection Leaders, subtitle: Highest combined in/out degree, tone: slate, aspectRatio: '16:9'}
    graph:numeric-summary: {template: bar, title: Numeric Fields, subtitle: Average finite numeric values, tone: amber, aspectRatio: '16:9'}
    graph:semantic-buckets: {template: area, title: Semantic Buckets, subtitle: 'Input, process, output, and media fields', tone: rose, aspectRatio: '16:9'}
    graph:property-coverage: {template: line, title: Property Coverage, subtitle: Filled property count by node type, tone: green, aspectRatio: '16:9'}
  boards:
    mission: [[mission:tree]]
    dashboard-metrics: [[graph:nodes, graph:edges, graph:density, graph:signals, graph:grid]]
    structure: [[graph:node-types, graph:edge-types, graph:degree-leaders]]
    signals: [[graph:numeric-summary, graph:semantic-buckets, graph:property-coverage]]
bindings:
  mission:overview:
    rows: stages
    columns: [{label: Observation, path: label}, {label: Value, path: value}]
  mission:tree:
    rows: spans
    columns:
      - {label: ID, path: id}
      - {label: Parent, path: parent}
      - {label: Kind, path: kind}
      - {label: Span, path: operation}
      - {label: State, path: status}
      - {label: Time ms, path: durationMs}
      - {label: CPU ms, path: cpuMs}
      - {label: Peak RSS bytes, path: peakMemoryBytes}
      - {label: Tokens, path: tokens}
      - {label: Estimated USD, path: costUsd}
      - {label: Model, path: model}
  mission:index-economics:
    rows: overview.indexMetrics
    columns: [{label: Metric, path: label}, {label: Value, path: value}, {label: Basis, path: detail}]
  mission:execution-economics:
    rows: overview.workflowMetrics
    columns: [{label: Metric, path: label}, {label: Value, path: value}, {label: Basis, path: detail}]
  graph:nodes: {value: metrics.nodes}
  graph:edges: {value: metrics.edges}
  graph:density: {value: metrics.density}
  graph:signals: {value: metrics.signals}
  graph:grid: {value: metrics.grid}
  graph:node-types:
    rows: cards.node-types
    columns: [{label: Type, path: label}, {label: Nodes, path: value}, {label: Detail, path: detail}]
  graph:edge-types:
    rows: cards.edge-types
    columns: [{label: Type, path: label}, {label: Relationships, path: value}, {label: Detail, path: detail}]
  graph:degree-leaders:
    rows: cards.degree-leaders
    columns: [{label: Label, path: label}, {label: Value, path: value}, {label: Detail, path: detail}]
  graph:numeric-summary:
    rows: cards.numeric-summary
    columns: [{label: Field, path: label}, {label: Average, path: value}, {label: Detail, path: detail}]
  graph:semantic-buckets:
    rows: cards.semantic-buckets
    columns: [{label: Bucket, path: label}, {label: Count, path: value}, {label: Detail, path: detail}]
  graph:property-coverage:
    rows: cards.property-coverage
    columns: [{label: Type, path: label}, {label: Properties, path: value}, {label: Detail, path: detail}]
---

# Agent Mission {{run.id}}

This historical report retains the complete input observation, native manifest, codebase projection,
and shared dashboard configuration. The Mission dashboard uses the same components as the live
reference. Source Files exposes the input JSON, this template, and the output Markdown together.

Unknown measurements remain unknown; reused work retains its original measurements. The saved
report grants no execution or release authority and does not reconnect a live stream.
