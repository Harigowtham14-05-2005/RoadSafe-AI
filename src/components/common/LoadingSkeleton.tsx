import React from 'react';

export const LoadingSkeleton: React.FC<{ rows?: number; height?: string; className?: string }> = ({
  rows = 4,
  height = 'h-6',
  className = ''
}) => {
  return (
    <div className={`w-full animate-pulse space-y-3 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div 
          key={i} 
          className={`bg-slate-200/70 rounded-lg ${height} ${i === rows - 1 ? 'w-3/4' : 'w-full'}`} 
        />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-card animate-pulse space-y-3">
          <div className="flex justify-between">
            <div className="h-3 bg-slate-200 rounded w-24" />
            <div className="h-8 w-8 bg-slate-200 rounded-lg" />
          </div>
          <div className="h-7 bg-slate-200 rounded w-32" />
          <div className="h-3 bg-slate-200 rounded w-40" />
        </div>
      ))}
    </div>
  );
};
