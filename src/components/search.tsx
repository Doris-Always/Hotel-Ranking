import React from 'react';

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
  onCancel: () => void;
}

const Search: React.FC<SearchProps> = ({ query, setQuery, onSearch, onCancel }) => {
  return (
    <div className="flex space-x-0 mb-4">
      <input
        type="text"
        placeholder="Search..."
        className="bg-white h-12 w-64 border-2 p-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={onSearch} className="bg-blue-500 text-white py-3  hover:bg-blue-600">
      <svg width="20" height="24" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M17.029 16.5295L19.5 19.0005" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      </button>
      <button onClick={onCancel} className="bg-red-500 text-white py-2 px-2 hover:bg-red-600">
        X
      </button>
    </div>
  );
};

export default Search;
