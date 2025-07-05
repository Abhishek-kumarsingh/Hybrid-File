import React from 'react';
import { vehicleModels } from '../../data/models';
import SpecTable from '../ui/SpecTable';
import { Gauge } from 'lucide-react';

const SpecsSection: React.FC = () => {
  const vehicle = vehicleModels[0]; // For demo purposes, we're using the first vehicle model

  return (
    <section id="specs" className="section-padding bg-secondary-800 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      
      {/* Content */}
      <div className="container mx-auto container-padding relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Left column - Highlights */}
          <div className="md:w-1/3">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              Technical Specifications
            </h2>
            <p 
              className="text-gray-300 mb-8"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              The {vehicle.name} combines revolutionary technology with exceptional performance to deliver an unmatched driving experience.
            </p>
            
            <div 
              className="glass-card p-6 mb-6"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <Gauge className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-bold">Lightning Acceleration</h3>
                  <p className="text-3xl font-bold text-primary-500">{vehicle.specs.acceleration}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                Experience the thrill of instant acceleration with our advanced propulsion system.
              </p>
            </div>
            
            <div 
              className="glass-card p-6"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <div className="mb-4">
                <h3 className="font-bold mb-2">Performance Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-300">Power Output</span>
                    <span className="font-semibold">{vehicle.specs.power}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300">Top Speed</span>
                    <span className="font-semibold">{vehicle.specs.topSpeed}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300">Range</span>
                    <span className="font-semibold">{vehicle.specs.range}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-300">Battery</span>
                    <span className="font-semibold">{vehicle.specs.batteryCapacity}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Right column - Detailed specs */}
          <div className="md:w-2/3">
            <div className="glass-card p-6 md:p-8">
              <h3 
                className="text-2xl font-bold mb-6"
                data-aos="fade-left"
                data-aos-duration="800"
              >
                Detailed Specifications
              </h3>
              
              <SpecTable specs={vehicle.specs} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecsSection;