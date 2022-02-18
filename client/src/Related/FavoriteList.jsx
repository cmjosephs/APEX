import React, { useState, useEffect, userReducer, createContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Rating from '@mui/material/Rating';
//import FavoriteListCard from './FavoriteListCard.jsx';

const FavoriteList = ({ currentProductId, currentProductDetails, currentProductRating, currentProductImg }) => {
  const [favorites, setFavorites] = useState([]);

  function gatherObjects() {
    const favoriteProductObjects = Object.values(localStorage);
    const favoriteProductsArray = favoriteProductObjects.map((productObj) => JSON.parse(productObj));
    return favoriteProductsArray;
  }

  function getFavorites() {
    const updateStorage = gatherObjects();
    setFavorites(updateStorage);
  }

  function addToFavorites() {
    const productToAdd = {
      productName: currentProductDetails.name,
      category: currentProductDetails.category,
      url:  currentProductImg
      rating: currentProductRating
    }

    localStorage.setItem(currentProductId, JSON.stringify(productToAdd));
    if (favorites.length !== localStorage.length) {
      getFavorites();
    }
  }

  function delFavorites() {
    localStorage.removeItem(currentProductId)
    const updateStorage = gatherObjects();
    setFavorites(updateStorage);
  }

  function renderFavorites() {
    if (favorites.length !== 0) {
      return (
        {favorites.map((favorite, index) => (
          <FavoriteListCard favorite={favorite} key={`${currentProductId}-${index}`}/>
        ))}
      )
    } else {
      return (

      )
    }
  }
  // useEffect(() => {

  // }, [favorites])

  return (
    <div>
      <button style={{ display: "flex", width: "300px", height: "375px" }} onClick={addToFavorites}>Add to Favorites +</button>
      {favorites.map((favorite, index) => (

        <FavoriteListCard favorite={favorite} key={`${currentProductId}-${index}`}/>
      ))}

      {relatedArr.map((relatedId, index) => (
          <div style={{ display: "flex", margin: "5px" }}>
            <RelatedListCard
              relatedId={relatedId}
              currentProductId={currentProductId}
              key={`${index}-${relatedId}`}
              currentProductDetails={productDetails}
              currentProductImg={currentProductImg}/>
          </div>
        ))}
    </div>

  )
}

export default FavoriteList;