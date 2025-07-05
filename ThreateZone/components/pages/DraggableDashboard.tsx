'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useQuery } from '@tanstack/react-query';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Server,
  RefreshCw,
  Settings,
  Grid3X3,
  Save
} from 'lucide-react';

const DraggableDashboard: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Mock dashboard data
  const { data: dashboardData, refetch } = useQuery({
    queryKey: ['draggable-dashboard'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        widgets: [
          {
            id: 'threats',
            title: 'Active Threats',
            value: 14,
            icon: 'AlertTriangle',
            color: 'red',
            position: { x: 0, y: 0, w: 1, h: 1 }
          },
          {
            id: 'sensors',
            title: 'Online Sensors',
            value: 87,
            icon: 'Activity',
            color: 'green',
            position: { x: 1, y: 0, w: 1, h: 1 }
          },
          {
            id: 'alerts',
            title: 'Critical Alerts',
            value: 5,
            icon: 'AlertTriangle',
            color: 'orange',
            position: { x: 2, y: 0, w: 1, h: 1 }
          },
          {
            id: 'uptime',
            title: 'System Uptime',
            value: '99.8%',
            icon: 'Server',
            color: 'blue',
            position: { x: 3, y: 0, w: 1, h: 1 }
          }
        ]
      };
    },
    refetchInterval: 30000,
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'AlertTriangle':
        return <AlertTriangle className="w-8 h-8" />;
      case 'Activity':
        return <Activity className="w-8 h-8" />;
      case 'CheckCircle':
        return <CheckCircle className="w-8 h-8" />;
      case 'Server':
        return <Server className="w-8 h-8" />;
      default:
        return <Activity className="w-8 h-8" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'red':
        return 'text-red-500 bg-red-100 dark:bg-red-900/20';
      case 'green':
        return 'text-green-500 bg-green-100 dark:bg-green-900/20';
      case 'orange':
        return 'text-orange-500 bg-orange-100 dark:bg-orange-900/20';
      case 'blue':
        return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      default:
        return 'text-gray-500 bg-gray-100 dark:bg-gray-900/20';
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
            Draggable Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Customize your dashboard layout by dragging and dropping widgets
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => setIsEditMode(!isEditMode)}
            variant={isEditMode ? "default" : "outline"}
            size="sm"
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            {isEditMode ? 'Exit Edit' : 'Edit Layout'}
          </Button>
          {isEditMode && (
            <Button size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Layout
            </Button>
          )}
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
            Settings
          </Button>
        </div>
      </motion.div>

      {/* Edit Mode Notice */}
      {isEditMode && (
        <motion.div variants={itemVariants}>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center">
              <Grid3X3 className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <p className="text-blue-800 dark:text-blue-200">
                Edit mode is active. Drag widgets to rearrange them, then click "Save Layout" to persist changes.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Dashboard Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {dashboardData?.widgets?.map((widget) => (
          <motion.div
            key={widget.id}
            variants={itemVariants}
            className={`${isEditMode ? 'cursor-move' : ''}`}
            whileHover={isEditMode ? { scale: 1.02 } : {}}
            whileTap={isEditMode ? { scale: 0.98 } : {}}
          >
            <Card className={`p-6 ${isEditMode ? 'border-2 border-dashed border-blue-300 dark:border-blue-600' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {widget.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {widget.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${getColorClasses(widget.color)}`}>
                  {getIcon(widget.icon)}
                </div>
              </div>
              {isEditMode && (
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Widget ID: {widget.id}
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Widgets Section */}
      <motion.div variants={itemVariants}>
        <Card title="Available Widgets" className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sensor Status Widget
              </p>
              <Button size="sm" variant="outline" className="mt-2">
                Add Widget
              </Button>
            </div>
            <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Threat Monitor Widget
              </p>
              <Button size="sm" variant="outline" className="mt-2">
                Add Widget
              </Button>
            </div>
            <div className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center">
              <Server className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                System Health Widget
              </p>
              <Button size="sm" variant="outline" className="mt-2">
                Add Widget
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Instructions */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 bg-gray-50 dark:bg-gray-800/50">
          <h3 className="font-semibold mb-3">Dashboard Customization</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>• Click "Edit Layout" to enter edit mode</p>
            <p>• Drag widgets to rearrange them</p>
            <p>• Add new widgets from the available widgets section</p>
            <p>• Save your layout to persist changes</p>
            <p>• Use the refresh button to update widget data</p>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default DraggableDashboard;
