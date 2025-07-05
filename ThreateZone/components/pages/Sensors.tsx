'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useQuery } from '@tanstack/react-query';
import {
  Activity,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Settings,
  MapPin,
  Battery
} from 'lucide-react';

const Sensors: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock sensor data
  const { data: sensorsData, refetch } = useQuery({
    queryKey: ['sensors'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        {
          id: 'TEMP_001',
          name: 'Temperature Sensor 1',
          type: 'Temperature',
          location: 'Reactor Core',
          status: 'online',
          value: 85.2,
          unit: '°C',
          battery: 87,
          lastReading: new Date().toISOString(),
          alertLevel: 'normal'
        },
        {
          id: 'PRES_002',
          name: 'Pressure Sensor 2',
          type: 'Pressure',
          location: 'Pipeline A',
          status: 'online',
          value: 2.4,
          unit: 'bar',
          battery: 92,
          lastReading: new Date().toISOString(),
          alertLevel: 'warning'
        },
        {
          id: 'FLOW_003',
          name: 'Flow Sensor 3',
          type: 'Flow Rate',
          location: 'Main Valve',
          status: 'offline',
          value: 0,
          unit: 'L/min',
          battery: 15,
          lastReading: new Date(Date.now() - 300000).toISOString(),
          alertLevel: 'critical'
        },
        {
          id: 'VIB_004',
          name: 'Vibration Sensor 4',
          type: 'Vibration',
          location: 'Pump Station',
          status: 'online',
          value: 0.8,
          unit: 'mm/s',
          battery: 78,
          lastReading: new Date().toISOString(),
          alertLevel: 'normal'
        }
      ];
    },
    refetchInterval: 30000,
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAlertBadge = (alertLevel: string) => {
    switch (alertLevel) {
      case 'critical':
        return <Badge variant="danger">Critical</Badge>;
      case 'warning':
        return <Badge variant="warning">Warning</Badge>;
      case 'normal':
        return <Badge variant="success">Normal</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sensor Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor and manage IoT sensors across your infrastructure
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Sensors
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sensorsData?.length || 0}
                </p>
              </div>
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Online
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sensorsData?.filter(s => s.status === 'online').length || 0}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Offline
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sensorsData?.filter(s => s.status === 'offline').length || 0}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Alerts
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sensorsData?.filter(s => s.alertLevel !== 'normal').length || 0}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Sensors Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {sensorsData?.map((sensor) => (
          <motion.div key={sensor.id} variants={itemVariants}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {sensor.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {sensor.type}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(sensor.status)}
                  {getAlertBadge(sensor.alertLevel)}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Current Value
                  </span>
                  <span className="font-medium">
                    {sensor.value} {sensor.unit}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Location
                  </span>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1 text-gray-400" />
                    <span className="text-sm">{sensor.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Battery
                  </span>
                  <div className="flex items-center">
                    <Battery className="w-3 h-3 mr-1 text-gray-400" />
                    <span className="text-sm">{sensor.battery}%</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Last reading: {new Date(sensor.lastReading).toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Sensors;
