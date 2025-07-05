import React from 'react';

interface ColorSelectorProps {
  colors: string[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  colors,
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-dark-800 text-sm uppercase tracking-wider mb-3">Color</h3>
      <div className="flex space-x-3">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onSelectColor(color)}
            aria-label={`Select ${color} color`}
            className={`w-8 h-8 rounded-full transition-transform duration-200 ${
              selectedColor === color 
                ? 'ring-2 ring-dark-800 ring-offset-2 scale-110' 
                : 'hover:scale-110'
            }`}
            style={{ backgroundColor: color }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;