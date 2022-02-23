import React, { useState, useEffect } from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import Features from './Features.jsx';
import axios from 'axios';

const RelatedListCard = ({ relatedId, currentProductId }) => {
  const [currentProduct, updateCurrentProduct] = useState({ info: {} });
  const [relatedProduct, updateRelatedProduct] = useState({ info: {} });
  const [imgUrl, updateImgUrl] = useState({ img: {} });
  const [showModal,  setShowModal] = useState(false);

  function getCurrentProductInfo(currentProductId) {
    axios.get(`/api/products/${currentProductId}`)
    .then(({ data  }) => updateCurrentProduct(data))
    .catch(err => console.error(err));
  }

  function getRelatedProductsInfo(relatedId) {
    axios.get(`/api/products/${relatedId}`)
    .then(({ data }) => updateRelatedProduct(data))
    .catch(err => console.error(err));
  }

  function getProductStyles(relatedId) {
    axios.get(`api/products/${relatedId}/styles`)
    .then(({ data }) => updateImgUrl(data.results[0].photos[0]))
    .catch(err => console.error(err));
  }

  useEffect(() => {
    getCurrentProductInfo(currentProductId)
    getRelatedProductsInfo(relatedId)
    getProductStyles(relatedId)
  },  [])

  return (
    <div>
      <img src={imgUrl.thumbnail_url}/>
      <p className="category-name">{relatedProduct.category}</p>
      <p className="product-name">{relatedProduct.name}</p>
      <p className="related-product-price">{relatedProduct.default_price}</p>
    </div>

  )
}

export default RelatedListCard;