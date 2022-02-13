import React from 'react';

const ReviewListEntry = ({ review }) => {

  return (
    <div className="review-body">
      <div className="review-details">{review.reviewer_name} | {review.date.substring(0, 10)}</div>
      <div className="review-title">{review.summary}</div>
    </div>
  )
}

export default ReviewListEntry;