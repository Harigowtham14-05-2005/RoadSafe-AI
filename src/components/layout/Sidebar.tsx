import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  BrainCircuit, 
  AlertOctagon, 
  MapPin, 
  Layers, 
  ShieldAlert, 
  Cpu, 
  FileText, 
  Database, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useApiConfig } from '../../context/ApiConfigContext';

export const Sidebar: React.FC = () => {
  const { isSidebarCollapsed, toggleSidebar, setIsMobileNavOpen } = useApp();
  const { isRServerOnline } = useApiConfig();

  const navItems = [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/analytics', label: 'Accident Analytics', icon: BarChart3 },
    { to: '/prediction', label: 'Severity Prediction', icon: BrainCircuit, highlight: true },
    { to: '/risk-analysis', label: 'Risk Analysis', icon: AlertOctagon },
    { to: '/hotspots', label: 'Accident Hotspots', icon: MapPin },
    { to: '/risk-factors', label: 'Risk Factors', icon: Layers },
    { to: '/recommendations', label: 'Safety Recommendations', icon: ShieldAlert },
    { to: '/model-performance', label: 'Model Performance', icon: Cpu },
    { to: '/reports', label: 'Reports', icon: FileText },
    { to: '/data-management', label: 'Data Management', icon: Database },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`bg-slate-900 text-slate-300 border-r border-slate-800 transition-all duration-300 flex flex-col justify-between shrink-0 z-30 h-full min-h-screen ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <NavLink 
            to="/" 
            className="flex items-center gap-3 overflow-hidden group"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/40 shrink-0 group-hover:scale-105 transition-transform">
              <Shield size={22} className="stroke-[2.5]" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-base text-white tracking-tight">RoadSafe</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">AI</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium truncate">Safety Intelligence in R</span>
              </div>
            )}
          </NavLink>

          <button
            onClick={toggleSidebar}
            className="hidden md:flex items-center justify-center h-7 w-7 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-170px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileNavOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                  } ${item.highlight && !isActive ? 'text-blue-400' : ''}`
                }
                title={isSidebarCollapsed ? item.label : undefined}
              >
                <Icon 
                  size={19} 
                  className={`shrink-0 transition-transform group-hover:scale-110 ${
                    item.highlight ? 'text-blue-400' : ''
                  }`} 
                />
                {!isSidebarCollapsed && (
                  <span className="truncate">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Connection Status */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        {!isSidebarCollapsed ? (
          <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isRServerOnline ? 'bg-emerald-400' : 'bg-blue-400'
                }`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isRServerOnline ? 'bg-emerald-500' : 'bg-blue-500'
                }`} />
              </span>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-slate-200">
                  {isRServerOnline ? 'R Plumber API' : 'R Engine (Sim)'}
                </span>
                <span className="text-[10px] text-slate-400">
                  {isRServerOnline ? 'Port 8000 Connected' : 'Embedded Engine'}
                </span>
              </div>
            </div>
            <Activity size={14} className="text-slate-400" />
          </div>
        ) : (
          <div className="flex justify-center" title={isRServerOnline ? 'R Plumber API Online' : 'R Simulation Engine'}>
            <span className={`h-3 w-3 rounded-full ${isRServerOnline ? 'bg-emerald-500' : 'bg-blue-500'}`} />
          </div>
        )}
      </div>
    </aside>
  );
};
