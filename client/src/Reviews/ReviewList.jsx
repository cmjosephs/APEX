import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import AllReviews from './AllReviews.jsx';
import ReviewListEntry from './ReviewListEntry.jsx';
import ReviewForm from './ReviewForm.jsx';
import AvgRatingReview from './AvgRatingReview.jsx';
import { AppContext } from '../App.jsx';


export const SortContext = createContext();

const ReviewList = () => {
  let [reviews, setReviews] = useState([]);
  let [totalReviews, setTotalReviews] = useState([]);
  let { productId, reviewMetaData, productDetails } = useContext(AppContext);
  let [count, setCount] = useState(2);
  let [sort, setSort] = useState('newest');
  let [enoughReviews, setEnoughReviews] = useState(true);
  let [displayCount, setDisplayCount] = useState(0);


  useEffect(() =>
  {
    getReviews();
  }, [productId, count, sort]);


  const getReviews = async () => {
    console.log('getreviews is called')
    await axios.get(`api/products/${productId}/reviews`,
    {
      params: {
        count: 200,
        sort: sort
      }
    })
    .then(results => {
      setTotalReviews(results.data.results);
      setDisplayCount(results.data.results.length);
      // console.log("REVIEW COUNTS: ", results.data.results.length, 'ENOUGH REVIEWS: ', enoughReviews)
      if (results.data.results.length <= 2) {
        setEnoughReviews(!enoughReviews)
      }
      setReviews(results.data.results.slice(0, count));
    }).catch(err => {
      console.log('error getting reviews')
      setEnoughReviews(!enoughReviews)

    })
  }

  const getMoreReviews = () => {
    setCount(count += 2)
    if (count >= totalReviews.length) {
      setEnoughReviews(!enoughReviews)
    }
  }

  const changeSort = (e) => {
    setSort(e.target.value)
  }

  const filterStarReviews = (checkedStars) => {

    let filteredStarReviews = totalReviews.filter(review => {
      if (checkedStars[review.rating]) {
        return review;
        }
      })

      // if there's no reviews with this star count
      if (filteredStarReviews.length === 0) {
        setReviews(filteredStarReviews);
        setEnoughReviews(false);
        setDisplayCount(filteredStarReviews.length);
      }

      // if there's reviews with this star count
      if (filteredStarReviews.length !== 0) {
        setReviews(filteredStarReviews);
        setEnoughReviews(false);
        setDisplayCount(filteredStarReviews.length);
      }

      // if there's nothing checked
      if (Object.values(checkedStars).every(star => star === false)) {
        setEnoughReviews(true)
        setReviews(totalReviews)
        setDisplayCount(totalReviews.length)
      }

  }


  if (!totalReviews) {
    return <p>Loading reviews...</p>
  }

  return (
    <div className="review-container">
      <div className="review-container-left">
        <div className="avg-rating-review">
          <h3>Average Rating & Reviews</h3>
        <AvgRatingReview totalReviews={totalReviews} filterStarReviews={filterStarReviews}/>
        </div>
      </div>

      <div className="review-container-right">
        <div className="review-container-right-list">
          <div className="sort-section">
            <h2>{displayCount} Reviews,
              <label for ="reviews-sort"> sorted by: </label>
              <select name="reviews-sort" className="reviews-sort-dropdown" onChange={changeSort}>
                <option value="newest">Newest</option>
                <option value="helpful">Helpful</option>
                <option value="relevant">Relevant</option>
              </select>
            </h2>
          </div>
          <AllReviews reviews={reviews} getNewReviews={getReviews}/>
        </div>
          <div className="review-button-section">
            {enoughReviews &&
              <button onClick={getMoreReviews} className="review-button">More Reviews</button>
            }
            <ReviewForm getNewReviews={getReviews}/>
          </div>
      </div>
    </div>

  )
}

export default ReviewList;