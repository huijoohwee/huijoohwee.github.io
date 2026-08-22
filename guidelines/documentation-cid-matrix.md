---
title: "Documentation CID Matrix & Guards Module"
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
parent: "Documentation Guidelines"
parent_version: "1.0.0"
---

# Documentation CID Matrix & Guards Module

## Scope & Ownership

Owns the directive lookup surface and the prohibited-pattern guards.

This module is loaded on demand from [Documentation Guidelines](./documentation-guidelines.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

---

## CID Directive Matrix

Each row is a universal, neutral, project-agnostic directive in `Context | Intent | Directive` grammar. Rows are sorted A→Z.

| Context | Intent | Directive |
|---------|--------|-----------|
| Accountability | Secure via provenance tracing | - [ ] Trace provenance with confidence scores; secure accountability; forbid untracked origins |
| Adaptability | Enable cross-domain deployment | - [ ] Drive schemas via configuration; enable adaptability; forbid hardcoded domain assumptions |
| Adjustment | Document parameter tuning | - [ ] Specify adjustment magnitudes and effects; document tuning history; forbid undocumented parameter changes |
| Aggregation | Explain corpus-wide metrics | - [ ] Document aggregation methods; explain metric computation; forbid opaque aggregation logic |
| Algorithms | Describe universal operations | - [ ] Use universal algorithm patterns; describe abstractly; forbid domain-specific method names in documentation |
| Alignment | Synchronize with CID annotations | - [ ] Align schemas with CID annotations; synchronize specifications; forbid unmarked or unannotated schemas |
| Ambiguity | Ensure specification clarity | - [ ] Prevent ambiguity; ensure clarity at every boundary; forbid vague or implicit specifications |
| Annotations | Mark with intent-directive patterns | - [ ] Annotate with CID; mark specifications; forbid unannotated schemas |
| Anti-patterns | List forbidden violations | - [ ] Document prohibited patterns with corrections; forbid undocumented anti-patterns |
| API | Specify integration contracts | - [ ] Document query interfaces; specify processing logic; forbid undocumented endpoints or implicit routing |
| Architecture | Define layer flow specifications | - [ ] Capture architecture flows with Mermaid; define layers; forbid undocumented multi-component structures |
| Artifacts | Specify output structures | - [ ] Document output artifact schemas; specify structures; forbid implicit output formats |
| Atomic | Express single operations | - [ ] List operations as atomic SVO statements; forbid compound or multi-action directives |
| Audit | Document logging requirements | - [ ] Specify audit trail content and retention; document logging; forbid unlogged decisions |
| Automation | Define documentation generation workflows | - [ ] Document automation contracts; specify triggers and outputs; forbid undocumented generation scripts |
| Backward | Maintain compatibility requirements | - [ ] Preserve backward compatibility across schema changes; forbid breaking changes without migration scripts |
| Boundaries | Avoid dataset coupling | - [ ] Maintain layer boundaries; use placeholders; forbid dataset-specific or project-specific examples |
| Capture | Document responsibilities clearly | - [ ] Capture component responsibilities in SVO format; forbid ambiguous or role-free documentation |
| Clarity | Preserve structural understanding | - [ ] Layer flows with component specs; ensure clarity; forbid obscure or undocumented architectures |
| Coherence | Maintain structure-semantic separation | - [ ] Separate structure from semantics in documentation; forbid coupled or conflated specifications |
| Configuration | Document adaptive parameters | - [ ] Specify configuration schemas with impact; document all adaptive parameters; forbid hardcoded values |
| Constraints | Provide structural validation rules | - [ ] Document constraints as structural rules; forbid semantic validation embedded in structural schemas |
| Contracts | Specify data schema requirements | - [ ] Document schema contracts with required and optional fields; forbid implicit agreements |
| Coverage | Define neutral status matrices | - [ ] Document coverage matrices with neutral indicators; forbid domain-specific coverage tracking |
| Data States | Handle all fetch and processing states | - [ ] Document loading, stale, error, and empty states for every data-consuming component; forbid single-state documentation |
| Decisions | Log for reproducibility | - [ ] Document merge and architectural decisions; log rationale; forbid unlogged choices |
| Dependencies | Map component relationships | - [ ] Identify and document dependencies; forbid undeclared coupling or implicit relationships |
| Documentation | Structure with transformation flows | - [ ] Layer flows with specs; structure clearly; forbid flat or unstructured documentation |
| Domain | Test blindness systematically | - [ ] Document domain blindness tests; validate neutrality across ≥ 3 domains; forbid single-domain validation |
| Error | Specify handling strategies | - [ ] Document error paths with recovery or escalation; forbid undefined error states |
| Evolution | Document schema versioning | - [ ] Track schema evolution with semantic versioning; forbid unversioned or arbitrarily changed schemas |
| Execution | Enable reproducible pipelines | - [ ] Log execution parameters; enable full reproducibility from logs; forbid unreproducible runs |
| Export | Document format transformations | - [ ] Specify export field mappings; document transformations; forbid undocumented format conversions |
| Extraction | Define quality measures | - [ ] Document precision, recall, and coherence metrics; forbid unmeasured extraction |
| Feedback | Document monitoring procedures | - [ ] Explain feedback loops and triggers; document monitoring; forbid unmonitored quality signals |
| Fields | Distinguish required from optional | - [ ] Document field requirements distinctly; forbid ambiguous mandatory-field specifications |
| Flow | Define layer progression | - [ ] Specify layer flows for every pipeline; define progression; forbid undocumented data pipelines |
| Forbidden | List hardcoding violations | - [ ] Document all forbidden patterns with examples; forbid undocumented restrictions |
| Formatting | Preserve context via metadata | - [ ] Document metadata preservation methods; forbid context-stripped documentation |
| Gates | Document quality thresholds | - [ ] Integrate documentation with quality gates; document thresholds; forbid unvalidated documentation |
| Hardcoding | Forbid in documentation examples | - [ ] Eliminate hardcoded project or dataset names; use placeholders; forbid project-specific samples |
| Harness | Document AI pipeline control contracts | - [ ] Document harness input/output schemas, cost log fields, and fallback paths; forbid raw prompt calls with no harness contract |
| Impact | Explain parameter effects | - [ ] Document impact descriptions for every parameter; forbid unexplained configuration settings |
| Integration | Document quality gate alignment | - [ ] Align documentation with quality gates; forbid isolated documentation not tied to validation |
| Interoperability | Build cross-domain pipelines | - [ ] Enable interoperability; document universally; forbid domain-locked documentation |
| Journeys | Map user workflows | - [ ] Chart user journeys for every user-facing feature; forbid journey-free feature documentation |
| Logging | Specify retention requirements | - [ ] Document logging requirements and retention periods; forbid unclear audit lifecycles |
| Maintenance | Document monitoring and rollback | - [ ] Specify maintenance procedures and rollback strategies; forbid undocumented operational procedures |
| Mapping | Trace requirements to implementation | - [ ] Link specs to implementation via PRD ↔ TAD ↔ VCC chain; forbid orphaned requirements |
| Metrics | Define computation methods | - [ ] Document quality metrics with computation methods; forbid unmeasured quality dimensions |
| Migration | Provide breaking change scripts | - [ ] Provide migration scripts for every breaking change; forbid manual schema migrations |
| Modularity | Design independent documentation units | - [ ] Each section is self-contained and liftable; forbid cross-section coupling |
| Neutrality | Maintain domain independence | - [ ] Design documentation domain-neutral; forbid project names, vendor names, or dataset labels in rules |
| Observability | Enable system transparency | - [ ] Document telemetry, cost log emission, and observability hooks; forbid black-box pipeline documentation |
| Orchestration | Document AI pipeline topology | - [ ] Specify orchestration topology (sequential/fan-out/agentic); set max-iteration bounds; forbid unbounded loops |
| Outcomes | Specify transformation deliverables | - [ ] Document outcomes and output artifacts; forbid unclear or implicit deliverables |
| Parameters | Document with impact descriptions | - [ ] Specify every parameter with default, range, and impact; forbid unexplained configuration settings |
| Patterns | Provide intent-directive templates | - [ ] Document patterns with templates; forbid ad-hoc documentation styles |
| Performance | Specify response requirements | - [ ] Document latency and throughput targets; forbid unspecified or unmeasured performance criteria |
| Provenance | Trace with source and method metadata | - [ ] Document provenance for every output artifact; forbid untracked data lineage |
| Quality | Apply metrics-based standards | - [ ] Document quality standards with metrics; forbid unmeasured or subjective quality gates |
| Reproducibility | Log parameters systematically | - [ ] Enable full reproducibility from logs; forbid unreproducible documentation or pipeline execution |
| Resilience | Optimize feedback loops | - [ ] Document resilience mechanisms; forbid fragile or unmonitored feedback loops |
| Responsibilities | Capture component duties | - [ ] Document component responsibilities in SVO format; forbid unclear or ambiguous component roles |
| Rollback | Provide degradation procedures | - [ ] Document rollback procedures; forbid unclear failure or degradation responses |
| Scalability | Document complexity characteristics | - [ ] Specify scalability and complexity; forbid unanalyzed performance characteristics |
| Schema | Version with semantic rules | - [ ] Apply semantic versioning to all schemas; forbid arbitrary or undocumented schema changes |
| Separation | Maintain structure-semantic divide | - [ ] Separate structural and semantic documentation; forbid conflated specifications |
| Stewardship | Name roles not individuals | - [ ] Assign documentation ownership to roles; forbid individual-based stewardship assignments |
| TCO | Make total cost explicit | - [ ] Document 12-month TCO for every dependency; forbid uncosted architectural decisions |
| Thresholds | Document tuning mechanisms | - [ ] Specify thresholds with tuning guidance; forbid hardcoded quality gates with no rationale |
| Token Economics | Treat token spend as a metric | - [ ] Estimate prompt + completion tokens per pipeline call; track actuals; forbid AI pipelines without token budgets |
| Topology | Map structural component connections | - [ ] Document runtime topology for systems with ≥ 3 components; name every connection type; forbid implicit or unlabelled connections |
| Traceability | Enable via comprehensive docs | - [ ] Document full PRD ↔ TAD ↔ VCC chain; forbid incomplete provenance documentation |
| Transformation | Document using From-To patterns | - [ ] Express every transformation as From [input state] to [output state]; forbid unclear state transitions |
| Transparency | Log parameters reproducibly | - [ ] Ensure parameter transparency; log reproducibly; forbid opaque configuration documentation |
| Validation | Provide structural checklists | - [ ] Provide validation checklists for every document type; forbid subjective or unchecked documentation |
| VCC | Derive from acceptance criteria | - [ ] Express every acceptance criterion as an evaluable VCC; forbid criteria that an agent cannot verify from its own output |
| Versioning | Apply semantic rules | - [ ] Apply semantic versioning to documents and schemas; forbid unversioned or in-place overwrites |
| Violations | List explicitly with guidance | - [ ] Document violations with corrections; forbid undocumented anti-patterns |
| Workflows | Document process flows | - [ ] Document workflows with trigger, happy path, alternate paths, error paths, and postconditions; forbid workflow-free features |

---

---

## Anti-Pattern Guards

**Documentation Content**:
❌ Hardcoded project names, dataset labels, or vendor-specific identifiers in rules or examples
→ ✅ Use placeholders (`[...]`); keep all examples domain-agnostic

❌ Vague or non-observable acceptance criteria ("documentation is complete", "system is working")
→ ✅ Every criterion expressible as a VCC: one measurable end state + a stated check + scope constraints

❌ Flat documentation without layer flows or component specs
→ ✅ Structure documentation with transformation flows; layer flows with component specs

❌ Component documentation with no stated responsibility
→ ✅ Every component documented with an SVO responsibility statement

❌ Configuration parameters with no impact description or default value
→ ✅ Every parameter documented with default, min, max, interval, and impact description

**Schema and API**:
❌ Schema contracts with implicit or undocumented fields
→ ✅ All required and optional fields documented; vocabulary mappings explicit

❌ Query interfaces with no traversal strategy or intent classification documentation
→ ✅ Query logic documented with intent-to-strategy mappings

❌ Export formats with undocumented field mappings
→ ✅ All export field mappings specified; metadata preservation documented

**AI Pipelines**:
❌ AI pipelines documented only as data flows with no harness contract
→ ✅ Every AI pipeline has an Orchestration/Harness Flow with dispatcher, executor, observer, and consumer roles named

❌ Agentic loops with no max-iteration bound or circuit-breaker condition
→ ✅ Every loop specifies max iterations and a circuit-breaker exit condition; token spend is bounded and observable

❌ Token cost treated as invisible; no prompt/completion budget documented
→ ✅ Token budget estimated and documented per pipeline; actuals tracked and compared to estimates

**Provenance and Versioning**:
❌ Output artifacts with no extraction method label or source tracking
→ ✅ Every artifact tagged with extraction method and source provenance

❌ Schema changes without version bump or migration script
→ ✅ Semantic versioning applied; breaking changes accompanied by migration scripts

❌ Confidence scores with no decay rule or propagation documentation
→ ✅ Confidence propagation and decay rules stated explicitly

**Maintenance and Automation**:
❌ Documentation artifacts maintained manually when they can be generated
→ ✅ Automation contracts documented; generated artifacts regenerated via scripted workflows

❌ Status coverage matrices using domain-specific symbols or individual names
→ ✅ Neutral indicators (`[x]` / `[ ]`); role-based stewardship columns

---
