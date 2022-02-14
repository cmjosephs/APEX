import React, { useState, useEffect } from 'react';
import AvgRatingReview from './AvgRatingReview.jsx';
import ReviewListEntry from './ReviewListEntry.jsx';
import axios from 'axios';

const ReviewList = () => {
  let [reviews, setReviews] = useState([]);
  let [product, setProduct] = useState('42366');
  let [count, setCount] = useState(2);
  let [sort, setSort] = useState('newest');
  let [enoughReviews, setEnoughReviews] = useState(true);

  // similar to componentDidMount
  // when "product" changes, GET reviews for that "product"
  // when "count" changes, GET more reviews for that product
  useEffect(() => {
    getReviews();
  }, [product, count, sort]);

  const getReviews = () => {
    axios.get(`api/products/${product}/reviews`,
    {
      params: {
        count: 200,
        sort: `${sort}`
      }
    })
    .then(results => {
      console.log(results.data.results)
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
  }

  const changeSort = (e) => {
    console.log(e.target.value)
    setSort(e.target.value)
  }


  return (
    <div className="review-container">
      <div className="avg-rating-review">Average Rating & Reviews</div>
      <div className="sort-section">
        <h2>FakeNumber of Reviews,
           <label for ="reviews-sort"> sorted by: </label>
          <select name="reviews-sort" id="reviews-sort" onChange={changeSort}>
            <option value="newest">Newest</option>
            <option value="helpful">Helpful</option>
            <option value="relevant">Relevant</option>
          </select>
        </h2>
      </div>
      <div className="review-list">Review List
      {reviews.map(review => {
        return <ReviewListEntry review={review}/>
      })}
      </div>
      {enoughReviews &&
      <div className="more-reviews">
        <button onClick={getMoreReviews}>More Reviews</button>
      </div>
    }

    </div>
  )
}

export default ReviewList;