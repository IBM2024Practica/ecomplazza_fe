// src/components/PriceFilter.tsx
import React, { useState } from 'react';

interface PriceFilterProps {
  onChange: (minPrice: number, maxPrice: number) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onChange }) => {
  const [minPrice, setMinPrice] = useState<number | string>('');
  const [maxPrice, setMaxPrice] = useState<number | string>('');

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : parseFloat(e.target.value);
    setMinPrice(value);
    onChange(value as number, maxPrice as number);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '' : parseFloat(e.target.value);
    setMaxPrice(value);
    onChange(minPrice as number, value as number);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Price</h3>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Min"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <input
          type="number"
          placeholder="Max"
          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={maxPrice}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
