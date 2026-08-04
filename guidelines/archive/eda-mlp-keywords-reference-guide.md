---
title: "eda-mlp-keywords-reference-guide"
author: "joohwee"
tags: [EDA, MLP, Keywords, Reference]
date: 2026-01-15
---

# EDA-MLP Keywords Reference Guide

**Organization**: By Phase → Priority → Keyword First-Appearance Order (not alphabetical)

**Purpose**: Comprehensive keyword reference for EDA-MLP implementation patterns, maintaining universality, neutrality, and project-agnostic applicability.

---

## Priority Legend

- 🔴 **CRITICAL** - Used 80-100% in real-world projects, prepare extensively
- 🟡 **HIGH** - Used 40-80% in real-world projects, know well
- 🟢 **MEDIUM** - Used 10-40% in real-world projects, understand basics
- ⚪ **LOW** - Used <10% in real-world projects, nice to know
- 🔵 **LOD** - Maximum Level of Detail pattern (implementation-focused)

---

## Phase 0: Setup & Data Acquisition (30 min)

### Priority: 🔴 **CRITICAL**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Database Download** | curl, wget, data acquisition, file transfer | ```bash<br># Download from URL<br>curl -o data/phishing.db "https://source.url/phishing.db"<br>wget -O data/phishing.db "https://source.url/phishing.db"<br><br># Verify download<br>file data/phishing.db<br># Output: SQLite 3.x database``` | Q: How to handle large files?<br>A: Use streaming downloads, verify checksums, implement retry logic | `curl -o {path} {url}` |
| **Project Structure** | Directory hierarchy, separation of concerns, scaffolding | ```bash<br># One-command scaffold<br>mkdir -p project/{data,src,results,models} && \<br>touch src/{data_loader,preprocessing,models,evaluation}.py<br><br># Organized layout<br>project/<br>├── data/      # gitignored<br>├── src/       # modules<br>├── results/   # outputs<br>└── models/    # artifacts``` | Q: Why separate data/ from src/?<br>A: Data is large/sensitive, should not be in version control | `mkdir -p {structure}` |
| **gitignore** | Version control exclusions, data privacy, artifact management | ```gitignore<br># Exclude large/sensitive files<br>data/<br>models/<br>*.pkl<br>*.db<br>__pycache__/<br>.ipynb_checkpoints/<br><br># Include configs<br>!config/<br>!requirements.txt``` | Q: What should always be gitignored?<br>A: data/, models/, credentials, large binaries | `echo "data/" >> .gitignore` |
| **DataLoader** | Database connection, schema validation, data ingestion | ```python<br>class DataLoader:<br>    def load_from_sqlite(self, db_path):<br>        conn = sqlite3.connect(db_path)<br>        df = pd.read_sql("SELECT * FROM table", conn)<br>        conn.close()<br>        return df``` | Q: How to handle connection failures?<br>A: Implement retry logic, validate connection before queries | `DataLoader.load_from_sqlite()` |
| **Schema Validation** | Column verification, dtype checking, data contract enforcement | ```python<br>expected_schema = {<br>    'feature_1': 'float64',<br>    'label': 'int64'<br>}<br><br>for col, dtype in expected_schema.items():<br>    if col not in df.columns:<br>        raise SchemaError(f"Missing: {col}")<br>    if df[col].dtype != dtype:<br>        raise SchemaError(f"Wrong dtype: {col}")``` | Q: When to validate schema?<br>A: Immediately after loading, before any processing | `validate_schema(df, expected)` |

### Priority: 🟡 **HIGH**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Virtual Environment** | Dependency isolation, reproducibility, environment management | ```bash<br># Create isolated environment<br>python -m venv venv<br>source venv/bin/activate  # Linux/Mac<br>venv\Scripts\activate     # Windows<br><br># Verify isolation<br>which python  # Should point to venv/bin/python``` | Q: venv vs conda vs poetry?<br>A: venv (built-in, simple), conda (data science), poetry (modern packaging) | `python -m venv venv` |
| **Requirements.txt** | Dependency specification, version pinning, reproducibility | ```txt<br># Pin exact versions<br>pandas==2.0.3<br>numpy==1.24.3<br>scikit-learn==1.3.0<br>xgboost==2.0.0<br><br># Install all<br>pip install -r requirements.txt``` | Q: Why pin versions?<br>A: Ensures reproducibility, prevents breaking changes | `pip freeze > requirements.txt` |
| **Execution Script** | Pipeline orchestration, automation, stage management | ```bash<br>#!/bin/bash<br>set -e  # Exit on error<br><br>echo "Stage 1: Data Loading"<br>python src/data_loader.py<br><br>echo "Stage 2: Preprocessing"<br>python src/preprocessing.py<br><br>echo "Pipeline Complete"``` | Q: Why use scripts vs manual execution?<br>A: Reproducibility, automation, error handling | `bash run.sh` |

### Priority: 🟢 **MEDIUM**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Row Count Validation** | Sample size adequacy, statistical power, confidence intervals | ```python<br>MIN_ROWS = 1000<br>if len(df) < MIN_ROWS:<br>    raise DataQualityError(<br>        f"Insufficient: {len(df)} rows, "<br>        f"need ≥{MIN_ROWS} for 70/15/15 split"<br>    )<br><br># Estimate CI width<br>test_size = int(len(df) * 0.15)<br>ci_width = 1.96 * sqrt(p*(1-p)/test_size)``` | Q: How many samples needed?<br>A: Depends on test set size, target metric variance | `check_row_count(df, MIN_ROWS)` |
| **Target Variable Parsing** | Label encoding verification, class distribution, balance assessment | ```python<br>unique_labels = set(df['label'].unique())<br>expected = {0, 1}<br><br>if unique_labels != expected:<br>    raise ValueError(<br>        f"Expected {expected}, found {unique_labels}"<br>    )<br><br>class_dist = df['label'].value_counts(normalize=True)<br>imbalance_ratio = class_dist.max() / class_dist.min()``` | Q: How to handle multi-class targets?<br>A: Use {0, 1, ..., n-1} encoding, check all classes present | `parse_target_variable(df)` |

---

## Phase 1: Environment Setup & Configuration (15-30 min)

### Priority: 🔴 **CRITICAL**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Directory Hierarchy** | Separation of concerns, module organization, clean architecture | ```<br>project/<br>├── data/<br>│   ├── raw/              # Immutable<br>│   └── processed/        # Transformed<br>├── src/<br>│   ├── data/             # Loading<br>│   ├── preprocessing/    # Transforms<br>│   ├── models/           # Training<br>│   └── utils/            # Helpers<br>├── config/              # YAML configs<br>├── tests/               # Unit tests<br>└── outputs/             # Results``` | Q: Why separate raw/ and processed/?<br>A: Raw is immutable source of truth, processed can be regenerated | `mkdir -p {hierarchy}` |
| **Git Initialization** | Version control, collaboration, change tracking | ```bash<br>git init<br>git config user.name "Your Name"<br>git config user.email "email@example.com"<br><br># First commit<br>git add .<br>git commit -m "Initial project structure"``` | Q: When to initialize git?<br>A: Before any code is written | `git init` |
| **Configuration Files** | YAML, externalized parameters, configuration-driven development | ```yaml<br># config/data_config.yaml<br>data_sources:<br>  train: "data/raw/train.csv"<br>  test: "data/raw/test.csv"<br><br>schema:<br>  target_column: "label"<br>  expected_columns: 47<br><br>validation:<br>  max_missing_pct: 0.10``` | Q: Why YAML over JSON?<br>A: Comments, multi-line strings, more readable | `load_config('config.yaml')` |

### Priority: 🟡 **HIGH**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **README Documentation** | Project overview, setup instructions, usage guide | ```markdown<br># Project Name<br><br>## Quick Start<br>```bash<br>python -m venv venv<br>source venv/bin/activate<br>pip install -r requirements.txt<br>python scripts/train.py<br>```<br><br>## Project Structure<br>[Describe folders]<br><br>## Usage<br>[Training, inference examples]``` | Q: What makes a good README?<br>A: Quick start, clear structure, usage examples | `README.md` |
| **Config Loader** | YAML parsing, configuration management, validation | ```python<br>import yaml<br><br>def load_config(path):<br>    with open(path, 'r') as f:<br>        config = yaml.safe_load(f)<br>    return config<br><br># Usage<br>config = load_config('config/data_config.yaml')<br>print(config['data_sources']['train'])``` | Q: How to handle missing config keys?<br>A: Provide defaults, validate required keys | `load_config(path)` |
| **Logger Setup** | Structured logging, debugging, audit trail | ```python<br>import logging<br><br>logging.basicConfig(<br>    level=logging.INFO,<br>    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',<br>    handlers=[<br>        logging.FileHandler('pipeline.log'),<br>        logging.StreamHandler()<br>    ]<br>)<br><br>logger = logging.getLogger(__name__)``` | Q: When to use logging vs print?<br>A: Always use logging for production code | `setup_logger(__name__)` |

### Priority: 🟢 **MEDIUM**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Jupyter Configuration** | Notebook setup, extensions, kernel management | ```bash<br>pip install jupyter notebook<br>jupyter contrib nbextension install --user<br>jupyter nbextension enable toc2/main<br><br># Custom settings<br>c.NotebookApp.iopub_data_rate_limit = 10000000``` | Q: Notebooks vs scripts?<br>A: Notebooks for exploration, scripts for production | `jupyter notebook` |
| **Model Config** | Hyperparameters, algorithm selection, training settings | ```yaml<br>model:<br>  type: "xgboost"<br>  params:<br>    n_estimators: 100<br>    max_depth: 6<br>    learning_rate: 0.1<br>    random_state: 42<br><br>training:<br>  cv_folds: 5<br>  scoring: "f1_weighted"``` | Q: How to version configs?<br>A: Git track configs, timestamp experiments | `config/model_config.yaml` |

---

## Phase 2: Data Loading & Validation (20-40 min)

### Priority: 🔴 **CRITICAL**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Data Loader Module** | File format detection, generic loading, abstraction | ```python<br>def load_data(config, split='train'):<br>    file_path = config['data_sources'][split]<br>    fmt = detect_format(file_path)<br>    <br>    loaders = {<br>        'csv': pd.read_csv,<br>        'parquet': pd.read_parquet,<br>        'excel': pd.read_excel<br>    }<br>    <br>    return loaders[fmt](file_path)``` | Q: Why abstract loading logic?<br>A: Supports multiple formats, easy to extend | `load_data(config, split)` |
| **Schema Validation** | Column verification, dtype checking, data contracts | ```python<br>def validate_schema(df, expected_schema):<br>    errors = []<br>    <br>    for col, dtype in expected_schema.items():<br>        if col not in df.columns:<br>            errors.append(f"Missing: {col}")<br>        elif str(df[col].dtype) != dtype:<br>            errors.append(f"{col}: expected {dtype}")<br>    <br>    if errors:<br>        raise SchemaError(errors)``` | Q: When does schema change?<br>A: Data source updates, feature additions | `validate_schema(df, schema)` |
| **Quality Checks** | Null detection, duplicate identification, integrity validation | ```python<br>null_pct = df.isnull().sum() / len(df) * 100<br>if (null_pct > threshold).any():<br>    raise QualityError("Excessive nulls")<br><br>duplicates = df.duplicated().sum()<br>if duplicates > max_duplicates:<br>    raise QualityError(f"{duplicates} duplicates")``` | Q: What's acceptable null rate?<br>A: Domain-specific, typically <10% | `check_quality(df, config)` |

### Priority: 🟡 **HIGH**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Data Profiling** | Statistical summary, distribution analysis, quality assessment | ```python<br>profile = {<br>    'row_count': len(df),<br>    'column_count': len(df.columns),<br>    'missing_values': df.isnull().sum().to_dict(),<br>    'dtypes': df.dtypes.astype(str).to_dict(),<br>    'numeric_summary': df.describe().to_dict(),<br>    'cardinality': df.nunique().to_dict()<br>}<br><br>save_json(profile, 'outputs/profile.json')``` | Q: How often to profile?<br>A: Every data refresh, before major changes | `profile_data(df)` |
| **Compression Handling** | gzip, bz2, zip detection, automatic decompression | ```python<br># Pandas auto-detects compression<br>df = pd.read_csv('data.csv.gz', compression='infer')<br><br># Manual handling<br>import gzip<br>with gzip.open('data.csv.gz', 'rt') as f:<br>    df = pd.read_csv(f)``` | Q: Which compression to use?<br>A: gzip (fast, compatible), parquet (columnar) | `compression='infer'` |
| **Range Validation** | Numeric bounds checking, constraint enforcement | ```python<br>expected_ranges = {<br>    'age': (0, 120),<br>    'income': (0, 1e7)<br>}<br><br>for col, (min_val, max_val) in expected_ranges.items():<br>    violations = (df[col] < min_val) | (df[col] > max_val)<br>    if violations.sum() > 0:<br>        print(f"{col}: {violations.sum()} out of range")``` | Q: How to handle violations?<br>A: Depends on severity - flag, cap, or reject | `validate_ranges(df, ranges)` |

### Priority: 🟢 **MEDIUM**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Categorical Validation** | Allowed values checking, encoding verification | ```python<br>expected_values = {<br>    'category': ['A', 'B', 'C'],<br>    'status': ['active', 'inactive']<br>}<br><br>for col, allowed in expected_values.items():<br>    actual = set(df[col].unique())<br>    unexpected = actual - set(allowed)<br>    if unexpected:<br>        raise ValueError(f"{col}: unexpected {unexpected}")``` | Q: How to handle new categories?<br>A: Flag as data drift, update schema or use 'Other' | `validate_categorical(df, expected)` |
| **Quality Report Generation** | Dashboard creation, metrics visualization, stakeholder communication | ```python<br>report = {<br>    'timestamp': datetime.now().isoformat(),<br>    'validation': validation_results,<br>    'missing_values': missing_summary,<br>    'duplicates': duplicate_count,<br>    'quality_score': overall_score<br>}<br><br>save_json(report, 'outputs/quality_report.json')``` | Q: Who reads quality reports?<br>A: Data engineers, scientists, stakeholders | `generate_quality_report(df)` |

---

## Phase 3: Exploratory Data Analysis (60-120 min)

### Priority: 🔴 **CRITICAL**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Univariate Analysis** | Single variable distributions, summary statistics | ```python<br># Numeric features<br>df[numeric_cols].hist(bins=50, figsize=(20, 15))<br>plt.tight_layout()<br>plt.savefig('outputs/distributions.png')<br><br># Summary stats<br>summary = df[numeric_cols].describe()<br>summary['skewness'] = df[numeric_cols].skew()<br>summary['kurtosis'] = df[numeric_cols].kurtosis()``` | Q: What to look for in univariate?<br>A: Skewness, outliers, missing patterns | `analyze_univariate(df)` |
| **Correlation Analysis** | Feature relationships, multicollinearity detection | ```python<br>corr_matrix = df[numeric_cols].corr()<br><br># Find high correlations<br>high_corr = []<br>for i in range(len(corr_matrix)):<br>    for j in range(i+1, len(corr_matrix)):<br>        if abs(corr_matrix.iloc[i, j]) > 0.7:<br>            high_corr.append({<br>                'feature_1': corr_matrix.columns[i],<br>                'feature_2': corr_matrix.columns[j],<br>                'correlation': corr_matrix.iloc[i, j]<br>            })``` | Q: How to handle high correlation?<br>A: Remove one feature, use PCA, regularization | `corr_matrix = df.corr()` |
| **Target Relationship Analysis** | Feature-target correlation, predictive power assessment | ```python<br># For classification<br>for col in numeric_cols:<br>    plt.figure(figsize=(10, 6))<br>    df.boxplot(column=col, by='target')<br>    plt.title(f'{col} by Target')<br>    plt.show()<br><br># Statistical tests<br>from scipy.stats import ttest_ind<br>group0 = df[df['target']==0][col]<br>group1 = df[df['target']==1][col]<br>stat, p_value = ttest_ind(group0, group1)``` | Q: Which features are most predictive?<br>A: High correlation with target, low p-values | `analyze_target_relationship(df)` |

### Priority: 🟡 **HIGH**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Outlier Detection** | IQR method, Z-score, isolation forest | ```python<br># IQR method<br>Q1 = df[col].quantile(0.25)<br>Q3 = df[col].quantile(0.75)<br>IQR = Q3 - Q1<br>lower = Q1 - 1.5 * IQR<br>upper = Q3 + 1.5 * IQR<br>outliers = (df[col] < lower) | (df[col] > upper)<br><br># Z-score method<br>z_scores = np.abs(stats.zscore(df[col]))<br>outliers = z_scores > 3``` | Q: Remove or keep outliers?<br>A: Depends on domain - cap, transform, or model robustness | `detect_outliers(df[col])` |
| **Heatmap Visualization** | Correlation matrix visualization, pattern identification | ```python<br>plt.figure(figsize=(12, 10))<br>mask = np.triu(np.ones_like(corr_matrix, dtype=bool))<br>sns.heatmap(<br>    corr_matrix,<br>    mask=mask,<br>    annot=True,<br>    fmt='.2f',<br>    cmap='coolwarm',<br>    center=0<br>)<br>plt.title('Correlation Heatmap')<br>plt.savefig('outputs/heatmap.png')``` | Q: How to interpret heatmap?<br>A: Red=positive, blue=negative, intensity=strength | `sns.heatmap(corr_matrix)` |
| **Statistical Tests** | Chi-square, t-test, ANOVA, hypothesis testing | ```python<br># Chi-square for categorical vs target<br>from scipy.stats import chi2_contingency<br>contingency = pd.crosstab(df['category'], df['target'])<br>chi2, p_value, dof, expected = chi2_contingency(contingency)<br><br># ANOVA for numeric vs multi-class target<br>from scipy.stats import f_oneway<br>groups = [df[df['target']==i]['feature'] for i in target_classes]<br>stat, p_value = f_oneway(*groups)``` | Q: What p-value threshold?<br>A: Typically 0.05, but consider multiple testing | `chi2_contingency(contingency)` |
| **PCA Analysis** | Dimensionality reduction, variance explained, component visualization | ```python<br>from sklearn.decomposition import PCA<br><br>pca = PCA()<br>pca_components = pca.fit_transform(X_scaled)<br><br># Variance explained<br>explained_var = pca.explained_variance_ratio_<br>cumulative_var = np.cumsum(explained_var)<br><br># Find components for 95% variance<br>n_components_95 = np.argmax(cumulative_var >= 0.95) + 1``` | Q: How many components to keep?<br>A: Enough for 95% variance, or elbow in scree plot | `PCA().fit_transform(X)` |
| **Clustering Analysis** | K-means, optimal k, cluster profiling | ```python<br>from sklearn.cluster import KMeans<br>from sklearn.metrics import silhouette_score<br><br># Find optimal k<br>silhouette_scores = []<br>for k in range(2, 11):<br>    kmeans = KMeans(n_clusters=k, random_state=42)<br>    labels = kmeans.fit_predict(X_scaled)<br>    score = silhouette_score(X_scaled, labels)<br>    silhouette_scores.append(score)<br><br>optimal_k = range(2, 11)[np.argmax(silhouette_scores)]``` | Q: How to choose k?<br>A: Elbow method, silhouette score, domain knowledge | `KMeans(n_clusters=k)` |

### Priority: 🟢 **MEDIUM**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Pair Plots** | Scatter matrix, multivariate visualization | ```python<br>import seaborn as sns<br><br>key_features = ['feature_1', 'feature_2', 'feature_3', 'target']<br>sns.pairplot(<br>    df[key_features],<br>    hue='target',<br>    diag_kind='kde',<br>    plot_kws={'alpha': 0.6}<br>)<br>plt.savefig('outputs/pairplot.png')``` | Q: How many features in pair plot?<br>A: Max 5-6, too many becomes unreadable | `sns.pairplot(df)` |
| **Interaction Features** | Feature crosses, polynomial features, importance ranking | ```python<br>from sklearn.preprocessing import PolynomialFeatures<br><br>poly = PolynomialFeatures(degree=2, interaction_only=True)<br>interactions = poly.fit_transform(df[top_features])<br>feature_names = poly.get_feature_names_out()<br><br># Test importance<br>from sklearn.ensemble import RandomForestClassifier<br>rf = RandomForestClassifier(random_state=42)<br>rf.fit(interactions, y)<br>importances = pd.DataFrame({<br>    'feature': feature_names,<br>    'importance': rf.feature_importances_<br>}).sort_values('importance', ascending=False)``` | Q: When to create interactions?<br>A: After univariate analysis shows non-linear patterns | `PolynomialFeatures(degree=2)` |
| **Temporal Analysis** | Time series decomposition, seasonality, trends | ```python<br>from statsmodels.tsa.seasonal import seasonal_decompose<br><br>decomposition = seasonal_decompose(<br>    df['metric'],<br>    model='additive',<br>    period=12<br>)<br><br>fig, axes = plt.subplots(4, 1, figsize=(12, 10))<br>decomposition.observed.plot(ax=axes[0])<br>decomposition.trend.plot(ax=axes[1])<br>decomposition.seasonal.plot(ax=axes[2])<br>decomposition.resid.plot(ax=axes[3])``` | Q: How to handle non-stationary series?<br>A: Differencing, detrending, log transform | `seasonal_decompose(ts)` |

---

## Phase 4: Feature Engineering & Preprocessing (45-90 min)

### Priority: 🔴 **CRITICAL**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Imputation** | Missing value handling, median/mean/mode strategies | ```python<br>from sklearn.impute import SimpleImputer<br><br># Numeric: median (robust to outliers)<br>num_imputer = SimpleImputer(strategy='median')<br>df[numeric_cols] = num_imputer.fit_transform(df[numeric_cols])<br><br># Categorical: mode<br>cat_imputer = SimpleImputer(strategy='most_frequent')<br>df[cat_cols] = cat_imputer.fit_transform(df[cat_cols])``` | Q: When to impute vs drop?<br>A: Impute if <30% missing and MAR, drop if MNAR | `SimpleImputer(strategy='median')` |
| **Scaling** | StandardScaler, MinMaxScaler, feature normalization | ```python<br>from sklearn.preprocessing import StandardScaler<br><br>scaler = StandardScaler()<br>X_train_scaled = scaler.fit_transform(X_train)<br>X_test_scaled = scaler.transform(X_test)  # Use same scaler!<br><br># Verify: mean≈0, std≈1<br>print(X_train_scaled.mean(axis=0))  # ~0<br>print(X_train_scaled.std(axis=0))   # ~1``` | Q: Always scale?<br>A: Required for SVM, KNN, neural nets; optional for trees | `StandardScaler().fit_transform(X)` |
| **Encoding** | One-hot, target encoding, handling categoricals | ```python<br># One-hot for low cardinality<br>from sklearn.preprocessing import OneHotEncoder<br>onehot = OneHotEncoder(drop='first', handle_unknown='ignore')<br>encoded = onehot.fit_transform(df[['category']])<br><br># Target encoding for high cardinality<br>import category_encoders as ce<br>target_enc = ce.TargetEncoder(cols=['high_card_feature'])<br>encoded = target_enc.fit_transform(X_train, y_train)``` | Q: One-hot vs target encoding?<br>A: One-hot if <10 categories, target if >20 | `OneHotEncoder(drop='first')` |
| **Pipeline Assembly** | Sklearn Pipeline, transform ordering, composition | ```python<br>from sklearn.pipeline import Pipeline<br><br>pipeline = Pipeline([<br>    ('imputation', SimpleImputer(strategy='median')),<br>    ('scaling', StandardScaler()),<br>    ('encoding', OneHotEncoder())<br>])<br><br># Correct order: impute → engineer → encode → scale<br>pipeline.fit(X_train, y_train)<br>X_train_transformed = pipeline.transform(X_train)``` | Q: Why order matters?<br>A: Scaling after encoding creates many zero columns | `Pipeline([steps])` |

### Priority: 🟡 **HIGH**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Missing Indicators** | Binary flags for missingness, MAR patterns | ```python<br># Create missing indicators<br>for col in df.columns:<br>    if df[col].isnull().sum() > 0:<br>        df[f'{col}_missing'] = df[col].isnull().astype(int)<br><br># Preserves information about missingness pattern``` | Q: When to create indicators?<br>A: If missingness is informative (MAR/MNAR) | `df[f'{col}_missing'] = df[col].isnull()` |
| **Log Transform** | Skewness reduction, right-tail normalization | ```python<br># For right-skewed features<br>df['income_log'] = np.log1p(df['income'])  # log(1+x) handles zeros<br><br># Verify reduction in skewness<br>print(f"Original skew: {df['income'].skew():.2f}")<br>print(f"Transformed skew: {df['income_log'].skew():.2f}")``` | Q: When to log transform?<br>A: When skewness > 1 (right-skewed) | `np.log1p(df[col])` |
| **Binning** | Discretization, quantile-based, equal-width | ```python<br># Equal-width bins<br>df['age_bin'] = pd.cut(<br>    df['age'],<br>    bins=[0, 18, 35, 50, 65, 100],<br>    labels=['child', 'young', 'adult', 'middle', 'senior']<br>)<br><br># Quantile bins<br>df['income_quartile'] = pd.qcut(<br>    df['income'],<br>    q=4,<br>    labels=['Q1', 'Q2', 'Q3', 'Q4']<br>)``` | Q: Binning vs continuous?<br>A: Binning captures non-linear patterns, loses granularity | `pd.cut(df[col], bins)` |
| **Rare Category Grouping** | Low-frequency category handling, "Other" category | ```python<br>threshold = 0.01  # 1%<br><br>for col in categorical_cols:<br>    freq = df[col].value_counts(normalize=True)<br>    rare_categories = freq[freq < threshold].index<br>    <br>    df[col] = df[col].replace(rare_categories, 'Other')``` | Q: Why group rare categories?<br>A: Prevents overfitting, reduces dimensionality | `replace(rare_cats, 'Other')` |

### Priority: 🟢 **MEDIUM**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Polynomial Features** | Feature interactions, degree-2 terms | ```python<br>from sklearn.preprocessing import PolynomialFeatures<br><br>poly = PolynomialFeatures(<br>    degree=2,<br>    interaction_only=True,  # No x^2 terms<br>    include_bias=False<br>)<br><br>X_poly = poly.fit_transform(X[['age', 'income']])<br># Creates: age, income, age×income``` | Q: Always create polynomial features?<br>A: No, only if EDA shows interactions | `PolynomialFeatures(degree=2)` |
| **DateTime Extraction** | Year, month, day, cyclical features | ```python<br>df['date'] = pd.to_datetime(df['date'])<br><br># Extract components<br>df['year'] = df['date'].dt.year<br>df['month'] = df['date'].dt.month<br>df['day'] = df['date'].dt.day<br>df['dayofweek'] = df['date'].dt.dayofweek<br>df['is_weekend'] = (df['dayofweek'] >= 5).astype(int)<br><br># Cyclical encoding<br>df['month_sin'] = np.sin(2 * np.pi * df['month'] / 12)<br>df['month_cos'] = np.cos(2 * np.pi * df['month'] / 12)``` | Q: How to encode cyclical features?<br>A: Sin/cos transformation preserves cyclical nature | `df['date'].dt.month` |
| **Pipeline Serialization** | joblib, pickle, model persistence | ```python<br>import joblib<br><br># Save pipeline<br>joblib.dump(pipeline, 'models/preprocessing_pipeline.pkl')<br><br># Load pipeline<br>pipeline = joblib.load('models/preprocessing_pipeline.pkl')<br><br># Apply to new data<br>X_new_transformed = pipeline.transform(X_new)``` | Q: joblib vs pickle?<br>A: joblib better for large numpy arrays | `joblib.dump(pipeline, path)` |

---

## Phase 5: Model Development & Training (60-120 min)

### Priority: 🔴 **CRITICAL**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Baseline Model** | Dummy classifier, benchmark establishment | ```python<br>from sklearn.dummy import DummyClassifier<br><br>baseline = DummyClassifier(strategy='most_frequent')<br>baseline.fit(X_train, y_train)<br><br>baseline_score = baseline.score(X_test, y_test)<br>print(f"Baseline accuracy: {baseline_score:.4f}")<br><br># Any model must beat this``` | Q: Why train baseline?<br>A: Ensures model adds value over naive strategy | `DummyClassifier(strategy='most_frequent')` |
| **Cross-Validation** | K-fold, stratified CV, performance estimation | ```python<br>from sklearn.model_selection import cross_val_score, StratifiedKFold<br><br>cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)<br>scores = cross_val_score(<br>    model,<br>    X_train,<br>    y_train,<br>    cv=cv,<br>    scoring='f1_weighted'<br>)<br><br>print(f"CV Score: {scores.mean():.4f} ± {scores.std():.4f}")``` | Q: How many folds?<br>A: 5 or 10, stratified for imbalanced data | `cross_val_score(model, X, y, cv=5)` |
| **Model Training** | fit(), train/test split, model persistence | ```python<br>from sklearn.ensemble import RandomForestClassifier<br><br>model = RandomForestClassifier(<br>    n_estimators=100,<br>    max_depth=10,<br>    random_state=42<br>)<br><br>model.fit(X_train, y_train)<br>y_pred = model.predict(X_test)``` | Q: When to fit vs fit_transform?<br>A: fit() for models, fit_transform() for transformers | `model.fit(X_train, y_train)` |
| **Metrics Calculation** | Accuracy, precision, recall, F1, ROC-AUC | ```python<br>from sklearn.metrics import classification_report, roc_auc_score<br><br>print(classification_report(y_test, y_pred))<br><br># For binary classification<br>y_proba = model.predict_proba(X_test)[:, 1]<br>auc = roc_auc_score(y_test, y_proba)<br>print(f"ROC-AUC: {auc:.4f}")``` | Q: Which metric to optimize?<br>A: Depends on business cost of FP vs FN | `classification_report(y_test, y_pred)` |

### Priority: 🟡 **HIGH**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Model Factory** | Dynamic model creation, registry pattern | ```python<br>from sklearn.ensemble import RandomForestClassifier<br>from sklearn.linear_model import LogisticRegression<br>import xgboost as xgb<br><br>MODEL_REGISTRY = {<br>    'random_forest': RandomForestClassifier,<br>    'logistic_regression': LogisticRegression,<br>    'xgboost': xgb.XGBClassifier<br>}<br><br>def create_model(model_type, **params):<br>    return MODEL_REGISTRY[model_type](**params)``` | Q: Why use factory pattern?<br>A: Configuration-driven, easy to add models | `create_model(type, **params)` |
| **Hyperparameter Tuning** | GridSearchCV, RandomizedSearchCV, optimization | ```python<br>from sklearn.model_selection import GridSearchCV<br><br>param_grid = {<br>    'n_estimators': [50, 100, 200],<br>    'max_depth': [5, 10, 15],<br>    'min_samples_split': [2, 5, 10]<br>}<br><br>grid_search = GridSearchCV(<br>    model,<br>    param_grid,<br>    cv=5,<br>    scoring='f1_weighted',<br>    n_jobs=-1<br>)<br><br>grid_search.fit(X_train, y_train)<br>best_params = grid_search.best_params_``` | Q: Grid vs random search?<br>A: Grid for small space, random for large | `GridSearchCV(model, param_grid)` |
| **Feature Importance** | Tree importances, coefficient magnitudes | ```python<br># For tree-based models<br>importances = model.feature_importances_<br>feature_importance_df = pd.DataFrame({<br>    'feature': feature_names,<br>    'importance': importances<br>}).sort_values('importance', ascending=False)<br><br># For linear models<br>importances = np.abs(model.coef_).flatten()``` | Q: How to interpret importance?<br>A: Relative ranking, not causal relationships | `model.feature_importances_` |
| **Model Comparison** | Multiple algorithms, performance benchmarking | ```python<br>models = {<br>    'Logistic Regression': LogisticRegression(),<br>    'Random Forest': RandomForestClassifier(),<br>    'XGBoost': xgb.XGBClassifier()<br>}<br><br>results = {}<br>for name, model in models.items():<br>    scores = cross_val_score(model, X_train, y_train, cv=5)<br>    results[name] = {<br>        'mean': scores.mean(),<br>        'std': scores.std()<br>    }``` | Q: How many models to compare?<br>A: 3-5 baseline algorithms initially | `cross_val_score(model, X, y)` |

### Priority: 🟢 **MEDIUM**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Early Stopping** | Overfitting prevention, validation monitoring | ```python<br># XGBoost with early stopping<br>model = xgb.XGBClassifier(<br>    n_estimators=1000,<br>    early_stopping_rounds=10<br>)<br><br>model.fit(<br>    X_train, y_train,<br>    eval_set=[(X_val, y_val)],<br>    verbose=False<br>)<br><br>print(f"Best iteration: {model.best_iteration}")``` | Q: What's patience value?<br>A: 10-50 rounds depending on data size | `early_stopping_rounds=10` |
| **Model Card** | Documentation, metadata, performance tracking | ```markdown<br># Model Card<br><br>## Model Details<br>- Type: XGBoost Classifier<br>- Version: 2025-01-15<br>- Hyperparameters: {...}<br><br>## Performance<br>- Test F1: 0.8542<br>- Test Accuracy: 0.8721<br><br>## Limitations<br>- Not suitable for...<br>``` | Q: What to include in model card?<br>A: Architecture, performance, limitations, ethics | `create_model_card(model, metrics)` |
| **Reproducibility** | Random seed setting, deterministic training | ```python<br>import random<br>import numpy as np<br><br>def set_seeds(seed=42):<br>    random.seed(seed)<br>    np.random.seed(seed)<br>    # For deep learning:<br>    # torch.manual_seed(seed)<br>    # tf.random.set_seed(seed)<br><br>set_seeds(42)``` | Q: Why set seeds?<br>A: Reproducible results, debugging, comparison | `set_seeds(42)` |

---

## Phase 6: Model Evaluation & Analysis (30-60 min)

### Priority: 🔴 **CRITICAL**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Test Set Evaluation** | Held-out performance, generalization assessment | ```python<br># Final evaluation on untouched test set<br>y_test_pred = model.predict(X_test)<br>y_test_proba = model.predict_proba(X_test)<br><br>test_metrics = {<br>    'accuracy': accuracy_score(y_test, y_test_pred),<br>    'precision': precision_score(y_test, y_test_pred),<br>    'recall': recall_score(y_test, y_test_pred),<br>    'f1': f1_score(y_test, y_test_pred),<br>    'roc_auc': roc_auc_score(y_test, y_test_proba[:, 1])<br>}``` | Q: When to use test set?<br>A: Only once, after all development complete | `model.predict(X_test)` |
| **Confusion Matrix** | TP, FP, TN, FN visualization | ```python<br>from sklearn.metrics import confusion_matrix<br>import seaborn as sns<br><br>cm = confusion_matrix(y_test, y_pred)<br>sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')<br>plt.xlabel('Predicted')<br>plt.ylabel('Actual')<br>plt.title('Confusion Matrix')<br><br># Interpret<br># [[TN, FP],<br>#  [FN, TP]]``` | Q: How to reduce FP vs FN?<br>A: Adjust threshold, use class weights | `confusion_matrix(y_test, y_pred)` |
| **Error Analysis** | Misclassification patterns, failure mode identification | ```python<br>errors = y_test != y_pred<br>error_indices = np.where(errors)[0]<br><br># Group by confidence<br>confidence = np.max(y_proba, axis=1)<br>low_conf_errors = errors & (confidence < 0.7)<br>high_conf_errors = errors & (confidence > 0.9)<br><br>print(f"Low confidence errors: {low_conf_errors.sum()}")<br>print(f"High confidence errors: {high_conf_errors.sum()}")``` | Q: What to do with error insights?<br>A: Improve features, collect more data, adjust threshold | `errors = y_test != y_pred` |

### Priority: 🟡 **HIGH**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **ROC Curve** | True positive rate vs false positive rate | ```python<br>from sklearn.metrics import roc_curve, roc_auc_score<br><br>fpr, tpr, thresholds = roc_curve(y_test, y_proba[:, 1])<br>auc = roc_auc_score(y_test, y_proba[:, 1])<br><br>plt.plot(fpr, tpr, label=f'ROC (AUC={auc:.3f})')<br>plt.plot([0, 1], [0, 1], 'k--', label='Random')<br>plt.xlabel('False Positive Rate')<br>plt.ylabel('True Positive Rate')<br>plt.legend()``` | Q: What's good AUC?<br>A: >0.9 excellent, 0.7-0.9 good, <0.7 poor | `roc_curve(y_test, y_proba)` |
| **Precision-Recall Curve** | Tradeoff visualization for imbalanced data | ```python<br>from sklearn.metrics import precision_recall_curve<br><br>precision, recall, thresholds = precision_recall_curve(<br>    y_test,<br>    y_proba[:, 1]<br>)<br><br>plt.plot(recall, precision)<br>plt.xlabel('Recall')<br>plt.ylabel('Precision')<br>plt.title('Precision-Recall Curve')``` | Q: When to use PR vs ROC?<br>A: PR better for imbalanced datasets | `precision_recall_curve(y, proba)` |
| **Overfitting Check** | Training vs validation gap, generalization | ```python<br># Compare train and test performance<br>train_score = model.score(X_train, y_train)<br>test_score = model.score(X_test, y_test)<br>gap = train_score - test_score<br><br>if gap > 0.1:  # 10% difference<br>    print("⚠️ Potential overfitting detected")<br>    print(f"Train: {train_score:.4f}")<br>    print(f"Test: {test_score:.4f}")<br>    print(f"Gap: {gap:.4f}")``` | Q: How much gap is acceptable?<br>A: <5% excellent, 5-10% acceptable, >10% overfit | `train_score - test_score` |

### Priority: 🟢 **MEDIUM**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Calibration Curve** | Probability calibration assessment | ```python<br>from sklearn.calibration import calibration_curve<br><br>prob_true, prob_pred = calibration_curve(<br>    y_test,<br>    y_proba[:, 1],<br>    n_bins=10<br>)<br><br>plt.plot(prob_pred, prob_true, marker='o')<br>plt.plot([0, 1], [0, 1], 'k--', label='Perfect')<br>plt.xlabel('Predicted Probability')<br>plt.ylabel('True Probability')``` | Q: Why calibrate probabilities?<br>A: For decision-making based on probability thresholds | `calibration_curve(y, proba)` |
| **Learning Curves** | Sample size vs performance, data adequacy | ```python<br>from sklearn.model_selection import learning_curve<br><br>train_sizes, train_scores, val_scores = learning_curve(<br>    model,<br>    X_train, y_train,<br>    cv=5,<br>    train_sizes=np.linspace(0.1, 1.0, 10)<br>)<br><br>plt.plot(train_sizes, train_scores.mean(axis=1), label='Train')<br>plt.plot(train_sizes, val_scores.mean(axis=1), label='Val')<br>plt.xlabel('Training Set Size')<br>plt.ylabel('Score')``` | Q: How to interpret learning curves?<br>A: Converging scores = good, diverging = need more data | `learning_curve(model, X, y)` |

---

## Phase 7: Pipeline Productionization (60-120 min)

### Priority: 🔴 **CRITICAL**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **End-to-End Pipeline** | Full workflow automation, stage orchestration | ```python<br>def run_pipeline(config_dir='config'):<br>    # Stage 1: Load data<br>    data_config = load_config(f'{config_dir}/data_config.yaml')<br>    df = load_data(data_config)<br>    <br>    # Stage 2: Preprocess<br>    preprocess_config = load_config(f'{config_dir}/preprocessing_config.yaml')<br>    pipeline = PreprocessingPipeline(preprocess_config)<br>    X_transformed = pipeline.fit_transform(X_train)<br>    <br>    # Stage 3: Train<br>    model_config = load_config(f'{config_dir}/model_config.yaml')<br>    model = train_model(X_transformed, y_train, model_config)<br>    <br>    # Stage 4: Save<br>    save_artifacts(model, pipeline)``` | Q: Why orchestrate pipeline?<br>A: Reproducibility, automation, consistency | `run_pipeline(config_dir)` |
| **Training Script** | Command-line interface, argument parsing | ```python<br># scripts/train.py<br>import argparse<br><br>def main():<br>    parser = argparse.ArgumentParser()<br>    parser.add_argument('--config', default='config/model_config.yaml')<br>    parser.add_argument('--output-dir', default='outputs')<br>    args = parser.parse_args()<br>    <br>    run_pipeline(args.config, args.output_dir)<br><br>if __name__ == '__main__':<br>    main()``` | Q: Why use CLI?<br>A: Automation, scheduling, parameterization | `python scripts/train.py --config ...` |
| **Inference Script** | Batch prediction, new data processing | ```python<br># scripts/predict.py<br>def predict(model_path, input_path, output_path):<br>    model = joblib.load(model_path)<br>    pipeline = joblib.load(model_path.replace('model', 'pipeline'))<br>    <br>    df_new = pd.read_csv(input_path)<br>    X_new = pipeline.transform(df_new)<br>    predictions = model.predict(X_new)<br>    <br>    pd.DataFrame({'prediction': predictions}).to_csv(output_path)``` | Q: How to validate new data?<br>A: Same schema checks as training data | `python scripts/predict.py --input ...` |

### Priority: 🟡 **HIGH**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Logging** | Structured logging, audit trail, debugging | ```python<br>import logging<br><br>logging.basicConfig(<br>    level=logging.INFO,<br>    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',<br>    handlers=[<br>        logging.FileHandler('pipeline.log'),<br>        logging.StreamHandler()<br>    ]<br>)<br><br>logger = logging.getLogger(__name__)<br>logger.info("Pipeline started")<br>logger.error("Error occurred", exc_info=True)``` | Q: What to log?<br>A: Start/end of stages, errors, key metrics | `logger.info("message")` |
| **Error Handling** | Try-catch, graceful failures, informative messages | ```python<br>try:<br>    df = load_data(config)<br>except FileNotFoundError as e:<br>    logger.error(f"Data file not found: {e}")<br>    raise<br>except pd.errors.ParserError as e:<br>    logger.error(f"Failed to parse data: {e}")<br>    raise RuntimeError("Data loading failed") from e``` | Q: When to catch vs propagate?<br>A: Catch specific errors, add context, re-raise | `try-except-raise` |
| **Input Validation** | New data schema checking, feature verification | ```python<br>def validate_input(df_new, expected_features):<br>    missing = set(expected_features) - set(df_new.columns)<br>    if missing:<br>        raise ValueError(f"Missing features: {missing}")<br>    <br>    # Check dtypes match<br>    for feat in expected_features:<br>        expected_dtype = training_dtypes[feat]<br>        actual_dtype = df_new[feat].dtype<br>        if actual_dtype != expected_dtype:<br>            logger.warning(f"{feat}: {actual_dtype} != {expected_dtype}")``` | Q: What if new categorical value?<br>A: Handle in encoder with handle_unknown='ignore' | `validate_input(df_new, features)` |

### Priority: 🟢 **MEDIUM**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Containerization** | Docker, reproducible environments | ```dockerfile<br># Dockerfile<br>FROM python:3.9-slim<br><br>WORKDIR /app<br>COPY requirements.txt .<br>RUN pip install -r requirements.txt<br><br>COPY . .<br><br>CMD ["python", "scripts/train.py"]``` | Q: Why containerize?<br>A: Environment consistency, deployment portability | `docker build -t ml-pipeline .` |
| **Model Versioning** | Timestamps, semantic versioning, artifact tracking | ```python<br>from datetime import datetime<br><br>timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')<br>version = f"v1.2.3_{timestamp}"<br><br>model_path = f"models/model_{version}.pkl"<br>joblib.dump(model, model_path)<br><br>metadata = {<br>    'version': version,<br>    'timestamp': timestamp,<br>    'metrics': test_metrics,<br>    'git_commit': get_git_commit_hash()<br>}``` | Q: How to version models?<br>A: Timestamp + semantic version + git commit | `model_{version}.pkl` |

---

## Phase 8: Documentation & Knowledge Transfer (30-60 min)

### Priority: 🔴 **CRITICAL**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **README** | Project overview, quick start, comprehensive guide | ```markdown<br># Project Title<br><br>## Quick Start<br>```bash<br>python -m venv venv<br>source venv/bin/activate<br>pip install -r requirements.txt<br>python scripts/train.py<br>```<br><br>## Project Structure<br>[Folder descriptions]<br><br>## Usage<br>### Training<br>```bash<br>python scripts/train.py --config config/model_config.yaml<br>```<br><br>### Inference<br>```bash<br>python scripts/predict.py --model models/model.pkl --input data.csv<br>`````` | Q: What makes a good README?<br>A: Quick start, clear structure, examples, contact info | `README.md` |
| **Model Card** | Performance documentation, limitations, ethics | ```markdown<br># Model Card: XGBoost Classifier<br><br>## Model Details<br>- Type: XGBoost<br>- Version: 2025-01-15<br>- Hyperparameters: n_estimators=100, max_depth=6<br><br>## Performance<br>- Test F1: 0.8542<br>- Test Accuracy: 0.8721<br>- ROC-AUC: 0.9156<br><br>## Limitations<br>- Not suitable for real-time inference (>100ms latency)<br>- Requires numerical features<br><br>## Ethical Considerations<br>- No PII in training data<br>- Tested for fairness across demographic groups``` | Q: Who reads model cards?<br>A: Stakeholders, regulators, auditors, users | `models/model_card.md` |

### Priority: 🟡 **HIGH**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Usage Guide** | Training examples, inference examples, troubleshooting | ```markdown<br>## Training<br><br>### Basic Training<br>```bash<br>python scripts/train.py<br>```<br><br>### Custom Configuration<br>```bash<br>python scripts/train.py \<br>  --config config/custom_config.yaml \<br>  --output-dir outputs/experiment_1<br>```<br><br>### Common Issues<br>- **Error: "CUDA out of memory"**<br>  Solution: Reduce batch size in config``` | Q: How detailed should usage guide be?<br>A: Cover common workflows, edge cases, FAQs | `docs/usage_guide.md` |
| **Monitoring Guide** | Production metrics, drift detection, retraining triggers | ```markdown<br>## Monitoring Metrics<br><br>### Model Performance<br>- F1 score (daily)<br>- Precision/Recall (daily)<br>- Prediction distribution (hourly)<br><br>### Data Quality<br>- Missing value rate<br>- Feature drift (PSI > 0.2)<br>- Target distribution shift<br><br>### Retraining Triggers<br>- F1 drops > 5%<br>- Feature drift detected<br>- New data available (monthly)``` | Q: How often to monitor?<br>A: Real-time for critical, daily for standard | `docs/monitoring_guide.md` |

### Priority: 🟢 **MEDIUM**

| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|----------------------------------|-----|-------------|
| **Development Guide** | Contribution workflow, code style, testing | ```markdown<br>## Adding New Features<br><br>1. Create feature branch<br>2. Update `src/preprocessing/preprocessor.py`<br>3. Add config to `config/preprocessing_config.yaml`<br>4. Write tests in `tests/test_preprocessor.py`<br>5. Run tests: `pytest tests/`<br>6. Submit pull request<br><br>## Code Style<br>- Follow PEP 8<br>- Use type hints<br>- Write docstrings<br>- Max line length: 100``` | Q: How to enforce code style?<br>A: Use black, flake8, pre-commit hooks | `docs/development_guide.md` |
| **API Documentation** | Function signatures, parameters, examples | ```python<br>def train_model(X_train, y_train, config):<br>    """Train model with cross-validation.<br>    <br>    Args:<br>        X_train (pd.DataFrame): Training features<br>        y_train (pd.Series): Training target<br>        config (dict): Model configuration<br>            - model_type (str): Algorithm name<br>            - params (dict): Hyperparameters<br>            - cv_folds (int): Cross-validation folds<br>    <br>    Returns:<br>        model: Trained model instance<br>    <br>    Example:<br>        >>> model = train_model(X, y, config)<br>    """``` | Q: How to generate docs?<br>A: Use Sphinx, pdoc, or mkdocs | `def func(args):\n    """Docstring"""` |

---

## Cross-Phase Keywords

### Priority: 🔴 **CRITICAL**

| Keyword | Key Concepts | Phases | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|--------|----------------------------------|-----|-------------|
| **Data Leakage** | Train/test contamination, target leakage prevention | 2, 4, 5 | ```python<br># ❌ WRONG: Fit on entire dataset<br>scaler.fit(df[features])<br><br># ✅ CORRECT: Fit only on training<br>scaler.fit(X_train)<br>X_train_scaled = scaler.transform(X_train)<br>X_test_scaled = scaler.transform(X_test)  # Use same scaler!<br><br># ❌ WRONG: Target in features during encoding<br>target_enc.fit(df[['category', 'target']])<br><br># ✅ CORRECT: Separate X and y<br>target_enc.fit(X_train[['category']], y_train)``` | Q: Most common leakage sources?<br>A: Scaling before split, target in features, future data | `fit(X_train) then transform(X_test)` |
| **Reproducibility** | Random seeds, versioning, determinism | 0, 5, 7 | ```python<br># Set all random seeds<br>import random, numpy as np<br>random.seed(42)<br>np.random.seed(42)<br><br># Version everything<br>metadata = {<br>    'data_version': 'v1.2.3',<br>    'code_commit': get_git_hash(),<br>    'model_version': timestamp,<br>    'dependencies': get_package_versions()<br>}``` | Q: How to ensure reproducibility?<br>A: Seeds, version data/code/deps, document environment | `set_seeds(42)` |
| **Configuration-Driven** | YAML configs, parameter externalization | 1, 4, 5, 7 | ```yaml<br># config/pipeline_config.yaml<br>data:<br>  source: "data/train.csv"<br>  target: "label"<br><br>preprocessing:<br>  imputation: "median"<br>  scaling: "standard"<br><br>model:<br>  type: "xgboost"<br>  params:<br>    n_estimators: 100<br>    max_depth: 6``` | Q: Why externalize config?<br>A: Change params without code edits, version experiments | `load_config('config.yaml')` |

### Priority: 🟡 **HIGH**

| Keyword | Key Concepts | Phases | Excellent Real-world Application | FAQ | LOD Pattern |
|---------|--------------|--------|----------------------------------|-----|-------------|
| **Train/Test Split** | Data partitioning, stratification, holdout sets | 2, 4, 5 | ```python<br>from sklearn.model_selection import train_test_split<br><br>X_train, X_test, y_train, y_test = train_test_split(<br>    X, y,<br>    test_size=0.2,<br>    stratify=y,  # Preserve class distribution<br>    random_state=42<br>)<br><br># Or 70/15/15 split<br>X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42)<br>X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)``` | Q: What split ratio?<br>A: 80/20 standard, 70/15/15 if need validation | `train_test_split(X, y, test_size=0.2)` |
| **Class Imbalance** | SMOTE, class weights, stratification | 2, 4, 5 | ```python<br># Check imbalance<br>class_dist = y.value_counts(normalize=True)<br>print(f"Class distribution: {class_dist}")<br><br># Solution 1: Class weights<br>from sklearn.utils.class_weight import compute_class_weight<br>class_weights = compute_class_weight('balanced', classes=np.unique(y), y=y)<br>model = RandomForestClassifier(class_weight='balanced')<br><br># Solution 2: SMOTE<br>from imblearn.over_sampling import SMOTE<br>smote = SMOTE(random_state=42)<br>X_resampled, y_resampled = smote.fit_resample(X_train, y_train)``` | Q: When to use SMOTE?<br>A: Minority class <20%, but check if improves performance | `class_weight='balanced'` |

---

## Common Pitfalls & Solutions

| Pitfall | Why It Happens | Solution | LOD Pattern |
|---------|----------------|----------|-------------|
| **Training on full dataset before split** | Convenience, lack of awareness | Always split first, then preprocess separately | `train_test_split()` then `fit(X_train)` |
| **Not setting random seeds** | Forgetting, unaware of importance | Set seeds for all: split, model, CV, sampling | `random.seed(42); np.random.seed(42)` |
| **Evaluating only on training data** | Optimism, no test set created | Always evaluate on held-out test set | `model.score(X_test, y_test)` |
| **Hardcoding parameters in code** | Quick prototyping, technical debt | Externalize to config files from start | `config = load_config('config.yaml')` |
| **Ignoring baseline performance** | Eager to build complex models | Train dummy classifier first | `DummyClassifier().fit(X_train, y_train)` |
| **No error analysis** | Time pressure, satisfied with metrics | Analyze errors by confidence, patterns | `errors = y_test != y_pred` |
| **Missing documentation** | "Will document later", code is self-explanatory myth | Write docstrings as you code | `"""Docstring with Args, Returns, Example"""` |
| **Not versioning experiments** | Overwriting files, poor tracking | Timestamp all artifacts, track in metadata | `model_{timestamp}.pkl` |

---

## Workflow Patterns

### Pattern: Incremental Development
```python
# Phase 0: Validate can load data
df = load_data(config)
print(df.shape)  # ✅ Works!

# Phase 1: Validate can profile
profile = profile_data(df)  # ✅ Works!

# Phase 2: Validate can preprocess
pipeline = create_pipeline(config)
X_transformed = pipeline.fit_transform(X_train)  # ✅ Works!

# Phase 3: Validate can train
model = train_baseline(X_transformed, y_train)  # ✅ Works!

# Iterate...
```

### Pattern: Configuration-Driven Experimentation
```yaml
# experiment_1.yaml
model:
  type: "random_forest"
  params:
    n_estimators: 100

# experiment_2.yaml
model:
  type: "xgboost"
  params:
    n_estimators: 100
```

```bash
# Run experiments
python scripts/train.py --config experiments/experiment_1.yaml
python scripts/train.py --config experiments/experiment_2.yaml

# Compare results
python scripts/compare_experiments.py
```

### Pattern: Fail-Fast Validation
```python
# Validate at each stage
def run_pipeline():
    # Stage 1: Load
    df = load_data(config)
    validate_data(df, config)  # Fail fast if issues
    
    # Stage 2: Preprocess
    pipeline = create_pipeline(config)
    X_transformed = pipeline.fit_transform(X_train)
    validate_transformations(X_transformed)  # Fail fast
    
    # Stage 3: Train
    model = train_model(X_transformed, y_train, config)
    validate_model(model, X_val, y_val)  # Fail fast
```

---

## Summary: Priority Distribution

**🔴 CRITICAL (Master these first)**:
- Database download, project structure, gitignore
- Virtual environment, requirements.txt
- DataLoader, schema validation, quality checks
- Univariate/bivariate analysis, correlation
- Imputation, scaling, encoding, pipeline
- Baseline model, cross-validation, metrics
- Test evaluation, confusion matrix, error analysis
- End-to-end pipeline, training/inference scripts
- README, model card documentation

**🟡 HIGH (Learn thoroughly)**:
- Config loader, logger setup
- Data profiling, compression handling
- Outlier detection, heatmaps, statistical tests, PCA
- Missing indicators, log transform, binning
- Model factory, hyperparameter tuning, feature importance
- ROC/PR curves, overfitting checks
- Logging, error handling, input validation
- Usage guide, monitoring guide

**🟢 MEDIUM (Understand basics)**:
- Row count validation, target parsing
- Jupyter configuration, model config
- Range/categorical validation, quality reports
- Pair plots, interactions, temporal analysis
- Polynomial features, datetime extraction, serialization
- Early stopping, model cards, reproducibility
- Calibration curves, learning curves
- Containerization, model versioning
- Development guide, API documentation

**⚪ LOW (Nice to know)**:
- Advanced compression formats
- Complex datetime features
- Specialized model architectures
- Advanced monitoring dashboards

---

**End of EDA-MLP Keywords Reference Guide**

---

## Prompt_202601151155

### 01-Prompt

```
based on  `eda-mlp-detailed-implementation-steps.md`,
maintain universality, neutrality, project-agnostic,
generate `eda-mlp-keywords-reference-guide.md`:

**Organization**: by Phase, Priority, Keyword first-appearance (not alphabetical order)

## Priority Legend
- 🔴 **CRITICAL** - Used 80-100% in real-world, prepare extensively
- 🟡 **HIGH** - Used 40-80% in real-world, know well
- 🟢 **MEDIUM** - Used 10-40% in real-world, understand basics
- ⚪ **LOW** - Rarely used, nice to know
- 🔵 **LOD** - Maximum LOD pattern (implementation-focused)


```
## Phase 0: Setup & Data Acquisition

### Priority: 🔴 **CRITICAL**
| Keyword | Key Concepts | Excellent Real-world Application | FAQ | LOD Pattern |
| **Business Impact** | Cost-benefit analysis, ROI calculation, stakeholder communication, decision justification | ```python<br># Current (3% FPR, 12% recall):<br>fraud_loss = 396K_missed × $500 = $198M/month<br>support_cost = 15.4K_FP × $5 = $77K/month<br>total_cost = $198.1M/month<br><br># Fixed (5% FPR, 74% recall):<br>fraud_loss = 117K_missed × $500 = $58.5M/month<br>support_cost = 27K_FP × $5 = $135K/month<br>total_cost = $58.6M/month<br><br># ROI: $139.5M monthly savings for $58K additional cost = 2,397:1``` | ... | `BusinessImpactCalculator.calculate()` |
...

## Phase 1: Environment Setup & Configuration
...
```
```

#### 01-Response

```
I've created a comprehensive **EDA-MLP Keywords Reference Guide** that maintains universality, neutrality, and project-agnostic applicability. Here are the key features:

## **Organization Structure:**

**By Phase → Priority → First-Appearance Order**
- 8 phases (0-8) following natural workflow progression
- Priority levels within each phase: 🔴 CRITICAL → 🟡 HIGH → 🟢 MEDIUM → ⚪ LOW
- Keywords listed in order encountered during implementation (not alphabetical)

## **Key Sections:**

**1. Phase-by-Phase Keywords (Phases 0-8)**
- Phase 0: Setup & Data Acquisition (~10 keywords)
- Phase 1: Environment Setup (~12 keywords)
- Phase 2: Data Loading & Validation (~15 keywords)
- Phase 3: EDA (~20 keywords)
- Phase 4: Feature Engineering (~15 keywords)
- Phase 5: Model Training (~18 keywords)
- Phase 6: Model Evaluation (~12 keywords)
- Phase 7: Productionization (~10 keywords)
- Phase 8: Documentation (~8 keywords)

**2. Cross-Phase Keywords**
- Data Leakage (Phases 2, 4, 5)
- Reproducibility (Phases 0, 5, 7)
- Configuration-Driven (Phases 1, 4, 5, 7)
- Train/Test Split (Phases 2, 4, 5)
- Class Imbalance (Phases 2, 4, 5)

**3. Common Pitfalls & Solutions**
- Training on full dataset before split
- Not setting random seeds
- Evaluating only on training data
- Hardcoding parameters
- Ignoring baseline
- No error analysis
- Missing documentation

**4. Workflow Patterns**
- Incremental Development
- Configuration-Driven Experimentation
- Fail-Fast Validation

**5. Summary Priority Distribution**
- Lists which keywords to master first by priority level

## **Table Structure:**

Each keyword includes:
- **Key Concepts**: Core ideas and terminology
- **Excellent Real-world Application**: Practical code examples with best practices
- **FAQ**: Common questions and expert answers
- **LOD Pattern**: Implementation pattern reference for quick lookup

The guide covers **~120 keywords** total, with emphasis on real-world application and practical implementation patterns!
```

### 02-Prompt
