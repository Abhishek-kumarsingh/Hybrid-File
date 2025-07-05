import React from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-dark-800 text-sm uppercase tracking-wider">Size</h3>
        <button className="text-sm text-dark-600 hover:text-primary-800 transition-colors underline">
          Size Guide
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelectSize(size)}
            className={`min-w-[40px] py-2 px-3 border transition-colors ${
              selectedSize === size
                ? 'border-dark-800 bg-dark-950 text-white'
                : 'border-gray-300 hover:border-dark-400'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;