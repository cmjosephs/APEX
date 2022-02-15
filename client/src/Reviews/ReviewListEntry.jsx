import React, { useState } from 'react';
import axios from 'axios';

const ReviewListEntry = ({ review }) => {
  
  let [showMore, setShowMore] = useState(false);


  return (


    <div className="review-tile">
      <div className="review-details">{review.reviewer_name} | {new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
        day: '2-digit'
      }).format(parseInt(review.date))}</div>
      <div className="review-summary">{review.summary.substring(0, 60)}</div>
      <div className="review-body">
        {showMore ? review.body : review.body.substring(0,250) }

        {review.body.length > 250 &&
          <a href="#" onClick={() => {setShowMore(!showMore)}}>{showMore ? '...Show less' : '...Show more'}</a>
        }

        </div>


    </div>
  )
}

export default ReviewListEntry;