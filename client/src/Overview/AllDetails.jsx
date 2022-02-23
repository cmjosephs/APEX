import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AvgRating from '../Shared/AvgRating.jsx';
import { StyleContext } from './Product.jsx';
import { AppContext } from '../App.jsx';
import Selectors from './Selectors.jsx';
import Info from './Info.jsx';

var AllDetails = () => {
  const { currentStyle } = useContext(StyleContext);
  const { productId, reviewMetaData, productDetails } = useContext(AppContext);

  const renderSalePrice = (sale_price, original_price) => {
    if (sale_price) {
      return (
        <div className="sale-price">
          <h3>
            ${sale_price}
          </h3>
          <p>
            {Math.ceil((1-(sale_price/original_price))*100)}% off
          </p>
        </div>
      )
    }
  }

  if (!Object.keys(productDetails).length) {
    return <h3>Loading...</h3>
  } else {
    let original_price = currentStyle.original_price;
    let sale_price = currentStyle.sale_price;
    return (
      <div className="all-details">
        <h1 className="product-name">{productDetails.name}</h1>
        <h2 className="product-category">{productDetails.category}</h2>
        <div className="avg-rating-title">
          <AvgRating metaDataRatings={reviewMetaData.ratings} />
          <a href="#review-container" className="same-page-review-link">See all reviews</a>
        </div>
        <div className="prices">
          <h3
            className="original-price"
            style={{textDecoration: sale_price ? "line-through" : ""}}>
              ${original_price}
          </h3>
          {renderSalePrice(sale_price, original_price)}
        </div>
        <Selectors />
        <br></br>
        <Info productDetails={productDetails}/>
      </div>
    )
  }

}

export default AllDetails;