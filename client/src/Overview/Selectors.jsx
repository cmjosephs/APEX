import React, { useState, useEffect, useContext } from 'react';
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
  }

  useEffect(() => {
    setCurrentSku(null);
    setStyleDisplayName(currentStyle.name);
  }, [currentStyle])

  const renderStyles = () => {
    return Object.values(allStyles).map((style, index) => {
      return (
        <img
          src={style.photos[0].thumbnail_url}
          alt={style.name}
          className="style"
          id={style.style_id}
          onClick={(e) => dispatch({ type: 'switchCurrentStyle', payload: {id: parseInt(e.target.id)} })}
          onMouseEnter={(e) => setStyleDisplayName(e.target.alt)}
          onMouseLeave={() => setStyleDisplayName(currentStyle.name)}
          key={`${style.style_id}-${index}`}
          style={{ border: style.style_id === currentStyle.style_id ? "thick solid red" : "none"}}
        ></img>
      )
    })
  }

  const renderSizes = (skus) => {
    let availableSizes = [];
    for (let sku in skus) {
      availableSizes.push(
        <div className="size-option" key={sku}>
          <input
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
            className="size-label"
            style={skus[sku].quantity ? {color: "black"} : {color: "gray"}}
          >{skus[sku].size}</label>
        </div>
      )
    }
    return availableSizes;
  }

  // if (!Object.keys(currentStyle).length) {
  //   return <div>Loading</div>
  // } else {
  return (
    <div className="selectors">
      <p>{styleDisplayName}</p>
      <div className="style-selector">
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
  // }
}

export default Selectors;