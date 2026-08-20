---
title: "Markdown Slide Text & Structure Module"
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
parent: "Markdown Slide Styling Guidelines"
parent_version: "1.0.0"
---

# Markdown Slide Text & Structure Module

## Scope & Ownership

Owns the prose-level features: frontmatter configuration, text styling, lists, footnotes, headings, tables, blockquotes, rules, links, and images.

This module is loaded on demand from [Markdown Slide Styling Guidelines](./markdown-slide-styling-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Frontmatter Configuration (fully supported in Knowgrph viewer)

```yaml
---
theme: default
background: /cover.jpg
class: text-center
transition: slide-left
layout: cover
aspectRatio: '16/9'
lang: en-US
mermaid: |
  graph LR
    A[Start] --> B[End]
---
```

**Purpose**: Configures presentation-wide settings via YAML metadata block

**Common keys**: `theme`, `background`, `class`, `transition`, `layout`, `aspectRatio`, `lang`

**Academic / Metadata keys (fully supported):**
- `authors`: List of authors (string or array)
- `meeting`: Conference or meeting name
- `date`: Presentation date
- `venue`: Presentation venue
- `institution`: Institution or organization name (displays in footer)
- `url`: Link to paper or project
- `theme`: Theme style (e.g., `default`, `academic`)
- `mermaid`: Global mermaid diagram definition (string)

**Effect**: When these keys are present, a persistent footer is rendered on slides (except `cover` and `intro` layouts).
- **Default Theme**: Meeting/Venue/Institution/Date (Left), Authors/URL (Right), Page Numbers (Right).
- **Academic Theme** (`theme: academic`): Meeting + Authors (Left), Institution/Venue + Page X / Y (Right).

---

---

## Text Styling (fully supported)

**Bold:** `**text**` → **text**  
**Italic:** `*text*` → *text*  
**Bold+Italic:** `***text***` → ***text***  
**Underline:** `<u>text</u>` → <u>text</u>  
**Highlight:** `==text==` or `<mark>text</mark>` → <mark>text</mark>  
**Strikethrough:** `~~text~~` → ~~text~~  
**Subscript:** `~text~` → <sub>text</sub>  
**Superscript:** `^text^` → <sup>text</sup>  
**Code:** `` `text` `` → `text`

**Custom span:**
```html
<span class="custom-class">styled text</span>
```

---

---

## Lists (fully supported)

**Unordered:**
```markdown
- Item one
- Item two
  - Nested item
```

**Ordered:**
```markdown
1. Step one
2. Step two
```

**Task:**
```markdown
- [x] Completed
- [ ] Pending
```

---

---

## Footnotes (fully supported)

```markdown
Here is a footnote reference[^1].

[^1]: This is the footnote content.
```

**Purpose**: Add citations or additional context at the bottom of the slide/document.

---

---

## Headings and IDs (fully supported)

```markdown
# Heading Level 1 {#custom-id}
## Heading Level 2
```

**Auto-generated IDs**: Headings automatically get IDs derived from their text (kebab-case).
**Custom IDs**: You can specify a custom ID using the `{#id}` syntax.
**Linking**: Link to headings using `[Link Text](#custom-id)`.

---

---

## Tables (fully supported)

```markdown
| Column A | Column B | Column C |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

**Alignment:** `:---` (left), `:---:` (center), `---:` (right)

**Example:**
```markdown
| Metric | Before | After |
|:-------|-------:|:-----:|
| Speed  | 3.2s   | 0.8s  |
```

---

---

## Blockquotes (fully supported)

```markdown
> Single-line quote

> **Multi-line quote:**
>
> - Point one
> - Point two
> - Point three
```

**Purpose**: Highlights citations, callouts, or emphasized content blocks

---

---

## Horizontal Rules (fully supported)

```markdown
---
```

**Purpose**: Separates slides or sections depending on framework configuration

**Alternative syntax:**
```markdown
***
___
```

---

---

## Links (fully supported)

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Tooltip text")
```

**Auto-linking:**
```markdown
<https://example.com>
```

---

---

## Images (fully supported)

**Basic:**
```markdown
![Alt text](path/to/image.jpg)
```

**With size attributes:**
```markdown
![width:200px](image.jpg)
![w:50%](image.jpg)
```

**Background image:**
```markdown
![bg](background.jpg)
![bg right](split.jpg)
![bg left:40%](split.jpg)
```

---
