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
      <h4>Share</h4>
        <button>facebook</button>
        <button>instagram</button>
        <button>twitter</button>
        <button>pinterest</button>
    </div>
  )
}

export default Info;