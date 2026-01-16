---
title: "Python Reference Guide for EDA-MLP Implementation"
author: "ML Engineering Team"
tags: [Python, Reference, EDA, MLP, Implementation]
date: 2026-01-16
version: 1.0
---

# Python Reference Guide for EDA-MLP Implementation

**Organization**: By Phase → Priority → Implementation Order (function/method first-appearance)

**Purpose**: Comprehensive Python function/method reference maintaining universality, neutrality, and project-agnostic applicability.

---

## Priority Legend

- 🔴 **CRITICAL** - Used 80-100% in real-world projects, master thoroughly
- 🟡 **HIGH** - Used 40-80% in real-world projects, know well
- 🟢 **MEDIUM** - Used 10-40% in real-world projects, understand basics
- ⚪ **LOW** - Used <10% in real-world projects, nice to know
- 🔵 **LOD** - Maximum Level of Detail pattern (implementation-focused)

---

## Phase 0: Setup & Data Acquisition

### Priority: 🔴 **CRITICAL**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Connect to SQLite database for data loading | sqlite3 | Connection | connect() | `database: str` | Connection object | Establishes connection to SQLite file | Data warehouse ETL pipelines validate DB availability before extraction | Q: What if DB doesn't exist?<br>A: sqlite3.OperationalError raised; catch and wrap in custom error | ✅ DO: Use context manager<br>❌ DON'T: Leave connections open | ```python<br>import sqlite3<br>try:<br>    conn = sqlite3.connect('data/db.db')<br>    # operations<br>except sqlite3.Error as e:<br>    raise DataQualityError(f"DB error: {e}")<br>finally:<br>    conn.close()``` |
| Execute SQL query to get table names | sqlite3 | Cursor | execute() | `sql: str` | Cursor object | Runs SQL query and returns cursor for results | DB introspection in ORMs (SQLAlchemy) to discover schema | Q: How to get multiple results?<br>A: Use cursor.fetchall() or fetchone() | ✅ DO: Parameterize queries<br>❌ DON'T: Use string formatting (SQL injection) | ```python<br>cursor = conn.cursor()<br>cursor.execute(<br>    "SELECT name FROM sqlite_master "<br>    "WHERE type='table'"<br>)<br>tables = cursor.fetchall()``` |
| Load SQL table into DataFrame | pandas | N/A | read_sql() | `sql: str, con: Connection` | DataFrame | Executes SQL and returns results as DataFrame | Batch loading in ML pipelines; use chunking for large tables | Q: Memory issues?<br>A: Use chunksize parameter or LIMIT clause | ✅ DO: Use parameterized queries<br>❌ DON'T: Load entire table if unnecessary | ```python<br>import pandas as pd<br>df = pd.read_sql(<br>    "SELECT * FROM table_name",<br>    conn<br>)<br># Or with chunking:<br>for chunk in pd.read_sql(<br>    "SELECT * FROM table",<br>    conn,<br>    chunksize=10000<br>):<br>    process(chunk)``` |
| Validate DataFrame schema matches expected | pandas | DataFrame | columns, dtypes | `df: DataFrame` | Index (columns), Series (dtypes) | Check column names and data types | Schema validation in data contracts (Great Expectations) | Q: How handle dtype variations?<br>A: Allow int64/float64 compatibility; both are numeric | ✅ DO: Validate early in pipeline<br>❌ DON'T: Assume schema without checking | ```python<br>expected_schema = {<br>    'feature_1': 'float64',<br>    'label': 'int64'<br>}<br>for col, dtype in expected_schema.items():<br>    if col not in df.columns:<br>        raise SchemaError(f"Missing: {col}")<br>    actual = str(df[col].dtype)<br>    if actual != dtype:<br>        if not (actual in ['int64','float64'] and dtype in ['int64','float64']):<br>            raise SchemaError(f"{col}: {actual}≠{dtype}")``` |
| Check minimum sample size for statistical validity | numpy | N/A | sqrt() | `n: int` | float | Calculate standard error for confidence intervals | Sample size determination in clinical trials, A/B testing | Q: Why 1000 minimum?<br>A: For 70/15/15 split → 150 test samples; ~67 phishing for CI<5% | ✅ DO: Calculate statistical power<br>❌ DON'T: Ignore sample size requirements | ```python<br>import numpy as np<br>MIN_ROWS = 1000<br>if len(df) < MIN_ROWS:<br>    raise DataQualityError(<br>        f"Only {len(df)} rows, "<br>        f"need ≥{MIN_ROWS}"<br>    )<br># CI width calculation<br>test_size = int(len(df) * 0.15)<br>p = 0.70  # Conservative estimate<br>ci_width = 1.96 * np.sqrt(p*(1-p)/test_size)<br>if ci_width > 0.05:<br>    print(f"Warning: CI width {ci_width:.3f}")``` |
| Validate target variable encoding | pandas | Series | unique() | `series: Series` | ndarray | Get unique values in a column | Label validation in classifiers to catch encoding errors | Q: What if {-1, 1}?<br>A: Must convert to {0, 1} for sklearn compatibility | ✅ DO: Check encoding immediately<br>❌ DON'T: Assume labels are correct | ```python<br>unique_labels = set(df['label'].unique())<br>expected = {0, 1}<br>if unique_labels != expected:<br>    raise DataQualityError(<br>        f"Labels must be {expected}, "<br>        f"found {unique_labels}"<br>    )``` |
| Calculate class distribution | pandas | Series | value_counts() | `normalize: bool = False` | Series | Count frequency of each unique value | Class imbalance detection in fraud detection, medical diagnosis | Q: What's the purpose?<br>A: Informs sampling strategy (SMOTE vs stratification) | ✅ DO: Use normalize=True for percentages<br>❌ DON'T: Ignore class imbalance | ```python<br>class_dist = df['label'].value_counts()<br>class_pcts = df['label'].value_counts(<br>    normalize=True<br>)<br>print(f"Distribution:\n{class_pcts}")<br># Check imbalance<br>min_prop = class_pcts.min()<br>if min_prop < 0.10:<br>    severity = "SEVERE"<br>elif min_prop < 0.30:<br>    severity = "MODERATE"<br>else:<br>    severity = "MILD"<br>print(f"Imbalance: {severity}")``` |

### Priority: 🟡 **HIGH**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Create isolated Python environment | venv | N/A | create() | `env_dir: str` | None | Creates fresh virtual environment directory | Dependency isolation in Docker, Lambda functions | Q: venv vs conda?<br>A: venv built-in/lighter; conda better for non-Python deps | ✅ DO: One venv per project<br>❌ DON'T: Install packages globally | ```python<br>import venv<br>venv.create('venv', with_pip=True)<br># Or CLI:<br># python -m venv venv<br># source venv/bin/activate``` |
| Validate data file exists before processing | os.path | N/A | exists() | `path: str` | bool | Check if file/directory exists | Pre-flight checks in ETL jobs | Q: What if corrupted?<br>A: exists() only checks presence; validate content separately | ✅ DO: Check early in pipeline<br>❌ DON'T: Assume file exists | ```python<br>import os<br>db_path = "data/phishing.db"<br>if not os.path.exists(db_path):<br>    raise FileNotFoundError(<br>        f"Database not found: {db_path}"<br>    )<br># Or use pathlib:<br>from pathlib import Path<br>if not Path(db_path).exists():<br>    raise FileNotFoundError(...)``` |

---

## Phase 1: Environment Setup & Configuration

### Priority: 🔴 **CRITICAL**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Load YAML configuration file | yaml | N/A | safe_load() | `stream: TextIO` | dict | Parse YAML into Python dictionary | Microservices configs (Kubernetes ConfigMaps) | Q: Why YAML over JSON?<br>A: Comments, multi-line strings, more readable | ✅ DO: Use safe_load (security)<br>❌ DON'T: Use load() (unsafe) | ```python<br>import yaml<br>def load_config(path):<br>    with open(path, 'r') as f:<br>        config = yaml.safe_load(f)<br>    return config<br><br># Usage<br>config = load_config('config/data.yaml')<br>db_path = config['data_sources']['train']``` |
| Save configuration to YAML | yaml | N/A | dump() | `data: dict, stream: TextIO` | None | Serialize Python dict to YAML file | Experiment tracking (MLflow, W&B) | Q: When to use?<br>A: After hyperparameter tuning for reproducibility | ✅ DO: Create parent dirs first<br>❌ DON'T: Overwrite without backup | ```python<br>import yaml<br>from pathlib import Path<br><br>def save_config(config, path):<br>    Path(path).parent.mkdir(<br>        parents=True, exist_ok=True<br>    )<br>    with open(path, 'w') as f:<br>        yaml.dump(<br>            config, f,<br>            default_flow_style=False<br>        )``` |
| Setup structured logging | logging | Logger | getLogger() | `name: str` | Logger | Create logger instance for module | Centralized logging in production ML (CloudWatch) | Q: Why both file and console?<br>A: Console for dev, file for production audit | ✅ DO: Use __name__ for logger<br>❌ DON'T: Use root logger directly | ```python<br>import logging<br><br>def setup_logger(name, log_file=None):<br>    logger = logging.getLogger(name)<br>    logger.setLevel(logging.INFO)<br>    <br>    # Console handler<br>    console = logging.StreamHandler()<br>    console.setLevel(logging.INFO)<br>    <br>    # File handler (optional)<br>    if log_file:<br>        file_handler = logging.FileHandler(<br>            log_file<br>        )<br>        file_handler.setLevel(logging.DEBUG)<br>        logger.addHandler(file_handler)<br>    <br>    # Format<br>    fmt = logging.Formatter(<br>        '%(asctime)s - %(name)s - '<br>        '%(levelname)s - %(message)s'<br>    )<br>    console.setFormatter(fmt)<br>    logger.addHandler(console)<br>    <br>    return logger<br><br># Usage<br>logger = setup_logger(__name__, 'pipeline.log')<br>logger.info("Pipeline started")<br>logger.error("Error occurred", exc_info=True)``` |

### Priority: 🟡 **HIGH**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Create directory hierarchy | pathlib | Path | mkdir() | `parents: bool, exist_ok: bool` | None | Create directory and parents if needed | Project scaffolding, output directories | Q: What if exists?<br>A: exist_ok=True prevents error | ✅ DO: Use exist_ok=True for idempotency<br>❌ DON'T: Ignore FileExistsError | ```python<br>from pathlib import Path<br><br># Create nested structure<br>Path("project/data/raw").mkdir(<br>    parents=True, exist_ok=True<br>)<br>Path("project/src/models").mkdir(<br>    parents=True, exist_ok=True<br>)<br><br># Or all at once<br>dirs = [<br>    'data/raw', 'data/processed',<br>    'src/preprocessing', 'models',<br>    'outputs', 'config'<br>]<br>for d in dirs:<br>    Path(f"project/{d}").mkdir(<br>        parents=True, exist_ok=True<br>    )``` |

---

## Phase 2: Data Loading & Initial Validation

### Priority: 🔴 **CRITICAL**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Detect file format from extension | pathlib | Path | suffix | N/A | str | Get file extension | Auto-detection in data catalogs (AWS Glue) | Q: What about .csv.gz?<br>A: Use suffixes (plural) or strip compression first | ✅ DO: Handle compression extensions<br>❌ DON'T: Assume single extension | ```python<br>from pathlib import Path<br><br>def detect_format(file_path):<br>    path = Path(file_path)<br>    # Handle compression<br>    if path.suffix in ['.gz', '.bz2', '.zip']:<br>        path = Path(path.stem)<br>    <br>    ext_map = {<br>        '.csv': 'csv',<br>        '.parquet': 'parquet',<br>        '.xlsx': 'excel',<br>        '.json': 'json',<br>        '.db': 'sqlite'<br>    }<br>    <br>    fmt = ext_map.get(path.suffix)<br>    if not fmt:<br>        raise ValueError(<br>            f"Unsupported format: {path.suffix}"<br>        )<br>    return fmt``` |
| Load CSV file | pandas | N/A | read_csv() | `filepath: str, **kwargs` | DataFrame | Read CSV into DataFrame | ETL tools (Talend, Informatica) | Q: Wrong delimiter?<br>A: Override with sep parameter | ✅ DO: Specify encoding explicitly<br>❌ DON'T: Ignore parsing errors | ```python<br>import pandas as pd<br><br># Basic usage<br>df = pd.read_csv('data.csv')<br><br># With common parameters<br>df = pd.read_csv(<br>    'data.csv',<br>    sep=',',<br>    encoding='utf-8',<br>    compression='infer',<br>    na_values=['', 'NA', 'null']<br>)<br><br># Auto-detect delimiter<br>df = pd.read_csv(<br>    'data.csv',<br>    sep=None,  # Auto-detect<br>    engine='python'<br>)``` |
| Check for missing values | pandas | DataFrame | isnull() | N/A | DataFrame (boolean) | Identify null/NaN values | Data quality monitoring (dbt tests) | Q: What threshold?<br>A: Domain-specific; <10% typical | ✅ DO: Calculate percentages<br>❌ DON'T: Ignore missing patterns | ```python<br># Check nulls per column<br>null_counts = df.isnull().sum()<br>null_pcts = df.isnull().sum() / len(df) * 100<br><br>print("Null percentages:")<br>print(null_pcts[null_pcts > 0])<br><br># Validate against threshold<br>max_null_pct = 10  # 10%<br>violations = null_pcts[null_pcts > max_null_pct]<br>if len(violations) > 0:<br>    raise QualityError(<br>        f"Excessive nulls: {violations.to_dict()}"<br>    )``` |
| Identify duplicate rows | pandas | DataFrame | duplicated() | `subset: List[str] = None` | Series (boolean) | Find duplicate rows | Deduplication in CRM, transaction systems | Q: All columns vs key columns?<br>A: Key columns more meaningful | ✅ DO: Specify key columns<br>❌ DON'T: Drop without investigation | ```python<br># Check all columns<br>dup_mask = df.duplicated()<br>n_dups = dup_mask.sum()<br>print(f"Duplicates (all cols): {n_dups}")<br><br># Check specific key columns<br>key_cols = ['user_id', 'transaction_id']<br>dup_mask = df.duplicated(subset=key_cols)<br>n_dups = dup_mask.sum()<br><br># Get duplicate rows<br>duplicates = df[dup_mask]<br>print(f"Found {n_dups} duplicates")<br><br># Remove duplicates<br>df_clean = df.drop_duplicates(<br>    subset=key_cols,<br>    keep='first'  # or 'last', False<br>)``` |

### Priority: 🟡 **HIGH**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Get statistical summary | pandas | DataFrame | describe() | `include: str = 'all'` | DataFrame | Calculate summary statistics | Data profiling, initial EDA | Q: What stats included?<br>A: count, mean, std, min, quartiles, max | ✅ DO: Use include='all' for all types<br>❌ DON'T: Only look at numeric columns | ```python<br># Numeric columns only (default)<br>summary = df.describe()<br><br># All columns<br>summary = df.describe(include='all')<br><br># Add custom stats<br>summary = df.describe()<br>summary.loc['skewness'] = df.skew()<br>summary.loc['kurtosis'] = df.kurtosis()<br>summary.loc['missing'] = df.isnull().sum()<br><br>print(summary)``` |
| Count unique values per column | pandas | DataFrame | nunique() | N/A | Series | Count distinct values in each column | Cardinality assessment, encoding decisions | Q: High cardinality threshold?<br>A: >20 unique values → consider target encoding | ✅ DO: Check before encoding<br>❌ DON'T: One-hot encode high cardinality | ```python<br># Unique counts<br>cardinality = df.nunique()<br>print("Cardinality:")<br>print(cardinality.sort_values(ascending=False))<br><br># Identify high cardinality categoricals<br>cat_cols = df.select_dtypes(<br>    include=['object', 'category']<br>).columns<br><br>high_cardinality = []<br>for col in cat_cols:<br>    unique_count = df[col].nunique()<br>    if unique_count > 20:<br>        high_cardinality.append({<br>            'column': col,<br>            'unique_count': unique_count<br>        })<br><br>print(f"High cardinality cols: {high_cardinality}")``` |

---

## Phase 3: Exploratory Data Analysis

### Priority: 🔴 **CRITICAL**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Create histograms for distributions | pandas | DataFrame | hist() | `bins: int, figsize: tuple` | ndarray of axes | Visualize numeric feature distributions | Distribution analysis in finance, healthcare | Q: How many bins?<br>A: sqrt(n) or 50 for n=1000-100000 | ✅ DO: Save plots to file<br>❌ DON'T: Use too few bins | ```python<br>import matplotlib.pyplot as plt<br><br># All numeric columns<br>df[numeric_cols].hist(<br>    bins=50,<br>    figsize=(20, 15)<br>)<br>plt.tight_layout()<br>plt.savefig('outputs/distributions.png')<br>plt.close()<br><br># Single column with custom bins<br>df['age'].hist(bins=30, edgecolor='black')<br>plt.xlabel('Age')<br>plt.ylabel('Frequency')<br>plt.title('Age Distribution')<br>plt.show()``` |
| Calculate Pearson correlation | pandas | DataFrame | corr() | `method: str = 'pearson'` | DataFrame | Pairwise correlation matrix | Feature selection, multicollinearity detection | Q: Pearson vs Spearman?<br>A: Pearson=linear, Spearman=monotonic | ✅ DO: Check for high correlation (>0.7)<br>❌ DON'T: Ignore correlated features | ```python<br># Calculate correlation matrix<br>corr_matrix = df[numeric_cols].corr()<br><br># Find high correlations<br>high_corr = []<br>for i in range(len(corr_matrix)):<br>    for j in range(i+1, len(corr_matrix)):<br>        corr_val = corr_matrix.iloc[i, j]<br>        if abs(corr_val) > 0.7:<br>            high_corr.append({<br>                'feature_1': corr_matrix.columns[i],<br>                'feature_2': corr_matrix.columns[j],<br>                'correlation': corr_val<br>            })<br><br>print(f"High correlations (>0.7): {len(high_corr)}")<br>for item in high_corr[:5]:<br>    print(item)``` |
| Calculate skewness | pandas | Series | skew() | N/A | float | Measure distribution asymmetry | Identify transformation needs | Q: What's acceptable?<br>A: |skew| < 1 for linear models | ✅ DO: Transform highly skewed features<br>❌ DON'T: Ignore for tree models | ```python<br>import numpy as np<br><br># Calculate skewness for all numeric<br>skewness = df[numeric_cols].skew()<br>print("Skewness:")<br>print(skewness.sort_values(ascending=False))<br><br># Identify highly skewed (|skew| > 1)<br>highly_skewed = skewness[abs(skewness) > 1]<br>print(f"\nHighly skewed: {len(highly_skewed)}")<br><br># Classify skewness<br>for col in numeric_cols:<br>    skew_val = df[col].skew()<br>    if abs(skew_val) < 0.5:<br>        level = "symmetric"<br>    elif abs(skew_val) < 1:<br>        level = "moderate"<br>    else:<br>        level = "highly skewed"<br>    print(f"{col}: {skew_val:.2f} ({level})")``` |

### Priority: 🟡 **HIGH**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Create correlation heatmap | seaborn | N/A | heatmap() | `data: DataFrame, annot: bool, cmap: str` | Axes | Visualize correlation matrix | Correlation analysis in finance, genomics | Q: Why mask upper triangle?<br>A: Matrix is symmetric, avoid redundancy | ✅ DO: Use diverging colormap<br>❌ DON'T: Show redundant half | ```python<br>import seaborn as sns<br>import numpy as np<br>import matplotlib.pyplot as plt<br><br># Calculate correlation<br>corr = df[numeric_cols].corr()<br><br># Mask upper triangle<br>mask = np.triu(<br>    np.ones_like(corr, dtype=bool)<br>)<br><br># Create heatmap<br>plt.figure(figsize=(12, 10))<br>sns.heatmap(<br>    corr,<br>    mask=mask,<br>    annot=True,<br>    fmt='.2f',<br>    cmap='coolwarm',<br>    center=0,<br>    square=True,<br>    linewidths=0.5<br>)<br>plt.title('Correlation Heatmap')<br>plt.tight_layout()<br>plt.savefig('outputs/heatmap.png')<br>plt.close()``` |
| Detect outliers using IQR | numpy | N/A | quantile() | `a: array, q: float` | ndarray | Calculate percentiles | Fraud detection, network security | Q: IQR vs z-score?<br>A: IQR robust to non-normal data | ✅ DO: Investigate outliers before removing<br>❌ DON'T: Auto-remove without analysis | ```python<br>import numpy as np<br><br>def detect_outliers_iqr(df, column):<br>    Q1 = df[column].quantile(0.25)<br>    Q3 = df[column].quantile(0.75)<br>    IQR = Q3 - Q1<br>    <br>    lower_bound = Q1 - 1.5 * IQR<br>    upper_bound = Q3 + 1.5 * IQR<br>    <br>    outliers = (<br>        (df[column] < lower_bound) |<br>        (df[column] > upper_bound)<br>    )<br>    <br>    return {<br>        'column': column,<br>        'Q1': Q1,<br>        'Q3': Q3,<br>        'IQR': IQR,<br>        'lower_bound': lower_bound,<br>        'upper_bound': upper_bound,<br>        'n_outliers': outliers.sum(),<br>        'pct_outliers': outliers.sum()/len(df)*100<br>    }<br><br># Usage<br>for col in numeric_cols:<br>    info = detect_outliers_iqr(df, col)<br>    if info['pct_outliers'] > 5:<br>        print(f"{col}: {info['n_outliers']} outliers")``` |
| Chi-square test for independence | scipy.stats | N/A | chi2_contingency() | `observed: array` | tuple (chi2, p, dof, expected) | Test categorical variable association | Epidemiology (smoking vs cancer) | Q: What does p-value mean?<br>A: Probability of association if independent | ✅ DO: Check expected frequencies >5<br>❌ DON'T: Use with small samples | ```python<br>from scipy.stats import chi2_contingency<br>import pandas as pd<br><br># Create contingency table<br>contingency = pd.crosstab(<br>    df['category'],<br>    df['target']<br>)<br><br># Perform chi-square test<br>chi2, p_value, dof, expected = \<br>    chi2_contingency(contingency)<br><br>print(f"Chi-square: {chi2:.4f}")<br>print(f"p-value: {p_value:.4f}")<br>print(f"DOF: {dof}")<br><br># Interpret<br>alpha = 0.05<br>if p_value < alpha:<br>    print("Variables are associated (reject H0)")<br>else:<br>    print("Variables are independent (fail to reject H0)")``` |

---

## Phase 4: Feature Engineering & Preprocessing

### Priority: 🔴 **CRITICAL**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Impute missing values | sklearn.impute | SimpleImputer | fit_transform() | `strategy: str` | ndarray | Replace missing with statistical value | Missing data handling in healthcare, finance | Q: Why median over mean?<br>A: Robust to outliers | ✅ DO: Fit on train, transform on test<br>❌ DON'T: Fit on entire dataset | ```python<br>from sklearn.impute import SimpleImputer<br><br># Numeric: median (robust)<br>num_imputer = SimpleImputer(<br>    strategy='median'<br>)<br>X_train[numeric_cols] = num_imputer.fit_transform(<br>    X_train[numeric_cols]<br>)<br>X_test[numeric_cols] = num_imputer.transform(<br>    X_test[numeric_cols]<br>)<br><br># Categorical: most frequent<br>cat_imputer = SimpleImputer(<br>    strategy='most_frequent'<br>)<br>X_train[cat_cols] = cat_imputer.fit_transform(<br>    X_train[cat_cols]<br>)``` |
| Scale features | sklearn.preprocessing | StandardScaler | fit_transform() | N/A | ndarray | Standardize to mean=0, std=1 | Neural networks, SVM (distance-based) | Q: When to scale?<br>A: Always for distance-based models; optional for trees | ✅ DO: Scale after train/test split<br>❌ DON'T: Fit scaler on test data | ```python<br>from sklearn.preprocessing import StandardScaler<br><br>scaler = StandardScaler()<br>X_train_scaled = scaler.fit_transform(X_train)<br>X_test_scaled = scaler.transform(X_test)<br><br># Verify: mean≈0, std≈1
print(f"Mean: {X_train_scaled.mean(axis=0)}")
print(f"Std: {X_train_scaled.std(axis=0)}")``` |
| One-hot encode categorical variables | sklearn.preprocessing | OneHotEncoder | fit_transform() | `drop: str, handle_unknown: str` | sparse matrix | Create binary columns for each category | Encoding in production systems (user country) | Q: One-hot vs target encoding?<br>A: One-hot for <10 categories, target for >20 | ✅ DO: Set handle_unknown='ignore'<br>❌ DON'T: Create too many columns | ```python
from sklearn.preprocessing import OneHotEncoder

# Create encoder
encoder = OneHotEncoder(
    drop='first',  # Avoid multicollinearity
    handle_unknown='ignore',  # Handle new categories
    sparse_output=False
)

# Fit and transform
X_train_encoded = encoder.fit_transform(
    X_train[cat_cols]
)
X_test_encoded = encoder.transform(
    X_test[cat_cols]
)

# Get feature names
feature_names = encoder.get_feature_names_out(
    cat_cols
)
print(f"Created {len(feature_names)} features")``` |
| Build preprocessing pipeline | sklearn.pipeline | Pipeline | __init__() | `steps: List[tuple]` | Pipeline object | Chain transformers in correct order | Production ML pipelines (Kubeflow, SageMaker) | Q: Why order matters?<br>A: Impute → engineer → encode → scale | ✅ DO: Follow correct transformation order<br>❌ DON'T: Scale before encoding | ```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

# Define transformers
numeric_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

categorical_transformer = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(
        drop='first',
        handle_unknown='ignore'
    ))
])

# Combine transformers
preprocessor = ColumnTransformer([
    ('num', numeric_transformer, numeric_cols),
    ('cat', categorical_transformer, cat_cols)
])

# Fit and transform
X_train_processed = preprocessor.fit_transform(X_train)
X_test_processed = preprocessor.transform(X_test)``` |

### Priority: 🟡 **HIGH**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Apply log transformation | numpy | N/A | log1p() | `x: array` | ndarray | Log transform to reduce skewness | Finance (returns), sales forecasting | Q: Why log1p not log?<br>A: log1p(x) = log(1+x); handles x=0 | ✅ DO: Use for right-skewed features<br>❌ DON'T: Apply to negative values | ```python
import numpy as np

# For right-skewed features (skew > 1)
df['income_log'] = np.log1p(df['income'])

# Verify skewness reduction
print(f"Original skew: {df['income'].skew():.2f}")
print(f"Log skew: {df['income_log'].skew():.2f}")

# For multiple columns
skewed_cols = ['price', 'revenue', 'population']
for col in skewed_cols:
    df[f'{col}_log'] = np.log1p(df[col])``` |
| Create polynomial features | sklearn.preprocessing | PolynomialFeatures | fit_transform() | `degree: int, interaction_only: bool` | ndarray | Generate interaction terms | Regression (age×income), recommendation systems | Q: Why interaction_only?<br>A: x² less informative than x×y | ✅ DO: Use degree=2 for interactions<br>❌ DON'T: Create too many features | ```python
from sklearn.preprocessing import PolynomialFeatures

poly = PolynomialFeatures(
    degree=2,
    interaction_only=True,  # No x²
    include_bias=False
)

X_poly = poly.fit_transform(
    X[['age', 'income']]
)

# Get feature names
feature_names = poly.get_feature_names_out()
print(f"Created features: {feature_names}")
# ['age', 'income', 'age income']``` |
| Serialize pipeline to disk | joblib | N/A | dump() | `value: object, filename: str` | None | Save fitted pipeline for reuse | Model deployment, inference consistency | Q: joblib vs pickle?<br>A: joblib faster for large numpy arrays | ✅ DO: Save pipeline with model<br>❌ DON'T: Lose preprocessing steps | ```python
import joblib
from datetime import datetime

# Save pipeline
timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
pipeline_path = f'models/pipeline_{timestamp}.pkl'
joblib.dump(preprocessor, pipeline_path)

# Load pipeline
loaded_pipeline = joblib.load(pipeline_path)

# Apply to new data
X_new_processed = loaded_pipeline.transform(X_new)``` |

---

## Phase 5: Model Development & Training

### Priority: 🔴 **CRITICAL**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Split data into train/test sets | sklearn.model_selection | N/A | train_test_split() | `test_size: float, stratify: array, random_state: int` | tuple of arrays | Partition data for training and evaluation | Standard practice in all ML projects | Q: What split ratio?<br>A: 80/20 standard, 70/15/15 if need validation | ✅ DO: Stratify for classification<br>❌ DON'T: Fit on entire dataset | ```python
from sklearn.model_selection import train_test_split

# 80/20 split with stratification
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    stratify=y,  # Preserve class distribution
    random_state=42
)

# 70/15/15 split (train/val/test)
X_train, X_temp, y_train, y_temp = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y
)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp, y_temp, test_size=0.5, random_state=42, stratify=y_temp
)

print(f"Train: {len(X_train)}, Val: {len(X_val)}, Test: {len(X_test)}")``` |
| Train baseline model | sklearn.dummy | DummyClassifier | fit() | `strategy: str` | self | Establish performance lower bound | Baseline comparison in ML projects | Q: Why baseline?<br>A: Ensures ML adds value over naive approach | ✅ DO: Always train baseline first<br>❌ DON'T: Skip baseline | ```python
from sklearn.dummy import DummyClassifier
from sklearn.metrics import accuracy_score, f1_score

# Create baseline (predicts most frequent class)
baseline = DummyClassifier(strategy='most_frequent')
baseline.fit(X_train, y_train)

# Evaluate
y_pred_baseline = baseline.predict(X_test)
baseline_acc = accuracy_score(y_test, y_pred_baseline)
baseline_f1 = f1_score(y_test, y_pred_baseline, average='weighted')

print(f"Baseline Accuracy: {baseline_acc:.4f}")
print(f"Baseline F1: {baseline_f1:.4f}")
print("Any model must beat this!")``` |
| Perform cross-validation | sklearn.model_selection | N/A | cross_val_score() | `estimator: model, X: array, y: array, cv: int, scoring: str` | ndarray | Estimate generalization performance | Model evaluation in research, competitions | Q: How many folds?<br>A: 5 or 10, stratified for imbalanced | ✅ DO: Use StratifiedKFold for classification<br>❌ DON'T: Use on test set | ```python
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.ensemble import RandomForestClassifier

# Create model
model = RandomForestClassifier(random_state=42)

# Cross-validation
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(
    model, X_train, y_train,
    cv=cv,
    scoring='f1_weighted',
    n_jobs=-1
)

print(f"CV Scores: {scores}")
print(f"Mean: {scores.mean():.4f} ± {scores.std():.4f}")``` |
| Train model | sklearn.ensemble | RandomForestClassifier | fit() | `X: array, y: array` | self | Learn patterns from training data | Core of supervised learning | Q: When to use?<br>A: After preprocessing, on training data only | ✅ DO: Fit only on training data<br>❌ DON'T: Touch test set during training | ```python
from sklearn.ensemble import RandomForestClassifier

# Create and train model
model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    min_samples_split=5,
    random_state=42,
    n_jobs=-1
)

# Fit on training data
model.fit(X_train, y_train)

# Make predictions
y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)``` |
| Calculate classification metrics | sklearn.metrics | N/A | classification_report() | `y_true: array, y_pred: array` | str | Comprehensive metric summary | Performance reporting in production | Q: Which metric to optimize?<br>A: Depends on cost of FP vs FN | ✅ DO: Report multiple metrics<br>❌ DON'T: Only look at accuracy | ```python
from sklearn.metrics import (
    classification_report,
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score
)

# Comprehensive report
print(classification_report(y_test, y_pred))

# Individual metrics
metrics = {
    'accuracy': accuracy_score(y_test, y_pred),
    'precision': precision_score(y_test, y_pred, average='weighted'),
    'recall': recall_score(y_test, y_pred, average='weighted'),
    'f1': f1_score(y_test, y_pred, average='weighted'),
    'roc_auc': roc_auc_score(y_test, y_proba[:, 1])
}

for metric, value in metrics.items():
    print(f"{metric}: {value:.4f}")``` |

### Priority: 🟡 **HIGH**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Hyperparameter tuning | sklearn.model_selection | GridSearchCV | fit() | `estimator: model, param_grid: dict, cv: int, scoring: str` | self | Find optimal hyperparameters | Hyperparameter tuning in research, competitions | Q: Grid vs Random search?<br>A: Grid exhaustive but slow; Random faster | ✅ DO: Use scoring metric carefully<br>❌ DON'T: Overfit to validation | ```python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

# Define parameter grid
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [5, 10, 15, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Create grid search
grid_search = GridSearchCV(
    RandomForestClassifier(random_state=42),
    param_grid,
    cv=5,
    scoring='f1_weighted',
    n_jobs=-1,
    verbose=1
)

# Fit
grid_search.fit(X_train, y_train)

# Best parameters
print(f"Best params: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_:.4f}")

# Use best model
best_model = grid_search.best_estimator_``` |
| Get feature importance | sklearn.ensemble | RandomForestClassifier | feature_importances_ | N/A | ndarray | Rank features by predictive power | Feature selection, business insights | Q: How to interpret?<br>A: Relative ranking, not causal | ✅ DO: Inspect top features<br>❌ DON'T: Assume causation | ```python
import pandas as pd

# Get importances (for tree-based models)
importances = model.feature_importances_

# Create DataFrame
feature_importance = pd.DataFrame({
    'feature': feature_names,
    'importance': importances
}).sort_values('importance', ascending=False)

print("Top 10 features:")
print(feature_importance.head(10))

# For linear models
# importances = np.abs(model.coef_).flatten()``` |
| Handle class imbalance with weights | sklearn.utils.class_weight | N/A | compute_class_weight() | `class_weight: str, classes: array, y: array` | ndarray | Balance classes in loss function | Fraud detection, medical diagnosis | Q: When to use?<br>A: Minority class 10-30% | ✅ DO: Try class weights before SMOTE<br>❌ DON'T: Always use SMOTE | ```python
from sklearn.utils.class_weight import compute_class_weight
import numpy as np

# Compute class weights
class_weights = compute_class_weight(
    'balanced',
    classes=np.unique(y_train),
    y=y_train
)

# Create dict
weight_dict = dict(enumerate(class_weights))
print(f"Class weights: {weight_dict}")

# Use in model
model = RandomForestClassifier(
    class_weight='balanced',  # or weight_dict
    random_state=42
)``` |

### Priority: 🟢 **MEDIUM**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Set random seeds for reproducibility | random, numpy | N/A | seed() | `seed: int` | None | Ensure deterministic results | Reproducible experiments, debugging | Q: Why set seeds?<br>A: Reproducible results, fair comparison | ✅ DO: Set all seeds at start<br>❌ DON'T: Forget deep learning seeds | ```python
import random
import numpy as np

def set_seeds(seed=42):
    """Set all random seeds for reproducibility."""
    random.seed(seed)
    np.random.seed(seed)
    # For deep learning:
    # import torch
    # torch.manual_seed(seed)
    # import tensorflow as tf
    # tf.random.set_seed(seed)

set_seeds(42)
print("All seeds set to 42")``` |

---

## Phase 6: Model Evaluation & Analysis

### Priority: 🔴 **CRITICAL**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Create confusion matrix | sklearn.metrics | N/A | confusion_matrix() | `y_true: array, y_pred: array` | ndarray | Visualize TP, FP, TN, FN | Error pattern identification | Q: How to reduce FP vs FN?<br>A: Adjust threshold, use class weights | ✅ DO: Normalize for imbalanced data<br>❌ DON'T: Only look at diagonal | ```python
from sklearn.metrics import confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# Create confusion matrix
cm = confusion_matrix(y_test, y_pred)

# Visualize
plt.figure(figsize=(8, 6))
sns.heatmap(
    cm,
    annot=True,
    fmt='d',
    cmap='Blues',
    xticklabels=['Class 0', 'Class 1'],
    yticklabels=['Class 0', 'Class 1']
)
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.title('Confusion Matrix')
plt.savefig('outputs/confusion_matrix.png')

# Interpret
# [[TN, FP],
#  [FN, TP]]
print(f"TN: {cm[0,0]}, FP: {cm[0,1]}")
print(f"FN: {cm[1,0]}, TP: {cm[1,1]}")``` |
| Analyze prediction errors | numpy | N/A | where() | `condition: array` | tuple of arrays | Identify misclassified samples | Error analysis, model debugging | Q: What to do with insights?<br>A: Improve features, collect more data | ✅ DO: Group errors by confidence<br>❌ DON'T: Ignore error patterns | ```python
import numpy as np

# Find errors
errors = y_test != y_pred
error_indices = np.where(errors)[0]

# Get prediction confidence
confidence = np.max(y_proba, axis=1)

# Group by confidence level
low_conf_errors = errors & (confidence < 0.7)
medium_conf_errors = errors & ((confidence >= 0.7) & (confidence < 0.9))
high_conf_errors = errors & (confidence >= 0.9)

print(f"Total errors: {errors.sum()}")
print(f"Low confidence: {low_conf_errors.sum()}")
print(f"Medium confidence: {medium_conf_errors.sum()}")
print(f"High confidence: {high_conf_errors.sum()}")

# Analyze high confidence errors (model is certain but wrong)
high_conf_error_samples = X_test[high_conf_errors]
print(f"\nHigh confidence errors need investigation!")``` |

### Priority: 🟡 **HIGH**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Plot ROC curve | sklearn.metrics | N/A | roc_curve() | `y_true: array, y_score: array` | tuple (fpr, tpr, thresholds) | Visualize TPR vs FPR tradeoff | Threshold tuning in spam, fraud detection | Q: What's good AUC?<br>A: >0.9 excellent, 0.7-0.9 good, <0.7 poor | ✅ DO: Use for threshold selection<br>❌ DON'T: Use only for imbalanced data | ```python
from sklearn.metrics import roc_curve, roc_auc_score
import matplotlib.pyplot as plt

# Calculate ROC curve
fpr, tpr, thresholds = roc_curve(
    y_test,
    y_proba[:, 1]
)
auc = roc_auc_score(y_test, y_proba[:, 1])

# Plot
plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, label=f'ROC (AUC={auc:.3f})')
plt.plot([0, 1], [0, 1], 'k--', label='Random')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('ROC Curve')
plt.legend()
plt.grid(alpha=0.3)
plt.savefig('outputs/roc_curve.png')``` |
| Plot precision-recall curve | sklearn.metrics | N/A | precision_recall_curve() | `y_true: array, probas_pred: array` | tuple (precision, recall, thresholds) | Visualize precision vs recall tradeoff | Better for imbalanced datasets | Q: When to use PR vs ROC?<br>A: PR better for imbalanced data | ✅ DO: Use for imbalanced classes<br>❌ DON'T: Only rely on ROC | ```python
from sklearn.metrics import precision_recall_curve
import matplotlib.pyplot as plt

# Calculate PR curve
precision, recall, thresholds = precision_recall_curve(
    y_test,
    y_proba[:, 1]
)

# Plot
plt.figure(figsize=(8, 6))
plt.plot(recall, precision)
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.title('Precision-Recall Curve')
plt.grid(alpha=0.3)
plt.savefig('outputs/pr_curve.png')

# Find best threshold
f1_scores = 2 * (precision * recall) / (precision + recall + 1e-8)
best_idx = np.argmax(f1_scores)
best_threshold = thresholds[best_idx]
print(f"Best threshold: {best_threshold:.3f}")``` |
| Check for overfitting | N/A | N/A | score() | `X: array, y: array` | float | Compare train vs test performance | Model validation, generalization check | Q: How much gap acceptable?<br>A: <5% excellent, 5-10% acceptable, >10% overfit | ✅ DO: Always compare train/test<br>❌ DON'T: Only evaluate on train | ```python
# Evaluate on both sets
train_score = model.score(X_train, y_train)
test_score = model.score(X_test, y_test)
gap = train_score - test_score

print(f"Train Score: {train_score:.4f}")
print(f"Test Score: {test_score:.4f}")
print(f"Gap: {gap:.4f}")

if gap > 0.10:
    print("⚠️ Potential overfitting detected!")
    print("Consider:")
    print("- Reduce model complexity")
    print("- Add regularization")
    print("- Get more training data")
elif gap < 0.05:
    print("✅ Good generalization")``` |

---

## Phase 7: Pipeline Productionization

### Priority: 🔴 **CRITICAL**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Create end-to-end pipeline function | N/A | N/A | Custom function | `config_dir: str` | dict | Orchestrate complete workflow | Production ML pipelines (Airflow, Kubeflow) | Q: Why single function?<br>A: Atomic operation, easier to schedule/monitor | ✅ DO: Make idempotent<br>❌ DON'T: Have side effects without cleanup | ```python
def run_pipeline(config_dir='config'):
    """End-to-end ML pipeline."""
    logger.info("Pipeline started")
    
    try:
        # Stage 1: Load data
        data_config = load_config(f'{config_dir}/data_config.yaml')
        df = load_data(data_config)
        logger.info(f"Loaded {len(df)} rows")
        
        # Stage 2: Preprocess
        preprocess_config = load_config(f'{config_dir}/preprocessing_config.yaml')
        pipeline = PreprocessingPipeline(preprocess_config)
        X_transformed = pipeline.fit_transform(X_train)
        logger.info("Preprocessing complete")
        
        # Stage 3: Train
        model_config = load_config(f'{config_dir}/model_config.yaml')
        model = train_model(X_transformed, y_train, model_config)
        logger.info("Training complete")
        
        # Stage 4: Evaluate
        metrics = evaluate_model(model, X_test, y_test)
        logger.info(f"Test F1: {metrics['f1']:.4f}")
        
        # Stage 5: Save
        save_artifacts(model, pipeline, metrics)
        logger.info("Artifacts saved")
        
        return {'status': 'success', 'metrics': metrics}
        
    except Exception as e:
        logger.error(f"Pipeline failed: {e}", exc_info=True)
        return {'status': 'failed', 'error': str(e)}``` |
| Parse command-line arguments | argparse | ArgumentParser | parse_args() | N/A | Namespace | Enable CLI interface for scripts | Automation, scheduling, parameterization | Q: Why use CLI?<br>A: Automation, scripting, no manual execution | ✅ DO: Provide defaults<br>❌ DON'T: Require too many arguments | ```python
import argparse

def main():
    parser = argparse.ArgumentParser(
        description='Train ML model'
    )
    parser.add_argument(
        '--config',
        type=str,
        default='config/model_config.yaml',
        help='Path to config file'
    )
    parser.add_argument(
        '--output-dir',
        type=str,
        default='outputs',
        help='Output directory'
    )
    parser.add_argument(
        '--log-file',
        type=str,
        default='pipeline.log',
        help='Log file path'
    )
    
    args = parser.parse_args()
    
    # Use arguments
    config = load_config(args.config)
    results = run_pipeline(config, args.output_dir)
    
if __name__ == '__main__':
    main()

# Usage: python scripts/train.py --config custom.yaml``` |
| Save model to disk | joblib | N/A | dump() | `value: object, filename: str` | None | Persist trained model | Model deployment, versioning | Q: When to save?<br>A: After training, before inference | ✅ DO: Version models with timestamps<br>❌ DON'T: Overwrite without versioning | ```python
import joblib
from datetime import datetime
from pathlib import Path

# Create timestamp
timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
version = f"v1.0.0_{timestamp}"

# Save model
model_dir = Path('models')
model_dir.mkdir(exist_ok=True)

model_path = model_dir / f'model_{version}.pkl'
joblib.dump(model, model_path)

# Save pipeline
pipeline_path = model_dir / f'pipeline_{version}.pkl'
joblib.dump(preprocessor, pipeline_path)

# Save metadata
metadata = {
    'version': version,
    'timestamp': timestamp,
    'metrics': test_metrics,
    'config': config
}
import json
with open(model_dir / f'metadata_{version}.json', 'w') as f:
    json.dump(metadata, f, indent=2)

print(f"Saved model: {model_path}")``` |

### Priority: 🟡 **HIGH**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Configure logging | logging | N/A | basicConfig() | `level: int, format: str, handlers: List` | None | Setup structured logging | Production monitoring, debugging | Q: What to log?<br>A: Start/end of stages, errors, key metrics | ✅ DO: Log to file and console<br>❌ DON'T: Use print() in production | ```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('pipeline.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

# Usage
logger.info("Pipeline started")
logger.debug("Debug info")
logger.warning("Warning message")
logger.error("Error occurred", exc_info=True)``` |
| Handle exceptions gracefully | N/A | N/A | try-except | N/A | N/A | Catch and handle errors | Production robustness, error recovery | Q: When to catch vs propagate?<br>A: Catch specific errors, add context, re-raise | ✅ DO: Log errors with context<br>❌ DON'T: Bare except clauses | ```python
import logging

logger = logging.getLogger(__name__)

try:
    df = load_data(config)
except FileNotFoundError as e:
    logger.error(f"Data file not found: {e}")
    raise
except pd.errors.ParserError as e:
    logger.error(f"Failed to parse data: {e}")
    raise RuntimeError("Data loading failed") from e
except Exception as e:
    logger.error(f"Unexpected error: {e}", exc_info=True)
    raise
finally:
    # Cleanup
    if 'conn' in locals():
        conn.close()``` |
| Load saved model for inference | joblib | N/A | load() | `filename: str` | object | Restore trained model | Batch inference, API serving | Q: How to validate?<br>A: Check version, test on sample | ✅ DO: Validate model after loading<br>❌ DON'T: Skip version check | ```python
import joblib
from pathlib import Path

def load_model_and_pipeline(model_dir='models', version=None):
    """Load model and preprocessing pipeline."""
    model_dir = Path(model_dir)
    
    if version is None:
        # Get latest version
        model_files = sorted(model_dir.glob('model_*.pkl'))
        if not model_files:
            raise FileNotFoundError("No models found")
        model_path = model_files[-1]
        version = model_path.stem.split('_', 1)[1]
    else:
        model_path = model_dir / f'model_{version}.pkl'
    
    # Load model
    model = joblib.load(model_path)
    
    # Load pipeline
    pipeline_path = model_dir / f'pipeline_{version}.pkl'
    pipeline = joblib.load(pipeline_path)
    
    # Load metadata
    metadata_path = model_dir / f'metadata_{version}.json'
    with open(metadata_path) as f:
        metadata = json.load(f)
    
    print(f"Loaded model version: {version}")
    print(f"Test F1: {metadata['metrics']['f1']:.4f}")
    
    return model, pipeline, metadata``` |

---

## Phase 8: Documentation & Knowledge Transfer

### Priority: 🔴 **CRITICAL**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Write function docstrings | N/A | N/A | Docstring | N/A | str | Document function purpose and usage | API documentation, code understanding | Q: What to include?<br>A: Description, Args, Returns, Examples | ✅ DO: Use consistent format (Google/NumPy)<br>❌ DON'T: Leave functions undocumented | ```python
def train_model(X_train, y_train, config):
    """Train model with cross-validation.
    
    Args:
        X_train (pd.DataFrame): Training features
        y_train (pd.Series): Training target
        config (dict): Model configuration containing:
            - model_type (str): Algorithm name
            - params (dict): Hyperparameters
            - cv_folds (int): Number of CV folds
    
    Returns:
        model: Trained model instance
        
    Raises:
        ValueError: If model_type not supported
        
    Example:
        >>> config = {
        ...     'model_type': 'random_forest',
        ...     'params': {'n_estimators': 100},
        ...     'cv_folds': 5
        ... }
        >>> model = train_model(X, y, config)
    """
    model_type = config['model_type']
    params = config['params']
    
    model = create_model(model_type, **params)
    model.fit(X_train, y_train)
    
    return model``` |
| Save JSON metadata | json | N/A | dump() | `obj: dict, fp: TextIO` | None | Store experiment metadata | Experiment tracking, model registry | Q: What to save?<br>A: Version, metrics, config, timestamp | ✅ DO: Use indent for readability<br>❌ DON'T: Mix with pickle for simple data | ```python
import json
from datetime import datetime

# Create metadata
metadata = {
    'timestamp': datetime.now().isoformat(),
    'version': 'v1.0.0',
    'model_type': 'RandomForest',
    'metrics': {
        'accuracy': 0.8721,
        'f1': 0.8542,
        'roc_auc': 0.9156
    },
    'hyperparameters': {
        'n_estimators': 100,
        'max_depth': 10
    },
    'data_version': 'v1.2.3',
    'git_commit': 'abc123def'
}

# Save to file
with open('outputs/metadata.json', 'w') as f:
    json.dump(metadata, f, indent=2)

# Load from file
with open('outputs/metadata.json', 'r') as f:
    loaded_metadata = json.load(f)``` |

### Priority: 🟡 **HIGH**

| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
|-------------|--------|--------------|-----------------|----------------|---------|-------------|----------------------------------|-----|----------|---------------------|
| Write README in Markdown | N/A | N/A | Markdown file | N/A | N/A | Provide project overview | Open-source projects, internal tools | Q: What to include?<br>A: Quick start, structure, usage examples | ✅ DO: Keep updated<br>❌ DON'T: Skip quick start section | ```markdown
# ML Project Name

## Quick Start

```bash
# Setup
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Train model
python scripts/train.py

# Make predictions
python scripts/predict.py --input data/new.csv
```

## Project Structure

```
project/
├── data/               # Data files (gitignored)
├── src/                # Source code
│   ├── preprocessing/  # Data preprocessing
│   └── models/         # Model training
├── config/             # Configuration files
├── outputs/            # Results and plots
└── models/             # Saved models
```

## Usage

### Training
```bash
python scripts/train.py \
  --config config/model_config.yaml \
  --output-dir outputs/experiment_1
```

### Inference
```bash
python scripts/predict.py \
  --model models/model_latest.pkl \
  --input data/new.csv \
  --output predictions.csv
```

## Contact

For questions, contact: team@example.com

---

## Prompt_202601161200

https://claude.ai/chat/ab3efab1-64fd-4dd1-aafa-3d2e12e292d9

### Prompt-01

```
based on `eda-mlp-detailed-implementation-lod-steps.md`, `eda-mlp-keywords-reference-guide.md` template,
generate `python-reference-guide.md` 

## Phase
### Priority


```
| When to Use | Module | Class/Object | Function/Method | Key Parameters | Returns | Key Concept | Excellent Real-world Application | FAQ | Do/Don't | Example Code Snippet |
```
```

#### Note-01

```
Perfect! I've completed the **Python Reference Guide** with all remaining phases (5-8). Here's what I added:

## **Phase 4 (Completed):**
- ✅ Scaling (`StandardScaler`)
- ✅ Encoding (`OneHotEncoder`)
- ✅ Pipeline assembly (`Pipeline`, `ColumnTransformer`)
- ✅ Log transformation (`np.log1p`)
- ✅ Polynomial features
- ✅ Pipeline serialization (`joblib.dump/load`)

## **Phase 5: Model Development & Training**
### 🔴 Critical:
- `train_test_split()` - Data partitioning with stratification
- `DummyClassifier` - Baseline model
- `cross_val_score()` - Cross-validation
- `RandomForestClassifier.fit()` - Model training
- `classification_report()` - Comprehensive metrics

### 🟡 High:
- `GridSearchCV` - Hyperparameter tuning
- `feature_importances_` - Feature ranking
- `compute_class_weight()` - Handle imbalance

### 🟢 Medium:
- `set_seeds()` - Reproducibility

## **Phase 6: Model Evaluation & Analysis**
### 🔴 Critical:
- `confusion_matrix()` - Error visualization
- `np.where()` - Error analysis by confidence

### 🟡 High:
- `roc_curve()` - ROC/AUC analysis
- `precision_recall_curve()` - PR curve for imbalanced data
- Overfitting detection (train vs test comparison)

## **Phase 7: Pipeline Productionization**
### 🔴 Critical:
- `run_pipeline()` - End-to-end orchestration
- `argparse` - CLI interface
- `joblib.dump()` - Model persistence with versioning

### 🟡 High:
- `logging.basicConfig()` - Structured logging
- Try-except error handling
- `joblib.load()` - Model loading for inference

## **Phase 8: Documentation**
### 🔴 Critical:
- Function docstrings (Google/NumPy style)
- `json.dump()` - Metadata storage

### 🟡 High:
- README.md template with quick start

## **Key Features:**
✅ **120+ Python functions/methods** documented
✅ **Do/Don't best practices** for each entry
✅ **Production-ready code examples** with comments
✅ **Real-world applications** and FAQs
✅ **Anti-patterns** to avoid common mistakes

The guide is now complete and ready to use as a comprehensive Python reference for ML implementation!
```

