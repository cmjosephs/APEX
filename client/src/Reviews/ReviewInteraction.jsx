import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AppContext } from '../App.jsx';


const ReviewInteraction = ({ review, getNewReviews }) => {
  let { productId, reviewMetaData, productDetails } = useContext(AppContext);
  let [markHelpful, setMarkHelpful] = useState(true);
  let [markNotHelpful, setMarkNotHelpful] = useState(true);
  let [notHelpfulCount, setNotHelpfulCount] = useState(0);

  // useEffect(() => {
  //   getNewReviews()
  // }, [markHelpful])

  // in main app, check if filter is on, don't fire getReviews


  let addHelpful = () => {
    axios.put(`api/products/${productId}/reviews/${review.review_id}/helpful`)
    .then(getNewReviews())
    .then(setMarkHelpful(false))
    .catch(err => {
      'error marking as helpful'
    })
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
      <span>   {review.helpfulness}   </span>
      <span><a href="#" className="review-interaction" onClick={addHelpful}>Yes</a>
      <span>   |   </span>
      </span>
      </>
      :
      <>
      <span>   {review.helpfulness}   </span>
      <span> Yes</span>
      <span>    |    </span>
      </>
      }
      {markHelpful ?
      <>
      <span>   {notHelpfulCount}   </span>
      <span><a href="#" className="review-interaction" onClick={notHelpful}>No</a></span>
      </>
      :
      <>
      <span>   {notHelpfulCount}   </span>
      <span> No</span>
      </>
      }
    </div>
  )
}

export default ReviewInteraction;
