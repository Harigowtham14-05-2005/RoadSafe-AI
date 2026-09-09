# 🛡️ RoadSafe AI — Road Accident Severity Prediction & Safety Analytics

[![React](https://img.shields.io/badge/Frontend-React%2019%20%7C%20TypeScript%20%7C%20Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![R Backend](https://img.shields.io/badge/Backend-R%20%7C%20Plumber%20API%20%7C%20ML-276DC3?logo=r&logoColor=white)](https://www.r-project.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Maps-Leaflet%20GIS-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**RoadSafe AI** is an end-to-end intelligent road safety platform and decision support system designed to predict traffic accident severity, identify high-risk collision hotspots, explain risk factors using Machine Learning (XAI), and deliver actionable engineering and policy recommendations to transport authorities.

---

## 🌟 Key Features

- 🧠 **Real-Time Accident Severity Prediction:** Predicts collision severity (*Minor*, *Serious*, *Fatal*) along with calibrated class probabilities using environmental, temporal, and road infrastructure telemetry.
- 🔍 **Explainable AI (XAI) Attribution:** Breaks down why an accident outcome is predicted, pinpointing exact percentage risk contributions from speed limits, surface conditions, weather, illumination, and intersection geometry.
- 🗺️ **Geospatial Hotspot Intelligence:** Interactive Leaflet GIS mapping with dynamic risk filters, cluster markers, accident density overlays, and location-specific intervention plans.
- 📈 **Temporal & Statistical Analytics:** In-depth multi-dimensional trend charts (monthly progression, peak hourly hazard windows, casualty ratios, weather correlations) powered by Recharts.
- 🤖 **ML Model Benchmarking Suite:** Side-by-side performance evaluation of **Random Forest**, **XGBoost**, **Decision Trees (CART)**, and **Multinomial Logistic Regression** with full Confusion Matrices, ROC-AUC curves, Precision, Recall, and F1-Scores.
- 🛡️ **Automated Safety Interventions:** Context-aware engineering and policy recommendations (speed calming, anti-skid resurfacing, lighting upgrades, fog arrays) prioritized by severity and impact score.
- 📊 **Reports & Data Export:** Automated PDF and Excel table generation for road safety audits and executive stakeholders.
- ⚡ **Dual-Mode Hybrid Architecture:** Connects to an **R Plumber REST API server** with automatic, seamless fallback to a client-side simulation engine when offline.

---

## 🏗️ System Architecture

```
                                  ┌────────────────────────┐
                                  │      User Browser      │
                                  └───────────┬────────────┘
                                              │
                                              ▼
                        ┌───────────────────────────────────────────┐
                        │   React 19 + TypeScript + Tailwind UI    │
                        │   (Vite HMR, Leaflet GIS, Recharts)       │
                        └─────────────┬─────────────────┬───────────┘
                                      │                 │
              [HTTP / REST]           │                 │ [Offline Fallback]
                                      ▼                 ▼
             ┌────────────────────────────────┐   ┌───────────────────────┐
             │    R Plumber REST API Server   │   │ Built-in Client Engine │
             │    (Port 8000 / plumber.R)     │   │ (Simulated ML & Data) │
             └───────────────┬────────────────┘   └───────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│ Machine Learning Models│        │ Historical Crash Data │
│ (Random Forest / CART)│         │ (sample_accidents.csv)│
│ (.rds Model Binaries) │         │ (5,000+ records)      │
└───────────────────────┘         └───────────────────────┘
```

---

## 📁 Repository Structure

```
RoadSafe-AI/
├── backend_r/                     # R Machine Learning & Plumber API Engine
│   ├── plumber.R                 # Plumber REST API routing & endpoints
│   ├── train_model.R             # Model training, evaluation & .rds export
│   ├── start_api.R               # API launcher on port 8000
│   ├── sample_accidents.csv      # Historical accident telemetry dataset
│   ├── README.md                 # Dedicated backend documentation
│   └── models/                   # Serialized ML artifacts & metrics JSON
│       ├── severity_rf_model.rds
│       ├── severity_dt_model.rds
│       └── model_metrics.json
├── src/                          # React + TypeScript Frontend Application
│   ├── components/               # UI components (Analytics, Maps, Layout, Prediction, Models)
│   │   ├── analytics/            # Chart cards, metrics, filters
│   │   ├── common/               # Badges, modal dialogs, KPI cards
│   │   ├── layout/               # Sidebar, TopNavbar, AppLayout
│   │   ├── maps/                 # Leaflet Map components & hotspot layers
│   │   ├── models/               # Model comparison cards & confusion matrix
│   │   ├── prediction/           # Prediction form, gauge charts & XAI cards
│   │   └── reports/              # Report download & preview components
│   ├── context/                  # App state & R Plumber API config contexts
│   ├── pages/                    # 11 distinct view pages (Overview, Prediction, Hotspots, etc.)
│   ├── services/                 # API service connector, fallback mock data & utilities
│   ├── types/                    # TypeScript interfaces for accident, prediction & ML models
│   ├── App.tsx                   # Application routing and provider tree
│   ├── index.css                 # Global Tailwind styles & custom animations
│   └── main.tsx                  # React DOM entrypoint
├── public/                       # Static public assets, icons, SVGs
├── create_excel_tables.py        # Python script for Excel audit table generation
├── generate_data.py              # Synthetic crash dataset generator
├── generate_pdf_report.py        # Automated PDF report compiler
├── architecture_diagram.svg      # System architecture vector visual
├── package.json                  # Node.js dependencies and scripts
├── tailwind.config.js            # Tailwind CSS design system configuration
├── tsconfig.json                 # TypeScript compiler configuration
├── vite.config.ts                # Vite build configuration
└── README.md                     # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.0` or higher
- **npm**: `v9.0` or higher
- **R**: `v4.0` or higher *(Optional for frontend preview, required for live R backend)*

---

### 1. Frontend Setup (React + Vite)

```bash
# Clone the repository
git clone https://github.com/Harigowtham14-05-2005/RoadSafe-AI.git
cd RoadSafe-AI

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

The application will be available at **`http://localhost:5173`**.

---

### 2. Backend & Machine Learning Engine Setup (R + Plumber)

Open a separate terminal window to train the R models and start the Plumber REST API server:

```bash
# Install required R packages (run inside R console or Rscript)
Rscript -e 'install.packages(c("plumber", "jsonlite", "randomForest", "rpart", "nnet"), repos="https://cloud.r-project.org")'

# Train the Machine Learning models (generates .rds files in backend_r/models/)
Rscript backend_r/train_model.R

# Start the Plumber REST API server (runs on port 8000)
Rscript backend_r/start_api.R
```

The R backend API will start at **`http://127.0.0.1:8000`**. The React dashboard will automatically detect the live R server and show a green **"R Plumber API Connected"** badge in the sidebar.

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check, server uptime, loaded model status, record count |
| `GET` | `/api/overview` | Executive KPI cards, severity distribution & peak hourly hazard text |
| `GET` | `/api/trends` | Temporal trends by month, casualty volume, and calculated risk index |
| `GET` | `/api/hotspots` | Geospatial collision coordinates, risk levels, and contributing factors |
| `GET` | `/api/risk-factors` | Feature importance ranking computed via Random Forest Mean Decrease Gini |
| `GET` | `/api/model-performance` | Accuracy, precision, recall, F1, ROC-AUC, and Confusion Matrix benchmarks |
| `POST` | `/api/predict` | Live severity classification, class probabilities, and XAI factor attribution |
| `GET` | `/api/recommendations` | Prioritized structural & enforcement intervention recommendations |

---

## 🔬 Machine Learning Model Benchmarks

| Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Random Forest Classifier** | **87.4%** | **86.2%** | **85.1%** | **85.6%** | **0.932** | 🚀 **Production** |
| **XGBoost Classifier** | 88.1% | 86.9% | 85.8% | 86.3% | 0.941 | 🔬 Benchmark |
| **Decision Tree (CART)** | 81.2% | 79.5% | 78.1% | 78.8% | 0.845 | 📋 Interpretable |
| **Multinomial Logistic Reg.** | 78.4% | 76.1% | 74.8% | 75.4% | 0.812 | 📐 Baseline |

---

## 🛠️ Tech Stack & Libraries

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, React Router v7, Lucide Icons
- **Mapping & Charts:** Leaflet, React-Leaflet, Recharts
- **Backend & ML:** R, Plumber, `randomForest`, `rpart`, `nnet`, `jsonlite`
- **Data Engineering:** Python (pandas, reportlab, openpyxl)

---

## 📄 License

This project is licensed under the **MIT License**.
