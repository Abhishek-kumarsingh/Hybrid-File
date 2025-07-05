import React from 'react';
import { SensorData } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { format, parseISO } from 'date-fns';
import { AlertTriangle, Activity, CheckCircle } from 'lucide-react';

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

  const getStatusIcon = (status: SensorData['status']) => {
    switch (status) {
      case 'critical':
        return <AlertTriangle size={16} className="text-red-500" />;
      case 'warning':
        return <Activity size={16} className="text-yellow-500" />;
      case 'normal':
        return <CheckCircle size={16} className="text-green-500" />;
      default:
        return null;
    }
  };

  if (sensorData.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No sensor alerts to display
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="overflow-y-auto max-h-[500px]">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Sensor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Value
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {sensorData.map((sensor, index) => (
              <tr key={`${sensor.id}-${index}`} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(sensor.status)}
                    <div className="ml-2">
                      <div className="text-sm font-medium text-foreground">{sensor.sensorId}</div>
                      <div className="text-xs text-muted-foreground">{sensor.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">
                    {sensor.value} {sensor.unit}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(sensor.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-muted-foreground">{sensor.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
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
