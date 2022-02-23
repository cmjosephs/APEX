import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AppContext } from '../App.jsx';
import AvgRating from '../Shared/AvgRating.jsx';

const FavoriteListCard = ({ favorite, delFavorites }) => {
  const { reviewMetaData } = useContext(AppContext);

  return (
    <div className="favorite-card">
      <img src={favorite.url} alt="" className="favorite-product-img"/>
      <div className="related-avg-rating-title">
        <AvgRating metaDataRatings={reviewMetaData.ratings} />
      </div>
      <h2 className="related-name">{favorite.productName}</h2>
      <h4 className="related-category-styles">
        {favorite.category}
        <br></br>
      </h4>
      <div className="favorite-price">${favorite.price}</div>
      <FavoriteBorderIcon className="remove-from-favorites" onClick={() => delFavorites(favorite.productID)}/>
    </div>
  )
}

export default FavoriteListCard;