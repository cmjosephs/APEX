import React, { useState, useEffect } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

var ComparisonModal = ({  relatedProduct, currentProduct, relatedImg, currentProductImg }) => {
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
      <img src={relatedImg.thumbnail_url}/>
    </div>

    // <div>
    //   <h5 style={{ textAlign: "center" }}>Compare Product</h5>
    //   <div className="comparison-container" style={{ display: "flex", flexDirection: "row", width: "300px", height: "300" }}>
    //     <img src={currentProductImg.thumbnail_url} style={{ objectFit: "contain" }}/>
    //     <table style={{ backgroundColor: "white" }}>
    //       <thead>
    //         <tr>
    //           <td>{currentProduct.name}</td>
    //           <td>{relatedProduct.name}</td>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <td>
    //           {currentArray.map((feature, index) => {
    //             return (
    //               <tr key={index}>
    //                 <td>{feature}</td>
    //               </tr>
    //             );
    //           })}
    //         </td>
    //         <td>
    //           {relatedArray.map((feature, index) => {
    //             return (
    //               <tr key={index}>
    //                 <td>{feature}</td>
    //               </tr>
    //             )
    //           })}
    //         </td>
    //       </tbody>
    //     </table>
    //     <img src={relatedImg.thumbnail_url} style={{ objectFit: "contain" }}/>
    //   </div>
    // </div>
  )
}

export default ComparisonModal;