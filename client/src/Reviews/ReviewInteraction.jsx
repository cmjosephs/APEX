import React, { useContext } from 'react';
import axios from 'axios';
import { ProductContext } from './ReviewList.jsx';

const ReviewInteraction = ({ review }) => {
  let currentProduct = useContext(ProductContext); //   CHECK IF CORRECT

  let addHelpful = () => {
    axios.put(`api/products/${currentProduct}/reviews/${review.review_id}/helpful`)
  }
  return (
    <div className="review-helpful">
      <span>Helpful?</span>
      <span><a href="#">Yes</a>{review.helpfulness}</span>
    </div>
  )
}

export default ReviewInteraction;