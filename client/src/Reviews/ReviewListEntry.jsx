import React, { useState } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';
import ReviewInteraction from './ReviewInteraction.jsx';

const ReviewListEntry = ({ review }) => {

  let [showMore, setShowMore] = useState(false);
  let [open, setOpen] = useState(false);

  let handleChange = () => {
    setOpen(!open)
  }


  return (

    <div className="review-tile">
      <div className="review-details">{review.reviewer_name} | {new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
        day: '2-digit'
      }).format(parseInt(review.date))}
      </div>

      <div className="review-summary">{review.summary.substring(0, 60)}</div>

      <div className="review-body">
        {showMore ? review.body : review.body.substring(0,250)}

        {review.body.length > 250 &&
          <a href="#" onClick={() =>
            {setShowMore(!showMore)}}>{showMore ? '...Show less' : '...Show more'}
          </a>
        }

        <div className="review-thumbnail" onClick={handleChange}>
          {review.photos.length > 0 && review.photos.map(photo => {
            return <>
            <img src={`${photo.url}`} width="60" height="60"/>
              <Modal
              open={open}
              onClose={handleChange}
              // aria-labelledby="modal-modal-title"
              // aria-describedby="modal-modal-description"
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
            <span>I recommend this item</span>
            </>}
        </div>
        <ReviewInteraction review={review}/>

      </div>


    </div>
  )
}

export default ReviewListEntry;