---
title: "Webpage Markdown Structure & Schema Module"
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

# Webpage Markdown Structure & Schema Module

## Scope & Ownership

Owns the shape of the produced document: structure standard, syntax standards, and metadata schema.

This module is loaded on demand from [Webpage Markdown Guidelines](./webpage-markdown-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Document Structure Standard

### Required Sections (In Order)

1. **Header Block**
   - Page title (H1)
   - Source URL
   - Scrape metadata (date, version)
   - Table of contents

2. **Navigation Documentation**
   - Primary navigation menu
   - Breadcrumb trails
   - Utility navigation

3. **Content Sections**
   - Hero/header content
   - Main content blocks
   - Feature sections
   - Use cases/examples

4. **Data Tables**
   - Pricing tables
   - Comparison matrices
   - Statistics grids

5. **Interactive Elements**
   - Forms structure
   - Buttons and CTAs
   - Tabs/accordions content

6. **Media Catalog**
   - Images with descriptions
   - Video embeds
   - Audio references

7. **Footer Documentation**
   - Footer navigation
   - Legal links
   - Contact information

8. **Appendices**
   - Visual assets referenced
   - External resources
   - Metadata summary

---

---

## Markdown Syntax Standards

### Headings
```markdown
# Page Title (H1) - Use once for page title
## Main Sections (H2) - Primary content divisions
### Subsections (H3) - Content groupings
#### Minor Sections (H4) - Detail breakdowns
##### Small Sections (H5) - Fine details
###### Micro Sections (H6) - Smallest divisions
```

### Lists
```markdown
- Unordered list item
- Another item
  - Nested item
  - Another nested

1. Ordered list item
2. Second item
   1. Nested ordered
   2. Another nested

Term
: Definition description
: Additional definition
```

### Tables
```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Links
```markdown
[Link text](https://example.com/path)
[Link with title](https://example.com "Title text")
[Internal reference](#section-anchor)
```

### Images
```markdown
![Alt text](https://example.com/image.jpg)
![Alt text](https://example.com/image.jpg "Image title")
```

### Code
```markdown
Inline `code` with backticks

```language
Code block with syntax highlighting
```
```

### Emphasis
```markdown
*italic* or _italic_
**bold** or __bold__
***bold italic*** or ___bold italic___
~~strikethrough~~
```

### Blockquotes
```markdown
> Quoted text
> Continued quote
>
> New paragraph in quote
```

### Horizontal Rules
```markdown
---
```

### HTML Fallback (Use Sparingly)
```markdown
<details>
<summary>Collapsible section</summary>
Hidden content
</details>

<kbd>Ctrl</kbd> + <kbd>C</kbd>
```

---

---

## Metadata Schema

### Document Metadata
```yaml
---
title: "Page Title"
source_url: "https://example.com/page"
scraped_date: "2026-02-14"
platform: "Platform Name (e.g., Docusaurus, WordPress)"
language: "en"
version: "1.0"
---
```

### Section Metadata
```markdown
## Section Name
**Type:** [Hero | Feature | Pricing | Navigation | Footer]
**Layout:** [Grid | Carousel | Table | List | Cards]
**Interactive:** [Yes | No]
```

### Asset Metadata
```markdown
**Media:** 
- Type: [Image | Video | Audio]
- URL: https://example.com/asset.ext
- Alt: "Description"
- Dimensions: 1920x1080
- Format: JPG/PNG/WebP/MP4
```

---
