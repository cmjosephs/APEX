import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import RelatedListCard from './RelatedListCard.jsx';
import FavoriteListCard from './FavoriteListCard.jsx';
import { AppContext } from '../App.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const RelatedList = () => {
  const { productId, productDetails } = useContext(AppContext);
  const [relatedArr, updateRelated] = useState([]);
  const [currentProductId, updateCurrentId] =  useState(productId);
  const [currentProductImg, updateCurrentProductImg] = useState({ img: {} })

  function getRelatedProducts(product_id) {
    axios.get(`/api/products/${product_id}/related`)
      .then(({ data }) => updateRelated(data))
      .catch(err => console.error(err));
  }

  function getCurrentProductImg(product_id) {
    axios.get(`api/products/${product_id}/styles`)
      .then(({ data }) => updateCurrentProductImg(data.results[0].photos[0]))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getRelatedProducts(productId);
    getCurrentProductImg(productId);
  }, [productId]);

  const divRef = React.useRef();

  const scrollProducts = (scrollOffset) => {
    divRef.current.scrollLeft += scrollOffset;
  }

  return (
    <div className="related-container" style={{ width: "1240px"}}>
      <h3 style={{ textAlign: "center" }}>Recommended Products</h3>
      <div>
        <button className="scroll-right" onClick={() => scrollProducts(310)} style={{ float: "right" }}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <button className="scroll-left" onClick={() => scrollProducts(-310)} style={{ float: "right" }}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </div>
      <br></br>
      <br></br>
      <div className="related-slider" ref={divRef} style={{ display: "flex", overflow: "hidden" }}>
        {relatedArr.map((relatedId, index) => (
          <div style={{ display: "flex", margin: "5px" }}>
            <RelatedListCard
              relatedId={relatedId}
              currentProductId={currentProductId}
              key={`${index}-${relatedId}`}
              currentProductDetails={productDetails}
              currentProductImg={currentProductImg}/>
          </div>
        ))}
      </div>
      <h3 style={{ textAlign: "center" }}>Favorite Products</h3>
      <button style={{ display: "flex", width: "300px", height: "375px" }}>Add to Favorites +</button>
      <FavoriteListCard currentProductId={currentProductId} currentProductDetails={productDetails}/>
    </div>

  )
}

export default RelatedList;

