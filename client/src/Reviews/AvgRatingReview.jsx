import React, { useContext, useState, useReducer, useEffect } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { getMetaData } from './ReviewForm.jsx';
import { AppContext } from '../App.jsx';
// import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
// import { styled } from '@mui/material/styles';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
// import { SortContext } from './ReviewList.jsx';



// keep track of all checked stars in an array [1, 2, 5] etc
// if user clicks on that star #, add it to the array
// if the user clicks on that star again, delete it from the array
// do an axios get request and filter reviews with ratings in that array
const AvgRatingReview = ({ totalReviews, filterStarReviews }) => {

  let { productId, reviewMetaData, productDetails } = useContext(AppContext);
  // let { sort } = useContext(SortContext);
  let ratings = reviewMetaData.ratings;
  let characteristics = reviewMetaData.characteristics;
  // let [starReviews, setStarReviews] = useState([]);
  let oneStar = ratings[1];
  let twoStar = ratings[2];
  let threeStar = ratings[3];
  let fourStar = ratings[4];
  let fiveStar = ratings[5];
  let totalRatings = 0;

  const initialState = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  }

  const reducer = (state, action) => ({...state, ...action});
  let [state, setState] = useReducer(reducer, initialState);

  const Checkbox = ({ fnClick, fnChange, title = "0", checked = false }) => (
    <label>
      <input
        onClick={e => {
          if (fnClick !== undefined) fnClick(e.target.checked);
        }}
        onChange={e => {
          if (fnChange !== undefined) fnChange(e.target.checked);
        }}
        type="checkbox"
        checked={checked}
      />
      {title}
    </label>
  );

  useEffect(() => {
    let checkedStars = [];
    for (let [key, value] of Object.entries(state)) {
      if (state[key]) {
        checkedStars.push(Number(key));
      }
    }
    filterStarReviews(checkedStars);
  }, [state])


  // watch sort and if it changes then uncheck st


  function calcAverageRating(obj) {
    let avgRating = 0;
    for (let key in obj) {
      let quant = parseInt(obj[key]);
      let rating = parseInt(key);
      avgRating += quant * rating;
      totalRatings += quant;
    }
    avgRating = avgRating / totalRatings;
    return Math.ceil(avgRating / 0.25) * 0.25;
  }

  let averageRatingNumber = calcAverageRating(ratings);

  function calcRecommended() {
    let recommendedReviews = totalReviews.filter(review => {
      return review.recommend === true;
    })
    return Math.ceil((recommendedReviews.length / totalReviews.length) * 100);
  }


  if (!totalReviews) {
    return <p>Loading review data...</p>
  }

  const renderTotalStars = () => {
    return (
      <div className="star-values">
        {<span>1 star
          <Slider
            disabled
            defaultValue={oneStar}
            aria-label="Disabled slider"
            min={0}
            max={totalRatings}
            sx={{ display: 'flex', width: 1/7 }}/>
            <span>
              <Checkbox
              title={oneStar}
              sx={{display: 'inline'}}
              checked={state[1]}
              fnClick={v => setState({ 1: v})}/>
              <p>{oneStar}</p>
              </span>
      </span>}
      {<span>2 stars <Slider
            disabled
            defaultValue={twoStar}
            aria-label="Disabled slider"
            min={0}
            max={totalRatings}
            sx={{ display: 'flex', width: 1/7 }}/>
            <span>
              <Checkbox
              title={twoStar}
              sx={{display: 'inline'}}
              checked={state[2]}
              fnClick={v => setState({ 2: v})}/>
              <p>{twoStar}</p>
              </span>
      </span>}
      {<span>3 stars <Slider
            disabled
            defaultValue={threeStar}
            aria-label="Disabled slider"
            min={0}
            max={totalRatings}
            sx={{ display: 'flex', width: 1/7 }}/>
            <span>
              <Checkbox
              title={threeStar}
              sx={{display: 'inline'}}
              checked={state[3]}
              fnClick={v => setState({ 3: v})}/>
              <p>{threeStar}</p>
              </span>
      </span>}
      {<span>4 stars <Slider
            disabled
            defaultValue={fourStar}
            aria-label="Disabled slider"
            min={0}
            max={totalRatings}
            sx={{ display: 'flex', width: 1/7 }}/>
            <span>
              <Checkbox
              title={fourStar}
              sx={{display: 'inline'}}
              checked={state[4]}
              fnClick={v => setState({ 4: v})}/>
              <p>{fourStar}</p>
              </span>
      </span>}
      {<span>5 stars <Slider
            disabled
            defaultValue={fiveStar}
            aria-label="Disabled slider"
            min={0}
            max={totalRatings}
            sx={{ display: 'flex', width: 1/7 }}/>
            <span>
              <Checkbox
              title={fiveStar}
              sx={{display: 'inline'}}
              checked={state[5]}
              fnClick={v => setState({ 5: v})}/>
              <p>{fiveStar}</p>
              </span>
      </span>}

      </div>

    )
  }


  const renderCharacteristicsData = () => {
    return (
      <div className="avg-characteristics">
        {characteristics.hasOwnProperty('Fit') && <div>
        <div>
          <span className="characteristic-property">Fit</span>
          <br />
          <Slider
            disabled
            defaultValue={characteristics.Fit.value}
            aria-label="Disabled slider"
            min={1}
            max={5}
            sx={{ display: 'flex', width: 1/7 }}/>
            </div>
          <span className="characteristic-description-left">Runs tight</span>
          <span className="characteristic-description-middle">Perfect</span>
          <span className="characteristic-description-right">Runs loose</span>
        </div>}
        {characteristics.hasOwnProperty('Size') && <div>
        <div>
          <span className="characteristic-property">Size</span>
          <br />
          <Slider
            disabled
            defaultValue={characteristics.Size.value}
            aria-label="Disabled slider"
            min={1}
            max={5}
            sx={{ display: 'flex', width: 1/7 }}/>
            </div>
          <span className="characteristic-description-left">Runs small</span>
          <span className="characteristic-description-middle">Perfect</span>
          <span className="characteristic-description-right">Runs big</span>
        </div>}
        {characteristics.hasOwnProperty('Width') && <div>
        <div>
          <span className="characteristic-property">Width</span>
          <br />
          <Slider
            disabled
            defaultValue={characteristics.Width.value}
            aria-label="Disabled slider"
            min={1}
            max={5}
            sx={{ display: 'flex', width: 1/7 }}/>
            </div>
          <span className="characteristic-description-left">Runs narrow</span>
          <span className="characteristic-description-middle">Perfect</span>
          <span className="characteristic-description-right">Runs wide</span>
        </div>}
        {characteristics.hasOwnProperty('Quality') && <div>
        <div>
          <span className="characteristic-property">Quality</span>
          <br />
          <Slider
            disabled
            defaultValue={characteristics.Quality.value}
            aria-label="Disabled slider"
            min={1}
            max={5}
            sx={{ display: 'flex', width: 1/7 }}/>
            </div>
          <span className="characteristic-description-left">Poor</span>
          <span className="characteristic-description-middle">Average</span>
          <span className="characteristic-description-right">Perfect</span>
        </div>}
        {characteristics.hasOwnProperty('Length') && <div>
        <div>
          <span className="characteristic-property">Length</span>
          <br />
          <Slider
            disabled
            defaultValue={characteristics.Length.value}
            aria-label="Disabled slider"
            min={1}
            max={5}
            sx={{ display: 'flex', width: 1/7 }}/>
            </div>
          <span className="characteristic-description-left">Runs short</span>
          <span className="characteristic-description-middle">Perfect</span>
          <span className="characteristic-description-right">Runs long</span>
        </div>}
        {characteristics.hasOwnProperty('Comfort') && <div>
        <div>
          <span className="characteristic-property">Comfort</span>
          <br />
          <Slider
            disabled
            defaultValue={characteristics.Comfort.value}
            aria-label="Disabled slider"
            min={1}
            max={5}
            sx={{ display: 'flex', width: 1/7 }}/>
            </div>
          <span className="characteristic-description-left">Uncomfortable</span>
          <span className="characteristic-description-middle">Average</span>
          <span className="characteristic-description-right">Perfect</span>
        </div>}

      </div>
    )
  }


    return (
      <div>
        <div className="avg-rating-number">{Math.round(averageRatingNumber * 10)/ 10}</div>
        <div className="avg-rating-stars">
        <Rating
          name="text-feedback"
          value={averageRatingNumber}
          readOnly
          precision={0.25}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        </div>
          <div>{calcRecommended()}% of reviews recommend this product</div>
        <div className="rating-breakdown">
          <h3>Rating Breakdown</h3>
          {renderTotalStars()}
          {renderCharacteristicsData()}
        </div>
      </div>


    )
}

export default AvgRatingReview;