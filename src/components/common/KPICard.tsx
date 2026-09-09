import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { KPIMetric } from '../../types/analytics';

interface KPICardProps {
  title: string;
  metric: KPIMetric;
  icon: React.ReactNode;
  iconBgColor?: string;
  subtext?: string;
  invertTrendColor?: boolean; // If higher is worse (e.g. fatal accidents up is bad = red)
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  metric,
  icon,
  iconBgColor = 'bg-blue-50 text-blue-600 border-blue-100',
  subtext,
  invertTrendColor = false,
  onClick
}) => {
  const isUp = metric.trend === 'up';
  const isDown = metric.trend === 'down';

  // Determine trend color
  let trendBadgeColor = 'text-slate-600 bg-slate-100';
  if (isUp) {
    trendBadgeColor = invertTrendColor 
      ? 'text-red-700 bg-red-50 border-red-200' 
      : 'text-emerald-700 bg-emerald-50 border-emerald-200';
  } else if (isDown) {
    trendBadgeColor = invertTrendColor 
      ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
      : 'text-red-700 bg-red-50 border-red-200';
  }

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 p-5 shadow-card hover:shadow-card-hover transition-all duration-200 ${onClick ? 'cursor-pointer hover:border-blue-300' : ''}`}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2.5 rounded-lg border ${iconBgColor}`}>
          {icon}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          {metric.value}
        </h3>
        {metric.unit && (
          <span className="text-sm font-medium text-slate-500">{metric.unit}</span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs pt-2.5 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border text-[11px] font-semibold ${trendBadgeColor}`}>
            {isUp && <ArrowUpRight size={13} className="stroke-[2.5]" />}
            {isDown && <ArrowDownRight size={13} className="stroke-[2.5]" />}
            {!isUp && !isDown && <Minus size={13} />}
            {typeof metric.change_pct === 'number' 
              ? (metric.change_pct > 0 ? `+${metric.change_pct}%` : `${metric.change_pct}%`)
              : '+0.0%'}
          </span>
          <span className="text-slate-400 text-[11px]">vs prev period</span>
        </div>

        {subtext || metric.status ? (
          <span className="text-slate-500 font-medium text-[11px] truncate max-w-[130px]" title={subtext || metric.status}>
            {subtext || metric.status}
          </span>
        ) : null}
      </div>
    </div>
  );
};
