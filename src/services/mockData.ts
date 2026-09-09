import { AccidentRecord, HotspotLocation } from '../types/accident';
import { ModelPerformanceData, FeatureImportanceItem } from '../types/model';
import { CriticalLocationItem, PolicyRecommendationItem } from '../types/analytics';

export const MOCK_HOTSPOTS: HotspotLocation[] = [
  {
    id: 'HS-001',
    name: 'NH-44 Highway Mile 142 — High Risk Zone',
    road_name: 'National Highway 44',
    latitude: 28.6139,
    longitude: 77.2090,
    risk_score: 89,
    risk_level: 'CRITICAL',
    total_accidents: 438,
    fatal_accidents: 29,
    serious_accidents: 117,
    minor_accidents: 292,
    peak_time: '18:00–21:00',
    dominant_weather: 'Rain',
    dominant_surface: 'Wet',
    speed_limit: 100,
    junction_density: 'High Density Median Intersections',
    contributing_factors: [
      'Excessive vehicle speed (Avg 115 km/h in 100 km/h zone)',
      'Poor highway illumination & missing retroreflectors',
      'Wet road surface & hydroplaning during monsoon',
      'Heavy multi-axle freight traffic mixing with 2-wheelers',
      'Unregulated median crossing junction'
    ],
    recommended_action: 'Deploy automated speed enforcement radar and resurface drainage channels with high-friction overlay.',
    priority: 'Critical',
    monthly_trend: [
      { month: 'Jan', accidents: 32 },
      { month: 'Feb', accidents: 28 },
      { month: 'Mar', accidents: 34 },
      { month: 'Apr', accidents: 39 },
      { month: 'May', accidents: 45 },
      { month: 'Jun', accidents: 52 },
      { month: 'Jul', accidents: 58 },
      { month: 'Aug', accidents: 48 }
    ]
  },
  {
    id: 'HS-002',
    name: 'Outer Ring Road Junction 14',
    road_name: 'Outer Ring Road Expressway',
    latitude: 28.5355,
    longitude: 77.3910,
    risk_score: 84,
    risk_level: 'HIGH',
    total_accidents: 312,
    fatal_accidents: 18,
    serious_accidents: 84,
    minor_accidents: 210,
    peak_time: '08:30–10:30',
    dominant_weather: 'Fog',
    dominant_surface: 'Dry',
    speed_limit: 80,
    junction_density: 'Complex Multi-Way Merge',
    contributing_factors: [
      'Dense morning merge conflicts and short weave distance',
      'Low morning visibility during winter fog events',
      'High motorcycle & two-wheeler density during rush hour',
      'Abrupt deceleration before exit ramps'
    ],
    recommended_action: 'Install illuminated high-mast signage, extend acceleration lanes, and install dynamic fog warnings.',
    priority: 'High',
    monthly_trend: [
      { month: 'Jan', accidents: 41 },
      { month: 'Feb', accidents: 35 },
      { month: 'Mar', accidents: 26 },
      { month: 'Apr', accidents: 22 },
      { month: 'May', accidents: 20 },
      { month: 'Jun', accidents: 24 },
      { month: 'Jul', accidents: 30 },
      { month: 'Aug', accidents: 28 }
    ]
  },
  {
    id: 'HS-003',
    name: 'Grand Trunk Road Corridor B',
    road_name: 'GT Road Arterial',
    latitude: 28.7041,
    longitude: 77.1025,
    risk_score: 78,
    risk_level: 'HIGH',
    total_accidents: 285,
    fatal_accidents: 14,
    serious_accidents: 72,
    minor_accidents: 199,
    peak_time: '19:00–22:00',
    dominant_weather: 'Clear',
    dominant_surface: 'Poor surface',
    speed_limit: 60,
    junction_density: 'Commercial Strip Density',
    contributing_factors: [
      'Surface potholes and uneven asphalt paving',
      'Encroachment of pedestrian walkways forcing foot traffic into lanes',
      'Inadequate street lighting in commercial segments',
      'Uncontrolled right turns across oncoming traffic'
    ],
    recommended_action: 'Pavement reconstruction, grade-separated pedestrian skywalks, and smart LED street lighting.',
    priority: 'High',
    monthly_trend: [
      { month: 'Jan', accidents: 24 },
      { month: 'Feb', accidents: 22 },
      { month: 'Mar', accidents: 25 },
      { month: 'Apr', accidents: 28 },
      { month: 'May', accidents: 31 },
      { month: 'Jun', accidents: 29 },
      { month: 'Jul', accidents: 36 },
      { month: 'Aug', accidents: 32 }
    ]
  },
  {
    id: 'HS-004',
    name: 'Yamuna Expressway Spur South',
    road_name: 'Expressway Connector',
    latitude: 28.4595,
    longitude: 77.0266,
    risk_score: 72,
    risk_level: 'HIGH',
    total_accidents: 198,
    fatal_accidents: 11,
    serious_accidents: 49,
    minor_accidents: 138,
    peak_time: '22:00–02:00',
    dominant_weather: 'Clear',
    dominant_surface: 'Dry',
    speed_limit: 120,
    junction_density: 'High-Speed Toll Interchange',
    contributing_factors: [
      'Extreme speed differentials on exit and entrance ramps',
      'Driver highway hypnosis & late night fatigue',
      'Tailgating at high speeds (>110 km/h)'
    ],
    recommended_action: 'Install rumble strips before curves and dynamic variable message speed alerts.',
    priority: 'Medium',
    monthly_trend: [
      { month: 'Jan', accidents: 18 },
      { month: 'Feb', accidents: 15 },
      { month: 'Mar', accidents: 16 },
      { month: 'Apr', accidents: 19 },
      { month: 'May', accidents: 22 },
      { month: 'Jun', accidents: 25 },
      { month: 'Jul', accidents: 27 },
      { month: 'Aug', accidents: 24 }
    ]
  },
  {
    id: 'HS-005',
    name: 'Central Metro Boulevard Roundabout',
    road_name: 'MG Road Urban Corridor',
    latitude: 28.6289,
    longitude: 77.2065,
    risk_score: 48,
    risk_level: 'MEDIUM',
    total_accidents: 142,
    fatal_accidents: 3,
    serious_accidents: 28,
    minor_accidents: 111,
    peak_time: '17:00–19:00',
    dominant_weather: 'Clear',
    dominant_surface: 'Dry',
    speed_limit: 50,
    junction_density: 'Multi-lane Roundabout',
    contributing_factors: [
      'Heavy bumper-to-bumper queue collisions',
      'Side-swipe lane changing conflicts inside roundabout',
      'Bus stopping in live traffic lanes'
    ],
    recommended_action: 'Optimize lane markings, install turbo-roundabout channelization, and designate off-street bus bays.',
    priority: 'Medium',
    monthly_trend: [
      { month: 'Jan', accidents: 14 },
      { month: 'Feb', accidents: 12 },
      { month: 'Mar', accidents: 15 },
      { month: 'Apr', accidents: 16 },
      { month: 'May', accidents: 18 },
      { month: 'Jun', accidents: 17 },
      { month: 'Jul', accidents: 19 },
      { month: 'Aug', accidents: 16 }
    ]
  },
  {
    id: 'HS-006',
    name: 'East River Bridge Crossing',
    road_name: 'Shanti Path Causeway',
    latitude: 28.6012,
    longitude: 77.2405,
    risk_score: 35,
    risk_level: 'LOW',
    total_accidents: 76,
    fatal_accidents: 1,
    serious_accidents: 9,
    minor_accidents: 66,
    peak_time: '14:00–16:00',
    dominant_weather: 'Clear',
    dominant_surface: 'Dry',
    speed_limit: 40,
    junction_density: 'Bridge Approach',
    contributing_factors: [
      'Occasional hydroplaning during heavy monsoon downpours',
      'Tailgating in narrow 2-lane bridge deck'
    ],
    recommended_action: 'Maintain bridge drainage scuppers and apply anti-skid polyurethane coating.',
    priority: 'Low',
    monthly_trend: [
      { month: 'Jan', accidents: 8 },
      { month: 'Feb', accidents: 6 },
      { month: 'Mar', accidents: 7 },
      { month: 'Apr', accidents: 8 },
      { month: 'May', accidents: 9 },
      { month: 'Jun', accidents: 12 },
      { month: 'Jul', accidents: 14 },
      { month: 'Aug', accidents: 10 }
    ]
  },
  {
    id: 'HS-007',
    name: 'West Urban Junction 8',
    road_name: 'Patel Road Intersection',
    latitude: 28.6400,
    longitude: 77.1200,
    risk_score: 64,
    risk_level: 'MEDIUM',
    total_accidents: 164,
    fatal_accidents: 5,
    serious_accidents: 39,
    minor_accidents: 120,
    peak_time: '18:00–20:00',
    dominant_weather: 'Clear',
    dominant_surface: 'Dry',
    speed_limit: 60,
    junction_density: 'Signalized Crossroads',
    contributing_factors: [
      'Red-light running during late evening amber phase',
      'Poor pedestrian crossing visibility',
      'Commercial auto-rickshaw sudden stops'
    ],
    recommended_action: 'Install red-light violation cameras and high-visibility zebra crossing countdown timers.',
    priority: 'Medium',
    monthly_trend: [
      { month: 'Jan', accidents: 16 },
      { month: 'Feb', accidents: 14 },
      { month: 'Mar', accidents: 18 },
      { month: 'Apr', accidents: 19 },
      { month: 'May', accidents: 21 },
      { month: 'Jun', accidents: 22 },
      { month: 'Jul', accidents: 25 },
      { month: 'Aug', accidents: 20 }
    ]
  },
  {
    id: 'HS-008',
    name: 'Airport Expressway Tollway Gate 3',
    road_name: 'Airport Access Highway',
    latitude: 28.5562,
    longitude: 77.0999,
    risk_score: 59,
    risk_level: 'MEDIUM',
    total_accidents: 128,
    fatal_accidents: 4,
    serious_accidents: 31,
    minor_accidents: 93,
    peak_time: '05:00–07:00',
    dominant_weather: 'Fog',
    dominant_surface: 'Dry',
    speed_limit: 90,
    junction_density: 'Toll Plaza Approach',
    contributing_factors: [
      'Sudden braking before toll barriers in dense morning fog',
      'Commercial taxi speeding to airport departures'
    ],
    recommended_action: 'Deploy high-intensity LED sequential fog guidance lights and automatic speed reduction buffers.',
    priority: 'Medium',
    monthly_trend: [
      { month: 'Jan', accidents: 22 },
      { month: 'Feb', accidents: 18 },
      { month: 'Mar', accidents: 12 },
      { month: 'Apr', accidents: 10 },
      { month: 'May', accidents: 11 },
      { month: 'Jun', accidents: 13 },
      { month: 'Jul', accidents: 15 },
      { month: 'Aug', accidents: 14 }
    ]
  }
];

export const MOCK_FEATURE_IMPORTANCE: FeatureImportanceItem[] = [
  { rank: 1, feature: 'Speed Limit', importance: 24.5, category: 'Roadway', impact: 'High', description: 'High kinetic energy directly amplifies probability of fatal outcome exponentially (E = 0.5 * m * v²)' },
  { rank: 2, feature: 'Road Surface Condition', importance: 19.2, category: 'Environment', impact: 'High', description: 'Wet, icy, or damaged asphalt surfaces increase braking stopping distance by 2.5x to 4x' },
  { rank: 3, feature: 'Weather Condition', importance: 15.3, category: 'Environment', impact: 'High', description: 'Precipitation and dense fog reduce sightlines, contrast sensitivity, and hazard identification' },
  { rank: 4, feature: 'Light & Illumination', importance: 13.1, category: 'Environment', impact: 'High', description: 'Unlit rural roadways have 3.2x higher fatality rates compared to daylight driving' },
  { rank: 5, feature: 'Number of Vehicles Involved', importance: 10.8, category: 'Accident', impact: 'Medium', description: 'Multi-vehicle pileups compound lateral and rear impact forces and entrapment risk' },
  { rank: 6, feature: 'Junction / Intersection Type', importance: 8.7, category: 'Roadway', impact: 'Medium', description: 'T-junctions and unregulated roundabouts produce dangerous right-angle T-bone impacts' },
  { rank: 7, feature: 'Road Type / Carriageway', importance: 4.2, category: 'Roadway', impact: 'Low', description: 'Undivided single carriageways carry high head-on collision risks vs divided dual carriageways' },
  { rank: 8, feature: 'Urban vs Rural Setting', importance: 2.1, category: 'Spatial', impact: 'Low', description: 'Rural accidents suffer prolonged emergency response and EMS hospital transit times' },
  { rank: 9, feature: 'Driver Age & Profile', importance: 1.3, category: 'Human', impact: 'Low', description: 'Drivers under 25 and over 65 exhibit distinct risk distributions' },
  { rank: 10, feature: 'Casualties & Multi-Party', importance: 0.8, category: 'Other', impact: 'Low', description: 'Multiple passengers increase vehicle mass and distraction dynamics' }
];

export const MOCK_MODEL_PERFORMANCE: ModelPerformanceData = {
  production_model: 'Random Forest Classifier (R Engine)',
  training_timestamp: '2026-08-28T06:00:00Z',
  total_training_samples: 19665,
  total_test_samples: 4917,
  models: [
    {
      model: 'Random Forest (R Package)',
      accuracy: 0.874,
      precision: 0.862,
      recall: 0.851,
      f1_score: 0.856,
      roc_auc: 0.932,
      training_time_sec: 14.8,
      is_production: true,
      strengths: 'Robust ensemble captures high-dimensional interactions between weather, speed limits, and road conditions without overfitting.'
    },
    {
      model: 'XGBoost Classifier',
      accuracy: 0.881,
      precision: 0.869,
      recall: 0.858,
      f1_score: 0.863,
      roc_auc: 0.941,
      training_time_sec: 22.4,
      is_production: false,
      strengths: 'Highest ROC-AUC discrimination power; candidate for automated retraining pipeline.'
    },
    {
      model: 'Decision Tree (CART rpart)',
      accuracy: 0.812,
      precision: 0.795,
      recall: 0.781,
      f1_score: 0.788,
      roc_auc: 0.845,
      training_time_sec: 2.1,
      is_production: false,
      strengths: 'Highly transparent rule hierarchy suitable for regulatory road safety audits.'
    },
    {
      model: 'Multinomial Logistic Regression',
      accuracy: 0.784,
      precision: 0.761,
      recall: 0.748,
      f1_score: 0.754,
      roc_auc: 0.812,
      training_time_sec: 1.4,
      is_production: false,
      strengths: 'Fast parametric baseline with explicit odds ratios and low computational footprint.'
    }
  ],
  confusion_matrix: {
    labels: ['Minor', 'Serious', 'Fatal'],
    matrix: [
      { actual: 'Minor', Minor: 2980, Serious: 154, Fatal: 22, recall: 0.944 },
      { actual: 'Serious', Minor: 182, Serious: 1240, Fatal: 86, recall: 0.822 },
      { actual: 'Fatal', Minor: 14, Serious: 62, Fatal: 177, recall: 0.700 }
    ]
  }
};

export const MOCK_CRITICAL_LOCATIONS: CriticalLocationItem[] = [
  { location: 'NH-44 Highway Mile 142', risk_score: 89, accidents: 438, fatalities: 29, primary_risk: 'Wet Road + Speed (100km/h)', recommended_action: 'Install automated speed radar and anti-skid asphalt overlay', priority: 'Critical', status: 'Pending Approval' },
  { location: 'Outer Ring Road Junction 14', risk_score: 84, accidents: 312, fatalities: 18, primary_risk: 'Dense Morning Merge + Fog', recommended_action: 'Construct grade-separated interchange ramp & fog arrays', priority: 'High', status: 'In Review' },
  { location: 'Grand Trunk Road Corridor B', risk_score: 78, accidents: 285, fatalities: 14, primary_risk: 'Damaged Surface + Poor Light', recommended_action: 'Pavement reconstruction & LED streetlights installation', priority: 'High', status: 'Work Scheduled' },
  { location: 'Yamuna Expressway Spur South', risk_score: 72, accidents: 198, fatalities: 11, primary_risk: 'Night Fatigue & Speed (120km/h)', recommended_action: 'Deploy transverse rumble strips & dynamic VMS boards', priority: 'Medium', status: 'Completed' },
  { location: 'West Urban Junction 8', risk_score: 64, accidents: 164, fatalities: 5, primary_risk: 'Intersection Red-Light Running', recommended_action: 'Install AI red-light enforcement cameras & countdown timers', priority: 'Medium', status: 'Active Monitoring' },
  { location: 'Airport Expressway Tollway Gate 3', risk_score: 59, accidents: 128, fatalities: 4, primary_risk: 'Sudden Toll Deceleration + Fog', recommended_action: 'Deploy high-intensity LED sequential fog guidance lights', priority: 'Medium', status: 'In Review' },
  { location: 'Central Metro Boulevard', risk_score: 48, accidents: 142, fatalities: 3, primary_risk: 'Rush Hour Tailgating in Roundabout', recommended_action: 'Optimize adaptive traffic signal timings & lane markings', priority: 'Medium', status: 'Active Monitoring' },
  { location: 'East River Bridge Crossing', risk_score: 35, accidents: 76, fatalities: 1, primary_risk: 'Monsoon Deck Hydroplaning', recommended_action: 'Maintain drainage scuppers and apply anti-skid coating', priority: 'Low', status: 'Completed' }
];

export const MOCK_POLICY_RECOMMENDATIONS: PolicyRecommendationItem[] = [
  { category: 'Infrastructure', title: 'Corridor Drainage & Hydroplaning Overhaul', count_locations: 14, estimated_impact: '-28% Wet Weather Collisions' },
  { category: 'Enforcement', title: 'Automated AI Speed Enforcement Network', count_locations: 22, estimated_impact: '-35% High-Speed Fatalities' },
  { category: 'Lighting', title: 'High-Mast Highway Illumination Upgrade', count_locations: 19, estimated_impact: '-42% Night-Time Crashes' },
  { category: 'Signage', title: 'Active Fog Hazard & Variable Speed Signs', count_locations: 8, estimated_impact: '-19% Fog Pileups' }
];

// Generate 400 sample detailed records for client-side table rendering and realistic local analytics
export function generateSampleRecords(): AccidentRecord[] {
  const records: AccidentRecord[] = [];
  const severities: ('Minor' | 'Serious' | 'Fatal')[] = ['Minor', 'Serious', 'Fatal'];
  const weathers = ['Clear', 'Rain', 'Fog', 'Storm', 'Other'] as const;
  const surfaces = ['Dry', 'Wet', 'Icy', 'Poor surface', 'Unknown'] as const;
  const lights = [
    'Daylight', 
    'Darkness: street lights present and lit', 
    'Darkness: no street lights', 
    'Darkness: street lights unlit'
  ] as const;
  const roads = ['Single carriageway', 'Dual carriageway', 'Highway', 'Roundabout', 'One way street', 'T-Junction'] as const;
  const junctions = ['Not at junction', 'T-Junction', 'Crossroads', 'Roundabout', 'Slip road / Merge ramp', 'Multiple junction'] as const;
  const vehicles = ['Car', 'Motorcycle', 'Truck / Heavy Goods', 'Bus', 'Van / Light Goods', 'Bicycle'] as const;

  for (let i = 1; i <= 350; i++) {
    const hotspot = MOCK_HOTSPOTS[(i - 1) % MOCK_HOTSPOTS.length];
    const hour = (7 + i * 3) % 24;
    const min = (i * 13) % 60;
    const month = (i % 12) + 1;
    const day = (i % 28) + 1;
    const dateStr = `2026-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const timeStr = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    
    // Severity weighted by hotspot risk
    let sev: 'Minor' | 'Serious' | 'Fatal' = 'Minor';
    const roll = Math.random();
    if (hotspot.risk_score >= 80) {
      sev = roll < 0.20 ? 'Fatal' : roll < 0.60 ? 'Serious' : 'Minor';
    } else if (hotspot.risk_score >= 60) {
      sev = roll < 0.08 ? 'Fatal' : roll < 0.40 ? 'Serious' : 'Minor';
    } else {
      sev = roll < 0.03 ? 'Fatal' : roll < 0.20 ? 'Serious' : 'Minor';
    }

    records.push({
      accident_id: `ACC-2026-${(1000 + i).toString()}`,
      date: dateStr,
      time: timeStr,
      latitude: hotspot.latitude + (Math.random() - 0.5) * 0.02,
      longitude: hotspot.longitude + (Math.random() - 0.5) * 0.02,
      location_name: hotspot.name,
      region: hotspot.name.includes('Ring') || hotspot.name.includes('Boulevard') ? 'Capital Metropolitan' : 'Northern Highway Corridor',
      weather: weathers[i % weathers.length],
      road_surface: surfaces[i % surfaces.length],
      light_condition: hour >= 6 && hour <= 18 ? 'Daylight' : lights[i % lights.length],
      road_type: roads[i % roads.length],
      junction_type: junctions[i % junctions.length],
      speed_limit: hotspot.speed_limit,
      vehicle_type: vehicles[i % vehicles.length],
      number_of_vehicles: (i % 3) + 1,
      number_of_casualties: (i % 2) + 1,
      urban_rural: hotspot.road_name.includes('Highway') || hotspot.road_name.includes('Expressway') ? 'Rural' : 'Urban',
      driver_age: 22 + ((i * 7) % 48),
      driver_gender: i % 3 === 0 ? 'Female' : 'Male',
      risk_score: hotspot.risk_score + ((i % 11) - 5),
      severity: sev
    });
  }

  return records;
}
