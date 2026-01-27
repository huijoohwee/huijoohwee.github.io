---
name: system-design-skill
description: Distributed system architecture principles (CID framework). Use when designing/reviewing distributed systems, APIs, microservices, data architecture, or security layers.
---

# System Design Guidelines

## Description
Enforces distributed-first architecture: resilience, scalability, observability, defense-in-depth security using Context-Intent-Directive (CID) framework.

## When to use
- Designing distributed system architecture
- Reviewing microservice boundaries or API contracts
- Planning data storage patterns or caching layers
- Implementing security, observability, or resilience patterns

## Instructions
ARCHITECTURE: design distributed-first; forbid monoliths; enable independent deployment; bound contexts with ownership
RESILIENCE: circuit break on failures; apply exponential backoff+jitter; eliminate single points of failure; degrade gracefully
EVENT-DRIVEN: integrate through messaging; forbid sync chains >3 hops; process idempotently; implement dead letter queues
CONTRACTS: define schema-first APIs; maintain backward compatibility; version via headers; forbid implicit agreements
STORAGE: own database per service; select by access pattern (RDBMS/Document/Graph/Object); forbid shared databases
CACHING: implement hierarchical layers (CDN→Gateway→App→DB); configure TTL; apply event-driven invalidation
SECURITY: authenticate at edge; authorize at service; audit everywhere; encrypt at rest/transit; ensure OWASP compliance
OBSERVABILITY: track RED metrics (Rate/Errors/Duration); structure logs as JSON with correlation IDs; trace critical paths
PERFORMANCE: load test at 2x peak; verify p99 <500ms; review query plans; enforce GraphQL complexity limits
ANTI-PATTERNS: forbid distributed monoliths, unbounded queues, tight coupling, unmonitored flows, breaking API changes