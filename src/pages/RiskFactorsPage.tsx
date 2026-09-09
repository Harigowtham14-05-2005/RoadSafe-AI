import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { ChartCard } from '../components/common/ChartCard';
import { analyticsService } from '../services/analyticsService';
import { FeatureImportanceItem } from '../types/model';
import { Layers, Sparkles, BrainCircuit, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const RiskFactorsPage: React.FC = () => {
  const [features, setFeatures] = useState<FeatureImportanceItem[]>([]);
  const [keyInsight, setKeyInsight] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await analyticsService.getFeatureImportance();
        setFeatures(res.features);
        setKeyInsight(res.key_insight);
      } catch (err) {
        console.error('Failed to load risk factors:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getBarColor = (impact: string) => {
    if (impact === 'High') return '#EF4444';
    if (impact === 'Medium') return '#F59E0B';
    return '#3B82F6';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <Layers size={20} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Accident Risk Factors & ML Feature Importance
          </h1>
        </div>
        <p className="text-xs text-slate-500">
          Ranked feature attribution derived from Random Forest Mean Decrease in Gini and gradient-boosted decision splits in R.
        </p>
      </div>

      {/* Key Insight Callout Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white shadow-card flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30 shrink-0">
          <Sparkles size={20} />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-300 block mb-1">
            Machine Learning Core Finding
          </span>
          <p className="text-sm font-semibold leading-relaxed text-slate-100">
            {keyInsight || 'Roadway speed limits and surface friction account for over 43.7% of total variance in severe and fatal accident outcomes.'}
          </p>
        </div>
      </div>

      {/* Main Horizontal Feature Importance Chart */}
      <ChartCard
        title="Global Feature Importance Ranking (% Contribution)"
        subtitle="Random Forest Mean Decrease Gini normalized relative variance"
        infoTooltip="Higher percentage indicates stronger predictive split power in segregating Fatal/Serious collisions from Minor incidents."
      >
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={features}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 70, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} unit="%" />
              <YAxis 
                type="category" 
                dataKey="feature" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#1E293B', fontWeight: 600 }} 
                width={140}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderRadius: '0.75rem', color: '#FFF', fontSize: '11px' }}
                formatter={(val: any) => [`${val}% Importance`, 'Attribution']}
              />
              <Bar dataKey="importance" radius={[0, 6, 6, 0]}>
                {features.map((entry) => (
                  <Cell key={`feat-${entry.rank}`} fill={getBarColor(entry.impact)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Ranked Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f) => (
          <div 
            key={f.rank}
            className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 transition-all flex items-start gap-3.5"
          >
            <div className="h-8 w-8 rounded-xl bg-slate-100 flex items-center justify-center font-extrabold text-xs text-slate-800 shrink-0 border border-slate-200">
              #{f.rank}
            </div>
            <div className="flex-1 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">{f.feature}</h4>
                <span className="font-extrabold text-sm text-blue-600">{f.importance}%</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold text-[10px]">
                  {f.category}
                </span>
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  f.impact === 'High' ? 'bg-red-100 text-red-700' :
                  f.impact === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-700'
                }`}>
                  {f.impact} Impact
                </span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed pt-1">
                {f.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
