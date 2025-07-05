import React from 'react';
import { vehicleModels } from '../../data/models';
import Button from '../ui/Button';

const ModelsSection: React.FC = () => {
  return (
    <section id="models" className="section-padding bg-secondary-800">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Discover Our Premium Vehicles
          </h2>
          <p 
            className="text-gray-300 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            Engineered for performance, designed for the future, and built to exceed expectations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicleModels.map((model) => (
            <div 
              key={model.id} 
              className="glass-card overflow-hidden group"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="150"
            >
              <div className="h-52 overflow-hidden bg-gradient-to-br from-secondary-700 to-secondary-900 relative">
                {/* Placeholder for 3D model or image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt={model.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{model.name}</h3>
                <p className="text-primary-500 font-semibold mb-4">{model.price}</p>
                <p className="text-gray-300 mb-6 line-clamp-3">{model.description}</p>
                
                <div className="flex justify-between items-center">
                  <Button variant="primary">Explore</Button>
                  <Button variant="outline">Configure</Button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add two more placeholder models */}
          <div 
            className="glass-card overflow-hidden opacity-50 hover:opacity-70 transition-opacity duration-300"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <div className="h-52 overflow-hidden bg-gradient-to-br from-secondary-700 to-secondary-900 flex items-center justify-center">
              <span className="text-xl font-bold">Coming Soon</span>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">XR Velocity</h3>
              <p className="text-primary-500 font-semibold mb-4">$TBA</p>
              <p className="text-gray-300 mb-6">The future of sport performance with unmatched aerodynamics and acceleration.</p>
              
              <div className="flex justify-between items-center">
                <Button variant="primary" disabled>Explore</Button>
                <Button variant="outline" disabled>Configure</Button>
              </div>
            </div>
          </div>
          
          <div 
            className="glass-card overflow-hidden opacity-50 hover:opacity-70 transition-opacity duration-300"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="250"
          >
            <div className="h-52 overflow-hidden bg-gradient-to-br from-secondary-700 to-secondary-900 flex items-center justify-center">
              <span className="text-xl font-bold">Coming Soon</span>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">XR Terrain</h3>
              <p className="text-primary-500 font-semibold mb-4">$TBA</p>
              <p className="text-gray-300 mb-6">Conquer any landscape with our advanced off-road technology and rugged design.</p>
              
              <div className="flex justify-between items-center">
                <Button variant="primary" disabled>Explore</Button>
                <Button variant="outline" disabled>Configure</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;