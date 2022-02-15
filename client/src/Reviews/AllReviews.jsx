import React from 'react';
import ReviewListEntry from './ReviewListEntry.jsx';

const AllReviews = ({ reviews }) => {
  return (
  <div className="review-list">

  {reviews.map(
    review => {
    return <ReviewListEntry review={review}/>
  })}
  </div>


  )


}

export default AllReviews;