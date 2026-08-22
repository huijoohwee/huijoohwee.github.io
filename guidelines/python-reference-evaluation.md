---
title: "Python Reference: Model Evaluation Module"
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

# Python Reference: Model Evaluation Module

## Scope & Ownership

Owns evaluation and error analysis: confusion matrices, confidence stratification, ROC and PR curves, and threshold selection.

This module is loaded on demand from [Python Reference Guide](./python-reference-guide.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
