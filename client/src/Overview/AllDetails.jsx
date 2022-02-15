import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Selectors from './Selectors.jsx';
import Info from './Info.jsx';

var AllDetails = ({ productId, allStyles, currentStyle, reviewMetaData, handleStyleChange }) => {
  const [productDetails, setProductDetails] = useState({});
  // const [selectedSku, setSelectedSku] = useState(); // currently selected style and size

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
    return avgRating / totalRatings;
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
        <div className="average-rating">Rating: {calcAverageRating(reviewMetaData.ratings)} see all reviews link</div>
        <h3 className="price">${currentStyle.sale_price ? currentStyle.sale_price : currentStyle.original_price}</h3>
        <Selectors
          allStyles={allStyles}
          currentStyle={currentStyle}
          handleStyleChange={handleStyleChange}
        />
        <button>Add to Bag</button>
        <button>Add to your Outfit</button>
        <Info productDetails={productDetails}/>
      </div>
    )
  }

}

export default AllDetails;