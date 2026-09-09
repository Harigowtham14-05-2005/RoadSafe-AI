import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  ShieldCheck, 
  Radio, 
  User, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useApiConfig } from '../../context/ApiConfigContext';
import { DateFilter } from '../common/DateFilter';
import { NotificationDrawer } from './NotificationDrawer';

export const TopNavbar: React.FC = () => {
  const { filters, updateFilter, unreadCount, setIsMobileNavOpen } = useApp();
  const { isRServerOnline } = useApiConfig();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-white border-b border-slate-200/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        {/* Left: Mobile hamburger & Search */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Open Navigation"
          >
            <Menu size={20} />
          </button>

          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search accidents, corridors, junctions, road types..."
              value={filters.searchQuery}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            {filters.searchQuery && (
              <button
                onClick={() => updateFilter('searchQuery', '')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Date Filter, Live R Status, Notifications & Profile */}
        <div className="flex items-center gap-3">
          {/* Date Filter */}
          <div className="hidden sm:block">
            <DateFilter />
          </div>

          {/* R Backend Status Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border bg-slate-50 border-slate-200 text-slate-700">
            <Radio 
              size={12} 
              className={`${isRServerOnline ? 'text-emerald-500 animate-pulse' : 'text-blue-500'}`} 
            />
            <span className="text-[11px]">
              {isRServerOnline ? 'R Plumber Live' : 'R ML Engine'}
            </span>
          </div>

          {/* Safety Alerts Notification Bell */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Safety Notifications & Critical Alerts"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 p-1 pl-2 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                GOV
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 leading-none">Dept. Road Safety</span>
                <span className="text-[10px] text-slate-500 font-medium">Chief Transport Officer</span>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden md:block" />
            </button>

            {isUserMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-20"
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-30 p-2 text-xs">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900">Dr. Rajesh Varma</p>
                    <p className="text-slate-500 text-[11px]">rajesh.varma@transportsafety.gov.in</p>
                  </div>
                  <div className="py-1">
                    <div className="px-3 py-1.5 flex items-center gap-2 text-slate-700">
                      <ShieldCheck size={14} className="text-emerald-600" />
                      <span>Authorized AI Analyst</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Slide-out Notification Drawer */}
      <NotificationDrawer 
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
      />
    </>
  );
};
