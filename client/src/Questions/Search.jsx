import React from 'react';

var Search = ({onSearch}) => {
  return (
    <nav className="navbar">
      <input className="search-input" onChange={(e) => onSearch(e.target.value)} placeholder="Have a question? Search for answers..."/>
    </nav>
  );
};

export default Search;