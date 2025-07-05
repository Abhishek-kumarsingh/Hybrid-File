import React from 'react';
import { VehicleFeature } from '../../types';
import { 
  Battery, 
  Cpu, 
  Gauge, 
  PlugZap, 
  Shield, 
  Thermometer, 
  Wrench 
} from 'lucide-react';

interface FeatureCardProps {
  feature: VehicleFeature;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  // Map feature icon string to Lucide icon components
  const getIcon = (iconName: string) => {
    const iconProps = { className: "w-8 h-8 text-primary-500", strokeWidth: 1.5 };
    
    switch (iconName) {
      case 'engine':
        return <PlugZap {...iconProps} />;
      case 'gauge':
        return <Gauge {...iconProps} />;
      case 'battery':
        return <Battery {...iconProps} />;
      case 'cpu':
        return <Cpu {...iconProps} />;
      case 'shield':
        return <Shield {...iconProps} />;
      case 'thermometer':
        return <Thermometer {...iconProps} />;
      default:
        return <Wrench {...iconProps} />;
    }
  };

  return (
    <div 
      className="glass-card p-6 highlighted-feature flex flex-col h-full"
      data-aos="fade-up"
      data-aos-delay="100"
      data-aos-duration="800"
    >
      <div className="mb-4">
        {getIcon(feature.icon)}
      </div>
      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
      {feature.value && (
        <div className="text-primary-500 text-2xl font-bold mb-2">{feature.value}</div>
      )}
      <p className="text-gray-300 text-sm flex-grow">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;