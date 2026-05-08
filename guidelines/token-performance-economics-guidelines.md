# Token Performance & Economics Guidelines

## Overview

**Token-efficient documentation**: minimize LLM context consumption to reduce cost, maximize information density to preserve clarity, select structured formats to enable parsing, measure token budgets to uphold accountability, optimize diagram representations to sustain readability, and balance verbosity with precision to guarantee value.

**Documentation economics**: quantify token costs per section to prevent waste, benchmark format alternatives to enable optimization, budget context windows to prevent truncation, track token-to-value ratios to uphold efficiency, and standardize compact representations to sustain consistency.

**Token performance standards**: prefer Mermaid over ASCII art to reduce tokens, use Markdown tables over inline lists to increase density, structure documents with frontmatter metadata to enable indexing, apply format selection criteria to preserve parsability, and measure compression ratios to validate optimization.

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

- ASCII; replace with Mermaid for diagrams; forbid ASCII art exceeding 5 nodes
- Budget; allocate tokens per section; forbid unmeasured context usage
- Code; select format by content type; forbid arbitrary block style choices
- Compression; measure token reduction ratios; forbid unvalidated format changes
- Density; maximize information per token; forbid verbose redundancy
- Diagrams; use Mermaid as primary format; forbid ASCII boxes for complex topology
- Frontmatter; keep metadata minimal; forbid excessive YAML headers
- Format; select by token efficiency; forbid arbitrary format choices
- Indexing; enable via structured metadata; forbid unindexed documentation
- JSON; retain for contract examples; forbid JSON where Mermaid suffices
- Lists; convert to tables when multi-column; forbid flat lists for structured data
- Markdown; prefer tables for inventories; forbid inline component lists
- Measurement; quantify token counts; forbid unmeasured documentation
- Mermaid; use for all architecture diagrams; forbid ASCII art for >5 nodes
- Metadata; minimize frontmatter fields; forbid redundant header properties
- Plain; retain for code and contracts; forbid plain text where diagram fits
- Ratio; track tokens per information unit; forbid unmonitored documentation bloat
- Rendering; ensure GitHub-native display; forbid renderer-dependent formats
- Sequence; use Mermaid sequenceDiagram; forbid ASCII sequence boxes
- Structure; prefer tables over prose; forbid prose for tabular data
- Tables; use for component inventories; forbid inline lists for structured data
- Templates; enforce consistent diagram format; forbid mixed diagram styles
- Threshold; set 5-node limit for ASCII; forbid complex ASCII diagrams
- Tokens; count per section; forbid untracked context consumption
- Value; maximize information per token; forbid low-density content

---

## Context—Intent—Directive Table

Each row is a universal, neutral, project-agnostic one-liner mantra: `Context | Intent | Directive`

| Context      | Intent                              | Directive                                                                                      |
|--------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| ASCII        | Replace with Mermaid for diagrams   | - [ ] Convert ASCII to Mermaid; replace diagrams; forbid ASCII art exceeding 5 nodes          |
| Budget       | Allocate tokens per section         | - [ ] Measure token budgets; allocate per section; forbid unmeasured context usage           |
| Code         | Select format by content type       | - [ ] Choose code block for code; select format; forbid arbitrary block style choices        |
| Compression  | Measure token reduction ratios      | - [ ] Track compression ratios; measure reduction; forbid unvalidated format changes          |
| Density      | Maximize information per token      | - [ ] Optimize information density; maximize per token; forbid verbose redundancy             |
| Diagrams     | Use Mermaid as primary format       | - [ ] Standardize on Mermaid; use as primary; forbid ASCII boxes for complex topology         |
| Frontmatter   | Keep metadata minimal                | - [ ] Minimize YAML headers; keep metadata lean; forbid excessive YAML properties              |
| Format       | Select by token efficiency          | - [ ] Apply format selection criteria; select efficiently; forbid arbitrary format choices     |
| Indexing     | Enable via structured metadata      | - [ ] Structure for discoverability; enable indexing; forbid unindexed documentation          |
| JSON         | Retain for contract examples        | - [ ] Keep JSON for API contracts; retain selectively; forbid JSON where Mermaid suffices     |
| Lists        | Convert to tables when multi-column | - [ ] Use tables for multi-column data; convert lists; forbid flat lists for structured data  |
| Markdown     | Prefer tables for inventories        | - [ ] Use Markdown tables for inventories; prefer tables; forbid inline component lists       |
| Measurement  | Quantify token counts               | - [ ] Count tokens per section; quantify usage; forbid unmeasured documentation             |
| Mermaid      | Use for all architecture diagrams   | - [ ] Render diagrams via Mermaid; use universally; forbid ASCII art for >5 nodes             |
| Metadata     | Minimize frontmatter fields         | - [ ] Reduce header properties; minimize metadata; forbid redundant header properties        |
| Plain        | Retain for code and contracts       | - [ ] Keep plain blocks for code/contracts; retain appropriately; forbid plain text for diagrams |
| Ratio        | Track tokens per information unit   | - [ ] Monitor token-to-value ratio; track efficiency; forbid unmonitored documentation bloat |
| Rendering    | Ensure GitHub-native display        | - [ ] Validate GitHub rendering; ensure display; forbid renderer-dependent formats          |
| Sequence     | Use Mermaid sequenceDiagram        | - [ ] Express sequences via Mermaid; use sequenceDiagram; forbid ASCII sequence boxes         |
| Structure    | Prefer tables over prose            | - [ ] Tabulate structured data; prefer tables; forbid prose for tabular data                 |
| Tables       | Use for component inventories      | - [ ] Build inventory tables; use for components; forbid inline lists for structured data    |
| Templates    | Enforce consistent diagram format   | - [ ] Apply diagram templates; enforce consistency; forbid mixed diagram styles              |
| Threshold    | Set 5-node limit for ASCII          | - [ ] Enforce 5-node ASCII limit; set threshold; forbid complex ASCII diagrams               |
| Tokens       | Count per section                   | - [ ] Measure token consumption; count per section; forbid untracked context consumption     |
| Value        | Maximize information per token      | - [ ] Optimize for information value; maximize density; forbid low-density content            |

---

## Core Directives

### Format Selection Directives

**Documenters select documentation formats by token efficiency**

- Documenters use Mermaid `flowchart` for component topology and data flow diagrams
- Documenters use Mermaid `sequenceDiagram` for request/response and event sequence flows
- Documenters use Mermaid `flowchart LR` for linear pipelines and DAG stage diagrams
- Documenters use Mermaid subgraphs to represent deployment boundaries and layers
- Documenters use Markdown tables for component inventories, status tracking, and multi-column data
- Documenters retain plain code blocks for JSON contracts, API payloads, configuration examples, and source code
- Documenters avoid ASCII art diagrams for any diagram exceeding 5 nodes
- Documenters retain ASCII art only for simple diagrams with fewer than 5 nodes where visual alignment communicates something a flowchart cannot

**Format Selection Matrix**:

| Content Type | Primary Format | Token Efficiency | When to Use |
|---|---|---|---|
| Component topology | Mermaid `flowchart TB` | High (~0.13x of ASCII) | System architecture, module relationships |
| Data flow / pipeline | Mermaid `flowchart LR` | High (~0.13x of ASCII) | Linear stages, DAG pipelines |
| Request/response flow | Mermaid `sequenceDiagram` | High (~0.15x of ASCII) | API calls, event sequences, SSE streams |
| Parallel orchestration | Mermaid `flowchart TB` with subgraphs | High (~0.15x of ASCII) | Multi-agent, multi-locale, concurrent flows |
| Component inventory | Markdown table | High (~0.11x of ASCII) | Module inventory, status tracking, file mapping |
| Structured data | Markdown table | High (~0.11x of prose) | Multi-column comparisons, configuration reference |
| API contract / payload | Plain code block (JSON) | Neutral | Request/response bodies, schema examples |
| Source code | Plain code block | Neutral | Implementation examples, scripts |
| Simple state machine | ASCII art (<5 nodes) | Neutral | 3-state transitions, narrow sequences |

### Token Budget Directives

**Documenters measure and optimize token consumption**

- Documenters estimate token counts per documentation section
- Documenters target <6000 tokens per individual document file
- Documenters measure token-to-information ratio for architecture diagrams
- Documenters track compression ratios when converting formats (ASCII → Mermaid, prose → table)
- Documenters avoid redundant information across sections
- Documenters place detailed implementation in code comments, not documentation prose

**Token Budget Reference**:

| Document Section | Token Budget | Rationale |
|---|---|---|
| Architecture diagram (Mermaid) | <800 tokens | Sufficient for ~30 nodes with subgraphs |
| Component inventory table | <400 tokens | ~20 rows × 4 columns |
| Integration contract (JSON) | <300 tokens per endpoint | Request + response body |
| User story (As a/I want/So that) | <100 tokens per story | Concise value statement |
| Acceptance criteria (Given/When/Then) | <150 tokens per criterion | Observable and testable |
| ADR (decision record) | <500 tokens | Context + decision + alternatives + rationale |

### Diagram Standards Directives

**Documenters follow Mermaid diagram conventions**

- Documenters use descriptive node labels with `<br/>` for multi-line text
- Documenters use `-->` for directed edges with `|"label"|` for edge annotations
- Documenters use `-.->` for dashed edges representing indirect relationships
- Documenters use `subgraph` for grouping related components within deployment boundaries
- Documenters use `{{"text"}}` for callout or status nodes (e.g., `{{"NO SERVER RUNNING"}}`)
- Documenters avoid embedding large JSON bodies inside Mermaid diagrams (use `Note right of` for brief annotations instead)
- Documenters pair every architecture diagram with a Markdown component inventory table

**Mermaid Syntax Quick Reference**:

| Pattern | Syntax | Use Case |
|---|---|---|
| Top-down flow | `flowchart TB` | System architecture, layered components |
| Left-to-right flow | `flowchart LR` | Pipelines, DAG stages |
| Subgraph grouping | `subgraph ID["Label"]` | Deployment boundaries, layers |
| Directed edge | `A --> B` | Data flow, dependencies |
| Labeled edge | `A -->\|"label"\| B` | Protocol, data type |
| Dashed edge | `A -.-> B` | Indirect relationship |
| Callout node | `A{{"text"}}` | Status, constraint |
| Note annotation | `Note right of A: text` | Brief context |

---

## Token Economics Reference

### Format Compression Ratios

Measured against equivalent ASCII art representations:

| Format | Token Ratio vs ASCII | Auto-Layout | GitHub Native | LLM Parseable |
|---|---|---|---|---|
| Mermaid `flowchart` | ~0.13x (87% reduction) | Yes (ELK/Dagre) | Yes | Yes |
| Mermaid `sequenceDiagram` | ~0.15x (85% reduction) | Yes | Yes | Yes |
| Markdown table | ~0.11x (89% reduction) | N/A | Yes | Yes |
| YAML tree | ~0.09x (91% reduction) | No | No | Yes |
| D2 declarative | ~0.11x (89% reduction) | Yes | No | Yes |
| PlantUML | ~0.18x (82% reduction) | Yes | No | Yes |
| ASCII art (baseline) | 1.0x | No | Yes | No |

### Cost Impact

| Scenario | ASCII Tokens | Mermaid Tokens | Savings | Est. Cost Reduction (GPT-4 class) |
|---|---|---|---|---|
| Single architecture diagram | ~4,500 | ~600 | ~3,900 | ~$0.06 per ingestion |
| 10-document codebase review | ~45,000 | ~6,000 | ~39,000 | ~$0.59 per review |
| 100-document knowledge base | ~450,000 | ~60,000 | ~390,000 | ~$5.85 per index |
| Continuous sync (monthly) | ~1.35M | ~180K | ~1.17M | ~$17.55 per month |

---

## Anti-Pattern Guards

**Documenters avoid token-inefficient documentation patterns**:

- ASCII art boxes with >5 nodes → Mermaid `flowchart` with subgraphs
- Inline component lists (`- module.ts — does X`) → Markdown inventory table
- Prose describing tabular data → Markdown table
- Duplicated information across sections → single source with cross-reference
- Large JSON bodies in diagrams → Plain code block + Mermaid `Note` for key fields
- Mixed diagram formats in same document → Consistent Mermaid throughout
- Unmeasured documentation sections → Token count per section

---

## Documentation Validation Checklist

**Pre-Commit** (Required):
- [ ] Documenters verify architecture diagrams use Mermaid format (not ASCII for >5 nodes)
- [ ] Documenters confirm component inventory table accompanies every architecture diagram
- [ ] Documenters validate format selection follows Format Selection Matrix
- [ ] Documenters check JSON code blocks used only for contracts/payloads (not diagrams)
- [ ] Documenters ensure no duplicated information across sections

**Code Review** (Required):
- [ ] Reviewers verify token-to-information ratio is acceptable per section
- [ ] Reviewers confirm Mermaid syntax renders correctly on GitHub
- [ ] Reviewers check Markdown tables used for all multi-column structured data
- [ ] Reviewers validate ASCII art limited to <5 nodes where retained
- [ ] Reviewers confirm frontmatter metadata is minimal

**Post-Documentation** (Required):
- [ ] Maintainers measure compression ratio for any format conversion
- [ ] Maintainers verify total document token count within budget
- [ ] Maintainers confirm no renderer-dependent formats used
- [ ] Maintainers check diagram-node count against ASCII threshold

---

## Role—Action—Outcome

**Role: Technical Writer**
→ Action: selects format by token efficiency, converts ASCII to Mermaid, builds component inventory tables, measures token budgets
→ Outcome: produces token-efficient documentation minimizing LLM context consumption

**Role: Documenter**
→ Action: applies Mermaid diagram conventions, pairs diagrams with inventory tables, retains plain blocks for contracts
→ Outcome: delivers structured documentation with high information density

**Role: Reviewer**
→ Action: validates format selection, verifies token budgets, checks rendering compatibility, confirms no duplication
→ Outcome: ensures documentation meets token performance standards

---

## Mantra Application

**"CID frames token economics standards, SRP isolates format concerns, RAO aligns writer responsibilities, SVO clarifies format directives"**

- **CID frames**: Establishes scope (token performance in documentation), purpose (minimize cost, maximize density), rules (Mermaid primary, tables for inventories, measure budgets)
- **SRP isolates**: Ensures each format serves its optimal use case (Mermaid for topology, tables for inventory, code blocks for contracts)
- **RAO aligns**: Maps technical writers, documenters, reviewers to their format optimization deliverables
- **SVO clarifies**: Expresses all format directives (writers convert ASCII to Mermaid, documenters build inventory tables, reviewers validate token budgets) with grammatical precision enabling consistent application
