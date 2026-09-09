import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PredictionForm } from '../components/prediction/PredictionForm';
import { PredictionResultCard } from '../components/prediction/PredictionResultCard';
import { ExplainableAISection } from '../components/prediction/ExplainableAISection';
import { ActionableRecommendations } from '../components/prediction/ActionableRecommendations';
import { predictSeverity } from '../services/predictionService';
import { PredictionRequest, PredictionResponse } from '../types/prediction';
import { BrainCircuit, Sparkles, AlertOctagon, CheckCircle2 } from 'lucide-react';
import { useApiConfig } from '../context/ApiConfigContext';

export const SeverityPrediction: React.FC = () => {
  const location = useLocation();
  const { isRServerOnline, activeProductionModel } = useApiConfig();
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResponse | null>(null);

  // Check if state was passed from Hotspots page
  const initialData = location.state?.hotspot ? {
    speed_limit: location.state.hotspot.speed_limit,
    road_surface: location.state.hotspot.dominant_surface,
    weather: location.state.hotspot.dominant_weather,
    latitude: location.state.hotspot.latitude,
    longitude: location.state.hotspot.longitude,
    region: location.state.hotspot.name
  } : undefined;

  // Run initial default prediction so the user immediately sees a rich result on first landing
  useEffect(() => {
    handlePredict({
      number_of_vehicles: 3,
      number_of_casualties: 2,
      vehicle_type: 'Car',
      driver_age: 32,
      driver_gender: 'Male',
      road_type: 'Highway',
      junction_type: 'Slip road / Merge ramp',
      speed_limit: 100,
      road_surface: 'Wet',
      urban_rural: 'Rural',
      weather: 'Rain',
      light_condition: 'Darkness: no street lights',
      visibility_km: 1.2,
      time_of_day: '22:30',
      latitude: 28.6139,
      longitude: 77.2090,
      region: 'Northern Expressway Corridor'
    });
  }, []);

  const handlePredict = async (data: PredictionRequest) => {
    setLoading(true);
    try {
      const result = await predictSeverity(data);
      setPredictionResult(result);
    } catch (error) {
      console.error('Prediction failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <BrainCircuit size={20} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Accident Severity Prediction & AI Risk Assessment
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            Enter accident and environmental conditions to estimate crash severity, risk score, and XAI feature impact.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{activeProductionModel}</span>
          </span>
        </div>
      </div>

      {/* Main Prediction Form */}
      <PredictionForm
        initialValues={initialData}
        onSubmit={handlePredict}
        isLoading={loading}
      />

      {/* Results Section */}
      {predictionResult && (
        <div className="space-y-6 pt-2">
          {/* Severity Result & Probability Gauge */}
          <PredictionResultCard result={predictionResult} />

          {/* Explainable AI (XAI) Attribution */}
          <ExplainableAISection
            factors={predictionResult.contributing_factors}
            explanationSummary={predictionResult.explanation_summary}
          />

          {/* Targeted Actionable Recommendations */}
          <ActionableRecommendations
            recommendations={predictionResult.recommendations}
          />
        </div>
      )}
    </div>
  );
};
