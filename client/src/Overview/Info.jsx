import React, { useState } from 'react';

var Info = ({ productDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);


  const renderFeatures = (featList) => {
    if (showFeatures) {
      return (
        <div className="features">
          <h4 onClick={() => setShowFeatures(!showFeatures)}>Features -</h4>
            {featList.map((feature, index) => {
              return (
                <div className="feature" key={`feat-${index}`} >
                  {feature.feature}: {feature.value}
                </div>
              )
            })}
        </div>
      )
    } else {
      return <h4 onClick={() => setShowFeatures(!showFeatures)}>Features +</h4>
    }
  }

  const renderDetails = () => {
    if (showDetails) {
      return (
        <div className="details">
          <h4 onClick={() => setShowDetails(!showDetails)}>Details -</h4>
            <p role="product-slogan">{productDetails.slogan}</p>
            <p role="product-description">{productDetails.description}</p>
        </div>
      )
    } else {
      return <h4 onClick={() => setShowDetails(!showDetails)}>Details +</h4>
    }
  }

  return (
    <div className="info">
      {renderDetails()}
      {renderFeatures(productDetails.features)}
      <div className="share-bar"></div>
        Share
        <button className="fb-share-btn">facebook</button>
        <button className="ig-share-btn">instagram</button>
        <button className="twitter-share-btn">twitter</button>
        <button className="pinterest-share-btn">pinterest</button>
    </div>
  )
}

export default Info;