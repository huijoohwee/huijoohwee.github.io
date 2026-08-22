---
title: "Testing CID Framework & Mantras Module"
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
parent: "Testing Guidelines"
parent_version: "1.0.0"
---

# Testing CID Framework & Mantras Module

## Scope & Ownership

Owns the Context-Intent-Directive framing for testing: the framework, the three-beat mantra form, and the directive table.

This module is loaded on demand from [Testing Guidelines](./testing-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## Context—Intent—Directive (CID) Framework

### Definition
- **Context**: focus domain of testing practice
- **Intent**: desired testing outcome or quality attribute
- **Directive**: explicit prohibition or required testing discipline

### Sorting
Each line/column is organized alphabetically (A→Z) for clarity and neutrality.

---

---

## Three-Beat Mantra Form

Each line is a three-beat `Context; Intent; Directive` mantra:

- Acceptance; define criteria first; forbid coding without acceptance tests
- Arrange; set up test context; forbid implicit test setup
- Automation; enable CI/CD integration; forbid manual test execution
- BDD; specify behavior with examples; forbid ambiguous requirements
- Boundaries; test at module edges; forbid testing implementation details
- Clarity; write readable tests; forbid cryptic test code
- Collaboration; pair on test design; forbid isolated test authorship
- Coverage; track meaningful metrics; forbid vanity coverage metrics
- Cycles; follow red-green-refactor; forbid implementation before tests
- Debugging; reproduce with tests; forbid debugging without test reproduction
- Design; drive from tests; forbid untestable design
- Documentation; maintain living specs; forbid stale test documentation
- Doubles; use appropriate fakes; forbid inappropriate mocking
- Examples; specify with scenarios; forbid abstract specifications
- Feedback; optimize test speed; forbid slow feedback loops
- Given-When-Then; structure scenarios; forbid unstructured test narratives
- Granularity; match test to scope; forbid mismatched test granularity
- Implementation; test behavior; forbid testing private methods
- Intent; document test purpose; forbid unclear test objectives
- Isolation; remove dependencies; forbid coupled test execution
- Maintenance; refactor test code; forbid test code rot
- Naming; describe behavior; forbid technical test names
- Readability; optimize for understanding; forbid clever test code
- Red-Green-Refactor; follow TDD cycle; forbid skipping red phase
- Regression; add tests for bugs; forbid fixing without test reproduction
- SOLID; apply design principles; forbid violating SOLID in tests
- Specifications; define with tests; forbid implicit specifications
- TDD; write tests first; forbid test-after development
- Triangulation; verify with multiple examples; forbid single-example testing
- Understanding; clarify requirements; forbid coding without understanding

---

---

## Context—Intent—Directive Table

Each row is a universal, neutral, project-agnostic one-liner mantra: `Context | Intent | Directive`

| Context          | Intent                              | Directive                                                                                      |
|------------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Acceptance       | Define criteria first               | - [ ] Write acceptance tests; define criteria; forbid coding without acceptance tests         |
| Arrange          | Set up test context                 | - [ ] Prepare test data; set up context; forbid implicit test setup                           |
| Automation       | Enable CI/CD integration            | - [ ] Automate test runs; enable CI/CD; forbid manual test execution                          |
| BDD              | Specify behavior with examples      | - [ ] Use Given-When-Then; specify behavior; forbid ambiguous requirements                    |
| Boundaries       | Test at module edges                | - [ ] Test public interfaces; focus on boundaries; forbid testing implementation details      |
| Clarity          | Write readable tests                | - [ ] Use descriptive names; write clearly; forbid cryptic test code                          |
| Collaboration    | Pair on test design                 | - [ ] Review tests together; collaborate; forbid isolated test authorship                     |
| Coverage         | Track meaningful metrics            | - [ ] Measure behavior coverage; track meaningfully; forbid vanity coverage metrics           |
| Cycles           | Follow red-green-refactor           | - [ ] Practice TDD cycles; follow rhythm; forbid implementation before tests                  |
| Debugging        | Reproduce with tests                | - [ ] Write failing test; reproduce bugs; forbid debugging without test reproduction          |
| Design           | Drive from tests                    | - [ ] Let tests guide design; drive architecture; forbid untestable design                    |
| Documentation    | Maintain living specs               | - [ ] Keep tests current; maintain specs; forbid stale test documentation                     |
| Doubles          | Use appropriate fakes               | - [ ] Choose right test double; use appropriately; forbid inappropriate mocking               |
| Examples         | Specify with scenarios              | - [ ] Provide concrete examples; specify scenarios; forbid abstract specifications            |
| Feedback         | Optimize test speed                 | - [ ] Minimize test runtime; optimize feedback; forbid slow feedback loops                    |
| Given-When-Then  | Structure scenarios                 | - [ ] Use GWT pattern; structure clearly; forbid unstructured test narratives                 |
| Granularity      | Match test to scope                 | - [ ] Align test level; match scope; forbid mismatched test granularity                       |
| Implementation   | Test behavior                       | - [ ] Verify outcomes; test behavior; forbid testing private methods                          |
| Intent           | Document test purpose               | - [ ] Explain why testing; document intent; forbid unclear test objectives                    |
| Isolation        | Remove dependencies                 | - [ ] Use test doubles; isolate tests; forbid coupled test execution                          |
| Maintenance      | Refactor test code                  | - [ ] Improve test quality; refactor regularly; forbid test code rot                          |
| Naming           | Describe behavior                   | - [ ] Use behavioral names; describe clearly; forbid technical test names                     |
| Readability      | Optimize for understanding          | - [ ] Write for readers; optimize readability; forbid clever test code                        |
| Red-Green-Refactor | Follow TDD cycle                  | - [ ] Fail first; follow cycle; forbid skipping red phase                                     |
| Regression       | Add tests for bugs                  | - [ ] Write reproduction test; add regression tests; forbid fixing without test reproduction  |
| SOLID            | Apply design principles             | - [ ] Follow design principles; apply SOLID; forbid violating SOLID in tests                  |
| Specifications   | Define with tests                   | - [ ] Specify behavior; define with tests; forbid implicit specifications                     |
| TDD              | Write tests first                   | - [ ] Test before code; practice TDD; forbid test-after development                           |
| Triangulation    | Verify with multiple examples       | - [ ] Use multiple cases; triangulate; forbid single-example testing                          |
| Understanding    | Clarify requirements                | - [ ] Explore with tests; clarify understanding; forbid coding without understanding          |

---
