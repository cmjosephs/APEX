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
      if (results.data.results.length <= 2) {
        setEnoughReviews(!enoughReviews)
      }
      setReviews(results.data.results.splice(0, count));
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

  const filterStarReviews = async (checkedStars) => {
    if (checkedStars.length > 0) {
      await axios.get(`api/products/${productId}/reviews`,
      {
        params: {
          count: 200,
          sort: sort
        }
      })
      .then(results => {
        let filteredStarReviews = results.data.results.filter(review => {
          for (let i = 0; i < checkedStars.length; i++) {
            if (review.rating === Number(checkedStars[i])) {
              return review;
            }
          }
        })

        setDisplayCount(filteredStarReviews.length)

        // console.log('this is the filtered ', filteredStarReviews.length)
        // setTotalReviews(filteredStarReviews);

        setReviews(filteredStarReviews)
        setEnoughReviews(false)
        // setReviews(filteredStarReviews.splice(0, count));
        // console.log('this is the total ', totalReviews);

        // if (filteredStarReviews.length <= 2) {
        //   setEnoughReviews(!enoughReviews)
        // }


      }).catch(err => {
        console.log('error getting reviews')
        setEnoughReviews(false)

      })
    } else {
      setEnoughReviews(true)
      getReviews()
    }
  }


  if (!totalReviews) {
    return <p>Loading reviews...</p>
  }

  return (
    <div className="review-container">
      <div className="avg-rating-review"><h3>Average Rating & Reviews</h3>
      <AvgRatingReview totalReviews={totalReviews} filterStarReviews={filterStarReviews}/>

      </div>
      <div className="sort-section">
        <h2>{displayCount} Reviews,
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
      </div>
      }
      <ReviewForm getNewReviews={getReviews}/>
    </div>
  )
}

export default ReviewList;