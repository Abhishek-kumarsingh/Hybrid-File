import React, { useState } from 'react';
import { Threat } from '../../types';
import { Badge } from '../ui/Badge';
import { format, parseISO } from 'date-fns';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface ThreatListProps {
  threats: Threat[];
  className?: string;
}

const ThreatList: React.FC<ThreatListProps> = ({ threats, className = '' }) => {
  const [expandedThreat, setExpandedThreat] = useState<string | null>(null);

  const getSeverityBadge = (severity: Threat['severity']) => {
    switch (severity) {
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

  const getStatusIcon = (status: Threat['status']) => {
    switch (status) {
      case 'active':
        return <AlertTriangle size={16} className="text-danger-500" />;
      case 'investigating':
        return <Clock size={16} className="text-warning-500" />;
      case 'resolved':
        return <CheckCircle size={16} className="text-success-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: Threat['status']) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'investigating':
        return 'Investigating';
      case 'resolved':
        return 'Resolved';
      default:
        return 'Unknown';
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedThreat(expandedThreat === id ? null : id);
  };

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="overflow-y-auto max-h-[500px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Severity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {threats.map((threat, index) => (
              <React.Fragment key={`${threat.id}-${index}`}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleExpand(threat.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSeverityBadge(threat.severity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{threat.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{threat.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(threat.status)}
                      <span className="ml-1.5 text-sm text-gray-500">{getStatusText(threat.status)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(parseISO(threat.timestamp), 'MMM d, h:mm a')}
                  </td>
                </tr>
                {expandedThreat === threat.id && (
                  <tr className="bg-gray-50" key={`${threat.id}-${index}-expanded`}>
                    <td colSpan={5} className="px-6 py-4">
                      <div className="text-sm text-gray-700">
                        <p className="font-medium mb-2">Description:</p>
                        <p className="mb-2">{threat.description}</p>
                        {threat.assignedTo && (
                          <p className="text-gray-500">
                            <span className="font-medium">Assigned to:</span> {threat.assignedTo}
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThreatList;