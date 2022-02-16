import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';
import ReviewInteraction from './ReviewInteraction.jsx';
import Rating from '@mui/material/Rating';
const ReviewListEntry = ({ review, getNewReviews }) => {

  let [showMore, setShowMore] = useState(false);
  let [open, setOpen] = useState(false);

  let handleChange = () => {
    setOpen(!open)
  }


  return (

    <div className="review-tile">

      <div className="review-details">
        <span className="review-rating">
        <Rating name="read-only" value={review.rating} readOnly />
        </span>
        <span className="review-creator-date">
          {review.reviewer_name} | {new Intl.DateTimeFormat('en-US', {
          month: 'long',
          year: 'numeric',
          day: '2-digit'
        }).format(parseInt(review.date))}
        </span>
      </div>

      <div className="review-summary">
        {review.summary.substring(0, 60)}
      </div>

      <div className="review-body">
        {showMore ? review.body : review.body.substring(0,250)}

        {review.body.length > 250 &&
          <a href="#" onClick={() =>
            {setShowMore(!showMore)}}>{showMore ? '...Show less' : '...Show more'}
          </a>
        }

        <div className="review-thumbnail">
          {review.photos.length > 0 && review.photos.map(photo => {
            return <>
            <img src={`${photo.url}`} style={{ width: 60, height: 60, marginRight: 20}} onClick={handleChange}/>
              <Modal
              open={open}
              onClose={handleChange}
              >
                <img id="review-thumbnail-modal" src={`${photo.url}`}/>
              </Modal>
            </>
          })}
        </div>

        <div className="review-recommended">
            {review.recommend &&
            <>
            <CheckIcon/>
            <span role="recommended">I recommend this item</span>
            </>}
        </div>

        <ReviewInteraction review={review} getNewReviews={getNewReviews}/>

        <div className="seller-response">
          {review.response !== null &&
          <>
          <span>{review.response}</span>
          </>}
        </div>

      </div>


    </div>
  )
}

export default ReviewListEntry;