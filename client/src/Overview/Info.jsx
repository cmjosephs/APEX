import React, { useState } from 'react';

var Info = ({ productDetails }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

<<<<<<< HEAD
  const renderFeatures = (featList) => {
    if (showFeatures) {
      return (
        <div className="product-features" data-testid='features'>
=======

  const renderFeatures = (featList) => {
    if (showFeatures) {
      return (
        <div className="product-features">
>>>>>>> eb6b606 (Completed basic features model)
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
<<<<<<< HEAD
          <h3 onClick={() => setShowDetails(!showDetails)}>
            Details -
          </h3>
            <p className="product-slogan" data-testid="product-slogan">{productDetails.slogan}</p>
            <p className="product-description" role="product-description">{productDetails.description}</p>
=======
          <h3 onClick={() => setShowDetails(!showDetails)}>Details -</h3>
            <p role="product-slogan">{productDetails.slogan}</p>
            <p role="product-description">{productDetails.description}</p>
>>>>>>> eb6b606 (Completed basic features model)
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
<<<<<<< HEAD
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
=======
      {renderDetails()}
      {renderFeatures(productDetails.features)}
      <div className="share-bar">
        <h3>Share</h3>
        <button className="fb-share-btn">facebook</button>
        <button className="ig-share-btn">instagram</button>
        <button className="twitter-share-btn">twitter</button>
        <button className="pinterest-share-btn">pinterest</button>
      </div>
>>>>>>> eb6b606 (Completed basic features model)
    </div>
  )
}

export default Info;