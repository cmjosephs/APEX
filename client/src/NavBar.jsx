import React from 'react';
import resizeWidth from './Overview/resizeWidth.jsx';

const NavBar = () => {
  const { width } = resizeWidth();

  return (
    <nav>
      {width > 959 ?
      <ul>
        <li>Men</li>
        <li>Women</li>
        <li>Kids</li>
      </ul> : <ul>lll</ul>}
      <h1>{width > 959 ? "APEX" : "A"}</h1>
      <div>
        <input type="text" placeholder="Search" className="nav-search"></input>
        <img src="/images/heart.svg" alt="favorites" ></img>
        <img src="/images/bag.svg" alt="shopping-bag" ></img>
      </div>
    </nav>
  )
}

export default NavBar;