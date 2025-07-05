import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, RotateCcw, Maximize2, X } from 'lucide-react';

interface Product3DViewerProps {
  modelPath: string;
  productName: string;
}

const Product3DViewer: React.FC<Product3DViewerProps> = ({ modelPath, productName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // Simulate loading the 3D model
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle mouse/touch interactions for rotation
  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartPosition({ x: clientX, y: clientY });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const deltaX = clientX - startPosition.x;
    const deltaY = clientY - startPosition.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setStartPosition({ x: clientX, y: clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle zoom
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  // Reset view
  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div 
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-dark-950/90 flex items-center justify-center' : 'w-full aspect-square'}`}
    >
      <div 
        ref={containerRef}
        className={`relative overflow-hidden rounded-lg bg-neutral-100 ${isFullscreen ? 'w-full max-w-4xl h-full max-h-[80vh]' : 'w-full h-full'}`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-dark-600">Loading 3D Model...</p>
          </div>
        ) : (
          <motion.div 
            className="w-full h-full flex items-center justify-center"
            animate={{ 
              rotateX: rotation.x, 
              rotateY: rotation.y,
              scale: zoom
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* This would be replaced with an actual 3D model renderer */}
            <div className="relative w-3/4 h-3/4">
              <img 
                src={modelPath} 
                alt={productName}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-radial from-transparent to-neutral-100/50 pointer-events-none"></div>
            </div>
          </motion.div>
        )}

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 shadow-glass">
          <button 
            onClick={handleZoomIn}
            className="p-2 hover:bg-neutral-200/50 rounded-full transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn size={18} />
          </button>
          <button 
            onClick={handleZoomOut}
            className="p-2 hover:bg-neutral-200/50 rounded-full transition-colors"
            aria-label="Zoom out"
          >
            <ZoomIn size={18} className="rotate-180" />
          </button>
          <button 
            onClick={resetView}
            className="p-2 hover:bg-neutral-200/50 rounded-full transition-colors"
            aria-label="Reset view"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={toggleFullscreen}
            className="p-2 hover:bg-neutral-200/50 rounded-full transition-colors"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <X size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>

        {/* Drag instruction */}
        {!isDragging && !isLoading && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-dark-600 shadow-glass pointer-events-none">
            Drag to rotate
          </div>
        )}
      </div>
    </div>
  );
};

export default Product3DViewer;
