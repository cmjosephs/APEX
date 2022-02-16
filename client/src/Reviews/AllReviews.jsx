import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';


const AllReviews = ({ reviews, getNewReviews }) => {

  return (
  <div className="review-list">
    {reviews.map(review => {
      return <ReviewListEntry review={review} getNewReviews={getNewReviews}/>
    })}
  </div>
  )


}

export default AllReviews;