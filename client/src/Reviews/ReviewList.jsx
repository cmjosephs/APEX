import React, { useState, useEffect } from 'react';
import AvgRatingReview from './AvgRatingReview.jsx';
import ReviewListEntry from './ReviewListEntry.jsx';
import AllReviews from './AllReviews.jsx';
// import ReviewForm from './ReviewForm.jsx';
import axios from 'axios';
// import { FixedSizeList } from 'react-window';

const ReviewList = () => {
  let [reviews, setReviews] = useState([]);
  let [product, setProduct] = useState('42366');
  let [count, setCount] = useState(2);
  let [sort, setSort] = useState('newest');
  let [enoughReviews, setEnoughReviews] = useState(true);
  // let [reviewForm, setReviewForm] = useState(false);

  useEffect(() => {
    getReviews();
  }, [product, count, sort]);

  const getReviews = () => {
    axios.get(`api/products/${product}/reviews`,
    {
      params: {
        count: 200,
        sort: sort
      }
    })
    .then(results => {
      if (results.data.results.length <= 2) {
        setEnoughReviews(!enoughReviews)
      }
      setReviews(results.data.results.splice(0, count));
    }).catch(err => {
      console.log('error getting reviews')
    })
  }

  const getMoreReviews = () => {
    setCount(count += 2)
    // only want to show 20 reviews at most but this can change later
    if (count >= 20) {
      setEnoughReviews(!enoughReviews)
    }
  }

  const changeSort = (e) => {
    setSort(e.target.value)
  }

  const showReviewForm = () => {
    setReviewForm(!reviewForm)
  }

  return (
    <div className="review-container">
      <div className="avg-rating-review">Average Rating & Reviews</div>
      <div className="sort-section">
        <h2>20 Reviews,
           <label for ="reviews-sort"> sorted by: </label>
          <select name="reviews-sort" id="reviews-sort" onChange={changeSort}>
            <option value="newest">Newest</option>
            <option value="helpful">Helpful</option>
            <option value="relevant">Relevant</option>
          </select>
        </h2>
      </div>

  <AllReviews reviews={reviews}/>

      {/* <div className="review-list">Review List
      {reviews.map(
        review => {
        return <ReviewListEntry review={review}/>
      })}
      </div> */}
      {enoughReviews &&
      <div className="more-reviews">
        <button onClick={getMoreReviews}>MORE REVIEWS</button>
      </div>
      }
      {/* <button onClick={setReviewForm}>ADD A REVIEW</button> */}
      {/* {reviewForm && <ReviewForm reviewForm={reviewForm}/>} */}
    </div>
  )
}

export default ReviewList;