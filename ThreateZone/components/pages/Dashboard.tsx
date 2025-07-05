'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Activity,
  CheckCircle,
  Server,
  RefreshCw,
  Filter,
  Download,
  MapPin,
  TrendingUp,
  Users,
  Shield
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import StatusCard from '@/components/dashboard/StatusCard';
import ThreatList from '@/components/dashboard/ThreatList';
import SensorAlerts from '@/components/dashboard/SensorAlerts';
import TimeSeriesChart from '@/components/dashboard/TimeSeriesChart';
import ThreatChart from '@/components/dashboard/ThreatChart';
import RefineryStatus from '@/components/dashboard/RefineryStatus';
import HeatMapComponent from '@/components/dashboard/HeatMapComponent';
import { useSocket } from '@/components/providers/SocketProvider';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  mockDashboardStats,
  mockThreats,
  mockSensorData,
  mockTimeSeriesData,
  mockThreatsByType,
  mockThreatsBySeverity,
  mockRefineries
} from '@/data/mockData';
import { Threat, SensorData, DashboardStats } from '@/types';

const Dashboard: React.FC = () => {
  const [threats, setThreats] = useState<Threat[]>(mockThreats);
  const [sensorData, setSensorData] = useState<SensorData[]>(mockSensorData);
  const [stats, setStats] = useState<DashboardStats>(mockDashboardStats);
  const [timeSeriesData, setTimeSeriesData] = useState(mockTimeSeriesData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState<'overview' | 'heatmap'>('overview');

  const { socket, isConnected } = useSocket();

  // Use React Query for data fetching
  const { data: dashboardData, refetch, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        stats: mockDashboardStats,
        threats: mockThreats,
        sensorData: mockSensorData,
        timeSeriesData: mockTimeSeriesData
      };
    },
    initialData: {
      stats: mockDashboardStats,
      threats: mockThreats,
      sensorData: mockSensorData,
      timeSeriesData: mockTimeSeriesData
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
    toast.success('Dashboard data refreshed');
  };

  useEffect(() => {
    if (!socket) return;

    // Listen for real-time updates
    socket.on('sensor-data', (data: SensorData[]) => {
      setSensorData(data);
    });

    socket.on('threat-data', (data: Threat[]) => {
      setThreats(data);
    });

    socket.on('new-sensor-reading', (data: SensorData) => {
      setSensorData(prev => [data, ...prev.slice(0, 19)]);
      toast.info(`New sensor reading: ${data.sensorId} - ${data.value}${data.unit}`);
    });

    socket.on('new-threat', (data: Threat) => {
      setThreats(prev => [data, ...prev.slice(0, 19)]);
      setStats(prev => ({
        ...prev,
        activeThreatCount: prev.activeThreatCount + 1
      }));
      toast.error(`New threat detected: ${data.type}`, {
        description: data.description
      });
    });

    socket.on('threat-update', (updatedThreat: Threat) => {
      setThreats(prev =>
        prev.map(threat =>
          threat.id === updatedThreat.id ? updatedThreat : threat
        )
      );

      // Update stats if a threat was resolved
      if (updatedThreat.status === 'resolved') {
        setStats(prev => ({
          ...prev,
          activeThreatCount: Math.max(0, prev.activeThreatCount - 1),
          resolvedIncidents: prev.resolvedIncidents + 1
        }));
        toast.success(`Threat resolved: ${updatedThreat.type}`);
      }
    });

    // Cleanup on unmount
    return () => {
      socket.off('sensor-data');
      socket.off('threat-data');
      socket.off('new-sensor-reading');
      socket.off('new-threat');
      socket.off('threat-update');
    };
  }, [socket]);

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">ThreatZone Prediction System</h1>
          <p className="mt-1 text-muted-foreground">
            Real-time monitoring of threats and sensor data across all infrastructure
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-muted-foreground">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={selectedView === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('overview')}
          >
            Overview
          </Button>
          <Button
            variant={selectedView === 'heatmap' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedView('heatmap')}
            leftIcon={<MapPin size={16} />}
          >
            Heat Map
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Filter size={16} />}
          >
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download size={16} />}
          >
            Export
          </Button>
          <Button
            variant="default"
            size="sm"
            leftIcon={<RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />}
            onClick={handleRefresh}
            isLoading={isRefreshing}
          >
            Refresh
          </Button>
        </div>
      </div>

      {selectedView === 'heatmap' ? (
        <motion.div variants={itemVariants}>
          <Card title="Threat Heat Map" isAnimated>
            <div className="h-[600px]">
              <HeatMapComponent />
            </div>
          </Card>
        </motion.div>
      ) : (
        <>
          {/* Status Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <StatusCard
                title="Active Threats"
                value={stats.activeThreatCount}
                icon={<AlertTriangle size={24} />}
                variant="danger"
                trend={{ value: 12, isUpward: false }}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatusCard
                title="Critical Sensor Alerts"
                value={stats.criticalSensorAlerts}
                icon={<Activity size={24} />}
                variant="warning"
                trend={{ value: 5, isUpward: true }}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatusCard
                title="Resolved Incidents"
                value={stats.resolvedIncidents}
                icon={<CheckCircle size={24} />}
                variant="success"
                trend={{ value: 8, isUpward: true }}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <StatusCard
                title="System Uptime"
                value={`${stats.uptime}%`}
                icon={<Server size={24} />}
                variant="info"
                trend={{ value: 0, isUpward: true }}
              />
            </motion.div>
          </motion.div>

          {/* Charts Row */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Card title="Alert Level Trend (24h)" isAnimated>
                <div className="p-4">
                  <TimeSeriesChart
                    data={timeSeriesData}
                    title=""
                  />
                </div>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card title="Threats by Type" isAnimated>
                <div className="p-4">
                  <ThreatChart
                    data={mockThreatsByType}
                    dataKey="count"
                    nameKey="type"
                    title=""
                  />
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Threats and Sensors Row */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Card title="Recent Threats" isAnimated>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                      <Badge variant="danger">Critical</Badge>
                      <Badge variant="warning">High</Badge>
                      <Badge variant="info">Medium</Badge>
                    </div>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  <ThreatList threats={threats.slice(0, 5)} />
                </div>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card title="Critical Sensor Readings" isAnimated>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                      <Badge variant="danger">Critical</Badge>
                      <Badge variant="warning">Warning</Badge>
                    </div>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  <SensorAlerts
                    sensorData={sensorData.filter(s => s.status !== 'normal').slice(0, 5)}
                  />
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Additional Charts and Tables */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Card title="Threats by Severity" isAnimated>
                <div className="p-4">
                  <ThreatChart
                    data={mockThreatsBySeverity}
                    dataKey="count"
                    nameKey="severity"
                    title=""
                  />
                </div>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card title="Infrastructure Status" isAnimated>
                <div className="p-4">
                  <RefineryStatus refineries={mockRefineries} />
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Dashboard;
