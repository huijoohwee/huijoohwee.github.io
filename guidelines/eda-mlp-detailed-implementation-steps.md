---
title: "eda-mlp-detailed-implementation-steps"
author: "joohwee"
tags: [EDA, MLP, Test]
date: 2026-01-13
mermaidAnchorsOnly: true
mermaid: |
  graph TB
    subgraph Phase0["Phase 0: Setup & Data Acquisition (30 min)"]
        P0_Start([Start Project Setup])
        
        P0_Download[Download Database]
        P0_Structure[Create Structure]
        P0_Gitignore[Configure Gitignore]
        P0_DataLoader[Implement DataLoader]
        P0_Schema[Validate Schema]
        P0_Requirements[Install Dependencies]
        P0_RunScript[Create Execution Script]
        P0_Verify[Verify Setup]
        
        P0_Start -->|"curl/wget phishing.db"| P0_Download
        P0_Download -->|"mkdir -p scaffold"| P0_Structure
        P0_Structure -->|"exclude data/"| P0_Gitignore
        P0_Gitignore -->|"implement loader class"| P0_DataLoader
        P0_DataLoader -->|"check 47 columns"| P0_Schema
        P0_Schema -->|"pip install"| P0_Requirements
        P0_Requirements -->|"create run.sh"| P0_RunScript
        P0_RunScript -->|"test all components"| P0_Verify
    end
    
    subgraph Phase1["Phase 1: Environment Setup (15-30 min)"]
        P1_Start([Initialize Environment])
        
        P1_Hierarchy[Create Directories]
        P1_Git[Initialize Git]
        P1_README[Write README]
        P1_Venv[Setup Virtual Environment]
        P1_InstallDeps[Install Packages]
        P1_DataConfig[Create Data Config]
        P1_ModelConfig[Create Model Config]
        P1_PreprocessConfig[Create Preprocess Config]
        P1_ValidationConfig[Create Validation Config]
        P1_Jupyter[Setup Jupyter]
        P1_ConfigLoader[Implement Config Loader]
        P1_Logger[Setup Logging]
        
        P1_Start -->|"mkdir nested structure"| P1_Hierarchy
        P1_Hierarchy -->|"git init"| P1_Git
        P1_Git -->|"document project"| P1_README
        P1_README -->|"python -m venv"| P1_Venv
        P1_Venv -->|"requirements.txt"| P1_InstallDeps
        P1_InstallDeps -->|"define data sources"| P1_DataConfig
        P1_DataConfig -->|"define hyperparameters"| P1_ModelConfig
        P1_ModelConfig -->|"define transformations"| P1_PreprocessConfig
        P1_PreprocessConfig -->|"define metrics"| P1_ValidationConfig
        P1_ValidationConfig -->|"configure notebooks"| P1_Jupyter
        P1_Jupyter -->|"load YAML configs"| P1_ConfigLoader
        P1_ConfigLoader -->|"setup logging utility"| P1_Logger
    end
    
    subgraph Phase2["Phase 2: Data Loading & Validation (20-40 min)"]
        P2_Start([Begin Data Loading])
        
        P2_Loader[Create Data Loader]
        P2_FormatDetect[Detect File Format]
        P2_GenericLoad[Implement Generic Loader]
        P2_Compression[Handle Compression]
        P2_Validator[Create Data Validator]
        P2_SchemaValidate[Validate Schema]
        P2_NullCheck[Check Null Values]
        P2_DuplicateCheck[Check Duplicates]
        P2_RangeValidate[Validate Ranges]
        P2_CategoricalValidate[Validate Categories]
        P2_ProfileNotebook[Create Profiling Notebook]
        P2_QualityReport[Generate Quality Report]
        
        P2_Start -->|"stub loader functions"| P2_Loader
        P2_Loader -->|"detect by extension"| P2_FormatDetect
        P2_FormatDetect -->|"support CSV/Parquet/Excel"| P2_GenericLoad
        P2_GenericLoad -->|"auto-detect gzip/bz2"| P2_Compression
        P2_Compression -->|"create validator class"| P2_Validator
        P2_Validator -->|"check columns & dtypes"| P2_SchemaValidate
        P2_SchemaValidate -->|"threshold checking"| P2_NullCheck
        P2_NullCheck -->|"identify duplicates"| P2_DuplicateCheck
        P2_DuplicateCheck -->|"check numeric bounds"| P2_RangeValidate
        P2_RangeValidate -->|"check allowed values"| P2_CategoricalValidate
        P2_CategoricalValidate -->|"create EDA notebook"| P2_ProfileNotebook
        P2_ProfileNotebook -->|"save metrics & plots"| P2_QualityReport
    end
    
    subgraph Phase3["Phase 3: Exploratory Data Analysis (60-120 min)"]
        P3_Start([Start EDA])
        
        P3_Univariate[Analyze Univariate]
        P3_NumericDist[Plot Numeric Distributions]
        P3_SummaryStats[Calculate Summary Stats]
        P3_CategoricalDist[Analyze Categorical]
        P3_Outliers[Identify Outliers]
        P3_Bivariate[Analyze Bivariate]
        P3_Correlation[Calculate Correlations]
        P3_Heatmap[Visualize Heatmap]
        P3_TargetRelation[Analyze Target Relations]
        P3_PairPlot[Create Pair Plots]
        P3_StatTests[Statistical Tests]
        P3_Multivariate[Analyze Multivariate]
        P3_PCA[Apply PCA]
        P3_Clustering[K-Means Clustering]
        P3_Interactions[Test Interactions]
        P3_Temporal[Analyze Temporal]
        P3_Segment[Segment Analysis]
        P3_Document[Document Insights]
        
        P3_Start -->|"examine distributions"| P3_Univariate
        P3_Univariate -->|"histograms/KDE/boxplots"| P3_NumericDist
        P3_NumericDist -->|"mean/std/skewness"| P3_SummaryStats
        P3_SummaryStats -->|"value counts"| P3_CategoricalDist
        P3_CategoricalDist -->|"IQR/Z-score methods"| P3_Outliers
        P3_Outliers -->|"examine relationships"| P3_Bivariate
        P3_Bivariate -->|"compute correlation matrix"| P3_Correlation
        P3_Correlation -->|"plot heatmap"| P3_Heatmap
        P3_Heatmap -->|"feature-target analysis"| P3_TargetRelation
        P3_TargetRelation -->|"visualize top features"| P3_PairPlot
        P3_PairPlot -->|"chi-square/t-test/ANOVA"| P3_StatTests
        P3_StatTests -->|"examine patterns"| P3_Multivariate
        P3_Multivariate -->|"dimensionality reduction"| P3_PCA
        P3_PCA -->|"identify clusters"| P3_Clustering
        P3_Clustering -->|"polynomial features"| P3_Interactions
        P3_Interactions -->|"time series analysis"| P3_Temporal
        P3_Temporal -->|"subgroup analysis"| P3_Segment
        P3_Segment -->|"write insights report"| P3_Document
    end
    
    subgraph Phase4["Phase 4: Feature Engineering (45-90 min)"]
        P4_Start([Start Preprocessing])
        
        P4_BaseTransformer[Create Base Transformer]
        P4_StubTransformers[Stub Transformer Methods]
        P4_ImputationConfig[Create Imputation Config]
        P4_Imputer[Implement Imputer]
        P4_MissingIndicator[Create Missing Indicators]
        P4_ScalingConfig[Create Scaling Config]
        P4_Scaler[Implement Scaler]
        P4_InverseTransform[Add Inverse Transform]
        P4_EncodingConfig[Create Encoding Config]
        P4_Encoder[Implement Encoder]
        P4_RareGrouping[Handle Rare Categories]
        P4_EngineerConfig[Create Engineering Config]
        P4_Polynomial[Implement Polynomial]
        P4_Transform[Math Transformations]
        P4_Binning[Implement Binning]
        P4_Aggregation[Create Aggregations]
        P4_Pipeline[Create Pipeline]
        P4_Serialize[Implement Serialization]
        P4_Validate[Add Pipeline Validation]
        P4_Notebook[Create Preprocessing Notebook]
        P4_Compare[Compare Distributions]
        P4_Save[Save Artifacts]
        
        P4_Start -->|"sklearn API"| P4_BaseTransformer
        P4_BaseTransformer -->|"define methods"| P4_StubTransformers
        P4_StubTransformers -->|"define strategies"| P4_ImputationConfig
        P4_ImputationConfig -->|"median/mode/knn"| P4_Imputer
        P4_Imputer -->|"binary flags"| P4_MissingIndicator
        P4_MissingIndicator -->|"define methods"| P4_ScalingConfig
        P4_ScalingConfig -->|"standard/minmax/robust"| P4_Scaler
        P4_Scaler -->|"reverse scaling"| P4_InverseTransform
        P4_InverseTransform -->|"define strategies"| P4_EncodingConfig
        P4_EncodingConfig -->|"onehot/ordinal/target"| P4_Encoder
        P4_Encoder -->|"group <1% categories"| P4_RareGrouping
        P4_RareGrouping -->|"define features"| P4_EngineerConfig
        P4_EngineerConfig -->|"interaction features"| P4_Polynomial
        P4_Polynomial -->|"log/sqrt/reciprocal"| P4_Transform
        P4_Transform -->|"quantile/uniform bins"| P4_Binning
        P4_Binning -->|"groupby statistics"| P4_Aggregation
        P4_Aggregation -->|"order transformers"| P4_Pipeline
        P4_Pipeline -->|"save/load pipeline"| P4_Serialize
        P4_Serialize -->|"test on sample"| P4_Validate
        P4_Validate -->|"apply transformations"| P4_Notebook
        P4_Notebook -->|"before/after plots"| P4_Compare
        P4_Compare -->|"save transformed data"| P4_Save
    end
    
    subgraph Phase5["Phase 5: Model Development (60-120 min)"]
        P5_Start([Start Model Training])
        
        P5_Factory[Create Model Factory]
        P5_Registry[Implement Registry]
        P5_Validation[Hyperparameter Validation]
        P5_Baseline[Implement Baseline]
        P5_CrossValidation[Implement CV]
        P5_EarlyStopping[Add Early Stopping]
        P5_Reproducibility[Set Random Seeds]
        P5_Evaluator[Create Evaluator]
        P5_Metrics[Calculate Metrics]
        P5_ConfusionMatrix[Plot Confusion Matrix]
        P5_ROC[Plot ROC Curve]
        P5_FeatureImportance[Extract Importance]
        P5_TrainNotebook[Create Training Notebook]
        P5_TrainBaseline[Train Baseline]
        P5_DefineModels[Define Model List]
        P5_TrainAll[Train All Models]
        P5_Compare[Compare Performance]
        P5_SelectBest[Select Best Model]
        P5_Tuning[Hyperparameter Tuning]
        P5_GridSearch[Run Grid Search]
        P5_ExtractBest[Extract Best Params]
        P5_Serialize[Save Model Artifacts]
        P5_ModelCard[Create Model Card]
        
        P5_Start -->|"create from config"| P5_Factory
        P5_Factory -->|"model type mapping"| P5_Registry
        P5_Registry -->|"validate params"| P5_Validation
        P5_Validation -->|"dummy classifier"| P5_Baseline
        P5_Baseline -->|"stratified k-fold"| P5_CrossValidation
        P5_CrossValidation -->|"patience mechanism"| P5_EarlyStopping
        P5_EarlyStopping -->|"fix random state"| P5_Reproducibility
        P5_Reproducibility -->|"create evaluator class"| P5_Evaluator
        P5_Evaluator -->|"accuracy/precision/recall/f1"| P5_Metrics
        P5_Metrics -->|"visualize predictions"| P5_ConfusionMatrix
        P5_ConfusionMatrix -->|"plot TPR vs FPR"| P5_ROC
        P5_ROC -->|"model.feature_importances_"| P5_FeatureImportance
        P5_FeatureImportance -->|"create notebook"| P5_TrainNotebook
        P5_TrainNotebook -->|"establish benchmark"| P5_TrainBaseline
        P5_TrainBaseline -->|"specify algorithms"| P5_DefineModels
        P5_DefineModels -->|"fit & evaluate each"| P5_TrainAll
        P5_TrainAll -->|"visualize results"| P5_Compare
        P5_Compare -->|"highest F1 score"| P5_SelectBest
        P5_SelectBest -->|"optimize hyperparameters"| P5_Tuning
        P5_Tuning -->|"exhaustive search"| P5_GridSearch
        P5_GridSearch -->|"best_params_"| P5_ExtractBest
        P5_ExtractBest -->|"joblib.dump"| P5_Serialize
        P5_Serialize -->|"document model"| P5_ModelCard
    end
    
    subgraph Phase6["Phase 6: Model Evaluation (30-60 min)"]
        P6_Start([Start Evaluation])
        
        P6_LoadModel[Load Model]
        P6_Predict[Generate Predictions]
        P6_CalcMetrics[Calculate Metrics]
        P6_CompareVal[Compare to Validation]
        P6_ErrorAnalysis[Perform Error Analysis]
        P6_ConfidenceAnalysis[Analyze Confidence]
        P6_ErrorInsights[Document Errors]
        P6_FeatureAnalysis[Analyze Features]
        P6_Diagnostics[Model Diagnostics]
        P6_ConfusionViz[Visualize Confusion]
        P6_ROCViz[Visualize ROC]
        P6_PRCurve[Precision-Recall Curve]
        
        P6_Start -->|"load latest .pkl"| P6_LoadModel
        P6_LoadModel -->|"model.predict()"| P6_Predict
        P6_Predict -->|"evaluate performance"| P6_CalcMetrics
        P6_CalcMetrics -->|"check overfitting"| P6_CompareVal
        P6_CompareVal -->|"identify errors"| P6_ErrorAnalysis
        P6_ErrorAnalysis -->|"group by confidence"| P6_ConfidenceAnalysis
        P6_ConfidenceAnalysis -->|"write insights"| P6_ErrorInsights
        P6_ErrorInsights -->|"extract importance"| P6_FeatureAnalysis
        P6_FeatureAnalysis -->|"run diagnostics"| P6_Diagnostics
        P6_Diagnostics -->|"plot matrix"| P6_ConfusionViz
        P6_ConfusionViz -->|"plot curve"| P6_ROCViz
        P6_ROCViz -->|"plot PR curve"| P6_PRCurve
    end
    
    subgraph Phase7["Phase 7: Productionization (60-120 min)"]
        P7_Start([Start Productionization])
        
        P7_Extract[Extract Code]
        P7_Pipeline[Create Pipeline Script]
        P7_Logging[Setup Logging]
        P7_Stages[Implement Stages]
        P7_TrainScript[Create Training Script]
        P7_InferenceScript[Create Inference Script]
        P7_Validate[Validate Input]
        P7_Preprocess[Preprocess New Data]
        P7_BatchPredict[Batch Predictions]
        
        P7_Start -->|"refactor notebooks"| P7_Extract
        P7_Extract -->|"create orchestration"| P7_Pipeline
        P7_Pipeline -->|"configure logger"| P7_Logging
        P7_Logging -->|"data/preprocess/train/eval/save"| P7_Stages
        P7_Stages -->|"create train.py"| P7_TrainScript
        P7_TrainScript -->|"create predict.py"| P7_InferenceScript
        P7_InferenceScript -->|"check required features"| P7_Validate
        P7_Validate -->|"apply pipeline"| P7_Preprocess
        P7_Preprocess -->|"generate outputs"| P7_BatchPredict
    end
    
    subgraph Phase8["Phase 8: Documentation (30-60 min)"]
        P8_Start([Start Documentation])
        
        P8_UpdateREADME[Update README]
        P8_QuickStart[Write Quick Start]
        P8_Structure[Document Structure]
        P8_Usage[Write Usage Guide]
        P8_Development[Development Guide]
        P8_Monitoring[Monitoring Guide]
        P8_Complete[Finalize Documentation]
        
        P8_Start -->|"comprehensive overview"| P8_UpdateREADME
        P8_UpdateREADME -->|"setup instructions"| P8_QuickStart
        P8_QuickStart -->|"explain folders"| P8_Structure
        P8_Structure -->|"train/predict examples"| P8_Usage
        P8_Usage -->|"adding features/testing"| P8_Development
        P8_Development -->|"metrics/retraining"| P8_Monitoring
        P8_Monitoring -->|"review all docs"| P8_Complete
    end
    
    P0_Verify -->|"environment ready"| P1_Start
    P1_Logger -->|"configs loaded"| P2_Start
    P2_QualityReport -->|"data validated"| P3_Start
    P3_Document -->|"insights captured"| P4_Start
    P4_Save -->|"data transformed"| P5_Start
    P5_ModelCard -->|"model trained"| P6_Start
    P6_PRCurve -->|"evaluated"| P7_Start
    P7_BatchPredict -->|"production ready"| P8_Start
    P8_Complete -->|"project complete"| End([Project Delivered])
    
    classDef phaseStyle fill:#e1f5ff,stroke:#0066cc,stroke-width:2px
    classDef actionStyle fill:#fff4e6,stroke:#ff9800,stroke-width:2px
    classDef decisionStyle fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px
    classDef startEndStyle fill:#e8f5e9,stroke:#4caf50,stroke-width:3px
    
    class Phase0,Phase1,Phase2,Phase3,Phase4,Phase5,Phase6,Phase7,Phase8 phaseStyle
    class P0_Start,P1_Start,P2_Start,P3_Start,P4_Start,P5_Start,P6_Start,P7_Start,P8_Start,End startEndStyle
---

# Phase 0: Setup & Data Acquisition - Detailed Implementation Steps

**Version**: 1.0  
**Companion to**: interview-session-v4-1-1-implementation-guide.md (Phase 0)  
**Time Budget**: 30 minutes  
**Priority**: 🟡 HIGH - Foundation for everything else

---

## Overview

This phase establishes your project foundation:
- ✅ Download phishing.db
- ✅ Create proper directory structure
- ✅ Implement data_loader.py with validation
- ✅ Set up dependencies and execution script
- ✅ Verify everything works before proceeding

---

## Step 0.1.0: Download phishing.db to data/ folder

**Goal**: Get the database file into local data/ directory (NOT in git)

```bash
# Navigate to your working directory
$ cd ~/github  # or your preferred location

# Create project root
$ mkdir -p aiap22-interview
$ cd aiap22-interview

# Create data directory
$ mkdir -p data

# Download database (replace URL with actual provided URL)
$ curl -o data/phishing.db "https://[ACTUAL_URL_PROVIDED]/phishing.db"
# OR if using wget:
$ wget -O data/phishing.db "https://[ACTUAL_URL_PROVIDED]/phishing.db"
```

**✓ Verification**:
```bash
$ ls -lh data/phishing.db
# Expected: -rw-r--r--  1 user  staff    52M Jan 13 10:00 data/phishing.db

$ file data/phishing.db
# Expected: data/phishing.db: SQLite 3.x database
```

---

## Step 0.2.0: Create project structure

**Target structure**:
```
aiap22-interview/
├── data/                  # ← LOCAL ONLY, in .gitignore
│   └── phishing.db       # ← 52MB, never commit to git
├── src/                   # ← Python modules
│   ├── __init__.py
│   ├── data_loader.py
│   ├── preprocessing.py
│   ├── models.py
│   ├── evaluation.py
│   ├── business_impact.py
│   └── hypothesis_tester.py
├── results/               # ← Generated outputs
├── models/                # ← Saved .pkl files
├── eda.ipynb             # ← Task 1 deliverable
├── README.md             # ← Main documentation
├── requirements.txt      # ← Dependencies
├── run.sh                # ← Execution script
└── .gitignore            # ← Prevent data/ upload
```

**📝 One-command scaffold** (execute from parent directory):
```bash
mkdir -p aiap22-interview/{data,src,results,models} && \
cd aiap22-interview && \
touch src/{__init__.py,data_loader.py,preprocessing.py,models.py,evaluation.py,business_impact.py,hypothesis_tester.py} && \
touch {eda.ipynb,README.md,requirements.txt,run.sh} && \
echo -e "data/\nresults/\nmodels/\n__pycache__/\n*.pyc\n*.pkl\n.ipynb_checkpoints/\n.DS_Store\nvenv/" > .gitignore
```

**✓ Verification**:
```bash
$ tree -L 2 -a
# Should output structure matching above

$ cat .gitignore | grep -E "^data/|^results/"
# Should show: data/ and results/ in .gitignore
```

---

## Step 0.2.3: Create .gitignore (Detailed)

**📝 File**: `.gitignore`
```gitignore
# Data directory (contains large database)
data/

# Results directory (generated outputs)
results/

# Saved models (binary files)
models/

# Python bytecode
__pycache__/
*.pyc
*.pyo
*.pkl
*.joblib

# Jupyter notebook checkpoints
.ipynb_checkpoints/

# OS files
.DS_Store
Thumbs.db
*.swp
*.swo

# Virtual environment
venv/
env/
.venv/
ENV/

# IDE files
.vscode/
.idea/
*.sublime-*
```

**Create via command**:
```bash
$ cat > .gitignore << 'EOF'
# Data directory (contains large database)
data/

# Results directory (generated outputs)
results/

# Saved models (binary files)
models/

# Python bytecode
__pycache__/
*.pyc
*.pyo
*.pkl
*.joblib

# Jupyter notebook checkpoints
.ipynb_checkpoints/

# OS files
.DS_Store
Thumbs.db

# Virtual environment
venv/
EOF
```

**✓ Test gitignore**:
```bash
$ git init
$ git add .
$ git status
# Should NOT show data/ or results/ in staged files
```

---

## Step 0.3.0-0.3.6: Implement data_loader.py

**📝 File**: `src/data_loader.py`

```python
"""
DataLoader module for AIAP22 phishing detection project.

Responsibilities (S-V-O pattern):
- DataLoader loads phishing data from SQLite database
- DataLoader validates schema and data quality contracts
- DataLoader enforces minimum sample size requirements
- DataLoader parses target variable encoding correctly
"""

import sqlite3
import pandas as pd
import numpy as np
from typing import Dict, List, Tuple


class DataQualityError(Exception):
    """Raised when data quality checks fail."""
    pass


class DataLoader:
    """
    DataLoader loads phishing detection data and enforces schema contracts.
    
    This class ensures data quality before any downstream processing by:
    1. Validating database connection and table existence
    2. Checking schema matches expected 46 features + 1 target
    3. Verifying minimum sample size for reliable train/test splits
    4. Confirming target variable encoding is {0, 1}
    5. Computing class distribution for stratification planning
    """
    
    # Expected schema: 46 features + 1 target = 47 columns
    EXPECTED_COLUMNS = 47
    MIN_ROWS = 1000  # Minimum for reliable 70/15/15 split
    
    EXPECTED_SCHEMA = {
        # Binary features (presence/absence)
        'HasTitle': 'int64',
        'HasFavicon': 'int64',
        'HasDescription': 'int64',
        'HasCopyrightInfo': 'int64',
        'HasSocialNet': 'int64',
        'HasSubmitButton': 'int64',
        'HasHiddenFields': 'int64',
        'HasPasswordField': 'int64',
        'HasExternalFormSubmit': 'int64',
        'HasObfuscation': 'int64',
        'HasExternalCSS': 'int64',
        'HasInternalCSS': 'int64',
        'HasObfuscatedAnchor': 'int64',
        'HasEmailInput': 'int64',
        'HasPasswordInput': 'int64',
        'HasCopyrightInfoInBody': 'int64',
        'IsDomainIP': 'int64',
        'DoubleSlashInPath': 'int64',
        'EmbeddedBrandName': 'int64',
        'ExtFavicon': 'int64',
        
        # Count features
        'NoOfURLRedirect': 'int64',
        'NoOfSelfRedirect': 'int64',
        'NoOfExternalRef': 'int64',
        'NoOfSelfRef': 'int64',
        'NoOfAnchor': 'int64',
        'NoOfiFrame': 'int64',
        'NoOfPopup': 'int64',
        'NoOfImage': 'int64',
        'LineOfCode': 'int64',
        'LargestLineLength': 'int64',
        'DNSRecordCount': 'int64',
        'LinksPointingToPage': 'int64',
        'HostnameLength': 'int64',
        'PathLength': 'int64',
        'QueryLength': 'int64',
        
        # Continuous features
        'URLSimilarityIndex': 'float64',
        'URLCharProb': 'float64',
        'TLDLegitimateProb': 'float64',
        'PctExtHyperlinks': 'float64',
        'PctExtResourceUrls': 'float64',
        
        # Features with missing values
        'IsResponsive': 'float64',  # ~8% missing (MAR)
        'Robots': 'float64',  # ~12% missing (borderline MNAR)
        'DomainAgeMonths': 'float64',  # ~68% missing (MNAR confirmed)
        
        # Ranking/scoring features
        'GoogleIndex': 'int64',
        'PageRank': 'int64',
        'AlexaRank': 'int64',
        
        # Categorical features
        'Industry': 'object',
        'HostingProvider': 'object',
        
        # Target variable
        'label': 'int64'  # 0=legitimate, 1=phishing
    }
    
    def __init__(self, db_path: str = 'data/phishing.db'):
        """
        Initialize DataLoader with database path.
        
        Parameters:
        -----------
        db_path : str, default='data/phishing.db'
            Relative or absolute path to SQLite database file
            
        Example:
        --------
        >>> loader = DataLoader('data/phishing.db')
        >>> df, report = loader.load_from_sqlite()
        """
        self.db_path = db_path
        self.df = None
        self.validation_report = None
    
    def load_from_sqlite(self) -> Tuple[pd.DataFrame, Dict]:
        """
        DataLoader loads data from SQLite and validates schema.
        
        This method:
        1. Connects to SQLite database
        2. Auto-detects table name from sqlite_master
        3. Loads all rows into pandas DataFrame
        4. Validates schema (columns, dtypes)
        5. Checks minimum row count
        6. Validates target variable encoding
        
        Returns:
        --------
        df : pd.DataFrame
            Loaded dataframe with validated schema
            Shape: (n_samples, 47) where 47 = 46 features + 1 target
            
        validation_report : dict
            Report of validation checks performed:
            {
                'is_valid': bool,
                'errors': List[str],
                'columns_found': int,
                'row_count': int
            }
            
        Raises:
        -------
        DataQualityError
            If database connection fails
            If no tables found in database
            If schema validation fails (wrong columns/types)
            If insufficient rows (<1000) for reliable splitting
            
        Example:
        --------
        >>> loader = DataLoader()
        >>> df, report = loader.load_from_sqlite()
        ✓ Detected table: phishing_data
        ✓ Loaded 11000 rows, 47 columns
        ✓ Test set will have ~742 phishing samples
        """
        # Step 1: Connect to database
        try:
            conn = sqlite3.connect(self.db_path)
            print(f"✓ Connected to database: {self.db_path}")
        except sqlite3.Error as e:
            raise DataQualityError(f"Cannot connect to database: {e}")
        
        # Step 2: Detect table name automatically
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        
        if len(tables) == 0:
            conn.close()
            raise DataQualityError("No tables found in database")
        
        table_name = tables[0][0]  # Use first table
        print(f"✓ Detected table: {table_name}")
        
        # Step 3: Load data
        query = f"SELECT * FROM {table_name}"
        df = pd.read_sql(query, conn)
        conn.close()
        
        print(f"✓ Loaded {len(df):,} rows, {len(df.columns)} columns")
        
        # Step 4: Validate schema
        validation_report = self._validate_schema(df)
        
        if not validation_report['is_valid']:
            error_msg = "Schema validation failed:\n" + "\n".join(validation_report['errors'])
            raise DataQualityError(error_msg)
        
        print(f"✓ Schema validated successfully")
        
        # Step 5: Check row count adequacy
        self._check_row_count(df)
        
        # Step 6: Parse and validate target variable
        self._parse_target_variable(df)
        
        # Store for later access
        self.df = df
        self.validation_report = validation_report
        
        return df, validation_report
    
    def _validate_schema(self, df: pd.DataFrame) -> Dict:
        """
        DataLoader validates schema against expected structure.
        
        Checks performed:
        1. Column count matches expected (47)
        2. All expected columns are present
        3. Each column has correct dtype (int64, float64, or object)
        
        Parameters:
        -----------
        df : pd.DataFrame
            DataFrame to validate
            
        Returns:
        --------
        report : dict
            {
                'is_valid': bool,
                'errors': List[str],  # Empty if valid
                'columns_found': int,
                'row_count': int
            }
        """
        errors = []
        
        # Check 1: Column count
        if len(df.columns) != self.EXPECTED_COLUMNS:
            errors.append(
                f"Column count mismatch: expected {self.EXPECTED_COLUMNS}, "
                f"found {len(df.columns)}"
            )
        
        # Check 2 & 3: Each column exists and has correct dtype
        for col, expected_dtype in self.EXPECTED_SCHEMA.items():
            if col not in df.columns:
                errors.append(f"Missing column: {col}")
            else:
                actual_dtype = str(df[col].dtype)
                # Allow int64 <-> float64 compatibility (pandas type inference)
                compatible = (
                    actual_dtype == expected_dtype or
                    (expected_dtype in ['int64', 'float64'] and 
                     actual_dtype in ['int64', 'float64'])
                )
                if not compatible:
                    errors.append(
                        f"Column '{col}': expected dtype={expected_dtype}, "
                        f"got dtype={actual_dtype}"
                    )
        
        return {
            'is_valid': len(errors) == 0,
            'errors': errors,
            'columns_found': len(df.columns),
            'row_count': len(df)
        }
    
    def _check_row_count(self, df: pd.DataFrame):
        """
        DataLoader checks row count meets minimum for reliable splitting.
        
        For 70/15/15 split, need sufficient samples in test set for:
        - Narrow confidence intervals on metrics
        - Representative class distribution
        - Statistical power for hypothesis testing
        
        Rule of thumb: Need ≥150 samples per class in test set
        → With 45% phishing rate and 15% test size:
          n_total ≥ 150 / (0.45 × 0.15) ≈ 2,222 samples
        → We use 1,000 as minimum (gives ~67 phishing in test)
        
        Parameters:
        -----------
        df : pd.DataFrame
            DataFrame to check
            
        Raises:
        -------
        DataQualityError
            If len(df) < MIN_ROWS (1000)
            
        Side Effects:
        -------------
        Prints confidence interval width for test set recall estimate
        """
        if len(df) < self.MIN_ROWS:
            raise DataQualityError(
                f"Insufficient data: {len(df)} rows found, "
                f"need ≥{self.MIN_ROWS} for reliable 70/15/15 split.\n"
                f"Minimum ensures adequate test set size for metric precision."
            )
        
        # Compute expected test set size
        test_size = 0.15
        n_test = int(len(df) * test_size)
        
        # Assume 45% phishing rate from target distribution
        # (will be confirmed in _parse_target_variable)
        n_test_phishing = int(n_test * 0.45)
        
        # 95% confidence interval for recall estimate
        # Assuming true recall ≈ 70%
        p = 0.70
        ci_width = 1.96 * np.sqrt(p * (1-p) / n_test_phishing)
        
        print(f"✓ Sample size check:")
        print(f"  • Total samples: {len(df):,}")
        print(f"  • Expected test set: ~{n_test:,} samples ({test_size:.0%})")
        print(f"  • Expected phishing in test: ~{n_test_phishing:,}")
        print(f"  • 95% CI width for recall: ±{ci_width:.1%}")
        
        if ci_width > 0.05:
            print(f"  ⚠ Warning: CI width >{ci_width:.1%} is wide, "
                  f"consider more data if possible")
        else:
            print(f"  ✓ CI width <5% is acceptable for business decisions")
    
    def _parse_target_variable(self, df: pd.DataFrame):
        """
        DataLoader validates target variable encoding and class distribution.
        
        Checks:
        1. 'label' column exists
        2. Unique values are exactly {0, 1}
        3. Computes class distribution for stratification planning
        4. Warns if severe imbalance (minority class <10%)
        
        Parameters:
        -----------
        df : pd.DataFrame
            DataFrame with 'label' column
            
        Raises:
        -------
        DataQualityError
            If 'label' column missing
            If unique values ≠ {0, 1} (e.g., {-1, 1} or {'legit', 'phish'})
            
        Side Effects:
        -------------
        Prints class distribution and balance assessment
        """
        # Check 1: Column exists
        if 'label' not in df.columns:
            raise DataQualityError(
                "Target column 'label' not found in DataFrame. "
                "Expected columns to include 'label' with values {0, 1}."
            )
        
        # Check 2: Encoding is {0, 1}
        unique_labels = set(df['label'].unique())
        expected_labels = {0, 1}
        
        if unique_labels != expected_labels:
            raise DataQualityError(
                f"Target variable encoding error.\n"
                f"Expected labels: {expected_labels}\n"
                f"Found labels: {unique_labels}\n"
                f"Note: 0 should represent 'legitimate', 1 should represent 'phishing'"
            )
        
        # Check 3: Compute class distribution
        class_counts = df['label'].value_counts().sort_index()
        class_props = class_counts / len(df)
        
        print(f"✓ Target variable validated:")
        print(f"  • Class 0 (legitimate): {class_counts[0]:,} samples ({class_props[0]:.1%})")
        print(f"  • Class 1 (phishing):   {class_counts[1]:,} samples ({class_props[1]:.1%})")
        
        # Check 4: Assess balance severity
        min_prop = class_props.min()
        max_prop = class_props.max()
        imbalance_ratio = max_prop / min_prop
        
        if min_prop < 0.10:
            print(f"  ⚠ SEVERE imbalance: minority class {min_prop:.1%} "
                  f"(ratio {imbalance_ratio:.1f}:1)")
            print(f"     → Consider SMOTE or other resampling techniques")
        elif min_prop < 0.30:
            print(f"  ⚠ MODERATE imbalance: minority class {min_prop:.1%} "
                  f"(ratio {imbalance_ratio:.1f}:1)")
            print(f"     → Use stratified splitting and class weights")
        else:
            print(f"  ✓ MILD imbalance: minority class {min_prop:.1%} "
                  f"(ratio {imbalance_ratio:.1f}:1)")
            print(f"     → Stratified splitting sufficient")


# Example usage and testing
if __name__ == '__main__':
    print("="*60)
    print("DataLoader Test Script")
    print("="*60)
    print()
    
    # Test 1: Load data
    print("TEST 1: Loading data from database")
    print("-" * 60)
    try:
        loader = DataLoader('data/phishing.db')
        df, report = loader.load_from_sqlite()
        print()
        print("✓ TEST 1 PASSED: Data loaded successfully")
    except Exception as e:
        print(f"❌ TEST 1 FAILED: {e}")
        exit(1)
    
    print()
    
    # Test 2: Verify shape
    print("TEST 2: Verifying data shape")
    print("-" * 60)
    expected_shape = (11055, 47)  # Adjust based on actual data
    print(f"  Expected shape: {expected_shape}")
    print(f"  Actual shape:   {df.shape}")
    
    if df.shape[1] == expected_shape[1]:
        print("  ✓ TEST 2 PASSED: Column count correct")
    else:
        print(f"  ❌ TEST 2 FAILED: Expected {expected_shape[1]} columns, "
              f"got {df.shape[1]}")
    
    print()
    
    # Test 3: Verify no validation errors
    print("TEST 3: Checking validation report")
    print("-" * 60)
    print(f"  Validation status: {report['is_valid']}")
    print(f"  Errors found: {len(report['errors'])}")
    
    if report['is_valid']:
        print("  ✓ TEST 3 PASSED: No validation errors")
    else:
        print("  ❌ TEST 3 FAILED: Validation errors found:")
        for error in report['errors']:
            print(f"     • {error}")
    
    print()
    
    # Test 4: Display sample data
    print("TEST 4: Displaying sample rows")
    print("-" * 60)
    print(df.head(3))
    print()
    print("✓ TEST 4 PASSED: Sample data displayed")
    
    print()
    print("="*60)
    print("All tests completed!")
    print("="*60)
```

**✓ Test the implementation**:
```bash
$ python src/data_loader.py
```

**Expected output**:
```
============================================================
DataLoader Test Script
============================================================

TEST 1: Loading data from database
------------------------------------------------------------
✓ Connected to database: data/phishing.db
✓ Detected table: phishing_data
✓ Loaded 11,055 rows, 47 columns
✓ Schema validated successfully
✓ Sample size check:
  • Total samples: 11,055
  • Expected test set: ~1,658 samples (15%)
  • Expected phishing in test: ~746
  • 95% CI width for recall: ±3.6%
  ✓ CI width <5% is acceptable for business decisions
✓ Target variable validated:
  • Class 0 (legitimate): 6,055 samples (54.8%)
  • Class 1 (phishing):   5,000 samples (45.2%)
  ✓ MILD imbalance: minority class 45.2% (ratio 1.2:1)
     → Stratified splitting sufficient

✓ TEST 1 PASSED: Data loaded successfully

[Additional test output...]
```

---

## Step 0.4.0: Create requirements.txt

**📝 File**: `requirements.txt`
```txt
# Core data processing
pandas==2.0.3
numpy==1.24.3

# Machine learning
scikit-learn==1.3.0
xgboost==2.0.0

# Statistical analysis
scipy==1.11.1

# Visualization
matplotlib==3.7.2
seaborn==0.12.2

# Jupyter (for eda.ipynb)
jupyter==1.0.0
notebook==7.0.2

# Configuration management
pyyaml==6.0.1

# Testing (optional but recommended)
pytest==7.4.0
```

**Create and install dependencies**:
```bash
# Create requirements.txt
$ cat > requirements.txt << 'EOF'
pandas==2.0.3
numpy==1.24.3
scikit-learn==1.3.0
xgboost==2.0.0
scipy==1.11.1
matplotlib==3.7.2
seaborn==0.12.2
jupyter==1.0.0
notebook==7.0.2
pyyaml==6.0.1
EOF

# Create virtual environment
$ python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
$ source venv/bin/activate

# On Windows:
$ venv\Scripts\activate

# Upgrade pip
$ pip install --upgrade pip

# Install all dependencies
$ pip install -r requirements.txt

# This will take 2-3 minutes
```

**✓ Verify installation**:
```bash
# Check all packages installed
$ pip list | grep -E "pandas|numpy|scikit-learn|xgboost|scipy|matplotlib|seaborn"

# Expected output:
# matplotlib    3.7.2
# numpy         1.24.3
# pandas        2.0.3
# scikit-learn  1.3.0
# scipy         1.11.1
# seaborn       0.12.2
# xgboost       2.0.0

# Test imports
$ python -c "import pandas, numpy, sklearn, xgboost, scipy, matplotlib, seaborn; print('✓ All packages imported successfully')"
```

---

## Step 0.5.0: Create run.sh

**📝 File**: `run.sh`
```bash
#!/bin/bash
# AIAP22 Phishing Detection Pipeline Runner
# This script executes the entire ML pipeline from data loading to evaluation

set -e  # Exit immediately if any command fails
set -u  # Exit if undefined variable used

echo "========================================="
echo "AIAP22 Phishing Detection Pipeline"
echo "Started: $(date)"
echo "========================================="
echo ""

# Check if virtual environment is activated
if [ -z "${VIRTUAL_ENV:-}" ]; then
    echo "❌ ERROR: Virtual environment not activated"
    echo ""
    echo "Please activate virtual environment first:"
    echo "  $ source venv/bin/activate"
    echo ""
    exit 1
fi

echo "✓ Virtual environment: $VIRTUAL_ENV"
echo ""

# Check if data exists
if [ ! -f "data/phishing.db" ]; then
    echo "❌ ERROR: data/phishing.db not found"
    echo ""
    echo "Please download the database file first:"
    echo "  $ mkdir -p data"
    echo "  $ curl -o data/phishing.db [URL]"
    echo ""
    exit 1
fi

echo "✓ Database file: data/phishing.db"
echo ""

# Step 1: Data Loading & Validation
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 1: Data Loading & Validation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
python src/data_loader.py
if [ $? -ne 0 ]; then
    echo "❌ Data loading failed"
    exit 1
fi
echo "✓ Data loading completed"
echo ""

# Step 2: Preprocessing & Feature Engineering
# (Will be implemented in Phase 3)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 2: Preprocessing & Feature Engineering"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚠ Not yet implemented (Phase 3)"
echo ""

# Step 3: Model Training & Evaluation
# (Will be implemented in Phase 5)
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Step 3: Model Training & Evaluation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚠ Not yet implemented (Phase 5)"
echo ""

echo "========================================="
echo "Pipeline Status: Partially Complete"
echo "Completed: $(date)"
echo "========================================="
echo ""
echo "Next steps:"
echo "  1. Complete eda.ipynb (Phase 1)"
echo "  2. Implement preprocessing.py (Phase 3)"
echo "  3. Implement models.py (Phase 5)"
```

**Make executable and test**:
```bash
# Make script executable
$ chmod +x run.sh

# Verify it's executable
$ ls -l run.sh
# Should show: -rwxr-xr-x ... run.sh

# Test execution
$ bash run.sh
```

**Expected output** (Phase 0 only):
```
=========================================
AIAP22 Phishing Detection Pipeline
Started: Mon Jan 13 10:00:00 SGT 2025
=========================================

✓ Virtual environment: /Users/you/aiap22-interview/venv
✓ Database file: data/phishing.db

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Step 1: Data Loading & Validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[DataLoader output...]
✓ Data loading completed

[Steps 2-3 show "Not yet implemented"]
```

---

## Step 0.6.0: Final Setup Verification

**Complete pre-Phase-1 checklist**:

```bash
# 1. Verify directory structure
$ tree -L 2 -I 'venv|__pycache__' .
# Should show all directories: data/, src/, results/, models/

# 2. Check .gitignore prevents data/ upload
$ cat .gitignore | grep -E "^data/|^results/|^models/"
# Should output: data/ results/ models/

# 3. Test data loader runs successfully
$ python src/data_loader.py
# Should complete all 4 tests with "✓ TEST X PASSED"

# 4. Verify all dependencies installed
$ pip list | grep -E "pandas|numpy|sklearn|xgboost|scipy"
# Should show all 5 packages with correct versions

# 5. Test run.sh executes without errors
$ bash run.sh
# Should complete Step 1 successfully

# 6. Check git status (if using git)
$ git init
$ git add .
$ git status
# data/ should NOT appear in "Changes to be committed"

# 7. Verify virtual environment active
$ which python
# Should point to venv/bin/python, NOT system python
```

**✓ Success Criteria** (All must pass):
- ✅ `data/phishing.db` exists and is SQLite database
- ✅ All 7 source files created in `src/`
- ✅ `data/` is in `.gitignore`
- ✅ Virtual environment activated
- ✅ All 11 dependencies installed
- ✅ `data_loader.py` runs and passes all tests
- ✅ `run.sh` is executable and completes Step 1
- ✅ Git (if used) does not track `data/` directory

---

## Common Issues & Solutions

### Issue 1: "No such file or directory: data/phishing.db"
**Cause**: Database not downloaded or wrong path

**Solution**:
```bash
$ ls -l data/phishing.db
# If file missing:
$ curl -o data/phishing.db [ACTUAL_URL]
```

### Issue 2: "Virtual environment not activated"
**Cause**: Forgot to activate venv before running

**Solution**:
```bash
$ source venv/bin/activate
$ which python  # Verify points to venv
```

### Issue 3: "ModuleNotFoundError: No module named 'pandas'"
**Cause**: Dependencies not installed

**Solution**:
```bash
$ pip install -r requirements.txt
$ pip list | grep pandas  # Verify installed
```

### Issue 4: "Permission denied: ./run.sh"
**Cause**: Script not executable

**Solution**:
```bash
$ chmod +x run.sh
$ ls -l run.sh  # Verify shows -rwxr-xr-x
```

### Issue 5: Git tracking data/ folder
**Cause**: .gitignore not working or data added before .gitignore

**Solution**:
```bash
$ echo "data/" >> .gitignore
$ git rm --cached -r data/  # Remove from git index
$ git status  # Verify data/ not tracked
```

---

## Phase 0 Complete! 🎉

**What you've accomplished**:
- ✅ Professional project structure created
- ✅ Database loaded and validated
- ✅ Data quality checks implemented
- ✅ Dependencies managed properly
- ✅ Execution pipeline scaffolded
- ✅ Git properly configured to ignore data/

**Next Phase**: Phase 1 - Exploratory Data Analysis (3-4 hours)

**You're ready when**:
- `bash run.sh` completes Step 1 successfully
- All 7 verification tests pass
- You understand the DataLoader validation logic

**Time check**: Should have completed in ~30 minutes. If over 45 minutes, you may be overthinking—follow commands exactly.

---

**End of Phase 0 Detailed Implementation Steps**

---

# Phase 1: Environment Setup & Configuration - Detailed Implementation Steps

**Version**: 1.0  
**Companion to**: eda-mlp-implementation-guidelines.md (Phase 1)  
**Time Budget**: 15-30 minutes  
**Priority**: 🔴 CRITICAL - Foundation for all subsequent work

---

## Overview

This phase establishes the foundational environment for your ML project:
- ✅ Create standardized directory structure
- ✅ Initialize version control with proper .gitignore
- ✅ Set up isolated Python environment
- ✅ Create configuration files for all pipeline components
- ✅ Configure Jupyter notebook environment
- ✅ Build reusable utility modules

---

## Step 1.1.0: Create Project Structure

**Goal**: Establish organized directory hierarchy separating data, code, configs, and outputs

### Step 1.1.1: Create Directory Hierarchy

**📁 Target Structure**:
```
project_name/
├── data/                  # ← LOCAL ONLY, in .gitignore
│   ├── raw/              # ← Original, immutable data
│   └── processed/        # ← Transformed data ready for modeling
├── notebooks/            # ← Jupyter notebooks for exploration
├── src/                  # ← Python source modules
│   ├── __init__.py
│   ├── data/
│   │   ├── __init__.py
│   │   ├── data_loader.py
│   │   └── data_validator.py
│   ├── preprocessing/
│   │   ├── __init__.py
│   │   └── preprocessor.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── trainer.py
│   │   └── evaluator.py
│   └── utils/
│       ├── __init__.py
│       ├── config_loader.py
│       └── logger.py
├── config/               # ← YAML/JSON configuration files
├── tests/                # ← Unit and integration tests
│   ├── __init__.py
│   ├── test_data_loader.py
│   ├── test_preprocessor.py
│   └── fixtures/         # ← Test data samples
├── models/               # ← Saved model artifacts (.pkl, .joblib)
├── outputs/              # ← Generated results, reports, plots
├── scripts/              # ← Executable scripts
│   ├── train.py
│   └── predict.py
├── README.md
├── requirements.txt
├── .gitignore
└── setup.py              # ← Package configuration (optional)
```

**🔨 One-Command Scaffold** (execute from parent directory):
```bash
mkdir -p project_name/{data/{raw,processed},notebooks,src/{data,preprocessing,models,utils},config,tests/fixtures,models,outputs,scripts} && \
cd project_name && \
touch src/__init__.py src/data/{__init__.py,data_loader.py,data_validator.py} src/preprocessing/{__init__.py,preprocessor.py} src/models/{__init__.py,trainer.py,evaluator.py} src/utils/{__init__.py,config_loader.py,logger.py} tests/{__init__.py,test_data_loader.py,test_preprocessor.py} scripts/{train.py,predict.py} {README.md,requirements.txt,.gitignore,setup.py}
```

**✓ Verification**:
```bash
$ tree -L 3 -a
# Should output structure matching above

$ ls -la src/
# Should show __init__.py and subdirectories
```

---

### Step 1.1.2: Initialize Version Control

**Goal**: Track changes and prevent committing large/sensitive files

**Initialize Git Repository**:
```bash
$ cd project_name
$ git init
Initialized empty Git repository in /path/to/project_name/.git/

$ git config user.name "Your Name"
$ git config user.email "your.email@example.com"
```

**Create .gitignore** (Critical for preventing data leaks):
```bash
$ cat > .gitignore << 'EOF'
# Data directories (never commit data files)
data/
*.csv
*.xlsx
*.parquet
*.db
*.sqlite

# Model artifacts (too large for git)
models/
*.pkl
*.joblib
*.h5
*.pth

# Generated outputs
outputs/
results/

# Python bytecode
__pycache__/
*.py[cod]
*$py.class
*.so

# Jupyter Notebook
.ipynb_checkpoints/
*.ipynb_checkpoints

# Virtual environments
venv/
env/
.venv/
ENV/
env.bak/
venv.bak/

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~
.DS_Store
Thumbs.db

# Environment variables
.env
.env.local

# Testing
.coverage
htmlcov/
.pytest_cache/

# Distribution / packaging
build/
dist/
*.egg-info/
EOF
```

**Test .gitignore**:
```bash
$ git add .
$ git status
# Should NOT show data/, models/, __pycache__ in staged files

$ git commit -m "Initial project structure"
```

**✓ Success Criteria**:
- Git repository initialized
- `.gitignore` prevents data/model files from being tracked
- Initial commit contains only structure, no large files

---

### Step 1.1.3: Create README

**Goal**: Document project purpose, setup, and usage

**📄 File**: `README.md`
```markdown
# Project Name

**Problem Statement**: [Brief description of the ML problem]

**Objective**: [What you're trying to predict/classify/optimize]

## Project Structure

```plaintext
project_name/
├── data/              # Data files (not tracked in git)
├── notebooks/         # Exploratory analysis notebooks
├── src/               # Source code modules
│   ├── data/         # Data loading and validation
│   ├── preprocessing/ # Feature engineering and transforms
│   ├── models/       # Model training and evaluation
│   └── utils/        # Utility functions
├── config/           # Configuration files
├── tests/            # Unit and integration tests
├── scripts/          # Executable training/inference scripts
└── outputs/          # Generated results
```

## Setup

### Prerequisites
- Python 3.8+
- pip or conda

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd project_name
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Download data** (if applicable):
   ```bash
   # Instructions for obtaining data
   ```

## Usage

### Training
```bash
python scripts/train.py --config config/model_config.yaml
```

### Inference
```bash
python scripts/predict.py --model models/best_model.pkl --input data.csv
```

### Running Tests
```bash
pytest tests/
```

## Data

**Source**: [Describe data source]  
**Format**: [CSV/Parquet/Database/etc.]  
**Size**: [Number of rows and features]  
**Target Variable**: [Name and type]

See `docs/data.md` for detailed schema documentation.

## Model

**Type**: [Algorithm name]  
**Performance**: [Key metrics on test set]  
**Features**: [Number of features, key engineered features]

See `docs/model.md` for detailed model documentation.

## Configuration

All pipeline parameters are defined in YAML files under `config/`:
- `data_config.yaml` - Data sources and validation rules
- `preprocessing_config.yaml` - Feature engineering and transforms
- `model_config.yaml` - Model hyperparameters and training settings

## Development

### Adding New Features
1. Update `src/preprocessing/preprocessor.py`
2. Add feature config to `config/preprocessing_config.yaml`
3. Add tests to `tests/test_preprocessor.py`
4. Document in `docs/features.md`

### Code Style
- Follow PEP 8
- Use type hints
- Write docstrings for all functions/classes
- Keep functions small and focused

## License

[Your license]

## Contact

[Your contact information]
```

**Create README**:
```bash
$ cat > README.md << 'EOF'
[paste template above]
EOF
```

---

## Step 1.2.0: Set Up Virtual Environment

**Goal**: Isolate project dependencies from system Python

### Step 1.2.1: Create and Activate Environment

**Using venv (built-in)**:
```bash
$ python3 -m venv venv
$ source venv/bin/activate  # Linux/Mac

# On Windows:
$ venv\Scripts\activate

# Verify activation
(venv) $ which python
/path/to/project_name/venv/bin/python

(venv) $ python --version
Python 3.9.7
```

**Using conda** (alternative):
```bash
$ conda create -n project_name python=3.9
$ conda activate project_name

# Verify activation
(project_name) $ which python
/path/to/anaconda3/envs/project_name/bin/python
```

**✓ Verification**:
```bash
# Python should point to venv, not system
$ which python
# Should show: /path/to/project_name/venv/bin/python

# pip should also be in venv
$ which pip
# Should show: /path/to/project_name/venv/bin/pip
```

---

### Step 1.2.2: Create Requirements File

**Goal**: Pin dependency versions for reproducibility

**📄 File**: `requirements.txt`
```txt
# Core data processing
pandas==2.0.3
numpy==1.24.3

# Machine learning
scikit-learn==1.3.0
xgboost==2.0.3
lightgbm==4.0.0

# Deep learning (optional)
# tensorflow==2.13.0
# torch==2.0.1

# Statistical analysis
scipy==1.11.1
statsmodels==0.14.0

# Visualization
matplotlib==3.7.2
seaborn==0.12.2
plotly==5.16.1

# Jupyter
jupyter==1.0.0
notebook==7.0.3
ipywidgets==8.1.0

# Data profiling
pandas-profiling==3.6.6

# Model interpretability
shap==0.42.1

# Configuration management
pyyaml==6.0.1
python-dotenv==1.0.0

# Utilities
tqdm==4.66.1
joblib==1.3.2

# Testing
pytest==7.4.0
pytest-cov==4.1.0

# Linting and formatting
black==23.7.0
flake8==6.1.0
mypy==1.5.0

# Logging
loguru==0.7.0
```

**Create requirements.txt**:
```bash
$ cat > requirements.txt << 'EOF'
pandas==2.0.3
numpy==1.24.3
scikit-learn==1.3.0
xgboost==2.0.3
scipy==1.11.1
matplotlib==3.7.2
seaborn==0.12.2
jupyter==1.0.0
pyyaml==6.0.1
pytest==7.4.0
EOF
```

---

### Step 1.2.3: Install Dependencies

**Install all packages**:
```bash
$ pip install --upgrade pip
$ pip install -r requirements.txt

# This will take 3-5 minutes
```

**✓ Verification**:
```bash
# Check all packages installed
$ pip list | grep -E "pandas|numpy|scikit-learn|xgboost"

# Expected output:
# numpy         1.24.3
# pandas        2.0.3
# scikit-learn  1.3.0
# xgboost       2.0.3

# Test imports
$ python -c "import pandas, numpy, sklearn, xgboost; print('✓ All core packages imported successfully')"
```

---

## Step 1.3.0: Create Configuration Files

**Goal**: Externalize all parameters for configuration-driven pipeline

### Step 1.3.1: Create Data Configuration

**📄 File**: `config/data_config.yaml`
```yaml
# Data sources and paths
data_sources:
  train: "data/raw/train.csv"
  test: "data/raw/test.csv"
  validation: "data/raw/validation.csv"  # Optional
  
# Data loading parameters
loading:
  file_format: "csv"  # csv, parquet, excel, json
  compression: null   # gzip, bz2, zip, xz, or null
  encoding: "utf-8"
  sep: ","
  decimal: "."
  thousands: null
  
# Expected schema (for validation)
schema:
  target_column: "target"
  feature_columns:
    - feature_1
    - feature_2
    - feature_3
  
  expected_dtypes:
    feature_1: "float64"
    feature_2: "int64"
    feature_3: "object"
    target: "int64"
  
  expected_ranges:
    feature_1: [0, 100]
    feature_2: [0, 1000]
  
  categorical_values:
    feature_3: ["A", "B", "C", "D"]

# Data quality thresholds
validation:
  max_null_percentage: 0.10  # 10% missing allowed
  max_duplicates: 100
  key_columns: []  # Columns that should be unique
  
# Train/test split (if creating splits)
splitting:
  test_size: 0.2
  validation_size: 0.1  # Optional validation set
  random_state: 42
  stratify: true  # Stratify by target
```

**Create data config**:
```bash
$ cat > config/data_config.yaml << 'EOF'
data_sources:
  train: "data/raw/train.csv"
  test: "data/raw/test.csv"

loading:
  file_format: "csv"
  encoding: "utf-8"

schema:
  target_column: "target"

validation:
  max_null_percentage: 0.10
  
splitting:
  test_size: 0.2
  random_state: 42
  stratify: true
EOF
```

---

### Step 1.3.2: Create Model Configuration

**📄 File**: `config/model_config.yaml`
```yaml
# Model selection
model:
  type: "xgboost"  # xgboost, random_forest, logistic_regression, neural_network
  
  # XGBoost hyperparameters
  params:
    n_estimators: 100
    max_depth: 6
    learning_rate: 0.1
    subsample: 0.8
    colsample_bytree: 0.8
    min_child_weight: 1
    gamma: 0
    reg_alpha: 0
    reg_lambda: 1
    random_state: 42
    n_jobs: -1
    
  # Alternative models (comment out when not in use)
  # Random Forest params
  # params:
  #   n_estimators: 100
  #   max_depth: 10
  #   min_samples_split: 2
  #   min_samples_leaf: 1
  #   random_state: 42
  #   n_jobs: -1

# Training configuration
training:
  # Cross-validation
  cv_folds: 5
  cv_stratified: true
  
  # Early stopping (if supported)
  early_stopping:
    enabled: true
    rounds: 10
    metric: "auc"  # logloss, auc, error, etc.
  
  # Class weights (for imbalanced data)
  class_weight: "balanced"  # balanced, null, or dict
  
  # Reproducibility
  random_state: 42

# Hyperparameter tuning
hyperparameter_tuning:
  method: "grid_search"  # grid_search, random_search, bayesian
  
  param_grid:
    n_estimators: [50, 100, 200]
    max_depth: [3, 6, 10]
    learning_rate: [0.01, 0.1, 0.3]
  
  cv_folds: 3
  scoring: "f1"  # accuracy, f1, roc_auc, etc.
  n_jobs: -1

# Evaluation metrics
metrics:
  primary: "f1"  # Main metric for model selection
  additional:
    - "accuracy"
    - "precision"
    - "recall"
    - "roc_auc"
  
  # Classification thresholds
  threshold: 0.5
  threshold_tuning: false  # Optimize threshold on validation set
```

**Create model config**:
```bash
$ cat > config/model_config.yaml << 'EOF'
model:
  type: "xgboost"
  params:
    n_estimators: 100
    max_depth: 6
    learning_rate: 0.1
    random_state: 42

training:
  cv_folds: 5
  random_state: 42

metrics:
  primary: "f1"
  additional:
    - "accuracy"
    - "precision"
    - "recall"
EOF
```

---

### Step 1.3.3: Create Preprocessing Configuration

**📄 File**: `config/preprocessing_config.yaml`
```yaml
# Missing value handling
imputation:
  numeric:
    strategy: "median"  # mean, median, mode, constant, knn
    constant_value: 0   # Used if strategy is "constant"
  
  categorical:
    strategy: "mode"  # mode, constant
    constant_value: "MISSING"
  
  # Feature-specific overrides
  custom:
    income: "constant:0"
    age: "median"
  
  # Create missing indicators
  add_missing_indicator: true
  missing_indicator_features: []  # Empty = all with missing values

# Scaling and normalization
scaling:
  method: "standard"  # standard, minmax, robust, maxabs, none
  
  # Feature-specific scaling
  features_to_scale:
    - numeric_feature_1
    - numeric_feature_2
  
  # Features to skip scaling
  skip_features: []

# Categorical encoding
encoding:
  # One-hot encoding
  onehot:
    features: ["category_A", "category_B"]
    drop_first: false  # Avoid multicollinearity
    handle_unknown: "ignore"  # ignore, error
  
  # Ordinal encoding
  ordinal:
    education: ["HS", "BA", "MA", "PhD"]
    risk_level: ["low", "medium", "high"]
  
  # Target encoding (for high-cardinality)
  target:
    features: []
    smoothing: 1.0
  
  # Binary encoding
  binary:
    features: []
  
  # Frequency encoding
  frequency:
    features: []
  
  # Rare category grouping
  rare_category_threshold: 0.01  # Group categories < 1% as "Other"

# Feature engineering
feature_engineering:
  # Polynomial features
  polynomial:
    enabled: false
    features: [["feature_1", "feature_2"]]
    degree: 2
    interaction_only: true  # Only create interactions, no powers
  
  # Mathematical transformations
  transformations:
    log: ["income", "debt"]  # Log transform for skewed features
    sqrt: []
    reciprocal: []
    boxcox: []  # Requires positive values
  
  # Binning/discretization
  binning:
    age:
      bins: [0, 18, 35, 50, 65, 100]
      labels: ["child", "young_adult", "adult", "senior", "elderly"]
    income:
      bins: 5  # Equal-width bins
      strategy: "quantile"  # quantile, uniform
  
  # Aggregation features (groupby statistics)
  aggregations: []
  # Example:
  # - groupby: "customer_id"
  #   features: ["transaction_amount"]
  #   functions: ["mean", "std", "count"]
  
  # Date/time features
  datetime:
    features: []
    extract: ["year", "month", "day", "dayofweek", "hour"]
  
  # Text features
  text:
    features: []
    method: "tfidf"  # tfidf, count, word2vec
    max_features: 100

# Feature selection
feature_selection:
  enabled: false
  method: "variance_threshold"  # variance_threshold, mutual_info, rfe, lasso
  
  # Variance threshold
  variance_threshold: 0.01
  
  # Mutual information
  mutual_info_k: 20  # Top k features
  
  # RFE
  rfe_n_features: 10
  rfe_step: 1

# Outlier handling
outliers:
  method: "none"  # iqr, zscore, isolation_forest, none
  
  # IQR method
  iqr_multiplier: 1.5
  
  # Z-score method
  zscore_threshold: 3
  
  # Action to take
  action: "clip"  # clip, remove, none
```

**Create preprocessing config**:
```bash
$ cat > config/preprocessing_config.yaml << 'EOF'
imputation:
  numeric:
    strategy: "median"
  categorical:
    strategy: "mode"
  add_missing_indicator: false

scaling:
  method: "standard"

encoding:
  onehot:
    features: []
    handle_unknown: "ignore"
  
  rare_category_threshold: 0.01

feature_engineering:
  polynomial:
    enabled: false
  
  transformations:
    log: []

feature_selection:
  enabled: false
EOF
```

---

### Step 1.3.4: Create Validation Configuration

**📄 File**: `config/validation_config.yaml`
```yaml
# Train/validation/test split
data_split:
  test_size: 0.2
  validation_size: 0.1  # From remaining after test split
  random_state: 42
  stratify: true

# Cross-validation
cross_validation:
  method: "kfold"  # kfold, stratified_kfold, group_kfold, time_series_split
  n_splits: 5
  shuffle: true
  random_state: 42

# Evaluation metrics
metrics:
  classification:
    - "accuracy"
    - "precision"
    - "recall"
    - "f1"
    - "roc_auc"
    - "log_loss"
  
  regression:
    - "mse"
    - "rmse"
    - "mae"
    - "r2"
    - "mape"
  
  # Primary metric for model selection
  primary_metric: "f1"
  
  # Metric averaging for multiclass
  average: "weighted"  # micro, macro, weighted

# Model comparison
comparison:
  baseline_models:
    - "dummy_classifier"  # Most frequent class
    - "logistic_regression"  # Simple linear model
  
  models_to_evaluate:
    - "random_forest"
    - "xgboost"
    - "lightgbm"
  
  # Save top N models
  save_top_n: 3

# Model persistence
persistence:
  save_directory: "models/"
  save_format: "joblib"  # joblib, pickle
  versioning: true  # Include timestamp in filename
```

**Create validation config**:
```bash
$ cat > config/validation_config.yaml << 'EOF'
data_split:
  test_size: 0.2
  validation_size: 0.1
  random_state: 42
  stratify: true

cross_validation:
  method: "stratified_kfold"
  n_splits: 5
  random_state: 42

metrics:
  primary_metric: "f1"
  additional:
    - "accuracy"
    - "precision"
    - "recall"
    - "roc_auc"

persistence:
  save_directory: "models/"
  versioning: true
EOF
```

---

## Step 1.4.0: Set Up Jupyter Environment

### Step 1.4.1: Create Notebook Template

**📄 File**: `notebooks/00_template.ipynb`

Create via command line:
```bash
$ jupyter notebook notebooks/
# Then create new notebook and structure as follows
```

**Notebook Structure Template**:
```python
# Cell 1: Setup and Imports
"""
Notebook: [Notebook Title]
Purpose: [Brief description]
Author: [Your name]
Date: [YYYY-MM-DD]
"""

import sys
sys.path.append('..')  # Add parent directory to path

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from src.utils.config_loader import load_config
from src.utils.logger import setup_logger

# Visualization settings
%matplotlib inline
plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette("husl")
pd.set_option('display.max_columns', None)
pd.set_option('display.max_rows', 100)

# Reproducibility
np.random.seed(42)

# Setup logger
logger = setup_logger(__name__)
logger.info("Notebook initialized")

# ==========================================
# Cell 2: Load Configuration
# ==========================================
config = load_config('../config/data_config.yaml')
logger.info(f"Loaded configuration: {list(config.keys())}")

# ==========================================
# Cell 3: Load Data
# ==========================================
from src.data.data_loader import load_data

df = load_data(config)
logger.info(f"Data loaded: {df.shape}")
df.head()

# ==========================================
# Cell 4: Exploratory Data Analysis
# ==========================================
# [Your EDA code here]

# ==========================================
# Cell 5: Data Quality Checks
# ==========================================
# [Your validation code here]

# ==========================================
# Cell 6: Preprocessing
# ==========================================
# [Your preprocessing code here]

# ==========================================
# Cell 7: Modeling
# ==========================================
# [Your modeling code here]

# ==========================================
# Cell 8: Evaluation
# ==========================================
# [Your evaluation code here]

# ==========================================
# Cell 9: Results and Insights
# ==========================================
# [Document findings here using markdown cells]

# ==========================================
# Cell 10: Next Steps
# ==========================================
# [Document recommendations and future work]
```

---

### Step 1.4.2: Configure Notebook Metadata

**Install Jupyter extensions**:
```bash
$ pip install jupyter_contrib_nbextensions
$ jupyter contrib nbextension install --user
$ jupyter nbextension enable toc2/main
$ jupyter nbextension enable execute_time/ExecuteTime
```

**Create Jupyter config** (optional):
```bash
$ jupyter notebook --generate-config

# Edit ~/.jupyter/jupyter_notebook_config.py
# Add these lines:
c.NotebookApp.iopub_data_rate_limit = 10000000
c.NotebookApp.rate_limit_window = 3.0
```

---

## Step 1.5.0: Create Utility Modules

### Step 1.5.1: Create Config Loader

**📄 File**: `src/utils/config_loader.py`
```python
"""
Configuration loader utility.

Provides functions to load YAML configuration files with validation.
"""

import yaml
from pathlib import Path
from typing import Dict, Any


def load_config(config_path: str) -> Dict[str, Any]:
    """
    Load YAML configuration file.
    
    Parameters:
    -----------
    config_path : str
        Path to YAML configuration file
        
    Returns:
    --------
    config : dict
        Configuration dictionary
        
    Raises:
    -------
    FileNotFoundError
        If config file does not exist
    yaml.YAMLError
        If config file is not valid YAML
        
    Example:
    --------
    >>> config = load_config('config/data_config.yaml')
    >>> print(config['data_sources']['train'])
    data/raw/train.csv
    """
    config_path = Path(config_path)
    
    if not config_path.exists():
        raise FileNotFoundError(f"Config file not found: {config_path}")
    
    with open(config_path, 'r') as f:
        try:
            config = yaml.safe_load(f)
        except yaml.YAMLError as e:
            raise yaml.YAMLError(f"Error parsing YAML config: {e}")
    
    return config


def save_config(config: Dict[str, Any], config_path: str) -> None:
    """
    Save configuration dictionary to YAML file.
    
    Parameters:
    -----------
    config : dict
        Configuration dictionary to save
    config_path : str
        Path where config should be saved
        
    Example:
    --------
    >>> config = {'model': {'type': 'xgboost'}}
    >>> save_config(config, 'config/model_config.yaml')
    """
    config_path = Path(config_path)
    config_path.parent.mkdir(parents=True, exist_ok=True)
    
    with open(config_path, 'w') as f:
        yaml.dump(config, f, default_flow_style=False)


def merge_configs(*configs: Dict[str, Any]) -> Dict[str, Any]:
    """
    Merge multiple configuration dictionaries.
    
    Later configs override earlier ones.
    
    Parameters:
    -----------
    *configs : dict
        Variable number of configuration dictionaries
        
    Returns:
    --------
    merged_config : dict
        Merged configuration
        
    Example:
    --------
    >>> base_config = load_config('config/base.yaml')
    >>> override_config = load_config('config/override.yaml')
    >>> merged = merge_configs(base_config, override_config)
    """
    merged = {}
    for config in configs:
        merged.update(config)
    return merged
```

**Create the file**:
```bash
$ cat > src/utils/config_loader.py << 'EOF'
[paste code above]
EOF
```

---

### Step 1.5.2: Create Logging Setup

**📄 File**: `src/utils/logger.py`
```python
"""
Logging utility for ML pipeline.

Provides consistent logging configuration across all modules.
"""

import logging
import sys
from pathlib import Path
from typing import Optional


def setup_logger(
    name: str,
    level: int = logging.INFO,
    log_file: Optional[str] = None,
    log_to_console: bool = True
) -> logging.Logger:
    """
    Set up logger with file and/or console handlers.
    
    Parameters:
    -----------
    name : str
        Logger name (usually __name__ of calling module)
    level : int, default=logging.INFO
        Logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    log_file : str, optional
        Path to log file. If None, only log to console
    log_to_console : bool, default=True
        Whether to log to console
        
    Returns:
    --------
    logger : logging.Logger
        Configured logger instance
        
    Example:
    --------
    >>> logger = setup_logger(__name__, log_file='outputs/pipeline.log')

---

# Phase 2: Data Loading & Initial Validation - Detailed Implementation Steps

**Version**: 1.0  
**Companion to**: eda-mlp-implementation-guidelines.md (Phase 2)  
**Time Budget**: 20-40 minutes  
**Priority**: 🔴 CRITICAL - Data quality gates for downstream work

---

## Overview

This phase establishes robust data loading and validation:
- ✅ Build configuration-driven data loader
- ✅ Implement schema validation
- ✅ Create data quality checks
- ✅ Generate initial data profile
- ✅ Document data characteristics

---

## Step 2.1.0: Create Data Loading Module

**Goal**: Build reusable, configuration-driven data loader

### Step 2.1.1: Stub Data Loader Functions

**📄 File**: `src/data/data_loader.py`
```python
"""
Data loading module for ML pipeline.

Provides configuration-driven data loading with automatic format detection.
"""

import pandas as pd
from pathlib import Path
from typing import Dict, Any, Optional


def load_data(config: Dict[str, Any]) -> pd.DataFrame:
    """
    Load data from configured source.
    
    Parameters:
    -----------
    config : dict
        Configuration dictionary with 'data_sources' and 'loading' keys
        
    Returns:
    --------
    df : pd.DataFrame
        Loaded dataframe
        
    Example:
    --------
    >>> from src.utils.config_loader import load_config
    >>> config = load_config('config/data_config.yaml')
    >>> df = load_data(config)
    """
    pass  # Will implement in next steps


def detect_file_format(file_path: str) -> str:
    """
    Detect file format from extension.
    
    Parameters:
    -----------
    file_path : str
        Path to data file
        
    Returns:
    --------
    format : str
        File format ('csv', 'parquet', 'excel', 'json')
    """
    pass


def load_csv(file_path: str, **kwargs) -> pd.DataFrame:
    """Load CSV file."""
    pass


def load_parquet(file_path: str, **kwargs) -> pd.DataFrame:
    """Load Parquet file."""
    pass


def load_excel(file_path: str, **kwargs) -> pd.DataFrame:
    """Load Excel file."""
    pass


def load_json(file_path: str, **kwargs) -> pd.DataFrame:
    """Load JSON file."""
    pass
```

---

### Step 2.1.2: Implement File Format Detection

**Implementation**:
```python
def detect_file_format(file_path: str) -> str:
    """
    Detect file format from extension.
    
    Parameters:
    -----------
    file_path : str
        Path to data file
        
    Returns:
    --------
    format : str
        File format ('csv', 'parquet', 'excel', 'json', 'feather', 'hdf')
        
    Raises:
    -------
    ValueError
        If file format is not supported
        
    Example:
    --------
    >>> fmt = detect_file_format('data/train.csv.gz')
    >>> print(fmt)
    csv
    """
    file_path = Path(file_path)
    
    # Remove compression extensions
    stem = file_path.name
    for ext in ['.gz', '.bz2', '.zip', '.xz']:
        if stem.endswith(ext):
            stem = stem[:-len(ext)]
    
    # Extract actual file extension
    suffix = Path(stem).suffix.lower()
    
    format_map = {
        '.csv': 'csv',
        '.tsv': 'csv',
        '.txt': 'csv',
        '.parquet': 'parquet',
        '.pq': 'parquet',
        '.xlsx': 'excel',
        '.xls': 'excel',
        '.json': 'json',
        '.jsonl': 'json',
        '.feather': 'feather',
        '.h5': 'hdf',
        '.hdf': 'hdf',
        '.hdf5': 'hdf'
    }
    
    if suffix not in format_map:
        raise ValueError(
            f"Unsupported file format: {suffix}. "
            f"Supported formats: {list(format_map.values())}"
        )
    
    return format_map[suffix]
```

---

### Step 2.1.3: Implement Generic Loader

**Full implementation**:
```python
def load_data(config: Dict[str, Any], split: str = 'train') -> pd.DataFrame:
    """
    Load data from configured source.
    
    Supports CSV, Parquet, Excel, JSON formats with automatic detection.
    Handles compressed files automatically.
    
    Parameters:
    -----------
    config : dict
        Configuration dictionary with:
        - data_sources: dict with split names as keys
        - loading: dict with loading parameters
    split : str, default='train'
        Which data split to load ('train', 'test', 'validation')
        
    Returns:
    --------
    df : pd.DataFrame
        Loaded dataframe
        
    Raises:
    -------
    FileNotFoundError
        If data file does not exist
    ValueError
        If split not found in config or format not supported
        
    Example:
    --------
    >>> config = load_config('config/data_config.yaml')
    >>> train_df = load_data(config, split='train')
    >>> test_df = load_data(config, split='test')
    """
    # Get file path for requested split
    if split not in config['data_sources']:
        raise ValueError(
            f"Split '{split}' not found in config. "
            f"Available splits: {list(config['data_sources'].keys())}"
        )
    
    file_path = config['data_sources'][split]
    file_path = Path(file_path)
    
    if not file_path.exists():
        raise FileNotFoundError(f"Data file not found: {file_path}")
    
    # Detect format
    fmt = detect_file_format(str(file_path))
    
    # Get loading parameters
    loading_params = config.get('loading', {})
    
    # Load data based on format
    loaders = {
        'csv': load_csv,
        'parquet': load_parquet,
        'excel': load_excel,
        'json': load_json,
        'feather': load_feather,
        'hdf': load_hdf
    }
    
    loader = loaders[fmt]
    df = loader(str(file_path), **loading_params)
    
    print(f"✓ Loaded {split} data: {df.shape[0]:,} rows, {df.shape[1]} columns")
    return df


def load_csv(file_path: str, **kwargs) -> pd.DataFrame:
    """
    Load CSV file.
    
    Parameters:
    -----------
    file_path : str
        Path to CSV file
    **kwargs
        Additional arguments for pd.read_csv:
        - sep: column separator
        - encoding: file encoding
        - compression: compression type
    """
    # Set defaults
    defaults = {
        'sep': ',',
        'encoding': 'utf-8',
        'compression': 'infer'
    }
    defaults.update(kwargs)
    
    return pd.read_csv(file_path, **defaults)


def load_parquet(file_path: str, **kwargs) -> pd.DataFrame:
    """Load Parquet file."""
    return pd.read_parquet(file_path, **kwargs)


def load_excel(file_path: str, **kwargs) -> pd.DataFrame:
    """Load Excel file."""
    defaults = {
        'engine': 'openpyxl'  # For .xlsx files
    }
    defaults.update(kwargs)
    return pd.read_excel(file_path, **defaults)


def load_json(file_path: str, **kwargs) -> pd.DataFrame:
    """Load JSON file."""
    defaults = {
        'lines': False,  # Set True for JSONL format
        'orient': 'records'
    }
    defaults.update(kwargs)
    return pd.read_json(file_path, **defaults)


def load_feather(file_path: str, **kwargs) -> pd.DataFrame:
    """Load Feather file."""
    return pd.read_feather(file_path, **kwargs)


def load_hdf(file_path: str, **kwargs) -> pd.DataFrame:
    """Load HDF5 file."""
    key = kwargs.pop('key', 'data')  # HDF key to read
    return pd.read_hdf(file_path, key=key, **kwargs)
```

---

### Step 2.1.4: Add Compression Handling

**Note**: Compression handling is already included via `compression='infer'` in `load_csv()`. Pandas automatically detects and handles:
- `.gz` (gzip)
- `.bz2` (bzip2)
- `.zip` (zip)
- `.xz` (xz)

**Test compression support**:
```python
# In notebook or script:
import gzip
import pandas as pd

# Create compressed test file
df_test = pd.DataFrame({'a': [1, 2, 3], 'b': [4, 5, 6]})
df_test.to_csv('test.csv.gz', compression='gzip', index=False)

# Load compressed file
from src.data.data_loader import load_data
config = {
    'data_sources': {'test': 'test.csv.gz'},
    'loading': {}
}
df_loaded = load_data(config, split='test')
print(df_loaded)  # Should load successfully
```

---

## Step 2.2.0: Create Data Validation Module

**Goal**: Implement comprehensive data quality checks

**📄 File**: `src/data/data_validator.py`
```python
"""
Data validation module for ML pipeline.

Provides schema and quality validation functions.
"""

import pandas as pd
import numpy as np
from typing import Dict, List, Any, Tuple


class DataValidationError(Exception):
    """Raised when data validation fails."""
    pass


def validate_data(df: pd.DataFrame, config: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate dataframe against configured schema and quality rules.
    
    Parameters:
    -----------
    df : pd.DataFrame
        Dataframe to validate
    config : dict
        Configuration with 'schema' and 'validation' sections
        
    Returns:
    --------
    report : dict
        Validation report with results of all checks
        
    Raises:
    -------
    DataValidationError
        If critical validation checks fail
        
    Example:
    --------
    >>> config = load_config('config/data_config.yaml')
    >>> df = load_data(config)
    >>> report = validate_data(df, config)
    >>> print(report['is_valid'])
    True
    """
    report = {
        'is_valid': True,
        'errors': [],
        'warnings': [],
        'checks_passed': [],
        'summary': {}
    }
    
    # Run all validation checks
    schema_result = validate_schema(df, config)
    null_result = check_null_values(df, config)
    duplicate_result = check_duplicates(df, config)
    range_result = validate_ranges(df, config)
    categorical_result = validate_categorical_values(df, config)
    
    # Aggregate results
    all_results = [
        schema_result,
        null_result,
        duplicate_result,
        range_result,
        categorical_result
    ]
    
    for result in all_results:
        if not result['passed']:
            report['is_valid'] = False
            report['errors'].extend(result.get('errors', []))
        else:
            report['checks_passed'].append(result['check_name'])
        
        report['warnings'].extend(result.get('warnings', []))
        report['summary'][result['check_name']] = result
    
    return report
```

---

### Step 2.2.1: Implement Schema Validation

```python
def validate_schema(df: pd.DataFrame, config: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate dataframe schema against expected schema.
    
    Checks:
    - All expected columns present
    - Data types match expectations
    - No unexpected columns (warning only)
    
    Parameters:
    -----------
    df : pd.DataFrame
        Dataframe to validate
    config : dict
        Configuration with 'schema' section
        
    Returns:
    --------
    result : dict
        Validation result with 'passed', 'errors', 'warnings'
    """
    result = {
        'check_name': 'schema_validation',
        'passed': True,
        'errors': [],
        'warnings': []
    }
    
    if 'schema' not in config:
        result['warnings'].append("No schema defined in config")
        return result
    
    schema = config['schema']
    
    # Check expected columns
    if 'feature_columns' in schema:
        expected_cols = set(schema['feature_columns'])
        if 'target_column' in schema:
            expected_cols.add(schema['target_column'])
        
        actual_cols = set(df.columns)
        
        # Missing columns
        missing_cols = expected_cols - actual_cols
        if missing_cols:
            result['passed'] = False
            result['errors'].append(
                f"Missing columns: {sorted(missing_cols)}"
            )
        
        # Extra columns (warning only)
        extra_cols = actual_cols - expected_cols
        if extra_cols:
            result['warnings'].append(
                f"Unexpected columns: {sorted(extra_cols)}"
            )
    
    # Check data types
    if 'expected_dtypes' in schema:
        expected_dtypes = schema['expected_dtypes']
        
        for col, expected_dtype in expected_dtypes.items():
            if col not in df.columns:
                continue  # Already reported as missing
            
            actual_dtype = str(df[col].dtype)
            
            # Allow some flexibility in dtype matching
            if not _dtypes_compatible(actual_dtype, expected_dtype):
                result['passed'] = False
                result['errors'].append(
                    f"Column '{col}': expected {expected_dtype}, "
                    f"got {actual_dtype}"
                )
    
    return result


def _dtypes_compatible(actual: str, expected: str) -> bool:
    """Check if actual dtype is compatible with expected dtype."""
    # Exact match
    if actual == expected:
        return True
    
    # Numeric compatibility
    numeric_types = {'int64', 'int32', 'int16', 'int8',
                    'float64', 'float32', 'float16'}
    if actual in numeric_types and expected in numeric_types:
        return True
    
    # Object/string compatibility
    if actual == 'object' and expected in ['str', 'string']:
        return True
    if expected == 'object' and actual in ['str', 'string']:
        return True
    
    return False
```

---

### Step 2.2.2: Implement Null Value Check

```python
def check_null_values(df: pd.DataFrame, config: Dict[str, Any]) -> Dict[str, Any]:
    """
    Check for missing values and compare against thresholds.
    
    Parameters:
    -----------
    df : pd.DataFrame
        Dataframe to check
    config : dict
        Configuration with 'validation' section containing 'max_null_percentage'
        
    Returns:
    --------
    result : dict
        Check result with null statistics
    """
    result = {
        'check_name': 'null_value_check',
        'passed': True,
        'errors': [],
        'warnings': [],
        'null_summary': {}
    }
    
    # Calculate null percentages
    null_pct = (df.isnull().sum() / len(df) * 100).to_dict()
    result['null_summary'] = null_pct
    
    # Get threshold
    max_null_pct = config.get('validation', {}).get('max_null_percentage', 0.1) * 100
    
    # Check against threshold
    high_null_cols = {
        col: pct for col, pct in null_pct.items()
        if pct > max_null_pct
    }
    
    if high_null_cols:
        result['passed'] = False
        for col, pct in high_null_cols.items():
            result['errors'].append(
                f"Column '{col}' has {pct:.1f}% missing values "
                f"(threshold: {max_null_pct:.1f}%)"
            )
    
    # Warn about any nulls
    any_null_cols = {col: pct for col, pct in null_pct.items() if pct > 0}
    if any_null_cols:
        result['warnings'].append(
            f"{len(any_null_cols)} columns have missing values: "
            f"{sorted(any_null_cols.keys())}"
        )
    
    return result
```

---

### Step 2.2.3: Implement Duplicate Detection

```python
def check_duplicates(df: pd.DataFrame, config: Dict[str, Any]) -> Dict[str, Any]:
    """
    Check for duplicate rows.
    
    Parameters:
    -----------
    df : pd.DataFrame
        Dataframe to check
    config : dict
        Configuration with 'validation' section
        
    Returns:
    --------
    result : dict
        Check result with duplicate statistics
    """
    result = {
        'check_name': 'duplicate_check',
        'passed': True,
        'errors': [],
        'warnings': [],
        'duplicate_count': 0
    }
    
    # Get key columns or check all columns
    key_columns = config.get('validation', {}).get('key_columns', None)
    
    if key_columns:
        # Check duplicates on key columns
        duplicate_mask = df.duplicated(subset=key_columns, keep=False)
    else:
        # Check duplicates on all columns
        duplicate_mask = df.duplicated(keep=False)
    
    n_duplicates = duplicate_mask.sum()
    result['duplicate_count'] = int(n_duplicates)
    
    if n_duplicates > 0:
        max_duplicates = config.get('validation', {}).get('max_duplicates', 0)
        
        if n_duplicates > max_duplicates:
            result['passed'] = False
            result['errors'].append(
                f"Found {n_duplicates} duplicate rows "
                f"(threshold: {max_duplicates})"
            )
        else:
            result['warnings'].append(
                f"Found {n_duplicates} duplicate rows "
                f"(within threshold: {max_duplicates})"
            )
    
    return result
```

---

### Step 2.2.4: Implement Data Range Validation

```python
def validate_ranges(df: pd.DataFrame, config: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate numeric columns are within expected ranges.
    
    Parameters:
    -----------
    df : pd.DataFrame
        Dataframe to validate
    config : dict
        Configuration with 'schema.expected_ranges'
        
    Returns:
    --------
    result : dict
        Validation result
    """
    result = {
        'check_name': 'range_validation',
        'passed': True,
        'errors': [],
        'warnings': [],
        'range_violations': {}
    }
    
    expected_ranges = config.get('schema', {}).get('expected_ranges', {})
    
    for col, (min_val, max_val) in expected_ranges.items():
        if col not in df.columns:
            continue
        
        # Skip non-numeric columns
        if not pd.api.types.is_numeric_dtype(df[col]):
            result['warnings'].append(
                f"Column '{col}' is not numeric, skipping range check"
            )
            continue
        
        # Check for values outside range
        out_of_range = (df[col] < min_val) | (df[col] > max_val)
        n_violations = out_of_range.sum()
        
        if n_violations > 0:
            pct_violations = n_violations / len(df) * 100
            result['range_violations'][col] = {
                'count': int(n_violations),
                'percentage': float(pct_violations),
                'expected_range': [min_val, max_val],
                'actual_range': [float(df[col].min()), float(df[col].max())]
            }
            
            result['warnings'].append(
                f"Column '{col}': {n_violations} values ({pct_violations:.1f}%) "
                f"outside expected range [{min_val}, {max_val}]"
            )
    
    return result
```

---

### Step 2.2.5: Implement Categorical Value Validation

```python
def validate_categorical_values(df: pd.DataFrame, config: Dict[str, Any]) -> Dict[str, Any]:
    """
    Validate categorical columns have expected values.
    
    Parameters:
    -----------
    df : pd.DataFrame
        Dataframe to validate
    config : dict
        Configuration with 'schema.categorical_values'
        
    Returns:
    --------
    result : dict
        Validation result
    """
    result = {
        'check_name': 'categorical_validation',
        'passed': True,
        'errors': [],
        'warnings': [],
        'unexpected_values': {}
    }
    
    categorical_values = config.get('schema', {}).get('categorical_values', {})
    
    for col, expected_values in categorical_values.items():
        if col not in df.columns:
            continue
        
        actual_values = set(df[col].dropna().unique())
        expected_values_set = set(expected_values)
        
        # Check for unexpected values
        unexpected = actual_values - expected_values_set
        if unexpected:
            result['unexpected_values'][col] = sorted(list(unexpected))
            result['warnings'].append(
                f"Column '{col}' has unexpected values: {sorted(unexpected)}"
            )
        
        # Check for missing expected values
        missing = expected_values_set - actual_values
        if missing:
            result['warnings'].append(
                f"Column '{col}' missing expected values: {sorted(missing)}"
            )
    
    return result
```

---

## Step 2.3.0: Create Data Profiling Notebook

**Goal**: Initial EDA notebook with automated profiling

**📄 File**: `notebooks/01_data_profiling.ipynb`

```python
# Cell 1: Setup
"""
Data Profiling Notebook
Purpose: Initial data exploration and quality assessment
"""

import sys
sys.path.append('..')

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from src.utils.config_loader import load_config
from src.data.data_loader import load_data
from src.data.data_validator import validate_data

%matplotlib inline
plt.style.use('seaborn-v0_8-darkgrid')
pd.set_option('display.max_columns', None)

# Cell 2: Load Configuration
config = load_config('../config/data_config.yaml')
print("Configuration loaded:")
print(f"  Data sources: {list(config['data_sources'].keys())}")

# Cell 3: Load Data
df_train = load_data(config, split='train')
print(f"\nDataset shape: {df_train.shape}")
print(f"Memory usage: {df_train.memory_usage(deep=True).sum() / 1024**2:.2f} MB")

# Cell 4: Validate Data
validation_report = validate_data(df_train, config)
print("\nValidation Report:")
print(f"  Valid: {validation_report['is_valid']}")
print(f"  Checks passed: {len(validation_report['checks_passed'])}")
print(f"  Errors: {len(validation_report['errors'])}")
print(f"  Warnings: {len(validation_report['warnings'])}")

if validation_report['errors']:
    print("\nErrors:")
    for error in validation_report['errors']:
        print(f"  ❌ {error}")

if validation_report['warnings']:
    print("\nWarnings:")
    for warning in validation_report['warnings'][:5]:  # Show first 5
        print(f"  ⚠️  {warning}")

# Cell 5: Basic Info
print("\n" + "="*60)
print("DATASET INFORMATION")
print("="*60)
df_train.info()

# Cell 6: Summary Statistics
print("\n" + "="*60)
print("SUMMARY STATISTICS")
print("="*60)
df_train.describe(include='all').T

# Cell 7: Missing Values
print("\n" + "="*60)
print("MISSING VALUES")
print("="*60)
missing = df_train.isnull().sum()
missing_pct = (missing / len(df_train) * 100).round(2)
missing_df = pd.DataFrame({
    'Missing_Count': missing,
    'Missing_Percentage': missing_pct
})
missing_df = missing_df[missing_df['Missing_Count'] > 0].sort_values(
    'Missing_Percentage', ascending=False
)
print(missing_df)

# Visualize missing values
if len(missing_df) > 0:
    plt.figure(figsize=(10, 6))
    missing_df['Missing_Percentage'].plot(kind='barh')
    plt.xlabel('Missing Percentage (%)')
    plt.title('Missing Values by Feature')
    plt.tight_layout()
    plt.show()

# Cell 8: Data Types
print("\n" + "="*60)
print("DATA TYPES")
print("="*60)
dtype_counts = df_train.dtypes.value_counts()
print(dtype_counts)

# Cell 9: Cardinality
print("\n" + "="*60)
print("FEATURE CARDINALITY")
print("="*60)
cardinality = df_train.nunique().sort_values(ascending=False)
print(cardinality.head(20))

# Cell 10: Save Profile Report
import json

profile_report = {
    'dataset_shape': df_train.shape,
    'memory_mb': float(df_train.memory_usage(deep=True).sum() / 1024**2),
    'missing_values': missing_df.to_dict(),
    'data_types': {str(k): int(v) for k, v in dtype_counts.items()},
    'validation': validation_report
}

with open('../outputs/data_profile.json', 'w') as f:
    json.dump(profile_report, f, indent=2)

print("\n✓ Profile report saved to outputs/data_profile.json")
```

---

## Step 2.4.0: Create Data Quality Report

### Step 2.4.1: Save Validation Metrics

**Add to profiling notebook**:
```python
# Cell: Save Validation Metrics
import json
from datetime import datetime

metrics = {
    'timestamp': datetime.now().isoformat(),
    'dataset': 'train',
    'n_rows': len(df_train),
    'n_columns': len(df_train.columns),
    'validation': validation_report,
    'missing_values': {
        'columns_with_missing': len(missing_df),
        'total_missing_cells': int(df_train.isnull().sum().sum()),
        'missing_percentage': float(df_train.isnull().sum().sum() / df_train.size * 100)
    },
    'duplicates': {
        'n_duplicates': int(df_train.duplicated().sum()),
        'duplicate_percentage': float(df_train.duplicated().sum() / len(df_train) * 100)
    }
}

with open('../outputs/validation_metrics.json', 'w') as f:
    json.dump(metrics, f, indent=2)

print("✓ Validation metrics saved")
```

---

### Step 2.4.2: Generate Visualization Dashboard

```python
# Cell: Quality Dashboard
fig, axes = plt.subplots(2, 2, figsize=(15, 10))

# 1. Missing values heatmap
if len(missing_df) > 0:
    missing_matrix = df_train[missing_df.index].isnull()
    axes[0, 0].imshow(missing_matrix.T, aspect='auto', cmap='RdYlGn_r', interpolation='none')
    axes[0, 0].set_title('Missing Data Pattern')
    axes[0, 0].set_xlabel('Sample Index')
    axes[0, 0].set_ylabel('Features')
else:
    axes[0, 0].text(0.5, 0.5, 'No Missing Values', ha='center', va='center')
    axes[0, 0].set_title('Missing Data Pattern')

# 2. Data types distribution
dtype_counts.plot(kind='bar', ax=axes[0, 1])
axes[0, 1].set_title('Data Types Distribution')
axes[0, 1].set_xlabel('Data Type')
axes[0, 1].set_ylabel('Count')
axes[0, 1].tick_params(axis='x', rotation=45)

# 3. Cardinality distribution
cardinality.plot(kind='hist', bins=50, ax=axes[1, 0])
axes[1, 0].set_title('Feature Cardinality Distribution')
axes[1, 0].set_xlabel('Number of Unique Values')
axes[1, 0].set_ylabel('Number of Features')
axes[1, 0].set_yscale('log')

# 4. Validation summary
validation_summary = {
    'Passed': len(validation_report['checks_passed']),
    'Errors': len(validation_report['errors']),
    'Warnings': len(validation_report['warnings'])
}
colors = ['green', 'red', 'orange']
axes[1, 1].bar(validation_summary.keys(), validation_summary.values(), color=colors)
axes[1, 1].set_title('Validation Summary')
axes[1, 1].set_ylabel('Count')

plt.tight_layout()
plt.savefig('../outputs/data_quality_dashboard.png', dpi=300, bbox_inches='tight')
plt.show()

print("✓ Dashboard saved to outputs/data_quality_dashboard.png")
```

---

## Phase 2 Complete! 🎉

**What you've accomplished**:
- ✅ Configuration-driven data loader with multi-format support
- ✅ Comprehensive schema and quality validation
- ✅ Automated data profiling
- ✅ Quality metrics and visualizations

**Verification Checklist**:
```bash
# Test data loader
$ python -c "from src.utils.config_loader import load_config; from src.data.data_loader import load_data; config = load_config('config/data_config.yaml'); df = load_data(config); print(f'✓ Loaded {len(df)} rows')"

# Check outputs generated
$ ls -lh outputs/
# Should show: data_profile.json, validation_metrics.json, data_quality_dashboard.png

# Run profiling notebook
$ jupyter notebook notebooks/01_data_profiling.ipynb
```

**Next Phase**: Phase 3 - Exploratory Data Analysis (

---

# Phase 3: Exploratory Data Analysis - Detailed Implementation Steps

**Version**: 1.0  
**Companion to**: eda-mlp-implementation-guidelines.md (Phase 3)  
**Time Budget**: 60-120 minutes  
**Priority**: 🔴 CRITICAL - Understanding data informs all modeling decisions

---

## Overview

This phase conducts comprehensive exploratory analysis:
- ✅ Analyze univariate distributions
- ✅ Examine bivariate relationships
- ✅ Explore multivariate patterns
- ✅ Analyze temporal trends (if applicable)
- ✅ Perform segment analysis
- ✅ Document insights and recommendations

---

## Step 3.1.0: Analyze Univariate Distributions

**Goal**: Understand characteristics of individual features

**📄 File**: `notebooks/02_eda_univariate.ipynb`

### Step 3.1.1: Plot Numeric Distributions

```python
# Cell 1: Setup
import sys
sys.path.append('..')

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

from src.utils.config_loader import load_config
from src.data.data_loader import load_data

%matplotlib inline
plt.style.use('seaborn-v0_8-darkgrid')
sns.set_palette("husl")

# Cell 2: Load Data
config = load_config('../config/data_config.yaml')
df = load_data(config, split='train')

# Cell 3: Identify Numeric Columns
numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
print(f"Found {len(numeric_cols)} numeric columns")
print(numeric_cols)

# Cell 4: Distribution Plots
n_cols = 3
n_rows = (len(numeric_cols) + n_cols - 1) // n_cols

fig, axes = plt.subplots(n_rows, n_cols, figsize=(15, 5*n_rows))
axes = axes.flatten() if n_rows > 1 else [axes] if n_cols == 1 else axes

for idx, col in enumerate(numeric_cols):
    df[col].hist(bins=50, ax=axes[idx], edgecolor='black', alpha=0.7)
    axes[idx].set_title(f'{col}\nMean: {df[col].mean():.2f}, Std: {df[col].std():.2f}')
    axes[idx].set_xlabel('Value')
    axes[idx].set_ylabel('Frequency')
    axes[idx].axvline(df[col].mean(), color='red', linestyle='--', label='Mean')
    axes[idx].axvline(df[col].median(), color='green', linestyle='--', label='Median')
    axes[idx].legend()

# Hide empty subplots
for idx in range(len(numeric_cols), len(axes)):
    axes[idx].axis('off')

plt.tight_layout()
plt.savefig('../outputs/numeric_distributions.png', dpi=300, bbox_inches='tight')
plt.show()

# Cell 5: Box Plots (for outlier detection)
fig, axes = plt.subplots(n_rows, n_cols, figsize=(15, 5*n_rows))
axes = axes.flatten() if n_rows > 1 else [axes] if n_cols == 1 else axes

for idx, col in enumerate(numeric_cols):
    df.boxplot(column=col, ax=axes[idx])
    axes[idx].set_title(f'{col} - Box Plot')
    axes[idx].set_ylabel('Value')

for idx in range(len(numeric_cols), len(axes)):
    axes[idx].axis('off')

plt.tight_layout()
plt.savefig('../outputs/numeric_boxplots.png', dpi=300, bbox_inches='tight')
plt.show()

# Cell 6: Density Plots (KDE)
fig, axes = plt.subplots(n_rows, n_cols, figsize=(15, 5*n_rows))
axes = axes.flatten() if n_rows > 1 else [axes] if n_cols == 1 else axes

for idx, col in enumerate(numeric_cols):
    df[col].plot(kind='density', ax=axes[idx])
    axes[idx].set_title(f'{col} - Density Plot')
    axes[idx].set_xlabel('Value')
    axes[idx].set_ylabel('Density')

for idx in range(len(numeric_cols), len(axes)):
    axes[idx].axis('off')

plt.tight_layout()
plt.savefig('../outputs/numeric_density.png', dpi=300, bbox_inches='tight')
plt.show()
```

---

### Step 3.1.2: Calculate Summary Statistics

```python
# Cell: Comprehensive Summary Statistics
summary_stats = pd.DataFrame()

for col in numeric_cols:
    stats_dict = {
        'count': df[col].count(),
        'missing': df[col].isnull().sum(),
        'missing_pct': df[col].isnull().sum() / len(df) * 100,
        'mean': df[col].mean(),
        'std': df[col].std(),
        'min': df[col].min(),
        'q25': df[col].quantile(0.25),
        'median': df[col].median(),
        'q75': df[col].quantile(0.75),
        'max': df[col].max(),
        'range': df[col].max() - df[col].min(),
        'iqr': df[col].quantile(0.75) - df[col].quantile(0.25),
        'skewness': df[col].skew(),
        'kurtosis': df[col].kurtosis(),
        'cv': df[col].std() / df[col].mean() if df[col].mean() != 0 else np.nan
    }
    summary_stats[col] = pd.Series(stats_dict)

summary_stats = summary_stats.T
print(summary_stats)

# Save to CSV
summary_stats.to_csv('../outputs/numeric_summary_stats.csv')
print("\n✓ Summary statistics saved")

# Cell: Identify skewed features
skewed_features = summary_stats[summary_stats['skewness'].abs() > 1].index.tolist()
print(f"\nHighly skewed features (|skewness| > 1): {len(skewed_features)}")
for feat in skewed_features:
    skew_val = summary_stats.loc[feat, 'skewness']
    print(f"  • {feat}: {skew_val:.2f}")
```

---

### Step 3.1.3: Analyze Categorical Distributions

```python
# Cell: Identify Categorical Columns
categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()
print(f"Found {len(categorical_cols)} categorical columns")
print(categorical_cols)

# Cell: Value Counts for Each Categorical
for col in categorical_cols:
    print(f"\n{'='*60}")
    print(f"Feature: {col}")
    print(f"{'='*60}")
    
    value_counts = df[col].value_counts()
    value_pct = df[col].value_counts(normalize=True) * 100
    
    summary = pd.DataFrame({
        'Count': value_counts,
        'Percentage': value_pct
    })
    print(summary)
    
    # Visualize
    plt.figure(figsize=(10, 6))
    if len(value_counts) <= 20:
        value_counts.plot(kind='barh')
        plt.xlabel('Count')
        plt.ylabel(col)
        plt.title(f'{col} - Value Distribution')
    else:
        plt.text(0.5, 0.5, f'Too many categories ({len(value_counts)})\nShowing top 20',
                ha='center', va='center', fontsize=12)
        value_counts.head(20).plot(kind='barh')
        plt.xlabel('Count')
        plt.ylabel(col)
        plt.title(f'{col} - Top 20 Values')
    
    plt.tight_layout()
    plt.savefig(f'../outputs/categorical_{col}_distribution.png', dpi=300, bbox_inches='tight')
    plt.show()

# Cell: Categorical Summary Table
cat_summary = pd.DataFrame()

for col in categorical_cols:
    stats_dict = {
        'unique_values': df[col].nunique(),
        'missing': df[col].isnull().sum(),
        'missing_pct': df[col].isnull().sum() / len(df) * 100,
        'most_frequent': df[col].mode()[0] if not df[col].mode().empty else None,
        'most_frequent_count': df[col].value_counts().iloc[0] if len(df[col].value_counts()) > 0 else 0,
        'most_frequent_pct': df[col].value_counts(normalize=True).iloc[0] * 100 if len(df[col].value_counts()) > 0 else 0
    }
    cat_summary[col] = pd.Series(stats_dict)

cat_summary = cat_summary.T
print(cat_summary)

cat_summary.to_csv('../outputs/categorical_summary.csv')
print("\n✓ Categorical summary saved")
```

---

### Step 3.1.4: Identify Outliers

```python
# Cell: Outlier Detection using IQR Method
def detect_outliers_iqr(data, column, multiplier=1.5):
    """Detect outliers using IQR method."""
    Q1 = data[column].quantile(0.25)
    Q3 = data[column].quantile(0.75)
    IQR = Q3 - Q1
    
    lower_bound = Q1 - multiplier * IQR
    upper_bound = Q3 + multiplier * IQR
    
    outliers = data[(data[column] < lower_bound) | (data[column] > upper_bound)]
    
    return {
        'n_outliers': len(outliers),
        'outlier_pct': len(outliers) / len(data) * 100,
        'lower_bound': lower_bound,
        'upper_bound': upper_bound,
        'outlier_indices': outliers.index.tolist()
    }

# Detect outliers for all numeric columns
outlier_summary = {}

for col in numeric_cols:
    outlier_info = detect_outliers_iqr(df, col)
    outlier_summary[col] = outlier_info
    
    if outlier_info['n_outliers'] > 0:
        print(f"\n{col}:")
        print(f"  Outliers: {outlier_info['n_outliers']} ({outlier_info['outlier_pct']:.2f}%)")
        print(f"  Valid range: [{outlier_info['lower_bound']:.2f}, {outlier_info['upper_bound']:.2f}]")

# Cell: Z-Score Method
def detect_outliers_zscore(data, column, threshold=3):
    """Detect outliers using z-score method."""
    z_scores = np.abs(stats.zscore(data[column].dropna()))
    outliers = data[column][z_scores > threshold]
    
    return {
        'n_outliers': len(outliers),
        'outlier_pct': len(outliers) / len(data) * 100,
        'outlier_indices': outliers.index.tolist()
    }

print("\n" + "="*60)
print("Z-Score Method (threshold=3)")
print("="*60)

for col in numeric_cols:
    outlier_info = detect_outliers_zscore(df, col)
    if outlier_info['n_outliers'] > 0:
        print(f"{col}: {outlier_info['n_outliers']} outliers ({outlier_info['outlier_pct']:.2f}%)")

# Cell: Visualize Outliers
fig, axes = plt.subplots(len(numeric_cols), 1, figsize=(12, 4*len(numeric_cols)))
if len(numeric_cols) == 1:
    axes = [axes]

for idx, col in enumerate(numeric_cols):
    outlier_info = outlier_summary[col]
    
    axes[idx].scatter(df.index, df[col], alpha=0.5, label='Normal')
    if outlier_info['n_outliers'] > 0:
        outlier_indices = outlier_info['outlier_indices']
        axes[idx].scatter(outlier_indices, df.loc[outlier_indices, col],
                         color='red', alpha=0.7, label='Outliers')
    
    axes[idx].axhline(outlier_info['upper_bound'], color='orange', linestyle='--', label='Upper Bound')
    axes[idx].axhline(outlier_info['lower_bound'], color='orange', linestyle='--', label='Lower Bound')
    axes[idx].set_title(f'{col} - Outlier Detection')
    axes[idx].set_xlabel('Index')
    axes[idx].set_ylabel('Value')
    axes[idx].legend()

plt.tight_layout()
plt.savefig('../outputs/outlier_detection.png', dpi=300, bbox_inches='tight')
plt.show()
```

---

### Step 3.1.5: Document Distribution Characteristics

```markdown
# Cell: Distribution Characteristics Summary

## Numeric Features

### Skewness Analysis
- **Right-skewed (positive skew > 1)**:
  - `feature_x`: Skewness = 2.5 → Consider log transform
  - `feature_y`: Skewness = 1.8 → Consider sqrt transform

- **Left-skewed (negative skew < -1)**:
  - `feature_z`: Skewness = -1.5 → Consider reflect + log transform

- **Approximately normal (-1 < skew < 1)**:
  - `feature_a`, `feature_b`, `feature_c`

### Outlier Summary
- **High outlier percentage (>5%)**:
  - `feature_x`: 8.2% outliers → Investigate data quality
  - `feature_y`: 6.5% outliers → Consider robust scaling

- **Moderate outliers (1-5%)**:
  - `feature_a`: 2.3% outliers → Consider capping/winsorization

### Multimodality
- **Bimodal distributions** (suggests subgroups):
  - `feature_m` → Investigate segmentation

## Categorical Features

### High Cardinality (>20 unique values)
- `feature_cat_x`: 150 unique values → Consider target encoding or grouping
- `feature_cat_y`: 45 unique values → Consider frequency encoding

### Imbalanced Categories
- `feature_cat_z`: 90% in one category → Low predictive power, consider removing

## Recommendations for Preprocessing

1. **Log Transform**: `feature_x`, `feature_y` (right-skewed)
2. **Robust Scaling**: `feature_a`, `feature_b` (outliers present)
3. **Outlier Capping**: Use 99th percentile for `feature_x`
4. **Categorical Encoding**:
   - One-hot: Low cardinality features (<10 categories)
   - Target encoding: High cardinality features (>20 categories)
   - Rare category grouping: Categories with <1% frequency
```

---

## Step 3.2.0: Analyze Bivariate Relationships

**Goal**: Understand feature interactions and relationships with target

### Step 3.2.1: Calculate Correlation Matrix

```python
# Cell: Correlation Matrix for Numeric Features
correlation_matrix = df[numeric_cols].corr()
print("Correlation Matrix:")
print(correlation_matrix)

# Save correlation matrix
correlation_matrix.to_csv('../outputs/correlation_matrix.csv')
print("\n✓ Correlation matrix saved")

# Cell: Identify Highly Correlated Pairs
high_corr_pairs = []
threshold = 0.7

for i in range(len(correlation_matrix.columns)):
    for j in range(i+1, len(correlation_matrix.columns)):
        if abs(correlation_matrix.iloc[i, j]) > threshold:
            high_corr_pairs.append({
                'feature_1': correlation_matrix.columns[i],
                'feature_2': correlation_matrix.columns[j],
                'correlation': correlation_matrix.iloc[i, j]
            })

high_corr_df = pd.DataFrame(high_corr_pairs).sort_values('correlation', ascending=False, key=abs)
print(f"\nHighly correlated pairs (|r| > {threshold}):")
print(high_corr_df)

high_corr_df.to_csv('../outputs/high_correlations.csv', index=False)
```

---

### Step 3.2.2: Visualize Correlation Heatmap

```python
# Cell: Correlation Heatmap
plt.figure(figsize=(12, 10))
mask = np.triu(np.ones_like(correlation_matrix, dtype=bool))  # Mask upper triangle

sns.heatmap(correlation_matrix,
            mask=mask,
            annot=True if len(numeric_cols) <= 15 else False,
            fmt='.2f',
            cmap='coolwarm',
            center=0,
            square=True,
            linewidths=0.5,
            cbar_kws={"shrink": 0.8})

plt.title('Correlation Heatmap - Numeric Features', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.savefig('../outputs/correlation_heatmap.png', dpi=300, bbox_inches='tight')
plt.show()

# Cell: Clustered Correlation Heatmap
from scipy.cluster import hierarchy
from scipy.spatial.distance import squareform

# Calculate distance matrix
dissimilarity = 1 - abs(correlation_matrix)
Z = hierarchy.linkage(squareform(dissimilarity), method='average')

# Reorder correlation matrix based on clustering
dendro = hierarchy.dendrogram(Z, labels=correlation_matrix.columns, no_plot=True)
ordered_cols = [correlation_matrix.columns[i] for i in dendro['leaves']]
ordered_corr = correlation_matrix.loc[ordered_cols, ordered_cols]

plt.figure(figsize=(12, 10))
sns.heatmap(ordered_corr,
            annot=True if len(numeric_cols) <= 15 else False,
            fmt='.2f',
            cmap='coolwarm',
            center=0,
            square=True,
            linewidths=0.5)

plt.title('Clustered Correlation Heatmap', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.savefig('../outputs/correlation_heatmap_clustered.png', dpi=300, bbox_inches='tight')
plt.show()
```

---

### Step 3.2.3: Analyze Feature-Target Relationships

```python
# Cell: Feature-Target Relationships (Classification)
target_col = config['schema']['target_column']

if target_col in df.columns:
    print(f"Analyzing relationships with target: {target_col}")
    print(f"Target distribution:\n{df[target_col].value_counts()}\n")
    
    # For numeric features vs categorical target
    for col in numeric_cols:
        if col == target_col:
            continue
        
        plt.figure(figsize=(12, 5))
        
        # Box plot by target class
        plt.subplot(1, 2, 1)
        df.boxplot(column=col, by=target_col, ax=plt.gca())
        plt.title(f'{col} by {target_col}')
        plt.suptitle('')  # Remove default title
        
        # Violin plot by target class
        plt.subplot(1, 2, 2)
        for target_value in df[target_col].unique():
            subset = df[df[target_col] == target_value][col].dropna()
            plt.violinplot([subset],
                          positions=[target_value],
                          showmeans=True,
                          showmedians=True)
        plt.xlabel(target_col)
        plt.ylabel(col)
        plt.title(f'{col} Distribution by {target_col}')
        
        plt.tight_layout()
        plt.savefig(f'../outputs/target_relationship_{col}.png', dpi=300, bbox_inches='tight')
        plt.show()
    
    # For categorical features vs categorical target
    for col in categorical_cols:
        if col == target_col:
            continue
        
        # Cross-tabulation
        crosstab = pd.crosstab(df[col], df[target_col], normalize='index') * 100
        print(f"\n{col} vs {target_col} (% within {col}):")
        print(crosstab)
        
        # Stacked bar plot
        plt.figure(figsize=(12, 6))
        crosstab.plot(kind='bar', stacked=False)
        plt.title(f'{col} vs {target_col}')
        plt.xlabel(col)
        plt.ylabel('Percentage (%)')
        plt.legend(title=target_col)
        plt.xticks(rotation=45, ha='right')
        plt.tight_layout()
        plt.savefig(f'../outputs/target_relationship_{col}.png', dpi=300, bbox_inches='tight')
        plt.show()
```

---

### Step 3.2.4: Create Pair Plots for Key Features

```python
# Cell: Select Key Features for Pair Plot
# Select top correlated features with target or high variance features
if target_col in df.columns and target_col in numeric_cols:
    target_correlations = correlation_matrix[target_col].abs().sort_values(ascending=False)
    key_features = target_correlations.head(6).index.tolist()
else:
    # Select features with highest variance
    variances = df[numeric_cols].var().sort_values(ascending=False)
    key_features = variances.head(6).index.tolist()

print(f"Key features for pair plot: {key_features}")

# Cell: Create Pair Plot
if target_col in df.columns:
    sns.pairplot(df[key_features + [target_col]],
                hue=target_col,
                diag_kind='kde',
                plot_kws={'alpha': 0.6},
                corner=True)
else:
    sns.pairplot(df[key_features],
                diag_kind='kde',
                plot_kws={'alpha': 0.6},
                corner=True)

plt.suptitle('Pair Plot - Key Features', y=1.02, fontsize=16, fontweight='bold')
plt.tight_layout()
plt.savefig('../outputs/pairplot_key_features.png', dpi=300, bbox_inches='tight')
plt.show()
```

---

### Step 3.2.5: Test Statistical Relationships

```python
# Cell: Statistical Tests for Feature-Target Relationships
from scipy.stats import chi2_contingency, ttest_ind, f_oneway

test_results = []

# Chi-square test for categorical features vs categorical target
if target_col in categorical_cols or df[target_col].dtype in ['int64', 'object']:
    for col in categorical_cols:
        if col == target_col:
            continue
        
        crosstab = pd.crosstab(df[col], df[target_col])
        chi2, p_value, dof, expected = chi2_contingency(crosstab)
        
        test_results.append({
            'feature': col,
            'test': 'chi2',
            'statistic': chi2,
            'p_value': p_value,
            'significant': p_value < 0.05
        })

# T-test or ANOVA for numeric features vs categorical target
if target_col in df.columns:
    target_classes = df[target_col].unique()
    
    for col in numeric_cols:
        if col == target_col:
            continue
        
        groups = [df[df[target_col] == cls][col].dropna() for cls in target_classes]
        
        if len(target_classes) == 2:
            # T-test for binary target
            stat, p_value = ttest_ind(*groups)
            test_name = 't-test'
        else:
            # ANOVA for multi-class target
            stat, p_value = f_oneway(*groups)
            test_name = 'ANOVA'
        
        test_results.append({
            'feature': col,
            'test': test_name,
            'statistic': stat,
            'p_value': p_value,
            'significant': p_value < 0.05
        })

# Display results
test_results_df = pd.DataFrame(test_results).sort_values('p_value')
print("\nStatistical Test Results:")
print(test_results_df)

print("\nSignificant relationships (p < 0.05):")
print(test_results_df[test_results_df['significant']])

test_results_df.to_csv('../outputs/statistical_tests.csv', index=False)
print("\n✓ Statistical test results saved")
```

---

## Step 3.3.0: Analyze Multivariate Patterns

**Goal**: Understand complex interactions between multiple features

### Step 3.3.1: Apply PCA for Visualization

```python
# Cell: PCA for Dimensionality Reduction
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

# Prepare data: select numeric features and handle missing values
pca_features = df[numeric_cols].dropna()
feature_names = pca_features.columns.tolist()

# Standardize features
scaler = StandardScaler()
features_scaled = scaler.fit_transform(pca_features)

# Apply PCA
pca = PCA()
pca_components = pca.fit_transform(features_scaled)

# Explained variance
explained_variance = pca.explained_variance_ratio_
cumulative_variance = np.cumsum(explained_variance)

print("Explained Variance by Component:")
for i, (var, cum_var) in enumerate(zip(explained_variance[:10], cumulative_variance[:10])):
    print(f"  PC{i+1}: {var:.4f} ({cum_var:.4f} cumulative)")

# Cell: Scree Plot
fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# Scree plot
axes[0].plot(range(1, len(explained_variance)+1), explained_variance, 'bo-')
axes[0].set_xlabel('Principal Component')
axes[0].set_ylabel('Explained Variance Ratio')
axes[0].set_title('Scree Plot')
axes[0].grid(True)

# Cumulative variance
axes[1].plot(range(1, len(cumulative_variance)+1), cumulative_variance, 'ro-')
axes[1].axhline(y=0.95, color='g', linestyle='--', label='95% variance')
axes[1].set_xlabel('Number of Components')
axes[1].set_ylabel('Cumulative Explained Variance')
axes[1].set_title('Cumulative Explained Variance')
axes[1].legend()
axes[1].grid(True)

plt.tight_layout()
plt.savefig('../outputs/pca_variance.png', dpi=300, bbox_inches='tight')
plt.show()

# Find number of components for 95% variance
n_components_95 = np.argmax(cumulative_variance >= 0.95) + 1
print(f"\nComponents needed for 95% variance: {n_components_95}")

# Cell: PCA 2D Visualization
plt.figure(figsize=(10, 8))

if target_col in df.columns:
    # Color by target
    target_values = df.loc[pca_features.index, target_col]
    scatter = plt.scatter(pca_components[:, 0], pca_components[:, 1],
                         c=target_values, cmap='viridis', alpha=0.6)
    plt.colorbar(scatter, label=target_col)
else:
    plt.scatter(pca_components[:, 0], pca_components[:, 1], alpha=0.6)

plt.xlabel(f'PC1 ({explained_variance[0]:.2%} variance)')
plt.ylabel(f'PC2 ({explained_variance[1]:.2%} variance)')
plt.title('PCA - First Two Components')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('../outputs/pca_2d.png', dpi=300, bbox_inches='tight')
plt.show()

# Cell: Feature Loadings
loadings = pd.DataFrame(
    pca.components_[:2].T,
    columns=['PC1', 'PC2'],
    index=feature_names
)

print("\nTop features contributing to PC1:")
print(loadings['PC1'].abs().sort_values(ascending=False).head(10))

print("\nTop features contributing to PC2:")
print(loadings['PC2'].abs().sort_values(ascending=False).head(10))

# Visualize loadings
fig, axes = plt.subplots(1, 2, figsize=(15, 6))

loadings['PC1'].sort_values().plot(kind='barh', ax=axes[0])
axes[0].set_title('PC1 Feature Loadings')
axes[0].set_xlabel('Loading')

loadings['PC2'].sort_values().plot(kind='barh', ax=axes[1])
axes[1].set_title('PC2 Feature Loadings')
axes[1].set_xlabel('Loading')

plt.tight_layout()
plt.savefig('../outputs/pca_loadings.png', dpi=300, bbox_inches='tight')
plt.show()
```

---

### Step 3.3.2: Cluster Analysis

```python
# Cell: K-Means Clustering
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score

# Determine optimal number of clusters using elbow method
inertias = []
silhouette_scores = []
K_range = range(2, 11)

for k in K_range:
    kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
    kmeans.fit(features_scaled)
    inertias.append(kmeans.inertia_)
    silhouette_scores.append(silhouette_score(features_scaled, kmeans.labels_))

# Plot elbow curve
fig, axes = plt.subplots(1, 2, figsize=(15, 5))

axes[0].plot(K_range, inertias, 'bo-')
axes[0].set_xlabel('Number of Clusters (k)')
axes[0].set_ylabel('Inertia')
axes[0].set_title('Elbow Method')
axes[0].grid(True)

axes[1].plot(K_range, silhouette_scores, 'ro-')
axes[1].set_xlabel('Number of Clusters (k)')
axes[1].set_ylabel('Silhouette Score')
axes[1].set_title('Silhouette Analysis')
axes[1].grid(True)

plt.tight_layout()
plt.savefig('../outputs/clustering_optimization.png', dpi=300, bbox_inches='tight')
plt.show()

optimal_k = K_range[np.argmax(silhouette_scores)]
print(f"\nOptimal number of clusters (max silhouette): {optimal_k}")

# Cell: Apply K-Means with Optimal k
kmeans = KMeans(n_clusters=optimal_k, random_state=42, n_init=10)
clusters = kmeans.fit_predict(features_scaled)

# Visualize clusters in PCA space
plt.figure(figsize=(10, 8))
scatter = plt.scatter(pca_components[:, 0], pca_components[:, 1],
                     c=clusters, cmap='tab10', alpha=0.6)
plt.colorbar(scatter, label='Cluster')
plt.xlabel(f'PC1 ({explained_variance[0]:.2%} variance)')
plt.ylabel(f'PC2 ({explained_variance[1]:.2%} variance)')
plt.title(f'K-Means Clustering (k={optimal_k})')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.savefig('../outputs/kmeans_clusters.png', dpi=300, bbox_inches='tight')
plt.show()

# Cell: Cluster Profiles
cluster_profiles = pca_features.copy()
cluster_profiles['cluster'] = clusters

profile_summary = cluster_profiles.groupby('cluster').agg(['mean', 'std', 'count'])
print("\nCluster Profiles (mean values):")
print(profile_summary.xs('mean', level=1, axis=1))

# Save cluster profiles
profile_summary.to_csv('../outputs/cluster_profiles.csv')
print("\n✓ Cluster profiles saved")
```

---

### Step 3.3.3: Interaction Feature Exploration

```python
# Cell: Test Interaction Features
from sklearn.preprocessing import PolynomialFeatures

# Select top correlated features for interaction exploration
if target_col in numeric_cols:
    target_corr = correlation_matrix[target_col].abs().sort_values(ascending=False)
    top_features = target_corr[1:6].index.tolist()  # Top 5 excluding target itself
else:
    # Select features with highest variance
    top_features = df[numeric_cols].var().sort_values(ascending=False).head(5).index.tolist()

print(f"Testing interactions for: {top_features}")

# Cell: Create Interaction Features
interaction_data = df[top_features].dropna()

poly = PolynomialFeatures(degree=2, interaction_only=True, include_bias=False)
interactions = poly.fit_transform(interaction_data)
interaction_feature_names = poly.get_feature_names_out(top_features)

# Keep only interaction terms (not original features)
interaction_only = interactions[:, len(top_features):]
interaction_names = [name for name in interaction_feature_names if '*' in name]

print(f"\nCreated {len(interaction_names)} interaction features")
print("Sample interactions:")
for name in interaction_names[:10]:
    print(f"  • {name}")

# Cell: Evaluate Interaction Importance (if target available)
if target_col in df.columns and target_col not in top_features:
    from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
    
    # Align target with interaction data
    y_aligned = df.loc[interaction_data.index, target_col]
    
    # Determine task type
    is_classification = df[target_col].nunique() < 10
    
    if is_classification:
        model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
    else:
        model = RandomForestRegressor(n_estimators=100, random_state=42, n_jobs=-1)
    
    # Fit on interaction features only
    model.fit(interaction_only, y_aligned)
    
    # Get feature importances
    interaction_importance = pd.DataFrame({
        'feature': interaction_names,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print("\nTop 10 interaction features by importance:")
    print(interaction_importance.head(10))
    
    # Visualize top interactions
    plt.figure(figsize=(10, 6))
    interaction_importance.head(15).plot(x='feature', y='importance', kind='barh')
    plt.xlabel('Importance')
    plt.title('Top Interaction Features')
    plt.tight_layout()
    plt.savefig('../outputs/interaction_importance.png', dpi=300, bbox_inches='tight')
    plt.show()
    
    interaction_importance.to_csv('../outputs/interaction_importance.csv', index=False)
```

---

## Step 3.4.0: Analyze Temporal Patterns (if applicable)

**Note**: Skip this section if data has no temporal component

### Step 3.4.1: Plot Time Series

```python
# Cell: Check for Date/Time Columns
date_columns = []
for col in df.columns:
    if 'date' in col.lower() or 'time' in col.lower():
        date_columns.append(col)
    elif df[col].dtype == 'datetime64[ns]':
        date_columns.append(col)

print(f"Found {len(date_columns)} potential date/time columns: {date_columns}")

if len(date_columns) > 0:
    # Cell: Convert to Datetime and Set Index
    date_col = date_columns[0]  # Use first date column
    df_temporal = df.copy()
    
    if df_temporal[date_col].dtype != 'datetime64[ns]':
        df_temporal[date_col] = pd.to_datetime(df_temporal[date_col])
    
    df_temporal = df_temporal.sort_values(date_col)
    df_temporal.set_index(date_col, inplace=True)
    
    # Cell: Plot Time Series for Numeric Features
    for col in numeric_cols[:5]:  # Plot first 5 numeric features
        plt.figure(figsize=(12, 4))
        df_temporal[col].plot()
        plt.title(f'{col} Over Time')
        plt.xlabel('Date')
        plt.ylabel(col)
        plt.grid(True, alpha=0.3)
        plt.tight_layout()
        plt.savefig(f'../outputs/timeseries_{col}.png', dpi=300, bbox_inches='tight')
        plt.show()
    
    # Cell: Resample and Aggregate (if high frequency)
    # Monthly aggregation
    monthly_data = df_temporal[numeric_cols].resample('M').agg(['mean', 'std', 'count'])
    
    print("Monthly Statistics:")
    print(monthly_data.head())
    
    # Plot monthly trends
    fig, axes = plt.subplots(len(numeric_cols[:3]), 1, figsize=(12, 4*len(numeric_cols[:3])))
    if len(numeric_cols[:3]) == 1:
        axes = [axes]
    
    for idx, col in enumerate(numeric_cols[:3]):
        monthly_data[col]['mean'].plot(ax=axes[idx], marker='o')
        axes[idx].fill_between(monthly_data.index,
                              monthly_data[col]['mean'] - monthly_data[col]['std'],
                              monthly_data[col]['mean'] + monthly_data[col]['std'],
                              alpha=0.3)
        axes[idx].set_title(f'{col} - Monthly Trend')
        axes[idx].set_ylabel(col)
        axes[idx].grid(True, alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('../outputs/monthly_trends.png', dpi=300, bbox_inches='tight')
    plt.show()
```

---

### Step 3.4.2: Detect Seasonality

```python
if len(date_columns) > 0:
    # Cell: Seasonal Decomposition
    from statsmodels.tsa.seasonal import seasonal_decompose
    
    for col in numeric_cols[:3]:
        # Remove missing values for decomposition
        ts_data = df_temporal[col].dropna()
        
        if len(ts_data) >= 24:  # Need enough data points
            # Decompose time series
            decomposition = seasonal_decompose(ts_data, model='additive', period=12)
            
            fig, axes = plt.subplots(4, 1, figsize=(12, 10))
            
            decomposition.observed.plot(ax=axes[0])
            axes[0].set_ylabel('Observed')
            axes[0].set_title(f'{col} - Time Series Decomposition')
            
            decomposition.trend.plot(ax=axes[1])
            axes[1].set_ylabel('Trend')
            
            decomposition.seasonal.plot(ax=axes[2])
            axes[2].set_ylabel('Seasonal')
            
            decomposition.resid.plot(ax=axes[3])
            axes[3].set_ylabel('Residual')
            axes[3].set_xlabel('Date')
            
            plt.tight_layout()
            plt.savefig(f'../outputs/decomposition_{col}.png', dpi=300, bbox_inches='tight')
            plt.show()
    
    # Cell: Autocorrelation Analysis
    from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
    
    for col in numeric_cols[:2]:
        ts_data = df_temporal[col].dropna()
        
        fig, axes = plt.subplots(1, 2, figsize=(15, 4))
        
        plot_acf(ts_data, lags=40, ax=axes[0])
        axes[0].set_title(f'{col} - Autocorrelation (ACF)')
        
        plot_pacf(ts_data, lags=40, ax=axes[1])
        axes[1].set_title(f'{col} - Partial Autocorrelation (PACF)')
        
        plt.tight_layout()
        plt.savefig(f'../outputs/autocorrelation_{col}.png', dpi=300, bbox_inches='tight')
        plt.show()
```

---

### Step 3.4.3: Check for Trends

```python
if len(date_columns) > 0:
    # Cell: Trend Analysis with Linear Regression
    from scipy.stats import linregress
    
    trend_results = []
    
    for col in numeric_cols:
        ts_data = df_temporal[col].dropna()
        
        # Convert datetime index to numeric for regression
        x = np.arange(len(ts_data))
        y = ts_data.values
        
        # Linear regression
        slope, intercept, r_value, p_value, std_err = linregress(x, y)
        
        trend_results.append({
            'feature': col,
            'slope': slope,
            'r_squared': r_value**2,
            'p_value': p_value,
            'trend': 'increasing' if slope > 0 else 'decreasing',
            'significant': p_value < 0.05
        })
    
    trend_df = pd.DataFrame(trend_results).sort_values('r_squared', ascending=False)
    print("Trend Analysis:")
    print(trend_df)
    
    print("\nSignificant trends (p < 0.05):")
    print(trend_df[trend_df['significant']])
    
    trend_df.to_csv('../outputs/trend_analysis.csv', index=False)
```

---

## Step 3.5.0: Segment Analysis

**Goal**: Analyze data subgroups separately

### Step 3.5.1: Create Segment Profiles

```python
# Cell: Segment by Categorical Features
segment_features = categorical_cols[:3]  # Analyze first 3 categorical features

for segment_col in segment_features:
    print(f"\n{'='*60}")
    print(f"Segment Analysis: {segment_col}")
    print(f"{'='*60}")
    
    # Profile each segment
    segment_profiles = df.groupby(segment_col)[numeric_cols].agg(['mean', 'median', 'std'])
    print(f"\nSegment Profiles (mean values):")
    print(segment_profiles.xs('mean', level=1, axis=1))
    
    # Visualize segment differences
    n_segments = df[segment_col].nunique()
    if n_segments <= 10:
        fig, axes = plt.subplots(1, min(3, len(numeric_cols)), figsize=(15, 5))
        if len(numeric_cols) == 1:
            axes = [axes]
        
        for idx, num_col in enumerate(numeric_cols[:3]):
            df.boxplot(column=num_col, by=segment_col, ax=axes[idx])
            axes[idx].set_title(f'{num_col} by {segment_col}')
            axes[idx].set_xlabel(segment_col)
            axes[idx].set_ylabel(num_col)
        
        plt.suptitle('')  # Remove default title
        plt.tight_layout()
        plt.savefig(f'../outputs/segment_profile_{segment_col}.png', dpi=300, bbox_inches='tight')
        plt.show()

# Cell: Segment by Target (if available)
if target_col in df.columns:
    print(f"\n{'='*60}")
    print(f"Target-Based Segmentation: {target_col}")
    print(f"{'='*60}")
    
    target_segments = df.groupby(target_col)[numeric_cols].agg(['mean', 'median', 'std', 'count'])
    print(f"\nTarget Segment Profiles:")
    print(target_segments)
    
    target_segments.to_csv('../outputs/target_segment_profiles.csv')
```

---

### Step 3.5.2: Compare Segments Statistically

```python
# Cell: Statistical Comparison Between Segments
from scipy.stats import f_oneway, kruskal

segment_comparison_results = []

for segment_col in segment_features:
    segments = df[segment_col].unique()
    
    if len(segments) < 2:
        continue
    
    for num_col in numeric_cols:
        # Get data for each segment
        segment_data = [df[df[segment_col] == seg][num_col].dropna() for seg in segments]
        
        # Skip if any segment has too few samples
        if any(len(data) < 3 for data in segment_data):
            continue
        
        # ANOVA (parametric)
        f_stat, p_value_anova = f_oneway(*segment_data)
        
        # Kruskal-Wallis (non-parametric)
        h_stat, p_value_kruskal = kruskal(*segment_data)
        
        segment_comparison_results.append({
            'segment_by': segment_col,
            'feature': num_col,
            'anova_f': f_stat,
            'anova_p': p_value_anova,
            'kruskal_h': h_stat,
            'kruskal_p': p_value_kruskal,
            'significant_anova': p_value_anova < 0.05,
            'significant_kruskal': p_value_kruskal < 0.05
        })

segment_comparison_df = pd.DataFrame(segment_comparison_results)
print("\nSegment Comparison Results:")
print(segment_comparison_df)

print("\nSignificant differences (p < 0.05):")
significant = segment_comparison_df[
    segment_comparison_df['significant_anova'] | 
    segment_comparison_df['significant_kruskal']
]
print(significant)

segment_comparison_df.to_csv('../outputs/segment_comparison.csv', index=False)
print("\n✓ Segment comparison results saved")
```

---

## Step 3.6.0: Document EDA Insights

**Goal**: Summarize findings and create actionable recommendations

### Step 3.6.1: List Key Findings

**📄 Create**: `outputs/eda_insights.md`

```markdown
# EDA Key Findings

**Dataset**: [Dataset Name]  
**Analysis Date**: [Date]  
**Analyst**: [Your Name]

---

## 1. Data Quality Summary

### Dataset Statistics
- **Total Samples**: 10,000
- **Total Features**: 25 (15 numeric, 10 categorical)
- **Missing Values**: 3 features with >5% missing
- **Duplicates**: 12 duplicate rows detected
- **Outliers**: 8 features with >5% outliers

### Critical Issues
1. **High Missing Rate**:
   - `feature_x`: 35% missing (MNAR - appears systematic)
   - `feature_y`: 12% missing (MAR - correlated with age)
   
2. **Data Quality Flags**:
   - `feature_z`: Contains impossible values (negative ages)
   - `feature_a`: High cardinality (500 unique values)

---

## 2. Distribution Characteristics

### Skewed Features (require transformation)
- **Right-skewed**: `income` (skew=2.8), `debt` (skew=2.1)
- **Left-skewed**: `score` (skew=-1.5)
- **Recommendation**: Apply log/sqrt transforms

### Features with High Outlier Rates
- `transaction_amount`: 8% outliers (cap at 99th percentile)
- `account_age`: 6% outliers (investigate data quality)

---

## 3. Feature Relationships

### Strong Correlations (|r| > 0.7)
1. `feature_1` ↔ `feature_2`: r = 0.85 → **Consider removing one**
2. `feature_3` ↔ `feature_4`: r = 0.78 → **Risk of multicollinearity**
3. `feature_5` ↔ `feature_6`: r = -0.72 → **Negative correlation**

### Target Relationships (Classification Task)
**Predictive Features** (p < 0.05):
- `feature_a`: Significant difference between classes (p < 0.001)
- `feature_b`: Strong association (chi² p < 0.001)
- `feature_c`: Moderate predictive power (p = 0.023)

**Non-Predictive Features** (p > 0.05):
- `feature_x`, `feature_y`, `feature_z` → **Consider removing**

---

## 4. Multivariate Patterns

### PCA Insights
- **95% variance** captured by **8 components** (out of 15)
- **PC1** (35% variance): Dominated by financial features
- **PC2** (18% variance): Dominated by demographic features

### Clustering Findings
- **Optimal clusters**: k=4 (silhouette score = 0.65)
- **Cluster characteristics**:
  - Cluster 0: High-income, low-risk (25%)
  - Cluster 1: Young, high-debt (30%)
  - Cluster 2: Mid-income, stable (35%)
  - Cluster 3: Low-income, high-risk (10%)

### Interaction Effects
**Top Interaction Features**:
1. `age × income`: 2nd most important feature
2. `debt × credit_score`: 5th most important feature
3. **Recommendation**: Create these interaction features

---

## 5. Temporal Patterns (if applicable)

### Trends
- `sales`: Increasing trend (slope=0.05, R²=0.72, p<0.001)
- `churn`: No significant trend (p=0.34)

### Seasonality
- `sales`: Strong monthly seasonality detected
- `traffic`: Weekly pattern observed

---

## 6. Segment Analysis

### High-Risk Patterns
- **Segment**: `region = 'North'` & `income < 30k`
  - 45% higher default rate
  - 2.5x more outliers in transaction_amount
  - **Action**: Consider separate model or treatment

### Target Distribution by Segments
- Class imbalance varies by segment (45%-55% across regions)
- **Recommendation**: Use stratified sampling by region

---

## 7. Business Insights

1. **Feature Engineering Opportunities**:
   - Debt-to-income ratio
   - Age groups (binning)
   - Transaction velocity (temporal features)

2. **Data Collection Improvements**:
   - Address missing data in `feature_x` (systematic gap)
   - Validate data entry for age, income (impossible values detected)

3. **Model Strategy Recommendations**:
   - Use ensemble methods (high feature interactions)
   - Consider separate models for distinct segments
   - Handle class imbalance with stratification + SMOTE

---

## 8. Next Steps Priority

### High Priority 🔴
1. Handle missing values in `feature_x`, `feature_y`
2. Remove highly correlated features
3. Apply log transform to skewed features
4. Create interaction features: `age×income`, `debt×credit_score`

### Medium Priority 🟡
1. Engineer debt-to-income ratio
2. Bin age into categories
3. Handle high-cardinality categorical with target encoding
4. Cap outliers at 99th percentile

### Low Priority 🟢
1. Create temporal aggregation features
2. Test polynomial features
3. Explore text features (if any)

---

## Appendix: Feature Importance Ranking

| Rank | Feature | Type | Correlation with Target | Notes |
|------|---------|------|------------------------|-------|
| 1 | feature_a | Numeric | 0.65 | Strong predictor |
| 2 | age×income | Interaction | 0.58 | Top interaction |
| 3 | feature_b | Categorical | χ²=450 | High association |
| 4 | debt_ratio | Engineered | - | To be created |
| 5 | feature_c | Numeric | 0.42 | Moderate predictor |
| ... | ... | ... | ... | ... |

---

**End of EDA Report**
```

**Create the file**:
```python
# Cell: Generate EDA Insights Document
insights_content = """
[paste markdown content above]
"""

with open('../outputs/eda_insights.md', 'w') as f:
    f.write(insights_content)

print("✓ EDA insights document created")
```

---

### Step 3.6.2: Identify Data Quality Issues

```python
# Cell: Comprehensive Data Quality Report
data_quality_issues = {
    'critical': [],
    'high': [],
    'medium': [],
    'low': []
}

# Missing values > 30%
high_missing = missing_df[missing_df['Missing_Percentage'] > 30]
for feature in high_missing.index:
    data_quality_issues['critical'].append({
        'issue': 'High missing rate',
        'feature': feature,
        'details': f"{high_missing.loc[feature, 'Missing_Percentage']:.1f}% missing",
        'action': 'Investigate if MNAR, consider dropping or advanced imputation'
    })

# Highly correlated features
for _, row in high_corr_df.iterrows():
    if abs(row['correlation']) > 0.9:
        data_quality_issues['high'].append({
            'issue': 'Extreme correlation',
            'feature': f"{row['feature_1']}, {row['feature_2']}",
            'details': f"r = {row['correlation']:.3f}",
            'action': 'Consider removing one feature to avoid multicollinearity'
        })

# High outlier percentage
for col, info in outlier_summary.items():
    if info['outlier_pct'] > 5:
        data_quality_issues['medium'].append({
            'issue': 'High outlier rate',
            'feature': col,
            'details': f"{info['outlier_pct']:.1f}% outliers",
            'action': 'Apply robust scaling or cap at percentiles'
        })

# High cardinality categoricals
for col in categorical_cols:
    if df[col].nunique() > 50:
        data_quality_issues['medium'].append({
            'issue': 'High cardinality',
            'feature': col,
            'details': f"{df[col].nunique()} unique values",
            'action': 'Consider target encoding or grouping rare categories'
        })

# Print report
print("="*60)
print("DATA QUALITY ISSUES REPORT")
print("="*60)

for severity in ['critical', 'high', 'medium', 'low']:
    issues = data_quality_issues[severity]
    if issues:
        print(f"\n{severity.upper()} ({len(issues)} issues):")
        for i, issue in enumerate(issues, 1):
            print(f"\n  {i}. {issue['issue']}: {issue['feature']}")
            print(f"     Details: {issue['details']}")
            print(f"     Action: {issue['action']}")

# Save to JSON
import json
with open('../outputs/data_quality_issues.json', 'w') as f:
    json.dump(data_quality_issues, f, indent=2)

print("\n\n✓ Data quality issues saved")
```

---

### Step 3.6.3: Recommend Preprocessing Steps

```python
# Cell: Generate Preprocessing Recommendations
preprocessing_plan = {
    'missing_value_handling': [],
    'scaling_normalization': [],
    'encoding': [],
    'feature_engineering': [],
    'outlier_treatment': [],
    'feature_selection': []
}

# Missing value recommendations
for feature in missing_df.index:
    pct = missing_df.loc[feature, 'Missing_Percentage']
    if feature in numeric_cols:
        if pct < 5:
            strategy = 'median'
        elif pct < 30:
            strategy = 'knn imputation'
        else:
            strategy = 'drop column or advanced imputation'
    else:
        strategy = 'mode or "MISSING" category'
    
    preprocessing_plan['missing_value_handling'].append({
        'feature': feature,
        'missing_pct': f"{pct:.1f}%",
        'strategy': strategy
    })

# Scaling recommendations
for feature in numeric_cols:
    if feature in [f for f, info in outlier_summary.items() if info['outlier_pct'] > 5]:
        strategy = 'robust scaling'
    elif abs(summary_stats.loc[feature, 'skewness']) > 1:
        strategy = 'log transform + standard scaling'
    else:
        strategy = 'standard scaling'
    
    preprocessing_plan['scaling_normalization'].append({
        'feature': feature,
        'strategy': strategy
    })

# Encoding recommendations
for feature in categorical_cols:
    n_unique = df[feature].nunique()
    if n_unique == 2:
        strategy = 'binary encoding'
    elif n_unique <= 10:
        strategy = 'one-hot encoding'
    elif n_unique <= 50:
        strategy = 'target encoding or frequency encoding'
    else:
        strategy = 'target encoding + rare category grouping'
    
    preprocessing_plan['encoding'].append({
        'feature': feature,
        'unique_values': n_unique,
        'strategy': strategy
    })

# Feature engineering recommendations
if 'age' in df.columns and 'income' in df.columns:
    preprocessing_plan['feature_engineering'].append({
        'new_feature': 'age_income_interaction',
        'formula': 'age × income',
        'rationale': 'High feature importance in initial analysis'
    })

# Print recommendations
print("="*60)
print("PREPROCESSING RECOMMENDATIONS")
print("="*60)

for step, recommendations in preprocessing_plan.items():
    if recommendations:
        print(f"\n{step.upper().replace('_', ' ')}:")
        for rec in recommendations[:5]:  # Show first 5
            print(f"  • {rec}")

# Save to YAML config
import yaml
with open('../config/preprocessing_recommendations.yaml', 'w') as f:
    yaml.dump(preprocessing_plan, f, default_flow_style=False)

print("\n\n✓ Preprocessing recommendations saved to config/")
```

---

### Step 3.6.4: Suggest Feature Engineering Ideas

```python
# Cell: Feature Engineering Ideas
feature_engineering_ideas = {
    'interaction_features': [],
    'aggregation_features': [],
    'transformation_features': [],
    'binning_features': [],
    'domain_specific': []
}

# Interaction features (from earlier analysis)
if 'interaction_importance' in locals():
    top_interactions = interaction_importance.head(5)
    for _, row in top_interactions.iterrows():
        feature_engineering_ideas['interaction_features'].append({
            'feature_name': row['feature'],
            'importance': f"{row['importance']:.4f}",
            'formula': row['feature'].replace('*', ' × ')
        })

# Aggregation features (if temporal data exists)
if len(date_columns) > 0:
    feature_engineering_ideas['aggregation_features'].extend([
        {
            'feature_name': 'sales_7day_avg',
            'formula': '7-day rolling average of sales',
            'rationale': 'Capture short-term trends'
        },
        {
            'feature_name': 'sales_30day_avg',
            'formula': '30-day rolling average of sales',
            'rationale': 'Capture long-term trends'
        }
    ])

# Transformation features (based on skewness)
for feature in skewed_features:
    skew_val = summary_stats.loc[feature, 'skewness']
    if skew_val > 1:
        transform = 'log'
    elif skew_val < -1:
        transform = 'reflect + log'
    else:
        transform = 'sqrt'
    
    feature_engineering_ideas['transformation_features'].append({
        'original_feature': feature,
        'transformation': transform,
        'new_feature_name': f"{feature}_{transform}",
        'skewness': f"{skew_val:.2f}"
    })

# Binning features
for feature in numeric_cols[:3]:
    feature_engineering_ideas['binning_features'].append({
        'feature': feature,
        'binning_strategy': 'quantile (4 bins)',
        'new_feature_name': f"{feature}_bin",
        'rationale': 'Capture non-linear relationships'
    })

# Domain-specific ideas (customize based on domain)
feature_engineering_ideas['domain_specific'].extend([
    {
        'feature_name': 'debt_to_income_ratio',
        'formula': 'debt / income',
        'rationale': 'Key financial health indicator'
    },
    {
        'feature_name': 'age_group',
        'formula': 'Binning: <25, 25-40, 40-60, 60+',
        'rationale': 'Capture life stage effects'
    }
])

# Print ideas
print("="*60)
print("FEATURE ENGINEERING IDEAS")
print("="*60)

for category, ideas in feature_engineering_ideas.items():
    if ideas:
        print(f"\n{category.upper().replace('_', ' ')}:")
        for idea in ideas:
            print(f"\n  • {idea.get('feature_name', idea.get('new_feature_name', 'N/A'))}")
            for key, value in idea.items():
                if key not in ['feature_name', 'new_feature_name']:
                    print(f"    {key}: {value}")

# Save ideas
with open('../outputs/feature_engineering_ideas.json', 'w') as f:
    json.dump(feature_engineering_ideas, f, indent=2)

print("\n\n✓ Feature engineering ideas saved")
```

---

## Phase 3 Complete! 🎉

**What you've accomplished**:
- ✅ Comprehensive univariate analysis with distributions and outliers
- ✅ Bivariate analysis with correlations and target relationships
- ✅ Multivariate patterns via PCA and clustering
- ✅ Temporal analysis (if applicable)
- ✅ Segment-based analysis
- ✅ Documented insights and actionable recommendations

**Verification Checklist**:
```bash
# Check all outputs generated
$ ls -lh outputs/
# Should contain:
# - numeric_distributions.png
# - correlation_heatmap.png
# - pca_2d.png
# - kmeans_clusters.png
# - cluster_profiles.csv
# - eda_insights.md
# - data_quality_issues.json
# - feature_engineering_ideas.json
# - preprocessing_recommendations.yaml

# Verify notebooks ran successfully
$ jupyter nbconvert --to notebook --execute notebooks/02_eda_univariate.ipynb

# Count insights documented
$ wc -l outputs/eda_insights.md
```

**Deliverables**:
1. **Visualizations**: 15+ plots covering all aspects of data
2. **Statistical Reports**: Correlation, clustering, tests
3. **Documentation**: Comprehensive insights markdown
4. **Actionable Plans**: Preprocessing and feature engineering recommendations

**Time Check**: Should complete in 60-120 minutes depending on dataset complexity

---

**Next Phase**: Phase 4 - Feature Engineering & Preprocessing (45-90 minutes)

---

**End of Phase 3 Detailed Implementation Steps**

---

# Phase 4: Feature Engineering & Preprocessing - Detailed Implementation Steps

**Version**: 1.0  
**Companion to**: eda-mlp-implementation-guidelines.md (Phase 4)  
**Time Budget**: 45-90 minutes  
**Priority**: 🔴 CRITICAL - Quality preprocessing directly impacts model performance

---

## Overview

This phase transforms raw data into model-ready features:
- ✅ Build modular preprocessing components
- ✅ Implement missing value handling
- ✅ Create scaling/normalization strategies
- ✅ Build categorical encoding pipelines
- ✅ Engineer features based on EDA insights
- ✅ Assemble complete preprocessing pipeline

---

## Step 4.1.0: Create Preprocessing Module

**Goal**: Build reusable, configuration-driven preprocessing infrastructure

### Step 4.1.1: Create Base Transformer Class

**📄 File**: `src/preprocessing/base.py`
```python
"""
Base transformer classes for preprocessing pipeline.

Follows scikit-learn transformer API.
"""

from sklearn.base import BaseEstimator, TransformerMixin
import pandas as pd
import numpy as np
from typing import Any, Dict


class BaseTransformer(BaseEstimator, TransformerMixin):
    """
    Base class for all custom transformers.
    
    Ensures compatibility with sklearn Pipeline and provides
    common functionality.
    """
    
    def __init__(self):
        """Initialize transformer."""
        self.is_fitted_ = False
    
    def fit(self, X, y=None):
        """
        Fit transformer to data.
        
        Parameters:
        -----------
        X : pd.DataFrame or np.ndarray
            Training data
        y : pd.Series or np.ndarray, optional
            Target variable
            
        Returns:
        --------
        self : BaseTransformer
            Fitted transformer
        """
        self.is_fitted_ = True
        return self
    
    def transform(self, X):
        """
        Transform data.
        
        Parameters:
        -----------
        X : pd.DataFrame or np.ndarray
            Data to transform
            
        Returns:
        --------
        X_transformed : pd.DataFrame or np.ndarray
            Transformed data
        """
        if not self.is_fitted_:
            raise RuntimeError("Transformer must be fitted before transform")
        return X
    
    def fit_transform(self, X, y=None):
        """Fit and transform in one step."""
        return self.fit(X, y).transform(X)
    
    def get_feature_names_out(self, input_features=None):
        """
        Get output feature names.
        
        Parameters:
        -----------
        input_features : list, optional
            Input feature names
            
        Returns:
        --------
        feature_names : list
            Output feature names
        """
        return input_features if input_features is not None else []


class DataFrameTransformer(BaseTransformer):
    """
    Base transformer that preserves DataFrame structure.
    
    Automatically handles pandas DataFrames and maintains
    column names and index.
    """
    
    def transform(self, X):
        """Transform while preserving DataFrame structure."""
        if not self.is_fitted_:
            raise RuntimeError("Transformer must be fitted before transform")
        
        is_dataframe = isinstance(X, pd.DataFrame)
        
        if is_dataframe:
            return self._transform_dataframe(X)
        else:
            return self._transform_array(X)
    
    def _transform_dataframe(self, X: pd.DataFrame) -> pd.DataFrame:
        """Transform DataFrame (to be implemented by subclasses)."""
        return X
    
    def _transform_array(self, X: np.ndarray) -> np.ndarray:
        """Transform numpy array (to be implemented by subclasses)."""
        return X
```

---

### Step 4.1.2: Stub Transformer Methods

**📄 File**: `src/preprocessing/preprocessor.py`
```python
"""
Main preprocessing module with all transformers.
"""

from .base import BaseTransformer, DataFrameTransformer
import pandas as pd
import numpy as np
from typing import Dict, List, Any


class MissingValueImputer(DataFrameTransformer):
    """Impute missing values based on strategy."""
    
    def __init__(self, strategy: Dict[str, Any]):
        super().__init__()
        self.strategy = strategy
        self.fill_values_ = {}
    
    def fit(self, X, y=None):
        """Learn imputation values from training data."""
        # Will implement in next step
        super().fit(X, y)
        return self
    
    def _transform_dataframe(self, X: pd.DataFrame) -> pd.DataFrame:
        """Apply imputation to DataFrame."""
        # Will implement in next step
        return X


class FeatureScaler(DataFrameTransformer):
    """Scale numeric features."""
    
    def __init__(self, method: str, features: List[str]):
        super().__init__()
        self.method = method
        self.features = features
        self.scalers_ = {}
    
    def fit(self, X, y=None):
        """Learn scaling parameters."""
        # Will implement in next step
        super().fit(X, y)
        return self
    
    def _transform_dataframe(self, X: pd.DataFrame) -> pd.DataFrame:
        """Apply scaling to features."""
        # Will implement in next step
        return X


class CategoricalEncoder(DataFrameTransformer):
    """Encode categorical features."""
    
    def __init__(self, encoding_config: Dict[str, Any]):
        super().__init__()
        self.encoding_config = encoding_config
        self.encoders_ = {}
    
    def fit(self, X, y=None):
        """Learn encodings from training data."""
        # Will implement in next step
        super().fit(X, y)
        return self
    
    def _transform_dataframe(self, X: pd.DataFrame) -> pd.DataFrame:
        """Apply encodings."""
        # Will implement in next step
        return X


class FeatureEngineer(DataFrameTransformer):
    """Create engineered features."""
    
    def __init__(self, engineering_config: Dict[str, Any]):
        super().__init__()
        self.engineering_config = engineering_config
    
    def fit(self, X, y=None):
        """Fit feature engineering (most are stateless)."""
        super().fit(X, y)
        return self
    
    def _transform_dataframe(self, X: pd.DataFrame) -> pd.DataFrame:
        """Create new features."""
        # Will implement in next step
        return X
```

---

## Step 4.2.0: Implement Missing Value Handling

### Step 4.2.1: Create Imputation Config

**Add to**: `config/preprocessing_config.yaml`
```yaml
imputation:
  numeric:
    strategy: "median"  # mean, median, mode, constant, knn
    constant_value: 0
  
  categorical:
    strategy: "mode"  # mode, constant
    constant_value: "MISSING"
  
  # Feature-specific overrides
  custom:
    income: "constant:0"
    age: "median"
    category: "mode"
  
  # Create missing indicators
  add_missing_indicator: true
  missing_indicator_threshold: 0.05  # Only for features with >5% missing
```

---

### Step 4.2.2: Implement Imputer Class

**Update**: `src/preprocessing/preprocessor.py`
```python
class MissingValueImputer(DataFrameTransformer):
    """
    Impute missing values based on configured strategy.
    
    Supports multiple imputation strategies:
    - mean, median, mode for simple imputation
    - constant for fixed value imputation
    - knn for k-nearest neighbors imputation
    
    Can optionally create missing indicator features.
    """
    
    def __init__(self, strategy: Dict[str, Any]):
        """
        Initialize imputer.
        
        Parameters:
        -----------
        strategy : dict
            Imputation configuration with keys:
            - numeric: strategy for numeric features
            - categorical: strategy for categorical features
            - custom: feature-specific overrides
            - add_missing_indicator: bool
            - missing_indicator_threshold: float
        """
        super().__init__()
        self.strategy = strategy
        self.fill_values_ = {}
        self.missing_indicators_ = []
    
    def fit(self, X, y=None):
        """
        Learn imputation values from training data.
        
        Parameters:
        -----------
        X : pd.DataFrame
            Training data
        y : ignored
        
        Returns:
        --------
        self
        """
        super().fit(X, y)
        
        numeric_cols = X.select_dtypes(include=[np.number]).columns
        categorical_cols = X.select_dtypes(include=['object', 'category']).columns
        
        # Learn imputation values for numeric features
        numeric_strategy = self.strategy.get('numeric', {}).get('strategy', 'median')
        
        for col in numeric_cols:
            # Check for custom strategy
            custom = self.strategy.get('custom', {}).get(col)
            if custom:
                strategy, *value = custom.split(':')
                if strategy == 'constant':
                    self.fill_values_[col] = float(value[0]) if value else 0
                elif strategy == 'mean':
                    self.fill_values_[col] = X[col].mean()
                elif strategy == 'median':
                    self.fill_values_[col] = X[col].median()
            else:
                # Use default numeric strategy
                if numeric_strategy == 'mean':
                    self.fill_values_[col] = X[col].mean()
                elif numeric_strategy == 'median':
                    self.fill_values_[col] = X[col].median()
                elif numeric_strategy == 'constant':
                    constant_val = self.strategy.get('numeric', {}).get('constant_value', 0)
                    self.fill_values_[col] = constant_val
        
        # Learn imputation values for categorical features
        categorical_strategy = self.strategy.get('categorical', {}).get('strategy', 'mode')
        
        for col in categorical_cols:
            custom = self.strategy.get('custom', {}).get(col)
            if custom:
                strategy, *value = custom.split(':')
                if strategy == 'constant':
                    self.fill_values_[col] = value[0] if value else 'MISSING'
                elif strategy == 'mode':
                    mode_val = X[col].mode()
                    self.fill_values_[col] = mode_val[0] if len(mode_val) > 0 else 'MISSING'
            else:
                if categorical_strategy == 'mode':
                    mode_val = X[col].mode()
                    self.fill_values_[col] = mode_val[0] if len(mode_val) > 0 else 'MISSING'
                elif categorical_strategy == 'constant':
                    self.fill_values_[col] = self.strategy.get('categorical', {}).get('constant_value', 'MISSING')
        
        # Identify features for missing indicators
        if self.strategy.get('add_missing_indicator', False):
            threshold = self.strategy.get('missing_indicator_threshold', 0.05)
            for col in X.columns:
                missing_pct = X[col].isnull().sum() / len(X)
                if missing_pct > threshold:
                    self.missing_indicators_.append(col)
        
        return self
    
    def _transform_dataframe(self, X: pd.DataFrame) -> pd.DataFrame:
        """
        Apply imputation to DataFrame.
        
        Parameters:
        -----------
        X : pd.DataFrame
            Data to impute
            
        Returns:
        --------
        X_imputed : pd.DataFrame
            Imputed data with optional missing indicators
        """
        X_imputed = X.copy()
        
        # Create missing indicators before imputation
        for col in self.missing_indicators_:
            if col in X_imputed.columns:
                X_imputed[f'{col}_missing'] = X_imputed[col].isnull().astype(int)
        
        # Apply imputation
        for col, fill_value in self.fill_values_.items():
            if col in X_imputed.columns:
                X_imputed[col].fillna(fill_value, inplace=True)
        
        return X_imputed
    
    def get_feature_names_out(self, input_features=None):
        """Get output feature names including missing indicators."""
        if input_features is None:
            return list(self.fill_values_.keys()) + [f'{col}_missing' for col in self.missing_indicators_]
        else:
            output_features = list(input_features)
            for col in self.missing_indicators_:
                if col in input_features:
                    output_features.append(f'{col}_missing')
            return output_features
```

---

### Step 4.2.3: Handle Missing Indicator Creation

Already implemented in the `MissingValueImputer` class above. The imputer:
1. Identifies features with missing percentage > threshold
2. Creates binary `{feature}_missing` columns before imputation
3. Then imputes the original features

---

## Step 4.3.0: Implement Scaling/Normalization

### Step 4.3.1: Create Scaling Config

**Add to**: `config/preprocessing_config.yaml`
```yaml
scaling:
  method: "standard"  # standard, minmax, robust, maxabs, none
  
  # Features to scale (empty = all numeric)
  features_to_scale: []
  
  # Features to skip
  skip_features:
    - target  # Don't scale target variable
    - id  # Don't scale ID columns
```

---

### Step 4.3.2: Implement Scaler Class

**Update**: `src/preprocessing/preprocessor.py`
```python
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler, MaxAbsScaler

class FeatureScaler(DataFrameTransformer):
    """
    Scale numeric features using configured method.
    
    Supports:
    - standard: StandardScaler (mean=0, std=1)
    - minmax: MinMaxScaler (range=[0,1])
    - robust: RobustScaler (median=0, IQR scaling)
    - maxabs: MaxAbsScaler (range=[-1,1])
    """
    
    def __init__(self, method: str, features: List[str] = None, skip_features: List[str] = None):
        """
        Initialize scaler.
        
        Parameters:
        -----------
        method : str
            Scaling method ('standard', 'minmax', 'robust', 'maxabs', 'none')
        features : list, optional
            Features to scale (None = all numeric features)
        skip_features : list, optional
            Features to skip scaling
        """
        super().__init__()
        self.method = method
        self.features = features if features else []
        self.skip_features = skip_features if skip_features else []
        self.scalers_ = {}
        self.features_to_scale_ = []
    
    def fit(self, X, y=None):
        """
        Learn scaling parameters from training data.
        
        Parameters:
        -----------
        X : pd.DataFrame
            Training data
        y : ignored
        
        Returns:
        --------
        self
        """
        super().fit(X, y)
        
        if self.method == 'none':
            return self
        
        # Determine which features to scale
        if len(self.features) > 0:
            # Use specified features
            self.features_to_scale_ = [f for f in self.features if f in X.columns]
        else:
            # Scale all numeric features except skip_features
            numeric_cols = X.select_dtypes(include=[np.number]).columns
            self.features_to_scale_ = [
                col for col in numeric_cols 
                if col not in self.skip_features
            ]
        
        # Create scaler
        scaler_map = {
            'standard': StandardScaler,
            'minmax': MinMaxScaler,
            'robust': RobustScaler,
            'maxabs': MaxAbsScaler
        }
        
        if self.method not in scaler_map:
            raise ValueError(f"Unknown scaling method: {self.method}")
        
        # Fit scaler for each feature
        for col in self.features_to_scale_:
            scaler = scaler_map[self.method]()
            scaler.fit(X[[col]])
            self.scalers_[col] = scaler
        
        return self
    
    def _transform_dataframe(self, X: pd.DataFrame) -> pd.DataFrame:
        """
        Apply scaling to features.
        
        Parameters:
        -----------
        X : pd.DataFrame
            Data to scale
            
        Returns:
        --------
        X_scaled : pd.DataFrame
            Scaled data
        """
        if self.method == 'none':
            return X
        
        X_scaled = X.copy()
        
        for col, scaler in self.scalers_.items():
            if col in X_scaled.columns:
                X_scaled[col] = scaler.transform(X_scaled[[col]])
        
        return X_scaled
    
    def inverse_transform(self, X: pd.DataFrame) -> pd.DataFrame:
        """
        Reverse scaling transformation.
        
        Parameters:
        -----------
        X : pd.DataFrame
            Scaled data
            
        Returns:
        --------
        X_original : pd.DataFrame
            Data in original scale
        """
        X_original = X.copy()
        
        for col, scaler in self.scalers_.items():
            if col in X_original.columns:
                X_original[col] = scaler.inverse_transform(X_original[[col]])
        
        return X_original
```

---

### Step 4.3.3: Add Inverse Transform Capability

Already implemented in the `FeatureScaler` class above via the `inverse_transform()` method.

---

## Step 4.4.0: Implement Categorical Encoding

### Step 4.4.1: Create Encoding Config

**Add to**: `config/preprocessing_config.yaml`
```yaml
encoding:
  # One-hot encoding
  onehot:
    features: []  # List of features for one-hot encoding
    drop_first: false
    handle_unknown: "ignore"
  
  # Ordinal encoding
  ordinal:
    # Format: feature_name: [ordered_categories]
    education: ["High School", "Bachelor", "Master", "PhD"]
    risk_level: ["low", "medium", "high"]
  
  # Target encoding (for high cardinality)
  target:
    features: []
    smoothing: 1.0
  
  # Frequency encoding
  frequency:
    features: []
  
  # Rare category grouping
  rare_category_threshold: 0.01  # Group categories < 1% as "Other"
```

---

### Step 4.4.2: Implement Encoder Class

**Update**: `src/preprocessing/preprocessor.py`
```python
from sklearn.preprocessing import OneHotEncoder, OrdinalEncoder
import category_encoders as ce  # pip install category-encoders

class CategoricalEncoder(DataFrameTransformer):
    """
    Encode categorical features using multiple strategies.
    
    Supports:
    - one-hot encoding
    - ordinal encoding
    - target encoding
    - frequency encoding
    """
    
    def __init__(self, encoding_config: Dict[str, Any]):
        """
        Initialize encoder.
        
        Parameters:
        -----------
        encoding_config : dict
            Encoding configuration
        """
        super().__init__()
        self.encoding_config = encoding_config
        self.encoders_ = {}
        self.feature_mapping_ = {}
        self.rare_categories_ = {}
    
    def fit(self, X, y=None):
        """
        Learn encodings from training data.
        
        Parameters:
        -----------
        X : pd.DataFrame
            Training data
        y : pd.Series, optional
            Target variable (required for target encoding)
        
        Returns:
        --------
        self
        """
        super().fit(X, y)
        
        # Handle rare categories first
        rare_threshold = self.encoding_config.get('rare_category_threshold', 0.01)
        categorical_cols = X.select_dtypes(include=['object', 'category']).columns
        
        for col in categorical_cols:
            value_counts = X[col].value_counts(normalize=True)
            rare_cats = value_counts[value_counts < rare_threshold].index.tolist()
            if len(rare_cats) > 0:
                self.rare_categories_[col] = rare_cats
        
        # One-hot encoding
        onehot_features = self.encoding_config.get('onehot', {}).get('features', [])
        if len(onehot_features) > 0:
            drop_first = self.encoding_config.get('onehot', {}).get('drop_first', False)
            handle_unknown = self.encoding_config.get('onehot', {}).get('handle_unknown', 'ignore')
            
            encoder = OneHotEncoder(
                drop='first' if drop_first else None,
                handle_unknown=handle_unknown,
                sparse_output=False
            )
            encoder.fit(X[onehot_features])
            self.encoders_['onehot'] = {
                'encoder': encoder,
                'features': onehot_features
            }
        
        # Ordinal encoding
        ordinal_config = self.encoding_config.get('ordinal', {})
        if len(ordinal_config) > 0:
            for feature, categories in ordinal_config.items():
                if feature in X.columns:
                    encoder = OrdinalEncoder(categories=[categories], handle_unknown='use_encoded_value', unknown_value=-1)
                    encoder.fit(X[[feature]])
                    self.encoders_[f'ordinal_{feature}'] = {
                        'encoder': encoder,
                        'feature': feature
                    }
        
        # Target encoding
        target_features = self.encoding_config.get('target', {}).get('features', [])
        if len(target_features) > 0 and y is not None:
            smoothing = self.encoding_config.get('target', {}).get('smoothing', 1.0)
            encoder = ce.TargetEncoder(cols=target_features, smoothing=smoothing)
            encoder.fit(X[target_features], y)
            self.encoders_['target'] = {
                'encoder': encoder,
                'features': target_features
            }
        
        # Frequency encoding
        frequency_features = self.encoding_config.get('frequency', {}).get('features', [])
        for feature in frequency_features:
            if feature in X.columns:
                freq_map = X[feature].value_counts(normalize=True).to_dict()
                self.encoders_[f'frequency_{feature}'] = {
                    'freq_map': freq_map,
                    'feature': feature
                }
        
        return self
    
    def _transform_dataframe(self, X: pd.DataFrame) -> pd.DataFrame:
        """
        Apply encodings.
        
        Parameters:
        -----------
        X : pd.DataFrame
            Data to encode
            
        Returns:
        --------
        X_encoded : pd.DataFrame
            Encoded data
        """
        X_encoded = X.copy()
        
        # Group rare categories
        for col, rare_cats in self.rare_categories_.items():
            if col in X_encoded.columns:
                X_encoded[col] = X_encoded[col].replace(rare_cats, 'Other')
        
        # Apply one-hot encoding
        if 'onehot' in self.encoders_:
            encoder_info = self.encoders_['onehot']
            encoder = encoder_info['encoder']
            features = encoder_info['features']
            
            # Transform
            encoded_array = encoder.transform(X_encoded[features])
            encoded_feature_names = encoder.get_feature_names_out(features)
            
            # Create DataFrame
            encoded_df = pd.DataFrame(
                encoded_array,
                columns=encoded_feature_names,
                index=X_encoded.index
            )
            
            # Drop original features and concatenate encoded
            X_encoded = X_encoded.drop(columns=features)
            X_encoded = pd.concat([X_encoded, encoded_df], axis=1)
        
        # Apply ordinal encoding
        for key, encoder_info in self.encoders_.items():
            if key.startswith('ordinal_'):
                encoder = encoder_info['encoder']
                feature = encoder_info['feature']
                if feature in X_encoded.columns:
                    X_encoded[feature] = encoder.transform(X_encoded[[feature]])
        
        # Apply target encoding
        if 'target' in self.encoders_:
            encoder_info = self.encoders_['target']
            encoder = encoder_info['encoder']
            features = encoder_info['features']
            X_encoded[features] = encoder.transform(X_encoded[features])
        
        # Apply frequency encoding
        for key, encoder_info in self.encoders_.items():
            if key.startswith('frequency_'):
                feature = encoder_info['feature']
                freq_map = encoder_info['freq_map']
                if feature in X_encoded.columns:
                    X_encoded[feature] = X_encoded[feature].map(freq_map).fillna(0)
        
        return X_encoded
```

---

### Step 4.4.3: Handle Rare Category Grouping

Already implemented in the `CategoricalEncoder` class above. The encoder:
1. Identifies categories with frequency < threshold during `fit()`
2. Groups them into "Other" category during `transform()`

---

## Step 4.5.0: Implement Feature Engineering

### Step 4.5.1: Create Feature Engineering Config

**Add to**: `config/preprocessing_config.yaml`
```yaml
feature_engineering:
  # Polynomial features
  polynomial:
    enabled: false
    features: [["age", "income"], ["debt", "credit_score"]]
    degree: 2
    interaction_only: true
  
  # Mathematical transformations
  transformations:
    log: ["income", "debt"]  # Log transform for skewed features
    sqrt: []
    reciprocal: []
    square: []
  
  # Binning/discretization
  binning:
    age:
      bins: [0, 18, 35, 50, 65, 100]
      labels: ["child", "young_adult", "adult", "middle_aged", "senior"]
    income:
      bins: 5  # Number of equal-width bins
      strategy: "quantile"  # quantile or uniform
  
  # Aggregation features
  aggregations: []
  # Example:
  # - groupby: "customer_id"
  #   features: ["transaction_amount"]
  #   functions: ["mean", "std", "count"]
  
  # Date/time features
  datetime:
    features: []  # List of datetime columns
    extract: ["year", "month", "day", "dayofweek", "hour"]
```

---

### Step 4.5.2: Implement Polynomial Features

**Update**: `src/preprocessing/preprocessor.py`
```python
from sklearn.preprocessing import PolynomialFeatures

class FeatureEngineer(DataFrameTransformer):
    """
    Create engineered features based on configuration.
    
    Supports:
    - Polynomial and interaction features
    - Mathematical transformations
    - Binning/discretization
    - Aggregations
    - DateTime feature extraction
    """
    
    def __init__(self, engineering_config: Dict[str, Any]):
        """
        Initialize feature engineer.
        
        Parameters:
        -----------
        engineering_config : dict
            Feature engineering configuration
        """
        super().__init__()
        self.engineering_config = engineering_config
        self.poly_transformer_ = None
        self.poly_features_ = []
        self.binning_edges_ = {}
    
    def fit(self, X, y=None):
        """
        Fit feature engineering transformations.
        
        Most transformations are stateless, but some (like binning)
        need to learn parameters from training data.
        """
        super().fit(X, y)
        
        # Fit polynomial features
        poly_config = self.engineering_config.get('polynomial', {})
        if poly_config.get('enabled', False):
            feature_sets = poly_config.get('features', [])
            degree = poly_config.get('degree', 2)
            interaction_only = poly_config.get('interaction_only', True)
            
            if len(feature_sets) > 0:
                # Flatten feature list
                all_poly_features = list(set([f for feature_set in feature_sets for f in feature_set]))
                self.poly_features_ = [f for f in all_poly_features if f in X.columns]
                
                if len(self.poly_features_) > 0:
                    self.poly_transformer_ = PolynomialFeatures(
                        degree=degree,
                        interaction_only=interaction_only,
                        include_bias=False
                    )
                    self.poly_transformer_.fit(X[self.poly_features_])
        
        # Fit binning (learn quantiles for quantile strategy)
        binning_config = self.engineering_config.get('binning', {})
        for feature, bin_config in binning_config.items():
            if feature not in X.columns:
                continue
            
            if isinstance(bin_config, dict):
                strategy = bin_config.get('strategy', 'uniform')
                n_bins = bin_config.get('bins')
                
                if strategy == 'quantile' and isinstance(n_bins, int):
                    # Learn quantile edges
                    quantiles = np.linspace(0, 1, n_bins + 1)
                    self.binning_edges_[feature] = X[feature].quantile(quantiles).values
        
        return self
    
    def _transform_dataframe(self, X: pd.DataFrame) -> pd.DataFrame:
        """
        Create new features.
        
        Parameters:
        -----------
        X : pd.DataFrame
            Input data
            
        Returns:
        --------
        X_engineered : pd.DataFrame
            Data with engineered features
        """
        X_engineered = X.copy()
        
        # 1. Polynomial/interaction features
        if self.poly_transformer_ is not None and len(self.poly_features_) > 0:
            poly_array = self.poly_transformer_.transform(X_engineered[self.poly_features_])
            poly_feature_names = self.poly_transformer_.get_feature_names_out(self.poly_features_)
            
            # Keep only new features (exclude original features)
            new_feature_indices = [i for i, name in enumerate(poly_feature_names) if '*' in name or '^' in name]
            if len(new_feature_indices) > 0:
                poly_array_new = poly_array[:, new_feature_indices]
                poly_names_new = [poly_feature_names[i] for i in new_feature_indices]
                
                poly_df = pd.DataFrame(
                    poly_array_new,
                    columns=poly_names_new,
                    index=X_engineered.index
                )
                X_engineered = pd.concat([X_engineered, poly_df], axis=1)
        
        # 2. Mathematical transformations
        transform_config = self.engineering_config.get('transformations', {})
        
        # Log transform
        for feature in transform_config.get('log', []):
            if feature in X_engineered.columns:
                # Add small constant to avoid log(0)
                X_engineered[f'{feature}_log'] = np.log1p(X_engineered[feature])
        
        # Square root transform
        for feature in transform_config.get('sqrt', []):
            if feature in X_engineered.columns:
                X_engineered[f'{feature}_sqrt'] = np.sqrt(np.maximum(X_engineered[feature], 0))
        
        # Reciprocal transform
        for feature in transform_config.get('reciprocal', []):
            if feature in X_engineered.columns:
                # Avoid division by zero
                X_engineered[f'{feature}_reciprocal'] = 1 / (X_engineered[feature] + 1e-10)
        
        # Square transform
        for feature in transform_config.get('square', []):
            if feature in X_engineered.columns:
                X_engineered[f'{feature}_square'] = X_engineered[feature] ** 2
        
        # 3. Binning/discretization
        binning_config = self.engineering_config.get('binning', {})
        for feature, bin_config in binning_config.items():
            if feature not in X_engineered.columns:
                continue
            
            if isinstance(bin_config, dict):
                bins = bin_config.get('bins')
                labels = bin_config.get('labels')
                strategy = bin_config.get('strategy', 'uniform')
                
                if strategy == 'quantile' and feature in self.binning_edges_:
                    # Use learned quantile edges
                    bins = self.binning_edges_[feature]
                
                if labels:
                    X_engineered[f'{feature}_binned'] = pd.cut(
                        X_engineered[feature],
                        bins=bins,
                        labels=labels,
                        include_lowest=True
                    )
                else:
                    X_engineered[f'{feature}_binned'] = pd.cut(
                        X_engineered[feature],
                        bins=bins,
                        include_lowest=True
                    )
            elif isinstance(bin_config, list):
                # Direct bin edges provided
                X_engineered[f'{feature}_binned'] = pd.cut(
                    X_engineered[feature],
                    bins=bin_config,
                    include_lowest=True
                )
        
        # 4. Aggregation features
        agg_config = self.engineering_config.get('aggregations', [])
        for agg in agg_config:
            groupby_col = agg.get('groupby')
            features = agg.get('features', [])
            functions = agg.get('functions', [])
            
            if groupby_col in X_engineered.columns:
                for feature in features:
                    if feature in X_engineered.columns:
                        for func in functions:
                            agg_name = f'{feature}_{func}_by_{groupby_col}'
                            X_engineered[agg_name] = X_engineered.groupby(groupby_col)[feature].transform(func)
        
        # 5. DateTime features
        datetime_config = self.engineering_config.get('datetime', {})
        datetime_features = datetime_config.get('features', [])
        extract_components = datetime_config.get('extract', [])
        
        for feature in datetime_features:
            if feature in X_engineered.columns:
                # Convert to datetime if not already
                if X_engineered[feature].dtype != 'datetime64[ns]':
                    X_engineered[feature] = pd.to_datetime(X_engineered[feature])
                
                # Extract components
                if 'year' in extract_components:
                    X_engineered[f'{feature}_year'] = X_engineered[feature].dt.year
                if 'month' in extract_components:
                    X_engineered[f'{feature}_month'] = X_engineered[feature].dt.month
                if 'day' in extract_components:
                    X_engineered[f'{feature}_day'] = X_engineered[feature].dt.day
                if 'dayofweek' in extract_components:
                    X_engineered[f'{feature}_dayofweek'] = X_engineered[feature].dt.dayofweek
                if 'hour' in extract_components:
                    X_engineered[f'{feature}_hour'] = X_engineered[feature].dt.hour
                if 'quarter' in extract_components:
                    X_engineered[f'{feature}_quarter'] = X_engineered[feature].dt.quarter
                if 'is_weekend' in extract_components:
                    X_engineered[f'{feature}_is_weekend'] = (X_engineered[feature].dt.dayofweek >= 5).astype(int)
        
        return X_engineered
```

---

### Step 4.5.3-4.5.5: Transformations, Binning, Aggregations

All implemented in the `FeatureEngineer` class above. The class handles:
- **4.5.3**: Log, sqrt, reciprocal, square transformations
- **4.5.4**: Binning with both uniform and quantile strategies
- **4.5.5**: Aggregation features via groupby operations

---

## Step 4.6.0: Create Preprocessing Pipeline

### Step 4.6.1: Order Transformers Correctly

**📄 File**: `src/preprocessing/pipeline.py`
```python
"""
Preprocessing pipeline orchestration.

Assembles all preprocessing steps in correct order.
"""

from sklearn.pipeline import Pipeline
import pandas as pd
import numpy as np
from typing import Dict, Any

from .preprocessor import (
    MissingValueImputer,
    FeatureScaler,
    CategoricalEncoder,
    FeatureEngineer
)


class PreprocessingPipeline:
    """
    Complete preprocessing pipeline.
    
    Correct transformation order:
    1. Missing value imputation (must be first)
    2. Feature engineering (create new features)
    3. Categorical encoding (convert to numeric)
    4. Scaling/normalization (must be last)
    """
    
    def __init__(self, config: Dict[str, Any]):
        """
        Initialize preprocessing pipeline.
        
        Parameters:
        -----------
        config : dict
            Complete preprocessing configuration
        """
        self.config = config
        self.pipeline = None
        self._build_pipeline()
    
    def _build_pipeline(self):
        """Build sklearn Pipeline with transformers in correct order."""
        steps = []
        
        # Step 1: Imputation (must be first)
        if 'imputation' in self.config:
            imputer = MissingValueImputer(self.config['imputation'])
            steps.append(('imputation', imputer))
        
        # Step 2: Feature Engineering (before encoding and scaling)
        if 'feature_engineering' in self.config:
            engineer = FeatureEngineer(self.config['feature_engineering'])
            steps.append(('feature_engineering', engineer))
        
        # Step 3: Categorical Encoding (before scaling)
        if 'encoding' in self.config:
            encoder = CategoricalEncoder(self.config['encoding'])
            steps.append(('encoding', encoder))
        
        # Step 4: Scaling (must be last)
        if 'scaling' in self.config:
            method = self.config['scaling'].get('method', 'standard')
            features = self.config['scaling'].get('features_to_scale', [])
            skip_features = self.config['scaling'].get('skip_features', [])
            
            scaler = FeatureScaler(method, features, skip_features)
            steps.append(('scaling', scaler))
        
        self.pipeline = Pipeline(steps)
    
    def fit(self, X, y=None):
        """
        Fit pipeline to training data.
        
        Parameters:
        -----------
        X : pd.DataFrame
            Training features
        y : pd.Series, optional
            Training target (required for target encoding)
        
        Returns:
        --------
        self
        """
        self.pipeline.fit(X, y)
        return self
    
    def transform(self, X):
        """
        Transform data using fitted pipeline.
        
        Parameters:
        -----------
        X : pd.DataFrame
            Data to transform
        
        Returns:
        --------
        X_transformed : pd.DataFrame
            Transformed data
        """
        return self.pipeline.transform(X)
    
    def fit_transform(self, X, y=None):
        """Fit and transform in one step."""
        return self.pipeline.fit_transform(X, y)
    
    def get_params(self, deep=True):
        """Get pipeline parameters."""
        return self.pipeline.get_params(deep=deep)
    
    def set_params(self, **params):
        """Set pipeline parameters."""
        return self.pipeline.set_params(**params)
```

---

### Step 4.6.2: Implement Pipeline Serialization

**Add to**: `src/preprocessing/pipeline.py`
```python
import joblib
from pathlib import Path
from datetime import datetime


class PreprocessingPipeline:
    # ... previous code ...
    
    def save(self, filepath: str = None):
        """
        Save fitted pipeline to disk.
        
        Parameters:
        -----------
        filepath : str, optional
            Path to save pipeline. If None, generates automatic path.
        
        Returns:
        --------
        filepath : str
            Path where pipeline was saved
        """
        if filepath is None:
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filepath = f'models/preprocessing_pipeline_{timestamp}.pkl'
        
        # Create directory if it doesn't exist
        Path(filepath).parent.mkdir(parents=True, exist_ok=True)
        
        # Save pipeline
        joblib.dump(self.pipeline, filepath)
        print(f"✓ Pipeline saved to {filepath}")
        
        return filepath
    
    @classmethod
    def load(cls, filepath: str):
        """
        Load fitted pipeline from disk.
        
        Parameters:
        -----------
        filepath : str
            Path to saved pipeline
        
        Returns:
        --------
        pipeline : PreprocessingPipeline
            Loaded pipeline instance
        """
        # Load sklearn pipeline
        sklearn_pipeline = joblib.load(filepath)
        
        # Create instance
        instance = cls(config={})
        instance.pipeline = sklearn_pipeline
        
        print(f"✓ Pipeline loaded from {filepath}")
        return instance
```

---

### Step 4.6.3: Add Pipeline Validation

**Add to**: `src/preprocessing/pipeline.py`
```python
class PreprocessingPipeline:
    # ... previous code ...
    
    def validate(self, X_sample):
        """
        Validate pipeline on sample data.
        
        Checks:
        - Pipeline transforms without errors
        - Output shape is consistent
        - No NaN values in output (unless expected)
        - Data types are appropriate
        
        Parameters:
        -----------
        X_sample : pd.DataFrame
            Sample data for validation
        
        Returns:
        --------
        validation_report : dict
            Report with validation results
        """
        report = {
            'is_valid': True,
            'errors': [],
            'warnings': [],
            'info': {}
        }
        
        try:
            # Test transformation
            X_transformed = self.transform(X_sample)
            
            # Check output shape
            report['info']['input_shape'] = X_sample.shape
            report['info']['output_shape'] = X_transformed.shape
            report['info']['features_added'] = X_transformed.shape[1] - X_sample.shape[1]
            
            # Check for NaN values
            if isinstance(X_transformed, pd.DataFrame):
                nan_counts = X_transformed.isnull().sum()
                if nan_counts.sum() > 0:
                    report['warnings'].append(
                        f"Output contains {nan_counts.sum()} NaN values across {(nan_counts > 0).sum()} features"
                    )
                    report['info']['features_with_nan'] = nan_counts[nan_counts > 0].to_dict()
            
            # Check data types
            if isinstance(X_transformed, pd.DataFrame):
                dtype_counts = X_transformed.dtypes.value_counts().to_dict()
                report['info']['output_dtypes'] = {str(k): int(v) for k, v in dtype_counts.items()}
                
                # Warn about object dtypes (should be numeric after encoding)
                if 'object' in dtype_counts:
                    report['warnings'].append(
                        f"{dtype_counts['object']} features still have object dtype after preprocessing"
                    )
            
            print("✓ Pipeline validation passed")
            
        except Exception as e:
            report['is_valid'] = False
            report['errors'].append(f"Pipeline transformation failed: {str(e)}")
            print(f"✗ Pipeline validation failed: {e}")
        
        return report
```

---

## Step 4.7.0: Create Preprocessing Notebook

**📄 File**: `notebooks/03_preprocessing.ipynb`

### Step 4.7.1: Apply Preprocessing Pipeline

```python
# Cell 1: Setup
import sys
sys.path.append('..')

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from src.utils.config_loader import load_config
from src.data.data_loader import load_data
from src.preprocessing.pipeline import PreprocessingPipeline

%matplotlib inline

# Cell 2: Load Data and Config
data_config = load_config('../config/data_config.yaml')
preprocessing_config = load_config('../config/preprocessing_config.yaml')

df_train = load_data(data_config, split='train')
df_test = load_data(data_config, split='test')

print(f"Training data: {df_train.shape}")
print(f"Test data: {df_test.shape}")

# Cell 3: Separate Features and Target
target_col = data_config['schema']['target_column']

X_train = df_train.drop(columns=[target_col])
y_train = df_train[target_col]

X_test = df_test.drop(columns=[target_col])
y_test = df_test[target_col]

print(f"\nX_train shape: {X_train.shape}")
print(f"y_train shape: {y_train.shape}")

# Cell 4: Create and Fit Pipeline
pipeline = PreprocessingPipeline(preprocessing_config)

print("Fitting preprocessing pipeline...")
pipeline.fit(X_train, y_train)
print("✓ Pipeline fitted successfully")

# Cell 5: Transform Training Data
X_train_transformed = pipeline.transform(X_train)

print(f"\nTransformed training data shape: {X_train_transformed.shape}")
print(f"Features added: {X_train_transformed.shape[1] - X_train.shape[1]}")

# Display transformed data
X_train_transformed.head()

# Cell 6: Transform Test Data
X_test_transformed = pipeline.transform(X_test)

print(f"Transformed test data shape: {X_test_transformed.shape}")

# Verify shapes match
assert X_train_transformed.shape[1] == X_test_transformed.shape[1], \
    "Train and test feature counts don't match!"

print("✓ Train and test shapes are consistent")
```

---

### Step 4.7.2: Validate Transformed Data

```python
# Cell: Validate Transformed Data
print("="*60)
print("VALIDATION CHECKS")
print("="*60)

# Check 1: No missing values (unless expected)
print("\n1. Missing Values Check:")
missing_train = X_train_transformed.isnull().sum().sum()
missing_test = X_test_transformed.isnull().sum().sum()

print(f"   Train missing values: {missing_train}")
print(f"   Test missing values: {missing_test}")

if missing_train > 0 or missing_test > 0:
    print("   ⚠️  Warning: Missing values found after preprocessing")
    print("\n   Features with missing values:")
    for col in X_train_transformed.columns:
        train_missing = X_train_transformed[col].isnull().sum()
        test_missing = X_test_transformed[col].isnull().sum()
        if train_missing > 0 or test_missing > 0:
            print(f"      {col}: train={train_missing}, test={test_missing}")
else:
    print("   ✓ No missing values")

# Check 2: Data types
print("\n2. Data Types Check:")
dtype_counts = X_train_transformed.dtypes.value_counts()
print(dtype_counts)

object_cols = X_train_transformed.select_dtypes(include='object').columns
if len(object_cols) > 0:
    print(f"   ⚠️  Warning: {len(object_cols)} object columns remain:")
    print(f"      {list(object_cols)}")
else:
    print("   ✓ All features are numeric")

# Check 3: Infinite values
print("\n3. Infinite Values Check:")
inf_cols_train = X_train_transformed.columns[np.isinf(X_train_transformed).any()].tolist()
inf_cols_test = X_test_transformed.columns[np.isinf(X_test_transformed).any()].tolist()

if len(inf_cols_train) > 0 or len(inf_cols_test) > 0:
    print(f"   ⚠️  Warning: Infinite values found")
    print(f"      Train: {inf_cols_train}")
    print(f"      Test: {inf_cols_test}")
else:
    print("   ✓ No infinite values")

# Check 4: Feature ranges
print("\n4. Feature Ranges Check:")
print("   Training data ranges:")
print(X_train_transformed.describe().loc[['min', 'max']].T.head(10))

# Check 5: Sample validation
print("\n5. Sample Data Validation:")
print("   First 3 rows of transformed data:")
print(X_train_transformed.head(3))

print("\n" + "="*60)
print("VALIDATION COMPLETE")
print("="*60)
```

---

### Step 4.7.3: Compare Before/After Distributions

```python
# Cell: Distribution Comparison
numeric_cols = df_train.select_dtypes(include=[np.number]).columns.tolist()
if target_col in numeric_cols:
    numeric_cols.remove(target_col)

# Select subset of features for visualization
features_to_plot = numeric_cols[:6]  # Plot first 6 features

for feature in features_to_plot:
    fig, axes = plt.subplots(1, 2, figsize=(15, 4))
    
    # Original distribution
    df_train[feature].hist(bins=50, ax=axes[0], edgecolor='black', alpha=0.7)
    axes[0].set_title(f'Original: {feature}')
    axes[0].set_xlabel('Value')
    axes[0].set_ylabel('Frequency')
    axes[0].axvline(df_train[feature].mean(), color='red', linestyle='--', label='Mean')
    axes[0].legend()
    
    # Transformed distribution
    if feature in X_train_transformed.columns:
        X_train_transformed[feature].hist(bins=50, ax=axes[1], edgecolor='black', alpha=0.7)
        axes[1].set_title(f'Transformed: {feature}')
        axes[1].set_xlabel('Value')
        axes[1].set_ylabel('Frequency')
        axes[1].axvline(X_train_transformed[feature].mean(), color='red', linestyle='--', label='Mean')
        axes[1].legend()
    else:
        # Feature might have been transformed/renamed
        axes[1].text(0.5, 0.5, 'Feature transformed/renamed', 
                    ha='center', va='center', fontsize=12)
        axes[1].set_title(f'Transformed: {feature}')
    
    plt.tight_layout()
    plt.savefig(f'../outputs/preprocessing_comparison_{feature}.png', dpi=300, bbox_inches='tight')
    plt.show()

# Cell: Statistical Comparison
print("="*60)
print("STATISTICAL COMPARISON")
print("="*60)

comparison_stats = pd.DataFrame()

for feature in features_to_plot:
    if feature not in X_train_transformed.columns:
        continue
    
    stats = {
        'original_mean': df_train[feature].mean(),
        'transformed_mean': X_train_transformed[feature].mean(),
        'original_std': df_train[feature].std(),
        'transformed_std': X_train_transformed[feature].std(),
        'original_skew': df_train[feature].skew(),
        'transformed_skew': X_train_transformed[feature].skew()
    }
    comparison_stats[feature] = pd.Series(stats)

comparison_stats = comparison_stats.T
print(comparison_stats)

comparison_stats.to_csv('../outputs/preprocessing_statistics.csv')
print("\n✓ Statistics saved to outputs/preprocessing_statistics.csv")
```

---

### Step 4.7.4: Document Transformation Rationale

```markdown
# Cell: Transformation Rationale (Markdown)

## Preprocessing Transformations Applied

### 1. Missing Value Imputation
**Strategy**: Median for numeric, mode for categorical

**Rationale**:
- Median imputation is robust to outliers (better than mean)
- Mode imputation preserves categorical distribution
- Missing indicators created for features with >5% missing to preserve information

**Features Imputed**:
- `income`: 12% missing → Median imputation
- `age`: 8% missing → Median imputation
- `category`: 3% missing → Mode imputation

---

### 2. Feature Engineering

**Created Features**:
1. **Log Transformations**:
   - `income_log`: Applied to right-skewed income (skewness=2.8)
   - `debt_log`: Applied to right-skewed debt (skewness=2.1)
   - *Rationale*: Reduces skewness, makes distributions more normal

2. **Interaction Features**:
   - `age × income`: Captures life-stage income effects
   - `debt × credit_score`: Captures debt burden relative to creditworthiness
   - *Rationale*: These interactions showed high importance in EDA

3. **Binned Features**:
   - `age_binned`: [<25, 25-40, 40-60, 60+]
   - *Rationale*: Captures non-linear age effects, interpretable segments

---

### 3. Categorical Encoding

**One-Hot Encoding**:
- Low cardinality features (<10 categories)
- `region`, `employment_status`
- *Rationale*: Preserves all category information, no ordinal assumption

**Target Encoding**:
- High cardinality features (>20 categories)
- `occupation` (150 categories)
- *Rationale*: Reduces dimensionality while preserving predictive power

**Rare Category Grouping**:
- Categories with <1% frequency grouped as "Other"
- *Rationale*: Prevents overfitting to rare categories

---

### 4. Scaling

**Strategy**: Standard scaling (mean=0, std=1)

**Rationale**:
- Makes features comparable in magnitude
- Required for distance-based algorithms (SVM, KNN)
- Improves gradient descent convergence in neural networks

**Features Scaled**: All numeric features except target

---

## Transformation Impact

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Features | 25 | 42 | +17 |
| Missing Values | 1,250 | 0 | -100% |
| Skewness (max) | 2.8 | 0.9 | -68% |
| Categorical Features | 5 | 0 | Encoded |
| Mean Absolute Scale | Varies | ~0-1 | Normalized |

---

## Next Steps
1. Train models on transformed data
2. Evaluate if transformations improved performance
3. Consider additional feature engineering based on model feedback
```

---

## Step 4.7: Save Pipeline

```python
# Cell: Save Preprocessing Pipeline
pipeline_path = pipeline.save()

print(f"\n✓ Pipeline saved to: {pipeline_path}")

# Test loading
loaded_pipeline = PreprocessingPipeline.load(pipeline_path)
print("✓ Pipeline loaded successfully")

# Validate loaded pipeline
X_test_reloaded = loaded_pipeline.transform(X_test)
assert X_test_reloaded.equals(X_test_transformed), "Loaded pipeline produces different results!"
print("✓ Loaded pipeline produces identical results")

# Cell: Save Transformed Data
X_train_transformed.to_csv('../data/processed/X_train_transformed.csv', index=False)
X_test_transformed.to_csv('../data/processed/X_test_transformed.csv', index=False)
y_train.to_csv('../data/processed/y_train.csv', index=False)
y_test.to_csv('../data/processed/y_test.csv', index=False)

print("\n✓ Transformed data saved to data/processed/")
print(f"   X_train: {X_train_transformed.shape}")
print(f"   X_test: {X_test_transformed.shape}")
print(f"   y_train: {y_train.shape}")
print(f"   y_test: {y_test.shape}")
```

---

## Phase 4 Complete! 🎉

**What you've accomplished**:
- ✅ Modular preprocessing components following sklearn API
- ✅ Configuration-driven imputation, scaling, encoding
- ✅ Comprehensive feature engineering pipeline
- ✅ Serializable preprocessing pipeline
- ✅ Validated transformed data
- ✅ Documented transformation rationale

**Verification Checklist**:
```bash
# Check pipeline saved
$ ls -lh models/preprocessing_pipeline_*.pkl

# Check transformed data saved
$ ls -lh data/processed/
# Should contain: X_train_transformed.csv, X_test_transformed.csv, y_train.csv, y_test.csv

# Verify transformations
$ python -c "import pandas as pd; df = pd.read_csv('data/processed/X_train_transformed.csv'); print(f'Shape: {df.shape}, Missing: {df.isnull().sum().sum()}')"

# Run preprocessing notebook
$ jupyter nbconvert --to notebook --execute notebooks/03_preprocessing.ipynb
```

**Deliverables**:
1. **Modules**: `base.py`, `preprocessor.py`, `pipeline.py`
2. **Pipeline**: Saved preprocessing pipeline (.pkl)
3. **Data**: Transformed train/test sets
4. **Documentation**: Transformation rationale and comparisons
5. **Notebook**: Complete preprocessing workflow

**Time Check**: Should complete in 45-90 minutes depending on complexity

---

**Next Phase**: Phase 5 - Model Development & Training (60-120 minutes)

---

**End of Phase 4 Detailed Implementation Steps**

---

# Phase 5: Model Development & Training - Detailed Implementation Steps

**Version**: 1.0  
**Companion to**: eda-mlp-implementation-guidelines.md (Phase 5)  
**Time Budget**: 60-120 minutes  
**Priority**: 🔴 CRITICAL - Core ML development phase

---

## Overview

This phase builds, trains, and evaluates ML models:
- ✅ Create model training infrastructure
- ✅ Implement baseline model
- ✅ Build training orchestration with cross-validation
- ✅ Create evaluation framework
- ✅ Train and compare multiple models
- ✅ Perform hyperparameter tuning
- ✅ Save model artifacts

---

## Step 5.1.0: Create Model Training Module

### Step 5.1.1: Create Model Factory

**📄 File**: `src/models/model_factory.py`
```python
"""
Model factory for creating ML models from configuration.

Supports multiple model types with consistent interface.
"""

from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.linear_model import LogisticRegression, Ridge, Lasso
from sklearn.svm import SVC, SVR
from sklearn.naive_bayes import GaussianNB
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.dummy import DummyClassifier, DummyRegressor
import xgboost as xgb
from typing import Dict, Any


def create_model(model_type: str, task: str = 'classification', **params):
    """
    Create model instance from type and parameters.
    
    Parameters:
    -----------
    model_type : str
        Model type identifier
    task : str
        'classification' or 'regression'
    **params
        Model hyperparameters
        
    Returns:
    --------
    model
        Instantiated model
        
    Example:
    --------
    >>> model = create_model('random_forest', task='classification', 
    ...                      n_estimators=100, max_depth=10)
    """
    # Get model registry
    registry = get_model_registry(task)
    
    if model_type not in registry:
        available = list(registry.keys())
        raise ValueError(
            f"Unknown model type: {model_type}. "
            f"Available types: {available}"
        )
    
    model_class = registry[model_type]
    
    # Filter params to only those accepted by model
    import inspect
    sig = inspect.signature(model_class.__init__)
    valid_params = {k: v for k, v in params.items() if k in sig.parameters}
    
    return model_class(**valid_params)


def get_model_registry(task: str = 'classification') -> Dict[str, Any]:
    """
    Get registry of available models for task.
    
    Parameters:
    -----------
    task : str
        'classification' or 'regression'
        
    Returns:
    --------
    registry : dict
        Mapping of model names to classes
    """
    if task == 'classification':
        return {
            # Baseline
            'dummy': DummyClassifier,
            
            # Linear models
            'logistic_regression': LogisticRegression,
            
            # Tree-based
            'random_forest': RandomForestClassifier,
            'gradient_boosting': GradientBoostingClassifier,
            'xgboost': xgb.XGBClassifier,
            
            # Other
            'svm': SVC,
            'naive_bayes': GaussianNB,
            'knn': KNeighborsClassifier
        }
    
    elif task == 'regression':
        return {
            # Baseline
            'dummy': DummyRegressor,
            
            # Linear models
            'ridge': Ridge,
            'lasso': Lasso,
            
            # Tree-based
            'random_forest': RandomForestRegressor,
            'gradient_boosting': GradientBoostingRegressor,
            'xgboost': xgb.XGBRegressor,
            
            # Other
            'svm': SVR,
            'knn': KNeighborsRegressor
        }
    
    else:
        raise ValueError(f"Unknown task: {task}")


def list_available_models(task: str = 'classification') -> list:
    """
    List all available model types for task.
    
    Parameters:
    -----------
    task : str
        'classification' or 'regression'
        
    Returns:
    --------
    models : list
        List of available model type names
    """
    return list(get_model_registry(task).keys())
```

---

### Step 5.1.2: Implement Model Registry

Already implemented in `get_model_registry()` function above.

---

### Step 5.1.3: Add Hyperparameter Validation

**Add to**: `src/models/model_factory.py`
```python
def validate_hyperparameters(model_type: str, params: Dict[str, Any], 
                            task: str = 'classification') -> Dict[str, Any]:
    """
    Validate hyperparameters for model type.
    
    Parameters:
    -----------
    model_type : str
        Model type
    params : dict
        Hyperparameters to validate
    task : str
        'classification' or 'regression'
        
    Returns:
    --------
    validated_params : dict
        Validated parameters with defaults filled in
        
    Raises:
    -------
    ValueError
        If invalid parameters provided
    """
    import inspect
    
    registry = get_model_registry(task)
    if model_type not in registry:
        raise ValueError(f"Unknown model type: {model_type}")
    
    model_class = registry[model_type]
    
    # Get valid parameters
    sig = inspect.signature(model_class.__init__)
    valid_param_names = set(sig.parameters.keys()) - {'self'}
    
    # Check for invalid parameters
    invalid_params = set(params.keys()) - valid_param_names
    if invalid_params:
        raise ValueError(
            f"Invalid parameters for {model_type}: {invalid_params}. "
            f"Valid parameters: {valid_param_names}"
        )
    
    # Get default values
    defaults = {
        name: param.default
        for name, param in sig.parameters.items()
        if param.default is not inspect.Parameter.empty
    }
    
    # Merge with provided params
    validated = {**defaults, **params}
    
    return validated
```

---

## Step 5.2.0: Implement Baseline Model

### Step 5.2.1-5.2.3: Train, Evaluate, Document Baseline

**📄 File**: `src/models/baseline.py`
```python
"""
Baseline model implementation.

Provides simple baseline for comparison.
"""

from sklearn.dummy import DummyClassifier, DummyRegressor
from sklearn.metrics import accuracy_score, f1_score, mean_squared_error, r2_score
import pandas as pd
from typing import Dict, Any


class BaselineModel:
    """
    Baseline model for classification or regression.
    
    Uses simplest possible strategy:
    - Classification: predict most frequent class
    - Regression: predict mean value
    """
    
    def __init__(self, task: str = 'classification', strategy: str = None):
        """
        Initialize baseline model.
        
        Parameters:
        -----------
        task : str
            'classification' or 'regression'
        strategy : str, optional
            Strategy for dummy model. If None, uses default:
            - 'most_frequent' for classification
            - 'mean' for regression
        """
        self.task = task
        
        if strategy is None:
            strategy = 'most_frequent' if task == 'classification' else 'mean'
        
        if task == 'classification':
            self.model = DummyClassifier(strategy=strategy)
        elif task == 'regression':
            self.model = DummyRegressor(strategy=strategy)
        else:
            raise ValueError(f"Unknown task: {task}")
    
    def fit(self, X, y):
        """Fit baseline model."""
        self.model.fit(X, y)
        return self
    
    def predict(self, X):
        """Generate predictions."""
        return self.model.predict(X)
    
    def evaluate(self, X, y) -> Dict[str, float]:
        """
        Evaluate baseline on data.
        
        Parameters:
        -----------
        X : array-like
            Features
        y : array-like
            True labels/values
            
        Returns:
        --------
        metrics : dict
            Evaluation metrics
        """
        y_pred = self.predict(X)
        
        if self.task == 'classification':
            metrics = {
                'accuracy': accuracy_score(y, y_pred),
                'f1': f1_score(y, y_pred, average='weighted')
            }
        else:
            metrics = {
                'mse': mean_squared_error(y, y_pred),
                'rmse': mean_squared_error(y, y_pred, squared=False),
                'r2': r2_score(y, y_pred)
            }
        
        return metrics


def train_and_evaluate_baseline(X_train, y_train, X_test, y_test, 
                                task: str = 'classification') -> Dict[str, Any]:
    """
    Train baseline model and evaluate on test set.
    
    Parameters:
    -----------
    X_train, y_train : array-like
        Training data
    X_test, y_test : array-like
        Test data
    task : str
        'classification' or 'regression'
        
    Returns:
    --------
    results : dict
        Results with model, train_metrics, test_metrics
    """
    print("="*60)
    print("BASELINE MODEL")
    print("="*60)
    
    # Create and train baseline
    baseline = BaselineModel(task=task)
    baseline.fit(X_train, y_train)
    
    # Evaluate on train and test
    train_metrics = baseline.evaluate(X_train, y_train)
    test_metrics = baseline.evaluate(X_test, y_test)
    
    print("\nTrain Metrics:")
    for metric, value in train_metrics.items():
        print(f"  {metric}: {value:.4f}")
    
    print("\nTest Metrics:")
    for metric, value in test_metrics.items():
        print(f"  {metric}: {value:.4f}")
    
    results = {
        'model': baseline,
        'train_metrics': train_metrics,
        'test_metrics': test_metrics,
        'model_type': 'baseline'
    }
    
    return results
```

---

## Step 5.3.0: Implement Model Training

### Step 5.3.1: Implement Cross-Validation

**📄 File**: `src/models/trainer.py`
```python
"""
Model training with cross-validation and evaluation.
"""

from sklearn.model_selection import cross_val_score, cross_validate
from sklearn.model_selection import StratifiedKFold, KFold
import numpy as np
from typing import Dict, List, Any


class ModelTrainer:
    """
    Train models with cross-validation.
    """
    
    def __init__(self, cv_folds: int = 5, scoring: str = 'f1_weighted', 
                 stratified: bool = True, random_state: int = 42):
        """
        Initialize trainer.
        
        Parameters:
        -----------
        cv_folds : int
            Number of cross-validation folds
        scoring : str
            Scoring metric for evaluation
        stratified : bool
            Whether to use stratified CV (for classification)
        random_state : int
            Random seed
        """
        self.cv_folds = cv_folds
        self.scoring = scoring
        self.stratified = stratified
        self.random_state = random_state
    
    def cross_validate(self, model, X, y, return_train_score: bool = True):
        """
        Perform cross-validation.
        
        Parameters:
        -----------
        model
            Model to evaluate
        X : array-like
            Features
        y : array-like
            Target
        return_train_score : bool
            Whether to return training scores
            
        Returns:
        --------
        cv_results : dict
            Cross-validation results with test and optionally train scores
        """
        # Create CV splitter
        if self.stratified:
            cv = StratifiedKFold(
                n_splits=self.cv_folds,
                shuffle=True,
                random_state=self.random_state
            )
        else:
            cv = KFold(
                n_splits=self.cv_folds,
                shuffle=True,
                random_state=self.random_state
            )
        
        # Perform cross-validation
        cv_results = cross_validate(
            model, X, y,
            cv=cv,
            scoring=self.scoring,
            return_train_score=return_train_score,
            n_jobs=-1
        )
        
        return cv_results
    
    def train_with_cv(self, model, X, y) -> Dict[str, Any]:
        """
        Train model with cross-validation.
        
        Parameters:
        -----------
        model
            Model to train
        X : array-like
            Training features
        y : array-like
            Training target
            
        Returns:
        --------
        results : dict
            Training results with CV scores and fitted model
        """
        # Cross-validation
        cv_results = self.cross_validate(model, X, y)
        
        # Fit on full training set
        model.fit(X, y)
        
        results = {
            'model': model,
            'cv_train_scores': cv_results['train_score'],
            'cv_test_scores': cv_results['test_score'],
            'cv_mean_train': cv_results['train_score'].mean(),
            'cv_std_train': cv_results['train_score'].std(),
            'cv_mean_test': cv_results['test_score'].mean(),
            'cv_std_test': cv_results['test_score'].std()
        }
        
        return results
```

---

### Step 5.3.2-5.3.4: Training Callbacks, Early Stopping, Reproducibility

**Add to**: `src/models/trainer.py`
```python
class ModelTrainer:
    # ... previous code ...
    
    def train_with_early_stopping(self, model, X_train, y_train, X_val, y_val,
                                  metric_name: str = 'f1', patience: int = 10):
        """
        Train model with early stopping (for models that support it).
        
        Parameters:
        -----------
        model
            Model to train (must support partial_fit or warm_start)
        X_train, y_train
            Training data
        X_val, y_val
            Validation data
        metric_name : str
            Metric to monitor
        patience : int
            Number of iterations without improvement before stopping
            
        Returns:
        --------
        results : dict
            Training results with history
        """
        from sklearn.metrics import get_scorer
        
        scorer = get_scorer(metric_name)
        
        best_score = -np.inf
        best_model = None
        patience_counter = 0
        history = {'train': [], 'val': []}
        
        # Check if model supports incremental training
        if hasattr(model, 'partial_fit'):
            # Incremental learning
            for iteration in range(1000):  # Max iterations
                model.partial_fit(X_train, y_train)
                
                train_score = scorer(model, X_train, y_train)
                val_score = scorer(model, X_val, y_val)
                
                history['train'].append(train_score)
                history['val'].append(val_score)
                
                if val_score > best_score:
                    best_score = val_score
                    best_model = model
                    patience_counter = 0
                else:
                    patience_counter += 1
                
                if patience_counter >= patience:
                    print(f"Early stopping at iteration {iteration}")
                    break
        
        elif hasattr(model, 'fit') and hasattr(model, 'n_estimators'):
            # For tree ensembles, train progressively
            for n_est in range(10, model.n_estimators + 1, 10):
                model.set_params(n_estimators=n_est)
                model.fit(X_train, y_train)
                
                train_score = scorer(model, X_train, y_train)
                val_score = scorer(model, X_val, y_val)
                
                history['train'].append(train_score)
                history['val'].append(val_score)
                
                if val_score > best_score:
                    best_score = val_score
                    best_model = model
                    patience_counter = 0
                else:
                    patience_counter += 1
                
                if patience_counter >= patience:
                    print(f"Early stopping at n_estimators={n_est}")
                    break
        
        else:
            # Standard training (no early stopping)
            model.fit(X_train, y_train)
            best_model = model
            history['train'] = [scorer(model, X_train, y_train)]
            history['val'] = [scorer(model, X_val, y_val)]
        
        return {
            'model': best_model,
            'best_score': best_score,
            'history': history
        }
    
    @staticmethod
    def set_random_seeds(seed: int = 42):
        """
        Set random seeds for reproducibility.
        
        Parameters:
        -----------
        seed : int
            Random seed value
        """
        np.random.seed(seed)
        try:
            import random
            random.seed(seed)
        except ImportError:
            pass
        
        try:
            import torch
            torch.manual_seed(seed)
        except ImportError:
            pass
```

---

## Step 5.4.0: Create Evaluation Module

**📄 File**: `src/models/evaluator.py`
```python
"""
Model evaluation utilities.
"""

from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, log_loss, confusion_matrix,
    mean_squared_error, mean_absolute_error, r2_score,
    classification_report, roc_curve, precision_recall_curve
)
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from typing import Dict, Any, List


class ModelEvaluator:
    """
    Evaluate model performance with multiple metrics.
    """
    
    def __init__(self, task: str = 'classification'):
        """
        Initialize evaluator.
        
        Parameters:
        -----------
        task : str
            'classification' or 'regression'
        """
        self.task = task
    
    def calculate_metrics(self, y_true, y_pred, y_pred_proba=None) -> Dict[str, float]:
        """
        Calculate all relevant metrics.
        
        Parameters:
        -----------
        y_true : array-like
            True labels/values
        y_pred : array-like
            Predicted labels/values
        y_pred_proba : array-like, optional
            Predicted probabilities (for classification)
            
        Returns:
        --------
        metrics : dict
            Dictionary of metric names and values
        """
        if self.task == 'classification':
            metrics = {
                'accuracy': accuracy_score(y_true, y_pred),
                'precision': precision_score(y_true, y_pred, average='weighted', zero_division=0),
                'recall': recall_score(y_true, y_pred, average='weighted', zero_division=0),
                'f1': f1_score(y_true, y_pred, average='weighted', zero_division=0)
            }
            
            if y_pred_proba is not None:
                try:
                    metrics['roc_auc'] = roc_auc_score(y_true, y_pred_proba, 
                                                       average='weighted', multi_class='ovr')
                    metrics['log_loss'] = log_loss(y_true, y_pred_proba)
                except (ValueError, AttributeError):
                    pass
        
        else:  # regression
            metrics = {
                'mse': mean_squared_error(y_true, y_pred),
                'rmse': np.sqrt(mean_squared_error(y_true, y_pred)),
                'mae': mean_absolute_error(y_true, y_pred),
                'r2': r2_score(y_true, y_pred)
            }
        
        return metrics
    
    def plot_confusion_matrix(self, y_true, y_pred, labels=None, normalize=False):
        """
        Plot confusion matrix.
        
        Parameters:
        -----------
        y_true, y_pred : array-like
            True and predicted labels
        labels : list, optional
            Class labels
        normalize : bool
            Whether to normalize matrix
        """
        cm = confusion_matrix(y_true, y_pred, labels=labels)
        
        if normalize:
            cm = cm.astype('float') / cm.sum(axis=1)[:, np.newaxis]
        
        plt.figure(figsize=(10, 8))
        sns.heatmap(cm, annot=True, fmt='.2f' if normalize else 'd',
                   cmap='Blues', xticklabels=labels, yticklabels=labels)
        plt.title('Confusion Matrix' + (' (Normalized)' if normalize else ''))
        plt.ylabel('True Label')
        plt.xlabel('Predicted Label')
        plt.tight_layout()
        
        return cm
    
    def plot_roc_curve(self, y_true, y_pred_proba, labels=None):
        """
        Plot ROC curve.
        
        Parameters:
        -----------
        y_true : array-like
            True labels
        y_pred_proba : array-like
            Predicted probabilities
        labels : list, optional
            Class labels
        """
        plt.figure(figsize=(10, 8))
        
        # Binary classification
        if len(np.unique(y_true)) == 2:
            fpr, tpr, _ = roc_curve(y_true, y_pred_proba[:, 1])
            auc = roc_auc_score(y_true, y_pred_proba[:, 1])
            
            plt.plot(fpr, tpr, label=f'ROC curve (AUC = {auc:.3f})')
        
        # Multi-class
        else:
            from sklearn.preprocessing import label_binarize
            y_true_bin = label_binarize(y_true, classes=np.unique(y_true))
            
            for i in range(y_true_bin.shape[1]):
                fpr, tpr, _ = roc_curve(y_true_bin[:, i], y_pred_proba[:, i])
                auc = roc_auc_score(y_true_bin[:, i], y_pred_proba[:, i])
                label_name = labels[i] if labels else f'Class {i}'
                plt.plot(fpr, tpr, label=f'{label_name} (AUC = {auc:.3f})')
        
        plt.plot([0, 1], [0, 1], 'k--', label='Random')
        plt.xlim([0.0, 1.0])
        plt.ylim([0.0, 1.05])
        plt.xlabel('False Positive Rate')
        plt.ylabel('True Positive Rate')
        plt.title('ROC Curve')
        plt.legend(loc='lower right')
        plt.grid(alpha=0.3)
        plt.tight_layout()
    
    def plot_precision_recall_curve(self, y_true, y_pred_proba):
        """
        Plot precision-recall curve.
        
        Parameters:
        -----------
        y_true : array-like
            True labels
        y_pred_proba : array-like
            Predicted probabilities
        """
        precision, recall, _ = precision_recall_curve(y_true, y_pred_proba[:, 1])
        
        plt.figure(figsize=(10, 8))
        plt.plot(recall, precision)
        plt.xlabel('Recall')
        plt.ylabel('Precision')
        plt.title('Precision-Recall Curve')
        plt.grid(alpha=0.3)
        plt.tight_layout()
    
    def extract_feature_importance(self, model, feature_names: List[str]) -> pd.DataFrame:
        """
        Extract feature importance from model.
        
        Parameters:
        -----------
        model
            Trained model
        feature_names : list
            Feature names
            
        Returns:
        --------
        importance_df : pd.DataFrame
            Feature importance DataFrame
        """
        if hasattr(model, 'feature_importances_'):
            importances = model.feature_importances_
        elif hasattr(model, 'coef_'):
            importances = np.abs(model.coef_).flatten()
        else:
            return None
        
        importance_df = pd.DataFrame({
            'feature': feature_names,
            'importance': importances
        }).sort_values('importance', ascending=False)
        
        return importance_df
```

---

## Step 5.5.0: Create Model Training Notebook

**📄 File**: `notebooks/04_model_training.ipynb`

### Step 5.5.1-5.5.5: Train, Compare, Select Models

```python
# Cell 1: Setup
import sys
sys.path.append('..')

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

from src.utils.config_loader import load_config
from src.models.model_factory import create_model, list_available_models
from src.models.baseline import train_and_evaluate_baseline
from src.models.trainer import ModelTrainer
from src.models.evaluator import ModelEvaluator

%matplotlib inline

# Cell 2: Load Transformed Data
X_train = pd.read_csv('../data/processed/X_train_transformed.csv')
X_test = pd.read_csv('../data/processed/X_test_transformed.csv')
y_train = pd.read_csv('../data/processed/y_train.csv').values.ravel()
y_test = pd.read_csv('../data/processed/y_test.csv').values.ravel()

print(f"X_train: {X_train.shape}")
print(f"X_test: {X_test.shape}")
print(f"y_train: {y_train.shape}")
print(f"y_test: {y_test.shape}")

# Cell 3: Load Model Config
model_config = load_config('../config/model_config.yaml')
print("Model configuration loaded")

# Cell 4: Train Baseline Model
print("="*60)
print("STEP 1: BASELINE MODEL")
print("="*60)

baseline_results = train_and_evaluate_baseline(
    X_train, y_train, X_test, y_test,
    task='classification'
)

# Save baseline results
baseline_metrics = {
    'model_type': 'baseline',
    'train': baseline_results['train_metrics'],
    'test': baseline_results['test_metrics']
}

# Cell 5: Define Models to Train
models_to_train = [
    ('logistic_regression', {
        'max_iter': 1000,
        'random_state': 42
    }),
    ('random_forest', {
        'n_estimators': 100,
        'max_depth': 10,
        'random_state': 42,
        'n_jobs': -1
    }),
    ('xgboost', {
        'n_estimators': 100,
        'max_depth': 6,
        'learning_rate': 0.1,
        'random_state': 42
    })
]

print("\n" + "="*60)
print("STEP 2: TRAIN MULTIPLE MODELS")
print("="*60)
print(f"\nModels to train: {[name for name, _ in models_to_train]}")

# Cell 6: Train All Models with Cross-Validation
trainer = ModelTrainer(
    cv_folds=5,
    scoring='f1_weighted',
    stratified=True,
    random_state=42
)

all_results = {}

for model_name, params in models_to_train:
    print(f"\n{'-'*60}")
    print(f"Training: {model_name}")
    print(f"{'-'*60}")
    
    # Create model
    model = create_model(model_name, task='classification', **params)
    
    # Train with cross-validation
    cv_results = trainer.train_with_cv(model, X_train, y_train)
    
    # Evaluate on test set
    evaluator = ModelEvaluator(task='classification')
    
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test) if hasattr(model, 'predict_proba') else None
    
    test_metrics = evaluator.calculate_metrics(y_test, y_pred, y_pred_proba)
    
    # Store results
    all_results[model_name] = {
        'model': model,
        'cv_mean_test': cv_results['cv_mean_test'],
        'cv_std_test': cv_results['cv_std_test'],
        'test_metrics': test_metrics
    }
    
    print(f"\nCross-Validation (5-fold):")
    print(f"  Mean Score: {cv_results['cv_mean_test']:.4f} ± {cv_results['cv_std_test']:.4f}")
    
    print(f"\nTest Set Metrics:")
    for metric, value in test_metrics.items():
        print(f"  {metric}: {value:.4f}")

# Cell 7: Compare Model Performance
print("\n" + "="*60)
print("STEP 3: MODEL COMPARISON")
print("="*60)

comparison_data = []

# Add baseline
comparison_data.append({
    'Model': 'Baseline',
    'CV Score': '-',
    'Test Accuracy': baseline_results['test_metrics']['accuracy'],
    'Test F1': baseline_results['test_metrics']['f1']
})

# Add other models
for model_name, results in all_results.items():
    comparison_data.append({
        'Model': model_name,
        'CV Score': f"{results['cv_mean_test']:.4f} ± {results['cv_std_test']:.4f}",
        'Test Accuracy': results['test_metrics'].get('accuracy', '-'),
        'Test F1': results['test_metrics'].get('f1', '-')
    })

comparison_df = pd.DataFrame(comparison_data)
print("\nModel Comparison Table:")
print(comparison_df.to_string(index=False))

# Visualize comparison
fig, axes = plt.subplots(1, 2, figsize=(15, 5))

# F1 Score Comparison
f1_scores = [row['Test F1'] for row in comparison_data]
model_names = [row['Model'] for row in comparison_data]

axes[0].barh(model_names, f1_scores)
axes[0].set_xlabel('F1 Score')
axes[0].set_title('Model Comparison - F1 Score')
axes[0].grid(axis='x', alpha=0.3)

# Accuracy Comparison
accuracy_scores = [row['Test Accuracy'] for row in comparison_data]

axes[1].barh(model_names, accuracy_scores)
axes[1].set_xlabel('Accuracy')
axes[1].set_title('Model Comparison - Accuracy')
axes[1].grid(axis='x', alpha=0.3)

plt.tight_layout()
plt.savefig('../outputs/model_comparison.png', dpi=300, bbox_inches='tight')
plt.show()

# Cell 8: Select Best Model
print("\n" + "="*60)
print("STEP 4: SELECT BEST MODEL")
print("="*60)

# Select based on F1 score
best_model_name = max(all_results.items(), 
                     key=lambda x: x[1]['test_metrics']['f1'])[0]
best_model_results = all_results[best_model_name]

print(f"\nBest Model: {best_model_name}")
print(f"Test F1 Score: {best_model_results['test_metrics']['f1']:.4f}")

# Cell 9: Document Model Selection
selection_rationale = f"""
# Model Selection Rationale

## Comparison Summary
{comparison_df.to_markdown(index=False)}

## Selected Model: {best_model_name}

### Performance Metrics
- **Test F1 Score**: {best_model_results['test_metrics']['f1']:.4f}
- **Test Accuracy**: {best_model_results['test_metrics']['accuracy']:.4f}
- **Cross-Validation**: {best_model_results['cv_mean_test']:.4f} ± {best_model_results['cv_std_test']:.4f}

### Selection Criteria
1. **Primary Metric**: F1 Score (balanced precision and recall)
2. **Consistency**: Low CV standard deviation indicates stable performance
3. **Comparison to Baseline**: {(best_model_results['test_metrics']['f1'] / baseline_results['test_metrics']['f1'] - 1) * 100:.1f}% improvement over baseline

### Trade-offs Considered
- **Interpretability**: [Model interpretability level]
- **Inference Speed**: [Expected prediction time]
- **Training Time**: [Model training duration]
- **Resource Requirements**: [Memory/compute needs]

### Next Steps
1. Hyperparameter tuning to optimize {best_model_name}
2. Feature importance analysis
3. Error analysis on misclassified samples
"""

with open('../outputs/model_selection_rationale.md', 'w') as f:
    f.write(selection_rationale)

print("✓ Model selection rationale saved")
```

---

## Step 5.6.0: Implement Hyperparameter Tuning

### Step 5.6.1-5.6.4: Define Search Space, Run Search, Extract Best Parameters

```python
# Cell: Hyperparameter Tuning
from sklearn.model_selection import GridSearchCV, RandomizedSearchCV

print("\n" + "="*60)
print("STEP 5: HYPERPARAMETER TUNING")
print("="*60)

# Define parameter grid based on best model
if best_model_name == 'random_forest':
    param_grid = {
        'n_estimators': [50, 100, 200],
        'max_depth': [5, 10, 15, None],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4]
    }
elif best_model_name == 'xgboost':
    param_grid = {
        'n_estimators': [50, 100, 200],
        'max_depth': [3, 6, 10],
        'learning_rate': [0.01, 0.1, 0.3],
        'subsample': [0.8, 1.0],
        'colsample_bytree': [0.8, 1.0]
    }
elif best_model_name == 'logistic_regression':
    param_grid = {
        'C': [0.001, 0.01, 0.1, 1, 10, 100],
        'penalty': ['l1', 'l2'],
        'solver': ['liblinear', 'saga']
    }
else:
    param_grid = {}

if param_grid:
    print(f"\nTuning {best_model_name}")
    print(f"Parameter grid: {param_grid}")
    
    # Create base model
    base_model = create_model(best_model_name, task='classification', random_state=42)
    
    # Grid search
    grid_search = GridSearchCV(
        base_model,
        param_grid,
        cv=5,
        scoring='f1_weighted',
        n_jobs=-1,
        verbose=1
    )
    
    print("\nRunning grid search...")
    grid_search.fit(X_train, y_train)
    
    print(f"\nBest parameters: {grid_search.best_params_}")
    print(f"Best CV score: {grid_search.best_score_:.4f}")
    
    # Evaluate tuned model on test set
    y_pred_tuned = grid_search.predict(X_test)
    y_pred_proba_tuned = grid_search.predict_proba(X_test)
    
    tuned_metrics = evaluator.calculate_metrics(y_test, y_pred_tuned, y_pred_proba_tuned)
    
    print(f"\nTuned Model Test Metrics:")
    for metric, value in tuned_metrics.items():
        print(f"  {metric}: {value:.4f}")
    
    # Compare to original
    print(f"\nImprovement over original:")
    for metric in ['accuracy', 'f1']:
        original = best_model_results['test_metrics'][metric]
        tuned = tuned_metrics[metric]
        improvement = (tuned - original) / original * 100
        print(f"  {metric}: {improvement:+.2f}%")
    
    # Save best parameters
    import json
    with open('../outputs/best_hyperparameters.json', 'w') as f:
        json.dump(grid_search.best_params_, f, indent=2)
    
    # Use tuned model as final model
    final_model = grid_search.best_estimator_
    final_metrics = tuned_metrics
else:
    print(f"\nNo tuning defined for {best_model_name}, using original model")
    final_model = best_model_results['model']
    final_metrics = best_model_results['test_metrics']
```

---

## Step 5.7.0: Implement Model Serialization

### Step 5.7.1-5.7.2: Save Model Artifacts, Create Model Card

```python
# Cell: Save Final Model
import joblib
from datetime import datetime

print("\n" + "="*60)
print("STEP 6: SAVE MODEL ARTIFACTS")
print("="*60)

# Create timestamp
timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

# Save model
model_filename = f'models/{best_model_name}_{timestamp}.pkl'
joblib.dump(final_model, model_filename)
print(f"\n✓ Model saved to: {model_filename}")

# Save feature names
feature_names = X_train.columns.tolist()
feature_filename = f'models/{best_model_name}_{timestamp}_features.json'

import json
with open(feature_filename, 'w') as f:
    json.dump(feature_names, f, indent=2)
print(f"✓ Feature names saved to: {feature_filename}")

# Save metadata
metadata = {
    'model_type': best_model_name,
    'timestamp': timestamp,
    'n_features': len(feature_names),
    'n_samples_train': len(X_train),
    'training_config': model_config,
    'final_metrics': {k: float(v) for k, v in final_metrics.items()},
    'feature_names': feature_names
}

metadata_filename = f'models/{best_model_name}_{timestamp}_metadata.json'
with open(metadata_filename, 'w') as f:
    json.dump(metadata, f, indent=2)
print(f"✓ Metadata saved to: {metadata_filename}")

# Cell: Create Model Card
model_card = f"""
# Model Card: {best_model_name}

**Version**: {timestamp}  
**Model Type**: {best_model_name}  
**Task**: Binary Classification  
**Date**: {datetime.now().strftime('%Y-%m-%d')}

---

## Model Details

### Architecture
- **Algorithm**: {best_model_name}
- **Framework**: scikit-learn / XGBoost
- **Number of Features**: {len(feature_names)}
- **Training Samples**: {len(X_train):,}

### Hyperparameters
```json
{json.dumps(final_model.get_params(), indent=2, default=str)}
```

---

## Performance Metrics

### Test Set Performance
| Metric | Value |
|--------|-------|
| Accuracy | {final_metrics['accuracy']:.4f} |
| Precision | {final_metrics['precision']:.4f} |
| Recall | {final_metrics['recall']:.4f} |
| F1 Score | {final_metrics['f1']:.4f} |
{f"| ROC-AUC | {final_metrics['roc_auc']:.4f} |" if 'roc_auc' in final_metrics else ""}

### Cross-Validation
- **Mean Score**: {best_model_results['cv_mean_test']:.4f}
- **Std Dev**: {best_model_results['cv_std_test']:.4f}
- **Folds**: 5 (stratified)

### Baseline Comparison
- **Baseline F1**: {baseline_results['test_metrics']['f1']:.4f}
- **Model F1**: {final_metrics['f1']:.4f}
- **Improvement**: {(final_metrics['f1'] / baseline_results['test_metrics']['f1'] - 1) * 100:.1f}%

---

## Training Data

### Data Characteristics
- **Source**: [Data source description]
- **Total Samples**: {len(X_train) + len(X_test):,}
- **Training Samples**: {len(X_train):,} (70%)
- **Test Samples**: {len(X_test):,} (30%)
- **Features**: {len(feature_names)}
- **Target Distribution**: [Class distribution]

### Preprocessing Steps
1. Missing value imputation
2. Feature engineering (interactions, transformations)
3. Categorical encoding
4. Feature scaling

---

## Model Limitations

### Known Limitations
1. **Data Recency**: Model trained on data up to [date]
2. **Feature Dependencies**: Requires specific preprocessing pipeline
3. **Class Imbalance**: [If applicable]
4. **Edge Cases**: [Known failure modes]

### Not Suitable For
- [List of inappropriate use cases]
- [Out-of-scope scenarios]

---

## Ethical Considerations

### Fairness
- [Fairness analysis if conducted]
- [Potential biases]

### Privacy
- No personally identifiable information (PII) in training data
- [Other privacy considerations]

---

## Usage

### Loading the Model
```python
import joblib
model = joblib.load('{model_filename}')
```

### Making Predictions
```python
# Load preprocessing pipeline
from src.preprocessing.pipeline import PreprocessingPipeline
pipeline = PreprocessingPipeline.load('path/to/pipeline.pkl')

# Preprocess new data
X_new_processed = pipeline.transform(X_new)

# Predict
predictions = model.predict(X_new_processed)
probabilities = model.predict_proba(X_new_processed)
```

---

## Maintenance

### Model Monitoring
- Monitor prediction distribution drift
- Track model performance metrics
- Retrain when performance degrades >5%

### Update Schedule
- **Routine Retraining**: Quarterly
- **Emergency Retraining**: If performance drops >10%

---

## Contact

**Model Owner**: [Your name/team]  
**Email**: [Contact email]  
**Repository**: [Git repository URL]

---

**End of Model Card**
"""

model_card_filename = f'models/{best_model_name}_{timestamp}_model_card.md'
with open(model_card_filename, 'w') as f:
    f.write(model_card)

print(f"✓ Model card saved to: {model_card_filename}")

print("\n" + "="*60)
print("MODEL TRAINING COMPLETE")
print("="*60)
print(f"\nFinal Model: {best_model_name}")
print(f"Test F1 Score: {final_metrics['f1']:.4f}")
print(f"\nArtifacts saved:")
print(f"  - Model: {model_filename}")
print(f"  - Features: {feature_filename}")
print(f"  - Metadata: {metadata_filename}")
print(f"  - Model Card: {model_card_filename}")
```

---

## Phase 5 Complete! 🎉

**What you've accomplished**:
- ✅ Model factory for creating models from config
- ✅ Baseline model for comparison
- ✅ Training infrastructure with cross-validation
- ✅ Comprehensive evaluation framework
- ✅ Multiple model comparison
- ✅ Hyperparameter tuning
- ✅ Model serialization with metadata

**Verification Checklist**:
```bash
# Check saved models
$ ls -lh models/

# Should contain:
# - {model_name}_{timestamp}.pkl
# - {model_name}_{timestamp}_features.json
# - {model_name}_{timestamp}_metadata.json
# - {model_name}_{timestamp}_model_card.md

# Verify model can be loaded
$ python -c "import joblib; model = joblib.load('models/xgboost_*.pkl'); print('✓ Model loaded')"

# Check outputs
$ ls -lh outputs/
# Should contain: model_comparison.png, model_selection_rationale.md, best_hyperparameters.json

# Run training notebook
$ jupyter nbconvert --to notebook --execute notebooks/04_model_training.ipynb
```

**Deliverables**:
1. **Modules**: `model_factory.py`, `baseline.py`, `trainer.py`, `evaluator.py`
2. **Trained Models**: Best model with metadata
3. **Comparisons**: Model comparison visualizations
4. **Documentation**: Model card and selection rationale
5. **Notebook**: Complete training workflow

**Time Check**: Should complete in 60-120 minutes

---

**Next Phase**: Phase 6 - Model Evaluation & Analysis (30-60 minutes)

---

**End of Phase 5 Detailed Implementation Steps**

---

# Phases 6-8: Model Evaluation, Productionization & Documentation - Detailed Implementation Steps

**Version**: 1.0  
**Companion to**: eda-mlp-implementation-guidelines.md (Phases 6-8)  
**Time Budget**: 120-240 minutes total  
**Priority**: 🔴 CRITICAL - Production readiness

---

## PHASE 6: Model Evaluation & Analysis (30-60 minutes)

### Step 6.1.0: Evaluate on Test Set

**📄 File**: `notebooks/05_model_evaluation.ipynb`

```python
# Cell 1: Setup
import sys
sys.path.append('..')

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib

from src.models.evaluator import ModelEvaluator
from src.preprocessing.pipeline import PreprocessingPipeline

%matplotlib inline

# Cell 2: Load Model and Data
# Find latest model
import glob
model_files = glob.glob('models/*.pkl')
latest_model = max([f for f in model_files if 'preprocessing' not in f])

model = joblib.load(latest_model)
print(f"✓ Loaded model: {latest_model}")

# Load test data
X_test = pd.read_csv('../data/processed/X_test_transformed.csv')
y_test = pd.read_csv('../data/processed/y_test.csv').values.ravel()

print(f"✓ Test data loaded: {X_test.shape}")

# Cell 3: Generate Predictions
y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test) if hasattr(model, 'predict_proba') else None

print(f"✓ Predictions generated: {y_pred.shape}")

# Cell 4: Calculate All Metrics
evaluator = ModelEvaluator(task='classification')
test_metrics = evaluator.calculate_metrics(y_test, y_pred, y_pred_proba)

print("\n" + "="*60)
print("TEST SET EVALUATION")
print("="*60)

for metric, value in test_metrics.items():
    print(f"{metric:15s}: {value:.4f}")

# Cell 5: Compare to Validation Metrics
# Load metadata to get validation metrics
import json
metadata_file = latest_model.replace('.pkl', '_metadata.json')
with open(metadata_file, 'r') as f:
    metadata = json.load(f)

val_metrics = metadata.get('final_metrics', {})

print("\n" + "="*60)
print("VALIDATION vs TEST COMPARISON")
print("="*60)

comparison = pd.DataFrame({
    'Validation': val_metrics,
    'Test': test_metrics
})

print(comparison)

# Check for overfitting
print("\nOverfitting Assessment:")
for metric in ['accuracy', 'f1']:
    if metric in val_metrics and metric in test_metrics:
        diff = (val_metrics[metric] - test_metrics[metric]) / val_metrics[metric] * 100
        if abs(diff) < 2:
            status = "✓ Excellent"
        elif abs(diff) < 5:
            status = "✓ Good"
        elif abs(diff) < 10:
            status = "⚠️  Moderate"
        else:
            status = "❌ Poor"
        
        print(f"  {metric}: {diff:+.2f}% difference - {status}")
```

---

### Step 6.2.0: Perform Error Analysis

```python
# Cell: Error Analysis
print("\n" + "="*60)
print("ERROR ANALYSIS")
print("="*60)

# Identify errors
errors = y_test != y_pred
n_errors = errors.sum()
error_rate = n_errors / len(y_test) * 100

print(f"\nTotal Errors: {n_errors} ({error_rate:.2f}%)")

# Analyze errors by prediction confidence
if y_pred_proba is not None:
    confidence = np.max(y_pred_proba, axis=1)
    
    error_df = pd.DataFrame({
        'true_label': y_test,
        'pred_label': y_pred,
        'confidence': confidence,
        'is_error': errors
    })
    
    # Group errors by confidence
    print("\nErrors by Confidence Level:")
    for low, high in [(0, 0.6), (0.6, 0.8), (0.8, 1.0)]:
        mask = (confidence >= low) & (confidence < high)
        n_samples = mask.sum()
        n_errors_bin = (errors & mask).sum()
        
        if n_samples > 0:
            error_rate_bin = n_errors_bin / n_samples * 100
            print(f"  Confidence [{low:.1f}, {high:.1f}): "
                  f"{n_errors_bin}/{n_samples} errors ({error_rate_bin:.1f}%)")
    
    # Plot error distribution
    fig, axes = plt.subplots(1, 2, figsize=(15, 5))
    
    # Confidence distribution for correct vs incorrect
    axes[0].hist([confidence[~errors], confidence[errors]],
                bins=50, label=['Correct', 'Incorrect'], alpha=0.7)
    axes[0].set_xlabel('Prediction Confidence')
    axes[0].set_ylabel('Count')
    axes[0].set_title('Confidence Distribution: Correct vs Incorrect')
    axes[0].legend()
    axes[0].grid(alpha=0.3)
    
    # Error rate by confidence bin
    bins = np.linspace(0, 1, 21)
    bin_centers = (bins[:-1] + bins[1:]) / 2
    error_rates = []
    
    for i in range(len(bins)-1):
        mask = (confidence >= bins[i]) & (confidence < bins[i+1])
        if mask.sum() > 0:
            error_rates.append((errors & mask).sum() / mask.sum())
        else:
            error_rates.append(0)
    
    axes[1].bar(bin_centers, error_rates, width=0.04, alpha=0.7)
    axes[1].set_xlabel('Prediction Confidence')
    axes[1].set_ylabel('Error Rate')
    axes[1].set_title('Error Rate by Confidence Level')
    axes[1].grid(axis='y', alpha=0.3)
    
    plt.tight_layout()
    plt.savefig('../outputs/error_analysis.png', dpi=300, bbox_inches='tight')
    plt.show()

# Cell: Document Error Insights
error_insights = f"""
# Error Analysis Insights

## Error Statistics
- **Total Errors**: {n_errors} / {len(y_test)} ({error_rate:.2f}%)
- **False Positives**: {((y_test == 0) & (y_pred == 1)).sum()}
- **False Negatives**: {((y_test == 1) & (y_pred == 0)).sum()}

## Key Findings
1. **Low Confidence Errors**: Majority of errors occur at confidence < 0.7
2. **Recommendation**: Use confidence threshold of 0.7 for production decisions
3. **High Confidence Errors**: {((errors) & (confidence > 0.9)).sum()} errors with confidence > 0.9 - investigate these cases

## Next Steps
- Review high-confidence errors for data quality issues
- Consider ensemble methods to improve uncertain predictions
- Implement confidence-based routing (manual review for low confidence)
"""

with open('../outputs/error_analysis_insights.md', 'w') as f:
    f.write(error_insights)

print("✓ Error insights saved")
```

---

### Step 6.3.0: Analyze Feature Importance

```python
# Cell: Feature Importance Analysis
print("\n" + "="*60)
print("FEATURE IMPORTANCE ANALYSIS")
print("="*60)

feature_names = X_test.columns.tolist()

# Extract importance from model
importance_df = evaluator.extract_feature_importance(model, feature_names)

if importance_df is not None:
    print("\nTop 20 Most Important Features:")
    print(importance_df.head(20))
    
    # Plot top features
    plt.figure(figsize=(10, 8))
    importance_df.head(20).plot(x='feature', y='importance', kind='barh')
    plt.xlabel('Importance')
    plt.title('Top 20 Feature Importances')
    plt.gca().invert_yaxis()
    plt.tight_layout()
    plt.savefig('../outputs/feature_importance.png', dpi=300, bbox_inches='tight')
    plt.show()
    
    # Save importance
    importance_df.to_csv('../outputs/feature_importance.csv', index=False)
    print("\n✓ Feature importance saved")
else:
    print("\n⚠️  Model does not support feature importance extraction")
```

---

### Step 6.4.0: Perform Model Diagnostics

```python
# Cell: Model Diagnostics
print("\n" + "="*60)
print("MODEL DIAGNOSTICS")
print("="*60)

# Confusion Matrix
cm = evaluator.plot_confusion_matrix(y_test, y_pred, normalize=False)
plt.savefig('../outputs/confusion_matrix.png', dpi=300, bbox_inches='tight')
plt.show()

# Normalized Confusion Matrix
cm_norm = evaluator.plot_confusion_matrix(y_test, y_pred, normalize=True)
plt.savefig('../outputs/confusion_matrix_normalized.png', dpi=300, bbox_inches='tight')
plt.show()

# ROC Curve
if y_pred_proba is not None:
    evaluator.plot_roc_curve(y_test, y_pred_proba)
    plt.savefig('../outputs/roc_curve.png', dpi=300, bbox_inches='tight')
    plt.show()
    
    # Precision-Recall Curve
    evaluator.plot_precision_recall_curve(y_test, y_pred_proba)
    plt.savefig('../outputs/precision_recall_curve.png', dpi=300, bbox_inches='tight')
    plt.show()

print("✓ Diagnostic plots saved")
```

---

## PHASE 7: Pipeline Productionization (60-120 minutes)

### Step 7.1.0: Extract Code from Notebooks

**Goal**: Convert notebook code to production modules

```python
# This is a planning step - review notebooks and identify:
# 1. Reusable data loading logic → already in src/data/
# 2. Preprocessing logic → already in src/preprocessing/
# 3. Model training logic → already in src/models/
# 4. Evaluation logic → already in src/models/

# Any remaining notebook-specific code should be refactored into functions
```

---

### Step 7.2.0: Create End-to-End Pipeline Script

**📄 File**: `src/pipeline.py`
```python
"""
End-to-end ML pipeline orchestration.
"""

import argparse
import logging
from pathlib import Path
from datetime import datetime

from utils.config_loader import load_config
from data.data_loader import load_data
from data.data_validator import validate_data
from preprocessing.pipeline import PreprocessingPipeline
from models.model_factory import create_model
from models.trainer import ModelTrainer
from models.evaluator import ModelEvaluator
from models.baseline import train_and_evaluate_baseline

import joblib


def setup_logging(log_file: str = None):
    """Configure logging."""
    log_format = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    
    handlers = [logging.StreamHandler()]
    if log_file:
        handlers.append(logging.FileHandler(log_file))
    
    logging.basicConfig(
        level=logging.INFO,
        format=log_format,
        handlers=handlers
    )


def run_pipeline(config_dir: str = 'config', output_dir: str = 'outputs'):
    """
    Run complete ML pipeline.
    
    Stages:
    1. Load and validate data
    2. Preprocess features
    3. Train baseline
    4. Train models
    5. Evaluate and select best
    6. Save artifacts
    """
    logger = logging.getLogger(__name__)
    
    # Create output directory
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    
    # Stage 1: Load Data
    logger.info("="*60)
    logger.info("STAGE 1: DATA LOADING")
    logger.info("="*60)
    
    data_config = load_config(f'{config_dir}/data_config.yaml')
    df_train = load_data(data_config, split='train')
    df_test = load_data(data_config, split='test')
    
    # Validate data
    validation_report = validate_data(df_train, data_config)
    if not validation_report['is_valid']:
        logger.error("Data validation failed!")
        for error in validation_report['errors']:
            logger.error(f"  - {error}")
        raise ValueError("Data validation failed")
    
    # Stage 2: Preprocessing
    logger.info("\n" + "="*60)
    logger.info("STAGE 2: PREPROCESSING")
    logger.info("="*60)
    
    target_col = data_config['schema']['target_column']
    
    X_train = df_train.drop(columns=[target_col])
    y_train = df_train[target_col]
    X_test = df_test.drop(columns=[target_col])
    y_test = df_test[target_col]
    
    preprocessing_config = load_config(f'{config_dir}/preprocessing_config.yaml')
    pipeline = PreprocessingPipeline(preprocessing_config)
    
    pipeline.fit(X_train, y_train)
    X_train_transformed = pipeline.transform(X_train)
    X_test_transformed = pipeline.transform(X_test)
    
    # Save preprocessing pipeline
    pipeline_path = f'models/preprocessing_pipeline_{timestamp}.pkl'
    pipeline.save(pipeline_path)
    logger.info(f"Preprocessing pipeline saved: {pipeline_path}")
    
    # Stage 3: Train Baseline
    logger.info("\n" + "="*60)
    logger.info("STAGE 3: BASELINE MODEL")
    logger.info("="*60)
    
    baseline_results = train_and_evaluate_baseline(
        X_train_transformed, y_train,
        X_test_transformed, y_test
    )
    
    # Stage 4: Train Models
    logger.info("\n" + "="*60)
    logger.info("STAGE 4: MODEL TRAINING")
    logger.info("="*60)
    
    model_config = load_config(f'{config_dir}/model_config.yaml')
    
    trainer = ModelTrainer(cv_folds=5, scoring='f1_weighted')
    evaluator = ModelEvaluator(task='classification')
    
    # Create and train model
    model = create_model(
        model_config['model']['type'],
        task='classification',
        **model_config['model']['params']
    )
    
    cv_results = trainer.train_with_cv(model, X_train_transformed, y_train)
    logger.info(f"CV Score: {cv_results['cv_mean_test']:.4f} ± {cv_results['cv_std_test']:.4f}")
    
    # Stage 5: Evaluate
    logger.info("\n" + "="*60)
    logger.info("STAGE 5: EVALUATION")
    logger.info("="*60)
    
    y_pred = model.predict(X_test_transformed)
    y_pred_proba = model.predict_proba(X_test_transformed) if hasattr(model, 'predict_proba') else None
    
    test_metrics = evaluator.calculate_metrics(y_test, y_pred, y_pred_proba)
    
    for metric, value in test_metrics.items():
        logger.info(f"  {metric}: {value:.4f}")
    
    # Stage 6: Save Artifacts
    logger.info("\n" + "="*60)
    logger.info("STAGE 6: SAVE ARTIFACTS")
    logger.info("="*60)
    
    model_filename = f"models/{model_config['model']['type']}_{timestamp}.pkl"
    joblib.dump(model, model_filename)
    logger.info(f"Model saved: {model_filename}")
    
    # Save metadata
    import json
    metadata = {
        'timestamp': timestamp,
        'model_type': model_config['model']['type'],
        'cv_score': float(cv_results['cv_mean_test']),
        'test_metrics': {k: float(v) for k, v in test_metrics.items()},
        'preprocessing_pipeline': pipeline_path
    }
    
    metadata_filename = model_filename.replace('.pkl', '_metadata.json')
    with open(metadata_filename, 'w') as f:
        json.dump(metadata, f, indent=2)
    
    logger.info(f"Metadata saved: {metadata_filename}")
    
    logger.info("\n" + "="*60)
    logger.info("PIPELINE COMPLETE")
    logger.info("="*60)
    
    return {
        'model': model,
        'pipeline': pipeline,
        'metrics': test_metrics
    }


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Run ML pipeline')
    parser.add_argument('--config-dir', default='config', help='Configuration directory')
    parser.add_argument('--output-dir', default='outputs', help='Output directory')
    parser.add_argument('--log-file', default=None, help='Log file path')
    
    args = parser.parse_args()
    
    setup_logging(args.log_file)
    run_pipeline(args.config_dir, args.output_dir)
```

---

### Step 7.3.0: Create Training Script

**📄 File**: `scripts/train.py`
```python
"""
Training script for ML models.

Usage:
    python scripts/train.py --config config/model_config.yaml
"""

import argparse
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).parent.parent))

from src.pipeline import run_pipeline, setup_logging


def main():
    parser = argparse.ArgumentParser(description='Train ML model')
    parser.add_argument('--config', default='config/model_config.yaml',
                       help='Model configuration file')
    parser.add_argument('--data-config', default='config/data_config.yaml',
                       help='Data configuration file')
    parser.add_argument('--preprocessing-config', default='config/preprocessing_config.yaml',
                       help='Preprocessing configuration file')
    parser.add_argument('--output-dir', default='outputs',
                       help='Output directory for artifacts')
    parser.add_argument('--log-file', default='outputs/training.log',
                       help='Log file path')
    
    args = parser.parse_args()
    
    # Setup logging
    setup_logging(args.log_file)
    
    # Run pipeline
    results = run_pipeline(
        config_dir=str(Path(args.config).parent),
        output_dir=args.output_dir
    )
    
    print("\n✓ Training complete!")
    print(f"  Model: {results['model'].__class__.__name__}")
    print(f"  Test F1: {results['metrics']['f1']:.4f}")


if __name__ == '__main__':
    main()
```

---

### Step 7.4.0: Create Inference Script

**📄 File**: `scripts/predict.py`
```python
"""
Inference script for making predictions.

Usage:
    python scripts/predict.py --model models/model.pkl --input data.csv --output predictions.csv
"""

import argparse
import sys
from pathlib import Path
import pandas as pd
import joblib
import json

sys.path.append(str(Path(__file__).parent.parent))

from src.preprocessing.pipeline import PreprocessingPipeline


def load_model_and_pipeline(model_path: str):
    """Load model and associated preprocessing pipeline."""
    model = joblib.load(model_path)
    
    # Load metadata to find preprocessing pipeline
    metadata_path = model_path.replace('.pkl', '_metadata.json')
    with open(metadata_path, 'r') as f:
        metadata = json.load(f)
    
    pipeline_path = metadata['preprocessing_pipeline']
    pipeline = PreprocessingPipeline.load(pipeline_path)
    
    return model, pipeline


def validate_input(df: pd.DataFrame, expected_features: list) -> bool:
    """Validate input data has required features."""
    missing = set(expected_features) - set(df.columns)
    if missing:
        print(f"❌ Missing features: {missing}")
        return False
    return True


def predict(model_path: str, input_path: str, output_path: str):
    """
    Make predictions on new data.
    
    Parameters:
    -----------
    model_path : str
        Path to saved model
    input_path : str
        Path to input CSV file
    output_path : str
        Path to save predictions
    """
    print(f"Loading model from: {model_path}")
    model, pipeline = load_model_and_pipeline(model_path)
    
    print(f"Loading input data from: {input_path}")
    df = pd.read_csv(input_path)
    print(f"  Loaded {len(df)} samples")
    
    # Preprocess
    print("Preprocessing...")
    X_processed = pipeline.transform(df)
    
    # Predict
    print("Generating predictions...")
    predictions = model.predict(X_processed)
    
    if hasattr(model, 'predict_proba'):
        probabilities = model.predict_proba(X_processed)
        
        # Create output DataFrame
        output_df = pd.DataFrame({
            'prediction': predictions,
            'probability_class_0': probabilities[:, 0],
            'probability_class_1': probabilities[:, 1]
        })
    else:
        output_df = pd.DataFrame({
            'prediction': predictions
        })
    
    # Save
    print(f"Saving predictions to: {output_path}")
    output_df.to_csv(output_path, index=False)
    
    print(f"\n✓ Predictions complete!")
    print(f"  Samples: {len(predictions)}")
    print(f"  Class distribution: {pd.Series(predictions).value_counts().to_dict()}")


def main():
    parser = argparse.ArgumentParser(description='Make predictions with trained model')
    parser.add_argument('--model', required=True, help='Path to saved model (.pkl)')
    parser.add_argument('--input', required=True, help='Input CSV file')
    parser.add_argument('--output', required=True, help='Output CSV file for predictions')
    
    args = parser.parse_args()
    
    predict(args.model, args.input, args.output)


if __name__ == '__main__':
    main()
```

---

## PHASE 8: Documentation & Knowledge Transfer (30-60 minutes)

### Step 8.1.0: Update Project README

**📄 File**: `README.md` (Update with complete information)

```markdown
# Machine Learning Project

**Problem**: [Brief description of the ML problem]  
**Solution**: [ML approach taken]  
**Status**: Production-ready  
**Last Updated**: [Date]

---

## Quick Start

```bash
# 1. Clone repository
git clone <repo-url>
cd project-name

# 2. Setup environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# 3. Train model
python scripts/train.py

# 4. Make predictions
python scripts/predict.py --model models/best_model.pkl --input data.csv --output predictions.csv
```

---

## Project Structure

```
project/
├── data/                  # Data files (gitignored)
│   ├── raw/              # Original data
│   └── processed/        # Transformed data
├── src/                   # Source code
│   ├── data/             # Data loading & validation
│   ├── preprocessing/    # Feature engineering
│   ├── models/           # Model training & evaluation
│   └── utils/            # Utilities
├── config/                # Configuration files
├── notebooks/             # Jupyter notebooks
├── scripts/               # Executable scripts
│   ├── train.py          # Training script
│   └── predict.py        # Inference script
├── models/                # Saved models
├── outputs/               # Results & reports
└── tests/                 # Unit tests
```

---

## Data

**Source**: [Data source]  
**Size**: [Number of samples and features]  
**Target**: [Target variable description]

See `docs/data.md` for detailed schema documentation.

---

## Model

**Type**: [Model algorithm]  
**Performance**: F1 = [score] on test set  
**Features**: [Number] features after engineering

See `models/*_model_card.md` for detailed model documentation.

---

## Usage

### Training
```bash
python scripts/train.py \
  --config config/model_config.yaml \
  --output-dir outputs/
```

### Prediction
```bash
python scripts/predict.py \
  --model models/xgboost_20250115_120000.pkl \
  --input new_data.csv \
  --output predictions.csv
```

### Running Tests
```bash
pytest tests/
```

---

## Development

### Adding New Features
1. Update `config/preprocessing_config.yaml`
2. Modify `src/preprocessing/preprocessor.py`
3. Add tests in `tests/test_preprocessor.py`
4. Retrain model

### Code Style
- Follow PEP 8
- Use type hints
- Write docstrings
- Keep functions focused

---

## Monitoring

Track these metrics in production:
- Prediction distribution
- Feature distributions (data drift)
- Model performance metrics
- Inference latency

Retrain when:
- Performance drops >5%
- Significant data drift detected
- New data patterns emerge

---

## License

[Your License]

---

## Contact

**Maintainer**: [Name]  
**Email**: [Email]  
**Repository**: [URL]
```

---

### Step 8.2.0-8.3.0: Create Documentation

All documentation has been created throughout the phases:
- ✅ Data documentation: `outputs/data_profile.json`, `outputs/data_quality_dashboard.png`
- ✅ Model documentation: `models/*_model_card.md`
- ✅ EDA insights: `outputs/eda_insights.md`
- ✅ Error analysis: `outputs/error_analysis_insights.md`

---

## Phases 6-8 Complete! 🎉

**Total Accomplishments**:
- ✅ Complete evaluation framework
- ✅ Production-ready pipeline
- ✅ Training and inference scripts
- ✅ Comprehensive documentation
- ✅ Model cards and metadata

**Final Verification**:
```bash
# Run complete pipeline
$ python scripts/train.py

# Test inference
$ python scripts/predict.py --model models/latest.pkl --input test.csv --output pred.csv

# Run all tests
$ pytest tests/ -v

# Check documentation
$ ls -R docs/ outputs/ models/
```

---

**END OF EDA-MLP DETAILED IMPLEMENTATION GUIDE**

---

### 01

```
refer to `eda-mlp-detailed-implementation-steps-phase-0.md`, adhere to universal, neutrality, project-agnostic pattern guidelines, generate `eda-mlp-detailed-implementation-steps.md` max Level of Detail (LOD) implementation step companion for `eda-mlp-implementation-guidelines.md` ; create separate artifacts per phase;
example
```
| **0.2.0** | **Create project structure** | Separation of concerns, module organization, professional layout | Organized repository matching required structure | ✅ DO: Create folders: src/ for code modules, results/ for outputs, tests/ for unit tests. Use descriptive module names: data_loader.py, preprocessing.py, models.py, evaluation.py, business_impact.py, hypothesis_tester.py<br>❌ DON'T: Put all code in one file, use vague names like utils.py or helpers.py | 🟢 |
```
contains detailed implementation step:
```
**Step 0.2.0**: Create project structure:
```
Repository root:
├── data/ (local only, in .gitignore)
│   └── phishing.db
├── src/
│   ├── data_loader.py
│   ├── eda_utils.py (for Task 1)
│   ├── preprocessing.py
│   ├── models.py
│   └── evaluation.py
├── eda.ipynb
├── README.md
├── requirements.txt
└── run.sh
```
> scaffold entire tree in one compact shell command using `mkdir -p` and `touch`; at `github % `:
```bash
mkdir -p aiap22/{data,src} && touch aiap22/data/phishing.db aiap22/src/{data_loader.py,eda_utils.py,preprocessing.py,models.py,evaluation.py} aiap22/{eda.ipynb,README.md,requirements.txt,run.sh} && echo "data/" > aiap22/.gitignore
```
```

### 02

```
Create a summary index document linking all phase artifacts
```

### 03

```
generate max LOD mermaid.js for "detailed implementation steps for each phase of the EDA-MLP guide",
* Parent Node: Step
* Node: Sub-step
* Edge: Workflow
* Subgraph: Phase
```
