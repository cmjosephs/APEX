import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import Rating from '@mui/material/Rating';

var FavoriteListCard = ({ currentProductId }) => {
  const [favorites, setFavorites] = useState([]);

  // handleClick = () => {
  //   setFavorites()
  // }

  function hasFavorites() {
    if (favorites.length > 0) {
      return (
        <div className="related-card">
          <div className="related-container">
            <img src={relatedImgUrl.thumbnail_url}/>
          </div>
          <div className="related-rating"><Rating name="read-only" value={calcAverageRating(rating)} precision={0.25} readOnly />{calcAverageRating(rating)}</div>
          <div className="category-name" style={{ textAlign: "center" }}>{relatedProduct.category}</div>
          <div className="related-name" style={{ textAlign: "center" }}>{relatedProduct.name}</div>
          <FontAwesomeIcon icon={faX}/>
    </div>
      )
    }
  }
  return (
    <div>
    </div>

  )
}

export default FavoriteListCard;