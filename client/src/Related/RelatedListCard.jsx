import React, { useState, useEffect, useContext, useRef } from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import Features from './Features.jsx';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import { AppContext } from '../App.jsx';

const RelatedListCard = ({ relatedId, currentProductDetails, currentProductImg, getProductCardWidth }) => {
  const { setProductId } = useContext(AppContext);
  const [relatedProduct, updateRelatedProduct] = useState({ info: {} });
  const [relatedImgUrl, updateRelatedImgUrl] = useState({ img: {} });
  const [salePrice, updateSalePrice] = useState({ sale: {} });
  // const [relatedStyles, updateRelatedStyles] = useState({ info: {} });
  const [rating, updateRating] = useState({ rating: {} });
  const [numberOfStyles, updateNumberOfStyles] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [cardOffset, setCardOffset] = useState(0);

  function getRelatedProductsInfo(relatedId) {
    axios.get(`/api/products/${relatedId}`)
      .then(({ data }) => updateRelatedProduct(data))
      .then(() => {
        axios.get(`/api/products/${relatedId}/styles`)
          .then(({ data }) => {
            // updateRelatedImgUrl(data.results[0].photos[0])
            // // updateRelatedImgUrl(data.results)
            // updateSalePrice(data.results[0])
            let defaultStyle = data.results[0];
            for (let i = 1; i < data.results.length; i++) {
              if (data.results[i]['default?'] === true) {
                defaultStyle = data.results[i]
              }
            }
            updateRelatedImgUrl(defaultStyle.photos[0].thumbnail_url)
            updateSalePrice(defaultStyle)
            updateNumberOfStyles(data.results.length)
            // console.log(defaultStyle.photos[0].thumbnail_url)
          })
          .catch(err => console.error(err));
      })
      .then(() => {
        axios.get(`/api/products/${relatedId}/reviews/meta`)
          .then(({ data }) => updateRating(data.ratings))
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

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

  useEffect(() => {
    getRelatedProductsInfo(relatedId)
  }, [])

  const handleChange = () => {
    setShowModal(!showModal)
  }

  function hasSalePrice() {
    if (salePrice.sale_price === null) {
      return (
        <>
          <div className="related-price">{salePrice.original_price}</div>
        </>
      )
    } else {
      return (
        <>
          <div className="related-price" style={{ textDecoration: "line-through", fontWeight: '100' }}>{salePrice.original_price}</div>
          <div className="sale-price" style={{color: 'RGBA(255,0,0,0.8)'}}>{salePrice.sale_price}</div>
        </>
      )
    }
  }

  const cardRef = React.useRef();

  useEffect(() => {
    setCardOffset(cardRef.current.offsetWidth)
    getProductCardWidth(cardOffset);
  }, [cardOffset])

  return (
    <div className="related-card" ref={cardRef}>
      <Link to={`/products/${relatedId}/${salePrice.style_id}`}>
        <img src={relatedImgUrl} alt=""/>
      </Link>
      <div className="related-rating-container"><Rating name="read-only" value={calcAverageRating(rating)} precision={0.25} readOnly />
        <div className="related-rating">{calcAverageRating(rating)}</div>
        </div>
      <h2 className="related-name">{relatedProduct.name}</h2>
      <h4 className="related-category-styles">
        {relatedProduct.category}
        <br></br>
        {numberOfStyles} Styles
        </h4>
      {hasSalePrice()}
      <StarBorderIcon className="related-comparison-open" onClick={handleChange}/>
      <Modal open={showModal} onClose={handleChange} className="comparison-modal">
        <ComparisonModal
          relatedProduct={relatedProduct}
          currentProduct={currentProductDetails}
          relatedImg={relatedImgUrl}
          currentProductImg={currentProductImg}
          handleChange={handleChange}/>
      </Modal>
    </div>
  )
}

export default RelatedListCard;


