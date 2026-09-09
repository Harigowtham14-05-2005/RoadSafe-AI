import { 
  SeverityLevel, 
  RiskLevel, 
  WeatherType, 
  RoadSurfaceType, 
  LightConditionType, 
  RoadType, 
  JunctionType, 
  VehicleType, 
  UrbanRuralType, 
  DriverGender 
} from './accident';

export interface PredictionRequest {
  number_of_vehicles: number;
  number_of_casualties: number;
  vehicle_type: VehicleType;
  driver_age: number;
  driver_gender: DriverGender;
  road_type: RoadType;
  junction_type: JunctionType;
  speed_limit: number;
  road_surface: RoadSurfaceType;
  urban_rural: UrbanRuralType;
  weather: WeatherType;
  light_condition: LightConditionType;
  visibility_km?: number;
  time_of_day?: string;
  latitude?: number;
  longitude?: number;
  region?: string;
}

export interface ContributingFactor {
  factor: string;
  impact: 'High' | 'Medium' | 'Low';
  level: 'high' | 'medium' | 'low';
  direction: 'increases_risk' | 'decreases_risk' | 'neutral';
  contribution_pct: number;
  explanation: string;
}

export interface SafetyRecommendation {
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  title: string;
  reason: string;
  action: string;
  responsible_entity?: string;
}

export interface PredictionResponse {
  severity: SeverityLevel;
  risk_score: number;
  risk_level: RiskLevel;
  probabilities: {
    Minor: number;
    Serious: number;
    Fatal: number;
  };
  model_version: string;
  explanation_summary: string;
  contributing_factors: ContributingFactor[];
  recommendations: SafetyRecommendation[];
  inference_time_ms?: number;
}

export interface PresetScenario {
  id: string;
  name: string;
  description: string;
  tag: 'High Risk' | 'Moderate Risk' | 'Low Risk';
  data: PredictionRequest;
}
