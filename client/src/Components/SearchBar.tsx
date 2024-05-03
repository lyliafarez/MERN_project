

export default function SearchBar({searchInput,handleSearchInput}) {
    return(
        <div>
        <input
          value={searchInput}
          type="text"
          placeholder="search an event"
          className="rounded-md px-2 py-2 w-80 h-10 border border-black"
          onChange={handleSearchInput}
        />
        </div>
    )

}