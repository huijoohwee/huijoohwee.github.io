# EDA-MLP Implementation Guidelines – CID

## Slogan‑style, three‑beat mantra form

- Each line is a three‑beat `Context; Intent; Directive` mantra

-[] Activation; enable isolated environments; forbid global package installation
-[] Aggregation; create group‑based features; forbid target‑leaking aggregations
-[] API; document code interfaces; forbid undocumented public APIs
-[] Architecture; visualize system components; forbid text‑only system descriptions
-[] Arguments; parse command‑line inputs; forbid hardcoded execution parameters
-[] Artifacts; save model outputs systematically; forbid losing trained model context
-[] Backoff; implement retry logic; forbid immediate retry storms
-[] Baseline; establish performance floor; forbid skipping baseline comparison
-[] Batch; handle multiple predictions; forbid single‑prediction‑only
-[] Binning; discretize numeric features; forbid arbitrary bin boundaries
-[] Bivariate; analyze feature relationships; forbid skipping target relationships
-[] Callbacks; monitor training progress; forbid unmonitored training
-[] Calibration; verify probability accuracy; forbid uncalibrated probability claims
-[] Categorical; encode non‑numeric features; forbid inappropriate encoding
-[] Checkpointing; save intermediate results; forbid losing progress on failure
-[] CLI; enable command‑line execution; forbid code‑editing‑required execution
-[] Clusters; identify natural groupings; forbid forcing clusters
-[] Code; extract from notebooks; forbid copy‑pasting notebook cells
-[] Comparison; evaluate multiple models; forbid single‑model‑only evaluation
-[] Complexity; limit query depth; forbid unconstrained complexity
-[] Compression; support compressed files; forbid manual decompression
-[] Configuration; externalize all parameters; forbid hardcoded parameters
-[] Confusion; visualize classification errors; forbid skipping confusion analysis
-[] Containers; package for deployment; forbid environment‑dependent deployment
-[] Correlation; measure feature associations; forbid Pearson‑only analysis
-[] Coverage; ensure test breadth; forbid minimal test coverage
-[] Cross‑validation; estimate robust performance; forbid single‑split only
-[] Dashboard; visualize quality metrics; forbid skipping visuals
-[] Data; load configuration‑driven; forbid hardcoded data paths
-[] Datasets; avoid specific assumptions; forbid dataset‑specific logic
-[] Debugging; provide troubleshooting guidance; forbid undocumented error patterns
-[] Decay; prevent overfitting; forbid always training to max iterations
-[] Decisions; record experimental rationale; forbid undocumented decision‑making
-[] Denormalization; optimize read‑heavy schemas; forbid normalized read‑heavy designs
-[] Dependencies; document required packages; forbid unpinned dependencies
-[] Deployment; package for production; forbid incomplete packages
-[] Detection; identify format automatically; forbid assuming single format
-[] Deterministic; ensure reproducible training; forbid non‑deterministic training
-[] Diagnostics; check model health; forbid deploying without diagnostics
-[] Directories; organize project structure; forbid flat structure
-[] Discretization; create categorical from numeric; forbid arbitrary discretization
-[] Distributions; analyze univariate patterns; forbid skipping distribution checks
-[] Docker; containerize application; forbid bloated container images
-[] Documentation; create comprehensive guides; forbid minimal docs
-[] Drift; monitor distribution changes; forbid ignoring data drift
-[] Duplicates; identify repeated records; forbid checking all‑columns‑only
-[] Early; stop training when plateaued; forbid always training to completion
-[] Encoding; transform categorical variables; forbid single‑strategy encoding
-[] Environment; isolate dependencies; forbid global installations
-[] Errors; analyze prediction failures; forbid ignoring misclassifications
-[] Evaluation; measure test performance; forbid repeated test set evaluation
-[] Examples; provide usage demonstrations; forbid example‑free docs
-[] Experiments; log all training runs; forbid losing experiment history
-[] Explain; interpret model predictions; forbid black‑box deployment
-[] Extraction; convert notebook to modules; forbid notebook‑only code
-[] Factory; build models from config; forbid manual instantiation
-[] Features; engineer predictive variables; forbid ad‑hoc creation
-[] Fetching; retrieve data systematically; forbid manual loading
-[] Files; organize project layout; forbid mixing code/data
-[] Fixtures; create reusable test data; forbid using production data for tests
-[] Format; handle multiple file types; forbid single‑format loaders
-[] Functions; build reusable components; forbid functions with side effects
-[] Git; version control codebase; forbid unversioned code
-[] Graceful; handle failures robustly; forbid uncaught pipeline failures
-[] Grouping; collapse rare categories; forbid features for every rare value
-[] Handoff; transfer knowledge systematically; forbid undocumented transfer
-[] Heatmap; visualize correlation matrix; forbid skipping visualization
-[] Hierarchy; organize directory structure; forbid flat directories
-[] Hyperparameters; tune model parameters; forbid default‑parameters‑only
-[] Hypotheses; test statistical relationships; forbid assuming without testing
-[] Idempotent; enable safe reruns; forbid non‑idempotent operations
-[] Imbalance; address class distribution; forbid ignoring class imbalance
-[] Importance; analyze feature contributions; forbid single‑method‑only
-[] Imputation; handle missing values; forbid single‑strategy imputation
-[] Incremental; update models efficiently; forbid always retraining from scratch
-[] Inference; enable batch prediction; forbid notebook‑required inference
-[] Inputs; validate before processing; forbid processing invalid data
-[] Installation; document setup process; forbid assuming setup is obvious
-[] Integration; test component interactions; forbid unit‑tests‑only
-[] Interactions; create feature combinations; forbid all‑possible combinations
-[] Interpretability; enable model explanation; forbid unexplainable models
-[] Inverse; enable reverse transformations; forbid losing ability to reverse
-[] JSON; structure configuration files; forbid inline configs
-[] Jupyter; configure notebook environment; forbid default‑only Jupyter
-[] Key; identify unique records; forbid assuming all‑columns key
-[] Leakage; prevent data contamination; forbid fitting preprocessing on test
-[] Limitations; document model weaknesses; forbid overstating capabilities
-[] Loading; build reusable data loader; forbid hardcoded loading logic
-[] Localization; support multiple languages; forbid hardcoded locale‑specific text
-[] Logging; track pipeline execution; forbid silent pipeline execution
-[] Markdown; document findings inline; forbid uncommented notebooks
-[] Metadata; save model context; forbid context‑free models
-[] Metrics; compute evaluation measures; forbid accuracy‑only
-[] Missing; track null values; forbid losing missing data context
-[] Models; train multiple algorithms; forbid single‑algorithm‑only
-[] Modules; organize into components; forbid single‑file code
-[] Monitoring; track production performance; forbid unmonitored deployment
-[] Multivariate; analyze complex interactions; forbid skipping multivariate analysis
-[] Normalization; scale features appropriately; forbid scaling without strategy
-[] Notebooks; structure exploration clearly; forbid unstructured notebooks
-[] Null; detect missing data; forbid silently ignoring missing data
-[] Optimization; tune hyperparameters; forbid default hyperparameters only
-[] Orchestration; coordinate pipeline stages; forbid manual coordination
-[] Outliers; identify extreme values; forbid removing without investigation
-[] Output; format predictions appropriately; forbid raw‑array‑only output
-[] Overfitting; prevent memorization; forbid no‑validation training
-[] Package; enable installation; forbid uninstallable code
-[] Pairs; visualize multi‑dimensional; forbid including all features
-[] Parameters; externalize configuration; forbid magic numbers
-[] Patterns; identify error characteristics; forbid random error inspection
-[] PCA; reduce dimensionality; forbid interpreting PCA as original features
-[] Performance; monitor model metrics; forbid assuming quality persists
-[] Permutation; calculate robust importance; forbid single‑method reliance
-[] Pipeline; assemble preprocessing stages; forbid incorrect order
-[] Plots; visualize data characteristics; forbid skipping visualization
-[] Polynomial; create interaction features; forbid high‑degree polynomials
-[] Precision; measure positive predictive value; forbid ignoring for imbalanced data
-[] Predictions; generate model outputs; forbid unpreprocessed prediction
-[] Preprocessing; transform raw data; forbid manual transformations
-[] Profiling; analyze data characteristics; forbid skipping profiling
-[] Project; structure directory layout; forbid ad‑hoc structure
-[] Provenance; track data sources; forbid losing data provenance
-[] Quality; validate data integrity; forbid skipping validation
-[] Ranges; validate numeric bounds; forbid unchecked outliers
-[] Rare; handle infrequent categories; forbid features for every rare category
-[] Recall; measure positive detection rate; forbid precision‑only focus
-[] Recovery; enable failure handling; forbid losing work on failure
-[] Reduction; simplify high dimensions; forbid plotting raw high‑D data
-[] Refactoring; modularize notebook code; forbid leaving code in notebooks
-[] Registry; catalog available models; forbid if‑elif model selection chains
-[] Relationships; analyze feature interactions; forbid modeling without understanding
-[] Reproducibility; ensure deterministic results; forbid non‑reproducible pipelines
-[] Requirements; document dependencies; forbid unpinned requirements
-[] Retrain; update with best parameters; forbid using CV model as final
-[] Reuse; build shareable components; forbid duplicating code
-[] ROC; visualize binary classification; forbid skipping for probabilistic models
-[] Samples; provide data examples; forbid abstract‑only descriptions
-[] Scaling; normalize feature ranges; forbid scaling categorical features
-[] Schema; define expected structure; forbid assuming schema
-[] Scripts; enable standalone execution; forbid notebook‑only workflows
-[] Seasonality; detect periodic patterns; forbid missing temporal patterns
-[] Seeds; control randomness; forbid non‑deterministic execution
-[] Segments; analyze subgroups; forbid assuming homogeneous population
-[] Selection; choose best model; forbid single‑metric selection
-[] Serialization; save trained artifacts; forbid losing trained objects
-[] Setup; initialize project environment; forbid ad‑hoc setup
-[] SHAP; explain individual predictions; forbid unexplained model outputs
-[] Slices; evaluate on subgroups; forbid aggregate‑metrics‑only
-[] Sources; document data origins; forbid undocumented data sources
-[] Splitting; separate train/test sets; forbid training on entire dataset
-[] Stacking; ensemble multiple models; forbid simple averaging only
-[] Statistics; calculate summary metrics; forbid mean‑only
-[] Stratification; preserve class distribution; forbid random‑only splitting
-[] Structure; organize project files; forbid flat file organization
-[] Subscriptions; enable real‑time updates; forbid polling‑only patterns
-[] Summary; document key findings; forbid jumping to modeling without summary
-[] Target; encode high‑cardinality; forbid onehot for high‑cardinality features
-[] Templates; standardize notebook structure; forbid ad‑hoc notebooks
-[] Temporal; analyze time‑based patterns; forbid treating as cross‑sectional
-[] Test; validate on held‑out data; forbid repeated test evaluation
-[] Testing; build comprehensive test suite; forbid deploying untested code
-[] Thresholds; optimize decision boundaries; forbid default‑threshold‑only
-[] Tokens; share lexing infrastructure; forbid redundant text processing
-[] Training; fit models systematically; forbid single‑run‑only training
-[] Transformation; apply mathematical functions; forbid transforming without checking
-[] Trends; identify directional changes; forbid assuming stationarity
-[] Troubleshooting; document common issues; forbid undocumented error handling
-[] Tuning; optimize hyperparameters; forbid default params only
-[] Types; specify data types; forbid untyped function signatures
-[] Uncertainty; analyze prediction confidence; forbid ignoring confidence
-[] Unit; test individual functions; forbid integration‑tests‑only
-[] Univariate; analyze individual features; forbid skipping univariate
-[] Unseen; handle new categories; forbid failing on new categories
-[] Utilities; build reusable helpers; forbid duplicating utility code
-[] Validation; check data quality; forbid skipping validation
-[] Values; check categorical levels; forbid allowing arbitrary values
-[] Variables; engineer predictive features; forbid ad‑hoc features
-[] Version; control code changes; forbid unversioned code
-[] Versioning; track model iterations; forbid overwriting models
-[] Virtual; isolate project dependencies; forbid global installations
-[] Visualization; create informative plots; forbid minimal visualization
-[] Walkthrough; demonstrate system usage; forbid docs‑only handoff
-[] Workflow; orchestrate pipeline stages; forbid manual stage execution
-[] YAML; structure configuration; forbid inline configuration dicts

---

## Context–Intent–Directive Table

- Each row is a universal, neutral, project‑agnostic one‑liner mantra: `Context | Intent | Directive`

| Context             | Intent                              | Directive                                                                                      |
|---------------------|-------------------------------------|------------------------------------------------------------------------------------------------|
| Activation          | Enable isolated environments        | - [ ] Activate virtual environment; enable isolation; forbid global package installation      |
| Aggregation         | Create group‑based features         | - [ ] Compute statistical aggregations; create features; forbid target‑leaking aggregations   |
| API                 | Document code interfaces            | - [ ] Generate API reference; document functions; forbid undocumented public APIs             |
| Architecture        | Visualize system components         | - [ ] Create architecture diagram; visualize flow; forbid text‑only system descriptions       |
| Arguments           | Parse command‑line inputs           | - [ ] Use argparse for CLI; enable configuration; forbid hardcoded execution parameters       |
| Artifacts           | Save model outputs systematically   | - [ ] Persist model/metadata/metrics; save artifacts; forbid losing trained model context     |
| Backoff             | Implement retry logic               | - [ ] Apply exponential backoff; handle failures; forbid immediate retry storms               |
| Baseline            | Establish performance floor         | - [ ] Train dummy/simple baseline; establish floor; forbid skipping baseline comparison       |
| Batch               | Handle multiple predictions         | - [ ] Accept DataFrame/list inputs; enable batch processing; forbid single‑prediction‑only    |
| Binning             | Discretize numeric features         | - [ ] Use quantile/custom bins; discretize features; forbid arbitrary bin boundaries          |
| Bivariate           | Analyze feature relationships       | - [ ] Compute correlations; analyze pairs; forbid skipping target relationships               |
| Callbacks           | Monitor training progress           | - [ ] Log metrics/checkpoint models; implement callbacks; forbid unmonitored training         |
| Calibration         | Verify probability accuracy         | - [ ] Check calibration curve; verify probabilities; forbid uncalibrated probability claims   |
| Categorical         | Encode non‑numeric features         | - [ ] Apply onehot/ordinal/target encoding; handle categories; forbid inappropriate encoding  |
| Checkpointing       | Save intermediate results           | - [ ] Persist after each stage; enable recovery; forbid losing progress on failure            |
| CLI                 | Enable command‑line execution       | - [ ] Build argparse interface; enable CLI; forbid code‑editing‑required execution            |
| Clusters            | Identify natural groupings          | - [ ] Apply K‑means/hierarchical clustering; identify groups; forbid forcing clusters         |
| Code                | Extract from notebooks              | - [ ] Refactor cells to functions; modularize code; forbid copy‑pasting notebook cells        |
| Comparison          | Evaluate multiple models            | - [ ] Train diverse algorithms; compare systematically; forbid single‑model‑only evaluation   |
| Complexity          | Limit query depth                   | - [ ] Constrain model complexity; prevent overfitting; forbid unconstrained complexity        |
| Compression         | Support compressed files            | - [ ] Handle gzip/zip/bz2; support compression; forbid manual decompression                   |
| Configuration       | Externalize all parameters          | - [ ] Use YAML/JSON configs; drive via config; forbid hardcoded parameters                    |
| Confusion           | Visualize classification errors     | - [ ] Generate confusion matrix; visualize errors; forbid skipping confusion analysis         |
| Containers          | Package for deployment              | - [ ] Build Docker image; containerize app; forbid environment‑dependent deployment           |
| Correlation         | Measure feature associations        | - [ ] Compute Pearson/Spearman/Cramér's V; measure correlation; forbid Pearson‑only analysis  |
| Coverage            | Ensure test breadth                 | - [ ] Achieve >70% test coverage; ensure breadth; forbid minimal test coverage                |
| Cross‑validation    | Estimate robust performance         | - [ ] Apply k‑fold CV with stratification; enable robust estimation; forbid single‑split only |
| Dashboard           | Visualize quality metrics           | - [ ] Create missing/distribution/correlation plots; visualize quality; forbid skipping visuals|
| Data                | Load configuration‑driven           | - [ ] Use config for paths/sources; drive via config; forbid hardcoded data paths             |
| Datasets            | Avoid specific assumptions          | - [ ] Design dataset‑agnostic pipelines; maintain neutrality; forbid dataset‑specific logic   |
| Debugging           | Provide troubleshooting guidance    | - [ ] Document common errors/solutions; enable debugging; forbid undocumented error patterns  |
| Decay               | Prevent overfitting                 | - [ ] Implement early stopping; prevent overfitting; forbid always training to max iterations |
| Decisions           | Record experimental rationale       | - [ ] Log model/param/metric choices; document decisions; forbid undocumented decision‑making |
| Denormalization     | Optimize read‑heavy schemas         | - [ ] Denormalize for read workloads; optimize queries; forbid normalized read‑heavy designs  |
| Dependencies        | Document required packages          | - [ ] Pin versions in requirements.txt; document deps; forbid unpinned dependencies           |
| Deployment          | Package for production              | - [ ] Include code/configs/requirements/docs; package completely; forbid incomplete packages  |
| Detection           | Identify format automatically       | - [ ] Auto‑detect CSV/Excel/Parquet/JSON; detect format; forbid assuming single format        |
| Deterministic       | Ensure reproducible training        | - [ ] Set random seeds; ensure reproducibility; forbid non‑deterministic training             |
| Diagnostics         | Check model health                  | - [ ] Verify calibration/bias/fairness; run diagnostics; forbid deploying without diagnostics |
| Directories         | Organize project structure          | - [ ] Separate data/notebooks/src/config/tests; organize hierarchy; forbid flat structure     |
| Discretization      | Create categorical from numeric     | - [ ] Apply quantile/custom binning; discretize appropriately; forbid arbitrary discretization|
| Distributions       | Analyze univariate patterns         | - [ ] Plot histograms/boxplots/density; analyze distributions; forbid skipping distribution checks|
| Docker              | Containerize application            | - [ ] Create multi‑stage Dockerfile; minimize image; forbid bloated container images          |
| Documentation       | Create comprehensive guides         | - [ ] Document setup/usage/API/troubleshooting; ensure completeness; forbid minimal docs      |
| Drift               | Monitor distribution changes        | - [ ] Compare production vs training distributions; detect drift; forbid ignoring data drift  |
| Duplicates          | Identify repeated records           | - [ ] Check duplicates on key columns; detect duplicates; forbid checking all‑columns‑only    |
| Early               | Stop training when plateaued        | - [ ] Monitor validation metric; stop early; forbid always training to completion             |
| Encoding            | Transform categorical variables     | - [ ] Support multiple encoding strategies; handle categories; forbid single‑strategy encoding|
| Environment         | Isolate dependencies                | - [ ] Create virtual environment; isolate packages; forbid global installations               |
| Errors              | Analyze prediction failures         | - [ ] Identify error patterns; analyze systematically; forbid ignoring misclassifications     |
| Evaluation          | Measure test performance            | - [ ] Compute metrics on held‑out test; evaluate once; forbid repeated test set evaluation    |
| Examples            | Provide usage demonstrations        | - [ ] Include training/inference/debug examples; demonstrate usage; forbid example‑free docs  |
| Experiments         | Log all training runs               | - [ ] Record date/model/params/metrics; log experiments; forbid losing experiment history     |
| Explain             | Interpret model predictions         | - [ ] Use SHAP/permutation/built‑in importance; explain predictions; forbid black‑box deployment|
| Extraction          | Convert notebook to modules         | - [ ] Refactor to functions/classes; extract systematically; forbid notebook‑only code        |
| Factory             | Build models from config            | - [ ] Create model from config dict; use factory pattern; forbid manual instantiation         |
| Features            | Engineer predictive variables       | - [ ] Create polynomial/log/binned/aggregated features; engineer systematically; forbid ad‑hoc creation|
| Fetching            | Retrieve data systematically        | - [ ] Load via configuration; fetch generically; forbid manual loading                        |
| Files               | Organize project layout             | - [ ] Follow standard DS structure; organize systematically; forbid mixing code/data          |
| Fixtures            | Create reusable test data           | - [ ] Build small sample datasets; create fixtures; forbid using production data for tests    |
| Format              | Handle multiple file types          | - [ ] Support CSV/Excel/Parquet/JSON; detect format; forbid single‑format loaders             |
| Functions           | Build reusable components           | - [ ] Create pure functions; ensure reusability; forbid functions with side effects           |
| Git                 | Version control codebase            | - [ ] Initialize repository; track changes; forbid unversioned code                           |
| Graceful            | Handle failures robustly            | - [ ] Try‑catch around stages; handle errors; forbid uncaught pipeline failures               |
| Grouping            | Collapse rare categories            | - [ ] Combine infrequent levels to "Other"; handle rare categories; forbid features for every rare value|
| Handoff             | Transfer knowledge systematically   | - [ ] Demo system/answer questions/share materials; enable handoff; forbid undocumented transfer|
| Heatmap             | Visualize correlation matrix        | - [ ] Create annotated correlation heatmap; visualize correlations; forbid skipping visualization|
| Hierarchy           | Organize directory structure        | - [ ] Create data/notebooks/src/config structure; establish hierarchy; forbid flat directories|
| Hyperparameters     | Tune model parameters               | - [ ] Apply grid/random/Bayesian search; tune systematically; forbid default‑parameters‑only  |
| Hypotheses          | Test statistical relationships      | - [ ] Apply Chi‑square/t‑test/ANOVA; test relationships; forbid assuming without testing      |
| Idempotent          | Enable safe reruns                  | - [ ] Design rerunnable pipeline; ensure idempotency; forbid non‑idempotent operations        |
| Imbalance           | Address class distribution          | - [ ] Check class distribution; use appropriate metrics; forbid ignoring class imbalance      |
| Importance          | Analyze feature contributions       | - [ ] Extract model/permutation/SHAP importance; analyze features; forbid single‑method‑only  |
| Imputation          | Handle missing values               | - [ ] Support mean/median/mode/constant/KNN; configure strategy; forbid single‑strategy imputation|
| Incremental         | Update models efficiently           | - [ ] Enable partial fit; support incremental updates; forbid always retraining from scratch  |
| Inference           | Enable batch prediction             | - [ ] Load model/preprocess/predict; handle batches; forbid notebook‑required inference       |
| Inputs              | Validate before processing          | - [ ] Check schema/dtypes/ranges; validate inputs; forbid processing invalid data             |
| Installation        | Document setup process              | - [ ] Provide step‑by‑step instructions; document setup; forbid assuming setup is obvious     |
| Integration         | Test component interactions         | - [ ] Test preprocessing pipeline/training workflow; verify integration; forbid unit‑tests‑only|
| Interactions        | Create feature combinations         | - [ ] Build multiplicative/polynomial features; create interactions; forbid all‑possible combinations|
| Interpretability    | Enable model explanation            | - [ ] Apply SHAP/feature importance/partial dependence; enable interpretation; forbid unexplainable models|
| Inverse             | Enable reverse transformations      | - [ ] Implement inverse_transform; enable reversal; forbid losing ability to reverse          |
| JSON                | Structure configuration files       | - [ ] Use JSON/YAML for configs; structure systematically; forbid inline configs              |
| Jupyter             | Configure notebook environment      | - [ ] Install extensions/set kernel; configure properly; forbid default‑only Jupyter          |
| Key                 | Identify unique records             | - [ ] Define key columns for deduplication; specify keys; forbid assuming all‑columns key     |
| Leakage             | Prevent data contamination          | - [ ] Fit on train only; prevent leakage; forbid fitting preprocessing on test                |
| Limitations         | Document model weaknesses           | - [ ] Record known issues/caveats; document limitations; forbid overstating capabilities      |
| Loading             | Build reusable data loader          | - [ ] Create config‑driven loader; enable reuse; forbid hardcoded loading logic               |
| Localization        | Support multiple languages          | - [ ] Externalize strings; support i18n; forbid hardcoded locale‑specific text               |
| Logging             | Track pipeline execution            | - [ ] Log stage start/end/metrics; enable tracking; forbid silent pipeline execution          |
| Markdown            | Document findings inline            | - [ ] Use markdown cells for observations; document inline; forbid uncommented notebooks      |
| Metadata            | Save model context                  | - [ ] Include type/features/performance/limitations; save metadata; forbid context‑free models|
| Metrics             | Compute evaluation measures         | - [ ] Calculate accuracy/precision/recall/F1/AUC; compute comprehensively; forbid accuracy‑only|
| Missing             | Track null values                   | - [ ] Create missing indicator flags; preserve information; forbid losing missing data context|
| Models              | Train multiple algorithms           | - [ ] Try diverse model types; compare systematically; forbid single‑algorithm‑only           |
| Modules             | Organize into components            | - [ ] Separate data/preprocessing/models/evaluation; organize systematically; forbid single‑file code|
| Monitoring          | Track production performance        | - [ ] Collect latency/drift/quality metrics; implement monitoring; forbid unmonitored deployment|
| Multivariate        | Analyze complex interactions        | - [ ] Apply PCA/clustering; analyze high‑dimensional; forbid skipping multivariate analysis   |
| Normalization       | Scale features appropriately        | - [ ] Apply standard/minmax/robust scaling; normalize systematically; forbid scaling without strategy|
| Notebooks           | Structure exploration clearly       | - [ ] Use template with Setup/Config/Load/EDA/Model/Results; structure systematically; forbid unstructured notebooks|
| Null                | Detect missing data                 | - [ ] Check null counts/percentages; identify missing; forbid silently ignoring missing data  |
| Optimization        | Tune hyperparameters                | - [ ] Search parameter space; optimize systematically; forbid default hyperparameters only    |
| Orchestration       | Coordinate pipeline stages          | - [ ] Connect Load→Validate→Preprocess→Train→Evaluate→Save; orchestrate systematically; forbid manual coordination|
| Outliers            | Identify extreme values             | - [ ] Use IQR/z‑score/visualization; detect outliers; forbid removing without investigation   |
| Output              | Format predictions appropriately    | - [ ] Return JSON/CSV/DataFrame as configured; format systematically; forbid raw‑array‑only output|
| Overfitting         | Prevent memorization                | - [ ] Use validation set/early stopping/regularization; prevent overfitting; forbid no‑validation training|
| Package             | Enable installation                 | - [ ] Create setup.py with metadata/deps; enable pip install; forbid uninstallable code       |
| Pairs               | Visualize multi‑dimensional         | - [ ] Create pairplots for key features; visualize relationships; forbid including all features|
| Parameters          | Externalize configuration           | - [ ] Use config files for all params; externalize systematically; forbid magic numbers       |
| Patterns            | Identify error characteristics      | - [ ] Group errors by features/confidence; find patterns; forbid random error inspection      |
| PCA                 | Reduce dimensionality               | - [ ] Apply for 2D/3D visualization; reduce dimensions; forbid interpreting PCA as original features|
| Performance         | Monitor model metrics               | - [ ] Track predictions/ground truth/metrics; monitor systematically; forbid assuming quality persists|
| Permutation         | Calculate robust importance         | - [ ] Shuffle features to measure impact; calculate permutation importance; forbid single‑method reliance|
| Pipeline            | Assemble preprocessing stages       | - [ ] Order Imputation→Engineering→Encoding→Scaling; sequence correctly; forbid incorrect order|
| Plots               | Visualize data characteristics      | - [ ] Create histograms/boxplots/heatmaps; visualize systematically; forbid skipping visualization|
| Polynomial          | Create interaction features         | - [ ] Generate degree‑2 interactions; create systematically; forbid high‑degree polynomials   |
| Precision           | Measure positive predictive value   | - [ ] Calculate correct positives / total predicted positive; measure precision; forbid ignoring for imbalanced data|
| Predictions         | Generate model outputs              | - [ ] Apply preprocessing→model.predict; generate systematically; forbid unpreprocessed prediction|
| Preprocessing       | Transform raw data                  | - [ ] Build reproducible pipeline; transform systematically; forbid manual transformations    |
| Profiling           | Analyze data characteristics        | - [ ] Generate describe/info/value_counts; profile comprehensively; forbid skipping profiling |
| Project             | Structure directory layout          | - [ ] Follow data/notebooks/src/config/tests/models/outputs; organize systematically; forbid ad‑hoc structure|
| Provenance          | Track data sources                  | - [ ] Record URLs/databases/methods; document sources; forbid losing data provenance          |
| Quality             | Validate data integrity             | - [ ] Check schema/nulls/duplicates/ranges; validate systematically; forbid skipping validation|
| Ranges              | Validate numeric bounds             | - [ ] Check min/max constraints; validate ranges; forbid unchecked outliers                   |
| Rare                | Handle infrequent categories        | - [ ] Group below min_frequency to "Other"; collapse rare; forbid features for every rare category|
| Recall              | Measure positive detection rate     | - [ ] Calculate correct positives / total actual positive; measure recall; forbid precision‑only focus|
| Recovery            | Enable failure handling             | - [ ] Save checkpoints; enable recovery; forbid losing work on failure                        |
| Reduction           | Simplify high dimensions            | - [ ] Apply PCA/t‑SNE for visualization; reduce dimensions; forbid plotting raw high‑D data   |
| Refactoring         | Modularize notebook code            | - [ ] Extract to functions/classes/modules; refactor systematically; forbid leaving code in notebooks|
| Registry            | Catalog available models            | - [ ] Map model names to classes; create registry; forbid if‑elif model selection chains      |
| Relationships       | Analyze feature interactions        | - [ ] Compute correlations/test relationships; analyze systematically; forbid modeling without understanding|
| Reproducibility     | Ensure deterministic results        | - [ ] Set random seeds; enable reproducibility; forbid non‑reproducible pipelines             |
| Requirements        | Document dependencies               | - [ ] Pin package versions; document systematically; forbid unpinned requirements             |
| Retrain             | Update with best parameters         | - [ ] Train on full training set with optimal params; retrain systematically; forbid using CV model as final|
| Reuse               | Build shareable components          | - [ ] Create utilities/config loaders/data loaders; enable reuse; forbid duplicating code     |
| ROC                 | Visualize binary classification     | - [ ] Plot ROC curve with AUC; visualize performance; forbid skipping for probabilistic models|
| Samples             | Provide data examples               | - [ ] Include 5‑10 representative rows; show examples; forbid abstract‑only descriptions      |
| Scaling             | Normalize feature ranges            | - [ ] Apply standard/minmax/robust; scale appropriately; forbid scaling categorical features  |
| Schema              | Define expected structure           | - [ ] Specify columns/dtypes/ranges; define schema; forbid assuming schema                    |
| Scripts             | Enable standalone execution         | - [ ] Create train.py/predict.py; enable CLI execution; forbid notebook‑only workflows        |
| Seasonality         | Detect periodic patterns            | - [ ] Apply seasonal decomposition/FFT; detect patterns; forbid missing temporal patterns     |
| Seeds               | Control randomness                  | - [ ] Set numpy/random/model seeds; control randomness; forbid non‑deterministic execution    |
| Segments            | Analyze subgroups                   | - [ ] Group by categoricals; analyze separately; forbid assuming homogeneous population       |
| Selection           | Choose best model                   | - [ ] Consider metrics/interpretability/speed; select systematically; forbid single‑metric selection|
| Serialization       | Save trained artifacts              | - [ ] Use joblib.dump for model/pipeline; persist systematically; forbid losing trained objects|
| Setup               | Initialize project environment      | - [ ] Create venv/install deps/init git; initialize systematically; forbid ad‑hoc setup       |
| SHAP                | Explain individual predictions      | - [ ] Compute SHAP values; explain predictions; forbid unexplained model outputs              |
| Slices              | Evaluate on subgroups               | - [ ] Check performance per segment; analyze slices; forbid aggregate‑metrics‑only            |
| Sources             | Document data origins               | - [ ] Record collection methods/URLs; document sources; forbid undocumented data sources      |
| Splitting           | Separate train/test sets            | - [ ] Hold out test set before analysis; split early; forbid training on entire dataset       |
| Stacking            | Ensemble multiple models            | - [ ] Combine predictions via meta‑learner; ensemble systematically; forbid simple averaging only|
| Statistics          | Calculate summary metrics           | - [ ] Compute mean/median/std/quartiles/skew; summarize comprehensively; forbid mean‑only     |
| Stratification      | Preserve class distribution         | - [ ] Stratify train/test splits; preserve distribution; forbid random‑only splitting         |
| Structure           | Organize project files              | - [ ] Separate concerns into directories; structure systematically; forbid flat file organization|
| Subscriptions       | Enable real‑time updates            | - [ ] Implement event streaming; enable real‑time; forbid polling‑only patterns               |
| Summary             | Document key findings               | - [ ] Record patterns/issues/recommendations; summarize systematically; forbid jumping to modeling without summary|
| Target              | Encode high‑cardinality             | - [ ] Use target encoding for high‑card categoricals; handle appropriately; forbid onehot for high‑card|
| Templates           | Standardize notebook structure      | - [ ] Define Setup/Config/Load/EDA/Model/Results sections; standardize systematically; forbid ad‑hoc notebooks|
| Temporal            | Analyze time‑based patterns         | - [ ] Plot time series/detect seasonality/trends; analyze temporal; forbid treating as cross‑sectional|
| Test                | Validate on held‑out data           | - [ ] Evaluate once on test set after tuning; validate systematically; forbid repeated test evaluation|
| Testing             | Build comprehensive test suite      | - [ ] Create unit/integration/pipeline tests; test systematically; forbid deploying untested code|
| Thresholds          | Optimize decision boundaries        | - [ ] Tune classification threshold; optimize systematically; forbid default‑threshold‑only   |
| Tokens              | Share lexing infrastructure         | - [ ] Reuse tokenizers/encoders; share components; forbid redundant text processing           |
| Training            | Fit models systematically           | - [ ] Apply cross‑validation/early stopping/callbacks; train robustly; forbid single‑run‑only training|
| Transformation      | Apply mathematical functions        | - [ ] Use log/sqrt/reciprocal for skewed; transform appropriately; forbid transforming without checking|
| Trends              | Identify directional changes        | - [ ] Plot moving averages/regression lines; detect trends; forbid assuming stationarity      |
| Troubleshooting     | Document common issues              | - [ ] Create FAQ with problems→solutions; enable debugging; forbid undocumented error handling|
| Tuning              | Optimize hyperparameters            | - [ ] Grid/random/Bayesian search with CV; tune systematically; forbid default params only    |
| Types               | Specify data types                  | - [ ] Use type hints for functions; specify types; forbid untyped function signatures         |
| Uncertainty         | Analyze prediction confidence       | - [ ] Examine predict_proba by correctness; analyze uncertainty; forbid ignoring confidence   |
| Unit                | Test individual functions           | - [ ] Test data loading/preprocessing/training separately; test components; forbid integration‑tests‑only|
| Univariate          | Analyze individual features         | - [ ] Plot distributions/calculate stats; analyze individually; forbid skipping univariate    |
| Unseen              | Handle new categories               | - [ ] Handle unknown categories gracefully; prevent failures; forbid failing on new categories|
| Utilities           | Build reusable helpers              | - [ ] Create config loaders/data loaders/logging; build utilities; forbid duplicating utility code|
| Validation          | Check data quality                  | - [ ] Verify schema/nulls/duplicates/ranges; validate systematically; forbid skipping validation|
| Values              | Check categorical levels            | - [ ] Verify against expected valid values; check systematically; forbid allowing arbitrary values|
| Variables           | Engineer predictive features        | - [ ] Create transformations/interactions/aggregations; engineer systematically; forbid ad‑hoc features|
| Version             | Control code changes                | - [ ] Use git for version control; track changes; forbid unversioned code                     |
| Versioning          | Track model iterations              | - [ ] Save with timestamps/version numbers; version systematically; forbid overwriting models |
| Virtual             | Isolate project dependencies        | - [ ] Create venv/conda environment; isolate systematically; forbid global installations      |
| Visualization       | Create informative plots            | - [ ] Build histograms/heatmaps/ROC/PR curves; visualize comprehensively; forbid minimal visualization|
| Walkthrough         | Demonstrate system usage            | - [ ] Record demo video; show workflows; forbid docs‑only handoff                             |
| Workflow            | Orchestrate pipeline stages         | - [ ] Coordinate Load→Preprocess→Train→Evaluate; orchestrate systematically; forbid manual stage execution|
| YAML                | Structure configuration             | - [ ] Use YAML for nested configs; structure systematically; forbid inline configuration dicts|