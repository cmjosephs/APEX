import React, { useState, useEffect } from 'react';
import AvgRatingReview from './AvgRatingReview.jsx';
import ReviewListEntry from './ReviewListEntry.jsx';
import axios from 'axios';

const ReviewList = () => {
  let [reviews, setReviews] = useState([]);
  let [product, setProduct] = useState('42366');

  // similar to componentDidMount
  // when "product" changes, GET reviews for that "product"
  useEffect(() => {
    getReviews();
  }, [product]);


  const getReviews = () => {
    axios.get(`api/products/${product}/reviews`)
    .then(results => {
      setReviews(results.data.results.slice(0,2));
      console.log(results.data);
    }).catch(err => {
      console.log('error getting reviews')
    })
  }

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
      {reviews.map(review => {
        return <ReviewListEntry review={review}/>
      })}
      </div>
    </div>
  )
}

export default ReviewList;