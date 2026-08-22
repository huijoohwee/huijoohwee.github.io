---
title: "Webpage Markdown Extraction Module"
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
parent: "Webpage Markdown Guidelines"
parent_version: "1.0.0"
---

# Webpage Markdown Extraction Module

## Scope & Ownership

Owns the extraction act itself: implementation principles, extraction patterns, output formats, neutrality, accessibility, version control, and the prompt template.

This module is loaded on demand from [Webpage Markdown Guidelines](./webpage-markdown-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Implementation Principles

**Extraction Strategy**
- Developers use semantic HTML parsing to extract meaningful content
- Developers avoid CSS selector hardcoding; instead configure selectors externally
- Developers apply heuristic-based pattern detection for component identification

**Content Processing**
- Developers preserve all semantic information from source HTML
- Developers maintain document hierarchy through proper heading levels
- Developers extract both visible and hidden content (modals, tabs, accordions)

**Metadata Handling**
- Developers capture page metadata (title, description, keywords, Open Graph tags)
- Developers record provenance information (source URL, scrape timestamp)
- Developers extract data attributes and ARIA labels for context

**Asset Documentation**
- Developers document all media references (images, videos, audio)
- Developers preserve alt text, captions, and descriptions
- Developers maintain absolute URLs for external resources

**Structure Preservation**
- Developers maintain navigation hierarchies (menus, breadcrumbs)
- Developers preserve tabular data structures
- Developers document grid and layout patterns

**Link Management**
- Developers extract all hyperlinks with full URLs
- Developers preserve anchor targets and fragment identifiers
- Developers maintain internal cross-references

**Interactive Elements**
- Developers document form structures and field types
- Developers capture button labels and actions
- Developers note interactive component states

**Typography & Formatting**
- Developers preserve inline formatting (bold, italic, code)
- Developers maintain list structures (ordered, unordered, definition)
- Developers document blockquotes with attribution

**Configuration-Driven Behavior**
- Developers externalize extraction rules to configuration files
- Developers parameterize selector patterns for reusability
- Developers enable customization through metadata schemas

**Testing Strategy**
- Developers validate extraction across multiple website types
- Developers test with diverse page structures (blogs, e-commerce, documentation)
- Developers verify output completeness through automated checks

---

---

## Universal Extraction Patterns

### Pattern Detection Heuristics

**Navigation Detection**
```yaml
selectors:
  primary: ['nav', '[role="navigation"]', '.nav', '#nav']
  breadcrumbs: ['.breadcrumb', '[aria-label*="breadcrumb"]']
  menu: ['.menu', '.navigation', '[role="menu"]']
```

**Content Section Detection**
```yaml
selectors:
  hero: ['.hero', '.banner', 'header.main']
  features: ['.features', '.feature-grid', '[class*="feature"]']
  pricing: ['.pricing', '[class*="price"]', '.plans']
```

**Interactive Element Detection**
```yaml
selectors:
  buttons: ['button', '.btn', '[role="button"]']
  forms: ['form', '.form']
  tabs: ['[role="tab"]', '.tabs', '.tab-list']
  modals: ['.modal', '[role="dialog"]']
```

**Data Structure Detection**
```yaml
selectors:
  tables: ['table', '.table-responsive']
  grids: ['.grid', '[class*="grid"]', '[style*="grid"]']
  lists: ['ul', 'ol', 'dl', '.list']
```

---

---

## Output Format Specifications

### File Naming Convention
```
webpage-{domain}-{slug}.md

Examples:
- webpage-remotion-dev.md
- webpage-github-readme.md
- webpage-docs-api-reference.md
```

### Section Delimiter Standard
```markdown
---

## SECTION NAME

Content here...

---
```

### Visual Layout Documentation
```markdown
### Component Layout

```
┌─────────────────────────────────┐
│ Header                          │
├─────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐        │
│ │ Col1│ │ Col2│ │ Col3│        │
│ └─────┘ └─────┘ └─────┘        │
├─────────────────────────────────┤
│ Footer                          │
└─────────────────────────────────┘
```
```

### Table of Contents Generation
```markdown
## 📋 TABLE OF CONTENTS

- [Section 1](#section-1)
  - [Subsection 1.1](#subsection-11)
  - [Subsection 1.2](#subsection-12)
- [Section 2](#section-2)
- [Section 3](#section-3)
```

---

---

## Neutrality Validation

### Cross-Site Validation Matrix

| Site Type      | Structure Test | Content Test | Links Test | Media Test |
|----------------|----------------|--------------|------------|------------|
| Documentation  | ✓              | ✓            | ✓          | ✓          |
| E-commerce     | ✓              | ✓            | ✓          | ✓          |
| Blog/News      | ✓              | ✓            | ✓          | ✓          |
| SaaS Landing   | ✓              | ✓            | ✓          | ✓          |
| Portfolio      | ✓              | ✓            | ✓          | ✓          |

**Validation Requirements**:
- Test extraction on 5+ different site types
- Verify structure preservation across CMSs
- Validate link resolution across domains
- Confirm media cataloging completeness

---

---

## Accessibility Preservation

**WCAG Compliance Mapping**

- Developers extract ARIA labels and roles
- Developers preserve alt text for all images
- Developers document keyboard navigation patterns
- Developers maintain heading hierarchy (no skipped levels)
- Developers capture form labels and error messages
- Developers preserve screen reader text
- Developers document color/contrast context where relevant

---

---

## Version Control

**Document Versioning**
```markdown
**Version:** 1.0  
**Last Updated:** 2026-02-14  
**Changes:** Initial extraction
```

**Change Tracking**
```markdown
## Changelog

### Version 1.1 (2026-02-15)
- Updated pricing table
- Added new feature section
- Fixed broken image links

### Version 1.0 (2026-02-14)
- Initial document creation
```

---

---

## Prompt Template

```
adhere to `webpage-markdown-guidelines.md`,
scrape {URL} and generate `webpage-{identifier}.md` with:
- Complete content extraction
- Hierarchical structure preservation
- Full asset documentation
- Interactive element mapping
- 100% fidelity to source
- LOD granularity (UI, layout, grids, tables, rich media)
```

---

**END OF DOCUMENT**
