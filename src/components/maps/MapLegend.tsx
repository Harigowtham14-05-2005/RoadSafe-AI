import React from 'react';

export const MapLegend: React.FC = () => {
  const levels = [
    { label: 'Critical Risk (85–100)', color: '#EF4444', desc: 'Immediate intervention & speed radar required' },
    { label: 'High Risk (70–84)', color: '#F97316', desc: 'Frequent serious collisions, poor lighting' },
    { label: 'Medium Risk (40–69)', color: '#F59E0B', desc: 'Rush-hour congestion & merge conflicts' },
    { label: 'Low Risk (<40)', color: '#10B981', desc: 'Baseline controlled urban / low speed' },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200/80 shadow-lg text-xs max-w-xs space-y-2">
      <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1.5 flex items-center justify-between">
        <span>Hotspot Risk Classification</span>
        <span className="text-[10px] text-slate-400 font-normal">Score Range</span>
      </h4>
      <div className="space-y-1.5">
        {levels.map((lvl) => (
          <div key={lvl.label} className="flex items-center gap-2">
            <span 
              className="h-3 w-3 rounded-full shrink-0 shadow-sm ring-2 ring-white" 
              style={{ backgroundColor: lvl.color }} 
            />
            <div className="flex-1">
              <span className="font-semibold text-slate-800 block text-[11px] leading-tight">{lvl.label}</span>
              <span className="text-[10px] text-slate-500 block leading-tight">{lvl.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
