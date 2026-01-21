# Documentation Guidelines

## Overview

**Semantic orchestration documentation**: capture responsibilities to preserve clarity, forbid hardcoded domains to sustain neutrality, drive schemas through configuration to enable adaptability, separate structure from semantics to maintain coherence, build cross-domain pipelines to guarantee interoperability, and trace provenance with confidence to secure accountability.

**Team guidelines**: ensure clarity over datasets to prevent ambiguity, log parameters reproducibly to guarantee transparency, measure quality via metrics to uphold standards, maintain audit trails with schema evolution to strengthen resilience.

**Documentation standards**: layer flows with component specs to ensure structural clarity, align domain-agnostic schemas with CID annotations to preserve neutrality, trace provenance with confidence to secure accountability, apply metrics-based QA to uphold quality, safeguard against anti-patterns to prevent fragility, and optimize feedback loops with schema versioning to sustain resilience.

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

- Accountability; secure via provenance tracing; forbid untracked origins
- Adaptability; enable cross-domain deployment; forbid hardcoded domains
- Adjustment; document parameter tuning; forbid undocumented changes
- Aggregation; explain corpus-wide metrics; forbid unclear computation
- Algorithms; describe universal operations; forbid domain-specific methods
- Alignment; synchronize with CID annotations; forbid unmarked specifications
- Ambiguity; ensure clarity over datasets; forbid vague specifications
- Annotations; mark with intent-directive patterns; forbid unannotated schemas
- Anti-patterns; list forbidden violations; forbid undocumented bad practices
- API; explain query processing logic; forbid undocumented endpoints
- Architecture; define layer flow specifications; forbid undocumented structure
- Artifacts; specify output structures; forbid implicit outputs
- Atomic; express single operations; forbid compound actions
- Audit; document logging requirements; forbid unlogged decisions
- Automation; define docs:update workflows; forbid undocumented scripts
- Backward; maintain compatibility requirements; forbid breaking changes
- Bidirectional; specify node-to-source tracking; forbid unidirectional references
- Boundaries; avoid dataset coupling; forbid domain-specific examples
- Breaking; provide migration scripts; forbid unmitigated disruptions
- Capture; document responsibilities clearly; forbid ambiguous documentation
- Citation; document coverage metrics; forbid unmeasured traceability
- Classification; map intent to query types; forbid undocumented mappings
- Clarity; preserve structural understanding; forbid obscure architectures
- Clustering; describe grouping operations; forbid implicit algorithms
- Coherence; maintain structure-semantic separation; forbid coupled documentation
- Complexity; document scalability characteristics; forbid unanalyzed performance
- Components; provide intent-directive patterns; forbid incomplete specifications
- Computation; document metric calculation methods; forbid opaque calculations
- Confidence; track score propagation; forbid untracked certainty
- Configuration; document adaptive parameters; forbid hardcoded values
- Constraints; provide structural validation rules; forbid semantic validation in structure
- Context; explain vocabulary mapping; forbid implicit vocabularies
- Contracts; specify requirements; forbid implicit agreements
- Convergence; explain detection mechanisms; forbid undetected loops
- Coreference; document resolution tracking; forbid untracked references
- Corpus; require diversity validation; forbid single-domain validation
- Coverage; define neutral status matrices; forbid domain-specific indicators
- Criteria; provide format selection guidance; forbid arbitrary format choices
- Cross-document; measure unification reach; forbid isolated document processing
- Cypher; document Neo4j transformations; forbid undocumented exports
- Dataset; avoid coupling in examples; forbid hardcoded data references
- Decay; specify confidence reduction; forbid static confidence scores
- Decisions; log for reproducibility; forbid unlogged choices
- Defaults; derive from statistical principles; forbid project-tuned values
- Depth; explain traversal adjustment; forbid fixed traversal limits
- Directives; express as subject-verb-object; forbid compound statements
- Distance; document embedding similarity; forbid undocumented comparisons
- Diversity; validate across domains; forbid narrow testing
- Documentation; structure with transformation flows; forbid flat documentation
- Domain; test blindness systematically; forbid domain assumptions
- Downstream; specify integration use cases; forbid unclear targets
- DuckDB; document relational transformations; forbid undocumented exports
- Duplicates; track unification rates; forbid unmeasured merging
- Embedding; explain coherence computation; forbid implicit similarity
- Entities; measure coherence metrics; forbid unmeasured quality
- Evolution; document schema versioning; forbid unversioned changes
- Execution; enable reproducible pipelines; forbid unreproducible runs
- Export; document format transformations; forbid undocumented conversions
- Extraction; define quality measures; forbid unmeasured extraction
- Features; specify input requirements; forbid implicit dependencies
- Feedback; document monitoring procedures; forbid unmonitored systems
- Fields; distinguish required from optional; forbid ambiguous specifications
- Flow; define layer progression; forbid undocumented pipelines
- Follow-up; measure query relevance; forbid unmeasured interaction
- Forbidden; list hardcoding violations; forbid undocumented restrictions
- Formatting; preserve context via metadata; forbid context loss
- Fragility; safeguard via anti-pattern docs; forbid undocumented risks
- Gates; document quality thresholds; forbid unvalidated documentation
- Geo; document spatial metadata; forbid undocumented location fields
- Graphs; embed schema_version metadata; forbid unversioned graphs
- GraphML; document XML transformations; forbid undocumented exports
- Guidance; provide refactoring instructions; forbid unclear migration paths
- Hardcoding; forbid in documentation examples; forbid project-specific samples
- Heuristics; document without domain coupling; forbid domain-specific logic
- Impact; explain parameter effects; forbid unexplained parameters
- Implementers; enable domain adaptation; forbid implementation-specific docs
- Inference; document schema-based methods; forbid implicit inference logic
- Ingestion; document pipeline stages; forbid undocumented transformations
- Integration; document quality gate alignment; forbid isolated documentation
- Intent; provide classification mappings; forbid unmapped query types
- Interoperability; build cross-domain pipelines; forbid domain-locked documentation
- Intervals; specify collection frequencies; forbid unmeasured monitoring
- Iterations; log tuning history; forbid untracked adjustments
- JSON-LD; specify contract requirements; forbid implicit schemas
- Labels; document required fields; forbid undocumented node properties
- Latency; document query performance; forbid unmeasured query speed
- Layers; capture flow specifications; forbid undocumented architecture
- Linking; specify bidirectional mechanisms; forbid unidirectional tracking
- Logging; specify retention requirements; forbid unclear audit trails
- Lookup; map to single-node retrieval; forbid undocumented retrieval
- Magnitudes; document adjustment scales; forbid unbounded parameter changes
- Maintenance; document monitoring procedures; forbid undocumented operations
- Mappings; document field transformations; forbid implicit conversions
- Matrices; define stewardship columns; forbid individual-based assignments
- Measure; define extraction quality; forbid unmeasured extraction
- Mentions; track consistency metrics; forbid unmeasured resolution
- Merge; log decision rationale; forbid unexplained unifications
- Metadata; preserve formatting context; forbid context-stripped documentation
- Methods; label extraction techniques; forbid unlabeled extractions
- Metrics; define computation methods; forbid unmeasured quality
- Migration; provide breaking change scripts; forbid unmitigated breaking changes
- Monitoring; document feedback procedures; forbid unmonitored loops
- Multi-hop; track confidence through reasoning; forbid untracked inference chains
- Names; specify component identifiers; forbid ambiguous naming
- Neutral; express indicators domain-free; forbid project-specific symbols
- Neutrality; align schemas domain-agnostically; forbid domain assumptions
- Nodes; document source tracking; forbid untracked node origins
- Operations; list as atomic SVO statements; forbid compound actions
- Optimization; document A/B testing frameworks; forbid untested thresholds
- Orchestration; capture semantic architecture; forbid structural-only specs
- Outcomes; specify transformation deliverables; forbid unclear outputs
- Outputs; define schema structures; forbid implicit formats
- Parameters; document with impact descriptions; forbid unexplained settings
- Parsing; separate from metadata preservation; forbid conflated specifications
- Participation; track in coverage matrices; forbid unclear artifact generation
- Paths; document directed search strategies; forbid undocumented graph traversal
- Patterns; provide intent-directive templates; forbid ad-hoc documentation styles
- Performance; document optimization history; forbid untracked optimizations
- Precision; define extraction accuracy; forbid unmeasured correctness
- Preservation; explain metadata continuity; forbid metadata loss
- Privacy; address in audit documentation; forbid unaddressed sensitive data
- Procedures; document rollback strategies; forbid unclear failure handling
- Processing; explain query logic systematically; forbid opaque query handling
- Propagation; document confidence computation; forbid untracked score flow
- Properties; document optional field usage; forbid undocumented optional data
- Provenance; trace with confidence scores; forbid untracked lineage
- Quality; apply metrics-based standards; forbid unmeasured documentation quality
- Query; document interface specifications; forbid undocumented query patterns
- Ranges; document line preservation; forbid lost source locations
- Rates; document conflict resolution; forbid unmeasured conflict handling
- Recall; measure against gold standard; forbid unmeasured extraction coverage
- Refactoring; provide before/after examples; forbid unclear transformation steps
- Referential; check integrity constraints; forbid unchecked references
- Regeneration; document artifact automation; forbid manual artifact updates
- Relevance; measure answer quality; forbid unmeasured response accuracy
- Rendering; document pipeline stages; forbid undocumented visualization
- Reproducibility; log parameters systematically; forbid unreproducible documentation
- Requirements; document field necessity; forbid ambiguous mandatory fields
- Resilience; optimize feedback loops; forbid fragile monitoring
- Resolution; track conflict handling; forbid unresolved conflicts
- Responsibilities; capture component duties; forbid unclear component roles
- Results; provide query structure specs; forbid implicit query responses
- Retention; specify logging durations; forbid unclear audit lifecycles
- Retrieval; document traversal strategies; forbid undocumented graph queries
- Rollback; provide degradation procedures; forbid unclear failure responses
- Rules; provide structural validation; forbid semantic validation
- Scalability; document complexity characteristics; forbid unanalyzed performance limits
- Schema; version with semantic rules; forbid arbitrary schema changes
- Scores; document threshold tuning; forbid undocumented thresholds
- Scripts; provide for breaking changes; forbid manual schema migrations
- Search; map query types to strategies; forbid implicit query routing
- Selection; document format criteria; forbid arbitrary export choices
- Semantic; separate from structural docs; forbid conflated specifications
- Semantics; clarify via SVO specifications; forbid ambiguous technical writing
- Sensitivity; document tuning ranges; forbid unbounded parameter adjustments
- Separation; maintain structure-semantic divide; forbid coupled documentation
- Similarity; document computation methods; forbid undocumented distance functions
- Single; maintain operation atomicity; forbid compound directive statements
- Source; document node tracking mechanisms; forbid untracked node origins
- Specifications; provide component intent patterns; forbid incomplete technical specs
- Standards; layer flows with component specs; forbid ad-hoc documentation
- State; express input/output explicitly; forbid implicit transformations
- Statistical; derive defaults from principles; forbid arbitrary baseline values
- Status; define neutral coverage matrices; forbid project-specific coverage tracking
- Stewardship; name roles not individuals; forbid individual-based documentation ownership
- Structural; provide validation checklists; forbid semantic property checks
- Structure; define output artifact formats; forbid undocumented data shapes
- Subject-Verb-Object; express directives grammatically; forbid unclear operational statements
- SVO; structure component documentation; forbid non-grammatical specifications
- Syntactic; document path length metrics; forbid undocumented distance measures
- Systems; enable cross-domain adaptation; forbid domain-locked specifications
- Tables; use multi-column for coverage; forbid flat coverage documentation
- Techniques; label extraction methods; forbid unlabeled extraction approaches
- Templates; provide transformation patterns; forbid inconsistent documentation styles
- Testing; document domain blindness; forbid single-domain validation
- Thresholds; document tuning mechanisms; forbid hardcoded quality gates
- Traceability; enable via comprehensive docs; forbid incomplete provenance documentation
- Tracking; specify node-to-source mechanisms; forbid untracked data lineage
- Transformation; document using From-To patterns; forbid unclear state transitions
- Transparency; log parameters reproducibly; forbid opaque parameter documentation
- Transitive; apply confidence decay rules; forbid static multi-hop confidence
- Traversal; explain strategy selection; forbid undocumented graph navigation
- Triggers; specify feedback loop activation; forbid unclear quality thresholds
- Tuning; log iteration history; forbid untracked parameter changes
- Types; avoid domain-specific entities; forbid entity-specific documentation
- Unification; define quality measures; forbid unmeasured entity merging
- Universal; describe operations abstractly; forbid domain-coupled algorithms
- Validation; provide structural checklists; forbid semantic validation in schema
- Variance; measure entity coherence; forbid unmeasured entity quality
- Versioning; apply semantic rules to schemas; forbid arbitrary version changes
- Violations; list explicitly with guidance; forbid undocumented anti-patterns
- Vocabulary; explain @context mapping; forbid implicit semantic definitions
- Workflows; document docs:update automation; forbid undocumented generation processes

---

## Context—Intent—Directive Table

Each row is a universal, neutral, project-agnostic one-liner mantra: `Context | Intent | Directive`

| Context             | Intent                              | Directive                                                                                      |
|---------------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Accountability      | Secure via provenance tracing       | - [ ] Trace provenance with confidence; secure accountability; forbid untracked origins       |
| Adaptability        | Enable cross-domain deployment      | - [ ] Drive schemas via config; enable adaptability; forbid hardcoded domains                 |
| Adjustment          | Document parameter tuning           | - [ ] Specify adjustment magnitudes; document tuning; forbid undocumented changes             |
| Aggregation         | Explain corpus-wide metrics         | - [ ] Document aggregation methods; explain metrics; forbid unclear computation               |
| Algorithms          | Describe universal operations       | - [ ] Use universal patterns; describe algorithms; forbid domain-specific methods             |
| Alignment           | Synchronize with CID annotations    | - [ ] Align schemas with CID; synchronize annotations; forbid unmarked specifications         |
| Ambiguity           | Ensure clarity over datasets        | - [ ] Prevent ambiguity; ensure clarity; forbid vague specifications                          |
| Annotations         | Mark with intent-directive patterns | - [ ] Annotate with CID; mark specifications; forbid unannotated schemas                      |
| Anti-patterns       | List forbidden violations           | - [ ] Document prohibited patterns; list violations; forbid undocumented bad practices        |
| API                 | Explain query processing logic      | - [ ] Document API interfaces; explain processing; forbid undocumented endpoints              |
| Architecture        | Define layer flow specifications    | - [ ] Capture architecture flows; define layers; forbid undocumented structure                |
| Artifacts           | Specify output structures           | - [ ] Document output artifacts; specify structures; forbid implicit outputs                  |
| Atomic              | Express single operations           | - [ ] List atomic operations; express singly; forbid compound actions                         |
| Audit               | Document logging requirements       | - [ ] Specify audit trails; document logging; forbid unlogged decisions                       |
| Automation          | Define docs:update workflows        | - [ ] Document automation contracts; define workflows; forbid undocumented scripts            |
| Backward            | Maintain compatibility requirements | - [ ] Preserve backward compatibility; maintain stability; forbid breaking changes            |
| Bidirectional       | Specify node-to-source tracking     | - [ ] Document bidirectional links; specify tracking; forbid unidirectional references        |
| Boundaries          | Avoid dataset coupling              | - [ ] Maintain layer boundaries; avoid coupling; forbid domain-specific examples              |
| Breaking            | Provide migration scripts           | - [ ] Handle breaking changes; provide migrations; forbid unmitigated disruptions            |
| Capture             | Document responsibilities clearly   | - [ ] Capture responsibilities; preserve clarity; forbid ambiguous documentation              |
| Citation            | Document coverage metrics           | - [ ] Specify citation coverage; document metrics; forbid unmeasured traceability             |
| Classification      | Map intent to query types           | - [ ] Document intent classification; map query types; forbid undocumented mappings           |
| Clarity             | Preserve structural understanding   | - [ ] Layer flows with specs; ensure clarity; forbid obscure architectures                    |
| Clustering          | Describe grouping operations        | - [ ] Document clustering methods; describe operations; forbid implicit algorithms            |
| Coherence           | Maintain structure-semantic separation| - [ ] Separate structure from semantics; maintain coherence; forbid coupled documentation   |
| Complexity          | Document scalability characteristics| - [ ] Specify complexity; document scalability; forbid unanalyzed performance                 |
| Components          | Provide intent-directive patterns   | - [ ] Document component specs; provide patterns; forbid incomplete specifications            |
| Computation         | Document metric calculation methods | - [ ] Explain computation methods; document metrics; forbid opaque calculations               |
| Confidence          | Track score propagation             | - [ ] Document confidence propagation; track scores; forbid untracked certainty               |
| Configuration       | Document adaptive parameters        | - [ ] Specify configuration schemas; document parameters; forbid hardcoded values             |
| Constraints         | Provide structural validation rules | - [ ] Document constraints; provide rules; forbid semantic validation in structure            |
| Context             | Explain vocabulary mapping          | - [ ] Document @context usage; explain mapping; forbid implicit vocabularies                  |
| Contracts           | Specify JSON-LD requirements        | - [ ] Document schema contracts; specify requirements; forbid implicit agreements             |
| Convergence         | Explain detection mechanisms        | - [ ] Document convergence detection; explain mechanisms; forbid undetected loops             |
| Coreference         | Document resolution tracking        | - [ ] Specify coreference methods; document tracking; forbid untracked references             |
| Corpus              | Require diversity validation        | - [ ] Test across 3+ domains; require diversity; forbid single-domain validation              |
| Coverage            | Define neutral status matrices      | - [ ] Document coverage matrices; define neutrally; forbid domain-specific indicators         |
| Criteria            | Provide format selection guidance   | - [ ] Document selection criteria; provide guidance; forbid arbitrary format choices          |
| Cross-document      | Measure unification reach           | - [ ] Specify cross-document coverage; measure reach; forbid isolated document processing     |
| Cypher              | Document Neo4j transformations      | - [ ] Specify Cypher mappings; document transformations; forbid undocumented exports          |
| Dataset             | Avoid coupling in examples          | - [ ] Forbid dataset coupling; avoid specific examples; forbid hardcoded data references      |
| Decay               | Specify confidence reduction        | - [ ] Document confidence decay; specify reduction; forbid static confidence scores           |
| Decisions           | Log for reproducibility             | - [ ] Document merge decisions; log systematically; forbid unlogged choices                   |
| Defaults            | Derive from statistical principles  | - [ ] Provide statistical defaults; derive systematically; forbid project-tuned values        |
| Depth               | Explain traversal adjustment        | - [ ] Document adaptive depth; explain adjustment; forbid fixed traversal limits              |
| Directives          | Express as subject-verb-object      | - [ ] List SVO directives; express atomically; forbid compound statements                     |
| Distance            | Document embedding similarity       | - [ ] Specify distance metrics; document similarity; forbid undocumented comparisons          |
| Diversity           | Validate across domains             | - [ ] Require corpus diversity; validate broadly; forbid narrow testing                       |
| Documentation       | Structure with transformation flows | - [ ] Layer flows with specs; structure clearly; forbid flat documentation                    |
| Domain              | Test blindness systematically       | - [ ] Document domain blindness tests; validate neutrality; forbid domain assumptions         |
| Downstream          | Specify integration use cases       | - [ ] Document downstream usage; specify integration; forbid unclear targets                  |
| DuckDB              | Document relational transformations | - [ ] Specify DuckDB mappings; document transformations; forbid undocumented exports          |
| Duplicates          | Track unification rates             | - [ ] Document duplicate rates; track unification; forbid unmeasured merging                  |
| Embedding           | Explain coherence computation       | - [ ] Document embedding methods; explain coherence; forbid implicit similarity               |
| Entities            | Measure coherence metrics           | - [ ] Specify entity coherence; measure intra-cluster variance; forbid unmeasured quality     |
| Evolution           | Document schema versioning          | - [ ] Track schema evolution; document versioning; forbid unversioned changes                 |
| Execution           | Enable reproducible pipelines       | - [ ] Log execution parameters; enable reproducibility; forbid unreproducible runs            |
| Export              | Document format transformations     | - [ ] Specify export mappings; document transformations; forbid undocumented conversions      |
| Extraction          | Define quality measures             | - [ ] Document extraction metrics; define quality; forbid unmeasured extraction               |
| Features            | Specify input requirements          | - [ ] Document input features; specify requirements; forbid implicit dependencies             |
| Feedback            | Document monitoring procedures      | - [ ] Explain feedback loops; document monitoring; forbid unmonitored systems                 |
| Fields              | Distinguish required from optional  | - [ ] Document field requirements; distinguish types; forbid ambiguous specifications         |
| Flow                | Define layer progression            | - [ ] Specify layer flows; define progression; forbid undocumented pipelines                  |
| Follow-up           | Measure query relevance             | - [ ] Document follow-up relevance; measure quality; forbid unmeasured interaction            |
| Forbidden           | List hardcoding violations          | - [ ] Document forbidden patterns; list violations; forbid undocumented restrictions          |
| Formatting          | Preserve context via metadata       | - [ ] Document formatting preservation; maintain context; forbid context loss                 |
| Fragility           | Safeguard via anti-pattern docs     | - [ ] Document fragility prevention; safeguard quality; forbid undocumented risks             |
| Gates               | Document quality thresholds         | - [ ] Integrate with quality gates; document thresholds; forbid unvalidated documentation     |
| Geo                 | Document spatial metadata           | - [ ] Specify geo field usage; document spatial data; forbid undocumented location fields     |
| Graphs              | Embed schema_version metadata       | - [ ] Document version embedding; track schema versions; forbid unversioned graphs            |
| GraphML             | Document XML transformations        | - [ ] Specify GraphML mappings; document transformations; forbid undocumented exports         |
| Guidance            | Provide refactoring instructions    | - [ ] Document refactoring guidance; provide instructions; forbid unclear migration paths     |
| Hardcoding          | Forbid in documentation examples    | - [ ] Eliminate hardcoded examples; forbid domains; forbid project-specific samples           |
| Heuristics          | Document without domain coupling    | - [ ] Describe heuristics generically; document methods; forbid domain-specific logic         |
| Impact              | Explain parameter effects           | - [ ] Document impact descriptions; explain effects; forbid unexplained parameters            |
| Implementers        | Enable domain adaptation            | - [ ] Write for implementers; enable adaptation; forbid implementation-specific docs          |
| Inference           | Document schema-based methods       | - [ ] Specify inference methods; document schemas; forbid implicit inference logic            |
| Ingestion           | Document pipeline stages            | - [ ] Specify ingestion flows; document stages; forbid undocumented transformations           |
| Integration         | Document quality gate alignment     | - [ ] Align with quality gates; document integration; forbid isolated documentation           |
| Intent              | Provide classification mappings     | - [ ] Map intent to actions; provide classifications; forbid unmapped query types             |
| Interoperability    | Build cross-domain pipelines        | - [ ] Enable interoperability; build universally; forbid domain-locked documentation          |
| Intervals           | Specify collection frequencies      | - [ ] Document metric intervals; specify frequencies; forbid unmeasured monitoring            |
| Iterations          | Log tuning history                  | - [ ] Record tuning iterations; log systematically; forbid untracked adjustments              |
| JSON-LD             | Specify contract requirements       | - [ ] Document JSON-LD contracts; specify fields; forbid implicit schemas                     |
| Labels              | Document required fields            | - [ ] Specify label requirements; document fields; forbid undocumented node properties        |
| Latency             | Document query performance          | - [ ] Measure traversal efficiency; document latency; forbid unmeasured query speed           |
| Layers              | Capture flow specifications         | - [ ] Document layer flows; capture specs; forbid undocumented architecture                   |
| Linking             | Specify bidirectional mechanisms    | - [ ] Document linking mechanisms; specify bidirectional; forbid unidirectional tracking      |
| Logging             | Specify retention requirements      | - [ ] Document logging requirements; specify retention; forbid unclear audit trails           |
| Lookup              | Map to single-node retrieval        | - [ ] Document lookup strategies; map query types; forbid undocumented retrieval              |
| Magnitudes          | Document adjustment scales          | - [ ] Specify adjustment magnitudes; document scales; forbid unbounded parameter changes      |
| Maintenance         | Document monitoring procedures      | - [ ] Specify maintenance docs; document procedures; forbid undocumented operations           |
| Mappings            | Document field transformations      | - [ ] Specify field mappings; document transformations; forbid implicit conversions           |
| Matrices            | Define stewardship columns          | - [ ] Document coverage matrices; define roles; forbid individual-based assignments           |
| Measure             | Define extraction quality           | - [ ] Specify quality measures; define metrics; forbid unmeasured extraction                  |
| Mentions            | Track consistency metrics           | - [ ] Document mention consistency; track coreferences; forbid unmeasured resolution          |
| Merge               | Log decision rationale              | - [ ] Document merge decisions; log rationale; forbid unexplained unifications               |
| Metadata            | Preserve formatting context         | - [ ] Document metadata usage; preserve context; forbid context-stripped documentation        |
| Methods             | Label extraction techniques         | - [ ] Tag extraction methods; label techniques; forbid unlabeled extractions                  |
| Metrics             | Define computation methods          | - [ ] Document metrics-based QA; define methods; forbid unmeasured quality                    |
| Migration           | Provide breaking change scripts     | - [ ] Document migration scripts; provide transitions; forbid unmitigated breaking changes    |
| Monitoring          | Document feedback procedures        | - [ ] Specify monitoring procedures; document feedback; forbid unmonitored loops              |
| Multi-hop           | Track confidence through reasoning  | - [ ] Document multi-hop tracking; track confidence; forbid untracked inference chains        |
| Names               | Specify component identifiers       | - [ ] Document component names; specify identifiers; forbid ambiguous naming                  |
| Neutral             | Express indicators domain-free      | - [ ] Use neutral indicators; express domain-free; forbid project-specific symbols            |
| Neutrality          | Align schemas domain-agnostically   | - [ ] Preserve neutrality; align domain-free; forbid domain assumptions                       |
| Nodes               | Document source tracking            | - [ ] Specify node tracking; document sources; forbid untracked node origins                  |
| Operations          | List as atomic SVO statements       | - [ ] Express operations atomically; list via SVO; forbid compound actions                    |
| Optimization        | Document A/B testing frameworks     | - [ ] Specify threshold optimization; document A/B tests; forbid untested thresholds          |
| Orchestration       | Capture semantic architecture       | - [ ] Document orchestration; capture semantics; forbid structural-only specs                 |
| Outcomes            | Specify transformation deliverables | - [ ] Document outcomes; specify deliverables; forbid unclear outputs                         |
| Outputs             | Define schema structures            | - [ ] Specify output schemas; define structures; forbid implicit formats                      |
| Parameters          | Document with impact descriptions   | - [ ] Specify configuration params; document impact; forbid unexplained settings              |
| Parsing             | Separate from metadata preservation | - [ ] Document parsing separately; maintain metadata; forbid conflated specifications         |
| Participation       | Track in coverage matrices          | - [ ] Document participation; track coverage; forbid unclear artifact generation              |
| Paths               | Document directed search strategies | - [ ] Specify path search; document strategies; forbid undocumented graph traversal           |
| Patterns            | Provide intent-directive templates  | - [ ] Document patterns; provide templates; forbid ad-hoc documentation styles                |
| Performance         | Document optimization history       | - [ ] Log performance tuning; document history; forbid untracked optimizations                |
| Precision           | Define extraction accuracy          | - [ ] Specify precision metrics; define accuracy; forbid unmeasured correctness               |
| Preservation        | Explain metadata continuity         | - [ ] Document preservation methods; explain continuity; forbid metadata loss                 |
| Privacy             | Address in audit documentation      | - [ ] Explain privacy considerations; address concerns; forbid unaddressed sensitive data     |
| Procedures          | Document rollback strategies        | - [ ] Specify rollback procedures; document recovery; forbid unclear failure handling         |
| Processing          | Explain query logic systematically  | - [ ] Document processing logic; explain systematically; forbid opaque query handling         |
| Propagation         | Document confidence computation     | - [ ] Specify confidence propagation; document computation; forbid untracked score flow       |
| Properties          | Document optional field usage       | - [ ] Specify property fields; document usage; forbid undocumented optional data              |
| Provenance          | Trace with confidence scores        | - [ ] Document provenance tracing; track confidence; forbid untracked lineage                 |
| Quality             | Apply metrics-based standards       | - [ ] Document quality metrics; apply standards; forbid unmeasured documentation quality      |
| Query               | Document interface specifications   | - [ ] Specify query interfaces; document APIs; forbid undocumented query patterns             |
| Ranges              | Document line preservation          | - [ ] Specify line ranges; document preservation; forbid lost source locations                |
| Rates               | Document conflict resolution        | - [ ] Specify resolution rates; document conflicts; forbid unmeasured conflict handling       |
| Recall              | Measure against gold standard       | - [ ] Document recall metrics; measure completeness; forbid unmeasured extraction coverage    |
| Refactoring         | Provide before/after examples       | - [ ] Document refactoring guidance; provide examples; forbid unclear transformation steps    |
| Referential         | Check integrity constraints         | - [ ] Document referential integrity; check constraints; forbid unchecked references          |
| Regeneration        | Document artifact automation        | - [ ] Specify regeneration scripts; document automation; forbid manual artifact updates       |
| Relevance           | Measure answer quality              | - [ ] Document answer relevance; measure quality; forbid unmeasured response accuracy         |
| Rendering           | Document pipeline stages            | - [ ] Specify rendering flows; document stages; forbid undocumented visualization             |
| Reproducibility     | Log parameters systematically       | - [ ] Enable reproducibility; log parameters; forbid unreproducible documentation             |
| Requirements        | Document field necessity            | - [ ] Specify field requirements; document necessity; forbid ambiguous mandatory fields       |
| Resilience          | Optimize feedback loops             | - [ ] Sustain resilience; optimize loops; forbid fragile monitoring                           |
| Resolution          | Track conflict handling             | - [ ] Document conflict resolution; track decisions; forbid unresolved conflicts              |
| Responsibilities    | Capture component duties            | - [ ] Document responsibilities; capture duties; forbid unclear component roles               |
| Results             | Provide query structure specs       | - [ ] Document result structures; provide specs; forbid implicit query responses              |
| Retention           | Specify logging durations           | - [ ] Document retention periods; specify durations; forbid unclear audit lifecycles          |
| Retrieval           | Document traversal strategies       | - [ ] Specify retrieval strategies; document traversal; forbid undocumented graph queries     |
| Rollback            | Provide degradation procedures      | - [ ] Document rollback procedures; provide recovery; forbid unclear failure responses        |
| Rules               | Provide structural validation       | - [ ] Document validation rules; provide structural checks; forbid semantic validation        |
| Scalability         | Document complexity characteristics | - [ ] Specify scalability; document complexity; forbid unanalyzed performance limits          |
| Schema              | Version with semantic rules         | - [ ] Apply semantic versioning; version schemas; forbid arbitrary schema changes             |
| Scores              | Document threshold tuning           | - [ ] Specify confidence scores; document tuning; forbid undocumented thresholds              |
| Scripts             | Provide for breaking changes        | - [ ] Document migration scripts; provide transitions; forbid manual schema migrations        |
| Search              | Map query types to strategies       | - [ ] Document search mapping; specify strategies; forbid implicit query routing              |
| Selection           | Document format criteria            | - [ ] Provide selection criteria; document formats; forbid arbitrary export choices           |
| Semantic            | Separate from structural docs       | - [ ] Maintain semantic separation; document independently; forbid conflated specifications   |
| Semantics           | Clarify via SVO specifications      | - [ ] Clarify specification semantics; use SVO; forbid ambiguous technical writing            |
| Sensitivity         | Document tuning ranges              | - [ ] Specify sensitivity ranges; document tuning; forbid unbounded parameter adjustments     |
| Separation          | Maintain structure-semantic divide  | - [ ] Separate structure from semantics; maintain divide; forbid coupled documentation        |
| Similarity          | Document computation methods        | - [ ] Specify similarity metrics; document methods; forbid undocumented distance functions    |
| Single              | Maintain operation atomicity        | - [ ] List single operations; maintain atomicity; forbid compound directive statements        |
| Source              | Document node tracking mechanisms   | - [ ] Specify source tracking; document mechanisms; forbid untracked node origins             |
| Specifications      | Provide component intent patterns   | - [ ] Document component specs; provide patterns; forbid incomplete technical specs           |
| Standards           | Layer flows with component specs    | - [ ] Apply documentation standards; layer systematically; forbid ad-hoc documentation        |
| State               | Express input/output explicitly     | - [ ] Document state transitions; express explicitly; forbid implicit transformations         |
| Statistical         | Derive defaults from principles     | - [ ] Use statistical principles; derive defaults; forbid arbitrary baseline values           |
| Status              | Define neutral coverage matrices    | - [ ] Document status neutrally; define matrices; forbid project-specific coverage tracking   |
| Stewardship         | Name roles not individuals          | - [ ] Assign to roles; name stewards; forbid individual-based documentation ownership         |
| Structural          | Provide validation checklists       | - [ ] Document structural validation; provide checklists; forbid semantic property checks     |
| Structure           | Define output artifact formats      | - [ ] Specify structure; define formats; forbid undocumented data shapes                      |
| Subject-Verb-Object | Express directives grammatically    | - [ ] Use SVO directives; express grammatically; forbid unclear operational statements        |
| SVO                 | Structure component documentation   | - [ ] Apply SVO structure; document components; forbid non-grammatical specifications         |
| Syntactic           | Document path length metrics        | - [ ] Specify syntactic metrics; document paths; forbid undocumented distance measures        |
| Systems             | Enable cross-domain adaptation      | - [ ] Document systems neutrally; enable adaptation; forbid domain-locked specifications      |
| Tables              | Use multi-column for coverage       | - [ ] Structure as tables; use multi-column; forbid flat coverage documentation               |
| Techniques          | Label extraction methods            | - [ ] Document techniques; label methods; forbid unlabeled extraction approaches              |
| Templates           | Provide transformation patterns     | - [ ] Use documentation templates; provide patterns; forbid inconsistent documentation styles |
| Testing             | Document domain blindness           | - [ ] Specify testing requirements; document blindness; forbid single-domain validation       |
| Thresholds          | Document tuning mechanisms          | - [ ] Specify thresholds; document tuning; forbid hardcoded quality gates                     |
| Traceability        | Enable via comprehensive docs       | - [ ] Document traceability; enable tracking; forbid incomplete provenance documentation      |
| Tracking            | Specify node-to-source mechanisms   | - [ ] Document tracking mechanisms; specify methods; forbid untracked data lineage            |
| Transformation      | Document using From-To patterns     | - [ ] Express transformations; use From-To patterns; forbid unclear state transitions         |
| Transparency        | Log parameters reproducibly         | - [ ] Ensure transparency; log reproducibly; forbid opaque parameter documentation            |
| Transitive          | Apply confidence decay rules        | - [ ] Document transitive edges; apply decay; forbid static multi-hop confidence              |
| Traversal           | Explain strategy selection          | - [ ] Document traversal logic; explain selection; forbid undocumented graph navigation       |
| Triggers            | Specify feedback loop activation    | - [ ] Document reprocessing triggers; specify activation; forbid unclear quality thresholds   |
| Tuning              | Log iteration history               | - [ ] Document tuning iterations; log history; forbid untracked parameter changes             |
| Types               | Avoid domain-specific entities      | - [ ] Document types generically; avoid domains; forbid entity-specific documentation         |
| Unification         | Define quality measures             | - [ ] Document unification metrics; define measures; forbid unmeasured entity merging         |
| Universal           | Describe operations abstractly      | - [ ] Use universal operations; describe abstractly; forbid domain-coupled algorithms         |
| Validation          | Provide structural checklists       | - [ ] Document validation guidelines; provide checklists; forbid semantic validation in schema|
| Variance            | Measure entity coherence            | - [ ] Document intra-cluster variance; measure coherence; forbid unmeasured entity quality    |
| Versioning          | Apply semantic rules to schemas     | - [ ] Document schema versioning; apply semantic rules; forbid arbitrary version changes      |
| Violations          | List explicitly with guidance       | - [ ] Document violations; list explicitly; forbid undocumented anti-patterns                 |
| Vocabulary          | Explain @context mapping            | - [ ] Document vocabulary mapping; explain @context; forbid implicit semantic definitions     |
| Workflows           | Document docs:update automation     | - [ ] Specify workflow automation; document scripts; forbid undocumented generation processes |

---

## Core Directives

### From Principles to Practice

**Documentation captures semantic orchestration architecture**
- Documenters explain component responsibilities without hardcoded examples
- Documenters provide configuration schemas with intent-directive annotations
- Documentation enables implementers to adapt pipeline to any domain
- Documentation maintains separation between structure and semantics

---

## Required Documentation Sections Directives

### Architecture Overview

**Documenters define layer flow specifications**
- Documenters specify component names and single responsibilities
- Documenters document data structures flowing between layers
- Documenters avoid coupling to specific datasets or project names

**Layer Flow Pattern**: Detection → Schema Inference → Ingestion → Parsing → Orchestration → Rendering → Agentic RAG

### Component Specifications

**Documenters provide intent-directive patterns for each module**
- Pattern: **From [input state] to [output state]**: Component → actions → outcome
- Documenters list subject-verb-object directives
- Documenters define input/output schemas
- Documenters specify configuration parameters with key-value semantics (Default, Min, Max, Interval, impact description)
- Documenters document algorithm patterns without domain assumptions

### Configuration Reference

**Documenters document adaptive thresholds with impact explanations**
- Documenters specify tuning sensitivity ranges
- Documenters explain feedback loop triggers
- Documenters provide default values derived from statistical principles, not project-specific tuning
- Documenters enable reproducibility through parameter logging

### Validation Guidelines

**Documenters provide structural validation checklists**
- Documenters check required fields, referential integrity
- Documenters explicitly state non-validated semantic aspects
- Documenters include zero-hardcoding audit questions
- Documenters document domain-agnostic validation patterns

---

## Component Documentation Template Directives

**Documenters structure component documentation using transformation statements**

**From [input state] to [output state]**: Component name → detects/extracts/computes/merges/infers [specific actions using statistical or NLP methods] → [transformation steps] → delivers [output artifacts with provenance] for [downstream use case].

**Documenters list atomic operations as subject-verb-object directives**
- Documenters express operations (component verbs input_type, component computes metric_via_method, component validates constraint)
- Documenters avoid compound actions
- Documenters maintain single responsibility per directive

**Documenters define configuration schemas**
- Pattern: Parameter name → From [low state] to [high state]: Component → [action based on parameter] → [controls aspect] → [affects downstream quality dimension]. Default: value; Min: value; Max: value; Interval: step; [Impact description in 15 words].

**Documenters describe algorithm patterns**
- Documenters describe computation using universal operations (clustering, similarity computation, path finding)
- Documenters specify input features and output structures
- Documenters avoid referencing specific entity types or domains
- Documenters document complexity and scalability characteristics

---

## Provenance Documentation Standards Directives

### Bidirectional Linking

**Documenters specify node-to-source tracking mechanisms**
- Documenters explain how nodes track source documents via metadata.documentPath
- Documenters specify line range preservation (lineStart, lineEnd)
- Documenters define structure_type annotation (Paragraph, List, CodeBlock, Section, Table)
- Documenters clarify parsers extract semantics while metadata preserves formatting context

### Confidence Propagation

**Documenters document confidence score computation methods**
- Documenters explain threshold tuning mechanisms
- Documenters specify confidence decay for inferred relationships (transitive edges multiply parent confidences by 0.8)
- Documenters track confidence through multi-hop reasoning
- Methods include: syntactic path length, embedding coherence

### Extraction Method Tracking

**Documenters label nodes and edges with extraction methods**
- Documenters tag with extraction_method (dependency_parsing, pattern_mining, user_curated)
- Documentation enables quality analysis by method
- Documentation supports selective re-extraction when algorithms improve

---

## Quality Metrics Documentation Directives

### Extraction Metrics

**Metric definers define extraction quality measures**
- Definers specify precision (correct extractions / total extractions)
- Definers specify recall (correct extractions / gold standard)
- Definers specify entity coherence (1 - intra-cluster variance)
- Definers specify mention consistency (successful coreferences / total pronouns)
- Definers document computation methods
- Definers document feedback loop triggers

### Unification Metrics

**Metric definers define unification quality measures**
- Definers specify merge precision, duplicate rate, conflict resolution rate, cross-document coverage
- Definers explain aggregation across corpus
- Definers specify quality thresholds for reprocessing triggers

### Query Metrics

**Metric definers define query performance measures**
- Definers specify answer relevance, citation coverage, traversal efficiency, follow-up relevance
- Definers explain LLM-based evaluation where applicable
- Definers document A/B testing frameworks for threshold optimization

---

## Anti-Pattern Documentation Directives

### Forbidden Patterns

**Documenters explicitly list violations**
- Violations include: hardcoded project names, domain-specific entity types in code, static thresholds without configuration, validation of property semantics in schema
- Documenters provide refactoring guidance
- Documenters include before/after examples showing abstract feature replacement

### Testing Requirements

**Documenters document domain blindness tests**
- Test question: Can component process medical, legal, financial content without code changes?
- Documenters specify minimum corpus diversity for validation (3+ domains)
- Documenters require configuration-only adaptation demonstration

---

## Schema and API Documentation Directives

### JSON-LD Contract

**Schema documenters specify field requirements**
- Documenters document required fields (@id, labels, source, target)
- Documenters specify optional fields (properties, chunk_text, embedding, geo, metadata)
- Documenters explain @context usage and vocabulary mapping
- Documenters provide structural validation rules without semantic constraints

### Query Interface

**API documenters explain query processing logic**
- Documenters document intent classification mapping (FACTOID → single-node lookup, CAUSALITY → directed path search)
- Documenters specify traversal strategy selection logic
- Documenters explain adaptive depth adjustment algorithm
- Documenters provide query result structure with provenance

### Export Formats

**Format documenters specify transformation mappings**
- Documenters document transformation from internal GraphData to JSON-LD, DuckDB, Neo4j Cypher, GraphML
- Documenters specify field mappings
- Documenters explain metadata preservation across formats
- Documenters provide format selection criteria based on downstream tools

---

## Maintenance Documentation Directives

### Feedback Loop Monitoring

**Maintainers document monitoring procedures**
- Maintainers document metric collection intervals
- Maintainers specify parameter adjustment magnitudes
- Maintainers explain convergence detection
- Maintainers provide rollback procedures for degraded performance
- Maintainers log all tuning iterations for reproducibility

### Schema Evolution

**Schema stewards document versioning strategies**
- Stewards apply semantic versioning for schemas
- Stewards embed metadata.schema_version in graphs
- Stewards specify backward compatibility requirements (optional field additions allowed, required field additions forbidden)
- Stewards provide migration scripts for breaking changes

### Audit Trail Requirements

**Audit engineers document logging requirements**
- Engineers specify what to log (extraction parameters, confidence thresholds, entity merge decisions, conflict resolutions)
- Engineers specify retention periods
- Engineers explain privacy considerations for source document metadata
- Engineers enable reproducible pipeline execution from logs

---

## Automation Contracts for Documentation

**Automation maintainers document docs:update-style workflows**
- Maintainers describe scripts that regenerate documentation artifacts from source markdown (for example, EDA-to-ML pipelines) using SVO directives.
- Maintainers specify input locations (docs/documents paths), output locations (preview artifact directories), and triggering commands (for example, dev/build hooks).
- Maintainers ensure automation remains configuration-driven (no hardcoded domains) and aligns with documentation schemas.
- Maintainers record how automation integrates with quality gates (lint, typecheck, tests) so documentation updates are validated alongside code.

**Automation maintainers define neutral status matrices for documentation coverage**
- Maintainers use multi-column tables to distinguish participation in artifact generation (for example, docs:update), documentation linting/sanity checks (for example, doc:lint and doc:sanity), and tests/QA pipelines (for example, docs:qa or equivalent).
- Maintainers express coverage using neutral indicators (for example, `[x]` / `[ ]`) without referencing domain-specific projects or datasets.
- Maintainers add a stewardship column that names roles (for example, Technical Writer, Component Documenter, Schema Documenter, API Documenter) instead of individuals, aligning with Role—Action—Outcome patterns.
- Maintainers keep matrices configuration-driven so new documentation sources can be added by updating tables and automation configuration rather than embedding special-case logic.

---

## Documentation Validation Checklist

**Pre-Commit** (Required):
- [ ] Documenters verify zero hardcoded project/dataset names
- [ ] Documenters confirm all schemas include CID annotations
- [ ] Documenters validate SVO structure in directives
- [ ] Documenters check configuration parameters have impact descriptions
- [ ] Documenters ensure algorithm descriptions use universal operations

**Code Review** (Required):
- [ ] Reviewers audit for domain-specific examples
- [ ] Reviewers verify structure-semantic separation maintained
- [ ] Reviewers check provenance mechanisms documented
- [ ] Reviewers validate quality metrics defined with computation methods
- [ ] Reviewers confirm anti-patterns explicitly listed

**Post-Documentation** (Required):
- [ ] Maintainers verify domain blindness tests documented
- [ ] Maintainers confirm minimum 3+ domain validation specified
- [ ] Maintainers validate transformation patterns use From-To format
- [ ] Maintainers check all parameters logged for reproducibility

---

## Role—Action—Outcome

**Role: Technical Writer**  
→ Action: captures architecture flows, documents component specifications using SVO directives, creates configuration schemas, provides algorithm patterns without domain coupling  
→ Outcome: produces domain-agnostic documentation enabling cross-domain pipeline adaptation

**Role: Component Documenter**  
→ Action: writes intent-directive patterns, lists atomic operations, defines input/output schemas, specifies configuration parameters with impact descriptions  
→ Outcome: delivers focused component documentation maintaining single responsibility clarity

**Role: Provenance Documenter**  
→ Action: specifies bidirectional linking mechanisms, documents confidence propagation methods, labels extraction methods, explains metadata preservation  
→ Outcome: enables traceability through comprehensive provenance documentation

**Role: Metrics Definer**  
→ Action: defines extraction/unification/query metrics, documents computation methods, specifies quality thresholds, explains feedback triggers  
→ Outcome: establishes measurable quality standards enabling systematic improvement

**Role: Anti-Pattern Guardian**  
→ Action: lists forbidden patterns, provides refactoring guidance, documents domain blindness tests, requires corpus diversity validation  
→ Outcome: prevents hardcoding violations and ensures configuration-driven adaptability

**Role: Schema Documenter**  
→ Action: specifies JSON-LD contracts, documents required/optional fields, explains validation rules, provides structural constraints  
→ Outcome: establishes clear data contracts enabling integration and validation

**Role: API Documenter**  
→ Action: explains query interfaces, documents intent classifications, specifies traversal strategies, provides result structures  
→ Outcome: enables effective system usage through comprehensive API documentation

**Role: Format Documenter**  
→ Action: documents export transformations, specifies field mappings, explains metadata preservation, provides format selection criteria  
→ Outcome: facilitates downstream integration through multi-format export documentation

**Role: Maintenance Documenter**  
→ Action: documents feedback loops, explains monitoring procedures, specifies rollback strategies, logs tuning iterations  
→ Outcome: enables reliable system operation and reproducible performance optimization

**Role: Schema Steward**  
→ Action: manages versioning, maintains backward compatibility, provides migration scripts, tracks schema evolution  
→ Outcome: ensures stable schema transitions without breaking integrations

**Role: Audit Engineer**  
→ Action: specifies logging requirements, defines retention policies, addresses privacy concerns, enables reproducibility  
→ Outcome: maintains comprehensive audit trails supporting compliance and debugging

---

## Mantra Application

**"CID frames documentation standards, SRP isolates component concerns, RAO aligns documenter responsibilities, SVO clarifies specification semantics"**

- **CID frames**: Establishes scope (semantic orchestration documentation), purpose (domain-agnostic clarity + traceability), rules (SVO directives + configuration schemas)
- **SRP isolates**: Ensures each component documentation handles single transformation, each section addresses focused concern
- **RAO aligns**: Maps technical writers, component documenters, metrics definers, schema stewards, audit engineers to their documentation deliverables
- **SVO clarifies**: Expresses all operations (documenters specify schemas, systems track provenance, metrics measure quality) with grammatical precision enabling accountability and implementation clarity