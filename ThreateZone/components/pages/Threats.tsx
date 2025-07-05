'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useQuery } from '@tanstack/react-query';
import {
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle,
  RefreshCw,
  Filter,
  Search,
  Eye
} from 'lucide-react';

const Threats: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock threats data
  const { data: threatsData, refetch } = useQuery({
    queryKey: ['threats'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        {
          id: 'THR_001',
          title: 'Unauthorized Access Attempt',
          description: 'Multiple failed login attempts detected from IP 192.168.1.100',
          severity: 'high',
          status: 'active',
          type: 'Security',
          location: 'Main Server',
          detectedAt: new Date(Date.now() - 3600000).toISOString(),
          lastUpdated: new Date().toISOString(),
          affectedSensors: ['SEC_001', 'SEC_002']
        },
        {
          id: 'THR_002',
          title: 'Temperature Anomaly',
          description: 'Temperature readings exceed normal operating range',
          severity: 'critical',
          status: 'investigating',
          type: 'Environmental',
          location: 'Reactor Core',
          detectedAt: new Date(Date.now() - 1800000).toISOString(),
          lastUpdated: new Date(Date.now() - 300000).toISOString(),
          affectedSensors: ['TEMP_001', 'TEMP_003']
        },
        {
          id: 'THR_003',
          title: 'Network Intrusion',
          description: 'Suspicious network traffic patterns detected',
          severity: 'medium',
          status: 'resolved',
          type: 'Network',
          location: 'DMZ Network',
          detectedAt: new Date(Date.now() - 7200000).toISOString(),
          lastUpdated: new Date(Date.now() - 3600000).toISOString(),
          affectedSensors: ['NET_001']
        },
        {
          id: 'THR_004',
          title: 'Pressure Spike',
          description: 'Sudden pressure increase in pipeline system',
          severity: 'high',
          status: 'mitigated',
          type: 'Operational',
          location: 'Pipeline A',
          detectedAt: new Date(Date.now() - 5400000).toISOString(),
          lastUpdated: new Date(Date.now() - 1800000).toISOString(),
          affectedSensors: ['PRES_002', 'PRES_004']
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

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="danger">Critical</Badge>;
      case 'high':
        return <Badge variant="warning">High</Badge>;
      case 'medium':
        return <Badge variant="default">Medium</Badge>;
      case 'low':
        return <Badge variant="success">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="danger">Active</Badge>;
      case 'investigating':
        return <Badge variant="warning">Investigating</Badge>;
      case 'mitigated':
        return <Badge variant="default">Mitigated</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolved</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'investigating':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'mitigated':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredThreats = threatsData?.filter(threat => {
    if (selectedFilter === 'all') return true;
    return threat.status === selectedFilter;
  });

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
            Threat Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor and respond to security threats and anomalies
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-sm"
            >
              <option value="all">All Threats</option>
              <option value="active">Active</option>
              <option value="investigating">Investigating</option>
              <option value="mitigated">Mitigated</option>
              <option value="resolved">Resolved</option>
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
                  Total Threats
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {threatsData?.length || 0}
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
                  Active
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {threatsData?.filter(t => t.status === 'active').length || 0}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Critical
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {threatsData?.filter(t => t.severity === 'critical').length || 0}
                </p>
              </div>
              <Shield className="w-8 h-8 text-red-600" />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Resolved
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {threatsData?.filter(t => t.status === 'resolved').length || 0}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Threats List */}
      <motion.div className="space-y-4" variants={containerVariants}>
        {filteredThreats?.map((threat) => (
          <motion.div key={threat.id} variants={itemVariants}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(threat.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {threat.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {getSeverityBadge(threat.severity)}
                        {getStatusBadge(threat.status)}
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {threat.description}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Type:</span>
                        <span className="ml-2 font-medium">{threat.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Location:</span>
                        <span className="ml-2 font-medium">{threat.location}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Detected:</span>
                        <span className="ml-2 font-medium">
                          {new Date(threat.detectedAt).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500 dark:text-gray-400">Sensors:</span>
                        <span className="ml-2 font-medium">
                          {threat.affectedSensors.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Details
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Threats;
