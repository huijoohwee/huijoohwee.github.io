---
title: "Parser Guidelines"
doc_type: "Guidelines"
date: "2026-05-27"
lang: "en-US"
frontmatter_contract: "required"
---

# Parser Guidelines

## Core Principles

**Structure-Aware Extraction**: Parser detects document structure -> preserves provenance -> segments into semantic units | Format-agnostic interfaces | Configuration-driven chunking | Zero format assumptions

**Provenance Primacy**: All extracted units track source location, block type, parent hierarchy | Bidirectional links between semantics and source structure

## Markdown YAML Frontmatter Enforcement

- Markdown parsers must treat the opening YAML frontmatter block as the canonical metadata owner when it is present.
- The frontmatter block must be the first block in the file; parsers should not infer equivalent metadata from later prose or duplicate body declarations.
- Canonical authored Markdown remains plain YAML; normalized `{key, type, value}` wrappers are additive validation-fixture syntax, not the default authored contract.
- When normalized Flow Editor fixtures use `{key, type, value}` wrappers, parsers must preserve the wrapper `key` as the semantic field/port key and must not substitute declaration container names such as `handles.source` or `handles.target`.
- Parsers must preserve `superagent_harness_template`, `superagent_harness_demo`, and related harness metadata as frontmatter metadata. They must not convert those sections into graph nodes or edges unless the author declares them under `flow:`.
- Parsers must surface explicit warnings when frontmatter YAML is malformed instead of silently treating invalid metadata as acceptable input.
- Parser repair is a recovery path only; malformed YAML still represents invalid source that should be corrected upstream.
- Scalars containing reserved punctuation must be quoted so strict YAML parsing stays deterministic across ingestion paths.

## Knowgrph Parser Routing Contract

- Runtime-ready demo documents should declare `kgParserRoutingContract.version: "knowgrph-parser-routing/v1"` in opening frontmatter when they are intended to drive Canvas routing.
- Parser logic is source-owned: opening frontmatter, `flow`, `flow.nodes`, `flow.edges`, `flow_diagrams`, `kgStrybldrStoryboard`, and authored workflow payloads are the canonical inputs; renderers must not infer replacement graph keys from filenames, labels, body mirrors, or prior UI state.
- Routing keys remain neutral and explicit: `kgCanvasSurfaceMode`, `kgCanvasRenderMode`, `kgCanvas2dRenderer`, `kgDocumentSemanticMode`, `kgFrontmatterModeEnabled`, `kgMultiDimTableModeEnabled`, and `kgDocumentStructureBaselineLock`.
- Supported diagram kinds are declared as data, not renderer code paths: `mermaid_flowchart`, `mermaid_gitgraph`, `mermaid_architecture`, `mermaid_eventmodeling`, `mermaid_gantt`, `frontmatter_flow`, and `strybldr_storyboard`.
- Supported surfaces are projections over the same parsed graph authority: `2D Renderer: Flow Editor`, `2D Renderer: Storyboard`, and BottomPanel/FloatingPanel Mermaid panels.
- Edge policy: explicit `graphData.edges`, `flow.edges`, `workflow.edges`, and diagram edges are the SSOT. Renderers may filter visible connectors but must not synthesize conflicting topology, remap legacy edge labels, or hide fork/publish edges declared by source metadata.
- Fork policy: fork, branch, candidate, approval, review, and publish metadata remain authored fields and must surface through parsed graph nodes/edges without downstream alias stacking.

---

## Document Parsing

### Component: DocumentParser

**From raw files to structured units**: DocumentParser -> detects file format via config -> extracts text with layout preservation -> identifies block types -> annotates provenance metadata -> delivers structured document tree.

```
FUNCTION DocumentParser.parse_document({ file_path, config }) -> { document }
  // DocumentParser extracts structured content via format handlers
  
  format <- detect_format(file_path, config.format_handlers)
  handler <- config.format_handlers[format]
  
  raw_content <- handler.extract(file_path)
  
  blocks <- []
  FOR EACH segment IN raw_content.segments:
    block <- {
      type: classify_block_type(segment, config.block_classifiers),
      content: segment.text,
      provenance: {
        source: file_path,
        line_range: [segment.start_line, segment.end_line],
        block_type: segment.type,  // Paragraph, Section, CodeBlock, Table, List
        parent_id: segment.parent_ref
      }
    }
    blocks.append(block)
  
  RETURN { blocks: blocks, metadata: raw_content.metadata }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `parse/document.ext` | `DocumentParser` | `parse_document` | DocumentParser extracts structured content via format handlers | `config.format_handlers` | `Document{}` |

---

## Structure Detection

### Component: StructureClassifier

**From flat text to hierarchical structure**: StructureClassifier -> analyzes layout patterns -> detects boundaries via heuristics -> builds parent-child relationships -> assigns block types from schema -> delivers nested document structure.

```
FUNCTION StructureClassifier.classify_blocks({ raw_blocks, config }) -> { classified }
  // StructureClassifier assigns block types via pattern matching
  
  classified <- []
  
  FOR EACH block IN raw_blocks:
    features <- extract_structural_features(block, config.feature_extractors)
    
    block_type <- None
    max_confidence <- 0
    
    FOR EACH classifier IN config.block_classifiers:
      score <- classifier.predict(features)
      IF score > max_confidence AND score >= config.classification_threshold:
        block_type <- classifier.type
        max_confidence <- score
    
    classified.append({
      block: block,
      type: block_type OR "Paragraph",  // Default fallback
      confidence: max_confidence,
      provenance: merge_provenance(block.provenance, { classifier: classifier.id })
    })
  
  RETURN build_hierarchy(classified, config.hierarchy_rules)
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `parse/structure.ext` | `StructureClassifier` | `classify_blocks` | StructureClassifier assigns block types via pattern matching | `config.block_classifiers` | `ClassifiedBlock[]` |

---

## Chunking Strategy

### Component: SemanticChunker

**From blocks to semantic chunks**: SemanticChunker -> aggregates blocks by coherence -> respects token limits -> preserves provenance chains -> splits on natural boundaries -> delivers context-aware chunks for downstream processing.

```
FUNCTION SemanticChunker.create_chunks({ blocks, config }) -> { chunks }
  // SemanticChunker segments blocks into token-bounded coherent units
  
  chunks <- []
  current_chunk <- []
  current_tokens <- 0
  
  FOR EACH block IN blocks:
    block_tokens <- estimate_tokens(block.content, config.tokenizer)
    coherence <- compute_coherence(current_chunk, block, config.coherence_metric)
    
    IF current_tokens + block_tokens > config.chunk_token_limit OR coherence < config.min_coherence:
      IF NOT is_empty(current_chunk):
        chunks.append(finalize_chunk(current_chunk, config))
        current_chunk <- []
        current_tokens <- 0
    
    current_chunk.append(block)
    current_tokens += block_tokens
  
  RETURN { chunks: chunks, avg_tokens: mean(chunk.token_count FOR chunk IN chunks) }
END
```

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `parse/chunker.ext` | `SemanticChunker` | `create_chunks` | SemanticChunker segments blocks into token-bounded coherent units | `config.chunk_token_limit`, `config.tokenizer` | `Chunk[]` |

---

## Configuration Schema

**format_handlers**: `{ pdf, docx, html, markdown }` - Format-specific extractors  
**block_classifiers**: `{ Section, Paragraph, CodeBlock, Table, List, ListItem }` - Structure detectors  
**chunk_token_limit**: Token budget per chunk  
**coherence_metric**: `{ embedding_similarity, lexical_overlap }` - Boundary detection method

---

## Quality Metrics

**Structure Coverage**: Classified blocks / Total blocks  
**Provenance Completeness**: Blocks with line ranges / Total blocks  
**Chunk Coherence**: Mean intra-chunk similarity scores
