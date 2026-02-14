# Webpage Markdown Guidelines

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

Each line is a three-beat `Context; Intent; Directive` mantra:

- Accessibility; preserve semantic structure; forbid presentation-only markup
- Accuracy; maintain content fidelity; forbid lossy transformations
- Anchors; preserve link targets; forbid broken references
- Annotations; capture metadata; forbid metadata loss
- Assets; document media references; forbid asset omission
- Attributes; extract data attributes; forbid attribute loss
- Blocks; preserve semantic units; forbid structure flattening
- Breadcrumbs; document navigation paths; forbid hierarchy loss
- Buttons; capture interactive elements; forbid action loss
- Cards; preserve component structure; forbid layout destruction
- Carousels; document slide content; forbid interaction loss
- Citations; maintain attribution; forbid source loss
- Classes; extract styling context; forbid visual information loss
- Code; preserve syntax highlighting; forbid formatting loss
- Completeness; capture all content; forbid partial extraction
- Components; identify UI patterns; forbid pattern loss
- Configuration; externalize extraction rules; forbid selector hardcoding
- Content; extract semantic meaning; forbid presentation coupling
- Context; preserve surrounding information; forbid isolation
- CTAs; document call-to-action elements; forbid conversion path loss
- Databases; process tables generically; forbid schema assumptions
- Diagrams; document visual relationships; forbid illustration loss
- Directories; abstract path references; forbid absolute paths
- Documentation; maintain comprehensive coverage; forbid undocumented elements
- Domains; operate site-agnostically; forbid site-specific logic
- Embeds; capture rich media; forbid embed loss
- Encoding; preserve character sets; forbid encoding errors
- Entities; decode HTML entities; forbid entity corruption
- Escaping; handle special characters; forbid malformed output
- Fallbacks; provide alternative text; forbid accessibility loss
- Fidelity; maximize detail capture; forbid information reduction
- Footers; document page metadata; forbid auxiliary content loss
- Forms; capture input structures; forbid interaction loss
- Fragments; preserve content sections; forbid segmentation loss
- Grids; document layout structures; forbid spatial information loss
- Headers; maintain heading hierarchy; forbid outline corruption
- Heuristics; detect patterns generically; forbid selector hardcoding
- Hierarchy; preserve document structure; forbid nesting loss
- Hyperlinks; maintain URL references; forbid link rot
- Icons; document visual indicators; forbid semantic loss
- Identifiers; extract element IDs; forbid reference loss
- Images; capture alt text and sources; forbid visual context loss
- Indexing; create navigation structures; forbid discoverability loss
- Inline; preserve inline formatting; forbid emphasis loss
- Interactivity; document dynamic elements; forbid functionality loss
- Labels; preserve form field labels; forbid context loss
- Language; detect content language; forbid locale loss
- Layout; document visual structure; forbid arrangement loss
- Links; preserve all hyperlinks; forbid navigation loss
- Lists; maintain list semantics; forbid ordering loss
- Localization; preserve language variants; forbid translation loss
- Mapping; create structure maps; forbid topology loss
- Markdown; use semantic syntax; forbid HTML fallback abuse
- Media; document multimedia content; forbid asset loss
- Metadata; extract page metadata; forbid context loss
- Metrics; document statistics; forbid quantitative data loss
- Modals; capture overlay content; forbid hidden content loss
- Navigation; preserve menu structures; forbid wayfinding loss
- Neutrality; remain platform-agnostic; forbid CMS coupling
- Nesting; maintain element hierarchy; forbid depth loss
- Notation; use standard conventions; forbid custom syntax
- Ordering; preserve sequence; forbid shuffle
- Paragraphs; maintain text flow; forbid reflow corruption
- Parsers; apply general-purpose logic; forbid site-specific parsers
- Paths; abstract URL patterns; forbid hardcoded domains
- Patterns; detect via heuristics; forbid manual classification
- Placeholders; document form defaults; forbid context loss
- Portability; enable cross-platform use; forbid tool coupling
- Positioning; document spatial layout; forbid coordinate loss
- Pricing; preserve table structures; forbid comparison loss
- Provenance; track source URLs; forbid attribution loss
- Queries; abstract search parameters; forbid query hardcoding
- Quotes; preserve attribution; forbid citation loss
- References; maintain cross-references; forbid link loss
- Relationships; document element connections; forbid association loss
- Resources; catalog external assets; forbid dependency loss
- Responsiveness; note viewport variants; forbid mobile content loss
- Schemas; detect data structures; forbid schema assumptions
- Scripts; document functionality; forbid behavior loss
- Sections; maintain content boundaries; forbid segmentation loss
- Selectors; configure extraction patterns; forbid CSS hardcoding
- Semantics; preserve HTML5 meaning; forbid semantic loss
- Separation; isolate content concerns; forbid mixed extraction
- SEO; capture meta tags; forbid discoverability loss
- Sharing; reuse extraction logic; forbid duplication
- Snippets; preserve code examples; forbid syntax loss
- Spacing; maintain whitespace semantics; forbid formatting loss
- Statistics; document quantitative data; forbid metrics loss
- Structure; preserve document outline; forbid hierarchy loss
- Styles; extract visual context; forbid presentation loss
- Tables; maintain tabular structure; forbid data loss
- Tabs; document tabbed content; forbid panel loss
- Tags; preserve semantic tags; forbid markup loss
- Templates; detect page patterns; forbid template assumptions
- Testing; validate across sites; forbid single-site validation
- Text; extract clean content; forbid noise inclusion
- Timestamps; preserve temporal data; forbid date loss
- Tooltips; capture supplementary text; forbid context loss
- Traceability; maintain source attribution; forbid provenance loss
- Transformations; apply reversible operations; forbid data destruction
- Typography; note emphasis patterns; forbid formatting loss
- Universality; operate site-agnostically; forbid narrow implementations
- URLs; preserve complete links; forbid reference loss
- Validation; test across domains; forbid single-site tests
- Variables; document dynamic content; forbid state loss
- Versioning; track document changes; forbid history loss
- Videos; document video embeds; forbid media loss
- Visibility; capture hidden content; forbid state-dependent loss
- Widgets; document interactive components; forbid functionality loss

---

## Context—Intent—Directive Table

Each row is a universal, neutral, site-agnostic one-liner mantra: `Context | Intent | Directive`

| Context        | Intent                              | Directive                                                                                      |
|----------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Accessibility  | Preserve semantic structure         | - [ ] Extract ARIA labels; preserve accessibility; forbid presentation-only markup            |
| Accuracy       | Maintain content fidelity           | - [ ] Verify extraction; maintain accuracy; forbid lossy transformations                      |
| Anchors        | Preserve link targets               | - [ ] Extract anchor IDs; preserve targets; forbid broken references                          |
| Annotations    | Capture metadata                    | - [ ] Extract data attributes; capture annotations; forbid metadata loss                      |
| Assets         | Document media references           | - [ ] List all media URLs; document assets; forbid asset omission                             |
| Attributes     | Extract data attributes             | - [ ] Parse all attributes; extract metadata; forbid attribute loss                           |
| Blocks         | Preserve semantic units             | - [ ] Maintain block structure; preserve semantics; forbid structure flattening               |
| Breadcrumbs    | Document navigation paths           | - [ ] Extract breadcrumb trails; document paths; forbid hierarchy loss                        |
| Buttons        | Capture interactive elements        | - [ ] Document button actions; capture interactivity; forbid action loss                      |
| Cards          | Preserve component structure        | - [ ] Identify card patterns; preserve structure; forbid layout destruction                   |
| Carousels      | Document slide content              | - [ ] Extract all slides; document carousels; forbid interaction loss                         |
| Citations      | Maintain attribution                | - [ ] Preserve source links; maintain attribution; forbid source loss                         |
| Classes        | Extract styling context             | - [ ] Document CSS classes; extract context; forbid visual information loss                   |
| Code           | Preserve syntax highlighting        | - [ ] Maintain code fences; preserve syntax; forbid formatting loss                           |
| Completeness   | Capture all content                 | - [ ] Extract comprehensively; ensure completeness; forbid partial extraction                 |
| Components     | Identify UI patterns                | - [ ] Detect UI components; identify patterns; forbid pattern loss                            |
| Configuration  | Externalize extraction rules        | - [ ] Use config files; externalize rules; forbid selector hardcoding                         |
| Content        | Extract semantic meaning            | - [ ] Parse semantic HTML; extract meaning; forbid presentation coupling                      |
| Context        | Preserve surrounding information    | - [ ] Maintain context; preserve relationships; forbid isolation                              |
| CTAs           | Document call-to-action elements    | - [ ] Extract CTA text/links; document actions; forbid conversion path loss                   |
| Databases      | Process tables generically          | - [ ] Parse table structures; process generically; forbid schema assumptions                  |
| Diagrams       | Document visual relationships       | - [ ] Describe diagram content; document visuals; forbid illustration loss                    |
| Directories    | Abstract path references            | - [ ] Use relative paths; abstract references; forbid absolute paths                          |
| Documentation  | Maintain comprehensive coverage     | - [ ] Document all sections; maintain coverage; forbid undocumented elements                  |
| Domains        | Operate site-agnostically           | - [ ] Design neutrally; operate universally; forbid site-specific logic                       |
| Embeds         | Capture rich media                  | - [ ] Extract iframe sources; capture embeds; forbid embed loss                               |
| Encoding       | Preserve character sets             | - [ ] Handle UTF-8/entities; preserve encoding; forbid encoding errors                        |
| Entities       | Decode HTML entities                | - [ ] Decode all entities; preserve characters; forbid entity corruption                      |
| Escaping       | Handle special characters           | - [ ] Escape markdown syntax; handle characters; forbid malformed output                      |
| Fallbacks      | Provide alternative text            | - [ ] Extract alt attributes; provide fallbacks; forbid accessibility loss                    |
| Fidelity       | Maximize detail capture             | - [ ] Document comprehensively; maximize fidelity; forbid information reduction               |
| Footers        | Document page metadata              | - [ ] Extract footer content; document metadata; forbid auxiliary content loss                |
| Forms          | Capture input structures            | - [ ] Document form fields; capture structures; forbid interaction loss                       |
| Fragments      | Preserve content sections           | - [ ] Maintain section IDs; preserve fragments; forbid segmentation loss                      |
| Grids          | Document layout structures          | - [ ] Describe grid layouts; document structures; forbid spatial information loss             |
| Headers        | Maintain heading hierarchy          | - [ ] Preserve h1-h6 levels; maintain hierarchy; forbid outline corruption                    |
| Heuristics     | Detect patterns generically         | - [ ] Apply pattern detection; use heuristics; forbid selector hardcoding                     |
| Hierarchy      | Preserve document structure         | - [ ] Maintain DOM nesting; preserve hierarchy; forbid nesting loss                           |
| Hyperlinks     | Maintain URL references             | - [ ] Extract all hrefs; maintain links; forbid link rot                                      |
| Icons          | Document visual indicators          | - [ ] Describe icon meaning; document indicators; forbid semantic loss                        |
| Identifiers    | Extract element IDs                 | - [ ] Parse ID attributes; extract identifiers; forbid reference loss                         |
| Images         | Capture alt text and sources        | - [ ] Extract src/alt; capture images; forbid visual context loss                             |
| Indexing       | Create navigation structures        | - [ ] Generate TOC; create indexes; forbid discoverability loss                               |
| Inline         | Preserve inline formatting          | - [ ] Maintain bold/italic; preserve inline; forbid emphasis loss                             |
| Interactivity  | Document dynamic elements           | - [ ] Describe interactions; document dynamics; forbid functionality loss                     |
| Labels         | Preserve form field labels          | - [ ] Extract label text; preserve labels; forbid context loss                                |
| Language       | Detect content language             | - [ ] Parse lang attributes; detect language; forbid locale loss                              |
| Layout         | Document visual structure           | - [ ] Describe layout patterns; document structure; forbid arrangement loss                   |
| Links          | Preserve all hyperlinks             | - [ ] Extract all anchors; preserve links; forbid navigation loss                             |
| Lists          | Maintain list semantics             | - [ ] Preserve ul/ol/dl; maintain semantics; forbid ordering loss                             |
| Localization   | Preserve language variants          | - [ ] Extract all languages; preserve variants; forbid translation loss                       |
| Mapping        | Create structure maps               | - [ ] Document site topology; create maps; forbid topology loss                               |
| Markdown       | Use semantic syntax                 | - [ ] Apply standard markdown; use semantics; forbid HTML fallback abuse                      |
| Media          | Document multimedia content         | - [ ] Catalog audio/video; document media; forbid asset loss                                  |
| Metadata       | Extract page metadata               | - [ ] Parse meta tags; extract metadata; forbid context loss                                  |
| Metrics        | Document statistics                 | - [ ] Preserve numerical data; document metrics; forbid quantitative data loss                |
| Modals         | Capture overlay content             | - [ ] Extract modal content; capture overlays; forbid hidden content loss                     |
| Navigation     | Preserve menu structures            | - [ ] Document nav elements; preserve menus; forbid wayfinding loss                           |
| Neutrality     | Remain platform-agnostic            | - [ ] Design neutrally; remain agnostic; forbid CMS coupling                                  |
| Nesting        | Maintain element hierarchy          | - [ ] Preserve DOM depth; maintain nesting; forbid depth loss                                 |
| Notation       | Use standard conventions            | - [ ] Follow CommonMark; use standards; forbid custom syntax                                  |
| Ordering       | Preserve sequence                   | - [ ] Maintain source order; preserve sequence; forbid shuffle                                |
| Paragraphs     | Maintain text flow                  | - [ ] Preserve paragraph breaks; maintain flow; forbid reflow corruption                      |
| Parsers        | Apply general-purpose logic         | - [ ] Use generic parsers; apply universally; forbid site-specific parsers                    |
| Paths          | Abstract URL patterns               | - [ ] Normalize URLs; abstract paths; forbid hardcoded domains                                |
| Patterns       | Detect via heuristics               | - [ ] Apply pattern matching; detect heuristically; forbid manual classification              |
| Placeholders   | Document form defaults              | - [ ] Extract placeholder text; document defaults; forbid context loss                        |
| Portability    | Enable cross-platform use           | - [ ] Design portably; enable reuse; forbid tool coupling                                     |
| Positioning    | Document spatial layout             | - [ ] Note grid/flex patterns; document positioning; forbid coordinate loss                   |
| Pricing        | Preserve table structures           | - [ ] Maintain pricing tables; preserve structure; forbid comparison loss                     |
| Provenance     | Track source URLs                   | - [ ] Record source URLs; track provenance; forbid attribution loss                           |
| Queries        | Abstract search parameters          | - [ ] Generalize query params; abstract patterns; forbid query hardcoding                     |
| Quotes         | Preserve attribution                | - [ ] Maintain blockquote sources; preserve attribution; forbid citation loss                 |
| References     | Maintain cross-references           | - [ ] Preserve internal links; maintain references; forbid link loss                          |
| Relationships  | Document element connections        | - [ ] Map related elements; document relationships; forbid association loss                   |
| Resources      | Catalog external assets             | - [ ] List all dependencies; catalog resources; forbid dependency loss                        |
| Responsiveness | Note viewport variants              | - [ ] Document mobile content; note responsiveness; forbid mobile content loss                |
| Schemas        | Detect data structures              | - [ ] Identify schema patterns; detect structures; forbid schema assumptions                  |
| Scripts        | Document functionality              | - [ ] Describe script behavior; document functionality; forbid behavior loss                  |
| Sections       | Maintain content boundaries         | - [ ] Preserve section elements; maintain boundaries; forbid segmentation loss                |
| Selectors      | Configure extraction patterns       | - [ ] Externalize CSS selectors; configure patterns; forbid CSS hardcoding                    |
| Semantics      | Preserve HTML5 meaning              | - [ ] Use semantic elements; preserve meaning; forbid semantic loss                           |
| Separation     | Isolate content concerns            | - [ ] Separate content/style; isolate concerns; forbid mixed extraction                       |
| SEO            | Capture meta tags                   | - [ ] Extract SEO metadata; capture tags; forbid discoverability loss                         |
| Sharing        | Reuse extraction logic              | - [ ] Share utilities; reuse logic; forbid duplication                                        |
| Snippets       | Preserve code examples              | - [ ] Maintain syntax highlighting; preserve snippets; forbid syntax loss                     |
| Spacing        | Maintain whitespace semantics       | - [ ] Preserve meaningful whitespace; maintain spacing; forbid formatting loss                |
| Statistics     | Document quantitative data          | - [ ] Extract numerical values; document statistics; forbid metrics loss                      |
| Structure      | Preserve document outline           | - [ ] Maintain heading hierarchy; preserve structure; forbid hierarchy loss                   |
| Styles         | Extract visual context              | - [ ] Document CSS context; extract styles; forbid presentation loss                          |
| Tables         | Maintain tabular structure          | - [ ] Preserve table semantics; maintain structure; forbid data loss                          |
| Tabs           | Document tabbed content             | - [ ] Extract all tab panels; document tabs; forbid panel loss                                |
| Tags           | Preserve semantic tags              | - [ ] Maintain HTML5 elements; preserve tags; forbid markup loss                              |
| Templates      | Detect page patterns                | - [ ] Identify templates; detect patterns; forbid template assumptions                        |
| Testing        | Validate across sites               | - [ ] Test multiple sites; validate universally; forbid single-site validation                |
| Text           | Extract clean content               | - [ ] Remove noise; extract cleanly; forbid noise inclusion                                   |
| Timestamps     | Preserve temporal data              | - [ ] Extract datetime values; preserve timestamps; forbid date loss                          |
| Tooltips       | Capture supplementary text          | - [ ] Extract title attributes; capture tooltips; forbid context loss                         |
| Traceability   | Maintain source attribution         | - [ ] Record URL/timestamp; maintain traceability; forbid provenance loss                     |
| Transformations| Apply reversible operations         | - [ ] Use lossless transforms; enable reversal; forbid data destruction                       |
| Typography     | Note emphasis patterns              | - [ ] Document text styles; note typography; forbid formatting loss                           |
| Universality   | Operate site-agnostically           | - [ ] Design universally; operate broadly; forbid narrow implementations                      |
| URLs           | Preserve complete links             | - [ ] Maintain full URLs; preserve links; forbid reference loss                               |
| Validation     | Test across domains                 | - [ ] Validate multiple sites; test broadly; forbid single-site tests                         |
| Variables      | Document dynamic content            | - [ ] Note variable content; document dynamics; forbid state loss                             |
| Versioning     | Track document changes              | - [ ] Record scrape timestamp; track versions; forbid history loss                            |
| Videos         | Document video embeds               | - [ ] Extract video sources; document embeds; forbid media loss                               |
| Visibility     | Capture hidden content              | - [ ] Extract all states; capture visibility; forbid state-dependent loss                     |
| Widgets        | Document interactive components     | - [ ] Describe widget behavior; document components; forbid functionality loss                |

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