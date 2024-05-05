import React from "react";

interface SearchBarProps {
  searchInput: string;
  handleSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchInput, handleSearchInput }) => {
  return (
    <div>
      <input
        value={searchInput}
        type="text"
        placeholder="search an event"
        className="rounded-md px-2 py-2 w-80 h-10 border border-black"
        onChange={handleSearchInput}
      />
    </div>
  );
};

export default SearchBar;
