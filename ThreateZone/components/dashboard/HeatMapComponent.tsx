'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MapPin, Layers, Settings, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useSocket } from '@/components/providers/SocketProvider';
import { toast } from 'sonner';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

const Circle = dynamic(
  () => import('react-leaflet').then((mod) => mod.Circle),
  { ssr: false }
);

interface HeatMapData {
  id: string;
  lat: number;
  lng: number;
  intensity: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  sensorType: string;
  value: number;
  unit: string;
  timestamp: string;
  location: string;
}

interface ThreatZone {
  id: string;
  center: [number, number];
  radius: number;
  riskLevel: 'green' | 'yellow' | 'orange' | 'red';
  threatCount: number;
  description: string;
}

const HeatMapComponent: React.FC = () => {
  const [heatMapData, setHeatMapData] = useState<HeatMapData[]>([]);
  const [threatZones, setThreatZones] = useState<ThreatZone[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<'temperature' | 'pressure' | 'threats' | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [mapCenter] = useState<[number, number]>([29.7604, -95.3698]); // Houston, TX
  const [mapZoom] = useState(10);
  const mapRef = useRef<any>(null);
  const { socket, isConnected } = useSocket();

  // Generate mock heat map data
  useEffect(() => {
    generateMockHeatMapData();
    generateMockThreatZones();
    setIsLoading(false);
  }, []);

  // Listen for real-time updates
  useEffect(() => {
    if (!socket) return;

    socket.on('heatmap-update', (data: HeatMapData[]) => {
      setHeatMapData(data);
    });

    socket.on('threat-zone-update', (zones: ThreatZone[]) => {
      setThreatZones(zones);
    });

    socket.on('new-sensor-location', (sensorData: HeatMapData) => {
      setHeatMapData(prev => {
        const updated = prev.filter(item => item.id !== sensorData.id);
        return [...updated, sensorData];
      });
      toast.info(`Sensor update: ${sensorData.location}`);
    });

    return () => {
      socket.off('heatmap-update');
      socket.off('threat-zone-update');
      socket.off('new-sensor-location');
    };
  }, [socket]);

  const generateMockHeatMapData = () => {
    const mockData: HeatMapData[] = [];
    const sensorTypes = ['Temperature', 'Pressure', 'Gas', 'Vibration', 'Flow'];
    const locations = [
      'Refinery Unit A', 'Pipeline Section B-12', 'Storage Tank 7',
      'Processing Unit D', 'Pump Station 3', 'Control Room A',
      'Electrical Substation', 'Water Treatment', 'Loading Dock'
    ];

    for (let i = 0; i < 50; i++) {
      const lat = 29.7604 + (Math.random() - 0.5) * 0.2;
      const lng = -95.3698 + (Math.random() - 0.5) * 0.2;
      const intensity = Math.random();
      const sensorType = sensorTypes[Math.floor(Math.random() * sensorTypes.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];

      let riskLevel: 'low' | 'medium' | 'high' | 'critical';
      if (intensity > 0.8) riskLevel = 'critical';
      else if (intensity > 0.6) riskLevel = 'high';
      else if (intensity > 0.4) riskLevel = 'medium';
      else riskLevel = 'low';

      mockData.push({
        id: `sensor-${i}`,
        lat,
        lng,
        intensity,
        riskLevel,
        sensorType,
        value: Math.round(intensity * 100),
        unit: sensorType === 'Temperature' ? '°F' : sensorType === 'Pressure' ? 'PSI' : 'units',
        timestamp: new Date().toISOString(),
        location: `${location} ${i + 1}`
      });
    }

    setHeatMapData(mockData);
  };

  const generateMockThreatZones = () => {
    const zones: ThreatZone[] = [
      {
        id: 'zone-1',
        center: [29.7704, -95.3598],
        radius: 2000,
        riskLevel: 'red',
        threatCount: 5,
        description: 'High pressure anomaly detected'
      },
      {
        id: 'zone-2',
        center: [29.7504, -95.3798],
        radius: 1500,
        riskLevel: 'orange',
        threatCount: 3,
        description: 'Temperature fluctuations'
      },
      {
        id: 'zone-3',
        center: [29.7804, -95.3498],
        radius: 1000,
        riskLevel: 'yellow',
        threatCount: 2,
        description: 'Minor sensor irregularities'
      }
    ];

    setThreatZones(zones);
  };

  const getMarkerColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getZoneColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'red': return '#ef4444';
      case 'orange': return '#f97316';
      case 'yellow': return '#eab308';
      case 'green': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const filteredData = heatMapData.filter(item => {
    if (selectedLayer === 'all') return true;
    if (selectedLayer === 'temperature') return item.sensorType === 'Temperature';
    if (selectedLayer === 'pressure') return item.sensorType === 'Pressure';
    if (selectedLayer === 'threats') return item.riskLevel === 'critical' || item.riskLevel === 'high';
    return true;
  });

  const handleRefresh = () => {
    setIsLoading(true);
    generateMockHeatMapData();
    generateMockThreatZones();
    setTimeout(() => setIsLoading(false), 1000);
    toast.success('Heat map data refreshed');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify({ heatMapData, threatZones }, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `heatmap-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Heat map data exported');
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading heat map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="font-medium">Threat Heat Map</span>
          <Badge variant={isConnected ? 'success' : 'danger'}>
            {isConnected ? 'Live' : 'Offline'}
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Button
              variant={selectedLayer === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLayer('all')}
            >
              All
            </Button>
            <Button
              variant={selectedLayer === 'temperature' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLayer('temperature')}
            >
              Temperature
            </Button>
            <Button
              variant={selectedLayer === 'pressure' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLayer('pressure')}
            >
              Pressure
            </Button>
            <Button
              variant={selectedLayer === 'threats' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLayer('threats')}
            >
              Threats
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Refresh
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Threat Zones */}
          {threatZones.map((zone) => (
            <Circle
              key={zone.id}
              center={zone.center}
              radius={zone.radius}
              pathOptions={{
                color: getZoneColor(zone.riskLevel),
                fillColor: getZoneColor(zone.riskLevel),
                fillOpacity: 0.2,
                weight: 2,
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">Threat Zone</h3>
                  <p className="text-sm text-gray-600">{zone.description}</p>
                  <p className="text-sm">
                    <strong>Risk Level:</strong> {zone.riskLevel.toUpperCase()}
                  </p>
                  <p className="text-sm">
                    <strong>Active Threats:</strong> {zone.threatCount}
                  </p>
                </div>
              </Popup>
            </Circle>
          ))}

          {/* Sensor Markers */}
          {filteredData.map((point) => (
            <Circle
              key={point.id}
              center={[point.lat, point.lng]}
              radius={100 + point.intensity * 200}
              pathOptions={{
                color: getMarkerColor(point.riskLevel),
                fillColor: getMarkerColor(point.riskLevel),
                fillOpacity: 0.6,
                weight: 2,
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{point.location}</h3>
                  <p className="text-sm text-gray-600">{point.sensorType} Sensor</p>
                  <p className="text-sm">
                    <strong>Value:</strong> {point.value} {point.unit}
                  </p>
                  <p className="text-sm">
                    <strong>Risk Level:</strong> {point.riskLevel.toUpperCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(point.timestamp).toLocaleString()}
                  </p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
          <h4 className="font-semibold mb-2 text-sm">Risk Levels</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Low (0-30%)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Medium (31-60%)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>High (61-80%)</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Critical (81-100%)</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border">
          <h4 className="font-semibold mb-2 text-sm">Statistics</h4>
          <div className="space-y-1 text-xs">
            <div>Total Sensors: {filteredData.length}</div>
            <div>Threat Zones: {threatZones.length}</div>
            <div>Critical Alerts: {filteredData.filter(d => d.riskLevel === 'critical').length}</div>
            <div>High Risk: {filteredData.filter(d => d.riskLevel === 'high').length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMapComponent;
