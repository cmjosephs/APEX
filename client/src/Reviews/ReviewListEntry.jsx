import React from 'react';

const ReviewListEntry = ({ review }) => {

  return (
    <div className="review-tile">
      <div className="review-details">{review.reviewer_name} | {review.date.substring(0, 10)}</div>
      <div className="review-summary">{review.summary}</div>
      <div className="review-body">{review.body}</div>
    </div>
  )
}

export default ReviewListEntry;

// if review body contains more than 250 characters, have a see more link that displays the rest of the review body