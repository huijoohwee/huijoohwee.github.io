---
title: "Scaffolding Pattern Diagnostics Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-08-20"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
parent: "Scaffolding Pattern Guidelines"
parent_version: "1.0.0"
---

# Scaffolding Pattern Diagnostics Module

## Scope & Ownership

Owns the operational surfaces: problems and diagnostics, token sharing and performance, and the domain applicability matrix.

This module is loaded on demand from [Scaffolding Pattern Guidelines](./scaffolding-pattern-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Problems and Diagnostics

**Common Scaffolding Issues**:
*   **Premature Implementation**: Implementing logic before stubs are verified.
    *   *Diagnostic*: Check if tests exist before logic code.
*   **Configuration Drift**: Hardcoded values persist after refinement.
    *   *Diagnostic*: grep for magic numbers/strings in implementation files.
*   **Scaffolding Rot**: Stubs remain unimplemented or diverge from documentation.
    *   *Diagnostic*: Run linter/type-checker on stubs.

**Diagnostic Checklist**:
1.  Are all public methods documented with docstrings?
2.  Do all stubs raise `NotImplementedError` or return placeholders?
3.  Is there a corresponding test file for every module?

---

## Token Sharing and Performance

**Context**:
Efficient rendering in dual-mode editors (Markdown + Canvas) requires sharing lexed tokens to avoid redundant processing.

**Directives**:
*   **Shared Lexing**: Lex markdown once, share tokens between Viewer, Editor, and Slide modes.
*   **Cache Invalidation**: Invalidate token cache only when source text changes.
*   **Semantic Rendering**: Use semantic HTML (`article`, `section`, `nav`) instead of generic `div`s for better accessibility and structure.
*   **Unified State**: Store tokens in a central store (e.g., Zustand) to be consumed by multiple components.

---

---

## Domain Applicability Matrix

**Developers apply scaffolding pattern across all software domains**:

| Domain | Scaffolding Example | Key Validation | Configuration Points |
|--------|---------------------|----------------|----------------------|
| **Exploratory Data Analysis** | Stub `plot_distribution()` → test with sample data → add customization | Visualization renders correctly | Chart type, color scheme, bin count |
| **ML Pipeline** | Stub `train_model()` → test with toy dataset → add checkpointing | Training loss decreases | Epochs, learning rate, optimizer |
| **MLOps/LLMOps** | Stub `deploy_model()` → test with local container → add health checks | Service responds to requests | Container image, port, resource limits |
| **Web Backend** | Stub `handle_request()` → test with mock request → add authentication | Endpoint returns expected status | Route, method, auth strategy |
| **Data Pipeline** | Stub `transform_data()` → test with fixture records → add validation | Transformation produces correct schema | Transformation rules, thresholds |
| **Infrastructure** | Stub `provision_resources()` → test with minimal config → add monitoring | Resources created successfully | Region, instance type, scaling policy |

---
