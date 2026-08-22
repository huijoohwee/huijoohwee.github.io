---
title: "Webpage Markdown Guidelines"
doc_type: "Guidelines"
date: "2026-05-27"
lang: "en-US"
frontmatter_contract: "required"
---

# Webpage Markdown Guidelines

## Markdown YAML Frontmatter Enforcement

- Canonical webpage-to-Markdown specs, extraction docs, capture templates, and runtime-ready Markdown artifacts must start with a valid YAML frontmatter block as the first block in the file.
- Frontmatter is the SSOT for source metadata, extraction scope, active variants, provenance, and reusable context keys resolved elsewhere in the document.
- Canonical authored webpage Markdown docs use plain YAML for frontmatter and related schema-bearing blocks; do not replace normal authoring syntax with normalized typed wrappers.
- Normalized `{key, type, value}` wrappers are permitted only in dedicated validation fixtures that explicitly test ingest -> parse -> render or ingest -> parse -> extract fidelity.
- Scalars that contain reserved punctuation, including inline `:` content, must be quoted so strict YAML parsers read extraction metadata deterministically.
- Parser warning, repair, or fallback behavior is recovery-only; malformed YAML frontmatter remains an upstream authoring defect that must be fixed at source.

## Overview

**Webpage documentation**: implement site-agnostic scraping to maximize applicability, adapt across domains and platforms to ensure versatility, avoid hardcoded selectors to preserve flexibility, apply general-purpose parsers to enhance reusability, configure extraction patterns to enable customization, define single-responsibility sections to maintain clarity, orchestrate with metadata to secure traceability, and avoid embedded assumptions to reduce fragility.

---

## Context—Intent—Directive (CID) Framework

### Definition
- **Context**: focus domain of concern
- **Intent**: desired principle or guiding goal
- **Directive**: explicit prohibition or required safeguard

### Sorting
Each line/column is organized alphabetically (A→Z) for clarity and neutrality.

---

## Three-Beat Mantra Form

Owned by [Webpage Markdown Mantras & CID Table Module](./webpage-markdown-mantras.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Context—Intent—Directive Table

Owned by [Webpage Markdown Mantras & CID Table Module](./webpage-markdown-mantras.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Implementation Principles

Owned by [Webpage Markdown Extraction Module](./webpage-markdown-extraction.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Anti-Pattern Guards

**Developers avoid prohibited extraction violations**:

❌ Hardcoded CSS selectors in code → ✅ Configuration-driven selector patterns  
❌ Site-specific extraction logic → ✅ Generic parsing with heuristic detection  
❌ Lossy HTML-to-markdown conversion → ✅ Semantic-preserving transformation  
❌ Missing image alt text → ✅ Comprehensive asset documentation  
❌ Flat document structure → ✅ Hierarchical outline preservation  
❌ Broken internal links → ✅ Maintained cross-reference integrity  
❌ Presentation-only markup → ✅ Semantic structure extraction  
❌ Single-page validation → ✅ Multi-site testing coverage  

---

## Extraction Validation Checklist

**Pre-Output** (Required):
- [ ] Developers confirm zero hardcoded site-specific selectors
- [ ] Developers verify all sections have proper heading hierarchy (h1-h6)
- [ ] Developers ensure all images include alt text or descriptions
- [ ] Developers validate all links are absolute URLs or properly resolved
- [ ] Developers test markdown renders correctly in standard viewers

**Quality Review** (Required):
- [ ] Reviewers audit for content completeness
- [ ] Reviewers verify semantic structure preservation
- [ ] Reviewers confirm metadata extraction (title, description, dates)
- [ ] Reviewers validate table/list structure integrity
- [ ] Reviewers check asset documentation completeness

**Fidelity Validation** (Required):
- [ ] Validators compare original page to markdown output
- [ ] Validators verify all navigation elements are documented
- [ ] Validators confirm interactive elements are captured
- [ ] Validators test cross-references and anchor links
- [ ] Validators ensure no content sections are missing

---

## Document Structure Standard

Owned by [Webpage Markdown Structure & Schema Module](./webpage-markdown-structure.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Markdown Syntax Standards

Owned by [Webpage Markdown Structure & Schema Module](./webpage-markdown-structure.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Metadata Schema

Owned by [Webpage Markdown Structure & Schema Module](./webpage-markdown-structure.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Role—Action—Outcome

**Role: Content Extractor**  
→ Action: parses HTML semantically, identifies content patterns, extracts all text/media, maintains document hierarchy, preserves metadata  
→ Outcome: produces complete content capture without information loss

**Role: Structure Analyzer**  
→ Action: detects page layout, identifies UI components, maps navigation hierarchy, documents grid systems, catalogs interactive elements  
→ Outcome: delivers comprehensive structural documentation enabling full page reconstruction

**Role: Link Processor**  
→ Action: extracts all hyperlinks, resolves relative URLs, maintains anchor targets, preserves cross-references, validates link integrity  
→ Outcome: ensures navigational fidelity and reference completeness

**Role: Asset Documenter**  
→ Action: catalogs all media, extracts alt text, documents video sources, preserves audio references, maintains accessibility metadata  
→ Outcome: provides complete media inventory with accessibility information

**Role: Markdown Generator**  
→ Action: transforms HTML to markdown, preserves semantic structure, maintains formatting, applies syntax standards, validates output  
→ Outcome: creates clean, standardized markdown maintaining source fidelity

**Role: Quality Validator**  
→ Action: verifies completeness, tests across sites, validates structure, checks accessibility, ensures standards compliance  
→ Outcome: guarantees output quality through systematic validation

---

## Mantra Application

**"CID frames extraction standards, SRP isolates document concerns, RAO aligns processor responsibilities, SVO clarifies transformation semantics"**

- **CID frames**: Establishes scope (webpage extraction), purpose (lossless documentation), rules (no hardcoding + configuration-driven + metadata-based)
- **SRP isolates**: Ensures each processor handles single concern (content vs structure vs assets vs links), each component owns focused responsibility
- **RAO aligns**: Maps content extractors, structure analyzers, link processors, asset documenters, markdown generators, quality validators to their deliverables
- **SVO clarifies**: Expresses all operations (extractors parse HTML, analyzers detect patterns, generators transform structure) with grammatical precision ensuring implementation clarity

---

## Universal Extraction Patterns

Owned by [Webpage Markdown Extraction Module](./webpage-markdown-extraction.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Output Format Specifications

Owned by [Webpage Markdown Extraction Module](./webpage-markdown-extraction.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Neutrality Validation

Owned by [Webpage Markdown Extraction Module](./webpage-markdown-extraction.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Accessibility Preservation

Owned by [Webpage Markdown Extraction Module](./webpage-markdown-extraction.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Version Control

Owned by [Webpage Markdown Extraction Module](./webpage-markdown-extraction.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Prompt Template

Owned by [Webpage Markdown Extraction Module](./webpage-markdown-extraction.md). Loaded on demand; this entry keeps the anchor stable for inbound references.
