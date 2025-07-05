import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import * as THREE from 'three';

interface VehicleViewerProps {
  colorHex?: string;
  showPart?: string;
}

// Fallback box model when GLB is not available
function FallbackVehicle({ color = '#ffffff' }) {
  return (
    <mesh>
      <boxGeometry args={[2, 1, 4]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const VehicleViewer: React.FC<VehicleViewerProps> = ({ 
  colorHex = '#0077FF',
  showPart
}) => {
  const [isRotating, setIsRotating] = useState(true);
  
  return (
    <div className="w-full h-[500px] relative">
      <Canvas
        camera={{ position: [5, 2, 5], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <Stage environment="city" intensity={0.5}>
          <FallbackVehicle color={colorHex} />
          <OrbitControls 
            autoRotate={isRotating}
            autoRotateSpeed={1}
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Stage>
      </Canvas>
      
      {/* Controls */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button 
          className="w-10 h-10 rounded-full bg-secondary-800/80 hover:bg-secondary-700 flex items-center justify-center transition-colors"
          onClick={() => setIsRotating(!isRotating)}
        >
          <span className="sr-only">Toggle rotation</span>
          <div className={`w-4 h-4 border-2 border-white rounded-full ${isRotating ? 'border-primary-500' : ''}`} />
        </button>
      </div>
    </div>
  );
};

export default VehicleViewer;