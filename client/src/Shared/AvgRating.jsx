import React from 'react';

// NEEDS to be passed ONLY the ratings object from the meta data response body
// props needs to be metaDataRatings
// needs CSS styling when implemented

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
    // return Math.round(avgRating / 4) * 4;
    // return avgRating;
  }

  const evalStarCount = (rating) => {
    const stars = [];
    while (stars.length < 5) {
      if (rating <= 0) {
        stars.push(0);
      } else if (rating >= 1) {
        stars.push(1);
        rating--;
      } else {
        stars.push(rating);
        rating -= rating;
      }
    }
    return stars;
  }

  const renderStars = (starCountArr) => {
    return starCountArr.map((star, index) => {
      let fill;
      if (star === 1) fill = 'full';
      if (star === 0.75) fill = 'three-quarter';
      if (star === 0.5) fill = 'half';
      if (star === 0.25) fill = 'quarter';
      if (star === 0) fill = 'empty';
      return <img src={`/images/${fill}-star.svg`} key={`${index}-${fill}`} className="rating-star"></img>
    })
  }

  return (
    <div className="avg-rating">
      {renderStars(evalStarCount(calcAverageRating(metaDataRatings)))}
    </div>
  )
}

export default AvgRating;