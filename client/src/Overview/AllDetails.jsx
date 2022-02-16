import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StyleContext } from './Product.jsx';
import Selectors from './Selectors.jsx';
import Info from './Info.jsx';

var AllDetails = ({ productId, reviewMetaData }) => {
  const { currentStyle } = useContext(StyleContext);
  const [productDetails, setProductDetails] = useState({});

  function getProductDetails(id) {
    axios.get(`/api/products/${id}`)
    .then(({ data }) => setProductDetails(data))
    .catch(err => consoel.error(err));
  }

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
    return Math.ceil(avgRating / 0.25) * 0.25;
  }

  useEffect(() => {
    getProductDetails(productId);
  }, [])


  if (!Object.keys(productDetails).length) {
    return <h3>Loading...</h3>
  } else {
    return (
      <div className="all-details">
        <h2 className="product-name">{productDetails.name}</h2>
        <h3 className="product-category">{productDetails.category}</h3>
        <div className="average-rating">Rating: {calcAverageRating(reviewMetaData.ratings)} see all reviews link</div> {/* hyperlink to reviews */}
        <h3
          className="price"
          style={{textDecoration: currentStyle.sale_price ? "line-through" : ""}}>
            ${currentStyle.original_price}
        </h3>
        {currentStyle.sale_price && <h3>${currentStyle.sale_price}</h3>}
        <Selectors />
        <Info productDetails={productDetails}/>
      </div>
    )
  }

}

export default AllDetails;