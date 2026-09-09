import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

interface ApiConfigContextType {
  isRServerOnline: boolean;
  isChecking: boolean;
  rApiUrl: string;
  setRApiUrl: (url: string) => void;
  recheckHealth: () => Promise<boolean>;
  activeProductionModel: string;
  setActiveProductionModel: (model: string) => void;
}

const ApiConfigContext = createContext<ApiConfigContextType | undefined>(undefined);

export const ApiConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRServerOnline, setIsRServerOnline] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [rApiUrl, setRApiUrlState] = useState<string>(api.getBaseUrl());
  const [activeProductionModel, setActiveProductionModel] = useState<string>('Random Forest Classifier (R)');

  const checkHealth = async (): Promise<boolean> => {
    setIsChecking(true);
    const online = await api.checkRServerHealth();
    setIsRServerOnline(online);
    setIsChecking(false);
    return online;
  };

  useEffect(() => {
    checkHealth();
    // Re-check periodically every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const setRApiUrl = (url: string) => {
    api.setBaseUrl(url);
    setRApiUrlState(url);
    checkHealth();
  };

  return (
    <ApiConfigContext.Provider
      value={{
        isRServerOnline,
        isChecking,
        rApiUrl,
        setRApiUrl,
        recheckHealth: checkHealth,
        activeProductionModel,
        setActiveProductionModel
      }}
    >
      {children}
    </ApiConfigContext.Provider>
  );
};

export function useApiConfig(): ApiConfigContextType {
  const context = useContext(ApiConfigContext);
  if (!context) {
    throw new Error('useApiConfig must be used within an ApiConfigProvider');
  }
  return context;
}
