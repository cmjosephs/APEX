import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import AllReviews from './AllReviews.jsx';
import ReviewListEntry from './ReviewListEntry.jsx';
import ReviewForm from './ReviewForm.jsx';
import AvgRatingReview from './AvgRatingReview.jsx';
import { AppContext } from '../App.jsx';


export const SortContext = createContext();

const ReviewList = () => {
  let { productId, reviewMetaData, productDetails } = useContext(AppContext);
  let [totalReviews, setTotalReviews] = useState([]);
  let [reviews, setReviews] = useState([]);
  let [count, setCount] = useState(2);
  let [sort, setSort] = useState('newest');
  let [enoughReviews, setEnoughReviews] = useState(true);
  let [displayCount, setDisplayCount] = useState(0);
  let [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() =>
  {
    getReviews();
  }, [productId, count, sort]);


  const getReviews = async () => {
    await axios.get(`/api/products/${productId}/reviews`,
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
        if (searchKeyword !== '') {
          searchReviews(searchKeyword)
        } else {
          setReviews(results.data.results.slice(0, count));
        }
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
// if there's a search keyword and star(s) are checked
    if (searchKeyword !== '' && !Object.values(checkedStars).every(star => star === false)) {
      let filteredReviews = totalReviews.filter(review => {
        if ((review.body.toLowerCase().includes(searchKeyword) || review.summary.toLowerCase().includes(searchKeyword)) && checkedStars[review.rating]) {
          return review;
        }
      })
      setReviews(filteredReviews)
      setEnoughReviews(false)
      setDisplayCount(filteredReviews.length)
    }

    // no search keyword but star is checked
    if (searchKeyword === '' && !Object.values(checkedStars).every(star => star === false)) {
      let filteredReviews = totalReviews.filter(review => {
        if (checkedStars[review.rating]) {
          return review;
        }
      })
      setReviews(filteredReviews)
      setEnoughReviews(false)
      setDisplayCount(filteredReviews.length)
    }

    // search keyword but no stars checked
    if (searchKeyword !== '' && Object.values(checkedStars).every(star => star === false)) {
      let filteredReviews = totalReviews.filter(review => {
        if (review.body.toLowerCase().includes(searchKeyword) || review.summary.toLowerCase().includes(searchKeyword)) {
          return review;
        }
      })
      setReviews(filteredReviews)
      setEnoughReviews(false)
      setDisplayCount(filteredReviews.length)
    }
    // no search keyword or stars checked
    if (searchKeyword === '' && Object.values(checkedStars).every(star => star === false)) {
        setEnoughReviews(true)
        setReviews(totalReviews.slice(0, count))
        setDisplayCount(totalReviews.length)
    }

  }

  const searchReviews = (keyword) => {
    if (keyword.length >= 3) {
      setSearchKeyword(keyword);
      let filteredSearchReviews = totalReviews.filter(review => {
        if (review.body.toLowerCase().includes(keyword.toLowerCase())
        || review.summary.toLowerCase().includes(keyword.toLowerCase())) {
          return review;
        }
      })

      if (filteredSearchReviews.length === 0 || filteredSearchReviews.length !== 0) {
        setReviews(filteredSearchReviews);
        setEnoughReviews(false);
        setDisplayCount(filteredSearchReviews.length);
      }
    }

    else {
      setSearchKeyword('')
      setEnoughReviews(true)
      setReviews(totalReviews.slice(0, count))
      setDisplayCount(totalReviews.length)
    }
  }


  if (!totalReviews) {
    return <p>Loading reviews...</p>
  }

  return (
    <div id="review-container">
      <div className="review-container-left">
        <div className="avg-rating-review">
          <h1 className="review-header">Rating & Reviews</h1>
        <AvgRatingReview totalReviews={totalReviews} filterStarReviews={filterStarReviews}/>
        </div>
      </div>

      <div className="review-container-right">
        <div className="review-container-right-list">
          <div className="sort-section">
            <h2>{displayCount} Reviews,
              <label for ="reviews-sort"> sorted by: </label>
              <select name="reviews-sort" className="reviews-sort-dropdown" onChange={changeSort} role="review-sort">
                <option placeholder="newest-sort" value="newest">Newest</option>
                <option value="helpful">Helpful</option>
                <option value="relevant">Relevant</option>
              </select>
            </h2>
          </div>
          <div className="review-searchbar">
          <nav className="navbar">
      <input className="search-input" onChange={(e) => searchReviews(e.target.value)} placeholder="Search reviews..."/>
    </nav>
          </div>
          <AllReviews reviews={reviews} getNewReviews={getReviews}/>
        </div>
          <div className="review-button-section">
            {enoughReviews &&
              <button onClick={getMoreReviews} className="review-button" role="get-more-reviews">More Reviews</button>
            }
            <ReviewForm getNewReviews={getReviews}/>
          </div>
      </div>
    </div>

  )
}

export default ReviewList;