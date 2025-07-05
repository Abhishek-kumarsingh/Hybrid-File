import React from 'react';
import { ColorOption } from '../../types';

interface ColorPickerProps {
  colors: ColorOption[];
  selectedColor: string;
  onChange: (colorId: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ colors, selectedColor, onChange }) => {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((color) => (
        <button
          key={color.id}
          className={`w-12 h-12 rounded-full transition-all duration-300 relative ${
            selectedColor === color.id
              ? 'ring-2 ring-offset-2 ring-white ring-offset-secondary-800 scale-110'
              : 'hover:scale-105'
          }`}
          style={{ 
            background: color.gradient || color.color,
            boxShadow: selectedColor === color.id ? '0 0 15px ' + color.color : 'none' 
          }}
          onClick={() => onChange(color.id)}
          title={color.name}
          aria-label={`Select ${color.name} color`}
        >
          {selectedColor === color.id && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-full"></span>
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default ColorPicker;