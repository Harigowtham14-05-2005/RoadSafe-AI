import React, { useState } from 'react';
import { 
  Settings, 
  Server, 
  Sliders, 
  Map, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { useApiConfig } from '../context/ApiConfigContext';

export const SettingsPage: React.FC = () => {
  const { isRServerOnline, isChecking, rApiUrl, setRApiUrl, recheckHealth, activeProductionModel, setActiveProductionModel } = useApiConfig();
  const [urlInput, setUrlInput] = useState<string>(rApiUrl);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [speedUnit, setSpeedUnit] = useState<'kmh' | 'mph'>('kmh');
  const [mapStyle, setMapStyle] = useState<'voyager' | 'dark' | 'satellite'>('voyager');

  const handleSaveApiUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    setRApiUrl(urlInput);
    await recheckHealth();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(null as any), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <Settings size={20} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            System Settings & Integration Architecture
          </h1>
        </div>
        <p className="text-xs text-slate-500">
          Configure connection endpoints for the R Plumber machine learning server, adjust risk thresholds, and manage environment preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* R Plumber Server Connection */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <Server size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">R Plumber REST API Server</h3>
                <p className="text-xs text-slate-500">Host endpoint serving machine learning inference</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border bg-slate-50">
              <span className={`h-2 w-2 rounded-full ${isRServerOnline ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
              <span className={isRServerOnline ? 'text-emerald-700' : 'text-slate-700'}>
                {isRServerOnline ? 'R Server Online' : 'Simulation Engine Active'}
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveApiUrl} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">R Plumber API Base URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="http://127.0.0.1:8000"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono text-xs focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => recheckHealth()}
                  disabled={isChecking}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg border border-slate-200 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw size={13} className={isChecking ? 'animate-spin' : ''} />
                  <span>Test Ping</span>
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-slate-600">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-700">How to launch the live R server:</span>
                <span className="text-blue-600 font-mono">Port 8000</span>
              </div>
              <p className="text-[11px] font-mono bg-slate-900 text-emerald-400 p-2 rounded-md select-all">
                Rscript backend_r/start_api.R
              </p>
              <p className="text-[10px] text-slate-500">
                When active, all requests are forwarded directly to R. If offline, RoadSafe AI seamlessly falls back to its built-in Random Forest browser engine.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 size={15} />
              <span>Save & Connect API</span>
            </button>

            {savedSuccess && (
              <div className="p-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold text-center">
                API Endpoint Updated & Tested!
              </div>
            )}
          </form>
        </div>

        {/* Risk Thresholds & Model Selector */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
              <Sliders size={18} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900">Risk Classifications & Units</h3>
              <p className="text-xs text-slate-500">Adjust severity trigger boundaries</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Active Production Inference Model</label>
              <select
                value={activeProductionModel}
                onChange={(e) => setActiveProductionModel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Random Forest Classifier (R)">Random Forest Classifier (R Engine) — 87.4% Acc</option>
                <option value="XGBoost Gradient Boosting">XGBoost Classifier — 88.1% Acc</option>
                <option value="Decision Tree (CART rpart)">Decision Tree (CART) — 81.2% Acc</option>
                <option value="Multinomial Logistic Regression">Multinomial Logistic Regression — 78.4% Acc</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Velocity Speed Units</label>
                <select
                  value={speedUnit}
                  onChange={(e) => setSpeedUnit(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  <option value="kmh">Kilometers per hour (km/h)</option>
                  <option value="mph">Miles per hour (mph)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">GIS Map Canvas Theme</label>
                <select
                  value={mapStyle}
                  onChange={(e) => setMapStyle(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  <option value="voyager">CARTO Voyager (Clean Contrast)</option>
                  <option value="dark">Dark Slate Canvas</option>
                  <option value="satellite">High-Res Satellite</option>
                </select>
              </div>
            </div>

            {/* Risk Cutoffs Summary */}
            <div className="pt-3 border-t border-slate-100">
              <span className="font-bold text-slate-700 block mb-2">Composite Risk Threshold Bands:</span>
              <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-800 block">Low</span>
                  <span className="text-slate-500 font-mono text-[10px]">&lt; 40</span>
                </div>
                <div className="p-2 rounded-lg bg-yellow-50 border border-yellow-200">
                  <span className="font-bold text-yellow-800 block">Medium</span>
                  <span className="text-slate-500 font-mono text-[10px]">40–69</span>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
                  <span className="font-bold text-amber-800 block">High</span>
                  <span className="text-slate-500 font-mono text-[10px]">70–84</span>
                </div>
                <div className="p-2 rounded-lg bg-red-50 border border-red-200">
                  <span className="font-bold text-red-800 block">Critical</span>
                  <span className="text-slate-500 font-mono text-[10px]">85–100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
