import React from 'react';

const AvgRating = ({ metaDataRatings }) => {

  const calcAverageRating = (ratingsObj) => {
    let avgRating = 0;
    let totalRatings = 0;
    for (let key in ratingsObj) {
      let quant = parseInt(ratingsObj[key]);
      let rating = parseInt(key);
      avgRating += quant * rating;
      totalRatings += quant;
    }
    avgRating = avgRating / totalRatings;
    return Math.ceil(avgRating / 0.25) * 0.25;
    // return avgRating;
  }

  const renderStars = (rating) => {

  }

  return (
    <div className="avg-rating">
      {renderStars(calcAverageRating(metaDataRatings))}
    </div>
  )
}

export default AvgRating;