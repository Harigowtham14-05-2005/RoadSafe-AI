import React from 'react';
import { X, AlertCircle, TrendingUp, Clock, CloudRain, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { HotspotLocation } from '../../types/accident';
import { RiskBadge } from '../common/RiskBadge';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

interface LocationDetailPanelProps {
  hotspot: HotspotLocation | null;
  onClose: () => void;
  onNavigateToPrediction?: (hotspot: HotspotLocation) => void;
}

export const LocationDetailPanel: React.FC<LocationDetailPanelProps> = ({
  hotspot,
  onClose,
  onNavigateToPrediction
}) => {
  if (!hotspot) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xl overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-slate-900 text-white flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/30 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
              {hotspot.id}
            </span>
            <RiskBadge level={hotspot.risk_level} score={hotspot.risk_score} size="sm" showScore />
          </div>
          <h3 className="font-bold text-base text-white leading-tight">
            {hotspot.name}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">{hotspot.road_name}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
        {/* Risk Score Highlight */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Calculated Risk Index</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-2xl font-extrabold text-slate-900">{hotspot.risk_score}</span>
              <span className="text-xs text-slate-400 font-semibold">/ 100</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Risk Level</span>
            <div className="mt-1">
              <span className={`px-2 py-0.5 rounded font-extrabold text-xs ${
                hotspot.risk_level === 'CRITICAL' ? 'bg-red-100 text-red-700' :
                hotspot.risk_level === 'HIGH' ? 'bg-amber-100 text-amber-800' :
                hotspot.risk_level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {hotspot.risk_level}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">Total Accidents</span>
            <p className="text-base font-bold text-slate-900 mt-0.5">{hotspot.total_accidents}</p>
          </div>
          <div className="p-2.5 rounded-lg border border-red-100 bg-red-50/40">
            <span className="text-[10px] text-red-500 font-semibold uppercase">Fatal Accidents</span>
            <p className="text-base font-bold text-red-700 mt-0.5">{hotspot.fatal_accidents}</p>
          </div>
          <div className="p-2.5 rounded-lg border border-amber-100 bg-amber-50/40">
            <span className="text-[10px] text-amber-600 font-semibold uppercase">Serious Injuries</span>
            <p className="text-base font-bold text-amber-800 mt-0.5">{hotspot.serious_accidents}</p>
          </div>
          <div className="p-2.5 rounded-lg border border-emerald-100 bg-emerald-50/40">
            <span className="text-[10px] text-emerald-600 font-semibold uppercase">Minor Collisions</span>
            <p className="text-base font-bold text-emerald-700 mt-0.5">{hotspot.minor_accidents}</p>
          </div>
        </div>

        {/* Operating Environment Specs */}
        <div className="space-y-2 border-t border-slate-100 pt-3">
          <h4 className="font-bold text-slate-900 text-xs">Environmental & Roadway Profile</h4>
          <div className="grid grid-cols-2 gap-2 text-slate-700">
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <Clock size={14} className="text-slate-500 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Peak Window</span>
                <span className="font-bold text-slate-900 text-[11px]">{hotspot.peak_time}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <CloudRain size={14} className="text-slate-500 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Dominant Weather</span>
                <span className="font-bold text-slate-900 text-[11px]">{hotspot.dominant_weather}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <Activity size={14} className="text-slate-500 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Road Condition</span>
                <span className="font-bold text-slate-900 text-[11px]">{hotspot.dominant_surface}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold text-slate-500">KM/H</span>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Speed Limit</span>
                <span className="font-bold text-slate-900 text-[11px]">{hotspot.speed_limit} km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Trend Chart */}
        {hotspot.monthly_trend && (
          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-slate-900 text-xs">Monthly Accident Velocity</h4>
              <span className="text-[10px] text-slate-400">Past 8 Months</span>
            </div>
            <div className="h-28 w-full bg-slate-50 p-2 rounded-xl border border-slate-100">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hotspot.monthly_trend}>
                  <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '0.5rem', color: '#FFF', fontSize: '10px' }} 
                  />
                  <Line type="monotone" dataKey="accidents" stroke="#2563EB" strokeWidth={2} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Main Contributing Risk Factors */}
        <div className="border-t border-slate-100 pt-3">
          <h4 className="font-bold text-slate-900 text-xs mb-2">Main Contributing Risk Factors</h4>
          <ol className="space-y-1.5 list-decimal list-inside text-slate-700">
            {hotspot.contributing_factors.map((factor, index) => (
              <li key={index} className="p-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] font-medium leading-tight">
                {factor}
              </li>
            ))}
          </ol>
        </div>

        {/* Recommended Action */}
        <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200">
          <span className="text-[10px] font-bold uppercase text-blue-900 tracking-wide block">Priority Recommendation</span>
          <p className="text-xs text-blue-950 font-semibold mt-0.5 leading-snug">
            {hotspot.recommended_action}
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      {onNavigateToPrediction && (
        <div className="p-3 border-t border-slate-100 bg-slate-50">
          <button
            onClick={() => onNavigateToPrediction(hotspot)}
            className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
          >
            <span>Simulate Scenario for this Location</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
