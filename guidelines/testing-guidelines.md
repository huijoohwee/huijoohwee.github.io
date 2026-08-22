# Testing Guidelines

## Overview

**Testing practices**: implement behavior-driven development to maximize clarity, execute test-driven workflows to ensure quality, validate continuously to preserve confidence, instrument test automation to guarantee consistency, document test intentions to maintain transparency, isolate test execution to uphold reliability, and configure test behavior to enable adaptability.

**Developer guidelines**: write tests before implementation to sustain quality, refactor with test coverage to reduce fragility, validate edge cases to secure correctness, define clear test boundaries to uphold modularity, automate test execution to enable velocity, and maintain test documentation to guarantee knowledge transfer.

**Testing principles**: practice red-green-refactor cycles to maximize feedback, design testable interfaces to preserve simplicity, validate behavior not implementation to enable refactoring, define acceptance criteria before coding to maintain clarity, execute tests frequently to ensure rapid feedback, apply appropriate test doubles to optimize isolation, verify specifications through examples to secure understanding, and instrument comprehensive test reporting to guarantee visibility.

---

## Context—Intent—Directive (CID) Framework

Owned by [Testing CID Framework & Mantras Module](./testing-cid-mantras.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Three-Beat Mantra Form

Owned by [Testing CID Framework & Mantras Module](./testing-cid-mantras.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Context—Intent—Directive Table

Owned by [Testing CID Framework & Mantras Module](./testing-cid-mantras.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Test-Driven Development (TDD)

Owned by [Testing TDD & BDD Module](./testing-tdd-bdd.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Behavior-Driven Development (BDD)

Owned by [Testing TDD & BDD Module](./testing-tdd-bdd.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Test Design Patterns

Owned by [Testing Design Patterns & Doubles Module](./testing-design-patterns.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Test Doubles

Owned by [Testing Design Patterns & Doubles Module](./testing-design-patterns.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Test Naming Conventions

Owned by [Testing Naming & Organization Module](./testing-organization.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Test Organization

Owned by [Testing Naming & Organization Module](./testing-organization.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Testing Workflow Integration

Owned by [Testing Workflow & Maintenance Module](./testing-workflow-maintenance.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Test Maintenance

Owned by [Testing Workflow & Maintenance Module](./testing-workflow-maintenance.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Testing Anti-Patterns

Owned by [Testing Anti-Patterns & Examples Module](./testing-anti-patterns-examples.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Role—Action—Outcome for Testing

**Role: Developer**  
→ Action: practices TDD, writes behavioral tests, refactors with test coverage, maintains test code quality, debugs with test reproduction  
→ Outcome: produces reliable code with comprehensive test coverage and rapid feedback

**Role: QA Engineer**  
→ Action: designs test scenarios, validates acceptance criteria, explores edge cases, coordinates testing efforts, reports defects with reproduction steps  
→ Outcome: ensures quality through systematic validation and clear defect communication

**Role: Test Automation Engineer**  
→ Action: builds test frameworks, creates test utilities, maintains test infrastructure, optimizes test execution, implements custom matchers  
→ Outcome: enables efficient testing through robust automation and tooling

**Role: Product Owner**  
→ Action: defines acceptance criteria, provides behavior examples, reviews test scenarios, validates feature completeness, prioritizes test coverage  
→ Outcome: ensures features meet requirements through clear specification and validation

**Role: Tech Lead**  
→ Action: establishes testing standards, reviews test quality, mentors on TDD practices, enforces testing discipline, monitors test metrics  
→ Outcome: maintains testing culture and code quality across team

---

## Mantra Application

**"CID frames testing discipline, TDD drives design, BDD clarifies requirements, AAA structures tests, Test-Doubles isolate dependencies, Configuration-Driven ensures neutrality"**

- **CID frames**: Establishes scope (testing practices), purpose (quality + confidence + feedback + maintainability), rules (TDD + BDD + isolation + clarity)
- **TDD drives**: Red-green-refactor cycle ensures testability, validates behavior before implementation, maintains regression safety, enables confident refactoring
- **BDD clarifies**: Given-When-Then structures scenarios, specifies behavior through examples, aligns technical and business understanding, maintains living documentation
- **AAA structures**: Arranges test context clearly, acts on system under test explicitly, asserts expected outcomes precisely
- **Test-Doubles isolate**: Dummies pass unused parameters, stubs provide responses, spies record calls, mocks verify interactions, fakes implement simplified logic
- **Configuration-Driven ensures**: Externalizes test data, abstracts environment specifics, enables multi-context validation, prevents hardcoded assumptions, maintains universal applicability

---

## Universal Application Examples

Owned by [Testing Anti-Patterns & Examples Module](./testing-anti-patterns-examples.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Conclusion

Effective testing requires disciplined application of TDD and BDD practices throughout the development lifecycle. By maintaining test-first design, clear test structure, appropriate test doubles, behavioral naming, and continuous refactoring, developers achieve confidence in their code while enabling rapid iteration.

The key is treating testing as integral to development: write tests before code, structure tests clearly, name tests descriptively, isolate dependencies appropriately, and maintain test code quality. This approach enables confident refactoring, rapid feedback, clear documentation, and high-quality software delivery across any domain, technology stack, or project context.

**Universal Application**: These guidelines apply equally to any development context—from web applications to embedded systems, from startups to enterprises, from greenfield projects to legacy code, from solo development to large teams. The principles are language-agnostic, framework-neutral, and universally applicable by design.
