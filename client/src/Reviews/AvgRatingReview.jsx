import React, { useContext, useState, useReducer, useEffect } from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { getMetaData } from './ReviewForm.jsx';
import { AppContext } from '../App.jsx';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import AvgRating from '../AvgRating.jsx';


const AvgRatingReview = ({ totalReviews, filterStarReviews }) => {

  let { productId, reviewMetaData, productDetails } = useContext(AppContext);
  let characteristics = reviewMetaData.characteristics;
  let ratings = reviewMetaData.ratings;
  let totalRatings = 0;
  let averageRatingNumber = calcAverageRating(ratings);

  const starRatings = {
    1: ratings[1],
    2: ratings[2],
    3: ratings[3],
    4: ratings[4],
    5: ratings[5]
  }

  const initialState = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  }
  const reducer = (state, action) => ({...state, ...action});
  let [state, setState] = useReducer(reducer, initialState);




  const Checkbox = ({ fnClick, checked = false }) => (
    <label>
      <input
        onClick={e => {
          if (fnClick !== undefined) fnClick(e.target.checked);
        }}
        type="checkbox"
        checked={checked}
      />
    </label>
  );

  useEffect(() => {
    handleChangeStar()
  }, [state])

  const handleChangeStar = () => {
    filterStarReviews(state)
  }


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
        {<span className="star-bar">1 star
          <Slider
            disabled
            defaultValue={starRatings[1]}
            aria-label="Disabled slider"
            min={0}
            max={totalRatings}
            sx={{ display: 'flex' }}
            style={{ color: '#D6CCC2'}}
            />
            <span role="1-star">
              <Checkbox
              readOnly
              sx={{display: 'inline'}}
              checked={state[1]}
              fnClick={v => setState({ 1: v})}
              />
              </span>
      </span>}
      {<span className="star-bar">2 stars
          <Slider
            disabled
            defaultValue={starRatings[2]}
            aria-label="Disabled slider"
            min={0}
            max={totalRatings}
            sx={{ display: 'flex' }}
            style={{ color: '#D6CCC2'}}
            />
            <span>
              <Checkbox
              readOnly
              sx={{display: 'inline'}}
              checked={state[2]}
              fnClick={v => setState({ 2: v})}/>
              </span>
      </span>}
      {<span className="star-bar">3 stars
          <Slider
            disabled
            defaultValue={starRatings[3]}
            aria-label="Disabled slider"
            min={0}
            max={totalRatings}
            sx={{ display: 'flex' }}
            style={{ color: '#D6CCC2'}}
            />
            <span>
              <Checkbox
              readOnly
              sx={{display: 'inline'}}
              checked={state[3]}
              fnClick={v => setState({ 3: v})}/>
              </span>
      </span>}
      {<span className="star-bar">4 stars
          <Slider
            disabled
            defaultValue={starRatings[4]}
            aria-label="Disabled slider"
            min={0}
            max={totalRatings}
            sx={{ display: 'flex' }}
            style={{ color: '#D6CCC2'}}
            />
            <span>
              <Checkbox
              readOnly
              sx={{display: 'inline'}}
              checked={state[4]}
              fnClick={v => setState({ 4: v})}/>
              </span>
      </span>}
      {<span className="star-bar">5 stars
          <Slider
            disabled
            defaultValue={starRatings[5]}
            aria-label="Disabled slider"
            min={0}
            max={totalRatings}
            sx={{ display: 'flex' }}
            style={{ color: '#D6CCC2'}}
            />
            <span>
              <Checkbox
              readOnly
              sx={{display: 'inline'}}
              checked={state[5]}
              fnClick={v => setState({ 5: v})}/>
              </span>
      </span>}

      </div>

    )
  }


  const renderCharacteristicsData = () => {
    return (
      <div className="avg-characteristics">
        {characteristics.hasOwnProperty('Fit') && <div className="characteristic-property">
        <div>
          <h4 className="characteristic-property-name">Fit</h4>
          <br />
          <Slider
            disabled
            defaultValue={characteristics.Fit.value}
            aria-label="Disabled slider"
            min={1}
            max={5}
            sx={{ display: 'flex'}}
            style={{ color: '#D6CCC2'}}
            />
            </div>
            <div className="characteristic-description">
          <span className="characteristic-description-left">Runs tight</span>
          <span className="characteristic-description-middle">Perfect</span>
          <span className="characteristic-description-right">Runs loose</span>
            </div>
        </div>}
        {characteristics.hasOwnProperty('Size') && <div className="characteristic-property">
        <div>
          <h4 className="characteristic-property-name">Size</h4>
          <br />
          <Slider
            disabled
            defaultValue={characteristics.Size.value}
            aria-label="Disabled slider"
            min={1}
            max={5}
            sx={{ display: 'flex'}}
            style={{ color: '#D6CCC2'}}
            />
            </div>
            <div className="characteristic-description">
          <span className="characteristic-description-left">Runs small</span>
          <span className="characteristic-description-middle">Perfect</span>
          <span className="characteristic-description-right">Runs big</span>
          </div>
        </div>}
        {characteristics.hasOwnProperty('Width') && <div className="characteristic-property">
        <div>
          <h4 className="characteristic-property-name">Width</h4>
          <br />
          <Slider
            disabled
            defaultValue={characteristics.Width.value}
            aria-label="Disabled slider"
            min={1}
            max={5}
            sx={{ display: 'flex'}}
            style={{ color: '#D6CCC2'}}
            />
            </div>
            <div className="characteristic-description">
          <span className="characteristic-description-left">Runs narrow</span>
          <span className="characteristic-description-middle">Perfect</span>
          <span className="characteristic-description-right">Runs wide</span>
          </div>
        </div>}
        {characteristics.hasOwnProperty('Quality') && <div className="characteristic-property">
        <div>
          <h4 className="characteristic-property-name">Quality</h4>
          <br />
          <Slider
            disabled
            defaultValue={characteristics.Quality.value}
            aria-label="Disabled slider"
            min={1}
            max={5}
            sx={{ display: 'flex'}}
            style={{ color: '#D6CCC2'}}/>
            </div>
            <div className="characteristic-description">
          <span className="characteristic-description-left">Poor</span>
          <span className="characteristic-description-middle">Average</span>
          <span className="characteristic-description-right">Perfect</span>
          </div>
        </div>}
        {characteristics.hasOwnProperty('Length') && <div className="characteristic-property">
        <div>
          <h4 className="characteristic-property-name">Length</h4>
          <br />
          <Slider
            disabled
            defaultValue={characteristics.Length.value}
            aria-label="Disabled slider"
            min={1}
            max={5}
            sx={{ display: 'flex'}}
            style={{ color: '#D6CCC2'}}
            />
            </div>
            <div className="characteristic-description">
          <span className="characteristic-description-left">Runs short</span>
          <span className="characteristic-description-middle">Perfect</span>
          <span className="characteristic-description-right">Runs long</span>
          </div>
        </div>}
        {characteristics.hasOwnProperty('Comfort') && <div className="characteristic-property">
        <div>
          <h4 className="characteristic-property-name">Comfort</h4>
          <br />
          <Slider
            disabled
            defaultValue={characteristics.Comfort.value}
            aria-label="Disabled slider"
            min={1}
            max={5}
            sx={{ display: 'flex'}}
            style={{ color: '#D6CCC2'}}
            />
            </div>
            <div className="characteristic-description">
          <span className="characteristic-description-left">Uncomfortable</span>
          <span className="characteristic-description-middle">Average</span>
          <span className="characteristic-description-right">Perfect</span>
          </div>
        </div>}

      </div>
    )
  }


    return (
      <div>
        <div className="avg-rating-header">
        <div className="avg-rating-number">{Math.round(averageRatingNumber * 10)/ 10}
        {/* <div className="reviews-avg-rating-stars"> */}
          <AvgRating metaDataRatings={ratings}/>
          {/* </div> */}

        </div>
          </div>
          <div>{calcRecommended() ? calcRecommended() : '...'}% of reviews recommend this product</div>
        <div className="rating-breakdown">
          <h3>Rating Breakdown</h3>
          {renderTotalStars()}
          {renderCharacteristicsData()}
        </div>
      </div>


    )
}

export default AvgRatingReview;