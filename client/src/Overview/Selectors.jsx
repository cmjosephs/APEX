import React, { useState, useEffect, useContext } from 'react';
<<<<<<< HEAD
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
=======
import { StyleContext } from './Product.jsx';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';

var Selectors = () => {
  const { allStyles, currentStyle, dispatch } = useContext(StyleContext);
  // const [stock, setStock] = useState(currentStyle.skus);
  const [currentSku, setCurrentSku] = useState(null);
  const [styleDisplayName, setStyleDisplayName] = useState(currentStyle.name);

  const calcAvailable = (styleSkusObj) => {
    // returns total stock of style
    // this will be for whether to fade out the style selector for a style
  }

  const handleAddToBag = () => {
    // axios.post('/api/cart', {sku_id: parseInt(currentSku)})
    // .then(() => console.log('Added to Cart!')) // fix this later to show cart pop up
    // .catch(err => console.error(err))
    console.log({sku_id: currentSku})
  }

  const handleAddFavorite = () => {
    // talk to kevin about how he wants to store
    // product_id or style_id???
    console.log('Clicked on added to Favorites');
>>>>>>> eb6b606 (Completed basic features model)
  }

  useEffect(() => {
    setCurrentSku(null);
    setStyleDisplayName(currentStyle.name);
  }, [currentStyle])

  const renderStyles = () => {
    return Object.values(allStyles).map((style, index) => {
      return (
<<<<<<< HEAD
        <Link to={`/products/${productDetails.id}/${style.style_id}`} key={index}>
          <img
            src={style.photos[0].thumbnail_url}
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
=======
        <img
          src={style.photos[0].thumbnail_url}
          alt={style.name}
          className="style"
          id={style.style_id}
          onClick={(e) => dispatch({ type: 'switchCurrentStyle', payload: {id: parseInt(e.target.id)} })}
          onMouseEnter={(e) => setStyleDisplayName(e.target.alt)}
          onMouseLeave={() => setStyleDisplayName(currentStyle.name)}
          key={`${style.style_id}-${index}`}
        ></img>
>>>>>>> eb6b606 (Completed basic features model)
      )
    })
  }

  const renderSizes = (skus) => {
    let availableSizes = [];
    for (let sku in skus) {
      availableSizes.push(
        <div className="size-option" key={sku}>
          <input
<<<<<<< HEAD
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
            style={skus[sku].quantity ? {color: "black"} : {color: "gray"}}
          >{skus[sku].size}</label>
          {/* {productDetails.category === 'Kicks' && 'M'} */}
=======
            type="radio"
            id={sku}
            // data={skus[sku].quantity}
            className="visually-hidden"
            name="skuAndSize"
            onClick={
              parseInt(skus[sku].quantity) ? (e) => setCurrentSku(e.target.id) : () => {}}
          ></input>
          <label
            htmlFor={sku}
            style={skus[sku].quantity ? {color: "black"} : {color: "gray"}}
          >{skus[sku].size}</label>
>>>>>>> eb6b606 (Completed basic features model)
        </div>
      )
    }
    return availableSizes;
  }

  return (
    <div className="selectors">
<<<<<<< HEAD
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

=======
      <div className="style-selector">
        <p>{styleDisplayName}</p>
        {renderStyles()}
      </div>
      <p className="sizes">Sizes</p>
        <div className="size-selector">
          {renderSizes(currentStyle.skus)}
        </div>
      <button className="add-bag-btn" onClick={handleAddToBag}>
        <p>Add to Bag</p>
        <ShoppingBagIcon />
      </button>
      <br></br>
      <button className="favorite-btn" onClick={handleAddFavorite}>
        <p>Favorite</p>
        <FavoriteIcon />
      </button>
    </div>
  )
>>>>>>> eb6b606 (Completed basic features model)
}

export default Selectors;