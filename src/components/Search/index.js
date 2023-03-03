import { FaSearch } from "react-icons/fa";

import "./index.css";

const Search = (props) => {
  const { onChangeSearchInputValue, searchValue } = props;
  const onChangeSearchValue = (event) => {
    onChangeSearchInputValue(event.target.value);
  };

  return (
    <div className="sm-search-Container">
      <input
        type="search"
        value={searchValue}
        placeholder="Search For Job"
        onChange={onChangeSearchValue}
        className="search-input"
      />
      <button type="button" className="search-icon-btn">
        <FaSearch />
      </button>
    </div>
  );
};

export default Search;
