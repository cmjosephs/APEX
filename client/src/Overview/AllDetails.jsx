import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Selectors from './Selectors.jsx';
import Info from './Info.jsx';

var AllDetails = ({ productId, allStyles, currentStyle, reviewMetaData, handleStyleChange }) => {
  const [productDetails, setProductDetails] = useState({});

  function getProductDetails(id) {
    axios.get(`/api/products/${id}`)
    .then(({ data }) => setProductDetails(data))
    .catch(err => consoel.error(err));
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
        <h3 className="price">${currentStyle.sale_price ? currentStyle.sale_price : currentStyle.original_price}</h3>
        <Selectors />
        <Info />
      </div>
    )
  }

}

export default AllDetails;