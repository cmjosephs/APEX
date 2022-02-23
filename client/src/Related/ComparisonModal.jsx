import React, { useState, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';

var ComparisonModal = ({ relatedProduct, currentProduct, relatedImg, currentProductImg, handleChange }) => {
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

  function hasFeature(obj, array) {
    if (array.includes(obj)) {
      return (
        <CheckIcon />
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
      <img src={currentProductImg.thumbnail_url} />
      <div className="features-container">
        <h3>Product Features</h3>
        <table>
          <th>{currentProduct.name}</th>
          <th></th>
          <th>{relatedProduct.name}</th>
          {Object.keys(featuresObj).map((feature, index) => {
            return (
              <tr>
                <td>{hasFeature(feature, currentArray)}</td>
                <td>{feature}</td>
                <td>{hasFeature(feature, relatedArray)}</td>
              </tr>
            )
          })}
        </table>
      </div>
      <img src={relatedImg} />
    </div>
  )
}

export default ComparisonModal;