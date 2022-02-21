import React, { useState, useEffect, userReducer, createContext, useRef } from 'react';
import RelatedListCard from './RelatedListCard.jsx';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Rating from '@mui/material/Rating';
import FavoriteListCard from './FavoriteListCard.jsx'

const FavoriteList = ({ currentProductId, currentProductDetails, currentProductRating, currentProductImg }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    gatherFavorites();
  }, [])

  function gatherFavorites() {
    const favoriteProductObjects = Object.values(localStorage);
    const favoriteProductsArray = [];
    favoriteProductObjects.map((productObj) => {
      favoriteProductsArray.push(JSON.parse(productObj));
    })
    setFavorites(favoriteProductsArray);
  }

  function addToFavorites() {
    const productToAdd = {
      productName: currentProductDetails.name,
      category: currentProductDetails.category,
      url: currentProductImg.thumbnail_url,
      rating: currentProductRating
    }

    localStorage.setItem(currentProductId, JSON.stringify(productToAdd));
    if (favorites.length !== localStorage.length) {
      gatherFavorites();
    }
  }

  function delFavorites() {
    localStorage.removeItem(currentProductId)
    gatherFavorites();
  }

  const favoriteRef = React.useRef();

  const scrollProductsLeft = (scrollOffset) => {
    console.log(scrollOffset);
    favoriteRef.current.scrollLeft -= scrollOffset;
  }

  const scrollProductsRight = (scrollOffset) => {
    console.log(scrollOffset);
    favoriteRef.current.scrollLeft += scrollOffset;
  }

  function renderFavorites() {
    // console.log(favorites);
    if (favorites.length !== 0) {
      // console.log(favorites);
      return favorites.map((favorite, index) => {
        return (
          <FavoriteListCard
            favorite={favorite}
            key={`${currentProductId}-${index}`}
          />
        )
      })
    }
  }

  return (
    <div>
      <div className="favorite-wrapper">
        <h3 className="favorite-title">Your Favorite Products</h3>

        <div className="favorite-carousel" ref={favoriteRef}>
          <button onClick={addToFavorites}>Add to your favorites +</button>
          <button onClick={delFavorites}>Remove from favorites -</button>
          {renderFavorites()}
        </div>

        <div className="favorite-row">
          <div className="favorite-prev">
            <ArrowBackIosNewIcon fontSize="large" className="favorite-scroll-left" onClick={() => scrollProductsLeft(carouselScrollOffset)} />
          </div>
          <div className="favorite-next">
            <ArrowForwardIosIcon fontSize="large" className="favorite-scroll-right" onClick={() => scrollProductsRight(carouselScrollOffset)} />
          </div>
        </div>

        <br></br>
        <br></br>
      </div>
    </div>

  )
}

export default FavoriteList;

// {"productName":"Morning Joggers","category":"Pants","url":"https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80","rating":4}

// {"productName":"Heir Force Ones","category":"Kicks","url":"https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80","rating":3.25}

            // console.log(favorite, index, '***all saved products***');
            //console.log(typeof favorite);
            // <FavoriteListCard
            //   // favorite={favorite}
            //   someProductName={favorite.productName}
            //   key={`${currentProductId}-${index}`}
            // />
            // console.log(favorite.productName);
            // <div className="hello-world">{favorite.productName}</div>