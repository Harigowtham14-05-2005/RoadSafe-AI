import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, 
  UploadCloud, 
  FileSpreadsheet, 
  Download, 
  RefreshCw, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Trash2
} from 'lucide-react';
import { dataService, DatasetQualityReport } from '../services/dataService';
import { AccidentRecord } from '../types/accident';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { RiskBadge } from '../components/common/RiskBadge';

export const DataManagementPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [records, setRecords] = useState<AccidentRecord[]>([]);
  const [qualityReport, setQualityReport] = useState<DatasetQualityReport | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const pageSize = 15;

  const loadData = () => {
    const recs = dataService.getRecords();
    setRecords(recs);
    setQualityReport(dataService.getQualityReport());
  };

  useEffect(() => {
    loadData();
    const unsubscribe = dataService.subscribe(() => {
      loadData();
    });
    return unsubscribe;
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const report = await dataService.parseAndImportCSV(file);
      setQualityReport(report);
      setUploadSuccess(`Successfully imported ${report.totalRows.toLocaleString()} accident records!`);
      setTimeout(() => setUploadSuccess(null), 5000);
    } catch (err) {
      console.error('CSV import error:', err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const report = await dataService.parseAndImportCSV(file);
      setQualityReport(report);
      setUploadSuccess(`Successfully parsed ${report.totalRows.toLocaleString()} rows from ${file.name}`);
      setTimeout(() => setUploadSuccess(null), 5000);
    } catch (err) {
      console.error('CSV drop parse error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  // Filtered and paginated records
  const filtered = records.filter(r => {
    if (severityFilter !== 'all' && r.severity !== severityFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        r.accident_id.toLowerCase().includes(q) ||
        r.location_name.toLowerCase().includes(q) ||
        r.road_type.toLowerCase().includes(q) ||
        r.weather.toLowerCase().includes(q) ||
        r.vehicle_type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginatedRecords = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Database size={20} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Accident Telemetry Data Management
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Upload historical crash logs (CSV), validate schema compliance, audit data completeness, and inspect records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dataService.resetToDefault()}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 flex items-center gap-1.5 transition-colors"
            title="Reset dataset to default 5,000 telemetry records"
          >
            <RefreshCw size={13} />
            <span>Reset Default Dataset</span>
          </button>
          <button
            onClick={() => dataService.exportToCSV()}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* CSV Upload & Data Quality Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Drag and Drop Area */}
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="lg:col-span-2 bg-white rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 p-8 shadow-card flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-blue-50/20 group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".csv"
            className="hidden"
          />
          <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform mb-3 border border-blue-100">
            <UploadCloud size={32} />
          </div>
          <h3 className="font-bold text-slate-900 text-sm">
            {isUploading ? 'Parsing & Ingesting Telemetry Data...' : 'Drag & Drop Accident CSV File Here'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Upload historical accident records with columns for weather, speed limit, road surface, and severity to trigger automated ML retraining.
          </p>
          <span className="mt-3 px-3 py-1 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white rounded-lg text-xs font-bold text-slate-700 transition-colors">
            Browse Local File (.csv)
          </span>
          {uploadSuccess && (
            <div className="mt-3 p-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 size={14} />
              <span>{uploadSuccess}</span>
            </div>
          )}
        </div>

        {/* Dataset Quality Score Card */}
        {qualityReport && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase text-slate-400">Dataset Health & Integrity</span>
                <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                  <ShieldCheck size={14} />
                  Validated
                </span>
              </div>

              <div className="space-y-3 mt-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold text-slate-700">Data Quality Score</span>
                  <span className="text-2xl font-extrabold text-blue-600">{qualityReport.qualityScore}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${qualityReport.qualityScore}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Total Rows</span>
                    <span className="font-bold text-slate-900">{qualityReport.totalRows.toLocaleString()}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Features</span>
                    <span className="font-bold text-slate-900">{qualityReport.totalColumns} cols</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Missing Fields</span>
                    <span className="font-bold text-emerald-700">{qualityReport.missingValues}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Active File</span>
                    <span className="font-bold text-slate-900 truncate block text-[11px]">{qualityReport.fileName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-600">
              <span className="font-bold text-slate-800">Class Balance: </span>
              {qualityReport.severityCounts.Minor} Minor | {qualityReport.severityCounts.Serious} Serious | {qualityReport.severityCounts.Fatal} Fatal
            </div>
          </div>
        )}
      </div>

      {/* Dataset Table & Search */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 space-y-4">
        {/* Table Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-slate-900">Historical Crash Records</h3>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              {filtered.length.toLocaleString()} matching
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search accident ID, location, road..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={severityFilter}
              onChange={(e) => {
                setSeverityFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Severities</option>
              <option value="Minor">Minor Only</option>
              <option value="Serious">Serious Only</option>
              <option value="Fatal">Fatal Only</option>
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <th className="py-3 px-3">Crash ID</th>
                <th className="py-3 px-3">Date & Time</th>
                <th className="py-3 px-4">Location Sector</th>
                <th className="py-3 px-3">Weather</th>
                <th className="py-3 px-3">Road Surface</th>
                <th className="py-3 px-3">Speed</th>
                <th className="py-3 px-3">Vehicle</th>
                <th className="py-3 px-3">Risk Index</th>
                <th className="py-3 px-3 text-right">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {paginatedRecords.map((r) => (
                <tr key={r.accident_id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-blue-600">
                    {r.accident_id}
                  </td>
                  <td className="py-3 px-3 text-slate-700 whitespace-nowrap">
                    {r.date} <span className="text-slate-400">{r.time}</span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 truncate max-w-[200px]" title={r.location_name}>
                    {r.location_name}
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {r.weather}
                  </td>
                  <td className="py-3 px-3 text-slate-700">
                    {r.road_surface}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-800">
                    {r.speed_limit} km/h
                  </td>
                  <td className="py-3 px-3 text-slate-700 truncate max-w-[120px]">
                    {r.vehicle_type}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {r.risk_score}/100
                  </td>
                  <td className="py-3 px-3 text-right">
                    <SeverityBadge severity={r.severity} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
          <span>
            Showing <strong>{(currentPage - 1) * pageSize + 1}</strong> to <strong>{Math.min(currentPage * pageSize, filtered.length)}</strong> of <strong>{filtered.length.toLocaleString()}</strong> records
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-bold text-slate-800">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
