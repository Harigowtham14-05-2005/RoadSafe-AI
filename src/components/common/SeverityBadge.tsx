import React from 'react';
import { SeverityLevel } from '../../types/accident';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SeverityBadgeProps {
  severity: SeverityLevel | string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ 
  severity, 
  size = 'md',
  showIcon = true 
}) => {
  const norm = (severity || 'Minor').toLowerCase();

  const getBadgeStyle = () => {
    switch (norm) {
      case 'fatal':
        return 'bg-red-50 text-red-700 border-red-200 ring-1 ring-red-200';
      case 'serious':
        return 'bg-amber-50 text-amber-800 border-amber-200 ring-1 ring-amber-200';
      case 'minor':
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-1 ring-emerald-200';
    }
  };

  const getIcon = () => {
    const iconSize = size === 'sm' ? 12 : size === 'lg' ? 16 : 14;
    switch (norm) {
      case 'fatal':
        return <AlertCircle size={iconSize} className="text-red-600 shrink-0" />;
      case 'serious':
        return <AlertTriangle size={iconSize} className="text-amber-600 shrink-0" />;
      case 'minor':
      default:
        return <CheckCircle2 size={iconSize} className="text-emerald-600 shrink-0" />;
    }
  };

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1.5 font-bold'
  }[size];

  const label = norm.charAt(0).toUpperCase() + norm.slice(1);

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm ${getBadgeStyle()} ${sizeClasses}`}>
      {showIcon && getIcon()}
      <span>{label} Severity</span>
    </span>
  );
};
