import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertOctagon, 
  Skull, 
  Activity, 
  Gauge, 
  MapPin, 
  Cpu, 
  Sparkles,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { KPICard } from '../components/common/KPICard';
import { ChartCard } from '../components/common/ChartCard';
import { TrendChart } from '../components/analytics/TrendChart';
import { SeverityDonut } from '../components/analytics/SeverityDonut';
import { HourlyDistribution } from '../components/analytics/HourlyDistribution';
import { WeatherAnalysis } from '../components/analytics/WeatherAnalysis';
import { RoadConditionGrid } from '../components/analytics/RoadConditionGrid';
import { CrossFilterBar } from '../components/analytics/CrossFilterBar';
import { CardSkeleton, LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { analyticsService } from '../services/analyticsService';
import { OverviewDashboardData, TrendDataPoint, HourlyDataPoint, WeatherAnalyticsPoint, RoadSurfaceAnalyticsPoint } from '../types/analytics';
import { useApp } from '../context/AppContext';

export const OverviewDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { filters } = useApp();
  const [loading, setLoading] = useState(true);
  const [overviewData, setOverviewData] = useState<OverviewDashboardData | null>(null);
  const [trends, setTrends] = useState<TrendDataPoint[]>([]);
  const [hourlyData, setHourlyData] = useState<HourlyDataPoint[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherAnalyticsPoint[]>([]);
  const [roadData, setRoadData] = useState<RoadSurfaceAnalyticsPoint[]>([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [ov, tr, hr, we, rd] = await Promise.all([
          analyticsService.getOverviewData(),
          analyticsService.getTrends('monthly', filters.region, filters.roadType),
          analyticsService.getHourlyDistribution(),
          analyticsService.getWeatherAnalysis(),
          analyticsService.getRoadConditionAnalysis()
        ]);
        setOverviewData(ov);
        setTrends(tr);
        setHourlyData(hr);
        setWeatherData(we);
        setRoadData(rd);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [filters.dateRange, filters.region, filters.roadType]);

  if (loading || !overviewData) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-96 bg-slate-200 rounded-lg animate-pulse" />
        </div>
        <CardSkeleton count={6} />
        <LoadingSkeleton rows={6} height="h-32" />
      </div>
    );
  }

  const { kpi, severity_distribution } = overviewData;

  return (
    <div className="space-y-6">
      {/* Executive Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Road Safety Intelligence
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-700 border border-blue-200">
              Live Telemetry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            AI-powered accident severity prediction, risk factor analysis, and public safety intelligence.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/prediction')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Zap size={15} />
            <span>AI Severity Predictor</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => navigate('/hotspots')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-all"
          >
            <MapPin size={15} />
            <span>Explore 37 Hotspots</span>
          </button>
        </div>
      </div>

      {/* Global Filter Toolbar */}
      <CrossFilterBar />

      {/* 6 Primary Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard
          title="Total Accidents"
          metric={kpi.total_accidents}
          icon={<AlertOctagon size={20} />}
          iconBgColor="bg-blue-50 text-blue-600 border-blue-100"
          subtext="24,582 indexed"
          onClick={() => navigate('/analytics')}
        />
        <KPICard
          title="Fatal Accidents"
          metric={kpi.fatal_accidents}
          icon={<Skull size={20} />}
          iconBgColor="bg-red-50 text-red-600 border-red-100"
          invertTrendColor={true}
          subtext="5.1% total share"
          onClick={() => navigate('/analytics')}
        />
        <KPICard
          title="Serious Accidents"
          metric={kpi.serious_accidents}
          icon={<Activity size={20} />}
          iconBgColor="bg-amber-50 text-amber-600 border-amber-100"
          invertTrendColor={true}
          subtext="22.9% total share"
          onClick={() => navigate('/analytics')}
        />
        <KPICard
          title="Average Risk Score"
          metric={kpi.avg_risk_score}
          icon={<Gauge size={20} />}
          iconBgColor="bg-orange-50 text-orange-600 border-orange-100"
          invertTrendColor={true}
          subtext="Moderate-High"
          onClick={() => navigate('/risk-analysis')}
        />
        <KPICard
          title="High-Risk Locations"
          metric={kpi.high_risk_locations}
          icon={<MapPin size={20} />}
          iconBgColor="bg-purple-50 text-purple-600 border-purple-100"
          invertTrendColor={true}
          subtext="37 active zones"
          onClick={() => navigate('/hotspots')}
        />
        <KPICard
          title="Model Accuracy"
          metric={kpi.model_accuracy}
          icon={<Cpu size={20} />}
          iconBgColor="bg-emerald-50 text-emerald-600 border-emerald-100"
          subtext="Random Forest (R)"
          onClick={() => navigate('/model-performance')}
        />
      </div>

      {/* Row 2: Accident Trends (Large Chart) & Severity Distribution (Donut) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accident Trends (2 Cols) */}
        <div className="lg:col-span-2">
          <ChartCard
            title="Accident Historical Trends"
            subtitle="Multi-series temporal progression across severity tiers (2025–2026)"
            infoTooltip="Toggle between Total, Fatal, Serious, and Minor accident frequencies to observe seasonal correlation."
          >
            <TrendChart data={trends} />
          </ChartCard>
        </div>

        {/* Severity Distribution Donut (1 Col) */}
        <div>
          <ChartCard
            title="Accident Severity Distribution"
            subtitle="Proportional split of collision severity classes"
            infoTooltip="Minor collisions constitute majority volume, while fatal crashes demand targeted speed and lighting interventions."
          >
            <SeverityDonut data={severity_distribution} totalAccidents={24582} />
          </ChartCard>
        </div>
      </div>

      {/* Row 3: Accidents by Hour & Weather Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Accidents by Hour (0-23) */}
        <ChartCard
          title="Accidents by Hour of Day (00:00–23:00)"
          subtitle="Hourly collision density highlighting morning, evening, and night fatality spikes"
          infoTooltip="Color bands indicate evening rush (Orange), morning rush (Blue), and late-night high-fatality window (Red)."
        >
          <HourlyDistribution data={hourlyData} />
        </ChartCard>

        {/* Weather Analysis */}
        <ChartCard
          title="Accidents by Weather Condition"
          subtitle="Comparative volume and severity breakdown across atmospheric conditions"
          infoTooltip="Rain and dense fog conditions significantly accelerate fatal outcome probability."
        >
          <WeatherAnalysis data={weatherData} />
        </ChartCard>
      </div>

      {/* Row 4: Road Surface Condition Analytics */}
      <ChartCard
        title="Road Surface Condition & Grip Analysis"
        subtitle="Impact of pavement friction, waterlogging, and asphalt degradation on collision frequency"
        infoTooltip="Wet and icy road surfaces exhibit 2.2x to 3.8x higher severe collision likelihood due to increased braking distance."
      >
        <RoadConditionGrid data={roadData} />
      </ChartCard>
    </div>
  );
};
