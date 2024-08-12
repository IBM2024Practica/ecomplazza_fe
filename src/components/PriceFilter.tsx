import React, { useState } from 'react';

interface PriceFilterProps {
  onChange: (minPrice: number | '', maxPrice: number | '') => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onChange }) => {
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  const handleApply = () => {
    onChange(minPrice, maxPrice);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Price</h3>
      <div className="flex space-x-2 mb-4">
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="border rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="border rounded-lg p-2 w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        onClick={handleApply}
        className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Apply
      </button>
    </div>
  );
};

export default PriceFilter;
