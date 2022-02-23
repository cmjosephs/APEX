import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import RelatedListCard from './RelatedListCard.jsx';
import FavoriteList from './FavoriteList.jsx';
import { AppContext } from '../App.jsx';
import Divider from '@mui/material/Divider';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const RelatedList = () => {
  const { productId, productDetails, reviewMetaData } = useContext(AppContext);
  const [relatedArr, updateRelated] = useState([]);
  const [currentProductId, updateCurrentId] = useState(productId);
  const [currentProductImg, updateCurrentProductImg] = useState({ img: {} })
  const [carouselScrollOffset, setOffset] = useState(250);
  const [currentProductRating, setRating] = useState();
  const [resetCarousel, setCarousel] = useState(0);

  function getRelatedProducts(product_id) {
    axios.get(`/api/products/${product_id}/related`)
      .then(({ data }) => updateRelated(data))
      .catch(err => console.error(err));
  }

  function getCurrentProductImg(product_id) {
    axios.get(`/api/products/${product_id}/styles`)
      .then(({ data }) => updateCurrentProductImg(data.results[0].photos[0]))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getRelatedProducts(productId);
    getCurrentProductImg(productId);
    calcAverageRating(reviewMetaData.ratings);
  }, [productId]);

  function calcAverageRating (obj) {
    let avgRating = 0;
    let totalRatings = 0;
    for (let key in obj) {
      let quant = parseInt(obj[key]);
      let rating = parseInt(key);
      avgRating += quant * rating;
      totalRatings += quant;
    }
    avgRating = avgRating / totalRatings;
    setRating(Math.ceil(avgRating / 0.25) * 0.25);
  }

  const relatedRef = React.useRef();

  const scrollProductsLeft = (scrollOffset) => {
    relatedRef.current.scrollLeft -= 450;
  }

  const scrollProductsRight = (scrollOffset) => {
    relatedRef.current.scrollLeft += 450;
  }

  return (
    <div>
      <div className="related-wrapper">
        <h3 className="related-title">Recommended Products</h3>

        <div className="related-row">
          <div className="related-next">
            <ArrowForwardIosIcon fontSize="large" className="related-scroll-right" onClick={() => scrollProductsRight(carouselScrollOffset)}/>
          </div>
          <div className="related-prev">
            <ArrowBackIosNewIcon fontSize="large" className="related-scroll-left" onClick={() => scrollProductsLeft(carouselScrollOffset)}/>
          </div>
        </div>

        <div className="related-carousel" ref={relatedRef}>
          {relatedArr.map((relatedId, index) => (
              <RelatedListCard
                relatedId={relatedId}
                productId={productId}
                currentProductDetails={productDetails}
                currentProductImg={currentProductImg}
                key={`${index}-${relatedId}`}/>
          ))}
        </div>

        <br></br>
        <br></br>
      </div>

      <div className="favorites-wrapper">
        <FavoriteList
          currentProductId={productId}
          currentProductDetails={productDetails}
          currentProductImg={currentProductImg}
          currentProductRating={currentProductRating}/>
      </div>

    </div>
  )
}

export default RelatedList;