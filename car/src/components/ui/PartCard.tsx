import React from 'react';
import { VehiclePart } from '../../types';

interface PartCardProps {
  part: VehiclePart;
  onClick: (partId: string) => void;
  isActive: boolean;
}

const PartCard: React.FC<PartCardProps> = ({ part, onClick, isActive }) => {
  return (
    <div 
      className={`glass-card overflow-hidden transition-all duration-300 cursor-pointer
        ${isActive ? 'ring-2 ring-primary-500 shadow-neon' : 'hover:shadow-md'}
      `}
      onClick={() => onClick(part.id)}
      data-aos="zoom-in"
      data-aos-duration="700"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={part.image} 
          alt={part.name} 
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg mb-1">{part.name}</h4>
        <p className="text-sm text-gray-300">{part.description}</p>
      </div>
    </div>
  );
};

export default PartCard;