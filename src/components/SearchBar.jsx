import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex-1 px-0 sm:px-6 w-full sm:w-auto">
      <div className="bg-blue-50 flex items-center px-4 py-2 rounded-md w-full max-w-xl mx-auto">
      <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          className="bg-transparent outline-none flex-1 text-sm text-black placeholder-gray-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg> */}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;