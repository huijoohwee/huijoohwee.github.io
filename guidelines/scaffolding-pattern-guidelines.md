---
title: "scaffolding-pattern-guidelines"
author: "joohwee"
tags: [EDA, MLP, Test]
date: 2026-01-13
---

> **Diagram**: this guideline's phase diagram is owned by [Scaffolding Pattern Progression Diagram](./scaffolding-pattern-diagram.md). It is kept in its own document so the diagram payload does not load with every read of this guideline.


# Scaffolding Pattern Guidelines

## Context
**Incremental development workflows**: apply universal scaffolding to establish consistency, implement from scratch to ensure foundation, refine iteratively to drive improvement, validate through tests to secure reliability, stay domain‑agnostic to guarantee adaptability, remain project‑agnostic to maintain flexibility, and adhere to technology‑neutral principles to preserve universality.  

## Intent
**Scaffolding standards**: build incrementally to ensure structured growth, start with stubs to establish foundations, iterate with tests to secure reliability, refine through validation to strengthen quality, manage cognitive load to sustain clarity, optimize feedback loops to accelerate learning, apply universally to guarantee adaptability, and remain domain‑neutral to preserve flexibility.  

## Directives

Owned by [Scaffolding Pattern Directives Module](./scaffolding-pattern-directives.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Scaffolding Progression Table

Owned by [Scaffolding Pattern Pseudocode Template Module](./scaffolding-pattern-pseudocode.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Role—Action—Outcome

**Role: Module Developer**  
→ Action: creates file structure, stubs function signatures, implements minimal logic, tests incrementally, adds error handling, refines documentation  
→ Outcome: produces tested module through validated scaffolding progression

**Role: Test Engineer**  
→ Action: creates representative fixtures, validates each scaffolding phase, writes assertion-based tests, ensures incremental coverage, prevents regression  
→ Outcome: ensures reliability through systematic validation at each scaffolding step

**Role: Configuration Architect**  
→ Action: identifies configuration parameters during stub phase, externalizes hardcoded values during refinement, defines configuration schemas, documents parameter purposes  
→ Outcome: provides configuration layer enabling adaptation without implementation changes

**Role: Code Reviewer**  
→ Action: audits scaffolding progression, verifies incremental testing, checks configuration usage, validates error handling completeness, enforces single-responsibility boundaries  
→ Outcome: maintains scaffolding discipline through systematic review feedback

**Role: Documentation Specialist**  
→ Action: ensures docstrings in stub phase, validates documentation completeness during refinement, adds usage examples, maintains responsibility tables, updates as understanding evolves  
→ Outcome: delivers comprehensive documentation aligned with implementation maturity

---

## Mantra Application

**"CID frames scaffolding standards, SRP isolates scaffolding phases, RAO aligns developer workflows, SVO clarifies scaffolding semantics"**

- **CID frames**: Establishes scope (incremental development), purpose (cognitive load management, iterative refinement), rules (stub-first + test-driven + configuration-injection)
- **SRP isolates**: Ensures each scaffolding phase handles single concern (stub vs implement vs validate vs refine), each function owns focused responsibility
- **RAO aligns**: Maps module developers, test engineers, configuration architects, code reviewers, documentation specialists to their scaffolding deliverables
- **SVO clarifies**: Expresses all scaffolding operations (developer stubs function, test validates behavior, configuration drives adaptation) with grammatical precision ensuring workflow clarity and preventing premature optimization

---

## Domain Applicability Matrix

Owned by [Scaffolding Pattern Diagnostics Module](./scaffolding-pattern-diagnostics.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Universal Scaffolding Pseudocode Template

Owned by [Scaffolding Pattern Pseudocode Template Module](./scaffolding-pattern-pseudocode.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Prompt_202601131200

```
is this how professional programmer/architect/tech lead would do to build software from scratch?
```

```
generate max LOD mermaid.js for "Universal Scaffolding Pseudocode Template", 
* Parent Node: Module
* Node: `Class/Object.Function/Method`
* Edge: Responsibility (S-V-O)
* Subgraph: Phase
```
## Problems and Diagnostics

Owned by [Scaffolding Pattern Diagnostics Module](./scaffolding-pattern-diagnostics.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Token Sharing and Performance

Owned by [Scaffolding Pattern Diagnostics Module](./scaffolding-pattern-diagnostics.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Prompt_202601131200

### 01
```

adhere to `codebase-neutrality-guidelines.md`,
convert:

```
A programmer starting **from scratch, without AI/LLM help**, would scaffold `data_loader.py` in a very manual, incremental way — usually something like this:

---

### 🛠 Typical Steps

1. **Create the file**
   - Run `touch src/data_loader.py` or create it in their editor.

2. **Import essentials**
   - Think about what libraries are needed (e.g., `sqlite3`, `pandas`).
   - Add the imports at the top.

   ```python
   import sqlite3
   import pandas as pd
   ```

3. **Stub out functions**
   - Write empty function definitions with docstrings or comments to remind themselves of the purpose.

   ```python
   def load_from_sqlite(db_path, table_name):
       """Load data from SQLite into a DataFrame."""
       pass

   def validate_schema(df, expected_dtypes):
       """Check column count and dtypes."""
       pass

   def check_row_count(df, min_rows=1000):
       """Ensure DataFrame has at least min_rows samples."""
       pass

   def parse_target_variable(df, target_col="label"):
       """Verify target column contains only {0,1}."""
       pass
   ```

4. **Fill in logic incrementally**
   - Start with the simplest version (e.g., `load_from_sqlite` using `sqlite3.connect` and `pd.read_sql_query`).
   - Run small tests in a REPL or notebook to confirm it works.
   - Add error handling later.

5. **Validation functions**
   - For `validate_schema`, check `df.shape[1]` and loop through `df.dtypes`.
   - For `check_row_count`, use `len(df)`.
   - For `parse_target_variable`, check `df[target_col].unique()`.

6. **Iterative testing**
   - Write quick scripts or use Jupyter Notebook to call each function with sample data.
   - Adjust until the functions behave as expected.

7. **Refine with exceptions and docstrings**
   - Replace `pass` with `raise ValueError(...)` where needed.
   - Add clear docstrings for maintainability.

---

### 📄 Example of a Programmer’s First Draft
It would look rough and incomplete at first:

```python
import sqlite3
import pandas as pd

def load_from_sqlite(db_path, table_name):
    conn = sqlite3.connect(db_path)
    df = pd.read_sql_query(f"SELECT * FROM {table_name}", conn)
    conn.close()
    return df

def validate_schema(df, expected_dtypes):
    if df.shape[1] != 47:
        raise ValueError("Wrong number of columns")
    # TODO: check dtypes
    return True

def check_row_count(df, min_rows=1000):
    if len(df) < min_rows:
        raise ValueError("Not enough rows")
    return True

def parse_target_variable(df, target_col="label"):
    if not set(df[target_col].unique()).issubset({0,1}):
        raise ValueError("Invalid labels")
    return df[target_col]
```

---

### 🔑 Key Insight
Without AI help, programmers scaffold by:
- **Starting minimal** (imports + function stubs).
- **Iteratively testing** each function with sample data.
- **Gradually refining** with validation, error handling, and documentation.
```

into universal, neutral, project-agnostic `first-draft-code-to-codebase.md`
```

### 02
```
based on "Universal Scaffolding Pseudocode Template",
generate `scaffolding-implementation-guide.md` 


```markdown
# Scaffold-to-production: Step-by-step Implementation Guide

**Purpose**: Step-by-step implementation roadmap with LOD patterns for zero-experience candidates  
**Format**: Hierarchical tasks (m.n.o) with reasoning, outcomes, and excellent practices  
**Context**: Last-shot to make it production-ready

---

## How to Use This Guide

**Numbering System**:
- **m**: Phase number (1-7)
- **n**: Step number within phase
- **o**: Sub-step number within step (0 = main step)

**Priority Levels**:
- 🔴 **CRITICAL**: ...
- 🟡 **HIGH**: ...
- 🟢 **MEDIUM**: ...
- ⚪ **LOW**: Nice to have ...

**Work in Order**: Complete each phase before moving to next. Don't skip steps.

---

## Phase 1: File Creation & Imports (... minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------|-------------------------|---------|------------------------------|----------|
| **1.0.0** | **File Creation & Imports** | ...
...
| 7.n.o | ...
```
```

```
generate max LOD mermaid.js for "Scaffold-to-Production: Step-by-Step Implementation Guide", 
* Parent Node: Step
* Node: Sub-step
* Edge: Workflow
* Subgraph: Phase
```
