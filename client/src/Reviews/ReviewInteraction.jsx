import React, { useContext, useState, useEffect, usePrevious } from 'react';
import axios from 'axios';
import { AppContext } from '../App.jsx';


const ReviewInteraction = ({ review, getNewReviews }) => {
  let { productId, reviewMetaData, productDetails } = useContext(AppContext);
  let [markHelpful, setMarkHelpful] = useState(true);
  let [markNotHelpful, setMarkNotHelpful] = useState(true);
  let [notHelpfulCount, setNotHelpfulCount] = useState(0);


  let addHelpful = () => {
    if (markHelpful) {
      axios.put(`/api/products/${productId}/reviews/${review.review_id}/helpful`)
        .then(() => getNewReviews())
        .then(setMarkHelpful(false))
        .catch(err => {
          'error marking as helpful'
        })
    }
  }

  let notHelpful = () => {
    setNotHelpfulCount(markNotHelpful++);
    setMarkHelpful(false);
  }


  return (
    <div role="review-vote" className="review-vote">
      <span>Helpful?  </span>
      {markHelpful ?
        <>
          <span role="helpful" className="review-interaction" onClick={addHelpful}>Yes</span>
          <span>{"  "}({review.helpfulness}){"  "}</span>
          <span>{"  "}|{"  "}</span>
        </>
        :
        <>
          <span role="helpful-checked"> Yes</span>
          <span>{"  "}({review.helpfulness}){"  "}</span>
          <span>{"  "}|{"  "}</span>
        </>
      }
      {markHelpful ?
        <>
          <span className="review-interaction" onClick={notHelpful}>No</span>
          <span>{"  "}({notHelpfulCount}){"  "}</span>
        </>
        :
        <>
          <span> No</span>
          <span>{"  "}({notHelpfulCount}){"  "}</span>
        </>
      }
    </div>
  )
}

export default ReviewInteraction;
