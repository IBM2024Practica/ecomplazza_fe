// src/components/SubcategoryFilter.tsx
import React from 'react';

interface SubcategoryFilterProps {
  onChange: (selected: string[]) => void;
}

const subcategories = [
  'Shoes',
  'T-Shirts',
  'Hoodies',
  'Pants',
  'Accessories',
];

const SubcategoryFilter: React.FC<SubcategoryFilterProps> = ({ onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="subcategory"]:checked')).map(
      (checkbox) => checkbox.value
    );
    onChange(selected);
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Subcategories</h3>
      <ul className="space-y-2">
        {subcategories.map((subcategory) => (
          <li key={subcategory}>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="subcategory"
                value={subcategory}
                className="form-checkbox h-4 w-4 text-indigo-600"
                onChange={handleChange}
              />
              <span className="ml-2 text-sm text-gray-700">{subcategory}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubcategoryFilter;
