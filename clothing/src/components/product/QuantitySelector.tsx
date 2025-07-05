import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-dark-800 text-sm uppercase tracking-wider mb-3">Quantity</h3>
      <div className="flex items-center border border-gray-300">
        <button
          onClick={onDecrement}
          disabled={quantity <= 1}
          className="p-2 border-r border-gray-300 disabled:opacity-50"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center">{quantity}</span>
        <button
          onClick={onIncrement}
          className="p-2 border-l border-gray-300"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;