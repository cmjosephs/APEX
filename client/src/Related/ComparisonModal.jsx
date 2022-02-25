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

  // function hasDefaultThumbnail() {
  //   if (getCurrentProductImg.thumbnail_url !== null) {
  //     return (
  //       <img src={currentProductImg.thumbnail_url} />
  //     )
  //   } else {
  //     return (
  //       <img src={'https://netmechanics.ca/wp-content/uploads/2019/04/you-almost-got-me-almost.jpg'} />
  //     )
  //   }
  // }

  return (
    <div className="features-wrapper">
      <div className="features-modal">
      <img src={currentProductImg} />
        <div className="features-container">
          <h3>Product Features</h3>
          <table style={{width: "100%"}}>
            <th style={{width: "30%"}}>{currentProduct.name}</th>
            <th style={{width: "30%"}}></th>
            <th style={{width: "30%"}}>{relatedProduct.name}</th>
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
        <button
          className="exit-comparison-modal"
          onClick={handleChange}
          >X</button>
      </div>
    </div>
  )
}

export default ComparisonModal;