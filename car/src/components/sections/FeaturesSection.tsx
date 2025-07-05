import React from 'react';
import { vehicleModels } from '../../data/models';
import FeatureCard from '../ui/FeatureCard';

const FeaturesSection: React.FC = () => {
  // For demo purposes, we're using the features of the first vehicle model
  const vehicle = vehicleModels[0];

  return (
    <section id="features" className="section-padding bg-secondary-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-secondary-900 via-transparent to-secondary-900 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Unleash the Power of Innovation
          </h2>
          <p 
            className="text-gray-300 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            Cutting-edge technology meets extraordinary performance in every aspect of our vehicles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicle.features.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              feature={feature} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;