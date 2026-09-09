import React, { createContext, useContext, useState, useEffect } from 'react';
import { GlobalFilterState, SeverityLevel, UrbanRuralType } from '../types/accident';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  read: boolean;
}

interface AppContextType {
  filters: GlobalFilterState;
  setFilters: React.Dispatch<React.SetStateAction<GlobalFilterState>>;
  updateFilter: <K extends keyof GlobalFilterState>(key: K, value: GlobalFilterState[K]) => void;
  resetFilters: () => void;
  notifications: AppNotification[];
  unreadCount: number;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
}

const defaultFilters: GlobalFilterState = {
  dateRange: '30d',
  severity: 'all',
  region: 'all',
  roadType: 'all',
  weather: 'all',
  urbanRural: 'all',
  searchQuery: ''
};

const initialNotifications: AppNotification[] = [
  {
    id: 'n-1',
    title: 'Critical Risk Alert: NH-44 Corridor',
    message: 'High accident frequency detected (4 fatal incidents in 48 hrs) during monsoon rain.',
    time: '12 min ago',
    type: 'critical',
    read: false
  },
  {
    id: 'n-2',
    title: 'Model Retraining Completed',
    message: 'Random Forest R-model updated with 5,000 new verified crash telemetry records (Accuracy 87.4%).',
    time: '2 hours ago',
    type: 'success',
    read: false
  },
  {
    id: 'n-3',
    title: 'Weather Warning: Fog Advisory',
    message: 'Severe morning fog advisory issued for Outer Ring Road and Northern Expressway districts.',
    time: '5 hours ago',
    type: 'warning',
    read: true
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<GlobalFilterState>(defaultFilters);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const updateFilter = <K extends keyof GlobalFilterState>(key: K, value: GlobalFilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        filters,
        setFilters,
        updateFilter,
        resetFilters,
        notifications,
        unreadCount,
        markNotificationAsRead,
        clearAllNotifications,
        isSidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
        isMobileNavOpen,
        setIsMobileNavOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
