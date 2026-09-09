# RoadSafe AI — Machine Learning & Plumber REST API Backend in R

This directory contains the R machine learning pipeline and Plumber REST API server for the **RoadSafe AI** platform.

## Architecture

```
backend_r/
├── plumber.R            # Plumber REST API endpoints
├── train_model.R        # Model training & cross-validation script
├── start_api.R          # API server runner on port 8000
├── sample_accidents.csv # Historical crash telemetry dataset (5,000+ records)
└── models/              # Serialized R model artifacts (.rds & .json metrics)
    ├── severity_rf_model.rds
    ├── severity_dt_model.rds
    └── model_metrics.json
```

## Prerequisites

Ensure **R** (>= 4.0) is installed. Required R packages:
```r
install.packages(c("plumber", "jsonlite", "randomForest", "rpart", "nnet"))
```

## Running the Machine Learning Training Pipeline

To train the Random Forest, Decision Tree, and Logistic Regression models and evaluate metrics on test data:
```bash
Rscript backend_r/train_model.R
```

This will automatically generate:
- `backend_r/models/severity_rf_model.rds`
- `backend_r/models/severity_dt_model.rds`
- `backend_r/models/model_metrics.json`

## Starting the Plumber REST API Server

To start the REST API on `http://127.0.0.1:8000`:
```bash
Rscript backend_r/start_api.R
```

## API Endpoints

- `GET  /api/health` — Check server status & loaded R models
- `GET  /api/overview` — Executive KPIs, severity distribution & peak hourly insight
- `GET  /api/trends` — Monthly / temporal accident progression
- `GET  /api/hotspots` — Geospatial coordinates, risk levels & contributing factors
- `GET  /api/risk-factors` — Feature importance ranking (Mean Decrease Gini)
- `GET  /api/model-performance` — Accuracy, Precision, Recall, F1, ROC-AUC benchmarks
- `POST /api/predict` — Severity prediction, risk score (0-100), XAI attribution & recommendations
- `GET  /api/recommendations` — Prioritized authority interventions & policy actions

The React frontend automatically connects to `http://127.0.0.1:8000` when running, and gracefully falls back to its built-in browser engine when the R server is offline.
