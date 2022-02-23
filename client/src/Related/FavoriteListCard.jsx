import React from 'react';
import Rating from '@mui/material/Rating';

const FavoriteListCard = ({ favorite }) => {
  return (
    <div className="favorite-card">
      <img src={favorite.url} alt="" />
      <div className="favorite-rating-container"><Rating name="read-only" value={favorite.rating} precision={0.25} readOnly />
        <div className="favorite-rating">{favorite.rating}</div>
      </div>
      <h2 className="related-name">{favorite.productName}</h2>
      <h4 className="related-category-styles">
        {favorite.category}
        <br></br>
      </h4>
    </div>
  )
}

export default FavoriteListCard;