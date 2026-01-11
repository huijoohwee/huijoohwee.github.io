# Markdown Slide Styling Guidelines

Universal syntax guide for presentation frameworks

> Status: This document distinguishes between **fully supported semantics** in the Knowgrph canvas markdown viewer and **structurally accepted only** features that are rendered as plain content without special behavior.

---

## Frontmatter Configuration (fully supported in Knowgrph viewer)

```yaml
---
theme: default
background: /cover.jpg
class: text-center
highlighter: shiki
lineNumbers: true
transition: slide-left
layout: cover
aspectRatio: '16/9'
lang: en-US
---
```

**Purpose**: Configures presentation-wide settings via YAML metadata block

**Common keys**: `theme`, `background`, `class`, `highlighter`, `lineNumbers`, `transition`, `layout`, `aspectRatio`, `lang`

---

## Text Styling (fully supported)

**Bold:** `**text**` → **text**  
**Italic:** `*text*` → *text*  
**Bold+Italic:** `***text***` → ***text***  
**Underline:** `<u>text</u>` → <u>text</u>  
**Highlight:** `<mark>text</mark>` → <mark>text</mark>  
**Strikethrough:** `~~text~~` → ~~text~~  
**Code:** `` `text` `` → `text`

**Custom span:**
```html
<span class="custom-class">styled text</span>
```

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

