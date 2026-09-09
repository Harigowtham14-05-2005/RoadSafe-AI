import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { OverviewDashboard } from './pages/OverviewDashboard';
import { AccidentAnalytics } from './pages/AccidentAnalytics';
import { SeverityPrediction } from './pages/SeverityPrediction';
import { RiskAnalysis } from './pages/RiskAnalysis';
import { HotspotsPage } from './pages/HotspotsPage';
import { RiskFactorsPage } from './pages/RiskFactorsPage';
import { SafetyRecommendationsPage } from './pages/SafetyRecommendationsPage';
import { ModelPerformancePage } from './pages/ModelPerformancePage';
import { ReportsPage } from './pages/ReportsPage';
import { DataManagementPage } from './pages/DataManagementPage';
import { SettingsPage } from './pages/SettingsPage';
import { AppProvider } from './context/AppContext';
import { ApiConfigProvider } from './context/ApiConfigContext';

export const App: React.FC = () => {
  return (
    <ApiConfigProvider>
      <AppProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<OverviewDashboard />} />
            <Route path="analytics" element={<AccidentAnalytics />} />
            <Route path="prediction" element={<SeverityPrediction />} />
            <Route path="risk-analysis" element={<RiskAnalysis />} />
            <Route path="hotspots" element={<HotspotsPage />} />
            <Route path="risk-factors" element={<RiskFactorsPage />} />
            <Route path="recommendations" element={<SafetyRecommendationsPage />} />
            <Route path="model-performance" element={<ModelPerformancePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="data-management" element={<DataManagementPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AppProvider>
    </ApiConfigProvider>
  );
};

export default App;
