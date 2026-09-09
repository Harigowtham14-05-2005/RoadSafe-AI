export type SeverityLevel = 'Minor' | 'Serious' | 'Fatal';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type WeatherType = 'Clear' | 'Rain' | 'Fog' | 'Storm' | 'Other';
export type RoadSurfaceType = 'Dry' | 'Wet' | 'Icy' | 'Poor surface' | 'Unknown';
export type LightConditionType = 
  | 'Daylight' 
  | 'Darkness: street lights present and lit' 
  | 'Darkness: no street lights' 
  | 'Darkness: street lights unlit';
export type RoadType = 
  | 'Single carriageway' 
  | 'Dual carriageway' 
  | 'Highway' 
  | 'Roundabout' 
  | 'One way street' 
  | 'T-Junction';
export type JunctionType = 
  | 'Not at junction' 
  | 'T-Junction' 
  | 'Crossroads' 
  | 'Roundabout' 
  | 'Slip road / Merge ramp' 
  | 'Multiple junction';
export type VehicleType = 
  | 'Car' 
  | 'Motorcycle' 
  | 'Truck / Heavy Goods' 
  | 'Bus' 
  | 'Van / Light Goods' 
  | 'Bicycle';
export type UrbanRuralType = 'Urban' | 'Rural';
export type DriverGender = 'Male' | 'Female';

export interface AccidentRecord {
  accident_id: string;
  date: string;
  time: string;
  latitude: number;
  longitude: number;
  location_name: string;
  region: string;
  weather: WeatherType;
  road_surface: RoadSurfaceType;
  light_condition: LightConditionType;
  road_type: RoadType;
  junction_type: JunctionType;
  speed_limit: number;
  vehicle_type: VehicleType;
  number_of_vehicles: number;
  number_of_casualties: number;
  urban_rural: UrbanRuralType;
  driver_age: number;
  driver_gender: DriverGender;
  risk_score: number;
  severity: SeverityLevel;
}

export interface HotspotLocation {
  id: string;
  name: string;
  road_name: string;
  latitude: number;
  longitude: number;
  risk_score: number;
  risk_level: RiskLevel;
  total_accidents: number;
  fatal_accidents: number;
  serious_accidents: number;
  minor_accidents: number;
  peak_time: string;
  dominant_weather: WeatherType;
  dominant_surface: RoadSurfaceType;
  speed_limit: number;
  junction_density: string;
  contributing_factors: string[];
  recommended_action: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  monthly_trend?: { month: string; accidents: number }[];
}

export interface GlobalFilterState {
  dateRange: 'today' | '7d' | '30d' | '6m' | '1y' | 'custom';
  customStartDate?: string;
  customEndDate?: string;
  severity: 'all' | SeverityLevel;
  region: string;
  roadType: string;
  weather: string;
  urbanRural: 'all' | UrbanRuralType;
  searchQuery: string;
}
