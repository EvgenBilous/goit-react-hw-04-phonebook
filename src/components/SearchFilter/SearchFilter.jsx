const SearchFilter = ({ filter, handleFilter }) => {
  return <input onChange={handleFilter} type="text" value={filter} />;
};

export default SearchFilter;
