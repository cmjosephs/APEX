import React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { getMetaData } from './ReviewForm.jsx';
import { AppContext } from '../App.jsx';

const AvgRatingReview = () => {

  let { productId, reviewMetaData, productDetails } = useContext(AppContext);

  function calcAverageRating(obj) {
    let avgRating = 0;
    let totalRatings = 0;
    for (let key in obj) {
      let quant = parseInt(obj[key]);
      let rating = parseInt(key);
      avgRating += quant * rating;
      totalRatings += quant;
    }
    avgRating = avgRating / totalRatings;
    return Math.ceil(avgRating / 0.25) * 0.25;
  }

  // const avgStarRating = () => {

    // }
    return (
      <div>hi</div>


    )
}

export default AvgRatingReview;