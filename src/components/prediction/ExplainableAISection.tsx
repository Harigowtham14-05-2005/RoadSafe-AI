import React from 'react';
import { ContributingFactor } from '../../types/prediction';
import { BrainCircuit, AlertCircle, HelpCircle, ArrowUpRight } from 'lucide-react';

interface ExplainableAISectionProps {
  factors: ContributingFactor[];
  explanationSummary: string;
}

export const ExplainableAISection: React.FC<ExplainableAISectionProps> = ({
  factors,
  explanationSummary
}) => {
  const getImpactBadge = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return {
          badge: 'bg-red-50 text-red-700 border-red-200',
          dot: 'bg-red-600',
          bar: 'bg-red-500'
        };
      case 'medium':
        return {
          badge: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          bar: 'bg-amber-500'
        };
      case 'low':
      default:
        return {
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          bar: 'bg-emerald-500'
        };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
            <BrainCircuit size={18} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Why did the model make this prediction?
            </h3>
            <p className="text-xs text-slate-500">
              Explainable AI (XAI) feature attribution & directional risk contributions
            </p>
          </div>
        </div>
        <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-slate-100 text-slate-600">
          SHAP Value Decomposition
        </span>
      </div>

      {/* Feature Contributions List */}
      <div className="space-y-3">
        {factors.map((item, index) => {
          const style = getImpactBadge(item.impact);
          return (
            <div 
              key={index}
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-slate-100/60 transition-all space-y-2"
            >
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${style.badge}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                    {item.impact} Impact
                  </span>
                  <span className="font-bold text-slate-900">{item.factor}</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <span>+{item.contribution_pct}%</span>
                  <ArrowUpRight size={13} className="text-red-500 stroke-[2.5]" />
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className={`h-full rounded-full ${style.bar}`} 
                  style={{ width: `${item.contribution_pct * 2.5}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed pl-1">
                {item.explanation}
              </p>
            </div>
          );
        })}
      </div>

      {/* Natural Language Synthesis Note */}
      <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-blue-400">
          <HelpCircle size={15} />
          <span>Model Explanation Synthesis</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          {explanationSummary}
        </p>
      </div>
    </div>
  );
};
