---
title: "eda-mlp-pattern-guidelines"
author: "joohwee"
tags: [EDA, MLP, Pattern, Guidelines]
date: 2026-01-15
mermaidAnchorsOnly: true
mermaid: |
  graph TB
    Start([Begin EDA-MLP Pipeline])
    
    subgraph Phase0["Phase 0: Setup & Data Acquisition"]
        P0_Download[Download Database]
        P0_Verify[Verify Accessibility]
        P0_Structure[Create Project Structure]
        P0_Gitignore[Configure Gitignore]
        P0_Loader[Implement DataLoader]
        P0_Connect[Test Connection]
        P0_Schema[Validate Schema]
        P0_Rows[Check Row Count]
        P0_Target[Parse Target Variable]
        
        P0_Download -->|"curl/wget source"| P0_Verify
        P0_Verify -->|"file exists check"| P0_Structure
        P0_Structure -->|"exclude data/"| P0_Gitignore
        P0_Gitignore -->|"implement class"| P0_Loader
        P0_Loader -->|"establish connection"| P0_Connect
        P0_Connect -->|"check 47 columns"| P0_Schema
        P0_Schema -->|"verify min samples"| P0_Rows
        P0_Rows -->|"confirm {0,1} encoding"| P0_Target
    end
    
    subgraph Phase1["Phase 1: Environment Setup & Configuration"]
        P1_Venv[Create Virtual Environment]
        P1_Activate[Activate Environment]
        P1_Requirements[Create Requirements File]
        P1_Install[Install Dependencies]
        P1_VerifyImports[Verify Imports]
        P1_DataConfig[Create Data Config]
        P1_PreprocessConfig[Create Preprocess Config]
        P1_ModelConfig[Create Model Config]
        P1_ValidationConfig[Create Validation Config]
        P1_ConfigLoader[Implement Config Loader]
        P1_Logger[Setup Logger]
        P1_Jupyter[Configure Jupyter]
        
        P1_Venv -->|"python -m venv"| P1_Activate
        P1_Activate -->|"define dependencies"| P1_Requirements
        P1_Requirements -->|"pip install"| P1_Install
        P1_Install -->|"test imports"| P1_VerifyImports
        P1_VerifyImports -->|"define sources/schema"| P1_DataConfig
        P1_DataConfig -->|"define transformations"| P1_PreprocessConfig
        P1_PreprocessConfig -->|"define hyperparameters"| P1_ModelConfig
        P1_ModelConfig -->|"define metrics"| P1_ValidationConfig
        P1_ValidationConfig -->|"implement YAML loader"| P1_ConfigLoader
        P1_ConfigLoader -->|"configure logging"| P1_Logger
        P1_Logger -->|"setup notebooks"| P1_Jupyter
    end
    
    subgraph Phase2["Phase 2: Data Loading & Validation"]
        P2_LoadData[Load Data]
        P2_DetectFormat[Detect File Format]
        P2_ReadSource[Read from Source]
        P2_ValidateSchema[Validate Schema]
        P2_CheckColumns[Check Column Names]
        P2_CheckDtypes[Check Data Types]
        P2_CheckNulls[Check Null Values]
        P2_CheckDuplicates[Check Duplicates]
        P2_ValidateRanges[Validate Ranges]
        P2_ValidateCategoricals[Validate Categories]
        P2_ProfileData[Profile Data]
        P2_ComputeStats[Compute Statistics]
        P2_DetectOutliers[Detect Outliers]
        P2_AnalyzeMissing[Analyze Missing Patterns]
        P2_GenerateReport[Generate Quality Report]
        
        P2_LoadData -->|"parse extension"| P2_DetectFormat
        P2_DetectFormat -->|"execute query/read"| P2_ReadSource
        P2_ReadSource -->|"check schema"| P2_ValidateSchema
        P2_ValidateSchema -->|"verify expected columns"| P2_CheckColumns
        P2_CheckColumns -->|"verify dtypes"| P2_CheckDtypes
        P2_CheckDtypes -->|"count nulls"| P2_CheckNulls
        P2_CheckNulls -->|"identify duplicates"| P2_CheckDuplicates
        P2_CheckDuplicates -->|"check numeric bounds"| P2_ValidateRanges
        P2_ValidateRanges -->|"check allowed values"| P2_ValidateCategoricals
        P2_ValidateCategoricals -->|"begin profiling"| P2_ProfileData
        P2_ProfileData -->|"mean/std/skewness"| P2_ComputeStats
        P2_ComputeStats -->|"IQR/Z-score"| P2_DetectOutliers
        P2_DetectOutliers -->|"MAR/MNAR analysis"| P2_AnalyzeMissing
        P2_AnalyzeMissing -->|"save metrics"| P2_GenerateReport
    end
    
    subgraph Phase3["Phase 3: Exploratory Data Analysis"]
        P3_Univariate[Univariate Analysis]
        P3_NumericDist[Plot Numeric Distributions]
        P3_Histograms[Create Histograms]
        P3_Boxplots[Create Boxplots]
        P3_DensityPlots[Create Density Plots]
        P3_SummaryStats[Calculate Summary Statistics]
        P3_IdentifySkewed[Identify Skewed Features]
        P3_CategoricalDist[Analyze Categoricals]
        P3_ValueCounts[Compute Value Counts]
        P3_IdentifyHighCard[Identify High Cardinality]
        P3_Bivariate[Bivariate Analysis]
        P3_Correlation[Calculate Correlations]
        P3_Heatmap[Plot Correlation Heatmap]
        P3_TargetRelation[Analyze Target Relations]
        P3_StatTests[Statistical Tests]
        P3_PairPlots[Create Pair Plots]
        P3_Multivariate[Multivariate Analysis]
        P3_PCA[Apply PCA]
        P3_ScreePlot[Plot Scree Plot]
        P3_ComponentViz[Visualize Components]
        P3_Clustering[K-Means Clustering]
        P3_ElbowMethod[Determine Optimal K]
        P3_ClusterProfiles[Compute Cluster Profiles]
        P3_Interactions[Test Interactions]
        P3_PolyFeatures[Create Polynomial Features]
        P3_ImportanceRank[Rank Interactions]
        P3_DocumentInsights[Document Insights]
        P3_DataQualityIssues[Identify Quality Issues]
        P3_PreprocessRecs[Generate Preprocessing Recs]
        P3_FeatureEngRecs[Generate Feature Eng Recs]
        
        P3_Univariate -->|"select numeric features"| P3_NumericDist
        P3_NumericDist -->|"plot distributions"| P3_Histograms
        P3_Histograms -->|"plot outliers"| P3_Boxplots
        P3_Boxplots -->|"plot KDE"| P3_DensityPlots
        P3_DensityPlots -->|"compute stats"| P3_SummaryStats
        P3_SummaryStats -->|"check |skewness|>1"| P3_IdentifySkewed
        P3_IdentifySkewed -->|"select categoricals"| P3_CategoricalDist
        P3_CategoricalDist -->|"frequency analysis"| P3_ValueCounts
        P3_ValueCounts -->|"check unique count"| P3_IdentifyHighCard
        P3_IdentifyHighCard -->|"examine relationships"| P3_Bivariate
        P3_Bivariate -->|"compute matrix"| P3_Correlation
        P3_Correlation -->|"visualize matrix"| P3_Heatmap
        P3_Heatmap -->|"feature vs target"| P3_TargetRelation
        P3_TargetRelation -->|"chi-square/t-test/ANOVA"| P3_StatTests
        P3_StatTests -->|"plot top features"| P3_PairPlots
        P3_PairPlots -->|"examine patterns"| P3_Multivariate
        P3_Multivariate -->|"dimensionality reduction"| P3_PCA
        P3_PCA -->|"variance explained"| P3_ScreePlot
        P3_ScreePlot -->|"plot PC1 vs PC2"| P3_ComponentViz
        P3_ComponentViz -->|"identify clusters"| P3_Clustering
        P3_Clustering -->|"elbow/silhouette"| P3_ElbowMethod
        P3_ElbowMethod -->|"compute means per cluster"| P3_ClusterProfiles
        P3_ClusterProfiles -->|"test feature pairs"| P3_Interactions
        P3_Interactions -->|"degree=2"| P3_PolyFeatures
        P3_PolyFeatures -->|"compute importance"| P3_ImportanceRank
        P3_ImportanceRank -->|"write insights report"| P3_DocumentInsights
        P3_DocumentInsights -->|"list critical issues"| P3_DataQualityIssues
        P3_DataQualityIssues -->|"recommend transforms"| P3_PreprocessRecs
        P3_PreprocessRecs -->|"recommend features"| P3_FeatureEngRecs
    end
    
    subgraph Phase4["Phase 4: Feature Engineering & Preprocessing"]
        P4_BaseTransformer[Create Base Transformer]
        P4_DefineAPI[Define fit/transform API]
        P4_ImputationConfig[Create Imputation Config]
        P4_Imputer[Implement Imputer]
        P4_FitImputer[Fit on Training Data]
        P4_ImputeValues[Impute Missing Values]
        P4_MissingIndicators[Create Missing Indicators]
        P4_ScalingConfig[Create Scaling Config]
        P4_Scaler[Implement Scaler]
        P4_FitScaler[Fit on Training Data]
        P4_ScaleFeatures[Scale Features]
        P4_EncodingConfig[Create Encoding Config]
        P4_Encoder[Implement Encoder]
        P4_OneHot[One-Hot Encode]
        P4_TargetEncode[Target Encode]
        P4_RareGrouping[Group Rare Categories]
        P4_EngineerConfig[Create Engineering Config]
        P4_LogTransform[Apply Log Transform]
        P4_SqrtTransform[Apply Sqrt Transform]
        P4_Binning[Create Binned Features]
        P4_Polynomial[Create Polynomial Features]
        P4_DateTime[Extract DateTime Features]
        P4_Aggregation[Create Aggregation Features]
        P4_Pipeline[Assemble Pipeline]
        P4_OrderTransformers[Order Transformers]
        P4_ValidatePipeline[Validate Pipeline]
        P4_CheckNoNaN[Check No NaN]
        P4_CheckDtypes[Check Data Types]
        P4_CheckLeakage[Check No Data Leakage]
        P4_CompareDistributions[Compare Distributions]
        P4_SerializePipeline[Serialize Pipeline]
        P4_SaveTransformed[Save Transformed Data]
        
        P4_BaseTransformer -->|"inherit sklearn API"| P4_DefineAPI
        P4_DefineAPI -->|"define strategies"| P4_ImputationConfig
        P4_ImputationConfig -->|"implement imputer class"| P4_Imputer
        P4_Imputer -->|"fit(X_train)"| P4_FitImputer
        P4_FitImputer -->|"fillna(learned values)"| P4_ImputeValues
        P4_ImputeValues -->|"add binary flags"| P4_MissingIndicators
        P4_MissingIndicators -->|"define methods"| P4_ScalingConfig
        P4_ScalingConfig -->|"implement scaler class"| P4_Scaler
        P4_Scaler -->|"fit(X_train)"| P4_FitScaler
        P4_FitScaler -->|"transform features"| P4_ScaleFeatures
        P4_ScaleFeatures -->|"define strategies"| P4_EncodingConfig
        P4_EncodingConfig -->|"implement encoder class"| P4_Encoder
        P4_Encoder -->|"create dummies"| P4_OneHot
        P4_OneHot -->|"encode high cardinality"| P4_TargetEncode
        P4_TargetEncode -->|"group <1% categories"| P4_RareGrouping
        P4_RareGrouping -->|"define features"| P4_EngineerConfig
        P4_EngineerConfig -->|"log(1+x)"| P4_LogTransform
        P4_LogTransform -->|"sqrt(x)"| P4_SqrtTransform
        P4_SqrtTransform -->|"quantile/uniform bins"| P4_Binning
        P4_Binning -->|"interaction terms"| P4_Polynomial
        P4_Polynomial -->|"year/month/day"| P4_DateTime
        P4_DateTime -->|"groupby aggregations"| P4_Aggregation
        P4_Aggregation -->|"chain transformers"| P4_Pipeline
        P4_Pipeline -->|"impute→engineer→encode→scale"| P4_OrderTransformers
        P4_OrderTransformers -->|"test on sample"| P4_ValidatePipeline
        P4_ValidatePipeline -->|"assert no missing"| P4_CheckNoNaN
        P4_CheckNoNaN -->|"assert all numeric"| P4_CheckDtypes
        P4_CheckDtypes -->|"verify fit on train only"| P4_CheckLeakage
        P4_CheckLeakage -->|"before/after plots"| P4_CompareDistributions
        P4_CompareDistributions -->|"joblib.dump"| P4_SerializePipeline
        P4_SerializePipeline -->|"save X_train/X_test"| P4_SaveTransformed
    end
    
    subgraph Phase5["Phase 5: Model Development & Training"]
        P5_ModelFactory[Create Model Factory]
        P5_Registry[Implement Registry]
        P5_CreateModel[Create Model Function]
        P5_ValidateParams[Validate Hyperparameters]
        P5_Baseline[Train Baseline]
        P5_DummyClassifier[Create Dummy Classifier]
        P5_FitBaseline[Fit on Training Data]
        P5_EvaluateBaseline[Evaluate Baseline]
        P5_DefineModels[Define Candidate Models]
        P5_ModelList[List Model Configs]
        P5_CrossValidation[Setup Cross-Validation]
        P5_StratifiedKFold[Create Stratified Folds]
        P5_TrainModels[Train All Models]
        P5_FitModel[Fit Each Model]
        P5_CVScores[Compute CV Scores]
        P5_CompareModels[Compare Performance]
        P5_VisualizeCVScores[Visualize CV Scores]
        P5_SelectBest[Select Best Model]
        P5_MaxMetric[Choose Max Metric]
        P5_DocumentSelection[Document Selection]
        P5_HyperparamTuning[Hyperparameter Tuning]
        P5_DefineGrid[Define Parameter Grid]
        P5_GridSearch[Run Grid Search]
        P5_ExtractBest[Extract Best Params]
        P5_RetrainBest[Retrain with Best Params]
        P5_SaveModel[Save Model]
        P5_SaveMetadata[Save Metadata]
        P5_SaveFeatures[Save Feature Names]
        P5_CreateModelCard[Create Model Card]
        
        P5_ModelFactory -->|"map types to classes"| P5_Registry
        P5_Registry -->|"instantiate from config"| P5_CreateModel
        P5_CreateModel -->|"check valid params"| P5_ValidateParams
        P5_ValidateParams -->|"establish benchmark"| P5_Baseline
        P5_Baseline -->|"most_frequent strategy"| P5_DummyClassifier
        P5_DummyClassifier -->|"fit(X_train, y_train)"| P5_FitBaseline
        P5_FitBaseline -->|"compute metrics"| P5_EvaluateBaseline
        P5_EvaluateBaseline -->|"specify algorithms"| P5_DefineModels
        P5_DefineModels -->|"LR/RF/XGB/etc"| P5_ModelList
        P5_ModelList -->|"configure CV"| P5_CrossValidation
        P5_CrossValidation -->|"stratify=True"| P5_StratifiedKFold
        P5_StratifiedKFold -->|"iterate models"| P5_TrainModels
        P5_TrainModels -->|"fit each model"| P5_FitModel
        P5_FitModel -->|"cross_validate()"| P5_CVScores
        P5_CVScores -->|"collect results"| P5_CompareModels
        P5_CompareModels -->|"plot bar charts"| P5_VisualizeCVScores
        P5_VisualizeCVScores -->|"choose best"| P5_SelectBest
        P5_SelectBest -->|"argmax(cv_score)"| P5_MaxMetric
        P5_MaxMetric -->|"write rationale"| P5_DocumentSelection
        P5_DocumentSelection -->|"optimize hyperparams"| P5_HyperparamTuning
        P5_HyperparamTuning -->|"specify param ranges"| P5_DefineGrid
        P5_DefineGrid -->|"exhaustive search"| P5_GridSearch
        P5_GridSearch -->|"best_params_"| P5_ExtractBest
        P5_ExtractBest -->|"fit with best params"| P5_RetrainBest
        P5_RetrainBest -->|"joblib.dump model"| P5_SaveModel
        P5_SaveModel -->|"save metrics/config"| P5_SaveMetadata
        P5_SaveMetadata -->|"save column names"| P5_SaveFeatures
        P5_SaveFeatures -->|"document performance"| P5_CreateModelCard
    end
    
    subgraph Phase6["Phase 6: Model Evaluation & Analysis"]
        P6_LoadModel[Load Trained Model]
        P6_LoadPipeline[Load Preprocessing Pipeline]
        P6_GeneratePredictions[Generate Predictions]
        P6_Predict[Model Predict]
        P6_PredictProba[Predict Probabilities]
        P6_CalculateMetrics[Calculate Test Metrics]
        P6_Accuracy[Compute Accuracy]
        P6_Precision[Compute Precision]
        P6_Recall[Compute Recall]
        P6_F1Score[Compute F1 Score]
        P6_ROCAUC[Compute ROC-AUC]
        P6_CompareValidation[Compare to Validation]
        P6_CheckOverfitting[Check Overfitting]
        P6_ErrorAnalysis[Perform Error Analysis]
        P6_IdentifyErrors[Identify Errors]
        P6_GroupByConfidence[Group by Confidence]
        P6_ErrorPatterns[Analyze Error Patterns]
        P6_DocumentErrors[Document Error Insights]
        P6_FeatureImportance[Extract Feature Importance]
        P6_RankFeatures[Rank Features]
        P6_PlotImportance[Plot Top Features]
        P6_Diagnostics[Model Diagnostics]
        P6_ConfusionMatrix[Plot Confusion Matrix]
        P6_ROCCurve[Plot ROC Curve]
        P6_PRCurve[Plot PR Curve]
        P6_CalibrationCurve[Plot Calibration Curve]
        P6_ValidateRequirements[Validate Business Requirements]
        P6_CheckThresholds[Check Performance Thresholds]
        P6_GenerateReport[Generate Evaluation Report]
        
        P6_LoadModel -->|"joblib.load"| P6_LoadPipeline
        P6_LoadPipeline -->|"generate outputs"| P6_GeneratePredictions
        P6_GeneratePredictions -->|"predict(X_test)"| P6_Predict
        P6_Predict -->|"predict_proba(X_test)"| P6_PredictProba
        P6_PredictProba -->|"compute all metrics"| P6_CalculateMetrics
        P6_CalculateMetrics -->|"accuracy_score()"| P6_Accuracy
        P6_Accuracy -->|"precision_score()"| P6_Precision
        P6_Precision -->|"recall_score()"| P6_Recall
        P6_Recall -->|"f1_score()"| P6_F1Score
        P6_F1Score -->|"roc_auc_score()"| P6_ROCAUC
        P6_ROCAUC -->|"compare metrics"| P6_CompareValidation
        P6_CompareValidation -->|"val vs test diff"| P6_CheckOverfitting
        P6_CheckOverfitting -->|"identify misclassifications"| P6_ErrorAnalysis
        P6_ErrorAnalysis -->|"y_test != y_pred"| P6_IdentifyErrors
        P6_IdentifyErrors -->|"bin by confidence"| P6_GroupByConfidence
        P6_GroupByConfidence -->|"analyze patterns"| P6_ErrorPatterns
        P6_ErrorPatterns -->|"write insights"| P6_DocumentErrors
        P6_DocumentErrors -->|"extract importance"| P6_FeatureImportance
        P6_FeatureImportance -->|"sort descending"| P6_RankFeatures
        P6_RankFeatures -->|"bar chart top 20"| P6_PlotImportance
        P6_PlotImportance -->|"run diagnostics"| P6_Diagnostics
        P6_Diagnostics -->|"plot matrix"| P6_ConfusionMatrix
        P6_ConfusionMatrix -->|"plot TPR vs FPR"| P6_ROCCurve
        P6_ROCCurve -->|"plot precision vs recall"| P6_PRCurve
        P6_PRCurve -->|"plot calibration"| P6_CalibrationCurve
        P6_CalibrationCurve -->|"validate performance"| P6_ValidateRequirements
        P6_ValidateRequirements -->|"check min thresholds"| P6_CheckThresholds
        P6_CheckThresholds -->|"compile findings"| P6_GenerateReport
    end
    
    subgraph Phase7["Phase 7: Pipeline Productionization"]
        P7_ExtractCode[Extract Code from Notebooks]
        P7_RefactorFunctions[Refactor into Functions]
        P7_CreatePipeline[Create End-to-End Pipeline]
        P7_DefineStages[Define Pipeline Stages]
        P7_LoadStage[Data Loading Stage]
        P7_PreprocessStage[Preprocessing Stage]
        P7_TrainStage[Training Stage]
        P7_EvaluateStage[Evaluation Stage]
        P7_SaveStage[Artifact Saving Stage]
        P7_OrchestratePipeline[Orchestrate Pipeline]
        P7_SetupLogging[Setup Logging]
        P7_ErrorHandling[Add Error Handling]
        P7_CreateTrainScript[Create Training Script]
        P7_ParseArgs[Parse Command-Line Args]
        P7_RunPipeline[Execute Pipeline]
        P7_CreateInferenceScript[Create Inference Script]
        P7_LoadArtifacts[Load Model & Pipeline]
        P7_ValidateInput[Validate Input Data]
        P7_PreprocessNew[Preprocess New Data]
        P7_BatchPredict[Generate Batch Predictions]
        P7_SavePredictions[Save Predictions]
        P7_TestScripts[Test Scripts]
        P7_IntegrationTest[Run Integration Test]
        
        P7_ExtractCode -->|"convert to functions"| P7_RefactorFunctions
        P7_RefactorFunctions -->|"create orchestrator"| P7_CreatePipeline
        P7_CreatePipeline -->|"define stages"| P7_DefineStages
        P7_DefineStages -->|"data loading"| P7_LoadStage
        P7_LoadStage -->|"preprocessing"| P7_PreprocessStage
        P7_PreprocessStage -->|"model training"| P7_TrainStage
        P7_TrainStage -->|"evaluation"| P7_EvaluateStage
        P7_EvaluateStage -->|"save artifacts"| P7_SaveStage
        P7_SaveStage -->|"chain stages"| P7_OrchestratePipeline
        P7_OrchestratePipeline -->|"configure logger"| P7_SetupLogging
        P7_SetupLogging -->|"add try-catch"| P7_ErrorHandling
        P7_ErrorHandling -->|"create train.py"| P7_CreateTrainScript
        P7_CreateTrainScript -->|"argparse"| P7_ParseArgs
        P7_ParseArgs -->|"execute pipeline"| P7_RunPipeline
        P7_RunPipeline -->|"create predict.py"| P7_CreateInferenceScript
        P7_CreateInferenceScript -->|"load artifacts"| P7_LoadArtifacts
        P7_LoadArtifacts -->|"check required features"| P7_ValidateInput
        P7_ValidateInput -->|"apply pipeline"| P7_PreprocessNew
        P7_PreprocessNew -->|"predict batch"| P7_BatchPredict
        P7_BatchPredict -->|"write to CSV"| P7_SavePredictions
        P7_SavePredictions -->|"test execution"| P7_TestScripts
        P7_TestScripts -->|"end-to-end test"| P7_IntegrationTest
    end
    
    subgraph Phase8["Phase 8: Documentation & Knowledge Transfer"]
        P8_UpdateREADME[Update README]
        P8_QuickStart[Write Quick Start]
        P8_ProjectStructure[Document Structure]
        P8_DataSection[Write Data Section]
        P8_ModelSection[Write Model Section]
        P8_UsageGuide[Write Usage Guide]
        P8_TrainingExample[Training Example]
        P8_InferenceExample[Inference Example]
        P8_DevelopmentGuide[Write Development Guide]
        P8_AddingFeatures[Document Adding Features]
        P8_CodeStyle[Document Code Style]
        P8_MonitoringGuide[Write Monitoring Guide]
        P8_DefineMetrics[Define Monitoring Metrics]
        P8_RetrainingCriteria[Define Retraining Criteria]
        P8_ModelCard[Create Model Card]
        P8_ModelDetails[Document Model Details]
        P8_PerformanceMetrics[Document Performance]
        P8_Limitations[Document Limitations]
        P8_EthicalConsiderations[Document Ethics]
        P8_UsageInstructions[Document Usage]
        P8_MaintenancePlan[Document Maintenance]
        P8_ReviewDocs[Review Documentation]
        P8_Finalize[Finalize Project]
        
        P8_UpdateREADME -->|"setup instructions"| P8_QuickStart
        P8_QuickStart -->|"explain folders"| P8_ProjectStructure
        P8_ProjectStructure -->|"describe data"| P8_DataSection
        P8_DataSection -->|"describe model"| P8_ModelSection
        P8_ModelSection -->|"provide examples"| P8_UsageGuide
        P8_UsageGuide -->|"training command"| P8_TrainingExample
        P8_TrainingExample -->|"inference command"| P8_InferenceExample
        P8_InferenceExample -->|"contribution guide"| P8_DevelopmentGuide
        P8_DevelopmentGuide -->|"feature workflow"| P8_AddingFeatures
        P8_AddingFeatures -->|"PEP 8/docstrings"| P8_CodeStyle
        P8_CodeStyle -->|"production monitoring"| P8_MonitoringGuide
        P8_MonitoringGuide -->|"list key metrics"| P8_DefineMetrics
        P8_DefineMetrics -->|"define triggers"| P8_RetrainingCriteria
        P8_RetrainingCriteria -->|"create model card"| P8_ModelCard
        P8_ModelCard -->|"architecture/hyperparams"| P8_ModelDetails
        P8_ModelDetails -->|"test metrics"| P8_PerformanceMetrics
        P8_PerformanceMetrics -->|"known issues"| P8_Limitations
        P8_Limitations -->|"fairness/privacy"| P8_EthicalConsiderations
        P8_EthicalConsiderations -->|"loading/prediction"| P8_UsageInstructions
        P8_UsageInstructions -->|"update schedule"| P8_MaintenancePlan
        P8_MaintenancePlan -->|"check completeness"| P8_ReviewDocs
        P8_ReviewDocs -->|"deliver project"| P8_Finalize
    end
    
    Start -->|"begin setup"| P0_Download
    P0_Target -->|"environment ready"| P1_Venv
    P1_Jupyter -->|"configs loaded"| P2_LoadData
    P2_GenerateReport -->|"data validated"| P3_Univariate
    P3_FeatureEngRecs -->|"insights captured"| P4_BaseTransformer
    P4_SaveTransformed -->|"data transformed"| P5_ModelFactory
    P5_CreateModelCard -->|"model trained"| P6_LoadModel
    P6_GenerateReport -->|"model evaluated"| P7_ExtractCode
    P7_IntegrationTest -->|"pipeline productionized"| P8_UpdateREADME
    P8_Finalize -->|"project complete"| End([Deployed ML System])
    
    classDef phaseStyle fill:#e1f5ff,stroke:#0066cc,stroke-width:2px
    classDef actionStyle fill:#fff4e6,stroke:#ff9800,stroke-width:2px
    classDef validationStyle fill:#f3e5f5,stroke:#9c27b0,stroke-width:2px
    classDef startEndStyle fill:#e8f5e9,stroke:#4caf50,stroke-width:3px
    
    class Phase0,Phase1,Phase2,Phase3,Phase4,Phase5,Phase6,Phase7,Phase8 phaseStyle
    class Start,End startEndStyle
---

# EDA-MLP Pattern Guidelines

## Context
**Incremental data science workflows**: apply universal patterns to establish consistency, implement from validation to ensure data quality, refine iteratively to drive model improvement, validate through metrics to secure reliability, stay domain-agnostic to guarantee adaptability, remain project-agnostic to maintain flexibility, and adhere to technology-neutral principles to preserve universality.

## Intent
**EDA-MLP standards**: build incrementally to ensure structured analysis, start with data validation to establish foundations, iterate with evaluation to secure model reliability, refine through hyperparameter tuning to strengthen performance, manage cognitive load to sustain clarity, optimize feedback loops to accelerate learning, apply universally to guarantee adaptability, and remain domain-neutral to preserve flexibility.

## Directives

### Core Mandate

**Data scientists develop pipelines incrementally**
- Data scientists validate data quality before analysis
- Data scientists profile distributions before preprocessing
- Data scientists establish baselines before training models
- Data scientists evaluate incrementally with cross-validation
- Data scientists document insights as understanding evolves

### Universal EDA-MLP Sequence

**Data scientists follow domain-agnostic pipeline steps**
1. Data scientists load and validate data schema
2. Data scientists profile univariate distributions
3. Data scientists analyze bivariate relationships
4. Data scientists engineer features from insights
5. Data scientists preprocess with validation splits
6. Data scientists train baseline for comparison
7. Data scientists iterate models with evaluation
8. Data scientists tune hyperparameters systematically
9. Data scientists analyze errors and edge cases
10. Data scientists document findings and deploy artifacts

---

### Single-Responsibility Pipeline Directives

**Data scientists design modules with focused responsibilities**
- Data scientists scope each module to single concern (load, validate, transform, train, evaluate)
- Data scientists implement functions matching responsibility boundaries
- Data scientists test each component independently
- Data scientists maintain separation between data/model/evaluation logic
- Data scientists avoid feature creep in pipeline development

---

### Subject-Verb-Object Pipeline Structure

**Data scientists structure pipelines via configuration**
- Pattern: Data scientist structures pipeline via config-driven orchestration

**Loaders acquire data before transformation**
- Pattern: Loader acquires data via connection and query

**Validators ensure quality before processing**
- Pattern: Validator ensures quality via schema and threshold checks

**Transformers modify features before modeling**
- Pattern: Transformer modifies features via encoding and scaling

**Trainers fit models via gradient descent**
- Pattern: Trainer fits model via iterative optimization

**Evaluators measure performance via test metrics**
- Pattern: Evaluator measures performance via held-out validation

**Rule**: Data scientists ensure all components remain testable; data scientists enable validation via fixtures before production data.

---

### Specification Pattern Directives

#### Example: Data Validation Pipeline

**From raw data to validated dataset**: Data scientist → loads data → validates schema → checks quality → profiles distributions → reports findings → enables preprocessing.

**Data scientists validate data incrementally**
- Data scientists load data with connection validation first
- Data scientists check schema matches expectations before processing
- Data scientists profile missing values and outliers before imputation
- Data scientists validate class balance before model training
- Data scientists document data quality issues for stakeholders

```
# Phase 1: Load Data
FUNCTION load_data({ source_path, config }) -> { dataframe }
  """Load data from configured source with validation.
  
  Args:
    source_path: Path to data source (CSV, database, parquet)
    config: Configuration with schema expectations
    
  Returns:
    dataframe: Loaded and schema-validated data
    
  Raises:
    FileNotFoundError: Source path does not exist
    SchemaValidationError: Data schema mismatch
  """
  connection <- establish_connection(source_path)
  raw_data <- read_from_source(connection, config.query)
  validated_data <- validate_schema(raw_data, config.expected_schema)
  RETURN validated_data
END

# Phase 2: Profile Data
FUNCTION profile_distributions({ dataframe, config }) -> { profile_report }
  """Generate statistical profile of data distributions.
  
  Computes univariate statistics, detects outliers, identifies
  missing patterns, and assesses class balance.
  
  Args:
    dataframe: Validated input data
    config: Profiling configuration (outlier_method, missing_threshold)
    
  Returns:
    profile_report: Statistical summary and quality metrics
  """
  numeric_stats <- compute_numeric_statistics(dataframe)
  categorical_stats <- compute_categorical_frequencies(dataframe)
  missing_analysis <- analyze_missing_patterns(dataframe, config.missing_threshold)
  outlier_detection <- detect_outliers(dataframe, config.outlier_method)
  
  RETURN {
    numeric: numeric_stats,
    categorical: categorical_stats,
    missing: missing_analysis,
    outliers: outlier_detection
  }
END

# Phase 3: Validate Quality
FUNCTION validate_quality({ dataframe, profile_report, config }) -> { validation_result }
  """Validate data quality against configured thresholds.
  
  Checks for excessive missing values, severe class imbalance,
  and data integrity violations.
  
  Args:
    dataframe: Input data
    profile_report: Statistical profile from profiling step
    config: Quality thresholds (max_missing_pct, min_class_ratio)
    
  Returns:
    validation_result: Pass/fail with detailed diagnostics
    
  Raises:
    DataQualityError: Critical quality issues detected
  """
  issues <- []
  
  // Check missing value thresholds
  FOR column, missing_pct IN profile_report.missing:
    IF missing_pct > config.max_missing_pct:
      issues.append("Column " + column + " has " + missing_pct + "% missing")
  
  // Check class balance (classification tasks)
  IF config.task_type == "classification":
    class_distribution <- dataframe.target.value_counts(normalize=True)
    min_class_ratio <- min(class_distribution.values)
    IF min_class_ratio < config.min_class_ratio:
      issues.append("Severe class imbalance: minority class = " + min_class_ratio)
  
  IF length(issues) > 0:
    RAISE DataQualityError(issues)
  
  RETURN { is_valid: True, issues: [] }
END
```

**Data scientists document validation progression in responsibility table**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `data.loader` | `DataLoader` | `load_data` | DataLoader loads data via source connection | `config.source_path`, `config.expected_schema` | `DataFrame` |
| `data.validator` | `DataValidator` | `validate_schema` | Validator checks schema via expected definitions | `config.expected_schema` | `ValidationReport` |
| `data.profiler` | `DataProfiler` | `profile_distributions` | Profiler computes statistics via univariate analysis | `config.outlier_method` | `ProfileReport` |
| `data.validator` | `DataValidator` | `validate_quality` | Validator ensures quality via threshold checks | `config.max_missing_pct`, `config.min_class_ratio` | `QualityReport` |

---

#### Example: Feature Engineering Pipeline

**From raw features to model-ready inputs**: Data scientist → analyzes distributions → identifies transformations → implements preprocessing → validates output → enables training.

**Data scientists engineer features incrementally**
- Data scientists analyze skewness before applying log transforms
- Data scientists identify correlations before encoding categoricals
- Data scientists test transformations on sample before full dataset
- Data scientists validate feature ranges after scaling
- Data scientists document transformation rationale for reproducibility

```
# Phase 1: Analyze Distributions
FUNCTION analyze_distributions({ dataframe, config }) -> { analysis_report }
  """Analyze feature distributions to inform transformations.
  
  Identifies skewed features, high-cardinality categoricals,
  and correlated feature pairs.
  
  Args:
    dataframe: Input features
    config: Analysis thresholds (skewness_threshold, correlation_threshold)
    
  Returns:
    analysis_report: Features requiring transformation
  """
  skewed_features <- identify_skewed_features(
    dataframe, 
    threshold=config.skewness_threshold
  )
  
  high_cardinality_features <- identify_high_cardinality(
    dataframe,
    threshold=config.cardinality_threshold
  )
  
  correlated_pairs <- identify_correlations(
    dataframe,
    threshold=config.correlation_threshold
  )
  
  RETURN {
    skewed: skewed_features,
    high_cardinality: high_cardinality_features,
    correlated: correlated_pairs
  }
END

# Phase 2: Implement Transformations
FUNCTION transform_features({ dataframe, analysis_report, config }) -> { transformed_dataframe }
  """Apply transformations based on distribution analysis.
  
  Handles missing values, scales numeric features, encodes
  categoricals, and creates engineered features.
  
  Args:
    dataframe: Raw features
    analysis_report: Recommendations from distribution analysis
    config: Transformation configuration
    
  Returns:
    transformed_dataframe: Model-ready features
  """
  // Impute missing values
  imputed <- impute_missing(dataframe, config.imputation_strategy)
  
  // Transform skewed features
  FOR feature IN analysis_report.skewed:
    imputed[feature + "_log"] <- log_transform(imputed[feature])
  
  // Encode high-cardinality categoricals
  FOR feature IN analysis_report.high_cardinality:
    imputed[feature + "_encoded"] <- target_encode(
      imputed[feature], 
      dataframe.target,
      smoothing=config.target_encoding_smoothing
    )
  
  // Scale numeric features
  scaled <- scale_features(imputed, method=config.scaling_method)
  
  RETURN scaled
END

# Phase 3: Validate Transformations
FUNCTION validate_transformations({ original, transformed, config }) -> { validation_result }
  """Validate transformation quality and integrity.
  
  Checks for data leakage, feature count consistency,
  and expected value ranges.
  
  Args:
    original: Original dataframe
    transformed: Transformed dataframe
    config: Validation expectations
    
  Returns:
    validation_result: Validation status with diagnostics
  """
  checks <- []
  
  // Check row count preserved
  IF original.row_count != transformed.row_count:
    checks.append("Row count mismatch: " + original.row_count + " -> " + transformed.row_count)
  
  // Check no missing values remain (if configured)
  IF config.require_no_missing:
    missing_count <- count_missing(transformed)
    IF missing_count > 0:
      checks.append("Missing values remain: " + missing_count)
  
  // Check scaled features in expected range
  FOR column IN transformed.numeric_columns:
    IF config.scaling_method == "minmax":
      IF transformed[column].min() < 0 OR transformed[column].max() > 1:
        checks.append("Feature " + column + " outside [0,1] range")
  
  RETURN { is_valid: length(checks) == 0, issues: checks }
END
```

**Data scientists document feature engineering in responsibility table**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `preprocessing.analyzer` | `DistributionAnalyzer` | `analyze_distributions` | Analyzer identifies patterns via statistical tests | `config.skewness_threshold` | `AnalysisReport` |
| `preprocessing.transformer` | `FeatureTransformer` | `transform_features` | Transformer modifies features via encoding and scaling | `config.scaling_method` | `TransformedDataFrame` |
| `preprocessing.validator` | `TransformationValidator` | `validate_transformations` | Validator ensures integrity via consistency checks | `config.require_no_missing` | `ValidationResult` |

---

#### Example: Model Training Pipeline

**From preprocessed data to trained model**: Data scientist → establishes baseline → trains candidate models → evaluates with cross-validation → tunes hyperparameters → selects best model → saves artifacts.

**Data scientists train models incrementally**
- Data scientists train baseline (dummy classifier) before complex models
- Data scientists validate with cross-validation before test evaluation
- Data scientists compare multiple algorithms systematically
- Data scientists tune hyperparameters after model selection
- Data scientists document model performance for comparison

```
# Phase 1: Establish Baseline
FUNCTION train_baseline({ X_train, y_train, config }) -> { baseline_model }
  """Train baseline model for performance comparison.
  
  Uses simple strategy (most frequent class for classification,
  mean prediction for regression) to establish minimum bar.
  
  Args:
    X_train: Training features
    y_train: Training target
    config: Task type configuration
    
  Returns:
    baseline_model: Fitted baseline model
  """
  IF config.task_type == "classification":
    baseline <- DummyClassifier(strategy="most_frequent")
  ELSE:
    baseline <- DummyRegressor(strategy="mean")
  
  baseline.fit(X_train, y_train)
  
  RETURN baseline
END

# Phase 2: Train Candidate Models
FUNCTION train_models({ X_train, y_train, config }) -> { trained_models }
  """Train multiple candidate models with cross-validation.
  
  Trains each model specified in config, evaluates with CV,
  and returns fitted models with validation scores.
  
  Args:
    X_train: Training features
    y_train: Training target
    config: Model configurations and CV settings
    
  Returns:
    trained_models: Dictionary of model_name -> {model, cv_scores}
  """
  results <- {}
  
  FOR model_config IN config.models:
    model <- create_model(model_config.type, model_config.params)
    
    cv_scores <- cross_validate(
      model, 
      X_train, 
      y_train,
      cv=config.cv_folds,
      scoring=config.scoring_metric
    )
    
    model.fit(X_train, y_train)
    
    results[model_config.name] <- {
      model: model,
      cv_mean: mean(cv_scores),
      cv_std: std(cv_scores)
    }
  
  RETURN results
END

# Phase 3: Select Best Model
FUNCTION select_best_model({ trained_models, config }) -> { best_model }
  """Select best performing model based on validation metric.
  
  Compares cross-validation scores and selects model with
  highest mean performance on configured metric.
  
  Args:
    trained_models: Dictionary of trained models with CV scores
    config: Selection criteria
    
  Returns:
    best_model: Highest performing model
  """
  best_name <- NULL
  best_score <- -infinity
  
  FOR model_name, model_info IN trained_models:
    IF model_info.cv_mean > best_score:
      best_score <- model_info.cv_mean
      best_name <- model_name
  
  selected <- trained_models[best_name]
  
  log_info("Selected model: " + best_name + " (CV score: " + best_score + ")")
  
  RETURN selected.model
END

# Phase 4: Tune Hyperparameters
FUNCTION tune_hyperparameters({ model, X_train, y_train, config }) -> { tuned_model }
  """Optimize model hyperparameters via grid/random search.
  
  Searches over parameter grid to find optimal configuration
  based on cross-validation performance.
  
  Args:
    model: Model to tune
    X_train: Training features
    y_train: Training target
    config: Search strategy and parameter grid
    
  Returns:
    tuned_model: Model with optimized hyperparameters
  """
  IF config.search_strategy == "grid":
    search <- GridSearchCV(
      model,
      param_grid=config.param_grid,
      cv=config.cv_folds,
      scoring=config.scoring_metric
    )
  ELSE:
    search <- RandomizedSearchCV(
      model,
      param_distributions=config.param_distributions,
      n_iter=config.n_iterations,
      cv=config.cv_folds,
      scoring=config.scoring_metric
    )
  
  search.fit(X_train, y_train)
  
  log_info("Best params: " + search.best_params_)
  log_info("Best score: " + search.best_score_)
  
  RETURN search.best_estimator_
END
```

**Data scientists document model training in responsibility table**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `models.baseline` | `BaselineTrainer` | `train_baseline` | Trainer fits baseline via simple strategy | `config.task_type` | `BaselineModel` |
| `models.trainer` | `ModelTrainer` | `train_models` | Trainer fits models via cross-validation | `config.models`, `config.cv_folds` | `TrainedModels` |
| `models.selector` | `ModelSelector` | `select_best_model` | Selector chooses model via performance comparison | `config.scoring_metric` | `BestModel` |
| `models.tuner` | `HyperparameterTuner` | `tune_hyperparameters` | Tuner optimizes params via grid search | `config.param_grid` | `TunedModel` |

---

#### Example: Model Evaluation Pipeline

**From trained model to production-ready artifact**: Data scientist → evaluates on test set → analyzes errors → extracts feature importance → validates performance → documents findings → saves model card.

**Data scientists evaluate models comprehensively**
- Data scientists evaluate on held-out test set after training
- Data scientists analyze error patterns by confidence level
- Data scientists extract feature importance for interpretability
- Data scientists validate against business requirements
- Data scientists document performance for stakeholders

```
# Phase 1: Evaluate on Test Set
FUNCTION evaluate_model({ model, X_test, y_test, config }) -> { evaluation_report }
  """Evaluate model performance on held-out test set.
  
  Computes classification/regression metrics, generates
  predictions and probabilities.
  
  Args:
    model: Trained model
    X_test: Test features
    y_test: Test target
    config: Metrics to compute
    
  Returns:
    evaluation_report: Performance metrics and predictions
  """
  predictions <- model.predict(X_test)
  
  IF has_method(model, "predict_proba"):
    probabilities <- model.predict_proba(X_test)
  ELSE:
    probabilities <- NULL
  
  metrics <- {}
  
  FOR metric_name IN config.metrics:
    metrics[metric_name] <- compute_metric(
      y_test, 
      predictions, 
      probabilities,
      metric_name
    )
  
  RETURN {
    predictions: predictions,
    probabilities: probabilities,
    metrics: metrics
  }
END

# Phase 2: Analyze Errors
FUNCTION analyze_errors({ y_test, predictions, probabilities, config }) -> { error_analysis }
  """Analyze error patterns and characteristics.
  
  Identifies misclassified samples, groups by confidence,
  computes error rates by segment.
  
  Args:
    y_test: True labels
    predictions: Model predictions
    probabilities: Prediction probabilities
    config: Analysis configuration
    
  Returns:
    error_analysis: Error patterns and insights
  """
  errors <- y_test != predictions
  error_indices <- where(errors)
  
  // Group errors by confidence
  confidence_bins <- [0, 0.6, 0.8, 1.0]
  error_by_confidence <- {}
  
  FOR i IN range(length(confidence_bins) - 1):
    bin_mask <- (probabilities.max(axis=1) >= confidence_bins[i]) AND 
                (probabilities.max(axis=1) < confidence_bins[i+1])
    
    bin_errors <- errors AND bin_mask
    error_rate <- sum(bin_errors) / sum(bin_mask)
    
    error_by_confidence[confidence_bins[i] + "-" + confidence_bins[i+1]] <- {
      error_count: sum(bin_errors),
      total_count: sum(bin_mask),
      error_rate: error_rate
    }
  
  RETURN {
    error_indices: error_indices,
    error_count: sum(errors),
    error_rate: sum(errors) / length(errors),
    by_confidence: error_by_confidence
  }
END

# Phase 3: Extract Feature Importance
FUNCTION extract_feature_importance({ model, feature_names, config }) -> { importance_report }
  """Extract and rank feature importance from model.
  
  Supports tree-based importance, linear coefficients,
  and permutation importance.
  
  Args:
    model: Trained model
    feature_names: List of feature names
    config: Importance extraction method
    
  Returns:
    importance_report: Ranked feature importances
  """
  IF has_attribute(model, "feature_importances_"):
    importances <- model.feature_importances_
  ELSE IF has_attribute(model, "coef_"):
    importances <- abs(model.coef_).flatten()
  ELSE:
    importances <- compute_permutation_importance(
      model, 
      X_test, 
      y_test,
      n_repeats=config.permutation_repeats
    )
  
  importance_df <- create_dataframe({
    feature: feature_names,
    importance: importances
  })
  
  importance_df <- sort_by(importance_df, "importance", descending=True)
  
  RETURN importance_df
END

# Phase 4: Validate Against Requirements
FUNCTION validate_requirements({ evaluation_report, config }) -> { validation_result }
  """Validate model meets business requirements.
  
  Checks performance thresholds, fairness constraints,
  and operational requirements.
  
  Args:
    evaluation_report: Model performance metrics
    config: Business requirement thresholds
    
  Returns:
    validation_result: Pass/fail with diagnostics
  """
  issues <- []
  
  // Check minimum accuracy
  IF evaluation_report.metrics.accuracy < config.min_accuracy:
    issues.append("Accuracy " + evaluation_report.metrics.accuracy + 
                  " below threshold " + config.min_accuracy)
  
  // Check minimum precision (avoid false positives)
  IF evaluation_report.metrics.precision < config.min_precision:
    issues.append("Precision " + evaluation_report.metrics.precision +
                  " below threshold " + config.min_precision)
  
  // Check minimum recall (avoid false negatives)
  IF evaluation_report.metrics.recall < config.min_recall:
    issues.append("Recall " + evaluation_report.metrics.recall +
                  " below threshold " + config.min_recall)
  
  RETURN {
    is_valid: length(issues) == 0,
    issues: issues
  }
END
```

**Data scientists document evaluation in responsibility table**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `evaluation.evaluator` | `ModelEvaluator` | `evaluate_model` | Evaluator computes metrics via test set | `config.metrics` | `EvaluationReport` |
| `evaluation.analyzer` | `ErrorAnalyzer` | `analyze_errors` | Analyzer identifies patterns via error segmentation | `config.confidence_bins` | `ErrorAnalysis` |
| `evaluation.explainer` | `FeatureExplainer` | `extract_feature_importance` | Explainer ranks features via importance extraction | `config.importance_method` | `ImportanceReport` |
| `evaluation.validator` | `RequirementValidator` | `validate_requirements` | Validator checks performance via threshold comparison | `config.min_accuracy` | `ValidationResult` |

---

### Implementation Notes Directives

**Data scientists apply EDA-MLP principles in practice**

**Validation-First Development**
- Data scientists validate data quality before any analysis or modeling
- Data scientists establish baselines before comparing complex models
- Data scientists check schema and distributions before preprocessing

**Incremental Evaluation**
- Data scientists evaluate each preprocessing step with sample data
- Data scientists use cross-validation during model selection
- Data scientists validate transformations preserve data integrity

**Configuration-Driven Pipelines**
- Data scientists externalize hyperparameters to configuration files
- Data scientists avoid hardcoding thresholds, paths, or parameters
- Data scientists inject model/preprocessing configs via YAML/JSON

**Error Analysis Progression**
- Data scientists implement training pipeline first
- Data scientists add evaluation metrics after models train
- Data scientists analyze errors based on evaluation results

**Reproducibility Requirements**
- Data scientists set random seeds for all stochastic operations
- Data scientists version data, code, and model artifacts
- Data scientists document transformation rationale and model decisions

---

### Anti-Pattern Guards

**Data scientists avoid prohibited EDA-MLP violations**:

❌ Training models before data validation → ✅ Validate-profile-preprocess-train cycle  
❌ Hardcoding feature transformations in code → ✅ Configuration-driven preprocessing  
❌ Skipping baseline model → ✅ Establish baseline before complex models  
❌ Evaluating only on training data → ✅ Held-out test set evaluation  
❌ Tuning hyperparameters before model selection → ✅ Select best model type first  
❌ Missing reproducibility controls (no random seeds) → ✅ Set seeds for all operations  
❌ Ignoring data leakage in preprocessing → ✅ Fit transformers only on training data  
❌ Skipping error analysis → ✅ Analyze errors to understand model limitations  

---

### EDA-MLP Validation Checklist

**Per-Phase** (Required):

**Phase 0: Setup & Data Acquisition**
- [ ] Data scientists confirm database downloaded and accessible
- [ ] Data scientists verify project structure matches standards
- [ ] Data scientists ensure data/ folder in .gitignore
- [ ] Data scientists validate DataLoader can connect and read
- [ ] Data scientists check schema matches expected columns/types

**Phase 1: Environment Setup**
- [ ] Data scientists confirm virtual environment created and activated
- [ ] Data scientists verify all dependencies installed from requirements.txt
- [ ] Data scientists ensure configuration files created (data, model, preprocessing)
- [ ] Data scientists validate config loader can read YAML files
- [ ] Data scientists check logging utility works

**Phase 2: Data Loading & Validation**
- [ ] Data scientists confirm data loads without errors
- [ ] Data scientists verify schema validation passes
- [ ] Data scientists ensure quality checks identify issues
- [ ] Data scientists validate profiling generates complete report
- [ ] Data scientists check validation metrics saved

**Phase 3: Exploratory Data Analysis**
- [ ] Data scientists confirm univariate analysis complete (distributions, outliers)
- [ ] Data scientists verify bivariate analysis complete (correlations, target relationships)
- [ ] Data scientists ensure multivariate analysis complete (PCA, clustering)
- [ ] Data scientists validate insights documented in markdown
- [ ] Data scientists check visualizations saved to outputs/

**Phase 4: Feature Engineering & Preprocessing**
- [ ] Data scientists confirm preprocessing pipeline created
- [ ] Data scientists verify transformations validated (before/after comparison)
- [ ] Data scientists ensure no data leakage (fit only on training data)
- [ ] Data scientists validate pipeline serializable and loadable
- [ ] Data scientists check transformed data saved

**Phase 5: Model Development & Training**
- [ ] Data scientists confirm baseline model trained
- [ ] Data scientists verify multiple models trained with cross-validation
- [ ] Data scientists ensure best model selected based on validation metric
- [ ] Data scientists validate hyperparameter tuning improves performance
- [ ] Data scientists check model artifacts saved with metadata

**Phase 6: Model Evaluation & Analysis**
- [ ] Data scientists confirm evaluation on held-out test set
- [ ] Data scientists verify error analysis complete
- [ ] Data scientists ensure feature importance extracted
- [ ] Data scientists validate performance meets requirements
- [ ] Data scientists check evaluation report documented

**Phase 7: Pipeline Productionization**
- [ ] Data scientists confirm end-to-end pipeline script created
- [ ] Data scientists verify training script executable
- [ ] Data scientists ensure inference script handles new data
- [ ] Data scientists validate pipeline runs without manual intervention
- [ ] Data scientists check all stages log properly

**Phase 8: Documentation & Knowledge Transfer**
- [ ] Data scientists confirm README updated with complete information
- [ ] Data scientists verify model card created with performance metrics
- [ ] Data scientists ensure usage examples provided
- [ ] Data scientists validate monitoring guidelines documented
- [ ] Data scientists check all artifacts organized and accessible

---

## EDA-MLP Progression Table

**Data scientists track pipeline maturity across phases**:

| Phase | Characteristic | Validation Method | Completion Criteria |
|-------|----------------|-------------------|---------------------|
| **0. Setup** | Database downloaded, structure created | Data loads without error | DataLoader passes all tests |
| **1. Environment** | Dependencies installed, configs created | Imports work, configs load | No import errors, config validation passes |
| **2. Data Loading** | Schema validated, quality profiled | Validation reports generated | All quality checks documented |
| **3. EDA** | Distributions analyzed, insights captured | Visualizations saved | Insights documented in markdown |
| **4. Preprocessing** | Features transformed, pipeline saved | Transformations validated | No data leakage, pipeline serializable |
| **5. Training** | Baseline + models trained, best selected | Cross-validation scores computed | Model artifacts saved with metadata |
| **6. Evaluation** | Test metrics computed, errors analyzed | Performance meets requirements | Evaluation report complete |
| **7. Productionization** | Scripts created, pipeline automated | End-to-end execution successful | Pipeline runs without intervention |
| **8. Documentation** | README, model card, guides written | Documentation complete | All stakeholders can reproduce |

---

## Role—Action—Outcome

**Role: Data Engineer**  
→ Action: creates data loading infrastructure, validates schema, profiles data quality, implements validation checks, documents data characteristics  
→ Outcome: delivers validated dataset through systematic quality assessment

**Role: Data Scientist**  
→ Action: conducts exploratory analysis, engineers features, trains models, evaluates performance, analyzes errors, documents findings  
→ Outcome: produces trained model through iterative experimentation

**Role: ML Engineer**  
→ Action: builds preprocessing pipelines, implements training scripts, creates inference endpoints, monitors model performance, maintains artifacts  
→ Outcome: deploys production system through automated orchestration

**Role: Research Scientist**  
→ Action: designs experiments, selects algorithms, tunes hyperparameters, validates statistical assumptions, compares model architectures  
→ Outcome: identifies optimal approach through systematic comparison

**Role: Product Manager**  
→ Action: defines success metrics, sets performance thresholds, validates business requirements, reviews model cards, approves deployment  
→ Outcome: ensures business alignment through stakeholder communication

**Role: Model Validator**  
→ Action: audits data quality, reviews preprocessing logic, validates evaluation methodology, checks reproducibility, verifies documentation completeness  
→ Outcome: maintains quality standards through systematic review

---

## Mantra Application

**"CID frames EDA-MLP standards, SRP isolates pipeline phases, RAO aligns data science workflows, SVO clarifies pipeline semantics"**

- **CID frames**: Establishes scope (data science workflow), purpose (model development with quality gates), rules (validate-analyze-transform-train-evaluate-deploy)
- **SRP isolates**: Ensures each phase handles single concern (load vs validate vs transform vs train vs evaluate), each function owns focused responsibility
- **RAO aligns**: Maps data engineers, data scientists, ML engineers, research scientists, product managers to their pipeline deliverables
- **SVO clarifies**: Expresses all pipeline operations (loader acquires data, validator ensures quality, trainer fits model, evaluator measures performance) with grammatical precision ensuring workflow clarity and preventing premature modeling

---

## Domain Applicability Matrix

**Data scientists apply EDA-MLP pattern across all ML domains**:

| Domain | Pipeline Application | Key Validation | Configuration Points |
|--------|---------------------|----------------|----------------------|
| **Computer Vision** | Load images → validate dimensions → augment → train CNN → evaluate mAP | Image dimensions consistent | Batch size, augmentation params |
| **Natural Language Processing** | Load text → validate encoding → tokenize → train transformer → evaluate perplexity | Token counts within limits | Vocab size, max sequence length |
| **Time Series Forecasting** | Load series → validate stationarity → create lags → train ARIMA → evaluate MAPE | No missing timestamps | Window size, forecast horizon |
| **Recommendation Systems** | Load interactions → validate sparsity → create embeddings → train collaborative filter → evaluate recall@k | User/item coverage sufficient | Embedding dim, negative samples |
| **Anomaly Detection** | Load normal data → validate distribution → detect outliers → train autoencoder → evaluate precision-recall | Contamination rate acceptable | Threshold, contamination factor |
| **Tabular Classification** | Load table → validate schema → encode categoricals → train XGBoost → evaluate F1 | No data leakage in encoding | Tree depth, learning rate |

---

## Universal EDA-MLP Pseudocode Template

**Data scientists use this template for any ML task**:

```
# ============================================================
# PHASE 0: SETUP & DATA ACQUISITION
# ============================================================
CREATE PROJECT_STRUCTURE
DOWNLOAD DATA_SOURCE
VALIDATE DATA_ACCESSIBILITY

# ============================================================
# PHASE 1: ENVIRONMENT SETUP
# ============================================================
CREATE VIRTUAL_ENVIRONMENT
INSTALL DEPENDENCIES
CREATE CONFIGURATION_FILES

# ============================================================
# PHASE 2: DATA LOADING & VALIDATION
# ============================================================
FUNCTION load_and_validate({ source_path, config }) -> { validated_data }
  """Load data and validate quality gates.
  
  Args:
    source_path: Path to data source
    config: Schema and quality expectations
    
  Returns:
    validated_data: Quality-checked dataset
  """
  raw_data <- load_from_source(source_path)
  validated_schema <- validate_schema(raw_data, config.expected_schema)
  quality_report <- profile_quality(validated_schema)
  
  IF quality_report.has_critical_issues():
    RAISE DataQualityError(quality_report.issues)
  
  RETURN validated_schema
END

# ============================================================
# PHASE 3: EXPLORATORY DATA ANALYSIS
# ============================================================
FUNCTION analyze_data({ dataframe, config }) -> { insights }
  """Conduct comprehensive EDA.
  
  Args:
    dataframe: Validated data
    config: Analysis configuration
    
  Returns:
    insights: Statistical findings and recommendations
  """
  univariate <- analyze_distributions(dataframe)
  bivariate <- analyze_relationships(dataframe, config.target_column)
  multivariate <- analyze_patterns(dataframe)
  
  recommendations <- generate_preprocessing_recommendations(
    univariate, bivariate, multivariate
  )
  
  RETURN {
    univariate: univariate,
    bivariate: bivariate,
    multivariate: multivariate,
    recommendations: recommendations
  }
END

# ============================================================
# PHASE 4: FEATURE ENGINEERING & PREPROCESSING
# ============================================================
FUNCTION create_preprocessing_pipeline({ config }) -> { pipeline }
  """Build preprocessing pipeline from configuration.
  
  Args:
    config: Preprocessing transformations
    
  Returns:
    pipeline: Fitted preprocessing pipeline
  """
  pipeline <- Pipeline([
    ("imputation", create_imputer(config.imputation)),
    ("scaling", create_scaler(config.scaling)),
    ("encoding", create_encoder(config.encoding)),
    ("engineering", create_feature_engineer(config.feature_engineering))
  ])
  
  RETURN pipeline
END

FUNCTION preprocess_data({ dataframe, pipeline, config }) -> { X_train, X_test, y_train, y_test }
  """Apply preprocessing and create train/test splits.
  
  Args:
    dataframe: Raw data
    pipeline: Preprocessing pipeline
    config: Split configuration
    
  Returns:
    X_train, X_test, y_train, y_test: Preprocessed splits
  """
  X <- dataframe.drop(columns=[config.target_column])
  y <- dataframe[config.target_column]
  
  X_train, X_test, y_train, y_test <- train_test_split(
    X, y,
    test_size=config.test_size,
    stratify=y IF config.stratify ELSE NULL,
    random_state=config.random_state
  )
  
  // FIT ONLY ON TRAINING DATA (prevent leakage)
  pipeline.fit(X_train, y_train)
  
  X_train_transformed <- pipeline.transform(X_train)
  X_test_transformed <- pipeline.transform(X_test)
  
  RETURN X_train_transformed, X_test_transformed, y_train, y_test
END

# ============================================================
# PHASE 5: MODEL DEVELOPMENT & TRAINING
# ============================================================
FUNCTION train_and_select_model({ X_train, y_train, config }) -> { best_model }
  """Train multiple models and select best performer.
  
  Args:
    X_train, y_train: Training data
    config: Model configurations
    
  Returns:
    best_model: Highest performing model
  """
  baseline <- train_baseline(X_train, y_train, config.task_type)
  baseline_score <- evaluate_with_cv(baseline, X_train, y_train, config)
  
  models <- {}
  
  FOR model_config IN config.candidate_models:
    model <- create_model(model_config.type, model_config.params)
    cv_score <- evaluate_with_cv(model, X_train, y_train, config)
    
    model.fit(X_train, y_train)
    models[model_config.name] <- { model: model, cv_score: cv_score }
  
  best_name <- argmax(models, key=lambda x: x.cv_score)
  best_model <- models[best_name].model
  
  log_info("Selected: " + best_name + " (CV: " + models[best_name].cv_score + ")")
  
  RETURN best_model
END

FUNCTION tune_model({ model, X_train, y_train, config }) -> { tuned_model }
  """Optimize hyperparameters via search.
  
  Args:
    model: Base model
    X_train, y_train: Training data
    config: Tuning configuration
    
  Returns:
    tuned_model: Optimized model
  """
  search <- create_search(
    model,
    config.param_grid,
    config.search_strategy,
    config.cv_folds
  )
  
  search.fit(X_train, y_train)
  
  log_info("Best params: " + search.best_params_)
  
  RETURN search.best_estimator_
END

# ============================================================
# PHASE 6: MODEL EVALUATION & ANALYSIS
# ============================================================
FUNCTION evaluate_model({ model, X_test, y_test, config }) -> { evaluation_report }
  """Comprehensive model evaluation.
  
  Args:
    model: Trained model
    X_test, y_test: Test data
    config: Evaluation metrics
    
  Returns:
    evaluation_report: Performance analysis
  """
  predictions <- model.predict(X_test)
  probabilities <- model.predict_proba(X_test) IF has_method(model, "predict_proba") ELSE NULL
  
  metrics <- compute_all_metrics(y_test, predictions, probabilities, config.metrics)
  error_analysis <- analyze_errors(y_test, predictions, probabilities)
  feature_importance <- extract_importance(model, X_test.columns)
  
  RETURN {
    metrics: metrics,
    error_analysis: error_analysis,
    feature_importance: feature_importance,
    predictions: predictions,
    probabilities: probabilities
  }
END

# ============================================================
# PHASE 7: PIPELINE PRODUCTIONIZATION
# ============================================================
FUNCTION create_inference_pipeline({ preprocessing_pipeline, model }) -> { inference_pipeline }
  """Combine preprocessing and model into inference pipeline.
  
  Args:
    preprocessing_pipeline: Fitted preprocessing
    model: Trained model
    
  Returns:
    inference_pipeline: End-to-end prediction pipeline
  """
  inference_pipeline <- Pipeline([
    ("preprocessing", preprocessing_pipeline),
    ("model", model)
  ])
  
  RETURN inference_pipeline
END

FUNCTION save_artifacts({ inference_pipeline, evaluation_report, config }) -> { artifact_paths }
  """Save all production artifacts.
  
  Args:
    inference_pipeline: Complete pipeline
    evaluation_report: Evaluation results
    config: Artifact configuration
    
  Returns:
    artifact_paths: Saved artifact locations
  """
  timestamp <- get_timestamp()
  
  model_path <- save_model(inference_pipeline, config.model_dir, timestamp)
  metadata_path <- save_metadata(evaluation_report, config.model_dir, timestamp)
  model_card_path <- create_model_card(evaluation_report, config.model_dir, timestamp)
  
  RETURN {
    model: model_path,
    metadata: metadata_path,
    model_card: model_card_path
  }
END

# ============================================================
# PHASE 8: DOCUMENTATION & KNOWLEDGE TRANSFER
# ============================================================
FUNCTION document_project({ project_info, evaluation_report, config }) -> { documentation }
  """Generate comprehensive project documentation.
  
  Args:
    project_info: Project metadata
    evaluation_report: Model performance
    config: Documentation configuration
    
  Returns:
    documentation: Generated docs
  """
  readme <- generate_readme(project_info, evaluation_report)
  model_card <- generate_model_card(evaluation_report)
  usage_guide <- generate_usage_guide(config)
  monitoring_guide <- generate_monitoring_guide(evaluation_report)
  
  RETURN {
    readme: readme,
    model_card: model_card,
    usage_guide: usage_guide,
    monitoring_guide: monitoring_guide
  }
END
```

**Data scientists document pipeline in responsibility table**:

| Module | Class/Object | Function/Method | Responsibility (S-V-O) | Dependencies | Artifacts/Outputs |
|--------|--------------|-----------------|------------------------|--------------|-------------------|
| `data.loader` | `DataLoader` | `load_and_validate` | Loader validates data via quality gates | `config.expected_schema` | `ValidatedData` |
| `analysis.eda` | `EDAAnalyzer` | `analyze_data` | Analyzer discovers patterns via statistical methods | `config.target_column` | `AnalysisInsights` |
| `preprocessing.pipeline` | `PreprocessingPipeline` | `preprocess_data` | Pipeline transforms features via fitted transformers | `config.transformations` | `ProcessedData` |
| `models.trainer` | `ModelTrainer` | `train_and_select_model` | Trainer selects model via cross-validation | `config.candidate_models` | `BestModel` |
| `models.tuner` | `HyperparameterTuner` | `tune_model` | Tuner optimizes params via grid search | `config.param_grid` | `TunedModel` |
| `evaluation.evaluator` | `ModelEvaluator` | `evaluate_model` | Evaluator measures performance via test metrics | `config.metrics` | `EvaluationReport` |
| `deployment.packager` | `ArtifactPackager` | `save_artifacts` | Packager persists models via serialization | `config.model_dir` | `SavedArtifacts` |

---

## Problems and Diagnostics

**Common EDA-MLP Issues**:
*   **Data Leakage**: Fitting transformers on entire dataset before splitting.
    *   *Diagnostic*: Check if pipeline.fit() called before train_test_split().
*   **Missing Baseline**: Training complex models without baseline comparison.
    *   *Diagnostic*: Verify baseline model trained and documented.
*   **Hardcoded Thresholds**: Magic numbers in preprocessing/model code.
    *   *Diagnostic*: grep for numeric literals in transformation code.
*   **No Error Analysis**: Deploying model without understanding failure modes.
    *   *Diagnostic*: Check if error analysis notebook/report exists.
*   **Reproducibility Issues**: Different results across runs due to missing random seeds.
    *   *Diagnostic*: Verify random_state set in all stochastic operations.

**Diagnostic Checklist**:
1.  Is data validated before any preprocessing?
2.  Are transformers fit only on training data?
3.  Is baseline model trained and compared?
4.  Are all hyperparameters in configuration files?
5.  Are random seeds set for reproducibility?
6.  Is error analysis conducted on test set?
7.  Are model artifacts saved with metadata?
8.  Is model card documenting performance?

---

## Reproducibility Requirements

**Data scientists ensure reproducible pipelines**:

**Random Seed Management**
- Set random seeds for: train/test split, model initialization, cross-validation folds, data shuffling
- Document seed values in configuration files
- Verify results consistent across multiple runs

**Dependency Versioning**
- Pin exact versions in requirements.txt (e.g., `scikit-learn==1.3.0`)
- Document Python version used
- Consider containerization (Docker) for complete environment capture

**Data Versioning**
- Version control data with DVC or similar tools
- Document data source and extraction timestamp
- Save data hashes/checksums for validation

**Artifact Tracking**
- Version models with timestamps or semantic versions
- Link models to code commits (git SHA)
- Track hyperparameters used for each model

**Pipeline Documentation**
- Document exact sequence of transformations
- Record preprocessing parameters applied
- Save feature names and importance rankings

---

## Configuration-Driven Development

**Data scientists externalize all tunable parameters**:

**Data Configuration** (`config/data_config.yaml`):
```yaml
data_sources:
  train: "data/raw/train.csv"
  test: "data/raw/test.csv"

schema:
  target_column: "label"
  expected_columns: 47
  expected_dtypes:
    feature_1: "float64"
    label: "int64"

validation:
  max_missing_pct: 0.10
  min_class_ratio: 0.30

splitting:
  test_size: 0.2
  validation_size: 0.1
  random_state: 42
  stratify: true
```

**Preprocessing Configuration** (`config/preprocessing_config.yaml`):
```yaml
imputation:
  numeric:
    strategy: "median"
  categorical:
    strategy: "mode"
  add_missing_indicator: true

scaling:
  method: "standard"
  features_to_scale: []

encoding:
  onehot:
    features: []
  target:
    features: ["high_cardinality_feature"]
    smoothing: 1.0

feature_engineering:
  transformations:
    log: ["income", "debt"]
  polynomial:
    enabled: false
```

**Model Configuration** (`config/model_config.yaml`):
```yaml
model:
  type: "xgboost"
  params:
    n_estimators: 100
    max_depth: 6
    learning_rate: 0.1
    random_state: 42

training:
  cv_folds: 5
  scoring: "f1_weighted"
  random_state: 42

hyperparameter_tuning:
  method: "grid_search"
  param_grid:
    n_estimators: [50, 100, 200]
    max_depth: [3, 6, 10]
    learning_rate: [0.01, 0.1, 0.3]

metrics:
  primary: "f1"
  additional:
    - "accuracy"
    - "precision"
    - "recall"
    - "roc_auc"
```

**Benefits**:
- Change parameters without code modification
- Version control configurations separately from code
- A/B test different configurations easily
- Share configurations across team members
- Document parameter choices for reproducibility

---

## End-to-End Example: Classification Pipeline

**Complete pipeline demonstrating all phases**:

```python
# ============================================================
# PHASE 0-1: SETUP
# ============================================================
from src.utils.config_loader import load_config
from src.data.data_loader import load_data
from src.data.data_validator import validate_data
from src.preprocessing.pipeline import PreprocessingPipeline
from src.models.trainer import ModelTrainer
from src.models.evaluator import ModelEvaluator

# Load configurations
data_config = load_config('config/data_config.yaml')
preprocessing_config = load_config('config/preprocessing_config.yaml')
model_config = load_config('config/model_config.yaml')

# ============================================================
# PHASE 2: DATA LOADING & VALIDATION
# ============================================================
df_train = load_data(data_config, split='train')
df_test = load_data(data_config, split='test')

validation_report = validate_data(df_train, data_config)
if not validation_report['is_valid']:
    raise DataQualityError(validation_report['errors'])

# ============================================================
# PHASE 3: EDA (in notebook)
# ============================================================
# Conducted in eda.ipynb, insights documented

# ============================================================
# PHASE 4: PREPROCESSING
# ============================================================
target_col = data_config['schema']['target_column']
X_train = df_train.drop(columns=[target_col])
y_train = df_train[target_col]
X_test = df_test.drop(columns=[target_col])
y_test = df_test[target_col]

pipeline = PreprocessingPipeline(preprocessing_config)
pipeline.fit(X_train, y_train)  # FIT ONLY ON TRAINING

X_train_transformed = pipeline.transform(X_train)
X_test_transformed = pipeline.transform(X_test)

# ============================================================
# PHASE 5: MODEL TRAINING
# ============================================================
trainer = ModelTrainer(
    cv_folds=model_config['training']['cv_folds'],
    scoring=model_config['training']['scoring']
)

# Train baseline
baseline = train_baseline(X_train_transformed, y_train, task='classification')

# Train candidate models
model = create_model(
    model_config['model']['type'],
    task='classification',
    **model_config['model']['params']
)

cv_results = trainer.train_with_cv(model, X_train_transformed, y_train)
print(f"CV Score: {cv_results['cv_mean_test']:.4f}")

# ============================================================
# PHASE 6: EVALUATION
# ============================================================
evaluator = ModelEvaluator(task='classification')

y_pred = model.predict(X_test_transformed)
y_pred_proba = model.predict_proba(X_test_transformed)

test_metrics = evaluator.calculate_metrics(y_test, y_pred, y_pred_proba)
print(f"Test F1: {test_metrics['f1']:.4f}")

error_analysis = analyze_errors(y_test, y_pred, y_pred_proba)
feature_importance = evaluator.extract_feature_importance(model, X_train_transformed.columns)

# ============================================================
# PHASE 7: SAVE ARTIFACTS
# ============================================================
import joblib
from datetime import datetime

timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')

# Save model
joblib.dump(model, f'models/model_{timestamp}.pkl')

# Save preprocessing pipeline
pipeline.save(f'models/preprocessing_pipeline_{timestamp}.pkl')

# Save metadata
metadata = {
    'timestamp': timestamp,
    'model_type': model_config['model']['type'],
    'cv_score': cv_results['cv_mean_test'],
    'test_metrics': test_metrics
}
save_json(metadata, f'models/metadata_{timestamp}.json')

# ============================================================
# PHASE 8: DOCUMENTATION
# ============================================================
# Model card created, README updated, usage guide written
```

---

## Summary: EDA-MLP Pattern Principles

**Data scientists follow these core principles**:

1. **Validate Before Process**: Check data quality before any transformation
2. **Profile Before Transform**: Understand distributions before engineering features
3. **Baseline Before Complex**: Establish simple baseline before complex models
4. **Cross-Validate Before Test**: Use CV for model selection, test set for final evaluation
5. **Fit on Train Only**: Prevent data leakage by fitting transformers only on training data
6. **Configure Everything**: Externalize all parameters to configuration files
7. **Reproduce Everything**: Set seeds, version data/code/models, document decisions
8. **Evaluate Comprehensively**: Analyze errors, extract importance, validate requirements
9. **Document Continuously**: Write insights as understanding evolves
10. **Iterate Systematically**: Follow phase progression, validate each step

**The pattern ensures**:
- **Quality**: Data validation gates prevent garbage-in-garbage-out
- **Reproducibility**: Configuration + seeds + versioning enable exact reproduction
- **Reliability**: Cross-validation + test evaluation + error analysis reveal true performance
- **Maintainability**: Modular design + documentation enable long-term support
- **Adaptability**: Configuration-driven approach enables easy experimentation

---

**End of EDA-MLP Pattern Guidelines**

---

## Prompt_202601150800

### 01

```
refer to `scaffolding-pattern-guidelines.md` template,
generate `eda-mlp-pattern-guidelines.md`
```

```
I'll create a comprehensive EDA-MLP pattern guidelines document following the scaffolding template structure.I've created a comprehensive **EDA-MLP Pattern Guidelines** document that adapts the scaffolding template to data science workflows. Here are the key highlights:

## **Structure Maintained from Template:**

1. **Context & Intent**: Adapted to incremental data science workflows
2. **Core Mandate**: Validates-before-process approach
3. **Universal Sequence**: 10-step EDA-MLP pipeline progression
4. **S-V-O Pattern**: Applied throughout (e.g., "Loader acquires data via connection", "Validator ensures quality via schema checks")
5. **Specification Examples**: Four detailed examples covering the full pipeline
6. **Validation Checklists**: Phase-by-phase requirements (0-8)
7. **Progression Table**: Tracks pipeline maturity
8. **Role-Action-Outcome**: Data science team roles mapped

## **EDA-MLP Specific Adaptations:**

**Four Detailed Pipeline Examples:**
1. **Data Validation Pipeline**: Load → validate schema → check quality → profile → report
2. **Feature Engineering Pipeline**: Analyze distributions → implement transformations → validate output
3. **Model Training Pipeline**: Establish baseline → train candidates → select best → tune hyperparameters
4. **Model Evaluation Pipeline**: Evaluate test set → analyze errors → extract importance → validate requirements

**Anti-Pattern Guards:**
- ❌ Training before validation → ✅ Validate-profile-preprocess-train
- ❌ Hardcoded transformations → ✅ Configuration-driven preprocessing
- ❌ Skipping baseline → ✅ Baseline before complex models
- ❌ Data leakage → ✅ Fit only on training data

**Phase-by-Phase Validation** (8 comprehensive checklists covering setup through documentation)

**Universal Template** with complete pseudocode showing all 8 phases

**Configuration-Driven Development** section with YAML examples for data, preprocessing, and model configs

**Reproducibility Requirements** detailing seed management, versioning, and artifact tracking

The document maintains the same rigor and structure as the scaffolding template while being specifically tailored to data science/ML workflows!
```

## 02

```
generate max LOD mermaid.js for  "EDA-MLP Pattern Guidelines":
- Node: Implementation Step (Keyword); 
- Edge: Action/Attribute (active verb);
- Subgraph: Phase (key concept)
```

```
I'll create a maximum LOD Mermaid.js diagram for the EDA-MLP Pattern Guidelines.I've created a comprehensive maximum LOD Mermaid.js flowchart for the EDA-MLP Pattern Guidelines. Here are the key features:

## **Structure:**

**Nodes (Implementation Steps - Keywords):**
- Each node represents a specific implementation action
- Examples: "Download Database", "Validate Schema", "Calculate Correlations", "Train Baseline", "Extract Feature Importance"
- Total of ~180+ detailed implementation steps across all phases

**Edges (Actions/Attributes - Active Verbs):**
- Every edge describes the specific action or transformation
- Examples: "curl/wget source", "check 47 columns", "compute mean/std/skewness", "fit(X_train, y_train)", "plot bar charts"
- Shows exactly what happens between each step

**Subgraphs (9 Phases):**
- **Phase 0**: Setup & Data Acquisition
- **Phase 1**: Environment Setup & Configuration  
- **Phase 2**: Data Loading & Validation
- **Phase 3**: Exploratory Data Analysis
- **Phase 4**: Feature Engineering & Preprocessing
- **Phase 5**: Model Development & Training
- **Phase 6**: Model Evaluation & Analysis
- **Phase 7**: Pipeline Productionization
- **Phase 8**: Documentation & Knowledge Transfer

## **Key Workflows Captured:**

**Data Quality Gates:**
- Load → Detect Format → Validate Schema → Check Nulls/Duplicates → Profile → Report

**EDA Progression:**
- Univariate (histograms/boxplots/stats) → Bivariate (correlations/tests) → Multivariate (PCA/clustering)

**Preprocessing Chain:**
- Impute → Engineer → Encode → Scale (with validation at each step)

**Model Development:**
- Baseline → Train Candidates → Compare → Select Best → Tune → Save

**Production Pipeline:**
- Extract Code → Create Scripts → Test → Document

The flowchart provides a complete visual roadmap for implementing professional ML pipelines following EDA-MLP best practices!
```

## 03
