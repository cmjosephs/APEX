import React, { useState, useEffect } from 'react';
import AvgRatingReview from './AvgRatingReview.jsx';
import ReviewListEntry from './ReviewListEntry.jsx';

const ReviewList = () => {
  let [thingy, setThingy] = useState('');

  return (
    <div className="review-container">
      <div className="avg-rating-review">Average Rating & Reviews</div>
      <div className="sort-section">
        <h2>FakeNumber of Reviews,
           <label for ="reviews-sort"> sorted by: </label>
          <select name="reviews-sort" id="reviews-sort">
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
            <option value="relevant">Relevant</option>
          </select>
        </h2>
      </div>
      <div className="review-list">Review List, map here
      </div>
    </div>
  )
}

export default ReviewList;