import React from 'react';

interface FilterProps {
  categories: string[];
  selectedCategory: string | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
  onFilter: () => void;
  onCancelFilter: () => void;
}

const Filter: React.FC<FilterProps> = ({ categories, selectedCategory, setSelectedCategory, onFilter, onCancelFilter }) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(e.target.value);
        onFilter(); // Call onFilter to indicate filtering is applied
      };
  return (
    <div className="mb-4">
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={onFilter}>
        Filter By Category
      </button>
      <select
        name="categories"
        value={selectedCategory}
        onChange={handleSelectChange}
        required
        className="ml-2 p-2 border border-gray-300 rounded"
      >
        <option value="">Select a category</option>
        {categories.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
      <button onClick={onCancelFilter} className="bg-red-500 text-white py-2 px-4 ml-2 rounded hover:bg-red-600">
        Cancel Filter
      </button>
    </div>
  );
};

export default Filter;
