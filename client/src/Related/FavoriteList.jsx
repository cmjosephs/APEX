import React, { useState, useEffect, useContext, createContext, useRef } from 'react';
import RelatedListCard from './RelatedListCard.jsx';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AvgRating from '../Shared/AvgRating.jsx';
import FavoriteListCard from './FavoriteListCard.jsx'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AppContext } from '../App.jsx';

const FavoriteList = ({ currentProductId, currentProductDetails, currentProductImg, currentProductStyle }) => {
  const { productId, productDetails, reviewMetaData } = useContext(AppContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    gatherFavorites();
  }, [])

  useEffect(() => {
    resetFavoriteCarousel();
  }, [productId])

  function gatherFavorites() {
    const favoriteProductObjects = Object.values(localStorage);
    const favoriteProductsArray = [];
    favoriteProductObjects.map((productObj) => {
      favoriteProductsArray.push(JSON.parse(productObj));
    })
    setFavorites(favoriteProductsArray);
  }

  function addToFavorites() {
    let productToAdd = {};
    let defaultThumbnail = currentProductImg;
    if (currentProductImg === null) {
      defaultThumbnail = 'https://netmechanics.ca/wp-content/uploads/2019/04/you-almost-got-me-almost.jpg';
    }

    if (currentProductStyle.sale_price === null) {
      productToAdd = {
        productID: currentProductId,
        productName: currentProductDetails.name,
        category: currentProductDetails.category,
        url: defaultThumbnail,
        price: currentProductStyle.original_price,
        salePrice: currentProductStyle.sale_price,
        style: currentProductStyle.style_id
      }
    } else {
      productToAdd = {
        productID: currentProductId,
        productName: currentProductDetails.name,
        category: currentProductDetails.category,
        url: defaultThumbnail,
        price: currentProductStyle.original_price,
        salePrice: currentProductStyle.sale_price,
        style: currentProductStyle.style_id
      }
    }

    localStorage.setItem(currentProductId, JSON.stringify(productToAdd));
    if (favorites.length !== localStorage.length) {
      gatherFavorites();
    }
  }

  function delFavorites(favoriteProductId) {
    localStorage.removeItem(favoriteProductId);
    gatherFavorites();
  }

  const favoriteRef = React.useRef();

  const scrollProductsLeft = (scrollOffset) => {
    favoriteRef.current.scrollLeft -= 450;
  }

  const scrollProductsRight = (scrollOffset) => {
    favoriteRef.current.scrollLeft += 450;
  }

  function resetFavoriteCarousel() {
    favoriteRef.current.scrollLeft = 0;
  }

  function renderFavorites() {
    if (favorites.length !== 0) {
      return favorites.map((favorite, index) => {
        return (
          <>
            <FavoriteListCard
              favorite={favorite}
              delFavorites={delFavorites}
              key={`${favorite.productID}-${index}`}
            />
          </>
        )
      })
    }
  }

  return (
    <div className="favorite-wrapper">
      <h3 className="favorite-title">Your Favorite Products</h3>

      {favorites.length < 3 &&
      <br></br>}

      {favorites.length >= 3 &&
        <div className="favorite-row">
          <div className="favorite-next">
            <ArrowForwardIosIcon fontSize="large" className="favorite-scroll-right" onClick={() => scrollProductsRight()} />
          </div>
          <div className="favorite-prev">
            <ArrowBackIosNewIcon fontSize="large" className="favorite-scroll-left" onClick={() => scrollProductsLeft()} />
          </div>
        </div>}
      <div className="favorite-carousel" ref={favoriteRef}>
        <div className="favorite-card" style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
        <button className="add-favorite-button" role="button" style={{width: "100%", height: "100%"}} onClick={() => addToFavorites(currentProductId)}>
            <span class="text">
              Add to Your Favorites
              <br></br>
              <br></br>
              <br></br>
              <FavoriteIcon style={{ width: "3vw", height: "3vh" }}/>
            </span>
            <span>
              Add to Your Favorites
              <br></br>
              <br></br>
              <br></br>
              <FavoriteIcon style={{ width: "3vw", height: "3vh" }}/>
            </span>
          </button>
        </div>
        {renderFavorites()}
      </div>
    </div>
  )
}

export default FavoriteList;