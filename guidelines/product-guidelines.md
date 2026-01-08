# Product Guidelines

## Context

**Product development**: rapid experimentation + rigorous validation | evidence-based user value | lean iteration | hypothesis testing | feedback-driven quality | prompt/interface design | context management | human-in-the-loop assurance

## Intent

**Product practices**: Build–Measure–Learn cycles | user-centric MVPs | RICE prioritization | versioned prompt engineering | evaluation pipelines | agile sprints + acceptance criteria | hypothesis testing | continuous metric monitoring

## Directives

### Core Product Principles

**Teams make evidence-based decisions**
- Teams conduct user research before building
- Teams validate assumptions through experimentation
- Teams iterate based on continuous feedback
- Teams drive decisions through quantifiable metrics

**Teams deliver value-first increments**
- Teams build minimal viable features
- Teams add incremental complexity
- Teams measure outcomes quantifiably
- Teams validate learning systematically

**Designers create LLM-native product experiences**
- Designers engineer prompts as user experience layer
- Systems provide context-aware interactions
- Systems handle probabilistic outputs gracefully
- Workflows integrate human-in-the-loop validation

---

### Lean Startup Methodology Directives

#### Build-Measure-Learn Cycle

**From hypothesis to pivot/persevere**: Team -> defines falsifiable hypothesis via problem statement -> builds MVP with instrumentation -> deploys to target cohort using feature flags -> measures behavior through analytics pipeline -> analyzes results against success criteria -> decides pivot or persevere based on statistical significance.

**Teams minimize cycle time**
- Teams complete iterations in <2 weeks
- Teams minimize time to validated learning

#### Hypothesis Framework

**Product managers structure hypotheses with testable predictions**:
```yaml
hypothesis: "Users will [behavior] when [condition]"
success_metric: [quantifiable_kpi]
baseline: [current_value]
target: [minimum_viable_improvement]
sample_size: [statistical_power_calculation]
duration: [test_timeframe]
```

**Analysts validate hypotheses through statistical tests**
- Analysts require p-value <0.05
- Analysts confirm effect size >10%
- Analysts conduct retention analysis

---

### Agile Practices Directives

#### Sprint Structure

**Teams execute sprint cadence**
- Teams run 2-week sprints
- Teams hold daily standups
- Teams conduct sprint planning/review/retro

**From backlog to production**: Product Owner -> prioritizes stories via RICE scoring -> team commits to sprint scope during planning -> developers implement with TDD -> QA validates against acceptance criteria -> deploy via CI/CD pipeline -> monitor production metrics.

**Product owners write user stories**
- Format: "As [user_type], I want [capability] so that [benefit]"

**Developers define acceptance criteria**:
- Given [precondition]
- When [action]
- Then [expected_outcome]

---

### MVP Standards Directives

#### Definition

**Product managers define Minimum Viable Products**
- Managers identify smallest feature set validating core hypothesis
- Managers ensure MVP delivers measurable user value
- Managers enable learning with minimal investment

**Teams include required MVP components**:
- Teams implement one critical user journey (happy path only)
- Teams instrument key metrics
- Teams provide feedback collection mechanism
- Teams produce schema-compliant data models
- Teams configure behavior without hardcoding

**Teams avoid scope creep in MVPs**:
- Teams exclude edge case handling
- Teams skip polish/animations
- Teams defer multiple user roles
- Teams postpone scalability optimization
- Teams minimize comprehensive error states

#### Feature Prioritization (RICE)

**Product owners calculate RICE scores**
- Formula: Score = (Reach × Impact × Confidence) / Effort

**Product owners evaluate components**:
- **Reach**: Users affected per period
- **Impact**: Value per user (0.25=minimal, 3=massive)
- **Confidence**: Certainty % (100%=high, 50%=low)
- **Effort**: Person-months

---

### LLM Ops Practices Directives

#### Prompt Engineering as Product

**Engineers version control prompts**
- Engineers store prompt templates in Git
- Engineers A/B test variations
- Engineers maintain rollback capability

**Systems execute evaluation pipelines**:
```
[Prompt v1] → [Model] → [Output] → [Eval Metrics] → [Human Review]
     ↓                                        ↓
[Prompt v2] → [Optimize] → [Compare] → [Threshold Gate]
```

**Systems measure LLM quality metrics**
- Systems track task success rate
- Systems assess output coherence
- Systems monitor hallucination frequency
- Systems measure latency p99
- Systems calculate cost per request

#### Context Management

**Pattern**: RAG (Retrieval-Augmented Generation) -> retrieves relevant context via embeddings -> ranks by relevance using reranker -> constructs prompt with top-k chunks -> generates response with citations -> validates against source material.

**Systems enforce quality gates**:
- Groundedness score >0.9
- Citation accuracy 100%
- Context token budget <4k
- Response latency <2s

#### Human-in-the-Loop Workflows

**Systems require human approval for critical decisions**
- Systems pause before execution
- Systems log provenance for audit

**Systems collect user feedback**
- Systems provide thumbs up/down interface
- Systems enable correction interface
- Systems flag edge cases

---

### Anti-Pattern Guards

**Teams avoid prohibited product patterns**:

❌ Building without validated problem statement -> ✅ Hypothesis-driven development  
❌ Feature bloat in MVP -> ✅ Minimal viable scope  
❌ Vanity metrics over actionable KPIs -> ✅ Outcome-based metrics  
❌ Skipping user research -> ✅ Evidence-based decisions  
❌ Deploying LLMs without evaluation framework -> ✅ Instrumented quality gates  
❌ Ignoring prompt injection vulnerabilities -> ✅ Security validation  

---

### Product Validation Checklist Directives

**Teams execute pre-launch validation**:
- [ ] Product managers document hypothesis with success criteria
- [ ] Product managers verify MVP scope meets minimality test
- [ ] Product owners ensure user stories have acceptance criteria
- [ ] Engineers activate analytics instrumentation
- [ ] LLM engineers confirm eval pipeline operational
- [ ] DevOps defines rollback strategy

**Teams execute continuous post-launch monitoring**:
- [ ] Managers review OKRs weekly
- [ ] Teams run retrospectives each sprint
- [ ] Engineers monitor LLM quality metrics daily
- [ ] Researchers collect user feedback systematically

---

## Role—Action—Outcome

**Role: Product Manager**  
-> Action: defines hypotheses, validates problem statements, prioritizes via RICE scoring, measures outcomes, decides pivot/persevere  
-> Outcome: delivers validated learning enabling data-driven product evolution

**Role: Product Owner**  
-> Action: writes user stories, maintains backlog, defines acceptance criteria, commits to sprint scope, reviews deliverables  
-> Outcome: ensures development aligns with user value and business goals

**Role: Developer**  
-> Action: implements user stories with TDD, builds MVP features, instruments analytics, integrates CI/CD pipelines, responds to metrics  
-> Outcome: produces testable, measurable product increments enabling rapid iteration

**Role: QA Engineer**  
-> Action: validates against acceptance criteria, executes test plans, verifies instrumentation, confirms rollback procedures, monitors production  
-> Outcome: ensures product quality and reliability before user exposure

**Role: LLM Operations Engineer**  
-> Action: versions prompts, builds evaluation pipelines, manages context, measures quality metrics, optimizes latency/cost  
-> Outcome: maintains LLM quality through systematic experimentation and monitoring

**Role: User Researcher**  
-> Action: conducts user studies, collects feedback, analyzes behavior patterns, validates hypotheses, identifies edge cases  
-> Outcome: provides evidence grounding product decisions and hypothesis refinement

**Role: Data Analyst**  
-> Action: measures success metrics, calculates statistical significance, analyzes retention, reports on experiments, validates sample sizes  
-> Outcome: determines experiment validity enabling confident pivot/persevere decisions

---

## Mantra Application

**"CID frames product practices, SRP isolates feature concerns, RAO aligns team accountabilities, SVO clarifies delivery semantics"**

- **CID frames**: Establishes scope (product development methodology), purpose (validated learning + user value), rules (lean cycles + LLM quality gates)
- **SRP isolates**: Ensures each feature validates single hypothesis, each component handles focused capability
- **RAO aligns**: Maps product managers, owners, developers, QA, LLM engineers, researchers, analysts to their deliverables
- **SVO clarifies**: Expresses all operations (teams execute sprints, systems measure metrics, engineers version prompts) with grammatical precision for accountability