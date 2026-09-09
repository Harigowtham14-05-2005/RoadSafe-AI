import React from 'react';
import { SafetyRecommendation } from '../../types/prediction';
import { ShieldAlert, CheckCircle2, ArrowRight, Shield } from 'lucide-react';

interface ActionableRecommendationsProps {
  recommendations: SafetyRecommendation[];
}

export const ActionableRecommendations: React.FC<ActionableRecommendationsProps> = ({
  recommendations
}) => {
  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'high':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'medium':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'low':
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-card space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
            <ShieldAlert size={18} />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Recommended Safety Actions & Interventions
            </h3>
            <p className="text-xs text-slate-500">
              AI-generated preventative actions prioritized for highway authorities and traffic police
            </p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-100 text-emerald-800">
          Targeted Remediation
        </span>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, index) => (
          <div 
            key={index}
            className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${getPriorityBadge(rec.priority)}`}>
                  {rec.priority} Priority
                </span>
                <h4 className="text-xs font-bold text-slate-900">{rec.title}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-700">Identified Risk: </span>
                {rec.reason}
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-800 font-medium mt-2 flex items-start gap-2">
                <CheckCircle2 size={15} className="text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Suggested Action:</strong> {rec.action}</span>
              </div>
            </div>

            {rec.responsible_entity && (
              <div className="sm:text-right shrink-0 pt-1 sm:pt-0">
                <span className="text-[10px] text-slate-400 font-medium block">Responsible Authority</span>
                <span className="text-[11px] font-bold text-slate-700 block bg-slate-100 px-2 py-1 rounded-md border border-slate-200 mt-1">
                  {rec.responsible_entity}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
