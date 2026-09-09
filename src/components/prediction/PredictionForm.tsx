import React, { useState } from 'react';
import { PredictionRequest, PresetScenario } from '../../types/prediction';
import { PRESET_SCENARIOS } from '../../services/predictionService';
import { 
  Car, 
  Compass, 
  CloudRain, 
  MapPin, 
  Sparkles, 
  RotateCcw, 
  Sliders, 
  Send,
  Zap
} from 'lucide-react';

interface PredictionFormProps {
  initialValues?: Partial<PredictionRequest>;
  onSubmit: (data: PredictionRequest) => void;
  isLoading: boolean;
}

export const PredictionForm: React.FC<PredictionFormProps> = ({
  initialValues,
  onSubmit,
  isLoading
}) => {
  const [formData, setFormData] = useState<PredictionRequest>({
    number_of_vehicles: initialValues?.number_of_vehicles ?? 2,
    number_of_casualties: initialValues?.number_of_casualties ?? 1,
    vehicle_type: initialValues?.vehicle_type ?? 'Car',
    driver_age: initialValues?.driver_age ?? 32,
    driver_gender: initialValues?.driver_gender ?? 'Male',
    road_type: initialValues?.road_type ?? 'Highway',
    junction_type: initialValues?.junction_type ?? 'Not at junction',
    speed_limit: initialValues?.speed_limit ?? 80,
    road_surface: initialValues?.road_surface ?? 'Dry',
    urban_rural: initialValues?.urban_rural ?? 'Urban',
    weather: initialValues?.weather ?? 'Clear',
    light_condition: initialValues?.light_condition ?? 'Daylight',
    visibility_km: initialValues?.visibility_km ?? 10.0,
    time_of_day: initialValues?.time_of_day ?? '18:30',
    latitude: initialValues?.latitude ?? 28.6139,
    longitude: initialValues?.longitude ?? 77.2090,
    region: initialValues?.region ?? 'Northern Expressway Corridor'
  });

  const [activePreset, setActivePreset] = useState<string | null>(null);

  const loadPreset = (scenario: PresetScenario) => {
    setActivePreset(scenario.id);
    setFormData({ ...scenario.data });
  };

  const handleChange = (field: keyof PredictionRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setActivePreset(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Preset Scenarios Carousel / Badges */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 p-4 rounded-xl border border-blue-200/80">
        <div className="flex items-center gap-2 mb-2.5">
          <Sparkles size={16} className="text-blue-600" />
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Quick Simulation Presets
          </span>
          <span className="text-[10px] text-slate-500 font-medium">Click to populate real crash scenario</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {PRESET_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => loadPreset(sc)}
              className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                activePreset === sc.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                  sc.tag === 'High Risk' ? (activePreset === sc.id ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700') :
                  (activePreset === sc.id ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-700')
                }`}>
                  {sc.tag}
                </span>
              </div>
              <p className="font-bold truncate text-[11px]">{sc.name}</p>
              <p className={`text-[10px] truncate mt-0.5 ${activePreset === sc.id ? 'text-blue-100' : 'text-slate-500'}`}>
                {sc.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Section 1: Accident & Vehicle Information */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-xs">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <Car size={16} />
            </div>
            <span>1. Accident & Vehicle Details</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Vehicle Type</label>
              <select
                value={formData.vehicle_type}
                onChange={(e) => handleChange('vehicle_type', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Car">Car / Passenger Sedan / SUV</option>
                <option value="Motorcycle">Motorcycle / Two-Wheeler</option>
                <option value="Truck / Heavy Goods">Heavy Freight Truck / Trailer</option>
                <option value="Bus">Public Transit Bus</option>
                <option value="Van / Light Goods">Van / Delivery Vehicle</option>
                <option value="Bicycle">Bicycle / Non-Motorized</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Vehicles Involved</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.number_of_vehicles}
                  onChange={(e) => handleChange('number_of_vehicles', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Casualties</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={formData.number_of_casualties}
                  onChange={(e) => handleChange('number_of_casualties', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Driver Age</label>
                <input
                  type="number"
                  min="16"
                  max="95"
                  value={formData.driver_age}
                  onChange={(e) => handleChange('driver_age', parseInt(e.target.value) || 30)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Driver Gender</label>
                <select
                  value={formData.driver_gender}
                  onChange={(e) => handleChange('driver_gender', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Road & Infrastructure */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-xs">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <Compass size={16} />
            </div>
            <span>2. Roadway & Infrastructure</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Road Classification</label>
              <select
                value={formData.road_type}
                onChange={(e) => handleChange('road_type', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Highway">Expressway / National Highway</option>
                <option value="Dual carriageway">Dual Carriageway Arterial</option>
                <option value="Single carriageway">Single Undivided Carriageway</option>
                <option value="Roundabout">Roundabout Circulation</option>
                <option value="One way street">One Way Urban Collector</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Junction Configuration</label>
              <select
                value={formData.junction_type}
                onChange={(e) => handleChange('junction_type', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Not at junction">Mid-block (Not at junction)</option>
                <option value="T-Junction">T-Junction / Side Road</option>
                <option value="Crossroads">4-Way Crossroads</option>
                <option value="Roundabout">Roundabout</option>
                <option value="Slip road / Merge ramp">Slip Road / Merge Acceleration Ramp</option>
                <option value="Multiple junction">Complex Multi-leg Junction</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">Speed Limit</label>
                <span className="font-bold text-blue-600">{formData.speed_limit} km/h</span>
              </div>
              <input
                type="range"
                min="30"
                max="120"
                step="10"
                value={formData.speed_limit}
                onChange={(e) => handleChange('speed_limit', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>30 km/h</span>
                <span>60 km/h</span>
                <span>80 km/h</span>
                <span>100 km/h</span>
                <span>120 km/h</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Surface Condition</label>
                <select
                  value={formData.road_surface}
                  onChange={(e) => handleChange('road_surface', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Dry">Dry Pavement</option>
                  <option value="Wet">Wet / Standing Water</option>
                  <option value="Poor surface">Damaged / Potholes</option>
                  <option value="Icy">Icy / Frost</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Area Type</label>
                <select
                  value={formData.urban_rural}
                  onChange={(e) => handleChange('urban_rural', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Urban">Urban</option>
                  <option value="Rural">Rural Corridor</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Environmental & Location */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card space-y-4 md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-xs">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
              <CloudRain size={16} />
            </div>
            <span>3. Environmental & Lighting</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Weather</label>
                <select
                  value={formData.weather}
                  onChange={(e) => handleChange('weather', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Clear">Clear Sky</option>
                  <option value="Rain">Rain / Monsoon</option>
                  <option value="Fog">Dense Fog</option>
                  <option value="Storm">Storm / High Wind</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Time of Crash</label>
                <input
                  type="time"
                  value={formData.time_of_day}
                  onChange={(e) => handleChange('time_of_day', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Illumination Condition</label>
              <select
                value={formData.light_condition}
                onChange={(e) => handleChange('light_condition', e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="Daylight">Daylight (Full Sun / Overcast)</option>
                <option value="Darkness: street lights present and lit">Darkness: Street lights present & lit</option>
                <option value="Darkness: no street lights">Darkness: No street lights (Pitch black)</option>
                <option value="Darkness: street lights unlit">Darkness: Street lights defective / unlit</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-semibold text-slate-700">Estimated Sightline Visibility</label>
                <span className="font-bold text-slate-700">{formData.visibility_km} km</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10.0"
                step="0.5"
                value={formData.visibility_km}
                onChange={(e) => handleChange('visibility_km', parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Corridor Location / Sector</label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => handleChange('region', e.target.value)}
                  placeholder="e.g. NH-44 Sector 12"
                  className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Zap size={15} className="text-amber-500" />
          <span>Real-time Random Forest / XGBoost ML Model Inference in R</span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Running R Machine Learning Model...</span>
            </>
          ) : (
            <>
              <Send size={16} />
              <span>Predict Accident Severity</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};
