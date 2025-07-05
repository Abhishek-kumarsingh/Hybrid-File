import React from 'react';
import { Refinery } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Building, MapPin, AlertTriangle, CheckCircle, Wrench } from 'lucide-react';

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
      case 'low':
        return <Badge variant="success">Low</Badge>;
      case 'medium':
        return <Badge variant="info">Medium</Badge>;
      case 'high':
        return <Badge variant="warning">High</Badge>;
      case 'critical':
        return <Badge variant="danger">Critical</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: Refinery['status']) => {
    switch (status) {
      case 'operational':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'maintenance':
        return <Wrench size={20} className="text-yellow-500" />;
      case 'shutdown':
        return <AlertTriangle size={20} className="text-red-500" />;
      default:
        return <Building size={20} className="text-gray-500" />;
    }
  };

  if (refineries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No refineries to display
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {refineries.map((refinery) => (
        <div
          key={refinery.id}
          className="p-4 border border-border rounded-lg bg-card hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getStatusIcon(refinery.status)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground truncate">
                  {refinery.name}
                </h4>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <MapPin size={14} className="mr-1" />
                  {refinery.location}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2 items-end">
              {getStatusBadge(refinery.status)}
              {getThreatLevelBadge(refinery.threatLevel)}
            </div>
          </div>
          
          {/* Additional details */}
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Status: {refinery.status}</span>
              <span>Threat Level: {refinery.threatLevel}</span>
            </div>
          </div>
        </div>
      ))}
      
      {/* Summary */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-2">Summary</h5>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-muted-foreground">Total Facilities:</span>
            <span className="ml-2 font-medium text-foreground">{refineries.length}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Operational:</span>
            <span className="ml-2 font-medium text-green-600">
              {refineries.filter(r => r.status === 'operational').length}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Maintenance:</span>
            <span className="ml-2 font-medium text-yellow-600">
              {refineries.filter(r => r.status === 'maintenance').length}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Shutdown:</span>
            <span className="ml-2 font-medium text-red-600">
              {refineries.filter(r => r.status === 'shutdown').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefineryStatus;
