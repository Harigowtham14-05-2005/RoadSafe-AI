# ==============================================================================
# RoadSafe AI - Start Plumber REST API Server
# ==============================================================================
# Run this script using:
#   Rscript backend_r/start_api.R
# Or in an R console:
#   source("backend_r/start_api.R")
# ==============================================================================

if (!requireNamespace("plumber", quietly = TRUE)) {
  install.packages("plumber", repos = "https://cloud.r-project.org")
}

library(plumber)

plumber_file <- "backend_r/plumber.R"
if (!file.exists(plumber_file) && file.exists("plumber.R")) {
  plumber_file <- "plumber.R"
}

cat("=================================================================\n")
cat("  Starting RoadSafe AI Plumber REST API on http://127.0.0.1:8000\n")
cat("=================================================================\n")
cat("  Endpoints available:\n")
cat("    - GET  /api/health\n")
cat("    - GET  /api/overview\n")
cat("    - GET  /api/trends\n")
cat("    - GET  /api/hotspots\n")
cat("    - GET  /api/risk-factors\n")
cat("    - GET  /api/model-performance\n")
cat("    - POST /api/predict\n")
cat("    - GET  /api/recommendations\n")
cat("=================================================================\n\n")

pr <- pr(plumber_file)
pr$run(host = "0.0.0.0", port = 8000, docs = TRUE)
