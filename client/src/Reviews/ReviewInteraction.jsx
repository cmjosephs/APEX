import React, { useContext, useState, useEffect, usePrevious } from 'react';
import axios from 'axios';
import { AppContext } from '../App.jsx';


const ReviewInteraction = ({ review, getNewReviews }) => {
  let { productId, reviewMetaData, productDetails } = useContext(AppContext);
  let [markHelpful, setMarkHelpful] = useState(true);
  let [markNotHelpful, setMarkNotHelpful] = useState(true);
  let [notHelpfulCount, setNotHelpfulCount] = useState(0);


  // TODO: re-render reviews after marking helpful

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
    <div className="review-vote">
      <span>Helpful?  </span>
      {markHelpful ?
      <>
      <span className="review-interaction" onClick={addHelpful}>Yes</span>
      <span role="helpful">{"  "}({review.helpfulness}){"  "}</span>
      <span>{"  "}|{"  "}</span>
      </>
      :
      <>
      <span> Yes</span>
      <span role="helpful">{"  "}({review.helpfulness}){"  "}</span>
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