// src/components/MaterialFilter.tsx
import React from 'react';

interface MaterialFilterProps {
  onChange: (selected: string[]) => void;
}

const materials = [
  'Cotton',
  'Wool',
  'Polyester',
  'Leather',
  'Silk',
];

const MaterialFilter: React.FC<MaterialFilterProps> = ({ onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="material"]:checked')).map(
      (checkbox) => checkbox.value
    );
    onChange(selected);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Material</h3>
      <ul className="space-y-2">
        {materials.map((material) => (
          <li key={material}>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="material"
                value={material}
                className="form-checkbox h-4 w-4 text-indigo-600"
                onChange={handleChange}
              />
              <span className="ml-2 text-sm text-gray-700">{material}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialFilter;
