export interface KPIMetric {
  value: number | string;
  change_pct: number;
  trend: 'up' | 'down' | 'neutral';
  prev_period?: number | string;
  unit?: string;
  status?: string;
}

export interface OverviewDashboardData {
  kpi: {
    total_accidents: KPIMetric;
    fatal_accidents: KPIMetric;
    serious_accidents: KPIMetric;
    minor_accidents: KPIMetric;
    avg_risk_score: KPIMetric;
    high_risk_locations: KPIMetric;
    model_accuracy: KPIMetric;
  };
  severity_distribution: {
    name: string;
    count: number;
    percentage: number;
    color: string;
  }[];
  peak_hourly_insight: {
    peak_window: string;
    morning_peak: string;
    highest_fatality_window: string;
    insight_text: string;
  };
}

export interface TrendDataPoint {
  month: string;
  period: string;
  total: number;
  minor: number;
  serious: number;
  fatal: number;
  risk_index: number;
}

export interface HourlyDataPoint {
  hour: number;
  hour_label: string;
  total: number;
  minor: number;
  serious: number;
  fatal: number;
  avg_risk: number;
}

export interface WeatherAnalyticsPoint {
  weather: string;
  total: number;
  minor: number;
  serious: number;
  fatal: number;
  fatal_rate_pct: number;
  serious_rate_pct: number;
}

export interface RoadSurfaceAnalyticsPoint {
  surface: string;
  total: number;
  minor: number;
  serious: number;
  fatal: number;
  avg_risk: number;
  description: string;
}

export interface CriticalLocationItem {
  location: string;
  risk_score: number;
  accidents: number;
  fatalities: number;
  primary_risk: string;
  recommended_action: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: string;
}

export interface PolicyRecommendationItem {
  category: 'Infrastructure' | 'Enforcement' | 'Lighting' | 'Signage';
  title: string;
  count_locations: number;
  estimated_impact: string;
}

export interface ReportConfig {
  reportType: 'summary' | 'severity' | 'risk' | 'hotspots' | 'model' | 'full';
  dateRange: string;
  region: string;
  includeCharts: boolean;
  includeRawData: boolean;
  includeRecommendations: boolean;
  authorName: string;
  department: string;
}
