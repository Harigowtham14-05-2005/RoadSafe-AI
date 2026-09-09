import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { HotspotLocation } from '../../types/accident';
import { RiskBadge } from '../common/RiskBadge';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface HotspotMapProps {
  hotspots: HotspotLocation[];
  selectedHotspot: HotspotLocation | null;
  onSelectHotspot: (hotspot: HotspotLocation) => void;
}

// Custom Leaflet Div Icon generator based on risk level
const createCustomMarkerIcon = (riskLevel: string, isSelected: boolean) => {
  let bgColor = '#10B981'; // Green
  if (riskLevel === 'CRITICAL') bgColor = '#EF4444'; // Red
  else if (riskLevel === 'HIGH') bgColor = '#F97316'; // Orange
  else if (riskLevel === 'MEDIUM') bgColor = '#F59E0B'; // Amber

  const size = isSelected ? 36 : 28;
  const pulseClass = riskLevel === 'CRITICAL' ? 'animate-ping opacity-75' : '';

  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="position: relative; width: ${size}px; height: ${size}px; display: flex; align-items: center; justify-content: center;">
        ${riskLevel === 'CRITICAL' ? `<span style="position: absolute; width: 100%; height: 100%; border-radius: 9999px; background-color: ${bgColor}; opacity: 0.4;" class="${pulseClass}"></span>` : ''}
        <div style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
          border-radius: 9999px;
          background-color: ${bgColor};
          border: 3px solid #FFFFFF;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-weight: 800;
          font-size: ${isSelected ? '12px' : '10px'};
        ">
          !
        </div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

// Component to dynamically pan/zoom map when a hotspot is selected
const MapController: React.FC<{ selectedHotspot: HotspotLocation | null }> = ({ selectedHotspot }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedHotspot) {
      map.flyTo([selectedHotspot.latitude, selectedHotspot.longitude], 13, {
        duration: 1.2
      });
    }
  }, [selectedHotspot, map]);

  return null;
};

export const HotspotMap: React.FC<HotspotMapProps> = ({
  hotspots,
  selectedHotspot,
  onSelectHotspot
}) => {
  // Center of Delhi NCR / Northern Corridor default
  const defaultCenter: [number, number] = [28.6139, 77.2090];

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-xl overflow-hidden shadow-inner border border-slate-200">
      <MapContainer
        center={defaultCenter}
        zoom={11}
        scrollWheelZoom={true}
        className="w-full h-full min-h-[500px]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapController selectedHotspot={selectedHotspot} />

        {hotspots.map((h) => {
          const isSelected = selectedHotspot?.id === h.id;
          const circleColor = 
            h.risk_level === 'CRITICAL' ? '#EF4444' :
            h.risk_level === 'HIGH' ? '#F97316' :
            h.risk_level === 'MEDIUM' ? '#F59E0B' : '#10B981';

          return (
            <React.Fragment key={h.id}>
              {/* Risk Radius Circle */}
              <Circle
                center={[h.latitude, h.longitude]}
                radius={h.risk_level === 'CRITICAL' ? 1200 : h.risk_level === 'HIGH' ? 900 : 600}
                pathOptions={{
                  color: circleColor,
                  fillColor: circleColor,
                  fillOpacity: isSelected ? 0.25 : 0.12,
                  weight: isSelected ? 2 : 1
                }}
              />

              {/* Marker Pin */}
              <Marker
                position={[h.latitude, h.longitude]}
                icon={createCustomMarkerIcon(h.risk_level, isSelected)}
                eventHandlers={{
                  click: () => onSelectHotspot(h)
                }}
              >
                <Popup>
                  <div className="p-3 w-64 text-slate-800">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-slate-500">{h.id}</span>
                      <RiskBadge level={h.risk_level} score={h.risk_score} size="sm" showScore />
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 leading-snug mb-1">
                      {h.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mb-2">{h.road_name}</p>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px] bg-slate-50 p-2 rounded-lg border border-slate-100 mb-2.5">
                      <div>
                        <span className="text-slate-400 block font-medium">Total Crashes</span>
                        <span className="font-bold text-slate-900">{h.total_accidents}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Fatalities</span>
                        <span className="font-bold text-red-600">{h.fatal_accidents}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Peak Window</span>
                        <span className="font-bold text-slate-900">{h.peak_time}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Weather</span>
                        <span className="font-bold text-slate-900">{h.dominant_weather}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectHotspot(h)}
                      className="w-full py-1.5 px-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>View Full Intelligence</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
};
