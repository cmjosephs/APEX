import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import AllReviews from './AllReviews.jsx';
import ReviewListEntry from './ReviewListEntry.jsx';
import ReviewForm from './ReviewForm.jsx';
import AvgRatingReview from './AvgRatingReview.jsx';
import { AppContext } from '../App.jsx';

// export const ProductContext = createContext();
export const SortContext = createContext();

const ReviewList = () => {
  let [reviews, setReviews] = useState([]);
  let { productId, reviewMetaData, productDetails } = useContext(AppContext);
  let [product, setProduct] = useState('42366');
  let [count, setCount] = useState(2);
  let [sort, setSort] = useState('newest');
  let [enoughReviews, setEnoughReviews] = useState(true);

  useEffect(() =>
  {
    getReviews();
  }, [product, count, sort]);

  // TODO: find a way to get the total # of reviews
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

  // only want to show 20 reviews at most but this can change later
  const getMoreReviews = () => {
    setCount(count += 2)
    if (count >= 20) {
      setEnoughReviews(!enoughReviews)
    }
  }

  const changeSort = (e) => {
    setSort(e.target.value)
  }


  // TODO: get total # of reviews for this product and replace the "20"
  // change the "ProductContext.Provider" to appropriate name later when we include it in the main app component
  return (
    <ProductContext.Provider value ={{ product }}>
    <div className="review-container">
      <div className="avg-rating-review"><h3>Average Rating & Reviews</h3>
      <AvgRatingReview/>

      </div>
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
      <AllReviews reviews={reviews} getNewReviews={getReviews}/>
      {enoughReviews &&
      <div className="review-buttons">
        <button onClick={getMoreReviews}>MORE REVIEWS</button>
        <ReviewForm getNewReviews={getReviews}/>
      </div>
      }
    </div>
    </ProductContext.Provider>
  )
}

export default ReviewList;