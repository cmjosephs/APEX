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
      sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
    >
      <img id="review-thumbnail-modal" src={currentPic}/>
    </Modal>

  }

  const showReviewThumbnails = (photos) => {
    return photos.map((photo, idx) => {
      return <img
      key={`review-thumbnail-${idx}`}
      src={`${photo.url}`}
      style={{ width: 60, height: 60, marginRight: 20}}
      onClick={(e) => handleChange(e.target.src)}/>
    })
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
        }).format(new Date(review.date))}
        </span>
      </div>

      <h4 className="review-summary" role="review-summary">
        {review.summary.substring(0, 60)}
      </h4>

      <div className="review-body">
        {showMore ? review.body : review.body.substring(0,250)}

        {review.body.length > 250 &&
          <a href="#" className="review-interaction" onClick={() =>
            {setShowMore(!showMore)}}>{showMore ? '...Show less' : '...Show more'}
          </a>
        }
      <div className="review-thumbnails">
        {showReviewThumbnails(review.photos)}
        {openThumbnailModal()}

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
          <span>Seller response: {review.response}</span>
          </>
          }
        </div>

      </div>


    </div>
  )
}

export default ReviewListEntry;