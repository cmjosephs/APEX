
import React, { useState, useEffect, userReducer, createContext, useRef } from 'react';
import RelatedListCard from './RelatedListCard.jsx';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AvgRating from '../Shared/AvgRating.jsx';
import FavoriteListCard from './FavoriteListCard.jsx'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const FavoriteList = ({ currentProductId, currentProductDetails, currentProductImg }) => {
  const { productId, productDetails, reviewMetaData } = useContext(AppContext);
  const [favorites, setFavorites] = useState([]);
  // const [count, setCount] = useState(0);

  useEffect(() => {
    gatherFavorites();
  }, [])

  // useEffect(() => {
  //   updateCount();
  // }, [])

  // function updateCount() {
  //   let newCount = 0;
  //   if (favorites.length !== 0) {
  //     lastIndex = favorites.length - 1;
  //     newCount = favorites[lastIndex].startIndex + 1;
  //   }
  //   setCount(newCount);
  // }

  function gatherFavorites() {
    const favoriteProductObjects = Object.values(localStorage);
    const favoriteProductsArray = [];
    // favoriteProductObjects.sort((a, b) => (a.startIndex > b.startIndex) ? 1 : -1);
    favoriteProductObjects.map((productObj) => {
      favoriteProductsArray.push(JSON.parse(productObj));
    })
    setFavorites(favoriteProductsArray);
    // setCount(prevCount => prevCount + 1);
  }

  function addToFavorites() {
    const productToAdd = {
      // startIndex: count,
      productID: currentProductId,
      productName: currentProductDetails.name,
      category: currentProductDetails.category,
      url: currentProductImg.thumbnail_url,
      price: currentProductDetails.default_price
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
    <div>
      <h3 className="favorite-title">Your Favorite Products</h3>
      <div className="favorite-wrapper">
        <div className="favorite-row">
          <div className="favorite-next">
            <ArrowForwardIosIcon fontSize="large" className="favorite-scroll-right" onClick={() => scrollProductsRight()} />
          </div>
          <div className="favorite-prev">
            <ArrowBackIosNewIcon fontSize="large" className="favorite-scroll-left" onClick={() => scrollProductsLeft()} />
          </div>
        </div>
        <div className="favorite-carousel" ref={favoriteRef}>
          <div className="favorite-card">
            <button onClick={() => addToFavorites(currentProductId)}>
              <div className="add-favorite-button">Add to Your Favorites</div>
              <FavoriteIcon />
            </button>
          </div>
          {renderFavorites()}
        </div>


        <br></br>
        <br></br>
      </div>
    </div>
  )
}

export default FavoriteList;
