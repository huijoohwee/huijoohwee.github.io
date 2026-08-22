---
title: "Python Reference: Productionization Module"
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

# Python Reference: Productionization Module

## Scope & Ownership

Owns pipeline productionization: entry points, artefact persistence, and run metadata.

This module is loaded on demand from [Python Reference Guide](./python-reference-guide.md), which keeps the binding rules and the index. It carries one responsibility and stays under the 600-line file budget.

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
