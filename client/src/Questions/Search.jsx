import React from 'react';

var Search = ({onSearch}) => {
  return (
    <div className="search">
      <input type="text" className="search-input" onChange={(e) => onSearch(e.target.value)} placeholder="Have a question? Search for answers..."/>
    </div>
  );
};

export default Search;