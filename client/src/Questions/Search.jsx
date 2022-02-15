import React from 'react';

var Search = ({onSearch}) => {
  return (
    <div className="search-bar-questions">
      <input className="search-input" onChange={(e) => onSearch(e.target.value)} value="Have a question? Search for answers..."/>
      <button>
        <span className="search-icon"></span>
      </button>
    </div>
  );
};

export default Search;