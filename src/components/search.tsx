import React from 'react';

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  onCancel: () => void;
}

const Search: React.FC<SearchProps> = ({ query, setQuery, onSearch, onCancel }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch(); // Trigger search when Enter is pressed
    }
  };

  const handleBlur = () => {
    onSearch(); // Trigger search when input loses focus
  };
  return (
    <div className="flex space-x-0 mb-4">
      <input
      
        type="text"
        placeholder="Search..."
        className="bg-white h-12 w-64 border-2 p-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
      />
     
      <button onClick={onCancel} className="bg-gray-300 text-white py-2 px-4 hover:bg-gray-400">
        X
      </button>
    </div>
  );
};

export default Search;
