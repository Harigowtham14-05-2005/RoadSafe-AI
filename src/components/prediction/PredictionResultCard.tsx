import React from 'react';
import { PredictionResponse } from '../../types/prediction';
import { SeverityBadge } from '../common/SeverityBadge';
import { RiskBadge } from '../common/RiskBadge';
import { AlertCircle, Gauge, Cpu, CheckCircle2, ShieldAlert } from 'lucide-react';

interface PredictionResultCardProps {
  result: PredictionResponse;
}

export const PredictionResultCard: React.FC<PredictionResultCardProps> = ({ result }) => {
  const { severity, risk_score, risk_level, probabilities, model_version, inference_time_ms } = result;

  const getSeverityGlow = () => {
    switch (severity.toLowerCase()) {
      case 'fatal':
        return 'border-red-300 shadow-glow-red bg-gradient-to-b from-red-50/60 to-white';
      case 'serious':
        return 'border-amber-300 shadow-glow-amber bg-gradient-to-b from-amber-50/60 to-white';
      case 'minor':
      default:
        return 'border-emerald-300 shadow-glow-green bg-gradient-to-b from-emerald-50/60 to-white';
    }
  };

  const getRiskScoreBarColor = () => {
    if (risk_score >= 85) return 'bg-red-600';
    if (risk_score >= 70) return 'bg-amber-600';
    if (risk_score >= 45) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  return (
    <div className={`rounded-2xl border p-6 transition-all duration-300 ${getSeverityGlow()}`}>
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
        {/* Left: Severity Outcome */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Predicted Crash Severity
            </span>
            <span className="text-[10px] text-slate-400 font-medium">({inference_time_ms || 18}ms)</span>
          </div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {severity.toUpperCase()}
            </h2>
            <SeverityBadge severity={severity} size="lg" />
            <RiskBadge level={risk_level} score={risk_score} size="lg" />
          </div>
          <p className="text-xs text-slate-600 max-w-xl">
            {severity === 'Fatal' && 'High fatality risk detected. Physical crash forces exceed threshold survivability without structural containment.'}
            {severity === 'Serious' && 'Serious injury risk anticipated. Hospitalization and immediate heavy extrication equipment required.'}
            {severity === 'Minor' && 'Low crash energy profile. Expected outcome limited to vehicle property damage and minor abrasions.'}
          </p>
        </div>

        {/* Right: Risk Score Gauge Box */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-w-[240px]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Gauge size={15} className="text-blue-600" />
              Composite Risk Score
            </span>
            <span className="font-extrabold text-base text-slate-900">{risk_score}<span className="text-xs text-slate-400 font-normal">/100</span></span>
          </div>
          
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden p-0.5 border border-slate-200">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${getRiskScoreBarColor()}`}
              style={{ width: `${risk_score}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
            <span>Low (0)</span>
            <span>Medium (45)</span>
            <span>High (70)</span>
            <span>Critical (100)</span>
          </div>
        </div>
      </div>

      {/* Multiclass Probability Distribution */}
      <div className="pt-6">
        <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span>Calibrated Class Probabilities</span>
          <span className="text-[10px] text-slate-400 font-normal">(Random Forest Softmax)</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Minor Probability */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-emerald-700">Minor Outcome</span>
              <span className="text-sm font-extrabold text-slate-900">
                {Math.round(probabilities.Minor * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.round(probabilities.Minor * 100)}%` }}
              />
            </div>
          </div>

          {/* Serious Probability */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-amber-700">Serious Injury</span>
              <span className="text-sm font-extrabold text-slate-900">
                {Math.round(probabilities.Serious * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.round(probabilities.Serious * 100)}%` }}
              />
            </div>
          </div>

          {/* Fatal Probability */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-red-700">Fatal Fatality</span>
              <span className="text-sm font-extrabold text-slate-900">
                {Math.round(probabilities.Fatal * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-red-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.round(probabilities.Fatal * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
