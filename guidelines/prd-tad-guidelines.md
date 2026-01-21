# PRD & TAD Guidelines

## Overview

**Product Requirements Documentation**: define user value propositions to ensure clarity, specify acceptance criteria to enable validation, prioritize features systematically to optimize delivery, align stakeholders collaboratively to prevent miscommunication, validate assumptions iteratively to accelerate learning, and maintain traceability bidirectionally to secure accountability.

**Technical Architecture Documentation**: design component interactions to preserve modularity, specify integration contracts to enable composition, document decision rationale to maintain transparency, establish quality attributes to uphold standards, define deployment strategies to ensure reliability, and trace requirements to implementation to guarantee completeness.

**PRD & TAD standards**: structure documents with user-centric narratives to ensure relevance, design architectures with domain-agnostic patterns to preserve adaptability, specify measurable outcomes to enable validation, maintain requirement-to-implementation traceability to secure accountability, apply iterative refinement to accelerate discovery, and separate concerns systematically to uphold clarity.

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

- Acceptance; define verifiable criteria; forbid ambiguous requirements
- Accountability; assign clear ownership; forbid unassigned features
- Adaptability; enable configuration-driven design; forbid hardcoded solutions
- Alignment; synchronize team understanding; forbid siloed development
- Alternatives; document rejected options; forbid undocumented decisions
- Ambiguity; ensure specification clarity; forbid vague requirements
- API; specify integration contracts; forbid implicit interfaces
- Approach; justify technical decisions; forbid arbitrary choices
- Architecture; design component interactions; forbid undocumented dependencies
- Assumptions; validate iteratively; forbid untested assumptions
- Attributes; define quality requirements; forbid unmeasured qualities
- Boundaries; define system scope; forbid scope creep
- Capacity; specify performance limits; forbid unspecified scalability
- Changes; track requirement evolution; forbid unversioned modifications
- Coherence; maintain document consistency; forbid contradictory specifications
- Communication; enable stakeholder alignment; forbid information silos
- Components; specify modular units; forbid monolithic designs
- Composition; enable system integration; forbid tightly coupled modules
- Constraints; document limitations explicitly; forbid implicit restrictions
- Context; provide user scenarios; forbid feature-only descriptions
- Contracts; define interface agreements; forbid implicit assumptions
- Criteria; specify success metrics; forbid subjective acceptance
- Data; specify flow and storage; forbid undocumented persistence
- Decisions; document rationale; forbid unexplained choices
- Decomposition; break complex features; forbid monolithic requirements
- Dependencies; map component relationships; forbid undeclared coupling
- Deployment; specify release strategies; forbid ad-hoc deployments
- Design; justify architectural patterns; forbid pattern-free implementations
- Discovery; enable rapid learning; forbid slow validation cycles
- Documentation; structure hierarchically; forbid flat organization
- Domain; maintain neutrality; forbid domain-specific hardcoding
- Edge; specify boundary conditions; forbid untested limits
- Enablers; identify technical prerequisites; forbid missing infrastructure
- Epic; decompose into stories; forbid oversized work items
- Error; specify handling strategies; forbid undefined error states
- Evolution; version documents systematically; forbid untracked changes
- Examples; provide concrete scenarios; forbid abstract-only descriptions
- Failures; document failure modes; forbid undocumented edge cases
- Features; prioritize systematically; forbid arbitrary ordering
- Feedback; incorporate user insights; forbid assumption-only design
- Goals; define measurable objectives; forbid vague aspirations
- Guidance; provide implementation direction; forbid implementation-specific details
- Hypotheses; state testable assumptions; forbid untestable claims
- Impact; assess user value; forbid value-free features
- Implementation; provide architectural guidance; forbid prescriptive code
- Integration; specify connection points; forbid undocumented interfaces
- Interfaces; define contracts explicitly; forbid implicit agreements
- Iteration; refine incrementally; forbid waterfall documentation
- Journeys; map user workflows; forbid feature-centric views
- Justification; explain design decisions; forbid unjustified patterns
- Jobs; define user tasks; forbid solution-centric requirements
- Knowledge; capture domain insights; forbid undocumented context
- Limits; specify system boundaries; forbid unbounded requirements
- Maintainability; design for evolution; forbid rigid architectures
- Mapping; trace requirements to implementation; forbid orphaned requirements
- Metrics; define success measures; forbid unmeasured outcomes
- Migration; plan transition strategies; forbid breaking changes without migration
- Milestones; define delivery checkpoints; forbid undefined timelines
- Modularity; design independent components; forbid monolithic systems
- Monitoring; specify observability needs; forbid unmonitored systems
- MoSCoW; prioritize via framework; forbid unprioritized backlogs
- Narratives; structure user-centric stories; forbid technical-only descriptions
- Neutrality; maintain domain independence; forbid coupled designs
- Non-functional; specify quality attributes; forbid functional-only requirements
- Objectives; align with business goals; forbid misaligned features
- Observability; enable system transparency; forbid black-box implementations
- Outcomes; define measurable results; forbid output-only metrics
- Ownership; assign responsibility clearly; forbid ambiguous assignments
- Patterns; apply proven solutions; forbid anti-patterns
- Performance; specify response requirements; forbid unspecified latency
- Personas; define user archetypes; forbid generic user assumptions
- Prioritization; rank systematically; forbid first-come ordering
- Problems; define user pain points; forbid solution-first thinking
- Protocols; specify communication standards; forbid proprietary interfaces
- Quality; define acceptance standards; forbid subjective quality gates
- Rationale; document decision reasoning; forbid unexplained choices
- Recovery; specify failure handling; forbid undefined disaster responses
- Requirements; structure hierarchically; forbid flat requirement lists
- Resilience; design for failure tolerance; forbid fragile systems
- Resources; identify capacity needs; forbid unplanned infrastructure
- Responsibility; assign feature ownership; forbid shared ownership ambiguity
- Reuse; leverage existing components; forbid reinvention
- Review; validate with stakeholders; forbid unvalidated assumptions
- Risk; assess potential issues; forbid risk-blind planning
- Scalability; specify growth requirements; forbid fixed-capacity designs
- Scenarios; provide usage examples; forbid example-free specifications
- Scope; define boundaries explicitly; forbid unbounded features
- Security; specify protection requirements; forbid security-as-afterthought
- Separation; maintain concern boundaries; forbid mixed responsibilities
- Sequencing; order feature delivery; forbid dependency-blind scheduling
- Services; define component boundaries; forbid service coupling
- Simplicity; prefer minimal solutions; forbid over-engineering
- Solutions; evaluate alternatives; forbid single-option analysis
- Stakeholders; identify affected parties; forbid stakeholder-blind design
- Stories; write user narratives; forbid technical task lists
- Structure; organize hierarchically; forbid disorganized documentation
- Success; define completion criteria; forbid ambiguous done states
- System; specify component interactions; forbid isolated component specs
- Tasks; decompose implementation work; forbid story-level implementation
- Technical; separate from product docs; forbid conflated specifications
- Testability; enable verification; forbid untestable requirements
- Timelines; define delivery schedules; forbid open-ended commitments
- Traceability; link requirements to implementation; forbid orphaned specs
- Trade-offs; document decision factors; forbid unexplored alternatives
- Transitions; plan state changes; forbid undefined state machines
- Uncertainty; acknowledge unknowns; forbid false certainty
- Updates; version document changes; forbid untracked modifications
- Usability; specify user experience requirements; forbid UX-free designs
- User; center on user needs; forbid technology-first requirements
- Validation; define acceptance tests; forbid subjective validation
- Value; justify feature investment; forbid value-free development
- Versioning; track document evolution; forbid unversioned changes
- Visibility; enable progress tracking; forbid opaque development
- Workflows; map user processes; forbid workflow-free features
- Why; explain feature rationale; forbid unexplained requirements

---

## Context—Intent—Directive Table

Each row is a universal, neutral, project-agnostic one-liner mantra: `Context | Intent | Directive`

| Context         | Intent                              | Directive                                                                                      |
|-----------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Acceptance      | Define verifiable criteria          | - [ ] Specify testable criteria; enable verification; forbid ambiguous requirements           |
| Accountability  | Assign clear ownership              | - [ ] Name responsible parties; assign ownership; forbid unassigned features                  |
| Adaptability    | Enable configuration-driven design  | - [ ] Design configurably; enable adaptation; forbid hardcoded solutions                      |
| Alignment       | Synchronize team understanding      | - [ ] Review with stakeholders; synchronize understanding; forbid siloed development          |
| Alternatives    | Document rejected options           | - [ ] Record considered options; document alternatives; forbid undocumented decisions         |
| Ambiguity       | Ensure specification clarity        | - [ ] Write precisely; ensure clarity; forbid vague requirements                              |
| API             | Specify integration contracts       | - [ ] Define API contracts; specify interfaces; forbid implicit interfaces                    |
| Approach        | Justify technical decisions         | - [ ] Explain technical choices; justify approach; forbid arbitrary choices                   |
| Architecture    | Design component interactions       | - [ ] Map component relationships; design interactions; forbid undocumented dependencies      |
| Assumptions     | Validate iteratively                | - [ ] Test assumptions early; validate iteratively; forbid untested assumptions               |
| Attributes      | Define quality requirements         | - [ ] Specify non-functional needs; define attributes; forbid unmeasured qualities            |
| Boundaries      | Define system scope                 | - [ ] Establish clear scope; define boundaries; forbid scope creep                            |
| Capacity        | Specify performance limits          | - [ ] Define load requirements; specify capacity; forbid unspecified scalability              |
| Changes         | Track requirement evolution         | - [ ] Version requirement changes; track evolution; forbid unversioned modifications          |
| Coherence       | Maintain document consistency       | - [ ] Ensure internal consistency; maintain coherence; forbid contradictory specifications    |
| Communication   | Enable stakeholder alignment        | - [ ] Facilitate collaboration; enable communication; forbid information silos                |
| Components      | Specify modular units               | - [ ] Define component boundaries; specify modules; forbid monolithic designs                 |
| Composition     | Enable system integration           | - [ ] Design for composability; enable integration; forbid tightly coupled modules            |
| Constraints     | Document limitations explicitly     | - [ ] State constraints clearly; document limitations; forbid implicit restrictions           |
| Context         | Provide user scenarios              | - [ ] Describe user context; provide scenarios; forbid feature-only descriptions              |
| Contracts       | Define interface agreements         | - [ ] Specify interface contracts; define agreements; forbid implicit assumptions             |
| Criteria        | Specify success metrics             | - [ ] Define measurable criteria; specify metrics; forbid subjective acceptance               |
| Data            | Specify flow and storage            | - [ ] Map data flows; specify storage; forbid undocumented persistence                        |
| Decisions       | Document rationale                  | - [ ] Record decision reasoning; document rationale; forbid unexplained choices               |
| Decomposition   | Break complex features              | - [ ] Decompose into stories; break complexity; forbid monolithic requirements                |
| Dependencies    | Map component relationships         | - [ ] Identify dependencies; map relationships; forbid undeclared coupling                    |
| Deployment      | Specify release strategies          | - [ ] Plan deployment approach; specify strategies; forbid ad-hoc deployments                 |
| Design          | Justify architectural patterns      | - [ ] Document design patterns; justify architecture; forbid pattern-free implementations     |
| Discovery       | Enable rapid learning               | - [ ] Iterate on understanding; enable discovery; forbid slow validation cycles               |
| Documentation   | Structure hierarchically            | - [ ] Organize systematically; structure hierarchy; forbid flat organization                  |
| Domain          | Maintain neutrality                 | - [ ] Design domain-agnostically; maintain neutrality; forbid domain-specific hardcoding      |
| Edge            | Specify boundary conditions         | - [ ] Define edge cases; specify boundaries; forbid untested limits                           |
| Enablers        | Identify technical prerequisites    | - [ ] List infrastructure needs; identify enablers; forbid missing infrastructure             |
| Epic            | Decompose into stories              | - [ ] Break into user stories; decompose epics; forbid oversized work items                   |
| Error           | Specify handling strategies         | - [ ] Define error responses; specify handling; forbid undefined error states                 |
| Evolution       | Version documents systematically    | - [ ] Apply semantic versioning; track evolution; forbid untracked changes                    |
| Examples        | Provide concrete scenarios          | - [ ] Include usage examples; provide scenarios; forbid abstract-only descriptions            |
| Failures        | Document failure modes              | - [ ] Analyze failure scenarios; document modes; forbid undocumented edge cases               |
| Features        | Prioritize systematically           | - [ ] Apply MoSCoW framework; prioritize features; forbid arbitrary ordering                  |
| Feedback        | Incorporate user insights           | - [ ] Gather user input; incorporate feedback; forbid assumption-only design                  |
| Goals           | Define measurable objectives        | - [ ] Set quantifiable goals; define objectives; forbid vague aspirations                     |
| Guidance        | Provide implementation direction    | - [ ] Offer architectural guidance; provide direction; forbid implementation-specific details |
| Hypotheses      | State testable assumptions          | - [ ] Formulate testable claims; state hypotheses; forbid untestable claims                   |
| Impact          | Assess user value                   | - [ ] Estimate value delivery; assess impact; forbid value-free features                      |
| Implementation  | Provide architectural guidance      | - [ ] Guide technical approach; provide guidance; forbid prescriptive code                    |
| Integration     | Specify connection points           | - [ ] Define integration interfaces; specify connections; forbid undocumented interfaces      |
| Interfaces      | Define contracts explicitly         | - [ ] Document API contracts; define interfaces; forbid implicit agreements                   |
| Iteration       | Refine incrementally                | - [ ] Update iteratively; refine continuously; forbid waterfall documentation                 |
| Journeys        | Map user workflows                  | - [ ] Chart user paths; map journeys; forbid feature-centric views                            |
| Justification   | Explain design decisions            | - [ ] Provide reasoning; explain decisions; forbid unjustified patterns                       |
| Jobs            | Define user tasks                   | - [ ] Specify jobs-to-be-done; define tasks; forbid solution-centric requirements             |
| Knowledge       | Capture domain insights             | - [ ] Document domain knowledge; capture insights; forbid undocumented context                |
| Limits          | Specify system boundaries           | - [ ] Define operational limits; specify boundaries; forbid unbounded requirements            |
| Maintainability | Design for evolution                | - [ ] Plan for change; design maintainably; forbid rigid architectures                        |
| Mapping         | Trace requirements to implementation| - [ ] Link specs to code; trace mapping; forbid orphaned requirements                         |
| Metrics         | Define success measures             | - [ ] Specify KPIs; define metrics; forbid unmeasured outcomes                                |
| Migration       | Plan transition strategies          | - [ ] Define migration paths; plan transitions; forbid breaking changes without migration     |
| Milestones      | Define delivery checkpoints         | - [ ] Set release milestones; define checkpoints; forbid undefined timelines                  |
| Modularity      | Design independent components       | - [ ] Enforce module boundaries; design modularly; forbid monolithic systems                  |
| Monitoring      | Specify observability needs         | - [ ] Define telemetry requirements; specify monitoring; forbid unmonitored systems           |
| MoSCoW          | Prioritize via framework            | - [ ] Apply Must/Should/Could/Won't; prioritize systematically; forbid unprioritized backlogs |
| Narratives      | Structure user-centric stories      | - [ ] Write from user perspective; structure narratives; forbid technical-only descriptions   |
| Neutrality      | Maintain domain independence        | - [ ] Design domain-neutral; maintain independence; forbid coupled designs                    |
| Non-functional  | Specify quality attributes          | - [ ] Define performance/security/usability; specify attributes; forbid functional-only reqs  |
| Objectives      | Align with business goals           | - [ ] Connect to strategy; align objectives; forbid misaligned features                       |
| Observability   | Enable system transparency          | - [ ] Design for monitoring; enable observability; forbid black-box implementations           |
| Outcomes        | Define measurable results           | - [ ] Specify outcome metrics; define results; forbid output-only metrics                     |
| Ownership       | Assign responsibility clearly       | - [ ] Name feature owners; assign responsibility; forbid ambiguous assignments                |
| Patterns        | Apply proven solutions              | - [ ] Use established patterns; apply solutions; forbid anti-patterns                         |
| Performance     | Specify response requirements       | - [ ] Define latency/throughput; specify performance; forbid unspecified latency              |
| Personas        | Define user archetypes              | - [ ] Create user personas; define archetypes; forbid generic user assumptions                |
| Prioritization  | Rank systematically                 | - [ ] Use value/effort matrix; rank systematically; forbid first-come ordering                |
| Problems        | Define user pain points             | - [ ] Identify user problems; define pain points; forbid solution-first thinking              |
| Protocols       | Specify communication standards     | - [ ] Define message formats; specify protocols; forbid proprietary interfaces                |
| Quality         | Define acceptance standards         | - [ ] Set quality thresholds; define standards; forbid subjective quality gates               |
| Rationale       | Document decision reasoning         | - [ ] Explain why decisions; document reasoning; forbid unexplained choices                   |
| Recovery        | Specify failure handling            | - [ ] Define disaster recovery; specify handling; forbid undefined disaster responses         |
| Requirements    | Structure hierarchically            | - [ ] Organize Epic→Story→Task; structure hierarchy; forbid flat requirement lists            |
| Resilience      | Design for failure tolerance        | - [ ] Plan for failures; design resiliently; forbid fragile systems                           |
| Resources       | Identify capacity needs             | - [ ] Estimate infrastructure; identify needs; forbid unplanned infrastructure                |
| Responsibility  | Assign feature ownership            | - [ ] Designate owners; assign responsibility; forbid shared ownership ambiguity              |
| Reuse           | Leverage existing components        | - [ ] Identify reusable parts; leverage existing; forbid reinvention                          |
| Review          | Validate with stakeholders          | - [ ] Conduct review sessions; validate assumptions; forbid unvalidated assumptions           |
| Risk            | Assess potential issues             | - [ ] Identify risks; assess impact; forbid risk-blind planning                               |
| Scalability     | Specify growth requirements         | - [ ] Define scale targets; specify growth; forbid fixed-capacity designs                     |
| Scenarios       | Provide usage examples              | - [ ] Write scenario walkthroughs; provide examples; forbid example-free specifications       |
| Scope           | Define boundaries explicitly        | - [ ] State what's included/excluded; define scope; forbid unbounded features                 |
| Security        | Specify protection requirements     | - [ ] Define security needs; specify requirements; forbid security-as-afterthought            |
| Separation      | Maintain concern boundaries         | - [ ] Keep PRD/TAD separate; maintain boundaries; forbid mixed responsibilities               |
| Sequencing      | Order feature delivery              | - [ ] Plan release sequence; order delivery; forbid dependency-blind scheduling               |
| Services        | Define component boundaries         | - [ ] Establish service boundaries; define components; forbid service coupling                |
| Simplicity      | Prefer minimal solutions            | - [ ] Choose simple approaches; prefer minimalism; forbid over-engineering                    |
| Solutions       | Evaluate alternatives               | - [ ] Compare options; evaluate alternatives; forbid single-option analysis                   |
| Stakeholders    | Identify affected parties           | - [ ] List stakeholders; identify parties; forbid stakeholder-blind design                    |
| Stories         | Write user narratives               | - [ ] Use "As a...I want...So that"; write narratives; forbid technical task lists            |
| Structure       | Organize hierarchically             | - [ ] Use consistent templates; organize systematically; forbid disorganized documentation    |
| Success         | Define completion criteria          | - [ ] Specify done conditions; define success; forbid ambiguous done states                   |
| System          | Specify component interactions      | - [ ] Document system architecture; specify interactions; forbid isolated component specs     |
| Tasks           | Decompose implementation work       | - [ ] Break stories into tasks; decompose work; forbid story-level implementation             |
| Technical       | Separate from product docs          | - [ ] Maintain TAD separately; separate concerns; forbid conflated specifications             |
| Testability     | Enable verification                 | - [ ] Design for testing; enable verification; forbid untestable requirements                 |
| Timelines       | Define delivery schedules           | - [ ] Set release dates; define timelines; forbid open-ended commitments                      |
| Traceability    | Link requirements to implementation | - [ ] Maintain requirement IDs; link specs; forbid orphaned specs                             |
| Trade-offs      | Document decision factors           | - [ ] Analyze pros/cons; document trade-offs; forbid unexplored alternatives                  |
| Transitions     | Plan state changes                  | - [ ] Define state machines; plan transitions; forbid undefined state machines                |
| Uncertainty     | Acknowledge unknowns                | - [ ] Flag assumptions; acknowledge uncertainty; forbid false certainty                       |
| Updates         | Version document changes            | - [ ] Track revisions; version updates; forbid untracked modifications                        |
| Usability       | Specify user experience requirements| - [ ] Define UX requirements; specify usability; forbid UX-free designs                       |
| User            | Center on user needs                | - [ ] Start with user problems; center on users; forbid technology-first requirements         |
| Validation      | Define acceptance tests             | - [ ] Specify test scenarios; define validation; forbid subjective validation                 |
| Value           | Justify feature investment          | - [ ] Estimate ROI; justify value; forbid value-free development                              |
| Versioning      | Track document evolution            | - [ ] Use semantic versioning; track changes; forbid unversioned changes                      |
| Visibility      | Enable progress tracking            | - [ ] Provide status updates; enable visibility; forbid opaque development                    |
| Workflows       | Map user processes                  | - [ ] Chart process flows; map workflows; forbid workflow-free features                       |
| Why             | Explain feature rationale           | - [ ] State problem/solution; explain rationale; forbid unexplained requirements              |

---

## Core Directives

### PRD Structure Directives

**Product managers structure PRDs with user-centric narratives**
- Managers define problem statements before solutions
- Managers write user stories in "As a...I want...So that" format
- Managers specify acceptance criteria using Given-When-Then patterns
- Managers prioritize features using MoSCoW framework
- Managers avoid technical implementation details

**PRD Template Pattern**:

```markdown
## Feature: [Name]

### Problem Statement
[User pain point or opportunity]

### User Stories
**As a** [persona]  
**I want** [capability]  
**So that** [benefit/value]

### Acceptance Criteria
**Given** [initial context]  
**When** [action occurs]  
**Then** [expected outcome]

### Success Metrics
- Metric: [name] | Baseline: [value] | Target: [value] | Timeline: [date]

### Out of Scope
[Explicitly excluded items]

### Dependencies
[Required features, services, or infrastructure]

### Open Questions
[Unresolved uncertainties requiring research]
```

---

### TAD Structure Directives

**Architects structure TADs with component-interaction models**
- Architects separate TAD from PRD documents
- Architects design domain-agnostic architectures
- Architects specify component interfaces via contracts
- Architects document architectural decisions with rationale
- Architects map quality attributes to design patterns

**TAD Template Pattern**:

```markdown
## Architecture: [System/Feature Name]

### Architecture Overview
**From [input] to [output]**: System → [component flow] → delivers [outcome]

### Component Specifications
**Component**: [Name]  
**Responsibility**: [Single responsibility in SVO format]  
**Interfaces**: [API contracts]  
**Dependencies**: [Required components/services]  
**Configuration**: [Externalized parameters]

### Integration Contracts
**Interface**: [Name]  
**Protocol**: [HTTP/gRPC/MCP/etc]  
**Data Format**: [JSON/Protobuf/etc]  
**Error Handling**: [Strategy]

### Architectural Decisions
**Decision**: [What was decided]  
**Rationale**: [Why this approach]  
**Alternatives Considered**: [Other options evaluated]  
**Trade-offs**: [Pros/cons analysis]

### Quality Attributes
- Performance: [Requirements]
- Scalability: [Requirements]
- Security: [Requirements]
- Observability: [Requirements]

### Deployment Strategy
[Blue-green, canary, rolling, etc]

### Migration Path
[For breaking changes or system transitions]
```

---

## PRD Best Practices Directives

### Problem-First Approach

**Product managers start with user problems**
- Managers identify user pain points before proposing solutions
- Managers validate problems through user research
- Managers quantify problem impact with metrics
- Managers avoid solution-first requirements

**From problem to feature**: Product Manager → identifies user pain point via research → validates problem significance with data → explores solution alternatives → selects approach optimizing value/effort → specifies requirements enabling implementation.

### User Story Decomposition

**Product managers decompose epics systematically**
- Managers break epics into implementable user stories
- Managers ensure stories are independently valuable
- Managers keep stories small enough for single sprint
- Managers maintain vertical slices delivering end-to-end value

**Epic Decomposition Pattern**:
```
Epic: [Large initiative]
├── Story 1: [Minimal valuable increment]
├── Story 2: [Next increment building on Story 1]
└── Story 3: [Further increment]
```

### Acceptance Criteria Precision

**Product managers write testable acceptance criteria**
- Managers use Given-When-Then format for clarity
- Managers specify observable outcomes, not implementation
- Managers include positive and negative test cases
- Managers ensure criteria are objectively verifiable

**Anti-Pattern Guard**:

❌ "System should be fast" → ✅ "Given 1000 concurrent users, When querying dashboard, Then p95 latency <500ms"  
❌ "User can upload files" → ✅ "Given user selects PDF <10MB, When upload completes, Then file appears in document list within 3s"

---

## TAD Best Practices Directives

### Component Boundary Definition

**Architects define clear component boundaries**
- Architects apply single-responsibility principle to components
- Architects specify component interfaces explicitly
- Architects minimize inter-component coupling
- Architects design for independent deployment

**Component Pattern**:

**From [input] to [output]**: Component → [processes data via method] → [delivers artifacts] for [downstream use].

### Architectural Decision Records

**Architects document decisions with ADR format**
- Architects record context driving decision
- Architects list alternatives considered
- Architects explain chosen solution rationale
- Architects acknowledge trade-offs accepted

**ADR Template**:
```markdown
## ADR-[Number]: [Decision Title]

**Status**: [Proposed | Accepted | Deprecated | Superseded]  
**Date**: [YYYY-MM-DD]  
**Deciders**: [Names/Roles]

### Context
[Problem requiring decision]

### Decision
[Chosen approach]

### Alternatives Considered
1. [Option 1]: [Pros/Cons]
2. [Option 2]: [Pros/Cons]

### Rationale
[Why this decision]

### Consequences
- **Positive**: [Benefits]
- **Negative**: [Costs/Risks]
- **Neutral**: [Other impacts]
```

### Quality Attribute Scenarios

**Architects specify quality requirements concretely**
- Architects use scenario format for non-functional requirements
- Architects make quality attributes measurable
- Architects link quality attributes to architectural patterns
- Architects validate quality attributes through testing

**Quality Attribute Scenario Pattern**:
```
**Attribute**: Performance  
**Scenario**: Under 5000 req/sec load, system responds <200ms for 95th percentile  
**Pattern**: Caching layer + load balancing  
**Validation**: Load testing at 1.5x expected peak
```

---

## Integration Between PRD and TAD Directives

### Requirement Traceability

**Teams maintain bidirectional traceability**
- Teams link PRD user stories to TAD components
- Teams reference PRD acceptance criteria in TAD test plans
- Teams update both documents when requirements evolve
- Teams use requirement IDs for cross-referencing

**Traceability Pattern**:
```
PRD-[Epic-ID]-[Story-ID] ↔ TAD-[Component-ID]-[Interface-ID]
```

### Separation of Concerns

**Teams maintain distinct PRD and TAD documents**
- PRDs describe WHAT and WHY (user value, business logic)
- TADs describe HOW (technical approach, architecture)
- Teams avoid implementation details in PRDs
- Teams avoid business logic in TADs

**Boundary Principle**: PRD stops at acceptance criteria; TAD starts at architectural approach.

### Iterative Refinement

**Teams refine documents collaboratively**
- Product managers draft initial PRD based on user research
- Architects review PRD for technical feasibility
- Architects draft TAD based on PRD requirements
- Product managers validate TAD maintains user value
- Teams iterate until both documents align

---

## Anti-Pattern Guards

**Teams avoid prohibited documentation patterns**:

❌ Solution-first PRDs, technical implementation in PRDs, vague acceptance criteria → ✅ Problem-first approach, business-focused PRDs, testable criteria  
❌ Missing architectural decisions, undocumented trade-offs, domain-coupled architectures → ✅ ADR documentation, explicit trade-off analysis, domain-agnostic designs  
❌ Orphaned requirements, conflicting PRD/TAD, unversioned documents → ✅ Requirement tracing, aligned specifications, version-controlled docs  
❌ Waterfall documentation, one-time PRDs, static architectures → ✅ Iterative refinement, living documents, evolvable designs

---

## Validation Checklist

**Pre-Implementation Validation**:
- [ ] Product managers confirm user stories follow "As a...I want...So that" format
- [ ] Product managers verify acceptance criteria use Given-When-Then pattern
- [ ] Product managers validate features prioritized via MoSCoW
- [ ] Architects confirm components have single responsibility
- [ ] Architects verify interfaces specified with contracts
- [ ] Architects validate architectural decisions documented with ADRs
- [ ] Teams ensure PRD-to-TAD traceability established
- [ ] Teams confirm no implementation details in PRD
- [ ] Teams verify no business logic in TAD

**Post-Documentation Review**:
- [ ] Stakeholders validate PRD addresses user problems
- [ ] Development team confirms TAD provides sufficient guidance
- [ ] QA team verifies acceptance criteria are testable
- [ ] Product managers check success metrics defined
- [ ] Architects validate quality attributes specified
- [ ] Teams confirm open questions resolved or tracked

---

## Role—Action—Outcome

**Role: Product Manager**  
→ Action: defines user problems, writes user stories, specifies acceptance criteria, prioritizes features, defines success metrics  
→ Outcome: produces user-centric PRDs enabling valuable feature delivery

**Role: System Architect**  
→ Action: designs component interactions, specifies interfaces, documents architectural decisions, defines quality attributes, plans deployment strategies  
→ Outcome: establishes technical foundation enabling scalable implementation

**Role: Technical Writer**  
→ Action: structures documents hierarchically, maintains templates, ensures consistency, tracks versions, manages traceability  
→ Outcome: maintains clear, accessible documentation supporting team alignment

**Role: UX Designer**  
→ Action: creates user personas, maps user journeys, validates user stories, defines usability requirements, provides design guidance  
→ Outcome: ensures user-centered design principles guide feature development

**Role: Engineering Lead**  
→ Action: reviews TAD feasibility, provides implementation estimates, validates architectural patterns, identifies technical risks, suggests alternatives  
→ Outcome: ensures technical approach is implementable and maintainable

**Role: QA Engineer**  
→ Action: validates testability of acceptance criteria, creates test plans from PRD, verifies quality attribute scenarios, defines test automation strategy  
→ Outcome: ensures requirements are verifiable and quality is measurable

**Role: Stakeholder**  
→ Action: provides business context, validates user problems, reviews requirements, approves scope, tracks progress  
→ Outcome: ensures product development aligns with business objectives

---

## Mantra Application

**"CID frames PRD/TAD standards, SRP isolates document concerns, RAO aligns team responsibilities, SVO clarifies requirement semantics"**

- **CID frames**: Establishes scope (product + technical documentation), purpose (user value + technical clarity), rules (problem-first + domain-agnostic + traceable)
- **SRP isolates**: Ensures PRD handles user requirements, TAD handles technical architecture, each document maintains focused purpose
- **RAO aligns**: Maps product managers, architects, technical writers, UX designers, engineering leads, QA engineers, stakeholders to their documentation deliverables
- **SVO clarifies**: Expresses all requirements (users accomplish tasks, systems process data, components deliver artifacts) with grammatical precision enabling clear implementation and preventing ambiguity