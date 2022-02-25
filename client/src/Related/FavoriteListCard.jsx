import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { AppContext } from '../App.jsx';
import AvgRating from '../Shared/AvgRating.jsx';
import { Link } from 'react-router-dom';

const FavoriteListCard = ({ favorite, delFavorites }) => {
  const { productId, reviewMetaData } = useContext(AppContext);

  function hasSalePrice() {
    if (favorite.salePrice === null) {
      return (
          <div className="favorite-price">${favorite.price}</div>
      )
    } else {
      return (
        <>
          <div className="favorite-price" style={{ textDecoration: "line-through", fontWeight: '100' }}>${favorite.price}</div>
          <div className="favorite-sale-price" style={{color: 'RGBA(255,0,0,0.8)'}}>${favorite.salePrice}</div>
        </>
      )
    }
  }

  function notCurrentProduct() {
    if (favorite.productID !== productId) {
      return (
        <Link to={`/products/${favorite.productID}/${favorite.style}`}>
          <img src={favorite.url} alt="" className="favorite-product-img"/>
        </Link>
      )
    } else {
      return (
        <img src={favorite.url} alt="" className="favorite-product-img"/>
      )
    }
  }

  return (
    <div className="favorite-card">
      {notCurrentProduct()}
      <div className="related-avg-rating-title">
        <AvgRating metaDataRatings={reviewMetaData.ratings} />
      </div>
      <h2 className="related-name">{favorite.productName}</h2>
      <h4 className="related-category-styles">
        {favorite.category}
        <br></br>
      </h4>
      {hasSalePrice()}
      <FavoriteBorderIcon className="remove-from-favorites" onClick={() => delFavorites(favorite.productID)} />
    </div>
  )
}

export default FavoriteListCard;