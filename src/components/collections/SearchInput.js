import "./SearchInput.css";

function SearchInput({ searchQuery, setSearchQuery }) {
  return (
    <div className="input-wrapper">
      <input
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        value={searchQuery}
        type="text"
        placeholder="search for collections"
      />
    </div>
  );
}

export default SearchInput;
