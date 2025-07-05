import React, { useState } from 'react';
import { vehicleModels } from '../../data/models';
import { ColorOption, VehiclePart } from '../../types';
import ColorPicker from '../ui/ColorPicker';
import PartCard from '../ui/PartCard';
import Button from '../ui/Button';
import { PaintBucket, Settings, Palette } from 'lucide-react';
import VehicleViewer from '../3d/VehicleViewer';

const CustomizeSection: React.FC = () => {
  const vehicle = vehicleModels[0]; // For demo purposes, we're using the first vehicle model
  const [selectedColor, setSelectedColor] = useState<string>(vehicle.colors[0].id);
  const [selectedPart, setSelectedPart] = useState<string>(vehicle.parts[0].id);
  
  // Find the selected color and part objects
  const colorObj = vehicle.colors.find(c => c.id === selectedColor) as ColorOption;
  const partObj = vehicle.parts.find(p => p.id === selectedPart) as VehiclePart;
  
  // Get the background style based on the selected color
  const getBackgroundStyle = () => {
    return {
      background: colorObj.gradient || colorObj.color,
      opacity: 0.15
    };
  };

  return (
    <section id="customize" className="section-padding relative overflow-hidden">
      {/* Color-based background accent */}
      <div 
        className="absolute top-0 left-0 right-0 h-1/2 transition-all duration-700" 
        style={getBackgroundStyle()}
      ></div>
      <div className="absolute inset-0 bg-secondary-900 grid-bg opacity-40 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Customize Your Drive
          </h2>
          <p 
            className="text-gray-300 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
          >
            Design your perfect vehicle by selecting colors, materials, and premium features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column - Color selection */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div 
              className="glass-card p-6 mb-8"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              <div className="flex items-center mb-4">
                <PaintBucket className="w-5 h-5 text-primary-500 mr-2" />
                <h3 className="text-xl font-bold">Exterior Color</h3>
              </div>
              <ColorPicker 
                colors={vehicle.colors} 
                selectedColor={selectedColor} 
                onChange={setSelectedColor} 
              />
              <div className="mt-4 pt-4 border-t border-secondary-700">
                <h4 className="font-semibold mb-2">{colorObj.name}</h4>
                <p className="text-sm text-gray-300">Premium finish with anti-scratch coating and UV protection.</p>
              </div>
            </div>
            
            <div 
              className="glass-card p-6"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <div className="flex items-center mb-4">
                <Settings className="w-5 h-5 text-primary-500 mr-2" />
                <h3 className="text-xl font-bold">Configuration</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Model</span>
                  <span className="font-semibold">{vehicle.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Engine</span>
                  <span className="font-semibold">Quantum Drive</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Interior</span>
                  <span className="font-semibold">Premium</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Price</span>
                  <span className="font-semibold text-primary-500">{vehicle.price}</span>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="accent" fullWidth>
                  Save Configuration
                </Button>
              </div>
            </div>
          </div>
          
          {/* Center - 3D model viewer */}
          <div className="lg:col-span-3 order-1 lg:order-2 min-h-[400px] flex items-center justify-center relative">
            <div 
              className="absolute inset-0 rounded-xl transition-all duration-700"
              style={{
                background: colorObj.gradient || colorObj.color,
                opacity: 0.05
              }}
            ></div>
            <VehicleViewer 
              colorHex={colorObj.color}
              showPart={selectedPart}
            />
          </div>
          
          {/* Right column - Parts selection */}
          <div className="lg:col-span-1 order-3">
            <div 
              className="glass-card p-6 mb-8"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              <div className="flex items-center mb-4">
                <Palette className="w-5 h-5 text-primary-500 mr-2" />
                <h3 className="text-xl font-bold">Vehicle Parts</h3>
              </div>
              <p className="text-sm text-gray-300 mb-4">Click on a part to view details and customize options.</p>
              <div className="space-y-4">
                {vehicle.parts.map(part => (
                  <button
                    key={part.id}
                    className={`w-full text-left p-3 rounded-md transition-all ${
                      selectedPart === part.id 
                        ? 'bg-primary-500/20 text-white' 
                        : 'text-gray-300 hover:bg-secondary-700'
                    }`}
                    onClick={() => setSelectedPart(part.id)}
                  >
                    {part.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div 
              className="glass-card p-6"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <h3 className="text-xl font-bold mb-2">{partObj.name}</h3>
              <p className="text-gray-300 mb-4">{partObj.description}</p>
              <div className="aspect-video rounded-md overflow-hidden mb-4">
                <img 
                  src={partObj.image} 
                  alt={partObj.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <Button variant="outline" fullWidth>
                Customize This Part
              </Button>
            </div>
          </div>
        </div>
        
        {/* Parts gallery */}
        <div className="mt-16">
          <h3 
            className="text-2xl font-bold mb-8 text-center"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Premium Components
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicle.parts.map(part => (
              <PartCard 
                key={part.id} 
                part={part} 
                onClick={setSelectedPart}
                isActive={selectedPart === part.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomizeSection;