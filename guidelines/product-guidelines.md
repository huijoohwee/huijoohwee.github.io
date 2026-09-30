---
title: "Product Guidelines"
doc_type: "Guidelines"
version: "1.2.0"
date: "2026-09-30"
lang: "en-US"
frontmatter_contract: "required"
---

# Product Guidelines

## Context

**Product development**: experiment rapidly with rigorous validation to accelerate learning, deliver evidence‑based user value to ensure relevance, iterate leanly to maximize efficiency, test hypotheses to confirm assumptions, drive quality through feedback to strengthen outcomes, design prompts and interfaces to enhance usability, manage context to preserve coherence, and assure processes with humans in the loop to guarantee accountability.  

## Intent

**Product practices**: run validated-learning loops (owned by the [Lean Startup Guidelines](./lean-startup-guidelines.md)) to accelerate discovery, design user‑centric MVPs to ensure relevance, prioritize with RICE to maximize impact, version prompt engineering to preserve adaptability, construct evaluation pipelines to guarantee rigor, execute agile sprints with acceptance criteria to maintain accountability, test hypotheses to validate assumptions, and monitor metrics continuously to sustain quality.  

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
The [Lean Startup Guidelines](./lean-startup-guidelines.md) own hypotheses, experiment design, innovation accounting and
pivot-or-persevere decisions, placed on the [End-to-End Lifecycle Map](./prd-tad-adr-mvp-gtm-process-flows.md#end-to-end-lifecycle-map).
This module adds no second loop, hypothesis format or statistical rule.

**Reference implementation** defaults some teams pre-register — two-week iterations, a 0.05 significance level and a
minimum effect size of 10% — apply to an experiment only when registered as its threshold before the first
observation; none is universal, and a small sample stays inconclusive rather than failing or passing.

---

### Agile Practices Directives

#### Sprint Structure

**Teams execute sprint cadence**
- Teams declare sprint length, ETA and time/byte/module caps as an ADLC lean sprint; two weeks is a reference default
- Teams hold daily standups
- Teams conduct sprint planning/review/retro

**From backlog to production**: Product Owner -> prioritizes stories via RICE scoring -> team commits to sprint scope during planning -> developers implement with TDD in a scoped lane -> an independent check verifies acceptance criteria -> protected integration merges one exact candidate -> one exact revision deploys across the Deploy Boundary under an operator instruction -> production metrics are monitored. See the [ADLC Execution Seam](./prd-tad-adr-mvp-gtm-guidelines.md#adlc-execution-seam).

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
- Teams implement one critical user journey, its happy path plus the failure modes material to it
- Teams instrument key metrics
- Teams provide feedback collection mechanism
- Teams produce schema-compliant data models
- Teams configure behavior without hardcoding

**Teams avoid scope creep in MVPs**:
- Teams defer edge cases not material to the slice, while keeping each material failure mode — irreversible loss, duplicate effects, rejected authorization, broken recovery, an unusable core flow — with a prevention check and recovery action per the [Rapid MVP Sprint Profile](./adlc-rapid-prd-tad-adr-mvp-gtm-sprint.md)
- Teams skip polish/animations
- Teams defer multiple user roles
- Teams postpone scalability optimization
- Teams keep error states to those the material failure modes need

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

**Systems enforce quality gates** (reference implementation thresholds; each harness declares its own in the TAD per the [AI-native harness pattern](./prd-tad-adr-mvp-gtm-economics.md#ai-native-harness-pattern)):
- Groundedness score >0.9
- Citation accuracy 100%
- Context token budget <4k
- Response latency <2s

#### Human-in-the-Loop Workflows

**Systems require human approval for critical decisions** at the [ADLC human-in-the-loop gates](./adlc-guidelines.md#human-in-the-loop-gates)
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
-> Action: defines hypotheses, validates problem statements, prioritizes via RICE scoring, measures outcomes, proposes pivot or persevere for the recorded decision  
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
-> Action: measures success metrics against the pre-registered threshold, analyzes retention, reports on experiments, checks sample sizes against their stated minimum  
-> Outcome: supplies the evidence an independent Evaluator judges before the pivot-or-persevere decision

---

## Mantra Application

**"CID frames product practices, SRP isolates feature concerns, RAO aligns team accountabilities, SVO clarifies delivery semantics"**

- **CID frames**: Establishes scope (product development methodology), purpose (validated learning + user value), rules (validated-learning loops owned by the Lean Startup Guidelines + LLM quality gates)
- **SRP isolates**: Ensures each feature validates single hypothesis, each component handles focused capability
- **RAO aligns**: Maps product managers, owners, developers, QA, LLM engineers, researchers, analysts to their deliverables
- **SVO clarifies**: Expresses all operations (teams execute sprints, systems measure metrics, engineers version prompts) with grammatical precision for accountability