import React from 'react';

var Search = ({ onSearch }) => {
  return (
    <div className="search">
      <nav className="navbar">
        <input type="text" className="search-input" onChange={(e) => onSearch(e.target.value)} placeholder="Have a question? Search for answers..." />
      </nav>
    </div>
  );
};

export default Search;