import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';


const AllReviews = ({ reviews, getNewReviews }) => {

  return (
    <div className="review-list">
      {reviews.map((review, idx) => {
        return (
          <div className="review-list-entry" key={`review-${idx}`}>
            <ReviewListEntry review={review} getNewReviews={getNewReviews} />
          </div>
        )
      })}
    </div>
  )


}

export default AllReviews;