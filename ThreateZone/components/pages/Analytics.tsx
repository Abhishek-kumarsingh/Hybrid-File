'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useQuery } from '@tanstack/react-query';
import { usePreferences } from '@/contexts/PreferencesContext';
import {
  BarChart3,
  TrendingUp,
  Activity,
  AlertTriangle,
  Download,
  RefreshCw,
  Calendar,
  Filter
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { preferences } = usePreferences();

  // Mock analytics data
  const { data: analyticsData, refetch } = useQuery({
    queryKey: ['analytics', selectedTimeRange],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        totalThreats: 156,
        resolvedThreats: 142,
        activeThreats: 14,
        criticalAlerts: 8,
        sensorUptime: 98.5,
        responseTime: 2.3,
        threatsByType: [
          { type: 'Intrusion', count: 45 },
          { type: 'Anomaly', count: 38 },
          { type: 'System', count: 32 },
          { type: 'Network', count: 28 },
          { type: 'Physical', count: 13 }
        ],
        trends: {
          threatsThisWeek: 23,
          threatsLastWeek: 18,
          alertsThisWeek: 67,
          alertsLastWeek: 52
        }
      };
    },
    refetchInterval: preferences?.dashboard?.refreshInterval || 30000,
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

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
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive threat analysis and system metrics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
            >
              {timeRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
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
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Threats
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analyticsData?.totalThreats || 0}
                </p>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 dark:text-green-400">
                +{analyticsData?.trends?.threatsThisWeek || 0} this week
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Threats
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analyticsData?.activeThreats || 0}
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="mt-4">
              <Badge variant="warning">
                {analyticsData?.criticalAlerts || 0} Critical
              </Badge>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Resolution Rate
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analyticsData ? Math.round((analyticsData.resolvedThreats / analyticsData.totalThreats) * 100) : 0}%
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                <BarChart3 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {analyticsData?.resolvedThreats || 0} resolved
              </span>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  System Uptime
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analyticsData?.sensorUptime || 0}%
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Avg response: {analyticsData?.responseTime || 0}s
              </span>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Threat Analysis */}
      <motion.div variants={itemVariants}>
        <Card title="Threat Analysis by Type" className="p-6">
          <div className="space-y-4">
            {analyticsData?.threatsByType?.map((threat, index) => (
              <div key={threat.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="font-medium">{threat.type}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${(threat.count / (analyticsData?.totalThreats || 1)) * 100}%`
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8 text-right">
                    {threat.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
