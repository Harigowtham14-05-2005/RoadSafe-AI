import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CrossFilterBar: React.FC = () => {
  const { filters, updateFilter, resetFilters } = useApp();

  const regions = [
    { id: 'all', label: 'All Regions' },
    { id: 'Northern Highway Corridor', label: 'Northern Corridor' },
    { id: 'Capital Metropolitan', label: 'Capital Metro' },
    { id: 'Western District', label: 'Western District' }
  ];

  const severities = [
    { id: 'all', label: 'All Severities' },
    { id: 'Minor', label: 'Minor Only' },
    { id: 'Serious', label: 'Serious Only' },
    { id: 'Fatal', label: 'Fatal Only' }
  ];

  const roadTypes = [
    { id: 'all', label: 'All Road Types' },
    { id: 'Highway', label: 'Highways / Expressways' },
    { id: 'Dual carriageway', label: 'Dual Carriageway' },
    { id: 'Single carriageway', label: 'Single Carriageway' },
    { id: 'Roundabout', label: 'Roundabouts' }
  ];

  const weathers = [
    { id: 'all', label: 'All Weather' },
    { id: 'Clear', label: 'Clear' },
    { id: 'Rain', label: 'Rain / Monsoon' },
    { id: 'Fog', label: 'Dense Fog' },
    { id: 'Storm', label: 'Storm' }
  ];

  const urbanRural = [
    { id: 'all', label: 'All Areas' },
    { id: 'Urban', label: 'Urban Grid' },
    { id: 'Rural', label: 'Rural Corridors' }
  ];

  const hasActiveFilters = 
    filters.severity !== 'all' || 
    filters.region !== 'all' || 
    filters.roadType !== 'all' || 
    filters.weather !== 'all' || 
    filters.urbanRural !== 'all';

  return (
    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mr-1">
        <Filter size={14} className="text-blue-600" />
        <span>Filters:</span>
      </div>

      {/* Severity Filter */}
      <select
        value={filters.severity}
        onChange={(e) => updateFilter('severity', e.target.value as any)}
        className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {severities.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
      </select>

      {/* Region Filter */}
      <select
        value={filters.region}
        onChange={(e) => updateFilter('region', e.target.value)}
        className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {regions.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
      </select>

      {/* Road Type Filter */}
      <select
        value={filters.roadType}
        onChange={(e) => updateFilter('roadType', e.target.value)}
        className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {roadTypes.map(rt => <option key={rt.id} value={rt.id}>{rt.label}</option>)}
      </select>

      {/* Weather Filter */}
      <select
        value={filters.weather}
        onChange={(e) => updateFilter('weather', e.target.value)}
        className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {weathers.map(w => <option key={w.id} value={w.id}>{w.label}</option>)}
      </select>

      {/* Urban / Rural Filter */}
      <select
        value={filters.urbanRural}
        onChange={(e) => updateFilter('urbanRural', e.target.value as any)}
        className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {urbanRural.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
      </select>

      {/* Reset button */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="ml-auto inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
        >
          <RotateCcw size={12} />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
};
