import React, { useState } from 'react';

var Info = ({ productDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  const renderFeatures = (featList) => {
    return (
      <div className="product-features" data-testid='features'>
        <h3 onClick={() => setShowFeatures(!showFeatures)}>Features {showFeatures ? '-' : '+'}</h3>
        <div className={showFeatures ? 'features-text-show' : 'features-text-collapsed'}>
          {featList.map((feature, index) => {
            return (
              <p className="feature" key={`feat-${index}`} >
                {feature.feature}: {feature.value}
              </p>
            )
          })}
        </div>
    </div>
    )
  }

  const renderDetails = () => {
    return (
      <div className="product-details">
        <h3 onClick={() => setShowDetails(!showDetails)}>
          Details {showDetails ? '-' : '+'}
        </h3>
        <div className={showDetails ? 'details-text-show' : 'details-text-collapsed'}>
          <p className="product-slogan" data-testid="product-slogan">{productDetails.slogan}</p>
          <p className="product-description" role="product-description">{productDetails.description}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="info">
      <hr className="info-break"></hr>
      {renderDetails()}
      <hr className="info-break"></hr>
      {renderFeatures(productDetails.features)}
      <hr className="info-break"></hr>
      <div className="share-bar">
        <h3>Share</h3>
        <div className="share-icons">
          <img src="/images/facebook.svg" alt="fb-btn"></img>
          <img src="/images/instagram.svg" alt="ig-btn"></img>
          <img src="/images/twitter.svg" alt="twitter-btn"></img>
          <img src="/images/pinterest.svg" alt="pint-btn"></img>
        </div>
      </div>
      <hr className="info-break"></hr>
    </div>
  )
}

export default Info;