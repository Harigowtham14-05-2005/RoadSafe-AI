import React from 'react';
import { RiskLevel } from '../../types/accident';

interface RiskBadgeProps {
  level: RiskLevel | string;
  score?: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ 
  level, 
  score, 
  size = 'md',
  showScore = false 
}) => {
  const normLevel = level.toUpperCase();

  const getStyles = () => {
    switch (normLevel) {
      case 'CRITICAL':
        return 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-300';
      case 'HIGH':
        return 'bg-amber-50 text-amber-800 border-amber-200 ring-1 ring-amber-300';
      case 'MEDIUM':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200 ring-1 ring-yellow-300';
      case 'LOW':
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-300';
    }
  };

  const getDotStyles = () => {
    switch (normLevel) {
      case 'CRITICAL':
        return 'bg-red-600 animate-pulse';
      case 'HIGH':
        return 'bg-amber-600';
      case 'MEDIUM':
        return 'bg-yellow-500';
      case 'LOW':
      default:
        return 'bg-emerald-600';
    }
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wide',
    lg: 'text-sm px-3 py-1.5 font-bold tracking-wide'
  }[size];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm ${getStyles()} ${sizeClasses}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${getDotStyles()}`} />
      <span>{normLevel} RISK</span>
      {showScore && score !== undefined && (
        <span className="ml-1 pl-1.5 border-l border-current opacity-80 text-[11px]">
          {score}/100
        </span>
      )}
    </span>
  );
};
