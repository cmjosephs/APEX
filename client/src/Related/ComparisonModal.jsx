import React, { useState, useEffect } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

var ComparisonModal = ({  relatedProduct, currentProduct, relatedImg, currentProductImg, handleChange }) => {
  var currentArray = [];
  var relatedArray = [];
  var featuresObj = {};

  if (currentProduct.features !== undefined) {
    for (let i = 0; i < currentProduct.features.length; i++) {
      currentArray.push(currentProduct.features[i].feature);
    }
  }

  if (relatedProduct.features !== undefined) {
    for (let i = 0; i < relatedProduct.features.length; i++) {
      relatedArray.push(relatedProduct.features[i].feature);
    }
  }

  let featuresArray = currentArray.concat(relatedArray);
  featuresArray.forEach((feature, index) => {
    if (!featuresObj[feature]) {
      featuresObj[feature] = index;
    }
  })

  function hasFeature (obj, array) {
    if (array.includes(obj)) {
      return (
        <CheckCircleOutlineIcon />
      )
    } else {
      return (
        <></>
      )
    }
  }

  return (
    <div className="features-modal">
      <button className="exit-comparison-modal" onClick={handleChange}>X</button>
      <img src={currentProductImg.thumbnail_url}/>
      <div className="features-container">
        {Object.keys(featuresObj).map((feature, index) => {
          return (
            <div key={`${feature}-${index}`}>
              {hasFeature(feature, currentArray)}
              {feature}
              {hasFeature(feature, relatedArray)}
              <br></br>
            </div>
          )
        })}
      </div>
      <img src={relatedImg}/>
    </div>

  )
}

export default ComparisonModal;