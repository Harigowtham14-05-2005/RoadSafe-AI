import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, Clock, Hammer, FileCheck, ArrowUpRight, Search } from 'lucide-react';
import { analyticsService } from '../services/analyticsService';
import { CriticalLocationItem, PolicyRecommendationItem } from '../types/analytics';

export const SafetyRecommendationsPage: React.FC = () => {
  const [locations, setLocations] = useState<CriticalLocationItem[]>([]);
  const [policies, setPolicies] = useState<PolicyRecommendationItem[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const res = await analyticsService.getRecommendations();
        setLocations(res.critical_locations);
        setPolicies(res.policy_recommendations);
      } catch (err) {
        console.error('Failed to load safety recommendations:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const updateLocationStatus = (locName: string, newStatus: string) => {
    setLocations(prev => prev.map(l => l.location === locName ? { ...l, status: newStatus } : l));
  };

  const filteredLocations = locations.filter(l => {
    if (priorityFilter !== 'all' && l.priority.toLowerCase() !== priorityFilter.toLowerCase()) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return l.location.toLowerCase().includes(q) || l.primary_risk.toLowerCase().includes(q);
    }
    return true;
  });

  const getPriorityStyle = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Work Scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Review':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Pending Approval':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <ShieldAlert size={20} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Safety Recommendations & Authority Action Command
          </h1>
        </div>
        <p className="text-xs text-slate-500">
          Targeted civil engineering, traffic police speed enforcement, and illumination interventions for critical road sectors.
        </p>
      </div>

      {/* Policy Recommendations Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {policies.map((p) => (
          <div key={p.title} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                {p.category}
              </span>
              <span className="text-slate-500 text-[11px] font-semibold">{p.count_locations} Locations</span>
            </div>
            <h4 className="font-bold text-slate-900 text-xs leading-snug">{p.title}</h4>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[10px]">Estimated Safety Gain</span>
              <span className="font-extrabold text-emerald-600 text-[11px]">{p.estimated_impact}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Critical Locations Intervention Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Critical Locations Requiring Immediate Intervention
            </h3>
            <p className="text-xs text-slate-500">
              Corridors sorted by severity risk index and historical fatality density
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Filter locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical Only</option>
              <option value="high">High Only</option>
              <option value="medium">Medium Only</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <th className="py-3 px-4">Location Corridor</th>
                <th className="py-3 px-3">Risk Score</th>
                <th className="py-3 px-3">Crashes</th>
                <th className="py-3 px-3">Fatalities</th>
                <th className="py-3 px-4">Primary Risk Factor</th>
                <th className="py-3 px-4">Recommended Safety Action</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3 text-right">Intervention Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredLocations.map((item) => (
                <tr key={item.location} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {item.location}
                  </td>
                  <td className="py-3.5 px-3 font-extrabold text-blue-600">
                    {item.risk_score} / 100
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-700">
                    {item.accidents}
                  </td>
                  <td className="py-3.5 px-3 font-extrabold text-red-600">
                    {item.fatalities}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    {item.primary_risk}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {item.recommended_action}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] border ${getPriorityStyle(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <select
                      value={item.status}
                      onChange={(e) => updateLocationStatus(item.location, e.target.value)}
                      className={`px-2 py-1 rounded-lg text-[11px] font-bold border ${getStatusStyle(item.status)} cursor-pointer`}
                    >
                      <option value="Pending Approval">Pending Approval</option>
                      <option value="In Review">In Review</option>
                      <option value="Work Scheduled">Work Scheduled</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
