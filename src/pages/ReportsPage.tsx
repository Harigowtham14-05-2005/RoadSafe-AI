import React, { useState } from 'react';
import { FileText, Download, Printer, Shield, CheckCircle2, Sparkles, Sliders } from 'lucide-react';
import { ReportConfig } from '../types/analytics';
import { ReportPreviewModal } from '../components/reports/ReportPreviewModal';
import { dataService } from '../services/dataService';

export const ReportsPage: React.FC = () => {
  const [config, setConfig] = useState<ReportConfig>({
    reportType: 'full',
    dateRange: 'Last 30 Days',
    region: 'All Corridors',
    includeCharts: true,
    includeRawData: true,
    includeRecommendations: true,
    authorName: 'Dr. Rajesh Varma',
    department: 'Department of Road Safety & Traffic Management'
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const reportTypes = [
    { id: 'full', label: 'Full Comprehensive Safety Audit', desc: 'Complete executive synthesis, KPI metrics, GIS hotspots, XAI feature importance, and authority actions.' },
    { id: 'summary', label: 'Accident Telemetry Summary', desc: 'High-level aggregated volumes, monthly trends, and severity distributions.' },
    { id: 'severity', label: 'Severity & Fatality Diagnostics', desc: 'Deep dive into fatal/serious crashes, driver demographics, and vehicle mode vulnerability.' },
    { id: 'hotspots', label: 'Geospatial Hotspots & Corridor Audit', desc: 'Critical high-risk locations list, peak commute windows, and junction merge conflicts.' },
    { id: 'risk', label: 'Environmental & Roadway Risk Profile', desc: 'Friction analysis, weather impact curves, and speed limit correlations.' },
    { id: 'model', label: 'ML Model Performance & Validation', desc: 'Random Forest and XGBoost benchmarks, confusion matrix, and feature attributions.' }
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreviewOpen(true);
  };

  const handleExportDirectCSV = () => {
    dataService.exportToCSV();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <FileText size={20} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Road Safety Audit Reports & Policy Briefings
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Generate formal, print-ready safety assessment reports for highway authorities, police commissioners, and transport planners.
          </p>
        </div>

        <button
          onClick={handleExportDirectCSV}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all self-start md:self-auto"
        >
          <Download size={15} />
          <span>Export Full Raw CSV (5,000+ Records)</span>
        </button>
      </div>

      <form onSubmit={handleGenerate} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Report Type Selection (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
            <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
              1. Select Report Template
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reportTypes.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setConfig(prev => ({ ...prev, reportType: t.id as any }))}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    config.reportType === t.id
                      ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-500/20 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <h4 className="font-bold text-xs text-slate-900">{t.label}</h4>
                      {config.reportType === t.id && (
                        <CheckCircle2 size={16} className="text-blue-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Report Sections Customization */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-3">
            <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
              2. Included Modules & Visualizations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <label className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2 cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={config.includeCharts}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeCharts: e.target.checked }))}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="font-semibold text-slate-800">Visual Charts & Trends</span>
              </label>

              <label className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2 cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={config.includeRecommendations}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeRecommendations: e.target.checked }))}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="font-semibold text-slate-800">Actionable Interventions</span>
              </label>

              <label className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center gap-2 cursor-pointer hover:bg-slate-100">
                <input
                  type="checkbox"
                  checked={config.includeRawData}
                  onChange={(e) => setConfig(prev => ({ ...prev, includeRawData: e.target.checked }))}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="font-semibold text-slate-800">Corridor Tabular Summary</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Parameters & Generate CTA (1 Col) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-base text-slate-900 pb-2 border-b border-slate-100">
              3. Metadata & Parameters
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Time Scope</label>
                <select
                  value={config.dateRange}
                  onChange={(e) => setConfig(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  <option value="Last 30 Days">Last 30 Days</option>
                  <option value="Last 6 Months">Last 6 Months</option>
                  <option value="Last Year (2025-2026)">Last Year (2025–2026)</option>
                  <option value="All Time Telemetry">All Time Historical Telemetry</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Geographical Scope</label>
                <select
                  value={config.region}
                  onChange={(e) => setConfig(prev => ({ ...prev, region: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  <option value="All Corridors">All National & Urban Corridors</option>
                  <option value="Northern Expressway Corridor">Northern Expressway Corridor</option>
                  <option value="Capital Metropolitan District">Capital Metropolitan District</option>
                  <option value="Western Highway Sector">Western Highway Sector</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Author / Lead Analyst</label>
                <input
                  type="text"
                  value={config.authorName}
                  onChange={(e) => setConfig(prev => ({ ...prev, authorName: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Issuing Department</label>
                <input
                  type="text"
                  value={config.department}
                  onChange={(e) => setConfig(prev => ({ ...prev, department: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileText size={16} />
              <span>Generate Report & Print Preview</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              Formatted for official government export & PDF compliance.
            </p>
          </div>
        </div>
      </form>

      {/* Preview Modal */}
      <ReportPreviewModal
        config={config}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
      />
    </div>
  );
};
