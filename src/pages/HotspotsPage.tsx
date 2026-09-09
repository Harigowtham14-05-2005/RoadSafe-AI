import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HotspotMap } from '../components/maps/HotspotMap';
import { LocationDetailPanel } from '../components/maps/LocationDetailPanel';
import { MapLegend } from '../components/maps/MapLegend';
import { analyticsService } from '../services/analyticsService';
import { HotspotLocation, RiskLevel } from '../types/accident';
import { MapPin, Filter, Search, ShieldAlert, ArrowRight, Layers } from 'lucide-react';
import { RiskBadge } from '../components/common/RiskBadge';

export const HotspotsPage: React.FC = () => {
  const navigate = useNavigate();
  const [hotspots, setHotspots] = useState<HotspotLocation[]>([]);
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadHotspots() {
      setLoading(true);
      try {
        const data = await analyticsService.getHotspots();
        setHotspots(data);
        if (data.length > 0) {
          setSelectedHotspot(data[0]); // Default to highest risk zone (NH-44)
        }
      } catch (err) {
        console.error('Failed to load hotspots:', err);
      } finally {
        setLoading(false);
      }
    }
    loadHotspots();
  }, []);

  const filteredHotspots = hotspots.filter(h => {
    if (riskFilter !== 'all' && h.risk_level !== riskFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return h.name.toLowerCase().includes(q) || h.road_name.toLowerCase().includes(q);
    }
    return true;
  });

  const handleNavigateToPrediction = (hotspot: HotspotLocation) => {
    navigate('/prediction', { state: { hotspot } });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-lg bg-red-50 text-red-600">
              <MapPin size={20} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Accident Hotspots & Geospatial Risk Intelligence
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Interactive GIS mapping of high-fatality corridors, junction merge conflicts, and road safety blackspots.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold">
            {filteredHotspots.length} Hotspots Identified
          </span>
        </div>
      </div>

      {/* Main Map & Detail Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: Map Container (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Map Filter Controls Bar */}
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search hotspot corridor (e.g. NH-44, Ring Road)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter size={14} className="text-slate-500" />
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Risk Levels</option>
                <option value="CRITICAL">Critical Risk Only</option>
                <option value="HIGH">High Risk Only</option>
                <option value="MEDIUM">Medium Risk Only</option>
                <option value="LOW">Low Risk Only</option>
              </select>
            </div>
          </div>

          {/* Leaflet Map Card */}
          <div className="relative bg-white rounded-xl border border-slate-200 shadow-card p-1">
            <HotspotMap
              hotspots={filteredHotspots}
              selectedHotspot={selectedHotspot}
              onSelectHotspot={(h) => setSelectedHotspot(h)}
            />

            {/* Map Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-[400] hidden sm:block">
              <MapLegend />
            </div>
          </div>

          {/* Quick Hotspot Select Cards Carousel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {filteredHotspots.slice(0, 4).map((h) => {
              const isSelected = selectedHotspot?.id === h.id;
              return (
                <div
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-400'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-400">{h.id}</span>
                    <RiskBadge level={h.risk_level} score={h.risk_score} size="sm" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 truncate">{h.name}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{h.road_name}</p>
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-600">
                    <span>{h.total_accidents} crashes</span>
                    <span className="font-bold text-red-600">{h.fatal_accidents} fatal</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Location Detail Intelligence Panel (1 Col) */}
        <div className="lg:col-span-1 sticky top-20">
          <LocationDetailPanel
            hotspot={selectedHotspot}
            onClose={() => setSelectedHotspot(null)}
            onNavigateToPrediction={handleNavigateToPrediction}
          />
        </div>
      </div>
    </div>
  );
};
