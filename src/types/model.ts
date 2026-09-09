export interface ModelEvaluationItem {
  model: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1_score: number;
  roc_auc: number;
  training_time_sec: number;
  is_production: boolean;
  strengths: string;
}

export interface ConfusionMatrixRow {
  actual: string;
  Minor: number;
  Serious: number;
  Fatal: number;
  recall: number;
}

export interface FeatureImportanceItem {
  rank: number;
  feature: string;
  importance: number;
  category: 'Roadway' | 'Environment' | 'Accident' | 'Spatial' | 'Human' | 'Other';
  impact: 'High' | 'Medium' | 'Low';
  description: string;
}

export interface ModelPerformanceData {
  production_model: string;
  training_timestamp: string;
  total_training_samples: number;
  total_test_samples: number;
  models: ModelEvaluationItem[];
  confusion_matrix: {
    labels: string[];
    matrix: ConfusionMatrixRow[];
  };
}
