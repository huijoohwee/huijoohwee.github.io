---
title: "eda-mlp-implementation-guidelines"
author: "joohwee"
tags: [EDA, MLP, Test]
date: 2026-01-13
mermaidAnchorsOnly: true
mermaid: |
  graph TB
    Start([Project Initiation]) -->|initializes| Setup

    subgraph Phase0["PHASE 0: SETUP & DATA ACQUISITION"]
        Setup[Environment Setup]
        Database[SQLite Database]
        ProjectStructure[Project Structure]
        DataLoader[Data Loader Module]
        Dependencies[Python Dependencies]
        ExecutionScript[Execution Script]
        
        Setup -->|downloads| Database
        Setup -->|creates| ProjectStructure
        ProjectStructure -->|organizes| DataLoader
        ProjectStructure -->|defines| Dependencies
        Dependencies -->|enables| DataLoader
        DataLoader -->|connects_to| Database
        DataLoader -->|validates| Schema[Schema Contract]
        DataLoader -->|checks| RowCount[Row Count]
        DataLoader -->|parses| TargetVariable[Target Variable]
        ExecutionScript -->|orchestrates| DataLoader
        ExecutionScript -->|verifies| ProjectStructure
    end

    subgraph Phase1["PHASE 1: ENVIRONMENT SETUP & CONFIGURATION"]
        VirtualEnv[Virtual Environment]
        ConfigFiles[Configuration Files]
        DataConfig[Data Configuration]
        ModelConfig[Model Configuration]
        PreprocessConfig[Preprocessing Configuration]
        ValidationConfig[Validation Configuration]
        JupyterEnv[Jupyter Environment]
        UtilityModules[Utility Modules]
        ConfigLoader[Config Loader]
        Logger[Logger]
        
        VirtualEnv -->|isolates| Dependencies
        VirtualEnv -->|activates| PythonPackages[Python Packages]
        PythonPackages -->|installs| Requirements[Requirements List]
        ConfigFiles -->|defines| DataConfig
        ConfigFiles -->|specifies| ModelConfig
        ConfigFiles -->|configures| PreprocessConfig
        ConfigFiles -->|establishes| ValidationConfig
        JupyterEnv -->|provides| NotebookTemplate[Notebook Template]
        UtilityModules -->|implements| ConfigLoader
        UtilityModules -->|implements| Logger
        ConfigLoader -->|reads| ConfigFiles
        Logger -->|tracks| ExecutionLogs[Execution Logs]
    end

    subgraph Phase2["PHASE 2: DATA LOADING & INITIAL VALIDATION"]
        DataLoadingModule[Data Loading Module]
        FormatDetector[Format Detector]
        GenericLoader[Generic Loader]
        DataValidator[Data Validator]
        SchemaValidator[Schema Validator]
        NullChecker[Null Value Checker]
        DuplicateDetector[Duplicate Detector]
        RangeValidator[Range Validator]
        CategoricalValidator[Categorical Validator]
        DataProfile[Data Profile]
        QualityReport[Quality Report]
        
        DataLoadingModule -->|detects| FileFormat[File Format]
        FormatDetector -->|identifies| FileFormat
        GenericLoader -->|loads| RawData[Raw Data]
        GenericLoader -->|handles| Compression[Compression]
        RawData -->|validates_against| Schema
        DataValidator -->|performs| SchemaValidator
        DataValidator -->|executes| NullChecker
        DataValidator -->|runs| DuplicateDetector
        DataValidator -->|applies| RangeValidator
        DataValidator -->|checks| CategoricalValidator
        SchemaValidator -->|verifies| ColumnTypes[Column Types]
        NullChecker -->|detects| MissingValues[Missing Values]
        DuplicateDetector -->|finds| DuplicateRows[Duplicate Rows]
        RangeValidator -->|validates| NumericRanges[Numeric Ranges]
        CategoricalValidator -->|verifies| CategoryValues[Category Values]
        DataValidator -->|generates| DataProfile
        DataProfile -->|produces| QualityReport
        QualityReport -->|visualizes| QualityDashboard[Quality Dashboard]
    end

    subgraph Phase3["PHASE 3: EXPLORATORY DATA ANALYSIS"]
        UnivariateAnalysis[Univariate Analysis]
        BivariateAnalysis[Bivariate Analysis]
        MultivariateAnalysis[Multivariate Analysis]
        TemporalAnalysis[Temporal Analysis]
        SegmentAnalysis[Segment Analysis]
        
        UnivariateAnalysis -->|plots| NumericDistributions[Numeric Distributions]
        UnivariateAnalysis -->|calculates| SummaryStatistics[Summary Statistics]
        UnivariateAnalysis -->|analyzes| CategoricalDistributions[Categorical Distributions]
        UnivariateAnalysis -->|identifies| Outliers[Outliers]
        UnivariateAnalysis -->|documents| DistributionCharacteristics[Distribution Characteristics]
        
        BivariateAnalysis -->|computes| CorrelationMatrix[Correlation Matrix]
        BivariateAnalysis -->|visualizes| CorrelationHeatmap[Correlation Heatmap]
        BivariateAnalysis -->|examines| FeatureTargetRelationships[Feature-Target Relationships]
        BivariateAnalysis -->|creates| PairPlots[Pair Plots]
        BivariateAnalysis -->|performs| StatisticalTests[Statistical Tests]
        
        MultivariateAnalysis -->|applies| PCA[Principal Component Analysis]
        MultivariateAnalysis -->|performs| ClusterAnalysis[Cluster Analysis]
        MultivariateAnalysis -->|explores| InteractionFeatures[Interaction Features]
        PCA -->|reduces| Dimensionality[Dimensionality]
        PCA -->|visualizes| ComponentSpace[Component Space]
        ClusterAnalysis -->|identifies| DataClusters[Data Clusters]
        ClusterAnalysis -->|profiles| ClusterCharacteristics[Cluster Characteristics]
        
        TemporalAnalysis -->|plots| TimeSeries[Time Series]
        TemporalAnalysis -->|detects| Seasonality[Seasonality]
        TemporalAnalysis -->|identifies| Trends[Trends]
        
        SegmentAnalysis -->|creates| SegmentProfiles[Segment Profiles]
        SegmentAnalysis -->|compares| SegmentStatistics[Segment Statistics]
        
        UnivariateAnalysis -->|informs| DataQualityIssues[Data Quality Issues]
        BivariateAnalysis -->|reveals| FeatureRelationships[Feature Relationships]
        MultivariateAnalysis -->|discovers| ComplexPatterns[Complex Patterns]
        DataQualityIssues -->|guides| PreprocessingRecommendations[Preprocessing Recommendations]
        FeatureRelationships -->|suggests| FeatureEngineeringIdeas[Feature Engineering Ideas]
        ComplexPatterns -->|influences| ModelingStrategy[Modeling Strategy]
    end

    subgraph Phase4["PHASE 4: FEATURE ENGINEERING & PREPROCESSING"]
        PreprocessingModule[Preprocessing Module]
        BaseTransformer[Base Transformer]
        MissingValueImputer[Missing Value Imputer]
        FeatureScaler[Feature Scaler]
        CategoricalEncoder[Categorical Encoder]
        FeatureEngineer[Feature Engineer]
        PreprocessingPipeline[Preprocessing Pipeline]
        
        PreprocessingModule -->|defines| BaseTransformer
        BaseTransformer -->|extends_to| MissingValueImputer
        BaseTransformer -->|extends_to| FeatureScaler
        BaseTransformer -->|extends_to| CategoricalEncoder
        BaseTransformer -->|extends_to| FeatureEngineer
        
        MissingValueImputer -->|imputes| MissingValues
        MissingValueImputer -->|creates| MissingIndicators[Missing Indicators]
        MissingValueImputer -->|learns| ImputationValues[Imputation Values]
        
        FeatureScaler -->|scales| NumericFeatures[Numeric Features]
        FeatureScaler -->|learns| ScalingParameters[Scaling Parameters]
        FeatureScaler -->|applies| StandardScaling[Standard Scaling]
        FeatureScaler -->|applies| RobustScaling[Robust Scaling]
        FeatureScaler -->|applies| MinMaxScaling[MinMax Scaling]
        
        CategoricalEncoder -->|encodes| CategoricalFeatures[Categorical Features]
        CategoricalEncoder -->|applies| OneHotEncoding[One-Hot Encoding]
        CategoricalEncoder -->|applies| OrdinalEncoding[Ordinal Encoding]
        CategoricalEncoder -->|applies| TargetEncoding[Target Encoding]
        CategoricalEncoder -->|groups| RareCategories[Rare Categories]
        
        FeatureEngineer -->|creates| PolynomialFeatures[Polynomial Features]
        FeatureEngineer -->|creates| InteractionTerms[Interaction Terms]
        FeatureEngineer -->|applies| LogTransform[Log Transform]
        FeatureEngineer -->|applies| SqrtTransform[Sqrt Transform]
        FeatureEngineer -->|creates| BinnedFeatures[Binned Features]
        FeatureEngineer -->|generates| AggregationFeatures[Aggregation Features]
        FeatureEngineer -->|extracts| DatetimeFeatures[Datetime Features]
        
        PreprocessingPipeline -->|assembles| MissingValueImputer
        PreprocessingPipeline -->|assembles| FeatureEngineer
        PreprocessingPipeline -->|assembles| CategoricalEncoder
        PreprocessingPipeline -->|assembles| FeatureScaler
        PreprocessingPipeline -->|orders| TransformationSequence[Transformation Sequence]
        PreprocessingPipeline -->|serializes_to| PipelineArtifact[Pipeline Artifact]
        PreprocessingPipeline -->|validates| TransformedData[Transformed Data]
        TransformedData -->|feeds_into| ModelTraining[Model Training]
    end

    subgraph Phase5["PHASE 5: MODEL DEVELOPMENT & TRAINING"]
        ModelFactory[Model Factory]
        ModelRegistry[Model Registry]
        BaselineModel[Baseline Model]
        ModelTrainer[Model Trainer]
        CrossValidation[Cross-Validation]
        EarlyStopping[Early Stopping]
        ModelEvaluator[Model Evaluator]
        MetricCalculator[Metric Calculator]
        ConfusionMatrix[Confusion Matrix]
        ROCCurve[ROC Curve]
        PrecisionRecallCurve[Precision-Recall Curve]
        FeatureImportance[Feature Importance]
        HyperparameterTuner[Hyperparameter Tuner]
        ModelSerializer[Model Serializer]
        
        ModelFactory -->|creates| ModelInstances[Model Instances]
        ModelFactory -->|uses| ModelRegistry
        ModelRegistry -->|catalogs| AvailableModels[Available Models]
        ModelRegistry -->|provides| LogisticRegression[Logistic Regression]
        ModelRegistry -->|provides| RandomForest[Random Forest]
        ModelRegistry -->|provides| XGBoost[XGBoost]
        ModelRegistry -->|provides| GradientBoosting[Gradient Boosting]
        
        BaselineModel -->|establishes| PerformanceFloor[Performance Floor]
        BaselineModel -->|trains_on| TrainingData[Training Data]
        BaselineModel -->|evaluates_on| TestData[Test Data]
        
        ModelTrainer -->|implements| CrossValidation
        ModelTrainer -->|applies| EarlyStopping
        ModelTrainer -->|sets| RandomSeeds[Random Seeds]
        CrossValidation -->|performs| StratifiedKFold[Stratified K-Fold]
        CrossValidation -->|computes| CVScores[CV Scores]
        EarlyStopping -->|monitors| ValidationMetric[Validation Metric]
        EarlyStopping -->|prevents| Overfitting[Overfitting]
        
        ModelEvaluator -->|implements| MetricCalculator
        MetricCalculator -->|computes| Accuracy[Accuracy]
        MetricCalculator -->|computes| Precision[Precision]
        MetricCalculator -->|computes| Recall[Recall]
        MetricCalculator -->|computes| F1Score[F1 Score]
        MetricCalculator -->|computes| ROCAUC[ROC-AUC]
        
        ModelEvaluator -->|generates| ConfusionMatrix
        ModelEvaluator -->|plots| ROCCurve
        ModelEvaluator -->|plots| PrecisionRecallCurve
        ModelEvaluator -->|extracts| FeatureImportance
        
        HyperparameterTuner -->|defines| SearchSpace[Search Space]
        HyperparameterTuner -->|performs| GridSearch[Grid Search]
        HyperparameterTuner -->|performs| RandomSearch[Random Search]
        HyperparameterTuner -->|optimizes| Hyperparameters[Hyperparameters]
        HyperparameterTuner -->|selects| BestParameters[Best Parameters]
        
        ModelInstances -->|trains_with| ModelTrainer
        ModelTrainer -->|evaluates_with| ModelEvaluator
        ModelEvaluator -->|identifies| BestModel[Best Model]
        BestModel -->|tunes_with| HyperparameterTuner
        HyperparameterTuner -->|produces| OptimizedModel[Optimized Model]
        
        ModelSerializer -->|saves| OptimizedModel
        ModelSerializer -->|creates| ModelArtifacts[Model Artifacts]
        ModelSerializer -->|generates| ModelCard[Model Card]
        ModelArtifacts -->|includes| ModelFile[Model File]
        ModelArtifacts -->|includes| FeatureNames[Feature Names]
        ModelArtifacts -->|includes| ModelMetadata[Model Metadata]
    end

    subgraph Phase6["PHASE 6: MODEL EVALUATION & ANALYSIS"]
        TestSetEvaluation[Test Set Evaluation]
        ErrorAnalysis[Error Analysis]
        FeatureImportanceAnalysis[Feature Importance Analysis]
        ModelDiagnostics[Model Diagnostics]
        EvaluationReport[Evaluation Report]
        
        TestSetEvaluation -->|loads| TestData
        TestSetEvaluation -->|applies| PreprocessingPipeline
        TestSetEvaluation -->|generates| Predictions[Predictions]
        TestSetEvaluation -->|calculates| TestMetrics[Test Metrics]
        TestSetEvaluation -->|compares_to| ValidationMetrics[Validation Metrics]
        TestMetrics -->|assesses| GeneralizationGap[Generalization Gap]
        
        ErrorAnalysis -->|identifies| ErrorPatterns[Error Patterns]
        ErrorAnalysis -->|analyzes| PredictionConfidence[Prediction Confidence]
        ErrorAnalysis -->|categorizes| FalsePositives[False Positives]
        ErrorAnalysis -->|categorizes| FalseNegatives[False Negatives]
        ErrorAnalysis -->|visualizes| ErrorDistribution[Error Distribution]
        ErrorAnalysis -->|documents| ErrorInsights[Error Insights]
        
        FeatureImportanceAnalysis -->|extracts| ModelImportances[Model Importances]
        FeatureImportanceAnalysis -->|calculates| PermutationImportance[Permutation Importance]
        FeatureImportanceAnalysis -->|computes| SHAPValues[SHAP Values]
        FeatureImportanceAnalysis -->|visualizes| ImportancePlots[Importance Plots]
        FeatureImportanceAnalysis -->|documents| FeatureInsights[Feature Insights]
        
        ModelDiagnostics -->|checks| Calibration[Calibration]
        ModelDiagnostics -->|analyzes| PredictionDistribution[Prediction Distribution]
        ModelDiagnostics -->|tests_on| DataSlices[Data Slices]
        ModelDiagnostics -->|identifies| Biases[Biases]
        ModelDiagnostics -->|documents| DiagnosticFindings[Diagnostic Findings]
        
        EvaluationReport -->|aggregates| TestMetrics
        EvaluationReport -->|includes| ErrorInsights
        EvaluationReport -->|includes| FeatureInsights
        EvaluationReport -->|includes| DiagnosticFindings
        EvaluationReport -->|provides| DeploymentRecommendations[Deployment Recommendations]
        EvaluationReport -->|documents| ModelLimitations[Model Limitations]
    end

    subgraph Phase7["PHASE 7: PIPELINE PRODUCTIONIZATION"]
        CodeExtraction[Code Extraction]
        PipelineOrchestration[Pipeline Orchestration]
        TrainingScript[Training Script]
        InferenceScript[Inference Script]
        TestingSuite[Testing Suite]
        MonitoringHooks[Monitoring Hooks]
        DeploymentPackage[Deployment Package]
        
        CodeExtraction -->|identifies| ReusableComponents[Reusable Components]
        CodeExtraction -->|refactors_into| Functions[Functions]
        CodeExtraction -->|organizes_into| Modules[Modules]
        ReusableComponents -->|extracts_from| Notebooks[Notebooks]
        Functions -->|groups_into| Modules
        
        PipelineOrchestration -->|defines| PipelineStages[Pipeline Stages]
        PipelineOrchestration -->|implements| StageOrchestration[Stage Orchestration]
        PipelineOrchestration -->|adds| PipelineConfiguration[Pipeline Configuration]
        PipelineOrchestration -->|implements| PipelineLogging[Pipeline Logging]
        PipelineOrchestration -->|adds| ErrorHandling[Error Handling]
        PipelineStages -->|sequences| LoadStage[Load Stage]
        PipelineStages -->|sequences| ValidateStage[Validate Stage]
        PipelineStages -->|sequences| PreprocessStage[Preprocess Stage]
        PipelineStages -->|sequences| TrainStage[Train Stage]
        PipelineStages -->|sequences| EvaluateStage[Evaluate Stage]
        
        TrainingScript -->|implements| CLIArguments[CLI Arguments]
        TrainingScript -->|orchestrates| TrainingWorkflow[Training Workflow]
        TrainingScript -->|saves| Checkpoints[Checkpoints]
        TrainingScript -->|documents| TrainingProcess[Training Process]
        
        InferenceScript -->|loads| ModelArtifacts
        InferenceScript -->|validates| InputData[Input Data]
        InferenceScript -->|implements| BatchPrediction[Batch Prediction]
        InferenceScript -->|formats| PredictionOutput[Prediction Output]
        InferenceScript -->|documents| InferenceProcess[Inference Process]
        
        TestingSuite -->|implements| UnitTests[Unit Tests]
        TestingSuite -->|implements| IntegrationTests[Integration Tests]
        TestingSuite -->|implements| PipelineTests[Pipeline Tests]
        TestingSuite -->|validates| DataValidationTests[Data Validation Tests]
        TestingSuite -->|creates| TestFixtures[Test Fixtures]
        UnitTests -->|tests| IndividualFunctions[Individual Functions]
        IntegrationTests -->|tests| ComponentInteractions[Component Interactions]
        PipelineTests -->|tests| EndToEndPipeline[End-to-End Pipeline]
        
        MonitoringHooks -->|collects| PerformanceMetrics[Performance Metrics]
        MonitoringHooks -->|detects| DataDrift[Data Drift]
        MonitoringHooks -->|monitors| ModelPerformance[Model Performance]
        MonitoringHooks -->|tracks| PredictionLatency[Prediction Latency]
        
        DeploymentPackage -->|creates| SetupFile[Setup File]
        DeploymentPackage -->|builds| DockerImage[Docker Image]
        DeploymentPackage -->|includes| DeploymentDocs[Deployment Docs]
        DeploymentPackage -->|bundles| AllArtifacts[All Artifacts]
    end

    subgraph Phase8["PHASE 8: DOCUMENTATION & KNOWLEDGE TRANSFER"]
        ProjectDocumentation[Project Documentation]
        DataDocumentation[Data Documentation]
        ModelDocumentation[Model Documentation]
        APIDocumentation[API Documentation]
        ExperimentLog[Experiment Log]
        TroubleshootingGuide[Troubleshooting Guide]
        HandoffMaterials[Handoff Materials]
        
        ProjectDocumentation -->|updates| ProjectREADME[Project README]
        ProjectREADME -->|describes| ProjectPurpose[Project Purpose]
        ProjectREADME -->|documents| ProjectStructure
        ProjectREADME -->|provides| SetupInstructions[Setup Instructions]
        ProjectREADME -->|includes| UsageExamples[Usage Examples]
        ProjectREADME -->|explains| ConfigurationOptions[Configuration Options]
        
        DataDocumentation -->|documents| DataSources[Data Sources]
        DataDocumentation -->|specifies| DataSchema[Data Schema]
        DataDocumentation -->|describes| DataQualityIssues
        DataDocumentation -->|provides| DataExamples[Data Examples]
        
        ModelDocumentation -->|describes| ModelArchitecture[Model Architecture]
        ModelDocumentation -->|explains| FeatureEngineeringProcess[Feature Engineering Process]
        ModelDocumentation -->|reports| ModelPerformance
        ModelDocumentation -->|documents| ModelLimitations
        ModelDocumentation -->|defines| MonitoringPlan[Monitoring Plan]
        
        APIDocumentation -->|generates| APIReference[API Reference]
        APIDocumentation -->|provides| CodeExamples[Code Examples]
        APIDocumentation -->|documents| FunctionSignatures[Function Signatures]
        
        ExperimentLog -->|records| AllExperiments[All Experiments]
        ExperimentLog -->|documents| DecisionRationale[Decision Rationale]
        ExperimentLog -->|tracks| ModelVersions[Model Versions]
        
        TroubleshootingGuide -->|documents| CommonErrors[Common Errors]
        TroubleshootingGuide -->|provides| DebugGuidance[Debug Guidance]
        TroubleshootingGuide -->|explains| Solutions[Solutions]
        
        HandoffMaterials -->|creates| ArchitectureDiagram[Architecture Diagram]
        HandoffMaterials -->|records| WalkthroughVideo[Walkthrough Video]
        HandoffMaterials -->|prepares| HandoffMeeting[Handoff Meeting]
        HandoffMaterials -->|transfers| KnowledgeBase[Knowledge Base]
    end

    subgraph Validation["PRODUCTION-READY VALIDATION"]
        ValidationChecklist[Validation Checklist]
        CodeQuality[Code Quality]
        DataHandling[Data Handling]
        ModelQuality[Model Quality]
        TestingCoverage[Testing Coverage]
        DocumentationCompleteness[Documentation Completeness]
        DeploymentReadiness[Deployment Readiness]
        ProductionDecision{Production Ready?}
        
        ValidationChecklist -->|validates| CodeQuality
        CodeQuality -->|verifies| ConfigurationsExternalized[Configurations Externalized]
        CodeQuality -->|verifies| ModularCodeStructure[Modular Code Structure]
        CodeQuality -->|verifies| PipelineSerialized[Pipeline Serialized]
        CodeQuality -->|verifies| TypeHintsPresent[Type Hints Present]
        
        ValidationChecklist -->|validates| DataHandling
        DataHandling -->|verifies| ConfigDrivenLoading[Config-Driven Loading]
        DataHandling -->|verifies| ValidationImplemented[Validation Implemented]
        DataHandling -->|verifies| NoDataLeakage[No Data Leakage]
        
        ValidationChecklist -->|validates| ModelQuality
        ModelQuality -->|verifies| BaselineComparison[Baseline Comparison]
        ModelQuality -->|verifies| MultipleModelsEvaluated[Multiple Models Evaluated]
        ModelQuality -->|verifies| HyperparametersTuned[Hyperparameters Tuned]
        
        ValidationChecklist -->|validates| TestingCoverage
        TestingCoverage -->|verifies| UnitTestsWritten[Unit Tests Written]
        TestingCoverage -->|verifies| IntegrationTestsPass[Integration Tests Pass]
        TestingCoverage -->|verifies| HighCoverage[High Coverage]
        
        ValidationChecklist -->|validates| DocumentationCompleteness
        DocumentationCompleteness -->|verifies| READMEComplete[README Complete]
        DocumentationCompleteness -->|verifies| DataDocumented[Data Documented]
        DocumentationCompleteness -->|verifies| ModelCardCreated[Model Card Created]
        
        ValidationChecklist -->|validates| DeploymentReadiness
        DeploymentReadiness -->|verifies| TrainingScriptWorks[Training Script Works]
        DeploymentReadiness -->|verifies| InferenceScriptWorks[Inference Script Works]
        DeploymentReadiness -->|verifies| MonitoringImplemented[Monitoring Implemented]
        
        ValidationChecklist -->|evaluates| ProductionDecision
        ProductionDecision -->|approves| ProductionDeployment[Production Deployment]
        ProductionDecision -->|rejects| IterationRequired[Iteration Required]
    end

    %% Phase transitions
    DataLoader -->|provides| RawData
    RawData -->|validates_with| DataValidator
    QualityReport -->|informs| UnivariateAnalysis
    PreprocessingRecommendations -->|guides| PreprocessingModule
    FeatureEngineeringIdeas -->|inspires| FeatureEngineer
    TransformedData -->|trains| ModelInstances
    ModelArtifacts -->|evaluates_in| TestSetEvaluation
    EvaluationReport -->|informs| PipelineOrchestration
    DeploymentPackage -->|validates_with| ValidationChecklist
    ProductionDeployment -->|achieves| MLPipelineProduction[ML Pipeline in Production]
    IterationRequired -->|returns_to| UnivariateAnalysis
    
    %% Final connection
    MLPipelineProduction --> End([Production System])

    %% Styling
    classDef criticalNode fill:#ff6b6b,stroke:#c92a2a,stroke-width:3px,color:#fff
    classDef processNode fill:#339af0,stroke:#1971c2,stroke-width:2px,color:#fff
    classDef artifactNode fill:#51cf66,stroke:#2f9e44,stroke-width:2px,color:#fff
    classDef configNode fill:#ffd43b,stroke:#f08c00,stroke-width:2px
    classDef decisionNode fill:#ff8787,stroke:#e03131,stroke-width:3px,color:#fff
    
    class DataLoader,DataValidator,PreprocessingModule,ModelTrainer,ModelEvaluator,PipelineOrchestration criticalNode
    class RawData,TransformedData,ModelArtifacts,DeploymentPackage,EvaluationReport artifactNode
    class ConfigFiles,DataConfig,ModelConfig,PreprocessConfig,ValidationConfig configNode
    class ProductionDecision decisionNode
---

# EDA-MLP Pattern Guidelines: Exploratory Data Analysis to Machine Learning Pipeline

**Purpose**: Step-by-step implementation roadmap for EDA and ML pipeline development with neutral, production-ready patterns  
**Format**: Hierarchical tasks (m.n.o) with reasoning, outcomes, and excellent practices  
**Context**: From exploratory notebooks to production ML pipelines following codebase neutrality principles

---

## How to Use This Guide

**Numbering System**:
- **m**: Phase number (1-8)
- **n**: Step number within phase
- **o**: Sub-step number within step (0 = main step)

**Priority Levels**:
- 🔴 **CRITICAL**: Blocks all downstream work; must complete correctly
- 🟡 **HIGH**: Required for production; causes failures if skipped
- 🟢 **MEDIUM**: Improves quality and maintainability
- ⚪ **LOW**: Nice to have; optimize later

**Development Path**: Exploration (Notebook) → Refinement (Modular Code) → Production (Pipeline)

---

## Phase 1: Environment Setup & Configuration (15-30 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **1.0.0** | **Environment Setup & Configuration** | Establish reproducible environment with configuration-driven parameters before any analysis | Environment ready for development | Configuration-first approach prevents hardcoding | 🔴 |
| 1.1.0 | Create project structure | Organized structure separates concerns and prevents coupling | Directory structure established | **DO**: Follow standard DS project layout<br>**DON'T**: Put everything in root directory | 🔴 |
| 1.1.1 | Create directory hierarchy | Separate data, notebooks, source, configs, tests, outputs | Directories created | **DO**: `data/raw/`, `data/processed/`, `notebooks/`, `src/`, `config/`, `tests/`, `models/`, `outputs/`<br>**DON'T**: Mix code and data in same directory | 🔴 |
| 1.1.2 | Initialize version control | Track changes and enable collaboration | Git repository initialized | **DO**: `git init`, create `.gitignore` with `data/`, `*.pyc`, `.ipynb_checkpoints/`<br>**DON'T**: Commit large datasets or model files | 🔴 |
| 1.1.3 | Create README | Document project purpose and setup | README.md present | **DO**: Include problem statement, data sources, setup instructions<br>**DON'T**: Leave README empty | 🟡 |
| 1.2.0 | Set up virtual environment | Isolate dependencies and ensure reproducibility | Virtual environment active | **DO**: `python -m venv venv` or `conda create -n project_name`<br>**DON'T**: Install packages globally | 🔴 |
| 1.2.1 | Activate environment | Enable isolated dependency management | Environment activated | **DO**: `source venv/bin/activate` (Linux/Mac) or `venv\Scripts\activate` (Windows)<br>**DON'T**: Skip activation step | 🔴 |
| 1.2.2 | Create requirements file | Document dependencies for reproducibility | requirements.txt created | **DO**: Include version pins: `pandas==1.5.3`, `scikit-learn==1.3.0`<br>**DON'T**: Use unpinned versions: `pandas` | 🔴 |
| 1.2.3 | Install dependencies | Set up required libraries | Dependencies installed | **DO**: `pip install -r requirements.txt`<br>**DON'T**: Install packages one-by-one without documenting | 🔴 |
| 1.3.0 | Create configuration files | Externalize all parameters for neutrality | Config files created | **DO**: Use YAML/JSON for configs<br>**DON'T**: Hardcode parameters in code | 🔴 |
| 1.3.1 | Create data configuration | Define data sources, paths, schema expectations | `config/data_config.yaml` created | **DO**: `data_sources: {train: "data/raw/train.csv", test: "data/raw/test.csv"}`<br>**DON'T**: Hardcode paths in notebooks | 🔴 |
| 1.3.2 | Create model configuration | Define model hyperparameters, architecture | `config/model_config.yaml` created | **DO**: `model: {type: "random_forest", n_estimators: 100, max_depth: 10}`<br>**DON'T**: Embed hyperparameters in training code | 🔴 |
| 1.3.3 | Create preprocessing configuration | Define feature engineering, scaling, encoding | `config/preprocessing_config.yaml` created | **DO**: `preprocessing: {scaling: "standard", categorical_encoding: "onehot"}`<br>**DON'T**: Hardcode preprocessing steps | 🔴 |
| 1.3.4 | Create validation configuration | Define train/test splits, CV strategy, metrics | `config/validation_config.yaml` created | **DO**: `validation: {test_size: 0.2, cv_folds: 5, metrics: ["accuracy", "f1"]}`<br>**DON'T**: Use magic numbers for splits | 🔴 |
| 1.4.0 | Set up Jupyter environment | Configure notebooks for clean execution | Jupyter configured | **DO**: Install extensions: `jupyterlab`, `ipywidgets`<br>**DON'T**: Use default Jupyter without configuration | 🟡 |
| 1.4.1 | Create notebook template | Standardize notebook structure | Template notebook created | **DO**: Sections: Setup, Config, Load Data, EDA, Modeling, Results<br>**DON'T**: Create unstructured notebooks | 🟡 |
| 1.4.2 | Configure notebook metadata | Set kernel, execution settings | Notebook metadata configured | **DO**: Specify kernel name: `"kernelspec": {"name": "project_venv"}`<br>**DON'T**: Use system Python kernel | 🟡 |
| 1.5.0 | Create utility modules | Build reusable functions for common tasks | Utility modules created | **DO**: `src/utils/config_loader.py`, `src/utils/data_loader.py`<br>**DON'T**: Duplicate code across notebooks | 🟡 |
| 1.5.1 | Create config loader | Build configuration loading utility | Config loader implemented | **DO**: `def load_config(config_path): return yaml.safe_load(open(config_path))`<br>**DON'T**: Parse YAML manually in each notebook | 🟡 |
| 1.5.2 | Create logging setup | Configure structured logging | Logging configured | **DO**: Use `logging` module with file and console handlers<br>**DON'T**: Use print statements for production code | 🟢 |

---

## Phase 2: Data Loading & Initial Validation (20-40 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **2.0.0** | **Data Loading & Initial Validation** | Load data with validation to catch issues early before investing in analysis | Data loaded and validated | Fail fast on data issues | 🔴 |
| 2.1.0 | Create data loading module | Centralize data loading logic for reusability | `src/data/data_loader.py` created | **DO**: Configuration-driven loading<br>**DON'T**: Hardcode data paths in loading code | 🔴 |
| 2.1.1 | Stub data loader functions | Define interfaces before implementation | Function signatures defined | **DO**: `def load_data(config: dict) -> pd.DataFrame:`<br>**DON'T**: Skip type hints | 🔴 |
| 2.1.2 | Implement file format detection | Auto-detect CSV, Excel, Parquet, JSON formats | Format detection working | **DO**: Check file extension: `.csv`, `.xlsx`, `.parquet`, `.json`<br>**DON'T**: Assume single format | 🟡 |
| 2.1.3 | Implement generic loader | Build format-agnostic loading function | Generic loader working | **DO**: `if ext == '.csv': pd.read_csv() elif ext == '.parquet': pd.read_parquet()`<br>**DON'T**: Create separate loader for each format | 🔴 |
| 2.1.4 | Add compression handling | Support gzip, zip, bz2 compressed files | Compression support added | **DO**: Use pandas compression parameter: `compression='infer'`<br>**DON'T**: Manually decompress files | 🟢 |
| 2.2.0 | Create data validation module | Build schema and quality validation functions | `src/data/data_validator.py` created | **DO**: Configuration-driven validation<br>**DON'T**: Hardcode expected schemas | 🔴 |
| 2.2.1 | Implement schema validation | Check columns, dtypes match expected schema | Schema validator implemented | **DO**: Compare `df.dtypes` against `config['expected_schema']`<br>**DON'T**: Assume schema without validation | 🔴 |
| 2.2.2 | Implement null value check | Identify and report missing data | Null checker implemented | **DO**: `df.isnull().sum()` and compare to `config['max_null_pct']`<br>**DON'T**: Silently ignore missing data | 🔴 |
| 2.2.3 | Implement duplicate detection | Find duplicate rows based on key columns | Duplicate detector implemented | **DO**: `df.duplicated(subset=config['key_columns'])`<br>**DON'T**: Check only on all columns | 🟡 |
| 2.2.4 | Implement data range validation | Check numeric columns within expected ranges | Range validator implemented | **DO**: For each numeric col: `(df[col] < min) \| (df[col] > max)`<br>**DON'T**: Skip outlier detection at loading stage | 🟡 |
| 2.2.5 | Implement categorical value validation | Check categorical columns have expected values | Categorical validator implemented | **DO**: `unexpected = set(df[col].unique()) - set(config['valid_values'])`<br>**DON'T**: Allow arbitrary categorical values | 🟡 |
| 2.3.0 | Create data profiling notebook | Build initial EDA notebook with profiling | `notebooks/01_data_profiling.ipynb` created | **DO**: Use notebook for exploration, not production code<br>**DON'T**: Put business logic in notebooks | 🔴 |
| 2.3.1 | Load configuration in notebook | Read configs at notebook start | Config loaded in notebook | **DO**: `config = load_config('config/data_config.yaml')`<br>**DON'T**: Hardcode parameters in notebook cells | 🔴 |
| 2.3.2 | Load and validate data | Use loader and validator modules | Data loaded and validated | **DO**: `df = load_data(config); validate_data(df, config)`<br>**DON'T**: Inline loading and validation code | 🔴 |
| 2.3.3 | Generate data profile report | Create comprehensive data summary | Profile report generated | **DO**: Use `pandas-profiling` or manual: `df.info()`, `df.describe()`<br>**DON'T**: Skip data profiling step | 🔴 |
| 2.3.4 | Document data characteristics | Record findings about data quality and structure | Data characteristics documented | **DO**: Markdown cells: "Dataset has X rows, Y features, Z% missing in column A"<br>**DON'T**: Leave observations uncommented | 🟡 |
| 2.4.0 | Create data quality report | Generate structured report of validation results | Quality report generated | **DO**: Save to `outputs/data_quality_report.json`<br>**DON'T**: Keep validation results only in memory | 🟡 |
| 2.4.1 | Save validation metrics | Record all validation checks and results | Validation metrics saved | **DO**: `{"schema_valid": True, "null_pct": 0.05, "duplicates": 12}`<br>**DON'T**: Lose validation information | 🟡 |
| 2.4.2 | Generate visualization dashboard | Create plots showing data quality metrics | Quality dashboard created | **DO**: Missing data heatmap, distribution plots, correlation matrix<br>**DON'T**: Skip visual validation | 🟢 |

---

## Phase 3: Exploratory Data Analysis (60-120 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **3.0.0** | **Exploratory Data Analysis** | Understand data characteristics, relationships, and patterns before modeling | EDA complete with documented insights | EDA informs feature engineering and modeling choices | 🔴 |
| 3.1.0 | Analyze univariate distributions | Understand individual feature characteristics | Univariate analysis complete | **DO**: Separate analysis for numeric vs categorical<br>**DON'T**: Analyze all features the same way | 🔴 |
| 3.1.1 | Plot numeric distributions | Visualize histograms, box plots, density plots | Numeric distributions plotted | **DO**: `df[numeric_cols].hist(figsize=(15,10))`<br>**DON'T**: Skip distribution analysis | 🔴 |
| 3.1.2 | Calculate summary statistics | Compute mean, median, std, quartiles, skewness | Summary stats calculated | **DO**: `df[numeric_cols].describe()`, `.skew()`, `.kurtosis()`<br>**DON'T**: Only look at mean | 🔴 |
| 3.1.3 | Analyze categorical distributions | Visualize value counts, frequency distributions | Categorical distributions analyzed | **DO**: `df[cat_cols].value_counts().plot(kind='bar')`<br>**DON'T**: Ignore class imbalance | 🔴 |
| 3.1.4 | Identify outliers | Detect extreme values using statistical methods | Outliers identified | **DO**: IQR method, z-score, visualization<br>**DON'T**: Remove outliers without investigation | 🟡 |
| 3.1.5 | Document distribution characteristics | Record skewness, modality, outliers per feature | Characteristics documented | **DO**: Markdown: "Feature X is right-skewed, has 5% outliers beyond 3σ"<br>**DON'T**: Skip documentation | 🟡 |
| 3.2.0 | Analyze bivariate relationships | Understand feature interactions and target relationships | Bivariate analysis complete | **DO**: Focus on relationships with target variable<br>**DON'T**: Analyze every pair exhaustively | 🔴 |
| 3.2.1 | Calculate correlation matrix | Compute pairwise correlations | Correlation matrix generated | **DO**: `df.corr(method='pearson')` for numeric, Cramér's V for categorical<br>**DON'T**: Only use Pearson correlation | 🔴 |
| 3.2.2 | Visualize correlation heatmap | Create visual correlation representation | Heatmap created | **DO**: `sns.heatmap(corr_matrix, annot=True, cmap='coolwarm')`<br>**DON'T**: Skip visualization | 🔴 |
| 3.2.3 | Analyze feature-target relationships | Identify predictive features | Target relationships analyzed | **DO**: For classification: boxplots by class; for regression: scatter plots<br>**DON'T**: Model without understanding predictive features | 🔴 |
| 3.2.4 | Create pair plots for key features | Visualize multi-dimensional relationships | Pair plots created | **DO**: `sns.pairplot(df[key_features + [target]], hue=target)`<br>**DON'T**: Include all features (too crowded) | 🟡 |
| 3.2.5 | Test statistical relationships | Perform hypothesis tests for relationships | Statistical tests performed | **DO**: Chi-square for categorical, t-test/ANOVA for numeric-categorical<br>**DON'T**: Assume relationships without testing | 🟢 |
| 3.3.0 | Analyze multivariate patterns | Understand complex interactions | Multivariate analysis complete | **DO**: Use dimensionality reduction for visualization<br>**DON'T**: Skip high-dimensional analysis | 🟡 |
| 3.3.1 | Apply PCA for visualization | Reduce dimensions for 2D/3D plotting | PCA visualization created | **DO**: `PCA(n_components=2).fit_transform()` then scatter plot<br>**DON'T**: Interpret PCA components as original features | 🟡 |
| 3.3.2 | Cluster analysis | Identify natural groupings in data | Clusters identified | **DO**: K-means or hierarchical clustering on scaled data<br>**DON'T**: Force clustering on unclustered data | 🟢 |
| 3.3.3 | Interaction feature exploration | Test multiplicative/polynomial feature combinations | Interactions explored | **DO**: Create `df['feature1_x_feature2']` for promising pairs<br>**DON'T**: Create all possible interactions | 🟢 |
| 3.4.0 | Analyze temporal patterns (if applicable) | Understand time-based trends and seasonality | Temporal analysis complete | **DO**: Time series plots, autocorrelation, seasonal decomposition<br>**DON'T**: Ignore temporal ordering | 🟡 |
| 3.4.1 | Plot time series | Visualize trends over time | Time series plotted | **DO**: `df.set_index('date')[numeric_cols].plot()`<br>**DON'T**: Treat temporal data as cross-sectional | 🟡 |
| 3.4.2 | Detect seasonality | Identify periodic patterns | Seasonality detected | **DO**: `seasonal_decompose()` or FFT analysis<br>**DON'T**: Miss important seasonal patterns | 🟢 |
| 3.4.3 | Check for trends | Identify long-term directional changes | Trends identified | **DO**: Moving averages, linear regression trend lines<br>**DON'T**: Assume stationarity without checking | 🟢 |
| 3.5.0 | Segment analysis | Analyze subgroups separately | Segment analysis complete | **DO**: Group by categorical features, analyze separately<br>**DON'T**: Assume homogeneous population | 🟢 |
| 3.5.1 | Create segment profiles | Characterize each subgroup | Segment profiles created | **DO**: `df.groupby('segment')[features].describe()`<br>**DON'T**: Ignore segment differences | 🟢 |
| 3.5.2 | Compare segments statistically | Test for significant differences | Segment comparisons performed | **DO**: ANOVA, Chi-square tests between segments<br>**DON'T**: Assume differences are significant | 🟢 |
| 3.6.0 | Document EDA insights | Summarize findings and implications | EDA insights documented | **DO**: Markdown summary: key findings, data issues, modeling implications<br>**DON'T**: Jump to modeling without documentation | 🔴 |
| 3.6.1 | List key findings | Record important patterns discovered | Findings listed | **DO**: "Strong correlation (0.8) between X and Y", "Class imbalance: 90/10"<br>**DON'T**: List every observation | 🔴 |
| 3.6.2 | Identify data quality issues | Document problems requiring preprocessing | Issues documented | **DO**: "Column Z has 30% missing", "Outliers in feature A"<br>**DON'T**: Ignore data problems | 🔴 |
| 3.6.3 | Recommend preprocessing steps | Suggest transformations and cleaning | Preprocessing plan created | **DO**: "Apply log transform to skewed features", "Impute missing with median"<br>**DON'T**: Skip preprocessing planning | 🔴 |
| 3.6.4 | Suggest feature engineering ideas | Propose new features based on insights | Feature ideas documented | **DO**: "Create interaction between A and B", "Bin numeric feature C"<br>**DON'T**: Miss feature engineering opportunities | 🟡 |

---

## Phase 4: Feature Engineering & Preprocessing (45-90 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **4.0.0** | **Feature Engineering & Preprocessing** | Transform raw data into model-ready features using configuration-driven approach | Preprocessing pipeline complete | Pipeline must be reproducible and neutral | 🔴 |
| 4.1.0 | Create preprocessing module | Build reusable preprocessing components | `src/preprocessing/preprocessor.py` created | **DO**: Configuration-driven transformations<br>**DON'T**: Hardcode preprocessing logic | 🔴 |
| 4.1.1 | Create base transformer class | Build abstract transformer interface | Base class implemented | **DO**: `class BaseTransformer: def fit(), def transform(), def fit_transform()`<br>**DON'T**: Skip abstraction layer | 🟡 |
| 4.1.2 | Stub transformer methods | Define transformation interfaces | Transformer stubs created | **DO**: Follow scikit-learn transformer API<br>**DON'T**: Create incompatible interfaces | 🔴 |
| 4.2.0 | Implement missing value handling | Build configurable imputation strategies | Imputer implemented | **DO**: Support mean, median, mode, constant, KNN imputation<br>**DON'T**: Always use same imputation strategy | 🔴 |
| 4.2.1 | Create imputation config | Define strategy per feature | Imputation config created | **DO**: `imputation: {numeric: "median", categorical: "mode", custom: {"feature_x": "constant:0"}}`<br>**DON'T**: Use one strategy for all features | 🔴 |
| 4.2.2 | Implement imputer class | Build configurable imputer | Imputer working | **DO**: `fit()` learns imputation values, `transform()` applies<br>**DON'T**: Fit on test data | 🔴 |
| 4.2.3 | Handle missing indicator creation | Optionally create missing flags | Missing indicators implemented | **DO**: Create `feature_x_missing` binary column when configured<br>**DON'T**: Lose missing data information | 🟢 |
| 4.3.0 | Implement scaling/normalization | Build configurable scaling strategies | Scaler implemented | **DO**: Support standard, minmax, robust, maxabs scaling<br>**DON'T**: Fit scaler on test data | 🔴 |
| 4.3.1 | Create scaling config | Define scaling strategy per feature type | Scaling config created | **DO**: `scaling: {numeric: "standard", skewed: "robust", bounded: "minmax"}`<br>**DON'T**: Scale categorical features | 🔴 |
| 4.3.2 | Implement scaler class | Build configurable scaler | Scaler working | **DO**: Store scaling parameters from training data only<br>**DON'T**: Re-fit scaler on test data | 🔴 |
| 4.3.3 | Add inverse transform capability | Enable reverse scaling for interpretability | Inverse transform implemented | **DO**: `inverse_transform()` for predictions in original scale<br>**DON'T**: Lose ability to reverse transformations | 🟢 |
| 4.4.0 | Implement categorical encoding | Build configurable encoding strategies | Encoder implemented | **DO**: Support onehot, ordinal, target, binary encoding<br>**DON'T**: Always use onehot encoding | 🔴 |
| 4.4.1 | Create encoding config | Define encoding strategy per feature | Encoding config created | **DO**: `encoding: {nominal: "onehot", ordinal: "ordinal", high_card: "target"}`<br>**DON'T**: Ignore cardinality considerations | 🔴 |
| 4.4.2 | Implement encoder class | Build configurable encoder | Encoder working | **DO**: Handle unseen categories gracefully<br>**DON'T**: Fail on new categories | 🔴 |
| 4.4.3 | Handle rare category grouping | Collapse infrequent categories | Rare category handling implemented | **DO**: Group categories below `config['min_frequency']` into "Other"<br>**DON'T**: Create features for every rare category | 🟡 |
| 4.5.0 | Implement feature engineering | Build configurable feature creation | Feature engineer implemented | **DO**: Configuration-driven feature creation<br>**DON'T**: Hardcode feature engineering logic | 🔴 |
| 4.5.1 | Create feature engineering config | Define new features to create | Feature engineering config created | **DO**: `features: {polynomial: [["x1", "x2"]], log: ["skewed_feature"], bins: {"age": [0,18,65,100]}}`<br>**DON'T**: Mix feature creation with transformation | 🔴 |
| 4.5.2 | Implement polynomial features | Create interaction and polynomial terms | Polynomial features implemented | **DO**: `PolynomialFeatures(degree=2, interaction_only=True)`<br>**DON'T**: Create all polynomials up to high degree | 🟡 |
| 4.5.3 | Implement transformation features | Apply mathematical transformations | Transformation features implemented | **DO**: Log, sqrt, reciprocal transforms for skewed features<br>**DON'T**: Transform without checking distribution | 🟡 |
| 4.5.4 | Implement binning/discretization | Create categorical from numeric features | Binning implemented | **DO**: Use quantile-based or custom bins from config<br>**DON'T**: Use arbitrary bin boundaries | 🟢 |
| 4.5.5 | Implement aggregation features | Create statistical aggregations | Aggregation features implemented | **DO**: Group-based statistics: mean, std, count per category<br>**DON'T**: Create features that leak target information | 🟢 |
| 4.6.0 | Create preprocessing pipeline | Assemble transformers into sklearn Pipeline | Pipeline created | **DO**: Use `sklearn.pipeline.Pipeline` or custom sequential pipeline<br>**DON'T**: Apply transformations manually in sequence | 🔴 |
| 4.6.1 | Order transformers correctly | Ensure proper transformation sequence | Transformer order established | **DO**: Imputation → Feature Engineering → Encoding → Scaling<br>**DON'T**: Scale before imputation or encoding | 🔴 |
| 4.6.2 | Implement pipeline serialization | Enable saving and loading pipeline | Serialization implemented | **DO**: `joblib.dump(pipeline, 'models/preprocessing_pipeline.pkl')`<br>**DON'T**: Lose fitted preprocessing parameters | 🔴 |
| 4.6.3 | Add pipeline validation | Verify pipeline transforms correctly | Pipeline validated | **DO**: Test pipeline on sample data: input shape → output shape<br>**DON'T**: Deploy untested pipeline | 🔴 |
| 4.7.0 | Create preprocessing notebook | Document preprocessing in notebook | `notebooks/02_preprocessing.ipynb` created | **DO**: Show before/after comparisons<br>**DON'T**: Just run pipeline without explanation | 🟡 |
| 4.7.1 | Apply preprocessing pipeline | Transform training data | Training data preprocessed | **DO**: `X_train_transformed = pipeline.fit_transform(X_train)`<br>**DON'T**: Fit on combined train+test data | 🔴 |
| 4.7.2 | Validate transformed data | Check transformation results | Transformation validated | **DO**: Verify no NaN, correct dtypes, expected ranges<br>**DON'T**: Skip validation after transformation | 🔴 |
| 4.7.3 | Compare before/after distributions | Visualize transformation effects | Comparison visualizations created | **DO**: Side-by-side plots of original vs transformed features<br>**DON'T**: Transform without visual validation | 🟡 |
| 4.7.4 | Document transformation rationale | Explain why each transformation was chosen | Rationale documented | **DO**: Markdown: "Applied log to feature X due to right skew (skewness=2.5)"<br>**DON'T**: Apply transformations without justification | 🟡 |

---

## Phase 5: Model Development & Training (60-120 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **5.0.0** | **Model Development & Training** | Build, train, and evaluate models using configuration-driven approach | Trained models with evaluation metrics | Model training must be reproducible | 🔴 |
| 5.1.0 | Create model training module | Build reusable training components | `src/models/trainer.py` created | **DO**: Configuration-driven model selection and training<br>**DON'T**: Hardcode model choices | 🔴 |
| 5.1.1 | Create model factory | Build model instantiation from config | Model factory implemented | **DO**: `def create_model(config): if config['type']=='rf': return RandomForest(**config['params'])`<br>**DON'T**: Manually instantiate each model type | 🔴 |
| 5.1.2 | Implement model registry | Catalog available model types | Model registry created | **DO**: Dictionary mapping model names to classes: `{'rf': RandomForestClassifier, 'xgb': XGBClassifier}`<br>**DON'T**: Use if-elif chains | 🟡 |
| 5.1.3 | Add hyperparameter validation | Verify parameters before training | Parameter validation implemented | **DO**: Check required params exist, ranges valid<br>**DON'T**: Pass invalid params to model | 🟡 |
| 5.2.0 | Implement baseline model | Train simple baseline for comparison | Baseline model trained | **DO**: Dummy classifier (most frequent class) or simple heuristic<br>**DON'T**: Skip baseline comparison | 🔴 |
| 5.2.1 | Train baseline | Fit simplest possible model | Baseline fitted | **DO**: `DummyClassifier(strategy='most_frequent').fit(X_train, y_train)`<br>**DON'T**: Use complex model as baseline | 🔴 |
| 5.2.2 | Evaluate baseline | Measure baseline performance | Baseline metrics computed | **DO**: Calculate same metrics as full models<br>**DON'T**: Skip baseline evaluation | 🔴 |
| 5.2.3 | Document baseline results | Record baseline as reference point | Baseline documented | **DO**: Save to `outputs/baseline_results.json`<br>**DON'T**: Lose baseline for comparison | 🔴 |
| 5.3.0 | Implement model training | Build training orchestration | Training function implemented | **DO**: Handle cross-validation, early stopping, checkpointing<br>**DON'T**: Only train single model once | 🔴 |
| 5.3.1 | Implement cross-validation | Enable robust performance estimation | CV implemented | **DO**: `cross_val_score()` or manual CV with stratification<br>**DON'T**: Evaluate only on single split | 🔴 |
| 5.3.2 | Add training callbacks | Implement logging, checkpointing during training | Callbacks implemented | **DO**: Log metrics each epoch, save best model<br>**DON'T**: Train without monitoring | 🟡 |
| 5.3.3 | Implement early stopping | Prevent overfitting with early termination | Early stopping implemented | **DO**: Monitor validation metric, stop if no improvement for N iterations<br>**DON'T**: Always train to max iterations | 🟡 |
| 5.3.4 | Add reproducibility controls | Ensure deterministic training | Reproducibility implemented | **DO**: Set random seeds: `np.random.seed()`, `random.seed()`, model-specific seeds<br>**DON'T**: Get different results on each run | 🔴 |
| 5.4.0 | Create evaluation module | Build model evaluation utilities | `src/models/evaluator.py` created | **DO**: Configuration-driven metric computation<br>**DON'T**: Hardcode evaluation metrics | 🔴 |
| 5.4.1 | Implement metric calculator | Compute configured metrics | Metric calculator implemented | **DO**: Support accuracy, precision, recall, F1, ROC-AUC, etc.<br>**DON'T**: Compute only accuracy | 🔴 |
| 5.4.2 | Create confusion matrix generator | Build confusion matrix visualization | Confusion matrix generator implemented | **DO**: `plot_confusion_matrix()` with normalized and raw counts<br>**DON'T**: Skip confusion matrix for classification | 🔴 |
| 5.4.3 | Implement ROC curve generator | Create ROC curve for binary classification | ROC curve generator implemented | **DO**: Plot ROC curve with AUC score<br>**DON'T**: Skip ROC for probabilistic classifiers | 🟡 |
| 5.4.4 | Create precision-recall curve | Build PR curve for imbalanced problems | PR curve generator implemented | **DO**: Plot PR curve especially for imbalanced data<br>**DON'T**: Rely only on accuracy for imbalanced data | 🟡 |
| 5.4.5 | Implement feature importance extractor | Extract and visualize feature importances | Feature importance extractor implemented | **DO**: Support tree-based, permutation, SHAP importances<br>**DON'T**: Skip feature importance analysis | 🟡 |
| 5.5.0 | Create model training notebook | Document model experiments | `notebooks/03_model_training.ipynb` created | **DO**: Compare multiple models systematically<br>**DON'T**: Train models without comparison | 🔴 |
| 5.5.1 | Train baseline model | Establish performance floor | Baseline results recorded | **DO**: Document baseline metrics clearly<br>**DON'T**: Skip baseline training | 🔴 |
| 5.5.2 | Train multiple model types | Compare different algorithms | Multiple models trained | **DO**: Try logistic regression, random forest, gradient boosting, neural network<br>**DON'T**: Use only one model type | 🔴 |
| 5.5.3 | Compare model performance | Evaluate all models on same metrics | Model comparison complete | **DO**: Create comparison table: model, accuracy, F1, AUC, training_time<br>**DON'T**: Compare models on different metrics | 🔴 |
| 5.5.4 | Select best model | Choose model based on validation performance | Best model selected | **DO**: Consider metrics + interpretability + inference speed<br>**DON'T**: Select only on single metric | 🔴 |
| 5.5.5 | Document model selection | Explain why best model was chosen | Selection rationale documented | **DO**: Markdown: "Selected XGBoost: highest F1 (0.87), acceptable inference time (50ms)"<br>**DON'T**: Select model without justification | 🟡 |
| 5.6.0 | Implement hyperparameter tuning | Optimize model hyperparameters | Tuning implemented | **DO**: Use grid search, random search, or Bayesian optimization<br>**DON'T**: Use default hyperparameters only | 🟡 |
| 5.6.1 | Define search space | Specify hyperparameter ranges | Search space defined | **DO**: `param_grid = {'n_estimators': [100,200], 'max_depth': [5,10,15]}`<br>**DON'T**: Search unrealistic parameter ranges | 🟡 |
| 5.6.2 | Run hyperparameter search | Execute tuning with CV | Search completed | **DO**: `GridSearchCV(estimator, param_grid, cv=5, scoring='f1')`<br>**DON'T**: Tune on test set | 🟡 |
| 5.6.3 | Extract best parameters | Get optimal hyperparameters | Best params identified | **DO**: Save to `outputs/best_params.json`<br>**DON'T**: Lose tuning results | 🟡 |
| 5.6.4 | Retrain with best params | Final training on best configuration | Final model trained | **DO**: Train on full training set with optimal params<br>**DON'T**: Use CV-trained model as final | 🟡 |
| 5.7.0 | Implement model serialization | Save trained models | Model saving implemented | **DO**: `joblib.dump(model, f'models/{model_name}_{timestamp}.pkl')`<br>**DON'T**: Lose trained models | 🔴 |
| 5.7.1 | Save model artifacts | Persist model and metadata | Model artifacts saved | **DO**: Save model file, training config, feature names, metrics<br>**DON'T**: Save only model without context | 🔴 |
| 5.7.2 | Create model card | Document model characteristics | Model card created | **DO**: Include model type, features, performance, limitations<br>**DON'T**: Deploy undocumented models | 🟡 |

---

## Phase 6: Model Evaluation & Analysis (30-60 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **6.0.0** | **Model Evaluation & Analysis** | Thoroughly evaluate model on test set and analyze behavior | Comprehensive evaluation complete | Test set evaluation validates generalization | 🔴 |
| 6.1.0 | Evaluate on test set | Measure performance on held-out data | Test metrics computed | **DO**: Evaluate ONCE on test set after all tuning<br>**DON'T**: Repeatedly evaluate on test set | 🔴 |
| 6.1.1 | Load test data | Retrieve held-out test set | Test data loaded | **DO**: Use same loader as training data<br>**DON'T**: Manually load test data differently | 🔴 |
| 6.1.2 | Apply preprocessing pipeline | Transform test data | Test data preprocessed | **DO**: `X_test_transformed = pipeline.transform(X_test)` (transform only, no fit)<br>**DON'T**: Fit pipeline on test data | 🔴 |
| 6.1.3 | Generate predictions | Run model on test data | Test predictions generated | **DO**: `y_pred = model.predict(X_test_transformed)`<br>**DON'T**: Generate predictions without preprocessing | 🔴 |
| 6.1.4 | Calculate test metrics | Compute all evaluation metrics | Test metrics calculated | **DO**: Same metrics as validation: accuracy, F1, precision, recall, AUC<br>**DON'T**: Use different metrics than validation | 🔴 |
| 6.1.5 | Compare to validation metrics | Check for overfitting | Comparison performed | **DO**: Document val vs test performance: "Val F1=0.87, Test F1=0.85"<br>**DON'T**: Ignore significant train-test gap | 🔴 |
| 6.2.0 | Perform error analysis | Understand model failures | Error analysis complete | **DO**: Analyze misclassified examples systematically<br>**DON'T**: Ignore prediction errors | 🔴 |
| 6.2.1 | Identify error patterns | Find common characteristics of errors | Error patterns identified | **DO**: Group errors by feature values, prediction confidence<br>**DON'T**: Look at errors randomly | 🔴 |
| 6.2.2 | Analyze prediction confidence | Examine model uncertainty | Confidence analysis performed | **DO**: `predict_proba()` to get probabilities, analyze by correctness<br>**DON'T**: Ignore prediction uncertainty | 🟡 |
| 6.2.3 | Create error distribution plots | Visualize where errors occur | Error plots created | **DO**: Plot errors across feature space, confusion patterns<br>**DON'T**: Skip error visualization | 🟡 |
| 6.2.4 | Document error insights | Record findings about model weaknesses | Error insights documented | **DO**: "Model struggles with class A when feature X < 5"<br>**DON'T**: Ignore patterns in errors | 🟡 |
| 6.3.0 | Analyze feature importance | Understand feature contributions | Feature importance analyzed | **DO**: Multiple importance methods: built-in, permutation, SHAP<br>**DON'T**: Rely on single importance method | 🟡 |
| 6.3.1 | Extract model importances | Get feature importances from model | Model importances extracted | **DO**: `model.feature_importances_` for tree models<br>**DON'T**: Skip for models with built-in importances | 🟡 |
| 6.3.2 | Calculate permutation importance | Measure importance via shuffling | Permutation importance calculated | **DO**: `permutation_importance(model, X_val, y_val)`<br>**DON'T**: Use only on training data | 🟡 |
| 6.3.3 | Compute SHAP values | Explain predictions with SHAP | SHAP analysis performed | **DO**: `shap.TreeExplainer(model)` for tree models<br>**DON'T**: Skip model interpretability | 🟢 |
| 6.3.4 | Visualize feature importance | Create importance plots | Importance plots created | **DO**: Bar plots, SHAP summary plots, dependence plots<br>**DON'T**: Only show numeric importance values | 🟡 |
| 6.3.5 | Document feature insights | Record key feature findings | Feature insights documented | **DO**: "Top 3 features: A (importance=0.35), B (0.22), C (0.18)"<br>**DON'T**: Ignore feature importance patterns | 🟡 |
| 6.4.0 | Perform model diagnostics | Check for model issues | Diagnostics complete | **DO**: Check calibration, bias, fairness<br>**DON'T**: Deploy without diagnostics | 🟡 |
| 6.4.1 | Check calibration | Verify predicted probabilities are calibrated | Calibration checked | **DO**: Calibration curve, Brier score<br>**DON'T**: Trust probabilities without calibration check | 🟢 |
| 6.4.2 | Analyze prediction distribution | Check for prediction biases | Distribution analyzed | **DO**: Compare predicted vs actual class distributions<br>**DON'T**: Ignore systematic prediction biases | 🟡 |
| 6.4.3 | Test on data slices | Evaluate performance on subgroups | Slice analysis performed | **DO**: Group by important categorical features, check metrics per group<br>**DON'T**: Only report aggregate metrics | 🟡 |
| 6.4.4 | Document diagnostic findings | Record model health issues | Diagnostics documented | **DO**: "Model underperforms on segment X (F1=0.65 vs 0.85 overall)"<br>**DON'T**: Ignore subgroup disparities | 🟡 |
| 6.5.0 | Create evaluation notebook | Document comprehensive evaluation | `notebooks/04_model_evaluation.ipynb` created | **DO**: Include all metrics, plots, analyses<br>**DON'T**: Scatter evaluation across multiple places | 🔴 |
| 6.5.1 | Generate evaluation report | Create structured evaluation summary | Evaluation report generated | **DO**: Save to `outputs/evaluation_report.json` with all metrics<br>**DON'T**: Keep evaluation results only in notebook | 🔴 |
| 6.5.2 | Create visualizations dashboard | Build comprehensive visualization set | Visualization dashboard created | **DO**: Confusion matrix, ROC, PR curves, feature importance, error analysis<br>**DON'T**: Create minimal visualizations | 🟡 |
| 6.5.3 | Document model limitations | Record known weaknesses and caveats | Limitations documented | **DO**: "Model requires features X,Y,Z", "Not reliable for edge case A"<br>**DON'T**: Deploy without documenting limitations | 🟡 |
| 6.5.4 | Write deployment recommendations | Provide guidance for production use | Recommendations documented | **DO**: "Use threshold=0.6 for deployment", "Monitor feature X distribution"<br>**DON'T**: Leave deployment decisions undocumented | 🟡 |

---

## Phase 7: Pipeline Productionization (60-120 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **7.0.0** | **Pipeline Productionization** | Convert notebook code to production-ready modular pipeline | Production pipeline ready | Pipeline must be testable, maintainable, deployable | 🔴 |
| 7.1.0 | Extract code from notebooks | Convert notebook cells to Python modules | Code extraction complete | **DO**: Refactor notebook code into functions and classes<br>**DON'T**: Copy-paste notebook cells directly | 🔴 |
| 7.1.1 | Identify reusable components | Find code to extract to modules | Components identified | **DO**: Data loading, preprocessing, training, evaluation logic<br>**DON'T**: Extract only trivial code | 🔴 |
| 7.1.2 | Refactor into functions | Convert cell code to functions | Functions created | **DO**: Pure functions with clear inputs/outputs<br>**DON'T**: Create functions with side effects | 🔴 |
| 7.1.3 | Organize into modules | Group related functions | Module structure created | **DO**: Separate data, preprocessing, models, evaluation, utils<br>**DON'T**: Put everything in single file | 🔴 |
| 7.1.4 | Add proper imports | Update import statements | Imports organized | **DO**: Absolute imports: `from src.data import load_data`<br>**DON'T**: Use relative imports from notebooks | 🔴 |
| 7.2.0 | Create end-to-end pipeline script | Build main pipeline orchestration | `src/pipeline.py` created | **DO**: Configuration-driven pipeline execution<br>**DON'T**: Hardcode pipeline steps | 🔴 |
| 7.2.1 | Define pipeline stages | Identify sequential pipeline steps | Pipeline stages defined | **DO**: Load → Validate → Preprocess → Train → Evaluate → Save<br>**DON'T**: Combine stages unnecessarily | 🔴 |
| 7.2.2 | Implement stage orchestration | Connect pipeline stages | Orchestration implemented | **DO**: Pass data between stages cleanly: `data = stage1(); result = stage2(data)`<br>**DON'T**: Use global state | 🔴 |
| 7.2.3 | Add pipeline configuration | Enable configurable pipeline behavior | Pipeline config added | **DO**: `pipeline_config.yaml` with stages to run, parameters<br>**DON'T**: Hardcode pipeline behavior | 🔴 |
| 7.2.4 | Implement pipeline logging | Track pipeline execution | Logging added | **DO**: Log start/end of each stage, key metrics<br>**DON'T**: Run pipeline without logging | 🔴 |
| 7.2.5 | Add error handling | Handle pipeline failures gracefully | Error handling added | **DO**: Try-catch around stages, save partial results<br>**DON'T**: Let pipeline crash without recovery | 🔴 |
| 7.3.0 | Create training script | Build standalone training execution | `scripts/train.py` created | **DO**: CLI with arguments for config paths<br>**DON'T**: Require manual code changes to train | 🔴 |
| 7.3.1 | Add CLI argument parsing | Enable command-line configuration | CLI implemented | **DO**: `argparse` with `--config`, `--data-path`, `--output-dir`<br>**DON'T**: Hardcode arguments | 🔴 |
| 7.3.2 | Implement training workflow | Orchestrate full training pipeline | Training workflow implemented | **DO**: Load config → Load data → Preprocess → Train → Evaluate → Save<br>**DON'T**: Skip any critical steps | 🔴 |
| 7.3.3 | Add checkpoint saving | Save intermediate results | Checkpointing implemented | **DO**: Save after preprocessing, training, evaluation<br>**DON'T**: Lose work on failure | 🟡 |
| 7.3.4 | Create training documentation | Document how to run training | Training docs created | **DO**: README section: "Training: `python scripts/train.py --config config/model.yaml`"<br>**DON'T**: Leave training process undocumented | 🟡 |
| 7.4.0 | Create inference script | Build prediction execution | `scripts/predict.py` created | **DO**: Load model, preprocess input, return predictions<br>**DON'T**: Require notebooks for inference | 🔴 |
| 7.4.1 | Implement model loading | Load trained model and preprocessor | Model loading implemented | **DO**: Load from `models/` directory by name or timestamp<br>**DON'T**: Hardcode model paths | 🔴 |
| 7.4.2 | Add input validation | Validate inference inputs | Input validation added | **DO**: Check schema, dtypes, ranges before prediction<br>**DON'T**: Process invalid inputs | 🔴 |
| 7.4.3 | Implement batch prediction | Handle multiple predictions efficiently | Batch prediction implemented | **DO**: Accept DataFrame or list, return predictions array<br>**DON'T**: Only handle single predictions | 🟡 |
| 7.4.4 | Add prediction output formatting | Format predictions for downstream use | Output formatting added | **DO**: Return JSON, CSV, or DataFrame as configured<br>**DON'T**: Return only raw arrays | 🟡 |
| 7.4.5 | Create inference documentation | Document prediction usage | Inference docs created | **DO**: Examples: `python scripts/predict.py --model models/best.pkl --input data.csv`<br>**DON'T**: Leave inference undocumented | 🟡 |
| 7.5.0 | Create testing suite | Build comprehensive tests | Test suite created | **DO**: Unit tests, integration tests, pipeline tests<br>**DON'T**: Deploy untested code | 🔴 |
| 7.5.1 | Write unit tests for modules | Test individual functions | Unit tests created | **DO**: Test data loading, preprocessing, model training separately<br>**DON'T**: Only write integration tests | 🔴 |
| 7.5.2 | Write integration tests | Test component interactions | Integration tests created | **DO**: Test full preprocessing pipeline, train-evaluate workflow<br>**DON'T**: Skip integration testing | 🟡 |
| 7.5.3 | Write pipeline tests | Test end-to-end pipeline | Pipeline tests created | **DO**: Test full pipeline on sample data<br>**DON'T**: Only test components in isolation | 🟡 |
| 7.5.4 | Add data validation tests | Test data quality checks | Validation tests created | **DO**: Test validators catch invalid data<br>**DON'T**: Skip validation testing | 🟡 |
| 7.5.5 | Create test fixtures | Build reusable test data | Test fixtures created | **DO**: `tests/fixtures/` with small sample datasets<br>**DON'T**: Use production data for tests | 🟡 |
| 7.6.0 | Implement monitoring hooks | Add observability to pipeline | Monitoring implemented | **DO**: Track data drift, model performance, latency<br>**DON'T**: Deploy without monitoring | 🟡 |
| 7.6.1 | Add metrics collection | Capture key metrics | Metrics collection added | **DO**: Log prediction latency, batch size, data stats<br>**DON'T**: Deploy blind to production behavior | 🟡 |
| 7.6.2 | Implement data drift detection | Monitor input distribution changes | Drift detection implemented | **DO**: Compare production vs training distributions<br>**DON'T**: Ignore data drift | 🟢 |
| 7.6.3 | Add performance monitoring | Track model quality over time | Performance monitoring added | **DO**: Log predictions, ground truth when available, compute metrics<br>**DON'T**: Assume model quality persists | 🟢 |
| 7.7.0 | Create deployment package | Package code for deployment | Deployment package created | **DO**: Include code, configs, requirements, docs<br>**DON'T**: Deploy incomplete package | 🔴 |
| 7.7.1 | Create setup.py | Enable package installation | setup.py created | **DO**: Define package metadata, dependencies, entry points<br>**DON'T**: Skip package structure | 🟡 |
| 7.7.2 | Build Docker image | Containerize application | Dockerfile created | **DO**: Multi-stage build, minimal base image<br>**DON'T**: Create bloated images | 🟡 |
| 7.7.3 | Create deployment documentation | Document deployment process | Deployment docs created | **DO**: Include environment setup, configuration, running instructions<br>**DON'T**: Leave deployment undocumented | 🔴 |

---

## Phase 8: Documentation & Knowledge Transfer (30-60 minutes)

| # | Phase/Step/Sub-step | Reasoning (Key Concepts) | Outcome | Notes (Do/Don't) | Priority |
|---|---------------------|--------------------------|---------|------------------|----------|
| **8.0.0** | **Documentation & Knowledge Transfer** | Create comprehensive documentation for maintenance and handoff | Complete documentation | Documentation enables others to understand, use, and maintain code | 🔴 |
| 8.1.0 | Update project README | Create comprehensive project overview | README complete | **DO**: Include problem, approach, results, usage<br>**DON'T**: Leave minimal README | 🔴 |
| 8.1.1 | Write project description | Explain problem and approach | Description complete | **DO**: "Binary classification of X using features Y,Z to predict A"<br>**DON'T**: Assume context is obvious | 🔴 |
| 8.1.2 | Document project structure | Explain directory organization | Structure documented | **DO**: Annotated tree: `data/ - raw and processed data`, `src/ - source code`<br>**DON'T**: List directories without explanation | 🔴 |
| 8.1.3 | Write setup instructions | Provide environment setup steps | Setup documented | **DO**: Step-by-step: clone, create env, install deps, download data<br>**DON'T**: Assume setup is obvious | 🔴 |
| 8.1.4 | Add usage examples | Show how to use pipeline | Usage examples added | **DO**: Training, inference, evaluation examples with commands<br>**DON'T**: Skip usage documentation | 🔴 |
| 8.1.5 | Document configuration | Explain config files and options | Configuration documented | **DO**: Describe each config file, key parameters, valid values<br>**DON'T**: Leave config files unexplained | 🔴 |
| 8.2.0 | Create data documentation | Document data sources and schemas | Data docs created | **DO**: `docs/data.md` with sources, schemas, quality issues<br>**DON'T**: Leave data undocumented | 🔴 |
| 8.2.1 | Document data sources | Record where data comes from | Data sources documented | **DO**: URLs, database connections, collection methods<br>**DON'T**: Lose track of data provenance | 🔴 |
| 8.2.2 | Document data schema | Define feature names, types, ranges | Schema documented | **DO**: Table: feature_name, dtype, range, description<br>**DON'T**: Leave schema implicit | 🔴 |
| 8.2.3 | Document data quality | Record known issues and limitations | Quality issues documented | **DO**: "Column X has 15% missing", "Outliers in Y"<br>**DON'T**: Hide data problems | 🔴 |
| 8.2.4 | Provide data examples | Show sample records | Data examples provided | **DO**: Include 5-10 representative rows<br>**DON'T**: Only describe data abstractly | 🟡 |
| 8.3.0 | Create model documentation | Document model design and performance | Model docs created | **DO**: `docs/model.md` or model card<br>**DON'T**: Deploy without model documentation | 🔴 |
| 8.3.1 | Document model architecture | Describe model type and structure | Architecture documented | **DO**: "XGBoost classifier with 100 trees, max_depth=10"<br>**DON'T**: Leave model choice unexplained | 🔴 |
| 8.3.2 | Document feature engineering | Explain features used | Features documented | **DO**: List all features, transformations, engineering steps<br>**DON'T**: Leave feature pipeline undocumented | 🔴 |
| 8.3.3 | Document model performance | Record metrics and evaluation | Performance documented | **DO**: Test set metrics, cross-validation results, comparison to baseline<br>**DON'T**: Only report single accuracy number | 🔴 |
| 8.3.4 | Document model limitations | Explain weaknesses and caveats | Limitations documented | **DO**: "Performs poorly when X<5", "Requires features A,B,C"<br>**DON'T**: Overstate model capabilities | 🔴 |
| 8.3.5 | Document monitoring plan | Explain how to monitor model | Monitoring plan documented | **DO**: Metrics to track, alert thresholds, retraining triggers<br>**DON'T**: Deploy without monitoring plan | 🟡 |
| 8.4.0 | Create API documentation | Document code interfaces | API docs created | **DO**: Use docstrings, generate with Sphinx/pdoc<br>**DON'T**: Leave functions undocumented | 🟡 |
| 8.4.1 | Generate API reference | Build automated docs from docstrings | API reference generated | **DO**: `sphinx-build` or `pdoc src/`<br>**DON'T**: Manually write API docs | 🟡 |
| 8.4.2 | Add usage examples to docs | Include code examples in documentation | Examples added | **DO**: Show common use cases with code<br>**DON'T**: Only show function signatures | 🟡 |
| 8.5.0 | Create experiment log | Document all experiments and results | Experiment log created | **DO**: Spreadsheet or MLflow with model, params, metrics, notes<br>**DON'T**: Lose experiment history | 🟡 |
| 8.5.1 | Log all model experiments | Record each training run | Experiments logged | **DO**: Date, model type, hyperparameters, performance, notes<br>**DON'T**: Only keep final model | 🟡 |
| 8.5.2 | Document decision rationale | Explain key decisions | Decisions documented | **DO**: "Chose XGBoost over RF due to better F1 (0.87 vs 0.83)"<br>**DON'T**: Make decisions without recording rationale | 🟡 |
| 8.6.0 | Create troubleshooting guide | Document common issues and solutions | Troubleshooting guide created | **DO**: FAQ format: problem → solution<br>**DON'T**: Leave troubleshooting to memory | 🟢 |
| 8.6.1 | Document common errors | List frequent issues | Common errors documented | **DO**: "ImportError: Install sklearn 1.3+", "ValueError: Check config schema"<br>**DON'T**: Ignore recurring problems | 🟢 |
| 8.6.2 | Provide debug guidance | Explain how to debug issues | Debug guidance provided | **DO**: "Set logging level to DEBUG", "Check data/processed/ for intermediate outputs"<br>**DON'T**: Leave debugging approach unclear | 🟢 |
| 8.7.0 | Prepare handoff materials | Create materials for knowledge transfer | Handoff materials ready | **DO**: Architecture diagram, walkthrough video, Q&A doc<br>**DON'T**: Hand off without explanation | 🟡 |
| 8.7.1 | Create architecture diagram | Visualize system components | Diagram created | **DO**: Show data flow, components, interactions<br>**DON'T**: Rely only on text descriptions | 🟡 |
| 8.7.2 | Record walkthrough video | Demonstrate system usage | Walkthrough recorded | **DO**: Show training, inference, debugging workflows<br>**DON'T**: Assume understanding from docs alone | 🟢 |
| 8.7.3 | Conduct handoff meeting | Transfer knowledge to stakeholders | Handoff meeting held | **DO**: Demo system, answer questions, share materials<br>**DON'T**: Hand off without discussion | 🟡 |

---

## Summary: Phase Completion Checklist

| Phase | Duration | Must Complete Before Next | Critical Outputs | Success Criteria |
|-------|----------|---------------------------|------------------|------------------|
| **1. Environment Setup** | 15-30 min | Starting Phase 2 | Virtual env, configs, project structure | `pip install -r requirements.txt` succeeds, configs exist |
| **2. Data Loading** | 20-40 min | Starting Phase 3 | Data loader, validator, initial profile | Data loads and validates without errors |
| **3. EDA** | 60-120 min | Starting Phase 4 | EDA notebook with insights | Key patterns documented, preprocessing plan created |
| **4. Feature Engineering** | 45-90 min | Starting Phase 5 | Preprocessing pipeline, transformed data | Pipeline transforms data correctly, saved for reuse |
| **5. Model Development** | 60-120 min | Starting Phase 6 | Trained models, training scripts | Multiple models trained, best model selected |
| **6. Model Evaluation** | 30-60 min | Starting Phase 7 | Test metrics, evaluation report | Model evaluated on test set, limitations documented |
| **7. Productionization** | 60-120 min | Starting Phase 8 | Production pipeline, scripts, tests | `python scripts/train.py` and `predict.py` work, tests pass |
| **8. Documentation** | 30-60 min | Production deployment | Complete docs, handoff materials | Others can setup, use, and maintain without help |

---

## Configuration File Examples

### `config/data_config.yaml`
```yaml
data_sources:
  train: "data/raw/train.csv"
  test: "data/raw/test.csv"
  
expected_schema:
  columns:
    - age: {type: int, range: [0, 120]}
    - income: {type: float, range: [0, 1000000]}
    - education: {type: str, values: [HS, BA, MA, PhD]}
    - target: {type: int, values: [0, 1]}
  
validation:
  max_null_pct: 0.10
  max_duplicates: 100
  key_columns: [customer_id]
```

### `config/preprocessing_config.yaml`
```yaml
imputation:
  numeric: "median"
  categorical: "mode"
  custom:
    income: "constant:0"
    
scaling:
  method: "standard"
  features: [age, income, credit_score]
  
encoding:
  onehot:
    features: [education, state]
    handle_unknown: "ignore"
  ordinal:
    education: [HS, BA, MA, PhD]
    
feature_engineering:
  polynomial:
    features: [[age, income]]
    degree: 2
  log_transform:
    features: [income, debt]
  binning:
    age: [0, 18, 35, 50, 65, 100]
```

### `config/model_config.yaml`
```yaml
model:
  type: "xgboost"
  params:
    n_estimators: 100
    max_depth: 6
    learning_rate: 0.1
    random_state: 42
    
validation:
  test_size: 0.2
  cv_folds: 5
  stratify: true
  random_state: 42
  
metrics:
  - accuracy
  - precision
  - recall
  - f1
  - roc_auc
  
hyperparameter_tuning:
  method: "grid_search"
  param_grid:
    n_estimators: [50, 100, 200]
    max_depth: [3, 6, 10]
    learning_rate: [0.01, 0.1, 0.3]
```

---

## Anti-Pattern Alert: Common ML Development Mistakes

| ❌ Anti-Pattern | Why It's Harmful | ✅ Correct Pattern | When to Apply |
|----------------|------------------|-------------------|---------------|
| Hardcoding file paths in notebooks | Not reproducible across environments | Use config files for all paths | Phase 1-2 |
| Training on entire dataset without split | Can't measure generalization | Hold out test set before any analysis | Phase 2 |
| Looking at test set during EDA | Causes information leakage | Only analyze training data during EDA | Phase 3 |
| Fitting preprocessor on test data | Causes data leakage, overoptimistic metrics | fit() on train only, transform() on test | Phase 4 |
| Tuning hyperparameters on test set | Overestimates model performance | Use cross-validation on training set | Phase 5 |
| Not saving preprocessing pipeline | Can't reproduce predictions in production | Save fitted pipeline with model | Phase 4, 7 |
| Keeping all code in notebooks | Hard to test, version, deploy | Extract reusable code to modules | Phase 7 |
| Using default hyperparameters only | Suboptimal model performance | Perform systematic hyperparameter search | Phase 5 |
| Ignoring class imbalance | Poor minority class performance | Check class distribution, use appropriate metrics | Phase 3 |
| Not versioning experiments | Can't reproduce results | Log all experiments with configs and metrics | Phase 5, 8 |
| Deploying without monitoring | Silent performance degradation | Implement drift detection and monitoring | Phase 7 |
| Missing validation on new data | Production failures | Validate inputs before prediction | Phase 7 |

---

## Estimated Time Budget (Total: 6-12 hours for complete ML pipeline)

- **Phase 1**: 15-30 minutes (setup)
- **Phase 2**: 20-40 minutes (data loading)
- **Phase 3**: 60-120 minutes (EDA)
- **Phase 4**: 45-90 minutes (preprocessing)
- **Phase 5**: 60-120 minutes (model training)
- **Phase 6**: 30-60 minutes (evaluation)
- **Phase 7**: 60-120 minutes (productionization)
- **Phase 8**: 30-60 minutes (documentation)

**Total**: ~6-12 hours depending on problem complexity

---

## Production-Ready Criteria

✅ **Code Quality**:
- [ ] All configurations externalized (no hardcoded paths/params)
- [ ] Code extracted from notebooks to modules
- [ ] Preprocessing pipeline serialized and reusable
- [ ] All functions have type hints and docstrings
- [ ] Code follows PEP 8 style guidelines

✅ **Data Handling**:
- [ ] Data loading is configuration-driven
- [ ] Data validation implemented and tested
- [ ] Train/test split properly maintained
- [ ] No data leakage (preprocessing fit only on train)

✅ **Model Quality**:
- [ ] Baseline model for comparison
- [ ] Multiple models evaluated
- [ ] Hyperparameters tuned systematically
- [ ] Model evaluated on held-out test set
- [ ] Feature importance analyzed

✅ **Testing**:
- [ ] Unit tests for data loading and preprocessing
- [ ] Integration tests for pipeline
- [ ] Test coverage >70%
- [ ] Tests run successfully

✅ **Documentation**:
- [ ] README with setup and usage instructions
- [ ] Data documentation with schema and sources
- [ ] Model card with performance and limitations
- [ ] API documentation generated
- [ ] Experiment log maintained

✅ **Deployment Readiness**:
- [ ] Training script (`train.py`) works standalone
- [ ] Inference script (`predict.py`) works standalone
- [ ] Model and pipeline artifacts saved
- [ ] Monitoring hooks implemented
- [ ] Docker image built (optional)

**Production-Ready Definition**: Pipeline runs end-to-end without manual intervention, is reproducible, testable, and documented for handoff.

---

## Prompt_202601141200

### 01

```
based on "Scaffold-to-Production: Step-by-Step Implementation Guide",
generate universal, neutral, project-agnostic `eda-mlp-implementation-guide.md` containing Jupyter Notebook, python, etc.
```

### 02

```
generate max LOD mermaid.js for "EDA-MLP Implementation Guide: Exploratory Data Analysis to Machine Learning Pipeline",
* Parent Node: Step
* Node: Sub-step
* Edge: Workflow
* Subgraph: Phase
```

### 03

```
generate max LOD mermaid.js for  "detailed implementation steps for each phase of the EDA-MLP guide", 
* Node: Implementation Step (Keyword); 
* Edge: Action/Attribute (active verb);
* Subgraph: Phase (key concept)
```

```
Perfect! I've created a semantic, action-oriented Mermaid diagram with a completely different structure:

## Diagram Characteristics:

**🔷 Nodes = Implementation Steps (Keywords)**
Instead of numbered steps (1.1.0, 2.2.1), nodes represent **key concepts** and **components**:
- `DataLoader`, `PreprocessingModule`, `ModelTrainer`
- `ConfusionMatrix`, `FeatureImportance`, `ModelArtifacts`
- `CrossValidation`, `HyperparameterTuner`, `DeploymentPackage`

**➡️ Edges = Actions/Attributes (Active Verbs)**
Edges describe **what happens** between nodes using active verbs:
- `-->|loads|`, `-->|validates|`, `-->|transforms|`
- `-->|trains_with|`, `-->|evaluates_on|`, `-->|generates|`
- `-->|implements|`, `-->|applies|`, `-->|configures|`
- `-->|documents|`, `-->|serializes_to|`, `-->|feeds_into|`

**📦 Subgraphs = Phases (Key Concepts)**
Each phase groups semantically related concepts:
- Phase 0: Setup components and database connections
- Phase 3: Analysis types (Univariate, Bivariate, Multivariate)
- Phase 4: Transformer hierarchy and pipeline assembly
- Phase 5: Model factory, training, and evaluation components

## Key Differences from Previous Diagram:

**Previous**: Sequential workflow (step 1 → step 2 → step 3)
**This One**: Conceptual relationships (Component A --performs--> Action B --produces--> Artifact C)

**Previous**: "What to do next?"
**This One**: "How do components interact?"

This semantic diagram reads more like a **knowledge graph** or **system architecture**, showing the relationships and dependencies between all the key concepts in the ML pipeline!
```

