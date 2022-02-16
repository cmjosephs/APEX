import React, { useState, useContext } from 'react';
import { StyleContext } from './Product.jsx';

var Selectors = () => {
  const { allStyles, currentStyle, dispatch } = useContext(StyleContext);
  // const [stock, setStock] = useState(currentStyle.skus);
  const [currentSku, setCurrentSku] = useState(null)

  const calcAvailable = () => {

  }

  const handleSelectSize = (sku) => {
    console.log(sku);
    setCurrentSku(sku);
  }


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

  const renderSizes = (skus) => {
    let availableSizes = [];
    for (let sku in skus) {
      availableSizes.push(
        <div key={sku}>
          <input
            type="radio"
            id={sku}
            className="visually-hidden"
            name="skuAndSize"
            onClick={(e) => handleSelectSize(e.target.id)}
          ></input>
          <label htmlFor={sku}>{skus[sku].size}</label>
        </div>
        // <label
        //   className="skusAndSizes"
        //   htmlFor={sku}
        //   key={sku}
        //   data={skus[sku].quantity}
        //   onClick={(e) => handleSelectSize()}
        //   style={{ textDecoration: parseInt(skus[sku].quantity) ? "" : "line-through" }}
        // >{skus[sku].size}</label>
      )
    }
    return availableSizes;
  }

  // const renderSizes = (skus) => {
  //   let availableSizes = [];
  //   for (let sku in skus) {
  //     availableSizes.push(
  //       <label
  //         className="skusAndSizes"
  //         htmlFor={sku}
  //         key={sku}
  //         data={skus[sku].quantity}
  //         onClick={(e) => handleSelectSize()}
  //         style={{ textDecoration: parseInt(skus[sku].quantity) ? "" : "line-through" }}
  //       >{skus[sku].size}</label>
  //     )
  //   }
  //   return availableSizes;
  // }

  if (!Object.keys(currentStyle).length) {
    return <div>Loading</div>
  } else {
    return (
      <div className="selectors">
        <div className="style-selector">
          {renderStyles()}
        </div>
        <div className="size-selector">
          size selector
          {renderSizes(currentStyle.skus)}
        </div>
        <button>Add to Bag</button>
        <button>Favorite</button>
      </div>
    )
  }
}

export default Selectors;