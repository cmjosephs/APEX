import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { StyleContext } from './Product.jsx';
import { AppContext } from '../App.jsx';
import Selectors from './Selectors.jsx';
import Info from './Info.jsx';

var AllDetails = () => {
  const { currentStyle } = useContext(StyleContext);
  const { productId, reviewMetaData, productDetails } = useContext(AppContext);
  // const [productDetails, setProductDetails] = useState({});

  // function getProductDetails(id) {
  //   axios.get(`/api/products/${id}`)
  //   .then(({ data }) => setProductDetails(data))
  //   .catch(err => consoel.error(err));
  // }

  function calcAverageRating(obj) {
    let avgRating = 0;
    let totalRatings = 0;
    for (let key in obj) {
      let quant = parseInt(obj[key]);
      let rating = parseInt(key);
      avgRating += quant * rating;
      totalRatings += quant;
    }
    avgRating = avgRating / totalRatings;
    // return Math.ceil(avgRating / 0.25) * 0.25;
    return avgRating
  }

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
          <Rating
            name="title-rating-read"
            value={calcAverageRating(reviewMetaData.ratings)}
            precision={0.25}
            sx={{color: "#757575"}}
            readOnly
          />
          <p className="same-page-review-link">See all reviews ADD HREF LATER</p>
          {/* Rating: {calcAverageRating(reviewMetaData.ratings)} see all reviews link */}
        </div> {/* hyperlink to reviews */}
        <h3
          className="price"
          style={{textDecoration: sale_price ? "line-through" : ""}}>
            ${original_price}
        </h3>
        {renderSalePrice(sale_price, original_price)}
        <Selectors />
        <br></br>
        <Info productDetails={productDetails}/>
      </div>
    )
  }

}

export default AllDetails;