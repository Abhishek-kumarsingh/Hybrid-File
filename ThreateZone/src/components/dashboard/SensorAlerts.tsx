import React from 'react';
import { SensorData } from '../../types';
import { Badge } from '../ui/Badge';
import { format, parseISO } from 'date-fns';

interface SensorAlertsProps {
  sensorData: SensorData[];
  className?: string;
}

const SensorAlerts: React.FC<SensorAlertsProps> = ({ sensorData, className = '' }) => {
  const getStatusBadge = (status: SensorData['status']) => {
    switch (status) {
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

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="overflow-y-auto max-h-[400px]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sensor ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sensorData.map((sensor, index) => (
              <tr key={`${sensor.id}-${index}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{sensor.sensorId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{sensor.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {sensor.value} {sensor.unit}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(sensor.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{sensor.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(parseISO(sensor.timestamp), 'MMM d, h:mm a')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorAlerts;