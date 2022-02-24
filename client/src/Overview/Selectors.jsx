import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from '../App.jsx';
import { StyleContext } from './Product.jsx';

var Selectors = () => {
  const { allStyles, currentStyle, dispatch } = useContext(StyleContext);
  const { productDetails } = useContext(AppContext);
  const [currentSku, setCurrentSku] = useState(null);
  const [styleDisplayName, setStyleDisplayName] = useState(currentStyle.name);

  const handleAddToBag = () => {
    axios.post('/api/cart', {sku_id: parseInt(currentSku)})
    .then(() => console.log('Added to Bag!')) // fix this later to show cart pop up
    .catch(err => console.error(err));
  }

  useEffect(() => {
    setCurrentSku(null);
    setStyleDisplayName(currentStyle.name);
  }, [currentStyle])

  const renderStyles = () => {
    return Object.values(allStyles).map((style, index) => {
      return (
        <Link to={`/products/${productDetails.id}/${style.style_id}`} key={index}>
          <img
            src={
              style.photos[0].thumbnail_url ?
              style.photos[0].thumbnail_url :
              'https://netmechanics.ca/wp-content/uploads/2019/04/you-almost-got-me-almost.jpg'
            }
            alt={style.name}
            className="style"
            id={style.style_id}
            onClick={() => dispatch({
              type: 'switchCurrentStyle',
              payload: {id: style.style_id}
            })}
            onMouseEnter={() => setStyleDisplayName(style.name)}
            onMouseLeave={() => setStyleDisplayName(currentStyle.name)}
            style={style.style_id === currentStyle.style_id ?
              {border: "solid #D6CCC2",
              boxShadow: "none"} : {border: "none"}}
          ></img>
        </Link>
      )
    })
  }

  const renderSizes = (skus) => {
    let availableSizes = [];
    for (let sku in skus) {
      availableSizes.push(
        <div className="size-option" key={sku}>
          <input
            type={skus[sku].quantity ? "radio" : ""}
            id={sku}
            className="visually-hidden"
            name="skuAndSize"
            onClick={
              skus[sku].quantity ? () => setCurrentSku(sku) : () => {}}
          ></input>
          <label
            htmlFor={sku}
            className={skus[sku].quantity ? "size-label" : "size-label-nostock"}
          >{skus[sku].size}</label>
        </div>
      )
    }
    return availableSizes;
  }

  return (
    <div className="selectors">
      <p data-testid="selected-style-name">{styleDisplayName}</p>
      <div className="style-selector">
        {renderStyles()}
      </div>
      <p className="sizes">Select Size</p>
        <div className="size-selector">
          {renderSizes(currentStyle.skus)}
        </div>
      <br></br>
      <div className="user-interest-btns">
        <button
          className="add-bag-btn"
          onClick={currentSku ? handleAddToBag : ()=>{}}>
          <p>Add to Bag</p>
        </button>
        <br></br>
      </div>
    </div>
  )

}

export default Selectors;