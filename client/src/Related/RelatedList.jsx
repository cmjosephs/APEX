import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import RelatedListCard from './RelatedListCard.jsx';
import FavoriteListCard from './FavoriteListCard.jsx';
import { AppContext } from '../App.jsx';

const RelatedList = () => {
  const { productId } = useContext(AppContext);
  const [relatedArr, updateRelated] = useState([]);
  const  [currentProductId, updateCurrent] =  useState(productId);

  function getRelatedProducts(product_id) {
    axios.get(`/api/products/${product_id}/related`)
      .then(({ data }) => updateRelated(data))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getRelatedProducts(productId);
  }, [productId]);

  return (
    <div>
      <h3>Related Products</h3>
      <div style={{ display: "flex" }}>
        {relatedArr.map((relatedId, index) => (
          <div style={{ display: "flex", overflow: "hidden", margin: "5px" }}>
            <RelatedListCard relatedId={relatedId} currentProductId={currentProductId} key={`${index}-${relatedId}`}/>
          </div>
        ))}
      </div>
      <h3>Favorite Products</h3>
      <FavoriteListCard />
    </div>

  )
}

export default RelatedList;