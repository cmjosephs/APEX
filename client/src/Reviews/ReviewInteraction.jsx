import React from 'react';
import axios from 'axios';

const ReviewInteraction = ({ review }) => {

  let addHelpful = () => {
    axios.put(`api/products/${review.product}/reviews/${review.review_id}/helpful`)
  }
  return (
    <div className="review-helpful">
      <span>Helpful?</span>
      <span><a href="#">Yes</a>{review.helpfulness}</span>
    </div>
  )
}

export default ReviewInteraction;