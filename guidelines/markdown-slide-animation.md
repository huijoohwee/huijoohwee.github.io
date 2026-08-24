---
title: "Markdown Slide Animation & Navigation Module"
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

# Markdown Slide Animation & Navigation Module

## Scope & Ownership

Owns time-based and interaction-based behaviour: progressive disclosure, inline markers, slide directives, transitions, fragments, speaker notes, keyboard navigation, and drawing mode.

This module is loaded on demand from [Markdown Slide Styling Guidelines](./markdown-slide-styling-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Click-Based Progressive Disclosure (fully supported in Knowgrph viewer)

**Group animation:**
```html
<v-clicks>

- Appears on click 1
- Appears on click 2
- Appears on click 3

</v-clicks>
```

**Individual control (step-based reveal):**
```html
<v-click>Block appears on click</v-click>

<v-click at="2">Appears at step 2</v-click>
```

**Knowgrph semantics:**
- `<v-click>` blocks are treated as slide fragments.
- `at="N"` sets the explicit fragment index for ordering.
- When presentation mode is enabled and fragments are configured, fragments appear as the presenter advances steps.

---

---

## Inline Text Markers (partially supported in Knowgrph viewer)

```html
<v-mark color="red">red highlight</v-mark>
<v-mark color="yellow">yellow highlight</v-mark>
<v-mark type="circle">circled</v-mark>
<v-mark type="underline">underlined</v-mark>
<v-mark type="strike-through">strikethrough</v-mark>
```

**Colors:** `red`, `orange`, `yellow`, `green`, `blue`, `purple`, `gray`

**Types:** `highlight`, `circle`, `underline`, `strike-through`

**Knowgrph semantics:**
- `<v-mark>` blocks participate in fragment stepping like `<v-click>`.
- Color and type attributes are treated as plain content (no special styling today).

---

---

## Slide-Specific Directives (partially supported)

**Per-slide YAML:**
```markdown
---
layout: center
class: text-center
background: #1a1a2e
transition: fade
fragments:
  enabled: true
  steps: 3
---

Slide content

Additional fragment configuration keys understood by the Knowgrph viewer:
- `fragmentTags`: overrides the default fragment tag list (`['v-click', 'v-mark']`).
- `fragmentClassNames`: overrides the default fragment class list (`['fragment']`).
- `fragmentSteps` / `fragmentStepCount`: alternative way to specify total steps.
```

**HTML comments:**
```markdown
<!-- _class: lead -->
<!-- _backgroundColor: #ffffff -->
<!-- _color: #333333 -->

Slide content
```

---

---

## Transition Effects (structural only today)

```yaml
---
transition: slide-left
---
```

**Options:**
- `none` - No transition
- `fade` - Crossfade
- `slide-left` - Slide from right
- `slide-right` - Slide from left
- `slide-up` - Slide from bottom
- `slide-down` - Slide from top
- `zoom` - Zoom effect

---

---

## Fragment Animations (fully supported in Knowgrph viewer)

```html
<p class="fragment">Default fade-in</p>
<p class="fragment fade-out">Fade out</p>
<p class="fragment fade-up">Fade up</p>
<p class="fragment highlight-red">Highlight red</p>
<p class="fragment grow">Grow</p>
<p class="fragment shrink">Shrink</p>
```

**Ordering:**
```html
<p class="fragment" data-fragment-index="1">First</p>
<p class="fragment" data-fragment-index="2">Second</p>
```

**Knowgrph semantics:**
- Elements with `class="fragment"` are treated as slide fragments.
- `data-fragment-index="N"` controls the ordering; when omitted, order follows document flow.
- Fragment visibility is driven by the current presentation “step” within the active slide.

**Knowgrph-only minimal fragment deck (copy-paste template):**

```markdown
---
layout: center
aspectRatio: '16/9'
fragments:
  enabled: true
  steps: 3
---

# Demo: Fragments

Intro text (always visible)

<p class="fragment">First fragment (step 1)</p>
<p class="fragment">Second fragment (step 2)</p>

---

# Demo: v-click

<v-click>Appears at step 1</v-click>
<v-click at="2">Appears at step 2</v-click>
<v-click at="3">Appears at step 3</v-click>
```

---

---

## Speaker Notes (partially supported)

**Method 1: HTML comments**
```markdown
## Slide Content

<!--
Speaker notes here
- Not visible to audience
- Accessible via presenter mode
-->
```

**Method 2: Note delimiter**
```markdown
## Slide Content

Note:
- Speaker note line 1
- Speaker note line 2
```

---

---

## Keyboard Navigation (partially supported)

| Action | Keys |
|--------|------|
| Next slide | `Space`, `→`, `Page Down` |
| Previous slide | `←`, `Page Up` |
| First slide | `Home` |
| Last slide | `End` |
| Overview mode | `O`, `Esc` |
| Speaker view | `S` |
| Fullscreen | `F`, `F11` |
| Drawing mode | `D` |
| Go to slide | `G` |

---

---

## Drawing Mode (structural only today)

```yaml
---
drawings:
  enabled: true
  persist: false
  presenterOnly: false
---
```

**Purpose**: Enables on-slide annotations during presentation

**Activation:** Press `D` key during presentation

---
