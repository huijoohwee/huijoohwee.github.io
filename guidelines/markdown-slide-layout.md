---
title: "Markdown Slide Layout Module"
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

# Markdown Slide Layout Module

## Scope & Ownership

Owns spatial arrangement: slide separation, column layouts, layout types, backgrounds, aspect ratio, absolute positioning, and grids.

This module is loaded on demand from [Markdown Slide Styling Guidelines](./markdown-slide-styling-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Slide Separation and Reordering in Knowgrph

```markdown
# Slide 1

---

# Slide 2
```

**Semantics in Knowgrph:**
- Top-of-document YAML frontmatter (`---` … `---` at the very start) is treated as metadata and does not create a slide break.
- `---` lines that appear outside YAML frontmatter and outside fenced code blocks are treated as slide separators by the Knowgrph markdown viewer and fullscreen slide gallery.
- `---` that appear inside fenced code blocks or inside YAML frontmatter are treated as literal content, not slide breaks.

**Reordering behavior:**
- The fullscreen Markdown slide gallery sidebar lets you drag thumbnails to change slide order; Knowgrph rewrites the underlying markdown to match that order so the editor, viewer, and on-disk file stay aligned.
- Reordering operates on slide-sized chunks, preserving per-slide YAML blocks, notes, and fenced code blocks (including those that contain `---`) as intact units.
- When Knowgrph rewrites a deck after reordering, it normalizes slide separators to the form:

  ```markdown
  <last non-empty line of previous slide>
  
  ---
  
  <first non-empty line of next slide>
  ```

  enforcing a single blank line before and after each `---` separator.

**Fullscreen frame, zoom, and scroll semantics in Knowgrph:**
- The fullscreen slide gallery renders each slide inside a static frame; the frame border, corner radius, and drop shadow do not zoom.
- The slide content inside the frame can be zoomed and panned for detail inspection, while the frame stays fixed.
- Mouse wheel or trackpad scroll **inside the frame** scrolls the slide content; it does not trigger zoom.
- Zoom gestures are modifier-based: holding `Ctrl` (or `Cmd` on macOS) while scrolling zooms; plain scroll without modifiers only scrolls.

---

---

## Two-Column Layout: HTML (structural only)

```html
<div class="two-column">
<div>

**Left column:**
- Content A
- Content B

</div>
<div>

**Right column:**
- Content C
- Content D

</div>
</div>
```

**Requires CSS:** `.two-column { display: grid; grid-template-columns: 1fr 1fr; }`

---

---

## Two-Column Layout: Native (fully supported)

```markdown
---
layout: two-cols
---

Left column content

::right::

Right column content
```

**Purpose**: Framework-specific delimiter for column splitting

---

---

## Layout Types (partially supported)

**Common layouts:**
- `default` - Standard content
- `cover` - Title slide
- `intro` - Introduction
- `center` - Centered content
- `two-cols` - Two columns
- `image-right` - Image on right
- `image-left` - Image on left
- `quote` - Large quote
- `fact` - Large number/fact
- `section` - Section divider

---

---

## Background Control (fully supported)

**Image:**
```yaml
---
background: /path/to/image.jpg
backgroundSize: cover
backgroundPosition: center
---
```

**Gradient:**
```yaml
---
background: linear-gradient(135deg, #667eea, #764ba2)
---
```

**Color:**
```yaml
---
background: '#1a1a2e'
---
```

---

---

## Aspect Ratio Configuration (fully supported)

```yaml
---
aspectRatio: '16/9'   # Widescreen (default)
# aspectRatio: '4/3'  # Standard
# aspectRatio: '16/10' # Wide
---
```

**Purpose**: Controls slide dimensions for target display

---

---

## Absolute Positioning (fully supported where expressed via HTML classes)

```html
<div class="absolute top-0 left-0">
  Top-left corner
</div>

<div class="absolute bottom-0 right-0">
  Bottom-right corner
</div>

<div class="absolute top-50% left-50% transform -translate-x-50% -translate-y-50%">
  Center
</div>
```

---

---

## Grid Layouts (fully supported where expressed via HTML classes)

```html
<div class="grid grid-cols-3 gap-4">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>

<div class="grid grid-cols-2 grid-rows-2 gap-2">
  <div>Cell 1</div>
  <div>Cell 2</div>
  <div>Cell 3</div>
  <div>Cell 4</div>
</div>
```

---
