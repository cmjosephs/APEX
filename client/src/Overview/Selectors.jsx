import React, { useContext } from 'react';
import { StyleContext } from './Product.jsx';

var Selectors = () => {
  const { allStyles, currentStyle, dispatch } = useContext(StyleContext);

  const renderStyles = () => {
    return Object.values(allStyles).map((style, index) => {
      return (
        <img
          src={style.photos[0].thumbnail_url}
          alt="n/a"
          className="style"
          id={style.style_id}
          onClick={(e) => dispatch({ type: 'switchCurrentStyle', payload: {id: parseInt(e.target.id)} })}
          key={`${style.style_id}-${index}`}
        ></img>
      )
    })
  }

  const renderSizes = () => {

  }

  if (!Object.keys(currentStyle).length) {
    return <div>Loading</div>
  } else {
    return (
      <div className="selectors">
        <div className="styles">
          {renderStyles()}
        </div>
        <div className="sizes">
          size selector
        </div>
        <button>Add to Bag</button>
        <button>Add to your Outfit</button>
      </div>
    )
  }
}

export default Selectors;