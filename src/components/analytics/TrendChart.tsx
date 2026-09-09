import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { TrendDataPoint } from '../../types/analytics';

interface TrendChartProps {
  data: TrendDataPoint[];
}

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  const [activeMetric, setActiveMetric] = useState<'total' | 'fatal' | 'serious' | 'minor'>('total');

  const sanitizedData = (data || []).map(d => ({
    month: String(d.month || ''),
    period: String(d.period || ''),
    total: Number(d.total || 0),
    minor: Number(d.minor || 0),
    serious: Number(d.serious || 0),
    fatal: Number(d.fatal || 0),
    risk_index: Number(d.risk_index || 0)
  }));

  const metricConfig = {
    total: {
      label: 'Total Accidents',
      dataKey: 'total',
      stroke: '#2563EB',
      fill: 'url(#colorTotal)',
      color: 'bg-blue-600',
      badgeStyle: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    fatal: {
      label: 'Fatal Accidents',
      dataKey: 'fatal',
      stroke: '#EF4444',
      fill: 'url(#colorFatal)',
      color: 'bg-red-600',
      badgeStyle: 'text-red-700 bg-red-50 border-red-200'
    },
    serious: {
      label: 'Serious Accidents',
      dataKey: 'serious',
      stroke: '#F59E0B',
      fill: 'url(#colorSerious)',
      color: 'bg-amber-600',
      badgeStyle: 'text-amber-700 bg-amber-50 border-amber-200'
    },
    minor: {
      label: 'Minor Accidents',
      dataKey: 'minor',
      stroke: '#10B981',
      fill: 'url(#colorMinor)',
      color: 'bg-emerald-600',
      badgeStyle: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    }
  };

  const current = metricConfig[activeMetric];

  // Custom tooltip
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload as TrendDataPoint;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700">
          <p className="font-bold text-slate-200 mb-1.5">{label} 2026</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4 text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                Total:
              </span>
              <span className="font-bold text-white">{d.total.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                Fatal:
              </span>
              <span className="font-bold text-red-400">{d.fatal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Serious:
              </span>
              <span className="font-bold text-amber-400">{d.serious.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Minor:
              </span>
              <span className="font-bold text-emerald-400">{d.minor.toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Metric Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(metricConfig) as (keyof typeof metricConfig)[]).map((key) => {
          const m = metricConfig[key];
          const isSelected = activeMetric === key;
          return (
            <button
              key={key}
              onClick={() => setActiveMetric(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isSelected
                  ? `${m.badgeStyle} shadow-sm ring-1`
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Recharts Area Chart */}
      <div className="h-72 w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={280}>
          <AreaChart data={sanitizedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorFatal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorSerious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorMinor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#64748B' }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#64748B' }} 
              tickFormatter={(val) => val >= 1000 ? `${(val/1000).toFixed(1)}k` : val}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey={current.dataKey}
              stroke={current.stroke}
              strokeWidth={2.5}
              fill={current.fill}
              dot={{ r: 3, fill: current.stroke, strokeWidth: 2, stroke: '#FFFFFF' }}
              activeDot={{ r: 6, fill: current.stroke, stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
