# EDA-MLP Implementation Guidelines
## Exploratory Data Analysis to Machine Learning Pipeline
- **Meta-Framework**: CID (Context—Intent—Directive) + SRP (Single Responsibility) + RAO (Role—Action—Outcome) + SVO (Subject—Verb—Object)
- **Purpose**: Configuration-driven, neutral, production-ready ML pipeline development using structured guidelines
- **Format**: CID-organized phases with hierarchical tasks, RAO accountability chains, and SVO operational clarity

---

## Overview: CID Framework for ML Development

### Context
- **Machine Learning Pipeline Development**: Transform exploratory analysis into production-ready systems while maintaining reproducibility, neutrality, and configurability across all stages from data loading through deployment.

### Intent
- **Production-Ready ML Systems**: Ensure systematic development that prevents common anti-patterns (data leakage, hardcoding, poor documentation), maintains clear separation of concerns, and enables team collaboration through configuration-driven design.

### Directives (Core Principles)

**Configuration Management**
- [ ] Externalize parameters; enable customization; forbid hardcoded values
- [ ] Version configurations; track changes; forbid undocumented parameter modifications
- [ ] Validate configs at load; catch errors early; forbid silent configuration failures

**Data Handling**
- [ ] Separate train/test; prevent leakage; forbid fitting on test data
- [ ] Validate schemas; enforce quality; forbid processing invalid data
- [ ] Document provenance; track sources; forbid unknown data origins

**Code Organization**
- [ ] Extract from notebooks; create modules; forbid production notebooks
- [ ] Apply SRP; isolate concerns; forbid multi-purpose modules
- [ ] Test comprehensively; verify behavior; forbid untested production code

**Model Development**
- [ ] Establish baselines; enable comparison; forbid skipping baseline models
- [ ] Tune systematically; optimize performance; forbid default-only hyperparameters
- [ ] Evaluate on holdout; measure generalization; forbid test set peeking

**Documentation**
- [ ] Document decisions; preserve rationale; forbid undocumented choices
- [ ] Create handoff materials; enable transfer; forbid knowledge silos
- [ ] Maintain experiment logs; track history; forbid lost experiments

---

## Role—Action—Outcome Chains

### Role: Data Engineer
-**Actions**:
  - Designs data loading pipelines from configuration specifications
  - Implements schema validation and quality checks
  - Creates data profiling and monitoring systems
  - Builds reproducible data transformation workflows

- **Outcomes**:
  - Configuration-driven data loaders supporting multiple formats
  - Validated datasets with documented quality metrics
  - Reusable data utilities preventing duplicate loading logic
  - Production-ready data pipelines with error handling

### Role: ML Engineer
- **Actions**:
  - Extracts reusable code from exploratory notebooks
  - Builds modular preprocessing and feature engineering pipelines
  - Implements training workflows with configuration-driven model selection
  - Creates inference scripts and deployment packages

- **Outcomes**:
  - Clean separation between exploration and production code
  - Serialized preprocessing pipelines ensuring consistency
  - Reproducible training scripts with version control
  - Testable, deployable ML services

### Role: Data Scientist
- **Actions**:
  - Conducts systematic exploratory data analysis
  - Documents insights and preprocessing requirements
  - Experiments with features and model architectures
  - Evaluates models and analyzes performance

- **Outcomes**:
  - Documented data characteristics and patterns
  - Evidence-based feature engineering recommendations
  - Comparative model evaluation with metrics
  - Comprehensive error analysis and model diagnostics

### Role: MLOps Engineer
- **Actions**:
  - Implements monitoring and observability systems
  - Creates automated testing and validation frameworks
  - Builds deployment pipelines and infrastructure
  - Establishes model lifecycle management processes

- **Outcomes**:
  - Production monitoring with drift detection
  - Automated test suites ensuring quality
  - Containerized deployments with CI/CD
  - Model versioning and rollback capabilities

### Role: Project Lead
- **Actions**:
  - Reviews experiment logs and model comparisons
  - Validates documentation completeness
  - Ensures reproducibility and handoff readiness
  - Approves production deployment criteria

- **Outcomes**:
  - Production-ready checklist verification
  - Complete documentation for knowledge transfer
  - Risk-assessed deployment decisions
  - Maintained experiment history and decisions

---

## Phase-Level CID Structure

### Phase 1: Environment Setup & Configuration

- **Context**: Project initialization and configuration infrastructure
- **Intent**: Establish reproducible, configuration-driven foundation before any analysis
- **Priority**: 🔴 CRITICAL (blocks all downstream work)

#### Mantras
- [ ] Configuration; externalize parameters; forbid hardcoded values
- [ ] Dependencies; isolate environment; forbid global installations
- [ ] Structure; organize concerns; forbid flat directories
- [ ] Version control; track changes; forbid untracked code

#### Key Directives (SVO Format)

| Subject | Verb | Object | Directive | Anti-Pattern Forbidden |
|---------|------|--------|-----------|------------------------|
| Developer | Creates | Virtual environment | Isolate dependencies; ensure reproducibility | Installing packages globally |
| Developer | Externalizes | Configuration parameters | Enable customization; prevent hardcoding | Embedding parameters in code |
| Developer | Initializes | Git repository | Track changes; enable collaboration | Developing without version control |
| Developer | Defines | Project structure | Separate concerns; maintain organization | Mixing code, data, configs in root |
| Developer | Documents | Setup process | Enable reproduction; support onboarding | Leaving setup undocumented |

#### Implementation Tasks (m.n.o)

| Task | Context Focus | Intent | Directive | Priority |
|------|---------------|--------|-----------|----------|
| 1.1.1 | Directory hierarchy | Separate concerns by type | Create `data/raw/`, `data/processed/`, `notebooks/`, `src/`, `config/`, `tests/`, `models/`, `outputs/`; forbid mixing concerns | 🔴 |
| 1.2.2 | Requirements file | Document dependencies | Pin versions: `pandas==1.5.3`; forbid unpinned dependencies | 🔴 |
| 1.3.1 | Data configuration | Externalize data paths | Define sources in `config/data_config.yaml`; forbid hardcoded paths | 🔴 |
| 1.3.2 | Model configuration | Externalize hyperparameters | Define params in `config/model_config.yaml`; forbid embedded hyperparameters | 🔴 |
| 1.3.3 | Preprocessing configuration | Externalize transformations | Define steps in `config/preprocessing_config.yaml`; forbid hardcoded preprocessing | 🔴 |
| 1.5.1 | Config loader utility | Centralize configuration loading | Build `load_config(path)` function; forbid parsing YAML in each module | 🟡 |

- **Outcome**: Reproducible environment with configuration-first architecture

---

### Phase 2: Data Loading & Initial Validation

- **Context**: Data ingestion and quality assurance
- **Intent**: Load data with validation to catch issues early before investing in analysis
- **Priority**: 🔴 CRITICAL (fail fast on data issues)

#### Mantras

- [ ] Loading; centralize logic; forbid duplicate loaders
- [ ] Validation; enforce schema; forbid invalid data processing
- [ ] Quality; detect issues; forbid silent data problems
- [ ] Profiling; understand characteristics; forbid blind analysis

#### Key Directives (SVO Format)

| Subject | Verb | Object | Directive | Anti-Pattern Forbidden |
|---------|------|--------|-----------|------------------------|
| Data loader | Detects | File format | Auto-detect CSV, Parquet, Excel, JSON; support multiple formats | Assuming single format |
| Validator | Checks | Schema compliance | Verify columns, dtypes match expected; catch schema violations | Processing without validation |
| Validator | Identifies | Missing values | Report null percentages; compare to thresholds | Silently ignoring missing data |
| Validator | Detects | Duplicate records | Find duplicates on key columns; report count | Checking only all columns |
| Profiler | Generates | Data summary | Create comprehensive profile with distributions, stats | Skipping data profiling |

#### Implementation Tasks (m.n.o)

| Task | Context Focus | Intent | Directive | Priority |
|------|---------------|--------|-----------|----------|
| 2.1.3 | Generic loader | Support multiple formats | Implement format-agnostic loading with extension detection; forbid format-specific loaders | 🔴 |
| 2.2.1 | Schema validation | Enforce data contracts | Compare `df.dtypes` against `config['expected_schema']`; forbid assuming schema | 🔴 |
| 2.2.2 | Null value check | Identify data gaps | Calculate `df.isnull().sum()`, compare to `max_null_pct`; forbid ignoring missing data | 🔴 |
| 2.2.5 | Categorical validation | Ensure valid values | Check `set(df[col].unique())` against `config['valid_values']`; forbid arbitrary categories | 🟡 |
| 2.3.3 | Data profiling | Generate comprehensive summary | Use `pandas-profiling` or manual `.info()`, `.describe()`; forbid skipping profiling | 🔴 |
| 2.4.1 | Validation metrics | Record quality checks | Save `{"schema_valid": True, "null_pct": 0.05}` to JSON; forbid losing validation info | 🟡 |

- **Outcome**: Validated data with documented quality characteristics

---

### Phase 3: Exploratory Data Analysis

- **Context**: Pattern discovery and insight generation
- **Intent**: Understand data characteristics, relationships, and patterns before modeling
- **Priority**: 🔴 CRITICAL (EDA informs feature engineering and modeling)

#### Mantras

- [ ] Distributions; analyze univariate; forbid assuming normality
- [ ] Relationships; examine bivariate; forbid ignoring correlations
- [ ] Patterns; identify complex; forbid superficial analysis
- [ ] Documentation; record insights; forbid undocumented findings


#### Key Directives (SVO Format)

| Subject | Verb | Object | Directive | Anti-Pattern Forbidden |
|---------|------|--------|-----------|------------------------|
| Analyst | Plots | Numeric distributions | Create histograms, boxplots, density plots; understand skewness | Skipping distribution analysis |
| Analyst | Calculates | Correlation matrix | Compute pairwise correlations (Pearson, Cramér's V); identify relationships | Using only Pearson correlation |
| Analyst | Visualizes | Feature-target relationships | Create boxplots by class or scatter plots; identify predictive features | Modeling without understanding features |
| Analyst | Identifies | Outliers | Use IQR, z-score, visualization; detect extreme values | Removing outliers without investigation |
| Analyst | Documents | Key findings | Record patterns, issues, implications in Markdown; preserve insights | Jumping to modeling without documentation |

#### Implementation Tasks (m.n.o)

| Task | Context Focus | Intent | Directive | Priority |
|------|---------------|--------|-----------|----------|
| 3.1.1 | Numeric distributions | Understand individual features | Plot `df[numeric_cols].hist()`; analyze skewness, outliers | 🔴 |
| 3.1.2 | Summary statistics | Quantify characteristics | Compute `.describe()`, `.skew()`, `.kurtosis()`; forbid only looking at mean | 🔴 |
| 3.2.1 | Correlation matrix | Identify relationships | Calculate `df.corr()` for numeric, Cramér's V for categorical | 🔴 |
| 3.2.3 | Feature-target analysis | Find predictive features | Create class-based boxplots or scatter plots; forbid modeling blindly | 🔴 |
| 3.3.1 | PCA visualization | Reduce dimensions | Apply `PCA(n_components=2)` for 2D plotting; visualize high-dimensional data | 🟡 |
| 3.6.1 | Key findings | Document discoveries | List "Strong correlation (0.8) between X and Y", "Class imbalance: 90/10" | 🔴 |
| 3.6.3 | Preprocessing recommendations | Plan transformations | Suggest "Log transform skewed features", "Impute with median" | 🔴 |

- **Outcome**: Documented insights with preprocessing and feature engineering plan

---

### Phase 4: Feature Engineering & Preprocessing

- **Context**: Data transformation and feature creation
- **Intent**: Transform raw data into model-ready features using configuration-driven approach
- **Priority**: 🔴 CRITICAL (pipeline must be reproducible and neutral)

#### Mantras

- [ ] Imputation; handle missing; forbid single-strategy-fits-all
- [ ] Scaling; normalize distributions; forbid fitting on test data
- [ ] Encoding; transform categoricals; forbid ignoring cardinality
- [ ] Engineering; create features; forbid hardcoded logic
- [ ] Pipeline; serialize transforms; forbid losing fitted parameters


#### Key Directives (SVO Format)

| Subject | Verb | Object | Directive | Anti-Pattern Forbidden |
|---------|------|--------|-----------|------------------------|
| Imputer | Handles | Missing values | Support mean, median, mode, constant, KNN; configure per feature | Using one strategy for all features |
| Scaler | Normalizes | Numeric features | Fit on training data only; apply standard, minmax, robust scaling | Fitting scaler on test data |
| Encoder | Transforms | Categorical features | Support onehot, ordinal, target encoding; handle unseen categories | Always using onehot encoding |
| Feature engineer | Creates | New features | Build polynomial, log, binning features from config | Hardcoding feature engineering |
| Pipeline | Serializes | Transformations | Save fitted pipeline with `joblib.dump()`; preserve parameters | Losing fitted preprocessing |

#### Implementation Tasks (m.n.o)

| Task | Context Focus | Intent | Directive | Priority |
|------|---------------|--------|-----------|----------|
| 4.2.1 | Imputation config | Define strategy per feature | Specify `{numeric: "median", categorical: "mode"}`; forbid universal strategy | 🔴 |
| 4.2.2 | Imputer class | Build configurable imputer | Implement `fit()` learns values, `transform()` applies; forbid fitting on test | 🔴 |
| 4.3.2 | Scaler class | Build configurable scaler | Store scaling parameters from training data only; forbid re-fitting on test | 🔴 |
| 4.4.2 | Encoder class | Build configurable encoder | Handle unseen categories gracefully; forbid failing on new categories | 🔴 |
| 4.5.1 | Feature engineering config | Define features to create | Specify `{polynomial: [["x1","x2"]], log: ["skewed"]}`; forbid mixing with transforms | 🔴 |
| 4.6.1 | Transformer ordering | Ensure correct sequence | Order: Imputation → Feature Engineering → Encoding → Scaling | 🔴 |
| 4.6.2 | Pipeline serialization | Enable saving/loading | Implement `joblib.dump(pipeline, 'path')`; forbid losing fitted parameters | 🔴 |

- **Outcome**: Serialized preprocessing pipeline with consistent train/test transformation

---

### Phase 5: Model Development & Training

- **Context**: Model selection, training, and hyperparameter optimization
- **Intent**: Build, train, and evaluate models using configuration-driven approach
- **Priority**: 🔴 CRITICAL (model training must be reproducible)

#### Mantras

- [ ] Baseline; establish floor; forbid skipping comparison
- [ ] Factory; create from config; forbid hardcoded models
- [ ] Cross-validation; estimate performance; forbid single split only
- [ ] Tuning; optimize hyperparameters; forbid default-only parameters
- [ ] Serialization; save artifacts; forbid losing trained models

#### Key Directives (SVO Format)

| Subject | Verb | Object | Directive | Anti-Pattern Forbidden |
|---------|------|--------|-----------|------------------------|
| Factory | Creates | Model instances | Instantiate from config: `create_model(config)`; map model types | Manually creating each model type |
| Trainer | Establishes | Baseline model | Train simplest model (DummyClassifier); measure baseline performance | Skipping baseline comparison |
| Trainer | Implements | Cross-validation | Use stratified K-fold; estimate robust performance | Evaluating only on single split |
| Tuner | Optimizes | Hyperparameters | Search with grid/random/Bayesian methods on validation set | Using default parameters only |
| Serializer | Saves | Model artifacts | Persist model, config, feature names, metrics with `joblib` | Losing trained models |

#### Implementation Tasks (m.n.o)

| Task | Context Focus | Intent | Directive | Priority |
|------|---------------|--------|-----------|----------|
| 5.1.1 | Model factory | Instantiate from config | Build `if config['type']=='rf': return RandomForest(**params)`; forbid if-elif chains | 🔴 |
| 5.2.1 | Baseline training | Fit simplest model | Train `DummyClassifier(strategy='most_frequent')`; forbid complex baseline | 🔴 |
| 5.3.1 | Cross-validation | Enable robust estimation | Implement `cross_val_score()` with stratification; forbid single split only | 🔴 |
| 5.3.4 | Reproducibility | Ensure deterministic training | Set `np.random.seed()`, model seeds; forbid non-reproducible runs | 🔴 |
| 5.4.1 | Metric calculator | Compute configured metrics | Support accuracy, precision, recall, F1, ROC-AUC; forbid only accuracy | 🔴 |
| 5.6.2 | Hyperparameter search | Execute tuning with CV | Run `GridSearchCV(cv=5, scoring='f1')`; forbid tuning on test set | 🟡 |
| 5.7.1 | Artifact saving | Persist model and metadata | Save model file, config, features, metrics; forbid saving model only | 🔴 |

- **Outcome**: Trained models with documented performance and serialized artifacts

---

### Phase 6: Model Evaluation & Analysis

- **Context**: Test set evaluation and model diagnostics
- **Intent**: Thoroughly evaluate model on held-out data and analyze behavior
- **Priority**: 🔴 CRITICAL (test set validation proves generalization)

#### Mantras

- [ ] Holdout; evaluate once; forbid repeated test evaluation
- [ ] Errors; analyze patterns; forbid ignoring failures
- [ ] Importance; understand features; forbid black-box models
- [ ] Diagnostics; check health; forbid deploying without checks
- [ ] Documentation; record findings; forbid undocumented limitations

#### Key Directives (SVO Format)

| Subject | Verb | Object | Directive | Anti-Pattern Forbidden |
|---------|------|--------|-----------|------------------------|
| Evaluator | Applies | Preprocessing pipeline | Transform test data with `pipeline.transform()` (no fit) | Fitting pipeline on test data |
| Evaluator | Calculates | Test metrics | Compute same metrics as validation; compare train vs test | Using different metrics than validation |
| Analyst | Analyzes | Prediction errors | Group errors by features, confidence; identify patterns | Looking at errors randomly |
| Analyst | Computes | Feature importance | Use multiple methods: built-in, permutation, SHAP | Relying on single importance method |
| Diagnostician | Checks | Model calibration | Plot calibration curve; calculate Brier score | Trusting probabilities without calibration |

#### Implementation Tasks (m.n.o)

| Task | Context Focus | Intent | Directive | Priority |
|------|---------------|--------|-----------|----------|
| 6.1.2 | Test preprocessing | Transform held-out data | Apply `pipeline.transform(X_test)` only; forbid fitting on test | 🔴 |
| 6.1.4 | Test metrics | Compute evaluation metrics | Calculate accuracy, F1, precision, recall, AUC; forbid different metrics | 🔴 |
| 6.1.5 | Validation comparison | Check for overfitting | Document "Val F1=0.87, Test F1=0.85"; forbid ignoring train-test gap | 🔴 |
| 6.2.1 | Error patterns | Find failure characteristics | Group errors by feature values, confidence; forbid random error analysis | 🔴 |
| 6.3.2 | Permutation importance | Measure via shuffling | Calculate `permutation_importance(model, X_val, y_val)`; forbid only training data | 🟡 |
| 6.3.3 | SHAP analysis | Explain predictions | Compute `shap.TreeExplainer(model)`; forbid skipping interpretability | 🟢 |
| 6.4.3 | Slice analysis | Evaluate subgroups | Check metrics per categorical group; forbid only aggregate metrics | 🟡 |

- **Outcome**: Comprehensive evaluation with documented model behavior and limitations

---

### Phase 7: Pipeline Productionization

- **Context**: Converting notebooks to production-ready code
- **Intent**: Transform exploratory code into testable, maintainable, deployable pipeline
- **Priority**: 🔴 CRITICAL (pipeline must be production-ready)

#### Mantras

- [ ] Extraction; convert to modules; forbid production notebooks
- [ ] Orchestration; build end-to-end; forbid manual execution
- [ ] CLI; enable command-line; forbid requiring code changes
- [ ] Testing; verify behavior; forbid untested production code
- [ ] Monitoring; add observability; forbid blind deployment

#### Key Directives (SVO Format)

| Subject | Verb | Object | Directive | Anti-Pattern Forbidden |
|---------|------|--------|-----------|------------------------|
| Developer | Extracts | Notebook code | Refactor cells into pure functions; organize into modules | Copy-pasting notebook cells directly |
| Developer | Builds | Pipeline orchestration | Create `pipeline.py` with sequential stages; enable config-driven execution | Hardcoding pipeline steps |
| Developer | Implements | CLI scripts | Add `argparse` with `--config`, `--data-path` arguments | Requiring manual code changes |
| Developer | Creates | Test suite | Write unit, integration, pipeline tests; achieve >70% coverage | Deploying untested code |
| Developer | Adds | Monitoring hooks | Track data drift, model performance, latency | Deploying without monitoring |

#### Implementation Tasks (m.n.o)

| Task | Context Focus | Intent | Directive | Priority |
|------|---------------|--------|-----------|----------|
| 7.1.2 | Function refactoring | Convert cells to functions | Create pure functions with clear inputs/outputs; forbid side effects | 🔴 |
| 7.1.3 | Module organization | Group related functions | Separate data, preprocessing, models, evaluation, utils; forbid single file | 🔴 |
| 7.2.1 | Pipeline stages | Define sequential steps | Identify Load → Validate → Preprocess → Train → Evaluate → Save | 🔴 |
| 7.2.3 | Pipeline config | Enable configurable behavior | Create `pipeline_config.yaml` with stages, parameters; forbid hardcoding | 🔴 |
| 7.3.1 | CLI arguments | Enable command-line config | Implement `argparse` with config paths; forbid hardcoded arguments | 🔴 |
| 7.4.2 | Input validation | Validate inference inputs | Check schema, dtypes, ranges before prediction; forbid processing invalid inputs | 🔴 |
| 7.5.1 | Unit tests | Test individual functions | Test data loading, preprocessing separately; forbid only integration tests | 🔴 |
| 7.6.2 | Drift detection | Monitor distribution changes | Compare production vs training distributions; forbid ignoring drift | 🟢 |

- **Outcome**: Production pipeline with CLI scripts, tests, and monitoring

---

### Phase 8: Documentation & Knowledge Transfer

- **Context**: Creating comprehensive documentation for maintenance and handoff
- **Intent**: Enable others to understand, use, and maintain the system
- **Priority**: 🔴 CRITICAL (documentation enables collaboration and maintenance)

#### Mantras

- [ ] README; provide overview; forbid minimal documentation
- [ ] Data; document sources; forbid unknown provenance
- [ ] Model; explain design; forbid undocumented models
- [ ] API; reference interfaces; forbid undocumented code
- [ ] Handoff; transfer knowledge; forbid knowledge silos

#### Key Directives (SVO Format)

| Subject | Verb | Object | Directive | Anti-Pattern Forbidden |
|---------|------|--------|-----------|------------------------|
| Developer | Updates | Project README | Include problem, approach, results, usage; provide setup instructions | Leaving minimal README |
| Developer | Documents | Data sources | Record URLs, schemas, quality issues; preserve provenance | Losing track of data origins |
| Developer | Creates | Model card | Explain architecture, features, performance, limitations | Deploying without model docs |
| Developer | Generates | API reference | Build from docstrings with Sphinx/pdoc; show usage examples | Leaving functions undocumented |
| Developer | Prepares | Handoff materials | Create architecture diagram, walkthrough, Q&A; conduct transfer meeting | Handing off without explanation |

#### Implementation Tasks (m.n.o)

| Task | Context Focus | Intent | Directive | Priority |
|------|---------------|--------|-----------|----------|
| 8.1.1 | Project description | Explain problem and approach | Write "Binary classification of X using Y features to predict A" | 🔴 |
| 8.1.3 | Setup instructions | Provide environment setup | Document: clone, create env, install deps, download data | 🔴 |
| 8.1.5 | Configuration docs | Explain config files | Describe each config file, parameters, valid values | 🔴 |
| 8.2.2 | Data schema | Define feature specifications | Create table: feature_name, dtype, range, description | 🔴 |
| 8.3.2 | Feature documentation | Explain features used | List all features, transformations, engineering steps | 🔴 |
| 8.3.4 | Model limitations | Explain weaknesses | Document "Performs poorly when X<5", "Requires features A,B,C" | 🔴 |
| 8.5.1 | Experiment logging | Record training runs | Log date, model, hyperparameters, performance, notes | 🟡 |
| 8.7.1 | Architecture diagram | Visualize system | Show data flow, components, interactions | 🟡 |

- **Outcome**: Complete documentation enabling team handoff and maintenance

---

## Anti-Pattern Guards (CID Format)

| Context | Intent | Anti-Pattern | Directive | Phase |
|---------|--------|--------------|-----------|-------|
| Configuration | Enable customization | Hardcoding paths in code | Externalize all paths to `config/*.yaml`; forbid embedded paths | 1 |
| Data splitting | Prevent leakage | Training on full dataset | Hold out test set before any analysis; forbid combined training | 2 |
| EDA | Avoid contamination | Analyzing test set | Only analyze training data during EDA; forbid test set exploration | 3 |
| Preprocessing | Prevent leakage | Fitting on test data | `fit()` on train only, `transform()` on test; forbid test fitting | 4 |
| Hyperparameter tuning | Avoid overfitting | Tuning on test set | Use cross-validation on training; forbid test set tuning | 5 |
| Pipeline saving | Enable reproduction | Not saving pipeline | Serialize fitted pipeline with model; forbid losing transformations | 4,7 |
| Code organization | Maintain quality | Production notebooks | Extract code to modules; forbid deploying notebooks | 7 |
| Model selection | Ensure improvement | Skipping baseline | Establish baseline before complex models; forbid no comparison | 5 |
| Class imbalance | Handle properly | Using only accuracy | Check distribution, use appropriate metrics; forbid accuracy-only | 3,5 |
| Experiment tracking | Enable reproduction | Lost experiments | Log all runs with configs and metrics; forbid missing history | 5,8 |
| Deployment | Maintain visibility | No monitoring | Implement drift detection and performance tracking; forbid blind deployment | 7 |
| Validation | Prevent failures | Skipping input validation | Validate inputs before prediction; forbid processing invalid data | 7 |

---

## Production-Ready Checklist (CID Format)

### Context: Code Quality
- **Intent**: Ensure maintainable, neutral, testable codebase
  - [ ] Configuration; externalize parameters; forbid hardcoded values
  - [ ] Extraction; create modules; forbid production notebooks
  - [ ] Serialization; save pipelines; forbid losing fitted transforms
  - [ ] Documentation; add docstrings; forbid undocumented functions
  - [ ] Style; follow PEP 8; forbid inconsistent formatting

### Context: Data Handling
- **Intent**: Prevent leakage and ensure reproducibility
  - [ ] Loading; use configuration; forbid hardcoded paths
  - [ ] Validation; implement checks; forbid processing invalid data
  - [ ] Splitting; maintain separation; forbid train-test mixing
  - [ ] Preprocessing; fit on train only; forbid test contamination

### Context: Model Quality
- **Intent**: Ensure systematic development and evaluation
  - [ ] Baseline; establish comparison; forbid skipping baseline
  - [ ] Comparison; evaluate multiple; forbid single model only
  - [ ] Tuning; optimize systematically; forbid default-only parameters
  - [ ] Holdout; evaluate on test; forbid repeated test evaluation
  - [ ] Importance; analyze features; forbid black-box deployment

### Context: Testing
- **Intent**: Verify correctness before deployment
  - [ ] Unit tests; test components; forbid untested functions
  - [ ] Integration; test workflows; forbid missing workflow tests
  - [ ] Coverage; achieve >70%; forbid low test coverage
  - [ ] Execution; run successfully; forbid failing tests

### Context: Documentation
- **Intent**: Enable collaboration and maintenance
  - [ ] README; provide setup; forbid minimal documentation
  - [ ] Data; document sources; forbid unknown provenance
  - [ ] Model; create card; forbid undocumented models
  - [ ] API; generate reference; forbid missing API docs
  - [ ] Experiments; maintain log; forbid lost history

### Context: Deployment
- **Intent**: Enable production operation
  - [ ] Training; create script; forbid manual training
  - [ ] Inference; create script; forbid manual prediction
  - [ ] Artifacts; save models; forbid losing trained models
  - [ ] Monitoring; add hooks; forbid blind deployment
  - [ ] Containerization; build image; (optional but recommended)

---

## Configuration Examples (CID-Organized)

### Data Configuration: `config/data_config.yaml`

- **Context**: Data source and schema specifications
- **Intent**: Enable environment-agnostic data loading

```yaml
# Data sources - externalized paths
data_sources:
  train: "data/raw/train.csv"
  test: "data/raw/test.csv"
  validation: "data/raw/val.csv"

# Expected schema - prevent invalid data
expected_schema:
  columns:
    age: 
      type: int
      range: [0, 120]
    income: 
      type: float
      range: [0, 1000000]
    education: 
      type: str
      values: [HS, BA, MA, PhD]
    target: 
      type: int
      values: [0, 1]

# Validation thresholds - enforce quality
validation:
  max_null_pct: 0.10
  max_duplicates: 100
  key_columns: [customer_id]
  
# Loading options - handle formats
loading:
  compression: "infer"
  encoding: "utf-8"
  na_values: ["NA", "null", ""]
```

### Preprocessing Configuration: `config/preprocessing_config.yaml`

- **Context**: Feature transformation specifications
- **Intent**: Enable reproducible, configurable preprocessing

```yaml
# Imputation - handle missing values
imputation:
  numeric: "median"
  categorical: "mode"
  custom:
    income: "constant:0"
    education: "mode"

# Scaling - normalize distributions
scaling:
  method: "standard"  # standard, minmax, robust, maxabs
  features: [age, income, credit_score]

# Encoding - transform categoricals
encoding:
  onehot:
    features: [education, state]
    handle_unknown: "ignore"
    drop: "first"
  ordinal:
    education: [HS, BA, MA, PhD]
  target:
    features: [city]  # for high cardinality
    smoothing: 0.1

# Feature engineering - create new features
feature_engineering:
  polynomial:
    features: [[age, income]]
    degree: 2
    interaction_only: true
  log_transform:
    features: [income, debt]
  sqrt_transform:
    features: [area]
  binning:
    age: [0, 18, 35, 50, 65, 100]
    income: [0, 30000, 60000, 100000, 999999]

# Pipeline order - ensure correct sequence
pipeline_order:
  - imputation
  - feature_engineering
  - encoding
  - scaling
```

### Model Configuration: `config/model_config.yaml`

- **Context**: Model architecture and training specifications
- **Intent**: Enable reproducible, configurable model development

```yaml
# Model selection - choose algorithm
model:
  type: "xgboost"  # rf, xgboost, logistic, neural_net
  params:
    n_estimators: 100
    max_depth: 6
    learning_rate: 0.1
    random_state: 42
    objective: "binary:logistic"

# Validation strategy - estimate performance
validation:
  test_size: 0.2
  cv_folds: 5
  stratify: true
  random_state: 42
  shuffle: true

# Evaluation metrics - measure quality
metrics:
  primary: "f1"  # for model selection
  secondary:
    - accuracy
    - precision
    - recall
    - roc_auc
    - average_precision

# Hyperparameter tuning - optimize performance
hyperparameter_tuning:
  enabled: true
  method: "grid_search"  # grid_search, random_search, bayesian
  cv_folds: 5
  scoring: "f1"
  param_grid:
    n_estimators: [50, 100, 200]
    max_depth: [3, 6, 10]
    learning_rate: [0.01, 0.1, 0.3]
    min_child_weight: [1, 3, 5]

# Training options - control execution
training:
  early_stopping: true
  early_stopping_rounds: 10
  verbose: true
  save_checkpoints: true
  checkpoint_dir: "models/checkpoints/"
```

---

## Mantra Application Template

> **"CID frames ML development, SRP isolates pipeline stages, RAO aligns team roles, SVO clarifies operational steps"**

- **CID frames**: Establishes scope (data loading, preprocessing, training, evaluation), purpose (reproducibility, neutrality, quality), rules (no hardcoding, no leakage, no untested code)
- **SRP isolates**: Ensures each module handles single concern (data loader owns loading, preprocessor owns transformations, trainer owns model fitting, evaluator owns metrics)
- **RAO aligns**: Maps Data Engineer (builds loaders), ML Engineer (creates pipelines), Data Scientist (explores and models), MLOps Engineer (deploys and monitors) to their deliverables
- **SVO clarifies**: Expresses all operations (Developer creates virtual environment, Validator checks schema compliance, Trainer fits model on training data) with grammatical precision

---

## Time Budget by Phase (Total: 6-12 hours)

| Phase | Duration | CID Context | Key Intent | Critical Outcome |
|-------|----------|-------------|------------|------------------|
| 1. Environment Setup | 15-30 min | Configuration infrastructure | Establish reproducible foundation | Config-driven environment ready |
| 2. Data Loading | 20-40 min | Data ingestion and quality | Catch issues early | Validated data with quality metrics |
| 3. EDA | 60-120 min | Pattern discovery | Understand before modeling | Documented insights and preprocessing plan |
| 4. Preprocessing | 45-90 min | Feature transformation | Create reproducible pipeline | Serialized preprocessing with no leakage |
| 5. Model Training | 60-120 min | Model development | Build and compare systematically | Trained models with documented performance |
| 6. Evaluation | 30-60 min | Holdout validation | Prove generalization | Test metrics with error analysis |
| 7. Productionization | 60-120 min | Code extraction | Create deployable pipeline | Production scripts with tests |
| 8. Documentation | 30-60 min | Knowledge transfer | Enable collaboration | Complete docs for handoff |

---

## Success Criteria (CID Format)

### Context: Reproducibility
- **Intent**: Enable identical results across runs and environments
- **Criteria**:
  - [ ] Random seeds set; results consistent; forbid non-deterministic runs
  - [ ] Configurations versioned; parameters tracked; forbid undocumented changes
  - [ ] Dependencies pinned; environment reproducible; forbid version conflicts
  - [ ] Pipeline serialized; transforms consistent; forbid losing fitted parameters

### Context: Quality
- **Intent**: Ensure robust, reliable model performance
- **Criteria**:
  - [ ] Baseline established; improvement measured; forbid no comparison
  - [ ] Multiple models compared; best selected; forbid single model only
  - [ ] Hyperparameters tuned; performance optimized; forbid defaults only
  - [ ] Test evaluation performed; generalization verified; forbid overfitting
  - [ ] Error analysis completed; weaknesses understood; forbid blind deployment

### Context: Maintainability
- **Intent**: Enable long-term system maintenance
- **Criteria**:
  - [ ] Code modularized; concerns separated; forbid monolithic notebooks
  - [ ] Tests written; coverage >70%; forbid untested code
  - [ ] Documentation complete; usage clear; forbid undocumented systems
  - [ ] Logging implemented; execution traceable; forbid opaque pipelines
  - [ ] Monitoring added; health visible; forbid blind operation

### Context: Neutrality
- **Intent**: Support deployment across contexts
- **Criteria**:
  - [ ] Paths externalized; configurations portable; forbid hardcoded paths
  - [ ] Parameters configurable; customization enabled; forbid embedded values
  - [ ] Formats flexible; multiple supported; forbid format assumptions
  - [ ] Dependencies explicit; environment reproducible; forbid implicit requirements
  - [ ] Dataset-agnostic; logic generalizes; forbid dataset-specific code

---

## Quick Reference: Phase → CID Mapping

| Phase | Primary Context | Primary Intent | Key Directive Pattern |
|-------|-----------------|----------------|-----------------------|
| 1 | Configuration infrastructure | Establish foundation | Externalize X; enable customization; forbid hardcoding |
| 2 | Data quality assurance | Fail fast on issues | Validate X; enforce schema; forbid invalid data |
| 3 | Pattern discovery | Understand characteristics | Analyze X; document insights; forbid blind modeling |
| 4 | Feature transformation | Create reproducible pipeline | Transform X; serialize pipeline; forbid test leakage |
| 5 | Model development | Build systematically | Train X; compare multiple; forbid single approach |
| 6 | Performance validation | Prove generalization | Evaluate X; analyze errors; forbid overfitting |
| 7 | Production deployment | Enable operations | Extract X; create pipeline; forbid notebooks |
| 8 | Knowledge preservation | Enable collaboration | Document X; transfer knowledge; forbid silos |

---

## Notes

- **Neutrality**: All guidelines remain project-agnostic, dataset-agnostic, and domain-agnostic
- **Configurability**: Every parameter, path, and decision point should be externalized to configuration files
- **Reproducibility**: All steps must be deterministic and version-controlled
- **Testability**: Production code requires comprehensive test coverage
- **Documentation**: Every component, decision, and process must be documented
- **Separation of Concerns**: Each module, function, and class handles a single responsibility
- **Accountability**: RAO chains ensure clear ownership of all deliverables
- **Clarity**: SVO format provides unambiguous operational semantics

> **Production-Ready Definition**: Pipeline runs end-to-end without manual intervention, is reproducible across environments, maintains test coverage >70%, includes comprehensive documentation, and can be handed off to another team member who can operate it successfully.
