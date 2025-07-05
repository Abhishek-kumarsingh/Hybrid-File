import React, { useEffect, useState } from 'react';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface VehicleViewerPlaceholderProps {
  colorHex?: string;
  showPart?: string;
}

const VehicleViewerPlaceholder: React.FC<VehicleViewerPlaceholderProps> = ({ 
  colorHex = '#0077FF',
  showPart
}) => {
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [zoom, setZoom] = useState(100);
  
  // Auto rotation effect
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.2) % 360);
    }, 30);
    
    return () => clearInterval(interval);
  }, [isAutoRotating]);
  
  // Handle manual rotation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isAutoRotating) return;
    
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    
    // Calculate rotation based on mouse position relative to center
    const mouseX = e.clientX;
    const distanceFromCenter = mouseX - centerX;
    const rotationFactor = distanceFromCenter / (rect.width / 2) * 45; // Max 45 degrees
    
    setRotation(180 + rotationFactor);
  };
  
  // Toggle auto rotation
  const toggleAutoRotation = () => {
    setIsAutoRotating(prev => !prev);
  };
  
  // Handle zoom
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 150));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 70));
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center relative"
      data-aos="fade-in"
      data-aos-duration="1200"
    >
      {/* Placeholder for the 3D model */}
      <div 
        className="relative"
        style={{ 
          transform: `rotate(${rotation}deg) scale(${zoom / 100})`,
          transition: isAutoRotating ? 'transform 0.3s ease' : 'none'
        }}
        onMouseMove={handleMouseMove}
        onClick={toggleAutoRotation}
      >
        {/* This would be replaced with actual 3D model */}
        <img
          src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Vehicle Model"
          className="w-auto h-auto max-w-full max-h-[70vh] object-contain opacity-90"
          style={{ filter: `drop-shadow(0 0 30px ${colorHex}40)` }}
        />
        
        {/* Highlight specific part if requested */}
        {showPart && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-24 h-24 rounded-full border-2 border-accent-500 animate-pulse"
              style={{ 
                boxShadow: '0 0 15px rgba(57, 255, 20, 0.5)',
                left: showPart === 'wheels' ? '25%' : 
                     showPart === 'brakes' ? '20%' : 
                     showPart === 'seats' ? '50%' : '60%',
                top: showPart === 'wheels' ? '70%' : 
                    showPart === 'brakes' ? '65%' : 
                    showPart === 'seats' ? '50%' : '40%',
                position: 'absolute',
                transform: 'translate(-50%, -50%)'
              }}
            ></div>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button 
          className="w-10 h-10 rounded-full bg-secondary-800/80 hover:bg-secondary-700 flex items-center justify-center transition-colors"
          onClick={toggleAutoRotation}
          title={isAutoRotating ? "Stop auto-rotation" : "Start auto-rotation"}
        >
          <RotateCcw size={18} className={`${isAutoRotating ? 'text-primary-500' : 'text-white'}`} />
        </button>
        <button 
          className="w-10 h-10 rounded-full bg-secondary-800/80 hover:bg-secondary-700 flex items-center justify-center transition-colors"
          onClick={handleZoomIn}
          title="Zoom in"
        >
          <ZoomIn size={18} />
        </button>
        <button 
          className="w-10 h-10 rounded-full bg-secondary-800/80 hover:bg-secondary-700 flex items-center justify-center transition-colors"
          onClick={handleZoomOut}
          title="Zoom out"
        >
          <ZoomOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default VehicleViewerPlaceholder;