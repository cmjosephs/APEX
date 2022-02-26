import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';
import ReviewInteraction from './ReviewInteraction.jsx';
import Rating from '@mui/material/Rating';

const ReviewListEntry = ({ review, getNewReviews }) => {

  let [showMore, setShowMore] = useState(false);
  let [open, setOpen] = useState(false);
  let [currentPic, setCurrentPic] = useState('');


  let handleChange = (selectedPic) => {
    setOpen(!open);
    setCurrentPic(selectedPic)
  }

  let openThumbnailModal = () => {
    return <Modal
      open={open}
      onClose={handleChange}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <img id="review-thumbnail-modal" src={currentPic} alt="review-thumbnail" />
    </Modal>

  }

  const showReviewThumbnails = (photos) => {
    return photos.map((photo, idx) => {
      return <img
        key={`review-thumbnail-${idx}`}
        alt={`review-thumbnail-${photo.url}`}
        src={`${photo.url}`}
        style={{ width: 60, height: 60, marginRight: 20 }}
        onClick={(e) => handleChange(e.target.src)} />
    })
  }

  const evalStarCount = (rating) => {
    const stars = [];
    while (stars.length < 5) {
      if (rating <= 0) {
        stars.push(0);
      } else if (rating >= 1) {
        stars.push(1);
        rating--;
      } else {
        stars.push(rating);
        rating -= rating;
      }
    }
    return stars;
  }

  const renderStars = (starCountArr) => {
    return starCountArr.map((star, index) => {
      let fill;
      if (star === 1) fill = 'full';
      if (star === 0.75) fill = 'three-quarter';
      if (star === 0.5) fill = 'half';
      if (star === 0.25) fill = 'quarter';
      if (star === 0) fill = 'empty';
      return <img
        src={`/images/${fill}-star.svg`}
        key={`${index}-${fill}`}
        alt="star"
        className="rating-star">
      </img>
    })
  }


  return (
    <div className="review-tile">

      <div className="review-details">
        <span className="review-tile-stars">
          <div className="avg-rating">
            {renderStars(evalStarCount(review.rating))}
          </div>
        </span>
        <span role="review-date" className="review-creator-date">
          {review.reviewer_name} | {new Intl.DateTimeFormat('en-US', {
            month: 'long',
            year: 'numeric',
            day: '2-digit'
          }).format(new Date(review.date))}
        </span>
      </div>

      <h4 className="review-summary" role="review-summary">
        {review.summary.substring(0, 60)}
      </h4>

      <div className="review-body">
        {showMore ? review.body : review.body.substring(0, 250)}

        {review.body.length > 250 &&
          <span href="#" className="review-interaction" onClick={() => { setShowMore(!showMore) }}>{showMore ? '...Show less' : '...Show more'}
          </span>}

        <div className="review-thumbnails">
          {showReviewThumbnails(review.photos)}
          {openThumbnailModal()}
        </div>

        <div role="recommended" className="review-recommended">
          {review.recommend &&
            <>
              <CheckIcon />
              <span role="recommended">I recommend this item</span>
            </>}
        </div>

        <ReviewInteraction review={review} getNewReviews={getNewReviews} />

        <div className="seller-response">
          {review.response !== null &&
            <>
              <span>Seller response: {review.response}</span>
            </>}
        </div>

      </div>


    </div>
  )
}

export default ReviewListEntry;