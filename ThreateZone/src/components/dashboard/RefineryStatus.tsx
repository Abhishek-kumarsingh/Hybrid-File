import React from 'react';
import { Refinery } from '../../types';
import { Badge } from '../ui/Badge';

interface RefineryStatusProps {
  refineries: Refinery[];
  className?: string;
}

const RefineryStatus: React.FC<RefineryStatusProps> = ({ refineries, className = '' }) => {
  const getStatusBadge = (status: Refinery['status']) => {
    switch (status) {
      case 'operational':
        return <Badge variant="success">Operational</Badge>;
      case 'maintenance':
        return <Badge variant="warning">Maintenance</Badge>;
      case 'shutdown':
        return <Badge variant="danger">Shutdown</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getThreatLevelBadge = (threatLevel: Refinery['threatLevel']) => {
    switch (threatLevel) {
      case 'critical':
        return <Badge variant="danger">Critical</Badge>;
      case 'high':
        return <Badge variant="warning">High</Badge>;
      case 'medium':
        return <Badge variant="info">Medium</Badge>;
      case 'low':
        return <Badge variant="success">Low</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Refinery
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Threat Level
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {refineries.map((refinery) => (
              <tr key={refinery.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{refinery.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{refinery.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(refinery.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getThreatLevelBadge(refinery.threatLevel)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefineryStatus;