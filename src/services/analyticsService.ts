import { 
  OverviewDashboardData, 
  TrendDataPoint, 
  HourlyDataPoint, 
  WeatherAnalyticsPoint, 
  RoadSurfaceAnalyticsPoint,
  CriticalLocationItem,
  PolicyRecommendationItem
} from '../types/analytics';
import { ModelPerformanceData, FeatureImportanceItem } from '../types/model';
import { HotspotLocation } from '../types/accident';
import { 
  MOCK_HOTSPOTS, 
  MOCK_FEATURE_IMPORTANCE, 
  MOCK_MODEL_PERFORMANCE, 
  MOCK_CRITICAL_LOCATIONS, 
  MOCK_POLICY_RECOMMENDATIONS 
} from './mockData';
import { dataService } from './dataService';
import { api } from './api';

class AnalyticsService {
  public async getOverviewData(): Promise<OverviewDashboardData> {
    const { data, isFromRServer } = await api.request<OverviewDashboardData>('/api/overview');
    if (isFromRServer && data) return data;

    const records = dataService.getRecords();
    const total = 24582; // Executive dataset base
    const fatal = 1248;
    const serious = 5634;
    const minor = total - fatal - serious;

    return {
      kpi: {
        total_accidents: {
          value: total.toLocaleString(),
          change_pct: 4.2,
          trend: 'up',
          prev_period: '23,591',
          status: '+991 this period'
        },
        fatal_accidents: {
          value: fatal.toLocaleString(),
          change_pct: -8.1,
          trend: 'down',
          prev_period: '1,358',
          status: '-110 decrease'
        },
        serious_accidents: {
          value: serious.toLocaleString(),
          change_pct: -2.4,
          trend: 'down',
          prev_period: '5,772',
          status: '-138 decrease'
        },
        minor_accidents: {
          value: minor.toLocaleString(),
          change_pct: 6.1,
          trend: 'up',
          prev_period: '16,461',
          status: '+1,239 increase'
        },
        avg_risk_score: {
          value: '67/100',
          change_pct: -3.5,
          trend: 'down',
          prev_period: '69.4',
          status: 'Moderate-High'
        },
        high_risk_locations: {
          value: '37',
          change_pct: -5.1,
          trend: 'down',
          prev_period: '39',
          status: '2 remediated'
        },
        model_accuracy: {
          value: '87.4%',
          change_pct: 1.2,
          trend: 'up',
          prev_period: '86.2%',
          status: 'Random Forest (R)'
        }
      },
      severity_distribution: [
        { name: 'Minor', count: minor, percentage: Math.round((minor / total) * 1000) / 10, color: '#10B981' },
        { name: 'Serious', count: serious, percentage: Math.round((serious / total) * 1000) / 10, color: '#F59E0B' },
        { name: 'Fatal', count: fatal, percentage: Math.round((fatal / total) * 1000) / 10, color: '#EF4444' }
      ],
      peak_hourly_insight: {
        peak_window: '18:00–21:00',
        morning_peak: '08:00–10:00',
        highest_fatality_window: '23:00–03:00',
        insight_text: 'Peak accident volume occurs during the evening commute (18:00–21:00) with heightened fatal probability after 23:00 due to reduced illumination and elevated speed.'
      }
    };
  }

  public async getTrends(granularity = 'monthly', region = 'all', roadType = 'all'): Promise<TrendDataPoint[]> {
    const { data, isFromRServer } = await api.request<{ trends: TrendDataPoint[] }>(`/api/trends?granularity=${granularity}&region=${region}&road_type=${roadType}`);
    if (isFromRServer && data?.trends) return data.trends;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((m, i) => {
      const base = 1800 + Math.round(Math.sin(i / 1.8) * 350);
      const fatal = Math.round(base * 0.051);
      const serious = Math.round(base * 0.229);
      const minor = base - fatal - serious;
      return {
        month: m,
        period: `2026-${(i + 1).toString().padStart(2, '0')}`,
        total: base,
        minor,
        serious,
        fatal,
        risk_index: Math.round(58 + (fatal * 1.5 / 10) + (serious * 0.4 / 10))
      };
    });
  }

  public async getHourlyDistribution(): Promise<HourlyDataPoint[]> {
    const hours: HourlyDataPoint[] = [];
    for (let h = 0; h < 24; h++) {
      let baseVolume = 300;
      let avgRisk = 45;

      // Morning peak: 8:00 - 10:00
      if (h >= 8 && h <= 10) {
        baseVolume = 1450 + (h === 9 ? 250 : 0);
        avgRisk = 62;
      }
      // Evening peak: 17:00 - 21:00
      else if (h >= 17 && h <= 21) {
        baseVolume = 1850 + (h === 19 ? 320 : 0);
        avgRisk = 74;
      }
      // Late night: 23:00 - 04:00 (High fatality rate)
      else if (h >= 23 || h <= 4) {
        baseVolume = 480;
        avgRisk = 82; // Higher fatal proportion
      } else {
        baseVolume = 850 + (h % 3) * 60;
        avgRisk = 52;
      }

      const fatalRate = (avgRisk / 100) * 0.08;
      const seriousRate = 0.24;
      const fatal = Math.round(baseVolume * fatalRate);
      const serious = Math.round(baseVolume * seriousRate);
      const minor = baseVolume - fatal - serious;

      hours.push({
        hour: h,
        hour_label: `${h.toString().padStart(2, '0')}:00`,
        total: baseVolume,
        minor,
        serious,
        fatal,
        avg_risk: avgRisk
      });
    }
    return hours;
  }

  public async getWeatherAnalysis(): Promise<WeatherAnalyticsPoint[]> {
    return [
      { weather: 'Clear', total: 14820, minor: 10670, serious: 3410, fatal: 740, fatal_rate_pct: 4.9, serious_rate_pct: 23.0 },
      { weather: 'Rain', total: 5410, minor: 3120, serious: 1890, fatal: 400, fatal_rate_pct: 7.4, serious_rate_pct: 34.9 },
      { weather: 'Fog', total: 2450, minor: 1320, serious: 890, fatal: 240, fatal_rate_pct: 9.8, serious_rate_pct: 36.3 },
      { weather: 'Storm', total: 1240, minor: 640, serious: 470, fatal: 130, fatal_rate_pct: 10.5, serious_rate_pct: 37.9 },
      { weather: 'Other', total: 662, minor: 440, serious: 180, fatal: 42, fatal_rate_pct: 6.3, serious_rate_pct: 27.2 }
    ];
  }

  public async getRoadConditionAnalysis(): Promise<RoadSurfaceAnalyticsPoint[]> {
    return [
      { surface: 'Dry', total: 16420, minor: 11980, serious: 3680, fatal: 760, avg_risk: 48, description: 'Standard baseline grip and predictable stopping distance.' },
      { surface: 'Wet', total: 5210, minor: 2980, serious: 1780, fatal: 450, avg_risk: 76, description: 'Hydroplaning and braking distances elevated by 2.2x.' },
      { surface: 'Poor surface', total: 1680, minor: 910, serious: 630, fatal: 140, avg_risk: 79, description: 'Potholes, edge drop-offs, and sudden obstacle swerves.' },
      { surface: 'Icy / Frost', total: 840, minor: 320, serious: 390, fatal: 130, avg_risk: 91, description: 'Extreme loss of lateral friction and lockup skidding.' },
      { surface: 'Unknown', total: 432, minor: 271, serious: 134, fatal: 27, avg_risk: 54, description: 'Unclassified or unrecorded pavement condition.' }
    ];
  }

  public async getHotspots(): Promise<HotspotLocation[]> {
    const { data, isFromRServer } = await api.request<HotspotLocation[]>('/api/hotspots');
    if (isFromRServer && Array.isArray(data) && data.length > 0) return data;
    return MOCK_HOTSPOTS;
  }

  public async getFeatureImportance(): Promise<{ features: FeatureImportanceItem[]; key_insight: string }> {
    const { data, isFromRServer } = await api.request<{ features: FeatureImportanceItem[]; key_insight: string }>('/api/risk-factors');
    if (isFromRServer && data?.features) return data;
    return {
      key_insight: 'Machine learning feature contribution indicates that environmental & roadway physics (speed limit, road surface, weather and illumination) account for over 72% of severity variance in serious and fatal collisions.',
      features: MOCK_FEATURE_IMPORTANCE
    };
  }

  public async getModelPerformance(): Promise<ModelPerformanceData> {
    const { data, isFromRServer } = await api.request<ModelPerformanceData>('/api/model-performance');
    if (isFromRServer && data?.models) return data;
    return MOCK_MODEL_PERFORMANCE;
  }

  public async getRecommendations(): Promise<{ critical_locations: CriticalLocationItem[]; policy_recommendations: PolicyRecommendationItem[] }> {
    const { data, isFromRServer } = await api.request<{ critical_locations: CriticalLocationItem[]; policy_recommendations: PolicyRecommendationItem[] }>('/api/recommendations');
    if (isFromRServer && data?.critical_locations) return data;
    return {
      critical_locations: MOCK_CRITICAL_LOCATIONS,
      policy_recommendations: MOCK_POLICY_RECOMMENDATIONS
    };
  }
}

export const analyticsService = new AnalyticsService();
