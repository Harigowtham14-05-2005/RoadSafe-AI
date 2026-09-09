import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from 'recharts';
import { ChartCard } from '../components/common/ChartCard';
import { AlertOctagon, Gauge, Zap, TrendingUp, ShieldAlert, Sliders } from 'lucide-react';

export const RiskAnalysis: React.FC = () => {
  // Speed vs Severity Risk Probability Data
  const speedRiskData = [
    { speed: '40 km/h', minorProb: 88, seriousProb: 10, fatalProb: 2, avgRisk: 22 },
    { speed: '60 km/h', minorProb: 74, seriousProb: 21, fatalProb: 5, avgRisk: 42 },
    { speed: '80 km/h', minorProb: 52, seriousProb: 38, fatalProb: 10, avgRisk: 64 },
    { speed: '100 km/h', minorProb: 31, seriousProb: 51, fatalProb: 18, avgRisk: 82 },
    { speed: '120 km/h', minorProb: 14, seriousProb: 54, fatalProb: 32, avgRisk: 94 }
  ];

  // Lighting & Visibility Risk Curves
  const lightingRiskData = [
    { condition: 'Daylight', fatalIndex: 1.0, severeCount: 3410, riskScore: 38 },
    { condition: 'Night Lit', fatalIndex: 1.8, severeCount: 1890, riskScore: 56 },
    { condition: 'Night Unlit', fatalIndex: 3.4, severeCount: 2940, riskScore: 88 },
    { condition: 'Dawn / Dusk', fatalIndex: 1.6, severeCount: 1120, riskScore: 52 }
  ];

  // Interactive Live Risk Calculator State
  const [calcSpeed, setCalcSpeed] = useState<number>(80);
  const [calcWeather, setCalcWeather] = useState<'Clear' | 'Rain' | 'Fog' | 'Storm'>('Rain');
  const [calcSurface, setCalcSurface] = useState<'Dry' | 'Wet' | 'Icy' | 'Poor'>('Wet');
  const [calcLight, setCalcLight] = useState<'Daylight' | 'Night Lit' | 'Night Unlit'>('Night Unlit');

  // Compute calculated risk score
  const computeScore = () => {
    let score = 20;
    if (calcSpeed >= 120) score += 34;
    else if (calcSpeed >= 100) score += 26;
    else if (calcSpeed >= 80) score += 18;
    else if (calcSpeed >= 60) score += 8;

    if (calcSurface === 'Icy') score += 28;
    else if (calcSurface === 'Wet') score += 18;
    else if (calcSurface === 'Poor') score += 20;

    if (calcWeather === 'Storm') score += 22;
    else if (calcWeather === 'Fog') score += 18;
    else if (calcWeather === 'Rain') score += 12;

    if (calcLight === 'Night Unlit') score += 22;
    else if (calcLight === 'Night Lit') score += 10;

    return Math.min(Math.max(score, 8), 98);
  };

  const calculatedRisk = computeScore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
            <AlertOctagon size={20} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Road Risk Analysis & Multi-Variable Curves
          </h1>
        </div>
        <p className="text-xs text-slate-500">
          Empirical severity probability curves as a function of speed limits, environmental lighting, and road friction.
        </p>
      </div>

      {/* Row 1: Speed Limit Severity Curves (Highlight from Prompt) */}
      <ChartCard
        title="Risk & Severity Probability by Speed Limit"
        subtitle="Multi-class outcome probability progression across speed limits (40 km/h to 120 km/h)"
        infoTooltip="Notice how fatal outcome probability scales non-linearly past 80 km/h due to kinetic energy scaling."
      >
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={speedRiskData} margin={{ top: 15, right: 15, left: -15, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="speed" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} unit="%" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0F172A', borderRadius: '0.75rem', color: '#FFF', fontSize: '11px' }}
                formatter={(val, name) => [`${val}%`, name]}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="minorProb" name="Minor Probability %" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="seriousProb" name="Serious Probability %" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="fatalProb" name="Fatal Probability %" stroke="#EF4444" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-3 border-t border-slate-100 text-xs">
          {speedRiskData.map((s) => (
            <div key={s.speed} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center">
              <span className="font-bold text-slate-900 block">{s.speed}</span>
              <span className="text-[10px] text-slate-500 font-medium block mt-0.5">Fatal: {s.fatalProb}%</span>
              <span className="text-[11px] font-bold text-blue-600 block mt-0.5">Risk: {s.avgRisk}/100</span>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Row 2: Lighting Multiplier & Interactive Risk Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Illumination Risk Curve */}
        <ChartCard
          title="Lighting & Illumination Relative Fatality Risk"
          subtitle="Relative risk index normalized against daylight driving baseline (1.0x)"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={lightingRiskData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="condition" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '0.75rem', color: '#FFF', fontSize: '11px' }} />
                <Bar dataKey="fatalIndex" name="Relative Fatality Risk Multiplier" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <strong>Key takeaway:</strong> Night driving on unlit roadways has a <strong>3.4x higher fatality multiplier</strong> compared to daylight conditions.
          </div>
        </ChartCard>

        {/* Interactive Risk Simulator Widget */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-card flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-xs">
              <Sliders size={16} className="text-blue-600" />
              <span>Interactive Risk Simulator & Sensitivity Matrix</span>
            </div>

            <div className="space-y-3.5 text-xs mt-3">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Speed Limit</span>
                  <span className="font-bold text-blue-600">{calcSpeed} km/h</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="120"
                  step="10"
                  value={calcSpeed}
                  onChange={(e) => setCalcSpeed(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Weather</label>
                  <select
                    value={calcWeather}
                    onChange={(e) => setCalcWeather(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                  >
                    <option value="Clear">Clear</option>
                    <option value="Rain">Rain</option>
                    <option value="Fog">Fog</option>
                    <option value="Storm">Storm</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Road Surface</label>
                  <select
                    value={calcSurface}
                    onChange={(e) => setCalcSurface(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                  >
                    <option value="Dry">Dry</option>
                    <option value="Wet">Wet</option>
                    <option value="Poor">Poor Surface</option>
                    <option value="Icy">Icy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Illumination</label>
                <select
                  value={calcLight}
                  onChange={(e) => setCalcLight(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                >
                  <option value="Daylight">Daylight</option>
                  <option value="Night Lit">Night (Street Lights Lit)</option>
                  <option value="Night Unlit">Night (Unlit Darkness)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Result Output Bar */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400">Simulated Composite Risk</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-2xl font-black text-white">{calculatedRisk}</span>
                <span className="text-xs text-slate-400">/ 100</span>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              calculatedRisk >= 85 ? 'bg-red-500 text-white' :
              calculatedRisk >= 70 ? 'bg-amber-500 text-white' :
              calculatedRisk >= 45 ? 'bg-yellow-400 text-slate-950' : 'bg-emerald-500 text-white'
            }`}>
              {calculatedRisk >= 85 ? 'CRITICAL RISK' :
               calculatedRisk >= 70 ? 'HIGH RISK' :
               calculatedRisk >= 45 ? 'MEDIUM RISK' : 'LOW RISK'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
