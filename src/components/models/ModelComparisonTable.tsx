import React from 'react';
import { ModelEvaluationItem } from '../../types/model';
import { Check, Star, Cpu } from 'lucide-react';

interface ModelComparisonTableProps {
  models: ModelEvaluationItem[];
  selectedModel: string;
  onSelectModel: (modelName: string) => void;
}

export const ModelComparisonTable: React.FC<ModelComparisonTableProps> = ({
  models,
  selectedModel,
  onSelectModel
}) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
            <th className="py-3.5 px-4">Model Architecture</th>
            <th className="py-3.5 px-3">Accuracy</th>
            <th className="py-3.5 px-3">Precision</th>
            <th className="py-3.5 px-3">Recall</th>
            <th className="py-3.5 px-3">F1 Score</th>
            <th className="py-3.5 px-3">ROC-AUC</th>
            <th className="py-3.5 px-3">Train Latency</th>
            <th className="py-3.5 px-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {models.map((m) => {
            const isCurrentProd = m.is_production || m.model.toLowerCase().includes('random forest');
            const isSelected = selectedModel === m.model;

            return (
              <tr 
                key={m.model}
                onClick={() => onSelectModel(m.model)}
                className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                  isSelected ? 'bg-blue-50/50' : ''
                }`}
              >
                <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                  {isCurrentProd && (
                    <span className="p-1 rounded-md bg-blue-100 text-blue-700" title="Active Production Model">
                      <Star size={13} className="fill-blue-600 text-blue-600" />
                    </span>
                  )}
                  <div>
                    <span className="block">{m.model}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{m.strengths}</span>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-extrabold text-blue-600">
                  {(m.accuracy * 100).toFixed(1)}%
                </td>
                <td className="py-3.5 px-3 font-semibold text-slate-700">
                  {(m.precision * 100).toFixed(1)}%
                </td>
                <td className="py-3.5 px-3 font-semibold text-slate-700">
                  {(m.recall * 100).toFixed(1)}%
                </td>
                <td className="py-3.5 px-3 font-semibold text-slate-700">
                  {m.f1_score.toFixed(3)}
                </td>
                <td className="py-3.5 px-3 font-bold text-emerald-600">
                  {m.roc_auc.toFixed(3)}
                </td>
                <td className="py-3.5 px-3 text-slate-500">
                  {m.training_time_sec}s
                </td>
                <td className="py-3.5 px-4 text-right">
                  {isCurrentProd ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-sm">
                      <Check size={11} className="stroke-[3]" />
                      Production
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                      Candidate
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
