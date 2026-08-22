---
title: "Markdown Slide Code & Math Module"
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

# Markdown Slide Code & Math Module

## Scope & Ownership

Owns code presentation and mathematical notation on slides.

This module is loaded on demand from [Markdown Slide Styling Guidelines](./markdown-slide-styling-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Code Blocks (fully supported as static code)

**Basic:**
````markdown
```javascript
function example() {
  return 42;
}
```
````

**With language hint:**
````markdown
```python
def calculate(x):
    return x * 2
```
````

**Supported languages:** `javascript`, `python`, `java`, `cpp`, `go`, `rust`, `sql`, `bash`, `css`, `html`, `json`, `yaml`, `markdown`

---

---

## Code: Line Highlighting (structural only today)

````markdown
```js {1,3-5}
const a = 1;     // Highlighted
const b = 2;
const c = 3;     // Highlighted
const d = 4;     // Highlighted
const e = 5;     // Highlighted
```
````

**Progressive steps:**
````markdown
```js {1|3-5|all}
// Step 1: line 1
// Step 2: lines 3-5
// Step 3: all lines
```
````

---

---

## Code: Advanced Features (structural only today)

**Line numbers:**
````markdown
```python {lines:true}
def example():
    pass
```
````

**Diff syntax:**
````markdown
```diff
- removed_line()
+ added_line()
  unchanged_line()
```
````

**Editable code:**
````markdown
```js {monaco}
const editable = true;
```
````

---

---

## Math: LaTeX (structural only today)

**Inline:** `$E = mc^2$` renders inline equation

**Block:**
```markdown
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

**Matrix:**
```markdown
$$
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$
```

---
