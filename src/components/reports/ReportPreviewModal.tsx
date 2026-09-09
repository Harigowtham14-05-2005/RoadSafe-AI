import React from 'react';
import { X, Printer, Download, Shield, FileText, CheckCircle2 } from 'lucide-react';
import { ReportConfig } from '../../types/analytics';
import { dataService } from '../../services/dataService';

interface ReportPreviewModalProps {
  config: ReportConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  config,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    dataService.exportToCSV();
  };

  const reportDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-4 sm:inset-10 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col border border-slate-200 max-w-5xl mx-auto">
        {/* Modal Toolbar (no-print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-blue-400" />
            <span className="font-bold text-sm">Official Road Safety Intelligence Report</span>
            <span className="text-xs text-slate-400">({config.reportType.toUpperCase()})</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all"
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors ml-2"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Document Printable Body */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 text-slate-900 bg-white print:p-0">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Report Header */}
            <div className="border-b-2 border-slate-900 pb-6 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Shield size={22} className="text-blue-600" />
                  <span className="font-extrabold text-xl tracking-tight">RoadSafe AI Intelligence</span>
                </div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
                  Road Accident Severity & Hotspot Safety Audit
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Statistical synthesis and machine learning severity analysis for transportation policy.
                </p>
              </div>

              <div className="text-right text-xs text-slate-600">
                <p className="font-bold text-slate-900">Document Ref: RSAI-2026-RPT</p>
                <p className="mt-0.5">Date: {reportDate}</p>
                <p className="mt-0.5">Scope: {config.dateRange.toUpperCase()} Period</p>
                <p className="mt-0.5 text-blue-600 font-semibold">{config.department}</p>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                1. Executive Summary & Key Telemetry
              </h3>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-semibold block">Total Collisions</span>
                  <span className="text-xl font-extrabold text-slate-900 mt-1 block">24,582</span>
                  <span className="text-[10px] text-emerald-600 font-bold">+4.2% YoY</span>
                </div>
                <div className="p-3.5 bg-red-50/60 rounded-xl border border-red-200">
                  <span className="text-red-600 font-semibold block">Fatal Casualties</span>
                  <span className="text-xl font-extrabold text-red-700 mt-1 block">1,248</span>
                  <span className="text-[10px] text-emerald-700 font-bold">-8.1% Decrease</span>
                </div>
                <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200">
                  <span className="text-amber-700 font-semibold block">Serious Casualties</span>
                  <span className="text-xl font-extrabold text-amber-800 mt-1 block">5,634</span>
                  <span className="text-[10px] text-emerald-700 font-bold">-2.4% Decrease</span>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mt-2">
                During the evaluated period, total fatal collisions fell by 8.1% following targeted automated speed radar deployments on National Highway corridors. However, adverse weather conditions (monsoon rains and morning winter fog) continue to account for <strong>62.4% of multi-vehicle pileups</strong>.
              </p>
            </div>

            {/* High Risk Hotspots Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                2. Priority Critical Hotspots Identified
              </h3>
              <table className="w-full text-left text-xs border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 font-bold text-slate-700">
                    <th className="p-2 border border-slate-200">Hotspot Location</th>
                    <th className="p-2 border border-slate-200">Risk Score</th>
                    <th className="p-2 border border-slate-200">Total Crashes</th>
                    <th className="p-2 border border-slate-200">Fatalities</th>
                    <th className="p-2 border border-slate-200">Primary Contributing Risk</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-slate-200 font-bold">NH-44 Highway Mile 142</td>
                    <td className="p-2 border border-slate-200 font-bold text-red-600">89 / 100</td>
                    <td className="p-2 border border-slate-200">438</td>
                    <td className="p-2 border border-slate-200 text-red-600 font-bold">29</td>
                    <td className="p-2 border border-slate-200">Wet surface hydroplaning & high speed</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 font-bold">Outer Ring Road Junction 14</td>
                    <td className="p-2 border border-slate-200 font-bold text-orange-600">84 / 100</td>
                    <td className="p-2 border border-slate-200">312</td>
                    <td className="p-2 border border-slate-200 text-red-600 font-bold">18</td>
                    <td className="p-2 border border-slate-200">Morning commute merge conflict + fog</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 font-bold">Grand Trunk Road Corridor B</td>
                    <td className="p-2 border border-slate-200 font-bold text-orange-600">78 / 100</td>
                    <td className="p-2 border border-slate-200">285</td>
                    <td className="p-2 border border-slate-200 text-red-600 font-bold">14</td>
                    <td className="p-2 border border-slate-200">Potholes & lack of street illumination</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Model Architecture & XAI Insights */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                3. Machine Learning Model Insights
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed">
                The deployed Random Forest R classifier (Accuracy 87.4%, ROC-AUC 0.932) indicates that <strong>speed limits exceeding 80 km/h</strong> and <strong>wet road surface conditions</strong> account for 43.7% of total severity variance. Nighttime driving on unlit single carriageways represents the highest probability of fatal outcomes.
              </p>
            </div>

            {/* Policy Interventions */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1">
                4. Mandatory Recommended Interventions
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Deploy Automated Speed Enforcement Radars:</span>
                    <span className="text-slate-600">Install dynamic variable speed signs and enforcement radars along NH-44 and Expressway links.</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">High-Friction Surface Resurfacing:</span>
                    <span className="text-slate-600">Resurface high-risk waterlogging zones with porous asphalt to prevent monsoon hydroplaning.</span>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Solar High-Mast Corridor Lighting:</span>
                    <span className="text-slate-600">Eliminate dark zones on rural undivided highways with autonomous solar LED illumination poles.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign-off */}
            <div className="pt-8 border-t border-slate-300 flex justify-between items-end text-xs">
              <div>
                <p className="font-bold text-slate-900">Prepared By:</p>
                <p className="text-slate-700">{config.authorName || 'Dr. Rajesh Varma'}</p>
                <p className="text-slate-500">{config.department || 'Department of Road Safety & Traffic Management'}</p>
              </div>
              <div className="text-right">
                <div className="h-10 w-32 border-b border-slate-400 mb-1 ml-auto" />
                <p className="font-bold text-slate-900">Official Sign-off & Seal</p>
                <p className="text-[10px] text-slate-400">Road Safety Intelligence Bureau</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
