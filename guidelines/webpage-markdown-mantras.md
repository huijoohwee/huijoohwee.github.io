---
title: "Webpage Markdown Mantras & CID Table Module"
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

# Webpage Markdown Mantras & CID Table Module

## Scope & Ownership

Owns the three-beat mantra form and the alphabetical directive table for webpage markdown extraction.

This module is loaded on demand from [Webpage Markdown Guidelines](./webpage-markdown-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
