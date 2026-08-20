---
title: "PRD, TAD & ADR CID Directive Matrix Module"
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
parent: "PRD, TAD & ADR Guidelines"
parent_version: "1.9.0"
---

# PRD, TAD & ADR CID Directive Matrix Module

## Scope & Ownership

This module owns the alphabetical, project-agnostic directive mantras and the prohibited-pattern guards they summarise. It is the lookup surface for the set, not an additional source of obligations.

It inherits the parent set's Scope & Neutrality Contract, Rule Identity derivation, and finding recording contract without restating them. Rule IDs derive from the owning `##` section anchor and the rule's document-order ordinal, exactly as in the parent.

---

## CID Directive Matrix

Each row is a universal, neutral, project-agnostic mantra in `Context | Intent | Directive` grammar (see Directive Grammar (CID)). Rows are sorted A→Z and contain no project, vendor, or file references.

| Context         | Intent                               | Directive                                                                                      |
|-----------------|--------------------------------------|-----------------------------------------------------------------------------------------------|
| Acceptance      | Define verifiable criteria           | - [ ] Specify testable criteria expressible as VCCs; enable verification; forbid ambiguous requirements |
| Accountability  | Assign clear ownership               | - [ ] Name responsible parties; assign ownership; forbid unassigned features                  |
| Adaptability    | Enable configuration-driven design   | - [ ] Design configurably; enable adaptation; forbid hardcoded solutions                      |
| Agent readiness | Enable external agent onboarding   | - [ ] Document discovery chain, surface matrix by trust boundary, and zero-token discovery paths; forbid HTML-scrape-only onboarding |
| Agentic OS      | Unify harness visibility read-only   | - [ ] Spec OS Status Surface views with $0 token budget, read-time aggregation, and partial-failure fields; forbid OS-level write paths or new persistent OS datastore |
| Alignment       | Synchronize team understanding       | - [ ] Review with stakeholders; synchronize understanding; forbid siloed development          |
| Alternatives    | Document rejected options            | - [ ] Record considered options; document alternatives; forbid undocumented decisions         |
| Ambiguity       | Ensure specification clarity         | - [ ] Write precisely; ensure clarity; forbid vague requirements                              |
| API             | Specify integration contracts        | - [ ] Define API contracts; specify interfaces; forbid implicit interfaces                    |
| Architecture    | Design component interactions        | - [ ] Map component relationships; design interactions; forbid undocumented dependencies      |
| Assumptions     | Validate iteratively                 | - [ ] Test assumptions early; validate iteratively; forbid untested assumptions               |
| Boundaries      | Define system scope                  | - [ ] Establish clear scope; define boundaries; forbid scope creep                            |
| Capacity        | Specify performance limits           | - [ ] Define load requirements; specify capacity; forbid unspecified scalability              |
| Changes         | Track requirement evolution          | - [ ] Version requirement changes; track evolution; forbid unversioned modifications          |
| Components      | Specify modular units                | - [ ] Define component boundaries; specify modules; forbid monolithic designs                 |
| Conformance     | Make every rule violation recordable | - [ ] Map every rule to a Finding Type with a severity; deduplicate on type, anchor, and artifact; order by severity then type; forbid `forbid` statements with no typed finding name |
| Constraints     | Document limitations explicitly      | - [ ] State constraints clearly; document limitations; forbid implicit restrictions           |
| Contracts       | Define interface agreements          | - [ ] Specify interface contracts; define agreements; forbid implicit assumptions             |
| Data            | Specify flow and storage             | - [ ] Map data flows; specify storage; forbid undocumented persistence                        |
| Decisions       | Document rationale                   | - [ ] Record decision reasoning; document rationale; forbid unexplained choices               |
| Decomposition   | Break complex features               | - [ ] Decompose into stories; break complexity; forbid monolithic requirements                |
| Dependencies    | Map component relationships          | - [ ] Identify dependencies; map relationships; forbid undeclared coupling                    |
| Deployment      | Specify release strategies           | - [ ] Plan deployment approach; specify strategies; forbid ad-hoc deployments                 |
| Design          | Justify architectural patterns       | - [ ] Document design patterns; justify architecture; forbid pattern-free implementations     |
| Edge            | Specify boundary conditions          | - [ ] Define edge cases; specify boundaries; forbid untested limits                           |
| Error           | Specify handling strategies          | - [ ] Define error responses; specify handling; forbid undefined error states                 |
| Evidence        | Prove claims with recorded checks    | - [ ] Attach an Evidence Reference (named invocable check + recorded result + surface) to every VCC; forbid readiness claims backed by narrative instead of a recorded result |
| Evolution       | Version documents systematically     | - [ ] Apply semantic versioning; track evolution; forbid untracked changes                    |
| Failures        | Document failure modes               | - [ ] Analyze failure scenarios; document modes; forbid undocumented edge cases               |
| Features        | Prioritize systematically            | - [ ] Apply MoSCoW framework; prioritize features; forbid arbitrary ordering                  |
| Feedback        | Incorporate user insights            | - [ ] Gather user input; incorporate feedback; forbid assumption-only design                  |
| FOSS            | Default to open-source dependencies  | - [ ] Identify FOSS alternative before any proprietary selection; document TCO comparison in ADR; forbid undocumented vendor lock-in |
| Gateway         | Federate tool surfaces without proxy duplication | - [ ] Document discovery-first federation across existing transports; compare unified-proxy alternative in ADR; forbid undocumented fifth-proxy gateway |
| Goals           | Define measurable, evaluable objectives | - [ ] Set quantifiable goals expressible as VCCs; define objectives; forbid vague aspirations |
| Harness         | Wrap AI calls in typed, observable contracts | - [ ] Define harness input/output schemas; emit cost log per call; specify fallback path; forbid raw unstructured prompt calls in production pipelines |
| Hypotheses      | State testable assumptions           | - [ ] Formulate testable claims; state hypotheses; forbid untestable claims                   |
| Impact          | Assess user value                    | - [ ] Estimate value delivery; assess impact; forbid value-free features                      |
| Integration     | Specify connection points            | - [ ] Define integration interfaces; specify connections; forbid undocumented interfaces      |
| Interfaces      | Define contracts explicitly          | - [ ] Document API contracts; define interfaces; forbid implicit agreements                   |
| Iteration       | Refine incrementally                 | - [ ] Update iteratively; refine continuously; forbid waterfall documentation                 |
| Jobs            | Define user tasks                    | - [ ] Specify jobs-to-be-done; define tasks; forbid solution-centric requirements             |
| Journeys        | Map user workflows                   | - [ ] Chart user paths; map journeys; forbid feature-centric views                            |
| Knowledge       | Capture domain insights              | - [ ] Document domain knowledge; capture insights; forbid undocumented context                |
| Lanes           | Gate movement toward public surfaces | - [ ] Document authoring, mirror, and delivery lanes with a named Deploy Boundary carrying evidence, operator instruction, and rollback; keep boundaries `closed` by default; forbid authoring-lane commands that mutate a delivered surface |
| Maintainability | Design for evolution                 | - [ ] Plan for change; design maintainably; forbid rigid architectures                        |
| Mapping         | Trace requirements to implementation | - [ ] Link specs to code; trace mapping; forbid orphaned requirements                         |
| Metrics         | Define success measures              | - [ ] Specify KPIs; define metrics; forbid unmeasured outcomes                                |
| Migration       | Plan transition strategies           | - [ ] Define migration paths; plan transitions; forbid breaking changes without migration     |
| Min-Viable      | Maximise value per scope unit        | - [ ] Define the smallest deliverable that satisfies the acceptance criterion; score ROI before expanding scope; forbid feature bloat without user-impact justification |
| Modularity      | Design independent components        | - [ ] Enforce module boundaries; design modularly; forbid monolithic systems                  |
| Monitoring      | Specify observability needs          | - [ ] Define telemetry requirements; specify monitoring; forbid unmonitored systems           |
| MoSCoW          | Prioritize via framework             | - [ ] Apply Must/Should/Could/Won't; prioritize systematically; forbid unprioritized backlogs |
| Narratives      | Structure user-centric stories       | - [ ] Write from user perspective; structure narratives; forbid technical-only descriptions   |
| Neutrality      | Maintain domain independence         | - [ ] Design domain-neutral; maintain independence; forbid coupled designs                    |
| Non-functional  | Specify quality attributes           | - [ ] Define performance/security/usability; specify attributes; forbid functional-only reqs  |
| Objectives      | Align with business goals            | - [ ] Connect to strategy; align objectives; forbid misaligned features                       |
| Observability   | Enable system transparency           | - [ ] Design for monitoring; enable observability; forbid black-box implementations           |
| Orchestration   | Design composable AI pipelines       | - [ ] Specify orchestration topology (sequential/fan-out/agentic loop); set max-iteration bounds; forbid unbounded agentic loops without circuit-breaker conditions |
| Outcomes        | Define measurable results            | - [ ] Specify outcome metrics; define results; forbid output-only metrics                     |
| Patterns        | Apply proven solutions               | - [ ] Use established patterns; apply solutions; forbid anti-patterns                         |
| Performance     | Specify response requirements        | - [ ] Define latency/throughput; specify performance; forbid unspecified latency              |
| Personas        | Define user archetypes               | - [ ] Create user personas; define archetypes; forbid generic user assumptions                |
| Prioritization  | Rank systematically                  | - [ ] Use value/effort matrix; rank systematically; forbid first-come ordering                |
| Problems        | Define user pain points              | - [ ] Identify user problems; define pain points; forbid solution-first thinking              |
| Protocols       | Specify communication standards      | - [ ] Define message formats; specify protocols; forbid proprietary interfaces                |
| Quality         | Define acceptance standards          | - [ ] Set quality thresholds; define standards; forbid subjective quality gates               |
| Rationale       | Document decision reasoning          | - [ ] Explain why decisions; document reasoning; forbid unexplained choices                   |
| Readiness       | Derive status from evidence          | - [ ] Assign exactly one Readiness Ladder rung per capability, derived from Evidence References; report local and delivered rungs separately; forbid hand-authored status and forbid values outside the ladder |
| Recovery        | Specify failure handling             | - [ ] Define disaster recovery; specify handling; forbid undefined disaster responses         |
| Requirements    | Structure hierarchically             | - [ ] Organize Epic→Story→Task; structure hierarchy; forbid flat requirement lists            |
| Resilience      | Design for failure tolerance         | - [ ] Plan for failures; design resiliently; forbid fragile systems                           |
| Reuse           | Leverage existing components         | - [ ] Identify reusable parts; leverage existing; forbid reinvention                          |
| Risk            | Assess potential issues              | - [ ] Identify risks; assess impact; forbid risk-blind planning                               |
| ROI             | Justify investment with return       | - [ ] Compute ROI score `(impact × reach) / (build + TCO + token cost)` before Phase 1 gate; rank features by ROI; forbid zero-ROI items in Must/Should tiers |
| Scalability     | Specify growth requirements          | - [ ] Define scale targets; specify growth; forbid fixed-capacity designs                     |
| Scenarios       | Provide usage examples               | - [ ] Write scenario walkthroughs; provide examples; forbid example-free specifications       |
| Scope           | Define boundaries explicitly         | - [ ] State what's included/excluded; define scope; forbid unbounded features                 |
| Security        | Specify protection requirements      | - [ ] Define security needs; specify requirements; forbid security-as-afterthought            |
| Separation      | Maintain concern boundaries          | - [ ] Keep PRD/TAD separate; maintain boundaries; forbid mixed responsibilities               |
| Sequencing      | Order feature delivery               | - [ ] Plan release sequence using agent-platform execution order (Must OS → discovery → federation → spend safety → live proof → operator UI); forbid dependency-blind scheduling and parallel surface drift before gateway contract freeze |
| Simplicity      | Prefer minimal solutions             | - [ ] Choose simple approaches; prefer minimalism; forbid over-engineering                    |
| Stories         | Write user narratives                | - [ ] Use "As a…I want…So that"; write narratives; forbid technical task lists                |
| Success         | Define completion criteria           | - [ ] Specify done conditions as observable, evaluator-verifiable states; define success; forbid ambiguous done states |
| TCO             | Make total cost of ownership explicit | - [ ] Estimate 12-month TCO for every dependency (infra + API + egress + token spend) across each deployment model it offers (managed/serverless, provisioned/self-managed, hybrid/consolidated); document in ADR; forbid uncosted architectural decisions and forbid blending deployment-model variants into one figure |
| Testability     | Enable verification                  | - [ ] Design for testing; enable verification; forbid untestable requirements                 |
| Timelines       | Define delivery schedules            | - [ ] Set release dates; define timelines; forbid open-ended commitments                      |
| Time-to-Value   | Minimise first-success latency       | - [ ] Estimate TTV steps and elapsed time in Phase 0; include TTV as a named success metric in every user-facing PRD; validate on a clean environment before Phase 3 sign-off; forbid TTV reductions that compromise security or data integrity |
| Token Economics | Treat token spend as an engineering metric | - [ ] Estimate prompt + completion tokens per pipeline call; track cache hit rate; set cost-per-request budget; forbid pipelines without token budget estimates |
| Topology        | Map structural component connections       | - [ ] Document runtime topology for systems with ≥3 components; name every connection type and data residency; version-stamp every topology change; forbid unlabelled connections or unlocated data stores |
| Traceability    | Link requirements to implementation  | - [ ] Maintain requirement IDs; link specs; forbid orphaned specs                             |
| Trade-offs      | Document decision factors            | - [ ] Analyze pros/cons; document trade-offs; forbid unexplored alternatives                  |
| Uncertainty     | Acknowledge unknowns                 | - [ ] Flag assumptions; acknowledge uncertainty; forbid false certainty                       |
| Usability       | Specify user experience requirements | - [ ] Define UX requirements; specify usability; forbid UX-free designs                       |
| User            | Center on user needs                 | - [ ] Start with user problems; center on users; forbid technology-first requirements         |
| Validation      | Define acceptance tests              | - [ ] Specify test scenarios; define validation; forbid subjective validation                 |
| Value           | Justify feature investment           | - [ ] Estimate ROI; justify value; forbid value-free development                              |
| Vendor          | Evaluate dependency risk             | - [ ] Assess vendor lock-in risk; document exit strategy for every proprietary dependency; forbid undocumented single-vendor dependencies |
| Versioning      | Track document evolution             | - [ ] Use semantic versioning; track changes; forbid unversioned changes                      |
| Workflows       | Map user processes                   | - [ ] Chart process flows; map workflows; forbid workflow-free features                       |

---

---

## Anti-Pattern Guards

❌ Missing or malformed YAML frontmatter in canonical PRD/TAD/ADR docs; unquoted scalars containing reserved punctuation; typed `{key, type, value}` wrappers used in authored docs instead of validation fixtures  
→ ✅ Frontmatter present as the first block in every canonical doc; scalars with reserved punctuation quoted; typed wrappers reserved for ingest→parse→render or ingest→parse→validate fixtures only; malformed YAML fixed at source, not silently repaired downstream

❌ Solution-first PRDs, implementation detail in PRDs, vague acceptance criteria  
→ ✅ Problem-first approach, business-focused PRDs, testable Given-When-Then criteria

❌ Undocumented decisions, unexplored trade-offs, domain-coupled architectures  
→ ✅ ADR documentation, explicit trade-off analysis, domain-agnostic designs

❌ Orphaned requirements, conflicting PRD/TAD, unversioned documents  
→ ✅ Traced requirements, aligned specifications, version-controlled docs

❌ Waterfall documentation, static architectures, journey-free features  
→ ✅ Iterative living documents, evolvable designs, journey-anchored stories

❌ Data flows without typed schemas, workflows without error paths, journeys without friction mapping  
→ ✅ Typed schemas at every boundary, full-path workflows, stage-complete journeys

❌ Acceptance criteria that cannot be demonstrated by the executing agent's own output ("looks good", "is complete", "is improved")  
→ ✅ Every criterion expressible as a VCC: one measurable end state + a stated check + any scope constraints

❌ VCCs set at implementation without re-checking the PRD when requirements change  
→ ✅ Traceability maintained across `PRD-[Epic]-[Story] ↔ TAD-[Component]-[Interface] ↔ VCC [condition]`; conditions updated in lockstep with criteria

❌ Raw, unstructured LLM prompt calls in production pipelines; no input/output validation; no cost logging  
→ ✅ Every AI call wrapped in a harness with typed schemas, cost log emission, and a documented fallback path

❌ Unbounded agentic loops; orchestration topologies with no max-iteration bound or circuit-breaker  
→ ✅ Every loop specifies max iterations and a circuit-breaker exit condition; token spend is bounded and observable

❌ Proprietary dependencies selected without a FOSS comparison; undocumented vendor lock-in; uncosted egress  
→ ✅ Every ADR lists a FOSS alternative with 12-month TCO comparison; zero-egress infrastructure preferred by default

❌ A candidate's Managed/Serverless and Provisioned/Self-Managed deployment models blended into one TCO figure; ops burden omitted from the comparison; a Provisioned/Self-Managed total computed by naively summing independent per-service costs with no Hybrid/Consolidated estimate  
→ ✅ Each deployment model a candidate offers gets its own TCO row or column with an explicit ops-burden rating; a Hybrid/Consolidated estimate is added whenever multiple workloads could realistically share one provisioned runtime

❌ Features sized without ROI scoring; Must-tier items with no user impact justification; scope bloat  
→ ✅ Every feature carries an explicit ROI score before entering MoSCoW; min-viable scope defined before implementation begins

❌ Token cost treated as invisible or negligible; no prompt/completion budget per pipeline  
→ ✅ Token budget (prompt + completion + cache hit rate) estimated in TAD; actuals tracked each sprint and compared to estimates

❌ Time-to-value not estimated in Phase 0; no TTV target in PRD success metrics; first-run path never walked through on a clean environment  
→ ✅ TTV steps and elapsed time estimated in Phase 0; TTV stated as a named success metric in PRD; validated on a clean environment before Phase 3 sign-off

❌ AI pipelines documented only as data flows or workflows; no named dispatcher, executor, observer, or consumer roles; no cost log field specified; no circuit-breaker for loops  
→ ✅ Every AI pipeline has an Orchestration/Harness Flow with typed roles, cost log fields, fallback paths, and — for loops — a max-iteration bound and circuit-breaker condition

❌ Multi-component systems with no topology diagram; connection types left implicit; storage nodes with no data residency stated; topology overwritten in place with no version note  
→ ✅ Topology documented for every system with ≥3 components; every connection labelled (sync/async/stream); every storage node carries data residency; topology version-stamped on every change

❌ Vague “agent-ready” claims without naming Agentic OS, AI Agent discovery, or Gateway federation dimensions; OS Status Surface that mutates harness state or performs model calls  
→ ✅ Each readiness dimension scoped, tiered, and backed by VCCs; OS Status Surface read-only at $0 token cost; partial failures surfaced explicitly

❌ Monolithic MCP/API proxy duplicating existing dispatch layers; discovery paths that invoke paid models; Follow-on live orchestration before spend-safety track exits  
→ ✅ Discovery-first gateway federation over existing transports (ADR compares unified-proxy alternative); execution order enforced: Must visibility/discovery → federation → spend safety → live proof → operator UI

❌ A readiness status authored by hand with no satisfying evidence; a status value outside the Readiness Ladder; one status field blending local and delivered readiness  
→ ✅ Every rung derived from Evidence References only; values drawn from the Readiness Ladder; local and delivered readiness reported as two separate fields

❌ A rule that requires an artifact but names none; an artifact that answers to no rule; a reference to a target that does not resolve  
→ ✅ Bidirectional closure enforced per the Closure Rules; coverage stated as a ratio; every break resolved or formally tracked

❌ Promotion between lanes with no named boundary, no evidence, no operator instruction, or no rollback path; an authoring-lane command that mutates a mirror or delivery surface; a boundary that is open by default  
→ ✅ Every boundary named and carrying all four parts; boundaries `closed` by default; authoring-lane commands structurally unable to reach a delivered surface

❌ A `forbid` statement with no typed finding name, so a violation cannot be recorded, compared, or regression-tracked  
→ ✅ Every rule maps to a Finding Type with a severity; findings deduplicated, ordered, and comparable across runs

❌ Findings anchored to a section rather than a rule, collapsing distinct violations into one; rules left unclassified so the coverage ratio cannot be computed  
→ ✅ Every finding anchored to a Rule ID; every rule classified artifact-bearing or advisory; coverage ratio and advisory count both reported

❌ A Finding Type in the enumeration whose triggering concept the guideline set never defines, so the type can never be raised  
→ ✅ Every type has a rule that can raise it; a type whose concept is undefined is either defined or removed

❌ A conformance check that depends on wall clock, random source, or filesystem ordering, making the regression comparison unreliable  
→ ✅ Deterministic, order-independent, additive, bounded, and comparable by construction; degraded inputs yield typed findings and a completed run

❌ Rules that read an `owner`, a status, or a lane that the frontmatter contract never requires, forcing recovery from a path or a directory  
→ ✅ Conformance keys required in frontmatter; every rule reads a declared field

❌ The evaluator collapsed into the implementing role in a solo-dev context, producing self-graded verdicts  
→ ✅ Evaluator independence enforced mechanically: a check the participant does not adjudicate; role collapse limited to authoring functions

❌ A guideline set that must be loaded whole on every turn, with its own compliance cost unmeasured  
→ ✅ Phase-scoped section loading; guideline load cost recorded as a line item in the authoring loop's token budget

---

---
