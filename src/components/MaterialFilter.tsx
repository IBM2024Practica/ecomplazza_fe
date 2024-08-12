import React, { useState } from 'react';

interface MaterialFilterProps {
  onChange: (selected: string[]) => void;
}

const MaterialFilter: React.FC<MaterialFilterProps> = ({ onChange }) => {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const handleChange = (material: string) => {
    const updatedMaterials = selectedMaterials.includes(material)
      ? selectedMaterials.filter((m) => m !== material)
      : [...selectedMaterials, material];

    setSelectedMaterials(updatedMaterials);
    onChange(updatedMaterials);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Materials</h3>
      <div className="space-y-2">
        {['Cotton', 'Polyester', 'Leather', 'Wool'].map((material) => (
          <label key={material} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={material}
              onChange={() => handleChange(material)}
              checked={selectedMaterials.includes(material)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{material}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MaterialFilter;
