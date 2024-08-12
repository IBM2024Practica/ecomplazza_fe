import React, { useState } from 'react';

interface BrandFilterProps {
  onChange: (selected: string[]) => void;
}

const BrandFilter: React.FC<BrandFilterProps> = ({ onChange }) => {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const handleChange = (brand: string) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(updatedBrands);
    onChange(updatedBrands);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Brands</h3>
      <div className="space-y-2">
        {['Nike', 'Adidas', 'Puma', 'Reebok'].map((brand) => (
          <label key={brand} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={brand}
              onChange={() => handleChange(brand)}
              checked={selectedBrands.includes(brand)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
