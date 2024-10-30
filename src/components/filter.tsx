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
        onFilter();
      };
  return (
    <div className="mb-4">
      {/* <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={onFilter}>
        Filter By Category
      </button> */}
      <select
        name="categories"
        value={selectedCategory}
        onChange={handleSelectChange}
        required
        className="ml-2 p-2 border-2 w-64 h-12 text-gray-500"
        onClick={onFilter}
      >
        <option value="">Select a category</option>
        {categories.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
      <button onClick={onCancelFilter} className="bg-red-500 text-white  px-4 h-12 hover:bg-red-600">
        X
      </button>
    </div>
  );
};

export default Filter;
