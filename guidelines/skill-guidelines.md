# Skill Guidelines: Multi-Repo Orchestration with System Design Principles

## Overview

This document integrates multi-repo orchestration patterns with system design principles to guide coordinated changes across distributed repository architectures. It establishes how distributed system design principles apply to multi-repository development workflows in domain-agnostic, reusable contexts.

---

## Core Philosophy

**Multi-repo systems**: coordinate changes independently to maximize agility, design for backward compatibility to ensure continuity, enforce contract-first interfaces to preserve correctness, instrument verification at boundaries to guarantee integration, and apply defense-in-depth validation to protect integrity.

**Development guidelines**: avoid monolithic changes to sustain agility, prevent synchronous dependencies to reduce fragility, eliminate circular references to secure reliability, define schema contracts to uphold clarity, integrate through stable exports to enable adaptability, and bound contexts with explicit ownership to guarantee accountability.

## Long-Horizon SuperAgent Skill Policy

- Skills are progressive capability modules for native harness runs; they must declare inputs, outputs, owner, budget, and validation proof before execution.
- Skill outputs must return through shared markdown/frontmatter, GraphData, Storyboard Widget, and Rich Media Panel contracts instead of mutating renderer state directly.
- External skill packs may inspire capability categories only. Do not copy DeerFlow skill code, prompts, directory topology, sandbox scripts, or memory layout.
- Cross-repo skills must be located through configuration and SSOT docs, not absolute paths or repo-specific hidden assumptions.

---

## CID Framework for Multi-Repo Development

Owned by [Skill Repository Map & CID Module](./skill-repo-map.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Repository Map and Responsibilities

Owned by [Skill Repository Map & CID Module](./skill-repo-map.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Operating Principles

Owned by [Skill Operating Principles & Workflow Module](./skill-operating-workflow.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Standard Workflow

Owned by [Skill Operating Principles & Workflow Module](./skill-operating-workflow.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Cross-Repo Compatibility Checklist

Owned by [Skill Operating Principles & Workflow Module](./skill-operating-workflow.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Design Pattern Application

Owned by [Skill Patterns & Scenarios Module](./skill-patterns-scenarios.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Common Scenarios and Patterns

Owned by [Skill Patterns & Scenarios Module](./skill-patterns-scenarios.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Role—Action—Outcome for Multi-Repo Development

**Role: Repository Architect**  
→ Action: defines package boundaries, establishes export contracts, selects dependency patterns, maps repository responsibilities, ensures backward compatibility  
→ Outcome: produces scalable repository designs enabling independent development and integration

**Role: Package Engineer**  
→ Action: implements stable exports, maintains type safety, builds feature modules, develops API contracts, handles versioning  
→ Outcome: delivers reliable packages supporting host integration

**Role: Integration Engineer**  
→ Action: coordinates cross-repo changes, validates boundary contracts, implements compatibility layers, manages migrations, verifies integration  
→ Outcome: ensures seamless integration across repository boundaries

**Role: Schema Designer**  
→ Action: defines canonical schemas, documents data formats, establishes SSOT, versions structures, plans migrations  
→ Outcome: establishes clear, versioned contracts enabling data exchange

**Role: Quality Engineer**  
→ Action: implements boundary tests, validates type alignment, tests integration flows, verifies compatibility, ensures regression coverage  
→ Outcome: maintains integration reliability through comprehensive verification

---

## Anti-Pattern Guards

**Architects avoid prohibited multi-repo patterns**:

❌ Hardcoded repository names/paths in code → ✅ Configuration-driven repository identification  
❌ Circular dependencies (packages importing from host) → ✅ Unidirectional dependency flow  
❌ Duplicate type definitions across repos → ✅ Single source of truth for shared types  
❌ Breaking changes without migration path → ✅ Staged rollout with compatibility layers  
❌ Implicit export contracts (no documentation) → ✅ Schema-mediated contracts in SSOT  
❌ Untested cross-repo changes → ✅ Verification at every boundary  
❌ Shared mutable state across packages → ✅ Immutable data flow through exports  
❌ Undocumented breaking changes → ✅ Explicit versioning and migration guides  
❌ Project-specific logic in reusable packages → ✅ Domain-agnostic, configurable implementations  
❌ Embedded repository paths → ✅ Externalized path configuration  

---

## Neutrality Principles for Multi-Repo Development

Owned by [Skill Neutrality & Verification Module](./skill-neutrality-verification.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Verification Requirements

Owned by [Skill Neutrality & Verification Module](./skill-neutrality-verification.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Observability for Multi-Repo Changes

Owned by [Skill Neutrality & Verification Module](./skill-neutrality-verification.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Mantra Application

**"CID frames multi-repo design, Contract-First isolates change concerns, Verification-as-Part aligns engineering responsibilities, SSOT clarifies contract semantics, Configuration-Driven ensures neutrality"**

- **CID frames**: Establishes scope (multi-repository architecture), purpose (agility + stability + safety + neutrality), rules (bounded contexts + stable exports + verification + configuration)
- **Contract-First isolates**: Ensures each repository handles single bounded context, each export addresses focused interface, each contract is explicitly defined
- **Verification-as-Part aligns**: Maps package engineers, integration engineers, schema designers, quality engineers to their deliverables with comprehensive validation
- **SSOT clarifies**: Expresses all contracts (schema definitions, export specifications, integration requirements) with explicit documentation enabling accountability and clear integration
- **Configuration-Driven ensures**: Externalizes repository identification, abstracts project-specific details, enables universal reusability, prevents hardcoded assumptions, maintains domain-agnostic implementation

---

## Quick Reference

Owned by [Skill Configuration Reference Module](./skill-configuration-reference.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Universal Application Examples

Owned by [Skill Patterns & Scenarios Module](./skill-patterns-scenarios.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Configuration Reference

Owned by [Skill Configuration Reference Module](./skill-configuration-reference.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Neutrality Validation Checklist

Owned by [Skill Neutrality & Verification Module](./skill-neutrality-verification.md). Loaded on demand; this entry keeps the anchor stable for inbound references.

## Conclusion

Successful multi-repo development requires disciplined application of system design principles to repository boundaries combined with neutrality and universality. By maintaining contract-first design, single sources of truth, minimal blast radius, cross-repo safety, configuration-driven identification, and comprehensive verification, teams can achieve both agility and stability in distributed codebases across any domain or project context.

The key is treating repository boundaries as service boundaries in a distributed system while maintaining domain-agnostic, reusable implementations: clear contracts, backward compatibility, explicit ownership, comprehensive observability, and configuration-driven behavior. This approach enables independent development while maintaining integration integrity across the entire system, regardless of the specific project domain or technology stack.

**Universal Application**: These guidelines apply equally to any multi-repository architecture—from microservices to modular monoliths, from JavaScript ecosystems to polyglot systems, from enterprise applications to open-source projects. The principles are technology-agnostic, domain-neutral, and project-independent by design.
