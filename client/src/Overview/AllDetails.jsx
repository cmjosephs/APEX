import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Selectors from './Selectors.jsx';
import Info from './Info.jsx';

var AllDetails = ({ productId, allStyles, reviewMetaData, handleStyleChange }) => {
  const [productDetals, setProductDetails] = useState({});

  function getProductDetails() {
    axios.get(`/api/products/${productId}`)
    .then(({ data }) => setProductDetails(data))
    .catch(err => consoel.error(err));
  }
  return (
    <div className="all-details">

    </div>
  )
}

export default AllDetails;