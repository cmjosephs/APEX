import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import Photos from './Photos.jsx';
import AllDetails from './AllDetails.jsx';

const Product = ({ productId, reviewMetaData }) => {
  const [allStyles, setAllStyles] = useState({}); // this is an array of objects
  const [currentStyle, setCurrentStyle] = useState({}); // this is an object

  function getStyles(product_id) {
    axios.get(`/api/products/${product_id}/styles`)
    .then(({ data }) => {
      setCurrentStyle(data.results[0]);
      setAllStyles(data);
    })
    .catch((err) => console.error(err));
  }

  function handleStyleChange(id) {
    // setCurrentStyle()
    // go through all styles and match up the id and then set the current style
  }

  useEffect(() => {
    getStyles(productId);
  }, []);

  // console.log(currentStyle);
  if (!Object.keys(currentStyle).length) {
    return <h3>Loading...</h3>
  } else {
    return (
      <div id="product-overview">
        <Photos photos={currentStyle.photos}/>
        <AllDetails reviewMetaData={reviewMetaData} handleStyleChange={handleStyleChange}/>
      </div>
    )
  }

}

export default Product;