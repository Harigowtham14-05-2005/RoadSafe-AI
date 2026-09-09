import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DateFilter: React.FC = () => {
  const { filters, updateFilter } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const options: { id: typeof filters.dateRange; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '6m', label: 'Last 6 Months' },
    { id: '1y', label: 'Last Year' },
    { id: 'custom', label: 'Custom Range' }
  ];

  const currentLabel = options.find(o => o.id === filters.dateRange)?.label || 'Last 30 Days';

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        <Calendar size={14} className="text-slate-500" />
        <span>{currentLabel}</span>
        <ChevronDown size={13} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-20"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-1.5 w-44 bg-white border border-slate-200 rounded-xl shadow-lg z-30 py-1.5">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  updateFilter('dateRange', opt.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-1.5 text-xs font-medium transition-colors flex items-center justify-between ${
                  filters.dateRange === opt.id
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{opt.label}</span>
                {filters.dateRange === opt.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
