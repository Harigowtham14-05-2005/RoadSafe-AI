import React from 'react';
import { ConfusionMatrixRow } from '../../types/model';

interface ConfusionMatrixViewProps {
  matrix: ConfusionMatrixRow[];
  labels: string[];
}

export const ConfusionMatrixView: React.FC<ConfusionMatrixViewProps> = ({ matrix, labels }) => {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-center border-collapse text-xs">
          <thead>
            <tr>
              <th className="p-2 border border-transparent"></th>
              <th colSpan={3} className="py-2 px-3 bg-slate-100 border border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                Predicted Severity Class
              </th>
              <th className="p-2 border border-transparent"></th>
            </tr>
            <tr className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <th className="py-2.5 px-3 text-left font-bold text-slate-800 uppercase tracking-wider text-[10px] w-28">
                Actual Ground Truth
              </th>
              {labels.map((lbl) => (
                <th key={lbl} className="py-2.5 px-3 font-bold text-slate-800">
                  {lbl}
                </th>
              ))}
              <th className="py-2.5 px-3 font-bold text-blue-700 bg-blue-50/50">
                Class Recall
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {matrix.map((row) => (
              <tr key={row.actual}>
                <td className="py-3 px-3 text-left font-bold text-slate-800 bg-slate-50/50 border-r border-slate-200">
                  {row.actual}
                </td>
                {/* Minor cell */}
                <td className={`py-3 px-3 font-bold ${row.actual === 'Minor' ? 'bg-emerald-100/70 text-emerald-900 ring-1 ring-emerald-300 font-extrabold' : 'text-slate-600'}`}>
                  {row.Minor}
                </td>
                {/* Serious cell */}
                <td className={`py-3 px-3 font-bold ${row.actual === 'Serious' ? 'bg-amber-100/70 text-amber-900 ring-1 ring-amber-300 font-extrabold' : 'text-slate-600'}`}>
                  {row.Serious}
                </td>
                {/* Fatal cell */}
                <td className={`py-3 px-3 font-bold ${row.actual === 'Fatal' ? 'bg-red-100/70 text-red-900 ring-1 ring-red-300 font-extrabold' : 'text-slate-600'}`}>
                  {row.Fatal}
                </td>
                {/* Recall */}
                <td className="py-3 px-3 font-extrabold text-blue-700 bg-blue-50/40 border-l border-slate-200">
                  {(row.recall * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-emerald-100 border border-emerald-300" />
            <span>True Positives (Diagonal)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded bg-white border border-slate-200" />
            <span>Classification Errors</span>
          </div>
        </div>
        <span>Evaluation Test Samples: <strong>4,917</strong></span>
      </div>
    </div>
  );
};
