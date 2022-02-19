import React, { useState, useEffect, useContext } from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import Features from './Features.jsx';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import { Link } from 'react-router-dom';
import { AppContext } from '../App.jsx';
import bootstrap from 'bootstrap'

const RelatedListCard = ({ relatedId, currentProductDetails, currentProductImg }) => {
  const { setProductId } = useContext(AppContext);
  const [relatedProduct, updateRelatedProduct] = useState({ info: {} });
  const [relatedImgUrl, updateRelatedImgUrl] = useState({ img: {} });
  const [salePrice, updateSalePrice] = useState({ sale: {} });
  const [rating, updateRating] = useState({ rating: {} });
  const [showModal, setShowModal] = useState(false);

  function getRelatedProductsInfo(relatedId) {
    axios.get(`/api/products/${relatedId}`)
      .then(({ data }) => updateRelatedProduct(data))
      .then(() => {
        axios.get(`/api/products/${relatedId}/styles`)
          .then(({ data }) => {
            updateRelatedImgUrl(data.results[0].photos[0])
            // updateRelatedImgUrl(data.results)
            updateSalePrice(data.results[0])
          })
          .catch(err => console.error(err));
      })
      .then(() => {
        axios.get(`/api/products/${relatedId}/reviews/meta`)
          .then(({ data }) => updateRating(data.ratings))
          .catch(err => console.log('FUCK MEEEEEEEEE'));
      })
      .catch(err => console.log('WTF IS GOING ON'));
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
        <div className="related-price" style={{ textAlign: "center" }}>{relatedProduct.default_price}</div>
      )
    } else {
      return (
        <>
          <div className="related-price" style={{ textDecoration: "line-through", textAlign: "center" }}>{relatedProduct.default_price}</div>
          <div className="sale-price" style={{ textAlign: "center" }}>{salePrice.sale_price}</div>
        </>
      )
    }
  }

  // if (!Object.keys(rating) < 2) {
  //   return (<h1>Loading...</h1>)
  // }

  return (
    <div className="related-product-card-container">
      <div class="related-image-container" style={{ height: "40vh", objectFit: "contain" }}>
        <Link to={`/products/${relatedId}`} >
          <img src={relatedImgUrl.thumbnail_url} class="card-img-top"/>
        </Link>
      </div>
      <div class="related-product-card-body">
        <h4 class="related-product-title">{relatedProduct.name}</h4>
        <h5 class="related-product-category">{relatedProduct.category}</h5>
        <p class="related-product-price">{hasSalePrice()}</p>
      </div>
    </div>
  )
}

export default RelatedListCard;

    {/* // <div className="related-card">
    //   <div className="related-container">
    //     <Link to={`/products/${relatedId}`}>
    //       <img src={relatedImgUrl.thumbnail_url} style={{display: "flex"}}/>
    //     </Link>
    //   </div>
    //   <div className="related-rating"><Rating name="read-only" value={calcAverageRating(rating)} precision={0.25} readOnly />{calcAverageRating(rating)}</div>
    //   <div className="category-name" style={{ textAlign: "center" }}>{relatedProduct.category}</div>
    //   <div className="related-name" style={{ textAlign: "center" }}>{relatedProduct.name}</div>
    //   {hasSalePrice()}
    //   <FontAwesomeIcon icon={faHeart} onClick={handleChange}/>
    //   <Modal open={showModal} onClose={handleChange} style={{ display: "flex", alignItems: "center", justifyContent: "center"}}>
    //     <ComparisonModal
    //       relatedProduct={relatedProduct}
    //       currentProduct={currentProductDetails}
    //       relatedImg={relatedImgUrl}
    //       currentProductImg={currentProductImg}/>
    //   </Modal>
    // </div> */}