import React from 'react';
import { RoadSurfaceAnalyticsPoint } from '../../types/analytics';
import { ShieldAlert, Droplets, Snowflake, AlertTriangle, HelpCircle } from 'lucide-react';

interface RoadConditionGridProps {
  data: RoadSurfaceAnalyticsPoint[];
}

export const RoadConditionGrid: React.FC<RoadConditionGridProps> = ({ data }) => {
  const getIcon = (surface: string) => {
    switch (surface.toLowerCase()) {
      case 'wet':
        return <Droplets size={18} className="text-blue-600" />;
      case 'icy / frost':
      case 'icy':
        return <Snowflake size={18} className="text-cyan-600" />;
      case 'poor surface':
        return <AlertTriangle size={18} className="text-amber-600" />;
      case 'unknown':
        return <HelpCircle size={18} className="text-slate-500" />;
      case 'dry':
      default:
        return <ShieldAlert size={18} className="text-emerald-600" />;
    }
  };

  const getRiskBadge = (avgRisk: number) => {
    if (avgRisk >= 85) return 'bg-red-50 text-red-700 border-red-200';
    if (avgRisk >= 70) return 'bg-amber-50 text-amber-800 border-amber-200';
    if (avgRisk >= 50) return 'bg-yellow-50 text-yellow-800 border-yellow-200';
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {data.map((item) => {
        const severeTotal = item.fatal + item.serious;
        const severePct = Math.round((severeTotal / item.total) * 100);

        return (
          <div 
            key={item.surface}
            className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    {getIcon(item.surface)}
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{item.surface}</h4>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getRiskBadge(item.avg_risk)}`}>
                  Risk {item.avg_risk}/100
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Total Volume</span>
                <span className="font-bold text-slate-800">{item.total.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-medium">Severe / Fatal Rate</span>
                <span className="font-bold text-red-600">{severePct}%</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
