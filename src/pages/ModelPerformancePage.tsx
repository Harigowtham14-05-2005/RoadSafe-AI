import React, { useState, useEffect } from 'react';
import { ModelComparisonTable } from '../components/models/ModelComparisonTable';
import { ConfusionMatrixView } from '../components/models/ConfusionMatrixView';
import { ChartCard } from '../components/common/ChartCard';
import { analyticsService } from '../services/analyticsService';
import { ModelPerformanceData } from '../types/model';
import { Cpu, CheckCircle2, Star, Zap, Gauge, Award, Layers } from 'lucide-react';
import { useApiConfig } from '../context/ApiConfigContext';

export const ModelPerformancePage: React.FC = () => {
  const { activeProductionModel, setActiveProductionModel } = useApiConfig();
  const [modelData, setModelData] = useState<ModelPerformanceData | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>('Random Forest (R Package)');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await analyticsService.getModelPerformance();
        setModelData(data);
      } catch (err) {
        console.error('Failed to load model performance:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading || !modelData) {
    return <div className="p-8 text-center text-slate-500">Loading ML Model Diagnostics in R...</div>;
  }

  const activeModelDetails = modelData.models.find(m => m.model === selectedModel) || modelData.models[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Cpu size={20} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Machine Learning Model Performance & Evaluation in R
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Comparative multi-class classifier benchmarks, confusion matrices, and ROC-AUC metrics trained in R.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-xl bg-slate-900 text-white flex items-center gap-2 text-xs">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold">Active Model:</span>
            <span className="text-blue-300 font-semibold">{activeProductionModel}</span>
          </div>
        </div>
      </div>

      {/* 4 Summary Metric Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Production Accuracy</span>
          <p className="text-2xl font-extrabold text-blue-600">{(activeModelDetails.accuracy * 100).toFixed(1)}%</p>
          <span className="text-[10px] text-slate-500 font-medium">Test Set (4,917 Crashes)</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">ROC-AUC Discrimination</span>
          <p className="text-2xl font-extrabold text-emerald-600">{activeModelDetails.roc_auc.toFixed(3)}</p>
          <span className="text-[10px] text-slate-500 font-medium">Multi-class Macro OvR</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Macro F1 Score</span>
          <p className="text-2xl font-extrabold text-slate-900">{activeModelDetails.f1_score.toFixed(3)}</p>
          <span className="text-[10px] text-slate-500 font-medium">Harmonic Mean of P & R</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-card space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Inference Latency</span>
          <p className="text-2xl font-extrabold text-slate-900">18 ms</p>
          <span className="text-[10px] text-slate-500 font-medium">Plumber REST API Endpoint</span>
        </div>
      </div>

      {/* Model Benchmark Comparison Table */}
      <ChartCard
        title="Model Benchmark & Cross-Validation Matrix"
        subtitle="Evaluation of candidate architectures trained in R on identical train/test splits"
        infoTooltip="Random Forest is currently designated production default due to its resistance to overfitting on high-dimensional interactions."
      >
        <ModelComparisonTable
          models={modelData.models}
          selectedModel={selectedModel}
          onSelectModel={(name) => {
            setSelectedModel(name);
            setActiveProductionModel(name);
          }}
        />
      </ChartCard>

      {/* Confusion Matrix & Classification Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Confusion Matrix */}
        <ChartCard
          title="Multi-Class Confusion Matrix (Test Set)"
          subtitle="Ground Truth vs. AI Model Prediction Matrix"
          infoTooltip="Diagonal cells indicate correctly classified instances. Minor class exhibits highest recall due to high baseline sample frequency."
        >
          <ConfusionMatrixView
            matrix={modelData.confusion_matrix.matrix}
            labels={modelData.confusion_matrix.labels}
          />
        </ChartCard>

        {/* Selected Model Deep Dive Card */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400">Architecture Profile</span>
                <h3 className="font-bold text-base text-slate-900">{activeModelDetails.model}</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                {activeModelDetails.is_production ? 'Active Production' : 'Candidate'}
              </span>
            </div>

            <div className="space-y-3 mt-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-700 block mb-1">Architectural Strengths:</span>
                <p className="text-slate-600 leading-relaxed">{activeModelDetails.strengths}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                  <span className="text-slate-400 block text-[10px]">Precision</span>
                  <span className="font-bold text-slate-900">{(activeModelDetails.precision * 100).toFixed(1)}%</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                  <span className="text-slate-400 block text-[10px]">Recall / Sensitivity</span>
                  <span className="font-bold text-slate-900">{(activeModelDetails.recall * 100).toFixed(1)}%</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                  <span className="text-slate-400 block text-[10px]">Training Time</span>
                  <span className="font-bold text-slate-900">{activeModelDetails.training_time_sec} sec</span>
                </div>
                <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                  <span className="text-slate-400 block text-[10px]">Serialized Format</span>
                  <span className="font-bold text-slate-900">.rds (R Model)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-blue-950 flex items-center justify-between">
            <span className="font-semibold">Make this model the active inference engine</span>
            <button
              onClick={() => setActiveProductionModel(activeModelDetails.model)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm transition-colors"
            >
              Set as Production
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
