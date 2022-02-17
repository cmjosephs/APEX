import React, { useState } from 'react';

var Info = ({ productDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);


  const renderFeatures = (featList) => {
    if (showFeatures) {
      return (
        <div className="product-features">
          <h3 onClick={() => setShowFeatures(!showFeatures)}>Features -</h3>
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
      return (
        <div className="product-features"  onClick={() => setShowFeatures(!showFeatures)}>
          <h3>Features +</h3>
        </div>
      )
    }
  }

  const renderDetails = () => {
    if (showDetails) {
      return (
        <div className="product-details">
          <h3 onClick={() => setShowDetails(!showDetails)}>Details -</h3>
            <p className="product-slogan" role="product-slogan">{productDetails.slogan}</p>
            <p role="product-description">{productDetails.description}</p>
        </div>
      )
    } else {
      return (
        <div className="product-details" onClick={() => setShowDetails(!showDetails)}>
          <h3>Details +</h3>
        </div>
      )
    }
  }

  return (
    <div className="info">
      {renderDetails()}
      {renderFeatures(productDetails.features)}
      <div className="share-bar">
        <h3>Share</h3>
        <button className="fb-share-btn">facebook</button>
        <button className="ig-share-btn">instagram</button>
        <button className="twitter-share-btn">twitter</button>
        <button className="pinterest-share-btn">pinterest</button>
      </div>
    </div>
  )
}

export default Info;