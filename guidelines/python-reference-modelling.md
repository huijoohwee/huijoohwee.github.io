---
title: "Python Reference: Model Development Module"
doc_type: "Guidelines Module"
version: "1.0.0"
date: "2026-08-20"
lang: "en-US"
frontmatter_contract: "required"
owner: "Technical Writer function"
local_rung: "spec-complete"
delivered_rung: "undocumented"
lane: "authoring"
universal_scope: "true"
parent: "Python Reference Guide"
parent_version: "1.0.0"
---

# Python Reference: Model Development Module

## Scope & Ownership

Owns model development and training: splitting, baselines, cross-validation, tuning, importance, and class balance.

This module is loaded on demand from [Python Reference Guide](./python-reference-guide.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
