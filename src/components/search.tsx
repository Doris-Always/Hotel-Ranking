import React from 'react';

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  onCancel: () => void;
}

const Search: React.FC<SearchProps> = ({ query, setQuery, onSearch, onCancel }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <input
        type="text"
        placeholder="Search..."
        className="bg-amber-300 h-10 w-44 p-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={onSearch} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Search
      </button>
      <button onClick={onCancel} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
        X
      </button>
    </div>
  );
};

export default Search;
