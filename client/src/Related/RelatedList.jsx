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
  }, [productId]);

  function calcAverageRating(obj) {
    let avgRating = 0;
    let totalRatings = 0;
    for (let key in obj) {
      let quant = parseInt(obj[key]);
      let rating = parseInt(key);
      avgRating += quant * rating;
      totalRatings += quant;
    }
    avgRating = avgRating / totalRatings;
    return Math.ceil(avgRating / 0.25) * 0.25;
  }

  const divRef = React.useRef();

  const scrollProductsLeft = (scrollOffset) => {
    console.log(scrollOffset);
    divRef.current.scrollLeft -= scrollOffset;
  }

  const scrollProductsRight = (scrollOffset) => {
    console.log(scrollOffset);
    divRef.current.scrollLeft += scrollOffset;
  }

  function getProductCardWidth(productCardWidth) {
    setOffset(productCardWidth);
  }

  // useEffect(() => {
  //   setOffset(carouselScrollOffset);
  // }, [carouselScrollOffset])

  return (

    <div className="related-carousel" ref={divRef}>
      {relatedArr.map((relatedId, index) => (
        <RelatedListCard
          relatedId={relatedId}
          currentProductId={currentProductId}
          currentProductDetails={productDetails}
          currentProductImg={currentProductImg}
          getProductCardWidth={getProductCardWidth}
          key={`${index}-${relatedId}`}
        />
      ))}
    </div>
    // <div className="related-wrapper">
    //   <h3 className="related-title">Recommended Products</h3>

    //   <div className="related-carousel" ref={divRef}>
    //     {relatedArr.map((relatedId, index) => (
    //         <RelatedListCard
    //           relatedId={relatedId}
    //           currentProductId={currentProductId}
    //           currentProductDetails={productDetails}
    //           currentProductImg={currentProductImg}
    //           getProductCardWidth={getProductCardWidth}
    //           key={`${index}-${relatedId}`}
    //         />
    //     ))}
    //   </div>

    //   <div className="related-row">
    //     <div className="related-prev">
    //       <ArrowBackIosNewIcon fontsize="large" className="related-scroll-left" onClick={() => scrollProductsLeft(carouselScrollOffset)}/>
    //     </div>
    //     <div className="related-next">
    //       <ArrowForwardIosIcon fontsize="large" className="related-scroll-right" onClick={() => scrollProductsRight(carouselScrollOffset)}/>
    //     </div>
    //   </div>

    //   <br></br>
    //   <br></br>
    // </div>
  )
}

export default RelatedList;

{/* <div className="related-wrapper">
<h3 className="related-title">Recommended Products</h3>

<div className="related-carousel" ref={divRef}>
  {relatedArr.map((relatedId, index) => (
      <RelatedListCard
        relatedId={relatedId}
        currentProductId={currentProductId}
        currentProductDetails={productDetails}
        currentProductImg={currentProductImg}
        getProductCardWidth={getProductCardWidth}
        key={`${index}-${relatedId}`}
      />
  ))}
</div>

<div className="related-row">
  <div className="related-prev">
    <ArrowBackIosNewIcon fontsize="large" className="related-scroll-left" onClick={() => scrollProductsLeft(carouselScrollOffset)}/>
  </div>
  <div className="related-next">
    <ArrowForwardIosIcon fontsize="large" className="related-scroll-right" onClick={() => scrollProductsRight(carouselScrollOffset)}/>
  </div>
</div>

<br></br>
<br></br>
</div> */}