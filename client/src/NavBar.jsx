import React from 'react';
import resizeWidth from './Overview/resizeWidth.jsx';

const NavBar = ({ themeToggler }) => {
  const { width } = resizeWidth();

  return (
    <nav>
      {width > 959 ?
      <ul>
        <li>Men</li>
        <li>Women</li>
        <li>Kids</li>
      </ul> : <img src="/images/justify.svg" alt="side-nav"></img>}
      <h1>{width > 959 ? "APEX" : "A"}</h1>
      <div>
        <input type="text" placeholder="Search" className="nav-search"></input>
        <img src="/images/heart.svg" alt="favorites" className="nav-btn"></img>
        <img src="/images/bag.svg" alt="shopping-bag" className="nav-btn"></img>
        <button onClick={() => themeToggler()}>Change Theme</button>
      </div>
    </nav>
  )
}

export default NavBar;