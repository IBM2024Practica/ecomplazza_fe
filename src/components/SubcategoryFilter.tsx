import React, { useState } from 'react';

interface SubcategoryFilterProps {
  onChange: (selected: string[]) => void;
}

const SubcategoryFilter: React.FC<SubcategoryFilterProps> = ({ onChange }) => {
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  const handleChange = (subcategory: string) => {
    const updatedSubcategories = selectedSubcategories.includes(subcategory)
      ? selectedSubcategories.filter((sc) => sc !== subcategory)
      : [...selectedSubcategories, subcategory];

    setSelectedSubcategories(updatedSubcategories);
    onChange(updatedSubcategories);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Subcategories</h3>
      <div className="space-y-2">
        {['Tops', 'Bottoms', 'Shoes', 'Accessories'].map((subcategory) => (
          <label key={subcategory} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={subcategory}
              onChange={() => handleChange(subcategory)}
              checked={selectedSubcategories.includes(subcategory)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{subcategory}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryFilter;
