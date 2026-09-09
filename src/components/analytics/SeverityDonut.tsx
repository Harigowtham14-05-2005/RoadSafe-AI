import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface SeverityDistributionItem {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface SeverityDonutProps {
  data: SeverityDistributionItem[];
  totalAccidents?: number;
}

export const SeverityDonut: React.FC<SeverityDonutProps> = ({ data, totalAccidents = 24582 }) => {
  const sanitizedData = (data || []).map(d => ({
    name: String(d.name || ''),
    count: Number(d.count || 0),
    percentage: Number(d.percentage || 0),
    color: String(d.color || '#3B82F6')
  }));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload as SeverityDistributionItem;
      return (
        <div className="bg-slate-900 text-white p-2.5 rounded-xl shadow-xl text-xs border border-slate-700">
          <div className="flex items-center gap-2 font-bold mb-1">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
            <span>{d.name} Severity</span>
          </div>
          <p className="text-slate-300">
            Count: <span className="font-semibold text-white">{Number(d.count).toLocaleString()}</span>
          </p>
          <p className="text-slate-300">
            Share: <span className="font-semibold text-white">{d.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Donut Chart with Center Text */}
      <div className="relative h-56 w-56 shrink-0 min-w-0">
        <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={200}>
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={sanitizedData}
              innerRadius={62}
              outerRadius={88}
              paddingAngle={4}
              dataKey="count"
              stroke="#FFFFFF"
              strokeWidth={2}
            >
              {sanitizedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</span>
          <span className="text-lg font-extrabold text-slate-900 leading-tight">
            {totalAccidents >= 1000 ? `${(totalAccidents / 1000).toFixed(1)}k` : totalAccidents}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">Crashes</span>
        </div>
      </div>

      {/* Legend & Summary List */}
      <div className="flex-1 w-full space-y-2.5">
        {data.map((item) => (
          <div 
            key={item.name} 
            className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 flex items-center justify-between hover:bg-slate-100/70 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <span 
                className="h-3 w-3 rounded-full shrink-0 shadow-sm" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="text-xs font-bold text-slate-800">{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-900">
                {item.count.toLocaleString()}
              </span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700 min-w-[44px] text-right">
                {item.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
