import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { ChartCard } from '../components/common/ChartCard';
import { CrossFilterBar } from '../components/analytics/CrossFilterBar';
import { BarChart3, Users, Compass, Calendar, ShieldAlert } from 'lucide-react';

export const AccidentAnalytics: React.FC = () => {
  const dayOfWeekData = [
    { day: 'Mon', total: 3240, fatal: 142, serious: 740, minor: 2358 },
    { day: 'Tue', total: 3120, fatal: 135, serious: 690, minor: 2295 },
    { day: 'Wed', total: 3380, fatal: 148, serious: 780, minor: 2452 },
    { day: 'Thu', total: 3450, fatal: 156, serious: 790, minor: 2504 },
    { day: 'Fri', total: 4120, fatal: 224, serious: 980, minor: 2916 },
    { day: 'Sat', total: 4340, fatal: 248, serious: 1040, minor: 3052 },
    { day: 'Sun', total: 2932, fatal: 195, serious: 604, minor: 2133 }
  ];

  const vehicleTypeData = [
    { type: 'Passenger Car', count: 11240, color: '#3B82F6', fatalPct: 4.2 },
    { type: 'Motorcycle / 2W', count: 6840, color: '#EF4444', fatalPct: 9.4 },
    { type: 'Heavy Truck', count: 3450, color: '#F97316', fatalPct: 8.8 },
    { type: 'Transit Bus', count: 1680, color: '#F59E0B', fatalPct: 5.1 },
    { type: 'Delivery Van', count: 980, color: '#10B981', fatalPct: 3.8 },
    { type: 'Bicycle / Non-Mot', count: 392, color: '#8B5CF6', fatalPct: 6.2 }
  ];

  const driverAgeData = [
    { range: '<20 yrs', total: 1840, fatalRate: 7.2, risk: 78 },
    { range: '21–25 yrs', total: 5420, fatalRate: 6.8, risk: 74 },
    { range: '26–35 yrs', total: 8640, fatalRate: 4.6, risk: 58 },
    { range: '36–50 yrs', total: 5120, fatalRate: 4.2, risk: 52 },
    { range: '51–65 yrs', total: 2450, fatalRate: 5.4, risk: 62 },
    { range: '>65 yrs', total: 1112, fatalRate: 8.1, risk: 84 }
  ];

  const junctionTypeData = [
    { name: 'Mid-block (No Junction)', value: 42, color: '#3B82F6' },
    { name: 'T-Junction', value: 26, color: '#F59E0B' },
    { name: 'Crossroads', value: 18, color: '#EF4444' },
    { name: 'Roundabout', value: 8, color: '#10B981' },
    { name: 'Merge Slip Ramp', value: 6, color: '#8B5CF6' }
  ];

  const urbanRuralData = [
    { name: 'Urban Grid', count: 15420, fatal: 540, serious: 3240, fatalRate: '3.5%' },
    { name: 'Rural Corridors', count: 9162, fatal: 708, serious: 2394, fatalRate: '7.7%' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
        <div className="flex items-center gap-2 mb-1">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            <BarChart3 size={20} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Accident Analytics & Deep Diagnostics
          </h1>
        </div>
        <p className="text-xs text-slate-500">
          Multi-dimensional breakdown of crash patterns across temporal, demographic, vehicle class, and infrastructure variables.
        </p>
      </div>

      <CrossFilterBar />

      {/* Row 1: Day of Week & Vehicle Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Day of Week */}
        <ChartCard
          title="Accidents by Day of the Week"
          subtitle="Weekend surges driven by elevated night-time traffic and speed variations"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dayOfWeekData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '0.75rem', color: '#FFF', fontSize: '11px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="minor" name="Minor" fill="#10B981" stackId="a" />
                <Bar dataKey="serious" name="Serious" fill="#F59E0B" stackId="a" />
                <Bar dataKey="fatal" name="Fatal" fill="#EF4444" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
            <strong>Key Pattern:</strong> Friday and Saturday witness <strong>+31% higher fatal collisions</strong> compared to mid-week days.
          </div>
        </ChartCard>

        {/* Vehicle Classification */}
        <ChartCard
          title="Vehicle Type Distribution & Vulnerability"
          subtitle="Fatal casualty risk index per transport mode"
        >
          <div className="space-y-3 pt-1">
            {vehicleTypeData.map((v) => (
              <div key={v.type} className="p-3 rounded-xl border border-slate-100 bg-slate-50/70">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: v.color }} />
                    <span className="font-bold text-slate-800">{v.type}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-medium">{v.count.toLocaleString()} crashes</span>
                    <span className="font-extrabold px-1.5 py-0.5 rounded bg-red-100 text-red-700 text-[10px]">
                      {v.fatalPct}% Fatal Rate
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${(v.count / 11240) * 100}%`, backgroundColor: v.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Row 2: Driver Demographics & Junction Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Driver Age Distribution */}
        <ChartCard
          title="Driver Age Demographics & Risk Distribution"
          subtitle="Younger drivers (under 25) and senior drivers (over 65) exhibit highest fatality ratios"
        >
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={driverAgeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '0.75rem', color: '#FFF', fontSize: '11px' }} />
                <Bar dataKey="total" name="Total Accidents" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Junction Type Split */}
        <ChartCard
          title="Junction & Intersection Density"
          subtitle="Collision frequency across intersection configurations"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="h-56 w-56 relative shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '0.75rem', color: '#FFF', fontSize: '11px' }} />
                  <Pie
                    data={junctionTypeData}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {junctionTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Primary</span>
                <span className="text-sm font-extrabold text-slate-900">Mid-block</span>
                <span className="text-[10px] text-slate-500">42% Share</span>
              </div>
            </div>

            <div className="flex-1 w-full space-y-2 text-xs">
              {junctionTypeData.map((j) => (
                <div key={j.name} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: j.color }} />
                    <span className="font-semibold text-slate-800">{j.name}</span>
                  </div>
                  <span className="font-extrabold text-slate-900">{j.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Row 3: Urban vs Rural Spatial Comparison */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card">
        <h3 className="font-bold text-base text-slate-900 mb-4">
          Urban vs. Rural Crash Dynamic Comparison
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {urbanRuralData.map((u) => (
            <div key={u.name} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">{u.name}</h4>
                <span className={`px-2 py-0.5 rounded-full font-bold text-xs ${
                  u.name.includes('Rural') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  Fatality Rate: {u.fatalRate}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">Total Incidents</span>
                  <span className="font-extrabold text-slate-900">{u.count.toLocaleString()}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">Serious Casualties</span>
                  <span className="font-extrabold text-amber-700">{u.serious.toLocaleString()}</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                  <span className="text-slate-400 block text-[10px]">Fatalities</span>
                  <span className="font-extrabold text-red-700">{u.fatal.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {u.name.includes('Rural') 
                  ? 'Rural crashes exhibit 2.2x higher fatality rates due to higher traveling speeds, undivided carriageways, and longer emergency EMS transit distances.' 
                  : 'Urban crashes comprise 63% of overall collision volume, characterized primarily by lower-speed rear-end and merging impacts.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
