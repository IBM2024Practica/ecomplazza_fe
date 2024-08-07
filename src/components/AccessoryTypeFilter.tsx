// src/components/AccessoryTypeFilter.tsx
import React from 'react';

const accessoryTypes = [
  'Bags',
  'Jewelry',
  'Belts',
  'Hats',
  'Sunglasses',
];

const AccessoryTypeFilter: React.FC = () => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Accessory Type</h3>
      <ul className="space-y-2">
        {accessoryTypes.map((type) => (
          <li key={type}>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600"
              />
              <span className="ml-2 text-sm text-gray-700">{type}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccessoryTypeFilter;
