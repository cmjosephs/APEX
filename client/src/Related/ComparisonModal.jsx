import React, { useState, useEffect } from 'react';

var ComparisonModal = ({  relatedProduct, currentProduct, relatedImg, currentProductImg }) => {
  var currentArray = [];
  var relatedArray = [];

  if (currentProduct.features !== undefined) {
    for (let i = 0; i < currentProduct.features.length; i++) {
      currentArray.push(currentProduct.features[i].value);
    }
  }

  if (relatedProduct.features !== undefined) {
    for (let i = 0; i < relatedProduct.features.length; i++) {
      relatedArray.push(relatedProduct.features[i].value);
    }
  }

  return (
    <div>
      <h5 style={{ textAlign: "center" }}>Compare Product</h5>
      <div className="comparison-container" style={{ display: "flex", flexDirection: "row", width: "300px", height: "300" }}>
        <img src={currentProductImg.thumbnail_url} style={{ objectFit: "contain" }}/>
        <table style={{ backgroundColor: "white" }}>
          <thead>
            <tr>
              <td>{currentProduct.name}</td>
              <td>{relatedProduct.name}</td>
            </tr>
          </thead>
          <tbody>
            <td>
              {currentArray.map((feature, index) => {
                return (
                  <tr key={index}>
                    <td>{feature}</td>
                  </tr>
                );
              })}
            </td>
            <td>
              {relatedArray.map((feature, index) => {
                return (
                  <tr key={index}>
                    <td>{feature}</td>
                  </tr>
                )
              })}
            </td>
          </tbody>
        </table>
        <img src={relatedImg.thumbnail_url} style={{ objectFit: "contain" }}/>
      </div>
    </div>
  )
}

export default ComparisonModal;